"""Turn .txt / .epub / archive bytes into {title, author, description, source_lang, format, chapters, cover}."""
import io
import posixpath
import re
import unicodedata
import zipfile
from html import unescape
from html.parser import HTMLParser
from urllib.parse import unquote
from xml.etree import ElementTree as ET

from . import archives

DEFAULT_CHAPTER_PATTERN = (
    r"^\s*(?:"
    r"第\s*[0-9０-９零〇一二三四五六七八九十百千万两]+\s*[章节節回卷集部篇话話]"
    r"|(?:chapter|chương|chuong|hồi|quyển)\s*[0-9ivxlcdm]+"
    r"|ch\.\s*\d+"
    r"|序章|序言|楔子|引子|番外|尾声|尾聲|后记|後記|终章|終章"
    r"|prologue|epilogue|interlude"
    r")"
)
MAX_HEADING_LEN = 60
CHUNK_CHARS = 8000


# ---------- text helpers ----------

def decode_bytes(data):
    if data.startswith(b"\xef\xbb\xbf"):
        return data[3:].decode("utf-8", "replace")
    if data.startswith(b"\xff\xfe") or data.startswith(b"\xfe\xff"):
        return data.decode("utf-16", "replace")
    for enc in ("utf-8", "gb18030", "big5"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", "replace")


def normalize_paragraphs(text):
    """One paragraph per line, no blank lines, no leading full-width indent.

    Keeping paragraphs 1:1 with lines is what lets a translation line up with its
    source for side-by-side reading, split and merge.
    """
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    out = []
    for line in text.split("\n"):
        line = line.strip().strip("　 ﻿").strip()
        if line:
            out.append(line)
    return "\n".join(out)


def detect_lang(text):
    sample = text[:20000]
    cjk = latin = viet = 0
    for ch in sample:
        o = ord(ch)
        if 0x4E00 <= o <= 0x9FFF or 0x3400 <= o <= 0x4DBF:
            cjk += 1
        elif ch.isalpha():
            latin += 1
            base = unicodedata.normalize("NFD", ch)
            if len(base) > 1 or ch in "đĐ":
                viet += 1
    if cjk and cjk >= latin * 0.3:
        return "zh"
    if latin and viet / latin > 0.08:
        return "vi"
    return "en"


# ---------- txt ----------

def split_chapters(text, pattern=None):
    rx = re.compile(pattern or DEFAULT_CHAPTER_PATTERN, re.IGNORECASE)
    lines = text.split("\n") if text else []
    chapters = []
    current = None
    preface = []
    for line in lines:
        if len(line) <= MAX_HEADING_LEN and rx.search(line):
            if current:
                chapters.append(current)
            current = {"title": line, "lines": []}
        elif current:
            current["lines"].append(line)
        else:
            preface.append(line)
    if current:
        chapters.append(current)

    if not chapters:
        return chunk_text(lines)

    out = []
    if preface:
        out.append({"title": "Mở đầu", "content": "\n".join(preface)})
    out += [{"title": c["title"], "content": "\n".join(c["lines"])} for c in chapters]
    return out


def chunk_text(lines):
    if not lines:
        return [{"title": "Chương 1", "content": ""}]
    out, buf, size = [], [], 0
    for line in lines:
        buf.append(line)
        size += len(line)
        if size >= CHUNK_CHARS:
            out.append(buf)
            buf, size = [], 0
    if buf:
        out.append(buf)
    if len(out) == 1:
        return [{"title": "Chương 1", "content": "\n".join(out[0])}]
    return [{"title": f"Phần {i + 1}", "content": "\n".join(b)} for i, b in enumerate(out)]


def parse_txt(data, filename, pattern=None):
    text = normalize_paragraphs(decode_bytes(data))
    title = re.sub(r"\.txt$", "", filename, flags=re.IGNORECASE)
    return {
        "title": title,
        "author": "",
        "description": "",
        "source_lang": detect_lang(text),
        "format": "txt",
        "chapters": split_chapters(text, pattern),
        "cover": None,
    }


# ---------- epub ----------

BLOCK_TAGS = {
    "p", "div", "br", "li", "tr", "blockquote", "section", "article", "header", "footer",
    "h1", "h2", "h3", "h4", "h5", "h6", "pre", "hr", "dd", "dt", "figcaption", "aside",
}
SKIP_TAGS = {"script", "style", "head", "title", "svg", "math"}


class _TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = 0
        self.heading = None
        self._in_heading = False
        self._heading_buf = []

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        if tag in SKIP_TAGS:
            self.skip += 1
        elif tag in BLOCK_TAGS:
            self.parts.append("\n")
        if tag in ("h1", "h2", "h3") and self.heading is None and not self.skip:
            self._in_heading = True
            self._heading_buf = []

    def handle_startendtag(self, tag, attrs):
        if tag.lower() in BLOCK_TAGS:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in SKIP_TAGS:
            self.skip = max(0, self.skip - 1)
        elif tag in BLOCK_TAGS:
            self.parts.append("\n")
        if tag in ("h1", "h2", "h3") and self._in_heading:
            self._in_heading = False
            h = " ".join("".join(self._heading_buf).split())
            if h:
                self.heading = h

    def handle_data(self, data):
        if self.skip:
            return
        self.parts.append(data)
        if self._in_heading:
            self._heading_buf.append(data)


def _html_to_text(markup):
    p = _TextExtractor()
    try:
        p.feed(markup)
        p.close()
    except Exception:
        pass
    raw = "".join(p.parts)
    # collapse runs of inline whitespace inside a paragraph, keep paragraph breaks
    lines = [" ".join(l.split()) for l in raw.split("\n")]
    return normalize_paragraphs("\n".join(lines)), p.heading


def _local(tag):
    return tag.rsplit("}", 1)[-1]


def _find_all(el, name):
    return [e for e in el.iter() if _local(e.tag) == name]


def _text_of(el):
    return " ".join("".join(el.itertext()).split()) if el is not None else ""


def _read_toc(z, opf_dir, manifest, spine_toc_id):
    """href (no fragment, zip path) -> first title found in nav.xhtml or toc.ncx."""
    titles = {}
    nav = next((m for m in manifest.values() if "nav" in m["props"].split()), None)
    ncx = manifest.get(spine_toc_id) if spine_toc_id else None
    if ncx is None:
        ncx = next((m for m in manifest.values() if m["type"] == "application/x-dtbncx+xml"), None)

    def add(base, href, title):
        if not href or not title:
            return
        path = posixpath.normpath(posixpath.join(base, unquote(href.split("#", 1)[0])))
        titles.setdefault(path, title)

    if ncx:
        try:
            root = ET.fromstring(z.read(ncx["path"]))
            base = posixpath.dirname(ncx["path"])
            for np in _find_all(root, "navPoint"):
                label = next((e for e in np if _local(e.tag) == "navLabel"), None)
                content = next((e for e in np if _local(e.tag) == "content"), None)
                if content is not None:
                    add(base, content.get("src"), _text_of(label))
        except (KeyError, ET.ParseError):
            pass
    if nav and not titles:
        try:
            markup = z.read(nav["path"]).decode("utf-8", "replace")
            base = posixpath.dirname(nav["path"])
            for href, label in re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', markup, re.S | re.I):
                add(base, unescape(href), " ".join(unescape(re.sub(r"<[^>]+>", "", label)).split()))
        except KeyError:
            pass
    return titles


def parse_epub(data, filename):
    z = zipfile.ZipFile(io.BytesIO(data))
    container = ET.fromstring(z.read("META-INF/container.xml"))
    rootfile = next(e for e in container.iter() if _local(e.tag) == "rootfile").get("full-path")
    opf_dir = posixpath.dirname(rootfile)
    opf = ET.fromstring(z.read(rootfile))

    meta = next(e for e in opf if _local(e.tag) == "metadata")
    def dc(name):
        el = next((e for e in meta.iter() if _local(e.tag) == name), None)
        return _text_of(el)

    manifest = {}
    for item in _find_all(opf, "item"):
        href = unquote(item.get("href", ""))
        manifest[item.get("id")] = {
            "path": posixpath.normpath(posixpath.join(opf_dir, href)),
            "type": item.get("media-type", ""),
            "props": item.get("properties", "") or "",
        }

    spine_el = next(e for e in opf if _local(e.tag) == "spine")
    toc_titles = _read_toc(z, opf_dir, manifest, spine_el.get("toc"))

    chapters = []
    for ref in spine_el:
        if _local(ref.tag) != "itemref":
            continue
        item = manifest.get(ref.get("idref"))
        if not item or "html" not in item["type"]:
            continue
        try:
            markup = z.read(item["path"]).decode("utf-8", "replace")
        except KeyError:
            continue
        text, heading = _html_to_text(markup)
        if not text:
            continue
        title = toc_titles.get(item["path"]) or heading or f"Chương {len(chapters) + 1}"
        lines = text.split("\n")
        if lines and lines[0].strip() == title.strip():
            lines = lines[1:]
        chapters.append({"title": title, "content": "\n".join(lines)})

    cover = None
    cover_id = None
    for m in meta.iter():
        if _local(m.tag) == "meta" and m.get("name") == "cover":
            cover_id = m.get("content")
    cover_item = manifest.get(cover_id) if cover_id else None
    if not cover_item or not cover_item["type"].startswith("image/"):
        cover_item = next((m for m in manifest.values() if "cover-image" in m["props"].split()), None)
    if cover_item:
        try:
            cover = (z.read(cover_item["path"]), cover_item["type"])
        except KeyError:
            cover = None

    sample = "\n".join(c["content"] for c in chapters[:5])
    description = dc("description")
    if "<" in description:
        description = normalize_paragraphs(_html_to_text(description)[0])
    return {
        "title": dc("title") or re.sub(r"\.epub$", "", filename, flags=re.IGNORECASE),
        "author": dc("creator"),
        "description": description,
        "source_lang": detect_lang(sample),
        "format": "epub",
        "chapters": chapters or [{"title": "Chương 1", "content": ""}],
        "cover": cover,
    }


# ---------- markdown (vault notes) ----------

FRONTMATTER = re.compile(r"\A\ufeff?---\s*\n(.*?)\n---\s*(?:\n|\Z)", re.S)
MD_HEADING = re.compile(r"^(#{1,2})\s+(.+?)\s*#*\s*$")


def split_frontmatter(text):
    m = FRONTMATTER.match(text)
    if not m:
        return {}, text
    return parse_frontmatter(m.group(1)), text[m.end():]


def parse_frontmatter(block):
    """Just enough YAML for vault notes: top-level scalars plus one level of nested scalars."""
    out, parent = {}, None
    for line in block.split("\n"):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        m = re.match(r"^(\s*)([A-Za-z0-9_\-]+):\s*(.*)$", line)
        if not m:
            continue
        indent, key, value = m.groups()
        value = re.sub(r"\s+#.*$", "", value).strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        if not indent:
            if value:
                out[key] = value
                parent = None
            else:
                out[key] = {}
                parent = key
        elif parent and isinstance(out.get(parent), dict):
            out[parent][key] = value
    return out


def md_to_text(md):
    text = re.sub(r"<!--.*?-->", "", md, flags=re.S)
    lines = []
    for raw in text.split("\n"):
        line = raw.strip()
        if re.fullmatch(r"(-{3,}|\*{3,}|_{3,})", line) or re.fullmatch(r"\|?[\s:\-|]+\|?", line) and "-" in line:
            continue
        if line.startswith("```"):
            continue
        line = re.sub(r"^#{1,6}\s+", "", line)
        line = re.sub(r"^(>\s*)+", "", line)
        line = re.sub(r"^\[!\w+\][+-]?\s*", "", line)          # obsidian callout marker
        line = re.sub(r"^[-*+]\s+(\[[ xX]\]\s+)?", "• ", line)
        line = re.sub(r"!?\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", line)
        line = re.sub(r"!?\[\[([^\]]+)\]\]", lambda m: m.group(1).split("#")[0].split("/")[-1], line)
        line = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", line)
        line = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", line)
        line = line.replace("**", "").replace("__", "")
        line = re.sub(r"(?<![\w*])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\w*])", r"\1", line)
        line = re.sub(r"`([^`]+)`", r"\1", line)
        if line.startswith("|") and line.endswith("|"):
            line = " · ".join(c.strip() for c in line.strip("|").split("|") if c.strip())
        lines.append(line)
    return normalize_paragraphs("\n".join(lines))


def parse_markdown(data, filename, mode="file", pattern=None):
    """mode: 'file' = one chapter · 'heading' = split at # / ## · 'pattern' = chapter regex."""
    fm, body = split_frontmatter(decode_bytes(data))
    stem = re.sub(r"\.(md|markdown)$", "", filename, flags=re.IGNORECASE)
    if mode == "heading":
        chapters, cur_title, buf = [], None, []
        for line in body.split("\n"):
            m = MD_HEADING.match(line.strip())
            if m:
                if cur_title is not None or md_to_text("\n".join(buf)):
                    chapters.append({"title": cur_title or "Mở đầu", "content": md_to_text("\n".join(buf))})
                cur_title, buf = md_to_text(m.group(2)), []
            else:
                buf.append(line)
        chapters.append({"title": cur_title or stem, "content": md_to_text("\n".join(buf))})
        chapters = [c for c in chapters if c["content"] or c["title"] != "Mở đầu"]
    elif mode == "pattern":
        chapters = split_chapters(md_to_text(body), pattern)
    else:
        first = next((MD_HEADING.match(l.strip()) for l in body.split("\n") if MD_HEADING.match(l.strip())), None)
        text = md_to_text(body)
        lines = text.split("\n") if text else []
        if fm.get("title") or first:
            title = fm.get("title") or md_to_text(first.group(2))
        elif lines and len(lines[0]) <= MAX_HEADING_LEN:
            title = lines[0]   # a chapter with no markdown heading usually opens with its title line
        else:
            title = stem
        if lines and lines[0] == title:
            lines = lines[1:]
        chapters = [{"title": title, "content": "\n".join(lines)}]
    lang = fm.get("language") if fm.get("language") in ("zh", "en", "vi") else detect_lang(md_to_text(body))
    return {
        "title": fm.get("title") or stem, "author": "", "description": "",
        "source_lang": lang, "format": "md", "chapters": chapters or [{"title": stem, "content": ""}],
        "cover": None, "frontmatter": fm,
    }


# ---------- html / zip ----------

def parse_html(data, filename, pattern=None):
    markup = decode_bytes(data)
    m = re.search(r"<title[^>]*>(.*?)</title>", markup, re.S | re.I)
    text, _ = _html_to_text(markup)
    title = " ".join(unescape(m.group(1)).split()) if m else re.sub(r"\.x?html?$", "", filename, flags=re.I)
    return {
        "title": title, "author": "", "description": "", "source_lang": detect_lang(text),
        "format": "html", "chapters": split_chapters(text, pattern), "cover": None,
    }


def natural_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]


# ---------- archives (.zip / .rar), one or many books inside ----------

TEXT_ENTRY = re.compile(r"\.(txt|md|html?|xhtml)$", re.I)
HTML_ENTRY = re.compile(r"\.x?html?$", re.I)
GROUP_MODES = ("folder", "single", "file")
GROUP_MODE_LABELS = {
    "folder": "Mỗi thư mục con = 1 truyện",
    "single": "Cả archive = 1 truyện",
    "file": "Mỗi file = 1 truyện",
}


def entry_lines(name, raw):
    base = posixpath.basename(name)
    if base.lower().endswith(".md"):
        _, body = split_frontmatter(decode_bytes(raw))
        lines = md_to_text(body).split("\n")
    elif HTML_ENTRY.search(base):
        lines = _html_to_text(decode_bytes(raw))[0].split("\n")
    else:
        lines = normalize_paragraphs(decode_bytes(raw)).split("\n")
    return [l for l in lines if l]


# ---------- the header a Lofter download puts on every post ----------
#
# Measured 2026-09-17 on Aurel's own zips (凡登海姆… · Bright · 声明 · (không rõ)):
#
#   【6927】…-序.                          <- post title, already taken as the chapter title
#   3.4.2020                               <- date, not always there
#   https://hongli243.lofter.com/post/…    <- the post link, always right above the rule
#   ——————————————————————————————          <- the rule closes the metadata block
#   ［Ảnh］ https://imglf4.lf127.net/…      <- image links pulled out of the post
#   彭哥列第十代首领…                        <- the author's blurb / cast notes
#   #6927 #ALL27 大家不要站錯ㄌ              <- tags close the block, Lofter convention
#   序.                                     <- the title again, then the prose starts
#
POST_URL_LINE = re.compile(r"^https?://\S+$")
RULE_LINE = re.compile(r"^[\s\-—–─_=＝*·.。~]{6,}$")
IMAGE_LINE = re.compile(r"^[［\[(]?\s*(?:ảnh|anh|图片|圖片|image|img)\s*[］\])]?\s*[:：]?\s*https?://\S+$", re.I)
TAG_LINE = re.compile(r"^#\S")
# how far past the rule to keep looking for the tag line that closes the block
HEADER_WINDOW = 12


def split_post_header(lines, title=""):
    """(header, body) for lines *after* the post title. header is [] if this is not a post dump."""
    url_at = next((i for i, l in enumerate(lines[:4]) if POST_URL_LINE.match(l)), None)
    if url_at is None:
        return [], lines
    cut = url_at
    if cut + 1 < len(lines) and RULE_LINE.match(lines[cut + 1]):
        cut += 1
    for i in range(cut + 1, min(cut + 1 + HEADER_WINDOW, len(lines))):
        if TAG_LINE.match(lines[i]):
            cut = i
            break
    body = lines[cut + 1:]
    key = (title or "").strip(" .。:：")
    while body:
        first = body[0]
        if IMAGE_LINE.match(first) or RULE_LINE.match(first) or (key and first.strip(" .。:：") == key):
            body = body[1:]
            continue
        break
    if not body:
        return [], lines   # stripping would empty the chapter — leave it alone
    return lines[:cut + 1] + lines[cut + 1:len(lines) - len(body)], body


# An allowlist, not "starts with a symbol". Measured 2026-09-17 across the inbox zips:
# ♫ opens 24 author notes, but “ opens 69 lines of dialogue, 「 8, 【 4, 《 and 〈 titles.
# A generic symbol rule would eat the story. PS / 注： sit at the *end* of a post, not the start.
# 注： / 註： stay: those are footnotes with reference value, not the author chatting.
NOTE_LINE = re.compile(
    r"^\s*(?:[♫♪★☆※◎✿▲△●◆■]"
    r"|(?:p\.?\s?s\.?|note|作者有话说?|作者的话)\s*[:：、.])", re.I)
NOTE_MAX_LEN = 200


def strip_author_notes(lines):
    """Notes at the top and bottom of a chapter. The middle is story; never empty the chapter."""
    def is_note(l):
        return len(l) <= NOTE_MAX_LEN and bool(NOTE_LINE.match(l))

    body, dropped = list(lines), []
    while len(body) > 1 and is_note(body[0]):
        dropped.append(body.pop(0))
    while len(body) > 1 and is_note(body[-1]):
        dropped.append(body.pop())
    return dropped, body


def entry_chapter(name, raw, strip_header=False):
    """One archive entry -> one chapter, the way a Lofter download is laid out."""
    lines = entry_lines(name, raw)
    while lines and not re.search(r"\w", lines[0]):
        lines.pop(0)   # decorative rules like ——————
    title = re.sub(r"\.\w+$", "", posixpath.basename(name))
    # line 1 is the post title, line 2 the source link
    if lines and len(lines[0]) <= 80:
        title = lines.pop(0)
    dropped = []
    if strip_header:
        dropped, lines = split_post_header(lines, title)
        notes, lines = strip_author_notes(lines)
        dropped += notes
    if lines and POST_URL_LINE.match(lines[0]):
        lines.pop(0)
    return {"title": title, "content": "\n".join(lines), "dropped": dropped}


def strip_text_header(text, title=""):
    """Same cut for a whole file: its first line is the post title, keep that."""
    lines = text.split("\n")
    if len(lines) < 2:
        return text, []
    dropped, body = split_post_header(lines[1:], title or lines[0])
    notes, body = strip_author_notes(body)
    dropped += notes
    if not dropped:
        return text, []
    return "\n".join([lines[0]] + body), dropped


def _usable_entries(entries):
    """(text files, epub files) — junk, covers and sidecars dropped."""
    text, epub = [], []
    for name, _ in entries:
        base = posixpath.basename(name)
        if not base or base.startswith((".", "_")) or "__MACOSX" in name:
            continue
        if TEXT_ENTRY.search(base):
            text.append(name)
        elif base.lower().endswith(".epub"):
            epub.append(name)
    text.sort(key=natural_key)
    epub.sort(key=natural_key)
    return text, epub


def common_prefix(names):
    """A single wrapper folder ('Tên bộ/…') says nothing about book boundaries — drop it."""
    prefix, rest = "", list(names)
    while rest and all("/" in n for n in rest) and len({n.split("/", 1)[0] for n in rest}) == 1:
        prefix += rest[0].split("/", 1)[0] + "/"
        rest = [n.split("/", 1)[1] for n in rest]
    return prefix


def _stem(name):
    return re.sub(r"\.\w+$", "", posixpath.basename(name))


def group_entries(entries, filename, mode="folder"):
    """Split an archive into candidate books: [{key, title, names, kind}]."""
    if mode not in GROUP_MODES:
        raise ValueError("Kiểu tách không hợp lệ")
    text, epub = _usable_entries(entries)
    if not text and not epub:
        # the "- ảnh" half of a Lofter download is images plus an underscored index
        if any(re.search(r"\.(jpe?g|png|gif|webp|bmp)$", n, re.I) for n, _ in entries):
            raise ValueError("Archive này chỉ có ảnh, không có file chữ nào — "
                             "bản tải “- ảnh” đi kèm thì không nhập được thành truyện")
        raise ValueError("Archive không có file .txt / .md / .html / .epub nào")

    groups = []
    if text:
        if mode == "single":
            groups.append({"key": "*", "title": re.sub(r"\.(zip|rar)$", "", filename, flags=re.I),
                           "names": text, "kind": "archive"})
        elif mode == "file":
            groups += [{"key": n, "title": _stem(n), "names": [n], "kind": "file"} for n in text]
        else:
            prefix = common_prefix(text)
            rels = [n[len(prefix):] for n in text]
            if not any("/" in r for r in rels):
                # nothing but a flat list of files: that is one book's chapters (a Lofter
                # download), not one book per file. Its name is the folder they sat in.
                wrapper = prefix.rstrip("/").rsplit("/", 1)[-1]
                title = wrapper or re.sub(r"\.(zip|rar)$", "", filename, flags=re.I)
                if len(text) == 1:
                    groups.append({"key": text[0], "title": wrapper or _stem(text[0]),
                                   "names": text, "kind": "file"})
                else:
                    groups.append({"key": "*", "title": title, "names": text, "kind": "archive"})
                return groups + [{"key": n, "title": _stem(n), "names": [n], "kind": "epub"} for n in epub]
            buckets = {}
            for n in text:
                rel = n[len(prefix):]
                if "/" in rel:
                    key = rel.split("/", 1)[0]
                    buckets.setdefault(key, {"key": prefix + key, "title": key, "names": [], "kind": "folder"})
                    buckets[key]["names"].append(n)
                else:
                    buckets[n] = {"key": n, "title": _stem(n), "names": [n], "kind": "file"}
            groups += list(buckets.values())
    # an .epub inside the archive is already a whole book; it never merges into chapters.
    # In 'single' mode an epub sitting next to text files is the original the text came
    # from, not another book — the old one-book-per-zip reader ignored it, so keep that.
    if epub and not (mode == "single" and text):
        groups += [{"key": n, "title": _stem(n), "names": [n], "kind": "epub"} for n in epub]
    return groups


def parse_group(entry_map, group, pattern=None, fmt="zip", strip_header=False):
    """Turn one candidate book into the same dict shape parse_file returns."""
    names = group["names"]
    if not names:
        raise ValueError(f"“{group['title']}” không có file nào")
    if len(names) == 1:
        name = names[0]
        base = posixpath.basename(name)
        raw = entry_map[name]
        if base.lower().endswith(".epub"):
            parsed = parse_epub(raw, base)
        elif base.lower().endswith(".md"):
            parsed = parse_markdown(raw, base, "pattern", pattern)
        elif HTML_ENTRY.search(base):
            parsed = parse_html(raw, base, pattern)
        else:
            # a lone file is a whole novel, so split it on chapter headings
            text = normalize_paragraphs(decode_bytes(raw))
            if strip_header:
                text, _ = strip_text_header(text)
            parsed = parse_txt(text.encode("utf-8"), base, pattern)
        if group.get("title"):
            parsed["title"] = group["title"]
        if not parsed["chapters"]:
            parsed["chapters"] = [{"title": parsed["title"], "content": ""}]
        return parsed

    chapters, sample = [], []
    for name in names:
        ch = entry_chapter(name, entry_map[name], strip_header)
        ch.pop("dropped", None)
        chapters.append(ch)
        sample.extend(ch["content"].split("\n")[:50])
    return {
        "title": group["title"], "author": "", "description": "",
        "source_lang": detect_lang("\n".join(sample)), "format": fmt,
        "chapters": chapters, "cover": None,
    }


def header_preview(entry_map, group, limit=24):   # a header can only run so long, so this shows all of it
    """The lines “bỏ phần đầu bài” would cut from this group's first file."""
    name = group["names"][0]
    raw = entry_map.get(name)
    if raw is None or name.lower().endswith(".epub"):
        return []
    try:
        if len(group["names"]) == 1:
            _, dropped = strip_text_header(normalize_paragraphs(decode_bytes(raw)))
        else:
            dropped = entry_chapter(name, raw, True)["dropped"]
    except Exception:
        return []
    return [l[:160] for l in dropped[:limit]]


def scan_archive(entries, filename, mode="folder", pattern=None, strip_header=False):
    """Preview: what books are in here, and how many chapters each would get."""
    entry_map = dict(entries)
    out = []
    for g in group_entries(entries, filename, mode):
        if len(g["names"]) == 1:
            try:
                count = len(parse_group(entry_map, g, pattern, strip_header=strip_header)["chapters"])
            except Exception:
                count = 1
        else:
            count = len(g["names"])
        out.append({
            "key": g["key"], "title": g["title"], "kind": g["kind"],
            "files": len(g["names"]), "chapters": count,
            "sample": [posixpath.basename(n) for n in g["names"][:3]],
            "dropped": header_preview(entry_map, g),
        })
    return out


def parse_archive(data, filename, pattern=None, mode="single", rar_tool="", strip_header=False):
    """Whole archive as ONE book — the path used when appending into an existing book."""
    entries = archives.read_archive(data, filename, rar_tool)
    groups = group_entries(entries, filename, mode)
    if len(groups) > 1:
        # several books but one slot: chain them so nothing is silently dropped
        entry_map = dict(entries)
        parts = [parse_group(entry_map, g, pattern, strip_header=strip_header) for g in groups]
        base = parts[0]
        chapters = []
        for g, p in zip(groups, parts):
            if len(parts) > 1 and len(p["chapters"]) > 1:
                chapters.append({"title": g["title"], "content": ""})
            chapters += p["chapters"]
        base["chapters"] = chapters
        base["title"] = re.sub(r"\.(zip|rar)$", "", filename, flags=re.I)
        return base
    return parse_group(dict(entries), groups[0], pattern, strip_header=strip_header)


def parse_zip(data, filename, pattern=None, strip_header=False):
    return parse_archive(data, filename, pattern, strip_header=strip_header)


IMPORTABLE = (".epub", ".txt", ".md", ".zip", ".rar", ".html", ".htm")


def parse_file(data, filename, pattern=None, md_mode="file", rar_tool="", strip_header=False):
    lower = filename.lower()
    if lower.endswith(".epub"):
        return parse_epub(data, filename)
    if lower.endswith(".txt"):
        if strip_header:
            text, dropped = strip_text_header(normalize_paragraphs(decode_bytes(data)))
            if dropped:
                data = text.encode("utf-8")
        return parse_txt(data, filename, pattern)
    if lower.endswith(".md"):
        return parse_markdown(data, filename, md_mode, pattern)
    if lower.endswith((".zip", ".rar")):
        return parse_archive(data, filename, pattern, rar_tool=rar_tool, strip_header=strip_header)
    if lower.endswith((".html", ".htm")):
        return parse_html(data, filename, pattern)
    raise ValueError("Chỉ hỗ trợ .epub .txt .md .zip .rar .html")

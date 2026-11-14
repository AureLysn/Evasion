"""Kệ Sách — scan a library folder into series and chapters. Read-only: nothing here writes under the root.

Layout rules (no fixed structure is assumed; Aurel's Drive layout is not decided yet, see README):
  * a folder is a SERIES when it holds readable files directly (.txt .md .epub .cbz .zip) or sub-folders of images;
  * each text file / archive is one chapter, each sub-folder of images is one chapter;
  * a folder that holds only images is a single-chapter series (its pages are the images).
Ids are short hashes of the relative path and only ever resolve through the index built here, so a request
cannot name a path outside the root.
"""
import hashlib
import os
import re
import time
import zipfile
from pathlib import Path

TEXT_EXT = {".txt", ".md", ".epub"}
ARCHIVE_EXT = {".cbz", ".zip"}
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
MAX_DEPTH = 5


def nat_key(name):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", name)]


def short_id(rel):
    return hashlib.sha1(rel.encode("utf-8")).hexdigest()[:10]


def parse_root(text):
    """What the user typed -> (absolute Path or None, message). Accepts what Windows "Copy as path" gives (quotes), stray
    spaces, forward slashes, %VAR% and ~. Refuses what cannot work, with a reason: a Drive link, a relative path."""
    raw = (text or "").strip()
    while len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in "\"'":
        raw = raw[1:-1].strip()
    if not raw:
        return None, "Chưa chọn thư mục thư viện"
    if re.match(r"(?i)^(https?://|drive\.google\.com)", raw) or "drive.google.com" in raw.lower():
        return None, "Đây là link Drive. Kệ Sách đọc thư mục trên máy: dùng đường dẫn của thư mục trong Google Drive for Desktop, ví dụ G:\\My Drive\\Truyen"
    expanded = os.path.expanduser(os.path.expandvars(raw))
    if re.search(r"%[^%]+%", expanded):
        return None, f"Biến môi trường chưa có giá trị: {raw}"
    p = Path(expanded)
    if not p.is_absolute():
        return None, f"Cần đường dẫn đầy đủ (bắt đầu bằng tên ổ đĩa, ví dụ G:\\My Drive\\Truyen), không phải: {raw}"
    return p.resolve(), ""


def tree_of(series):
    """Fandom -> group -> counts, from the folders as they are on disk. Names only; two levels, no third."""
    t = {}
    for s in series:
        g = t.setdefault(s["fandom"], {}).setdefault(s["group"], {"series": 0, "loose": 0})
        g["loose" if s["loose"] else "series"] += len(s["chapters"]) if s["loose"] else 1
    return [{"fandom": f, "groups": [{"group": g, **c} for g, c in sorted(gs.items(), key=lambda kv: nat_key(kv[0]))]}
            for f, gs in sorted(t.items(), key=lambda kv: nat_key(kv[0]))]


class Library:
    """One shelf = one folder. `prefix` keeps several shelves apart: it is mixed into series ids and into the keys other
    stores use for a path, and is "" for the first / migrated shelf so every id made before shelves existed stays valid."""

    def __init__(self, root, shelf_id="", name="", prefix=""):
        self.raw = (root or "").strip() if isinstance(root, str) else ""
        self.root, self._parse_error = parse_root(root) if root else (None, "")
        self.shelf_id, self.name, self.prefix = shelf_id, name, prefix
        self.series = {}      # id -> dict
        self.chapters = {}    # (series id, chapter id) -> dict
        self.error = ""
        self.scans = 0        # counts scans, so a merged view knows when to rebuild
        self.scanned_at = 0

    def relkey(self, path):
        """Path inside this shelf as other stores remember it: relative to the root, with the shelf prefix when there is one."""
        return self.prefix + path.relative_to(self.root).as_posix()

    def scan(self):
        self.scans += 1
        self.scanned_at = int(time.time())
        self.series.clear()
        self.chapters.clear()
        self.error = ""
        if not self.root:
            self.error = self._parse_error or "Chưa chọn thư mục thư viện"
            return
        if self.root.is_file():
            self.error = f"Đây là một file, cần thư mục chứa truyện: {self.root.parent}"
            return
        if not self.root.is_dir():
            drive = self.root.drive
            if drive and not Path(drive + os.sep).exists():
                self.error = f"Ổ {drive} chưa có trên máy. Google Drive for Desktop đã chạy và đã mount chưa?"
            else:
                self.error = f"Không thấy thư mục: {self.root}"
            return
        self._walk(self.root, 0)

    # ---- scanning ----
    def _walk(self, d, depth):
        try:
            entries = sorted(d.iterdir(), key=lambda p: nat_key(p.name))
        except OSError:
            return 0
        files = [p for p in entries if p.is_file()]
        dirs = [p for p in entries if p.is_dir() and not p.name.startswith(("_", "."))]
        image_dirs = [s for s in dirs if self._has_images(s)]
        sub_dirs = [s for s in dirs if s not in image_dirs]
        found = 0
        if depth < MAX_DEPTH:
            for sub in sub_dirs:
                found += self._walk(sub, depth + 1)
        own_files = []
        for p in files:
            ext = p.suffix.lower()
            if ext in TEXT_EXT:
                own_files.append(("text", p))
            elif ext in ARCHIVE_EXT:
                own_files.append(("comic", p))
        images = [p for p in files if p.suffix.lower() in IMAGE_EXT]
        if d == self.root:
            return found
        parts = d.relative_to(self.root).parts
        # Fandom folder (depth 1) or group folder (depth 2) that holds series AND loose files: the files are one-shots
        # ("chuong le"), and an image-only sub-folder is then a one-chapter series of its own.
        if found and depth <= 2:
            for sub in image_dirs:
                self._add_series(sub, [("comic", sub)])
                found += 1
            if own_files:
                self._add_series(d, own_files, loose=True)
                found += 1
            return found
        own = own_files + [("comic", sub) for sub in image_dirs]
        if not own and len(images) >= 2:
            own = [("comic", d)]
        if own:
            self._add_series(d, own)
            return found + 1
        return found

    def _has_images(self, d):
        try:
            return sum(1 for p in d.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXT) >= 2
        except OSError:
            return False

    def _add_series(self, d, chapters, loose=False):
        rel = d.relative_to(self.root).as_posix()
        sid = short_id(self.prefix + rel + ("#le" if loose else ""))
        parts = d.relative_to(self.root).parts
        # a series folder is the last part: root/Fandom/Group/Series; a container's own files belong to that container
        names = parts if loose else parts[:-1]
        fandom = names[0] if len(names) >= 1 else ""
        group = names[1] if len(names) >= 2 else ""
        items = []
        for kind, p in chapters:
            crel = p.relative_to(self.root).as_posix()
            cid = short_id(crel)
            title = p.stem if p.is_file() else p.name
            if p == d:
                title = d.name
            try:
                size = p.stat().st_size if p.is_file() else 0   # with the name, how a chapter is recognised after Drive moves it
            except OSError:
                size = 0
            item = {"id": cid, "title": title, "kind": kind, "path": p, "size": size}
            items.append(item)
            self.chapters[(sid, cid)] = item
        kinds = {c["kind"] for c in items}
        self.series[sid] = {
            "id": sid, "title": "Chương lẻ" if loose else d.name, "path": d, "rel": rel, "key": self.prefix + rel, "loose": loose, "shelf": self.shelf_id,
            "fandom": fandom, "group": group,
            "kind": "comic" if kinds == {"comic"} else ("text" if kinds == {"text"} else "mixed"),
            "chapters": items,
        }

    # ---- public views ----
    def list(self, progress=None):
        """`read` = how many chapters are behind the reader: the index of the last chapter opened (0 if none)."""
        out = []
        for s in sorted(self.series.values(), key=lambda s: nat_key(s["title"])):
            last = (progress or {}).get(s["id"], {}).get("chapter")
            ids = [c["id"] for c in s["chapters"]]
            out.append({"id": s["id"], "title": s["title"], "kind": s["kind"], "chapters": len(ids), "where": s["rel"],
                        "fandom": s["fandom"], "group": s["group"], "loose": s["loose"], "shelf": s["shelf"],
                        "read": ids.index(last) + 1 if last in ids else 0})
        return out

    def tree(self):
        return tree_of(self.series.values())

    def detail(self, sid):
        s = self.series.get(sid)
        if not s:
            return None
        return {"id": sid, "title": s["title"], "kind": s["kind"], "where": s["rel"], "loose": s["loose"], "shelf": s["shelf"],
                "fandom": s["fandom"], "group": s["group"],
                "chapters": [{"id": c["id"], "title": c["title"], "kind": c["kind"]} for c in s["chapters"]]}

    # ---- chapter content ----
    def chapter(self, sid, cid):
        return self.chapters.get((sid, cid))

    def pages(self, sid, cid):
        c = self.chapter(sid, cid)
        if not c or c["kind"] != "comic":
            return None
        p = c["path"]
        if p.is_dir():
            names = [q.name for q in p.iterdir() if q.is_file() and q.suffix.lower() in IMAGE_EXT]
        else:
            with zipfile.ZipFile(p) as z:
                names = [n for n in z.namelist() if Path(n).suffix.lower() in IMAGE_EXT and not n.endswith("/")]
        return sorted(names, key=nat_key)

    def page_bytes(self, sid, cid, index):
        names = self.pages(sid, cid)
        if names is None or not (0 <= index < len(names)):
            return None, None
        c = self.chapter(sid, cid)
        p, name = c["path"], names[index]
        if p.is_dir():
            data = (p / name).read_bytes()
        else:
            with zipfile.ZipFile(p) as z:
                data = z.read(name)
        return data, Path(name).suffix.lower()

    def stamp(self, sid, cid, n):
        """Changes whenever the source image changes (modified time + size), so caches and thumbnails notice a replaced file."""
        c = self.chapter(sid, cid)
        names = self.pages(sid, cid)
        if not c or names is None or not (0 <= n < len(names)):
            return None
        p = c["path"]
        st = (p / names[n]).stat() if p.is_dir() else p.stat()
        return f"{st.st_mtime_ns:x}-{st.st_size:x}-{n}"

    def cover_target(self, sid):
        """(chapter id, page) the cover is made from: the first page of the first comic chapter."""
        s = self.series.get(sid)
        for c in (s["chapters"] if s else []):
            if c["kind"] == "comic":
                return c["id"], 0
        return None

    def cover(self, sid):
        s = self.series.get(sid)
        if not s:
            return None, None
        for c in s["chapters"]:
            if c["kind"] == "comic":
                data, ext = self.page_bytes(sid, c["id"], 0)
                if data:
                    return data, ext
        return None, None

    def text_of(self, c):
        """Text of a chapter dict (as found in a series' chapter list); only for kind == "text"."""
        p = c["path"]
        return epub_text(p) if p.suffix.lower() == ".epub" else decode_text(p.read_bytes())

    def text(self, sid, cid):
        c = self.chapter(sid, cid)
        if not c or c["kind"] != "text":
            return None
        p = c["path"]
        if p.suffix.lower() == ".epub":
            return epub_text(p)
        return decode_text(p.read_bytes())


def decode_text(data):
    if data[:3] == b"\xef\xbb\xbf":
        return data[3:].decode("utf-8", "replace")
    if data[:2] in (b"\xff\xfe", b"\xfe\xff"):
        return data.decode("utf-16", "replace")
    for enc in ("utf-8", "gb18030", "big5"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode("utf-8", "replace")


def epub_text(path):
    """Plain text of an EPUB in reading order: spine items, tags stripped, block ends become blank lines."""
    import html
    import posixpath
    out = []
    with zipfile.ZipFile(path) as z:
        opf_path = re.search(r'full-path="([^"]+)"', z.read("META-INF/container.xml").decode("utf-8", "replace")).group(1)
        opf = z.read(opf_path).decode("utf-8", "replace")
        base = posixpath.dirname(opf_path)
        manifest = {m.group(1): m.group(2) for m in re.finditer(r'<item\b[^>]*?\bid="([^"]+)"[^>]*?\bhref="([^"]+)"', opf)}
        manifest.update({m.group(2): m.group(1) for m in re.finditer(r'<item\b[^>]*?\bhref="([^"]+)"[^>]*?\bid="([^"]+)"', opf) if m.group(2) not in manifest})
        for ref in re.findall(r'<itemref\b[^>]*?\bidref="([^"]+)"', opf):
            href = manifest.get(ref)
            if not href:
                continue
            try:
                markup = z.read(posixpath.normpath(posixpath.join(base, html.unescape(href)))).decode("utf-8", "replace")
            except KeyError:
                continue
            markup = re.sub(r"(?is)<(script|style)\b.*?</\1>", "", markup)
            markup = re.sub(r"(?i)</(p|div|h[1-6]|li|tr)>|<br\s*/?>", "\n\n", markup)
            text = html.unescape(re.sub(r"<[^>]+>", "", markup))
            out.append(re.sub(r"\n{3,}", "\n\n", text).strip())
    return "\n\n".join(t for t in out if t)

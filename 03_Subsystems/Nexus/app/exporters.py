"""Build .epub (EPUB 3 with an NCX for older readers) and .txt from a stored book."""
import io
import time
import uuid
import zipfile
from xml.sax.saxutils import escape

CSS = """body{font-family:serif;line-height:1.7;margin:0 4%;}
h1{font-size:1.4em;text-align:center;margin:1.2em 0 1em;}
p{text-indent:2em;margin:0 0 .6em;}
p.src{color:#777;font-size:.9em;margin-bottom:.15em;}
.cover{text-align:center;margin:0;padding:0;}
.cover img{max-width:100%;max-height:100vh;}
"""

IMAGE_EXT = {"image/jpeg": "jpg", "image/png": "png", "image/gif": "gif", "image/webp": "webp"}


def pick(chapter, variant):
    """Return (title, [(src_line, vi_line) | line]) for the requested variant."""
    src = chapter["content_src"].split("\n") if chapter["content_src"] else []
    vi = chapter["content_vi"].split("\n") if chapter["content_vi"] else []
    if variant == "src":
        return chapter["title"], [(None, l) for l in src]
    if variant == "bi":
        title = chapter["title_vi"] or chapter["title"]
        if chapter["title_vi"] and chapter["title_vi"] != chapter["title"]:
            title = f'{chapter["title_vi"]} — {chapter["title"]}'
        n = max(len(src), len(vi))
        pairs = []
        for i in range(n):
            pairs.append((src[i] if i < len(src) else None, vi[i] if i < len(vi) else ""))
        return title, pairs
    # vi: fall back to source for chapters not translated yet
    title = chapter["title_vi"] or chapter["title"]
    lines = vi if vi else src
    return title, [(None, l) for l in lines]


def book_title(book, variant):
    if variant == "src":
        return book["title"]
    return book["title_vi"] or book["title"]


def _xhtml(title, body, lang):
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n'
        f'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="{lang}" xml:lang="{lang}">\n'
        f'<head><meta charset="utf-8"/><title>{escape(title)}</title>'
        '<link rel="stylesheet" type="text/css" href="style.css"/></head>\n'
        f"<body>\n{body}\n</body>\n</html>\n"
    )


def build_epub(book, chapters, variant="vi", cover=None):
    lang = book["source_lang"] if variant == "src" else "vi"
    title = book_title(book, variant)
    uid = f"urn:uuid:{uuid.uuid4()}"
    modified = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    items, spine, nav_points, files = [], [], [], {}
    if cover:
        data, mime = cover
        ext = IMAGE_EXT.get(mime, "jpg")
        files[f"OEBPS/cover.{ext}"] = data
        items.append(f'<item id="cover-image" href="cover.{ext}" media-type="{mime}" properties="cover-image"/>')
        files["OEBPS/cover.xhtml"] = _xhtml(title, f'<div class="cover"><img src="cover.{ext}" alt="cover"/></div>', lang)
        items.append('<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>')
        spine.append('<itemref idref="cover" linear="no"/>')

    for i, ch in enumerate(chapters, 1):
        ch_title, pairs = pick(ch, variant)
        body = [f"<h1>{escape(ch_title)}</h1>"]
        for src_line, line in pairs:
            if src_line:
                body.append(f'<p class="src">{escape(src_line)}</p>')
            if line:
                body.append(f"<p>{escape(line)}</p>")
        name = f"ch{i:04d}.xhtml"
        files[f"OEBPS/{name}"] = _xhtml(ch_title, "\n".join(body), lang)
        items.append(f'<item id="c{i}" href="{name}" media-type="application/xhtml+xml"/>')
        spine.append(f'<itemref idref="c{i}"/>')
        nav_points.append((name, ch_title))

    nav_li = "\n".join(f'<li><a href="{h}">{escape(t)}</a></li>' for h, t in nav_points)
    files["OEBPS/nav.xhtml"] = _xhtml(
        "Mục lục", f'<nav epub:type="toc" id="toc"><h1>Mục lục</h1><ol>\n{nav_li}\n</ol></nav>', lang)
    ncx_points = "\n".join(
        f'<navPoint id="n{i}" playOrder="{i}"><navLabel><text>{escape(t)}</text></navLabel><content src="{h}"/></navPoint>'
        for i, (h, t) in enumerate(nav_points, 1)
    )
    files["OEBPS/toc.ncx"] = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">'
        f'<head><meta name="dtb:uid" content="{uid}"/></head>'
        f"<docTitle><text>{escape(title)}</text></docTitle><navMap>\n{ncx_points}\n</navMap></ncx>\n"
    )
    files["OEBPS/style.css"] = CSS

    cover_meta = '<meta name="cover" content="cover-image"/>' if cover else ""
    desc = f"<dc:description>{escape(book['description'])}</dc:description>" if book.get("description") else ""
    files["OEBPS/content.opf"] = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">\n'
        '<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">'
        f'<dc:identifier id="bookid">{uid}</dc:identifier>'
        f"<dc:title>{escape(title)}</dc:title>"
        f"<dc:creator>{escape(book.get('author') or '')}</dc:creator>"
        f"<dc:language>{lang}</dc:language>{desc}"
        f'<meta property="dcterms:modified">{modified}</meta>{cover_meta}'
        "</metadata>\n<manifest>\n"
        '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>\n'
        '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n'
        '<item id="css" href="style.css" media-type="text/css"/>\n'
        + "\n".join(items)
        + '\n</manifest>\n<spine toc="ncx">\n' + "\n".join(spine) + "\n</spine>\n</package>\n"
    )

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        # mimetype must be first and stored uncompressed, or readers reject the file
        z.writestr(zipfile.ZipInfo("mimetype"), "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        z.writestr("META-INF/container.xml",
                   '<?xml version="1.0"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
                   '<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>'
                   "</rootfiles></container>\n", compress_type=zipfile.ZIP_DEFLATED)
        for path, content in files.items():
            if isinstance(content, str):
                content = content.encode("utf-8")
            z.writestr(path, content, compress_type=zipfile.ZIP_DEFLATED)
    return buf.getvalue()


def build_txt(book, chapters, variant="vi"):
    out = [book_title(book, variant)]
    if book.get("author"):
        out.append(book["author"])
    out.append("")
    for ch in chapters:
        ch_title, pairs = pick(ch, variant)
        out += ["", ch_title, ""]
        for src_line, line in pairs:
            if src_line:
                out.append(src_line)
            if line:
                out.append(line)
    return ("\n".join(out) + "\n").encode("utf-8-sig")

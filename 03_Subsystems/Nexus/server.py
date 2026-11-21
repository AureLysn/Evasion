"""Trạm Dịch — local library, reader, editor and zh/en -> vi translator.

Run:  python server.py            (opens http://127.0.0.1:8765)
      python server.py --port 9000 --no-browser
Zero third-party dependencies: Python 3.11+ standard library only.
"""
import argparse
import io
import json
import mimetypes
import re
import sys
import threading
import time
import traceback
import urllib.request
import uuid
import webbrowser
import zipfile
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path, PurePosixPath
from urllib.parse import parse_qs, quote, unquote, urlparse

from app import archives, db, desk, exporters, importers, senses, translate, vault, vietphrase

STATIC = Path(__file__).resolve().parent / "static"
MAX_UPLOAD = 300 * 1024 * 1024
IMPORTABLE = importers.IMPORTABLE
EXTERNAL_ORIGINS = ("vault:", "store:")
LOCAL_HOSTS = ("127.0.0.1", "localhost")
COVER_TYPES = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif"}


class ApiError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status


routes = []


def route(method, pattern):
    rx = re.compile("^" + pattern + "$")

    def deco(fn):
        routes.append((method, rx, fn))
        return fn
    return deco


def need(obj, message="Không tìm thấy", status=404):
    if not obj:
        raise ApiError(status, message)
    return obj


# ---------- helpers ----------

def safe_filename(name):
    name = re.sub(r'[\\/:*?"<>|\x00-\x1f]', "_", name).strip(" .")
    return name[:150] or "book"


def parse_bytes(conn, data, filename, md_mode="file"):
    if not filename.lower().endswith(IMPORTABLE):
        raise ApiError(400, "Chỉ nhận file " + " ".join(IMPORTABLE))
    settings = db.get_settings(conn)
    try:
        return importers.parse_file(data, filename, settings.get("chapter_pattern") or None, md_mode,
                                    settings.get("rar_tool") or "", bool(settings.get("strip_post_header")))
    except archives.ArchiveError as e:
        raise ApiError(400, str(e))
    except Exception as e:
        traceback.print_exc()
        raise ApiError(400, f"Không đọc được file {filename}: {e}")


def target_args(src):
    """Optional 'add into an existing book' fields, shared by every import route."""
    into = str(src.get("into") or "")
    after = src.get("after_idx")
    return {
        "into": int(into) if into.isdigit() else None,
        "after_idx": int(after) if str(after if after is not None else "").lstrip("-").isdigit() else None,
        "skip_dupes": src.get("skip_dupes") in (True, 1, "1", "true"),
    }


def import_parsed(conn, parsed, origin, shelf_id=None, tags=None, into=None, after_idx=None,
                  skip_dupes=False, sensitive=False):
    if into:
        need(conn.execute("SELECT id FROM books WHERE id = ?", (into,)).fetchone(), "Không tìm thấy sách đích")
        r = db.append_chapters(conn, into, parsed["chapters"], after_idx, skip_dupes, sensitive)
        return {"book_id": into, "created": False, **r}
    book_id = db.create_book(conn, parsed, origin, shelf_id, sensitive)
    if parsed.get("cover"):
        save_cover(conn, book_id, *parsed["cover"])
    if tags:
        db.set_book_tags(conn, book_id, tags)
        conn.commit()
    return {"book_id": book_id, "created": True, "added": len(parsed["chapters"]), "skipped": [],
            "last_idx": len(parsed["chapters"]) - 1}


def import_bytes(conn, data, filename, origin, md_mode="file", **kw):
    return import_parsed(conn, parse_bytes(conn, data, filename, md_mode), origin, **kw)


def book_with_result(conn, result):
    book = db.get_book(conn, result["book_id"])
    book["import_result"] = result
    return book


def get_vault(conn):
    root, reason = vault.find_root(db.get_settings(conn))
    if root is None:
        raise ApiError(404, reason)
    return root


def save_cover(conn, book_id, data, mime):
    ext = COVER_TYPES.get(mime)
    if not ext:
        raise ApiError(400, "Ảnh bìa phải là jpg/png/webp/gif")
    for old in db.COVERS.glob(f"{book_id}.*"):
        old.unlink()
    (db.COVERS / f"{book_id}.{ext}").write_bytes(data)
    conn.execute("UPDATE books SET cover = ? WHERE id = ?", (f"{book_id}.{ext}", book_id))
    conn.commit()


def load_cover(book):
    if not book.get("cover"):
        return None
    p = db.COVERS / book["cover"]
    if not p.exists():
        return None
    return p.read_bytes(), mimetypes.guess_type(p.name)[0] or "image/jpeg"


def drive_roots(conn):
    return [Path(r) for r in db.get_settings(conn).get("drive_roots", []) if r]


def resolve_drive_path(conn, raw):
    """Only paths inside a configured root are reachable — no walking up to C:\\."""
    roots = drive_roots(conn)
    if not raw:
        return None, roots
    p = Path(raw).resolve()
    for r in roots:
        try:
            rr = r.resolve()
        except OSError:
            continue
        if p == rr or rr in p.parents:
            return p, roots
    raise ApiError(403, "Đường dẫn nằm ngoài các thư mục Drive đã khai trong Cài đặt")


# ---------- library ----------

@route("GET", r"/api/books")
def list_books(h, conn, q):
    tags = [t for t in (q.get("tags") or "").split(",") if t]
    return db.list_books(conn, q.get("shelf"), tags, q.get("q"), q.get("lang"), q.get("status"))


@route("POST", r"/api/books/upload")
def upload_book(h, conn, q):
    filename = unquote(q.get("filename") or "")
    shelf = int(q["shelf"]) if q.get("shelf", "").isdigit() else None
    result = import_bytes(conn, h.body(), filename, f"upload:{filename}", shelf_id=shelf, **target_args(q))
    return book_with_result(conn, result)


@route("POST", r"/api/books/bulk")
def books_bulk(h, conn, q):
    body = h.json()
    ids = [int(i) for i in body.get("ids") or [] if str(i).isdigit()]
    if not ids:
        raise ApiError(400, "Chưa chọn sách nào")
    marks = ",".join("?" * len(ids))
    action = body.get("action")
    if action == "delete":
        conn.execute(f"DELETE FROM books WHERE id IN ({marks})", ids)
        conn.execute("DELETE FROM tags WHERE id NOT IN (SELECT tag_id FROM book_tags)")
        conn.commit()
        for i in ids:
            for p in db.COVERS.glob(f"{i}.*"):
                p.unlink()
        return {"deleted": len(ids)}
    if action == "shelf":
        shelf = body.get("shelf_id")
        shelf = int(shelf) if str(shelf or "").isdigit() else None
        conn.execute(f"UPDATE books SET shelf_id = ? WHERE id IN ({marks})", [shelf, *ids])
        conn.commit()
        return {"moved": len(ids)}
    raise ApiError(400, "action phải là delete hoặc shelf")


@route("POST", r"/api/books/(\d+)/chapters/bulk")
def chapters_bulk(h, conn, q, book_id):
    book_id = int(book_id)
    need(db.get_book(conn, book_id))
    body = h.json()
    ids = [int(i) for i in body.get("ids") or [] if str(i).isdigit()]
    if not ids:
        raise ApiError(400, "Chưa chọn chương nào")
    marks = ",".join("?" * len(ids))
    if body.get("action") == "delete":
        cur = conn.execute(f"DELETE FROM chapters WHERE book_id = ? AND id IN ({marks})", [book_id, *ids])
        db.reindex(conn, book_id)
    elif body.get("action") == "clear_vi":
        cur = conn.execute(f"UPDATE chapters SET title_vi = '', content_vi = '', updated = ? WHERE book_id = ? AND id IN ({marks})",
                           [db.now(), book_id, *ids])
    else:
        raise ApiError(400, "action phải là delete hoặc clear_vi")
    db.touch_book(conn, book_id)
    conn.commit()
    return {"changed": cur.rowcount}


@route("POST", r"/api/books/(\d+)/append-text")
def append_text(h, conn, q, book_id):
    """Pasted text becomes one chapter, or several when split by the chapter pattern."""
    book_id = int(book_id)
    need(db.get_book(conn, book_id))
    body = h.json()
    text = importers.normalize_paragraphs(str(body.get("text") or ""))
    title = (body.get("title") or "").strip()
    if not text and not title:
        raise ApiError(400, "Chưa có nội dung")
    if body.get("split"):
        chapters = importers.split_chapters(text, db.get_settings(conn).get("chapter_pattern") or None)
    else:
        lines = text.split("\n") if text else []
        if not title and lines and len(lines[0]) <= importers.MAX_HEADING_LEN:
            title = lines.pop(0)
        chapters = [{"title": title or "Chương mới", "content": "\n".join(lines)}]
    args = target_args(body)
    return db.append_chapters(conn, book_id, chapters, args["after_idx"], args["skip_dupes"])


@route("GET", r"/api/books/(\d+)")
def get_book(h, conn, q, book_id):
    return need(db.get_book(conn, int(book_id)))


@route("PATCH", r"/api/books/(\d+)")
def patch_book(h, conn, q, book_id):
    book_id = int(book_id)
    need(db.get_book(conn, book_id))
    body = h.json()
    fields = {k: body[k] for k in ("title", "title_vi", "author", "description", "source_lang") if k in body}
    if "shelf_id" in body:
        fields["shelf_id"] = int(body["shelf_id"]) if body["shelf_id"] not in (None, "", "none") else None
    if fields:
        sets = ", ".join(f"{k} = ?" for k in fields)
        conn.execute(f"UPDATE books SET {sets}, updated = ? WHERE id = ?", [*fields.values(), db.now(), book_id])
    if "tags" in body:
        db.set_book_tags(conn, book_id, body["tags"] or [])
    conn.commit()
    return db.get_book(conn, book_id)


@route("POST", r"/api/books/(\d+)/progress")
def book_progress(h, conn, q, book_id):
    body = h.json()
    conn.execute("UPDATE books SET last_chapter_id = ?, last_scroll = ? WHERE id = ?",
                 (body.get("chapter_id"), float(body.get("scroll") or 0), int(book_id)))
    conn.commit()
    return {"ok": True}


@route("DELETE", r"/api/books/(\d+)")
def delete_book(h, conn, q, book_id):
    book = need(db.get_book(conn, int(book_id)))
    conn.execute("DELETE FROM books WHERE id = ?", (book["id"],))
    conn.execute("DELETE FROM tags WHERE id NOT IN (SELECT tag_id FROM book_tags)")
    conn.commit()
    for p in db.COVERS.glob(f"{book['id']}.*"):
        p.unlink()
    return {"ok": True}


@route("GET", r"/api/books/(\d+)/cover")
def get_cover(h, conn, q, book_id):
    book = need(db.get_book(conn, int(book_id)))
    cover = need(load_cover(book), "Sách chưa có bìa")
    return h.send_bytes(cover[0], cover[1], cache=True)


@route("POST", r"/api/books/(\d+)/cover")
def post_cover(h, conn, q, book_id):
    need(db.get_book(conn, int(book_id)))
    mime = (h.headers.get("Content-Type") or "").split(";")[0].strip()
    save_cover(conn, int(book_id), h.body(), mime)
    return db.get_book(conn, int(book_id))


@route("POST", r"/api/books/(\d+)/resplit")
def resplit_book(h, conn, q, book_id):
    """Re-split the whole book's source text with a heading pattern. Translations are dropped."""
    book = need(db.get_book(conn, int(book_id)))
    pattern = (h.json().get("pattern") or "").strip() or None
    if pattern:
        try:
            re.compile(pattern)
        except re.error as e:
            raise ApiError(400, f"Regex sai: {e}")
    parts = []
    for ch in book["chapters"]:
        full = db.get_chapter(conn, ch["id"])
        parts.append(full["title"])
        if full["content_src"]:
            parts.append(full["content_src"])
    chapters = importers.split_chapters("\n".join(parts), pattern)
    conn.execute("DELETE FROM chapters WHERE book_id = ?", (book["id"],))
    t = db.now()
    for i, ch in enumerate(chapters):
        conn.execute("INSERT INTO chapters(book_id, idx, title, content_src, updated) VALUES(?, ?, ?, ?, ?)",
                     (book["id"], i, ch["title"], ch["content"], t))
    conn.execute("UPDATE books SET last_chapter_id = NULL, updated = ? WHERE id = ?", (t, book["id"]))
    conn.commit()
    return db.get_book(conn, book["id"])


@route("GET", r"/api/books/(\d+)/export")
def export_book(h, conn, q, book_id):
    book, chapters, fmt, variant = _export_parts(conn, int(book_id), q)
    data, mime, name = _build_export(book, chapters, fmt, variant)
    return h.send_bytes(data, mime, filename=name)


@route("POST", r"/api/books/(\d+)/export-to-drive")
def export_to_drive(h, conn, q, book_id):
    body = h.json()
    book, chapters, fmt, variant = _export_parts(conn, int(book_id), body)
    folder, _ = resolve_drive_path(conn, body.get("folder"))
    if not folder or not folder.is_dir():
        raise ApiError(400, "Chọn một thư mục Drive hợp lệ")
    if vault.inside_any_vault(folder):
        # a copy of the vault on Drive is a backup; a stray file there
        # pollutes the backup and turns up in the next restore
        raise ApiError(403, "Không lưu vào bên trong vault hoặc bản mirror của vault. Chọn thư mục khác.")
    data, _, name = _build_export(book, chapters, fmt, variant)
    target = folder / name
    n = 1
    while target.exists():
        target = folder / f"{Path(name).stem} ({n}){Path(name).suffix}"
        n += 1
    target.write_bytes(data)
    return {"path": str(target), "bytes": len(data)}


def _export_parts(conn, book_id, q):
    book = need(db.get_book(conn, book_id))
    fmt = q.get("format", "epub")
    variant = q.get("variant", "vi")
    if fmt not in ("epub", "txt") or variant not in ("vi", "src", "bi"):
        raise ApiError(400, "format/variant không hợp lệ")
    chapters = db.rows(conn.execute("SELECT * FROM chapters WHERE book_id = ? ORDER BY idx", (book_id,)))
    for c in chapters:   # the file carries the "đổi nghĩa" fixes, like the reader
        c["content_vi"] = "\n".join(senses.shown(conn, book_id, c["id"], c["content_vi"])[0])
    return book, chapters, fmt, variant


def _build_export(book, chapters, fmt, variant):
    suffix = {"vi": "", "src": " [goc]", "bi": " [song ngu]"}[variant]
    name = safe_filename(exporters.book_title(book, variant) + suffix) + "." + fmt
    if fmt == "epub":
        return exporters.build_epub(book, chapters, variant, load_cover(book)), "application/epub+zip", name
    return exporters.build_txt(book, chapters, variant), "text/plain; charset=utf-8", name


# ---------- archives: one .zip / .rar, possibly several books ----------

STAGE_TTL = 6 * 3600


def stage_archive(data, filename):
    """Keep the upload on disk between “quét” and “nhập” so the browser sends it once."""
    cutoff = time.time() - STAGE_TTL
    for p in db.STAGING.iterdir():
        try:
            if p.is_file() and p.stat().st_mtime < cutoff:
                p.unlink()
        except OSError:
            pass
    token = uuid.uuid4().hex
    (db.STAGING / f"{token}.bin").write_bytes(data)
    (db.STAGING / f"{token}.name").write_text(filename, encoding="utf-8")
    return token


def read_staged(conn, token):
    if not re.fullmatch(r"[0-9a-f]{32}", token or ""):
        raise ApiError(400, "Token không hợp lệ")
    blob, name = db.STAGING / f"{token}.bin", db.STAGING / f"{token}.name"
    if not blob.is_file() or not name.is_file():
        raise ApiError(404, "File tải lên đã hết hạn hoặc bị dọn. Tải lại giúp mình.")
    filename = name.read_text(encoding="utf-8")
    settings = db.get_settings(conn)
    try:
        entries = archives.read_archive(blob.read_bytes(), filename, settings.get("rar_tool") or "")
    except archives.ArchiveError as e:
        raise ApiError(400, str(e))
    return entries, filename, settings


def strip_flag(src, settings):
    """The dialog sends its checkbox; anything else falls back to the setting."""
    v = src.get("strip_header")
    if v is None or v == "":
        return bool(settings.get("strip_post_header"))
    return v in (True, 1, "1", "true", "True")


def scan_payload(conn, token, filename, entries, mode, settings, strip):
    try:
        groups = importers.scan_archive(entries, filename, mode, settings.get("chapter_pattern") or None, strip)
    except ValueError as e:
        raise ApiError(400, str(e))
    return {
        "token": token, "filename": filename, "mode": mode, "groups": groups, "strip_header": strip,
        "modes": [{"id": m, "label": importers.GROUP_MODE_LABELS[m]} for m in importers.GROUP_MODES],
    }


def picked_groups(body, entries, filename):
    """The candidate books Aurel ticked, carrying whatever titles were edited in the dialog."""
    try:
        groups = importers.group_entries(entries, filename, body.get("mode") or "folder")
    except ValueError as e:
        raise ApiError(400, str(e))
    by_key = {g["key"]: g for g in groups}
    out = []
    for item in body.get("groups") or []:
        g = by_key.get(item.get("key"))
        if g:
            out.append({**g, "title": (item.get("title") or "").strip() or g["title"]})
    if not out:
        raise ApiError(400, "Chưa chọn truyện nào")
    return out


def unique_name(used, name):
    stem, dot, ext = name.rpartition(".")
    stem = stem or name
    out, n = name, 1
    while out.lower() in used:
        out = f"{stem} ({n}){dot}{ext}"
        n += 1
    used.add(out.lower())
    return out


def epub_from_parsed(parsed):
    """Archive → epub without touching the library: source text, no translation columns."""
    book = {"title": parsed["title"], "title_vi": "", "author": parsed.get("author", ""),
            "description": parsed.get("description", ""), "source_lang": parsed.get("source_lang", "zh")}
    chapters = [{"title": c["title"], "title_vi": "", "content_src": c["content"], "content_vi": ""}
                for c in parsed["chapters"]]
    return exporters.build_epub(book, chapters, "src", parsed.get("cover")), safe_filename(parsed["title"]) + ".epub"


@route("POST", r"/api/archive/scan")
def archive_scan(h, conn, q):
    filename = unquote(q.get("filename") or "")
    if not archives.is_archive(filename):
        raise ApiError(400, "Chỉ quét được .zip và .rar")
    data = h.body()
    if not data:
        raise ApiError(400, "File rỗng")
    token = stage_archive(data, filename)
    entries, filename, settings = read_staged(conn, token)
    return scan_payload(conn, token, filename, entries, q.get("mode") or "folder", settings, strip_flag(q, settings))


@route("POST", r"/api/archive/stage-drive")
def archive_stage_drive(h, conn, q):
    body = h.json()
    p, _ = resolve_drive_path(conn, body.get("path"))
    if not p or not p.is_file() or not archives.is_archive(p.name):
        raise ApiError(400, "Chọn một file .zip / .rar nằm trong thư mục Drive đã khai")
    if p.stat().st_size > MAX_UPLOAD:
        raise ApiError(400, "File quá lớn")
    token = stage_archive(p.read_bytes(), p.name)
    entries, filename, settings = read_staged(conn, token)
    return scan_payload(conn, token, filename, entries, body.get("mode") or "folder", settings, strip_flag(body, settings))


@route("POST", r"/api/archive/regroup")
def archive_regroup(h, conn, q):
    body = h.json()
    token = body.get("token") or ""
    entries, filename, settings = read_staged(conn, token)
    return scan_payload(conn, token, filename, entries, body.get("mode") or "folder", settings, strip_flag(body, settings))


@route("POST", r"/api/archive/import")
def archive_import(h, conn, q):
    body = h.json()
    entries, filename, settings = read_staged(conn, body.get("token") or "")
    entry_map = dict(entries)
    pattern = settings.get("chapter_pattern") or None
    shelf = int(body["shelf_id"]) if str(body.get("shelf_id") or "").isdigit() else None
    strip = strip_flag(body, settings)
    fmt = "rar" if archives.is_rar(filename) else "zip"
    books, failed = [], []
    for g in picked_groups(body, entries, filename):
        try:
            parsed = importers.parse_group(entry_map, g, pattern, fmt, strip)
        except Exception as e:
            traceback.print_exc()
            failed.append({"title": g["title"], "error": str(e)})
            continue
        r = import_parsed(conn, parsed, f"upload:{filename}#{g['key']}", shelf_id=shelf)
        books.append({"id": r["book_id"], "title": parsed["title"], "chapters": len(parsed["chapters"])})
    return {"books": books, "failed": failed}


@route("POST", r"/api/archive/epub")
def archive_to_epub(h, conn, q):
    body = h.json()
    entries, filename, settings = read_staged(conn, body.get("token") or "")
    entry_map = dict(entries)
    pattern = settings.get("chapter_pattern") or None
    strip = strip_flag(body, settings)
    groups = picked_groups(body, entries, filename)
    parsed = []
    for g in groups:
        try:
            parsed.append(importers.parse_group(entry_map, g, pattern, strip_header=strip))
        except Exception as e:
            traceback.print_exc()
            raise ApiError(400, f"“{g['title']}”: {e}")
    if len(parsed) == 1:
        data, name = epub_from_parsed(parsed[0])
        return h.send_bytes(data, "application/epub+zip", filename=name)
    used = set()
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        for p in parsed:
            data, name = epub_from_parsed(p)
            z.writestr(unique_name(used, name), data)
    stem = safe_filename(re.sub(r"\.(zip|rar)$", "", filename, flags=re.I))
    return h.send_bytes(buf.getvalue(), "application/zip", filename=f"{stem} ({len(parsed)} epub).zip")


@route("POST", r"/api/books/export-zip")
def export_books_zip(h, conn, q):
    body = h.json()
    ids = [int(i) for i in body.get("ids") or [] if str(i).isdigit()]
    if not ids:
        raise ApiError(400, "Chưa chọn sách nào")
    used = set()
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        for bid in ids:
            book, chapters, fmt, variant = _export_parts(conn, bid, body)
            data, _, name = _build_export(book, chapters, fmt, variant)
            z.writestr(unique_name(used, name), data)
    stamp = time.strftime("%Y%m%d-%H%M")
    return h.send_bytes(buf.getvalue(), "application/zip", filename=f"TranslateCenter {len(ids)} sach {stamp}.zip")


# ---------- chapters ----------

@route("GET", r"/api/chapters/(\d+)")
def get_chapter(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    sib = conn.execute(
        "SELECT (SELECT id FROM chapters WHERE book_id = ? AND idx < ? ORDER BY idx DESC LIMIT 1) AS prev,"
        " (SELECT id FROM chapters WHERE book_id = ? AND idx > ? ORDER BY idx LIMIT 1) AS next",
        (ch["book_id"], ch["idx"], ch["book_id"], ch["idx"])).fetchone()
    ch["prev_id"], ch["next_id"] = sib["prev"], sib["next"]
    # the translation as it is SHOWN, with Aurel's "đổi nghĩa" rules applied; content_vi stays as saved
    ch["vi_shown"], ch["sense_hits"] = senses.shown(conn, ch["book_id"], ch["id"], ch["content_vi"])
    ch["vi_base"] = ch["content_vi"]
    return ch


def _sense_context(conn, body):
    ch = need(db.get_chapter(conn, int(body.get("chapter_id") or 0)))
    return ch, need(db.get_book(conn, ch["book_id"]))


@route("POST", r"/api/senses/preview")
def senses_preview(h, conn, q):
    body = h.json()
    ch, book = _sense_context(conn, body)
    try:
        return senses.preview(conn, body, ch, book)
    except ValueError as e:
        raise ApiError(400, str(e))


@route("POST", r"/api/senses")
def senses_add(h, conn, q):
    body = h.json()
    ch, book = _sense_context(conn, body)
    try:
        return {"id": senses.add(conn, body, ch, book)}
    except ValueError as e:
        raise ApiError(400, str(e))


@route("DELETE", r"/api/senses/(\d+)")
def senses_delete(h, conn, q, rid):
    need(senses.delete(conn, int(rid)))
    return {"deleted": True}


@route("PATCH", r"/api/chapters/(\d+)")
def patch_chapter(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    body = h.json()
    fields = {}
    for k in ("title", "title_vi", "content_src", "content_vi"):
        if k in body:
            v = str(body[k] or "")
            fields[k] = importers.normalize_paragraphs(v) if k.startswith("content") else v.strip()
    if "summary" in body:
        fields["summary"] = " ".join(str(body["summary"] or "").split())[:300]
    if fields:
        sets = ", ".join(f"{k} = ?" for k in fields)
        conn.execute(f"UPDATE chapters SET {sets}, updated = ? WHERE id = ?", [*fields.values(), db.now(), ch["id"]])
        db.touch_book(conn, ch["book_id"])
        conn.commit()
    return get_chapter(h, conn, q, cid)


@route("POST", r"/api/books/(\d+)/chapters")
def add_chapter(h, conn, q, book_id):
    book = need(db.get_book(conn, int(book_id)))
    body = h.json()
    after = body.get("after_idx")
    idx = (int(after) + 1) if after is not None else len(book["chapters"])
    conn.execute("UPDATE chapters SET idx = idx + 1 WHERE book_id = ? AND idx >= ?", (book["id"], idx))
    cur = conn.execute("INSERT INTO chapters(book_id, idx, title, content_src, updated) VALUES(?, ?, ?, ?, ?)",
                       (book["id"], idx, body.get("title") or "Chương mới", body.get("content_src") or "", db.now()))
    db.touch_book(conn, book["id"])
    conn.commit()
    return {"id": cur.lastrowid}


@route("POST", r"/api/chapters/(\d+)/split")
def split_chapter(h, conn, q, cid):
    """Split at a paragraph index: paragraphs [line:] move into a new chapter right after."""
    ch = need(db.get_chapter(conn, int(cid)))
    body = h.json()
    line = int(body.get("line", 0))
    src = ch["content_src"].split("\n") if ch["content_src"] else []
    vi = ch["content_vi"].split("\n") if ch["content_vi"] else []
    if line <= 0 or line >= len(src):
        raise ApiError(400, "Đặt con trỏ vào giữa chương (không phải dòng đầu/cuối) rồi tách")
    conn.execute("UPDATE chapters SET idx = idx + 1 WHERE book_id = ? AND idx > ?", (ch["book_id"], ch["idx"]))
    conn.execute("UPDATE chapters SET content_src = ?, content_vi = ?, updated = ? WHERE id = ?",
                 ("\n".join(src[:line]), "\n".join(vi[:line]), db.now(), ch["id"]))
    title = (body.get("title") or "").strip() or f"{ch['title']} (tiếp)"
    cur = conn.execute(
        "INSERT INTO chapters(book_id, idx, title, title_vi, content_src, content_vi, updated) VALUES(?, ?, ?, '', ?, ?, ?)",
        (ch["book_id"], ch["idx"] + 1, title, "\n".join(src[line:]), "\n".join(vi[line:]), db.now()))
    db.touch_book(conn, ch["book_id"])
    conn.commit()
    return {"id": ch["id"], "new_id": cur.lastrowid}


@route("POST", r"/api/chapters/(\d+)/merge-next")
def merge_next(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    nxt = need(conn.execute("SELECT * FROM chapters WHERE book_id = ? AND idx > ? ORDER BY idx LIMIT 1",
                            (ch["book_id"], ch["idx"])).fetchone(), "Đây là chương cuối", 400)
    def join(a, b):
        return "\n".join(x for x in (a, b) if x)
    # the next chapter's title becomes a paragraph so nothing is lost —
    # unless it is only the "(tiếp)" title our own split generated
    keep_title = nxt["title"] != f"{ch['title']} (tiếp)"
    src = join(ch["content_src"], join(nxt["title"] if keep_title else "", nxt["content_src"]))
    vi = ""
    if ch["content_vi"] or nxt["content_vi"]:
        vi = join(ch["content_vi"], join((nxt["title_vi"] or nxt["title"]) if keep_title else "", nxt["content_vi"]))
    conn.execute("UPDATE chapters SET content_src = ?, content_vi = ?, updated = ? WHERE id = ?",
                 (src, vi, db.now(), ch["id"]))
    conn.execute("DELETE FROM chapters WHERE id = ?", (nxt["id"],))
    db.reindex(conn, ch["book_id"])
    db.touch_book(conn, ch["book_id"])
    conn.commit()
    return {"id": ch["id"]}


@route("POST", r"/api/chapters/(\d+)/move")
def move_chapter(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    step = -1 if int(h.json().get("dir", 1)) < 0 else 1
    other = conn.execute(
        "SELECT id, idx FROM chapters WHERE book_id = ? AND idx " + ("<" if step < 0 else ">") + " ? ORDER BY idx "
        + ("DESC" if step < 0 else "ASC") + " LIMIT 1", (ch["book_id"], ch["idx"])).fetchone()
    if other:
        conn.execute("UPDATE chapters SET idx = ? WHERE id = ?", (other["idx"], ch["id"]))
        conn.execute("UPDATE chapters SET idx = ? WHERE id = ?", (ch["idx"], other["id"]))
        conn.commit()
    return {"ok": True}


@route("DELETE", r"/api/chapters/(\d+)")
def delete_chapter(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    conn.execute("DELETE FROM chapters WHERE id = ?", (ch["id"],))
    db.reindex(conn, ch["book_id"])
    db.touch_book(conn, ch["book_id"])
    conn.commit()
    return {"ok": True}


# ---------- shelves / tags ----------

@route("GET", r"/api/shelves")
def list_shelves(h, conn, q):
    return {
        "shelves": db.rows(conn.execute(
            "SELECT s.id, s.name, s.position, (SELECT COUNT(*) FROM books b WHERE b.shelf_id = s.id) AS count"
            " FROM shelves s ORDER BY s.position, s.name")),
        "unshelved": conn.execute("SELECT COUNT(*) FROM books WHERE shelf_id IS NULL").fetchone()[0],
        "total": conn.execute("SELECT COUNT(*) FROM books").fetchone()[0],
        "tags": db.rows(conn.execute(
            "SELECT t.name, COUNT(bt.book_id) AS count FROM tags t JOIN book_tags bt ON bt.tag_id = t.id"
            " GROUP BY t.id ORDER BY count DESC, t.name")),
    }


@route("POST", r"/api/shelves")
def create_shelf(h, conn, q):
    name = (h.json().get("name") or "").strip()
    if not name:
        raise ApiError(400, "Tên tủ trống")
    pos = conn.execute("SELECT COALESCE(MAX(position), 0) + 1 FROM shelves").fetchone()[0]
    try:
        cur = conn.execute("INSERT INTO shelves(name, position) VALUES(?, ?)", (name, pos))
    except Exception:
        raise ApiError(400, "Đã có tủ tên này")
    conn.commit()
    return {"id": cur.lastrowid, "name": name}


@route("PATCH", r"/api/shelves/(\d+)")
def rename_shelf(h, conn, q, sid):
    name = (h.json().get("name") or "").strip()
    if not name:
        raise ApiError(400, "Tên tủ trống")
    conn.execute("UPDATE shelves SET name = ? WHERE id = ?", (name, int(sid)))
    conn.commit()
    return {"ok": True}


@route("DELETE", r"/api/shelves/(\d+)")
def delete_shelf(h, conn, q, sid):
    # books on it are kept and become "chưa xếp tủ"
    conn.execute("UPDATE books SET shelf_id = NULL WHERE shelf_id = ?", (int(sid),))
    conn.execute("DELETE FROM shelves WHERE id = ?", (int(sid),))
    conn.commit()
    return {"ok": True}


@route("POST", r"/api/tags/rename")
def rename_tag(h, conn, q):
    body = h.json()
    old, new = (body.get("old") or "").strip(), (body.get("new") or "").strip()
    if not old or not new:
        raise ApiError(400, "Thiếu tên tag")
    src = need(conn.execute("SELECT id FROM tags WHERE name = ?", (old,)).fetchone())
    dst = conn.execute("SELECT id FROM tags WHERE name = ? AND id != ?", (new, src["id"])).fetchone()
    if dst:  # merge into the existing tag
        conn.execute("INSERT OR IGNORE INTO book_tags(book_id, tag_id) SELECT book_id, ? FROM book_tags WHERE tag_id = ?",
                     (dst["id"], src["id"]))
        conn.execute("DELETE FROM tags WHERE id = ?", (src["id"],))
    else:
        conn.execute("UPDATE tags SET name = ? WHERE id = ?", (new, src["id"]))
    conn.commit()
    return {"ok": True}


# ---------- drive ----------

@route("GET", r"/api/drive/list")
def drive_list(h, conn, q):
    path, roots = resolve_drive_path(conn, q.get("path"))
    if path is None:
        return {"path": None, "parent": None,
                "entries": [{"name": str(r), "path": str(r), "is_dir": True, "exists": r.exists()} for r in roots]}
    if not path.is_dir():
        raise ApiError(400, "Không phải thư mục")
    entries = []
    try:
        for p in path.iterdir():
            try:
                is_dir = p.is_dir()
                if not is_dir and not p.name.lower().endswith(IMPORTABLE):
                    continue
                entries.append({"name": p.name, "path": str(p), "is_dir": is_dir,
                                "size": None if is_dir else p.stat().st_size})
            except OSError:
                continue
    except OSError as e:
        raise ApiError(400, f"Không đọc được thư mục: {e}")
    entries.sort(key=lambda e: (not e["is_dir"], e["name"].lower()))
    is_root = any(path == r.resolve() for r in roots if r.exists())
    return {"path": str(path), "parent": None if is_root else str(path.parent), "entries": entries}


@route("POST", r"/api/drive/import")
def drive_import(h, conn, q):
    body = h.json()
    shelf = body.get("shelf_id")
    shelf = int(shelf) if str(shelf or "").isdigit() else None
    target = target_args(body)
    ids, errors, added, skipped = [], [], 0, []
    # into one book, files land in name order (ch2 before ch10), each right after the previous
    for raw in sorted(body.get("paths") or [], key=importers.natural_key):
        try:
            p, _ = resolve_drive_path(conn, raw)
            if not p or not p.is_file():
                raise ApiError(400, "Không phải file")
            if p.stat().st_size > MAX_UPLOAD:
                raise ApiError(400, "File quá lớn")
            r = import_bytes(conn, p.read_bytes(), p.name, f"drive:{p}", shelf_id=shelf, **target)
            if r["created"]:
                ids.append(r["book_id"])
            elif target["after_idx"] is not None and r["added"]:
                target["after_idx"] = r["last_idx"]
            added += r["added"] if not r["created"] else 0
            skipped += r["skipped"]
        except ApiError as e:
            errors.append(f"{Path(raw).name}: {e}")
        except OSError as e:
            errors.append(f"{Path(raw).name}: {e}")
    return {"ids": ids, "errors": errors, "into": target["into"], "added": added, "skipped": skipped}


# ---------- vault (read only) ----------

@route("GET", r"/api/vault/info")
def vault_info(h, conn, q):
    root, reason = vault.find_root(db.get_settings(conn))
    # draft_labels: this build stores a chapter's vault `status:` — tram_dich_push.py asks before pushing drafts
    return {"root": str(root) if root else None, "error": reason, "draft_labels": True,
            "projects_root": str(vault.projects_root(root)) if root else None,
            "projects_roots": [str(p) for p in vault.projects_roots(root)] if root else []}


@route("GET", r"/api/vault/list")
def vault_list(h, conn, q):
    root = get_vault(conn)
    try:
        data = vault.list_dir(root, (q.get("path") or "").strip("/"))
    except PermissionError as e:
        raise ApiError(403, str(e))
    except (FileNotFoundError, OSError) as e:
        raise ApiError(404, str(e))
    for e in data["entries"]:
        asset = (e.get("meta") or {}).get("asset")
        if asset:
            try:
                path, _ = vault.asset_file(root, e["rel"])
                asset["resolved"] = str(path)
                asset["exists"] = path.is_file()
                asset["importable"] = path.name.lower().endswith(IMPORTABLE)
            except (FileNotFoundError, OSError) as err:
                asset["resolved"], asset["exists"], asset["error"] = None, False, str(err)
    return data


def vault_source(book):
    try:
        src = json.loads(book.get("vault_src") or "")
    except ValueError:
        return None
    return src if isinstance(src, dict) and src.get("rels") else None


def set_vault_source(conn, book_id, rels, mode, extend=True):
    """Remember which vault notes a book came from. Kept as JSON on the book, nothing per chapter."""
    book = db.get_book(conn, book_id)
    old = vault_source(book) if book else None
    keep = old["rels"] if (extend and old) else []
    merged = list(dict.fromkeys([*keep, *rels]))
    conn.execute("UPDATE books SET vault_src = ? WHERE id = ?",
                 (json.dumps({"rels": merged, "mode": mode}, ensure_ascii=False), book_id))
    conn.commit()


def tag_vault_status(parsed):
    """Carry the note's `status:` onto its chapters, so a draft stays marked as one in the library."""
    status = str((parsed.get("frontmatter") or {}).get("status") or "")
    for ch in parsed["chapters"]:
        ch["status"] = status
    return parsed


def _parse_vault_note(conn, root, rel, mode):
    path = vault.resolve_rel(root, rel)
    if not path.is_file():
        return None
    settings = db.get_settings(conn)
    data = path.read_bytes()   # read-only: the vault file is never opened for writing
    if path.suffix.lower() == ".md":
        parsed = tag_vault_status(importers.parse_markdown(data, path.name, mode, settings.get("chapter_pattern") or None))
    else:
        parsed = importers.parse_txt(data, path.name, settings.get("chapter_pattern") or None)
        if mode == "file":
            parsed["chapters"] = [{"title": parsed["title"],
                                   "content": "\n".join(c["content"] for c in parsed["chapters"])}]
    return parsed


@route("GET", r"/api/books/(\d+)/vault-status")
def vault_status(h, conn, q, book_id):
    """What the vault holds now that this book does not — read-only, writes nothing.

    Compares by content: a note is re-parsed the way it was imported, and each chapter is looked
    up among the book's `content_src`. Same text -> unchanged. Same title, other text -> the note
    was edited. Neither -> a new chapter.
    """
    book = need(db.get_book(conn, int(book_id)))
    src = vault_source(book)
    if not src:
        return {"linked": False}
    try:
        root = get_vault(conn)
    except ApiError as e:
        return {"linked": True, "error": str(e)}
    chapters = db.rows(conn.execute("SELECT id, title, title_vi, content_src FROM chapters WHERE book_id = ?", (book["id"],)))
    by_text = {c["content_src"] for c in chapters}
    by_title = {}
    for c in chapters:
        by_title.setdefault(db._title_key(c["title"]), c)
    mode = src.get("mode") or "file"
    known = set(src["rels"])
    out = {"linked": True, "mode": mode, "rels": src["rels"],
           "new_files": [], "new_chapters": [], "changed": [], "missing": [], "unchanged": 0}
    # files that appeared next to the notes this book was built from
    for folder in dict.fromkeys(str(PurePosixPath(r).parent) for r in src["rels"]):
        folder = "" if folder == "." else folder
        try:
            listing = vault.list_dir(root, folder)
        except (FileNotFoundError, PermissionError, OSError):
            continue
        for e in listing["entries"]:
            # a `…-aurel-viet-lai.md` note is this app's own output (desk.py), not a new source to import
            if not e["is_dir"] and e["rel"] not in known and not desk.OWN_NOTE.search(e["name"]):
                out["new_files"].append({"rel": e["rel"], "name": e["name"]})
    for rel in src["rels"]:
        try:
            parsed = _parse_vault_note(conn, root, rel, mode)
        except (PermissionError, OSError):
            parsed = None
        if parsed is None:
            out["missing"].append(rel)
            continue
        for ch in parsed["chapters"]:
            if ch["content"] in by_text:
                out["unchanged"] += 1
                continue
            hit = by_title.get(db._title_key(ch["title"]))
            if hit:
                out["changed"].append({"rel": rel, "title": ch["title"], "chapter_id": hit["id"]})
            else:
                out["new_chapters"].append({"rel": rel, "title": ch["title"]})
    out["total_new"] = len(out["new_files"]) + len(out["new_chapters"])
    return out


@route("POST", r"/api/books/(\d+)/vault-sync")
def vault_sync(h, conn, q, book_id):
    """Import the chosen new notes into this book. Existing chapters are never touched."""
    book = need(db.get_book(conn, int(book_id)))
    src = need(vault_source(book), "Sách này chưa gắn nguồn vault", 400)
    root = get_vault(conn)
    body = h.json()
    rels = [r for r in (body.get("paths") or []) if isinstance(r, str)]
    picks = [c for c in (body.get("chapters") or []) if isinstance(c, dict) and c.get("rel")]
    if not rels and not picks:
        raise ApiError(400, "Chưa chọn mục nào")
    mode = src.get("mode") or "file"
    chapters = []
    for rel in sorted(rels, key=importers.natural_key):
        parsed = _parse_vault_note(conn, root, rel, mode)
        if parsed is None:
            raise ApiError(404, f"Không thấy {rel}")
        chapters += parsed["chapters"]
    # single chapters picked out of a note the book already uses
    for rel in dict.fromkeys(c["rel"] for c in picks):
        parsed = _parse_vault_note(conn, root, rel, mode)
        if parsed is None:
            raise ApiError(404, f"Không thấy {rel}")
        wanted = {db._title_key(c.get("title")) for c in picks if c["rel"] == rel}
        chapters += [ch for ch in parsed["chapters"] if db._title_key(ch["title"]) in wanted]
    result = db.append_chapters(conn, book["id"], chapters, None, True, True)
    set_vault_source(conn, book["id"], rels, mode)
    return {**result, "book": db.get_book(conn, book["id"])}


@route("POST", r"/api/books/(\d+)/vault-refresh-chapter")
def vault_refresh_chapter(h, conn, q, book_id):
    """Take the source text of one chapter from the vault again.

    The old translation is dropped on purpose: it was written against the previous source and
    would no longer line up with it paragraph by paragraph. When the text is the same and only
    the note's `status:` moved (a draft that was finalised), the translation is kept.
    """
    book = need(db.get_book(conn, int(book_id)))
    src = need(vault_source(book), "Sách này chưa gắn nguồn vault", 400)
    root = get_vault(conn)
    ch = need(db.get_chapter(conn, int(h.json().get("chapter_id") or 0)))
    if ch["book_id"] != book["id"]:
        raise ApiError(400, "Chương không thuộc sách này")
    key = db._title_key(ch["title"])
    for rel in src["rels"]:
        parsed = _parse_vault_note(conn, root, rel, src.get("mode") or "file")
        for c in (parsed or {}).get("chapters", []):
            if db._title_key(c["title"]) == key:
                status = c.get("status", "")
                changed = c["content"] != ch["content_src"]
                if changed:
                    conn.execute("UPDATE chapters SET content_src = ?, content_vi = '', title_vi = '', vault_status = ?,"
                                 " updated = ? WHERE id = ?", (c["content"], status, db.now(), ch["id"]))
                    db.touch_book(conn, book["id"])
                else:
                    conn.execute("UPDATE chapters SET vault_status = ? WHERE id = ?", (status, ch["id"]))
                conn.commit()
                return {"ok": True, "rel": rel, "changed": changed, "status": status}
    raise ApiError(404, "Không còn thấy chương này trong các file nguồn")


@route("POST", r"/api/books/(\d+)/vault-link")
def vault_link(h, conn, q, book_id):
    """Attach a source list to a book imported before this existed, so it can be re-checked."""
    book = need(db.get_book(conn, int(book_id)))
    body = h.json()
    rels = [r for r in (body.get("paths") or []) if isinstance(r, str)]
    mode = body.get("mode") if body.get("mode") in ("file", "heading", "pattern") else "file"
    if not rels:
        raise ApiError(400, "Chưa chọn file nào")
    get_vault(conn)
    set_vault_source(conn, book["id"], rels, mode, extend=bool(body.get("extend")))
    return vault_status(h, conn, q, book_id)


@route("POST", r"/api/vault/import")
def vault_import(h, conn, q):
    """Several vault notes -> one book, one file per chapter (or split inside each file)."""
    root = get_vault(conn)
    body = h.json()
    rels = body.get("paths") or []
    mode = body.get("mode") if body.get("mode") in ("file", "heading", "pattern") else "file"
    if not rels:
        raise ApiError(400, "Chưa chọn file nào")
    settings = db.get_settings(conn)
    chapters, langs, project = [], [], None
    for rel in sorted(rels, key=importers.natural_key):
        try:
            path = vault.resolve_rel(root, rel)
        except PermissionError as e:
            raise ApiError(403, str(e))
        if not path.is_file():
            raise ApiError(404, f"Không thấy {rel}")
        project = project or rel.split("/")[0]
        data = path.read_bytes()   # read-only: the vault file is never opened for writing
        if path.suffix.lower() == ".md":
            parsed = tag_vault_status(importers.parse_markdown(data, path.name, mode, settings.get("chapter_pattern") or None))
        else:
            parsed = importers.parse_txt(data, path.name, settings.get("chapter_pattern") or None)
            if mode == "file":
                parsed["chapters"] = [{"title": parsed["title"],
                                       "content": "\n".join(c["content"] for c in parsed["chapters"])}]
        chapters += parsed["chapters"]
        langs.append(parsed["source_lang"])
    first = rels[0]
    title = (body.get("title") or "").strip() or (
        f"{project} · {Path(first).stem}" if len(rels) == 1 else f"{project} · {Path(first).parent.name or project}")
    book = {"title": title, "format": "md", "chapters": chapters,
            "source_lang": body.get("lang") if body.get("lang") in ("zh", "en", "vi") else max(set(langs), key=langs.count)}
    shelf = int(body["shelf_id"]) if str(body.get("shelf_id") or "").isdigit() else None
    origin = f"vault:{first}" + (f" (+{len(rels) - 1})" if len(rels) > 1 else "")
    result = import_parsed(conn, book, origin, shelf_id=shelf, tags=["vault", project], sensitive=True, **target_args(body))
    set_vault_source(conn, result["book_id"], rels, mode)
    return book_with_result(conn, result)


@route("POST", r"/api/vault/import-asset")
def vault_import_asset(h, conn, q):
    """Follow a source note's `asset:` (store + path_rel) to the original file in the store."""
    root = get_vault(conn)
    body = h.json()
    rel = body.get("path") or ""
    try:
        path, asset = vault.asset_file(root, rel)
    except PermissionError as e:
        raise ApiError(403, str(e))
    except (FileNotFoundError, OSError) as e:
        raise ApiError(404, str(e))
    if not path.is_file():
        raise ApiError(404, f"Kho không có file: {path}")
    if path.stat().st_size > MAX_UPLOAD:
        raise ApiError(400, "File quá lớn")
    shelf = int(body["shelf_id"]) if str(body.get("shelf_id") or "").isdigit() else None
    project = rel.split("/")[0]
    result = import_bytes(conn, path.read_bytes(), path.name, f"store:{asset['store']}/{asset['path_rel']}",
                          shelf_id=shelf, tags=["vault", project, "nguồn"], sensitive=True, **target_args(body))
    return book_with_result(conn, result)


# ---------- writing desk: Aurel's own version of a chapter ----------

def chapter_vault_rel(conn, root, book, ch):
    """Which vault note a chapter was taken from — matched by title, the way `vault-refresh-chapter` does."""
    src = vault_source(book)
    if not src:
        return None
    key = db._title_key(ch["title"])
    same_text = None
    for rel in src["rels"]:
        try:
            parsed = _parse_vault_note(conn, root, rel, src.get("mode") or "file")
        except (PermissionError, OSError):
            continue
        chapters = (parsed or {}).get("chapters", [])
        if any(db._title_key(c["title"]) == key for c in chapters):
            return rel
        # the title was edited in the library: the note whose text is still this chapter's source
        if same_text is None and ch.get("content_src") and any(c["content"] == ch["content_src"] for c in chapters):
            same_text = rel
    return same_text


def edit_view(ch, edit):
    if not edit:
        return {"exists": False, "base": "vi" if ch["content_vi"] else "src"}
    ref = ch["content_vi"] if edit["base"] == "vi" else ch["content_src"]
    return {"exists": True, "base": edit["base"], "content": edit["content"], "updated": edit["updated"],
            "saved_path": edit["saved_path"], "base_changed": edit["base_text"] != ref}


@route("GET", r"/api/chapters/(\d+)/edit")
def get_edit(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    return edit_view(ch, db.get_edit(conn, ch["id"]))


@route("PUT", r"/api/chapters/(\d+)/edit")
def put_edit(h, conn, q, cid):
    """Save Aurel's version. The chapter's own source and translation are not touched."""
    ch = need(db.get_chapter(conn, int(cid)))
    body = h.json()
    base = "vi" if body.get("base") == "vi" and ch["content_vi"] else "src"
    content = importers.normalize_paragraphs(str(body.get("content") or ""))
    ref = ch["content_vi"] if base == "vi" else ch["content_src"]
    old = db.get_edit(conn, ch["id"])
    before = old["content"] if old else importers.normalize_paragraphs(ref)
    edit = db.put_edit(conn, ch["id"], base, ref, content)
    if content != before:
        db.log_writing(conn, len(desk.prose(content).split()) - len(desk.prose(before).split()))
    return {**edit_view(ch, edit), "writing": db.writing_summary(conn)}


@route("GET", r"/api/writing")
def writing(h, conn, q):
    return db.writing_summary(conn)


@route("GET", r"/api/chapters/(\d+)/scenes")
def chapter_scenes(h, conn, q, cid):
    """The chapter's scene cards from the vault, for the board. Read only."""
    ch = need(db.get_chapter(conn, int(cid)))
    book = db.get_book(conn, ch["book_id"])
    need(vault_source(book), "Sách này chưa gắn nguồn vault", 400)
    root = get_vault(conn)
    rel = need(chapter_vault_rel(conn, root, book, ch), "Không tìm thấy note của chương này trong vault", 400)
    try:
        return desk.scenes(root, rel)
    except (PermissionError, OSError) as e:
        raise ApiError(404, str(e))


@route("DELETE", r"/api/chapters/(\d+)/edit")
def delete_edit(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    db.keep_edit_history(conn, ch["id"], force=True)   # dropping the version must stay undoable
    conn.execute("DELETE FROM edits WHERE chapter_id = ?", (ch["id"],))
    conn.commit()
    return {"ok": True}


@route("GET", r"/api/chapters/(\d+)/edit/history")
def edit_history(h, conn, q, cid):
    ch = need(db.get_chapter(conn, int(cid)))
    return db.rows(conn.execute(
        "SELECT id, saved, length(content) AS chars FROM edit_history WHERE chapter_id = ? ORDER BY saved DESC", (ch["id"],)))


@route("GET", r"/api/edit-history/(\d+)")
def edit_history_item(h, conn, q, hid):
    return dict(need(conn.execute("SELECT * FROM edit_history WHERE id = ?", (int(hid),)).fetchone()))


@route("GET", r"/api/chapters/(\d+)/vault-notes")
def chapter_vault_notes(h, conn, q, cid):
    """The plan and the arc outlines that belong with this chapter — listed from the vault, read only."""
    ch = need(db.get_chapter(conn, int(cid)))
    book = db.get_book(conn, ch["book_id"])
    src = vault_source(book)
    if not src:
        return {"linked": False}
    try:
        root = get_vault(conn)
        rel = chapter_vault_rel(conn, root, book, ch)
        project = (rel or src["rels"][0]).split("/")[0]
        return {"linked": True, "project": project, "chapter_rel": rel, **desk.around(root, project, rel),
                "entities": desk.entities(root, project)}
    except (ApiError, PermissionError, OSError) as e:
        return {"linked": True, "error": str(e)}


@route("GET", r"/api/vault/note")
def vault_note(h, conn, q):
    root = get_vault(conn)
    try:
        return desk.read_note(root, (q.get("path") or "").strip("/"))
    except PermissionError as e:
        raise ApiError(403, str(e))
    except (FileNotFoundError, OSError) as e:
        raise ApiError(404, str(e))


@route("POST", r"/api/chapters/(\d+)/edit/file")
def save_edit_file(h, conn, q, cid):
    """Write Aurel's saved version out as a .md file.

    Always a NEW note next to the chapter note (`where: vault`). The export to `03_Workspace` was
    removed on 2026-11-13 (Aurel): that folder is gone since the app moved into the vault. This is the one write this app makes into the
    vault (Aurel, 2026-10-05); the chapter note itself is never opened for writing.
    """
    ch = need(db.get_chapter(conn, int(cid)))
    edit = need(db.get_edit(conn, ch["id"]), "Chưa có bản sửa nào được lưu cho chương này", 400)
    book = db.get_book(conn, ch["book_id"])
    body = h.json()
    if body.get("where") != "vault":
        raise ApiError(400, "Chỉ còn một nơi lưu: vào vault, cạnh chương (where = vault).")
    title = ch["title_vi"] if edit["base"] == "vi" and ch["title_vi"] else ch["title"]
    try:
        root = get_vault(conn)
        rel = need(chapter_vault_rel(conn, root, book, ch), "Không tìm thấy note của chương này trong vault", 400)
        note = vault.resolve_rel(root, rel)
        target = desk.aurel_target(note)
        vault.resolve_rel(root, vault.rel_of(root, target))   # must still sit under the projects folder
        text = desk.aurel_note(note, target, desk.project_code(rel.split("/")[0]), title, edit["content"],
                               "ban convert" if edit["base"] == "vi" else "ban goc")
        if not desk.write_new_or_own(target, text, bool(body.get("overwrite"))):
            return {"exists": True, "path": str(target)}
    except PermissionError as e:
        raise ApiError(403, str(e))
    conn.execute("UPDATE edits SET saved_path = ? WHERE chapter_id = ?", (str(target), ch["id"]))
    conn.commit()
    return {"path": str(target), "where": "vault"}


@route("POST", r"/api/chapters/(\d+)/edit/check")
def check_edit(h, conn, q, cid):
    """Run the vault's style tools over the text on the desk. Local only: nothing is sent anywhere."""
    ch = need(db.get_chapter(conn, int(cid)))
    book = db.get_book(conn, ch["book_id"])
    src = need(vault_source(book), "Sách này chưa gắn nguồn vault nên không biết đo theo project nào", 400)
    root = get_vault(conn)
    content = importers.normalize_paragraphs(str(h.json().get("content") or ""))
    need(content, "Chưa có chữ nào để đo", 400)
    code = desk.project_code(src["rels"][0].split("/")[0])
    return {"project": code, "reports": desk.run_checks(root, code, ch["title"], content, db.DATA / "tmp")}


# ---------- translation ----------

@route("GET", r"/api/engines")
def engines(h, conn, q):
    return {k: {"label": v["label"], "langs": sorted(v["langs"])} for k, v in translate.ENGINES.items()}


def consent_gate(h, conn, book_id, engine, allow_external, source_lang=None):
    """Former fiction AGENTS.md §6 (no current rule text yet): vault content is not uploaded to an external service unless asked.

    Every route that sends a book's text to an engine goes through here. Returns _SENT when it
    has already answered 409 needs_consent; None when the caller may go ahead.
    `source_lang` is for text that is not the book's own chapters (the quick box), whose language
    decides which engine "auto" means.
    """
    book = need(conn.execute("SELECT id, sensitive, external_ok, source_lang FROM books WHERE id = ?",
                             (int(book_id or 0),)).fetchone())
    if not book["sensitive"] or book["external_ok"]:
        return None
    try:
        engine = translate.resolve_engine(engine or "auto", source_lang or book["source_lang"], db.get_settings(conn))
    except translate.TranslationError as e:
        raise ApiError(400, str(e))
    if engine == "local":
        return None
    if not allow_external:
        return h.send_json({"error": "needs_consent", "engine": engine,
                            "message": "Sách này có nội dung lấy từ vault. Dịch bằng engine server nghĩa là gửi nội dung ra ngoài."}, 409) or _SENT
    conn.execute("UPDATE books SET external_ok = 1 WHERE id = ?", (book["id"],))
    conn.commit()
    return None


@route("POST", r"/api/translate")
def start_translate(h, conn, q):
    body = h.json()
    if consent_gate(h, conn, body.get("book_id"), body.get("engine"), body.get("allow_external")) is _SENT:
        return _SENT
    try:
        return translate.start_book_job(int(body["book_id"]), body.get("chapter_ids") or None,
                                        body.get("engine") or "auto", bool(body.get("overwrite")),
                                        body.get("include_meta", True))
    except translate.TranslationError as e:
        raise ApiError(400, str(e))


def _aligned_paragraph(conn, cid, index):
    """The chapter plus its source/translation split into lines, refusing when they do not line up.

    Paragraph i of content_vi is the translation of paragraph i of content_src only while both have
    the same line count; writing into a misaligned chapter would put text against the wrong source.
    """
    ch = need(db.get_chapter(conn, int(cid)))
    src = ch["content_src"].split("\n") if ch["content_src"] else []
    vi = ch["content_vi"].split("\n") if ch["content_vi"] else []
    if not vi or len(src) != len(vi):
        raise ApiError(409, f"Bản gốc ({len(src)} đoạn) và bản dịch ({len(vi)} đoạn) không khớp dòng — sửa cả chương thay vì từng đoạn")
    i = int(index)
    if not 0 <= i < len(src):
        raise ApiError(404, f"Không có đoạn {i}")
    return ch, src, vi, i


def _save_paragraph(conn, ch, vi, i, text):
    # one paragraph = one line; an empty line would shift every paragraph after it
    text = " ".join(str(text or "").split())
    if not text:
        raise ApiError(400, "Đoạn dịch không được để trống")
    previous, vi[i] = vi[i], text
    conn.execute("UPDATE chapters SET content_vi = ?, updated = ? WHERE id = ?", ("\n".join(vi), db.now(), ch["id"]))
    db.touch_book(conn, ch["book_id"])
    conn.commit()
    return {"index": i, "text": text, "previous": previous}


@route("PUT", r"/api/chapters/(\d+)/paragraphs/(\d+)")
def put_paragraph(h, conn, q, cid, index):
    ch, src, vi, i = _aligned_paragraph(conn, cid, index)
    return _save_paragraph(conn, ch, vi, i, h.json().get("text"))


@route("POST", r"/api/chapters/(\d+)/paragraphs/(\d+)/translate")
def translate_paragraph(h, conn, q, cid, index):
    ch, src, vi, i = _aligned_paragraph(conn, cid, index)
    body = h.json()
    if consent_gate(h, conn, ch["book_id"], body.get("engine"), body.get("allow_external")) is _SENT:
        return _SENT
    book = conn.execute("SELECT source_lang FROM books WHERE id = ?", (ch["book_id"],)).fetchone()
    try:
        r = translate.translate_text(src[i], body.get("engine") or "auto", book["source_lang"], ch["book_id"])
    except (translate.TranslationError, RuntimeError) as e:
        raise ApiError(400, str(e))
    return {**_save_paragraph(conn, ch, vi, i, r["text"]), "engine": r["engine"]}


@route("POST", r"/api/translate/text")
def translate_text(h, conn, q):
    body = h.json()
    text = body.get("text") or ""
    if len(text) > 200000:
        raise ApiError(400, "Đoạn văn quá dài (tối đa 200.000 ký tự) — hãy nhập thành sách")
    book_id = int(body["book_id"]) if str(body.get("book_id") or "").isdigit() else None
    # A book chosen here lends its name table, and the text beside it is most likely that book's.
    # When the book holds vault text, ask as for translating the book (Aurel, 2026-11-13).
    # No book, or a book that no longer exists: plain pasted text, no question.
    if book_id is not None and conn.execute("SELECT 1 FROM books WHERE id = ?", (book_id,)).fetchone():
        lang = body.get("source_lang")
        if lang in (None, "", "auto"):
            lang = importers.detect_lang(text)
        if consent_gate(h, conn, book_id, body.get("engine"), body.get("allow_external"), lang) is _SENT:
            return _SENT
    try:
        return translate.translate_text(text, body.get("engine") or "auto", body.get("source_lang"), book_id)
    except (translate.TranslationError, RuntimeError) as e:
        raise ApiError(400, str(e))


@route("GET", r"/api/jobs")
def jobs(h, conn, q):
    return translate.list_jobs()


@route("GET", r"/api/jobs/(\w+)")
def job(h, conn, q, job_id):
    return need(translate.get_job(job_id))


@route("POST", r"/api/jobs/(\w+)/cancel")
def job_cancel(h, conn, q, job_id):
    return {"ok": translate.cancel_job(job_id)}


# ---------- names ----------

def _scope(v):
    return None if v in (None, "", "global") else int(v)


@route("GET", r"/api/names")
def get_names(h, conn, q):
    pairs = db.get_names(conn, _scope(q.get("book_id")))
    return {"text": "\n".join(f"{s}={v}" for s, v in pairs), "count": len(pairs)}


@route("PUT", r"/api/names")
def put_names(h, conn, q):
    body = h.json()
    pairs = db.parse_names_text(body.get("text"))
    db.replace_names(conn, _scope(body.get("book_id")), pairs)
    return {"count": len(pairs)}


@route("POST", r"/api/names/add")
def add_name(h, conn, q):
    body = h.json()
    src, vi = (body.get("src") or "").strip(), (body.get("vi") or "").strip()
    if not src or not vi:
        raise ApiError(400, "Cần cả tên gốc và tên dịch")
    db.add_name(conn, _scope(body.get("book_id")), src, vi)
    return {"ok": True}


@route("GET", r"/api/books/(\d+)/names")
def book_names(h, conn, q, book_id):
    """Every name that applies to this book, book entries overriding global ones — what the reader marks."""
    own = dict(db.get_names(conn, int(book_id)))
    merged = db.merged_names(conn, int(book_id))
    return [{"src": s, "vi": v, "scope": "book" if s in own else "global"} for s, v in merged.items() if v]


@route("GET", r"/api/hanviet")
def hanviet(h, conn, q):
    """Sino-Vietnamese reading, one syllable per character, from the local HanViet dictionary only."""
    text = (q.get("text") or "")[:40]
    hv, _ = vietphrase._load("hv")
    if not hv:
        return {"text": "", "ready": False}
    return {"text": " ".join(hv.get(c, c) for c in text if not c.isspace()), "ready": True}


def _name_rx(old, protect=()):
    """Whole-word match for `old`: "An" must not match inside "Anh".

    `protect` lists longer known names that contain `old` ("Ngụy Vô Tiện Nhi" around
    "Ngụy Vô Tiện"). They are matched first, as themselves, so the swap can leave them alone.
    """
    alts = sorted({re.escape(p) for p in protect if old in p and p != old}, key=len, reverse=True)
    return re.compile(r"(?<!\w)(?:" + "|".join([*alts, re.escape(old)]) + r")(?!\w)")


def _replace_pair(body):
    old, new = (body.get("old") or "").strip(), (body.get("new") or "").strip()
    if not old or not new:
        raise ApiError(400, "Cần cả tên cũ và tên mới")
    return old, new


def _replace_in_chapters(conn, chapter_ids, old, new, apply):
    """Swap one translated name for another in content_vi / title_vi, without re-translating.

    Replacing inside a line never adds or removes a line, so source/translation alignment holds.
    Returns (chapters touched, occurrences); with apply=False nothing is written.
    """
    protect = [r["vi"] for r in conn.execute("SELECT DISTINCT vi FROM names")]
    rx = _name_rx(old, protect)
    changed, total = 0, 0
    for cid in chapter_ids:
        ch = conn.execute("SELECT id, content_vi, title_vi FROM chapters WHERE id = ?", (cid,)).fetchone()
        if not ch:
            continue
        hits = [0]

        def swap(m):   # a function, so a backslash in the new name is text, not a group reference
            if m.group(0) != old:
                return m.group(0)   # a longer protected name
            hits[0] += 1
            return new
        vi = rx.sub(swap, ch["content_vi"])
        title = rx.sub(swap, ch["title_vi"])
        if hits[0]:
            changed, total = changed + 1, total + hits[0]
            if apply:
                conn.execute("UPDATE chapters SET content_vi = ?, title_vi = ?, updated = ? WHERE id = ?",
                             (vi, title, db.now(), cid))
    return changed, total


@route("POST", r"/api/books/(\d+)/replace-name")
def replace_name(h, conn, q, book_id):
    book = need(db.get_book(conn, int(book_id)))
    body = h.json()
    old, new = _replace_pair(body)
    if old == new:
        return {"chapters": 0, "count": 0}
    ids = [c["id"] for c in book["chapters"]]
    if body.get("chapter_id"):
        ids = [int(body["chapter_id"])] if int(body["chapter_id"]) in ids else []
    changed, total = _replace_in_chapters(conn, ids, old, new, apply=True)
    if changed:
        db.touch_book(conn, book["id"])
        conn.commit()
    return {"chapters": changed, "count": total}


@route("POST", r"/api/replace-name")
def replace_name_everywhere(h, conn, q):
    """The same swap across the whole library.

    dry_run (the default) only counts, per book, so Aurel sees what a library-wide edit touches
    before it happens. A book with its own entry for `src` is skipped: it chose a different
    translation for that name on purpose.
    """
    body = h.json()
    old, new = _replace_pair(body)
    src = (body.get("src") or "").strip()
    apply = body.get("dry_run") is False
    books, skipped = [], []
    for b in conn.execute("SELECT id, title, title_vi FROM books ORDER BY title"):
        title = b["title_vi"] or b["title"]
        if src and conn.execute("SELECT 1 FROM names WHERE book_id = ? AND src = ?", (b["id"], src)).fetchone():
            skipped.append({"id": b["id"], "title": title})
            continue
        ids = [r["id"] for r in conn.execute("SELECT id FROM chapters WHERE book_id = ?", (b["id"],))]
        changed, total = _replace_in_chapters(conn, ids, old, new, apply) if old != new else (0, 0)
        if changed:
            books.append({"id": b["id"], "title": title, "chapters": changed, "count": total})
            if apply:
                db.touch_book(conn, b["id"])
    if apply:
        conn.commit()
    return {"applied": apply, "books": books, "skipped": skipped,
            "chapters": sum(b["chapters"] for b in books), "count": sum(b["count"] for b in books)}


# ---------- settings / dicts ----------

@route("GET", r"/api/settings")
def get_settings(h, conn, q):
    s = db.get_settings(conn)
    s["_dicts"] = vietphrase.status()
    s["_default_chapter_pattern"] = importers.DEFAULT_CHAPTER_PATTERN
    s["_rar"] = archives.rar_status(s.get("rar_tool") or "")
    return s


@route("PUT", r"/api/settings")
def put_settings(h, conn, q):
    body = h.json()
    if body.get("chapter_pattern"):
        try:
            re.compile(body["chapter_pattern"])
        except re.error as e:
            raise ApiError(400, f"Regex tách chương sai: {e}")
    tool = (body.get("rar_tool") or "").strip()
    if tool and not Path(tool).is_file():
        raise ApiError(400, f"Không thấy file: {tool}")
    return db.put_settings(conn, body)


@route("POST", r"/api/dicts/upload")
def dict_upload(h, conn, q):
    kind = q.get("kind")
    if kind not in vietphrase.KINDS:
        raise ApiError(400, "kind phải là name / vp / hv")
    try:
        return {"entries": vietphrase.save_dict(kind, h.body())}
    except ValueError as e:
        raise ApiError(400, str(e))


@route("POST", r"/api/dicts/download")
def dict_download(h, conn, q):
    s = db.get_settings(conn)
    out, errors = {}, []
    for kind in vietphrase.KINDS:
        url = s.get(f"dict_{kind}_url")
        if not url:
            continue
        try:
            req = urllib.request.Request(url, headers={"User-Agent": translate.UA})
            with urllib.request.urlopen(req, timeout=180) as r:
                out[kind] = vietphrase.save_dict(kind, r.read())
        except Exception as e:
            errors.append(f"{kind}: {e}")
    return {"entries": out, "errors": errors}


# ---------- http plumbing ----------

class Handler(BaseHTTPRequestHandler):
    server_version = "TramDich/1.0"

    def log_message(self, fmt, *args):
        if "/api/jobs" in (args[0] if args else ""):
            return
        sys.stderr.write("%s  %s\n" % (self.log_date_time_string(), fmt % args))

    def body(self):
        n = int(self.headers.get("Content-Length") or 0)
        if n > MAX_UPLOAD:
            raise ApiError(413, "File quá lớn")
        return self.rfile.read(n) if n else b""

    def json(self):
        raw = self.body()
        if not raw:
            return {}
        try:
            v = json.loads(raw.decode("utf-8"))
            return v if isinstance(v, dict) else {}
        except ValueError:
            raise ApiError(400, "JSON không hợp lệ")

    def send_json(self, obj, status=200):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def send_bytes(self, data, mime, filename=None, cache=False):
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "max-age=60" if cache else "no-store")
        if filename:
            ascii_name = filename.encode("ascii", "replace").decode().replace("?", "_").replace('"', "")
            self.send_header("Content-Disposition",
                             f"attachment; filename=\"{ascii_name}\"; filename*=UTF-8''{quote(filename)}")
        self.end_headers()
        self.wfile.write(data)
        return _SENT

    def _guard_host(self):
        # Local only: a name other than this machine in `Host` means the browser was sent here by
        # another site's DNS (rebinding). Checked on every request, reads included (TD-018).
        host = (self.headers.get("Host") or "").rsplit(":", 1)[0]
        if host not in LOCAL_HOSTS:
            raise ApiError(403, "Host bị chặn")

    def _guard_origin(self):
        # a local server that writes files must not accept requests forged by other websites
        if self.command in ("GET", "HEAD"):
            return
        origin = self.headers.get("Origin")
        if origin and urlparse(origin).hostname not in LOCAL_HOSTS:
            raise ApiError(403, "Origin bị chặn")

    def _dispatch(self):
        try:
            self._guard_host()
        except ApiError as e:
            return self.send_json({"error": str(e)}, e.status)
        url = urlparse(self.path)
        if url.path.startswith("/translate-data/"):
            return self._translate_data(unquote(url.path))
        if not url.path.startswith("/api/"):
            return self._static(url.path)
        q = {k: v[0] for k, v in parse_qs(url.query).items()}
        conn = db.connect()
        try:
            self._guard_origin()
            for method, rx, fn in routes:
                if method != self.command:
                    continue
                m = rx.match(url.path)
                if m:
                    result = fn(self, conn, q, *m.groups())
                    if result is not _SENT:
                        self.send_json(result)
                    return
            raise ApiError(404, "Không có API này")
        except ApiError as e:
            self.send_json({"error": str(e)}, e.status)
        except Exception as e:
            traceback.print_exc()
            self.send_json({"error": f"{type(e).__name__}: {e}"}, 500)
        finally:
            conn.close()

    def _translate_data(self, path):
        """Read-only copy of <repo>/translate-data/ for the TM Translate userscript.

        The repo is private, so a raw.githubusercontent.com link would 404 for Tampermonkey;
        this server is the one place the userscript can reach the files. GET only, and only
        files inside that folder.
        """
        base = db.TRANSLATE_DATA.resolve()
        target = (base / path[len("/translate-data/"):]).resolve()
        if self.command != "GET" or base not in target.parents or not target.is_file():
            return self.send_json({"error": "Không có file này"}, 404)
        size = target.stat().st_size
        self.send_response(200)
        self.send_header("Content-Type", (mimetypes.guess_type(target.name)[0] or "application/octet-stream") + "; charset=utf-8")
        self.send_header("Content-Length", str(size))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        with target.open("rb") as f:   # VP.json is ~70 MB: stream it, do not hold it in memory
            while True:
                chunk = f.read(1 << 20)
                if not chunk:
                    break
                self.wfile.write(chunk)

    def _static(self, path):
        if path in ("", "/"):
            path = "/index.html"
        target = (STATIC / path.lstrip("/")).resolve()
        if STATIC.resolve() not in target.parents or not target.is_file():
            target = STATIC / "index.html"
        data = target.read_bytes()
        mime = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        if mime.startswith("text/") or mime in ("application/javascript",):
            mime += "; charset=utf-8"
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        self.wfile.write(data)

    do_GET = do_POST = do_PUT = do_PATCH = do_DELETE = _dispatch


_SENT = object()


def main():
    ap = argparse.ArgumentParser(description="Trạm Dịch — local reader & translator")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--no-browser", action="store_true")
    args = ap.parse_args()
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/css", ".css")
    db.init()
    httpd = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    url = f"http://127.0.0.1:{args.port}"
    print(f"Trạm Dịch đang chạy tại {url}  (Ctrl+C để dừng)")
    if not args.no_browser:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng.")


if __name__ == "__main__":
    main()

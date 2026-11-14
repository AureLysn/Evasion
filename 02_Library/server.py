"""Kệ Sách — personal reader for comics and text novels kept on Drive (working name, not final).

Run:  python server.py            (opens http://127.0.0.1:8771)
      python server.py --root "G:\\My Drive\\..." --port 9000 --no-browser
Zero third-party dependencies: Python 3.11+ standard library only.

Read-only towards the library folder by default: the app writes data/ (settings, reading progress, notes,
saved translations). One switch in settings (`write`) lets it move and rename inside a shelf's folder, each
time through a plan the user confirms (app/drive_write.py). Translation is Trạm Dịch's job
(`05_Evasion/03_Subsystems/Nexus`).
"""
import argparse
import hashlib
import json
import mimetypes
import os
import re
import threading
import time
import traceback
import webbrowser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

from app.collections import Collections
from app.drive_write import DriveWriter, WriteError
from app.library import short_id
from app.meta import Meta
from app.ocr_assets import OcrAssets, TYPES as OCR_TYPES
from app.search import SearchIndex, fold, long_enough
from app.senses import Senses, apply_rules
from app.shelves import Shelves, ShelfError, check_folder, check_name, migrate, new_spec
from app import translate_client as tc

HERE = Path(__file__).resolve().parent
STATIC = HERE / "static"
DATA = Path(os.environ["KESACH_DATA"]) if os.environ.get("KESACH_DATA") else HERE / "data"
SETTINGS = DATA / "settings.json"
PROGRESS = DATA / "progress.json"
COLLECTIONS = Collections(DATA / "collections.json")
META = Meta(DATA / "meta.json")
SEARCH = SearchIndex(DATA / "search.sqlite3")
OCR = OcrAssets(DATA / "ocr")
TRANSLATIONS = tc.Translations(DATA / "translations")
PAGETEXTS = tc.PageTexts(DATA / "ocr-pages")
SENSES = Senses(DATA / "senses.json")
def chapter_renamed(m):
    """Collections and the reading position follow a renamed chapter (its id is a hash of the path, so the saved
    "last chapter" would otherwise point at nothing)."""
    COLLECTIONS.rename_chapter(m)
    META.rename_chapter(m)
    TRANSLATIONS.rename(m)
    SENSES.rename_chapter(m)
    prog = read_json(PROGRESS, {})
    cur = prog.get(m["sid"])
    if cur and cur.get("chapter") == short_id(m["old_rel"]):
        cur["chapter"] = short_id(m["new_rel"])
        write_json(PROGRESS, prog)


WRITER = DriveWriter(DATA / "drive-log.jsonl", on_rename=lambda old, new: (COLLECTIONS.rename_series(old, new), META.rename_series(old, new), SENSES.rename_series(old, new)), on_rename_chapter=chapter_renamed)
LOCAL_HOSTS = ("127.0.0.1", "localhost")
THUMBS = DATA / "thumbs"
MAX_THUMB = 400 * 1024
lock = threading.Lock()
lib = Shelves()        # every shelf (folder) behind one view; the calls below are the ones one Library used to answer
PLAN_SHELF = {}        # write-plan token -> id of the shelf it was made for (a plan and its apply stay inside ONE shelf)
SHELVES_LOCKED = ""    # why the shelf list cannot be edited (set when started with --root)


def read_json(path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return default


def write_json(path, obj):
    DATA.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(obj, ensure_ascii=False, indent=1), encoding="utf-8")
    tmp.replace(path)


def translation_view(s, c):
    """The saved translation of chapter c with the user's meaning rules applied (`shown`), and what each rule did (`hits`).
    The saved file itself is left as the engine made it."""
    tr = TRANSLATIONS.get(c["title"], c["size"])
    if not tr:
        return {}
    rules = SENSES.for_chapter("" if s["loose"] else s["title"], c["title"], c["size"])
    shown, hits = apply_rules(tr["translated"], rules)
    tr["shown"] = shown
    tr["hits"] = [{"id": r["id"], "from": r["from"], "to": r["to"], "scope": r["scope"], "count": hits[r["id"]]} for r in rules if r["id"] in hits]
    return tr


def translate_url():
    return read_json(SETTINGS, {}).get("translate_url") or tc.DEFAULT_URL


def write_enabled():
    """Writing into the library folder is off unless the user switched it on (settings: write)."""
    return bool(read_json(SETTINGS, {}).get("write"))


def save_shelves():
    """The shelf list lives in settings.json ("shelves"). The old single `root` key is left as it was."""
    cur = read_json(SETTINGS, {})
    cur["shelves"] = lib.specs()
    write_json(SETTINGS, cur)


def write_shelf(b):
    """Which shelf a write request is about: the one holding its series, else the one named in `shelf`, else the only one.
    A write never spans two shelves."""
    if b.get("undo"):
        rec = next((r for r in WRITER._records() if r.get("batch") == b["undo"] and not r.get("undo_of")), None)
        sid = (rec or {}).get("shelf") or ""
        l = lib.get(sid) if sid else next((x for x in lib.libs if not x.prefix), None)
        if not l:
            raise WriteError("Kệ của lần ghi này không còn (đã gỡ), không hoàn tác được")
        return l
    sid = b.get("series") or (b.get("target") if b.get("rename") == "series" else None)
    if sid:
        l = lib.lib_of(sid)
        if not l:
            raise WriteError("Không thấy bộ này trong kệ nào")
        dest = b.get("dest_series")
        if dest and dest not in l.series:
            raise WriteError("Bộ đích nằm ở kệ khác. Kệ Sách chỉ chuyển trong một kệ (một thư mục), không chuyển giữa hai kệ")
        return l
    l = lib.get(b.get("shelf")) or (lib.libs[0] if len(lib.libs) == 1 else None)
    if not l:
        raise WriteError("Việc này cần biết kệ nào: chọn một kệ ở bộ lọc “Kệ” của Thư viện")
    return l


class Handler(BaseHTTPRequestHandler):
    server_version = "KeSach/0.1"

    def log_message(self, *a):
        pass

    # ---- plumbing ----
    def send(self, status, body, ctype="application/json; charset=utf-8", extra=None):
        if isinstance(body, (dict, list)):
            body = json.dumps(body, ensure_ascii=False).encode("utf-8")
        elif isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        if "Cache-Control" not in (extra or {}):
            self.send_header("Cache-Control", "no-store" if ctype.startswith("application/json") else "max-age=3600")
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(body)

    def send_image(self, data, ctype, etag):
        """Images revalidate (ETag from the source file's stamp) so a replaced file shows at once, an unchanged one costs a 304."""
        etag = f'"{etag}"'
        if self.headers.get("If-None-Match") == etag:
            self.send_response(304)
            self.send_header("ETag", etag)
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            return
        self.send(200, data, ctype, {"ETag": etag, "Cache-Control": "no-cache"})

    def err(self, status, msg):
        self.send(status, {"error": msg})

    def body_json(self):
        n = int(self.headers.get("Content-Length") or 0)
        try:
            return json.loads(self.rfile.read(n) or b"{}")
        except ValueError:
            return {}

    def blocked(self):
        """Local only (TD-018). Refuses a `Host` that is not this machine (DNS rebinding) and an `Origin` that is
        not this machine (a page of another site calling this server — it can move files when `write` is on).
        Answers 403 itself and returns True when the request must stop."""
        host = (self.headers.get("Host") or "").rsplit(":", 1)[0]
        origin = self.headers.get("Origin")
        if host not in LOCAL_HOSTS:
            self.err(403, "Host bị chặn")
            return True
        if origin and urlparse(origin).hostname not in LOCAL_HOSTS:
            self.err(403, "Origin bị chặn")
            return True
        return False

    # ---- routing ----
    def do_GET(self):
        if self.blocked():
            return
        url = urlparse(self.path)
        parts = [unquote(p) for p in url.path.strip("/").split("/")]
        try:
            if parts[0] == "api":
                return self.api_get(parts[1:], parse_qs(url.query))
            if parts[0] == "ocr" and len(parts) == 2:   # the OCR libraries and models fetched on request (data/ocr), only the files named in ocr_assets
                f = OCR.path_of(parts[1])
                if not f:
                    return self.err(404, "Chưa có tệp OCR này")
                return self.send(200, f.read_bytes(), OCR_TYPES.get(f.suffix, "application/octet-stream"), {"Cache-Control": "max-age=86400"})
            return self.static(url.path)
        except BrokenPipeError:
            pass
        except Exception as e:   # noqa: BLE001 — a bad file must not kill the server
            traceback.print_exc()
            self.err(500, f"{type(e).__name__}: {e}")

    def do_PUT(self):
        if self.blocked():
            return
        parts =[unquote(p) for p in urlparse(self.path).path.strip("/").split("/")]
        try:
            if parts[:2] == ["api", "settings"]:
                body = self.body_json()
                with lock:
                    cur = read_json(SETTINGS, {})
                    if "write" in body:
                        cur["write"] = bool(body["write"])
                    if "root" in body:
                        raise ValueError("Thư mục thư viện nay là danh sách kệ: thêm hoặc đổi ở Cài đặt › Kệ")
                    if "translate_url" in body:
                        tc.clean_url(body["translate_url"])   # refuses anything that is not this machine (ValueError-like TranslateError below)
                        cur["translate_url"] = str(body["translate_url"] or "").strip()
                    write_json(SETTINGS, cur)
                return self.send(200, {"write": bool(cur.get("write")), "translate_url": cur.get("translate_url") or tc.DEFAULT_URL})
            if parts[:2] == ["api", "thumb"] and len(parts) in (4, 5):
                return self.thumb_put(parts[2:])
            if len(parts) == 4 and parts[:3] == ["api", "meta", "series"]:
                s = lib.series.get(parts[3])
                if not s or s["loose"]:
                    return self.err(404, "Không thấy bộ này")
                with lock:
                    return self.send(200, META.set_series(s["title"], self.body_json()))
            if len(parts) == 5 and parts[:3] == ["api", "meta", "chapter"]:
                c = lib.chapter(parts[3], parts[4])
                if not c:
                    return self.err(404, "Không thấy chương này")
                with lock:
                    return self.send(200, META.set_chapter(c["title"], c["size"], self.body_json().get("note", "")))
            if parts[:2] == ["api", "progress"]:
                b = self.body_json()
                with lock:
                    prog = read_json(PROGRESS, {})
                    prog[str(b.get("series"))] = {"chapter": b.get("chapter"), "pos": b.get("pos", 0), "page": b.get("page"), "at": int(time.time())}
                    write_json(PROGRESS, prog)
                return self.send(200, {"ok": True})
            self.err(404, "Không có")
        except (ValueError, tc.TranslateError) as e:   # a rejected value (rating out of range, a non-local address...): the user can fix it
            self.err(400, str(e))
        except Exception as e:   # noqa: BLE001
            traceback.print_exc()
            self.err(500, f"{type(e).__name__}: {e}")

    def do_POST(self):
        if self.blocked():
            return
        try:
            self.post()
        except BrokenPipeError:
            pass
        except Exception as e:   # noqa: BLE001 — as in do_GET: answer the page instead of dropping the connection
            traceback.print_exc()
            self.err(500, f"{type(e).__name__}: {e}")

    def post(self):
        if urlparse(self.path).path == "/api/collections":
            try:
                with lock:
                    return self.send(200, COLLECTIONS.apply(lib, self.body_json()))
            except ValueError as e:
                return self.err(400, str(e))
            except LookupError as e:
                return self.err(404, str(e))
        if urlparse(self.path).path in ("/api/drive/plan", "/api/drive/apply"):
            if not write_enabled():
                return self.err(403, "Ghi vào Drive đang tắt. Bật ở Nguồn thư viện nếu muốn")
            b = self.body_json()
            try:
                with lock:
                    if self.path.endswith("/plan"):
                        sh = write_shelf(b)   # the plan below is made against this one shelf's folder, never the others
                        plan = self.drive_plan(sh, b)
                        PLAN_SHELF[plan["token"]] = sh.shelf_id
                        if len(PLAN_SHELF) > 200:
                            PLAN_SHELF.pop(next(iter(PLAN_SHELF)))
                        return self.send(200, {**plan, "shelf": sh.shelf_id})
                    sh = lib.get(PLAN_SHELF.pop(b.get("token"), None))
                    if not sh:
                        raise WriteError("Kế hoạch đã hết hạn hoặc đã chạy rồi. Làm lại từ đầu")
                    res = WRITER.apply(sh, b.get("token"))
                SEARCH.start(lib)   # paths changed: keep the index in step (unchanged files are not read again)
                return self.send(200, res)
            except WriteError as e:
                return self.err(400, str(e))
        if urlparse(self.path).path == "/api/shelves":
            try:
                return self.send(200, self.shelves_edit(self.body_json()))
            except ShelfError as e:
                return self.err(400, str(e))
            except LookupError as e:
                return self.err(404, str(e))
        if urlparse(self.path).path in ("/api/translate", "/api/translate/delete"):
            b = self.body_json()
            c = lib.chapter(b.get("series"), b.get("chapter"))
            if not c or c["kind"] != "text":
                return self.err(404, "Chỉ dịch được chương chữ có trong thư viện")
            if self.path.endswith("/delete"):
                return self.send(200, {"deleted": TRANSLATIONS.delete(c["title"], c["size"])})
            engine = str(b.get("engine") or "auto")
            if engine != "local" and not b.get("allow_external"):   # fiction notes are personal: sending text out needs a yes each time
                return self.send(409, {"error": "needs_consent", "message": "Engine này có thể gửi chữ truyện tới dịch vụ bên ngoài. Cần bạn đồng ý."})
            try:
                src = [l.strip() for l in re.split(r"\r\n|\r|\n", lib.text_of(c)) if l.strip()]   # same split as the reader, so line i = paragraph i
                if not src:
                    return self.err(400, "Chương này chưa có chữ để dịch")
                out, used, lang = tc.translate_lines(translate_url(), src, engine)
                TRANSLATIONS.put(c["title"], c["size"], used, lang, src, out)
                return self.send(200, translation_view(lib.series[b.get("series")], c))
            except tc.TranslateError as e:
                return self.err(502, str(e))
        if urlparse(self.path).path == "/api/senses":
            b = self.body_json()
            act = b.get("action", "add")
            try:
                with lock:
                    if act == "add":
                        s = lib.series.get(b.get("series"))
                        c = lib.chapter(b.get("series"), b.get("chapter")) if b.get("chapter") else None
                        return self.send(200, SENSES.add(b, s["title"] if s and not s["loose"] else "", (c["title"], c["size"]) if c else None))
                    if act == "update":
                        return self.send(200, SENSES.update(b.get("id"), b))
                    if act == "delete":
                        return self.send(200, {"deleted": SENSES.delete(b.get("id"))})
                    if act == "preview":
                        return self.send(200, self.senses_preview(b))
                return self.err(400, "Việc không rõ")
            except LookupError as e:
                return self.err(404, str(e))
            except ValueError as e:
                return self.err(400, str(e))
        if urlparse(self.path).path == "/api/comments":
            b = self.body_json()
            act = b.get("action", "add")
            try:
                with lock:
                    if act == "add":
                        if b.get("scope") == "series":
                            s = lib.series.get(b.get("series"))
                            if not s or s["loose"]:
                                return self.err(404, "Không thấy bộ này")
                            return self.send(200, META.add_comment("series", s["title"], None, b.get("text"), b.get("mood"), b.get("spoiler"), None))
                        c = lib.chapter(b.get("series"), b.get("chapter"))
                        if not c:
                            return self.err(404, "Không thấy chương này")
                        return self.send(200, META.add_comment("chapter", c["title"], c["size"], b.get("text"), b.get("mood"), b.get("spoiler"), b.get("para")))
                    if act == "update":
                        return self.send(200, META.edit_comment(b.get("id"), b))
                    if act == "delete":
                        return self.send(200, {"deleted": META.delete_comment(b.get("id"))})
                return self.err(400, "Việc không rõ")
            except LookupError as e:
                return self.err(404, str(e))
            except ValueError as e:
                return self.err(400, str(e))
        if urlparse(self.path).path in ("/api/ocr/translate", "/api/ocr/page", "/api/ocr/page/delete"):
            b = self.body_json()
            key = None if self.path.endswith("/translate") else self.page_key(b.get("series"), b.get("chapter"), b.get("page"))
            if not key and not self.path.endswith("/translate"):
                return self.err(404, "Không thấy trang này")
            if self.path.endswith("/delete"):
                return self.send(200, {"deleted": PAGETEXTS.delete(key)})
            if self.path.endswith("/page"):   # the browser stores what it read (no translation yet) or the finished page
                blocks = [{k: x[k] for k in ("l", "t", "r", "b", "text", "vi", "n") if k in x} for x in (b.get("blocks") or [])][:300]
                PAGETEXTS.put(key, {"blocks": blocks, "engine": str(b.get("engine") or ""), "w": b.get("w"), "h": b.get("h")})
                return self.send(200, {"saved": len(blocks)})
            # /api/ocr/translate: the bubble texts of a page -> Vietnamese, through Tram Dich, with the same consent rule as chapter translation
            engine = str(b.get("engine") or "auto")
            if engine != "local" and not b.get("allow_external"):
                return self.send(409, {"error": "needs_consent", "message": "Engine này có thể gửi chữ truyện tới dịch vụ bên ngoài. Cần bạn đồng ý."})
            texts = [str(t) for t in (b.get("texts") or [])][:300]
            if not texts:
                return self.send(200, {"texts": [], "engine": engine})
            try:
                out, used, lang = tc.translate_texts(translate_url(), texts, engine)
                return self.send(200, {"texts": out, "engine": used, "source_lang": lang})
            except tc.TranslateError as e:
                return self.err(502, str(e))
        if urlparse(self.path).path == "/api/ocr/setup":
            return self.send(200, {"started": OCR.start(), **OCR.status()})
        if urlparse(self.path).path == "/api/search/index":
            return self.send(200, {"started": SEARCH.start(lib, force=True), **SEARCH.status()})
        if urlparse(self.path).path == "/api/rescan":
            sid = self.body_json().get("shelf") or None   # one shelf, or every shelf when none is named
            if sid and not lib.get(sid):
                return self.err(404, "Không thấy kệ này")
            with lock:
                lib.scan(sid)
            SEARCH.start(lib)
            return self.send(200, {"series": len(lib.series), "error": lib.error, "shelves": lib.info()})
        self.err(404, "Không có")

    # ---- api ----
    def api_get(self, p, q):
        if p == ["state"]:
            return self.send(200, {"shelves": lib.info(), "locked": SHELVES_LOCKED, "error": lib.error, "series": len(lib.series), "write": write_enabled(),
                                   "translate_url": read_json(SETTINGS, {}).get("translate_url") or tc.DEFAULT_URL, "progress": read_json(PROGRESS, {})})
        if p == ["shelves"]:
            return self.send(200, {"shelves": lib.info(), "locked": SHELVES_LOCKED})
        if p == ["drive", "parents"]:
            try:
                return self.send(200, WRITER.parents(write_shelf({"series": (q.get("series") or [None])[0], "shelf": (q.get("shelf") or [None])[0]})))
            except WriteError as e:
                return self.err(400, str(e))
        if p == ["drive", "batches"]:
            plain = next((x for x in lib.libs if not x.prefix), None)
            out = []
            for x in WRITER.batches():
                l = lib.get(x["shelf"]) if x["shelf"] else plain
                out.append({**x, "shelf_name": l.name if l else "(kệ đã gỡ)", "undoable": x["undoable"] and bool(l)})
            return self.send(200, out)
        if p == ["drive", "log"]:
            return self.send(200, WRITER.log())
        if p == ["collections"]:
            return self.send(200, COLLECTIONS.list())
        if len(p) == 2 and p[0] == "collection":
            c = COLLECTIONS.get(lib, p[1])
            return self.send(200, c) if c else self.err(404, "Không thấy bộ sưu tập này")
        if len(p) == 2 and p[0] == "in-collections":   # ?chapter=<id> for a chapter, none for the series
            return self.send(200, COLLECTIONS.where_is(lib, p[1], q.get("chapter", [None])[0]))
        if p == ["tree"]:
            return self.send(200, lib.tree((q.get("shelf") or [None])[0]))
        if p == ["series"]:
            ov = META.overview()
            rows = lib.list(read_json(PROGRESS, {}))
            for r in rows:
                m = {} if r["loose"] else ov.get(r["title"].lower(), {})
                r["rating"], r["tags"] = m.get("rating", 0), m.get("tags", [])
            return self.send(200, rows)
        if len(p) == 2 and p[0] == "series":
            d = lib.detail(p[1])
            if not d:
                return self.err(404, "Không thấy bộ này")
            d["shelf_name"] = lib.lib_of(p[1]).name
            noted = META.chapter_notes()
            for c in d["chapters"]:
                ch = lib.chapter(p[1], c["id"])
                c["has_note"] = (c["title"].lower(), ch["size"]) in noted
            return self.send(200, d)
        if len(p) == 5 and p[:2] == ["ocr", "page"]:   # /api/ocr/page/<sid>/<cid>/<n>: what was read and translated on that page, if anything
            key = self.page_key(p[2], p[3], p[4])
            return self.send(200, (PAGETEXTS.get(key) if key else None) or {})
        if p == ["ocr", "status"]:
            return self.send(200, OCR.status())
        if p == ["search", "status"]:
            return self.send(200, SEARCH.status())
        if p == ["search"]:
            q = (q.get("q") or [""])[0].strip()
            nq = fold(q)
            content = SEARCH.search(lib, q) if long_enough(q) else []
            notes = []
            if long_enough(q):
                by_size = {}
                for s in lib.series.values():
                    for c in s["chapters"]:
                        by_size.setdefault((c["title"].lower(), c["size"]), (s, c))
                for h in META.search(q, norm=fold):
                    if h["type"] == "series":
                        s = next((x for x in lib.series.values() if not x["loose"] and x["title"].lower() == h["name"].lower()), None)
                        if s:
                            notes.append({"type": "series", "series": s["id"], "title": s["title"], "text": h["text"], "tags": h["tags"]})
                    elif h["type"] == "comment":
                        if h["scope"] == "series":
                            s = next((x for x in lib.series.values() if not x["loose"] and x["title"].lower() == h["name"].lower()), None)
                            tgt = {"series": s["id"]} if s else None
                        else:
                            hit = by_size.get((h["name"].lower(), h["size"]))
                            tgt = {"series": hit[0]["id"], "chapter": hit[1]["id"]} if hit else None
                        if tgt:
                            notes.append({"type": "comment", "title": h["name"], "mood": h["mood"], "spoiler": h["spoiler"],
                                          "text": "" if h["spoiler"] else h["text"], **tgt})
                    else:
                        hit = by_size.get((h["name"].lower(), h["size"]))
                        if hit:
                            notes.append({"type": "chapter", "series": hit[0]["id"], "chapter": hit[1]["id"], "title": h["name"], "text": h["text"],
                                          "series_title": "Chương lẻ" if hit[0]["loose"] else hit[0]["title"]})
            titles = [{"series": s["id"], "title": s["title"], "where": s["rel"]} for s in lib.series.values()
                      if not s["loose"] and long_enough(q) and nq in fold(s["title"])]
            return self.send(200, {"q": q, "content": content, "notes": notes, "titles": titles, "status": SEARCH.status()})
        if p == ["translate", "engines"]:
            try:
                return self.send(200, {"url": translate_url(), "engines": tc.engines(translate_url())})
            except tc.TranslateError as e:
                return self.err(503, str(e))
        if len(p) == 3 and p[0] == "translate":
            c = lib.chapter(p[1], p[2])
            if not c:
                return self.err(404, "Không thấy chương này")
            return self.send(200, translation_view(lib.series[p[1]], c))
        if p == ["senses"]:
            return self.send(200, self.senses_overview())
        if p == ["comments"]:
            return self.send(200, self.comments_resolved(q))
        if len(p) == 3 and p[:2] == ["comments", "series"]:
            s = lib.series.get(p[2])
            return self.send(200, META.comments_for("series", s["title"])) if s and not s["loose"] else self.err(404, "Không thấy bộ này")
        if len(p) == 4 and p[:2] == ["comments", "chapter"]:
            c = lib.chapter(p[2], p[3])
            return self.send(200, META.comments_for("chapter", c["title"], c["size"])) if c else self.err(404, "Không thấy chương này")
        if p == ["tags"]:
            return self.send(200, META.all_tags())
        if len(p) == 3 and p[:2] == ["meta", "series"]:
            s = lib.series.get(p[2])
            return self.send(200, META.get_series(s["title"])) if s and not s["loose"] else self.err(404, "Không thấy bộ này")
        if len(p) == 4 and p[:2] == ["meta", "chapter"]:
            c = lib.chapter(p[2], p[3])
            return self.send(200, META.get_chapter(c["title"], c["size"])) if c else self.err(404, "Không thấy chương này")
        if len(p) == 2 and p[0] == "cover":
            data, ext = lib.cover(p[1])
            if not data:
                return self.err(404, "Không có bìa")
            tgt = lib.cover_target(p[1])
            return self.send_image(data, mimetypes.types_map.get(ext, "application/octet-stream"), lib.stamp(p[1], *tgt))
        if p[:1] == ["thumb"] and len(p) in (3, 4):
            return self.thumb_get(p[1:])
        if len(p) == 4 and p[0] == "chapter":
            _, sid, cid, what = p
            if what == "text":
                t = lib.text(sid, cid)
                return self.send(200, {"text": t}) if t is not None else self.err(404, "Không đọc được chương chữ")
            if what == "pages":
                names = lib.pages(sid, cid)
                return self.send(200, {"count": len(names)}) if names is not None else self.err(404, "Không đọc được chương tranh")
        if len(p) == 5 and p[:1] == ["chapter"] and p[3] == "page":
            data, ext = lib.page_bytes(p[1], p[2], int(p[4]))
            if not data:
                return self.err(404, "Không có trang")
            return self.send_image(data, mimetypes.types_map.get(ext, "application/octet-stream"), lib.stamp(p[1], p[2], int(p[4])))
        self.err(404, "Không có")

    @staticmethod
    def drive_plan(sh, b):
        """One write plan, against shelf `sh` only."""
        if b.get("merge_fandom"):
            return WRITER.plan_merge_fandom(sh, b.get("target"), b.get("new_parent"))
        if b.get("whole_group"):
            return WRITER.plan_move_group(sh, b.get("target"), b.get("new_parent") or None, b.get("new_fandom") or None)
        if b.get("rename") == "chapters":
            return WRITER.plan_rename_chapters(sh, b.get("series"), b.get("items") or [])
        if b.get("rename") == "chapter":
            return WRITER.plan_rename_chapter(sh, b.get("series"), b.get("target"), b.get("new_name"))
        if b.get("rename"):
            return WRITER.plan_rename(sh, b["rename"], b.get("target"), b.get("new_name"))
        if b.get("undo"):
            return WRITER.plan_undo(sh, b.get("undo"))
        if b.get("whole_series"):
            return WRITER.plan_move_series(sh, b.get("series"), b.get("new_parent") or None, b.get("new_group") or None)
        return WRITER.plan_move(sh, b.get("series"), b.get("chapters") or b.get("chapter"), b.get("dest_series") or None,
                                b.get("new_parent") or None, b.get("new_name") or None)

    def shelves_edit(self, b):
        """add / change (folder) / rename / rescan / remove a shelf. Removing only forgets the shelf: its folder is not touched, and
        reading progress, collections, comments and the like are kept (they show as not found until the folder is a shelf again)."""
        act = b.get("action")
        if SHELVES_LOCKED and act in ("add", "change", "rename", "remove"):
            raise ShelfError(SHELVES_LOCKED)
        with lock:
            specs = lib.specs()
            spec = next((s for s in specs if s["id"] == b.get("id")), None)
            others = [s for s in specs if s is not spec]
            if act == "add":
                spec = new_spec(check_name(b.get("name"), specs), check_folder(b.get("path"), specs), specs)
                lib.upsert(spec)
            elif not spec:
                raise LookupError("Không thấy kệ này")
            elif act == "change":
                spec["path"] = check_folder(b.get("path"), others)
                lib.upsert(spec)
            elif act == "rename":
                lib.rename(spec["id"], check_name(b.get("name"), others))
            elif act == "rescan":
                lib.scan(spec["id"])
            elif act == "remove":
                lib.remove(spec["id"])
            else:
                raise ShelfError("Việc không rõ")
            if act not in ("rescan",):
                save_shelves()
        if act != "rename":
            SEARCH.start(lib)   # keeps an existing index in step (a shelf that left has its chapters dropped from it)
        return {"shelves": lib.info(), "id": spec["id"], "series": len(lib.series)}

    # ---- thumbnails: made by the browser (canvas), kept here so the next open is a small download ----
    def thumb_key(self, args):
        """args = [sid, 'cover'] or [sid, cid, n]; the key includes the source stamp, so a changed image gets a new thumbnail."""
        sid = args[0]
        if args[1] == "cover":
            tgt = lib.cover_target(sid)
            if not tgt:
                return None
            cid, n = tgt
        else:
            cid, n = args[1], int(args[2])
        st = lib.stamp(sid, cid, n)
        return hashlib.sha1(f"{sid}/{cid}/{n}/{st}".encode()).hexdigest()[:20] if st else None

    def thumb_get(self, args):
        key = self.thumb_key(args)
        f = THUMBS / f"{key}.jpg" if key else None
        if not f or not f.is_file():
            return self.err(404, "Chưa có ảnh nhỏ")
        self.send_image(f.read_bytes(), "image/jpeg", key)

    def thumb_put(self, args):
        key = self.thumb_key(args)
        n = int(self.headers.get("Content-Length") or 0)
        data = self.rfile.read(min(n, MAX_THUMB + 1))
        if not key:
            return self.err(404, "Không có trang này")
        if len(data) > MAX_THUMB or data[:3] != b"\xff\xd8\xff":
            return self.err(400, "Chỉ nhận ảnh JPEG nhỏ")
        THUMBS.mkdir(parents=True, exist_ok=True)
        tmp = THUMBS / f"{key}.tmp"
        tmp.write_bytes(data)
        tmp.replace(THUMBS / f"{key}.jpg")
        self.send(200, {"ok": True})

    @staticmethod
    def page_key(sid, cid, n):
        """Identity of a comic page's text: the chapter's page and the image's stamp, so a replaced picture is read again."""
        try:
            st = lib.stamp(sid, cid, int(n))
        except (ValueError, TypeError, OSError):
            return None
        return f"{sid}/{cid}/{n}/{st}" if st else None

    def senses_overview(self):
        """Every rule with how many places it changes in the saved translations right now."""
        uses, chapters = {}, 0
        for s in lib.series.values():
            for c in s["chapters"]:
                tr = TRANSLATIONS.get(c["title"], c["size"])
                if not tr:
                    continue
                chapters += 1
                _, hits = apply_rules(tr["translated"], SENSES.for_chapter("" if s["loose"] else s["title"], c["title"], c["size"]))
                for k, n in hits.items():
                    uses[k] = uses.get(k, 0) + n
        return {"chapters": chapters, "rules": [{**r, "uses": uses.get(r["id"], 0), "label": self.sense_label(r)} for r in SENSES.all()]}

    @staticmethod
    def sense_label(r):
        if r["scope"] == "all":
            return "Mọi truyện"
        if r["scope"] == "series":
            return f"Bộ “{r['series']}”"
        if r["scope"] == "chapter":
            return f"Chương “{r['chapter']['title']}”"
        return f"Đoạn {r['para'] + 1} của chương “{r['chapter']['title']}”"

    def senses_preview(self, b):
        """Where a new rule would change something: one row per chapter with a saved translation inside its scope."""
        s0 = lib.series.get(b.get("series")) if b.get("series") else None
        c0 = lib.chapter(b.get("series"), b.get("chapter")) if b.get("chapter") else None
        scope = b.get("scope")
        r = {"id": "preview", "from": str(b.get("from") or "").strip(), "to": str(b.get("to") or ""), "scope": scope, "whole": bool(b.get("whole", True)),
             "nocase": bool(b.get("nocase", False)), "para": b.get("para")}
        if not r["from"]:
            raise ValueError("Chưa có từ cần thay")
        if scope not in ("para", "chapter", "series", "all"):
            raise ValueError("Phạm vi không hợp lệ")
        rows = []
        for s in lib.series.values():
            if scope == "series" and (not s0 or s["id"] != s0["id"]):
                continue
            for c in s["chapters"]:
                if scope in ("para", "chapter") and (not c0 or c["id"] != c0["id"] or s["id"] != s0["id"]):
                    continue
                tr = TRANSLATIONS.get(c["title"], c["size"])
                if not tr:
                    continue
                lines, n = apply_rules(tr["translated"], [r])
                if not n:
                    continue
                first = next(i for i, (a, z) in enumerate(zip(tr["translated"], lines)) if a != z)
                rows.append({"series": s["id"], "chapter": c["id"], "series_title": "Chương lẻ" if s["loose"] else s["title"], "title": c["title"],
                             "count": n["preview"], "before": tr["translated"][first][:200], "after": lines[first][:200], "key": {"title": c["title"], "size": c["size"]}})
        rows.sort(key=lambda x: (x["series_title"].lower(), x["title"].lower()))
        return rows

    def comments_resolved(self, q):
        """Every comment with a link target (series / chapter) when it can be found; ?mood=, ?spoiler=1|0, ?q= filter it."""
        mood = (q.get("mood") or [""])[0]
        sp = (q.get("spoiler") or [""])[0]
        text = fold((q.get("q") or [""])[0].strip())
        by_chapter = {}
        for s in lib.series.values():
            for c in s["chapters"]:
                by_chapter.setdefault((c["title"].lower(), c["size"]), (s, c))
        by_series = {x["title"].lower(): x for x in lib.series.values() if not x["loose"]}
        out = []
        for c in META.all_comments():
            if mood and c["mood"] != mood:
                continue
            if sp in ("0", "1") and c["spoiler"] != (sp == "1"):
                continue
            if text and text not in fold(c["text"]):
                continue
            r = dict(c)
            if c["scope"] == "series":
                s = by_series.get(c["name"].lower())
                r.update(series=s["id"] if s else None, label=c["name"])
            else:
                hit = by_chapter.get((c["name"].lower(), c.get("size")))
                r.update(series=hit[0]["id"] if hit else None, chapter=hit[1]["id"] if hit else None,
                         label=c["name"], series_title=("Chương lẻ" if hit[0]["loose"] else hit[0]["title"]) if hit else "")
            out.append(r)
        return out

    def static(self, path):
        rel = "index.html" if path in ("/", "") else path.lstrip("/")
        f = (STATIC / rel).resolve()
        if STATIC.resolve() not in f.parents or not f.is_file():
            return self.err(404, "Không có")
        self.send(200, f.read_bytes(), mimetypes.guess_type(f.name)[0] or "application/octet-stream",
                  {"Cache-Control": "no-store"})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=8771)
    ap.add_argument("--root", help="library folder (overrides the saved setting for this run)")
    ap.add_argument("--no-browser", action="store_true")
    a = ap.parse_args()
    global SHELVES_LOCKED
    specs, migrated = migrate(read_json(SETTINGS, {}))
    if a.root:   # for this run only: one shelf, and the saved list is neither read nor changed
        specs = [{"id": "cli", "name": "Kệ (--root)", "path": a.root, "prefix": ""}]
        SHELVES_LOCKED = "Đang chạy với --root nên danh sách kệ không sửa được; chạy lại không kèm --root"
    lib.load(specs)
    if migrated and not a.root:   # an old single `root` becomes the first shelf, "Kệ chính" (the old key stays in the file)
        save_shelves()
    SEARCH.start(lib)
    srv = ThreadingHTTPServer(("127.0.0.1", a.port), Handler)
    url = f"http://127.0.0.1:{a.port}"
    print(f"Kệ Sách chạy ở {url}  ·  {len(lib.libs)} kệ  ·  {len(lib.series)} bộ")
    if not a.no_browser:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()

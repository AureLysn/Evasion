"""Kệ Sách — translation of a text chapter, done by Trạm Dịch (TranslateCenter), never by this app.

Kệ Sách only asks the running Trạm Dịch (default http://127.0.0.1:8765) to translate lines of text, and keeps the answer next to the
other private data in data/translations/ (never in the library folder). The address is restricted to this machine: chapter text must
not be posted to a host that a stray setting names. Which engine is used is Trạm Dịch's business; the choices it offers are passed
through, and the reader says plainly which ones send text to an outside service.
Lines are translated in place by Trạm Dịch (empty lines stay), so a translation lines up 1:1 with the source lines.
"""
import hashlib
import json
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

DEFAULT_URL = "http://127.0.0.1:8765"
LOCAL_HOSTS = {"127.0.0.1", "localhost", "[::1]", "::1"}
CHUNK = 15000          # characters per request to Trạm Dịch (its own limit is 200 000)
TIMEOUT = 600          # seconds per request: a long chapter on a slow engine takes a while
EXTERNAL = {"dichngay", "dichnhanh", "google"}   # engines of Trạm Dịch that send text to a service outside this machine


class TranslateError(Exception):
    """Something the user can act on (Trạm Dịch not running, refused text, ...)."""


def clean_url(url):
    u = (url or DEFAULT_URL).strip().rstrip("/")
    p = urlparse(u)
    if p.scheme not in ("http", "https") or (p.hostname or "") not in {h.strip("[]") for h in LOCAL_HOSTS}:
        raise TranslateError("Địa chỉ Trạm Dịch chỉ được là máy này (127.0.0.1 hoặc localhost), để chữ truyện không bị gửi tới nơi khác")
    return u


def _call(url, path, body=None):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(clean_url(url) + path, data=data, method="POST" if body is not None else "GET",
                                 headers={"Content-Type": "application/json"} if body is not None else {})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        try:
            msg = json.loads(e.read().decode("utf-8")).get("error") or e.reason
        except (ValueError, OSError):
            msg = e.reason
        raise TranslateError(f"Trạm Dịch từ chối: {msg}")
    except (urllib.error.URLError, OSError, TimeoutError):
        raise TranslateError("Không nối được Trạm Dịch. Mở TranslateCenter/start.bat rồi thử lại")


def engines(url):
    """[{id, label, langs, external}] as Trạm Dịch lists them."""
    raw = _call(url, "/api/engines")
    return [{"id": k, "label": v["label"], "langs": v["langs"], "external": k in EXTERNAL} for k, v in raw.items()]


def translate_lines(url, lines, engine="auto", source_lang="auto"):
    """-> (translated lines, engine used, source language). Same number of lines in and out."""
    text = "\n".join(lines)
    chunks, cur, size = [], [], 0
    for ln in lines:
        if cur and size + len(ln) + 1 > CHUNK:
            chunks.append(cur); cur, size = [], 0
        cur.append(ln); size += len(ln) + 1
    if cur:
        chunks.append(cur)
    out, used, lang = [], engine, source_lang
    for ch in chunks:
        if not any(l.strip() for l in ch):
            out.extend(ch)
            continue
        r = _call(url, "/api/translate/text", {"text": "\n".join(ch), "engine": engine, "source_lang": source_lang})
        got = r["text"].split("\n")
        if len(got) != len(ch):
            raise TranslateError("Trạm Dịch trả về số dòng khác với bản gốc, không ghép được. Thử engine khác")
        out.extend(got)
        used, lang = r.get("engine", used), r.get("source_lang", lang)
    return out, used, lang


def translate_texts(url, texts, engine="auto"):
    """Short separate texts (bubbles) -> their translations, same order. Each text is one line for Tram Dich."""
    clean = [" ".join(str(t).split()) for t in texts]
    out, used, lang = translate_lines(url, clean, engine)
    return out, used, lang


class PageTexts:
    """What was read and translated on a comic page, kept so a page is read once: data/ocr-pages/<key>.json.
    The key comes from the page image's stamp (modified time + size), so a replaced image is read again."""

    def __init__(self, folder):
        self.folder = Path(folder)

    def _file(self, key):
        return self.folder / (hashlib.sha1(key.encode("utf-8")).hexdigest()[:20] + ".json")

    def get(self, key):
        try:
            return json.loads(self._file(key).read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return None

    def put(self, key, data):
        self.folder.mkdir(parents=True, exist_ok=True)
        f = self._file(key)
        tmp = f.with_suffix(".tmp")
        tmp.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
        tmp.replace(f)

    def delete(self, key):
        try:
            self._file(key).unlink()
            return True
        except OSError:
            return False


class Translations:
    """Saved translations, one small file per chapter, keyed by file name + size like the other private data."""

    def __init__(self, folder):
        self.folder = Path(folder)

    def _file(self, title, size):
        return self.folder / (hashlib.sha1(f"{title.strip().lower()}|{size}".encode("utf-8")).hexdigest()[:20] + ".json")

    def get(self, title, size):
        try:
            return json.loads(self._file(title, size).read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return None

    def put(self, title, size, engine, lang, source, translated):
        self.folder.mkdir(parents=True, exist_ok=True)
        f = self._file(title, size)
        tmp = f.with_suffix(".tmp")
        tmp.write_text(json.dumps({"title": title, "size": size, "engine": engine, "source_lang": lang, "at": int(time.time()),
                                   "source": source, "translated": translated}, ensure_ascii=False), encoding="utf-8")
        tmp.replace(f)

    def delete(self, title, size):
        try:
            self._file(title, size).unlink()
            return True
        except OSError:
            return False

    def rename(self, m):
        """This app renamed the chapter: its saved translation follows."""
        d = self.get(m["old"], m["size"])
        if d and not self.get(m["new"], m["size"]):
            d["title"] = m["new"]
            self.put(m["new"], m["size"], d["engine"], d["source_lang"], d["source"], d["translated"])
            self.delete(m["old"], m["size"])

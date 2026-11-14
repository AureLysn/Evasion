"""Translation engines, name-set placeholders, batching and background jobs.

Ported from TM Translate 3.5.5.18 (AureLysn hardened): same request shapes for
dichngay / dichnhanh, same placeholder trick for names, same batch-halving retry.
"""
import html
import json
import re
import threading
import time
import traceback
import unicodedata
import urllib.parse
import urllib.request
import uuid

from . import db, vietphrase

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"

ENGINES = {
    "dichngay": {"label": "DichNgay (server)", "langs": {"zh"}},
    "dichnhanh": {"label": "DichNhanh (server)", "langs": {"zh"}},
    "google": {"label": "Google Translate", "langs": {"zh", "en"}},
    "local": {"label": "VietPhrase local (offline)", "langs": {"zh"}},
}

INVISIBLE = re.compile("[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF]")
PLACEHOLDER_BACK = re.compile(r"_{1,2}\s*TM\s*_?\s*NAME\s*_?\s*(\d+)\s*_{1,2}", re.IGNORECASE)


class TranslationError(Exception):
    pass


# ---------- http ----------

def _post(url, body, headers, timeout=60):
    req = urllib.request.Request(url, data=body, headers={"User-Agent": UA, **headers}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        raise TranslationError(f"HTTP {e.code} từ {urllib.parse.urlparse(url).netloc}") from e
    except urllib.error.URLError as e:
        raise TranslationError(f"Không kết nối được {urllib.parse.urlparse(url).netloc}: {e.reason}") from e


# ---------- response parsing (dichngay is loose with escapes) ----------

def _lenient_string_array(text, expected=0):
    text = text.strip()
    if not text.startswith("["):
        raise TranslationError("Phản hồi không phải mảng")
    i, n, values = 1, len(text), []
    while i < n:
        while i < n and text[i].isspace():
            i += 1
        if i >= n or text[i] == "]":
            break
        if text[i] != '"':
            raise TranslationError(f"Mảng hỏng tại vị trí {i}")
        i += 1
        buf = []
        while i < n:
            c = text[i]
            if c == "\\":
                nxt = text[i + 1] if i + 1 < n else ""
                if nxt == "u" and re.fullmatch(r"[0-9a-fA-F]{4}", text[i + 2:i + 6] or ""):
                    buf.append(chr(int(text[i + 2:i + 6], 16)))
                    i += 6
                    continue
                esc = {'"': '"', "\\": "\\", "/": "/", "b": "\b", "f": "\f", "n": "\n", "r": "\r", "t": "\t"}
                if nxt in esc:
                    buf.append(esc[nxt])
                    i += 2
                    continue
                j = i + 1
                while j < n and text[j].isspace():
                    j += 1
                if j < n and text[j] == '"':
                    buf.append('"')
                    i = j + 1
                    continue
                buf.append("\\")
                i += 1
                continue
            if c == '"':
                j = i + 1
                while j < n and text[j].isspace():
                    j += 1
                end = j >= n or text[j] == "]"
                sep = False
                if j < n and text[j] == ",":
                    k = j + 1
                    while k < n and text[k].isspace():
                        k += 1
                    sep = k >= n or text[k] in '"]'
                if end or sep:
                    i = j
                    break
                buf.append('"')
                i += 1
                continue
            buf.append(c)
            i += 1
        values.append("".join(buf))
        while i < n and text[i].isspace():
            i += 1
        if i < n and text[i] == ",":
            i += 1
    if expected and len(values) != expected:
        raise TranslationError(f"Số đoạn trả về lệch: cần {expected}, nhận {len(values)}")
    return values


def _parse_array_content(content, expected):
    content = re.sub(r"[\u0000-\u0008\u000B\u000C\u000E-\u001F]", "", content)
    candidates = [content, re.sub(r'\\+\s*"(?=\s*[^,\]])', r'\\"', content)]
    for c in candidates:
        try:
            v = json.loads(c)
            if isinstance(v, list):
                return [str(x) for x in v]
        except ValueError:
            pass
    return _lenient_string_array(candidates[1], expected)


# ---------- engines ----------

def engine_dichngay(items, s):
    raw = _post(s["dichngay_url"],
                json.dumps({"content": json.dumps(items, ensure_ascii=False), "tl": "vi"}).encode("utf-8"),
                {"Content-Type": "application/json", "Referer": "https://dichngay.com/"})
    data = json.loads(raw)
    content = (data.get("data") or {}).get("content") if isinstance(data.get("data"), dict) else None
    content = content if isinstance(content, str) else data.get("translatedText")
    if not isinstance(content, str):
        raise TranslationError("dichngay trả về dữ liệu không hợp lệ")
    return _parse_array_content(content, len(items))


def engine_dichnhanh(items, s):
    body = urllib.parse.urlencode({
        "type": "Modern" if s.get("dichnhanh_type") == "Modern" else "Ancient",
        "enable_analyze": "1" if s.get("dichnhanh_analyze") else "0",
        "enable_fanfic": "1" if s.get("dichnhanh_fanfic") else "0",
        "mode": s.get("dichnhanh_mode") if s.get("dichnhanh_mode") in ("vi", "qt", "hv") else "vi",
        "text": ",".join(json.dumps(x, ensure_ascii=False) for x in items),
        "remove": "",
    }).encode("utf-8")
    raw = _post(s["dichnhanh_url"], body, {
        "Content-Type": "application/x-www-form-urlencoded", "Referer": "https://dichnhanh.com/",
        "Accept": "application/json, text/plain, */*", "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.3",
    })
    data = json.loads(raw)
    if data.get("success") is not True:
        raise TranslationError(data.get("message") or "dichnhanh trả về lỗi")
    content = (data.get("data") or {}).get("content")
    if not isinstance(content, str):
        raise TranslationError("dichnhanh trả về dữ liệu không hợp lệ")
    content = content.strip()
    try:
        return _parse_array_content(f"[{content}]", len(items))
    except TranslationError:
        return _parse_array_content(f"[{html.unescape(content)}]", len(items))


def engine_google(items, s, source_lang="auto"):
    sl = {"zh": "zh-CN", "en": "en"}.get(source_lang, "auto")
    body = urllib.parse.urlencode({"q": "\n".join(items)}).encode("utf-8")
    raw = _post(f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl=vi&dt=t", body,
                {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"})
    data = json.loads(raw)
    text = "".join(seg[0] for seg in (data[0] or []) if seg and isinstance(seg[0], str))
    out = text.split("\n")
    if len(out) != len(items):
        raise TranslationError(f"Google trả số dòng lệch: cần {len(items)}, nhận {len(out)}")
    return [x.strip() for x in out]


# ---------- tokenising + names ----------

def _is_special(ch):
    cat = unicodedata.category(ch)
    return cat[0] in "SC" and not ch.isspace()


def tokenize(s):
    """Split into text runs and 'special' runs (symbols, emoji) that are never sent to a server."""
    tokens = []
    for ch in s:
        kind = "special" if _is_special(ch) else "text"
        if tokens and tokens[-1][0] == kind:
            tokens[-1][1] += ch
        else:
            tokens.append([kind, ch])
    return tokens


def build_name_replacer(names):
    keys = sorted((k for k in names if k), key=len, reverse=True)
    rx = re.compile("|".join(re.escape(k) for k in keys)) if keys else None

    def replace(text, placeholder_map):
        if not rx:
            return text
        local = {}

        def sub(m):
            key = m.group(0)
            if key not in local:
                pid = len(placeholder_map)
                placeholder_map[pid] = names[key]
                local[key] = pid
            return f" __TM_NAME_{local[key]}__ "
        return rx.sub(sub, text)
    return replace


def restore_names(text, placeholder_map):
    if placeholder_map:
        text = PLACEHOLDER_BACK.sub(lambda m: " " + placeholder_map.get(int(m.group(1)), m.group(0)) + " ", text)
    text = re.sub(r"\s+([,.;!?)”’:])", r"\1", text)
    text = re.sub(r"([(\[“‘])\s+", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def capitalize_first(text):
    for i, c in enumerate(text):
        if c.isalpha():
            return text[:i] + c.upper() + text[i + 1:]
    return text


def split_batches(items, max_chars):
    batches, cur, size = [], [], 0
    for s in items:
        if cur and size + len(s) + len(cur) > max_chars:
            batches.append(cur)
            cur, size = [], 0
        cur.append(s)
        size += len(s)
    if cur:
        batches.append(cur)
    return batches


# ---------- core ----------

def resolve_engine(engine, source_lang, settings):
    if not engine or engine == "auto":
        engine = settings["engine_en"] if source_lang == "en" else settings["engine_zh"]
    if engine not in ENGINES:
        raise TranslationError(f"Engine không tồn tại: {engine}")
    if source_lang == "vi":
        raise TranslationError("Sách này đã là tiếng Việt")
    if source_lang not in ENGINES[engine]["langs"]:
        raise TranslationError(f"{ENGINES[engine]['label']} không dịch được từ '{source_lang}'. "
                               "Với tiếng Anh hãy chọn Google.")
    return engine


class Translator:
    def __init__(self, engine, source_lang, settings, names, cancel=None):
        self.engine = engine
        self.source_lang = source_lang
        self.s = settings
        self.names = names or {}
        self.cancel = cancel or (lambda: False)
        self.delay = max(0, int(settings.get("delay_ms", 400))) / 1000
        self.retries = max(0, int(settings.get("retry_count", 3)))
        self.max_chars = max(500, int(settings.get("max_chars", 4500)))
        self._last = 0.0

    def _call(self, items):
        if self.engine == "dichngay":
            return engine_dichngay(items, self.s)
        if self.engine == "dichnhanh":
            return engine_dichnhanh(items, self.s)
        if self.engine == "google":
            return engine_google(items, self.s, self.source_lang)
        raise TranslationError("engine?")

    def _throttle(self):
        wait = self.delay - (time.time() - self._last)
        if wait > 0:
            time.sleep(wait)
        self._last = time.time()

    def _with_retry(self, items):
        err = None
        backoff = max(self.delay, 0.4)
        for attempt in range(self.retries + 1):
            if self.cancel():
                raise TranslationError("Đã huỷ")
            try:
                self._throttle()
                out = self._call(items)
                if len(out) != len(items):
                    raise TranslationError(f"Số đoạn trả về lệch: cần {len(items)}, nhận {len(out)}")
                return out
            except (TranslationError, ValueError, KeyError, IndexError, TypeError) as e:
                err = e
                if attempt < self.retries:
                    time.sleep(min(8, backoff))
                    backoff *= 1.75
        raise err if isinstance(err, TranslationError) else TranslationError(str(err))

    def _batch(self, items):
        try:
            return self._with_retry(items)
        except TranslationError:
            if len(items) == 1 or self.cancel():
                raise
            mid = (len(items) + 1) // 2
            return self._batch(items[:mid]) + self._batch(items[mid:])

    def lines(self, lines):
        """Translate a list of paragraphs; output has exactly the same length."""
        if self.engine == "local":
            return vietphrase.translate_lines([INVISIBLE.sub("", l) for l in lines], self.names)

        replacer = build_name_replacer(self.names)
        placeholder_map = {}
        plan, to_send = [], []
        for line in lines:
            tokens = tokenize(INVISIBLE.sub("", line).strip())
            count = 0
            for tok in tokens:
                if tok[0] == "text" and tok[1].strip():
                    to_send.append(replacer(tok[1], placeholder_map).strip())
                    count += 1
            plan.append((tokens, count))

        translated = []
        for batch in split_batches(to_send, self.max_chars):
            translated += self._batch(batch)

        out, k = [], 0
        for tokens, count in plan:
            parts = translated[k:k + count]
            k += count
            j, buf = 0, []
            for tok in tokens:
                if tok[0] == "text" and tok[1].strip():
                    raw = tok[1]
                    lead = raw[:len(raw) - len(raw.lstrip())]
                    trail = raw[len(raw.rstrip()):]
                    buf.append(lead + (parts[j] if j < len(parts) else raw.strip()) + trail)
                    j += 1
                else:
                    buf.append(tok[1])
            out.append(capitalize_first(restore_names("".join(buf), placeholder_map)))
        return out


# ---------- jobs ----------

_jobs = {}
_jobs_lock = threading.Lock()


def _job_view(j):
    return {k: v for k, v in j.items() if not k.startswith("_")}


def list_jobs():
    with _jobs_lock:
        return [_job_view(j) for j in sorted(_jobs.values(), key=lambda j: -j["started"])][:20]


def get_job(job_id):
    with _jobs_lock:
        j = _jobs.get(job_id)
        return _job_view(j) if j else None


def cancel_job(job_id):
    with _jobs_lock:
        j = _jobs.get(job_id)
        if j and j["status"] in ("queued", "running"):
            j["_cancel"] = True
            return True
    return False


def start_book_job(book_id, chapter_ids=None, engine="auto", overwrite=False, include_meta=True):
    conn = db.connect()
    try:
        book = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
        if not book:
            raise TranslationError("Không tìm thấy sách")
        settings = db.get_settings(conn)
        engine = resolve_engine(engine, book["source_lang"], settings)
        with _jobs_lock:
            for j in _jobs.values():
                if j["book_id"] == book_id and j["status"] in ("queued", "running"):
                    raise TranslationError("Sách này đang có một lượt dịch chạy")
        if chapter_ids:
            q = "SELECT id FROM chapters WHERE book_id = ? AND id IN (%s) ORDER BY idx" % ",".join("?" * len(chapter_ids))
            ids = [r["id"] for r in conn.execute(q, [book_id, *chapter_ids])]
        else:
            ids = [r["id"] for r in conn.execute(
                "SELECT id FROM chapters WHERE book_id = ? " + ("" if overwrite else "AND content_vi = '' ") + "ORDER BY idx",
                (book_id,))]
    finally:
        conn.close()

    job = {
        "id": uuid.uuid4().hex[:12], "book_id": book_id, "book_title": book["title"],
        "engine": engine, "status": "queued", "total": len(ids), "done": 0, "current": "",
        "errors": [], "started": time.time(), "finished": None, "_cancel": False,
    }
    with _jobs_lock:
        _jobs[job["id"]] = job
    threading.Thread(target=_run_job, args=(job, ids, overwrite, include_meta), daemon=True).start()
    return _job_view(job)


def _run_job(job, ids, overwrite, include_meta):
    job["status"] = "running"
    conn = db.connect()
    try:
        book = dict(conn.execute("SELECT * FROM books WHERE id = ?", (job["book_id"],)).fetchone())
        settings = db.get_settings(conn)
        names = db.merged_names(conn, book["id"])
        tr = Translator(job["engine"], book["source_lang"], settings, names, cancel=lambda: job["_cancel"])

        if include_meta and (overwrite or not book["title_vi"]):
            try:
                job["current"] = "Tên sách"
                title_vi = tr.lines([book["title"]])[0]
                conn.execute("UPDATE books SET title_vi = ? WHERE id = ?", (title_vi, book["id"]))
                conn.commit()
            except TranslationError as e:
                job["errors"].append(f"Tên sách: {e}")

        for cid in ids:
            if job["_cancel"]:
                break
            ch = db.get_chapter(conn, cid)
            if not ch:
                continue
            job["current"] = ch["title"]
            try:
                src_lines = ch["content_src"].split("\n") if ch["content_src"] else []
                out = tr.lines([ch["title"] or " ", *src_lines])
                conn.execute("UPDATE chapters SET title_vi = ?, content_vi = ?, updated = ? WHERE id = ?",
                             (out[0].strip(), "\n".join(out[1:]), time.time(), cid))
                db.touch_book(conn, book["id"])
                conn.commit()
            except TranslationError as e:
                if job["_cancel"]:
                    break
                job["errors"].append(f"{ch['title']}: {e}")
            except Exception as e:  # keep the job alive; report the chapter
                traceback.print_exc()
                job["errors"].append(f"{ch['title']}: {type(e).__name__}: {e}")
            job["done"] += 1
        job["status"] = "cancelled" if job["_cancel"] else ("error" if job["errors"] and job["done"] == len(job["errors"]) and job["total"] else "done")
    except Exception as e:
        traceback.print_exc()
        job["errors"].append(f"{type(e).__name__}: {e}")
        job["status"] = "error"
    finally:
        job["current"] = ""
        job["finished"] = time.time()
        conn.close()


def translate_text(text, engine, source_lang, book_id=None):
    conn = db.connect()
    try:
        settings = db.get_settings(conn)
        names = db.merged_names(conn, book_id)
    finally:
        conn.close()
    if source_lang in (None, "", "auto"):
        from .importers import detect_lang
        source_lang = detect_lang(text)
    engine = resolve_engine(engine, source_lang, settings)
    lines = str(text).replace("\r\n", "\n").split("\n")
    idx = [i for i, l in enumerate(lines) if l.strip()]
    out = Translator(engine, source_lang, settings, names).lines([lines[i] for i in idx]) if idx else []
    result = list(lines)
    for i, t in zip(idx, out):
        result[i] = t
    return {"text": "\n".join(result), "engine": engine, "source_lang": source_lang}

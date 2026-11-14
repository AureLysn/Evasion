"""Kệ Sách — search inside the text chapters (.txt .md .epub).

The text of every chapter is read once and kept in data/search.sqlite3 (standard library sqlite3), next to a folded copy used for
matching: lower case, no diacritics, đ = d, so "ngay mua" finds "ngày mưa". The fold maps each character to exactly one character,
so a position found in the folded copy is the same position in the original and snippets can be cut from the original.
The index is rebuilt in the background: a chapter is read again only if its size or modified time changed, rows of chapters that are
gone are dropped. Comics have no text and are not indexed. The library folder is only read.
"""
import re
import sqlite3
import threading
import unicodedata
from pathlib import Path

MAX_TEXT = 3_000_000       # characters kept per chapter
MAX_FILE = 40_000_000      # bytes: a bigger file is skipped
_fold_cache = {}


def fold_char(ch):
    r = _fold_cache.get(ch)
    if r is None:
        if ch in "đĐ":
            r = "d"
        else:
            base = "".join(c for c in unicodedata.normalize("NFD", ch) if not unicodedata.combining(c)) or ch
            low = base.lower()
            r = low[0] if low else ch
        _fold_cache[ch] = r
    return r


def long_enough(q):
    """Two characters, except that one CJK character is a word already."""
    return len(q) >= 2 or any(ord(c) > 0x2E7F for c in q)


def fold(s):
    """One output character per input character (positions stay aligned)."""
    return "".join(fold_char(c) for c in s)


class SearchIndex:
    def __init__(self, path):
        self.path = Path(path)
        self.state = {"running": False, "total": 0, "done": 0, "errors": 0, "indexed": 0}
        self._lock = threading.Lock()
        self._thread = None

    def _db(self):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        c = sqlite3.connect(str(self.path), timeout=30)
        c.execute("PRAGMA journal_mode=WAL")
        c.execute("CREATE TABLE IF NOT EXISTS docs (rel TEXT PRIMARY KEY, size INTEGER, mtime INTEGER, title TEXT, norm TEXT, text TEXT)")
        return c

    # ---- building ----
    def start(self, lib, force=False):
        """Index in the background; a second call while one is running is ignored (it would only repeat the work).
        Without force it only keeps an EXISTING index up to date: building one reads every text chapter, and on a Drive folder in
        "stream" mode that downloads them all, so the first build is something the user asks for."""
        if not force and self.status()["documents"] == 0:
            return False
        with self._lock:
            if self._thread and self._thread.is_alive():
                return False
            items = []
            for s in lib.series.values():
                for c in s["chapters"]:
                    if c["kind"] == "text":
                        items.append(c)
            self.state = {"running": True, "total": len(items), "done": 0, "errors": 0, "indexed": 0}
            self._thread = threading.Thread(target=self._run, args=(lib, items), daemon=True)
            self._thread.start()
            return True

    def _run(self, lib, items):
        try:
            db = self._db()
            have = {r[0]: (r[1], r[2]) for r in db.execute("SELECT rel, size, mtime FROM docs")}
            seen = set()
            for c in items:
                try:
                    p = c["path"]
                    rel = lib.relkey(p)
                    seen.add(rel)
                    st = p.stat()
                    stamp = (st.st_size, st.st_mtime_ns)
                    if have.get(rel) == stamp:
                        continue
                    if st.st_size > MAX_FILE:
                        continue
                    text = lib.text_of(c)[:MAX_TEXT]
                    db.execute("INSERT OR REPLACE INTO docs (rel, size, mtime, title, norm, text) VALUES (?,?,?,?,?,?)",
                               (rel, stamp[0], stamp[1], c["title"], fold(text), text))
                    self.state["indexed"] += 1
                    if self.state["indexed"] % 20 == 0:
                        db.commit()
                except Exception:   # noqa: BLE001 — one unreadable file must not stop the rest
                    self.state["errors"] += 1
                finally:
                    self.state["done"] += 1
            for rel in set(have) - seen:
                if lib.key_down(rel):   # its shelf could not be read (drive not mounted): keep what was indexed instead of dropping it
                    continue
                db.execute("DELETE FROM docs WHERE rel = ?", (rel,))
            db.commit()
            db.close()
        finally:
            self.state["running"] = False

    def status(self):
        n = 0
        try:
            db = self._db(); n = db.execute("SELECT COUNT(*) FROM docs").fetchone()[0]; db.close()
        except sqlite3.Error:
            pass
        return {**self.state, "documents": n}

    # ---- searching ----
    def search(self, lib, q, limit=60, per_doc=3, width=70):
        """-> list of {series, chapter, series_title, title, count, snippets:[{text, start, len}]}, best (most matches) first."""
        q = (q or "").strip()
        if not long_enough(q):
            return []
        nq = fold(q)
        where = {}
        for s in lib.series.values():
            for c in s["chapters"]:
                if c["kind"] == "text":
                    where[lib.relkey(c["path"])] = (s, c)
        db = self._db()
        rows = db.execute("SELECT rel, norm, text FROM docs WHERE instr(norm, ?) > 0", (nq,)).fetchall()
        db.close()
        out = []
        for rel, norm, text in rows:
            if rel not in where:
                continue
            s, c = where[rel]
            starts, i = [], norm.find(nq)
            while i >= 0 and len(starts) < 500:
                starts.append(i)
                i = norm.find(nq, i + len(nq))
            snips = []
            for a in starts[:per_doc]:
                lo, hi = max(0, a - width), min(len(text), a + len(nq) + width)
                snippet = text[lo:hi].translate({13: " ", 10: " ", 9: " "})
                # CR / LF / tab are replaced one-for-one, so offsets inside the snippet stay valid
                snips.append({"text": ("…" if lo else "") + snippet + ("…" if hi < len(text) else ""), "start": a - lo + (1 if lo else 0), "len": len(nq)})
            out.append({"series": s["id"], "chapter": c["id"], "series_title": "Chương lẻ" if s["loose"] else s["title"],
                        "loose": s["loose"], "title": c["title"], "count": len(starts), "snippets": snips})
        out.sort(key=lambda r: (-r["count"], r["series_title"].lower(), r["title"].lower()))
        return out[:limit]

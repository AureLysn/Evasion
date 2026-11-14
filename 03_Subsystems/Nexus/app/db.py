"""SQLite storage. One connection per call — the server is threaded and single-user."""
import json
import os
import re
import sqlite3
import threading
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# TRAMDICH_DATA points the app at another library (tests, a second profile) without touching data/
DATA = Path(os.environ["TRAMDICH_DATA"]) if os.environ.get("TRAMDICH_DATA") else ROOT / "data"
# A test instance (TRAMDICH_DATA set) must not write anything real (vault L70, 2026-10-05: a test
# run once wrote into Aurel's real folders). vault.find_root() refuses to guess the real vault for it.
# (The workspace export and its WORKSPACE constant were removed on 2026-11-13.)
TEST_INSTANCE = bool(os.environ.get("TRAMDICH_DATA"))
DB_PATH = DATA / "library.db"
COVERS = DATA / "covers"
DICTS = DATA / "dicts"
EXPORTS = DATA / "exports"
STAGING = DATA / "staging"   # archives waiting between “quét” and “nhập”
# Translation data kept beside this app: the subsystem `Verba` (`Verba/zh_to_vi/*.json`; the folder
# was called `translate-data` before the 2026-11 rebuild). server.py serves it read-only at
# /translate-data/ — the route keeps its old name because the TM Translate userscript has it.
TRANSLATE_DATA = ROOT.parent / "Verba"

_init_lock = threading.Lock()

SCHEMA = """
CREATE TABLE IF NOT EXISTS shelves (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    position INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    title_vi TEXT NOT NULL DEFAULT '',
    author TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    source_lang TEXT NOT NULL DEFAULT 'zh',
    format TEXT NOT NULL DEFAULT 'txt',
    origin TEXT NOT NULL DEFAULT '',
    shelf_id INTEGER REFERENCES shelves(id) ON DELETE SET NULL,
    cover TEXT NOT NULL DEFAULT '',
    last_chapter_id INTEGER,
    last_scroll REAL NOT NULL DEFAULT 0,
    created REAL NOT NULL,
    updated REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    idx INTEGER NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    title_vi TEXT NOT NULL DEFAULT '',
    content_src TEXT NOT NULL DEFAULT '',
    content_vi TEXT NOT NULL DEFAULT '',
    updated REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS chapters_book ON chapters(book_id, idx);
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE COLLATE NOCASE
);
CREATE TABLE IF NOT EXISTS book_tags (
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, tag_id)
);
CREATE TABLE IF NOT EXISTS names (
    id INTEGER PRIMARY KEY,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    src TEXT NOT NULL,
    vi TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS names_book ON names(book_id);
CREATE TABLE IF NOT EXISTS senses (
    id INTEGER PRIMARY KEY,
    frm TEXT NOT NULL,
    to_text TEXT NOT NULL,
    scope TEXT NOT NULL,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
    para INTEGER,
    whole INTEGER NOT NULL DEFAULT 1,
    nocase INTEGER NOT NULL DEFAULT 0,
    enabled INTEGER NOT NULL DEFAULT 1,
    exclude TEXT NOT NULL DEFAULT '[]',
    created REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS senses_book ON senses(book_id);
CREATE TABLE IF NOT EXISTS edits (
    chapter_id INTEGER PRIMARY KEY REFERENCES chapters(id) ON DELETE CASCADE,
    base TEXT NOT NULL DEFAULT 'src',
    base_text TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    saved_path TEXT NOT NULL DEFAULT '',
    updated REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS edit_history (
    id INTEGER PRIMARY KEY,
    chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    saved REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS edit_history_chapter ON edit_history(chapter_id, saved);
CREATE TABLE IF NOT EXISTS writing_days (
    day TEXT PRIMARY KEY,
    words INTEGER NOT NULL DEFAULT 0,
    saves INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
"""

DEFAULT_SETTINGS = {
    "engine_zh": "dichngay",
    "engine_en": "google",
    "dichngay_url": "https://dichngay.com/translate/text",
    "dichnhanh_url": "https://api.dichnhanh.com/",
    "dichnhanh_mode": "vi",
    "dichnhanh_type": "Ancient",
    "dichnhanh_analyze": False,
    "dichnhanh_fanfic": False,
    "delay_ms": 400,
    "retry_count": 3,
    "max_chars": 4500,
    "drive_roots": ["G:\\My Drive"],
    # The three dictionaries ship with the vault (Verba/zh_to_vi/), so the default
    # source is the copy on disk — no network, and no dependency on the upstream repo staying up.
    "dict_name_url": (TRANSLATE_DATA / "zh_to_vi" / "Name.json").as_uri(),
    "dict_vp_url": (TRANSLATE_DATA / "zh_to_vi" / "VP.json").as_uri(),
    "dict_hv_url": (TRANSLATE_DATA / "zh_to_vi" / "HanViet.json").as_uri(),
    "chapter_pattern": "",
    "vault_root": "",
    "rar_tool": "",
    "strip_post_header": True,
    "desk_daily_goal": 0,  # writing desk: words to add per day; 0 = no goal
    "desk_words": {},      # writing desk: {book id: "word\n…"} — spellings Aurel told the checker to accept
    "desk_auto_short": True,   # writing desk: expand the common Vietnamese shorthand while typing
    # writing desk, auto-correct table: `global` = "from=to" lines for every book; `off` = built-in
    # entries switched off; `on` = built-in entries that are off by default, switched on
    "desk_auto": {"global": "", "off": [], "on": []},
    "desk_snippets": {},   # writing desk: {book id: "bh=Boothill\n…"} — abbreviations expanded while typing
}


def connect():
    for d in (DATA, COVERS, DICTS, EXPORTS, STAGING):
        d.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init():
    with _init_lock:
        conn = connect()
        try:
            conn.execute("PRAGMA journal_mode = WAL")
            conn.executescript(SCHEMA)
            cols = {r[1] for r in conn.execute("PRAGMA table_info(books)")}
            if "sensitive" not in cols:
                # 1 = holds text copied from the vault or its stores (personal lane)
                conn.execute("ALTER TABLE books ADD COLUMN sensitive INTEGER NOT NULL DEFAULT 0")
                conn.execute("UPDATE books SET sensitive = 1 WHERE origin LIKE 'vault:%' OR origin LIKE 'store:%'")
            if "external_ok" not in cols:
                # 1 = Aurel agreed to send this book to a server engine; reset whenever vault text is added
                conn.execute("ALTER TABLE books ADD COLUMN external_ok INTEGER NOT NULL DEFAULT 0")
            if "vault_src" not in cols:
                # JSON: which vault notes this book was built from, so it can be re-checked
                conn.execute("ALTER TABLE books ADD COLUMN vault_src TEXT NOT NULL DEFAULT ''")
            ch_cols = {r[1] for r in conn.execute("PRAGMA table_info(chapters)")}
            if "summary" not in ch_cols:
                # one-line chapter summary typed by Aurel, shown in the table of contents
                conn.execute("ALTER TABLE chapters ADD COLUMN summary TEXT NOT NULL DEFAULT ''")
            if "vault_status" not in ch_cols:
                # the vault note's `status:` when the chapter was last taken from it; '' = not known
                conn.execute("ALTER TABLE chapters ADD COLUMN vault_status TEXT NOT NULL DEFAULT ''")
            conn.commit()
        finally:
            conn.close()


def now():
    return time.time()


def rows(cur):
    return [dict(r) for r in cur.fetchall()]


# ---------- settings ----------

def get_settings(conn):
    out = dict(DEFAULT_SETTINGS)
    for r in conn.execute("SELECT key, value FROM settings"):
        try:
            out[r["key"]] = json.loads(r["value"])
        except ValueError:
            pass
    return out


def put_settings(conn, patch):
    for k, v in patch.items():
        if k not in DEFAULT_SETTINGS:
            continue
        conn.execute(
            "INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            (k, json.dumps(v, ensure_ascii=False)),
        )
    conn.commit()
    return get_settings(conn)


# ---------- tags ----------

def set_book_tags(conn, book_id, names):
    conn.execute("DELETE FROM book_tags WHERE book_id = ?", (book_id,))
    seen = set()
    for raw in names:
        name = str(raw).strip()
        if not name or name.lower() in seen:
            continue
        seen.add(name.lower())
        conn.execute("INSERT OR IGNORE INTO tags(name) VALUES(?)", (name,))
        tag_id = conn.execute("SELECT id FROM tags WHERE name = ?", (name,)).fetchone()["id"]
        conn.execute("INSERT OR IGNORE INTO book_tags(book_id, tag_id) VALUES(?, ?)", (book_id, tag_id))
    # tags nobody uses any more are noise in the filter bar
    conn.execute("DELETE FROM tags WHERE id NOT IN (SELECT tag_id FROM book_tags)")


def book_tags(conn, book_id):
    return [r["name"] for r in conn.execute(
        "SELECT t.name FROM tags t JOIN book_tags bt ON bt.tag_id = t.id WHERE bt.book_id = ? ORDER BY t.name",
        (book_id,),
    )]


# ---------- books ----------

def create_book(conn, parsed, origin, shelf_id=None, sensitive=False):
    t = now()
    cur = conn.execute(
        "INSERT INTO books(title, author, description, source_lang, format, origin, shelf_id, sensitive, created, updated)"
        " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (parsed["title"], parsed.get("author", ""), parsed.get("description", ""),
         parsed.get("source_lang", "zh"), parsed["format"], origin, shelf_id, 1 if sensitive else 0, t, t),
    )
    book_id = cur.lastrowid
    for i, ch in enumerate(parsed["chapters"]):
        conn.execute(
            "INSERT INTO chapters(book_id, idx, title, content_src, vault_status, updated) VALUES(?, ?, ?, ?, ?, ?)",
            (book_id, i, ch["title"], ch["content"], ch.get("status", ""), t),
        )
    conn.commit()
    return book_id


def list_books(conn, shelf=None, tags=None, q=None, lang=None, status=None):
    sql = [
        "SELECT b.id, b.title, b.title_vi, b.author, b.source_lang, b.format, b.shelf_id, b.cover,"
        " b.last_chapter_id, b.created, b.updated,"
        " (SELECT COUNT(*) FROM chapters c WHERE c.book_id = b.id) AS chapter_count,"
        " (SELECT COUNT(*) FROM chapters c WHERE c.book_id = b.id AND c.content_vi != '') AS translated_count"
        " FROM books b WHERE 1 = 1"
    ]
    args = []
    if shelf == "none":
        sql.append("AND b.shelf_id IS NULL")
    elif shelf:
        sql.append("AND b.shelf_id = ?")
        args.append(int(shelf))
    for tag in tags or []:
        sql.append("AND EXISTS (SELECT 1 FROM book_tags bt JOIN tags t ON t.id = bt.tag_id"
                   " WHERE bt.book_id = b.id AND t.name = ?)")
        args.append(tag)
    if q:
        sql.append("AND (b.title LIKE ? OR b.title_vi LIKE ? OR b.author LIKE ?)")
        args += [f"%{q}%"] * 3
    if lang:
        sql.append("AND b.source_lang = ?")
        args.append(lang)
    sql.append("ORDER BY b.updated DESC")
    out = rows(conn.execute(" ".join(sql), args))
    if status:
        def st(b):
            if b["translated_count"] == 0:
                return "none"
            return "full" if b["translated_count"] >= b["chapter_count"] else "partial"
        out = [b for b in out if st(b) == status]
    for b in out:
        b["tags"] = book_tags(conn, b["id"])
    return out


def get_book(conn, book_id):
    r = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    if not r:
        return None
    b = dict(r)
    b["tags"] = book_tags(conn, book_id)
    b["chapters"] = rows(conn.execute(
        "SELECT id, idx, title, title_vi, summary, vault_status, length(content_src) AS len_src, length(content_vi) AS len_vi,"
        " EXISTS (SELECT 1 FROM edits e WHERE e.chapter_id = chapters.id) AS has_edit"
        " FROM chapters WHERE book_id = ? ORDER BY idx",
        (book_id,),
    ))
    return b


def touch_book(conn, book_id):
    conn.execute("UPDATE books SET updated = ? WHERE id = ?", (now(), book_id))


def _title_key(title):
    return re.sub(r"\s+", "", title or "").lower()


def append_chapters(conn, book_id, chapters, after_idx=None, skip_dupes=False, sensitive=False):
    """Insert chapters into an existing book, at the end or right after chapter `after_idx`."""
    existing = conn.execute("SELECT title, title_vi FROM chapters WHERE book_id = ?", (book_id,)).fetchall()
    seen = {_title_key(r["title"]) for r in existing} | {_title_key(r["title_vi"]) for r in existing if r["title_vi"]}
    count = len(existing)
    idx = count if after_idx is None else max(0, min(int(after_idx) + 1, count))
    to_add, skipped = [], []
    for ch in chapters:
        key = _title_key(ch["title"])
        if skip_dupes and key and key in seen:
            skipped.append(ch["title"])
            continue
        seen.add(key)
        to_add.append(ch)
    ids = []
    if to_add:
        t = now()
        conn.execute("UPDATE chapters SET idx = idx + ? WHERE book_id = ? AND idx >= ?", (len(to_add), book_id, idx))
        for i, ch in enumerate(to_add):
            cur = conn.execute(
                "INSERT INTO chapters(book_id, idx, title, content_src, vault_status, updated) VALUES(?, ?, ?, ?, ?, ?)",
                (book_id, idx + i, ch["title"], ch["content"], ch.get("status", ""), t))
            ids.append(cur.lastrowid)
        if sensitive:
            conn.execute("UPDATE books SET sensitive = 1, external_ok = 0 WHERE id = ?", (book_id,))
        touch_book(conn, book_id)
    conn.commit()
    return {"added": len(to_add), "skipped": skipped, "chapter_ids": ids, "last_idx": idx + len(to_add) - 1}


def reindex(conn, book_id):
    ids = [r["id"] for r in conn.execute("SELECT id FROM chapters WHERE book_id = ? ORDER BY idx, id", (book_id,))]
    for i, cid in enumerate(ids):
        conn.execute("UPDATE chapters SET idx = ? WHERE id = ?", (i, cid))


def get_chapter(conn, chapter_id):
    r = conn.execute("SELECT * FROM chapters WHERE id = ?", (chapter_id,)).fetchone()
    return dict(r) if r else None


# ---------- edits: Aurel's own version of a chapter ----------
# One row per chapter, beside the chapter and never inside it: `content_src` and `content_vi`
# stay what was imported / translated, so there is always something to compare against.
# `base` = which of the two the edit started from; `base_text` = that text at the last save,
# kept so the desk can say when the reference has moved on (a draft re-taken from the vault).

def get_edit(conn, chapter_id):
    r = conn.execute("SELECT * FROM edits WHERE chapter_id = ?", (chapter_id,)).fetchone()
    return dict(r) if r else None


HISTORY_GAP = 600    # the desk autosaves every few seconds; one checkpoint per ten minutes is enough
HISTORY_KEEP = 20


def keep_edit_history(conn, chapter_id, force=False):
    """Copy the saved version into `edit_history` before it is replaced or dropped."""
    old = get_edit(conn, chapter_id)
    if not old or not old["content"]:
        return
    last = conn.execute("SELECT content, saved FROM edit_history WHERE chapter_id = ? ORDER BY saved DESC LIMIT 1",
                        (chapter_id,)).fetchone()
    if last and (last["content"] == old["content"] or (not force and now() - last["saved"] < HISTORY_GAP)):
        return
    conn.execute("INSERT INTO edit_history(chapter_id, content, saved) VALUES(?, ?, ?)",
                 (chapter_id, old["content"], old["updated"]))
    conn.execute("DELETE FROM edit_history WHERE chapter_id = ? AND id NOT IN"
                 " (SELECT id FROM edit_history WHERE chapter_id = ? ORDER BY saved DESC LIMIT ?)",
                 (chapter_id, chapter_id, HISTORY_KEEP))


def put_edit(conn, chapter_id, base, base_text, content):
    old = get_edit(conn, chapter_id)
    if old and old["content"] != content:
        keep_edit_history(conn, chapter_id)
    conn.execute(
        "INSERT INTO edits(chapter_id, base, base_text, content, updated) VALUES(?, ?, ?, ?, ?)"
        " ON CONFLICT(chapter_id) DO UPDATE SET base = excluded.base, base_text = excluded.base_text,"
        " content = excluded.content, updated = excluded.updated",
        (chapter_id, base, base_text, content, now()))
    conn.commit()
    return get_edit(conn, chapter_id)


# ---------- writing days: what the desk saved, per day ----------
# `words` is the NET change in word count over the day's saves — a day spent tightening a
# converted chapter can end below zero. So a day counts toward the streak by `saves`, not by words.

def log_writing(conn, delta):
    conn.execute(
        "INSERT INTO writing_days(day, words, saves) VALUES(?, ?, 1)"
        " ON CONFLICT(day) DO UPDATE SET words = words + excluded.words, saves = saves + 1",
        (time.strftime("%Y-%m-%d"), int(delta)))
    conn.commit()


def writing_summary(conn, days=14):
    got = {r["day"]: dict(r) for r in conn.execute("SELECT * FROM writing_days ORDER BY day DESC LIMIT 400")}
    today = time.time()
    day_at = lambda back: time.strftime("%Y-%m-%d", time.localtime(today - back * 86400))
    # today not written yet does not break a streak that reached yesterday
    back = 0 if day_at(0) in got else 1
    streak = 0
    while day_at(back + streak) in got:
        streak += 1
    recent = [{"day": day_at(i), **{k: got.get(day_at(i), {}).get(k, 0) for k in ("words", "saves")}}
              for i in range(days - 1, -1, -1)]
    return {"today": recent[-1], "streak": streak, "recent": recent,
            "goal": int(get_settings(conn).get("desk_daily_goal") or 0)}


# ---------- names (glossary) ----------

def get_names(conn, book_id=None):
    if book_id is None:
        cur = conn.execute("SELECT src, vi FROM names WHERE book_id IS NULL ORDER BY id")
    else:
        cur = conn.execute("SELECT src, vi FROM names WHERE book_id = ? ORDER BY id", (book_id,))
    return [(r["src"], r["vi"]) for r in cur]


def merged_names(conn, book_id):
    """Global names first, then book names — a book entry overrides a global one."""
    out = dict(get_names(conn, None))
    if book_id is not None:
        out.update(dict(get_names(conn, book_id)))
    return out


def replace_names(conn, book_id, pairs):
    if book_id is None:
        conn.execute("DELETE FROM names WHERE book_id IS NULL")
    else:
        conn.execute("DELETE FROM names WHERE book_id = ?", (book_id,))
    for src, vi in pairs:
        conn.execute("INSERT INTO names(book_id, src, vi) VALUES(?, ?, ?)", (book_id, src, vi))
    conn.commit()


def add_name(conn, book_id, src, vi):
    if book_id is None:
        conn.execute("DELETE FROM names WHERE book_id IS NULL AND src = ?", (src,))
    else:
        conn.execute("DELETE FROM names WHERE book_id = ? AND src = ?", (book_id, src))
    conn.execute("INSERT INTO names(book_id, src, vi) VALUES(?, ?, ?)", (book_id, src, vi))
    conn.commit()


def parse_names_text(text):
    pairs = []
    for line in str(text or "").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        src, vi = line.split("=", 1)
        src, vi = src.strip(), vi.strip()
        if src:
            pairs.append((src, vi))
    return pairs

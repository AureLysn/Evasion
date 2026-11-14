"""Kệ Sách — several shelves. A shelf is one folder (its own Library); this merges them into one view for the rest of the app.

Ids stay apart because a shelf's `prefix` is mixed into its series ids (see library.py) and into the keys other stores keep for
a path (`relkey`). The first / migrated shelf has prefix "", so ids made before shelves existed still resolve.
Read-only: nothing here writes under any shelf folder. The shelf list itself lives in data/settings.json ("shelves").
"""
import hashlib
import os
import secrets

from .library import Library, decode_text, epub_text, nat_key, parse_root, tree_of

DEFAULT_NAME = "Kệ chính"


class ShelfError(ValueError):
    """A refusal with a reason the user can read."""


def migrate(settings):
    """-> (shelf specs, changed). Settings without "shelves" but with the old single `root` become one shelf, "Kệ chính", with the
    prefix "" so its ids, reading progress, collections and search index are untouched. The old `root` key is left in place."""
    if isinstance(settings.get("shelves"), list):
        return [dict(s) for s in settings["shelves"] if isinstance(s, dict) and s.get("path")], False
    root = str(settings.get("root") or "").strip()
    if not root:
        return [], False
    return [{"id": "main", "name": DEFAULT_NAME, "path": root, "prefix": ""}], True


def _same_or_nested(a, b):
    """True when folder a is b, inside b, or contains b (two shelves must not read the same series twice)."""
    a, b = os.path.normcase(str(a)), os.path.normcase(str(b))
    return a == b or a.startswith(b.rstrip("\\/") + os.sep) or b.startswith(a.rstrip("\\/") + os.sep)


def check_folder(text, others=()):
    """What the user typed -> the folder as a clean string. Refuses with a reason: not a usable path, not a folder that exists,
    or the same as / inside / around another shelf."""
    p, msg = parse_root(text)
    if not p:
        raise ShelfError(msg)
    if p.is_file():
        raise ShelfError(f"Đây là một file, cần thư mục chứa truyện: {p.parent}")
    if not p.is_dir():
        raise ShelfError(f"Không thấy thư mục: {p}")
    for o in others:
        q, _ = parse_root(o["path"])
        if q and _same_or_nested(p, q):
            raise ShelfError(f"Thư mục này trùng hoặc lồng với kệ “{o['name']}” ({q}). Hai kệ không được đọc chung một thư mục")
    return str(p)


def check_name(name, others=()):
    n = " ".join(str(name or "").split())
    if not n:
        raise ShelfError("Chưa đặt tên kệ")
    if len(n) > 60:
        raise ShelfError("Tên kệ tối đa 60 ký tự")
    if any(o["name"].lower() == n.lower() for o in others):
        raise ShelfError(f"Đã có kệ tên “{n}”")
    return n


def new_spec(name, path, existing):
    """A new shelf. The first one when no shelf has prefix "" gets "" (same ids as the single-folder days). Later ones get a prefix
    made from the folder, so removing a shelf and adding the same folder again brings its reading progress back; if that prefix is
    already taken (a shelf whose folder was changed later) a random one is used."""
    sid = "k" + secrets.token_hex(3)
    while any(s["id"] == sid for s in existing):
        sid = "k" + secrets.token_hex(3)
    if not any(s.get("prefix", "") == "" for s in existing):
        prefix = ""
    else:
        prefix = "p" + hashlib.sha1(os.path.normcase(path).encode("utf-8")).hexdigest()[:6] + "|"
        if any(s.get("prefix") == prefix for s in existing):
            prefix = sid + "|"
    return {"id": sid, "name": name, "path": path, "prefix": prefix}


class Shelves:
    """What `lib` is in server.py: the same calls as one Library, answered across every shelf."""

    def __init__(self):
        self.libs = []
        self._merged = None
        self._stamp = None

    # ---- the list ----
    def load(self, specs):
        """Replace the shelves with `specs` and scan each. A shelf whose folder cannot be read stays listed with its error."""
        self.libs = [Library(s["path"], s["id"], s.get("name") or DEFAULT_NAME, s.get("prefix", "")) for s in specs]
        self.scan()

    def get(self, shelf_id):
        return next((l for l in self.libs if l.shelf_id == shelf_id), None)

    def scan(self, shelf_id=None):
        for l in self.libs:
            if shelf_id is None or l.shelf_id == shelf_id:
                l.scan()

    def info(self):
        return [{"id": l.shelf_id, "name": l.name, "path": str(l.root) if l.root else l.raw, "series": len(l.series), "error": l.error,
                 "scanned": l.scanned_at, "plain": l.prefix == ""} for l in self.libs]

    # ---- merged views ----
    @property
    def series(self):
        stamp = tuple((id(l), l.scans) for l in self.libs)
        if self._merged is None or stamp != self._stamp:
            self._merged = {sid: s for l in self.libs for sid, s in l.series.items()}
            self._stamp = stamp
        return self._merged

    @property
    def error(self):
        """Empty while at least one shelf is readable; otherwise why nothing shows."""
        if not self.libs:
            return "Chưa có kệ nào"
        if any(not l.error for l in self.libs):
            return ""
        return "; ".join(f"{l.name}: {l.error}" for l in self.libs)

    def lib_of(self, sid):
        return next((l for l in self.libs if sid in l.series), None)

    def relkey(self, path):
        """Key for a path in any shelf (see Library.relkey)."""
        for l in self.libs:
            if l.root:
                try:
                    return l.relkey(path)
                except ValueError:
                    continue
        raise ValueError(f"Không nằm trong kệ nào: {path}")

    def key_down(self, key):
        """Is this stored path key from a shelf that could not be read right now? (Then 'not found' means 'not mounted', not 'deleted'.)"""
        for l in self.libs:
            mine = key.startswith(l.prefix) if l.prefix else "|" not in key   # a file name cannot hold "|" on Windows, so "" owns the keys without one
            if l.error and mine:
                return True
        return False

    def list(self, progress=None):
        rows = [r for l in self.libs for r in l.list(progress)]
        return sorted(rows, key=lambda r: nat_key(r["title"]))

    def tree(self, shelf_id=None):
        return tree_of(s for l in self.libs if shelf_id in (None, "", l.shelf_id) for s in l.series.values())

    def detail(self, sid):
        l = self.lib_of(sid)
        return l.detail(sid) if l else None

    def chapter(self, sid, cid):
        l = self.lib_of(sid)
        return l.chapter(sid, cid) if l else None

    def pages(self, sid, cid):
        l = self.lib_of(sid)
        return l.pages(sid, cid) if l else None

    def page_bytes(self, sid, cid, index):
        l = self.lib_of(sid)
        return l.page_bytes(sid, cid, index) if l else (None, None)

    def stamp(self, sid, cid, n):
        l = self.lib_of(sid)
        return l.stamp(sid, cid, n) if l else None

    def cover_target(self, sid):
        l = self.lib_of(sid)
        return l.cover_target(sid) if l else None

    def cover(self, sid):
        l = self.lib_of(sid)
        return l.cover(sid) if l else (None, None)

    def text_of(self, c):
        p = c["path"]
        return epub_text(p) if p.suffix.lower() == ".epub" else decode_text(p.read_bytes())

    def text(self, sid, cid):
        l = self.lib_of(sid)
        return l.text(sid, cid) if l else None

    # ---- editing the list (each call scans only the shelf it touches) ----
    def specs(self):
        return [{"id": l.shelf_id, "name": l.name, "path": l.raw, "prefix": l.prefix} for l in self.libs]

    def upsert(self, spec):
        """Add the shelf, or replace the one with the same id (new folder / name), and scan it."""
        new = Library(spec["path"], spec["id"], spec["name"], spec.get("prefix", ""))
        new.scan()
        for i, l in enumerate(self.libs):
            if l.shelf_id == spec["id"]:
                self.libs[i] = new
                return new
        self.libs.append(new)
        return new

    def rename(self, shelf_id, name):
        self.get(shelf_id).name = name

    def remove(self, shelf_id):
        self.libs = [l for l in self.libs if l.shelf_id != shelf_id]

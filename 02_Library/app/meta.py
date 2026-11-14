"""Kệ Sách — Aurel's own notes on what he reads: a rating, tags and a private note per series, a private note per chapter.

Kept in data/meta.json, never written into the library folder. Like collections, an entry does not rely on the path: a series is
recognised by its folder name, a chapter by file name + size, so moving things on Drive keeps the notes. This app's own renames carry
the entry along (rename_series / rename_chapter, called from the same hooks as collections).
Tags have a kind - fandom, character, au (alternate universe), other - because the design (screens 42-43) sorts them that way.
"""
import json
import time
import uuid
from pathlib import Path

KINDS = ("fandom", "character", "au", "other")
MOODS = ("vui", "buon", "gian", "batngo", "yeu", "chan")   # glad, sad, angry, surprised, love, bored
MAX_COMMENT = 5000
MAX_NOTE = 20000


class Meta:
    def __init__(self, path):
        self.path = Path(path)

    def _load(self):
        try:
            d = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            d = {}
        d.setdefault("series", {})
        d.setdefault("chapters", {})
        d.setdefault("comments", {})   # target key (same keys as notes) -> [comment]
        return d

    def _save(self, d):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding="utf-8")
        tmp.replace(self.path)

    @staticmethod
    def skey(name):
        return "s:" + name.strip().lower()

    @staticmethod
    def ckey(name, size):
        return f"c:{name.strip().lower()}:{size}"

    # ---- series ----
    def get_series(self, title):
        e = self._load()["series"].get(self.skey(title), {})
        return {"rating": e.get("rating", 0), "note": e.get("note", ""), "tags": e.get("tags", [])}

    def set_series(self, title, body):
        d = self._load()
        k = self.skey(title)
        e = d["series"].setdefault(k, {"name": title})
        e["name"] = title
        if "rating" in body:
            r = body["rating"]
            if not isinstance(r, int) or not 0 <= r <= 5:
                raise ValueError("Đánh giá từ 0 đến 5 sao")
            e["rating"] = r
        if "note" in body:
            e["note"] = str(body["note"])[:MAX_NOTE]
        if "tags" in body:
            e["tags"] = self._clean_tags(body["tags"])
        e["updated"] = int(time.time())
        if not e.get("rating") and not e.get("note") and not e.get("tags"):
            del d["series"][k]   # nothing left worth keeping
        self._save(d)
        return self.get_series(title) if k in d["series"] else {"rating": 0, "note": "", "tags": []}

    @staticmethod
    def _clean_tags(tags):
        out, seen = [], set()
        for t in tags if isinstance(tags, list) else []:
            name = str((t or {}).get("name", "")).strip()[:60]
            kind = (t or {}).get("kind") if (t or {}).get("kind") in KINDS else "other"
            if name and (name.lower(), kind) not in seen:
                seen.add((name.lower(), kind))
                out.append({"name": name, "kind": kind})
        if len(out) > 60:
            raise ValueError("Tối đa 60 tag cho một bộ")
        return out

    def overview(self):
        """title(lower) -> {rating, tags}: what the library grid and filters need, in one read."""
        return {k[2:]: {"rating": v.get("rating", 0), "tags": v.get("tags", [])} for k, v in self._load()["series"].items()}

    def all_tags(self):
        """Every tag in use with how many series carry it, most used first."""
        count = {}
        for v in self._load()["series"].values():
            for t in v.get("tags", []):
                key = (t["name"], t["kind"])
                count[key] = count.get(key, 0) + 1
        return [{"name": n, "kind": k, "count": c} for (n, k), c in sorted(count.items(), key=lambda kv: (-kv[1], kv[0][0].lower()))]

    # ---- chapters ----
    def get_chapter(self, title, size):
        return {"note": self._load()["chapters"].get(self.ckey(title, size), {}).get("note", "")}

    def set_chapter(self, title, size, note):
        d = self._load()
        k = self.ckey(title, size)
        note = str(note)[:MAX_NOTE]
        if note.strip():
            d["chapters"][k] = {"name": title, "size": size, "note": note, "updated": int(time.time())}
        else:
            d["chapters"].pop(k, None)
        self._save(d)
        return {"note": note if note.strip() else ""}

    def chapter_notes(self):
        """(title lower, size) pairs that have a note: for the small marker on a chapter row."""
        return {(v["name"].lower(), v["size"]) for v in self._load()["chapters"].values()}

    # ---- follow this app's own renames ----
    def rename_series(self, old, new):
        d = self._load()
        ko, kn = self.skey(old), self.skey(new)
        if ko in d["series"] and kn not in d["series"]:
            e = d["series"].pop(ko)
            e["name"] = new
            d["series"][kn] = e
        if ko in d["comments"] and kn not in d["comments"]:
            d["comments"][kn] = d["comments"].pop(ko)
            for c in d["comments"][kn]:
                c["name"] = new
        self._save(d)

    def rename_chapter(self, m):
        d = self._load()
        ko, kn = self.ckey(m["old"], m["size"]), self.ckey(m["new"], m["size"])
        if ko in d["chapters"] and kn not in d["chapters"]:
            e = d["chapters"].pop(ko)
            e["name"] = m["new"]
            d["chapters"][kn] = e
        if ko in d["comments"] and kn not in d["comments"]:
            d["comments"][kn] = d["comments"].pop(ko)
            for c in d["comments"][kn]:
                c["name"] = m["new"]
        self._save(d)

    # ---- comments: a line of opinion over time, on a series, a chapter or a paragraph; may hide spoilers ----
    def _tkey(self, scope, name, size):
        return self.skey(name) if scope == "series" else self.ckey(name, size)

    def comments_for(self, scope, name, size=None):
        out = self._load()["comments"].get(self._tkey(scope, name, size), [])
        return sorted(out, key=lambda c: c["at"], reverse=True)

    def all_comments(self):
        out = []
        for lst in self._load()["comments"].values():
            out.extend(lst)
        return sorted(out, key=lambda c: c["at"], reverse=True)

    def add_comment(self, scope, name, size, text, mood="", spoiler=False, para=None):
        text = str(text or "").strip()
        if not text:
            raise ValueError("Bình luận trống")
        if mood and mood not in MOODS:
            raise ValueError("Tâm trạng không hợp lệ")
        if para is not None and (not isinstance(para, int) or para < 0):
            raise ValueError("Số đoạn không hợp lệ")
        d = self._load()
        c = {"id": uuid.uuid4().hex[:10], "scope": scope, "name": name, "size": size, "text": text[:MAX_COMMENT], "mood": mood or "",
             "spoiler": bool(spoiler), "para": para, "at": int(time.time())}
        d["comments"].setdefault(self._tkey(scope, name, size), []).append(c)
        self._save(d)
        return c

    def edit_comment(self, cid, body):
        d = self._load()
        for lst in d["comments"].values():
            for c in lst:
                if c["id"] == cid:
                    if "text" in body:
                        t = str(body["text"] or "").strip()
                        if not t:
                            raise ValueError("Bình luận trống")
                        c["text"] = t[:MAX_COMMENT]
                    if "mood" in body:
                        if body["mood"] and body["mood"] not in MOODS:
                            raise ValueError("Tâm trạng không hợp lệ")
                        c["mood"] = body["mood"] or ""
                    if "spoiler" in body:
                        c["spoiler"] = bool(body["spoiler"])
                    c["edited"] = int(time.time())
                    self._save(d)
                    return c
        raise LookupError("Không thấy bình luận này")

    def delete_comment(self, cid):
        d = self._load()
        for k, lst in list(d["comments"].items()):
            for c in lst:
                if c["id"] == cid:
                    lst.remove(c)
                    if not lst:
                        del d["comments"][k]
                    self._save(d)
                    return True
        raise LookupError("Không thấy bình luận này")

    # ---- searching what was written ----
    def search(self, q, norm=str.lower):
        """norm folds both sides (the search page passes the diacritics-free fold, so "ngay mua" finds "ngày mưa")."""
        q = norm(q.strip())
        if not q:
            return []
        d = self._load()
        hits = []
        for k, v in d["series"].items():
            tagtxt = " ".join(t["name"] for t in v.get("tags", []))
            if q in norm(v.get("note", "")) or q in norm(tagtxt):
                hits.append({"type": "series", "name": v["name"], "text": v.get("note", ""), "tags": v.get("tags", [])})
        for k, lst in d["comments"].items():
            for c in lst:
                if q in norm(c["text"]):
                    hits.append({"type": "comment", "id": c["id"], "scope": c["scope"], "name": c["name"], "size": c.get("size"), "text": c["text"], "spoiler": c["spoiler"], "mood": c["mood"]})
        for k, v in d["chapters"].items():
            if q in norm(v.get("note", "")):
                hits.append({"type": "chapter", "name": v["name"], "size": v["size"], "text": v["note"]})
        return hits

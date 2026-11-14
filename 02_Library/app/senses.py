"""Kệ Sách — "từ điển thay nghĩa": Aurel's own replacements for words the translation got wrong.

A rule says: in the saved translation, show "to" wherever "from" appears, within a scope - one paragraph, one chapter, a whole series, or every
story. Rules are applied when the translation is SHOWN (the file in data/translations/ is never rewritten), so deleting a rule or translating
the chapter again with another engine keeps working; the text on screen is plain text, so read-aloud highlighting is unaffected.
Order: a more specific scope wins (paragraph, chapter, series, all), then the longer "from", so a rule for a phrase is not spoiled by a rule
for one of its words. A rule may be switched off, may skip chapters (the preview lets you untick places where the original meaning was right),
and follows this app's own renames of series and chapters.
This replaces what the design (screens 54-57) wanted from the engine - candidate senses per word - which Tram Dich cannot give: here the
meaning is typed by the user.
"""
import json
import re
import time
import uuid
from pathlib import Path

SCOPES = ("para", "chapter", "series", "all")
RANK = {"para": 0, "chapter": 1, "series": 2, "all": 3}
MAX_RULES = 2000


def _pattern(r):
    body = re.escape(r["from"])
    if r.get("whole", True):
        body = rf"(?<![\w]){body}(?![\w])"   # whole word: not glued to letters or digits on either side
    return re.compile(body, re.IGNORECASE if r.get("nocase") else 0)


def apply_rules(lines, rules):
    """lines: translated paragraphs. rules: already ordered and already limited to this chapter. -> (new lines, {rule id: count})."""
    out, hits = list(lines), {}
    pats = [(r, _pattern(r)) for r in rules]
    for i, ln in enumerate(out):
        for r, pat in pats:
            if r["scope"] == "para" and r.get("para") != i:
                continue
            new, n = pat.subn(lambda _m, to=r["to"]: to, ln)
            if n:
                ln = new
                hits[r["id"]] = hits.get(r["id"], 0) + n
        out[i] = ln
    return out, hits


class Senses:
    def __init__(self, path):
        self.path = Path(path)

    def _load(self):
        try:
            d = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            d = {}
        d.setdefault("rules", [])
        return d

    def _save(self, d):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding="utf-8")
        tmp.replace(self.path)

    # ---- editing ----
    def add(self, body, series_title, chapter):
        """body: from, to, scope, whole, nocase, para. series_title / chapter = (title, size) of where the user is."""
        frm = str(body.get("from") or "").strip()
        if not frm:
            raise ValueError("Chưa có từ cần thay")
        if len(frm) > 120 or len(str(body.get("to") or "")) > 240:
            raise ValueError("Từ hoặc nghĩa mới quá dài")
        scope = body.get("scope")
        if scope not in SCOPES:
            raise ValueError("Phạm vi không hợp lệ")
        if str(body.get("to") or "") == frm:
            raise ValueError("Nghĩa mới giống từ cũ")
        r = {"id": uuid.uuid4().hex[:10], "from": frm, "to": str(body.get("to") or ""), "scope": scope, "enabled": True,
             "whole": bool(body.get("whole", True)), "nocase": bool(body.get("nocase", False)), "exclude": [], "created": int(time.time())}
        if scope in ("para", "chapter"):
            if not chapter:
                raise ValueError("Phạm vi này cần một chương")
            r["chapter"] = {"title": chapter[0], "size": chapter[1]}
        if scope in ("para", "chapter", "series"):
            if not series_title and scope == "series":
                raise ValueError("Phạm vi này cần một bộ")
            r["series"] = series_title
        if scope == "para":
            if not isinstance(body.get("para"), int) or body["para"] < 0:
                raise ValueError("Thiếu số đoạn")
            r["para"] = body["para"]
        if scope == "all" or scope == "series":
            r["exclude"] = [self._ckey(x["title"], x["size"]) for x in (body.get("exclude") or [])]
        d = self._load()
        if len(d["rules"]) >= MAX_RULES:
            raise ValueError("Quá nhiều quy tắc")
        if any(self._same(x, r) for x in d["rules"]):
            raise ValueError("Đã có quy tắc này")
        d["rules"].append(r)
        self._save(d)
        return r

    @staticmethod
    def _ckey(title, size):
        return f"{title.strip().lower()}|{size}"

    @staticmethod
    def _same(a, b):
        keys = ("from", "scope", "para", "whole", "nocase")
        return all(a.get(k) == b.get(k) for k in keys) and a.get("series") == b.get("series") and a.get("chapter") == b.get("chapter")

    def update(self, rid, body):
        d = self._load()
        for r in d["rules"]:
            if r["id"] == rid:
                if "to" in body:
                    r["to"] = str(body["to"] or "")[:240]
                    if r["to"] == r["from"]:
                        raise ValueError("Nghĩa mới giống từ cũ")
                for k in ("enabled", "whole", "nocase"):
                    if k in body:
                        r[k] = bool(body[k])
                self._save(d)
                return r
        raise LookupError("Không thấy quy tắc này")

    def delete(self, rid):
        d = self._load()
        n = len(d["rules"])
        d["rules"] = [r for r in d["rules"] if r["id"] != rid]
        if len(d["rules"]) == n:
            raise LookupError("Không thấy quy tắc này")
        self._save(d)
        return True

    # ---- using ----
    def all(self):
        return self._load()["rules"]

    def for_chapter(self, series_title, title, size, enabled_only=True):
        """Rules that reach this chapter, in the order they are applied."""
        ck = self._ckey(title, size)
        out = []
        for r in self._load()["rules"]:
            if enabled_only and not r["enabled"]:
                continue
            s = r["scope"]
            if s == "all" and ck not in r.get("exclude", []):
                out.append(r)
            elif s == "series" and (r.get("series") or "").lower() == (series_title or "").lower() and ck not in r.get("exclude", []):
                out.append(r)
            elif (s in ("chapter", "para") and self._ckey(r["chapter"]["title"], r["chapter"]["size"]) == ck
                  and (r.get("series") or "").lower() == (series_title or "").lower()):   # two series may each have a "Chuong 1" of the same size
                out.append(r)
        return sorted(out, key=lambda r: (RANK[r["scope"]], -len(r["from"]), r["created"]))

    # ---- follow this app's own renames ----
    def rename_series(self, old, new):
        d = self._load()
        n = 0
        for r in d["rules"]:
            if (r.get("series") or "").lower() == old.lower():
                r["series"] = new
                n += 1
        if n:
            self._save(d)

    def rename_chapter(self, m):
        d = self._load()
        n, ko, kn = 0, self._ckey(m["old"], m["size"]), self._ckey(m["new"], m["size"])
        for r in d["rules"]:
            c = r.get("chapter")
            if c and self._ckey(c["title"], c["size"]) == ko:
                r["chapter"] = {"title": m["new"], "size": m["size"]}
                n += 1
            if ko in r.get("exclude", []):
                r["exclude"] = [kn if x == ko else x for x in r["exclude"]]
                n += 1
        if n:
            self._save(d)

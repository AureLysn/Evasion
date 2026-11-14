"""Kệ Sách — collections ("bộ sưu tập"): Aurel's own groupings made while reading, kept in data/collections.json.

Unlike groups (which are Drive folders and follow Drive), a collection does NOT follow Drive: it is a saved list. An
item remembers a fingerprint (series: folder name; chapter: file name + size) plus the last known path, and is looked up
again in every scan, so moving a folder on Drive does not drop it. If it cannot be found it stays in the collection,
shown as "not found" with where it used to be. A collection may hold whole series and single chapters (one-shots).
"""
import json
import time
import uuid
from pathlib import Path


def _read(path):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {"collections": []}


class Collections:
    def __init__(self, path):
        self.path = Path(path)

    def _load(self):
        d = _read(self.path)
        d.setdefault("collections", [])
        return d

    def _save(self, d):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding="utf-8")
        tmp.replace(self.path)

    def _find(self, d, cid):
        return next((c for c in d["collections"] if c["id"] == cid), None)

    # ---- actions: one entry point, returns the new state of what changed ----
    def apply(self, lib, body):
        act = body.get("action")
        d = self._load()
        if act == "create":
            name = str(body.get("name") or "").strip()
            if not name:
                raise ValueError("Bộ sưu tập cần có tên")
            if any(c["name"].lower() == name.lower() for c in d["collections"]):
                raise ValueError(f"Đã có bộ sưu tập tên “{name}”")
            c = {"id": uuid.uuid4().hex[:10], "name": name, "created": int(time.time()), "items": []}
            d["collections"].append(c)
        else:
            c = self._find(d, body.get("collection"))
            if not c:
                raise LookupError("Không thấy bộ sưu tập này")
            if act == "rename":
                name = str(body.get("name") or "").strip()
                if not name:
                    raise ValueError("Bộ sưu tập cần có tên")
                if any(o is not c and o["name"].lower() == name.lower() for o in d["collections"]):
                    raise ValueError(f"Đã có bộ sưu tập tên “{name}”")
                c["name"] = name
            elif act == "delete":
                d["collections"].remove(c)
            elif act == "add":
                item = self._fingerprint(lib, body)
                if any(self._same(i, item) for i in c["items"]):
                    raise ValueError("Đã có trong bộ sưu tập này")
                c["items"].append(item)
            elif act == "remove":
                n = len(c["items"])
                c["items"] = [i for i in c["items"] if i["iid"] != body.get("item")]
                if len(c["items"]) == n:
                    raise LookupError("Không thấy mục này")
            else:
                raise ValueError("Việc không rõ")
        self._save(d)
        return {"id": c["id"], "name": c["name"], "count": len(c["items"])}

    @staticmethod
    def _same(a, b):
        if a["type"] != b["type"]:
            return False
        return (a["name"].lower(), a.get("size")) == (b["name"].lower(), b.get("size")) if a["type"] == "chapter" else a["name"].lower() == b["name"].lower()

    @staticmethod
    def _fingerprint(lib, body):
        sid = body.get("series")
        s = lib.series.get(sid)
        if not s:
            raise LookupError("Không thấy bộ này")
        if body.get("type") == "series":
            if s["loose"]:
                raise ValueError("Mục “Chương lẻ” không thêm cả mục được; thêm từng chương")
            return {"iid": uuid.uuid4().hex[:8], "type": "series", "name": s["title"], "where": s["key"], "kind": s["kind"],
                    "fandom": s["fandom"], "group": s["group"], "added": int(time.time())}
        c = lib.chapter(sid, body.get("chapter"))
        if not c:
            raise LookupError("Không thấy chương này")
        return {"iid": uuid.uuid4().hex[:8], "type": "chapter", "name": c["title"], "size": c["size"], "kind": c["kind"],
                "where": lib.relkey(c["path"]), "from": "" if s["loose"] else s["title"],
                "fandom": s["fandom"], "group": s["group"], "added": int(time.time())}

    def rename_series(self, old, new):
        """A series folder was renamed on Drive by this app: items holding the old name follow it (the only case where a
        collection item changes by itself; other Drive changes are found again by name or shown as not found)."""
        d = self._load()
        n = 0
        for col in d["collections"]:
            for i in col["items"]:
                if i["type"] == "series" and i["name"].lower() == old.lower():
                    i["name"] = new
                    if i.get("where"):
                        pre, rest = i["where"][:i["where"].find("|") + 1], i["where"][i["where"].find("|") + 1:]   # keep the shelf prefix, if any
                        i["where"] = pre + (str(Path(rest).parent.as_posix()) + "/" + new if "/" in rest else new)
                    n += 1
        if n:
            self._save(d)
        return n

    def rename_chapter(self, m):
        """A chapter was renamed by this app: chapter items with the old name and size take the new name and path (otherwise the
        fingerprint - name + size - would stop matching and the item would show as not found)."""
        d = self._load()
        n = 0
        for col in d["collections"]:
            for i in col["items"]:
                if i["type"] == "chapter" and i["name"].lower() == m["old"].lower() and i.get("size") == m["size"]:
                    i["name"] = m["new"]
                    i["where"] = m.get("prefix", "") + m["new_rel"]
                    n += 1
        if n:
            self._save(d)
        return n

    # ---- reading ----
    def list(self):
        return [{"id": c["id"], "name": c["name"], "count": len(c["items"])} for c in self._load()["collections"]]

    def get(self, lib, cid):
        c = self._find(self._load(), cid)
        if not c:
            return None
        return {"id": c["id"], "name": c["name"], "items": [self._resolve(lib, i) for i in c["items"]]}

    def where_is(self, lib, sid, chapter=None):
        """Names of the collections holding this series (or this chapter), for the "in: ..." chips."""
        out = []
        for c in self._load()["collections"]:
            for i in c["items"]:
                r = self._resolve(lib, i)
                if r["found"] and r["series"] == sid and (chapter is None) == (i["type"] == "series") and (chapter is None or r["chapter"] == chapter):
                    out.append({"id": c["id"], "name": c["name"]})
                    break
        return out

    @staticmethod
    def _resolve(lib, i):
        """`where` is stored with its shelf prefix (see Library.relkey) so two shelves can hold the same relative path; shown without it."""
        plain = lambda k: (k or "")[(k or "").find("|") + 1:]
        base = {k: i.get(k) for k in ("iid", "type", "name", "kind", "where", "from", "fandom", "group")}
        base["where"] = plain(base["where"])
        base["found"] = False
        if i["type"] == "series":
            cands = [s for s in lib.series.values() if not s["loose"] and s["title"].lower() == i["name"].lower()]
            cands.sort(key=lambda s: (s["key"] != i.get("where"), s["key"]))
            if cands:
                s = cands[0]
                base.update(found=True, series=s["id"], chapters=len(s["chapters"]), kind=s["kind"], where=s["rel"], moved=s["key"] != i.get("where"))
        else:
            hits = []
            for s in lib.series.values():
                for c in s["chapters"]:
                    if c["title"].lower() == i["name"].lower() and c["size"] == i.get("size"):
                        hits.append((s, c))
            hits.sort(key=lambda sc: (lib.relkey(sc[1]["path"]) != i.get("where"), sc[0]["key"]))
            if hits:
                s, c = hits[0]
                key = lib.relkey(c["path"])
                base.update(found=True, series=s["id"], chapter=c["id"], kind=c["kind"], where=plain(key), moved=key != i.get("where"),
                            **{"from": "" if s["loose"] else s["title"]})
        return base

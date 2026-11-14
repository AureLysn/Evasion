"""Kệ Sách — the ONLY code that writes inside the library folder (Drive). Off by default (settings: write = true to enable).

What it does, all inside ONE shelf's folder: move chapters (files or image folders) into a series folder, an existing one
or a new empty one; move a whole series or a whole group folder; merge one fandom folder into another; rename a chapter,
several chapters, a series, a group or a fandom; and undo one earlier apply from the log.
Never overwrites and never leaves the shelf's root. Nothing is copied. The one thing ever removed is an EMPTY folder this
module created itself, and only while undoing the apply that created it.

Every change is two steps: plan() checks everything and returns what WOULD happen (shown to the user), apply() runs exactly
that plan after the user confirmed, re-checking first because the folder may have changed in between. Each attempt is
appended to data/drive-log.jsonl. Chapter and folder ids come from the scan index, so a request cannot name an arbitrary path.
"""
import json
import os
import re
import secrets
import time
from pathlib import Path

PLAN_TTL = 300   # seconds a plan stays valid
MAX_BATCH = 500  # chapters per plan
BAD_CHARS = re.compile(r'[<>:"/\\|?*\x00-\x1f]')
RESERVED = {"con", "prn", "aux", "nul", *(f"com{i}" for i in range(1, 10)), *(f"lpt{i}" for i in range(1, 10))}


class WriteError(Exception):
    """A refusal with a reason the user can read."""


def _inside(root, p):
    try:
        p.resolve().relative_to(root)
        return True
    except (ValueError, OSError):
        return False


def clean_name(name):
    n = (name or "").strip()
    if not n:
        raise WriteError("Chưa đặt tên")
    if BAD_CHARS.search(n):
        raise WriteError('Tên không được có các ký tự < > : " / \\ | ? *')
    if n.endswith((".", " ")) or n.startswith("."):
        raise WriteError("Tên không được bắt đầu bằng dấu chấm hoặc kết thúc bằng dấu chấm / dấu cách")
    if n.split(".")[0].lower() in RESERVED:
        raise WriteError(f"“{n}” là tên dành riêng của Windows")
    if len(n) > 120:
        raise WriteError("Tên quá dài (tối đa 120 ký tự)")
    return n


class DriveWriter:
    def __init__(self, log_path, on_rename=None, on_rename_chapter=None):
        self.log_path = Path(log_path)
        self.plans = {}
        self.on_rename = on_rename   # called (old name, new name) after a series folder was renamed, so collections follow
        self.on_rename_chapter = on_rename_chapter   # called with a dict after a chapter file / folder was renamed: collections and reading position follow

    # ---- where a new series folder may go: fandom and group folders that already exist ----
    @staticmethod
    def parents(lib):
        out = {}
        for s in lib.series.values():
            p = s["path"] if s["loose"] else s["path"].parent
            if p == lib.root or not _inside(lib.root, p):
                continue
            parts = p.relative_to(lib.root).parts
            for k in {len(parts), 1}:   # the folder itself and its fandom folder
                if 1 <= k <= 2:
                    q = lib.root.joinpath(*parts[:k])
                    rel = q.relative_to(lib.root).as_posix()
                    out[rel] = {"rel": rel, "label": " / ".join(parts[:k]), "depth": k}
        return sorted(out.values(), key=lambda x: x["label"].lower())

    # ---- plan ----
    def plan_move(self, lib, sid, cid, dest_sid=None, new_parent=None, new_name=None):
        """cid is one chapter id or a list of them (all from series sid). Everything is checked before anything is planned:
        one bad chapter refuses the whole plan, so a batch is never half-prepared."""
        cids = list(dict.fromkeys([cid] if isinstance(cid, str) else (cid or [])))
        if not cids:
            raise WriteError("Chưa chọn chương nào")
        if len(cids) > MAX_BATCH:
            raise WriteError(f"Mỗi lần chuyển tối đa {MAX_BATCH} chương")
        src_series = lib.series.get(sid)
        chs = [lib.chapter(sid, c) for c in cids]
        if not src_series or any(c is None for c in chs):
            raise WriteError("Không thấy chương này (quét lại thư viện rồi thử lại)")
        steps, notes = [], []
        if dest_sid:
            ds = lib.series.get(dest_sid)
            if not ds or ds["loose"]:
                raise WriteError("Chọn một bộ truyện làm đích (không chọn mục “Chương lẻ”)")
            if dest_sid == sid:
                raise WriteError("Chương đã nằm trong bộ này")
            dest_dir = ds["path"]
            dest_title = ds["title"]
            kinds = {c["kind"] for c in chs}
            if ds["kind"] != "mixed" and kinds != {ds["kind"]}:
                notes.append(f"Bộ đích là {'truyện tranh' if ds['kind'] == 'comic' else 'truyện chữ'}, còn trong số chương chuyển có loại khác.")
        else:
            name = clean_name(new_name)
            parent = (lib.root / new_parent).resolve() if new_parent else None
            if not parent or not _inside(lib.root, parent) or parent == lib.root or not parent.is_dir():
                raise WriteError("Chọn thư mục fandom hoặc nhóm để tạo bộ mới")
            if len(parent.relative_to(lib.root).parts) > 2:
                raise WriteError("Bộ mới chỉ tạo trong thư mục fandom hoặc nhóm (không có tầng thứ ba)")
            dest_dir = parent / name
            dest_title = name
            if dest_dir.exists():
                raise WriteError(f"Đã có “{name}” ở đó. Chọn nó làm bộ đích thay vì tạo mới")
            steps.append({"kind": "mkdir", "to": dest_dir})
        if not _inside(lib.root, dest_dir):
            raise WriteError("Đường dẫn nằm ngoài thư mục thư viện")
        seen = set()
        for ch in chs:
            src = ch["path"]
            if not _inside(lib.root, src):
                raise WriteError("Đường dẫn nằm ngoài thư mục thư viện")
            if not src.exists():
                raise WriteError(f"“{src.name}” không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
            target = dest_dir / src.name
            if target.exists():
                raise WriteError(f"Bộ đích đã có “{src.name}”. Kệ Sách không ghi đè, hãy đổi tên một bên trên Drive (chưa chuyển gì)")
            if target.name.lower() in seen:
                raise WriteError(f"Hai chương cùng tên “{src.name}” sẽ trùng nhau ở bộ đích (chưa chuyển gì)")
            seen.add(target.name.lower())
            if src.is_dir() and (dest_dir == src or src in dest_dir.parents):
                raise WriteError("Không chuyển một thư mục vào chính nó")
            steps.append({"kind": "move", "from": src, "to": target})
        if len(cids) == len(src_series["chapters"]) and not src_series["loose"]:
            notes.append(f"“{src_series['title']}” chỉ còn thư mục trống sau khi chuyển (Kệ Sách không xoá thư mục).")
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": steps, "at": time.time(), "dest_series": dest_sid}
        self._expire()
        rel = lambda p: p.relative_to(lib.root).as_posix()
        first = chs[0]["path"]
        title = (first.stem if first.is_file() else first.name) if len(chs) == 1 else f"{len(chs)} chương"
        return {"token": token, "title": title, "count": len(chs), "dest": dest_title, "dest_rel": rel(dest_dir), "notes": notes,
                "steps": [{"kind": s["kind"], "from": rel(s["from"]) if "from" in s else None, "to": rel(s["to"])} for s in steps]}

    def plan_move_series(self, lib, sid, new_parent, new_group=None):
        """Move a whole series folder to another fandom / group folder, or into a NEW group folder made inside a fandom folder.
        One rename of the folder: everything inside goes with it, nothing is copied or deleted."""
        ser = lib.series.get(sid)
        if not ser or ser["loose"]:
            raise WriteError("Chọn một bộ truyện để chuyển (mục “Chương lẻ” không phải một bộ)")
        src = ser["path"]
        if not _inside(lib.root, src) or src == lib.root:
            raise WriteError("Đường dẫn nằm ngoài thư mục thư viện")
        if not src.is_dir():
            raise WriteError("Thư mục bộ không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
        parent = (lib.root / new_parent).resolve() if new_parent else None
        if not parent or not _inside(lib.root, parent) or parent == lib.root or not parent.is_dir():
            raise WriteError("Chọn thư mục fandom hoặc nhóm làm nơi đến")
        depth = len(parent.relative_to(lib.root).parts)
        if depth > 2:
            raise WriteError("Bộ chỉ nằm trong thư mục fandom hoặc nhóm (không có tầng thứ ba)")
        steps, notes = [], []
        dest_parent = parent
        if new_group:
            if depth != 1:
                raise WriteError("Nhóm mới chỉ tạo trong một thư mục fandom")
            dest_parent = parent / clean_name(new_group)
            if dest_parent.exists():
                raise WriteError(f"Đã có nhóm “{dest_parent.name}” ở đó. Chọn nó làm nơi đến thay vì tạo mới")
            steps.append({"kind": "mkdir", "to": dest_parent})
        if src.parent == dest_parent:
            raise WriteError("Bộ đã nằm ở đó rồi")
        if dest_parent == src or src in dest_parent.parents:
            raise WriteError("Không chuyển một thư mục vào chính nó")
        target = dest_parent / src.name
        if target.exists():
            raise WriteError(f"Nơi đến đã có “{src.name}”. Kệ Sách không ghi đè, hãy đổi tên một bên trên Drive")
        steps.append({"kind": "move", "from": src, "to": target})
        notes.append("Tiến độ đọc của bộ này về lại đầu (đường dẫn đổi). Bộ sưu tập vẫn tìm thấy bộ theo tên.")
        others = [x for x in lib.series.values() if x is not ser and (x["path"].parent == src.parent or x["path"] == src.parent)]
        if src.parent != lib.root and not others:
            notes.append(f"Thư mục “{src.parent.name}” sẽ không còn bộ hay chương nào (Kệ Sách không xoá thư mục).")
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": steps, "at": time.time(), "dest_series": None}
        self._expire()
        rel = lambda p: p.relative_to(lib.root).as_posix()
        return {"token": token, "mode": "series", "title": ser["title"], "count": len(ser["chapters"]), "dest": " / ".join(dest_parent.relative_to(lib.root).parts),
                "dest_rel": rel(target), "notes": notes,
                "steps": [{"kind": s["kind"], "from": rel(s["from"]) if "from" in s else None, "to": rel(s["to"])} for s in steps]}

    def plan_move_group(self, lib, target, new_parent=None, new_fandom=None):
        """Move a whole group folder ("Fandom/Group") into another fandom folder, or into a NEW fandom folder made at the root.
        One rename of the group folder: every series and loose chapter inside goes with it; nothing is copied or deleted."""
        src = (lib.root / (target or "")).resolve()
        parents = self.parents(lib)
        if not _inside(lib.root, src) or not any(p["rel"] == src.relative_to(lib.root).as_posix() and p["depth"] == 2 for p in parents):
            raise WriteError("Chọn một thư mục nhóm có sẵn để chuyển")
        if not src.is_dir():
            raise WriteError("Thư mục nhóm không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
        steps = []
        if new_fandom:
            dest_parent = lib.root / clean_name(new_fandom)
            if dest_parent.exists():
                raise WriteError(f"Đã có “{dest_parent.name}” ở thư mục gốc. Chọn nó làm fandom đích thay vì tạo mới")
            steps.append({"kind": "mkdir", "to": dest_parent})
        else:
            dest_parent = (lib.root / new_parent).resolve() if new_parent else None
            if not dest_parent or not _inside(lib.root, dest_parent) or not any(p["rel"] == dest_parent.relative_to(lib.root).as_posix() and p["depth"] == 1 for p in parents):
                raise WriteError("Chọn một thư mục fandom làm nơi đến")
        if src.parent == dest_parent:
            raise WriteError("Nhóm đã nằm trong fandom đó rồi")
        target_path = dest_parent / src.name
        if target_path.exists():
            raise WriteError(f"Fandom đích đã có nhóm “{src.name}”. Kệ Sách không ghi đè, hãy đổi tên một bên trước (Đổi tên nhóm)")
        steps.append({"kind": "move", "from": src, "to": target_path})
        inside = [x for x in lib.series.values() if x["path"] == src or src in x["path"].parents]
        notes = [f"Đường dẫn của {len(inside)} bộ đổi nên tiến độ đọc của chúng về lại đầu. Bộ sưu tập vẫn tìm thấy các bộ theo tên."]
        left = [x for x in lib.series.values() if x not in inside and (src.parent in x["path"].parents or x["path"].parent == src.parent or x["path"] == src.parent)]
        if not left:
            notes.append(f"Thư mục fandom “{src.parent.name}” sẽ không còn bộ hay chương nào (Kệ Sách không xoá thư mục).")
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": steps, "at": time.time(), "dest_series": None}
        self._expire()
        rel = lambda p: p.relative_to(lib.root).as_posix()
        return {"token": token, "mode": "group", "title": src.name, "count": len(inside), "dest": dest_parent.name, "dest_rel": rel(target_path), "notes": notes,
                "steps": [{"kind": st["kind"], "from": rel(st["from"]) if "from" in st else None, "to": rel(st["to"])} for st in steps]}

    def plan_merge_fandom(self, lib, target, dest_fandom):
        """Merge fandom A into fandom B: every group, series and loose chapter that sits directly in A moves into B (one rename each).
        Refused as a whole if any of them would collide with something already in B, so it is never half-prepared. A is left
        behind, empty of stories (the folder stays; anything this app does not recognise as a story also stays)."""
        parents = self.parents(lib)
        fan = lambda rel: next((p for p in parents if p["rel"] == rel and p["depth"] == 1), None)
        src = (lib.root / (target or "")).resolve()
        dst = (lib.root / (dest_fandom or "")).resolve()
        if not _inside(lib.root, src) or not fan(src.relative_to(lib.root).as_posix()):
            raise WriteError("Chọn một thư mục fandom có sẵn để gộp")
        if not _inside(lib.root, dst) or not fan(dst.relative_to(lib.root).as_posix()):
            raise WriteError("Chọn một thư mục fandom khác làm nơi gộp vào")
        if src == dst:
            raise WriteError("Không gộp một fandom vào chính nó")
        if not src.is_dir() or not dst.is_dir():
            raise WriteError("Thư mục fandom không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
        inside = [x for x in lib.series.values() if src in x["path"].parents or x["path"] == src]
        children = {}   # what sits directly in A and is a story: groups, series folders, loose chapter files
        for x in inside:
            if x["loose"] and x["path"] == src:
                for c in x["chapters"]:
                    children[c["path"]] = c["path"].name
            else:
                top = src / x["path"].relative_to(src).parts[0]
                children[top] = top.name
        if not children:
            raise WriteError("Fandom này không có gì để gộp")
        if len(children) > MAX_BATCH:
            raise WriteError(f"Fandom có quá nhiều mục ({len(children)}); tối đa {MAX_BATCH} mỗi lần")
        existing = {p.name.lower() for p in dst.iterdir()}
        clash = sorted(n for n in children.values() if n.lower() in existing)
        if clash:
            shown = ", ".join(f"“{n}”" for n in clash[:5]) + (f" và {len(clash) - 5} mục nữa" if len(clash) > 5 else "")
            raise WriteError(f"Fandom đích đã có {shown}. Kệ Sách không ghi đè, hãy đổi tên một bên trước (chưa chuyển gì)")
        steps = [{"kind": "move", "from": c, "to": dst / c.name} for c in sorted(children, key=lambda p: p.name.lower())]
        left = [p.name for p in src.iterdir() if p not in children]
        notes = [f"Đường dẫn của {len(inside)} bộ / mục đổi nên tiến độ đọc của chúng về lại đầu. Bộ sưu tập vẫn tìm thấy các bộ theo tên."]
        if left:
            notes.append(f"Fandom “{src.name}” vẫn còn {len(left)} thứ không phải truyện (giữ nguyên, không xoá): {', '.join(left[:4])}{'…' if len(left) > 4 else ''}.")
        notes.append(f"Thư mục “{src.name}” sẽ không còn truyện nào (Kệ Sách không xoá thư mục).")
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": steps, "at": time.time(), "dest_series": None}
        self._expire()
        rel = lambda p: p.relative_to(lib.root).as_posix()
        return {"token": token, "mode": "merge", "title": src.name, "count": len(inside), "moves": len(steps), "dest": dst.name, "dest_rel": rel(dst), "notes": notes,
                "steps": [{"kind": "move", "from": rel(st["from"]), "to": rel(st["to"])} for st in steps]}

    @staticmethod
    def _chapter_name(src, typed):
        """Name a chapter gets from what was typed: a file keeps its extension (a typed matching extension is dropped)."""
        typed = (typed or "").strip()
        if src.is_file():
            ext = src.suffix
            if ext and typed.lower().endswith(ext.lower()):
                typed = typed[: -len(ext)]
            return clean_name(typed) + ext
        return clean_name(typed)

    def plan_rename_chapters(self, lib, sid, items):
        """Rename several chapters of one series in ONE plan. items = [{"chapter": id, "new_name": "..."}]. The whole list is checked
        first and refused as a whole on the first problem (nothing renamed). A chapter whose name would not change is skipped.
        Refused: two new names that are the same, a new name that is another chapter's CURRENT name in the list (a chain such as
        1 -> 2, 2 -> 3 would need a temporary name; rename in two rounds instead), a name already used by something else."""
        ser = lib.series.get(sid)
        if not ser:
            raise WriteError("Không thấy bộ này (quét lại thư viện rồi thử lại)")
        if not items:
            raise WriteError("Chưa chọn chương nào")
        if len(items) > MAX_BATCH:
            raise WriteError(f"Mỗi lần đổi tên tối đa {MAX_BATCH} chương")
        rel = lambda p: p.relative_to(lib.root).as_posix()
        chosen, seen_ids = [], set()
        for it in items:
            cid = it.get("chapter")
            if cid in seen_ids:
                continue
            seen_ids.add(cid)
            ch = lib.chapter(sid, cid)
            if not ch:
                raise WriteError("Không thấy một trong các chương (quét lại thư viện rồi thử lại)")
            chosen.append((ch, it.get("new_name")))
        olds = {ch["path"].name.lower() for ch, _ in chosen}
        news, steps = {}, []
        for ch, typed in chosen:
            src = ch["path"]
            label = f"“{src.name}”"
            if src == ser["path"]:
                raise WriteError(f"{label} là thư mục của chính bộ (bộ một chương). Dùng “Đổi tên bộ”")
            if not src.exists() or not _inside(lib.root, src):
                raise WriteError(f"{label} không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
            try:
                name = self._chapter_name(src, typed)
            except WriteError as e:
                raise WriteError(f"{label}: {e}")
            if name == src.name:
                continue   # unchanged: not part of the plan
            key = name.lower()
            if key in news:
                raise WriteError(f"Hai chương cùng được đặt tên “{name}” ({news[key]} và {label}). Chưa đổi gì")
            news[key] = label
            dest = src.parent / name
            case_only = key == src.name.lower()
            if not case_only and key in olds:
                raise WriteError(f"{label} sẽ đổi thành “{name}”, trùng tên hiện tại của một chương khác trong lô. Cần tên tạm nên Kệ Sách không làm trong một lần: đổi tên làm hai lượt. Chưa đổi gì")
            if dest.exists() and not (case_only and os.path.samefile(dest, src)):
                raise WriteError(f"{label} sẽ đổi thành “{name}” nhưng đã có “{name}” ở cùng chỗ. Kệ Sách không ghi đè. Chưa đổi gì")
            steps.append({"kind": "move", "from": src, "to": dest, "rename_chapter": {
                "sid": sid, "old": ch["title"], "new": dest.stem if src.is_file() else dest.name, "size": ch["size"], "old_rel": rel(src), "new_rel": rel(dest)}})
        if not steps:
            raise WriteError("Không có tên nào thay đổi, nên không có gì để đổi")
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": steps, "at": time.time(), "dest_series": None}
        self._expire()
        notes = ["Vị trí đọc và các bộ sưu tập chứa các chương này đi theo tên mới.", "Đuôi file được giữ nguyên."]
        skipped = len(chosen) - len(steps)
        if skipped:
            notes.append(f"{skipped} chương giữ nguyên tên nên không có trong kế hoạch.")
        return {"token": token, "mode": "rename", "batch": True, "what": "chương", "title": f"{len(steps)} chương", "count": len(steps), "dest": "tên mới", "dest_rel": rel(ser["path"]),
                "notes": notes, "steps": [{"kind": "move", "from": rel(st["from"]), "to": rel(st["to"])} for st in steps]}

    def plan_rename_chapter(self, lib, sid, cid, new_name):
        """Rename one chapter: a file keeps its extension (you type the name only; a typed extension that matches is dropped),
        an image folder is renamed as a folder. Same parent, new name only. The folder of a one-chapter series is the
        series itself - that one is renamed with "Doi ten bo"."""
        ser, ch = lib.series.get(sid), lib.chapter(sid, cid)
        if not ser or not ch:
            raise WriteError("Không thấy chương này (quét lại thư viện rồi thử lại)")
        src = ch["path"]
        if src == ser["path"]:
            raise WriteError("Đây là thư mục của chính bộ (bộ một chương). Dùng “Đổi tên bộ”")
        if not src.exists() or not _inside(lib.root, src):
            raise WriteError("Chương không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
        name = self._chapter_name(src, new_name)
        if name == src.name:
            raise WriteError("Tên mới giống tên cũ")
        dest = src.parent / name
        if dest.exists() and not (name.lower() == src.name.lower() and os.path.samefile(dest, src)):
            raise WriteError(f"Đã có “{name}” ở cùng chỗ. Kệ Sách không ghi đè, hãy chọn tên khác")
        rel = lambda p: p.relative_to(lib.root).as_posix()
        old_title = ch["title"]
        new_title = dest.stem if src.is_file() else dest.name
        step = {"kind": "move", "from": src, "to": dest,
                "rename_chapter": {"sid": sid, "old": old_title, "new": new_title, "size": ch["size"], "old_rel": rel(src), "new_rel": rel(dest)}}
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": [step], "at": time.time(), "dest_series": None}
        self._expire()
        notes = ["Vị trí đọc và các bộ sưu tập chứa chương này đi theo tên mới."]
        if src.is_file():
            notes.append(f"Đuôi file “{src.suffix}” được giữ nguyên.")
        return {"token": token, "mode": "rename", "what": "chương", "title": old_title, "count": 1, "dest": new_title, "dest_rel": rel(dest), "notes": notes,
                "steps": [{"kind": "move", "from": rel(src), "to": rel(dest)}]}

    def plan_rename(self, lib, kind, target, new_name):
        """Rename a series folder (target = series id), a group folder (target = "Fandom/Group") or a fandom folder (target = "Fandom"). Same parent, new name only:
        nothing moves, nothing is copied. A case-only change is allowed (Windows treats the names as equal)."""
        name = clean_name(new_name)
        meta = None
        if kind == "series":
            ser = lib.series.get(target)
            if not ser or ser["loose"]:
                raise WriteError("Chọn một bộ truyện để đổi tên")
            src = ser["path"]
            label, count = ser["title"], len(ser["chapters"])
            meta = [src.name, name]
            affected = 1
        elif kind == "group":
            src = (lib.root / (target or "")).resolve()
            if not _inside(lib.root, src) or not any(p["rel"] == src.relative_to(lib.root).as_posix() and p["depth"] == 2 for p in self.parents(lib)):
                raise WriteError("Chọn một thư mục nhóm có sẵn để đổi tên")
            label = src.name
            inside = [x for x in lib.series.values() if x["path"] == src or src in x["path"].parents]
            affected = len(inside)
            count = sum(len(x["chapters"]) for x in inside)
        elif kind == "fandom":
            src = (lib.root / (target or "")).resolve()
            if not _inside(lib.root, src) or not any(p["rel"] == src.relative_to(lib.root).as_posix() and p["depth"] == 1 for p in self.parents(lib)):
                raise WriteError("Chọn một thư mục fandom có sẵn để đổi tên")
            label = src.name
            inside = [x for x in lib.series.values() if src in x["path"].parents or x["path"] == src]
            affected = len(inside)
            count = sum(len(x["chapters"]) for x in inside)
        else:
            raise WriteError("Chỉ đổi tên được bộ, nhóm hoặc fandom")
        if not src.exists() or not _inside(lib.root, src) or src == lib.root:
            raise WriteError("Thư mục không còn ở chỗ cũ (Drive đã đổi? quét lại rồi thử lại)")
        if name == src.name:
            raise WriteError("Tên mới giống tên cũ")
        dest = src.parent / name
        if dest.exists() and not (name.lower() == src.name.lower() and os.path.samefile(dest, src)):
            raise WriteError(f"Đã có “{name}” ở cùng chỗ. Kệ Sách không ghi đè, hãy chọn tên khác")
        notes = []
        if kind == "series":
            notes.append("Tiến độ đọc của bộ này về lại đầu (đường dẫn đổi). Bộ sưu tập chứa bộ này được đổi tên theo.")
        elif kind == "fandom":
            notes.append(f"Đường dẫn của {affected} bộ trong fandom này đổi theo nên tiến độ đọc của chúng về lại đầu. Bộ sưu tập vẫn tìm thấy các bộ theo tên.")
        else:
            notes.append(f"Đường dẫn của {affected} bộ đổi theo nên tiến độ đọc của chúng về lại đầu. Bộ sưu tập vẫn tìm thấy các bộ theo tên.")
        step = {"kind": "move", "from": src, "to": dest}
        if meta:
            step["rename"] = meta
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": [step], "at": time.time(), "dest_series": None}
        self._expire()
        rel = lambda p: p.relative_to(lib.root).as_posix()
        return {"token": token, "mode": "rename", "what": {"series": "bộ", "group": "nhóm", "fandom": "fandom"}[kind], "title": label, "count": count, "dest": name, "dest_rel": rel(dest),
                "notes": notes, "steps": [{"kind": "move", "from": rel(src), "to": rel(dest)}]}

    def _expire(self):
        now = time.time()
        for k in [k for k, v in self.plans.items() if now - v["at"] > PLAN_TTL]:
            del self.plans[k]

    # ---- undo: take back one earlier apply (a "batch" in the log) ----
    def batches(self, n=200):
        """The log grouped by apply, newest first. A batch is undoable when it has steps that worked, was not undone yet, and is
        not from before batches existed (older log lines have no batch id and are never undone automatically)."""
        recs = self._records()
        undone = {r["undo_of"] for r in recs if r.get("op") == "undo-done" and r.get("ok")}
        order, by = [], {}
        for r in recs:
            b = r.get("batch")
            if not b or r.get("undo_of"):
                continue
            if b not in by:
                by[b] = {"batch": b, "t": r["t"], "shelf": r.get("shelf", ""), "steps": []}   # "" = written before shelves existed (the shelf with no prefix)
                order.append(b)
            by[b]["steps"].append({k: r.get(k) for k in ("op", "from", "to", "ok", "error")})
        out = []
        for b in reversed(order[-n:]):
            x = by[b]
            ok_steps = [st for st in x["steps"] if st["ok"]]
            x["partial"] = len(ok_steps) != len(x["steps"])
            x["undone"] = b in undone
            x["undoable"] = bool(ok_steps) and not x["undone"]
            out.append(x)
        return out

    def plan_undo(self, lib, batch):
        recs = [r for r in self._records() if r.get("batch") == batch and not r.get("undo_of")]
        if not recs:
            raise WriteError("Không thấy lần ghi này trong nhật ký (hoặc nó có từ trước khi có hoàn tác)")
        if any(r.get("op") == "undo-done" and r.get("undo_of") == batch for r in self._records()):
            raise WriteError("Lần này đã được hoàn tác rồi")
        if any((r.get("shelf") or ("" if lib.prefix else lib.shelf_id)) != lib.shelf_id for r in recs):   # a record without a shelf is from before shelves: it belongs to the unprefixed one. Paths in the log are relative to one shelf's folder
            raise WriteError("Lần ghi này thuộc về một kệ khác (hoặc kệ đó đã được gỡ), không hoàn tác ở đây được")
        done = [r for r in recs if r["ok"]]
        if not done:
            raise WriteError("Lần ghi này không làm được bước nào nên không có gì để hoàn tác")
        steps, notes = [], []
        rel = lambda p: p.relative_to(lib.root).as_posix()
        for r in reversed(done):   # last thing done is first thing taken back
            to = lib.root / r["to"]   # not resolve(): it would fix the letter case on Windows and a case-only rename could not be undone
            if not _inside(lib.root, to):
                raise WriteError("Đường dẫn trong nhật ký nằm ngoài thư mục thư viện")
            if r["op"] == "mkdir":
                if to.exists():
                    steps.append({"kind": "rmdir", "to": to})
                continue
            back = lib.root / r["from"]
            if not _inside(lib.root, back):
                raise WriteError("Đường dẫn trong nhật ký nằm ngoài thư mục thư viện")
            if not to.exists() and back.exists():
                notes.append(f"“{back.name}” đã ở chỗ cũ rồi, bỏ qua.")
                continue
            if not to.exists():
                raise WriteError(f"Không thấy “{r['to']}” nữa (đã bị đổi tên hoặc xoá sau đó?), không hoàn tác được")
            case_only = to.parent == back.parent and to.name.lower() == back.name.lower() and back.exists() and os.path.samefile(to, back)
            if back.exists() and not case_only:
                raise WriteError(f"Chỗ cũ đã có “{r['from']}”. Kệ Sách không ghi đè, hãy dọn một bên trên Drive")
            if not back.parent.is_dir():
                raise WriteError(f"Thư mục cũ “{rel(back.parent)}” không còn, không đưa về được")
            step = {"kind": "move", "from": to, "to": back}
            if r.get("rename"):
                step["rename"] = [r["rename"][1], r["rename"][0]]
            if r.get("rename_chapter"):
                m = r["rename_chapter"]
                step["rename_chapter"] = {**m, "old": m["new"], "new": m["old"], "old_rel": m["new_rel"], "new_rel": m["old_rel"]}
            steps.append(step)
        if not steps:
            raise WriteError("Không còn gì để hoàn tác (mọi thứ đã ở chỗ cũ)")
        if any(st["kind"] == "rmdir" for st in steps):
            notes.append("Thư mục mới tạo sẽ được xoá nếu sau khi đưa file về nó trống. Nếu còn gì khác trong đó, giữ nguyên. Đây là lần duy nhất Kệ Sách xoá một thứ, và chỉ là thư mục trống do chính nó tạo.")
        token = secrets.token_hex(8)
        self.plans[token] = {"steps": steps, "at": time.time(), "undo_of": batch, "dest_series": None}
        self._expire()
        moved = sum(1 for st in steps if st["kind"] == "move")
        return {"token": token, "mode": "undo", "title": f"{moved} mục" if moved else "thư mục mới", "count": moved, "dest": "chỗ cũ", "dest_rel": "", "notes": notes,
                "steps": [{"kind": st["kind"], "from": rel(st["from"]) if "from" in st else None, "to": rel(st["to"])} for st in steps]}

    # ---- apply ----
    def apply(self, lib, token):
        self._expire()
        plan = self.plans.pop(token, None)
        if not plan:
            raise WriteError("Kế hoạch đã hết hạn hoặc đã chạy rồi. Làm lại từ đầu")
        batch = plan.get("undo_of") and "u" + secrets.token_hex(3) or secrets.token_hex(4)
        undo_of = plan.get("undo_of")
        done = []
        try:
            for st in plan["steps"]:
                if not _inside(lib.root, st["to"]) or ("from" in st and not _inside(lib.root, st["from"])):
                    raise WriteError("Đường dẫn nằm ngoài thư mục thư viện")
                extra = {}
                if st["kind"] == "mkdir":
                    if st["to"].exists():
                        raise WriteError("Thư mục đích vừa xuất hiện, dừng lại")
                    st["to"].mkdir()
                elif st["kind"] == "rmdir":
                    if not st["to"].exists():
                        extra["note"] = "đã không còn"
                    elif any(st["to"].iterdir()):
                        extra["note"] = "còn file khác trong đó, giữ nguyên"   # never delete anything that is not empty
                    else:
                        st["to"].rmdir()
                else:
                    if not st["from"].exists():
                        raise WriteError("File hoặc thư mục không còn ở chỗ cũ")
                    same = (st["from"].parent == st["to"].parent and st["from"].name.lower() == st["to"].name.lower()
                            and st["to"].exists() and os.path.samefile(st["from"], st["to"]))   # a case-only rename "exists" on Windows
                    if st["to"].exists() and not same:
                        raise WriteError("Nơi đến vừa có file trùng tên, dừng lại")
                    st["from"].rename(st["to"])
                    if st.get("rename") and self.on_rename:
                        try:
                            self.on_rename(*st["rename"])
                        except Exception:   # noqa: BLE001 — a collection hiccup must not undo a finished rename
                            pass
                    if st.get("rename"):
                        extra["rename"] = st["rename"]
                    if st.get("rename_chapter"):
                        if self.on_rename_chapter:
                            try:
                                self.on_rename_chapter({**st["rename_chapter"], "prefix": lib.prefix})   # the shelf prefix, for stores that key by path
                            except Exception:   # noqa: BLE001 — never undo a finished rename over a bookkeeping hiccup
                                pass
                        extra["rename_chapter"] = st["rename_chapter"]
                done.append(st)
                self._log(lib, st, True, batch=batch, undo_of=undo_of, **extra)
        except Exception as e:   # noqa: BLE001 — log what was done, then tell the user
            self._log(lib, plan["steps"][len(done)], False, str(e), batch=batch, undo_of=undo_of)
            raise WriteError(f"Dừng giữa chừng: {e}" + (f" (đã làm xong {len(done)}/{len(plan['steps'])} bước, các bước còn lại chưa chạy; xem nhật ký)" if done else ""))
        if undo_of:
            self._append({"t": time.strftime("%Y-%m-%d %H:%M:%S"), "op": "undo-done", "undo_of": undo_of, "batch": batch, "ok": True})
        lib.scan()
        return {"done": len(done), "batch": batch}

    def _append(self, rec):
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        with self.log_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")

    def _log(self, lib, st, ok, error="", batch=None, undo_of=None, **extra):
        rel = lambda p: p.relative_to(lib.root).as_posix()
        rec = {"t": time.strftime("%Y-%m-%d %H:%M:%S"), "op": ("undo-" if undo_of else "") + st["kind"],
               "from": rel(st["from"]) if "from" in st else None, "to": rel(st["to"]), "ok": ok, "batch": batch, "shelf": lib.shelf_id}
        if undo_of:
            rec["undo_of"] = undo_of
        if error:
            rec["error"] = error
        rec.update(extra)
        self._append(rec)

    def _records(self):
        try:
            lines = self.log_path.read_text(encoding="utf-8").splitlines()
        except OSError:
            return []
        out = []
        for ln in lines:
            try:
                out.append(json.loads(ln))
            except ValueError:
                pass
        return out

    def log(self, n=40):
        return list(reversed(self._records()[-n:]))

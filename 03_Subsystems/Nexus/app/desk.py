"""The writing desk: Aurel's own version of a chapter, kept apart from the source and the translation.

Three things live here:
  - which vault notes sit around a chapter (its plan, the arc outlines) — read only;
  - the ONE place this app writes into the vault: a new note `<chapter>-aurel-viet-lai.md` next to
    the chapter note, on Aurel's click. It never replaces a note it did not write itself, and it
    never touches the chapter note. Everything else about the vault stays read-only (`vault.py`);
  - running the vault's own style tools over the text being edited. Nothing leaves the machine.
"""
import json
import os
import re
import subprocess
import sys
import time
import uuid

from . import importers, vault

SUFFIX = "-aurel-viet-lai"
OWN_NOTE = re.compile(re.escape(SUFFIX) + r"(-\d+)?\.md$", re.I)   # file names `aurel_target` gives out
MARK = "Tram Dich"                      # in `source.ref` of every note written here; only those may be rewritten
PLAN_HINTS = ("plan", "ke-hoach", "dan-y")
RETIRED = ("superseded", "archived")
MAX_NOTE = 2 * 1024 * 1024
CHECKS = (
    ("Số đo văn phong", "style_metrics.py", lambda f: [f]),
    ("Dấu AI", "ai_tells_check.py", lambda f: ["--chapter", f]),
)


def project_code(folder):
    """`CLS_crossover-va-lenh-su` -> `CLS`. The vault's own rule lives in `vaultlib.project_code`."""
    return folder.split("_", 1)[0]


# ---------- notes around a chapter (read only) ----------

def around(vault_root, project, chapter_rel):
    """The chapter folder's other notes, its scene cards, then the project's `arcs/` — what Aurel writes against."""
    notes = []

    def add(path, group):
        try:
            meta = vault.note_meta(path)
        except OSError:
            meta = {}
        notes.append({"rel": vault.rel_of(vault_root, path), "name": path.stem, "group": group,
                      "title": meta.get("title", ""), "status": meta.get("status", "")})

    stem = ""
    if chapter_rel:
        me = vault.resolve_rel(vault_root, chapter_rel)
        stem = re.sub(r"-chapter$", "", me.stem)
        for p in sorted(me.parent.glob("*.md"), key=lambda x: importers.natural_key(x.name)):
            if p != me and not p.name.startswith("_"):
                add(p, "chapter")
        for folder in sorted(d for d in me.parent.iterdir() if d.is_dir() and d.name.startswith("scenes")):
            for p in sorted(folder.glob("*.md"), key=lambda x: importers.natural_key(x.name)):
                add(p, "scene")
    for sub in ARC_DIRS:
        arcs = vault.resolve_rel(vault_root, f"{project}/{sub}")
        if not arcs.is_dir():
            continue
        for p in sorted(arcs.glob("*.md"), key=lambda x: importers.natural_key(x.name)):
            if not p.name.startswith("_"):
                add(p, "arc")
        break

    plans = [n for n in notes if n["group"] == "chapter" and any(h in n["name"] for h in PLAN_HINTS)]
    own = [n for n in plans if stem and n["name"].startswith(stem)]
    live_arcs = [n for n in notes if n["group"] == "arc" and n["status"] not in RETIRED]
    first = (own or plans or live_arcs or notes or [None])[0]
    return {"notes": notes, "default": first["rel"] if first else None}


# Project layout since the 2026-11 rebuild; the bare names are the layout before it.
ARC_DIRS = ("03_Development/arcs", "arcs")
ENTITY_DIRS = (("02_Story_Bible/characters", "character"), ("02_Story_Bible/locations", "location"),
               ("02_Story_Bible/organizations", "organization"),
               ("Characters", "character"), ("locations", "location"), ("organizations", "organization"))
TOOL_DIRS = ("01_Origine/04_Tools/VaultTool",)


def entities(vault_root, project):
    """Characters, places and organisations of a project, with the names they go by in the prose.

    The names are the note's heading plus its `aliases:` — minus the trailing project code the vault
    adds to make an alias unique (`Saber PPCT` -> `Saber`). Read only; `secrets/` is not looked at.
    """
    code = project_code(project)
    out = []
    for folder, kind in ENTITY_DIRS:
        base = vault.resolve_rel(vault_root, f"{project}/{folder}")
        if not base.is_dir():
            continue
        for p in sorted(base.rglob("*.md"), key=lambda x: importers.natural_key(x.name)):
            if p.name.startswith("_"):
                continue
            try:
                fm, body = importers.split_frontmatter(importers.decode_bytes(p.read_bytes()))
            except OSError:
                continue
            if fm.get("status") in RETIRED:
                continue
            m = re.search(r"^#\s+(.+)$", body, re.M)
            title = re.sub(r"[*_`]", "", m.group(1)).strip() if m else p.stem
            raw = fm.get("aliases") if isinstance(fm.get("aliases"), str) else ""
            try:
                aliases = [a for a in json.loads(raw) if isinstance(a, str)]
            except ValueError:
                aliases = re.findall(r'"([^"]+)"', raw)
            terms = []
            for t in [re.split(r"\s+[—–-]\s+", title)[0], *aliases]:
                t = re.sub(r"\s+" + re.escape(code) + r"$", "", t).strip()
                if len(t) >= 2 and t not in terms:
                    terms.append(t)
            out.append({"rel": vault.rel_of(vault_root, p), "kind": kind, "name": title, "terms": terms})
    return out


def read_note(vault_root, rel):
    path = vault.resolve_rel(vault_root, rel)
    if not path.is_file() or not path.name.lower().endswith(vault.LISTED):
        raise FileNotFoundError("Không phải note .md / .txt")
    if path.stat().st_size > MAX_NOTE:
        raise FileNotFoundError("Note quá lớn để xem ở đây")
    fm, body = importers.split_frontmatter(importers.decode_bytes(path.read_bytes()))
    meta = {k: fm[k] for k in ("title", "status", "type", "canon_layer", "last_updated") if isinstance(fm.get(k), str)}
    return {"rel": rel, "name": path.stem, "meta": meta, "body": body.strip()}


# ---------- Aurel's version as a file ----------

SCENE_MARK = re.compile(r"〔§[^〕]*〕")   # a scene divider the board put in: scaffolding, not prose


def prose(content):
    """The text without scene dividers — what gets counted, measured and written out."""
    return "\n".join(l for l in content.split("\n") if l.strip() and not SCENE_MARK.fullmatch(l.strip()))


def markdown_of(title, content):
    return f"# {title}\n\n" + "\n\n".join(prose(content).split("\n")) + "\n"


def scenes(vault_root, chapter_rel):
    """Scene cards beside a chapter note: heading, POV, word target, what the scene is for."""
    me = vault.resolve_rel(vault_root, chapter_rel)
    out = []
    for folder in sorted(d for d in me.parent.iterdir() if d.is_dir() and d.name.startswith("scenes")):
        for p in sorted(folder.glob("*.md"), key=lambda x: importers.natural_key(x.name)):
            if p.name.startswith("_"):
                continue
            fm, body = importers.split_frontmatter(importers.decode_bytes(p.read_bytes()))
            if fm.get("status") in RETIRED:
                continue
            m = re.search(r"^#\s+(.+)$", body, re.M)
            title = re.sub(r"[*_`]", "", m.group(1)).strip() if m else p.stem

            def section(*names):
                for name in names:
                    s = re.search(r"^##\s+" + name + r"[^\n]*\n(.*?)(?=^##\s|\Z)", body, re.M | re.S)
                    if s and s.group(1).strip():
                        return importers.md_to_text(s.group(1)).replace("\n", " ")[:420]
                return ""

            target = fm.get("target_words") if isinstance(fm.get("target_words"), str) else ""
            out.append({
                "rel": vault.rel_of(vault_root, p), "name": p.stem, "title": title,
                "short": re.split(r"\s+·\s+", title)[0],
                "pov": fm.get("pov", "").rsplit(".", 1)[-1] if isinstance(fm.get("pov"), str) else "",
                "target": int(target) if target.isdigit() else 0,
                "status": fm.get("status", "") if isinstance(fm.get("status"), str) else "",
                "purpose": section("Mục đích cảnh", "Muc dich canh"),
                "ending": section("Kết cảnh", "Ket canh"),
            })
    return out


def written_here(path):
    """True if this app wrote the note — the only kind of vault note it may write over."""
    try:
        fm, _ = importers.split_frontmatter(vault.read_head(path))
    except OSError:
        return False
    source = fm.get("source")
    return isinstance(source, dict) and MARK in str(source.get("ref", ""))


def aurel_target(note_path):
    """`ch01-chapter.md` -> `ch01-aurel-viet-lai.md`; a name taken by someone else's note gets `-2`, `-3`…"""
    base = re.sub(r"-chapter$", "", note_path.stem)
    base = re.sub(re.escape(SUFFIX) + r"(-\d+)?$", "", base)
    n = 1
    while True:
        target = note_path.with_name(base + SUFFIX + ("" if n == 1 else f"-{n}") + ".md")
        if not target.exists() or written_here(target):
            return target
        n += 1


def aurel_note(note_path, target, code, title, content, base_label):
    """A vault note for Aurel's version: the chapter note's own frontmatter, re-pointed at Aurel."""
    fm, _ = importers.split_frontmatter(importers.decode_bytes(note_path.read_bytes()))

    def keep(key, fallback=""):
        v = fm.get(key)
        return v if isinstance(v, str) and v else fallback

    quote = lambda s: json.dumps(s, ensure_ascii=False)
    src_id = keep("id", f"chapter.{code}.{note_path.stem}")
    day = time.strftime("%Y-%m-%d")
    lines = ["---", f"id: {src_id.rsplit('.', 1)[0]}.{target.stem}", f"type: {keep('type', 'chapter')}",
             "scope: project", "lane: personal", f"project: {code}"]
    for key in ("arc", "chapter", "canon_layer", "pov"):
        if keep(key):
            lines.append(f"{key}: {keep(key)}")
    lines += [
        f"title: {quote(title)}",
        "status: draft",
        f"aliases: [{quote(f'{target.stem} {code}')}, {quote(f'ban Aurel viet lai {note_path.stem} {code}')}]",
        f"related: [{quote(f'[[{note_path.stem}]]')}]",
        "source:",
        "  type: user_input",
        f"  ref: {quote(f'{MARK} — Aurel sua tren {base_label} cua {note_path.name}, luu {day}.')}",
        "authority: user",
        "confidence: 0.9",
        f"tags: {keep('tags', '[d/fanfic, k/deliverable, p/personal]')}",
        f"last_updated: {day}",
        "---", "", "",
    ]
    return "\n".join(lines) + markdown_of(title, content)


def write_new_or_own(target, text, overwrite):
    """Create `target`, or rewrite it when this app wrote it and Aurel said so. Returns False if it must ask."""
    if target.exists():
        if not written_here(target):
            raise PermissionError(f"{target.name} không phải file Trạm Dịch ghi ra — không ghi đè")
        if not overwrite:
            return False
    target.parent.mkdir(parents=True, exist_ok=True)
    with open(target, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return True


# ---------- the vault's style tools ----------

def find_tool(vault_root, script):
    """The vault keeps its tools in group folders (`Reporting/`, `Validation/`, ...) under VaultTool."""
    for base in TOOL_DIRS:
        d = vault_root / base
        for path in (d / script, *sorted(d.glob(f"*/{script}"))):
            if path.is_file():
                return path
    return None


def run_checks(vault_root, code, title, content, tmp_dir):
    tmp_dir.mkdir(parents=True, exist_ok=True)
    tmp = tmp_dir / f"desk-{uuid.uuid4().hex}.md"
    tmp.write_text(markdown_of(title, content), encoding="utf-8", newline="\n")
    out = []
    try:
        for label, script, args in CHECKS:
            path = find_tool(vault_root, script)
            if path is None:
                out.append({"tool": label, "exit": None, "output": f"Không thấy {script} trong {TOOL_DIRS[0]}"})
                continue
            try:
                r = subprocess.run(
                    [sys.executable, str(path), *args(str(tmp)), "--project", code, "--root", str(vault_root)],
                    capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=120,
                    env={**os.environ, "PYTHONIOENCODING": "utf-8"})
                text = "\n".join(s.strip() for s in (r.stdout, r.stderr) if s.strip())
                out.append({"tool": label, "exit": r.returncode, "output": text.replace(str(tmp), "<bản đang sửa>").replace(tmp.name, "<bản đang sửa>")})
            except subprocess.TimeoutExpired:
                out.append({"tool": label, "exit": None, "output": "Quá 120 giây — đã dừng"})
    finally:
        tmp.unlink(missing_ok=True)
    return out

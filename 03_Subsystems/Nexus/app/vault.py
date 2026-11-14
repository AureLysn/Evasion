"""Read-only access to AureLysn Vault fiction projects.

Nothing in this module opens a vault file for writing. The vault's `sources/` are
immutable and its chapters go through gates; the app copies text into its own
library and never writes back.

One exception, and it lives in `desk.py`, not here: on Aurel's click the writing desk
creates a NEW note `<chapter>-aurel-viet-lai.md` beside a chapter note (Aurel, 2026-10-05).
No existing vault note is ever written over, except a note that same button wrote.
"""
import re
from pathlib import Path, PurePosixPath

from . import db, importers

# Every story project sits in Studio/Continue; Studio/Original holds only the skeleton (2026-11-13).
FICTION_PROJECTS = PurePosixPath("05_Evasion/01_Oeuvre/Studio/Continue")
STORES_NOTES = ("01_Origine/03_Systems/Config/stores.md",)
LISTED = (".md", ".txt")
HEAD_BYTES = 6000


def is_vault_root(p):
    return p is not None and (p / "AGENTS.md").is_file() and (p / "01_Origine").is_dir()


def inside_any_vault(path):
    """True if `path` sits inside a vault-shaped tree — the live vault or its Drive mirror."""
    p = Path(path).resolve()
    return any(is_vault_root(q) for q in (p, *p.parents))


def find_root(settings):
    """Explicit setting wins; otherwise the vault this app sits in (`05_Evasion/03_Subsystems/Nexus`).

    No walking up from the current directory: CLAUDE.md measured that a walk-up can land
    on a stale mirror and return it without a word.
    """
    configured = (settings.get("vault_root") or "").strip()
    if configured:
        p = Path(configured)
        return (p, None) if is_vault_root(p) else (None, f"'{configured}' không phải gốc vault (thiếu AGENTS.md hoặc 01_Origine/)")
    if db.TEST_INSTANCE:
        # The guess below is the REAL vault; a test instance would read it and its "save to
        # vault" button would write into it (vault L70).
        return None, "Bản thử (TRAMDICH_DATA) không tự đoán vault — khai vault_root (worktree hoặc vault giả) trong Cài đặt."
    for guess in (db.ROOT.parents[2],):   # the vault this app sits in
        if is_vault_root(guess):
            return guess.resolve(), None
    return None, "Không tự tìm thấy vault. Khai đường dẫn trong Cài đặt."


def projects_root(vault):
    return vault / FICTION_PROJECTS


def resolve_rel(vault, rel):
    base = projects_root(vault).resolve()
    target = (base / (rel or "")).resolve()
    if target != base and base not in target.parents:
        raise PermissionError(f"Đường dẫn nằm ngoài {FICTION_PROJECTS}")
    return target


def rel_of(vault, path):
    return Path(path).resolve().relative_to(projects_root(vault).resolve()).as_posix()


def read_head(path):
    with open(path, "rb") as f:
        return importers.decode_bytes(f.read(HEAD_BYTES))


def note_meta(path):
    fm, _ = importers.split_frontmatter(read_head(path))
    keep = ("type", "status", "language", "chapter", "canon_layer", "immutable", "title")
    meta = {k: fm[k] for k in keep if isinstance(fm.get(k), str)}
    asset = fm.get("asset") if isinstance(fm.get("asset"), dict) else None
    if asset and asset.get("store") and asset.get("path_rel"):
        meta["asset"] = {k: asset.get(k, "") for k in ("store", "path_rel", "format", "bytes")}
    return meta


def list_dir(vault, rel):
    target = resolve_rel(vault, rel)
    if not target.is_dir():
        raise FileNotFoundError("Không phải thư mục")
    entries = []
    for p in target.iterdir():
        name = p.name
        if name.startswith(".") or (not rel and name.startswith(("_", "["))):
            continue  # hidden files, and the skeleton project (`[CODE] Project_Name`, `_TEMPLATE`) at the top level
        if p.is_dir():
            entries.append({"name": name, "rel": rel_of(vault, p), "is_dir": True})
        elif name.lower().endswith(LISTED):
            e = {"name": name, "rel": rel_of(vault, p), "is_dir": False, "size": p.stat().st_size}
            if name.lower().endswith(".md"):
                try:
                    e["meta"] = note_meta(p)
                except OSError:
                    e["meta"] = {}
            entries.append(e)
    entries.sort(key=lambda e: (not e["is_dir"], importers.natural_key(e["name"])))
    parts = PurePosixPath(rel).parts if rel else ()
    return {"rel": rel or "", "parent": "/".join(parts[:-1]) if parts else None,
            "project": parts[0] if parts else None, "entries": entries}


# ---------- external stores ----------

def store_path(vault, store_id):
    """Resolve a store id through the vault's `stores.md` — the one file allowed to hold absolute paths."""
    stores = next((vault / s for s in STORES_NOTES if (vault / s).is_file()), None)
    if stores is None:
        return None
    rx = re.compile(r"^" + re.escape(store_id) + r":\s+(.+?)\s*(?:#.*)?$")
    for line in stores.read_text(encoding="utf-8", errors="replace").splitlines():
        m = rx.match(line.strip())
        if m and re.match(r"^([A-Za-z]:\\|\\\\)", m.group(1)):   # skip the relative "Drive stage" block
            return Path(m.group(1))
    return None


def asset_file(vault, rel):
    note = resolve_rel(vault, rel)
    meta = note_meta(note)
    asset = meta.get("asset")
    if not asset:
        raise FileNotFoundError("Note này không khai asset (store + path_rel)")
    root = store_path(vault, asset["store"])
    if root is None:
        raise FileNotFoundError(f"stores.md không khai store '{asset['store']}'")
    path = root / Path(*PurePosixPath(asset["path_rel"]).parts)
    return path, asset

"""Read .zip (stdlib) and .rar (external UnRAR/7z) into [(name, bytes)].

RAR has no standard-library reader and the project takes no third-party packages,
so .rar goes through whatever extractor the machine already has — WinRAR ships
UnRAR.exe, 7-Zip ships 7z.exe. Missing tool = a named error, not a silent skip.
"""
import io
import os
import posixpath
import re
import shutil
import subprocess
import tempfile
import zipfile
from pathlib import Path

ARCHIVE_EXT = (".zip", ".rar")
MAX_ENTRIES = 20000

# Checked in order. WinRAR and 7-Zip do not put themselves on PATH on Windows.
RAR_CANDIDATES = (
    r"C:\Program Files\WinRAR\UnRAR.exe",
    r"C:\Program Files\WinRAR\Rar.exe",
    r"C:\Program Files (x86)\WinRAR\UnRAR.exe",
    r"C:\Program Files\7-Zip\7z.exe",
    r"C:\Program Files (x86)\7-Zip\7z.exe",
)


class ArchiveError(Exception):
    pass


def is_archive(filename):
    return filename.lower().endswith(ARCHIVE_EXT)


def is_rar(filename):
    return filename.lower().endswith(".rar")


def _kind(exe):
    return "7z" if re.search(r"7z(a|r)?\.exe$|(^|[\/])7z(a|r)?$", exe, re.I) else "unrar"


def find_rar_tool(configured=""):
    """(path, kind) of an extractor that can read .rar, or (None, '')."""
    for cand in (configured, *RAR_CANDIDATES):
        if cand and Path(cand).is_file():
            return cand, _kind(cand)
    for name in ("unrar", "7z", "7za", "rar"):
        found = shutil.which(name)
        if found:
            return found, _kind(found)
    return None, ""


def rar_status(configured=""):
    path, kind = find_rar_tool(configured)
    return {"ok": bool(path), "path": path or "", "tool": kind}


# ---------- zip ----------

def zip_entry_name(info):
    """Zip stores names in cp437 unless the utf-8 flag is set; CJK zips rarely set it."""
    if info.flag_bits & 0x800:
        return info.filename
    raw = info.filename.encode("cp437", "replace")
    for enc in ("utf-8", "gb18030", "big5"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return info.filename


def _read_zip(data):
    try:
        z = zipfile.ZipFile(io.BytesIO(data))
    except zipfile.BadZipFile as e:
        raise ArchiveError(f"File zip hỏng hoặc không phải zip: {e}")
    out = []
    for info in z.infolist():
        if info.is_dir():
            continue
        name = zip_entry_name(info).replace("\\", "/")
        if "__MACOSX" in name:
            continue
        try:
            out.append((name, z.read(info)))
        except (RuntimeError, zipfile.BadZipFile) as e:
            raise ArchiveError(f"Không giải nén được “{name}”: {e}. Zip đặt mật khẩu thì phải giải nén tay trước.")
        if len(out) > MAX_ENTRIES:
            raise ArchiveError(f"Archive có quá {MAX_ENTRIES} file")
    return out


# ---------- rar ----------

def _rar_command(exe, kind, src, dest):
    if kind == "7z":
        return [exe, "x", "-y", "-p-", f"-o{dest}", str(src)]
    # -p- : never prompt for a password · -inul : no banner/progress on stdout
    return [exe, "x", "-y", "-p-", "-inul", str(src), str(dest) + os.sep]


def _read_rar(data, filename, tool_path=""):
    exe, kind = find_rar_tool(tool_path)
    if not exe:
        raise ArchiveError(
            "Máy chưa có công cụ đọc .rar. Cài WinRAR hoặc 7-Zip, hoặc khai đường dẫn "
            "UnRAR.exe / 7z.exe trong Cài đặt → Đọc file .rar."
        )
    with tempfile.TemporaryDirectory(prefix="tramdich-rar-") as tmp:
        tmp = Path(tmp)
        src = tmp / "in.rar"
        dest = tmp / "out"
        dest.mkdir()
        src.write_bytes(data)
        try:
            p = subprocess.run(_rar_command(exe, kind, src, dest), capture_output=True, timeout=600)
        except subprocess.TimeoutExpired:
            raise ArchiveError("Giải nén .rar quá 10 phút, đã dừng")
        except OSError as e:
            raise ArchiveError(f"Không chạy được {exe}: {e}")
        if p.returncode != 0:
            msg = (p.stderr or p.stdout or b"").decode("utf-8", "replace").strip().splitlines()
            tail = msg[-1] if msg else f"mã lỗi {p.returncode}"
            raise ArchiveError(f"{Path(exe).name} không giải nén được {filename}: {tail}")
        out = []
        for path in sorted(dest.rglob("*")):
            if not path.is_file():
                continue
            out.append((path.relative_to(dest).as_posix(), path.read_bytes()))
            if len(out) > MAX_ENTRIES:
                raise ArchiveError(f"Archive có quá {MAX_ENTRIES} file")
        if not out:
            raise ArchiveError(f"{filename} giải nén ra rỗng")
        return out


# ---------- entry point ----------

def read_archive(data, filename, rar_tool=""):
    """[(posix name, bytes)] for every file in the archive, directories dropped."""
    if is_rar(filename):
        return _read_rar(data, filename, rar_tool)
    if filename.lower().endswith(".zip"):
        return _read_zip(data)
    raise ArchiveError("Chỉ đọc được .zip và .rar")


def basename(name):
    return posixpath.basename(name)

"""Offline zh->vi by longest-match dictionary lookup (the QuickTranslate / VietPhrase method).

Priority per position: book/global names > Name dict > VietPhrase dict > HanViet (single char).
Output is convert-grade, not literary — same as the local mode of the userscript.
"""
import json
import re
import threading

from . import db

KINDS = ("name", "vp", "hv")
FILES = {k: db.DICTS / f"{k}.json" for k in KINDS}

PUNCT = {
    "，": ",", "。": ".", "：": ":", "；": ";", "！": "!", "？": "?", "、": ",",
    "（": "(", "）": ")", "【": "[", "】": "]", "《": "«", "》": "»", "〈": "‹", "〉": "›",
    "「": "“", "」": "”", "『": "‘", "』": "’", "…": "…", "—": "—", "～": "~", "·": "·",
}
NO_SPACE_BEFORE = set(",.:;!?)]»›”’…%")
NO_SPACE_AFTER = set("([«‹“‘")

_lock = threading.Lock()
_dicts = {}
_maxlen = {}


def _is_cjk(ch):
    o = ord(ch)
    return 0x4E00 <= o <= 0x9FFF or 0x3400 <= o <= 0x4DBF or 0xF900 <= o <= 0xFAFF or 0x20000 <= o <= 0x2FFFF


def _pick(v, split_options=False):
    """One meaning per entry.

    JSON values come as a plain string, a list of alternatives, or — in the
    Novel-Downloader5 dictionaries, measured 2026-09-15 — {"val": ..., "alts": [...]}.
    Only QuickTranslate text lines use `/` or `|` between alternatives; a JSON value
    like "AC/DC" is one meaning and must not be cut.
    """
    if isinstance(v, dict):
        alts = v.get("alts")
        v = v.get("val") or (alts[0] if isinstance(alts, list) and alts else "")
    elif isinstance(v, list):
        v = v[0] if v else ""
    v = str(v or "").strip()
    if split_options:
        v = v.split("/")[0].split("|")[0].strip()
    return v


def parse_dict(raw_bytes):
    """Accept a JSON object, a JSON list of pairs, or QuickTranslate `zh=vi1/vi2` lines."""
    text = raw_bytes.decode("utf-8-sig", "replace")
    out = {}
    stripped = text.lstrip()
    if stripped[:1] in "{[":
        try:
            data = json.loads(text)
            if isinstance(data, dict) and isinstance(data.get("data"), (dict, list)):
                data = data["data"]
            items = data.items() if isinstance(data, dict) else data
            for item in items:
                if isinstance(item, (list, tuple)) and len(item) >= 2:
                    k, v = item[0], item[1]
                elif isinstance(item, dict):
                    k, v = item.get("zh") or item.get("key"), item.get("vi") or item.get("value")
                else:
                    continue
                v = _pick(v)
                if k and v:
                    out[str(k)] = v
            return out
        except ValueError:
            pass
    for line in text.splitlines():
        if "=" not in line:
            continue
        k, v = line.split("=", 1)
        k, v = k.strip(), _pick(v, split_options=True)
        if k and v:
            out[k] = v
    return out


def save_dict(kind, raw_bytes):
    parsed = parse_dict(raw_bytes)
    if not parsed:
        raise ValueError("Không đọc được mục nào trong file từ điển")
    FILES[kind].parent.mkdir(parents=True, exist_ok=True)
    FILES[kind].write_text(json.dumps(parsed, ensure_ascii=False), encoding="utf-8")
    with _lock:
        _dicts.pop(kind, None)
    return len(parsed)


def status():
    out = {}
    for k in KINDS:
        p = FILES[k]
        out[k] = {"present": p.exists(), "bytes": p.stat().st_size if p.exists() else 0,
                  "loaded": k in _dicts, "entries": len(_dicts[k]) if k in _dicts else None}
    return out


def _load(kind):
    with _lock:
        if kind not in _dicts:
            p = FILES[kind]
            # save_dict already resolved every entry to one plain meaning
            d = json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
            _dicts[kind] = {k: v for k, v in d.items() if isinstance(v, str) and v}
            _maxlen[kind] = max((len(k) for k in _dicts[kind]), default=0)
        return _dicts[kind], _maxlen[kind]


def ready():
    return FILES["vp"].exists() or FILES["hv"].exists()


def translate_lines(lines, names=None):
    if not ready():
        raise RuntimeError("Chưa có từ điển local. Vào Cài đặt → Từ điển để tải hoặc nạp file.")
    layers = []
    if names:
        layers.append((names, max((len(k) for k in names), default=0), True))
    for kind, is_name in (("name", True), ("vp", False)):
        d, m = _load(kind)
        if d:
            layers.append((d, min(m, 16), is_name))
    hv, _ = _load("hv")
    return [_translate_line(line, layers, hv) for line in lines]


def _translate_line(line, layers, hv):
    tokens = []  # (text, is_word)
    i, n = 0, len(line)
    while i < n:
        ch = line[i]
        if not _is_cjk(ch):
            j = i
            while j < n and not _is_cjk(line[j]):
                j += 1
            tokens.append(("".join(PUNCT.get(c, c) for c in line[i:j]), False))
            i = j
            continue
        # longest match across layers; on a tie the earlier layer (names) wins
        best = None
        for d, maxlen, _is_name in layers:
            for L in range(min(maxlen, n - i), 0, -1):
                if line[i:i + L] in d:
                    if best is None or L > best[1]:
                        best = (d[line[i:i + L]], L)
                    break
        if best and best[0]:
            tokens.append((best[0], True))
            i += best[1]
        else:
            tokens.append((hv.get(ch) or ch, True))
            i += 1
    return _join(tokens)


def _join(tokens):
    out = " ".join(t for t, _ in tokens if t and t.strip())
    out = " ".join(out.split())
    for p in NO_SPACE_BEFORE:
        out = out.replace(" " + p, p)
    for p in NO_SPACE_AFTER:
        out = out.replace(p + " ", p)
    out = re.sub(r"([,.:;!?])(?=[^\s\d.,:;!?”’)\]»›…])", r"\1 ", out)
    return _capitalize(out)


def _capitalize(s):
    chars = list(s)
    cap = True
    for idx, c in enumerate(chars):
        if cap and c.isalpha():
            chars[idx] = c.upper()
            cap = False
        elif c in ".!?“":
            cap = True
    return "".join(chars)

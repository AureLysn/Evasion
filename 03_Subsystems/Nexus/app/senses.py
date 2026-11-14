"""Đổi nghĩa — Aurel's own replacements for words the translation got wrong, set while reading.

Same behaviour as the "từ điển thay nghĩa" of Kệ Sách (KeSach/app/senses.py), kept in this app's own database:
a rule says "show `to` wherever `frm` appears", within a scope — one paragraph, one chapter, one book, every book.
Rules are applied when the translation is SHOWN (reader, export); chapters.content_vi is never rewritten, so
deleting a rule undoes it and translating the chapter again with another engine keeps the rule working.
A rule never adds or removes a line, so source / translation alignment holds.
Order: a more specific scope wins (paragraph, chapter, book, all), then the longer `frm`, so a rule for a
phrase is not spoiled by a rule for one of its words.
"""
import json
import re
import time

from . import db

SCOPES = ("para", "chapter", "book", "all")
RANK = {s: i for i, s in enumerate(SCOPES)}
MAX_RULES = 2000
MAX_PREVIEW = 300   # chapters listed in one preview; the count line still covers all of them


def _pattern(r):
    body = re.escape(r["frm"])
    if r["whole"]:
        body = rf"(?<![\w]){body}(?![\w])"   # not glued to a letter or digit on either side
    return re.compile(body, re.IGNORECASE if r["nocase"] else 0)


def apply_rules(lines, rules):
    """lines: translated paragraphs. rules: ordered, already limited to this chapter. -> (new lines, {rule id: count})."""
    out, hits = list(lines), {}
    pats = [(r, _pattern(r)) for r in rules]
    for i, ln in enumerate(out):
        for r, pat in pats:
            if r["scope"] == "para" and r["para"] != i:
                continue
            new, n = pat.subn(lambda _m, to=r["to"]: to, ln)
            if n:
                ln = new
                hits[r["id"]] = hits.get(r["id"], 0) + n
        out[i] = ln
    return out, hits


def _row(r):
    d = dict(r)
    d["to"] = d.pop("to_text")
    d["whole"], d["nocase"], d["enabled"] = bool(d["whole"]), bool(d["nocase"]), bool(d["enabled"])
    d["exclude"] = json.loads(d["exclude"] or "[]")
    return d


def rules_for(conn, book_id, chapter_id):
    """Enabled rules that reach this chapter, in the order they are applied."""
    out = []
    for r in conn.execute("SELECT * FROM senses WHERE enabled = 1 AND (scope = 'all' OR book_id = ?)", (book_id,)):
        r = _row(r)
        if r["scope"] in ("para", "chapter") and r["chapter_id"] != chapter_id:
            continue
        if chapter_id in r["exclude"]:
            continue
        out.append(r)
    return sorted(out, key=lambda r: (RANK[r["scope"]], -len(r["frm"]), r["created"]))


def shown(conn, book_id, chapter_id, content_vi):
    """-> (lines to show, [what each rule did]). Cheap when there is no rule at all."""
    lines = content_vi.split("\n") if content_vi else []
    rules = rules_for(conn, book_id, chapter_id)
    if not lines or not rules:
        return lines, []
    out, hits = apply_rules(lines, rules)
    return out, [{"id": r["id"], "frm": r["frm"], "to": r["to"], "scope": r["scope"], "count": hits[r["id"]]}
                 for r in rules if r["id"] in hits]


def _clean(body):
    """The fields of a rule from a request, or ValueError with a message for the dialog."""
    frm = str(body.get("frm") or "").strip()
    to = str(body.get("to") or "").replace("\r", " ").replace("\n", " ").strip()
    if not frm:
        raise ValueError("Chưa có từ cần đổi")
    if len(frm) > 120 or len(to) > 240:
        raise ValueError("Từ hoặc nghĩa mới quá dài")
    if to == frm:
        raise ValueError("Nghĩa mới giống từ cũ")
    scope = body.get("scope")
    if scope not in SCOPES:
        raise ValueError("Phạm vi không hợp lệ")
    return {"frm": frm, "to": to, "scope": scope, "whole": bool(body.get("whole", True)), "nocase": bool(body.get("nocase", False))}


def preview(conn, body, chapter, book):
    """Where a new rule would change something. chapter / book = the rows the dialog was opened from.
    -> {"count", "chapters", "rows": [one per chapter, capped]}; nothing is written."""
    f = _clean(body)
    para = body.get("para")
    if f["scope"] == "para" and (not isinstance(para, int) or para < 0):
        raise ValueError("Thiếu số đoạn")
    r = {"id": 0, "para": para, **f}
    sql, args = "SELECT c.id, c.title, c.title_vi, c.content_vi, b.id AS book_id, b.title AS bt, b.title_vi AS bv FROM chapters c JOIN books b ON b.id = c.book_id WHERE c.content_vi != ''", []
    if f["scope"] in ("para", "chapter"):
        sql, args = sql + " AND c.id = ?", [chapter["id"]]
    elif f["scope"] == "book":
        sql, args = sql + " AND c.book_id = ?", [book["id"]]
    total, chapters, rows = 0, 0, []
    for c in conn.execute(sql + " ORDER BY b.title, c.idx", args):
        lines = c["content_vi"].split("\n")
        out, n = apply_rules(lines, [r])
        if not n:
            continue
        total, chapters = total + n[0], chapters + 1
        if len(rows) < MAX_PREVIEW:
            first = next(i for i, (a, z) in enumerate(zip(lines, out)) if a != z)
            rows.append({"chapter_id": c["id"], "book": c["bv"] or c["bt"], "title": c["title_vi"] or c["title"], "count": n[0],
                         "before": lines[first][:200], "after": out[first][:200]})
    return {"count": total, "chapters": chapters, "rows": rows}


def add(conn, body, chapter, book):
    f = _clean(body)
    r = {**f, "book_id": None, "chapter_id": None, "para": None, "exclude": []}
    if f["scope"] in ("para", "chapter"):
        r["chapter_id"] = chapter["id"]
    if f["scope"] in ("para", "chapter", "book"):
        r["book_id"] = book["id"]
    if f["scope"] == "para":
        if not isinstance(body.get("para"), int) or body["para"] < 0:
            raise ValueError("Thiếu số đoạn")
        r["para"] = body["para"]
    if f["scope"] in ("book", "all"):
        r["exclude"] = [int(x) for x in (body.get("exclude") or []) if str(x).lstrip("-").isdigit()]
    if conn.execute("SELECT COUNT(*) FROM senses").fetchone()[0] >= MAX_RULES:
        raise ValueError("Quá nhiều quy tắc")
    dup = conn.execute(
        "SELECT 1 FROM senses WHERE frm = ? AND scope = ? AND whole = ? AND nocase = ? AND book_id IS ? AND chapter_id IS ? AND para IS ?",
        (r["frm"], r["scope"], r["whole"], r["nocase"], r["book_id"], r["chapter_id"], r["para"])).fetchone()
    if dup:
        raise ValueError("Đã có quy tắc này")
    cur = conn.execute(
        "INSERT INTO senses(frm, to_text, scope, book_id, chapter_id, para, whole, nocase, exclude, created) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (r["frm"], r["to"], r["scope"], r["book_id"], r["chapter_id"], r["para"], r["whole"], r["nocase"], json.dumps(r["exclude"]), db.now()))
    conn.commit()
    return cur.lastrowid


def delete(conn, rule_id):
    cur = conn.execute("DELETE FROM senses WHERE id = ?", (rule_id,))
    conn.commit()
    return cur.rowcount > 0

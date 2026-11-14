'use strict';

/* ================= bàn viết =================
   Aurel's own version of a chapter, next to the text it is checked against and the vault's plan notes.
   The version lives in its own table (`edits`): the chapter's source and translation are never written.
   Loaded before app.js; it only uses app.js helpers ($, api, esc, modal, store…) when called. */

const deskState = { base: 'src', ref: 'src', exists: false, snapshot: '', map: [], timer: null, saver: null, startWords: 0, snip: new Map(),
  ents: [], nameOf: new Map(), nameRx: null, scan: null, words: new Set(), autoShort: true, shortRows: [], auto: { global: new Map(), off: new Set(), on: new Set() } };
const DESK_AUTOSAVE_MS = 2500;
const DESK_MARK = /〔(?!§)[^〕\n]*〕/g;   // a beat dropped in from the plan, still to be written
const DESK_SCENE = /^〔§\s*([^〕\n]*)〕\s*$/;   // a scene divider put in by the board; kept while writing, left out of files

const deskParas = (t) => String(t || '').split('\n').map((l) => l.trim()).filter(Boolean);
const deskWords = (t) => (String(t).match(/\S+/g) || []).length;
const deskRefText = (ch, which) => (which === 'vi' ? ch.content_vi : ch.content_src);

/* Paragraph-level LCS. keepA / keepB: paragraphs both versions still share.
   map[i]: the line of `b` where reference paragraph i sits — or, once rewritten, most likely sits. */
function deskDiff(a, b) {
  const n = a.length, m = b.length, w = m + 1;
  const t = new Uint16Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      t[i * w + j] = a[i] === b[j] ? t[(i + 1) * w + j + 1] + 1 : Math.max(t[(i + 1) * w + j], t[i * w + j + 1]);
    }
  }
  const keepA = new Array(n).fill(false), keepB = new Array(m).fill(false), map = new Array(n).fill(-1);
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { keepA[i] = keepB[j] = true; map[i] = j; i++; j++; }
    else if (t[(i + 1) * w + j] >= t[i * w + j + 1]) i++;
    else j++;
  }
  let last = -1, lastI = -1;
  for (let k = 0; k < n; k++) {
    if (map[k] >= 0) { last = map[k]; lastI = k; }
    else map[k] = Math.max(0, Math.min(m - 1, last + (k - lastI)));
  }
  return { keepA, keepB, map };
}

/* Just enough markdown to read a plan note: headings, bullets, quotes, table rows, bold. */
function mdLite(md) {
  const inline = (s) => esc(s)
    .replace(/!?\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2').replace(/!?\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const plain = (s) => esc(s.replace(/!?\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2').replace(/!?\[\[([^\]]+)\]\]/g, '$1').replace(/\*\*|`/g, '').trim());
  const out = [];
  for (const raw of String(md || '').split('\n')) {
    const line = raw.trimEnd();
    const t = line.trim();
    if (!t || /^(-{3,}|\*{3,}|_{3,})$/.test(t)) continue;
    if (/^\|?[\s:\-|]+\|?$/.test(t) && t.includes('-')) continue;   // table separator row
    const h = /^(#{1,6})\s+(.*)$/.exec(t);
    const li = /^(\s*)(?:[-*+]|\d+\.)\s+(.*)$/.exec(line);
    if (h) out.push(`<h${Math.min(6, h[1].length + 2)}>${inline(h[2])}</h${Math.min(6, h[1].length + 2)}>`);
    else if (t.startsWith('|')) out.push(`<p class="row">${t.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim())).filter(Boolean).join(' <span class="sep">·</span> ')}</p>`);
    else if (li) out.push(`<p class="li" data-ins="${plain(li[2])}" style="margin-left:${10 + Math.min(4, Math.floor(li[1].length / 2)) * 14}px">• ${inline(li[2])}</p>`);
    else if (t.startsWith('>')) out.push(`<p class="q">${inline(t.replace(/^(>\s?)+/, ''))}</p>`);
    else out.push(`<p data-ins="${plain(t)}">${inline(t)}</p>`);
  }
  return out.join('') || '<p class="muted">(Note trống)</p>';
}

/* ---------- marks in the text being written: names from the vault, repeats, long sentences ----------
   The textarea stays a textarea (so Unikey and undo behave); a backdrop behind it carries the same
   text with the marks, and scrolls with it. */

const DESK_STOP = new Set(('và là của có không một những các được trong cho với này đó thì mà cũng đã đang sẽ như khi lúc để ra vào lên xuống đi lại'
  + ' nói người ta hắn nó cô anh ông bà họ tôi mình cậu gì nào ấy kia rồi nữa chỉ còn vẫn rất quá hơn nhưng nếu vì nên bị bởi từ đến tới'
  + ' trên dưới sau trước giữa ở về theo cái con chiếc việc điều chuyện thế vậy sao hay hoặc phải biết thấy nhìn nghe làm muốn'
  + ' the a an of to in and is was it he she they you i that this for on with as at by but not his her').split(' '));
const DESK_LONG = 35;   // words; the same line `ai_tells_check` draws for a long sentence

function deskSetEntities(list) {
  deskState.ents = list || [];
  deskState.nameOf = new Map();
  for (const e of deskState.ents) for (const t of e.terms) if (!deskState.nameOf.has(t)) deskState.nameOf.set(t, e.rel);
  const terms = [...deskState.nameOf.keys()].sort((a, b) => b.length - a.length);
  deskState.nameRx = terms.length
    ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\p{N}])`, 'gu')
    : null;
}

function deskScan(text) {
  const names = [], reps = [], sents = [];
  if (deskState.nameRx) for (const m of text.matchAll(deskState.nameRx)) names.push({ a: m.index, b: m.index + m[0].length, rel: deskState.nameOf.get(m[0]) });

  const toks = [...text.matchAll(/[\p{L}\p{N}]+/gu)].map((m) => ({ a: m.index, b: m.index + m[0].length, w: m[0].toLowerCase() }));
  const marks = [...text.matchAll(/〔[^〕\n]*〕/g)].map((m) => [m.index, m.index + m[0].length]);
  let mi = 0;
  const inMark = (at) => { while (mi < marks.length && marks[mi][1] <= at) mi++; return mi < marks.length && marks[mi][0] <= at; };
  let ni = 0;
  toks.forEach((t, i) => {
    while (ni < names.length && names[ni].b <= t.a) ni++;
    t.name = (ni < names.length && names[ni].a < t.b) || inMark(t.a);        // names repeat by nature; markers are not prose
    t.glue = i + 1 < toks.length && /^[ \t]+$/.test(text.slice(t.b, toks[i + 1].a));
  });
  const hit = new Uint8Array(toks.length);
  // longest phrase first; [length in words, how far back a repeat still counts]
  for (const [n, win] of [[4, 80], [3, 80], [2, 60], [1, 30]]) {
    const last = new Map(), found = new Set();
    for (let i = 0; i + n <= toks.length; i++) {
      let key = '';
      for (let k = 0; k < n && key != null; k++) {
        const t = toks[i + k];
        key = t.name || hit[i + k] || (k < n - 1 && !t.glue) ? null : key + (k ? ' ' : '') + t.w;
      }
      if (key == null || DESK_STOP.has(toks[i].w) || DESK_STOP.has(toks[i + n - 1].w)) continue;
      if (n === 1 && (key.length < 5 || /^\d+$/.test(key))) continue;
      const prev = last.get(key);
      if (prev != null && i - prev >= n && i - prev <= win) { found.add(prev); found.add(i); }
      last.set(key, i);
    }
    for (const i of found) {
      reps.push({ a: toks[i].a, b: toks[i + n - 1].b });
      for (let k = 0; k < n; k++) hit[i + k] = 1;
    }
  }
  for (const m of text.matchAll(/[^.!?…\n]+[.!?…]*[”"’')\]]*/g)) {
    const words = (m[0].match(/\S+/g) || []).length;
    if (words) sents.push({ a: m.index, b: m.index + m[0].length, words });
  }
  // four sentences in a row within two words of each other read as a drone
  sents.forEach((s, i) => {
    const run = sents.slice(i, i + 4);
    if (run.length === 4 && run.every((x) => x.words >= 4) && Math.max(...run.map((x) => x.words)) - Math.min(...run.map((x) => x.words)) <= 2) run.forEach((x) => { x.flat = true; });
  });
  // the same word twice in a row: a machine-translation slip, or a deliberate reduplication (phủi phủi)
  const dbl = [];
  for (const m of text.matchAll(/(?<![\p{L}\p{N}])([\p{L}]{2,}) \1(?![\p{L}\p{N}])/gu)) {
    const a = m.index, b = a + m[0].length;
    if (deskState.words.has(m[0].toLowerCase()) || names.some((n) => n.a < b && a < n.b) || marks.some(([x, y]) => x < b && a < y)) continue;
    dbl.push({ a, b, w: m[0] });
  }
  return { names, reps, sents, dbl, spell: deskSpell(text, toks) };
}

/* ---------- shorthand: the common Vietnamese abbreviations, written out in full ----------
   Two tiers. SAFE ones have one reading and are expanded while typing (when the setting is on).
   LOOSE ones are a single letter or have a second reading (k, j, r, bt…): never expanded on their
   own, only offered in the "hoàn thiện viết tắt" list where each row can be unticked or retyped.
   The book's own list (Gõ tắt) always wins over both. */

const deskShortTable = (s) => new Map(s.trim().split(/\s*\|\s*/).map((p) => p.split('=')));
const DESK_SHORT_SAFE = deskShortTable(`ko=không | kg=không | hok=không | khg=không | dc=được | đc=được
  | nhg=nhưng | nhưg=nhưng | trc=trước | ns=nói | mk=mình | cx=cũng | cg=cũng | nx=nữa | lm=làm | ntn=như thế nào | vs=với
  | đg=đang | đag=đang | chx=chưa | hnay=hôm nay | hqua=hôm qua | mn=mọi người | đt=điện thoại
  | ms=mới | bik=biết | wa=quá | qá=quá | rùi=rồi | roài=rồi | bjo=bây giờ | bgio=bây giờ
  | ng=người | ngta=người ta | nta=người ta | ae=anh em | ny=người yêu | qtam=quan tâm | kp=không phải | kbt=không biết
  | nhìu=nhiều | zậy=vậy | dzậy=vậy | zô=vô`);
const DESK_SHORT_LOOSE = deskShortTable(`k=không | j=gì | r=rồi | h=giờ | z=vậy | v=vậy | m=mày | t=tao | a=anh | e=em | c=chị
  | bt=biết | bn=bao nhiêu | bh=bây giờ | ck=chồng | vk=vợ | ib=nhắn tin | kb=kết bạn | sn=sinh nhật | cn=chủ nhật
  | tn=tin nhắn | lq=liên quan | đb=đặc biệt | tl=trả lời | gđ=gia đình | sg=Sài Gòn | hn=Hà Nội | vn=Việt Nam
  | dk=được | đk=điều kiện | tg=thời gian | nc=nói chuyện | hc=học | vc=việc | lun=luôn | iu=yêu`);

const deskKeepCase = (from, to) => (from[0] !== from[0].toLowerCase() ? to[0].toUpperCase() + to.slice(1) : to);

/* what a typed word should become, or null: the book's list first, then the safe shorthand */
function deskShortFor(word, loose = false) {
  const w = word.toLowerCase();
  for (const mine of [deskState.snip, deskState.auto.global]) {
    if (mine.has(word)) return mine.get(word);
    if (mine.has(w)) return deskKeepCase(word, mine.get(w));
  }
  const { off, on } = deskState.auto;
  const builtIn = loose || deskState.autoShort;
  const hit = (builtIn && (loose || !off.has(w)) ? DESK_SHORT_SAFE.get(w) : null)
    || (builtIn && (loose || on.has(w)) ? DESK_SHORT_LOOSE.get(w) : null);
  return hit ? deskKeepCase(word, hit) : null;
}

/* true when typing `word` would change it by itself, right now */
const deskAutoOn = (word) => deskShortFor(word) != null;

/* fixes offered for a flagged word: its full form if it is shorthand, then the spelling guesses */
function deskFixes(word) {
  const full = deskShortFor(word, true);
  return [...new Set([...(full ? [full] : []), ...vnSuggest(word)])].slice(0, 5);
}

/* every abbreviation standing in the text, with what it would become */
function deskFindShort(text) {
  const skip = [...(deskState.scan?.names || []).map((n) => [n.a, n.b]), ...[...text.matchAll(/〔[^〕\n]*〕/g)].map((m) => [m.index, m.index + m[0].length])];
  const inside = (at) => skip.some(([a, b]) => a <= at && at < b);
  const found = new Map();
  for (const m of text.matchAll(/[\p{L}\p{N}]+/gu)) {
    const to = deskShortFor(m[0], true);
    if (!to || inside(m.index)) continue;
    const key = m[0];
    if (!found.has(key)) found.set(key, { from: key, to, loose: !deskAutoOn(key), at: [] });
    found.get(key).at.push(m.index);
  }
  return [...found.values()];
}

function deskShortDialog() {
  const ta = $('#d-mine');
  let before = null;
  const draw = () => {
    const rows = deskState.shortRows = deskFindShort(ta.value);
    if (!rows.length) return `<p class="muted">${before == null ? 'Không thấy chữ viết tắt nào trong bản của bạn.' : 'Đã viết đầy đủ. Bấm “Hoàn tác” nếu muốn trả lại.'}</p>`;
    return `<p class="muted small">Chữ viết tắt tìm thấy trong bản của bạn, theo danh sách Gõ tắt của sách và bảng viết tắt thông dụng. Bỏ tick dòng không muốn đổi; sửa ô bên phải nếu chữ đầy đủ phải khác. Dòng <span class="warn">vàng</span> là mục đang không tự sửa khi gõ (nhiều nghĩa, một chữ cái, hoặc bạn đã tắt) — bỏ tick sẵn, xem rồi hãy chọn. Tên có note trong vault và mốc 〔…〕 không bị đụng.</p>
      <table class="spell"><tbody>${rows.map((r, i) => `<tr>
        <td style="width:28px"><input type="checkbox" data-row="${i}" ${r.loose ? '' : 'checked'}></td>
        <td><b class="${r.loose ? 'warn' : ''}">${esc(r.from)}</b> <span class="muted small">×${r.at.length}</span></td>
        <td><input type="text" data-to="${i}" value="${esc(r.to)}" style="width:100%"></td>
        <td class="r"><button class="btn sm ghost" data-go="${i}">Tới</button></td></tr>`).join('')}</tbody></table>`;
  };
  const m = modal({
    title: 'Hoàn thiện viết tắt', wide: true, body: draw(),
    actions: [
      { label: 'Đóng' },
      { label: 'Hoàn tác', onClick: () => {
        if (before == null) return false;
        ta.value = before; before = null; ta.dispatchEvent(new Event('input')); m.el.innerHTML = draw();
        return false;
      } },
      { label: 'Viết đầy đủ các dòng đã tick', primary: true, onClick: (b) => {
        const edits = [];
        deskState.shortRows.forEach((r, i) => {
          const to = $(`[data-to="${i}"]`, b)?.value.trim();
          if ($(`[data-row="${i}"]`, b)?.checked && to) for (const at of r.at) edits.push([at, r.from.length, deskKeepCase(r.from, to)]);
        });
        if (!edits.length) return false;
        before = ta.value;
        let text = ta.value;
        for (const [at, len, to] of edits.sort((p, q) => q[0] - p[0])) text = text.slice(0, at) + to + text.slice(at + len);
        ta.value = text;
        ta.dispatchEvent(new Event('input'));
        toast(`Đã viết đầy đủ ${edits.length} chỗ`);
        m.el.innerHTML = draw();
        return false;
      } },
    ],
  });
  m.el.onclick = (e) => {
    const go = e.target.closest('[data-go]');
    if (!go) return;
    const r = deskState.shortRows[+go.dataset.go];
    m.close();
    deskSelect(r.at[0], r.at[0] + r.from.length);
  };
}

/* ---------- spelling: syllables that cannot be Vietnamese (vnspell.js), and spacing slips ---------- */

const DESK_SPACING = [
  { name: 'Hai dấu cách liền nhau', rx: / {2,}/g, fix: ' ' },
  { name: 'Dấu cách trước dấu câu', rx: / +([,.;:!?…])/g, fix: '$1' },
  { name: 'Thiếu dấu cách sau dấu câu', rx: /([,;:!?])(?=\p{L})/gu, fix: '$1 ' },
];

/* `toks` come from deskScan: {a, b, w (lower case), name (inside a vault name or a marker)} */
function deskSpell(text, toks) {
  const bad = [];
  const known = deskState.words;
  let lower = 0;
  for (const t of toks) {
    const raw = text.slice(t.a, t.b);
    if (t.name || raw.length < 2 || /[^\u0041-\u024f\u1e00-\u1eff]/.test(raw)) continue;   // other scripts, digits
    const cap = raw[0] !== raw[0].toLowerCase();
    if (!cap) lower++;
    // a capitalised word that is not Vietnamese is a foreign name (March, Welt), not a typo —
    // unless it carries Vietnamese marks and a fix is one slip away (Nguời)
    if (vnValid(raw) || known.has(t.w)) continue;
    if (cap && (raw === raw.toUpperCase() || /^[A-z]+$/.test(raw) || !vnSuggest(raw, 1).length)) continue;
    bad.push({ a: t.a, b: t.b, w: raw });
  }
  // mostly unparseable = the text is not Vietnamese (an English source); say nothing rather than flag it all
  return lower > 40 && bad.filter((x) => x.w[0] === x.w[0].toLowerCase()).length / lower > 0.25 ? { bad: [], foreign: true } : { bad, foreign: false };
}

function deskSpellDialog() {
  const ta = $('#d-mine');
  const draw = () => {
    const text = ta.value;
    const sp = deskState.scan.spell;
    const groups = new Map();
    for (const x of sp.bad) { if (!groups.has(x.w)) groups.set(x.w, []); groups.get(x.w).push(x); }
    const doubled = [...text.matchAll(/(?<![\p{L}\p{N}])([\p{L}]{2,}) \1(?![\p{L}\p{N}])/gu)];
    const spacing = DESK_SPACING.map((r) => ({ ...r, n: (text.match(r.rx) || []).length })).filter((r) => r.n);
    deskState.spellJump = { groups, doubled };
    if (sp.foreign) return '<p class="muted">Bản này phần lớn không phải tiếng Việt nên không soát chính tả.</p>';
    return `<p class="muted small">Soát theo cấu tạo âm tiết tiếng Việt, không dùng từ điển: bắt được chữ gõ sai thành âm tiết không có thật (<code>nguời</code>, <code>vieets</code>), không bắt được chữ sai mà vẫn là âm tiết đúng (<code>chanh</code> thay cho <code>tranh</code>). Tên riêng viết hoa và tên có note trong vault được bỏ qua.</p>
      <h4 class="check-h">Chữ lạ <span class="muted small">${groups.size} chữ · ${sp.bad.length} chỗ</span></h4>
      ${groups.size ? `<table class="spell"><tbody>${[...groups].map(([w, list], i) => `<tr>
        <td><b>${esc(w)}</b>${list.length > 1 ? ` <span class="muted small">×${list.length}</span>` : ''}</td>
        <td>${deskFixes(w).map((s) => `<button class="btn sm" data-sp="fix" data-i="${i}" data-to="${esc(s)}" title="Thay mọi chỗ bằng “${esc(s)}”">${esc(s)}</button>`).join(' ') || '<span class="muted small">không có gợi ý</span>'}</td>
        <td class="r"><button class="btn sm ghost" data-sp="go" data-i="${i}">Tới</button> <button class="btn sm ghost" data-sp="skip" data-i="${i}" title="Coi là đúng trong sách này">Bỏ qua</button></td></tr>`).join('')}</tbody></table>` : '<p class="muted small">Không có chữ nào lạ.</p>'}
      <h4 class="check-h">Khoảng trắng và dấu câu</h4>
      ${spacing.length ? `${spacing.map((r) => `<div class="small">${esc(r.name)}: ${r.n} chỗ</div>`).join('')}<div class="row" style="margin-top:6px"><button class="btn sm" data-sp="spacing">Sửa hết ${spacing.reduce((n, r) => n + r.n, 0)} chỗ</button></div>` : '<p class="muted small">Không có gì để sửa.</p>'}
      <h4 class="check-h">Chữ lặp liền nhau <span class="muted small">có thể là láy cố ý</span></h4>
      ${doubled.length ? doubled.map((d, i) => `<button class="btn sm ghost" data-sp="dbl" data-i="${i}">${esc(d[0])}</button>`).join(' ') : '<p class="muted small">Không có.</p>'}`;
  };
  const m = modal({ title: 'Chính tả — bản của bạn', wide: true, body: draw(), actions: [{ label: 'Đóng', primary: true }] });
  const redraw = () => { ta.dispatchEvent(new Event('input')); m.el.innerHTML = draw(); };
  m.el.onclick = guard(async (e) => {
    const b = e.target.closest('[data-sp]');
    if (!b) return;
    const { groups, doubled } = deskState.spellJump;
    const entry = [...groups][+b.dataset.i];
    if (b.dataset.sp === 'fix') {
      // right to left, so earlier offsets stay true
      let text = ta.value;
      for (const x of [...entry[1]].sort((p, q) => q.a - p.a)) text = text.slice(0, x.a) + b.dataset.to + text.slice(x.b);
      ta.value = text;
      return redraw();
    }
    if (b.dataset.sp === 'spacing') {
      let text = ta.value;
      for (const r of DESK_SPACING) text = text.replace(r.rx, r.fix);
      ta.value = text;
      return redraw();
    }
    if (b.dataset.sp === 'skip') {
      await deskKnown(entry[0]);
      return redraw();
    }
    m.close();
    if (b.dataset.sp === 'go') deskSelect(entry[1][0].a, entry[1][0].b);
    if (b.dataset.sp === 'dbl') { const d = doubled[+b.dataset.i]; deskSelect(d.index, d.index + d[0].length); }
  });
}

function deskDrawMarks() {
  const ta = $('#d-mine'), back = $('#d-back');
  if (!ta || !back) return;
  const on = { spell: true, ...store('desk_marks', { names: true, reps: true, rhythm: false }) };
  const text = ta.value;
  if (deskState.scanText !== text) { deskState.scan = deskScan(text); deskState.scanText = text; }   // caret moves redraw too
  const scan = deskState.scan;
  const flag = new Uint8Array(text.length);
  const focus = $('.desk').classList.contains('focus');
  const pos = ta.selectionStart;
  if (focus) {            // the paragraph being written stays lit, the rest fades
    const a = text.lastIndexOf('\n', pos - 1) + 1;
    let b = text.indexOf('\n', pos);
    if (b < 0) b = text.length;
    for (let k = a; k < b; k++) flag[k] |= 8;
  }
  const paint = (list, bit) => { for (const r of list) flag.fill(flag[r.a] | bit, r.a, r.b); };
  if (on.rhythm) paint(scan.sents.filter((s) => s.words >= DESK_LONG), 4);
  if (on.reps) for (const r of scan.reps) for (let i = r.a; i < r.b; i++) flag[i] |= 2;
  if (on.reps) for (const r of scan.dbl) for (let i = r.a; i < r.b; i++) flag[i] |= 32;
  if (on.names) for (const r of scan.names) for (let i = r.a; i < r.b; i++) flag[i] |= 1;
  if (on.spell) for (const r of scan.spell.bad) for (let i = r.a; i < r.b; i++) flag[i] |= 16;
  for (const m of text.matchAll(/^[ \t]*〔§[^〕\n]*〕[ \t]*$/gm)) for (let i = m.index; i < m.index + m[0].length; i++) flag[i] |= 64;
  // lines holding a repeat or an odd word get a red bar and a "!" in the left margin: colour is never the only sign
  const badLine = new Set();
  if (!focus) for (let k = 0, ln = 0; k < text.length; k++) { if (text[k] === '\n') ln++; else if (flag[k] & 50) badLine.add(ln); }
  let html = '', i = 0, line = 0;
  const CARET = '<i id="d-caret"></i>';
  while (i < text.length) {
    if (focus && i === pos) html += CARET;
    if ((i === 0 || text[i - 1] === '\n') && badLine.has(line)) html += '<b class="m-line" aria-hidden="true"></b>';
    let j = i + 1;
    while (j < text.length && flag[j] === flag[i] && !(focus && j === pos) && text[j - 1] !== '\n') j++;
    for (let k = i; k < j; k++) if (text[k] === '\n') line++;
    const piece = esc(text.slice(i, j));
    html += flag[i] ? `<mark class="${flag[i] & 1 ? 'm-name ' : ''}${flag[i] & 2 ? 'm-rep ' : ''}${flag[i] & 4 ? 'm-long ' : ''}${flag[i] & 8 ? 'm-cur ' : ''}${flag[i] & 16 ? 'm-spell ' : ''}${flag[i] & 32 ? 'm-dbl ' : ''}${flag[i] & 64 ? 'm-scene' : ''}">${piece}</mark>` : piece;
    i = j;
  }
  back.innerHTML = html + (focus && pos >= text.length ? CARET : '') + '\n\u200b';
  back.scrollTop = ta.scrollTop;

  const strip = $('#d-rhythm');
  strip.hidden = !on.rhythm;
  if (on.rhythm) {
    strip.innerHTML = scan.sents.map((s, k) => `<i data-s="${k}" class="${s.words >= DESK_LONG ? 'long' : s.flat ? 'flat' : ''}" style="height:${Math.min(100, 6 + s.words * 2.4)}%" title="Câu ${k + 1}: ${s.words} chữ"></i>`).join('')
      || '<span class="muted small">Chưa có câu nào.</span>';
  }
  deskDrawStat();
  const legend = $('#d-line-legend');
  if (legend) legend.hidden = !badLine.size;
}

/* The chips over the text: how many odd words and repeats there are, with ‹ › to walk to each one
   (like find-on-page). "3/12" shows when the selection sits exactly on one of them. */
const deskJumpList = (kind) => {
  const scan = deskState.scan;
  return scan ? (kind === 'spell' ? scan.spell.bad : kind === 'dbl' ? scan.dbl : scan.reps).slice().sort((p, q) => p.a - q.a) : [];
};

function deskDrawStat() {
  const stat = $('#d-marks-stat'), ta = $('#d-mine');
  const scan = deskState.scan;
  if (!stat || !ta || !scan) return;
  const on = { spell: true, ...store('desk_marks', { names: true, reps: true, rhythm: false }) };
  const chip = (kind, cls, label) => {
    const list = deskJumpList(kind);
    if (!list.length) return '';
    const at = list.findIndex((r) => r.a === ta.selectionStart && r.b === ta.selectionEnd);
    return `<span class="chip chip-jump ${cls}"><button data-jump="${kind}" data-dir="-1" title="Chỗ trước" aria-label="${label}: chỗ trước">‹</button>`
      + `<span>${at >= 0 ? `${at + 1}/${list.length}` : list.length} ${label}</span>`
      + `<button data-jump="${kind}" data-dir="1" title="Chỗ sau" aria-label="${label}: chỗ sau">›</button></span>`;
  };
  const long = scan.sents.filter((s) => s.words >= DESK_LONG).length;
  const flat = scan.sents.filter((s) => s.flat).length;
  stat.innerHTML = [
    on.spell ? chip('spell', 'chip-red', 'chữ lạ') : '',
    on.reps ? chip('reps', 'chip-amber', 'chỗ lặp') : '',
    on.reps ? chip('dbl', 'chip-amber', 'lặp liền') : '',
    on.rhythm ? `<span class="chip">${long} câu dài · ${flat} câu đều nhịp</span>` : '',
  ].join('');
}

/* select the next / previous one after the caret, wrapping round at the ends */
function deskJump(kind, dir) {
  const list = deskJumpList(kind), at = $('#d-mine').selectionStart;
  if (!list.length) return;
  const hit = dir > 0 ? list.find((r) => r.a > at) || list[0] : [...list].reverse().find((r) => r.a < at) || list[list.length - 1];
  deskSelect(hit.a, hit.b);
  deskPop(kind, hit);
  deskDrawStat();
}

/* names found in the text become options of the note picker, so one click opens who is on the page */
function deskEntOptions() {
  const g = $('#d-ent'), sel = $('#d-note');
  if (!g || !sel) return;
  const cur = sel.value;
  const found = new Set((deskState.scan?.names || []).map((n) => n.rel));
  g.innerHTML = deskState.ents.filter((e) => found.has(e.rel) || e.rel === cur)
    .map((e) => `<option value="${esc(e.rel)}">${esc(e.name)}</option>`).join('');
  sel.value = cur;
}

function deskOpenEntity(rel) {
  const sel = $('#d-note'), ent = deskState.ents.find((e) => e.rel === rel);
  if (!sel || !ent) return;
  if (![...sel.options].some((o) => o.value === rel)) $('#d-ent').insertAdjacentHTML('beforeend', `<option value="${esc(rel)}">${esc(ent.name)}</option>`);
  sel.value = rel;
  if (!$('#d-show-notes').checked) $('#d-show-notes').click();
  guard(deskLoadNote)(rel);
}

/* where characters of the text sit in the edit box (positions ascending): the same text laid out in an
   unseen copy of the backdrop, one marker per position */
function deskCoordsMany(list) {
  const ta = $('#d-mine'), back = $('#d-back');
  const probe = back.cloneNode(false), tips = [];
  probe.removeAttribute('id');
  probe.style.cssText = 'visibility:hidden;height:auto;bottom:auto';
  let prev = 0;
  for (const pos of list) {
    const tip = document.createElement('i');
    tip.textContent = String.fromCharCode(0x200b);
    probe.append(document.createTextNode(ta.value.slice(prev, pos)), tip);
    tips.push(tip);
    prev = pos;
  }
  back.parentNode.append(probe);
  const at = tips.map((t) => ({ x: t.offsetLeft, y: t.offsetTop }));
  probe.remove();
  return at;
}
const deskCoords = (pos) => deskCoordsMany([pos])[0];

function deskSelect(a, b) {
  const ta = $('#d-mine'), back = $('#d-back');
  ta.focus();
  ta.setSelectionRange(a, b);
  const y = back ? deskCoords(a).y : (a / Math.max(1, ta.value.length)) * ta.scrollHeight;
  ta.scrollTop = Math.max(0, y - ta.clientHeight / 3);
  if (back) back.scrollTop = ta.scrollTop;
}

/* "Bỏ thay đổi" is live only while the text differs from what the desk opened with */
function deskRevertState() {
  const b = $('#d-revert'), ta = $('#d-mine');
  if (b && ta) b.disabled = ta.value === deskState.openText;
}

/* ---------- popup over an odd word or a repeat: the sentence it sits in, why it was flagged, what to do ---------- */

const deskWordMap = (raw) => new Map(String(raw || '').split('\n').filter(Boolean).map((l) => { const [w, ...n] = l.split('\t'); return [w, n.join(' ')]; }));
const deskWordLines = (map) => [...map].map(([w, n]) => (n ? `${w}\t${n.replace(/[\t\n]+/g, ' ')}` : w)).join('\n');

/* tell the checker a word (or a doubled pair) is right in this book; `note` keeps what Aurel says it is */
async function deskKnown(word, note = '') {
  const bookId = readerState.chapter.book_id;
  const all = (await api('/api/settings')).desk_words || {};
  const mine = deskWordMap(all[bookId]);
  const key = word.toLowerCase();
  mine.set(key, note || mine.get(key) || '');
  await api('/api/settings', { method: 'PUT', body: { desk_words: { ...all, [bookId]: deskWordLines(mine) } } });
  deskState.words = new Set(mine.keys());
  deskState.scanText = null;
}

/* the sentence around text[a..b], as html with the flagged part lit; long ones are cut around it */
function deskSentenceHtml(text, a, b) {
  const stops = ['.', '!', '?', '…'];
  let s = Math.max(text.lastIndexOf('\n', a - 1) + 1, ...stops.map((c) => (a ? text.lastIndexOf(c, a - 1) + 1 : 0)));
  let e = text.length;
  for (const c of ['\n', ...stops]) { const k = text.indexOf(c, b); if (k >= 0 && k < e) e = c === '\n' ? k : k + 1; }
  while (s < a && text[s] === ' ') s++;
  const cutL = a - s > 160, cutR = e - b > 160;
  if (cutL) s = a - 160;
  if (cutR) e = b + 160;
  return `${cutL ? '…' : ''}${esc(text.slice(s, a))}<mark>${esc(text.slice(a, b))}</mark>${esc(text.slice(b, e))}${cutR ? '…' : ''}`;
}

/* why the checker rejects a word */
function deskWhyBad(word) {
  const sp = vnSplitTone(word);
  if (!sp) return 'Có ký tự mà tiếng Việt không dùng (f, j, w, z), hoặc hai dấu thanh trên một chữ.';
  const parts = vnParse(sp.base);
  if (!parts) return 'Các chữ cái không ghép được thành một âm tiết tiếng Việt: không có vần nào như vậy.';
  return `Âm tiết kết thúc bằng “${parts.rhyme.match(/(ch|c|p|t)$/)?.[1] || ''}” chỉ mang dấu sắc hoặc dấu nặng.`;
}

/* why a suggestion was picked for a word */
function deskWhyFix(word, fix) {
  const lw = word.toLowerCase(), lf = fix.toLowerCase();
  if (deskShortFor(word, true) === fix) return `“${word}” là cách viết tắt quen thuộc của “${fix}”.`;
  const a = vnSplitTone(lw), b = vnSplitTone(lf);
  if (!a && /^[a-z]+$/.test(lw.replace(/[fjwz]/g, ''))) return 'Gõ Telex chưa ra chữ: các phím dấu còn nằm trong chữ.';
  if (a && b) {
    if (a.base === b.base) return 'Cùng chữ, khác dấu thanh: âm tiết khép bằng c, ch, p, t chỉ có sắc hoặc nặng.';
    if (a.base.length === b.base.length + 1) return 'Bỏ một ký tự thì ra âm tiết hợp lệ (có thể là gõ thừa phím).';
    if (a.base.length === b.base.length) {
      const d = [...a.base].map((c, i) => (c === b.base[i] ? -1 : i)).filter((i) => i >= 0);
      if (d.length === 2 && d[1] === d[0] + 1 && a.base[d[0]] === b.base[d[1]] && a.base[d[1]] === b.base[d[0]]) return 'Hai ký tự đảo chỗ.';
      if (d.length === 1) return 'Đổi một chữ cái cho đúng dạng (a/ă/â, o/ô/ơ, u/ư, d/đ, i/y).';
    }
    return 'Phụ âm đầu viết ngược quy tắc (ng/ngh, c/k, g/gh…).';
  }
  return 'Âm tiết đúng gần chữ gõ nhất.';
}

function deskPopHtml(kind, it) {
  const text = $('#d-mine').value, word = text.slice(it.a, it.b), scan = deskState.scan;
  const sent = (a, b) => `<p class="pop-sent">${deskSentenceHtml(text, a, b)}</p>`;
  const head = (tag, cls) => `<div class="pop-head"><span class="chip ${cls}">${tag}</span><b>${esc(word)}</b><button class="icon-btn" data-pop="close" aria-label="Đóng">✕</button></div>`;
  if (kind === 'spell') {
    const n = scan.spell.bad.filter((x) => x.w === word).length, fixes = deskFixes(word);
    return `${head(`chữ lạ${n > 1 ? ` · ${n} chỗ` : ''}`, 'chip-red')}${sent(it.a, it.b)}
      <p class="pop-why"><b>Vì sao báo:</b> ${esc(deskWhyBad(word))}</p>
      <div class="pop-h">Gợi ý</div>
      ${fixes.length ? fixes.map((f) => `<div class="pop-fix"><button class="btn sm" data-pop="fix" data-to="${esc(f)}">${esc(f)}</button>${n > 1 ? `<button class="btn sm ghost" data-pop="fix" data-all="1" data-to="${esc(f)}" title="Thay cả ${n} chỗ có chữ này">cả ${n} chỗ</button>` : ''}<span class="muted small">${esc(deskWhyFix(word, f))}</span></div>`).join('') : '<p class="muted small">Không có gợi ý nào đủ gần chữ này.</p>'}
      <div class="pop-h">Không phải chữ lạ?</div>
      <div class="pop-known"><input type="text" id="pop-note" placeholder="Là gì: tên riêng, từ mượn… (không bắt buộc)" spellcheck="false"><button class="btn sm" data-pop="known" title="Chữ này được coi là đúng trong sách này">Đúng, giữ nguyên</button></div>`;
  }
  if (kind === 'dbl') {
    const one = word.slice(0, (word.length - 1) / 2);
    return `${head('lặp liền', 'chip-amber')}${sent(it.a, it.b)}
      <p class="pop-why"><b>Vì sao báo:</b> “${esc(one)}” đứng hai lần liền nhau. Máy dịch hay lặp như vậy; láy hoặc nhấn mạnh có chủ ý thì giữ nguyên.</p>
      <div class="pop-h">Đề xuất</div>
      <div class="pop-fix"><button class="btn sm" data-pop="cut">Bỏ một chữ: ${esc(one)}</button><span class="muted small">khi là lặp thừa</span></div>
      <div class="pop-fix"><button class="btn sm" data-pop="comma">${esc(one)}, ${esc(one)}</button><span class="muted small">tách hai lần cho rõ là nhấn</span></div>
      <div class="pop-fix"><button class="btn sm ghost" data-pop="known">Giữ nguyên, đừng báo nữa</button><span class="muted small">là láy cố ý</span></div>`;
  }
  const lw = word.toLowerCase(), n = (word.match(/[\p{L}\p{N}]+/gu) || []).length;
  const others = scan.reps.filter((r) => r.a !== it.a && text.slice(r.a, r.b).toLowerCase() === lw).slice(0, 4);
  const win = { 1: 30, 2: 60 }[n] || 80;
  return `${head(`chỗ lặp${others.length ? ` · còn ${others.length} chỗ` : ''}`, 'chip-amber')}${sent(it.a, it.b)}
    <p class="pop-why"><b>Vì sao báo:</b> ${n > 1 ? `Cụm ${n} chữ` : 'Từ'} này xuất hiện lại trong vòng ${win} chữ. Lặp gần nhau dễ làm câu văn đơn điệu; nếu là tên riêng hay lặp có chủ ý thì bỏ qua.</p>
    ${others.length ? `<div class="pop-h">Các chỗ khác</div>${others.map((r) => `<div class="pop-other"><div class="pop-sent">${deskSentenceHtml(text, r.a, r.b)}</div><button class="btn sm ghost" data-pop="go" data-a="${r.a}" data-b="${r.b}">Tới</button></div>`).join('')}` : ''}`;
}

function deskPopClose() {
  const pop = $('#d-pop');
  if (pop) pop.hidden = true;
  deskState.pop = null;
}

function deskPop(kind, it) {
  const box = $('.desk-edit');
  if (!box) return;
  let pop = $('#d-pop');
  if (!pop) {
    pop = document.createElement('div');
    pop.id = 'd-pop';
    pop.className = 'desk-pop';
    pop.onclick = guard(deskPopClick);
    pop.onkeydown = (e) => { if (e.key === 'Enter' && e.target.id === 'pop-note') pop.querySelector('[data-pop="known"]')?.click(); };
    box.append(pop);
  }
  deskState.pop = { kind, a: it.a, b: it.b };
  pop.innerHTML = deskPopHtml(kind, it);
  pop.hidden = false;
  deskPopPlace();
}

/* under the flagged word, or above it when there is no room below; hidden while the word is scrolled out of sight */
function deskPopPlace() {
  const pop = $('#d-pop'), ta = $('#d-mine'), st = deskState.pop;
  if (!pop || !st || pop.hidden) return;
  const c = deskCoords(st.a), line = parseFloat(getComputedStyle(ta).lineHeight) || 26, top = c.y - ta.scrollTop;
  pop.style.visibility = top < -line || top > ta.clientHeight ? 'hidden' : '';
  let y = top + line + 4;
  if (y + pop.offsetHeight > ta.clientHeight) y = Math.max(4, top - pop.offsetHeight - 4);
  pop.style.top = `${y}px`;
  pop.style.left = `${Math.max(4, Math.min(c.x - 10, ta.clientWidth - pop.offsetWidth - 16))}px`;
}

async function deskPopClick(e) {
  const b = e.target.closest('[data-pop]'), st = deskState.pop;
  if (!b || !st) return;
  const ta = $('#d-mine'), text = ta.value, word = text.slice(st.a, st.b), act = b.dataset.pop;
  const put = (edits) => {      // [from, to, new text], applied right to left so the offsets stay true
    let t = text;
    for (const [x, y, to] of edits.sort((p, q) => q[0] - p[0])) t = t.slice(0, x) + to + t.slice(y);
    ta.value = t;
    ta.dispatchEvent(new Event('input'));
  };
  const one = word.slice(0, (word.length - 1) / 2);
  if (act === 'close') return deskPopClose();
  if (act === 'fix') return put((b.dataset.all ? deskState.scan.spell.bad.filter((x) => x.w === word) : [st]).map((x) => [x.a, x.b, b.dataset.to]));
  if (act === 'cut') return put([[st.a, st.b, one]]);
  if (act === 'comma') return put([[st.a, st.b, `${one}, ${one}`]]);
  if (act === 'known') {
    await deskKnown(word, $('#pop-note')?.value.trim());
    ta.dispatchEvent(new Event('input'));
    return toast(`Đã coi “${word}” là đúng trong sách này`);
  }
  if (act === 'go') {
    const a = +b.dataset.a, z = +b.dataset.b;
    deskSelect(a, z);
    deskPop(st.kind, { a, b: z });
    deskDrawStat();
  }
}

function deskDirty() {
  const ta = $('#d-mine');
  return !!ta && ta.value !== deskState.snapshot;
}

async function deskSave() {
  const ch = readerState.chapter;
  clearTimeout(deskState.saver);
  const sent = $('#d-mine').value;
  const r = await api(`/api/chapters/${ch.id}/edit`, { method: 'PUT', body: { content: sent, base: deskState.base } });
  if (readerState.chapter !== ch || !$('#d-mine')) return;
  deskDay(r.writing);
  deskState.exists = true;
  deskState.snapshot = sent;      // the textarea is left alone: an autosave must not move the caret
  $('#d-moved').hidden = true;
  $('#d-drop').disabled = false;
  const row = readerState.book?.chapters.find((c) => c.id === ch.id);
  if (row) row.has_edit = 1;
  deskSetState(`${deskDirty() ? 'đang gõ · ' : ''}đã lưu ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`);
}

/* abbreviations: "bh=Boothill" — typed `bh` then a space or a mark becomes `Boothill` */
function deskParseSnips(text) {
  const map = new Map();
  for (const line of String(text || '').split('\n')) {
    const at = line.indexOf('=');
    if (at > 0 && line.slice(0, at).trim() && line.slice(at + 1).trim()) map.set(line.slice(0, at).trim(), line.slice(at + 1).trim());
  }
  return map;
}

function deskExpand(ta) {
  const pos = ta.selectionStart;
  if (pos !== ta.selectionEnd || pos < 2) return;
  if (!/[\s.,!?;:…”"')]/.test(ta.value[pos - 1])) return;
  const m = /([^\s.,!?;:…“”"'()]+)$/.exec(ta.value.slice(Math.max(0, pos - 41), pos - 1));
  const rep = m && deskShortFor(m[1]);
  if (!rep) return;
  ta.setRangeText(rep, pos - 1 - m[1].length, pos - 1, 'end');
  const at = pos - m[1].length + rep.length;
  ta.setSelectionRange(at, at);
}

/* Listening: the reference column shows Aurel's text as paragraphs tts.js can read and highlight.
   Returns the paragraph the caret is in, which is where reading starts. */
function deskListenPrepare() {
  const ta = $('#d-mine');
  const paras = deskParas(ta.value);
  const start = deskParas(ta.value.slice(0, ta.selectionStart)).length - (/\n\s*$/.test(ta.value.slice(0, ta.selectionStart)) || !ta.selectionStart ? 0 : 1);
  $('#d-listen').innerHTML = '<div class="note-meta">Đang nghe bản của bạn, từ đoạn có con trỏ. Bấm một đoạn để nhảy tới nó trong ô viết.</div>'
    + paras.map((p, i) => (p.includes('〔') && (DESK_SCENE.test(p) || !p.replace(DESK_MARK, '').trim())
      ? `<p class="mark" data-l="${i}">${esc(p)}</p>` : `<p data-p="${i}" data-l="${i}">${esc(p.replace(DESK_MARK, ''))}</p>`)).join('');
  if ($('.desk').classList.contains('focus')) deskFocus(false);
  $('.desk').classList.add('listening');
  if ($('#d-listen-btn')) $('#d-listen-btn').textContent = '■ Dừng nghe';
  return Math.max(0, start);
}

function deskListenDone() {
  $('.desk')?.classList.remove('listening');
  if ($('#d-listen-btn')) $('#d-listen-btn').textContent = '▶ Nghe';
}

/* ---------- focus: one column, the current paragraph lit, the line being typed kept mid-screen ---------- */

function deskFocus(on) {
  const desk = $('.desk');
  if (!desk) return;
  desk.classList.toggle('focus', on);
  $('#d-focus').classList.toggle('on', on);
  $$('#d-view [data-view]').forEach((x) => x.classList.toggle('on', !on && (x.dataset.view === 'ref') === !desk.classList.contains('no-ref')));
  deskDrawMarks();
  if (on) { $('#d-mine').focus(); deskTypewriter(); }
}

function deskTypewriter() {
  const ta = $('#d-mine'), caret = $('#d-caret');
  if (!caret || !$('.desk').classList.contains('focus')) return;
  ta.scrollTop = Math.max(0, caret.offsetTop - ta.clientHeight * 0.42);
  $('#d-back').scrollTop = ta.scrollTop;
}

document.addEventListener('click', (e) => { $$('.desk .menu[open]').forEach((m) => { if (!m.contains(e.target)) m.open = false; }); });

document.addEventListener('selectionchange', () => {
  if (document.activeElement?.id !== 'd-mine') return;
  if ($('.desk.focus')) deskDrawMarks(); else deskDrawStat();
});

/* ---------- today: words the desk saved today, the daily goal, the run of writing days ---------- */

function deskDay(w) {
  const el = $('#d-day');
  if (!el || !w) return;
  deskState.writing = w;
  const n = w.today.words;
  el.textContent = `Hôm nay ${n > 0 ? '+' : ''}${n}${w.goal ? ` / ${w.goal}` : ''} chữ${w.streak > 1 ? ` · chuỗi ${w.streak} ngày` : ''}`;
  el.classList.toggle('done', !!w.goal && n >= w.goal);
}

async function deskGoalDialog() {
  const ch = readerState.chapter;
  const w = deskState.writing || await api('/api/writing');
  const top = Math.max(1, ...w.recent.map((d) => Math.abs(d.words)));
  modal({
    title: 'Mục tiêu và nhật ký viết',
    body: `<div class="form-grid">
        <label class="field">Mục tiêu số chữ cho chương này<input type="number" min="0" id="dg-ch" value="${+store(`desk_target_${ch.id}`, 0) || ''}" placeholder="để trống = không đặt"></label>
        <label class="field">Mục tiêu mỗi ngày (chữ thêm vào)<input type="number" min="0" id="dg-day" value="${w.goal || ''}" placeholder="để trống = không đặt"></label>
      </div>
      <p class="muted small">Số chữ mỗi ngày là mức tăng giảm thực của các bản lưu trong ngày, nên một ngày ngồi gọt bản dịch máy có thể ra số âm. Chuỗi ngày tính theo ngày có lưu, không theo số chữ. Hiện ${w.streak} ngày liền.</p>
      <div class="day-bars">${w.recent.map((d) => `<div class="day${d.saves ? '' : ' off'}" title="${d.day}: ${d.words} chữ, ${d.saves} lần lưu">
        <i style="height:${Math.round(Math.abs(d.words) / top * 100)}%" class="${d.words < 0 ? 'neg' : w.goal && d.words >= w.goal ? 'hit' : ''}"></i><span>${d.day.slice(8)}</span></div>`).join('')}</div>`,
    actions: [
      { label: 'Huỷ' },
      { label: 'Lưu', primary: true, onClick: async (b) => {
        save(`desk_target_${ch.id}`, Math.max(0, parseInt($('#dg-ch', b).value, 10) || 0));
        await api('/api/settings', { method: 'PUT', body: { desk_daily_goal: Math.max(0, parseInt($('#dg-day', b).value, 10) || 0) } });
        deskDay(await api('/api/writing'));
        deskRefresh();
      } },
    ],
  });
}

/* ---------- scene board: every scene card of the chapter, and how far each one is written ---------- */

/* words under each scene divider 〔§ …〕 found in the text, by divider title; `from`–`to`: the paragraphs
   (counted as the footer counts them) between this divider and the next */
function deskSceneProgress() {
  const got = new Map();
  let cur = null, pos = 0, para = 0;
  for (const line of $('#d-mine').value.split('\n')) {
    const m = DESK_SCENE.exec(line.trim());
    if (m) { cur = m[1].trim(); got.set(cur, { at: pos, words: 0, from: para + 2, to: para + 1 }); }
    else if (cur) {
      got.get(cur).words += deskWords(line.replace(DESK_MARK, ''));
      if (line.trim()) got.get(cur).to = para + 1;
    }
    if (line.trim()) para++;
    pos += line.length + 1;
  }
  return got;
}

function deskSceneCardHtml(s, i, p) {
  const pct = p && s.target ? Math.min(100, Math.round(p.words / s.target * 100)) : 0;
  const state = !p ? 'chưa đặt mốc' : !p.words ? 'chưa viết' : s.target && p.words >= s.target * 0.85 ? 'đủ' : 'đang viết';
  return `<div class="scene-card${p && p.words ? (state === 'đủ' ? ' done' : ' going') : ''}">
      <div class="sc-head"><b><i class="sc-dot sc-c${i % 4}"></i>${esc(s.short)}</b><span class="muted small">${esc(state)}</span></div>
      <div class="muted small">${[s.pov ? `POV ${esc(s.pov)}` : '', s.target ? `${p ? p.words : 0} / ${s.target} chữ` : (p ? `${p.words} chữ` : ''), p && p.to >= p.from ? `đoạn ${p.from}–${p.to}` : ''].filter(Boolean).join(' · ')}</div>
      ${s.target ? `<div class="bar"><i style="width:${pct}%"></i></div>` : ''}
      <p>${esc(s.purpose || '(Thẻ không có mục “Mục đích cảnh”)')}</p>
      ${s.ending ? `<p class="muted small"><b>Kết cảnh:</b> ${esc(s.ending)}</p>` : ''}
      <div class="row"><button class="btn sm" data-sc="${p ? 'go' : 'put'}" data-i="${i}">${p ? 'Tới cảnh' : 'Đặt mốc'}</button><button class="btn sm" data-sc="open" data-i="${i}">Mở thẻ</button></div>
    </div>`;
}

/* what a card's buttons do; true when the text changed (a marker went in) */
function deskSceneAct(s, act) {
  if (act === 'put') { deskPutScene(s.short); return true; }
  if (act === 'go') {
    const p = deskSceneProgress().get(s.short);
    if (p) deskSelect(p.at, p.at + s.short.length + 4);
    return false;
  }
  const sel = $('#d-note');
  if (sel && [...sel.options].some((o) => o.value === s.rel)) {
    sel.value = s.rel;
    if ($('.desk').classList.contains('no-notes')) $('#d-show-notes').click();
    guard(deskLoadNote)(s.rel);
  }
  return false;
}

/* the cards in the right-hand column, which is otherwise empty while the plan pane is closed */
function deskDrawScenes() {
  const box = $('#d-scene-body'), desk = $('.desk');
  if (!box || !desk.classList.contains('no-notes')) return;
  const got = deskSceneProgress();
  $('#d-scene-count').textContent = `${deskState.scenes.filter((s) => got.get(s.short)?.words).length} / ${deskState.scenes.length} đã viết`;
  box.innerHTML = deskState.scenes.map((s, i) => deskSceneCardHtml(s, i, got.get(s.short))).join('');
}

/* a coloured bar in the left margin from each scene divider to the next, same colour as its card's dot */
function deskDrawSceneBars() {
  const host = $('#d-sbars > div'), ta = $('#d-mine');
  if (!host || !ta) return;
  const text = ta.value, runs = [];
  let pos = 0;
  for (const line of text.split('\n')) {
    const m = DESK_SCENE.exec(line.trim());
    if (m) {
      if (runs.length) runs[runs.length - 1].end = pos;
      const k = deskState.scenes.findIndex((x) => x.short === m[1].trim());
      runs.push({ title: m[1].trim(), k: k < 0 ? runs.length : k, a: pos, end: text.length });
    }
    pos += line.length + 1;
  }
  const ys = runs.length ? deskCoordsMany(runs.flatMap((r) => [r.a, r.end])) : [];
  const line = parseFloat(getComputedStyle(ta).lineHeight) || 26;
  host.innerHTML = runs.map((r, i) => {
    const top = ys[2 * i].y, bottom = ys[2 * i + 1].y + (i === runs.length - 1 ? line : -4);
    return `<i class="sc-c${r.k % 4}" style="top:${top + 3}px;height:${Math.max(8, bottom - top - 3)}px" title="${esc(r.title)}"></i>`;
  }).join('');
  deskScrollBars();
}

function deskScrollBars() {
  const host = $('#d-sbars > div'), ta = $('#d-mine');
  if (host && ta) host.style.transform = `translateY(${-ta.scrollTop}px)`;
}

async function deskSceneBoard() {
  const ch = readerState.chapter;
  const scenes = await api(`/api/chapters/${ch.id}/scenes`);
  if (!scenes.length) { toast('Chương này chưa có thẻ cảnh nào trong vault (thư mục scenes/ cạnh note chương).', true); return; }
  deskState.scenes = scenes;
  const draw = () => {
    const got = deskSceneProgress();
    return `<p class="muted small">Mỗi thẻ là một note trong <code>scenes/</code> của chương. “Đặt mốc” thả <code>〔§ tên cảnh〕</code> vào bản của bạn; chữ viết dưới mốc được đếm cho cảnh đó. Mốc cảnh không vào file xuất, không vào số đo và không được đọc thành tiếng.</p>
      <div class="scene-grid">${scenes.map((s, i) => deskSceneCardHtml(s, i, got.get(s.short))).join('')}</div>`;
  };
  const m = modal({
    title: `Thẻ cảnh — ${ch.title_vi || ch.title}`, wide: true, body: draw(),
    actions: [
      { label: 'Đóng' },
      { label: 'Đặt mốc cho mọi cảnh còn thiếu', primary: true, onClick: () => {
        const got = deskSceneProgress();
        scenes.filter((s) => !got.has(s.short)).forEach((s) => deskPutScene(s.short));
        m.el.innerHTML = draw();
        return false;
      } },
    ],
  });
  m.el.onclick = (e) => {
    const b = e.target.closest('[data-sc]');
    if (!b) return;
    const s = scenes[+b.dataset.i];
    if (b.dataset.sc === 'put') { deskSceneAct(s, 'put'); m.el.innerHTML = draw(); return; }
    m.close();
    deskSceneAct(s, b.dataset.sc);
  };
}

/* scene dividers go to the end, in the order they are asked for */
function deskPutScene(title) {
  const ta = $('#d-mine');
  ta.value = `${ta.value.replace(/\s+$/, '')}${ta.value.trim() ? '\n' : ''}〔§ ${title}〕\n`;
  ta.dispatchEvent(new Event('input'));
}

/* drop a line from the plan into the text as a marker to write over */
function deskInsertMark(text) {
  const ta = $('#d-mine');
  const v = ta.value;
  let at = v.indexOf('\n', ta.selectionEnd);
  if (at < 0) at = v.length;
  const mark = `〔${text}〕`;
  ta.setRangeText((at > 0 ? '\n' : '') + mark, at, at, 'end');
  ta.focus();
  ta.dispatchEvent(new Event('input'));
}

function deskSetState(text, path = '') {
  const el = $('#d-state');
  if (!el) return;
  el.textContent = text ? `${text}${path ? ` · file: ${path.split(/[\\/]/).pop()}` : ''}` : '';
  el.title = path;
}

/* redraw the reference with its changed paragraphs marked, and the counters */
function deskRefresh() {
  const ch = readerState.chapter;
  const ref = deskParas(deskRefText(ch, deskState.ref));
  const mine = deskParas($('#d-mine').value);
  const d = deskDiff(ref, mine);
  deskState.map = d.map;
  $('#d-ref').innerHTML = ref.map((p, i) => `<p data-r="${i}"${d.keepA[i] ? '' : ' class="chg"'}>${esc(p)}</p>`).join('')
    || '<p class="muted">(Bản này trống)</p>';
  const changed = d.keepB.filter((k) => !k).length;
  const gone = d.keepA.filter((k) => !k).length;
  $('#d-ref-count').textContent = `${ref.length} đoạn · ${deskWords(ref.join(' '))} chữ`;
  const words = deskWords(mine.filter((p) => !DESK_SCENE.test(p)).join(' '));
  const target = +store(`desk_target_${ch.id}`, 0) || 0;
  const session = words - deskState.startWords;
  const marks = ($('#d-mine').value.match(DESK_MARK) || []).length;
  $('#d-mine-count').textContent = `${mine.length} đoạn · ${words}${target ? ` / ${target} chữ (${Math.round(words / target * 100)}%)` : ' chữ'}`
    + `${session ? ` · ${session > 0 ? '+' : ''}${session} phiên này` : ''}${marks ? ` · còn ${marks} mốc 〔〕` : ''}`;
  deskDrawMarks();
  deskEntOptions();
  deskDrawScenes();
  deskDrawSceneBars();
  $('#d-stat').textContent = changed || gone
    ? `${changed} đoạn bạn đã sửa hoặc thêm · ${gone} đoạn đối chiếu đã đổi hoặc bỏ`
    : 'Chưa khác bản đối chiếu';
}

/* put the caret on paragraph `idx` of the textarea and bring it into view */
function deskGoToLine(idx) {
  const ta = $('#d-mine');
  const lines = ta.value.split('\n');
  let seen = -1, pos = 0;
  for (const line of lines) {
    if (line.trim()) seen++;
    if (seen === idx) {
      ta.focus();
      ta.setSelectionRange(pos, pos + line.length);
      const ratio = pos / Math.max(1, ta.value.length);
      ta.scrollTop = Math.max(0, ratio * ta.scrollHeight - ta.clientHeight / 3);
      return;
    }
    pos += line.length + 1;
  }
}

async function deskLoadNote(rel) {
  const el = $('#d-note-body');
  if (!rel) { el.innerHTML = '<p class="muted">Không có note nào để hiện.</p>'; return; }
  el.innerHTML = '<p class="muted">Đang đọc…</p>';
  const note = await api(`/api/vault/note?path=${encodeURIComponent(rel)}`);
  if ($('#d-note')?.value !== rel) return;
  const st = note.meta.status;
  el.innerHTML = `<div class="note-meta">${esc(rel)}${st ? ` · <span class="${st === 'superseded' || st === 'archived' ? 'warn' : ''}">${esc(st)}</span>` : ''}</div>${mdLite(note.body)}`;
  el.scrollTop = 0;
}

function deskNoteOptions(info) {
  const label = (n) => `${n.name}${n.status === 'superseded' || n.status === 'archived' ? ` (${n.status})` : ''}`;
  const group = (name, key) => {
    const items = info.notes.filter((n) => n.group === key);
    return items.length ? `<optgroup label="${name}">${items.map((n) => `<option value="${esc(n.rel)}"${n.rel === info.default ? ' selected' : ''}>${esc(label(n))}</option>`).join('')}</optgroup>` : '';
  };
  return group('Cạnh chương này', 'chapter') + group('Thẻ cảnh', 'scene') + group('Đại cương · arc', 'arc')
    + '<optgroup label="Nhân vật · nơi chốn có trong chương" id="d-ent"></optgroup>';
}

async function drawDesk(body) {
  const ch = readerState.chapter;
  if (typeof ttsStop === 'function' && tts.reading) ttsStop();
  body.innerHTML = '<div class="desk"><p class="muted">Đang mở bàn viết…</p></div>';
  const [edit, info, settings, scenes] = await Promise.all([
    api(`/api/chapters/${ch.id}/edit`),
    api(`/api/chapters/${ch.id}/vault-notes`).catch((e) => ({ linked: true, error: e.message })),
    api('/api/settings').catch(() => ({})),
    api(`/api/chapters/${ch.id}/scenes`).catch(() => []),
  ]);
  deskLoadAuto(settings, ch.book_id);
  deskSetEntities(info.entities);
  deskState.scenes = scenes;
  deskState.words = new Set(deskWordMap((settings.desk_words || {})[ch.book_id]).keys());
  deskState.scanText = null;
  const marks = { spell: true, ...store('desk_marks', { names: true, reps: true, rhythm: false }) };
  if (readerState.chapter !== ch || !readerState.writing) return;
  const start = edit.exists ? edit.content : deskParas(deskRefText(ch, edit.base)).join('\n');
  Object.assign(deskState, { base: edit.base, ref: edit.base, exists: edit.exists, snapshot: start, startWords: deskWords(start) });
  const both = !!ch.content_vi && !!ch.content_src;
  const cols = store('desk_cols', { ref: true, notes: true });
  const refNames = { vi: 'Bản dịch máy', src: 'Bản gốc' };
  const hasNotes = info.linked && !info.error && (info.notes?.length || info.entities?.length);

  body.innerHTML = `<div class="desk${cols.ref ? '' : ' no-ref'}${cols.notes ? '' : ' no-notes'}${scenes.length ? ' has-scenes' : ''}">
    <div class="desk-bar">
      <div class="seg" id="d-view">
        <button data-view="ref" class="${cols.ref ? 'on' : ''}" title="Bản đối chiếu bên trái, bản của bạn bên phải">Đối chiếu</button>
        <button data-view="mine" class="${cols.ref ? '' : 'on'}" title="Chỉ ô viết">Bản của bạn</button>
        <button id="d-scenes" title="Mọi thẻ cảnh của chương này, và mỗi cảnh đã viết tới đâu">Thẻ cảnh</button>
        <button id="d-focus" title="Tập trung: chỉ còn ô viết, đoạn đang viết sáng lên, dòng đang gõ giữ ở giữa màn hình">Tập trung</button>
      </div>
      <button class="btn ghost sm" id="d-find">${icon('search')} Tìm – thay</button>
      <button class="btn ghost sm" id="d-hist" title="Các bản lưu trước của bạn cho chương này">${icon('list')} Lịch sử</button>
      <details class="menu">
        <summary class="btn ghost sm">Kiểm tra ▾</summary>
        <div class="menu-pop">
          <span class="menu-h">Đánh dấu trong ô viết</span>
          <label class="check" title="Gạch chân tên nhân vật, nơi chốn có note trong vault. Ctrl + bấm vào tên để mở note."><input type="checkbox" data-mark="names" ${marks.names ? 'checked' : ''}> Tên riêng</label>
          <label class="check" title="Gạch lượn sóng chữ không thể là âm tiết tiếng Việt"><input type="checkbox" data-mark="spell" ${marks.spell ? 'checked' : ''}> Chữ lạ</label>
          <label class="check" title="Tô từ và cụm từ lặp lại gần nhau"><input type="checkbox" data-mark="reps" ${marks.reps ? 'checked' : ''}> Từ lặp</label>
          <label class="check" title="Biểu đồ độ dài từng câu; gạch chân câu từ ${DESK_LONG} chữ"><input type="checkbox" data-mark="rhythm" ${marks.rhythm ? 'checked' : ''}> Nhịp câu</label>
          <hr>
          <button class="menu-item" id="d-spell" title="Chữ gõ sai, khoảng trắng thừa, chữ lặp liền nhau — kèm gợi ý sửa">Danh sách chính tả…</button>
          <button class="menu-item" id="d-check" title="Chạy style_metrics và ai_tells_check của vault trên bản đang sửa. Chạy tại máy, không gửi đi đâu.">Kiểm văn (style_metrics, ai_tells)…</button>
        </div>
      </details>
      <span class="desk-chips" id="d-marks-stat"></span>
      <span class="spacer"></span>
      <details class="menu right">
        <summary class="btn ghost sm">⋯ Thêm</summary>
        <div class="menu-pop">
          <button class="menu-item" id="d-snip" title="Bảng tự sửa khi gõ">Bảng tự sửa…</button>
          <button class="menu-item" id="d-goal" title="Mục tiêu số chữ cho chương và cho mỗi ngày; nhật ký 14 ngày">Mục tiêu &amp; nhật ký…</button>
          <button class="menu-item" id="d-file" title="Ghi bản đã lưu thành file .md vào vault, cạnh chương">Lưu thành file…</button>
          <hr>
          <button class="menu-item danger" id="d-drop" ${edit.exists ? '' : 'disabled'} title="Xoá bản của bạn trong trạm, quay về bản đối chiếu">Bỏ bản sửa</button>
        </div>
      </details>
      <span class="small muted" id="d-state"></span>
      <button class="btn ghost" id="d-revert" disabled title="Đưa bản của bạn về đúng như lúc mở chương này. Các bản lưu từ lúc mở vẫn còn trong Lịch sử.">Bỏ thay đổi</button>
      <button class="btn primary" id="e-save">Lưu</button>
    </div>
    <div class="notice warn" id="d-moved" ${edit.base_changed ? '' : 'hidden'}>Bản đối chiếu đã đổi sau lần lưu gần nhất của bạn — ví dụ bản nháp vừa được lấy lại từ vault. Bản của bạn còn nguyên; đoạn có vạch màu là chỗ hai bản đang khác nhau.</div>
    <div class="desk-rhythm" id="d-rhythm" hidden title="Mỗi cột là một câu, cao theo số chữ. Vàng: bốn câu liền dài gần bằng nhau. Đỏ: câu dài. Bấm để tới câu đó."></div>
    <div class="desk-cols">
      <section class="desk-col" id="d-ref-col">
        <div class="col-head"><span>Đối chiếu: ${both
    ? `<span class="seg sm" id="d-ref-pick">${['vi', 'src'].map((k) => `<button data-ref="${k}" class="${k === edit.base ? 'on' : ''}">${refNames[k]}</button>`).join('')}</span>`
    : refNames[edit.base]}</span><span id="d-ref-count"></span></div>
        <div class="desk-ref" id="d-ref" title="Bấm một đoạn để nhảy tới đoạn tương ứng trong bản của bạn"></div>
        <div class="desk-ref" id="d-listen"></div>
      </section>
      <section class="desk-col">
        <div class="col-head"><span>Bản của bạn <span class="line-legend" id="d-line-legend" hidden><b class="m-line-key" aria-hidden="true"></b>dòng có chỗ lặp / chữ lạ</span></span><span id="d-mine-count"></span></div>
        <div class="desk-edit"><div class="desk-back" id="d-back"></div><div class="desk-sbars" id="d-sbars"><div></div></div><textarea id="d-mine" spellcheck="false"></textarea></div>
      </section>
      <section class="desk-col" id="d-notes-col">
        <div class="col-head">${hasNotes ? `<select id="d-note">${deskNoteOptions(info)}</select>` : '<span>Kế hoạch · dàn ý</span>'}<button class="icon-btn" id="d-notes-close" title="Đóng ngăn" aria-label="Đóng ngăn kế hoạch">✕</button></div>
        <div class="desk-note" id="d-note-body">${hasNotes ? '' : `<p class="muted">${esc(info.error || (info.linked ? 'Project này chưa có note dàn ý hay arc nào.' : 'Sách này chưa gắn nguồn vault nên không có dàn ý để hiện. Gắn ở trang sách, mục nguồn vault.'))}</p>`}</div>
      </section>
      <section class="desk-col" id="d-scene-col">
        <div class="col-head"><span>Thẻ cảnh</span><span id="d-scene-count"></span></div>
        <div class="desk-note" id="d-scene-body"></div>
      </section>
    </div>
    <nav class="desk-rail" aria-label="Ngăn bên">
      <button id="d-show-notes" class="${cols.notes ? 'on' : ''}" title="Kế hoạch chương, dàn ý trong vault">${icon('toc')}<span>Kế hoạch</span></button>
      <button id="d-rail-scenes" title="Thẻ cảnh">${icon('names')}<span>Thẻ cảnh</span></button>
      <button id="d-rail-goal" title="Mục tiêu">⚡<span>Mục tiêu</span></button>
      <button id="d-rail-spell" title="Chính tả">${icon('search')}<span>Chính tả</span></button>
    </nav>
    <footer class="desk-status"><span class="muted small" id="d-stat"></span><span class="small desk-day" id="d-day" title="Bấm để xem nhật ký viết và đặt mục tiêu"></span><span class="spacer"></span><span class="muted small">Ctrl+S lưu · Ctrl+F tìm · Alt + bấm dòng dàn ý để chèn mốc</span></footer>
  </div>`;

  const ta = $('#d-mine'), refEl = $('#d-ref'), desk = $('.desk');
  let barsAt = 0;      // columns opening or closing, focus mode, the window: any width change moves the line breaks the bars follow
  new ResizeObserver(() => { cancelAnimationFrame(barsAt); barsAt = requestAnimationFrame(deskDrawSceneBars); }).observe(ta);
  ta.value = start;
  deskState.openText = start;
  deskRefresh();
  deskSetState(edit.exists ? 'đã lưu trong trạm' : 'chưa có bản sửa, đang là bản đối chiếu', edit.exists ? edit.saved_path : '');

  ta.oninput = (e) => {
    deskPopClose();
    if (e.inputType === 'insertText') deskExpand(ta);
    deskRevertState();
    deskSetState('đang gõ');
    deskDrawMarks();
    deskTypewriter();
    clearTimeout(deskState.timer);
    deskState.timer = setTimeout(() => $('#d-mine') && deskRefresh(), 350);
    clearTimeout(deskState.saver);
    deskState.saver = setTimeout(guard(async () => { if ($('#d-mine') === ta && deskDirty()) await deskSave(); }), DESK_AUTOSAVE_MS);
  };
  $('#d-note-body').onclick = (e) => {
    const line = e.target.closest('[data-ins]');
    if (line && e.altKey) { e.preventDefault(); deskInsertMark(line.dataset.ins); }
  };
  let syncing = false;
  const sync = (from, to) => () => {
    if (syncing) return;
    syncing = true;
    to.scrollTop = (from.scrollTop / Math.max(1, from.scrollHeight - from.clientHeight)) * (to.scrollHeight - to.clientHeight);
    requestAnimationFrame(() => { syncing = false; });
  };
  const follow = sync(ta, refEl);
  ta.onscroll = () => { $('#d-back').scrollTop = ta.scrollTop; follow(); deskPopPlace(); deskScrollBars(); };
  ta.onkeydown = (e) => { if (e.key === 'Escape') deskPopClose(); };
  ta.onclick = (e) => {      // Ctrl + click on a marked name opens its vault note; a plain click on a flagged word opens its popup
    const at = ta.selectionStart, scan = deskState.scan;
    if (e.ctrlKey || e.metaKey) {
      const hit = (scan?.names || []).find((n) => n.a <= at && at <= n.b);
      if (hit) deskOpenEntity(hit.rel);
      return;
    }
    if (!scan || at !== ta.selectionEnd) return;
    const on = { spell: true, ...store('desk_marks', { names: true, reps: true, rhythm: false }) };
    for (const [kind, list, shown] of [['spell', scan.spell.bad, on.spell], ['dbl', scan.dbl, on.reps], ['reps', scan.reps, on.reps]]) {
      const hit = shown && list.find((r) => r.a <= at && at <= r.b);
      if (hit) return deskPop(kind, hit);
    }
    deskPopClose();
  };
  $$('[data-mark]').forEach((box) => box.onchange = () => {
    const m = store('desk_marks', { names: true, reps: true, rhythm: false });
    m[box.dataset.mark] = box.checked;
    save('desk_marks', m);
    deskDrawMarks();
  });
  $('#d-marks-stat').onclick = (e) => {
    const b = e.target.closest('[data-jump]');
    if (b) deskJump(b.dataset.jump, +b.dataset.dir);
  };
  $('#d-rhythm').onclick = (e) => {
    const s = deskState.scan?.sents[+e.target.closest('[data-s]')?.dataset.s];
    if (s) deskSelect(s.a, s.b);
  };
  refEl.onscroll = sync(refEl, ta);
  refEl.onclick = (e) => {
    const p = e.target.closest('[data-r]');
    if (!p || window.getSelection()?.toString()) return;
    syncing = true;
    deskGoToLine(deskState.map[+p.dataset.r]);
    requestAnimationFrame(() => { syncing = false; });
  };

  $$('#d-ref-pick button').forEach((b) => b.onclick = () => {
    deskState.ref = b.dataset.ref;
    $$('#d-ref-pick button').forEach((x) => x.classList.toggle('on', x === b));
    if (!deskState.exists && !deskDirty()) {      // nothing written yet: start from the text now on show
      deskState.base = deskState.ref;
      ta.value = deskState.snapshot = deskParas(deskRefText(ch, deskState.ref)).join('\n');
    }
    deskRefresh();
  });
  const setCol = (key, on) => {
    const c = store('desk_cols', { ref: true, notes: true });
    c[key] = on;
    save('desk_cols', c);
    desk.classList.toggle(key === 'ref' ? 'no-ref' : 'no-notes', !on);
    deskDrawScenes();
  };
  $$('#d-view [data-view]').forEach((b) => b.onclick = () => {
    if (desk.classList.contains('focus')) deskFocus(false);
    setCol('ref', b.dataset.view === 'ref');
    $$('#d-view [data-view]').forEach((x) => x.classList.toggle('on', x === b));
  });
  $('#d-show-notes').onclick = () => { const on = desk.classList.contains('no-notes'); setCol('notes', on); $('#d-show-notes').classList.toggle('on', on); };
  $('#d-notes-close').onclick = () => { setCol('notes', false); $('#d-show-notes').classList.remove('on'); };
  $('#d-rail-scenes').onclick = guard(deskSceneBoard);
  $('#d-scene-body').onclick = (e) => {
    const b = e.target.closest('[data-sc]');
    if (b && deskSceneAct(deskState.scenes[+b.dataset.i], b.dataset.sc)) deskDrawScenes();
  };
  $('#d-rail-goal').onclick = guard(deskGoalDialog);
  $('#d-rail-spell').onclick = () => deskSpellDialog();
  // a menu closes once one of its actions is picked, and when clicking elsewhere
  $$('.desk .menu').forEach((m) => m.addEventListener('click', (e) => { if (e.target.closest('.menu-item')) m.open = false; }));

  if (hasNotes) {
    $('#d-note').onchange = guard(() => deskLoadNote($('#d-note').value));
    guard(deskLoadNote)($('#d-note').value);
  }

  $('#e-save').onclick = guard(async () => { await deskSave(); toast('Đã lưu bản của bạn'); });
  $('#d-revert').onclick = guard(async () => {
    if (ta.value === deskState.openText) return;
    if (!await confirmBox('Bỏ thay đổi', 'Đưa bản của bạn về đúng như lúc mở chương này? Mọi thứ gõ hoặc tự lưu từ lúc mở sẽ bị bỏ; các bản đã lưu vẫn còn trong Lịch sử.', 'Bỏ thay đổi', true)) return;
    ta.value = deskState.openText;
    ta.dispatchEvent(new Event('input'));
    deskRefresh();
    toast('Đã đưa về bản lúc mở chương');
  });
  $('#d-find').onclick = deskFindDialog;
  $('#d-listen').onclick = (e) => {
    const p = e.target.closest('[data-l]');
    if (p && !window.getSelection()?.toString()) deskGoToLine(+p.dataset.l);
  };
  $('#d-snip').onclick = guard(deskSnipDialog);
  $('#d-hist').onclick = guard(deskHistoryDialog);
  $('#d-goal').onclick = $('#d-day').onclick = guard(deskGoalDialog);
  $('#d-focus').onclick = () => deskFocus(!desk.classList.contains('focus'));
  $('#d-scenes').onclick = guard(deskSceneBoard);
  $('#d-spell').onclick = deskSpellDialog;
  api('/api/writing').then(deskDay).catch(() => {});
  $('#d-check').onclick = guard(deskCheck);
  $('#d-file').onclick = guard(deskFileDialog);
  $('#d-drop').onclick = guard(async () => {
    if (!await confirmBox('Bỏ bản sửa', 'Xoá bản của bạn cho chương này trong trạm? File đã ghi ra (nếu có) không bị đụng tới.', 'Xoá', true)) return;
    await api(`/api/chapters/${ch.id}/edit`, { method: 'DELETE' });
    const row = readerState.book?.chapters.find((c) => c.id === ch.id);
    if (row) row.has_edit = 0;
    drawDesk(body);
  });
}

function deskFindDialog() {
  const ta = $('#d-mine');
  const picked = ta.value.slice(ta.selectionStart, ta.selectionEnd);
  let before = null;
  const m = modal({
    title: 'Tìm – thay trong bản của bạn',
    body: `<label class="field">Tìm<input type="text" id="df-find" value="${esc(picked.includes('\n') ? '' : picked)}"></label>
      <label class="field">Thay bằng<input type="text" id="df-rep"></label>
      <label class="small"><input type="checkbox" id="df-case"> Phân biệt hoa thường</label>
      <p class="muted small" id="df-count"></p>`,
    actions: [
      { label: 'Đóng' },
      { label: 'Hoàn tác', onClick: () => {
        if (before == null) return false;
        ta.value = before; before = null; ta.dispatchEvent(new Event('input')); count();
        return false;
      } },
      { label: 'Thay tất cả', primary: true, onClick: () => {
        const rx = pattern();
        if (!rx) return false;
        const n = (ta.value.match(rx) || []).length;
        if (n) { before = ta.value; ta.value = ta.value.replace(rx, () => $('#df-rep', m.el).value); ta.dispatchEvent(new Event('input')); }
        $('#df-count', m.el).textContent = n ? `Đã thay ${n} chỗ. Bấm “Hoàn tác” để trả lại.` : 'Không thấy chỗ nào.';
        return false;
      } },
    ],
  });
  const pattern = () => {
    const q = $('#df-find', m.el).value;
    return q ? new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $('#df-case', m.el).checked ? 'g' : 'gi') : null;
  };
  const count = () => {
    const rx = pattern();
    $('#df-count', m.el).textContent = rx ? `${(ta.value.match(rx) || []).length} chỗ khớp` : '';
  };
  $('#df-find', m.el).oninput = $('#df-case', m.el).onchange = count;
  count();
}

function deskLoadAuto(settings, bookId) {
  const a = settings.desk_auto || {};
  deskState.snip = deskParseSnips((settings.desk_snippets || {})[bookId]);
  deskState.auto = { global: deskParseSnips(a.global), off: new Set(a.off || []), on: new Set(a.on || []) };
  deskState.autoShort = settings.desk_auto_short !== false;
}

/* The auto-correct table: what a typed word turns into. Three sources, in the order they win:
   this book's own entries, the entries for every book, then the built-in shorthand — each
   built-in row can be switched on or off. */
async function deskSnipDialog() {
  const bookId = readerState.chapter.book_id;
  const settings = await api('/api/settings');
  const snippets = settings.desk_snippets || {};
  const a = settings.desk_auto || {};
  const book = [...deskParseSnips(snippets[bookId])];
  const global = [...deskParseSnips(a.global)];
  const off = new Set(a.off || []), on = new Set(a.on || []);
  let filter = '';

  const rows = () => {
    const mine = new Set([...book, ...global].map(([k]) => k.toLowerCase()));
    const list = [
      ...book.map(([from, to], i) => ({ from, to, src: 'book', i })),
      ...global.map(([from, to], i) => ({ from, to, src: 'global', i })),
      ...[...DESK_SHORT_SAFE].map(([from, to]) => ({ from, to, src: 'safe', active: !off.has(from), hidden: mine.has(from) })),
      ...[...DESK_SHORT_LOOSE].map(([from, to]) => ({ from, to, src: 'loose', active: on.has(from), hidden: mine.has(from) })),
    ];
    const q = filter.trim().toLowerCase();
    return list.filter((r) => !q || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q));
  };
  const LABEL = { book: 'Sách này', global: 'Mọi sách', safe: 'Có sẵn', loose: 'Có sẵn · nhiều nghĩa' };
  const table = () => {
    const list = rows();
    return list.length ? `<table class="spell auto-table"><thead><tr><th style="width:34px">Bật</th><th>Gõ</th><th>Thành</th><th>Nguồn</th><th></th></tr></thead><tbody>${list.map((r) => `<tr class="${r.hidden ? 'off' : ''}">
        <td>${r.src === 'book' || r.src === 'global' ? '<input type="checkbox" checked disabled title="Mục bạn thêm luôn bật; xoá nếu không dùng">'
    : `<input type="checkbox" data-tog="${esc(r.from)}" data-src="${r.src}" ${r.active ? 'checked' : ''} ${r.hidden ? 'disabled' : ''}>`}</td>
        <td><b>${esc(r.from)}</b></td><td>${esc(r.to)}</td>
        <td class="muted small">${LABEL[r.src]}${r.hidden ? ' · bị mục của bạn che' : ''}</td>
        <td class="r">${r.src === 'book' || r.src === 'global' ? `<button class="btn sm ghost" data-del="${r.src}" data-i="${r.i}">Xoá</button>` : ''}</td></tr>`).join('')}</tbody></table>`
      : '<p class="muted small">Không có mục nào khớp.</p>';
  };
  const count = () => `${book.length} của sách · ${global.length} dùng chung · ${[...DESK_SHORT_SAFE.keys()].filter((k) => !off.has(k)).length + on.size} có sẵn đang bật`;

  const m = modal({
    title: 'Tự sửa khi gõ', wide: true,
    body: `<p class="muted small">Gõ chữ ở cột “Gõ” rồi dấu cách hoặc dấu câu, trạm thay bằng cột “Thành”. Dùng cho viết tắt (<code>bh → Boothill</code>), cho lỗi bạn hay gõ nhầm (<code>nguời → người</code>), hay bất cứ chữ nào. Phân biệt hoa thường ở mục bạn thêm; mục có sẵn giữ chữ hoa đầu.</p>
      <div class="auto-add">
        <input type="text" id="da-from" placeholder="Gõ" spellcheck="false">
        <span class="muted">→</span>
        <input type="text" id="da-to" placeholder="Thành" spellcheck="false">
        <select id="da-scope"><option value="book">Sách này</option><option value="global">Mọi sách</option></select>
        <button class="btn sm primary" id="da-add">Thêm</button>
      </div>
      <div class="auto-add">
        <input type="search" id="da-filter" placeholder="Lọc trong bảng">
        <span class="muted small" id="da-count">${count()}</span>
      </div>
      <div class="auto-wrap" id="da-table">${table()}</div>
      <label class="check" style="margin-top:8px"><input type="checkbox" id="ds-auto" ${settings.desk_auto_short !== false ? 'checked' : ''}> Cho các mục có sẵn tự sửa khi gõ (tắt ô này thì chỉ còn mục bạn thêm)</label>`,
    actions: [
      { label: 'Huỷ' },
      { label: 'Hoàn thiện viết tắt trong bài…', onClick: async (b) => { await persist(b); setTimeout(deskShortDialog, 0); } },
      { label: 'Lưu', primary: true, onClick: async (b) => { await persist(b); toast(`Đã lưu: ${count()}`); } },
    ],
  });
  const lines = (pairs) => pairs.map(([from, to]) => `${from}=${to}`).join('\n');
  async function persist(b) {
    const body = {
      desk_snippets: { ...snippets, [bookId]: lines(book) },
      desk_auto: { global: lines(global), off: [...off], on: [...on] },
      desk_auto_short: $('#ds-auto', b).checked,
    };
    await api('/api/settings', { method: 'PUT', body });
    deskLoadAuto(body, bookId);
  }
  const redraw = () => { $('#da-table', m.el).innerHTML = table(); $('#da-count', m.el).textContent = count(); };
  const add = () => {
    const from = $('#da-from', m.el).value.trim(), to = $('#da-to', m.el).value.trim();
    if (!from || !to) return toast('Điền cả hai ô “Gõ” và “Thành”', true);
    if (/[\s=]/.test(from)) return toast('Ô “Gõ” là một chữ liền, không có dấu cách hay dấu =', true);
    const list = $('#da-scope', m.el).value === 'global' ? global : book;
    const at = list.findIndex(([k]) => k === from);
    if (at >= 0) list[at] = [from, to]; else list.unshift([from, to]);
    $('#da-from', m.el).value = $('#da-to', m.el).value = '';
    $('#da-from', m.el).focus();
    redraw();
  };
  $('#da-add', m.el).onclick = add;
  $('#da-to', m.el).onkeydown = (e) => { if (e.key === 'Enter') add(); };
  $('#da-filter', m.el).oninput = (e) => { filter = e.target.value; redraw(); };
  m.el.onclick = (e) => {
    const del = e.target.closest('[data-del]');
    if (del) { (del.dataset.del === 'global' ? global : book).splice(+del.dataset.i, 1); redraw(); }
  };
  m.el.onchange = (e) => {
    const t = e.target.closest('[data-tog]');
    if (!t) return;
    const key = t.dataset.tog;
    if (t.dataset.src === 'safe') { if (t.checked) off.delete(key); else off.add(key); }
    else if (t.checked) on.add(key); else on.delete(key);
    $('#da-count', m.el).textContent = count();
  };
}

async function deskHistoryDialog() {
  const ch = readerState.chapter;
  const list = await api(`/api/chapters/${ch.id}/edit/history`);
  const when = (t) => new Date(t * 1000).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const m = modal({
    title: 'Các bản lưu trước của bạn', wide: true,
    body: list.length
      ? `<p class="muted small">Trạm giữ lại một bản mỗi khoảng mười phút bạn viết, tối đa 20 bản cho một chương. Bấm một bản để xem; “Lấy lại” đưa nó vào ô viết, bản hiện tại thành một mốc lịch sử mới.</p>
        <div class="hist"><div class="hist-list">${list.map((h) => `<button class="btn sm" data-h="${h.id}">${when(h.saved)} · ${h.chars} ký tự</button>`).join('')}</div>
        <pre class="check-out" id="dh-view">Chọn một bản ở bên trái.</pre></div>`
      : '<p class="muted">Chưa có bản lưu trước nào cho chương này.</p>',
    actions: [
      { label: 'Đóng' },
      ...(list.length ? [{ label: 'Lấy lại bản đang xem', primary: true, onClick: () => {
        if (m.picked == null) return false;
        $('#d-mine').value = m.picked;
        $('#d-mine').dispatchEvent(new Event('input'));
      } }] : []),
    ],
  });
  m.el.onclick = guard(async (e) => {
    const b = e.target.closest('[data-h]');
    if (!b) return;
    m.picked = (await api(`/api/edit-history/${b.dataset.h}`)).content;
    $('#dh-view', m.el).textContent = m.picked.split('\n').join('\n\n');
    $$('[data-h]', m.el).forEach((x) => x.classList.toggle('primary', x === b));
  });
}

async function deskCheck() {
  const btn = $('#d-check');
  btn.disabled = true;
  try {
    const r = await api(`/api/chapters/${readerState.chapter.id}/edit/check`, { method: 'POST', body: { content: $('#d-mine').value } });
    modal({
      title: `Kiểm văn — đo theo project ${r.project}`, wide: true,
      body: r.reports.map((x) => `<h4 class="check-h">${esc(x.tool)}${x.exit == null ? '' : ` <span class="muted small">exit ${x.exit}</span>`}</h4><pre class="check-out">${esc(x.output || '(không có gì để báo)')}</pre>`).join(''),
      actions: [{ label: 'Đóng', primary: true }],
    });
  } finally { btn.disabled = false; }
}

async function deskFileDialog() {
  const ch = readerState.chapter;
  if (deskDirty() || !deskState.exists) await deskSave();
  const write = async (where) => {
    let r = await api(`/api/chapters/${ch.id}/edit/file`, { method: 'POST', body: { where } });
    if (r.exists) {
      if (!await confirmBox('File đã có', `${esc(r.path)} là file Trạm Dịch ghi lần trước. Ghi đè bằng bản hiện tại?`, 'Ghi đè')) return;
      r = await api(`/api/chapters/${ch.id}/edit/file`, { method: 'POST', body: { where, overwrite: true } });
    }
    deskSetState('đã lưu', r.path);
    toast(`Đã ghi ${r.path}`, false, 6000);
  };
  modal({
    title: 'Lưu bản của bạn thành file',
    body: `<p>File mới tên <code>…-aurel-viet-lai.md</code>. Note chương trong vault không bao giờ bị ghi đè.</p>
      <p class="muted small"><b>Vault</b>: note mới nằm cạnh note chương, có frontmatter, <code>status: draft</code>. Cây chính của vault sẽ có file chưa commit.</p>`,
    actions: [
      { label: 'Huỷ' },
      { label: 'Ghi vào vault, cạnh chương', primary: true, onClick: () => write('vault') },
    ],
  });
}

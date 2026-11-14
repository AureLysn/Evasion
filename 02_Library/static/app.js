/* Kệ Sách — front end. Plain JS, no build step. Screens: library (grid / list), series, reader (text, comic), source. */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = (k, d) => { try { const v = localStorage.getItem('ks_' + k); return v == null ? d : JSON.parse(v); } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem('ks_' + k, JSON.stringify(v)); } catch { /* private window */ } };
const main = $('#main');

const THEMES = { tokyo: ['Tokyo (tối)', false], 'than-am': ['Than ấm', false], kem: ['Kem', true], 'giay-am': ['Giấy ấm', true], 'suong-xanh': ['Sương xanh', true], trang: ['Trắng', true], sepia: ['Sepia', true] };
function setTheme(k) {
  if (!THEMES[k]) k = 'tokyo';
  const r = document.documentElement;
  k === 'tokyo' ? r.removeAttribute('data-theme') : r.setAttribute('data-theme', k);
  THEMES[k][1] ? r.setAttribute('data-light', '') : r.removeAttribute('data-light');
  save('theme', k);
}
setTheme(store('theme', 'tokyo'));
$('#side-host').textContent = location.host;

let toastTimer;
function toast(msg, err = false) {
  const t = $('#toast');
  t.textContent = msg; t.hidden = false; t.classList.toggle('err', err);
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 4500);
}
async function api(path, opt = {}) {
  const r = await fetch('/api/' + path, { method: opt.method || 'GET', body: opt.body ? JSON.stringify(opt.body) : undefined, headers: opt.body ? { 'Content-Type': 'application/json' } : {} });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}

const KIND = { comic: 'Truyện tranh', text: 'Truyện chữ', mixed: 'Hỗn hợp' };
const COVER_COLORS = ['#6b5f40', '#41705a', '#3f6c66', '#6c4d66', '#4d6c48', '#3d6079'];
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
function code(title) {
  const w = title.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'D').match(/[A-Za-z0-9]+/g) || ['?'];
  return (w.length > 1 ? w.slice(0, 4).map((x) => x[0]).join('') : w[0].slice(0, 5)).toUpperCase();
}
function coverHtml(s, pct) {
  const img = s.kind !== 'text' ? `<img data-thumb="thumb/${s.id}/cover" data-full="/api/cover/${s.id}" data-w="320" alt="">` : '';
  return `<div class="cover" style="background:${COVER_COLORS[hash(s.title) % COVER_COLORS.length]}"><span>${esc(code(s.title))}</span>${img}<span class="kind">${s.kind === 'comic' ? 'Tranh' : s.kind === 'text' ? 'Chữ' : 'Hỗn hợp'}</span>${pct ? `<i class="prog" style="width:${pct}%"></i>` : ''}</div>`;
}
const progPct = (s) => (s.chapters ? Math.round((s.read / s.chapters) * 100) : 0);

/* ---------- library ---------- */
let state = { kind: '', shelf: store('shelf', ''), fandom: null, group: null, view: store('view', 'grid'), q: '', minRating: 0, sort: 'name', tags: [] };
const tagId = (t) => `${t.kind}|${t.name}`;
const KIND_TAG = { fandom: 'Fandom', character: 'Nhân vật', au: 'AU', other: 'Khác' };
const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
const noName = (v, what) => v || `(Không ${what})`;
const cardTitle = (s) => (s.loose ? `Chương lẻ · ${s.group || s.fandom || 'gốc'}` : s.title);
const cardCount = (g) => g.series + (g.loose ? 1 : 0);
async function renderLibrary() {
  const st = await api('state');
  if (state.shelf && !st.shelves.some((x) => x.id === state.shelf)) { state.shelf = ''; save('shelf', ''); }   // that shelf was removed
  const [all, tree, tags] = await Promise.all([api('series'), api('tree' + (state.shelf ? '?shelf=' + encodeURIComponent(state.shelf) : '')), api('tags')]);
  const list = state.shelf ? all.filter((s) => s.shelf === state.shelf) : all;   // everything below works on the chosen shelf (or all of them)
  window.ksWrite = !!st.write; window.ksShelves = st.shelves; drawTree(tree); drawTags(tags);
  $('#n-all').textContent = list.length;
  $('#n-comic').textContent = list.filter((s) => s.kind === 'comic').length;
  $('#n-text').textContent = list.filter((s) => s.kind === 'text').length;
  $$('[data-kind]').forEach((b) => b.classList.toggle('active', b.dataset.kind === state.kind));
  if (!st.shelves.length || st.error) {
    main.innerHTML = `<div class="page-head"><h1>Thư viện</h1></div><div class="empty"><h2>${st.shelves.length ? 'Không mở được kệ nào' : 'Chưa có kệ nào'}</h2>
      <p>${esc(st.error || 'Thêm một kệ: một thư mục trên Drive (hoặc ổ nào đó) chứa truyện.')}</p><a class="btn primary" href="#/settings">${st.shelves.length ? 'Mở Cài đặt' : 'Thêm kệ'}</a></div>`;
    return;
  }
  const bad = st.shelves.filter((x) => x.error && (!state.shelf || x.id === state.shelf));
  const multi = st.shelves.length > 1, shelfName = (id) => st.shelves.find((x) => x.id === id)?.name || '';
  // writing to Drive works inside ONE shelf: the chosen one, or the only shelf that has the fandom / group being viewed
  const wShelf = state.shelf || (() => { const ids = [...new Set(list.filter((s) => s.fandom === state.fandom && (state.group === null || s.group === state.group)).map((s) => s.shelf))]; return ids.length === 1 ? ids[0] : ''; })();
  let show = list.filter((s) => (!state.kind || s.kind === state.kind) && (state.fandom === null || s.fandom === state.fandom) && (state.group === null || s.group === state.group) && (!state.q || (s.title + ' ' + s.where).toLowerCase().includes(state.q.toLowerCase())) && (s.rating || 0) >= state.minRating && state.tags.every((id) => (s.tags || []).some((t) => tagId(t) === id)));
  if (state.sort === 'rating') show.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const cards = state.view === 'grid'
    ? `<div class="lib-grid">${show.map((s) => `<a class="card" href="#/series/${s.id}"${s.loose ? '' : ` data-sid="${s.id}"`}>${coverHtml(s, progPct(s))}<b>${esc(cardTitle(s))}</b><span class="muted small">${KIND[s.kind]} · ${s.chapters} chương${s.group && state.group === null ? ' · ' + esc(s.group) : ''}${multi && !state.shelf ? ' · ' + esc(shelfName(s.shelf)) : ''}</span>${s.rating ? `<span class="stars-s" title="${s.rating} sao">${stars(s.rating)}</span>` : ''}</a>`).join('')}</div>`
    : `<div class="lib-list">${show.map((s) => `<a class="lib-row" href="#/series/${s.id}"${s.loose ? '' : ` data-sid="${s.id}"`}>${coverHtml(s, progPct(s))}<span><b>${esc(cardTitle(s))}</b><br><span class="muted small">${multi && !state.shelf ? esc(shelfName(s.shelf)) + ' · ' : ''}${esc(s.where)}</span></span><span>${KIND[s.kind]}${s.rating ? ` <span class="stars-s">${stars(s.rating)}</span>` : ''}</span><span class="muted">${s.chapters} chương</span></a>`).join('')}</div>`;
  main.innerHTML = `<div class="page-head"><h1>${esc(state.fandom === null ? 'Thư viện' : state.group === null ? noName(state.fandom, 'fandom') : noName(state.group, 'nhóm'))} <small>${show.length}${show.length === list.length ? '' : ' / ' + list.length} mục</small></h1>
      <div class="row">${st.write && wShelf && state.fandom && state.group ? '<button class="btn" id="g-rename">Đổi tên nhóm…</button><button class="btn" id="g-move">Chuyển nhóm…</button>' : st.write && wShelf && state.fandom && state.group === null ? '<button class="btn" id="f-rename">Đổi tên fandom…</button><button class="btn" id="f-merge">Gộp vào fandom khác…</button>' : ''}<button class="btn" id="rescan">${multi && state.shelf ? 'Quét lại kệ này' : 'Quét lại'}</button></div></div>
    ${bad.map((x) => `<div class="info-banner warn-banner" role="alert">⚠ Kệ “${esc(x.name)}” không đọc được: ${esc(x.error)}</div>`).join('')}
    ${st.write && !wShelf && state.fandom ? '<p class="muted small">Fandom này có ở nhiều kệ. Muốn đổi tên hoặc chuyển nó trên Drive, chọn một kệ ở bộ lọc “Kệ” trước.</p>' : ''}
    <div class="toolbar">${multi ? `<label class="inl">Kệ <select id="f-shelf" aria-label="Lọc theo kệ"><option value="">Tất cả kệ</option>${st.shelves.map((x) => `<option value="${esc(x.id)}"${state.shelf === x.id ? ' selected' : ''}>${esc(x.name)}</option>`).join('')}</select></label>` : ''}<input type="search" id="q" placeholder="Tìm tên bộ hoặc thư mục…" value="${esc(state.q)}" aria-label="Tìm">
      <label class="inl">Đánh giá <select id="f-rating" aria-label="Lọc theo đánh giá">${[0, 1, 2, 3, 4, 5].map((n) => `<option value="${n}"${state.minRating === n ? ' selected' : ''}>${n ? '★ ' + n + ' trở lên' : 'Tất cả'}</option>`).join('')}</select></label>
      <label class="inl">Xếp theo <select id="f-sort" aria-label="Sắp xếp"><option value="name"${state.sort === 'name' ? ' selected' : ''}>Tên</option><option value="rating"${state.sort === 'rating' ? ' selected' : ''}>Đánh giá cao trước</option></select></label>
      <div class="seg" role="group" aria-label="Kiểu xem"><button data-view="grid" class="${state.view === 'grid' ? 'on' : ''}">Lưới</button><button data-view="list" class="${state.view === 'list' ? 'on' : ''}">Danh sách</button></div></div>
    ${show.length ? cards : `<div class="empty"><h2>${list.length ? 'Không có bộ nào khớp' : 'Thư mục này chưa có truyện nào nhận ra được'}</h2><p class="small">Nhận .txt .md .epub .cbz .zip và thư mục ảnh. Xem README.</p></div>`}`;
  ksThumbs(main);
  $('#q').oninput = (e) => { state.q = e.target.value; const pos = e.target.selectionStart; renderLibrary().then(() => { const q = $('#q'); q.focus(); q.setSelectionRange(pos, pos); }); };
  if ($('#f-shelf')) $('#f-shelf').onchange = (e) => { state.shelf = e.target.value; save('shelf', state.shelf); state.fandom = null; state.group = null; renderLibrary(); };
  $('#f-rating').onchange = (e) => { state.minRating = +e.target.value; renderLibrary(); };
  $('#f-sort').onchange = (e) => { state.sort = e.target.value; renderLibrary(); };
  $$('[data-view]').forEach((b) => b.onclick = () => { state.view = b.dataset.view; save('view', state.view); renderLibrary(); });
  if ($('#f-merge')) $('#f-merge').onclick = () => mergeFandom(state.fandom, wShelf);
  if ($('#f-rename')) $('#f-rename').onclick = async () => {
    const n = await askName('Đổi tên fandom', state.fandom);
    if (!n || n === state.fandom) return;
    try {
      const p = await driveApi('plan', { rename: 'fandom', target: state.fandom, new_name: n, shelf: wShelf });
      confirmMove(p, () => { state.fandom = p.dest; renderLibrary(); });
    } catch (e) { toast(e.message, true); }
  };
  if ($('#g-move')) $('#g-move').onclick = () => moveGroup(state.fandom, state.group, wShelf);
  if ($('#g-rename')) $('#g-rename').onclick = async () => {
    const n = await askName('Đổi tên nhóm', state.group);
    if (!n || n === state.group) return;
    try {
      const p = await driveApi('plan', { rename: 'group', target: `${state.fandom}/${state.group}`, new_name: n, shelf: wShelf });
      confirmMove(p, () => { state.group = p.dest; renderLibrary(); });
    } catch (e) { toast(e.message, true); }
  };
  $('#rescan').onclick = async () => { const r = await api('rescan', { method: 'POST', body: state.shelf ? { shelf: state.shelf } : {} }); toast(r.error || `Đã quét: ${r.series} bộ`, !!r.error); renderLibrary(); };
}

/* ---------- collections: my own lists, made while reading; they do not follow Drive ---------- */
function modal(html) {
  const el = document.createElement('div');
  el.className = 'modal-back'; el.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  document.body.appendChild(el);
  const close = () => { el.remove(); document.removeEventListener('keydown', onKey, true); };
  const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  document.addEventListener('keydown', onKey, true);
  el.addEventListener('mousedown', (e) => { if (e.target === el) close(); });
  return { el, close };
}
async function collApi(body) {
  const r = await fetch('/api/collections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}
async function drawColls() {
  const list = await api('collections').catch(() => []);
  $('#colls').innerHTML = `<div class="side-head">Bộ sưu tập <button class="mini" id="coll-new" aria-label="Tạo bộ sưu tập" title="Tạo bộ sưu tập">＋</button></div>
    ${list.length ? list.map((c) => `<a class="shelf-item" href="#/collection/${c.id}" data-coll="${c.id}"><span>${esc(c.name)}</span><span class="count">${c.count}</span></a>`).join('') : '<p class="muted small" style="padding:0 12px">Chưa có. Mở một bộ và bấm “＋ Bộ sưu tập”.</p>'}`;
  $('#coll-new').onclick = () => askName('Bộ sưu tập mới', '').then((n) => n && collApi({ action: 'create', name: n }).then((c) => { toast(`Đã tạo “${c.name}”`); drawColls(); location.hash = '#/collection/' + c.id; }).catch((e) => toast(e.message, true)));
}
function askName(title, value) {
  return new Promise((ok) => {
    const m = modal(`<h2>${esc(title)}</h2><input type="text" id="ask-v" value="${esc(value)}" aria-label="${esc(title)}" style="width:100%"><div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="ask-no">Huỷ</button><button class="btn primary" id="ask-ok">Lưu</button></div>`);
    const v = $('#ask-v', m.el); v.focus(); v.select();
    const done = (val) => { m.close(); ok(val); };
    $('#ask-ok', m.el).onclick = () => done(v.value.trim());
    $('#ask-no', m.el).onclick = () => done(null);
    v.onkeydown = (e) => { if (e.key === 'Enter') done(v.value.trim()); };
  });
}
/** Like askName but a multi-line box (comments keep their line breaks). */
function askText(title, value) {
  return new Promise((ok) => {
    const m = modal(`<h2>${esc(title)}</h2><textarea id="ask-t" rows="6" aria-label="${esc(title)}" style="width:100%;border:1px solid var(--line-ui);background:var(--bg);border-radius:8px;padding:8px 10px">${esc(value)}</textarea><div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="at-no">Huỷ</button><button class="btn primary" id="at-ok">Lưu</button></div>`);
    const t = $('#ask-t', m.el); t.focus();
    const done = (v) => { m.close(); ok(v); };
    $('#at-ok', m.el).onclick = () => done(t.value.trim());
    $('#at-no', m.el).onclick = () => done(null);
  });
}
/** "Add to a collection" for a series or one chapter. what = { type, series, chapter?, label }. */
async function addToCollection(what) {
  const [list, have] = await Promise.all([api('collections'), api(`in-collections/${what.series}${what.type === 'chapter' ? '?chapter=' + what.chapter : ''}`).catch(() => [])]);
  const inIds = new Set(have.map((h) => h.id));
  const m = modal(`<h2>Thêm vào bộ sưu tập</h2><p class="muted small">${esc(what.label)}</p>
    <div class="coll-pick">${list.map((c) => `<button class="shelf-item" data-c="${c.id}"${inIds.has(c.id) ? ' disabled' : ''}><span>${esc(c.name)}</span><span class="count">${inIds.has(c.id) ? '✓ đã có' : c.count}</span></button>`).join('') || '<p class="muted small">Chưa có bộ sưu tập nào, tạo ở dưới.</p>'}</div>
    <div class="row" style="margin-top:12px"><input type="text" id="coll-name" placeholder="Hoặc tạo mới: tên bộ sưu tập" style="flex:1"><button class="btn" id="coll-make">Tạo và thêm</button></div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="coll-close">Đóng</button></div>`);
  const add = async (cid) => {
    try { const r = await collApi({ action: 'add', collection: cid, type: what.type, series: what.series, chapter: what.chapter }); toast(`Đã thêm vào “${r.name}”`); m.close(); drawColls(); if (location.hash.startsWith('#/series/')) route(); }
    catch (e) { toast(e.message, true); }
  };
  $$('[data-c]', m.el).forEach((b) => b.onclick = () => add(b.dataset.c));
  $('#coll-make', m.el).onclick = async () => {
    const n = $('#coll-name', m.el).value.trim();
    if (!n) return;
    try { const c = await collApi({ action: 'create', name: n }); await add(c.id); } catch (e) { toast(e.message, true); }
  };
  $('#coll-close', m.el).onclick = m.close;
}
async function renderCollection(id) {
  const c = await api('collection/' + id);
  const series = c.items.filter((i) => i.type === 'series'), chapters = c.items.filter((i) => i.type === 'chapter');
  const rm = (i) => `<button class="icon-x" data-rm="${i.iid}" aria-label="Bỏ khỏi bộ sưu tập" title="Bỏ khỏi bộ sưu tập">✕</button>`;
  const note = (i) => (!i.found ? `<span class="warn small">Không tìm thấy — trước đây ở ${esc(i.where)}</span>` : i.moved ? `<span class="muted small">đã chuyển: ${esc(i.where)}</span>` : `<span class="muted small">${esc(i.where)}</span>`);
  main.innerHTML = `<div class="crumbs"><a href="#/">‹ Thư viện</a> / Bộ sưu tập</div>
    <div class="page-head"><h1>${esc(c.name)} <small>${c.items.length} mục</small></h1><div class="row"><button class="btn" id="coll-ren">Đổi tên</button><button class="btn" id="coll-del">Xoá bộ sưu tập</button></div></div>
    <p class="muted small">Bộ sưu tập là danh sách của riêng bạn, không đổi theo Drive: chuyển thư mục trên Drive thì mục vẫn còn (app tìm lại theo tên${chapters.length ? ' và dung lượng' : ''}).</p>
    ${series.length ? `<h2 class="sec">Bộ truyện</h2><div class="ch-list">${series.map((i) => `<div class="ch">${i.found ? `<a class="t" href="#/series/${i.series}"><b>${esc(i.name)}</b></a>` : `<span class="t"><b>${esc(i.name)}</b></span>`}<span class="stack-s">${note(i)}</span>${rm(i)}</div>`).join('')}</div>` : ''}
    ${chapters.length ? `<h2 class="sec">Chương lẻ và chương đã chọn</h2><div class="ch-list">${chapters.map((i) => `<div class="ch">${i.found ? `<a class="t" href="#/read/${i.series}/${i.chapter}"><b>${esc(i.name)}</b>${i.from ? ` <span class="muted small">· ${esc(i.from)}</span>` : ''}</a>` : `<span class="t"><b>${esc(i.name)}</b></span>`}<span class="stack-s">${note(i)}</span>${rm(i)}</div>`).join('')}</div>` : ''}
    ${c.items.length ? '' : '<div class="empty"><h2>Bộ sưu tập trống</h2><p class="small">Mở một bộ hoặc một chương lẻ, rồi bấm “＋ Bộ sưu tập”.</p></div>'}`;
  $$('[data-rm]').forEach((b) => b.onclick = async () => { try { await collApi({ action: 'remove', collection: id, item: b.dataset.rm }); drawColls(); renderCollection(id); } catch (e) { toast(e.message, true); } });
  $('#coll-ren').onclick = async () => { const n = await askName('Đổi tên bộ sưu tập', c.name); if (n && n !== c.name) { try { await collApi({ action: 'rename', collection: id, name: n }); drawColls(); renderCollection(id); } catch (e) { toast(e.message, true); } } };
  $('#coll-del').onclick = () => {
    const m = modal(`<h2>Xoá “${esc(c.name)}”?</h2><p>Chỉ xoá danh sách này (${c.items.length} mục). Truyện trong thư viện và trên Drive không bị động tới.</p><div class="row" style="justify-content:flex-end"><button class="btn" id="d-no">Huỷ</button><button class="btn primary" id="d-ok">Xoá bộ sưu tập</button></div>`);
    $('#d-no', m.el).onclick = m.close;
    $('#d-ok', m.el).onclick = async () => { m.close(); try { await collApi({ action: 'delete', collection: id }); toast('Đã xoá'); drawColls(); location.hash = '#/'; } catch (e) { toast(e.message, true); } };
  };
}

/* ---------- writing to Drive: move one chapter into a series, or into a new series folder (off unless switched on) ---------- */
async function driveApi(path, body) {
  const r = await fetch('/api/drive/' + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}
/** what = { series, chapter, label }. Step 1 choose where, step 2 read exactly what will happen, step 3 confirm. */
async function moveChapter(what) {   // what = { series, chapters: [ids] (or chapter: id), label }
  const [all, parents] = await Promise.all([api('series'), api('drive/parents?series=' + what.series)]);
  const mine = all.find((s) => s.id === what.series);
  const dests = all.filter((s) => !s.loose && s.id !== what.series && (!mine || s.shelf === mine.shelf));   // a move stays inside one shelf
  const m = modal(`<h2>Chuyển ${what.chapters && what.chapters.length > 1 ? `${what.chapters.length} chương` : 'chương'} vào bộ</h2><p class="muted small">${esc(what.label)}</p>
    <input type="search" id="mv-q" placeholder="Tìm bộ đích…" aria-label="Tìm bộ đích" style="width:100%">
    <div class="coll-pick" id="mv-list">${dests.map((s) => `<button class="shelf-item" data-d="${s.id}" data-t="${esc((s.title + ' ' + s.fandom + ' ' + s.group).toLowerCase())}"><span>${esc(s.title)}<br><span class="muted small">${esc([s.fandom, s.group].filter(Boolean).join(' / ') || 'gốc')}</span></span><span class="count">${s.chapters}</span></button>`).join('') || '<p class="muted small">Chưa có bộ nào khác.</p>'}</div>
    <h3 class="sec" style="margin:14px 0 6px">Hoặc tạo bộ mới (bộ tổng hợp)</h3>
    <div class="row"><select id="mv-parent" aria-label="Thư mục chứa bộ mới" style="flex:1">${parents.map((p) => `<option value="${esc(p.rel)}">${esc(p.label)}</option>`).join('')}</select></div>
    <div class="row" style="margin-top:8px"><input type="text" id="mv-name" placeholder="Tên bộ mới, ví dụ: Tổng hợp oneshot" style="flex:1"><button class="btn" id="mv-make"${parents.length ? '' : ' disabled'}>Tạo và chuyển</button></div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="mv-close">Đóng</button></div>`);
  $('#mv-q', m.el).oninput = (e) => { const q = e.target.value.trim().toLowerCase(); $$('#mv-list [data-t]', m.el).forEach((b) => { b.hidden = !!q && !b.dataset.t.includes(q); }); };
  $('#mv-close', m.el).onclick = m.close;
  const plan = async (extra) => {
    try { const p = await driveApi('plan', { series: what.series, chapters: what.chapters || [what.chapter], ...extra }); m.close(); confirmMove(p); }
    catch (e) { toast(e.message, true); }
  };
  $$('[data-d]', m.el).forEach((b) => b.onclick = () => plan({ dest_series: b.dataset.d }));
  $('#mv-make', m.el).onclick = () => plan({ new_parent: $('#mv-parent', m.el).value, new_name: $('#mv-name', m.el).value });
}
/** Move the whole series folder to another fandom / group folder, or into a new group made inside a fandom. */
async function moveWholeSeries(sid, s) {
  const parents = await api('drive/parents?series=' + sid);
  const here = [s.fandom, s.group].filter(Boolean).join(' / ');
  const fandoms = parents.filter((p) => p.depth === 1);
  const m = modal(`<h2>Chuyển cả bộ</h2><p class="muted small"><b>${esc(s.title)}</b> · ${s.chapters.length} chương · đang ở: ${esc(here || 'gốc')}</p>
    <h3 class="sec" style="margin:10px 0 6px">Sang thư mục có sẵn</h3>
    <div class="coll-pick">${parents.map((p) => `<button class="shelf-item" data-p="${esc(p.rel)}"><span>${esc(p.label)}</span><span class="count">${p.depth === 1 ? 'fandom' : 'nhóm'}</span></button>`).join('') || '<p class="muted small">Chưa có thư mục nào.</p>'}</div>
    <h3 class="sec" style="margin:14px 0 6px">Hoặc tạo nhóm mới trong một fandom</h3>
    <div class="row"><select id="wh-fandom" aria-label="Fandom" style="flex:1">${fandoms.map((p) => `<option value="${esc(p.rel)}">${esc(p.label)}</option>`).join('')}</select></div>
    <div class="row" style="margin-top:8px"><input type="text" id="wh-name" placeholder="Tên nhóm mới" style="flex:1"><button class="btn" id="wh-make"${fandoms.length ? '' : ' disabled'}>Tạo nhóm và chuyển</button></div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="wh-close">Đóng</button></div>`);
  $('#wh-close', m.el).onclick = m.close;
  const plan = async (extra) => { try { const p = await driveApi('plan', { series: sid, whole_series: true, ...extra }); m.close(); confirmMove(p); } catch (e) { toast(e.message, true); } };
  $$('[data-p]', m.el).forEach((b) => b.onclick = () => plan({ new_parent: b.dataset.p }));
  $('#wh-make', m.el).onclick = () => plan({ new_parent: $('#wh-fandom', m.el).value, new_group: $('#wh-name', m.el).value });
}
/** Merge the viewed fandom into another one: everything that sits directly in it moves across; the folder stays, empty of stories. */
async function mergeFandom(fandom, shelf) {
  const parents = await api('drive/parents?shelf=' + encodeURIComponent(shelf));
  const others = parents.filter((p) => p.depth === 1 && p.rel !== fandom);
  const m = modal(`<h2>Gộp fandom vào fandom khác</h2><p class="muted small"><b>${esc(fandom)}</b> sẽ được gộp: mọi nhóm, bộ và chương lẻ nằm thẳng trong đó chuyển sang fandom đích.</p>
    <div class="coll-pick">${others.map((p) => `<button class="shelf-item" data-p="${esc(p.rel)}"><span>${esc(p.label)}</span><span class="count">fandom</span></button>`).join('') || '<p class="muted small">Chưa có fandom nào khác để gộp vào.</p>'}</div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="mf-close">Đóng</button></div>`);
  $('#mf-close', m.el).onclick = m.close;
  $$('[data-p]', m.el).forEach((b) => b.onclick = async () => {
    try { const p = await driveApi('plan', { merge_fandom: true, target: fandom, new_parent: b.dataset.p, shelf }); m.close(); confirmMove(p, () => { state.fandom = p.dest; state.group = null; renderLibrary(); }); }
    catch (e) { toast(e.message, true); }
  });
}
/** Move the filtered group to another fandom folder, or into a new fandom folder made at the root. */
async function moveGroup(fandom, group, shelf) {
  const parents = await api('drive/parents?shelf=' + encodeURIComponent(shelf));
  const others = parents.filter((p) => p.depth === 1 && p.rel !== fandom);
  const m = modal(`<h2>Chuyển cả nhóm</h2><p class="muted small"><b>${esc(group)}</b> · đang ở fandom: ${esc(fandom)}</p>
    <h3 class="sec" style="margin:10px 0 6px">Sang fandom có sẵn</h3>
    <div class="coll-pick">${others.map((p) => `<button class="shelf-item" data-p="${esc(p.rel)}"><span>${esc(p.label)}</span><span class="count">fandom</span></button>`).join('') || '<p class="muted small">Chưa có fandom nào khác.</p>'}</div>
    <h3 class="sec" style="margin:14px 0 6px">Hoặc tạo fandom mới</h3>
    <div class="row"><input type="text" id="mg-name" placeholder="Tên fandom mới" style="flex:1"><button class="btn" id="mg-make">Tạo fandom và chuyển</button></div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="mg-close">Đóng</button></div>`);
  $('#mg-close', m.el).onclick = m.close;
  const plan = async (extra) => {
    try { const p = await driveApi('plan', { whole_group: true, target: `${fandom}/${group}`, shelf, ...extra }); m.close(); confirmMove(p, () => { state.fandom = p.dest; renderLibrary(); }); }
    catch (e) { toast(e.message, true); }
  };
  $$('[data-p]', m.el).forEach((b) => b.onclick = () => plan({ new_parent: b.dataset.p }));
  $('#mg-make', m.el).onclick = () => plan({ new_fandom: $('#mg-name', m.el).value });
}
function confirmMove(p, onDone) {
  const m = modal(`<h2>${p.mode === 'merge' ? 'Xác nhận gộp fandom trên Drive' : p.mode === 'undo' ? 'Xác nhận hoàn tác' : p.mode === 'rename' ? 'Xác nhận đổi tên trên Drive' : 'Xác nhận chuyển file trên Drive'}</h2>
    <p>${p.batch ? `Đổi tên <b>${p.count} chương</b> theo danh sách dưới đây.` : p.mode === 'merge' ? `Gộp cả fandom <b>${esc(p.title)}</b> (${p.count} bộ / mục) vào fandom <b>${esc(p.dest)}</b>: ${p.moves} mục sẽ chuyển sang.` : p.mode === 'group' ? `Cả nhóm <b>${esc(p.title)}</b> (${p.count} bộ) sẽ chuyển sang fandom <b>${esc(p.dest)}</b>.` : p.mode === 'rename' ? `Đổi tên ${p.what} <b>${esc(p.title)}</b> thành <b>${esc(p.dest)}</b>.` : p.mode === 'undo' ? `Đưa <b>${esc(p.title)}</b> về chỗ cũ như trước lần chuyển đó.` : p.mode === 'series' ? `Cả bộ <b>${esc(p.title)}</b> (${p.count} chương) sẽ chuyển sang <b>${esc(p.dest)}</b>.` : `${p.count > 1 ? '' : 'Chương '}<b>${esc(p.title)}</b> sẽ vào bộ <b>${esc(p.dest)}</b>.`}</p>
    <div class="plan">${p.steps.map((s) => s.kind === 'mkdir' ? `<div>＋ Tạo thư mục mới<br><code>${esc(s.to)}</code></div>` : s.kind === 'rmdir' ? `<div>✕ Xoá thư mục trống (do Kệ Sách tạo)<br><code>${esc(s.to)}</code></div>` : p.mode === 'rename' ? `<div>✎ Đổi tên<br><span class="muted small">từ</span> <code>${esc(s.from)}</code><br><span class="muted small">thành</span> <code>${esc(s.to)}</code></div>` : `<div>→ ${p.mode === 'series' || p.mode === 'group' ? 'Chuyển thư mục' : p.mode === 'merge' ? 'Chuyển' : 'Chuyển file'}<br><span class="muted small">từ</span> <code>${esc(s.from)}</code><br><span class="muted small">đến</span> <code>${esc(s.to)}</code></div>`).join('')}</div>
    ${p.notes.map((n) => `<p class="warn small">⚠ ${esc(n)}</p>`).join('')}
    <p class="muted small">Google Drive for Desktop sẽ đồng bộ thay đổi này lên Drive. ${p.mode === 'undo' ? 'Kệ Sách không ghi đè; chỗ duy nhất nó xoá là thư mục trống do chính nó tạo.' : 'Kệ Sách không ghi đè, không xoá gì, không chép.'} Việc này được ghi vào nhật ký. Tiến độ đọc có thể về lại đầu (đường dẫn đổi).</p>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="cf-no">Huỷ</button><button class="btn primary" id="cf-ok">${p.mode === 'merge' ? 'Gộp fandom' : p.mode === 'group' ? 'Chuyển cả nhóm' : p.mode === 'rename' ? 'Đổi tên' : p.mode === 'undo' ? 'Hoàn tác' : p.mode === 'series' ? 'Chuyển cả bộ' : p.count > 1 ? `Chuyển ${p.count} file` : 'Chuyển file'}</button></div>`);
  $('#cf-no', m.el).focus();   // Enter must not confirm by accident
  $('#cf-no', m.el).onclick = m.close;
  $('#cf-ok', m.el).onclick = async () => {
    $('#cf-ok', m.el).disabled = true;
    try {
      await driveApi('apply', { token: p.token });
      if (p.mode === 'undo' || p.mode === 'rename' || p.mode === 'group' || p.mode === 'merge') { m.close(); toast(p.mode === 'undo' ? 'Đã hoàn tác' : p.mode === 'merge' ? `Đã gộp fandom “${p.title}” vào “${p.dest}”` : p.mode === 'group' ? `Đã chuyển nhóm “${p.title}” sang “${p.dest}”` : `Đã đổi tên “${p.title}” thành “${p.dest}”`); drawColls(); await onDone?.(p); return; }
      m.close(); toast(`Đã chuyển “${p.title}” ${p.mode === 'series' ? 'sang' : 'vào'} “${p.dest}”`);
      drawColls(); const all = await api('series'); const d = all.find((s) => !s.loose && s.where === p.dest_rel && s.shelf === p.shelf);
      location.hash = d ? '#/series/' + d.id : '#/'; if (!d) renderLibrary();
    } catch (e) { m.close(); toast(e.message, true); }
  };
}

/** Rename the ticked chapters by rule, with a live preview (old -> new, problems in red). The server checks everything again. */
function bulkRename(sid, s, ids) {
  const items = s.chapters.filter((c) => ids.includes(c.id));
  const m = modal(`<h2>Đổi tên ${items.length} chương</h2>
    <p class="muted small">Đuôi file được giữ nguyên. Các bước áp theo thứ tự: đánh số lại → tìm / thay → thêm tiền tố và hậu tố.</p>
    <div class="br-grid">
      <label class="field">Tìm<input type="text" id="br-find"></label><label class="field">Thay bằng<input type="text" id="br-repl"></label>
      <label class="field">Thêm tiền tố<input type="text" id="br-pre"></label><label class="field">Thêm hậu tố<input type="text" id="br-suf"></label>
    </div>
    <label class="check" style="margin:8px 0 4px"><input type="checkbox" id="br-num"> Đánh số lại theo mẫu</label>
    <div class="br-grid"><label class="field">Mẫu (<code>{n}</code> là số)<input type="text" id="br-tpl" value="Chuong {n}"></label>
      <label class="field">Bắt đầu từ<input type="number" id="br-start" value="1" min="0"></label>
      <label class="field">Số chữ số (0 = không đệm)<input type="number" id="br-width" value="0" min="0" max="6"></label></div>
    <div class="plan" id="br-prev" style="max-height:30vh"></div>
    <p class="small err" id="br-err"></p>
    <div class="row" style="margin-top:10px;justify-content:flex-end"><button class="btn" id="br-no">Đóng</button><button class="btn primary" id="br-go" disabled>Xem kế hoạch</button></div>`);
  const $m = (x) => $(x, m.el);
  const BAD = /[<>:"/\|?*\u0000-\u001f]/;
  let rows = [];
  const calc = () => {
    const find = $m('#br-find').value, repl = $m('#br-repl').value, pre = $m('#br-pre').value, suf = $m('#br-suf').value;
    const renum = $m('#br-num').checked, tpl = $m('#br-tpl').value, width = Math.max(0, +$m('#br-width').value || 0);
    let n = +$m('#br-start').value || 0;
    rows = items.map((c) => {
      let t = c.title;
      if (renum) { t = tpl.split('{n}').join(String(n).padStart(width, '0')); n++; }
      if (find) t = t.split(find).join(repl);
      return { c, to: (pre + t + suf).trim() };
    });
    const olds = new Set(items.map((c) => c.title.toLowerCase())), seen = new Map();
    rows.forEach((r) => {
      r.same = r.to === r.c.title;
      if (r.same) return;
      const k = r.to.toLowerCase();
      if (!r.to) r.bad = 'tên trống';
      else if (BAD.test(r.to)) r.bad = 'có ký tự cấm';
      else if (r.to.startsWith('.') || r.to.endsWith('.')) r.bad = 'bắt đầu / kết thúc bằng dấu chấm';
      else if (seen.has(k)) r.bad = 'trùng tên với dòng trên';
      else if (k !== r.c.title.toLowerCase() && olds.has(k)) r.bad = 'trùng tên hiện tại của chương khác (đổi làm hai lượt)';
      seen.set(k, true);
    });
    const changed = rows.filter((r) => !r.same), bad = rows.filter((r) => r.bad);
    $m('#br-prev').innerHTML = rows.map((r) => `<div class="${r.same ? 'muted' : ''}">${esc(r.c.title)} → <b>${r.same ? '(giữ nguyên)' : esc(r.to)}</b>${r.bad ? ` <span class="err small">⚠ ${esc(r.bad)}</span>` : ''}</div>`).join('');
    $m('#br-err').textContent = bad.length ? `${bad.length} dòng có vấn đề, sửa rồi mới xem được kế hoạch.` : !changed.length ? 'Chưa có tên nào thay đổi.' : '';
    $m('#br-go').disabled = !!bad.length || !changed.length;
  };
  $$('input', m.el).forEach((i) => { i.oninput = calc; i.onchange = calc; });
  calc();
  $m('#br-no').onclick = m.close;
  $m('#br-go').onclick = async () => {
    try {
      const p = await driveApi('plan', { rename: 'chapters', series: sid, items: rows.filter((r) => !r.same).map((r) => ({ chapter: r.c.id, new_name: r.to })) });
      m.close(); confirmMove(p, () => route());
    } catch (e) { toast(e.message, true); }
  };
}

/** Select-many on the series page: tick chapters (shift-click for a range), then move them all in one plan. */
function selectMode(sid, s) {
  const btn = $('#s-sel'), list = $('.ch-list');
  if (!btn || !list) return;
  const rows = () => $$('.ch', list), picks = () => $$('.ch-pick', list), chosen = () => picks().filter((p) => p.checked).map((p) => p.dataset.pick);
  let bar = null, anchor = -1;
  const upd = () => { const n = chosen().length; if (bar) { $('#sel-n', bar).textContent = `${n} / ${s.chapters.length} chương đã chọn`; $('#sel-go', bar).disabled = !n; $('#sel-ren', bar).disabled = !n; $('#sel-go', bar).textContent = n ? `Chuyển ${n} chương…` : 'Chuyển…'; } rows().forEach((r) => r.classList.toggle('picked', r.querySelector('.ch-pick').checked)); };
  const off = () => { list.classList.remove('selecting'); picks().forEach((p) => { p.checked = false; p.tabIndex = -1; }); bar?.remove(); bar = null; btn.setAttribute('aria-pressed', 'false'); btn.textContent = 'Chọn nhiều để chuyển'; upd(); };
  const on = () => {
    list.classList.add('selecting'); picks().forEach((p) => { p.tabIndex = 0; });
    btn.setAttribute('aria-pressed', 'true'); btn.textContent = 'Thoát chọn nhiều';
    bar = document.createElement('div'); bar.className = 'sel-bar'; bar.setAttribute('role', 'toolbar');
    bar.innerHTML = `<span id="sel-n" aria-live="polite"></span><span class="spacer"></span><button class="btn sm" id="sel-all">Chọn tất cả</button><button class="btn sm" id="sel-none">Bỏ chọn</button><button class="btn" id="sel-ren" disabled>Đổi tên…</button><button class="btn primary" id="sel-go" disabled>Chuyển…</button>`;
    document.body.appendChild(bar);
    $('#sel-all', bar).onclick = () => { picks().forEach((p) => { p.checked = true; }); upd(); };
    $('#sel-none', bar).onclick = () => { picks().forEach((p) => { p.checked = false; }); upd(); };
    $('#sel-ren', bar).onclick = () => { const ids = chosen(); if (ids.length) bulkRename(sid, s, ids); };
    $('#sel-go', bar).onclick = () => { const ids = chosen(); if (ids.length) moveChapter({ series: sid, chapters: ids, label: `${ids.length} chương (đang ở: ${s.loose ? 'Chương lẻ' : s.title})` }); };
    upd();
  };
  btn.onclick = () => (list.classList.contains('selecting') ? off() : on());
  // in select mode a click on a row ticks it (shift = range) instead of opening the chapter
  list.addEventListener('click', (e) => {
    if (!list.classList.contains('selecting')) return;
    const row = e.target.closest('.ch'); if (!row) return;
    e.preventDefault();
    const idx = rows().indexOf(row), box = row.querySelector('.ch-pick');
    if (e.target !== box) box.checked = !box.checked;
    if (e.shiftKey && anchor >= 0) { const [a, b] = [Math.min(anchor, idx), Math.max(anchor, idx)]; rows().slice(a, b + 1).forEach((r) => { r.querySelector('.ch-pick').checked = box.checked; }); }
    anchor = idx; upd();
  });
  window.addEventListener('hashchange', () => bar?.remove(), { once: true });
}

/* ---------- tags in the sidebar: click to filter (every ticked tag must be on the series) ---------- */
function drawTags(tags) {
  const box = $('#tagbox');
  if (!tags.length) { box.innerHTML = ''; return; }
  box.innerHTML = `<div class="side-head">Tag${state.tags.length ? ' <button class="mini" id="tag-clear" aria-label="Bỏ lọc tag" title="Bỏ lọc tag">✕</button>' : ''}</div>
    <div class="tag-cloud">${tags.map((t) => `<button class="tag k-${t.kind}${state.tags.includes(tagId(t)) ? ' on' : ''}" data-tag="${esc(tagId(t))}" title="${KIND_TAG[t.kind]} · ${t.count} bộ">${esc(t.name)} <span class="count">${t.count}</span></button>`).join('')}</div>`;
  $$('[data-tag]', box).forEach((b) => b.onclick = () => {
    const id = b.dataset.tag, i = state.tags.indexOf(id);
    i < 0 ? state.tags.push(id) : state.tags.splice(i, 1);
    if ((location.hash || '#/') !== '#/') location.hash = '#/'; else renderLibrary();
  });
  $('#tag-clear')?.addEventListener('click', () => { state.tags = []; renderLibrary(); });
}

/* ---------- my rating, tags and note on a series ---------- */
async function mineBox(sid) {
  const [m, all] = await Promise.all([api('meta/series/' + sid), api('tags')]);
  const box = $('#mine');
  let cur = { rating: m.rating, tags: [...m.tags], note: m.note };
  const save = async (patch, quiet) => {
    try { Object.assign(cur, await api('meta/series/' + sid, { method: 'PUT', body: patch })); if (!quiet) $('#note-st').textContent = 'Đã lưu'; drawTagsFresh(); }
    catch (e) { toast(e.message, true); }
  };
  const drawTagsFresh = () => api('tags').then(drawTags).catch(() => {});
  const paint = () => {
    box.innerHTML = `<div class="mine-row"><b>Đánh giá của tôi</b>
        <span class="stars" role="radiogroup" aria-label="Đánh giá">${[1, 2, 3, 4, 5].map((n) => `<button class="star${n <= cur.rating ? ' on' : ''}" data-star="${n}" role="radio" aria-checked="${n === cur.rating}" aria-label="${n} sao">★</button>`).join('')}</span>
        ${cur.rating ? '<button class="btn sm" id="star-clear">Bỏ đánh giá</button>' : '<span class="muted small">chưa đánh giá</span>'}</div>
      <div class="mine-row"><b>Tag</b><span class="tag-edit">${cur.tags.map((t, i) => `<span class="tag k-${t.kind}">${esc(t.name)} <button class="tag-x" data-rm="${i}" aria-label="Bỏ tag ${esc(t.name)}">✕</button></span>`).join('')}</span>
        <input type="text" id="tag-name" list="tag-sug" placeholder="Thêm tag…" aria-label="Tên tag"><datalist id="tag-sug">${all.map((t) => `<option value="${esc(t.name)}">${KIND_TAG[t.kind]}</option>`).join('')}</datalist>
        <select id="tag-kind" aria-label="Loại tag">${Object.entries(KIND_TAG).map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select><button class="btn sm" id="tag-add">＋ Thêm</button></div>
      <label class="field"><span><b>Ghi chú riêng</b> <span class="muted small" id="note-st"></span></span><textarea id="note" rows="3" placeholder="Chỉ mình bạn thấy, lưu ở máy này (KeSach/data/meta.json)">${esc(cur.note)}</textarea></label>`;
    $$('[data-star]', box).forEach((b) => b.onclick = async () => { await save({ rating: +b.dataset.star }, true); paint(); });
    $('#star-clear', box)?.addEventListener('click', async () => { await save({ rating: 0 }, true); paint(); });
    $$('[data-rm]', box).forEach((b) => b.onclick = async () => { await save({ tags: cur.tags.filter((_, i) => i !== +b.dataset.rm) }, true); paint(); });
    const addTag = async () => {
      const name = $('#tag-name', box).value.trim();
      if (!name) return;
      // a name already in use keeps its kind, so "Harry" is not a fandom here and a character there by accident
      const known = all.find((t) => t.name.toLowerCase() === name.toLowerCase());
      await save({ tags: [...cur.tags, { name, kind: known ? known.kind : $('#tag-kind', box).value }] }, true); paint();
    };
    $('#tag-add', box).onclick = addTag;
    $('#tag-name', box).onkeydown = (e) => { if (e.key === 'Enter') addTag(); };
    let t;
    const ta = $('#note', box);
    ta.oninput = () => { $('#note-st').textContent = 'đang gõ…'; clearTimeout(t); t = setTimeout(() => save({ note: ta.value }), 700); };
    ta.onblur = () => { clearTimeout(t); if (ta.value !== cur.note) save({ note: ta.value }); };
  };
  paint();
}

/* ---------- fandom / group tree (folders as they are on Drive; two levels only) ---------- */
function drawTree(tree) {
  const box = $('#tree');
  const all = tree.reduce((n, f) => n + f.groups.reduce((m, g) => m + cardCount(g), 0), 0);
  const on = (f, g) => state.fandom === f && state.group === g;
  box.innerHTML = `<div class="side-head">Fandom</div>
    <button class="shelf-item${state.fandom === null ? ' active' : ''}" data-f="" data-all="1">Tất cả <span class="count">${all}</span></button>
    ${tree.map((f) => {
      const n = f.groups.reduce((m, g) => m + cardCount(g), 0), open = state.fandom === f.fandom;
      const named = f.groups.filter((g) => g.group);
      return `<button class="shelf-item${on(f.fandom, null) ? ' active' : ''}" data-f="${esc(f.fandom)}" aria-expanded="${open}"><span>${open && named.length ? '▾' : named.length ? '▸' : ''} ${esc(noName(f.fandom, 'fandom'))}</span><span class="count">${n}</span></button>
      ${open ? named.map((g) => `<button class="shelf-item sub${on(f.fandom, g.group) ? ' active' : ''}" data-f="${esc(f.fandom)}" data-g="${esc(g.group)}"><span>${esc(g.group)}</span><span class="count">${cardCount(g)}</span></button>`).join('') : ''}`;
    }).join('')}`;
  $$('[data-f]', box).forEach((b) => b.onclick = () => {
    state.fandom = b.dataset.all ? null : b.dataset.f;
    state.group = b.dataset.g === undefined ? null : b.dataset.g;
    if ((location.hash || '#/') !== '#/') location.hash = '#/'; else renderLibrary();
  });
}

/* ---------- series ---------- */
async function renderSeries(sid) {
  const [s, st] = await Promise.all([api('series/' + sid), api('state')]);
  window.ksWrite = !!st.write;
  if (st.write) api('series').then((l) => { window.ksAllSeries = l.filter((x) => x.shelf === s.shelf); }).catch(() => {});   // the list the drag-to-series strip offers: this shelf only
  const last = st.progress[sid]?.chapter;
  const first = s.chapters[0];
  const resume = s.chapters.find((c) => c.id === last) || first;
  main.innerHTML = `<div class="crumbs"><a href="#/">‹ Thư viện</a>${s.fandom ? ` / ${esc(s.fandom)}` : ''}${s.group ? ` / ${esc(s.group)}` : ''} / ${esc(s.loose ? 'Chương lẻ' : s.title)}</div>
    <div class="hero">${coverHtml({ id: sid, title: s.title, kind: s.kind }, 0)}
      <div class="hero-info"><h1>${esc(s.loose ? `Chương lẻ · ${s.group || s.fandom || 'gốc'}` : s.title)}</h1>
        <div class="row"><span class="chip">${KIND[s.kind]}</span><span class="chip">${s.chapters.length} chương</span><span class="chip" title="Thư mục trong thư viện">${esc(s.where)}</span>${st.shelves.length > 1 ? `<span class="chip" title="Kệ (thư mục gốc) chứa bộ này">Kệ: ${esc(s.shelf_name)}</span>` : ''}</div>
        <div class="row">${resume ? `<a class="btn primary" href="#/read/${sid}/${resume.id}">${last ? 'Đọc tiếp' : 'Bắt đầu đọc'}</a>` : ''}${s.loose ? '' : '<button class="btn" id="s-coll">＋ Bộ sưu tập</button>'}${st.write ? '<button class="btn" id="s-sel" aria-pressed="false">Chọn nhiều để chuyển</button>' : ''}${st.write && !s.loose ? '<button class="btn" id="s-whole">Chuyển cả bộ…</button><button class="btn" id="s-rename">Đổi tên bộ…</button>' : ''}<span id="s-in" class="row"></span></div></div></div>
    ${s.loose ? '' : '<div class="mine" id="mine"></div><div class="mine" id="cmts"></div>'}
    <div class="ch-list">${s.chapters.map((c, i) => `<a class="ch${c.id === last ? ' cur' : ''}" href="#/read/${sid}/${c.id}">${st.write ? `<input type="checkbox" class="ch-pick" data-pick="${c.id}" aria-label="Chọn ${esc(c.title)}" tabindex="-1">` : ''}<span class="n">${i + 1}</span><span class="t">${esc(c.title)}${c.has_note ? ' <span class="note-dot" title="Có ghi chú">📝</span>' : ''}</span><span class="muted small">${c.kind === 'comic' ? 'tranh' : 'chữ'}</span><button class="mini ch-add" data-add-ch="${c.id}" data-label="${esc(c.title)}" aria-label="Thêm chương vào bộ sưu tập" title="Thêm vào bộ sưu tập">＋</button>${st.write ? `<button class="mini ch-add" data-move-ch="${c.id}" data-label="${esc(c.title)}" aria-label="Chuyển chương sang bộ khác trên Drive" title="Chuyển sang bộ khác (ghi vào Drive)">↪</button><button class="mini ch-add" data-rename-ch="${c.id}" data-title="${esc(c.title)}" aria-label="Đổi tên chương trên Drive" title="Đổi tên chương (ghi vào Drive)">✎</button>` : ''}</a>`).join('')}</div>`;
  ksThumbs(main);
  if (!s.loose) {
    mineBox(sid);
    commentsBox($('#cmts'), { sid, chapters: s.chapters, title: 'Bình luận' });
    $('#s-coll').onclick = () => addToCollection({ type: 'series', series: sid, label: s.title });
    api('in-collections/' + sid).then((h) => { $('#s-in').innerHTML = h.map((x) => `<a class="chip" href="#/collection/${x.id}">${esc(x.name)}</a>`).join(''); }).catch(() => {});
  }
  if (st.write) selectMode(sid, s);
  if (st.write && !s.loose) {
    $('#s-whole').onclick = () => moveWholeSeries(sid, s);
    $('#s-rename').onclick = async () => {
      const n = await askName('Đổi tên bộ', s.title);
      if (!n || n === s.title) return;
      try {
        const p = await driveApi('plan', { rename: 'series', target: sid, new_name: n });
        confirmMove(p, async () => { const all = await api('series'); const d = all.find((x) => !x.loose && x.where === p.dest_rel && x.shelf === p.shelf); location.hash = d ? '#/series/' + d.id : '#/'; if (!d) renderLibrary(); });
      } catch (e) { toast(e.message, true); }
    };
  }
  $$('[data-rename-ch]').forEach((b) => b.onclick = async (e) => {
    e.preventDefault(); e.stopPropagation();
    const n = await askName('Đổi tên chương', b.dataset.title);
    if (!n || n === b.dataset.title) return;
    try {
      const p = await driveApi('plan', { rename: 'chapter', series: sid, target: b.dataset.renameCh, new_name: n });
      confirmMove(p, () => route());
    } catch (er) { toast(er.message, true); }
  });
  $$('[data-move-ch]').forEach((b) => b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); moveChapter({ series: sid, chapter: b.dataset.moveCh, label: `${b.dataset.label} (đang ở: ${s.loose ? 'Chương lẻ' : s.title})` }); });
  $$('[data-add-ch]').forEach((b) => b.onclick = (e) => { e.preventDefault(); e.stopPropagation(); addToCollection({ type: 'chapter', series: sid, chapter: b.dataset.addCh, label: b.dataset.label }); });
}

/* ---------- reader ---------- */
async function renderReader(sid, cid, q) {
  const s = await api('series/' + sid);
  const i = s.chapters.findIndex((c) => c.id === cid);
  const ch = s.chapters[i];
  if (!ch) { location.hash = '#/series/' + sid; return; }
  const prev = s.chapters[i - 1], next = s.chapters[i + 1];
  document.body.insertAdjacentHTML('beforeend', `<div class="reader-shell" id="reader">
    <div class="reader-top"><a class="btn sm" href="#/series/${sid}">‹ Mục lục</a><span class="title">${esc(s.title)} · ${esc(ch.title)}</span>
      <button class="btn sm" id="r-chapters" aria-haspopup="dialog">☰ Chương <span class="muted">${i + 1}/${s.chapters.length}</span></button>
      ${ch.kind === 'text' ? '<button class="btn sm" id="r-tts" aria-expanded="false" aria-controls="tts-panel">🔊 Đọc thành tiếng</button>' : ''}${ch.kind === 'comic' ? '<span class="muted small" id="c-where"></span><button class="btn sm" id="r-pages" aria-haspopup="dialog">☰ Trang</button><button class="btn sm" id="r-opts" aria-expanded="false" aria-controls="comic-opts">⚙ Kiểu đọc</button>' : ''}${ch.kind === 'text' ? '<button class="btn sm" id="r-tr" aria-expanded="false" aria-controls="tr-panel">🌐 Dịch</button>' : ''}<button class="btn sm" id="r-cm" aria-expanded="false" aria-controls="cm-panel">💬 Bình luận</button><button class="btn sm" id="r-note" aria-expanded="false" aria-controls="note-panel">📝 Ghi chú</button><select id="r-theme" aria-label="Chủ đề">${Object.entries(THEMES).map(([k, [n]]) => `<option value="${k}"${k === store('theme', 'tokyo') ? ' selected' : ''}>${n}</option>`).join('')}</select>${ch.kind === 'text' ? '<button class="btn sm" id="r-color" aria-expanded="false" aria-controls="color-panel" title="Màu chữ và màu nền riêng">🎨 Màu chữ</button>' : ''}</div>
    <div class="read-progress"><i id="r-prog"></i></div><div class="reader-body" id="r-body"><p class="muted" style="padding:24px">Đang tải…</p></div>
    <div class="tts-panel" id="cm-panel" hidden></div><div class="tts-panel" id="tr-panel" hidden></div><div class="tts-panel" id="note-panel" hidden></div>${ch.kind === 'text' ? '<div class="tts-panel" id="color-panel" hidden></div>' : ''}<div class="tts-panel" id="tts-panel" hidden></div><div class="tts-panel" id="comic-opts" hidden></div><div class="reader-foot">${prev ? `<a class="btn" href="#/read/${sid}/${prev.id}">‹ Chương trước</a>` : ''}${next ? `<a class="btn" href="#/read/${sid}/${next.id}">Chương sau ›</a>` : ''}</div></div>`);
  $('#r-theme').onchange = (e) => { setTheme(e.target.value); if (!$('#color-panel')?.hidden) colorPanel.redraw?.(); };   // a changed theme changes the colours that stand in for "theme"
  const colorBtn = $('#r-color');
  if (colorBtn) colorBtn.onclick = () => {
    const pn = $('#color-panel'); pn.hidden = !pn.hidden; colorBtn.setAttribute('aria-expanded', !pn.hidden);
    if (!pn.hidden) colorPanel(pn, $('#r-body'));
  };
  $('#r-chapters').onclick = () => chapterDrawer(sid, s, cid);
  const ttsBtn = $('#r-tts');
  if (ttsBtn) ttsBtn.onclick = () => { const p = $('#tts-panel'); p.hidden = !p.hidden; ttsBtn.setAttribute('aria-expanded', !p.hidden); save('tts_open', !p.hidden); };
  $('#r-cm').onclick = () => {
    const p = $('#cm-panel');
    p.hidden = !p.hidden; $('#r-cm').setAttribute('aria-expanded', !p.hidden);
    if (p.hidden || p.dataset.loaded) return;
    p.dataset.loaded = '1';
    commentsBox(p, { sid, cid, title: 'Bình luận về chương này', para: ch.kind === 'text' ? topParagraph : null, jump: ch.kind === 'text' ? jumpToParagraph : null });
  };
  $('#r-note').onclick = async () => {
    const p = $('#note-panel');
    p.hidden = !p.hidden; $('#r-note').setAttribute('aria-expanded', !p.hidden);
    if (p.hidden || p.dataset.loaded) return;
    p.dataset.loaded = '1';
    const cur = await api(`meta/chapter/${sid}/${cid}`).catch(() => ({ note: '' }));
    p.innerHTML = `<label class="field"><span><b>Ghi chú về chương này</b> <span class="muted small" id="cn-st"></span></span><textarea id="cn" rows="4" placeholder="Chỉ mình bạn thấy, lưu ở máy này">${esc(cur.note)}</textarea></label>`;
    const ta = $('#cn', p); let t, last = cur.note;
    const save = async () => { try { const r = await api(`meta/chapter/${sid}/${cid}`, { method: 'PUT', body: { note: ta.value } }); last = r.note; $('#cn-st').textContent = 'Đã lưu'; } catch (e) { toast(e.message, true); } };
    ta.oninput = () => { $('#cn-st').textContent = 'đang gõ…'; clearTimeout(t); t = setTimeout(save, 700); };
    ta.onblur = () => { clearTimeout(t); if (ta.value !== last) save(); };
    ta.focus();
  };
  const optsBtn = $('#r-opts');
  if (optsBtn) optsBtn.onclick = () => { const p = $('#comic-opts'); p.hidden = !p.hidden; optsBtn.setAttribute('aria-expanded', !p.hidden); };
  const body = $('#r-body');
  try {
    if (ch.kind === 'text') {
      const { text } = await api(`chapter/${sid}/${cid}/text`);
      const lines = text.split(/\r\n|\r|\n/).map((l) => l.trim()).filter(Boolean);
      applyReaderColors(body);
      const goNext = next ? () => { sessionStorage.setItem('ks_autoplay', '1'); location.hash = `#/read/${sid}/${next.id}`; } : null;
      const tr = { saved: await api(`translate/${sid}/${cid}`).catch(() => ({})), mode: store('tr_mode', 'both') };
      const paint = () => {
        const t = tr.saved.translated && tr.saved.translated.length === lines.length ? (tr.saved.shown || tr.saved.translated) : null;   // a changed file no longer lines up: show the original
        const mode = t ? tr.mode : 'orig';
        body.innerHTML = `<article class="text-page">${lines.map((l, i) => mode === 'vi' ? `<p>${esc(t[i])}</p>` : mode === 'both' ? `<p class="orig">${esc(l)}</p><p class="tr">${esc(t[i])}</p>` : `<p>${esc(l)}</p>`).join('')}</article>`;
        ttsMount($('.text-page'), goNext);
      };
      paint();
      if (q) findInChapter($('.text-page'), q);
      tr.refresh = async () => { tr.saved = await api(`translate/${sid}/${cid}`).catch(() => ({})); paint(); tr.redraw?.(); };
      translatePanel(sid, cid, lines, tr, paint);
      senseSelection($('.text-page'), { sid, cid, tr, lines });
      if (store('tts_open', false) || sessionStorage.getItem('ks_autoplay')) { $('#tts-panel').hidden = false; ttsBtn.setAttribute('aria-expanded', 'true'); }
      if (sessionStorage.getItem('ks_autoplay')) { sessionStorage.removeItem('ks_autoplay'); ttsPlay(); }
    } else {
      const { count } = await api(`chapter/${sid}/${cid}/pages`);
      await comicMount(body, sid, cid, count, { prev: prev ? () => { location.hash = `#/read/${sid}/${prev.id}`; } : null, next: next ? () => { location.hash = `#/read/${sid}/${next.id}`; } : null });
      return;   // comic.js keeps its own progress
    }
  } catch (e) { body.innerHTML = `<p class="err" style="padding:24px">${esc(e.message)}</p>`; return; }
  let t;
  body.onscroll = () => {
    const f = body.scrollTop / Math.max(1, body.scrollHeight - body.clientHeight);
    $('#r-prog').style.width = Math.round(f * 100) + '%';
    clearTimeout(t); t = setTimeout(() => api('progress', { method: 'PUT', body: { series: sid, chapter: cid, pos: +f.toFixed(3) } }).catch(() => {}), 800);
  };
  api('progress', { method: 'PUT', body: { series: sid, chapter: cid, pos: 0 } }).catch(() => {});
}

/* ---------- own text / background colours for the TEXT reader (comics are pictures: not touched) ---------- */
const rgbOf = (css) => {   // any CSS colour -> [r, g, b] as the browser resolves it (hex, rgb(), color-mix(), var())
  const el = document.createElement('i'); el.style.cssText = 'display:none;color:' + css; document.body.appendChild(el);
  const v = getComputedStyle(el).color; el.remove();
  const n = (v.match(/-?[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);
  return v.startsWith('color(') ? n.map((x) => Math.round(x * 255)) : n;
};
const hexOf = (rgb) => '#' + rgb.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
/** WCAG 2.1 contrast ratio of two [r,g,b] colours: (L1 + 0.05) / (L2 + 0.05), L = relative luminance. */
function contrastRatio(a, b) {
  const lum = (rgb) => { const [r, g, k] = rgb.map((c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * k; };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const fmtRatio = (r) => (Math.floor(r * 10) / 10).toFixed(1).replace('.', ',');   // rounded DOWN: 4.48 must not read as 4,5 while it is flagged
function applyReaderColors(body) {
  const c = store('colors', {});
  ['--text', '--text-2', '--bg'].forEach((k) => body.style.removeProperty(k));
  body.style.color = ''; body.style.background = '';
  if (c.fg) { body.style.setProperty('--text', c.fg); body.style.setProperty('--text-2', 'color-mix(in srgb, var(--text) 78%, var(--bg))'); body.style.color = c.fg; }
  if (c.bg) { body.style.setProperty('--bg', c.bg); body.style.background = c.bg; }
}
/** The panel behind the "🎨 Màu chữ" button: two pickers, a reset, and a warning under 4.5:1. */
function colorPanel(panel, body) {
  const draw = () => {
    const c = store('colors', {});
    const fg = c.fg || hexOf(rgbOf('var(--text)')), bg = c.bg || hexOf(rgbOf('var(--bg)'));   // the theme's own colours stand in until one is picked
    const r = contrastRatio(rgbOf(fg), rgbOf(bg));
    panel.innerHTML = `<div class="tts-row"><b>Màu chữ và màu nền</b><span class="muted small">Chỉ cho truyện chữ; truyện tranh là ảnh nên không đổi. Lưu ở trình duyệt này.</span></div>
      <div class="tts-grid">
        <label class="field"><span>Màu chữ <span class="muted small">${c.fg ? '· tự chọn' : '· theo chủ đề'}</span></span><input type="color" id="cl-fg" value="${fg}" aria-label="Màu chữ"></label>
        <label class="field"><span>Màu nền <span class="muted small">${c.bg ? '· tự chọn' : '· theo chủ đề'}</span></span><input type="color" id="cl-bg" value="${bg}" aria-label="Màu nền"></label>
      </div>
      <p class="small ${r < 4.5 ? 'warn' : 'muted'}" id="cl-st" role="status" aria-live="polite">${r < 4.5 ? `⚠ Tương phản ${fmtRatio(r)}:1, khó đọc (cần ≥ 4,5)` : `Tương phản ${fmtRatio(r)}:1, đạt (cần ≥ 4,5)`}</p>
      <div class="row"><button class="btn sm" id="cl-reset"${c.fg || c.bg ? '' : ' disabled'}>Đặt lại màu</button></div>`;
    const pick = (key) => (e) => {
      const cur = store('colors', {}); cur[key] = e.target.value; save('colors', cur); applyReaderColors(body);
      // keep the picker (and its drag) alive: only the labels and the verdict are repainted
      const ok = contrastRatio(rgbOf(store('colors', {}).fg || hexOf(rgbOf('var(--text)'))), rgbOf(store('colors', {}).bg || hexOf(rgbOf('var(--bg)'))));
      const st = $('#cl-st', panel); st.className = 'small ' + (ok < 4.5 ? 'warn' : 'muted');
      st.textContent = ok < 4.5 ? `⚠ Tương phản ${fmtRatio(ok)}:1, khó đọc (cần ≥ 4,5)` : `Tương phản ${fmtRatio(ok)}:1, đạt (cần ≥ 4,5)`;
      $('#cl-reset', panel).disabled = false;
    };
    $('#cl-fg', panel).oninput = pick('fg'); $('#cl-bg', panel).oninput = pick('bg');
    $('#cl-fg', panel).onchange = $('#cl-bg', panel).onchange = draw;
    $('#cl-reset', panel).onclick = () => { save('colors', {}); applyReaderColors(body); draw(); };
  };
  colorPanel.redraw = draw;
  draw();
}

/* ---------- chapter list inside the reader: jump to any chapter ---------- */
function chapterDrawerClose() { $('#ch-drawer')?.remove(); document.removeEventListener('keydown', chapterDrawerKey, true); }
function chapterDrawerKey(e) { if (e.key === 'Escape') { e.stopPropagation(); chapterDrawerClose(); $('#r-chapters')?.focus(); } }
async function chapterDrawer(sid, s, cid) {
  if ($('#ch-drawer')) return chapterDrawerClose();
  const st = await api('state').catch(() => ({ progress: {} }));
  const lastId = st.progress[sid]?.chapter, lastIdx = s.chapters.findIndex((c) => c.id === lastId);
  const cur = s.chapters.findIndex((c) => c.id === cid);
  const rows = s.chapters.map((c, k) => `<a class="ch${c.id === cid ? ' cur' : ''}" href="#/read/${sid}/${c.id}" data-t="${esc((k + 1) + ' ' + c.title).toLowerCase()}"${c.id === cid ? ' aria-current="true"' : ''}>
      <span class="n">${k + 1}</span><span class="t">${esc(c.title)}</span><span class="muted small">${c.id === cid ? 'đang đọc' : k < lastIdx ? '✓ đã đọc' : c.kind === 'comic' ? 'tranh' : 'chữ'}</span></a>`).join('');
  const el = document.createElement('aside');
  el.id = 'ch-drawer'; el.className = 'ch-drawer'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Mục lục chương');
  el.innerHTML = `<div class="c-index-head"><b>Mục lục chương</b><span class="muted small">${s.chapters.length} chương · đang ở chương ${cur + 1}</span><button class="btn sm" id="ch-x">Đóng (Esc)</button></div>
    <div class="ch-search"><input type="search" id="ch-q" placeholder="Lọc theo số hoặc tên chương…" aria-label="Lọc chương"></div>
    <div class="ch-list ch-scroll" id="ch-rows">${rows}</div><p class="muted small ch-none" id="ch-none" hidden>Không có chương nào khớp.</p>`;
  $('#reader').appendChild(el);
  el.addEventListener('click', (e) => { if (e.target.id === 'ch-x') return chapterDrawerClose(); if (e.target.closest('a.ch')) chapterDrawerClose(); });
  $('#ch-q').oninput = (e) => {
    const q = e.target.value.trim().toLowerCase();
    let n = 0;
    $$('#ch-rows a').forEach((a) => { const hit = !q || a.dataset.t.includes(q); a.hidden = !hit; if (hit) n++; });
    $('#ch-none').hidden = n > 0;
  };
  document.addEventListener('keydown', chapterDrawerKey, true);
  $('#ch-rows a.cur')?.scrollIntoView({ block: 'center' });
  $('#ch-q').focus();
}

/* ---------- translation: Trạm Dịch does it, Kệ Sách only asks and keeps the answer ---------- */
async function translatePanel(sid, cid, lines, tr, paint) {
  const btn = $('#r-tr'), panel = $('#tr-panel');
  if (!btn) return;
  const draw = (eng) => {
    const has = !!(tr.saved.translated && tr.saved.translated.length === lines.length);
    const e = eng.engines || [];
    panel.innerHTML = `<div class="tts-row"><b>Dịch bằng Trạm Dịch</b>${eng.error ? `<span class="warn small">${esc(eng.error)}</span>` : `<span class="muted small">${esc(eng.url)}</span>`}</div>
      <div class="tts-grid">
        <label class="field"><span>Engine</span><select id="tr-eng"${eng.error ? ' disabled' : ''}>${e.map((x) => `<option value="${esc(x.id)}">${esc(x.label)}${x.external ? ' ⚠ gửi chữ ra ngoài' : ' · ngoại tuyến'}</option>`).join('') || '<option>(không có)</option>'}</select></label>
        <div class="field"><span>Hiển thị</span><div class="seg" role="group" aria-label="Hiển thị bản dịch">${[['orig', 'Bản gốc'], ['vi', 'Bản dịch'], ['both', 'Song ngữ']].map(([k, l]) => `<button data-trm="${k}" class="${(has ? tr.mode : 'orig') === k ? 'on' : ''}"${!has && k !== 'orig' ? ' disabled' : ''}>${l}</button>`).join('')}</div></div>
      </div>
      <div class="row" style="margin-top:10px"><button class="btn primary" id="tr-go"${eng.error ? ' disabled' : ''}>${has ? 'Dịch lại' : 'Dịch chương này'}</button>${has ? '<button class="btn" id="tr-del">Xoá bản dịch đã lưu</button>' : ''}<span class="muted small" id="tr-st">${has ? `Đã lưu: ${esc(tr.saved.engine)}, từ ${esc(tr.saved.source_lang)}, ${tr.saved.translated.length} đoạn` : ''}</span></div>
      ${has && tr.saved.hits?.length ? `<p class="small" style="margin-top:8px"><b>Từ điển nghĩa</b> đã đổi ${tr.saved.hits.reduce((n, h) => n + h.count, 0)} chỗ trong chương này: ${tr.saved.hits.map((h) => `“${esc(h.from)}” → “${esc(h.to)}” ×${h.count}`).join(', ')} · <a href="#/senses">Mở từ điển nghĩa</a></p>` : has ? '<p class="muted small" style="margin-top:8px">Muốn đổi nghĩa một từ: bôi đen từ đó trong bản dịch rồi bấm “✎ Đổi nghĩa”.</p>' : ''}
      <p class="muted small" style="margin-top:8px">Bản dịch lưu ở KeSach/data/translations (không ghi vào thư mục truyện). Engine có chữ “gửi chữ ra ngoài” gửi nội dung chương tới dịch vụ đó; chỉ “ngoại tuyến” thì ở lại máy. Dịch chữ trong ảnh truyện tranh: Trạm Dịch chưa có, nên Kệ Sách chưa dịch được ảnh.</p>`;
    $$('[data-trm]', panel).forEach((b) => b.onclick = () => { tr.mode = b.dataset.trm; save('tr_mode', tr.mode); paint(); draw(eng); });
    $('#tr-del', panel)?.addEventListener('click', async () => { await api('translate/delete', { method: 'POST', body: { series: sid, chapter: cid } }); tr.saved = {}; paint(); draw(eng); });
    $('#tr-go', panel)?.addEventListener('click', () => go(eng));
  };
  const go = async (eng) => {
    const id = $('#tr-eng', panel).value, x = (eng.engines || []).find((y) => y.id === id);
    if (x?.external && sessionStorage.getItem('ks_ext_ok') !== '1') {
      const ok = await new Promise((done) => {
        const m = modal(`<h2>Gửi chữ ra ngoài?</h2><p>Engine <b>${esc(x.label)}</b> sẽ gửi nội dung chương này tới một dịch vụ bên ngoài máy bạn. Truyện có thể là nội dung riêng tư.</p><p class="muted small">Chỉ hỏi một lần cho tới khi đóng trình duyệt. Engine “ngoại tuyến” thì không gửi gì ra ngoài.</p>
          <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="x-no">Không</button><button class="btn primary" id="x-ok">Đồng ý, dịch</button></div>`);
        $('#x-no', m.el).focus(); $('#x-no', m.el).onclick = () => { m.close(); done(false); }; $('#x-ok', m.el).onclick = () => { m.close(); done(true); };
      });
      if (!ok) return;
      sessionStorage.setItem('ks_ext_ok', '1');
    }
    const st = $('#tr-st', panel), goBtn = $('#tr-go', panel);
    goBtn.disabled = true; st.textContent = `Đang dịch ${lines.length} đoạn… (chương dài có thể mất một lúc)`;
    try {
      const r = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ series: sid, chapter: cid, engine: id, allow_external: !!x?.external }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || j.message || r.statusText);
      tr.saved = j; if (tr.mode === 'orig') tr.mode = 'both';
      paint(); draw(eng); toast('Đã dịch xong và lưu');
    } catch (e) { st.textContent = ''; goBtn.disabled = false; toast(e.message, true); }
  };
  btn.onclick = async () => {
    panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', !panel.hidden);
    if (panel.hidden || panel.dataset.loaded) return;
    panel.dataset.loaded = '1'; panel.innerHTML = '<span class="muted small">Đang hỏi Trạm Dịch…</span>';
    let eng;
    try { const r = await fetch('/api/translate/engines'); const j = await r.json(); eng = r.ok ? j : { url: '', engines: [], error: j.error }; } catch { eng = { url: '', engines: [], error: 'Không hỏi được Trạm Dịch' }; }
    // offline first: the choice that keeps the text on this machine is the default
    eng.engines.sort((a, b) => Number(a.external) - Number(b.external));
    tr.redraw = () => draw(eng);
    draw(eng);
  };
}

/* ---------- comments: my opinions over time, on a series, a chapter or one paragraph; a spoiler stays hidden until clicked ---------- */
const MOODS = { vui: ['😀', 'vui'], buon: ['😢', 'buồn'], gian: ['😡', 'giận'], batngo: ['😮', 'bất ngờ'], yeu: ['🥰', 'yêu thích'], chan: ['😴', 'chán'] };
const dayOf = (t) => new Date(t * 1000).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
function topParagraph() {   // the paragraph at the top of the reader (index among the paragraphs that are read aloud)
  const body = $('#r-body'), top = body.getBoundingClientRect().top;
  const ps = $$('.text-page p:not(.orig)');
  const i = ps.findIndex((p) => p.getBoundingClientRect().bottom > top + 8);
  return Math.max(0, i);
}
function jumpToParagraph(n) {
  const p = $$('.text-page p:not(.orig)')[n];
  if (!p) return toast('Đoạn này không còn trong chương (file đã đổi?)', true);
  const body = $('#r-body');
  body.scrollBy({ top: p.getBoundingClientRect().top - body.getBoundingClientRect().top - body.clientHeight * 0.25, behavior: 'smooth' });
  p.classList.add('flash'); setTimeout(() => p.classList.remove('flash'), 1800);
}
/** cfg = { sid, cid? (chapter panel), chapters? (series page: lets you pick a chapter to attach to), title, para?: () => n, jump?: (n) => void } */
async function commentsBox(box, cfg) {
  const url = cfg.cid ? `comments/chapter/${cfg.sid}/${cfg.cid}` : `comments/series/${cfg.sid}`;
  let list = await api(url).catch(() => []);
  const shown = new Set();   // spoilers the user opened (until the page is left)
  const draw = () => {
    box.innerHTML = `<div class="mine-row"><b>${esc(cfg.title)}</b> <span class="muted small">${list.length}</span></div>
      <div class="cm-list">${list.map((c) => `<div class="cm" data-id="${c.id}">
          <div class="cm-head"><span title="${esc(MOODS[c.mood]?.[1] || '')}">${MOODS[c.mood]?.[0] || '💬'}</span> <span class="muted small">${dayOf(c.at)}${c.edited ? ' · đã sửa' : ''}</span>
            ${c.para != null ? `<button class="chip lnk" data-jump="${c.para}">đoạn ${c.para + 1}</button>` : ''}
            <span class="spacer"></span><button class="mini" data-edit="${c.id}" aria-label="Sửa bình luận" title="Sửa">✎</button><button class="mini" data-del="${c.id}" aria-label="Xoá bình luận" title="Xoá">🗑</button></div>
          ${c.spoiler && !shown.has(c.id) ? `<button class="spoil" data-show="${c.id}">Che spoiler · bấm để hiện</button>` : `<div class="cm-text">${esc(c.text)}</div>`}</div>`).join('') || '<p class="muted small">Chưa có bình luận nào.</p>'}</div>
      <label class="field"><span>Viết bình luận</span><textarea id="cm-text" rows="3" placeholder="Ý kiến của bạn, chỉ lưu ở máy này (KeSach/data/meta.json)"></textarea></label>
      <div class="mine-row"><select id="cm-mood" aria-label="Tâm trạng"><option value="">Tâm trạng…</option>${Object.entries(MOODS).map(([k, [e, l]]) => `<option value="${k}">${e} ${l}</option>`).join('')}</select>
        <label class="check"><input type="checkbox" id="cm-spoil"> Có spoiler (che khi xem lại)</label>
        ${cfg.chapters ? `<select id="cm-target" aria-label="Gắn vào"><option value="">Gắn vào cả bộ</option>${cfg.chapters.map((c) => `<option value="${c.id}">Chương: ${esc(c.title)}</option>`).join('')}</select>` : ''}
        ${cfg.para ? '<label class="check"><input type="checkbox" id="cm-para" checked> Gắn vào đoạn đang đọc</label>' : ''}
        <button class="btn primary sm" id="cm-add">Gửi</button></div>`;
    $$('[data-show]', box).forEach((b) => b.onclick = () => { shown.add(b.dataset.show); draw(); });
    $$('[data-jump]', box).forEach((b) => b.onclick = () => cfg.jump?.(+b.dataset.jump));
    $$('[data-del]', box).forEach((b) => b.onclick = async () => { await api('comments', { method: 'POST', body: { action: 'delete', id: b.dataset.del } }); list = list.filter((c) => c.id !== b.dataset.del); draw(); });
    $$('[data-edit]', box).forEach((b) => b.onclick = async () => {
      const c = list.find((x) => x.id === b.dataset.edit);
      const t = await askText('Sửa bình luận', c.text);
      if (!t || t === c.text) return;
      try { Object.assign(c, await api('comments', { method: 'POST', body: { action: 'update', id: c.id, text: t } })); draw(); } catch (e) { toast(e.message, true); }
    });
    $('#cm-add', box).onclick = async () => {
      const text = $('#cm-text', box).value.trim();
      if (!text) return toast('Chưa viết gì', true);
      const target = $('#cm-target', box)?.value;
      const body = { action: 'add', text, mood: $('#cm-mood', box).value, spoiler: $('#cm-spoil', box).checked, series: cfg.sid };
      if (cfg.cid || target) { body.scope = 'chapter'; body.chapter = cfg.cid || target; if (cfg.para && $('#cm-para', box)?.checked && cfg.cid) body.para = cfg.para(); } else body.scope = 'series';
      try {
        const c = await api('comments', { method: 'POST', body });
        if (body.scope === 'series' || (cfg.cid && body.chapter === cfg.cid)) list.unshift(c); else toast('Đã thêm vào chương đã chọn (xem ở mục Bình luận)');
        draw();
      } catch (e) { toast(e.message, true); }
    };
  };
  draw();
}
async function renderCommentsPage() {
  const f = renderCommentsPage.f || (renderCommentsPage.f = { mood: '', spoiler: '', q: '' });
  const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString();
  const list = await api('comments' + (qs ? '?' + qs : ''));
  const shown = renderCommentsPage.shown || (renderCommentsPage.shown = new Set());
  main.innerHTML = `<div class="page-head"><h1>Bình luận <small>${list.length}</small></h1></div>
    <div class="toolbar"><input type="search" id="cp-q" placeholder="Tìm trong bình luận (không cần dấu)…" value="${esc(f.q)}" aria-label="Tìm trong bình luận" style="flex:1;max-width:420px">
      <select id="cp-mood" aria-label="Tâm trạng"><option value="">Mọi tâm trạng</option>${Object.entries(MOODS).map(([k, [e, l]]) => `<option value="${k}"${f.mood === k ? ' selected' : ''}>${e} ${l}</option>`).join('')}</select>
      <select id="cp-sp" aria-label="Spoiler"><option value="">Có và không spoiler</option><option value="1"${f.spoiler === '1' ? ' selected' : ''}>Chỉ có spoiler</option><option value="0"${f.spoiler === '0' ? ' selected' : ''}>Không spoiler</option></select></div>
    ${list.length ? `<div class="ch-list">${list.map((c) => `<div class="ch cm-row"><span>${MOODS[c.mood]?.[0] || '💬'}</span><span class="t" style="white-space:normal">
        ${c.series ? `<a href="#/${c.chapter ? `read/${c.series}/${c.chapter}` : 'series/' + c.series}"><b>${esc(c.label)}</b></a>` : `<b>${esc(c.label)}</b> <span class="warn small">không còn trong thư viện</span>`}
        <span class="muted small">${c.series_title ? '· ' + esc(c.series_title) : c.scope === 'series' ? '· cả bộ' : ''}${c.para != null ? ` · đoạn ${c.para + 1}` : ''} · ${dayOf(c.at)}</span><br>
        ${c.spoiler && !shown.has(c.id) ? `<button class="spoil" data-show="${c.id}">Che spoiler · bấm để hiện</button>` : `<span class="cm-text">${esc(c.text)}</span>`}</span></div>`).join('')}</div>` : '<div class="empty"><h2>Chưa có bình luận</h2><p class="small">Viết ở trang bộ hoặc nút 💬 trong bộ đọc.</p></div>'}`;
  let t;
  $('#cp-q').oninput = (e) => { f.q = e.target.value; clearTimeout(t); t = setTimeout(async () => { const pos = e.target.selectionStart; await renderCommentsPage(); const q = $('#cp-q'); q.focus(); q.setSelectionRange(pos, pos); }, 300); };
  $('#cp-mood').onchange = (e) => { f.mood = e.target.value; renderCommentsPage(); };
  $('#cp-sp').onchange = (e) => { f.spoiler = e.target.value; renderCommentsPage(); };
  $$('[data-show]').forEach((b) => b.onclick = () => { shown.add(b.dataset.show); renderCommentsPage(); });
}

/* ---------- meaning dictionary ("từ điển thay nghĩa"): replace a word of the translation by one you type, with a scope ---------- */
const SCOPE_LABEL = { para: 'Đoạn này', chapter: 'Chương này', series: 'Cả bộ này', all: 'Mọi truyện' };
/** Select words in the translated text: a small button offers "change the meaning". */
function senseSelection(article, ctx) {
  const btn = document.createElement('button');
  btn.className = 'btn sm sense-fab'; btn.textContent = '✎ Đổi nghĩa'; btn.hidden = true; document.body.appendChild(btn);
  let cur = null;
  const hide = () => { btn.hidden = true; cur = null; };
  article.addEventListener('mouseup', () => setTimeout(() => {
    const sel = getSelection();
    if (!sel || sel.isCollapsed || !ctx.tr.saved.translated || ctx.tr.mode === 'orig') return hide();
    const text = sel.toString().trim();
    const p = (sel.anchorNode?.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode)?.closest?.('p');
    if (!text || text.length > 80 || text.includes('\n') || !p || !article.contains(p) || p.classList.contains('orig') || p !== (sel.focusNode?.nodeType === 3 ? sel.focusNode.parentElement : sel.focusNode)?.closest?.('p')) return hide();
    const r = sel.getRangeAt(0).getBoundingClientRect();
    cur = { text, para: $$('p:not(.orig)', article).indexOf(p) };
    btn.style.left = Math.min(innerWidth - 120, r.right) + 'px'; btn.style.top = (r.bottom + 6) + 'px'; btn.hidden = false;
  }, 0));
  document.addEventListener('mousedown', (e) => { if (e.target !== btn) setTimeout(() => { if (!getSelection().toString().trim()) hide(); }, 0); });
  btn.onclick = () => {
    const c = cur; hide(); getSelection().removeAllRanges();
    if (!c) return;
    // the word on screen may be the OUTCOME of an earlier rule; rules work on the engine's text, so offer the word it came from
    const h = (ctx.tr.saved.hits || []).find((x) => x.to && x.to.toLowerCase() === c.text.toLowerCase());
    senseDialog({ ...c, ...ctx, from: h ? h.from : c.text, note: h ? `“${c.text}” đang hiện do quy tắc “${h.from}” → “${h.to}”. Quy tắc mới (phạm vi hẹp hơn) sẽ đặt cho từ gốc “${h.from}” và được ưu tiên.` : '' });
  };
}
async function senseDialog(x) {
  const loose = (await api('series/' + x.sid)).loose;
  const word = /^[\p{L}\p{N}_ ]+$/u.test(x.from || x.text);
  const m = modal(`<h2>Đổi nghĩa trong bản dịch</h2>
    <p class="muted small">Chỉ đổi cách hiển thị; bản dịch đã lưu của engine không bị sửa.</p>
    ${x.note ? `<p class="small warn">${esc(x.note)}</p>` : ''}
    <div class="br-grid"><label class="field">Từ trong bản dịch<input type="text" id="sn-from" value="${esc(x.from || x.text)}"></label><label class="field">Thay bằng<input type="text" id="sn-to" placeholder="nghĩa đúng (để trống = xoá từ)"></label></div>
    <div class="row" style="margin:10px 0 4px"><b>Phạm vi</b>${Object.entries(SCOPE_LABEL).map(([k, l]) => `<label class="check"><input type="radio" name="sn-scope" value="${k}"${k === 'chapter' ? ' checked' : ''}${k === 'series' && loose ? ' disabled' : ''}> ${l}</label>`).join('')}</div>
    <div class="row"><label class="check"><input type="checkbox" id="sn-whole"${word ? ' checked' : ''}> Đúng nguyên từ (không đổi “giống” trong “giống loài”… nếu bỏ tick thì đổi cả trong từ dài hơn)</label></div>
    <div class="row"><label class="check"><input type="checkbox" id="sn-nocase"> Không phân biệt hoa thường</label></div>
    <h3 class="sec" style="margin:12px 0 6px">Sẽ đổi ở đâu <span class="muted small" id="sn-count"></span></h3>
    <div class="plan" id="sn-prev" style="max-height:28vh"></div>
    <p class="small err" id="sn-err"></p>
    <div class="row" style="margin-top:10px;justify-content:flex-end"><button class="btn" id="sn-no">Huỷ</button><button class="btn primary" id="sn-ok" disabled>Lưu quy tắc</button></div>`);
  const $m = (s) => $(s, m.el);
  let rows = [], t;
  const body = (extra = {}) => ({ from: $m('#sn-from').value, to: $m('#sn-to').value, scope: $m('input[name=sn-scope]:checked').value, whole: $m('#sn-whole').checked, nocase: $m('#sn-nocase').checked, para: x.para, series: x.sid, chapter: x.cid, ...extra });
  const preview = async () => {
    try { rows = await api('senses', { method: 'POST', body: body({ action: 'preview' }) }); $m('#sn-err').textContent = ''; }
    catch (e) { rows = []; $m('#sn-err').textContent = e.message; }
    const multi = ['series', 'all'].includes($m('input[name=sn-scope]:checked').value);
    $m('#sn-count').textContent = `${rows.reduce((n, r) => n + r.count, 0)} chỗ trong ${rows.length} chương`;
    $m('#sn-prev').innerHTML = rows.map((r, i) => `<div>${multi ? `<label class="check"><input type="checkbox" data-r="${i}" checked> </label>` : ''}<b>${esc(r.series_title)} · ${esc(r.title)}</b> <span class="muted small">×${r.count}</span><br><span class="muted small">${esc(r.before)}</span><br>→ <span class="small">${esc(r.after)}</span></div>`).join('') || '<span class="muted small">Chưa có chỗ nào khớp trong các bản dịch đã lưu (quy tắc vẫn lưu được cho lần sau).</span>';
    $m('#sn-ok').disabled = !$m('#sn-from').value.trim() || $m('#sn-from').value.trim() === $m('#sn-to').value.trim();
  };
  const later = () => { clearTimeout(t); t = setTimeout(preview, 250); };
  $$('input', m.el).forEach((i) => { i.oninput = later; i.onchange = later; });
  $m('#sn-to').focus(); preview();
  $m('#sn-no').onclick = m.close;
  $m('#sn-ok').onclick = async () => {
    const skip = $$('[data-r]', m.el).filter((c) => !c.checked).map((c) => rows[+c.dataset.r].key);
    try {
      await api('senses', { method: 'POST', body: body({ action: 'add', exclude: skip }) });
      m.close(); await x.tr.refresh(); const h = (x.tr.saved.hits || []).reduce((n, r) => n + r.count, 0); toast(`Đã lưu quy tắc · chương này đổi ${h} chỗ`);
    } catch (e) { $m('#sn-err').textContent = e.message; }
  };
}
async function renderSensesPage() {
  const { rules, chapters } = await api('senses');
  main.innerHTML = `<div class="page-head"><h1>Từ điển nghĩa <small>${rules.length}</small></h1></div>
    <div class="info-banner">Quy tắc của riêng bạn: <b>thay một từ trong bản dịch bằng nghĩa bạn gõ</b>, theo phạm vi (đoạn, chương, cả bộ, mọi truyện). Chỉ đổi cách hiển thị; bản dịch của engine ở <code>KeSach/data/translations</code> không bị sửa, và dịch lại bằng engine khác thì quy tắc vẫn áp dụng. Tạo quy tắc: bôi đen từ trong bản dịch ở bộ đọc → “✎ Đổi nghĩa”. Đang có ${chapters} chương có bản dịch.</div>
    ${rules.length ? `<div class="ch-list">${rules.map((r) => `<div class="ch sense-row${r.enabled ? '' : ' off'}"><label class="check" title="Bật / tắt"><input type="checkbox" data-on="${r.id}"${r.enabled ? ' checked' : ''}></label>
        <span class="t" style="white-space:normal"><b>${esc(r.from)}</b> → <b>${esc(r.to) || '<span class="muted">(xoá từ)</span>'}</b><br><span class="muted small">${esc(r.label)}${r.whole ? ' · nguyên từ' : ''}${r.nocase ? ' · không phân biệt hoa thường' : ''}${r.exclude?.length ? ` · bỏ ${r.exclude.length} chương` : ''} · đang đổi <b>${r.uses}</b> chỗ</span></span>
        <button class="mini" data-edit="${r.id}" aria-label="Sửa nghĩa" title="Sửa nghĩa mới">✎</button><button class="mini" data-del="${r.id}" aria-label="Xoá quy tắc" title="Xoá">🗑</button></div>`).join('')}</div>`
      : '<div class="empty"><h2>Chưa có quy tắc nào</h2><p class="small">Dịch một chương, bôi đen một từ dịch sai rồi bấm “✎ Đổi nghĩa”.</p></div>'}`;
  $$('[data-on]').forEach((c) => c.onchange = async () => { await api('senses', { method: 'POST', body: { action: 'update', id: c.dataset.on, enabled: c.checked } }); renderSensesPage(); });
  $$('[data-del]').forEach((b) => b.onclick = async () => { await api('senses', { method: 'POST', body: { action: 'delete', id: b.dataset.del } }); renderSensesPage(); });
  $$('[data-edit]').forEach((b) => b.onclick = async () => {
    const r = rules.find((x) => x.id === b.dataset.edit);
    const v = await askName(`Nghĩa mới cho “${r.from}”`, r.to);
    if (v === null) return;
    try { await api('senses', { method: 'POST', body: { action: 'update', id: r.id, to: v } }); renderSensesPage(); } catch (e) { toast(e.message, true); }
  });
}

/* ---------- search ---------- */
// The same fold as app/search.py: lower case, no diacritics, đ = d, one character in -> one character out.
const foldCh = (c) => (c === 'đ' || c === 'Đ' ? 'd' : (c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()[0] || c));
const foldStr = (s) => Array.from(s).map(foldCh).join('');
/** Paint every match of q in the open chapter and scroll to the first one (CSS highlight, the text is not touched). */
function findInChapter(article, q) {
  const nq = foldStr(q.trim());
  if (!nq || !('highlights' in CSS) || typeof Highlight !== 'function') return;
  const ranges = [];
  $$('p', article).forEach((p) => {
    const node = p.firstChild;
    if (!node || node.nodeType !== 3) return;
    const t = foldStr(node.nodeValue);
    for (let i = t.indexOf(nq); i >= 0; i = t.indexOf(nq, i + nq.length)) {
      const r = document.createRange();
      try { r.setStart(node, i); r.setEnd(node, i + nq.length); ranges.push(r); } catch { /* skip */ }
    }
  });
  if (!ranges.length) return;
  CSS.highlights.set('ks-find', new Highlight(...ranges));
  const body = $('#r-body'), box = ranges[0].getBoundingClientRect(), b = body.getBoundingClientRect();
  body.scrollBy({ top: box.top - b.top - b.height * 0.3 });
  toast(`Tô ${ranges.length} chỗ khớp “${q}”`);
}
const mark = (text, start, len) => `${esc(text.slice(0, start))}<mark>${esc(text.slice(start, start + len))}</mark>${esc(text.slice(start + len))}`;
let searchPoll = 0;
async function renderSearch(q) {
  clearTimeout(searchPoll);
  const r = q ? await api('search?q=' + encodeURIComponent(q)) : { content: [], notes: [], titles: [], status: await api('search/status') };
  const st = r.status, built = st.documents > 0;
  const head = `<div class="page-head"><h1>Tìm kiếm</h1></div>
    <form id="sf" class="toolbar"><input type="search" id="sq" value="${esc(q)}" placeholder="Từ, câu hoặc tên… (không cần dấu: “ngay mua” tìm ra “ngày mưa”)" aria-label="Từ khoá" style="flex:1;max-width:560px"><button class="btn primary" type="submit">Tìm</button></form>
    <div class="info-banner" id="idx">${st.running ? `⏳ Đang lập chỉ mục: ${st.done} / ${st.total} chương chữ…` : built ? `Đã lập chỉ mục ${st.documents} chương chữ. <button class="btn sm" id="idx-go">Cập nhật chỉ mục</button> <span class="muted small">chỉ đọc lại chương đã đổi</span>` : `Chưa lập chỉ mục nội dung. Lập chỉ mục đọc <b>toàn bộ</b> chương chữ một lần (thư mục Drive ở chế độ “Stream” sẽ tải chúng về máy), nên chỉ làm khi bạn bấm. <button class="btn primary sm" id="idx-go">Lập chỉ mục</button>`}</div>`;
  const noRes = q && !r.content.length && !r.notes.length && !r.titles.length;
  const body = !q ? '<p class="muted">Gõ từ khoá để tìm trong tên bộ, nội dung các chương chữ, ghi chú và tag của bạn. Truyện tranh không có chữ để tìm.</p>'
    : `${r.titles.length ? `<h2 class="sec">Tên bộ <span class="muted small">${r.titles.length}</span></h2><div class="ch-list">${r.titles.map((t) => `<a class="ch" href="#/series/${t.series}"><span class="t"><b>${esc(t.title)}</b></span><span class="muted small">${esc(t.where)}</span></a>`).join('')}</div>` : ''}
      ${r.notes.length ? `<h2 class="sec">Ghi chú, bình luận và tag của tôi <span class="muted small">${r.notes.length}</span></h2><div class="ch-list">${r.notes.map((n) => `<a class="ch" href="#/${n.type === 'series' || (n.type === 'comment' && !n.chapter) ? 'series/' + n.series : 'read/' + n.series + '/' + n.chapter}"><span class="t"><b>${esc(n.title)}</b>${n.series_title ? ` <span class="muted small">· ${esc(n.series_title)}</span>` : ''}<br><span class="muted small">${n.type === 'comment' ? `${MOODS[n.mood]?.[0] || '💬'} ` : ''}${n.spoiler ? 'Che spoiler · có từ khoá trong bình luận này' : esc((n.text || (n.tags || []).map((t) => t.name).join(', ')).slice(0, 160))}</span></span></a>`).join('')}</div>` : ''}
      ${built || r.content.length ? `<h2 class="sec">Trong nội dung <span class="muted small">${r.content.length}${r.content.length >= 60 ? '+' : ''} chương</span></h2>${r.content.length ? `<div class="ch-list">${r.content.map((h) => `<a class="ch hit" href="#/read/${h.series}/${h.chapter}?q=${encodeURIComponent(q)}"><span class="t"><b>${esc(h.title)}</b> <span class="muted small">· ${esc(h.series_title)} · ${h.count} chỗ</span>${h.snippets.map((s) => `<br><span class="snip">${mark(s.text, s.start, s.len)}</span>`).join('')}</span></a>`).join('')}</div>` : '<p class="muted small">Không có chương nào khớp.</p>'}` : ''}
      ${noRes && !built ? '<p class="muted small">Chưa có kết quả trong tên bộ và ghi chú. Muốn tìm trong nội dung thì lập chỉ mục ở trên.</p>' : ''}`;
  main.innerHTML = head + body;
  $('#sq').focus();
  $('#sf').onsubmit = (e) => { e.preventDefault(); const v = $('#sq').value.trim(); location.hash = '#/search' + (v ? '?q=' + encodeURIComponent(v) : ''); if (location.hash === ('#/search' + (v ? '?q=' + encodeURIComponent(v) : ''))) renderSearch(v); };
  $('#idx-go')?.addEventListener('click', async () => { await fetch('/api/search/index', { method: 'POST' }); renderSearch(q); });
  if (st.running) searchPoll = setTimeout(() => { if (location.hash.startsWith('#/search')) renderSearch(q); }, 1200);
}
// "/" jumps to the search box; Enter there opens the results
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.target.closest?.('input,textarea,select') && !$('#reader') && !$('.modal')) { e.preventDefault(); $('#gs').focus(); }
});
$('#gs').addEventListener('keydown', (e) => { if (e.key === 'Enter') { const v = e.target.value.trim(); location.hash = '#/search' + (v ? '?q=' + encodeURIComponent(v) : ''); e.target.blur(); } });

/* ---------- settings: shelves (folders of stories), look, shared names, translation, writing ---------- */
const timeOf = (t) => (t ? new Date(t * 1000).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : 'chưa quét');
async function shelfApi(body) {
  const r = await fetch('/api/shelves', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}
/** Ask for a shelf's name and folder (add), or just its folder (change). Resolves when the server accepted it. */
function shelfDialog(sh, nth) {
  const m = modal(`<h2>${sh ? `Đổi thư mục của kệ “${esc(sh.name)}”` : 'Thêm kệ'}</h2>
    <p class="muted small">Kệ = một thư mục chứa truyện (khác “kệ” ở Trạm Dịch, nơi kệ là một nhóm sách). Kệ Sách chỉ đọc thư mục này.</p>
    ${sh ? '' : `<label class="field">Tên kệ<input type="text" id="sd-name" value="${esc('Kệ ' + nth)}" maxlength="60" style="width:100%"></label>`}
    <label class="field" style="margin-top:10px">Thư mục<input type="text" id="sd-path" value="${esc(sh ? sh.path : '')}" placeholder="G:\\My Drive\\…\\Truyen" style="width:100%"></label>
    <p class="muted small">Đường dẫn đầy đủ của thư mục trên máy (thư mục của Google Drive for Desktop đã mount thành ổ đĩa cũng được). Dán được kiểu “Copy as path” của Windows. Không nhận link Drive; hai kệ không được trùng hoặc lồng nhau.</p>
    <p class="small err" id="sd-err" role="alert"></p>
    <div class="row" style="margin-top:12px;justify-content:flex-end"><button class="btn" id="sd-no">Huỷ</button><button class="btn primary" id="sd-ok">${sh ? 'Đổi và quét' : 'Thêm và quét'}</button></div>`);
  (sh ? $('#sd-path', m.el) : $('#sd-name', m.el)).focus();
  $('#sd-no', m.el).onclick = m.close;
  $('#sd-ok', m.el).onclick = async () => {
    $('#sd-ok', m.el).disabled = true;
    try {
      const r = await shelfApi(sh ? { action: 'change', id: sh.id, path: $('#sd-path', m.el).value } : { action: 'add', name: $('#sd-name', m.el).value, path: $('#sd-path', m.el).value });
      m.close(); toast(`Đã quét: ${r.shelves.find((x) => x.id === r.id)?.series ?? 0} bộ`); renderSettings();
    } catch (e) { $('#sd-err', m.el).textContent = e.message; $('#sd-ok', m.el).disabled = false; }
  };
}
async function renderSettings() {
  const st = await api('state');
  const sh = st.shelves;
  main.innerHTML = `<div class="page-head"><h1>Cài đặt</h1></div>
    <div class="row" style="margin:-4px 0 18px" role="navigation" aria-label="Các mục cài đặt">${[['set-shelves', 'Kệ (nguồn thư viện)'], ['set-look', 'Giao diện'], ['set-names', 'Tên riêng'], ['set-tr', 'Dịch'], ['set-write', 'Ghi vào Drive']].map(([id, l]) => `<button class="chip lnk" data-jump="${id}">${l}</button>`).join('')}</div>
    <h2 id="set-shelves" class="set-h">Kệ (nguồn thư viện)</h2>
    <div class="set-box wide"><div class="info-banner">ⓘ <b>Kệ = một thư mục chứa truyện.</b> Thêm bao nhiêu kệ cũng được; Thư viện hiện chung mọi kệ và có bộ lọc “Kệ”. (Ở Trạm Dịch, “kệ” là một nhóm sách, nghĩa khác.) <b>Chỉ đọc:</b> Kệ Sách không ghi, đổi tên hay xoá gì trong các thư mục này${st.write ? ' trừ khi bạn bật “Ghi vào Drive” bên dưới, và khi đó mỗi lần ghi chỉ nằm trong MỘT kệ' : ''}. Tiến độ đọc, bộ sưu tập, bình luận nằm ở <code>KeSach/data/</code> trên máy này.</div>
      ${st.locked ? `<p class="warn small">${esc(st.locked)}</p>` : ''}
      ${sh.length ? `<div class="shelf-table" role="table" aria-label="Danh sách kệ"><div class="shelf-row head" role="row"><span role="columnheader">Kệ</span><span role="columnheader">Thư mục</span><span role="columnheader">Số bộ</span><span role="columnheader">Quét lần cuối</span><span></span></div>
        ${sh.map((x) => `<div class="shelf-row" role="row"><b role="cell">${esc(x.name)}</b><span role="cell" class="path" title="${esc(x.path)}">${esc(x.path)}${x.error ? `<br><span class="err small">${esc(x.error)}</span>` : ''}</span><span role="cell">${x.error ? '—' : x.series}</span><span role="cell" class="muted small">${esc(timeOf(x.scanned))}</span>
          <span class="row" role="cell"><button class="btn sm" data-sh="change" data-id="${esc(x.id)}"${st.locked ? ' disabled' : ''}>Đổi thư mục…</button><button class="btn sm" data-sh="rename" data-id="${esc(x.id)}"${st.locked ? ' disabled' : ''}>Đổi tên…</button><button class="btn sm" data-sh="rescan" data-id="${esc(x.id)}">Quét</button><button class="btn sm" data-sh="remove" data-id="${esc(x.id)}"${st.locked ? ' disabled' : ''}>Gỡ</button></span></div>`).join('')}</div>`
        : '<p class="muted">Chưa có kệ nào. Thêm một kệ để bắt đầu.</p>'}
      <div class="row"><button class="btn primary" id="sh-add"${st.locked ? ' disabled' : ''}>＋ Thêm kệ…</button>${sh.length ? '<button class="btn" id="sh-all">Quét lại tất cả các kệ</button>' : ''}</div></div>
    <h2 id="set-look" class="set-h">Giao diện</h2>
    <div class="set-box"><label>Chủ đề<select id="s-theme">${Object.entries(THEMES).map(([k, [n]]) => `<option value="${k}"${k === store('theme', 'tokyo') ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
      <p class="muted small">Màu chữ và màu nền riêng cho truyện chữ: nút “🎨 Màu chữ” trong bộ đọc.</p></div>
    <h2 id="set-names" class="set-h">Tên riêng</h2>
    <div class="set-box"><p>Kệ Sách không giữ bộ tên riêng: dùng chung với Trạm Dịch.</p><div class="row"><a class="btn" href="${esc(st.translate_url)}/#/names" target="_blank" rel="noopener">Mở Tên riêng ở Trạm Dịch →</a></div></div>
    <h2 id="set-tr" class="set-h">Dịch</h2>
    <div class="set-box"><label>Địa chỉ Trạm Dịch (chỉ máy này)<input type="text" id="tr-url" value="${esc(st.translate_url)}"></label><p class="muted small">Kệ Sách không tự dịch: nó nhờ Trạm Dịch (mở <code>TranslateCenter/start.bat</code>) dịch từng chương chữ rồi lưu bản dịch lại. Địa chỉ chỉ nhận 127.0.0.1 hoặc localhost.</p><div class="row"><button class="btn" id="tr-save">Lưu địa chỉ</button></div></div>
    <h2 id="set-write" class="set-h">Ghi vào Drive</h2>
    <div class="set-box"><label class="check" style="flex-direction:row;align-items:flex-start;gap:10px;color:var(--text)"><input type="checkbox" id="w-on"${st.write ? ' checked' : ''}><span>Cho phép Kệ Sách ghi vào thư mục thư viện<br><span class="muted small">Mặc định tắt (chỉ đọc). Khi bật, Kệ Sách chỉ làm được hai việc: <b>chuyển một file chương vào thư mục của một bộ</b> và <b>tạo thư mục bộ mới</b> trong thư mục fandom hoặc nhóm. Không ghi đè, không xoá, không đổi tên, không ra ngoài thư mục gốc của kệ đó (và không chuyển giữa hai kệ); mỗi lần đều có hộp xác nhận ghi rõ từ đâu đến đâu.</span></span></label>
      <div id="w-log"></div></div>`;
  $$('[data-jump]').forEach((b) => b.onclick = () => document.getElementById(b.dataset.jump).scrollIntoView({ block: 'start' }));
  $('#sh-add').onclick = () => shelfDialog(null, sh.length + 1);
  $('#sh-all')?.addEventListener('click', async () => { const r = await api('rescan', { method: 'POST', body: {} }); toast(r.error || `Đã quét lại: ${r.series} bộ`, !!r.error); renderSettings(); });
  $$('[data-sh]').forEach((b) => b.onclick = async () => {
    const x = sh.find((y) => y.id === b.dataset.id), act = b.dataset.sh;
    try {
      if (act === 'change') return shelfDialog(x);
      if (act === 'rename') { const n = await askName('Đổi tên kệ', x.name); if (n && n !== x.name) { await shelfApi({ action: 'rename', id: x.id, name: n }); renderSettings(); } return; }
      if (act === 'rescan') { b.disabled = true; const r = await shelfApi({ action: 'rescan', id: x.id }); const y = r.shelves.find((z) => z.id === x.id); toast(y.error || `Đã quét “${y.name}”: ${y.series} bộ`, !!y.error); return renderSettings(); }
      const m = modal(`<h2>Gỡ kệ “${esc(x.name)}”?</h2><p>Chỉ <b>gỡ khỏi danh sách</b>. Thư mục <code>${esc(x.path)}</code> và truyện trong đó không bị động tới.</p>
        <p class="muted small">Tiến độ đọc, bộ sưu tập, bình luận, ghi chú và từ điển nghĩa vẫn được giữ trong <code>KeSach/data/</code>; các mục thuộc kệ này sẽ báo “không tìm thấy” cho tới khi bạn thêm lại đúng thư mục này.</p>
        <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="rm-no">Huỷ</button><button class="btn primary" id="rm-ok">Gỡ kệ</button></div>`);
      $('#rm-no', m.el).focus(); $('#rm-no', m.el).onclick = m.close;
      $('#rm-ok', m.el).onclick = async () => { m.close(); try { await shelfApi({ action: 'remove', id: x.id }); toast(`Đã gỡ kệ “${x.name}”`); if (state.shelf === x.id) { state.shelf = ''; save('shelf', ''); } renderSettings(); } catch (e) { toast(e.message, true); } };
    } catch (e) { toast(e.message, true); b.disabled = false; }
  });
  $('#tr-save').onclick = async () => { try { await api('settings', { method: 'PUT', body: { translate_url: $('#tr-url').value } }); toast('Đã lưu địa chỉ Trạm Dịch'); } catch (e) { toast(e.message, true); } };
  $('#s-theme').onchange = (e) => setTheme(e.target.value);
  const drawLog = async () => {
    const list = await api('drive/batches').catch(() => []);
    const verb = (st) => (st.op === 'mkdir' ? 'tạo' : st.op.startsWith('undo') ? 'hoàn tác' : 'chuyển');
    $('#w-log').innerHTML = list.length ? `<p class="small" style="margin:6px 0 4px"><b>Những lần ghi vào Drive</b> <span class="muted">(mới nhất trước; nhật ký đầy đủ ở KeSach/data/drive-log.jsonl)</span></p>
      <div class="plan">${list.slice(0, 15).map((x) => {
        const shown = x.steps.slice(0, 3), more = x.steps.length - shown.length;
        return `<div class="batch">${x.partial ? '⚠' : '✓'} <span class="muted small">${esc(x.t)}${st.shelves.length > 1 ? ' · kệ ' + esc(x.shelf_name) : ''}</span>
          <button class="btn sm undo-btn" data-undo="${esc(x.batch)}"${x.undoable ? '' : ' disabled'}>${x.undone ? 'Đã hoàn tác' : 'Hoàn tác'}</button><br>
          ${shown.map((st) => `<span class="small">${st.ok ? '' : '✗ '}${verb(st)} <code>${esc(st.from ? st.from + ' → ' : '')}${esc(st.to)}</code>${st.error ? ` <span class="err">${esc(st.error)}</span>` : ''}</span>`).join('<br>')}${more > 0 ? `<br><span class="muted small">… và ${more} bước nữa</span>` : ''}</div>`;
      }).join('')}</div>` : '<p class="muted small">Chưa ghi gì vào Drive.</p>';
    $$('[data-undo]').forEach((b) => b.onclick = async () => {
      try { confirmMove(await driveApi('plan', { undo: b.dataset.undo }), drawLog); } catch (e) { toast(e.message, true); }
    });
  };
  drawLog();
  $('#w-on').onchange = async (e) => {
    const box = e.target, on = box.checked;
    const set = async (v) => { try { await api('settings', { method: 'PUT', body: { write: v } }); box.checked = v; toast(v ? 'Đã bật ghi vào Drive' : 'Đã tắt ghi vào Drive (chỉ đọc)'); } catch (er) { box.checked = !v; toast(er.message, true); } };
    if (!on) return set(false);
    box.checked = false;   // it only turns on after the user confirms
    const m = modal(`<h2>Bật ghi vào Drive?</h2><p>Kệ Sách sẽ được chuyển file chương và tạo thư mục bộ mới trong thư mục thư viện của bạn. Mỗi lần đều hỏi xác nhận, không ghi đè, không xoá.</p><div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="w-no">Giữ chỉ đọc</button><button class="btn primary" id="w-yes">Bật</button></div>`);
    $('#w-no', m.el).focus();
    $('#w-no', m.el).onclick = m.close;
    $('#w-yes', m.el).onclick = () => { m.close(); set(true); };
  };
}

/* ---------- router ---------- */
async function route() {
  $('#reader')?.remove();
  $$('.sel-bar').forEach((b) => b.remove());
  document.removeEventListener('keydown', chapterDrawerKey, true);
  if (typeof comicUnmount === 'function') comicUnmount();
  const [hp, hq] = location.hash.split('?'), params = new URLSearchParams(hq || '');
  const [, a, b, c] = hp.split('/');
  $$('[data-nav]').forEach((n) => n.classList.toggle('active', (a === 'settings' ? 'settings' : a === 'search' ? 'search' : a === 'comments' ? 'comments' : a === 'senses' ? 'senses' : 'lib') === n.dataset.nav));
  try {
    if (a === 'series') await renderSeries(b);
    else if (a === 'collection') await renderCollection(b);
    else if (a === 'read') await renderReader(b, c, params.get('q'));
    else if (a === 'search') await renderSearch(params.get('q') || '');
    else if (a === 'comments') await renderCommentsPage();
    else if (a === 'senses') await renderSensesPage();
    else if (a === 'settings') await renderSettings();
    else await renderLibrary();
  } catch (e) { main.innerHTML = `<div class="empty"><h2>Có lỗi</h2><p class="err">${esc(e.message)}</p></div>`; }
}
$$('[data-kind]').forEach((b) => b.onclick = () => { state.kind = b.dataset.kind; if ((location.hash || '#/') !== '#/') location.hash = '#/'; else renderLibrary(); });
window.addEventListener('hashchange', route);
drawColls();
route();

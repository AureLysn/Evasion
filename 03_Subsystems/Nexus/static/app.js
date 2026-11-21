'use strict';

/* ================= utilities ================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// a chapter taken from a vault note that is not `status: final` yet
const DRAFT_STATUS = new Set(['idea', 'draft', 'wip', 'review']);
const draftTag = (c) => (DRAFT_STATUS.has(c.vault_status) ? ` <span class="draft-tag" title="Trong vault chương này chưa chốt (status: ${esc(c.vault_status)})">nháp</span>` : '');
// a chapter Aurel has a version of on the writing desk (desk.js)
const editTag = (c) => (c.has_edit ? ` <a class="edit-tag" href="#/read/${c.id}?write=1" title="Có bản bạn sửa — mở bàn viết">bản sửa</a>` : '');
const main = $('#main');

async function api(path, opts = {}) {
  const init = { method: opts.method || 'GET', headers: {} };
  if (opts.body !== undefined) {
    if (opts.raw) {
      init.body = opts.body;
      if (opts.type) init.headers['Content-Type'] = opts.type;
    } else {
      init.body = JSON.stringify(opts.body);
      init.headers['Content-Type'] = 'application/json';
    }
  }
  const res = await fetch(path, init);
  const ct = res.headers.get('Content-Type') || '';
  const data = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const err = new Error((data && (data.message || data.error)) || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/** Quick notice, bottom right. kind: false/'ok' (green tick), true/'err' (red), 'warn' (amber). Never colour alone: each has an icon. */
function toast(msg, err = false, ms = 5000) {
  const kind = err === true ? 'err' : err || 'ok';
  const el = document.createElement('div');
  el.className = `toast t-${kind}`;
  el.setAttribute('role', kind === 'err' ? 'alert' : 'status');
  el.innerHTML = `<span class="t-ico" aria-hidden="true">${{ ok: '✓', warn: 'ⓘ', err: 'ⓘ' }[kind]}</span><span class="t-msg"></span>
    <button class="icon-btn t-x" aria-label="Đóng thông báo">✕</button>`;
  $('.t-msg', el).textContent = msg;
  $('.t-x', el).onclick = () => el.remove();
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), kind === 'err' ? ms * 2 : ms);
}

function guard(fn) {
  return async (...args) => {
    try { return await fn(...args); } catch (e) { console.error(e); toast(e.message || String(e), true); }
  };
}

function store(key, fallback) {
  try { const v = localStorage.getItem('td_' + key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem('td_' + key, JSON.stringify(value)); } catch { /* private mode */ }
}

function hue(str) {
  let h = 0;
  for (const c of String(str)) h = (h * 31 + c.codePointAt(0)) % 360;
  return h;
}

/** Tag chip colours: a dark tint of one hue, text in the same hue. */
/** Project tags look like `CLS_crossover-va-lenh-su`: show the code, keep the full name in the tooltip. */
const shortTag = (t) => (/^[A-Z0-9]{2,6}_/.test(t) ? t.split('_')[0] : t);
const tagStyle = (t) => {
  const h = hue(t);
  return document.documentElement.hasAttribute('data-light')
    ? `background:hsl(${h} 45% 50% / .16);color:hsl(${h} 55% 30%)`
    : `background:hsl(${h} 30% 22%);color:hsl(${h} 55% 78%)`;
};
const APP_THEMES = {   // name, background, card, text, accent, dark
  tokyo: ['Tokyo', '#12141c', '#181b26', '#e6e8f0', '#86a4f2', true],
  'than-am': ['Than ấm', '#1b1916', '#24211d', '#e4ddd0', '#e0a85f', true],
  kem: ['Kem', '#f6efdc', '#fbf6e8', '#2b2418', '#2f5bd0', false],
  'giay-am': ['Giấy ấm', '#f4ecd8', '#faf4e4', '#33291a', '#8a4b1f', false],
  'suong-xanh': ['Sương xanh', '#edf2f0', '#f7faf8', '#1d2928', '#276a64', false],
  trang: ['Trắng', '#ffffff', '#f8f9fb', '#1a1a1a', '#2f5bd0', false],
  sepia: ['Sepia', '#ead9b6', '#f1e4c7', '#3b2d17', '#7a3f12', false],
};
function setAppTheme(k) {
  if (!APP_THEMES[k]) k = 'tokyo';
  save('app_theme', k);
  const root = document.documentElement;
  if (k === 'tokyo') delete root.dataset.theme; else root.dataset.theme = k;
  root.toggleAttribute('data-light', !APP_THEMES[k][5]);
  refreshSidebar();   // tag chips are coloured for dark or light
}

function fmtSize(n) {
  if (n == null) return '';
  if (n < 1024) return n + ' B';
  if (n < 1048576) return (n / 1024).toFixed(0) + ' KB';
  return (n / 1048576).toFixed(1) + ' MB';
}

const LANGS = { zh: 'Trung', en: 'Anh', vi: 'Việt' };
const VARIANTS = { vi: 'Bản dịch', src: 'Bản gốc', bi: 'Song ngữ' };

function modal({ title, body, actions = [], wide = false, onClose }) {
  const back = document.createElement('div');
  back.className = 'modal-back';
  const titleId = 'm-' + Math.random().toString(36).slice(2, 8);
  const opener = document.activeElement;
  back.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="${titleId}" style="${wide ? 'width:min(900px,100%)' : ''}">
    <header><span id="${titleId}">${esc(title)}</span><button class="icon-btn" data-close aria-label="Đóng">✕</button></header>
    <div class="body"></div><footer></footer></div>`;
  const bodyEl = $('.body', back);
  if (typeof body === 'string') bodyEl.innerHTML = body; else if (body) bodyEl.appendChild(body);
  const close = () => { back.remove(); document.removeEventListener('keydown', onKey); onClose?.(); if (opener?.isConnected) opener.focus(); };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {      // keep Tab inside the dialog
      const f = $$('button:not(:disabled), input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])', back).filter((x) => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };
  document.addEventListener('keydown', onKey);
  $('[data-close]', back).onclick = close;
  back.addEventListener('mousedown', (e) => { if (e.target === back) close(); });
  const foot = $('footer', back);
  for (const a of actions) {
    const b = document.createElement('button');
    b.className = 'btn' + (a.primary ? ' primary' : '') + (a.danger ? ' danger' : '') + (a.safe ? ' safe' : '');
    b.textContent = a.label;
    b.onclick = guard(async () => {
      b.disabled = true;
      try { if ((await a.onClick?.(bodyEl)) !== false) close(); } finally { b.disabled = false; }
    });
    foot.appendChild(b);
  }
  document.body.appendChild(back);
  // a field if there is one; else the safe button, so Enter on a destructive dialog means Cancel
  setTimeout(() => ($('input,textarea,select', bodyEl) || $('footer .safe', back) || $('footer .btn.primary', back))?.focus(), 30);
  return { el: bodyEl, close };
}

function confirmBox(title, text, okLabel = 'Đồng ý', danger = false) {
  return new Promise((resolve) => {
    modal({
      title, body: `<p>${text}</p>`, onClose: () => resolve(false),
      actions: [
        { label: 'Huỷ', safe: danger, onClick: () => resolve(false) },
        { label: okLabel, primary: !danger, danger, onClick: () => resolve(true) },
      ],
    });
  });
}

function promptBox(title, label, value = '') {
  return new Promise((resolve) => {
    modal({
      title, onClose: () => resolve(null),
      body: `<label class="field">${esc(label)}<input type="text" value="${esc(value)}"></label>`,
      actions: [
        { label: 'Huỷ', onClick: () => resolve(null) },
        { label: 'OK', primary: true, onClick: (b) => resolve($('input', b).value.trim()) },
      ],
    });
  });
}

/* ================= global state ================= */

const state = {
  filters: store('filters', { shelf: '', tags: [], q: '', lang: '', status: '' }),
  side: null,
  engines: null,
  cleanup: null,
  libSelecting: false,
  libSel: new Set(),
};

async function engines() {
  if (!state.engines) state.engines = await api('/api/engines');
  return state.engines;
}

function engineOptions(selected = 'auto', withAuto = true) {
  const e = state.engines || {};
  return (withAuto ? `<option value="auto"${selected === 'auto' ? ' selected' : ''}>Tự chọn theo ngôn ngữ</option>` : '')
    + Object.entries(e).map(([k, v]) => `<option value="${k}"${k === selected ? ' selected' : ''}>${esc(v.label)} — ${v.langs.map((l) => LANGS[l]).join(', ')}</option>`).join('');
}

/* ================= sidebar ================= */

async function refreshSidebar() {
  const data = await api('/api/shelves');
  state.side = data;
  const f = state.filters;
  const onLibrary = location.hash === '' || location.hash === '#/' || location.hash.startsWith('#/?');
  const item = (key, label, count, tools = '') =>
    `<div class="shelf-item${onLibrary && f.shelf === key ? ' active' : ''}" data-shelf="${esc(key)}">
      ${icon('folder')}<span class="lbl">${esc(label)}</span><span class="count">${count}</span>${tools}</div>`;
  $('#nav-total').textContent = data.total;
  $('#side-host').textContent = location.host;
  $('#shelf-list').innerHTML =
    item('', 'Tất cả sách', data.total)
    + item('none', 'Chưa xếp tủ', data.unshelved)
    + data.shelves.map((s) => item(String(s.id), s.name, s.count,
      `<span class="shelf-tools"><button class="icon-btn" data-rename="${s.id}" title="Đổi tên">✎</button><button class="icon-btn" data-del="${s.id}" title="Xoá tủ">✕</button></span>`)).join('');
  const TAG_FOLD = 8;
  const shownTags = state.tagsOpen ? data.tags : data.tags.filter((t, i) => i < TAG_FOLD || f.tags.includes(t.name));
  $('#tag-more').hidden = data.tags.length <= TAG_FOLD;
  $('#tag-more').textContent = state.tagsOpen ? 'Thu gọn' : `Xem hết (${data.tags.length})`;
  $('#tag-list').innerHTML = data.tags.length
    ? shownTags.map((t) => `<span class="chip${f.tags.includes(t.name) ? ' on' : ''}" data-tag="${esc(t.name)}" title="${esc(t.name)}" style="${f.tags.includes(t.name) ? '' : tagStyle(t.name)}">${esc(shortTag(t.name))} <span class="n">${t.count}</span></span>`).join('')
    : '<span class="muted small">Chưa có tag. Thêm tag trong trang sách.</span>';
}

$('#shelf-list').addEventListener('click', guard(async (e) => {
  const ren = e.target.closest('[data-rename]');
  const del = e.target.closest('[data-del]');
  if (ren) {
    const s = state.side.shelves.find((x) => String(x.id) === ren.dataset.rename);
    const name = await promptBox('Đổi tên tủ', 'Tên mới', s.name);
    if (name) { await api(`/api/shelves/${s.id}`, { method: 'PATCH', body: { name } }); refreshSidebar(); }
    return;
  }
  if (del) {
    const s = state.side.shelves.find((x) => String(x.id) === del.dataset.del);
    if (await confirmBox('Xoá tủ', `Xoá tủ <b>${esc(s.name)}</b>? ${s.count} cuốn sách trong tủ vẫn được giữ, chỉ chuyển sang “Chưa xếp tủ”.`, 'Xoá tủ', true)) {
      await api(`/api/shelves/${s.id}`, { method: 'DELETE' });
      if (state.filters.shelf === String(s.id)) setFilter({ shelf: '' });
      refreshSidebar();
    }
    return;
  }
  const it = e.target.closest('[data-shelf]');
  if (it) { setFilter({ shelf: it.dataset.shelf }); if (!location.hash.startsWith('#/') || location.hash.length > 2) location.hash = '#/'; }
}));

$('#tag-more').onclick = () => { state.tagsOpen = !state.tagsOpen; refreshSidebar(); };

$('#tag-list').addEventListener('click', (e) => {
  const t = e.target.closest('[data-tag]');
  if (!t) return;
  const tags = state.filters.tags.includes(t.dataset.tag)
    ? state.filters.tags.filter((x) => x !== t.dataset.tag)
    : [...state.filters.tags, t.dataset.tag];
  setFilter({ tags });
  if (location.hash.length > 2) location.hash = '#/';
});

$('#add-shelf').onclick = guard(async () => {
  const name = await promptBox('Tủ mới', 'Tên tủ (ví dụ: Đang đọc, Đam mỹ, Tiên hiệp, Light novel…)');
  if (name) { await api('/api/shelves', { method: 'POST', body: { name } }); refreshSidebar(); }
});

function setFilter(patch) {
  Object.assign(state.filters, patch);
  save('filters', state.filters);
  refreshSidebar();
  if (currentView === 'library') renderLibrary();
}

/* ================= jobs ================= */

let jobTimer = null;
const seenDone = new Set();

async function pollJobs() {
  clearTimeout(jobTimer);
  let list = [];
  try { list = await api('/api/jobs'); } catch { /* server restarting */ }
  const box = $('#jobs');
  const visible = list.filter((j) => ['queued', 'running'].includes(j.status) || (j.finished && Date.now() / 1000 - j.finished < 8));
  box.innerHTML = visible.map((j) => {
    const pct = j.total ? Math.round((j.done / j.total) * 100) : 100;
    const label = { queued: 'Đang chờ', running: 'Đang dịch', done: 'Xong', error: 'Lỗi', cancelled: 'Đã huỷ' }[j.status];
    return `<div class="card job${j.errors.length ? ' has-err' : ''}" role="status">
      <div class="row"><span class="title">${esc(j.book_title)}</span>
        ${['queued', 'running'].includes(j.status) ? `<button class="icon-btn" data-cancel="${j.id}" title="Huỷ">✕</button>` : ''}</div>
      <div class="cur">${esc(label)} · ${j.done}/${j.total} chương · ${esc(state.engines?.[j.engine]?.label || j.engine)}${j.current ? ' · ' + esc(j.current) : ''}</div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      ${j.errors.length ? `<div class="job-err" role="alert"><b>ⓘ Không dịch được ${j.errors.length} chương</b>
        <details><summary>Xem lỗi</summary>${j.errors.map((e) => `<div>${esc(e)}</div>`).join('')}</details>
        <span class="muted small">Gợi ý: tăng giãn cách gói trong Cài đặt → Tốc độ gửi, rồi dịch lại các chương chưa dịch.</span></div>` : ''}
    </div>`;
  }).join('');
  for (const j of list) {
    if (j.finished && !seenDone.has(j.id)) {
      seenDone.add(j.id);
      if (Date.now() / 1000 - j.finished < 10) {
        onJobFinished(j);
      }
    }
  }
  const active = list.some((j) => ['queued', 'running'].includes(j.status));
  jobTimer = setTimeout(pollJobs, active ? 1500 : 8000);
}

$('#jobs').addEventListener('click', guard(async (e) => {
  const b = e.target.closest('[data-cancel]');
  if (b) { await api(`/api/jobs/${b.dataset.cancel}/cancel`, { method: 'POST' }); pollJobs(); }
}));

function onJobFinished(j) {
  if (j.status === 'done') toast(`Dịch xong “${j.book_title}”${j.errors.length ? ` (${j.errors.length} chương lỗi)` : ''}`);
  if (j.status === 'error') toast(`Dịch “${j.book_title}” lỗi: ${j.errors[0] || ''}`, true);
  if (currentView === 'book' && currentParam === String(j.book_id)) renderBook(j.book_id, true);
  if (currentView === 'read' && readerState.chapter?.book_id === j.book_id) {
    if (readerState.writing) return;
    if (readerState.editing) loadChapter(readerState.chapter.id, true); else refreshLoaded();
  }
  if (currentView === 'library') renderLibrary();
}

/** Former fiction AGENTS.md §6 (no current rule text yet): ask before a vault book's text goes to a server engine. */
async function askConsent(engine) {
  const label = state.engines?.[engine]?.label || engine;
  const ok = await confirmBox('Gửi nội dung vault ra ngoài?',
    `Sách này có nội dung lấy từ <b>vault</b> (lane personal). Dịch bằng <b>${esc(label)}</b> sẽ gửi nguyên văn lên server của họ.<br><br>
     Luật fiction của vault: không upload ra dịch vụ ngoài trừ khi bạn yêu cầu. Chọn engine <b>VietPhrase local</b> nếu muốn dịch mà không gửi gì đi.<br><br>
     Đồng ý thì app ghi nhớ cho <b>riêng sách này</b>. Sau này thêm chương từ vault vào sách, app sẽ hỏi lại.`, 'Đồng ý gửi đi');
  return ok;
}

async function startJob(body) {
  let j;
  try {
    j = await api('/api/translate', { method: 'POST', body });
  } catch (e) {
    if (e.status !== 409 || e.data?.error !== 'needs_consent') throw e;
    if (!await askConsent(e.data.engine)) return null;
    j = await api('/api/translate', { method: 'POST', body: { ...body, allow_external: true } });
  }
  seenDone.delete(j.id);
  toast(j.total ? `Bắt đầu dịch ${j.total} chương bằng ${state.engines?.[j.engine]?.label || j.engine}` : 'Không có chương nào cần dịch');
  pollJobs();
  return j;
}

/* ================= import ================= */

function pickFiles(accept, multiple = true) {
  return new Promise((resolve) => {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = accept;
    inp.multiple = multiple;
    inp.onchange = () => resolve(Array.from(inp.files || []));
    inp.click();
  });
}

const IMPORT_ACCEPT = '.epub,.txt,.md,.zip,.rar,.html,.htm';
const ARCHIVE_RX = /\.(zip|rar)$/i;

/** POST that returns a file: the download name comes from Content-Disposition. */
async function downloadPost(path, body, fallbackName) {
  const res = await fetch(path, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = (res.headers.get('Content-Type') || '').includes('json') ? await res.json() : null;
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  const m = /filename\*=UTF-8''([^;]+)/.exec(res.headers.get('Content-Disposition') || '');
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement('a');
  a.href = url;
  a.download = m ? decodeURIComponent(m[1]) : fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function appendMsg(r, title) {
  const skipped = r.skipped?.length ? ` · bỏ qua ${r.skipped.length} chương trùng tên` : '';
  return r.added ? `Đã thêm ${r.added} chương vào “${title}”${skipped}` : `Không thêm chương nào vào “${title}”${skipped}`;
}

/** After an import route returns a book carrying import_result: say what happened, open the book. */
function importDone(b) {
  const r = b.import_result || {};
  toast(r.created === false ? appendMsg(r, b.title_vi || b.title) : `Đã nhập “${b.title}” — ${b.chapters.length} chương`);
  vaultInto = null;
  refreshSidebar();
  location.hash = `#/book/${b.id}`;
}

/** target = null → each file becomes a new book; target = {into, title, after_idx, skip_dupes} → chapters go into that book. */
async function uploadFiles(files, target = null) {
  const ok = files.filter((f) => /\.(epub|txt|md|zip|rar|html?)$/i.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  if (!ok.length) { toast('Chỉ nhận file .epub .txt .md .zip .rar .html', true); return; }
  const shelf = /^\d+$/.test(state.filters.shelf) ? state.filters.shelf : '';
  const t = target ? { ...target } : null;
  let last = null, added = 0, skipped = 0;
  for (const f of ok) {
    // a new book from an archive goes through the preview: one .zip/.rar can hold several stories.
    // adding INTO a book keeps the old path — there the archive is one run of chapters.
    if (!t && ARCHIVE_RX.test(f.name)) { await archiveDialog(f); continue; }
    toast(`Đang nhập ${f.name}…`, false, 1500);
    try {
      const qs = new URLSearchParams({ filename: f.name });
      if (t) {
        qs.set('into', t.into);
        if (t.after_idx != null) qs.set('after_idx', t.after_idx);
        if (t.skip_dupes) qs.set('skip_dupes', '1');
      } else if (shelf) qs.set('shelf', shelf);
      last = await api('/api/books/upload?' + qs, { method: 'POST', body: f, raw: true, type: 'application/octet-stream' });
      const r = last.import_result || {};
      if (t) {
        added += r.added || 0;
        skipped += r.skipped?.length || 0;
        if (t.after_idx != null && r.added) t.after_idx = r.last_idx;   // keep file order when inserting mid-book
      } else {
        toast(`Đã nhập “${last.title}” — ${last.chapters.length} chương`);
      }
    } catch (e) { toast(`${f.name}: ${e.message}`, true); }
  }
  refreshSidebar();
  if (t) {
    toast(appendMsg({ added, skipped: Array(skipped) }, t.title));
    if (currentView === 'book' && currentParam === String(t.into)) renderBook(t.into, true);
    return;
  }
  if (ok.length === 1 && last) location.hash = `#/book/${last.id}`;
  else if (currentView === 'library') renderLibrary();
}

/** Upload a .zip/.rar, then show what is inside it. */
async function archiveDialog(file) {
  toast(`Đang quét ${file.name}…`, false, 2500);
  let scan;
  try {
    scan = await api(`/api/archive/scan?filename=${encodeURIComponent(file.name)}&mode=folder`,
      { method: 'POST', body: file, raw: true, type: 'application/octet-stream' });
  } catch (e) { toast(`${file.name}: ${e.message}`, true, 9000); return; }
  return archivePreview(scan, file.name);
}

/** Preview a scanned archive: which stories are in there, how many chapters each. */
function archivePreview(scan, label) {
  return new Promise((done) => {
    const picked = new Set();
    const titles = new Map();
    const body = document.createElement('div');
    body.className = 'stack';
    const reset = () => { picked.clear(); titles.clear(); scan.groups.forEach((g) => picked.add(g.key)); };
    const chosen = () => scan.groups.filter((g) => picked.has(g.key))
      .map((g) => ({ key: g.key, title: titles.get(g.key) ?? g.title }));

    let strip = scan.strip_header;

    const paint = () => {
      const dropped = scan.groups.find((g) => g.dropped?.length)?.dropped || [];
      body.innerHTML = `
        <div class="row">
          <span class="muted small">Cách tách</span>
          <span class="seg">${scan.modes.map((m) => `<button data-mode="${m.id}"${m.id === scan.mode ? ' class="on"' : ''}>${esc(m.label)}</button>`).join('')}</span>
        </div>
        <label class="check"><input type="checkbox" id="a-strip"${strip ? ' checked' : ''}>
          Bỏ phần đầu bài Lofter và ghi chú tác giả (ngày · link · dòng kẻ · tag · dòng ♫ ★ PS: ở đầu và cuối chương)</label>
        ${dropped.length ? `<details class="drop-preview"${strip ? ' open' : ''}>
          <summary class="muted small">Xem ${dropped.length} dòng sẽ bị cắt ở bài đầu tiên</summary>
          <ol>${dropped.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>
        </details>` : '<p class="muted small">Archive này không có phần đầu bài kiểu Lofter ở bài đầu tiên — bật hay tắt gần như không khác.</p>'}
        <div class="drive-list">${scan.groups.map((g) => `
          <div class="drive-row" style="cursor:default">
            <input type="checkbox" data-key="${esc(g.key)}"${picked.has(g.key) ? ' checked' : ''}>
            <input type="text" class="g-title" data-key="${esc(g.key)}" value="${esc(titles.get(g.key) ?? g.title)}" style="flex:1;min-width:0">
            <span class="muted small" style="white-space:nowrap">${g.chapters} chương · ${g.files} file${g.kind === 'epub' ? ' · epub' : ''}</span>
          </div>`).join('')}</div>
        <p class="muted small">Bỏ tick truyện không cần, sửa tên ngay trong ô.
        <b>Nhập vào thư viện</b> để sửa và dịch tiếp; <b>Tải epub</b> tạo file ngay từ bản gốc, không lưu vào thư viện.</p>`;
      $$('[data-mode]', body).forEach((b) => b.onclick = guard(async () => {
        scan = await api('/api/archive/regroup',
          { method: 'POST', body: { token: scan.token, mode: b.dataset.mode, strip_header: strip } });
        reset();
        paint();
      }));
      $('#a-strip', body).onchange = (e) => {
        strip = e.target.checked;
        $('.drop-preview', body)?.toggleAttribute('open', strip);
      };
      $$('input[type=checkbox][data-key]', body).forEach((c) => c.onchange = () => {
        c.checked ? picked.add(c.dataset.key) : picked.delete(c.dataset.key);
      });
      $$('.g-title', body).forEach((i) => i.oninput = () => titles.set(i.dataset.key, i.value));
    };
    reset();
    paint();

    modal({
      title: label, body, wide: true, onClose: done,
      actions: [
        {
          label: '⤓ Tải epub', onClick: async () => {
            const groups = chosen();
            if (!groups.length) { toast('Chưa chọn truyện nào', true); return false; }
            toast('Đang tạo epub…', false, 2500);
            await downloadPost('/api/archive/epub', { token: scan.token, mode: scan.mode, groups, strip_header: strip }, 'truyen.zip');
            toast(`Đã tạo ${groups.length} epub`);
            return false;   // keep the dialog open — importing after downloading is normal
          },
        },
        {
          label: 'Nhập vào thư viện', primary: true, onClick: async () => {
            const groups = chosen();
            if (!groups.length) { toast('Chưa chọn truyện nào', true); return false; }
            const shelf = /^\d+$/.test(state.filters.shelf) ? +state.filters.shelf : null;
            toast(`Đang nhập ${groups.length} truyện…`, false, 4000);
            const r = await api('/api/archive/import',
              { method: 'POST', body: { token: scan.token, mode: scan.mode, groups, shelf_id: shelf, strip_header: strip } });
            for (const f of r.failed || []) toast(`${f.title}: ${f.error}`, true, 9000);
            refreshSidebar();
            const chapters = r.books.reduce((a, b) => a + b.chapters, 0);
            toast(`Đã nhập ${r.books.length} truyện · ${chapters} chương`);
            if (r.books.length === 1) location.hash = `#/book/${r.books[0].id}`;
            else if (currentView === 'library') renderLibrary();
          },
        },
      ],
    });
  });
}

let dragDepth = 0;
window.addEventListener('dragenter', (e) => { if (e.dataTransfer?.types?.includes('Files')) { dragDepth++; document.body.classList.add('dropping'); } });
window.addEventListener('dragleave', () => { dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) document.body.classList.remove('dropping'); });
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
  e.preventDefault();
  dragDepth = 0;
  document.body.classList.remove('dropping');
  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length) uploadFiles(files);
});

/** Drive browser. mode 'import' picks files; mode 'folder' picks a destination folder. */
function driveBrowser({ mode = 'import', onPick, target = null }) {
  const body = document.createElement('div');
  const selected = new Set();
  let current = null;
  body.innerHTML = `<div class="crumbs"></div><div class="drive-list"></div>
    ${mode === 'import' && target ? `<p class="small" style="margin:10px 0 0">Thêm chương vào <b>${esc(target.title)}</b>${target.after_idx != null ? ` · sau chương ${target.after_idx + 1}` : ' · cuối sách'}${target.skip_dupes ? ' · bỏ qua chương trùng tên' : ''}. Chọn nhiều file thì xếp theo tên.</p>` : ''}
    ${mode === 'import' && !target ? `<div class="row" style="margin-top:10px"><label class="field" style="flex:1">Xếp vào tủ
      <select class="shelf-sel"><option value="">Chưa xếp tủ</option>${(state.side?.shelves || []).map((s) => `<option value="${s.id}"${state.filters.shelf === String(s.id) ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label></div>` : ''}
    <p class="muted small">Chỉ hiện thư mục và file .epub .txt .md .zip .rar .html. File “chỉ trực tuyến” của Google Drive sẽ được tải về khi nhập, có thể chậm. Thư mục gốc đổi được trong Cài đặt.</p>`;
  const load = guard(async (path) => {
    const data = await api('/api/drive/list' + (path ? '?path=' + encodeURIComponent(path) : ''));
    current = data.path;
    $('.crumbs', body).innerHTML = data.path
      ? `<a href="#" data-go="${esc(data.parent || '')}">← Lên</a> · ${esc(data.path)}`
      : 'Chọn thư mục gốc';
    $('.drive-list', body).innerHTML = data.entries.length ? data.entries.map((en) => `
      <div class="drive-row" data-path="${esc(en.path)}" data-dir="${en.is_dir ? 1 : 0}">
        <span class="ico">${en.is_dir ? '📁' : (en.name.toLowerCase().endsWith('.epub') ? '📘' : '📄')}</span>
        <span class="name">${esc(en.name)}${en.exists === false ? ' <span class="warn small">(không tồn tại)</span>' : ''}</span>
        <span class="muted small">${fmtSize(en.size)}</span>
        ${!en.is_dir && mode === 'import' ? `<input type="checkbox"${selected.has(en.path) ? ' checked' : ''}>` : ''}
      </div>`).join('') : '<div class="drive-row muted">Thư mục trống (hoặc không có .epub/.txt)</div>';
  });
  body.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); load(go.dataset.go || null); return; }
    const row = e.target.closest('.drive-row[data-path]');
    if (!row) return;
    if (row.dataset.dir === '1') { load(row.dataset.path); return; }
    const cb = $('input[type=checkbox]', row);
    if (!cb) return;
    if (e.target !== cb) cb.checked = !cb.checked;
    cb.checked ? selected.add(row.dataset.path) : selected.delete(row.dataset.path);
  });
  const actions = mode === 'import'
    ? [{ label: 'Đóng' }, {
      label: 'Nhập file đã chọn', primary: true, onClick: async (b) => {
        if (!selected.size) { toast('Chưa chọn file nào', true); return false; }
        const only = [...selected][0];
        if (!target && selected.size === 1 && ARCHIVE_RX.test(only)) {
          // one archive, a new book: same preview as an upload, so several stories still split
          toast('Đang đọc archive từ Drive…', false, 3000);
          const scan = await api('/api/archive/stage-drive', { method: 'POST', body: { path: only, mode: 'folder' } });
          archivePreview(scan, only.split(/[\\/]/).pop());
          return;
        }
        toast(`Đang nhập ${selected.size} file…`);
        const r = await api('/api/drive/import', {
          method: 'POST', body: { paths: [...selected], shelf_id: $('.shelf-sel', b)?.value || '', ...(target || {}) },
        });
        r.errors.forEach((er) => toast(er, true));
        if (r.ids.length) toast(`Đã nhập ${r.ids.length} sách`);
        if (r.into) toast(appendMsg(r, target.title));
        onPick?.(r);
      },
    }]
    : [{ label: 'Huỷ' }, {
      label: 'Lưu vào thư mục này', primary: true, onClick: async () => {
        if (!current) { toast('Mở một thư mục trước', true); return false; }
        return onPick?.(current);
      },
    }];
  modal({ title: mode === 'import' ? (target ? 'Thêm chương từ Google Drive' : 'Nhập từ Google Drive') : 'Chọn thư mục Drive', body, actions });
  load(null);
}

/* ================= library ================= */

const BOOK_STATUS = { none: 'Chưa dịch', partial: 'Đang dịch', full: 'Hoàn tất' };
const bookStatus = (b) => (!b.translated_count ? 'none' : b.translated_count >= b.chapter_count ? 'full' : 'partial');

function ago(ts) {
  const s = Date.now() / 1000 - (ts || 0);
  if (s < 60) return 'vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} ngày trước`;
  return new Date(ts * 1000).toLocaleDateString('vi-VN');
}

async function renderLibrary() {
  const f = state.filters;
  const params = new URLSearchParams();
  if (f.shelf) params.set('shelf', f.shelf);
  if (f.tags.length) params.set('tags', f.tags.join(','));
  if (f.q) params.set('q', f.q);
  if (f.lang) params.set('lang', f.lang);
  // status is filtered here, not on the server, so the status tabs can show a count for every state
  const all = await api('/api/books?' + params);
  const counts = { '': all.length, none: 0, partial: 0, full: 0 };
  all.forEach((b) => counts[bookStatus(b)]++);
  const sort = store('lib_sort', 'updated');
  const view = store('lib_view', 'list');
  const pct = (b) => (b.chapter_count ? b.translated_count / b.chapter_count : 0);
  const books = all.filter((b) => !f.status || bookStatus(b) === f.status);
  if (sort === 'title') books.sort((x, y) => (x.title_vi || x.title).localeCompare(y.title_vi || y.title, 'vi'));
  if (sort === 'progress') books.sort((x, y) => pct(y) - pct(x));
  const shelfName = f.shelf === 'none' ? 'Chưa xếp tủ' : f.shelf ? (state.side?.shelves.find((s) => String(s.id) === f.shelf)?.name || 'Tủ') : '';

  if (currentView !== 'library') return;
  const hadFocus = document.activeElement?.id === 'lib-search';
  const selecting = state.libSelecting;
  main.innerHTML = `
    <div class="page-head">
      <div class="row"><h1>Thư viện</h1><span class="muted head-count">${books.length} sách</span>
        ${shelfName ? `<span class="chip" data-shelf-clear title="Bỏ lọc tủ">${esc(shelfName)} <span class="x">✕</span></span>` : ''}</div>
      <div class="row">
        ${books.length ? `<button class="btn${selecting ? ' primary' : ''}" id="btn-select">${selecting ? 'Xong chọn' : 'Chọn nhiều'}</button>` : ''}
        <button class="btn" id="btn-drive">${icon('cloud')} Từ Drive</button>
        <button class="btn primary" id="btn-upload">${icon('upload')} Tải file lên</button>
      </div>
    </div>
    <div class="toolbar">
      <div class="seg tabs-seg" id="lib-status">${Object.entries({ '': 'Tất cả', partial: 'Đang dịch', full: 'Hoàn tất', none: 'Chưa dịch' }).map(([k, v]) =>
        `<button data-st="${k}" class="${(f.status || '') === k ? 'on' : ''}">${v}<span class="n">${counts[k]}</span></button>`).join('')}</div>
      <label class="search-box">${icon('search')}<input type="search" id="lib-search" placeholder="Tìm sách, tên dịch, tác giả…" value="${esc(f.q)}"></label>
      <select id="lib-lang"><option value="">Mọi ngôn ngữ</option>${Object.entries(LANGS).map(([k, v]) => `<option value="${k}"${f.lang === k ? ' selected' : ''}>Tiếng ${v}</option>`).join('')}</select>
      <select id="lib-sort">${Object.entries({ updated: 'Mới nhất', title: 'Tên A–Z', progress: 'Tiến độ' }).map(([k, v]) => `<option value="${k}"${sort === k ? ' selected' : ''}>${v}</option>`).join('')}</select>
      <div class="seg icon-seg" id="lib-view">
        <button data-v="list" class="${view === 'list' ? 'on' : ''}" title="Danh sách" aria-label="Xem dạng danh sách">${icon('list')}</button>
        <button data-v="grid" class="${view === 'grid' ? 'on' : ''}" title="Lưới" aria-label="Xem dạng lưới">${icon('grid')}</button>
      </div>
    </div>
    ${f.tags.length ? `<div class="active-filters">${f.tags.map((t) => `<span class="chip on" data-untag="${esc(t)}">${esc(t)} <span class="x">✕</span></span>`).join('')}
      <button class="btn ghost sm" id="clear-tags">Bỏ lọc tag</button></div>` : ''}
    ${books.length ? `${view === 'list' ? `<div class="lib-list card${selecting ? ' selecting' : ''}">
        <div class="lib-row lib-headrow"><span></span><span>Sách</span><span>Ngôn ngữ</span><span>Tiến độ</span><span>Trạng thái</span><span>Cập nhật</span><span></span></div>
        ${books.map((b) => bookRow(b, selecting)).join('')}</div>`
      : `<div class="lib-grid${selecting ? ' selecting' : ''}">${books.map((b) => bookCard(b, selecting)).join('')}</div>`}
      ${selecting ? `<div class="card bulk-bar">
        <b id="bulk-count"></b>
        <button class="btn sm ghost" id="bulk-all">Chọn cả ${books.length} sách đang hiện</button>
        <select id="bulk-variant">
          <option value="vi">Bản dịch</option>
          <option value="src">Bản gốc</option>
          <option value="bi">Song ngữ</option>
        </select>
        <button class="btn sm" id="bulk-export">Xuất epub</button>
        <span class="spacer"></span>
        <select id="bulk-shelf"><option value="">Chưa xếp tủ</option>${(state.side?.shelves || []).map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select>
        <button class="btn sm" id="bulk-move">Chuyển tủ</button>
        <button class="btn sm danger" id="bulk-delete">Xoá sách đã chọn</button>
      </div>` : ''}` : `
      <div class="empty"><span class="empty-ico">${icon('toc')}</span><h2>${f.q || f.tags.length || f.lang || f.status ? 'Không có sách khớp bộ lọc' : shelfName ? 'Chưa có sách nào trong tủ này' : 'Chưa có sách nào'}</h2>
      <p>Kéo file vào đây hoặc mở từ vault</p>
      ${f.q || f.tags.length || f.lang || f.status ? '<button class="btn" id="empty-clear">Bỏ mọi bộ lọc</button>' : '<button class="btn primary" id="empty-upload">Tải file lên</button>'}</div>`}
    <button class="drop-bar" id="drop-bar">${icon('upload')}<span><b>Kéo file .txt / .epub / .zip / .rar vào đây</b><small>hoặc bấm để chọn file · mở từ vault · Google Drive</small></span></button>`;

  $$('#lib-status button').forEach((x) => x.onclick = () => setFilter({ status: x.dataset.st }));
  $$('#lib-view button').forEach((x) => x.onclick = () => { save('lib_view', x.dataset.v); renderLibrary(); });
  $('#lib-sort').onchange = (e) => { save('lib_sort', e.target.value); renderLibrary(); };
  $('[data-shelf-clear]')?.addEventListener('click', () => setFilter({ shelf: '' }));
  $('#drop-bar').onclick = async () => uploadFiles(await pickFiles(IMPORT_ACCEPT));
  $('#empty-upload')?.addEventListener('click', async () => uploadFiles(await pickFiles(IMPORT_ACCEPT)));
  $('#empty-clear')?.addEventListener('click', () => setFilter({ q: '', tags: [], lang: '', status: '' }));
  const search = $('#lib-search');
  if (hadFocus) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); }
  let t;
  search.oninput = () => { clearTimeout(t); t = setTimeout(() => setFilter({ q: search.value.trim() }), 250); };
  $('#lib-lang').onchange = (e) => setFilter({ lang: e.target.value });
  $('#btn-upload').onclick = async () => uploadFiles(await pickFiles(IMPORT_ACCEPT));
  $('#btn-drive').onclick = () => driveBrowser({ mode: 'import', onPick: (r) => { refreshSidebar(); renderLibrary(); if (r.ids.length === 1) location.hash = `#/book/${r.ids[0]}`; } });
  $('#clear-tags')?.addEventListener('click', () => setFilter({ tags: [] }));
  $$('[data-untag]').forEach((c) => c.onclick = () => setFilter({ tags: f.tags.filter((x) => x !== c.dataset.untag) }));

  // bulk selection
  $('#btn-select')?.addEventListener('click', () => { state.libSelecting = !state.libSelecting; state.libSel.clear(); renderLibrary(); });
  if (!state.libSelecting || !books.length) return;
  const visible = new Set(books.map((b) => b.id));
  for (const id of [...state.libSel]) if (!visible.has(id)) state.libSel.delete(id);   // a filter changed under the selection
  const paint = () => {
    $$('.book[data-book]').forEach((el) => el.classList.toggle('picked', state.libSel.has(+el.dataset.book)));
    const n = state.libSel.size;
    $('#bulk-count').textContent = n ? `Đã chọn ${n} sách` : 'Bấm vào sách để chọn';
    $('#bulk-move').disabled = $('#bulk-delete').disabled = $('#bulk-export').disabled = !n;
  };
  paint();
  $('.lib-list, .lib-grid').onclick = (e) => {
    const card = e.target.closest('.book[data-book]');
    if (!card) return;
    e.preventDefault();
    const id = +card.dataset.book;
    state.libSel.has(id) ? state.libSel.delete(id) : state.libSel.add(id);
    paint();
  };
  $('#bulk-all').onclick = () => { books.forEach((b) => state.libSel.add(b.id)); paint(); };
  $('#bulk-export').onclick = guard(async () => {
    const ids = [...state.libSel];
    toast(`Đang đóng gói ${ids.length} epub…`, false, 4000);
    await downloadPost('/api/books/export-zip', { ids, format: 'epub', variant: $('#bulk-variant').value }, 'sach.zip');
    toast(`Đã xuất ${ids.length} epub`);
  });
  $('#bulk-move').onclick = guard(async () => {
    const r = await api('/api/books/bulk', { method: 'POST', body: { action: 'shelf', ids: [...state.libSel], shelf_id: $('#bulk-shelf').value } });
    toast(`Đã chuyển ${r.moved} sách`);
    state.libSel.clear(); refreshSidebar(); renderLibrary();
  });
  $('#bulk-delete').onclick = guard(async () => {
    const picked = books.filter((b) => state.libSel.has(b.id));
    const names = picked.slice(0, 8).map((b) => `<li>${esc(b.title_vi || b.title)} <span class="muted">(${b.chapter_count} chương)</span></li>`).join('');
    const more = picked.length > 8 ? `<li class="muted">… và ${picked.length - 8} sách khác</li>` : '';
    if (!await confirmBox(`Xoá ${picked.length} sách`,
      `Xoá khỏi thư viện, cùng mọi bản dịch, tên riêng của sách và ảnh bìa:<ul>${names}${more}</ul>File gốc trên máy, Drive và vault không bị động tới. <b>Không hoàn tác được.</b>`,
      `Xoá ${picked.length} sách`, true)) return;
    const r = await api('/api/books/bulk', { method: 'POST', body: { action: 'delete', ids: picked.map((b) => b.id) } });
    toast(`Đã xoá ${r.deleted} sách`);
    state.libSel.clear(); refreshSidebar(); renderLibrary();
  });
}

function coverHtml(b, badge = true) {
  const inner = b.cover
    ? `<img src="/api/books/${b.id}/cover?v=${esc(b.cover)}${Math.floor(b.updated || 0)}" alt="" loading="lazy" onerror="this.parentNode.classList.add('noimg');this.remove()">`
    : '';
  const ph = `<div class="ph ph-code" style="${tileBg(b)}">${esc(bookCode(b))}</div>`;
  return `<div class="cover">${ph}${inner}${badge ? `<span class="badge">${esc(b.format)} · ${esc(b.source_lang)}</span>` : ''}</div>`;
}

/** Small cover tile (design round 10): the real cover under a dark scrim, or a solid colour with the book code;
 *  a status mark (done / part / none) in the corner and the progress as a strip along the bottom edge. */
function coverTile(b) {
  const st = bookStatus(b);
  const pct = b.chapter_count ? Math.round((b.translated_count / b.chapter_count) * 100) : 0;
  const mark = { full: '✓', partial: '◐', none: '○' }[st] || '○';
  const code = esc(bookCode(b));
  const inner = b.cover
    ? `<img src="/api/books/${b.id}/cover?v=${esc(b.cover)}${Math.floor(b.updated || 0)}" alt="" loading="lazy" onerror="this.parentNode.classList.add('noimg');this.remove()">`
    : '';
  return `<span class="tile st-${st}" style="${tileBg(b)}"><span class="tcode">${code}</span>${inner}<em class="tst" title="${esc(BOOK_STATUS[st])}">${mark}</em><i class="tprog" style="width:${pct}%"></i></span>`;
}
// solid cover colours from the design (white text 5.3 - 7.3 : 1): brown-gold, green, teal, plum, moss, steel
const TILE_COLORS = ['#6b5f40', '#41705a', '#3f6c66', '#6c4d66', '#4d6c48', '#3d6079'];
const tileBg = (b) => `background:${TILE_COLORS[hue(b.title) % TILE_COLORS.length]}`;
function bookCode(b) {
  const tag = (b.tags || []).map(shortTag).find((t) => /^[A-Z0-9]{2,6}$/.test(t));
  if (tag) return tag;
  const words = (b.title_vi || b.title).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'D').match(/[A-Za-z0-9]+/g) || ['?'];
  return (words.length > 1 ? words.slice(0, 4).map((w) => w[0]).join('') : words[0].slice(0, 5)).toUpperCase();
}
function progressHtml(b) {
  const st = bookStatus(b);
  const pct = b.chapter_count ? Math.round((b.translated_count / b.chapter_count) * 100) : 0;
  return `<span class="prog"><span class="bar st-${st}"><i style="width:${pct}%"></i></span><span class="n">${b.translated_count}/${b.chapter_count}</span></span>`;
}
const statusChip = (b) => { const st = bookStatus(b); return `<span class="st-chip st-${st}">${BOOK_STATUS[st]}</span>`; };
const subLine = (b) => [b.title_vi ? b.title : b.author, ...b.tags.slice(0, 2).map(shortTag)].filter(Boolean).map(esc).join(' · ');

function bookRow(b, selecting = false) {
  return `<a class="lib-row book" href="#/book/${b.id}" data-book="${b.id}">
    <span class="lr-cover">${selecting ? '<span class="pick">✓</span>' : ''}${coverTile(b)}</span>
    <span class="lr-title"><b>${esc(b.title_vi || b.title)}</b><small>${subLine(b) || '&nbsp;'}</small></span>
    <span class="lr-lang">${esc(LANGS[b.source_lang] || b.source_lang)}</span>
    ${progressHtml(b)}
    <span>${statusChip(b)}</span>
    <span class="lr-when muted">${ago(b.updated)}</span>
    <span class="lr-go">${icon('play')}</span></a>`;
}

function bookCard(b, selecting = false) {
  return `<a class="lib-card book" href="#/book/${b.id}" data-book="${b.id}">
    ${selecting ? '<span class="pick">✓</span>' : ''}${coverTile(b)}
    <span class="lc-body">
      <b>${esc(b.title_vi || b.title)}</b>
      <small>${esc(LANGS[b.source_lang] || b.source_lang)} · ${ago(b.updated)}</small>
      ${progressHtml(b)}
    </span>
    ${statusChip(b)}</a>`;
}

/* ================= book page ================= */

/* ---------- vault source: check what the vault has that this book does not ---------- */

async function checkVaultSource(b) {
  const line = $('#vault-line');
  if (!line) return;
  let st;
  try {
    st = await api(`/api/books/${b.id}/vault-status`);
  } catch (e) {
    line.innerHTML = `<span class="warn small">Không kiểm tra được vault: ${esc(e.message)}</span>`;
    return;
  }
  if (currentView !== 'book' || currentParam !== String(b.id)) return;
  vaultStatus = st;
  const card = $('#vault-card');
  if (card) card.innerHTML = vaultCardHtml(st, b);
  if (!st.linked || st.error) { line.innerHTML = ''; return; }
  const bits = [
    st.total_new && `<b>${st.total_new}</b> chương mới`,
    st.changed.length && `${st.changed.length} chương có nguồn đã đổi`,
    st.missing.length && `${st.missing.length} file không còn`,
  ].filter(Boolean);
  line.innerHTML = bits.length
    ? `<span class="chip" style="background:var(--accent-soft)">vault</span> ${bits.join(' · ')}
       <button class="btn sm primary" id="vault-open">Xem</button>`
    : '<span class="muted small">Vault: không có gì mới.</span>';
  $('#vault-open')?.addEventListener('click', () => vaultSyncDialog(b));
}

function vaultCardHtml(st, b) {
  if (!st) return '<span class="muted small">Đang kiểm tra vault…</span>';
  if (!st.linked) {
    return `<p class="muted small">Sách này chưa gắn nguồn vault, nên app không biết phải kiểm tra file nào.</p>
      <a class="btn" href="#/vault?link=${b.id}">Gắn nguồn vault…</a>`;
  }
  if (st.error) return `<span class="warn small">${esc(st.error)}</span>`;
  return `<div class="stack">
    <span class="muted small">${st.rels.length} file nguồn · tách kiểu <code>${esc(st.mode)}</code> · ${st.unchanged} chương khớp nguyên văn</span>
    <div class="dr-list">${st.rels.map((r) => `<div class="dr-row"><span class="t">${esc(r)}</span>${st.missing.includes(r) ? '<span class="warn small">không còn</span>' : ''}</div>`).join('')}</div>
    <div class="row">
      <button class="btn" id="vault-recheck">Kiểm tra lại</button>
      <button class="btn" id="vault-sync-open"${st.total_new ? '' : ' disabled'}>Cập nhật…</button>
      <a class="btn ghost" href="#/vault?link=${b.id}">Thêm file nguồn…</a>
    </div>
  </div>`;
}

function vaultSyncDialog(b) {
  const st = vaultStatus;
  if (!st?.linked) return;
  const rows = [
    ...st.new_files.map((f) => ({ kind: 'file', rel: f.rel, label: f.name, sub: 'file mới' })),
    ...st.new_chapters.map((c) => ({ kind: 'chapter', rel: c.rel, title: c.title, label: c.title, sub: `chương mới trong ${c.rel}` })),
  ];
  modal({
    title: 'Cập nhật từ vault',
    wide: true,
    body: `<div class="stack">
      ${rows.length ? `<p class="muted small">Chỉ thêm vào thư viện của app. Vault không bị ghi gì.</p>
        <div class="drive-list">${rows.map((r, i) => `<label class="drive-row"><input type="checkbox" class="vs-pick" data-i="${i}" checked>
          <span class="name">${esc(r.label)}<div class="o muted small">${esc(r.sub)}</div></span></label>`).join('')}</div>`
        : '<p class="muted">Không có chương mới nào.</p>'}
      ${st.changed.length ? `<div><b>Nguồn đã đổi sau khi nhập</b>
        <p class="muted small">App không tự ghi đè: thay bản gốc sẽ làm bản dịch không còn khớp dòng, nên bản dịch của chương đó bị xoá.</p>
        <div class="drive-list">${st.changed.map((c) => `<div class="drive-row"><span class="name">${esc(c.title)}<div class="o muted small">${esc(c.rel)}</div></span>
          <button class="btn sm" data-replace="${c.chapter_id}">Thay bản gốc…</button></div>`).join('')}</div></div>` : ''}
      ${st.missing.length ? `<p class="warn small">Không còn trong vault: ${st.missing.map(esc).join(', ')}. App không xoá chương nào.</p>` : ''}
    </div>`,
    actions: [{ label: 'Đóng' }, ...(rows.length ? [{
      label: 'Nhập mục đã chọn', primary: true, onClick: async (bd) => {
        const picked = $$('.vs-pick:checked', bd).map((x) => rows[+x.dataset.i]);
        if (!picked.length) { toast('Chưa chọn mục nào', true); return false; }
        const r = await api(`/api/books/${b.id}/vault-sync`, {
          method: 'POST',
          body: {
            paths: picked.filter((x) => x.kind === 'file').map((x) => x.rel),
            chapters: picked.filter((x) => x.kind === 'chapter').map((x) => ({ rel: x.rel, title: x.title })),
          },
        });
        toast(`Đã thêm ${r.added} chương từ vault`);
        renderBook(b.id, true);
      },
    }] : [])],
  }).el.addEventListener('click', guard(async (e) => {
    const rep = e.target.closest('[data-replace]');
    if (!rep) return;
    if (!await confirmBox('Thay bản gốc',
      'Lấy lại nội dung gốc từ vault cho chương này? <b>Bản dịch và tên chương đã dịch của chương đó sẽ bị xoá</b>, vì bản dịch cũ không còn khớp với bản gốc mới.', 'Thay & xoá bản dịch', true)) return;
    await api(`/api/books/${b.id}/vault-refresh-chapter`, { method: 'POST', body: { chapter_id: +rep.dataset.replace } });
    toast('Đã lấy lại bản gốc từ vault');
    $('.modal-back')?.remove();
    renderBook(b.id, true);
  }));
}

let vaultStatus = null;

async function renderBook(id, keepScroll = false) {
  const scroll = window.scrollY;
  const [b] = await Promise.all([api(`/api/books/${id}`), engines()]);
  if (currentView !== 'book' || currentParam !== String(id)) return;
  const translated = b.chapters.filter((c) => c.len_vi > 0).length;
  const totalChars = b.chapters.reduce((s, c) => s + c.len_src, 0);
  const exp = store('export', { format: 'epub', variant: 'vi' });
  const engineSel = store('engine_' + b.source_lang, 'auto');
  const shelves = state.side?.shelves || [];
  let tags = [...b.tags];

  const left = b.chapters.filter((c) => !c.len_vi);
  const leftChars = left.reduce((s, c) => s + c.len_src, 0);
  const unit = b.source_lang === 'zh' ? 'chữ' : 'ký tự';
  const num = (n) => n.toLocaleString('vi-VN');
  const resume = b.chapters.find((c) => c.id === b.last_chapter_id) || b.chapters[0];
  const resumePos = resume ? b.chapters.indexOf(resume) + 1 : 0;
  const tabs = { toc: `Mục lục <span class="n">${b.chapters.length}</span>`, translate: 'Dịch', add: 'Thêm chương', export: 'Xuất file', meta: 'Hồ sơ sách', tools: 'Vault và tách chương' };
  vaultStatus = null;
  let tab = store('book_tab', 'toc');
  if (!tabs[tab]) tab = 'toc';
  const pane = (k, html) => `<section class="book-pane" data-pane="${k}"${k === tab ? '' : ' hidden'}>${html}</section>`;

  main.innerHTML = `
    <div class="book-page">
      <div class="crumbs-top"><a href="#/">‹ Thư viện</a> <span class="muted">/ ${esc(b.title_vi || b.title)}</span></div>
      <header class="book-hero">
        <div class="hero-cover" title="Bấm để đổi ảnh bìa">${coverHtml(b, false)}</div>
        <div class="hero-info">
          <h1>${esc(b.title_vi || b.title)}</h1>
          <div class="hero-sub">
            ${b.tags.map((t) => `<span class="chip" title="${esc(t)}" style="${tagStyle(t)}">${esc(shortTag(t))}</span>`).join('')}
            <span class="chip">Tiếng ${esc(LANGS[b.source_lang] || b.source_lang)}</span>
            ${b.sensitive ? '<span class="chip chip-accent" title="Có nội dung chép từ vault. Sửa trong app không ghi ngược vào vault. Dịch bằng server cần xác nhận.">vault · chỉ đọc</span>' : ''}
            ${[b.title_vi ? esc(b.title) : '', esc(b.author)].filter(Boolean).map((x) => `<span class="muted small">${x}</span>`).join('')}</div>
          <div class="hero-progress">
            <span><b>${translated} / ${b.chapters.length} chương đã dịch</b> <span class="muted">· ${num(totalChars)} ${unit} gốc${left.length && translated ? ` · còn ${left.length} chương, ${num(leftChars)} ${unit}` : ''}</span></span>
            <div class="bar st-${!translated ? 'none' : left.length ? 'partial' : 'full'}"><i style="width:${b.chapters.length ? Math.round((translated / b.chapters.length) * 100) : 0}%"></i></div></div>
          ${b.description ? `<p class="hero-desc">${esc(b.description)}</p>` : ''}
        </div>
        <div class="hero-side">
          <div class="row hero-actions">
            ${resume ? `<a class="btn primary" href="#/read/${resume.id}${b.last_chapter_id ? '?resume=1' : ''}">${icon('play')} ${b.last_chapter_id ? `Đọc tiếp · chương ${resumePos}${b.last_scroll >= 1 ? `, đoạn ${Math.round(b.last_scroll) + 1}` : ''}` : 'Bắt đầu đọc'}</a>` : ''}
            ${left.length ? `<button class="btn" id="hero-translate">Dịch ${left.length === b.chapters.length ? 'cả sách' : `${left.length} chương còn lại`}</button>` : ''}
            <button class="btn" data-tab="meta">${icon('edit')} Sửa thông tin</button>
          </div>
          ${b.vault_src ? '<div class="vault-note small" id="vault-line"></div>' : ''}
        </div>
      </header>
      <nav class="book-tabs">
        ${Object.entries(tabs).map(([k, v]) => `<button class="book-tab${k === tab ? ' on' : ''}" data-tab="${k}">${v}</button>`).join('')}
        <span class="spacer"></span>
        <a class="link-btn" href="#/names?book=${b.id}">Tên riêng →</a>
      </nav>
      <div class="book-main">
        ${pane('toc', `
          <div class="toc-bar">
            <input type="search" id="toc-filter" placeholder="Lọc theo tên, số chương hoặc tóm tắt">
            <span class="spacer"></span>
            <span class="muted small" id="sel-count"></span>
            <button class="btn sm" id="c-translate" disabled>Dịch đã chọn</button>
            <button class="btn sm" id="c-clear-vi" disabled>Xoá bản dịch</button>
            <button class="btn sm danger" id="c-delete" disabled>Xoá chương</button>
          </div>
          <div class="table-wrap"><table class="chapters">
            <thead><tr><th style="width:28px"><input type="checkbox" id="sel-all"></th><th></th><th>#</th><th>Chương</th><th class="sum">Tóm tắt</th><th class="r">${unit === 'chữ' ? 'Chữ' : 'Ký tự'}</th><th></th></tr></thead>
            <tbody>${b.chapters.map((c, i) => `
              <tr data-id="${c.id}" data-q="${esc(`${i + 1} ${c.title_vi} ${c.title} ${c.summary || ''}`.toLowerCase())}"${c.id === b.last_chapter_id ? ' class="cur"' : ''}>
                <td><input type="checkbox" class="sel" value="${c.id}"></td>
                <td style="width:14px"><span class="dot${c.len_vi ? ' on' : ''}" title="${c.len_vi ? 'Đã dịch' : 'Chưa dịch'}"></span></td>
                <td class="num">${i + 1}</td>
                <td class="title"><a href="#/read/${c.id}">${esc(c.title_vi || c.title)}</a>${draftTag(c)}${editTag(c)}${c.title_vi ? `<div class="o">${esc(c.title)}</div>` : ''}</td>
                <td class="sum" data-sum="${c.id}" title="Bấm để sửa tóm tắt">${c.summary ? esc(c.summary) : '<span class="ph">+ tóm tắt</span>'}</td>
                <td class="muted small r">${num(c.len_src)}</td>
                <td class="acts">
                  <button class="icon-btn" data-act="up" title="Lên">↑</button>
                  <button class="icon-btn" data-act="down" title="Xuống">↓</button>
                  <button class="icon-btn" data-act="merge" title="Gộp với chương sau">⤓</button>
                  <button class="icon-btn" data-act="del" title="Xoá chương">✕</button>
                </td>
              </tr>`).join('')}</tbody>
          </table></div>`)}

        ${pane('translate', `<div class="pane-frame">
          <div class="pf-col">
            <h4>Engine cho bộ này</h4>
            <label class="field">Tiếng ${esc(LANGS[b.source_lang] || b.source_lang)} → Việt<select id="t-engine">${engineOptions(engineSel)}</select></label>
            <h4>Phạm vi</h4>
            <label class="check"><input type="checkbox" id="t-overwrite"> Dịch lại cả chương đã có bản dịch (ghi đè)</label>
            <div class="row">
              <button class="btn primary" id="t-all">${icon('play')} Dịch ${translated < b.chapters.length ? `${b.chapters.length - translated} chương chưa dịch` : 'cả sách'}</button>
              <button class="btn" id="t-sel" disabled>Dịch chương đã chọn</button>
            </div>
            <span class="muted small">Chọn chương bằng ô vuông ở tab Mục lục.</span>
          </div>
          <div class="pf-col">
            <h4>Hàng đợi</h4>
            <div class="queue-empty">⚡<b>Tiến độ dịch hiện ở góc dưới bên phải</b><span class="muted small">Bấm “Dịch” để đưa chương vào hàng đợi.</span></div>
            ${b.sensitive ? '<div class="warn-box"><span class="small">Sách có nội dung lấy từ vault: engine server sẽ hỏi ý trước khi gửi đi. Engine local không gửi gì ra ngoài.</span></div>' : ''}
          </div>
        </div>
        <p class="muted small pf-foot">Dịch lại sẽ ghi đè bản dịch hiện có, kể cả chỗ đã sửa tay. Muốn giữ phần đã sửa thì dịch lại từng đoạn trong trang đọc.</p>`)}

        ${pane('add', `<div class="pane-frame">
          <div class="pf-col">
            <h4>Nguồn</h4>
            <div class="src-grid">
              <button class="src-card" id="a-file"><b>File trên máy</b><small>.txt · .epub · .zip · .rar · .md</small></button>
              <button class="src-card" id="a-drive"><b>Google Drive</b><small>duyệt thư mục được phép</small></button>
              <button class="src-card" id="a-vault"><b>Vault</b><small>chương từ project</small></button>
              <button class="src-card" id="a-paste"><b>Dán văn bản</b><small>một hoặc nhiều chương</small></button>
            </div>
            <button class="btn sm ghost" id="tool-add" style="align-self:flex-start">＋ Chương trống</button>
          </div>
          <div class="pf-col">
            <h4>Chèn vào đâu</h4>
            <label class="field">Vị trí<select id="a-pos" style="min-width:0"><option value="">Chèn vào cuối sách</option>${b.chapters.map((c, i) => `<option value="${c.idx}">Chèn sau ${i + 1}. ${esc((c.title_vi || c.title).slice(0, 40))}</option>`).join('')}</select></label>
            <label class="check"><input type="checkbox" id="a-skip" checked> Bỏ qua chương trùng tên với chương đã có</label>
            <span class="muted small">File .txt / .epub / .zip / .rar được tách thành chương rồi chèn vào (cả archive nối thành một mạch chương). File .md thành một chương.</span>
          </div>
        </div>`)}

        ${pane('export', `<div class="pane-frame">
          <div class="pf-col">
            <h4>Định dạng</h4>
            <div class="seg" id="x-format-seg">${[['epub', 'EPUB'], ['txt', 'TXT']].map(([k, v]) => `<button data-f="${k}" class="${exp.format === k ? 'on' : ''}">${v}</button>`).join('')}</div>
            <select id="x-format" hidden><option value="epub"${exp.format === 'epub' ? ' selected' : ''}>EPUB</option><option value="txt"${exp.format === 'txt' ? ' selected' : ''}>TXT</option></select>
            <h4>Nội dung</h4>
            <select id="x-variant">${Object.entries(VARIANTS).map(([k, v]) => `<option value="${k}"${exp.variant === k ? ' selected' : ''}>${v}</option>`).join('')}</select>
            <span class="muted small">Chương chưa dịch sẽ dùng bản gốc. EPUB xuất lại chỉ giữ chữ và bìa.</span>
          </div>
          <div class="pf-col">
            <h4>Tên file</h4>
            <code class="file-preview" id="x-name"></code>
            <div class="row">
              <button class="btn primary" id="x-download">Tải xuống</button>
              <button class="btn" id="x-drive">Lưu vào Drive…</button>
            </div>
          </div>
        </div>`)}

        ${pane('meta', `<div class="pane-frame single">
          <div class="form-grid">
            <label class="field">Tên gốc<input type="text" id="f-title" value="${esc(b.title)}"></label>
            <label class="field">Tên tiếng Việt<input type="text" id="f-title-vi" value="${esc(b.title_vi)}" placeholder="Tự điền khi dịch cả sách"></label>
            <label class="field">Tác giả<input type="text" id="f-author" value="${esc(b.author)}"></label>
            <div class="row" style="gap:14px">
              <label class="field" style="flex:1">Ngôn ngữ gốc<select id="f-lang">${Object.entries(LANGS).map(([k, v]) => `<option value="${k}"${b.source_lang === k ? ' selected' : ''}>Tiếng ${v}</option>`).join('')}</select></label>
              <label class="field" style="flex:1">Tủ<select id="f-shelf"><option value="">Chưa xếp tủ</option>${shelves.map((s) => `<option value="${s.id}"${b.shelf_id === s.id ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label>
            </div>
            <label class="field full">Tag <span class="tag-input" id="f-tags"></span></label>
            <label class="field full">Giới thiệu<textarea id="f-desc" rows="4">${esc(b.description)}</textarea></label>
          </div>
          <div class="row pf-actions"><span class="muted small" title="${esc(b.origin)}">Nguồn: ${esc(b.origin.length > 70 ? '…' + b.origin.slice(-70) : b.origin)}</span><span class="spacer"></span>
            <button class="btn primary" id="save-meta">Lưu thay đổi</button></div>
        </div>`)}

        ${pane('tools', `<div class="pane-frame">
          <div class="pf-col">
            <h4>Nguồn vault</h4>
            <div id="vault-card">${b.vault_src ? '<span class="muted small">Đang kiểm tra vault…</span>' : vaultCardHtml({ linked: false }, b)}</div>
          </div>
          <div class="pf-col">
            <h4>Chương</h4>
            <button class="btn" id="tool-resplit" style="align-self:flex-start">Tách lại chương bằng regex…</button>
            <span class="muted small">Dùng khi file .txt bị tách sai: nhập regex dòng tiêu đề, xem trước rồi mới áp dụng.</span>
          </div>
        </div>
        <div class="danger-zone"><span><b>Xoá sách</b><small class="muted">Xoá khỏi thư viện cùng bản dịch, tên riêng và ảnh bìa. File gốc không bị động tới.</small></span>
          <button class="btn danger" id="tool-delete">Xoá sách khỏi thư viện</button></div>`)}
      </div>
    </div>`;

  // tabs
  $('.book-page').onclick = (e) => {
    const t = e.target.closest('[data-tab]');
    if (!t) return;
    save('book_tab', t.dataset.tab);
    $$('.book-tab[data-tab]').forEach((x) => x.classList.toggle('on', x.dataset.tab === t.dataset.tab));
    $$('.book-pane').forEach((p) => { p.hidden = p.dataset.pane !== t.dataset.tab; });
  };
  if (b.vault_src) checkVaultSource(b);
  main.addEventListener('click', (e) => {
    if (e.target.closest('#vault-recheck')) { $('#vault-card').innerHTML = '<span class="muted small">Đang kiểm tra vault…</span>'; checkVaultSource(b); }
    if (e.target.closest('#vault-sync-open')) vaultSyncDialog(b);
  });
  $('#hero-translate')?.addEventListener('click', guard(() => startJob({ book_id: b.id, engine: store('engine_' + b.source_lang, 'auto'), overwrite: false })));
  $('#toc-filter').oninput = (e) => {
    const q = e.target.value.trim().toLowerCase();
    $$('table.chapters tbody tr').forEach((r) => { r.hidden = q && !r.dataset.q.includes(q); });
  };

  // chapter summary, edited in place
  $('table.chapters tbody').addEventListener('click', (e) => {
    const cell = e.target.closest('td.sum');
    if (!cell || $('input', cell)) return;
    const ch = b.chapters.find((c) => c.id === +cell.dataset.sum);
    const old = ch.summary || '';
    cell.innerHTML = `<input type="text" maxlength="300" placeholder="Một dòng: chương này có gì">`;
    const inp = $('input', cell);
    inp.value = old; inp.focus();
    let done = false;
    const finish = guard(async (keep) => {
      if (done) return;
      done = true;
      const v = inp.value.trim();
      if (keep && v !== old) {
        const r = await api(`/api/chapters/${ch.id}`, { method: 'PATCH', body: { summary: v } });
        ch.summary = r.summary;
        const row = cell.closest('tr');
        row.dataset.q = `${b.chapters.indexOf(ch) + 1} ${ch.title_vi} ${ch.title} ${ch.summary}`.toLowerCase();
      }
      cell.innerHTML = ch.summary ? esc(ch.summary) : '<span class="ph">+ tóm tắt</span>';
    });
    inp.onkeydown = (ev) => {
      if (ev.key === 'Enter') finish(true);
      if (ev.key === 'Escape') finish(false);
    };
    inp.onblur = () => finish(true);
  });

  if (keepScroll) window.scrollTo(0, scroll);

  // tags
  const tagBox = $('#f-tags');
  const drawTags = () => {
    tagBox.innerHTML = tags.map((t, i) => `<span class="chip" style="${tagStyle(t)}">${esc(t)}<span class="x" data-i="${i}">✕</span></span>`).join('')
      + '<input type="text" placeholder="gõ tag rồi Enter" list="tag-suggest"><datalist id="tag-suggest">'
      + (state.side?.tags || []).map((t) => `<option value="${esc(t.name)}">`).join('') + '</datalist>';
    const inp = $('input', tagBox);
    inp.onkeydown = (e) => {
      if ((e.key === 'Enter' || e.key === ',') && inp.value.trim()) {
        e.preventDefault();
        const v = inp.value.trim().replace(/,$/, '');
        if (!tags.some((x) => x.toLowerCase() === v.toLowerCase())) tags.push(v);
        drawTags(); $('input', tagBox).focus();
      } else if (e.key === 'Backspace' && !inp.value && tags.length) {
        tags.pop(); drawTags(); $('input', tagBox).focus();
      }
    };
    inp.onblur = () => { if (inp.value.trim()) { tags.push(inp.value.trim()); drawTags(); } };
  };
  tagBox.onclick = (e) => { const x = e.target.closest('[data-i]'); if (x) { tags.splice(+x.dataset.i, 1); drawTags(); } };
  drawTags();

  $('.hero-cover .cover').onclick = guard(async () => {
    const [file] = await pickFiles('image/jpeg,image/png,image/webp,image/gif', false);
    if (!file) return;
    await api(`/api/books/${b.id}/cover`, { method: 'POST', body: file, raw: true, type: file.type });
    toast('Đã đổi bìa'); renderBook(b.id);
  });

  $('#save-meta').onclick = guard(async () => {
    const pending = $('input', tagBox).value.trim();
    if (pending) tags.push(pending);
    await api(`/api/books/${b.id}`, {
      method: 'PATCH', body: {
        title: $('#f-title').value.trim() || b.title, title_vi: $('#f-title-vi').value.trim(),
        author: $('#f-author').value.trim(), description: $('#f-desc').value, source_lang: $('#f-lang').value,
        shelf_id: $('#f-shelf').value || null, tags,
      },
    });
    toast('Đã lưu'); refreshSidebar(); renderBook(b.id, true);
  });

  // selection
  const selIds = () => $$('.sel:checked').map((c) => +c.value);
  const updateSel = () => {
    const n = selIds().length;
    $('#t-sel').disabled = $('#c-translate').disabled = $('#c-clear-vi').disabled = $('#c-delete').disabled = !n;
    $('#sel-count').textContent = n ? `${n} chương đã chọn` : '';
  };
  $('#sel-all').onchange = (e) => { $$('.sel').forEach((c) => c.checked = e.target.checked); updateSel(); };
  $$('.sel').forEach((c) => c.onchange = updateSel);

  // translate
  $('#t-engine').onchange = (e) => save('engine_' + b.source_lang, e.target.value);
  $('#t-all').onclick = guard(() => startJob({ book_id: b.id, engine: $('#t-engine').value, overwrite: $('#t-overwrite').checked }));
  $('#t-sel').onclick = $('#c-translate').onclick = guard(() => startJob({ book_id: b.id, engine: $('#t-engine').value, chapter_ids: selIds(), overwrite: true, include_meta: false }));

  // export
  // the format is a segmented switch over the hidden select; the file name preview follows both
  const expName = () => {
    const v = { vi: '', src: ' (gốc)', bi: ' (song ngữ)' }[$('#x-variant').value] || '';
    $('#x-name').textContent = `${(b.title_vi || b.title).replace(/[\/:*?"<>|]+/g, ' ').trim()}${v}.${$('#x-format').value}`;
  };
  $$('#x-format-seg button').forEach((x) => x.onclick = () => {
    $('#x-format').value = x.dataset.f;
    $$('#x-format-seg button').forEach((y) => y.classList.toggle('on', y === x));
    expName();
  });
  $('#x-variant').addEventListener('change', expName);
  expName();
  const expOpts = () => { const o = { format: $('#x-format').value, variant: $('#x-variant').value }; save('export', o); return o; };
  $('#x-download').onclick = () => { const o = expOpts(); location.href = `/api/books/${b.id}/export?format=${o.format}&variant=${o.variant}`; };
  $('#x-drive').onclick = () => driveBrowser({
    mode: 'folder', onPick: async (folder) => {
      const r = await api(`/api/books/${b.id}/export-to-drive`, { method: 'POST', body: { ...expOpts(), folder } });
      toast(`Đã lưu ${r.path}`);
    },
  });

  // tools
  $('#tool-resplit').onclick = guard(async () => {
    const s = await api('/api/settings');
    modal({
      title: 'Tách lại chương',
      body: `<div class="stack">
        <p>Gộp toàn bộ văn bản gốc lại rồi tách theo dòng tiêu đề khớp regex. <b class="warn">Mọi bản dịch và chỉnh sửa tên chương của sách này sẽ mất.</b></p>
        <label class="field">Regex dòng tiêu đề (để trống = mặc định)<input type="text" id="rs-pattern" value="${esc(s.chapter_pattern || '')}" placeholder="${esc(s._default_chapter_pattern)}"></label>
        <p class="muted small">Ví dụ: <code>^第.+章</code> · <code>^Chương \\d+</code> · <code>^\\d+\\.</code>. Chỉ dòng ≤ 60 ký tự mới được coi là tiêu đề.</p></div>`,
      actions: [{ label: 'Huỷ' }, {
        label: 'Tách lại', danger: true, onClick: async (bd) => {
          const r = await api(`/api/books/${b.id}/resplit`, { method: 'POST', body: { pattern: $('#rs-pattern', bd).value } });
          toast(`Đã tách thành ${r.chapters.length} chương`); renderBook(b.id);
        },
      }],
    });
  });
  // add chapters into this book
  const addTarget = () => ({
    into: b.id, title: b.title_vi || b.title,
    after_idx: $('#a-pos').value === '' ? null : +$('#a-pos').value, skip_dupes: $('#a-skip').checked,
  });
  $('#tool-add').onclick = guard(async () => {
    const title = await promptBox('Thêm chương trống', 'Tên chương', `Chương ${b.chapters.length + 1}`);
    if (title == null) return;
    const r = await api(`/api/books/${b.id}/chapters`, { method: 'POST', body: { title, after_idx: addTarget().after_idx } });
    location.hash = `#/read/${r.id}?edit=1`;
  });
  $('#a-file').onclick = guard(async () => {
    const files = await pickFiles(IMPORT_ACCEPT);
    if (files.length) uploadFiles(files, addTarget());
  });
  $('#a-drive').onclick = () => driveBrowser({ mode: 'import', target: addTarget(), onPick: () => renderBook(b.id, true) });
  $('#a-vault').onclick = () => {
    const t = addTarget();
    location.hash = `#/vault?into=${b.id}${t.after_idx != null ? '&after=' + t.after_idx : ''}&skip=${t.skip_dupes ? 1 : 0}`;
  };
  $('#a-paste').onclick = () => {
    const target = addTarget();
    modal({
      title: 'Dán chương vào sách', wide: true,
      body: `<div class="stack">
        <label class="field">Tên chương (để trống = lấy dòng đầu)<input type="text" id="p-title"></label>
        <label class="field">Nội dung<textarea id="p-text" rows="14" placeholder="Dán nội dung chương lẻ…"></textarea></label>
        <label class="check"><input type="checkbox" id="p-split"> Tự tách thành nhiều chương theo dòng tiêu đề (第X章, Chương N…)</label></div>`,
      actions: [{ label: 'Huỷ' }, {
        label: 'Thêm vào sách', primary: true, onClick: async (bd) => {
          const r = await api(`/api/books/${b.id}/append-text`, {
            method: 'POST', body: { title: $('#p-title', bd).value, text: $('#p-text', bd).value, split: $('#p-split', bd).checked, ...target },
          });
          toast(appendMsg(r, target.title));
          renderBook(b.id, true);
        },
      }],
    });
  };

  // bulk chapter actions
  $('#c-clear-vi').onclick = guard(async () => {
    const ids = selIds();
    if (!await confirmBox('Xoá bản dịch', `Xoá bản dịch (cả tên chương đã dịch) của ${ids.length} chương đã chọn? Bản gốc được giữ nguyên.`, 'Xoá bản dịch', true)) return;
    const r = await api(`/api/books/${b.id}/chapters/bulk`, { method: 'POST', body: { action: 'clear_vi', ids } });
    toast(`Đã xoá bản dịch của ${r.changed} chương`);
    renderBook(b.id, true);
  });
  $('#c-delete').onclick = guard(async () => {
    const ids = selIds();
    if (!await confirmBox('Xoá chương', `Xoá hẳn ${ids.length} chương đã chọn (cả bản gốc lẫn bản dịch)? Không hoàn tác được.`, `Xoá ${ids.length} chương`, true)) return;
    const r = await api(`/api/books/${b.id}/chapters/bulk`, { method: 'POST', body: { action: 'delete', ids } });
    toast(`Đã xoá ${r.changed} chương`);
    renderBook(b.id, true);
  });
  $('#tool-delete').onclick = guard(async () => {
    if (!await confirmBox('Xoá sách', `Xoá <b>${esc(b.title)}</b> cùng mọi bản dịch khỏi thư viện? File gốc trên Drive / máy không bị động tới. Không hoàn tác được.`, 'Xoá vĩnh viễn', true)) return;
    await api(`/api/books/${b.id}`, { method: 'DELETE' });
    toast('Đã xoá'); refreshSidebar(); location.hash = '#/';
  });

  // chapter row actions
  $('table.chapters tbody').onclick = guard(async (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = btn.closest('tr').dataset.id;
    const act = btn.dataset.act;
    if (act === 'up' || act === 'down') await api(`/api/chapters/${id}/move`, { method: 'POST', body: { dir: act === 'up' ? -1 : 1 } });
    if (act === 'merge') {
      if (!await confirmBox('Gộp chương', 'Gộp chương này với chương ngay sau? Tên chương sau sẽ thành một đoạn văn trong chương gộp.', 'Gộp')) return;
      await api(`/api/chapters/${id}/merge-next`, { method: 'POST' });
    }
    if (act === 'del') {
      if (!await confirmBox('Xoá chương', 'Xoá chương này (cả bản gốc lẫn bản dịch)?', 'Xoá', true)) return;
      await api(`/api/chapters/${id}`, { method: 'DELETE' });
    }
    renderBook(b.id, true);
  });
}

/* ================= reader ================= */

const readerState = {
  chapter: null, book: null, editing: false,
  writing: false,    // the writing desk (desk.js); `editing` is on too, so every edit-mode guard applies
  mode: store('reader_mode', 'vi'),
  drawer: store('reader_drawer', null),
  resume: false,
  loaded: [],        // chapters on screen, in order; continuous scrolling appends to it
  appending: false,
  prefs: store('reader_prefs', {
    size: 19, lh: 1.9, width: 760, font: 'serif',
    theme: 'tokyo', fg: '', bg: '',
  }),
};

async function renderReader(cid, query) {
  readerState.writing = query.get('write') === '1';
  readerState.editing = readerState.writing || query.get('edit') === '1';
  readerState.resume = query.get('resume') === '1';
  main.innerHTML = `<div class="reader-page">
    <div class="reader-top"><div class="reader-bar" id="rbar"></div><div class="read-progress"><i id="rprog"></i></div></div>
    <div id="rbody"></div><nav class="rail" id="rrail"></nav><aside class="drawer" id="rdrawer" hidden></aside></div>`;
  await engines();
  await loadChapter(cid);
}

async function loadChapter(cid, keepScroll = false) {
  const scroll = window.scrollY;
  const ch = await api(`/api/chapters/${cid}`);
  if (!readerState.book || readerState.book.id !== ch.book_id || keepScroll) {
    readerState.book = await api(`/api/books/${ch.book_id}`);
  }
  if (!readerState.names || readerState.names.bookId !== ch.book_id || keepScroll) await loadNames(ch.book_id);
  if (currentView !== 'read') return;
  readerState.chapter = ch;
  readerState.loaded = [ch];
  readerState.appending = false;
  drawReaderBar();
  drawReaderBody();
  window.scrollTo(0, keepScroll ? scroll : 0);
  if (readerState.resume) {
    readerState.resume = false;
    const at = Math.round(readerState.book.last_scroll || 0);
    if (at >= 1 && readerState.book.last_chapter_id === ch.id) goToParagraph(at, true);
  }
  window.dispatchEvent(new Event('scroll'));
  saveSpot(ch, 0);   // the scroll handler corrects the paragraph a moment later
  if (!keepScroll && history.replaceState) history.replaceState(null, '', `#/read/${ch.id}${readerState.writing ? '?write=1' : readerState.editing ? '?edit=1' : ''}`);
}

const ICONS = {
  toc: '<path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"/>',
  names: '<circle cx="7.5" cy="7.5" r="1"/><path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3z"/>',
  translate: '<path d="M4 5h7M9 3v2c0 4.418-2.239 8-5 8M5 9c0 2.144 2.952 3.908 6.7 4M12 20l4-9 4 9M19.1 18h-6.2"/>',
  prefs: '<path d="M4 20h3M14 20h7M6.9 15h6.9M10.2 6.3 16 20M5 20l6-16h2l7 16"/>',
  tts: '<path d="M15 8a5 5 0 0 1 0 8M17.7 5a9 9 0 0 1 0 14M6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l3.5-4.5a.8.8 0 0 1 1.5.5v14a.8.8 0 0 1-1.5.5L6 15z"/>',
  pin: '<path d="m15 4.5-4 4-4 1.5-1.5 1.5 7 7 1.5-1.5 1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
  list: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10a4 4 0 0 1-.5 8z"/>',
  play: '<path d="M7 5v14l11-7z" fill="currentColor"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;
const RAIL_LABELS = { toc: 'Mục lục', names: 'Tên', translate: 'Dịch', tts: 'Đọc', prefs: 'Hiển thị' };
const DRAWERS = { toc: 'Mục lục', names: 'Tên trong chương', translate: 'Dịch', tts: 'Đọc thành tiếng', prefs: 'Hiển thị' };

function drawReaderBar() {
  const { chapter: ch, book: b, mode, editing, writing } = readerState;
  const pos = b.chapters.findIndex((c) => c.id === ch.id) + 1;
  $('#rbar').innerHTML = `
    <a class="btn ghost sm r-back" href="#/book/${b.id}" title="${esc(b.title)}">← ${esc(b.title_vi || b.title)}</a>
    <span class="r-crumb" title="${esc(ch.title_vi || ch.title)}">› ${esc(ch.title_vi || ch.title)}</span>
    <span class="spacer"></span>
    <button class="btn ghost sm" id="r-prev" ${ch.prev_id ? '' : 'disabled'} title="Chương trước (←)">‹ Trước</button>
    <button class="btn ghost sm r-count" id="r-count" title="Mở mục lục">${pos} / ${b.chapters.length}</button>
    <button class="btn ghost sm" id="r-next" ${ch.next_id ? '' : 'disabled'} title="Chương sau (→)">Sau ›</button>
    <span class="spacer"></span>
    ${editing ? '' : `<div class="seg" id="r-mode">${Object.entries({ src: 'Gốc', vi: 'Dịch', bi: 'Song ngữ' }).map(([k, v]) => `<button data-m="${k}" class="${mode === k ? 'on' : ''}">${v}</button>`).join('')}</div>`}
    ${writing ? '' : `<button class="btn sm ${editing ? 'primary' : ''}" id="r-edit">${editing ? 'Xong sửa' : 'Sửa'}</button>`}
    ${editing && !writing ? '' : `<button class="btn sm ${writing ? 'primary' : ''}" id="r-write" title="Bàn viết: bản của bạn cạnh bản đối chiếu và dàn ý. Lưu riêng, không ghi đè bản gốc hay bản dịch.">${writing ? 'Xong viết' : 'Bàn viết'}</button>`}`;

  $('#r-count').onclick = () => toggleDrawer('toc');
  $('#r-prev').onclick = () => ch.prev_id && goChapter(ch.prev_id);
  $('#r-next').onclick = () => ch.next_id && goChapter(ch.next_id);
  $$('#r-mode button').forEach((btn) => btn.onclick = () => { readerState.mode = btn.dataset.m; save('reader_mode', btn.dataset.m); drawReaderBar(); drawReaderBody(); });
  if ($('#r-edit')) $('#r-edit').onclick = guard(async () => {
    if (readerState.editing && editorDirty()) {
      if (!await confirmBox('Chưa lưu', 'Có thay đổi chưa lưu. Lưu trước khi thoát chế độ sửa?', 'Lưu')) { readerState.editing = false; return loadChapter(ch.id); }
      await saveEditor();
    }
    readerState.editing = !readerState.editing;
    loadChapter(ch.id);
  });
  if ($('#r-write')) $('#r-write').onclick = guard(async () => {
    if (readerState.writing && editorDirty()
      && await confirmBox('Chưa lưu', 'Bản của bạn có thay đổi chưa lưu. Lưu trước khi rời bàn viết?', 'Lưu')) await saveEditor();
    if (typeof ttsStop === 'function') ttsStop();   // what it was reading is about to be redrawn
    readerState.writing = readerState.editing = !readerState.writing;
    loadChapter(ch.id);
  });

  $('#rrail').innerHTML = Object.entries(DRAWERS).map(([k, label]) =>
    `<button class="rail-btn${readerState.drawer === k ? ' on' : ''}" data-dr="${k}" title="${label}" aria-label="${label}">${icon(k)}<span>${RAIL_LABELS[k]}</span></button>`).join('');
  $('#rrail').onclick = (e) => { const bt = e.target.closest('[data-dr]'); if (bt) toggleDrawer(bt.dataset.dr); };
  $('.reader-page').classList.toggle('is-editing', editing);
  drawDrawer();
}

/* ---------- drawers ---------- */

function toggleDrawer(k) {
  readerState.drawer = readerState.drawer === k ? null : k;
  save('reader_drawer', readerState.drawer);
  $$('#rrail [data-dr]').forEach((b) => b.classList.toggle('on', b.dataset.dr === readerState.drawer));
  drawDrawer();
}

function closeDrawer() {
  if (!readerState.drawer) return;
  toggleDrawer(readerState.drawer);
}

function drawDrawer() {
  const el = $('#rdrawer');
  if (!el) return;
  const k = readerState.editing ? null : readerState.drawer;
  const pinned = store('reader_pin', false);
  $('.reader-page').classList.toggle('drawer-open', !!k);
  $('.reader-page').classList.toggle('drawer-pinned', !!k && pinned);
  document.body.classList.toggle('drawer-pinned', !!k && pinned);
  if (!k) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.innerHTML = `<div class="dr-head"><b>${DRAWERS[k]}</b><span class="spacer"></span>
      <button class="icon-btn dr-pin${pinned ? ' on' : ''}" data-dra="pin" title="${pinned ? 'Bỏ ghim — ngăn nổi đè lên trang' : 'Ghim — ngăn nằm cạnh trang'}">${icon('pin')}</button>
      <button class="icon-btn" data-dra="close" title="Đóng (Esc)">${icon('close')}</button></div>
    <div class="dr-body">${{ toc: tocDrawer, names: namesDrawer, translate: translateDrawer, tts: ttsDrawer, prefs: prefsDrawer }[k]()}</div>`;
  el.dataset.k = k;
  el.onclick = guard(async (e) => {
    if (typeof ttsDrawerClick === 'function' && ttsDrawerClick(e)) return;
    const a = e.target.closest('[data-dra]');
    if (a?.dataset.dra === 'close') return closeDrawer();
    if (a?.dataset.dra === 'pin') { save('reader_pin', !pinned); return drawDrawer(); }
    const go = e.target.closest('[data-go]');
    if (go) { if (!store('reader_pin', false)) closeDrawer(); return goChapter(go.dataset.go); }
    const nm = e.target.closest('[data-name]');
    if (nm) return focusName(nm.dataset.name);
    const act = e.target.closest('[data-tr]');
    if (act) return runTranslate(act.dataset.tr);
    if (e.target.closest('[data-color-reset]')) {
      readerState.prefs.fg = ''; readerState.prefs.bg = '';
      applyPrefs();
      $$('[data-color]', el).forEach((i) => { i.value = readerColor(i.dataset.color); });
      return updateColorWarn();
    }
    if (e.target.matches('[data-cont]')) { save('reader_continuous', e.target.checked); return loadChapter(readerState.chapter.id); }
    const t = e.target.closest('[data-theme]');
    const f = e.target.closest('[data-font]');
    if (t) {
      readerState.prefs.theme = t.dataset.theme; $$('[data-theme]', el).forEach((b) => b.classList.toggle('on', b === t)); applyPrefs();
      $$('[data-color]', el).forEach((i) => { i.value = readerColor(i.dataset.color); }); updateColorWarn();
    }
    if (f) { readerState.prefs.font = f.dataset.font; $$('[data-font]', el).forEach((b) => b.classList.toggle('on', b === f)); applyPrefs(); }
  });
  el.oninput = (e) => {
    if (typeof ttsDrawerInput === 'function' && ttsDrawerInput(e)) return;
    if (e.target.id === 'dr-filter') {
      const q = e.target.value.trim().toLowerCase();
      $$('.dr-row', el).forEach((r) => { r.hidden = q && !r.dataset.q.includes(q); });
      return;
    }
    if (e.target.dataset.color) {
      readerState.prefs[e.target.dataset.color] = e.target.value;
      applyPrefs(); updateColorWarn();
      return;
    }
    const pk = e.target.dataset.k;
    if (pk) {
      readerState.prefs[pk] = +e.target.value;
      $('#pv-' + pk, el).textContent = readerState.prefs[pk] + (pk === 'lh' ? '' : 'px');
      applyPrefs();
    }
  };
  el.onchange = el.oninput;
  if (k === 'toc') $('.dr-row.cur', el)?.scrollIntoView({ block: 'center' });
  if (k === 'prefs') updateColorWarn();
}

function applyPrefs() {
  save('reader_prefs', readerState.prefs);
  const r = $('.reader');
  if (r) applyReaderPrefs(r);
}

function tocDrawer() {
  const { book: b, chapter: ch } = readerState;
  const done = b.chapters.filter((c) => c.len_vi > 0).length;
  return `<div class="dr-sub"><span class="muted small">${done} / ${b.chapters.length} chương đã dịch</span></div>
    <input type="search" id="dr-filter" placeholder="Lọc theo tên hoặc số chương">
    <div class="dr-list">${b.chapters.map((c, i) => {
      const t = c.title_vi || c.title;
      return `<a class="dr-row${c.id === ch.id ? ' cur' : ''}" data-go="${c.id}" data-q="${esc(`${i + 1} ${t} ${c.title}`.toLowerCase())}">
        <span class="dot${c.len_vi ? ' on' : ''}" title="${c.len_vi ? 'Đã dịch' : 'Chưa dịch'}"></span><span class="n">${i + 1}</span><span class="t">${esc(t)}${draftTag(c)}</span></a>`;
    }).join('')}</div>`;
}

function chapterNames() {
  const src = readerState.chapter.content_src || '';
  const out = [];
  for (const [vi, entries] of readerState.names?.byVi || []) {
    const count = entries.reduce((n, e) => n + (e.src ? src.split(e.src).length - 1 : 0), 0);
    if (count) out.push({ vi, src: entries.map((e) => e.src).join(', '), count, scope: entries[0].scope });
  }
  return out.sort((a, b) => b.count - a.count);
}

function namesDrawer() {
  const list = chapterNames();
  const b = readerState.book;
  return `${list.length ? `<div class="dr-list">${list.map((n) => `
      <a class="dr-row" data-name="${esc(n.vi)}" title="Tới chỗ đầu tiên và sửa"><span class="t"><span class="nm">${esc(n.vi)}</span> <span class="muted">${esc(n.src)}</span></span>
      <span class="muted small">${n.scope === 'global' ? 'chung · ' : ''}×${n.count}</span></a>`).join('')}</div>`
    : '<p class="muted small">Chương này chưa có tên riêng nào trong danh sách.</p>'}
    <p class="muted small">Thêm tên mới: bôi đen chữ gốc ở chế độ Gốc hoặc Song ngữ.</p>
    <a class="small" href="#/names?book=${b.id}">Mọi tên của sách này →</a>`;
}

function focusName(vi) {
  if (readerState.mode === 'src') { toast('Chuyển sang Dịch hoặc Song ngữ để sửa tên trong bản dịch'); return; }
  const mark = $$(`article.ch-sec[data-cid="${readerState.chapter.id}"] mark.name`).find((m) => m.dataset.vi === vi);
  if (!mark) { toast('Tên này không có trong bản dịch của chương'); return; }
  mark.scrollIntoView({ block: 'center' });
  setTimeout(() => namePopover(mark), 250);
}

function translateDrawer() {
  const { book: b, chapter: ch } = readerState;
  const key = 'engine_' + b.source_lang;
  const left = b.chapters.filter((c) => !c.len_vi).length;
  return `<label class="field">Engine<select id="dr-engine" onchange="save('${key}', this.value)">${engineOptions(store(key, 'auto'))}</select></label>
    <div class="stack">
      <button class="btn${ch.content_vi ? '' : ' primary'}" data-tr="chapter">${ch.content_vi ? 'Dịch lại chương này' : 'Dịch chương này'}</button>
      ${left ? `<button class="btn" data-tr="rest">Dịch ${left} chương chưa dịch</button>` : '<p class="muted small">Mọi chương đã có bản dịch.</p>'}
    </div>
    <p class="muted small">Dịch lại chương sẽ ghi đè bản dịch hiện có, kể cả chỗ đã sửa tay. Muốn giữ phần đã sửa thì dùng nút ↻ trên từng đoạn.</p>
    ${b.sensitive ? '<p class="warn small">Sách có nội dung lấy từ vault: engine server sẽ hỏi ý trước khi gửi đi. Engine local không gửi gì ra ngoài.</p>' : ''}`;
}

async function runTranslate(what) {
  const { book: b, chapter: ch } = readerState;
  const engine = $('#dr-engine')?.value || store('engine_' + b.source_lang, 'auto');
  save('engine_' + b.source_lang, engine);
  if (what === 'chapter') await startJob({ book_id: b.id, chapter_ids: [ch.id], engine, overwrite: true, include_meta: false });
  if (what === 'rest') await startJob({ book_id: b.id, engine, overwrite: false });
}

const READER_THEMES = {
  tokyo: ['Tokyo', '#12141c', '#e6e8f0'], dark: ['Tối', '#15140f', '#d8d0c2'], charcoal: ['Than ấm', '#1b1916', '#e4ddd0'],
  light: ['Kem', '#f6efdc', '#2b2418'], warm: ['Giấy ấm', '#f4ecd8', '#33291a'], mist: ['Sương xanh', '#edf2f0', '#1d2928'],
  paper: ['Trắng', '#ffffff', '#1a1a1a'], sepia: ['Sepia', '#ead9b6', '#3b2d17'],
};

function prefsDrawer() {
  const p = readerState.prefs;
  return `<div class="stack">
    <label class="slider"><span>Cỡ chữ</span><b id="pv-size">${p.size}px</b><input type="range" min="14" max="30" value="${p.size}" data-k="size"></label>
    <label class="slider"><span>Giãn dòng</span><b id="pv-lh">${p.lh}</b><input type="range" min="1.3" max="2.6" step="0.1" value="${p.lh}" data-k="lh"></label>
    <label class="slider"><span>Độ rộng cột</span><b id="pv-width">${p.width}px</b><input type="range" min="480" max="1200" step="20" value="${p.width}" data-k="width"></label>
    <div class="dr-sec">Chủ đề</div>
    <div class="theme-grid">${Object.entries(READER_THEMES).map(([t, [name, bg, fg]]) => `<button data-theme="${t}" class="theme-sw${p.theme === t ? ' on' : ''}" style="--sw-bg:${bg};--sw-fg:${fg}"><span class="sw">Aa</span>${name}</button>`).join('')}</div>
    <div class="dr-sec">Kiểu chữ</div>
    <div class="seg">${['serif', 'sans'].map((f) => `<button data-font="${f}" class="${p.font === f ? 'on' : ''}">${f === 'serif' ? 'Có chân' : 'Không chân'}</button>`).join('')}</div>
    <label class="check"><input type="checkbox" data-cont${store('reader_continuous', true) ? ' checked' : ''}> Cuộn liền sang chương sau</label>
    <div class="dr-sec">Màu tự chọn</div>
    <div class="color-pick">
      <label>Màu chữ<input type="color" data-color="fg" value="${readerColor('fg')}"></label>
      <label>Màu nền<input type="color" data-color="bg" value="${readerColor('bg')}"></label>
      <button class="btn sm" data-color-reset${p.fg || p.bg ? '' : ' disabled'}>Đặt lại màu</button>
    </div>
    <p class="field-err" id="color-warn" role="status"></p>
    <p class="muted small">Phím tắt: ← → đổi chương · Esc đóng ngăn.</p>
  </div>`;
}

/* close an overlay drawer when clicking the page behind it */
document.addEventListener('mousedown', (e) => {
  if (currentView !== 'read' || !readerState.drawer || store('reader_pin', false)) return;
  if (e.target.closest('#rdrawer, #rrail, #r-count, .modal-back, #name-pop, .toast')) return;
  closeDrawer();
});


async function goChapter(id) {
  if (readerState.editing && editorDirty()) {
    if (await confirmBox('Chưa lưu', 'Lưu thay đổi của chương này trước khi chuyển?', 'Lưu')) await saveEditor();
  }
  loadChapter(id);
}

/** Colour the reader shows now: Aurel's own pick if there is one, else the theme's (read from the stylesheet). */
function readerColor(which) {
  const own = readerState.prefs[which];
  if (own) return own;
  const r = $('.reader');
  const v = r && getComputedStyle(r).getPropertyValue(which === 'fg' ? '--r-text' : '--r-bg').trim();
  return /^#[0-9a-f]{6}$/i.test(v) ? v : (which === 'fg' ? '#26221d' : '#fbf8f1');
}

/** WCAG 2.1 contrast ratio between two #rrggbb colours. */
function contrastRatio(a, b) {
  const lum = (hex) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Warn under the colour pickers when the text would be hard to read (below 4.5:1). Only a warning: Aurel decides. */
function updateColorWarn() {
  const w = $('#color-warn');
  if (!w) return;
  const p = readerState.prefs;
  const ratio = contrastRatio(readerColor('fg'), readerColor('bg'));
  w.textContent = (p.fg || p.bg) && ratio < 4.5 ? `⚠ Tương phản ${ratio.toFixed(1).replace('.', ',')}:1, khó đọc (nên từ 4,5:1 trở lên)` : '';
  const reset = $('[data-color-reset]');
  if (reset) reset.disabled = !(p.fg || p.bg);
}

function applyReaderPrefs(el) {
  const p = readerState.prefs;
  el.className = 'reader ' + (p.theme === 'light' ? '' : p.theme);
  // own colours sit on top of the theme; clearing them gives the theme back
  for (const [k, v] of [['--r-text', p.fg], ['--r-bg', p.bg]]) {
    if (v) el.style.setProperty(k, v); else el.style.removeProperty(k);
  }
  if (p.fg) el.style.setProperty('--r-muted', `color-mix(in srgb, ${p.fg} 62%, ${p.bg || 'var(--r-bg)'})`);
  else el.style.removeProperty('--r-muted');
  el.style.setProperty('--r-size', p.size + 'px');
  el.style.setProperty('--r-lh', p.lh);
  el.style.setProperty('--r-width', p.width + 'px');
  el.style.setProperty('--r-font', p.font === 'sans' ? 'var(--sans)' : 'var(--serif)');
}

function paragraphs(text) {
  return text ? text.split('\n') : [];
}

/** The translation as shown: saved text with the "đổi nghĩa" rules applied (the server did it). After a paragraph was edited here
 *  the saved text has moved on from what the server saw, so show it as saved until the next refresh. */
function shownVi(ch) {
  return ch.vi_shown && ch.vi_base === ch.content_vi ? ch.vi_shown : paragraphs(ch.content_vi);
}

/* ---------- names in the translation ---------- */

async function loadNames(bookId) {
  const list = await api(`/api/books/${bookId}/names`);
  const byVi = new Map();
  for (const n of list) byVi.set(n.vi, [...(byVi.get(n.vi) || []), n]);
  const keys = [...byVi.keys()].sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // whole-word only, same rule as the server's replace-name: "An" must not light up inside "Anh"
  const rx = keys.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${keys.join('|')})(?![\\p{L}\\p{N}])`, 'gu') : null;
  readerState.names = { bookId, byVi, rx };
}

function markNames(text) {
  const rx = readerState.names?.rx;
  if (!rx || !text) return esc(text);
  let out = '', last = 0;
  for (const m of text.matchAll(rx)) {
    out += esc(text.slice(last, m.index)) + `<mark class="name" data-vi="${esc(m[0])}">${esc(m[0])}</mark>`;
    last = m.index + m[0].length;
  }
  return out + esc(text.slice(last));
}

/* ---------- reader body: one <article> per loaded chapter ---------- */

const MAX_SECTIONS = 5;
// no hover means a finger: tools open on tap instead of on pointer-over
const touchUI = () => window.matchMedia?.('(hover: none)').matches;
const continuous = () => store('reader_continuous', true) && !readerState.editing;
const loadedChapter = (cid) => readerState.loaded.find((c) => c.id === +cid);
const sectionOf = (el) => loadedChapter(el.closest('article.ch-sec')?.dataset.cid);

function sectionHtml(ch) {
  const { mode } = readerState;
  const src = paragraphs(ch.content_src);
  const vi = shownVi(ch);
  const hasVi = vi.length > 0;
  const aligned = hasVi && src.length === vi.length;
  let effective = mode;
  if (mode !== 'src' && !hasVi) effective = 'src';

  const title = effective === 'src' ? ch.title : (ch.title_vi || ch.title);
  const sub = effective === 'src' ? '' : (ch.title_vi && ch.title_vi !== ch.title ? ch.title : '');
  let html = `<h1>${esc(title)}</h1><div class="h-sub">${esc(sub)}${draftTag(ch)}</div>`;
  if (mode !== 'src' && !hasVi) {
    html += `<div class="notice">Chương này chưa có bản dịch — đang hiện bản gốc. <button class="btn sm primary" data-quick-translate>Dịch ngay</button></div>`;
  } else if (hasVi && !aligned && effective !== 'src') {
    html += `<div class="notice warn">Số đoạn gốc (${src.length}) và bản dịch (${vi.length}) lệch nhau — song ngữ có thể không khớp dòng, và sửa từng đoạn bị tắt. Dùng “Sửa” để sửa cả chương.</div>`;
  }
  const tag = (i) => (aligned ? ` data-i="${i}"` : '');
  if (effective === 'bi') {
    const n = Math.max(src.length, vi.length);
    for (let i = 0; i < n; i++) {
      html += `<div class="pair" data-p="${i}"${tag(i)}>${src[i] ? `<p class="src" data-src>${esc(src[i])}</p>` : ''}${vi[i] ? `<p class="vi">${markNames(vi[i])}</p>` : ''}</div>`;
    }
  } else if (effective === 'src') {
    html += src.map((l, i) => `<p data-src data-p="${i}">${esc(l)}</p>`).join('');
  } else {
    html += vi.map((l, i) => `<p class="vi" data-p="${i}"${tag(i)}>${markNames(l)}</p>`).join('');
  }
  if (!src.length && !vi.length) html += '<p class="muted" style="text-indent:0;text-align:center">(Chương trống — bấm “Sửa” để thêm nội dung)</p>';
  if (!continuous()) {
    html += `<div class="nav-foot">
      ${ch.prev_id ? `<button class="btn" data-go="${ch.prev_id}">‹ Chương trước</button>` : '<span></span>'}
      ${ch.next_id ? `<button class="btn primary" data-go="${ch.next_id}">Chương sau ›</button>` : '<span class="muted">Hết sách</span>'}</div>`;
  }
  if (aligned && effective !== 'src') {
    html += `<div class="para-tools" hidden>
      <button class="icon-btn" data-pt="retranslate" title="Dịch lại đoạn này">↻</button>
      <button class="icon-btn" data-pt="edit" title="Sửa đoạn này">✎</button>
      ${effective === 'vi' ? '<button class="icon-btn" data-pt="src" title="Hiện / ẩn chữ gốc">原</button>' : ''}</div>`;
  }
  return `<article class="inner ch-sec" data-cid="${ch.id}">${html}</article>`;
}

function tailHtml() {
  if (!continuous()) return '';
  const last = readerState.loaded[readerState.loaded.length - 1];
  if (!last?.next_id) return '<div class="ch-tail"><span class="muted">Hết sách</span></div>';
  return `<div class="ch-tail"><button class="btn" data-more>${readerState.appending ? 'Đang tải chương sau…' : 'Tải chương sau ›'}</button></div>`;
}

function drawReaderBody() {
  const body = $('#rbody');
  if (readerState.writing) return guard(drawDesk)(body);
  if (readerState.editing) return drawEditor(body);
  body.innerHTML = `<div class="reader"><div id="r-secs">${readerState.loaded.map(sectionHtml).join('')}</div><div id="r-tail">${tailHtml()}</div></div>`;
  applyReaderPrefs($('.reader', body));

  body.onmouseover = (e) => {
    if (touchUI()) return;
    const p = e.target.closest('[data-i]');
    if (!p || p.classList.contains('editing') || e.target.closest('.para-tools')) return;
    const tools = $('.para-tools', p.closest('article'));
    if (!tools) return;
    $$('.para-tools:not([hidden])', body).forEach((t) => { if (t !== tools) t.hidden = true; });
    tools.hidden = false;
    tools.style.top = p.offsetTop + 'px';
    tools.dataset.i = p.dataset.i;
  };
  body.onmouseleave = () => { if (!touchUI()) $$('.para-tools', body).forEach((t) => { t.hidden = true; }); };
  body.onclick = guard(async (e) => {
    const go = e.target.closest('[data-go]');
    if (go) return loadChapter(go.dataset.go);
    if (e.target.closest('[data-more]')) return appendNext();
    if (e.target.closest('[data-quick-translate]')) {
      setCurrent(sectionOf(e.target));
      return readerState.drawer !== 'translate' && toggleDrawer('translate');
    }
    const mark = e.target.closest('mark.name');
    if (mark && !window.getSelection()?.toString()) return namePopover(mark);
    const pt = e.target.closest('[data-pt]');
    if (pt) {
      const art = pt.closest('article');
      const ch = loadedChapter(art.dataset.cid);
      const i = Number(pt.closest('.para-tools').dataset.i);
      const el = $(`[data-i="${i}"]`, art);
      if (pt.dataset.pt === 'edit') return editParagraph(ch, el, i);
      if (pt.dataset.pt === 'retranslate') return retranslateParagraph(ch, el, i);
      if (pt.dataset.pt === 'src') return toggleSource(ch, el, i);
    }
    if (touchUI()) pickParagraph(e.target.closest('[data-i]'));
  });
}

/** Touch: tap a paragraph to show its tools under it; tap it again, or anywhere else, to hide them. */
function pickParagraph(p) {
  const was = $('.reader [data-i].picked');
  was?.classList.remove('picked');
  $$('.para-tools').forEach((t) => { t.hidden = true; });
  if (!p || p === was || p.classList.contains('editing') || window.getSelection()?.toString()) return;
  const tools = $('.para-tools', p.closest('article'));
  if (!tools) return;
  p.classList.add('picked');
  tools.hidden = false;
  tools.style.top = (p.offsetTop + p.offsetHeight + 2) + 'px';
  tools.dataset.i = p.dataset.i;
}

/** Redraw every loaded chapter, keeping the chapter in view where it was on screen. */
function redrawKeepingScroll() {
  const cid = readerState.chapter?.id;
  const top = () => $(`article.ch-sec[data-cid="${cid}"]`)?.getBoundingClientRect().top;
  const before = top();
  drawReaderBody();
  const after = top();
  if (before != null && after != null) window.scrollBy(0, after - before);
  if (typeof ttsRescan === 'function') ttsRescan();
}

/** Re-fetch everything on screen: after a job finishes, a name is replaced, a chapter is saved. */
async function refreshLoaded() {
  const [book, ...chs] = await Promise.all([
    api(`/api/books/${readerState.book.id}`),
    ...readerState.loaded.map((c) => api(`/api/chapters/${c.id}`)),
  ]);
  await loadNames(book.id);
  if (currentView !== 'read') return;
  readerState.book = book;
  readerState.loaded = chs;
  readerState.chapter = chs.find((c) => c.id === readerState.chapter?.id) || chs[0];
  drawReaderBar();
  redrawKeepingScroll();
}

async function appendNext() {
  const last = readerState.loaded[readerState.loaded.length - 1];
  if (readerState.appending || !continuous() || !last?.next_id) return;
  readerState.appending = true;
  $('#r-tail') && ($('#r-tail').innerHTML = tailHtml());
  try {
    const ch = await api(`/api/chapters/${last.next_id}`);
    if (currentView !== 'read' || readerState.loaded[readerState.loaded.length - 1] !== last) return;
    readerState.loaded.push(ch);
    $('#r-secs').insertAdjacentHTML('beforeend', sectionHtml(ch));
    // keep the page light: drop the oldest chapter once it is far above the screen
    if (readerState.loaded.length > MAX_SECTIONS) {
      const first = $('#r-secs > article');
      if (first.getBoundingClientRect().bottom < 0) {
        const anchor = $$('#r-secs > article')[1];
        const before = anchor.getBoundingClientRect().top;
        first.remove();
        readerState.loaded.shift();
        window.scrollBy(0, anchor.getBoundingClientRect().top - before);
      }
    }
  } finally {
    readerState.appending = false;
    if ($('#r-tail')) $('#r-tail').innerHTML = tailHtml();
  }
}

let progressTimer = null;
let savedSpot = '';
/** Remember chapter + paragraph index, not pixels: a different text size must not move the mark. */
function saveSpot(ch, para) {
  const spot = `${ch.id}:${para}`;
  if (spot === savedSpot) return;
  savedSpot = spot;
  clearTimeout(progressTimer);
  progressTimer = setTimeout(() => {
    api(`/api/books/${ch.book_id}/progress`, { method: 'POST', body: { chapter_id: ch.id, scroll: para } }).catch(() => {});
    if (readerState.book?.id === ch.book_id) { readerState.book.last_chapter_id = ch.id; readerState.book.last_scroll = para; }
  }, 1000);
}

function setCurrent(ch) {
  if (!ch || ch.id === readerState.chapter?.id) return;
  readerState.chapter = ch;
  drawReaderBar();
  if (history.replaceState) history.replaceState(null, '', `#/read/${ch.id}`);
}

/** Jump to a paragraph and flag it, so "Đọc tiếp" lands where reading stopped. */
function goToParagraph(idx, flag = false) {
  const art = $(`article.ch-sec[data-cid="${readerState.chapter.id}"]`);
  const el = $(`[data-p="${idx}"]`, art) || $('[data-p]', art);
  if (!el) return;
  // leave room for the "đã đọc tới đây" rule that sits above the paragraph
  const head = ($('.reader-top')?.offsetHeight || 0) + (flag ? 34 : 12);
  window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - head);
  if (flag) {
    $('.read-here')?.classList.remove('read-here');
    el.classList.add('read-here');
  }
}

/* which chapter is at the top of the screen, how far into it, and whether to load the next one */
window.addEventListener('scroll', () => {
  const bar = $('#rprog');
  if (!bar || currentView !== 'read') return;
  const arts = $$('#r-secs > article');
  if (!arts.length) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 100) + '%';
    return;
  }
  const head = ($('.reader-top')?.offsetHeight || 0) + 40;
  let cur = arts[0];
  for (const a of arts) { if (a.getBoundingClientRect().top <= head) cur = a; else break; }
  const ch = loadedChapter(cur.dataset.cid);
  setCurrent(ch);
  const head2 = ($('.reader-top')?.offsetHeight || 0) + 44;
  const top = $$('[data-p]', cur).find((p) => p.getBoundingClientRect().bottom > head2);
  if (ch) saveSpot(ch, top ? Number(top.dataset.p) : 0);
  const flag = $('.read-here');
  if (flag && flag.getBoundingClientRect().bottom < 0) flag.classList.remove('read-here');
  const r = cur.getBoundingClientRect();
  const span = Math.max(1, r.height - window.innerHeight + head);
  bar.style.width = Math.max(0, Math.min(100, ((head - r.top) / span) * 100)) + '%';
  if (document.documentElement.scrollHeight - (window.scrollY + window.innerHeight) < 1400) appendNext();
}, { passive: true });

function setViParagraph(ch, i, text) {
  const vi = paragraphs(ch.content_vi);
  vi[i] = text;
  ch.content_vi = vi.join('\n');
}

function viTarget(el) {
  return el.matches('p') ? el : $('p.vi', el);
}

function toggleSource(ch, el, i) {
  const next = el.previousElementSibling;
  if (next?.classList.contains('src-peek')) return next.remove();
  const src = paragraphs(ch.content_src)[i] || '';
  el.insertAdjacentHTML('beforebegin', `<p class="src src-peek" data-src>${esc(src)}</p>`);
}

function editParagraph(ch, el, i) {
  const p = viTarget(el);
  const old = paragraphs(ch.content_vi)[i] || '';
  el.classList.add('editing');
  $$('.para-tools').forEach((t) => { t.hidden = true; });
  p.innerHTML = `<textarea class="para-edit" rows="2"></textarea>
    <span class="para-edit-bar"><span class="muted small">${touchUI() ? 'Bấm Lưu để lưu' : 'Enter lưu · Esc huỷ'}</span><span class="spacer"></span>
    <button class="btn sm" data-pe="cancel">Huỷ</button><button class="btn sm primary" data-pe="save">Lưu</button></span>`;
  const ta = $('textarea', p);
  ta.value = old;
  const fit = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
  ta.oninput = fit; fit(); ta.focus();
  const cancel = () => redrawKeepingScroll();
  const commit = guard(async () => {
    const text = ta.value.trim();
    if (text === old) return cancel();
    const r = await api(`/api/chapters/${ch.id}/paragraphs/${i}`, { method: 'PUT', body: { text } });
    setViParagraph(ch, i, r.text);
    redrawKeepingScroll();
    undoToast('Đã lưu đoạn', ch, i, r.previous);
  });
  ta.onkeydown = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
  };
  p.onclick = (e) => {
    e.stopPropagation();
    const b = e.target.closest('[data-pe]');
    if (b?.dataset.pe === 'save') commit();
    if (b?.dataset.pe === 'cancel') cancel();
  };
}

async function retranslateParagraph(ch, el, i) {
  const engine = store('engine_' + readerState.book.source_lang, 'auto');
  const url = `/api/chapters/${ch.id}/paragraphs/${i}/translate`;
  el.classList.add('busy');
  try {
    let r;
    try {
      r = await api(url, { method: 'POST', body: { engine } });
    } catch (e) {
      if (e.status !== 409 || e.data?.error !== 'needs_consent') throw e;
      if (!await askConsent(e.data.engine)) return;
      r = await api(url, { method: 'POST', body: { engine, allow_external: true } });
    }
    if (!loadedChapter(ch.id)) return;
    setViParagraph(ch, i, r.text);
    redrawKeepingScroll();
    if (r.text === r.previous) toast('Dịch lại ra y như cũ');
    else undoToast(`Đã dịch lại bằng ${state.engines?.[r.engine]?.label || r.engine}`, ch, i, r.previous);
  } finally {
    el.classList.remove('busy');
  }
}

function undoToast(msg, ch, i, previous) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${esc(msg)} <button class="btn sm ghost">Hoàn tác</button>`;
  $('button', el).onclick = guard(async () => {
    el.remove();
    const r = await api(`/api/chapters/${ch.id}/paragraphs/${i}`, { method: 'PUT', body: { text: previous } });
    if (!loadedChapter(ch.id)) return;
    setViParagraph(ch, i, r.text);
    redrawKeepingScroll();
    toast('Đã hoàn tác');
  });
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 7000);
}

/* ---------- name popover ---------- */

function closeNamePop() { $('#name-pop')?.remove(); }

/** Show what a library-wide rename would touch. Resolves 'all', 'book' or null (cancel). */
function confirmLibraryReplace(oldVi, vi, preview, bookId) {
  const here = preview.books.find((x) => x.id === bookId);
  return new Promise((resolve) => {
    let answer = null;
    modal({
      title: 'Thay tên trong mọi sách',
      body: `<div class="stack">
        <p>Đổi “<b>${esc(oldVi)}</b>” thành “<b>${esc(vi)}</b>” ở <b>${preview.count}</b> chỗ, ${preview.chapters} chương, ${preview.books.length} sách:</p>
        <div class="drive-list">${preview.books.map((x) => `<div class="drive-row"><span class="name">${esc(x.title)}${x.id === bookId ? ' <span class="muted small">(sách đang đọc)</span>' : ''}</span><span class="muted small">${x.count} chỗ · ${x.chapters} chương</span></div>`).join('')}</div>
        ${preview.skipped.length ? `<p class="muted small">Bỏ qua vì sách tự đặt tên riêng cho chữ gốc này (danh sách tên của sách được ưu tiên hơn tên chung): ${preview.skipped.map((x) => esc(x.title)).join(', ')}.</p>` : ''}
        <p class="muted small">Chỉ thay chữ trong bản dịch, không dịch lại, không gửi gì ra ngoài. Không có nút hoàn tác: muốn trả lại thì đổi ngược tên mới về tên cũ, và cách đó chỉ đúng khi tên mới chưa có sẵn trong truyện.</p>
      </div>`,
      actions: [
        { label: 'Huỷ' },
        ...(here ? [{ label: 'Chỉ sách này', onClick: () => { answer = 'book'; } }] : []),
        { label: `Thay ở ${preview.books.length} sách`, primary: true, onClick: () => { answer = 'all'; } },
      ],
      onClose: () => resolve(answer),
    });
  });
}

async function namePopover(mark) {
  closeNamePop();
  const b = readerState.book;
  const ch = sectionOf(mark) || readerState.chapter;
  const oldVi = mark.dataset.vi;
  const entries = readerState.names?.byVi.get(oldVi) || [];
  if (!entries.length) return;
  const n = entries[0];
  const r = mark.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.id = 'name-pop';
  pop.className = 'popover name-pop';
  pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
  pop.style.left = Math.max(8, Math.min(r.left + window.scrollX, window.innerWidth - 320)) + 'px';
  pop.innerHTML = `
    <div class="np-head"><span class="np-src">${esc(n.src)}</span><span class="muted small" id="np-hv">…</span></div>
    ${entries.length > 1 ? `<p class="warn small">${entries.length} chữ gốc cùng dịch thành “${esc(oldVi)}”: ${entries.map((x) => esc(x.src)).join(', ')}. Thay trong bản dịch sẽ đổi cả ${entries.length}.</p>` : ''}
    <input type="text" id="np-vi" value="${esc(oldVi)}">
    <div class="np-row"><select id="np-scope"><option value="${b.id}"${n.scope === 'book' ? ' selected' : ''}>Chỉ sách này</option><option value="global"${n.scope === 'global' ? ' selected' : ''}>Mọi sách</option></select>
    <select id="np-replace"><option value="book" title="Đổi tên cũ thành tên mới trong bản dịch của mọi chương">Thay cả sách</option><option value="chapter">Thay chương này</option><option value="all" title="Xem trước số chỗ ở từng sách rồi mới thay">Thay mọi sách…</option><option value="none" title="Chỉ áp dụng cho lần dịch sau">Không thay</option></select></div>
    <div class="np-row"><span class="muted small">Enter lưu · Esc đóng</span><span class="spacer"></span><button class="btn sm" data-np="close">Đóng</button><button class="btn sm primary" data-np="save">Lưu</button></div>`;
  document.body.appendChild(pop);
  const input = $('#np-vi', pop);
  input.focus(); input.select();
  api('/api/hanviet?text=' + encodeURIComponent(n.src)).then((h) => {
    const el = $('#np-hv', pop);
    if (el) el.textContent = h.ready ? `Hán Việt: ${h.text}` : 'Chưa nạp từ điển Hán Việt';
  }).catch(() => {});

  const saveIt = guard(async () => {
    const vi = input.value.trim();
    if (!vi) { toast('Tên dịch không được để trống', true); return; }
    const scope = $('#np-scope', pop).value;
    const replace = $('#np-replace', pop).value;
    if (vi === oldVi && scope === (n.scope === 'book' ? String(b.id) : 'global')) return closeNamePop();
    // library-wide: count first, ask, and only then save the name and write
    let where = replace;
    if (replace === 'all' && vi !== oldVi) {
      const preview = await api('/api/replace-name', { method: 'POST', body: { old: oldVi, new: vi, src: n.src, dry_run: true } });
      where = preview.count ? await confirmLibraryReplace(oldVi, vi, preview, b.id) : 'none';
      if (!where) return;
    }
    await api('/api/names/add', { method: 'POST', body: { src: n.src, vi, book_id: scope } });
    let msg = `Đã lưu ${n.src} = ${vi}`;
    if (where === 'all') {
      const res = await api('/api/replace-name', { method: 'POST', body: { old: oldVi, new: vi, src: n.src, dry_run: false } });
      msg += ` · thay ${res.count} chỗ trong ${res.chapters} chương của ${res.books.length} sách`;
    } else if (where !== 'none' && vi !== oldVi) {
      const res = await api(`/api/books/${b.id}/replace-name`, {
        method: 'POST', body: { old: oldVi, new: vi, chapter_id: where === 'chapter' ? ch.id : null },
      });
      msg += ` · thay ${res.count} chỗ trong ${res.chapters} chương`;
    }
    closeNamePop();
    toast(msg);
    await refreshLoaded();
  });
  pop.onkeydown = (e) => {
    if (e.key === 'Escape') closeNamePop();
    if (e.key === 'Enter' && e.target === input) saveIt();
  };
  pop.onclick = (e) => {
    const a = e.target.closest('[data-np]');
    if (a?.dataset.np === 'close') closeNamePop();
    if (a?.dataset.np === 'save') saveIt();
  };
}

document.addEventListener('mousedown', (e) => {
  if (!e.target.closest('#name-pop') && !e.target.closest('mark.name')) closeNamePop();
});

/* selection → add a name */
function showSelPop() {
  $('.sel-pop')?.remove();
  if (currentView !== 'read' || readerState.editing) return;
  const sel = window.getSelection();
  const text = sel?.toString().trim();
  if (!text || text.length > 80 || !sel.rangeCount) return;
  const node = sel.anchorNode?.parentElement;
  if (!node?.closest('.reader')) return;
  // a selection inside ONE translated paragraph can have its meaning changed
  const viPara = (n) => (n?.nodeType === 3 ? n.parentElement : n)?.closest?.('p.vi');
  const pv = viPara(sel.anchorNode);
  const sec = pv && pv === viPara(sel.focusNode) ? pv.closest('article.ch-sec') : null;
  const sense = sec && !/[\n]/.test(sel.toString().trim()) ? { text, para: +pv.closest('[data-p]').dataset.p, cid: +sec.dataset.cid } : null;
  if (text.length > 40 && !sense) return;
  const rect = sel.getRangeAt(0).getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'sel-pop';
  // on touch the system copy/paste bar sits above the selection, so go below it
  pop.style.top = (touchUI() ? rect.bottom + window.scrollY + 10 : rect.top + window.scrollY - 40) + 'px';
  pop.style.left = (rect.left + window.scrollX) + 'px';
  pop.innerHTML = `${text.length <= 40 ? '<button class="btn sm primary" data-sp="name">＋ Thêm tên riêng</button>' : ''}${sense ? ' <button class="btn sm" data-sp="sense">✎ Đổi nghĩa…</button>' : ''}`;
  pop.onclick = (e) => {
    const b = e.target.closest('[data-sp]');
    if (!b) return;
    pop.remove();
    if (b.dataset.sp === 'name') addNameDialog(text); else senseDialog(sense);
  };
  document.body.appendChild(pop);
}

document.addEventListener('mouseup', (e) => {
  if (e.target.closest('.sel-pop')) return;
  setTimeout(showSelPop, 10);
});

let selTimer = null;
document.addEventListener('selectionchange', () => {
  if (!touchUI() || currentView !== 'read') return;
  clearTimeout(selTimer);
  selTimer = setTimeout(showSelPop, 450);   // wait until the handles stop moving
});

function addNameDialog(text) {
  const b = readerState.book;
  modal({
    title: 'Thêm tên riêng',
    body: `<div class="stack">
      <label class="field">Chữ gốc<input type="text" id="n-src" value="${esc(text)}"></label>
      <label class="field">Dịch thành<input type="text" id="n-vi" placeholder="Ví dụ: Lâm Phong"></label>
      <label class="field">Phạm vi<select id="n-scope"><option value="${b.id}">Chỉ sách này</option><option value="global">Mọi sách</option></select></label>
      <p class="muted small">Tên chỉ có tác dụng khi bạn bôi đen chữ <b>gốc</b> (chế độ Gốc / Song ngữ). Sau khi thêm, dịch lại chương để áp dụng.</p></div>`,
    actions: [{ label: 'Huỷ' }, {
      label: 'Thêm & dịch lại chương', onClick: async (bd) => {
        if (!await submitName(bd)) return false;
        await startJob({ book_id: b.id, chapter_ids: [readerState.chapter.id], overwrite: true, include_meta: false });
      },
    }, { label: 'Thêm', primary: true, onClick: submitName }],
  });
  setTimeout(() => $('#n-vi')?.focus(), 50);
}

/* ---------- "đổi nghĩa": replace a word of the translation by one Aurel types, with a scope (rules: app/senses.py) ---------- */

const SENSE_SCOPES = { para: 'Chỉ đoạn này', chapter: 'Cả chương', book: 'Cả sách', all: 'Mọi sách' };

function senseDialog(x) {
  const ch = loadedChapter(x.cid);
  if (!ch) return;
  // the word on screen may be the OUTCOME of an earlier rule; rules work on the saved text, so offer the word it came from
  const hit = (ch.sense_hits || []).find((h) => h.to && h.to.toLowerCase() === x.text.toLowerCase());
  const from = hit ? hit.frm : x.text;
  const word = /^[\p{L}\p{N}_ ]+$/u.test(from);
  const m = modal({
    title: 'Đổi nghĩa trong bản dịch',
    body: `<div class="stack">
      <p class="muted small">Chỉ đổi cách hiển thị và file xuất; bản dịch đã lưu không bị sửa. Đang đọc ở đâu vẫn ở đó.</p>
      ${hit ? `<p class="small warn">“${esc(x.text)}” đang hiện do quy tắc “${esc(hit.frm)}” → “${esc(hit.to)}”. Quy tắc mới sẽ đặt cho từ gốc “${esc(hit.frm)}” và được ưu tiên nếu phạm vi hẹp hơn.</p>` : ''}
      <label class="field">Từ trong bản dịch<input type="text" id="sn-from" value="${esc(from)}"></label>
      <label class="field">Đổi thành<input type="text" id="sn-to" placeholder="nghĩa đúng (để trống = xoá từ)"></label>
      <div class="row"><b>Phạm vi</b>${Object.entries(SENSE_SCOPES).map(([k, l]) => `<label class="check"><input type="radio" name="sn-scope" value="${k}"${k === 'para' ? ' checked' : ''}> ${l}</label>`).join('')}</div>
      <p class="muted small" style="margin:-4px 0 0">Từ nhiều nghĩa: chọn cả cụm thay vì một từ, và để phạm vi hẹp.</p>
      <div class="row"><label class="check"><input type="checkbox" id="sn-whole"${word ? ' checked' : ''}> Nguyên từ (không đổi “giống” trong “giống loài”)</label>
        <label class="check"><input type="checkbox" id="sn-nocase"> Không phân biệt hoa thường</label></div>
      <div><b>Xem trước</b> <span class="muted small" id="sn-count"></span></div>
      <div class="sense-prev" id="sn-prev"></div>
      <p class="field-err" id="sn-err" role="alert"></p></div>`,
    actions: [{ label: 'Huỷ' }, {
      label: 'Áp dụng', primary: true, onClick: async (bd) => {
        const skip = $$('[data-r]', bd).filter((c) => !c.checked).map((c) => +c.dataset.r);
        try {
          const { id } = await api('/api/senses', { method: 'POST', body: senseBody(bd, { exclude: skip }) });
          const n = state.count - skip.reduce((s, cid) => s + (state.rows.find((r) => r.chapter_id === cid)?.count || 0), 0);
          await refreshLoaded();
          senseUndoToast(`Đã đổi nghĩa · ${n} chỗ`, id);
          return true;
        } catch (e) { $('#sn-err', bd).textContent = e.message; return false; }
      },
    }],
  });
  const bd = m.el;
  const state = { rows: [], count: 0 };
  const senseBody = (el, extra = {}) => ({
    chapter_id: x.cid, para: x.para, frm: $('#sn-from', el).value, to: $('#sn-to', el).value,
    scope: $('input[name=sn-scope]:checked', el).value, whole: $('#sn-whole', el).checked, nocase: $('#sn-nocase', el).checked, ...extra,
  });
  let seq = 0, timer;
  const preview = async () => {
    const mine = ++seq;
    let r;
    try { r = await api('/api/senses/preview', { method: 'POST', body: senseBody(bd) }); $('#sn-err', bd).textContent = ''; }
    catch (e) { r = { rows: [], count: 0, chapters: 0 }; $('#sn-err', bd).textContent = e.message; }
    if (mine !== seq) return;   // a newer preview is on its way
    state.rows = r.rows; state.count = r.count;
    const multi = ['book', 'all'].includes($('input[name=sn-scope]:checked', bd).value);
    $('#sn-count', bd).textContent = `sẽ đổi ${r.count} chỗ trong ${r.chapters} chương${r.chapters > r.rows.length ? ` (liệt kê ${r.rows.length} chương đầu)` : ''}`;
    $('#sn-prev', bd).innerHTML = r.rows.map((row) => `<div class="sp-row">${multi ? `<label class="check"><input type="checkbox" data-r="${row.chapter_id}" checked aria-label="Đổi ở chương này"></label>` : ''}
      <div><b>${esc(row.book)} · ${esc(row.title)}</b> <span class="muted small">×${row.count}</span><br><span class="muted small">${esc(row.before)}</span><br>→ <span class="small">${esc(row.after)}</span></div></div>`).join('')
      || '<span class="muted small">Chưa có chỗ nào khớp trong bản dịch đã lưu (quy tắc vẫn lưu được cho lần dịch sau).</span>';
  };
  const later = () => { clearTimeout(timer); timer = setTimeout(guard(preview), 250); };
  $$('input', bd).forEach((i) => { i.oninput = later; i.onchange = later; });
  setTimeout(() => $('#sn-to', bd)?.focus(), 50);
  preview();
}

/** Toast with an undo: the rule is deleted, nothing was ever rewritten. */
function senseUndoToast(msg, ruleId) {
  const el = document.createElement('div');
  el.className = 'toast t-ok';
  el.innerHTML = `<span class="t-ico" aria-hidden="true">✓</span><span class="t-msg">${esc(msg)}</span> <button class="btn sm ghost">Hoàn tác</button>`;
  $('button', el).onclick = guard(async () => {
    el.remove();
    await api(`/api/senses/${ruleId}`, { method: 'DELETE' });
    if (currentView === 'read') await refreshLoaded();
    toast('Đã hoàn tác');
  });
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 10000);
}

async function submitName(bd) {
  const src = $('#n-src', bd).value.trim();
  const vi = $('#n-vi', bd).value.trim();
  if (!src || !vi) { toast('Cần cả chữ gốc và tên dịch', true); return false; }
  await api('/api/names/add', { method: 'POST', body: { src, vi, book_id: $('#n-scope', bd).value } });
  toast(`Đã thêm ${src} = ${vi}`);
  if (readerState.book) loadNames(readerState.book.id).then(() => currentView === 'read' && !readerState.editing && redrawKeepingScroll()).catch(() => {});
  return true;
}

/* editor */
let editorSnapshot = null;

function drawEditor(body) {
  const ch = readerState.chapter;
  editorSnapshot = { title: ch.title, title_vi: ch.title_vi, content_src: ch.content_src, content_vi: ch.content_vi };
  body.innerHTML = `<div class="editor">
    <div class="col">
      <label class="field">Tên chương (gốc)<input type="text" id="e-title" value="${esc(ch.title)}"></label>
      <div class="col-head"><span>Bản gốc</span><span id="e-src-count"></span></div>
      <textarea id="e-src" spellcheck="false">${esc(ch.content_src)}</textarea>
    </div>
    <div class="col">
      <label class="field">Tên chương (dịch)<input type="text" id="e-title-vi" value="${esc(ch.title_vi)}"></label>
      <div class="col-head"><span>Bản dịch</span><span id="e-vi-count"></span></div>
      <textarea id="e-vi" spellcheck="false">${esc(ch.content_vi)}</textarea>
    </div>
    <div class="row" style="grid-column:1/-1">
      <button class="btn primary" id="e-save">Lưu (Ctrl+S)</button>
      <button class="btn" id="e-split" title="Tách chương tại dòng đang đặt con trỏ (ở cột gốc hoặc cột dịch)">Tách chương tại con trỏ</button>
      <button class="btn" id="e-merge" ${ch.next_id ? '' : 'disabled'}>Gộp với chương sau</button>
      <button class="btn" id="e-add-after">Chèn chương mới sau</button>
      <span class="spacer"></span>
      <span class="muted small">Mỗi dòng là một đoạn. Giữ số dòng hai bên bằng nhau để song ngữ khớp.</span>
    </div>
  </div>`;
  const src = $('#e-src'), vi = $('#e-vi');
  let lastFocus = src;
  const count = () => {
    const a = src.value.split('\n').filter((l) => l.trim()).length;
    const c = vi.value.split('\n').filter((l) => l.trim()).length;
    $('#e-src-count').textContent = `${a} đoạn`;
    $('#e-vi-count').innerHTML = c && c !== a ? `<span class="warn">${c} đoạn (lệch ${c - a > 0 ? '+' : ''}${c - a})</span>` : `${c} đoạn`;
  };
  count();
  src.oninput = vi.oninput = count;
  src.onfocus = () => lastFocus = src;
  vi.onfocus = () => lastFocus = vi;
  let syncing = false;
  const sync = (from, to) => () => {
    if (syncing) return;
    syncing = true;
    const ratio = from.scrollTop / Math.max(1, from.scrollHeight - from.clientHeight);
    to.scrollTop = ratio * (to.scrollHeight - to.clientHeight);
    requestAnimationFrame(() => syncing = false);
  };
  src.onscroll = sync(src, vi);
  vi.onscroll = sync(vi, src);

  $('#e-save').onclick = guard(async () => { await saveEditor(); toast('Đã lưu'); });
  $('#e-split').onclick = guard(async () => {
    const ta = lastFocus;
    const before = ta.value.slice(0, ta.selectionStart).split('\n');
    // paragraph index = non-empty lines before the caret (server normalises blank lines away)
    const line = before.slice(0, -1).filter((l) => l.trim()).length;
    if (editorDirty()) await saveEditor();
    const title = await promptBox('Tách chương', `Tách từ đoạn thứ ${line + 1}. Tên chương mới:`, `${ch.title} (tiếp)`);
    if (title == null) return;
    const r = await api(`/api/chapters/${ch.id}/split`, { method: 'POST', body: { line, title } });
    toast('Đã tách chương');
    readerState.book = null;
    loadChapter(r.new_id);
  });
  $('#e-merge').onclick = guard(async () => {
    if (!await confirmBox('Gộp chương', 'Gộp chương sau vào cuối chương này?', 'Gộp')) return;
    if (editorDirty()) await saveEditor();
    await api(`/api/chapters/${ch.id}/merge-next`, { method: 'POST' });
    readerState.book = null;
    loadChapter(ch.id, true);
  });
  $('#e-add-after').onclick = guard(async () => {
    const title = await promptBox('Chèn chương', 'Tên chương mới', 'Chương mới');
    if (title == null) return;
    if (editorDirty()) await saveEditor();
    const r = await api(`/api/books/${ch.book_id}/chapters`, { method: 'POST', body: { title, after_idx: ch.idx } });
    readerState.book = null;
    loadChapter(r.id);
  });
}

function editorValues() {
  return {
    title: $('#e-title')?.value ?? '', title_vi: $('#e-title-vi')?.value ?? '',
    content_src: $('#e-src')?.value ?? '', content_vi: $('#e-vi')?.value ?? '',
  };
}

function editorDirty() {
  if (readerState.writing) return deskDirty();
  if (!editorSnapshot || !$('#e-src')) return false;
  const v = editorValues();
  return Object.keys(v).some((k) => v[k] !== editorSnapshot[k]);
}

async function saveEditor() {
  if (readerState.writing) return deskSave();
  const ch = await api(`/api/chapters/${readerState.chapter.id}`, { method: 'PATCH', body: editorValues() });
  readerState.chapter = ch;
  editorSnapshot = { title: ch.title, title_vi: ch.title_vi, content_src: ch.content_src, content_vi: ch.content_vi };
  $('#e-src').value = ch.content_src;
  $('#e-vi').value = ch.content_vi;
  $('#e-src').dispatchEvent(new Event('input'));
}

document.addEventListener('keydown', (e) => {
  if (currentView !== 'read') return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && readerState.editing) {
    e.preventDefault(); $('#e-save')?.click(); return;
  }
  if (readerState.editing || e.target.matches('input,textarea,select') || $('.modal-back')) return;
  if (e.key === 'Escape' && !$('#name-pop')) return closeDrawer();
  if (e.key === ' ' && e.altKey && typeof ttsPlay === 'function') { e.preventDefault(); tts.reading && !tts.paused ? ttsPause() : ttsPlay(); }
  if (e.key === 'ArrowLeft' && readerState.chapter?.prev_id) loadChapter(readerState.chapter.prev_id);
  if (e.key === 'ArrowRight' && readerState.chapter?.next_id) loadChapter(readerState.chapter.next_id);
});

window.addEventListener('beforeunload', (e) => {
  if (currentView === 'read' && readerState.editing && editorDirty()) { e.preventDefault(); e.returnValue = ''; }
});

/* ================= vault (read only) ================= */

const vaultSel = new Set();
let vaultInto = null;   // {id, after, skip} while adding chapters into an existing book
let vaultLink = null;   // book id while picking which vault notes it came from

async function renderVault(query) {
  const path = query.get('path') || '';
  if (query.get('into')) {
    vaultInto = { id: +query.get('into'), after: query.get('after'), skip: query.get('skip') !== '0' };
    history.replaceState(null, '', '#/vault');   // the target lives in memory; folder links stay plain
  }
  if (query.get('link')) {
    vaultLink = +query.get('link');
    vaultSel.clear();
    history.replaceState(null, '', '#/vault');
  }
  const info = await api('/api/vault/info');
  if (!info.root) {
    main.innerHTML = `<div class="page-head"><h1>Mở từ vault</h1></div>
      <div class="empty"><h2>Chưa tìm thấy vault</h2><p>${esc(info.error || '')}</p><a class="btn primary" href="#/settings">Mở Cài đặt</a></div>`;
    return;
  }
  const [data, allBooks] = await Promise.all([api('/api/vault/list?path=' + encodeURIComponent(path)), api('/api/books')]);
  if (currentView !== 'vault') return;
  if (!path) vaultSel.clear();
  const crumbs = path ? path.split('/') : [];
  const shelves = state.side?.shelves || [];
  const badge = (m) => [
    m.type && `<span class="chip">${esc(m.type)}</span>`,
    m.status && `<span class="chip" style="${m.status === 'draft' ? 'background:hsl(40 70% 50% / .18)' : ''}">${esc(m.status)}</span>`,
    m.language && `<span class="chip">${esc(m.language)}</span>`,
    m.canon_layer === 'planned' && '<span class="chip" title="canon_layer: planned — chưa xảy ra trong truyện">planned</span>',
    m.immutable === 'true' && '<span class="chip" title="sources/ bất biến">bất biến</span>',
  ].filter(Boolean).join(' ');

  const step = !path ? 1 : vaultSel.size ? 3 : 2;
  const fileName = (rel) => rel.split('/').pop();
  const projLabel = (name) => { const m = name.match(/^([A-Z0-9]{2,6})_(.+)$/); return m ? `<b>${esc(m[1])}</b> <span class="muted">${esc(m[2])}</span>` : esc(name); };
  main.innerHTML = `
    <div class="page-head">
      <h1>Mở từ vault</h1>
      <span class="path-pill" title="${esc((info.projects_roots || [info.projects_root]).join('\n'))}">${esc((info.projects_roots || [info.projects_root]).join(' · '))}</span>
    </div>
    <div class="info-banner">ⓘ <span><b>Chỉ đọc.</b> App chép nội dung vào thư viện; sửa hay dịch ở đây <b>không ghi ngược</b> vào vault. Chương muốn chốt vẫn đi qua gate của vault.</span></div>
    <ol class="steps">${['Chọn dự án', 'Tick file .md / .txt', 'Cấu hình &amp; nhập'].map((t, i) => `<li class="${i + 1 === step ? 'on' : i + 1 < step ? 'done' : ''}"><span>${i + 1}</span>${t}</li>`).join('')}</ol>
    <div class="vault-layout">
      <section class="card vault-browse">
        <header class="vb-head"><h3>${crumbs.length ? projLabel(crumbs[0]) : 'Projects'}</h3><span class="muted small">${data.entries.length} mục</span></header>
        <div class="crumbs"><a href="#/vault">Projects</a>${crumbs.map((c, i) => ` / <a href="#/vault?path=${encodeURIComponent(crumbs.slice(0, i + 1).join('/'))}">${esc(c)}</a>`).join('')}</div>
        <label class="search-box">${icon('search')}<input type="search" id="v-filter" placeholder="Lọc theo tên…"></label>
        <div class="vault-list">
        ${data.parent !== null ? `<a class="v-row" href="#/vault?path=${encodeURIComponent(data.parent)}"><span class="v-ico">↰</span><span>Lên một cấp</span></a>` : ''}
        ${data.entries.map((e) => e.is_dir ? `
          <a class="v-row" data-name="${esc(e.name.toLowerCase())}" href="#/vault?path=${encodeURIComponent(e.rel)}"><span class="v-ico">${icon('folder')}</span><span class="v-name v-inline">${path ? esc(e.name) : projLabel(e.name)}</span><span class="v-go">›</span></a>` : `
          <div class="v-row v-file${vaultSel.has(e.rel) ? ' on' : ''}" data-rel="${esc(e.rel)}" data-name="${esc(e.name.toLowerCase())}">
            <input type="checkbox" class="vsel" value="${esc(e.rel)}"${vaultSel.has(e.rel) ? ' checked' : ''}>
            <span class="v-name"><a href="#" data-preview="${esc(e.rel)}">${esc(e.name)}</a>${e.meta?.title ? `<small>${esc(e.meta.title)}</small>` : ''}
              ${e.meta?.asset ? `<span class="small v-asset">
                ${e.meta.asset.exists && e.meta.asset.importable
                  ? `<button class="btn sm primary" data-asset="${esc(e.rel)}">Nhập file gốc trong kho (${esc(e.meta.asset.format || e.meta.asset.path_rel.split('.').pop())}${e.meta.asset.bytes ? ', ' + fmtSize(+e.meta.asset.bytes) : ''})</button>`
                  : `<span class="warn" title="${esc(e.meta.asset.resolved || '')}">File gốc: ${esc(e.meta.asset.error || (e.meta.asset.exists ? 'định dạng chưa hỗ trợ' : 'không thấy trong kho'))}</span>`}
                <span class="muted" title="${esc(e.meta.asset.resolved || '')}">${esc(e.meta.asset.store)}</span></span>` : ''}</span>
            <span class="v-badges">${badge(e.meta || {})}</span>
            <span class="muted small">${fmtSize(e.size)}</span>
          </div>`).join('') || '<p class="muted" style="padding:12px">Thư mục trống</p>'}
        </div>
      </section>

      <aside class="card vault-config" id="vault-actions">
        <div class="row"><b id="vsel-count"></b><span class="spacer"></span><button class="btn sm ghost" id="vsel-clear">Bỏ chọn</button></div>
        <div class="vsel-list" id="vsel-list"></div>
        <label class="field">Nhập vào<select id="v-into">
          <option value="">Tạo sách mới</option>
          ${allBooks.map((bk) => `<option value="${bk.id}"${vaultInto?.id === bk.id ? ' selected' : ''}>Thêm vào: ${esc(bk.title_vi || bk.title)} (${bk.chapter_count} chương)</option>`).join('')}</select></label>
        <label class="check v-append"><input type="checkbox" id="v-skip"${vaultInto?.skip === false ? '' : ' checked'}> Bỏ qua chương trùng tên</label>
        <span class="muted small v-append" id="v-pos"></span>
        <label class="field v-new">Tên sách<input type="text" id="v-title" placeholder="Để trống = tự đặt theo project"></label>
        <div class="set-cols">
          <label class="field">Cách chia chương<select id="v-mode">
            <option value="file">Mỗi file là một chương</option>
            <option value="heading">Tách theo tiêu đề # / ##</option>
            <option value="pattern">Tách theo regex chương</option></select></label>
          <label class="field v-new">Ngôn ngữ<select id="v-lang"><option value="">Theo frontmatter / tự nhận</option>${Object.entries(LANGS).map(([k, v]) => `<option value="${k}">Tiếng ${v}</option>`).join('')}</select></label>
          <label class="field v-new">Tủ sách<select id="v-shelf"><option value="">Chưa xếp tủ</option>${shelves.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>
        </div>
        ${vaultLink ? `<div class="warn-box"><b>Gắn nguồn</b><span class="small">Chọn các file vault mà sách này được nhập từ đó. App chỉ ghi nhớ đường dẫn để kiểm tra chương mới sau này, không nhập gì thêm ngay bây giờ.</span>
          <button class="btn sm ghost" id="v-link-cancel">Thôi, không gắn</button></div>` : `<div class="warn-box"><b>Nội dung vault cần xác nhận</b><span class="small">trước khi dịch bằng engine server. Sách mới tự gắn tag <code>vault</code> và mã project; nhiều file xếp theo tên (ch2 trước ch10).</span></div>`}
        <button class="btn primary v-import" id="v-import">Nhập thành một cuốn sách</button>
      </aside>
    </div>`;
  $('#v-filter').oninput = (e) => {
    const q = e.target.value.trim().toLowerCase();
    $$('.vault-list [data-name]').forEach((r) => { r.hidden = q && !r.dataset.name.includes(q); });
  };
  const targetBody = () => {
    const id = $('#v-into').value;
    if (!id) return {};
    const after = vaultInto?.id === +id && vaultInto.after != null && vaultInto.after !== '' ? +vaultInto.after : null;
    return { into: +id, skip_dupes: $('#v-skip').checked, after_idx: after };
  };
  const refreshTarget = () => {
    const t = targetBody();
    $$('.v-new').forEach((el) => el.hidden = !!t.into);
    $$('.v-append').forEach((el) => el.hidden = !t.into);
    $('#v-pos').textContent = t.into ? (t.after_idx != null ? `Chèn sau chương ${t.after_idx + 1}` : 'Chèn vào cuối sách') : '';
    const n = vaultSel.size;
    $('#v-import').textContent = vaultLink ? 'Gắn làm nguồn của sách' : (t.into ? `Thêm ${n || ''} file vào sách đã chọn` : `Nhập ${n || ''} file thành một cuốn sách`).replace('  ', ' ');
    vaultInto = t.into ? { id: t.into, after: t.after_idx, skip: t.skip_dupes } : null;
  };
  $('#v-into').onchange = refreshTarget;
  $('#v-skip').onchange = refreshTarget;
  refreshTarget();

  const refreshCount = () => {
    const n = vaultSel.size;
    $('#vsel-count').textContent = n ? `Đã chọn ${n} file` : 'Chưa chọn file nào';
    $('#vsel-list').innerHTML = n ? [...vaultSel].map((r) => `<div class="vsel-item" title="${esc(r)}">${icon('toc')}<span>${esc(fileName(r))}</span><button class="icon-btn" data-unsel="${esc(r)}" aria-label="Bỏ chọn">✕</button></div>`).join('')
      : '<p class="muted small">Tích file .md / .txt ở danh sách bên trái — chọn được qua nhiều thư mục.</p>';
    $('#v-import').disabled = !n;
    $('#vsel-clear').hidden = !n;
    $$('.v-file').forEach((r) => r.classList.toggle('on', vaultSel.has(r.dataset.rel)));
    const st = !path ? 1 : n ? 3 : 2;
    $$('.steps li').forEach((li, i) => { li.classList.toggle('on', i + 1 === st); li.classList.toggle('done', i + 1 < st); });
    refreshTarget();
  };
  $('#vsel-list').onclick = (e) => {
    const x = e.target.closest('[data-unsel]');
    if (!x) return;
    vaultSel.delete(x.dataset.unsel);
    const cb = $(`.vsel[value="${CSS.escape(x.dataset.unsel)}"]`);
    if (cb) cb.checked = false;
    refreshCount();
  };
  refreshCount();
  $$('.vsel').forEach((c) => c.onchange = () => { c.checked ? vaultSel.add(c.value) : vaultSel.delete(c.value); refreshCount(); });
  $('#vsel-clear').onclick = () => { vaultSel.clear(); $$('.vsel').forEach((c) => c.checked = false); refreshCount(); };

  $('#v-link-cancel')?.addEventListener('click', () => { vaultLink = null; renderVault(new URLSearchParams()); });

  $('#v-import').onclick = guard(async () => {
    if (vaultLink) {
      const id = vaultLink;
      const st = await api(`/api/books/${id}/vault-link`, { method: 'POST', body: { paths: [...vaultSel], mode: $('#v-mode').value, extend: true } });
      vaultLink = null;
      vaultSel.clear();
      toast(`Đã gắn ${st.rels.length} file nguồn`);
      location.hash = `#/book/${id}`;
      return;
    }
    const b = await api('/api/vault/import', {
      method: 'POST', body: {
        paths: [...vaultSel], mode: $('#v-mode').value, title: $('#v-title').value,
        lang: $('#v-lang').value, shelf_id: $('#v-shelf').value, ...targetBody(),
      },
    });
    vaultSel.clear();
    importDone(b);
  });

  $('.vault-list').onclick = guard(async (e) => {
    const a = e.target.closest('[data-asset]');
    if (a) {
      a.disabled = true;
      toast('Đang đọc file gốc trong kho…');
      try {
        const b = await api('/api/vault/import-asset', { method: 'POST', body: { path: a.dataset.asset, shelf_id: $('#v-shelf').value, ...targetBody() } });
        importDone(b);
      } finally { a.disabled = false; }
      return;
    }
    const p = e.target.closest('[data-preview]');
    if (p) {
      e.preventDefault();
      const cb = $(`.vsel[value="${CSS.escape(p.dataset.preview)}"]`);
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change'));
    }
  });
}

/* ================= quick translate ================= */

async function renderQuick() {
  await engines();
  const books = await api('/api/books');
  const last = store('quick', { engine: 'auto', lang: 'auto', book: '', text: '' });
  main.innerHTML = `
    <div class="page-head"><div><h1>Dịch nhanh</h1><p class="muted small head-sub">Dán văn bản, dịch ngay, không lưu vào thư viện.</p></div></div>
    <div class="toolbar">
      <select id="q-lang"><option value="auto">Tự nhận → Việt</option><option value="zh">Trung → Việt</option><option value="en">Anh → Việt</option></select>
      <select id="q-engine">${engineOptions(last.engine)}</select>
      <select id="q-book"><option value="">Tên riêng: chỉ bộ chung</option>${books.map((b) => `<option value="${b.id}">Tên riêng: ${esc(b.title_vi || b.title)}</option>`).join('')}</select>
      <span class="spacer"></span>
      <button class="btn" id="q-clear">Xoá</button>
      <button class="btn primary" id="q-go">${icon('play')} Dịch (Ctrl+Enter)</button>
    </div>
    <div class="two-pane">
      <section class="pane-box"><header><span>Bản gốc</span><span id="q-len"></span></header>
        <textarea id="q-in" placeholder="Dán văn bản tiếng Trung hoặc tiếng Anh…">${esc(last.text)}</textarea></section>
      <section class="pane-box"><header><span>Bản dịch</span><span id="q-info"></span></header>
        <textarea id="q-out" placeholder="Bản dịch hiện ở đây" readonly></textarea></section>
    </div>
    <div class="row" style="margin-top:12px"><span class="muted small">Tên riêng của bộ đã chọn được giữ nguyên khi dịch.</span><span class="spacer"></span>
      <button class="btn" id="q-copy">Sao chép bản dịch</button></div>`;
  const qlen = () => { $('#q-len').textContent = `${$('#q-in').value.length.toLocaleString('vi-VN')} ký tự`; };
  qlen();
  $('#q-in').addEventListener('input', qlen);
  $('#q-clear').onclick = () => { $('#q-in').value = $('#q-out').value = ''; $('#q-info').textContent = ''; qlen(); $('#q-in').focus(); };
  $('#q-lang').value = last.lang;
  $('#q-book').value = last.book;
  const go = guard(async () => {
    const body = { text: $('#q-in').value, engine: $('#q-engine').value, source_lang: $('#q-lang').value, book_id: $('#q-book').value || null };
    save('quick', { engine: body.engine, lang: body.source_lang, book: $('#q-book').value, text: body.text.slice(0, 5000) });
    if (!body.text.trim()) return;
    $('#q-go').disabled = true;
    $('#q-info').textContent = 'Đang dịch…';
    const t0 = performance.now();
    try {
      let r;
      try {
        r = await api('/api/translate/text', { method: 'POST', body });
      } catch (e) {   // the chosen book holds vault text and the engine is a server: ask, as for the book itself
        if (e.status !== 409 || e.data?.error !== 'needs_consent') throw e;
        if (!await askConsent(e.data.engine)) return;
        r = await api('/api/translate/text', { method: 'POST', body: { ...body, allow_external: true } });
      }
      $('#q-out').value = r.text;
      $('#q-info').textContent = `${state.engines[r.engine]?.label} · tiếng ${LANGS[r.source_lang] || r.source_lang} · ${((performance.now() - t0) / 1000).toFixed(1)} giây`;
    } finally { $('#q-go').disabled = false; if ($('#q-info').textContent === 'Đang dịch…') $('#q-info').textContent = ''; }
  });
  $('#q-go').onclick = go;
  $('#q-in').onkeydown = (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) go(); };
  $('#q-copy').onclick = async () => { await navigator.clipboard.writeText($('#q-out').value); toast('Đã sao chép'); };
}

/* ================= names ================= */

/** Names text <-> rows. Comment and odd lines are kept as they are, in place, so the table never drops them. */
function parseNameLines(text) {
  return String(text || '').split('\n').filter((l, i, all) => l.trim() || i < all.length - 1).map((line) => {
    const m = !line.trim().startsWith('#') && line.match(/^([^=]+)=(.*)$/);
    return m ? { src: m[1].trim(), vi: m[2].trim() } : { raw: line };
  });
}
const nameLinesText = (rows) => rows.filter((r) => r.raw !== undefined || r.src || r.vi).map((r) => (r.raw !== undefined ? r.raw : `${r.src}=${r.vi}`)).join('\n');

async function renderNames(query) {
  const books = await api('/api/books');
  const scope = query.get('book') || 'global';
  // one small request per set, for the counts in the list
  const sets = [{ id: 'global', title: 'Bộ chung', sub: 'mọi sách' }, ...books.map((b) => ({ id: String(b.id), title: b.title_vi || b.title, sub: 'sách' }))];
  const all = await Promise.all(sets.map((x) => api('/api/names?book_id=' + encodeURIComponent(x.id)).catch(() => ({ text: '', count: 0 }))));
  if (currentView !== 'names') return;
  const data = all[sets.findIndex((x) => x.id === scope)] || all[0];
  let rows = parseNameLines(data.text);
  let mode = store('names_mode', 'table');
  main.innerHTML = `
    <div class="page-head"><div><h1>Tên riêng</h1><p class="muted small head-sub">Tên được giữ nguyên qua server dịch bằng placeholder rồi thay lại sau — cùng cách TM Translate làm.</p></div>
      <div class="row"><span class="dirty-chip" id="nm-dirty" hidden>Chưa lưu</span>
        <button class="btn" id="nm-import">${icon('upload')} Nạp từ file…</button>
        <button class="btn primary" id="nm-save">Lưu</button></div></div>
    <div class="names-layout">
      <aside class="card names-sets">
        <div class="side-head"><span>Bộ tên</span></div>
        <div class="names-set-list">${sets.map((x, i) => `<a class="names-set${x.id === scope ? ' on' : ''}" href="#/names${x.id === 'global' ? '' : '?book=' + x.id}">
          <span><b>${esc(x.title)}</b><small>${x.sub}</small></span><span class="count">${all[i].count}</span></a>`).join('')}</div>
        <div class="names-note"><b>Ưu tiên</b><p class="muted small">Tên của sách được ưu tiên hơn bộ chung. Dòng bắt đầu bằng <code>#</code> là ghi chú.</p></div>
      </aside>
      <section class="card names-main">
        <div class="toolbar">
          <select id="nm-scope"><option value="global">Bộ chung (mọi sách)</option>${books.map((b) => `<option value="${b.id}"${String(b.id) === scope ? ' selected' : ''}>${esc(b.title_vi || b.title)}</option>`).join('')}</select>
          <label class="search-box">${icon('search')}<input type="search" id="nm-q" placeholder="Tìm tên…"></label>
          <div class="seg" id="nm-mode"><button data-m="table">Bảng</button><button data-m="text">Văn bản</button></div>
        </div>
        <div id="nm-table-wrap">
          <div class="names-table"><div class="nt-head"><span>Gốc</span><span>Dịch</span><span></span></div><div id="nm-rows"></div></div>
          <button class="btn sm chip-accent-btn" id="nm-add">＋ Thêm dòng</button>
        </div>
        <textarea id="nm-text" class="names-area" spellcheck="false" placeholder="林风=Lâm Phong&#10;苏清雪=Tô Thanh Tuyết" hidden></textarea>
        <p class="muted small" id="nm-count"></p>
        <div class="names-paste">
          <b>Dán nhanh</b><span class="muted small">Mỗi dòng một cặp <code>gốc=dịch</code>, ví dụ <code>林风=Lâm Phong</code></span>
          <textarea id="nm-paste" rows="2" spellcheck="false"></textarea>
          <div class="row"><span class="spacer"></span><button class="btn" id="nm-paste-add">Thêm vào bảng</button></div>
        </div>
      </section>
    </div>`;
  const dirty = () => { $('#nm-dirty').hidden = false; };
  const countText = () => { $('#nm-count').textContent = `${rows.filter((r) => r.src && r.vi).length} tên`; };
  const drawRows = () => {
    const q = $('#nm-q').value.trim().toLowerCase();
    $('#nm-rows').innerHTML = rows.map((r, i) => (r.raw !== undefined ? '' : `
      <div class="nt-row" data-i="${i}"${q && !`${r.src} ${r.vi}`.toLowerCase().includes(q) ? ' hidden' : ''}>
        <input type="text" data-k="src" value="${esc(r.src)}" placeholder="gốc…">
        <input type="text" data-k="vi" value="${esc(r.vi)}" placeholder="dịch…">
        <button class="icon-btn" data-del title="Xoá dòng" aria-label="Xoá dòng">✕</button></div>`)).join('')
      || '<p class="muted small" style="padding:12px">Chưa có tên nào. Bấm “Thêm dòng” hoặc dán nhanh ở dưới.</p>';
    countText();
  };
  const setMode = (m) => {
    if (m === 'table' && mode === 'text') rows = parseNameLines($('#nm-text').value);
    if (m === 'text') $('#nm-text').value = nameLinesText(rows);
    mode = m; save('names_mode', m);
    $('#nm-table-wrap').hidden = m !== 'table';
    $('#nm-text').hidden = m !== 'text';
    $$('#nm-mode button').forEach((x) => x.classList.toggle('on', x.dataset.m === m));
    if (m === 'table') drawRows();
  };
  setMode(mode);
  $$('#nm-mode button').forEach((x) => x.onclick = () => setMode(x.dataset.m));
  $('#nm-q').oninput = () => (mode === 'table' ? drawRows() : null);
  $('#nm-rows').oninput = (e) => {
    const row = e.target.closest('[data-i]');
    if (row) { rows[+row.dataset.i][e.target.dataset.k] = e.target.value.trim(); dirty(); countText(); }
  };
  $('#nm-rows').onclick = (e) => {
    const row = e.target.closest('[data-del]')?.closest('[data-i]');
    if (row) { rows.splice(+row.dataset.i, 1); dirty(); drawRows(); }
  };
  $('#nm-add').onclick = () => { rows.push({ src: '', vi: '' }); drawRows(); $$('#nm-rows input[data-k=src]').pop()?.focus(); };
  $('#nm-text').oninput = dirty;
  $('#nm-paste-add').onclick = () => {
    const add = parseNameLines($('#nm-paste').value).filter((r) => r.src);
    if (!add.length) return;
    if (mode === 'text') rows = parseNameLines($('#nm-text').value);
    rows.push(...add);
    $('#nm-paste').value = '';
    dirty();
    mode === 'text' ? ($('#nm-text').value = nameLinesText(rows)) : drawRows();
    toast(`Đã thêm ${add.length} dòng — bấm Lưu để ghi`);
  };
  $('#nm-scope').onchange = (e) => { location.hash = '#/names' + (e.target.value === 'global' ? '' : '?book=' + e.target.value); };
  $('#nm-save').onclick = guard(async () => {
    const text = mode === 'text' ? $('#nm-text').value : nameLinesText(rows);
    const r = await api('/api/names', { method: 'PUT', body: { book_id: $('#nm-scope').value, text } });
    $('#nm-dirty').hidden = true;
    toast(`Đã lưu ${r.count} tên`);
    renderNames(query);
  });
  $('#nm-import').onclick = guard(async () => {
    const [f] = await pickFiles('.txt,.json', false);
    if (!f) return;
    let text = await f.text();
    if (f.name.endsWith('.json')) {
      const obj = JSON.parse(text);
      text = Object.entries(obj).map(([k, v]) => `${k}=${Array.isArray(v) ? v[0] : v}`).join('\n');
    }
    if (mode === 'text') rows = parseNameLines($('#nm-text').value);
    rows.push(...parseNameLines(text));
    mode === 'text' ? ($('#nm-text').value = nameLinesText(rows)) : drawRows();
    dirty();
    toast('Đã nạp vào bảng — bấm Lưu để ghi');
  });
}

/* ================= settings ================= */

async function renderSettings() {
  await engines();
  const s = await api('/api/settings');
  const dicts = s._dicts;
  const opt = (sel, list) => list.map(([v, l]) => `<option value="${v}"${sel === v ? ' selected' : ''}>${l}</option>`).join('');
  const engList = (lang) => Object.entries(state.engines).filter(([, v]) => v.langs.includes(lang)).map(([k, v]) => [k, v.label]);
  const group = (title, desc, body) => `<section class="set-group"><header><h3>${title}</h3>${desc ? `<span class="muted small">${desc}</span>` : ''}</header>${body}</section>`;
  const curTheme = store('app_theme', 'tokyo');
  const SECTIONS = {
    look: ['Giao diện', group('Chủ đề', 'đổi ngay, lưu trên trình duyệt này', `
        <div class="app-themes">${Object.entries(APP_THEMES).map(([k, [n, bg, card, fg, ac]]) => `
          <button class="app-theme${k === curTheme ? ' on' : ''}" data-app-theme="${k}" aria-pressed="${k === curTheme}">
            <span class="at-prev" style="background:${bg};color:${fg}"><span style="background:${card}"><b style="background:${ac}"></b><i style="background:${fg}"></i><i style="background:${fg}"></i></span></span>
            <span>${n}</span></button>`).join('')}</div>
        <p class="muted small">Màu trang đọc chọn riêng ở ngăn Hiển thị của màn Đọc.</p>`)],
    translate: ['Dịch thuật', group('Engine mặc định', 'mỗi cặp ngôn ngữ chọn một engine', `
        <div class="set-cols">
          <label class="field">Tiếng Trung → Việt<select id="s-engine-zh">${opt(s.engine_zh, engList('zh'))}</select></label>
          <label class="field">Tiếng Anh → Việt<select id="s-engine-en">${opt(s.engine_en, engList('en'))}</select></label>
        </div>
        <p class="warn small">Đã đo 13/09/2026: dichngay trả nguyên văn câu tiếng Anh, không dịch — nên tiếng Anh chỉ chọn được Google.</p>`)
      + group('DichNhanh', 'chế độ và văn phong cho trang Dịch nhanh', `
        <div class="set-cols">
          <label class="field">Chế độ<select id="s-dn-mode">${opt(s.dichnhanh_mode, [['vi', 'Việt (vi)'], ['qt', 'QuickTranslate (qt)'], ['hv', 'Hán Việt (hv)']])}</select></label>
          <label class="field">Văn phong<select id="s-dn-type">${opt(s.dichnhanh_type, [['Ancient', 'Cổ đại (Ancient)'], ['Modern', 'Hiện đại (Modern)']])}</select></label>
          <label class="check"><input type="checkbox" id="s-dn-analyze"${s.dichnhanh_analyze ? ' checked' : ''}> Phân tích tên riêng và cấu trúc câu</label>
          <label class="check"><input type="checkbox" id="s-dn-fanfic"${s.dichnhanh_fanfic ? ' checked' : ''}> Chế độ fanfic (giữ cách xưng hô, tên nhân vật)</label>
        </div>`)
      + group('Tốc độ gửi', 'tăng giãn cách nếu server báo lỗi 429 / chặn', `
        <div class="set-cols three">
          <label class="field">Giãn cách giữa các gói (mili giây)<input type="number" id="s-delay" min="0" value="${s.delay_ms}"></label>
          <label class="field">Số lần thử lại<input type="number" id="s-retry" min="0" max="10" value="${s.retry_count}"></label>
          <label class="field">Ký tự tối đa mỗi gói<input type="number" id="s-max" min="500" max="20000" value="${s.max_chars}"></label>
        </div>
        <p class="muted small">Gói lỗi sẽ tự chia đôi rồi thử lại.</p>`)],
    import: ['Nhập file', group('Nhập &amp; tách chương', 'áp dụng khi nhập .txt / .epub / .zip / .rar', `
        <div class="set-line"><span><b>Cách tách chương:</b> ${s.chapter_pattern ? 'tùy chỉnh' : 'Tự động (khuyên dùng)'}</span>
          <button class="btn sm" data-goto-sec="advanced">${s.chapter_pattern ? 'Sửa' : 'Tùy chỉnh'} trong Nâng cao</button></div>
        <label class="check"><input type="checkbox" id="s-strip"${s.strip_post_header ? ' checked' : ''}> Bỏ phần đầu bài Lofter và ghi chú tác giả khi nhập</label>
        <p class="muted small">Cắt ngày · link post · dòng kẻ · link ảnh · dòng tag ở đầu mỗi bài tải từ Lofter, dòng tiêu đề bị lặp, và các dòng ghi chú mở đầu bằng ♫ ★ ※ ● PS: ở đầu hoặc cuối chương. Chú thích 注： · 註： thì giữ. Đây chỉ là mặc định — bảng xem trước khi nhập .zip/.rar vẫn cho tắt lại từng lần.</p>`)
      + group('Đọc file .rar', 'Python không đọc được .rar, nên gọi WinRAR hoặc 7-Zip trên máy', `
        <p class="small">${s._rar.ok
          ? `<span style="color:var(--ok)">✓ Đang dùng <code>${esc(s._rar.path)}</code></span>`
          : '<span class="warn">Chưa tìm thấy công cụ nào đọc được .rar</span>'}</p>
        <label class="field">Đường dẫn UnRAR.exe / 7z.exe (để trống = tự tìm)<input type="text" id="s-rar" value="${esc(s.rar_tool)}" placeholder="C:\\Program Files\\WinRAR\\UnRAR.exe"></label>`)],
    storage: ['Lưu trữ &amp; Vault', group('Google Drive', 'app chỉ đọc/ghi bên trong các thư mục này', `
        <label class="field">Thư mục gốc được phép duyệt (mỗi dòng một thư mục)<textarea id="s-roots" rows="3">${esc((s.drive_roots || []).join('\n'))}</textarea></label>
        <p class="muted small">Google Drive for Desktop mount ở <code>G:\\My Drive</code>.</p>`)
      + group('Vault', 'chỉ đọc', `
        <label class="field">Gốc vault (để trống = tự tìm vault chứa app này)<input type="text" id="s-vault" value="${esc(s.vault_root)}" placeholder="D:\\AureLysn"></label>
        <p class="small" id="s-vault-status"></p>
        <p class="muted small">Chỉ đọc <code>05_Evasion/01_Oeuvre/Studio/Continue</code> và <code>Studio/Original</code>. File gốc của note nguồn được tìm qua <code>01_Origine/03_Systems/Config/stores.md</code>.</p>`)],
    dicts: ['Từ điển offline', group('Từ điển VietPhrase', 'dùng khi dịch không qua server', `
        <div class="dict-list">${[['name', 'Names'], ['vp', 'VietPhrase'], ['hv', 'Hán Việt']].map(([k, l]) => `
          <div class="dict-row"><b>${l}</b><span class="muted small">${dicts[k].present ? fmtSize(dicts[k].bytes) + (dicts[k].entries ? ` · ${dicts[k].entries.toLocaleString('vi-VN')} mục` : '') : 'chưa có'}</span>
          <button class="btn sm" data-dict="${k}">Nạp file…</button></div>`).join('')}</div>
        <div><button class="btn" id="s-dl-dicts">Tải bộ từ điển từ GitHub</button></div>
        <p class="muted small">Nguồn: repo <code>BaoBao666888/Novel-Downloader5</code> (cùng nguồn userscript đang dùng). Nhận file <code>.json</code> hoặc <code>.txt</code> dạng <code>中文=nghĩa1/nghĩa2</code>.</p>`)],
    advanced: ['Nâng cao', group('Tách chương theo mẫu', 'dùng khi chương bị tách sai; để trống = tự động', `
        <label class="field">Mẫu nhận dòng tiêu đề chương (regex)<input type="text" id="s-pattern" value="${esc(s.chapter_pattern)}" aria-describedby="s-pattern-err"></label>
        <span class="field-err" id="s-pattern-err" role="alert" hidden></span>
        <pre class="code-box">Mặc định: ${esc(s._default_chapter_pattern)}</pre>
        <label class="field">Văn bản mẫu (mỗi dòng một tiêu đề thử)<textarea id="s-pat-sample" rows="4" placeholder="第12章 重逢&#10;Chapter 3&#10;Một dòng văn thường"></textarea></label>
        <div><button class="btn sm" id="s-pat-try">Thử với văn bản mẫu</button></div>
        <div class="check-out" id="s-pat-out" hidden></div>`)
      + group('Khóa cài đặt', 'tên khóa trong file cài đặt, để đối chiếu khi cần', `
        <table class="kv-table"><tbody>${Object.entries(s).filter(([k, v]) => !k.startsWith('_') && typeof v !== 'object').map(([k, v]) => `<tr><td><code>${esc(k)}</code></td><td>${esc(String(v)) || '<span class="muted">(trống)</span>'}</td></tr>`).join('')}</tbody></table>`)],
  };
  let sec = store('settings_sec', 'translate');
  if (!SECTIONS[sec]) sec = 'translate';
  main.innerHTML = `
    <div class="page-head"><h1>Cài đặt</h1><div class="row"><span class="dirty-chip" id="s-dirty" hidden>Chưa lưu thay đổi</span><button class="btn primary" id="s-save">Lưu cài đặt</button></div></div>
    <div class="settings-layout">
      <nav class="set-nav">${Object.entries(SECTIONS).map(([k, [l]]) => `<button data-sec="${k}" class="${k === sec ? 'on' : ''}">${l}</button>`).join('')}</nav>
      <div class="card set-panel">${Object.entries(SECTIONS).map(([k, [, html]]) => `<div data-pane="${k}"${k === sec ? '' : ' hidden'}>${html}</div>`).join('')}</div>
    </div>`;
  $$('.set-nav button').forEach((x) => x.onclick = () => {
    save('settings_sec', x.dataset.sec);
    $$('.set-nav button').forEach((y) => y.classList.toggle('on', y === x));
    $$('.set-panel [data-pane]').forEach((p) => { p.hidden = p.dataset.pane !== x.dataset.sec; });
  });
  $('.set-panel').addEventListener('input', () => { $('#s-dirty').hidden = false; });
  const checkPattern = () => {
    const inp = $('#s-pattern');
    let msg = '';
    if (inp.value.trim()) { try { new RegExp(inp.value, 'mu'); } catch (e) { msg = e.message.replace(/^Invalid regular expression: (\/.*\/\w*: )?/, ''); } }
    inp.classList.toggle('invalid', !!msg);
    inp.setAttribute('aria-invalid', !!msg);
    $('#s-pattern-err').hidden = !msg;
    $('#s-pattern-err').textContent = msg ? `⚠ Regex có vẻ không hợp lệ: ${msg}. Sửa lại hoặc để trống = mặc định (server dùng regex Python, nên cú pháp riêng của Python có thể bị báo nhầm).` : '';
  };
  $('#s-pattern').addEventListener('input', checkPattern);
  $$('[data-goto-sec]').forEach((x) => x.onclick = () => $(`.set-nav button[data-sec="${x.dataset.gotoSec}"]`).click());
  $('#s-pat-try').onclick = () => {
    const out = $('#s-pat-out'), pat = $('#s-pattern').value.trim() || s._default_chapter_pattern;
    let re;
    try { re = new RegExp(pat, 'mu'); } catch (e) { out.hidden = false; out.textContent = 'Mẫu chưa hợp lệ: ' + e.message; return; }
    const lines = $('#s-pat-sample').value.split('\n').filter((l) => l.trim());
    out.hidden = false;
    out.textContent = lines.length ? lines.map((l) => (re.test(l) ? '✓ chương   ' : '·  thường  ') + l).join('\n') : 'Chưa có dòng mẫu nào.';
  };
  $$('[data-app-theme]').forEach((x) => x.onclick = () => {
    setAppTheme(x.dataset.appTheme);
    $$('[data-app-theme]').forEach((y) => { y.classList.toggle('on', y === x); y.setAttribute('aria-pressed', y === x); });
  });

  $('#s-save').onclick = guard(async () => {
    await api('/api/settings', {
      method: 'PUT', body: {
        engine_zh: $('#s-engine-zh').value, engine_en: $('#s-engine-en').value,
        dichnhanh_mode: $('#s-dn-mode').value, dichnhanh_type: $('#s-dn-type').value,
        dichnhanh_analyze: $('#s-dn-analyze').checked, dichnhanh_fanfic: $('#s-dn-fanfic').checked,
        delay_ms: +$('#s-delay').value, retry_count: +$('#s-retry').value, max_chars: +$('#s-max').value,
        drive_roots: $('#s-roots').value.split('\n').map((x) => x.trim()).filter(Boolean),
        chapter_pattern: $('#s-pattern').value.trim(),
        vault_root: $('#s-vault').value.trim(),
        rar_tool: $('#s-rar').value.trim(),
        strip_post_header: $('#s-strip').checked,
      },
    });
    toast('Đã lưu cài đặt');
    renderSettings();   // repaint: vault root and the .rar tool report back what they resolved to
  });
  const showVaultStatus = guard(async () => {
    const v = await api('/api/vault/info');
    $('#s-vault-status').innerHTML = v.root ? `<span style="color:var(--ok)">✓ ${esc(v.root)}</span>` : `<span class="warn">${esc(v.error)}</span>`;
  });
  showVaultStatus();
  $$('[data-dict]').forEach((b) => b.onclick = guard(async () => {
    const [f] = await pickFiles('.json,.txt', false);
    if (!f) return;
    toast('Đang nạp từ điển…');
    const r = await api(`/api/dicts/upload?kind=${b.dataset.dict}`, { method: 'POST', body: f, raw: true, type: 'application/octet-stream' });
    toast(`Đã nạp ${r.entries.toLocaleString('vi-VN')} mục`);
    renderSettings();
  }));
  $('#s-dl-dicts').onclick = guard(async () => {
    if (!await confirmBox('Tải từ điển', `Tải 3 file từ điển (Name, VP, HanViet) từ:<br><code>${esc(s.dict_vp_url)}</code><br>và 2 file cùng thư mục. Dung lượng có thể vài chục MB.`, 'Tải')) return;
    const btn = $('#s-dl-dicts');
    btn.disabled = true; btn.textContent = 'Đang tải…';
    try {
      const r = await api('/api/dicts/download', { method: 'POST' });
      r.errors.forEach((e) => toast(e, true));
      if (Object.keys(r.entries).length) toast('Đã tải: ' + Object.entries(r.entries).map(([k, v]) => `${k} ${v.toLocaleString('vi-VN')}`).join(', '));
    } finally { renderSettings(); }
  });
}

/* ================= router ================= */

let currentView = null;
let lastView = null, lastParam = null;
let currentParam = null;

const router = guard(async () => {
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const query = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean);
  $('.sel-pop')?.remove();
  const view = parts[0] || 'library';
  const param = parts[1] || null;
  if (currentView === 'read' && readerState.editing && editorDirty() && !(view === 'read' && param === String(readerState.chapter?.id))) {
    if (await confirmBox('Chưa lưu', 'Chương đang sửa có thay đổi chưa lưu. Lưu trước khi rời?', 'Lưu')) await saveEditor();
  }
  currentView = view;
  currentParam = param;
  document.body.classList.toggle('reading', view === 'read');
  if (typeof ttsStop === 'function') { if (view !== 'read') ttsStop(); else ttsRenderBar(); }   // tts.js loads after this file
  if (view !== 'read') document.body.classList.remove('drawer-pinned');
  $$('.nav a').forEach((a) => {
    const on = a.dataset.nav === view || (view === 'book' && a.dataset.nav === 'library');
    a.classList.toggle('active', on);
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  const changedPage = view !== lastView || param !== lastParam;
  lastView = view; lastParam = param;
  if (view !== 'read') { readerState.book = null; readerState.editing = readerState.writing = false; }
  if (view !== 'library') { state.libSelecting = false; state.libSel.clear(); }
  if (view !== 'vault') { vaultInto = null; vaultLink = null; }
  refreshSidebar();
  const slow = setTimeout(() => { if (currentView === view && currentParam === param && view !== 'read') main.innerHTML = SKELETON; }, 250);
  try { await routeTo(view, param, query); } finally { clearTimeout(slow); }
  // a new page: move focus to it so a screen reader starts there and Tab goes on from the top of the content
  if (changedPage && view !== 'read' && !main.contains(document.activeElement)) main.focus({ preventScroll: true });
});

const SKELETON = `<div class="skeleton" aria-busy="true" aria-label="Đang tải"><i class="sk-h"></i><div class="sk-row"><i></i><i></i><i></i></div><i class="sk-l"></i><i class="sk-l short"></i></div>`;

async function routeTo(view, param, query) {
  if (view === 'library') return renderLibrary();
  if (view === 'book') { window.scrollTo(0, 0); return renderBook(param); }
  if (view === 'read') return renderReader(param, query);
  if (view === 'vault') return renderVault(query);
  if (view === 'quick') return renderQuick();
  if (view === 'names') return renderNames(query);
  if (view === 'settings') return renderSettings();
  location.hash = '#/';
}

window.addEventListener('hashchange', router);
router();
engines().then(pollJobs);

/* ---------- accessibility, kept by one observer instead of by every template ----------
   - a toggle drawn as `.on` also says so: aria-pressed (switches) or aria-selected (tabs)
   - a button with no text gets its title as its name */
const A11Y_PRESSED = '.seg button, .theme-sw, .app-theme, .menu-pop .check';
const A11Y_TABS = '.book-tab[data-tab], .set-nav button';
let a11yQueued = false;
function a11yPass() {
  a11yQueued = false;
  $$(A11Y_PRESSED).forEach((b) => { if (b.matches('button')) b.setAttribute('aria-pressed', b.classList.contains('on')); });
  $$(A11Y_TABS).forEach((b) => { b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', b.classList.contains('on')); });
  $$('.book-tabs, .set-nav').forEach((n) => n.setAttribute('role', 'tablist'));
  $$('button:not([aria-label]), a.icon-btn:not([aria-label])').forEach((b) => {
    if (!b.textContent.trim() || /^[✕✎↑↓⤓＋+⋯▶⏸]$/.test(b.textContent.trim())) { if (b.title) b.setAttribute('aria-label', b.title); }
  });
}
new MutationObserver((list) => {
  if (list.every((m) => m.target.closest?.('#d-back, #rbody'))) return;   // typing in the desk, the reader text: nothing to label
  if (!a11yQueued) { a11yQueued = true; setTimeout(a11yPass, 30); } })
  .observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
a11yPass();

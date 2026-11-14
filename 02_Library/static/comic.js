/* Kệ Sách — comic reader modes: vertical scroll, single page, double page; left-to-right or right-to-left; fit height / width;
   tap zones, keyboard, preloading. Mode and direction are remembered per series (a manga reads right-to-left, a comic does not). */
'use strict';
const COMIC_DEFAULTS = { mode: 'scroll', dir: 'ltr', fit: 'height', coverAlone: true, split: false };
const comic = { half: 0, halved: false, z: 1, px: 0, py: 0, ptrs: new Map(), sid: '', cid: '', count: 0, i: 0, cfg: { ...COMIC_DEFAULTS }, nav: null, onKey: null, dims: new Map(), body: null };

const comicSrc = (n) => (comic.trShow && comic.trMap?.get(n)) || `/api/chapter/${comic.sid}/${comic.cid}/page/${n}`;   // a translated page is a blob made by comic-tr.js
/** Natural size of page n, loaded once; a landscape page is a spread already and is shown alone in double mode. */
function comicDims(n) {
  if (n < 0 || n >= comic.count) return Promise.resolve(null);
  if (!comic.dims.has(n)) {
    comic.dims.set(n, new Promise((ok) => { const im = new Image(); im.onload = () => ok({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => ok(null); im.src = comicSrc(n); }));
  }
  return comic.dims.get(n);
}
const comicWide = async (n) => { const d = await comicDims(n); return !!d && d.w > d.h * 1.1; };

/** Which pages sit on screen when page i is the first of the spread. */
async function comicSpread(i) {
  if (comic.cfg.mode !== 'double') return [i];
  if (i === 0 && comic.cfg.coverAlone) return [0];
  if (i + 1 >= comic.count || await comicWide(i) || await comicWide(i + 1)) return [i];
  return [i, i + 1];
}
async function comicSpreadBefore(i) {
  if (comic.cfg.mode !== 'double') return Math.max(0, i - 1);
  if (i - 1 <= 0) return 0;
  if (comic.cfg.coverAlone && i - 1 === 0) return 0;
  if (await comicWide(i - 1)) return i - 1;
  if (i - 2 < 0 || (comic.cfg.coverAlone && i - 2 === 0) || await comicWide(i - 2)) return i - 1;
  return i - 2;
}

const comicKey = () => 'comic_' + comic.sid;

/** A landscape page is a spread. With "split" on it is shown as two halves, the one you read first coming first:
 *  left half first when reading left-to-right, right half first right-to-left. */
async function comicShow(i, half = 0) {
  comic.i = Math.max(0, Math.min(comic.count - 1, i));
  const pages = await comicSpread(comic.i);
  const rtl = comic.cfg.dir === 'rtl';
  const d = comic.cfg.split && pages.length === 1 ? await comicDims(pages[0]) : null;
  comic.halved = !!d && d.w > d.h * 1.1;
  comic.half = comic.halved ? half : 0;
  let inner;
  if (comic.halved) {
    const left = (comic.half === 0) === !rtl;   // which physical half is on screen
    inner = `<div class="halfwrap" style="aspect-ratio:${d.w / 2} / ${d.h}"><img src="${comicSrc(pages[0])}" alt="Trang ${pages[0] + 1}, nửa ${left ? 'trái' : 'phải'}" draggable="false" style="margin-left:${left ? 0 : '-100%'}"></div>`;
  } else inner = pages.map((n) => `<img src="${comicSrc(n)}" alt="Trang ${n + 1}" draggable="false">`).join('');
  comic.body.innerHTML = `<div class="comic-paged ${rtl ? 'rtl' : ''} fit-${comic.cfg.fit}" id="c-stage">${inner}</div>`;
  comic.body.scrollTop = 0;
  comic.z = 1; comic.px = comic.py = 0; comic.body.style.overflow = ''; comicZoomLabel();
  const last = pages[pages.length - 1];
  $('#c-where') && ($('#c-where').textContent = `${pages.map((n) => n + 1).join('–')}${comic.halved ? ` (nửa ${comic.half + 1}/2)` : ''} / ${comic.count}`);
  $('#r-prog').style.width = Math.round(((last + 1) / comic.count) * 100) + '%';
  for (let k = 1; k <= 2; k++) comicDims(last + k);   // preload what comes next
  comicSavePos((last + 1) / comic.count);
  comicTrAfterShow(pages);
}
let comicPosTimer;
function comicSavePos(f) {
  clearTimeout(comicPosTimer);
  comicPosTimer = setTimeout(() => api('progress', { method: 'PUT', body: { series: comic.sid, chapter: comic.cid, pos: +f.toFixed(3), page: comic.i } }).catch(() => {}), 600);
}
async function comicNext() {
  if (comic.halved && comic.half === 0) return comicShow(comic.i, 1);   // second half of the same page
  const pages = await comicSpread(comic.i), last = pages[pages.length - 1];
  if (last + 1 >= comic.count) return comic.nav?.next ? comic.nav.next() : toast('Hết chương này.');
  comicShow(last + 1);
}
async function comicPrev() {
  if (comic.halved && comic.half === 1) return comicShow(comic.i, 0);
  if (comic.i <= 0) return comic.nav?.prev ? comic.nav.prev() : toast('Đang ở trang đầu.');
  const p = await comicSpreadBefore(comic.i);
  // stepping back onto a split page lands on its second half, the one read last
  comicShow(p, comic.cfg.split && (await comicSpread(p)).length === 1 && await comicWide(p) ? 1 : 0);
}
/** Reading direction decides which side of the screen turns forward. */
const comicForward = (side) => (comic.cfg.dir === 'rtl' ? side === 'left' : side === 'right');

function comicRender() {
  const c = comic.cfg;
  document.removeEventListener('keydown', comic.onKey);
  comic.onKey = null;
  comic.body.onscroll = null; comic.body.onclick = null;
  comic.z = 1; comic.px = comic.py = 0; comic.body.style.overflow = ''; comicZoomLabel();
  if (c.mode === 'scroll') {
    comic.body.innerHTML = `<div class="comic-page">${Array.from({ length: comic.count }, (_, n) => `<img src="${comicSrc(n)}" alt="Trang ${n + 1}" loading="lazy">`).join('')}</div>`;
    $('#c-where') && ($('#c-where').textContent = `${comic.count} trang`);
    let t;
    comic.body.onscroll = () => {
      const f = comic.body.scrollTop / Math.max(1, comic.body.scrollHeight - comic.body.clientHeight);
      $('#r-prog').style.width = Math.round(f * 100) + '%';
      clearTimeout(t); t = setTimeout(() => api('progress', { method: 'PUT', body: { series: comic.sid, chapter: comic.cid, pos: +f.toFixed(3) } }).catch(() => {}), 800);
      clearTimeout(comic.trT); comic.trT = setTimeout(async () => { if ($('#ctr-auto')?.checked) comicTrAfterShow(await comicTrVisible()); }, 400);
    };
    return;
  }
  comic.body.onscroll = null;
  comic.body.onclick = (e) => {
    if (e.target.closest('a,button')) return;
    if (comic.suppressClick) { comic.suppressClick = false; return; }
    const x = e.clientX / window.innerWidth;
    if (comic.z > 1 && (x < 0.35 || x > 0.65)) return;
    if (x < 0.35) comicForward('left') ? comicNext() : comicPrev();
    else if (x > 0.65) comicForward('right') ? comicNext() : comicPrev();
    else comicToggleBars();
  };
  comic.onKey = (e) => {
    if (e.target.closest?.('input,select,textarea') || $('#c-index') || $('#ch-drawer')) return;
    const k = e.key;
    if (k === 'ArrowRight') comicForward('right') ? comicNext() : comicPrev();
    else if (k === 'ArrowLeft') comicForward('left') ? comicNext() : comicPrev();
    else if (k === ' ' || k === 'PageDown') { e.preventDefault(); e.shiftKey ? comicPrev() : comicNext(); }
    else if (k === 'PageUp') comicPrev();
    else if (k === '+' || k === '=') comicZoomBy(1.25);
    else if (k === '-') comicZoomBy(0.8);
    else if (k === '0') comicZoomSet(1);
    else return;
    e.preventDefault();
  };
  document.addEventListener('keydown', comic.onKey);
}
/* ---------- zoom ----------
   Paged modes: the stage is scaled with a CSS transform and panned by dragging. Scroll mode: the pages get wider and the
   reader scrolls sideways. Zoom is per page turn (it resets), like most readers. */
const ZOOM_MAX = 4;
function comicZoomLabel() { const b = $('#c-zoom'); if (b) b.textContent = Math.round(comic.z * 100) + '%'; }
function comicClamp() {
  const st = $('#c-stage'); if (!st) return;
  const mx = Math.max(0, (st.offsetWidth * comic.z - comic.body.clientWidth) / 2), my = Math.max(0, (st.offsetHeight * comic.z - comic.body.clientHeight) / 2);
  comic.px = Math.max(-mx, Math.min(mx, comic.px)); comic.py = Math.max(-my, Math.min(my, comic.py));
}
function comicZoomApply() {
  comic.z = Math.max(1, Math.min(ZOOM_MAX, comic.z));
  if (comic.cfg.mode === 'scroll') {
    const pg = $('.comic-page');
    if (pg) { pg.style.setProperty('--z', comic.z); pg.classList.toggle('zoomed', comic.z > 1); }
  } else {
    const st = $('#c-stage'); if (!st) return;
    if (comic.z === 1) comic.px = comic.py = 0; else comicClamp();
    st.style.transform = comic.z === 1 ? '' : `translate(${comic.px}px, ${comic.py}px) scale(${comic.z})`;
    st.classList.toggle('zoomed', comic.z > 1);
  }
  comicZoomLabel();
}
/** Zoom to z2 keeping the point under (cx, cy) in place (paged modes). */
function comicZoomAt(z2, cx, cy) {
  const st = $('#c-stage');
  z2 = Math.max(1, Math.min(ZOOM_MAX, z2));
  // a scaled stage would add scrollbars that shift the centre; while zoomed the drag pans instead
  if (comic.cfg.mode !== 'scroll') comic.body.style.overflow = z2 > 1 ? 'hidden' : '';
  if (st && comic.cfg.mode !== 'scroll') {
    const r = st.getBoundingClientRect(), z = comic.z;
    const ux = (cx - (r.left + r.width / 2)) / z, uy = (cy - (r.top + r.height / 2)) / z;   // point in unscaled stage coordinates
    comic.px += -ux * (z2 - z); comic.py += -uy * (z2 - z);
  }
  comic.z = z2; comicZoomApply();
}
function comicZoomBy(f, reset) {
  const b = comic.body.getBoundingClientRect();
  comicZoomAt(reset ? 1 : comic.z * f, b.left + b.width / 2, b.top + b.height / 2);
}
const comicZoomSet = (z) => comicZoomAt(z, innerWidth / 2, innerHeight / 2);
function comicZoomBind(body) {
  body.addEventListener('wheel', (e) => {
    if (!e.ctrlKey || comic.cfg.mode === 'scroll') return;
    e.preventDefault();
    comicZoomAt(comic.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
  }, { passive: false });
  body.addEventListener('dblclick', (e) => {
    if (comic.cfg.mode === 'scroll' || e.target.closest('a,button')) return;
    comicZoomAt(comic.z > 1 ? 1 : 2, e.clientX, e.clientY);
    comic.suppressClick = false;
  });
  let drag = null, pinch = 0;
  body.addEventListener('pointerdown', (e) => {
    if (comic.cfg.mode === 'scroll' || e.target.closest('a,button')) return;
    if (!comic.ptrs.size) comic.suppressClick = false;   // a click swallowed by the last gesture must not eat this tap
    comic.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (comic.ptrs.size === 2) { const [a, b] = [...comic.ptrs.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); drag = null; }
    else { drag = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: Date.now(), moved: false, swiping: false }; try { body.setPointerCapture(e.pointerId); } catch { /* synthetic event */ } }
  });
  body.addEventListener('pointermove', (e) => {
    const p = comic.ptrs.get(e.pointerId); if (!p) return;
    p.x = e.clientX; p.y = e.clientY;
    if (comic.ptrs.size === 2 && pinch) {
      const [a, b] = [...comic.ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      comicZoomAt(comic.z * (d / pinch), (a.x + b.x) / 2, (a.y + b.y) / 2); pinch = d; comic.suppressClick = true;
    } else if (drag && comic.z === 1) {   // not zoomed: a horizontal drag is a swipe, the page follows the finger a little
      const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.swiping && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) drag.swiping = true;
      if (drag.swiping) { comic.suppressClick = true; const st = $('#c-stage'); if (st) st.style.transform = `translateX(${Math.max(-80, Math.min(80, dx * 0.35))}px)`; }
    } else if (drag && comic.z > 1) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      drag.moved = true; comic.suppressClick = true;
      comic.px += dx; comic.py += dy; drag.x = e.clientX; drag.y = e.clientY; comicZoomApply();
    }
  });
  const up = (e) => {
    const was = drag;
    comic.ptrs.delete(e.pointerId); if (comic.ptrs.size < 2) pinch = 0; if (!comic.ptrs.size) drag = null;
    if (!was || !was.swiping || comic.z !== 1) return;
    const st = $('#c-stage'); if (st) st.style.transform = '';
    if (e.type === 'pointercancel') return;
    const dx = e.clientX - was.x0, dy = e.clientY - was.y0;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.6 || Date.now() - was.t0 > 800) return;   // too short, too diagonal or too slow
    // dragging left uncovers the right edge: same as tapping it
    comicForward(dx < 0 ? 'right' : 'left') ? comicNext() : comicPrev();
  };
  body.addEventListener('pointerup', up); body.addEventListener('pointercancel', up);
}

/* ---------- page index: a grid of the pages, jump by tapping one ---------- */
function comicCurrentPage() {
  if (comic.cfg.mode !== 'scroll') return comic.i;
  const top = comic.body.getBoundingClientRect().top, imgs = $$('.comic-page img');
  const k = imgs.findIndex((im) => im.getBoundingClientRect().bottom > top + 8);
  return Math.max(0, k);
}
async function comicGoto(n) {
  if (comic.cfg.mode !== 'scroll') return comicShow(n);
  // lazy images above the target have no height yet, so load them first or the offset is wrong
  const imgs = $$('.comic-page img');
  await Promise.all(imgs.slice(0, n + 1).map((im) => { im.loading = 'eager'; return im.complete ? 0 : new Promise((ok) => { im.onload = im.onerror = ok; }); }));
  if (imgs[n]) comic.body.scrollTo({ top: imgs[n].getBoundingClientRect().top - comic.body.getBoundingClientRect().top + comic.body.scrollTop, behavior: 'auto' });
}
function comicIndexClose() { $('#c-index')?.remove(); document.removeEventListener('keydown', comicIndexKey, true); }
function comicIndexKey(e) { if (e.key === 'Escape') { e.stopPropagation(); comicIndexClose(); $('#r-pages')?.focus(); } }
function comicIndexOpen() {
  if ($('#c-index')) return comicIndexClose();
  const cur = comicCurrentPage();
  const el = document.createElement('div');
  el.id = 'c-index'; el.className = 'c-index'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Mục lục trang');
  el.innerHTML = `<div class="c-index-head"><b>Mục lục trang</b><span class="muted small">${comic.count} trang · đang ở trang ${cur + 1}</span><button class="btn sm" id="c-index-x">Đóng (Esc)</button></div>
    <div class="c-index-grid">${Array.from({ length: comic.count }, (_, n) => `<button class="c-thumb${n === cur ? ' cur' : ''}" data-n="${n}" aria-label="Trang ${n + 1}"${n === cur ? ' aria-current="true"' : ''}><img data-thumb="thumb/${comic.sid}/${comic.cid}/${n}" data-full="${comicSrc(n)}" data-w="200" alt="" decoding="async"><span>${n + 1}</span></button>`).join('')}</div>`;
  $('#reader').appendChild(el);
  ksThumbs(el);
  el.addEventListener('click', (e) => {
    if (e.target.id === 'c-index-x') return comicIndexClose();
    const b = e.target.closest('[data-n]');
    if (b) { comicIndexClose(); comicGoto(+b.dataset.n); }
  });
  document.addEventListener('keydown', comicIndexKey, true);
  $('.c-thumb.cur', el)?.scrollIntoView({ block: 'center' });
  $('.c-thumb.cur', el)?.focus();
}
function comicToggleBars() { $('#reader')?.classList.toggle('bars-off'); }

function comicOptsHtml() {
  const c = comic.cfg;
  const seg = (key, items) => `<div class="seg" role="group">${items.map(([v, l]) => `<button data-c="${key}" data-v="${v}" class="${String(c[key]) === v ? 'on' : ''}" aria-pressed="${String(c[key]) === v}">${l}</button>`).join('')}</div>`;
  return `<div class="tts-grid">
    <div class="field"><span>Kiểu đọc</span>${seg('mode', [['scroll', 'Cuộn dọc'], ['single', 'Trang đơn'], ['double', 'Hai trang']])}</div>
    <div class="field"><span>Hướng đọc</span>${seg('dir', [['ltr', 'Trái → phải'], ['rtl', 'Phải → trái']])}</div>
    ${c.mode === 'scroll' ? '' : `<div class="field"><span>Vừa khung</span>${seg('fit', [['height', 'Chiều cao'], ['width', 'Chiều rộng']])}</div>`}
    ${c.mode === 'scroll' ? '' : `<div class="field"><span>Trang ngang</span>${seg('split', [['false', 'Giữ nguyên'], ['true', 'Tách đôi']])}</div>`}
    ${c.mode === 'double' ? `<div class="field"><span>Trang đầu</span>${seg('coverAlone', [['true', 'Đứng riêng'], ['false', 'Ghép đôi']])}</div>` : ''}
    <div class="field"><span>Thu phóng</span><div class="seg" role="group"><button data-z="out" aria-label="Thu nhỏ">−</button><button data-z="reset" id="c-zoom" aria-label="Đặt lại thu phóng">100%</button><button data-z="in" aria-label="Phóng to">+</button></div></div>
  </div><div id="ctr-panel" class="ctr-panel"></div><p class="muted small">${c.mode === 'scroll' ? 'Cuộn dọc đọc liền mạch.' : 'Bấm mép trái / phải màn hình, phím ← →, Space, hoặc PageUp / PageDown để lật trang; bấm giữa để ẩn thanh.'} Thu phóng: nút + −, phím + − 0, Ctrl + lăn chuột, bấm đúp, hai ngón; kéo để di chuyển khi đã phóng. Lựa chọn nhớ riêng cho từng bộ.${c.mode === 'double' ? ' Trang ngang tự đứng một mình.' : ''}${c.mode !== 'scroll' && c.split ? ' Trang ngang được tách đôi: nửa đọc trước hiện trước (nửa trái nếu đọc trái → phải, nửa phải nếu phải → trái).' : ''}</p>`;
}
function comicOptsBind(box) {
  box.addEventListener('click', (e) => {
    const zb = e.target.closest('[data-z]');
    if (zb) return comicZoomBy(zb.dataset.z === 'in' ? 1.25 : zb.dataset.z === 'out' ? 0.8 : 0, zb.dataset.z === 'reset');
    const b = e.target.closest('[data-c]');
    if (!b) return;
    const k = b.dataset.c, v = b.dataset.v;
    comic.cfg[k] = k === 'coverAlone' || k === 'split' ? v === 'true' : v;
    save(comicKey(), comic.cfg);
    box.innerHTML = comicOptsHtml();
    comicTrDraw();
    comicRender();
    if (comic.cfg.mode !== 'scroll') comicShow(comic.i);
    else comicTrAfterShow([]);
  });
}

/** Called by the reader once a comic chapter is on screen. nav = { prev, next } open the neighbouring chapters. */
async function comicMount(body, sid, cid, count, nav) {
  comicTrUnmount();
  Object.assign(comic, { sid, cid, count, nav, body, dims: new Map(), i: 0 });
  comic.ptrs.clear(); comicZoomBind(body);
  comic.cfg = { ...COMIC_DEFAULTS, ...store(comicKey(), {}) };
  $('#r-pages').onclick = comicIndexOpen;
  const box = $('#comic-opts');
  box.innerHTML = comicOptsHtml();
  if (!box.dataset.bound) { box.dataset.bound = '1'; comicOptsBind(box); }
  comicTrDraw();
  comicRender();
  if (comic.cfg.mode === 'scroll') { comicTrAfterShow(await comicTrVisible()); return; }
  let start = 0;
  try { const p = (await api('state')).progress[sid]; if (p && p.chapter === cid && Number.isInteger(p.page)) start = p.page; } catch { /* first time */ }
  comicShow(start);
}
function comicUnmount() {
  if (comic.onKey) document.removeEventListener('keydown', comic.onKey);
  comic.onKey = null;
  comicIndexClose();
  comicTrUnmount();
}

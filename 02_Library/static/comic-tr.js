/* Kệ Sách — translate the text inside comic pages. The pieces: ocr.js reads and paints (in this browser), the server asks Trạm Dịch for the translation,
   and a finished page is just another picture for the same <img> (a blob URL), so every reading mode keeps working. What was read and translated is
   saved per page (data/ocr-pages), so each page is read once. Nothing is written into the library folder. */
'use strict';
comic.trMap = new Map();    // page index -> blob URL of the translated picture
comic.trShow = true;        // show translated pictures (false = the originals)
comic.trBusy = new Set();
let trEngines = null;

function trStatus(msg, bad) { const e = $('#ctr-st'); if (e) { e.textContent = msg || ''; e.classList.toggle('err', !!bad); } }
const trPageImgs = (n) => $$('#r-body img').filter((im) => new RegExp(`^Trang ${n + 1}(,|$)`).test(im.alt));
/** Put the right picture (translated or original) into every <img> that shows page n. */
function comicTrApply(n) { const src = comicSrc(n); trPageImgs(n).forEach((im) => { if (im.getAttribute('src') !== src) im.src = src; }); }

async function trConfirmExternal(engine) {
  const e = (trEngines || []).find((x) => x.id === engine);
  if (!e?.external || sessionStorage.getItem('ks_ext_ok') === '1') return true;
  const ok = await new Promise((done) => {
    const m = modal(`<h2>Gửi chữ ra ngoài?</h2><p>Engine <b>${esc(e.label)}</b> sẽ gửi các câu chữ đọc được trong ảnh tới một dịch vụ bên ngoài máy bạn. Chính các ảnh thì không bị gửi đi.</p><p class="muted small">Chỉ hỏi một lần cho tới khi đóng trình duyệt. Engine “ngoại tuyến” thì không gửi gì ra ngoài.</p>
      <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="x-no">Không</button><button class="btn primary" id="x-ok">Đồng ý, dịch</button></div>`);
    $('#x-no', m.el).focus(); $('#x-no', m.el).onclick = () => { m.close(); done(false); }; $('#x-ok', m.el).onclick = () => { m.close(); done(true); };
    const gone = setInterval(() => { if (!m.el.isConnected) { clearInterval(gone); done(false); } }, 300);   // Esc / click outside = no
  });
  if (ok) sessionStorage.setItem('ks_ext_ok', '1');
  return ok;
}

/** Read, translate and paint page n. force = read and translate again even if the page was done before. */
async function comicTrPage(n, force) {
  if (n < 0 || n >= comic.count || comic.trBusy.has(n) || (!force && comic.trMap.has(n))) return;
  comic.trBusy.add(n);
  const sid = comic.sid, cid = comic.cid, engine = $('#ctr-eng')?.value || 'local';
  try {
    const bmp = await ocrBitmap(`/api/chapter/${sid}/${cid}/page/${n}`);
    let saved = force ? {} : await api(`ocr/page/${sid}/${cid}/${n}`).catch(() => ({}));
    let blocks = saved.blocks;
    if (!blocks) {
      trStatus(`Đang đọc chữ trang ${n + 1}… (lần đầu nạp mô hình vài giây)`);
      blocks = ocrGroup(await ocrLines(bmp)).map((g) => ({ l: g.l, t: g.t, r: g.r, b: g.b, text: g.text, n: g.lines.length }));
    }
    if (blocks.some((b) => !b.vi)) {
      if (!(await trConfirmExternal(engine))) { trStatus('Đã huỷ (engine gửi chữ ra ngoài)'); bmp.close(); return; }
      trStatus(`Đang dịch ${blocks.length} khung chữ ở trang ${n + 1}…`);
      const r = await fetch('/api/ocr/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texts: blocks.map((b) => b.text), engine, allow_external: sessionStorage.getItem('ks_ext_ok') === '1' || engine === 'local' }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || j.message || r.statusText);
      blocks.forEach((b, i) => { b.vi = j.texts[i] || b.text; });
      await fetch('/api/ocr/page', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ series: sid, chapter: cid, page: n, blocks, engine: j.engine, w: bmp.width, h: bmp.height }) });
    }
    if (sid !== comic.sid || cid !== comic.cid) { bmp.close(); return; }   // the reader moved on while this page was being read
    const old = comic.trMap.get(n); if (old) URL.revokeObjectURL(old);
    comic.trMap.set(n, blocks.length ? await ocrRender(bmp, blocks) : null);
    if (!comic.trMap.get(n)) comic.trMap.delete(n);
    bmp.close();
    comicTrApply(n);
    trStatus(blocks.length ? `Trang ${n + 1}: dịch ${blocks.length} khung chữ` : `Trang ${n + 1}: không thấy chữ để dịch`);
  } catch (e) { trStatus(e.message, true); }
  finally { comic.trBusy.delete(n); }
}
/** The pages on screen now (paged: the spread; scroll: those inside the viewport). */
async function comicTrVisible() {
  if (comic.cfg.mode !== 'scroll') return comicSpread(comic.i);
  const b = comic.body.getBoundingClientRect(), out = [];
  $$('.comic-page img').forEach((im, n) => { const r = im.getBoundingClientRect(); if (r.bottom > b.top - 200 && r.top < b.bottom + 200) out.push(n); });
  return out;
}
/** Called after a page or spread is drawn: with automatic translation on, do the pages shown and the next one. */
function comicTrAfterShow(pages) {
  pages.forEach((n) => comicTrApply(n));
  if (!pages.length || !$('#ctr-auto')?.checked) return;
  pages.forEach((n) => comicTrPage(n));
  comicTrPage(pages[pages.length - 1] + 1);
}

function comicTrUnmount() { comic.trMap.forEach((u) => URL.revokeObjectURL(u)); comic.trMap = new Map(); comic.trBusy = new Set(); }

let trPoll = 0, trSt = { ready: false, total_bytes: 0 };
/** Fill the "Dịch ảnh" section of the options (#ctr-panel is drawn by comicOptsHtml; this runs after every redraw of the options). */
async function comicTrDraw() {
  const panel = $('#ctr-panel');
  if (!panel) return;
  {
    clearTimeout(trPoll);
    const st = trSt = await api('ocr/status').catch(() => trSt);
    if (!trEngines) {
      try { trEngines = (await api('translate/engines')).engines.sort((a, b) => Number(a.external) - Number(b.external)); } catch (e) { trEngines = []; panel.dataset.engErr = e.message; }
    }
    const mb = (b) => (b / 1048576).toFixed(0);
    if (!st.ready) {
      panel.innerHTML = `<div class="tts-row"><b>Dịch chữ trong ảnh</b></div>
        <p class="small">Cần cài bộ đọc chữ một lần (khoảng ${mb(st.total_bytes)} MB): thư viện <b>eSearch-OCR</b> và <b>onnxruntime-web</b> từ unpkg, mô hình <b>PaddleOCR</b> (tiếng Trung + Anh) từ GitHub. Mỗi tệp được kiểm mã sha256 đã ghim, sai là bỏ. Sau đó chữ trong ảnh được đọc <b>ngay trong trình duyệt này</b>, ảnh không rời máy.</p>
        <div class="row"><button class="btn primary" id="ctr-setup"${st.running ? ' disabled' : ''}>${st.running ? `Đang tải… ${mb(st.done_bytes)} / ${mb(st.total_bytes)} MB ${esc(st.step || '')}` : 'Cài đọc chữ'}</button>${st.error ? `<span class="err small">${esc(st.error)}</span>` : ''}</div>`;
      $('#ctr-setup')?.addEventListener('click', async () => { await fetch('/api/ocr/setup', { method: 'POST' }); comicTrDraw(); });
      if (st.running) trPoll = setTimeout(comicTrDraw, 1000);
      return;
    }
    const eng = trEngines || [];
    panel.innerHTML = `<div class="tts-row"><b>Dịch chữ trong ảnh</b> <span class="muted small" id="ctr-st"></span></div>
      <div class="tts-grid">
        <label class="field"><span>Engine dịch (qua Trạm Dịch)</span><select id="ctr-eng"${eng.length ? '' : ' disabled'}>${eng.map((x) => `<option value="${esc(x.id)}">${esc(x.label)}${x.external ? ' ⚠ gửi chữ ra ngoài' : ' · ngoại tuyến'}</option>`).join('') || `<option>${esc(panel.dataset.engErr || 'Trạm Dịch chưa chạy')}</option>`}</select></label>
        <div class="field"><span>Hiển thị</span><div class="seg" role="group" aria-label="Hiển thị"><button id="ctr-v1" class="${comic.trShow ? 'on' : ''}">Bản dịch</button><button id="ctr-v0" class="${comic.trShow ? '' : 'on'}">Bản gốc</button></div></div>
        <label class="check"><input type="checkbox" id="ctr-auto"${store('ctr_auto', false) ? ' checked' : ''}> Tự dịch trang đang đọc (và trang kế)</label>
      </div>
      <div class="row" style="margin-top:10px"><button class="btn primary" id="ctr-go"${eng.length ? '' : ' disabled'}>Dịch trang đang xem</button><button class="btn" id="ctr-again"${eng.length ? '' : ' disabled'}>Đọc và dịch lại</button></div>
      <p class="muted small" style="margin-top:8px">Đọc chữ chạy trong trình duyệt (PaddleOCR, tiếng Trung và Anh; chữ dọc kiểu truyện Nhật đọc kém, tiếng Nhật và Hàn chưa có mô hình). Chỉ các câu chữ đọc được mới gửi tới Trạm Dịch. Bản đã đọc và dịch lưu ở KeSach/data/ocr-pages, không ghi vào thư mục truyện.</p>`;
    const saved = store('ctr_engine', '');
    if (saved && eng.some((x) => x.id === saved)) $('#ctr-eng').value = saved;
    $('#ctr-eng')?.addEventListener('change', (e) => save('ctr_engine', e.target.value));
    $('#ctr-auto').onchange = (e) => { save('ctr_auto', e.target.checked); if (e.target.checked) comicTrVisible().then((p) => comicTrAfterShow(p)); };
    const showAs = (on) => { comic.trShow = on; $$('#r-body img').forEach((im) => { const m = /^Trang (\d+)/.exec(im.alt); if (m) comicTrApply(+m[1] - 1); }); comicTrDraw(); };
    $('#ctr-v1').onclick = () => showAs(true); $('#ctr-v0').onclick = () => showAs(false);
    $('#ctr-go').onclick = async () => { comic.trShow = true; for (const n of await comicTrVisible()) await comicTrPage(n); };
    $('#ctr-again').onclick = async () => { comic.trShow = true; for (const n of await comicTrVisible()) await comicTrPage(n, true); };
  }
}

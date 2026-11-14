/* Kệ Sách — read the text out of a comic page in the browser (PaddleOCR through onnxruntime-web, files from /ocr/ fetched on request), group the
   lines into bubbles, and paint a translation over the page. The picture itself never leaves this machine; only the lines of text that were read go
   to Trạm Dịch (the server asks it). The result is a new image (a canvas turned into a blob), so zoom, split pages, two-page mode and thumbnails need
   no changes: a translated page is simply a different source for the same <img>.
   Ported in spirit from the image translation of Aurel's TM Translate userscript: tiles for tall pages, overlapping-line grouping. */
'use strict';
const OCR_MAX_W = 1600, OCR_TILE_H = 1280, OCR_TILE_OVERLAP = 160;
const ocr = { engine: null, loading: null };

function ocrScript(src) {
  return new Promise((ok, bad) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => bad(new Error('Không nạp được ' + src)); document.head.appendChild(s); });
}
/** Load the libraries and models once (a few seconds the first time). Throws a readable error when the files are not on this machine yet. */
function ocrLoad() {
  if (ocr.engine) return Promise.resolve(ocr.engine);
  if (!ocr.loading) {
    ocr.loading = (async () => {
      const st = await fetch('/api/ocr/status').then((r) => r.json());
      if (!st.ready) throw new Error('Chưa cài các tệp đọc chữ trong ảnh (bấm “Cài đọc chữ” ở tuỳ chọn Dịch ảnh)');
      await ocrScript('/ocr/ort.wasm.min.js');
      await ocrScript('/ocr/eSearchOCR.umd.js');
      const ort = window.ort;
      ort.env.wasm.wasmPaths = '/ocr/';
      ort.env.wasm.numThreads = 1;   // one thread: no SharedArrayBuffer / cross-origin isolation needed
      const lib = window.eSearchOCR || window.ESearchOCR || window.eSearchOcr;
      if (!ort || !lib) throw new Error('Thư viện đọc chữ nạp được nhưng không thấy hàm khởi tạo');
      const [det, rec, keys] = await Promise.all([
        fetch('/ocr/ppocr_det.onnx').then((r) => r.arrayBuffer()), fetch('/ocr/ppocr_rec.onnx').then((r) => r.arrayBuffer()), fetch('/ocr/ppocr_keys_v1.txt').then((r) => r.text())]);
      ocr.engine = await (lib.init || lib)({ det: { input: det, ratio: 2.0 }, rec: { input: rec, decodeDic: keys, optimize: { space: false } }, dev: false, ort });
      return ocr.engine;
    })().catch((e) => { ocr.loading = null; throw e; });
  }
  return ocr.loading;
}
const yieldUI = () => new Promise((r) => setTimeout(r, 0));
const hasCJK = (s) => /[⺀-鿿豈-﫿＀-￯]/.test(s);

/** Lines of text of a bitmap with their boxes in the bitmap's own pixels. A tall page is cut into overlapping tiles (a 1080x8000 page fed whole would
 *  run the WASM memory out); each line is kept only in the tile that holds its centre. */
async function ocrLines(bitmap) {
  const engine = await ocrLoad();
  const scale = Math.min(1, OCR_MAX_W / bitmap.width);
  const W = Math.max(1, Math.round(bitmap.width * scale)), H = Math.max(1, Math.round(bitmap.height * scale));
  const tiles = [];
  if (H <= OCR_TILE_H * 1.25) tiles.push([0, H]);
  else for (let y = 0; ; y += OCR_TILE_H - OCR_TILE_OVERLAP) { const end = Math.min(H, y + OCR_TILE_H); tiles.push([y, end]); if (end >= H) break; }
  const cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
  const out = [];
  for (let i = 0; i < tiles.length; i++) {
    const [y0, y1] = tiles[i];
    cv.width = W; cv.height = y1 - y0;
    cx.drawImage(bitmap, 0, y0 / scale, bitmap.width, (y1 - y0) / scale, 0, 0, W, y1 - y0);
    const res = await engine.ocr(cx.getImageData(0, 0, cv.width, cv.height));
    const raw = (res && res.raw) || res;
    const blocks = Array.isArray(raw) ? raw : raw && Array.isArray(raw.src) ? raw.src : raw && Array.isArray(raw.parragraphs) ? raw.parragraphs : [];
    const top = i === 0 ? 0 : y0 + OCR_TILE_OVERLAP / 2, bottom = i === tiles.length - 1 ? H : y1 - OCR_TILE_OVERLAP / 2;
    for (const b of blocks) {
      const text = String((b && b.text) || '').replace(/\s+/g, ' ').trim();
      if (!text || !Array.isArray(b.box) || !b.box.length) continue;
      const xs = b.box.map((p) => p[0]), ys = b.box.map((p) => p[1] + y0);
      const t = Math.min(...ys), bt = Math.max(...ys), c = (t + bt) / 2;
      if (c < top || c >= bottom) continue;
      out.push({ text, l: Math.min(...xs) / scale, r: Math.max(...xs) / scale, t: t / scale, b: bt / scale });
    }
    await yieldUI();
  }
  return out;
}

/** Close lines of about the same size that overlap sideways belong to one bubble. -> [{text, l, t, r, b, lines}] */
function ocrGroup(lines) {
  const sorted = lines.slice().sort((a, b) => (a.t - b.t) || (a.l - b.l));
  const groups = [];
  for (const ln of sorted) {
    const h = ln.b - ln.t;
    let best = null, bestGap = Infinity;
    for (const g of groups) {
      const last = g.lines[g.lines.length - 1], lh = last.b - last.t, ref = Math.min(h, lh), gap = ln.t - last.b;
      if (gap < -0.5 * ref || gap > 1.3 * ref || Math.max(h, lh) > 1.6 * ref) continue;
      if (Math.min(ln.r, g.r) - Math.max(ln.l, g.l) < 0.3 * Math.min(ln.r - ln.l, g.r - g.l)) continue;
      if (Math.abs(gap) < bestGap) { best = g; bestGap = Math.abs(gap); }
    }
    if (best) { best.lines.push(ln); best.l = Math.min(best.l, ln.l); best.r = Math.max(best.r, ln.r); best.b = Math.max(best.b, ln.b); }
    else groups.push({ lines: [ln], l: ln.l, t: ln.t, r: ln.r, b: ln.b });
  }
  return groups.map((g) => ({ ...g, text: g.lines.map((x) => x.text).reduce((a, x) => (a ? a + (hasCJK(a.slice(-1)) || hasCJK(x[0]) ? '' : ' ') + x : x), '') }));
}

/** Paint the translation over the page. blocks: [{l,t,r,b,vi}]. The text area is covered by the colour found just outside it, then the Vietnamese is
 *  fitted into that area (the area grows sideways when a narrow bubble would break the text into one word per line). Returns a blob URL. */
async function ocrRender(bitmap, blocks) {
  const cv = document.createElement('canvas'); cv.width = bitmap.width; cv.height = bitmap.height;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(bitmap, 0, 0);
  const shot = cx.getImageData(0, 0, cv.width, cv.height);   // the untouched page, to sample colours from
  const px = (x, y) => { x = Math.max(0, Math.min(cv.width - 1, x | 0)); y = Math.max(0, Math.min(cv.height - 1, y | 0)); const i = (y * cv.width + x) * 4; return [shot.data[i], shot.data[i + 1], shot.data[i + 2]]; };
  for (const b of blocks) {
    if (!b.vi) continue;
    const pad = Math.max(3, (b.b - b.t) * 0.12);
    let l = b.l - pad, t = b.t - pad, r = b.r + pad, bt = b.b + pad;
    const edge = [];
    for (let x = l; x <= r; x += Math.max(2, (r - l) / 24)) { edge.push(px(x, t - 3), px(x, bt + 3)); }
    for (let y = t; y <= bt; y += Math.max(2, (bt - t) / 24)) { edge.push(px(l - 3, y), px(r + 3, y)); }
    const med = [0, 1, 2].map((k) => edge.map((p) => p[k]).sort((a, c) => a - c)[edge.length >> 1]);
    const spread = Math.max(...[0, 1, 2].map((k) => Math.max(...edge.map((p) => p[k])) - Math.min(...edge.map((p) => p[k]))));
    const dark = (med[0] * 299 + med[1] * 587 + med[2] * 114) / 1000 < 110;
    const bg = spread > 90 ? (dark ? [0, 0, 0] : [255, 255, 255]) : med;   // a busy surround: a plain panel reads better than a smudge
    // narrow areas grow sideways so Vietnamese does not wrap word by word
    const minW = Math.max(130, (bt - t) * 0.9);
    if (r - l < minW) { const c = (l + r) / 2; l = Math.max(0, c - minW / 2); r = Math.min(cv.width, c + minW / 2); }
    cx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
    cx.fillRect(l, t, r - l, bt - t);
    const lum = (bg[0] * 299 + bg[1] * 587 + bg[2] * 114) / 1000;
    const fg = lum < 128 ? '#fff' : '#111', halo = lum < 128 ? '#000' : '#fff';
    const W = r - l - 8, H = bt - t - 4;
    // start from about the size of the original lettering, then shrink until it fits
    let size = Math.min(44, Math.max(12, (b.b - b.t) / Math.max(1, b.n || 1) * 0.95)), lines;
    const wrap = (sz) => {
      cx.font = `600 ${sz}px "Segoe UI", system-ui, sans-serif`;
      const words = b.vi.split(/\s+/), out = []; let cur = '';
      for (const w of words) { const tryS = cur ? cur + ' ' + w : w; if (cx.measureText(tryS).width > W && cur) { out.push(cur); cur = w; } else cur = tryS; }
      if (cur) out.push(cur);
      return out;
    };
    for (; size > 12; size -= 1) { lines = wrap(size); if (lines.length * size * 1.15 <= H && lines.every((s) => cx.measureText(s).width <= W + 1)) break; }
    lines = wrap(size);
    const lh = size * 1.15, total = lines.length * lh;
    let bottom = bt;
    if (total > H + 4) { bottom = t + total + 4; cx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`; cx.fillRect(l, bt, r - l, bottom - bt); }   // minimum size reached: the panel grows downward instead of shrinking the text
    cx.textAlign = 'center'; cx.textBaseline = 'top'; cx.lineJoin = 'round'; cx.lineWidth = Math.max(2, size / 7);
    lines.forEach((s, i) => { const y = t + 2 + (Math.max(H, total) - total) / 2 + i * lh; cx.strokeStyle = halo; cx.strokeText(s, (l + r) / 2, y); cx.fillStyle = fg; cx.fillText(s, (l + r) / 2, y); });
  }
  const blob = await new Promise((ok) => cv.toBlob(ok, 'image/jpeg', 0.9));
  return URL.createObjectURL(blob);
}

async function ocrBitmap(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Không tải được ảnh trang');
  return createImageBitmap(await r.blob());
}

/* Kệ Sách — read aloud for text chapters, with the browser's own voices (Web Speech API): nothing leaves the machine
   except with an "Online" voice, which the browser sends to its vendor (the panel says so).
   Same behaviour as Trạm Dịch's reader: split on sentence ends, follow by word / sentence / paragraph, a voice that
   never reports word positions is remembered and falls back to sentences, auto-scroll, next chapter, sleep timer. */
'use strict';
const TTS_DEFAULTS = { voiceURI: '', rate: 1, pitch: 1, volume: 1, maxChars: 220, gapMs: 120, follow: 'word', noWord: [], autoScroll: true, autoNext: true, sleepMinutes: 0 };
const tts = {
  cfg: { ...TTS_DEFAULTS, ...store('tts', {}) },
  el: null, segs: [], idx: 0, token: 0, reading: false, paused: false, blocked: false,
  voices: [], errStreak: 0, sawBoundary: false, utter: null, sleepAt: 0, sleepTimer: 0, onNext: null, note: '',
};
if (!['word', 'sentence', 'para'].includes(tts.cfg.follow)) tts.cfg.follow = 'word';
if (!Array.isArray(tts.cfg.noWord)) tts.cfg.noWord = [];
const ttsSave = () => save('tts', tts.cfg);
const ttsNum = (v, lo, hi, d) => (isFinite(+v) ? Math.min(hi, Math.max(lo, +v)) : d);
const HL_SEG = 'tts-seg', HL_WORD = 'tts-word';
const canHL = typeof CSS !== 'undefined' && CSS.highlights && typeof Highlight === 'function';
const hasTTS = 'speechSynthesis' in window;

function ttsLoadVoices() { try { tts.voices = speechSynthesis.getVoices() || []; } catch { tts.voices = []; } return tts.voices; }
function ttsVoice() {
  const vs = tts.voices.length ? tts.voices : ttsLoadVoices();
  return vs.find((v) => v.voiceURI === tts.cfg.voiceURI) || vs.find((v) => /^vi(-|_|$)/i.test(v.lang)) || vs.find((v) => v.default) || vs[0] || null;
}
const ttsNoWord = () => tts.cfg.noWord.includes(ttsVoice()?.voiceURI || '');
const ttsMode = () => (tts.cfg.follow === 'word' && ttsNoWord() ? 'sentence' : tts.cfg.follow);

/* ---------- segments ---------- */
const SENT = /[^.!?…。！？\n]+[.!?…。！？]+["”')\]]*|[^.!?…。！？\n]+$/g;
function ttsSentences(text, a, b) {
  const part = text.slice(a, b), out = [];
  let m; SENT.lastIndex = 0;
  while ((m = SENT.exec(part))) {
    const lead = m[0].length - m[0].trimStart().length, tail = m[0].length - m[0].trimEnd().length;
    if (m[0].trim()) out.push([a + m.index + lead, a + m.index + m[0].length - tail]);
  }
  return out.length ? out : [[a, b]];
}
/** Pieces up to maxChars, cut at sentence ends (then commas, then spaces): one long utterance stalls some engines. */
function ttsSplit(text, maxChars) {
  const out = [], n = text.length, HARD = '.!?…。！？', SOFT = ',;:—–)"”，；：';
  let i = 0;
  while (i < n) {
    while (i < n && /\s/.test(text[i])) i++;
    if (i >= n) break;
    let end = Math.min(n, i + maxChars);
    if (end < n) {
      const floor = i + Math.floor(maxChars * 0.4);
      let cut = -1;
      for (let j = end; j > floor; j--) if (HARD.includes(text[j - 1])) { cut = j; break; }
      if (cut < 0) for (let j = end; j > floor; j--) if (SOFT.includes(text[j - 1])) { cut = j; break; }
      if (cut < 0) { cut = text.lastIndexOf(' ', end); if (cut <= i) cut = end; }
      end = cut;
    }
    let e = end;
    while (e > i && /\s/.test(text[e - 1])) e--;
    if (e > i) out.push([i, e]);
    i = end;
  }
  return out;
}
function ttsBuild(fromP = 0) {
  tts.segs = [];
  const max = ttsNum(tts.cfg.maxChars, 60, 600, 220), sentence = ttsMode() === 'sentence';
  $$('p:not(.orig)', tts.el).forEach((el, p) => {
    if (p < fromP) return;
    const text = el.textContent;
    if (text.replace(/\s/g, '').length < 2) return;
    for (const [a, b] of ttsSplit(text, max)) {
      for (const [x, y] of sentence ? ttsSentences(text, a, b) : [[a, b]]) tts.segs.push({ el, a: x, b: y, p });
    }
  });
  return tts.segs.length;
}
function ttsTopParagraph() {
  const body = $('#r-body'), top = body.getBoundingClientRect().top;
  const ps = $$('p:not(.orig)', tts.el);
  const i = ps.findIndex((p) => p.getBoundingClientRect().bottom > top + 8);
  return Math.max(0, i);
}

/* ---------- highlight / scroll ---------- */
function ttsRange(el, a, b) {
  const n = el.firstChild;
  if (!n || n.nodeType !== 3) return null;
  const r = document.createRange();
  try { r.setStart(n, a); r.setEnd(n, Math.min(b, n.nodeValue.length)); } catch { return null; }
  return r;
}
function ttsClearHL() {
  if (canHL) { try { CSS.highlights.delete(HL_SEG); CSS.highlights.delete(HL_WORD); } catch { /* old engine */ } }
  $$('.tts-on').forEach((e) => e.classList.remove('tts-on'));
}
function ttsMark(seg) {
  ttsClearHL();
  seg.el.classList.add('tts-on');
  if (!canHL || ttsMode() === 'para') return;
  const r = ttsRange(seg.el, seg.a, seg.b);
  if (r) { try { CSS.highlights.set(HL_SEG, new Highlight(r)); } catch { /* ignore */ } }
}
function ttsScrollTo(rect) {
  if (!tts.cfg.autoScroll || !rect) return;
  const body = $('#r-body'), b = body.getBoundingClientRect();
  if (rect.top < b.top + 40 || rect.bottom > b.bottom - 60) body.scrollBy({ top: rect.top - (b.top + b.height * 0.3), behavior: 'smooth' });
}

/* ---------- playing ---------- */
function ttsStatus(msg) { tts.note = msg || ''; const n = $('#tts-note'); if (n) n.textContent = tts.note; ttsBtn(); }
function ttsBtn() {
  const b = $('#tts-play'); if (!b) return;
  b.textContent = tts.reading && !tts.paused ? '⏸ Tạm dừng' : tts.reading ? '▶ Đọc tiếp' : '▶ Đọc từ đoạn này';
  const s = $('#tts-stop'); if (s) s.hidden = !tts.reading;
}
function ttsStopSpeech() { tts.token++; try { speechSynthesis.cancel(); } catch { /* ignore */ } tts.utter = null; }

function ttsSpeak(i) {
  if (i >= tts.segs.length) return ttsFinished();
  tts.idx = Math.max(0, i);
  const seg = tts.segs[tts.idx];
  if (!seg.el.isConnected) return ttsStop();
  const spoken = seg.el.textContent.slice(seg.a, seg.b);
  ttsMark(seg);
  ttsScrollTo(seg.el.getBoundingClientRect());
  const u = new SpeechSynthesisUtterance(spoken), v = ttsVoice();
  if (v) { u.voice = v; u.lang = v.lang; }
  u.rate = ttsNum(tts.cfg.rate, 0.5, 3, 1); u.pitch = ttsNum(tts.cfg.pitch, 0, 2, 1); u.volume = ttsNum(tts.cfg.volume, 0, 1, 1);
  const tok = ++tts.token;
  u.onstart = () => { if (tok === tts.token) tts.errStreak = 0; };
  u.onboundary = (ev) => {
    if (tok !== tts.token || ttsMode() !== 'word' || !canHL) return;
    tts.sawBoundary = true;
    const a = seg.a + (ev.charIndex || 0);
    const r = ttsRange(seg.el, a, a + (ev.charLength || spoken.slice(ev.charIndex || 0).split(/\s/)[0].length || 1));
    if (!r) return;
    try { CSS.highlights.set(HL_WORD, new Highlight(r)); } catch { /* ignore */ }
    ttsScrollTo(r.getBoundingClientRect());
  };
  u.onend = () => {
    if (tok !== tts.token) return;
    if (!tts.sawBoundary && ttsMode() === 'word' && canHL && spoken.length > 60) {   // this voice never reports words
      const vid = ttsVoice()?.voiceURI || '';
      if (vid && !tts.cfg.noWord.includes(vid)) { tts.cfg.noWord.push(vid); ttsSave(); }
      tts.segs = [...tts.segs.slice(0, tts.idx + 1), ...tts.segs.slice(tts.idx + 1).flatMap((s) => ttsSentences(s.el.textContent, s.a, s.b).map(([a, b]) => ({ ...s, a, b })))];
      ttsStatus('Giọng này không báo vị trí từ — đang tô theo câu.');
      ttsPanel();
    }
    setTimeout(() => { if (tok === tts.token && tts.reading && !tts.paused) ttsSpeak(tts.idx + 1); }, ttsNum(tts.cfg.gapMs, 0, 2000, 120));
  };
  u.onerror = (ev) => {
    if (tok !== tts.token) return;
    const err = ev?.error || 'unknown';
    if (err === 'interrupted' || err === 'canceled') return;
    if (err === 'not-allowed') return ttsWaitGesture();
    if (++tts.errStreak >= 3) { ttsStop(); ttsStatus(`Dừng vì giọng đọc lỗi liên tiếp (${err}). Thử đổi giọng khác.`); return; }
    ttsStatus(`Lỗi ở đoạn ${tts.idx + 1} (${err}), bỏ qua…`);
    setTimeout(() => { if (tok === tts.token && tts.reading && !tts.paused) ttsSpeak(tts.idx + 1); }, 250);
  };
  tts.utter = u;   // keep the reference: Chrome garbage-collects a speaking utterance and cuts out
  try { speechSynthesis.cancel(); } catch { /* ignore */ }
  setTimeout(() => {
    if (tok !== tts.token) return;
    try { if (speechSynthesis.paused) speechSynthesis.resume(); speechSynthesis.speak(u); } catch (e) { ttsStatus('Không phát được: ' + e.message); }
  }, 0);
}
function ttsWaitGesture() {
  tts.blocked = true; ttsStopSpeech();
  ttsStatus('Trình duyệt chặn tự đọc khi trang chưa được chạm. Chạm vào trang để đọc tiếp.');
  const go = () => { window.removeEventListener('pointerdown', go, true); if (tts.blocked && tts.reading) { tts.blocked = false; ttsSpeak(tts.idx); ttsStatus('Đang đọc'); } };
  window.addEventListener('pointerdown', go, true);
}
function ttsFinished() {
  const next = tts.cfg.autoNext && tts.onNext;
  ttsStop();
  if (next) { ttsStatus('Hết chương, sang chương sau…'); tts.onNext(true); } else ttsStatus('Đã đọc hết chương.');
}
function ttsPlay() {
  if (!hasTTS) return toast('Trình duyệt này không có giọng đọc', true);
  if (tts.reading && tts.paused) { tts.paused = false; ttsSpeak(tts.idx); ttsStatus('Đang đọc'); return; }   // resume() alone loses the utterance on some builds
  if (tts.reading) return;
  if (!ttsBuild(ttsTopParagraph())) return toast('Chương này chưa có chữ để đọc', true);
  Object.assign(tts, { reading: true, paused: false, idx: 0, errStreak: 0, sawBoundary: false });
  ttsArmSleep(); ttsStatus('Đang đọc'); ttsSpeak(0);
}
function ttsPause() { if (!tts.reading || tts.paused) return; tts.paused = true; ttsStopSpeech(); ttsStatus('Tạm dừng'); }
function ttsStop() { tts.reading = false; tts.paused = false; tts.blocked = false; ttsStopSpeech(); ttsClearHL(); clearTimeout(tts.sleepTimer); ttsStatus(''); }
function ttsJump(d) {
  if (!tts.reading) return;
  tts.idx = Math.max(0, Math.min(tts.segs.length - 1, tts.idx + d));
  tts.paused ? ttsMark(tts.segs[tts.idx]) : ttsSpeak(tts.idx);
}
function ttsArmSleep() {
  clearTimeout(tts.sleepTimer);
  const m = ttsNum(tts.cfg.sleepMinutes, 0, 600, 0);
  if (m && tts.reading) tts.sleepTimer = setTimeout(() => { ttsStop(); ttsStatus(`Đã dừng theo hẹn giờ (${m} phút).`); }, m * 60000);
}

/* ---------- panel ---------- */
function ttsPanel() {
  const box = $('#tts-panel'); if (!box) return;
  const c = tts.cfg;
  if (!hasTTS) { box.innerHTML = '<p class="warn small">Trình duyệt này không có giọng đọc (Web Speech API).</p>'; return; }
  const voices = tts.voices.length ? tts.voices : ttsLoadVoices();
  const online = voices.some((v) => /online|natural/i.test(v.name));
  const slider = (k, label, lo, hi, step, fmt) => `<label class="slider"><span>${label}</span><b id="tv-${k}">${fmt(c[k])}</b><input type="range" min="${lo}" max="${hi}" step="${step}" value="${c[k]}" data-tk="${k}" aria-label="${label}"></label>`;
  const noWord = ttsNoWord();
  box.innerHTML = `<div class="tts-row">
      <button class="btn primary" id="tts-play"></button><button class="btn" id="tts-prev" title="Đoạn trước">⏮</button><button class="btn" id="tts-next" title="Đoạn sau">⏭</button><button class="btn" id="tts-stop" hidden>Dừng hẳn</button>
      <span class="muted small" id="tts-note">${esc(tts.note || 'Bắt đầu từ đoạn đang ở đầu màn hình.')}</span></div>
    <div class="tts-grid">
      <label class="field">Giọng<select id="tts-voice" data-tk="voiceURI" aria-label="Giọng đọc">${voices.length ? voices.map((v) => `<option value="${esc(v.voiceURI)}"${v.voiceURI === (c.voiceURI || ttsVoice()?.voiceURI) ? ' selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('') : '<option value="">Chưa thấy giọng nào</option>'}</select></label>
      ${slider('rate', 'Tốc độ', 0.5, 3, 0.05, (v) => (+v).toFixed(2) + '×')}${slider('pitch', 'Cao độ', 0, 2, 0.05, (v) => (+v).toFixed(2))}${slider('volume', 'Âm lượng', 0, 1, 0.05, (v) => Math.round(v * 100) + '%')}
      <div class="field"><span>Tô theo</span><div class="seg" role="group" aria-label="Tô theo">${[['word', 'Từ'], ['sentence', 'Câu'], ['para', 'Đoạn']].map(([k, l]) => { const off = k === 'word' && noWord; return `<button data-follow="${k}" class="${ttsMode() === k ? 'on' : ''}"${off ? ' disabled' : ''} aria-pressed="${ttsMode() === k}">${off ? `<s>${l}</s>` : l}</button>`; }).join('')}</div></div>
      <label class="field">Hẹn giờ ngủ (phút, 0 = tắt)<input type="number" min="0" max="600" value="${c.sleepMinutes}" data-tk="sleepMinutes"></label>
      <label class="check"><input type="checkbox" data-tk="autoScroll"${c.autoScroll ? ' checked' : ''}> Tự cuộn theo chỗ đang đọc</label>
      <label class="check"><input type="checkbox" data-tk="autoNext"${c.autoNext ? ' checked' : ''}> Hết chương đọc tiếp chương sau</label></div>
    ${ttsMode() !== c.follow ? '<p class="small"><b>Đang tô theo câu.</b> <span class="muted">Giọng này không báo vị trí từng từ. Chọn giọng chạy trên máy (không có chữ Online) để tô theo từ.</span></p>' : ''}
    ${voices.some((v) => /^vi(-|_|$)/i.test(v.lang)) ? '' : '<p class="warn small">Máy chưa có giọng tiếng Việt. Mở bằng Microsoft Edge để dùng giọng Việt của Edge, hoặc cài gói giọng trong Windows.</p>'}
    <p class="muted small">Giọng chạy trên máy.${online ? ' Giọng có chữ <b>Online (Natural)</b> là giọng đám mây: trình duyệt gửi đoạn chữ lên server của hãng để tổng hợp.' : ''}</p>`;
  ttsBtn();
}
function ttsPanelEvents(box) {
  box.addEventListener('input', (e) => {
    const k = e.target.dataset.tk; if (!k) return;
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'range' || e.target.type === 'number' ? +e.target.value : e.target.value;
    tts.cfg[k] = v; ttsSave();
    const out = $('#tv-' + k);
    if (out) out.textContent = k === 'volume' ? Math.round(v * 100) + '%' : k === 'rate' ? v.toFixed(2) + '×' : (+v).toFixed(2);
    if (k === 'sleepMinutes') ttsArmSleep();
    if (k === 'voiceURI') ttsPanel();
    if (['rate', 'pitch', 'volume', 'voiceURI'].includes(k) && tts.reading && !tts.paused) ttsSpeak(tts.idx);
  });
  box.addEventListener('click', (e) => {
    const f = e.target.closest('[data-follow]');
    if (f && !f.disabled) {
      tts.cfg.follow = f.dataset.follow; ttsSave();
      if (tts.reading) { const at = tts.segs[tts.idx]; ttsBuild(at?.p ?? 0); tts.idx = 0; tts.paused ? ttsMark(tts.segs[0]) : ttsSpeak(0); }
      return ttsPanel();
    }
    const id = e.target.closest('button')?.id;
    if (id === 'tts-play') { tts.reading && !tts.paused ? ttsPause() : ttsPlay(); }
    if (id === 'tts-stop') ttsStop();
    if (id === 'tts-prev') ttsJump(-1);
    if (id === 'tts-next') ttsJump(1);
  });
}
/** Called by the reader once a text chapter is on screen. onNext(true) opens the next chapter and keeps reading. */
function ttsMount(articleEl, onNext) {
  ttsStop(); tts.el = articleEl; tts.onNext = onNext;
  const box = $('#tts-panel');
  if (box && !box.dataset.bound) { box.dataset.bound = '1'; ttsPanelEvents(box); }
  ttsPanel();
}
if (hasTTS) { ttsLoadVoices(); speechSynthesis.onvoiceschanged = () => { ttsLoadVoices(); ttsPanel(); }; }

/* Đọc thành tiếng — port of TTS_Reader_Universal 2.2.0 (AureLyns) into the reader.

   The userscript had to guess where a page's text was; here the chapter is already split into
   paragraphs, so the scraping half is gone. What is kept is the part that took the bruises:
   chunking by character budget on sentence ends, word highlight through onboundary, auto-scroll,
   auto next chapter, replacement rules, sleep timer, and the workarounds for a speechSynthesis
   that stalls, swallows `end`, or refuses to start before the page has been touched.

   Everything runs in the browser's own voice engine. No audio, no text and no vault content
   leaves the machine. */

const TTS_DEFAULTS = {
  voiceURI: '', rate: 1, pitch: 1, volume: 1,
  maxChars: 220, gapMs: 120,
  follow: '', noWord: [], autoScroll: true, autoNext: true,
  sleepMinutes: 0, rulesOn: false, rules: '',
};

const tts = {
  cfg: { ...TTS_DEFAULTS, ...store('tts', {}) },
  segs: [], idx: 0, token: 0,
  reading: false, paused: false, blocked: false,
  voices: [], lastEvt: 0, retry: 0, errStreak: 0, sleepAt: 0,
  warnedBoundary: false, utter: null, note: '',
};

// What gets painted while reading (design round 10): word | sentence | para. Old setting highlightWords:false meant "whole chunk only".
if (!['word', 'sentence', 'para'].includes(tts.cfg.follow)) tts.cfg.follow = tts.cfg.highlightWords === false ? 'para' : 'word';
if (!Array.isArray(tts.cfg.noWord)) tts.cfg.noWord = [];
const ttsSave = () => save('tts', tts.cfg);
/** Voices that never send word positions are remembered, so "word" quietly becomes "sentence" for them. */
const ttsNoWord = () => tts.cfg.noWord.includes(tts.cfg.voiceURI || ttsVoice()?.voiceURI || '');
const ttsMode = () => (tts.cfg.follow === 'word' && (ttsNoWord() || tts.cfg.rulesOn) ? 'sentence' : tts.cfg.follow);
const ttsNum = (v, lo, hi, d) => (isFinite(+v) ? Math.min(hi, Math.max(lo, +v)) : d);
const HL_SEG = 'tts-seg', HL_WORD = 'tts-word';
const canHighlight = typeof CSS !== 'undefined' && CSS.highlights && typeof Highlight === 'function';

/* ---------- what to read ---------- */

/** Text nodes of a paragraph plus their offsets, so a character range can become a DOM Range. */
function ttsTextMap(el) {
  const map = [];
  let text = '';
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    if (n.parentElement.closest('.para-edit-bar, .src-peek')) continue;
    map.push({ node: n, at: text.length });
    text += n.nodeValue;
  }
  return { text, map };
}

function ttsRange(el, a, b) {
  const { map } = el._ttsMap || (el._ttsMap = ttsTextMap(el));
  const find = (pos) => {
    let hit = map[0];
    for (const m of map) { if (m.at <= pos) hit = m; else break; }
    return hit ? [hit.node, Math.max(0, Math.min(pos - hit.at, hit.node.nodeValue.length))] : null;
  };
  const s = find(a), e = find(b);
  if (!s || !e) return null;
  const r = document.createRange();
  try { r.setStart(s[0], s[1]); r.setEnd(e[0], e[1]); } catch { return null; }
  return r;
}

/** Split on sentence ends inside a character budget — a whole paragraph in one utterance stalls. */
function ttsSplit(text, maxChars) {
  const out = [], n = text.length, HARD = '.!?…\n', SOFT = ',;:—–)"”';
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

/** One sentence per utterance, so the painted range is the sentence being spoken. */
function ttsSentences(text, [a, b]) {
  const out = [], re = /[^.!?…。！？\n]+[.!?…。！？]+["”')\]]*|[^.!?…。！？\n]+$/g, part = text.slice(a, b);
  let m;
  while ((m = re.exec(part))) {
    const lead = m[0].length - m[0].trimStart().length, tail = m[0].length - m[0].trimEnd().length;
    if (m[0].trim()) out.push([a + m.index + lead, a + m.index + m[0].length - tail]);
  }
  return out.length ? out : [[a, b]];
}
function ttsUnits(text) {
  const units = ttsSplit(text, ttsNum(tts.cfg.maxChars, 60, 600, 220));
  return ttsMode() === 'sentence' ? units.flatMap((u) => ttsSentences(text, u)) : units;
}

/** Build segments from what is on screen, so it reads the text you are actually looking at. */
function ttsBuild(startCid = null, startPara = 0) {
  tts.segs = [];
  if (readerState.writing) {   // the writing desk: read Aurel's version from its listening pane (desk.js)
    for (const el of $$('#d-listen [data-p]')) {
      if (+el.dataset.p < startPara) continue;
      const { text } = el._ttsMap = ttsTextMap(el);
      for (const [a, b] of ttsUnits(text)) {
        tts.segs.push({ el, a, b, cid: readerState.chapter.id, p: +el.dataset.p });
      }
    }
    return tts.segs.length;
  }
  const arts = $$('#r-secs > article');
  let seen = !startCid;
  for (const art of arts) {
    if (!seen && art.dataset.cid !== String(startCid)) continue;
    seen = true;
    for (const p of $$('[data-p]', art)) {
      if (art.dataset.cid === String(startCid) && Number(p.dataset.p) < startPara) continue;
      const el = $('p.vi', p) || p;
      delete el._ttsMap;
      const { text } = el._ttsMap = ttsTextMap(el);
      const clean = text.trim();
      if (clean.replace(/\s/g, '').length < 2) continue;
      for (const [a, b] of ttsUnits(text)) {
        tts.segs.push({ el, a, b, cid: +art.dataset.cid, p: +p.dataset.p });
      }
    }
  }
  return tts.segs.length;
}

/* ---------- replacement rules: "from => to", "re:pattern => to" ---------- */

let ttsRulesCache = { src: null, list: [] };
function ttsRules() {
  if (ttsRulesCache.src !== tts.cfg.rules) {
    ttsRulesCache = {
      src: tts.cfg.rules,
      list: String(tts.cfg.rules || '').split('\n').map((line) => {
        line = line.trim();
        if (!line || line.startsWith('#') || !line.includes('=>')) return null;
        const i = line.indexOf('=>');
        const from = line.slice(0, i).trim();
        if (!from) return null;
        return /^re:/i.test(from) ? { re: true, from: from.slice(3).trim(), to: line.slice(i + 2) }
                                  : { re: false, from, to: line.slice(i + 2) };
      }).filter(Boolean),
    };
  }
  return ttsRulesCache.list;
}

function ttsApplyRules(t) {
  if (!tts.cfg.rulesOn) return t;
  let out = t;
  for (const r of ttsRules()) {
    try { out = r.re ? out.replace(new RegExp(r.from, 'gi'), r.to) : out.split(r.from).join(r.to); }
    catch { /* a broken rule is skipped, it must not kill the rest */ }
  }
  return out;
}

/* ---------- voices ---------- */

function ttsLoadVoices() {
  try { tts.voices = speechSynthesis.getVoices() || []; } catch { tts.voices = []; }
  return tts.voices;
}

function ttsVoice() {
  const vs = tts.voices.length ? tts.voices : ttsLoadVoices();
  if (!vs.length) return null;
  return vs.find((v) => v.voiceURI === tts.cfg.voiceURI)
    || vs.find((v) => /^vi(-|_|$)/i.test(v.lang))
    || vs.find((v) => v.default) || vs[0];
}

/* ---------- highlight and scroll ---------- */

function ttsClearHL() {
  if (canHighlight) { try { CSS.highlights.delete(HL_SEG); CSS.highlights.delete(HL_WORD); } catch {} }
  $$('.tts-on').forEach((el) => el.classList.remove('tts-on'));
}

function ttsMark(seg) {
  ttsClearHL();
  const el = seg.el;
  el.classList.add('tts-on');
  if (!canHighlight || ttsMode() === 'para') return;
  const r = ttsRange(el, seg.a, seg.b);
  if (r) { try { CSS.highlights.set(HL_SEG, new Highlight(r)); } catch {} }
}

function ttsScrollTo(rect) {
  if (!tts.cfg.autoScroll || !rect) return;
  const box = readerState.writing && $('#d-listen');
  if (box) {                   // the desk scrolls inside its own column, not the window
    const b = box.getBoundingClientRect();
    if (rect.top < b.top + 8 || rect.bottom > b.bottom - 8) box.scrollBy({ top: rect.top - (b.top + b.height * 0.3), behavior: 'smooth' });
    return;
  }
  const head = ($('.reader-top')?.offsetHeight || 0) + 20;
  const foot = window.innerHeight - 140;
  if (rect.top >= head && rect.bottom <= foot) return;
  window.scrollBy({ top: rect.top - (head + (foot - head) * 0.3), behavior: 'smooth' });
}

/* ---------- playing ---------- */

function ttsStopSpeech() {
  tts.token++;
  try { speechSynthesis.cancel(); } catch {}
  tts.utter = null;
}

function ttsStatus(msg) {
  tts.note = msg || '';
  ttsRenderBar();
  if ($('#rdrawer')?.dataset.k === 'tts') $('#tts-note') && ($('#tts-note').textContent = tts.note);
}

function ttsSpeak(i) {
  if (!tts.segs.length) { ttsStatus('Không có gì để đọc'); return; }
  if (i >= tts.segs.length) return ttsFinished();
  tts.idx = Math.max(0, i);
  const seg = tts.segs[tts.idx];
  if (!seg.el.isConnected) { if (readerState.writing) ttsStop(); else ttsRescan(); return; }
  const raw = seg.el._ttsMap.text.slice(seg.a, seg.b);
  const spoken = ttsApplyRules(raw);
  const sameText = spoken === raw;   // rules shift charIndex, so word highlight is off then

  ttsMark(seg);
  ttsScrollTo(seg.el.getBoundingClientRect());
  ttsRenderBar();

  const u = new SpeechSynthesisUtterance(spoken);
  const v = ttsVoice();
  if (v) { u.voice = v; u.lang = v.lang; }
  u.rate = ttsNum(tts.cfg.rate, 0.5, 3, 1);
  u.pitch = ttsNum(tts.cfg.pitch, 0, 2, 1);
  u.volume = ttsNum(tts.cfg.volume, 0, 1, 1);

  const tok = ++tts.token;
  tts.lastEvt = Date.now();

  u.onstart = () => { if (tok === tts.token) { tts.lastEvt = Date.now(); tts.errStreak = 0; } };
  u.onboundary = (ev) => {
    if (tok !== tts.token || !sameText || ttsMode() !== 'word' || !canHighlight) return;
    tts.lastEvt = Date.now();
    tts.sawBoundary = true;
    const a = seg.a + (ev.charIndex || 0);
    const r = ttsRange(seg.el, a, a + (ev.charLength || raw.slice(ev.charIndex || 0).split(/\s/)[0].length || 1));
    if (!r) return;
    try { CSS.highlights.set(HL_WORD, new Highlight(r)); } catch {}
    ttsScrollTo(r.getBoundingClientRect());
  };
  u.onend = () => {
    if (tok !== tts.token) return;
    tts.lastEvt = Date.now(); tts.retry = 0;
    // some voices (most Android engines, maybe the online ones) never fire onboundary: remember it and paint by sentence
    if (!tts.sawBoundary && ttsMode() === 'word' && canHighlight && sameText && spoken.length > 60) {
      const vid = tts.cfg.voiceURI || ttsVoice()?.voiceURI || '';
      if (vid && !tts.cfg.noWord.includes(vid)) { tts.cfg.noWord.push(vid); ttsSave(); }
      tts.segs = [...tts.segs.slice(0, tts.idx + 1), ...tts.segs.slice(tts.idx + 1).flatMap((s) => {
        const t = s.el._ttsMap?.text; return t ? ttsSentences(t, [s.a, s.b]).map(([a, b]) => ({ ...s, a, b })) : [s]; })];
      ttsStatus('Giọng này không báo vị trí từ — đang tô theo câu.');
      if ($('#rdrawer')?.dataset.k === 'tts') drawDrawer();
    }
    setTimeout(() => {
      if (tok === tts.token && tts.reading && !tts.paused) ttsSpeak(tts.idx + 1);
    }, ttsNum(tts.cfg.gapMs, 0, 2000, 120));
  };
  u.onerror = (ev) => {
    if (tok !== tts.token) return;
    const err = ev?.error || 'unknown';
    if (err === 'interrupted' || err === 'canceled') return;
    if (err === 'not-allowed') return ttsWaitGesture();
    tts.errStreak++;
    if (tts.errStreak >= 3) { ttsStop(); ttsStatus(`Dừng vì giọng đọc lỗi liên tiếp (${err}). Thử đổi giọng khác.`); return; }
    ttsStatus(`Lỗi ở đoạn ${tts.idx + 1} (${err}), bỏ qua…`);
    setTimeout(() => { if (tok === tts.token && tts.reading && !tts.paused) ttsSpeak(tts.idx + 1); }, 250);
  };

  tts.utter = u;   // keep the reference: Chrome garbage-collects a speaking utterance and cuts out
  try { speechSynthesis.cancel(); } catch {}
  setTimeout(() => {
    if (tok !== tts.token) return;
    try { if (speechSynthesis.paused) speechSynthesis.resume(); } catch {}   // cancel() while paused leaves it mute
    try { speechSynthesis.speak(u); } catch (e) { ttsStatus('Không phát được: ' + e.message); }
  }, 0);
}

function ttsOnGesture(e) {
  if (e.target.closest?.('#tts-bar, #rdrawer')) return;
  ttsUnarmGesture();
  if (tts.blocked && tts.reading) { tts.blocked = false; ttsSpeak(tts.idx); ttsStatus('Đang đọc'); }
}
function ttsArmGesture() { window.addEventListener('pointerdown', ttsOnGesture, true); }
function ttsUnarmGesture() { window.removeEventListener('pointerdown', ttsOnGesture, true); }
function ttsWaitGesture() {
  tts.blocked = true;
  ttsStopSpeech();
  ttsArmGesture();
  ttsStatus('Trình duyệt chặn tự đọc khi trang chưa được chạm. Chạm vào trang để đọc tiếp.');
}

function ttsPlay() {
  if (!('speechSynthesis' in window)) { toast('Trình duyệt này không có giọng đọc', true); return; }
  if (tts.blocked) { tts.blocked = false; ttsUnarmGesture(); if (tts.reading) { ttsSpeak(tts.idx); return; } }
  if (tts.reading && tts.paused) {
    tts.paused = false;
    ttsSpeak(tts.idx);   // resume() alone loses the utterance on some builds
    ttsMedia('playing'); ttsStatus('Đang đọc');
    return;
  }
  if (tts.reading) return;
  const ch = readerState.chapter;
  if (!ch) return;
  const top = readerState.writing ? deskListenPrepare() : ttsParagraphAtTop();
  if (!ttsBuild(ch.id, top)) {
    if (readerState.writing) deskListenDone(); toast('Chương này chưa có nội dung để đọc', true); return; }
  tts.reading = true; tts.paused = false; tts.idx = 0; tts.errStreak = 0; tts.sawBoundary = false;
  ttsArmSleep();
  ttsMedia('playing');
  ttsStatus('Đang đọc');
  ttsSpeak(0);
}

function ttsPause() {
  if (!tts.reading || tts.paused) return;
  tts.paused = true;
  ttsStopSpeech();
  ttsMedia('paused');
  ttsStatus('Tạm dừng');
}

function ttsStop() {
  tts.reading = false; tts.paused = false; tts.blocked = false;
  ttsStopSpeech();
  ttsUnarmGesture();
  ttsClearHL();
  ttsMedia('none');
  ttsStatus('');
  if (typeof deskListenDone === 'function') deskListenDone();
}

function ttsJump(d) {
  if (!tts.reading) return;
  const i = Math.max(0, Math.min(tts.segs.length - 1, tts.idx + d));
  tts.idx = i;
  if (tts.paused) { ttsMark(tts.segs[i]); ttsRenderBar(); return; }
  ttsSpeak(i);
}

/** The page was re-rendered (mode switch, edit, name change): rebuild and carry on. */
function ttsRescan() {
  if (!tts.reading) return;
  const at = tts.segs[tts.idx];
  const cid = at?.cid ?? readerState.chapter?.id;
  const p = at?.p ?? 0;
  if (!ttsBuild(cid, p)) { ttsStop(); return; }
  tts.idx = 0;
  if (!tts.paused) ttsSpeak(0); else ttsMark(tts.segs[0]);
}

function ttsParagraphAtTop() {
  const art = $(`article.ch-sec[data-cid="${readerState.chapter?.id}"]`);
  if (!art) return 0;
  const head = ($('.reader-top')?.offsetHeight || 0) + 44;
  const p = $$('[data-p]', art).find((x) => x.getBoundingClientRect().bottom > head);
  return p ? Number(p.dataset.p) : 0;
}

async function ttsFinished() {
  ttsClearHL();
  const last = tts.segs[tts.segs.length - 1];
  const ch = loadedChapter(last?.cid) || readerState.chapter;
  if (tts.cfg.autoNext && ch?.next_id && !readerState.writing) {
    ttsStatus('Xong chương, sang chương sau…');
    if (!$(`article.ch-sec[data-cid="${ch.next_id}"]`)) {
      if (typeof continuous === 'function' && continuous()) await appendNext();
      else { await loadChapter(ch.next_id); }
    }
    if (!tts.reading) return;
    if (!ttsBuild(ch.next_id, 0)) { ttsStop(); ttsStatus('Chương sau chưa có nội dung'); return; }
    tts.idx = 0;
    ttsStatus('Đang đọc');
    ttsSpeak(0);
    return;
  }
  tts.reading = false; tts.paused = false;
  ttsMedia('none');
  ttsStatus('Đã đọc hết');
  ttsRenderBar();
  if (readerState.writing) deskListenDone();
}

function ttsArmSleep() {
  const m = ttsNum(tts.cfg.sleepMinutes, 0, 600, 0);
  tts.sleepAt = m > 0 ? Date.now() + m * 60000 : 0;
}

/* Chrome/Edge freeze speechSynthesis after ~15s and sometimes swallow `end`. */
setInterval(() => {
  if (!tts.reading || tts.paused || tts.blocked) return;
  try { if (speechSynthesis.speaking && !speechSynthesis.paused) speechSynthesis.resume(); } catch {}
  if (tts.sleepAt && Date.now() >= tts.sleepAt) { tts.sleepAt = 0; ttsStop(); toast('Hết giờ hẹn ngủ'); return; }
  if (Date.now() - tts.lastEvt > 12000 && !speechSynthesis.speaking && !speechSynthesis.pending) {
    if (tts.retry < 2) { tts.retry++; ttsSpeak(tts.idx); }
    else { tts.retry = 0; ttsSpeak(tts.idx + 1); }
  }
}, 4000);

window.addEventListener('pagehide', () => { try { speechSynthesis.cancel(); } catch {} });
window.addEventListener('beforeunload', () => { try { speechSynthesis.cancel(); } catch {} });
try { speechSynthesis.onvoiceschanged = () => { ttsLoadVoices(); if ($('#tts-voice')) drawDrawer(); }; } catch {}

/* ---------- media keys / lock screen ---------- */

let ttsMediaBound = false;
function ttsMedia(state) {
  if (!('mediaSession' in navigator)) return;
  try {
    if (!ttsMediaBound) {
      ttsMediaBound = true;
      navigator.mediaSession.setActionHandler('play', () => ttsPlay());
      navigator.mediaSession.setActionHandler('pause', () => ttsPause());
      navigator.mediaSession.setActionHandler('stop', () => ttsStop());
      navigator.mediaSession.setActionHandler('previoustrack', () => ttsJump(-1));
      navigator.mediaSession.setActionHandler('nexttrack', () => ttsJump(1));
    }
    navigator.mediaSession.playbackState = state;
    const ch = readerState.chapter, b = readerState.book;
    if (ch && b && state !== 'none') {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: ch.title_vi || ch.title, artist: b.title_vi || b.title, album: 'Trạm Dịch',
      });
    }
  } catch {}
}

/* ---------- the bar at the bottom while reading ---------- */

function ttsRenderBar() {
  let bar = $('#tts-bar');
  const on = tts.reading || tts.blocked;
  if (!on || currentView !== 'read') { bar?.remove(); return; }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'tts-bar';
    document.body.appendChild(bar);
    bar.onclick = guard(async (e) => {
      const a = e.target.closest('[data-tb]')?.dataset.tb;
      if (a === 'play') return tts.paused || tts.blocked ? ttsPlay() : ttsPause();
      if (a === 'prev') return ttsJump(-1);
      if (a === 'next') return ttsJump(1);
      if (a === 'stop') return ttsStop();
      if (a === 'panel') { if (readerState.drawer !== 'tts') toggleDrawer('tts'); }
    });
  }
  const seg = tts.segs[tts.idx];
  const ch = loadedChapter(seg?.cid) || readerState.chapter;
  bar.innerHTML = `
    <button class="icon-btn" data-tb="prev" title="Đoạn trước">⏮</button>
    <button class="icon-btn tts-play" data-tb="play" title="${tts.paused || tts.blocked ? 'Đọc tiếp' : 'Tạm dừng'}">${tts.paused || tts.blocked ? '▶' : '⏸'}</button>
    <button class="icon-btn" data-tb="next" title="Đoạn sau">⏭</button>
    <span class="tts-pos" data-tb="panel" title="Mở bảng đọc">${esc((ch?.title_vi || ch?.title || '').slice(0, 28))} · ${tts.idx + 1}/${tts.segs.length}</span>
    ${tts.note ? `<span class="muted small tts-note">${esc(tts.note)}</span>` : ''}
    <button class="icon-btn" data-tb="stop" title="Dừng">✕</button>`;
}

/* ---------- drawer ---------- */

function ttsDrawer() {
  const c = tts.cfg;
  if (!('speechSynthesis' in window)) return '<p class="warn small">Trình duyệt này không có giọng đọc (Web Speech API).</p>';
  const voices = tts.voices.length ? tts.voices : ttsLoadVoices();
  const hasVi = voices.some((v) => /^vi(-|_|$)/i.test(v.lang));
  const online = voices.some((v) => /online|natural/i.test(v.name));
  const slider = (k, label, lo, hi, step, fmt) => `<label class="slider"><span>${label}</span><b id="tv-${k}">${fmt(c[k])}</b>
    <input type="range" min="${lo}" max="${hi}" step="${step}" value="${c[k]}" data-tk="${k}" aria-label="${label}"></label>`;
  return `<div class="stack dr-tts">
    <button class="btn primary wide" data-tb="play">${tts.reading && !tts.paused ? '⏸ Tạm dừng' : '▶ Đọc từ đoạn này'}</button>
    ${tts.reading ? '<button class="btn wide" data-tb="stop">Dừng hẳn</button>' : ''}
    <span class="muted small" id="tts-note">${esc(tts.note || 'Bắt đầu từ đoạn đang ở đầu màn hình.')}</span>
    <div class="dr-sec">Giọng</div>
    <select id="tts-voice" data-tk="voiceURI" aria-label="Giọng đọc">
      ${voices.length ? voices.map((v) => `<option value="${esc(v.voiceURI)}"${v.voiceURI === c.voiceURI ? ' selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')
        : '<option value="">Chưa thấy giọng nào — mở lại trang sau khi cài giọng</option>'}</select>
    ${slider('rate', 'Tốc độ', 0.5, 3, 0.05, (v) => (+v).toFixed(2) + '×')}
    ${slider('pitch', 'Cao độ', 0, 2, 0.05, (v) => (+v).toFixed(2))}
    ${slider('volume', 'Âm lượng', 0, 1, 0.05, (v) => Math.round(v * 100) + '%')}
    <div class="dr-sec">Theo dõi</div>
    <div class="seg follow-seg" role="group" aria-label="Tô theo">
      <span class="seg-lab">Tô theo</span>
      ${[['word', 'Từ'], ['sentence', 'Câu'], ['para', 'Đoạn']].map(([k, l]) => {
        const off = k === 'word' && (ttsNoWord() || c.rulesOn);
        return `<button data-follow="${k}" class="${ttsMode() === k ? 'on' : ''}"${off ? ' disabled aria-disabled="true"' : ''} aria-pressed="${ttsMode() === k}">${off ? `<s>${l}</s>` : l}</button>`; }).join('')}
    </div>
    ${ttsMode() !== c.follow || (c.follow === 'word' && ttsNoWord()) ? `<div class="follow-note"><b>Đang tô theo câu</b><span class="muted small">${c.rulesOn ? 'Quy tắc thay cách đọc đang bật nên không biết từ nào đang được đọc.' : 'Giọng này không báo vị trí từng từ. Chọn một giọng chạy trên máy (không có chữ Online) để tô theo từ.'}</span></div>` : ''}
    <label class="check"><input type="checkbox" data-tk="autoScroll"${c.autoScroll ? ' checked' : ''}> Tự cuộn theo chỗ đang đọc</label>
    <label class="check"><input type="checkbox" data-tk="autoNext"${c.autoNext ? ' checked' : ''}> Hết chương thì đọc tiếp chương sau</label>
    <div class="dr-sec">Hẹn giờ ngủ</div>
    <div class="row"><input type="number" min="0" max="600" value="${c.sleepMinutes}" data-tk="sleepMinutes" aria-label="Hẹn giờ ngủ, phút" style="width:110px"><span class="muted small">phút · 0 = tắt</span></div>
    <details class="dr-more"><summary>Tuỳ chỉnh nâng cao <span class="muted small">${c.maxChars} · ${c.gapMs}ms</span></summary>
      <div class="stack">
        ${slider('maxChars', 'Ký tự mỗi lượt', 60, 600, 10, (v) => v)}
        ${slider('gapMs', 'Nghỉ giữa hai lượt', 0, 1200, 20, (v) => v + 'ms')}
        <label class="check"><input type="checkbox" data-tk="rulesOn"${c.rulesOn ? ' checked' : ''}> Dùng quy tắc thay cách đọc</label>
        <textarea rows="4" data-tk="rules" placeholder="Lam Vong Cơ => Lam Vong Cơ&#10;re:\\bCP\\b => xi pi">${esc(c.rules)}</textarea>
        <span class="muted small">Mỗi dòng <code>chữ =&gt; đọc thành</code>. Thêm <code>re:</code> ở đầu để dùng regex. Bật quy tắc thì không tô theo từ được (tô theo câu), vì chữ đọc ra khác chữ trên màn hình.</span>
      </div></details>
    ${hasVi ? '' : `<span class="warn small">Máy chưa có giọng tiếng Việt. Mở app bằng <b>Microsoft Edge</b> để dùng giọng Việt của Edge, hoặc cài gói giọng tiếng Việt trong Windows (Cài đặt → Thời gian &amp; ngôn ngữ → Giọng nói).</span>`}
    <span class="muted small">Giọng chạy ngay trên máy, app không gửi chữ đi đâu.${online ? ' Riêng giọng có chữ <b>Online (Natural)</b> là giọng đám mây: trình duyệt gửi đoạn chữ lên server Microsoft để tổng hợp. Sách lấy từ vault thì nên chọn giọng không có chữ Online.' : ''}</span>
  </div>`;
}

function ttsDrawerInput(e) {
  const k = e.target.dataset.tk;
  if (!k) return false;
  const v = e.target.type === 'checkbox' ? e.target.checked
    : e.target.type === 'range' || e.target.type === 'number' ? +e.target.value : e.target.value;
  tts.cfg[k] = v;
  ttsSave();
  const out = $('#tv-' + k);
  if (out) {
    out.textContent = k === 'volume' ? Math.round(v * 100) + '%'
      : k === 'gapMs' ? v + 'ms' : k === 'maxChars' ? v
      : k === 'rate' ? v.toFixed(2) + '×' : (+v).toFixed(2);
  }
  if (k === 'sleepMinutes') ttsArmSleep();
  if (k === 'maxChars' && tts.reading) ttsRescan();
  if ((k === 'rate' || k === 'pitch' || k === 'volume' || k === 'voiceURI') && tts.reading && !tts.paused) ttsSpeak(tts.idx);
  return true;
}

function ttsDrawerClick(e) {
  const f = e.target.closest('[data-follow]');
  if (f && !f.disabled) {
    tts.cfg.follow = f.dataset.follow; ttsSave();
    if (tts.reading) ttsRescan();
    drawDrawer();
    return true;
  }
  const a = e.target.closest('[data-tb]')?.dataset.tb;
  if (!a) return false;
  if (a === 'play') { tts.reading && !tts.paused ? ttsPause() : ttsPlay(); drawDrawer(); }
  if (a === 'stop') { ttsStop(); drawDrawer(); }
  return true;
}

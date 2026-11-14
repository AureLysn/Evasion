// ==UserScript==
// @name         TM Translate (AureLysn)
// @author       QuocBao (lõi dịch, OCR) · Aurel (bản gọn, giao diện chung)
// @namespace    http://tampermonkey.net/
// @version      4.2.0-aurelysn
// @description  Dịch trang Trung → Việt tại chỗ (server hoặc từ điển trên máy), bộ tên, dịch chữ trong ảnh, cầu nối cho script khác.
// @icon         data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3E%3Crect%20width='64'%20height='64'%20rx='14'%20fill='%2317B9A3'/%3E%3Ctext%20x='32'%20y='45'%20text-anchor='middle'%20font-size='38'%20font-weight='700'%20font-family='Arial'%20fill='%2306302C'%3ED%3C/text%3E%3C/svg%3E
// @match        *://*/*
// @noframes
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @connect      dichngay.com
// @connect      api.dichnhanh.com
// @connect      127.0.0.1
// @connect      localhost
// @connect      unpkg.com
// @connect      cdn.jsdelivr.net
// @connect      github.com
// @connect      githubusercontent.com
// @connect      objects.githubusercontent.com
// @connect      release-assets.githubusercontent.com
// @connect      drive.usercontent.google.com
// @connect      *
// @require      https://unpkg.com/@oovz/esearch-ocr@8.4.4/dist/eSearchOCR.umd.js#sha256=1dcd4425b875ebdefff972658447cff24926306cac2c3fa440ecc2f29110274d
// @require      https://unpkg.com/onnxruntime-web@1.18.0/dist/ort.wasm.min.js#sha256=90533a3fd7006df7f897c0d63c468996da5c8e430e39964d92ebe586c4996614
// @require      https://unpkg.com/fflate@0.8.2/umd/index.js#sha256=c3b34f2e9f5e74d4d7d64e01cac7a0c01954c6c406414d42185c7b53d6875ddf
// @run-at       document-idle
// ==/UserScript==

/* =============================================================================
 * TM TRANSLATE — BẢN GỌN CỦA AUREL
 *
 * Gốc: "TM Translate" của QuocBao (BaoBao666888/Novel-Downloader5, 3.5.5.18_beta).
 * Bản này chỉ giữ những gì Aurel dùng:
 *   • dịch trang Trung → Việt, tại chỗ, tự dịch tiếp nội dung trang nạp thêm khi cuộn
 *   • hai nguồn dịch: máy chủ (dichngay / dichnhanh) hoặc từ điển trên máy (Name/VP/HanViet)
 *   • bộ tên (name-set): nhiều bộ, nhập / xuất, thêm nhanh
 *   • dịch chữ trong ảnh ngay trên ảnh (OCR chạy trên máy)
 *   • cầu nối 'tm-bridge' cho Trình tải Lofter và TTS Reader mượn bộ dịch
 * Đã bỏ: thư viện + trình đọc + TTS của thư viện, blacklist, OCR chụp màn hình / khoanh
 * vùng, bảng dịch nhanh, sửa tên khi bôi chữ, giao diện đọc tối giản, giải mã Fanqie, popup
 * chào mừng, cửa sổ cài đặt riêng. Mọi thiết lập nằm trong tab "Translated" của bảng chung.
 *
 * NGUỒN FILE. Repo NovelTool là private nên Tampermonkey không tải được link raw của nó:
 *   • translateZhToVi.js (bộ dịch bằng từ điển) được CHÉP THẲNG vào file này, mục 1.
 *     Bản gốc để đối chiếu: translate-data/zh_to_vi/translateZhToVi.js
 *   • ba file từ điển nằm ở translate-data/zh_to_vi/ và do TranslateCenter phát tại
 *     http://127.0.0.1:8765/translate-data/zh_to_vi/ — chỉ cần TranslateCenter đang chạy
 *     lúc tải từ điển lần đầu (hoặc khi bấm "Tải lại từ điển"); sau đó trình duyệt nhớ.
 *   • dịch qua máy chủ không cần TranslateCenter.
 * Ba @require còn lại là thư viện npm công khai cho OCR (eSearch-OCR, onnxruntime-web,
 * fflate), khoá bằng sha256.
 *
 * Các đoạn lấy nguyên từ bản gốc được ghi "[GỐC]" ở tiêu đề mục; phần còn lại viết mới.
 * Cấu hình và bộ tên vẫn nằm ở khoá 'tm_translate_config_v2' — lên bản này không mất bộ tên.
 * ========================================================================== */

(async function () {
    'use strict';

    const CURRENT_VERSION = '4.2.0-aurelysn';

    /* ================== 1. [GỐC] translateZhToVi.js — dịch bằng từ điển trên máy ================== */
    // Chép từ translate-data/zh_to_vi/translateZhToVi.js. Thay đổi duy nhất: địa chỉ từ điển
    // mặc định trỏ về TranslateCenter thay vì repo của QuocBao.
    // ZhToVi.modified.js
    // Tampermonkey-friendly library. Attach: window.TranslateZhToVi
    // New/changed features (quick):
    //  - FIX: fetchText bug removed (Tampermonkey + fetch compatible)
    //  - Improved joinTokensMakePretty to better preserve punctuation (including CJK punctuation)
    //  - New API: translateSentence(text, opts) — translate a single sentence and keep punctuation/spacing
    //  - New API: translateWithAlternatives(text, opts) — returns array of segments with alts and chosen value
    //  - Alias: suggest(term, limit) -> suggests translations (wraps suggestName)
    //  - Small sanitization & capitalization after sentence-ending punctuation for ASCII letters
    // Usage (head of file note):
    //   await TranslateZhToVi.init({ nameUrl, vpUrl, hvUrl, forceReload:false });
    //   // quick translate (preserves punctuation as much as possible):
    //   const out = TranslateZhToVi.translateSentence(text, { maxMatchLen: 30, priorityNameFirst:true });
    //   // get detailed segments with alternatives
    //   const segs = TranslateZhToVi.translateWithAlternatives(text);
    //   // get suggestions for a term
    //   const s = TranslateZhToVi.suggest('明月', 10);

    (function (global) {
      const DB_NAME = 'TranslateZhToVi_DB_v1';
      const CACHE_KEY = 'dict_cache_v1';
      const DEFAULT_OPTS = {
        priorityNameFirst: true,
        preferLongVP: true,
        riêngChung: true,
        maxSuggest: 200,
        forceReload: false,
        punctMap: 'vietnamese',
        maxMatchLen: null // null -> use dict max
      };

      // tiny IndexedDB wrapper
      function idbOpen() {
        return new Promise((res, rej) => {
          const r = indexedDB.open(DB_NAME, 1);
          r.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
          };
          r.onsuccess = e => res(e.target.result);
          r.onerror = e => rej(e.target.error);
        });
      }
      async function idbGet(key) {
        const db = await idbOpen();
        return new Promise((res, rej) => {
          const tx = db.transaction('kv', 'readonly');
          const req = tx.objectStore('kv').get(key);
          req.onsuccess = () => { db.close(); res(req.result); };
          req.onerror = () => { db.close(); rej(req.error); };
        });
      }
      async function idbPut(key, val) {
        const db = await idbOpen();
        return new Promise((res, rej) => {
          const tx = db.transaction('kv', 'readwrite');
          tx.objectStore('kv').put(val, key);
          tx.oncomplete = () => { db.close(); res(); };
          tx.onerror = () => { db.close(); rej(tx.error); };
        });
      }
      async function idbDel(key) {
        const db = await idbOpen();
        return new Promise((res, rej) => {
          const tx = db.transaction('kv', 'readwrite');
          tx.objectStore('kv').delete(key);
          tx.oncomplete = () => { db.close(); res(); };
          tx.onerror = () => { db.close(); rej(tx.error); };
        });
      }

      // helpers
      function isCJK(ch) {
        return /[\u3400-\u4DBF\u4E00-\u9FFF\uf900-\ufaff]/.test(ch);
      }
      function splitRuns(s) {
        const runs = [];
        let buf = '', mode = null;
        for (const ch of s) {
          const now = isCJK(ch) ? 'CJK' : 'OTHER';
          if (mode === null) { buf = ch; mode = now; continue; }
          if (now === mode) buf += ch;
          else { runs.push({ mode, text: buf }); buf = ch; mode = now; }
        }
        if (buf) runs.push({ mode, text: buf });
        return runs;
      }

      // fetch util (GM friendly) — FIXED stray char
      function fetchText(url) {
        return new Promise((res, rej) => {
          if (typeof GM_xmlhttpRequest === 'function') {
            GM_xmlhttpRequest({
              method: 'GET', url, responseType: 'text',
              onload(resp) {
                if (resp.status >= 200 && resp.status < 300) res(resp.responseText);
                else rej(new Error('HTTP ' + resp.status));
              },
              onerror(e) { rej(e); }
            });
          } else {
            fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }).then(res).catch(rej);
          }
        });
      }

      // build length buckets
      function buildBucketsFromDict(dictObj) {
        const buckets = Object.create(null);
        let maxLen = 0;
        for (const k of Object.keys(dictObj)) {
          const len = k.length;
          if (len === 0) continue;
          if (!buckets[len]) buckets[len] = Object.create(null);
          buckets[len][k] = dictObj[k];
          if (len > maxLen) maxLen = len;
        }
        return { buckets, maxLen };
      }

      // normalize input objects into { val, alts, tag?, skip? }
      function normalizeDictAny(raw) {
        const out = Object.create(null);
        for (const k of Object.keys(raw)) {
          if (!k) continue;
          const v = raw[k];
          if (v == null) continue;
          if (typeof v === 'string') {
            // split by '/' into alts; if first part empty => skip marker
            const parts = v.split('/').map(x => x.trim());
            const alts = parts.filter(x => x !== undefined && x !== null);
            // treat explicit empty first meaning "" as SKIP
            const first = (parts.length > 0 ? parts[0] : '');
            if (first === '') {
              out[k] = { val: '', alts: alts.length ? alts : [''], skip: true };
            } else {
              out[k] = { val: first, alts: alts.length ? alts : [first] };
            }
          } else if (typeof v === 'object' && v.val !== undefined) {
            const val = String(v.val || '').trim();
            const alts = Array.isArray(v.alts) ? v.alts.map(x => String(x).trim()).filter(Boolean) : (val ? [val] : []);
            const entry = { val: val, alts: alts.length ? alts : [val] };
            if (v.tag) entry.tag = v.tag;
            if (val === '') entry.skip = true;
            out[k] = entry;
          } else {
            const s = String(v).trim();
            out[k] = { val: s, alts: [s] };
          }
        }
        return out;
      }

      // Global-longest-first matching per CJK-run
      function globalLongestMatch(text, nameIdx, vpIdx, hvDict, opts, overrideMax) {
        const N = text.length;
        const maxFromDict = Math.max(nameIdx.maxLen || 0, vpIdx.maxLen || 0);
        const maxLen = overrideMax && Number.isInteger(overrideMax) ? Math.min(overrideMax, maxFromDict) : maxFromDict;
        // arrays
        const replaced = new Array(N).fill(false);
        const slots = new Array(N).fill(null); // slots[i] = {zh, val, alts, source, len}
        // iterate lengths from maxLen -> 1
        for (let l = maxLen; l >= 1; --l) {
          const nameBucket = nameIdx.buckets[l] || {};
          const vpBucket = vpIdx.buckets[l] || {};
          for (let i = 0; i + l <= N; ++i) {
            if (replaced.slice(i, i + l).some(x => x)) continue; // overlap
            const sub = text.substr(i, l);
            let hitName = nameBucket[sub] || null;
            let hitVp = vpBucket[sub] || null;
            if (!hitName && !hitVp) continue;
            // handle skip (if any has skip true and others not)
            if (opts.riêngChung) {
              if (hitName && hitName.skip && (!hitVp || !hitVp.skip)) {
                // SKIP: nghĩa là KHÔNG dịch → trả về rỗng (loại bỏ)
                slots[i] = { zh: sub, val: "", alts: hitName.alts || [], source: 'SKIP', len: l };
                for (let k = 0; k < l; k++) replaced[i + k] = true;
                continue;
              }
              if (hitVp && hitVp.skip && (!hitName || !hitName.skip)) {
                slots[i] = { zh: sub, val: "", alts: hitVp.alts || [], source: 'SKIP', len: l };
                for (let k = 0; k < l; k++) replaced[i + k] = true;
                continue;
              }
            }
            // both exist or one exists
            if (hitName && hitVp) {
              const chooseVp = opts.preferLongVP;
              if (chooseVp) {
                slots[i] = { zh: sub, val: hitVp.val, alts: hitVp.alts, source: 'VP', len: l };
              } else {
                slots[i] = { zh: sub, val: hitName.val, alts: hitName.alts, source: 'Name', len: l };
              }
              for (let k = 0; k < l; k++) replaced[i + k] = true;
            } else if (hitName) {
              if (hitName.skip) {
                slots[i] = { zh: sub, val: "", alts: hitName.alts || [], source: 'SKIP', len: l };
              } else {
                slots[i] = { zh: sub, val: hitName.val, alts: hitName.alts, source: 'Name', len: l };
              }
              for (let k = 0; k < l; k++) replaced[i + k] = true;
            } else {
              if (hitVp.skip) {
                slots[i] = { zh: sub, val: "", alts: hitVp.alts || [], source: 'SKIP', len: l };
              } else {
                slots[i] = { zh: sub, val: hitVp.val, alts: hitVp.alts, source: 'VP', len: l };
              }
              for (let k = 0; k < l; k++) replaced[i + k] = true;
            }
          }
        }
        // build output items by walking i
        const items = [];
        for (let i = 0; i < N;) {
          if (slots[i]) {
            const it = slots[i];
            items.push({ zh: it.zh, val: it.val, alts: it.alts, source: it.source });
            i += it.len;
          } else {
            // single char fallback (handle later by hanviet)
            const ch = text[i];
            items.push({ zh: ch, val: null, alts: null, source: null });
            i += 1;
          }
        }
        // now fill nulls with hanviet fallback
        const filled = [];
        for (const it of items) {
          if (it.val !== null) {
            filled.push(it);
          } else {
            // it.zh is single char usually
            let built = [];
            for (const ch of it.zh) {
              const hv = hvDict[ch];
              if (hv) built.push(hv.val);
              else built.push(ch);
            }
            filled.push({ zh: it.zh, val: built.join(' '), alts: [built.join(' ')], source: 'HanViet' });
          }
        }
        return filled;
      }


      // Improved pretty join: preserve punctuation (including CJK), avoid extraneous spaces,
      // and do simple capitalization after sentence-ending punctuation for ASCII letters.
      function joinTokensMakePretty(tokens) {
        let result = '';
        // punctuation characters that should generally NOT have a space before them
        const noSpaceBeforeChars = new Set(['.', ',', ':', ';', '!', '?', '…', '%', '»', '”', '』', '』', ')', ']', '}', '，', '。', '、', '：', '；', '？', '！', '」', '』', '》']);
        // punctuation characters that should generally NOT have a space after them
        const noSpaceAfterChars = new Set(['(', '[', '{', '«', '“', '『', '「', '《']);
        // characters that mark sentence boundary for capitalization
        const sentenceEnd = new Set(['.', '!', '?', '\n', '。', '！', '？']);

        for (let i = 0; i < tokens.length; i++) {
          const currentToken = tokens[i];
          let currentVal = (currentToken.val === null || currentToken.val === undefined) ? currentToken.zh : currentToken.val;
          if (typeof currentVal !== 'string') currentVal = String(currentVal);

          // If token is empty or whitespace, skip
          if (!currentVal || !currentVal.trim()) continue;

          // Determine whether to add a space before this token
          if (result.length > 0) {
            const lastCharOfResult = result.slice(-1);
            const firstCharOfCurrent = currentVal.charAt(0);

            const noSpaceBefore = noSpaceBeforeChars.has(firstCharOfCurrent);
            const noSpaceAfter = noSpaceAfterChars.has(lastCharOfResult);

            if (!noSpaceBefore && !noSpaceAfter) {
              result += ' ';
            }
          }

          // Simple capitalization after sentence end for ASCII letters
          if (result.length > 0) {
            const lastChar = result.slice(-1);
            if (sentenceEnd.has(lastChar)) {
              // find first ASCII letter
              currentVal = currentVal.replace(/^\s*/, '');
              const first = currentVal.charAt(0);
              if (first && first >= 'a' && first <= 'z') {
                currentVal = first.toUpperCase() + currentVal.slice(1);
              }
            }
          }

          result += currentVal;
        }

        return result.trim();
      }

      // punctuation mapping function
      function mapPunctuation(s, style = 'vietnamese') {
        if (!s) return s;
        const maps = {
          ascii: {
            '，': ',', '。': '.', '：': ':', '；': ';', '？': '?', '！': '!',
            '、': ',', '（': '(', '）': ')', '【': '[', '】': ']', '—': '-', '～': '~',
            '「': '“', '」': '”', '『': '“', '』': '”',
            '《': '<', '》': '>'
          },
          vietnamese: {
            '，': ',', '。': '.', '：': ':', '；': ';', '？': '?', '！': '!',
            '、': ',', '（': '(', '）': ')', //'【': '[', '】': ']',
            '「': '“', '」': '”', '『': '“', '』': '”', '“': '“', '”': '”',
            '《': '«', '》': '»'
          }
        };
        const map = maps[style] || maps.vietnamese;
        return s.replace(/[　-〿＀-￯«»「」『』《》]/g, ch => map[ch] !== undefined ? map[ch] : ch);
      }

      const TranslateZhToVi = {
        isReady: false,
        _raw: { nameRaw: null, vpRaw: null, hvRaw: null },
        _idx: { nameIdx: { buckets: {}, maxLen: 0 }, vpIdx: { buckets: {}, maxLen: 0 }, hvDict: {} },
        opts: Object.assign({}, DEFAULT_OPTS),

        async init(opts = {}) {
          this.opts = Object.assign({}, this.opts, opts || {});
          const nameUrl = opts.nameUrl || 'http://127.0.0.1:8765/translate-data/zh_to_vi/Name.json';
          const vpUrl = opts.vpUrl || 'http://127.0.0.1:8765/translate-data/zh_to_vi/VP.json';
          const hvUrl = opts.hvUrl || 'http://127.0.0.1:8765/translate-data/zh_to_vi/HanViet.json';

          let cache = null;
          try { cache = await idbGet(CACHE_KEY); } catch (e) { console.warn('idb read err', e); }
          if (cache && !this.opts.forceReload) {
            try {
              this._raw = cache.raw;
              this._idx = cache.idx;
              this.isReady = true;
              console.log('[TranslateZhToVi] loaded from cache');
              return;
            } catch (e) {
              console.warn('cache restore fail', e);
            }
          }

          const [nameText, vpText, hvText] = await Promise.all([
            fetchText(nameUrl),
            fetchText(vpUrl),
            fetchText(hvUrl)
          ]);
          let nameObj = JSON.parse(nameText);
          let vpObj = JSON.parse(vpText);
          let hvObj = JSON.parse(hvText);

          nameObj = normalizeDictAny(nameObj);
          vpObj = normalizeDictAny(vpObj);
          const hvNorm = normalizeDictAny(hvObj);

          const nameIdx = buildBucketsFromDict(nameObj);
          const vpIdx = buildBucketsFromDict(vpObj);

          this._raw = { nameRaw: nameObj, vpRaw: vpObj, hvRaw: hvNorm };
          this._idx = { nameIdx, vpIdx, hvDict: hvNorm };
          this.isReady = true;

          try { await idbPut(CACHE_KEY, { raw: this._raw, idx: this._idx, savedAt: Date.now() }); } catch (e) { console.warn('cache write fail', e); }
          console.log('[TranslateZhToVi] loaded and indexed');
        },

        clearCache: async function () {
          await idbDel(CACHE_KEY).catch(() => { });
          this.isReady = false;
          console.log('[TranslateZhToVi] cache cleared');
        },

        // translate whole text and return a pretty string (backwards-compatible)
        translateText: function (text, opts) {
          if (!this.isReady) throw new Error('TranslateZhToVi not init()');
          opts = Object.assign({}, this.opts, opts || {});
          const runs = splitRuns(text);
          const tokens = [];
          for (const r of runs) {
            if (r.mode === 'CJK') {
              const maxMatch = opts.maxMatchLen || Math.max(this._idx.nameIdx.maxLen || 0, this._idx.vpIdx.maxLen || 0);
              const items = globalLongestMatch(r.text, this._idx.nameIdx, this._idx.vpIdx, this._idx.hvDict, opts, maxMatch);
              tokens.push(...items);
            } else {
              tokens.push({ zh: r.text, val: r.text, alts: [r.text], source: 'TEXT' });
            }
          }
          let out = joinTokensMakePretty(tokens);
          if (opts.punctMap) out = mapPunctuation(out, opts.punctMap);
          return out;
        },

        // translate a single sentence (keeps punctuation better, recommended for one-shot)
        translateSentence: function (text, opts) {
          // forwards to translateText but ensures we preserve non-CJK punctuation runs more granularly
          if (!this.isReady) throw new Error('TranslateZhToVi not init()');
          opts = Object.assign({}, this.opts, opts || {});

          // split runs, but for non-CJK runs, further split by whitespace while preserving punctuation
          const runs = splitRuns(text);
          const tokens = [];
          for (const r of runs) {
            if (r.mode === 'CJK') {
              const maxMatch = opts.maxMatchLen || Math.max(this._idx.nameIdx.maxLen || 0, this._idx.vpIdx.maxLen || 0);
              const items = globalLongestMatch(r.text, this._idx.nameIdx, this._idx.vpIdx, this._idx.hvDict, opts, maxMatch);
              tokens.push(...items);
            } else {
              // break non-CJK run into small tokens separated by spaces but keep punctuation attached
              const parts = r.text.split(/(\s+)/g).filter(x => x !== undefined && x !== null);
              for (const p of parts) {
                tokens.push({ zh: p, val: p, alts: [p], source: 'TEXT' });
              }
            }
          }
          let out = joinTokensMakePretty(tokens);
          if (opts.punctMap) out = mapPunctuation(out, opts.punctMap);
          return out;
        },

        // return array of segments {zh, val, alts, source} (no pretty join)
        translateSegments: function (text, opts) {
          if (!this.isReady) throw new Error('TranslateZhToVi not init()');
          opts = Object.assign({}, this.opts, opts || {});
          const runs = splitRuns(text);
          const out = [];
          for (const r of runs) {
            if (r.mode === 'CJK') {
              const maxMatch = opts.maxMatchLen || Math.max(this._idx.nameIdx.maxLen || 0, this._idx.vpIdx.maxLen || 0);
              const items = globalLongestMatch(r.text, this._idx.nameIdx, this._idx.vpIdx, this._idx.hvDict, opts, maxMatch);
              out.push(...items);
            } else {
              out.push({ zh: r.text, val: r.text, alts: [r.text], source: 'TEXT' });
            }
          }
          return out;
        },

        // return segments but keep ALL alternatives (useful for interactive suggest UI)
        translateWithAlternatives: function (text, opts) {
          if (!this.isReady) throw new Error('TranslateZhToVi not init()');
          opts = Object.assign({}, this.opts, opts || {});
          const runs = splitRuns(text);
          const out = [];
          for (const r of runs) {
            if (r.mode === 'CJK') {
              const maxMatch = opts.maxMatchLen || Math.max(this._idx.nameIdx.maxLen || 0, this._idx.vpIdx.maxLen || 0);
              const items = globalLongestMatch(r.text, this._idx.nameIdx, this._idx.vpIdx, this._idx.hvDict, opts, maxMatch);
              // globalLongestMatch already includes alts; preserve structure
              out.push(...items);
            } else {
              // further split by whitespace so UI can choose to replace small pieces
              const parts = r.text.split(/(\s+)/g).filter(x => x !== undefined && x !== null);
              for (const p of parts) out.push({ zh: p, val: p, alts: [p], source: 'TEXT' });
            }
          }
          return out;
        },

        // suggest name: exact matches first; else substring matches; else fallback translate
        suggestName: function (term, limit) {
          if (!this.isReady) throw new Error('TranslateZhToVi not init()');
          limit = limit || this.opts.maxSuggest;
          const res = [];
          const nameRaw = this._raw.nameRaw || {};
          const vpRaw = this._raw.vpRaw || {};
          if (nameRaw[term]) res.push({ source: 'Name', zh: term, val: nameRaw[term].val, alts: nameRaw[term].alts });
          if (vpRaw[term]) res.push({ source: 'VP', zh: term, val: vpRaw[term].val, alts: vpRaw[term].alts });
          if (res.length) return res;
          // substring
          function scan(obj, label) {
            const out = [];
            for (const k of Object.keys(obj)) {
              if (out.length >= limit) break;
              if (k.includes(term) || term.includes(k)) out.push({ source: label, zh: k, val: obj[k].val, alts: obj[k].alts });
            }
            return out;
          }
          const r1 = scan(nameRaw, 'Name');
          const r2 = scan(vpRaw, 'VP');
          const merged = r1.concat(r2).slice(0, limit);
          if (merged.length) return merged;
          // fallback single result
          const t = this.translateText(term, { priorityNameFirst: this.opts.priorityNameFirst });
          return [{ source: 'Fallback', zh: term, val: t, alts: [t] }];
        },

        // alias for suggestName (friendlier name)
        suggest: function (term, limit) { return this.suggestName(term, limit); },

        // in-memory add/update (and persist cache)
        addEntry: function (dictName, zh, val, alts, tag) {
          if (!this.isReady) throw new Error('TranslateZhToVi not init()');
          const target = dictName === 'name' ? this._raw.nameRaw : this._raw.vpRaw;
          if (!target) throw new Error('invalid dictName');
          const entry = { val: val || '', alts: alts && alts.length ? alts : (val ? [val] : []) };
          if (tag) entry.tag = tag;
          if (entry.val === '') entry.skip = true;
          target[zh] = entry;
          // rebuild index
          const newIdx = buildBucketsFromDict(target);
          if (dictName === 'name') this._idx.nameIdx = newIdx;
          else this._idx.vpIdx = newIdx;
          idbPut(CACHE_KEY, { raw: this._raw, idx: this._idx, savedAt: Date.now() }).catch(() => { });
        },

        _debug: function () { return { raw: this._raw, idx: this._idx, opts: this.opts }; }
      };

      global.TranslateZhToVi = TranslateZhToVi;
    })(window);
    const TranslateZhToVi = window.TranslateZhToVi;

    /* ================== 2. Tiện ích nền ================== */
    const TM_DEBUG = (() => {
        try {
            if (typeof window !== 'undefined' && window.TM_DEBUG) return true;
            return localStorage.getItem('tm_debug') === '1';
        } catch (_) { return false; }
    })();
    const TM_LOG = (...args) => { if (TM_DEBUG) console.log(...args); };
    const TM_WARN = (...args) => { if (TM_DEBUG) console.warn(...args); };

    // Kho GM. Bản gốc có cả một tầng nén + đo dung lượng cho dữ liệu thư viện; bản này chỉ
    // còn cấu hình và cache model OCR nên gọi thẳng GM.*.
    async function tmStorageGet(key, fallback = null) {
        const value = await GM.getValue(key);
        return value === undefined ? fallback : value;
    }
    async function tmStorageSet(key, value) { await GM.setValue(key, value); }
    async function tmStorageDelete(key) { await GM.deleteValue(key); }

    const __ttPolicy = (() => {
        try {
            if (!window.trustedTypes || typeof window.trustedTypes.createPolicy !== 'function') return null;
            try {
                return window.trustedTypes.createPolicy('tm-translate', { createHTML: (s) => String(s || '') });
            } catch (e1) {
                return window.trustedTypes.createPolicy('default', { createHTML: (s) => String(s || '') });
            }
        } catch (err) {
            return null;
        }
    })();

    // [HARDENED] Ghi chu cho ro: policy o tren KHONG loc gi ca (createHTML: s => String(s)).
    // Day la mot BYPASS Trusted Types, khong phai mot policy bao ve. No ton tai de script
    // chay duoc tren site co enforce TT. Moi chuoi di qua ttHTML() phai la HTML tinh do
    // chinh script viet ra, HOAC da qua escapeHtml(). Khong bao gio day text tu trang
    // web / tu server dich thang vao day.
    function ttHTML(html) {
        const s = String(html || '');
        try {
            return __ttPolicy ? __ttPolicy.createHTML(s) : s;
        } catch (err) {
            return s;
        }
    }

    const SERVER_PROVIDER_DEFAULTS = {
        dichngay: 'https://dichngay.com/translate/text',
        dichnhanh: 'https://api.dichnhanh.com/'
    };

    /* ================== 3. Cấu hình ================== */
    const TM_CONFIG_KEY = 'tm_translate_config_v2';
    const DICT_BASE_DEFAULT = 'http://127.0.0.1:8765/translate-data/zh_to_vi/';
    const DEFAULT_CONFIG = {
        translationMode: 'server',          // 'server' | 'local'
        serverUrl: 'https://dichngay.com/translate/text',
        serverEndpoints: { ...SERVER_PROVIDER_DEFAULTS },
        serverProvider: 'dichngay',         // 'dichngay' | 'dichnhanh'
        dichnhanhOptions: { mode: 'vi', type: 'Ancient', enableAnalyze: false, enableFanfic: false },
        targetLang: 'vi',
        delayMs: 400,
        retryCount: 3,
        maxCharsPerRequest: 4500,
        includeScriptStyle: false,
        activeNameSet: 'Mặc định',
        nameSets: { 'Mặc định': {} },
        nameSetVersion: 1,
        dictBaseUrl: DICT_BASE_DEFAULT,     // thư mục chứa Name.json, VP.json, HanViet.json
        translateInPlace: true,             // sửa chữ ngay trên trang đang sống, không thế <body>
        autoTranslateOnScroll: true,        // trang nạp thêm nội dung thì dịch tiếp
        bilingual: false,                   // kèm chữ gốc (mờ) sau mỗi đoạn đã dịch
        showImageTranslateButton: true,     // nút "Dịch ảnh" khi rê chuột vào ảnh
        ocrFont: 'Segoe UI',
    };
    // Tên bộ tên có thể mang thông tin ưu tiên (bản gốc dùng cho thư viện). Giữ Symbol để
    // buildNameSetReplacer chạy nguyên như cũ; ở bản này không bộ nào gắn nó.
    const NAME_SET_PRIORITY_META = Symbol('tm-name-set-priority');

    let tmConfigStored = await tmStorageGet(TM_CONFIG_KEY, null).catch((err) => {
        console.error('[tm-translate] Không đọc được cấu hình:', err);
        return null;
    });

    function loadConfig() {
        const c = tmConfigStored || {};
        const merged = { ...DEFAULT_CONFIG, ...c };
        merged.nameSets = { ...DEFAULT_CONFIG.nameSets, ...(c.nameSets || {}) };
        if (!merged.activeNameSet || !merged.nameSets[merged.activeNameSet]) {
            merged.activeNameSet = Object.keys(merged.nameSets)[0] || 'Mặc định';
        }
        if (typeof merged.nameSetVersion !== 'number' || !merged.nameSetVersion) merged.nameSetVersion = 1;
        merged.serverEndpoints = { ...SERVER_PROVIDER_DEFAULTS, ...(c.serverEndpoints || {}) };
        if (c.serverUrl && !merged.serverEndpoints.dichngay) merged.serverEndpoints.dichngay = c.serverUrl;
        if (!merged.serverEndpoints.dichnhanh) merged.serverEndpoints.dichnhanh = SERVER_PROVIDER_DEFAULTS.dichnhanh;
        merged.serverUrl = merged.serverEndpoints.dichngay || SERVER_PROVIDER_DEFAULTS.dichngay;
        merged.dichnhanhOptions = { ...DEFAULT_CONFIG.dichnhanhOptions, ...(c.dichnhanhOptions || {}) };
        if (merged.translationMode !== 'local') merged.translationMode = 'server';
        if (!/^https?:\/\//i.test(String(merged.dictBaseUrl || ''))) merged.dictBaseUrl = DICT_BASE_DEFAULT;
        return merged;
    }
    // Cấu hình cũ còn mang các khoá của tính năng đã bỏ (thư viện, trình đọc…). Không xoá:
    // lỡ cần quay về bản cũ thì chúng vẫn còn nguyên.
    function saveConfig(cfg) {
        tmConfigStored = JSON.parse(JSON.stringify(cfg));
        void tmStorageSet(TM_CONFIG_KEY, tmConfigStored).catch((err) => {
            console.error('[tm-translate] Không lưu được cấu hình:', err);
        });
    }
    // Tab khác có thể vừa sửa bộ tên → đọc lại từ kho trước khi dùng.
    async function reloadConfig() {
        try { tmConfigStored = await tmStorageGet(TM_CONFIG_KEY, tmConfigStored); } catch (_) { /* giữ bản đang có */ }
        config = loadConfig();
        return config;
    }
    let config = loadConfig();

    /* ================== 4. Trạng thái ================== */
    let translationCache = {};
    let isTranslating = false;
    let pageTranslated = false;             // trang đang hiện bản dịch
    let translatedInPlace = false;
    let tmInPlaceUndo = [];                 // việc cần làm ngược lại khi ẩn bản dịch
    const tmAppliedText = new WeakMap();    // text node / <a> → chuỗi đã dịch đặt vào đó
    const tmAppliedAttrs = new WeakMap();   // element → { tên thuộc tính: giá trị đã dịch }
    let originalBodyElement = null;         // chế độ không-tại-chỗ: <body> gốc, để trả lại
    let originalScrollPosition = 0;
    let updateOcrStatus = null;             // tab Translated gán vào; paddleService gọi sau khi tải model

    /* ================== 5. Khung giao diện nổi (thông báo, trạng thái tải) ================== */
    const tmShadowHost = document.createElement('div');
    tmShadowHost.id = 'tm-translate-host';
    tmShadowHost.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:2147483647;pointer-events:none;';
    document.documentElement.appendChild(tmShadowHost);
    const tmShadow = tmShadowHost.attachShadow({ mode: 'open' });
    const tmUIRoot = document.createElement('div');
    tmUIRoot.id = 'tm-ui-root';
    tmUIRoot.style.cssText = 'pointer-events:auto;';
    {
        const style = document.createElement('style');
        style.textContent = '#tm-ui-root{font-family:"Be Vietnam Pro","Segoe UI",Roboto,Arial,sans-serif;font-size:13px;line-height:1.5;}'
            + '#tm-loading-indicator,#tm-notification-bubble{position:fixed;left:50%;transform:translateX(-50%);z-index:2147483647;'
            + 'background:#0f2a2d;color:#e6f2f0;border:1px solid rgba(170,215,208,.45);border-radius:999px;padding:8px 18px;'
            + 'box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:calc(100vw - 30px);}'
            + '#tm-loading-indicator{top:12px;}#tm-notification-bubble{top:56px;}';
        tmShadow.appendChild(style);
    }
    tmShadow.appendChild(tmUIRoot);
    function tmEl(id) { return tmUIRoot.querySelector('#' + id); }
    function tmRemoveEl(id) { const el = tmUIRoot.querySelector('#' + id); if (el) el.remove(); }

    function showLoading(message) {
        removeLoading();
        const div = document.createElement('div');
        div.id = 'tm-loading-indicator';
        div.textContent = message;
        tmUIRoot.appendChild(div);
        tmSetStatus(message);
    }
    function removeLoading() { tmRemoveEl('tm-loading-indicator'); }
    function showNotification(message, duration = 2000) {
        tmRemoveEl('tm-notification-bubble');
        const div = document.createElement('div');
        div.id = 'tm-notification-bubble';
        div.textContent = message;
        div.style.cssText = 'opacity:0;transition:opacity .3s ease;';
        tmUIRoot.appendChild(div);
        setTimeout(() => { div.style.opacity = '1'; }, 10);
        setTimeout(() => { div.style.opacity = '0'; setTimeout(() => div.remove(), 300); }, duration);
    }
    const yieldUI = () => new Promise(r => setTimeout(r, 0));

// <aurel-ui-kit>
/* =============================================================================
 * AUREL UI KIT — giao diện chung của các userscript chạy trên cùng một trang.
 *
 * Bản gốc: userscripts/shared/ui-kit.js. Khối này được CHÉP NGUYÊN vào từng script
 * (giữa hai dòng đánh dấu aurel-ui-kit) bằng:   node userscripts/shared/sync.js
 * Đừng sửa bản chép — sửa bản gốc rồi chạy lại lệnh trên.
 *
 * Ba userscript là ba sandbox, không gọi hàm của nhau được; thứ duy nhất dùng chung là
 * DOM. Nên mọi quy ước nằm trong DOM, và script nào chạy trước thì dựng khung:
 *
 *   #aurel-dock                       góc phải dưới: [.side][.col]
 *     .side                           chỗ cho mini-player (TTS Reader), nằm bên trái cột nút
 *     .col > [data-slot="<id>"]       cột nút tròn, xếp từ dưới lên — order: tm 10 · ndl 20 · tts 30
 *   #aurel-hub[data-active="<id>"]    MỘT cửa sổ, mỗi script một tab; display:none = thu lại
 *     .tabs > button.tab[data-tab]    order: tts 10 · ndl 20 · tm 30
 *     .panes > [data-pane]            mỗi script tự dựng giao diện trong ngăn của mình
 *
 * Sự kiện trên document (detail là chuỗi — object không qua được ranh giới sandbox):
 *   'aurel-hub:change'  detail = id tab đang mở, hoặc '' khi bảng thu lại
 *   'aurel-hub:help'    detail = id tab đang mở lúc bấm nút "?"
 *   'aurel-hub:close'   detail = id tab đang mở lúc bấm nút "✕" (bảng tự thu lại sau đó)
 *
 * Màu: mỗi trang web một bộ màu riêng (KIT_SITES — Lofter xanh ngọc, STV xanh dương, wikicv
 * cyan, AO3 đỏ, FanFiction tím, Wattpad cam, Tấn Giang xanh lá; theo bản thiết kế 00_Layout của Aurel), mỗi bộ
 * có bản tối và bản sáng. Trang nào thì kit tự nhận theo tên miền — ba script trên cùng trang
 * luôn ra cùng một bộ.
 *
 * Khung riêng nằm ngoài #aurel-hub / #aurel-dock (vd. bảng toàn trang của Name Desk) gắn
 * thuộc tính data-aurel-skin lên host rồi gọi kitThemeApply() là nhận cùng bộ màu.
 *
 * Theme (tối · sáng · theo hệ thống): nút thứ nhất ở góc phải thanh tab. Lựa chọn nằm trong
 * localStorage của trang (khóa 'aurel-ui-theme' — ba sandbox đọc chung được, nhưng nhớ riêng
 * từng trang web). Bộ màu đang dùng được đặt thành biến --kt-* ngay trên #aurel-hub và
 * #aurel-dock; mọi shadow root bên trong thừa kế chúng qua KIT_TOKENS, nên script nào bấm nút
 * thì giao diện của cả ba cùng đổi. Không có --kt-* (host đứng ngoài hai khung đó) = Lofter tối.
 *
 * Trong ngăn của mình, script gắn một shadow root với KIT_CSS để có cùng bộ thẻ:
 *   .card (+ h4) · .row · .grow · .btn (.pri .sec .warn .dan) · input/select/textarea
 *   label.ck · label.sw (công tắc) · .lb · .hint · details.adv · .console · .bar
 *
 * Tên biến màu giữ từ bản trước để code các tab không phải đổi: --k-teal là màu CHÍNH của
 * trang (không nhất thiết xanh ngọc), --k-green là màu PHỤ, --k-yellow / --k-red là tạm dừng /
 * nguy hiểm. --k-on là chữ trên nút màu, --k-ink là chữ trên tab đang mở.
 * ========================================================================== */
function kitGrad(a, b) { return 'linear-gradient(135deg,' + a + ' 0%,' + b + ' 100%)'; }
function kitBg(a, b) { return 'linear-gradient(170deg,' + a + ' 0%,' + b + ' 100%)'; }
// Bộ tối của Lofter: cũng là màu dự phòng trong KIT_TOKENS, nên phải có ĐỦ mọi khóa.
var KIT_DARK = {
    text: '#e8f4f2', muted: '#93b2b0', line: 'rgba(160,215,208,.2)', edge: 'rgba(160,215,208,.36)',
    win: kitBg('#20424a', '#16323a'), card: kitBg('#25494f', '#1d3e45'), field: '#0b2227',
    soft: '#2a555d', softx: '#e8f4f2', sunk: 'rgba(0,0,0,.18)', pill: '#17343a', shadow: 'rgba(0,0,0,.45)',
    teal: kitGrad('#3be6c5', '#14bf9f'), green: kitGrad('#7fe0a8', '#3cc27f'),
    yellow: kitGrad('#f1e06a', '#dcc12f'), red: kitGrad('#f59a8f', '#e5685e'),
    accent: '#2bd8b8', ink: '#053a33', on: '#ffffff', ong: '#ffffff', ony: '#ffffff', onr: '#ffffff', link: '#7fe9d6', err: '#ffa79b', ok: '#7ff0c0', scheme: 'dark'
};
// Mỗi bộ chỉ ghi phần khác bộ gốc của nó (tối → KIT_DARK, sáng → KIT_SITES.lofter.light).
var KIT_SITES = {
    lofter: {
        dark: {},
        light: {
            text: '#173a37', muted: '#5f7d7a', line: 'rgba(20,90,80,.15)', edge: 'rgba(20,90,80,.24)',
            win: kitBg('#f6fbfa', '#eaf4f2'), card: kitBg('#ffffff', '#f1f7f6'), field: '#ffffff',
            soft: '#dcebe9', softx: '#173a37', sunk: 'rgba(20,90,80,.05)', pill: '#ffffff', shadow: 'rgba(30,70,65,.22)',
            teal: kitGrad('#34dcc0', '#12b99d'), green: kitGrad('#7fdca5', '#38bb79'),
            yellow: kitGrad('#f6d454', '#e9b52c'), red: kitGrad('#f79085', '#ec6a5f'),
            accent: '#14b99c', link: '#0c7f70', err: '#c0392b', ok: '#12805c', scheme: 'light'
        }
    },
    stv: {
        dark: {
            text: '#e7ecf8', muted: '#95a2c2', line: 'rgba(150,170,220,.18)', edge: 'rgba(150,170,220,.32)',
            win: kitBg('#1f2944', '#161e33'), card: kitBg('#2b3657', '#232d4a'), field: '#0b111f',
            soft: '#334268', softx: '#e7ecf8', pill: '#1a233a', shadow: 'rgba(0,0,0,.5)',
            teal: kitGrad('#5a84ea', '#2a50c4'), green: kitGrad('#38c0a0', '#249a80'),
            yellow: kitGrad('#f3cb66', '#e3aa3c'), red: kitGrad('#ea6f84', '#d1475f'),
            accent: '#4a76e6', ink: '#ffffff', link: '#8fb0ff', err: '#ff9aa8', ok: '#6fe0b8'
        },
        light: {
            text: '#1a2541', muted: '#64739a', line: 'rgba(40,70,140,.13)', edge: 'rgba(40,70,140,.22)',
            win: kitBg('#f9fbff', '#eef3fc'), card: kitBg('#ffffff', '#f5f8fe'), field: '#fbfcfe',
            soft: '#dde6f7', softx: '#1a2541', sunk: 'rgba(40,70,140,.05)', pill: '#ffffff', shadow: 'rgba(30,50,100,.2)',
            teal: kitGrad('#6492f8', '#3467e5'), green: kitGrad('#3fd3ae', '#22ad8b'),
            yellow: kitGrad('#fcd463', '#f4b73f'), red: kitGrad('#f9879a', '#ee5b74'),
            accent: '#4479f0', ink: '#ffffff', link: '#2f5fd6', err: '#d23a52', ok: '#128a63', scheme: 'light'
        }
    },
    wikicv: {
        dark: {
            text: '#e6f3f8', muted: '#8fb2c2', line: 'rgba(140,205,230,.18)', edge: 'rgba(140,205,230,.32)',
            win: kitBg('#1d3c51', '#142d3e'), card: kitBg('#20475a', '#193a4c'), field: '#081c26',
            soft: '#27556b', softx: '#e6f3f8', pill: '#143042',
            teal: kitGrad('#55e0f0', '#17aac6'), green: kitGrad('#8fd0f6', '#4fa6e6'),
            accent: '#36c3da', ink: '#06344a', link: '#7fdcf0'
        },
        light: {
            text: '#12303f', muted: '#5f7d8c', line: 'rgba(20,80,110,.14)', edge: 'rgba(20,80,110,.22)',
            win: kitBg('#f3f8fc', '#e8f1f7'), card: kitBg('#ffffff', '#f3f8fb'), field: '#f9fbfd',
            soft: '#d8e8f1', softx: '#12303f', sunk: 'rgba(20,80,110,.05)', pill: '#ffffff', shadow: 'rgba(20,60,90,.2)',
            teal: kitGrad('#5ad8f0', '#26b9de'), green: kitGrad('#9fd6f8', '#5aaeea'),
            yellow: kitGrad('#f8da5e', '#eebd33'), red: kitGrad('#fb9c8f', '#f07465'),
            accent: '#22b5d8', ink: '#06344a', link: '#0f7fa6', err: '#c0392b', ok: '#12805c', scheme: 'light'
        }
    },
    ao3: {
        dark: {
            text: '#eeeeee', muted: '#a0a0a0', line: 'rgba(255,255,255,.09)', edge: 'rgba(255,255,255,.17)',
            win: kitBg('#1e1e1e', '#141414'), card: kitBg('#2a2a2a', '#232323'), field: '#0a0a0a',
            soft: '#333333', softx: '#eeeeee', pill: '#1b1b1b', shadow: 'rgba(0,0,0,.55)',
            teal: kitGrad('#c4524f', '#901f1e'), green: kitGrad('#8f949e', '#6b707a'),
            yellow: kitGrad('#e2c06a', '#c99c3c'), red: kitGrad('#b85068', '#8a3148'),
            accent: '#c0403c', ink: '#ffffff', link: '#ff9c95', err: '#ff8a80', ok: '#8fd6a0'
        },
        light: {
            text: '#2b2020', muted: '#7c7070', line: 'rgba(80,30,30,.11)', edge: 'rgba(80,30,30,.2)',
            win: kitBg('#fefdfd', '#f5f1f1'), card: kitBg('#ffffff', '#faf8f8'), field: '#ffffff',
            soft: '#ebe6e6', softx: '#2b2020', sunk: 'rgba(80,30,30,.04)', pill: '#ffffff', shadow: 'rgba(60,20,20,.18)',
            teal: kitGrad('#cc5552', '#9d201f'), green: kitGrad('#8e939d', '#6f747e'),
            yellow: kitGrad('#e8c66e', '#d2a444'), red: kitGrad('#c45a72', '#a23d55'),
            accent: '#b0302d', ink: '#ffffff', link: '#a0201f', err: '#b3261e', ok: '#2e7d4f', scheme: 'light'
        }
    },
    ffn: {
        dark: {
            text: '#ececf3', muted: '#9d9fb0', line: 'rgba(255,255,255,.09)', edge: 'rgba(255,255,255,.17)',
            win: kitBg('#1e2025', '#15171b'), card: kitBg('#2c2f36', '#25282e'), field: '#0a0b0d',
            soft: '#363944', softx: '#ececf3', pill: '#1a1c21', shadow: 'rgba(0,0,0,.55)',
            teal: kitGrad('#7576da', '#4143aa'), green: kitGrad('#7a7f8c', '#5a5e69'),
            yellow: kitGrad('#ebcc75', '#d4ab4a'), red: kitGrad('#dc6c54', '#b84632'),
            accent: '#6566d0', ink: '#ffffff', link: '#a9aaff', err: '#ff9a85', ok: '#8fd6a0'
        },
        light: {
            text: '#24243a', muted: '#77766a', line: 'rgba(60,60,40,.12)', edge: 'rgba(60,60,40,.2)',
            win: kitBg('#fdfcf5', '#f5f2e4'), card: kitBg('#fffffe', '#fbfaf2'), field: '#fdfdfa',
            soft: '#e9e6d2', softx: '#24243a', sunk: 'rgba(60,60,40,.04)', pill: '#ffffff', shadow: 'rgba(60,60,30,.18)',
            teal: kitGrad('#6668cc', '#3a3ba4'), green: kitGrad('#8a8d98', '#6a6d78'),
            yellow: kitGrad('#efd078', '#dcb04a'), red: kitGrad('#d8694f', '#bf4b33'),
            accent: '#5254c4', ink: '#ffffff', link: '#3e40b0', err: '#b3261e', ok: '#2e7d4f', scheme: 'light'
        }
    },
    wattpad: {
        dark: {
            text: '#f4ece7', muted: '#ae9f97', line: 'rgba(255,220,200,.09)', edge: 'rgba(255,220,200,.17)',
            win: kitBg('#2b2423', '#1f1918'), card: kitBg('#3a3231', '#322b2a'), field: '#0f0c0b',
            soft: '#463a36', softx: '#f4ece7', pill: '#241e1d', shadow: 'rgba(0,0,0,.55)',
            teal: kitGrad('#fa8c45', '#e4621e'), green: kitGrad('#2f95a6', '#1c6f7f'),
            yellow: kitGrad('#f6cf6c', '#e8ac3c'), red: kitGrad('#ee6e60', '#d6433a'),
            accent: '#f07a33', ink: '#ffffff', link: '#ffb37e', err: '#ff9a85', ok: '#8fd6a0'
        },
        light: {
            text: '#3b2516', muted: '#8e7462', line: 'rgba(140,90,30,.13)', edge: 'rgba(140,90,30,.23)',
            win: kitBg('#fffcf4', '#fbf2df'), card: kitBg('#fffffe', '#fffaf0'), field: '#fffdfa',
            soft: '#fae2b6', softx: '#6b3a10', sunk: 'rgba(140,90,30,.05)', pill: '#ffffff', shadow: 'rgba(120,80,30,.2)',
            teal: kitGrad('#fd9a30', '#f2720a'), green: kitGrad('#2f95a6', '#1c6f7f'),
            yellow: kitGrad('#fbd060', '#f2b33a'), red: kitGrad('#ea5148', '#d63a33'),
            accent: '#f6801a', ink: '#ffffff', link: '#b4560a', err: '#b3261e', ok: '#2e7d4f', scheme: 'light'
        }
    },
    jjwxc: {
        dark: {
            text: '#e9f3ec', muted: '#98b0a1', line: 'rgba(170,230,195,.16)', edge: 'rgba(170,230,195,.3)',
            win: kitBg('#1d3027', '#14231c'), card: kitBg('#27402f', '#20362a'), field: '#09140f',
            soft: '#2f4a39', softx: '#e9f3ec', pill: '#182a21', shadow: 'rgba(0,0,0,.5)',
            teal: kitGrad('#4ed486', '#25a05a'), green: kitGrad('#8fb7a0', '#678f78'),
            yellow: kitGrad('#efd86e', '#d9b936'), red: kitGrad('#ee7f72', '#d4524a'),
            accent: '#3cc474', ink: '#052b14', link: '#8fe6b4', err: '#ff9a8c', ok: '#8fe6b4'
        },
        light: {
            text: '#17301f', muted: '#5c7a66', line: 'rgba(20,90,50,.14)', edge: 'rgba(20,90,50,.23)',
            win: kitBg('#f6fbf7', '#eaf4ed'), card: kitBg('#ffffff', '#f2f8f4'), field: '#ffffff',
            soft: '#dcebe1', softx: '#17301f', sunk: 'rgba(20,90,50,.05)', pill: '#ffffff', shadow: 'rgba(30,70,45,.2)',
            teal: kitGrad('#3fcb7a', '#1c9a55'), green: kitGrad('#9db3a5', '#74907f'),
            yellow: kitGrad('#f6d454', '#e9b52c'), red: kitGrad('#f79085', '#ec6a5f'),
            accent: '#1c9a55', ink: '#ffffff', link: '#117a43', err: '#c0392b', ok: '#12805c', scheme: 'light'
        }
    }
};
function kitSite() {
    var h = String(location.hostname || '').toLowerCase();
    if (/(^|\.)lofter\.com$/.test(h)) return 'lofter';
    if (/sangtacviet|^14\.225\.254\.182$/.test(h)) return 'stv';
    if (/wikicv|wikidich|dichtienghoa|koanchay|truyenwikidich/.test(h)) return 'wikicv';
    if (/archiveofourown|(^|\.)ao3\.org$/.test(h)) return 'ao3';
    if (/fanfiction\.net|fictionpress\.com/.test(h)) return 'ffn';
    if (/wattpad/.test(h)) return 'wattpad';
    if (/(^|\.)jjwxc\.net$/.test(h)) return 'jjwxc';
    return 'lofter';
}
// Tương phản WCAG: chữ trên nút màu phải đạt 4,5 : 1 ở đầu gradient xấu hơn. Chọn chữ trắng hoặc
// chữ tối, rồi nếu còn thiếu thì nhích nền về phía đối lập (đổi nền ít nhất có thể).
function kitRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
}
function kitHex(c) {
    return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join('');
}
function kitLum(c) {
    var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
}
function kitRatio(a, b) {
    var x = kitLum(a), y = kitLum(b);
    if (x < y) { var t = x; x = y; y = t; }
    return (x + 0.05) / (y + 0.05);
}
function kitMix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
// grad = 'linear-gradient(135deg,#a 0%,#b 100%)' → { grad, on }
function kitFitGrad(grad, darkText) {
    var m = String(grad).match(/#[0-9a-f]{3,6}/gi);
    if (!m || m.length < 2) return { grad: grad, on: '#ffffff' };
    var c = [kitRgb(m[0]), kitRgb(m[1])], best = null;
    [[[255, 255, 255], [0, 0, 0]], [darkText, [255, 255, 255]]].forEach(function (opt) {
        var tx = opt[0], to = opt[1], cost = 0, p = c;
        var worst = function (q) { return Math.min(kitRatio(tx, q[0]), kitRatio(tx, q[1])); };
        while (worst(p) < 4.5 && cost < 0.75) {
            cost += 0.03;
            p = [kitMix(c[0], to, cost), kitMix(c[1], to, cost)];
        }
        if (!best || cost < best.cost - 1e-9) best = { cost: cost, tx: tx, p: p };
    });
    return { grad: kitGrad(kitHex(best.p[0]), kitHex(best.p[1])), on: kitHex(best.tx) };
}
// Bộ màu đầy đủ (mọi khóa của KIT_DARK) cho một trang và một theme.
function kitPalette(site, light) {
    var s = KIT_SITES[site] || KIT_SITES.lofter, out = {}, k;
    for (k in KIT_DARK) out[k] = KIT_DARK[k];
    if (light) for (k in KIT_SITES.lofter.light) out[k] = KIT_SITES.lofter.light[k];
    var own = light ? s.light : s.dark;
    for (k in own) out[k] = own[k];
    var dark = kitHex(kitMix(kitRgb(out.accent), [0, 0, 0], 0.7)), f;
    f = kitFitGrad(out.teal, kitRgb(dark)); out.teal = f.grad; out.on = f.on; out.ink = f.on;
    f = kitFitGrad(out.green, kitRgb(dark)); out.green = f.grad; out.ong = f.on;
    f = kitFitGrad(out.yellow, kitRgb(dark)); out.yellow = f.grad; out.ony = f.on;
    f = kitFitGrad(out.red, kitRgb(dark)); out.red = f.grad; out.onr = f.on;
    return out;
}
var KIT_TOKENS = ':host{all:initial;' + Object.keys(KIT_DARK).map(function (k) {
    return '--k-' + k + ':var(--kt-' + k + ',' + KIT_DARK[k] + ');';
}).join('') + 'color-scheme:var(--k-scheme);}' +
    '*{box-sizing:border-box;}';
var KIT_FONT = 'font-family:"Be Vietnam Pro","Segoe UI",system-ui,-apple-system,Roboto,"Noto Sans","Microsoft YaHei","Noto Sans CJK SC",Arial,sans-serif;';
var KIT_CSS = KIT_TOKENS +
    '.kit{' + KIT_FONT + 'font-size:12px;line-height:1.45;color:var(--k-text);padding:10px;}' +
    '.card{border:1px solid var(--k-line);border-radius:10px;background:var(--k-card);padding:10px;margin:0 0 9px;min-width:0;' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.04);}' +
    '.card:last-child{margin-bottom:0;}' +
    '.card>h4{margin:0 0 9px;font-size:12.5px;font-weight:800;color:var(--k-text);}' +
    '.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 0 8px;}.row:last-child{margin-bottom:0;}' +
    '.grow{flex:1;min-width:0;}' +
    // Lưới hai cột chia đều (nút đôi, ô đánh dấu) · dòng "nhãn ……… ô nhập" · phần tử giãn hết chiều ngang.
    '.g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin:0 0 8px;align-items:center;}.g2:last-child{margin-bottom:0;}' +
    '.g2>.btn{width:100%;padding-left:6px;padding-right:6px;overflow:hidden;text-overflow:ellipsis;}.g2>label.ck{min-width:0;}' +
    '.kv{display:flex;align-items:center;gap:8px;margin:0 0 8px;}.kv:last-child{margin-bottom:0;}.kv>span{flex:1;min-width:0;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.full{width:100%;}' +
    '.btn{' + KIT_FONT + 'appearance:none;border:0;border-radius:7px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer;' +
    'background:var(--k-soft);color:var(--k-softx);white-space:nowrap;line-height:1.25;min-height:28px;}' +
    '.btn:hover{filter:brightness(1.08);}.btn:active{transform:translateY(1px);}' +
    '.btn[disabled]{opacity:.45;cursor:not-allowed;filter:none;}' +
    '.btn.pri,.btn.sec,.btn.warn,.btn.dan{color:var(--k-on);text-shadow:none;' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 2px 6px rgba(0,0,0,.12);}' +
    '.btn.pri{background:var(--k-teal);}.btn.sec{background:var(--k-green);color:var(--k-ong);}' +
    '.btn.warn{background:var(--k-yellow);color:var(--k-ony);}.btn.dan{background:var(--k-red);color:var(--k-onr);}' +
    '.btn.sm{padding:4px 9px;font-size:11.5px;min-height:24px;}' +
    'input[type=text],input[type=number],input[type=url],select,textarea{' + KIT_FONT + 'background:var(--k-field);color:var(--k-text);' +
    'border:1px solid var(--k-line);border-radius:7px;padding:5px 9px;font-size:12px;min-width:0;min-height:28px;}' +
    'input[type=text]:focus,input[type=number]:focus,input[type=url]:focus,select:focus,textarea:focus{outline:none;border-color:var(--k-accent);}' +
    'textarea{width:100%;resize:vertical;line-height:1.5;}select{max-width:100%;}' +
    'input::placeholder,textarea::placeholder{color:var(--k-muted);opacity:.75;}' +
    'input[type=checkbox],input[type=radio]{accent-color:var(--k-accent);width:16px;height:16px;margin:0;flex:none;}' +
    'input[type=range]{accent-color:var(--k-accent);}' +
    'label.ck{display:inline-flex;align-items:center;gap:7px;font-size:12px;cursor:pointer;min-height:24px;user-select:none;color:var(--k-text);}' +
    // Công tắc: <label class="sw"><input type="checkbox"><i></i></label>
    'label.sw{position:relative;display:inline-block;width:36px;height:24px;flex:none;cursor:pointer;}' +
    'label.sw input{position:absolute;opacity:0;width:0;height:0;}' +
    'label.sw i{position:absolute;inset:0;border-radius:99px;background:var(--k-soft);transition:background .15s;}' +
    'label.sw i::after{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;' +
    'box-shadow:0 1px 2px rgba(0,0,0,.3);transition:transform .15s;}' +
    'label.sw input:checked+i{background:var(--k-teal);}label.sw input:checked+i::after{transform:translateX(12px);}' +
    'label.sw input:focus-visible+i,input:focus-visible,select:focus-visible,textarea:focus-visible,.btn:focus-visible{outline:2px solid var(--k-accent);outline-offset:2px;}' +
    '.lb{display:block;font-size:11px;color:var(--k-muted);margin:0 0 4px;}' +
    '.hint{font-size:11px;color:var(--k-muted);line-height:1.5;}' +
    '.err{color:var(--k-err);}.ok{color:var(--k-ok);}' +
    'details.adv{border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;background:var(--k-field);margin:0 0 8px;}' +
    'details.adv:last-child{margin-bottom:0;}' +
    'details.adv>summary{cursor:pointer;font-weight:700;font-size:12px;user-select:none;}' +
    'details.adv[open]>summary{margin-bottom:8px;}' +
    '.console{' + KIT_FONT + 'background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;height:130px;overflow:auto;' +
    'font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word;color:var(--k-text);}' +
    '.bar{height:5px;border-radius:9px;background:var(--k-soft);overflow:hidden;}' +
    '.bar>i{display:block;height:100%;width:0;background:var(--k-teal);border-radius:9px;transition:width .2s;}' +
    'a{color:var(--k-link);}' +
    '::-webkit-scrollbar{width:8px;height:8px;}::-webkit-scrollbar-thumb{background:var(--k-edge);border-radius:9px;}';

// Biểu tượng của từng tab / nút tròn. Chuỗi = path SVG 24×24 (nét); { text } = một chữ cái.
var KIT_ICONS = {
    tts: 'M4.5 13v4.5A1.5 1.5 0 006 19h1.2A1.8 1.8 0 009 17.2v-3.4A1.8 1.8 0 007.2 12H6a1.5 1.5 0 00-1.5 1zM19.5 13v4.5A1.5 1.5 0 0118 19h-1.2a1.8 1.8 0 01-1.8-1.8v-3.4a1.8 1.8 0 011.8-1.8H18a1.5 1.5 0 011.5 1zM4.5 13A7.5 7.5 0 0112 5.5 7.5 7.5 0 0119.5 13',
    ndl: 'M12 4v10m0 0l-4-4m4 4l4-4M5 19h14',
    tm: { text: 'D' },
    lib: 'M12 6.5C10.3 5.3 7.8 4.8 4 5v13c3.8-.2 6.3.3 8 1.5 1.7-1.2 4.2-1.7 8-1.5V5c-3.8-.2-6.3.3-8 1.5zM12 6.5v13',
    desk: 'M10.5 4.5a6 6 0 104.24 10.24L19.5 19.5M10.5 4.5a6 6 0 014.24 10.24'
};
function kitIcon(name) {
    var NS = 'http://www.w3.org/2000/svg';
    var def = KIT_ICONS[name] || KIT_ICONS.tm;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18'); svg.setAttribute('height', '18');
    if (typeof def === 'object') {
        var t = document.createElementNS(NS, 'text');
        t.setAttribute('x', '12'); t.setAttribute('y', '17.5'); t.setAttribute('text-anchor', 'middle');
        t.setAttribute('font-size', '16'); t.setAttribute('font-weight', '700'); t.setAttribute('fill', 'currentColor');
        t.setAttribute('font-family', '"Be Vietnam Pro","Segoe UI",Arial,sans-serif');
        t.textContent = def.text;
        svg.appendChild(t);
        return svg;
    }
    var p = document.createElementNS(NS, 'path');
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('d', def);
    svg.appendChild(p);
    return svg;
}

/* ---- Theme ------------------------------------------------------------------- */
var KIT_THEME_KEY = 'aurel-ui-theme';
var KIT_THEMES = {
    dark: { next: 'light', glyph: '☾', name: 'tối' },
    light: { next: 'auto', glyph: '☀', name: 'sáng' },
    auto: { next: 'dark', glyph: '◐', name: 'theo hệ thống' }
};
function kitThemeGet() {
    try { var v = localStorage.getItem(KIT_THEME_KEY); return KIT_THEMES[v] ? v : 'dark'; } catch (e) { return 'dark'; }
}
// Đặt bộ màu của trang này (tối hoặc sáng) lên các khung gốc đang có, và cập nhật nút theme.
function kitThemeApply() {
    var mode = kitThemeGet(), light = mode === 'light', site = kitSite();
    try { if (mode === 'auto') light = window.matchMedia('(prefers-color-scheme: light)').matches; } catch (e) {}
    var pal = kitPalette(site, light);
    // Khung gốc của bảng chung + mọi khung riêng của script khác xin nhận màu bằng data-aurel-skin.
    var els = ['aurel-hub', 'aurel-hub-2', 'aurel-hub-3', 'aurel-dock'].map(function (id) { return document.getElementById(id); });
    try { els = els.concat(Array.prototype.slice.call(document.querySelectorAll('[data-aurel-skin]'))); } catch (e) {}
    els.forEach(function (el) {
        var k;
        if (!el) return;
        for (k in pal) el.style.setProperty('--kt-' + k, pal[k]);
        el.setAttribute('data-theme', light ? 'light' : 'dark');
        el.setAttribute('data-site', site);
        var items = el.shadowRoot ? el.shadowRoot.querySelectorAll('.menu button[data-mode]') : [];
        Array.prototype.forEach.call(items, function (b) { b.firstChild.textContent = b.getAttribute('data-mode') === mode ? '✓' : ''; });
    });
}
function kitThemeSet(mode) {
    try { localStorage.setItem(KIT_THEME_KEY, mode); } catch (e) {}
    kitThemeApply();
}

/* ---- Cột nút nhanh ---------------------------------------------------------- */
function dockEl() {
    var d = document.getElementById('aurel-dock');
    if (d) return d;
    d = document.createElement('div');
    d.id = 'aurel-dock';
    d.style.cssText = 'all:initial;position:fixed;right:14px;bottom:14px;z-index:2147483646;display:flex;' +
        'flex-direction:row;align-items:flex-end;gap:10px;pointer-events:none;';
    var side = document.createElement('div'), col = document.createElement('div');
    side.className = 'side';
    side.style.cssText = 'all:initial;display:flex;flex-direction:column;align-items:flex-end;gap:8px;pointer-events:auto;';
    col.className = 'col';
    col.style.cssText = 'all:initial;display:flex;flex-direction:column-reverse;align-items:flex-end;gap:8px;pointer-events:none;';
    d.appendChild(side); d.appendChild(col);
    document.documentElement.appendChild(d);
    kitThemeApply();
    return d;
}
function dockSlot(id, order) {
    var col = dockEl().querySelector('.col');
    var slot = col.querySelector('[data-slot="' + id + '"]');
    if (!slot) {
        slot = document.createElement('div');
        slot.setAttribute('data-slot', id);
        slot.style.cssText = 'all:initial;order:' + order + ';display:flex;flex-direction:column-reverse;' +
            'align-items:flex-end;gap:8px;pointer-events:auto;';
        col.appendChild(slot);
    }
    return slot;
}
// Chỗ bên trái cột nút — cho mini-player, để nó nằm cạnh các nút tròn thay vì chồng lên trên.
function dockSide() { return dockEl().querySelector('.side'); }
var DOCK_CSS = KIT_TOKENS +
    // Khi thu: chỉ còn vòng tròn. Rê chuột: chữ mở ra bên trái, vòng tròn đứng yên.
    '.pill{' + KIT_FONT + 'display:flex;flex-direction:row-reverse;align-items:center;height:42px;padding:3px;border-radius:999px;cursor:pointer;' +
    'background:transparent;border:1px solid transparent;color:var(--k-text);user-select:none;' +
    'transition:background .18s ease,border-color .18s ease,box-shadow .18s ease;}' +
    '.pill:hover,.pill.open{background:var(--k-pill);border-color:var(--k-edge);box-shadow:0 6px 18px var(--k-shadow);}' +
    '.pill .ic{all:unset;flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;cursor:pointer;' +
    'background:var(--k-teal);color:var(--k-on);font-weight:800;font-size:14px;' +
    '.pill .ic:focus-visible{outline:2px solid var(--k-accent);outline-offset:2px;}' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 4px 12px var(--k-shadow);}' +
    '.pill .ic:hover{filter:brightness(1.1);}' +
    '.pill .tx{all:unset;cursor:pointer;font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;max-width:0;opacity:0;' +
    'transition:max-width .18s ease,opacity .18s ease,padding .18s ease;padding:0;}' +
    '.pill:hover .tx,.pill.open .tx{max-width:190px;opacity:1;padding:0 9px 0 12px;}' +
    '.pill.busy .ic{animation:kpulse 1s ease-in-out infinite;}' +
    '.pill.on .ic{outline:2px solid var(--k-accent);outline-offset:2px;}' +
    '@keyframes kpulse{50%{filter:brightness(1.3);}}';
// Một nút trên cột: vòng tròn = làm ngay (onIcon), chữ = mở tab (onLabel). Chữ ẩn cho tới
// khi rê chuột vào. Trả về { host, pill, ic, tx } để script tự đổi nhãn / trạng thái.
function dockPill(slot, icon, label, onIcon, onLabel) {
    var host = document.createElement('div');
    host.style.cssText = 'all:initial;display:block;';
    var r = host.attachShadow({ mode: 'open' });
    var st = document.createElement('style');
    st.textContent = DOCK_CSS;
    var pill = document.createElement('div'), ic = document.createElement('button'), tx = document.createElement('button');
    pill.className = 'pill'; ic.className = 'ic'; tx.className = 'tx';
    if (typeof icon === 'string' && KIT_ICONS[icon]) ic.appendChild(kitIcon(icon)); else ic.textContent = icon;
    tx.textContent = label;
    ic.addEventListener('click', function (e) { e.stopPropagation(); (onIcon || onLabel)(e); });
    tx.addEventListener('click', function (e) { e.stopPropagation(); (onLabel || onIcon)(e); });
    pill.appendChild(ic); pill.appendChild(tx);
    r.appendChild(st); r.appendChild(pill);
    slot.appendChild(host);
    return { host: host, pill: pill, ic: ic, tx: tx };
}

/* ---- Bảng chung ------------------------------------------------------------- */
var HUB_CSS = KIT_TOKENS +
    '.win{' + KIT_FONT + 'width:300px;max-width:calc(100vw - 20px);max-height:min(90vh,860px);display:flex;flex-direction:column;' +
    'background:var(--k-win);color:var(--k-text);border:1px solid var(--k-edge);border-radius:12px;' +
    'box-shadow:0 20px 55px var(--k-shadow);overflow:hidden;font-size:12px;line-height:1.45;}' +
    '.bar{display:flex;align-items:flex-end;gap:8px;margin:0 10px;padding:9px 0 9px;border-bottom:1px solid var(--k-line);}' +
    '.tabs{display:flex;gap:6px;flex:1;min-width:0;}' +
    '.tab{all:unset;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;height:30px;min-width:30px;padding:0;' +
    'border-radius:7px;box-sizing:border-box;border:1px solid var(--k-edge);background:var(--k-sunk);color:var(--k-text);opacity:.8;' +
    'font-size:12px;font-weight:800;white-space:nowrap;}' +
    '.tab svg{width:16px;height:16px;flex:none;}' +
    '.tab .tl{display:none;}.tab:hover{opacity:1;background:var(--k-soft);}' +
    '.tab.on{background:var(--k-teal);color:var(--k-ink);border-color:transparent;opacity:1;padding:0 13px 0 10px;' +
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 3px 10px rgba(0,0,0,.15);}.tab.on .tl{display:inline;}' +
    '.side{display:flex;flex-direction:column;align-items:flex-end;gap:4px;}' +
    '.ver{font-size:11px;color:var(--k-muted);line-height:1;min-height:9px;}' +
    '.wb{display:flex;gap:4px;}' +
    '.wb button{all:unset;cursor:pointer;box-sizing:border-box;width:24px;height:24px;display:grid;place-items:center;border:1px solid var(--k-edge);' +
    'border-radius:6px;font-size:13px;font-weight:800;line-height:1;color:var(--k-text);background:var(--k-sunk);}' +
    '.wb button:hover{background:var(--k-soft);}.wb button:focus-visible{outline:2px solid var(--k-accent);outline-offset:1px;}' +
    '.menu{position:absolute;right:10px;top:46px;z-index:5;min-width:190px;padding:5px;border:1px solid var(--k-edge);border-radius:9px;' +
    'background:var(--k-card);box-shadow:0 10px 28px var(--k-shadow);display:none;}.menu.open{display:block;}' +
    '.menu .mh{font-size:11px;color:var(--k-muted);padding:4px 8px 2px;}' +
    '.menu button{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;box-sizing:border-box;width:100%;min-height:28px;padding:0 8px;' +
    'border-radius:6px;font-size:12px;color:var(--k-text);}.menu button:hover,.menu button:focus-visible{background:var(--k-soft);}' +
    '.menu button .tick{width:14px;color:var(--k-accent);font-weight:800;}' +
    '.win{position:relative;}' +
    '.sheet{position:absolute;inset:0;z-index:6;display:none;flex-direction:column;background:var(--k-win);}.sheet.open{display:flex;}' +
    '.sheet .sh{display:flex;align-items:center;gap:8px;padding:9px 10px;border-bottom:1px solid var(--k-line);font-weight:800;}' +
    '.sheet .sh span{flex:1;}.sheet .sh button{all:unset;cursor:pointer;width:24px;height:24px;display:grid;place-items:center;border:1px solid var(--k-edge);border-radius:6px;background:var(--k-sunk);}' +
    '.sheet .sb{flex:1;min-height:0;overflow:auto;padding:10px;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-word;}' +
    '.sheet .sb.mono{font-size:11px;}' +
    '.bar{cursor:grab;touch-action:none;}.bar.drag{cursor:grabbing;}.bar button,.bar .tab{cursor:pointer;}' +
    '.grip{position:absolute;left:50%;top:3px;width:28px;height:3px;margin-left:-14px;border-radius:3px;background:var(--k-edge);pointer-events:none;}' +
    '.panes{flex:1;min-height:0;overflow:auto;}' +
    '::-webkit-scrollbar{width:8px;}::-webkit-scrollbar-thumb{background:var(--k-edge);border-radius:9px;}';
// Vị trí bảng: kéo ở thanh tab, nhớ trong localStorage của trang (khóa chung cho cả ba sandbox);
// bấm đúp thanh tab để về góc phải dưới. Phím tắt Alt+Shift+A mở / đóng bảng.
var KIT_POS_KEY = 'aurel-ui-pos';
function kitPosSave(p) {
    try { if (p) localStorage.setItem(KIT_POS_KEY, JSON.stringify(p)); else localStorage.removeItem(KIT_POS_KEY); } catch (e) {}
}
function kitPosApply(h) {
    var p = null, x, y;
    try { p = JSON.parse(localStorage.getItem(KIT_POS_KEY) || 'null'); } catch (e) {}
    if (!p || typeof p.x !== 'number' || typeof p.y !== 'number') {
        h.style.left = ''; h.style.top = ''; h.style.right = '14px'; h.style.bottom = '14px';
        return;
    }
    x = Math.max(0, Math.min(p.x, window.innerWidth - 60));
    y = Math.max(0, Math.min(p.y, window.innerHeight - 40));
    h.style.right = 'auto'; h.style.bottom = 'auto'; h.style.left = x + 'px'; h.style.top = y + 'px';
}
// Nhật ký chung: script nào cũng ghi được bằng kitLog('...'); sandbox dựng bảng nghe 'aurel-hub:log'.
function kitLog(text) {
    try { document.dispatchEvent(new CustomEvent('aurel-hub:log', { detail: String(text) })); } catch (e) {}
}
var KIT_KEYS = [KIT_THEME_KEY, KIT_POS_KEY];
function kitExport() {
    var o = {}, k;
    try { for (k = 0; k < KIT_KEYS.length; k++) { var v = localStorage.getItem(KIT_KEYS[k]); if (v != null) o[KIT_KEYS[k]] = v; } } catch (e) {}
    return JSON.stringify(o);
}
function kitImport(text) {
    var o = JSON.parse(text), k, n = 0;
    for (k = 0; k < KIT_KEYS.length; k++) if (typeof o[KIT_KEYS[k]] === 'string') { localStorage.setItem(KIT_KEYS[k], o[KIT_KEYS[k]]); n++; }
    return n;
}
function kitReset() {
    try { KIT_KEYS.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
}
var KIT_GUIDE = 'Script không chạy? Không thấy nút ở góc phải dưới?\n\n' +
    '1. Chrome / Edge 138 trở lên: vào chrome://extensions (edge://extensions), mở chi tiết Tampermonkey và bật "Allow User Scripts". ' +
    'Bản cũ hơn: bật Developer mode ở trang đó.\n' +
    '2. Trên biểu tượng Tampermonkey, kiểm tra script của trang này đang bật.\n' +
    '3. Tải lại trang (Ctrl + R).\n\n' +
    'Phím tắt mở / đóng bảng: Alt + Shift + A.';
function hubToggle() {
    var h = hubEl(), first = h.shadowRoot.querySelector('.tab');
    if (hubActive()) hubHide();
    else hubShow(h.getAttribute('data-last') || (first && first.getAttribute('data-tab')) || '');
}
function hubEl() {
    // Bảng do script khác tạo: shadow root mở thì sandbox nào cũng với tới được. Nếu trình
    // quản lý userscript không cho (shadowRoot = null) thì lùi sang một bảng riêng.
    var ids = ['aurel-hub', 'aurel-hub-2', 'aurel-hub-3'], h, i;
    for (i = 0; i < ids.length; i++) {
        h = document.getElementById(ids[i]);
        if (h && h.shadowRoot) return h;
        if (!h) break;
    }
    h = document.createElement('div');
    h.id = ids[Math.min(i, ids.length - 1)];
    h.className = 'ttsr-ui';   // TTS Reader coi mọi thứ mang class này là giao diện, không phải chữ của trang
    h.style.cssText = 'all:initial;position:fixed;right:14px;bottom:14px;z-index:2147483647;display:none;';
    var r = h.attachShadow({ mode: 'open' });
    var mk = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
    var st = mk('style'), win = mk('div', 'win'), bar = mk('div', 'bar'), tabs = mk('div', 'tabs'),
        side = mk('div', 'side'), ver = mk('div', 'ver'), wb = mk('div', 'wb'), panes = mk('div', 'panes');
    st.textContent = HUB_CSS;
    var bMore = mk('button', 'th', '⋯'), bMin = mk('button', '', '–'), bClose = mk('button', '', '✕'), menu = mk('div', 'menu');
    bMore.title = 'Giao diện · hướng dẫn';
    bMore.setAttribute('aria-haspopup', 'menu');
    bMin.title = 'Thu bảng lại (các nút nhanh vẫn ở góc màn hình)';
    bClose.title = 'Đóng';
    var say = function (type) { document.dispatchEvent(new CustomEvent(type, { detail: h.getAttribute('data-active') || '' })); };
    // Menu ⋯: giao diện (theo hệ thống · sáng · tối) và hướng dẫn của tab đang mở.
    var menuItem = function (label, mode, fn) {
        var b = mk('button'), t = mk('span', 'tick');
        b.setAttribute('role', 'menuitem');
        if (mode) b.setAttribute('data-mode', mode);
        b.appendChild(t); b.appendChild(document.createTextNode(label));
        b.addEventListener('click', function () { menu.classList.remove('open'); fn(); });
        menu.appendChild(b);
    };
    menu.appendChild(mk('div', 'mh', 'Giao diện'));
    menuItem('Theo hệ thống', 'auto', function () { kitThemeSet('auto'); });
    menuItem('Sáng', 'light', function () { kitThemeSet('light'); });
    menuItem('Tối', 'dark', function () { kitThemeSet('dark'); });
    menu.appendChild(mk('div', 'mh', 'Trợ giúp'));
    menuItem('Hướng dẫn của tab này', '', function () { say('aurel-hub:help'); });
    menuItem('Đặt lại vị trí bảng', '', function () { kitPosSave(null); kitPosApply(h); });
    var logs = [];
    document.addEventListener('aurel-hub:log', function (e) {
        var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
        logs.push(p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + '  ' + e.detail);
        if (logs.length > 200) logs.shift();
    });
    var sheet = mk('div', 'sheet'), sh = mk('div', 'sh'), shT = mk('span'), shX = mk('button', '', '✕'), sb = mk('div', 'sb');
    shX.title = 'Đóng';
    shX.addEventListener('click', function () { sheet.classList.remove('open'); });
    sh.appendChild(shT); sh.appendChild(shX); sheet.appendChild(sh); sheet.appendChild(sb);
    var openSheet = function (title, text, mono) { shT.textContent = title; sb.textContent = text; sb.className = mono ? 'sb mono' : 'sb'; sheet.classList.add('open'); };
    menu.appendChild(mk('div', 'mh', 'Cài đặt giao diện'));
    menuItem('Xuất (chép vào clipboard)', '', function () {
        var t = kitExport();
        try { navigator.clipboard.writeText(t).then(function () { kitLog('Đã chép cài đặt giao diện vào clipboard'); }, function () { window.prompt('Chép đoạn này:', t); }); }
        catch (e) { window.prompt('Chép đoạn này:', t); }
    });
    menuItem('Nhập…', '', function () {
        var t = window.prompt('Dán cài đặt giao diện đã xuất:');
        if (!t) return;
        try { kitLog('Đã nhập ' + kitImport(t) + ' mục cài đặt giao diện'); kitThemeApply(); kitPosApply(h); }
        catch (e) { kitLog('Nhập lỗi: ' + e.message); openSheet('Nhập lỗi', String(e.message)); }
    });
    menuItem('Đặt lại giao diện + vị trí', '', function () { kitReset(); kitThemeApply(); kitPosApply(h); kitLog('Đã đặt lại giao diện và vị trí'); });
    menu.appendChild(mk('div', 'mh', 'Cài đặt riêng từng script nằm trong Tampermonkey, không thuộc phần này.'));
    menuItem('Nhật ký', '', function () { openSheet('Nhật ký', logs.length ? logs.join('\n') : '(chưa có dòng nào)', true); });
    menuItem('Script không chạy?', '', function () { openSheet('Script không chạy?', KIT_GUIDE); });
    win.appendChild(sheet);
    menu.appendChild(mk('div', 'mh', 'Phím tắt mở / đóng: Alt + Shift + A'));
    bMore.addEventListener('click', function (e) { e.stopPropagation(); menu.classList.toggle('open'); });
    win.addEventListener('click', function () { menu.classList.remove('open'); });
    win.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu.classList.remove('open'); });
    bMin.addEventListener('click', hubHide);
    bClose.addEventListener('click', function () { say('aurel-hub:close'); hubHide(); });
    wb.appendChild(bMore); wb.appendChild(bMin); wb.appendChild(bClose);
    var grip = mk('div', 'grip');
    win.appendChild(grip);
    bar.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 || e.target.closest && e.target.closest('button')) return;
        var box = h.getBoundingClientRect(), dx = e.clientX - box.left, dy = e.clientY - box.top;
        bar.classList.add('drag');
        try { bar.setPointerCapture(e.pointerId); } catch (x) {}
        var move = function (ev) {
            h.style.right = 'auto'; h.style.bottom = 'auto';
            h.style.left = Math.max(0, Math.min(ev.clientX - dx, window.innerWidth - 60)) + 'px';
            h.style.top = Math.max(0, Math.min(ev.clientY - dy, window.innerHeight - 40)) + 'px';
        };
        var up = function () {
            bar.classList.remove('drag');
            bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); bar.removeEventListener('pointercancel', up);
            var b2 = h.getBoundingClientRect();
            kitPosSave({ x: Math.round(b2.left), y: Math.round(b2.top) });
        };
        bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up); bar.addEventListener('pointercancel', up);
    });
    bar.addEventListener('dblclick', function (e) {
        if (e.target.closest && e.target.closest('button')) return;
        kitPosSave(null); kitPosApply(h);
    });
    document.addEventListener('keydown', function (e) {
        if (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && (e.key === 'A' || e.key === 'a')) { e.preventDefault(); hubToggle(); }
    });
    window.addEventListener('resize', function () { if (h.style.display !== 'none') kitPosApply(h); });
    side.appendChild(ver); side.appendChild(wb);
    bar.appendChild(tabs); bar.appendChild(side);
    win.appendChild(bar); win.appendChild(panes); win.appendChild(menu);
    r.appendChild(st); r.appendChild(win);
    document.documentElement.appendChild(h);
    kitThemeApply();
    // "Theo hệ thống": hệ điều hành đổi sáng/tối thì đổi theo.
    try { window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', kitThemeApply); } catch (e) {}
    return h;
}
function hubTab(id, label, order, version, icon) {
    var r = hubEl().shadowRoot;
    var pane = r.querySelector('.panes > [data-pane="' + id + '"]');
    if (pane) return pane;
    var tab = document.createElement('button'), tl = document.createElement('span');
    tab.className = 'tab';
    tab.setAttribute('data-tab', id);
    tab.setAttribute('data-ver', version || '');
    tab.title = label;
    tab.style.order = order;
    tl.className = 'tl';
    tl.textContent = label;
    tab.appendChild(kitIcon(icon || id));
    tab.appendChild(tl);
    tab.addEventListener('click', function () { hubShow(id); });
    r.querySelector('.tabs').appendChild(tab);
    pane = document.createElement('div');
    pane.setAttribute('data-pane', id);
    pane.style.display = 'none';
    r.querySelector('.panes').appendChild(pane);
    return pane;
}
function hubActive() {
    var h = document.getElementById('aurel-hub');
    return (h && h.style.display !== 'none' && h.getAttribute('data-active')) || '';
}
function hubShow(id) {
    var h = hubEl(), r = h.shadowRoot, i, ver = '';
    var panes = r.querySelectorAll('.panes > [data-pane]'), tabs = r.querySelectorAll('.tab');
    for (i = 0; i < panes.length; i++) panes[i].style.display = panes[i].getAttribute('data-pane') === id ? 'block' : 'none';
    for (i = 0; i < tabs.length; i++) {
        var on = tabs[i].getAttribute('data-tab') === id;
        tabs[i].className = on ? 'tab on' : 'tab';
        if (on) ver = tabs[i].getAttribute('data-ver') || '';
    }
    r.querySelector('.ver').textContent = ver ? 'v' + ver : '';
    h.style.display = 'block';
    kitPosApply(h);
    h.setAttribute('data-active', id);
    h.setAttribute('data-last', id);
    // Bảng mở ra ở đúng góc đặt cột nút → ẩn cột nút cho khỏi đè lên nhau.
    var d = document.getElementById('aurel-dock');
    if (d) d.style.display = 'none';
    document.dispatchEvent(new CustomEvent('aurel-hub:change', { detail: id }));
}
function hubHide() {
    var h = hubEl();
    h.style.display = 'none';
    h.setAttribute('data-active', '');
    var d = document.getElementById('aurel-dock');
    if (d) d.style.display = 'flex';
    document.dispatchEvent(new CustomEvent('aurel-hub:change', { detail: '' }));
}
// </aurel-ui-kit>

    /* ================== 6. [GỐC] Tiện ích chữ ================== */
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    function escapeHtml(s) {
        return String(s || '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    function escapeRegExp(s) {
        const input = String(s || '');
        let out = '';
        for (const ch of input) {
            const code = ch.charCodeAt(0);
            if (/^[\\^$.*+?()[\]{}|/]$/.test(ch)) {
                out += `\\${ch}`;
            } else if (ch === '\n') {
                out += '\\n';
            } else if (ch === '\r') {
                out += '\\r';
            } else if (ch === '\t') {
                out += '\\t';
            } else if (ch === '\f') {
                out += '\\f';
            } else if (ch === '\v') {
                out += '\\v';
            } else if (code < 0x20 || code === 0x7f) {
                out += `\\x${code.toString(16).padStart(2, '0')}`;
            } else if (ch === '\u2028' || ch === '\u2029') {
                out += `\\u${code.toString(16).padStart(4, '0')}`;
            } else if (/^[,\-=<>#&!%:;@~'"`]$/.test(ch)) {
                // These punctuators are invalid identity escapes with the Unicode flag.
                out += `\\x${code.toString(16).padStart(2, '0')}`;
            } else {
                out += ch;
            }
        }
        return out;
    }
    function createSafeRegExp(pattern, flags, context = '') {
        try {
            return new RegExp(pattern, flags);
        } catch (err) {
            TM_WARN('[tm-translate] Bỏ qua regex không hợp lệ.', {
                context,
                error: err?.message || String(err),
                pattern
            });
            return null;
        }
    }
    function createTranslatedNameBoundaryRegExp(canonical) {
        const escaped = escapeRegExp(canonical);
        return createSafeRegExp(
            `(^|[^\\p{L}\\p{N}\\p{M}])(${escaped})(?=$|[^\\p{L}\\p{N}\\p{M}])`,
            'giu',
            `name-boundary:${canonical}`
        ) || createSafeRegExp(
            `(^|[^A-Za-z0-9_À-ÖØ-öø-ÿĀ-žƀ-ɏ\\u0300-\\u036f])(${escaped})(?=$|[^A-Za-z0-9_À-ÖØ-öø-ÿĀ-žƀ-ɏ\\u0300-\\u036f])`,
            'gi',
            `name-boundary-fallback:${canonical}`
        );
    }
    function unescapeHtml(s) { return (s || '').toString().replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); }
    function normalizeStraightQuotePairs(text) {
        if (typeof text !== 'string' || !text) return text || '';
        let result = '';
        let isInsideQuote = false;

        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch !== '"') {
                result += ch;
                continue;
            }

            if (!isInsideQuote) {
                const prev = result.slice(-1);
                if (prev && !/\s|[(\[{]/u.test(prev)) {
                    result += ' ';
                }
                result += '"';
                let nextIndex = i + 1;
                while (nextIndex < text.length && /\s/u.test(text[nextIndex])) nextIndex++;
                i = nextIndex - 1;
                isInsideQuote = true;
                continue;
            }

            result = result.replace(/\s+$/u, '');
            result += '"';
            let nextIndex = i + 1;
            while (nextIndex < text.length && /\s/u.test(text[nextIndex])) nextIndex++;
            if (nextIndex < text.length && /[\p{L}\p{N}\p{M}]/u.test(text[nextIndex])) {
                result += ' ';
            }
            i = nextIndex - 1;
            isInsideQuote = false;
        }

        return result;
    }
    function getActiveTranslatedNameValues() {
        try {
            const cfg = config || loadConfig();
            const activeSet = cfg?.nameSets?.[cfg.activeNameSet] || {};
            return Object.values(activeSet)
                .map(name => normalizeTextForTranslation(String(name || '')).trim())
                .filter(Boolean)
                .sort((a, b) => b.length - a.length);
        } catch (err) {
            return [];
        }
    }
    function getTranslatedNameValues(nameSet) {
        if (!nameSet || typeof nameSet !== 'object') return getActiveTranslatedNameValues();
        return Object.values(nameSet)
            .map(name => normalizeTextForTranslation(String(name || '')).trim())
            .filter(Boolean)
            .sort((a, b) => b.length - a.length);
    }
    function isNameBoundaryChar(ch) {
        return !ch || !/[\p{L}\p{N}\p{M}]/u.test(ch);
    }
    function isTranslatedNameAt(text, index, names = getActiveTranslatedNameValues()) {
        if (!text || !names.length || index < 0) return false;
        const tail = text.slice(index);
        const before = text[index - 1] || '';
        if (!isNameBoundaryChar(before)) return false;
        for (const canonical of names) {
            const candidate = tail.slice(0, canonical.length);
            if (candidate.toLocaleLowerCase('vi-VN') !== canonical.toLocaleLowerCase('vi-VN')) continue;
            const after = tail[canonical.length] || '';
            if (isNameBoundaryChar(after)) return true;
        }
        return false;
    }
    function restoreTranslatedNameCasing(text, nameSet) {
        if (typeof text !== 'string' || !text) return text || '';
        // Name chính đã được thay bằng placeholder từ Trung -> Việt trước khi dịch.
        // Không quét lại Việt -> Việt, tránh lỗi kiểu "điều sơn" bị sửa thành "điềU sơn".
        return text;
    }
    function restoreTranslatedNameCasingForSource(text, sourceText, nameSet) {
        const translated = String(text || '');
        if (!translated || !nameSet || typeof nameSet !== 'object') return translated;
        const rawLines = String(sourceText || '').split(/\r?\n/);
        const translatedLines = translated.split(/\r?\n/);
        const sameLineCount = rawLines.length === translatedLines.length;
        const allSource = String(sourceText || '');
        const entries = Object.entries(nameSet)
            .filter(([source, value]) => source && value)
            .sort((a, b) => String(b[1]).length - String(a[1]).length);

        return translatedLines.map((line, index) => {
            const sourceScope = sameLineCount ? (rawLines[index] || '') : allSource;
            let restored = line;
            for (const [source, canonicalValue] of entries) {
                if (!sourceScope.includes(source)) continue;
                const canonical = String(canonicalValue || '').trim();
                if (!canonical) continue;
                const pattern = createSafeRegExp(
                    `(^|[^\\p{L}\\p{N}\\p{M}])(${escapeRegExp(canonical)})(?=$|[^\\p{L}\\p{N}\\p{M}])`,
                    'giu',
                    `restore-name-casing:${source}`
                );
                if (pattern) restored = restored.replace(pattern, (_match, prefix) => `${prefix}${canonical}`);
            }
            return normalizeTranslatedTypography(restored, nameSet);
        }).join('\n');
    }
    function normalizeTranslatedTypography(s, nameSet = null) {
        if (typeof s !== 'string' || !s) return s || '';
        let result = s;

        // dichngay đôi lúc để sót backslash trước dấu quote sau khi xử lý escape lỗi.
        result = result.replace(/\\+\s*(["”“‘’])/g, '$1');

        // Quote thẳng cần phân biệt mở/đóng theo cặp để không phá khoảng trắng bên ngoài.
        result = normalizeStraightQuotePairs(result);

        // Quote cong thì có thể chuẩn khoảng trắng bằng rule đơn giản hơn.
        result = result.replace(/([:;,])([“‘])/g, '$1 $2');
        result = result.replace(/(^|[\s([{:])([“‘])\s+/gu, '$1$2');
        result = result.replace(/(\S)\s+([”’])/gu, (match, prev, quote) => {
            return /[\p{L}\p{N}\p{M}.!?,…]/u.test(prev) ? `${prev}${quote}` : match;
        });
        result = result.replace(/([\p{L}\p{N}\p{M}.!?,…])([”’])(?=[\p{L}\p{N}\p{M}])/gu, '$1$2 ');

        return restoreTranslatedNameCasing(result).replace(/\s+/g, ' ').trim();
    }
    function capitalizeFirstLetter(s, nameSet = null) {
        if (typeof s !== 'string' || !s) return s;
        const normalized = normalizeTranslatedTypography(s, nameSet);
        return normalized.replace(/(^|[\.?!…:])(\s*["'“‘(\[]*)(\p{L})/gu, (match, p1, p2, p3) => {
            return p1 + p2 + p3.toLocaleUpperCase('vi-VN');
        });
    }
    const INVISIBLE_TEXT_FORMATTING_REGEX = /[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF]/;
    const INVISIBLE_TEXT_FORMATTING_GLOBAL_REGEX = /[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF]/g;
    const TOKEN_SPLIT_REGEX = /([^\p{L}\p{N}\p{M}\p{P}\s]+)/gu;
    const TOKEN_SPECIAL_REGEX = /^[^\p{L}\p{N}\p{M}\p{P}\s]+$/u;
    function hasInvisibleTextFormatting(s) {
        return typeof s === 'string' && INVISIBLE_TEXT_FORMATTING_REGEX.test(s);
    }
    function normalizeTextForTranslation(s) {
        if (typeof s !== 'string' || !s) return s || '';
        return s.replace(INVISIBLE_TEXT_FORMATTING_GLOBAL_REGEX, '');
    }

    /* ================== 7. [GỐC] Lõi dịch: gom chữ, bộ tên, gọi máy chủ ================== */
    // Bản gốc tô màu tên trong bản dịch để sửa tên khi bôi chữ; tính năng đó đã bỏ, hàm này chỉ
    // còn để nhánh 'html' của translatePanelText không gãy.
    function highlightNamesInText(translatedText) { return escapeHtml(translatedText); }
    function collectTranslatableItems(includeScriptStyle = false, roots = [document.body]) {
        const items = [];
        const seenNodes = new WeakSet();
        const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'PRE', 'CODE', 'TEXTAREA'];
        const ignoreRootIds = ['tm-translate-host', 'tm-ui-root', 'aurel-hub', 'aurel-dock'];
        const hasMeaningfulTextRegex = /[a-zA-Z\u4e00-\u9fa5\d]/;

        function isIgnored(element) {
            if (!element || seenNodes.has(element)) return true;
            let cur = element;
            while (cur) {
                if (cur.nodeType !== 1) {
                    cur = cur.parentElement;
                    continue;
                }
                if (cur.classList && (cur.classList.contains('tm-chunk') || cur.classList.contains('tm-raw') || cur.classList.contains('tm-parent-translated'))) {
                    return true;
                }
                if (cur.id && ignoreRootIds.some(id => cur.id.startsWith(id))) return true;
                if (cur.isContentEditable) return true;
                if (!includeScriptStyle && skipTags.includes(cur.nodeName.toUpperCase())) return true;
                cur = cur.parentElement;
            }
            return false;
        }

        function traverse(node) {
            if (isIgnored(node)) return;

            if (node.nodeType === Node.ELEMENT_NODE
                && node.tagName.toUpperCase() === 'A'
                && node.children.length === 0) {
                const href = node.getAttribute('href');
                const text = node.textContent.trim();
                if (href && text && hasMeaningfulTextRegex.test(text)) {
                    items.push({ type: 'link', href: href, original: text, node: node });
                    seenNodes.add(node);
                    return;
                }
            }

            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue.trim();
                if (text.length > 0 && hasMeaningfulTextRegex.test(text)) {
                    items.push({ type: 'text', node: node, original: text });
                    seenNodes.add(node);
                }
                return;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const attrsToTranslate = ['title', 'placeholder', 'value'];
                for (const attr of attrsToTranslate) {
                    const text = node.getAttribute(attr)?.trim();
                    if (text && text.length > 0 && hasMeaningfulTextRegex.test(text)) {
                        items.push({ type: 'attribute', element: node, attribute: attr, original: text });
                    }
                }
                seenNodes.add(node);

                for (const child of Array.from(node.childNodes)) {
                    traverse(child);
                }
            }
        }

        roots.forEach(root => traverse(root));
        TM_LOG(`[tm-translate] Đã thu thập được ${items.length} mục mới để dịch.`);
        return items;
    }

    function buildNameSetReplacer(nameSet) {
        const privateKeys = new Set(nameSet?.[NAME_SET_PRIORITY_META]?.privateKeys || []);
        const sortLongestFirst = (a, b) => b.length - a.length;
        const keys = [
            ...Array.from(privateKeys).filter(key => Object.prototype.hasOwnProperty.call(nameSet, key)).sort(sortLongestFirst),
            ...Object.keys(nameSet).filter(key => !privateKeys.has(key)).sort(sortLongestFirst)
        ];
        // [HARDENED/PERF] Ban goc: voi MOI key chay out.includes(k) roi split/join
        // tren toan bo text -> O(so_key x do_dai_text), quet lai text N lan.
        // Name-set vai nghin ten x moi chunk chinh la cho nong nhat cua script.
        // Nay gop thanh MOT regex alternation, quet text dung mot luot.
        // Thu tu uu tien giu nguyen: privateKeys truoc, trong moi nhom dai->ngan
        // (regex alternation chon nhanh khop dau tien tai moi vi tri).
        // Loi phu: ban cu co the vo tinh khop nham vao chinh chuoi placeholder
        // __TM_NAME_n__ da sinh ra truoc do; ban single-pass khong bi loi nay.
        const validKeys = keys.filter(k => k && typeof k === 'string');
        let bigRe = null;
        if (validKeys.length) {
            const pattern = validKeys.map(escapeRegExp).join('|');
            // Regex qua lon (name-set khong lo) -> tra ve null, tu dong fallback.
            bigRe = pattern.length > 900000
                ? null
                : createSafeRegExp(pattern, 'g', 'nameSetReplacer');
        }

        return function (text, placeholderMap) {
            if (!text || !validKeys.length) return text;

            if (bigRe) {
                const idByKey = new Map();
                bigRe.lastIndex = 0;
                return text.replace(bigRe, (matched) => {
                    let id = idByKey.get(matched);
                    if (id === undefined) {
                        id = '__TM_NAME_' + Object.keys(placeholderMap).length + '__';
                        idByKey.set(matched, id);
                        placeholderMap[id] = { orig: matched, viet: nameSet[matched] };
                    }
                    return id;
                });
            }

            // Fallback: giu nguyen thuat toan cu.
            let out = text;
            for (const k of validKeys) {
                if (out.includes(k)) {
                    const id = '__TM_NAME_' + Object.keys(placeholderMap).length + '__';
                    placeholderMap[id] = { orig: k, viet: nameSet[k] };
                    out = out.split(k).join(id);
                }
            }
            return out;
        };
    }

    function restoreNames(text, placeholderMap) {
        if (!text || !placeholderMap) return text;
        let result = text;
        for (const placeholder in placeholderMap) {
            const regex = createSafeRegExp(escapeRegExp(placeholder), 'g', `placeholder:${placeholder}`);
            if (!regex) continue;
            result = result.replace(regex, () => `${placeholderMap[placeholder].viet} `);
        }
        result = result.replace(/\s+([,.;!?\)]|”|’|:)/g, '$1');
        result = result.replace(/([\(\[“‘])\s+/g, '$1');
        result = result.replace(/:([^\s])/g, (match, nextChar, offset, str) => {
            const prevChar = str[offset - 1] || '';
            if (nextChar === '/' || (/\d/.test(prevChar) && /\d/.test(nextChar))) {
                return match;
            }
            return `: ${nextChar}`;
        });
        result = result.replace(/\s+/g, ' ');
        return result.trim();
    }

    function splitIntoBatches(arr, maxChars) {
        const batches = []; let cur = [], curLen = 0;
        for (const s of arr) {
            const s_len = s?.length || 0;
            if (curLen + s_len + cur.length > maxChars && cur.length > 0) {
                batches.push(cur);
                cur = [s];
                curLen = s_len;
            } else {
                cur.push(s);
                curLen += s_len;
            }
        }
        if (cur.length) batches.push(cur);
        return batches;
    }

    function ensureServerEndpointStore() {
        if (!config.serverEndpoints) {
            config.serverEndpoints = { ...SERVER_PROVIDER_DEFAULTS };
        }
        if (!config.serverEndpoints.dichngay) config.serverEndpoints.dichngay = SERVER_PROVIDER_DEFAULTS.dichngay;
        if (!config.serverEndpoints.dichnhanh) config.serverEndpoints.dichnhanh = SERVER_PROVIDER_DEFAULTS.dichnhanh;
    }
    function getServerEndpoint(provider) {
        ensureServerEndpointStore();
        const fallback = SERVER_PROVIDER_DEFAULTS[provider] || SERVER_PROVIDER_DEFAULTS.dichngay;
        return config.serverEndpoints[provider] || fallback;
    }
    function getDichnhanhOptions() {
        const opts = config.dichnhanhOptions || DEFAULT_CONFIG.dichnhanhOptions;
        return {
            mode: ['vi', 'qt', 'hv'].includes(opts?.mode) ? opts.mode : 'vi',
            type: opts?.type === 'Modern' ? 'Modern' : 'Ancient',
            enableAnalyze: !!opts?.enableAnalyze,
            enableFanfic: !!opts?.enableFanfic
        };
    }

    function extractJsonParsePosition(err) {
        const message = (err && err.message ? err.message : String(err || '')).toString();
        const match = message.match(/position\s+(\d+)/i);
        return match ? parseInt(match[1], 10) : -1;
    }

    function buildDebugSnippet(text, position = -1, radius = 180) {
        const raw = String(text || '');
        if (!raw) return '';
        const pos = Number.isInteger(position) && position >= 0 ? position : -1;
        if (pos < 0 || pos >= raw.length) {
            return raw.slice(0, Math.min(raw.length, radius * 2));
        }
        const start = Math.max(0, pos - radius);
        const end = Math.min(raw.length, pos + radius);
        const head = start > 0 ? '...' : '';
        const tail = end < raw.length ? '...' : '';
        return `${head}${raw.slice(start, pos)}<<<ERROR_AT_${pos}>>>${raw.slice(pos, end)}${tail}`;
    }

    function logTranslationParseFailure(error, meta = {}) {
        const label = `[tm-translate] Parse JSON lỗi từ server (${meta.provider || 'unknown'}, ${meta.batchSize || 0} đoạn, ${meta.totalChars || 0} ký tự)`;
        try {
            console.groupCollapsed(label);
            console.error(error);
            TM_LOG('[tm-translate] Meta:', meta);
            if (meta.responseSnippet) {
                TM_LOG('[tm-translate] Response snippet:', meta.responseSnippet);
            }
            if (meta.translatedSnippet) {
                TM_LOG('[tm-translate] translatedContent snippet:', meta.translatedSnippet);
            }
            if (meta.sanitizedSnippet) {
                TM_LOG('[tm-translate] sanitizedContent snippet:', meta.sanitizedSnippet);
            }
            if (meta.repairedSnippet) {
                TM_LOG('[tm-translate] repairedContent snippet:', meta.repairedSnippet);
            }
            console.groupEnd();
        } catch (logErr) {
            console.error(label, error, meta, logErr);
        }
    }

    function buildTranslationError(message, code, meta = {}, cause = null) {
        const err = new Error(message);
        if (code) err.code = code;
        err.meta = meta;
        if (cause) err.cause = cause;
        return err;
    }

    function repairMalformedDichngayContentString(content) {
        if (typeof content !== 'string' || !content) return content || '';
        return content
            // dichngay đôi lúc trả về kiểu `\\ "Noi dung"` hoặc `\\\"Noi dung` cho lời thoại,
            // khiến quote mở trong từng item không còn là escape hợp lệ của JSON.
            .replace(/\\+\s*"(?=\s*[^,\]])/g, '\\"');
    }

    function isNonRetriableTranslationError(err) {
        const code = err?.code || '';
        return code === 'TRANSLATION_PARSE_ERROR' || code === 'TRANSLATION_BAD_RESPONSE';
    }

    function parseDichngayStringArrayLenient(rawContent, expectedCount = 0) {
        const text = String(rawContent || '').trim();
        if (!text.startsWith('[')) {
            throw new Error('Response content was not array-like.');
        }

        let index = 0;
        const len = text.length;
        const values = [];
        const isSpace = ch => /\s/.test(ch || '');
        const skipSpaces = () => {
            while (index < len && isSpace(text[index])) index++;
        };

        function decodeEscape() {
            if (text[index] !== '\\') return '';
            const next = text[index + 1];
            if (next === 'u' && /^[0-9a-fA-F]{4}$/.test(text.slice(index + 2, index + 6))) {
                const decoded = String.fromCharCode(parseInt(text.slice(index + 2, index + 6), 16));
                index += 6;
                return decoded;
            }
            const escapeMap = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' };
            if (Object.prototype.hasOwnProperty.call(escapeMap, next)) {
                index += 2;
                return escapeMap[next];
            }

            let quoteIndex = index + 1;
            while (quoteIndex < len && isSpace(text[quoteIndex])) quoteIndex++;
            if (text[quoteIndex] === '"') {
                index = quoteIndex + 1;
                return '"';
            }

            index += 1;
            return '\\';
        }

        skipSpaces();
        if (text[index] !== '[') {
            throw new Error(`Missing '[' at position ${index}.`);
        }
        index++;

        while (index < len) {
            skipSpaces();
            if (text[index] === ']') {
                index++;
                break;
            }
            if (text[index] !== '"') {
                throw new Error(`Expected string opening quote at position ${index}.`);
            }
            index++;

            let value = '';
            while (index < len) {
                const ch = text[index];
                if (ch === '\\') {
                    value += decodeEscape();
                    continue;
                }
                if (ch === '"') {
                    let nextIndex = index + 1;
                    while (nextIndex < len && isSpace(text[nextIndex])) nextIndex++;
                    const nextChar = text[nextIndex];
                    const isEndOfArray = nextIndex >= len || nextChar === ']';
                    let isItemSeparator = false;
                    if (nextChar === ',') {
                        let afterComma = nextIndex + 1;
                        while (afterComma < len && isSpace(text[afterComma])) afterComma++;
                        isItemSeparator = afterComma >= len || text[afterComma] === '"' || text[afterComma] === ']';
                    }
                    if (isEndOfArray || isItemSeparator) {
                        index = nextIndex;
                        break;
                    }
                    value += '"';
                    index++;
                    continue;
                }
                value += ch;
                index++;
            }

            values.push(value);
            skipSpaces();
            if (text[index] === ',') {
                index++;
                continue;
            }
            if (text[index] === ']') {
                index++;
                break;
            }
        }

        if (expectedCount > 0 && values.length !== expectedCount) {
            throw new Error(`Lenient parser count mismatch: expected ${expectedCount}, got ${values.length}.`);
        }

        return values;
    }

    function parseDichngayTranslationResponse(responseText, requestMeta = {}) {
        const jsonResponse = JSON.parse(responseText);
        const translatedContentString = jsonResponse?.data?.content ?? jsonResponse?.translatedText;

        if (typeof translatedContentString !== 'string') {
            throw buildTranslationError(
                "Server response 'content' was not a string.",
                'TRANSLATION_BAD_RESPONSE',
                {
                    ...requestMeta,
                    responseSnippet: buildDebugSnippet(responseText)
                }
            );
        }

        const sanitizedString = translatedContentString
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
            .replace(/\\(?!["\\\/bfnrtu])/g, '\\\\');
        const trimmedSanitized = sanitizedString.trim();

        if (requestMeta.allowPlainString && trimmedSanitized && !/^[\[{"]/.test(trimmedSanitized)) {
            return sanitizedString;
        }

        const repairedString = repairMalformedDichngayContentString(sanitizedString);

        try {
            return JSON.parse(sanitizedString);
        } catch (initialErr) {
            if (repairedString !== sanitizedString) {
                try {
                    return JSON.parse(repairedString);
                } catch (repairedErr) {
                    initialErr = repairedErr;
                }
            }
            const lenientSource = (repairedString || sanitizedString).trim();
            if (lenientSource.startsWith('[')) {
                try {
                    return parseDichngayStringArrayLenient(repairedString || sanitizedString, requestMeta.batchSize || 0);
                } catch (lenientErr) {
                    initialErr = lenientErr;
                }
            }
            if (requestMeta.allowPlainString) {
                return repairedString || sanitizedString;
            }
            const position = extractJsonParsePosition(initialErr);
            const meta = {
                ...requestMeta,
                position,
                responseLength: String(responseText || '').length,
                translatedLength: translatedContentString.length,
                sanitizedLength: sanitizedString.length,
                repairedLength: repairedString.length,
                repairAttempted: repairedString !== sanitizedString,
                responseSnippet: buildDebugSnippet(responseText),
                translatedSnippet: buildDebugSnippet(translatedContentString, position),
                sanitizedSnippet: buildDebugSnippet(sanitizedString, position),
                repairedSnippet: repairedString !== sanitizedString ? buildDebugSnippet(repairedString, position) : ''
            };
            logTranslationParseFailure(initialErr, meta);
            throw buildTranslationError(
                `Failed to parse response from server at position ${position >= 0 ? position : 'unknown'}.`,
                'TRANSLATION_PARSE_ERROR',
                meta,
                initialErr
            );
        }
    }

    function postTranslate(serverUrl, contentArray, targetLang) {
        return new Promise((resolve, reject) => {
            const payload = { content: JSON.stringify(contentArray), tl: targetLang };

            GM_xmlhttpRequest({
                method: 'POST',
                url: serverUrl,
                headers: { 'Content-Type': 'application/json', 'referer': 'https://dichngay.com/' },
                data: JSON.stringify(payload),
                onload(res) {
                    if (res.status >= 200 && res.status < 300) {
                        try {
                            resolve(parseDichngayTranslationResponse(res.responseText, {
                                provider: 'dichngay',
                                endpoint: serverUrl,
                                batchSize: Array.isArray(contentArray) ? contentArray.length : 0,
                                totalChars: Array.isArray(contentArray) ? contentArray.reduce((sum, item) => sum + String(item || '').length, 0) : 0,
                                status: res.status
                            }));
                        } catch (e) {
                            if (!(e && e.code === 'TRANSLATION_PARSE_ERROR')) {
                                console.error('[tm-translate] Lỗi xử lý response từ server:', e);
                            }
                            reject(e instanceof Error ? e : new Error('Failed to parse response from server. Error: ' + e));
                        }
                    } else {
                        reject(new Error('HTTP Error: ' + res.status));
                    }
                },
                onerror(err) { reject(err); }
            });
        });
    }

    function postTranslateSingle(serverUrl, contentText, targetLang) {
        return new Promise((resolve, reject) => {
            const payload = { content: String(contentText ?? ''), tl: targetLang };

            GM_xmlhttpRequest({
                method: 'POST',
                url: serverUrl,
                headers: { 'Content-Type': 'application/json', 'referer': 'https://dichngay.com/' },
                data: JSON.stringify(payload),
                onload(res) {
                    if (res.status < 200 || res.status >= 300) {
                        reject(new Error('HTTP Error: ' + res.status));
                        return;
                    }
                    try {
                        const parsed = parseDichngayTranslationResponse(res.responseText, {
                            provider: 'dichngay',
                            endpoint: serverUrl,
                            batchSize: 1,
                            totalChars: String(contentText || '').length,
                            status: res.status,
                            single: true,
                            allowPlainString: true
                        });
                        if (Array.isArray(parsed)) {
                            resolve((parsed[0] || '').toString());
                            return;
                        }
                        resolve(String(parsed ?? ''));
                    } catch (e) {
                        reject(e instanceof Error ? e : new Error(String(e)));
                    }
                },
                onerror(err) { reject(err); }
            });
        });
    }

    function postTranslateDichnhanh(contentArray, dnOptions, endpointUrl) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(contentArray) || contentArray.length === 0) {
                resolve([]);
                return;
            }
            const normalizedOpts = getDichnhanhOptions();
            const opts = { ...normalizedOpts, ...(dnOptions || {}) };
            opts.mode = ['vi', 'qt', 'hv'].includes(opts.mode) ? opts.mode : 'vi';
            opts.type = opts.type === 'Modern' ? 'Modern' : 'Ancient';
            const enableAnalyze = opts.enableAnalyze ? '1' : '0';
            const enableFanfic = opts.enableFanfic ? '1' : '0';
            const serializedTexts = contentArray.map(text => JSON.stringify(String(text ?? ''))).join(',');
            const params = new URLSearchParams({
                type: opts.type,
                enable_analyze: enableAnalyze,
                enable_fanfic: enableFanfic,
                mode: opts.mode,
                text: serializedTexts,
                remove: ''
            });
            const apiUrl = (endpointUrl || SERVER_PROVIDER_DEFAULTS.dichnhanh);
            GM_xmlhttpRequest({
                method: 'POST',
                url: apiUrl,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.3',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'referer': 'https://dichnhanh.com/'
                },
                data: params.toString(),
                onload(res) {
                    if (res.status < 200 || res.status >= 300) {
                        reject(new Error('HTTP Error: ' + res.status));
                        return;
                    }
                    try {
                        const jsonResponse = JSON.parse(res.responseText || '{}');
                        if (jsonResponse.success !== true) {
                            throw new Error(jsonResponse.message || 'API trả về lỗi.');
                        }
                        const rawContent = jsonResponse?.data?.content;
                        if (typeof rawContent !== 'string') {
                            throw new Error('Không nhận được dữ liệu hợp lệ từ dichnhanh.com');
                        }

                        let sanitizedContent = rawContent
                            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
                            .replace(/\"/g, '"')
                            .replace(/'/g, '"')
                            .trim();

                        let parsed = [];
                        parsed = JSON.parse(`[${sanitizedContent}]`);

                        resolve(parsed);
                    } catch (e) {
                        reject(new Error('Lỗi parse dữ liệu dichnhanh.com: ' + e.message));
                    }
                },
                onerror(err) { reject(err); }
            });
        });
    }

    function decodeDichnhanhEscape(str, index) {
        const next = str[index + 1];
        if (next === 'u' && index + 5 < str.length) {
            const hex = str.slice(index + 2, index + 6);
            if (/^[0-9a-fA-F]{4}$/.test(hex)) {
                return { char: String.fromCharCode(parseInt(hex, 16)), advance: 6 };
            }
        }
        const map = { n: '\n', r: '\r', t: '\t', '"': '"', "'": "'", '\\': '\\' };
        return { char: map[next] ?? next, advance: 2 };
    }

    async function requestServerTranslationOnce(contentArray) {
        const provider = (config.serverProvider || 'dichngay');
        const endpoint = getServerEndpoint(provider);
        if (provider === 'dichnhanh') {
            return await postTranslateDichnhanh(contentArray, config.dichnhanhOptions, endpoint);
        }
        return await postTranslate(endpoint, contentArray, config.targetLang);
    }

    async function requestServerTranslationSingleText(text) {
        const provider = (config.serverProvider || 'dichngay');
        const endpoint = getServerEndpoint(provider);
        if (provider === 'dichnhanh') {
            const translated = await postTranslateDichnhanh([text], config.dichnhanhOptions, endpoint);
            if (Array.isArray(translated)) return (translated[0] || '').toString();
            return String(translated ?? '');
        }
        return await postTranslateSingle(endpoint, text, config.targetLang);
    }

    let translationRequestPolicy = null;

    function getTranslationRequestDelayMs() {
        const configured = Math.max(0, Number(config?.delayMs) || 0);
        const minimum = Math.max(0, Number(translationRequestPolicy?.minDelayMs) || 0);
        return Math.max(configured, minimum);
    }

    async function waitForTranslationRequestPolicy() {
        const policy = translationRequestPolicy;
        if (!policy) return;
        const delayMs = Math.max(0, Number(policy.minDelayMs) || 0);
        const elapsed = Date.now() - (Number(policy.lastRequestAt) || 0);
        if (policy.lastRequestAt && elapsed < delayMs) await sleep(delayMs - elapsed);
        policy.lastRequestAt = Date.now();
    }

    async function withExportTranslationPolicy(callback) {
        const previous = translationRequestPolicy;
        translationRequestPolicy = { minDelayMs: 800, lastRequestAt: 0 };
        try {
            return await callback();
        } finally {
            translationRequestPolicy = previous;
        }
    }

    async function requestServerTranslation(contentArray) {
        const safeArray = Array.isArray(contentArray) ? contentArray : [];
        if (safeArray.length === 0) return [];

        const retries = Math.max(0, parseInt(config.retryCount, 10) || 0);
        const provider = (config.serverProvider || 'dichngay');
        const delayMs = getTranslationRequestDelayMs();

        async function translateWithRetry(arr, singleText = false) {
            let attempt = 0;
            let lastError = null;
            let retryDelayMs = delayMs;
            const maxRetryDelayMs = Math.max(2400, Math.min(8000, Math.max(delayMs, 400) * 8));
            while (attempt <= retries) {
                try {
                    await waitForTranslationRequestPolicy();
                    if (singleText) {
                        return [await requestServerTranslationSingleText(arr[0])];
                    }
                    return await requestServerTranslationOnce(arr);
                } catch (err) {
                    lastError = err;
                    if (isNonRetriableTranslationError(err)) break;
                    if (attempt >= retries) break;
                    retryDelayMs = Math.min(
                        maxRetryDelayMs,
                        Math.max(delayMs, retryDelayMs ? Math.round(retryDelayMs * 1.75) : 400)
                    );
                    await sleep(retryDelayMs);
                }
                attempt++;
            }
            throw lastError || new Error('Dịch thất bại.');
        }

        async function translateBatchRecursive(arr, depth = 0) {
            if (!Array.isArray(arr) || arr.length === 0) return [];

            if (arr.length === 1) {
                try {
                    return await translateWithRetry(arr, true);
                } catch (err) {
                    console.error('[tm-translate] Dịch đoạn đơn thất bại sau khi tách batch.', {
                        provider,
                        depth,
                        length: String(arr[0] || '').length,
                        error: err?.message || err,
                        meta: err?.meta || null
                    });
                    throw err;
                }
        }

            try {
                return await translateWithRetry(arr);
            } catch (err) {
                const totalChars = arr.reduce((sum, item) => sum + String(item || '').length, 0);
                TM_WARN('[tm-translate] Dịch batch lỗi, chia đôi để thử lại.', {
                    provider,
                    depth,
                    items: arr.length,
                    totalChars,
                    error: err?.message || err,
                    meta: err?.meta || null
                });
                const mid = Math.ceil(arr.length / 2);
                const left = await translateBatchRecursive(arr.slice(0, mid), depth + 1);
                if (delayMs > 0) await sleep(delayMs);
                const right = await translateBatchRecursive(arr.slice(mid), depth + 1);
                return left.concat(right);
            }
        }

        if (safeArray.length === 1) {
            try {
                return await translateWithRetry(safeArray, true);
            } catch (err) {
                console.error('[tm-translate] Dịch đoạn đơn thất bại.', {
                    provider,
                    length: String(safeArray[0] || '').length,
                    error: err?.message || err,
                    meta: err?.meta || null
                });
                throw err;
            }
        }

        try {
            return await translateWithRetry(safeArray);
        } catch (err) {
            TM_WARN('[tm-translate] Dịch batch lỗi, chuyển sang chia đôi batch.', {
                provider,
                items: safeArray.length,
                totalChars: safeArray.reduce((sum, item) => sum + String(item || '').length, 0),
                error: err?.message || err,
                meta: err?.meta || null
            });
            return await translateBatchRecursive(safeArray, 1);
        }
    }

    function tokenizeString(str) {
        const normalized = normalizeTextForTranslation(str);
        if (!normalized) return [];
        const parts = normalized.split(TOKEN_SPLIT_REGEX).filter(Boolean);
        const tokens = [];
        for (const part of parts) {
            if (TOKEN_SPECIAL_REGEX.test(part)) {
                tokens.push({ type: 'special', value: part });
            } else {
                if (tokens.length > 0 && tokens[tokens.length - 1].type === 'text') {
                    tokens[tokens.length - 1].value += part;
                } else {
                    tokens.push({ type: 'text', value: part });
                }
            }
        }
        return tokens;
    }

    function reassembleTranslatedString(tokens, translatedTexts) {
        let result = '';
        let translatedIndex = 0;
        for (const token of tokens) {
            if (token.type === 'text') {
                if (!token.value || !token.value.trim()) {
                    result += token.value || '';
                    continue;
                }
                if (translatedIndex < translatedTexts.length) {
                    result += translatedTexts[translatedIndex];
                    translatedIndex++;
                } else {
                    result += token.value;
                }
            } else {
                result += token.value;
            }
        }
        return result;
    }

    async function translatePanelText(fullInput, returnType = 'html', options = {}) {
        config = loadConfig();
        const nameSet = options && options.nameSet
            ? options.nameSet
            : (config.nameSets[config.activeNameSet] || {});
        const nameReplacer = buildNameSetReplacer(nameSet);
        const placeholderMap = {};

        const normalizedInput = normalizeTextForTranslation(fullInput || '');
        const paragraphs = normalizedInput.split(/\r?\n/);
        const textsToSend = [];
        const chunks = [];

        for (const para of paragraphs) {
            const paraTrimmed = para.trim();
            if (!paraTrimmed) {
                chunks.push({ isEmpty: true });
                continue;
            }

            const decodedText = paraTrimmed;
            const tokens = tokenizeString(decodedText);
            const textsForThisPara = [];

            tokens.forEach(token => {
                if (token.type === 'text' && token.value.trim()) {
                    const processedText = nameReplacer(token.value, placeholderMap);
                    textsForThisPara.push(processedText);
                }
            });

            textsToSend.push(...textsForThisPara);
            chunks.push({ original: para, tokens: tokens, numTextTokens: textsForThisPara.length });
        }

        if (textsToSend.length === 0) return returnType === 'html' ? '<p style="color:#888;">Không có gì để dịch.</p>' : '';

        const batches = splitIntoBatches(textsToSend, config.maxCharsPerRequest);
        let allTranslatedTexts = [];

        if (config.translationMode === 'local') {
            await initializeLocalTranslator();
            for (const batch of batches) {
                allTranslatedTexts.push(...batch.map(text => TranslateZhToVi.translateSentence(text)));
            }
        } else {
            for (let b = 0; b < batches.length; b++) {
                const translatedBatch = await requestServerTranslation(batches[b]);
                allTranslatedTexts.push(...(translatedBatch || []));
                if (b < batches.length - 1) await sleep(getTranslationRequestDelayMs());
            }
        }

        let translationIdx = 0;
        let finalResult = '';
        let resultArray = [];

        for (const chunk of chunks) {
            if (chunk.isEmpty) {
                if (returnType === 'html') finalResult += '<p><br></p>';
                else resultArray.push(''); // Dòng trống
                continue;
            }

            const translatedParts = allTranslatedTexts.slice(translationIdx, translationIdx + chunk.numTextTokens);
            const reassembledText = reassembleTranslatedString(chunk.tokens, translatedParts);
            const finalRestoredText = restoreNames(reassembledText, placeholderMap);
            const capitalizedText = capitalizeFirstLetter(finalRestoredText, nameSet);

            if (returnType === 'html') {
                const highlightedHtml = highlightNamesInText(capitalizedText, nameSet, chunk.original);
                const chunkHtml = `<span class="tm-chunk" data-orig="${escapeHtml(chunk.original)}">${highlightedHtml}</span>`;
                finalResult += `<p>${chunkHtml}</p>`;
            } else {

                resultArray.push(capitalizedText);
            }

            translationIdx += chunk.numTextTokens;
        }

        return returnType === 'html' ? finalResult : resultArray.join('\n');
    }

    /* ================== 8. Dịch trang ================== */

    // Từ điển trên máy: ba file do TranslateCenter phát. Chỉ nạp khi thật sự cần dịch — VP.json
    // nặng ~70 MB, nạp sẵn ở mọi trang là phí. Trình duyệt nhớ bản đã dựng (IndexedDB, theo
    // từng trang web), nên mỗi trang web chỉ tải một lần.
    async function initializeLocalTranslator(force) {
        if (config.translationMode !== 'local') return;
        if (!force && window.TranslateZhToVi.isReady) return;
        const base = String(config.dictBaseUrl || DICT_BASE_DEFAULT).replace(/\/*$/, '/');
        showLoading('Đang nạp từ điển trên máy (lần đầu ở trang này sẽ lâu)…');
        try {
            await window.TranslateZhToVi.init({
                nameUrl: base + 'Name.json', vpUrl: base + 'VP.json', hvUrl: base + 'HanViet.json', forceReload: !!force
            });
        } catch (err) {
            const why = (err && err.message) || 'không kết nối được';
            throw new Error(`Không nạp được từ điển từ ${base} (${why}). Bật TranslateCenter (start.bat) rồi thử lại, hoặc đổi "Chế độ dịch" sang Server.`);
        } finally {
            removeLoading();
        }
    }

    async function tmTranslateBatches(texts, onProgress) {
        const batches = splitIntoBatches(texts, config.maxCharsPerRequest);
        const out = [];
        if (config.translationMode === 'local') {
            await initializeLocalTranslator();
            for (const batch of batches) out.push(...batch.map(text => TranslateZhToVi.translateSentence(text)));
            return out;
        }
        for (let b = 0; b < batches.length; b++) {
            if (onProgress) onProgress(b + 1, batches.length);
            const translated = await requestServerTranslation(batches[b]);
            out.push(...(translated || []));
            if (b < batches.length - 1) await sleep(getTranslationRequestDelayMs());
        }
        return out;
    }

    // Điền item.translated cho mọi item: lấy từ cache nếu có, còn lại gửi đi dịch (tên trong bộ
    // tên được thay bằng chỗ giữ trước khi gửi và trả lại sau khi nhận).
    async function tmTranslateItems(items, onProgress) {
        const nameSet = config.nameSets[config.activeNameSet] || {};
        const nameReplacer = buildNameSetReplacer(nameSet);
        const placeholderMap = {};
        const texts = [];
        const pending = [];
        for (const item of items) {
            item.decodedOriginal = item.original;
            const cached = Object.prototype.hasOwnProperty.call(translationCache, item.original) ? translationCache[item.original] : '';
            if (cached) { item.translated = cached; continue; }
            item.tokens = tokenizeString(item.original);
            let count = 0;
            item.tokens.forEach((token) => {
                if (token.type === 'text' && token.value.trim()) {
                    texts.push(nameReplacer(token.value, placeholderMap));
                    count++;
                }
            });
            item._count = count;
            pending.push(item);
        }
        if (!pending.length) return;
        const translated = await tmTranslateBatches(texts, onProgress);
        let idx = 0;
        for (const item of pending) {
            const parts = translated.slice(idx, idx + item._count);
            idx += item._count;
            item.translated = restoreNames(reassembleTranslatedString(item.tokens, parts), placeholderMap);
            if (item.translated) translationCache[item.original] = item.translated;
            delete item._count;
        }
    }

    const TM_NO_SPAN_PARENTS = /^(OPTION|OPTGROUP|SELECT|TITLE|TEXTAREA|SCRIPT|STYLE)$/;

    // Đặt bản dịch lên DOM. `record` = ghi lại để hoàn tác được (dịch tại chỗ trên trang sống).
    function applyTranslationToDom(items, record) {
        for (const it of items) {
            if (!it.translated) continue;
            it.translated = capitalizeFirstLetter(it.translated.trim());

            if (it.type === 'attribute') {
                if (!it.element || (record && !it.element.isConnected)) continue;
                if (record) tmInPlaceUndo.push({ kind: 'attr', el: it.element, attr: it.attribute, value: it.element.getAttribute(it.attribute) });
                it.element.setAttribute(it.attribute, it.translated);
                const applied = tmAppliedAttrs.get(it.element) || {};
                applied[it.attribute] = it.translated;
                tmAppliedAttrs.set(it.element, applied);
                continue;
            }

            const node = it.node;
            if (!node || !node.parentNode || (record && !node.isConnected)) continue;

            if (it.type === 'link') {           // it.node là chính thẻ <a> (không có thẻ con)
                if (record) tmInPlaceUndo.push({ kind: 'link', el: node, text: node.textContent });
                node.textContent = it.translated;
                tmAppliedText.set(node, it.translated);
                continue;
            }

            const undo = { kind: 'text', node, value: node.nodeValue, raw: null };
            // Giữ khoảng trắng hai đầu: bỏ đi thì chữ dính vào thẻ đứng cạnh ("<b>A</b>chữ").
            const edge = /^(\s*)[\s\S]*?(\s*)$/.exec(node.nodeValue || '') || ['', '', ''];
            node.nodeValue = edge[1] + it.translated + edge[2];
            tmAppliedText.set(node, it.translated);
            // Song ngữ: chữ gốc đứng ngay sau bản dịch, mờ. Thẻ .tm-raw bị bỏ qua ở mọi lượt gom
            // chữ sau đó (collectTranslatableItems) nên không bao giờ bị đem đi dịch.
            if (config.bilingual && !TM_NO_SPAN_PARENTS.test(node.parentNode.nodeName)) {
                const raw = document.createElement('span');
                raw.className = 'tm-raw';
                raw.setAttribute('lang', 'zh');
                raw.style.cssText = 'opacity:.45;font-size:.88em;margin-left:.4em;';
                raw.textContent = it.original;
                node.parentNode.insertBefore(raw, node.nextSibling);
                undo.raw = raw;
            }
            if (record) tmInPlaceUndo.push(undo);
        }
    }

    // Bản đã dịch còn nguyên trên node này không? Có thì bỏ qua — nếu không, chữ Việt vừa đặt
    // vào sẽ bị gom lại và gửi đi dịch lần nữa. Trang tự đổi chữ sau đó thì được dịch lại.
    function tmIsAlreadyTranslated(item) {
        if (item.type === 'attribute') {
            const applied = tmAppliedAttrs.get(item.element);
            return !!applied && applied[item.attribute] === item.element.getAttribute(item.attribute);
        }
        if (!tmAppliedText.has(item.node)) return false;
        const current = item.type === 'link' ? item.node.textContent : item.node.nodeValue;
        return String(current || '').trim() === String(tmAppliedText.get(item.node) || '').trim();
    }


    // Trả trang về chữ gốc mà không đụng tới <body>: listener và trạng thái của trang còn nguyên.
    function tmUndoInPlaceTranslation() {
        for (let i = tmInPlaceUndo.length - 1; i >= 0; i--) {
            const undo = tmInPlaceUndo[i];
            try {
                if (undo.kind === 'attr') {
                    if (undo.value === null) undo.el.removeAttribute(undo.attr);
                    else undo.el.setAttribute(undo.attr, undo.value);
                    tmAppliedAttrs.delete(undo.el);
                } else if (undo.kind === 'link') {
                    undo.el.textContent = undo.text;
                    tmAppliedText.delete(undo.el);
                } else {
                    if (undo.raw) undo.raw.remove();
                    undo.node.nodeValue = undo.value;
                    tmAppliedText.delete(undo.node);
                }
            } catch (_) { /* node đã bị trang gỡ đi */ }
        }
        tmInPlaceUndo = [];
        translatedInPlace = false;
    }

    // Mỗi lần ẩn bản dịch tăng số này lên; lượt dịch bổ sung nào bắt đầu trước đó thì bỏ kết quả.
    let tmGeneration = 0;

    // Mọi lượt dịch bổ sung chạy nối đuôi nhau, không song song.
    let tmNewNodesChain = Promise.resolve();
    function translateNewNodes(nodes) {
        const run = tmNewNodesChain.then(() => translateNewNodesNow(nodes));
        tmNewNodesChain = run.catch(() => { });
        return run;
    }

    async function translateNewNodesNow(nodes) {
        if (!pageTranslated) return;
        const generation = tmGeneration;
        const items = collectTranslatableItems(config.includeScriptStyle, nodes).filter(item => !tmIsAlreadyTranslated(item));
        if (!items.length) return;
        const fresh = items.filter(item => !translationCache[item.original]).length;
        if (fresh) showNotification(`Đang dịch ${fresh} mục mới…`, 3000);
        await tmTranslateItems(items);
        if (generation !== tmGeneration || !pageTranslated) return;   // đã ẩn bản dịch trong lúc chờ
        applyTranslationToDom(items, translatedInPlace);
    }

    let tmObserver = null;
    function startAutoTranslateObserver() {
        stopAutoTranslateObserver();
        if (!config.autoTranslateOnScroll) return;

        let debounceTimeout;
        // Gom node qua mọi lần observer gọi: trang thêm nội dung làm nhiều đợt liền nhau thì
        // không đợt nào bị rơi.
        const pendingNodes = new Set();
        let flushing = false;
        const flushPending = async () => {
            if (flushing) return;   // vòng đang chạy sẽ tự lấy nốt phần mới gom
            flushing = true;
            try {
                while (pendingNodes.size) {
                    const batch = Array.from(pendingNodes).filter(n => n.isConnected);
                    pendingNodes.clear();
                    if (batch.length) await translateNewNodes(batch);
                }
            } catch (e) {
                console.error('[tm-translate] Dịch nội dung mới lỗi:', e);
                tmSetStatus('Dịch nội dung mới lỗi: ' + ((e && e.message) || e), true);
            } finally {
                flushing = false;
            }
        };
        tmObserver = new MutationObserver((mutations) => {
            let found = false;
            for (const m of mutations) {
                for (const n of m.addedNodes) {
                    if (n.nodeType !== 1) continue;
                    if (n.classList.contains('tm-raw') || n.closest('[id^="tm-"], #aurel-hub, #aurel-dock')) continue;   // của chính các script
                    if ((n.textContent || '').trim().length <= 1) continue;
                    pendingNodes.add(n);
                    found = true;
                }
            }
            if (found) {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(flushPending, 500);
            }
        });
        tmObserver.observe(document.body, { childList: true, subtree: true });
    }
    function stopAutoTranslateObserver() {
        if (tmObserver) { tmObserver.disconnect(); tmObserver = null; }
    }

    async function translatePage() {
        if (isTranslating) { showNotification('Đang dịch, đợi một chút…', 2000); return; }
        if (pageTranslated) return;
        isTranslating = true;
        tmSyncUi();
        try {
            await reloadConfig();
            showLoading('Đang gom chữ trên trang…');
            const items = collectTranslatableItems(config.includeScriptStyle, [document.body]);
            if (!items.length) throw new Error('Không thấy chữ nào để dịch trên trang này.');
            await tmTranslateItems(items, (b, n) => showLoading(`Đang dịch… (${b}/${n} gói)`));

            showLoading('Đang đặt bản dịch lên trang…');
            if (config.translateInPlace !== false) {
                translatedInPlace = true;
                tmInPlaceUndo = [];
                applyTranslationToDom(items, true);
            } else {
                // Không tại chỗ: dựng một bản sao của <body>, dịch trên bản sao rồi thế vào. Trang
                // mất hết listener nhưng JS của trang không thể ghi đè chữ đã dịch.
                originalBodyElement = document.body;
                originalScrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
                const clone = document.body.cloneNode(true);
                const cloneItems = collectTranslatableItems(config.includeScriptStyle, [clone]);
                // Hai lượt gom đi cùng một thứ tự trên hai cây giống hệt nhau.
                cloneItems.forEach((ci, i) => {
                    if (items[i] && items[i].original === ci.original) ci.translated = items[i].translated;
                });
                translatedInPlace = false;
                applyTranslationToDom(cloneItems, false);
                document.body.replaceWith(clone);
            }
            pageTranslated = true;
            removeLoading();
            startAutoTranslateObserver();
            // Trang có thể đã tự thêm nội dung trong lúc chờ máy chủ dịch.
            if (config.autoTranslateOnScroll) await translateNewNodes([document.body]);
            tmSetStatus(`Đã dịch ${items.length} mục` + (config.bilingual ? ' (song ngữ).' : '.'));
        } catch (err) {
            removeLoading();
            console.error('[tm-translate] Dịch trang lỗi:', err);
            const msg = (err && err.message) || String(err);
            tmSetStatus('Lỗi: ' + msg, true);
            showNotification('Dịch lỗi: ' + msg, 7000);
        } finally {
            isTranslating = false;
            tmSyncUi();
        }
    }

    function hideTranslation() {
        if (!pageTranslated || isTranslating) return;
        tmGeneration++;
        stopAutoTranslateObserver();
        if (translatedInPlace) {
            tmUndoInPlaceTranslation();
        } else if (originalBodyElement) {
            document.body.replaceWith(originalBodyElement);
            const y = originalScrollPosition;
            setTimeout(() => window.scrollTo(0, y || 0), 0);
        }
        originalBodyElement = null;
        pageTranslated = false;
        tmSetStatus('Đang hiện bản gốc.');
        tmSyncUi();
    }

    // Dịch lại từ đầu — sau khi đổi bộ tên, đổi chế độ, hay bật / tắt song ngữ.
    async function retranslatePage(dropCache) {
        if (isTranslating) return;
        if (pageTranslated) hideTranslation();
        if (dropCache) translationCache = {};
        await translatePage();
    }

    /* ================== 9. [GỐC] OCR chạy trên máy (PaddleOCR qua onnxruntime-web) ================== */
    function gmFetchArrayBuffer(url) {
        return new Promise((resolve, reject) => {
            let abortFn = null;
            const safeTimeout = setTimeout(() => {
                if (abortFn) abortFn();
                reject(new Error("Request Timed Out (Safety)"));
            }, 65000);

            const request = GM_xmlhttpRequest({
                method: "GET",
                url,
                responseType: "arraybuffer",
                fetch: true, // Restore fetch as required
                // anonymous: true, // Removed per user feedback
                timeout: 60000,
                headers: { "Cache-Control": "no-cache" },
                onload: (r) => {
                    clearTimeout(safeTimeout);
                    if (r.status >= 200 && r.status < 300) resolve(r.response);
                    else reject(new Error(`HTTP ${r.status}`));
                },
                onerror: (e) => {
                    clearTimeout(safeTimeout);
                    console.warn("[DL] Network Error:", e);
                    reject(new Error("Network Error"));
                },
                ontimeout: () => {
                    clearTimeout(safeTimeout);
                    reject(new Error("Timeout"));
                },
                onprogress: (e) => {
                    if (window.suppressDownloadUI) return; // Silent mode

                    if (e.lengthComputable && e.total > 0) {
                        let pct = (e.loaded / e.total * 100);
                        if (pct > 99) pct = 99; // Cap at 99% until fully loaded
                        showLoading(`Đang tải... ${pct.toFixed(0)}%`);
                    } else {
                        showLoading(`Đang tải... ${(e.loaded / 1024 / 1024).toFixed(1)}MB`);
                    }
                }
            });
            if (request && typeof request.abort === 'function') abortFn = request.abort;
        });
    }

    function gmFetchText(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url,
                responseType: "text",
                onload: (r) => {
                    if (r.status >= 200 && r.status < 300) resolve(r.responseText);
                    else reject(new Error(`GET ${url} failed: ${r.status}`));
                },
                onerror: () => reject(new Error(`GET ${url} network error`)),
            });
        });
    }

    let __ortPromise = null;

    // [AURELYSN] ort.wasm.min.js mở đầu bằng `var ort=(()=>{...})()`. Tampermonkey chạy code
    // @require CÙNG phạm vi hàm với script, nên `ort` là biến cục bộ của phạm vi đó — đọc được
    // bằng tên trần, nhưng KHÔNG nằm trên globalThis/window. Bản gốc dùng (0, eval) nên `var`
    // rơi lên global; khi đổi sang @require, phép tra global.ort luôn trượt và OCR local chết.
    // Hàm này phải nằm ngoài ensureOrtSandbox: trong đó có `const ort` che mất tên này.
    function tmRequiredOrt() {
        try {
            return typeof ort !== 'undefined' ? ort : null;
        } catch (_) {
            return null;
        }
    }

    async function ensureOrtSandbox() {
        if (__ortPromise) return __ortPromise;

        __ortPromise = (async () => {
            // [HARDENED] Truoc day gan SharedArrayBuffer = ArrayBuffer len global cua TRANG CHU.
            // Trang nao feature-detect SAB se nhan nham (mat semantics shared memory).
            // Nay chi dinh nghia trong sandbox userscript, khong cham unsafeWindow.
            if (typeof SharedArrayBuffer === 'undefined' && typeof ArrayBuffer !== 'undefined') {
                const SafeBuffer = ArrayBuffer;
                const defineIfMissing = (target) => {
                    if (!target || target.SharedArrayBuffer) return;
                    try {
                        Object.defineProperty(target, 'SharedArrayBuffer', {
                            value: SafeBuffer, writable: true, configurable: true, enumerable: false
                        });
                    } catch (_) { /* global bi khoa: ORT se chay che do khong-thread */ }
                };
                defineIfMissing(typeof globalThis !== 'undefined' ? globalThis : null);
                TM_LOG("[TM-Translate] SharedArrayBuffer polyfill (chi trong sandbox)");
            }

            // --- Monkey-Patch fetch & XHR for WASM Injection ---
            if (!window.__tmFetchPatched) {
                const patchTarget = (target) => {
                    if (!target || target.__tmFetchPatched) return;

                    const isOrtWasm = (url) => {
                        return url &&
                            (url.endsWith('.wasm') || url.includes('.wasm?')) &&
                            url.includes('ort-wasm');
                    };

                    const originalFetch = target.fetch;
                    target.fetch = async function (input, init) {
                        const url = typeof input === 'string' ? input : (input instanceof URL ? input.href : input.url);
                        const buffer = window.__TM_WASM_BUFFER || (typeof unsafeWindow !== 'undefined' ? unsafeWindow.__TM_WASM_BUFFER : null);

                        if (isOrtWasm(url) && buffer) {
                            TM_LOG(`[TM-Translate] Intercepted ORT WASM fetch (${target === window ? 'window' : 'unsafe'}): ${url}`);
                            return new Response(buffer, {
                                status: 200,
                                headers: { 'Content-Type': 'application/wasm' }
                            });
                        }
                        return originalFetch.apply(this, arguments);
                    };

                    const originalOpen = target.XMLHttpRequest.prototype.open;
                    target.XMLHttpRequest.prototype.open = function (method, url) {
                        if (url && (typeof url === 'string') && isOrtWasm(url)) {
                            this._isWasmRequest = true;
                            this._wasmUrl = url;
                        }
                        return originalOpen.apply(this, arguments);
                    };

                    const originalSend = target.XMLHttpRequest.prototype.send;
                    target.XMLHttpRequest.prototype.send = function (body) {
                        const buffer = window.__TM_WASM_BUFFER || (typeof unsafeWindow !== 'undefined' ? unsafeWindow.__TM_WASM_BUFFER : null);
                        if (this._isWasmRequest && buffer) {
                            TM_LOG(`[TM-Translate] Intercepted ORT WASM XHR (${target === window ? 'window' : 'unsafe'}): ${this._wasmUrl}`);

                            // [HARDENED] Thieu configurable:true -> property khoa vinh vien,
                            // XHR object bi intercept roi tai su dung se vo.
                            Object.defineProperty(this, 'status', { value: 200, configurable: true });
                            Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
                            Object.defineProperty(this, 'response', { value: buffer, configurable: true });
                            Object.defineProperty(this, 'responseType', { value: 'arraybuffer', configurable: true });

                            const event = new Event('load');
                            this.dispatchEvent(event);
                            if (this.onload) this.onload(event);
                            return;
                        }
                        return originalSend.apply(this, arguments);
                    };

                    target.__tmFetchPatched = true;
                };

                // [HARDENED] window/self/globalThis trong page context la CUNG mot object;
                // hai lenh sau von la no-op. Dedupe bang Set cho khoi tu danh lua minh.
                const __tmTargets = new Set();
                [typeof window !== 'undefined' ? window : null,
                 typeof self !== 'undefined' ? self : null,
                 typeof globalThis !== 'undefined' ? globalThis : null,
                 typeof unsafeWindow !== 'undefined' ? unsafeWindow : null
                ].forEach(t => { if (t) __tmTargets.add(t); });
                __tmTargets.forEach(t => patchTarget(t));

                TM_LOG("[TM-Translate] Pre-patched fetch/XHR tren " + __tmTargets.size + " scope thuc su khac nhau.");
            }

            // [HARDENED] Truoc day: gmFetchText(...) roi (0, eval)(ortCode).
            // Do la RCE path — unpkg/npm bi chiem = code la chay voi quyen GM_* tren moi trang.
            // Nay onnxruntime-web@1.18.0 nap qua @require co #sha256; chi doc tu global.
            const ort = tmRequiredOrt()
                || (typeof globalThis !== "undefined" && globalThis.ort)
                || (typeof window !== "undefined" && window.ort)
                || (typeof unsafeWindow !== "undefined" && unsafeWindow.ort)
                || null;
            if (!ort) {
                throw new Error("Khong tim thay bien `ort`. Kiem tra @require onnxruntime-web@1.18.0 "
                    + "da nap chua (Tampermonkey > script > tab Externals). "
                    + "Ban hardened da bo eval code tai tu mang.");
            }
            if (typeof window !== "undefined" && !window.ort) window.ort = ort;
            if (typeof globalThis !== "undefined" && !globalThis.ort) globalThis.ort = ort;
            return ort;
        })();

        return __ortPromise;
    }

    const paddleService = {
        modelLoaded: false,
        ocrEngine: null,
        cacheKey: "paddleocr_models_v4",
        cacheVersion: "4.0.0",
        zipUrl: "https://github.com/xushengfeng/eSearch-OCR/releases/download/4.0.0/ch.zip",
        // [HARDENED] Da go 2 nguon:
        //  1. release-assets.githubusercontent.com voi JWT exp=1768878147 (2026-01-20)
        //     -> da het han tu lau, moi lan retry chi ton thoi gian.
        //  2. ghfast.top -> proxy GitHub ben thu ba, tai binary model KHONG hash check.
        // Con lai: Google Drive cua tac giar va GitHub release goc.
        zipUrls: [
            "https://drive.usercontent.google.com/u/0/uc?id=1J2xfRuEzDZpuXPnRcBiWhp7ajb-INoGa&export=download",
            "https://github.com/xushengfeng/eSearch-OCR/releases/download/4.0.0/ch.zip"
        ],
        files: ["ppocr_keys_v1.txt", "ppocr_det.onnx", "ppocr_rec.onnx"],

        async init(quietMode = false) {
            if (this.modelLoaded && this.ocrEngine) return;

            if (!quietMode) showLoading('Đang khởi tạo PaddleOCR (Lần đầu sẽ tải model ~15MB)...');

            const G = (typeof globalThis !== "undefined" ? globalThis : window);
            const P = (typeof unsafeWindow !== "undefined" ? unsafeWindow : null);

            const ort = await ensureOrtSandbox();
            const eSearchOCR = G.eSearchOCR || G.ESearchOCR || G.eSearchOcr || (P && (P.eSearchOCR || P.ESearchOCR || P.eSearchOcr));

            if (!ort || !eSearchOCR) {
                console.log("DEBUG ort:", ort, "eSearchOCR:", eSearchOCR, "G keys ocr:", Object.keys(G).filter(k => k.toLowerCase().includes("ocr")));
                throw new Error("PaddleOCR deps missing (ort/eSearchOCR). Check sandbox/page global name.");
            }

            const initFn = eSearchOCR.init || eSearchOCR;


            if (ort.env && ort.env.wasm) {
                const isPolyfilled = typeof SharedArrayBuffer !== 'undefined' && SharedArrayBuffer === ArrayBuffer;
                const isSecureContext = typeof window !== 'undefined' && window.crossOriginIsolated;
                const canUseThreading = false; // FORCE DISABLE THREADING TO FIX LINK ERROR
                // const canUseThreading = typeof SharedArrayBuffer !== 'undefined' && !isPolyfilled && isSecureContext;
                ort.env.wasm.numThreads = 1;
                ort.env.wasm.simd = true;
                ort.env.logLevel = "verbose";

                TM_LOG(`[TM-Translate] Fetching WASM via GM... Threading=${canUseThreading} (Polyfilled=${isPolyfilled}, Isolated=${isSecureContext})`);

                try {
                    const wasmCacheKey = "paddleocr_ort_wasm_v1_18_0";
                    let wasmBuffer = null;
                    let loadedCandidate = null;

                    let cachedB64 = await tmStorageGet(wasmCacheKey, null);
                    let loadedFromCache = false;

                    // [AURELYSN] Bản cũ tải ort-wasm.wasm (không SIMD) trước và cache nó lại; một
                    // luồng mà không SIMD thì OCR chậm gấp vài lần. Cache không SIMD bị bỏ qua
                    // ở đây và được ghi đè bằng bản SIMD ở dưới (tải lại ~10 MB, một lần).
                    if (cachedB64 && !canUseThreading) {
                        const cachedMeta = await tmStorageGet(wasmCacheKey + "_meta", {});
                        if (!String((cachedMeta && cachedMeta.name) || '').includes('simd')) cachedB64 = null;
                    }

                    if (cachedB64) {
                        try {
                            const binStr = window.atob(cachedB64);
                            const len = binStr.length;
                            const bytes = new Uint8Array(len);
                            for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);

                            wasmBuffer = bytes.buffer;
                            loadedCandidate = "Cached Model (v1.18.0)";
                            loadedFromCache = true;
                            TM_LOG("[TM-Translate] Loaded WASM from Tampermonkey Storage.");
                        } catch (e) {
                            TM_WARN("[TM-Translate] Failed to parse cached WASM, cleaning up...", e);
                            await tmStorageDelete(wasmCacheKey);
                        }
                    }

                    if (!wasmBuffer) {
                        const candidates = canUseThreading
                            ? ["ort-wasm-simd-threaded.wasm", "ort-wasm-threaded.wasm", "ort-wasm-simd.wasm", "ort-wasm.wasm"]
                            : ["ort-wasm-simd.wasm", "ort-wasm.wasm"];

                        for (const fileName of candidates) {
                            try {
                                const url = `https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/${fileName}`;
                                TM_LOG(`[TM-Translate] Downloading WASM: ${fileName}`);
                                const buffer = await gmFetchArrayBuffer(url);
                                if (buffer && buffer.byteLength > 0) {
                                    wasmBuffer = buffer;
                                    loadedCandidate = fileName;
                                    break;
                                }
                            } catch (e) {
                                TM_WARN(`[TM-Translate] Failed to load ${fileName}:`, e.message);
                            }
                        }
                    }

                    if (!wasmBuffer) {
                        throw new Error("All WASM candidates failed to download (v1.18.0).");
                    }

                    if (!loadedFromCache) {
                        TM_LOG(`[TM-Translate] Caching WASM (${loadedCandidate}) to storage...`);
                        try {
                            let binary = '';
                            const bytes = new Uint8Array(wasmBuffer);
                            const len = bytes.byteLength;
                            const chunkSize = 8192;
                            for (let i = 0; i < len; i += chunkSize) {
                                binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
                            }
                            const b64 = window.btoa(binary);

                            if (b64.length < 15 * 1024 * 1024) {
                                await tmStorageSet(wasmCacheKey, b64);
                                await tmStorageSet(wasmCacheKey + "_meta", { name: loadedCandidate });
                                TM_LOG("[TM-Translate] WASM Cached successfully.");
                            } else {
                                TM_WARN("[TM-Translate] WASM too large to cache safely.");
                            }
                        } catch (e) {
                            TM_WARN("[TM-Translate] Failed to cache WASM:", e);
                        }
                    } else {
                        const meta = await tmStorageGet(wasmCacheKey + "_meta", {});
                        if (meta.name) loadedCandidate = meta.name;
                    }

                    if (!wasmBuffer) {
                        throw new Error("All WASM candidates failed to download (v1.18.0).");
                    }
                    ort.env.wasm.wasmBinary = new Uint8Array(wasmBuffer);

                    window.__TM_WASM_BUFFER = wasmBuffer;
                    if (typeof unsafeWindow !== 'undefined') unsafeWindow.__TM_WASM_BUFFER = wasmBuffer;
                    TM_LOG("[TM-Translate] Assigned window.__TM_WASM_BUFFER for interception.");

                    ort.env.wasm.wasmPaths = undefined;

                    if (!canUseThreading) {
                        try {
                            // [AURELYSN] Khoá ở 1, không phải 0. ORT 1.18 chỉ coi là "không đa luồng"
                            // khi numThreads === 1; với 0 nó dò SharedArrayBuffer, gặp polyfill
                            // (SAB = ArrayBuffer) ở trên thì tưởng có luồng, chọn bản threaded rồi
                            // chết ở `buffer instanceof SharedArrayBuffer` → "bad memory".
                            Object.defineProperty(ort.env.wasm, 'numThreads', {
                                get: () => 1,
                                set: (v) => { TM_WARN(`[TM-Translate] Blocked attempt to set numThreads=${v} (Force 1)`); },
                                enumerable: true,
                                configurable: true
                            });
                            TM_LOG("[TM-Translate] Soft-locked ort.env.wasm.numThreads = 1");
                        } catch (e) {
                            console.warn("Could not lock numThreads:", e);
                            ort.env.wasm.numThreads = 1;
                        }
                    } else {
                        ort.env.wasm.numThreads = 4;
                    }

                    const isSimd = loadedCandidate.includes('simd');
                    ort.env.wasm.simd = isSimd;
                    TM_LOG(`[TM-Translate] Configured ORT: SIMD=${isSimd}, Threads=${ort.env.wasm.numThreads}`);

                    TM_LOG(`[TM-Translate] ONNX WASM Loaded & Configured: ${loadedCandidate}`);

                } catch (e) {
                    console.error("[TM-Translate] Critical WASM Load Error:", e);
                    alert("Lỗi tải thư viện AI (WASM). Vui lòng thử lại hoặc kiểm tra mạng.");
                    throw e;
                }
            }

            let models = null;
            const version = await tmStorageGet(this.cacheKey + "_ver", null);
            if (version === this.cacheVersion) {
                models = {};
                for (const file of this.files) {
                    const v = await tmStorageGet(this.cacheKey + ":" + file, null);
                    if (!v) { models = null; break; }
                    models[file] = v;
                }
            }
            if (!models) {
                models = await this.downloadModels();
            }

            if (!quietMode) showLoading('Đang nạp Model vào bộ nhớ...');
            const detBuffer = this.base64ToArrayBuffer(models['ppocr_det.onnx']);
            const recBuffer = this.base64ToArrayBuffer(models['ppocr_rec.onnx']);
            const keysText = this.base64ToUtf8(models['ppocr_keys_v1.txt']);

            // --- Init Engine ---
            this.ocrEngine = await initFn({
                det: {
                    input: detBuffer,
                    ratio: 2.0,
                },
                rec: {
                    input: recBuffer,
                    decodeDic: keysText,
                    optimize: {
                        space: false,
                    },
                },
                dev: false,
                ort: ort,
            });

            this.modelLoaded = true;
        },

        async downloadModels() {
            let lastError;
            for (const url of this.zipUrls) {
                try {
                    console.log('Downloading model from:', url);
                    return await this.downloadModelFromUrl(url);
                } catch (e) {
                    console.warn(`Failed to download from ${url}:`, e);
                }
            }
        },

        async downloadModelFromUrl(url) {
            showLoading(`Đang tải model OCR từ ${new URL(url).hostname}...`);

            let arrayBuffer;
            let attempt = 0;
            const maxRetries = 3;

            while (attempt < maxRetries) {
                try {
                    arrayBuffer = await gmFetchArrayBuffer(url);
                    break; // Success
                } catch (e) {
                    attempt++;
                    TM_WARN(`[TM-Translate] Download failed (Attempt ${attempt}/${maxRetries}):`, e);
                    if (attempt >= maxRetries) {
                        alert(`Không thể tải Model sau ${maxRetries} lần thử.\nLỗi: ${e.message}\nVui lòng kiểm tra mạng và thử lại.`);
                        throw e;
                    }
                    showLoading(`Lỗi mạng. Đang thử lại (${attempt}/${maxRetries})...`);
                    await new Promise(r => setTimeout(r, 2000)); // Wait 2s before retry
                }
            }

            if (!arrayBuffer) throw new Error("Thất bại toàn tập khi tải Models.");

            showLoading("Tải xong, đang giải nén (fflate)...");
            return await this.processZipAndSave(arrayBuffer);
        },

        async importZip(file) {
            window.suppressDownloadUI = true; // Stop background download notifications
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        await this.processZipAndSave(e.target.result);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
        },

        async processZipAndSave(arrayBuffer) {
            console.time("fflate.unzip");
            let unzipped = {};
            try {
                const u8 = new Uint8Array(arrayBuffer);
                unzipped = await new Promise((resolve, reject) => {
                    fflate.unzip(u8, (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                });
            } catch (e) {
                console.error("Unzip error:", e);
                alert("Lỗi giải nén ZIP: " + e.message);
                throw e;
            }
            console.timeEnd("fflate.unzip");
            await yieldUI();

            const models = {};
            showLoading("Đang xử lý file...");

            for (const file of this.files) {
                let fileData = unzipped[file];

                // Fallback search if not found directly
                if (!fileData) {
                    const foundKey = Object.keys(unzipped).find(k => k.endsWith(file) && !k.startsWith('__MACOSX'));
                    if (foundKey) fileData = unzipped[foundKey];
                }

                if (!fileData) {
                    console.warn(`File ${file} was not found in the zip archive.`);
                    continue;
                }

                console.log(`[TM-DEBUG] Processing ${file} (Size: ${fileData.length})`);
                showLoading("Đang encode " + file + "...");
                await yieldUI();

                if (file.endsWith('.onnx') || file.endsWith('.txt')) {
                    // Manual chunked conversion to Base64
                    let binary = '';
                    const len = fileData.byteLength;
                    const chunkSize = 32768; // 32KB
                    for (let i = 0; i < len; i += chunkSize) {
                        binary += String.fromCharCode.apply(null, fileData.subarray(i, Math.min(i + chunkSize, len)));
                    }
                    models[file] = window.btoa(binary);
                }
            }

            // Validation
            if (!models['ppocr_rec.onnx'] || !models['ppocr_det.onnx']) {
                throw new Error("File Zip không chứa đủ các model (ppocr_rec, ppocr_det).");
            }

            showLoading("Đang lưu cache...");
            console.time("GM_setValue cache");
            for (const [k, v] of Object.entries(models)) {
                await tmStorageSet(this.cacheKey + ":" + k, v);
                await yieldUI();
            }
            await tmStorageSet(this.cacheKey + "_ver", this.cacheVersion);
            await yieldUI();
            console.timeEnd("GM_setValue cache");

            removeLoading();

            if (typeof updateOcrStatus === 'function') updateOcrStatus();
            alert("Cài đặt Model thành công!");
            return models;
        },

        arrayBufferToBase64(buffer) {
            const bytes = new Uint8Array(buffer);
            const chunkSize = 0x8000; // 32KB
            let binary = "";
            for (let i = 0; i < bytes.length; i += chunkSize) {
                binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
            }
            return window.btoa(binary);
        },

        base64ToArrayBuffer(base64) {
            const binary_string = window.atob(base64);
            const len = binary_string.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        },

        utf8ToBase64(str) {
            return window.btoa(unescape(encodeURIComponent(str)));
        },

        base64ToUtf8(base64) {
            return decodeURIComponent(escape(window.atob(base64)));
        },

        async recognize(imageSrc) {
            // Priority: Check Extension First
            const extMeta = document.querySelector('meta[name="tm-extension-id"]');
            const extId = window.tmExtensionId || (extMeta ? extMeta.content : null);

            if (extId) {
                TM_LOG("[paddleService] Delegating to Extension:", extId);
                try {
                    const result = await new Promise((resolve, reject) => {
                        chrome.runtime.sendMessage(extId, {
                            cmd: 'CMD_OCR_RECOGNIZE',
                            image: imageSrc
                        }, response => {
                            if (chrome.runtime.lastError) {
                                TM_WARN("[paddleService] Extension Error:", chrome.runtime.lastError);
                                reject(chrome.runtime.lastError);
                            } else if (response && response.success) {
                                resolve(response.data);
                            } else {
                                reject(new Error(response ? response.error : 'Unknown Extension Error'));
                            }
                        });
                    });
                    return result;
                } catch (e) {
                    TM_WARN("[paddleService] Extension failed, falling back to Local WASM...", e);
                    // Fallback to local below
                }
            }

            // Fallback: Local WASM
            if (!this.modelLoaded) {
                await this.init();
            }
            showLoading('Đang nhận diện văn bản (Local WASM)...');
            let result;
            if (typeof this.ocrEngine === 'function') {
                result = await this.ocrEngine(imageSrc);
            } else if (typeof this.ocrEngine.recognize === 'function') {
                result = await this.ocrEngine.recognize(imageSrc);
            } else if (typeof this.ocrEngine.ocr === 'function') {
                result = await this.ocrEngine.ocr(imageSrc);
            } else {
                console.error("Unknown OCR Engine type:", this.ocrEngine);
                throw new Error("OCR Engine is not compatible.");
            }

            removeLoading();
            return result;
        }
    };


    /* ================== 10. [GỐC · AURELYSN] Dịch chữ trong ảnh, ngay trên ảnh ================== */
    // Rê chuột (hoặc chạm) vào một <img> → hiện nút "Dịch ảnh" ngay trên ảnh. Bấm → OCR chính
    // file ảnh đó (KHÔNG chụp màn hình) rồi phủ bản dịch lên đúng chỗ chữ gốc; bấm lại để ẩn/hiện.
    //
    // Lấy điểm ảnh theo ba bậc, dừng ở bậc đầu tiên được:
    //   1. vẽ thẳng <img> lên canvas   — chỉ được khi ảnh cùng origin hoặc có CORS
    //   2. fetch() từ trang            — được khi máy chủ ảnh cho CORS
    //   3. GM_xmlhttpRequest           — bỏ qua CORS, gửi kèm Referer (ảnh chống hotlink, vd. Lofter)
    // Bậc 3 là lý do có `@connect *` ở header: host ảnh không biết trước được. Với `*`,
    // Tampermonkey HỎI mỗi khi script chạm một host chưa có trong danh sách @connect.
    //
    // Ảnh dài được cắt thành lát chồng mép: model det chạy trên cả lát, một ảnh 1080×8000
    // đưa nguyên vào sẽ hết bộ nhớ WASM. Mỗi dòng chữ chỉ được nhận ở lát chứa tâm của nó.
    const TM_IMG_MIN_W = 120;
    const TM_IMG_MIN_H = 60;
    const TM_IMG_MAX_W = 1600;
    const TM_IMG_TILE_H = 1280;
    const TM_IMG_TILE_OVERLAP = 160;
    const TM_IMG_MIN_FONT = 12;   // nhỏ hơn nữa thì nới khung chứ không thu chữ
    const TM_IMG_MIN_BOX_W = 130; // khung hẹp hơn mức này thì tiếng Việt xuống dòng từng chữ
    const tmImgJobs = new Map();          // <img> → job
    const tmImgWrapOwner = new WeakMap(); // lớp phủ → <img>
    let tmImgBtn = null;
    let tmImgBtnTarget = null;
    let tmImgHideTimer = null;
    let tmImgSyncQueued = false;
    let tmImgSyncTimer = null;
    let tmImgChain = Promise.resolve();

    function tmImgSrc(img) {
        return img.currentSrc || img.src || '';
    }

    function tmImgIsCandidate(img) {
        if (!img || img.tagName !== 'IMG' || !img.complete || !tmImgSrc(img)) return false;
        if (img.naturalWidth < TM_IMG_MIN_W || img.naturalHeight < TM_IMG_MIN_H) return false;
        const r = img.getBoundingClientRect();
        return r.width >= TM_IMG_MIN_W && r.height >= TM_IMG_MIN_H;
    }

    // Vùng mà điểm ảnh thật sự được vẽ, tính cả object-fit (giả định object-position: center).
    function tmImgContentRect(img) {
        const r = img.getBoundingClientRect();
        const cs = getComputedStyle(img);
        const num = v => parseFloat(v) || 0;
        let left = r.left + num(cs.borderLeftWidth) + num(cs.paddingLeft);
        let top = r.top + num(cs.borderTopWidth) + num(cs.paddingTop);
        let width = r.width - num(cs.borderLeftWidth) - num(cs.paddingLeft) - num(cs.borderRightWidth) - num(cs.paddingRight);
        let height = r.height - num(cs.borderTopWidth) - num(cs.paddingTop) - num(cs.borderBottomWidth) - num(cs.paddingBottom);
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        const fit = cs.objectFit;
        if (nw && nh && width > 0 && height > 0 && fit && fit !== 'fill') {
            const contain = Math.min(width / nw, height / nh);
            let scale = contain;
            if (fit === 'cover') scale = Math.max(width / nw, height / nh);
            else if (fit === 'none') scale = 1;
            else if (fit === 'scale-down') scale = Math.min(1, contain);
            left += (width - nw * scale) / 2;
            top += (height - nh * scale) / 2;
            width = nw * scale;
            height = nh * scale;
        }
        return { left, top, width, height };
    }

    function tmImgGmFetchBlob(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'blob',
                timeout: 30000,
                headers: { Referer: location.href, Accept: 'image/*,*/*;q=0.8' },
                onload: (r) => {
                    if (r.status >= 200 && r.status < 300 && r.response) resolve(r.response);
                    else reject(new Error(`Máy chủ ảnh trả về HTTP ${r.status}.`));
                },
                onerror: (e) => reject(new Error('Không tải được ảnh' + (e && e.error ? `: ${e.error}` : '.'))),
                ontimeout: () => reject(new Error('Tải ảnh quá 30 giây.'))
            });
        });
    }

    async function tmImgLoadBitmap(img) {
        const src = tmImgSrc(img);

        let bitmap = null;
        try {
            bitmap = await createImageBitmap(img);
            const probe = document.createElement('canvas');
            probe.width = probe.height = 1;
            const ctx = probe.getContext('2d');
            ctx.drawImage(bitmap, 0, 0);
            ctx.getImageData(0, 0, 1, 1); // ném SecurityError nếu ảnh khác origin, không CORS
            return bitmap;
        } catch (_) {
            if (bitmap && bitmap.close) bitmap.close();
        }

        try {
            const resp = await fetch(src, { mode: 'cors', credentials: 'omit' });
            if (resp.ok) return await createImageBitmap(await resp.blob());
        } catch (_) { /* không CORS hoặc bị CSP chặn → bậc 3 */ }

        if (!/^https?:/i.test(src)) throw new Error('Không đọc được ảnh này.');
        const blob = await tmImgGmFetchBlob(src);
        try {
            return await createImageBitmap(blob);
        } catch (_) {
            throw new Error('File tải về không phải ảnh đọc được (có thể bị máy chủ chặn).');
        }
    }

    async function tmImgRecognizeCanvas(canvas) {
        const extMeta = document.querySelector('meta[name="tm-extension-id"]');
        if (window.tmExtensionId || extMeta) {
            return await paddleService.recognize(canvas.toDataURL('image/jpeg', 0.92));
        }
        if (!paddleService.modelLoaded) {
            try {
                await paddleService.init(true);
            } finally {
                // Lần nạp đầu tải WASM/model qua gmFetchArrayBuffer, hàm đó tự bật khung
                // "Đang tải... N%" và trông vào nơi gọi để tắt.
                removeLoading();
            }
        }
        const engine = paddleService.ocrEngine;
        const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        return await (typeof engine.ocr === 'function' ? engine.ocr(data) : engine(data));
    }

    function tmImgBlocksOf(result) {
        const raw = (result && result.raw) || result;
        if (Array.isArray(raw)) return raw;
        if (raw && Array.isArray(raw.src)) return raw.src;
        if (raw && Array.isArray(raw.parragraphs)) return raw.parragraphs;
        return [];
    }

    // Trả về các dòng chữ, toạ độ theo điểm ảnh của bitmap gốc.
    async function tmImgOcrBitmap(bitmap, onProgress) {
        const scale = Math.min(1, TM_IMG_MAX_W / bitmap.width);
        const W = Math.max(1, Math.round(bitmap.width * scale));
        const H = Math.max(1, Math.round(bitmap.height * scale));

        const tiles = [];
        if (H <= TM_IMG_TILE_H * 1.25) {
            tiles.push([0, H]);
        } else {
            for (let y = 0; ; y += TM_IMG_TILE_H - TM_IMG_TILE_OVERLAP) {
                const end = Math.min(H, y + TM_IMG_TILE_H);
                tiles.push([y, end]);
                if (end >= H) break;
            }
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const lines = [];
        for (let i = 0; i < tiles.length; i++) {
            const [y0, y1] = tiles[i];
            if (onProgress) onProgress(i + 1, tiles.length);
            canvas.width = W;
            canvas.height = y1 - y0;
            ctx.drawImage(bitmap, 0, y0 / scale, bitmap.width, (y1 - y0) / scale, 0, 0, W, y1 - y0);
            const result = await tmImgRecognizeCanvas(canvas);

            const coreTop = i === 0 ? 0 : y0 + TM_IMG_TILE_OVERLAP / 2;
            const coreBottom = i === tiles.length - 1 ? H : y1 - TM_IMG_TILE_OVERLAP / 2;
            for (const block of tmImgBlocksOf(result)) {
                const text = String((block && block.text) || '').replace(/\s+/g, ' ').trim();
                if (!text || !Array.isArray(block.box) || !block.box.length) continue;
                const xs = block.box.map(p => p[0]);
                const ys = block.box.map(p => p[1] + y0);
                const t = Math.min(...ys);
                const b = Math.max(...ys);
                const centerY = (t + b) / 2;
                if (centerY < coreTop || centerY >= coreBottom) continue;
                lines.push({ text, l: Math.min(...xs) / scale, r: Math.max(...xs) / scale, t: t / scale, b: b / scale });
            }
            await yieldUI();
        }
        return lines;
    }

    // Gom các dòng sát nhau, cùng cột, cùng cỡ chữ thành một khối; trong khối, dòng kết thúc
    // sớm hơn mép phải của khối được coi là hết đoạn.
    function tmImgGroupLines(lines) {
        const sorted = lines.slice().sort((a, b) => (a.t - b.t) || (a.l - b.l));
        const groups = [];
        for (const line of sorted) {
            const h = line.b - line.t;
            let best = null;
            let bestGap = Infinity;
            for (const group of groups) {
                const last = group.lines[group.lines.length - 1];
                const lastH = last.b - last.t;
                const ref = Math.min(h, lastH);
                const gap = line.t - last.b;
                if (gap < -0.5 * ref || gap > 1.3 * ref) continue;
                if (Math.max(h, lastH) > 1.6 * ref) continue;
                const overlap = Math.min(line.r, group.r) - Math.max(line.l, group.l);
                if (overlap < 0.3 * Math.min(line.r - line.l, group.r - group.l)) continue;
                if (Math.abs(gap) < bestGap) { best = group; bestGap = Math.abs(gap); }
            }
            if (best) {
                best.lines.push(line);
                best.l = Math.min(best.l, line.l);
                best.r = Math.max(best.r, line.r);
                best.b = Math.max(best.b, line.b);
            } else {
                groups.push({ lines: [line], l: line.l, t: line.t, r: line.r, b: line.b });
            }
        }

        for (const group of groups) {
            const paras = [];
            let current = '';
            let heightSum = 0;
            group.lines.forEach((line, i) => {
                heightSum += line.b - line.t;
                if (i > 0) {
                    const prev = group.lines[i - 1];
                    if (prev.r < group.r - 1.5 * (prev.b - prev.t)) {
                        paras.push(current);
                        current = '';
                    } else if (/[A-Za-z0-9]$/.test(current) && /^[A-Za-z0-9]/.test(line.text)) {
                        current += ' ';
                    }
                }
                current += line.text;
            });
            paras.push(current);
            group.paras = paras;
            group.lineH = heightSum / group.lines.length;
        }
        return groups;
    }

    // Màu nền quanh khối chữ: trung vị của bốn dải sát NGOÀI khối (trên, dưới, trái, phải),
    // để một nét chữ lọt vào không kéo lệch màu.
    function tmImgSampleBackground(bitmap, group) {
        try {
            const pad = Math.max(3, Math.round(group.lineH * 0.25));
            const l = Math.max(0, Math.floor(group.l));
            const t = Math.max(0, Math.floor(group.t));
            const r = Math.min(bitmap.width, Math.ceil(group.r));
            const b = Math.min(bitmap.height, Math.ceil(group.b));
            const strips = [
                [l, t - pad, r - l, pad],
                [l, b, r - l, pad],
                [l - pad, t, pad, b - t],
                [r, t, pad, b - t]
            ].filter(([x, y, w, h]) => w > 0 && h > 0 && x >= 0 && y >= 0 && x + w <= bitmap.width && y + h <= bitmap.height);
            if (!strips.length) return { r: 255, g: 255, b: 255 };

            const N = 24;
            const canvas = document.createElement('canvas');
            canvas.width = N;
            canvas.height = strips.length;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            strips.forEach(([x, y, w, h], row) => ctx.drawImage(bitmap, x, y, w, h, 0, row, N, 1));
            const data = ctx.getImageData(0, 0, N, strips.length).data;
            const channels = [[], [], []];
            for (let i = 0; i < data.length; i += 4) {
                for (let c = 0; c < 3; c++) channels[c].push(data[i + c]);
            }
            const [red, green, blue] = channels.map(values => values.sort((p, q) => p - q)[values.length >> 1]);
            return { r: red, g: green, b: blue };
        } catch (_) {
            return { r: 255, g: 255, b: 255 };
        }
    }

    // Dịch mọi đoạn trong MỘT lần gọi (translatePanelText giữ nguyên số dòng); lệch số dòng
    // thì dịch lại từng khối.
    async function tmImgTranslateGroups(groups) {
        const flat = groups.flatMap(group => group.paras);
        let translated = null;
        try {
            const lines = String(await translatePanelText(flat.join('\n'), 'text') || '').split('\n');
            if (lines.length === flat.length) translated = lines;
        } catch (e) {
            TM_WARN('[tm-translate] Dịch ảnh: dịch gộp lỗi, chuyển sang dịch từng khối.', e);
        }

        if (translated) {
            let k = 0;
            for (const group of groups) {
                group.translated = group.paras
                    .map((para, i) => (translated[k + i] || '').trim() || para)
                    .join('\n');
                k += group.paras.length;
            }
            return;
        }
        for (const group of groups) {
            const source = group.paras.join('\n');
            group.translated = String(await translatePanelText(source, 'text') || '').trim() || source;
        }
    }

    function tmImgPill(text) {
        const el = document.createElement('div');
        el.textContent = text;
        Object.assign(el.style, {
            padding: '5px 11px',
            borderRadius: '14px',
            background: 'rgba(23, 32, 42, 0.86)',
            color: '#fff',
            font: '600 12px/1.3 "Segoe UI", Arial, sans-serif',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
            userSelect: 'none'
        });
        return el;
    }

    function tmImgSetStatus(job, text) {
        if (!job.status) {
            job.status = tmImgPill('');
            Object.assign(job.status.style, { position: 'absolute', left: '8px', top: '8px', pointerEvents: 'none' });
            job.wrap.appendChild(job.status);
        }
        job.status.textContent = text;
    }

    // Đặt khung và cỡ chữ cho một khối. Ưu tiên giữ khung đúng bằng vùng chữ gốc và thu chữ
    // lại cho vừa; khi chữ đã ở cỡ nhỏ nhất còn đọc được mà vẫn không vừa (tiếng Việt dài hơn
    // tiếng Trung, bong bóng truyện tranh thì hẹp) thì NỚI KHUNG quanh tâm cũ — không cắt chữ,
    // không thanh cuộn.
    function tmImgFitBox(box, group, wrapW, wrapH, lineHPx) {
        const inner = box.firstChild;
        if (!inner || wrapW < 1 || wrapH < 1) return null;
        const clamp = (v, lo, hi) => (hi < lo ? lo : Math.min(Math.max(v, lo), hi));
        let left = group.frac.l * wrapW;
        let top = group.frac.t * wrapH;
        let width = group.frac.w * wrapW;
        let height = group.frac.h * wrapH;
        const place = () => Object.assign(box.style, {
            left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px'
        });
        place();

        let low = TM_IMG_MIN_FONT;
        let high = Math.max(TM_IMG_MIN_FONT, Math.min(30, Math.floor(lineHPx * 0.9)));
        let best = 0;
        while (low <= high) {
            const mid = (low + high) >> 1;
            inner.style.fontSize = mid + 'px';
            if (inner.scrollHeight <= box.clientHeight) { best = mid; low = mid + 1; } else { high = mid - 1; }
        }
        if (best) {
            inner.style.fontSize = best + 'px';
            return { left, top, width, height, grown: false };
        }

        inner.style.fontSize = TM_IMG_MIN_FONT + 'px';
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        width = Math.max(width, Math.min(TM_IMG_MIN_BOX_W, wrapW));
        left = clamp(centerX - width / 2, 0, wrapW - width);
        place();
        if (inner.scrollHeight > height) {
            height = inner.scrollHeight;
            top = clamp(centerY - height / 2, 0, wrapH - height);
            place();
        }
        return { left, top, width, height, grown: true };
    }

    // Khung đã nới có thể lấn sang khung bên cạnh (hai bong bóng sát nhau). Đẩy chúng rời nhau
    // theo trục lấn ít hơn; khung giữ nguyên cỡ gốc thì đứng yên để vẫn che đúng chữ gốc, khung
    // đã nới thì nhường. Hai khung cùng kẹt ở mép ảnh thì đành chịu — rê chuột để nổi khung lên.
    function tmImgSeparateRects(rects, wrapW, wrapH) {
        const GAP = 3;
        const clamp = (v, lo, hi) => (hi < lo ? lo : Math.min(Math.max(v, lo), hi));
        for (let pass = 0; pass < 12; pass++) {
            let moved = false;
            for (let i = 0; i < rects.length; i++) {
                for (let j = i + 1; j < rects.length; j++) {
                    const a = rects[i];
                    const b = rects[j];
                    if (!a || !b || (!a.grown && !b.grown)) continue;
                    const overlapX = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
                    const overlapY = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
                    if (overlapX <= 0 || overlapY <= 0) continue;
                    const shareA = a.grown && b.grown ? 0.5 : (a.grown ? 1 : 0);
                    const before = [a.left, a.top, b.left, b.top];
                    if (overlapX < overlapY) {
                        const dir = (a.left + a.width / 2) <= (b.left + b.width / 2) ? -1 : 1;
                        a.left = clamp(a.left + dir * (overlapX + GAP) * shareA, 0, wrapW - a.width);
                        b.left = clamp(b.left - dir * (overlapX + GAP) * (1 - shareA), 0, wrapW - b.width);
                    } else {
                        const dir = (a.top + a.height / 2) <= (b.top + b.height / 2) ? -1 : 1;
                        a.top = clamp(a.top + dir * (overlapY + GAP) * shareA, 0, wrapH - a.height);
                        b.top = clamp(b.top - dir * (overlapY + GAP) * (1 - shareA), 0, wrapH - b.height);
                    }
                    if (before[0] !== a.left || before[1] !== a.top || before[2] !== b.left || before[3] !== b.top) moved = true;
                }
            }
            if (!moved) break;
        }
    }

    function tmImgRenderJob(job) {
        if (job.status) { job.status.remove(); job.status = null; }
        job.boxes = [];
        // Phông không chân cho dễ đọc ở cỡ nhỏ; chỉ theo cài đặt "Font chữ OCR" khi nó cũng không chân.
        const sansChoice = ['Arial', 'Verdana', 'Segoe UI'].includes(config.ocrFont) ? `"${config.ocrFont}", ` : '';
        const fontFamily = `${sansChoice}"Segoe UI", Roboto, Arial, sans-serif`;
        for (const group of job.groups) {
            const grow = group.lineH * 0.15;
            const l = Math.max(0, group.l - grow);
            const t = Math.max(0, group.t - grow);
            const r = Math.min(job.natW, group.r + grow);
            const b = Math.min(job.natH, group.b + grow);
            group.frac = { l: l / job.natW, t: t / job.natH, w: (r - l) / job.natW, h: (b - t) / job.natH };
            const bg = group.bg;
            const luminance = (0.2126 * bg.r + 0.7152 * bg.g + 0.0722 * bg.b) / 255;

            const box = document.createElement('div');
            box.title = 'Gốc: ' + group.paras.join('\n');
            Object.assign(box.style, {
                position: 'absolute',
                boxSizing: 'border-box',
                padding: '0 3px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                pointerEvents: 'auto',
                backgroundColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
                color: luminance > 0.55 ? '#111' : '#f5f5f5',
                fontFamily,
                lineHeight: '1.25',
                textAlign: 'left',
                userSelect: 'text',
                cursor: 'text'
            });
            // Khung đã nới có thể đè lên khung bên cạnh: rê vào khung nào thì khung đó nổi lên.
            box.addEventListener('mouseenter', () => { box.style.zIndex = '1'; });
            box.addEventListener('mouseleave', () => { box.style.zIndex = ''; });
            const inner = document.createElement('div');
            inner.textContent = group.translated;
            Object.assign(inner.style, { width: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' });
            box.appendChild(inner);
            job.wrap.appendChild(box);
            job.boxes.push(box);
        }
        // Cỡ chữ do tmImgSync đặt: nó chạy lại mỗi khi ảnh đổi kích thước hiển thị.
        job.fitW = 0;
        job.fitH = 0;
    }

    function tmImgDropJob(job) {
        if (job.wrap) job.wrap.remove();
        if (job.resizeObserver) job.resizeObserver.disconnect();
        if (tmImgJobs.get(job.img) === job) tmImgJobs.delete(job.img);
    }

    function tmImgSync() {
        tmImgSyncQueued = false;
        for (const job of Array.from(tmImgJobs.values())) {
            const img = job.img;
            if (!img.isConnected || tmImgSrc(img) !== job.src) { tmImgDropJob(job); continue; }
            const rect = tmImgContentRect(img);
            const shown = job.visible && rect.width >= 1 && rect.height >= 1;
            job.wrap.style.display = shown ? 'block' : 'none';
            if (!shown) continue;
            Object.assign(job.wrap.style, {
                left: rect.left + 'px',
                top: rect.top + 'px',
                width: rect.width + 'px',
                height: rect.height + 'px'
            });
            if (job.state === 'done' && (Math.abs(rect.width - job.fitW) > 1 || Math.abs(rect.height - job.fitH) > 1)) {
                const displayScale = rect.height / job.natH;
                const rects = job.boxes.map((box, i) =>
                    tmImgFitBox(box, job.groups[i], rect.width, rect.height, job.groups[i].lineH * displayScale));
                tmImgSeparateRects(rects, rect.width, rect.height);
                job.boxes.forEach((box, i) => {
                    if (!rects[i]) return;
                    box.style.left = rects[i].left + 'px';
                    box.style.top = rects[i].top + 'px';
                });
                job.fitW = rect.width;
                job.fitH = rect.height;
            }
        }
        if (!tmImgJobs.size && tmImgSyncTimer) {
            clearInterval(tmImgSyncTimer);
            tmImgSyncTimer = null;
        }
        tmImgPlaceBtn();
    }

    function tmImgQueueSync() {
        if (tmImgSyncQueued) return;
        tmImgSyncQueued = true;
        requestAnimationFrame(tmImgSync);
    }

    function tmImgStartJob(img) {
        const wrap = document.createElement('div');
        Object.assign(wrap.style, { position: 'fixed', pointerEvents: 'none', zIndex: '2147483000' });
        tmUIRoot.appendChild(wrap);
        tmImgWrapOwner.set(wrap, img);

        const job = { img, src: tmImgSrc(img), state: 'busy', visible: true, wrap, status: null, groups: [], boxes: [] };
        tmImgJobs.set(img, job);
        if (typeof ResizeObserver === 'function') {
            job.resizeObserver = new ResizeObserver(tmImgQueueSync);
            job.resizeObserver.observe(img);
        }
        // Bố cục trang có thể xê dịch mà không cuộn, không đổi cỡ ảnh (ảnh phía trên tải xong).
        if (!tmImgSyncTimer) tmImgSyncTimer = setInterval(tmImgQueueSync, 400);
        tmImgSetStatus(job, 'Đang chờ…');
        tmImgSync();

        tmImgChain = tmImgChain.then(() => tmImgProcessJob(job));
    }

    async function tmImgProcessJob(job) {
        const alive = () => tmImgJobs.get(job.img) === job;
        if (!alive()) return;
        let bitmap = null;
        try {
            tmImgSetStatus(job, 'Đang tải ảnh…');
            bitmap = await tmImgLoadBitmap(job.img);
            tmImgSetStatus(job, 'Đang nhận diện chữ…');
            const lines = await tmImgOcrBitmap(bitmap, (i, n) => {
                if (n > 1) tmImgSetStatus(job, `Đang nhận diện chữ… ${i}/${n}`);
            });
            if (!lines.length) throw new Error('Không tìm thấy chữ trong ảnh.');
            const groups = tmImgGroupLines(lines);
            groups.forEach(group => { group.bg = tmImgSampleBackground(bitmap, group); });
            tmImgSetStatus(job, 'Đang dịch…');
            await tmImgTranslateGroups(groups);
            if (!alive()) return;
            job.natW = bitmap.width;
            job.natH = bitmap.height;
            job.groups = groups;
            job.state = 'done';
            tmImgRenderJob(job);
        } catch (e) {
            console.error('[tm-translate] Dịch ảnh lỗi:', e);
            tmImgDropJob(job);
            showNotification('Dịch ảnh: ' + (e && e.message ? e.message : String(e)), 5000);
        } finally {
            if (bitmap && bitmap.close) bitmap.close();
            tmImgSync();
            tmImgRefreshBtn();
        }
    }

    function tmImgRefreshBtn() {
        if (!tmImgBtn || !tmImgBtnTarget) return;
        const job = tmImgJobs.get(tmImgBtnTarget);
        if (!job) tmImgBtn.textContent = 'Dịch ảnh';
        else if (job.state === 'busy') tmImgBtn.textContent = 'Đang dịch…';
        else tmImgBtn.textContent = job.visible ? 'Ẩn bản dịch' : 'Hiện bản dịch';
        tmImgPlaceBtn();
    }

    function tmImgPlaceBtn() {
        if (!tmImgBtn || tmImgBtn.style.display === 'none') return;
        const img = tmImgBtnTarget;
        if (!img || !img.isConnected) { tmImgHideBtn(); return; }
        const r = img.getBoundingClientRect();
        const w = tmImgBtn.offsetWidth;
        const h = tmImgBtn.offsetHeight;
        // Ảnh dài cuộn quá mép trên thì nút bám mép trên màn hình, không trôi mất theo ảnh.
        const left = Math.min(Math.max(r.right - w - 8, r.left + 4), window.innerWidth - w - 4);
        const top = Math.min(Math.max(r.top + 8, 8), r.bottom - h - 4);
        tmImgBtn.style.left = left + 'px';
        tmImgBtn.style.top = top + 'px';
    }

    function tmImgHideBtn() {
        clearTimeout(tmImgHideTimer);
        tmImgHideTimer = null;
        if (tmImgBtn) tmImgBtn.style.display = 'none';
        tmImgBtnTarget = null;
    }

    function tmImgShowBtn(img) {
        clearTimeout(tmImgHideTimer);
        tmImgHideTimer = null;
        if (!tmImgBtn) {
            tmImgBtn = tmImgPill('Dịch ảnh');
            tmImgBtn.id = 'tm-img-translate-btn';
            Object.assign(tmImgBtn.style, { position: 'fixed', zIndex: '2147483001', cursor: 'pointer', display: 'none' });
            tmImgBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = tmImgBtnTarget;
                if (!target) return;
                const job = tmImgJobs.get(target);
                if (!job) {
                    tmImgStartJob(target);
                } else if (job.state === 'done') {
                    job.visible = !job.visible;
                    tmImgSync();
                }
                tmImgRefreshBtn();
            });
            tmUIRoot.appendChild(tmImgBtn);
        }
        tmImgBtnTarget = img;
        tmImgBtn.style.display = 'block';
        tmImgRefreshBtn();
    }

    function tmImgOnPointerOver(e) {
        if (config.showImageTranslateButton === false) { tmImgHideBtn(); return; }
        const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
        if (tmImgBtn && path.includes(tmImgBtn)) {
            clearTimeout(tmImgHideTimer);
            tmImgHideTimer = null;
            return;
        }

        let img = null;
        const wrap = path.find(node => tmImgWrapOwner.has(node));
        if (wrap) {
            img = tmImgWrapOwner.get(wrap);
        } else if (e.target === tmShadowHost) {
            img = null; // đang ở trên giao diện TM (modal, nút nổi) — không tìm ảnh nằm phía sau
        } else if (e.target && e.target.tagName === 'IMG') {
            img = e.target;
        } else if (typeof document.elementsFromPoint === 'function') {
            // Nhiều trang phủ một lớp div trong suốt lên ảnh.
            img = document.elementsFromPoint(e.clientX, e.clientY).slice(0, 4).find(node => node.tagName === 'IMG') || null;
        }

        if (img && (tmImgJobs.has(img) || tmImgIsCandidate(img))) {
            tmImgShowBtn(img);
        } else if (tmImgBtnTarget && !tmImgHideTimer) {
            tmImgHideTimer = setTimeout(tmImgHideBtn, 400);
        }
    }

    function tmImgInit() {
        document.addEventListener('pointerover', tmImgOnPointerOver, { capture: true, passive: true });
        window.addEventListener('scroll', tmImgQueueSync, { capture: true, passive: true });
        window.addEventListener('resize', tmImgQueueSync, { passive: true });
    }

    /* ================== BRIDGE: cho script khác mượn bộ dịch ================== */
    // Script khác (vd. "Trình tải truyện — Lofter") gửi:
    //   document.dispatchEvent(new CustomEvent('tm-bridge:translate',
    //     { detail: JSON.stringify({ id, text, bulk }) }))
    // và nghe 'tm-bridge:result' → detail JSON { id, ok, text | error }.
    // Kết quả giữ nguyên số dòng của `text` (dịch theo từng dòng, dùng name-set đang bật).
    // detail là chuỗi JSON vì object không đi qua ranh giới sandbox giữa các userscript.
    // Đặt TRƯỚC kiểm tra blacklist: chặn tự dịch trên một site không có nghĩa là
    // chặn luôn script khác nhờ dịch ở site đó.
    const tmBridgeEmit = (type, obj) => document.dispatchEvent(new CustomEvent(type, { detail: JSON.stringify(obj) }));
    document.addEventListener('tm-bridge:ping', () => tmBridgeEmit('tm-bridge:pong', { version: CURRENT_VERSION }));
    document.addEventListener('tm-bridge:translate', (ev) => {
        let req;
        try { req = JSON.parse(ev.detail); } catch (e) { return; }
        if (!req || typeof req.id !== 'string' || typeof req.text !== 'string') return;
        const run = () => translatePanelText(req.text, 'text');
        // bulk = dịch cả bộ: dùng nhịp giãn của chế độ xuất để khỏi bị server chặn
        (req.bulk ? withExportTranslationPolicy(run) : run())
            .then(text => tmBridgeEmit('tm-bridge:result', { id: req.id, ok: true, text: text || '' }))
            .catch(err => tmBridgeEmit('tm-bridge:result', { id: req.id, ok: false, error: String((err && err.message) || err) }));
    });

    /* ================== 12. Giao diện: nút trên cột nút + tab "Translated" ================== */
    // Không còn cửa sổ cài đặt riêng. Mọi thay đổi lưu ngay khi bấm; thứ ít dùng nằm trong các
    // mục "Tùy chỉnh nâng cao" đóng / mở được.

    const tmUi = {};

    function tmSetStatus(text, isError) {
        if (!tmUi.status) return;
        tmUi.status.textContent = text || '';
        tmUi.status.className = 'hint' + (isError ? ' err' : '');
    }
    // Nút "D" KHÔNG biến mất sau khi dịch (bản gốc thay nó bằng nút khác, muốn dịch lại phải
    // vào menu Tampermonkey): nó chỉ đổi trạng thái — bấm lần nữa là ẩn bản dịch.
    function tmSyncUi() {
        if (tmUi.pill) {
            tmUi.pill.pill.classList.toggle('on', pageTranslated);
            tmUi.pill.pill.classList.toggle('busy', isTranslating);
            tmUi.pill.ic.title = isTranslating ? 'Đang dịch…' : pageTranslated ? 'Ẩn bản dịch (hiện lại bản gốc)' : 'Dịch trang này';
        }
        if (tmUi.btnNow) {
            tmUi.btnNow.disabled = isTranslating;
            tmUi.btnNow.textContent = isTranslating ? 'Đang dịch…' : pageTranslated ? 'Dịch lại' : 'Dịch ngay';
            tmUi.btnHide.disabled = !pageTranslated || isTranslating;
        }
    }

    function h(tag, props, kids) {
        const n = document.createElement(tag);
        Object.entries(props || {}).forEach(([k, v]) => {
            if (v === undefined || v === null || v === false) return;
            if (k === 'class') n.className = v;
            else if (k === 'text') n.textContent = v;
            else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
            else n.setAttribute(k, v === true ? '' : v);
        });
        (Array.isArray(kids) ? kids : [kids]).forEach((k) => { if (k) n.appendChild(k); });
        return n;
    }
    const field = (label, control, title) => h('label', { class: 'f', title }, [h('span', { class: 'lb', text: label }), control]);
    function select(options, value, onChange, props) {
        const s = h('select', props || {}, options.map(([v, t]) => h('option', { value: v, text: t })));
        s.value = value;
        if (onChange) s.addEventListener('change', () => onChange(s.value));
        return s;
    }
    function check(label, checked, onChange, title) {
        const inp = h('input', { type: 'checkbox' });
        inp.checked = !!checked;
        inp.addEventListener('change', () => onChange(inp.checked));
        const lab = h('label', { class: 'ck', title }, [inp, document.createTextNode(label)]);
        lab.input = inp;
        return lab;
    }
    // Sửa một khoá cấu hình rồi lưu ngay.
    function setCfg(patch) {
        config = Object.assign(loadConfig(), patch);
        saveConfig(config);
    }
    function download(filename, content, mime) {
        const a = document.createElement('a');
        const url = URL.createObjectURL(new Blob([content], { type: mime }));
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click();
        setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 4000);
    }
    // "阿纲=Tsuna" mỗi dòng một cặp; chỉ cắt ở dấu "=" đầu tiên để tên Việt có "=" vẫn giữ được.
    function parseNameLines(text) {
        const out = {};
        String(text || '').split(/\r?\n/).forEach((line) => {
            const at = line.indexOf('=');
            if (at < 1) return;
            const zh = line.slice(0, at).trim(), vi = line.slice(at + 1).trim();
            if (zh && vi) out[zh] = vi;
        });
        return out;
    }

    const TM_HELP = [
        '• Vòng tròn "D" ở cột nút: bấm để dịch trang, bấm lần nữa để hiện lại bản gốc. Nút không biến mất sau khi dịch.',
        '• Trang nạp thêm nội dung khi cuộn (bình luận, bài kế) thì được dịch tiếp, không phải bấm lại.',
        '• Chế độ Server gửi chữ lên dichngay / dichnhanh. Chế độ Local dùng từ điển trên máy: bật TranslateCenter (start.bat) ở lần đầu để tải từ điển; sau đó trình duyệt nhớ.',
        '• Bộ tên: tên trong bộ đang chọn được giữ nguyên khi dịch. Đổi bộ tên xong bấm "Dịch lại" để áp dụng cho trang đang mở.',
        '• Ảnh: rê chuột vào ảnh có chữ → nút "Dịch ảnh". Model OCR tải một lần (~vài chục MB) rồi nằm trong bộ nhớ của Tampermonkey.',
        '• "Dịch trước khi đọc" và "Máy chủ" là thiết lập của TTS Reader, đặt ở đây cho tiện — chỉ bật được khi TTS Reader đang chạy trên trang.',
    ].join('\n');

    const TM_TAB_CSS = KIT_CSS
        + '.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin:0 0 8px;}.three{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 0 8px;}'
        + '.two:last-child,.three:last-child{margin-bottom:0;}'
        + '.f{display:grid;gap:0;min-width:0;margin:0;}.f>select,.f>input{width:100%;}'
        + '.col{display:grid;gap:6px;align-content:center;}.ocrf{display:grid;gap:5px;margin:0 0 8px;}'
        + '.help{white-space:pre-wrap;}'
        + '.names{max-height:210px;overflow:auto;border:1px solid var(--k-line);border-radius:6px;background:var(--k-field);margin-top:8px;}'
        + '.nm{display:flex;gap:6px;align-items:center;padding:3px 8px;border-bottom:1px solid var(--k-line);font-size:12px;}'
        + '.nm:last-child{border-bottom:0;}.nm .zh{font-weight:700;white-space:nowrap;}.nm .vi{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
        + '.nm button{all:unset;cursor:pointer;color:var(--k-muted);padding:0 3px;}.nm button:hover{color:var(--k-accent);}'
        + '.stat{background:var(--k-field);border:1px solid var(--k-line);border-radius:6px;padding:7px 9px;font-size:11.5px;line-height:1.55;white-space:pre-wrap;color:var(--k-muted);margin:0 0 8px;}';

    function buildTmTab() {
        const host = document.createElement('div');
        host.style.cssText = 'all:initial;display:block;';
        const root = host.attachShadow({ mode: 'open' });
        root.appendChild(h('style', { text: TM_TAB_CSS }));
        const kit = h('div', { class: 'kit' });
        root.appendChild(kit);

        const help = h('div', { class: 'card hint help', style: 'display:none', text: TM_HELP });
        kit.appendChild(help);

        /* ---- Dịch ---- */
        const selLang = select([['zh', 'ZH → VI']], 'zh', null, { disabled: true, title: 'Bản này chỉ dịch Trung → Việt' });
        const selEngine = select([['tm', 'TM Translate'], ['google', 'Google']], 'tm',
            (v) => document.dispatchEvent(new CustomEvent('aurel-tts:set', { detail: JSON.stringify({ engineZh: v }) })),
            { disabled: true });
        tmUi.btnNow = h('button', { class: 'btn pri', text: 'Dịch ngay', onclick: () => (pageTranslated ? retranslatePage(false) : translatePage()) });
        tmUi.btnHide = h('button', { class: 'btn sec', text: 'Ẩn bản dịch', onclick: hideTranslation });
        const ckBi = check('Song ngữ (hiện raw mờ)', config.bilingual, (v) => {
            setCfg({ bilingual: v });
            if (pageTranslated) retranslatePage(false);   // bản dịch lấy lại từ cache, không gọi máy chủ
        }, 'Chữ gốc đứng ngay sau từng đoạn đã dịch, mờ');
        tmUi.status = h('div', { class: 'hint' });
        kit.appendChild(h('div', { class: 'card' }, [
            h('div', { class: 'two' }, [
                field('Dịch', selLang),
                field('Máy chủ', selEngine, 'Máy dịch TTS Reader dùng khi "Dịch trước khi đọc". Chỉ đổi được khi TTS Reader đang chạy trên trang.'),
            ]),
            h('div', { class: 'g2' }, [tmUi.btnNow, tmUi.btnHide]),
            h('div', { class: 'row' }, [ckBi]),
            tmUi.status,
        ]));

        /* ---- Setting ---- */
        const ckRead = check('Dịch trước khi đọc', false,
            (v) => document.dispatchEvent(new CustomEvent('aurel-tts:set', { detail: JSON.stringify({ trMode: v ? 'zh' : 'off' }) })),
            'TTS Reader dịch cả chương rồi mới đọc. Chỉ bật được khi TTS Reader đang chạy trên trang.');
        ckRead.input.disabled = true;
        const selProvider = select([['dichngay', 'dichngay.com (mặc định)'], ['dichnhanh', 'dichnhanh.com']], config.serverProvider, (v) => {
            setCfg({ serverProvider: v });
            inpServer.value = config.serverEndpoints[v] || '';
            translationCache = {};
        });
        const inpServer = h('input', { type: 'url', value: config.serverEndpoints[config.serverProvider] || '' });
        inpServer.addEventListener('change', () => {
            const endpoints = Object.assign({}, config.serverEndpoints);
            endpoints[config.serverProvider] = inpServer.value.trim() || SERVER_PROVIDER_DEFAULTS[config.serverProvider];
            setCfg({ serverEndpoints: endpoints, serverUrl: endpoints.dichngay });
            inpServer.value = endpoints[config.serverProvider];
        });
        const inpDict = h('input', { type: 'url', value: config.dictBaseUrl, title: 'Thư mục chứa Name.json, VP.json, HanViet.json' });
        inpDict.addEventListener('change', () => {
            setCfg({ dictBaseUrl: inpDict.value.trim() || DICT_BASE_DEFAULT });
            inpDict.value = config.dictBaseUrl;
        });
        const dictNote = h('span', { class: 'hint', text: 'Do TranslateCenter phát. Chỉ dùng ở chế độ Local.' });
        const btnDict = h('button', {
            class: 'btn sec sm', text: 'Tải lại từ điển', title: 'Xoá bản từ điển trình duyệt đang nhớ cho trang web này rồi tải lại từ địa chỉ trên',
            onclick: async () => {
                btnDict.disabled = true;
                dictNote.textContent = 'Đang tải…'; dictNote.className = 'hint';
                const mode = config.translationMode;
                try {
                    config.translationMode = 'local';
                    await window.TranslateZhToVi.clearCache();
                    await initializeLocalTranslator(true);
                    translationCache = {};
                    dictNote.textContent = 'Đã tải lại từ điển.'; dictNote.className = 'hint ok';
                } catch (err) {
                    dictNote.textContent = (err && err.message) || String(err); dictNote.className = 'hint err';
                } finally {
                    config.translationMode = mode;
                    btnDict.disabled = false;
                }
            },
        });
        const num = (key, min, max) => {
            const inp = h('input', { type: 'number', min, max, value: config[key] });
            inp.addEventListener('change', () => {
                const v = Math.min(max, Math.max(min, parseInt(inp.value, 10) || DEFAULT_CONFIG[key]));
                setCfg({ [key]: v });
                inp.value = v;
            });
            return inp;
        };
        kit.appendChild(h('div', { class: 'card' }, [
            h('h4', { text: 'Setting' }),
            h('div', { class: 'two' }, [
                field('Chế độ dịch', select([['server', 'Server'], ['local', 'Local (từ điển trên máy)']], config.translationMode, (v) => {
                    setCfg({ translationMode: v });
                    translationCache = {};
                    if (pageTranslated) tmSetStatus('Đã đổi chế độ dịch — bấm "Dịch lại" để áp dụng cho trang này.');
                })),
                h('div', { class: 'col' }, [
                    ckRead,
                    check('Dịch tại chỗ', config.translateInPlace !== false, (v) => {
                        const was = pageTranslated;
                        if (was) hideTranslation();          // hoàn tác theo cách cũ trước khi đổi cách
                        setCfg({ translateInPlace: v });
                        if (was) translatePage();
                    }, 'Sửa chữ ngay trên trang đang sống: trang vẫn cuộn-tải-thêm, nút vẫn bấm được. Tắt thì trang bị thế bằng một bản sao đã dịch.'),
                ]),
            ]),
            h('details', { class: 'adv' }, [
                h('summary', { text: 'Tùy chỉnh nâng cao' }),
                h('div', { class: 'two' }, [field('Nguồn server dịch', selProvider), field('URL Server dịch', inpServer)]),
                h('div', { class: 'f', style: 'margin-bottom:6px' }, [h('span', { class: 'lb', text: 'URL file ZH-VI' }), inpDict]),
                h('div', { class: 'row' }, [btnDict, dictNote]),
                h('div', { class: 'three' }, [
                    field('Delay (ms)', num('delayMs', 0, 10000)),
                    field('Kí tự tối đa', num('maxCharsPerRequest', 500, 20000)),
                    field('Số lần retry', num('retryCount', 0, 10)),
                ]),
                check('Tự dịch nội dung trang nạp thêm khi cuộn', config.autoTranslateOnScroll, (v) => {
                    setCfg({ autoTranslateOnScroll: v });
                    if (pageTranslated) { if (v) startAutoTranslateObserver(); else stopAutoTranslateObserver(); }
                }),
            ]),
        ]));

        /* ---- Bộ tên ---- */
        const selSet = h('select', { class: 'full' });
        const namesBox = h('div', { class: 'names' });
        const namesSum = h('summary');
        const nameFilter = h('input', { type: 'text', placeholder: 'Lọc theo chữ Trung hoặc tên Việt…', style: 'width:100%' });
        const pairs = h('textarea', { rows: '3', placeholder: 'Ví dụ: 阿纲=Tsuna' });
        const pairsNote = h('span', { class: 'hint' });
        const activeSet = () => config.nameSets[config.activeNameSet] || {};
        // Bộ tên đổi → bản dịch đang nhớ không còn đúng.
        const namesChanged = (note) => {
            saveConfig(config);
            translationCache = {};
            renderNames();
            pairsNote.textContent = note || '';
            if (pageTranslated) tmSetStatus('Bộ tên đã đổi — bấm "Dịch lại" để áp dụng cho trang này.');
        };
        function renderSets() {
            selSet.textContent = '';
            Object.keys(config.nameSets).forEach((name) => selSet.appendChild(h('option', { value: name, text: `${name} (${Object.keys(config.nameSets[name] || {}).length})` })));
            selSet.value = config.activeNameSet;
            renderNames();
        }
        function renderNames() {
            const set = activeSet();
            const keys = Object.keys(set).sort((a, b) => a.localeCompare(b));
            namesSum.textContent = `Danh sách tên (${keys.length})`;
            const q = nameFilter.value.trim().toLowerCase();
            const hits = q ? keys.filter((k) => k.toLowerCase().includes(q) || String(set[k]).toLowerCase().includes(q)) : keys;
            namesBox.textContent = '';
            hits.slice(0, 200).forEach((k) => {
                namesBox.appendChild(h('div', { class: 'nm' }, [
                    h('span', { class: 'zh', text: k }), h('span', { text: '→' }), h('span', { class: 'vi', text: set[k], title: set[k] }),
                    h('button', { text: '✎', title: 'Sửa', onclick: () => {
                        const v = prompt(`Tên tiếng Việt cho "${k}":`, set[k]);
                        if (v === null || !v.trim() || v.trim() === set[k]) return;
                        set[k] = v.trim();
                        namesChanged();
                    } }),
                    h('button', { text: '✕', title: 'Xoá', onclick: () => { delete set[k]; namesChanged(); renderSets(); } }),
                ]));
            });
            if (!hits.length) namesBox.appendChild(h('div', { class: 'nm hint', text: keys.length ? 'Không có tên nào khớp.' : 'Bộ này đang trống.' }));
            else if (hits.length > 200) namesBox.appendChild(h('div', { class: 'nm hint', text: `Đang hiện 200/${hits.length} — gõ thêm chữ để lọc.` }));
        }
        selSet.addEventListener('change', () => { config.activeNameSet = selSet.value; namesChanged(); });
        nameFilter.addEventListener('input', renderNames);
        const fileInput = h('input', { type: 'file', accept: '.json,.txt', style: 'display:none' });
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    let incoming;
                    if (/\.json$/i.test(file.name)) {
                        incoming = {};
                        Object.entries(JSON.parse(reader.result) || {}).forEach(([k, v]) => { if (k && typeof v === 'string' && v.trim()) incoming[k.trim()] = v.trim(); });
                    } else {
                        incoming = parseNameLines(reader.result);
                    }
                    const n = Object.keys(incoming).length;
                    if (!n) { pairsNote.textContent = 'File không có cặp tên nào đọc được.'; return; }
                    if (!confirm(`Nhập ${n} tên vào bộ "${config.activeNameSet}"? Tên trùng sẽ bị ghi đè.`)) return;
                    Object.assign(config.nameSets[config.activeNameSet], incoming);
                    namesChanged(`Đã nhập ${n} tên.`);
                    renderSets();
                } catch (err) {
                    pairsNote.textContent = 'Không đọc được file: ' + ((err && err.message) || err);
                } finally {
                    fileInput.value = '';
                }
            };
            reader.readAsText(file);
        });
        kit.appendChild(h('div', { class: 'card' }, [
            h('h4', { text: 'Bộ tên' }),
            h('span', { class: 'lb', text: 'Bộ tên đang dùng' }),
            h('div', { class: 'row' }, [selSet]),
            h('div', { class: 'g2' }, [
                h('button', { class: 'btn pri', text: 'Tạo bộ mới', onclick: () => {
                    const name = (prompt('Tên cho bộ mới:') || '').trim();
                    if (!name) return;
                    if (config.nameSets[name]) { pairsNote.textContent = 'Đã có bộ tên này.'; return; }
                    config.nameSets[name] = {};
                    config.activeNameSet = name;
                    namesChanged();
                    renderSets();
                } }),
                h('button', { class: 'btn dan', text: 'Xóa bộ này', onclick: () => {
                    if (Object.keys(config.nameSets).length <= 1) { pairsNote.textContent = 'Không xoá được bộ tên cuối cùng.'; return; }
                    if (!confirm(`Xoá hẳn bộ tên "${config.activeNameSet}"? Không hoàn tác được.`)) return;
                    delete config.nameSets[config.activeNameSet];
                    config.activeNameSet = Object.keys(config.nameSets)[0];
                    namesChanged();
                    renderSets();
                } }),
            ]),
            h('span', { class: 'lb', text: 'Công cụ' }),
            fileInput,
            h('div', { class: 'g2' }, [
                h('button', { class: 'btn pri', text: 'Nhập từ file', title: '.json ({"阿纲":"Tsuna"}) hoặc .txt (mỗi dòng 阿纲=Tsuna)', onclick: () => fileInput.click() }),
                h('button', { class: 'btn sec', text: 'Xuất JSON', onclick: () => download(config.activeNameSet + '.json', JSON.stringify(activeSet(), null, 2), 'application/json') }),
                h('button', { class: 'btn sec', text: 'Xuất TXT', onclick: () => download(config.activeNameSet + '.txt', Object.entries(activeSet()).map(([k, v]) => `${k}=${v}`).join('\n'), 'text/plain') }),
                h('button', { class: 'btn dan', text: 'Xóa name', onclick: () => {
                    if (!confirm(`Xoá TẤT CẢ tên trong bộ "${config.activeNameSet}"? Không hoàn tác được.`)) return;
                    config.nameSets[config.activeNameSet] = {};
                    namesChanged('Đã xoá hết tên trong bộ.');
                    renderSets();
                } }),
            ]),
            h('span', { class: 'lb', text: 'Thêm/Sửa nhanh' }),
            pairs,
            h('div', { class: 'row', style: 'margin-top:8px' }, [
                h('button', { class: 'btn pri', style: 'min-width:84px', text: 'Lưu tên', onclick: () => {
                    const incoming = parseNameLines(pairs.value);
                    const n = Object.keys(incoming).length;
                    if (!n) { pairsNote.textContent = 'Chưa có dòng nào đúng dạng 阿纲=Tsuna.'; return; }
                    if (!config.nameSets[config.activeNameSet]) config.nameSets[config.activeNameSet] = {};
                    Object.assign(config.nameSets[config.activeNameSet], incoming);
                    pairs.value = '';
                    namesChanged(`Đã thêm / cập nhật ${n} tên.`);
                    renderSets();
                } }),
                pairsNote,
            ]),
            h('details', { class: 'adv' }, [namesSum, nameFilter, namesBox]),
        ]));

        /* ---- OCR ---- */
        const ocrStat = h('div', { class: 'stat', text: 'Đang kiểm tra…' });
        const WASM_KEY = 'paddleocr_ort_wasm_v1_18_0';
        updateOcrStatus = async function () {
            try {
                const lines = [];
                let size = 0, missing = false;
                if (await tmStorageGet(paddleService.cacheKey + '_ver', null) === paddleService.cacheVersion) {
                    for (const file of paddleService.files) {
                        const v = await tmStorageGet(paddleService.cacheKey + ':' + file, null);
                        if (!v) { missing = true; break; }
                        size += v.length;
                    }
                } else missing = true;
                // Kho giữ file ở dạng base64, dài hơn dữ liệu thật ~1,33 lần.
                lines.push(missing ? '⚠ Models chưa tải (sẽ tự tải khi dùng lần đầu).'
                    : `✓ Đã tải Models (v${paddleService.cacheVersion}) · ~${(size * 0.75 / 1048576).toFixed(1)} MB`);
                const wasm = await tmStorageGet(WASM_KEY, null);
                lines.push(wasm ? `✓ Đã cache WASM · ~${(wasm.length * 0.75 / 1048576).toFixed(1)} MB` : '⚠ Chưa cache WASM (sẽ tải khi dùng lần đầu).');
                ocrStat.textContent = lines.join('\n');
            } catch (e) {
                ocrStat.textContent = 'Không kiểm tra được: ' + ((e && e.message) || e);
            }
        };
        kit.appendChild(h('div', { class: 'card' }, [
            h('h4', { text: 'OCR' }),
            h('div', { class: 'row' }, [
                check('Hiện nút dịch khi di chuột vào ảnh', config.showImageTranslateButton !== false, (v) => setCfg({ showImageTranslateButton: v })),
            ]),
            h('div', { class: 'ocrf' }, [
                field('Font chữ OCR (Overlay)', select([['Segoe UI', 'Segoe UI (mặc định)'], ['Arial', 'Arial'], ['Verdana', 'Verdana']],
                    ['Segoe UI', 'Arial', 'Verdana'].includes(config.ocrFont) ? config.ocrFont : 'Segoe UI', (v) => setCfg({ ocrFont: v }))),
                h('div', { class: 'hint', text: 'Cỡ chữ tự co theo khung chữ gốc trên ảnh.' }),
            ]),
            h('span', { class: 'lb', text: 'Trạng thái Model OCR' }),
            ocrStat,
            h('button', { class: 'btn dan full', style: 'margin-top:8px', text: 'Xóa Cache Model & WASM', onclick: async () => {
                if (!confirm('Xoá toàn bộ cache OCR (model + WASM)? Lần dùng sau sẽ phải tải lại.')) return;
                try {
                    for (const file of paddleService.files) await tmStorageDelete(paddleService.cacheKey + ':' + file);
                    await tmStorageDelete(paddleService.cacheKey);
                    await tmStorageDelete(paddleService.cacheKey + '_ver');
                    await tmStorageDelete(WASM_KEY);
                    await tmStorageDelete(WASM_KEY + '_meta');
                } catch (e) {
                    ocrStat.textContent = 'Xoá cache lỗi: ' + ((e && e.message) || e);
                    return;
                }
                updateOcrStatus();
            } }),
        ]));

        hubTab('tm', 'Translated', 30, CURRENT_VERSION).appendChild(host);

        /* ---- Nối với bảng chung và với TTS Reader ---- */
        document.addEventListener('aurel-hub:change', (ev) => {
            if (ev.detail !== 'tm') return;
            // Tab khác có thể vừa sửa bộ tên / cấu hình → đọc lại rồi vẽ lại phần phụ thuộc.
            reloadConfig().then(() => { renderSets(); ckBi.input.checked = !!config.bilingual; });
            updateOcrStatus();
            document.dispatchEvent(new CustomEvent('aurel-tts:get'));
        });
        document.addEventListener('aurel-hub:help', (ev) => {
            if (ev.detail === 'tm') help.style.display = help.style.display === 'none' ? '' : 'none';
        });
        // TTS Reader báo thiết lập dịch của nó (xem tts-reader/core.js): bật hai ô tương ứng.
        document.addEventListener('aurel-tts:state', (ev) => {
            let st;
            try { st = JSON.parse(ev.detail); } catch (e) { return; }
            const canZh = Array.isArray(st.modes) && st.modes.includes('zh');
            ckRead.input.disabled = !canZh;
            ckRead.input.checked = canZh && st.trMode === 'zh';
            selEngine.disabled = !canZh;
            if (st.engineZh) selEngine.value = st.engineZh;
        });
        document.dispatchEvent(new CustomEvent('aurel-tts:get'));

        renderSets();
        tmSyncUi();
    }

    /* ================== 13. Khởi chạy ================== */
    tmUi.pill = dockPill(dockSlot('tm', 10), 'D', 'Translated',
        () => (pageTranslated ? hideTranslation() : translatePage()),
        () => hubShow('tm'));
    tmUi.pill.tx.title = 'Mở bảng dịch: chế độ dịch, bộ tên, OCR';
    buildTmTab();
    tmImgInit();

    GM_registerMenuCommand('Dịch trang này', translatePage);
    GM_registerMenuCommand('Ẩn bản dịch', hideTranslation);
    GM_registerMenuCommand('Mở bảng dịch', () => hubShow('tm'));

    console.log(`[tm-translate ${CURRENT_VERSION}] sẵn sàng.`);
})();

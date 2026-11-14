// ==UserScript==
// @name         Trình tải truyện — Lofter (TXT / EPUB / ZIP)
// @name:en      Novel Downloader — Lofter (TXT / EPUB / ZIP)
// @namespace    aurel.novel.downloader
// @version      2.4.0
// @description  Quét trang mục lục, tự gom chương theo bộ, sắp đúng thứ tự, tải hàng loạt rồi xuất ra TXT gộp / EPUB / ZIP (kèm ảnh trong chương).
// @author       Aurel
// @match        *://*.lofter.com/*
// @icon         https://www.lofter.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      lofter.com
// @connect      lf127.net
// @connect      126.net
// @connect      127.net
// @connect      netease.com
// @run-at       document-idle
// @noframes
// ==/UserScript==

/* =============================================================================
 *  HƯỚNG DẪN NHANH
 *  1. Mở trang MỤC LỤC của blog:  https://<tên-blog>.lofter.com/view
 *     (hoặc bất kỳ trang nào có danh sách bài: trang chủ blog, trang tag)
 *  2. Rê chuột vào nút tải ở cột nút góc phải dưới, bấm chữ "Download" để mở bảng
 *     → "Quét mục lục".
 *  3. Chọn bộ / chọn chương → chọn định dạng → "Bắt đầu tải".
 *  4. Ở trang một bài, bấm VÒNG TRÒN của nút tải là tải luôn bài đang mở (không cần mở
 *     bảng), theo định dạng đang chọn.
 *  5. Mục "Convert (TM Translate)": đặt tên file bằng tên đã convert, hoặc xuất
 *     luôn bản đã convert. Cần TM Translate bản có cầu nối (hardened.2 trở lên, hoặc bản gọn 4.x)
 *     đang bật trên Lofter — dùng đúng name-set và chế độ dịch đang chọn bên đó.
 *
 *  THÊM SITE MỚI: xem phần `SITES` bên dưới — chỉ cần khai báo thêm một object
 *  selector, không phải sửa phần lõi.
 * ========================================================================== */

(function () {
  'use strict';

  const VERSION = '2.2.0';
  const LOG_MAX = 400;
  const DEBUG = false;   // true → phơi window.__NDL__ ra trang để gỡ lỗi

  /* ==========================================================================
   * 1. KHAI BÁO SITE  (thêm site mới ở đây)
   * ======================================================================== */

  const SITES = [
    {
      id: 'lofter',
      name: 'Lofter',
      lang: 'zh',
      test: () => /(^|\.)lofter\.com$/i.test(location.hostname),
      isChapterPage: () => /\/post\//.test(location.pathname),

      // ---- Trang mục lục / danh sách bài -------------------------------
      toc: {
        // Mỗi <li> trong trang lưu trữ /view
        itemSel: '.m-filecnt ul.list > li[id], ul.list > li[id], .m-filecnt li[id]',
        linkSel: 'a[href*="/post/"]',
        titleSel: 'h3, h2.ttl, .ttl, h2',
        dateSel: '.info em, .date',
        // Năm lấy từ id của <ul id="2026_7_list"> (7 = tháng 8, index 0)
        yearOf(li) {
          const ul = li.closest('ul[id]');
          const m = ul && /^(\d{4})_(\d{1,2})_list$/.exec(ul.id || '');
          return m ? { year: +m[1], month: +m[2] + 1 } : null;
        },
        kindOf: (li) => (li.className || '').trim().split(/\s+/)[0] || '',
      },

      // ---- Trang một chương --------------------------------------------
      chapter: {
        // Chỉ tìm trong khối bài viết — tránh dính h1.ttl (tên blog) ở header
        titleSel: ['.m-postdtl h2.ttl a', '.m-postdtl h2.ttl', '.m-post h2.ttl a',
                   '.m-post h2.ttl', '.m-postdtl .ttl', '.m-post .ttl', 'h2.ttl'],
        // Lấy cả khối .ctc để giữ đúng thứ tự chữ ↔ ảnh
        rootSel: ['.m-postdtl .m-post .ctc', '.m-post .ctc', '.m-postdtl .ctc',
                  '.ctc', '.m-post .txtcont', '.txtcont'],
        // Khối bao cả bài. Ảnh của bài ảnh hay nằm NGOÀI .ctc (mỗi theme một kiểu:
        // .pic/.img đứng cạnh .ctc, hoặc mỗi ảnh một .ctc riêng) — chữ chỉ lấy trong
        // rootSel, còn ảnh thì lấy trong cả khối này.
        postSel: ['.m-postdtl .m-post', '.m-postdtl', '.m-post'],
        // Bỏ qua các phần này khi trích nội dung
        skipSel: 'h2.ttl, .info, .m-info, .m-pager, .m-cmthot, .m-cmt, .notes, .avatar, .ava, .face, script, style, noscript, iframe',
        dateSel: ['.m-post .infor .date', '.infor .date', 'a.date', '.date'],
        tagSel: ['.m-info .tags a.tag', '.tags a.tag', 'a.tag', '.block .tag a', 'a[href*="/tag/"]'],
        // Lofter: 下一篇 = bài CŨ hơn, 上一篇 = bài MỚI hơn
        olderSel: ['#__next_permalink__', '.m-pager a.next'],
        newerSel: ['#__prev_permalink__', '.m-pager a.prev'],
      },

      // Ảnh: ưu tiên bigimgsrc (ảnh gốc), bỏ tham số thumbnail
      fullImageUrl(url) {
        if (!url) return url;
        return url.replace(/\?imageView.*$/i, '').replace(/\?thumbnail=.*$/i, '');
      },
      imageReferer: () => location.origin + '/',
      // Tên blog = tên tác giả. Theme nào không có h1 quen thuộc thì lấy từ <title>:
      // Lofter đặt "<tiêu đề bài>-<tên blog>" ở trang bài và "归档 - <tên blog>" ở /view.
      bookTitle() {
        const h = document.querySelector('.m-about h1.ttl, .g-hdc h1, h1.ttl');
        const viaTitle = (document.title || '').split(/\s*[-–—]\s*/).pop().trim();
        return (h && h.textContent.trim()) || (/^LOFTER/i.test(viaTitle) ? '' : viaTitle)
          || location.hostname.split('.')[0];
      },
    },
  ];

  const SITE = SITES.find((s) => { try { return s.test(); } catch (e) { return false; } });
  if (!SITE) return;

  /* ==========================================================================
   * 2. TIỆN ÍCH
   * ======================================================================== */

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function pick(root, list) {
    for (const sel of list) { const el = root.querySelector(sel); if (el) return el; }
    return null;
  }
  function pickAll(root, list) {
    for (const sel of list) { const els = root.querySelectorAll(sel); if (els.length) return Array.from(els); }
    return [];
  }
  // Như pick() nhưng trả kèm selector đã khớp — khỏi phải querySelector lần hai
  function pickWith(root, list) {
    for (const sel of list) { const el = root.querySelector(sel); if (el) return { el, sel }; }
    return { el: null, sel: '' };
  }

  const NBSP = /[ 　]/g;
  const clean = (s) => (s || '').replace(NBSP, ' ').replace(/[ \t]+/g, ' ').trim();

  // Tên file an toàn cho Windows/macOS
  function safeName(s, max = 80) {
    let out = (s || '').replace(NBSP, ' ')
      .replace(/[\\/:*?"<>|\u0000-\u001F]/g, '_')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[. ]+$/g, '');
    if (!out) out = 'untitled';
    // Tên thiết bị dành riêng của Windows — file đặt tên này sẽ không tạo được
    if (/^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\..*)?$/i.test(out)) out = '_' + out;
    return out.length > max ? out.slice(0, max).trim() : out;
  }
  const pad = (n, w = 3) => String(n).padStart(w, '0');
  // Một hàm escape duy nhất, escape cả nháy → an toàn cho cả text node lẫn attribute.
  const escXml = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const escHtml = escXml;

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  // ---- Số Trung Quốc → số ----------------------------------------------
  const CN_DIGIT = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  const CN_UNIT = { 十: 10, 百: 100, 千: 1000 };
  function cnNum(s) {
    if (!s) return NaN;
    if (/^\d+$/.test(s)) return +s;
    let total = 0, cur = 0, seen = false;
    for (const ch of s) {
      if (ch in CN_DIGIT) { cur = CN_DIGIT[ch]; seen = true; }
      else if (ch in CN_UNIT) {
        const u = CN_UNIT[ch];
        total += (cur || 1) * u; cur = 0; seen = true;
      } else return NaN;
    }
    return seen ? total + cur : NaN;
  }

  // ---- Lưu cấu hình ------------------------------------------------------
  const store = {
    get(k, d) {
      try {
        if (typeof GM_getValue === 'function') { const v = GM_getValue(k); return v === undefined ? d : v; }
        const v = localStorage.getItem('ndl_' + k);
        return v === null ? d : JSON.parse(v);
      } catch (e) { return d; }
    },
    set(k, v) {
      try {
        if (typeof GM_setValue === 'function') return GM_setValue(k, v);
        localStorage.setItem('ndl_' + k, JSON.stringify(v));
      } catch (e) { /* bỏ qua */ }
    },
  };

  const DEFAULTS = {
    fmtTxt: true, fmtMd: false, fmtEpub: true, fmtZip: false, fmtImgZip: false,
    // Hai trục độc lập: withImages = có tải ảnh về không;
    // embedImages = ảnh đã tải có đưa vào EPUB/ZIP không.
    withImages: true, embedImages: true, mergeOneshots: true,
    delay: 2500, retries: 2, sort: 'auto', imgConc: 3, useFrame: true,
    imgInTxt: 'url',   // 'url' | 'name' | 'skip'
    txtBom: true,
    withComments: false,   // kèm bình luận của mỗi bài vào cuối chương — mục 6b
    tmMode: 'off',     // 'off' | 'name' (chỉ tên) | 'full' (cả nội dung) — xem mục 8b
    tmKeepRaw: false,  // 'full': xuất thêm bản gốc tiếng Trung
  };
  let CFG = Object.assign({}, DEFAULTS, store.get('cfg', {}));
  const saveCfg = () => store.set('cfg', CFG);
  // Nhịp 900ms bị Lofter chặn sau ~17 chương (đo 2026-09-06). Nâng sàn một lần
  // cho cấu hình đã lưu từ trước, nếu không người dùng cũ vẫn dính đúng lỗi đó.
  if (!CFG.rateFix) { CFG.delay = Math.max(CFG.delay, 2500); CFG.rateFix = 1; saveCfg(); }

  /* ==========================================================================
   * 3. TẢI DỮ LIỆU (GM_xmlhttpRequest + fallback fetch)
   * ======================================================================== */

  const gmXhr = (typeof GM_xmlhttpRequest === 'function') ? GM_xmlhttpRequest
    : (typeof GM !== 'undefined' && GM.xmlHttpRequest) ? GM.xmlHttpRequest.bind(GM) : null;

  // Khi gọi quá nhanh, Lofter 302 sang .../front/blog/post-redirect/rate-limiting
  // trên subdomain khác. fetch bị CORS chặn, gmXhr thì lấy được trang đó với
  // HTTP 200 nhưng không có nội dung chương — không nhận ra thì mọi chương còn
  // lại đều "thành công" mà rỗng ruột.
  const RATE_LIMIT_RE = /\/post-redirect\/|rate-limit/i;
  const RATE_ERR = 'Lofter chặn vì gọi quá nhanh';

  const sameOrigin = (url) => {
    try { return new URL(url, location.href).origin === location.origin; }
    catch (e) { return false; }
  };

  function request(url, { type = 'text', referer, timeout = 45000 } = {}) {
    const viaFetch = () => fetch(url, { credentials: 'include' })
      .then((r) => (r.ok ? (type === 'buffer' ? r.arrayBuffer() : r.text())
                         : Promise.reject(new Error('HTTP ' + r.status))));

    const viaGm = () => new Promise((resolve, reject) => {
      if (!gmXhr) return reject(new Error('Không có GM_xmlhttpRequest'));
      gmXhr({
        method: 'GET', url, timeout,
        responseType: type === 'buffer' ? 'arraybuffer' : undefined,
        headers: referer ? { Referer: referer } : undefined,
        onload: (r) => {
          if (r.finalUrl && RATE_LIMIT_RE.test(r.finalUrl)) return reject(new Error(RATE_ERR));
          if (r.status >= 200 && r.status < 400) {
            resolve(type === 'buffer' ? (r.response || r.responseText) : r.responseText);
          } else reject(new Error('HTTP ' + r.status));
        },
        onerror: () => reject(new Error('Lỗi mạng')),
        ontimeout: () => reject(new Error('Quá thời gian chờ')),
      });
    });

    // Trang cùng origin → đi bằng fetch, để request mang theo session của chính
    // tab đang mở. GM_xmlhttpRequest chạy ở ngữ cảnh nền; dưới Manifest V3 nó
    // thường KHÔNG kèm cookie đăng nhập, và Lofter đáp lại bằng vỏ trang rỗng:
    // <title> là "LOFTER（乐乎）", không có .ctc, chương ra 0 ký tự.
    // Ảnh thì ngược lại — khác origin và cần ép Referer → bắt buộc qua gmXhr.
    if (sameOrigin(url) && typeof fetch === 'function') {
      return viaFetch().catch((e) => (gmXhr ? viaGm() : Promise.reject(e)));
    }
    return gmXhr ? viaGm() : viaFetch();
  }

  async function requestRetry(url, opts, retries = CFG.retries, onLog) {
    let lastErr;
    for (let i = 0; i <= retries; i++) {
      try { return await request(url, opts); }
      catch (e) {
        lastErr = e;
        if (i < retries) {
          // Bị chặn tốc độ thì lùi hẳn — thử lại sau 1s chỉ làm tường cao thêm.
          const st = /HTTP (\d+)/.exec(e.message);
          const limited = e.message === RATE_ERR;
          const throttled = st && (st[1] === '429' || st[1] === '503');
          const wait = limited ? 30000 + i * 30000
                    : throttled ? 6000 + i * 6000
                    : 800 + i * 700;
          onLog && onLog(`  ↻ thử lại (${i + 1}/${retries}) sau ${Math.round(wait / 1000)}s: ${e.message}`);
          await sleep(wait);
        }
      }
    }
    throw lastErr;
  }

  // Chạy song song có giới hạn, giữ nguyên thứ tự kết quả
  async function pMap(list, limit, fn) {
    const out = new Array(list.length);
    let cursor = 0;
    const worker = async () => {
      while (cursor < list.length) { const k = cursor++; out[k] = await fn(list[k], k); }
    };
    await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, list.length)) }, worker));
    return out;
  }

  // Bọc một promise bằng hạn chót. Dùng Promise.resolve() để nhận cả thenable
  // không phải Promise chuẩn — generateAsync của JSZip có thể trả về loại đó,
  // và nó không chắc có .finally().
  function withTimeout(p, ms, msg) {
    return new Promise((res, rej) => {
      const t = setTimeout(() => rej(new Error(msg)), ms);
      Promise.resolve(p).then(
        (v) => { clearTimeout(t); res(v); },
        (e) => { clearTimeout(t); rej(e); },
      );
    });
  }

  /* ==========================================================================
   * 4. QUÉT MỤC LỤC
   * ======================================================================== */

  const postKey = (href) => {
    try { const u = new URL(href, location.href); return u.origin + u.pathname.replace(/\/+$/, ''); }
    catch (e) { return href; }
  };

  function parseListDate(txt, ctx) {
    // "8月30日" | "12月18日" | "2025年2月10日" | "8.30.2026"
    if (!txt) return ctx ? new Date(ctx.year, (ctx.month || 1) - 1, 1) : null;
    let m = /(\d{4})\s*[年.\/-]\s*(\d{1,2})\s*[月.\/-]\s*(\d{1,2})/.exec(txt);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = /(\d{1,2})\s*[月.\/-]\s*(\d{1,2})\s*(?:日)?[.\/-]?\s*(\d{4})/.exec(txt); // 8.30.2026
    if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
    m = /(\d{1,2})\s*月\s*(\d{1,2})\s*日/.exec(txt);
    if (m && ctx) return new Date(ctx.year, +m[1] - 1, +m[2]);
    if (m) return new Date(new Date().getFullYear(), +m[1] - 1, +m[2]);
    return ctx ? new Date(ctx.year, (ctx.month || 1) - 1, 1) : null;
  }

  // Ảnh thu nhỏ của bài trong mục lục: <img>, hoặc ảnh nền của một khối con.
  function thumbOf(li) {
    const im = li.querySelector('img');
    let u = im ? (im.getAttribute('data-src') || im.getAttribute('data-original') || im.getAttribute('src') || '') : '';
    if (!u || PLACEHOLDER_RE.test(u)) {
      u = '';
      const bg = Array.from(li.querySelectorAll('[style*="background"]'))
        .map((e) => /url\(\s*['"]?([^'")]+)/.exec(e.getAttribute('style') || '')).find(Boolean);
      if (bg) u = bg[1];
    }
    if (!u) return '';
    if (u.startsWith('//')) u = location.protocol + u;
    try { return new URL(u, location.href).href; } catch (e) { return ''; }
  }
  // Cùng ảnh đó, cỡ đủ để nhìn ra là bài nào.
  const bigThumb = (u) => u.replace(/\?imageView.*$/i, '') + '?imageView&thumbnail=560x0&quality=90';

  function scanTOC(doc = document) {
    const cfg = SITE.toc;
    const seen = new Map();
    const push = (obj) => { if (obj && obj.url && !seen.has(obj.key)) seen.set(obj.key, obj); };

    // (a) Cấu trúc chuẩn của trang lưu trữ
    $$(cfg.itemSel, doc).forEach((li) => {
      const a = li.querySelector(cfg.linkSel);
      if (!a) return;
      const url = new URL(a.getAttribute('href'), location.href).href;
      const tEl = li.querySelector(cfg.titleSel);
      const kind = cfg.kindOf ? cfg.kindOf(li) : '';
      const ctx = cfg.yearOf ? cfg.yearOf(li) : null;
      const dEl = li.querySelector(cfg.dateSel);
      const date = parseListDate(dEl && dEl.textContent, ctx);
      push({
        key: postKey(url), url, id: li.id || '',
        title: clean(tEl && tEl.textContent) || '',
        kind, date, dateText: clean(dEl && dEl.textContent),
        thumb: thumbOf(li),
      });
    });

    // (b) Dự phòng: mọi liên kết tới /post/ trong trang
    if (seen.size === 0) {
      $$('a[href*="/post/"]', doc).forEach((a) => {
        const url = new URL(a.getAttribute('href'), location.href).href;
        const t = clean(a.querySelector('h3, h2, .ttl') ? a.querySelector('h3, h2, .ttl').textContent : a.textContent);
        if (!t) return;
        push({ key: postKey(url), url, id: '', title: t, kind: '', date: null, dateText: '' });
      });
    }

    const list = Array.from(seen.values());
    list.forEach((it, i) => { it.domIndex = i; });
    return list;
  }

  // Quét bằng phân trang: đi từ bài hiện tại lùi dần theo liên kết "bài cũ hơn"
  async function scanByPager(maxCount, onLog) {
    const out = [];
    let url = location.href;
    for (let i = 0; i < maxCount; i++) {
      onLog(`Đang đọc ${i + 1}/${maxCount}…`);
      const html = await requestRetry(url, {}, CFG.retries, onLog);
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const ch = extractChapter(doc, url);
      ch.ownTitle = ch.title;
      out.push({ key: postKey(url), url, id: '', title: ch.title, kind: 'text', date: ch.date, dateText: ch.dateText, _pre: ch });
      const next = pick(doc, SITE.chapter.olderSel);
      const href = next && next.getAttribute('href');
      if (!href) break;
      url = new URL(href, url).href;
      await sleep(CFG.delay);
    }
    out.forEach((it, i) => { it.domIndex = i; });
    return out;
  }

  /* ==========================================================================
   * 5. TÁCH TÊN BỘ + SỐ CHƯƠNG
   * ======================================================================== */

  // Chữ/số full-width → half-width để bắt số chương kiểu "CH1９"
  function toHalf(s) {
    return (s || '').replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
  }

  // Cụm trong ngoặc là "tag" (CP/fandom/đánh dấu) chứ không phải tên bộ?
  const DONE_WORDS = /^(?:完|完结|完結|end|fin|上|中|下|前|后|後|番外|正文|全文)$/i;
  function isTaggish(inner) {
    const s = toHalf(inner).replace(NBSP, '').trim();
    if (!s || s.length > 14) return false;
    if (DONE_WORDS.test(s)) return true;
    if (/^[A-Za-z]{1,10}$/.test(s)) return true;              // all, END…
    if (/^[A-Za-z0-9→+×＋\-_.\s]{1,14}$/.test(s)) return true; // all27, 10027, all→27, 6927+100
    if (/\d/.test(s) && s.length <= 8) return true;            // 27中心, 1827向
    return false;
  }

  function stripTags(title) {
    let t = ' ' + toHalf((title || '').replace(NBSP, ' ')) + ' ';
    // Bỏ 【...】 và ［...］ ở đầu (có thể nhiều cụm liên tiếp)
    for (let i = 0; i < 4; i++) {
      const n = t.replace(/^\s*[【\[［]{1}[^】\]］]{0,30}[】\]］]\s*/u, ' ');
      if (n === t) break; t = n;
    }
    // Bỏ các cụm ngoặc tròn chỉ chứa tag
    t = t.replace(/[（(]\s*([^（()）]{0,20})\s*[）)]/g, (m, inner) => (isTaggish(inner) ? ' ' : m));
    return clean(t);
  }

  const CH_PATTERNS = [
    { re: /(?:^|[^A-Za-z0-9])(?:CH|Chapter|Chap|Ch|EP)\s*[.．·:：]?\s*(\d{1,4}(?:\.\d+)?)/i, cn: false },
    { re: /第\s*([0-9零〇一二三四五六七八九十百千两兩]{1,8})\s*[章回話话節节篇部卷]/, cn: true },
    { re: /(?:^|[^0-9])(\d{1,3})\s*[.．]\s*$/, cn: false },
    // `weak`: số trần, không có từ khoá "CH"/"第…章" đi kèm. Trong fandom, con số
    // cuối tiêu đề rất hay là mã CP (27, 1827, 6927…) chứ không phải số chương.
    // dropFakeChapterNos() sẽ phán quyết sau, dựa trên cả bộ.
    { re: /[-－—–]\s*(\d{1,3})(?:\s*[&＆+]\s*\d{1,3})?\s*(?:[（(][^）)]*[）)])?\s*$/, cn: false, weak: true },
    { re: /[（(]\s*(\d{1,3})\s*[）)]\s*$/, cn: false, weak: true },
    { re: /(?:^|[\s　])(\d{1,3})\s*[.．、]?\s*(?=[|｜/／,，]|$)/, cn: false, weak: true },
    { re: /(?:^|[^0-9])(\d{1,3})\s*$/, cn: false, weak: true },
  ];

  // Đuôi thừa sau khi cắt số chương: "…-CH", "…EP", "… Scene", "…第"
  const TRAIL_MARK = /(?:CH|Chapter|Chap|EP|Episode|Scene|Part|Vol|Season|第)$/i;

  // "…-序", "… 序.", "…楔子" → coi như chương 0 để xếp lên đầu
  const PROLOGUE_RE = /[-－—–·:：\s]\s*(序章|序|楔子|前言|引子)\s*[.．、\-－—–]*\s*$/;

  function parseChapterNo(title) {
    const t = stripTags(title);
    const pm = PROLOGUE_RE.exec(t);
    if (pm) return { no: 0, at: pm.index + pm[0].indexOf(pm[1]), len: pm[0].length, prologue: true };
    for (const p of CH_PATTERNS) {
      const m = p.re.exec(t);
      if (m) {
        const v = p.cn ? cnNum(m[1]) : parseFloat(m[1]);
        // Vị trí của CHÍNH con số (không tính ký tự đứng trước trong match)
        const at = m.index + Math.max(0, m[0].indexOf(m[1]));
        if (!isNaN(v)) return { no: v, at, len: m[0].length, weak: !!p.weak };
      }
    }
    return null;
  }

  function parseSeries(title) {
    const raw = (title || '').replace(NBSP, ' ');
    if (!clean(raw)) return '';
    // 1. Ưu tiên 《Tên bộ》
    const m = /[《〈]([^》〉]{1,60})[》〉]/.exec(raw);
    if (m) return clean(m[1]);
    // 2. Cắt phần trước dấu hiệu số chương
    const t = stripTags(raw);
    const hit = parseChapterNo(raw);
    let base = hit && hit.at > 0 ? t.slice(0, hit.at) : t;
    const trim = (s) => clean(s.replace(/[\s.．,，:：·、\-－—–_|｜]+$/u, ''));
    base = trim(base);
    for (let i = 0; i < 3 && TRAIL_MARK.test(base); i++) base = trim(base.replace(TRAIL_MARK, ''));
    return base || clean(t) || '(không rõ)';
  }

  // Phồn thể → giản thể (các chữ hay gặp) — chỉ dùng để so khớp tên bộ
  const T2S = {
    惡: '恶', 綱: '纲', 願: '愿', 廢: '废', 棄: '弃', 靈: '灵', 綜: '综', 殺: '杀', 過: '过',
    執: '执', 黨: '党', 個: '个', 們: '们', 說: '说', 這: '这', 時: '时', 開: '开', 關: '关',
    學: '学', 麼: '么', 對: '对', 來: '来', 東: '东', 車: '车', 馬: '马', 鳥: '鸟', 龍: '龙',
    愛: '爱', 樂: '乐', 買: '买', 賣: '卖', 見: '见', 話: '话', 語: '语', 讓: '让', 華: '华',
    萬: '万', 與: '与', 陣: '阵', 陽: '阳', 陰: '阴', 場: '场', 塵: '尘', 夢: '梦', 淚: '泪',
    傷: '伤', 憶: '忆', 戀: '恋', 靜: '静', 聲: '声', 從: '从', 會: '会', 現: '现', 實: '实',
    無: '无', 為: '为', 後: '后', 裡: '里', 內: '内', 兩: '两', 幾: '几', 麗: '丽',
    劍: '剑', 鬥: '斗', 術: '术', 師: '师', 導: '导', 選: '选', 邊: '边', 遠: '远', 進: '进',
    運: '运', 連: '连', 週: '周', 節: '节', 級: '级', 紅: '红', 綠: '绿', 藍: '蓝', 銀: '银',
    鐵: '铁', 錯: '错', 門: '门', 問: '问', 間: '间', 長: '长', 頭: '头', 顏: '颜', 風: '风',
    飛: '飞', 飯: '饭', 養: '养', 體: '体', 點: '点', 齊: '齐', 醫: '医', 聞: '闻',
    書: '书', 寫: '写', 記: '记', 讀: '读', 課: '课', 譯: '译', 詩: '诗', 詞: '词', 團: '团',
    國: '国', 園: '园', 圖: '图', 處: '处', 備: '备', 傳: '传', 儀: '仪', 償: '偿', 兒: '儿',
    冊: '册', 決: '决', 淨: '净', 準: '准', 減: '减', 濕: '湿', 燈: '灯', 爺: '爷', 產: '产',
    畢: '毕', 當: '当', 盡: '尽', 監: '监', 眾: '众', 礎: '础', 種: '种', 積: '积', 稱: '称',
    窮: '穷', 筆: '笔', 統: '统', 絕: '绝', 續: '续', 網: '网', 總: '总', 縣: '县', 織: '织',
    義: '义', 舊: '旧', 藥: '药', 蟲: '虫', 補: '补', 覺: '觉', 親: '亲', 觀: '观', 計: '计',
    設: '设', 認: '认', 論: '论', 訪: '访', 許: '许', 訴: '诉', 護: '护', 變: '变', 貓: '猫',
    賽: '赛', 質: '质', 農: '农', 遲: '迟', 鄉: '乡', 鍾: '钟', 陳: '陈', 隨: '随', 險: '险',
    雙: '双', 難: '难', 電: '电', 響: '响', 頁: '页', 顧: '顾', 類: '类',
  };
  const simp = (s) => (s || '').split('').map((c) => T2S[c] || c).join('');
  const norm = (s) => simp(toHalf((s || '').replace(NBSP, ''))
    .replace(/[\s.．,，:：·、\-－—–_~!！?？'"“”‘’（）()［\]【】]/gu, '')).toLowerCase();

  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m || !n) return Math.max(m, n);
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }
  function similarKey(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;
    const maxLen = Math.max(a.length, b.length);
    if (Math.abs(a.length - b.length) > 1) return false;
    // Hai tên 3–4 chữ Hán lệch 1 chữ thường là HAI bộ khác nhau, không phải lỗi gõ.
    if (maxLen < 5) return false;
    return lev(a, b) <= Math.max(1, Math.floor(maxLen * 0.25));
  }

  const NO_TITLE_KEY = '__anh__';

  // Số chương "yếu" (số trần cuối tiêu đề) có thể là mã CP/fandom.
  // Dấu hiệu phân biệt, xét trên cả bộ: số chương thì KHÁC NHAU giữa các bài,
  // mã CP thì LẶP LẠI (cả bộ cùng dán "27"). Không cần biết fandom là gì.
  function dropFakeChapterNos(items) {
    const weak = items.filter((i) => i.chapNo !== null && i.chapWeak);
    if (!weak.length || items.length < 3) return;
    const cnt = new Map();
    weak.forEach((i) => cnt.set(i.chapNo, (cnt.get(i.chapNo) || 0) + 1));
    const top = Math.max.apply(null, Array.from(cnt.values()));
    const tagLike = top >= Math.max(2, Math.ceil(weak.length * 0.4))
                 || cnt.size < Math.max(2, Math.ceil(weak.length * 0.6));
    if (tagLike) weak.forEach((i) => { i.chapNo = null; i.chapFake = true; });
  }

  function groupChaptersAuto(items) {
    const map = new Map();
    for (const it of items) {
      const hit = parseChapterNo(it.title);
      it.chapNo = hit ? hit.no : null;
      it.chapWeak = !!(hit && hit.weak);
      it.series = parseSeries(it.title);
      // Bài ảnh không có tiêu đề → nhóm riêng
      const k = it.series ? (norm(it.series) || '__khac__') : NO_TITLE_KEY;
      if (k === NO_TITLE_KEY) { it.chapNo = null; it.series = 'Bài ảnh — ' + SITE.bookTitle(); }
      if (!map.has(k)) map.set(k, { key: k, name: it.series, items: [] });
      map.get(k).items.push(it);
    }
    let groups = Array.from(map.values());

    // 1) Gộp các bộ tên gần giống nhau (phồn/giản thể, sai chính tả, tag lệch)
    groups.sort((a, b) => b.items.length - a.items.length);
    const kept = [];
    for (const g of groups) {
      let host = null;
      if (g.key !== NO_TITLE_KEY && g.items.length <= 2) {
        host = kept.find((k) => k.key !== NO_TITLE_KEY && k.items.length >= 3 && similarKey(k.key, g.key));
      }
      if (host) host.items = host.items.concat(g.items);
      else kept.push(g);
    }
    groups = kept;

    // 2) Gộp các bộ chỉ còn 1 chương → "Đơn chương"
    if (CFG.mergeOneshots) {
      const single = groups.filter((g) => g.items.length === 1 && g.key !== NO_TITLE_KEY);
      if (single.length > 1) {
        groups = groups.filter((g) => !single.includes(g));
        groups.push({
          key: '__oneshot__', name: 'Đơn chương — ' + SITE.bookTitle(),
          items: single.map((g) => g.items[0]), oneshot: true,
        });
      }
    }

    // 2b) Tách nhóm gộp theo tag đã chọn (mục 5c)
    groups = splitByTags(groups);

    // 3) Tên hiển thị = tên xuất hiện nhiều nhất trong nhóm
    groups.forEach((g) => {
      if (g.oneshot || g.key === NO_TITLE_KEY || g.tagged) return;
      const cnt = new Map();
      g.items.forEach((i) => cnt.set(i.series, (cnt.get(i.series) || 0) + 1));
      g.name = Array.from(cnt.entries()).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0][0];
    });

    groups.forEach((g) => { if (!g.oneshot) dropFakeChapterNos(g.items); });
    groups.forEach((g) => { g.items = sortChapters(g.items, g.oneshot ? 'date' : CFG.sort); });
    const isPhoto = (g) => g.key === NO_TITLE_KEY || !!g.photo;
    groups.sort((a, b) => {
      if (isPhoto(a) !== isPhoto(b)) return isPhoto(a) ? 1 : -1;
      if (!!a.oneshot !== !!b.oneshot) return a.oneshot ? 1 : -1;
      return (b.items.length - a.items.length) || a.name.localeCompare(b.name);
    });
    return groups;
  }

  // Kết quả tự dò, rồi đè bản chỉnh tay lên (bộ chỉnh tay đứng đầu danh sách).
  function groupChapters(items) {
    applyTitles(items);
    return applyManualSeries(groupChaptersAuto(items), manualLoad());
  }

  /* --------------------------------------------------------------------------
   * 5a. TÊN BÀI
   *
   * Bài ảnh trong mục lục không có tiêu đề, nên không biết bài nào là bài nào. Hai
   * nguồn tên, nhớ theo blog trong localStorage (cùng chỗ với bản chỉnh tay bộ):
   *   given  — tên Aurel tự đặt (nút ✎). Coi như tiêu đề thật: bài được gom bộ
   *            theo tên này, đặt "Tên bộ 1", "Tên bộ 2" là thành một bộ.
   *   hint   — tên lấy từ <title> của trang bài (nút "Lấy tên"). Chỉ để nhận mặt
   *            và làm tiêu đề chương; KHÔNG dùng để gom bộ, bài vẫn ở nhóm bài ảnh.
   * ------------------------------------------------------------------------ */
  const TITLES_KEY = 'aurel_lofter_titles_v1';
  function titlesLoad() {
    try {
      const o = JSON.parse(localStorage.getItem(TITLES_KEY) || 'null') || {};
      return { given: o.given || {}, hint: o.hint || {} };
    } catch (e) { return { given: {}, hint: {} }; }
  }
  function titlesSave(t) {
    try { localStorage.setItem(TITLES_KEY, JSON.stringify({ v: 1, given: t.given, hint: t.hint })); return true; }
    catch (e) { return false; }
  }
  function applyTitles(items) {
    const t = titlesLoad();
    const tg = tagsLoad().tags;
    items.forEach((it) => {
      it.tags = tg[it.key] || [];
      if (it.rawTitle === undefined) it.rawTitle = it.title || '';
      it.given = t.given[it.key] || '';
      it.title = it.given || it.rawTitle;
      it.hint = t.hint[it.key] || '';
    });
  }
  /* --------------------------------------------------------------------------
   * 5c. TAG CỦA BLOG
   *
   * Mục lục /view không ghi tag trên từng bài, nhưng có sẵn bộ lọc "标签": bấm một
   * tag thì chính JS của Lofter gọi ArchiveBean.getArchivePostByTag, xoá danh sách
   * và dựng lại chỉ gồm bài mang tag đó (đọc pt_page_archive.js, 2026-10-05). Nên
   * không gọi API nào cả: bấm lần lượt từng tag hộ người dùng, đọc danh sách hiện
   * ra, xong thì bấm "文章" để trả trang về như cũ.
   *   { v: 1, tags: { khoá bài: [tag…] }, counts: { tag: số bài }, split: [tag…] }
   * `split` = những tag Aurel chọn để tách nhóm "Đơn chương" / "Bài ảnh".
   * ------------------------------------------------------------------------ */
  const TAGS_KEY = 'aurel_lofter_tags_v1';
  function tagsLoad() {
    try {
      const o = JSON.parse(localStorage.getItem(TAGS_KEY) || 'null') || {};
      return { tags: o.tags || {}, counts: o.counts || {}, split: Array.isArray(o.split) ? o.split : [] };
    } catch (e) { return { tags: {}, counts: {}, split: [] }; }
  }
  function tagsSave(t) {
    try { localStorage.setItem(TAGS_KEY, JSON.stringify({ v: 1, tags: t.tags, counts: t.counts, split: t.split })); return true; }
    catch (e) { return false; }
  }
  // Các tag trong bộ lọc "标签" của trang /view đang mở: "沢田纲吉(15)"
  function tagChips() {
    return $$('.m-tagsch a.ttag').map((a) => ({
      el: a, name: a.getAttribute('name') || '',
      count: +((/[（(](\d+)[）)]\s*$/.exec(a.textContent || '') || [])[1] || 0),
    })).filter((t) => t.name);
  }

  // Các <li> là bài của blog. Cột "喜欢" bên cạnh dùng cùng class nhưng link không trỏ
  // tới /post/ — và nó KHÔNG được dựng lại khi lọc, nên phải loại ra.
  const tocLis = () => $$(SITE.toc.itemSel).filter((li) => li.querySelector(SITE.toc.linkSel));

  // Chờ danh sách dựng lại xong sau một cú bấm lọc (`old` = các <li> trước cú bấm),
  // cuộn cho Lofter nạp hết trang.
  async function waitFiltered(expect, old) {
    const t0 = Date.now();
    let last = -1, same = 0;
    while (Date.now() - t0 < 25000) {
      await sleep(500);
      if (document.querySelector('.load-tip') || old.some((li) => li.isConnected)) continue;
      const n = tocLis().length;
      same = n === last ? same + 1 : 0;
      last = n;
      if ((expect && n >= expect && same >= 1) || same >= 6) break;
      // Lofter nạp trang kế khi cuộn quá 60% — sự kiện scroll thật không phát ra khi
      // tab ở nền, nên phát thêm bằng tay.
      try {
        window.scrollTo(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
        window.dispatchEvent(new Event('scroll'));
      } catch (e) { /* */ }
    }
    return scanTOC(document).map((i) => i.key);
  }

  async function onScanTags() {
    if (state.busy) return;
    const chips = tagChips();
    if (!chips.length) return log('⚠️ Trang này không có bộ lọc "标签" — mở trang mục lục (…lofter.com/view) rồi thử lại.', 'err');
    if (!state.items.length) return log('⚠️ Bấm "Quét mục lục" trước đã — dò tag làm trang nạp lại danh sách.', 'err');
    state.busy = true; state.stop = false;
    const y0 = window.scrollY;
    const t = tagsLoad();
    const map = {};
    log(`🏷 Dò ${chips.length} tag — trang sẽ tự lọc qua từng tag rồi trả về như cũ (⏹ Dừng để ngừng).`);
    try {
      for (let i = 0; i < chips.length && !state.stop; i++) {
        const c = chips[i];
        const old = tocLis();
        c.el.click();
        const keys = await waitFiltered(c.count, old);
        keys.forEach((k) => { (map[k] = map[k] || []).push(c.name); });
        t.counts[c.name] = c.count || keys.length;
        log(`  🏷 ${pad(i + 1, 2)}/${pad(chips.length, 2)} ${c.name}: ${keys.length} bài` + (c.count && keys.length !== c.count ? ` (Lofter ghi ${c.count})` : ''),
          c.count && keys.length < c.count ? 'err' : '');
        progress(((i + 1) / chips.length) * 100);
        await sleep(Math.min(CFG.delay, 1200));
      }
      if (!state.stop) {
        // Chỉ ghi đè khi dò trọn: dừng giữa chừng mà ghi thì bài của các tag chưa dò
        // bị coi là "không có tag".
        t.tags = map;
        t.split = t.split.filter((n) => chips.some((c) => c.name === n));
        tagsSave(t);
        log(`🏷 Xong: ${Object.keys(map).length} bài có tag. Chọn tag ở mục "Tag của blog" để tách nhóm Đơn chương / Bài ảnh.`, 'ok');
      } else log('⏹ Dừng giữa chừng — giữ nguyên dữ liệu tag cũ.');
    } catch (e) { log('❌ Dò tag hỏng: ' + e.message, 'err'); }
    // Trả trang về danh sách đầy đủ. Không cần quét lại: state.items vẫn là bản quét trước.
    const allTab = document.querySelector('.m-txtsch .txt a');
    if (allTab) { try { allTab.click(); } catch (e) { /* */ } }
    try { window.scrollTo(0, y0); } catch (e) { /* */ }
    state.busy = false;
    regroup('');
  }

  // Tách nhóm gộp (Đơn chương / Bài ảnh) theo các tag đã chọn. Bài mang nhiều tag đã
  // chọn thì vào tag ÍT bài hơn — tag hiếm nói rõ bài thuộc về đâu hơn tag fandom.
  function splitByTags(groups) {
    const t = tagsLoad();
    if (!t.split.length) return groups;
    const order = t.split.slice().sort((a, b) => (t.counts[a] || 0) - (t.counts[b] || 0));
    const out = [];
    groups.forEach((g) => {
      const photo = g.key === NO_TITLE_KEY;
      if (!g.oneshot && !photo) { out.push(g); return; }
      const buckets = new Map();
      const rest = [];
      g.items.forEach((it) => {
        const tag = order.find((n) => (it.tags || []).includes(n));
        if (!tag) { rest.push(it); return; }
        if (!buckets.has(tag)) buckets.set(tag, []);
        buckets.get(tag).push(it);
      });
      buckets.forEach((items, tag) => out.push({
        key: g.key + '#' + tag, name: g.name + ' — #' + tag, items,
        oneshot: g.oneshot, photo, tagged: true,
      }));
      if (rest.length) { g.items = rest; out.push(g); }
    });
    return out;
  }

  const isoDate = (d) => (d ? `${d.getFullYear()}-${pad(d.getMonth() + 1, 2)}-${pad(d.getDate(), 2)}` : '');
  // Tên để hiện và để làm tiêu đề chương khi bài không có tiêu đề thật.
  const labelOf = (it) => it.title || it.hint || ('[Ảnh] ' + (isoDate(it.date) || it.dateText || '')).trim();

  /* --------------------------------------------------------------------------
   * 5b. BẢN CHỈNH TAY
   *
   * Nằm trong localStorage của chính blog (mỗi blog một subdomain → tự tách theo
   * blog), không nằm trong kho GM: TTS Reader — Lofter là một userscript khác, kho
   * GM riêng, nhưng chạy trên cùng origin — để ở đây thì chỉnh một lần, cả hai theo.
   *   { v: 1, series: [{ id, name, order: [khoá bài…], excluded: [khoá bài…] }] }
   * `order` là thứ tự đã xếp. `excluded` là những bài luật tự dò xếp vào bộ này
   * nhưng đã bị bỏ ra. Bài nào luật tự dò xếp vào bộ mà không nằm ở cả hai danh
   * sách (chương tác giả đăng SAU lúc chỉnh) thì được nối vào cuối.
   * Cùng định dạng với userscripts/tts-reader/sites/lofter.js.
   * ------------------------------------------------------------------------ */
  const MANUAL_KEY = 'aurel_lofter_series_v1';

  function manualLoad() {
    try {
      const o = JSON.parse(localStorage.getItem(MANUAL_KEY) || 'null');
      return (o && Array.isArray(o.series)) ? o.series.filter((m) => m && Array.isArray(m.order)) : [];
    } catch (e) { return []; }
  }
  function manualSave(list) {
    try { localStorage.setItem(MANUAL_KEY, JSON.stringify({ v: 1, series: list })); return true; }
    catch (e) { return false; }
  }

  // Nhóm tự dò nào chứa nhiều bài của `keys` nhất — bộ chỉnh tay "mọc ra" từ nhóm đó.
  function baseGroupOf(groups, keys) {
    let base = null, best = 0;
    groups.forEach((g) => {
      if (g.manual || g.oneshot || g.key === NO_TITLE_KEY || g.tagged) return;
      const n = g.items.filter((i) => keys.includes(i.key)).length;
      if (n > best) { best = n; base = g; }
    });
    return base;
  }

  function applyManualSeries(groups, manual) {
    manual.forEach((m) => {
      const byKey = new Map();
      groups.forEach((g) => g.items.forEach((i) => byKey.set(i.key, i)));
      const items = m.order.map((k) => byKey.get(k)).filter(Boolean);
      if (!items.length) return;
      const taken = new Set(items.map((i) => i.key));
      const excluded = m.excluded || [];
      const base = baseGroupOf(groups, m.order);
      if (base) base.items.forEach((i) => {
        if (!taken.has(i.key) && !excluded.includes(i.key)) { items.push(i); taken.add(i.key); }
      });
      groups.forEach((g) => { g.items = g.items.filter((i) => !taken.has(i.key)); });
      groups = groups.filter((g) => g.items.length);
      groups.unshift({
        key: 'manual:' + m.id, name: m.name || (base && base.name) || '(bộ chỉnh tay)',
        items, manual: true, manualId: m.id,
      });
    });
    return groups;
  }

  function sortChapters(list, mode) {
    const arr = list.slice();
    const dt = (x) => (x.date ? x.date.getTime() : 0);
    const numbered = arr.filter((x) => x.chapNo !== null).length;
    const useNo = mode === 'number' || (mode === 'auto' && numbered >= Math.max(2, arr.length * 0.6));
    if (mode === 'dom') return arr;
    if (mode === 'dateDesc') return arr.sort((a, b) => dt(b) - dt(a) || a.domIndex - b.domIndex);
    if (useNo) {
      return arr.sort((a, b) => {
        const an = a.chapNo === null ? Infinity : a.chapNo;
        const bn = b.chapNo === null ? Infinity : b.chapNo;
        return an - bn || dt(a) - dt(b) || b.domIndex - a.domIndex;
      });
    }
    return arr.sort((a, b) => dt(a) - dt(b) || b.domIndex - a.domIndex);
  }

  /* ==========================================================================
   * 6. TRÍCH NỘI DUNG MỘT CHƯƠNG
   * ======================================================================== */

  const BLOCK_TAGS = new Set(['p', 'div', 'section', 'article', 'blockquote', 'li', 'tr',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'figure', 'figcaption', 'hr', 'ul', 'ol', 'table']);

  // Ảnh tải lười: `src` chỉ là ảnh giữ chỗ (gif 1px, data:), địa chỉ thật nằm ở thuộc
  // tính khác. Nhận nhầm ảnh giữ chỗ thì mọi ảnh chưa cuộn tới đều ra CÙNG một URL,
  // và bước bỏ trùng gộp cả loạt làm một.
  const IMG_ATTRS = ['bigimgsrc', 'data-origin', 'data-original', 'data-src', 'data-lazy-src',
    'data-lazyload-src', 'data-lazyload', 'data-url', 'original', 'realsrc'];
  const PLACEHOLDER_RE = /^data:|\/(?:blank|empty|spacer|loading|placeholder|grey|gray|transparent)[^/]*\.(?:gif|png|svg)(?:\?|$)/i;

  function imgUrlOf(el, baseUrl) {
    if (!el.getAttribute) return '';
    let src = '';
    for (const a of IMG_ATTRS) {
      const v = (el.getAttribute(a) || '').trim();
      if (v && !PLACEHOLDER_RE.test(v)) { src = v; break; }
    }
    if (!src) {
      const set = (el.getAttribute('data-srcset') || el.getAttribute('srcset') || '').split(',')
        .map((x) => x.trim().split(/\s+/)[0]).filter((x) => x && !PLACEHOLDER_RE.test(x));
      src = (el.getAttribute('src') || '').trim();
      if (!src || PLACEHOLDER_RE.test(src)) src = set.length ? set[set.length - 1] : '';
    }
    if (!src) return '';
    let u = src;
    if (u.startsWith('//')) u = location.protocol + u;
    try { u = new URL(u, baseUrl || location.href).href; } catch (e) { /* giữ nguyên */ }
    return SITE.fullImageUrl ? SITE.fullImageUrl(u) : u;
  }

  const AVATAR_RE = /\/\/avaimg\./i;

  // Ảnh của bài. Mỗi blog một theme, nhưng thẻ <a class="imgclasstag" bigimgsrc="…">
  // là của chính Lofter (hộp xem ảnh của nó cần), theme nào cũng phát ra y như nhau —
  // nên đây là chỗ bám duy nhất không lệ thuộc theme.
  function galleryOf(doc, skipSel) {
    return Array.from(doc.querySelectorAll('a[bigimgsrc]')).filter((a) => {
      for (let p = a; p && p.nodeType === 1; p = p.parentElement) {
        try { if (skipSel && p.matches(skipSel)) return false; } catch (e) { /* */ }
        if (p !== a && CHROME_RE.test(markOf(p))) return false;
      }
      return true;
    });
  }
  // Khối nhỏ nhất chứa mọi phần tử trong `nodes`.
  function commonAncestor(nodes) {
    let box = nodes[0];
    while (box && !nodes.every((n) => box === n || box.contains(n))) box = box.parentElement;
    return box;
  }

  // Duyệt cây DOM → mảng token giữ nguyên thứ tự chữ/ảnh.
  // `textRoots` (tuỳ chọn): chỉ lấy CHỮ nằm trong các khối này, ảnh thì lấy ở mọi nơi
  // trong `root` — dùng khi `root` là cả bài còn thân bài chỉ là một phần của nó.
  function tokenize(root, skipSel, baseUrl, textRoots) {
    const out = [];
    const inText = (node) => !textRoots || textRoots.some((r) => r.contains(node));
    const skip = (el) => {
      if (!el.matches) return false;
      try { return skipSel && el.matches(skipSel); } catch (e) { return false; }
    };
    const walk = (node) => {
      if (node.nodeType === 3) { if (inText(node)) out.push({ t: 'txt', v: node.nodeValue }); return; }
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      if (['script', 'style', 'noscript', 'iframe', 'svg', 'video', 'audio', 'form'].includes(tag)) return;
      if (skip(node)) return;
      if (tag === 'br') { out.push({ t: 'br' }); return; }
      if (tag === 'img') {
        // Ngoài thân bài, <img> trần là avatar / biểu tượng của theme — chỉ thẻ
        // <a bigimgsrc> (ảnh của bài, bên dưới) mới được nhận.
        if (textRoots && !inText(node)) return;
        const u = imgUrlOf(node, baseUrl);
        if (u && !AVATAR_RE.test(u)) out.push({ t: 'img', v: u });
        return;
      }
      if (tag === 'a' && node.getAttribute('bigimgsrc')) {
        const u = imgUrlOf(node, baseUrl) || imgUrlOf(node.querySelector('img') || node, baseUrl);
        if (u) out.push({ t: 'img', v: u });
        return;
      }
      const isBlock = BLOCK_TAGS.has(tag);
      if (isBlock) out.push({ t: 'blk' });
      for (const c of node.childNodes) walk(c);
      if (isBlock) out.push({ t: 'blk' });
    };
    for (const c of root.childNodes) walk(c);
    return out;
  }

  function tokensToBlocks(tokens) {
    const blocks = [];
    let buf = '';
    const flush = () => {
      const parts = buf.replace(NBSP, ' ').split('\n');
      for (const p of parts) {
        // Bỏ ký tự điều khiển (làm hỏng XML của EPUB)
        const s = p.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/[ \t]+/g, ' ').trim();
        if (s) blocks.push({ type: 'p', text: s });
      }
      buf = '';
    };
    for (const tk of tokens) {
      if (tk.t === 'txt') buf += tk.v;
      else if (tk.t === 'br') buf += '\n';
      else if (tk.t === 'blk') flush();
      else if (tk.t === 'img') { flush(); blocks.push({ type: 'img', url: tk.v }); }
    }
    flush();
    // Bỏ ảnh trùng liên tiếp (Lofter hay lặp stubimg/realimg)
    const out = [];
    const seenImg = new Set();
    for (const b of blocks) {
      if (b.type === 'img') { if (seenImg.has(b.url)) continue; seenImg.add(b.url); }
      out.push(b);
    }
    return out;
  }

  const SITE_TITLE_RE = /^(?:LOFTER|乐乎|LOFTER\s*[（(]\s*乐乎\s*[）)])$/i;

  /* --------------------------------------------------------------------------
   * Đoán khối nội dung khi mọi selector đều trượt.
   *
   * Lofter cho mỗi blog tự chọn theme nên DOM mỗi blog một khác: thêm selector
   * cho blog này thì blog sau lại trượt, danh sách không bao giờ đuổi kịp.
   * Cách làm: bỏ các khối khung trang (điều hướng, bình luận, sidebar), rồi
   * lấy khối CHẶT NHẤT còn giữ được phần lớn chữ.
   * ------------------------------------------------------------------------ */

  const CHROME_RE = /(g-hd|g-ft|m-nav|m-hot|m-cmt|cmthot|m-side|sidebar|m-pager|m-info|comment|footer|header|nav|menu|recommend|relate|share|m-tag)/i;

  const markOf = (el) => ((el.className && el.className.baseVal) || el.className || '') + ' ' + (el.id || '');
  const textLen = (el) => (el.textContent || '').replace(/\s+/g, '').length;

  function guessRoot(doc) {
    const all = doc.querySelectorAll('div, article, section, td');
    const cands = [];
    let max = 0;
    Array.prototype.forEach.call(all, (el) => {
      if (CHROME_RE.test(markOf(el))) return;
      const total = textLen(el);
      if (total < 200) return;

      // Trừ chữ nằm trong khối khung trang bên trong. Không trừ thì khối cha
      // (chứa cả phần bình luận) luôn nhiều chữ hơn khối nội dung thật, và
      // ngưỡng bên dưới sẽ loại nhầm đúng cái mình cần.
      let chrome = 0;
      Array.prototype.forEach.call(el.querySelectorAll('*'), (d) => {
        if (!CHROME_RE.test(markOf(d))) return;
        // chỉ tính khối khung ngoài cùng, tránh cộng trùng khi chúng lồng nhau
        for (let p = d.parentElement; p && p !== el; p = p.parentElement) {
          if (CHROME_RE.test(markOf(p))) return;
        }
        chrome += textLen(d);
      });

      const net = total - chrome;
      if (net < 200) return;

      // Khối mà quá nửa là chữ trong thẻ <a> là điều hướng, không phải chương
      const linkLen = Array.prototype.reduce.call(
        el.querySelectorAll('a'), (n, a) => n + textLen(a), 0);
      if (linkLen > net * 0.5) return;

      let depth = 0;
      for (let p = el.parentElement; p; p = p.parentElement) depth++;
      cands.push({ el, net, depth });
      if (net > max) max = net;
    });
    if (!max) {
      // Không khối nào đủ chữ → nhiều khả năng đây là BÀI ẢNH. Lấy khối sâu
      // nhất có chứa ảnh; trả null ở đây là vứt luôn cả bài tranh.
      let best = null, bestDepth = -1;
      Array.prototype.forEach.call(all, (el) => {
        if (CHROME_RE.test(markOf(el))) return;
        if (!el.querySelectorAll('img').length) return;
        let d = 0;
        for (let p = el.parentElement; p; p = p.parentElement) d++;
        if (d > bestDepth) { bestDepth = d; best = el; }
      });
      return best;
    }
    // Giữ khối nào còn ≥60% lượng chữ, rồi chọn khối SÂU NHẤT → bọc sát nội
    // dung nhất. Bỏ bước chọn sâu nhất thì luôn trúng <body>.
    const keep = cands.filter((c) => c.net >= max * 0.6);
    keep.sort((a, b) => b.depth - a.depth || b.net - a.net);
    return keep.length ? keep[0].el : null;
  }

  // <title> của Lofter là "<tiêu đề bài>-<tên blog>", không có dấu cách quanh gạch nối.
  function stripBlogSuffix(t) {
    const blog = clean(SITE.bookTitle ? SITE.bookTitle() : '');
    if (blog && t.endsWith(blog)) {
      const cut = t.slice(0, t.length - blog.length).replace(/[\s\-–—|]+$/, '');
      if (cut) return cut;
    }
    return clean(t.split(/\s[-–—|]\s/)[0]);
  }

  function extractChapter(doc, url) {
    const c = SITE.chapter;
    const tEl = pick(doc, c.titleSel);
    // Dự phòng: <title> của trang, bỏ phần " - Tên blog - LOFTER"
    const docTitle = stripBlogSuffix(clean(doc.title || '')).slice(0, 80);
    // "LOFTER（乐乎）" là <title> chung của cả site, không phải tiêu đề chương.
    // Nhận nó làm tiêu đề là cách một lần tải hỏng đi qua mà trông như thành công.
    const title = clean(tEl && tEl.textContent)
      || (SITE_TITLE_RE.test(docTitle) ? '' : docTitle)
      || '(không tiêu đề)';
    const rootHit = pickWith(doc, c.rootSel);
    let root = rootHit.el;
    let matched = rootHit.sel;
    if (!root) {
      root = guessRoot(doc);
      matched = root ? '(đoán tự động)' : '';
    }
    // Truyền `url` làm base: doc này có thể là trang khác trang đang mở
    let blocks = [];
    let imgInRoot = 0;
    if (root) {
      blocks = tokensToBlocks(tokenize(root, c.skipSel, url));
      imgInRoot = blocks.filter((b) => b.type === 'img').length;
      // Selector chỉ trả khối ĐẦU TIÊN khớp, mà ảnh của bài có thể nằm ở khối .ctc
      // thứ hai trở đi hoặc hẳn ngoài .ctc. Duyệt lại cả bài: chữ vẫn chỉ lấy trong
      // các khối thân bài, ảnh lấy hết. Chỉ nhận kết quả này khi nó thật sự có thêm
      // ảnh và không làm rơi chữ.
      const post = rootHit.sel ? pick(doc, c.postSel || []) : null;
      if (post && post !== root && post.contains(root)) {
        const roots = Array.from(post.querySelectorAll(rootHit.sel))
          .filter((r, i, a) => !a.some((o) => o !== r && o.contains(r)));
        const wide = tokensToBlocks(tokenize(post, c.skipSel, url, roots));
        const len = (bs) => bs.reduce((n, b) => n + (b.type === 'p' ? b.text.length : 0), 0);
        if (wide.filter((b) => b.type === 'img').length > imgInRoot && len(wide) >= len(blocks)) blocks = wide;
      }
    }
    // Bám theo bộ ảnh của bài (xem galleryOf). Theme không có selector quen thì khối
    // "nhiều chữ nhất" mà guessRoot chọn là phần lời bình — bộ ảnh nằm NGAY CẠNH nó
    // chứ không nằm trong; bài toàn ảnh thì guessRoot chỉ vớ được khối sâu nhất có
    // <img>, tức đúng một ảnh (có khi là avatar). Đo 2026-10-05 trên theme 29002:
    // bài 8 ảnh ra 0 ảnh, các bài ảnh khác ra đúng 1.
    const gallery = galleryOf(doc, c.skipSel);
    const got = new Set(blocks.filter((b) => b.type === 'img').map((b) => b.url));
    const hasText = blocks.some((b) => b.type === 'p');
    if (gallery.length && (!hasText || gallery.some((a) => !got.has(imgUrlOf(a, url))))) {
      let box, wide;
      if (root && hasText) {
        box = commonAncestor([root].concat(gallery));
        wide = box ? tokensToBlocks(tokenize(box, c.skipSel, url, [root])) : null;
      } else {
        // Không có thân bài: lấy khối bọc bộ ảnh — nơi lời bình ngắn (dưới ngưỡng 200
        // ký tự của guessRoot) đứng cạnh ảnh. Nhiều ảnh thì khối chung của chúng đã là
        // khối đó; một ảnh thì khối chung là chính thẻ <a>, phải lên hai bậc
        // (a → khung ảnh → khối nội dung). Lên nữa là dính ngày đăng, tag, số bình luận.
        box = commonAncestor(gallery);
        for (let i = 0; box && gallery.length === 1 && i < 2; i++) {
          const up = box.parentElement;
          if (!up || up === doc.body || CHROME_RE.test(markOf(up))
              || up.querySelector('iframe, .notes, [id*="comment"], [class*="comment"]')) break;
          box = up;
        }
        wide = box ? tokensToBlocks(tokenize(box, c.skipSel, url)) : null;
      }
      const nImg = wide ? wide.filter((b) => b.type === 'img').length : 0;
      if (nImg > got.size || (nImg === got.size && nImg && !hasText && wide.some((b) => b.type === 'p'))) {
        blocks = wide;
        matched = (matched ? matched + ' + ' : '') + 'bộ ảnh a[bigimgsrc]';
      }
    }
    const dEl = pick(doc, c.dateSel);
    const dateText = clean(dEl && dEl.textContent);
    const tags = pickAll(doc, c.tagSel).map((a) => clean(a.textContent).replace(/^[●#\s]+/, '')).filter(Boolean);
    return {
      url, title, blocks, tags, dateText,
      date: parseListDate(dateText, null),
      matchedSelector: matched,
      imgInRoot,   // số ảnh nếu chỉ đọc khối đầu tiên khớp selector — để "Dò selector" so
      // <title> của Lofter là "<tiêu đề bài>-<tên blog>", còn dính đuôi tên
      // blog. Đánh dấu để fetchChapter ưu tiên tiêu đề sạch từ mục lục.
      titleFromDoc: !tEl,
      textLen: blocks.filter((b) => b.type === 'p').reduce((n, b) => n + b.text.length, 0),
      imgCount: blocks.filter((b) => b.type === 'img').length,
    };
  }

  /* --------------------------------------------------------------------------
   * Dựng trang bằng iframe.
   *
   * Lofter có ít nhất hai front-end. Theme cũ (.m-postdtl/.ctc) trả nội dung
   * ngay trong HTML. Theme mới dùng React với class băm (kiểu "IiOL8wMg…==") và
   * dựng nội dung bằng JavaScript sau khi trang tải — fetch HTML thô chỉ thấy
   * cái khung, không khối nào quá 200 ký tự.
   *
   * Không mò API: mở chính trang đó trong iframe cùng origin, để nó tự chạy JS,
   * rồi đọc DOM đã dựng xong. Nặng hơn fetch nhiều nên chỉ dùng khi fetch hụt.
   * ------------------------------------------------------------------------ */
  function renderInFrame(url, opts) {
    const o = opts || {};
    const timeout = o.timeout || 25000;
    // Điều kiện dừng mặc định chỉ hỏi "có chữ chưa" — sai, vì phần bình luận
    // có sẵn trong HTML đã vượt ngưỡng ngay lập tức và iframe kết thúc trước
    // khi JS kịp dựng gì. Bên gọi nên đưa điều kiện đo ĐÚNG THỨ CẦN.
    const ready = o.ready || ((d) => (d.body.textContent || '').replace(/\s+/g, '').length > 400);
    return new Promise((resolve, reject) => {
      const fr = document.createElement('iframe');
      fr.style.cssText = 'position:fixed;left:-9999px;top:0;width:1024px;height:2400px;border:0;opacity:0;';
      let settled = false;

      const finish = (v) => {
        if (settled) return;
        settled = true;
        clearInterval(poll); clearTimeout(timer);
        if (v instanceof Error) { try { fr.remove(); } catch (e) { /* */ } return reject(v); }
        // Tách khỏi iframe TRƯỚC khi gỡ: nếu trả thẳng contentDocument thì tài
        // liệu bị gỡ ngay dưới tay bên gọi. outerHTML giữ nguyên DOM sau khi JS
        // đã chạy, kể cả src ảnh do JS gán.
        let html = '';
        try { html = v.documentElement.outerHTML; } catch (e) { /* */ }
        try { fr.remove(); } catch (e) { /* */ }
        resolve({ html, doc: new DOMParser().parseFromString(html, 'text/html') });
      };

      const peek = () => {
        let d;
        // Bị đá sang trang đăng nhập / rate-limit ở subdomain khác thì đọc
        // contentDocument sẽ ném lỗi cross-origin — đó là thông tin, không phải sự cố.
        try { d = fr.contentDocument; } catch (e) { return finish(new Error('iframe bị chuyển sang origin khác (đăng nhập hoặc bị chặn)')); }
        if (!d || !d.body) return;
        let hit = false;
        try { hit = !!ready(d); } catch (e) { hit = false; }
        if (hit) finish(d);
      };

      const poll = setInterval(peek, 500);
      const timer = setTimeout(() => {
        let d = null;
        try { d = fr.contentDocument; } catch (e) { /* */ }
        // Hết giờ vẫn trả DOM hiện có — để probe còn nhìn được nó thành cái gì
        finish(d && d.body ? d : new Error('iframe không dựng kịp nội dung'));
      }, timeout);

      fr.src = url;
      document.body.appendChild(fr);
    });
  }

  // Điều kiện dừng cho renderInFrame: trích được nội dung VÀ số chữ + số ảnh đứng yên
  // qua ba lần hỏi liền (1,5s). Dừng ngay lúc có chữ thì chụp trang khi JS mới gắn được
  // một phần ảnh; còn đòi phải có chữ thì bài toàn ảnh luôn chờ hết 25s.
  function settledReady(url) {
    let last = '', same = 0;
    return (d) => {
      let c;
      try { c = extractChapter(d, url); } catch (e) { return false; }
      if (!c.textLen && !c.imgCount) return false;
      const sig = c.textLen + ':' + c.imgCount;
      same = sig === last ? same + 1 : 0;
      last = sig;
      return same >= 2;
    };
  }

  // Tiêu đề chương. Tính lại mỗi lần xuất chứ không đóng cứng lúc tải: đổi tên bài
  // sau khi chương đã nằm trong bộ nhớ thì bản xuất vẫn phải theo tên mới.
  function finalTitle(item, ch) {
    const own = ch.ownTitle === '(không tiêu đề)' ? '' : (ch.ownTitle || '');
    if (item.given) return item.given;
    // Tiêu đề mục lục sạch hơn <title> của trang
    if (item.title && (!own || ch.titleFromDoc)) return item.title;
    return own || item.hint || labelOf(item);
  }

  /* ==========================================================================
   * 6b. BÌNH LUẬN
   * Bình luận Lofter nằm trong khung www.lofter.com/comment.do, khung đó tự gọi
   * DWR PostBean.getPostResponses(postId, limit, offset). Gọi thẳng lệnh đó (đo
   * 2026-10-13: trả 200, không cần đăng nhập). postId lấy từ URL bài:
   * /post/<blogId hex>_<postId hex>. Bình luận trả lời người khác nằm ngay trong
   * danh sách (replyBlogInfo); trả lời cấp 2 lồng bên dưới thì chưa lấy.
   * ======================================================================== */

  const CMT_PAGE = 50, CMT_MAX = 1000;

  function postIdOf(url) {
    const m = /\/post\/[0-9a-f]+_([0-9a-f]+)/i.exec(url || '');
    return m ? parseInt(m[1], 16) : 0;
  }

  // Đọc phản hồi DWR ("var s1={};s1.content=\"…\";… _remoteHandleCallback('1','0',[s1,s2])")
  // mà không eval: gom từng phép gán sN.khoa=giatri, rồi nối các tham chiếu sM.
  function parseDwr(text) {
    const objs = {};
    const get = (k) => (objs[k] = objs[k] || {});
    const val = (v) => {
      v = v.trim();
      if (v[0] === '"') { try { return JSON.parse(v.replace(/\\'/g, "'")); } catch (e) { return v.slice(1, -1); } }
      if (/^s\d+$/.test(v)) return { $ref: v };
      if (v === 'null' || v === 'undefined') return null;
      if (v === 'true' || v === 'false') return v === 'true';
      if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
      return v;
    };
    const re = /(s\d+)(?:\.(\w+)|\[(\d+)\])=("(?:[^"\\]|\\.)*"|[^;]*);/g;
    let m;
    while ((m = re.exec(text))) get(m[1])[m[2] != null ? m[2] : m[3]] = val(m[4]);
    const deref = (o, depth) => {
      if (!o || typeof o !== 'object' || depth > 3) return o;
      if (o.$ref) return deref(objs[o.$ref], depth + 1);
      return o;
    };
    const cb = /_remoteHandleCallback\([^,]+,[^,]+,\[([^\]]*)\]\)/.exec(text);
    const list = cb ? cb[1].split(',').map((x) => x.trim()).filter(Boolean) : [];
    return list.map((k) => {
      const o = objs[k] || {};
      const who = deref(o.publisherMainBlogInfo, 0) || {};
      const to = deref(o.replyBlogInfo, 0) || {};
      return {
        id: o.id, text: String(o.content || ''), time: o.publishTime || 0,
        who: who.blogNickName || who.blogName || '?', to: to.blogNickName || to.blogName || '',
      };
    });
  }

  function dwrComments(postId, offset) {
    const body = ['callCount=1', 'scriptSessionId=${scriptSessionId}187', 'httpSessionId=',
      'c0-scriptName=PostBean', 'c0-methodName=getPostResponses', 'c0-id=0',
      'c0-param0=number:' + postId, 'c0-param1=number:' + CMT_PAGE, 'c0-param2=number:' + offset,
      'batchId=' + Date.now(), ''].join('\n');
    const url = 'https://www.lofter.com/dwr/call/plaincall/PostBean.getPostResponses.dwr';
    return new Promise((resolve, reject) => {
      if (!gmXhr) return reject(new Error('Không có GM_xmlhttpRequest'));
      gmXhr({
        method: 'POST', url, data: body, timeout: 30000,
        headers: { 'Content-Type': 'text/plain', Referer: 'https://www.lofter.com/' },
        onload: (r) => (r.status === 200 ? resolve(r.responseText) : reject(new Error('HTTP ' + r.status))),
        onerror: () => reject(new Error('Lỗi mạng')),
        ontimeout: () => reject(new Error('Quá thời gian chờ')),
      });
    });
  }

  async function fetchComments(url, onLog) {
    const pid = postIdOf(url);
    if (!pid) return [];
    const all = [], seen = new Set();
    for (let off = 0; off < CMT_MAX; off += CMT_PAGE) {
      const page = parseDwr(await dwrComments(pid, off));
      page.forEach((c) => { if (!seen.has(c.id)) { seen.add(c.id); all.push(c); } });
      if (page.length < CMT_PAGE) break;
      await sleep(600);
    }
    if (all.length >= CMT_MAX) onLog && onLog('  ↳ bình luận: dừng ở ' + CMT_MAX + ' cái đầu');
    return all;
  }

  // Bình luận thành đoạn văn ở cuối chương, nên TXT / MD / EPUB / ZIP và bước dịch đều nhận như chữ thường.
  function commentBlocks(list) {
    if (!list.length) return [];
    const day = (t) => (t ? new Date(t).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '');
    return [{ type: 'p', text: '—— Bình luận (' + list.length + ') ——' }].concat(list.map((c) => ({
      type: 'p',
      text: c.who + (c.to ? ' → ' + c.to : '') + (c.time ? ' (' + day(c.time) + ')' : '') + ': ' + c.text,
    })));
  }

  async function fetchChapter(item, onLog) {
    if (item._pre) { item._pre.title = finalTitle(item, item._pre); return item._pre; }
    const html = await requestRetry(item.url, {}, CFG.retries, onLog);
    let doc = new DOMParser().parseFromString(html, 'text/html');
    let ch = extractChapter(doc, item.url);
    // HTML thô rỗng ruột = theme dựng nội dung bằng JS. Để iframe chạy JS hộ.
    if (!ch.textLen && !ch.imgCount && CFG.useFrame) {
      onLog && onLog('  ↳ HTML thô không có nội dung — dựng bằng iframe…');
      // Chờ tới khi TRÍCH ĐƯỢC CHƯƠNG, không phải tới khi trang có chữ.
      const r = await renderInFrame(item.url, { ready: settledReady(item.url) });
      doc = r.doc;
      ch = extractChapter(doc, item.url);
      ch.viaFrame = true;
    }
    ch.ownTitle = ch.title;
    ch.title = finalTitle(item, ch);
    // Máy chủ trả 200 nhưng không có nội dung = tải hỏng. Nếu để lọt, log ghi ✓
    // và file xuất ra rỗng ruột mà không có gì báo — đúng cái đã xảy ra ở 1.1.0.
    if (!ch.textLen && !ch.imgCount) {
      throw new Error('trang rỗng — có thể là bài ảnh (bật "Tải ảnh trong chương"), bị chặn tốc độ, hoặc selector không khớp');
    }
    // Ngày trên trang bài hay thiếu năm ("8月30日") → parseListDate đoán năm hiện tại.
    // Ngày từ mục lục có ngữ cảnh năm (ul#YYYY_M_list) nên đáng tin hơn.
    if (item.date && !/\d{4}/.test(ch.dateText || '')) ch.date = item.date;
    else if (!ch.date) ch.date = item.date;
    if (CFG.withComments && !ch.comments) {
      try {
        ch.comments = await fetchComments(item.url, onLog);
        ch.blocks = ch.blocks.concat(commentBlocks(ch.comments));
        if (ch.comments.length) onLog && onLog('  ↳ ' + ch.comments.length + ' bình luận');
      } catch (e) {
        onLog && onLog('  ↳ không lấy được bình luận: ' + e.message);   // lỗi bình luận không làm hỏng chương
      }
    }
    return ch;
  }

  /* ==========================================================================
   * 7. ẢNH
   * ======================================================================== */

  const IMG_EXT = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', bmp: 'image/bmp' };
  const MEM_WARN = 150 * 1024 * 1024;   // ~150 MB ảnh trong RAM là đã sát ngưỡng sập tab

  function extOf(url) {
    const m = /\.([a-z0-9]{3,4})(?:\?|$)/i.exec(url.split('#')[0]);
    const e = m ? m[1].toLowerCase() : 'jpg';
    return IMG_EXT[e] ? e : 'jpg';
  }

  // URL ảnh Lofter thường KHÔNG có đuôi (…/img/<base64>/0?imageView…), nên đoán
  // theo URL sẽ ra 'jpg' cho cả ảnh GIF/PNG → EPUB khai sai media-type và reader
  // từ chối ảnh. Đọc chữ ký byte của chính file mới là nguồn đáng tin.
  function sniffExt(buf, url) {
    try {
      if (buf && typeof buf.byteLength === 'number' && buf.byteLength >= 12) {
        const b = new Uint8Array(buf, 0, 12);
        if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'jpg';
        if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return 'png';
        if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'gif';
        if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
            b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'webp';
        if (b[0] === 0x42 && b[1] === 0x4D) return 'bmp';
      }
    } catch (e) { /* rơi về đoán theo URL */ }
    return extOf(url);
  }

  async function downloadImages(chapters, onLog, shouldStop) {
    const all = [];
    chapters.forEach((ch) => ch.blocks.forEach((b) => { if (b.type === 'img') all.push(b.url); }));
    const uniq = Array.from(new Set(all));
    const imgs = new Map(); // url -> {name, mime, data}
    if (!uniq.length) return imgs;

    const conc = Math.max(1, Math.min(6, +CFG.imgConc || 1));
    let done = 0;
    const bufs = await pMap(uniq, conc, async (url) => {
      if (shouldStop()) return null;
      try {
        const buf = await requestRetry(url, {
          type: 'buffer',
          referer: SITE.imageReferer ? SITE.imageReferer() : undefined,
        }, CFG.retries, onLog);
        done++;
        if (done % 5 === 0 || done === uniq.length) onLog(`🖼️  Ảnh ${done}/${uniq.length}`);
        // Nhân nhịp nghỉ với số luồng → tổng tần suất gọi máy chủ không đổi
        await sleep(Math.min(CFG.delay, 400) * conc);
        return buf;
      } catch (e) {
        done++;
        onLog(`  ⚠️ Bỏ qua ảnh (${e.message}): ${url.slice(0, 70)}…`);
        return null;
      }
    });

    // Vét lại ảnh hụt, lần này từng ảnh một và cho chờ lâu hơn: ảnh gốc của Lofter
    // nặng, tải song song dễ quá giờ hoặc bị CDN từ chối — mà với truyện đăng bằng ảnh,
    // thiếu một ảnh là thiếu một trang.
    const missed = uniq.map((u, i) => i).filter((i) => !bufs[i]);
    if (missed.length && !shouldStop()) {
      onLog(`🖼️  Vét lại ${missed.length} ảnh hụt…`);
      for (const i of missed) {
        if (shouldStop()) break;
        await sleep(Math.max(CFG.delay, 1500));
        try {
          bufs[i] = await requestRetry(uniq[i], {
            type: 'buffer', timeout: 120000,
            referer: SITE.imageReferer ? SITE.imageReferer() : undefined,
          }, 1, onLog);
        } catch (e) { /* đếm ở dưới */ }
      }
    }
    const lost = uniq.filter((u, i) => !bufs[i]);
    if (lost.length) {
      onLog(`⚠️ Còn ${lost.length}/${uniq.length} ảnh không tải được — trong sách, chỗ đó là dòng ［Ảnh］ kèm URL:`, 'err');
      lost.slice(0, 8).forEach((u) => onLog('     ' + u, 'err'));
    } else onLog(`🖼️  Đủ ${uniq.length}/${uniq.length} ảnh.`, 'ok');

    // Đánh số theo thứ tự URL, không theo thứ tự tải xong → tên file ổn định
    let bytes = 0, warned = false;
    uniq.forEach((url, i) => {
      const buf = bufs[i];
      if (!buf) return;
      const ext = sniffExt(buf, url);
      bytes += buf.byteLength || 0;
      if (!warned && bytes > MEM_WARN) {
        warned = true;
        onLog(`⚠️ Đã ${Math.round(bytes / 1048576)} MB ảnh trong bộ nhớ — bộ này to, tab có thể sập. Cân nhắc bỏ chọn "Tải ảnh trong chương" hoặc chia nhỏ.`, 'err');
      }
      imgs.set(url, { name: `img${pad(imgs.size + 1, 4)}.${ext}`, mime: IMG_EXT[ext], data: buf });
    });
    return imgs;
  }

  /* ==========================================================================
   * 8. XUẤT FILE
   * ======================================================================== */

  function saveBlob(blob, filename) {
    const a = document.createElement('a');
    const u = URL.createObjectURL(blob);
    a.href = u; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(u); a.remove(); }, 4000);
  }

  function chapterToText(ch, imgStore) {
    const lines = [];
    for (const b of ch.blocks) {
      if (b.type === 'p') lines.push(b.text);
      else if (CFG.imgInTxt !== 'skip') {
        const rec = imgStore && imgStore.get(b.url);
        lines.push(CFG.imgInTxt === 'name' && rec ? `［Ảnh: ${rec.name}］` : `［Ảnh］ ${b.url}`);
      }
    }
    return lines.join('\n\n');
  }

  function buildTxt(group, chapters, imgStore) {
    const head = [
      group.name,
      ...(group.rawName ? [`Tên gốc: ${group.rawName}`] : []),
      `Nguồn: ${location.origin}`,
      `Số chương: ${chapters.length}`,
      `Tải lúc: ${new Date().toLocaleString('vi-VN')}`,
      '='.repeat(50), '',
    ].join('\n');
    const body = chapters.map((ch, i) => {
      const t = `${pad(i + 1)}. ${ch.title}`;
      const meta = [ch.dateText, ch.tags && ch.tags.length ? '#' + ch.tags.join(' #') : ''].filter(Boolean).join('  |  ');
      return [`\n\n${'—'.repeat(40)}\n${t}\n${meta}\n${'—'.repeat(40)}\n`, chapterToText(ch, imgStore)].join('\n');
    }).join('\n');
    return (CFG.txtBom ? '﻿' : '') + head + body + '\n';
  }

  // Markdown gộp: mỗi chương một đề mục cấp 2. Ảnh là liên kết tới URL gốc — file .md đứng
  // một mình, không có thư mục ảnh đi kèm (muốn có ảnh thì dùng EPUB hoặc ZIP).
  function buildMd(group, chapters) {
    const escMd = (t) => String(t || '').replace(/([\\`*_{}\[\]<>#])/g, '\\$1');
    const head = [
      '# ' + escMd(group.name), '',
      ...(group.rawName ? ['- Tên gốc: ' + escMd(group.rawName)] : []),
      '- Nguồn: ' + location.origin,
      '- Số chương: ' + chapters.length,
      '- Tải lúc: ' + new Date().toLocaleString('vi-VN'), '',
    ];
    const body = chapters.map((ch, i) => {
      const meta = [ch.dateText, (ch.tags || []).map((t) => '#' + t).join(' ')].filter(Boolean).join(' · ');
      const lines = ch.blocks.map((b) => (b.type === 'p' ? escMd(b.text) : `![](${b.url})`));
      return [`## ${pad(i + 1)}. ${escMd(ch.title)}`, '', ...(meta ? ['*' + escMd(meta) + '*', ''] : []), lines.join('\n\n'), ''].join('\n');
    });
    return head.concat(body).join('\n');
  }

  async function buildZip(group, chapters, imgStore, onLog) {
    const zip = zipBuilder();
    const folder = zip.folder(safeName(group.name));
    const idx = [];
    chapters.forEach((ch, i) => {
      const fn = `${pad(i + 1)} - ${safeName(ch.title, 60)}.txt`;
      idx.push(`${pad(i + 1)}\t${ch.title}\t${ch.dateText || ''}\t${ch.url}`);
      const header = `${ch.title}\n${ch.dateText || ''}\n${ch.url}\n${'—'.repeat(30)}\n\n`;
      folder.file(fn, (CFG.txtBom ? '﻿' : '') + header + chapterToText(ch, imgStore));
    });
    folder.file('_mục lục.txt', '﻿' + idx.join('\n'));
    if (CFG.embedImages && imgStore && imgStore.size) {
      const imgs = folder.folder('images');
      for (const [, rec] of imgStore) imgs.file(rec.name, rec.data);
    }
    return makeZip(zip.entries, onLog);
  }

  // ZIP chỉ chứa ảnh, xếp theo chương. Mỗi ảnh đặt ở chương ĐẦU TIÊN dùng nó —
  // ảnh lặp lại giữa các chương chỉ ghi vào mục lục, không nhân đôi dung lượng.
  async function buildImgZip(group, chapters, imgStore) {
    const zip = zipBuilder();
    const root = zip.folder(safeName(group.name) + ' - ảnh');
    const idx = ['# chương\ttên file\turl gốc'];
    const placed = new Set();
    let n = 0;
    chapters.forEach((ch, i) => {
      const urls = ch.blocks.filter((b) => b.type === 'img').map((b) => b.url);
      if (!urls.length) return;
      let dir = null;
      urls.forEach((u) => {
        const rec = imgStore.get(u);
        if (!rec) { idx.push(`${pad(i + 1)}\t(tải hỏng)\t${u}`); return; }
        if (placed.has(u)) { idx.push(`${pad(i + 1)}\t${rec.name} (đã có ở chương trước)\t${u}`); return; }
        if (!dir) dir = root.folder(`${pad(i + 1)} - ${safeName(ch.title, 50)}`);
        placed.add(u); n++;
        dir.file(rec.name, rec.data);
        idx.push(`${pad(i + 1)}\t${rec.name}\t${u}`);
      });
    });
    root.file('_mục lục ảnh.txt', '\ufeff' + idx.join('\n'));
    return n ? makeZip(zip.entries, null) : null;
  }

  const EPUB_CSS = `body{font-family:serif;line-height:1.75;margin:1em;}
h1{font-size:1.25em;line-height:1.4;margin:0 0 1em;text-align:center;}
p{margin:0 0 .85em;text-indent:2em;}
.meta{color:#666;font-size:.85em;text-align:center;text-indent:0;margin-bottom:1.5em;}
.imgbox{text-align:center;margin:1.2em 0;text-indent:0;}
img{max-width:100%;}`;

  /* --------------------------------------------------------------------------
   * ZIP tự viết — không phụ thuộc thư viện ngoài.
   *
   * Vì sao: JSZip.generateAsync() treo vĩnh viễn trong sandbox Tampermonkey trên
   * Lofter. Đo 2026-09-06: 4 chương, ~10 KB, quá 60 s không hồi âm, không ném lỗi,
   * không tiến triển. Nguyên nhân nằm trong bộ lập lịch async của JSZip, không
   * quan sát được từ ngoài sandbox — nên bỏ hẳn phụ thuộc thay vì đoán tiếp.
   *
   * Nén thật bằng CompressionStream('deflate-raw') có sẵn trong trình duyệt.
   * Không có, hoặc nén lỗi → lưu nguyên (STORE): file to hơn nhưng vẫn hợp lệ.
   * ------------------------------------------------------------------------ */

  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(u8) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  const enc = new TextEncoder();
  const toU8 = (d) => (typeof d === 'string' ? enc.encode(d)
    : d instanceof Uint8Array ? d : new Uint8Array(d));

  async function deflateRaw(u8) {
    if (typeof CompressionStream === 'undefined') return null;
    const stream = new Blob([u8]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  // Gom entry theo đúng phần API của JSZip mà buildEpub/buildZip đang gọi,
  // để hai hàm đó không phải viết lại.
  function zipBuilder() {
    const entries = [];
    const node = (prefix) => ({
      file(name, data, opts) {
        entries.push({ name: prefix + name, data, store: !!(opts && opts.compression === 'STORE') });
      },
      folder(name) { return node(prefix + String(name).replace(/\/+$/, '') + '/'); },
    });
    const root = node('');
    root.entries = entries;
    return root;
  }

  async function makeZip(entries, onLog) {
    const parts = [], central = [];
    let offset = 0, cdLen = 0;
    const put = (u8) => { parts.push(u8); offset += u8.length; };
    const rec = (n) => { const b = new Uint8Array(n); return [b, new DataView(b.buffer)]; };
    const tick = Math.max(1, Math.ceil(entries.length / 4));

    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      const nameU8 = enc.encode(e.name);
      const raw = toU8(e.data);
      const crc = crc32(raw);
      let body = raw, method = 0;
      if (!e.store) {
        // Không để một lần nén treo cả tiến trình — quá hạn thì lưu nguyên.
        const z = await withTimeout(deflateRaw(raw), 10000, 'nén chậm').catch(() => null);
        if (z && z.length < raw.length) { body = z; method = 8; }
      }
      const at = offset;

      const [lh, lv] = rec(30);              // local file header
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true);         // bit 11 → tên file mã hoá UTF-8
      lv.setUint16(8, method, true);
      lv.setUint16(12, 0x0021, true);        // ngày DOS cố định → build lặp lại được
      lv.setUint32(14, crc, true);
      lv.setUint32(18, body.length, true);
      lv.setUint32(22, raw.length, true);
      lv.setUint16(26, nameU8.length, true);
      put(lh); put(nameU8); put(body);

      const [cd, cv] = rec(46);              // central directory record
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, method, true);
      cv.setUint16(14, 0x0021, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, body.length, true);
      cv.setUint32(24, raw.length, true);
      cv.setUint16(28, nameU8.length, true);
      cv.setUint32(42, at, true);
      central.push(cd, nameU8);
      cdLen += cd.length + nameU8.length;

      if (onLog && entries.length > 20 && (i + 1) % tick === 0) {
        onLog(`  … đóng gói ${Math.round(((i + 1) / entries.length) * 100)}%`);
      }
    }

    const cdAt = offset;
    central.forEach((u8) => parts.push(u8));

    const [eo, ev] = rec(22);                // end of central directory
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, entries.length, true);
    ev.setUint16(10, entries.length, true);
    ev.setUint32(12, cdLen, true);
    ev.setUint32(16, cdAt, true);
    parts.push(eo);

    return new Blob(parts, { type: 'application/zip' });
  }

  // Tác giả Trung hay chèn vài câu tiếng Nhật (lời thoại, tên chiêu, bài hát). Chỉ cần MỘT
  // chữ kana là gán lang="ja" thì cả truyện Trung bị gắn nhãn [raw_ja], mất tiền tố ZH_,
  // và trình đọc chọn nhầm phông. Nên đo TỈ LỆ: văn Nhật thật có kana chiếm cỡ 30–60% số chữ
  // CJK, còn truyện Trung chèn câu Nhật chỉ vài phần trăm.
  const LANG_KANA_RATIO = 0.15;
  function langStats(s) {
    let kana = 0, han = 0, hangul = 0;
    for (const ch of s) {
      const c = ch.codePointAt(0);
      if ((c >= 0x3040 && c <= 0x30ff) || (c >= 0x31f0 && c <= 0x31ff) || (c >= 0xff66 && c <= 0xff9f)) kana++;
      else if ((c >= 0x4e00 && c <= 0x9fff) || (c >= 0x3400 && c <= 0x4dbf)) han++;
      else if ((c >= 0xac00 && c <= 0xd7af) || (c >= 0x1100 && c <= 0x11ff)) hangul++;
    }
    return { kana, han, hangul };
  }
  function detectLang(chapters) {
    // Lấy mẫu rải khắp truyện (đầu · giữa · cuối) thay vì 2000 chữ đầu: câu Nhật nằm ở đâu cũng bị tính.
    const texts = chapters.map((c) => c.blocks.filter((b) => b.type === 'p').map((b) => b.text).join(''));
    const pick = [];
    if (texts.length) {
      [0, Math.floor(texts.length / 2), texts.length - 1].forEach((i) => { if (!pick.includes(i)) pick.push(i); });
    }
    const s = pick.map((i) => texts[i].slice(0, 4000)).join('');
    // Bản đã convert vẫn có thể sót vài chữ Hán → xét dấu tiếng Việt trước Hán.
    if (/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(s)) return 'vi';
    const { kana, han, hangul } = langStats(s);
    const total = kana + han + hangul;
    if (total) {
      if (hangul / total >= LANG_KANA_RATIO) return 'ko';
      // Kana/Hán: văn Nhật nào cũng lẫn kanji, nên so tỉ lệ chứ không xét "có kana là ja".
      if (kana / total >= LANG_KANA_RATIO) return 'ja';
      if (han) return 'zh';
      if (kana) return 'ja';
      if (hangul) return 'ko';
    }
    return SITE.lang || 'vi';
  }

  async function buildEpub(group, chapters, imgStore, onLog) {
    const zip = zipBuilder();
    const id = 'urn:uuid:' + uuid();
    const lang = detectLang(chapters);
    const author = (SITE.bookTitle && SITE.bookTitle()) || location.hostname;
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

    const step = (m) => onLog && onLog('  … ' + m);
    step('dựng khung');
    zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
    zip.file('META-INF/container.xml',
      `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);
    zip.file('OEBPS/style.css', EPUB_CSS);

    // Chỉ nhúng ảnh thực sự xuất hiện trong nhóm này — và chỉ khi được phép.
    // Tắt nhúng thì `used` rỗng, mỗi ảnh thành một dòng ［Ảnh］ kèm URL.
    const used = new Map();
    if (CFG.embedImages) chapters.forEach((ch) => ch.blocks.forEach((b) => {
      if (b.type === 'img' && imgStore && imgStore.has(b.url)) used.set(b.url, imgStore.get(b.url));
    }));
    for (const [, rec] of used) zip.file('OEBPS/images/' + rec.name, rec.data);

    step(`${used.size} ảnh nhúng`);
    const items = [];
    chapters.forEach((ch, i) => {
      const fid = `chap${pad(i + 1)}`;
      const meta = [ch.dateText, (ch.tags || []).map((t) => '#' + t).join(' ')].filter(Boolean).join(' · ');
      const body = ch.blocks.map((b) => {
        if (b.type === 'p') return `<p>${escHtml(b.text)}</p>`;
        const rec = used.get(b.url);
        return rec ? `<div class="imgbox"><img src="../images/${rec.name}" alt=""/></div>`
                   : `<p class="meta">［Ảnh］ ${escHtml(b.url)}</p>`;
      }).join('\n');
      const xhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${lang}" lang="${lang}">
<head><meta charset="utf-8"/><title>${escXml(ch.title)}</title>
<link rel="stylesheet" type="text/css" href="../style.css"/></head>
<body>
<h1>${escHtml(ch.title)}</h1>
${meta ? `<p class="meta">${escHtml(meta)}</p>` : ''}
${body}
</body></html>`;
      zip.file(`OEBPS/text/${fid}.xhtml`, xhtml);
      items.push({ fid, title: ch.title });
    });

    // Ảnh đầu tiên làm bìa: EPUB 3 dùng properties="cover-image", kèm <meta name="cover">
    // kiểu EPUB 2 để Calibre/Kindle đời cũ cũng nhận ra.
    const imgList = Array.from(used.values());
    step(`${items.length} chương đã vào gói`);
    const manifestImgs = imgList
      .map((r, i) => `    <item id="img${pad(i + 1, 4)}" href="images/${r.name}" media-type="${r.mime}"${i === 0 ? ' properties="cover-image"' : ''}/>`).join('\n');
    const coverMeta = imgList.length ? '\n    <meta name="cover" content="img0001"/>' : '';
    const manifestChaps = items.map((it) => `    <item id="${it.fid}" href="text/${it.fid}.xhtml" media-type="application/xhtml+xml"/>`).join('\n');
    const spine = items.map((it) => `    <itemref idref="${it.fid}"/>`).join('\n');

    zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="BookId" xml:lang="${lang}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">${id}</dc:identifier>
    <dc:title>${escXml(group.name)}</dc:title>
    <dc:creator>${escXml(author)}</dc:creator>
    <dc:language>${lang}</dc:language>
    <dc:source>${escXml(location.origin)}</dc:source>
    <meta property="dcterms:modified">${now}</meta>${coverMeta}
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="css" href="style.css" media-type="text/css"/>
${manifestChaps}
${manifestImgs}
  </manifest>
  <spine toc="ncx">
${spine}
  </spine>
</package>`);

    zip.file('OEBPS/nav.xhtml', `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${lang}">
<head><meta charset="utf-8"/><title>Mục lục</title></head>
<body><nav epub:type="toc" id="toc"><h1>Mục lục</h1><ol>
${items.map((it) => `<li><a href="text/${it.fid}.xhtml">${escHtml(it.title)}</a></li>`).join('\n')}
</ol></nav>
<nav epub:type="landmarks" id="landmarks" hidden="hidden"><ol>
<li><a epub:type="bodymatter" href="text/${items[0] ? items[0].fid : 'chap001'}.xhtml">Bắt đầu đọc</a></li>
</ol></nav></body></html>`);

    zip.file('OEBPS/toc.ncx', `<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><meta name="dtb:uid" content="${id}"/><meta name="dtb:depth" content="1"/>
  <meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head>
  <docTitle><text>${escXml(group.name)}</text></docTitle>
  <navMap>
${items.map((it, i) => `    <navPoint id="np${i + 1}" playOrder="${i + 1}"><navLabel><text>${escXml(it.title)}</text></navLabel><content src="text/${it.fid}.xhtml"/></navPoint>`).join('\n')}
  </navMap>
</ncx>`);

    step(`nén ${zip.entries.length} file`);
    return makeZip(zip.entries, onLog);
  }

  /* ==========================================================================
   * 9. GIAO DIỆN
   * ======================================================================== */

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

  // Phần riêng của trình tải, đặt trên bộ thẻ chung của KIT_CSS.
  const CSS = KIT_CSS + `
.row>input[type=text]{flex:1;min-width:120px;}
.groups{border:1px solid var(--k-line);border-radius:6px;background:var(--k-field);margin-bottom:8px;max-height:280px;overflow-y:auto;}
.g{border-bottom:1px solid var(--k-line);} .g:last-child{border-bottom:0;}
.ghd{display:flex;align-items:center;gap:8px;padding:6px 8px;}
.ghd input.name{flex:1;border:1px solid transparent;background:transparent;font-weight:700;font-size:12.5px;padding:3px 5px;}
.ghd input.name:focus{border-color:var(--k-line);background:var(--k-sunk);}
.gvi{padding:6px 10px 0 30px;font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.gvi+.ghd input.name{font-weight:400;font-size:11.5px;color:var(--k-muted);}
.cnt{font-size:11px;color:var(--k-muted);background:var(--k-soft);border-radius:999px;padding:2px 8px;white-space:nowrap;}
.tog{all:unset;cursor:pointer;color:var(--k-link);font-size:11px;padding:2px 4px;white-space:nowrap;} .tog:hover{text-decoration:underline;}
.chaps{max-height:210px;overflow:auto;padding:4px 9px 8px;display:none;background:var(--k-sunk);} .chaps.open{display:block;}
.c{display:flex;gap:7px;align-items:center;padding:2px 0;font-size:12px;line-height:1.45;}
.c .no{color:var(--k-muted);min-width:26px;text-align:right;font-variant-numeric:tabular-nums;}
.c a{color:var(--k-text);text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;} .c a:hover{text-decoration:underline;}
.c .hintt{color:var(--k-muted);font-style:italic;}
.c .dt{color:var(--k-muted);font-size:11px;margin-left:auto;white-space:nowrap;}
.th{flex:none;width:34px;height:34px;border-radius:5px;object-fit:cover;background:var(--k-sunk);cursor:zoom-in;}
.c .ren{all:unset;cursor:pointer;color:var(--k-muted);font-size:12px;padding:0 2px;flex:none;} .c .ren:hover{color:var(--k-accent);}
.pv{position:fixed;z-index:2147483647;max-width:min(420px,40vw);max-height:80vh;border-radius:10px;border:1px solid var(--k-line);
  background:var(--k-field);box-shadow:0 18px 50px var(--k-shadow);pointer-events:none;}
label.chip{border:1px solid var(--k-line);border-radius:999px;padding:2px 9px;}
.help{white-space:pre-wrap;}
.modal{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:14px;}
.modal .ov{position:absolute;inset:0;background:rgba(0,0,0,.55);}
.dlg{${KIT_FONT}position:relative;width:min(600px,100%);max-height:calc(100vh - 28px);display:flex;flex-direction:column;background:var(--k-win);
  color:var(--k-text);border:1px solid var(--k-edge);border-radius:10px;box-shadow:0 20px 55px var(--k-shadow);overflow:hidden;font-size:12.5px;}
.dlg .hd{display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid var(--k-line);font-weight:700;} .dlg .hd .sp{flex:1;}
.dlg .hd button{all:unset;cursor:pointer;width:22px;height:20px;text-align:center;border:1px solid var(--k-line);border-radius:4px;}
.dlg .bd{display:flex;flex-direction:column;gap:8px;padding:12px;overflow:auto;}
.dlg .bd>input[type=text]{flex:none;}
.ed-list,.ed-pool{display:grid;gap:3px;overflow:auto;align-content:start;border:1px solid var(--k-line);border-radius:6px;padding:5px;flex:none;background:var(--k-field);}
.ed-list{max-height:36vh;} .ed-pool{max-height:20vh;}
.ed-row{display:grid;grid-template-columns:58px 1fr auto auto auto;gap:6px;align-items:center;padding:2px;border-radius:6px;}
.ed-row.add{grid-template-columns:1fr auto;} .ed-row.cur{outline:2px solid var(--k-accent);}
.ed-row input[type=number]{width:58px;}
.ed-row .t{min-width:0;font-size:12px;line-height:1.35;}
.ed-row .t a{color:inherit;text-decoration:none;} .ed-row .t a:hover{text-decoration:underline;}
.ed-row .t small{display:block;color:var(--k-muted);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}`;

  // Bảng + hộp thoại nằm trong tab "Download" của bảng chung (shadow root riêng).
  const panelHost = document.createElement('div');
  panelHost.style.cssText = 'all:initial;display:block;';
  const panelShadow = panelHost.attachShadow({ mode: 'open' });
  const panelStyle = document.createElement('style');
  panelStyle.textContent = CSS;
  panelShadow.appendChild(panelStyle);
  const mount = document.createElement('div');
  panelShadow.appendChild(mount);
  hubTab('ndl', 'Download', 20, VERSION).appendChild(panelHost);
  document.addEventListener('aurel-hub:change', (ev) => { state.open = ev.detail === 'ndl'; });
  document.addEventListener('aurel-hub:help', (ev) => { if (ev.detail === 'ndl' && state.ui) state.ui.help.style.display = state.ui.help.style.display === 'none' ? '' : 'none'; });

  let state = { groups: [], items: [], busy: false, stop: false, open: false, logs: [] };

  const el = (tag, props = {}, kids = []) => {
    const n = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null) n.setAttribute(k, v);
    });
    (Array.isArray(kids) ? kids : [kids]).forEach((k) => k && n.appendChild(k));
    return n;
  };

  // Nút trên cột nút. Vòng tròn = làm ngay: ở trang bài là tải luôn bài đang mở, ở trang
  // khác là mở bảng. Chữ = mở tab Download.
  const PILL_TEXT = 'Download';
  let pill = null, quickTimer = null;
  function setQuick(text, revertMs) {
    if (!pill) return;
    clearTimeout(quickTimer);
    pill.tx.textContent = text;
    pill.pill.classList.toggle('busy', !!state.busy);
    pill.pill.classList.toggle('open', text !== PILL_TEXT);   // đang báo gì đó thì chữ hiện sẵn, khỏi rê chuột
    if (revertMs) quickTimer = setTimeout(() => setQuick(PILL_TEXT), revertMs);
  }

  function renderLauncher() {
    const onPost = SITE.isChapterPage();
    pill = dockPill(dockSlot('ndl', 20), 'ndl', PILL_TEXT,
      () => (onPost ? onDownloadCurrent() : hubShow('ndl')),
      () => hubShow('ndl'));
    pill.ic.title = onPost ? 'Tải ngay bài đang mở (chữ + ảnh) theo định dạng đang chọn' : 'Mở bảng tải truyện';
    pill.tx.title = 'Mở bảng tải truyện: quét mục lục, tải cả bộ, đổi định dạng';
  }

  let logBox, barFill, statusLine;
  function paintLog(entry) {
    if (!logBox) return;
    logBox.appendChild(el('div', { class: entry.cls || '', text: entry.msg }));
    while (logBox.childNodes.length > LOG_MAX) logBox.removeChild(logBox.firstChild);
    logBox.scrollTop = logBox.scrollHeight;
  }
  // Log giữ trong state → thu nhỏ rồi mở lại panel không mất lịch sử
  function log(msg, cls) {
    const entry = { msg, cls };
    state.logs.push(entry);
    while (state.logs.length > LOG_MAX) state.logs.shift();
    paintLog(entry);
  }
  const progress = (p) => { if (barFill) barFill.style.width = Math.max(0, Math.min(100, p)) + '%'; };

  const HELP_TEXT = [
    '1. Mở trang mục lục của blog (…lofter.com/view), cuộn tới cuối để Lofter nạp hết bài, rồi bấm "Quét mục lục".',
    '2. Tick bộ cần tải. "▸ chương" để chọn từng chương, "✎ chỉnh" để đổi thứ tự / thêm bớt chương.',
    '3. Bài ảnh không có tên: rê chuột vào ảnh thu nhỏ để xem, "🏷 lấy tên" để lấy tên từ trang bài, ✎ để tự đặt.',
    '4. "Tag của blog" → Dò tag → tick tag để tách Đơn chương / Bài ảnh theo tag.',
    '5. Chọn định dạng rồi "Bắt đầu tải". Ở trang một bài, vòng tròn trên cột nút tải luôn bài đang mở.',
    'Convert cần TM Translate đang bật trên trang; tên file ghi rõ nội dung còn gốc ([raw_zh]) hay đã convert.',
  ].join('\n');

  // Dựng một lần lúc khởi chạy, vào tab "Download" của bảng chung. Thanh tab và nút
  // thu lại là của bảng chung, nên bảng này không còn tiêu đề riêng.
  function renderPanel() {
    mount.innerHTML = '';
    const bd = el('div', { class: 'kit' });
    mount.appendChild(bd);
    const help = el('div', { class: 'card hint help', style: 'display:none', text: HELP_TEXT });
    bd.appendChild(help);
    const top = el('div', { class: 'card' });
    bd.appendChild(top);

    // --- Hàng nút chính ---
    const btnScan = el('button', { class: 'btn pri', text: 'Quét mục lục', onclick: onScan });
    const pagerN = el('input', { type: 'number', min: '1', max: '500', step: '10', title: 'Số bài quét lùi' });
    pagerN.value = 50;
    const btnPager = el('button', { class: 'btn sec', text: 'Quét phân trang', title: 'Đi từ bài đang mở, lần theo liên kết "bài cũ hơn"', onclick: () => onScanPager(pagerN.value) });
    const btnThis = el('button', { class: 'btn sec', text: 'Tải chương này', onclick: onDownloadCurrent });
    const btnProbe = el('button', { class: 'btn sec', text: 'Dò selector', onclick: onProbe });
    top.appendChild(el('div', { class: 'g2' }, [btnScan, btnPager]));
    // Hàng hai: số bài quét lùi · Dò selector · (ở trang bài) Tải chương này
    const onPost = SITE.isChapterPage();
    btnProbe.className = 'btn pri';
    top.appendChild(el('div', { class: 'g2', style: 'grid-template-columns:' + (onPost ? '46px minmax(0,1fr) minmax(0,1fr)' : '46px minmax(0,1fr)') },
      onPost ? [pagerN, btnProbe, btnThis] : [pagerN, btnProbe]));

    // --- Bộ lọc + danh sách nhóm ---
    const filter = el('input', { type: 'text', placeholder: 'Lọc theo tên bộ / tên chương…' });
    filter.addEventListener('input', () => renderGroups(groupsBox, filter.value.trim()));
    const selAll = el('button', { class: 'btn pri', text: 'Chọn hết', onclick: () => { state.groups.forEach((g) => { g.sel = true; }); renderGroups(groupsBox, filter.value.trim()); } });
    const selNone = el('button', { class: 'btn dan', text: 'Bỏ chọn', onclick: () => { state.groups.forEach((g) => { g.sel = false; }); renderGroups(groupsBox, filter.value.trim()); } });
    filter.classList.add('full');
    top.appendChild(el('div', { class: 'row' }, [filter]));
    top.appendChild(el('div', { class: 'g2' }, [selAll, selNone]));

    const groupsBox = el('div', { class: 'groups' });
    groupsBox.style.marginBottom = '0';
    top.appendChild(groupsBox);
    const tagBox = el('div', { class: 'card' });
    bd.appendChild(tagBox);

    // --- Tuỳ chọn ---
    const fmtWrap = el('div', { class: 'card' }, [el('h4', { text: 'Định dạng xuất' })]);
    const mkCk = (key, label, title) => {
      const inp = el('input', { type: 'checkbox' });
      inp.checked = !!CFG[key];
      inp.addEventListener('change', () => { CFG[key] = inp.checked; saveCfg(); });
      return el('label', { class: 'ck', title: title || '' }, [inp, document.createTextNode(label)]);
    };
    fmtWrap.appendChild(el('div', { class: 'g2' }, [
      mkCk('fmtTxt', 'TXT gộp', 'Mỗi bộ một file .txt'),
      mkCk('fmtEpub', 'EPUB', 'Đọc trên Kindle/Koreader/Apple Books'),
      mkCk('fmtMd', 'Markdown gộp', 'Mỗi bộ một file .md: mỗi chương một đề mục, ảnh là liên kết'),
      mkCk('fmtImgZip', 'ZIP ảnh riêng', 'Một file .zip chỉ chứa ảnh, xếp theo từng chương, kèm mục lục ảnh'),
    ]));
    fmtWrap.appendChild(el('div', { class: 'row' }, [mkCk('fmtZip', 'ZIP (mỗi chương 1 file)')]));
    fmtWrap.appendChild(el('div', { class: 'row' }, [mkCk('withImages', 'Tải ảnh trong chương', 'Tắt thì ảnh chỉ còn là dòng ［Ảnh］ kèm URL')]));
    fmtWrap.appendChild(el('div', { class: 'row' }, [mkCk('withComments', 'Kèm bình luận', 'Thêm bình luận của mỗi bài vào cuối chương (tối đa 1000 cái mỗi bài). Mỗi bài tốn thêm vài giây')]));
    fmtWrap.appendChild(el('div', { class: 'row' }, [mkCk('embedImages', 'Nhúng ảnh vào EPUB/ZIP', 'Tắt thì sách nhẹ hẳn — ảnh chỉ nằm trong ZIP ảnh riêng')]));
    bd.appendChild(fmtWrap);

    const optWrap = el('div', { class: 'card' }, [el('h4', { text: 'Setting' })]);
    const sortSel = el('select');
    [['auto', 'Tự động (số chương → ngày)'], ['number', 'Theo số chương'], ['date', 'Theo ngày (cũ → mới)'],
     ['dateDesc', 'Theo ngày (mới → cũ)'], ['dom', 'Giữ thứ tự trang']].forEach(([v, t]) => {
      const o = el('option', { value: v, text: t }); if (CFG.sort === v) o.selected = true; sortSel.appendChild(o);
    });
    sortSel.addEventListener('change', () => {
      CFG.sort = sortSel.value; saveCfg();
      state.groups.forEach((g) => { if (!g.manual) g.items = sortChapters(g.items, CFG.sort); });
      renderGroups(groupsBox, filter.value.trim());
    });
    const delayInp = el('input', { type: 'number', min: '200', max: '10000', step: '100', style: 'width:64px' });
    delayInp.value = CFG.delay;
    delayInp.addEventListener('change', () => { CFG.delay = Math.max(200, +delayInp.value || 900); saveCfg(); });
    const delayReset = el('button', {
      class: 'btn sec', style: 'padding:7px 9px', text: '↺', title: 'Đặt lại nhịp về mặc định (' + DEFAULTS.delay + 'ms)',
      onclick: () => { CFG.delay = DEFAULTS.delay; saveCfg(); delayInp.value = CFG.delay; },
    });
    sortSel.classList.add('full');
    optWrap.appendChild(el('span', { class: 'lb', text: 'Thứ tự:' }));
    optWrap.appendChild(el('div', { class: 'row' }, [sortSel]));
    optWrap.appendChild(el('div', { class: 'kv' }, [el('span', { text: 'Nghỉ giữa 2 chương (ms):' }), delayInp, delayReset]));
    optWrap.appendChild(el('div', { class: 'row' }, [mkCk('mergeOneshots', 'Gộp one-shot thành 1 nhóm')]));
    optWrap.appendChild(el('div', { class: 'row' }, [mkCk('txtBom', 'BOM UTF-8 (Notepad Windows)')]));
    const concInp = el('input', { type: 'number', min: '1', max: '6', step: '1', style: 'width:60px' });
    concInp.value = CFG.imgConc;
    concInp.addEventListener('change', () => { CFG.imgConc = Math.max(1, Math.min(6, +concInp.value || 3)); saveCfg(); });
    const imgTxtSel = el('select');
    [['url', 'Ảnh trong TXT: ghi URL'], ['name', 'Ảnh trong TXT: ghi tên file'], ['skip', 'Ảnh trong TXT: bỏ qua']]
      .forEach(([v, t]) => { const o = el('option', { value: v, text: t }); if (CFG.imgInTxt === v) o.selected = true; imgTxtSel.appendChild(o); });
    imgTxtSel.addEventListener('change', () => { CFG.imgInTxt = imgTxtSel.value; saveCfg(); });
    imgTxtSel.classList.add('full');
    optWrap.appendChild(el('div', { class: 'kv' }, [el('span', { text: 'Ảnh tải song song:' }), concInp]));
    optWrap.appendChild(el('div', { class: 'row' }, [imgTxtSel]));
    optWrap.appendChild(el('div', { class: 'row' }, [
      mkCk('useFrame', 'Dựng bằng iframe khi HTML rỗng',
        'Theme Lofter đời mới dựng nội dung bằng JS. Chậm hơn nhiều, chỉ dùng khi fetch hụt.'),
    ]));
    bd.appendChild(optWrap);

    const tmWrap = el('div', { class: 'card' }, [el('h4', { text: 'Convert (TM Translate)' })]);
    const tmSel = el('select');
    [['off', 'Không convert — giữ nguyên tiếng Trung'],
     ['name', 'Chỉ tên: tên file + tiêu đề chương'],
     ['full', 'Cả nội dung: xuất bản đã convert']].forEach(([v, t]) => {
      const o = el('option', { value: v, text: t }); if (CFG.tmMode === v) o.selected = true; tmSel.appendChild(o);
    });
    tmSel.addEventListener('change', () => { CFG.tmMode = tmSel.value; saveCfg(); });
    tmSel.classList.add('full');
    tmWrap.appendChild(el('div', { class: 'row' }, [tmSel]));
    tmWrap.appendChild(el('div', { class: 'row' }, [
      el('button', { class: 'btn sec', text: 'Kiểm tra', title: 'Hỏi thử TM Translate có đang trả lời không', onclick: onTmCheck }),
    ]));
    tmWrap.appendChild(el('div', { class: 'row' }, [
      mkCk('tmKeepRaw', 'Kèm bản gốc (khi convert cả nội dung)', 'Xuất thêm file tiếng Trung, tên "<tên đã convert> [gốc]"'),
    ]));
    bd.appendChild(tmWrap);

    // --- Tiến độ ---
    const run = el('div', { class: 'card' });
    bd.appendChild(run);
    const btnGo = el('button', { class: 'btn pri', text: 'Bắt đầu tải', onclick: onStart });
    const btnStop = el('button', { class: 'btn dan', text: '■ Dừng', onclick: () => { state.stop = true; log('⏹ Đang dừng…'); } });
    run.appendChild(el('div', { class: 'g2' }, [btnGo, btnStop]));
    barFill = el('i');
    run.appendChild(el('div', { class: 'bar', style: 'margin-bottom:8px' }, [barFill]));
    run.appendChild(el('span', { class: 'lb', text: 'Console' }));
    logBox = el('div', { class: 'console' });
    run.appendChild(logBox);
    state.logs.forEach(paintLog);
    statusLine = el('div', { class: 'hint', text: '' });
    run.appendChild(statusLine);

    state.ui = { groupsBox, filter, btnGo, btnScan, tagBox, help };
    renderLists();
    translateShown();
    if (!state.groups.length && !state.logs.length) {
      log('Mở trang mục lục (…lofter.com/view) rồi bấm "Quét mục lục".');
      log('Ở trang một bài viết, có thể bấm "Tải chương này" hoặc "Quét theo phân trang".');
    }
  }

  // Tên đã convert (TM Translate) cho mọi thứ đang hiện: tên bộ, tên bài, tag.
  // Chỉ để ĐỌC — tên xuất file vẫn do mục "Convert (TM Translate)" quyết định.
  const viOf = (t) => viTitles.get(clean(String(t || '').replace(/\s*\n\s*/g, ' '))) || '';
  const isGeneric = (g) => !!g.oneshot || !!g.photo || g.key === NO_TITLE_KEY;
  // Tên đã convert của một nhóm. Nhóm gộp: thay tên blog và #tag trong nhãn.
  function viName(g) {
    if (!isGeneric(g)) return viOf(g.name);
    const blog = SITE.bookTitle();
    let out = g.name;
    if (viOf(blog)) out = out.split(blog).join(viOf(blog));
    return out.replace(/#(.+)$/, (m, tag) => '#' + (viOf(tag) || tag));
  }
  let viBusy = false;
  async function translateShown() {
    if (viBusy || !state.groups.length) return;
    viBusy = true;
    try {
      // Nhãn do script tự đặt ("Đơn chương — …", "[Ảnh] 2025-07-01") là tiếng Việt sẵn,
      // không đưa qua máy dịch; chỉ dịch tên blog và tag nằm trong đó (xem viName).
      const names = [SITE.bookTitle()];
      state.groups.forEach((g) => {
        if (!isGeneric(g)) names.push(g.name);
        g.items.forEach((i) => { if (i.title || i.hint) names.push(labelOf(i)); });
      });
      Object.keys(tagsLoad().counts).forEach((n) => names.push(n));
      const before = viTitles.size;
      const msg = await translateTitles(names);
      if (msg && !state.viNoted) { state.viNoted = true; log('ℹ️ ' + msg); }
      if (viTitles.size !== before) renderLists();
    } finally { viBusy = false; }
  }
  function renderLists() {
    if (!state.ui) return;
    renderGroups(state.ui.groupsBox, state.ui.filter.value.trim());
    renderTags(state.ui.tagBox);
  }

  // Mục "Tag của blog": dò tag, rồi tick tag nào thì nhóm gộp tách riêng theo tag đó.
  function renderTags(box) {
    if (!box) return;
    box.innerHTML = '';
    const t = tagsLoad();
    const chips = tagChips();
    const names = Object.keys(t.counts).sort((a, b) => (t.counts[b] || 0) - (t.counts[a] || 0));
    if (!chips.length && !names.length) { box.style.display = 'none'; return; }
    box.style.display = '';
    box.appendChild(el('h4', { text: 'Tag của blog' }));
    const row = el('div', { class: 'row' }, [
      chips.length ? el('button', {
        class: 'btn sec sm', text: names.length ? '🏷 Dò lại tag' : `🏷 Dò tag (${chips.length})`, onclick: onScanTags,
        title: 'Cho trang lọc lần lượt qua từng tag để biết bài nào mang tag nào. Trang tự trả về danh sách đầy đủ khi xong.',
      }) : null,
      el('span', { class: 'hint', text: names.length
        ? 'Tick tag → Đơn chương / Bài ảnh mang tag đó tách thành nhóm riêng.'
        : 'Mục lục không ghi tag trên từng bài — phải dò một lần (nhớ theo blog).' }),
    ]);
    box.appendChild(row);
    if (!names.length) return;
    const wrap = el('div', { class: 'row' });
    names.forEach((n) => {
      const inp = el('input', { type: 'checkbox' });
      inp.checked = t.split.includes(n);
      inp.addEventListener('change', () => {
        const cur = tagsLoad();
        cur.split = cur.split.filter((x) => x !== n);
        if (inp.checked) cur.split.push(n);
        tagsSave(cur);
        regroup('');
      });
      wrap.appendChild(el('label', { class: 'ck chip', title: n }, [inp, document.createTextNode(`${viOf(n) || n} (${t.counts[n] || 0})`)]));
    });
    box.appendChild(wrap);
  }

  // Ảnh thu nhỏ lấy từ mục lục; rê chuột vào thì hiện bản to bên trái bảng.
  let pvImg = null;
  function thumbEl(it) {
    if (!it.thumb) return null;
    const im = el('img', { class: 'th', src: it.thumb, loading: 'lazy', alt: '' });
    im.addEventListener('mouseenter', () => {
      if (pvImg) pvImg.remove();
      pvImg = el('img', { class: 'pv', src: bigThumb(it.thumb), alt: '' });
      const r = im.getBoundingClientRect();
      pvImg.style.right = Math.round(window.innerWidth - r.left + 12) + 'px';
      pvImg.style.top = Math.max(8, Math.min(window.innerHeight * 0.2, r.top - 120)) + 'px';
      panelShadow.appendChild(pvImg);
    });
    im.addEventListener('mouseleave', () => { if (pvImg) { pvImg.remove(); pvImg = null; } });
    return im;
  }

  function renameItem(it) {
    const cur = it.given || it.title || it.hint || '';
    const v = prompt('Tên cho bài này (để trống = bỏ tên đã đặt).\nĐặt kiểu "Tên bộ 1", "Tên bộ 2" thì các bài tự gom thành một bộ.', cur);
    if (v === null) return;
    const t = titlesLoad();
    const name = clean(v);
    if (name && name !== it.rawTitle) t.given[it.key] = name; else delete t.given[it.key];
    if (!titlesSave(t)) return log('❌ Không ghi được tên vào bộ nhớ của trang (localStorage đầy hoặc bị chặn).', 'err');
    regroup('');
  }

  // Lấy tên cho các bài chưa có tên trong một nhóm, bằng cách tải chính bài đó.
  async function onFetchNames(g) {
    if (state.busy) return;
    const need = g.items.filter((i) => !i.title && !i.hint);
    if (!need.length) return;
    state.busy = true; state.stop = false;
    log(`🏷 Lấy tên ${need.length} bài của «${g.name}» · nghỉ ${CFG.delay}ms giữa hai bài (⏹ Dừng để ngừng).`);
    const t = titlesLoad();
    let ok = 0;
    for (let i = 0; i < need.length && !state.stop; i++) {
      const it = need[i];
      const cached = !!it._pre;
      try {
        const ch = await fetchChapter(it, log);
        it._pre = ch;
        const own = ch.ownTitle === '(không tiêu đề)' ? '' : (ch.ownTitle || '');
        const firstLine = (ch.blocks.find((b) => b.type === 'p') || {}).text || '';
        const name = clean(own || firstLine).slice(0, 60) || (ch.tags || []).slice(0, 3).join(' · ');
        if (name) { t.hint[it.key] = name; it.hint = name; ok++; }
        log(`  🏷 ${pad(i + 1)}/${pad(need.length)} ${name || '(bài không có chữ nào để đặt tên)'} · ${ch.imgCount} ảnh`);
      } catch (e) {
        log(`  ✗ ${pad(i + 1)}/${pad(need.length)} ${e.message}`, 'err');
        if (e.message === RATE_ERR) break;
      }
      progress(((i + 1) / need.length) * 100);
      if (!cached && i < need.length - 1) await sleep(CFG.delay);
    }
    titlesSave(t);
    state.busy = false;
    log(`🏷 Xong: ${ok}/${need.length} bài có tên.`, ok ? 'ok' : 'err');
    renderLists();
    translateShown();
  }

  function renderGroups(box, q) {
    box.innerHTML = '';
    if (!state.groups.length) {
      box.appendChild(el('div', { class: 'hint', style: 'padding:12px', text: 'Chưa có dữ liệu — bấm "Quét mục lục".' }));
      return;
    }
    const ql = (q || '').toLowerCase();
    let shown = 0;
    state.groups.forEach((g) => {
      const hit = (t) => t.toLowerCase().includes(ql) || viOf(t).toLowerCase().includes(ql);
      const match = !ql || hit(g.name) || viName(g).toLowerCase().includes(ql) || g.items.some((i) => hit(labelOf(i)));
      if (!match) return;
      shown++;
      const cb = el('input', { type: 'checkbox' });
      cb.checked = !!g.sel;
      cb.addEventListener('change', () => { g.sel = cb.checked; });
      const nameInp = el('input', { class: 'name', type: 'text', value: g.name });
      nameInp.addEventListener('change', () => { g.name = nameInp.value.trim() || g.name; });
      const chaps = el('div', { class: 'chaps' });
      const tog = el('button', { class: 'tog', text: '▸ chương', onclick: () => {
        chaps.classList.toggle('open');
        tog.textContent = chaps.classList.contains('open') ? '▾ chương' : '▸ chương';
      } });
      g.items.forEach((it, i) => {
        const icb = el('input', { type: 'checkbox' });
        icb.checked = it.sel !== false;
        icb.addEventListener('change', () => { it.sel = icb.checked; });
        chaps.appendChild(el('div', { class: 'c' }, [
          icb,
          el('span', { class: 'no', text: pad(i + 1) }),
          thumbEl(it),
          el('a', { href: it.url, target: '_blank', title: labelOf(it) + ((it.tags || []).length ? '\n#' + it.tags.join(' #') : '') + '\n(bấm để mở bài ở tab mới)',
            class: it.title ? '' : 'hintt', text: viOf(labelOf(it)) || labelOf(it) }),
          el('button', { class: 'ren', text: '✎', title: 'Đặt tên cho bài này (nhớ theo blog). Để trống = bỏ tên đã đặt.', onclick: () => renameItem(it) }),
          el('span', {
            class: 'dt',
            title: it.chapNo === null
              ? (it.chapFake ? 'Số cuối tiêu đề trông như mã CP/tag chứ không phải số chương → xếp theo ngày'
                             : 'Không nhận ra số chương → xếp theo ngày')
              : (it.chapNo === 0 ? 'Nhận ra: phần mở đầu (序)' : 'Số chương nhận ra: ' + it.chapNo),
            text: (it.chapNo === null ? '' : (it.chapNo === 0 ? '序 · ' : '#' + it.chapNo + ' · '))
              + (it.dateText || (it.date ? it.date.toLocaleDateString('vi-VN') : '')),
          }),
        ]));
      });
      const gvi = viName(g);
      box.appendChild(el('div', { class: 'g' }, [
        gvi && gvi !== g.name ? el('div', { class: 'gvi', title: 'Tên đã convert — chỉ để đọc; ô bên dưới là tên gốc dùng khi xuất', text: gvi }) : null,
        el('div', { class: 'ghd' }, [
          cb, nameInp,
          el('span', { class: 'cnt', text: g.items.length + ' ch.' + (g.manual ? ' · chỉnh tay' : '') }),
          g.items.some((i) => !i.title && !i.hint)
            ? el('button', { class: 'tog', text: '🏷 lấy tên', title: 'Mở từng bài chưa có tên để lấy tên từ trang bài. Mỗi bài một lượt gọi Lofter (theo nhịp nghỉ); bài đã mở được giữ lại nên lúc tải không phải gọi lần nữa.', onclick: () => onFetchNames(g) })
            : null,
          el('button', { class: 'tog', text: '✎ chỉnh', title: 'Đổi thứ tự, bỏ / thêm chương, đổi tên bộ — nhớ theo blog', onclick: () => openSeriesEditor(g) }),
          tog,
        ]),
        chaps,
      ]));
    });
    if (!shown) box.appendChild(el('div', { class: 'hint', style: 'padding:12px', text: 'Không có bộ nào khớp bộ lọc.' }));
  }

  /* --------------------------------------------------------------------------
   * 9b. BẢNG "CHỈNH BỘ"
   * Tên bài hiện bằng bản dịch của TM Translate (cùng name-set dùng để convert);
   * không có TM Translate thì vẫn chỉnh được, chỉ là hiện tên gốc.
   * ------------------------------------------------------------------------ */
  const viTitles = new Map();   // tên gốc → tên đã dịch, nhớ trong lúc trang còn mở

  async function translateTitles(titles) {
    const need = Array.from(new Set(titles.map((t) => clean(String(t || '').replace(/\s*\n\s*/g, ' ')))
      .filter((t) => t && !viTitles.has(t))));
    if (!need.length) return '';
    if (!(await tmBridgePing(1200))) return 'Không thấy TM Translate đang bật ở trang này — hiện tên gốc.';
    try {
      const out = await tmTranslateLines(need, false);
      need.forEach((t, i) => viTitles.set(t, out[i]));
      return '';
    } catch (e) { return 'Dịch tên lỗi (' + e.message + ') — hiện tên gốc.'; }
  }

  // Dựng lại danh sách bộ sau khi bản chỉnh tay đổi, giữ nguyên các bộ đang được chọn.
  function regroup(selectManualId) {
    const sel = new Set(state.groups.filter((g) => g.sel).map((g) => g.key));
    state.groups = groupChapters(state.items);
    state.groups.forEach((g) => { g.sel = sel.has(g.key) || (!!selectManualId && g.manualId === selectManualId); });
    renderLists();
    translateShown();
  }

  function openSeriesEditor(group) {
    const here = SITE.isChapterPage() ? postKey(location.href) : '';
    const list = group.items.slice();
    const pool = state.items.filter((i) => !list.includes(i));
    let note = '';
    const vi = (t) => viTitles.get(clean(t)) || '';

    const nameInp = el('input', { type: 'text', value: group.name, placeholder: 'Tên bộ' });
    const nameVi = el('div', { class: 'hint' });
    const listBox = el('div', { class: 'ed-list' });
    const countLine = el('div', { class: 'hint' });
    const filterInp = el('input', { type: 'text', placeholder: 'Lọc theo tên (gốc hoặc đã dịch)…' });
    const poolBox = el('div', { class: 'ed-pool' });
    const poolNote = el('div', { class: 'hint' });
    const noteLine = el('div', { class: 'hint err' });
    nameInp.addEventListener('input', () => { nameVi.textContent = ''; });

    const titleCell = (it) => el('div', { class: 't' }, [
      el('a', { href: it.url, target: '_blank', rel: 'noopener', title: 'Mở bài này ở tab mới', text: vi(it.title) || labelOf(it) }),
      vi(it.title) ? el('small', { text: it.title }) : null,
    ]);
    const moveTo = (from, to) => {
      if (to < 0 || to >= list.length || to === from) return;
      list.splice(to, 0, list.splice(from, 1)[0]);
      render();
    };

    function render() {
      noteLine.textContent = note;
      nameVi.textContent = vi(nameInp.value) ? 'Dịch: ' + vi(nameInp.value) : '';
      countLine.textContent = list.length + ' chương';
      listBox.textContent = '';
      list.forEach((it, i) => {
        const pos = el('input', { type: 'number', min: '1', max: String(list.length), value: String(i + 1), title: 'Gõ số thứ tự mới rồi Enter' });
        pos.addEventListener('change', () => moveTo(i, Math.min(list.length, Math.max(1, parseInt(pos.value, 10) || (i + 1))) - 1));
        listBox.appendChild(el('div', { class: 'ed-row' + (it.key === here ? ' cur' : '') }, [
          pos, titleCell(it),
          el('button', { class: 'btn sec sm', text: '↑', title: 'Lên một bậc', onclick: () => moveTo(i, i - 1) }),
          el('button', { class: 'btn sec sm', text: '↓', title: 'Xuống một bậc', onclick: () => moveTo(i, i + 1) }),
          el('button', { class: 'btn dan sm', text: '✕', title: 'Bỏ khỏi bộ (bài vẫn còn trên blog)', onclick: () => { list.splice(i, 1); pool.unshift(it); render(); } }),
        ]));
      });
      if (!list.length) listBox.appendChild(el('div', { class: 'hint', text: 'Bộ đang trống — thêm bài từ danh sách bên dưới.' }));

      const q = filterInp.value.trim().toLowerCase();
      const hits = pool.filter((it) => !q || (it.title || '').toLowerCase().includes(q) || vi(it.title).toLowerCase().includes(q));
      poolBox.textContent = '';
      hits.slice(0, 60).forEach((it) => {
        poolBox.appendChild(el('div', { class: 'ed-row add' }, [
          titleCell(it),
          el('button', { class: 'btn sec sm', text: '+ Thêm', onclick: () => { pool.splice(pool.indexOf(it), 1); list.push(it); render(); } }),
        ]));
      });
      poolNote.textContent = hits.length > 60 ? `Đang hiện 60/${hits.length} bài — gõ thêm chữ để lọc.` : (hits.length ? '' : 'Không có bài nào khớp.');
    }
    filterInp.addEventListener('input', render);

    const close = () => wrap.remove();
    const save = () => {
      const order = list.map((i) => i.key);
      if (!order.length) { note = 'Bộ đang trống. Muốn bỏ bản chỉnh tay thì bấm "Về tự động".'; render(); return; }
      const name = nameInp.value.trim() || group.name;
      const base = baseGroupOf(groupChaptersAuto(state.items), order);
      const excluded = base ? base.items.map((i) => i.key).filter((k) => !order.includes(k)) : [];
      // Một bài chỉ nằm trong một bộ chỉnh tay
      let all = manualLoad().filter((m) => m.id !== group.manualId);
      all.forEach((m) => { m.order = m.order.filter((k) => !order.includes(k)); });
      all = all.filter((m) => m.order.length);
      const id = group.manualId || ('m' + Date.now().toString(36));
      all.push({ id, name, order, excluded });
      if (!manualSave(all)) { note = 'Không ghi được vào bộ nhớ của trang (localStorage đầy hoặc bị chặn).'; render(); return; }
      close();
      regroup(id);
      log(`✎ Đã lưu bộ «${name}» · ${order.length} chương (chỉnh tay).`, 'ok');
    };
    const reset = () => {
      if (group.manualId) {
        manualSave(manualLoad().filter((m) => m.id !== group.manualId));
        regroup('');
        log('✎ Đã bỏ bản chỉnh tay — dùng lại kết quả tự dò.');
      }
      close();
    };

    const wrap = el('div', { class: 'modal' }, [
      el('div', { class: 'ov', onclick: close }),
      el('div', { class: 'dlg' }, [
        el('div', { class: 'hd' }, [
          el('b', { text: '✎ Chỉnh bộ' }), el('span', { class: 'sp' }),
          el('button', { title: 'Đóng', text: '✕', onclick: close }),
        ]),
        el('div', { class: 'bd' }, [
          el('div', { class: 'lb', text: 'Tên bộ' }), nameInp, nameVi,
          el('div', { class: 'lb', text: 'Thứ tự chương — gõ số để chuyển chỗ, ↑ ↓ để nhích, ✕ để bỏ khỏi bộ' }),
          listBox, countLine,
          el('div', { class: 'lb', text: 'Thêm bài khác vào bộ' }), filterInp, poolBox, poolNote,
          noteLine,
          el('div', { class: 'row' }, [
            el('button', { class: 'btn pri', text: 'Lưu', onclick: save }),
            el('button', { class: 'btn dan sm', text: 'Về tự động', title: 'Xoá bản chỉnh tay của bộ này, quay về kết quả tự dò', onclick: reset }),
            el('button', { class: 'btn sec sm', text: 'Hủy', onclick: close }),
          ]),
        ]),
      ]),
    ]);
    mount.appendChild(wrap);
    render();

    // Dịch tên các chương của bộ trước (cần ngay), phần còn lại dịch sau.
    translateTitles([group.name, ...list.map((i) => i.title)])
      .then((msg) => { note = msg; render(); return msg ? msg : translateTitles(pool.map((i) => i.title)); })
      .then((msg) => { if (msg) note = msg; render(); });
  }

  /* ==========================================================================
   * 10. HÀNH ĐỘNG
   * ======================================================================== */

  function onScan() {
    const items = scanTOC(document);
    if (!items.length) {
      log('❌ Không thấy bài nào trong trang này. Hãy mở trang mục lục: ' + location.origin + '/view', 'err');
      return;
    }
    state.items = items;
    state.groups = groupChapters(items);
    state.groups.forEach((g) => { g.sel = false; });
    if (state.groups.length) state.groups[0].sel = true;
    log(`✅ Tìm thấy ${items.length} bài → ${state.groups.length} bộ.`, 'ok');
    log('   ' + state.groups.slice(0, 6).map((g) => `${g.name}(${g.items.length})`).join(', ') + (state.groups.length > 6 ? '…' : ''));
    renderLists();
    translateShown();
  }

  async function onScanPager(count) {
    if (state.busy) return;
    const n = parseInt(count, 10);
    if (!n || n < 1) return log('⚠️ Nhập số bài cần quét vào ô bên cạnh nút.', 'err');
    state.busy = true; state.stop = false;
    try {
      const items = await scanByPager(Math.min(n, 500), (m) => log(m));
      state.items = items;
      state.groups = groupChapters(items);
      state.groups.forEach((g) => { g.sel = true; });
      log(`✅ Quét được ${items.length} bài → ${state.groups.length} bộ.`, 'ok');
      renderLists();
      translateShown();
    } catch (e) { log('❌ ' + e.message, 'err'); }
    state.busy = false;
  }

  function report(tag, ch) {
    log(`🔧 ${tag} Selector khớp: ${ch.matchedSelector || '(không có!)'}`);
    log(`🔧 ${tag} Số đoạn: ${ch.blocks.filter((b) => b.type === 'p').length} · ký tự: ${ch.textLen} · ảnh: ${ch.imgCount}`
      + (ch.imgCount !== ch.imgInRoot ? ` (khối selector chỉ có ${ch.imgInRoot}, phần còn lại nằm ngoài)` : ''));
    const p = ch.blocks.find((b) => b.type === 'p');
    log(`🔧 ${tag} Đoạn đầu: ` + (p ? p.text.slice(0, 120) : '(trống)'));
  }

  // Khi cả selector lẫn guessRoot đều trượt: HTML thô thật sự có gì trong đó?
  function deepProbe(html, doc, tag) {
    const t = tag ? tag + ' ' : '';
    log(`🔎 ${t}HTML: ${html.length} ký tự`);
    const rows = [];
    Array.prototype.forEach.call(doc.querySelectorAll('div, article, section, td, main, p'), (el) => {
      const n = textLen(el);
      if (n > 50) rows.push([n, el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : '') + (el.id ? '#' + el.id : '')]);
    });
    rows.sort((a, b) => b[0] - a[0]);
    if (!rows.length) {
      log(`🔎 ${t}Không khối nào quá 50 ký tự → nội dung KHÔNG nằm ở đây.`, 'err');
    } else {
      log(`🔎 ${t}${rows.length} khối có chữ. Sáu khối nhiều chữ nhất:`);
      rows.slice(0, 6).forEach(([n, sel]) => log(`     ${n}  ${sel.slice(0, 64)}`));
    }
    const scripts = Array.prototype.slice.call(doc.querySelectorAll('script'));
    const big = scripts.map((x) => [(x.textContent || '').length, x]).sort((a, b) => b[0] - a[0])[0];
    const frames = Array.prototype.slice.call(doc.querySelectorAll('iframe'));
    log(`🔎 ${t}${scripts.length} thẻ <script>, dài nhất ${big ? big[0] : 0} ký tự · ${frames.length} iframe`);
    // Theme tự chế của Lofter đôi khi nhét nội dung vào iframe con — src của
    // chúng cho biết nội dung thật sự được nạp từ đâu.
    frames.slice(0, 5).forEach((f) => {
      const src = f.getAttribute('src') || f.getAttribute('data-src') || '(không có src)';
      log(`     iframe: ${src.slice(0, 78)}`);
    });
  }

  async function onProbe() {
    try {
      let doc = document, url = location.href, html = '';
      if (!SITE.isChapterPage()) {
        const items = state.items.length ? state.items : scanTOC();
        // items[0] trên blog nhiều tranh là một BÀI ẢNH (li.img). Bài ảnh vốn
        // không có chữ, nên dò trên nó luôn ra "0 ký tự" và đổ oan cho selector.
        // Lofter gắn sẵn loại bài vào class của <li>, cứ thế mà chọn bài chữ.
        const first = items.find((i) => /text/i.test(i.kind || '')) || items[0];
        if (!first) return log('❌ Chưa có bài nào để thử.', 'err');
        url = first.url;
        log(`🔧 Thử trên: ${url}${first.kind ? '   [loại bài: ' + first.kind + ']' : ''}`);
        html = await requestRetry(url, {}, 1, log);
        doc = new DOMParser().parseFromString(html, 'text/html');
      }
      const ch = extractChapter(doc, url);
      log(`🔧 Tiêu đề: ${ch.title}`);
      report('', ch);
      if (ch.textLen || ch.imgCount) return;

      if (html) deepProbe(html, doc);
      log('🔧 Thử dựng bằng iframe (chờ tối đa 25s cho JS chạy)…');
      try {
        const r = await renderInFrame(url, { ready: settledReady(url) });
        const fch = extractChapter(r.doc, url);
        report('[iframe]', fch);
        if (fch.textLen || fch.imgCount) {
          log('✅ iframe lấy được nội dung — bật "Dựng bằng iframe" là chạy được.', 'ok');
        } else {
          // Soi luôn DOM sau khi JS chạy: so với HTML thô sẽ biết JS có dựng
          // thêm gì không, và nội dung có nằm trong iframe con nào không.
          deepProbe(r.html, r.doc, '[iframe]');
          log('⚠️ iframe cũng không thấy nội dung chương.', 'err');
        }
      } catch (e) { log('🔧 [iframe] ' + e.message, 'err'); }
    } catch (e) { log('❌ ' + e.message, 'err'); }
  }

  async function onDownloadCurrent() {
    if (state.busy) return;
    state.busy = true; state.stop = false;
    setQuick('⏳ Đang tải…');
    let ok = false;
    try {
      let ch = extractChapter(document, location.href);
      // Trang đang mở chưa dựng xong (theme dựng bằng JS, ảnh gắn muộn) → đợi một nhịp
      // rồi đọc lại, lấy lần nào được nhiều hơn.
      if (!ch.textLen && !ch.imgCount) { await sleep(1500); ch = extractChapter(document, location.href); }
      if (!ch.textLen && !ch.imgCount) throw new Error('không trích được nội dung bài này — mở bảng, bấm "🔧 Dò selector" để xem trang trả về gì');
      log(`⬇ ${ch.title} (${ch.textLen} ký tự, ${ch.imgCount} ảnh)`);
      let imgStore = new Map();
      const wantImg = (CFG.withImages || CFG.fmtImgZip) && ch.imgCount > 0;
      if (wantImg) {
        const onLog = (m, cls) => {
          log(m, cls);
          const hit = /Ảnh (\d+\/\d+)/.exec(m);
          if (hit) setQuick('⏳ Ảnh ' + hit[1]);
        };
        imgStore = await downloadImages([ch], onLog, () => state.stop);
      }
      setQuick('⏳ Đang đóng gói…');
      const g = { name: ch.title };
      await exportGroup(g, [ch], imgStore);
      const lost = wantImg ? ch.imgCount - imgStore.size : 0;
      ok = lost <= 0;
      log(ok ? '✅ Xong.' : `⚠️ Xong, nhưng thiếu ${lost}/${ch.imgCount} ảnh.`, ok ? 'ok' : 'err');
      state.busy = false;
      setQuick(ok ? '✓ Đã tải' : `⚠ Thiếu ${lost} ảnh`, ok ? 4000 : 0);
    } catch (e) {
      log('❌ ' + e.message, 'err');
      state.busy = false;
      setQuick('✗ Lỗi');
    }
    state.busy = false;
    // Có trục trặc mà bảng đang đóng thì mở ra — log nằm trong đó.
    if (!ok && !state.open) hubShow('ndl');
  }

  async function onStart() {
    if (state.busy) return;
    const groups = state.groups.filter((g) => g.sel);
    if (!groups.length) return log('⚠️ Chưa chọn bộ nào.', 'err');
    if (!CFG.fmtTxt && !CFG.fmtMd && !CFG.fmtEpub && !CFG.fmtZip) return log('⚠️ Chưa chọn định dạng xuất.', 'err');

    state.busy = true; state.stop = false;
    state.ui.btnGo.disabled = true;
    const t0 = Date.now();
    try {
      const total = groups.reduce((n, g) => n + g.items.filter((i) => i.sel !== false).length, 0);
      let done = 0, failed = 0, rateHits = 0;
      log(`▶ Bắt đầu: ${groups.length} bộ · ${total} chương · nghỉ ${CFG.delay}ms.`);

      for (const g of groups) {
        if (state.stop) break;
        const picks = g.items.filter((i) => i.sel !== false);
        log(`\n📖 ${g.name} — ${picks.length} chương`);
        const cachedN = picks.filter((it) => it._pre).length;
        if (cachedN) {
          log(`  ${cachedN} chương đã có sẵn trong bộ nhớ — chỉ tải ${picks.length - cachedN} chương còn thiếu.`);
        }
        let got = 0;

        const grab = async (it) => {
          const cached = !!it._pre;
          try {
            const ch = await fetchChapter(it, log);
            ch.chapNo = it.chapNo;
            // Nhớ lại chương đã tải được. Chạy lại lần sau, fetchChapter trả
            // ngay từ cache và chỉ những chương còn thiếu mới gọi mạng.
            it._pre = ch;
            got++;
            const note = cached ? 'từ bộ nhớ'
              : `${ch.textLen} ký tự${ch.imgCount ? ', ' + ch.imgCount + ' ảnh' : ''}`;
            log(`  ✓ ${pad(got)} ${ch.title.slice(0, 46)} (${note})`);
            return true;
          } catch (e) {
            log(`  ✗ Lỗi: ${labelOf(it).slice(0, 40)} — ${e.message}`, 'err');
            // CHỈ nới nhịp khi chắc chắn bị chặn tốc độ — dấu hiệu là finalUrl
            // trỏ sang trang rate-limiting. "Trang rỗng" có nhiều nguyên nhân
            // khác (theme khác, chưa đăng nhập); nới nhịp vì nó thì vô ích, mà
            // còn đẩy nhịp lên kịch trần và chặn luôn đường rút về mặc định.
            if (e.message === RATE_ERR) {
              rateHits++;
              const old = CFG.delay;
              CFG.delay = Math.min(12000, Math.round(CFG.delay * 1.5));
              if (CFG.delay !== old) {
                saveCfg();
                log(`  ⏱ Nới nhịp ${old} → ${CFG.delay}ms để đỡ bị chặn.`, 'err');
              }
            }
            return false;
          }
        };

        const attempted = new Set();
        let streak = 0, aborted = false;
        for (const it of picks) {
          if (state.stop) break;
          const cached = !!it._pre;
          attempted.add(it);
          const ok = await grab(it);
          streak = ok ? 0 : streak + 1;
          done++;
          progress((done / total) * 90);
          // Hỏng liên tiếp ngay từ đầu không phải là bị chặn tốc độ — chặn tốc
          // độ luôn cho qua vài chục chương trước. Đây là hỏng có cấu trúc, và
          // cày tiếp 100 chương nữa chỉ tốn 20 phút để hỏng y hệt.
          if (streak >= 3 && got === 0) {
            aborted = true;
            log('  ⛔ Ba chương đầu đều rỗng — không giống bị chặn tốc độ mà giống', 'err');
            log('     blog này dùng theme khác nên selector không khớp.', 'err');
            log('     Bấm "🔧 Dò selector" ở trên để xem trang thật trả về gì.', 'err');
            break;
          }
          // Nhịp nghỉ tồn tại để khỏi bị Lofter chặn. Chương lấy từ bộ nhớ
          // không gọi Lofter, nên nghỉ ở đây chỉ là ngồi chờ vô ích.
          if (!cached) await sleep(CFG.delay);
        }

        // Vòng vét. Chương hụt vì bị chặn thường lấy được ngay ở lượt sau: lệnh
        // chặn đã hết hạn trong lúc chờ, và nhịp thì đã nới rộng ra rồi.
        const missed = picks.filter((it) => !it._pre);
        if (missed.length && !state.stop && !aborted) {
          log(`  ↻ Vét lại ${missed.length} chương còn hụt, nhịp ${CFG.delay}ms…`);
          for (const it of missed) {
            if (state.stop) break;
            attempted.add(it);
            await grab(it);
            await sleep(CFG.delay);
          }
        }

        // Dựng theo thứ tự của picks chứ không theo thứ tự tải xong — chương
        // vét lại phải nằm đúng chỗ của nó, không rơi xuống cuối sách.
        const chapters = picks.map((it) => it._pre).filter(Boolean);
        // Chỉ đếm chương ĐÃ THỬ mà hỏng. Lấy picks.length trừ đi thì mọi chương
        // chưa hề đụng tới — vì bấm Dừng, vì dừng sớm — đều bị tính thành lỗi.
        failed += Array.from(attempted).filter((it) => !it._pre).length;
        if (!chapters.length) { log('  (không có chương nào tải được)', 'err'); continue; }

        let imgStore = new Map();
        const hasImg = chapters.some((c) => c.imgCount);
        // ZIP ảnh riêng thì buộc phải tải ảnh, dù ô "Tải ảnh" có tắt.
        if ((CFG.withImages || CFG.fmtImgZip) && hasImg && !state.stop) {
          log('  Tải ảnh…');
          imgStore = await downloadImages(chapters, log, () => state.stop);
        }
        await exportGroup(g, chapters, imgStore);
        imgStore.clear();      // trả RAM trước khi sang bộ kế tiếp
        chapters.length = 0;
        progress((done / total) * 100);
      }
      // Nới nhịp mà không bao giờ rút lại thì mỗi lần bị chặn là một lần chậm
      // vĩnh viễn. Chạy sạch thì bò dần về mặc định.
      if (!rateHits && !state.stop && CFG.delay > DEFAULTS.delay) {
        const old = CFG.delay;
        CFG.delay = Math.max(DEFAULTS.delay, Math.round(CFG.delay * 0.85));
        saveCfg();
        log(`  ⏱ Không bị chặn lần nào — rút nhịp ${old} → ${CFG.delay}ms.`);
      }
      const secs = Math.round((Date.now() - t0) / 1000);
      log(`\n${state.stop ? '⏹ Đã dừng' : '✅ Hoàn tất'} — ${done} chương, ${failed} lỗi, ${secs}s.`, failed ? '' : 'ok');
      statusLine.textContent = 'File nằm trong thư mục Tải xuống của trình duyệt.';
    } catch (e) {
      log('❌ ' + (e && e.message ? e.message : e), 'err');
    }
    state.ui.btnGo.disabled = false;
    state.busy = false;
    progress(100);
  }

  /* ==========================================================================
   * 8b. CONVERT QUA TM TRANSLATE
   *
   * Không tự dịch: mượn bộ dịch của userscript TM Translate qua CustomEvent
   * ('tm-bridge:*'), để dùng đúng name-set và chế độ dịch (local/server) mà
   * Aurel đã chỉnh bên đó. Hai script ở hai sandbox riêng nên chỉ trao chuỗi JSON.
   * Chỉ dịch trên BẢN SAO — chương gốc trong bộ nhớ (it._pre) giữ nguyên tiếng
   * Trung, đổi chế độ rồi xuất lại không phải tải lại từ Lofter.
   * ======================================================================== */

  const TM_TIMEOUT = 180000;
  let tmSeq = 0;

  function tmBridgePing(ms = 1500) {
    return new Promise((resolve) => {
      const on = (ev) => {
        let v = null;
        try { v = JSON.parse(ev.detail).version; } catch (e) { /* bỏ qua */ }
        fin(v || '?');
      };
      const t = setTimeout(() => fin(null), ms);
      const fin = (v) => { clearTimeout(t); document.removeEventListener('tm-bridge:pong', on); resolve(v); };
      document.addEventListener('tm-bridge:pong', on);
      document.dispatchEvent(new CustomEvent('tm-bridge:ping'));
    });
  }

  function tmBridgeCall(text, bulk) {
    return new Promise((resolve, reject) => {
      const id = 'ndl-' + Date.now() + '-' + (++tmSeq);
      const onRes = (ev) => {
        let r;
        try { r = JSON.parse(ev.detail); } catch (e) { return; }
        if (!r || r.id !== id) return;
        done();
        if (r.ok) resolve(r.text || ''); else reject(new Error(r.error || 'TM Translate báo lỗi'));
      };
      const timer = setTimeout(() => { done(); reject(new Error('TM Translate không trả lời')); }, TM_TIMEOUT);
      const done = () => { clearTimeout(timer); document.removeEventListener('tm-bridge:result', onRes); };
      document.addEventListener('tm-bridge:result', onRes);
      document.dispatchEvent(new CustomEvent('tm-bridge:translate', { detail: JSON.stringify({ id, text, bulk: !!bulk }) }));
    });
  }

  // TM Translate dịch theo dòng và trả đúng số dòng → một dòng vào, một dòng ra.
  // Lệch số dòng thì không ghép lại được, thà báo lỗi còn hơn lắp sai chỗ.
  async function tmTranslateLines(lines, bulk) {
    if (!lines.length) return [];
    const out = (await tmBridgeCall(lines.map((s) => String(s).replace(/\s*\n\s*/g, ' ')).join('\n'), bulk)).split('\n');
    if (out.length !== lines.length) throw new Error(`lệch số dòng (${lines.length} → ${out.length})`);
    return out.map((s, i) => s.trim() || lines[i]);
  }

  // Trả { group, chapters } đã convert, hoặc null → người gọi xuất bản gốc.
  async function convertGroup(group, chapters, full) {
    const ver = await tmBridgePing();
    if (!ver) {
      log('  ⚠️ Không thấy TM Translate (cần bản có cầu nối, đang bật trên Lofter) → xuất bản gốc.', 'err');
      return null;
    }
    try {
      log(`  🈯 Convert tên bộ + ${chapters.length} tiêu đề…`);
      const heads = await tmTranslateLines([group.name, ...chapters.map((c) => c.title)], full);
      const out = chapters.map((ch, i) => Object.assign({}, ch, { title: heads[i + 1] }));
      let badTotal = 0;
      if (full) {
        let bad = 0, streak = 0;
        for (let i = 0; i < out.length; i++) {
          if (state.stop) { log('  ⏹ Dừng giữa lúc convert → xuất bản gốc.', 'err'); return null; }
          const ch = out[i];
          const ps = ch.blocks.filter((b) => b.type === 'p').map((b) => b.text);
          const tags = ch.tags || [];
          try {
            const lines = await tmTranslateLines([...ps, ...tags], true);
            let k = 0;
            ch.blocks = ch.blocks.map((b) => (b.type === 'p' ? { type: 'p', text: lines[k++] } : b));
            ch.tags = lines.slice(ps.length);
            streak = 0;
            log(`  🈯 ${pad(i + 1)}/${pad(out.length)} ${ch.title.slice(0, 44)}`);
          } catch (e) {
            // Giữ tiêu đề đã dịch, nội dung để nguyên bản gốc — hơn là mất cả bộ.
            bad++; streak++;
            log(`  ✗ ${pad(i + 1)} convert hỏng (${e.message}) → chương này giữ bản gốc.`, 'err');
            if (streak >= 3) {
              log('  ⛔ Hỏng 3 chương liền — ngừng convert, các chương còn lại giữ bản gốc.', 'err');
              bad += out.length - i - 1;
              break;
            }
          }
        }
        if (bad) log(`  ⚠️ ${bad}/${out.length} chương chưa convert được — file vẫn lẫn tiếng Trung.`, 'err');
        badTotal = bad;
      }
      return { group: Object.assign({}, group, { name: heads[0], rawName: group.name }), chapters: out, bad: badTotal };
    } catch (e) {
      log('  ✗ Convert hỏng: ' + e.message + ' → xuất bản gốc.', 'err');
      return null;
    }
  }

  async function onTmCheck() {
    const ver = await tmBridgePing();
    if (!ver) return log('⚠️ Không thấy TM Translate. Cần bản có cầu nối (hardened.2+) và đang bật trên trang này.', 'err');
    try {
      const t = await tmBridgeCall('第一章 测试', false);
      log(`✅ TM Translate ${ver} trả lời: "第一章 测试" → "${t}"`, 'ok');
    } catch (e) { log('❌ TM Translate có mặt nhưng dịch lỗi: ' + e.message, 'err'); }
  }

  const DL_GAP = 400;   // nhiều file rơi xuống cùng lúc sẽ bị trình duyệt chặn

  async function exportGroup(group, chapters, imgStore) {
    if (CFG.tmMode === 'name' || CFG.tmMode === 'full') {
      const conv = await convertGroup(group, chapters, CFG.tmMode === 'full');
      if (conv) {
        // Tên file đã convert không nói lên nội dung bên trong đã convert hay chưa,
        // nên ghi thẳng tình trạng NỘI DUNG vào tên: [raw_zh] = còn nguyên bản gốc,
        // [convert] = đã convert, [convert thiếu N] = N chương convert hỏng, còn gốc.
        // Bộ không có chữ nào (toàn ảnh) thì không có gì để ghi.
        const base = safeName(conv.group.name);
        const rawBase = (detectLang(chapters) === 'zh' ? 'ZH_' : '') + base;
        const hasText = chapters.some((c) => c.textLen > 0);
        const rawTag = hasText ? ' [raw_' + detectLang(chapters) + ']' : '';
        if (CFG.tmMode !== 'full') return writeFiles(conv.group, conv.chapters, imgStore, { base: rawBase + rawTag });
        if (CFG.tmKeepRaw) {
          await writeFiles(group, chapters, imgStore, { base: rawBase + (rawTag || ' [gốc]'), raw: true });
          await sleep(DL_GAP);
        }
        const done = !hasText ? '' : conv.bad ? ` [convert thiếu ${conv.bad}]` : ' [convert]';
        return writeFiles(conv.group, conv.chapters, imgStore, { base: base + done });
      }
    }
    return writeFiles(group, chapters, imgStore, {});
  }

  // opts.base: tên file (không đuôi); opts.raw: bản gốc đi kèm → bỏ ZIP ảnh và
  // cảnh báo ảnh, vì bản convert ngay sau đã lo hai việc đó.
  async function writeFiles(group, chapters, imgStore, opts) {
    // Bản gốc tiếng Trung đặt tiền tố ZH_ theo quy ước kho; bản đã convert sang Việt thì không.
    const base = opts.base || ((detectLang(chapters) === 'zh' ? 'ZH_' : '') + safeName(group.name));
    const imgZip = CFG.fmtImgZip && !opts.raw;
    const want = [CFG.fmtTxt && 'TXT', CFG.fmtMd && 'Markdown', CFG.fmtEpub && 'EPUB', CFG.fmtZip && 'ZIP', imgZip && 'ZIP ảnh'].filter(Boolean);
    log('  📦 Đang xuất ' + (want.join(' + ') || '(chưa chọn định dạng)') + '…');
    let saved = 0;
    const drop = async (blob, name) => {
      if (saved++) await sleep(DL_GAP);
      saveBlob(blob, name);
      log('  💾 ' + name);
    };
    if (CFG.fmtTxt) {
      await drop(new Blob([buildTxt(group, chapters, imgStore)], { type: 'text/plain;charset=utf-8' }), base + '.txt');
    }
    if (CFG.fmtMd) {
      await drop(new Blob([buildMd(group, chapters)], { type: 'text/markdown;charset=utf-8' }), base + '.md');
    }
    if (CFG.fmtEpub) {
      try { await drop(await buildEpub(group, chapters, imgStore, log), base + '.epub'); }
      catch (e) { log('  ✗ EPUB hỏng: ' + e.message, 'err'); }
    }
    if (CFG.fmtZip) {
      try { await drop(await buildZip(group, chapters, imgStore, log), base + '.zip'); }
      catch (e) { log('  ✗ ZIP hỏng: ' + e.message, 'err'); }
    }
    if (imgZip) {
      try {
        const b = await buildImgZip(group, chapters, imgStore);
        if (b) await drop(b, base + ' - ảnh.zip');
        else log('  (bộ này không có ảnh nào tải được → bỏ qua ZIP ảnh)');
      } catch (e) { log('  ✗ ZIP ảnh hỏng: ' + e.message, 'err'); }
    }
    // Tải ảnh về mà không nhúng, cũng không đóng gói riêng = tải xong vứt đi.
    if (imgStore && imgStore.size && !CFG.embedImages && !CFG.fmtImgZip && !opts.raw) {
      log(`  ⚠️ Đã tải ${imgStore.size} ảnh nhưng không nhúng và cũng không xuất ZIP ảnh — ảnh bị bỏ.`, 'err');
    }
    // Lưới an toàn: không file nào ra thì vẫn ghi TXT, đừng để công tải đổ sông.
    if (!saved) {
      log('  ↳ Không xuất được định dạng đã chọn — ghi TXT thay thế.', 'err');
      await drop(new Blob([buildTxt(group, chapters, imgStore)], { type: 'text/plain;charset=utf-8' }), base + '.txt');
    }
  }

  /* ==========================================================================
   * 11. KHỞI CHẠY
   * ======================================================================== */

  renderLauncher();
  renderPanel();
  document.addEventListener('aurel-hub:close', (ev) => { if (ev.detail === 'ndl') state.stop = true; });

  // Kiểm thử ngoài trình duyệt: Node + jsdom, phải đặt url của jsdom là một
  // địa chỉ *.lofter.com, nếu không SITE.test() trượt và script thoát ngay từ đầu.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      scanTOC, groupChapters, parseSeries, parseChapterNo, extractChapter,
      buildTxt, buildEpub, buildZip, buildImgZip, sortChapters, dropFakeChapterNos,
      sniffExt, detectLang, similarKey, safeName, stripTags, cnNum, guessRoot, CFG, state,
      labelOf, fetchChapter, tagsLoad, tagsSave, splitByTags, exportGroup, buildMd,
    };
  }
  // Chỉ phơi API nội bộ ra trang khi bật DEBUG — mặc định không rò CFG cho script của trang
  if (DEBUG) try {
    Object.defineProperty(window, '__NDL__', {
      value: {
        VERSION, SITE, CFG, scanTOC, groupChapters, parseSeries, parseChapterNo,
        sortChapters, extractChapter, buildTxt, buildZip, buildEpub, safeName, stripTags,
      },
      configurable: true,
    });
  } catch (e) { /* bỏ qua */ }
})();

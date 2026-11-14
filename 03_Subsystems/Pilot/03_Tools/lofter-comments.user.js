// ==UserScript==
// @name         Lofter — Dịch bình luận
// @namespace    aurel.lofter-comments
// @version      1.0.0
// @description  Dịch bình luận Lofter (khung comment.do nhúng dưới bài) sang tiếng Việt: qua Trạm Dịch đang chạy trên máy, không có thì Google.
// @author       Aurel
// @match        *://www.lofter.com/comment.do*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
// @connect      translate.googleapis.com
// ==/UserScript==
//
// Bình luận Lofter không nằm trong trang bài: blog nhúng <iframe id="comment_frame"
// src="//www.lofter.com/comment.do?pid=…&bid=…">. Khung đó khác tên miền với blog
// (xxx.lofter.com ≠ www.lofter.com), nên script của trang bài không với vào được — script
// này chạy THẲNG trong khung (không có @noframes là cố ý).
//
// Cấu trúc đo trên www.lofter.com/comment.do ngày 2026-10-09:
//   .bcmtlst li                       một bình luận
//     .bcmtlstj a.bcmtlstk            tên người viết (giữ nguyên)
//     .bcmtlstj span.bcmtlstf.itag    nội dung bình luận  ← dịch cái này
//   .bcmtmore                         "tải thêm" — bình luận mới chèn vào sau → theo dõi bằng MutationObserver
//
// Máy dịch:
//   'tc'     Trạm Dịch (TranslateCenter) ở http://127.0.0.1:8765 — dùng bộ tên + VietPhrase của bạn.
//            App không chạy thì tự rơi sang Google, và báo trên thanh.
//   'google' translate.googleapis.com (client=gtx).
// Mã biểu tượng Lofter như [更新求踢], [老福鸽/打call] giữ nguyên, không gửi đi dịch.

(function () {
    'use strict';

    var TC = 'http://127.0.0.1:8765';
    var cfg = Object.assign({ engine: 'tc', auto: true, showOrig: true }, GM_getValue('cfg', {}));
    var saveCfg = function () { GM_setValue('cfg', cfg); };
    var STICKER = /\[[^\[\]\n]{1,24}\]/g;
    var DONE = 'data-aurel-tr';

    /* ---------- máy dịch ---------- */

    function req(opts) {
        return new Promise(function (resolve, reject) {
            GM_xmlhttpRequest(Object.assign({
                timeout: 30000,
                onload: function (r) { (r.status >= 200 && r.status < 300) ? resolve(r.responseText) : reject(new Error('HTTP ' + r.status)); },
                onerror: function () { reject(new Error('không kết nối được')); },
                ontimeout: function () { reject(new Error('quá thời gian')); }
            }, opts));
        });
    }
    function viaTC(text) {
        return req({
            method: 'POST', url: TC + '/api/translate/text',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ text: text, engine: 'auto', source_lang: 'zh' })
        }).then(function (b) { return JSON.parse(b).text; });
    }
    function viaGoogle(text) {
        return req({
            method: 'POST', url: 'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=zh-CN&tl=vi',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            data: 'q=' + encodeURIComponent(text)
        }).then(function (b) {
            var j = JSON.parse(b);
            if (!j || !Array.isArray(j[0])) throw new Error('Google trả dữ liệu lạ');
            return j[0].map(function (p) { return (p && p[0]) || ''; }).join('');
        });
    }
    /** Dịch nhiều dòng một lượt: mỗi bình luận một dòng, trả về đúng số dòng (thiếu thì null). */
    function translateLines(lines) {
        var text = lines.join('\n');
        var run = function (eng) {
            return (eng === 'tc' ? viaTC(text) : viaGoogle(text)).then(function (out) {
                var res = String(out).split('\n');
                return { lines: res.length === lines.length ? res : null, engine: eng };
            });
        };
        if (cfg.engine !== 'tc') return run('google');
        return run('tc').catch(function (e) {
            note('Trạm Dịch không trả lời (' + e.message + ') — đang dùng Google.');
            return run('google');
        });
    }

    /* ---------- bình luận ---------- */

    // "[更新求踢] 太太好棒" → giữ mã biểu tượng tại chỗ, chỉ gửi phần chữ
    function split(text) {
        var parts = [], last = 0, m;
        STICKER.lastIndex = 0;
        while ((m = STICKER.exec(text))) {
            if (m.index > last) parts.push({ t: text.slice(last, m.index) });
            parts.push({ s: m[0] });
            last = m.index + m[0].length;
        }
        if (last < text.length) parts.push({ t: text.slice(last) });
        return parts;
    }
    var hasHan = function (s) { return /[㐀-鿿]/.test(s); };

    function pending() {
        return Array.prototype.slice.call(document.querySelectorAll('.bcmtlst li .bcmtlstj span.bcmtlstf.itag'))
            .filter(function (el) { return !el.hasAttribute(DONE); });
    }

    var busy = false, paused = false;   // paused: bạn vừa bấm "Bản gốc" — đừng tự dịch lại
    function translateAll() {
        if (busy) return;
        var els = pending();
        if (!els.length) return;
        busy = true;
        // gom mọi đoạn chữ cần dịch thành một danh sách dòng
        var jobs = [], lines = [];
        els.forEach(function (el) {
            el.setAttribute(DONE, 'busy');
            var orig = el.textContent;
            var parts = split(orig);
            parts.forEach(function (p) {
                if (p.t != null && hasHan(p.t)) { p.i = lines.length; lines.push(p.t.replace(/\s*\n\s*/g, ' ').trim()); }
            });
            jobs.push({ el: el, orig: orig, parts: parts });
        });
        if (!lines.length) {
            jobs.forEach(function (j) { j.el.setAttribute(DONE, 'skip'); });
            busy = false;
            return;
        }
        status('Đang dịch ' + els.length + ' bình luận…');
        translateLines(lines).then(function (r) {
            if (!r.lines) throw new Error('kết quả lệch dòng');
            jobs.forEach(function (j) {
                var vi = j.parts.map(function (p) { return p.s || (p.i != null ? r.lines[p.i] : p.t); }).join('');
                j.el.setAttribute(DONE, 'ok');
                j.el.setAttribute('data-orig', j.orig);
                j.el.textContent = vi;
                if (cfg.showOrig) addOrig(j.el, j.orig);
            });
            status('Đã dịch ' + els.length + ' bình luận · ' + (r.engine === 'tc' ? 'Trạm Dịch' : 'Google'));
        }).catch(function (e) {
            jobs.forEach(function (j) { j.el.removeAttribute(DONE); });
            status('Không dịch được: ' + e.message, true);
        }).then(function () {
            busy = false;
            if (pending().length) translateAll();   // bình luận mới tới trong lúc đang dịch
        });
    }

    // Bản gốc nằm trong chú thích khi di chuột, KHÔNG thêm dòng: blog đặt khung bình luận
    // cao cố định (height="505", scrolling="no") và trang con không nới khung cha được
    // (khác tên miền) — thêm dòng là đẩy bình luận cuối ra khỏi tầm nhìn.
    function addOrig(el, orig) { el.title = 'Gốc: ' + orig; }
    function restore() {
        document.querySelectorAll('[' + DONE + '="ok"]').forEach(function (el) {
            el.textContent = el.getAttribute('data-orig');
            el.removeAttribute(DONE);
        });
        document.querySelectorAll('[data-orig]').forEach(function (el) { el.removeAttribute('title'); });
        status('Đang hiện bản gốc');
    }

    /* ---------- thanh điều khiển ở đầu khung ---------- */

    var bar, msg;
    function status(t, err) { if (msg) { msg.textContent = t; msg.style.color = err ? '#c0392b' : ''; } }
    function note(t) { status(t); }

    function buildBar() {
        var css = document.createElement('style');
        css.textContent = [
            '.aurel-cmt-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:4px 0 6px;padding:4px 6px;border-radius:8px;',
            'background:#eaf6f3;color:#173a37;font:12px/1.4 "Segoe UI",system-ui,sans-serif}',
            '.aurel-cmt-bar button{border:0;border-radius:6px;padding:4px 10px;cursor:pointer;font:inherit;background:#dcebe9;color:#173a37}',
            '.aurel-cmt-bar button.pri{background:linear-gradient(135deg,#34dcc0,#12b99d);color:#fff;font-weight:600}',
            '.aurel-cmt-bar select{font:inherit;border:1px solid #c8dedb;border-radius:6px;padding:2px 4px;background:#fff}',
            '.aurel-cmt-bar label{display:inline-flex;gap:4px;align-items:center;cursor:pointer}',
            '.aurel-cmt-bar .msg{flex:1;min-width:140px;color:#5f7d7a}'
        ].join('');
        document.head.appendChild(css);
        bar = document.createElement('div');
        bar.className = 'aurel-cmt-bar';
        bar.innerHTML = '<button class="pri" data-a="go">Dịch bình luận</button><button data-a="orig">Bản gốc</button>'
            + '<select data-a="eng" aria-label="Máy dịch"><option value="tc">Trạm Dịch</option><option value="google">Google</option></select>'
            + '<label><input type="checkbox" data-a="auto"> Tự dịch</label>'
            + '<label title="Di chuột lên bình luận để xem chữ gốc"><input type="checkbox" data-a="show"> Gốc khi di chuột</label>'
            + '<span class="msg"></span>';
        msg = bar.querySelector('.msg');
        bar.querySelector('[data-a=eng]').value = cfg.engine;
        bar.querySelector('[data-a=auto]').checked = cfg.auto;
        bar.querySelector('[data-a=show]').checked = cfg.showOrig;
        bar.addEventListener('click', function (e) {
            var a = e.target.getAttribute('data-a');
            if (a === 'go') { paused = false; translateAll(); }
            if (a === 'orig') { paused = true; restore(); }
        });
        bar.addEventListener('change', function (e) {
            var a = e.target.getAttribute('data-a');
            if (a === 'eng') cfg.engine = e.target.value;
            if (a === 'auto') cfg.auto = e.target.checked;
            if (a === 'show') cfg.showOrig = e.target.checked;
            saveCfg();
        });
        var list = document.querySelector('.bcmtlst');
        list.parentNode.insertBefore(bar, list);
        // Thanh này thêm khoảng 36 px vào khung cao cố định: bình luận cuối có thể bị che bớt.
    }

    function boot() {
        var list = document.querySelector('.bcmtlst');
        if (!list) return false;
        buildBar();
        new MutationObserver(function () { if (cfg.auto && !paused && pending().length) translateAll(); })
            .observe(list, { childList: true, subtree: true });
        if (cfg.auto) translateAll(); else status('Bấm "Dịch bình luận" để dịch.');
        return true;
    }

    if (!boot()) {
        var tries = 0, t = setInterval(function () { if (boot() || ++tries > 20) clearInterval(t); }, 500);
    }
})();

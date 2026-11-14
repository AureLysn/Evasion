// ==UserScript==
// @name         TTS Reader — Wattpad
// @namespace    aurel.tts-reader
// @version      {{VERSION}}
// @description  Đọc chương Wattpad bằng giọng Edge/Chrome (tải đủ cả chương, không phải cuộn). Dịch Anh → Việt hoặc đọc nguyên bản, tô màu theo chữ, tự qua chương.
// @author       Aurel
// @match        *://www.wattpad.com/*
// @match        *://wattpad.com/*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      translate.googleapis.com
// ==/UserScript==
//
// Tải đủ chương bằng fetch cùng trang (www.wattpad.com) — không cần @connect.
// Quyền mạng ra ngoài duy nhất: translate.googleapis.com, chỉ khi máy dịch là Google.

SITE = {
    id: 'wattpad',
    name: 'Wattpad',
    lang: 'en',

    // Trang đọc một phần (chương) có dạng /123456789-ten-chuong; trang truyện là /story/…
    isChapter: function () { return /^\/\d{3,}(-|\/|$)/.test(location.pathname); },

    // .ttsr-full = bản đầy đủ do prepare() chèn vào. Không có thì đọc phần đang hiện.
    contentSel: '.ttsr-full || .part-content pre || .panel-reading pre || pre',
    titleSel: '.part-header h1 || header h1 || h1.h2 || h1',
    waitMs: 12000,
    minText: 50,

    // Wattpad chỉ nạp trang đầu của chương; phần sau nạp dần khi cuộn. Đọc bằng TTS
    // thì không ai cuộn → đọc hụt. Tải nguyên văn chương một lần rồi đọc trên bản đó.
    prepare: async function (api) {
        var m = location.pathname.match(/^\/(\d{3,})/);
        if (!m) return '';
        var id = m[1];
        if (document.querySelector('.ttsr-full[data-id="' + id + '"]')) return '';
        var pres = Array.prototype.slice.call(document.querySelectorAll('.part-content pre, .panel-reading pre'));
        if (!pres.length) pres = Array.prototype.slice.call(document.querySelectorAll('pre'));
        if (!pres.length) return 'Wattpad: không thấy khung nội dung — đọc phần đang có trên trang.';

        api.status('Wattpad: đang tải đủ nội dung chương…');
        var urls = ['/apiv2/?m=storytext&id=' + id, '/apiv2/storytext?id=' + id];
        var html = '', lastErr = '';
        for (var i = 0; i < urls.length && !html; i++) {
            try {
                var r = await fetch(urls[i], { credentials: 'include' });
                if (!r.ok) { lastErr = 'HTTP ' + r.status; continue; }
                var t = await r.text();
                if (t && t.replace(/<[^>]+>/g, '').trim().length > 40) html = t;
                else lastErr = 'trả về rỗng';
            } catch (e) { lastErr = e && e.message ? e.message : String(e); }
        }
        if (!html) return 'Wattpad: không tải được bản đầy đủ (' + lastErr + ') — chỉ đọc phần đã hiện trên trang.';

        var doc = new DOMParser().parseFromString('<div id="x">' + html + '</div>', 'text/html');
        var paras = Array.prototype.slice.call(doc.querySelectorAll('#x p'))
            .map(function (p) { return clean(p.textContent); })
            .filter(Boolean);
        if (!paras.length) {
            paras = clean(doc.getElementById('x').textContent).split('\n').map(clean).filter(Boolean);
        }
        var box = document.createElement('div');
        box.className = 'ttsr-full';
        box.setAttribute('data-id', id);
        paras.forEach(function (t) { var p = document.createElement('p'); p.textContent = t; box.appendChild(p); });
        pres[0].parentNode.insertBefore(box, pres[0]);
        pres.forEach(function (p) { p.classList.add('ttsr-hide'); });
        api.status('Wattpad: đã tải đủ ' + paras.length + ' đoạn.');
        return '';
    },

    next: function () {
        var cands = document.querySelectorAll('a.next-part-link, .next-part a, a[data-testid*="next"], a[href][class*="next-part"]');
        for (var i = 0; i < cands.length; i++) if (cands[i].href) return { url: cands[i].href, el: cands[i], how: 'nút phần sau' };
        var as = document.querySelectorAll('a[href]');
        for (var j = 0; j < as.length; j++) {
            var t = clean(as[j].textContent);
            if (/^(continue to next part|next part|tiếp tục phần tiếp theo|phần tiếp theo)/i.test(t) && /^\/?\d{3,}|wattpad\.com\/\d{3,}/.test(as[j].getAttribute('href') || '')) {
                return { url: as[j].href, el: as[j], how: '"' + t.slice(0, 24) + '"' };
            }
        }
        return null;   // để lõi tự dò (rel=next, chữ "Next"…)
    },

    cover: function () {
        var img = document.querySelector('.story-cover img, .cover img, img[class*="cover"]');
        return img ? img.src || '' : '';
    },

    tr: {
        modes: ['en', 'off'],
        note: '"Không dịch" = đọc nguyên văn tiếng Anh (giọng tự chuyển sang tiếng Anh). Truyện vốn tiếng Việt thì tự bỏ qua bước dịch.'
    },
    defaults: {
        trMode: 'en', trEngineEn: 'auto',
        wprOn: false, wprAds: true, wprSimilar: true, wprInline: true, wprComments: false,
        wprFs: 0, wprW: 720, wprLh: 0
    },

    // Chế độ đọc: chỉ giữ nội dung chương, cột chữ ra giữa. Bật / tắt ngay khi tải trang
    // (init), không cần mở bảng TTS.
    init: function (x) { WPR.cfg = x.cfg; WPR.save = x.save; wprApply(); },

    extraHtml: function () {
        return '<div class="hd"><b>Chế độ đọc</b><label class="sw" title="Bật / tắt chế độ đọc"><input type="checkbox" id="wprOn"><i></i></label></div>' +
            '<div class="help">Chỉ giữ nội dung chương: bỏ thanh menu, cột bên, và các phần chen giữa các section truyện.</div>' +
            '<label class="ck"><input type="checkbox" id="wprAds"> Quảng cáo / banner</label>' +
            '<label class="ck"><input type="checkbox" id="wprSimilar"> Gợi ý truyện (Bạn cũng sẽ thích)</label>' +
            '<label class="ck"><input type="checkbox" id="wprInline"> Nội dung chèn giữa các section</label>' +
            '<label class="ck"><input type="checkbox" id="wprComments"> Bình luận cuối chương</label>' +
            '<div class="kvr"><span>Đã ẩn</span><span id="wprCount">0 phần</span></div>' +
            '<button class="b" id="wprReset">Khôi phục</button>' +
            '<details><summary>Tùy chỉnh hiển thị</summary>' +
            ' <div class="grid"><label>Cỡ chữ (px, 0 = giữ nguyên)</label><input id="wprFs" type="number" min="0" max="40" step="1"></div>' +
            ' <div class="grid"><label>Độ rộng cột chữ (px)</label><input id="wprW" type="number" min="400" max="1400" step="20"></div>' +
            ' <div class="grid"><label>Giãn dòng (0 = giữ nguyên)</label><input id="wprLh" type="number" min="0" max="3" step="0.1"></div>' +
            '</details>';
    },
    bindExtra: function (x) {
        WPR.cfg = x.cfg; WPR.save = x.save;
        ['wprOn', 'wprAds', 'wprSimilar', 'wprInline', 'wprComments'].forEach(function (k) {
            var el = x.$(k);
            el.checked = !!x.cfg[k];
            el.addEventListener('change', function () { x.cfg[k] = el.checked; x.save(); wprApply(); });
        });
        ['wprFs', 'wprW', 'wprLh'].forEach(function (k) {
            var el = x.$(k);
            el.value = x.cfg[k];
            el.addEventListener('change', function () { x.cfg[k] = Number(el.value) || 0; x.save(); wprApply(); });
        });
        x.$('wprReset').addEventListener('click', function () { x.cfg.wprOn = false; x.$('wprOn').checked = false; x.save(); wprApply(); });
        WPR.countEl = x.$('wprCount');
        wprApply();
    },

    help: [
        '• Wattpad chỉ hiện dần chương khi cuộn. Bấm Play là script tải nguyên chương một lần, chèn vào trang (thay khung gốc) rồi đọc — không phải cuộn.',
        '• Không tải được bản đầy đủ thì đọc phần đang hiện, và bảng sẽ báo rõ.',
        '• Muốn nghe tiếng Anh gốc: chọn "Không dịch" ở ô Dịch trước khi đọc.'
    ].join('\n')
};

/* ---- Chế độ đọc Wattpad ------------------------------------------------------
 * Bộ chọn đo trên trang đọc thật (www.wattpad.com/<id-phần>, 2026-10-09): khung trang là
 * Backbone cũ với id ổn định — #header-container, .left-rail (#sticky-nav), cột quảng cáo
 * #reading-top-ad, #similar-stories, component-adcontainer-*, component-paragraphcommentscount-*.
 * Chỉ thêm / gỡ một class trên <html> và một thẻ <style>, nên "Khôi phục" trả trang về
 * nguyên trạng ngay, không phải tải lại. */
var WPR = { cfg: null, save: null, countEl: null, timer: 0 };
var WPR_BASE = '#header-container,.left-rail,#sticky-nav,#footer-container,#part-footer-actions,' +
    '[id^="component-partfooteractions"],.part-content .page>div:not(:first-child)';
var WPR_OPT = {
    wprAds: '[id^="component-adcontainer"],#reading-top-ad,.reading-widget,#bottom-banner-container,#go-premium-button,' +
        '[id^="component-trypremium"],.promoted-stories,#media-share',
    wprSimilar: '#similar-stories,.similar-stories',
    wprInline: '[id^="component-paragraphcommentscount"],.trinityAudioPlaceholder,[id^="component-readerpoll"],.share-tools,#media-container .on-share-image-banner',
    wprComments: '#story-part-comments,[id^="component-storypartcomments"]'
};
function wprSelectors() {
    var c = WPR.cfg || {}, list = [WPR_BASE];
    Object.keys(WPR_OPT).forEach(function (k) { if (c[k]) list.push(WPR_OPT[k]); });
    return list.join(',');
}
function wprApply() {
    var c = WPR.cfg || {}, on = !!c.wprOn, root = document.documentElement;
    var st = document.getElementById('ttsr-wpr-style');
    if (!on) {
        root.classList.remove('ttsr-wpr');
        if (st) st.remove();
        wprCount();
        return;
    }
    if (!st) { st = document.createElement('style'); st.id = 'ttsr-wpr-style'; (document.head || root).appendChild(st); }
    var col = '.part-content .page>div:first-child,.part-header>div';
    var text = 'pre,.ttsr-full,pre p,.ttsr-full p';
    st.textContent = wprSelectors().split(',').map(function (s) { return 'html.ttsr-wpr ' + s.trim(); }).join(',') + '{display:none!important;}' +
        col.split(',').map(function (s) { return 'html.ttsr-wpr ' + s; }).join(',') +
        '{float:none!important;width:auto!important;max-width:' + (Number(c.wprW) || 720) + 'px!important;margin-left:auto!important;margin-right:auto!important;}' +
        'html.ttsr-wpr #sticky-end>.row,html.ttsr-wpr .part-content{margin-left:0!important;margin-right:0!important;}' +
        (Number(c.wprFs) || Number(c.wprLh) ? text.split(',').map(function (s) { return 'html.ttsr-wpr .part-content ' + s; }).join(',') + '{' +
            (Number(c.wprFs) ? 'font-size:' + Number(c.wprFs) + 'px!important;' : '') +
            (Number(c.wprLh) ? 'line-height:' + Number(c.wprLh) + '!important;' : '') + '}' : '');
    root.classList.add('ttsr-wpr');
    wprCount();
    // Wattpad nạp dần quảng cáo / gợi ý sau khi trang hiện → đếm lại vài lần.
    clearTimeout(WPR.timer);
    var n = 0;
    (function again() { if (++n > 6) return; WPR.timer = setTimeout(function () { wprCount(); again(); }, 2000); })();
}
function wprCount() {
    if (!WPR.countEl) return;
    var on = WPR.cfg && WPR.cfg.wprOn, k = 0;
    if (on) { try { k = document.querySelectorAll(wprSelectors()).length; } catch (e) {} }
    WPR.countEl.textContent = on ? k + ' phần' : 'đang tắt';
}

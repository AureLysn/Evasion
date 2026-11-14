// ==UserScript==
// @name         TTS Reader — FanFiction.net
// @namespace    aurel.tts-reader
// @version      {{VERSION}}
// @description  Đọc truyện FanFiction.net / FictionPress bằng giọng Edge/Chrome. Dịch Anh → Việt trước khi đọc, tô màu theo chữ, tự qua chương.
// @author       Aurel
// @match        *://www.fanfiction.net/s/*
// @match        *://m.fanfiction.net/s/*
// @match        *://fanfiction.net/s/*
// @match        *://www.fictionpress.com/s/*
// @match        *://m.fictionpress.com/s/*
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
// Quyền mạng duy nhất: translate.googleapis.com, chỉ dùng khi máy dịch là Google (hoặc
// "Tự chọn" mà Chrome không dịch được trên máy).

SITE = {
    id: 'fanfiction',
    name: 'FanFiction.net',
    lang: 'en',

    // /s/{id}/{chương}/{slug}
    isChapter: function () { return /^\/s\/\d+/.test(location.pathname) && !!document.querySelector('#storytext, #storycontent'); },

    contentSel: '#storytext || #storycontent',

    // Trang không có tiêu đề chương riêng: ghép tên truyện + mục đang chọn trong ô chọn chương.
    title: function () {
        var story = document.querySelector('#profile_top b.xcontrast_txt, #content b');
        var opt = document.querySelector('#chap_select option[selected], #chap_select option:checked');
        var s = story ? clean(story.textContent) : '';
        var c = opt ? clean(opt.textContent).replace(/^\d+\.\s*/, '') : '';
        var text = s && c ? s + ' — ' + c : (s || c);
        return text ? { el: null, text: text } : null;
    },

    next: function () {
        var m = location.pathname.match(/^\/s\/(\d+)\/(\d+)(\/[^?#]*)?/);
        if (!m) return null;
        var id = m[1], cur = Number(m[2]), n = cur + 1;
        // Bản mobile không có ô chọn chương nhưng có link "Next »" trỏ đúng /s/id/n
        var a = document.querySelector('a[href*="/s/' + id + '/' + n + '/"], a[href$="/s/' + id + '/' + n + '"]');
        if (a && a.href) return { url: a.href, el: a, how: 'chương ' + n };
        var sel = document.querySelector('#chap_select');
        if (sel) {
            if (cur >= sel.options.length) return { none: 'đây là chương cuối' };
            return { url: location.origin + '/s/' + id + '/' + n + (m[3] || ''), how: 'chương ' + n + ' / ' + sel.options.length };
        }
        return { none: 'truyện một chương' };
    },

    cover: function () {
        var img = document.querySelector('#profile_top img.cimage, img.cimage');
        return img ? (img.getAttribute('data-original') || img.src || '') : '';
    },

    tr: {
        modes: ['en', 'off'],
        note: 'Dịch cả chương rồi mới đọc. Truyện vốn tiếng Việt thì tự bỏ qua bước dịch.'
    },
    defaults: { trMode: 'en', trEngineEn: 'auto' },

    help: [
        '• Đọc khối #storytext (bản điện thoại: #storycontent).',
        '• Tiêu đề đọc trước = tên truyện + tên chương trong ô chọn chương.',
        '• Chương sau lấy từ ô chọn chương (hoặc link Next trên bản điện thoại); ở chương cuối thì dừng.',
        '• FanFiction.net hay bật trang kiểm tra Cloudflare khi đổi chương nhanh — nếu gặp, qua trang kiểm tra xong script sẽ tự đọc tiếp.'
    ].join('\n')
};

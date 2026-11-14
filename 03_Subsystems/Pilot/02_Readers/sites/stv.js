// ==UserScript==
// @name         TTS Reader — Sáng Tác Việt
// @namespace    aurel.tts-reader
// @version      {{VERSION}}
// @description  Đọc chương Sáng Tác Việt (bản convert) bằng giọng Edge/Chrome, tô màu theo chữ, tự qua chương.
// @author       Aurel
// @match        *://*.sangtacviet.com/truyen/*
// @match        *://sangtacviet.com/truyen/*
// @match        *://*.sangtacviet.vip/truyen/*
// @match        *://sangtacviet.vip/truyen/*
// @match        *://*.sangtacviet.app/truyen/*
// @match        *://sangtacviet.app/truyen/*
// @match        *://*.sangtacviet.pro/truyen/*
// @match        *://sangtacviet.pro/truyen/*
// @match        http://14.225.254.182/truyen/*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==
//
// Không có quyền mạng nào: STV vốn đã là tiếng Việt, không cần dịch.

SITE = {
    id: 'stv',
    name: 'Sáng Tác Việt',
    lang: 'vi',

    // /truyen/{nguồn}/{n}/{bookid}/{chương}/ — trang mục lục thì thiếu đoạn {chương}
    isChapter: function () { return /^\/truyen\/[^/]+\/\d+\/\d+\/\d+\/?$/.test(location.pathname); },

    // Trang có HAI khối .contentbox, khối đầu KHÔNG phải nội dung (đo khi làm script
    // tải STV 0.2.x). Khối nội dung thật có id bắt đầu bằng "cld-".
    contentSel: '[id^="cld-"]',
    // Nội dung render bằng JS và có lúc chậm (chống bot) → chờ lâu hơn trang thường.
    waitMs: 25000,
    minText: 100,

    // Chưa đo được selector tiêu đề chương của STV → thử vài chỗ hay gặp, không có
    // thì lấy <title> của trang bỏ đuôi tên truyện.
    title: function () {
        var cands = ['#bookchapnameholder', '.chapter-title', '.chaptername', '#chaptername'];
        for (var i = 0; i < cands.length; i++) {
            var el = document.querySelector(cands[i]);
            var t = el && clean(el.textContent);
            if (t) return { el: el, text: t };
        }
        var dt = clean(document.title.split(/\s[-–|]\s/)[0]);
        return dt ? { el: null, text: dt } : null;
    },

    // Chương sau = cùng đường dẫn, số chương + 1. Mục lục STV có số trùng (tiêu đề
    // quyển), nhưng URL chương vẫn đi theo số thứ tự nên cộng 1 là đúng.
    next: function () {
        var m = location.pathname.match(/^(\/truyen\/[^/]+\/\d+\/\d+\/)(\d+)\/?$/);
        if (!m) return null;
        var n = Number(m[2]) + 1;
        return { url: location.origin + m[1] + n + '/', how: 'chương ' + n + ' (ghép URL)' };
    },

    tr: null,
    defaults: { maxChars: 240 },

    help: [
        '• Đọc khối nội dung [id^="cld-"] — khối .contentbox đầu tiên trên trang không phải nội dung nên bị bỏ qua.',
        '• Nội dung STV tải chậm: mini-player hiện ngay nhưng có thể phải đợi vài giây mới có chữ để đọc.',
        '• Chương sau lấy bằng cách cộng 1 vào số chương trên URL. Ở chương cuối, link này dẫn tới trang lỗi của STV — tắt "Tự qua chương sau" nếu không muốn.',
        '• Chữ ẩn chống sao chép của STV (nếu có) bị bỏ qua vì script chỉ đọc chữ đang hiển thị.'
    ].join('\n')
};

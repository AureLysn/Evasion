// ==UserScript==
// @name         TTS Reader — AO3
// @namespace    aurel.tts-reader
// @version      {{VERSION}}
// @description  Đọc truyện AO3 bằng giọng Edge/Chrome. Dịch Anh/Trung → Việt trước khi đọc, tô màu theo chữ, tự qua chương.
// @author       Aurel
// @match        *://archiveofourown.org/works/*
// @match        *://*.archiveofourown.org/works/*
// @match        *://ao3.org/works/*
// @match        *://*.ao3.org/works/*
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
// Quyền mạng DUY NHẤT: translate.googleapis.com — chỉ dùng khi bạn chọn máy dịch Google
// (hoặc "Tự chọn" mà Chrome không có bộ dịch trên máy). unsafeWindow chỉ để với tới
// Translator API của Chrome. Không cookie, không tự cập nhật.

SITE = {
    id: 'ao3',
    name: 'AO3',
    lang: 'en',

    // Có #chapters = đang ở trang đọc (không phải trang cảnh báo nội dung người lớn,
    // trang kudos, trang bình luận riêng…)
    isChapter: function () { return !!document.querySelector('#chapters'); },

    // Chỉ lấy div.userstuff: ghi chú tác giả là blockquote.userstuff → tự bị loại.
    // Tiêu đề phụ "Chapter Text" là h3.landmark → lõi đã bỏ qua lớp landmark.
    contentSel: '#chapters div.userstuff',
    titleSel: '#chapters h3.title || #workskin .preface h2.title',
    nextSel: 'li.chapter.next a',

    tr: {
        modes: ['auto', 'en', 'zh', 'off'],
        note: 'AO3 có cả truyện tiếng Anh lẫn tiếng Trung. "Tự nhận" xem chữ trên trang rồi chọn chiều dịch; truyện tiếng Việt thì không dịch.'
    },
    defaults: { trMode: 'auto', trEngineEn: 'auto', trEngineZh: 'tm' },

    help: [
        '• Đọc phần nội dung chương, bỏ qua ghi chú tác giả (Notes) và phần tóm tắt.',
        '• Tự qua chương theo nút "Next Chapter →" của AO3. Ở chế độ "Entire Work" (cả truyện một trang) thì không có chương sau — đọc hết là dừng.',
        '• Trang cảnh báo "adult content" chưa có nội dung: bấm "Proceed" trước, mini-player mới hiện.'
    ].join('\n')
};

// ==UserScript==
// @name         TTS Reader — WikiCV
// @namespace    aurel.tts-reader
// @version      {{VERSION}}
// @description  Đọc chương WikiCV / Wikidich (bản convert) bằng giọng Edge/Chrome, tô màu theo chữ, tự qua chương.
// @author       Aurel
// @match        *://wikicv.org/truyen/*
// @match        *://*.wikicv.org/truyen/*
// @match        *://wikicv.net/truyen/*
// @match        *://*.wikicv.net/truyen/*
// @match        *://wikidich.com/truyen/*
// @match        *://*.wikidich.com/truyen/*
// @match        *://dichtienghoa.com/truyen/*
// @match        *://*.dichtienghoa.com/truyen/*
// @match        *://truyenwikidich.net/truyen/*
// @match        *://*.truyenwikidich.net/truyen/*
// @match        *://koanchay.org/truyen/*
// @match        *://*.koanchay.org/truyen/*
// @match        *://koanchay.net/truyen/*
// @match        *://*.koanchay.net/truyen/*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==
//
// Không có quyền mạng nào: chương WikiCV vốn đã là tiếng Việt (convert), không cần dịch.
// Chạy chung trang với "Tải truyện Wikidich" và Name Desk: ba script dùng chung một bảng
// (tab TTS Reader · Download · Thư viện) và một cột nút, màu cyan của wikicv.

SITE = {
    id: 'wikicv',
    name: 'WikiCV',
    lang: 'vi',

    // Mục lục : /truyen/<slug>-<idTruyen>
    // Chương  : /truyen/<slug>/<slugChuong>-<idChuong>   (cùng cách tách với script tải truyện)
    isChapter: function () { return location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).length >= 3; },

    // Thứ tự giống script tải truyện: khối nội dung thật là #bookContentBody, hai cái sau là dự phòng.
    contentSel: '#bookContentBody || .content-body-wrapper || #bookContent',
    // #bookContent có HAI p.book-title: cái đầu là tên truyện, cái sau là tên chương (đo 2026-10-09
    // trên wikicv.org). Lấy cái khác tên truyện; không có thì cắt <title> "Tên truyện - Chương N".
    title: function () {
        var ps = Array.prototype.slice.call(document.querySelectorAll('#bookContent .book-title'));
        var book = ps[0] ? clean(ps[0].textContent) : '';
        for (var i = 1; i < ps.length; i++) {
            var t = clean(ps[i].textContent);
            if (t && t !== book) return { el: ps[i], text: t };
        }
        var dt = clean(document.title.split(/\s[-–|]\s/).slice(1).join(' - '));
        return dt ? { el: null, text: dt } : null;
    },
    // Trang chương không có ảnh bìa (không có og:image, đo 2026-10-09) → mini-player hiện bản không bìa.
    // Nút "Chương sau" có id cố định. Script tải truyện sửa lại href của nút này theo mục lục
    // khi chạy cùng trang, nên đọc href lúc cần (không lưu sẵn) là luôn đúng.
    nextSel: '#btnNextChapter',
    waitMs: 15000,
    minText: 80,

    tr: null,
    defaults: { maxChars: 240 },

    help: [
        '• Đọc khối nội dung #bookContentBody của trang chương.',
        '• Tự qua chương theo nút "Chương sau" (#btnNextChapter). Có cài "Tải truyện Wikidich" thì nút này được sửa theo mục lục, nên chương cuối dừng đúng chỗ.',
        '• Chữ trên WikiCV đã là bản convert tiếng Việt, nên không có bước dịch.',
        '• Trang chương WikiCV không có ảnh bìa, nên mini-player hiện bản không bìa.'
    ].join('\n')
};

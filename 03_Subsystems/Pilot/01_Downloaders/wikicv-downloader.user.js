// ==UserScript==
// @name         Tải truyện Wikidich
// @namespace    aurelysn.wikidich-downloader
// @version      2.5.0
// @description  Tải hàng loạt chương từ trang mục lục wikidich/dichtienghoa: chọn khoảng chương, xuất TXT gộp, EPUB hoặc ZIP. Gom link gốc (Link sưu tầm + văn án), tải bộ name đang dùng kèm thông tin truyện. Kèm sửa nút "Chương trước / Chương sau" bị sai slug trên trang chương.
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
// @grant        none
// ==/UserScript==

/*  ─────────────────────────────────────────────────────────────
    CÁCH DÙNG
    1. Cài Tampermonkey / Violentmonkey → New script → dán file này → Ctrl+S.
    2. Mở trang MỤC LỤC (vd: /truyen/vongola-dai-khong-akHhlGHe7C_vhrOV)
       → góc phải dưới hiện nút "⬇ Tải truyện".
    3. Chọn khoảng chương + định dạng → "Bắt đầu".
    4. Trên trang CHƯƠNG, script tự sửa nút "Chương trước / Chương sau" theo
       đúng danh sách mục lục. Không cần mở mục lục trước: nếu chưa có cache
       thì script tự nạp mục lục một lần ở nền.

    Cấu trúc trang được hỗ trợ:
      Mục lục : .volume-list  >  .row  >  h5.volume-name  +  li.chapter-name > a
      Chương  : #bookContentBody  (fallback: .content-body-wrapper / #bookContent)

    ── THAY ĐỔI 2.4.0 ────────────────────────────────────────────
    Giao diện vào tab "Download" của bảng chung (shared/ui-kit.js), theo bản
    thiết kế 00_Layout: thẻ "Tải chương truyện", "Link gốc" (lấy + sao chép),
    "Name" (mở Name Desk, tải name). Bỏ nút "⬇ Tải truyện" và bảng trắng riêng.
    Hai nút "🔗 Link gốc" / "⬇ Tải Name" cạnh nút Link của trang vẫn giữ.
    Engine tải, mục lục, sửa nút điều hướng: giữ nguyên.

    ── THAY ĐỔI 2.3.0 ────────────────────────────────────────────
    Gộp script "WikiCV — Link gốc & tải Name" 1.0.0 vào đây (hai script
    cùng chạy trên trang mục lục là thừa). Chỉ ĐỌC từ đúng các chỗ mà nút
    "Link" và "Name" của trang tự gọi: /linksuutam/…, /book-name-list, /name-list.
      • Nút "🔗 Link gốc" cạnh nút Link: gom link từ Link sưu tầm + văn án,
        bỏ lớp /redirect?u=. Link trong văn án trỏ thẳng ra ngoài luôn.
      • Nút "⬇ Tải Name": các bộ name đang tick (không bộ nào tick → tất cả)
        + thông tin truyện + link gốc + văn án, ra "WIKIDICH-<mã>-<tên>-names.txt".
        Dòng thông tin bắt đầu bằng "#" để dán vào ô gộp name không bị lẫn.
      • Tải truyện: ô "Kèm thông tin truyện" — TXT có phần đầu đủ Hán Việt,
        tác giả, tình trạng, thể loại, link gốc, văn án; EPUB/ZIP có thêm
        một mục "Thông tin truyện" ở đầu.
      • Sửa: tên truyện trên wikicv nằm ở .cover-info h2, không phải h1 →
        2.2.1 lấy tên từ <title> của tab. Tác giả cũng lấy từ trang mục lục
        thay vì chờ đọc được ở trang chương.
    Bản raw tiếng Trung (đo 2026-09-27): trang chương chỉ có "vi" và "cv"
    (?t=cv). zh/raw/origin… máy chủ đều trả bản Việt, HTML không có chữ Hán.
    Muốn raw thì đi theo link gốc.

    ── THAY ĐỔI 2.2.1 ────────────────────────────────────────────
    Sửa sau khi chạy thật 113 chương trên wikicv.org (2026-09-06)
      • @match: thêm wikicv.org. 2.2.0 siết còn wikidich/dichtienghoa là
        siết quá tay — domain đang dùng thật không nằm trong đó.
      • 503: 11/113 chương hỏng. Ngân sách retry cho lỗi bị-chặn tách
        riêng (5 lượt, giãn 3→30s + jitter) thay vì dùng chung 3 lượt với
        lỗi thường, và cuối lượt có một pass quét lại các chương lỗi bằng
        1 luồng. Cache trong phiên nên pass này chỉ tải phần đã hỏng.
      • Panel dùng Shadow DOM: CSS của site làm <select> và checkbox tàng
        hình hoàn toàn trong 2.2.0 — không chọn được định dạng hay bản dịch.
      • Tiêu đề: mục lục chỉ cho "Chương 1" trong khi trang chương có tên
        đủ, nên 102/113 chương bị heading cụt và thân bài lặp lại tên.
        Giờ lấy tên dài hơn, và cắt dòng đầu nếu nó lặp tiêu đề.

    ── THAY ĐỔI 2.2.0 ────────────────────────────────────────────
    Sửa lỗi
      • @match giới hạn đúng 2 domain (2.1.0 chạy trên MỌI site có /truyen/).
      • Bỏ credentials:'include' — same-origin không cần, và nó từng gửi
        cookie sang domain lạ do @match rộng.
      • Escape tên phần/quyển trước khi dựng <option> (DOM injection).
      • Bỏ selector a[href*="phan-"] — nó bắt nhầm link chương thường và
        ở chương cuối thì xoá href của loạt link vô can.
      • Cache mục lục có TTL + version; trước đây trường `at` ghi mà không đọc.
      • Dọn localStorage theo LRU khi đầy, thay vì nuốt lỗi im lặng.
      • Retry phân biệt lỗi vĩnh viễn (404/410/khoá) với lỗi tạm; tôn trọng
        429 + Retry-After và hạ luồng khi bị chặn.
      • Lọc ký tự control trước khi ghi XHTML (EPUB hỏng khi reader parse).
      • Khoảng chương của phần/quyển tính theo chỉ số, không theo tên —
        hai quyển trùng tên không còn gộp sai.
      • Tra cache theo nhiều khoá + quét dự phòng, hết phụ thuộc vào việc
        slug trang chương có khớp slug mục lục hay không.
    Tối ưu
      • ZIP/EPUB nén deflate (CompressionStream), tự lùi về store nếu không có.
      • ZIP64 khi vượt 65535 entry hoặc 4GB.
      • navMap EPUB lồng cây: chương nằm trong phần.
      • Mục lục lazy-load: chờ bằng MutationObserver thay vì bỏ cuộc im lặng.
      • Cache chương trong phiên → bấm "Bắt đầu" lại chỉ tải phần còn thiếu.
      • Nút "Dừng" huỷ request đang bay bằng AbortController.
    ───────────────────────────────────────────────────────────── */

(function () {
  'use strict';

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

  /* ========================= CẤU HÌNH ========================= */
  const CFG = {
    // mục lục
    volumeRowSel: '.volume-list .row',
    volumeNameSel: 'h5.volume-name, .volume-name',
    chapterLinkSel: 'li.chapter-name > a[href], li.chapter-name a.truncate[href]',
    // trang chương
    // thử lần lượt theo thứ tự (không dùng selector-list vì trình duyệt chọn theo
    // thứ tự xuất hiện trong DOM chứ không theo thứ tự ưu tiên mình viết)
    contentSels: ['#bookContentBody', '.content-body-wrapper', '#bookContent'],
    titleSel: '#bookContent .book-title',
    junkSel: 'script,style,iframe,ins,.adsbygoogle,.tpm-unit,[id^="tpads"],[id^="div-gpt"],.book-title',
    junkTextRe: /^\s*(quảng cáo|advertisement)\s*$/i,
    defaultConcurrency: 3,
    defaultDelay: 300,   // ms nghỉ sau mỗi chương của một luồng
    retry: 3,            // lỗi thường (mạng, nội dung rỗng)
    // Lỗi bị-chặn (429/503) cần ngân sách riêng: đo trên wikicv.org, 3 lượt
    // trong ~6 giây là quá ngắn — server hạ tải theo cửa sổ dài hơn thế nhiều.
    retryThrottle: 5,
    throttleBackoff: [3000, 7000, 15000, 30000, 45000],
    sweepDelay: 1500,    // pass quét lại chương lỗi: 1 luồng, nghỉ dài
    waitDomMs: 15000,    // chờ mục lục render (lazy-load) trước khi bỏ cuộc
    cacheTtlMs: 7 * 24 * 60 * 60 * 1000,
    cacheMax: 12,        // số truyện giữ trong localStorage
  };

  /* ========================= TIỆN ÍCH ========================= */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n, w = 4) => String(n).padStart(w, '0');

  function safeName(s) {
    return (s || 'truyen')
      .replace(/[\\/:*?"<>|\n\r\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 120);
  }

  function xmlEsc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function uuid() {
    if (crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  /** Chờ selector xuất hiện (mục lục render bằng JS sau document-idle). */
  function waitFor(sel, ms) {
    const now = $(sel);
    if (now) return Promise.resolve(now);
    return new Promise((resolve) => {
      let done = false;
      const finish = (el) => {
        if (done) return;
        done = true;
        obs.disconnect();
        clearTimeout(timer);
        resolve(el);
      };
      const obs = new MutationObserver(() => {
        const el = $(sel);
        if (el) finish(el);
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      const timer = setTimeout(() => finish(null), ms);
    });
  }

  /* ================== NHẬN DIỆN LOẠI TRANG ================== */
  // Mục lục : /truyen/<slug>-<idTruyen>
  // Chương  : /truyen/<slug>/<slugChuong>-<idChuong>
  function parsePath(pathname = location.pathname) {
    let p;
    try { p = decodeURIComponent(pathname); } catch (e) { p = pathname; }
    p = p.replace(/\/+$/, '');
    const seg = p.split('/').filter(Boolean); // ['truyen', ...]
    if (seg[0] !== 'truyen' || seg.length < 2) return null;
    if (seg.length >= 3) {
      return { kind: 'chapter', bookKey: seg[1], chapterKey: seg[2], id: tailId(seg[2]) };
    }
    return { kind: 'toc', bookKey: seg[1], id: tailId(seg[1]) };
  }

  const tailId = (s) => {
    const i = s.lastIndexOf('-');
    return i < 0 ? s : s.slice(i + 1);
  };
  const stripId = (s) => {
    const i = s.lastIndexOf('-');
    return i < 0 ? s : s.slice(0, i);
  };

  /**
   * Mọi khoá có thể trỏ tới cùng một truyện. Trang mục lục và trang chương
   * không luôn dùng cùng dạng slug (có / không có id ở đuôi), nên lưu và tra
   * theo cả hai — 2.1.0 lưu bằng stripId() rồi tra bằng slug thô nên trượt.
   */
  const bookKeys = (bookKey) => {
    const k = [bookKey];
    const s = stripId(bookKey);
    if (s && s !== bookKey) k.push(s);
    return k;
  };

  /* ================ ĐỌC & LƯU MỤC LỤC ================ */
  /**
   * Trả về mảng {i, title, href, id, volume, volIdx, isVolume}
   * isVolume = dòng đánh dấu tên phần/quyển (không có nội dung).
   * volIdx   = chỉ số phần, dùng thay cho tên phần khi tính khoảng chương
   *            (hai quyển trùng tên từng bị gộp thành một khoảng sai).
   */
  function readTOC(doc = document) {
    const items = [];
    let rows = $$(CFG.volumeRowSel, doc);
    if (!rows.length) rows = [doc.body];
    let volIdx = -1;

    rows.forEach((row) => {
      const vEl = $(CFG.volumeNameSel, row);
      const vName = vEl ? vEl.textContent.replace(/\s+/g, ' ').trim() : '';
      const links = $$(CFG.chapterLinkSel, row).filter((a) => {
        const h = a.getAttribute('href') || '';
        return h && h !== '#' && h !== '#!' && /\/truyen\//.test(h);
      });
      if (!links.length) return;
      if (vName) {
        volIdx++;
        items.push({ i: items.length, title: vName, href: '', id: '', volume: vName, volIdx, isVolume: true });
      }
      const vi = volIdx;
      links.forEach((a) => {
        let href;
        try { href = new URL(a.getAttribute('href'), location.href).href; } catch (e) { return; }
        let title = (a.getAttribute('title') || a.textContent || '').replace(/\s+/g, ' ').trim();
        if (!title) title = 'Chương ' + (items.length + 1);
        items.push({
          i: items.length,
          title,
          href,
          id: chapterIdOf(href),
          volume: vName,
          volIdx: vi,
          isVolume: false,
        });
      });
    });

    // gỡ trùng theo link chương (một số trang lặp danh sách ở bản mobile + desktop).
    const seen = new Set();
    const out = [];
    for (const it of items) {
      if (it.isVolume) { out.push(it); continue; }
      if (seen.has(it.href)) continue;
      seen.add(it.href);
      out.push(it);
    }
    // bỏ dòng tên phần rỗng (không còn chương nào phía sau nó)
    const kept = out.filter((it, k) => !it.isVolume || (out[k + 1] && !out[k + 1].isVolume));
    kept.forEach((it, k) => { it.i = k; });
    return kept;
  }

  function chapterIdOf(href) {
    try {
      const last = decodeURIComponent(new URL(href, location.href).pathname).split('/').filter(Boolean).pop();
      return last ? tailId(last) : '';
    } catch (e) { return ''; }
  }

  /* ---------------- localStorage: cache mục lục ---------------- */
  const LS_PREFIX = 'wdl_toc_';
  const CACHE_VER = 2;

  const lsKeys = () => {
    const out = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(LS_PREFIX)) out.push(k);
    }
    return out;
  };

  function readRecord(fullKey) {
    try {
      const raw = localStorage.getItem(fullKey);
      if (!raw) return null;
      const o = JSON.parse(raw);
      if (!o || o.v !== CACHE_VER || !Array.isArray(o.list)) return null;
      return o;
    } catch (e) { return null; }
  }

  /** Xoá bản hết hạn; nếu vẫn quá `cacheMax` thì bỏ bản cũ nhất (LRU theo `at`). */
  function pruneCache(keepKeys = []) {
    const now = Date.now();
    const rows = [];
    for (const k of lsKeys()) {
      const o = readRecord(k);
      if (!o) { localStorage.removeItem(k); continue; }
      if (now - (o.at || 0) > CFG.cacheTtlMs && !keepKeys.includes(k)) {
        localStorage.removeItem(k);
        continue;
      }
      rows.push({ k, at: o.at || 0 });
    }
    rows.sort((a, b) => a.at - b.at);
    while (rows.length > CFG.cacheMax) {
      const victim = rows.shift();
      if (keepKeys.includes(victim.k)) { rows.push(victim); continue; }
      localStorage.removeItem(victim.k);
    }
    return rows.length;
  }

  /**
   * Lưu dưới MỌI khoá của truyện, để trang chương tra được bất kể slug dạng nào.
   * Trả về true/false — 2.1.0 nuốt lỗi quota im lặng, gọi xong không biết hỏng.
   */
  function saveTOC(keys, items, title) {
    const payload = JSON.stringify({
      v: CACHE_VER,
      t: title,
      at: Date.now(),
      list: items.map((x) => [x.title, x.href, x.isVolume ? 1 : 0]),
    });
    const full = keys.map((k) => LS_PREFIX + k);
    pruneCache(full);
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        full.forEach((k) => localStorage.setItem(k, payload));
        return true;
      } catch (e) {
        // hết quota: bỏ bản cũ nhất rồi thử lại
        const others = lsKeys().filter((k) => !full.includes(k));
        if (!others.length) return false;
        let oldest = others[0], oldestAt = Infinity;
        for (const k of others) {
          const o = readRecord(k);
          const at = o ? (o.at || 0) : 0;
          if (at < oldestAt) { oldestAt = at; oldest = k; }
        }
        localStorage.removeItem(oldest);
      }
    }
    return false;
  }

  function hydrate(o) {
    return {
      title: o.t,
      at: o.at,
      list: o.list.map(([title, href, v], i) => ({
        i, title, href,
        isVolume: !!v,
        id: href ? chapterIdOf(href) : '',
      })),
    };
  }

  /**
   * Tra theo từng khoá; nếu trượt hết thì quét các bản đã lưu tìm bản nào
   * thật sự chứa URL hiện tại. Quét chỉ chạy khi đã miss nên không tốn gì
   * ở đường đi thường.
   */
  function loadTOC(keys, matchHref) {
    const now = Date.now();
    for (const k of keys) {
      const o = readRecord(LS_PREFIX + k);
      if (o && now - (o.at || 0) <= CFG.cacheTtlMs) return hydrate(o);
    }
    if (!matchHref) return null;
    let path;
    try { path = decodeURIComponent(new URL(matchHref).pathname); } catch (e) { return null; }
    for (const k of lsKeys()) {
      const o = readRecord(k);
      if (!o || now - (o.at || 0) > CFG.cacheTtlMs) continue;
      const hit = o.list.some(([, href]) => {
        if (!href) return false;
        try { return decodeURIComponent(new URL(href).pathname) === path; } catch (e) { return false; }
      });
      if (hit) return hydrate(o);
    }
    return null;
  }

  /* ================= TRÍCH XUẤT NỘI DUNG ================= */
  function pickBox(doc = document) {
    for (const s of CFG.contentSels) {
      const el = $(s, doc);
      if (el) return el;
    }
    return null;
  }

  function extractText(box) {
    const c = box.cloneNode(true);
    $$(CFG.junkSel, c).forEach((e) => e.remove());
    $$('p,div,span', c).forEach((e) => {
      if (e.children.length === 0 && CFG.junkTextRe.test(e.textContent || '')) e.remove();
    });

    const parts = [];
    (function walk(node) {
      for (const n of node.childNodes) {
        if (n.nodeType === 3) {
          parts.push(n.nodeValue);
        } else if (n.nodeType === 1) {
          const tag = n.tagName.toLowerCase();
          if (tag === 'br') { parts.push('\n'); continue; }
          const block = /^(p|div|h[1-6]|li|blockquote|section|article|tr)$/.test(tag);
          if (block) parts.push('\n');
          walk(n);
          if (block) parts.push('\n');
        }
      }
    })(c);

    return tidy(parts.join(''));
  }

  function tidy(t) {
    return String(t)
      .replace(/ /g, ' ')
      .replace(/\r/g, '')
      // ký tự control không hợp lệ trong XML — để lọt là EPUB hỏng lúc reader
      // parse, không phải lúc tải, nên rất khó truy
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .split('\n')
      .map((l) => l.replace(/[ \t]+/g, ' ').trim())
      .join('\n')
      .replace(/[ \t]+([,.;:!?…%”’)\]}])/g, '$1')
      .replace(/([(“‘\[{])[ \t]+/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function looksLocked(doc) {
    const t = (doc.body && doc.body.textContent) || '';
    return /vui lòng đăng nhập|cần đăng nhập|chương vip|mua chương|chưa được dịch|không tìm thấy/i.test(t);
  }

  function pickTitle(doc, fallback) {
    // thứ tự thường gặp: [tên truyện, tên chương, "Tác giả: ..."]
    const ts = $$(CFG.titleSel, doc)
      .map((e) => e.textContent.replace(/\s+/g, ' ').trim())
      .filter((s) => s && !/^tác giả\s*:/i.test(s));
    // tên chương = dòng thứ 2 (dòng đầu là tên truyện); nếu chỉ có 1 dòng thì không đoán
    return ts[1] || fallback;
  }

  /**
   * Mục lục và trang chương không nhất quán: đo trên wikicv.org, mục lục chỉ
   * cho "Chương 1" còn trang chương có "Chương 1 Mikoto, một khoản...". 2.2.0
   * luôn ưu tiên mục lục nên 102/113 chương có heading cụt. Lấy tên nào chứa
   * tên kia và dài hơn; nếu hai tên rời nhau thì giữ mục lục (thứ tự đáng tin).
   */
  const normTitle = (s) => (s || '').replace(/\s+/g, ' ').trim();
  function mergeTitle(tocTitle, pageTitle) {
    const a = normTitle(tocTitle), b = normTitle(pageTitle);
    if (!a) return b;
    if (!b) return a;
    const ka = a.toLowerCase(), kb = b.toLowerCase();
    if (kb.startsWith(ka) || kb.includes(ka)) return b.length > a.length ? b : a;
    return a;
  }

  /** Bỏ dòng đầu thân bài khi nó chỉ lặp lại tiêu đề vừa in ngay phía trên. */
  function stripLeadTitle(text, title) {
    const t = normTitle(title);
    if (!t) return text;
    const nl = text.indexOf('\n');
    const first = normTitle(nl < 0 ? text : text.slice(0, nl));
    if (first && first.toLowerCase() === t.toLowerCase()) {
      return nl < 0 ? '' : text.slice(nl + 1).replace(/^\n+/, '');
    }
    return text;
  }

  function pickAuthor(doc) {
    const ts = $$(CFG.titleSel, doc).map((e) => e.textContent.replace(/\s+/g, ' ').trim());
    const a = ts.find((s) => /^tác giả\s*:/i.test(s));
    return a ? a.replace(/^tác giả\s*:\s*/i, '').trim() : '';
  }

  /* ---------------- tải chương ---------------- */
  class PermanentError extends Error {}
  /** 429/503: server bảo "chậm lại", khác hẳn lỗi mạng — đếm ngân sách riêng. */
  class ThrottleError extends Error {}

  /** Bị chặn thì MỌI luồng cùng nằm im tới mốc này, không riêng luồng dính. */
  const throttle = { until: 0 };
  const waitThrottle = async (signal) => {
    // chia nhỏ để bấm "Dừng" không phải chờ hết 45 giây
    while (throttle.until > Date.now()) {
      if (signal && signal.aborted) return;
      await sleep(Math.min(500, throttle.until - Date.now()));
    }
  };

  const chapCache = new Map(); // href|mode -> {text,title,author} (sống trong phiên)

  async function fetchChapter(url, mode, signal) {
    const ck = url + '|' + mode;
    if (chapCache.has(ck)) return chapCache.get(ck);

    const u = new URL(url);
    if (mode === 'cv') u.searchParams.set('t', 'cv');
    let lastErr;
    let soft = 0;   // lượt đã dùng cho lỗi thường
    let hard = 0;   // lượt đã dùng cho lỗi bị-chặn

    while (soft < CFG.retry && hard < CFG.retryThrottle) {
      if (signal && signal.aborted) throw new PermanentError('đã dừng');
      try {
        await waitThrottle(signal);
        if (signal && signal.aborted) throw new PermanentError('đã dừng');
        const res = await fetch(u.href, { signal });
        if (res.status === 429 || res.status === 503) {
          const ra = parseFloat(res.headers.get('Retry-After') || '');
          const base = CFG.throttleBackoff[Math.min(hard, CFG.throttleBackoff.length - 1)];
          // jitter: 3 luồng cùng dính 503 mà cùng thức dậy một lúc là dính lại ngay
          const waitMs = Number.isFinite(ra)
            ? Math.min(ra * 1000, 60000)
            : base + Math.random() * base * 0.4;
          throttle.until = Math.max(throttle.until, Date.now() + waitMs);
          throw new ThrottleError('bị chặn tạm thời (' + res.status + ')');
        }
        // 404/403/410: thử lại cũng vẫn thế, đừng đốt lượt
        if (res.status === 404 || res.status === 403 || res.status === 410) {
          throw new PermanentError('HTTP ' + res.status);
        }
        if (!res.ok) throw new Error('HTTP ' + res.status);

        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const box = pickBox(doc);
        if (!box) {
          if (looksLocked(doc)) throw new PermanentError('chương bị khoá / không xem được');
          throw new Error('không tìm thấy nội dung');
        }
        const text = extractText(box);
        if (!text || text.length < 20) throw new Error('nội dung rỗng');

        const out = { text, title: pickTitle(doc, ''), author: pickAuthor(doc) };
        chapCache.set(ck, out);
        return out;
      } catch (e) {
        if (e instanceof PermanentError) throw e;
        if (e && e.name === 'AbortError') throw new PermanentError('đã dừng');
        lastErr = e;
        if (e instanceof ThrottleError) {
          hard++;   // đã ngủ trong throttle.until rồi, không sleep thêm
        } else {
          soft++;
          if (soft < CFG.retry) await sleep(600 * Math.pow(2, soft - 1));
        }
      }
    }
    throw lastErr || new Error('không rõ lỗi');
  }

  /* ========================= ZIP ========================= */
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  const ENC = new TextEncoder();
  const HAS_CS = typeof CompressionStream === 'function';

  /** Nén deflate-raw; null nghĩa là không nén được → ghi store. */
  async function deflateRaw(bytes) {
    if (!HAS_CS || bytes.length < 256) return null;
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
      const buf = await new Response(stream).arrayBuffer();
      const out = new Uint8Array(buf);
      return out.length < bytes.length ? out : null;
    } catch (e) { return null; }
  }

  function dosTime(d = new Date()) {
    return {
      time: ((d.getHours() << 11) | (d.getMinutes() << 5) | ((d.getSeconds() / 2) | 0)) & 0xffff,
      date: (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff,
    };
  }

  /**
   * files: [{name, data: Uint8Array, store?: bool}] -> Blob
   * Nén deflate khi có CompressionStream; `store:true` ép ghi thô (EPUB bắt buộc
   * cho entry `mimetype`). Tự chuyển ZIP64 khi vượt giới hạn 16/32-bit.
   */
  async function makeZip(files, mime = 'application/zip') {
    const { time, date } = dosTime();
    const chunks = [];
    const central = [];
    let offset = 0;

    for (const f of files) {
      const nameBytes = ENC.encode(f.name);
      const crc = crc32(f.data);
      const size = f.data.length;
      const packed = f.store ? null : await deflateRaw(f.data);
      const body = packed || f.data;
      const method = packed ? 8 : 0;

      const lh = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(lh.buffer);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true); // UTF-8
      lv.setUint16(8, method, true);
      lv.setUint16(10, time, true);
      lv.setUint16(12, date, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, body.length, true);
      lv.setUint32(22, size, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);
      lh.set(nameBytes, 30);

      chunks.push(lh, body);

      const ch = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(ch.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, method, true);
      cv.setUint16(12, time, true);
      cv.setUint16(14, date, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, body.length, true);
      cv.setUint32(24, size, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint32(42, Math.min(offset, 0xffffffff), true);
      ch.set(nameBytes, 46);
      central.push(ch);

      offset += lh.length + body.length;
    }

    const centralSize = central.reduce((s, c) => s + c.length, 0);
    const tail = [];
    const need64 = files.length > 0xffff || offset > 0xffffffff || centralSize > 0xffffffff;

    if (need64) {
      const z64 = new Uint8Array(56);
      const zv = new DataView(z64.buffer);
      zv.setUint32(0, 0x06064b50, true);
      zv.setBigUint64(4, 44n, true);
      zv.setUint16(12, 45, true);
      zv.setUint16(14, 45, true);
      zv.setUint32(16, 0, true);
      zv.setUint32(20, 0, true);
      zv.setBigUint64(24, BigInt(files.length), true);
      zv.setBigUint64(32, BigInt(files.length), true);
      zv.setBigUint64(40, BigInt(centralSize), true);
      zv.setBigUint64(48, BigInt(offset), true);

      const loc = new Uint8Array(20);
      const lv2 = new DataView(loc.buffer);
      lv2.setUint32(0, 0x07064b50, true);
      lv2.setUint32(4, 0, true);
      lv2.setBigUint64(8, BigInt(offset + centralSize), true);
      lv2.setUint32(16, 1, true);

      tail.push(z64, loc);
    }

    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, need64 ? 0xffff : files.length, true);
    ev.setUint16(10, need64 ? 0xffff : files.length, true);
    ev.setUint32(12, need64 ? 0xffffffff : centralSize, true);
    ev.setUint32(16, need64 ? 0xffffffff : offset, true);
    tail.push(end);

    return new Blob(chunks.concat(central, tail), { type: mime });
  }

  /* ========================= EPUB ========================= */
  async function buildEpub(bookTitle, author, chapters) {
    const id = 'urn:uuid:' + uuid();
    const files = [];
    const push = (name, str) => files.push({ name, data: ENC.encode(str) });

    // `mimetype` phải là entry đầu và KHÔNG được nén
    files.push({ name: 'mimetype', data: ENC.encode('application/epub+zip'), store: true });

    push('META-INF/container.xml',
      `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);

    push('OEBPS/style.css',
      `body{font-family:serif;line-height:1.6;margin:1em}
h1,h2{text-align:center;line-height:1.35}
p{text-indent:1.2em;margin:.35em 0;text-align:justify}
.part{margin-top:35%;font-size:1.5em}`);

    const manifest = [];
    const spine = [];
    // navMap lồng cây: chương nằm trong phần thay vì phẳng cùng cấp
    const tree = [];
    let order = 0;

    chapters.forEach((c, n) => {
      const fname = `c${pad(n + 1)}.xhtml`;
      const cls = c.isVolume ? ' class="part"' : '';
      const body = c.isVolume
        ? ''
        : c.text.split(/\n{2,}/).map((p) => `<p>${xmlEsc(p).replace(/\n/g, '<br/>')}</p>`).join('\n');
      push('OEBPS/' + fname,
        `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="vi">
<head><meta charset="utf-8"/><title>${xmlEsc(c.title)}</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body><h1${cls}>${xmlEsc(c.title)}</h1>
${body}
</body></html>`);
      manifest.push(`<item id="c${n + 1}" href="${fname}" media-type="application/xhtml+xml"/>`);
      spine.push(`<itemref idref="c${n + 1}"/>`);

      const node = { title: c.title, file: fname, order: ++order, kids: [] };
      if (c.isVolume) tree.push(node);
      else if (tree.length && tree[tree.length - 1].kids) tree[tree.length - 1].kids.push(node);
      else tree.push(node);
    });

    const navXml = (nodes) => nodes.map((nd) =>
      `<navPoint id="np${nd.order}" playOrder="${nd.order}"><navLabel><text>${xmlEsc(nd.title)}</text></navLabel><content src="${nd.file}"/>` +
      (nd.kids && nd.kids.length ? '\n' + navXml(nd.kids) + '\n' : '') +
      `</navPoint>`).join('\n');

    push('OEBPS/toc.ncx',
      `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
<head><meta name="dtb:uid" content="${id}"/><meta name="dtb:depth" content="2"/></head>
<docTitle><text>${xmlEsc(bookTitle)}</text></docTitle>
<navMap>
${navXml(tree)}
</navMap>
</ncx>`);

    push('OEBPS/content.opf',
      `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="BookId">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
  <dc:title>${xmlEsc(bookTitle)}</dc:title>
  <dc:creator opf:role="aut">${xmlEsc(author || 'Không rõ')}</dc:creator>
  <dc:language>vi</dc:language>
  <dc:identifier id="BookId">${id}</dc:identifier>
  <dc:date>${new Date().toISOString().slice(0, 10)}</dc:date>
</metadata>
<manifest>
  <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  <item id="css" href="style.css" media-type="text/css"/>
${manifest.join('\n')}
</manifest>
<spine toc="ncx">
${spine.join('\n')}
</spine>
</package>`);

    return makeZip(files, 'application/epub+zip');
  }

  /* ========================= TẢI FILE ========================= */
  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  /* ============ THÔNG TIN TRUYỆN · LINK GỐC · NAME (2.3.0) ============ */
  const clean = (s) => String(s || '').replace(/[\s ]+/g, ' ').trim();

  /** Đọc khối .cover-info + .book-desc của trang mục lục (doc có thể là trang fetch về). */
  function readInfo(doc = document) {
    const box = $('.cover-info', doc);
    if (!box) return null;
    const ctx = parsePath();
    const info = {
      title: clean(($('h2', box) || {}).textContent),
      url: location.origin + location.pathname,
      slugId: ctx ? ctx.id : '',   // parsePath đã decode (~ thay cho %7E)
      bookId: ($('#bookId', doc) || {}).value || '',
      genres: [], desc: '',
    };
    const want = { 'Hán Việt': 'hanViet', 'Tác giả': 'author', 'Tình trạng': 'status', 'Mới nhất': 'latest', 'Thời gian đổi mới': 'updated' };
    $$('p', box).forEach((p) => {
      const m = clean(p.textContent).match(/^([^:]+):\s*(.+)$/);
      if (m && want[m[1].trim()]) info[want[m[1].trim()]] = m[2].trim();
    });
    const genreP = $$('.book-desc > p', doc).find((p) => /^\s*Thể loại\s*:/.test(p.textContent));
    if (genreP) info.genres = $$('a', genreP).map((a) => clean(a.textContent)).filter(Boolean);
    const desc = $('.book-desc-detail', doc);
    if (desc) info.desc = $$('p', desc).map((p) => clean(p.textContent)).filter(Boolean).join('\n');
    return info;
  }

  /** "/redirect?u=https%3A%2F%2F…" → "https://…"; link thường trả nguyên. */
  function unwrapRedirect(href) {
    try {
      const u = new URL(href, location.origin);
      if (/\/redirect$/.test(u.pathname) && u.searchParams.get('u')) return u.searchParams.get('u');
      return u.href;
    } catch (e) { return href; }
  }

  // Link ra ngoài trong văn án (thường là blog Lofter). Bỏ link nội bộ, diễn đàn, tìm kiếm.
  const LINK_NOISE = /(^|\.)(wikicv\.org|wikidich\.com|dichtienghoa\.com|google\.[a-z.]+|facebook\.com)$/i;
  function descLinks() {
    const out = [];
    $$('.book-desc a[href]').forEach((a) => {
      const raw = a.getAttribute('href') || '';
      if (!/redirect\?u=|^https?:/i.test(raw)) return;
      const url = unwrapRedirect(raw);
      let host = '';
      try { host = new URL(url).hostname; } catch (e) { return; }
      if (LINK_NOISE.test(host)) return;
      out.push({ url, label: clean(a.textContent) || host, from: 'văn án' });
    });
    return out;
  }

  // Trang Link sưu tầm dựng sẵn mỗi link trong .link-element (theo link-collection.min.js
  // của site): chữ .link-element-link = link gốc, href = bản qua trình dịch; .link-element-desc = ghi chú.
  async function collectedLinks() {
    const a = $('a[href^="/linksuutam/"]');
    if (!a) return [];
    const r = await fetch(a.href);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
    return $$('.link-element', doc).map((el) => {
      const l = $('.link-element-link', el);
      const text = clean(l && l.textContent);
      const url = /^https?:\/\//i.test(text) ? text : unwrapRedirect((l && l.getAttribute('href')) || '');
      return { url, label: clean(($('.link-element-desc', el) || {}).textContent), from: 'Link sưu tầm' };
    }).filter((x) => x.url);
  }

  let linkCache = null;
  async function getLinks() {
    if (linkCache) return linkCache;
    let collected = [], err = '';
    try { collected = await collectedLinks(); } catch (e) { err = e.message; }
    const seen = new Set();
    const list = collected.concat(descLinks()).filter((x) => {
      const k = x.url.replace(/\/+$/, '').toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k); return true;
    });
    linkCache = { list, err };
    return linkCache;
  }

  /** Link /redirect trong văn án → trỏ thẳng ra ngoài (khỏi qua trang "Bấm vào liên kết…"). */
  function directifyDesc() {
    $$('.book-desc a[href*="redirect?u="]').forEach((a) => {
      const url = unwrapRedirect(a.getAttribute('href'));
      if (!/^https?:/i.test(url)) return;
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.title = url;
    });
  }

  /** /book-name-list trả HTML các bộ name; bộ đang dùng = checkbox đang tick. */
  async function nameLists(bookId) {
    const r = await fetch('/book-name-list?bookId=' + encodeURIComponent(bookId));
    if (!r.ok) throw new Error('book-name-list HTTP ' + r.status);
    const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
    return $$('.name-list', doc).map((row) => {
      const cb = $('input[name="nameListId"]', row);
      return {
        id: cb ? cb.value : '',
        checked: !!(cb && cb.hasAttribute('checked')),
        personal: !!(cb && cb.getAttribute('data-indiv') === '1'),
        name: clean(($('.list-name', row) || {}).textContent) || (cb ? cb.value : ''),
      };
    }).filter((l) => l.id);
  }

  /** /name-list trả JSON { data: { content: "<ul><li data-ncn data-nvi>…" }, err: 0 }. */
  async function namesOf(bookId, listId) {
    const r = await fetch('/name-list?bookId=' + encodeURIComponent(bookId) + '&id=' + encodeURIComponent(listId));
    if (!r.ok) throw new Error('name-list HTTP ' + r.status);
    const j = await r.json();
    if (j.err !== 0 || !j.data) throw new Error('name-list báo lỗi ' + j.err);
    const doc = new DOMParser().parseFromString(j.data.content || '', 'text/html');
    return $$('li[data-ncn]', doc).map((li) => ({ cn: li.getAttribute('data-ncn') || '', vi: li.getAttribute('data-nvi') || '' }))
      .filter((n) => n.cn);
  }

  function nowReadable() {
    const d = new Date(), p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  /** Các dòng thông tin truyện, dùng chung cho file name và phần đầu file truyện. */
  function infoLines(info, links) {
    const L = [info.title];
    if (info.hanViet) L.push('Hán Việt: ' + info.hanViet);
    if (info.author) L.push('Tác giả: ' + info.author);
    if (info.status) L.push('Tình trạng: ' + info.status);
    if (info.latest) L.push('Mới nhất: ' + info.latest);
    if (info.updated) L.push('Thời gian đổi mới: ' + info.updated);
    if (info.genres.length) L.push('Thể loại: ' + info.genres.join(', '));
    L.push('Wikicv: ' + info.url);
    links.forEach((l) => L.push('Link gốc: ' + l.url + (l.label && l.label !== l.url ? '  (' + l.label + ')' : '') + '  [' + l.from + ']'));
    if (!links.length) L.push('Link gốc: (chưa có)');
    if (info.desc) { L.push('', 'Văn án:'); info.desc.split('\n').forEach((d) => L.push('  ' + d)); }
    return L;
  }

  // Mọi dòng thông tin bắt đầu bằng "#" để khi dán cả file vào ô "gộp name"
  // (định dạng Tên gốc=Tên Việt) thì phần đầu không bị hiểu là name.
  function buildNameFile(info, links, lists) {
    const L = infoLines(info, links).map((l) => (l ? '# ' + l : '#'));
    L.push('#', '# Xuất lúc: ' + nowReadable());
    lists.forEach((l) => {
      L.push('', '# ===== ' + l.name + (l.personal ? ' (cá nhân)' : '') + ' — ' + l.names.length + ' name =====');
      l.names.forEach((n) => L.push(n.cn + '=' + n.vi));
    });
    return L.join('\n') + '\n';
  }

  function fileSafe(s) {
    return String(s || '').replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150).replace(/[. ]+$/, '') || 'Không rõ tên';
  }

  /** Hai nút cạnh nút "Link" của trang mục lục + khung hiện link gốc. */
  /** Tải các bộ name đang tick (không bộ nào tick → tất cả) + thông tin truyện + link gốc. */
  async function downloadNames(info) {
    const all = await nameLists(info.bookId);
    if (!all.length) throw new Error('truyện này chưa có bộ name nào');
    // "Đang dùng" = bộ đang tick; không bộ nào tick thì lấy hết
    let use = all.filter((l) => l.checked);
    if (!use.length) use = all;
    for (const l of use) l.names = await namesOf(info.bookId, l.id);
    const links = (await getLinks()).list;
    saveBlob(new Blob(['\ufeff' + buildNameFile(info, links, use)], { type: 'text/plain;charset=utf-8' }),
      'WIKIDICH-' + (info.slugId || info.bookId) + '-' + fileSafe(info.title) + '-names.txt');
    return { lists: use, total: all.length, count: use.reduce((s, l) => s + l.names.length, 0) };
  }

  function initBookExtras(info) {
    const linkBtn = $('a[href^="/linksuutam/"]');
    if (!linkBtn || !info) return;

    const css = document.createElement('style');
    css.textContent = `
      .wdl-x-btn{background:#fff3e0!important;border:1px solid #ffb74d!important;color:#555!important;margin-right:.7rem;
        text-transform:none!important;border-radius:5px!important;padding:0 1rem!important}
      .wdl-x-btn[disabled]{opacity:.55;pointer-events:none}
      .wdl-x-box{clear:both;margin:1rem 0 0;padding:.7rem .9rem;border:1px solid #78d3de;border-radius:8px;background:#f3fcfe;font-size:.95rem}
      .wdl-x-box b{color:#07a6c3}
      .wdl-x-box ul{margin:.4rem 0 0;padding-left:1.1rem}
      .wdl-x-box li{list-style:disc;margin:.25rem 0;word-break:break-all}
      .wdl-x-src{color:#888;font-size:.8rem;margin-left:.3rem}
      .wdl-x-copy{margin-left:.4rem;font-size:.8rem;cursor:pointer;color:#f57c00}
      .wdl-x-msg{color:#888;font-size:.85rem}
      @media (prefers-color-scheme:dark){.wdl-x-box{background:#10262b;border-color:#2b6c75}}`;
    document.head.appendChild(css);

    const mk = (text, title) => {
      const a = document.createElement('a');
      a.className = 'btn btn-flat left wdl-x-btn';
      a.href = '#!'; a.textContent = text; a.title = title;
      return a;
    };
    const btnName = mk('⬇ Tải Name', 'Tải các bộ name đang tick trong nút Name, kèm thông tin truyện và link gốc');
    const btnLink = mk('🔗 Link gốc', 'Gom link gốc từ Link sưu tầm và văn án');
    linkBtn.insertAdjacentElement('afterend', btnName);
    linkBtn.insertAdjacentElement('afterend', btnLink);

    const box = document.createElement('div');
    box.className = 'wdl-x-box';
    box.hidden = true;
    (linkBtn.parentElement || document.body).insertAdjacentElement('afterend', box);

    const renderLinks = (res) => {
      box.replaceChildren();
      const h = document.createElement('b'); h.textContent = 'Link gốc'; box.appendChild(h);
      const msg = (t) => { const d = document.createElement('div'); d.className = 'wdl-x-msg'; d.textContent = t; box.appendChild(d); };
      if (!res.list.length) {
        msg('Chưa có link nào trong Link sưu tầm hay văn án.' + (res.err ? ' (Không đọc được trang Link sưu tầm: ' + res.err + ')' : ''));
        return;
      }
      const ul = document.createElement('ul');
      res.list.forEach((l) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = l.url;
        const src = document.createElement('span');
        src.className = 'wdl-x-src';
        src.textContent = '— ' + (l.label && l.label !== l.url ? l.label + ' · ' : '') + l.from;
        const cp = document.createElement('span');
        cp.className = 'wdl-x-copy'; cp.textContent = 'chép';
        cp.onclick = () => navigator.clipboard.writeText(l.url)
          .then(() => { cp.textContent = 'đã chép'; }, () => { cp.textContent = 'không chép được'; });
        li.append(a, src, cp);
        ul.appendChild(li);
      });
      box.appendChild(ul);
      if (res.err) msg('Không đọc được trang Link sưu tầm (' + res.err + ') — chỉ có link từ văn án.');
    };

    btnLink.onclick = async (e) => {
      e.preventDefault();
      if (!box.hidden) { box.hidden = true; return; }
      box.hidden = false;
      box.textContent = 'Đang gom link…';
      renderLinks(await getLinks());
    };

    btnName.onclick = async (e) => {
      e.preventDefault();
      if (!info.bookId) { alert('Không thấy bookId trên trang — wikicv có thể đã đổi giao diện.'); return; }
      btnName.setAttribute('disabled', ''); btnName.textContent = '⬇ Đang tải…';
      try {
        const r = await downloadNames(info);
        btnName.textContent = '⬇ Đã tải ' + r.count + ' name';
      } catch (err) {
        alert('Tải name lỗi: ' + err.message);
        btnName.textContent = '⬇ Tải Name';
      } finally {
        btnName.removeAttribute('disabled');
        setTimeout(() => { btnName.textContent = '⬇ Tải Name'; }, 4000);
      }
    };

    directifyDesc();
  }

  /* ========================= GIAO DIỆN ========================= */
  // Tab "Download" của bảng chung. Giữ nguyên id cũ (#wdl-*) để phần chạy bên dưới
  // không phải đổi: các phần tử nằm trong shadow root riêng của tab, nên CSS của
  // wikicv không với tới được (2.2.0 từng làm <select> và checkbox tàng hình).
  const VERSION = '2.4.0';
  const TAB_CSS = KIT_CSS +
    '.info{background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;font-size:11.5px;line-height:1.5;margin:0 0 8px;white-space:pre-wrap;word-break:break-word;}' +
    '.f2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin:0 0 6px;}.f2 input{width:100%;}' +
    'select.full,input.full{width:100%;}' +
    '#wdl-log{background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;font-size:11px;line-height:1.5;margin:8px 0 0;max-height:160px;overflow:auto;white-space:pre-wrap;word-break:break-word;}' +
    '#wdl-log:empty{display:none;}#wdl-log .err{color:var(--k-err);}' +
    '.kvl{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:11px;margin:8px 0 0;}.kvl span:nth-child(odd){color:var(--k-muted);}.kvl span:nth-child(even){text-align:right;}' +
    '.help{white-space:pre-wrap;}';
  const HELP = [
    '• Mở trang MỤC LỤC của truyện — chọn khoảng chương (hoặc chọn nhanh theo phần/quyển), định dạng, bản dịch rồi "Bắt đầu".',
    '• Dừng giữa chừng vẫn xuất file; bấm "Bắt đầu" lại chỉ tải phần còn thiếu (cache trong phiên).',
    '• Link gốc: gom từ Link sưu tầm + văn án, bỏ lớp /redirect?u=.',
    '• Tải Name: các bộ name đang tick (không bộ nào tick → tất cả) + thông tin truyện + link gốc.',
    '• Mở Name Desk: cần script Name Desk đang bật trên trang.',
  ].join('\n');

  let dockPillRef = null;
  function buildUI(info) {
    const host = document.createElement('div');
    host.style.cssText = 'all:initial;display:block;';
    const root = host.attachShadow({ mode: 'open' });
    const s = document.createElement('style');
    s.textContent = TAB_CSS;
    root.appendChild(s);

    const p = document.createElement('div');
    p.className = 'kit';
    // Không nội suy dữ liệu từ trang vào đây. Tên phần/quyển đi qua new Option()
    // ở initTOCPage — 2.1.0 nhét thẳng vào innerHTML nên vỡ với tên có < hoặc ".
    p.innerHTML = `
      <div class="card hint help" id="wdl-help" style="display:none"></div>
      <div class="card">
        <h4>Tải chương truyện</h4>
        <div class="info" id="wdl-info"></div>
        <div id="wdl-volbox" style="display:none">
          <span class="lb">Chọn nhanh theo phần/quyển</span>
          <div class="row"><select id="wdl-volsel" class="full"></select></div>
        </div>
        <div class="f2">
          <div><span class="lb">Từ chương (STT)</span><input id="wdl-from" type="number" min="1" value="1"></div>
          <div><span class="lb">Đến chương (STT)</span><input id="wdl-to" type="number" min="1"></div>
        </div>
        <div class="hint" id="wdl-range" style="margin:0 0 8px"></div>
        <span class="lb">Định dạng</span>
        <div class="row"><select id="wdl-fmt" class="full">
          <option value="txt">1 file TXT gộp tất cả</option>
          <option value="epub">EPUB (đọc trên app / Kindle)</option>
          <option value="zip">ZIP — mỗi chương 1 file TXT</option>
        </select></div>
        <span class="lb">Bản dịch</span>
        <div class="row"><select id="wdl-mode" class="full">
          <option value="vi">Việt (mặc định)</option>
          <option value="cv">Hán Việt (?t=cv)</option>
        </select></div>
        <div class="f2">
          <div><span class="lb">Số luồng</span><input id="wdl-conc" type="number" min="1" max="8" value="${CFG.defaultConcurrency}"></div>
          <div><span class="lb">Nghỉ (ms)</span><input id="wdl-delay" type="number" min="0" step="50" value="${CFG.defaultDelay}"></div>
        </div>
        <div class="row"><label class="ck"><input type="checkbox" id="wdl-vol" checked> Giữ dòng tên phần/quyển</label></div>
        <div class="row"><label class="ck"><input type="checkbox" id="wdl-info-on" checked> Kèm thông tin truyện</label></div>
        <div class="hint" style="margin:-4px 0 8px">Gồm Hán Việt, thể loại, link gốc, văn án.</div>
        <div class="g2"><button class="btn pri" id="wdl-start">Bắt đầu</button><button class="btn" id="wdl-stop">Dừng</button></div>
        <div class="bar" id="wdl-bar"><i></i></div>
        <div id="wdl-log"></div>
      </div>
      <div class="card">
        <h4>Link gốc</h4>
        <div class="row"><input id="wdl-link" type="text" class="full" readonly placeholder="Chưa lấy link gốc"></div>
        <div class="g2"><button class="btn pri" id="wdl-link-get">Lấy link gốc</button><button class="btn" id="wdl-link-copy">Sao chép</button></div>
        <div class="hint" id="wdl-link-note"></div>
      </div>
      <div class="card">
        <h4>Name</h4>
        <div class="g2"><button class="btn pri" id="wdl-desk">Mở Name Desk</button><button class="btn sec" id="wdl-names">Tải Name</button></div>
        <div class="kvl" id="wdl-name-info"><span>Bộ name</span><span>—</span><span>Đang dùng</span><span>—</span></div>
      </div>`;
    root.appendChild(p);
    p.querySelector('#wdl-help').textContent = HELP;
    hubTab('ndl', 'Download', 20, VERSION).appendChild(host);
    document.addEventListener('aurel-hub:help', (e) => {
      if (e.detail !== 'ndl') return;
      const h = p.querySelector('#wdl-help');
      h.style.display = h.style.display === 'none' ? '' : 'none';
    });

    // ---- Link gốc ----
    const linkIn = p.querySelector('#wdl-link'), linkNote = p.querySelector('#wdl-link-note');
    let links = [];
    p.querySelector('#wdl-link-get').onclick = async () => {
      linkNote.textContent = 'Đang gom link…';
      const res = await getLinks();
      links = res.list;
      linkIn.value = links.length ? links[0].url : '';
      linkNote.textContent = links.length
        ? `${links.length} link: ` + links.map((l) => l.url).join(' · ')
        : 'Chưa có link nào trong Link sưu tầm hay văn án.' + (res.err ? ' (' + res.err + ')' : '');
    };
    p.querySelector('#wdl-link-copy').onclick = () => {
      const text = links.length ? links.map((l) => l.url).join('\n') : linkIn.value;
      if (!text) { linkNote.textContent = 'Bấm "Lấy link gốc" trước.'; return; }
      navigator.clipboard.writeText(text).then(() => { linkNote.textContent = 'Đã chép ' + (links.length || 1) + ' link.'; },
        () => { linkNote.textContent = 'Trình duyệt không cho chép — bôi đen ô link để chép tay.'; });
    };

    // ---- Name ----
    const nameInfo = p.querySelector('#wdl-name-info');
    // Name Desk là script riêng: nói chuyện qua sự kiện trên document, như các script khác của bảng chung.
    p.querySelector('#wdl-desk').onclick = () => document.dispatchEvent(new CustomEvent('aurel-namedesk:open', { detail: '' }));
    const btnNames = p.querySelector('#wdl-names');
    btnNames.onclick = async () => {
      if (!info || !info.bookId) { nameInfo.lastElementChild.textContent = 'không thấy bookId'; return; }
      btnNames.disabled = true; btnNames.textContent = 'Đang tải…';
      try {
        const r = await downloadNames(info);
        nameInfo.children[1].textContent = String(r.total);
        nameInfo.children[3].textContent = r.lists.map((l) => l.name || l.title || l.id).join(', ') + ` · ${r.count} name`;
      } catch (err) {
        nameInfo.children[3].textContent = 'lỗi: ' + err.message;
      } finally {
        btnNames.disabled = false; btnNames.textContent = 'Tải Name';
      }
    };

    dockPillRef = dockPill(dockSlot('ndl', 20), 'ndl', 'Tải truyện', () => hubShow('ndl'), () => hubShow('ndl'));
    dockPillRef.ic.title = dockPillRef.tx.title = 'Mở bảng tải truyện wikicv';
    return p;
  }

  /* ========================= TRANG MỤC LỤC ========================= */
  function initTOCPage(ctx, info) {
    const items = readTOC();
    const chapters = items.filter((x) => !x.isVolume);
    if (!chapters.length) return;

    // wikicv: tên truyện ở .cover-info h2 (readInfo). 2.2.1 chỉ tìm h1 nên rơi về <title>.
    const bookTitle = safeName(
      (info && info.title) ||
      (($('h1, .book-name, .title-book') || {}).textContent || '').replace(/\s+/g, ' ').trim() ||
      document.title.replace(/\s*[-|–—].*$/, '')
    );
    const saved = saveTOC(bookKeys(ctx.bookKey), items, bookTitle);

    const volumes = items.filter((x) => x.isVolume);
    const panel = buildUI(info);
    const log = $('#wdl-log', panel);
    const bar = $('#wdl-bar > i', panel);
    const fromEl = $('#wdl-from', panel);
    const toEl = $('#wdl-to', panel);

    $('#wdl-info', panel).textContent =
      `${bookTitle} — ${chapters.length} chương` + (volumes.length ? `, ${volumes.length} phần.` : '.');
    toEl.value = chapters.length;
    toEl.max = fromEl.max = chapters.length;

    const say = (msg, err) => {
      const d = document.createElement('div');
      if (err) d.className = 'err';
      d.textContent = msg;
      log.appendChild(d);
      log.scrollTop = log.scrollHeight;
    };

    // báo ra ngoài thay vì nuốt: không lưu được thì trang chương mất phần sửa nav
    if (!saved) say('⚠ Không lưu được mục lục (localStorage đầy) — nút điều hướng ở trang chương sẽ không được sửa.', true);

    const updateHint = () => {
      const a = chapters[Math.max(1, +fromEl.value) - 1];
      const b = chapters[Math.min(chapters.length, +toEl.value) - 1];
      $('#wdl-range', panel).textContent = a && b ? `${a.title}  →  ${b.title}` : '';
    };
    fromEl.oninput = toEl.oninput = updateHint;
    updateHint();

    // ---- chọn nhanh theo phần/quyển ----
    if (volumes.length) {
      // khoảng chương tính theo volIdx (chỉ số), không theo tên — hai quyển
      // trùng tên từng bị gộp thành một khoảng sai
      const ranges = volumes.map((v) => {
        const own = chapters.filter((x) => x.volIdx === v.volIdx);
        if (!own.length) return null;
        return {
          name: v.title,
          from: chapters.indexOf(own[0]) + 1,
          to: chapters.indexOf(own[own.length - 1]) + 1,
        };
      }).filter(Boolean);

      const sel = $('#wdl-volsel', panel);
      sel.replaceChildren();
      sel.add(new Option(`— Toàn bộ truyện (1–${chapters.length}) —`, ''));
      // new Option() đặt text qua textContent → tên quyển không thể chèn HTML
      ranges.forEach((r, k) => sel.add(new Option(`${r.name} (${r.from}–${r.to})`, String(k))));
      sel.onchange = () => {
        const r = sel.value === '' ? { from: 1, to: chapters.length } : ranges[+sel.value];
        fromEl.value = r.from;
        toEl.value = r.to;
        updateHint();
      };
      $('#wdl-volbox', panel).style.display = 'block';
    }

    let abort = null;
    $('#wdl-stop', panel).onclick = () => {
      if (!abort) return;
      abort.abort();
      say('⏹ Đã yêu cầu dừng…');
    };

    $('#wdl-start', panel).onclick = async () => {
      const startBtn = $('#wdl-start', panel);
      if (startBtn.disabled) return;
      abort = new AbortController();
      const signal = abort.signal;
      log.innerHTML = '';
      bar.style.width = '0';

      const keepVol = $('#wdl-vol', panel).checked;
      const withInfo = !!info && $('#wdl-info-on', panel).checked;
      const fmt = $('#wdl-fmt', panel).value;
      const mode = $('#wdl-mode', panel).value;
      const conc = Math.max(1, Math.min(8, +$('#wdl-conc', panel).value || CFG.defaultConcurrency));
      const delay = Math.max(0, +$('#wdl-delay', panel).value || 0);
      const from = Math.max(1, +fromEl.value) - 1;
      const to = Math.min(chapters.length, +toEl.value) - 1;
      if (to < from) return say('Khoảng chương không hợp lệ.', true);

      const picked = chapters.slice(from, to + 1);
      let lo = picked[0].i;
      const hi = picked[picked.length - 1].i;
      // kéo lùi để lấy luôn dòng tên phần đứng ngay trước chương đầu tiên
      while (keepVol && lo > 0 && items[lo - 1].isVolume) lo--;
      const jobs = items.filter((x) => x.i >= lo && x.i <= hi && (!x.isVolume || keepVol));

      startBtn.disabled = true;
      startBtn.textContent = 'Đang tải…';
      const cached = jobs.filter((x) => !x.isVolume && chapCache.has(x.href + '|' + mode)).length;
      say(`▶ ${jobs.length} mục (${picked.length} chương)` + (cached ? ` — ${cached} đã có sẵn từ lần trước.` : '.'));

      const results = new Array(jobs.length);
      const failedIdx = new Set();
      let done = 0, cursor = 0, author = (info && info.author) || '';

      const worker = async () => {
        while (!signal.aborted) {
          const k = cursor++;
          if (k >= jobs.length) return;
          const it = jobs[k];
          if (it.isVolume) {
            results[k] = { title: it.title, text: '', isVolume: true };
            done++;
            bar.style.width = (done / jobs.length * 100) + '%';
            continue;
          }
          const fresh = !chapCache.has(it.href + '|' + mode);
          try {
            const r = await fetchChapter(it.href, mode, signal);
            if (!author && r.author) author = r.author;
            const title = mergeTitle(it.title, r.title);
            results[k] = { title, text: stripLeadTitle(r.text, title), isVolume: false };
          } catch (e) {
            if (signal.aborted) return;
            failedIdx.add(k);
            results[k] = { title: it.title, text: `[LỖI: ${e.message}]\n${it.href}`, isVolume: false };
            say(`✗ ${it.title} — ${e.message}`, true);
          }
          done++;
          bar.style.width = (done / jobs.length * 100) + '%';
          if (done % 10 === 0 || done === jobs.length) say(`… ${done}/${jobs.length}`);
          if (delay && fresh && !signal.aborted) await sleep(delay);
        }
      };

      try {
        await Promise.all(Array.from({ length: conc }, worker));

        // Pass quét lại: 503 hầu hết là do chính mình bắn 3 luồng vào server.
        // Chạy lại phần hỏng bằng 1 luồng + nghỉ dài thì đa số về. Cache trong
        // phiên đảm bảo pass này không đụng tới các chương đã tải xong.
        if (failedIdx.size && !signal.aborted) {
          const retryList = [...failedIdx];
          say(`↻ Quét lại ${retryList.length} chương lỗi bằng 1 luồng…`);
          throttle.until = 0;
          for (const k of retryList) {
            if (signal.aborted) break;
            const it = jobs[k];
            try {
              const r = await fetchChapter(it.href, mode, signal);
              if (!author && r.author) author = r.author;
              const title = mergeTitle(it.title, r.title);
              results[k] = { title, text: stripLeadTitle(r.text, title), isVolume: false };
              failedIdx.delete(k);
              say(`✓ ${title}`);
            } catch (e) {
              say(`✗ ${it.title} — ${e.message}`, true);
            }
            if (!signal.aborted) await sleep(CFG.sweepDelay);
          }
        }
        const failed = failedIdx.size;

        const got = results.filter(Boolean);
        if (!got.length) return say('Không tải được chương nào.', true);
        if (signal.aborted) say(`⏹ Dừng ở ${got.length}/${jobs.length} mục — vẫn xuất file. Bấm "Bắt đầu" lại chỉ tải phần còn thiếu.`);

        const base = safeName(bookTitle) + ` (${from + 1}-${to + 1})`;
        say('⏳ Đang đóng gói…');

        // Thông tin truyện: TXT làm phần đầu file; EPUB/ZIP thành mục đầu tiên.
        let infoText = '';
        if (withInfo) {
          const links = (await getLinks()).list;
          infoText = infoLines(info, links).join('\n');
          if (links.length) say(`🔗 Link gốc: ${links.map((l) => l.url).join(' · ')}`);
        }
        const infoEntry = infoText ? [{ title: 'Thông tin truyện', text: infoText, isVolume: false }] : [];

        if (fmt === 'txt') {
          const txt = got
            .map((c) => (c.isVolume
              ? `\n\n═══ ${c.title} ═══\n`
              : `\n\n${c.title}\n${'─'.repeat(40)}\n\n${c.text}`))
            .join('\n');
          const head = infoText
            ? infoText + '\n' + '═'.repeat(40) + '\n\n'
            : bookTitle + (author ? `\nTác giả: ${author}` : '') + '\n\n';
          saveBlob(new Blob([head + txt.trim()], { type: 'text/plain;charset=utf-8' }), base + '.txt');
        } else if (fmt === 'epub') {
          saveBlob(await buildEpub(bookTitle, author, infoEntry.concat(got)), base + '.epub');
        } else {
          const files = infoEntry.concat(got).map((c, n) => ({
            name: `${pad(n + 1)} - ${safeName(c.title)}.txt`,
            data: ENC.encode(c.isVolume ? c.title : `${c.title}\n\n${c.text}`),
          }));
          saveBlob(await makeZip(files), base + '.zip');
        }
        say(`✔ Xong: ${got.length} mục, lỗi ${failed}.` + (HAS_CS ? '' : ' (trình duyệt không hỗ trợ nén — file sẽ to hơn)'));
        if (failed) say('↻ Bấm "Bắt đầu" lại để thử lại riêng các chương lỗi.');
      } catch (e) {
        say('✗ Đóng gói thất bại: ' + e.message, true);
      } finally {
        abort = null;
        startBtn.disabled = false;
        startBtn.textContent = 'Bắt đầu';
      }
    };
  }

  /* ============ TRANG CHƯƠNG: SỬA NÚT ĐIỀU HƯỚNG ============ */

  /** Link tới trang mục lục, đọc từ chính trang chương; fallback /truyen/<bookKey>. */
  function tocUrlFrom(ctx) {
    const cand = $$('a[href]').map((a) => {
      try { return new URL(a.getAttribute('href'), location.href); } catch (e) { return null; }
    }).filter(Boolean).find((u) => {
      if (u.origin !== location.origin) return false;
      const seg = u.pathname.split('/').filter(Boolean);
      return seg.length === 2 && seg[0] === 'truyen';
    });
    return cand ? cand.href : new URL('/truyen/' + ctx.bookKey, location.origin).href;
  }

  /** Nạp mục lục ở nền khi chưa có cache — bỏ hẳn ràng buộc "phải mở mục lục trước". */
  async function fetchTOC(ctx) {
    try {
      const res = await fetch(tocUrlFrom(ctx));
      if (!res.ok) return null;
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const items = readTOC(doc);
      if (!items.some((x) => !x.isVolume)) return null;
      const title = safeName((($('h1, .book-name, .title-book', doc) || {}).textContent || '').replace(/\s+/g, ' ').trim());
      saveTOC(bookKeys(ctx.bookKey), items, title);
      return { title, at: Date.now(), list: items };
    } catch (e) { return null; }
  }

  async function initChapterPage(ctx) {
    const keys = bookKeys(ctx.bookKey);
    const toc = loadTOC(keys, location.href) || await fetchTOC(ctx);
    if (!toc || !toc.list.length) return;

    const list = toc.list;
    let cur = list.findIndex((x) => !x.isVolume && x.id && x.id === ctx.id);
    if (cur < 0) {
      const key = decodeURIComponent(ctx.chapterKey);
      cur = list.findIndex((x) => x.href && decodeURIComponent(x.href).endsWith('/' + key));
    }
    if (cur < 0) return;

    const step = (i, d) => {
      let k = i + d;
      while (k >= 0 && k < list.length && (list[k].isVolume || !list[k].href)) k += d;
      return k >= 0 && k < list.length ? k : null;
    };
    const prev = step(cur, -1);
    const next = step(cur, +1);

    // Chỉ đụng vào những phần tử chắc chắn là nút điều hướng: id cụ thể, hoặc
    // text mở đầu bằng "chương trước/sau". 2.1.0 còn quét
    // a[href*="/truyen/"][href*="phan-"] — bắt nhầm link chương thường (slug
    // tiếng Việt đầy "phan-"), và ở chương cuối thì xoá href của cả loạt.
    const setNav = (a, target, label) => {
      if (target == null) {
        a.style.opacity = '.4';
        a.style.pointerEvents = 'none';
        a.removeAttribute('href');
        a.title = label + ': không còn';
        return;
      }
      if (a.getAttribute('href') !== list[target].href) a.setAttribute('href', list[target].href);
      a.title = label + ': ' + list[target].title;
    };

    const byId = (sel, target, label) => $$(sel).forEach((a) => setNav(a, target, label));
    byId('#btnNextChapter', next, 'Chương sau');
    byId('#btnPrevChapter', prev, 'Chương trước');

    // các nút "Chương sau / Chương trước" ở đầu/cuối trang (kể cả bản mobile)
    $$('a').forEach((a) => {
      const t = (a.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (/^chương sau/.test(t)) setNav(a, next, 'Chương sau');
      else if (/^chương trước/.test(t)) setNav(a, prev, 'Chương trước');
    });

    // thêm nút "Chương trước" nếu trang không có
    const bar = $('.top-bar .index-box');
    if (bar && prev != null && !$$('a', bar).some((a) => /chương trước/i.test(a.textContent))) {
      const a = document.createElement('a');
      a.href = list[prev].href;
      a.textContent = '‹ Chương trước';
      a.title = 'Chương trước: ' + list[prev].title;
      a.style.cssText = 'margin-right:.8rem;display:inline-block';
      bar.insertBefore(a, bar.firstChild);
    }
  }

  /* ========================= KHỞI ĐỘNG ========================= */
  (async function boot() {
    const ctx = parsePath();
    if (!ctx) return;

    if (ctx.kind === 'toc') {
      // Khối thông tin truyện có sẵn trong HTML → gắn nút Link gốc / Tải Name ngay,
      // không đợi mục lục (mục lục lỗi cũng không kéo theo hai nút này).
      let info = null;
      try { info = readInfo(); initBookExtras(info); } catch (e) { console.warn('[Tải truyện Wikidich] nút Link gốc / Name lỗi:', e); }
      // mục lục render bằng JS sau document-idle: chờ thay vì bỏ cuộc im lặng
      const el = await waitFor(CFG.chapterLinkSel, CFG.waitDomMs);
      if (!el) return;
      initTOCPage(ctx, info);
    } else if (ctx.kind === 'chapter') {
      const el = await waitFor(CFG.contentSels.join(','), CFG.waitDomMs);
      if (!el) return;
      await initChapterPage(ctx);
    }
  })();
})();

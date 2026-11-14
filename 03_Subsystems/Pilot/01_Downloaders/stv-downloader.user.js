// ==UserScript==
// @name         Tải truyện — sangtacviet
// @namespace    local
// @version      0.4.0
// @description  Tải toàn bộ chương một truyện về máy (TXT/MD/HTML/EPUB), hỗ trợ bản convert Tiếng Việt hoặc Bản gốc tiếng Trung (từ thuộc tính t của thẻ <i>). Nằm trong tab Download của bảng chung với TTS Reader.
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
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @noframes
// ==/UserScript==

/* ─────────────────────────────────────────────────────────────
   0.3.1 — áp bộ tên của stv-names ("Áp khi tải truyện") trong từng frame chương trước
   khi lấy chữ: ghi $中文=Việt vào #namewd của STV rồi gọi excute().

   0.3.0 — giao diện vào tab "Download" của bảng chung (shared/ui-kit.js), theo bản
   thiết kế 00_Layout: thẻ "Tải truyện" (khoảng chương, Bắt đầu / Tạm dừng / Dừng, thanh
   tiến độ, định dạng + Xuất file) và "Tình trạng" (thử lại chương lỗi, xóa bộ nhớ tạm,
   nhật ký). Bỏ khung trắng cố định ở góc. Vòng tròn tải trên cột nút = tải cả truyện.
   Engine tải, mục lục, bộ nhớ tạm, xuất file: giữ nguyên.

   0.2.0 — sửa từ bản nháp 0.1.0

   Đã sửa (lỗi thật, không phải chỉnh style):
     1. parseToc() chạy đồng bộ trong khi mục lục render bằng JS -> chờ có điều kiện
     2. iframe 'load' bắn nhiều lần -> rò setInterval vĩnh viễn -> dọn + chốt settled
     3. @match bỏ sót www.sangtacviet.com
     4. chương lỗi bị bỏ qua im lặng -> ghi danh sách + chặn ở lúc xuất file
     5. novel.title in ra "undefined" nếu xuất mà chưa từng bấm Bắt đầu
     6. EPUB thiếu <meta property="dcterms:modified"> -> epubcheck ERROR RSC-005
     7. crypto.randomUUID KHÔNG tồn tại trên http:// (non-secure context) -> uuid4() tự viết
     8. JSZip tải hỏng thì im lặng -> [0.2.2] bỏ hẳn JSZip, xem "Bộ ghi ZIP"
     9. adapter.bookId() trả số chương thay vì bookid, và không ai gọi -> sửa đúng
    10. base URL dính ?query và #hash -> origin + pathname
    11. innerText có thể chứa ký tự điều khiển XML không hợp lệ -> lọc trong esc()
    12. safeName() để lại dấu chấm/cách cuối tên file -> Windows không nhận
    13. không có nút Dừng, state.running không bao giờ về false từ UI

   Thêm:
     - sandbox iframe: chặn top-navigation => miễn nhiễm frame-busting (CONFIG.sandbox)
     - MutationObserver thay cho polling thuần: bắt nội dung ngay khi được tiêm
     - rate-limit toàn cục: giãn cách giữ nguyên kể cả khi tăng concurrency
     - phát hiện lỗ hổng chương ở lúc xuất file, đối chiếu với mục lục thật
     - cảnh báo khi rời trang giữa chừng
     - đếm tiến độ + ETA

   ── 0.2.1 → 0.2.3, sửa từ những gì ĐO ĐƯỢC trên site thật ──────
    14. bộ lọc rác: đúng một mẫu banner, 5/5 chương, luôn ở dòng đầu
    15. title anchor có '\n' -> regex không khớp ('.' không khớp '\n') -> chương
        biến mất im lặng, và expectedOrders sinh từ cùng hàm nên mù theo
    16. mục lục có số [n] TRÙNG (tiêu đề quyển dùng chung số với chương)
        -> cùng URL -> DB.put() ghi đè -> MẤT nội dung một chương
    17. JSZip treo trong sandbox Tampermonkey -> tự ghi ZIP + CompressionStream
    18. xuất file chạy chồng nhau khi bấm nhiều lần -> khoá lại
    19. mọi đường "hỏng mà im lặng": watchdog, unhandledrejection, mốc tiến độ

   ĐÃ XÁC MINH trên site thật (2026-09-06, 5 chương / 596 đoạn / 55k ký tự):
     - innerText gỡ sạch lớp <i> băm nhỏ: chỉ 2 đoạn <=3 ký tự, đều là thoại thật
     - sandbox iframe KHÔNG làm site crash; không gặp frame-busting
     - contentBox bắt đúng một khối: không đoạn nào lặp trong cùng chương
     - EPUB mở lại được, CRC32 mọi entry hợp lệ, 9/9 file XML well-formed,
       mimetype là entry đầu và không nén

   CHƯA xác minh:
     - epubcheck (cần Java, chưa chạy) — XML well-formed KHÔNG bằng epubcheck pass
     - cấu trúc chương ngoài 5 chương đầu
     - ngưỡng rate-limit thật
   ───────────────────────────────────────────────────────────── */

// ── CONFIG ────────────────────────────────────────────────────
const CONFIG = {
  delayMin: 1200,        // ms, giãn cách tối thiểu giữa 2 lần bắt đầu tải
  delayMax: 2600,        // ms, giãn cách tối đa (ngẫu nhiên trong khoảng)
  concurrency: 1,        // số chương tải song song. Giãn cách trên là TOÀN CỤC,
                         // nên tăng số này không làm site bị dội thêm request/giây.
  // ms, bỏ cuộc nếu chương không render xong. Nâng từ 25s lên 45s ở 0.2.5: truyện
  // đã có bản lưu trong hệ thống thì render gần như tức thì, nhưng truyện chưa lưu
  // có vẻ phải đi lấy và convert lúc mở — [suy đoán, chưa chứng minh]. Nếu log báo
  // "thấy #cld-… nhưng mới N ký tự" thì đúng là chậm, cứ nâng số này tiếp.
  loadTimeout: 45000,

  // ms. Trang đã nạp xong (readyState='complete') mà vẫn chưa có khối nội dung thì
  // chờ thêm ngần này cho JS kịp tiêm, rồi kết luận là site KHÔNG trả chương và bỏ
  // cuộc ngay — không đợi hết loadTimeout, không thử lại. Xem CONFIG.sandbox phía dưới
  // và phần xử lý trong loadChapter().
  settleGrace: 8000,
  pollInterval: 300,     // ms, nhịp kiểm tra dự phòng (MutationObserver lo phần chính)
  tocTimeout: 20000,     // ms, chờ mục lục render
  minChars: 200,         // dưới ngưỡng này coi như chưa render xong
  maxRetries: 2,         // số lần thử lại mỗi chương
  stopAfterFails: 3,     // chương LỖI liên tiếp thì dừng hẳn, giữ nguyên tiến độ

  // Chương bị site TỪ CHỐI liên tiếp thì dừng. Ngưỡng lỏng hơn stopAfterFails vì hai
  // thứ khác nhau: lỗi liên tiếp nghĩa là đi tiếp có hại (đang bị chặn tốc độ), còn
  // từ chối chỉ tốn settleGrace mỗi chương — và nếu tường nằm rải rác thì chương sau
  // vẫn lấy được. 10 lần liên tiếp là đủ để kết luận đây là khối đuôi chứ không rải.
  stopAfterRefusals: 10,

  // Chặn iframe điều hướng tab (frame-busting). Nếu chương KHÔNG render được,
  // đây là thứ đầu tiên nên thử tắt: vài site đọc window.top và crash khi bị chặn.
  sandbox: true,

  // Dòng rác cần lọc. Đo trên 5 chương thật (2026-09-06, 601 đoạn / 55.188 ký tự):
  // chỉ có ĐÚNG MỘT mẫu lặp, xuất hiện 5/5 chương và luôn ở dòng đầu tiên.
  // Không có watermark, không có link quảng bá, không có đoạn nào lặp trong cùng chương.
  noise: [
    /^@Bạn đang đọc/i,
    // /^@/,                 // rộng hơn, phòng khi site đổi câu chữ — bật nếu cần
  ],

  exportTimeout: 60000,  // ms, xuất file quá lâu thì báo lỗi thay vì treo im lặng
};

(() => {
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

  // ── Adapter: sangtacviet ────────────────────────────────────
  const adapter = {
    id: 'sangtacviet',

    // /truyen/{nguồn}/{n}/{bookid}/
    isTocPage: () => /^\/truyen\/[^/]+\/\d+\/\d+\/?$/.test(location.pathname),
    // /truyen/{nguồn}/{n}/{bookid}/{order}/
    isChapterPage: () => /^\/truyen\/[^/]+\/\d+\/\d+\/\d+\/?$/.test(location.pathname),

    // FIX #9: bản cũ khớp số cuối path -> trên trang chương trả về số CHƯƠNG.
    // Neo vào cấu trúc path để đúng ở cả hai loại trang.
    bookId: () => (location.pathname.match(/^\/truyen\/[^/]+\/\d+\/(\d+)/) || [])[1],

    parseNovel: () => ({
      // "[ Tổng mạn ] Tên truyện - 73 chương" -> bỏ đuôi số chương
      title: document.title.replace(/\s*-\s*\d+\s*chương\s*$/i, '').trim() || 'Không rõ',
      author: '',            // TODO: chưa tìm được selector tác giả, cần soi thêm
      source: location.origin + location.pathname,
    }),

    // Anchor mục lục đều href="about:blank" -> tự ghép URL từ số [n] trong title
    parseToc: () => {
      // FIX #10: location.href kéo theo cả ?query và #hash vào base.
      const base = (location.origin + location.pathname).replace(/\/?$/, '/');
      const anchors = [...document.querySelectorAll('#chaptercontainerinner a.listchapitem')];
      let skipped = 0;

      const list = anchors.map(a => {
        // Chuẩn hoá khoảng trắng TRƯỚC khi match, không phải sau. Hai lý do:
        //  - '.' trong regex KHÔNG khớp '\n'. Một title có xuống dòng là anchor đó
        //    không match -> .filter(Boolean) vứt đi IM LẶNG -> mất nguyên một chương.
        //    Và expectedOrders cũng sinh từ đây, nên phần dò lỗ hổng mù theo luôn.
        //  - đo được tiêu đề chương 5 dính khoảng trắng đôi, kéo thẳng vào mục lục EPUB.
        const raw = (a.getAttribute('title') || a.textContent || '').replace(/\s+/g, ' ').trim();
        const m = raw.match(/^\[(\d+)\]\s*(.*)$/);
        if (!m) { skipped++; return null; }
        return { order: Number(m[1]), title: m[2].trim(), url: base + m[1] + '/' };
      }).filter(Boolean).sort((a, b) => a.order - b.order);

      // Đo 2026-09-06: 59 anchor nhưng số [n] cao nhất là 57 -> mục lục có số TRÙNG.
      // Hậu quả ở 0.2.1: hai mục cùng order 1 -> ghép ra CÙNG một URL -> tải hai lần,
      // và DB.put(1, …) lần sau GHI ĐÈ lần trước. Dòng "[1] xong" lặp hai lần là nó.
      // Cả HAI mục thừa đo được đều là TIÊU ĐỀ QUYỂN, cùng một hình dạng: kết thúc
      // bằng ':' và không có nội dung riêng. Site đếm chúng là chương (khai báo 59)
      // nên anchorCount = 59, còn số chương thật là 57.
      //
      // Chỉ "giữ mục đứng sau" thì đúng ở truyện này, vì tiêu đề quyển nằm TRƯỚC
      // chương cùng số. Nhưng đó là may, không phải luật — đảo thứ tự là mất chương
      // thật. Nên ưu tiên theo hình dạng, hoà mới rơi về giữ mục sau.
      const isVolumeHeader = c => /:$/.test(c.title);
      const byOrder = new Map(), dropped = [];
      for (const c of list) {
        const prev = byOrder.get(c.order);
        if (!prev) { byOrder.set(c.order, c); continue; }
        const keep = isVolumeHeader(prev) === isVolumeHeader(c) ? c
                   : (isVolumeHeader(prev) ? c : prev);
        dropped.push(keep === c ? prev : c);
        byOrder.set(c.order, keep);
      }
      const out = [...byOrder.values()].sort((a, b) => a.order - b.order);

      out.anchorCount = anchors.length;   // UI đối chiếu, xem mountUI
      out.skipped = skipped;
      out.dropped = dropped;
      return out;
    },

    // Lấy khối nội dung trong một document (của iframe hoặc của chính trang)
    // LƯU Ý: trang có 2 phần tử .contentbox, cái đầu KHÔNG phải nội dung.
    contentBox: doc => doc.querySelector('[id^="cld-"]'),
  };

  // ── IndexedDB: chứa nội dung; GM_setValue chỉ giữ metadata ───
  // LƯU Ý: IndexedDB tách theo origin. sangtacviet.com và 14.225.254.182 là
  // HAI database khác nhau — đổi host giữa chừng là mất tiến độ. UI có in origin.
  const DB = (() => {
    const NAME = 'sctv-downloader', STORE = 'chapters';
    let dbp = null;
    const open = () => (dbp ||= new Promise((res, rej) => {
      const r = indexedDB.open(NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: 'key' });
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }));
    const run = async (mode, fn) => {
      const db = await open();
      return new Promise((res, rej) => {
        const t = db.transaction(STORE, mode);
        const req = fn(t.objectStore(STORE));
        t.oncomplete = () => res(req ? req.result : undefined);
        t.onerror = () => rej(t.error);
        t.onabort = () => rej(t.error || new Error('transaction aborted'));
      });
    };
    return {
      put: (key, value) => run('readwrite', s => s.put({ key, value })),
      getAll: () => run('readonly', s => s.getAll()),
      getAllKeys: () => run('readonly', s => s.getAllKeys()),
      clear: () => run('readwrite', s => s.clear()),
    };
  })();

  // ── Tiện ích ────────────────────────────────────────────────
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const jitter = () => CONFIG.delayMin + Math.random() * (CONFIG.delayMax - CONFIG.delayMin);
  const norm = s => String(s).replace(/\s+/g, ' ').trim().toLowerCase();

  // FIX #11: innerText có thể lọt ký tự điều khiển (\x00-\x08, \x0B, \x0C, \x0E-\x1F).
  // Chúng hợp lệ trong TXT nhưng làm XHTML/EPUB không parse được -> lọc luôn ở đây.
  const esc = s => String(s)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));

  // FIX #12: Windows từ chối tên file kết thúc bằng '.' hoặc ' '. Cắt hai lần vì
  // slice(0,80) có thể lộ lại dấu cách ở vị trí 80.
  const safeName = s => (String(s)
    .replace(/[\\/:*?"<>|\x00-\x1f]/g, '_')
    .replace(/[.\s]+$/, '')
    .slice(0, 80)
    .replace(/[.\s]+$/, '')) || 'truyen';

  // FIX #7: crypto.randomUUID chỉ có trong secure context. Trên http://14.225.254.182
  // nó là undefined, nên nhánh fallback của bản cũ (Date.now()) là nhánh MẶC ĐỊNH
  // trên nửa số @match, và nó không sinh ra UUID. getRandomValues thì có ở mọi context.
  const uuid4 = () => {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };

  // EPUB 3 đòi đúng định dạng CCYY-MM-DDThh:mm:ssZ — KHÔNG có mili-giây.
  const epubNow = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z');

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  // Biến "treo im lặng" thành một lỗi nhìn thấy được. Bản 0.2.0 đo trên máy Aurel:
  // EXPORT.epub không throw, không xong, không in tiến độ — không có cách nào biết
  // nó chết ở đâu. Promise không settle thì try/catch vô dụng, phải có đồng hồ.
  const withTimeout = (p, ms, what) => Promise.race([
    p, new Promise((_, rej) => setTimeout(() => rej(new Error(`${what}: treo quá ${ms / 1000}s`)), ms)),
  ]);

  // FIX #1: chờ một thứ xuất hiện thay vì đọc một phát rồi thôi.
  const waitFor = (fn, timeout, step = 200) => new Promise((res, rej) => {
    const t0 = Date.now();
    const tick = () => {
      let v; try { v = fn(); } catch { v = null; }
      if (v && (v.length === undefined || v.length > 0)) return res(v);
      if (Date.now() - t0 > timeout) return rej(new Error('timeout'));
      setTimeout(tick, step);
    };
    tick();
  });

  // ── Bộ ghi ZIP ──────────────────────────────────────────────
  // Tự viết thay vì dùng JSZip. Lý do đo được trên máy Aurel, 2026-09-06:
  // JSZip 3.10.1 nạp bình thường (UI in ra "JSZip: v3.10.1"), gọi được tới
  // generateAsync(), rồi KHÔNG BAO GIỜ settle và không bắn nổi một callback tiến
  // độ nào — treo quá 60s. Đúng hàm đó chạy offline với JSZip thật xong trong 7ms
  // và bắn 35 callback. [suy luận, chưa chứng minh tới tận cùng] bộ lập lịch async
  // của JSZip không quay được bên trong sandbox của Tampermonkey. Không sửa được
  // từ ngoài thư viện, nên bỏ thư viện. ZIP là định dạng đơn giản, và deflate thì
  // trình duyệt có sẵn — bỏ luôn được cả phụ thuộc CDN.

  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c >>> 0;
    }
    return t;
  })();
  const crc32 = u8 => {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  };

  // 'deflate-raw' là đúng thứ ZIP cần (deflate trần, không header zlib).
  // Không có thì trả null và entry đó lưu nguyên — file to hơn nhưng vẫn hợp lệ.
  const deflateRaw = async u8 => {
    if (typeof CompressionStream === 'undefined') return null;
    try {
      const s = new Blob([u8]).stream().pipeThrough(new CompressionStream('deflate-raw'));
      return new Uint8Array(await new Response(s).arrayBuffer());
    } catch { return null; }
  };

  // entries: [{ name, text, store }]. store:true là BẮT BUỘC cho 'mimetype'.
  async function makeZip(entries, mime, onProgress) {
    const enc = new TextEncoder();
    const d = new Date();
    const dosTime = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xFFFF;
    const dosDate = ((Math.max(0, d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xFFFF;

    const parts = [], central = [];
    let offset = 0, n = 0;

    for (const e of entries) {
      const name = enc.encode(e.name);
      const raw = enc.encode(e.text);
      const crc = crc32(raw);
      let body = raw, method = 0;
      if (!e.store) {
        const def = await deflateRaw(raw);
        if (def && def.length < raw.length) { body = def; method = 8; }
      }

      const lfh = new Uint8Array(30 + name.length);
      const lv = new DataView(lfh.buffer);
      lv.setUint32(0, 0x04034b50, true);   // signature
      lv.setUint16(4, 20, true);           // version needed
      lv.setUint16(6, 0x0800, true);       // cờ: tên file là UTF-8
      lv.setUint16(8, method, true);       // 0 = STORE, 8 = DEFLATE
      lv.setUint16(10, dosTime, true);
      lv.setUint16(12, dosDate, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, body.length, true); // kích thước sau nén
      lv.setUint32(22, raw.length, true);  // kích thước gốc
      lv.setUint16(26, name.length, true);
      lfh.set(name, 30);

      const cdh = new Uint8Array(46 + name.length);
      const cv = new DataView(cdh.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true); cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, method, true);
      cv.setUint16(12, dosTime, true); cv.setUint16(14, dosDate, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, body.length, true);
      cv.setUint32(24, raw.length, true);
      cv.setUint16(28, name.length, true);
      cv.setUint32(42, offset, true);      // vị trí local header
      cdh.set(name, 46);

      parts.push(lfh, body); central.push(cdh);
      offset += lfh.length + body.length;
      if (onProgress && ++n % 50 === 0) onProgress(n, entries.length);
    }

    // EOCD đếm entry bằng uint16 -> tối đa 65535 file. Truyện dài nhất cũng không tới.
    const cdSize = central.reduce((s, c) => s + c.length, 0);
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, central.length, true);
    ev.setUint16(10, central.length, true);
    ev.setUint32(12, cdSize, true);
    ev.setUint32(16, offset, true);

    return new Blob([...parts, ...central, eocd], { type: mime });
  }

  // ── Rate-limit toàn cục ─────────────────────────────────────
  // Giãn cách tính trên thời điểm BẮT ĐẦU mỗi request, dùng chung cho mọi worker.
  // Nhờ vậy tăng CONFIG.concurrency không làm tăng số request/giây tới site.
  let nextSlot = 0;
  async function gate() {
    const now = Date.now();
    const start = Math.max(now, nextSlot);
    nextSlot = start + jitter();
    if (start > now) await sleep(start - now);
  }

  // ── Nạp một chương bằng iframe ẩn ───────────────────────────
  // GOTCHA: KHÔNG dùng display:none — innerText phụ thuộc layout, ẩn kiểu đó
  // sẽ trả về chuỗi rỗng. Phải đẩy iframe ra ngoài màn hình mà vẫn render.
  // Áp name khi tải: bộ tên do script "Quản lý name — STV" (stv-names.user.js) để lại trong
  // localStorage của trang (khóa 'aurel-stv-names': { on, names: {中文: Việt}, longFirst }).
  // Trong từng frame chương: ghi "$中文=Việt" vào ô #namewd của STV rồi gọi excute() — y như
  // nút "Áp ngay" trên trang đọc. Không có bộ tên / tắt "Áp khi tải" thì bỏ qua.
  function stvNames() {
    try {
      const d = JSON.parse(localStorage.getItem('aurel-stv-names') || 'null');
      return d && d.on && d.names && Object.keys(d.names).length ? d : null;
    } catch { return null; }
  }
  function applyNamesIn(fr) {
    const d = stvNames();
    if (!d) return false;
    try {
      const w = fr.contentWindow, box = fr.contentDocument.getElementById('namewd');
      if (!box || typeof w.excute !== 'function') return false;
      const keys = Object.keys(d.names);
      if (d.longFirst) keys.sort((a, b) => b.length - a.length);
      const kept = box.value.split(/\r?\n/).filter(l => {
        const k = l.replace(/^\$/, '').split('=')[0].trim();
        return !(k && Object.prototype.hasOwnProperty.call(d.names, k));
      });
      box.value = keys.map(k => '$' + k + '=' + d.names[k]).concat(kept).join('\n');
      w.excute();
      return true;
    } catch { return false; }
  }

  function extractContent(box, mode) {
    if (mode === 'zh') {
      let s = '';
      const walk = n => {
        if (n.nodeType === 3) {
          s += n.textContent;
        } else if (n.nodeType === 1) {
          const tag = n.tagName.toLowerCase();
          if (tag === 'br') {
            s += '\n';
          } else if (tag === 'i' && n.hasAttribute('t')) {
            s += n.getAttribute('t');
          } else {
            for (let c of n.childNodes) walk(c);
          }
        }
      };
      walk(box);
      return s;
    }
    return box.innerText;
  }

  function loadChapter(url, langMode = 'vi') {
    return new Promise((resolve, reject) => {
      const fr = document.createElement('iframe');
      fr.style.cssText =
        'position:fixed;left:-10000px;top:0;width:1024px;height:768px;opacity:0;border:0;';

      // allow-same-origin: bắt buộc, không có thì đọc contentDocument sẽ ném lỗi.
      // allow-scripts:     bắt buộc, nội dung do JS của site tiêm vào.
      // KHÔNG có allow-top-navigation => site không thể đá tab ra ngoài (frame-busting).
      if (CONFIG.sandbox) fr.setAttribute('sandbox', 'allow-same-origin allow-scripts');

      // completeAt: mốc lần đầu thấy readyState='complete' mà chưa có khối nội dung.
      let settled = false, poll = null, timer = null, obs = null, completeAt = 0;
      // named: đã áp bộ tên (stv-names) trong frame này chưa — áp một lần rồi chờ STV dịch lại.
      let named = !stvNames();

      const cleanup = () => {
        clearInterval(poll); clearTimeout(timer);
        if (obs) { obs.disconnect(); obs = null; }
        fr.remove();
      };
      // permanent=true nghĩa là thử lại cũng ra đúng kết quả này — crawl() sẽ bỏ retry.
      const fail = (msg, permanent) => {
        if (settled) return;
        settled = true; cleanup();
        const e = new Error(msg);
        if (permanent) e.permanent = true;
        reject(e);
      };
      const win = text => { if (!settled) { settled = true; cleanup(); resolve(text); } };

      // Trả về true nếu đã lấy được nội dung.
      const check = () => {
        if (settled) return true;
        let doc;
        try { doc = fr.contentDocument; }
        catch {
          // Frame đã điều hướng sang origin khác — thường là frame-busting.
          fail(CONFIG.sandbox
            ? 'cross-origin (frame đã bị đá đi dù đã sandbox)'
            : 'cross-origin — nhiều khả năng frame-busting, bật CONFIG.sandbox');
          return true;
        }
        if (!doc) return false;
        const box = adapter.contentBox(doc);

        if (!box) {
          // Trang nạp XONG mà vẫn không có khối nội dung -> site không trả chương
          // (đo 2026-09-06 trên chương 75+ của một truyện: readyState=complete,
          // body 807 ký tự, id chỉ toàn khung site, nội dung là trang thông báo).
          // Đây là trạng thái vĩnh viễn: đợi hết 45s rồi thử lại 3 lần là ném đi
          // hơn 2 phút mỗi chương để tới đúng kết luận cũ. Cho một nhịp ân hạn
          // để JS kịp tiêm, rồi bỏ cuộc luôn và báo là KHÔNG đáng thử lại.
          if (doc.readyState === 'complete') {
            if (!completeAt) completeAt = Date.now();
            else if (Date.now() - completeAt > CONFIG.settleGrace) {
              fail('site không trả nội dung — ' + diagnose(), true);
              return true;
            }
          }
          return false;
        }
        completeAt = 0;   // có khối rồi thì bỏ đồng hồ ân hạn, chỉ còn chờ đủ chữ

        if (!named && langMode !== 'zh') {
          named = true;
          if (applyNamesIn(fr)) return false;   // STV đang dịch lại → lấy chữ ở nhịp sau
        }
        const text = extractContent(box, langMode);
        if (text.trim().length < CONFIG.minChars) return false;
        win(text);
        return true;
      };

      // "timeout" trần là thông báo vô dụng: nó không nói được nó đã THẤY gì.
      // Đo 2026-09-06: hai truyện nguồn jjwxc trượt 100% chương với đúng chữ đó,
      // trong khi truyện trước chạy sạch 57/57 với cùng đoạn code này. Không có
      // cách nào biết là selector đổi, nội dung tới chậm, hay có tường đăng nhập.
      // Nên lúc hết giờ thì mô tả hiện trạng thay vì chỉ kêu.
      const diagnose = () => {
        let doc;
        try { doc = fr.contentDocument; } catch { return 'không đọc được document (cross-origin)'; }
        if (!doc) return 'contentDocument null';
        const bodyText = ((doc.body && doc.body.innerText) || '').replace(/\s+/g, ' ').trim();
        const st = `readyState=${doc.readyState} · body ${bodyText.length} ký tự`;
        const box = adapter.contentBox(doc);
        if (!box) {
          // Liệt kê id có mặt: nếu selector đã đổi thì nó lộ ra ngay ở đây.
          const ids = [...doc.querySelectorAll('[id]')].map(e => e.id)
            .filter(Boolean).slice(0, 20).join(', ');
          return `KHÔNG thấy [id^="cld-"] · ${st} · id trong trang: ${ids || '(không có)'}`
            + ` · đầu body: "${bodyText.slice(0, 120)}"`;
        }
        const n = (box.innerText || '').trim().length;
        return `thấy #${box.id} nhưng mới ${n} ký tự (cần >=${CONFIG.minChars}) · ${st}`;
      };

      timer = setTimeout(() => fail('timeout — ' + diagnose()), CONFIG.loadTimeout);

      fr.addEventListener('load', () => {
        // FIX #2: 'load' có thể bắn nhiều lần (about:blank lúc chèn iframe, redirect,
        // SPA nav). Bản cũ ghi đè `poll` mỗi lần -> interval cũ mất tham chiếu,
        // không ai clear được, chạy mãi 300ms/lần cho tới khi đóng tab.
        if (settled) return;
        clearInterval(poll); poll = null;
        if (obs) { obs.disconnect(); obs = null; }

        if (check()) return;

        // MutationObserver bắt đúng lúc nội dung được tiêm, không phải đợi hết nhịp poll.
        let doc; try { doc = fr.contentDocument; } catch { return; }
        if (doc && doc.documentElement) {
          obs = new MutationObserver(() => check());
          obs.observe(doc.documentElement, { childList: true, subtree: true, characterData: true });
        }
        // Poll dự phòng: nội dung có thể được đặt bằng cách observer không thấy
        // (ví dụ đổi CSS làm khối hiện ra mà DOM không đổi).
        poll = setInterval(check, CONFIG.pollInterval);
      });

      fr.src = url;
      document.body.appendChild(fr);
    });
  }

  // Đoạn văn tách bằng <br> -> innerText cho sẵn '\n'
  function toParagraphs(text, chapterTitle, note, isZh = false) {
    const lines = text
      .split('\n')
      .map(s => s.replace(/[ ​﻿]/g, ' ').trim())
      .filter(Boolean)
      .filter(l => !CONFIG.noise.some(rx => rx.test(l)));

    // Dòng đầu thường lặp lại tiêu đề chương. Bản cũ so 12 ký tự đầu — đủ lỏng để
    // ăn nhầm câu mở đầu thật. Ở đây so sau khi chuẩn hoá, và LOG lại thứ đã bỏ.
    if (!isZh && lines.length > 1 && chapterTitle) {
      const a = norm(lines[0]), b = norm(chapterTitle);
      if (a && b && (a === b || (b.length >= 6 && a.startsWith(b)) || (a.length >= 6 && b.startsWith(a)))) {
        note && note('bỏ dòng tiêu đề lặp: ' + lines[0].slice(0, 40));
        lines.shift();
      }
    }
    return lines;
  }

  // ── Vòng lặp tải ────────────────────────────────────────────
  const state = { running: false, paused: false, failed: new Set(), refused: new Set() };

  async function crawl(list, onProgress, onStat) {
    const done = new Set(await DB.getAllKeys());
    const queue = list.filter(c => !done.has(c.order));
    const skipped = list.length - queue.length;
    if (skipped) onProgress(null, `bỏ qua ${skipped} chương đã có trong bộ nhớ.`);
    if (!queue.length) { onProgress(null, 'không còn chương nào để tải.'); return; }

    // HAI bộ đếm, không phải một. Đo 2026-09-11: một truyện có tường ngay ở chương 7,
    // stopAfterFails=3 dừng cả phiên -> chương 10 trở đi KHÔNG BAO GIỜ được thử.
    // Hai loại hỏng này cần hai chính sách khác nhau:
    //   - lỗi tạm thời liên tiếp (timeout, mạng) = dấu hiệu bị chặn tốc độ -> đi tiếp
    //     là CÓ HẠI, dừng sớm ở 3.
    //   - site từ chối liên tiếp = chỉ tốn settleGrace mỗi chương, và chương sau có
    //     thể vẫn lấy được nếu tường nằm rải rác -> đi tiếp, chỉ dừng khi đủ nhiều
    //     để kết luận đây là khối đuôi.
    let idx = 0, ok = 0, consecutiveFails = 0, consecutiveRefusals = 0;
    const t0 = Date.now();
    state.failed = new Set();
    state.refused = new Set();

    const stat = () => onStat({
      ok, total: queue.length, failed: state.failed.size, refused: state.refused.size,
      etaMs: ok ? Math.round((Date.now() - t0) / ok * (queue.length - ok)) : null,
    });

    const worker = async () => {
      while (state.running) {
        while (state.paused && state.running) await sleep(300);
        if (!state.running) break;

        const ch = queue[idx++];
        if (!ch) break;

        let got = false, refused = false;
        for (let attempt = 0; attempt <= CONFIG.maxRetries && !got && state.running; attempt++) {
          try {
            if (attempt) await sleep(2000 * 2 ** attempt);   // backoff
            await gate();                                    // giãn cách toàn cục
            const isZh = state.langMode === 'zh';
            const text = await loadChapter(ch.url, state.langMode);
            await DB.put(ch.order, {
              order: ch.order, title: ch.title, url: ch.url,
              paragraphs: toParagraphs(text, ch.title, m => onProgress(ch, m), isZh),
            });
            got = true; consecutiveFails = 0; consecutiveRefusals = 0; ok++;
            state.failed.delete(ch.order);
            state.refused.delete(ch.order);
            onProgress(ch, 'xong');
          } catch (e) {
            if (e.permanent) {
              // Thử lại chỉ tốn thời gian để tới đúng kết luận này.
              refused = true;
              onProgress(ch, `BỎ QUA (không thử lại): ${e.message}`);
              break;
            }
            onProgress(ch, `lỗi (lần ${attempt + 1}/${CONFIG.maxRetries + 1}): ${e.message}`);
          }
        }
        // FIX #4: bản cũ chỉ đếm rồi đi tiếp — chương hỏng biến mất không dấu vết.
        // Hai sổ riêng: bị từ chối KHÔNG phải "lỗi", và gọi nó là lỗi khiến người
        // dùng đi tìm thứ để sửa trong khi không có gì hỏng.
        if (refused) {
          state.refused.add(ch.order);
          consecutiveRefusals++; consecutiveFails = 0;
        } else if (!got) {
          state.failed.add(ch.order);
          consecutiveFails++; consecutiveRefusals = 0;
        }

        // stat() phải chạy SAU khi ghi nhận lỗi. Ở 0.2.4 nó chạy trước, nên ô đếm
        // luôn trễ một chương: ảnh chụp 2026-09-06 hiện "0/482 — lỗi 0" trong khi
        // chương 1 đã trượt cả 3 lần. Ô đếm nói sai thì nó là thứ gây hiểu nhầm.
        stat();

        if (consecutiveFails >= CONFIG.stopAfterFails) {
          onProgress(null, `DỪNG: ${consecutiveFails} chương LỖI liên tiếp — có thể đang bị chặn tốc độ. Tiến độ giữ nguyên.`);
          state.running = false;
          break;
        }
        if (consecutiveRefusals >= CONFIG.stopAfterRefusals) {
          onProgress(null, `DỪNG: ${consecutiveRefusals} chương liên tiếp bị site từ chối — coi như phần còn lại cũng vậy.`);
          state.running = false;
          break;
        }
      }
    };

    await Promise.all(Array.from({ length: Math.max(1, CONFIG.concurrency) }, worker));
    state.running = false;
    stat();
    const sorted = s => [...s].sort((a, b) => a - b);
    if (state.failed.size)
      onProgress(null, `${state.failed.size} chương LỖI (đáng thử lại): ${sorted(state.failed).join(', ')}`);
    if (state.refused.size)
      onProgress(null, `${state.refused.size} chương site TỪ CHỐI (không phải lỗi, thử lại cũng vậy): ${sorted(state.refused).join(', ')}`);
    await GM_setValue('failed', JSON.stringify(sorted(state.failed)));
    await GM_setValue('refused', JSON.stringify(sorted(state.refused)));
  }

  // ── Exporter ────────────────────────────────────────────────
  // FIX #4 (nửa sau): đối chiếu với mục lục thật, không suy ra lỗ hổng từ chính
  // dữ liệu đã tải — chương cuối bị thiếu thì cách suy ra đó không nhìn thấy gì.
  async function collect(expectedOrders) {
    const rows = (await DB.getAll()).map(r => r.value).sort((a, b) => a.order - b.order);
    if (!rows.length) { alert('Chưa có chương nào trong bộ nhớ.'); return null; }

    const have = new Set(rows.map(r => r.order));
    const missing = (expectedOrders || []).filter(o => !have.has(o));
    if (missing.length) {
      const head = missing.slice(0, 30).join(', ');
      const more = missing.length > 30 ? `, … (+${missing.length - 30})` : '';
      if (!confirm(`THIẾU ${missing.length}/${expectedOrders.length} chương:\n${head}${more}\n\nVẫn xuất file?`))
        return null;
    }
    return rows;
  }

  const EXPORT = {
    txt: (novel, chs) => {
      const isZh = novel.langMode === 'zh';
      return new Blob(
      ['﻿', `${novel.title}${isZh ? ' [Bản gốc tiếng Trung]' : ''}\n${'='.repeat(40)}\n\n`,
        ...chs.flatMap(c => [`${c.title}\n\n`, c.paragraphs.join('\n\n'), '\n\n\n'])],
      { type: 'text/plain;charset=utf-8' });
    },

    md: (novel, chs) => {
      const isZh = novel.langMode === 'zh';
      return new Blob(
      [`# ${novel.title}${isZh ? ' [Bản gốc tiếng Trung]' : ''}\n\n`,
        ...chs.flatMap(c => [`## ${c.title}\n\n`, c.paragraphs.join('\n\n'), '\n\n'])],
      { type: 'text/markdown;charset=utf-8' });
    },

    html: (novel, chs) => new Blob([
      `<!doctype html><html lang="vi"><meta charset="utf-8"><title>${esc(novel.title)}</title>`,
      `<style>body{max-width:42em;margin:2em auto;padding:0 1em;font:16px/1.8 Georgia,serif}`,
      `h2{margin-top:3em;border-top:1px solid #ddd;padding-top:1em}nav a{display:block}</style>`,
      `<h1>${esc(novel.title)}</h1><nav>`,
      ...chs.map(c => `<a href="#ch${c.order}">${esc(c.title)}</a>`), '</nav>',
      ...chs.flatMap(c => [
        `<h2 id="ch${c.order}">${esc(c.title)}</h2>`,
        c.paragraphs.map(p => `<p>${esc(p)}</p>`).join(''),
      ]),
      '</html>',
    ], { type: 'text/html;charset=utf-8' }),

    epub: async (novel, chs, onProgress) => {
      // FIX #8: @require từ CDN có thể hỏng (offline, DNS, bị chặn). Bản cũ ném
      // ReferenceError bên trong async fn -> unhandled rejection -> bấm nút, không gì xảy ra.
      const P = m => onProgress && onProgress(m);

      P('epub: dựng cây file…');
      const F = [];   // thứ tự chèn CHÍNH LÀ thứ tự entry trong file zip
      const uid = 'urn:uuid:' + uuid4();

      // mimetype PHẢI là entry đầu tiên và KHÔNG được nén
      F.push({ name: 'mimetype', text: 'application/epub+zip', store: true });

      F.push({ name: 'META-INF/container.xml', text:
        `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>` });

      // <!DOCTYPE html> đứng SAU khai báo XML, TRƯỚC <html> — đúng chỗ này thôi.
      // Đo 2026-09-06: thiếu nó thì Sigil bật cảnh báo "not well formed or are missing
      // a DOCTYPE" rồi TỰ SỬA file khi mở. File vốn well-formed (đã kiểm bằng parser
      // XML), lỗi nằm ở vế "missing a DOCTYPE" — Sigil gộp hai chuyện vào một câu.
      // Để máy đọc tự sửa file của mình là mất quyền kiểm soát thứ đưa cho nó.
      chs.forEach(c => F.push({ name: `OEBPS/ch${c.order}.xhtml`, text:
        `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${novel.langMode === 'zh' ? 'zh' : 'vi'}" lang="${novel.langMode === 'zh' ? 'zh' : 'vi'}"><head><title>${esc(c.title)}</title></head>
<body><h2>${esc(c.title)}</h2>${c.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}</body></html>` }));

      const manifest = chs.map(c =>
        `<item id="ch${c.order}" href="ch${c.order}.xhtml" media-type="application/xhtml+xml"/>`).join('');
      const spine = chs.map(c => `<itemref idref="ch${c.order}"/>`).join('');

      F.push({ name: 'OEBPS/nav.xhtml', text:
        `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${novel.langMode === 'zh' ? 'zh' : 'vi'}" lang="${novel.langMode === 'zh' ? 'zh' : 'vi'}">
<head><title>Mục lục</title></head><body><nav epub:type="toc" id="toc"><h1>Mục lục</h1><ol>${
  chs.map(c => `<li><a href="ch${c.order}.xhtml">${esc(c.title)}</a></li>`).join('')}</ol></nav></body></html>` });

      F.push({ name: 'OEBPS/toc.ncx', text:
        `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
<head><meta name="dtb:uid" content="${uid}"/></head><docTitle><text>${esc(novel.title)}${novel.langMode === 'zh' ? ' [Gốc Trung]' : ''}</text></docTitle>
<navMap>${chs.map((c, i) =>
  `<navPoint id="n${c.order}" playOrder="${i + 1}"><navLabel><text>${esc(c.title)}</text></navLabel><content src="ch${c.order}.xhtml"/></navPoint>`).join('')}</navMap></ncx>` });

      // FIX #6: dcterms:modified là BẮT BUỘC trong EPUB 3 — đúng một thẻ, đúng định
      // dạng CCYY-MM-DDThh:mm:ssZ. Thiếu là epubcheck ERROR RSC-005 và một số máy
      // đọc từ chối mở file.
      F.push({ name: 'OEBPS/content.opf', text:
        `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:identifier id="bookid">${uid}</dc:identifier>
  <dc:title>${esc(novel.title)}${novel.langMode === 'zh' ? ' [Gốc Trung]' : ''}</dc:title>
  <dc:creator>${esc(novel.author || 'Không rõ')}</dc:creator>
  <dc:language>${novel.langMode === 'zh' ? 'zh' : 'vi'}</dc:language>
  ${novel.source ? `<dc:source>${esc(novel.source)}</dc:source>` : ''}
  <meta property="dcterms:modified">${epubNow()}</meta>
</metadata>
<manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>${manifest}</manifest>
<spine toc="ncx">${spine}</spine></package>` });

      P(`epub: đóng gói ${F.length} file…`);
      const blob = await makeZip(F, 'application/epub+zip',
        (n, total) => P(`epub: ${n}/${total} file`));
      P(`epub: xong, ${blob.size} bytes`);
      return blob;
    },
  };

  let exporting = false;

  async function doExport(fmt, expectedOrders, log = () => {}) {
    // Bản 0.2.0 không chặn cái này: bấm EPUB thấy im, bấm HTML, bấm EPUB lần nữa ->
    // ba lần xuất chạy chồng nhau, log trộn vào nhau, không đọc ra được cái nào của cái nào.
    if (exporting) return log('đang xuất file khác — chờ xong đã.');
    exporting = true;
    const t0 = Date.now();
    try {
      const chs = await collect(expectedOrders);
      if (!chs) return;
      const novel = JSON.parse((await GM_getValue('novel', '{}')) || '{}');
      // FIX #5: chưa từng bấm "Bắt đầu" thì novel là {} -> tiêu đề in ra "undefined".
      if (!novel.title) novel.title = adapter.parseNovel().title;
      if (state.langMode) novel.langMode = state.langMode;

      log(`đang xuất ${fmt.toUpperCase()} — ${chs.length} chương…`);
      const blob = await withTimeout(
        Promise.resolve(EXPORT[fmt](novel, chs, log)), CONFIG.exportTimeout, `xuất ${fmt}`);

      if (!blob || !blob.size) throw new Error('blob rỗng — không có gì để tải về');
      log(`đã tạo blob ${blob.size} bytes, đang gọi tải về…`);
      download(blob, `${safeName(novel.title)}${novel.langMode === 'zh' ? ' [Gốc Trung]' : ''}.${fmt}`);
      log(`đã xuất file (${Date.now() - t0}ms). Nếu trình duyệt không hỏi lưu ở đâu,`);
      log('  kiểm tra biểu tượng "chặn tải nhiều file" trên thanh địa chỉ.');
    } catch (e) {
      log('LỖI xuất file: ' + (e && e.message));
      console.error('[sctv] export', fmt, e);
      alert('Xuất file thất bại: ' + (e && e.message));
    } finally {
      exporting = false;
    }
  }

  // ── UI — tab "Download" của bảng chung (shared/ui-kit.js) ────
  let tocCache = null;
  const VERSION = '0.3.1';

  async function mountUI() {
    const el = (tag, props = {}, kids = []) => {
      const n = document.createElement(tag);
      Object.entries(props).forEach(([k, v]) => {
        if (k === 'class') n.className = v;
        else if (k === 'text') n.textContent = v;
        else if (v !== undefined && v !== null) n.setAttribute(k, v);
      });
      (Array.isArray(kids) ? kids : [kids]).forEach(k => k && n.appendChild(typeof k === 'string' ? document.createTextNode(k) : k));
      return n;
    };
    const field = (label, input) => el('div', {}, [el('span', { class: 'lb', text: label }), input]);
    const host = el('div', { style: 'all:initial;display:block;' });
    const root = host.attachShadow({ mode: 'open' });
    root.appendChild(el('style', { text: KIT_CSS +
      '.f2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin:0 0 8px;}.f2 input{width:100%;}' +
      '.g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:0 0 8px;}.g3>.btn{width:100%;padding-left:4px;padding-right:4px;}' +
      '.fx{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;margin:8px 0 0;}' +
      '.stat{font-size:11.5px;font-weight:700;margin:6px 0 0;min-height:16px;}' +
      '.console{height:150px;}.help{white-space:pre-wrap;}' }));
    const kit = el('div', { class: 'kit' });
    root.appendChild(kit);
    const help = el('div', { class: 'card hint help', style: 'display:none', text: [
      '• Mở trang MỤC LỤC của truyện (…/truyen/<nguồn>/<n>/<mã>/) — script đọc mục lục, chọn khoảng chương rồi "Bắt đầu".',
      '• Chương tải về nằm trong bộ nhớ tạm (IndexedDB của trang) — tải đến đâu xuất đến đó, "Xuất file" lúc nào cũng được.',
      '• Chương lỗi / bị site từ chối được ghi lại; "Thử lại chương lỗi" chỉ tải lại các chương đó.',
      '• Rời trang giữa chừng là mất chương đang tải dở — trình duyệt sẽ hỏi lại trước khi đóng.',
    ].join('\n') });
    kit.appendChild(help);

    const ui = {
      from: el('input', { type: 'number', min: '1', value: '1' }),
      to: el('input', { type: 'number', min: '1' }),
      start: el('button', { class: 'btn pri', text: 'Bắt đầu', disabled: '' }),
      pause: el('button', { class: 'btn warn', text: 'Tạm dừng', disabled: '' }),
      stop: el('button', { class: 'btn dan', text: 'Dừng', disabled: '' }),
      barI: el('i'),
      mode: el('select'),
      fmt: el('select'),
      exp: el('button', { class: 'btn sec', text: 'Xuất file' }),
      stat: el('div', { class: 'stat' }),
      retry: el('button', { class: 'btn full', text: 'Thử lại chương lỗi' }),
      clear: el('button', { class: 'btn dan full', text: 'Xóa bộ nhớ tạm' }),
      log: el('div', { class: 'console' }),
    };
    [['vi', 'Tiếng Việt (convert)'], ['zh', 'Bản gốc tiếng Trung (từ thẻ <i>)']].forEach(([v, t]) => ui.mode.appendChild(el('option', { value: v, text: t })));
    [['txt', 'TXT'], ['md', 'Markdown'], ['html', 'HTML'], ['epub', 'EPUB']].forEach(([v, t]) => ui.fmt.appendChild(el('option', { value: v, text: t })));
    kit.appendChild(el('div', { class: 'card' }, [
      el('h4', { text: 'Tải truyện' }),
      el('div', { class: 'f2' }, [field('Từ chương', ui.from), field('Đến chương', ui.to)]),
      el('div', { class: 'g3' }, [ui.start, ui.pause, ui.stop]),
      el('div', { class: 'bar' }, [ui.barI]),
      ui.stat,
      el('span', { class: 'lb', text: 'Bản dịch', style: 'margin-top:8px' }),
      el('div', { class: 'row', style: 'margin-top:0' }, [ui.mode]),
      el('span', { class: 'lb', text: 'Định dạng', style: 'margin-top:8px' }),
      el('div', { class: 'fx', style: 'margin-top:0' }, [ui.fmt, ui.exp]),
    ]));
    kit.appendChild(el('div', { class: 'card' }, [
      el('h4', { text: 'Tình trạng' }),
      el('div', { class: 'row' }, [ui.retry]),
      el('div', { class: 'row' }, [ui.clear]),
      el('span', { class: 'lb', text: 'Nhật ký' }),
      ui.log,
    ]));
    hubTab('ndl', 'Download', 20, VERSION).appendChild(host);
    document.addEventListener('aurel-hub:help', e => { if (e.detail === 'ndl') help.style.display = help.style.display === 'none' ? '' : 'none'; });

    const log = m => { ui.log.textContent += m + '\n'; ui.log.scrollTop = ui.log.scrollHeight; };
    const setStat = s => {
      const parts = [`${s.ok}/${s.total}`];
      if (s.failed) parts.push(`lỗi ${s.failed}`);
      if (s.refused) parts.push(`bị từ chối ${s.refused}`);
      if (s.etaMs != null) parts.push(`còn ~${Math.ceil(s.etaMs / 60000)} phút`);
      ui.stat.textContent = parts.join(' — ');
      ui.barI.style.width = s.total ? Math.round((s.ok + (s.failed || 0) + (s.refused || 0)) / s.total * 100) + '%' : '0';
      if (pill && state.running) pill.tx.textContent = `${s.ok}/${s.total} chương`;
    };

    // Vòng tròn: tải cả truyện (hoặc mở tab nếu đang chạy). Chữ: mở tab.
    const pill = dockPill(dockSlot('ndl', 20), 'ndl', 'Download',
      () => { if (state.running || ui.start.disabled) hubShow('ndl'); else { ui.from.value = 1; ui.start.click(); } },
      () => hubShow('ndl'));
    pill.ic.title = 'Tải cả truyện';
    pill.tx.title = 'Mở bảng tải truyện STV';

    // Mọi lỗi thoát khỏi try/catch đều phải hiện lên khung log, không chỉ ở console.
    // 0.2.0 để EPUB chết mà không để lại dấu vết nào trên UI.
    window.addEventListener('unhandledrejection', e =>
      log('PROMISE LỖI: ' + ((e.reason && e.reason.message) || e.reason)));
    window.addEventListener('error', e => log('JS LỖI: ' + e.message));

    // IndexedDB tách theo origin — in ra để không tự bẫy mình khi đổi host.
    log(`origin: ${location.origin}`);
    log(`nén: ${typeof CompressionStream === 'undefined' ? 'KHÔNG có CompressionStream — EPUB sẽ to hơn nhưng vẫn chạy' : 'deflate-raw'}`);
    log('đang tìm mục lục…');

    // FIX #1: mục lục render bằng JS, đọc đồng bộ ở document-idle thường ra 0 chương.
    let all;
    try {
      all = await waitFor(adapter.parseToc, CONFIG.tocTimeout);
    } catch {
      log('KHÔNG tìm thấy mục lục sau ' + (CONFIG.tocTimeout / 1000) + 's.');
      log('Selector "#chaptercontainerinner a.listchapitem" có thể đã đổi. Tải lại trang hoặc soi lại selector.');
      ui.exp.onclick = () => doExport(ui.fmt.value, null, log);
      return;
    }

    tocCache = all;
    const orders = all.map(c => c.order);
    ui.to.value = orders[orders.length - 1];
    ui.start.disabled = false;
    log(`tìm thấy ${all.length} chương.`);

    // Ba phép đối chiếu. Mục lục hụt chương là kiểu hỏng KHÔNG tự lộ ra, vì mọi thứ
    // phía sau — kể cả phần dò lỗ hổng lúc xuất file — đều tin vào chính mục lục này.
    if (all.skipped)
      log(`⚠ ${all.skipped}/${all.anchorCount} mục không đọc được số chương — đã bỏ.`);
    if (all.dropped && all.dropped.length) {
      log(`⚠ ${all.dropped.length} mục có số [n] TRÙNG — đã bỏ (nếu không bỏ thì chúng ghi đè nhau):`);
      all.dropped.forEach(c => log(`   [${c.order}] ${c.title}`));
    }
    // Đối chiếu với anchorCount, KHÔNG phải all.length: site đếm cả tiêu đề quyển là
    // chương (đo được: khai báo 59 = 57 chương + 2 tiêu đề). So với all.length thì
    // cảnh báo này kêu ở mọi lần chạy — và cảnh báo kêu oan là cảnh báo bị bỏ qua.
    const declared = (document.title.match(/(\d+)\s*chương/i) || [])[1];
    if (declared && Number(declared) !== all.anchorCount)
      log(`⚠ trang khai báo ${declared} mục, DOM chỉ có ${all.anchorCount} anchor.`);
    if (orders[orders.length - 1] !== all.length)
      log(`⚠ mục lục không liên tục: số cao nhất ${orders[orders.length - 1]}, có ${all.length} mục.`);

    const stored = new Set(await DB.getAllKeys());
    if (stored.size) log(`bộ nhớ tạm đang có ${stored.size} chương.`);

    const setRunning = on => {
      state.running = on;
      ui.start.disabled = on;
      ui.pause.disabled = !on;
      ui.stop.disabled = !on;
      if (!on) { state.paused = false; ui.pause.textContent = 'Tạm dừng'; }
      pill.pill.classList.toggle('busy', on);
      pill.pill.classList.toggle('open', on);
      if (!on) pill.tx.textContent = 'Download';
    };

    const run = async list => {
      if (state.running || !list.length) return;
      state.langMode = ui.mode.value;
      const nv = adapter.parseNovel();
      nv.langMode = ui.mode.value;
      await GM_setValue('novel', JSON.stringify(nv));
      setRunning(true);
      await crawl(list, (ch, msg) => log(ch ? `[${ch.order}] ${msg}` : msg), setStat);
      setRunning(false);
      log('kết thúc.');
    };

    ui.start.onclick = () => {
      const from = +ui.from.value, to = +ui.to.value;
      run(all.filter(c => c.order >= from && c.order <= to));
    };
    ui.pause.onclick = () => {
      state.paused = !state.paused;
      ui.pause.textContent = state.paused ? 'Chạy tiếp' : 'Tạm dừng';
      log(state.paused ? 'tạm dừng.' : 'chạy tiếp.');
    };
    // FIX #13: bản cũ chỉ có Tạm dừng — không có đường nào set state.running = false.
    ui.stop.onclick = () => { log('đang dừng…'); setRunning(false); };
    document.addEventListener('aurel-hub:close', e => { if (e.detail === 'ndl' && state.running) { log('đang dừng…'); setRunning(false); } });

    // Thử lại CẢ HAI sổ, nhưng nói rõ cái nào là cái nào: chương bị site từ chối thì
    // thử lại gần như chắc chắn ra đúng kết quả cũ — chỉ đáng bấm khi đã cách một
    // thời gian và bạn nghĩ site đã mở chương đó ra.
    ui.retry.onclick = async () => {
      const failed = new Set(JSON.parse((await GM_getValue('failed', '[]')) || '[]'));
      const refused = new Set(JSON.parse((await GM_getValue('refused', '[]')) || '[]'));
      const list = all.filter(c => failed.has(c.order) || refused.has(c.order));
      if (!list.length) return log('không có chương lỗi hay bị từ chối nào được ghi nhận.');
      log(`thử lại ${list.length} chương: ${failed.size} lỗi + ${refused.size} bị từ chối.`);
      if (refused.size) log('  (phần bị từ chối nhiều khả năng vẫn từ chối)');
      run(list);
    };

    ui.exp.onclick = () => {
      const from = +ui.from.value, to = +ui.to.value;
      doExport(ui.fmt.value, orders.filter(o => o >= from && o <= to), log);
    };

    ui.clear.onclick = async () => {
      if (state.running) return log('đang chạy — dừng trước đã.');
      if (!confirm('Xóa toàn bộ chương đã tải trong bộ nhớ tạm?')) return;
      await DB.clear();
      await GM_setValue('failed', '[]');
      log('đã xóa bộ nhớ tạm.');
    };
  }

  // Rời trang giữa chừng là mất chương đang tải dở (và mọi chương chưa tới).
  window.addEventListener('beforeunload', e => {
    if (state.running) { e.preventDefault(); e.returnValue = ''; }
  });

  if (adapter.isTocPage()) {
    mountUI();
    GM_registerMenuCommand('Xuất TXT', () => doExport('txt', tocCache && tocCache.map(c => c.order)));
    GM_registerMenuCommand('Xuất EPUB', () => doExport('epub', tocCache && tocCache.map(c => c.order)));
  }
})();

/* ─────────────────────────────────────────────────────────────
   BƯỚC TIẾP THEO — bỏ iframe

   Engine hiện tại nạp TRỌN một trang web cho mỗi chương: HTML, CSS, font,
   quảng cáo, toàn bộ JS của site. 800 chương = 800 lần render đầy đủ.

   Nội dung được JS tiêm vào, nghĩa là có một request trả về nó. Tìm được
   request đó thì chỉ cần thay đúng loadChapter() — mọi thứ còn lại giữ nguyên:

     async function loadChapter(url) {
       const r = await fetch(ENDPOINT, { method: 'POST', body: ..., credentials: 'include' });
       if (!r.ok) throw new Error('HTTP ' + r.status);
       const html = (await r.json()).data;          // tuỳ hình dạng response
       const doc = new DOMParser().parseFromString(html, 'text/html');
       document.body.appendChild(...)               // cần layout thì innerText mới chạy
       ...
     }

   Cách tìm: mở một trang chương, DevTools → Network → lọc Fetch/XHR → F5,
   tìm request trả về text tiếng Việt của chương. Ghi lại URL, method, payload.

   Nhanh hơn cỡ 20–50 lần, không còn phụ thuộc frame-busting, và bỏ được cả
   CONFIG.sandbox lẫn @noframes.

   ─────────────────────────────────────────────────────────────
   FALLBACK nếu site chặn iframe kể cả khi đã sandbox
     1. Lưu hàng đợi chương vào GM_setValue.
     2. Khi script chạy trên trang chương (adapter.isChapterPage()):
        đợi khối nội dung xuất hiện -> ghi IndexedDB -> đọc chương kế
        trong hàng đợi -> location.href = url kế tiếp.
     3. Hết hàng đợi thì quay về trang mục lục và bật nút xuất file.
   Chậm hơn iframe vì mỗi chương một lần load đầy đủ. Bỏ @noframes nếu dùng cách này.
   ───────────────────────────────────────────────────────────── */

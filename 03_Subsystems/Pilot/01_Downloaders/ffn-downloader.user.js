// ==UserScript==
// @name         Tải truyện FanFiction.net (EPUB)
// @namespace    aurel.ffn-epub
// @version      1.2.0
// @description  Tải truyện FanFiction.net / FictionPress ra EPUB: giữ định dạng chữ (nghiêng, đậm, gạch ngang, căn giữa), có bìa, trang thông tin (tóm tắt, thể loại, số chữ…), mục lục theo chương. Chọn khoảng chương, dừng và chạy tiếp được.
// @author       Aurel
// @match        *://www.fanfiction.net/s/*
// @match        *://m.fanfiction.net/s/*
// @match        *://fanfiction.net/s/*
// @match        *://www.fictionpress.com/s/*
// @match        *://m.fictionpress.com/s/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==
//
// Chỉ gọi cùng trang (fanfiction.net / fictionpress.com): trang chương và ảnh bìa
// (/image/…) đều nằm trên chính domain đó, nên không cần @connect hay GM_xmlhttpRequest.
//
// FanFiction.net chặn khá gắt (Cloudflare + giới hạn tốc độ). Script tải TỪNG chương
// một, mặc định nghỉ 3 giây giữa hai chương. Gặp trang xác minh Cloudflare thì dừng và
// báo — tải lại trang, qua bước xác minh, bấm "Bắt đầu" lần nữa: chương đã tải được
// giữ lại trong phiên, chỉ tải phần còn thiếu.
//
// 1.1.0
//  - Giao diện vào tab "Download" của bảng chung (shared/ui-kit.js) cùng TTS Reader và TM
//    Translate, theo bản thiết kế 00_Layout; bỏ nút nổi riêng. Vòng tròn tải trên cột nút =
//    tải cả truyện ngay.
//  - Mới: mẫu đặt tên file, có xem trước. Mặc định "(Tên truyện) - (Tác giả)"; kiểu cũ
//    "(Tên truyện).(Mã truyện)" vẫn chọn được.

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

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n, w = 4) => String(n).padStart(w, '0');
  const clean = (s) => String(s || '').replace(/[\s ]+/g, ' ').trim();

  const m = location.pathname.match(/^\/s\/(\d+)(?:\/(\d+))?(?:\/([^/?#]*))?/);
  if (!m) return;
  const STORY_ID = m[1];
  const CUR_CH = +(m[2] || 1);
  const SLUG = m[3] || '';
  const CONTENT_SEL = '#storytext, #storycontent';   // bản điện thoại dùng #storycontent
  if (!$(CONTENT_SEL)) return;

  /* ========================= THÔNG TIN TRUYỆN ========================= */

  const LANGS = {
    English: 'en', Spanish: 'es', French: 'fr', German: 'de', Italian: 'it', Portuguese: 'pt',
    Chinese: 'zh', Japanese: 'ja', Korean: 'ko', Russian: 'ru', Vietnamese: 'vi', Indonesian: 'id',
    Dutch: 'nl', Polish: 'pl', Turkish: 'tr', Filipino: 'fil', Tagalog: 'tl', Thai: 'th',
  };

  function readMeta() {
    const top = $('#profile_top') || document;
    const title = clean(($('b.xcontrast_txt', top) || $('#content b') || {}).textContent) || document.title.split(/ Chapter \d+|, a /)[0];
    const authorA = $('a[href^="/u/"], a[href*="fanfiction.net/u/"], a[href*="fictionpress.com/u/"]', top);
    const summary = clean(($('div.xcontrast_txt', top) || {}).textContent);
    const metaEl = $('span.xgray', top);
    const metaText = clean(metaEl && metaEl.textContent);
    // "Rated: Fiction T - English - Drama/Humor - Harry P., Hermione G. - Chapters: 122 - Words: 661,619 - …"
    const parts = metaText.split(/\s+-\s+/);
    const field = (name) => {
      const p = parts.find((x) => x.startsWith(name + ':'));
      return p ? p.slice(name.length + 1).trim() : '';
    };
    const plain = parts.filter((x) => !/^[A-Za-z]+:/.test(x));   // phần không có nhãn: ngôn ngữ, thể loại, nhân vật
    const language = plain[0] || '';
    const genre = plain[1] && !/,|\[|\./.test(plain[1]) ? plain[1] : '';
    const characters = plain.slice(genre ? 2 : 1).join(' - ');
    const dateOf = (label) => {
      // Ngày chuẩn nằm ở data-xutime (unix) — chữ hiển thị có lúc chỉ là "5h ago"
      const span = metaEl && $$('span[data-xutime]', metaEl).find((s) => (s.previousSibling && s.previousSibling.textContent || '').includes(label));
      return span ? new Date(+span.getAttribute('data-xutime') * 1000).toISOString().slice(0, 10) : field(label);
    };
    const fandom = $$('#pre_story_links a').map((a) => clean(a.textContent)).filter(Boolean).pop() || '';

    const bigCover = $('#img_large img');
    const smallCover = $('img.cimage', top);
    let cover = (bigCover && bigCover.getAttribute('data-original')) || (smallCover && smallCover.getAttribute('src')) || '';
    if (cover) cover = cover.replace(/\/75\/?$/, '/180/');   // ảnh nhỏ 75px → bản 180px

    return {
      title, summary, fandom, language, genre, characters,
      author: clean(authorA && authorA.textContent) || 'Không rõ',
      authorUrl: authorA ? new URL(authorA.getAttribute('href'), location.origin).href : '',
      rated: field('Rated'),
      words: field('Words'),
      chaptersDeclared: field('Chapters'),
      status: field('Status') || 'In-Progress',
      published: dateOf('Published'),
      updated: dateOf('Updated'),
      url: `${location.origin}/s/${STORY_ID}/1/${SLUG}`,
      cover: cover ? new URL(cover, location.origin).href : '',
      lang: LANGS[language] || 'en',
    };
  }

  /** Danh sách chương từ ô chọn chương; truyện 1 chương thì không có ô này. */
  function readChapters(meta) {
    const sel = $('#chap_select');
    if (!sel) return [{ n: 1, title: meta.title }];
    return [...sel.options].map((o) => ({ n: +o.value, title: clean(o.textContent).replace(/^\d+\.\s*/, '') || 'Chapter ' + o.value }));
  }

  /* ========================= HTML CHƯƠNG → XHTML ========================= */

  const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const stripCtl = (s) => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');   // XML cấm → EPUB hỏng lúc mở

  const KEEP = new Set(['p', 'em', 'i', 'strong', 'b', 'u', 's', 'strike', 'del', 'sub', 'sup', 'blockquote',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'div', 'span', 'table', 'thead', 'tbody', 'tr', 'td', 'th']);
  const RENAME = { i: 'em', b: 'strong', strike: 's', del: 's', center: 'div' };

  /**
   * Chép lại nội dung chương thành XHTML sạch: chỉ giữ thẻ định dạng chữ, chỉ giữ
   * thuộc tính text-align (FFN căn giữa bằng style). Thẻ lạ thì bỏ vỏ, giữ chữ.
   * Làm bằng tay thay vì innerHTML: HTML của FFN có <hr noshade> không đóng, XHTML
   * của EPUB mà dính thứ đó là reader từ chối mở cả file.
   */
  function toXhtml(node) {
    let out = '';
    for (const n of node.childNodes) {
      if (n.nodeType === 3) { out += xmlEsc(stripCtl(n.nodeValue)); continue; }
      if (n.nodeType !== 1) continue;
      let tag = n.tagName.toLowerCase();
      if (tag === 'br') { out += '<br/>'; continue; }
      if (tag === 'hr') { out += '<hr/>'; continue; }
      if (/^(script|style|noscript|iframe|button|select|form|img)$/.test(tag)) continue;
      const inner = toXhtml(n);
      let align = '';
      const st = (n.getAttribute('style') || '') + ';' + (n.getAttribute('align') ? 'text-align:' + n.getAttribute('align') : '');
      const am = st.match(/text-align\s*:\s*(center|right|left|justify)/i);
      if (am) align = am[1].toLowerCase();
      if (tag === 'center') align = 'center';
      tag = RENAME[tag] || tag;
      if (!KEEP.has(tag)) { out += inner; continue; }
      if (tag === 'span' && !align) { out += inner; continue; }
      out += `<${tag}${align ? ` style="text-align:${align}"` : ''}>${inner}</${tag}>`;
    }
    return out;
  }

  /* ========================= TẢI CHƯƠNG ========================= */

  class StopError extends Error {}
  class CloudflareError extends Error {}

  const chapCache = new Map();   // n -> xhtml (sống trong phiên: dừng rồi chạy lại không tải lại)

  function looksChallenge(html, status) {
    return (status === 403 || status === 503) && /just a moment|cf-chl|challenge-platform|cf_chl_opt/i.test(html);
  }

  async function fetchChapter(n, signal, log) {
    if (chapCache.has(n)) return chapCache.get(n);
    // Chương đang mở: lấy luôn từ trang, khỏi gọi mạng
    if (n === CUR_CH) {
      const x = toXhtml($(CONTENT_SEL));
      chapCache.set(n, x);
      return x;
    }
    const url = `${location.origin}/s/${STORY_ID}/${n}/${SLUG}`;
    const backoff = [5000, 15000, 30000, 60000];
    for (let attempt = 0; ; attempt++) {
      if (signal.aborted) throw new StopError('đã dừng');
      let res, html;
      try {
        res = await fetch(url, { signal });
        html = await res.text();
      } catch (e) {
        if (signal.aborted) throw new StopError('đã dừng');
        if (attempt >= backoff.length) throw new Error('lỗi mạng: ' + e.message);
        log(`  … lỗi mạng ở chương ${n}, thử lại sau ${backoff[attempt] / 1000}s`);
        await sleep(backoff[attempt]);
        continue;
      }
      if (looksChallenge(html, res.status)) throw new CloudflareError('Cloudflare đòi xác minh');
      if (res.status === 429 || res.status === 503) {
        if (attempt >= backoff.length) throw new Error('bị giới hạn tốc độ (HTTP ' + res.status + ')');
        const ra = parseFloat(res.headers.get('Retry-After') || '');
        const wait = Number.isFinite(ra) ? Math.min(ra * 1000, 120000) : backoff[attempt];
        log(`  ⏳ FFN bảo chậm lại (HTTP ${res.status}) — nghỉ ${Math.round(wait / 1000)}s`);
        await sleep(wait);
        continue;
      }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const box = $(CONTENT_SEL, doc);
      if (!box) {
        if (/chapter not found|story not found/i.test(doc.body ? doc.body.textContent : '')) throw new Error('không có chương này');
        if (attempt >= 2) throw new Error('không thấy nội dung chương');
        await sleep(3000);
        continue;
      }
      const x = toXhtml(box);
      chapCache.set(n, x);
      return x;
    }
  }

  async function fetchCover(url) {
    if (!url) return null;
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      const buf = new Uint8Array(await r.arrayBuffer());
      // đoán định dạng theo byte đầu, không tin content-type
      let mime = '', ext = '';
      if (buf[0] === 0xff && buf[1] === 0xd8) { mime = 'image/jpeg'; ext = 'jpg'; }
      else if (buf[0] === 0x89 && buf[1] === 0x50) { mime = 'image/png'; ext = 'png'; }
      else if (buf[0] === 0x47 && buf[1] === 0x49) { mime = 'image/gif'; ext = 'gif'; }
      else if (buf[8] === 0x57 && buf[9] === 0x45) { mime = 'image/webp'; ext = 'webp'; }
      else return null;
      return { data: buf, mime, ext };
    } catch (e) { return null; }
  }

  /* ========================= ZIP =========================
   * Bộ ghi ZIP tự viết — chép nguyên từ "Tải truyện Wikidich" 2.3.0 (đã chạy thật 113 chương):
   * deflate bằng CompressionStream, tự lùi về store; ZIP64 khi quá lớn.
   * ====================================================== */
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

  function uuid() {
    if (window.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  const page = (title, body, lang) => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${lang}">
<head><meta charset="utf-8"/><title>${xmlEsc(title)}</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
${body}
</body></html>`;

  async function buildEpub(meta, chapters, cover) {
    const id = 'urn:uuid:' + uuid();
    const lang = meta.lang;
    const files = [];
    const push = (name, str) => files.push({ name, data: ENC.encode(str) });

    files.push({ name: 'mimetype', data: ENC.encode('application/epub+zip'), store: true });   // phải đầu tiên, không nén
    push('META-INF/container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);
    push('OEBPS/style.css', `body{font-family:serif;line-height:1.6;margin:1em}
h1,h2{text-align:center;line-height:1.35}
p{margin:.5em 0;text-align:justify}
hr{border:0;border-top:1px solid #999;margin:1.2em 20%}
.info{margin:.3em 0;text-align:left}
.info b{font-weight:bold}
.summary{margin:1em 0;font-style:italic}
.cover{text-align:center;margin:0;padding:0}
.cover img{max-width:100%;max-height:100%}`);

    const manifest = [];
    const spine = [];
    const nav = [];

    if (cover) {
      files.push({ name: `OEBPS/cover.${cover.ext}`, data: cover.data, store: true });
      manifest.push(`<item id="cover-image" href="cover.${cover.ext}" media-type="${cover.mime}"/>`);
      push('OEBPS/cover.xhtml', page('Bìa', `<div class="cover"><img src="cover.${cover.ext}" alt="${xmlEsc(meta.title)}"/></div>`, lang));
      manifest.push('<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>');
      spine.push('<itemref idref="cover" linear="no"/>');
    }

    // Trang thông tin: giữ đủ những gì trang truyện FFN hiện, để sau này khỏi phải mở lại web
    const row = (k, v) => (v ? `<p class="info"><b>${xmlEsc(k)}:</b> ${xmlEsc(v)}</p>` : '');
    const infoBody = [
      `<h1>${xmlEsc(meta.title)}</h1>`,
      `<p class="info" style="text-align:center">by ${xmlEsc(meta.author)}</p>`,
      meta.summary ? `<p class="summary">${xmlEsc(meta.summary)}</p>` : '',
      row('Fandom', meta.fandom), row('Rated', meta.rated), row('Language', meta.language),
      row('Genre', meta.genre), row('Characters', meta.characters),
      row('Chapters', String(chapters.length) + (meta.chaptersDeclared && +meta.chaptersDeclared.replace(/\D/g, '') !== chapters.length ? ` (trên ${meta.chaptersDeclared})` : '')),
      row('Words', meta.words), row('Status', meta.status),
      row('Published', meta.published), row('Updated', meta.updated),
      row('Source', meta.url), row('Author page', meta.authorUrl),
      row('Downloaded', new Date().toISOString().slice(0, 10)),
    ].join('\n');
    push('OEBPS/info.xhtml', page('Thông tin truyện', infoBody, lang));
    manifest.push('<item id="info" href="info.xhtml" media-type="application/xhtml+xml"/>');
    spine.push('<itemref idref="info"/>');
    nav.push({ title: 'Thông tin truyện', file: 'info.xhtml' });

    chapters.forEach((c) => {
      const f = `c${pad(c.n)}.xhtml`;
      const head = chapters.length > 1 || c.title !== meta.title ? `<h2>${xmlEsc(c.title)}</h2>\n` : '';
      push('OEBPS/' + f, page(c.title, head + (c.xhtml || '<p>[Không tải được chương này]</p>'), lang));
      manifest.push(`<item id="c${c.n}" href="${f}" media-type="application/xhtml+xml"/>`);
      spine.push(`<itemref idref="c${c.n}"/>`);
      nav.push({ title: c.title, file: f });
    });

    push('OEBPS/toc.ncx', `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
<head><meta name="dtb:uid" content="${id}"/><meta name="dtb:depth" content="1"/></head>
<docTitle><text>${xmlEsc(meta.title)}</text></docTitle>
<navMap>
${nav.map((x, k) => `<navPoint id="np${k + 1}" playOrder="${k + 1}"><navLabel><text>${xmlEsc(x.title)}</text></navLabel><content src="${x.file}"/></navPoint>`).join('\n')}
</navMap>
</ncx>`);

    const subjects = [meta.fandom, ...(meta.genre ? meta.genre.split('/') : [])].filter(Boolean)
      .map((s) => `  <dc:subject>${xmlEsc(s)}</dc:subject>`).join('\n');
    push('OEBPS/content.opf', `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="BookId">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
  <dc:title>${xmlEsc(meta.title)}</dc:title>
  <dc:creator opf:role="aut">${xmlEsc(meta.author)}</dc:creator>
  <dc:language>${lang}</dc:language>
  <dc:identifier id="BookId">${id}</dc:identifier>
  <dc:source>${xmlEsc(meta.url)}</dc:source>
  <dc:publisher>${xmlEsc(location.hostname.replace(/^(www|m)\./, ''))}</dc:publisher>
  ${meta.summary ? `<dc:description>${xmlEsc(meta.summary)}</dc:description>` : ''}
  ${meta.published ? `<dc:date opf:event="publication">${xmlEsc(meta.published)}</dc:date>` : ''}
${subjects}
  ${cover ? '<meta name="cover" content="cover-image"/>' : ''}
</metadata>
<manifest>
  <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  <item id="css" href="style.css" media-type="text/css"/>
${manifest.join('\n')}
</manifest>
<spine toc="ncx">
${spine.join('\n')}
</spine>
${cover ? '<guide><reference type="cover" title="Bìa" href="cover.xhtml"/></guide>' : ''}
</package>`);

    return makeZip(files, 'application/epub+zip');
  }

  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  function safeName(s) {
    return String(s || '').replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150).replace(/[. ]+$/, '') || 'story';
  }

  /* ========================= ĐẶT TÊN FILE ========================= */

  // Nhớ trong localStorage của trang (script chạy @grant none). Không đọc được thì dùng mặc định.
  const CFG_KEY = 'aurel-ffn-epub';
  const DEFAULTS = { nameTpl: 'archive', nameClean: true, nameShort: true, delay: 3, cover: true };
  let CFG = Object.assign({}, DEFAULTS);
  try { CFG = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(CFG_KEY) || '{}')); } catch (e) {}
  const saveCfg = () => { try { localStorage.setItem(CFG_KEY, JSON.stringify(CFG)); } catch (e) {} };

  const NAME_TPL = [
    ['archive', 'ENG_(Tên truyện) — quy ước kho'],
    ['title-author', '(Tên truyện) - (Tác giả)'],
    ['title', '(Tên truyện)'],
    ['author-title', '(Tác giả) - (Tên truyện)'],
    ['title-id', '(Tên truyện).(Mã truyện) — kiểu cũ'],
  ];
  function fileBase(meta) {
    let t = meta.title || 'story', a = meta.author || 'Không rõ';
    if (CFG.nameClean) {
      const cl = (s) => s.replace(/[^\p{L}\p{N}\p{M}\s\-_.,()[\]'!&+]+/gu, ' ').replace(/\s+/g, ' ').trim();
      t = cl(t) || 'story'; a = cl(a) || 'Không rõ';
    }
    if (CFG.nameShort) {
      const cut = (s, n) => (s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + '…');
      t = cut(t, 80); a = cut(a, 40);
    }
    const pre = { en: 'ENG', zh: 'ZH', ja: 'JP', ko: 'KR' }[meta.lang];
    const name = { archive: pre ? `${pre}_${t}` : t, 'title-author': `${t} - ${a}`, title: t, 'author-title': `${a} - ${t}`, 'title-id': `${t}.${STORY_ID}` }[CFG.nameTpl] || (pre ? `${pre}_${t}` : t);
    return safeName(name);
  }

  /* ========================= GIAO DIỆN — tab "Download" của bảng chung ========================= */

  const VERSION = '1.1.0';
  const TAB_CSS = KIT_CSS +
    '.info{background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;font-size:11.5px;line-height:1.5;margin:0 0 8px;min-height:36px;white-space:pre-wrap;word-break:break-word;}' +
    '.f2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin:0 0 6px;}.f2 input{width:100%;}' +
    '.log{background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:8px 10px;font-size:11px;line-height:1.5;margin:8px 0 0;max-height:170px;overflow:auto;white-space:pre-wrap;word-break:break-word;}' +
    '.log .err{color:var(--k-err);}' +
    '.prev{background:var(--k-field);border:1px solid var(--k-line);border-radius:8px;padding:7px 10px;font-size:11.5px;word-break:break-all;}' +
    '.help{white-space:pre-wrap;}';
  const HELP = [
    '• Mở truyện ở bất kỳ chương nào; chọn khoảng chương rồi "Bắt đầu". Vòng tròn tải trên cột nút: tải cả truyện ngay.',
    '• FanFiction.net chặn nếu tải nhanh — để nghỉ ≥ 2 giây giữa hai chương.',
    '• Gặp bước xác minh Cloudflare: script xuất ngay phần đã tải, điền sẵn ô "Từ chương". Tải lại trang (F5), qua bước xác minh, bấm "Bắt đầu" để tải phần còn lại.',
    '• Dừng rồi bấm lại "Bắt đầu": chương đã tải trong phiên này được giữ, chỉ tải phần còn thiếu.',
  ].join('\n');

  function el(tag, props = {}, kids = []) {
    const n = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null) n.setAttribute(k, v);
    });
    (Array.isArray(kids) ? kids : [kids]).forEach((k) => k && n.appendChild(typeof k === 'string' ? document.createTextNode(k) : k));
    return n;
  }
  const field = (label, input) => el('div', {}, [el('span', { class: 'lb', text: label }), input]);
  const ck = (label, key, after) => {
    const i = el('input', { type: 'checkbox' });
    i.checked = !!CFG[key];
    i.addEventListener('change', () => { CFG[key] = i.checked; saveCfg(); if (after) after(); });
    return el('label', { class: 'ck' }, [i, label]);
  };

  function buildUI(meta, chapters) {
    const host = el('div', { style: 'all:initial;display:block;' });
    const root = host.attachShadow({ mode: 'open' });
    root.appendChild(el('style', { text: TAB_CSS }));
    const kit = el('div', { class: 'kit' });
    root.appendChild(kit);
    const help = el('div', { class: 'card hint help', style: 'display:none', text: HELP });
    kit.appendChild(help);

    const ui = {};
    ui.info = el('div', { class: 'info' });
    ui.from = el('input', { type: 'number', min: '1', value: '1' });
    ui.to = el('input', { type: 'number', min: '1' });
    ui.range = el('div', { class: 'hint', style: 'margin:0 0 8px' });
    ui.delay = el('input', { type: 'number', min: '1', max: '60', step: '0.5', value: String(CFG.delay), class: 'full' });
    ui.delay.addEventListener('change', () => { CFG.delay = Math.max(1, +ui.delay.value || 3); saveCfg(); });
    ui.coverCk = ck('Kèm ảnh bìa', 'cover');
    ui.cover = ui.coverCk.querySelector('input');
    ui.start = el('button', { class: 'btn pri', text: 'Bắt đầu' });
    ui.stop = el('button', { class: 'btn', text: 'Dừng' });
    ui.barI = el('i');
    ui.bar = ui.barI;
    ui.status = el('div', { class: 'info', text: 'Sẵn sàng.', style: 'margin:8px 0 0;min-height:0' });
    ui.log = el('div', { class: 'log' });
    kit.appendChild(el('div', { class: 'card' }, [
      el('h4', { text: 'Tải EPUB' }),
      ui.info,
      el('div', { class: 'f2' }, [field('Từ chương', ui.from), field('Đến chương', ui.to)]),
      ui.range,
      el('span', { class: 'lb', text: 'Nghỉ giữa 2 chương (giây)' }),
      el('div', { class: 'row' }, [ui.delay]),
      el('div', { class: 'hint', style: 'margin:0 0 8px', text: 'FanFiction.net chặn nếu tải quá nhanh. Dưới 2 giây dễ bị Cloudflare đòi xác minh.' }),
      el('div', { class: 'row' }, [ui.coverCk]),
      el('div', { class: 'g2' }, [ui.start, ui.stop]),
      el('div', { class: 'bar' }, [ui.barI]),
      ui.status,
    ]));

    // Đặt tên file
    const tpl = el('select', { class: 'full' });
    NAME_TPL.forEach(([v, t]) => { const o = el('option', { value: v, text: t }); if (CFG.nameTpl === v) o.selected = true; tpl.appendChild(o); });
    const prev = el('div', { class: 'prev' });
    const sample = () => { prev.textContent = fileBase(meta) + '.epub'; };
    tpl.addEventListener('change', () => { CFG.nameTpl = tpl.value; saveCfg(); sample(); });
    kit.appendChild(el('div', { class: 'card' }, [
      el('h4', { text: 'Đặt tên file' }),
      el('span', { class: 'lb', text: 'Mẫu tên' }), el('div', { class: 'row' }, [tpl]),
      el('div', { class: 'row' }, [ck('Bỏ ký tự đặc biệt / emoji', 'nameClean', sample)]),
      el('div', { class: 'row' }, [ck('Rút gọn tên quá dài', 'nameShort', sample)]),
      el('span', { class: 'lb', text: 'Xem trước' }), prev,
    ]));
    sample();

    kit.appendChild(el('div', { class: 'card' }, [el('span', { class: 'lb', text: 'Nhật ký' }), ui.log]));

    hubTab('ndl', 'Download', 20, VERSION).appendChild(host);
    document.addEventListener('aurel-hub:help', (ev) => { if (ev.detail === 'ndl') help.style.display = help.style.display === 'none' ? '' : 'none'; });

    ui.info.textContent = `${meta.title} — ${meta.author}\n${chapters.length} chương` + (meta.words ? ` · ${meta.words} chữ` : '') + ` · ${meta.status}`;
    ui.to.value = chapters.length;
    ui.from.max = ui.to.max = chapters.length;
    const hint = () => {
      const a = chapters[Math.max(1, +ui.from.value) - 1], b = chapters[Math.min(chapters.length, +ui.to.value) - 1];
      ui.range.textContent = a && b ? `${a.n}. ${a.title}  →  ${b.n}. ${b.title}` : '';
    };
    ui.from.oninput = ui.to.oninput = hint;
    hint();
    return ui;
  }

  /* ========================= CHẠY ========================= */

  function init() {
    const meta = readMeta();
    const chapters = readChapters(meta);
    const ui = buildUI(meta, chapters);
    const say = (msg, err) => {
      const d = document.createElement('div');
      if (err) d.className = 'err';
      d.textContent = msg;
      ui.log.appendChild(d);
      ui.log.scrollTop = ui.log.scrollHeight;
      ui.status.textContent = msg;
    };

    // Vòng tròn trên cột nút: tải cả truyện ngay. Chữ: mở tab.
    const pill = dockPill(dockSlot('ndl', 20), 'ndl', 'Download',
      () => { if (ui.start.disabled) { hubShow('ndl'); return; } ui.from.value = 1; ui.to.value = chapters.length; ui.start.onclick(); },
      () => hubShow('ndl'));
    pill.ic.title = 'Tải EPUB cả truyện ngay';
    pill.tx.title = 'Mở bảng tải truyện FanFiction';

    let abort = null;
    ui.stop.onclick = () => { if (abort) { abort.abort(); say('⏹ Đang dừng…'); } };
    document.addEventListener('aurel-hub:close', (ev) => { if (ev.detail === 'ndl' && abort) abort.abort(); });
    const busy = (on, text) => {
      ui.start.disabled = on; ui.start.textContent = on ? 'Đang tải…' : 'Bắt đầu';
      pill.pill.classList.toggle('busy', on); pill.pill.classList.toggle('open', on);
      pill.tx.textContent = on ? (text || 'Đang tải…') : 'Download';
    };

    ui.start.onclick = async () => {
      if (ui.start.disabled) return;
      const from = Math.max(1, +ui.from.value || 1), to = Math.min(chapters.length, +ui.to.value || chapters.length);
      if (to < from) { say('Khoảng chương không hợp lệ.', true); return; }
      const delay = Math.max(1000, (+ui.delay.value || 3) * 1000);
      const picked = chapters.slice(from - 1, to);
      abort = new AbortController();
      const signal = abort.signal;
      busy(true);
      ui.log.replaceChildren(); ui.bar.style.width = '0';

      const cachedN = picked.filter((c) => chapCache.has(c.n)).length;
      say(`▶ ${picked.length} chương (${from}–${to})` + (cachedN ? ` — ${cachedN} chương đã có sẵn, chỉ tải phần thiếu.` : '.'));

      const failed = [];
      let done = 0, stoppedBy = '';
      try {
        for (const c of picked) {
          if (signal.aborted) { stoppedBy = 'dừng'; break; }
          const fresh = !chapCache.has(c.n) && c.n !== CUR_CH;
          try {
            c.xhtml = await fetchChapter(c.n, signal, say);
            if (fresh) say(`✓ ${c.n}. ${c.title}`);
          } catch (e) {
            if (e instanceof StopError) { stoppedBy = 'dừng'; break; }
            if (e instanceof CloudflareError) {
              stoppedBy = 'cloudflare';
              // Tải lại trang là mất cache trong phiên → xuất ngay phần đã có, và điền
              // sẵn chương kế tiếp để sau khi qua xác minh chỉ việc bấm tải phần còn lại.
              ui.from.value = c.n;
              say(`⛔ Cloudflare đòi xác minh ở chương ${c.n}. Script xuất phần đã tải ngay bây giờ. ` +
                  `Sau đó: tải lại trang (F5), qua bước xác minh, mở bảng — ô "Từ chương" đặt ${c.n} — bấm "Bắt đầu" để tải phần còn lại.`, true);
              break;
            }
            failed.push(c);
            c.xhtml = '';
            say(`✗ ${c.n}. ${c.title} — ${e.message}`, true);
          }
          done++;
          ui.bar.style.width = (done / picked.length * 100) + '%';
          pill.tx.textContent = `Chương ${done}/${picked.length}`;
          if (fresh && done < picked.length && !signal.aborted) await sleep(delay + Math.random() * 800);
        }

        const got = picked.filter((c) => c.xhtml);
        if (!got.length) { say('Không có chương nào để xuất.', true); return; }
        if (stoppedBy) say(`Xuất phần đã tải: ${got.length}/${picked.length} chương.`);

        let cover = null;
        if (ui.cover.checked && meta.cover) {
          cover = await fetchCover(meta.cover);
          if (!cover) say('(không lấy được ảnh bìa — EPUB vẫn xuất, chỉ thiếu bìa)');
        }
        say('⏳ Đang đóng gói EPUB…');
        // Xuất cả chương lỗi (có dòng báo lỗi) để thứ tự và mục lục không bị lệch
        const list = stoppedBy ? got : picked;
        const blob = await buildEpub(meta, list, cover);
        const rangeTag = (from === 1 && to === chapters.length && !stoppedBy) ? '' : ` (${list[0].n}-${list[list.length - 1].n})`;
        saveBlob(blob, `${fileBase(meta)}${rangeTag}.epub`);
        say(`✔ Xong: ${list.length - failed.length} chương` + (failed.length ? `, lỗi ${failed.length} (${failed.map((c) => c.n).join(', ')}) — bấm "Bắt đầu" lại để thử riêng các chương lỗi.` : '.'));
      } catch (e) {
        say('✗ Lỗi: ' + e.message, true);
      } finally {
        abort = null;
        busy(false);
      }
    };
  }

  init();
})();

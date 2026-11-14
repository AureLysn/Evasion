// ==UserScript==
// @name         TTS Reader — Lofter
// @namespace    aurel.tts-reader
// @version      {{VERSION}}
// @description  Đọc bài Lofter bằng giọng Edge/Chrome. Dịch Trung → Việt trước khi đọc (qua TM Translate hoặc Google), tô màu theo chữ, tự sang bài kế.
// @author       Aurel
// @match        *://*.lofter.com/post/*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      translate.googleapis.com
// ==/UserScript==
//
// Trung → Việt mặc định đi qua TM Translate (cầu nối 'tm-bridge', không gọi mạng từ
// script này). Quyền mạng duy nhất là translate.googleapis.com, chỉ dùng khi bạn đổi
// máy dịch sang Google.

SITE = {
    id: 'lofter',
    name: 'Lofter',
    lang: 'zh',

    // Mỗi blog Lofter tự chọn theme → DOM khác nhau. Thử đầu tiên `div.content > div.text`:
    // Aurel đo được đây là vùng đọc của đa số blog (2026-10-09, đã dùng làm rule tự chọn).
    // Sau đó mới đến các theme cũ đã biết; không khớp cái nào (theme React đời mới, class
    // băm) thì lõi tự dò khối nhiều chữ nhất. Blog nào sai vẫn chỉnh được bằng "Chọn vùng đọc".
    contentSel: 'div.content:nth-of-type(1) > div.text || .m-postdtl .m-post .ctc || .m-post .ctc || .m-postdtl .ctc || .ctc || .m-post .txtcont || .txtcont',
    titleSel: '.m-postdtl h2.ttl a || .m-postdtl h2.ttl || .m-post h2.ttl a || .m-post h2.ttl || h2.ttl',
    waitMs: 12000,
    minText: 30,
    // Đoạn chỉ gồm link điều hướng tác giả chèn cuối bài → không đọc
    skipText: /^[\s【\[（(]*(上一章|下一章|上一篇|下一篇|上章|下章|目录|合集|next|prev(ious)?)(\s*chapter)?[\s】\]）)>》<《→←|｜/]*((上一章|下一章|上一篇|下一篇|目录|合集)[\s>》<《→←]*)*$/i,

    // Bài toàn ảnh: có khối nội dung, trong đó có ảnh, mà chữ không đủ minText. Theme đời mới
    // (không khớp contentSel) thì không đoán — trả '' để lõi đọc như thường.
    skip: function () {
        var body = q((sites[HOST] && sites[HOST].contentSel) || '') || q(SITE.contentSel);   // q() thử từng phần của chuỗi ||
        if (!body || !body.querySelector('img')) return '';
        return clean(body.textContent).length < SITE.minText ? 'bài chỉ có ảnh, không có chữ' : '';
    },

    // Lofter không có "chương sau" thật. Thứ tự ưu tiên:
    //  0. thứ tự của BỘ, dò từ mục lục /view của blog và xếp theo số chương trong tiêu đề
    //     (lofterSeriesNext, cuối file) — không lệ thuộc ngày đăng, nên tác giả sửa/đăng lại
    //     một chương cũ cũng không làm lệch thứ tự;
    //  1. link 下一章 / 下一篇 / "next" do tác giả đặt NGAY TRONG bài;
    //  2. nút phân trang của blog, theo chiều bạn chọn:
    //     上一篇 (#__prev_permalink__) = bài MỚI hơn, 下一篇 (#__next_permalink__) = bài CŨ hơn.
    //     Truyện đăng lần lượt chương 1, 2, 3… thì chương sau là bài MỚI hơn.
    next: function () {
        var inSeries = lofterSeriesNext();
        if (inSeries) return inSeries;
        var body = document.querySelector('div.content:nth-of-type(1) > div.text, .ctc, .txtcont') || null;
        if (body) {
            var inner = body.querySelectorAll('a[href]');
            for (var i = 0; i < inner.length; i++) {
                var t = (inner[i].textContent || '').trim();
                if (/^(下一章|下一篇|下章|下一节|next\s*(chapter)?)\s*[>》→]*$/i.test(t) || /下一章/.test(t)) {
                    return { url: inner[i].href, el: inner[i], how: 'link "' + t.slice(0, 12) + '" trong bài' };
                }
            }
        }
        var newer = cfg.lofterOrder !== 'older';
        var sels = newer ? ['#__prev_permalink__', '.m-pager a.prev', 'a.prev']
                         : ['#__next_permalink__', '.m-pager a.next', 'a.next'];
        for (var k = 0; k < sels.length; k++) {
            var el = document.querySelector(sels[k]);
            if (el && el.href && !/^javascript:/i.test(el.getAttribute('href') || '')) {
                return { url: el.href, el: el, how: newer ? 'bài mới hơn (上一篇)' : 'bài cũ hơn (下一篇)' };
            }
        }
        var want = newer ? /上一篇/ : /下一篇/;
        var as = document.querySelectorAll('a[href]');
        for (var j = 0; j < as.length; j++) {
            if (want.test(as[j].textContent || '') && !/^javascript:/i.test(as[j].getAttribute('href') || '')) {
                return { url: as[j].href, el: as[j], how: newer ? 'bài mới hơn (上一篇)' : 'bài cũ hơn (下一篇)' };
            }
        }
        return { none: 'không thấy link ' + (newer ? 'bài mới hơn (上一篇)' : 'bài cũ hơn (下一篇)') };
    },

    extraHtml: function () {
        return '<div class="grid"><label>Thứ tự chương</label>' +
            '<select id="lofterSeries"><option value="on">Tự dò bộ — xếp theo số chương trong tiêu đề</option>' +
            '<option value="off">Không dò — chỉ theo link trong bài / nút phân trang</option></select>' +
            '<div class="help" id="lofterSeriesInfo"></div>' +
            '<div class="two"><button class="b" id="lofterRescan">Dò lại mục lục</button>' +
            '<button class="b sec" id="lofterEdit">Chỉnh bộ…</button></div></div>' +
            '<div class="grid"><label>Khi không thuộc bộ nào, chương sau là…</label>' +
            '<select id="lofterOrder"><option value="newer">Bài MỚI hơn (上一篇) — truyện đăng từ chương 1 trở đi</option>' +
            '<option value="older">Bài CŨ hơn (下一篇) — đọc ngược dòng thời gian</option></select>' +
            '<div class="help">Link 下一章 tác giả đặt trong bài được ưu tiên hơn lựa chọn này.</div></div>';
    },
    bindExtra: function (x) {
        var sel = x.$('lofterOrder');
        sel.value = x.cfg.lofterOrder === 'older' ? 'older' : 'newer';
        sel.addEventListener('change', function () { x.cfg.lofterOrder = sel.value; x.save(); x.rescan(); });

        var ser = x.$('lofterSeries');
        ser.value = x.cfg.lofterSeries === 'off' ? 'off' : 'on';
        ser.addEventListener('change', function () { x.cfg.lofterSeries = ser.value; x.save(); refreshNext(); lofterShowInfo(); });
        x.$('lofterRescan').addEventListener('click', function () { lofterStartScan(); });
        x.$('lofterEdit').addEventListener('click', function () { lofterOpenEditor(); });
        LF.infoEl = x.$('lofterSeriesInfo');
        lofterShowInfo();
    },

    tr: {
        modes: ['zh', 'off'],
        note: 'Mặc định dịch qua TM Translate để dùng name-set của bạn. Cần TM Translate bản hardened.2 trở lên đang bật trên Lofter (kể cả khi Lofter nằm trong blacklist tự dịch của nó).'
    },
    defaults: { trMode: 'zh', trEngineZh: 'tm', trJa: true, lofterOrder: 'newer', lofterSeries: 'on' },

    help: [
        '• Đọc phần thân bài (.ctc) của các theme Lofter cũ; theme đời mới thì tự dò khối nhiều chữ nhất. Dò sai thì "Nâng cao" → "Chọn vùng đọc" — lựa chọn được nhớ theo blog.',
        '• Tự dò bộ: lần đầu mở trên một blog, script nạp ngầm trang mục lục (/view) của blog, gom các bài cùng bộ theo tiêu đề rồi xếp theo số chương. Chương sau đi theo thứ tự đó, và dừng ở chương cuối của bộ thay vì trôi sang bài khác. Mục lục được nhớ theo blog; có chương mới thì tự dò lại.',
        '• Dò sai thì bấm "Chỉnh bộ…": đổi thứ tự (gõ số, hoặc ↑ ↓), bỏ bài không thuộc bộ, thêm bài bị sót, đổi tên bộ. Tên bài hiện bằng bản dịch của TM Translate. Bản chỉnh được nhớ theo blog và dùng chung với Trình tải truyện Lofter; chương mới tác giả đăng sau vẫn tự được nối vào cuối.',
        '• Bài không thuộc bộ nào: ưu tiên link 下一章 trong bài, rồi mới tới nút phân trang theo chiều bạn chọn.',
        '• Bài chỉ có ảnh: khi đang tự đọc nối chương thì được bỏ qua, đi tiếp chương sau.'
    ].join('\n')
};

/* =========================================================================
 * Dò bộ từ mục lục /view
 *
 * Phần tách tên bộ + số chương theo lofter-downloader.user.js (mục 4–5 của file đó), bỏ đi
 * những gì chỉ việc tải mới cần. Hai script là hai userscript riêng, không có chỗ dùng chung
 * code — sửa luật tách tên ở một nơi thì nhớ sửa nơi kia.
 * ====================================================================== */

var LOFTER_TOC_ITEM = '.m-filecnt ul.list > li[id], ul.list > li[id], .m-filecnt li[id]';
var LOFTER_NO_TITLE = '__anh__';
var LOFTER_SPACE = /[ 　]/g;

var LF = {
    state: 'idle',      // idle | scanning | ready | failed
    items: null,        // [{ u, t, d, k }] — url, tiêu đề, ngày (ms), loại bài
    at: 0,              // lúc dò xong
    group: null, idx: -1,
    found: false,       // bài đang mở có trong mục lục không
    rescanned: false,   // trang này đã tự dò lại chưa (mỗi trang một lần)
    progress: 0, msg: '', infoEl: null
};

function lofterClean(s) { return (s || '').replace(LOFTER_SPACE, ' ').replace(/[ \t]+/g, ' ').trim(); }
function lofterKey(href) {
    try { var u = new URL(href, location.href); return u.origin + u.pathname.replace(/\/+$/, ''); }
    catch (e) { return href; }
}

var LOFTER_CN_DIGIT = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
var LOFTER_CN_UNIT = { 十: 10, 百: 100, 千: 1000 };
function lofterCnNum(s) {
    if (!s) return NaN;
    if (/^\d+$/.test(s)) return +s;
    var total = 0, cur = 0, seen = false;
    for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        if (ch in LOFTER_CN_DIGIT) { cur = LOFTER_CN_DIGIT[ch]; seen = true; }
        else if (ch in LOFTER_CN_UNIT) { total += (cur || 1) * LOFTER_CN_UNIT[ch]; cur = 0; seen = true; }
        else return NaN;
    }
    return seen ? total + cur : NaN;
}

// Chữ/số full-width → half-width để bắt số chương kiểu "CH1９"
function lofterToHalf(s) {
    return (s || '').replace(/[０-９Ａ-Ｚａ-ｚ]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xfee0); });
}

// Cụm trong ngoặc là "tag" (CP/fandom/đánh dấu) chứ không phải tên bộ?
var LOFTER_DONE_WORDS = /^(?:完|完结|完結|end|fin|上|中|下|前|后|後|番外|正文|全文)$/i;
function lofterIsTaggish(inner) {
    var s = lofterToHalf(inner).replace(LOFTER_SPACE, '').trim();
    if (!s || s.length > 14) return false;
    if (LOFTER_DONE_WORDS.test(s)) return true;
    if (/^[A-Za-z]{1,10}$/.test(s)) return true;
    if (/^[A-Za-z0-9→+×＋\-_.\s]{1,14}$/.test(s)) return true;
    if (/\d/.test(s) && s.length <= 8) return true;
    return false;
}

function lofterStripTags(title) {
    var t = ' ' + lofterToHalf((title || '').replace(LOFTER_SPACE, ' ')) + ' ';
    for (var i = 0; i < 4; i++) {
        var n = t.replace(/^\s*[【\[［]{1}[^】\]］]{0,30}[】\]］]\s*/u, ' ');
        if (n === t) break;
        t = n;
    }
    t = t.replace(/[（(]\s*([^（()）]{0,20})\s*[）)]/g, function (m, inner) { return lofterIsTaggish(inner) ? ' ' : m; });
    return lofterClean(t);
}

var LOFTER_CH_PATTERNS = [
    { re: /(?:^|[^A-Za-z0-9])(?:CH|Chapter|Chap|Ch|EP)\s*[.．·:：]?\s*(\d{1,4}(?:\.\d+)?)/i, cn: false },
    { re: /第\s*([0-9零〇一二三四五六七八九十百千两兩]{1,8})\s*[章回話话節节篇部卷]/, cn: true },
    { re: /(?:^|[^0-9])(\d{1,3})\s*[.．]\s*$/, cn: false },
    // `weak`: số trần, không có "CH"/"第…章" đi kèm. Trong fandom, con số cuối tiêu đề rất hay
    // là mã CP (27, 1827…) chứ không phải số chương — lofterDropFake() phán quyết trên cả bộ.
    { re: /[-－—–]\s*(\d{1,3})(?:\s*[&＆+]\s*\d{1,3})?\s*(?:[（(][^）)]*[）)])?\s*$/, cn: false, weak: true },
    { re: /[（(]\s*(\d{1,3})\s*[）)]\s*$/, cn: false, weak: true },
    { re: /(?:^|[\s　])(\d{1,3})\s*[.．、]?\s*(?=[|｜/／,，]|$)/, cn: false, weak: true },
    { re: /(?:^|[^0-9])(\d{1,3})\s*$/, cn: false, weak: true }
];
var LOFTER_TRAIL_MARK = /(?:CH|Chapter|Chap|EP|Episode|Scene|Part|Vol|Season|第)$/i;
// "…-序", "…楔子" → coi như chương 0 để xếp lên đầu
var LOFTER_PROLOGUE = /[-－—–·:：\s]\s*(序章|序|楔子|前言|引子)\s*[.．、\-－—–]*\s*$/;

function lofterChapterNo(title) {
    var t = lofterStripTags(title);
    var pm = LOFTER_PROLOGUE.exec(t);
    if (pm) return { no: 0, at: pm.index + pm[0].indexOf(pm[1]) };
    for (var i = 0; i < LOFTER_CH_PATTERNS.length; i++) {
        var p = LOFTER_CH_PATTERNS[i];
        var m = p.re.exec(t);
        if (!m) continue;
        var v = p.cn ? lofterCnNum(m[1]) : parseFloat(m[1]);
        if (!isNaN(v)) return { no: v, at: m.index + Math.max(0, m[0].indexOf(m[1])), weak: !!p.weak };
    }
    return null;
}

function lofterSeriesName(title) {
    var raw = (title || '').replace(LOFTER_SPACE, ' ');
    if (!lofterClean(raw)) return '';
    var m = /[《〈]([^》〉]{1,60})[》〉]/.exec(raw);
    if (m) return lofterClean(m[1]);
    var t = lofterStripTags(raw);
    var hit = lofterChapterNo(raw);
    var base = hit && hit.at > 0 ? t.slice(0, hit.at) : t;
    var trim = function (s) { return lofterClean(s.replace(/[\s.．,，:：·、\-－—–_|｜]+$/u, '')); };
    base = trim(base);
    for (var i = 0; i < 3 && LOFTER_TRAIL_MARK.test(base); i++) base = trim(base.replace(LOFTER_TRAIL_MARK, ''));
    return base || lofterClean(t) || '(không rõ)';
}

// Phồn thể → giản thể (các chữ hay gặp) — chỉ dùng để so khớp tên bộ
var LOFTER_T2S = {
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
    雙: '双', 難: '难', 電: '电', 響: '响', 頁: '页', 顧: '顾', 類: '类'
};
function lofterNorm(s) {
    var t = lofterToHalf((s || '').replace(LOFTER_SPACE, ''))
        .replace(/[\s.．,，:：·、\-－—–_~!！?？'"“”‘’（）()［\]【】]/gu, '');
    return t.split('').map(function (c) { return LOFTER_T2S[c] || c; }).join('').toLowerCase();
}

function lofterLev(a, b) {
    var m = a.length, n = b.length;
    if (!m || !n) return Math.max(m, n);
    var prev = [], j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
        var cur = [i];
        for (j = 1; j <= n; j++) {
            cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
        prev = cur;
    }
    return prev[n];
}
function lofterSimilar(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;
    var maxLen = Math.max(a.length, b.length);
    if (Math.abs(a.length - b.length) > 1) return false;
    // Hai tên 3–4 chữ Hán lệch 1 chữ thường là HAI bộ khác nhau, không phải lỗi gõ.
    if (maxLen < 5) return false;
    return lofterLev(a, b) <= Math.max(1, Math.floor(maxLen * 0.25));
}

// Số chương "yếu" có thể là mã CP/fandom. Xét trên cả bộ: số chương thì KHÁC NHAU giữa các
// bài, mã CP thì LẶP LẠI (cả bộ cùng dán "27").
function lofterDropFake(items) {
    var weak = items.filter(function (i) { return i.chapNo !== null && i.chapWeak; });
    if (!weak.length || items.length < 3) return;
    var cnt = {}, kinds = 0, top = 0;
    weak.forEach(function (i) {
        if (!cnt[i.chapNo]) { cnt[i.chapNo] = 0; kinds++; }
        cnt[i.chapNo]++;
        if (cnt[i.chapNo] > top) top = cnt[i.chapNo];
    });
    var tagLike = top >= Math.max(2, Math.ceil(weak.length * 0.4)) || kinds < Math.max(2, Math.ceil(weak.length * 0.6));
    if (tagLike) weak.forEach(function (i) { i.chapNo = null; });
}

// Đủ 60% bài có số chương thì xếp theo số (bài không số xuống cuối, theo ngày); không thì theo ngày đăng.
function lofterSort(group) {
    var arr = group.items;
    var numbered = arr.filter(function (x) { return x.chapNo !== null; }).length;
    group.byNo = numbered >= Math.max(2, arr.length * 0.6);
    arr.sort(function (a, b) {
        if (group.byNo) {
            var an = a.chapNo === null ? Infinity : a.chapNo;
            var bn = b.chapNo === null ? Infinity : b.chapNo;
            if (an !== bn) return an - bn;
        }
        return (a.date - b.date) || (b.domIndex - a.domIndex);
    });
}

function lofterGroup(saved) {
    var map = {}, order = [];
    saved.forEach(function (s, i) {
        var hit = lofterChapterNo(s.t);
        var it = {
            key: lofterKey(s.u), url: s.u, title: s.t, date: s.d || 0, domIndex: i,
            chapNo: hit ? hit.no : null, chapWeak: !!(hit && hit.weak), series: lofterSeriesName(s.t)
        };
        // Bài ảnh không có tiêu đề → nhóm riêng, không bao giờ là một "bộ"
        var k = it.series ? (lofterNorm(it.series) || '__khac__') : LOFTER_NO_TITLE;
        if (!map[k]) { map[k] = { key: k, items: [] }; order.push(map[k]); }
        map[k].items.push(it);
    });

    // Gộp các bộ tên gần giống nhau (phồn/giản thể, sai chính tả, tag lệch)
    order.sort(function (a, b) { return b.items.length - a.items.length; });
    var kept = [];
    order.forEach(function (g) {
        var host = null;
        if (g.key !== LOFTER_NO_TITLE && g.items.length <= 2) {
            for (var i = 0; i < kept.length && !host; i++) {
                if (kept[i].key !== LOFTER_NO_TITLE && kept[i].items.length >= 3 && lofterSimilar(kept[i].key, g.key)) host = kept[i];
            }
        }
        if (host) host.items = host.items.concat(g.items);
        else kept.push(g);
    });

    kept.forEach(function (g) {
        // Tên hiển thị = tên xuất hiện nhiều nhất trong nhóm
        var cnt = {}, best = '';
        g.items.forEach(function (i) {
            cnt[i.series] = (cnt[i.series] || 0) + 1;
            if (!best || cnt[i.series] > cnt[best] || (cnt[i.series] === cnt[best] && i.series.length > best.length)) best = i.series;
        });
        g.name = best;
        lofterDropFake(g.items);
        lofterSort(g);
    });
    return kept;
}

// Tìm bài đang mở trong mục lục. true = có trong mục lục (thuộc bộ hay không thì xem LF.group).
function lofterResolve() {
    LF.group = null; LF.idx = -1; LF.found = false; LF.groups = [];
    if (!LF.items || !LF.items.length) return false;
    var here = lofterKey(location.href);
    var groups = LF.groups = lofterApplyManual(lofterGroup(LF.items), lofterManualLoad());
    for (var g = 0; g < groups.length; g++) {
        for (var i = 0; i < groups[g].items.length; i++) {
            if (groups[g].items[i].key !== here) continue;
            LF.found = true;
            if (groups[g].manual || (groups[g].key !== LOFTER_NO_TITLE && groups[g].items.length >= 2)) { LF.group = groups[g]; LF.idx = i; }
            return true;
        }
    }
    return false;
}

/* ---- Bản chỉnh tay --------------------------------------------------------
 * Nằm trong localStorage của chính blog (mỗi blog một subdomain → tự tách theo blog), không
 * nằm trong kho GM: Trình tải truyện Lofter là một userscript khác, kho GM riêng, nhưng chạy
 * trên cùng origin — để ở đây thì chỉnh một lần, cả hai script cùng theo.
 *   { v: 1, series: [{ id, name, order: [khoá bài…], excluded: [khoá bài…] }] }
 * `order` là thứ tự bạn xếp. `excluded` là những bài luật tự dò xếp vào bộ này nhưng bạn đã
 * bỏ ra. Bài nào luật tự dò xếp vào bộ mà không nằm ở cả hai danh sách (chương tác giả đăng
 * SAU lúc bạn chỉnh) thì được nối vào cuối. Cùng định dạng với lofter-downloader.user.js.
 * ------------------------------------------------------------------------ */
var LOFTER_MANUAL_KEY = 'aurel_lofter_series_v1';

function lofterManualLoad() {
    try {
        var o = JSON.parse(localStorage.getItem(LOFTER_MANUAL_KEY) || 'null');
        return (o && Array.isArray(o.series)) ? o.series.filter(function (m) { return m && Array.isArray(m.order); }) : [];
    } catch (e) { return []; }
}
function lofterManualSave(list) {
    try { localStorage.setItem(LOFTER_MANUAL_KEY, JSON.stringify({ v: 1, series: list })); return true; }
    catch (e) { return false; }
}

// Nhóm tự dò nào chứa nhiều bài của `keys` nhất — bộ chỉnh tay "mọc ra" từ nhóm đó.
function lofterBaseGroup(groups, keys) {
    var base = null, best = 0;
    groups.forEach(function (g) {
        if (g.manual || g.key === LOFTER_NO_TITLE) return;
        var n = g.items.filter(function (i) { return keys.indexOf(i.key) >= 0; }).length;
        if (n > best) { best = n; base = g; }
    });
    return base;
}

function lofterApplyManual(groups, manual) {
    manual.forEach(function (m) {
        var byKey = {};
        groups.forEach(function (g) { g.items.forEach(function (i) { byKey[i.key] = i; }); });
        var items = m.order.map(function (k) { return byKey[k]; }).filter(Boolean);
        if (!items.length) return;
        var taken = {};
        items.forEach(function (i) { taken[i.key] = 1; });
        var excluded = m.excluded || [];
        var base = lofterBaseGroup(groups, m.order);
        if (base) base.items.forEach(function (i) {
            if (!taken[i.key] && excluded.indexOf(i.key) < 0) { items.push(i); taken[i.key] = 1; }
        });
        groups.forEach(function (g) { g.items = g.items.filter(function (i) { return !taken[i.key]; }); });
        groups = groups.filter(function (g) { return g.items.length; });
        groups.unshift({ key: 'manual:' + m.id, name: m.name || (base && base.name) || '(bộ chỉnh tay)', items: items, manual: true, manualId: m.id });
    });
    return groups;
}

function lofterListDate(txt, ctx) {
    // "8月30日" | "2025年2月10日" | "8.30.2026"; thiếu năm thì lấy từ <ul id="2026_7_list">
    var m;
    if (txt) {
        m = /(\d{4})\s*[年.\/-]\s*(\d{1,2})\s*[月.\/-]\s*(\d{1,2})/.exec(txt);
        if (m) return new Date(+m[1], +m[2] - 1, +m[3]).getTime();
        m = /(\d{1,2})\s*[月.\/-]\s*(\d{1,2})\s*(?:日)?[.\/-]?\s*(\d{4})/.exec(txt);
        if (m) return new Date(+m[3], +m[1] - 1, +m[2]).getTime();
        m = /(\d{1,2})\s*月\s*(\d{1,2})\s*日/.exec(txt);
        if (m) return new Date(ctx ? ctx.year : new Date().getFullYear(), +m[1] - 1, +m[2]).getTime();
    }
    return ctx ? new Date(ctx.year, ctx.month - 1, 1).getTime() : 0;
}

function lofterScanDoc(doc, base) {
    var seen = {}, out = [];
    Array.prototype.forEach.call(doc.querySelectorAll(LOFTER_TOC_ITEM), function (li) {
        var a = li.querySelector('a[href*="/post/"]');
        if (!a) return;
        var url;
        try { url = new URL(a.getAttribute('href'), base).href; } catch (e) { return; }
        var key = lofterKey(url);
        if (seen[key]) return;
        seen[key] = 1;
        var ul = li.closest('ul[id]');
        var ym = ul && /^(\d{4})_(\d{1,2})_list$/.exec(ul.id || '');   // tháng trong id đếm từ 0
        var tEl = li.querySelector('h3, h2.ttl, .ttl, h2');
        var dEl = li.querySelector('.info em, .date');
        out.push({
            u: url,
            t: lofterClean(tEl && tEl.textContent),
            d: lofterListDate(dEl && dEl.textContent, ym ? { year: +ym[1], month: +ym[2] + 1 } : null),
            k: (li.className || '').trim().split(/\s+/)[0] || ''
        });
    });
    return out;
}

// Nạp /view trong một iframe ẩn và cuộn nó xuống đáy cho tới khi hết bài mới: chính JS của
// Lofter tự tải từng tháng, script không phải biết API mục lục. Iframe nằm TRONG khung nhìn
// (opacity 0) chứ không đẩy ra ngoài màn hình — bộ tải lười dùng IntersectionObserver sẽ
// không chạy với iframe nằm ngoài khung nhìn.
function lofterScanToc(onProgress) {
    var QUIET_MS = 6000, MAX_MS = 150000, EMPTY_MS = 20000;
    return new Promise(function (resolve, reject) {
        var fr = document.createElement('iframe');
        fr.className = 'ttsr-ui';
        fr.setAttribute('aria-hidden', 'true');
        fr.tabIndex = -1;
        fr.style.cssText = 'position:fixed;left:0;top:0;width:1100px;height:900px;border:0;opacity:0;pointer-events:none;z-index:-1;';
        var t0 = Date.now(), lastChange = Date.now(), count = 0, done = false;

        var finish = function (err, items) {
            if (done) return;
            done = true;
            clearInterval(timer);
            try { fr.remove(); } catch (e) {}
            if (err) reject(err); else resolve(items);
        };

        var timer = setInterval(function () {
            var d, w;
            // Bị đá sang trang đăng nhập ở www.lofter.com thì đọc contentDocument sẽ ném lỗi cross-origin.
            try { d = fr.contentDocument; w = fr.contentWindow; if (d) void d.body; }
            catch (e) { finish(new Error('trang mục lục bị chuyển sang trang khác (cần đăng nhập, hoặc Lofter đang chặn)')); return; }
            if (!d || !d.body || !w) return;
            try {
                if (!/^\/view\/?$/.test(w.location.pathname) && w.location.href !== 'about:blank') {
                    finish(new Error('blog này không có trang mục lục /view')); return;
                }
            } catch (e) { finish(new Error('trang mục lục bị chuyển sang trang khác (cần đăng nhập, hoặc Lofter đang chặn)')); return; }

            var n = d.querySelectorAll(LOFTER_TOC_ITEM).length;
            if (n !== count) { count = n; lastChange = Date.now(); if (onProgress) onProgress(n); }
            // Sự kiện scroll thật chỉ phát ra khi trình duyệt vẽ lại — tab đang ở nền thì không vẽ,
            // nên phát thêm một sự kiện scroll bằng tay cho bộ tải của Lofter.
            try {
                w.scrollTo(0, Math.max(d.body.scrollHeight, d.documentElement.scrollHeight));
                w.dispatchEvent(new Event('scroll'));
                d.dispatchEvent(new Event('scroll'));
            } catch (e) {}

            var now = Date.now();
            if (count > 0 && (now - lastChange > QUIET_MS || now - t0 > MAX_MS)) {
                finish(null, lofterScanDoc(d, w.location.href));
            } else if (count === 0 && now - t0 > EMPTY_MS) {
                finish(new Error('không thấy bài nào trong trang mục lục'));
            }
        }, 700);

        fr.src = location.origin + '/view';
        (document.body || document.documentElement).appendChild(fr);
    });
}

function lofterStartScan() {
    if (LF.state === 'scanning') return;
    LF.state = 'scanning'; LF.rescanned = true; LF.progress = 0; LF.msg = '';
    lofterShowInfo();
    lofterScanToc(function (n) { LF.progress = n; lofterShowInfo(); }).then(function (items) {
        LF.items = items; LF.at = Date.now();
        var all = store.get('lofterToc', {}) || {};
        all[HOST] = { at: LF.at, items: items };
        // Giữ mục lục của 6 blog dùng gần nhất
        Object.keys(all).sort(function (a, b) { return (all[b].at || 0) - (all[a].at || 0); })
            .slice(6).forEach(function (h) { delete all[h]; });
        store.set('lofterToc', all);
        lofterResolve();
        LF.state = 'ready';
    }).catch(function (e) {
        LF.msg = e && e.message ? e.message : String(e);
        // Dò hỏng nhưng còn mục lục cũ dùng được thì vẫn dùng
        LF.state = (LF.items && lofterResolve()) ? 'ready' : 'failed';
    }).then(function () {
        lofterShowInfo();
        refreshNext();
    });
}

// Gọi từ SITE.next(). null = không có ý kiến (đang dò, tắt, hoặc bài không thuộc bộ nào).
function lofterSeriesNext() {
    if (cfg.lofterSeries === 'off') return null;
    if (LF.state === 'idle') {
        var saved = (store.get('lofterToc', {}) || {})[HOST];
        if (saved && saved.items && saved.items.length) { LF.items = saved.items; LF.at = saved.at || 0; }
        // Chưa có mục lục, hoặc bài này mới hơn mục lục đã nhớ → dò ngầm; trong lúc chờ dùng cách cũ.
        if (lofterResolve()) { LF.state = 'ready'; lofterShowInfo(); }
        else lofterStartScan();
    }
    if (LF.state !== 'ready' || !LF.group) return null;

    var g = LF.group, n = g.items.length;
    if (LF.idx < n - 1) {
        return { url: g.items[LF.idx + 1].url, el: null, how: 'bộ «' + g.name + '» · chương ' + (LF.idx + 2) + '/' + n };
    }
    // Đang ở chương cuối mà mục lục đã cũ → dò lại một lần xem tác giả có đăng chương mới không.
    if (!LF.rescanned && Date.now() - LF.at > 30 * 60 * 1000) lofterStartScan();
    return { none: 'đã ở chương cuối của bộ «' + g.name + '» (' + n + ' chương)' };
}

function lofterShowInfo() {
    if (!LF.infoEl) return;
    var txt;
    if (cfg.lofterSeries === 'off') txt = 'Đang tắt.';
    else if (LF.state === 'scanning') txt = 'Đang dò mục lục của blog… ' + (LF.progress ? LF.progress + ' bài' : '');
    else if (LF.state === 'failed') txt = 'Không dò được mục lục: ' + LF.msg + '. Đang dùng link trong bài / nút phân trang.';
    else if (LF.state === 'ready' && LF.group) {
        txt = 'Bộ «' + LF.group.name + '»: chương ' + (LF.idx + 1) + '/' + LF.group.items.length +
            (LF.group.manual ? ', thứ tự do bạn chỉnh tay'
                : LF.group.byNo ? ', xếp theo số chương trong tiêu đề' : ', xếp theo ngày đăng (tiêu đề không có số chương)') +
            '. Mục lục: ' + LF.items.length + ' bài.' + (LF.msg ? ' Lần dò lại gần nhất lỗi: ' + LF.msg + '.' : '');
    }
    else if (LF.state === 'ready') {
        txt = (LF.found ? 'Bài này không thuộc bộ nào' : 'Không thấy bài này') + ' trong ' + LF.items.length +
            ' bài của mục lục — đang dùng link trong bài / nút phân trang.';
    }
    else txt = 'Mở bảng trên một bài là script tự dò.';
    LF.infoEl.textContent = txt;
}

/* ---- Bảng "Chỉnh bộ" ------------------------------------------------------ */

var LFE = { modal: null, list: [], pool: [], name: '', manualId: '', vi: {}, note: '', filter: '' };
var LOFTER_VI_KEY = 'ttsr_lofter_vi';   // tên đã dịch, nhớ trong phiên để sang chương khác khỏi dịch lại

function lofterMk(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
        if (k === 'class') n.className = props[k];
        else if (k === 'text') n.textContent = props[k];
        else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), props[k]);
        else n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
}

// Dịch tên qua TM Translate (cùng name-set đang dùng để dịch truyện). Không có TM Translate
// thì bảng vẫn dùng được, chỉ là hiện tên gốc.
function lofterTranslateTitles(titles) {
    var need = [], seen = {};
    titles.forEach(function (t) {
        t = (t || '').replace(/\s*\n\s*/g, ' ').trim();
        if (t && !LFE.vi[t] && !seen[t]) { seen[t] = 1; need.push(t); }
    });
    if (!need.length) return Promise.resolve();
    return tmPing(1200).then(function (ver) {
        if (!ver) { LFE.note = 'Không thấy TM Translate đang bật ở trang này — hiện tên gốc.'; return; }
        return tmCall(need.join('\n')).then(function (text) {
            var out = String(text || '').split('\n');
            if (out.length !== need.length) throw new Error('lệch số dòng (' + need.length + ' → ' + out.length + ')');
            need.forEach(function (t, i) { LFE.vi[t] = out[i].trim() || t; });
            try { sessionStorage.setItem(LOFTER_VI_KEY, JSON.stringify(LFE.vi)); } catch (e) {}
        });
    }).catch(function (e) {
        LFE.note = 'Dịch tên lỗi (' + (e && e.message ? e.message : e) + ') — hiện tên gốc.';
    });
}

function lofterEditorRender() {
    var m = LFE.modal;
    if (!m) return;
    var vi = function (t) { return LFE.vi[(t || '').trim()] || ''; };
    var titleCell = function (it) {
        var shown = vi(it.title) || it.title || '(không tiêu đề)';
        var a = lofterMk('a', { href: it.url, target: '_blank', rel: 'noopener', text: shown, title: 'Mở bài này ở tab mới' });
        return lofterMk('div', { class: 't' }, [a, vi(it.title) ? lofterMk('small', { text: it.title }) : null]);
    };

    m.note.textContent = LFE.note;
    m.nameVi.textContent = vi(m.name.value) ? 'Dịch: ' + vi(m.name.value) : '';
    m.count.textContent = LFE.list.length + ' chương';

    var here = lofterKey(location.href);
    m.list.textContent = '';
    LFE.list.forEach(function (it, i) {
        var pos = lofterMk('input', { type: 'number', min: '1', max: String(LFE.list.length), value: String(i + 1), title: 'Gõ số thứ tự mới rồi Enter' });
        pos.addEventListener('change', function () {
            var to = Math.min(LFE.list.length, Math.max(1, parseInt(pos.value, 10) || (i + 1))) - 1;
            LFE.list.splice(to, 0, LFE.list.splice(i, 1)[0]);
            lofterEditorRender();
        });
        var move = function (d) {
            return function () {
                var to = i + d;
                if (to < 0 || to >= LFE.list.length) return;
                LFE.list.splice(to, 0, LFE.list.splice(i, 1)[0]);
                lofterEditorRender();
            };
        };
        m.list.appendChild(lofterMk('div', { class: 'lfe-row' + (it.key === here ? ' cur' : '') }, [
            pos, titleCell(it),
            lofterMk('button', { class: 'b', text: '↑', title: 'Lên một bậc', onclick: move(-1) }),
            lofterMk('button', { class: 'b', text: '↓', title: 'Xuống một bậc', onclick: move(1) }),
            lofterMk('button', { class: 'b dan', text: '✕', title: 'Bỏ khỏi bộ (bài vẫn còn trên blog)', onclick: function () {
                LFE.list.splice(i, 1); LFE.pool.unshift(it); lofterEditorRender();
            } })
        ]));
    });
    if (!LFE.list.length) m.list.appendChild(lofterMk('div', { class: 'help', text: 'Bộ đang trống — thêm bài từ danh sách bên dưới.' }));

    var q = LFE.filter.toLowerCase();
    var hits = LFE.pool.filter(function (it) {
        return !q || (it.title || '').toLowerCase().indexOf(q) >= 0 || vi(it.title).toLowerCase().indexOf(q) >= 0;
    });
    m.pool.textContent = '';
    hits.slice(0, 60).forEach(function (it) {
        m.pool.appendChild(lofterMk('div', { class: 'lfe-row add' }, [
            titleCell(it),
            lofterMk('button', { class: 'b sec', text: '+ Thêm', onclick: function () {
                LFE.pool.splice(LFE.pool.indexOf(it), 1); LFE.list.push(it); lofterEditorRender();
            } })
        ]));
    });
    m.poolNote.textContent = hits.length > 60 ? 'Đang hiện 60/' + hits.length + ' bài — gõ thêm chữ để lọc.'
        : (hits.length ? '' : 'Không có bài nào khớp.');
}

function lofterEditorClose() { if (LFE.modal) LFE.modal.root.classList.add('hidden'); }

function lofterEditorBuild() {
    var m = LFE.modal = {};
    var css = '.lfe-list,.lfe-pool{display:grid;gap:4px;overflow:auto;align-content:start;}.lfe-list{max-height:38vh;}.lfe-pool{max-height:22vh;}' +
        '.lfe-row{display:grid;grid-template-columns:56px 1fr auto auto auto;gap:6px;align-items:center;padding:2px;border-radius:8px;}' +
        '.lfe-row.add{grid-template-columns:1fr auto;}.lfe-row.cur{outline:2px solid var(--c-second);}' +
        '.lfe-row .t{min-width:0;font-size:12px;line-height:1.35;}.lfe-row .t a{color:inherit;text-decoration:none;}' +
        '.lfe-row .t a:hover{text-decoration:underline;}' +
        '.lfe-row .t small{display:block;color:var(--c-muted);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
        '.lfe-row button.b{padding:5px 9px;}';
    m.name = lofterMk('input', { type: 'text', placeholder: 'Tên bộ' });
    m.name.addEventListener('input', function () { m.nameVi.textContent = ''; });
    m.nameVi = lofterMk('div', { class: 'help' });
    m.note = lofterMk('div', { class: 'help' });
    m.count = lofterMk('span', { class: 'help' });
    m.list = lofterMk('div', { class: 'lfe-list' });
    m.filter = lofterMk('input', { type: 'text', placeholder: 'Lọc theo tên (gốc hoặc đã dịch)…' });
    m.filter.addEventListener('input', function () { LFE.filter = m.filter.value.trim(); lofterEditorRender(); });
    m.pool = lofterMk('div', { class: 'lfe-pool' });
    m.poolNote = lofterMk('div', { class: 'help' });

    m.root = lofterMk('div', { class: 'modal hidden', role: 'dialog', 'aria-modal': 'true' }, [
        lofterMk('style', { text: css }),
        lofterMk('div', { class: 'ov', onclick: lofterEditorClose }),
        lofterMk('div', { class: 'dlg' }, [
            lofterMk('div', { class: 'dh' }, [
                lofterMk('span', { text: 'Chỉnh bộ' }),
                lofterMk('div', { class: 'ha' }, [lofterMk('button', { text: '✕', title: 'Đóng', onclick: lofterEditorClose })])
            ]),
            lofterMk('div', { class: 'db' }, [
                lofterMk('div', { class: 'grid' }, [lofterMk('label', { text: 'Tên bộ' }), m.name, m.nameVi]),
                lofterMk('div', { class: 'grid' }, [
                    lofterMk('label', { text: 'Thứ tự chương — gõ số để chuyển chỗ, ↑ ↓ để nhích, ✕ để bỏ khỏi bộ' }),
                    m.list, m.count
                ]),
                lofterMk('div', { class: 'grid' }, [
                    lofterMk('label', { text: 'Thêm bài khác của blog vào bộ' }), m.filter, m.pool, m.poolNote
                ]),
                m.note,
                lofterMk('div', { class: 'acts' }, [
                    lofterMk('button', { class: 'b pri', text: 'Lưu', onclick: lofterEditorSave }),
                    lofterMk('button', { class: 'b dan', text: 'Về tự động', title: 'Xoá bản chỉnh tay của bộ này, quay về kết quả tự dò', onclick: lofterEditorReset }),
                    lofterMk('button', { class: 'b', text: 'Hủy', onclick: lofterEditorClose })
                ])
            ])
        ])
    ]);
    S.root.appendChild(m.root);
}

function lofterOpenEditor() {
    if (!LF.items || !LF.items.length) { status('Chưa có mục lục của blog — bấm "Dò lại mục lục" rồi thử lại.'); return; }
    if (LF.state === 'scanning') { status('Đang dò mục lục — đợi dò xong rồi chỉnh.'); return; }
    if (!LFE.modal) lofterEditorBuild();
    try { LFE.vi = JSON.parse(sessionStorage.getItem(LOFTER_VI_KEY) || '{}') || {}; } catch (e) { LFE.vi = {}; }

    var here = lofterKey(location.href);
    var all = [], current = null;
    LF.groups.forEach(function (g) { g.items.forEach(function (i) { all.push(i); if (i.key === here) current = i; }); });
    LFE.list = LF.group ? LF.group.items.slice() : (current ? [current] : []);
    LFE.manualId = (LF.group && LF.group.manualId) || '';
    var inList = {};
    LFE.list.forEach(function (i) { inList[i.key] = 1; });
    // Bài chưa thuộc bộ, theo thứ tự mục lục (mới nhất trước)
    LFE.pool = all.filter(function (i) { return !inList[i.key]; }).sort(function (a, b) { return a.domIndex - b.domIndex; });
    LFE.filter = ''; LFE.note = '';
    LFE.modal.filter.value = '';
    LFE.modal.name.value = LF.group ? LF.group.name : (current ? current.series : '');
    LFE.modal.root.classList.remove('hidden');
    lofterEditorRender();

    // Dịch tên các chương của bộ trước (cần ngay), phần còn lại của blog dịch sau.
    lofterTranslateTitles([LFE.modal.name.value].concat(LFE.list.map(function (i) { return i.title; })))
        .then(function () { lofterEditorRender(); return lofterTranslateTitles(LFE.pool.map(function (i) { return i.title; })); })
        .then(lofterEditorRender);
}

function lofterEditorSave() {
    var order = LFE.list.map(function (i) { return i.key; });
    if (!order.length) { LFE.note = 'Bộ đang trống. Muốn bỏ bản chỉnh tay thì bấm "Về tự động".'; lofterEditorRender(); return; }
    var name = LFE.modal.name.value.trim() || '(bộ chỉnh tay)';
    var base = lofterBaseGroup(lofterGroup(LF.items), order);
    var excluded = base ? base.items.map(function (i) { return i.key; }).filter(function (k) { return order.indexOf(k) < 0; }) : [];

    // Một bài chỉ nằm trong một bộ chỉnh tay
    var all = lofterManualLoad().filter(function (m) { return m.id !== LFE.manualId; });
    all.forEach(function (m) { m.order = m.order.filter(function (k) { return order.indexOf(k) < 0; }); });
    all = all.filter(function (m) { return m.order.length; });
    all.push({ id: LFE.manualId || ('m' + Date.now().toString(36)), name: name, order: order, excluded: excluded });
    if (!lofterManualSave(all)) { LFE.note = 'Không ghi được vào bộ nhớ của trang (localStorage đầy hoặc bị chặn).'; lofterEditorRender(); return; }

    lofterEditorClose();
    lofterResolve(); lofterShowInfo(); refreshNext();
    status('Đã lưu bộ «' + name + '» · ' + order.length + ' chương');
}

function lofterEditorReset() {
    if (LFE.manualId) {
        lofterManualSave(lofterManualLoad().filter(function (m) { return m.id !== LFE.manualId; }));
        lofterResolve(); lofterShowInfo(); refreshNext();
        status('Đã bỏ bản chỉnh tay — dùng lại kết quả tự dò');
    }
    lofterEditorClose();
}

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
// File nay duoc BUILD tu 02_Readers/ (core.js + sites/lofter.js). Sua o do roi chay: .\build_pilot.ps1

;(function () {
    'use strict';

    //
    // Trung → Việt mặc định đi qua TM Translate (cầu nối 'tm-bridge', không gọi mạng từ
    // script này). Quyền mạng duy nhất là translate.googleapis.com, chỉ dùng khi bạn đổi
    // máy dịch sang Google.
    var SITE = {
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

        /* =====================================================================
         * TTS Reader — LÕI CHUNG (build ghép với một file trong sites/)
         *
         * File này KHÔNG chạy một mình. build.js bọc nó cùng biến SITE của từng
         * trang thành một userscript riêng. Sửa lỗi lõi ở đây rồi build lại —
         * đừng sửa thẳng file .user.js đã build, lần build sau sẽ ghi đè.
         *
         * Nguồn gốc:
         *  - Giao diện: theo bố cục TTS Reader 1.5.4 (QuocBao).
         *  - Lõi đọc (tô màu, cắt đoạn, phát, cuộn, chọn vị trí): từ TTS Reader
         *    Universal 2.2.0 của Aurel — đã sửa các lỗi Chrome/Android ở đó.
         *  - Chỉ dùng giọng hệ thống (Edge/Chrome Web Speech). Không TikTok,
         *    Google, Bing, Zalo TTS; không cookie.
         * =================================================================== */

        var VERSION = '{{VERSION}}';

        if (window.top !== window.self) return;

        var IS_TOUCH = false;
        try {
            IS_TOUCH = !!((window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
                          ('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        } catch (e) {}

        if (!('speechSynthesis' in window)) {
            try {
                var warnEl = document.createElement('div');
                warnEl.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:84px;z-index:2147483647;' +
                    'max-width:calc(100vw - 32px);background:#3a2230;color:#ffe4ec;border-radius:10px;padding:10px 14px;' +
                    'font:13px/1.45 system-ui,sans-serif';
                warnEl.textContent = 'TTS Reader: trình duyệt này không có speechSynthesis — không đọc được.';
                (document.body || document.documentElement).appendChild(warnEl);
                setTimeout(function () { if (warnEl.parentNode) warnEl.parentNode.removeChild(warnEl); }, 12000);
            } catch (e2) {}
            return;
        }

        /* =====================================================================
         * 1. Lưu trữ + cấu hình
         *    Mỗi file site là một script riêng trong Tampermonkey → kho GM riêng
         *    → cài đặt của AO3 không đè lên cài đặt của Lofter.
         * =================================================================== */

        var HAS_GM = typeof GM_getValue === 'function' && typeof GM_setValue === 'function';
        var LS_PREFIX = 'ttsr_' + SITE.id + '_';

        var store = {
            get: function (k, d) {
                try {
                    if (HAS_GM) { var v = GM_getValue(k); return v === undefined ? d : v; }
                    var raw = localStorage.getItem(LS_PREFIX + k);
                    return raw === null ? d : JSON.parse(raw);
                } catch (e) { return d; }
            },
            set: function (k, v) {
                try {
                    if (HAS_GM) { GM_setValue(k, v); return; }
                    localStorage.setItem(LS_PREFIX + k, JSON.stringify(v));
                } catch (e) {}
            }
        };

        var DEFAULTS = Object.assign({
            voiceURI: '',            // '' = tự chọn theo ngôn ngữ đang đọc
            rate: 1, pitch: 1, volume: 1,
            maxChars: 220,
            segmentDelayMs: 120,
            includeTitle: true,
            autoNext: true,
            autoScroll: true,
            autoStartNext: true,
            highlightWords: true,
            autoHide: true,          // đang đọc mà 30 giây không đụng bảng → thu về mini-player
            sleepMinutes: 30,
            replaceEnabled: false,
            rules: [],               // [{ from, to, re }]
            trMode: 'off',           // 'off' | 'auto' | 'en' | 'zh'
            trJa: false,             // khi dịch Trung: tách câu tiếng Nhật xen giữa (có kana) ra dịch Nhật → Việt
            trEngineEn: 'auto',      // 'auto' | 'chrome' | 'google'
            trEngineZh: 'tm',        // 'tm' | 'google'
            trShowOrig: false,
            panelCollapsed: false,
            pos: null,
            miniPos: null,           // (cũ, trước 3.3.0) vị trí mini-player theo left/top — không dùng nữa
            dockPos: null            // { right, bottom } của thanh nút chung sau khi kéo
        }, SITE.defaults || {});

        var cfg = Object.assign({}, DEFAULTS, store.get('cfg', {}));
        var HOST = location.hostname;
        var sites = store.get('sites', {}) || {};   // rule người dùng tự chọn (vùng đọc / chương sau), theo host

        function saveCfg() { store.set('cfg', cfg); }
        function saveSites() { store.set('sites', sites); }

        var AUTO_KEY = 'ttsr_autostart_' + SITE.id;
        var SKIP_KEY = 'ttsr_skipped_' + SITE.id;   // số chương không có chữ vừa bỏ qua liên tiếp
        var SKIP_MAX = 12;

        // Lớp selector: rule người dùng tự chọn luôn thử trước selector của file site.
        function layers() {
            var out = [];
            if (sites[HOST]) out.push({ src: 'rule tự chọn', r: sites[HOST] });
            out.push({ src: SITE.name, r: SITE });
            return out;
        }

        function firstMatch(key, getter) {
            var ls = layers();
            for (var i = 0; i < ls.length; i++) {
                var sel = ls[i].r[key];
                if (!sel || typeof sel !== 'string') continue;
                var v = getter(sel);
                if (v) return { v: v, src: ls[i].src, sel: sel };
            }
            return null;
        }

        /* =====================================================================
         * 2. Trạng thái
         * =================================================================== */

        var S = {
            booted: false,
            host: null, root: null, ui: {},
            mini: null, miniUi: {},
            panelHidden: true,
            containers: [], blocks: [], segs: [],
            idx: 0,
            reading: false, paused: false, preparing: false, prepTok: 0,
            needRestart: false, blocked: false,
            token: 0, utter: null,
            nextUrl: '', nextEl: null,
            title: '', titleEl: null,
            src: { content: '', next: '' },
            warn: [],
            pick: null, pickEl: null, pickBar: null, pickHidPanel: false,
            sleepAt: 0,
            lastEvt: 0, retry: 0, errStreak: 0,
            voices: [],
            sawBoundary: false, warnedBoundary: false,
            lastUiAt: 0,
            prepared: false,
            prepWarn: [],            // cảnh báo từ bước chuẩn bị của site — sống qua các lần quét lại
            lang: ''                 // ngôn ngữ của chữ sẽ đọc: 'vi' | 'en' | 'zh' | ''
        };

        function bottomInset() {
            try {
                var vv = window.visualViewport;
                if (!vv) return 0;
                var gap = window.innerHeight - vv.height - vv.offsetTop;
                return gap > 0 ? Math.min(140, Math.round(gap)) : 0;
            } catch (e) { return 0; }
        }
        function syncInsets() {
            var px = bottomInset() + 'px';
            try { var d = document.getElementById('aurel-dock'); if (d && S.mini) d.style.marginBottom = px; } catch (e) {}
            try { if (S.host) S.host.style.setProperty('--ttsr-bot', px); } catch (e) {}
        }
        try {
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', syncInsets);
                window.visualViewport.addEventListener('scroll', syncInsets);
            }
            window.addEventListener('orientationchange', function () { setTimeout(syncInsets, 250); });
        } catch (e) {}

        /* =====================================================================
         * 3. Tiện ích
         * =================================================================== */

        var SKIP_TAG = /^(SCRIPT|STYLE|NOSCRIPT|IFRAME|SVG|MATH|CANVAS|VIDEO|AUDIO|BUTTON|SELECT|TEXTAREA|INPUT|NAV|FOOTER|HEADER|FORM|OPTION|RT|RP|TEMPLATE)$/i;
        // ttsr-orig = đoạn gốc đã có bản dịch → không đọc nữa, kể cả khi đang hiện bản gốc.
        // ttsr-hide = khung gốc site đã thay bằng bản của script (vd. Wattpad tải đủ chương) → luôn ẩn.
        var HIDDEN_CLS = /(^|\s)(landmark|sr-only|screen-reader-text|visually-hidden|visuallyhidden|ttsr-ui|ttsr-orig|ttsr-hide)(\s|$)/;
        var BAD_HINT = /(^|[\s_-])(nav|menu|header|footer|sidebar|side-bar|comment|advert|ads?|banner|share|social|related|breadcrumb|pagination|paging|widget|toolbar|modal|popup)([\s_-]|$)/i;
        var GOOD_HINT = /(article|content|chapter|chuong|post|entry|read|reading|text|story|truyen|noi-dung)/i;
        var CHROME_SEL = 'header,nav,footer,aside,#header,#footer,.header,.footer,.navbar,[role="banner"],[role="navigation"],[role="contentinfo"]';

        function clean(s) {
            return String(s == null ? '' : s).replace(/ /g, ' ').replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
        }
        function clamp(v, lo, hi, d) { v = Number(v); return isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d; }
        function cls(el) { return (el && typeof el.className === 'string') ? el.className : ''; }
        function esc(s) { return (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/[^\w-]/g, '\\$&'); }
        function escHtml(s) {
            return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        function inUI(el) { try { return !!(el && el.closest && el.closest('.ttsr-ui')); } catch (e) { return false; } }
        function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

        function q(sel) {
            if (!sel) return null;
            var parts = String(sel).split('||');
            for (var i = 0; i < parts.length; i++) {
                try { var el = document.querySelector(parts[i].trim()); if (el) return el; } catch (e) {}
            }
            return null;
        }
        function qa(sel) {
            if (!sel) return [];
            var parts = String(sel).split('||');
            for (var i = 0; i < parts.length; i++) {
                try {
                    var list = Array.prototype.slice.call(document.querySelectorAll(parts[i].trim()));
                    if (list.length) return list;
                } catch (e) {}
            }
            return [];
        }

        function isVisible(el) {
            try {
                if (el.checkVisibility) {
                    if (el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, opacityProperty: true, visibilityProperty: true })) return true;
                    return getComputedStyle(el).display === 'contents';
                }
                var cs = getComputedStyle(el);
                if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
            } catch (e) {}
            return true;
        }
        function skipEl(el) { return SKIP_TAG.test(el.tagName) || HIDDEN_CLS.test(cls(el)) || !isVisible(el); }

        function report(msg, err) {
            try { console.error('[TTS Reader] ' + msg, err || ''); } catch (e) {}
            status(msg + (err && err.message ? ': ' + err.message : ''));
        }

        function fmtClock(ms) {
            var s = Math.max(0, Math.ceil(ms / 1000));
            var m = Math.floor(s / 60); s = s % 60;
            return m + ':' + (s < 10 ? '0' : '') + s;
        }

        /* =====================================================================
         * 4. Tô màu (CSS Custom Highlight API, fallback: class) + style trang
         * =================================================================== */

        var HL_SEG = 'ttsr-seg', HL_WORD = 'ttsr-word';
        var canHL = typeof CSS !== 'undefined' && CSS.highlights && typeof window.Highlight === 'function';
        var fallbackEl = null;

        function pageCss() {
            return [
                '::highlight(ttsr-seg){background-color:rgba(38,198,218,.22);}',
                '::highlight(ttsr-word){background-color:rgba(255,138,101,.55);color:#101010;}',
                '.ttsr-fallback{background-color:rgba(38,198,218,.20)!important;border-radius:4px;}',
                '.ttsr-pick-hover{outline:2px dashed #26c6da!important;outline-offset:2px!important;cursor:crosshair!important;}',
                '.ttsr-flash{outline:2px solid rgba(38,198,218,.9)!important;outline-offset:4px!important;}',
                '.ttsr-flash-next{outline:2px dashed #ff8a65!important;outline-offset:3px!important;}',
                cfg.trShowOrig
                    ? '.ttsr-orig{opacity:.5!important;}'
                    : '.ttsr-orig{display:none!important;}',
                '.ttsr-vi{white-space:pre-wrap;}',
                '.ttsr-hide{display:none!important;}'
            ].join('\n');
        }
        function injectPageStyle() {
            var st = document.getElementById('ttsr-page-style');
            if (!st) {
                st = document.createElement('style');
                st.id = 'ttsr-page-style';
                (document.head || document.documentElement).appendChild(st);
            }
            st.textContent = pageCss();
        }

        function clearHL() {
            if (canHL) { try { CSS.highlights.delete(HL_SEG); CSS.highlights.delete(HL_WORD); } catch (e) {} }
            if (fallbackEl) { try { fallbackEl.classList.remove('ttsr-fallback'); } catch (e) {} fallbackEl = null; }
        }

        function rangeFor(blk, a, b) {
            if (!blk || !blk.map || !blk.map.length) return null;
            a = Math.max(0, Math.min(a, blk.map.length - 1));
            b = Math.max(a + 1, Math.min(b, blk.map.length));
            var s = blk.map[a], e = blk.map[b - 1];
            if (!s || !e) return null;
            try {
                var r = document.createRange();
                r.setStart(s.node, s.off);
                r.setEnd(e.node, e.off + 1);
                return r;
            } catch (err) { return null; }
        }

        function highlightSeg(blk, a, b) {
            clearHL();
            var r = canHL ? rangeFor(blk, a, b) : null;
            if (r) { try { CSS.highlights.set(HL_SEG, new Highlight(r)); return; } catch (e) {} }
            if (blk && blk.el && blk.el.classList) { blk.el.classList.add('ttsr-fallback'); fallbackEl = blk.el; }
        }

        function wordRange(blk, base, ev) {
            if (!blk || !blk.map) return null;
            var ci = typeof ev.charIndex === 'number' ? ev.charIndex : -1;
            if (ci < 0) return null;
            var len = (typeof ev.charLength === 'number' && ev.charLength > 0) ? ev.charLength : 0;
            if (!len) { var m = /^\S+/.exec(blk.text.slice(base + ci)); len = m ? m[0].length : 1; }
            return rangeFor(blk, base + ci, base + ci + len);
        }

        function flashApplied() {
            var els = S.containers.filter(function (c) { return c && c !== document.body && c !== document.documentElement; });
            if (S.nextEl && S.nextEl.classList) els.push(S.nextEl);
            els.forEach(function (el) { el.classList.add(el === S.nextEl ? 'ttsr-flash-next' : 'ttsr-flash'); });
            setTimeout(function () {
                els.forEach(function (el) { el.classList.remove('ttsr-flash'); el.classList.remove('ttsr-flash-next'); });
            }, 1800);
        }

        /* =====================================================================
         * 5. Cuộn theo chữ đang đọc (theo câu/từ, không theo cả khối)
         * =================================================================== */

        var userScrollAt = 0, autoScrollAt = 0;
        var spCache = new WeakMap();
        function markUserScroll() { userScrollAt = Date.now(); }
        window.addEventListener('wheel', markUserScroll, { passive: true, capture: true });
        window.addEventListener('touchmove', markUserScroll, { passive: true, capture: true });
        window.addEventListener('keydown', function (e) {
            if (e.altKey || e.ctrlKey || e.metaKey) return;
            if (/^(PageUp|PageDown|ArrowUp|ArrowDown|Home|End| )$/.test(e.key)) markUserScroll();
        }, true);

        function scrollParentOf(el) {
            if (!el || el.nodeType !== 1) return null;
            if (spCache.has(el)) return spCache.get(el) || null;
            var found = null;
            for (var p = el; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
                try {
                    var oy = getComputedStyle(p).overflowY;
                    if (/(auto|scroll|overlay)/.test(oy) && p.scrollHeight > p.clientHeight + 4) { found = p; break; }
                } catch (e) {}
            }
            spCache.set(el, found || false);
            return found;
        }

        function followRect(rect, anchor, force, loose) {
            if (!cfg.autoScroll || !rect || (!rect.width && !rect.height)) return;
            var now = Date.now();
            if (!force && now - userScrollAt < 4000) return;
            if (!force && now - autoScrollAt < 700) return;
            var sp = scrollParentOf(anchor);
            var vh = window.innerHeight || document.documentElement.clientHeight;
            var top0 = 0, h = vh;
            if (sp) { var pr = sp.getBoundingClientRect(); top0 = Math.max(pr.top, 0); h = Math.min(pr.bottom, vh) - top0; }
            if (h <= 0) return;
            var rt = rect.top - top0, rb = rect.bottom - top0;
            var lo = loose ? 0.08 : 0.15, hi = loose ? 0.88 : 0.8;
            if (rt >= h * lo && rb <= h * hi) return;
            if (!loose && rt >= h * lo && rt < h * hi && rect.height > h * (hi - lo)) return;
            var dy = rt - h * (rect.height > h * 0.5 ? 0.12 : 0.3);
            autoScrollAt = now;
            var target = sp || window;
            try { target.scrollBy({ top: dy, behavior: 'smooth' }); } catch (e) { try { target.scrollBy(0, dy); } catch (e2) {} }
        }

        function scrollToSeg(blk, a, b, force) {
            if (!cfg.autoScroll || !blk) return;
            var r = blk.map ? rangeFor(blk, a, b) : null;
            var rect = null;
            try { rect = r ? r.getBoundingClientRect() : null; } catch (e) {}
            if ((!rect || (!rect.width && !rect.height)) && blk.el && blk.el.getBoundingClientRect) rect = blk.el.getBoundingClientRect();
            followRect(rect, blk.el, force, false);
        }

        /* =====================================================================
         * 6. Trích nội dung
         *    Mỗi khối ghi lại `kind`: 'el' = nguyên một thẻ, 'run' = chuỗi text
         *    node nằm thẳng trong khung. Bước dịch cần biết để chèn bản dịch
         *    đúng chỗ mà không phá phần còn lại của khung.
         * =================================================================== */

        function newAcc() { return { text: '', map: [], prevSpace: true }; }

        function accText(acc, n) {
            var d = n.data;
            for (var i = 0; i < d.length; i++) {
                var ch = d[i];
                if (ch === ' ') ch = ' ';
                if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
                    if (acc.prevSpace) continue;
                    acc.text += ' '; acc.map.push({ node: n, off: i }); acc.prevSpace = true;
                } else {
                    acc.text += ch; acc.map.push({ node: n, off: i }); acc.prevSpace = false;
                }
            }
        }
        function accBr(acc) {
            if (!acc.prevSpace && acc.text) { acc.text += ' '; acc.map.push(acc.map[acc.map.length - 1]); acc.prevSpace = true; }
        }
        function accTree(acc, el) {
            var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
                acceptNode: function (n) {
                    if (n.nodeType === 1) {
                        if (skipEl(n)) return NodeFilter.FILTER_REJECT;
                        return n.tagName === 'BR' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            });
            var n;
            while ((n = w.nextNode())) { if (n.nodeType === 1) accBr(acc); else accText(acc, n); }
            return acc;
        }
        function finishAcc(acc, el) {
            var text = acc.text, map = acc.map;
            while (text.length && text.charCodeAt(text.length - 1) === 32) { text = text.slice(0, -1); map.pop(); }
            return { el: el, text: text, map: map };
        }
        function buildBlock(el) { var b = finishAcc(accTree(newAcc(), el), el); b.kind = 'el'; return b; }
        function buildRun(nodes, parent) {
            var acc = newAcc();
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                if (n.nodeType === 3) accText(acc, n);
                else if (n.tagName === 'BR') accBr(acc);
                else accTree(acc, n);
            }
            var b = finishAcc(acc, parent);
            b.kind = 'run'; b.nodes = nodes.slice();
            return b;
        }

        function isBlockish(el) {
            try { return /^(block|flex|grid|list-item|table|flow-root|table-row|table-cell|table-row-group|table-caption)$/.test(getComputedStyle(el).display); }
            catch (e) { return true; }
        }
        function hasBlockChild(el) {
            for (var j = 0; j < el.children.length; j++) {
                var c = el.children[j];
                if (SKIP_TAG.test(c.tagName)) continue;
                if (!c.textContent || !c.textContent.trim()) continue;
                if (isBlockish(c)) return true;
            }
            return false;
        }

        function collectBlocks(root) {
            var out = [];
            function keep(b) {
                if (!b.text || b.text.replace(/\s/g, '').length < 2) return;
                // Dòng điều hướng tác giả chèn trong bài ("下一章", "Next chapter →"…) — không đọc.
                if (SITE.skipText && SITE.skipText.test(b.text.trim())) return;
                out.push(b);
            }
            (function walk(node, depth) {
                var run = [], brPrev = false;
                function flush() { if (run.length) { keep(buildRun(run, node)); run = []; } brPrev = false; }
                for (var c = node.firstChild; c; c = c.nextSibling) {
                    if (c.nodeType === 3) { run.push(c); if (c.data.trim()) brPrev = false; continue; }
                    if (c.nodeType !== 1) continue;
                    if (skipEl(c)) continue;
                    if (c.tagName === 'BR') {
                        if (brPrev) flush(); else { run.push(c); brPrev = true; }
                        continue;
                    }
                    if (isBlockish(c)) {
                        flush();
                        if (depth < 14 && hasBlockChild(c)) walk(c, depth + 1);
                        else keep(buildBlock(c));
                    } else { run.push(c); brPrev = false; }
                }
                flush();
            })(root, 0);
            return out;
        }

        function scoreEl(el) {
            var txt = el.textContent || '';
            var len = txt.replace(/\s+/g, ' ').trim().length;
            if (len < 180) return -1;
            var linkLen = 0, as = el.querySelectorAll('a');
            for (var i = 0; i < as.length; i++) linkLen += (as[i].textContent || '').length;
            var density = linkLen / len;
            if (density > 0.4) return -1;
            var s = len * (1 - density);
            var hint = (el.id || '') + ' ' + cls(el);
            if (BAD_HINT.test(hint)) s *= 0.15;
            if (GOOD_HINT.test(hint)) s *= 1.5;
            s += el.querySelectorAll('p').length * 40;
            return s;
        }
        function autoDetect() {
            var cands = document.body ? document.body.querySelectorAll('article,main,section,div,td,[role="main"]') : [];
            var best = null, bestScore = 0, n = Math.min(cands.length, 4000);
            for (var i = 0; i < n; i++) {
                var el = cands[i];
                if (inUI(el) || !isVisible(el)) continue;
                var sc = scoreEl(el);
                if (sc > bestScore) { bestScore = sc; best = el; }
                else if (best && sc > 0 && sc >= bestScore * 0.92 && best.contains(el)) { bestScore = sc; best = el; }
            }
            return best || document.body;
        }
        function topLevel(list) {
            return list.filter(function (el) {
                for (var i = 0; i < list.length; i++) if (list[i] !== el && list[i].contains(el)) return false;
                return true;
            });
        }

        function findContainers() {
            var m = firstMatch('contentSel', function (sel) {
                var list = qa(sel).filter(function (el) { return !inUI(el) && isVisible(el); });
                return list.length ? topLevel(list) : null;
            });
            if (m) { S.src.content = m.src + ': ' + m.sel; return m.v; }
            var el = autoDetect();
            S.src.content = el === document.body ? 'tự dò (không thấy khối nội dung — đọc cả trang)' : 'tự dò';
            return [el];
        }

        function findTitle(containers) {
            if (typeof SITE.title === 'function') {
                try { var t0 = SITE.title(); if (t0 && t0.text) return t0; } catch (e) {}
            }
            var m = firstMatch('titleSel', function (sel) { var t = q(sel); return (t && clean(t.textContent)) ? t : null; });
            if (m) return { el: m.v, text: clean(m.v.textContent) };
            var c0 = containers[0];
            var hs = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,.chapter-title,.entry-title,.post-title'))
                .filter(function (h) {
                    var t = clean(h.textContent);
                    if (!t || t.length > 200 || inUI(h) || !isVisible(h)) return false;
                    var ch = h.closest ? h.closest(CHROME_SEL) : null;
                    return !(ch && !ch.closest('article,main,[role="main"]'));
                });
            var i, pick = null;
            for (i = 0; i < hs.length && !pick; i++) if (c0 && c0.contains(hs[i])) pick = hs[i];
            if (!pick && c0) {
                for (i = hs.length - 1; i >= 0; i--) {
                    if (/^H[12]$/.test(hs[i].tagName) || /title/i.test(cls(hs[i]))) {
                        if (hs[i].compareDocumentPosition(c0) & Node.DOCUMENT_POSITION_FOLLOWING) { pick = hs[i]; break; }
                    }
                }
            }
            if (!pick && hs.length) pick = hs[0];
            if (pick) return { el: pick, text: clean(pick.textContent) };
            return { el: null, text: clean(document.title) };
        }

        var NEXT_RE = /(ch(ương|uong)|chapter)\s*(sau|k(ế|e)|ti(ế|e)p)|ti(ế|e)p\s*theo|next\s*(chapter|page|part)?|下一章|»|>>|→/i;
        var PREV_RE = /(tr(ư|u)(ớ|o)c|prev|previous|上一章|«|<<|←)/i;
        function samePage(href) { return href.split('#')[0] === location.href.split('#')[0]; }

        function findNext() {
            // Rule tự chọn thắng mọi thứ; sau đó tới cách riêng của site; cuối cùng mới tự dò.
            var u = sites[HOST];
            if (u && u.nextSel) {
                var ue = q(u.nextSel);
                if (ue && ue.href) return { url: ue.href, el: ue, src: 'rule tự chọn: ' + u.nextSel };
            }
            if (typeof SITE.next === 'function') {
                try {
                    var r = SITE.next();
                    if (r && r.url) return { url: r.url, el: r.el || null, src: SITE.name + (r.how ? ': ' + r.how : '') };
                    if (r && r.none) return { url: '', el: null, src: SITE.name + ': ' + r.none };
                } catch (e) {}
            }
            if (SITE.nextSel) {
                var se = q(SITE.nextSel);
                if (se && se.href) return { url: se.href, el: se, src: SITE.name + ': ' + SITE.nextSel };
            }
            var rel = document.querySelector('link[rel="next"], a[rel="next"]');
            if (rel && rel.href) return { url: rel.href, el: rel.tagName === 'A' ? rel : null, src: 'rel=next' };
            var as = document.querySelectorAll('a[href]');
            for (var i = 0; i < as.length; i++) {
                var a = as[i];
                if (!a.href || samePage(a.href) || inUI(a)) continue;
                if (/^javascript:/i.test(a.getAttribute('href') || '')) continue;
                var hay = [a.textContent, a.title, a.getAttribute('aria-label'), a.id, cls(a)].join(' ');
                if (PREV_RE.test(hay)) continue;
                if (NEXT_RE.test(hay)) return { url: a.href, el: a, src: 'tự dò' };
            }
            return { url: '', el: null, src: '' };
        }

        function findCover() {
            try {
                if (typeof SITE.cover === 'function') { var c = SITE.cover(); if (c) return c; }
                var og = document.querySelector('meta[property="og:image"], meta[name="og:image"]');
                return og ? og.getAttribute('content') || '' : '';
            } catch (e) { return ''; }
        }

        /* =====================================================================
         * 7. Cắt đoạn — ưu tiên hết câu, rồi dấu ngắt, rồi khoảng trắng
         * =================================================================== */

        function splitRanges(text, maxChars) {
            var out = [], n = text.length, i = 0;
            var HARD = '.!?…\n。！？', SOFT = ',;:—–)"”，；：';
            while (i < n) {
                while (i < n && /\s/.test(text[i])) i++;
                if (i >= n) break;
                var end = Math.min(n, i + maxChars);
                if (end < n) {
                    var floor = i + Math.floor(maxChars * 0.4), cut = -1, j;
                    for (j = end; j > floor; j--) { if (HARD.indexOf(text[j - 1]) >= 0) { cut = j; break; } }
                    if (cut < 0) for (j = end; j > floor; j--) { if (SOFT.indexOf(text[j - 1]) >= 0) { cut = j; break; } }
                    if (cut < 0) { cut = text.lastIndexOf(' ', end); if (cut <= i) cut = end; }
                    end = cut;
                }
                var e = end;
                while (e > i && /\s/.test(text[e - 1])) e--;
                if (e > i) out.push([i, e]);
                i = end;
            }
            return out;
        }

        function buildSegments() {
            S.segs = [];
            for (var bi = 0; bi < S.blocks.length; bi++) {
                var t = S.blocks[bi].text;
                if (!t) continue;
                var rs = splitRanges(t, clamp(cfg.maxChars, 60, 600, 220));
                for (var k = 0; k < rs.length; k++) S.segs.push({ bi: bi, a: rs[k][0], b: rs[k][1] });
            }
        }

        /* =====================================================================
         * 7b. Vị trí trong DOM → số thứ tự đoạn
         * =================================================================== */

        function segFor(bi, k) {
            for (var s = 0; s < S.segs.length; s++) {
                var g = S.segs[s];
                if (g.bi === bi && g.b > k) return s;
                if (g.bi > bi) return s;
            }
            return S.segs.length - 1;
        }
        function firstSegOfBlock(bi) {
            for (var s = 0; s < S.segs.length; s++) if (S.segs[s].bi >= bi) return s;
            return S.segs.length - 1;
        }

        function segIndexAt(pos, strict) {
            if (!pos || !pos.node) return -1;
            var r;
            try { r = document.createRange(); r.setStart(pos.node, pos.offset || 0); r.collapse(true); } catch (e) { return -1; }
            function cmp(node, off) { try { return r.comparePoint(node, off); } catch (e) { return NaN; } }
            var bi, m;
            for (bi = 0; bi < S.blocks.length; bi++) {
                m = S.blocks[bi].map;
                if (!m || !m.length) continue;
                var last = m[m.length - 1];
                if (cmp(m[0].node, m[0].off) <= 0 && cmp(last.node, last.off + 1) >= 0) {
                    var lo = 0, hi = m.length;
                    while (lo < hi) { var mid = (lo + hi) >> 1; if (cmp(m[mid].node, m[mid].off) < 0) lo = mid + 1; else hi = mid; }
                    var k = Math.min(lo, m.length - 1), text = S.blocks[bi].text;
                    while (k > 0 && text[k - 1] !== ' ') k--;
                    return segFor(bi, k);
                }
            }
            if (strict) return -1;
            for (bi = 0; bi < S.blocks.length; bi++) {
                m = S.blocks[bi].map;
                if (m && m.length && cmp(m[0].node, m[0].off) > 0) return segFor(bi, 0);
            }
            return -1;
        }

        function caretAt(x, y) {
            try {
                if (document.caretPositionFromPoint) {
                    var p = document.caretPositionFromPoint(x, y);
                    if (p && p.offsetNode) return { node: p.offsetNode, offset: p.offset };
                }
                if (document.caretRangeFromPoint) {
                    var r = document.caretRangeFromPoint(x, y);
                    if (r) return { node: r.startContainer, offset: r.startOffset };
                }
            } catch (e) {}
            return null;
        }

        function selectionStart() {
            try {
                var sel = window.getSelection();
                if (!sel || sel.isCollapsed || !sel.rangeCount) return -1;
                var r = sel.getRangeAt(0);
                var node = r.startContainer;
                var el = node.nodeType === 1 ? node : node.parentElement;
                if (inUI(el)) return -1;
                var i = segIndexAt({ node: node, offset: r.startOffset }, true);
                if (i >= 0) sel.removeAllRanges();
                return i;
            } catch (e) { return -1; }
        }

        /* =====================================================================
         * 8. Thay thế khi đọc
         * =================================================================== */

        function normRules(list) {
            return (Array.isArray(list) ? list : []).map(function (r) {
                return { from: String((r && r.from) || ''), to: String((r && r.to) || '').trim(), re: !!(r && r.re) };
            }).filter(function (r) { return r.from; });
        }

        // Nhận "từ => thay", "re:biểu thức => thay", hoặc JSON [{from,to,re}].
        function parseBulk(text) {
            text = String(text || '').trim();
            if (!text) return [];
            if (/^\[/.test(text)) {
                try { return normRules(JSON.parse(text)); } catch (e) { throw new Error('JSON không hợp lệ'); }
            }
            var out = [];
            text.split('\n').forEach(function (line) {
                line = line.trim();
                if (!line || line[0] === '#') return;
                var i = line.indexOf('=>');
                if (i < 0) return;
                var from = line.slice(0, i).trim(), to = line.slice(i + 2).trim();
                if (!from) return;
                if (/^re:/i.test(from)) out.push({ from: from.slice(3).trim(), to: to, re: true });
                else out.push({ from: from, to: to, re: false });
            });
            return out;
        }
        function rulesToText(list) {
            return normRules(list).map(function (r) { return (r.re ? 're:' : '') + r.from + ' => ' + r.to; }).join('\n');
        }

        function applyRules(t) {
            if (!cfg.replaceEnabled) return t;
            var list = cfg.rules || [], out = t;
            for (var i = 0; i < list.length; i++) {
                var r = list[i];
                if (!r || !r.from) continue;
                try {
                    if (r.re) out = out.replace(new RegExp(r.from, 'gi'), r.to || '');
                    else out = out.split(r.from).join(r.to || '');
                } catch (e) {}
            }
            return out;
        }

        /* =====================================================================
         * 9. Giọng đọc — voiceURI rỗng = tự chọn theo ngôn ngữ của chữ đang đọc
         * =================================================================== */

        function loadVoices() {
            try { S.voices = speechSynthesis.getVoices() || []; } catch (e) { S.voices = []; }
            return S.voices;
        }

        var LANG_RE = { vi: /^vi(-|_|$)/i, en: /^en(-|_|$)/i, zh: /^(zh|cmn)(-|_|$)/i };
        var LANG_PREF = { vi: /nam\s*minh|hoai\s*my/i, en: /aria|jenny|guy|natural|online/i, zh: /xiaoxiao|yunxi|natural|online/i };

        function pickVoice() {
            var vs = S.voices.length ? S.voices : loadVoices();
            if (!vs.length) return null;
            var i;
            if (cfg.voiceURI) for (i = 0; i < vs.length; i++) if (vs[i].voiceURI === cfg.voiceURI) return vs[i];
            var lang = S.lang || SITE.lang || 'vi';
            var re = LANG_RE[lang];
            if (re) {
                var same = vs.filter(function (v) { return re.test(v.lang); });
                if (same.length) {
                    var pref = LANG_PREF[lang];
                    for (i = 0; i < same.length; i++) if (pref && pref.test(same[i].name)) return same[i];
                    return same[0];
                }
            }
            for (i = 0; i < vs.length; i++) if (vs[i].default) return vs[i];
            return vs[0];
        }

        /* =====================================================================
         * 10. Dịch trước khi đọc
         *
         *  Không thay chữ gốc: chèn một thẻ .ttsr-vi chứa bản dịch ngay sau đoạn
         *  gốc, và gắn .ttsr-orig cho đoạn gốc (ẩn đi, hoặc làm mờ nếu bật "hiện
         *  bản gốc"). Quét lại thì đoạn gốc bị bỏ qua, chỉ còn bản dịch — nên tô
         *  màu, chọn vị trí, cuộn theo chữ vẫn chạy trên đúng chữ đang đọc.
         *
         *  Máy dịch:
         *   - 'tm'     : Trung → Việt qua cầu nối của TM Translate (name-set của
         *                bạn). Cần TM Translate bản hardened.2+ đang bật trên trang.
         *   - 'chrome' : Translator API có sẵn trong Chrome/Edge — dịch trên máy.
         *   - 'google' : translate.googleapis.com (client=gtx). Cần mạng.
         * =================================================================== */

        var TR = { busy: null, cache: new Map(), chrome: {}, lastLang: '' };

        var VI_MARKS = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/gi;

        function detectLang(text) {
            var s = String(text || '').slice(0, 4000);
            var han = (s.match(/[㐀-鿿]/g) || []).length;
            var lat = (s.match(/[A-Za-z]/g) || []).length;
            var vi = (s.match(VI_MARKS) || []).length;
            if (han >= 20 && han > lat * 0.2) return 'zh';
            if (vi >= 15 && vi > lat * 0.03) return 'vi';
            if (lat >= 60) return 'en';
            return '';
        }

        function sampleText() {
            return S.blocks.slice(0, 40).map(function (b) { return b.text; }).join(' ');
        }

        // Ngôn ngữ nguồn cần dịch, hoặc '' nếu không cần.
        function wantLang() {
            if (!SITE.tr || cfg.trMode === 'off') return '';
            var d = detectLang(sampleText());
            if (cfg.trMode === 'auto') return (d === 'en' || d === 'zh') ? d : '';
            if (d === 'vi') return '';     // trang vốn đã là tiếng Việt
            return cfg.trMode;
        }

        function engineFor(lang) {
            if (lang === 'zh') return cfg.trEngineZh === 'google' ? 'google' : 'tm';
            return cfg.trEngineEn;
        }
        var ENGINE_NAME = { tm: 'TM Translate', chrome: 'Chrome (trên máy)', google: 'Google' };

        // ---- TM Translate bridge (CustomEvent, chuỗi JSON qua ranh giới sandbox) ----
        var tmSeq = 0;
        function tmPing(ms) {
            return new Promise(function (resolve) {
                var on = function (ev) {
                    var v = null;
                    try { v = JSON.parse(ev.detail).version; } catch (e) {}
                    fin(v || '?');
                };
                var t = setTimeout(function () { fin(null); }, ms || 1500);
                var fin = function (v) { clearTimeout(t); document.removeEventListener('tm-bridge:pong', on); resolve(v); };
                document.addEventListener('tm-bridge:pong', on);
                document.dispatchEvent(new CustomEvent('tm-bridge:ping'));
            });
        }
        function tmCall(text) {
            return new Promise(function (resolve, reject) {
                var id = 'ttsr-' + Date.now() + '-' + (++tmSeq);
                var onRes = function (ev) {
                    var r;
                    try { r = JSON.parse(ev.detail); } catch (e) { return; }
                    if (!r || r.id !== id) return;
                    done();
                    if (r.ok) resolve(r.text || ''); else reject(new Error(r.error || 'TM Translate báo lỗi'));
                };
                var timer = setTimeout(function () { done(); reject(new Error('TM Translate không trả lời')); }, 180000);
                var done = function () { clearTimeout(timer); document.removeEventListener('tm-bridge:result', onRes); };
                document.addEventListener('tm-bridge:result', onRes);
                document.dispatchEvent(new CustomEvent('tm-bridge:translate', { detail: JSON.stringify({ id: id, text: text, bulk: true }) }));
            });
        }

        // ---- Google (gtx) ----
        function gmReq(opts) {
            return new Promise(function (resolve, reject) {
                if (typeof GM_xmlhttpRequest !== 'function') { reject(new Error('script này không có quyền gọi mạng')); return; }
                GM_xmlhttpRequest(Object.assign({
                    timeout: 30000,
                    onload: function (r) { (r.status >= 200 && r.status < 300) ? resolve(r.responseText) : reject(new Error('HTTP ' + r.status)); },
                    onerror: function () { reject(new Error('lỗi mạng')); },
                    ontimeout: function () { reject(new Error('quá thời gian')); }
                }, opts));
            });
        }
        function googleOne(text, lang) {
            var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=' +
                (lang === 'zh' ? 'zh-CN' : lang) + '&tl=vi';
            return gmReq({
                method: 'POST', url: url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                data: 'q=' + encodeURIComponent(text)
            }).then(function (body) {
                var j = JSON.parse(body);
                if (!j || !Array.isArray(j[0])) throw new Error('Google trả dữ liệu lạ');
                return j[0].map(function (p) { return (p && p[0]) || ''; }).join('');
            });
        }

        // ---- Chrome Translator API ----
        function chromeApi() {
            try { if (typeof Translator !== 'undefined') return Translator; } catch (e) {}
            try { if (typeof unsafeWindow !== 'undefined' && unsafeWindow.Translator) return unsafeWindow.Translator; } catch (e) {}
            return null;
        }
        function chromeAvailable(lang) {
            var T = chromeApi();
            if (!T || typeof T.availability !== 'function') return Promise.resolve(false);
            return T.availability({ sourceLanguage: lang, targetLanguage: 'vi' })
                .then(function (a) { return a && a !== 'unavailable'; })
                .catch(function () { return false; });
        }
        function chromeTranslator(lang) {
            if (TR.chrome[lang]) return TR.chrome[lang];
            var T = chromeApi();
            if (!T) return Promise.reject(new Error('trình duyệt không có Translator API'));
            TR.chrome[lang] = T.create({
                sourceLanguage: lang, targetLanguage: 'vi',
                monitor: function (m) {
                    try {
                        m.addEventListener('downloadprogress', function (e) {
                            status('Đang tải gói dịch ' + lang + '→vi của Chrome… ' + Math.round((e.loaded || 0) * 100) + '%');
                        });
                    } catch (e) {}
                }
            }).catch(function (e) { TR.chrome[lang] = null; throw e; });
            return TR.chrome[lang];
        }

        // Gom dòng thành lô không quá maxChars ký tự.
        function batches(lines, maxChars) {
            var out = [], cur = [], n = 0;
            lines.forEach(function (l, i) {
                if (cur.length && n + l.length > maxChars) { out.push(cur); cur = []; n = 0; }
                cur.push(i); n += l.length + 1;
            });
            if (cur.length) out.push(cur);
            return out;
        }

        // ---- Trung xen Nhật ----
        // Truyện Trung có lời thoại tiếng Nhật: “沢田くん……”这几天你一直… Tách mỗi đoạn thành mảnh tại
        // ngoặc kép (“…” 「…」 『…』) và cuối câu (。！？…). Mảnh có kana là tiếng Nhật (kanji đứng một mình
        // không phân biệt được Trung/Nhật, nên chỉ kana mới quyết định), còn lại là tiếng Trung. Mảnh liền
        // nhau cùng loại được gộp lại để máy dịch có đủ ngữ cảnh.
        var KANA = /[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff\uff66-\uff9f]/;
        var JA_PIECE = /“[^”]*”?|「[^」]*」?|『[^』]*』?|[^“「『。！？!?…]+[。！？!?…]*|[。！？!?…]+/g;
        function splitZhJa(line) {
            var out = [];
            (String(line).match(JA_PIECE) || [line]).forEach(function (p) {
                var ja = KANA.test(p), last = out[out.length - 1];
                if (last && last.ja === ja) last.t += p; else out.push({ t: p, ja: ja });
            });
            return out;
        }
        function hasKana(lines) { return lines.some(function (l) { return KANA.test(l); }); }
        // TM Translate chỉ dịch Trung, nên tiếng Nhật đi Chrome (có gói ja trên máy) hoặc Google.
        async function jaEngine() { return (await chromeAvailable('ja')) ? 'chrome' : 'google'; }

        // Dịch đoạn Trung có xen Nhật: mảnh Trung qua máy dịch Trung, mảnh Nhật qua máy dịch Nhật, rồi ghép lại
        // đúng thứ tự. Đoạn không có kana đi nguyên đường cũ.
        async function translateMixed(lines, zhEngine, onProg) {
            var plan = lines.map(splitZhJa), zh = [], ja = [];
            plan.forEach(function (parts) {
                parts.forEach(function (p) {
                    if (!p.t.trim() || !/[\u3400-\u9fff\u3040-\u30ff]/.test(p.t)) return;   // chỉ dấu câu / chữ Latin: giữ nguyên
                    (p.ja ? ja : zh).push(p);
                });
            });
            var total = zh.length + ja.length, done = 0;
            var prog = function (base) { return function (d) { onProg && onProg(base + d, total); }; };
            if (zh.length) {
                var zo = await translateLines(zh.map(function (p) { return p.t; }), 'zh', zhEngine, prog(0));
                zh.forEach(function (p, i) { p.vi = zo[i]; });
                done = zh.length;
            }
            if (ja.length) {
                var je = await jaEngine();
                status('Đang dịch phần tiếng Nhật bằng ' + ENGINE_NAME[je] + '…');
                var jo = await translateLines(ja.map(function (p) { return p.t; }), 'ja', je, prog(done));
                ja.forEach(function (p, i) { p.vi = jo[i]; });
            }
            TR.jaCount = ja.length;
            return plan.map(function (parts) {
                return parts.map(function (p) { return p.vi != null ? p.vi : p.t; }).join(' ').replace(/\s+([,.!?;:…”」』])/g, '$1').replace(/\s{2,}/g, ' ').trim();
            });
        }

        // Dịch một mảng dòng → mảng cùng độ dài. onProg(xong, tổng).
        async function translateLines(lines, lang, engine, onProg) {
            var out = new Array(lines.length);
            var todo = [];
            lines.forEach(function (l, i) {
                var key = lang + '|' + l;
                if (TR.cache.has(key)) out[i] = TR.cache.get(key); else todo.push(i);
            });
            var done = lines.length - todo.length;
            var put = function (i, t) {
                t = String(t || '').trim() || lines[i];
                out[i] = t; TR.cache.set(lang + '|' + lines[i], t);
            };
            var sub = todo.map(function (i) { return lines[i].replace(/\s*\n\s*/g, ' '); });

            if (engine === 'chrome') {
                var tr = await chromeTranslator(lang);
                for (var k = 0; k < todo.length; k++) {
                    if (!S.preparing && !TR.manual) throw new Error('đã dừng');
                    put(todo[k], await tr.translate(sub[k]));
                    onProg && onProg(++done, lines.length);
                }
                return out;
            }

            var groups = batches(sub, engine === 'tm' ? 3000 : 3500);
            for (var g = 0; g < groups.length; g++) {
                if (!S.preparing && !TR.manual) throw new Error('đã dừng');
                var idx = groups[g];
                var text = idx.map(function (j) { return sub[j]; }).join('\n');
                var res = engine === 'tm' ? await tmCall(text) : await googleOne(text, lang);
                var parts = res.split('\n');
                if (parts.length === idx.length) {
                    idx.forEach(function (j, p) { put(todo[j], parts[p]); });
                } else if (engine === 'google') {
                    // Google đôi khi gộp/tách dòng → lô lệch. Dịch lại từng dòng của lô đó.
                    for (var p2 = 0; p2 < idx.length; p2++) {
                        put(todo[idx[p2]], await googleOne(sub[idx[p2]], lang));
                        await sleep(120);
                    }
                } else {
                    throw new Error('TM Translate trả lệch số dòng (' + idx.length + ' → ' + parts.length + ')');
                }
                done += idx.length;
                onProg && onProg(done, lines.length);
                if (engine === 'google') await sleep(250);
            }
            return out;
        }

        function applyTranslation(b, text, lang) {
            if (!b.el || !text) return;
            var tag = (b.kind === 'el' && /^(P|H[1-6]|LI|BLOCKQUOTE|DD|DT)$/.test(b.el.tagName)) ? b.el.tagName.toLowerCase() : 'div';
            var vi = document.createElement(tag);
            vi.className = 'ttsr-vi';
            vi.setAttribute('data-ttsr-lang', lang);
            vi.textContent = text;
            if (b.kind === 'run') {
                var nodes = (b.nodes || []).filter(function (n) { return n.parentNode; });
                if (!nodes.length) return;
                var wrap = document.createElement('span');
                wrap.className = 'ttsr-orig';
                wrap.setAttribute('data-ttsr-wrap', '1');
                nodes[0].parentNode.insertBefore(wrap, nodes[0]);
                nodes.forEach(function (n) { wrap.appendChild(n); });
                wrap.parentNode.insertBefore(vi, wrap.nextSibling);
            } else {
                b.el.classList.add('ttsr-orig');
                b.el.parentNode.insertBefore(vi, b.el.nextSibling);
            }
        }

        function isTranslated() { return !!document.querySelector('.ttsr-vi'); }

        function undoTranslation() {
            TR.lastLang = '';
            Array.prototype.slice.call(document.querySelectorAll('.ttsr-vi')).forEach(function (n) { n.remove(); });
            Array.prototype.slice.call(document.querySelectorAll('.ttsr-orig')).forEach(function (n) {
                if (n.hasAttribute('data-ttsr-wrap')) {
                    while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
                    n.remove();
                } else n.classList.remove('ttsr-orig');
            });
        }

        // Dịch các khối hiện có (chỉ khối chưa dịch). Trả Promise<bool đã dịch>.
        function translatePage(manual) {
            if (TR.busy) return TR.busy;
            var lang = wantLang();
            if (!lang) return Promise.resolve(false);
            var engine = engineFor(lang);
            // Khối 'text' = tiêu đề không có thẻ trên trang: chỉ dịch vào cache, rescan lấy ra đọc.
            var todo = S.blocks.filter(function (b) { return b.text && (b.el ? b.el.isConnected : b.kind === 'text'); });
            if (!todo.length) return Promise.resolve(false);
            TR.manual = !!manual;
            TR.busy = (async function () {
                if (engine === 'auto') engine = (await chromeAvailable(lang)) ? 'chrome' : 'google';
                if (engine === 'tm' && !(await tmPing())) {
                    throw new Error('Không thấy TM Translate (cần bản hardened.2+ có cầu nối, đang bật trên trang này)');
                }
                status('Đang dịch ' + lang + '→vi bằng ' + ENGINE_NAME[engine] + '…');
                var lines = todo.map(function (b) { return b.text; });
                var onP = function (d, t) {
                    status('Đang dịch ' + lang + '→vi (' + ENGINE_NAME[engine] + ') ' + d + '/' + t + ' đoạn…');
                    renderMini();
                };
                TR.jaCount = 0;
                var out = (lang === 'zh' && cfg.trJa && hasKana(lines))
                    ? await translateMixed(lines, engine, onP)
                    : await translateLines(lines, lang, engine, onP);
                if (TR.jaCount) status('Đã dịch, kèm ' + TR.jaCount + ' câu tiếng Nhật xen giữa.');
                todo.forEach(function (b, i) { applyTranslation(b, out[i], lang); });
                TR.lastLang = lang;
                return true;
            })();
            var p = TR.busy;
            p.then(function () { TR.busy = null; TR.manual = false; }, function () { TR.busy = null; TR.manual = false; });
            return p;
        }

        /* =====================================================================
         * 11. Phát
         * =================================================================== */

        function stopSpeech() {
            S.token++;
            try { speechSynthesis.cancel(); } catch (e) {}
            S.utter = null;
        }

        function sleepFade() {
            if (!S.sleepAt) return 1;
            var left = S.sleepAt - Date.now();
            return left >= 12000 ? 1 : Math.max(0.1, left / 12000);
        }

        function speak(i) {
            if (!S.segs.length) { status('Không có nội dung để đọc'); return; }
            if (i >= S.segs.length) { onFinished(); return; }
            if (i < 0) i = 0;
            S.idx = i;
            S.needRestart = false;

            var seg = S.segs[i], blk = S.blocks[seg.bi];
            var raw = blk.text.slice(seg.a, seg.b);
            var spoken = applyRules(raw);
            var sameText = spoken === raw;

            highlightSeg(blk, seg.a, seg.b);
            scrollToSeg(blk, seg.a, seg.b, false);
            renderProgress();

            if (!spoken.trim()) { setTimeout(function () { if (S.reading && !S.paused) speak(i + 1); }, 0); return; }

            var u = new SpeechSynthesisUtterance(spoken);
            var v = pickVoice();
            if (v) { u.voice = v; u.lang = v.lang; }
            u.rate = clamp(cfg.rate, 0.5, 4, 1);
            u.pitch = clamp(cfg.pitch, 0, 2, 1);
            u.volume = clamp(cfg.volume, 0, 1, 1) * sleepFade();

            var tok = ++S.token;
            S.lastEvt = Date.now();

            u.onstart = function () { if (tok !== S.token) return; S.lastEvt = Date.now(); S.errStreak = 0; };
            u.onboundary = function (ev) {
                if (tok !== S.token) return;
                S.lastEvt = Date.now();
                S.sawBoundary = true;
                if (!sameText) return;
                var wr = wordRange(blk, seg.a, ev);
                if (!wr) return;
                if (cfg.highlightWords && canHL) { try { CSS.highlights.set(HL_WORD, new Highlight(wr)); } catch (e) {} }
                try { followRect(wr.getBoundingClientRect(), blk.el, false, true); } catch (e) {}
            };
            u.onend = function () {
                if (tok !== S.token) return;
                S.lastEvt = Date.now(); S.retry = 0;
                if (!S.sawBoundary && !S.warnedBoundary && cfg.highlightWords && canHL && sameText && spoken.length > 60) {
                    S.warnedBoundary = true;
                    status('Giọng này không báo vị trí từng từ — chỉ tô được cả đoạn.');
                }
                setTimeout(function () {
                    if (tok === S.token && S.reading && !S.paused) speak(i + 1);
                }, clamp(cfg.segmentDelayMs, 0, 5000, 120));
            };
            u.onerror = function (ev) {
                if (tok !== S.token) return;
                var err = (ev && ev.error) || 'unknown';
                if (err === 'interrupted' || err === 'canceled') return;
                if (err === 'not-allowed') { waitGesture(); return; }
                S.errStreak++;
                if (S.errStreak >= 3) { stop(); status('Dừng vì giọng đọc lỗi liên tiếp (' + err + '). Thử đổi giọng khác.'); return; }
                status('Lỗi ở đoạn ' + (i + 1) + ' (' + err + '), bỏ qua…');
                setTimeout(function () { if (tok === S.token && S.reading && !S.paused) speak(i + 1); }, 250);
            };

            S.utter = u;
            try { speechSynthesis.cancel(); } catch (e) {}
            setTimeout(function () {
                if (tok !== S.token) return;
                try { if (speechSynthesis.paused) speechSynthesis.resume(); } catch (e) {}
                try { speechSynthesis.speak(u); } catch (e) { report('Không phát được', e); }
            }, 0);
        }

        function onGesture(e) {
            if (e.type === 'keydown' && (e.altKey || e.ctrlKey || e.metaKey)) return;
            if (inUI(e.target)) return;
            unarmGesture();
            if (S.blocked && S.reading) { S.blocked = false; renderState(); speak(S.idx); status('Đang đọc'); }
        }
        function armGesture() { window.addEventListener('pointerdown', onGesture, true); window.addEventListener('keydown', onGesture, true); }
        function unarmGesture() { window.removeEventListener('pointerdown', onGesture, true); window.removeEventListener('keydown', onGesture, true); }
        function waitGesture() {
            S.blocked = true;
            stopSpeech(); armGesture(); renderState();
            status(IS_TOUCH ? 'Trình duyệt chặn tự đọc khi trang chưa được chạm. Chạm vào trang để đọc tiếp.'
                            : 'Trình duyệt chặn tự đọc khi trang chưa được bấm. Bấm vào trang (hoặc Alt+Space) để đọc tiếp.');
        }

        // Chuẩn bị trước khi đọc: bước riêng của site (vd. Wattpad tải đủ chương),
        // quét, rồi dịch nếu cần. Trả về Promise.
        async function ensureReady(keepPos) {
            if (!S.prepared && typeof SITE.prepare === 'function') {
                S.prepared = true;
                try {
                    var note = await SITE.prepare({ status: status });
                    if (note) S.prepWarn.push(note);
                } catch (e) { S.prepWarn.push('Bước chuẩn bị của ' + SITE.name + ' lỗi: ' + (e && e.message ? e.message : e)); }
            }
            rescan({ keepPos: keepPos });
            if (wantLang() && !isTranslated()) {
                await translatePage(false);
                rescan({ keepPos: keepPos });
            }
            S.lang = detectLang(sampleText()) || SITE.lang || 'vi';
        }

        function play() {
            if (S.blocked) { S.blocked = false; unarmGesture(); if (S.reading) { renderState(); speak(S.idx); return; } }
            if (S.reading && S.paused) {
                S.paused = false;
                if (S.needRestart || !speechSynthesis.speaking) speak(S.idx);
                else { try { speechSynthesis.resume(); } catch (e) {} }
                setMedia('playing'); renderState(); status('Tiếp tục đọc');
                return;
            }
            if (S.reading || S.preparing) return;

            S.preparing = true;
            var tok = ++S.prepTok;
            renderState();
            var keep = S.segs.length > 0;
            ensureReady(keep).then(function () {
                if (tok !== S.prepTok || !S.preparing) return;
                S.preparing = false;
                if (!S.segs.length) { renderState(); status('Không tìm thấy nội dung. Mở "Nâng cao" → "Chọn vùng đọc".'); return; }
                var si = selectionStart();
                if (si >= 0) S.idx = si;
                if (S.idx >= S.segs.length) S.idx = 0;
                S.reading = true; S.paused = false; S.errStreak = 0;
                setMedia('playing'); renderState();
                status(S.warn.length ? ('⚠ ' + S.warn[0]) : ('Đang đọc · ' + S.blocks.length + ' đoạn, ' + S.segs.length + ' câu'));
                speak(S.idx);
            }).catch(function (e) {
                if (tok !== S.prepTok) return;
                S.preparing = false; renderState();
                report('Không chuẩn bị được để đọc', e);
            });
        }

        function pause() {
            if (!S.reading || S.paused) return;
            S.paused = true;
            try { speechSynthesis.pause(); } catch (e) {}
            setMedia('paused'); renderState(); status('Tạm dừng');
        }

        function stop() {
            S.preparing = false; S.prepTok++;
            S.reading = false; S.paused = false; S.blocked = false; S.needRestart = false;
            unarmGesture();
            stopSpeech(); clearHL();
            setMedia('none'); renderState(); renderProgress(); status('Đã dừng');
        }

        function goTo(i) {
            if (!S.segs.length) return;
            S.idx = Math.min(S.segs.length - 1, Math.max(0, i));
            if (S.reading && !S.paused && !S.blocked) { speak(S.idx); return; }
            if (S.reading) { stopSpeech(); S.needRestart = true; }
            var s = S.segs[S.idx];
            if (s) { var b = S.blocks[s.bi]; highlightSeg(b, s.a, s.b); scrollToSeg(b, s.a, s.b, true); }
            renderProgress();
        }
        function jump(delta) { goTo(S.idx + delta); }

        function startFrom(pos) {
            if (!S.segs.length) rescan();
            var i = segIndexAt(pos, false);
            if (i < 0) { status('Chỗ đó nằm sau phần cuối vùng đọc.'); return; }
            if (S.reading) { goTo(i); if (S.paused || S.blocked) play(); }
            else { S.idx = i; play(); }
            status('Đọc từ đoạn ' + (S.idx + 1) + '/' + S.segs.length);
        }

        function goNextChapter(auto) {
            if (!S.nextUrl) { status('Không thấy chương sau.'); return; }
            if (auto && cfg.autoStartNext) { try { sessionStorage.setItem(AUTO_KEY, '1'); } catch (e) {} }
            stopSpeech();
            setTimeout(function () { location.href = S.nextUrl; }, auto ? 500 : 0);
        }

        function onFinished() {
            clearHL();
            if (cfg.autoNext && S.nextUrl) { status('Xong chương, chuyển chương sau…'); goNextChapter(true); return; }
            S.reading = false; S.paused = false; S.idx = 0;
            setMedia('none'); renderState(); renderProgress();
            status(S.nextUrl ? 'Đã đọc hết chương' : 'Đã đọc hết — không thấy chương sau');
        }

        // Watchdog: Chrome/Edge treo speechSynthesis sau ~15 giây và đôi khi nuốt sự kiện end.
        setInterval(function () {
            if (S.sleepAt && Date.now() >= S.sleepAt) {
                S.sleepAt = 0;
                if (S.reading) stop();
                status('Hết giờ hẹn ngủ'); renderSleep();
                return;
            }
            if (!S.reading || S.paused || S.blocked) return;
            try { if (speechSynthesis.speaking && !speechSynthesis.paused) speechSynthesis.resume(); } catch (e) {}
            if (Date.now() - S.lastEvt > 12000 && !speechSynthesis.speaking && !speechSynthesis.pending) {
                if (S.retry < 2) { S.retry++; speak(S.idx); } else { S.retry = 0; speak(S.idx + 1); }
            }
            // Mọi modal đang mở, kể cả modal riêng của site (vd. "Chỉnh bộ" của Lofter)
            var modalOpen = !!(S.root && S.root.querySelector('.modal:not(.hidden)'));
            if (cfg.autoHide && !S.panelHidden && !modalOpen && Date.now() - S.lastUiAt > 30000 && !S.pick) hidePanel();
        }, 4000);

        // Đồng hồ hẹn ngủ trên bảng và mini-player
        setInterval(function () { if (S.sleepAt) renderSleep(); }, 1000);

        function toggleSleep() {
            if (S.sleepAt) { S.sleepAt = 0; status('Đã tắt hẹn giờ'); }
            else {
                var m = clamp(cfg.sleepMinutes, 1, 600, 30);
                S.sleepAt = Date.now() + m * 60000;
                status('Hẹn giờ: dừng sau ' + m + ' phút (giảm âm dần 12 giây cuối). Tạm dừng không hủy hẹn giờ.');
            }
            renderSleep();
        }

        window.addEventListener('pagehide', function () { try { speechSynthesis.cancel(); } catch (e) {} });

        /* =====================================================================
         * 12. Media Session
         * =================================================================== */

        var mediaBound = false;
        function setMedia(state) {
            if (!('mediaSession' in navigator)) return;
            try {
                if (!mediaBound) {
                    mediaBound = true;
                    navigator.mediaSession.setActionHandler('play', function () { play(); });
                    navigator.mediaSession.setActionHandler('pause', function () { pause(); });
                    navigator.mediaSession.setActionHandler('stop', function () { stop(); });
                    navigator.mediaSession.setActionHandler('previoustrack', function () { jump(-1); });
                    navigator.mediaSession.setActionHandler('nexttrack', function () { jump(1); });
                }
                var cover = findCover();
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: S.title || document.title, artist: 'TTS Reader — ' + SITE.name, album: HOST,
                    artwork: cover ? [{ src: cover }] : []
                });
                navigator.mediaSession.playbackState = state;
            } catch (e) {}
        }

        /* =====================================================================
         * 13. Quét trang
         * =================================================================== */

        function rescan(opts) {
            opts = opts || {};
            var anchor = null;
            if (opts.keepPos && S.segs.length) {
                var cs = S.segs[Math.min(S.idx, S.segs.length - 1)], cb = cs && S.blocks[cs.bi];
                anchor = { ratio: S.idx / S.segs.length, pt: (cb && cb.map && cb.map[cs.a]) || null };
            }
            spCache = new WeakMap();

            S.containers = findContainers();
            var t = findTitle(S.containers);
            S.title = t.text; S.titleEl = t.el;
            S.blocks = [];
            // Tiêu đề đã dịch: đọc bản dịch nằm ngay sau nó, không đọc bản gốc đã ẩn.
            var tEl = t.el;
            if (tEl && tEl.classList && tEl.classList.contains('ttsr-orig') && tEl.nextElementSibling &&
                tEl.nextElementSibling.classList.contains('ttsr-vi')) {
                tEl = tEl.nextElementSibling;
                S.title = clean(tEl.textContent);
            }
            if (!tEl && TR.lastLang && TR.cache.has(TR.lastLang + '|' + S.title)) S.title = TR.cache.get(TR.lastLang + '|' + S.title);
            var titleInside = !!tEl && S.containers.some(function (c) { return c.contains(tEl); });
            if (cfg.includeTitle && S.title && !titleInside) {
                S.blocks.push(tEl ? buildBlock(tEl) : { el: null, text: S.title, map: null, kind: 'text' });
            }
            for (var ci = 0; ci < S.containers.length; ci++) {
                var body = collectBlocks(S.containers[ci]);
                for (var i = 0; i < body.length; i++) S.blocks.push(body[i]);
            }
            buildSegments();

            var nx = findNext();
            S.nextUrl = nx.url; S.nextEl = nx.el; S.src.next = nx.src;

            S.warn = S.prepWarn.slice();
            var u = sites[HOST] || {};
            if (u.contentSel && S.src.content.indexOf('rule tự chọn') !== 0)
                S.warn.push('Vùng đọc đã lưu (' + u.contentSel + ') không khớp trang này — đang dùng ' + S.src.content + '.');

            S.idx = 0;
            if (anchor) {
                var k = (anchor.pt && anchor.pt.node.isConnected) ? segIndexAt({ node: anchor.pt.node, offset: anchor.pt.off }, false) : -1;
                S.idx = k >= 0 ? k : Math.min(Math.max(0, S.segs.length - 1), Math.round(anchor.ratio * S.segs.length));
            }
            if (S.reading && S.segs.length) {
                if (!S.paused && !S.blocked) speak(S.idx);
                else { stopSpeech(); S.needRestart = true; var s = S.segs[S.idx]; highlightSeg(S.blocks[s.bi], s.a, s.b); }
            }
            renderProgress(); renderMeta();
        }

        // Chỉ tính lại "chương sau", không quét lại nội dung. Dùng khi site biết thêm điều gì đó
        // sau lần quét (vd. Lofter dò xong mục lục) — rescan() ở đây sẽ làm giọng đọc khựng lại.
        function refreshNext() {
            var nx = findNext();
            S.nextUrl = nx.url; S.nextEl = nx.el; S.src.next = nx.src;
            renderState(); renderMeta();
        }

        // Site báo chương này không có gì để đọc (vd. bài Lofter toàn ảnh). '' = có chữ, đọc bình thường.
        function skipReason() {
            try { return typeof SITE.skip === 'function' ? (SITE.skip() || '') : ''; } catch (e) { return ''; }
        }

        function waitForContent(cb) {
            var sels = layers().map(function (l) { return l.r.contentSel; }).filter(function (x) { return typeof x === 'string' && x; });
            var minText = SITE.minText || 1;
            var limit = SITE.waitMs || 8000;
            var t0 = Date.now();
            (function tick() {
                for (var i = 0; i < sels.length; i++) {
                    var list = qa(sels[i]);
                    var len = list.reduce(function (n, el) { return n + (el.textContent || '').trim().length; }, 0);
                    if (list.length && len >= minText) { cb(); return; }
                }
                if (!sels.length || Date.now() - t0 > limit) { cb(); return; }
                // Chương không có chữ thì chờ thêm cũng không ra chữ — khỏi ngồi hết waitMs.
                if (Date.now() - t0 > 1500 && skipReason()) { cb(); return; }
                setTimeout(tick, 300);
            })();
        }

        function readyMsg() {
            if (!S.segs.length) return 'Không tìm thấy nội dung. Mở "Nâng cao" → "Chọn vùng đọc".';
            var tr = wantLang();
            var extra = tr && !isTranslated() ? ' · sẽ dịch ' + tr + '→vi khi bấm Play' : '';
            return S.warn.length ? ('⚠ ' + S.warn[0]) : ('Sẵn sàng · ' + S.blocks.length + ' đoạn, ' + S.segs.length + ' câu' + extra);
        }

        /* =====================================================================
         * 14. Chế độ chọn (vị trí đọc / vùng đọc / link chương sau)
         * =================================================================== */

        function stableId(el) {
            return el.id && !/\d/.test(el.id) && document.querySelectorAll('#' + esc(el.id)).length === 1;
        }
        function cssPath(el) {
            if (!el || el.nodeType !== 1) return '';
            if (stableId(el)) return '#' + esc(el.id);
            var parts = [], cur = el, guard = 0;
            while (cur && cur.nodeType === 1 && guard++ < 8 && cur !== document.documentElement) {
                var sel = cur.tagName.toLowerCase();
                if (stableId(cur)) { parts.unshift('#' + esc(cur.id)); break; }
                var cl = cls(cur).split(/\s+/)
                    .filter(function (c) { return c && !/^ttsr/.test(c) && !/\d{4,}/.test(c) && c.length < 40; })
                    .slice(0, 2);
                if (cl.length) sel += '.' + cl.map(esc).join('.');
                var p = cur.parentElement;
                if (p) {
                    var same = [], k;
                    for (k = 0; k < p.children.length; k++) if (p.children[k].tagName === cur.tagName) same.push(p.children[k]);
                    if (same.length > 1) sel += ':nth-of-type(' + (same.indexOf(cur) + 1) + ')';
                }
                parts.unshift(sel);
                try { if (parts.length >= 2 && document.querySelectorAll(parts.join(' > ')).length === 1) break; } catch (e) {}
                cur = p;
            }
            return parts.join(' > ');
        }

        function pickOver(e) {
            var el = e.target;
            if (!el || el.nodeType !== 1 || inUI(el)) return;
            if (S.pickEl && S.pickEl !== el) S.pickEl.classList.remove('ttsr-pick-hover');
            S.pickEl = el; el.classList.add('ttsr-pick-hover');
        }
        function pickClick(e) {
            var el = e.target;
            if (!el || el.nodeType !== 1 || inUI(el)) return;
            e.preventDefault(); e.stopPropagation();
            var mode = S.pick;
            endPick();
            if (mode === 'start') {
                startFrom(caretAt(e.clientX, e.clientY) || { node: el, offset: 0 });
            } else if (mode === 'next') {
                var a = el.closest ? el.closest('a[href]') : null;
                if (!a) { status('Chỗ đó không phải link. Thử lại.'); return; }
                setRule('nextSel', cssPath(a));
                S.nextUrl = a.href; S.nextEl = a; S.src.next = 'rule tự chọn: ' + sites[HOST].nextSel;
                status('Đã lưu link chương sau');
            } else {
                setRule('contentSel', cssPath(el));
                rescan(); flashApplied();
                status('Đã lưu vùng đọc · ' + S.blocks.length + ' đoạn');
            }
            renderMeta();
        }

        function showPickBar(msg) {
            hidePickBar();
            try {
                var h = document.createElement('div');
                h.className = 'ttsr-ui';
                h.style.cssText = 'all:initial;position:fixed;z-index:2147483647;';
                var r = h.attachShadow({ mode: 'open' });
                r.innerHTML = '<style>.bar{position:fixed;left:50%;transform:translateX(-50%);top:calc(10px + env(safe-area-inset-top,0px));' +
                    'max-width:calc(100vw - 20px);display:flex;align-items:center;gap:10px;background:#0b1220;color:#e5e7eb;' +
                    'border:1px solid #26c6da;border-radius:12px;padding:9px 10px 9px 13px;font:13px/1.35 "Be Vietnam Pro","Segoe UI",system-ui,sans-serif;' +
                    'box-shadow:0 10px 30px rgba(0,0,0,.45);}.msg{flex:1;min-width:0;}' +
                    'button{flex:none;background:#ef5350;color:#fff;border:0;border-radius:9px;padding:9px 13px;font:700 13px system-ui,sans-serif;cursor:pointer;}' +
                    '@media (pointer:coarse){button{padding:12px 16px;font-size:14px;}}</style>' +
                    '<div class="bar"><span class="msg" id="m"></span><button id="x">Hủy chọn</button></div>';
                r.getElementById('m').textContent = msg;
                r.getElementById('x').addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); endPick(); status('Đã hủy chọn'); });
                (document.body || document.documentElement).appendChild(h);
                S.pickBar = h;
            } catch (e) {}
        }
        function hidePickBar() {
            try { if (S.pickBar && S.pickBar.parentNode) S.pickBar.parentNode.removeChild(S.pickBar); } catch (e) {}
            S.pickBar = null;
        }

        function startPick(mode) {
            if (S.pick) { var was = S.pick; endPick(); if (was === mode) return; }
            if (!S.segs.length && mode === 'start') rescan();
            S.pick = mode;
            document.addEventListener('mouseover', pickOver, true);
            document.addEventListener('pointerdown', pickOver, true);
            document.addEventListener('click', pickClick, true);
            var msg = mode === 'next' ? 'Bấm vào link "chương sau"'
                    : mode === 'start' ? 'Bấm vào chữ muốn bắt đầu đọc'
                    : 'Bấm vào khối nội dung cần đọc';
            status(msg + (IS_TOUCH ? ' — hoặc bấm "Hủy chọn" ở trên' : ' (Esc để hủy)'));
            showPickBar(msg);
            if (!S.panelHidden) { S.pickHidPanel = true; hidePanel(); }
            renderState();
        }
        function endPick() {
            if (S.pickEl) { S.pickEl.classList.remove('ttsr-pick-hover'); S.pickEl = null; }
            document.removeEventListener('mouseover', pickOver, true);
            document.removeEventListener('pointerdown', pickOver, true);
            document.removeEventListener('click', pickClick, true);
            hidePickBar();
            S.pick = null;
            if (S.pickHidPanel) { S.pickHidPanel = false; showPanel(); }
            renderState();
        }
        function setRule(key, val) {
            if (!sites[HOST]) sites[HOST] = {};
            sites[HOST][key] = val;
            saveSites();
        }

        /* =====================================================================
         * 15. Giao diện — bố cục theo 1.5.4 (Shadow DOM, CSS trang không phá được)
         * =================================================================== */

        // Màu theo bộ giao diện chung (userscripts/shared/ui-kit.js), dùng cho mọi trang. Tên biến
        // --c-* giữ nguyên để phần CSS bên dưới không phải viết lại; nền, viền, chữ trỏ sang --k-*
        // của bộ chung nên đổi theo theme tối/sáng. KIT_TOKENS (định nghĩa --k-*) được ghép vào
        // trước khối này lúc dựng giao diện — xem buildUI và buildMini.
        var TOKENS = [
            ':host{',
            '--c-primary:var(--k-accent);--c-primary-2:var(--k-accent);--c-second:var(--k-accent);--c-second-2:var(--k-accent);',
            '--c-danger:#f5a094;--c-danger-2:#e2665c;--c-surface:var(--k-field);--c-surface-2:var(--k-soft);',
            '--c-border:var(--k-line);--c-shadow:0 18px 40px var(--k-shadow);',
            '--c-text:var(--k-text);--c-muted:var(--k-muted);--r:10px;--r-sm:8px;',
            'font-family:"Be Vietnam Pro","Noto Sans","Segoe UI",Arial,sans-serif;color:var(--c-text);}',
            // Thẻ chủ mang inline "all:initial" (để CSS trang không lọt vào), và inline thắng
            // :host → font đặt ở :host bị reset về serif. Đặt thẳng lên các khung gốc.
            '.panel,.mini,.modal{font-family:"Be Vietnam Pro","Noto Sans","Segoe UI",Roboto,Arial,sans-serif;color:var(--c-text);}',
            '*{box-sizing:border-box;}',
            'button,input,select,textarea{font-family:inherit;}',
            '.hidden{display:none!important;}'
        ].join('');
        // Hai màu nền chuyển sắc viết cứng trong CSS cũ (cam / lam) → hai màu của bộ giao diện chung.
        function themed(css) { return css.split('255,138,101').join('52,230,201').split('38,198,218').join('142,230,171'); }

        var PANEL_CSS = TOKENS + [
            '.panel{position:fixed;right:14px;bottom:calc(14px + var(--ttsr-bot,0px) + env(safe-area-inset-bottom,0px));width:360px;',
            'max-width:calc(100vw - 20px);background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r);',
            'box-shadow:var(--c-shadow);color:var(--c-text);font-size:13px;line-height:1.45;overflow:hidden;z-index:2147483647;}',
            '.head{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--c-border);',
            'background:linear-gradient(135deg,rgba(255,138,101,.14) 0%,rgba(38,198,218,.16) 100%);cursor:move;touch-action:none;user-select:none;}',
            '.tw{display:grid;gap:1px;min-width:0;}',
            '.tt{font-weight:800;font-size:14px;}',
            '.sub{font-size:11px;color:var(--c-muted);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}',
            '.ha{display:flex;gap:6px;align-items:center;}',
            '.ha button{border:1px solid var(--c-border);background:var(--c-surface);border-radius:6px;width:26px;height:26px;padding:0;line-height:1;',
            'display:grid;place-items:center;cursor:pointer;color:var(--c-text);font-weight:800;font-size:13px;}',
            '.ha button:hover{border-color:var(--c-second);}',
            '.ha svg{width:12px;height:12px;stroke:currentColor;stroke-width:2;fill:none;}',
            '.body{padding:10px;display:grid;gap:10px;max-height:min(72vh,640px);overflow:auto;scrollbar-width:thin;}',
            '.card{border:1px solid var(--c-border);border-radius:var(--r-sm);padding:10px;background:var(--c-surface-2);display:grid;gap:8px;}',
            '.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}',
            '.stat{background:var(--c-surface);border:1px solid var(--c-border);border-radius:8px;padding:6px 8px;display:grid;gap:1px;min-width:0;}',
            '.stat span{font-size:10px;text-transform:uppercase;letter-spacing:.04em;color:var(--c-muted);}',
            '.stat strong{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
            '.bar{height:5px;background:var(--c-border);border-radius:99px;overflow:hidden;}',
            '.bar>i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--c-primary),var(--c-second));transition:width .2s;}',
            '.status{font-size:12px;color:var(--c-muted);min-height:17px;word-break:break-word;}',
            '.btns{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}',
            'button.b{border:1px solid var(--c-border);background:var(--c-surface);color:var(--c-text);border-radius:8px;padding:7px 8px;',
            'cursor:pointer;font-size:12px;font-weight:700;white-space:nowrap;}',
            'button.b:hover{border-color:var(--c-second);}',
            'button.b:disabled{opacity:.5;cursor:default;}',
            'button.pri{background:linear-gradient(135deg,var(--c-primary) 0%,var(--c-primary-2) 100%);border-color:transparent;color:#fff;}',
            'button.sec{background:linear-gradient(135deg,var(--c-second) 0%,var(--c-second-2) 100%);border-color:transparent;color:#fff;}',
            'button.dan{background:linear-gradient(135deg,var(--c-danger) 0%,var(--c-danger-2) 100%);border-color:transparent;color:#fff;}',
            'button.on{outline:2px solid var(--c-second);outline-offset:1px;}',
            '.grid{display:grid;gap:4px;}',
            '.grid>label,.lb{font-size:11px;font-weight:700;color:var(--c-muted);}',
            '.inline{display:grid;grid-template-columns:1fr auto;gap:6px;}',
            '.two{display:grid;grid-template-columns:1fr 1fr;gap:6px;}',
            '.line{display:grid;grid-template-columns:1fr 64px;gap:8px;align-items:center;}',
            'select,input[type=number],input[type=text],textarea{width:100%;background:var(--c-surface);color:var(--c-text);',
            'border:1px solid var(--c-border);border-radius:8px;padding:6px 8px;font-size:12px;}',
            'textarea{min-height:120px;resize:vertical;font-family:"JetBrains Mono","Cascadia Mono",Consolas,monospace;}',
            'input[type=range]{width:100%;accent-color:var(--c-primary);}',
            '.help{font-size:11px;color:var(--c-muted);line-height:1.45;}',
            '.toggles{display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;}',
            'label.ck{display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;}',
            'input[type=checkbox]{accent-color:var(--c-second);width:14px;height:14px;}',
            'details{border:1px solid var(--c-border);border-radius:var(--r-sm);padding:8px 10px;background:var(--c-surface-2);}',
            'summary{cursor:pointer;font-weight:800;font-size:12px;user-select:none;}',
            'details[open]>summary{margin-bottom:8px;}',
            'details>.grid+.grid{margin-top:8px;}',
            '.meta{font-size:11px;color:var(--c-muted);white-space:pre-line;word-break:break-word;}',
            '.ttl-tag{font-size:10px;font-weight:800;padding:1px 7px;border-radius:99px;background:rgba(38,198,218,.18);color:var(--c-second-2);}',
            '.ttl-tag.wait{background:rgba(255,138,101,.2);color:var(--c-primary-2);}',
            /* Modal */
            '.modal{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:14px;}',
            '.ov{position:absolute;inset:0;background:rgba(15,23,42,.45);}',
            '.dlg{position:relative;width:min(560px,100%);max-height:calc(100vh - 28px);display:grid;grid-template-rows:auto 1fr;',
            'background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r);box-shadow:var(--c-shadow);overflow:hidden;}',
            '.dh{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid var(--c-border);',
            'background:linear-gradient(135deg,rgba(255,138,101,.14) 0%,rgba(38,198,218,.16) 100%);font-weight:800;}',
            '.db{padding:12px;overflow:auto;display:grid;gap:10px;align-content:start;}',
            '.rl{display:grid;gap:6px;}',
            '.rr{display:grid;grid-template-columns:1fr 1fr auto auto;gap:6px;align-items:center;}',
            '.rr label{font-size:11px;display:flex;gap:3px;align-items:center;color:var(--c-muted);}',
            '.acts{display:flex;gap:6px;flex-wrap:wrap;}',
            '.hp{font-size:12px;line-height:1.55;white-space:pre-wrap;}',
            '.hp b{color:var(--c-primary-2);}',
            /* Cảm ứng: bottom sheet, chữ & nút to lên, ô nhập >= 16px để trình duyệt không tự phóng to */
            '@media (pointer:coarse){',
            '.panel{left:0!important;right:0!important;top:auto!important;bottom:calc(var(--ttsr-bot,0px) + env(safe-area-inset-bottom,0px))!important;',
            'width:auto!important;max-width:none!important;border-radius:16px 16px 0 0;}',
            '.head{cursor:default;padding:12px;}.ha button{width:34px;height:34px;font-size:16px;}',
            '.body{max-height:62vh;}',
            'button.b{padding:11px 8px;font-size:14px;}',
            'select,input[type=number],input[type=text],textarea{font-size:16px;padding:9px;}',
            'label.ck{font-size:14px;padding:4px 0;}input[type=checkbox]{width:20px;height:20px;}',
            '.status{font-size:13px;}',
            '}'
        ].join('');

        function trModesHtml() {
            if (!SITE.tr) return '';
            var names = { off: 'Không dịch', auto: 'Tự nhận (Anh/Trung → Việt)', en: 'Anh → Việt', zh: 'Trung → Việt' };
            var modes = SITE.tr.modes || ['off', 'en'];
            var enEng = modes.indexOf('en') >= 0 || modes.indexOf('auto') >= 0;
            var zhEng = modes.indexOf('zh') >= 0 || modes.indexOf('auto') >= 0;
            return [
                '<section class="card" id="trCard">',
                '  <div class="grid"><label>Dịch trước khi đọc</label>',
                '    <select id="trMode">' + modes.map(function (m) { return '<option value="' + m + '">' + names[m] + '</option>'; }).join('') + '</select>',
                '  </div>',
                enEng ? '  <div class="grid"><label>Máy dịch Anh → Việt</label><select id="trEn">' +
                    '<option value="auto">Tự chọn (Chrome trên máy, không có thì Google)</option>' +
                    '<option value="chrome">Chrome — dịch trên máy</option><option value="google">Google</option></select></div>' : '',
                zhEng ? '  <div class="grid"><label>Máy dịch Trung → Việt</label><select id="trZh">' +
                    '<option value="tm">TM Translate (name-set của bạn)</option><option value="google">Google</option></select></div>' : '',
                zhEng ? '  <label class="ck" title="Câu có kana (あ, ア…) được tách ra dịch Nhật → Việt bằng Chrome trên máy hoặc Google; phần tiếng Trung vẫn qua máy dịch Trung ở trên.">' +
                    '<input type="checkbox" id="trJa"> Dịch cả tiếng Nhật xen giữa (Trung + Nhật)</label>' : '',
                '  <div class="acts"><button class="b sec" id="trNow">Dịch ngay</button><button class="b" id="trUndo">Bỏ bản dịch</button>',
                '    <label class="ck"><input type="checkbox" id="trOrig"> Hiện bản gốc (mờ)</label></div>',
                '  <div class="help">' + escHtml(SITE.tr.note || 'Bấm Play là tự dịch cả chương rồi mới đọc.') + '</div>',
                '</section>'
            ].join('');
        }

        // Trong bảng chung: hết là cửa sổ nổi, hết kéo được, khung và bóng là của bảng chung.
        var HUB_PANEL_CSS = '.panel{position:static!important;width:auto!important;max-width:none!important;border:0!important;' +
            'border-radius:0!important;box-shadow:none!important;background:transparent!important;font-size:12px;}' +
            // Thanh tab, nút "?" "–" "✕" là của bảng chung → bỏ tiêu đề riêng; bảng chung tự cuộn.
            '.head{display:none!important;}.body{max-height:none!important;overflow:visible!important;padding:10px;gap:9px;}' +
            '.card{background:var(--k-card);border-color:var(--k-line);border-radius:10px;gap:9px;box-shadow:inset 0 1px 0 rgba(255,255,255,.04);}' +
            'details{background:var(--k-field);border-color:var(--k-line);}details details{background:var(--k-sunk);}' +
            '.card>details{margin-top:2px;}' +
            // Nút: xám = việc phụ; màu chính / phụ / vàng / đỏ theo bộ màu của trang.
            'button.b{background:var(--k-soft);color:var(--k-softx);border:0;border-radius:7px;padding:8px 8px;font-size:12px;}' +
            'button.b:hover{filter:brightness(1.08);border:0;}' +
            'button.pri,button.sec,button.dan,#pause{color:var(--k-on);text-shadow:0 1px 1px rgba(0,0,0,.18);' +
            'box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 2px 6px rgba(0,0,0,.12);}' +
            'button.pri{background:var(--k-teal);}button.sec{background:var(--k-green);color:var(--k-ong);}' +
            'button.dan{background:var(--k-red);color:var(--k-onr);}#pause{background:var(--k-yellow);color:var(--k-ony);}' +
            'button.b:disabled{opacity:.55;}' +
            // Ba ô số liệu trên một hàng; "Chương sau" bấm được.
            '.stats{grid-template-columns:repeat(3,1fr);gap:6px;}' +
            '.stat{background:var(--k-field);border-color:var(--k-line);border-radius:8px;padding:7px 8px;}' +
            '.stat span{font-size:8.5px;letter-spacing:.05em;}.stat strong{font-size:13px;font-weight:800;}' +
            'button.stat{cursor:pointer;text-align:left;color:var(--c-text);font-family:inherit;}' +
            'button.stat:hover{border-color:var(--k-accent);}button.stat:disabled{cursor:default;opacity:.6;}' +
            '.status{font-size:10.5px;min-height:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
            '.bar{height:4px;background:var(--k-soft);margin-top:-4px;}.bar>i{background:var(--k-teal);}' +
            '.btns{gap:7px;}.two{gap:7px;}.inline{gap:7px;}' +
            '.grid>label,.lb{font-size:11px;font-weight:400;color:var(--k-muted);}' +
            'select,input[type=number],input[type=text],textarea{background:var(--k-field);border-color:var(--k-line);border-radius:7px;padding:7px 9px;}' +
            'select:focus,input:focus,textarea:focus{outline:none;border-color:var(--k-accent);}' +
            '.help{font-size:10.5px;}' +
            // Thanh trượt: nhãn · thanh · ô số trên một dòng.
            '.line{grid-template-columns:58px 1fr 46px;gap:8px;}.line>label{font-size:11px;color:var(--k-muted);}' +
            '.line input[type=number]{padding:6px 4px;text-align:center;}' +
            '.toggles{grid-template-columns:1fr;gap:9px;}' +
            'label.ck{gap:8px;}' +
            // Tiêu đề thẻ có công tắc ở bên phải: <div class="hd"><b>…</b><label class="sw"><input type="checkbox"><i></i></label></div>
            '.hd{display:flex;align-items:center;justify-content:space-between;gap:8px;}.hd b{font-size:12.5px;font-weight:800;}' +
            'label.sw{position:relative;display:inline-block;width:32px;height:18px;flex:none;cursor:pointer;}' +
            'label.sw input{position:absolute;opacity:0;width:0;height:0;}' +
            'label.sw i{position:absolute;inset:0;border-radius:99px;background:var(--k-soft);transition:background .15s;}' +
            'label.sw i::after{content:"";position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3);transition:transform .15s;}' +
            'label.sw input:checked+i{background:var(--k-teal);}label.sw input:checked+i::after{transform:translateX(14px);}' +
            '.kvr{display:flex;justify-content:space-between;font-size:11px;color:var(--k-muted);}' +
            '.dlg{background:var(--k-win);border-color:var(--k-edge);}.dh{background:transparent;}.ov{background:rgba(0,0,0,.55);}' +
            '.hp b{color:var(--k-accent);}' +
            'input[type=checkbox]{accent-color:var(--k-accent);}input[type=range]{accent-color:var(--k-accent);}';

        function panelHtml() {
            return [
                '<section class="panel" id="panel">',
                ' <div class="head" id="head">',
                '  <div class="tw"><div class="tt">TTS Reader <span class="ttl-tag" id="tag">nghỉ</span></div>',
                '   <div class="sub" id="sub">' + escHtml(SITE.name) + '</div></div>',
                '  <div class="ha">',
                '   <button id="help" title="Hướng dẫn">?</button>',
                '   <button id="hide" title="Thu về mini-player (vẫn đọc tiếp)">–</button>',
                '   <button id="close" title="Dừng và đóng"><svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13"/></svg></button>',
                '  </div>',
                ' </div>',
                ' <div class="body">',
                '  <section class="card">',
                '   <div class="stats">',
                '    <div class="stat"><span>Hiện tại</span><strong id="sPos">Đoạn 1</strong></div>',
                '    <div class="stat"><span>Tiến độ</span><strong id="sPct">0%</strong></div>',
                '    <button class="stat" id="nextCh" title="Sang chương sau"><span>Chương sau</span><strong>›</strong></button>',
                '   </div>',
                '   <div class="status">Câu <span id="sSeg">0/0</span> · <span id="st">Đang khởi tạo…</span></div>',
                '   <div class="bar"><i id="bar"></i></div>',
                '   <div class="btns">',
                '    <button class="b pri" id="play">Play</button>',
                '    <button class="b" id="pause">Pause</button>',
                '    <button class="b dan" id="stop">Stop</button>',
                '   </div>',
                '   <div class="grid"><label>Vị trí đọc (đoạn)</label>',
                '    <div class="inline"><input id="posIn" type="number" min="1" step="1" value="1"><button class="b sec" id="pickS">Chọn vị trí</button></div>',
                '    <div class="two"><button class="b sec" id="prev">‹ Câu trước</button><button class="b sec" id="next">Câu sau ›</button></div>',
                '    <div class="help">Tự cập nhật theo đoạn đang đọc. Gõ số để nhảy, hoặc bấm "Chọn vị trí" rồi bấm vào chữ trên trang. Bôi đen một câu rồi bấm Play cũng được.</div>',
                '   </div>',
                '  </section>',
                trModesHtml(),
                SITE.extraHtml ? '  <section class="card">' + SITE.extraHtml() + '</section>' : '',
                '  <section class="card">',
                '   <div class="grid"><label>Giọng đọc (Edge/Chrome)</label><select id="voice"></select></div>',
                '   <div class="grid"><label>Hẹn giờ ngủ</label>',
                '    <div class="inline"><input id="sleepMin" type="number" min="1" max="600" step="5" title="Số phút"><button class="b sec" id="sleepBtn">Bật hẹn giờ</button></div>',
                '    <div class="help" id="sleepInfo">Tắt đọc sau số phút đã chọn, giảm âm dần 12 giây cuối.</div>',
                '   </div>',
                '  </section>',
                '  <section class="card">',
                '   <div class="line"><label for="rate">Tốc độ</label><input id="rate" type="range" min="0.5" max="4" step="0.05"><input id="rateT" type="number" min="0.5" max="4" step="0.05"></div>',
                '   <div class="line"><label for="pitch">Cao độ</label><input id="pitch" type="range" min="0" max="2" step="0.05"><input id="pitchT" type="number" min="0" max="2" step="0.05"></div>',
                '   <div class="line"><label for="vol">Âm lượng</label><input id="vol" type="range" min="0" max="1" step="0.05"><input id="volT" type="number" min="0" max="1" step="0.05"></div>',
                '   <details>',
                '    <summary>Tùy chỉnh nâng cao</summary>',
                '    <div class="grid"><label>Tối đa ký tự / câu đọc</label><input id="maxc" type="number" min="60" max="600" step="10"></div>',
                '    <div class="grid"><label>Nghỉ giữa hai câu (ms)</label><input id="gap" type="number" min="0" max="5000" step="10"></div>',
                '    <div class="grid"><label>Thay thế khi đọc</label>',
                '     <div class="inline"><label class="ck"><input type="checkbox" id="replOn"> Bật</label><button class="b sec" id="replOpen">Cài đặt</button></div>',
                '     <div class="help" id="replInfo"></div>',
                '    </div>',
                '    <div class="grid"><label>Vùng đọc &amp; chương sau</label>',
                '     <div class="two"><button class="b" id="pickC">Chọn vùng đọc</button><button class="b" id="pickN">Chọn link chương sau</button></div>',
                '     <div class="two"><button class="b" id="rescan">Quét lại</button><button class="b dan" id="clearRule">Xóa rule tự chọn</button></div>',
                '     <div class="meta" id="meta"></div>',
                '    </div>',
                '   </details>',
                '  </section>',
                '  <section class="card toggles">',
                '   <label class="ck"><input type="checkbox" id="ckNext"> Tự qua chương sau</label>',
                '   <label class="ck"><input type="checkbox" id="ckTitle"> Đọc tên chương trước</label>',
                '   <label class="ck"><input type="checkbox" id="ckScroll"> Tự cuộn theo chữ</label>',
                '   <label class="ck"><input type="checkbox" id="ckAuto"> Tự phát chương kế</label>',
                '   <label class="ck"><input type="checkbox" id="ckWord"> Tô từng từ</label>',
                '   <label class="ck"><input type="checkbox" id="ckHide"> Tự thu gọn khi đọc</label>',
                '  </section>',
                ' </div>',
                '</section>',
                /* Modal thay thế */
                '<div class="modal hidden" id="replModal" role="dialog" aria-modal="true">',
                ' <div class="ov" data-close="repl"></div>',
                ' <div class="dlg"><div class="dh">Thay thế khi đọc<div class="ha"><button data-close="repl" title="Đóng"><svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13"/></svg></button></div></div>',
                '  <div class="db">',
                '   <label class="ck"><input type="checkbox" id="replOn2"> Áp dụng thay thế</label>',
                '   <div class="help">Thay đúng chuỗi đã nhập (không phân biệt hoa thường khi bật "regex"). Ô thay để trống = bỏ cụm đó khi đọc. Chỉ đổi cách ĐỌC, chữ trên trang giữ nguyên.</div>',
                '   <div class="rl" id="replList"></div>',
                '   <div class="acts"><button class="b sec" id="replAdd">+ Thêm</button><button class="b dan" id="replClear">Xóa hết</button></div>',
                '   <details><summary>Nhập / xuất hàng loạt</summary>',
                '    <div class="help">Mỗi dòng: <code>từ =&gt; thay</code> · <code>re:biểu thức =&gt; thay</code> · hoặc JSON <code>[{"from":"a","to":"b"}]</code>. Dòng bắt đầu bằng # là ghi chú.</div>',
                '    <textarea id="replBulk"></textarea>',
                '    <div class="acts" style="margin-top:6px"><button class="b sec" id="replImport">Nhập (thêm vào)</button><button class="b" id="replExport">Xuất ra ô trên</button></div>',
                '   </details>',
                '   <div class="acts"><button class="b pri" id="replSave">Lưu</button><button class="b" data-close="repl">Hủy</button></div>',
                '  </div>',
                ' </div>',
                '</div>',
                /* Modal hướng dẫn */
                '<div class="modal hidden" id="helpModal" role="dialog" aria-modal="true">',
                ' <div class="ov" data-close="help"></div>',
                ' <div class="dlg"><div class="dh">Hướng dẫn — TTS Reader · ' + escHtml(SITE.name) + ' ' + VERSION + '<div class="ha"><button data-close="help" title="Đóng"><svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13"/></svg></button></div></div>',
                '  <div class="db"><div class="hp" id="helpBody"></div></div>',
                ' </div>',
                '</div>'
            ].join('');
        }

        function helpText() {
            return [
                '<b>Đọc</b>',
                '• Play: quét trang' + (SITE.tr ? ', dịch nếu cần,' : '') + ' rồi đọc. Pause tạm dừng, Stop dừng hẳn.',
                '• Câu trước / Câu sau: lùi, tiến một câu. "Chương ›" sang chương sau ngay.',
                '• Đọc từ chỗ bất kỳ: bấm "Chọn vị trí" rồi bấm vào chữ trên trang; hoặc bôi đen một câu rồi bấm Play; hoặc gõ số đoạn.',
                '',
                SITE.tr ? '<b>Dịch trước khi đọc</b>' : '',
                SITE.tr ? '• Bản dịch được chèn ngay dưới đoạn gốc; đoạn gốc bị ẩn (bật "Hiện bản gốc" để xem mờ). "Bỏ bản dịch" trả trang về như cũ.' : '',
                SITE.tr ? '• Trung → Việt qua TM Translate cần TM Translate bản hardened.2 trở lên (có cầu nối) đang bật ở trang này — dùng đúng name-set bên đó.' : '',
                SITE.tr ? '• Anh → Việt "Chrome" dịch ngay trên máy (Chrome/Edge đời mới, lần đầu phải tải gói ngôn ngữ). Không có thì dùng Google — cần mạng.' : '',
                SITE.tr ? '' : '',
                '<b>Riêng trang ' + escHtml(SITE.name) + '</b>',
                SITE.help || '',
                '',
                '<b>Phím tắt</b>',
                '• Alt+R: mở/đóng bảng · Alt+Space: đọc/tạm dừng · Esc: hủy chọn.',
                '• Mini-player: bấm đĩa để mở bảng, kéo để dời chỗ.',
                '• Theme: nút đầu tiên ở góc phải thanh tab — tối ☾ · sáng ☀ · theo hệ thống ◐. Nhớ riêng từng trang web.',
                '',
                '<b>' + VERSION + '</b>',
                '• Tách thành một file riêng cho từng trang (AO3, Lofter, STV, FanFiction, Wattpad), tinh chỉnh selector và cách qua chương cho từng trang.',
                '• Giao diện theo 1.5.4; chỉ còn giọng Edge/Chrome — bỏ TikTok/Google/Gemini/Bing/Zalo TTS, bỏ cookie.',
                '• Mới: dịch trước khi đọc (Anh/Trung → Việt), đọc bản dịch và tô màu ngay trên trang.'
            ].filter(function (l, i, a) { return l !== '' || (i > 0 && a[i - 1] !== ''); }).join('\n');
        }

        function buildUI() {
            injectPageStyle();
            var hostEl = document.createElement('div');
            hostEl.className = 'ttsr-ui';
            hostEl.style.cssText = 'all:initial;display:block;';
            var root = hostEl.attachShadow({ mode: 'open' });
            root.innerHTML = '<style>' + KIT_TOKENS + themed(PANEL_CSS) + HUB_PANEL_CSS + '</style>' + panelHtml();
            (hubPane || hubTab('tts', 'TTS Reader', 10, '{{VERSION}}')).appendChild(hostEl);
            S.host = hostEl; S.root = root;

            var $ = function (id) { return root.getElementById(id); };
            // Bản thiết kế 00_Layout: "Câu trước / Câu sau" là nút màu phụ chỉ ở Lofter; các trang khác là nút xám.
            if (kitSite() !== 'lofter') ['prev', 'next'].forEach(function (id) { var b = $(id); if (b) b.className = 'b'; });
            var ui = S.ui = {};
            ['panel', 'head', 'tag', 'sub', 'help', 'hide', 'close', 'sPos', 'sSeg', 'sPct', 'bar', 'st',
             'play', 'pause', 'stop', 'nextCh', 'prev', 'next', 'posIn', 'pickS',
             'trMode', 'trEn', 'trZh', 'trJa', 'trNow', 'trUndo', 'trOrig',
             'voice', 'sleepMin', 'sleepBtn', 'sleepInfo',
             'rate', 'rateT', 'pitch', 'pitchT', 'vol', 'volT', 'maxc', 'gap',
             'replOn', 'replOpen', 'replInfo', 'pickC', 'pickN', 'rescan', 'clearRule', 'meta',
             'ckNext', 'ckTitle', 'ckScroll', 'ckAuto', 'ckWord', 'ckHide',
             'replModal', 'replOn2', 'replList', 'replAdd', 'replClear', 'replBulk', 'replImport', 'replExport', 'replSave',
             'helpModal', 'helpBody'].forEach(function (id) { ui[id] = $(id); });
            syncInsets();

            // Mọi thao tác trong bảng = "đang dùng" → hoãn tự thu gọn
            root.addEventListener('pointerdown', function () { S.lastUiAt = Date.now(); }, true);
            root.addEventListener('input', function () { S.lastUiAt = Date.now(); }, true);

            ui.play.addEventListener('click', play);
            ui.pause.addEventListener('click', function () { (S.reading && S.paused) ? play() : pause(); });
            ui.stop.addEventListener('click', stop);
            ui.nextCh.addEventListener('click', function () { goNextChapter(S.reading); });
            ui.prev.addEventListener('click', function () { jump(-1); });
            ui.next.addEventListener('click', function () { jump(1); });
            ui.pickS.addEventListener('click', function () { startPick('start'); });
            ui.posIn.addEventListener('change', function () {
                if (!S.segs.length) rescan();
                var bi = clamp(ui.posIn.value, 1, Math.max(1, S.blocks.length), 1) - 1;
                goTo(firstSegOfBlock(bi));
            });

            if (ui.trJa) {
                ui.trJa.checked = !!cfg.trJa;
                ui.trJa.addEventListener('change', function () { cfg.trJa = ui.trJa.checked; saveCfg(); });
            }
            if (ui.trMode) {
                ui.trMode.value = cfg.trMode;
                ui.trMode.addEventListener('change', function () { cfg.trMode = ui.trMode.value; saveCfg(); status(readyMsg()); ttsAnnounce(); });
                // Trang chỉ có Trung → Việt và TM Translate đang bật: thiết lập này đã có ở tab Translated
                // của bảng chung, ẩn thẻ ở đây cho khỏi trùng.
                var trModes = (SITE.tr && SITE.tr.modes) || [];
                if (trModes.indexOf('en') < 0 && trModes.indexOf('auto') < 0) {
                    tmPing(1500).then(function (ver) {
                        var card = root.getElementById('trCard');
                        if (ver && card) card.classList.add('hidden');
                    });
                }
            }
            if (ui.trEn) { ui.trEn.value = cfg.trEngineEn; ui.trEn.addEventListener('change', function () { cfg.trEngineEn = ui.trEn.value; saveCfg(); }); }
            if (ui.trZh) { ui.trZh.value = cfg.trEngineZh; ui.trZh.addEventListener('change', function () { cfg.trEngineZh = ui.trZh.value; saveCfg(); }); }
            if (ui.trOrig) {
                ui.trOrig.checked = !!cfg.trShowOrig;
                ui.trOrig.addEventListener('change', function () { cfg.trShowOrig = ui.trOrig.checked; saveCfg(); injectPageStyle(); });
            }
            if (ui.trNow) ui.trNow.addEventListener('click', function () {
                if (S.reading) { status('Dừng đọc trước rồi hãy dịch.'); return; }
                rescan();
                if (!wantLang()) { status(cfg.trMode === 'off' ? 'Đang để "Không dịch".' : 'Trang này không cần dịch (đã là tiếng Việt hoặc không nhận ra ngôn ngữ).'); return; }
                if (isTranslated()) { status('Trang đã dịch rồi. Bấm "Bỏ bản dịch" nếu muốn dịch lại.'); return; }
                ui.trNow.disabled = true;
                translatePage(true).then(function (ok) {
                    rescan(); S.lang = detectLang(sampleText()) || S.lang;
                    status(ok ? 'Đã dịch · ' + S.segs.length + ' câu' : 'Không có gì để dịch');
                }).catch(function (e) { report('Dịch lỗi', e); }).then(function () { ui.trNow.disabled = false; });
            });
            if (ui.trUndo) ui.trUndo.addEventListener('click', function () {
                if (S.reading) stop();
                undoTranslation(); rescan(); S.lang = detectLang(sampleText()) || SITE.lang || '';
                status('Đã bỏ bản dịch.');
            });

            ui.voice.addEventListener('change', function () {
                cfg.voiceURI = ui.voice.value; saveCfg();
                if (S.reading && !S.paused) speak(S.idx);
            });

            ui.sleepMin.value = cfg.sleepMinutes;
            ui.sleepMin.addEventListener('change', function () { cfg.sleepMinutes = clamp(ui.sleepMin.value, 1, 600, 30); ui.sleepMin.value = cfg.sleepMinutes; saveCfg(); });
            ui.sleepBtn.addEventListener('click', toggleSleep);

            bindPair(ui.rate, ui.rateT, 'rate', 0.5, 4);
            bindPair(ui.pitch, ui.pitchT, 'pitch', 0, 2);
            bindPair(ui.vol, ui.volT, 'volume', 0, 1);
            bindNum(ui.maxc, 'maxChars', 60, 600, function () { rescan({ keepPos: true }); });
            bindNum(ui.gap, 'segmentDelayMs', 0, 5000, null);

            bindCk(ui.replOn, 'replaceEnabled', renderRules);
            ui.replOpen.addEventListener('click', openRules);
            ui.pickC.addEventListener('click', function () { startPick('content'); });
            ui.pickN.addEventListener('click', function () { startPick('next'); });
            ui.rescan.addEventListener('click', function () {
                try { rescan({ keepPos: true }); } catch (e) { report('Lỗi khi quét trang', e); return; }
                flashApplied();
                status(S.warn.length ? ('⚠ ' + S.warn[0]) : ('Đã quét lại: ' + S.segs.length + ' câu'));
            });
            ui.clearRule.addEventListener('click', function () {
                delete sites[HOST]; saveSites(); rescan({ keepPos: true });
                status('Đã xóa rule tự chọn — dùng lại selector của ' + SITE.name);
            });

            bindCk(ui.ckNext, 'autoNext', null);
            bindCk(ui.ckTitle, 'includeTitle', function () { rescan({ keepPos: true }); });
            bindCk(ui.ckScroll, 'autoScroll', null);
            bindCk(ui.ckAuto, 'autoStartNext', null);
            bindCk(ui.ckWord, 'highlightWords', function () { if (!cfg.highlightWords && canHL) { try { CSS.highlights.delete(HL_WORD); } catch (e) {} } });
            bindCk(ui.ckHide, 'autoHide', null);
            if (!canHL) { ui.ckWord.disabled = true; ui.ckWord.parentElement.title = 'Trình duyệt không hỗ trợ CSS Highlight API'; }

            ui.help.addEventListener('click', function () { ui.helpBody.innerHTML = helpText(); ui.helpModal.classList.remove('hidden'); });
            ui.hide.addEventListener('click', hidePanel);
            ui.close.addEventListener('click', function () { stop(); hidePanel(); });

            // Modal thay thế
            root.addEventListener('click', function (e) {
                var c = e.target.closest && e.target.closest('[data-close]');
                if (!c) return;
                var which = c.getAttribute('data-close');
                (which === 'repl' ? ui.replModal : ui.helpModal).classList.add('hidden');
            });
            ui.replAdd.addEventListener('click', function () { addRuleRow({ from: '', to: '', re: false }, true); });
            ui.replClear.addEventListener('click', function () { if (confirm('Xóa hết quy tắc trong danh sách? (chưa lưu thì bấm Hủy để giữ lại)')) ui.replList.innerHTML = ''; });
            ui.replImport.addEventListener('click', function () {
                try {
                    var list = parseBulk(ui.replBulk.value);
                    list.forEach(function (r) { addRuleRow(r, false); });
                    status('Đã thêm ' + list.length + ' quy tắc vào danh sách — bấm Lưu để giữ.');
                } catch (e) { report('Nhập lỗi', e); }
            });
            ui.replExport.addEventListener('click', function () { ui.replBulk.value = rulesToText(readRuleRows()); });
            ui.replSave.addEventListener('click', function () {
                cfg.rules = readRuleRows();
                cfg.replaceEnabled = ui.replOn2.checked;
                saveCfg(); renderRules();
                ui.replModal.classList.add('hidden');
                if (S.reading && !S.paused) speak(S.idx);
            });

            if (typeof SITE.bindExtra === 'function') {
                try {
                    SITE.bindExtra({
                        $: $, cfg: cfg, save: saveCfg, status: status,
                        rescan: function () { rescan({ keepPos: true }); status(readyMsg()); }
                    });
                } catch (e) { report('Cài đặt riêng của ' + SITE.name + ' lỗi', e); }
            }

            // (bảng nằm trong bảng chung nên không còn kéo riêng — xem HUB_PANEL_CSS)
            if (!IS_TOUCH && cfg.pos && cfg.pos.left != null) {
                ui.panel.style.left = Math.min(cfg.pos.left, window.innerWidth - 80) + 'px';
                ui.panel.style.top = Math.min(cfg.pos.top, window.innerHeight - 50) + 'px';
                ui.panel.style.right = 'auto'; ui.panel.style.bottom = 'auto';
            }

            ui.maxc.value = cfg.maxChars; ui.gap.value = cfg.segmentDelayMs;
            ui.ckNext.checked = !!cfg.autoNext; ui.ckTitle.checked = !!cfg.includeTitle;
            ui.ckScroll.checked = !!cfg.autoScroll; ui.ckAuto.checked = !!cfg.autoStartNext;
            ui.ckWord.checked = !!cfg.highlightWords; ui.ckHide.checked = !!cfg.autoHide;

            fillVoices();
            try { speechSynthesis.addEventListener('voiceschanged', fillVoices); } catch (e) { speechSynthesis.onvoiceschanged = fillVoices; }
            renderRules(); renderSleep(); renderState();
        }

        function bindPair(range, num, key, lo, hi) {
            var set = function (v, save) {
                v = clamp(v, lo, hi, DEFAULTS[key]);
                cfg[key] = v; range.value = v; num.value = v.toFixed(2);
                if (save) { saveCfg(); if (S.reading && !S.paused) speak(S.idx); }
            };
            set(cfg[key], false);
            range.addEventListener('input', function () { cfg[key] = Number(range.value); num.value = Number(range.value).toFixed(2); });
            range.addEventListener('change', function () { set(range.value, true); });
            num.addEventListener('change', function () { set(num.value, true); });
        }
        function bindNum(el, key, lo, hi, after) {
            el.addEventListener('change', function () {
                cfg[key] = clamp(el.value, lo, hi, DEFAULTS[key]);
                el.value = cfg[key]; saveCfg(); if (after) after();
            });
        }
        function bindCk(el, key, after) {
            el.checked = !!cfg[key];
            el.addEventListener('change', function () { cfg[key] = el.checked; saveCfg(); if (after) after(); });
        }

        function makeDraggable(handle, box) {
            if (IS_TOUCH) return;
            var sx = 0, sy = 0, ox = 0, oy = 0, on = false;
            handle.addEventListener('pointerdown', function (e) {
                if (e.button !== 0 || (e.target.closest && e.target.closest('button'))) return;
                var r = box.getBoundingClientRect();
                on = true; sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
                try { handle.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            handle.addEventListener('pointermove', function (e) {
                if (!on) return;
                box.style.left = Math.max(0, Math.min(window.innerWidth - 60, ox + e.clientX - sx)) + 'px';
                box.style.top = Math.max(0, Math.min(window.innerHeight - 40, oy + e.clientY - sy)) + 'px';
                box.style.right = 'auto'; box.style.bottom = 'auto';
            });
            var end = function () {
                if (!on) return;
                on = false;
                var r = box.getBoundingClientRect();
                cfg.pos = { left: Math.round(r.left), top: Math.round(r.top) }; saveCfg();
            };
            handle.addEventListener('pointerup', end);
            handle.addEventListener('pointercancel', end);
        }

        function fillVoices() {
            loadVoices();
            var ui = S.ui; if (!ui || !ui.voice) return;
            ui.voice.innerHTML = '';
            var auto = document.createElement('option');
            auto.value = '';
            var cur = pickVoiceAutoName();
            auto.textContent = 'Tự chọn theo ngôn ngữ' + (cur ? ' (' + cur + ')' : '');
            ui.voice.appendChild(auto);
            if (!S.voices.length) {
                var o = document.createElement('option');
                o.disabled = true; o.textContent = 'Chưa nạp được giọng — bấm Play một lần';
                ui.voice.appendChild(o); return;
            }
            var order = { vi: 0, en: 1, zh: 2 };
            var key = function (v) { for (var k in LANG_RE) if (LANG_RE[k].test(v.lang)) return order[k]; return 3; };
            S.voices.slice().sort(function (a, b) { return key(a) - key(b) || a.name.localeCompare(b.name); }).forEach(function (v) {
                var o = document.createElement('option');
                o.value = v.voiceURI;
                o.textContent = v.name + '  [' + v.lang + ']';
                ui.voice.appendChild(o);
            });
            ui.voice.value = cfg.voiceURI || '';
            if (ui.voice.value !== (cfg.voiceURI || '')) ui.voice.value = '';
        }
        function pickVoiceAutoName() {
            var keep = cfg.voiceURI; cfg.voiceURI = '';
            var v = pickVoice(); cfg.voiceURI = keep;
            return v ? v.name.replace(/^Microsoft\s+/i, '').replace(/\s+Online.*$/i, '') : '';
        }

        function status(msg) {
            if (S.ui && S.ui.st) S.ui.st.textContent = msg;
            S.lastStatus = msg;
            renderMini();
        }

        function renderState() {
            renderMini();
            var ui = S.ui; if (!ui || !ui.play) return;
            var playing = S.reading && !S.paused && !S.blocked;
            ui.play.disabled = playing || S.preparing;
            ui.play.textContent = S.preparing ? 'Đang chuẩn bị…' : 'Play';
            ui.pause.textContent = (S.reading && S.paused) ? 'Tiếp tục' : 'Pause';
            ui.pause.disabled = !S.reading;
            ui.nextCh.disabled = !S.nextUrl;
            ui.tag.textContent = S.pick ? 'đang chọn' : S.preparing ? (TR.busy ? 'đang dịch' : 'chuẩn bị')
                : S.blocked ? 'chờ bấm' : (S.reading ? (S.paused ? 'tạm dừng' : 'đang đọc') : 'nghỉ');
            ui.tag.classList.toggle('wait', S.blocked || S.preparing);
            ui.pickS.textContent = S.pick === 'start' ? 'Hủy chọn' : 'Chọn vị trí';
            ui.pickC.textContent = S.pick === 'content' ? 'Hủy chọn' : 'Chọn vùng đọc';
            ui.pickN.textContent = S.pick === 'next' ? 'Hủy chọn' : 'Chọn link chương sau';
        }

        function renderProgress() {
            renderMini();
            var ui = S.ui; if (!ui || !ui.bar) return;
            var n = S.segs.length;
            var pct = n ? ((S.idx + 1) / n) * 100 : 0;
            var seg = S.segs[S.idx];
            ui.bar.style.width = pct.toFixed(1) + '%';
            ui.sPct.textContent = Math.round(pct) + '%';
            ui.sSeg.textContent = (n ? S.idx + 1 : 0) + '/' + n;
            ui.sPos.textContent = 'Đoạn ' + (seg ? seg.bi + 1 : 1) + '/' + S.blocks.length;
            if (seg && ui.posIn && ui.posIn !== (S.root && S.root.activeElement)) ui.posIn.value = seg.bi + 1;
        }

        function renderMeta() {
            var ui = S.ui; if (!ui || !ui.meta) return;
            ui.sub.textContent = S.title || SITE.name;
            ui.sub.title = S.title || '';
            ui.nextCh.disabled = !S.nextUrl;
            ui.meta.textContent = [
                SITE.name + ' · ' + S.segs.length + ' câu / ' + S.blocks.length + ' đoạn',
                'Vùng đọc: ' + (S.src.content || '—'),
                'Chương sau: ' + (S.nextUrl ? S.src.next : ('không thấy' + (S.src.next ? ' (' + S.src.next + ')' : '')))
            ].concat(S.warn.map(function (w) { return '⚠ ' + w; })).join('\n');
            renderMini();
        }

        function renderRules() {
            var ui = S.ui; if (!ui || !ui.replInfo) return;
            var n = (cfg.rules || []).length;
            ui.replOn.checked = !!cfg.replaceEnabled;
            ui.replInfo.textContent = n ? (n + ' quy tắc · ' + (cfg.replaceEnabled ? 'đang bật' : 'đang tắt')) : 'Chưa có quy tắc nào.';
        }

        function addRuleRow(r, focus) {
            var ui = S.ui;
            var row = document.createElement('div');
            row.className = 'rr';
            row.innerHTML = '<input type="text" class="f" placeholder="Từ / cụm từ"><input type="text" class="t" placeholder="Đọc thành (trống = bỏ)">' +
                '<label title="Biểu thức chính quy, không phân biệt hoa thường"><input type="checkbox" class="x"> regex</label>' +
                '<button class="b dan" title="Xóa dòng">✕</button>';
            row.querySelector('.f').value = r.from || '';
            row.querySelector('.t').value = r.to || '';
            row.querySelector('.x').checked = !!r.re;
            row.querySelector('button').addEventListener('click', function () { row.remove(); });
            ui.replList.appendChild(row);
            if (focus) row.querySelector('.f').focus();
        }
        function readRuleRows() {
            return normRules(Array.prototype.map.call(S.ui.replList.querySelectorAll('.rr'), function (row) {
                return { from: row.querySelector('.f').value, to: row.querySelector('.t').value, re: row.querySelector('.x').checked };
            }));
        }
        function openRules() {
            var ui = S.ui;
            ui.replList.innerHTML = '';
            (cfg.rules || []).forEach(function (r) { addRuleRow(r, false); });
            if (!(cfg.rules || []).length) addRuleRow({ from: '', to: '', re: false }, false);
            ui.replOn2.checked = !!cfg.replaceEnabled;
            ui.replBulk.value = '';
            ui.replModal.classList.remove('hidden');
        }

        function renderSleep() {
            var left = S.sleepAt ? S.sleepAt - Date.now() : 0;
            var ui = S.ui;
            if (ui && ui.sleepBtn) {
                ui.sleepBtn.textContent = S.sleepAt ? 'Tắt hẹn giờ' : 'Bật hẹn giờ';
                ui.sleepBtn.className = 'b ' + (S.sleepAt ? 'dan' : 'sec');
                ui.sleepInfo.textContent = S.sleepAt
                    ? 'Còn ' + fmtClock(left) + ' — dừng lúc ' + new Date(S.sleepAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + '.'
                    : 'Tắt đọc sau số phút đã chọn, giảm âm dần 12 giây cuối.';
            }
            renderMini();
        }

        function hidePanel() {
            if (!S.host) return;
            S.panelHidden = true;
            if (hubActive() === 'tts') hubHide();
            renderMini();
        }
        function showPanel() {
            if (!S.booted) { boot(false); return; }
            S.panelHidden = false;
            S.lastUiAt = Date.now();
            hubShow('tts');
            renderMini();
        }
        function togglePanel() { if (!S.booted || S.panelHidden) showPanel(); else hidePanel(); }

        /* =====================================================================
         * 16. Mini-player (thay cho nút nổi) — hiện khi bảng đang ẩn
         * =================================================================== */

        // Mini-player theo bản thiết kế 00_Layout: thẻ bo tròn nằm bên trái cột nút tròn — đĩa than
        // (bìa truyện nếu tìm được) · tên + phần trăm · thanh tiến độ · đọc / câu sau.
        var MINI_CSS = TOKENS + [
            '.mini{display:flex;align-items:center;gap:11px;padding:9px 13px 9px 9px;width:200px;max-width:calc(100vw - 80px);',
            'background:var(--k-win);border:1px solid var(--k-edge);border-radius:14px;box-shadow:0 10px 26px var(--k-shadow);',
            'color:var(--k-text);font-size:12px;user-select:none;touch-action:none;cursor:grab;}',
            '.disc{flex:none;width:50px;height:50px;border-radius:50%;border:0;padding:0;cursor:pointer;overflow:hidden;display:grid;place-items:center;',
            'background:repeating-radial-gradient(circle,#15191b 0 2px,#0b0d0e 2px 4px);box-shadow:0 0 0 1.5px var(--k-edge),0 3px 8px rgba(0,0,0,.35);position:relative;}',
            '.disc .lbl{width:20px;height:20px;border-radius:50%;background:var(--k-teal);display:grid;place-items:center;}',
            '.disc .lbl::after{content:"";width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 0 1.5px #0b0d0e;}',
            '.disc img{width:38px;height:38px;border-radius:50%;object-fit:cover;display:block;}',
            '.mini.on .disc{animation:spin 6s linear infinite;}',
            '@keyframes spin{to{transform:rotate(360deg);}}',
            '.mini.wait .disc{box-shadow:0 0 0 2px var(--k-accent),0 3px 8px rgba(0,0,0,.35);}',
            '.mc{flex:1;min-width:0;display:grid;gap:5px;cursor:pointer;}',
            '.mh{display:flex;align-items:baseline;gap:8px;min-width:0;}',
            '.mt{flex:1;min-width:0;font-weight:800;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
            '.mpct{flex:none;font-weight:800;font-size:12.5px;color:var(--k-accent);}',
            '.mb{height:3px;border-radius:9px;background:var(--k-soft);overflow:hidden;}',
            '.mb>i{display:block;height:100%;width:0;background:var(--k-teal);}',
            '.mk{display:flex;align-items:center;gap:7px;min-width:0;}',
            '.ms{flex:1;min-width:0;color:var(--k-muted);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
            '.ctl{flex:none;width:21px;height:21px;border-radius:50%;border:1.5px solid var(--k-text);background:transparent;padding:0;',
            'color:var(--k-text);cursor:pointer;font-size:8px;line-height:1;display:grid;place-items:center;}',
            '.ctl:hover{filter:brightness(1.15);}',
            '.ctl.pp{background:var(--k-teal);color:var(--k-on);border-color:transparent;}',
            '@media (pointer:coarse){.mini{width:min(260px,calc(100vw - 80px));}.disc{width:54px;height:54px;}',
            '.ctl{width:30px;height:30px;font-size:11px;}.mt{font-size:15px;}}'
        ].join('');

        var DISC_LABEL = '<span class="lbl"></span>';   // nhãn giữa đĩa than khi không có bìa

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

        var hubPane = null;
        document.addEventListener('aurel-hub:change', function (ev) {
            var on = ev.detail === 'tts';
            // Bấm thẳng vào tab khi bảng chưa dựng → dựng ngay.
            if (on && !S.booted) { boot(false); return; }
            if (!S.booted) return;
            S.panelHidden = !on;
            if (on) S.lastUiAt = Date.now();
            renderMini();
        });

        // Nút "?" và "✕" trên bảng chung, khi tab đang mở là tab này.
        document.addEventListener('aurel-hub:help', function (ev) {
            if (ev.detail === 'tts' && S.booted && S.ui.help) S.ui.help.click();
        });
        document.addEventListener('aurel-hub:close', function (ev) {
            if (ev.detail === 'tts' && S.booted) stop();
        });

        /* "Dịch trước khi đọc" là thiết lập của TTS Reader, nhưng theo bản thiết kế chung nó nằm ở
         * tab Translated (của TM Translate). Hai script không gọi hàm của nhau được, nên trao đổi
         * qua sự kiện trên document, detail là chuỗi JSON:
         *   'aurel-tts:get'    ai đó hỏi       → trả lời bằng 'aurel-tts:state'
         *   'aurel-tts:state'  { trMode, modes, engineZh }   trạng thái hiện tại
         *   'aurel-tts:set'    { trMode } và/hoặc { engineZh }   đổi thiết lập (chỉ nhận giá trị trang này có) */
        function ttsAnnounce() {
            var modes = (SITE.tr && SITE.tr.modes) || [];
            document.dispatchEvent(new CustomEvent('aurel-tts:state', {
                detail: JSON.stringify({ trMode: cfg.trMode || 'off', modes: modes, engineZh: cfg.trEngineZh || 'tm' })
            }));
        }
        document.addEventListener('aurel-tts:get', ttsAnnounce);
        document.addEventListener('aurel-tts:set', function (ev) {
            var req;
            try { req = JSON.parse(ev.detail); } catch (e) { return; }
            var modes = (SITE.tr && SITE.tr.modes) || [];
            if (!req) return;
            var changed = false;
            if (modes.indexOf(req.trMode) >= 0 && req.trMode !== cfg.trMode) {
                cfg.trMode = req.trMode; changed = true;
                if (S.ui && S.ui.trMode) S.ui.trMode.value = cfg.trMode;
            }
            if ((req.engineZh === 'tm' || req.engineZh === 'google') && req.engineZh !== cfg.trEngineZh) {
                cfg.trEngineZh = req.engineZh; changed = true;
                if (S.ui && S.ui.trZh) S.ui.trZh.value = cfg.trEngineZh;
            }
            if (!changed) return;
            saveCfg();
            if (S.booted) status(readyMsg());
            ttsAnnounce();
        });

        // Mini-player chỉ hiện khi đã có phiên đọc (đã mở bảng hoặc đã bấm đọc) và bảng đang thu.
        function miniShow(on) {
            if (!S.mini) return;
            var shown = !!(on && S.booted);
            S.mini.style.display = shown ? '' : 'none';
            // Mini-player thay chỗ nút tròn của TTS trên cột (bản thiết kế: lúc đang đọc chỉ còn nút của script khác).
            if (S.pill) S.pill.host.style.display = (shown || S.offPage) ? 'none' : '';
            if (S.pill) S.pill.pill.classList.toggle('on', !!(S.reading && !S.paused && !S.blocked));
        }

        function buildMini() {
            if (S.mini) return;
            var h = document.createElement('div');
            h.className = 'ttsr-ui';
            h.style.cssText = 'all:initial;';
            var r = h.attachShadow({ mode: 'open' });
            r.innerHTML = '<style>' + KIT_TOKENS + themed(MINI_CSS) + '</style>' +
                '<div class="mini" id="mini" title="TTS Reader — ' + escHtml(SITE.name) + ' · kéo để dời chỗ">' +
                ' <button class="disc" id="disc" title="Mở bảng TTS Reader">' + DISC_LABEL + '</button>' +
                ' <div class="mc" id="mc"><div class="mh"><span class="mt" id="mt">TTS Reader</span><span class="mpct" id="mpct"></span></div>' +
                '  <div class="mb"><i id="mbar"></i></div>' +
                '  <div class="mk"><button class="ctl pp" id="mpp" title="Đọc / tạm dừng">▶</button>' +
                '  <button class="ctl" id="mnx" title="Câu sau">⏭</button>' +
                '  <span class="ms"><span id="mp"></span> <span id="mtm"></span></span></div></div>' +
                '</div>';
            var slot = dockSlot('tts', 30);
            // Vòng tròn = đọc / tạm dừng ngay; chữ = mở tab. Mini-player (thẻ bên trên) chỉ hiện khi
            // đã có phiên đọc.
            S.pill = dockPill(slot, 'tts', 'TTS Reader', function () {
                if (!S.booted) { boot(true); return; }
                (S.reading && !S.paused && !S.blocked) ? pause() : play();
            }, function () { showPanel(); });
            S.pill.ic.title = 'Đọc / tạm dừng';
            S.pill.tx.title = 'Mở bảng TTS Reader';
            dockSide().appendChild(h);
            hubPane = hubTab('tts', 'TTS Reader', 10, '{{VERSION}}');
            S.mini = h;
            var $ = function (id) { return r.getElementById(id); };
            var m = S.miniUi = { box: $('mini'), disc: $('disc'), mc: $('mc'), mt: $('mt'), mp: $('mp'), mtm: $('mtm'), bar: $('mbar'), pp: $('mpp'), nx: $('mnx'), pct: $('mpct') };
            syncInsets();
            if (cfg.dockPos && cfg.dockPos.right != null) placeDock(cfg.dockPos.right, cfg.dockPos.bottom);

            m.pp.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!S.booted) { boot(true); return; }
                (S.reading && !S.paused && !S.blocked) ? pause() : play();
            });
            m.nx.addEventListener('click', function (e) { e.stopPropagation(); if (S.segs.length) jump(1); });

            // Kéo để dời CẢ thanh nút chung (nút của script khác đi theo); bấm (không kéo) vào
            // đĩa/tiêu đề = mở bảng.
            var down = null, moved = false;
            m.box.addEventListener('pointerdown', function (e) {
                if (e.button !== 0 || (e.target.closest && e.target.closest('.ctl'))) return;
                var rc = document.getElementById('aurel-dock').getBoundingClientRect();
                down = { x: e.clientX, y: e.clientY, r: window.innerWidth - rc.right, b: window.innerHeight - rc.bottom }; moved = false;
                try { m.box.setPointerCapture(e.pointerId); } catch (err) {}
            });
            m.box.addEventListener('pointermove', function (e) {
                if (!down) return;
                if (!moved && Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y) < 6) return;
                moved = true;
                placeDock(down.r - (e.clientX - down.x), down.b - (e.clientY - down.y));
            });
            m.box.addEventListener('pointerup', function () {
                if (!down) return;
                down = null;
                if (moved) {
                    var rc = document.getElementById('aurel-dock').getBoundingClientRect();
                    cfg.dockPos = { right: Math.round(window.innerWidth - rc.right), bottom: Math.round(window.innerHeight - rc.bottom) }; saveCfg();
                    return;
                }
                togglePanel();
            });
            m.box.addEventListener('pointercancel', function () { down = null; });
            renderMini();
        }

        // Neo theo góc phải dưới (không phải left/top) để ngăn của script khác hiện thêm thì
        // thanh mọc lên trên, không tràn xuống dưới mép màn hình.
        function placeDock(right, bottom) {
            var d = document.getElementById('aurel-dock'); if (!d) return;
            var w = d.offsetWidth || 290, hgt = d.offsetHeight || 52;
            right = Math.max(4, Math.min(window.innerWidth - w - 4, Number(right) || 0));
            bottom = Math.max(4, Math.min(window.innerHeight - hgt - 4 - bottomInset(), Number(bottom) || 0));
            d.style.right = right + 'px'; d.style.bottom = bottom + 'px';
        }

        var coverShown = '';
        function renderMini() {
            var m = S.miniUi; if (!m || !m.box) return;
            miniShow(!(S.booted && !S.panelHidden));
            var playing = S.reading && !S.paused && !S.blocked;
            m.box.classList.toggle('on', playing);
            m.box.classList.toggle('wait', S.blocked || S.preparing);
            m.pp.textContent = playing ? 'Ⅱ' : '▶';
            m.pp.title = playing ? 'Tạm dừng' : 'Đọc';
            m.mt.textContent = S.title || document.title || 'TTS Reader';
            var n = S.segs.length, pct = n ? ((S.idx + 1) / n) * 100 : 0;
            m.bar.style.width = pct.toFixed(1) + '%';
            m.pct.textContent = n ? Math.round(pct) + '%' : '';
            m.mp.textContent = S.preparing ? (S.lastStatus || 'Đang chuẩn bị…')
                : S.blocked ? 'Chạm vào trang để đọc tiếp'
                : n ? (S.idx + 1) + '/' + n : SITE.name;
            m.mtm.textContent = S.sleepAt ? '⏾ ' + fmtClock(S.sleepAt - Date.now()) : '';
            var cover = findCover();
            if (cover !== coverShown) {
                coverShown = cover;
                m.disc.innerHTML = cover ? '<img alt="" referrerpolicy="no-referrer">' : DISC_LABEL;
                if (cover) {
                    var img = m.disc.querySelector('img');
                    img.onerror = function () { m.disc.innerHTML = DISC_LABEL; };
                    img.src = cover;
                }
            }
        }

        /* =====================================================================
         * 17. Khởi động
         * =================================================================== */

        function boot(autoplay) {
            if (S.booted) { showPanel(); if (autoplay) play(); return; }
            try { buildUI(); }
            catch (e) {
                if (S.host && S.host.parentNode) S.host.parentNode.removeChild(S.host);
                S.host = null; S.ui = {};
                report('Không dựng được bảng TTS Reader', e);
                return;
            }
            S.booted = true;
            S.panelHidden = !!autoplay;          // tự đọc chương mới: để mini-player, không bung bảng che chữ
            if (!autoplay && hubActive() !== 'tts') hubShow('tts');
            S.lastUiAt = Date.now();
            renderMini();
            status('Đang chờ nội dung trang…');
            waitForContent(function () {
                if (!S.booted) return;
                try { rescan(); } catch (e) { report('Lỗi khi quét trang', e); return; }
                S.lang = detectLang(sampleText()) || SITE.lang || '';
                fillVoices();
                if (!autoplay) flashApplied();
                // Đang tự đọc nối chương mà gặp chương không có chữ → đi tiếp luôn. Có trần để một
                // blog toàn ảnh không kéo script chạy mãi qua hàng trăm bài.
                var why = autoplay ? skipReason() : '';
                if (why && S.nextUrl) {
                    var skipped = 0;
                    try { skipped = parseInt(sessionStorage.getItem(SKIP_KEY), 10) || 0; } catch (e) {}
                    if (skipped < SKIP_MAX) {
                        try { sessionStorage.setItem(SKIP_KEY, String(skipped + 1)); } catch (e) {}
                        status('Bỏ qua chương này: ' + why);
                        goNextChapter(true);
                        return;
                    }
                    status('Đã bỏ qua ' + SKIP_MAX + ' chương liền không có chữ — dừng lại ở đây.');
                    try { sessionStorage.removeItem(SKIP_KEY); } catch (e) {}
                    return;
                }
                try { sessionStorage.removeItem(SKIP_KEY); } catch (e) {}
                status(why ? ('Chương này không có chữ để đọc: ' + why) : readyMsg());
                if (autoplay && S.segs.length && !why) setTimeout(play, 350);
            });
        }

        function onChapterPage() {
            try { return typeof SITE.isChapter === 'function' ? !!SITE.isChapter() : true; } catch (e) { return true; }
        }

        var wantAuto = false;
        try { if (sessionStorage.getItem(AUTO_KEY) === '1') { sessionStorage.removeItem(AUTO_KEY); wantAuto = true; } } catch (e) {}

        // Việc riêng của trang cần chạy ngay khi tải, trước khi mở bảng (vd. chế độ đọc Wattpad).
        if (typeof SITE.init === 'function') {
            try { SITE.init({ cfg: cfg, save: saveCfg }); } catch (e) { report('Khởi động riêng của ' + SITE.name + ' lỗi', e); }
        }

        if (onChapterPage()) {
            buildMini();
            if (wantAuto) boot(true);
        }

        if (typeof GM_registerMenuCommand === 'function') {
            GM_registerMenuCommand('▶  Mở TTS Reader', function () { buildMini(); boot(false); });
            GM_registerMenuCommand('⏯  Đọc / tạm dừng', function () {
                buildMini();
                if (!S.booted) boot(true); else (S.reading && !S.paused && !S.blocked) ? pause() : play();
            });
        }

        window.addEventListener('keydown', function (e) {
            if (S.pick && e.key === 'Escape') { e.preventDefault(); endPick(); status('Đã hủy chọn'); return; }
            if (e.ctrlKey || e.metaKey || !e.altKey) return;
            var t = e.target;
            if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
            if (e.code === 'KeyR') { e.preventDefault(); buildMini(); togglePanel(); }
            else if (e.code === 'Space') {
                e.preventDefault(); buildMini();
                if (!S.booted) boot(true); else (S.reading && !S.paused && !S.blocked) ? pause() : play();
            }
        }, true);

        // Site kiểu SPA (Wattpad, STV) đổi chương không tải lại trang → phát hiện đổi URL.
        var lastHref = location.href;
        setInterval(function () {
            if (location.href === lastHref) return;
            lastHref = location.href;
            var was = S.reading;
            if (S.reading || S.preparing) stop();
            S.prepared = false; S.prepWarn = []; S.warn = []; S.segs = []; S.blocks = []; S.idx = 0;
            S.offPage = !onChapterPage();
            if (S.offPage) { miniShow(false); return; }
            if (S.pill) S.pill.host.style.display = '';
            buildMini();
            if (S.booted) waitForContent(function () {
                try { rescan(); } catch (e) {}
                status(readyMsg());
                if (was && cfg.autoStartNext) play();
            });
        }, 1000);

})();
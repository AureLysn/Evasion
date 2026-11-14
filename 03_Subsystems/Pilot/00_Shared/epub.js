// <aurel-epub>
/* =============================================================================
 * AUREL EPUB — dựng file EPUB 3 ngay trong trình duyệt, không cần thư viện.
 *
 * Bản gốc: userscripts/shared/epub.js. Khối này được CHÉP NGUYÊN vào từng script
 * (giữa hai dòng đánh dấu aurel-epub) bằng:   node userscripts/shared/sync.js
 * Đừng sửa bản chép — sửa bản gốc rồi chạy lại lệnh trên.
 *
 * Tự viết ZIP (chế độ STORE, không nén) thay vì dùng JSZip: generateAsync của JSZip
 * treo trong sandbox Tampermonkey trên Chrome (đo khi làm trình tải Lofter). Ảnh và
 * EPUB vốn đã nén, chữ thì nhỏ — không nén cũng chỉ nặng hơn chút ít.
 *
 *   epubBuild({
 *     title, author, lang: 'en', id, description, subjects: [..], source: url,
 *     info: [[nhãn, giá trị], ..],            // bảng thông tin trên trang bìa chữ
 *     cover: { data: Uint8Array, type: 'image/jpeg' } | null,
 *     chapters: [{ title, html }],           // html = phần thân chương (thẻ HTML thường)
 *     images: [{ name: 'img001.jpg', data: Uint8Array, type }]   // html trỏ tới "../images/<name>"
 *   }) → Blob (application/epub+zip)
 *
 *   epubXhtml(htmlString) → chuỗi XHTML hợp lệ (bỏ script/style/iframe/form, đóng thẻ đúng chuẩn)
 *   epubSave(blob, filename) · epubFileName(text) → tên file an toàn trên Windows
 * ========================================================================== */
var EPUB_CRC = (function () {
    var t = new Uint32Array(256), c, n, k;
    for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
})();
function epubCrc32(u8) {
    var c = 0xffffffff;
    for (var i = 0; i < u8.length; i++) c = EPUB_CRC[(c ^ u8[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
}
function epubBytes(s) { return typeof s === 'string' ? new TextEncoder().encode(s) : s; }
// ZIP không nén. files: [{ name, data: chuỗi | Uint8Array }] — giữ nguyên thứ tự (mimetype phải đứng đầu).
function epubZip(files) {
    var parts = [], central = [], offset = 0;
    var d = new Date(), dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
        dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    files.forEach(function (f) {
        var name = epubBytes(f.name), data = epubBytes(f.data), crc = epubCrc32(data);
        var h = new DataView(new ArrayBuffer(30));
        h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
        h.setUint16(10, dosTime, true); h.setUint16(12, dosDate, true); h.setUint32(14, crc, true);
        h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
        parts.push(new Uint8Array(h.buffer), name, data);
        var c = new DataView(new ArrayBuffer(46));
        c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
        c.setUint16(12, dosTime, true); c.setUint16(14, dosDate, true); c.setUint32(16, crc, true);
        c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true);
        c.setUint32(42, offset, true);
        central.push(new Uint8Array(c.buffer), name);
        offset += 30 + name.length + data.length;
    });
    var size = central.reduce(function (s, p) { return s + p.length; }, 0);
    var e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true);
    e.setUint32(12, size, true); e.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [new Uint8Array(e.buffer)]), { type: 'application/epub+zip' });
}
function epubEsc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// HTML thường → XHTML: dựng cây bằng trình duyệt rồi tuần tự hóa theo chuẩn XML.
function epubXhtml(html) {
    var doc = document.implementation.createHTMLDocument('');
    doc.body.innerHTML = html || '';
    Array.prototype.forEach.call(doc.body.querySelectorAll('script,style,iframe,form,input,button,noscript,object,embed,link,meta'), function (n) { n.remove(); });
    Array.prototype.forEach.call(doc.body.querySelectorAll('*'), function (n) {
        Array.prototype.slice.call(n.attributes).forEach(function (a) {
            if (/^on/i.test(a.name) || /^data-/i.test(a.name) || a.name === 'style' && n.tagName !== 'SPAN' && n.tagName !== 'P') n.removeAttribute(a.name);
        });
    });
    var s = new XMLSerializer().serializeToString(doc.body);
    return s.replace(/^<body[^>]*>/, '').replace(/<\/body>$/, '');
}
var EPUB_CSS = 'body{font-family:serif;line-height:1.55;margin:0 4%;}' +
    'p{margin:0 0 .8em;text-align:left;orphans:2;widows:2;}' +
    'h1{font-size:1.45em;line-height:1.25;margin:1.2em 0 1em;text-align:center;page-break-before:always;}' +
    'h2{font-size:1.2em;margin:1em 0 .6em;}' +
    'img{max-width:100%;height:auto;display:block;margin:1em auto;}' +
    'hr{border:0;border-top:1px solid #999;width:30%;margin:1.5em auto;}' +
    'blockquote{margin:1em 1.5em;font-style:italic;}' +
    '.note{font-size:.92em;border-left:3px solid #999;padding:.2em .8em;margin:1em 0;}' +
    '.note h2{font-size:1em;margin:.2em 0 .4em;}' +
    '.tp{text-align:center;margin-top:12%;}.tp h1{page-break-before:avoid;font-size:1.8em;}' +
    '.tp .by{font-size:1.1em;margin:.4em 0 2em;}' +
    'table.info{border-collapse:collapse;margin:1.5em auto;font-size:.9em;text-align:left;}' +
    'table.info td{padding:.2em .6em;vertical-align:top;}table.info td:first-child{font-weight:bold;white-space:nowrap;}' +
    '.summary{text-align:left;margin:1.5em 0;}';
function epubPage(title, body, lang) {
    return '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n' +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="' + epubEsc(lang) + '" lang="' + epubEsc(lang) + '">' +
        '<head><meta charset="utf-8"/><title>' + epubEsc(title) + '</title><link rel="stylesheet" type="text/css" href="../style.css"/></head>' +
        '<body>' + body + '</body></html>';
}
function epubBuild(b) {
    var lang = b.lang || 'en', id = b.id || ('urn:uuid:' + Date.now().toString(16) + '-' + Math.random().toString(16).slice(2));
    var chapters = b.chapters || [], images = b.images || [];
    var mod = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    var files = [{ name: 'mimetype', data: 'application/epub+zip' }];
    files.push({ name: 'META-INF/container.xml', data: '<?xml version="1.0" encoding="utf-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>' });
    files.push({ name: 'OEBPS/style.css', data: EPUB_CSS });

    var manifest = ['<item id="css" href="style.css" media-type="text/css"/>', '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
        '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>'];
    var spine = [];
    if (b.cover && b.cover.data) {
        var ext = /png/.test(b.cover.type) ? 'png' : /webp/.test(b.cover.type) ? 'webp' : /gif/.test(b.cover.type) ? 'gif' : 'jpg';
        files.push({ name: 'OEBPS/images/cover.' + ext, data: b.cover.data });
        manifest.push('<item id="cover-img" href="images/cover.' + ext + '" media-type="' + (b.cover.type || 'image/jpeg') + '" properties="cover-image"/>');
        files.push({ name: 'OEBPS/text/cover.xhtml', data: epubPage('Cover', '<div style="text-align:center;margin:0;padding:0;"><img src="../images/cover.' + ext + '" alt="" style="max-height:100%;"/></div>', lang) });
        manifest.push('<item id="cover" href="text/cover.xhtml" media-type="application/xhtml+xml"/>');
        spine.push('<itemref idref="cover" linear="yes"/>');
    }
    // Trang bìa chữ: tên, tác giả, bảng thông tin, tóm tắt.
    var info = (b.info || []).filter(function (r) { return r && r[1]; });
    var tp = '<div class="tp"><h1>' + epubEsc(b.title) + '</h1><p class="by">' + epubEsc(b.author || '') + '</p></div>' +
        (info.length ? '<table class="info">' + info.map(function (r) { return '<tr><td>' + epubEsc(r[0]) + '</td><td>' + epubEsc(r[1]) + '</td></tr>'; }).join('') + '</table>' : '') +
        (b.descriptionHtml ? '<div class="summary">' + epubXhtml(b.descriptionHtml) + '</div>' : b.description ? '<div class="summary"><p>' + epubEsc(b.description).replace(/\n+/g, '</p><p>') + '</p></div>' : '');
    files.push({ name: 'OEBPS/text/title.xhtml', data: epubPage(b.title, tp, lang) });
    manifest.push('<item id="title" href="text/title.xhtml" media-type="application/xhtml+xml"/>');
    spine.push('<itemref idref="title"/>');

    chapters.forEach(function (c, i) {
        var n = ('000' + (i + 1)).slice(-4);
        files.push({ name: 'OEBPS/text/c' + n + '.xhtml', data: epubPage(c.title, '<h1>' + epubEsc(c.title) + '</h1>' + epubXhtml(c.html), lang) });
        manifest.push('<item id="c' + n + '" href="text/c' + n + '.xhtml" media-type="application/xhtml+xml"/>');
        spine.push('<itemref idref="c' + n + '"/>');
    });
    images.forEach(function (im, i) {
        files.push({ name: 'OEBPS/images/' + im.name, data: im.data });
        manifest.push('<item id="img' + i + '" href="images/' + epubEsc(im.name) + '" media-type="' + (im.type || 'image/jpeg') + '"/>');
    });

    var navList = chapters.map(function (c, i) { return '<li><a href="text/c' + ('000' + (i + 1)).slice(-4) + '.xhtml">' + epubEsc(c.title) + '</a></li>'; }).join('');
    files.push({ name: 'OEBPS/nav.xhtml', data: '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="' + epubEsc(lang) + '"><head><meta charset="utf-8"/><title>' + epubEsc(b.title) + '</title><link rel="stylesheet" type="text/css" href="style.css"/></head>' +
        '<body><nav epub:type="toc" id="toc"><h1>' + (lang === 'vi' ? 'Mục lục' : 'Contents') + '</h1><ol>' + navList + '</ol></nav>' +
        '<nav epub:type="landmarks" hidden="hidden"><ol><li><a epub:type="titlepage" href="text/title.xhtml">' + epubEsc(b.title) + '</a></li>' +
        (chapters.length ? '<li><a epub:type="bodymatter" href="text/c0001.xhtml">Start</a></li>' : '') + '</ol></nav></body></html>' });
    // toc.ncx cho máy đọc đời cũ (Kindle qua Calibre/Send to Kindle, Kobo cũ).
    files.push({ name: 'OEBPS/toc.ncx', data: '<?xml version="1.0" encoding="utf-8"?>\n<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="' + epubEsc(id) + '"/></head>' +
        '<docTitle><text>' + epubEsc(b.title) + '</text></docTitle><navMap>' +
        chapters.map(function (c, i) { var n = ('000' + (i + 1)).slice(-4); return '<navPoint id="p' + n + '" playOrder="' + (i + 1) + '"><navLabel><text>' + epubEsc(c.title) + '</text></navLabel><content src="text/c' + n + '.xhtml"/></navPoint>'; }).join('') +
        '</navMap></ncx>' });

    var meta = '<dc:identifier id="bookid">' + epubEsc(id) + '</dc:identifier><dc:title>' + epubEsc(b.title) + '</dc:title>' +
        '<dc:language>' + epubEsc(lang) + '</dc:language>' + (b.author ? '<dc:creator>' + epubEsc(b.author) + '</dc:creator>' : '') +
        (b.description ? '<dc:description>' + epubEsc(b.description) + '</dc:description>' : '') +
        (b.source ? '<dc:source>' + epubEsc(b.source) + '</dc:source>' : '') +
        (b.subjects || []).slice(0, 40).map(function (s) { return '<dc:subject>' + epubEsc(s) + '</dc:subject>'; }).join('') +
        '<meta property="dcterms:modified">' + mod + '</meta>' + (b.cover && b.cover.data ? '<meta name="cover" content="cover-img"/>' : '');
    files.push({ name: 'OEBPS/content.opf', data: '<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="' + epubEsc(lang) + '">' +
        '<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">' + meta + '</metadata><manifest>' + manifest.join('') + '</manifest>' +
        '<spine toc="ncx">' + spine.join('') + '</spine></package>' });
    return epubZip(files);
}
function epubFileName(s) {
    return String(s || 'Không rõ tên').replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150).replace(/[. ]+$/, '') || 'Không rõ tên';
}
function epubSave(blob, filename) {
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = filename; a.rel = 'noopener';
    (document.body || document.documentElement).appendChild(a);
    a.click();
    // Thu hồi muộn: máy chậm chưa kịp đọc blob mà thu hồi sớm là file ra rỗng.
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 60000);
}
// </aurel-epub>

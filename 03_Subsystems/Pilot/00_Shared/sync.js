// Chép các khối dùng chung trong userscripts/shared/ vào từng userscript dùng nó.
//
//   node userscripts/shared/sync.js          → ghi đè các khối trong các file bên dưới
//   node userscripts/shared/sync.js --check  → chỉ báo file nào đang lệch (thoát mã 1)
//
// Các userscript chạy ở sandbox riêng, không @require chung một file được (repo private,
// Tampermonkey không tải nổi link raw), nên khối dùng chung phải nằm ngay trong từng file.
// Script này giữ cho các bản chép giống hệt bản gốc: mỗi file có đúng một cặp dòng đánh dấu
// "<tên-khối>" … "</tên-khối>", phần ở giữa được thay bằng bản gốc, thụt lề theo dòng
// đánh dấu mở.
//
//   ui-kit.js  (<aurel-ui-kit>)  giao diện chung: bảng tab, cột nút, bộ màu theo trang
//   epub.js    (<aurel-epub>)    dựng file EPUB 3 + ZIP không nén

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOCKS = [
  {
    src: 'ui-kit.js', tag: 'aurel-ui-kit',
    targets: ['lofter-downloader.user.js', 'tts-reader/core.js', 'tm-translate-aurelysn.user.js', 'ao3-downloader.user.js', 'wattpad-downloader.user.js', 'ffn-epub-downloader.user.js', 'sangtacviet-downloader.user.js', 'wikidich-downloader.user.js', 'wikicv-library.user.js', 'wikicv-name-desk.user.js', 'stv-names.user.js', 'jjwxc-downloader.user.js'],
  },
  {
    src: 'epub.js', tag: 'aurel-epub',
    targets: ['ao3-downloader.user.js', 'wattpad-downloader.user.js'],
  },
];

const check = process.argv.includes('--check');
let stale = 0;

for (const blk of BLOCKS) {
  const OPEN = '// <' + blk.tag + '>';
  const CLOSE = '// </' + blk.tag + '>';
  const kit = fs.readFileSync(path.join(__dirname, blk.src), 'utf8').replace(/\r\n/g, '\n').trimEnd().split('\n');
  if (kit[0] !== OPEN || kit[kit.length - 1] !== CLOSE) throw new Error(blk.src + ' phải mở bằng "' + OPEN + '" và đóng bằng "' + CLOSE + '"');

  for (const rel of blk.targets) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) throw new Error(rel + ': không có file');
    const raw = fs.readFileSync(file, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const lines = raw.replace(/\r\n/g, '\n').split('\n');
    const a = lines.findIndex((l) => l.trim() === OPEN);
    const b = lines.findIndex((l) => l.trim() === CLOSE);
    if (a < 0 || b < a) throw new Error(rel + ': thiếu cặp dòng đánh dấu ' + OPEN + ' … ' + CLOSE);
    const indent = lines[a].slice(0, lines[a].indexOf(OPEN));
    const block = kit.map((l) => (l ? indent + l : l));
    const next = lines.slice(0, a).concat(block, lines.slice(b + 1)).join(eol);
    const label = rel + ' [' + blk.tag + ']';
    if (next === raw) { console.log('=', label); continue; }
    stale++;
    if (check) { console.log('≠', label, '(lệch bản gốc)'); continue; }
    fs.writeFileSync(file, next);
    console.log('✓', label);
  }
}

if (check && stale) process.exit(1);

// Ghép core.js với từng file trong sites/ thành một userscript riêng cho mỗi trang.
//
//   node build.js            → ghi ra dist/
//   node build.js <thư mục>  → ghi ra thư mục khác
//
// Muốn sửa lõi (giao diện, cách đọc, cách dịch): sửa core.js rồi build lại.
// Muốn chỉnh riêng một trang (selector, chương sau, mặc định): sửa sites/<trang>.js.
// Đừng sửa thẳng file .user.js đã build — lần build sau sẽ ghi đè.

'use strict';
const fs = require('fs');
const path = require('path');

const VERSION = '4.2.0';
const SRC = __dirname;
const OUT = path.resolve(process.argv[2] || path.join(SRC, 'dist'));
const END = '// ==/UserScript==';

const core = fs.readFileSync(path.join(SRC, 'core.js'), 'utf8');
const files = fs.readdirSync(path.join(SRC, 'sites')).filter((f) => f.endsWith('.js')).sort();
if (!files.length) throw new Error('sites/ không có file nào');

for (const f of files) {
  const src = fs.readFileSync(path.join(SRC, 'sites', f), 'utf8');
  const cut = src.indexOf(END);
  if (cut < 0) throw new Error(f + ': thiếu dòng ' + END);
  const header = src.slice(0, cut + END.length);
  const body = src.slice(cut + END.length);
  const name = (header.match(/^\/\/\s*@name\s+(.+)$/m) || [])[1];
  if (!name) throw new Error(f + ': thiếu @name');
  if (!/^\s*SITE\s*=/m.test(body)) throw new Error(f + ': thiếu "SITE = {...}"');

  const out = [
    header.split('{{VERSION}}').join(VERSION),
    '// File này được BUILD từ userscripts/tts-reader/ (core.js + sites/' + f + '). Sửa ở đó rồi chạy: node build.js',
    body.trimEnd().split('\n').filter((l, i, a) => !(i === 0 && l.trim() === '')).join('\n'),
    '',
    ';(function () {',
    "    'use strict';",
    core.split('{{VERSION}}').join(VERSION).trimEnd(),
    '})();',
    ''
  ].join('\n')
    // SITE phải là biến cục bộ của script, không rò ra window của trang
    .replace(/^(\s*)SITE\s*=/m, '$1var SITE =');

  // Đặt SITE vào trong IIFE: khai báo ngoài cùng thì với @grant nó nằm trong sandbox,
  // nhưng để chắc chắn không đụng biến nào của trang, đưa hẳn vào trong.
  const idx = out.indexOf('var SITE =');
  const iife = out.indexOf(';(function () {');
  const siteBlock = out.slice(idx, iife).trimEnd();
  const final = out.slice(0, idx) + out.slice(iife).replace("    'use strict';", "    'use strict';\n\n" +
    siteBlock.split('\n').map((l) => (l ? '    ' + l : l)).join('\n') + '\n');

  // Tên file cố định theo file site (tts-reader-ao3.user.js…). Phiên bản nằm trong @version
  // và lịch sử git, không nằm trong tên file — tên đổi mỗi bản thì git thấy toàn file mới.
  const file = path.join(OUT, 'tts-reader-' + path.basename(f, '.js') + '.user.js');
  fs.writeFileSync(file, final);
  console.log('✓', path.basename(file), (final.length / 1024).toFixed(1) + ' KB');
}

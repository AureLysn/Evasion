/* Kệ Sách — thumbnails. The server has no image library (standard library only), so the browser makes them:
   an <img data-thumb="thumb/<series>/cover" data-full="/api/cover/<series>" data-w="320"> asks the server for its small
   JPEG; on a 404 it loads the full image once, scales it on a canvas, uploads the result and shows it. Next time it is a
   small download. Images are only touched when they scroll into view, three at a time. */
'use strict';
const ksQueue = { run: 0, wait: [], max: 3 };
function ksPool(job) {
  return new Promise((ok) => {
    const go = () => { ksQueue.run++; job().finally(() => { ksQueue.run--; ok(); const n = ksQueue.wait.shift(); if (n) n(); }); };
    ksQueue.run < ksQueue.max ? go() : ksQueue.wait.push(go);
  });
}
function ksMake(img) {
  const { thumb, full, w } = img.dataset;
  return ksPool(() => new Promise((done) => {
    const big = new Image();
    big.onerror = () => { img.parentNode?.classList.add('noimg'); img.remove(); done(); };   // no such image at all (text-only series)
    big.onload = () => {
      try {
        const width = Math.min(+w || 200, big.naturalWidth), height = Math.round(big.naturalHeight * (width / big.naturalWidth));
        const cv = document.createElement('canvas'); cv.width = width; cv.height = height;
        cv.getContext('2d').drawImage(big, 0, 0, width, height);
        cv.toBlob((blob) => {
          if (!blob) return done();
          img.src = URL.createObjectURL(blob);   // show it now, the upload is for next time
          fetch('/api/' + thumb, { method: 'PUT', body: blob, headers: { 'Content-Type': 'image/jpeg' } }).catch(() => {}).finally(done);
        }, 'image/jpeg', 0.72);
      } catch { img.src = full; done(); }   // canvas refused (huge or odd image): fall back to the full picture
    };
    big.src = full;
  }));
}
/** An image came into view: ask for its small version; if there is none yet, make it. */
function ksVisible(img) {
  img.addEventListener('error', () => { if (!img.dataset.made) { img.dataset.made = '1'; ksMake(img); } }, { once: true });
  img.src = '/api/' + img.dataset.thumb;
}
const ksSeen = typeof IntersectionObserver === 'function' ? new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { ksSeen.unobserve(e.target); ksVisible(e.target); }
}, { rootMargin: '300px' }) : null;
/** Wire up every <img data-thumb> under root. */
function ksThumbs(root = document) {
  $$('img[data-thumb]:not([data-wired])', root).forEach((img) => {
    img.dataset.wired = '1';
    if (ksSeen) ksSeen.observe(img); else img.src = img.dataset.full;
  });
}

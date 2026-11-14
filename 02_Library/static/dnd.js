/* Kệ Sách — drag and drop. Only shortcuts for things the buttons already do; nothing here writes by itself.
   - a series card  -> a collection in the sidebar: add it to the collection
   - a series card  -> a tag in the sidebar: give the series that tag
   - a series card  -> a fandom / group in the sidebar: "move the whole series" (only with writing on, and it still opens the usual
     plan + confirm box before anything happens on Drive)
   - chapter row(s) -> a collection in the sidebar: add the chapter(s) (several ticked rows travel together)
   Keyboard and the buttons stay the way in for everyone who cannot drag. */
'use strict';
let ksDrag = null;   // what is being dragged: { type: 'series', id } | { type: 'chapters', series, ids }
window.ksWrite = false;

document.addEventListener('dragstart', (e) => {
  const card = e.target.closest?.('[data-sid]');
  const row = e.target.closest?.('.ch[href^="#/read/"]');
  ksDrag = null;
  if (card) ksDrag = { type: 'series', id: card.dataset.sid, label: card.querySelector('b')?.textContent || '' };
  else if (row) {
    const [, , sid, cid] = row.getAttribute('href').split('/');
    const picked = $$('.ch-pick:checked').map((p) => p.dataset.pick);
    const ids = picked.includes(cid) ? picked : [cid];   // dragging a ticked row takes every ticked row
    ksDrag = { type: 'chapters', series: sid, ids, label: ids.length > 1 ? `${ids.length} chương` : row.querySelector('.t')?.textContent.trim() || '' };
  }
  if (!ksDrag) return;
  e.dataTransfer.setData('application/x-kesach', JSON.stringify(ksDrag));
  e.dataTransfer.effectAllowed = 'copyMove';
  document.body.classList.add('dragging');
  // added a tick later: changing the page inside dragstart can make a browser drop the drag
  if (ksDrag.type === 'chapters' && window.ksWrite) { const d = ksDrag; setTimeout(() => ksDrag && showSeriesStrip(d), 0); }
  if (ksDrag.type === 'chapters' && ksDrag.ids.length > 1) {   // a small badge instead of one row's picture
    const g = document.createElement('div'); g.className = 'drag-badge'; g.textContent = ksDrag.label; document.body.appendChild(g);
    e.dataTransfer.setDragImage(g, 10, 10); setTimeout(() => g.remove(), 0);
  }
});
document.addEventListener('dragend', () => { ksDrag = null; document.body.classList.remove('dragging'); $$('.drop-ok').forEach((x) => x.classList.remove('drop-ok')); $('#drop-strip')?.remove(); });

/** While chapters are dragged with writing on, a strip lists the other series: drop on one = move the chapters there (plan + confirm as usual). */
function showSeriesStrip(drag) {
  $('#drop-strip')?.remove();
  const list = (window.ksAllSeries || []).filter((s) => !s.loose && s.id !== drag.series);
  const el = document.createElement('aside');
  el.id = 'drop-strip'; el.className = 'drop-strip'; el.setAttribute('aria-hidden', 'true');
  let lastGroup = null;
  el.innerHTML = `<div class="ds-head">Thả vào bộ… <span class="muted small">(${esc(drag.label)})</span></div><div class="ds-item new" data-new="1">＋ Chọn bộ khác / tạo bộ mới…</div>` +
    list.map((s) => { const g = [s.fandom, s.group].filter(Boolean).join(' / '); const h = g !== lastGroup ? `<div class="ds-group">${esc(g || 'gốc')}</div>` : ''; lastGroup = g; return h + `<div class="ds-item" data-dest="${s.id}">${esc(s.title)} <span class="muted small">${s.chapters}</span></div>`; }).join('');
  document.body.appendChild(el);
}

/** What the element under the pointer accepts for the thing being dragged, or null. */
function dropKind(el) {
  if (!ksDrag) return null;
  if (el.closest('#colls [data-coll]')) return { kind: 'collection', el: el.closest('#colls [data-coll]') };
  const dest = el.closest('#drop-strip [data-dest], #drop-strip [data-new]');
  if (dest && ksDrag.type === 'chapters' && window.ksWrite) return { kind: 'strip', el: dest };
  if (ksDrag.type !== 'series') return null;
  const tag = el.closest('#tagbox [data-tag]');
  if (tag) return { kind: 'tag', el: tag };
  const place = el.closest('#tree [data-f]');
  if (place && window.ksWrite && !place.dataset.all && place.dataset.f !== '') return { kind: 'place', el: place };
  return null;
}
document.addEventListener('dragover', (e) => {
  const d = dropKind(e.target);
  $$('.drop-ok').forEach((x) => { if (!d || x !== d.el) x.classList.remove('drop-ok'); });
  if (!d) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = d.kind === 'place' || d.kind === 'strip' ? 'move' : 'copy';
  d.el.classList.add('drop-ok');
});
document.addEventListener('drop', async (e) => {
  const d = dropKind(e.target);
  const drag = ksDrag;
  $$('.drop-ok').forEach((x) => x.classList.remove('drop-ok'));
  if (!d || !drag) return;
  e.preventDefault();
  try {
    if (d.kind === 'collection') {
      const cid = d.el.dataset.coll;
      let added = 0, dup = 0;
      for (const id of drag.type === 'series' ? [null] : drag.ids) {
        try {
          await collApi({ action: 'add', collection: cid, type: drag.type === 'series' ? 'series' : 'chapter', series: drag.type === 'series' ? drag.id : drag.series, chapter: id });
          added++;
        } catch (er) { if (/Đã có/.test(er.message)) dup++; else throw er; }
      }
      toast(added ? `Đã thêm ${drag.label} vào bộ sưu tập${dup ? ` (${dup} mục đã có)` : ''}` : 'Đã có sẵn trong bộ sưu tập đó', !added && !dup);
      drawColls();
      if (location.hash.startsWith('#/series/')) route();
    } else if (d.kind === 'tag') {
      const [kind, ...rest] = d.el.dataset.tag.split('|'), name = rest.join('|');
      const cur = await api('meta/series/' + drag.id);
      if (cur.tags.some((t) => t.name === name && t.kind === kind)) return toast(`“${drag.label}” đã có tag “${name}”`);
      await api('meta/series/' + drag.id, { method: 'PUT', body: { tags: [...cur.tags, { name, kind }] } });
      toast(`Đã gắn tag “${name}” cho “${drag.label}”`);
      renderLibrary();
    } else if (d.kind === 'strip') {
      $('#drop-strip')?.remove();
      if (d.el.dataset.new) return moveChapter({ series: drag.series, chapters: drag.ids, label: `${drag.label} (kéo từ trang bộ)` });
      const p = await driveApi('plan', { series: drag.series, chapters: drag.ids, dest_series: d.el.dataset.dest });
      confirmMove(p);
    } else if (d.kind === 'place') {
      const parent = d.el.dataset.g !== undefined ? `${d.el.dataset.f}/${d.el.dataset.g}` : d.el.dataset.f;
      const p = await driveApi('plan', { series: drag.id, whole_series: true, new_parent: parent });
      confirmMove(p, () => { state.fandom = d.el.dataset.f; state.group = d.el.dataset.g !== undefined ? d.el.dataset.g : null; renderLibrary(); });
    }
  } catch (er) { toast(er.message, true); }
});

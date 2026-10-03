(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  // ---- colour theme (per-viewer convenience; safe if storage is blocked) ----
  const KEY = 'ff-theme';
  try { const t = localStorage.getItem(KEY); if (t) document.documentElement.dataset.theme = t; } catch {}
  $('#themeToggle').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch {}
  });

  let DATA = null, activeTheme = null;

  const state = { q: '', kind: '', sort: 'year-desc' };

  function authorLine(authors) {
    return authors.map(a => /Furini/.test(a) ? `<b>${esc(a)}</b>` : esc(a)).join(', ');
  }

  function themeName(slug) {
    const t = DATA.themes.find(x => x.slug === slug);
    return t ? t.name : slug;
  }

  function matches(p) {
    if (state.kind && p.kind !== state.kind) return false;
    if (activeTheme && !(p.themes || []).includes(activeTheme)) return false;
    if (state.q) {
      const hay = (p.title + ' ' + p.authors.join(' ') + ' ' + p.venue + ' ' + (p.abstract || '')).toLowerCase();
      if (!state.q.toLowerCase().split(/\s+/).every(w => hay.includes(w))) return false;
    }
    return true;
  }

  function sortPapers(list) {
    const s = state.sort;
    return [...list].sort((a, b) =>
      s === 'title' ? a.title.localeCompare(b.title)
      : s === 'year-asc' ? (a.year - b.year) || a.title.localeCompare(b.title)
      : (b.year - a.year) || a.title.localeCompare(b.title));
  }

  function paperHTML(p) {
    const links = [];
    if (p.doi) links.push(`<a class="lk primary" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">Published version ↗</a>`);
    if (p.pdf) links.push(`<a class="lk" href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>`);
    if (p.openpdf) links.push(`<a class="lk" href="${esc(p.openpdf)}" target="_blank" rel="noopener">Open-format PDF</a>`);
    if (p.code) links.push(`<a class="lk" href="${esc(p.code)}" target="_blank" rel="noopener">Code ↗</a>`);
    const tags = (p.themes || []).map(t => `<span class="tag">${esc(themeName(t))}</span>`).join('');
    if (p.doi) links.push(`<button class="lk cite" type="button" data-id="${esc(p.id)}">Cite</button>`);
    return `<article class="paper" id="${esc(p.id)}">
      <div class="top">
        <span class="yr">${p.year}</span>
        <div style="flex:1">
          <h3>${esc(p.title)}</h3>
          <p class="au">${authorLine(p.authors)}</p>
          <p class="vn">${esc(p.venue)}</p>
          ${tags ? `<div class="tags">${tags}</div>` : ''}
          <div class="links">${links.join('')}</div>
          ${p.abstract ? `<div class="abs-preview">${esc(p.abstract)}</div>
             <button class="toggle" type="button">Read more</button>` : ''}
        </div>
      </div>
    </article>`;
  }

  function render() {
    const found = sortPapers(DATA.papers.filter(matches));
    $('#countLine').textContent =
      `${found.length} of ${DATA.papers.length} publications` +
      (activeTheme ? ` · ${themeName(activeTheme)}` : '');
    $('#list').innerHTML = found.length
      ? found.map(paperHTML).join('')
      : `<div class="empty">No publication matches these filters.</div>`;
    document.querySelectorAll('.toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.paper');
        const open = card.classList.toggle('open');
        btn.textContent = open ? 'Show less' : 'Read more';
      });
    });
    document.querySelectorAll('.cite').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = DATA.papers.find(x => x.id === btn.dataset.id);
        const key = p.authors[0].split(' ').pop().replace(/\./g, '') + p.year + p.id;
        const type = p.kind === 'journal' ? 'article' : 'inproceedings';
        const field = p.kind === 'journal' ? 'journal' : 'booktitle';
        const bib = `@${type}{${key},\n  author  = {${p.authors.join(' and ')}},\n`
          + `  title   = {${p.title}},\n  ${field} = {${p.venue}},\n`
          + `  year    = {${p.year}},\n` + (p.doi ? `  doi     = {${p.doi}},\n` : '') + `}`;
        navigator.clipboard?.writeText(bib).then(
          () => { btn.textContent = 'Copied'; setTimeout(() => btn.textContent = 'Cite', 1600); },
          () => { window.prompt('BibTeX entry:', bib); });
      });
    });
    document.querySelectorAll('#chips .chip').forEach(c =>
      c.setAttribute('aria-pressed', String(c.dataset.slug === activeTheme)));
  }

  function setTheme(slug) {
    activeTheme = (activeTheme === slug) ? null : slug;
    render();
    document.getElementById('publications').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function boot(d) {
    DATA = d;
    const s = d.stats;
    $('#stats').innerHTML = [
      [s.journal, 'Journal articles'], [s.conference, 'Conference papers'],
      [s.coauthors, 'Co-authors'], [`${s.from}–${s.to}`, 'Years active'],
    ].map(([n, l]) => `<div class="stat"><div class="n">${esc(n)}</div><div class="l">${esc(l)}</div></div>`).join('');

    const counts = {};
    d.papers.forEach(p => (p.themes || []).forEach(t => counts[t] = (counts[t] || 0) + 1));
    $('#themeGrid').innerHTML = d.themes.map(t =>
      `<button class="theme-card" data-slug="${esc(t.slug)}">
         <h3>${esc(t.name)}</h3><p>${esc(t.description)}</p>
         <span class="count">${counts[t.slug] || 0} papers</span>
       </button>`).join('');
    $('#chips').innerHTML = d.themes.map(t =>
      `<button class="chip" data-slug="${esc(t.slug)}" aria-pressed="false">${esc(t.name)}</button>`).join('');

    document.querySelectorAll('[data-slug]').forEach(el =>
      el.addEventListener('click', () => setTheme(el.dataset.slug)));

    $('#q').addEventListener('input', e => { state.q = e.target.value; render(); });
    $('#kind').addEventListener('change', e => { state.kind = e.target.value; render(); });
    $('#sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
    render();
  }

  fetch('data.json')
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(boot)
    .catch(err => {
      $('#list').innerHTML = `<div class="empty">Could not load the publication list (${esc(err.message)}).</div>`;
    });
})();

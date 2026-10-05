// Copy buttons: data-copy holds the id of an element whose text to copy.
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy);
    const text = source.value !== undefined ? source.value : source.textContent;
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const area = document.createElement('textarea'); area.value = text; document.body.appendChild(area);
      area.select(); document.execCommand('copy'); area.remove();
    }
    const old = button.textContent; button.textContent = 'Copied ✓';
    setTimeout(() => button.textContent = old, 1300);
  });
});

// Manual: highlight the section in view.
const tocLinks = [...document.querySelectorAll('.doc aside a')];
if (tocLinks.length) {
  const byId = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));
  const seen = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { tocLinks.forEach(a => a.classList.remove('on')); byId.get(e.target.id)?.classList.add('on'); } });
  }, { rootMargin: '-80px 0px -70% 0px' });
  document.querySelectorAll('.doc article h2[id]').forEach(h => seen.observe(h));
}

// Assets: search and filters.
const search = document.getElementById('search');
if (search) {
  const state = { kind: 'all', status: 'all' };
  const cards = [...document.querySelectorAll('.asset')];
  const groups = [...document.querySelectorAll('.group')];
  const count = document.getElementById('count');
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const ok = (state.kind === 'all' || card.dataset.kind === state.kind)
        && (state.status === 'all' || card.dataset.status === state.status)
        && (!q || card.textContent.toLowerCase().includes(q));
      card.classList.toggle('hidden', !ok); if (ok) shown++;
    });
    groups.forEach(g => g.classList.toggle('hidden', !g.querySelector('.asset:not(.hidden)')));
    count.textContent = shown + ' of ' + cards.length + ' assets';
  };
  document.querySelectorAll('.filter').forEach(f => f.addEventListener('click', () => {
    document.querySelectorAll(`.filter[data-field="${f.dataset.field}"]`).forEach(x => x.classList.remove('on'));
    f.classList.add('on'); state[f.dataset.field] = f.dataset.value; apply();
  }));
  search.addEventListener('input', apply);
  apply();
}

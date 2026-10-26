(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('al-folio-theme'); } catch {}
  const media = matchMedia('(prefers-color-scheme: dark)');
  function setTheme(dark) {
    root.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('#light-toggle')?.setAttribute('aria-pressed', String(dark));
  }
  setTheme(saved ? saved === 'dark' : media.matches);
  document.querySelector('#light-toggle')?.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    setTheme(dark);
    saved = dark ? 'dark' : 'light';
    try { localStorage.setItem('al-folio-theme', saved); } catch {}
  });
  media.addEventListener('change', (event) => { if (!saved) setTheme(event.matches); });
  const toggle = document.querySelector('.navbar-toggler-main');
  const nav = document.querySelector('#navbarNav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('collapsed', !open);
    nav.classList.toggle('show', open);
  });
})();

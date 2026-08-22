(() => {
  const storageKey = 'engineerspath-theme';
  const preferredTheme = (() => {
    try { return localStorage.getItem(storageKey) || 'dark'; } catch (_) { return 'dark'; }
  })();

  document.documentElement.dataset.theme = preferredTheme;

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch (_) { /* Keep the current page setting. */ }

    const button = document.getElementById('themeToggle');
    if (button) {
      const isLight = theme === 'light';
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight ? 'Koyu moda geç' : 'Açık moda geç');
      button.title = isLight ? 'Koyu moda geç' : 'Açık moda geç';
      button.innerHTML = isLight
        ? '<i class="fa-solid fa-moon" aria-hidden="true"></i><span>Koyu</span>'
        : '<i class="fa-solid fa-sun" aria-hidden="true"></i><span>Açık</span>';
    }
  }

  function mountToggle() {
    if (document.getElementById('themeToggle')) return;
    const button = document.createElement('button');
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.type = 'button';
    button.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
    document.body.appendChild(button);
    setTheme(document.documentElement.dataset.theme || 'dark');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountToggle);
  else mountToggle();
})();

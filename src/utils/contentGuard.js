// Makes casual copying of questions and notes from the app screen harder:
// no text selection, copy/cut, right-click menu or drag outside form fields
// and the public marketing pages. This stops screenshots-by-copy and
// select-all-paste; it cannot stop a determined person (anything shown on a
// screen can be photographed), so it is a deterrent, not a lock.
const OPEN = 'input, textarea, select, [contenteditable="true"], .land, .sp, .allow-copy';

function allowed(e) {
  try { return !!(e.target && e.target.closest && e.target.closest(OPEN)); } catch (err) { return true; }
}

export function installContentGuard() {
  if (typeof document === 'undefined' || document.documentElement.dataset.guard) return;
  if (/^\/(admin|partner)/.test(window.location.pathname)) return; // staff pages keep normal copy
  document.documentElement.dataset.guard = '1';
  const block = (e) => { if (!allowed(e)) e.preventDefault(); };
  ['copy', 'cut', 'contextmenu', 'dragstart', 'selectstart'].forEach((t) => document.addEventListener(t, block));
  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey) || allowed(e)) return;
    const k = String(e.key || '').toLowerCase();
    if (k === 'c' || k === 'x' || k === 'a' || k === 's' || k === 'u' || k === 'p') e.preventDefault();
  });
}

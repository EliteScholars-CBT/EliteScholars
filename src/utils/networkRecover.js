// Weak-network helper: when a picture fails to download it is tried again (a few times, and again as soon as the
// network returns), and pictures far below the screen are fetched only when scrolled near. Nothing is removed.
export function installNetworkRecovery() {
  if (typeof window === 'undefined' || window.__esNetRecover) return;
  window.__esNetRecover = true;

  const retryImg = (img) => {
    const src = img.currentSrc || img.src;
    if (!src || src.startsWith('data:')) return;
    img.removeAttribute('src');
    img.src = src;
  };
  const failed = () => Array.prototype.filter.call(document.images, (i) => i.complete && i.naturalWidth === 0 && (i.currentSrc || i.src));

  // a failed picture: try again after a pause, up to 3 times
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    const n = +(img.dataset.esTry || 0);
    if (n >= 3) return;
    img.dataset.esTry = String(n + 1);
    setTimeout(() => { if (navigator.onLine !== false) retryImg(img); }, 1500 * (n + 1));
  }, true);

  // network is back: reload every picture that is still broken
  window.addEventListener('online', () => {
    setTimeout(() => failed().forEach((i) => { i.dataset.esTry = '0'; retryImg(i); }), 400);
  });

  // pictures well below the first screen load lazily and decode off the main thread
  const tune = (img) => {
    if (!img || img.tagName !== 'IMG') return;
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
    if (!img.hasAttribute('loading')) {
      const r = img.getBoundingClientRect();
      if (r.top > window.innerHeight * 1.2) img.loading = 'lazy';
    }
  };
  try {
    const mo = new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType !== 1) return;
      if (n.tagName === 'IMG') tune(n); else if (n.querySelectorAll) n.querySelectorAll('img').forEach(tune);
    })));
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch { /* optional */ }
}

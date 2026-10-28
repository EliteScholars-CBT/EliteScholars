import { useEffect } from 'react';

// Scroll-reveal: elements matching `selector` fade/slide/scale in as they enter the viewport,
// staggered by their position among siblings. Falls back to showing everything if unsupported.
export default function useReveal(selector, dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') { els.forEach((e) => e.classList.add('rv', 'rv-in')); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { const t = en.target; t.classList.add('rv-in'); io.unobserve(t); setTimeout(() => { t.classList.remove('rv', 'rv-in', 'rv-left', 'rv-right', 'rv-zoom'); t.style.removeProperty('--rv-d'); t.dataset.rvd = '1'; }, 1000); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => {
      if (el.dataset.rvd === '1') return; // already revealed earlier
      if (el.classList.contains('rv')) { io.observe(el); return; } // set up by an earlier run, just watch it again
      const sibs = Array.from(el.parentElement ? el.parentElement.children : []).filter((c) => c.matches(selector));
      const i = Math.max(0, sibs.indexOf(el));
      el.style.setProperty('--rv-d', `${Math.min(i, 6) * 55}ms`);
      if (el.dataset.rv) el.classList.add(`rv-${el.dataset.rv}`);
      el.classList.add('rv');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [selector, dep]);
}

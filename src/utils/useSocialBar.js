import { useEffect, useRef } from 'react';
import { useAdsConfig, adsOn } from './adsConfig';

// Adsterra "social bar" for the app. It is one global script that cannot be removed once
// loaded, so it is added only after the student has been using the app for a while and
// only while they are on a calm screen (never in the middle of a quiz; games reserve a strip at the top for it).
const CALM = new Set(['subjects', 'examType', 'learn', 'leaderboard', 'profile', 'shop', 'ready', 'flashcards', 'game']);

export default function useSocialBar({ screen, hidden }) {
  const cfg = useAdsConfig();
  const loaded = useRef(false);
  const born = useRef(Date.now());
  const src = cfg && cfg.units && cfg.units.socialBar && cfg.units.socialBar.enabled ? cfg.units.socialBar.src : '';
  const on = adsOn(cfg, 'app') && cfg.app.socialBar && !!src && !hidden;

  useEffect(() => {
    if (!on || loaded.current || !CALM.has(screen)) return undefined;
    const wait = Math.max(0, 45000 - (Date.now() - born.current));
    const t = setTimeout(() => {
      if (loaded.current) return;
      loaded.current = true;
      const s = document.createElement('script');
      s.async = true; s.setAttribute('data-cfasync', 'false');
      s.src = String(src).replace(/^\/\//, 'https://');
      document.body.appendChild(s);
    }, wait);
    return () => clearTimeout(t);
  }, [on, screen, src]);
}

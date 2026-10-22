// Ad settings come from the server (Admin → Ads), so changes apply without a redeploy.
// Until they arrive (or if the request fails) NO third-party ad is shown.
import { useEffect, useState } from 'react';

const KEY = 'es_ads_cfg_v1';
let mem = null;
let inflight = null;

function readCache() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    return j && Date.now() - j.at < 10 * 60 * 1000 ? j.cfg : null;
  } catch { return null; }
}

export function loadAdsConfig() {
  if (mem) return Promise.resolve(mem);
  const c = readCache();
  if (c) { mem = c; return Promise.resolve(c); }
  if (!inflight) {
    inflight = fetch('/api/site/config')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && j.success && j.ads) { mem = j.ads; try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), cfg: mem })); } catch { /* ignore */ } }
        inflight = null;
        return mem;
      })
      .catch(() => { inflight = null; return null; });
  }
  return inflight;
}

export function useAdsConfig() {
  const [cfg, setCfg] = useState(mem || readCache());
  useEffect(() => {
    let on = true;
    loadAdsConfig().then((c) => { if (on && c) setCfg(c); });
    return () => { on = false; };
  }, []);
  return cfg;
}

// Is this ad surface switched on? where = 'app' | 'blog'
export function adsOn(cfg, where) {
  return !!(cfg && cfg.master && cfg[where] && cfg[where].enabled);
}

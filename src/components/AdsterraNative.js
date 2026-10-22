import React, { useEffect, useRef, useState } from 'react';

// One Adsterra native unit in its own little page (iframe). Each unit gets its own
// document, so the same container id can appear many times without clashing, and a
// slow or broken ad can never freeze the app. Height follows the ad's content.
export default function AdsterraNative({ unit, onShown }) {
  const ref = useRef(null);
  const [h, setH] = useState(150);
  const src = unit && unit.src ? String(unit.src).replace(/^\/\//, 'https://') : '';
  const cid = unit && unit.containerId ? String(unit.containerId).replace(/[^A-Za-z0-9_-]/g, '') : '';

  useEffect(() => {
    if (!src || !cid) return undefined;
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      try {
        const d = ref.current && ref.current.contentDocument;
        const box = d && d.getElementById(cid);
        if (box && box.scrollHeight > 40) {
          setH(Math.min(420, Math.max(120, box.scrollHeight + 8)));
          if (n === 1 || !ref.current.dataset.shown) { ref.current.dataset.shown = '1'; if (onShown) onShown(); }
        }
      } catch { /* cross-origin: keep default height */ }
      if (n > 24) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [src, cid, onShown]);

  if (!src || !cid) return null;
  const doc = '<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;background:transparent;font-family:system-ui,sans-serif}</style></head><body>'
    + `<script async="async" data-cfasync="false" src="${src.replace(/"/g, '')}"></script><div id="${cid}"></div></body></html>`;
  return <iframe ref={ref} title="Advertisement" className="ad-native-frame" srcDoc={doc} loading="lazy" scrolling="no" style={{ width: '100%', height: h, border: 0 }} />;
}

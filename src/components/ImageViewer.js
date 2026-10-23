import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

// Full-screen photo: pinch / scroll / double-tap / buttons to zoom, drag to move when zoomed.
export default function ImageViewer({ src, onClose }) {
  const [t, setT] = useState({ s: 1, x: 0, y: 0 });
  const pts = useRef(new Map());
  const start = useRef(null);
  const lastTap = useRef(0);
  const MIN = 1, MAX = 6;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const zoomTo = (s) => setT((c) => { const n = clamp(s, MIN, MAX); return n === 1 ? { s: 1, x: 0, y: 0 } : { ...c, s: n }; });

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); else if (e.key === '+' || e.key === '=') zoomTo(t.s * 1.4); else if (e.key === '-') zoomTo(t.s / 1.4); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }); // eslint-disable-line

  const dist = () => { const [a, b] = [...pts.current.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  const down = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    start.current = { d: pts.current.size === 2 ? dist() : 0, s: t.s, x: t.x, y: t.y, px: e.clientX, py: e.clientY, moved: false };
  };
  const move = (e) => {
    if (!pts.current.has(e.pointerId) || !start.current) return;
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.current.size === 2 && start.current.d) {
      start.current.moved = true;
      const n = clamp(start.current.s * (dist() / start.current.d), MIN, MAX);
      setT((c) => (n === 1 ? { s: 1, x: 0, y: 0 } : { ...c, s: n }));
    } else if (pts.current.size === 1 && t.s > 1) {
      const dx = e.clientX - start.current.px, dy = e.clientY - start.current.py;
      if (Math.abs(dx) + Math.abs(dy) > 3) start.current.moved = true;
      setT((c) => ({ ...c, x: start.current.x + dx, y: start.current.y + dy }));
    }
  };
  const up = (e) => {
    const st = start.current;
    pts.current.delete(e.pointerId);
    if (pts.current.size === 0 && st && !st.moved) {
      const now = Date.now();
      if (now - lastTap.current < 320) { zoomTo(t.s > 1 ? 1 : 2.6); lastTap.current = 0; } else lastTap.current = now;
    }
    if (pts.current.size < 2 && st) st.d = 0;
  };
  const wheel = (e) => { zoomTo(t.s * (e.deltaY < 0 ? 1.2 : 1 / 1.2)); };

  return createPortal(
    <div className="iv" role="dialog" aria-label="Photo">
      <div className="iv-bar">
        <button type="button" onClick={onClose} aria-label="Close"><Icon name="x" size={20} /></button>
        <span>{Math.round(t.s * 100)}%</span>
        <button type="button" onClick={() => zoomTo(t.s / 1.4)} aria-label="Zoom out"><Icon name="minus" size={20} /></button>
        <button type="button" onClick={() => zoomTo(t.s * 1.4)} aria-label="Zoom in"><Icon name="plus" size={20} /></button>
      </div>
      <div className="iv-stage" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onWheel={wheel} onClick={(e) => { if (e.target === e.currentTarget && t.s === 1) onClose(); }}>
        <img src={src} alt="Shared" draggable={false} style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})`, transition: pts.current.size ? 'none' : 'transform .15s' }} />
      </div>
    </div>,
    document.body
  );
}

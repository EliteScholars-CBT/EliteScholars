import React, { useEffect, useState } from 'react';
import '../styles/premium.css';

const KEY = 'es_pro_nudge_at';
const GAP_MS = 6 * 60 * 60 * 1000; // after a tap on the X, stay away for 6 hours

// A small "Go Pro" pill above the bottom bar on the exam and subject screens, for students who are not Pro yet.
export default function ProNudge({ screen, premium, onOpen }) {
  const [show, setShow] = useState(false);
  const eligible = !premium && (screen === 'examType' || screen === 'subjects');
  useEffect(() => {
    if (!eligible) { setShow(false); return undefined; }
    let last = 0;
    try { last = Number(localStorage.getItem(KEY)) || 0; } catch { /* ignore */ }
    if (Date.now() - last < GAP_MS) { setShow(false); return undefined; }
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, [eligible, screen]);
  if (!eligible || !show) return null;
  const dismiss = (e) => { e.stopPropagation(); try { localStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ } setShow(false); };
  return (
    <div className="pro-nudge" role="complementary">
      <button type="button" className="pro-nudge-main" onClick={onOpen}>
        <span aria-hidden="true">👑</span>
        <span><b>Go Pro</b><small>No ads, no limits, everything unlocked</small></span>
      </button>
      <button type="button" className="pro-nudge-x" onClick={dismiss} aria-label="Hide for now">×</button>
    </div>
  );
}

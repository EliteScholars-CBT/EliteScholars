import React, { useEffect, useMemo, useState } from 'react';
import { SFX } from '../utils/sounds';
import { loadPopoverAd } from '../utils/ads';
import logo from '../assets/elite-scholars-logo.png';
import Icon from './Icon';

// ============================================================================
// Splash — aurora backdrop, orbiting rings, twinkling 4-point stars, rising
// gold dust, letter-by-letter title, exam chips and a glossy loader.
// Total run time ≈ 3.2s.
// ============================================================================

const TITLE = 'EliteScholars'.split('');
const EXAMS = [
  { id: 'JAMB', icon: 'pen' },
  { id: 'WAEC', icon: 'landmark' },
  { id: 'NECO', icon: 'clipboard' },
  { id: 'GST',  icon: 'cap' },
];
const DURATION = 3200;

export default function Splash({ onDone }) {
  const sparks = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 8 + Math.random() * 16,
    delay: Math.random() * 2.4,
    dur: 1.6 + Math.random() * 1.8,
    gold: Math.random() > 0.45,
  })), []);

  const dust = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    dur: 3 + Math.random() * 2.5,
    drift: Math.round((Math.random() - 0.5) * 60),
  })), []);

  const [pct, setPct] = useState(0);

  useEffect(() => { loadPopoverAd(); }, []);

  useEffect(() => {
    const s = setTimeout(() => SFX.splash(), 300);
    const t = setTimeout(onDone, DURATION);
    const started = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - started) / (DURATION - 250)) * 100));
      setPct(p);
    }, 60);
    return () => { clearTimeout(s); clearTimeout(t); clearInterval(tick); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scr splash-container splash-v2">
      <div className="sp-aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="sp-grid" aria-hidden="true" />

      {sparks.map((s) => (
        <span
          key={s.id}
          className={`sp-spark${s.gold ? ' gold' : ''}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
        />
      ))}
      {dust.map((d) => (
        <span
          key={d.id}
          className="sp-dust"
          style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, '--drift': `${d.drift}px` }}
        />
      ))}

      <div className="sp-stage">
        <div className="sp-rings" aria-hidden="true">
          <span className="r1" /><span className="r2" /><span className="r3" />
          <em className="orb o1" /><em className="orb o2" /><em className="orb o3" />
        </div>
        <div className="sp-logo-wrap">
          <div className="sp-burst" aria-hidden="true" />
          <img src={logo} alt="EliteScholars Logo" className="splash-logo sp-logo" />
          <div className="sp-gloss" aria-hidden="true" />
        </div>
      </div>

      <h1 className="sp-title" aria-label="EliteScholars">
        {TITLE.map((ch, i) => (
          <span key={i} className={i >= 5 ? 'gold' : ''} style={{ animationDelay: `${0.7 + i * 0.055}s` }}>{ch}</span>
        ))}
      </h1>

      <div className="sp-exams">
        {EXAMS.map((e, i) => (
          <span key={e.id} className="sp-chip" style={{ animationDelay: `${1.5 + i * 0.12}s` }}>
            <Icon name={e.icon} size={14} /> {e.id}
          </span>
        ))}
      </div>

      <div className="sp-loader">
        <div className="sp-loader-bar"><i style={{ width: `${pct}%` }} /></div>
        <div className="sp-loader-row"><span>Getting things ready</span><b>{pct}%</b></div>
      </div>

      <div className="splash-footer">© {new Date().getFullYear()} EliteScholars. All rights reserved.</div>
    </div>
  );
}

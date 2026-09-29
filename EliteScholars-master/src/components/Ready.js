import React, { useState, useEffect } from 'react';
import { getSubjectMeta } from '../data/subjectMeta';
import { ROUND_SIZE, getTimerSecs } from '../utils/constants';
import { GOLD, LGOLD, WHITE } from '../utils/colors';
import { SFX } from '../utils/sounds';

export default function Ready({ subjectId, onGo, onBack }) {
  const [count, setCount] = useState(3);
  const [offset, setOffset] = useState(283);
  const meta = getSubjectMeta(subjectId);

  useEffect(() => {
    const tick = (c) => {
      setCount(c);
      setOffset(283 * (1 - (4 - c) / 3));
      if (c === 0) {
        console.log('Countdown finished, calling onGo'); // Debug log
        setTimeout(onGo, 450);
        return;
      }
      SFX.select();
      setTimeout(() => tick(c - 1), 1000);
    };
    setTimeout(() => tick(3), 200);
  }, [onGo]); // Added onGo to dependencies

  return (
    <div className="scr fd ready-container">
      <button className="ready-back-btn" onClick={onBack}>
        ← Back
      </button>
      <div className="ready-icon">{meta.icon}</div>
      <div className="ready-timer-circle">
        <svg
          viewBox="0 0 100 100"
          width="140"
          height="140"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,.1)"
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={GOLD}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="ready-count">{count}</div>
      </div>
      <div className="ready-subject">{meta.label} — Get Ready! 🔥</div>
      <div className="ready-info">
        {ROUND_SIZE} questions · {getTimerSecs(subjectId, ROUND_SIZE)}s timer
        <br />
        Select → Submit → See explanation
      </div>
      <div className="ready-features">
        {['+10 pts correct', '50/50 lifeline', 'Hint lifeline', '🔊 Voice read'].map((t, i) => (
          <div
            key={i}
            className={`ready-feature ${i === 0 ? 'ready-feature-gold' : 'ready-feature-white'}`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

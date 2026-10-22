import React, { useState, useEffect } from 'react';
import { getFreeSessionConfig } from '../utils/entitlement';
import { getCooldownSecondsLeft } from '../utils/premium';
import PremiumModal from './PremiumModal';
import { EmojiIcon } from './Icon';

// ============================================================================
// FreeLimitGate — Shown when free user hits their daily/session limit.
// Displays countdown timer + option to go premium.
// ============================================================================

function fmtTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const fmtBreak = (m) => (m >= 120 && m % 60 === 0 ? `${m / 60} hours` : m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} minutes`);

export default function FreeLimitGate({ email, name, reason = 'session', onClose, onPremiumActivated }) {
  const [secsLeft, setSecsLeft]         = useState(() => getCooldownSecondsLeft(email));
  const [showPremium, setShowPremium]   = useState(false);

  useEffect(() => {
    if (secsLeft <= 0) return;
    const t = setInterval(() => {
      const s = getCooldownSecondsLeft(email);
      setSecsLeft(s);
      if (s <= 0) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, [email]);

  const COPY = {
    topics: { icon: '📚', title: 'Free topics used up for today', msg: "You've used your free topics for today. They come back tomorrow, or go Premium for unlimited topics." },
    cbt:    { icon: '📝', title: 'Free CBT sessions used up for today', msg: "You've used your free CBT practice sessions for today. They come back tomorrow, or go Premium for unlimited practice." },
    games:  { icon: '🎮', title: 'Free games used up for today', msg: "You've used your free games for today. They come back tomorrow, or go Premium for unlimited games." },
  };
  const daily = COPY[reason];
  const isCooldownDone = secsLeft <= 0;

  return (
    <>
      <div className="limit-gate-overlay">
        <div className="limit-gate-card">
          {/* Icon */}
          <div className="limit-gate-icon">{daily ? daily.icon : '⏱️'}</div>

          {/* Title */}
          <div className="limit-gate-title">
            {daily ? daily.title : "Session Time's Up!"}
          </div>

          {/* Message */}
          <div className="limit-gate-msg">
            {daily
              ? daily.msg
              : `Your free session has ended. Take a break and come back in ${fmtBreak(getFreeSessionConfig(email).cooldownMinutes)}, or upgrade now.`
            }
          </div>

          {/* Countdown */}
          {!daily && !isCooldownDone && secsLeft > 0 && (
            <div className="limit-gate-timer-wrap">
              <div className="limit-gate-timer-label">Time until you can continue:</div>
              <div className="limit-gate-timer">{fmtTime(secsLeft)}</div>
              <div className="limit-gate-timer-sub">CBT &amp; Learn Mode locked until then</div>
            </div>
          )}

          {!daily && isCooldownDone && (
            <div className="limit-gate-ready"><EmojiIcon emoji="✅" size="1.15em" /> You can continue now!</div>
          )}

          {/* Actions */}
          <button
            className="limit-gate-premium-btn"
            onClick={() => setShowPremium(true)}
          >
            ⭐ Go Premium — Remove All Limits
          </button>

          {!daily && isCooldownDone
            ? <button className="limit-gate-continue-btn" onClick={onClose}>Continue →</button>
            : <button className="limit-gate-close-btn" onClick={onClose}>Close</button>
          }
        </div>
      </div>

      {showPremium && (
        <PremiumModal
          email={email}
          name={name}
          onClose={() => setShowPremium(false)}
          onActivated={(data) => {
            setShowPremium(false);
            if (onPremiumActivated) onPremiumActivated(data);
            if (onClose) onClose();
          }}
        />
      )}
    </>
  );
}

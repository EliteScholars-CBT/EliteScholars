import React, { useState, useEffect } from 'react';
import { FREE_COOLDOWN_HOURS } from '../utils/constants';
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

  const isTopicLimit   = reason === 'topics';
  const isCooldownDone = secsLeft <= 0;

  return (
    <>
      <div className="limit-gate-overlay">
        <div className="limit-gate-card">
          {/* Icon */}
          <div className="limit-gate-icon">{isTopicLimit ? '📚' : '⏱️'}</div>

          {/* Title */}
          <div className="limit-gate-title">
            {isTopicLimit ? "Daily Topic Limit Reached" : "Session Time's Up!"}
          </div>

          {/* Message */}
          <div className="limit-gate-msg">
            {isTopicLimit
              ? `You've completed your free topics for today. Come back tomorrow or go Premium for unlimited access.`
              : `Your free session (${30}-min) has ended. Take a break and come back in ${FREE_COOLDOWN_HOURS} hours, or upgrade now.`
            }
          </div>

          {/* Countdown */}
          {!isCooldownDone && secsLeft > 0 && (
            <div className="limit-gate-timer-wrap">
              <div className="limit-gate-timer-label">Time until you can continue:</div>
              <div className="limit-gate-timer">{fmtTime(secsLeft)}</div>
              <div className="limit-gate-timer-sub">CBT &amp; Learn Mode locked until then</div>
            </div>
          )}

          {isCooldownDone && (
            <div className="limit-gate-ready"><EmojiIcon emoji="✅" size="1.15em" /> You can continue now!</div>
          )}

          {/* Actions */}
          <button
            className="limit-gate-premium-btn"
            onClick={() => setShowPremium(true)}
          >
            ⭐ Go Premium — Remove All Limits
          </button>

          {isCooldownDone
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

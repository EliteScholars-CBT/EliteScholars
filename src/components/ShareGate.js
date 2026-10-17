import React, { useState, useEffect, useRef } from 'react';
import { APP_URL, VIBES } from '../utils/constants';
import { GOLD, GREEN, DPURP, WHITE } from '../utils/colors';
import { EmojiIcon } from './Icon';

// ============================================================================
// ShareGate — Share to unlock the next quiz round.
// Separate timers: verification countdown (30s) vs quote display (3s).
// General exam tips shown — not JAMB-specific.
// ============================================================================

export default function ShareGate({ name, email, onUnlocked }) {
  const [sharing, setSharing] = useState(false);
  const [verifyCount, setVerify] = useState(30); // verification timer
  const [done, setDone] = useState(false);
  const [vibe] = useState(() => VIBES[Math.floor(Math.random() * VIBES.length)]);
  const [quoteVisible, setQVis] = useState(true);
  const quoteTimer = useRef(null);

  const shareText = `I'm seriously preparing for my exams on EliteScholars CBT! 🔥\n\nFree practice at ${APP_URL} — come join me!`;

  // Quote fades after 3 seconds (separate timer)
  useEffect(() => {
    quoteTimer.current = setTimeout(() => setQVis(false), 3000);
    return () => clearTimeout(quoteTimer.current);
  }, []);

  // Verification countdown — only starts after sharing
  useEffect(() => {
    if (!sharing) return;
    if (verifyCount <= 0) {
      setDone(true);
      setSharing(false);
      return;
    }
    const t = setTimeout(() => setVerify((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sharing, verifyCount]);

  const doShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    setSharing(true);
    setVerify(30);
    try {
      if (email) localStorage.removeItem(`ep_sharepending_${email}`);
    } catch {}
  };

  return (
    <div className="scr fd sharegate-container">
      <div className="sharegate-card">
        <div className="sharegate-icon"><EmojiIcon emoji="📤" size="1.1em" /></div>
        <div className="sharegate-title">Unlock Your Next Round</div>
        <div className="sharegate-subtitle">
          Share EliteScholars with your friends on WhatsApp to keep playing. 🔥
        </div>

        {/* Vibe quote — fades after 3s via separate timer */}
        {quoteVisible && (
          <div className="sharegate-vibe">
            <div className="sharegate-vibe-badge"><EmojiIcon emoji="✨" size="1.15em" /> FROM ELITE SCHOLARS</div>
            <div className="sharegate-vibe-text">"{vibe}"</div>
          </div>
        )}

        {!done ? (
          <>
            <button
              className={`sharegate-share-btn ${sharing ? 'sharegate-share-btn-disabled' : ''}`}
              onClick={doShare}
              disabled={sharing}
            >
              💬 {sharing ? `Verifying… ${verifyCount}s` : 'Share to WhatsApp Friends'}
            </button>

            {sharing && (
              <div className="sharegate-progress">
                <div
                  className="sharegate-progress-fill"
                  style={{ width: `${((30 - verifyCount) / 30) * 100}%` }}
                />
              </div>
            )}

            <button className="sharegate-locked-btn" disabled>
              🔒 Start Quiz — Share First
            </button>
          </>
        ) : (
          <div className="sharegate-unlocked">
            <div className="sharegate-success">
              <div className="sharegate-success-text"><EmojiIcon emoji="✅" size="1.15em" /> Unlocked!</div>
            </div>
            <button className="sharegate-start-btn" onClick={onUnlocked}>
              🚀 Start Quiz Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

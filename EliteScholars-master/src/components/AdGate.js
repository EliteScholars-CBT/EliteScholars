import React, { useState, useEffect } from 'react';
import { GOLD, DPURP, GREEN } from '../utils/colors';
import { triggerPopoverAd } from '../utils/ads';
import { POPOVER_AD_URL } from '../utils/constants';
import { trackEvent } from '../analytics/quizAnalytics';
import { EmojiIcon } from './Icon';

export default function AdGate({ name, email, totalSessions, onUnlocked }) {
  const [countdown, setCountdown] = useState(3);
  const [unlocked, setUnlocked] = useState(false);
  const [adTriggered, setAdTriggered] = useState(false);

  useEffect(() => {
    if (!adTriggered) {
      setAdTriggered(true);
      setTimeout(() => { triggerPopoverAd(); }, 300);
      trackEvent('ad_gate_shown', { name, email, totalSessions });
    }
  }, [name, email, totalSessions, adTriggered]);

  useEffect(() => {
    if (unlocked) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setUnlocked(true);
          trackEvent('ad_gate_completed', { name, email, totalSessions });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [unlocked, name, email, totalSessions]);

  const handleManualAd = () => { window.open(POPOVER_AD_URL, '_blank'); };
  const vibe = ['Thanks for supporting EliteScholars! 🎓', 'One quick ad keeps us running! 🙏', 'You\'re helping others learn for free! 💪', 'Almost there! Your next quiz awaits! 🔥'][Math.floor(Math.random() * 4)];

  return (
    <div className="scr fd adgate-container">
      <div className="adgate-card">
        <div className="adgate-icon"><EmojiIcon emoji="🎬" size="1.1em" /></div>
        <div className="adgate-title">Support EliteScholars</div>
        <div className="adgate-subtitle">{unlocked ? 'Thank you! Ready to continue!' : 'A quick ad helps keep this free for everyone'}</div>
        <div className="adgate-vibe"><div className="adgate-vibe-badge"><EmojiIcon emoji="✨" size="1.15em" /> FROM ELITE JAMB</div><div className="adgate-vibe-text">{vibe}</div></div>
        {!unlocked ? (
          <>
            <div className="adgate-countdown"><div className="adgate-countdown-label">Unlocks in</div><div className="adgate-countdown-number">{countdown}s</div><div className="adgate-countdown-hint">A new tab will open - close it to continue</div></div>
            <div className="adgate-progress"><div className="adgate-progress-fill" style={{ width: `${((3 - countdown) / 3) * 100}%` }} /></div>
            <button className="adgate-retry-btn" onClick={handleManualAd}><EmojiIcon emoji="🔄" size="1.15em" /> Click here if ad doesn't open</button>
            <button className="adgate-waiting-btn"><EmojiIcon emoji="🔒" size="1.15em" /> Waiting...</button>
          </>
        ) : (
          <div className="su"><div className="adgate-success"><div className="adgate-success-title"><EmojiIcon emoji="✅" size="1.15em" /> Thank You!</div><div className="adgate-success-text">Your support helps keep EliteScholars free</div></div><button className="adgate-continue-btn" onClick={() => onUnlocked(true)}><EmojiIcon emoji="🚀" size="1.15em" /> Continue to Quiz</button></div>
        )}
      </div>
    </div>
  );
}

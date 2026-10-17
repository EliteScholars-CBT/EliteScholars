import React, { useState, useEffect } from 'react';
import { loadXP, getLevel, getLevelTitle } from '../utils/xpManager';
import { EmojiIcon } from './Icon';

// ============================================================================
// XPBar — Displays user XP progress bar and level
// ============================================================================

export default function XPBar({ email, name, showLevel = true, compact = false }) {
  const [xpData, setXpData] = useState({ totalXP: 0, level: 1, currentXP: 0, nextLevelXP: 100 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) { setLoading(false); return; }
    const totalXP = loadXP(email);
    const levelInfo = getLevel(totalXP);
    setXpData({
      totalXP,
      level: levelInfo.level,
      currentXP: levelInfo.currentXP,
      nextLevelXP: levelInfo.nextLevelXP,
    });
    setLoading(false);
  }, [email]);

  if (loading) return <div className="xp-bar-skeleton" />;

  const progress = Math.min(100, Math.round((xpData.currentXP / xpData.nextLevelXP) * 100));
  const title = getLevelTitle(xpData.level);

  if (compact) {
    return (
      <div className="xp-bar-compact">
        <div className="xp-bar-compact-level">Lv.{xpData.level}</div>
        <div className="xp-bar-compact-progress">
          <div className="xp-bar-compact-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="xp-bar-compact-xp">{xpData.currentXP}/{xpData.nextLevelXP}</div>
      </div>
    );
  }

  return (
    <div className="xp-bar-container">
      {showLevel && (
        <div className="xp-bar-header">
          <div className="xp-bar-level">
            <span className="xp-icon"><EmojiIcon emoji="⭐" size="1.1em" /></span>
            <span>Level {xpData.level} · {title}</span>
          </div>
          <div className="xp-bar-total">{xpData.totalXP.toLocaleString()} XP</div>
        </div>
      )}
      <div className="xp-bar-progress">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="xp-bar-footer">
        <span>{xpData.currentXP} / {xpData.nextLevelXP} XP</span>
        <span>{xpData.nextLevelXP - xpData.currentXP} XP to next level</span>
      </div>
    </div>
  );
}

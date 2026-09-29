import React, { useEffect, useState } from 'react';

export default function XPPopup({ amount, onComplete, type = 'earn' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) setTimeout(onComplete, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`xp-popup ${type === 'earn' ? 'xp-earn' : 'xp-penalty'}`}>
      <div className="xp-popup-icon">{type === 'earn' ? '⭐' : '⚠️'}</div>
      <div className="xp-popup-amount">{type === 'earn' ? '+' : ''}{amount} XP</div>
    </div>
  );
}

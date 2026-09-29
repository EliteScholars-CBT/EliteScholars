import React, { useEffect } from 'react';
import Confetti from './Confetti';

const AchievementPopup = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="achievement-popup">
      <Confetti count={50} duration={2200} />
      <div className="achievement-popup-icon">{achievement.icon}</div>
      <div className="achievement-popup-content">
        <div className="achievement-popup-title">Achievement Unlocked!</div>
        <div className="achievement-popup-name">{achievement.name}</div>
        <div className="achievement-popup-desc">{achievement.desc}</div>
      </div>
    </div>
  );
};

export default AchievementPopup;

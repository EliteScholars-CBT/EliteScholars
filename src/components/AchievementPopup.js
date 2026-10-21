import React, { useEffect, useState } from 'react';
import Confetti from './Confetti';
import ShareSheet from './ShareSheet';
import { loadUser } from '../utils/storage';
import { buildReferralCode, referralLink } from '../utils/referral';

const AchievementPopup = ({ achievement, onClose }) => {
  const [sharing, setSharing] = useState(false);
  useEffect(() => {
    if (sharing) return undefined; // stay open while sharing
    const timer = setTimeout(() => {
      onClose();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onClose, sharing]);

  const u = loadUser() || {};
  const link = referralLink(buildReferralCode(u.username || u.name, u.email));
  const who = u.username || u.name || 'A Scholar';

  return (
    <div className="achievement-popup">
      <Confetti count={50} duration={2200} />
      <div className="achievement-popup-icon">{achievement.icon}</div>
      <div className="achievement-popup-content">
        <div className="achievement-popup-title">Achievement Unlocked!</div>
        <div className="achievement-popup-name">{achievement.name}</div>
        <div className="achievement-popup-desc">{achievement.desc}</div>
        <button onClick={() => setSharing(true)} style={{ marginTop: 8, padding: '7px 14px', borderRadius: 99, border: 0, background: '#FFC53D', color: '#2E1065', fontWeight: 800, fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer' }}>📤 Share this badge</button>
      </div>
      {sharing && (
        <ShareSheet
          card={{ kind: 'badge', icon: achievement.icon, big: achievement.name, headline: 'Achievement unlocked', sub: achievement.desc, name: who }}
          text={`${achievement.icon} I just unlocked "${achievement.name}" on EliteScholars!`}
          link={link}
          onClose={() => { setSharing(false); onClose(); }}
        />
      )}
    </div>
  );
};

export default AchievementPopup;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPendingChallenges } from '../utils/challengeApi';
import Icon from './Icon';

export default function ChallengeNotification({ userEmail, onClick }) {
  const [count, setCount]         = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [hiding, setHiding]       = useState(false);
  const countRef = useRef(0);

  const dismissPopup = useCallback(() => {
    setHiding(true);
    setTimeout(() => {
      setShowPopup(false);
      setHiding(false);
    }, 300); // matches challengeSlideOut duration
  }, []);

  const checkChallenges = useCallback(async () => {
    if (!userEmail) return;
    try {
      const pending  = await getPendingChallenges(userEmail);
      const newCount = Array.isArray(pending) ? pending.length : 0;
      if (newCount > countRef.current && newCount > 0) {
        setHiding(false);
        setShowPopup(true);
        setTimeout(() => dismissPopup(), 5000);
      }
      countRef.current = newCount;
      setCount(newCount);
    } catch {}
  }, [userEmail, dismissPopup]);

  useEffect(() => {
    if (!userEmail) return;
    checkChallenges();
    const interval = setInterval(checkChallenges, 30000);
    return () => clearInterval(interval);
  }, [userEmail, checkChallenges]);

  return (
    <>
      <button className="notification-bell" onClick={onClick} aria-label="Challenges">
        <Icon name="swords" size={22} />
        {count > 0 && <span className="notification-badge">{count}</span>}
      </button>

      {showPopup && (
        <div className={`notification-popup${hiding ? ' hiding' : ''}`}>
          <div className="popup-icon"><Icon name="swords" size={22} /></div>
          <div className="popup-text">
            <strong>New Challenge!</strong>
            <span>You have {count} pending challenge{count !== 1 ? 's' : ''}</span>
          </div>
          <button className="popup-dismiss" onClick={dismissPopup} aria-label="Dismiss"><Icon name="x" size={16} /></button>
        </div>
      )}
    </>
  );
}
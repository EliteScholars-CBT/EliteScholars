import React, { useState } from 'react';
import { GOLD, DPURP, WHITE } from '../utils/colors';
import { saveUser } from '../utils/storage';
import { trackEvent, getDeviceInfo } from '../analytics/quizAnalytics';
import { EmojiIcon } from './Icon';

export default function Onboard({ onDone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const submit = () => {
    if (!name.trim()) return alert('Please enter your name');
    const emailRx = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRx.test(email.trim())) return alert('Please enter a valid email address');
    saveUser({ name: name.trim(), email: email.trim() });
    trackEvent('register', { name: name.trim(), email: email.trim(), ...getDeviceInfo() });
    onDone(name.trim(), email.trim());
  };
  
  return (
    <div className="scr fd onboard-container">
      <div style={{ padding: '44px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div className="onboard-icon"><EmojiIcon emoji="🎓" size="1.1em" /></div>
        <div className="onboard-title">JAMB · WAEC · NECO<br /><span className="onboard-title-gold">All in one place.</span></div>
        <div className="onboard-subtitle">Free exam prep for POST UTME, WAEC, NECO, GST &amp; JAMB.</div>
        <div className="onboard-text">Enter your name and email to save your progress, streaks and achievements. No password needed.</div>
      </div>
      <div style={{ padding: '0 24px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input className="onboard-input" placeholder="Your first name" value={name} onChange={e => setName(e.target.value)} maxLength={30} />
        <input className="onboard-input" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="onboard-button" onClick={submit}>Let's Go →</button>
      </div>
    </div>
  );
}

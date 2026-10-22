import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { guidesPending } from './GuideHost';
import '../styles/tips.css';

// Little "did you know" pop-ups. One at a time, spaced out and in random order, so students learn the app
// bit by bit. Once a tip is dismissed (Understood or ✕) it never shows again.
const KEY = 'es_tips_v1';
const SHOW_ON = ['subjects', 'leaderboard', 'profile', 'shop', 'challenges'];
const H = 3600000;

const TIPS = [
  { id: 'squad', emoji: '👥', title: 'Did you know you can create a squad?', text: 'Open Leaderboard → My Squad. Study with friends, chat with them, and climb a shared leaderboard.' },
  { id: 'challenge', emoji: '⚔️', title: 'Challenge a friend', text: 'Send a quiz challenge to anyone on EliteScholars. They get a notification, and the winner earns bonus XP.' },
  { id: 'status', emoji: '📸', title: 'Post a status', text: 'Share a win with a photo, a template or Gen-Z stickers. It disappears after 24 hours — you choose who sees it.' },
  { id: 'read', emoji: '🔊', title: 'Let the lesson read to you', text: 'In any Learn topic tap Read. The words light up on the page as they are spoken.' },
  { id: 'files', emoji: '📄', title: 'Study from your own notes', text: 'Upload a PDF, Word file or photo of your notes and get simple study notes, flashcards and practice questions.' },
  { id: 'streak', emoji: '🔥', title: 'Keep your streak alive', text: 'Study a little every day. Turn on reminders in Profile and we will nudge you before the streak ends.' },
  { id: 'games', emoji: '🎮', title: 'Take a brain break', text: 'Game Mode has quick word and number games that still earn you XP.' },
  { id: 'report', emoji: '🚩', title: 'Spot a wrong question?', text: 'Tap the small flag on a question to report it. We check every report.' },
  { id: 'share', emoji: '🏆', title: 'Share your score card', text: 'After a quiz, share your result card on WhatsApp or save it, and invite friends to join you.' },
  { id: 'saver', emoji: '📶', title: 'Low on data?', text: 'Switch on Data Saver in Profile to use less data while you study.' },
  { id: 'school', emoji: '🏫', title: 'Teachers and classes', text: 'Join your class with a code from your teacher to get assignments. Teachers can create classes in Profile → School.' },
  { id: 'install', emoji: '📲', title: 'Add EliteScholars to your home screen', text: 'Open your browser menu and choose Add to Home screen. It opens like a normal app, even on slow networks.' },
];

const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const save = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch { /* ignore */ } };
const standalone = () => { try { return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone; } catch { return false; } };

export default function TipsHost({ screen, email }) {
  const [tip, setTip] = useState(null);
  const shownThisSession = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    if (shownThisSession.current || !SHOW_ON.includes(screen)) return undefined;
    if (guidesPending(email)) return undefined; // how-to guides go first; small tips follow later
    const st = load();
    const now = Date.now();
    if (st.nextAt && now < st.nextAt) return undefined; // not time yet
    const seen = st.seen || {};
    const pool = TIPS.filter((t) => !seen[t.id] && !(t.id === 'install' && standalone()));
    if (!pool.length) return undefined;
    // first tip comes quickly; later ones after a short pause on a main screen
    const wait = st.lastShown ? 6000 : 9000;
    timer.current = setTimeout(() => {
      if (shownThisSession.current) return;
      shownThisSession.current = true;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setTip(pick);
    }, wait);
    return () => clearTimeout(timer.current);
  }, [screen, email]);

  // leaving the main screens hides it without counting as dismissed
  useEffect(() => { if (tip && !SHOW_ON.includes(screen)) setTip(null); }, [screen, tip]);

  const dismiss = () => {
    if (!tip) return;
    const st = load();
    const now = Date.now();
    st.seen = { ...(st.seen || {}), [tip.id]: now };
    st.lastShown = now;
    st.nextAt = now + (6 + Math.random() * 42) * H; // next one in 6 to 48 hours
    save(st);
    setTip(null);
  };

  if (!tip) return null;
  return createPortal(
    <div className="tip-wrap" role="dialog" aria-label="Tip">
      <div className="tip-card">
        <button className="tip-x" onClick={dismiss} aria-label="Close tip">✕</button>
        <div className="tip-emoji">{tip.emoji}</div>
        <div className="tip-body">
          <b>{tip.title}</b>
          <p>{tip.text}</p>
          <button className="tip-ok" onClick={dismiss}>Understood</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../styles/guides.css';

// Step-by-step "how to" pop-ups. They teach the app bit by bit: never the first thing a student sees,
// one at a time, spaced out, and once a guide is acknowledged (Got it / ✕) it never shows again.
// During the first 3 days up to 2 guides can appear per visit; after that, 1.
const SUPPORT_EMAIL = 'elitescholars.site@gmail.com';
const H = 3600000;
const DAY = 24 * H;

export const GUIDES = [
  { id: 'squad', emoji: '👥', title: 'How to create or join a study squad', screens: ['leaderboard', 'subjects'], steps: ['Tap the 👥 squad card under the status circles, or open the Leaderboard tab and tap My Squad.', 'Create a squad with a name, or join a friend\'s squad with their code. You can be in up to 5 squads.', 'Tap the code to copy it, then share it with friends.', 'Use squad chat to talk. Green dots show who is online right now.'] },
  { id: 'learn', emoji: '📖', title: 'How to study a topic', screens: ['subjects'], steps: ['Pick your exam and a subject.', 'Open Learn and choose a topic.', 'Tap Read to hear the lesson. The words light up as they are spoken.', 'Finish the short quiz at the end to earn XP.'] },
  { id: 'lifelines', emoji: '💡', title: 'Stuck on a question? Use Hint and 50/50', screens: ['subjects'], steps: ['During a quiz, look for the two buttons above the question: ⚖️ 50/50 and 💡 Hint.', 'Tap 💡 Hint to see a clue that points you to the answer.', 'Tap ⚖️ 50/50 to remove two wrong options, so only two are left.', 'Each one can be used once per round, so save them for the hard questions.'], note: 'The 🔊 button reads each question aloud if you prefer to listen.' },
  { id: 'challenge', emoji: '⚔️', title: 'How to challenge a friend', screens: ['challenges', 'leaderboard', 'subjects'], steps: ['Open Challenges.', 'Search for your friend by username.', 'Pick a subject and send the challenge.', 'They get a notification. The winner earns bonus XP.'] },
  { id: 'files', emoji: '📄', title: 'How to study from your own notes', screens: ['subjects'], steps: ['Open Study from files on the subjects screen.', 'Upload a PDF, Word file or a photo of your notes.', 'Wait a moment while we turn it into simple notes.', 'Use the flashcards, games and practice questions made from it.'], note: 'Free students get a small number of uploads. Premium has more.' },
  { id: 'status', emoji: '📸', title: 'How to post and react to a status', screens: ['subjects', 'leaderboard'], steps: ['Tap the + circle at the top of the screen to post. Pick a template or photo, add text and stickers, and choose who can see it.', 'Tap a friend\'s circle to watch their status. React with 👍 ❤️ 🔥 👏 😮 or send a private reply.', 'Tap 🔁 on a public status to reshare it. It will show "Reshared from" their name.', 'Statuses disappear after 24 hours. You can also add your achievements and score cards to your status when you share them.'] },
  { id: 'guardian', emoji: '👨‍👩‍👧', title: 'How to add a parent or guardian', pro: true, screens: ['profile'], steps: ['Open Profile.', 'Find Guardian Weekly Report.', 'Type your parent or guardian\'s email and save.', 'They get a progress report card by email every Sunday.'] },
  { id: 'streak', emoji: '🔥', title: 'How to keep your streak', screens: ['profile', 'subjects'], steps: ['Do one short study session every day.', 'Turn on reminders in Profile.', 'We nudge you before the streak ends.'] },
  { id: 'school', emoji: '🏫', title: 'How to join a class', screens: ['profile'], steps: ['Ask your teacher for the class code.', 'Open Profile, then School.', 'Choose I\'m a student and enter the code.', 'Your homework appears there.'] },
  { id: 'shop', emoji: '🛍️', title: 'How to buy study materials', screens: ['shop'], steps: ['Open the Shop tab.', 'Tap an item and pay securely.', 'We email your item link as soon as the payment goes through.'] },
  { id: 'premium', emoji: '👑', title: 'What Premium gives you', pro: true, screens: ['shop', 'profile'], steps: ['Unlimited topics, CBT sessions and games.', 'No ads.', 'Guardian weekly report for your parent.', 'More study-from-file uploads.'] },
  { id: 'report', emoji: '🚩', title: 'How to report a wrong question', screens: ['subjects', 'leaderboard'], steps: ['While answering, tap the small flag on the question.', 'Pick what is wrong.', 'We check every report and fix it.'] },
];

const key = (email) => `es_guides_v1_${email || 'anon'}`;
const load = (email) => { try { return JSON.parse(localStorage.getItem(key(email)) || '{}'); } catch { return {}; } };
const save = (email, o) => { try { localStorage.setItem(key(email), JSON.stringify(o)); } catch { /* ignore */ } };

// Used by TipsHost: while guides are still being taught, small tips wait.
export function guidesPending(email) {
  const st = load(email);
  if (!st.firstSeen) return true;
  if (Date.now() - st.firstSeen > 14 * DAY) return false;
  return GUIDES.some((g) => !(st.seen || {})[g.id]);
}

export default function GuideHost({ screen, email, premium, onOpenShop }) {
  const [guide, setGuide] = useState(null);
  const shownCount = useRef(0);
  const lastShownAt = useRef(0);
  const sessionStart = useRef(Date.now());
  const timer = useRef(null);

  // remember the first time this student was seen (starts the 3-day window)
  useEffect(() => {
    if (!email) return;
    const st = load(email);
    if (!st.firstSeen) { st.firstSeen = Date.now(); save(email, st); }
  }, [email]);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!email || guide) return undefined;
    const st = load(email);
    if (!st.firstSeen) return undefined;
    const now = Date.now();
    const early = now - st.firstSeen < 3 * DAY;
    const maxPerSession = early ? 2 : 1;
    if (shownCount.current >= maxPerSession) return undefined;
    if (!early && st.nextAt && now < st.nextAt) return undefined;
    if (shownCount.current > 0 && now - lastShownAt.current < 3 * 60000) return undefined; // second one comes later
    const seen = st.seen || {};
    const pool = GUIDES.filter((g) => !seen[g.id] && g.screens.includes(screen));
    if (!pool.length) return undefined;
    // never the first thing on screen: wait ~45 seconds into the visit (and into the screen)
    const sinceStart = now - sessionStart.current;
    const wait = Math.max(25000, 45000 - sinceStart);
    timer.current = setTimeout(() => {
      const fresh = load(email);
      const left = GUIDES.filter((g) => !(fresh.seen || {})[g.id] && g.screens.includes(screen));
      if (!left.length) return;
      shownCount.current += 1; lastShownAt.current = Date.now();
      setGuide(left[0]);
    }, wait);
    return () => clearTimeout(timer.current);
  }, [screen, email, guide]);

  // leaving the screen hides it without counting it as read
  useEffect(() => { if (guide && !guide.screens.includes(screen)) setGuide(null); }, [screen, guide]);

  const close = () => {
    if (!guide) return;
    const st = load(email);
    const now = Date.now();
    st.seen = { ...(st.seen || {}), [guide.id]: now };
    st.nextAt = now + (4 + Math.random() * 8) * H;
    save(email, st);
    setGuide(null);
  };

  if (!guide) return null;
  const locked = guide.pro && !premium;
  return createPortal(
    <div className="gd-overlay" role="dialog" aria-modal="true" aria-label={guide.title} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="gd-card">
        <button className="gd-x" onClick={close} aria-label="Close">✕</button>
        <div className="gd-emoji" aria-hidden="true">{guide.emoji}</div>
        {guide.pro && <span className="gd-pro">PRO</span>}
        <h3>{guide.title}</h3>
        {locked && <p className="gd-lock">This is a Premium feature. You can read how it works now and unlock it any time.</p>}
        <ol className="gd-steps">{guide.steps.map((s, i) => <li key={i}><b>{i + 1}</b><span>{s}</span></li>)}</ol>
        {guide.note && <p className="gd-note">{guide.note}</p>}
        <div className="gd-help">
          Need help? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or read more on the <a href="/blog/" target="_blank" rel="noreferrer">blog</a>.
        </div>
        <div className="gd-actions">
          {locked && onOpenShop && <button className="gd-secondary" onClick={() => { close(); onOpenShop(); }}>See Premium</button>}
          <button className="gd-ok" onClick={close}>Got it</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

import React, { useEffect, useRef, useState } from 'react';
import LandingGamePreview from './LandingGamePreview';

// "What your students get": the SAME real app screenshots and the same animated phone frame used on the
// main landing page (/landing/m-*.webp, l2-phone, LandingGamePreview), so what visitors see is the real app.
const TABS = [
  { key: 'quiz', img: '/landing/m-quiz.webp', title: 'CBT practice', desc: 'Timed, exam-style questions for JAMB, WAEC and NECO, with 50/50 and hint lifelines and a quick take after every answer.' },
  { key: 'lesson', img: '/landing/m-lesson.webp', title: 'Learn mode', desc: 'Bite-sized notes, tables and tips for every topic. Tap Read and a voice reads the lesson aloud.' },
  { key: 'flash', img: '/landing/m-flash.webp', title: 'Flashcards', desc: 'Flip, mark what you know, and revise only what you need. Perfect for the night before an exam.' },
  { key: 'games', img: '/landing/m-games.webp', title: 'Games', desc: 'Word Scramble, Memory Match, Colour Memory and more. Revision that feels like play, and earns XP.' },
];

export default function StudentTour({ kind }) {
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const hold = useRef(null);
  useEffect(() => {
    if (!auto) return undefined;
    const t = setTimeout(() => setTab((x) => (x + 1) % TABS.length), TABS[tab].key === 'games' ? 6800 : 3800);
    return () => clearTimeout(t);
  }, [tab, auto]);
  useEffect(() => () => clearTimeout(hold.current), []);
  const pick = (i) => { setTab(i); setAuto(false); clearTimeout(hold.current); hold.current = setTimeout(() => setAuto(true), 12000); };

  return (
    <section className="st-wrap" id="students">
      <span className="mk-eyebrow">The student side</span>
      <h2>Your students get the full EliteScholars app too</h2>
      <p className="st-lead">{kind === 'centre'
        ? 'Between lessons, your students keep practising on their phones. This is the real app they use, so you can show parents the value.'
        : 'Beyond the work you set, students study and practise on their own phones. This is the real app they use.'}</p>
      <div className="st-grid">
        <div className="st-tabs" role="tablist">
          {TABS.map((f, i) => (
            <button key={f.key} type="button" role="tab" aria-selected={i === tab} className={`st-tab ${i === tab ? 'on' : ''}`} onClick={() => pick(i)}>
              <b>{f.title}</b>
              <em>{f.desc}</em>
              {i === tab && auto && <i key={tab} className="st-bar" style={{ animationDuration: `${f.key === 'games' ? 6800 : 3800}ms` }} />}
            </button>
          ))}
        </div>
        <div className="l2-tour-stage">
          <div className="l2-tour-glow" aria-hidden="true" />
          <div className="l2-phone l2-tour-phone">
            <i className="l2-phone-btn" />
            <div className="l2-phone-screen">
              <span className="l2-phone-notch" />
              {TABS.map((f, i) => (f.key === 'games'
                ? <div key={f.key} className={`l5-gp-wrap ${i === tab ? 'on' : ''}`}><LandingGamePreview active={i === tab} base={f.img} /></div>
                : <div key={f.key} className={`l6-pan ${i === tab ? 'on' : ''}`}><img src={f.img} alt={f.title} loading="lazy" draggable="false" /></div>
              ))}
              <i className="l6-tap" key={`tap${tab}`} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

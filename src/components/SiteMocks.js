import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/elite-scholars-logo.png';
import '../styles/sitemocks.css';

// Illustrative device mock-ups for the /school and /centre pages. They are built from HTML and CSS (not photos),
// show the real layout of the app and portal with sample data, and replay a short animation while on screen.

// Replays its children's one-shot animations every `ms`, only while the element is on screen.
function Loop({ ms = 9000, children }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setOn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!on) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const t = setInterval(() => setN((x) => x + 1), ms);
    return () => clearInterval(t);
  }, [on, ms]);
  return <div ref={ref} className="mk-loop"><div className="mk-scene" key={on ? n : 'idle'}>{on ? children : children}</div></div>;
}

export function Phone({ children, ms }) {
  return (
    <div className="mk-phone"><i className="mk-notch" /><div className="mk-pscreen"><Loop ms={ms}>{children}</Loop></div></div>
  );
}

export function Laptop({ children, ms }) {
  const wrap = useRef(null); const [k, setK] = useState(1);
  useEffect(() => {
    const el = wrap.current; if (!el) return undefined;
    const fit = () => setK(Math.min(1, el.clientWidth / 640));
    fit();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect();
  }, []);
  return (
    <div className="mk-laptop" ref={wrap}>
      <div className="mk-lbox" style={{ height: 400 * k + 14 }}>
        <div className="mk-lscreen" style={{ transform: `scale(${k})` }}>
          <div className="mk-bar"><i /><i /><i /><span>elitescholars.site/school-portal</span></div>
          <Loop ms={ms}>{children}</Loop>
        </div>
      </div>
      <div className="mk-lbase" />
    </div>
  );
}

const A = ({ d = 0, t = 'pop', className = '', children, style }) => <div className={`mk-a mk-t-${t} ${className}`} style={{ '--d': `${d}s`, ...style }}>{children}</div>;
const Logo = ({ size = 34, school = 'GC' }) => <span className="mk-logo" style={{ width: size, height: size, fontSize: size * 0.4 }}>{school}</span>;

/* ── phone: a school notice reaches students ──────────────────────────────── */
export function NoticePhone({ school = 'Greenfield College', initials = 'GC', text = 'Mock exam this Saturday, 9am. Bring your calculator and student ID.', tag = 'Official notice' }) {
  return (
    <Phone>
      <div className="mk-app">
        <div className="mk-apphead"><img src={logo} alt="" /><b>EliteScholars</b></div>
        <div className="mk-stories">
          <A d={1.2} t="pulse" className="mk-story"><span className="mk-ring"><Logo size={40} school={initials} /><em>✓</em></span><small>{school.split(' ')[0]}</small></A>
          {['You', 'Ada', 'Bayo', 'Tolu'].map((n, i) => <div className="mk-story" key={n}><span className="mk-ring seen"><span className="mk-av" style={{ background: ['#6366F1', '#F59E0B', '#10B981', '#EC4899'][i] }}>{n[0]}</span></span><small>{n}</small></div>)}
        </div>
        <A d={3.4} t="rise" className="mk-notice"><div className="mk-nhead"><Logo size={26} school={initials} /><div><b>{school}</b><small>{tag} · just now</small></div></div><p>{text}</p><span className="mk-react">👍 24 &nbsp; 🔥 9</span></A>
        <A d={0.3} t="drop" className="mk-push"><Logo size={26} school={initials} /><div><b>📢 {school}</b><small>{text.slice(0, 46)}…</small></div></A>
        <div className="mk-skel"><i /><i /><i /></div>
      </div>
    </Phone>
  );
}

/* ── phone: a test the student takes ──────────────────────────────────────── */
export function QuizPhone({ title = 'JAMB Mock 3 · Biology', q = 'Which gas do plants take in for photosynthesis?', opts = ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], score = 86 }) {
  return (
    <Phone>
      <div className="mk-app mk-quiz">
        <div className="mk-qhead"><b>{title}</b><span className="mk-timer"><i /></span></div>
        <div className="mk-qprog"><i /></div>
        <A d={0.4} t="rise" className="mk-qtext">{q}</A>
        {opts.map((o, i) => (
          <A d={0.8 + i * 0.18} t="rise" key={o}><div className={`mk-opt ${i === 1 ? 'pick' : ''}`}><span>{'ABCD'[i]}</span>{o}</div></A>
        ))}
        <A d={4.6} t="pop" className="mk-result"><div className="mk-score"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" /><circle className="arc" cx="40" cy="40" r="34" /></svg><b>{score}%</b></div><strong>Well done!</strong><small>Your teacher can see your score</small><div className="mk-dots"><i /><i /><i /><i /><i /><i /></div></A>
      </div>
    </Phone>
  );
}

/* ── laptop: the school's results dashboard ───────────────────────────────── */
export function ReportLaptop({ school = 'Greenfield College' }) {
  const bars = [52, 61, 58, 70, 74, 81];
  const rows = [['Ada Obi', 84, 'ok'], ['Chidi Okafor', 71, 'ok'], ['Tolu Bello', 46, 'watch'], ['Zainab Musa', 33, 'high']];
  return (
    <Laptop>
      <div className="mk-portal">
        <div className="mk-side"><b>{school}</b>{['Overview', 'Classes', 'Notices', 'Mock exams', 'Reports'].map((t, i) => <span key={t} className={i === 4 ? 'on' : ''}>{t}</span>)}</div>
        <div className="mk-main">
          <div className="mk-tiles">
            {[['78%', 'Average score'], ['1,240', 'Quizzes taken'], ['91%', 'Took part'], ['6', 'Need help']].map(([v, l], i) => <A d={0.2 + i * 0.12} t="rise" key={l} className="mk-tile"><b>{v}</b><small>{l}</small></A>)}
          </div>
          <div className="mk-charts">
            <div className="mk-card"><small>Scores by week</small><div className="mk-bars">{bars.map((h, i) => <A d={0.9 + i * 0.12} t="grow" key={i} style={{ height: `${h}%` }} className="mk-bar1" />)}</div></div>
            <div className="mk-card"><small>Trend</small><svg viewBox="0 0 120 60" className="mk-line"><path d="M4 48 C 24 44, 34 30, 54 32 S 90 14, 116 8" /></svg></div>
          </div>
          <div className="mk-card mk-table">
            {rows.map(([n, s, r], i) => <A d={2 + i * 0.25} t="rise" key={n} className="mk-trow"><span>{n}</span><b>{s}%</b><em className={r}>{r === 'ok' ? 'On track' : r === 'watch' ? 'Watch' : 'Needs help'}</em></A>)}
          </div>
          <A d={4} t="pulse" className="mk-wa">Share on WhatsApp</A>
        </div>
      </div>
    </Laptop>
  );
}

/* ── laptop: upload a class from Excel ────────────────────────────────────── */
export function UploadLaptop({ school = 'Greenfield College' }) {
  const names = ['Ada Obi', 'Chidi Okafor', 'Tolu Bello', 'Zainab Musa', 'Emeka Eze', 'Funke Ade', 'Ibrahim Sani'];
  return (
    <Laptop>
      <div className="mk-portal">
        <div className="mk-side"><b>{school}</b>{['Overview', 'Classes', 'Students', 'Notices', 'Reports'].map((t, i) => <span key={t} className={i === 2 ? 'on' : ''}>{t}</span>)}</div>
        <div className="mk-main">
          <div className="mk-card mk-drop"><A d={0.4} t="slide" className="mk-file"><span>📄</span><div><b>JSS3-students.xlsx</b><small>42 names found</small></div></A></div>
          <div className="mk-card mk-names">
            {names.map((n, i) => <A d={1.6 + i * 0.28} t="rise" key={n} className="mk-nrow"><span>{n}</span><em>login ready ✓</em></A>)}
          </div>
          <A d={4.2} t="pop" className="mk-toast">✅ 42 accounts created · <u>Print logins</u></A>
        </div>
      </div>
    </Laptop>
  );
}

/* ── laptop: set a test (own questions or EliteScholars questions) ────────── */
export function EditorLaptop({ school = 'Greenfield College' }) {
  return (
    <Laptop>
      <div className="mk-portal">
        <div className="mk-side"><b>{school}</b>{['Overview', 'Classes', 'Notices', 'Tests & mocks', 'Reports'].map((t, i) => <span key={t} className={i === 3 ? 'on' : ''}>{t}</span>)}</div>
        <div className="mk-main">
          <div className="mk-card">
            <div className="mk-seg"><span className="a">EliteScholars questions</span><span className="b">My own questions</span><i /></div>
            <A d={1.6} t="rise" className="mk-qbox"><small>Question 1</small><div className="mk-type"><span>What is the SI unit of force?</span></div></A>
            {['Joule', 'Newton', 'Watt'].map((o, i) => <A d={2.6 + i * 0.25} t="rise" key={o}><div className="mk-oline"><span className={i === 1 ? 'tick' : ''}>{'ABC'[i]}</span>{o}</div></A>)}
          </div>
          <A d={4.2} t="press" className="mk-sched">Schedule and notify students</A>
          <A d={5.2} t="pop" className="mk-toast">✓ Scheduled · 42 students notified</A>
        </div>
      </div>
    </Laptop>
  );
}

/* a scene = text beside a device */
export function Scene({ flip, eyebrow, title, text, bullets, children }) {
  return (
    <section className={`mk-sceneRow ${flip ? 'flip' : ''}`}>
      <div className="mk-copy">
        {eyebrow && <span className="mk-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{text}</p>
        {bullets && <ul>{bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
      </div>
      <div className="mk-device">{children}</div>
    </section>
  );
}

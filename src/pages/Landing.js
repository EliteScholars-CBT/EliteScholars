import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import logo from '../assets/elite-scholars-logo.png';
import { captureReferralFromURL } from '../utils/referral';
import { captureTrafficSource } from '../utils/trafficSource';
import { WA_CHANNEL } from '../utils/constants';
import '../styles/landing.css';
import '../styles/landing2.css';

// ============================================================================
// Landing — the marketing site at the root domain. The actual product lives
// at /app (see src/index.js). If this loads inside an already-installed PWA
// shell, it skips straight to /app — there's no reason to show a sales page
// to someone who already has the app on their home screen.
// ============================================================================

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true);

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

const STEPS = [
  { n: '01', title: 'Pick your exam', desc: "WAEC, NECO, JAMB or GST — choose what you're preparing for." },
  { n: '02', title: 'Study your way', desc: 'CBT drills, bite-sized lessons, flashcards, arcade games, or upload your own notes.' },
  { n: '03', title: 'Track your progress', desc: 'Watch your XP, streak and scores climb, and see exactly where you still need work.' },
];

const EXAMS = ['WAEC', 'NECO', 'JAMB', 'GST'];

const ROTATE_WORDS = ['WAEC', 'NECO', 'JAMB', 'GST'];

const SHOTS = [
  { key: 'subjects', img: '/landing/m-subjects.webp', icon: 'clipboard', title: 'CBT Practice', desc: 'Real exam-style questions for WAEC, NECO, JAMB and GST — timed like the real thing, with instant explanations.' },
  { key: 'quiz', img: '/landing/m-quiz.webp', icon: 'target', title: 'Instant Answers', desc: 'Tap, submit, learn. Every question comes with a quick take that explains why — so you never repeat a mistake.' },
  { key: 'lesson', img: '/landing/m-lesson.webp', icon: 'bookOpen', title: 'Bite-sized Lessons', desc: 'Topics broken into clear notes, tables and tips. Tap Read and a voice reads the lesson to you, word by word.' },
  { key: 'games', img: '/landing/m-games.webp', icon: 'gamepad', title: '6 Arcade Games', desc: 'Word Scramble, Memory Match, Picture Round, Colour Memory, Word Slice and Sort Rush. Learning that feels like play.' },
  { key: 'flash', img: '/landing/m-flash.webp', icon: 'cards', title: 'Flashcards', desc: 'Flip, mark what you know, and revise only what you need. Fast, focused and perfect for the night before.' },
  { key: 'status', img: '/landing/m-status.webp', icon: 'chat', title: 'Status & Squads', desc: 'Post a 24-hour status for just yourself, your squad or everyone, and see what your classmates are up to.' },
  { key: 'share', img: '/landing/m-share.webp', icon: 'share', title: 'Share Your Wins', desc: 'Every score and badge becomes a ready-made picture you can share anywhere or download, with your invite link on it.' },
  { key: 'me', img: '/landing/m-me.webp', icon: 'trophy', title: 'XP, Streaks & Ranks', desc: 'Earn XP for everything you do, build a daily streak and climb the leaderboard against friends and squads.' },
];

const BENEFITS = [
  { icon: 'trending', title: 'Score higher', desc: 'Practise the exact style of questions you will meet, then fix weak spots before exam day.' },
  { icon: 'timer', title: 'Just 15 minutes a day', desc: 'Short lessons and quick quizzes fit between classes, chores and errands.' },
  { icon: 'wifiOff', title: 'Study with no data', desc: 'Load once and keep studying offline. Progress syncs the moment you are back online.' },
  { icon: 'flame', title: 'Stay consistent', desc: 'Streaks, XP and rewards make daily study a habit, not a struggle.' },
  { icon: 'users', title: 'Learn with friends', desc: 'Challenge classmates, join a squad and push each other up the ranks.' },
  { icon: 'upload', title: 'Your notes, upgraded', desc: 'Upload a PDF or DOCX and get simple-language lessons, flashcards and questions.' },
  { icon: 'gift', title: 'Free to start', desc: 'Begin with no payment and no card. Go Premium later for ₦3,000 a year.' },
  { icon: 'rocket', title: 'Installs in seconds', desc: 'Add it to your home screen straight from the browser. No app store, no big download.' },
];

const MORE = [
  { icon: 'bell', title: 'Daily streak reminders', desc: 'A gentle push notification when your streak is at risk, so you never lose it by accident.' },
  { icon: 'clipboard', title: 'Assignments from teachers', desc: 'Your teacher posts homework with pictures. You get a notification and tick it off when done.' },
  { icon: 'chat', title: '24-hour status', desc: 'Share a thought, a win or a study goal. Choose Only me, My squad or Everyone.' },
  { icon: 'share', title: 'Shareable score and badge cards', desc: 'Beautiful pictures with your invite link. Share to WhatsApp or anywhere, or download.' },
  { icon: 'wand', title: 'Study from your own files', desc: 'Upload notes and get them rewritten in simple words, with flashcards and questions.' },
  { icon: 'flag', title: 'Report a wrong question', desc: 'Spot a mistake? One tiny tap and our team reviews it. Questions keep getting better.' },
  { icon: 'wifiOff', title: 'Data saver mode', desc: 'Turn off sounds and heavy effects to save data and battery on any phone.' },
  { icon: 'gem', title: 'Elite badge', desc: 'Premium students wear a gold Spartan badge on their profile, status and leaderboard rank.' },
];

const SCHOOL_POINTS = [
  'Create a class in seconds and share a 6-letter code. Students join from their own phones.',
  'Post assignments with instructions and pictures. Every student gets a notification.',
  'See each student\'s average score, streak, last active day and weakest subjects.',
  'Know who has finished each assignment, at a glance.',
  'Free for teachers and students. Works with JAMB, WAEC, NECO and GST practice.',
];

const PARENT_POINTS = [
  { icon: 'mail', title: 'Weekly report card', desc: 'Add a parent or guardian email and they get a simple progress report every Sunday: scores, streak and weak subjects.' },
  { icon: 'shield', title: 'Safe by design', desc: 'No ads inside the practice app, no chat with strangers, and statuses are private unless your child chooses otherwise.' },
  { icon: 'bell', title: 'Habit, not pressure', desc: 'Short daily sessions and streak reminders build steady revision instead of last-minute cramming.' },
  { icon: 'coins', title: 'Affordable', desc: 'Start free. Premium is ₦3,000 for a whole year, far cheaper than one lesson.' },
];

const DEMO_QS = [
  { q: 'Which organelle is called the powerhouse of the cell?', o: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'], a: 1, why: 'Mitochondria release energy from food through respiration.' },
  { q: 'The SI unit of force is the…', o: ['Joule', 'Watt', 'Newton', 'Pascal'], a: 2, why: 'Force is measured in newtons (N).' },
  { q: 'Choose the correct word: "The committee ___ its decision."', o: ['have announced', 'has announced', 'are announcing', 'were announce'], a: 1, why: 'A collective noun usually takes a singular verb in formal English.' },
];

const FAQ = [
  { q: 'Can my school or teacher use EliteScholars?', a: 'Yes. Any teacher can create a class, share the class code, set assignments with pictures and see how every student is doing. Students get a notification for each new assignment.' },
  { q: 'Can parents follow their child\'s progress?', a: 'Yes. Students add a parent or guardian email in their profile and the parent receives a weekly progress report by email every Sunday.' },
  { q: 'Is EliteScholars really free?', a: 'Yes. You can start studying for free with daily limits. Premium removes the limits and costs ₦3,000 for a full year.' },
  { q: 'Does it work without data?', a: 'Yes. Once your content has loaded, topics, flashcards and quizzes keep working offline, and your progress syncs when you reconnect.' },
  { q: 'Which exams are covered?', a: 'WAEC, NECO, JAMB and GST, with lessons, past-question style practice, flashcards and games.' },
  { q: 'Do I need to download it from an app store?', a: 'No. Open it in your browser and tap Install or Add to Home Screen. It opens like any other app.' },
  { q: 'What happens to the notes I upload?', a: 'They are processed on your own phone. Nothing from your file is sent to our servers.' },
];

function useCountUp(target, run, ms = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

function Stat({ value, suffix = '', label }) {
  const [ref, visible] = useReveal();
  const n = useCountUp(value, visible);
  return (
    <div ref={ref} className="l2-stat">
      <b>{n.toLocaleString()}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`l2-phone ${className}`}>
      <i className="l2-phone-btn" />
      <div className="l2-phone-screen">
        <span className="l2-phone-notch" />
        <img src={src} alt={alt} loading="lazy" draggable="false" />
      </div>
    </div>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATE_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="l2-rot" aria-live="polite">
      {ROTATE_WORDS.map((w, k) => (
        <span key={w} className={`l2-rot-w ${k === i ? 'on' : k === (i + ROTATE_WORDS.length - 1) % ROTATE_WORDS.length ? 'off' : ''}`}>{w}</span>
      ))}
    </span>
  );
}

function TryIt({ onStart }) {
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [xp, setXp] = useState(0);
  const [pop, setPop] = useState(0);
  const q = DEMO_QS[qi % DEMO_QS.length];
  const answered = picked !== null;
  const pick = (k) => {
    if (answered) return;
    setPicked(k);
    if (k === q.a) { setXp((v) => v + 10); setPop((v) => v + 1); }
  };
  const next = () => { setPicked(null); setQi((v) => v + 1); };
  return (
    <div className="l2-try">
      <div className="l2-try-top">
        <span className="l2-try-tag"><Icon name="clipboard" size={13} /> Live demo</span>
        <span className="l2-try-xp"><Icon name="zap" size={13} /> {xp} XP{pop > 0 && <i key={pop} className="l2-xp-pop">+10</i>}</span>
      </div>
      <h3 className="l2-try-q">{q.q}</h3>
      <div className="l2-try-opts">
        {q.o.map((t, k) => {
          const state = !answered ? '' : k === q.a ? 'right' : k === picked ? 'wrong' : 'dim';
          return (
            <button key={t} className={`l2-opt ${state}`} onClick={() => pick(k)} disabled={answered}>
              <b>{'ABCD'[k]}</b>{t}
            </button>
          );
        })}
      </div>
      <div className={`l2-try-why ${answered ? 'show' : ''}`}>
        {answered && (<><strong>{picked === q.a ? 'Correct!' : 'Not quite.'}</strong> {q.why}</>)}
      </div>
      <div className="l2-try-foot">
        {answered
          ? (qi % DEMO_QS.length === DEMO_QS.length - 1
            ? <button className="land-btn-primary" onClick={onStart}>Continue in the app <Icon name="arrowRight" size={16} /></button>
            : <button className="land-btn-primary" onClick={next}>Next question <Icon name="arrowRight" size={16} /></button>)
          : <span className="l2-try-hint">Tap an answer</span>}
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [shopItems, setShopItems] = useState([]);
  useEffect(() => {
    let off = false;
    fetch('/api/site/shop?where=landing').then((r) => (r.ok ? r.json() : null)).then((j) => { if (!off && j && Array.isArray(j.items)) setShopItems(j.items.slice(0, 8)); }).catch(() => {});
    return () => { off = true; };
  }, []);
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    let off = false;
    fetch('/blog/latest.json').then((r) => (r.ok ? r.json() : [])).then(async (j) => {
      if (off || !Array.isArray(j)) return;
      let covers = {};
      try { const c = await fetch('/api/site/blog-covers').then((r) => (r.ok ? r.json() : null)); covers = (c && c.covers) || {}; } catch { /* generated covers are used */ }
      if (!off) setBlogPosts(j.slice(0, 5).map((p) => ({ ...p, cover: covers[p.id] || p.cover })));
    }).catch(() => {});
    return () => { off = true; };
  }, []);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const [faq, setFaq] = useState(0);

  useEffect(() => {
    captureReferralFromURL();
    captureTrafficSource();
    if (isStandalone()) { navigate('/app', { replace: true }); return undefined; }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollY(y);
        setProgress(max > 0 ? y / max : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Feature tour auto-advances until the visitor takes over
  useEffect(() => {
    if (!auto) return undefined;
    const t = setInterval(() => setTab((v) => (v + 1) % SHOTS.length), 4800);
    return () => clearInterval(t);
  }, [auto]);

  const onHeroMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
    setSpot({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });
  };

  const goApp = (source) => navigate(`/app?src=${source}`);

  return (
    <div className="land">
      <div className="l2-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="land-nav">
        <div className="land-nav-inner">
          <div className="land-brand">
            <img src={logo} alt="EliteScholars" className="land-brand-logo" />
            <span>EliteScholars</span>
          </div>
          <div className="land-nav-links">
            <a href="#tour">Features</a>
            <a href="#try">Try it</a>
            <a href="#benefits">Benefits</a>
            <a href="#schools">Schools</a>
            <a href="#parents">Parents</a>
            <a href="#faq">FAQ</a>
            <a href="/blog/">Blog</a>
          </div>
          <button className="land-nav-cta" onClick={() => goApp('nav')}>Open App</button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header
        className="land-hero l2-hero"
        ref={heroRef}
        onMouseMove={onHeroMove}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setSpot({ x: 50, y: 30 }); }}
      >
        <div className="land-hero-bg" aria-hidden="true">
          <i className="blob b1" style={{ transform: `translate(${scrollY * 0.12 + tilt.x * -20}px, ${scrollY * 0.22 + tilt.y * -20}px)` }} />
          <i className="blob b2" style={{ transform: `translate(${scrollY * -0.08 + tilt.x * 24}px, ${scrollY * 0.15 + tilt.y * 24}px)` }} />
          <i className="blob b3" style={{ transform: `translate(${tilt.x * 14}px, ${scrollY * 0.1 + tilt.y * 14}px)` }} />
          <div className="land-grid" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
          <div className="l2-spot" style={{ left: `${spot.x}%`, top: `${spot.y}%` }} />
          {['A+', '∑', '✎', '⚡', '🏆', '✓'].map((g, k) => <span key={g} className={`l2-conf c${k}`}>{g}</span>)}
        </div>

        <div className="land-hero-content">
          <span className="land-pill"><Icon name="sparkles" size={13} /> 6 arcade games · offline mode · study from your own notes</span>
          <h1>
            Ace <RotatingWord /> <br />
            <span className="land-gold">the fun way</span>
          </h1>
          <p className="land-hero-sub">
            Practice questions, bite-sized lessons, flashcards, games and friend challenges in one
            app. Upload your notes and get an instant study pack. Keeps working even when your data runs out.
          </p>
          <div className="land-hero-ctas">
            <button className="land-btn-primary l2-shine" onClick={() => goApp('hero')}>
              Start Studying Free <Icon name="arrowRight" size={17} />
            </button>
            <a className="land-btn-ghost" href="#try">Try a question now</a>
          </div>
          <div className="land-trust-row">
            <Icon name="wifi" size={14} /> <span>Works offline</span>
            <span className="dot" />
            <Icon name="download" size={14} /> <span>Installs in seconds</span>
            <span className="dot" />
            <Icon name="gift" size={14} /> <span>Free to start</span>
          </div>
        </div>

        <div
          className="l2-hero-device"
          style={{ transform: `perspective(1100px) rotateY(${tilt.x * -10}deg) rotateX(${tilt.y * 8}deg) translateY(${scrollY * -0.05}px)` }}
        >
          <PhoneFrame className="l2-hero-phone" src="/landing/m-subjects.webp" alt="EliteScholars subjects screen" />
          <PhoneFrame className="l2-hero-phone second" src="/landing/m-quiz.webp" alt="EliteScholars quiz answer feedback" />
          <div className="land-float-badge fb1"><Icon name="zap" size={14} /> +10 XP</div>
          <div className="land-float-badge fb2"><Icon name="flame" size={14} /> 7-day streak</div>
          <div className="land-float-badge fb3"><Icon name="check" size={14} /> Correct!</div>
        </div>
      </header>

      {/* ── Marquee ─────────────────────────────────────────────────────── */}
      <div className="l2-marquee" aria-hidden="true">
        <div className="l2-marquee-track">
          {[0, 1].map((r) => (
            <div className="l2-marquee-row" key={r}>
              {['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Government', 'Literature', 'Accounting', 'Geography', 'Commerce', 'GST'].map((w) => <span key={w + r}>{w}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="l2-stats">
        <Stat value={50000} suffix="+" label="practice questions" />
        <Stat value={5} label="major exams covered" />
        <Stat value={6} label="arcade games" />
        <Stat value={0} suffix=" data" label="needed once loaded" />
      </section>

      {/* ── Feature tour ────────────────────────────────────────────────── */}
      <section className="land-section l2-tour" id="tour">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">See it in action</span>
          <h2>Everything you need, one tap away</h2>
          <p>Real screens from the real app. Tap a feature to take a look.</p>
        </Reveal>
        <div className="l2-tour-grid">
          <div className="l2-tour-list" role="tablist">
            {SHOTS.map((f, i) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={i === tab}
                className={`l2-tour-item ${i === tab ? 'on' : ''}`}
                onClick={() => { setTab(i); setAuto(false); }}
              >
                <span className="l2-tour-ico"><Icon name={f.icon} size={20} /></span>
                <span className="l2-tour-txt"><b>{f.title}</b><em>{f.desc}</em></span>
                {i === tab && auto && <i className="l2-tour-bar" />}
              </button>
            ))}
          </div>
          <div className="l2-tour-stage">
            <div className="l2-tour-glow" aria-hidden="true" />
            <div className="l2-phone l2-tour-phone">
              <i className="l2-phone-btn" />
              <div className="l2-phone-screen">
                <span className="l2-phone-notch" />
                {SHOTS.map((f, i) => (
                  <img key={f.key} className={i === tab ? 'on' : ''} src={f.img} alt={f.title} loading="lazy" draggable="false" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Laptop / all devices ────────────────────────────────────────── */}
      <section className="land-section l2-devices">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Any screen</span>
          <h2>On your phone, your tablet or your laptop</h2>
          <p>Open it in any browser and pick up exactly where you stopped. Your XP and progress follow you.</p>
        </Reveal>
        <Reveal className="l2-laptop-wrap">
          <div className="l2-laptop">
            <div className="l2-laptop-lid">
              <div className="l2-laptop-screen">
                <img src="/landing/m-subjects.webp" alt="Subjects" loading="lazy" />
                <img src="/landing/m-lesson.webp" alt="Lesson" loading="lazy" className="mid" />
                <img src="/landing/m-games.webp" alt="Games" loading="lazy" />
              </div>
            </div>
            <div className="l2-laptop-base"><i /></div>
          </div>
          <PhoneFrame className="l2-laptop-phone" src="/landing/m-shop.webp" alt="EliteScholars on a phone" />
        </Reveal>
      </section>

      {/* ── Try it ──────────────────────────────────────────────────────── */}
      <section className="land-section l2-tryit" id="try">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Don't just read about it</span>
          <h2>Try a question right now</h2>
          <p>This is how every question feels inside the app: tap, get instant feedback, earn XP.</p>
        </Reveal>
        <Reveal><TryIt onStart={() => goApp('demo')} /></Reveal>
      </section>

      {/* ── Benefits ────────────────────────────────────────────────────── */}
      <section className="land-section" id="benefits">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Why students love it</span>
          <h2>Made for real student life</h2>
          <p>Built in Nigeria for Nigerian students: low data, busy schedules and big exams.</p>
        </Reveal>
        <div className="l2-benefits">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} className="l2-benefit" delay={(i % 4) * 70}>
              <span className="l2-benefit-ico"><Icon name={b.icon} size={20} /></span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── More features ───────────────────────────────────────────────── */}
      <section className="land-section" id="more">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">New</span>
          <h2>More ways to stay ahead</h2>
          <p>Reminders, assignments, status updates, shareable cards and more, all built in.</p>
        </Reveal>
        <div className="l2-benefits">
          {MORE.map((b, i) => (
            <Reveal key={b.title} className="l2-benefit" delay={(i % 4) * 70}>
              <span className="l2-benefit-ico"><Icon name={b.icon} size={20} /></span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Schools & teachers ──────────────────────────────────────────── */}
      <section className="land-section l3-aud" id="schools">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">For schools and teachers</span>
          <h2>Run your class from your phone</h2>
          <p>Give homework, track progress and keep every student practising, without any extra software.</p>
        </Reveal>
        <div className="l3-aud-grid">
          <Reveal className="l3-aud-text">
            <ul className="l3-list">
              {SCHOOL_POINTS.map((t) => <li key={t}><Icon name="checkCircle" size={18} /><span>{t}</span></li>)}
            </ul>
            <button className="land-btn-primary" onClick={() => goApp('schools')}>Set up your class <Icon name="arrowRight" size={17} /></button>
            <p className="l3-note">In the app: Profile, Settings, School &amp; Classes, I'm a teacher.</p>
          </Reveal>
          <Reveal className="l3-phones">
            <PhoneFrame className="l3-ph a" src="/landing/m-school.webp" alt="Teacher dashboard showing student performance" />
            <PhoneFrame className="l3-ph b" src="/landing/m-assign-new.webp" alt="Creating a new assignment with a picture" />
            <PhoneFrame className="l3-ph c" src="/landing/m-assignment.webp" alt="A student viewing an assignment" />
          </Reveal>
        </div>
      </section>

      {/* ── Parents ─────────────────────────────────────────────────────── */}
      <section className="land-section l3-par" id="parents">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">For parents and guardians</span>
          <h2>Know how your child is really doing</h2>
          <p>No more guessing. A short report lands in your inbox every week.</p>
        </Reveal>
        <div className="l2-benefits l3-par-grid">
          {PARENT_POINTS.map((b, i) => (
            <Reveal key={b.title} className="l2-benefit" delay={i * 70}>
              <span className="l2-benefit-ico"><Icon name={b.icon} size={20} /></span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="l3-share">
          <div className="l3-share-text">
            <h3>Every win is shareable</h3>
            <p>Great score? New badge? One tap makes a picture with your invite link, ready for WhatsApp or the gallery. Friends who join help you earn rewards.</p>
          </div>
          <img src="/landing/share-card.webp" alt="Share card showing a 92% Biology score" loading="lazy" />
        </Reveal>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="land-section land-how" id="how">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Simple by design</span>
          <h2>Three steps to get started</h2>
        </Reveal>
        <div className="land-steps l2-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="land-step" delay={i * 120}>
              <div className="land-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Exam coverage ───────────────────────────────────────────────── */}
      <section className="land-section land-exams" id="exams">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Full coverage</span>
          <h2>Every exam that matters</h2>
        </Reveal>
        <Reveal className="land-exam-row">
          {EXAMS.map((e) => <span key={e} className="land-exam-badge">{e}</span>)}
        </Reveal>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="land-section l2-faq" id="faq">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Questions</span>
          <h2>Quick answers</h2>
        </Reveal>
        <div className="l2-faq-list">
          {FAQ.map((f, i) => (
            <div key={f.q} className={`l2-faq-item ${faq === i ? 'open' : ''}`}>
              <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>
                <span>{f.q}</span><i>+</i>
              </button>
              <div className="l2-faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section className="land-cta">
        <div className="land-cta-blob" aria-hidden="true" />
        <Reveal className="land-cta-inner">
          <h2>Ready to start?</h2>
          <p>It's free to start, works on any phone, and installs straight to your home screen.</p>
          <button className="land-btn-primary light" onClick={() => goApp('final-cta')}>
            Start Studying Free <Icon name="arrowRight" size={17} />
          </button>
        </Reveal>
      </section>

      {/* ── Shop ────────────────────────────────────────────────────────── */}
      {shopItems.length > 0 && (
        <section className="land-shop" id="shop" aria-labelledby="land-shop-h">
          <Reveal className="land-blog-head">
            <h2 id="land-shop-h">Study materials from the shop</h2>
            <p>Notes, formula sheets and guides made for Nigerian exams. Pay securely in the app.</p>
          </Reveal>
          <div className="land-shop-grid">
            {shopItems.map((it, i) => (
              <Reveal as="a" key={it.id} delay={i * 50} className="land-shop-card" href="/app?src=landing-shop" onClick={() => { try { sessionStorage.setItem('es_open_shop', '1'); } catch { /* ignore */ } }}>
                <div className="land-shop-img">
                  {it.badge && <span className="land-shop-badge">{it.badge}</span>}
                  {it.imageUrl ? <img src={it.imageUrl} alt={it.title} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : <span aria-hidden="true">📚</span>}
                </div>
                <div className="land-shop-body">
                  <small>{it.category}</small>
                  <h3>{String(it.title).replace(/^[^\w]+/, '')}</h3>
                  <p>{it.description}</p>
                  <span className="land-shop-price">{it.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Latest from the blog ────────────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section className="land-blog" aria-labelledby="land-blog-h">
          <Reveal className="land-blog-head">
            <h2 id="land-blog-h">Fresh from the blog</h2>
            <p>JAMB, WAEC and study tips, straight to the point.</p>
          </Reveal>
          <div className="land-blog-grid">
            {blogPosts.map((p, i) => (
              <Reveal as="a" key={p.url} delay={i * 60} className="land-blog-card" href={p.url}>
                {p.cover && <img className="land-blog-cover" src={p.cover} alt="" width="1200" height="630" loading="lazy" />}
                <span className="land-blog-cat">{String(p.category || '').replace(/-/g, ' ')}</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="land-blog-meta">{p.readTime} min read →</span>
              </Reveal>
            ))}
          </div>
          <a className="land-blog-all" href="/blog/">See all articles</a>
        </section>
      )}

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="land-footer">
        <div className="land-footer-inner">
          <div className="land-brand">
            <img src={logo} alt="EliteScholars" className="land-brand-logo" />
            <span>EliteScholars</span>
          </div>
          <div className="land-footer-links">
            <a href="/school">For schools</a>
            <a href="/blog/">Blog</a>
            <a href="/app/about">About</a>
            <a href="/app/terms">Terms</a>
            <a href="/app/privacy">Privacy</a>
            <a href="/partner">Become a partner</a>
            <a href={WA_CHANNEL} target="_blank" rel="noreferrer">WhatsApp Channel</a>
          </div>
          <div className="land-footer-copy">© {new Date().getFullYear()} EliteScholars. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

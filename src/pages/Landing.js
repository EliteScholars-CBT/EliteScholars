import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import logo from '../assets/elite-scholars-logo.png';
import { captureReferralFromURL } from '../utils/referral';
import { WA_CHANNEL } from '../utils/constants';
import '../styles/landing.css';

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

const FEATURES = [
  { icon: 'clipboard', title: 'CBT Practice', desc: 'Real exam-style questions for WAEC, NECO, JAMB, GST and POST-UTME, timed just like the real thing.' },
  { icon: 'bookOpen', title: 'Learn Mode', desc: "Bite-sized lessons that break every topic down before you're tested on it." },
  { icon: 'cards', title: 'Flashcards', desc: 'Flip through key terms and definitions for fast, focused revision.' },
  { icon: 'upload', title: 'Upload Your Own Notes', desc: "Drop in a PDF or DOCX and get lessons, flashcards and quizzes generated from it instantly — on your phone, nothing leaves your device." },
  { icon: 'gamepad', title: '6 Arcade Games', desc: "Word Scramble, Memory Match, Picture Round, Colour Memory, Word Slice and Sort Rush — general knowledge that doesn't feel like studying." },
  { icon: 'swords', title: 'Challenge Friends', desc: 'Send a head-to-head quiz challenge and see who comes out on top.' },
  { icon: 'users', title: 'Study Squads', desc: 'Form a small group with friends or classmates and climb a shared leaderboard together.' },
  { icon: 'trophy', title: 'Leaderboards & XP', desc: 'Earn XP for everything you do and see how you stack up against everyone else.' },
  { icon: 'wifi', title: 'Works Offline', desc: "Keep studying even with no data — your progress syncs the moment you're back online." },
];

const STEPS = [
  { n: '01', title: 'Pick your exam', desc: "WAEC, NECO, JAMB, GST or POST-UTME — choose what you're preparing for." },
  { n: '02', title: 'Study your way', desc: 'CBT drills, bite-sized lessons, flashcards, arcade games, or upload your own notes.' },
  { n: '03', title: 'Track your progress', desc: 'Watch your XP, streak and scores climb, and see exactly where you still need work.' },
];

const EXAMS = ['WAEC', 'NECO', 'JAMB', 'GST', 'POST-UTME'];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    captureReferralFromURL();
    if (isStandalone()) { navigate('/app', { replace: true }); return; }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHeroMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const goApp = (source) => navigate(`/app?src=${source}`);

  return (
    <div className="land">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="land-nav">
        <div className="land-nav-inner">
          <div className="land-brand">
            <img src={logo} alt="EliteScholars" className="land-brand-logo" />
            <span>EliteScholars</span>
          </div>
          <div className="land-nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#exams">Exams</a>
          </div>
          <button className="land-nav-cta" onClick={() => goApp('nav')}>Open App</button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header
        className="land-hero"
        ref={heroRef}
        onMouseMove={onHeroMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="land-hero-bg" aria-hidden="true">
          <i className="blob b1" style={{ transform: `translate(${scrollY * 0.12 + tilt.x * -20}px, ${scrollY * 0.22 + tilt.y * -20}px)` }} />
          <i className="blob b2" style={{ transform: `translate(${scrollY * -0.08 + tilt.x * 24}px, ${scrollY * 0.15 + tilt.y * 24}px)` }} />
          <i className="blob b3" style={{ transform: `translate(${tilt.x * 14}px, ${scrollY * 0.1 + tilt.y * 14}px)` }} />
          <div className="land-grid" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        </div>

        <div className="land-hero-content">
          <span className="land-pill"><Icon name="sparkles" size={13} /> Now with 6 arcade games &amp; offline mode</span>
          <h1>
            Ace WAEC, NECO, JAMB &amp; GST —
            <span className="land-gold"> the fun way</span>
          </h1>
          <p className="land-hero-sub">
            CBT practice, bite-sized lessons, flashcards, arcade games and friend challenges —
            all in one app. Upload your own notes and we'll turn them into a study pack. Works
            even when your data runs out.
          </p>
          <div className="land-hero-ctas">
            <button className="land-btn-primary" onClick={() => goApp('hero')}>
              Start Studying Free <Icon name="arrowRight" size={17} />
            </button>
            <a className="land-btn-ghost" href="#features">See how it works</a>
          </div>
          <div className="land-trust-row">
            <Icon name="wifi" size={14} /> <span>Works offline</span>
            <span className="dot" />
            <Icon name="download" size={14} /> <span>Installs in seconds, no app store</span>
            <span className="dot" />
            <Icon name="gift" size={14} /> <span>Free to start</span>
          </div>
        </div>

        <div
          className="land-mock"
          style={{ transform: `translate(${tilt.x * -16}px, ${tilt.y * -16 + scrollY * -0.06}px) rotate(${tilt.x * 4}deg)` }}
        >
          <div className="land-mock-frame">
            <div className="land-mock-header">
              <span className="land-mock-greet">Hi Tolu 👋</span>
              <span className="land-mock-bell"><Icon name="bell" size={14} /></span>
            </div>
            <div className="land-mock-grid">
              <div className="land-mock-card"><Icon name="bookOpen" size={18} /><b>Biology</b></div>
              <div className="land-mock-card"><Icon name="cards" size={18} /><b>Chemistry</b></div>
              <div className="land-mock-card"><Icon name="trophy" size={18} /><b>Geography</b></div>
              <div className="land-mock-card"><Icon name="layers" size={18} /><b>Economics</b></div>
            </div>
            <div className="land-mock-banner"><Icon name="gamepad" size={16} /> Word Slice — new!</div>
          </div>
          <div className="land-float-badge fb1"><Icon name="zap" size={14} /> +40 XP</div>
          <div className="land-float-badge fb2"><Icon name="trophy" size={14} /> Victory!</div>
        </div>
      </header>

      {/* ── Feature grid ────────────────────────────────────────────────── */}
      <section className="land-section" id="features">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Everything in one place</span>
          <h2>Built for how you actually study</h2>
          <p>No juggling five different apps. Everything you need to prepare, in one.</p>
        </Reveal>
        <div className="land-feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} className="land-feature-card" delay={(i % 3) * 80}>
              <div className="land-feature-icon"><Icon name={f.icon} size={22} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="land-section land-how" id="how">
        <Reveal className="land-section-head">
          <span className="land-eyebrow">Simple by design</span>
          <h2>Three steps to get started</h2>
        </Reveal>
        <div className="land-steps">
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

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="land-footer">
        <div className="land-footer-inner">
          <div className="land-brand">
            <img src={logo} alt="EliteScholars" className="land-brand-logo" />
            <span>EliteScholars</span>
          </div>
          <div className="land-footer-links">
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

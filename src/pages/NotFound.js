import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/notfound.css';

// Friendly 404: a lost scholar-owl, floating among the stars.
function Owl() {
  return (
    <svg className="nf-owl" viewBox="0 0 200 220" role="img" aria-label="A confused owl wearing a graduation cap">
      <defs>
        <linearGradient id="nfBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A78BFA" /><stop offset="1" stopColor="#6D28D9" /></linearGradient>
        <linearGradient id="nfBelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FDE68A" /><stop offset="1" stopColor="#F59E0B" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="206" rx="52" ry="7" fill="rgba(0,0,0,.25)" className="nf-shadow" />
      {/* wings */}
      <path d="M38 110c-18 22-16 56 4 74 6-30 14-52 22-66z" fill="#5B21B6" className="nf-wing l" />
      <path d="M162 110c18 22 16 56-4 74-6-30-14-52-22-66z" fill="#5B21B6" className="nf-wing r" />
      {/* body */}
      <path d="M100 52c-38 0-62 30-62 72 0 38 24 66 62 66s62-28 62-66c0-42-24-72-62-72z" fill="url(#nfBody)" />
      <path d="M100 98c-24 0-38 20-38 48 0 26 14 42 38 42s38-16 38-42c0-28-14-48-38-48z" fill="url(#nfBelly)" opacity=".95" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${82 + i * 18} ${132 + (i % 2) * 6}q4 -8 8 0`} stroke="#B45309" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />)}
      {/* eyes */}
      <circle cx="78" cy="92" r="21" fill="#fff" /><circle cx="122" cy="92" r="21" fill="#fff" />
      <circle cx="82" cy="94" r="9" fill="#1E1B4B" className="nf-pupil" /><circle cx="118" cy="94" r="9" fill="#1E1B4B" className="nf-pupil" />
      <circle cx="85" cy="90" r="3" fill="#fff" /><circle cx="121" cy="90" r="3" fill="#fff" />
      <path d="M92 108l8 14 8-14z" fill="#F59E0B" />
      {/* question mark */}
      <text x="160" y="52" fontSize="40" fontWeight="800" fill="#FDE047" className="nf-q">?</text>
      {/* graduation cap */}
      <path d="M100 18L44 44l56 24 56-24z" fill="#1E1B4B" />
      <path d="M70 56v20c0 8 14 14 30 14s30-6 30-14V56l-30 13z" fill="#312E81" />
      <path d="M156 44v26" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <circle cx="156" cy="74" r="5" fill="#FBBF24" />
      {/* feet */}
      <path d="M82 188v12m8-12v12m20-12v12m8-12v12" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found · EliteScholars';
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  const stars = Array.from({ length: 26 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 53) % 100, d: (i % 6) * 0.5, s: 2 + (i % 3) }));
  return (
    <main className="nf">
      <div className="nf-sky" aria-hidden="true">
        {stars.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
        <span className="nf-planet" />
        <span className="nf-ring" />
      </div>
      <div className="nf-card">
        <div className="nf-num"><span>4</span><div className="nf-owlbox"><Owl /></div><span>4</span></div>
        <h1>Oops — this page took a study break</h1>
        <p>We looked everywhere, even in the library, but the page you wanted isn't here. It may have moved, or the link might have a typo.</p>
        <div className="nf-actions">
          <Link className="nf-btn primary" to="/">Take me home</Link>
          <Link className="nf-btn" to="/app">Open the app</Link>
          <a className="nf-btn" href="/blog/">Read the blog</a>
        </div>
        <div className="nf-links">
          <span>Popular:</span>
          <Link to="/about">About us</Link>
          <a href="/blog/">Study tips</a>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </main>
  );
}

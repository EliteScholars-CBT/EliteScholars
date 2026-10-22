import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/elite-scholars-logo.png';
import { WA_CHANNEL } from '../utils/constants';
import '../styles/landing.css';
import '../styles/landing2.css';
import '../styles/sitepages.css';

// Shared frame for About / Privacy / Terms so they look like the landing page:
// same sticky nav, same footer, same type. No "back" button — the nav is enough.
export default function SiteShell({ eyebrow, title, intro, updated, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const id = (window.location.hash || '').slice(1);
    if (!id) { window.scrollTo(0, 0); return; }
    const t = setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView(); }, 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="land sp">
      <nav className="land-nav">
        <div className="land-nav-inner">
          <a className="land-brand" href="/">
            <img src={logo} alt="EliteScholars" className="land-brand-logo" />
            <span>EliteScholars</span>
          </a>
          <div className="land-nav-links">
            <a href="/#tour">Features</a>
            <a href="/#benefits">Benefits</a>
            <a href="/blog/">Blog</a>
            <a href="/app/about">About</a>
          </div>
          <button className="land-nav-cta" onClick={() => navigate('/app?src=page')}>Open App</button>
        </div>
      </nav>

      <header className="sp-hero">
        <div className="sp-hero-bg" aria-hidden="true">
          <i className="blob b1" /><i className="blob b2" />
        </div>
        <div className="sp-hero-inner">
          {eyebrow && <span className="land-eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
          {updated && <small>Last updated: {updated}</small>}
        </div>
      </header>

      <main className="sp-main">{children}</main>

      <footer className="land-footer">
        <div className="land-footer-inner">
          <a className="land-brand" href="/">
            <img src={logo} alt="EliteScholars" className="land-brand-logo" />
            <span>EliteScholars</span>
          </a>
          <div className="land-footer-links">
            <a href="/school">For schools</a>
            <a href="/blog/">Blog</a>
            <a href="/app/about">About</a>
            <a href="/app/terms">Terms</a>
            <a href="/app/privacy">Privacy</a>
            <a href="/partner">Become a partner</a>
            <a href={WA_CHANNEL} target="_blank" rel="noreferrer">WhatsApp Channel</a>
          </div>
          <div className="land-footer-copy">© {new Date().getFullYear()} EliteScholars. Not affiliated with JAMB, WAEC or NECO.</div>
        </div>
      </footer>
    </div>
  );
}

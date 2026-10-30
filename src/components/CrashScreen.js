import React, { useEffect } from 'react';
import { reportCrash } from '../utils/crashReport';

const SITE = 'https://elitescholars.site/';
const btn = { display: 'block', width: '100%', boxSizing: 'border-box', padding: '13px 18px', border: 0, borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', fontFamily: 'inherit' };

// Shown when something crashes: explains, offers retry, and always offers a way out to the website.
// The crash is reported to the admin automatically (with who it happened to and the device details).
export default function CrashScreen({ error, info, onRetry, onBack, dark = true, full = false }) {
  useEffect(() => { reportCrash(error, info); }, [error, info]);
  const fg = dark ? '#fff' : '#1E1B4B';
  return (
    <div style={{ minHeight: full ? '100vh' : '60vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', color: fg, background: full ? '#1B0A47' : 'transparent' }}>
      <div style={{ maxWidth: 340, width: '100%' }}>
        <div style={{ fontSize: 42 }}>😵</div>
        <h3 style={{ margin: '10px 0 6px', fontSize: 20 }}>Something went wrong</h3>
        <p style={{ opacity: 0.8, margin: '0 0 18px', fontSize: 14, lineHeight: 1.5 }}>The app hit a problem. Your progress is safe, and we have been told about it so we can fix it.</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {onRetry && <button type="button" style={{ ...btn, background: '#7C3AED', color: '#fff' }} onClick={onRetry}>Try again</button>}
          <a href={SITE} style={{ ...btn, background: '#F59E0B', color: '#3B1C00' }}>Open the EliteScholars website</a>
          <button type="button" style={{ ...btn, background: 'rgba(124,58,237,.14)', color: fg }} onClick={() => { try { window.location.reload(); } catch { /* ignore */ } }}>Reload the app</button>
          {onBack && <button type="button" style={{ ...btn, background: 'none', color: fg, textDecoration: 'underline', fontWeight: 600 }} onClick={onBack}>Go back</button>}
        </div>
      </div>
    </div>
  );
}

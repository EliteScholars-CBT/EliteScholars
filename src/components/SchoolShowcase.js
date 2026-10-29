import React, { useEffect, useState } from 'react';
import '../styles/showcase.css';

// "Schools & centres using EliteScholars". Only shows schools that chose to be listed AND that the owner approved in Admin.
// Nothing is made up: with no approved schools yet, it says so honestly and invites the visitor to register.
const COLORS = ['#7C3AED', '#0369A1', '#B45309', '#047857', '#BE185D', '#4338CA', '#0F766E'];
const hue = (s) => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return COLORS[h % COLORS.length]; };
const initials = (n) => String(n).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function SchoolShowcase({ kind = 'all', className = '' }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let off = false;
    fetch(`/api/site/showcase${kind === 'school' || kind === 'centre' ? `?kind=${kind}` : ''}`).then((r) => r.json()).then((j) => { if (!off) setItems(j && j.success && Array.isArray(j.items) ? j.items : []); }).catch(() => { if (!off) setItems([]); });
    return () => { off = true; };
  }, [kind]);

  const join = kind === 'centre' ? '/school-portal?kind=centre&src=showcase' : '/school-portal?src=showcase';
  const title = kind === 'centre' ? 'Tutorial centres using EliteScholars' : kind === 'school' ? 'Schools using EliteScholars' : 'Schools & centres using EliteScholars';
  if (items === null) return null; // nothing flashes while loading
  return (
    <section className={`shw ${className}`} id="showcase" aria-labelledby="shw-h">
      <h2 id="shw-h">{title}</h2>
      {items.length > 0 ? (
        <>
          <p className="shw-sub">Listed with their permission.</p>
          <ul className="shw-grid">
            {items.map((s) => (
              <li key={s.id} className="shw-card">
                {s.hasLogo ? <img className="shw-logo" src={`/api/site/showcase-logo?id=${s.id}`} alt="" loading="lazy" width="56" height="56" /> : <span className="shw-logo shw-ini" style={{ background: hue(s.name) }} aria-hidden="true">{initials(s.name)}</span>}
                <div className="shw-body">
                  <b>{s.name}</b>
                  <small>{[s.city, s.state].filter(Boolean).join(', ')}{s.kind === 'centre' ? ' · Tutorial centre' : ' · School'}</small>
                  {s.tagline && <span className="shw-tag">{s.tagline}</span>}
                </div>
              </li>
            ))}
            <li className="shw-card shw-join"><a href={join}><b>Is yours next?</b><small>Register free →</small></a></li>
          </ul>
        </>
      ) : (
        <div className="shw-empty">
          <p>We are just getting started with schools and centres. The first ones to join will be listed here, with their permission.</p>
          <a className="shw-btn" href={join}>Register your {kind === 'centre' ? 'centre' : 'school'} free</a>
        </div>
      )}
    </section>
  );
}

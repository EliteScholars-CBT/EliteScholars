import React, { useState, useEffect, useMemo } from 'react';
import { makeApi, ago } from './adminApi';
import { fmtN } from './AdminCharts';

const CH = { whatsapp: 'WhatsApp', copy: 'Copied link', native: 'Phone share', other: 'Other' };
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '–');

// The public /game page: who visited, how many played, who hit the sign-up wall, who signed up, shares and the top scores.
export default function AdminGames({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [days, setDays] = useState(7);
  const [err, setErr] = useState('');
  useEffect(() => {
    let on = true; setD(null);
    api('games', { query: { days } }).then((x) => on && setD(x)).catch((e) => e.message !== 'auth' && on && setErr(e.message));
    return () => { on = false; };
  }, [api, days]);
  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const stat = (v, l) => <div className="adm-stat"><div className="adm-stat-val">{fmtN(v)}</div><div className="adm-stat-label">{l}</div></div>;
  const shareTotal = Object.values(d.shares).reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="adm-pills">{[7, 30, 90].map((n) => <button key={n} className={days === n ? 'on' : ''} onClick={() => setDays(n)}>{n} days</button>)}</div>
      <section className="adm-card">
        <h2>Public game page</h2>
        <div className="adm-grid adm-stats">
          {stat(d.views, 'Page visits')}
          {stat(d.guests, 'Different guests')}
          {stat(d.guestStarts, 'Games started by guests')}
          {stat(d.finished, 'Games finished')}
          {stat(d.wallPeople, 'Hit the sign-up wall')}
          {stat(d.taps, 'Tapped "Sign up"')}
          {stat(d.signups, `Signed up (${pct(d.signups, d.guests)} of guests)`)}
          {stat(shareTotal, 'Shares')}
        </div>
        <p className="adm-note">Guests get 2 free games per visit, then the sign-up wall. {fmtN(d.memberStarts)} games were started by signed-in students. Sign-ups from the game also show in Sources as the "game" campaign.</p>
      </section>
      <section className="adm-card">
        <h2>How they shared</h2>
        {shareTotal ? Object.entries(d.shares).map(([k, v]) => <div key={k} className="adm-inline pad" style={{ justifyContent: 'space-between' }}><span>{CH[k] || k}</span><b>{fmtN(v)}</b></div>) : <p className="adm-empty">No shares yet.</p>}
      </section>
      <section className="adm-card">
        <h2>Top scores ({fmtN(d.players)} players, {fmtN(d.guestPlayers)} guests)</h2>
        {d.top.length ? d.top.map((p, i) => <div key={i} className="adm-inline pad" style={{ justifyContent: 'space-between' }}><span><b>{i + 1}. {p.name}</b>{p.guest ? ' · guest' : ''} · {p.game}</span><span><b>{fmtN(p.score)}</b> <small>{ago(p.at)}</small></span></div>) : <p className="adm-empty">No scores yet.</p>}
      </section>
      {err && <div className="adm-error">{err}</div>}
    </div>
  );
}

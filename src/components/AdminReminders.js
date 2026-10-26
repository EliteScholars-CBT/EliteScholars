import React, { useState, useEffect, useMemo } from 'react';
import { makeApi, ago } from './adminApi';
import { fmtN } from './AdminCharts';

const KIND = { reminder: 'Daily study reminder', streak_push: 'Streak reminder', 'squad-chat': 'Squad chat', challenge: 'Challenge', assignment: 'Class assignment', status: 'Status', general: 'Other' };
const kindName = (k) => KIND[k] || k;
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '–');

// Reminders: how many we sent, how many showed and were tapped, who opened the app from one, and who accepted or declined notifications.
export default function AdminReminders({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [days, setDays] = useState(7);
  const [err, setErr] = useState('');
  useEffect(() => {
    let on = true; setD(null);
    api('reminders', { query: { days } }).then((x) => on && setD(x)).catch((e) => e.message !== 'auth' && on && setErr(e.message));
    return () => { on = false; };
  }, [api, days]);
  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const p = d.prompt;
  return (
    <div>
      <div className="adm-pills">{[7, 30, 90].map((n) => <button key={n} className={days === n ? 'on' : ''} onClick={() => setDays(n)}>{n} days</button>)}</div>
      <section className="adm-card">
        <h2>Notifications we sent</h2>
        <div className="adm-grid adm-stats">
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.sent)}</div><div className="adm-stat-label">Sent</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.shown)}</div><div className="adm-stat-label">Shown on phones</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.clicks)}</div><div className="adm-stat-label">Tapped ({pct(d.clicks, d.sent)})</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.openers)}</div><div className="adm-stat-label">Students who opened the app from one</div></div>
        </div>
        <p className="adm-note">{fmtN(d.subscribers)} phones are subscribed right now. "Shown" counts reminders the phone displayed itself.</p>
        <table className="adm-table"><thead><tr><th>Kind</th><th>Sent</th><th>Tapped</th><th>Opened app</th></tr></thead>
          <tbody>{d.kinds.map((k) => <tr key={k.kind}><td>{kindName(k.kind)}</td><td>{fmtN(k.sent || k.shown)}</td><td>{fmtN(k.clicks)}</td><td>{fmtN(k.opens)}</td></tr>)}
            {!d.kinds.length && <tr><td colSpan="4">Nothing yet.</td></tr>}</tbody></table>
      </section>
      <section className="adm-card">
        <h2>Did they allow notifications?</h2>
        <div className="adm-grid adm-stats">
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(p.shown)}</div><div className="adm-stat-label">Asked</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(p.accepted)}</div><div className="adm-stat-label">Accepted ({pct(p.accepted, p.shown)})</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(p.declined)}</div><div className="adm-stat-label">Said "Not now"</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(p.blocked)}</div><div className="adm-stat-label">Blocked by the phone</div></div>
        </div>
      </section>
      <section className="adm-card">
        <h2>Who opened the app from a reminder</h2>
        {d.recent.length ? d.recent.map((r, i) => <div key={i} className="adm-inline pad" style={{ justifyContent: 'space-between' }}><span><b>{r.name}</b> · {kindName(r.kind)}</span><small>{ago(r.at)}</small></div>) : <p className="adm-empty">Nobody yet.</p>}
      </section>
      {err && <div className="adm-error">{err}</div>}
    </div>
  );
}

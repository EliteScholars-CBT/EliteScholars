import React, { useState, useEffect, useMemo } from 'react';
import { makeApi, ago } from './adminApi';
import { fmtN } from './AdminCharts';
import '../styles/admin-tables.css';

const KIND = { study_morning: 'Morning study reminder (8am)', study_evening: 'Evening study reminder (5pm)', streak: 'Streak at risk', comeback: 'Come-back nudge', reminder: 'Study reminder set on the phone', streak_push: 'Streak reminder', 'squad-chat': 'Squad chat', challenge: 'Challenge', assignment: 'Class assignment', status: 'Status', general: 'Other' };
const EMAIL_STEP = ['1 · Gentle nudge (3 days away)', '2 · Did you forget us? (8 days)', '3 · Exam check-in (15 days)', '4 · Reminders not working (23 days)', '5 · Last email (32 days)'];
const kindName = (k) => KIND[k] || k;
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '–');

// Reminders: how many we sent, how many showed and were tapped, who opened the app from one, and who accepted or declined notifications.
export default function AdminReminders({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [days, setDays] = useState(7);
  const [err, setErr] = useState('');
  const [em, setEm] = useState(null);
  useEffect(() => {
    let on = true; setD(null);
    api('reminders', { query: { days } }).then((x) => on && setD(x)).catch((e) => e.message !== 'auth' && on && setErr(e.message));
    return () => { on = false; };
  }, [api, days]);
  useEffect(() => {
    let on = true; setEm(null);
    fetch(`/api/data?route=admin/nudges&days=${days}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then((x) => on && x.success && setEm(x)).catch(() => {});
    return () => { on = false; };
  }, [token, days]);
  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const p = d.prompt;
  return (
    <div>
      <div className="adm-pills adm-pills-gap">{[7, 30, 90].map((n) => <button key={n} className={days === n ? 'on' : ''} onClick={() => setDays(n)}>{n} days</button>)}</div>
      <section className="adm-card">
        <h2>Notifications we sent</h2>
        <div className="adm-grid adm-stats">
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.sent)}</div><div className="adm-stat-label">Sent</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.shown)}</div><div className="adm-stat-label">Shown on phones</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.clicks)}</div><div className="adm-stat-label">Tapped ({pct(d.clicks, d.sent)})</div></div>
          <div className="adm-stat"><div className="adm-stat-val">{fmtN(d.openers)}</div><div className="adm-stat-label">Students who opened the app from one</div></div>
        </div>
        <p className="adm-note">{fmtN(d.subscribers)} phones are subscribed right now. "Shown" counts reminders the phone displayed itself.</p>
        <div className="adm-tscroll"><table className="adm-dtable"><thead><tr><th>Kind</th><th>Sent</th><th>Received on phone</th><th>Tapped to resume</th><th>Opened app</th></tr></thead>
          <tbody>{d.kinds.map((k) => <tr key={k.kind}><td>{kindName(k.kind)}</td><td>{fmtN(k.sent)}</td><td>{fmtN(k.shown)}</td><td>{fmtN(k.clicks)}{k.shown ? ` (${pct(k.clicks, k.shown)})` : ''}</td><td>{fmtN(k.opens)}</td></tr>)}
            {!d.kinds.length && <tr><td colSpan="5">Nothing yet.</td></tr>}</tbody></table></div>
      </section>
      {em && (
        <section className="adm-card">
          <h2>Come-back emails</h2>
          <div className="adm-grid adm-stats">
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(em.totals.sent)}</div><div className="adm-stat-label">Emails sent to {fmtN(em.totals.people)} students</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(em.totals.clicked)}</div><div className="adm-stat-label">Clicked ({pct(em.totals.clicked, em.totals.people)})</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(em.totals.recovered)}</div><div className="adm-stat-label">Came back ({pct(em.totals.recovered, em.totals.people)})</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(em.totals.optedOut)}</div><div className="adm-stat-label">Unsubscribed</div></div>
          </div>
          <p className="adm-note">{fmtN(em.totals.inSequence)} students are partway through the emails, and {fmtN(em.totals.finished)} have had the last one. "Came back" means they practised or logged in after an email.</p>
          <div className="adm-tscroll"><table className="adm-dtable"><thead><tr><th>Email</th><th>Sent</th><th>Clicked</th><th>Came back</th></tr></thead>
            <tbody>{em.steps.map((x) => <tr key={x.step}><td>{EMAIL_STEP[x.step - 1]}</td><td>{fmtN(x.sent)}</td><td>{fmtN(x.clicked)}{x.sent ? ` (${pct(x.clicked, x.sent)})` : ''}</td><td>{fmtN(x.returned)}{x.sent ? ` (${pct(x.returned, x.sent)})` : ''}</td></tr>)}</tbody></table></div>
          {em.recent.length > 0 && <div style={{ marginTop: 12 }}>{em.recent.map((r, i) => <div key={i} className="adm-inline pad" style={{ justifyContent: 'space-between' }}><span><b>{r.name}</b> · email {r.step}{r.returned ? ' · came back' : r.clicked ? ' · clicked' : ''}</span><small>{ago(r.at)}</small></div>)}</div>}
        </section>
      )}
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

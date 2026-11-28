import React, { useState, useEffect, useMemo } from 'react';
import { makeApi, ago } from './adminApi';
import { fmtN } from './AdminCharts';
import '../styles/admin-tables.css';
import RangePills from './AdminRange';

const KIND = { study_morning: 'Morning study reminder (8am)', study_evening: 'Evening study reminder (5pm)', streak: 'Streak at risk', comeback: 'Come-back nudge', reminder: 'Study reminder set on the phone', streak_push: 'Streak reminder', 'squad-chat': 'Squad chat', challenge: 'Challenge', assignment: 'Class assignment', status: 'Status', general: 'Other' };
const EMAIL_STEP = ['1 · Gentle nudge (after 3 days away)', '2 · Did you forget us? (7 days later)', '3 · Last email (10 days after that)'];
const kindName = (k) => KIND[k] || k;
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '–');

// Reminders: how many we sent, how many showed and were tapped, who opened the app from one, and who accepted or declined notifications.
export default function AdminReminders({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [range, setRange] = useState('week');
  const [err, setErr] = useState('');
  const [em, setEm] = useState(null);
  const [due, setDue] = useState(null);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  const post = (action) => fetch('/api/data?route=admin/nudges', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ action }) }).then((r) => r.json());
  const checkDue = () => post('preview').then((x) => x.success && setDue(x.result)).catch(() => {});
  useEffect(() => { checkDue(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  const sendNow = async () => {
    setSending(true); setMsg('');
    try {
      const x = await post('send');
      if (!x.success) setMsg(x.error || 'Could not send.');
      else {
        const r = x.result || {};
        setMsg(r.skipped ? `Not sent: ${r.skipped}.` : r.failed ? 'The email service refused the batch. Check the Resend key and sender address in Vercel.' : `Sent ${r.sent} email${r.sent === 1 ? '' : 's'}.${r.waiting ? ` ${r.waiting} more will go out over the next day (daily limit keeps your email quota safe).` : ''}`);
      }
      checkDue();
      fetch(`/api/data?route=admin/nudges&range=${range}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).then((y) => y.success && setEm(y)).catch(() => {});
    } catch { setMsg('Could not reach the server.'); }
    setSending(false);
  };
  useEffect(() => {
    let on = true; setD(null);
    api('reminders', { query: { range } }).then((x) => on && setD(x)).catch((e) => e.message !== 'auth' && on && setErr(e.message));
    return () => { on = false; };
  }, [api, range]);
  useEffect(() => {
    let on = true; setEm(null);
    fetch(`/api/data?route=admin/nudges&range=${range}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then((x) => on && x.success && setEm(x)).catch(() => {});
    return () => { on = false; };
  }, [token, range]);
  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const p = d.prompt;
  return (
    <div>
      <RangePills className="adm-pills adm-pills-gap" value={range} onChange={setRange} />
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
          <p className="adm-note" style={{ marginTop: 0 }}>Every student who is not a partner gets at most three emails, ever: after 3 days away, 7 days later, and a last goodbye 10 days after that. Nobody is emailed again once they come back or unsubscribe. No more than 40 go out in any 24 hours.</p>
          <div className="adm-inline pad" style={{ gap: 12, flexWrap: 'wrap' }}>
            <button className="adm-btn" disabled={sending || !due || !(due.eligible > 0)} onClick={sendNow}>{sending ? 'Sending…' : 'Send due emails now'}</button>
            <span>{due ? (due.skipped ? `Not set up: ${due.skipped}` : due.eligible ? `${due.eligible} due now${Object.keys(due.byStepDue || {}).length ? ' (' + Object.entries(due.byStepDue).map(([k, v]) => `${v} for email ${k}`).join(', ') + ')' : ''}` : 'Nobody is due right now') : 'Checking who is due…'}</span>
          </div>
          {msg && <p className="adm-note">{msg}</p>}
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/hire.css';
import logo from '../assets/elite-scholars-logo.png';

async function call(path, { method = 'GET', body, query } = {}) {
  const qs = query ? `?${new URLSearchParams(query)}` : '';
  const r = await fetch(`/api/hire/${path}${qs}`, { method, headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  return { status: r.status, ...d };
}
const when = (s) => (s ? new Date(s).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Lagos' }) + ' (Lagos time)' : '');

function Shell({ children }) {
  return (
    <div className="hire-page">
      <div className="hire-card">
        <a href="/" className="hire-logo"><img src={logo} alt="" width="34" height="34" /> EliteScholars</a>
        {children}
      </div>
    </div>
  );
}

// Public application page: /hire/<slug>
export function HireApply() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [err, setErr] = useState('');
  const [f, setF] = useState({ name: '', email: '', whatsapp: '', why: '', accept: false });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');

  useEffect(() => { call('job', { query: { slug } }).then((d) => { if (d.success) setJob(d.job); else setErr(d.error || 'This job link is not valid.'); }); }, [slug]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('');
    const d = await call('apply', { method: 'POST', body: { slug, ...f } });
    setBusy(false);
    if (!d.success) { setErr(d.error || 'Something went wrong.'); return; }
    setDone(d.message);
  };

  if (!job && !err) return <Shell><p className="hire-mute">Loading…</p></Shell>;
  if (!job) return <Shell><h1>Link not valid</h1><p className="hire-mute">{err}</p></Shell>;
  if (done) return <Shell><div className="hire-big">✅</div><h1>Application received</h1><p className="hire-mute">{done}</p><p className="hire-mute">Next, we email you a short research task. Check your spam folder too.</p></Shell>;
  const open = job.phase === 'applying';
  return (
    <Shell>
      <span className="hire-tag">We are hiring</span>
      <h1>{job.title}</h1>
      {job.description && <p className="hire-desc">{job.description}</p>}
      <ul className="hire-facts">
        <li>💰 <b>{job.commissionPct}% commission</b> on every paying student you bring</li>
        <li>📝 Step 1: apply here. Step 2: a short research task. Step 3: join the team</li>
        {job.applyDeadline && <li>⏰ Applications {open ? 'close' : 'closed'}: <b>{when(job.applyDeadline)}</b></li>}
      </ul>
      {!open ? <div className="hire-closed">Applications for this role are closed.</div> : (
        <form onSubmit={submit} className="hire-form">
          <label>Full name<input value={f.name} onChange={set('name')} autoComplete="name" required /></label>
          <label>Email<input type="email" value={f.email} onChange={set('email')} autoComplete="email" required /></label>
          <label>WhatsApp number<input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="e.g. 0803 000 0000" autoComplete="tel" required /></label>
          <label>Why should we choose you?<textarea rows={5} value={f.why} onChange={set('why')} maxLength={1500} required /><small>{f.why.length}/1500</small></label>
          <label className="hire-check"><input type="checkbox" checked={f.accept} onChange={set('accept')} /> I accept the {job.commissionPct}% commission</label>
          {err && <div className="hire-err">{err}</div>}
          <button className="hire-btn" disabled={busy}>{busy ? 'Sending…' : 'Submit application'}</button>
        </form>
      )}
    </Shell>
  );
}

// Research page sent by email: /hire/r/<token>
export function HireResearch() {
  const { token } = useParams();
  const [d, setD] = useState(null);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => call('research', { query: { t: token } }).then((r) => { if (r.success) { setD(r); setText((t) => t || r.research || ''); } else setErr(r.error || 'This link is not valid.'); });
  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr(''); setMsg('');
    const r = await call('research', { method: 'POST', body: { t: token, text } });
    setBusy(false);
    if (!r.success) { setErr(r.error || 'Something went wrong.'); return; }
    setMsg(r.message); load();
  };

  if (!d && !err) return <Shell><p className="hire-mute">Loading…</p></Shell>;
  if (!d) return <Shell><h1>Link not valid</h1><p className="hire-mute">{err}</p></Shell>;
  const can = ['invited', 'submitted'].includes(d.status) && !d.closed;
  return (
    <Shell>
      <span className="hire-tag">Step 2 of 3</span>
      <h1>Research task</h1>
      <p className="hire-mute">Hi {d.name.split(' ')[0]}, for <b>{d.job.title}</b>.</p>
      {d.status === 'applied' && <div className="hire-closed">This stage has not opened for you yet. We will email you when it does.</div>}
      {['approved', 'joined'].includes(d.status) && <div className="hire-ok">You passed. Check your email for your partner signup link.</div>}
      {d.status === 'rejected' && <div className="hire-closed">Thank you for applying. We are not taking you forward this time.</div>}
      {['invited', 'submitted'].includes(d.status) && (
        <>
          <ol className="hire-steps">
            <li>Spend time on <a href="/" target="_blank" rel="noreferrer">elitescholars.site</a> and <a href="/partner" target="_blank" rel="noreferrer">elitescholars.site/partner</a>.</li>
            <li>Write what you found: what it offers, who it helps and what stood out.</li>
            <li>Say how you would promote it, and why we should choose you.</li>
          </ol>
          <div className="hire-warn">Write it yourself. Do not paste AI-written text. We can tell.</div>
          {d.job.researchDeadline && <p className="hire-mute">{d.closed ? 'The deadline has passed:' : 'Send it in before'} <b>{when(d.job.researchDeadline)}</b></p>}
          {d.status === 'submitted' && !msg && <div className="hire-ok">You have submitted. You can still edit it until the deadline.</div>}
          {can ? (
            <form onSubmit={submit} className="hire-form">
              <label>Your research<textarea rows={12} value={text} onChange={(e) => setText(e.target.value)} maxLength={8000} required /><small>{text.length}/8000 · at least 300</small></label>
              {err && <div className="hire-err">{err}</div>}
              {msg && <div className="hire-ok">{msg}</div>}
              <button className="hire-btn" disabled={busy}>{busy ? 'Sending…' : d.status === 'submitted' ? 'Update my research' : 'Submit research'}</button>
            </form>
          ) : <div className="hire-closed">Submissions are closed.</div>}
        </>
      )}
    </Shell>
  );
}

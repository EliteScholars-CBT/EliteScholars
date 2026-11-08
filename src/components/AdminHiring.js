import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, ago } from './adminApi';

const ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'https://elitescholars.site';
const STAGES = [['submitted', 'To review'], ['applied', 'Applied'], ['invited', 'Research sent'], ['approved', 'Approved'], ['joined', 'Joined'], ['rejected', 'Not taken']];
const STAGE_COLOR = { submitted: '#f59e0b', applied: '#60a5fa', invited: '#a78bfa', approved: '#34d399', joined: '#22c55e', rejected: '#94a3b8' };
const pad = (n) => String(n).padStart(2, '0');
const toParts = (iso) => { if (!iso) return { d: '', t: '' }; const x = new Date(iso); return { d: `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`, t: `${pad(x.getHours())}:${pad(x.getMinutes())}` }; };
const fromParts = (p) => (p && p.d ? new Date(`${p.d}T${p.t || '00:00'}`).toISOString() : '');
const left = (iso, now) => { if (!iso) return ''; const ms = new Date(iso).getTime() - now; if (ms <= 0) return 'passed'; const h = Math.floor(ms / 3600000); return h >= 48 ? `in ${Math.floor(h / 24)} days` : h >= 1 ? `in ${h}h` : `in ${Math.max(1, Math.floor(ms / 60000))} min`; };
const copy = (t) => { try { navigator.clipboard && navigator.clipboard.writeText(t); } catch { /* ignore */ } };

const UNIT_MS = { hours: 3600000, days: 86400000 };
// A deadline is either a picked date + time, or "N days/hours" (from now for applications, after applications close for research).
const mkDl = (iso) => ({ mode: 'date', ...toParts(iso), n: 2, unit: 'days' });
const EMPTY = { title: 'Promoter', description: '', commission_pct: 40, open: true, apply: { mode: 'rel', d: '', t: '18:00', n: 3, unit: 'days' }, research: { mode: 'rel', d: '', t: '18:00', n: 2, unit: 'days' }, auto_email: true, auto_approve: false, group_url: '' };
const calcApply = (a) => (a.mode === 'rel' ? new Date(Date.now() + (Number(a.n) || 0) * UNIT_MS[a.unit]).toISOString() : fromParts(a));
const calcResearch = (r, applyIso) => (r.mode === 'rel' ? (applyIso ? new Date(new Date(applyIso).getTime() + (Number(r.n) || 0) * UNIT_MS[r.unit]).toISOString() : '') : fromParts(r));
const prettyDt = (iso) => (iso ? new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true }) : 'not set');
function DeadlinePicker({ label, value, onChange, relLabel, preview }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div className="adm-field">{label}
      <div className="hire-seg">
        <button type="button" className={value.mode === 'date' ? 'on' : ''} onClick={() => set('mode', 'date')}>Pick date</button>
        <button type="button" className={value.mode === 'rel' ? 'on' : ''} onClick={() => set('mode', 'rel')}>{relLabel}</button>
      </div>
      {value.mode === 'date' ? (
        <div className="hire-dt"><input type="date" value={value.d} onChange={(e) => set('d', e.target.value)} /><input type="time" value={value.t} onChange={(e) => set('t', e.target.value)} /></div>
      ) : (
        <div className="hire-dt"><input type="number" min="0" max="365" value={value.n} onChange={(e) => set('n', e.target.value)} /><select value={value.unit} onChange={(e) => set('unit', e.target.value)}><option value="days">days</option><option value="hours">hours</option></select></div>
      )}
      <small className="hire-prev">{preview}</small>
    </div>
  );
}

export default function AdminHiring({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [data, setData] = useState(null);
  const [form, setForm] = useState(null);
  const [open, setOpen] = useState('');       // job id whose applicants are showing
  const [filter, setFilter] = useState({});   // job id -> stage filter
  const [seeApp, setSeeApp] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    try { setData(await api('hiring')); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);
  useEffect(() => { load(); const t = setInterval(load, 45000); return () => clearInterval(t); }, [load]);

  const run = async (path, body, ok) => {
    setBusy(true); setErr(''); setMsg('');
    try { const d = await api(path, { method: 'POST', body }); setMsg(ok || d.message || 'Done.'); await load(); return d; }
    catch (e) { if (e.message !== 'auth') setErr(e.message); return null; }
    finally { setBusy(false); }
  };

  const applyIso = form ? calcApply(form.apply) : '';
  const researchIso = form ? calcResearch(form.research, applyIso) : '';
  const save = async () => {
    const body = { id: form.id, title: form.title, description: form.description, commission_pct: form.commission_pct, open: form.open, apply_deadline: applyIso, research_deadline: researchIso, auto_email: form.auto_email, auto_approve: form.auto_approve, group_url: form.group_url, slug: form.slug };
    const d = await run('hiring-save', body);
    if (d) setForm(null);
  };

  const openCv = async (id) => {
    try { const d = await api(`hiring-cv?id=${encodeURIComponent(id)}`); if (d.url) window.open(d.url, '_blank', 'noopener'); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  };
  const edit = (j) => setForm({ id: j.id, slug: j.slug, title: j.title, description: j.description, commission_pct: j.commission_pct, open: j.open, apply: mkDl(j.apply_deadline), research: mkDl(j.research_deadline), auto_email: j.auto_email, auto_approve: j.auto_approve, group_url: j.group_url });

  if (!data) return <div className="adm-card">{err || 'Loading…'}</div>;
  const now = new Date(data.now).getTime();
  const appsOf = (jid) => data.applications.filter((a) => a.job_id === jid);

  return (
    <div>
      <section className="adm-card">
        <div className="adm-card-head"><h2>Hiring</h2><button className="adm-btn" onClick={() => { setForm({ ...EMPTY }); setMsg(''); setErr(''); }}>+ New job</button></div>
        <p className="adm-note">Create a job, share its link (LinkedIn, WhatsApp). Applicants apply, get the research task by email at your deadline, send in their research, and you approve the ones you want. Approved people get the partner signup link and your group chat.</p>
        {msg && <div className="adm-ok">{msg}</div>}
        {err && <div className="adm-error">{err}</div>}
      </section>

      {form && (
        <section className="adm-card hire-adm-form">
          <h2>{form.id ? 'Edit job' : 'New job'}</h2>
          <label className="adm-field">Job title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={80} /></label>
          <label className="adm-field">What the job is about (shown on the apply page)<textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={3000} /></label>
          <div className="hire-adm-grid">
            <label className="adm-field">Commission %<input type="number" min="1" max="90" value={form.commission_pct} onChange={(e) => setForm({ ...form, commission_pct: e.target.value })} /></label>
            <label className="adm-field">Group chat link (sent when approved)<input placeholder="https://chat.whatsapp.com/…" value={form.group_url} onChange={(e) => setForm({ ...form, group_url: e.target.value })} /></label>
          </div>
          <div className="hire-adm-grid">
            <DeadlinePicker label="Applications close" value={form.apply} onChange={(v) => setForm({ ...form, apply: v })} relLabel="From now" preview={`Closes: ${prettyDt(applyIso)}`} />
            <DeadlinePicker label="Research must be in by" value={form.research} onChange={(v) => setForm({ ...form, research: v })} relLabel="After applications close" preview={`Due: ${prettyDt(researchIso)}`} />
          </div>
          <label className="adm-check"><input type="checkbox" checked={form.auto_email} onChange={(e) => setForm({ ...form, auto_email: e.target.checked })} /> Email the research task to everyone automatically when applications close</label>
          <label className="adm-check"><input type="checkbox" checked={form.auto_approve} onChange={(e) => setForm({ ...form, auto_approve: e.target.checked })} /> Approve everyone who sent research automatically when the research deadline passes</label>
          <label className="adm-check"><input type="checkbox" checked={form.open} onChange={(e) => setForm({ ...form, open: e.target.checked })} /> Job is open</label>
          <p className="adm-note">Times are your device time (Lagos). Automatic steps run when the deadline passes: within minutes if you have Hiring open, otherwise at the next scheduled run (morning or evening).</p>
          <div className="adm-inline"><button className="adm-btn" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save job'}</button><button className="adm-ghost" onClick={() => setForm(null)}>Cancel</button></div>
        </section>
      )}

      {data.jobs.map((j) => {
        const apps = appsOf(j.id);
        const cnt = (s) => apps.filter((a) => a.status === s).length;
        const link = `${ORIGIN}/hire/${j.slug}`;
        const f = filter[j.id] || (cnt('submitted') ? 'submitted' : 'all');
        const shown = apps.filter((a) => f === 'all' || a.status === f);
        return (
          <section className="adm-card hire-job" key={j.id}>
            <div className="adm-card-head"><h2>{j.title}{!j.open && <span className="adm-chip"> closed</span>}</h2>
              <div className="adm-inline"><button className="adm-ghost" onClick={() => edit(j)}>Edit</button>
                <button className="adm-ghost" disabled={busy} onClick={() => window.confirm('Delete this job and all its applications?') && run('hiring-delete', { id: j.id }, 'Deleted.')}>Delete</button></div></div>
            <div className="hire-link"><code>{link}</code><button className="adm-btn" onClick={() => { copy(link); setMsg('Link copied. Share it on LinkedIn.'); }}>Copy link</button></div>
            <div className="hire-dates">
              <span>⏰ Applications close: <b>{j.apply_deadline ? `${fmtDT(j.apply_deadline)} (${left(j.apply_deadline, now)})` : 'no deadline'}</b></span>
              <span>📝 Research due: <b>{j.research_deadline ? `${fmtDT(j.research_deadline)} (${left(j.research_deadline, now)})` : 'no deadline'}</b></span>
              <span>✉️ Auto email: <b>{j.auto_email ? (j.invites_sent_at ? 'sent' : 'on') : 'off'}</b> · Auto approve: <b>{j.auto_approve ? 'on' : 'off'}</b> · {j.commission_pct}%</span>
            </div>
            <div className="hire-stages">
              {STAGES.map(([k, l]) => <button key={k} className={f === k ? 'on' : ''} style={{ '--c': STAGE_COLOR[k] }} onClick={() => { setFilter({ ...filter, [j.id]: k }); setOpen(j.id); }}><b>{cnt(k)}</b><span>{l}</span></button>)}
              <button className={f === 'all' ? 'on' : ''} style={{ '--c': '#e2e8f0' }} onClick={() => { setFilter({ ...filter, [j.id]: 'all' }); setOpen(j.id); }}><b>{apps.length}</b><span>All</span></button>
            </div>
            <div className="adm-inline pad">
              {cnt('applied') > 0 && <button className="adm-btn" disabled={busy} onClick={() => window.confirm(`Email the research task to ${cnt('applied')} applicant(s) now?`) && run('hiring-job-action', { id: j.id, action: 'invite-all' })}>Send research task to {cnt('applied')} now</button>}
              <button className="adm-ghost" onClick={() => setOpen(open === j.id ? '' : j.id)}>{open === j.id ? 'Hide applicants' : 'Show applicants'}</button>
            </div>
            {open === j.id && (
              <div className="hire-apps">
                {[...shown].sort((a, b) => (a.status === 'submitted' ? -1 : 0) - (b.status === 'submitted' ? -1 : 0)).map((a) => (
                  <div className="hire-app" key={a.id} style={{ '--c': STAGE_COLOR[a.status] }}>
                    <div className="hire-app-top">
                      <div><b>{a.name}</b> <span className="hire-chip">{(STAGES.find((s) => s[0] === a.status) || [0, a.status])[1]}</span>
                        <small>{a.email} · <a href={`https://wa.me/${String(a.whatsapp).replace(/\D/g, '').replace(/^0/, '234')}`} target="_blank" rel="noreferrer">WhatsApp {a.whatsapp}</a> · applied {ago(a.created_at)}{a.submitted_at ? ` · research ${ago(a.submitted_at)}` : ''}</small></div>
                      <button className="adm-ghost" onClick={() => setSeeApp(seeApp === a.id ? '' : a.id)}>{seeApp === a.id ? 'Close' : 'Read'}</button>
                    </div>
                    {seeApp === a.id && (
                      <div className="hire-read">
                        <h4>Why we should choose them</h4><p>{a.why}</p>
                        {a.cv_name && <p><button type="button" className="adm-btn" onClick={() => openCv(a.id)}>📄 Download CV ({a.cv_name})</button></p>}
                        <h4>Research{a.submitted_at ? '' : ' (not sent yet)'}</h4><p>{a.research || '—'}</p>
                      </div>
                    )}
                    <div className="adm-inline pad">
                      {a.status === 'applied' && <button className="adm-btn" disabled={busy} onClick={() => run('hiring-app', { id: a.id, action: 'invite' })}>Send research task</button>}
                      {a.status === 'invited' && <button className="adm-ghost" disabled={busy} onClick={() => run('hiring-app', { id: a.id, action: 'invite' })}>Send task again</button>}
                      {['submitted', 'invited', 'applied'].includes(a.status) && a.status === 'submitted' && <button className="adm-btn" disabled={busy} onClick={() => window.confirm(`Approve ${a.name}? They get the partner signup link and the group chat by email.`) && run('hiring-app', { id: a.id, action: 'approve' })}>Approve and email</button>}
                      {a.status === 'approved' && <button className="adm-ghost" disabled={busy} onClick={() => run('hiring-app', { id: a.id, action: 'approve' })}>Resend approval email</button>}
                      {!['rejected', 'joined'].includes(a.status) && <button className="adm-ghost" disabled={busy} onClick={() => window.confirm(`Not take ${a.name} forward? They get a polite email.`) && run('hiring-app', { id: a.id, action: 'reject' })}>Not this time</button>}
                      {a.status === 'rejected' && <button className="adm-ghost" disabled={busy} onClick={() => run('hiring-app', { id: a.id, action: 'reset' })}>Move back to applied</button>}
                    </div>
                  </div>
                ))}
                {!shown.length && <p className="adm-empty">Nobody here yet.</p>}
              </div>
            )}
          </section>
        );
      })}
      {!data.jobs.length && !form && <section className="adm-card"><p className="adm-empty">No jobs yet. Tap “New job” to create the promoter role and get its link.</p></section>}
    </div>
  );
}

import { readStudentNames } from '../utils/readSheet';
import { OrgFields, KindToggle, PasswordInput, EMPTY_DETAILS, validateDetails, detailsPayload } from '../components/SchoolSignupFields';
import { LogoCard, Notices, Mocks, CentreEarn, PrintBrand, waLink, waStudentText, waClassText } from '../components/PortalExtras';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { saveUser } from '../utils/storage';
import { LineChart, BarChart, HBars, Donut, Delta, colorFor } from '../components/PortalCharts';
import { captureReferralFromURL, getReferralAttribution, getReferralClickedAt, sendReferralSignup } from '../utils/referral';
import { captureTrafficSource, trackSignupSource } from '../utils/trafficSource';
import logo from '../assets/elite-scholars-logo.png';
import '../styles/schoolportal.css';

// School portal (/school-portal): school admins and teachers. Same account system as the app.
const ngDate = (s) => (s ? new Date(s).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) : 'never');
const ago = (s) => { if (!s) return 'never'; const d = (Date.now() - new Date(s).getTime()) / 86400000; return d < 1 ? 'today' : d < 2 ? 'yesterday' : `${Math.floor(d)} days ago`; };
const ng = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');

async function api(op, body) {
  try {
    const r = await fetch(`/api/portal/${op}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    const d = await r.json().catch(() => ({}));
    return { status: r.status, ...d };
  } catch { return { success: false, error: 'No connection. Check your data and try again.' }; }
}
async function schoolApi(op, body) { // the existing class/assignment routes
  try {
    const r = await fetch(`/api/school/${op}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    return { ...(await r.json().catch(() => ({}))) };
  } catch { return { success: false, error: 'No connection.' }; }
}
const getUser = () => { try { return JSON.parse(localStorage.getItem('ep_user') || 'null'); } catch { return null; } };
const hasToken = (u) => !!(u && typeof u.passwordHash === 'string' && u.passwordHash.startsWith('u1.'));

/* ── sign in / create account ─────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@,()"']+@[^\s@,()"']+\.[^\s@,()"']+$/;
const qsGet = (k) => { try { return new URLSearchParams(window.location.search).get(k); } catch { return null; } };

function Gate({ onDone, initialKind }) {
  const [mode, setMode] = useState(() => (qsGet('mode') === 'login' ? 'login' : 'signup'));
  const [kind, setKind] = useState(initialKind || 'school');
  const [f, setF] = useState({ ...EMPTY_DETAILS, email: '', password: '', agree: false });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const word = kind === 'centre' ? 'centre' : 'school';

  const login = async (email) => {
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: f.password }) });
    const d = await r.json().catch(() => ({}));
    if (!d.success) { setErr(d.message || d.error || 'Incorrect email or password.'); return null; }
    return d.profile;
  };
  const register = async (email) => {
    const parts = f.contact_name.trim().split(/\s+/);
    let profile = null;
    for (let i = 0; i < 4 && !profile; i++) {
      const base = parts[0].toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12) || 'teacher';
      const username = (/^[a-z]/.test(base) ? base : 't' + base) + Math.floor(100 + Math.random() * 9000);
      const r = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName: parts[0], lastName: parts.slice(1).join(' ') || '-', email, password: f.password, studentType: 'school_staff', selectedExams: [], username, referredBy: getReferralAttribution() || '', referralClickedAt: getReferralClickedAt() }) });
      const d = await r.json().catch(() => ({}));
      if (d.success) { profile = d.profile; try { trackSignupSource(); sendReferralSignup(profile.email, getReferralAttribution()); localStorage.setItem('es_has_account', '1'); } catch { /* tracking only */ } }
      else if (!/username/i.test(d.error || '')) {
        if (/already exists/i.test(d.error || '')) { setMode('login'); setErr('That email already has an account. Enter your password to sign in.'); } else setErr(d.error || 'Could not create the account.');
        return null;
      }
    }
    if (!profile) setErr('Could not create the account. Try again.');
    return profile;
  };

  const submit = async (e) => {
    e.preventDefault(); setErr('');
    const email = f.email.trim().toLowerCase();
    if (mode === 'signup' || mode === 'teacher') {
      if (f.contact_name.trim().split(/\s+/)[0].length < 2) return setErr('Enter your full name.');
      if (!EMAIL_RE.test(email)) return setErr('Enter a valid email address.');
      if (f.password.length < 8) return setErr('Choose a password of at least 8 characters.');
      if (mode === 'signup') { const bad = validateDetails(f, kind); if (bad) return setErr(bad); }
      if (!f.agree) return setErr('Please tick the box to accept the Terms and Privacy Policy.');
    } else if (!EMAIL_RE.test(email) || f.password.length < 8) return setErr('Enter your email and a password of at least 8 characters.');
    setBusy(true);
    try {
      const profile = mode === 'login' ? await login(email) : await register(email); // 'teacher' = account only, no school
      if (!profile) { setBusy(false); return; }
      saveUser({ name: `${profile.firstName} ${profile.lastName}`, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, studentType: profile.studentType, selectedExams: profile.selectedExams || [], passwordHash: profile.passwordHash, username: profile.username || '' });
      let note = '';
      if (mode === 'signup') { const r = await api('school-create', detailsPayload(f, kind)); if (!r.success) note = r.error || 'Your account is ready, but we could not create the ' + word + '. Fill in the details again below.'; }
      onDone(note, mode === 'signup' && note ? { f, kind } : null);
    } catch { setErr('No connection. Try again.'); }
    setBusy(false);
  };

  if (mode === 'teacher') {
    return (
      <form className="spt-card spt-gate" onSubmit={submit} noValidate>
        <h2>Teacher account</h2>
        <p>For teachers whose school or centre is already on EliteScholars. Your admin adds this email to the school, then it appears here.</p>
        <label className="spt-lbl">Your full name<input value={f.contact_name} maxLength={80} onChange={set('contact_name')} autoComplete="name" /></label>
        <label className="spt-lbl">Email<input type="email" value={f.email} onChange={set('email')} autoComplete="email" inputMode="email" /></label>
        <label className="spt-lbl">Password<PasswordInput value={f.password} onChange={set('password')} autoComplete="new-password" placeholder="At least 8 characters" /></label>
        <label className="spt-check spt-terms"><input type="checkbox" checked={f.agree} onChange={(e) => setF({ ...f, agree: e.target.checked })} /><span>I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms</a> and <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</span></label>
        {err && <div className="spt-err" role="alert">{err}</div>}
        <button className="spt-btn" disabled={busy}>{busy ? 'Creating your account…' : 'Create teacher account'}</button>
        <button type="button" className="spt-link" onClick={() => { setMode('signup'); setErr(''); }}>Registering a school or centre instead?</button>
        <button type="button" className="spt-link" onClick={() => { setMode('login'); setErr(''); }}>I already have an account</button>
      </form>
    );
  }
  if (mode === 'login') {
    return (
      <form className="spt-card spt-gate" onSubmit={submit}>
        <h2>Sign in</h2>
        <p>Use the email you registered with.</p>
        <input type="email" placeholder="Email" value={f.email} onChange={set('email')} autoComplete="email" />
        <PasswordInput value={f.password} onChange={set('password')} autoComplete="current-password" />
        {err && <div className="spt-err" role="alert">{err}</div>}
        <button className="spt-btn" disabled={busy}>{busy ? 'Please wait…' : 'Sign in'}</button>
        <button type="button" className="spt-link" onClick={() => { setMode('signup'); setErr(''); }}>New school or centre? Register</button>
      </form>
    );
  }
  return (
    <form className="spt-card spt-gate wide" onSubmit={submit} noValidate>
      <h2>Register your {word}</h2>
      <p>Free trial, no card needed. Takes about two minutes. You will manage classes, students and results from this account.</p>
      <KindToggle kind={kind} setKind={setKind} />
      <h4>About you</h4>
      <label className="spt-lbl">Your full name<input placeholder="e.g. Ngozi Adeyemi" value={f.contact_name} maxLength={80} onChange={set('contact_name')} autoComplete="name" /></label>
      <label className="spt-lbl">Email <em>(you will sign in with this)</em><input type="email" placeholder="you@example.com" value={f.email} onChange={set('email')} autoComplete="email" inputMode="email" /></label>
      <label className="spt-lbl">Password<PasswordInput value={f.password} onChange={set('password')} autoComplete="new-password" placeholder="At least 8 characters" /></label>
      <h4>About your {word}</h4>
      <OrgFields f={f} set={set} setF={setF} kind={kind} />
      <label className="spt-check spt-terms"><input type="checkbox" checked={f.agree} onChange={(e) => setF({ ...f, agree: e.target.checked })} /><span>I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms</a> and <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</span></label>
      {err && <div className="spt-err" role="alert">{err}</div>}
      <button className="spt-btn" disabled={busy}>{busy ? 'Creating your account…' : `Create ${word} account`}</button>
      <button type="button" className="spt-link" onClick={() => { setMode('teacher'); setErr(''); }}>I am a teacher joining a school that is already here</button>
      <button type="button" className="spt-link" onClick={() => { setMode('login'); setErr(''); }}>I already have an account</button>
    </form>
  );
}

/* ── small pieces ─────────────────────────────────────────────────────────── */
const Stat = ({ v, l }) => <div className="spt-stat"><b>{v}</b><span>{l}</span></div>;
const Empty = ({ children }) => <p className="spt-empty">{children}</p>;
function Msg({ m }) { return m ? <div className={m.ok ? 'spt-ok' : 'spt-err'}>{m.text}</div> : null; }

/* ── contact details + "show us on the website" ───────────────────────────── */
const SHOW_BADGE = { none: ['Not listed', 'no'], pending: ['Waiting for approval', 'warn'], approved: ['Showing on our site', 'ok'], rejected: ['Not approved', 'no'] };
function ProfileCard({ sid, data, reload }) {
  const sc = data.school, kind = sc.kind || 'school', word = kind === 'centre' ? 'centre' : 'school';
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(() => ({ ...EMPTY_DETAILS, orgName: sc.name, contact_name: sc.contact_name || '', contact_role: sc.contact_role || '', phone: sc.phone || '', state: sc.state || '', city: sc.city || '', size_band: sc.size_band || '', showcase: sc.showcase_status === 'pending' || sc.showcase_status === 'approved', tagline: sc.showcase_tagline || '' }));
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const [label, tone] = SHOW_BADGE[sc.showcase_status || 'none'];
  const incomplete = !sc.phone || !sc.state || !sc.city;
  const save = async () => {
    const bad = validateDetails(f, kind); if (bad) return setMsg({ text: bad });
    setBusy(true); setMsg(null);
    const r = await api('school-profile-save', { school_id: sid, contact_name: f.contact_name, contact_role: f.contact_role, phone: f.phone, state: f.state, city: f.city, size_band: f.size_band, showcase: f.showcase, tagline: f.tagline });
    setBusy(false);
    if (!r.success) return setMsg({ text: r.error });
    setMsg({ ok: true, text: r.showcase_status === 'pending' ? 'Saved. We will review your listing and it appears on the site once approved.' : 'Saved.' }); reload();
  };
  return (
    <div className="spt-card spt-noprint">
      <div className="spt-between"><div><h3>Details &amp; website listing</h3><small>Contact details for EliteScholars, and whether your {word} is shown on our site.</small></div><span className={`spt-badge ${tone}`}>{label}</span></div>
      {incomplete && !open && <div className="spt-banner trial">Please add your phone number, state and town so we can reach you. <button className="spt-link" onClick={() => setOpen(true)}>Add details</button></div>}
      {!open && <div className="spt-row"><button className="spt-ghost" onClick={() => setOpen(true)}>{incomplete ? 'Add details' : 'Edit details'}</button></div>}
      {open && (
        <>
          <label className="spt-lbl">Contact person<input value={f.contact_name} maxLength={80} onChange={set('contact_name')} /></label>
          <OrgFields f={f} set={set} setF={setF} kind={kind} hideName />
          {sc.showcase_status === 'rejected' && <p className="spt-note">We could not list this {word} on the site. Contact EliteScholars if you think this is a mistake.</p>}
          <Msg m={msg} />
          <div className="spt-row"><button className="spt-btn" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save'}</button><button className="spt-ghost" onClick={() => { setOpen(false); setMsg(null); }}>Close</button></div>
        </>
      )}
    </div>
  );
}

/* ── classes ──────────────────────────────────────────────────────────────── */
function Classes({ sid, data, reload, isAdmin }) {
  const [form, setForm] = useState(null);
  const [open, setOpen] = useState('');
  const [msg, setMsg] = useState(null);
  const teachers = (data.staff || []).filter((s) => s.registered || s.owner);
  const save = async () => {
    const r = await api('class-save', { school_id: sid, ...form });
    if (!r.success) return setMsg({ text: r.error });
    setForm(null); setMsg({ ok: true, text: 'Saved.' }); reload();
  };
  const del = async (c) => { if (!window.confirm(`Delete ${c.name}? Its students stay in the school but leave the class.`)) return; const r = await api('class-delete', { school_id: sid, id: c.id }); if (!r.success) setMsg({ text: r.error }); else reload(); };
  return (
    <div>
      <button className="spt-btn" onClick={() => { setForm({ name: '', teacher_email: '' }); setMsg(null); }}>+ New class</button>
      <Msg m={msg} />
      {form && (
        <div className="spt-card">
          <h3>{form.id ? 'Edit class' : 'New class'}</h3>
          <input placeholder="Class name, e.g. SS3 Science A" value={form.name} maxLength={60} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {isAdmin && (
            <select value={form.teacher_email || ''} onChange={(e) => setForm({ ...form, teacher_email: e.target.value })}>
              <option value="">Class teacher: me</option>
              {teachers.map((t) => <option key={t.email} value={t.email}>{t.name || t.email}{t.owner ? ' (owner)' : ''}</option>)}
            </select>
          )}
          <div className="spt-row"><button className="spt-btn" onClick={save}>Save</button><button className="spt-ghost" onClick={() => setForm(null)}>Cancel</button></div>
        </div>
      )}
      {!data.classes.length && <Empty>No classes yet. Create one, then add students.</Empty>}
      {data.classes.map((c) => (
        <div className="spt-card" key={c.id}>
          <div className="spt-between"><div><b>{c.name}</b><small>Teacher: {c.teacher_name} · {c.students} student{c.students === 1 ? '' : 's'}</small></div><span className="spt-code" title="Students can join with this code in the app">{c.code}</span></div>
          <div className="spt-row">
            <button className="spt-ghost" onClick={() => setOpen(open === c.id ? '' : c.id)}>{open === c.id ? 'Hide homework' : 'Homework'}</button>
            {(isAdmin || c.teacher === data.me) && <button className="spt-ghost" onClick={() => setForm({ id: c.id, name: c.name, teacher_email: c.teacher })}>Edit</button>}
            {isAdmin && <button className="spt-ghost danger" onClick={() => del(c)}>Delete</button>}
          </div>
          {open === c.id && <Homework classId={c.id} />}
        </div>
      ))}
      <p className="spt-note">Students join a class in the EliteScholars app: Profile, School, then enter the class code. Or add them yourself in Students.</p>
    </div>
  );
}

function Homework({ classId }) {
  const [list, setList] = useState(null);
  const [f, setF] = useState({ title: '', body: '', due_at: '' });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => { const r = await schoolApi('assign-list', { class_id: classId }); setList(r.assignments || []); }, [classId]);
  useEffect(() => { load(); }, [load]);
  const post = async () => {
    setBusy(true); setMsg(null);
    const r = await schoolApi('assign-create', { class_id: classId, title: f.title, body: f.body, due_at: f.due_at || undefined });
    setBusy(false);
    if (!r.success) return setMsg({ text: r.error || 'Could not post.' });
    setF({ title: '', body: '', due_at: '' }); setMsg({ ok: true, text: `Posted. ${r.notified || 0} students notified.` }); load();
  };
  const del = async (id) => { if (!window.confirm('Delete this homework?')) return; await schoolApi('assign-delete', { id }); load(); };
  return (
    <div className="spt-sub">
      <input placeholder="Homework title" value={f.title} maxLength={120} onChange={(e) => setF({ ...f, title: e.target.value })} />
      <textarea placeholder="What should students do? (questions, pages, topics)" rows={3} value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} />
      <label className="spt-lbl">Due date (optional)<input type="date" value={f.due_at} onChange={(e) => setF({ ...f, due_at: e.target.value })} /></label>
      <button className="spt-btn" disabled={busy} onClick={post}>{busy ? 'Posting…' : 'Post homework'}</button>
      <Msg m={msg} />
      {list && list.map((a) => (
        <div className="spt-item" key={a.id}><div><b>{a.title}</b><small>{a.done_count || 0} done{a.due_at ? ` · due ${ngDate(a.due_at)}` : ''}</small></div><button className="spt-ghost danger" onClick={() => del(a.id)}>Delete</button></div>
      ))}
      {list && !list.length && <Empty>No homework yet.</Empty>}
    </div>
  );
}

/* ── students ─────────────────────────────────────────────────────────────── */
function csv(accounts) {
  const rows = [['Name', 'Login email', 'Password'], ...accounts.filter((a) => a.password).map((a) => [a.name, a.email, a.password])];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}
function Students({ sid, data, isAdmin }) {
  const [viewer, setViewer] = useState('');
  const [classId, setClassId] = useState('');
  const [rows, setRows] = useState(null);
  const [q, setQ] = useState('');
  const [mode, setMode] = useState('');
  const [msg, setMsg] = useState(null);
  const [identifier, setIdentifier] = useState('');
  const [names, setNames] = useState('');
  const [target, setTarget] = useState('');
  const [creds, setCreds] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => { const r = await api('students', { school_id: sid, class_id: classId || undefined }); setRows(r.students || []); }, [sid, classId]);
  useEffect(() => { load(); }, [load]);
  const cls = target || classId || (data.classes[0] && data.classes[0].id) || '';
  const add = async () => { setBusy(true); const r = await api('student-add', { school_id: sid, class_id: cls, identifier }); setBusy(false); if (!r.success) return setMsg({ text: r.error }); setIdentifier(''); setMsg({ ok: true, text: `${r.added} added.` }); load(); };
  const bulk = async () => {
    setBusy(true); setMsg(null);
    const list = [...new Set(names.split(/\n/).map((n) => n.trim()).filter((n) => n.length >= 2))];
    const all = { class: '', created: 0, accounts: [] };
    for (let i = 0; i < list.length; i += 40) {
      setMsg({ ok: true, text: `Creating accounts… ${Math.min(i + 40, list.length)} of ${list.length}` });
      const r = await api('student-bulk', { school_id: sid, class_id: cls, names: list.slice(i, i + 40) });
      if (!r.success) { setBusy(false); if (all.accounts.length) { setCreds(all); load(); } return setMsg({ text: `${r.error} ${all.accounts.length ? `(${all.accounts.length} were created before this.)` : ''}` }); }
      all.class = r.class || all.class; all.created += r.created || 0; all.accounts.push(...(r.accounts || []));
    }
    setBusy(false); setMsg(null); setCreds(all); setNames(''); load();
  };
  const upload = async (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = '';
    if (!f) return;
    try { const list = await readStudentNames(f); setNames(list.join('\n')); setMsg({ ok: true, text: `${list.length} name${list.length === 1 ? '' : 's'} found in ${f.name}. Check the list, then create accounts.` }); }
    catch (er) { setMsg({ text: er.message || 'Could not read that file.' }); }
  };
  const reset = async (s) => { if (!window.confirm(`Make a new password for ${s.name}?`)) return; const r = await api('student-reset', { school_id: sid, email: s.key }); if (!r.success) return setMsg({ text: r.error }); setCreds({ class: '', created: 1, accounts: [{ name: s.name, email: r.email, password: r.password }] }); };
  const move = async (s) => { const to = window.prompt('Move to which class? Type the class name exactly, or leave empty to remove from all classes.', s.classes[0] ? s.classes[0].name : ''); if (to === null) return; const c = data.classes.find((x) => x.name.toLowerCase() === to.trim().toLowerCase()); if (to.trim() && !c) return setMsg({ text: 'No class with that name.' }); const r = await api('student-move', { school_id: sid, email: s.key, class_id: c ? c.id : '' }); if (!r.success) return setMsg({ text: r.error }); load(); };
  const remove = async (s) => { if (!window.confirm(`Remove ${s.name} from the school?`)) return; const r = await api('student-remove', { school_id: sid, email: s.key }); if (!r.success) return setMsg({ text: r.error }); load(); };
  const shown = (rows || []).filter((s) => !q || (s.name + ' ' + s.username).toLowerCase().includes(q.toLowerCase()));
  const download = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv(creds.accounts)], { type: 'text/csv' })); a.download = 'student-logins.csv'; a.click(); };
  return (
    <div>
      <div className="spt-row">
        <select value={classId} onChange={(e) => setClassId(e.target.value)}><option value="">All classes</option>{data.classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <input placeholder="Search name" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {data.classes.length > 0 && (
        <div className="spt-row">
          <button className="spt-btn" onClick={() => setMode(mode === 'add' ? '' : 'add')}>+ Add student</button>
          <button className="spt-ghost" onClick={() => setMode(mode === 'bulk' ? '' : 'bulk')}>Create accounts</button>
        </div>
      )}
      {mode && (
        <div className="spt-card">
          <label className="spt-lbl">Into class
            <select value={cls} onChange={(e) => setTarget(e.target.value)}>{data.classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          </label>
          {mode === 'add' ? (
            <>
              <input placeholder="Student's username or email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} autoCapitalize="none" />
              <button className="spt-btn" disabled={busy || !identifier} onClick={add}>{busy ? 'Adding…' : 'Add to class'}</button>
              <p className="spt-note">For students who already have an EliteScholars account.</p>
            </>
          ) : (
            <>
              <label className="spt-ghost spt-file">📄 Upload Excel or CSV<input type="file" accept=".xlsx,.xlsm,.csv,.txt,.tsv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={upload} /></label>
              <textarea rows={5} placeholder={'Upload a file above, or type one name per line, e.g.\nAda Obi\nChidi Okafor'} value={names} onChange={(e) => setNames(e.target.value)} />
              <button className="spt-btn" disabled={busy || !names.trim()} onClick={bulk}>{busy ? 'Creating…' : 'Create accounts'}</button>
              <p className="spt-note">Upload a whole class at once (Excel .xlsx or CSV, names in the first column or a column headed Name). Each student gets a login and a temporary password to print and hand out.</p>
            </>
          )}
        </div>
      )}
      <Msg m={msg} />
      {creds && (
        <div className="spt-card spt-creds">
          <h3>Logins created</h3>
          <p className="spt-note">Passwords are shown <b>only now</b>. Save or print this page. Students sign in at elitescholars.site/app with the login email and password.</p>
          <table><thead><tr><th>Name</th><th>Login email</th><th>Password</th></tr></thead><tbody>{creds.accounts.map((a, i) => <tr key={i}><td>{a.name}</td><td>{a.email || '-'}</td><td>{a.password || a.error}</td></tr>)}</tbody></table>
          <div className="spt-row spt-noprint"><button className="spt-btn" onClick={() => window.print()}>Print</button><button className="spt-ghost" onClick={download}>Download CSV</button><button className="spt-ghost" onClick={() => setCreds(null)}>Close</button></div>
        </div>
      )}
      {viewer && <StudentReport sid={sid} email={viewer} school={data.school.name} onClose={() => setViewer('')} />}
      {!rows && <Empty>Loading…</Empty>}
      {rows && !shown.length && <Empty>No students yet.</Empty>}
      {shown.map((s) => (
        <div className="spt-card spt-stu" key={s.key}>
          <div className="spt-between"><div><b>{s.name}</b><small>{s.username ? '@' + s.username + ' · ' : ''}{s.classes.map((c) => c.name).join(', ') || 'No class'}</small></div><div className="spt-avg"><b>{s.avg}%</b><small>avg</small></div></div>
          <small>{s.quizzes} quizzes · {s.xp} XP · {s.streak} day streak · last seen {ago(s.last_active)}{s.created ? ' · school account' : ''}</small>
          <div className="spt-row">
            <button className="spt-ghost" onClick={() => setViewer(s.key)}>Report</button>
            {s.created && <button className="spt-ghost" onClick={() => reset(s)}>New password</button>}
            {isAdmin && <button className="spt-ghost" onClick={() => move(s)}>Move</button>}
            <button className="spt-ghost danger" onClick={() => remove(s)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── staff ────────────────────────────────────────────────────────────────── */
function Staff({ sid, data, reload }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('teacher');
  const [msg, setMsg] = useState(null);
  const add = async () => {
    const r = await api('staff-add', { school_id: sid, email, role });
    if (!r.success) return setMsg({ text: r.error });
    setEmail(''); setMsg({ ok: true, text: r.hasAccount ? 'Added. They can open the portal now.' : 'Added. Ask them to create an account at elitescholars.site/school-portal with this same email.' }); reload();
  };
  const remove = async (s) => { if (!window.confirm(`Remove ${s.name || s.email}? Their classes move to you.`)) return; const r = await api('staff-remove', { school_id: sid, email: s.email }); if (!r.success) return setMsg({ text: r.error }); reload(); };
  return (
    <div>
      <div className="spt-card">
        <h3>Add a teacher</h3>
        <input type="email" placeholder="Teacher's email" value={email} onChange={(e) => setEmail(e.target.value)} autoCapitalize="none" />
        <select value={role} onChange={(e) => setRole(e.target.value)}><option value="teacher">Teacher (own classes only)</option><option value="admin">Admin (whole school)</option></select>
        <button className="spt-btn" disabled={!email} onClick={add}>Add</button>
        <Msg m={msg} />
      </div>
      {data.staff.map((s) => (
        <div className="spt-card" key={s.email}>
          <div className="spt-between"><div><b>{s.name || s.email}</b><small>{s.email} · {s.role}{s.owner ? ' · owner' : ''}{!s.registered ? ' · not signed up yet' : ''}</small></div>{!s.owner && <button className="spt-ghost danger" onClick={() => remove(s)}>Remove</button>}</div>
        </div>
      ))}
    </div>
  );
}

/* ── helpers for reports ──────────────────────────────────────────────────── */
const shortDay = (d) => { const x = new Date(d + 'T00:00:00'); return `${x.getDate()}/${x.getMonth() + 1}`; };
const riskPill = (r) => <span className={`spt-risk ${r}`}>{r === 'high' ? 'Needs help' : r === 'watch' ? 'Watch' : 'On track'}</span>;
const subjName = (s) => String(s || '').replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
function downloadCsv(name, rows) {
  const body = rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/csv' })); a.download = name; a.click();
}
function useReport(sid, days, classId) {
  const [d, setD] = useState(null);
  useEffect(() => { let on = true; setD(null); api('reports', { school_id: sid, days, class_id: classId || undefined }).then((x) => on && setD(x)); return () => { on = false; }; }, [sid, days, classId]);
  return d;
}

/* ── student report card ──────────────────────────────────────────────────── */
function StudentReport({ sid, email, school, logo, onClose }) {
  const [d, setD] = useState(null);
  useEffect(() => { api('student-report', { school_id: sid, email, days: 90 }).then(setD); }, [sid, email]);
  return (
    <div className="spt-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="spt-sheet spt-printable">
        <PrintBrand school={school} logo={logo} />
        <div className="spt-between spt-noprint"><b>Student report</b><div className="spt-row">{d && d.success && <a className="spt-ghost" href={waLink(waStudentText(school, d))} target="_blank" rel="noreferrer">WhatsApp</a>}<button className="spt-ghost" onClick={() => window.print()}>Print</button><button className="spt-ghost" onClick={onClose}>Close</button></div></div>
        {!d && <Empty>Loading…</Empty>}
        {d && !d.success && <div className="spt-err">{d.error}</div>}
        {d && d.success && (() => {
          const s = d.student;
          return (
            <div className="spt-stack">
              <div className="spt-report-head"><div><h2>{s.name}</h2><small>{school} · {s.classes.join(', ')}{s.username ? ` · @${s.username}` : ''}</small></div><div className="spt-avg"><b>{d.avg}%</b><small>average, last 90 days</small></div></div>
              <div className="spt-stats"><Stat v={d.quizzes} l="Quizzes (90 days)" /><Stat v={s.streak} l="Day streak" /><Stat v={s.xp} l="XP" /><Stat v={'Lv ' + s.level} l="Level" /></div>
              <div className="spt-card"><h3>Score trend by week {d.trend !== null && <Delta now={d.avg} before={d.avg - d.trend} unit="%" />}</h3>
                <LineChart data={d.weekly.map((w) => ({ label: w.label, value: w.avg }))} max={100} unit="%" height={140} /></div>
              <div className="spt-card"><h3>Subjects</h3>{d.subjects.length ? <HBars data={d.subjects.map((x) => ({ label: subjName(x.subject), value: x.avg, note: `${x.attempts} quiz${x.attempts === 1 ? '' : 'zes'} · best ${x.best}% · last ${x.last}%` }))} /> : <Empty>No quizzes taken in this period.</Empty>}</div>
              <div className="spt-two">
                <div className="spt-card"><h3>Strengths</h3>{d.strengths.length ? d.strengths.map((x) => <div className="spt-item" key={x.subject}><span>{subjName(x.subject)}</span><b style={{ color: colorFor(x.avg) }}>{x.avg}%</b></div>) : <Empty>Needs 2+ quizzes per subject.</Empty>}</div>
                <div className="spt-card"><h3>Focus on</h3>{d.weak.length ? d.weak.map((x) => <div className="spt-item" key={x.subject}><span>{subjName(x.subject)}</span><b style={{ color: colorFor(x.avg) }}>{x.avg}%</b></div>) : <Empty>Needs 2+ quizzes per subject.</Empty>}</div>
              </div>
              <div className="spt-card"><h3>Homework</h3>{d.homework.length ? d.homework.map((h, i) => <div className="spt-item" key={i}><span>{h.title}{h.due_at ? <small> due {ngDate(h.due_at)}</small> : null}</span><b style={{ color: h.done ? '#059669' : '#B45309' }}>{h.done ? 'Done' : 'Not yet'}</b></div>) : <Empty>No homework set.</Empty>}</div>
              <div className="spt-card"><h3>Recent quizzes</h3>{d.recent.length ? d.recent.map((r, i) => <div className="spt-item" key={i}><span>{subjName(r.subject)}<small> {ngDate(r.at)}</small></span><b style={{ color: colorFor(r.score) }}>{r.score}%</b></div>) : <Empty>No quizzes yet.</Empty>}</div>
              <small className="spt-foot">Last seen {ago(s.last_active)} · Generated {new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} · EliteScholars</small>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

/* ── reports ──────────────────────────────────────────────────────────────── */
function Reports({ sid, school, logo, classes }) {
  const [days, setDays] = useState(30);
  const [classId, setClassId] = useState('');
  const [sort, setSort] = useState({ k: 'name', dir: 1 });
  const [view, setView] = useState('');
  const d = useReport(sid, days, classId);
  if (!d) return <Empty>Loading report…</Empty>;
  if (!d.success) return <div className="spt-err">{d.error}</div>;
  const s = d.summary;
  const rows = [...d.students].sort((a, c) => { const x = a[sort.k], y = c[sort.k]; return (typeof x === 'string' ? x.localeCompare(y) : (x ?? -1) - (y ?? -1)) * sort.dir; });
  const th = (k, l) => <th onClick={() => setSort({ k, dir: sort.k === k ? -sort.dir : 1 })} className="spt-sort">{l}{sort.k === k ? (sort.dir > 0 ? ' ↑' : ' ↓') : ''}</th>;
  const csvAll = () => downloadCsv(`${school}-student-report.csv`, [['Name', 'Username', 'Classes', 'Quizzes', 'Average %', 'Change %', 'Streak', 'XP', 'Last active', 'Homework', 'Status'], ...d.students.map((x) => [x.name, x.username, x.classes.join('; '), x.quizzes, x.avg, x.trend ?? '', x.streak, x.xp, x.last_active ? new Date(x.last_active).toLocaleDateString('en-NG') : '', x.homework, x.risk === 'high' ? 'Needs help' : x.risk === 'watch' ? 'Watch' : 'On track'])]);
  return (
    <div className="spt-stack spt-printable">
      <PrintBrand school={school} logo={logo} />
      <div className="spt-row spt-noprint">
        <a className="spt-ghost" href={waLink(waClassText(school, days, d))} target="_blank" rel="noreferrer">Share summary on WhatsApp</a>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select>
        <select value={classId} onChange={(e) => setClassId(e.target.value)}><option value="">All classes</option>{classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
      </div>
      <div className="spt-stats">
        <div className="spt-stat"><b>{s.avg}%</b><span>Average score</span><Delta now={s.avg} before={s.prevAvg} unit="%" /></div>
        <div className="spt-stat"><b>{s.quizzes}</b><span>Quizzes taken</span><Delta now={s.quizzes} before={s.prevQuizzes} /></div>
        <div className="spt-stat"><b>{s.participation}%</b><span>{s.active} of {s.students} took a quiz</span></div>
        <div className="spt-stat"><b style={{ color: s.atRisk ? '#DC2626' : undefined }}>{s.atRisk}</b><span>Need help{s.watch ? ` · ${s.watch} to watch` : ''}</span></div>
      </div>
      <div className="spt-card"><h3>Quizzes and active students per day</h3>
        <LineChart data={d.series.map((x) => ({ label: shortDay(x.day), value: x.quizzes }))} data2={d.series.map((x) => ({ label: shortDay(x.day), value: x.active }))} />
        <div className="spt-legend"><span><i style={{ background: '#7C3AED' }} />Quizzes</span><span><i style={{ background: '#10B981' }} />Students active</span></div></div>
      <div className="spt-two">
        <div className="spt-card"><h3>Participation</h3><div className="spt-center"><Donut value={s.active} total={s.students} label="took a quiz" color="#10B981" /></div></div>
        <div className="spt-card"><h3>Scores spread</h3><BarChart data={d.distribution.map((b) => ({ label: b.label, value: b.count, color: b.label === '0-39' ? '#EF4444' : b.label === '40-49' || b.label === '50-59' ? '#F59E0B' : '#10B981' }))} unit="" height={140} /><small>Number of students by average score.</small></div>
      </div>
      <div className="spt-card"><h3>Classes compared</h3>
        {d.classes.length ? (
          <>
            <HBars data={d.classes.map((c) => ({ label: c.name, value: c.avg, note: `${c.students} students · ${c.quizzes} quizzes · ${c.participation}% took part${c.homework !== null ? ` · homework ${c.homework}%` : ''}` }))} />
          </>
        ) : <Empty>No classes yet.</Empty>}</div>
      <div className="spt-card"><h3>Subjects</h3>{d.subjects.length ? <HBars data={d.subjects.map((x) => ({ label: subjName(x.subject), value: x.avg, note: `${x.attempts} quizzes · ${x.students} students` }))} /> : <Empty>No quizzes in this period.</Empty>}</div>
      <div className="spt-two">
        <div className="spt-card"><h3>Top students</h3>{d.top.length ? d.top.map((t, i) => <div className="spt-item" key={t.key}><button className="spt-link" onClick={() => setView(t.key)}>{i + 1}. {t.name}</button><b style={{ color: colorFor(t.avg) }}>{t.avg}%</b></div>) : <Empty>No quizzes yet.</Empty>}</div>
        <div className="spt-card"><h3>Most improved</h3>{d.improvers.length ? d.improvers.map((t) => <div className="spt-item" key={t.key}><button className="spt-link" onClick={() => setView(t.key)}>{t.name}</button><b style={{ color: '#059669' }}>+{t.trend}%</b></div>) : <Empty>Needs quizzes in both periods.</Empty>}</div>
      </div>
      <div className="spt-card"><h3>Needs attention</h3>{d.needsHelp.length ? d.needsHelp.map((t) => <div className="spt-item" key={t.key}><span><button className="spt-link" onClick={() => setView(t.key)}>{t.name}</button><small>{t.classes.join(', ')} · {t.idle_days === null ? 'never active' : `last active ${t.idle_days} day${t.idle_days === 1 ? '' : 's'} ago`}{t.quizzes >= 3 ? ` · avg ${t.avg}%` : ''}</small></span>{riskPill(t.risk)}</div>) : <Empty>Nobody needs attention. 🎉</Empty>}</div>
      <div className="spt-card"><div className="spt-between"><h3>All students</h3><div className="spt-row spt-noprint"><button className="spt-ghost" onClick={csvAll}>Download CSV</button><button className="spt-ghost" onClick={() => window.print()}>Print</button></div></div>
        <div className="spt-scroll"><table><thead><tr>{th('name', 'Student')}{th('quizzes', 'Quizzes')}{th('avg', 'Avg')}{th('trend', 'Change')}{th('streak', 'Streak')}{th('idle_days', 'Last seen')}{th('hw_pct', 'Homework')}<th>Status</th></tr></thead>
          <tbody>{rows.map((x) => <tr key={x.key}><td><button className="spt-link" onClick={() => setView(x.key)}>{x.name}</button><small>{x.classes.join(', ')}</small></td><td>{x.quizzes}</td><td style={{ color: x.quizzes ? colorFor(x.avg) : undefined, fontWeight: 800 }}>{x.quizzes ? x.avg + '%' : '-'}</td><td>{x.trend === null ? '-' : (x.trend > 0 ? '+' : '') + x.trend + '%'}</td><td>{x.streak}</td><td>{x.idle_days === null ? 'never' : x.idle_days === 0 ? 'today' : x.idle_days + 'd'}</td><td>{x.homework}</td><td>{riskPill(x.risk)}</td></tr>)}</tbody></table></div>
      </div>
      <small className="spt-foot">{school} · last {days} days · generated {new Date(d.generated).toLocaleString('en-NG')}</small>
      {view && <StudentReport sid={sid} email={view} school={school} logo={logo} onClose={() => setView('')} />}
    </div>
  );
}

/* ── overview with charts ─────────────────────────────────────────────────── */
function OverviewCharts({ sid, setTab }) {
  const d = useReport(sid, 30, '');
  if (!d || !d.success) return null;
  const s = d.summary;
  return (
    <>
      <div className="spt-card"><h3>Last 30 days</h3>
        <div className="spt-stats">
          <div className="spt-stat"><b>{s.avg}%</b><span>Average score</span><Delta now={s.avg} before={s.prevAvg} unit="%" /></div>
          <div className="spt-stat"><b>{s.quizzes}</b><span>Quizzes</span><Delta now={s.quizzes} before={s.prevQuizzes} /></div>
          <div className="spt-stat"><b>{s.participation}%</b><span>Took a quiz</span></div>
          <div className="spt-stat"><b style={{ color: s.atRisk ? '#DC2626' : undefined }}>{s.atRisk}</b><span>Need help</span></div>
        </div>
        <LineChart data={d.series.map((x) => ({ label: shortDay(x.day), value: x.quizzes }))} />
        <button className="spt-link" onClick={() => setTab('reports')}>See the full report</button>
      </div>
      {d.classes.length > 0 && <div className="spt-card"><h3>Class averages</h3><HBars data={d.classes.map((c) => ({ label: c.name, value: c.avg, note: `${c.participation}% took part` }))} /></div>}
    </>
  );
}

/* ── plan + online payment ────────────────────────────────────────────────── */
function Plan({ sid, paid }) {
  const [periods, setPeriods] = useState(1);
  const [d, setD] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => { api('quote', { school_id: sid, periods }).then(setD); }, [sid, periods, paid]);
  if (!d) return <Empty>Loading…</Empty>;
  if (!d.success) return <div className="spt-err">{d.error}</div>;
  const { plan, quote: q } = d;
  const label = { trial: 'Free trial', active: 'Active', expired: 'Ended' }[plan.status];
  const pay = async () => {
    setBusy(true); setErr('');
    const r = await api('pay', { school_id: sid, periods });
    if (r.success && r.paymentLink) { window.location.href = r.paymentLink; return; }
    setBusy(false); setErr(r.error || 'Could not start the payment.');
  };
  return (
    <div className="spt-stack">
      {paid === 'success' && <div className="spt-ok">Payment received. Your plan has been extended. A receipt is on its way to your email.</div>}
      {paid === 'cancelled' && <div className="spt-err">The payment was cancelled. You have not been charged.</div>}
      {paid === 'failed' && <div className="spt-err">We could not confirm the payment. If money left your account, message us with the reference and we will sort it out.</div>}
      {paid === 'pending' && <div className="spt-banner trial">Still confirming your payment. Check again in a minute.</div>}
      <div className="spt-card">
        <div className="spt-between"><h3>School plan</h3><span className={`spt-pill ${plan.status}`}>{label}</span></div>
        {plan.status !== 'expired' ? <p>{plan.daysLeft} day{plan.daysLeft === 1 ? '' : 's'} left{plan.until ? ` (until ${new Date(plan.until).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })})` : ''}.</p> : <p>Your plan has ended. You can still see your data, but adding classes, students and homework is paused until you renew.</p>}
      </div>
      <div className="spt-card">
        <h3>Pay online</h3>
        <p>{q.students} student{q.students === 1 ? '' : 's'} in your school · <b>{q.tier || 'Starter'}</b></p>
        <div className="spt-periods">{q.options.map((o) => {
          const sum = q.perPeriod * o.periods; const save = o.year && sum > o.amount ? sum - o.amount : 0;
          return <button key={o.periods} className={periods === o.periods ? 'on' : ''} onClick={() => setPeriods(o.periods)}>{o.year ? 'Full year' : `${o.periods} ${q.period}${o.periods > 1 ? 's' : ''}`}<small>{ng(o.amount)}</small>{o.year && <em>{save ? `Save ${ng(save)}` : q.kind === 'centre' ? '12 months' : '3 terms'}</em>}</button>;
        })}</div>
        <div className="spt-total"><span>Total</span><b>{ng(q.amount)}</b></div>
        <p className="spt-note">Your plan is extended from the day it ends, so you never lose paid time. The price follows your student count at the moment you pay. Pay securely by card, bank transfer or USSD.</p>
        {err && <div className="spt-err">{err}</div>}
        {d.online ? <button className="spt-btn" disabled={busy} onClick={pay}>{busy ? 'Opening payment…' : `Pay ${ng(q.amount)}`}</button> : <div className="spt-banner trial">Online payment is not switched on yet. Contact EliteScholars to pay.</div>}
      </div>
      <div className="spt-card"><h3>Payments</h3>{d.payments.length ? d.payments.map((p) => <div className="spt-item" key={p.tx_ref}><span>{new Date(p.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}<small>{p.tx_ref}</small></span><b>{ng(p.amount)}</b></div>) : <Empty>No payments yet.</Empty>}</div>
    </div>
  );
}

/* ── the portal ───────────────────────────────────────────────────────────── */
export default function SchoolPortal() {
  const [authed, setAuthed] = useState(() => hasToken(getUser()));
  const [schools, setSchools] = useState(null);
  const [sid, setSid] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('overview');
  const [err, setErr] = useState('');
  const [det, setDet] = useState(() => ({ ...EMPTY_DETAILS, contact_name: ((getUser() || {}).name || '').replace(/ -$/, '') }));
  const [busy, setBusy] = useState(false);
  const [newKind, setNewKind] = useState(() => { try { return new URLSearchParams(window.location.search).get('kind') === 'centre' ? 'centre' : 'school'; } catch { return 'school'; } });
  const me = useMemo(() => (getUser() || {}).email || '', [authed]); // eslint-disable-line react-hooks/exhaustive-deps

  const [paid] = useState(() => { try { return new URLSearchParams(window.location.search).get('payment') || ''; } catch { return ''; } });
  useEffect(() => { document.title = 'School portal | EliteScholars'; captureReferralFromURL(); captureTrafficSource(); if (paid) setTab('plan'); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const loadMe = useCallback(async () => {
    const r = await api('me');
    if (r.status === 401) { try { localStorage.removeItem('ep_user'); } catch { /* ignore */ } setAuthed(false); return; }
    const list = r.schools || [];
    setSchools(list);
    setSid((cur) => cur || (list[0] && list[0].id) || '');
  }, []);
  useEffect(() => { if (authed) loadMe(); }, [authed, loadMe]);
  const reload = useCallback(async () => {
    if (!sid) return;
    const r = await api('overview', { school_id: sid });
    if (r.success) { setData({ ...r, me }); setErr(''); } else setErr(r.error || 'Could not load.');
  }, [sid, me]);
  useEffect(() => { setData(null); reload(); }, [reload]);

  const setD = (k) => (e) => setDet({ ...det, [k]: e.target.value });
  const create = async () => {
    const bad = validateDetails(det, newKind); if (bad) return setErr(bad);
    setBusy(true); const r = await api('school-create', detailsPayload(det, newKind)); setBusy(false);
    if (!r.success) return setErr(r.error);
    setErr(''); setSid(r.school.id); loadMe();
  };
  const logout = () => { try { localStorage.removeItem('ep_user'); } catch { /* ignore */ } setAuthed(false); setSchools(null); setSid(''); setData(null); };
  const isAdmin = data && data.role === 'admin';
  const isCentre = !!(data && data.school && data.school.kind === 'centre');
  const tabs = useMemo(() => [['overview', 'Overview'], ['classes', isCentre ? 'Batches' : 'Classes'], ['students', 'Students'], ...(isAdmin ? [['staff', 'Teachers']] : []), ['notices', 'Notices'], ['mocks', 'Mock exams'], ['reports', 'Reports'], ...(isAdmin ? [['plan', 'Plan']] : [])], [isAdmin, isCentre]);

  return (
    <div className="spt-page">
      <header className="spt-head">
        <a href="/school" className="spt-brand"><img src={logo} alt="" width="30" height="30" /><span>EliteScholars <b>Schools</b></span></a>
        {authed && <button className="spt-ghost" onClick={logout}>Sign out</button>}
      </header>
      <main className="spt-main">
        {!authed && <Gate initialKind={newKind} onDone={(note, keep) => { if (keep) { setDet({ ...EMPTY_DETAILS, ...keep.f }); setNewKind(keep.kind); } if (note) setErr(note); setAuthed(true); }} />}
        {authed && !schools && <Empty>Loading…</Empty>}
        {authed && schools && !schools.length && (
          <div className="spt-card spt-gate wide">
            <h2>Set up your {newKind === 'centre' ? 'centre' : 'school'}</h2>
            <KindToggle kind={newKind} setKind={setNewKind} />
            <p>Create it to start your free trial. Teachers: your admin adds you by email, then you will see it here.</p>
            <label className="spt-lbl">Your full name<input value={det.contact_name} maxLength={80} onChange={setD('contact_name')} autoComplete="name" /></label>
            <OrgFields f={det} set={setD} setF={setDet} kind={newKind} />
            {err && <div className="spt-err" role="alert">{err}</div>}
            <button className="spt-btn" disabled={busy} onClick={create}>{busy ? 'Please wait…' : `Create ${newKind === 'centre' ? 'centre' : 'school'}`}</button>
          </div>
        )}
        {authed && schools && schools.length > 0 && (
          <>
            {schools.length > 1 && <select className="spt-school" value={sid} onChange={(e) => { setSid(e.target.value); setTab('overview'); }}>{schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>}
            {err && <div className="spt-err">{err}</div>}
            {data && (
              <>
                <h1 className="spt-title">{data.school.logo && <img className="spt-head-logo" src={data.school.logo} alt="" />}{data.school.name}<small>{isAdmin ? (isCentre ? 'Centre admin' : 'School admin') : 'Teacher'}</small></h1>
                <nav className="spt-tabs spt-noprint">{tabs.map(([id, l]) => <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{l}</button>)}</nav>
                {tab === 'overview' && (
                  <div>
                    <div className="spt-stats"><Stat v={data.totals.classes} l="Classes" /><Stat v={data.totals.students} l="Students" />{isAdmin && <Stat v={data.totals.staff} l="Staff" />}{isAdmin && <Stat v={data.totals.unassigned} l="Not in a class" />}</div>
                    {isAdmin && data.plan && data.plan.status !== 'active' && <div className={`spt-banner ${data.plan.status}`}>{data.plan.status === 'trial' ? `Free trial: ${data.plan.daysLeft} day${data.plan.daysLeft === 1 ? '' : 's'} left.` : 'Your plan has ended. Renew to keep adding classes and students.'} <button className="spt-link" onClick={() => setTab('plan')}>See plan</button></div>}
                    <OverviewCharts sid={sid} setTab={setTab} />
                    {isAdmin && <LogoCard sid={sid} data={data} reload={reload} />}
                    {isAdmin && <ProfileCard key={sid + (data.school.showcase_status || '')} sid={sid} data={data} reload={reload} />}
                    {isAdmin && isCentre && <CentreEarn />}
                    <div className="spt-card"><h3>Get started</h3><ol className="spt-steps">
                      {isAdmin && <li>Add your teachers in <button className="spt-link" onClick={() => setTab('staff')}>Teachers</button>.</li>}
                      <li>Create classes in <button className="spt-link" onClick={() => setTab('classes')}>Classes</button>.</li>
                      <li>Add students in <button className="spt-link" onClick={() => setTab('students')}>Students</button>: by username, or create accounts and print the logins.</li>
                      <li>Set homework and watch results in <button className="spt-link" onClick={() => setTab('reports')}>Reports</button>.</li></ol></div>
                  </div>
                )}
                {tab === 'classes' && <Classes sid={sid} data={data} reload={reload} isAdmin={isAdmin} />}
                {tab === 'students' && <Students sid={sid} data={data} isAdmin={isAdmin} />}
                {tab === 'staff' && isAdmin && <Staff sid={sid} data={data} reload={reload} />}
                {tab === 'notices' && <Notices sid={sid} data={data} isAdmin={isAdmin} isCentre={isCentre} />}
                {tab === 'mocks' && <Mocks sid={sid} data={data} isAdmin={isAdmin} isCentre={isCentre} />}
                {tab === 'reports' && <Reports sid={sid} school={data.school.name} logo={data.school.logo} classes={data.classes} />}
                {tab === 'plan' && isAdmin && <Plan sid={sid} paid={paid} />}
              </>
            )}
            {!data && !err && <Empty>Loading…</Empty>}
          </>
        )}
      </main>
    </div>
  );
}

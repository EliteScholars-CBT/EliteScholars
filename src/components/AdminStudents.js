import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { makeApi, fmtDT, ago, localToISO } from './adminApi';
import { fmtN, fmtNaira } from './AdminCharts';

const SEEN = [['', 'Any time'], ['online', 'Online now (15 min)'], ['1h', 'Last hour'], ['24h', 'Last 24 hours'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['inactive7d', 'Gone 7+ days'], ['inactive30d', 'Gone 30+ days'], ['never', 'Never opened'], ['custom', 'Pick date & time…']];
const SORT = [['last_seen', 'Last seen'], ['xp', 'XP'], ['joined', 'Joined'], ['streak', 'Streak'], ['quizzes', 'Quizzes'], ['level', 'Level'], ['login', 'Last login']];

function Detail({ api, email }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('activity');
  useEffect(() => { let on = true; api('student', { query: { email } }).then((r) => on && setD(r)).catch((e) => e.message !== 'auth' && on && setErr(e.message)); return () => { on = false; }; }, [api, email]);
  if (err) return <div className="adm-error">{err}</div>;
  if (!d) return <p className="adm-note">Loading details…</p>;
  const s = d.student;
  return (
    <div className="adm-detail">
      <div className="adm-facts">
        <div><span>Email</span><b>{s.email}</b></div>
        <div><span>Last seen</span><b>{fmtDT(s.lastActive)}</b></div>
        <div><span>Last login</span><b>{fmtDT(s.lastLogin)}</b></div>
        <div><span>Joined</span><b>{fmtDT(s.joined)}</b></div>
        <div><span>Class level</span><b>{s.type || '—'}</b></div>
        <div><span>Exams</span><b>{(s.exams || []).join(', ') || '—'}</b></div>
        <div><span>XP · level</span><b>{fmtN(s.xp)} · L{s.level}</b></div>
        <div><span>Streak (best)</span><b>{s.streak} ({s.bestStreak})</b></div>
        <div><span>Quizzes</span><b>{fmtN(s.quizzes)}</b></div>
        <div><span>Accuracy</span><b>{s.accuracy === null ? '—' : `${s.accuracy}%`} ({fmtN(s.totalCorrect)}/{fmtN(s.totalQuestions)})</b></div>
        <div><span>Challenges W / L</span><b>{s.challengesWon} / {s.challengesLost}</b></div>
        <div><span>Plan</span><b>{s.premium ? `${s.plan} until ${fmtDT(s.expiresAt)}` : 'Free'}</b></div>
        {s.guardianEmail && <div><span>Parent email</span><b>{s.guardianEmail}</b></div>}
        {d.referrer ? (
          <div className="adm-ref"><span>Referred by</span><b>{d.referrer.name || 'Partner (not found)'}{d.referrer.code ? ` · ${d.referrer.code}` : ''}</b>
            {(d.referrer.email || d.referrer.phone) && <small>{[d.referrer.email, d.referrer.phone].filter(Boolean).join(' · ')}</small>}</div>
        ) : s.referredBy ? <div><span>Referred by code</span><b>{s.referredBy}</b></div> : null}
        {d.squad && <div><span>Squad</span><b>{d.squad.name} ({fmtN(d.squad.xp)} XP)</b></div>}
        {d.classes.length > 0 && <div><span>Classes</span><b>{d.classes.map((c) => c.name).join(', ')}</b></div>}
        {d.teaching.length > 0 && <div><span>Teaches</span><b>{d.teaching.map((c) => c.name).join(', ')}</b></div>}
      </div>
      <div className="adm-tabs adm-subtabs">
        {[['activity', `Activity (${d.activity.length})`], ['subjects', 'Subjects'], ['pay', `Payments (${d.payments.length})`]].map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === 'activity' && (d.activity.length ? (
        <ul className="adm-timeline">
          {d.activity.slice(0, 80).map((a, i) => <li key={i} className={a.kind}><time>{fmtDT(a.at)}</time><span>{a.text}</span></li>)}
        </ul>
      ) : <p className="adm-empty">No activity recorded yet.</p>)}
      {tab === 'subjects' && (s.subjects.length ? (
        <div className="adm-table">{s.subjects.map((x) => <div className="adm-tr" key={x.subject}><span>{x.subject}</span><span>{x.attempts !== undefined ? `${x.attempts} tries` : ''}</span><span>{x.avg !== undefined ? `${Math.round(x.avg)}%` : x.value !== undefined ? String(x.value) : ''}</span><span /></div>)}</div>
      ) : <p className="adm-empty">No subject data yet.</p>)}
      {tab === 'pay' && (d.payments.length ? (
        <div className="adm-table">{d.payments.map((p, i) => <div className="adm-tr" key={i}><span>{p.plan}</span><span>{p.status}</span><span>{fmtNaira(p.amount)}</span><span>{fmtDT(p.created_at)}</span></div>)}</div>
      ) : <p className="adm-empty">No payments.</p>)}
    </div>
  );
}

export default function AdminStudents({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [f, setF] = useState({ q: '', seen: '', from: '', to: '', sort: 'last_seen', dir: 'desc', premium: '', minXp: '', maxXp: '' });
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [online, setOnline] = useState(0);
  const [page, setPage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState('');
  useEffect(() => { try { const e = sessionStorage.getItem('adm_open_student'); if (e) { sessionStorage.removeItem('adm_open_student'); setF((c) => ({ ...c, q: e })); setOpen(e); } } catch { /* ignore */ } }, []);
  const [more, setMore] = useState(false);
  const timer = useRef(null);

  const query = useCallback((p) => ({
    q: f.q, seen: f.seen === 'custom' ? '' : f.seen, seenFrom: f.seen === 'custom' ? localToISO(f.from) : '', seenTo: f.seen === 'custom' ? localToISO(f.to) : '',
    sort: f.sort, dir: f.dir, premium: f.premium, minXp: f.minXp, maxXp: f.maxXp, page: p, size: 30,
  }), [f]);

  const load = useCallback(async (p) => {
    setBusy(true); setErr('');
    try {
      const d = await api('students', { query: query(p) });
      setRows((cur) => (p === 0 ? d.students : [...cur, ...d.students]));
      setTotal(d.total); setOnline(d.onlineNow); setPage(p); setMore((p + 1) * 30 < d.total);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api, query]);

  useEffect(() => { clearTimeout(timer.current); timer.current = setTimeout(() => load(0), f.q ? 350 : 0); return () => clearTimeout(timer.current); }, [load, f.q]);

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  return (
    <div>
      <section className="adm-card">
        <div className="adm-card-head"><h2>Students</h2><span className="adm-hint"><b>{fmtN(total)}</b> match · <b className="adm-live">{fmtN(online)}</b> online now</span></div>
        <div className="adm-filters">
          <input placeholder="Search name, username or email" value={f.q} onChange={set('q')} />
          <label>Last seen<select value={f.seen} onChange={set('seen')}>{SEEN.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
          <label>Sort by<select value={f.sort} onChange={set('sort')}>{SORT.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
          <label>Order<select value={f.dir} onChange={set('dir')}><option value="desc">High / newest first</option><option value="asc">Low / oldest first</option></select></label>
          <label>Plan<select value={f.premium} onChange={set('premium')}><option value="">All</option><option value="yes">Pro</option><option value="no">Free</option></select></label>
          <label>Min XP<input type="number" inputMode="numeric" value={f.minXp} onChange={set('minXp')} placeholder="0" /></label>
          <label>Max XP<input type="number" inputMode="numeric" value={f.maxXp} onChange={set('maxXp')} placeholder="any" /></label>
          {f.seen === 'custom' && (<>
            <label>Seen from<input type="datetime-local" value={f.from} onChange={set('from')} /></label>
            <label>Seen until<input type="datetime-local" value={f.to} onChange={set('to')} /></label>
          </>)}
        </div>
      </section>
      {err && <div className="adm-error">{err}</div>}
      <div className="adm-list">
        {rows.map((s) => (
          <div key={s.email} className={`adm-item ${open === s.email ? 'open' : ''}`}>
            <button className="adm-item-head" onClick={() => setOpen(open === s.email ? '' : s.email)} aria-expanded={open === s.email}>
              <span className="adm-av">{String(s.name).charAt(0).toUpperCase()}</span>
              <span className="adm-item-main"><b>{s.name}</b><small>{s.username ? `@${s.username} · ` : ''}{s.email}</small></span>
              <span className="adm-item-side">
                <b>{fmtN(s.xp)} XP</b>
                <small className={Date.now() - new Date(s.lastActive || 0).getTime() < 900000 ? 'adm-live' : ''}>{s.lastActive ? `${fmtDT(s.lastActive)} · ${ago(s.lastActive)}` : 'never seen'}</small>
              </span>
              {s.premium && <span className="adm-chip active">Pro</span>}
              <span className="adm-caret">{open === s.email ? '▴' : '▾'}</span>
            </button>
            {open === s.email && <Detail api={api} email={s.email} />}
          </div>
        ))}
        {!rows.length && !busy && <p className="adm-empty">No students match these filters.</p>}
      </div>
      {more && <button className="adm-more" disabled={busy} onClick={() => load(page + 1)}>{busy ? 'Loading…' : 'Load more'}</button>}
      {busy && !rows.length && <div className="adm-card">Loading…</div>}
    </div>
  );
}

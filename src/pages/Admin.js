import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fmtN, fmtNaira, TrendChart, ColumnChart, Donut, Bars, Funnel, Kpi } from '../components/AdminCharts';
import AdminPartners from '../components/AdminPartners';
import AdminAccess from '../components/AdminAccess';
import AdminMail from '../components/AdminMail';
import AdminReports from '../components/AdminReports';
import AdminMessages from '../components/AdminMessages';
import AdminStudents from '../components/AdminStudents';
import AdminActivity from '../components/AdminActivity';
import AdminStatus from '../components/AdminStatus';
import AdminBlog from '../components/AdminBlog';
import AdminTeam from '../components/AdminTeam';
import AdminPayroll from '../components/AdminPayroll';
import AdminAI from '../components/AdminAI';
import AdminAds from '../components/AdminAds';
import AdminSecurity from '../components/AdminSecurity';
import AdminReminders from '../components/AdminReminders';
import AdminGroups from '../components/AdminGroups';
import AdminGames from '../components/AdminGames';
import AdminShop from '../components/AdminShop';
import AdminSources from '../components/AdminSources';
import { AdminPrices, AdminSchools } from '../components/AdminPrices';
import AdminHiring from '../components/AdminHiring';
import { makeApi, ago } from '../components/adminApi';
import ForgotPassword from '../components/ForgotPassword';
import '../styles/admin.css';

const TOKEN_KEY = 'es_admin_token';
// The month the database started recording (first events and students: October 2026). No month pills before it.
const DATA_START = '2026-10';
const RANGES = [
  ['today', 'Today'], ['7d', '7 days'], ['30d', '30 days'], ['90d', '90 days'],
  ['thismonth', 'This month'], ['365d', '1 year'], ['thisyear', 'This year'], ['all', 'All time'],
];

const METRICS = {
  signups: { label: 'Signups', fmt: fmtN },
  active: { label: 'Active students', fmt: fmtN },
  quizzes: { label: 'Quizzes done', fmt: fmtN },
  revenue: { label: 'Revenue', fmt: fmtNaira },
  xp: { label: 'XP earned', fmt: fmtN },
  challenges: { label: 'Challenges', fmt: fmtN },
};

const TABS = [
  { id: 'analytics', label: 'Analytics', perms: ['analytics'] },
  { id: 'students', label: 'Students', perms: ['students'] },
  { id: 'activity', label: 'Activity', perms: ['students'] },
  { id: 'status', label: 'Status', perms: ['status'], badge: ['status'] },
  { id: 'reminders', label: 'Reminders', perms: ['analytics'] },
  { id: 'games', label: 'Games', perms: ['analytics'] },
  { id: 'groups', label: 'Groups', perms: ['status'] },
  { id: 'security', label: 'Security', perms: ['status'], badge: ['security'] },
  { id: 'blog', label: 'Blog', perms: ['blog'] },
  { id: 'sources', label: 'Sources', perms: ['analytics'] },
  { id: 'ads', label: 'Ads', perms: ['ads'] },
  { id: 'earnings', label: 'Adsterra earnings', perms: ['ads'] },
  { id: 'shop', label: 'Shop', perms: ['shop'] },
  { id: 'partners', label: 'Partners', perms: ['partners', 'payouts'], badge: ['partners', 'payouts'] },
  { id: 'hiring', label: 'Hiring', perms: ['partners'], badge: ['hiring'] },
  { id: 'schools', label: 'Schools', perms: ['schools'], badge: ['schools'] },
  { id: 'prices', label: 'Prices', perms: ['prices'] },
  { id: 'access', label: 'Access & trials', perms: ['access'] },
  { id: 'mail', label: 'Email', perms: ['mail'] },
  { id: 'messages', label: 'Messages', perms: ['students'], badge: ['contact'] },
  { id: 'reports', label: 'Reports', perms: ['reports'], badge: ['reports'] },
  { id: 'ai', label: 'AI keys', perms: ['ai'] },
  { id: 'payroll', label: 'Payroll', perms: [], owner: true },
  { id: 'team', label: 'Team', perms: [], owner: true },
];

const HOUR_LABELS = Array.from({ length: 24 }, (_, h) => `${h % 12 || 12}${h < 12 ? 'a' : 'p'}`);
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Admin() {
  const [token, setToken] = useState(() => { try { return sessionStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } });
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState('today');
  const [month, setMonth] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [metric, setMetric] = useState('signups');
  const [compare, setCompare] = useState(true);
  const [view, setView] = useState('');
  const [me, setMe] = useState(null);
  const [alerts, setAlerts] = useState({ counts: {}, total: 0, items: [] });
  const [bell, setBell] = useState(false);
  // What the admin has already looked at: red badges show only what is new since then.
  const [seen, setSeen] = useState(() => { try { return JSON.parse(localStorage.getItem('adm_alert_seen') || '{}') || {}; } catch { return {}; } });
  const [teamMode, setTeamMode] = useState(false);
  const [email, setEmail] = useState('');

  const signOut = useCallback(() => {
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
    setToken(''); setStats(null); setMe(null); setView('');
  }, []);
  const authFail = useCallback((m) => { signOut(); setError(m || 'Session expired.'); }, [signOut]);
  const api = useMemo(() => makeApi(token, authFail), [token, authFail]);

  // who am I + what can I open
  useEffect(() => {
    if (!token) return;
    api('me').then((d) => { setMe(d.admin); }).catch(() => {});
  }, [token, api]);
  const can = useCallback((k) => !!me && (me.owner || me.perms.includes(k)), [me]);

  // red dot: things that need attention (new partner, payout request, reports, school trials)
  const refreshAlerts = useCallback(() => {
    if (!token) return;
    let secSince = ''; try { secSince = localStorage.getItem('adm_sec_seen') || ''; } catch { /* ignore */ }
    // WhatsApp Channel taps in the last 24h join the bell (needs the Activity permission)
    const wa = api('activity', { query: { wa: '1' } }).then((d) => d.wa).catch(() => null);
    const msgs = api('activity', { query: { contact: 'list' } }).then((d) => d.contact).catch(() => null);
    Promise.all([api('alerts', secSince ? { query: { secSince } } : undefined), wa, msgs]).then(([a, w, m]) => {
      let out = a;
      const n = (w && w.last24h) || 0;
      if (n) out = { ...out, counts: { ...out.counts, whatsapp: n }, total: (out.total || 0) + n, items: [{ kind: 'whatsapp', text: `📲 ${n} WhatsApp Channel tap${n === 1 ? '' : 's'} in the last 24 hours`, at: w.recent[0] && w.recent[0].at, tab: 'activity' }, ...out.items] };
      const u = (m && m.unread) || 0;
      if (u) { const first = m.rows.find((r) => r.status === 'new'); out = { ...out, counts: { ...out.counts, contact: u }, total: (out.total || 0) + u, items: [{ kind: 'contact', text: `✉️ ${u} new contact message${u === 1 ? '' : 's'}`, at: first && first.created_at, tab: 'messages' }, ...out.items] }; }
      setAlerts(out);
    }).catch(() => {});
  }, [token, api]);
  const markSeen = useCallback((keys) => {
    setSeen((prev) => {
      const next = { ...prev };
      (keys || []).forEach((k) => { next[k] = alerts.counts[k] || 0; });
      try { localStorage.setItem('adm_alert_seen', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [alerts]);
  const unseen = useCallback((k) => Math.max(0, (alerts.counts[k] || 0) - (seen[k] || 0)), [alerts, seen]);
  const unseenTotal = Object.keys(alerts.counts).reduce((a, k) => a + unseen(k), 0);
  // if a count dropped (e.g. a trial was renewed), lower the remembered number so the next new one shows again
  useEffect(() => {
    if (!Object.keys(alerts.counts).length) return;
    const lower = Object.keys(seen).filter((k) => (alerts.counts[k] || 0) < seen[k]);
    if (!lower.length) return;
    setSeen((prev) => { const n = { ...prev }; lower.forEach((k) => { n[k] = alerts.counts[k] || 0; }); try { localStorage.setItem('adm_alert_seen', JSON.stringify(n)); } catch { /* ignore */ } return n; });
  }, [alerts, seen]);
  useEffect(() => {
    if (!token) return undefined;
    refreshAlerts();
    const t = setInterval(refreshAlerts, 60000);
    return () => clearInterval(t);
  }, [token, refreshAlerts]);

  const load = useCallback(async (tk, rg, f, t) => {
    setBusy(true); setError('');
    try {
      const qs = new URLSearchParams({ range: rg });
      if (rg === 'custom') { qs.set('from', f); qs.set('to', t); }
      const r = await fetch(`/api/admin/stats?${qs}`, { headers: { Authorization: `Bearer ${tk}` } });
      const d = await r.json();
      if (r.status === 401) { signOut(); setError(d.error || 'Session expired.'); return; }
      if (!d.success) { setError(d.error || 'Could not load.'); return; }
      setStats(d.stats);
    } catch { setError('Network error. Check your connection.'); }
    finally { setBusy(false); }
  }, [signOut]);

  useEffect(() => { if (token && me && can('analytics') && range !== 'custom') load(token, range); }, [token, me, can, range, load]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(teamMode ? { email, password } : { password }) });
      const d = await r.json();
      if (!d.success) { setError(d.error || 'Login failed.'); return; }
      try { sessionStorage.setItem(TOKEN_KEY, d.token); } catch { /* ignore */ }
      setPassword(''); setToken(d.token);
    } catch { setError('Network error.'); }
    finally { setBusy(false); }
  };

  const pickMonth = (v) => { setMonth(v); if (v) setRange(`month:${v}`); };
  const applyCustom = () => { if (from && to && from <= to) { setRange('custom'); load(token, 'custom', from, to); } else setError('Pick a valid start and end date.'); };

  useEffect(() => {
    if (view !== 'security') return;
    try { localStorage.setItem('adm_sec_seen', new Date().toISOString()); } catch { /* ignore */ }
    setAlerts((a) => ({ ...a, counts: { ...a.counts, security: 0 }, items: a.items.filter((x) => x.kind !== 'security'), total: Math.max(0, a.total - (a.counts.security || 0)) }));
  }, [view]);
  // Tap a floating message to dismiss it early (they also fade away on their own after 10 seconds).
  useEffect(() => {
    const h = (e) => { const t = e.target && e.target.closest ? e.target.closest('.adm-wrap:not(.adm-login) .adm-ok, .adm-wrap:not(.adm-login) .adm-error') : null; if (t) t.style.display = 'none'; };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);
  if (!token) {
    return (
      <div className="adm-wrap adm-login">
        {forgot ? (
          <div className="adm-card adm-login-card">
            <h1>EliteScholars Admin</h1>
            <ForgotPassword kind="admin" owner={!teamMode} email={email} onBack={() => setForgot(false)}
              onSignedIn={(d) => { try { sessionStorage.setItem(TOKEN_KEY, d.token); } catch { /* ignore */ } setForgot(false); setPassword(''); setToken(d.token); }} />
          </div>
        ) : (
        <form className="adm-card adm-login-card" onSubmit={login}>
          <h1>EliteScholars Admin</h1>
          <p>{teamMode ? 'Team sign-in. Use the email and password you were given.' : 'Private dashboard. Enter the admin password.'}</p>
          {teamMode && <input type="email" autoComplete="username" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />}
          <input type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus={!teamMode} />
          {error && <div className="adm-error">{error}</div>}
          <button type="submit" disabled={busy || !password || (teamMode && !email)}>{busy ? 'Checking…' : 'Sign in'}</button>
          <button type="button" className="adm-link" onClick={() => { setForgot(true); setError(''); }}>Forgot password?</button>
          <button type="button" className="adm-link" onClick={() => { setTeamMode(!teamMode); setError(''); }}>{teamMode ? 'Sign in as the owner' : 'Team member? Sign in with email'}</button>
        </form>
        )}
      </div>
    );
  }

  const s = stats;
  const visibleTabs = me ? TABS.filter((t) => (t.owner ? me.owner : t.perms.some((p) => can(p)))) : [];
  const cur = view && visibleTabs.some((t) => t.id === view) ? view : (visibleTabs[0] ? visibleTabs[0].id : '');
  const m = METRICS[metric];
  const premRate = s && s.totals.students ? ((s.totals.premiumActive / s.totals.students) * 100).toFixed(1) : '0.0';
  const convRate = s && s.funnel.quizStarted ? Math.round((s.funnel.quizCompleted / s.funnel.quizStarted) * 100) : 0;
  const chData = s ? Object.entries(s.challengeStatus).map(([name, count]) => ({ name, count })) : [];
  const unit = s ? ({ hour: 'hour', day: 'day', month: 'month' })[s.range.bucket] : '';

  return (
    <div className="adm-wrap">
      <style>{`.adm-wrap:not(.adm-login) .adm-ok,.adm-wrap:not(.adm-login) .adm-error{position:fixed;top:16px;left:50%;z-index:99999;width:max-content;max-width:min(560px,calc(100vw - 24px));margin:0;padding:13px 18px;border-radius:14px;font-size:.95rem;font-weight:600;line-height:1.4;box-shadow:0 14px 40px rgba(0,0,0,.55);cursor:pointer;animation:admToast 10s ease forwards;transform:translateX(-50%)}.adm-wrap:not(.adm-login) .adm-ok{background:#0f3a26;border:1px solid #22a366;color:#b7f5d2}.adm-wrap:not(.adm-login) .adm-error{background:#3b1219;border:1px solid #dc4a5a;color:#fecdd3}@keyframes admToast{0%{opacity:0;top:0}4%{opacity:1;top:16px}94%{opacity:1;top:16px}100%{opacity:0;top:16px;visibility:hidden;pointer-events:none}}`}</style>
      <header className="adm-head">
        <div>
          <h1>EliteScholars Admin</h1>
          {me && !me.owner && <span className="adm-updated">Signed in as {me.name}</span>}
          {s && cur === 'analytics' && <span className="adm-updated">{s.range.label} · {s.range.from} → {s.range.to} · by {unit}</span>}
        </div>
        <div className="adm-head-actions">
          <div className="adm-bellwrap">
            <button className="adm-ghost adm-bell" onClick={() => { const o = !bell; setBell(o); refreshAlerts(); if (o) markSeen(Object.keys(alerts.counts)); }} aria-label="Things needing attention">🔔{unseenTotal > 0 && <i className="adm-dot">{unseenTotal > 9 ? '9+' : unseenTotal}</i>}</button>
            {bell && <div onClick={() => setBell(false)} style={{ position: 'fixed', inset: 0, zIndex: 59 }} aria-hidden="true" />}
            {bell && (
              <div className="adm-pop">
                <style>{`.adm-bellwrap .adm-pop{position:fixed;top:70px;right:20px;left:auto;width:min(680px,calc(100vw - 40px));max-height:80vh;overflow-y:auto;z-index:60;padding:18px;gap:10px}.adm-bellwrap .adm-pop .adm-pop-row{font-size:1rem;padding:14px 16px;flex-direction:row;align-items:center;justify-content:space-between;gap:16px}.adm-bellwrap .adm-pop .adm-pop-head b{font-size:1.1rem}@media (max-width:600px){.adm-bellwrap .adm-pop{left:12px;right:12px;top:64px;width:auto;padding:14px}.adm-bellwrap .adm-pop .adm-pop-row{flex-direction:column;align-items:flex-start;font-size:.9rem;padding:11px 12px;gap:3px}.adm-bellwrap .adm-pop .adm-pop-head b{font-size:.95rem}}`}</style>
                <div className="adm-pop-head"><b>Needs your attention</b><button type="button" className="adm-pop-x" onClick={() => setBell(false)} aria-label="Close">✕</button></div>
                {alerts.items.length ? alerts.items.map((it, i) => (
                  <button key={i} className="adm-pop-row" onClick={() => { setView(it.tab); setBell(false); }}><span className="adm-pop-text">{it.text}</span>{it.at && <small>{ago(it.at)}</small>}</button>
                )) : <p className="adm-empty">All clear 🎉</p>}
              </div>
            )}
          </div>
          {cur === 'analytics' && <button onClick={() => load(token, range, from, to)} disabled={busy}>{busy ? 'Loading…' : 'Refresh'}</button>}
          <button className="adm-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      {!me && <div className="adm-card">Loading…</div>}
      {me && (
      <div className="adm-tabs adm-maintabs adm-scroll" role="tablist">
        {visibleTabs.map((t) => {
          const n = t.badge ? t.badge.reduce((a, k) => a + unseen(k), 0) : 0;
          return <button key={t.id} role="tab" className={cur === t.id ? 'on' : ''} onClick={() => { setView(t.id); if (t.badge) markSeen(t.badge); }}>{t.label}{n > 0 && <i className="adm-dot">{n > 9 ? '9+' : n}</i>}</button>;
        })}
      </div>
      )}

      {cur === 'students' && <AdminStudents token={token} onAuthFail={authFail} />}
      {cur === 'activity' && <AdminActivity token={token} onAuthFail={authFail} />}
      {cur === 'status' && <AdminStatus token={token} onAuthFail={authFail} />}
      {cur === 'games' && <AdminGames token={token} onAuthFail={authFail} />}
      {cur === 'groups' && <AdminGroups token={token} onAuthFail={authFail} />}
      {cur === 'reminders' && <AdminReminders token={token} onAuthFail={authFail} />}
      {cur === 'security' && <AdminSecurity token={token} onAuthFail={authFail} onOpenStudent={(e) => { try { sessionStorage.setItem('adm_open_student', e); } catch { /* ignore */ } setView('students'); }} />}
      {cur === 'blog' && <AdminBlog token={token} onAuthFail={authFail} />}
      {cur === 'sources' && <AdminSources token={token} onAuthFail={authFail} />}
      {cur === 'ads' && <AdminAds token={token} onAuthFail={authFail} />}
      {cur === 'earnings' && <AdminAds token={token} onAuthFail={authFail} only="earnings" />}
      {cur === 'shop' && <AdminShop token={token} onAuthFail={authFail} />}
      {cur === 'schools' && <AdminSchools token={token} onAuthFail={authFail} />}
      {cur === 'prices' && <AdminPrices token={token} onAuthFail={authFail} />}
      {cur === 'ai' && <AdminAI token={token} onAuthFail={authFail} />}
      {cur === 'payroll' && <AdminPayroll token={token} onAuthFail={authFail} />}
      {cur === 'team' && <AdminTeam token={token} onAuthFail={authFail} />}
      {cur === 'access' && <AdminAccess token={token} onAuthFail={authFail} />}
      {cur === 'messages' && <AdminMessages token={token} onAuthFail={authFail} />}
      {cur === 'reports' && <AdminReports token={token} onAuthFail={authFail} />}
      {cur === 'mail' && <AdminMail token={token} onAuthFail={authFail} />}
      {cur === 'hiring' && <AdminHiring token={token} onAuthFail={authFail} />}
      {cur === 'partners' && <AdminPartners token={token} onAuthFail={authFail} />}

      {cur === 'analytics' && (<>
      <section className="adm-controls">
        <div className="adm-pills">
          {RANGES.map(([k, l]) => <button key={k} className={range === k ? 'on' : ''} onClick={() => { setMonth(''); setRange(k); }}>{l}</button>)}
        </div>
        <div className="adm-pills adm-months" aria-label="Previous months">
          {Array.from({ length: 3 }, (_, i) => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i); const v = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; return [v, d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })]; }).filter(([v]) => v >= DATA_START).map(([v, l]) => <button key={v} className={range === `month:${v}` ? 'on' : ''} onClick={() => pickMonth(v)}>{l}</button>)}
        </div>
        <div className="adm-pickers">
          <label>Month <input type="month" value={month} min={DATA_START} max={new Date().toISOString().slice(0, 7)} onChange={(e) => pickMonth(e.target.value)} /></label>
          <label>From <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
          <label>To <input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
          <button onClick={applyCustom}>Apply</button>
          <label className="adm-check"><input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} /> Compare with previous period</label>
        </div>
      </section>

      {error && <div className="adm-error">{error}</div>}
      {!s && busy && <div className="adm-card">Loading stats…</div>}

      {s && (
        <div className={busy ? 'adm-dim' : ''}>
          {s.truncated && <div className="adm-hint" style={{ color: "#b45309", fontWeight: 600 }}>This range has a lot of activity; figures may be slightly understated. Try a shorter range for exact numbers.</div>}

          <section className="adm-grid adm-stats">
            <Kpi label="New signups" value={fmtN(s.kpis.signups.v)} k={s.kpis.signups} compare={compare} />
            <Kpi label="Active students" value={fmtN(s.kpis.active.v)} k={s.kpis.active} compare={compare} sub={`${fmtN(s.totals.students)} students overall`} />
            <Kpi label="Quizzes done" value={fmtN(s.kpis.quizzes.v)} k={s.kpis.quizzes} compare={compare} />
            <Kpi label="Revenue" value={fmtNaira(s.kpis.revenue.v)} k={s.kpis.revenue} compare={compare} money sub={`${fmtN(s.kpis.payments.v)} payments`} />
            <Kpi label="Site visits" value={fmtN(s.kpis.visits.v)} k={s.kpis.visits} compare={compare} sub={`${fmtN(s.kpis.visitsNew)} first-time · ${fmtN(Math.max(0, s.kpis.visits.v - s.kpis.visitsNew))} returning`} />
            <Kpi label="Pro now" value={fmtN(s.totals.premiumActive)} sub={`${premRate}% of all students`} />
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Trend</h2>
              <div className="adm-tabs">
                {Object.entries(METRICS).map(([k, v]) => <button key={k} className={metric === k ? 'on' : ''} onClick={() => setMetric(k)}>{v.label}</button>)}
              </div>
            </div>
            <TrendChart labels={s.series.labels} values={s.series[metric]} prev={compare ? s.prevSeries[metric] : null} fmt={m.fmt} />
            <p className="adm-note">{m.label}: <b>{m.fmt(metric === 'active' ? s.kpis.active.v : s.series[metric].reduce((a, b) => a + b, 0))}</b> in this period{compare && <> · dashed line is the previous period</>}.</p>
          </section>

          <section className="adm-card">
            <h2>What the numbers suggest</h2>
            <ul className="adm-insights">
              {s.insights.map((i, idx) => <li key={idx} className={i.tone}><i />{i.text}</li>)}
            </ul>
            <p className="adm-note">These are automatic observations from the data, not proof of cause. Use them as prompts for what to look at.</p>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card"><h2>When students are active (hour of day)</h2><ColumnChart values={s.hours} labels={HOUR_LABELS} /></div>
            <div className="adm-card"><h2>Busiest days of the week</h2><ColumnChart values={s.weekdays} labels={DAY_LABELS} /></div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card">
              <h2>Funnel</h2>
              <Funnel steps={[
                { name: 'New signups', count: s.funnel.registered },
                { name: 'Quizzes started', count: s.funnel.quizStarted },
                { name: 'Quizzes completed', count: s.funnel.quizCompleted },
              ]} />
              <p className="adm-note">{convRate}% of started quizzes are finished. {s.activation.newStudents ? `${s.activation.activated} of ${s.activation.newStudents} new students were active.` : ''}</p>
            </div>
            <div className="adm-card"><h2>New vs returning (active students)</h2>
              <Donut data={[{ name: 'Returning', count: s.returning.returning }, { name: 'New', count: s.returning.total - s.returning.returning }]} />
            </div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card"><h2>Top subjects</h2><Bars data={s.topSubjects} /></div>
            <div className="adm-card"><h2>Exam types</h2><Donut data={s.examTypes} /></div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card"><h2>New student types</h2><Donut data={s.studentTypes} /></div>
            <div className="adm-card"><h2>Challenges</h2><Donut data={chData} /></div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card">
              <h2>App install</h2>
              <div className="adm-kv"><span>Banner shown</span><b>{fmtN(s.pwa.shown)}</b></div>
              <div className="adm-kv"><span>Installed</span><b>{fmtN(s.pwa.installed)}</b></div>
              <div className="adm-kv"><span>Dismissed</span><b>{fmtN(s.pwa.dismissed)}</b></div>
              <div className="adm-kv"><span>"Installed?" yes / no</span><b>{fmtN(s.pwa.askedYes)} / {fmtN(s.pwa.askedNo)}</b></div>
            </div>
            <div className="adm-card"><h2>Referral codes ({fmtN(s.referralSignups)} signups)</h2><Bars data={s.referralCodes} /></div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card">
              <h2>Revenue by plan</h2>
              {s.plans.length ? s.plans.map((p) => <div className="adm-kv" key={p.name}><span>{p.name} · {p.count} sold</span><b>{fmtNaira(p.amount)}</b></div>) : <p className="adm-empty">No payments in this period.</p>}
              <div className="adm-kv"><span>All-time revenue</span><b>{fmtNaira(s.totals.revenueAllTime)}</b></div>
            </div>
            <div className="adm-card">
              <h2>Recent payments</h2>
              {s.recentPayments.length ? (
                <div className="adm-table">
                  {s.recentPayments.map((p, i) => (
                    <div className="adm-tr" key={i}><span>{p.email}</span><span>{p.plan}</span><span>{fmtNaira(p.amount)}</span>
                      <span>{new Date(p.at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span></div>
                  ))}
                </div>
              ) : <p className="adm-empty">No payments in this period.</p>}
            </div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card"><h2>All activity</h2><Bars data={s.topEvents} /></div>
            <div className="adm-card"><h2>Security events</h2><Bars data={s.security} /></div>
          </section>
        </div>
      )}
      </>)}
    </div>
  );
}

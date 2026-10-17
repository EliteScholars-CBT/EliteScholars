import React, { useState, useEffect, useCallback } from 'react';
import { fmtN, fmtNaira, TrendChart, ColumnChart, Donut, Bars, Funnel, Kpi } from '../components/AdminCharts';
import AdminPartners from '../components/AdminPartners';
import '../styles/admin.css';

const TOKEN_KEY = 'es_admin_token';
const RANGES = [
  ['today', 'Today'], ['7d', '7 days'], ['30d', '30 days'], ['90d', '90 days'],
  ['thismonth', 'This month'], ['thisyear', 'This year'], ['all', 'All time'],
];

const METRICS = {
  signups: { label: 'Signups', fmt: fmtN },
  active: { label: 'Active students', fmt: fmtN },
  quizzes: { label: 'Quizzes done', fmt: fmtN },
  revenue: { label: 'Revenue', fmt: fmtNaira },
  xp: { label: 'XP earned', fmt: fmtN },
  challenges: { label: 'Challenges', fmt: fmtN },
};

const HOUR_LABELS = Array.from({ length: 24 }, (_, h) => `${h % 12 || 12}${h < 12 ? 'a' : 'p'}`);
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Admin() {
  const [token, setToken] = useState(() => { try { return sessionStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState('30d');
  const [month, setMonth] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [metric, setMetric] = useState('signups');
  const [compare, setCompare] = useState(true);
  const [view, setView] = useState('analytics');

  const signOut = useCallback(() => {
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
    setToken(''); setStats(null);
  }, []);

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

  useEffect(() => { if (token && range !== 'custom') load(token, range); }, [token, range, load]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const d = await r.json();
      if (!d.success) { setError(d.error || 'Login failed.'); return; }
      try { sessionStorage.setItem(TOKEN_KEY, d.token); } catch { /* ignore */ }
      setPassword(''); setToken(d.token);
    } catch { setError('Network error.'); }
    finally { setBusy(false); }
  };

  const pickMonth = (v) => { setMonth(v); if (v) setRange(`month:${v}`); };
  const applyCustom = () => { if (from && to && from <= to) { setRange('custom'); load(token, 'custom', from, to); } else setError('Pick a valid start and end date.'); };

  if (!token) {
    return (
      <div className="adm-wrap adm-login">
        <form className="adm-card adm-login-card" onSubmit={login}>
          <h1>EliteScholars Admin</h1>
          <p>Private dashboard. Enter the admin password.</p>
          <input type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
          {error && <div className="adm-error">{error}</div>}
          <button type="submit" disabled={busy || !password}>{busy ? 'Checking…' : 'Sign in'}</button>
        </form>
      </div>
    );
  }

  const s = stats;
  const m = METRICS[metric];
  const premRate = s && s.totals.students ? ((s.totals.premiumActive / s.totals.students) * 100).toFixed(1) : '0.0';
  const convRate = s && s.funnel.quizStarted ? Math.round((s.funnel.quizCompleted / s.funnel.quizStarted) * 100) : 0;
  const chData = s ? Object.entries(s.challengeStatus).map(([name, count]) => ({ name, count })) : [];
  const unit = s ? ({ hour: 'hour', day: 'day', month: 'month' })[s.range.bucket] : '';

  return (
    <div className="adm-wrap">
      <header className="adm-head">
        <div>
          <h1>EliteScholars Admin</h1>
          {s && <span className="adm-updated">{s.range.label} · {s.range.from} → {s.range.to} · by {unit}</span>}
        </div>
        <div className="adm-head-actions">
          <button onClick={() => load(token, range, from, to)} disabled={busy}>{busy ? 'Loading…' : 'Refresh'}</button>
          <button className="adm-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <div className="adm-tabs adm-maintabs">
        <button className={view === 'analytics' ? 'on' : ''} onClick={() => setView('analytics')}>Analytics</button>
        <button className={view === 'partners' ? 'on' : ''} onClick={() => setView('partners')}>Affiliate partners</button>
      </div>

      {view === 'partners' && <AdminPartners token={token} onAuthFail={(m) => { signOut(); setError(m || 'Session expired.'); }} />}

      {view === 'analytics' && (<>
      <section className="adm-controls">
        <div className="adm-pills">
          {RANGES.map(([k, l]) => <button key={k} className={range === k ? 'on' : ''} onClick={() => { setMonth(''); setRange(k); }}>{l}</button>)}
        </div>
        <div className="adm-pickers">
          <label>Month <input type="month" value={month} max={new Date().toISOString().slice(0, 7)} onChange={(e) => pickMonth(e.target.value)} /></label>
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
          {s.truncated && <div className="adm-error">This range has a lot of activity; figures may be slightly understated. Try a shorter range for exact numbers.</div>}

          <section className="adm-grid adm-stats">
            <Kpi label="New signups" value={fmtN(s.kpis.signups.v)} k={s.kpis.signups} compare={compare} />
            <Kpi label="Active students" value={fmtN(s.kpis.active.v)} k={s.kpis.active} compare={compare} sub={`${fmtN(s.totals.students)} students overall`} />
            <Kpi label="Quizzes done" value={fmtN(s.kpis.quizzes.v)} k={s.kpis.quizzes} compare={compare} />
            <Kpi label="Revenue" value={fmtNaira(s.kpis.revenue.v)} k={s.kpis.revenue} compare={compare} money sub={`${fmtN(s.kpis.payments.v)} payments`} />
            <Kpi label="XP earned" value={fmtN(s.kpis.xp.v)} k={s.kpis.xp} compare={compare} sub={s.kpis.active.v ? `${fmtN(Math.round(s.kpis.xp.v / s.kpis.active.v))} per active student` : ''} />
            <Kpi label="Premium now" value={fmtN(s.totals.premiumActive)} sub={`${premRate}% of all students`} />
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

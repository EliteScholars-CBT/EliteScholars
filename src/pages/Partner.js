import ForgotPassword from '../components/ForgotPassword';
import useReveal from '../utils/useReveal';
import '../styles/reveal.css';
import React, { useState, useEffect, useCallback } from 'react';
import { fmtN, fmtNaira, TrendChart, ColumnChart, Donut, Funnel } from '../components/AdminCharts';
import { SOURCE_LABELS } from '../utils/trafficSource';
import '../styles/admin.css';
import '../styles/partner.css';
import '../styles/partner-dash.css';
import logo from '../assets/elite-scholars-logo.png';

const ICO = {
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14.5" r="1"/>',
  school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  coins: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.7 1.7 0 0 1 0 3.5h-3a1.7 1.7 0 0 0 0 3.5h4.5"/>',
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M12 8v13M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/><path d="M12 8C10 8 8 7 8 5.5S9.5 3 11 4s1 4 1 4zM12 8c2 0 4-1 4-2.5S14.5 3 13 4s-1 4-1 4z"/>',
  tag: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
  click: '<path d="M9 9l11 4-5 2-2 5z"/><path d="M5 5l2 2M3 10h3M10 3v3"/>',
  userplus: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M19 8v6M16 11h6"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  hourglass: '<path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
};
const Ico = ({ n, size = 18, m = 0 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', verticalAlign: '-3px', marginRight: m }} dangerouslySetInnerHTML={{ __html: ICO[n] || '' }} />;


const TOKEN_KEY = 'es_partner_token';
const dt = (s) => (s ? new Date(s).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const copy = (t) => { try { navigator.clipboard?.writeText(t); } catch { /* ignore */ } };
const PREMIUM_PRICE = 3000;

async function call(path, { method = 'GET', token, body } = {}) {
  const r = await fetch(`/api/partner/${path}`, {
    method,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  return { status: r.status, ...d };
}

export default function Partner() {
  const [token, setToken] = useState(() => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } });
  const [mode, setMode] = useState('signup');
  const [trial, setTrial] = useState({ school: 0, centre: 0 }); // trial days for the schools/centres cards (public info)
  useEffect(() => { let off = false; fetch('/api/site/school-info').then((r) => r.json()).then((j) => { if (!off && j && j.success) setTrial({ school: Number(j.trialDays) || 0, centre: Number(j.centre && j.centre.trialDays) || 0 }); }).catch(() => {}); return () => { off = true; }; }, []);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [forgot, setForgot] = useState(false);
  const [hire] = useState(() => { try { return new URLSearchParams(window.location.search).get('hire') || ''; } catch { return ''; } }); // personal link from the hiring email
  useReveal('.pt-sec > h2, .pt-sec > p, .pt-steps > div, .pt-grid > div, .pt-faq > div, .pt-calc, .pt-form', token);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('overview');
  const [metric, setMetric] = useState('signups');
  const [range, setRange] = useState('month');
  const [refFilter, setRefFilter] = useState('all');
  const [bank, setBank] = useState({ bankName: '', accountName: '', accountNumber: '' });
  const [pw, setPw] = useState({ current: '', next: '' });
  const [rate, setRate] = useState(40);
  const [students, setStudents] = useState(50);
  const [faq, setFaq] = useState(0);
  useEffect(() => { fetch('/api/site/config').then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && j.partnerRate) setRate(Number(j.partnerRate) || 40); }).catch(() => {}); }, []);

  const signOut = useCallback((m) => {
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
    setToken(''); setData(null); if (m) setError(m);
  }, []);

  const load = useCallback(async (tk) => {
    setBusy(true);
    const d = await call('me', { token: tk });
    setBusy(false);
    if (d.status === 401) { signOut(d.error); return; }
    if (!d.success) { setError(d.error || 'Could not load your dashboard.'); return; }
    setData(d);
    setBank((b) => ({ ...b, bankName: d.partner.bank.bankName, accountName: d.partner.bank.accountName }));
  }, [signOut]);

  useEffect(() => { if (token) load(token); }, [token, load]);

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError(''); setInfo('');
    const d = await call(mode === 'login' ? 'login' : 'signup', { method: 'POST', body: mode === 'login' ? { email: form.email, password: form.password } : { ...form, hire } });
    setBusy(false);
    if (!d.success) { setError(d.error || 'Something went wrong.'); return; }
    if (mode === 'signup') { setInfo(d.message); setMode('login'); setForm({ ...form, password: '' }); return; }
    try { localStorage.setItem(TOKEN_KEY, d.token); } catch { /* ignore */ }
    setToken(d.token);
  };

  const doAction = async (path, body, okMsg) => {
    setError(''); setInfo(''); setBusy(true);
    const d = await call(path, { method: 'POST', token, body });
    setBusy(false);
    if (d.status === 401) { signOut(d.error); return false; }
    if (!d.success) { setError(d.error || 'Something went wrong.'); return false; }
    setInfo(okMsg || d.message || 'Done.');
    await load(token);
    return true;
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  // tell the server what the partner did (admin sees it under Activity); never blocks the UI
  const track = useCallback((kind, detail) => { if (token) call('track', { method: 'POST', token, body: { kind, detail } }).catch(() => {}); }, [token]);
  const tcopy = (text, detail) => { copy(text); track('copy_link', detail); };

  /* ── logged out: sell the programme first, then the sign-up form ── */
  if (!token) {
    const perSaleOut = Math.round((PREMIUM_PRICE * rate) / 100);
    const paying = Math.max(1, Math.round(students * 0.1)); // about 1 in 10 referred students goes Pro
    const goForm = (m) => { setMode(m); setError(''); setInfo(''); setTimeout(() => { const el = document.getElementById('pt-form'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 30); };
    const FAQ = [
      ['Is it free to join?', 'Yes. Signing up costs nothing and there is no target to hit. You only earn, you never pay.'],
      ['How do I get paid?', `Your commission shows in your dashboard as students pay. Once you reach ${fmtNaira(10000)} you request a payout and we send it to your Nigerian bank account.`],
      ['How are referrals tracked?', 'Every partner gets a personal link. When a student opens it and signs up, they are tied to you, even if they pay a few days later.'],
      ['Who is this for?', 'Social media pages, WhatsApp and Telegram group admins, teachers, school clubs, student leaders, tutors and anyone with students around them.'],
      ['Do I earn from schools too?', `Yes. Share your school link with principals, proprietors and teachers. When their school or tutorial centre pays for a plan you earn ${rate}% of every payment.`],
      ['What do students get?', 'JAMB, WAEC, NECO and GST practice, CBT mock exams, study notes, 20+ games, squads and challenges. Free to start, with Pro for no limits.'],
    ];
    return (
      <div className="pt-page">
        <nav className="pt-nav">
          <a href="/" className="pt-brand"><img src={logo} alt="" width="34" height="34" />EliteScholars</a>
          <button type="button" onClick={() => goForm('login')}>Sign in</button>
        </nav>

        <header className="pt-hero">
          <span className="pt-pill">Partner programme</span>
          <h1>Earn <em>{rate}%</em> every time a student you bring goes Pro</h1>
          <p>Share your link on WhatsApp, Instagram, TikTok or in class. We track every sign-up and pay you commission, in naira, straight to your bank.</p>
          <div className="pt-cta"><button type="button" onClick={() => goForm('signup')}>Become a partner</button><button type="button" className="ghost" onClick={() => goForm('login')}>I have an account</button></div>
          <ul className="pt-trust"><li>Free to join</li><li>Your own tracking link</li><li>Paid to your bank</li></ul>
        </header>

        <section className="pt-sec">
          <h2>How it works</h2>
          <div className="pt-steps">
            <div><i>1</i><b>Join</b><span>Create your partner account in a minute. We approve it and you get your personal link.</span></div>
            <div><i>2</i><b>Share</b><span>Post the link to your followers, groups, classmates or students. Use the ready-made message in your dashboard.</span></div>
            <div><i>3</i><b>Earn</b><span>When someone you referred pays for Pro, {rate}% is yours. Watch it grow live and request your payout.</span></div>
          </div>
        </section>

        <section className="pt-sec pt-calc">
          <h2>What could you earn?</h2>
          <p className="pt-muted">Each Pro sale pays you about <b>{fmtNaira(perSaleOut)}</b>. Move the slider to see an example.</p>
          <label className="pt-range">If you bring <b>{students}</b> students
            <input type="range" min="10" max="1000" step="10" value={students} onChange={(e) => setStudents(Number(e.target.value))} /></label>
          <div className="pt-earn"><span>If about {paying} of them go Pro, you earn</span><strong>{fmtNaira(paying * perSaleOut)}</strong></div>
          <small className="pt-muted">An example only. Real results depend on your audience.</small>
        </section>

        <section className="pt-sec">
          <h2>Why partners like it</h2>
          <div className="pt-grid">
            <div><b><Ico n="phone" m={6} />An app students love</b><span>Practice, games and squads keep students coming back, which helps them stay and upgrade.</span></div>
            <div><b><Ico n="chart" m={6} />A live dashboard</b><span>See clicks, sign-ups, who went Pro and what you earned, day by day.</span></div>
            <div><b><Ico n="link" m={6} />Tracked links</b><span>Add a tag for each place you post to learn which one brings the most students.</span></div>
            <div><b><Ico n="wallet" m={6} />Real payouts</b><span>Request a payout to your Nigerian bank account once you pass the minimum.</span></div>
          </div>
        </section>

        <section className="pt-sec">
          <h2>Also earn from schools and tutorial centres</h2>
          <p className="pt-muted">Your link works for institutions too. When a school or centre you introduced pays for its plan, you earn <b>{rate}%</b> of what they pay, on every payment.</p>
          <div className="pt-inst">
            <a className="pt-inst-card" href="/school">
              <span className="pt-inst-ico" aria-hidden="true"><Ico n="school" size={28} /></span>
              <b>Schools</b>
              <span>Teachers create classes, set assignments and notices, and see every student's results in one dashboard. Students keep using the full app for CBT, Learn mode, flashcards and games.</span>
              <small>{trial.school ? `${trial.school}-day free trial` : 'Free trial to start'} · priced by number of students</small>
              <em className="pt-inst-go">Read full details <i aria-hidden="true"><Ico n="arrow" size={14} /></i></em>
            </a>
            <a className="pt-inst-card" href="/centre">
              <span className="pt-inst-ico" aria-hidden="true"><Ico n="book" size={28} /></span>
              <b>Tutorial centres</b>
              <span>Set assignments and practice for your learners, track who is improving, and show parents real progress.</span>
              <small>{trial.centre ? `${trial.centre}-day free trial` : 'Free trial to start'} · simple plans sized for centres</small>
              <em className="pt-inst-go">Read full details <i aria-hidden="true"><Ico n="arrow" size={14} /></i></em>
            </a>
          </div>
          <p className="pt-muted pt-inst-note">Once you are approved, your dashboard gives you a ready link for schools: <b>elitescholars.site/school?ref=YOURCODE</b></p>
        </section>

        <section className="pt-sec">
          <h2>Questions</h2>
          <div className="pt-faq">
            {FAQ.map(([q, a], i) => (
              <div key={q} className={faq === i ? 'open' : ''}>
                <button type="button" onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>{q}<i>{faq === i ? '−' : '+'}</i></button>
                {faq === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="pt-sec" id="pt-form">
          {forgot ? (
            <div className="pt-form">
              <ForgotPassword kind="partner" email={form.email} onBack={() => setForgot(false)} />
            </div>
          ) : (
          <form className="pt-form" onSubmit={submit}>
            <h2 key={mode} className="pt-swap">{mode === 'login' ? 'Partner sign in' : 'Create your partner account'}</h2>
            <p>{mode === 'login' ? 'See your referrals and earnings.' : `Free. Start earning ${rate}% today.`}</p>
            {mode === 'signup' && hire && <p style={{ background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.4)', borderRadius: 12, padding: '8px 12px', fontWeight: 700 }}>You passed the hiring stage. Sign up with the same email you applied with and your account activates straight away.</p>}
            {mode === 'signup' && <input placeholder="Full name" value={form.name} onChange={set('name')} autoComplete="name" />}
            <input type="email" placeholder="Email" value={form.email} onChange={set('email')} autoComplete="email" />
            {mode === 'signup' && <input type="tel" placeholder="Phone number" value={form.phone} onChange={set('phone')} autoComplete="tel" />}
            <input type="password" placeholder="Password (8+ characters)" value={form.password} onChange={set('password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            {error && <div className="adm-error">{error}</div>}
            {info && <div className="adm-ok">{info}</div>}
            <button type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create partner account'}</button>
            {mode === 'login' && <button type="button" className="adm-ghost" onClick={() => { setForgot(true); setError(''); setInfo(''); }}>Forgot password?</button>}
            <button type="button" className="adm-ghost" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setInfo(''); }}>
              {mode === 'login' ? 'New here? Become a partner' : 'I already have an account'}
            </button>
          </form>
          )}
        </section>
        <footer className="pt-foot"><a href="/">EliteScholars</a> · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a></footer>
      </div>
    );
  }

  if (!data) return <div className="adm-wrap">{error ? <div className="adm-error">{error}</div> : <div className="adm-card">Loading…</div>}</div>;

  const p = data.partner;
  const link = `https://elitescholars.site/?ref=${p.code}`;

  /* ── waiting for approval ── */
  if (data.pending) {
    return (
      <div className="adm-wrap adm-login">
        <div className="adm-card adm-login-card">
          <h1>Almost there, {p.name.split(' ')[0]}</h1>
          <p>Your partner account is waiting for approval. We'll email <b>{p.email}</b> as soon as it's active, and your link will start earning from then.</p>
          <button className="adm-ghost" onClick={() => load(token)}>Check again</button>
          <button className="adm-ghost" onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    );
  }

  const k = data.kpis;
  const perSale = Math.round((PREMIUM_PRICE * p.rate) / 100);
  const canPay = k.available >= data.settings.minPayout && p.bank.saved && !data.openPayout;
  const whyNot = data.openPayout ? 'You already have a payout request waiting.'
    : !p.bank.saved ? 'Add your bank details in Account first.'
    : k.available < data.settings.minPayout ? `You need at least ${fmtNaira(data.settings.minPayout)} available (you have ${fmtNaira(k.available)}).` : '';
  const shareText = `Prepare for WAEC, NECO, JAMB & GST free with EliteScholars: past questions, flashcards, games and challenges. Join with my link: ${link}&src=whatsapp`;
  const first = p.name.split(' ')[0];

  // ── period numbers: the chosen range against the same-length range before it ──
  const sr = data.series;
  const cut = (arr, a, b) => (arr || []).slice(a, b);
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const ALL = range === 'all'; // all time = weekly points since the beginning; every other range is read from the daily series
  const dowMon = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(new Date().toLocaleDateString('en-US', { weekday: 'short', timeZone: 'Africa/Lagos' }));
  // today's date in Nigerian time, to find where each period starts inside the daily series
  const [LY, LM, DOM] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date()).split('-').map(Number);
  const dimOf = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate(); // days in month m (1 to 12)
  const lastDim = dimOf(LM === 1 ? LY - 1 : LY, LM === 1 ? 12 : LM - 1), prevDim = dimOf(LM <= 2 ? LY - 1 : LY, LM <= 2 ? LM + 10 : LM - 2);
  const doy = Math.round((Date.UTC(LY, LM - 1, DOM) - Date.UTC(LY, 0, 1)) / 86400000) + 1;
  // [start, end] of the chosen period and of the one to compare with, as offsets from the end of the daily series
  const mStart = -(DOM + lastDim);
  const WIN = {
    today: { w: [-1, undefined], p: [-2, -1] },
    week: { w: [-(dowMon + 1), undefined], p: [-(dowMon + 1) - 7, -7] },
    month: { w: [-DOM, undefined], p: [mStart, mStart + Math.min(DOM, lastDim)] }, // the same number of days of last month
    lastmonth: { w: [mStart, -DOM], p: [mStart - prevDim, mStart] },
    year: { w: [-doy, undefined], p: null },
  }[range] || { w: [-30, undefined], p: null };
  const NN = ALL ? 0 : (WIN.w[1] === undefined ? -WIN.w[0] : WIN.w[1] - WIN.w[0]); // days in the chosen period
  const NOPREV = ALL || !WIN.p;
  const SHORT = !ALL && NN < 7; // too few points for a trend line, so charts show the last 7 days
  const cur = (key) => (ALL ? ((data.allTime || {})[key] || []) : cut(sr[key], WIN.w[0], WIN.w[1]));
  const prv = (key) => (NOPREV ? undefined : cut(sr[key], WIN.p[0], WIN.p[1]));
  const per = (key) => ({ v: sum(cur(key)), prev: NOPREV ? 0 : sum(prv(key)) });
  const P = { clicks: per('clicks'), signups: per('signups'), paying: per('paying'), earnings: per('earnings') };
  const delta = (o) => (o.prev > 0 ? Math.round(((o.v - o.prev) / o.prev) * 100) : o.v > 0 ? null : 0);
  const rangeLabel = { today: 'today', week: 'this week', month: 'this month', lastmonth: 'last month', year: 'this year', all: 'the whole time you have been a partner' }[range];
  const prevWord = { today: 'yesterday', week: 'the same days last week', month: 'the same days last month', lastmonth: 'the month before' }[range];
  const srcNow = (data.sourcesBy && data.sourcesBy[range]) || { sources: data.sources || [], tags: [] };
  const pctOf = (a, b) => (b > 0 ? Math.round((a / b) * 1000) / 10 : 0);
  const waiting = Math.max(0, k.signups - k.paying);
  const goal = data.settings.minPayout;
  const goalPct = Math.min(100, Math.round((k.available / goal) * 100));
  const DAYN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hh = (h) => `${h % 12 || 12}${h < 12 ? 'am' : 'pm'}`;
  const hrs = data.hours || new Array(24).fill(0), wds = data.weekdays || new Array(7).fill(0);
  const clicks90 = sum(hrs);

  const tips = [];
  if (k.available >= goal) tips.push(['good', `You have ${fmtNaira(k.available)} ready to withdraw${p.bank.saved ? '. Open Earnings to request it.' : '. Add your bank details in Account first.'}`]);
  else if (k.earnedTotal > 0 || k.signups > 0) tips.push(['info', `${fmtNaira(goal - k.available)} more and you reach the ${fmtNaira(goal)} payout minimum. About ${Math.max(1, Math.ceil((goal - k.available) / Math.max(1, perSale)))} more Pro sale${Math.ceil((goal - k.available) / Math.max(1, perSale)) === 1 ? '' : 's'}.`]);
  const dS = delta(P.signups);
  if (!NOPREV && P.signups.v + P.signups.prev >= 3 && dS !== null && Math.abs(dS) >= 10) tips.push([dS > 0 ? 'good' : 'warn', `Signups are ${dS > 0 ? 'up' : 'down'} ${Math.abs(dS)}% on ${prevWord} (${P.signups.prev} to ${P.signups.v}).`]);
  if (clicks90 >= 15) { const bd = wds.indexOf(Math.max(...wds)), bh = hrs.indexOf(Math.max(...hrs)); tips.push(['info', `Your link is clicked most on ${DAYN[bd]}s, around ${hh(bh)}. Post just before then.`]); }
  if (P.clicks.v >= 20) { const cv = pctOf(P.signups.v, P.clicks.v); tips.push([cv < 5 ? 'warn' : 'good', `${cv}% of clicks became signups in ${rangeLabel}.${cv < 5 ? ' A short message that says what students get (free past questions) usually lifts this.' : ''}`]); }
  if (srcNow.sources[0]) tips.push(['info', `Best source: ${SOURCE_LABELS[srcNow.sources[0].name] || srcNow.sources[0].name} (${fmtN(srcNow.sources[0].visits)} visits).`]);
  if (waiting >= 3) tips.push(['info', `${waiting} students joined but have not gone Pro yet. A friendly reminder in your group about the Pro features can convert some of them.`]);
  if (data.avgDaysToPay !== null && data.avgDaysToPay !== undefined && k.paying >= 2) tips.push(['info', `Students who pay usually do so about ${data.avgDaysToPay} day${data.avgDaysToPay === 1 ? '' : 's'} after joining.`]);
  if (!tips.length) tips.push(['info', 'Share your link to start seeing insights here.']);

  const NAV = [['overview', 'chart', 'Overview'], ['referrals', 'users', 'Students'], ['earnings', 'coins', 'Earnings'], ['resources', 'gift', 'Resources'], ['prices', 'tag', 'Prices'], ['account', 'user', 'Account']];
  const metricInfo = { clicks: ['Clicks', fmtN, '#8b5cf6'], signups: ['Signups', fmtN, '#22d3ee'], paying: ['New paying', fmtN, '#34d399'], earnings: ['Earnings', fmtNaira, '#f5b400'] };
  const mi = metricInfo[metric] || metricInfo.signups;

  const Spark = ({ vals, color }) => {
    const mx = Math.max(1, ...vals), w = 90, h = 28;
    const pts = vals.map((v, i) => `${((i / Math.max(1, vals.length - 1)) * w).toFixed(1)},${(h - 2 - (v / mx) * (h - 4)).toFixed(1)}`).join(' ');
    return <svg viewBox={`0 0 ${w} ${h}`} className="pd-spark" aria-hidden="true"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  };
  const Tile = ({ id, label, value, color, icon, sub }) => {
    const d = NOPREV ? 0 : delta(P[id]);
    return (
      <div className="pd-tile" style={{ '--c': color }}>
        <div className="pd-tile-top"><span className="pd-tile-ico"><Ico n={icon} /></span><span>{label}</span></div>
        <strong>{value}</strong>
        <div className="pd-tile-foot">
          <span className={`pd-delta ${d === null || d > 0 ? 'up' : d < 0 ? 'down' : ''}`}>{NOPREV ? (ALL ? 'all time' : 'this year') : d === null ? 'new' : d === 0 ? '—' : <><Ico n={d > 0 ? 'up' : 'down'} size={12} m={3} />{Math.abs(d)}%</>}</span>
          <Spark vals={SHORT ? cut(sr[id], -7) : cur(id)} color={color} />
        </div>
        {sub && <small>{sub}</small>}
      </div>
    );
  };
  const Seg = ({ value, onChange, items }) => (
    <div className="pd-seg" role="group">{items.map(([v, l]) => <button key={v} type="button" className={value === v ? 'on' : ''} onClick={() => onChange(v)}>{l}</button>)}</div>
  );
  const shownRefs = data.referrals.filter((r) => refFilter === 'all' || (refFilter === 'paid' ? r.status === 'Paid' : r.status !== 'Paid'));

  return (
    <div className="adm-wrap pd-wrap">
      <header className="pd-hero">
        <div className="pd-hero-top">
          <div><small>EliteScholars partner</small><h1>Hi {first}</h1></div>
          <div className="pd-hero-actions">
            <button type="button" onClick={() => load(token)} disabled={busy}>{busy ? 'Loading…' : <><Ico n="refresh" size={14} m={6} />Refresh</>}</button>
            <button type="button" className="ghost" onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
        <div className="pd-hero-grid">
          <div className="pd-balance">
            <small>Available to withdraw</small>
            <strong>{fmtNaira(k.available)}</strong>
            <div className="pd-goal"><i style={{ width: `${goalPct}%` }} /></div>
            <span>{k.available >= goal ? 'You can request a payout' : `${fmtNaira(Math.max(0, goal - k.available))} to the ${fmtNaira(goal)} minimum`}</span>
            <div className="pd-balance-row"><b>{fmtNaira(k.earnedTotal)}</b> earned in total · <b>{fmtNaira(k.paid)}</b> paid to you</div>
          </div>
          <div className="pd-linkcard">
            <small>Your link · code <b>{p.code}</b> · you earn <b>{p.rate}%</b></small>
            <div className="pd-linkrow"><span>{link}</span><button type="button" onClick={() => { tcopy(link, 'student link'); setInfo('Link copied.'); }}>Copy</button></div>
            <div className="pd-linkbtns">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" onClick={() => track('copy_link', 'whatsapp share')}>Share on WhatsApp</a>
              <button type="button" className="ghost" onClick={() => { tcopy(shareText, 'share message'); setInfo('Message copied.'); }}>Copy message</button>
            </div>
          </div>
        </div>
      </header>

      <nav className="pd-nav" aria-label="Partner dashboard sections">
        {NAV.map(([key, ico, label]) => (
          <button key={key} type="button" className={tab === key ? 'on' : ''} onClick={() => { setTab(key); setError(''); setInfo(''); if (key === 'prices') track('prices_view', 'Prices tab'); if (key === 'resources') track('resource_view', 'Resources tab'); }}><span aria-hidden="true" style={{ display: 'inline-flex' }}><Ico n={ico} /></span>{label}</button>
        ))}
      </nav>
      {error && <div className="adm-error">{error}</div>}
      {info && <div className="adm-ok">{info}</div>}

      {tab === 'overview' && (
        <>
          <div className="pd-bar">
            <h2>Performance</h2>
            <Seg value={range} onChange={setRange} items={[['today', 'Today'], ['week', 'This week'], ['month', 'This month'], ['lastmonth', 'Last month'], ['year', 'This year'], ['all', 'All time']]} />
          </div>
          <section className="pd-tiles">
            <Tile id="clicks" label="Link clicks" icon="click" color="#8b5cf6" value={fmtN(P.clicks.v)} sub={ALL ? ' ' : `${fmtN(k.clicks)} all time`} />
            <Tile id="signups" label="Signups" icon="userplus" color="#22d3ee" value={fmtN(P.signups.v)} sub={`${pctOf(P.signups.v, P.clicks.v)}% of clicks`} />
            <Tile id="paying" label="New paying" icon="star" color="#34d399" value={fmtN(P.paying.v)} sub={`${k.conversion}% of all signups pay`} />
            <Tile id="earnings" label="Earned" icon="coins" color="#f5b400" value={fmtNaira(P.earnings.v)} sub={P.clicks.v ? `${fmtNaira(Math.round(P.earnings.v / P.clicks.v))} per click` : ' '} />
          </section>

          <section className="adm-card pd-card">
            <div className="adm-card-head">
              <h2>Trend</h2>
              <Seg value={metric} onChange={setMetric} items={Object.entries(metricInfo).map(([v, m]) => [v, m[0]])} />
            </div>
            <TrendChart labels={ALL ? ((data.allTime || {}).labels || []) : SHORT ? cut(sr.labels, -7) : cut(sr.labels, WIN.w[0], WIN.w[1])} values={SHORT ? cut(sr[metric], -7) : cur(metric)} prev={SHORT ? undefined : prv(metric)} fmt={mi[1]} color={mi[2]} />
            <p className="adm-note">{mi[0]}: <b>{mi[1](P[metric].v)}</b> in {rangeLabel}. {ALL ? 'Each point is one week.' : SHORT ? 'The chart shows the last 7 days so you can see the shape.' : (NOPREV ? 'Each point is one day.' : `The dashed line is ${prevWord}.`)}</p>
          </section>

          <section className="adm-card pd-card">
            <h2>What your numbers say</h2>
            <ul className="pd-tips">{tips.slice(0, 6).map(([tone, text], i) => <li key={i} className={tone}><i />{text}</li>)}</ul>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card pd-card">
              <h2>From click to Pro</h2>
              <Funnel steps={[{ name: 'Clicked your link', count: P.clicks.v }, { name: 'Signed up', count: P.signups.v }, { name: 'Went Pro', count: P.paying.v }]} />
              <p className="adm-note">{pctOf(P.signups.v, P.clicks.v)}% of clicks sign up · {pctOf(P.paying.v, P.signups.v)}% of those signups went Pro in this period.</p>
            </div>
            <div className="adm-card pd-card">
              <h2>Where visitors come from</h2>
              {srcNow.sources.length ? <Donut data={srcNow.sources.map((x) => ({ name: SOURCE_LABELS[x.name] || x.name, count: x.visits || x.signups }))} /> : <p className="adm-empty">No visits yet. Add <code>&amp;src=whatsapp</code> or similar to your link to see sources.</p>}
            </div>
          </section>

          <section className="adm-grid adm-two">
            <div className="adm-card pd-card"><h2>Best day to post</h2><ColumnChart values={wds} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /><p className="adm-note">Clicks by day of week, last 90 days.</p></div>
            <div className="adm-card pd-card"><h2>Best time to post</h2><ColumnChart values={hrs} labels={Array.from({ length: 24 }, (_, h) => `${h % 12 || 12}${h < 12 ? 'a' : 'p'}`)} /><p className="adm-note">Clicks by hour (Nigerian time), last 90 days.</p></div>
          </section>

          <section className="adm-card pd-card">
            <h2>Sources and tagged links</h2>
            {srcNow.sources.length ? (
              <div className="pd-table">
                <div className="pd-tr head"><span>Source</span><span>Clicks</span><span>Signups</span><span>Convert</span></div>
                {srcNow.sources.map((x) => <div className="pd-tr" key={x.name}><span><b>{SOURCE_LABELS[x.name] || x.name}</b></span><span>{fmtN(x.visits)}</span><span>{fmtN(x.signups)}</span><span>{x.visits ? `${Math.round((x.signups / x.visits) * 100)}%` : '—'}</span></div>)}
              </div>
            ) : <p className="adm-empty">Nothing recorded {range === 'today' || range === 'week' ? '' : 'in '}{rangeLabel}.</p>}
            {srcNow.tags.length > 0 && (
              <>
                <h3 className="pd-h3">Your tags</h3>
                <div className="pd-table">
                  <div className="pd-tr head"><span>Tag</span><span>Clicks</span><span>Signups</span><span>Convert</span></div>
                  {srcNow.tags.map((x) => <div className="pd-tr" key={x.name}><span><b>{x.name}</b></span><span>{fmtN(x.visits)}</span><span>{fmtN(x.signups)}</span><span>{x.visits ? `${Math.round((x.signups / x.visits) * 100)}%` : '—'}</span></div>)}
                </div>
              </>
            )}
            <p className="adm-note">Add a tag to any link, like <code>{link}&amp;campaign=whatsapp-group-1</code>, to learn which post or group brings the most students.</p>
          </section>

          <section className="adm-card pd-card">
            <h2>Links for schools and centres</h2>
            <h3 className="pd-h3">Schools</h3>
            <div className="adm-linkbox"><span>{`https://elitescholars.site/school?ref=${p.code}`}</span><button className="adm-small" onClick={() => { tcopy(`https://elitescholars.site/school?ref=${p.code}`, 'school link'); setInfo('School link copied.'); }}>Copy</button></div>
            <p className="adm-note">Share with school owners, principals and teachers. When a school pays for its plan you earn <b>{p.rate}%</b> of what they pay, on every payment. <a href="/school" target="_blank" rel="noreferrer">Read about schools <Ico n="arrow" size={14} /></a></p>
            <h3 className="pd-h3">Tutorial centres</h3>
            <div className="adm-linkbox"><span>{`https://elitescholars.site/centre?ref=${p.code}`}</span><button className="adm-small" onClick={() => { tcopy(`https://elitescholars.site/centre?ref=${p.code}`, 'centre link'); setInfo('Centre link copied.'); }}>Copy</button></div>
            <p className="adm-note">Share with centre owners and lesson teachers. You earn <b>{p.rate}%</b> of every payment they make. <a href="/centre" target="_blank" rel="noreferrer">Read about centres <Ico n="arrow" size={14} /></a></p>
            <p className="adm-note">You earn <b>{p.rate}%</b> of every Pro payment from students who join through your link, about <b>{fmtNaira(perSale)}</b> on a {fmtNaira(PREMIUM_PRICE)} plan. The link remembers a visitor for 60 days.</p>
          </section>
        </>
      )}

      {tab === 'referrals' && (
        <>
          <section className="pd-tiles three">
            <div className="pd-tile" style={{ '--c': '#22d3ee' }}><div className="pd-tile-top"><span className="pd-tile-ico"><Ico n="userplus" /></span><span>Joined</span></div><strong>{fmtN(k.signups)}</strong></div>
            <div className="pd-tile" style={{ '--c': '#34d399' }}><div className="pd-tile-top"><span className="pd-tile-ico"><Ico n="star" /></span><span>Went Pro</span></div><strong>{fmtN(k.paying)}</strong><small>{k.conversion}% conversion</small></div>
            <div className="pd-tile" style={{ '--c': '#f5b400' }}><div className="pd-tile-top"><span className="pd-tile-ico"><Ico n="hourglass" /></span><span>Waiting</span></div><strong>{fmtN(waiting)}</strong><small>joined, not Pro yet</small></div>
          </section>
          <section className="adm-card pd-card">
            <div className="adm-card-head"><h2>Students who joined with your link</h2>
              <Seg value={refFilter} onChange={setRefFilter} items={[['all', `All ${data.referrals.length}`], ['paid', 'Went Pro'], ['wait', 'Not yet']]} /></div>
            {!shownRefs.length && <p className="adm-empty">{data.referrals.length ? 'No students in this view.' : 'No signups yet. Share your link to get started.'}</p>}
            <div className="adm-table">
              {shownRefs.map((r, i) => (
                <div className="adm-tr adm-tr5" key={i}><span>{r.name}</span><span>{r.email}</span><span>{dt(r.joined)}</span>
                  <span className={`adm-chip ${r.status === 'Paid' ? 'active' : 'pending'}`}>{r.status}</span><span>{r.earned ? fmtNaira(r.earned) : '—'}</span></div>
              ))}
            </div>
            <p className="adm-note">Emails are partly hidden to protect students' privacy.</p>
          </section>
        </>
      )}

      {tab === 'earnings' && (
        <>
          <section className="pd-tiles three">
            <div className="pd-tile" style={{ '--c': '#f5b400' }}><div className="pd-tile-top"><span className="pd-tile-ico"><Ico n="cash" /></span><span>Available</span></div><strong>{fmtNaira(k.available)}</strong><small>ready to withdraw</small></div>
            <div className="pd-tile" style={{ '--c': '#8b5cf6' }}><div className="pd-tile-top"><span className="pd-tile-ico"><Ico n="clock" /></span><span>In payout</span></div><strong>{fmtNaira(k.inPayout)}</strong><small>being processed</small></div>
            <div className="pd-tile" style={{ '--c': '#34d399' }}><div className="pd-tile-top"><span className="pd-tile-ico"><Ico n="check" /></span><span>Paid to you</span></div><strong>{fmtNaira(k.paid)}</strong><small>{fmtNaira(k.earnedTotal)} earned in total</small></div>
          </section>
          {data.monthly && (
            <section className="adm-card pd-card">
              <h2>Earnings by month</h2>
              <ColumnChart values={data.monthly.values} labels={data.monthly.labels} />
              <p className="adm-note">Commission earned each month, last 6 months.{data.monthly.values.some((v) => v > 0) ? ` Best month: ${fmtNaira(Math.max(...data.monthly.values))}.` : ''}</p>
            </section>
          )}
          <section className="adm-card pd-card">
            <h2>Withdraw</h2>
            <div className="pd-goal big"><i style={{ width: `${goalPct}%` }} /></div>
            <p className="adm-note" style={{ marginTop: 6 }}>{fmtNaira(k.available)} of the {fmtNaira(goal)} minimum ({goalPct}%).</p>
            <button disabled={!canPay || busy} onClick={() => doAction('payout', {}, 'Payout requested. We will pay it to your bank account and email you.')}>
              Request payout of {fmtNaira(k.available)}
            </button>
            {whyNot && <p className="adm-note">{whyNot}</p>}
            {data.openPayout && <p className="adm-note">Waiting: {fmtNaira(data.openPayout.amount)} requested on {dt(data.openPayout.requested_at)}.</p>}
          </section>
          <section className="adm-card pd-card">
            <h2>Commissions</h2>
            {!data.commissions.length && <p className="adm-empty">Nothing yet. You earn when a student you referred pays for Pro.</p>}
            <div className="adm-table">
              {data.commissions.map((c) => (
                <div className="adm-tr adm-tr5" key={c.id}><span>{c.email}</span><span>{fmtNaira(c.paymentAmount)} × {c.rate}%</span><b>{fmtNaira(c.amount)}</b>
                  <span>{dt(c.at)}</span><span className={`adm-chip ${c.status}`}>{c.status.replace('_', ' ')}</span></div>
              ))}
            </div>
          </section>
          <section className="adm-card pd-card">
            <h2>Payout history</h2>
            {!data.payouts.length && <p className="adm-empty">No payouts yet.</p>}
            <div className="adm-table">
              {data.payouts.map((x) => (
                <div className="adm-tr adm-tr5" key={x.id}><b>{fmtNaira(x.amount)}</b><span className={`adm-chip ${x.status}`}>{x.status}</span>
                  <span>{dt(x.requested_at)}</span><span>{dt(x.processed_at)}</span><span>{x.reference || x.note || ''}</span></div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'resources' && (
        <section className="adm-card pd-card">
          <h2>Resources</h2>
          <p className="adm-note" style={{ marginTop: 0 }}>Ready-made flyers to share in groups, on your status and on your page. Add your personal link when you post them.</p>
          <div className="pt-res">
            {(data.resources || []).map((r) => (
              <div className="pt-res-card" key={r.id}>
                <img src={r.file} alt={r.title} loading="lazy" />
                <b>{r.title}</b><small>{r.audience} · {r.note}</small>
                <div className="adm-inline">
                  <a className="adm-small" href={r.file} target="_blank" rel="noreferrer" onClick={() => track('resource_view', r.title)}>View</a>
                  <a className="adm-small" href={r.file} download={`${r.id}.png`} onClick={() => track('resource_download', r.title)}>Download</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'prices' && data.prices && (() => {
        const pr = data.prices;
        const earn = (n) => fmtNaira(Math.round((n * p.rate) / 100));
        const pl = pr.plans || {};
        const rowsP = [['JAMB Pro (1 year)', pl.jamb ?? pr.premiumAnnual], ['WAEC & NECO Pro (6 months)', pl.waecneco6], ['WAEC & NECO Pro (1 year)', pl.waecneco12], ['GST Pro (6 months)', pl.gst6], ['GST Pro (1 year)', pl.gst12], ['Squad plan, 50 seats', pr.group50], ['Squad plan, 100 seats', pr.group100]].filter(([, v]) => v > 0);
        return (
          <>
            <section className="adm-card pd-card">
              <h2>Current prices</h2>
              <p className="adm-note" style={{ marginTop: 0 }}>These are always the latest prices. Your commission is <b>{p.rate}%</b> of every payment.</p>
              <div className="adm-table">
                {rowsP.map(([n, v]) => (<div className="adm-tr adm-tr5" key={n}><span><b>{n}</b></span><span>{fmtNaira(v)}</span><span>You earn {earn(v)}</span></div>))}
              </div>
            </section>
            <section className="adm-card pd-card">
              <h2>Schools (per {pr.school.period})</h2>
              <div className="adm-table">{pr.school.tiers.map((t) => (<div className="adm-tr adm-tr5" key={t.label}><span><b>{t.label}</b></span><span>{fmtNaira(t.price)}</span><span>You earn {earn(t.price)}</span></div>))}</div>
            </section>
            <section className="adm-card pd-card">
              <h2>Tutorial centres (per month)</h2>
              <div className="adm-table">{pr.centre.tiers.map((t) => (<div className="adm-tr adm-tr5" key={t.label}><span><b>{t.label}</b></span><span>{fmtNaira(t.price)}{t.yearPrice ? ` · ${fmtNaira(t.yearPrice)}/yr` : ''}</span><span>You earn {earn(t.price)}</span></div>))}</div>
            </section>
          </>
        );
      })()}

      {tab === 'account' && (
        <section className="adm-grid adm-two">
          <div className="adm-card pd-card">
            <h2>Bank details for payouts</h2>
            {p.bank.saved && <p className="adm-note">Saved: {p.bank.bankName}, {p.bank.accountName}, {p.bank.accountMasked}. Enter new details below to replace them.</p>}
            <div className="adm-form">
              <input placeholder="Bank name (e.g. GTBank)" value={bank.bankName} onChange={(e) => setBank({ ...bank, bankName: e.target.value })} />
              <input placeholder="Account name" value={bank.accountName} onChange={(e) => setBank({ ...bank, accountName: e.target.value })} />
              <input placeholder="10-digit account number" inputMode="numeric" maxLength={10} value={bank.accountNumber} onChange={(e) => setBank({ ...bank, accountNumber: e.target.value.replace(/\D/g, '') })} />
              <button disabled={busy} onClick={async () => { if (await doAction('bank', bank, 'Bank details saved.')) setBank({ ...bank, accountNumber: '' }); }}>Save bank details</button>
            </div>
            <p className="adm-note">Your account number is stored encrypted and only shown in full to EliteScholars when paying you.</p>
          </div>
          <div className="adm-card pd-card">
            <h2>Change password</h2>
            <div className="adm-form">
              <input type="password" placeholder="Current password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} autoComplete="current-password" />
              <input type="password" placeholder="New password (8+ characters)" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" />
              <button disabled={busy} onClick={async () => { if (await doAction('password', pw, 'Password changed.')) setPw({ current: '', next: '' }); }}>Change password</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

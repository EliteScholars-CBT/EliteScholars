import React, { useState, useEffect, useCallback } from 'react';
import { fmtN, fmtNaira, TrendChart, Kpi } from '../components/AdminCharts';
import { SOURCE_LABELS } from '../utils/trafficSource';
import '../styles/admin.css';
import '../styles/partner.css';
import logo from '../assets/elite-scholars-logo.png';

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
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('overview');
  const [metric, setMetric] = useState('signups');
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
    const d = await call(mode === 'login' ? 'login' : 'signup', { method: 'POST', body: mode === 'login' ? { email: form.email, password: form.password } : form });
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
            <div><b>📲 An app students love</b><span>Practice, games and squads keep students coming back, which helps them stay and upgrade.</span></div>
            <div><b>📊 A live dashboard</b><span>See clicks, sign-ups, who went Pro and what you earned, day by day.</span></div>
            <div><b>🔗 Tracked links</b><span>Add a tag for each place you post to learn which one brings the most students.</span></div>
            <div><b>💸 Real payouts</b><span>Request a payout to your Nigerian bank account once you pass the minimum.</span></div>
          </div>
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
          <form className="pt-form" onSubmit={submit}>
            <h2 key={mode} className="pt-swap">{mode === 'login' ? 'Partner sign in' : 'Create your partner account'}</h2>
            <p>{mode === 'login' ? 'See your referrals and earnings.' : `Free. Start earning ${rate}% today.`}</p>
            {mode === 'signup' && <input placeholder="Full name" value={form.name} onChange={set('name')} autoComplete="name" />}
            <input type="email" placeholder="Email" value={form.email} onChange={set('email')} autoComplete="email" />
            {mode === 'signup' && <input type="tel" placeholder="Phone number" value={form.phone} onChange={set('phone')} autoComplete="tel" />}
            <input type="password" placeholder="Password (8+ characters)" value={form.password} onChange={set('password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            {error && <div className="adm-error">{error}</div>}
            {info && <div className="adm-ok">{info}</div>}
            <button type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create partner account'}</button>
            <button type="button" className="adm-ghost" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setInfo(''); }}>
              {mode === 'login' ? 'New here? Become a partner' : 'I already have an account'}
            </button>
          </form>
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

  return (
    <div className="adm-wrap">
      <header className="adm-head">
        <div><h1>Hi {p.name.split(' ')[0]} 👋</h1><span className="adm-updated">EliteScholars partner dashboard</span></div>
        <div className="adm-head-actions">
          <button onClick={() => load(token)} disabled={busy}>{busy ? 'Loading…' : 'Refresh'}</button>
          <button className="adm-ghost" onClick={() => signOut()}>Sign out</button>
        </div>
      </header>

      <div className="adm-tabs adm-maintabs">
        {[['overview', 'Overview'], ['referrals', 'Referrals'], ['earnings', 'Earnings & payouts'], ['account', 'Account']].map(([key, label]) =>
          <button key={key} className={tab === key ? 'on' : ''} onClick={() => { setTab(key); setError(''); setInfo(''); }}>{label}</button>)}
      </div>
      {error && <div className="adm-error">{error}</div>}
      {info && <div className="adm-ok">{info}</div>}

      {tab === 'overview' && (
        <>
          <section className="adm-card">
            <h2>Your personal link</h2>
            <div className="adm-linkbox"><span>{link}</span><button className="adm-small" onClick={() => { copy(link); setInfo('Link copied.'); }}>Copy</button></div>
            <div className="adm-inline adm-gap">
              <a className="adm-btn" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">Share on WhatsApp</a>
              <button className="adm-ghost" onClick={() => { copy(shareText); setInfo('Message copied.'); }}>Copy message</button>
            </div>
            <p className="adm-note">You earn <b>{p.rate}%</b> of every Pro payment from students who join through your link, about <b>{fmtNaira(perSale)}</b> on a {fmtNaira(PREMIUM_PRICE)} plan. Your code is <b>{p.code}</b>. The link remembers a visitor for 60 days.</p>
          </section>

          <section className="adm-card">
            <h2>Where your clicks come from (30 days)</h2>
            {(() => {
              const src = data.sources || [];
              const tv = src.reduce((a, x) => a + x.visits, 0), ts = src.reduce((a, x) => a + x.signups, 0);
              if (!src.length) return <p className="adm-empty">No visits recorded yet. Share your link and sources will appear here.</p>;
              const top = Math.max(1, ...src.map((x) => x.visits));
              return (
                <>
                  <p className="adm-note" style={{ marginTop: 0 }}><b>{fmtN(tv)}</b> visits · <b>{fmtN(ts)}</b> sign-ups · best source: <b>{SOURCE_LABELS[src[0].name] || src[0].name}</b></p>
                  <div className="adm-list tight">
                    {src.map((x) => (
                      <div className="adm-item" key={x.name}>
                        <div className="adm-item-head static" style={{ flexWrap: 'wrap' }}>
                          <span className="adm-item-main"><b>{SOURCE_LABELS[x.name] || x.name}</b><small> {tv ? Math.round((x.visits / tv) * 100) : 0}% of visits</small></span>
                          <span className="adm-item-side"><b>{fmtN(x.visits)} clicks</b><small>{fmtN(x.signups)} sign-ups{x.visits ? ` · ${Math.round((x.signups / x.visits) * 100)}% convert` : ''}</small></span>
                          <div style={{ flexBasis: '100%', height: 6, borderRadius: 4, background: 'rgba(139,92,246,.18)', marginTop: 6 }}><div style={{ width: `${Math.max(4, (x.visits / top) * 100)}%`, height: '100%', borderRadius: 4, background: '#8b5cf6' }} /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </section>

          <section className="adm-grid adm-stats">
            <Kpi label="Link clicks" value={fmtN(k.clicks)} />
            <Kpi label="Signups" value={fmtN(k.signups)} />
            <Kpi label="Paying students" value={fmtN(k.paying)} sub={`${k.conversion}% of signups`} />
            <Kpi label="Total earned" value={fmtNaira(k.earnedTotal)} />
            <Kpi label="Available now" value={fmtNaira(k.available)} />
            <Kpi label="Paid to you" value={fmtNaira(k.paid)} />
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Last 30 days</h2>
              <div className="adm-tabs">
                {[['clicks', 'Clicks'], ['signups', 'Signups'], ['earnings', 'Earnings']].map(([key, l]) =>
                  <button key={key} className={metric === key ? 'on' : ''} onClick={() => setMetric(key)}>{l}</button>)}
              </div>
            </div>
            <TrendChart labels={data.series.labels} values={data.series[metric]} fmt={metric === 'earnings' ? fmtNaira : fmtN} color={metric === 'earnings' ? '#f5b400' : '#8b5cf6'} />
          </section>
        </>
      )}

      {tab === 'referrals' && (
        <section className="adm-card">
          <h2>Students who joined with your link ({data.referrals.length})</h2>
          {!data.referrals.length && <p className="adm-empty">No signups yet. Share your link to get started.</p>}
          <div className="adm-table">
            {data.referrals.map((r, i) => (
              <div className="adm-tr adm-tr5" key={i}><span>{r.name}</span><span>{r.email}</span><span>{dt(r.joined)}</span>
                <span className={`adm-chip ${r.status === 'Paid' ? 'active' : 'pending'}`}>{r.status}</span><span>{r.earned ? fmtNaira(r.earned) : '—'}</span></div>
            ))}
          </div>
          <p className="adm-note">Emails are partly hidden to protect students' privacy.</p>
        </section>
      )}

      {tab === 'earnings' && (
        <>
          <section className="adm-grid adm-stats">
            <Kpi label="Available" value={fmtNaira(k.available)} sub="ready to withdraw" />
            <Kpi label="In payout" value={fmtNaira(k.inPayout)} sub="being processed" />
            <Kpi label="Paid to you" value={fmtNaira(k.paid)} />
          </section>
          <section className="adm-card">
            <h2>Withdraw</h2>
            <button disabled={!canPay || busy} onClick={() => doAction('payout', {}, 'Payout requested. We will pay it to your bank account and email you.')}>
              Request payout of {fmtNaira(k.available)}
            </button>
            {whyNot && <p className="adm-note">{whyNot}</p>}
            {data.openPayout && <p className="adm-note">Waiting: {fmtNaira(data.openPayout.amount)} requested on {dt(data.openPayout.requested_at)}.</p>}
          </section>
          <section className="adm-card">
            <h2>Commissions</h2>
            {!data.commissions.length && <p className="adm-empty">Nothing yet. You earn when a student you referred pays for Pro.</p>}
            <div className="adm-table">
              {data.commissions.map((c) => (
                <div className="adm-tr adm-tr5" key={c.id}><span>{c.email}</span><span>{fmtNaira(c.paymentAmount)} × {c.rate}%</span><b>{fmtNaira(c.amount)}</b>
                  <span>{dt(c.at)}</span><span className={`adm-chip ${c.status}`}>{c.status.replace('_', ' ')}</span></div>
              ))}
            </div>
          </section>
          <section className="adm-card">
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

      {tab === 'account' && (
        <section className="adm-grid adm-two">
          <div className="adm-card">
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
          <div className="adm-card">
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

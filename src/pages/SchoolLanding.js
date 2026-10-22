import React, { useEffect, useState } from 'react';
import SiteShell from '../components/SiteShell';
import '../styles/schoolpage.css';

const ng = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');
const FALLBACK = { trialDays: 14, period: 'term', tiers: [] };

const FEATURES = [
  ['📚', 'Homework that students actually do', 'Set quizzes from our question bank by subject and topic. Students answer on their phones and you see who finished.'],
  ['📈', 'See every class at a glance', 'Scores, completion and weak topics for each student, so you know who needs help before the exam.'],
  ['🔑', 'Join in seconds with a class code', 'No data entry. Share a short code and students join themselves.'],
  ['📱', 'Works on any phone', 'Light enough for low data. No laptops or computer lab needed.'],
  ['🎯', 'JAMB, WAEC, NECO and GST', '50,000+ practice questions with full explanations, plus timed CBT simulations.'],
  ['🏆', 'Healthy competition', 'XP, streaks, squads and challenges keep students coming back every day.'],
];
const STEPS = [
  ['1', 'Start your free trial', 'Create a teacher account and your first class. Your trial begins automatically.'],
  ['2', 'Share your class code', 'Students join from their phones in under a minute.'],
  ['3', 'Set work, track results', 'Assign practice and watch the results come in.'],
  ['4', 'Choose a plan', 'Happy after the trial? Pick the plan that fits your student count.'],
];

export default function SchoolLanding() {
  const [info, setInfo] = useState(FALLBACK);
  const [f, setF] = useState({ name: '', school: '', phone: '', email: '', students: '', message: '', website: '' });
  const [state, setState] = useState({ busy: false, ok: '', err: '' });

  useEffect(() => {
    document.title = 'EliteScholars for Schools: free 14-day trial';
    let off = false;
    fetch('/api/site/school-info').then((r) => r.json()).then((j) => { if (!off && j && j.success) setInfo(j); }).catch(() => {});
    return () => { off = true; };
  }, []);

  const start = () => {
    try { sessionStorage.setItem('es_open_school', '1'); } catch { /* ignore */ }
    window.location.href = '/app?src=school-page';
  };
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    if (state.busy) return;
    setState({ busy: true, ok: '', err: '' });
    try {
      const r = await fetch('/api/site/school-demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.success !== false) setState({ busy: false, ok: j.message || 'Thanks! We will contact you soon.', err: '' });
      else setState({ busy: false, ok: '', err: j.error || 'Something went wrong. Please try again.' });
    } catch { setState({ busy: false, ok: '', err: 'Network error. Check your connection and try again.' }); }
  };

  return (
    <SiteShell
      eyebrow="For schools"
      title={`Try EliteScholars free for ${info.trialDays} days`}
      intro="Give every student smart exam practice on their own phone, and give teachers a clear view of who is ready."
    >
      <div className="scp-cta-row">
        <button className="scp-btn primary" onClick={start}>Start free trial</button>
        <a className="scp-btn" href="#demo">Request a demo</a>
      </div>

      <section className="sp-card">
        <h2>What your school gets</h2>
        <div className="scp-grid">
          {FEATURES.map(([ic, t, d]) => (
            <div key={t} className="scp-feat"><span aria-hidden="true">{ic}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="sp-card">
        <h2>How it works</h2>
        <ol className="scp-steps">
          {STEPS.map(([n, t, d]) => (<li key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></li>))}
        </ol>
      </section>

      {info.tiers.length > 0 && (
        <section className="sp-card" id="pricing">
          <h2>Simple pricing</h2>
          <p className="scp-sub">Pay per {info.period}, based on how many students you have. Start with a {info.trialDays}-day free trial, no payment needed.</p>
          <div className="scp-tiers">
            {info.tiers.map((t) => (
              <div key={t.min} className="scp-tier">
                <span className="scp-tier-name">{t.label}</span>
                <span className="scp-tier-price">{ng(t.price)}<small> / {info.period}</small></span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="sp-card" id="demo">
        <h2>Request a demo</h2>
        <p className="scp-sub">Tell us about your school and we will contact you within 24 hours.</p>
        {state.ok ? <div className="scp-done">✅ {state.ok}</div> : (
          <form className="scp-form" onSubmit={submit}>
            <input aria-label="Your name" placeholder="Your name" value={f.name} onChange={set('name')} required maxLength={80} />
            <input aria-label="School name" placeholder="School name" value={f.school} onChange={set('school')} required maxLength={120} />
            <input aria-label="Phone number" placeholder="Phone / WhatsApp" inputMode="tel" value={f.phone} onChange={set('phone')} maxLength={30} />
            <input aria-label="Email" placeholder="Email (optional)" type="email" value={f.email} onChange={set('email')} maxLength={120} />
            <input aria-label="Number of students" placeholder="About how many students?" inputMode="numeric" value={f.students} onChange={set('students')} maxLength={20} />
            <textarea aria-label="Message" placeholder="Anything we should know? (optional)" rows={3} value={f.message} onChange={set('message')} maxLength={600} />
            <input className="scp-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={set('website')} />
            {state.err && <div className="scp-err" role="alert">{state.err}</div>}
            <button className="scp-btn primary" disabled={state.busy}>{state.busy ? 'Sending…' : 'Send request'}</button>
          </form>
        )}
      </section>
    </SiteShell>
  );
}

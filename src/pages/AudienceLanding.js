import React, { useEffect, useState } from 'react';
import SiteShell from '../components/SiteShell';
import { NoticePhone, QuizPhone, ReportLaptop, UploadLaptop, EditorLaptop, Scene } from '../components/SiteMocks';
import { captureReferralFromURL } from '../utils/referral';
import { captureTrafficSource } from '../utils/trafficSource';
import useReveal from '../utils/useReveal';
import '../styles/reveal.css';
import '../styles/schoolpage.css';

// One page template for /school (schools, by term) and /centre (tutorial and JAMB centres, by month).
const ng = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');
const FALLBACK = { trialDays: 14, period: 'term', tiers: [], centre: null };

const COPY = {
  school: {
    title: 'Your whole school, practising for exams, on one dashboard',
    intro: 'Notices, tests and quizzes your students take on their phones, and clear results for every class. Try it free.',
    docTitle: 'EliteScholars for Schools: tests, notices and progress reports',
    portal: '/school-portal?src=school-page',
    unit: 'student', group: 'class', groups: 'classes', who: 'school',
    features: [
      ['📣', 'Notices with your logo', 'Timetable changes, fees, exam dates. Students see them on their status bar and get a notification.'],
      ['📝', 'Tests, quizzes and mock exams', 'Use the 50,000+ EliteScholars questions, or set your own. Timed, graded and ranked automatically.'],
      ['📊', 'Reports you can print or share', 'Per-student and per-class results with your logo on top. Share a summary on WhatsApp in one tap.'],
      ['📄', 'Add a class from Excel', 'Upload an Excel or CSV list. Every student gets a login to print and hand out.'],
      ['🔑', 'Join with a class code', 'Or share a short code and students join from their own phones.'],
      ['📱', 'Works on any phone', 'Light on data. No computer lab needed.'],
    ],
    steps: [['1', 'Start your free trial', 'Create your school, add your logo and your teachers.'], ['2', 'Add your students', 'Upload an Excel list or share a class code.'], ['3', 'Set work and post notices', 'Tests, quizzes, mock exams and announcements.'], ['4', 'Watch results come in', 'Charts, rankings and reports for every class.']],
    cross: ['Run a tutorial or JAMB centre instead?', 'See the centre plans', '/centre'],
  },
  centre: {
    title: 'Keep your students. Give them practice that gets results.',
    intro: 'EliteScholars is the homework and mock-exam layer for tutorial and JAMB centres. Your students stay yours; you get the proof it works.',
    docTitle: 'EliteScholars for Tutorial & JAMB Centres: mock exams, practice and reports',
    portal: '/school-portal?kind=centre&src=centre-page',
    unit: 'student', group: 'batch', groups: 'batches', who: 'centre',
    features: [
      ['🤝', 'Your students stay yours', 'We never contact your students or recruit them. They sit under your batch and only you see their scores.'],
      ['📝', 'Practice between lessons', 'Set JAMB, WAEC and NECO topic quizzes after every class so lessons turn into scores.'],
      ['🏆', 'Mock exam nights', 'One timed CBT for the whole centre, then a ranked list you can share on WhatsApp.'],
      ['📊', 'Show parents real progress', 'Branded reports and a one-tap WhatsApp summary that make your centre look serious.'],
      ['🗓️', 'Built for batches, not terms', 'A batch per exam or timetable. Pay monthly, or take a full year.'],
      ['💰', 'Earn from the app', 'Join the partner programme and earn when students you refer upgrade to Pro.'],
    ],
    steps: [['1', 'Start your free trial', 'Create your centre and add your logo.'], ['2', 'Create a batch', 'For example "JAMB 2027 Evening". Add students from Excel.'], ['3', 'Run a mock night', 'Pick the subject, set the time. Students get notified.'], ['4', 'Share the results', 'Rankings and reports, by WhatsApp or print.']],
    cross: ['Run a school that works by terms?', 'See the school plans', '/school'],
  },
};

export default function AudienceLanding({ kind = 'school' }) {
  const c = COPY[kind];
  const [info, setInfo] = useState(FALLBACK);
  const [f, setF] = useState({ name: '', school: '', phone: '', email: '', students: '', message: '', website: '' });
  const [state, setState] = useState({ busy: false, ok: '', err: '' });
  useReveal('.mk-sceneRow, .sp-card, .scp-feat, .scp-steps li, .scp-tier, .scp-cta-row', info);
  useEffect(() => {
    document.title = c.docTitle;
    captureReferralFromURL(); captureTrafficSource(); // a partner's link (?ref=CODE) is remembered for 60 days
    let off = false;
    fetch('/api/site/school-info').then((r) => r.json()).then((j) => { if (!off && j && j.success) setInfo(j); }).catch(() => {});
    return () => { off = true; };
  }, [c.docTitle]);
  const start = () => { window.location.href = c.portal; };
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    if (state.busy) return;
    setState({ busy: true, ok: '', err: '' });
    try {
      const r = await fetch('/api/site/school-demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, message: `[${kind}] ${f.message}` }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.success !== false) setState({ busy: false, ok: j.message || 'Thanks! We will get back to you soon.', err: '' });
      else setState({ busy: false, ok: '', err: j.error || 'Something went wrong. Please try again.' });
    } catch { setState({ busy: false, ok: '', err: 'Network error. Check your connection and try again.' }); }
  };
  const tiers = kind === 'centre' ? (info.centre ? info.centre.tiers : []) : info.tiers;
  const per = kind === 'centre' ? 'month' : info.period;
  const trial = kind === 'centre' && info.centre ? info.centre.trialDays : info.trialDays;
  const sName = kind === 'centre' ? 'Bright Future Centre' : 'Greenfield College';
  const ini = kind === 'centre' ? 'BF' : 'GC';

  return (
    <SiteShell wide eyebrow={kind === 'centre' ? 'For tutorial & JAMB centres' : 'For schools'} title={c.title} intro={c.intro}>
      <div className="scp-cta-row">
        <button className="scp-btn primary" onClick={start}>Start free trial</button>
        <button className="scp-btn" onClick={() => { const el = document.getElementById('pricing'); if (el) el.scrollIntoView({ behavior: 'smooth' }); else start(); }}>See pricing</button>
      </div>

      <div className="mk-hero"><ReportLaptop school={sName} /><NoticePhone school={sName} initials={ini} /></div>

      <Scene eyebrow="Notices" title={`Reach every ${c.unit} in seconds`}
        text={`Post a notice with your logo to the whole ${c.who} or to one ${c.group}. It shows on their status bar with a blue tick and arrives as a notification.`}
        bullets={['Timetable changes, fees, exam dates', `Whole ${c.who} or a single ${c.group}`, 'Stays 24 hours, 3 days or 7 days']}>
        <NoticePhone school={sName} initials={ini} />
      </Scene>

      <Scene flip eyebrow="Tests, quizzes & mock exams" title="Students take them right in the app"
        text="Pick a subject and we use the EliteScholars question bank (selected by default). Timed, marked automatically and ranked, with a score your teacher sees at once."
        bullets={['JAMB, WAEC, NECO and GST questions', 'Mock exams for practice, tests and quick quizzes', 'First attempt counts, so results are fair']}>
        <QuizPhone title={kind === 'centre' ? 'JAMB Mock 3 · Biology' : 'Biology Test · SS3'} />
      </Scene>

      <Scene eyebrow="Your own questions" title="Or set your own test in minutes"
        text="Switch to My own questions and type them, paste many at once, or upload an Excel sheet. Add a time limit and an explanation for each answer."
        bullets={['Type, paste or upload from Excel', 'Optional timer and explanations', 'Graded on our server, never on the phone']}>
        <EditorLaptop school={sName} />
      </Scene>

      <Scene flip eyebrow="Easy setup" title={`Add a whole ${c.group} from Excel`}
        text="Upload your class list (Excel or CSV). Every student gets a username and password to print and hand out. No emails needed."
        bullets={['Hundreds of students in one upload', 'Printable login slips', 'Students already on EliteScholars can be added by username']}>
        <UploadLaptop school={sName} />
      </Scene>

      <Scene eyebrow="Results" title="Charts and reports parents understand"
        text="See averages, trends, participation and who needs help. Print a report with your logo on top, or share a summary on WhatsApp in one tap."
        bullets={['Per-student and per-class reports', 'Download CSV or print', 'One-tap WhatsApp summaries']}>
        <ReportLaptop school={sName} />
      </Scene>

      <section className="sp-card">
        <h2>{kind === 'centre' ? 'Why centres use it' : 'What your school gets'}</h2>
        <div className="scp-grid">{c.features.map(([ic, t, d]) => (<div key={t} className="scp-feat"><span aria-hidden="true">{ic}</span><h3>{t}</h3><p>{d}</p></div>))}</div>
      </section>

      {kind === 'centre' && (
        <section className="sp-card">
          <h2>Worried we will take your students?</h2>
          <p>No. Your students log in under your batch. We never message them about other centres, and we never offer them private lessons. Your teachers teach. EliteScholars gives students practice between lessons and gives you proof of results.</p>
          <p>If a student upgrades to Pro through your partner link, you earn a commission. The better your students do, the better your centre looks.</p>
        </section>
      )}

      <section className="sp-card">
        <h2>How it works</h2>
        <ol className="scp-steps">{c.steps.map(([n, t, d]) => (<li key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></li>))}</ol>
      </section>

      {tiers.length > 0 && (
        <section className="sp-card" id="pricing">
          <h2>Simple pricing</h2>
          <p className="scp-sub">Pay per {per}, based on how many students you have. Start with a {trial}-day free trial, no payment needed. Take the full year in one go if you prefer.</p>
          <div className="scp-tiers">
            {tiers.map((t) => (
              <div key={t.min} className="scp-tier"><span className="scp-tier-name">{t.label}</span>
                <span className="scp-tier-price">{ng(t.price)}<small> / {per}</small>{t.yearPrice > 0 && <small className="scp-year"> · {ng(t.yearPrice)} full year</small>}</span></div>
            ))}
          </div>
          <div className="scp-cta-row" style={{ marginTop: 14 }}><button className="scp-btn primary" onClick={start}>Start free trial</button><button className="scp-btn" onClick={start}>Subscribe</button></div>
        </section>
      )}

      <section className="sp-card">
        <h2>{c.cross[0]}</h2>
        <div className="scp-cta-row"><a className="scp-btn" href={c.cross[2]}>{c.cross[1]}</a></div>
      </section>

      <section className="sp-card" id="contact">
        <h2>Questions? Talk to us</h2>
        <p className="scp-sub">Tell us about your {c.who} and we will get back to you within 24 hours.</p>
        {state.ok ? <div className="scp-done">✅ {state.ok}</div> : (
          <form className="scp-form" onSubmit={submit}>
            <input aria-label="Your name" placeholder="Your name" value={f.name} onChange={set('name')} required maxLength={80} />
            <input aria-label="Name" placeholder={kind === 'centre' ? 'Centre name' : 'School name'} value={f.school} onChange={set('school')} required maxLength={120} />
            <input aria-label="Phone number" placeholder="Phone / WhatsApp" inputMode="tel" value={f.phone} onChange={set('phone')} maxLength={30} />
            <input aria-label="Email" placeholder="Email (optional)" type="email" value={f.email} onChange={set('email')} maxLength={120} />
            <input aria-label="Number of students" placeholder="About how many students?" inputMode="numeric" value={f.students} onChange={set('students')} maxLength={20} />
            <textarea aria-label="Message" placeholder="Anything we should know? (optional)" rows={3} value={f.message} onChange={set('message')} maxLength={600} />
            <input className="scp-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={set('website')} />
            {state.err && <div className="scp-err" role="alert">{state.err}</div>}
            <button className="scp-btn primary" disabled={state.busy}>{state.busy ? 'Sending…' : 'Send message'}</button>
          </form>
        )}
      </section>
    </SiteShell>
  );
}

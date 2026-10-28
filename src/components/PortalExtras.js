import React, { useEffect, useState, useCallback } from 'react';
import { SUBJ } from '../data/subjects';
import { readSheetRows } from '../utils/readSheet';

// Extra school-portal pieces: logo, notices to students, mock exam nights, WhatsApp-ready reports.
async function api(op, body) {
  try {
    const r = await fetch(`/api/portal/${op}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    return { status: r.status, ...(await r.json().catch(() => ({}))) };
  } catch { return { success: false, error: 'No connection. Check your data and try again.' }; }
}
const Msg = ({ m }) => (m ? <div className={m.ok ? 'spt-ok' : 'spt-err'}>{m.text}</div> : null);
const Empty = ({ children }) => <div className="spt-empty">{children}</div>;
const dt = (s) => new Date(s).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

export const waLink = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`;
export const waStudentText = (school, d) => {
  const s = d.student;
  const weak = (d.weak || []).slice(0, 2).map((x) => `${String(x.subject).replace(/[-_]/g, ' ')} (${x.avg}%)`).join(', ');
  return [`📊 *${s.name}* · ${school}`, `Average score: *${d.avg}%* over ${d.quizzes} practice quiz${d.quizzes === 1 ? '' : 'zes'} (last 90 days)`, s.streak ? `🔥 ${s.streak}-day study streak` : '', weak ? `Needs more work on: ${weak}` : 'Doing well across subjects 👏', '', 'Practice powered by EliteScholars'].filter((x) => x !== '').join('\n');
};
export const waClassText = (school, days, d) => {
  const s = d.summary;
  const top = (d.top || []).slice(0, 3).map((t, i) => `${['🥇', '🥈', '🥉'][i]} ${t.name} ${t.avg}%`).join('\n');
  const help = (d.needsHelp || []).slice(0, 5).map((t) => t.name).join(', ');
  return [`📊 *${school}: last ${days} days*`, `Average score: *${s.avg}%* · ${s.quizzes} quizzes · ${s.active} of ${s.students} students practised`, top ? `\n*Top students*\n${top}` : '', help ? `\n⚠️ Please encourage: ${help}` : '', '\nPowered by EliteScholars'].filter((x) => x !== '').join('\n');
};

/* ── print header with the school's logo (hidden on screen) ───────────────── */
export function PrintBrand({ school, logo }) {
  return (
    <div className="spt-printbrand">
      {logo && <img src={logo} alt="" />}
      <div><b>{school}</b><small>Student progress report · powered by EliteScholars</small></div>
    </div>
  );
}

/* ── logo ─────────────────────────────────────────────────────────────────── */
function shrinkLogo(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file); const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const k = Math.min(1, 256 / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      let out = c.toDataURL('image/png');
      if (out.length > 150000) out = c.toDataURL('image/jpeg', 0.82);
      out.length > 155000 ? reject(new Error('That logo is too detailed. Try a simpler image.')) : resolve(out);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that picture.')); };
    img.src = url;
  });
}
export function LogoCard({ sid, data, reload }) {
  const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false);
  const logo = data.school.logo;
  const pick = async (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = ''; if (!f) return;
    setBusy(true); setMsg(null);
    try { const image = await shrinkLogo(f); const r = await api('school-logo', { school_id: sid, image }); if (!r.success) setMsg({ text: r.error }); else { setMsg({ ok: true, text: 'Logo saved.' }); reload(); } }
    catch (er) { setMsg({ text: er.message }); }
    setBusy(false);
  };
  const clear = async () => { setBusy(true); await api('school-logo', { school_id: sid, image: '' }); setBusy(false); reload(); };
  return (
    <div className="spt-card spt-noprint">
      <h3>Your logo</h3>
      <div className="spt-row" style={{ alignItems: 'center' }}>
        {logo ? <img className="spt-logo" src={logo} alt="" /> : <div className="spt-logo ph">{(data.school.name || '?')[0]}</div>}
        <div className="spt-stack" style={{ gap: 6 }}>
          <label className="spt-btn spt-file">{busy ? 'Saving…' : logo ? 'Change logo' : 'Upload logo'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={pick} disabled={busy} /></label>
          {logo && <button className="spt-ghost" onClick={clear} disabled={busy}>Remove</button>}
        </div>
      </div>
      <p className="spt-note">Shown on notices your students see, and printed at the top of every report.</p>
      <Msg m={msg} />
    </div>
  );
}

/* ── notices to students ──────────────────────────────────────────────────── */
export function Notices({ sid, data, isAdmin, isCentre }) {
  const [text, setText] = useState(''); const [cls, setCls] = useState(isAdmin ? '' : (data.classes[0] ? data.classes[0].id : ''));
  const [hours, setHours] = useState(24); const [bg, setBg] = useState('violet');
  const [list, setList] = useState(null); const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false);
  const load = useCallback(async () => { const r = await api('announce-list', { school_id: sid }); setList(r.notices || []); }, [sid]);
  useEffect(() => { load(); }, [load]);
  const post = async () => {
    setBusy(true); setMsg(null);
    const r = await api('announce', { school_id: sid, text, class_id: cls || undefined, hours, bg });
    setBusy(false);
    if (!r.success) return setMsg({ text: r.error });
    setText(''); setMsg({ ok: true, text: `Posted. ${r.audience} student${r.audience === 1 ? '' : 's'} will see it on their status bar${r.audience ? ' and get a notification' : ''}.` }); load();
  };
  const del = async (id) => { if (!window.confirm('Remove this notice?')) return; await api('announce-delete', { school_id: sid, id }); load(); };
  const BG = { violet: '#7C3AED', gold: '#F59E0B', teal: '#0D9488', rose: '#E11D48', blue: '#2563EB', dark: '#1F2937' };
  return (
    <div className="spt-stack">
      <div className="spt-card">
        <h3>Post a notice</h3>
        <p className="spt-note">Appears at the top of your students' status bar with your logo, and they get a notification. Good for timetable changes, fees, exam dates and reminders.</p>
        <textarea rows={4} maxLength={600} placeholder="e.g. JAMB mock holds this Saturday 9am. Bring your calculator and student ID." value={text} onChange={(e) => setText(e.target.value)} style={{ background: BG[bg], color: '#fff' }} />
        <div className="spt-row">{Object.keys(BG).map((k) => <button key={k} aria-label={k} className={`spt-dot ${bg === k ? 'on' : ''}`} style={{ background: BG[k] }} onClick={() => setBg(k)} />)}<small>{text.length}/600</small></div>
        <div className="spt-row">
          <select value={cls} onChange={(e) => setCls(e.target.value)}>{isAdmin && <option value="">{isCentre ? 'All students in the centre' : 'The whole school'}</option>}{data.classes.map((c) => <option key={c.id} value={c.id}>{isCentre ? 'Batch: ' : 'Class: '}{c.name}</option>)}</select>
          <select value={hours} onChange={(e) => setHours(Number(e.target.value))}><option value={24}>Stays 24 hours</option><option value={72}>Stays 3 days</option><option value={168}>Stays 7 days</option></select>
        </div>
        <button className="spt-btn" disabled={busy || text.trim().length < 3} onClick={post}>{busy ? 'Posting…' : 'Post notice'}</button>
        <Msg m={msg} />
      </div>
      <div className="spt-card"><h3>Your notices</h3>
        {!list ? <Empty>Loading…</Empty> : list.length ? list.map((n) => (
          <div className="spt-item" key={n.id}><span style={{ whiteSpace: 'pre-wrap' }}>{n.text}<small>{n.class} · {dt(n.at)} · {n.live ? 'live' : 'expired'}</small></span><button className="spt-link" onClick={() => del(n.id)}>Remove</button></div>
        )) : <Empty>No notices yet.</Empty>}
      </div>
    </div>
  );
}

/* ── mock exams, tests and quizzes ────────────────────────────────────────── */
const SUBJECT_IDS = Object.keys(SUBJ);
const KINDS = { mock: 'Mock exam', test: 'Test', quiz: 'Quiz' };
const blankQ = () => ({ q: '', o: ['', '', '', ''], a: 0, e: '' });

// Paste format:  Question?  A) one  B) two  C) three  D) four  Answer: B  (blank line between questions)
function parsePasted(text) {
  const out = [];
  for (const block of String(text || '').split(/\n\s*\n/)) {
    const lines = block.split('\n').map((x) => x.trim()).filter(Boolean);
    if (lines.length < 3) continue;
    const q = lines[0].replace(/^\d+[.)]\s*/, '');
    const o = []; let a = -1; let e = '';
    for (const ln of lines.slice(1)) {
      const m = /^([A-Ea-e])[.)]\s*(.+)$/.exec(ln); const ans = /^(answer|ans|correct)\s*[:\-]?\s*([A-Ea-e])/i.exec(ln); const ex = /^(explanation|reason)\s*[:\-]\s*(.+)$/i.exec(ln);
      if (ans) a = ans[2].toUpperCase().charCodeAt(0) - 65; else if (ex) e = ex[2]; else if (m) o[m[1].toUpperCase().charCodeAt(0) - 65] = m[2];
    }
    const opts = o.filter((x) => x !== undefined);
    if (q && opts.length >= 2 && a >= 0 && a < opts.length) out.push({ q, o: opts, a, e });
  }
  return out;
}
// Spreadsheet columns: Question | A | B | C | D | Answer (A-D) | Explanation (optional)
function fromRows(rows) {
  const out = [];
  rows.forEach((r, i) => {
    if (i === 0 && /question/i.test(String(r[0] || ''))) return;
    const q = String(r[0] || '').trim(); const o = [r[1], r[2], r[3], r[4]].map((x) => String(x || '').trim()).filter(Boolean);
    const ans = String(r[5] || '').trim().toUpperCase(); const a = /^[A-E]$/.test(ans) ? ans.charCodeAt(0) - 65 : Number(ans) - 1;
    if (q && o.length >= 2 && Number.isInteger(a) && a >= 0 && a < o.length) out.push({ q, o, a, e: String(r[6] || '').trim() });
  });
  return out;
}

function QuestionEditor({ qs, setQs }) {
  const [paste, setPaste] = useState(''); const [note, setNote] = useState(null);
  const upd = (i, fn) => setQs(qs.map((x, j) => (j === i ? fn(x) : x)));
  const importPasted = () => { const got = parsePasted(paste); if (!got.length) return setNote({ text: 'No questions found. Check the format below.' }); setQs([...qs.filter((x) => x.q.trim()), ...got]); setPaste(''); setNote({ ok: true, text: `${got.length} question${got.length === 1 ? '' : 's'} added.` }); };
  const importFile = async (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = ''; if (!f) return;
    try { const got = fromRows(await readSheetRows(f)); if (!got.length) return setNote({ text: 'No questions found. Columns: Question, A, B, C, D, Answer (A-D), Explanation.' }); setQs([...qs.filter((x) => x.q.trim()), ...got]); setNote({ ok: true, text: `${got.length} question${got.length === 1 ? '' : 's'} added from ${f.name}.` }); }
    catch (er) { setNote({ text: er.message }); }
  };
  return (
    <div className="spt-stack">
      {qs.map((x, i) => (
        <div className="spt-qcard" key={i}>
          <div className="spt-between"><b>Question {i + 1}</b><button className="spt-link" onClick={() => setQs(qs.filter((_, j) => j !== i))}>Remove</button></div>
          <textarea rows={2} placeholder="Type the question" value={x.q} maxLength={400} onChange={(e) => upd(i, (o) => ({ ...o, q: e.target.value }))} />
          {x.o.map((t, k) => (
            <label className="spt-opt" key={k}><input type="radio" name={`a${i}`} checked={x.a === k} onChange={() => upd(i, (o) => ({ ...o, a: k }))} aria-label={`Option ${'ABCDE'[k]} is correct`} /><span>{'ABCDE'[k]}</span>
              <input placeholder={`Option ${'ABCDE'[k]}`} value={t} maxLength={160} onChange={(e) => upd(i, (o) => ({ ...o, o: o.o.map((y, z) => (z === k ? e.target.value : y)) }))} /></label>
          ))}
          <input placeholder="Why this is right (optional, shown after the test)" value={x.e} maxLength={300} onChange={(e) => upd(i, (o) => ({ ...o, e: e.target.value }))} />
        </div>
      ))}
      <div className="spt-row"><button className="spt-ghost" onClick={() => setQs([...qs, blankQ()])}>＋ Add a question</button><label className="spt-ghost spt-file">📄 Upload Excel or CSV<input type="file" accept=".xlsx,.xlsm,.csv,.tsv,.txt" onChange={importFile} /></label></div>
      <details className="spt-details"><summary>Or paste many questions at once</summary>
        <textarea rows={6} placeholder={'What is 2 + 2?\nA) 3\nB) 4\nC) 5\nAnswer: B\n\nCapital of Nigeria?\nA) Lagos\nB) Abuja\nAnswer: B'} value={paste} onChange={(e) => setPaste(e.target.value)} />
        <button className="spt-ghost" disabled={!paste.trim()} onClick={importPasted}>Add pasted questions</button>
        <p className="spt-note">One question per block, a blank line between blocks. Spreadsheet columns: Question, A, B, C, D, Answer (A to D), Explanation.</p>
      </details>
      <Msg m={note} />
    </div>
  );
}

export function Mocks({ sid, data, isAdmin, isCentre }) {
  const [list, setList] = useState(null); const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false); const [open, setOpen] = useState('');
  const [f, setF] = useState({ title: '', kind: 'mock', source: 'builtin', subject: 'english', exam_type: 'jamb', starts_at: '', window_hours: 3, duration_min: 30, class_id: isAdmin ? '' : (data.classes[0] ? data.classes[0].id : '') });
  const [qs, setQs] = useState([blankQ()]);
  const load = useCallback(async () => { const r = await api('mock-list', { school_id: sid }); setList(r.mocks || []); }, [sid]);
  useEffect(() => { load(); }, [load]);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const custom = f.source === 'custom';
  const save = async () => {
    setBusy(true); setMsg(null);
    const questions = custom ? qs.filter((x) => x.q.trim()).map((x) => ({ ...x, o: x.o.map((t) => t.trim()).filter(Boolean) })) : undefined;
    const r = await api('mock-save', { school_id: sid, ...f, questions, starts_at: f.starts_at ? new Date(f.starts_at).toISOString() : '', class_id: f.class_id || undefined });
    setBusy(false);
    if (!r.success) return setMsg({ text: r.error });
    setMsg({ ok: true, text: `${KINDS[f.kind]} scheduled. ${r.notified} student${r.notified === 1 ? '' : 's'} were told on their status bar.` }); setF({ ...f, title: '' }); if (custom) setQs([blankQ()]); load();
  };
  const del = async (id) => { if (!window.confirm('Delete this and its results?')) return; await api('mock-delete', { school_id: sid, id }); load(); };
  const shareText = (m) => [`📝 *${m.title}* results`, `${m.took} of ${m.audience} students took it · average *${m.avg}%*`, '', ...m.top.slice(0, 10).map((t) => `${t.rank}. ${t.name} ${t.score}%`), '', 'Powered by EliteScholars'].join('\n');
  const pill = { upcoming: 'trial', live: 'active', closed: 'expired' };
  return (
    <div className="spt-stack">
      <div className="spt-card">
        <h3>Set a mock exam, test or quiz</h3>
        <p className="spt-note">Students take it inside the app, in a window you choose. You get a ranked result list you can share. Each student's first attempt counts.</p>
        <div className="spt-periods three">{Object.entries(KINDS).map(([k, l]) => <button key={k} className={f.kind === k ? 'on' : ''} onClick={() => setF({ ...f, kind: k })}>{l}</button>)}</div>
        <input placeholder={f.kind === 'quiz' ? 'Title, e.g. Chemistry quiz: acids' : 'Title, e.g. JAMB Mock 3'} value={f.title} onChange={set('title')} maxLength={80} />
        <div className="spt-periods two">
          <button className={!custom ? 'on' : ''} onClick={() => setF({ ...f, source: 'builtin' })}>EliteScholars questions<small>Recommended: thousands of ready questions</small></button>
          <button className={custom ? 'on' : ''} onClick={() => setF({ ...f, source: 'custom' })}>My own questions<small>Type, paste or upload yours</small></button>
        </div>
        {!custom && (
          <div className="spt-row">
            <select value={f.subject} onChange={set('subject')}>{SUBJECT_IDS.map((k) => <option key={k} value={k}>{SUBJ[k].label}</option>)}</select>
            <select value={f.exam_type} onChange={set('exam_type')}><option value="jamb">JAMB</option><option value="waec">WAEC</option><option value="neco">NECO</option><option value="gst">GST</option></select>
          </div>
        )}
        {custom && <><QuestionEditor qs={qs} setQs={setQs} /><label className="spt-lbl">Time allowed (minutes, 0 for no timer)<input inputMode="numeric" value={f.duration_min} onChange={(e) => setF({ ...f, duration_min: e.target.value.replace(/\D/g, '') })} /></label></>}
        <label className="spt-lbl">Opens at<input type="datetime-local" value={f.starts_at} onChange={set('starts_at')} /></label>
        <div className="spt-row">
          <select value={f.window_hours} onChange={set('window_hours')}>{[1, 2, 3, 6, 12, 24, 48].map((h) => <option key={h} value={h}>Open for {h} hour{h === 1 ? '' : 's'}</option>)}</select>
          <select value={f.class_id} onChange={set('class_id')}>{isAdmin && <option value="">{isCentre ? 'All students' : 'Whole school'}</option>}{data.classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </div>
        <button className="spt-btn" disabled={busy || f.title.trim().length < 3 || !f.starts_at} onClick={save}>{busy ? 'Saving…' : 'Schedule and notify students'}</button>
        <Msg m={msg} />
      </div>
      {!list ? <Empty>Loading…</Empty> : list.length ? list.map((m) => (
        <div className="spt-card" key={m.id}>
          <div className="spt-between"><h3>{m.title}</h3><span className={`spt-pill ${pill[m.state]}`}>{m.state}</span></div>
          <p>{KINDS[m.kind] || 'Mock exam'} · {m.source === 'custom' ? `${m.questions} own question${m.questions === 1 ? '' : 's'}${m.duration_min ? ` · ${m.duration_min} min` : ''}` : `${(SUBJ[m.subject] || { label: m.subject }).label} · ${m.exam_type.toUpperCase()}`} · {m.class} · {dt(m.starts_at)}</p>
          <div className="spt-stats"><div className="spt-stat"><b>{m.took}/{m.audience}</b><span>took it</span></div><div className="spt-stat"><b>{m.took ? m.avg + '%' : '-'}</b><span>average</span></div></div>
          {m.top.length > 0 && (
            <>
              <button className="spt-link" onClick={() => setOpen(open === m.id ? '' : m.id)}>{open === m.id ? 'Hide ranking' : 'Show ranking'}</button>
              {open === m.id && m.top.map((t) => <div className="spt-item" key={t.rank}><span>{t.rank}. {t.name}</span><b>{t.score}%<small> {t.correct}/{t.total}</small></b></div>)}
              <div className="spt-row spt-noprint"><a className="spt-ghost" href={waLink(shareText(m))} target="_blank" rel="noreferrer">Share results on WhatsApp</a></div>
            </>
          )}
          <button className="spt-link" onClick={() => del(m.id)}>Delete</button>
        </div>
      )) : <Empty>Nothing scheduled yet.</Empty>}
    </div>
  );
}

/* ── centres: earn when students go Pro ───────────────────────────────────── */
export function CentreEarn() {
  return (
    <div className="spt-card spt-noprint">
      <h3>💰 Earn from your students</h3>
      <p>Join the free partner programme and get a link. When a student who signs up through it upgrades to Pro, you earn a commission. Students you create here stay yours.</p>
      <a className="spt-btn" href="/partner">Get my partner link</a>
    </div>
  );
}

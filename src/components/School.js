import React, { useState, useEffect, useCallback } from 'react';
import '../styles/school.css';

const dt = (s) => (s ? new Date(s).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) : '');
const ago = (s) => {
  if (!s) return 'never';
  const d = Math.floor((Date.now() - new Date(s).getTime()) / 86400000);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : `${d}d ago`;
};
const SEEN_KEY = 'es_assign_seen_v1';
const loadSeen = () => { try { return JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'); } catch { return []; } };

async function api(op, body) {
  try {
    const r = await fetch(`/api/school/${op}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || j.success === false) return { ok: false, error: (j && j.error) || 'Something went wrong. Try again.' };
    return { ok: true, ...j };
  } catch { return { ok: false, error: 'No connection. Try again.' }; }
}

// Shrinks a photo to a small JPEG so it can travel and store cheaply.
function shrink(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.width, h = img.height;
      const max = 1000;
      if (Math.max(w, h) > max) { const k = max / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
      let q = 0.78, out = c.toDataURL('image/jpeg', q);
      while (out.length > 250000 && q > 0.35) { q -= 0.1; out = c.toDataURL('image/jpeg', q); }
      if (out.length > 250000) reject(new Error('That picture is too large. Try a smaller one.')); else resolve(out);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that picture.')); };
    img.src = url;
  });
}

function PlanBanner({ plan }) {
  const ng = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');
  const exp = plan.status === 'expired';
  const msg = exp
    ? 'Your free trial has ended. Contact EliteScholars to activate your school plan; your existing classes stay visible.'
    : plan.status === 'trial'
      ? `Free trial: ${plan.daysLeft} day${plan.daysLeft === 1 ? '' : 's'} left`
      : `School plan active: ${plan.daysLeft} day${plan.daysLeft === 1 ? '' : 's'} left`;
  return (
    <div style={{ margin: '0 0 12px', padding: '12px 14px', borderRadius: 14, fontSize: 13.5, lineHeight: 1.5, background: exp ? 'rgba(248,113,113,.12)' : 'rgba(139,92,246,.12)', border: `1px solid ${exp ? 'rgba(248,113,113,.4)' : 'rgba(139,92,246,.35)'}` }}>
      <b>{msg}</b>
      {plan.tier && <div style={{ opacity: .75, marginTop: 2 }}>{plan.students} student{plan.students === 1 ? '' : 's'} · {plan.tier.label}: {ng(plan.tier.price)} per {plan.period || 'term'}</div>}
    </div>
  );
}

export default function School({ onBack }) {
  const [tab, setTab] = useState('student'); // student | teacher
  const [classes, setClasses] = useState({ teaching: [], joined: [] });
  const [loaded, setLoaded] = useState(false);
  const [plan, setPlan] = useState(null);

  const load = useCallback(async () => {
    const r = await api('classes');
    if (r.ok) setClasses({ teaching: r.teaching || [], joined: r.joined || [] });
    setPlan(r.plan || null);
    setLoaded(true);
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <div className="scr fd sch">
      <div className="sch-head">
        <button className="sch-back" onClick={onBack} aria-label="Back">←</button>
        <div><h2>School &amp; Classes</h2><p>Homework from your teacher, or run your own classes</p></div>
      </div>
      <div className="sch-tabs">
        <button className={tab === 'student' ? 'on' : ''} onClick={() => setTab('student')}>I'm a student</button>
        <button className={tab === 'teacher' ? 'on' : ''} onClick={() => setTab('teacher')}>I'm a teacher</button>
      </div>
      <div className="sch-body">
        {tab === 'teacher' && plan && <PlanBanner plan={plan} />}
        {!loaded && <div className="sch-empty">Loading…</div>}
        {loaded && tab === 'student' && <StudentView classes={classes} reload={load} />}
        {loaded && tab === 'teacher' && <TeacherView classes={classes} reload={load} />}
      </div>
    </div>
  );
}

/* ── Student ─────────────────────────────────────────────────────────────── */
function StudentView({ classes, reload }) {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(null);

  const loadList = useCallback(async () => {
    const r = await api('assign-list');
    if (r.ok) setList(r.assignments || []);
  }, []);
  useEffect(() => { loadList(); }, [loadList, classes.joined.length]);

  useEffect(() => {
    if (list.length) { try { localStorage.setItem(SEEN_KEY, JSON.stringify(list.map((a) => a.id))); } catch { /* ignore */ } }
  }, [list]);

  const join = async () => {
    setErr(''); setMsg('');
    const r = await api('class-join', { code });
    if (!r.ok) { setErr(r.error); return; }
    setMsg(`Joined ${r.class.name}.`); setCode(''); reload();
  };
  const leave = async (id) => { if (window.confirm('Leave this class?')) { await api('class-leave', { class_id: id }); reload(); } };
  const seen = loadSeen();

  if (open) return <AssignmentView id={open} onClose={() => { setOpen(null); loadList(); }} />;

  return (
    <>
      <div className="sch-card">
        <h3>Join a class</h3>
        <div className="sch-row">
          <input className="sch-in allow-copy" placeholder="6-letter class code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
          <button className="sch-btn" disabled={code.length !== 6} onClick={join}>Join</button>
        </div>
        {err && <div className="sch-err">{err}</div>}
        {msg && <div className="sch-ok">{msg}</div>}
        {classes.joined.map((c) => (
          <div className="sch-line" key={c.id}><div><b>{c.name}</b><small>{c.school ? `${c.school} · ` : ''}Teacher {c.teacher}</small></div><button className="sch-link" onClick={() => leave(c.id)}>Leave</button></div>
        ))}
      </div>

      <h3 className="sch-h">Assignments</h3>
      {list.length === 0 && <div className="sch-empty">{classes.joined.length ? 'No assignments yet. You will get a notification when your teacher posts one.' : 'Join a class with the code your teacher gave you.'}</div>}
      {list.map((a) => (
        <button className={`sch-asg ${a.done ? 'done' : ''}`} key={a.id} onClick={() => setOpen(a.id)}>
          <div className="sch-asg-top"><b>{a.title}</b>{!seen.includes(a.id) && !a.done && <i className="sch-new">NEW</i>}{a.done && <i className="sch-tick">✓ Done</i>}</div>
          <small>{a.class_name}{a.due_at ? ` · due ${dt(a.due_at)}` : ''}{a.images ? ` · 📷 ${a.images}` : ''}</small>
          {a.preview && <p>{a.preview}</p>}
        </button>
      ))}
    </>
  );
}

function AssignmentView({ id, onClose, teacher }) {
  const [a, setA] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => { api('assign-get', { id }).then((r) => (r.ok ? setA(r.assignment) : setErr(r.error))); }, [id]);
  const toggle = async () => { const v = !a.done; setA({ ...a, done: v }); await api('assign-done', { id, done: v }); };
  return (
    <div className="sch-card">
      <button className="sch-link" onClick={onClose}>← Back</button>
      {err && <div className="sch-err">{err}</div>}
      {a && (
        <>
          <h3>{a.title}</h3>
          <small className="sch-meta">Posted {dt(a.created_at)}{a.due_at ? ` · due ${dt(a.due_at)}` : ''}</small>
          {a.body && <p className="sch-text allow-copy">{a.body}</p>}
          {a.images.map((src, i) => <img key={i} className="sch-img" src={src} alt={`Attachment ${i + 1}`} />)}
          {!teacher && <button className={`sch-btn wide ${a.done ? 'ghost' : ''}`} onClick={toggle}>{a.done ? '✓ Marked done (tap to undo)' : 'Mark as done'}</button>}
        </>
      )}
    </div>
  );
}

/* ── Teacher ─────────────────────────────────────────────────────────────── */
function TeacherView({ classes, reload }) {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(null);

  const create = async () => {
    setErr('');
    const r = await api('class-create', { name, school });
    if (!r.ok) { setErr(r.error); return; }
    setName(''); reload();
  };
  if (open) return <ClassView cls={open} onClose={() => { setOpen(null); reload(); }} />;

  return (
    <>
      <div className="sch-card">
        <h3>Create a class</h3>
        <input className="sch-in allow-copy" placeholder="Class name, e.g. SS3 Science" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} />
        <input className="sch-in allow-copy" placeholder="School name (optional)" value={school} maxLength={80} onChange={(e) => setSchool(e.target.value)} />
        {err && <div className="sch-err">{err}</div>}
        <button className="sch-btn wide" disabled={name.trim().length < 2} onClick={create}>Create class</button>
      </div>
      <h3 className="sch-h">Your classes</h3>
      {classes.teaching.length === 0 && <div className="sch-empty">No classes yet. Create one, then share its code with your students.</div>}
      {classes.teaching.map((c) => (
        <button className="sch-asg" key={c.id} onClick={() => setOpen(c)}>
          <div className="sch-asg-top"><b>{c.name}</b><i className="sch-code">{c.code}</i></div>
          <small>{c.school ? `${c.school} · ` : ''}{c.students} student{c.students === 1 ? '' : 's'}</small>
        </button>
      ))}
    </>
  );
}

function ClassView({ cls, onClose }) {
  const [sub, setSub] = useState('students'); // students | assignments | new
  const [data, setData] = useState(null);
  const [asg, setAsg] = useState([]);
  const [view, setView] = useState(null);
  const [copied, setCopied] = useState(false);

  const loadAll = useCallback(async () => {
    const [m, a] = await Promise.all([api('class-members', { class_id: cls.id }), api('assign-list', { class_id: cls.id })]);
    if (m.ok) setData(m);
    if (a.ok) setAsg(a.assignments || []);
  }, [cls.id]);
  useEffect(() => { loadAll(); }, [loadAll]);

  const share = () => {
    const text = `Join my class "${cls.name}" on EliteScholars. Open elitescholars.site/app, go to Profile → School & Classes and enter code ${cls.code}.`;
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };
  const remove = async (mid) => { if (window.confirm('Remove this student from the class?')) { await api('class-remove', { class_id: cls.id, mid }); loadAll(); } };
  const delClass = async () => { if (window.confirm('Delete this whole class and its assignments?')) { await api('class-delete', { class_id: cls.id }); onClose(); } };
  const delAsg = async (id) => { if (window.confirm('Delete this assignment?')) { await api('assign-delete', { id }); setView(null); loadAll(); } };

  if (view) return (
    <div>
      <AssignmentView id={view} teacher onClose={() => setView(null)} />
      <button className="sch-btn wide danger" onClick={() => delAsg(view)}>Delete assignment</button>
    </div>
  );

  return (
    <>
      <div className="sch-card">
        <button className="sch-link" onClick={onClose}>← All classes</button>
        <h3>{cls.name}</h3>
        <div className="sch-codebox"><span>Class code</span><b>{cls.code}</b><button className="sch-btn" onClick={share}>{copied ? 'Copied' : 'Share'}</button></div>
      </div>
      <div className="sch-tabs small">
        <button className={sub === 'students' ? 'on' : ''} onClick={() => setSub('students')}>Students{data ? ` (${data.students.length})` : ''}</button>
        <button className={sub === 'assignments' ? 'on' : ''} onClick={() => setSub('assignments')}>Assignments</button>
        <button className={sub === 'new' ? 'on' : ''} onClick={() => setSub('new')}>+ New</button>
      </div>

      {sub === 'students' && data && (
        <>
          <div className="sch-stats">
            <div><b>{data.students.length}</b><span>students</span></div>
            <div><b>{data.students.length ? Math.round(data.students.reduce((s, x) => s + x.avg, 0) / data.students.length) : 0}%</b><span>class average</span></div>
            <div><b>{data.students.filter((s) => s.last_active && Date.now() - new Date(s.last_active).getTime() < 7 * 86400000).length}</b><span>active this week</span></div>
          </div>
          {data.students.length === 0 && <div className="sch-empty">Nobody has joined yet. Share the code above.</div>}
          {data.students.slice().sort((a, b) => b.xp - a.xp).map((s) => (
            <div className="sch-stu" key={s.mid}>
              <div className="sch-stu-top"><b>{s.name}</b><span className={`sch-avg ${s.avg >= 70 ? 'good' : s.avg >= 50 ? 'mid' : 'low'}`}>{s.avg}%</span></div>
              <small>{s.username ? `@${s.username} · ` : ''}Lv {s.level} · {s.xp.toLocaleString()} XP · 🔥 {s.streak} · {s.quizzes} quizzes · last seen {ago(s.last_active)}</small>
              <small>Assignments done: {s.assignments_done}/{data.assignments}</small>
              {s.weakest.length > 0 && <small className="sch-weak">Needs work: {s.weakest.map((w) => `${w.subject.replace(/_/g, ' ')} ${w.avg}%`).join(', ')}</small>}
              <button className="sch-link" onClick={() => remove(s.mid)}>Remove</button>
            </div>
          ))}
          <button className="sch-link danger" onClick={delClass}>Delete this class</button>
        </>
      )}

      {sub === 'assignments' && (
        <>
          {asg.length === 0 && <div className="sch-empty">No assignments yet. Tap “+ New”.</div>}
          {asg.map((a) => (
            <button className="sch-asg" key={a.id} onClick={() => setView(a.id)}>
              <div className="sch-asg-top"><b>{a.title}</b><i className="sch-tick">{a.done_count}/{data ? data.students.length : '?'} done</i></div>
              <small>Posted {dt(a.created_at)}{a.due_at ? ` · due ${dt(a.due_at)}` : ''}{a.images ? ` · 📷 ${a.images}` : ''}</small>
            </button>
          ))}
        </>
      )}

      {sub === 'new' && <NewAssignment cls={cls} onDone={() => { setSub('assignments'); loadAll(); }} />}
    </>
  );
}

function NewAssignment({ cls, onDone }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [due, setDue] = useState('');
  const [images, setImages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const pick = async (e) => {
    setErr('');
    const files = [...(e.target.files || [])].slice(0, 3 - images.length);
    e.target.value = '';
    try {
      const out = [];
      for (const f of files) out.push(await shrink(f));
      setImages((x) => [...x, ...out].slice(0, 3));
    } catch (ex) { setErr(ex.message); }
  };

  const post = async () => {
    setBusy(true); setErr('');
    const r = await api('assign-create', { class_id: cls.id, title, body, images, due_at: due ? new Date(due + 'T23:59:00').toISOString() : null });
    setBusy(false);
    if (!r.ok) { setErr(r.error); return; }
    onDone();
  };

  return (
    <div className="sch-card">
      <h3>New assignment</h3>
      <input className="sch-in allow-copy" placeholder="Title, e.g. Quadratic equations practice" value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="sch-in allow-copy" rows={6} placeholder="Instructions or questions…" value={body} maxLength={4000} onChange={(e) => setBody(e.target.value)} />
      <div className="sch-imgs">
        {images.map((src, i) => <div key={i}><img src={src} alt="" /><button onClick={() => setImages((x) => x.filter((_, k) => k !== i))} aria-label="Remove">×</button></div>)}
        {images.length < 3 && <label className="sch-add">📷<span>Add picture</span><input type="file" accept="image/*" multiple onChange={pick} hidden /></label>}
      </div>
      <label className="sch-lab">Due date (optional)<input className="sch-in" type="date" value={due} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDue(e.target.value)} /></label>
      {err && <div className="sch-err">{err}</div>}
      <button className="sch-btn wide" disabled={busy || title.trim().length < 2 || (!body.trim() && !images.length)} onClick={post}>{busy ? 'Posting…' : 'Post to class & notify students'}</button>
    </div>
  );
}

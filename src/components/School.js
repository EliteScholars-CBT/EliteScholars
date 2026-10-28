import React, { useState, useEffect, useCallback } from 'react';
import TeacherTest from './TeacherTest';
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

export default function School({ onBack, onStartMock }) {
  const [classes, setClasses] = useState({ teaching: [], joined: [] });
  const [loaded, setLoaded] = useState(false);
  const [test, setTest] = useState(null);

  const load = useCallback(async () => {
    const r = await api('classes');
    if (r.ok) setClasses({ teaching: r.teaching || [], joined: r.joined || [] });
    setLoaded(true);
  }, []);
  useEffect(() => { load(); }, [load]);

  if (test) return <TeacherTest mock={test} onClose={() => { setTest(null); load(); }} />;

  return (
    <div className="scr fd sch">
      <div className="sch-head">
        <button className="sch-back" onClick={onBack} aria-label="Back">←</button>
        <div><h2>My Classes</h2><p>Homework from your teacher</p></div>
      </div>
      <div className="sch-body">
        {!loaded && <div className="sch-empty">Loading…</div>}
        {loaded && <MockExams onStart={onStartMock} onOpenTest={setTest} />}
        {loaded && <StudentView classes={classes} reload={load} />}
        {loaded && classes.teaching.length > 0 && (
          <div className="sch-empty">Teachers manage classes and homework at <a href="/school-portal">/school-portal</a>.</div>
        )}
      </div>
    </div>
  );
}

/* ── Mock exams from the school / centre ─────────────────────────────────── */
const when = (s) => new Date(s).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
function MockExams({ onStart, onOpenTest }) {
  const [list, setList] = useState([]);
  useEffect(() => { let on = true; api('mock-list').then((r) => { if (on && r.ok) setList(r.mocks || []); }); return () => { on = false; }; }, []);
  if (!list.length) return null;
  return (
    <div className="sch-mocks">
      <h3>📝 Tests &amp; mock exams</h3>
      {list.map((m) => (
        <div className="sch-mock" key={m.id}>
          <div><b>{m.title}</b><small>{m.source === 'custom' ? `${{ quiz: 'Quiz', test: 'Test', mock: 'Mock exam' }[m.kind] || 'Test'} · ${m.questions} questions${m.duration_min ? ` · ${m.duration_min} min` : ''}` : `${(m.subject || '').replace(/\b\w/g, (x) => x.toUpperCase())} · ${String(m.exam_type).toUpperCase()}`}</small>
            <small>{m.state === 'upcoming' ? `Starts ${when(m.starts_at)}` : m.state === 'live' ? `Open until ${when(m.ends_at)}` : 'Closed'}</small></div>
          {m.done ? <span className="sch-mock-done">{m.my_score}%<small>#{m.rank} of {m.took}</small></span>
            : m.state === 'live' ? <button className="sch-btn" onClick={() => (m.source === 'custom' ? onOpenTest && onOpenTest(m) : onStart && onStart(m))}>Start</button>
            : <span className="sch-mock-wait">{m.state === 'upcoming' ? 'Soon' : 'Missed'}</span>}
        </div>
      ))}
      <small className="sch-note">Your first attempt is your score. Your teacher sees the results and the class ranking.</small>
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

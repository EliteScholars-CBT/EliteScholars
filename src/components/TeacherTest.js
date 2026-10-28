import React, { useEffect, useRef, useState } from 'react';

// A test / quiz written by the student's teacher. Questions arrive without answers; the server grades it.
async function call(op, body) {
  try {
    const r = await fetch(`/api/school/${op}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || j.success === false) return { ok: false, error: (j && j.error) || 'Something went wrong. Try again.' };
    return { ok: true, ...j };
  } catch { return { ok: false, error: 'No connection. Check your data and try again.' }; }
}
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function TeacherTest({ mock, onClose }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState([]);
  const [left, setLeft] = useState(0);
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const sentRef = useRef(false);

  useEffect(() => { let on = true; call('mock-questions', { mock_id: mock.id }).then((r) => { if (!on) return; if (r.ok) { setD(r); setAns(new Array(r.questions.length).fill(null)); setLeft((r.duration_min || 0) * 60); } else setErr(r.error); }); return () => { on = false; }; }, [mock.id]);

  const submit = async (answers) => {
    if (sentRef.current) return; sentRef.current = true; setBusy(true);
    const r = await call('mock-submit', { mock_id: mock.id, answers });
    setBusy(false);
    if (r.ok && r.score !== undefined) setRes(r); else { sentRef.current = false; setErr(r.already ? 'You already took this one.' : r.error || 'Could not send your answers. Try again.'); }
  };
  const ansRef = useRef(ans); ansRef.current = ans;
  useEffect(() => {
    if (!started || res || !d || !d.duration_min) return undefined;
    const t = setInterval(() => setLeft((x) => { if (x <= 1) { clearInterval(t); submit(ansRef.current); return 0; } return x - 1; }), 1000);
    return () => clearInterval(t);
  }, [started, res, d]); // eslint-disable-line

  const shell = (children) => (<div className="scr fd sch tt"><div className="sch-head"><button className="sch-back" onClick={onClose} aria-label="Back">←</button><div><h2>{mock.title}</h2><p>{(d && d.kind) === 'quiz' ? 'Quiz' : (d && d.kind) === 'test' ? 'Test' : 'Mock exam'} from your teacher</p></div></div><div className="sch-body">{children}</div></div>);

  if (err && !d) return shell(<div className="sch-empty">{err}</div>);
  if (!d) return shell(<div className="sch-empty">Loading…</div>);

  if (res) {
    return shell(
      <>
        <div className="tt-score"><b>{res.score}%</b><span>{res.correct} of {res.total} correct</span></div>
        <p className="sch-note" style={{ textAlign: 'center' }}>Your teacher can see your score.</p>
        {d.questions.map((q, k) => {
          const rv = res.review[k] || {}; const right = rv.yours === rv.a;
          return (
            <div className={`tt-rev ${right ? 'ok' : 'no'}`} key={k}>
              <b>{k + 1}. {q.q}</b>
              <small>{rv.yours === null ? 'No answer' : `You chose ${'ABCDE'[rv.yours]}: ${q.o[rv.yours]}`}</small>
              {!right && <small className="tt-right">Correct: {'ABCDE'[rv.a]}: {q.o[rv.a]}</small>}
              {rv.e && <small>{rv.e}</small>}
            </div>
          );
        })}
        <button className="sch-btn wide" onClick={onClose}>Done</button>
      </>,
    );
  }

  if (!started) {
    return shell(
      <div className="tt-intro">
        <h3>{d.questions.length} question{d.questions.length === 1 ? '' : 's'}{d.duration_min ? ` · ${d.duration_min} minutes` : ' · no timer'}</h3>
        <p>You can only take this once. Your first attempt is your score.{d.duration_min ? ' The test submits itself when the time is up.' : ''}</p>
        <button className="sch-btn wide" onClick={() => setStarted(true)}>Start</button>
      </div>,
    );
  }

  const q = d.questions[i]; const last = i === d.questions.length - 1; const answered = ans.filter((x) => x !== null).length;
  return shell(
    <>
      <div className="tt-bar"><span>Question {i + 1} of {d.questions.length}</span>{d.duration_min > 0 && <b className={left < 60 ? 'low' : ''}>⏱ {mmss(left)}</b>}</div>
      <div className="tt-prog"><i style={{ width: `${((i + 1) / d.questions.length) * 100}%` }} /></div>
      <div className="tt-q">{q.q}</div>
      {q.o.map((t, k) => <button key={k} className={`tt-opt ${ans[i] === k ? 'on' : ''}`} onClick={() => setAns(ans.map((x, j) => (j === i ? k : x)))}><span>{'ABCDE'[k]}</span>{t}</button>)}
      {err && <div className="sch-err">{err}</div>}
      <div className="tt-nav">
        <button className="sch-btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>Back</button>
        {!last ? <button className="sch-btn" onClick={() => setI(i + 1)}>Next</button>
          : <button className="sch-btn" disabled={busy} onClick={() => { if (answered < d.questions.length && !window.confirm(`You have ${d.questions.length - answered} unanswered. Submit anyway?`)) return; submit(ans); }}>{busy ? 'Sending…' : 'Submit'}</button>}
      </div>
    </>,
  );
}

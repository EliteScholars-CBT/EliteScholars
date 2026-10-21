import React, { useState } from 'react';

const REASONS = [['wrong_answer', 'Wrong answer'], ['typo', 'Typo'], ['unclear', 'Unclear'], ['wrong_subject', 'Wrong topic']];

// A tiny flag next to the question number. Tap, pick a reason, done.
export default function ReportQuestion({ subject, exam, qi, question, options }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');
  const send = async (reason) => {
    setState('sending');
    try {
      const r = await fetch('/api/report/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, exam, qi, question, options, reason }) });
      setState(r.ok ? 'sent' : 'err');
    } catch { setState('err'); }
    setTimeout(() => { setOpen(false); setState(''); }, 1600);
  };
  return (
    <span style={{ marginLeft: 'auto', position: 'relative' }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} aria-label="Report a problem with this question" title="Report a problem" style={{ background: 'none', border: 0, padding: '2px 4px', fontSize: 12, opacity: 0.45, cursor: 'pointer', color: 'inherit' }}>⚑</button>
      {open && (
        <span style={{ position: 'absolute', right: 0, top: 22, zIndex: 20, background: 'var(--card-bg, #fff)', border: '1px solid rgba(124,58,237,.25)', borderRadius: 12, padding: 8, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 8px 24px rgba(0,0,0,.18)', minWidth: 130 }}>
          {state === 'sent' ? <span style={{ fontSize: 12, fontWeight: 700, color: '#047857', padding: 4 }}>Thanks, we'll check it ✓</span>
            : state === 'err' ? <span style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', padding: 4 }}>Could not send</span>
            : (<>
              <span style={{ fontSize: 10.5, opacity: 0.6, fontWeight: 700 }}>What's wrong?</span>
              {REASONS.map(([id, l]) => <button key={id} disabled={state === 'sending'} onClick={() => send(id)} style={{ textAlign: 'left', background: 'rgba(124,58,237,.08)', border: 0, borderRadius: 8, padding: '6px 8px', fontSize: 12, fontWeight: 700, fontFamily: 'inherit', color: 'inherit', cursor: 'pointer' }}>{l}</button>)}
            </>)}
        </span>
      )}
    </span>
  );
}

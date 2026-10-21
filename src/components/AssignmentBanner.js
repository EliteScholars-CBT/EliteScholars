import React, { useEffect, useState } from 'react';

// Small "you have homework" strip on the home screen. Silent if the student is in no class.
export default function AssignmentBanner({ onOpen }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let off = false;
    (async () => {
      try {
        const r = await fetch('/api/school/assign-list', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
        const j = await r.json().catch(() => null);
        if (off || !r.ok || !j || !j.assignments) return;
        setN(j.assignments.filter((a) => !a.done && (!a.due_at || new Date(a.due_at).getTime() > Date.now() - 86400000)).length);
      } catch { /* offline: stay quiet */ }
    })();
    return () => { off = true; };
  }, []);
  if (!n) return null;
  return (
    <button onClick={onOpen} style={{ margin: '10px 16px 0', width: 'calc(100% - 32px)', padding: '10px 14px', borderRadius: 14, border: '1.5px solid rgba(124,58,237,.25)', background: 'rgba(124,58,237,.08)', color: 'inherit', fontFamily: 'inherit', fontWeight: 800, fontSize: 13, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
      <span>📝 {n} assignment{n === 1 ? '' : 's'} from your teacher</span><span style={{ color: '#7C3AED' }}>Open ›</span>
    </button>
  );
}

import React, { useState, useEffect, useCallback } from 'react';

const WHY = { wrong_answer: 'Wrong answer', typo: 'Typo', unclear: 'Unclear', wrong_subject: 'Wrong topic', other: 'Other' };

// Questions students flagged, grouped so the most-reported come first.
export default function AdminReports({ token, onAuthFail }) {
  const [status, setStatus] = useState('open');
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');

  const call = useCallback(async (path, method = 'GET', body) => {
    const r = await fetch(`/api/admin/${path}`, { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { onAuthFail(d.error); throw new Error('auth'); }
    if (!d.success) throw new Error(d.error || 'Something went wrong.');
    return d;
  }, [token, onAuthFail]);

  const load = useCallback(async () => {
    try { const d = await call(`reports?status=${status}`); setRows(d.reports || []); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [call, status]);
  useEffect(() => { load(); }, [load]);

  const act = async (ids, s) => { try { await call('report-action', 'POST', { ids, status: s }); load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } };

  return (
    <section className="adm-card">
      <div className="adm-card-head"><h2>Reported questions</h2>
        <div className="adm-tabs"><button className={status === 'open' ? 'on' : ''} onClick={() => setStatus('open')}>Open</button><button className={status === 'resolved' ? 'on' : ''} onClick={() => setStatus('resolved')}>Resolved</button></div>
      </div>
      {err && <div className="adm-error">{err}</div>}
      {rows.length === 0 && <p className="adm-hint">Nothing here.</p>}
      {rows.map((g) => (
        <div className="adm-mail-hist" key={g.key}>
          <b>{g.question}</b>
          <small>{g.subject} {g.exam ? `· ${g.exam}` : ''} · {g.count} report{g.count === 1 ? '' : 's'} · {Object.entries(g.reasons).map(([k, v]) => `${WHY[k] || k} ×${v}`).join(', ')}</small>
          {g.options && g.options.length > 0 && <small>Options: {g.options.join(' | ')}</small>}
          {g.notes.length > 0 && <small>Notes: {g.notes.join(' / ')}</small>}
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            {status === 'open' ? <button className="adm-ghost" onClick={() => act(g.ids, 'resolved')}>Mark fixed</button> : <button className="adm-ghost" onClick={() => act(g.ids, 'open')}>Reopen</button>}
            <button className="adm-ghost" onClick={() => act(g.ids, 'delete')}>Delete</button>
          </div>
        </div>
      ))}
    </section>
  );
}

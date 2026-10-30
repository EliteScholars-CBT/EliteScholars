import React, { useState, useEffect, useCallback } from 'react';

const WHY = { wrong_answer: 'Wrong answer', typo: 'Typo', unclear: 'Unclear', wrong_subject: 'Wrong topic', other: 'Other' };

// Questions students flagged, grouped so the most-reported come first.
function Crashes({ token, onAuthFail }) {
  const [status, setStatus] = useState('open');
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState('');
  const call = useCallback(async (path, method = 'GET', body) => {
    const r = await fetch(`/api/admin/${path}`, { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { onAuthFail(d.error); throw new Error('auth'); }
    if (!d.success) throw new Error(d.error || 'Something went wrong.');
    return d;
  }, [token, onAuthFail]);
  const load = useCallback(async () => { try { const d = await call(`crash-list?status=${status}`); setRows(d.crashes || []); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); } }, [call, status]);
  useEffect(() => { load(); }, [load]);
  const act = async (ids, st) => { try { await call('crash-action', 'POST', { ids, status: st }); load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } };
  const when = (t) => new Date(t).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });
  return (
    <section className="adm-card">
      <div className="adm-card-head"><h2>App crashes</h2>
        <div className="adm-tabs"><button className={status === 'open' ? 'on' : ''} onClick={() => setStatus('open')}>Open</button><button className={status === 'resolved' ? 'on' : ''} onClick={() => setStatus('resolved')}>Fixed</button></div>
      </div>
      {err && <div className="adm-error">{err}</div>}
      {rows && rows.length === 0 && <p className="adm-hint">No crashes. 🎉</p>}
      {(rows || []).map((g) => (
        <div className="adm-mail-hist" key={g.key}>
          <b>{g.message}</b>
          <small>{g.count} crash{g.count === 1 ? '' : 'es'} · {g.userCount} student{g.userCount === 1 ? '' : 's'} · screen: {g.screen || 'unknown'} · last {when(g.latest)}</small>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            <button className="adm-ghost" onClick={() => setOpen(open === g.key ? '' : g.key)}>{open === g.key ? 'Hide details' : 'Who and device details'}</button>
            {status === 'open' ? <button className="adm-ghost" onClick={() => act(g.ids, 'resolved')}>Mark fixed</button> : <button className="adm-ghost" onClick={() => act(g.ids, 'open')}>Reopen</button>}
            <button className="adm-ghost" onClick={() => act(g.ids, 'delete')}>Delete</button>
          </div>
          {open === g.key && (
            <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
              {g.events.map((e) => (
                <div key={e.id} style={{ border: '1px solid rgba(128,128,128,.3)', borderRadius: 10, padding: 10, fontSize: 12.5, lineHeight: 1.5, wordBreak: 'break-word' }}>
                  <b>{e.name || 'Unknown name'}</b> · {e.email || 'not signed in'}{e.email && !e.verified ? ' (unverified)' : ''} · {when(e.at)}<br />
                  {Object.entries(e.device || {}).map(([k, v]) => <span key={k}><i>{k}</i>: {String(v)} · </span>)}<br />
                  <i>page</i>: {e.url}
                </div>
              ))}
              {g.stack && <pre style={{ fontSize: 11, whiteSpace: 'pre-wrap', margin: 0, maxHeight: 200, overflow: 'auto' }}>{g.stack}</pre>}
              {g.componentStack && <pre style={{ fontSize: 11, whiteSpace: 'pre-wrap', margin: 0, maxHeight: 140, overflow: 'auto' }}>{g.componentStack}</pre>}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default function AdminReports({ token, onAuthFail }) {
  const [part, setPart] = useState('questions');
  return (
    <div>
      <div className="adm-tabs" style={{ marginBottom: 10 }}><button className={part === 'questions' ? 'on' : ''} onClick={() => setPart('questions')}>Reported questions</button><button className={part === 'crashes' ? 'on' : ''} onClick={() => setPart('crashes')}>App crashes</button></div>
      {part === 'crashes' ? <Crashes token={token} onAuthFail={onAuthFail} /> : <Questions token={token} onAuthFail={onAuthFail} />}
    </div>
  );
}

function Questions({ token, onAuthFail }) {
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

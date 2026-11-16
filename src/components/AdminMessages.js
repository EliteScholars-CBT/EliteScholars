import React, { useState, useEffect, useCallback } from 'react';
import { makeApi } from './adminApi';

const when = (t) => new Date(t).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });

// Messages sent from the public /contact page.
export default function AdminMessages({ token, onAuthFail }) {
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState('new');
  const [err, setErr] = useState('');
  const api = React.useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const load = useCallback(() => api('activity', { query: { contact: 'list' } }).then((d) => { setRows(d.contact.rows); setErr(''); }).catch((e) => setErr(e.message || 'Could not load.')), [api]);
  useEffect(() => { load(); }, [load]);
  const act = (id, status) => api('activity', { method: 'POST', query: { contact: 'act' }, body: { id, status } }).then(load).catch((e) => setErr(e.message || 'Failed.'));
  const shown = (rows || []).filter((r) => (filter === 'all' ? true : filter === 'new' ? r.status === 'new' : r.status !== 'new'));
  return (
    <section className="adm-card">
      <div className="adm-card-head"><h2>Messages</h2>
        <div className="adm-tabs">{[['new', 'New'], ['done', 'Handled'], ['all', 'All']].map(([k, l]) => <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>{l}</button>)}</div>
      </div>
      {err && <div className="adm-error">{err}</div>}
      {rows && !shown.length && <p className="adm-hint">Nothing here.</p>}
      {shown.map((r) => (
        <div className="adm-mail-hist" key={r.id}>
          <b>{r.topic}</b> · {r.name || 'No name'} · <small>{when(r.created_at)}</small>
          <p style={{ whiteSpace: 'pre-wrap', margin: '6px 0', wordBreak: 'break-word' }}>{r.message}</p>
          <small>Reach them: {r.reply || 'not given'}{r.email ? ` · signed in as ${r.email}` : ''}</small>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {r.status === 'new' ? <button className="adm-ghost" onClick={() => act(r.id, 'done')}>Mark handled</button> : <button className="adm-ghost" onClick={() => act(r.id, 'new')}>Mark new</button>}
            <button className="adm-ghost" onClick={() => { if (window.confirm('Delete this message?')) act(r.id, 'delete'); }}>Delete</button>
          </div>
        </div>
      ))}
    </section>
  );
}

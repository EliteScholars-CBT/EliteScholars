import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, ago } from './adminApi';

const FILTERS = [['all', 'All'], ['reported', 'Reported / flagged'], ['photos', 'Photos'], ['unscanned', 'Photos not scanned']];

// Every status students post, newest first. Delete a post, dismiss a report, or suspend the account.
export default function AdminStatus({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [moderation, setModeration] = useState(true);

  const load = useCallback(async (before) => {
    setBusy(true); setErr('');
    try {
      const d = await api('status-list', { query: { filter, q, before } });
      setModeration(d.moderation !== false);
      setItems((cur) => (before ? [...cur, ...d.items] : d.items));
      setNext(d.next);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api, filter, q]);

  useEffect(() => { const t = setTimeout(() => load(), q ? 350 : 0); return () => clearTimeout(t); }, [load, q]);
  useEffect(() => { const t = setInterval(() => load(), 45000); return () => clearInterval(t); }, [load]);

  const act = async (it, action) => {
    if (action === 'delete' && !window.confirm('Delete this status?')) return;
    try {
      await api('status-action', { method: 'POST', body: { id: it.id, action } });
      setItems((l) => (action === 'delete' ? l.filter((x) => x.id !== it.id) : l.map((x) => (x.id === it.id ? { ...x, reviewed: true } : x))));
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  };
  const suspend = async (it) => {
    const on = !it.suspended;
    const reason = on ? window.prompt(`Suspend ${it.name}? Their statuses will be removed and they cannot sign in. Reason (optional):`, '') : '';
    if (on && reason === null) return;
    if (!on && !window.confirm(`Restore ${it.name}'s account?`)) return;
    try {
      await api('status-suspend', { method: 'POST', body: { email: it.email, suspended: on, reason } });
      if (on) setItems((l) => l.filter((x) => x.email !== it.email));
      else setItems((l) => l.map((x) => (x.email === it.email ? { ...x, suspended: false } : x)));
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  };

  return (
    <div>
      <section className="adm-card">
        <div className="adm-card-head"><h2>Status monitor</h2></div>
        {!moderation && <div className="adm-error">Reports, scan results and suspension need the moderation SQL at the end of supabase/schema.sql. Run it once in the Supabase SQL editor.</div>}
        <div className="adm-pills" style={{ marginBottom: 10 }}>
          {FILTERS.map(([k, l]) => <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>{l}</button>)}
        </div>
        <div className="adm-filters"><input placeholder="Search text, name or email" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <p className="adm-note" style={{ margin: '8px 0 0' }}>Statuses post automatically. Links, phone numbers, money offers and explicit words are blocked on posting; photos are checked on the student's phone. Use this list to catch anything else. Students can also report a status.</p>
      </section>

      {err && <div className="adm-error">{err}</div>}
      <div className="adm-list">
        {items.map((it) => <StatusCard key={it.id} it={it} api={api} onAct={act} onSuspend={suspend} />)}
        {!items.length && !busy && <div className="adm-card">Nothing here{filter !== 'all' ? ' for this filter' : ' yet'}.</div>}
      </div>
      {next && <button className="adm-small" disabled={busy} onClick={() => load(next)}>{busy ? 'Loading…' : 'Load older'}</button>}
    </div>
  );
}

function StatusCard({ it, api, onAct, onSuspend }) {
  const [img, setImg] = useState('');
  useEffect(() => {
    let on = true;
    if (it.mediaId) api('status-media', { query: { id: it.mediaId } }).then((d) => { if (on) setImg(d.image); }).catch(() => {});
    return () => { on = false; };
  }, [it.mediaId, api]);
  const live = new Date(it.expiresAt) > new Date();
  const alert = (it.reports > 0 || it.flag) && !it.reviewed;
  return (
    <div className={`adm-card adm-status${alert ? ' alert' : ''}`}>
      <div className="adm-status-head">
        <b>{it.name}</b>
        <small>{it.email}</small>
        <span className="adm-chip">{it.privacy}</span>
        {!live && <span className="adm-chip ended">expired</span>}
        {it.resharedFrom && <span className="adm-chip">reshare of {it.resharedFrom}</span>}
        {it.reports > 0 && <span className="adm-chip ended">{it.reports} report{it.reports === 1 ? '' : 's'}</span>}
        {it.flag && <span className="adm-chip ended">flag: {it.flag}</span>}
        {it.mediaId && <span className="adm-chip">{it.scan === 'clean' ? 'photo scanned ✓' : 'photo not scanned'}</span>}
        <small style={{ marginLeft: 'auto' }}>{fmtDT(it.at)} · {ago(it.at)}</small>
      </div>
      {it.mediaId && (img ? <img className="adm-status-img" src={img} alt="Status photo" /> : <div className="adm-status-img wait">Loading photo…</div>)}
      {it.text && <p className="adm-status-text">{it.text}</p>}
      <div className="adm-inline" style={{ flexWrap: 'wrap', gap: 8 }}>
        <button className="adm-small danger" onClick={() => onAct(it, 'delete')}>Delete status</button>
        {alert && <button className="adm-small" onClick={() => onAct(it, 'dismiss')}>Looks fine</button>}
        <button className="adm-small danger" onClick={() => onSuspend(it)}>{it.suspended ? 'Restore account' : 'Suspend account'}</button>
      </div>
    </div>
  );
}

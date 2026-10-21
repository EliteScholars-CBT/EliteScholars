import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, ago } from './adminApi';

// A live feed of what students are doing, newest first.
export default function AdminActivity({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [next, setNext] = useState(null);
  const [f, setF] = useState({ q: '', type: '', days: '2' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [auto, setAuto] = useState(true);

  const load = useCallback(async (before) => {
    setBusy(true); setErr('');
    try {
      const d = await api('activity', { query: { q: f.q, type: f.type, days: f.days, before } });
      setItems((cur) => (before ? [...cur, ...d.items] : d.items));
      setNext(d.next); if (!before) setTypes(d.types || []);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api, f]);

  useEffect(() => { const t = setTimeout(() => load(), f.q ? 350 : 0); return () => clearTimeout(t); }, [load, f.q]);
  useEffect(() => { if (!auto) return undefined; const t = setInterval(() => load(), 30000); return () => clearInterval(t); }, [auto, load]);

  return (
    <div>
      <section className="adm-card">
        <div className="adm-card-head"><h2>Student activity</h2>
          <label className="adm-check"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} /> Auto-refresh</label></div>
        <div className="adm-filters">
          <input placeholder="Filter by student name, username or email" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
          <label>Type<select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
            <option value="">Everything</option><option value="xp">XP earned</option>
            {types.map((t) => <option key={t.name} value={t.name}>{t.name.replace(/_/g, ' ')} ({t.count})</option>)}
          </select></label>
          <label>Period<select value={f.days} onChange={(e) => setF({ ...f, days: e.target.value })}><option value="1">Last 24 hours</option><option value="2">Last 2 days</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></label>
        </div>
      </section>
      {err && <div className="adm-error">{err}</div>}
      <section className="adm-card">
        {items.length ? (
          <ul className="adm-timeline wide">
            {items.map((a, i) => <li key={i} className={a.kind}><time>{fmtDT(a.at)}<em>{ago(a.at)}</em></time><span><b>{a.who}</b> · {a.text}</span></li>)}
          </ul>
        ) : <p className="adm-empty">{busy ? 'Loading…' : 'No activity in this period.'}</p>}
        {next && <button className="adm-more" disabled={busy} onClick={() => load(next)}>{busy ? 'Loading…' : 'Show older'}</button>}
      </section>
    </div>
  );
}

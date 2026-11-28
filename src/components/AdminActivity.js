import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, ago } from './adminApi';
import { PERIODS } from './AdminRange';

// Colour groups so the feed can be scanned at a glance.
const CATS = [
  ['learn', 'Learning', /^(quiz|learn|flash|file_upload|topic)/],
  ['game', 'Games', /^(game|challenge)/],
  ['social', 'Status & squads', /^(status_view|status_comment|status_reply|status_post|squad|status_react)/],
  ['limit', 'Limits & shares', /^limit_/],
  ['blog', 'Blog reads', /^blog_/],
  ['money', 'Pro & payments', /^(premium|payment|prices|plan)/],
  ['join', 'Sign-ups & logins', /^(signup|register|login|referral|pwa|visit)/],
  ['warn', 'Blocked / security', /(blocked|bypass|anomaly|suspicious|multi_account)/],
  ['xp', 'XP', /^xp$/],
];
const catOf = (t) => (CATS.find((c) => c[2].test(String(t || ''))) || ['other'])[0];

// A live feed of what students are doing, newest first.
export default function AdminActivity({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [next, setNext] = useState(null);
  const [f, setF] = useState({ q: '', type: '', range: 'today' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [sq, setSq] = useState(null);
  const [wa, setWa] = useState(null);
  const [auto, setAuto] = useState(true);

  const load = useCallback(async (before) => {
    setBusy(true); setErr('');
    try {
      const d = await api('activity', { query: { q: f.q, type: f.type, range: f.range, before } });
      setItems((cur) => (before ? [...cur, ...d.items] : d.items));
      setNext(d.next); if (!before) setTypes(d.types || []);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api, f]);

  useEffect(() => { let on = true; const go = () => api('activity', { query: { squads: '1' } }).then((d) => { if (on) setSq(d.squadStats || null); }).catch(() => {}); const go2 = () => api('activity', { query: { wa: '1' } }).then((d) => { if (on) setWa(d.wa || null); }).catch(() => {}); go(); go2(); const t = setInterval(() => { go(); go2(); }, 60000); return () => { on = false; clearInterval(t); }; }, [api]);
  useEffect(() => { const t = setTimeout(() => load(), f.q ? 350 : 0); return () => clearTimeout(t); }, [load, f.q]);
  useEffect(() => { if (!auto) return undefined; const t = setInterval(() => load(), 30000); return () => clearInterval(t); }, [auto, load]);

  return (
    <div className="adm-cardgrid">
      <section className="adm-card">
        <div className="adm-card-head"><h2>Student activity</h2>
          <label className="adm-check"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} /> Auto-refresh</label></div>
        <div className="adm-filters">
          <input placeholder="Filter by student name, username or email" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
          <label>Type<select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
            <option value="">Everything</option><option value="xp">XP earned</option>
            {types.map((t) => <option key={t.name} value={t.name}>{t.name.replace(/_/g, ' ')} ({t.count})</option>)}
          </select></label>
          <label>Period<select value={f.range} onChange={(e) => setF({ ...f, range: e.target.value })}>{PERIODS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
        </div>
      </section>
      <style>{`.adm-timeline li.cat-limit{border-left-color:#fb923c}.adm-timeline li.cat-limit span b{color:#fdba74}.adm-legend .cat-limit i{background:#fb923c}.adm-timeline li.cat-blog{border-left-color:#2dd4bf}.adm-timeline li.cat-blog span b{color:#5eead4}.adm-legend .cat-blog i{background:#2dd4bf}`}</style>
      {wa && (
        <section className="adm-card">
          <div className="adm-card-head"><h2>WhatsApp Channel taps</h2></div>
          <p style={{ margin: '4px 0 8px' }}><b>{wa.last24h}</b> in the last 24 hours · <b>{wa.last7d}</b> in 7 days ({wa.signedIn7d} signed-in students, {wa.guests7d} visitors)</p>
          {wa.recent.length > 0 && <small>Latest: {wa.recent.slice(0, 8).map((r) => `${r.who} (${r.where}, ${ago(r.at)})`).join(' · ')}</small>}
        </section>
      )}
      {sq && (
        <section className="adm-card">
          <div className="adm-card-head"><h2>Squads right now</h2></div>
          <p style={{ margin: '4px 0 8px' }}>
            <b>{sq.squads}</b> squads · <b>{sq.members}</b> students in squads · avg <b>{sq.avgSize}</b> per squad · today <b>{sq.messagesToday}</b> messages from <b>{sq.chattersToday}</b> students{sq.nearCap ? <> · <b>{sq.nearCap}</b> near the 100 cap</> : null}
          </p>
          {sq.top.length > 0 && <small>Busiest today: {sq.top.map((t) => `${t.name} (${t.messages} msgs, ${t.members} members)`).join(' · ')}</small>}
        </section>
      )}
      <div className="adm-legend">{CATS.map((c) => <span key={c[0]} className={`cat-${c[0]}`}><i />{c[1]}</span>)}</div>
      {err && <div className="adm-error">{err}</div>}
      <section className="adm-card">
        {items.length ? (
          <ul className="adm-timeline wide adm-cols2">
            {items.map((a, i) => <li key={i} className={`${a.kind} cat-${catOf(a.type)}`}><time>{fmtDT(a.at)}<em>{ago(a.at)}</em></time><span><b>{a.who}</b> · {a.text}</span></li>)}
          </ul>
        ) : <p className="adm-empty">{busy ? 'Loading…' : 'No activity in this period.'}</p>}
        {next && <button className="adm-more" disabled={busy} onClick={() => load(next)}>{busy ? 'Loading…' : 'Show older'}</button>}
      </section>
    </div>
  );
}

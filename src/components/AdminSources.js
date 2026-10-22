import React, { useState, useEffect, useMemo } from 'react';
import { makeApi } from './adminApi';
import { fmtN, TrendChart, Bars } from './AdminCharts';
import { SOURCE_LABELS } from '../utils/trafficSource';

export const labelOf = (k) => SOURCE_LABELS[k] || (k ? k.charAt(0).toUpperCase() + k.slice(1) : 'Direct');

export default function AdminSources({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [days, setDays] = useState(30);
  const [ref, setRef] = useState('');
  const [draft, setDraft] = useState('');
  const [s, setS] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let on = true; setBusy(true);
    api('sources', { query: { days, ref } }).then((d) => { if (on) { setS(d.sources); setErr(''); } }).catch((e) => e.message !== 'auth' && on && setErr(e.message)).finally(() => on && setBusy(false));
    return () => { on = false; };
  }, [api, days, ref]);

  return (
    <div>
      <section className="adm-controls">
        <div className="adm-pills">{[7, 30, 90].map((d) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{d} days</button>)}</div>
        <form className="adm-inline" onSubmit={(e) => { e.preventDefault(); setRef(draft.trim().toUpperCase()); }}>
          <input placeholder="Partner code (optional)" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button className="adm-small">{ref ? 'Change' : 'Filter'}</button>
          {ref && <button type="button" className="adm-small" onClick={() => { setRef(''); setDraft(''); }}>All traffic</button>}
        </form>
      </section>
      {err && <div className="adm-error">{err}</div>}
      {!s && busy && <div className="adm-card">Loading…</div>}
      {s && (
        <div className={busy ? 'adm-dim' : ''}>
          <section className="adm-grid adm-stats">
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(s.visits)}</div><div className="adm-stat-label">Visits{ref ? ` via ${ref}` : ''}</div><div className="adm-stat-sub">last {s.days} days</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(s.signups)}</div><div className="adm-stat-label">Sign-ups</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{s.visits ? Math.round((s.signups / s.visits) * 1000) / 10 : 0}%</div><div className="adm-stat-label">Visit to sign-up</div></div>
          </section>
          <section className="adm-card"><h2>Visits per day</h2><TrendChart labels={s.series.labels} values={s.series.values} fmt={fmtN} /></section>
          <section className="adm-card">
            <h2>Where people come from</h2>
            {s.sources.length ? (
              <div className="adm-list tight">
                {s.sources.map((x) => (
                  <div className="adm-item" key={x.name}>
                    <div className="adm-item-head static">
                      <span className="adm-item-main"><b>{labelOf(x.name)}</b><small>{x.rate}% sign up</small></span>
                      <span className="adm-item-side"><b>{fmtN(x.visits)} visits</b><small>{fmtN(x.signups)} sign-ups</small></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="adm-empty">Nothing recorded yet. Visits are counted from now on.</p>}
            <p className="adm-note">“Direct” means no source was passed (typed link, many in-app browsers, bookmarks). Links with <code>&amp;src=whatsapp</code> or <code>utm_source=</code> are always identified.</p>
          </section>
          {!ref && s.pages.length > 0 && <section className="adm-card"><h2>Where they landed</h2><Bars data={s.pages} /></section>}
          {!ref && s.partners.length > 0 && (
            <section className="adm-card">
              <h2>Partner links</h2>
              <div className="adm-list tight">
                {s.partners.map((x) => (
                  <div className="adm-item" key={x.name}>
                    <button className="adm-item-head" onClick={() => { setRef(x.name); setDraft(x.name); }}>
                      <span className="adm-item-main"><b>{x.name}</b><small>tap to see its sources</small></span>
                      <span className="adm-item-side"><b>{fmtN(x.visits)} visits</b><small>{fmtN(x.signups)} sign-ups</small></span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          {s.truncated && <div className="adm-error">Very high traffic: figures may be slightly understated. Try a shorter range.</div>}
        </div>
      )}
    </div>
  );
}

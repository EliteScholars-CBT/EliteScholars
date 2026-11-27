import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi } from './adminApi';

const num = (v) => (v === '' ? '' : String(v).replace(/[^\d]/g, ''));

// Prices the owner can change any time: Pro, shop items, and the school plan (trial + tiers).
export function AdminPrices({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [p, setP] = useState({});
  const [items, setItems] = useState({});
  const [school, setSchool] = useState(null);
  const [centre, setCentre] = useState(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await api('prices');
      setD(r); setP({ premiumAnnual: String(r.prices.premiumAnnual), premiumAnnualOriginal: String(r.prices.premiumAnnualOriginal), pro: String(r.prices.pro), group50: String(r.prices.group50), group100: String(r.prices.group100), waecneco6: String(r.prices.waecneco6 || ''), waecneco12: String(r.prices.waecneco12 || ''), gst6: String(r.prices.gst6 || ''), gst12: String(r.prices.gst12 || '') });
      setItems(Object.fromEntries(r.items.map((i) => [i.id, String(i.price)])));
      const mk = (x) => ({ trialDays: String(x.trialDays), period: x.period, tiers: x.tiers.map((t) => ({ ...t, min: String(t.min), price: String(t.price), yearPrice: t.yearPrice ? String(t.yearPrice) : '' })) });
      setSchool(mk(r.school)); if (r.centre) setCentre(mk(r.centre));
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);
  useEffect(() => { load(); }, [load]);

  const save = async (fn, ok) => { setBusy(true); setErr(''); setMsg(''); try { await fn(); setMsg(ok); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };

  if (!d || !school || !centre) return <div className="adm-card">{err || 'Loading…'}</div>;

  return (
    <div>
      {msg && <div className="adm-ok">{msg}</div>}
      {err && <div className="adm-error">{err}</div>}

      <section className="adm-card">
        <h2>Pro prices (one plan per exam)</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Each plan unlocks Pro for that exam only. Everything else stays on the free tier. Changes apply straight away in the app and at checkout. Anyone already mid-payment still pays the price they were shown. Students who were already Pro before this change keep every exam until their plan ends.</p>
        <div className="adm-fields">
          <label>JAMB Pro, 1 year<input inputMode="numeric" value={p.premiumAnnual} onChange={(e) => setP({ ...p, premiumAnnual: num(e.target.value) })} /></label>
          <label>"Was" price (crossed out, JAMB)<input inputMode="numeric" value={p.premiumAnnualOriginal} onChange={(e) => setP({ ...p, premiumAnnualOriginal: num(e.target.value) })} /></label>
          <label>WAEC &amp; NECO Pro, 6 months<input inputMode="numeric" value={p.waecneco6 || ''} onChange={(e) => setP({ ...p, waecneco6: num(e.target.value) })} /></label>
          <label>WAEC &amp; NECO Pro, 1 year<input inputMode="numeric" value={p.waecneco12 || ''} onChange={(e) => setP({ ...p, waecneco12: num(e.target.value) })} /></label>
          <label>GST Pro, 6 months<input inputMode="numeric" value={p.gst6 || ''} onChange={(e) => setP({ ...p, gst6: num(e.target.value) })} /></label>
          <label>GST Pro, 1 year<input inputMode="numeric" value={p.gst12 || ''} onChange={(e) => setP({ ...p, gst12: num(e.target.value) })} /></label>
        </div>
        <button disabled={busy} onClick={() => save(() => api('prices-save', { method: 'POST', body: { premiumAnnual: p.premiumAnnual, premiumAnnualOriginal: p.premiumAnnualOriginal, waecneco6: p.waecneco6, waecneco12: p.waecneco12, gst6: p.gst6, gst12: p.gst12 } }), 'Pro prices saved.')}>Save Pro prices</button>
      </section>

      <section className="adm-card">
        <h2>Squad plan prices (1 year)</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Sold in the shop. One payer, Pro for up to 50 or 100 members they add themselves.</p>
        <div className="adm-fields">
          <label>Squad of 50 (₦)<input inputMode="numeric" value={p.group50 || ''} onChange={(e) => setP({ ...p, group50: num(e.target.value) })} /></label>
          <label>Squad of 100 (₦)<input inputMode="numeric" value={p.group100 || ''} onChange={(e) => setP({ ...p, group100: num(e.target.value) })} /></label>
        </div>
        <button disabled={busy} onClick={() => save(() => api('prices-save', { method: 'POST', body: { group50: p.group50, group100: p.group100 } }), 'Group prices saved.')}>Save group prices</button>
      </section>

      <section className="adm-card">
        <h2>Shop item prices</h2>
        <div className="adm-list tight">
          {d.items.map((i) => (
            <div className="adm-priceRow" key={i.id}><span><b>{i.title}</b><small>{i.category}</small></span>
              <label><span>₦</span><input inputMode="numeric" value={items[i.id] || ''} onChange={(e) => setItems({ ...items, [i.id]: num(e.target.value) })} /></label></div>
          ))}
        </div>
        <button className="adm-gap" disabled={busy} onClick={() => save(() => api('prices-save', { method: 'POST', body: { items } }), 'Shop prices saved.')}>Save shop prices</button>
      </section>

      <PlanCard kind="school" title="School plan (per term)" state={school} setState={setSchool} busy={busy} save={save} api={api}
        note="Every new school gets a free trial, then pays the price for how many students they have, per term. The full-year price is optional: leave it empty and it is simply 3 terms added up, or type your own (e.g. a discount)." />
      <PlanCard kind="centre" title="Tutorial / JAMB centre plan (per month)" state={centre} setState={setCentre} busy={busy} save={save} api={api}
        note="For tutorial centres. They pay per month (1, 3, 6 or 12 months). The full-year price is what they pay for 12 months; leave it empty to add up 12 months." />
    </div>
  );
}

function PlanCard({ kind, title, note, state, setState, busy, save, api }) {
  const setTier = (i, k, v) => setState((s) => ({ ...s, tiers: s.tiers.map((t, j) => (j === i ? { ...t, [k]: k === 'label' ? v : num(v) } : t)) }));
  return (
    <section className="adm-card">
      <h2>{title}</h2>
      <p className="adm-note" style={{ marginTop: 0 }}>{note}</p>
      <div className="adm-fields">
        <label>Free trial (days)<input inputMode="numeric" value={state.trialDays} onChange={(e) => setState({ ...state, trialDays: num(e.target.value) })} /></label>
        {kind === 'school' && <label>Billing period<input value={state.period} maxLength={20} onChange={(e) => setState({ ...state, period: e.target.value })} placeholder="term" /></label>}
      </div>
      <span className="adm-lbl">Price by number of students</span>
      {state.tiers.map((t, i) => (
        <div className="adm-tier" key={i}>
          <label>From<input inputMode="numeric" value={t.min} onChange={(e) => setTier(i, 'min', e.target.value)} /><em>students</em></label>
          <label>Name<input value={t.label} onChange={(e) => setTier(i, 'label', e.target.value)} placeholder="e.g. Standard (200+)" /></label>
          <label>{kind === 'centre' ? 'Per month ₦' : 'Per term ₦'}<input inputMode="numeric" value={t.price} onChange={(e) => setTier(i, 'price', e.target.value)} /></label>
          <label>Full year ₦<input inputMode="numeric" value={t.yearPrice || ''} onChange={(e) => setTier(i, 'yearPrice', e.target.value)} placeholder={t.price ? `auto: ${(Number(t.price) * (kind === 'centre' ? 12 : 3)).toLocaleString('en-NG')}` : 'auto'} /></label>
          <button className="adm-small adm-danger" aria-label="Remove tier" onClick={() => setState({ ...state, tiers: state.tiers.filter((_, j) => j !== i) })}>✕</button>
        </div>
      ))}
      <div className="adm-inline">
        <button className="adm-small adm-ghost" onClick={() => setState({ ...state, tiers: [...state.tiers, { min: '', label: '', price: '', yearPrice: '' }] })}>＋ Add a tier</button>
        <button disabled={busy} onClick={() => save(() => api('school-settings', { method: 'POST', body: { kind, trialDays: state.trialDays, period: state.period, tiers: state.tiers } }), kind === 'centre' ? 'Centre plan saved.' : 'School plan saved.')}>Save {kind === 'centre' ? 'centre' : 'school'} plan</button>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, fmtD } from './adminApi';
import { fmtN, fmtNaira } from './AdminCharts';

const num = (v) => (v === '' ? '' : String(v).replace(/[^\d]/g, ''));

// Prices the owner can change any time: Premium, shop items, and the school plan (trial + tiers).
export function AdminPrices({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [p, setP] = useState({});
  const [items, setItems] = useState({});
  const [school, setSchool] = useState(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await api('prices');
      setD(r); setP({ premiumAnnual: String(r.prices.premiumAnnual), premiumAnnualOriginal: String(r.prices.premiumAnnualOriginal), pro: String(r.prices.pro), group50: String(r.prices.group50), group100: String(r.prices.group100) });
      setItems(Object.fromEntries(r.items.map((i) => [i.id, String(i.price)])));
      setSchool({ trialDays: String(r.school.trialDays), period: r.school.period, tiers: r.school.tiers.map((t) => ({ ...t, min: String(t.min), price: String(t.price) })) });
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);
  useEffect(() => { load(); }, [load]);

  const save = async (fn, ok) => { setBusy(true); setErr(''); setMsg(''); try { await fn(); setMsg(ok); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };

  if (!d || !school) return <div className="adm-card">{err || 'Loading…'}</div>;
  const setTier = (i, k, v) => setSchool((s) => ({ ...s, tiers: s.tiers.map((t, j) => (j === i ? { ...t, [k]: k === 'label' ? v : num(v) } : t)) }));

  return (
    <div>
      {msg && <div className="adm-ok">{msg}</div>}
      {err && <div className="adm-error">{err}</div>}

      <section className="adm-card">
        <h2>Premium prices</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Changes apply straight away in the app and at checkout. Anyone already mid-payment still pays the price they were shown.</p>
        <div className="adm-fields">
          <label>Premium (per year)<input inputMode="numeric" value={p.premiumAnnual} onChange={(e) => setP({ ...p, premiumAnnual: num(e.target.value) })} /></label>
          <label>"Was" price (crossed out)<input inputMode="numeric" value={p.premiumAnnualOriginal} onChange={(e) => setP({ ...p, premiumAnnualOriginal: num(e.target.value) })} /></label>
        </div>
        <button disabled={busy} onClick={() => save(() => api('prices-save', { method: 'POST', body: { premiumAnnual: p.premiumAnnual, premiumAnnualOriginal: p.premiumAnnualOriginal } }), 'Premium prices saved.')}>Save premium prices</button>
      </section>

      <section className="adm-card">
        <h2>Group plan prices (1 year)</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Sold in the shop. One payer, Premium for up to 50 or 100 members they add themselves.</p>
        <div className="adm-fields">
          <label>Group of 50 (₦)<input inputMode="numeric" value={p.group50 || ''} onChange={(e) => setP({ ...p, group50: num(e.target.value) })} /></label>
          <label>Group of 100 (₦)<input inputMode="numeric" value={p.group100 || ''} onChange={(e) => setP({ ...p, group100: num(e.target.value) })} /></label>
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

      <section className="adm-card">
        <h2>School plan</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Every new school gets a free trial, then pays the price for how many students they have. Set the trial length and the price tiers below.</p>
        <div className="adm-fields">
          <label>Free trial (days)<input inputMode="numeric" value={school.trialDays} onChange={(e) => setSchool({ ...school, trialDays: num(e.target.value) })} /></label>
          <label>Billing period<input value={school.period} maxLength={20} onChange={(e) => setSchool({ ...school, period: e.target.value })} placeholder="term, year…" /></label>
        </div>
        <span className="adm-lbl">Price by number of students</span>
        {school.tiers.map((t, i) => (
          <div className="adm-tier" key={i}>
            <label>From<input inputMode="numeric" value={t.min} onChange={(e) => setTier(i, 'min', e.target.value)} /><em>students</em></label>
            <label>Name<input value={t.label} onChange={(e) => setTier(i, 'label', e.target.value)} placeholder="e.g. Standard (200+)" /></label>
            <label>Price ₦<input inputMode="numeric" value={t.price} onChange={(e) => setTier(i, 'price', e.target.value)} /></label>
            <button className="adm-small adm-danger" aria-label="Remove tier" onClick={() => setSchool({ ...school, tiers: school.tiers.filter((_, j) => j !== i) })}>✕</button>
          </div>
        ))}
        <div className="adm-inline">
          <button className="adm-small adm-ghost" onClick={() => setSchool({ ...school, tiers: [...school.tiers, { min: '', label: '', price: '' }] })}>＋ Add a tier</button>
          <button disabled={busy} onClick={() => save(() => api('school-settings', { method: 'POST', body: { trialDays: school.trialDays, period: school.period, tiers: school.tiers } }), 'School plan saved.')}>Save school plan</button>
        </div>
      </section>
    </div>
  );
}

const STATUS = { trial: ['Free trial', 'pending'], active: ['Active', 'active'], expired: ['Expired', 'ended'] };

export function AdminSchools({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [open, setOpen] = useState('');
  const [days, setDays] = useState('14');
  const [paid, setPaid] = useState('');
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => { try { setD(await api('school-plans')); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); } }, [api]);
  useEffect(() => { load(); }, [load]);
  const act = async (email, body, ok) => { setBusy(true); setErr(''); setMsg(''); try { await api('school-account', { method: 'POST', body: { email, ...body } }); setMsg(ok); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };

  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const count = (s) => d.schools.filter((x) => x.status === s).length;
  return (
    <div>
      <section className="adm-grid adm-stats">
        <div className="adm-stat"><div className="adm-stat-val">{d.schools.length}</div><div className="adm-stat-label">Schools</div></div>
        <div className="adm-stat"><div className="adm-stat-val">{count('trial')}</div><div className="adm-stat-label">On free trial</div></div>
        <div className="adm-stat"><div className="adm-stat-val">{count('active')}</div><div className="adm-stat-label">Paying</div></div>
        <div className="adm-stat"><div className="adm-stat-val">{count('expired')}</div><div className="adm-stat-label">Expired</div></div>
      </section>
      {msg && <div className="adm-ok">{msg}</div>}
      {err && <div className="adm-error">{err}</div>}
      <section className="adm-card">
        <h2>Schools — tap one to manage</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Trial length is <b>{d.settings.trialDays} days</b> (change it under Prices). After the trial a school can't add classes or assignments until you activate it here.</p>
        <div className="adm-list tight">
          {d.schools.map((s) => {
            const [label, cls] = STATUS[s.status];
            return (
              <div key={s.email} className={`adm-item ${open === s.email ? 'open' : ''}`}>
                <button className="adm-item-head" onClick={() => setOpen(open === s.email ? '' : s.email)} aria-expanded={open === s.email}>
                  <span className="adm-item-main"><b>{s.school || 'Unnamed school'}</b><small>{s.email}</small></span>
                  <span className="adm-item-side"><b>{fmtN(s.students)} students</b><small>{s.status === 'expired' ? `ended ${fmtD(s.until)}` : `${s.daysLeft} day${s.daysLeft === 1 ? '' : 's'} left`}</small></span>
                  <span className={`adm-chip ${cls}`}>{label}</span><span className="adm-caret">{open === s.email ? '▴' : '▾'}</span>
                </button>
                {open === s.email && (
                  <div className="adm-detail">
                    <div className="adm-facts">
                      <div><span>Classes</span><b>{s.classes}</b></div>
                      <div><span>Price tier</span><b>{s.tier || '—'}</b></div>
                      <div><span>They should pay</span><b>{fmtNaira(s.price)} / {d.settings.period}</b></div>
                      <div><span>Total paid so far</span><b>{fmtNaira(s.amountPaid)}</b></div>
                      <div><span>Trial started</span><b>{fmtDT(s.trialStarted)}</b></div>
                      <div><span>Trial ends</span><b>{fmtDT(s.trialEnds)}</b></div>
                      <div><span>Paid until</span><b>{s.paidUntil ? fmtDT(s.paidUntil) : '—'}</b></div>
                    </div>
                    {s.notes && <p className="adm-note">Note: {s.notes}</p>}
                    <div className="adm-fields">
                      <label>Days<input inputMode="numeric" value={days} onChange={(e) => setDays(num(e.target.value))} /></label>
                      <label>Amount they paid ₦ (optional)<input inputMode="numeric" value={paid} onChange={(e) => setPaid(num(e.target.value))} placeholder={String(s.price)} /></label>
                    </div>
                    <div className="adm-inline">
                      <button className="adm-small" disabled={busy} onClick={() => act(s.email, { action: 'extend-trial', days }, 'Trial extended.')}>Extend trial</button>
                      <button className="adm-small" disabled={busy} onClick={() => act(s.email, { action: 'activate', days, amount: paid }, 'Plan activated.')}>Activate plan</button>
                      <button className="adm-small adm-danger" disabled={busy} onClick={() => { if (window.confirm('Switch this school off now?')) act(s.email, { action: 'deactivate' }, 'School switched off.'); }}>Switch off</button>
                    </div>
                    <div className="adm-inline">
                      <input placeholder="Private note (e.g. paid by transfer 12 Oct)" value={note} maxLength={200} onChange={(e) => setNote(e.target.value)} />
                      <button className="adm-small adm-ghost" disabled={busy || !note} onClick={() => act(s.email, { action: 'note', note }, 'Note saved.')}>Save note</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {!d.schools.length && <p className="adm-empty">No schools yet. A school appears here the first time a teacher creates a class.</p>}
        </div>
      </section>
    </div>
  );
}

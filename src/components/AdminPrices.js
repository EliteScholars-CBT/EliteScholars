import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, fmtD } from './adminApi';
import { fmtN, fmtNaira } from './AdminCharts';

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
      setD(r); setP({ premiumAnnual: String(r.prices.premiumAnnual), premiumAnnualOriginal: String(r.prices.premiumAnnualOriginal), pro: String(r.prices.pro), group50: String(r.prices.group50), group100: String(r.prices.group100) });
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
        <h2>Pro prices</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Changes apply straight away in the app and at checkout. Anyone already mid-payment still pays the price they were shown.</p>
        <div className="adm-fields">
          <label>Pro (per year)<input inputMode="numeric" value={p.premiumAnnual} onChange={(e) => setP({ ...p, premiumAnnual: num(e.target.value) })} /></label>
          <label>"Was" price (crossed out)<input inputMode="numeric" value={p.premiumAnnualOriginal} onChange={(e) => setP({ ...p, premiumAnnualOriginal: num(e.target.value) })} /></label>
        </div>
        <button disabled={busy} onClick={() => save(() => api('prices-save', { method: 'POST', body: { premiumAnnual: p.premiumAnnual, premiumAnnualOriginal: p.premiumAnnualOriginal } }), 'Pro prices saved.')}>Save premium prices</button>
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

const STATUS = { trial: ['Free trial', 'pending'], active: ['Active', 'active'], expired: ['Expired', 'ended'] };

const SHOW_LABEL = { pending: ['Waiting', 'adm-chip pending'], approved: ['Showing', 'adm-chip active'], rejected: ['Declined', 'adm-chip rejected'], none: ['Not asked', 'adm-chip'] };
const SIZE_TXT = { 'under-50': 'under 50', '50-200': '50–200', '200-500': '200–500', '500-1000': '500–1,000', '1000+': '1,000+' };
// Every registered school/centre with the details they gave, and their "show us on the website" request. Only approved ones appear publicly.
function ShowcasePanel({ api }) {
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => { try { setRows((await api('showcase-list')).schools); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); } }, [api]);
  useEffect(() => { load(); }, [load]);
  const set = async (id, status, ok) => { setBusy(true); setErr(''); setMsg(''); try { await api('showcase-set', { method: 'POST', body: { id, status } }); setMsg(ok); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };
  if (!rows) return <div className="adm-card">{err || 'Loading…'}</div>;
  const n = (st) => rows.filter((r) => r.status === st).length;
  const shown = rows.filter((r) => (filter === 'all' ? true : filter === 'none' ? r.status === 'none' || r.status === 'rejected' : r.status === filter));
  const tabs = [['pending', `Waiting (${n('pending')})`], ['approved', `Showing (${n('approved')})`], ['none', 'Not listed'], ['all', `All (${rows.length})`]];
  return (
    <section className="adm-card">
      <h2>Registered schools &amp; centres</h2>
      <p className="adm-note" style={{ marginTop: 0 }}>Schools that tick “show us on the website” wait here. Nothing appears on the public pages until you tap <b>Approve</b>. The logo shown is the one they uploaded themselves.</p>
      {msg && <div className="adm-ok">{msg}</div>}
      {err && <div className="adm-error">{err}</div>}
      <div className="adm-inline">{tabs.map(([k, l]) => <button key={k} className={`adm-small ${filter === k ? '' : 'adm-ghost'}`} onClick={() => setFilter(k)}>{l}</button>)}</div>
      <div className="adm-list tight">
        {shown.map((r) => {
          const [lab, cls] = SHOW_LABEL[r.status] || SHOW_LABEL.none;
          return (
            <div key={r.id} className="adm-item open">
              <div className="adm-item-head static">
                <span className="adm-item-main"><b>{r.name}</b><small>{r.kind === 'centre' ? 'Tutorial centre' : 'School'} · {[r.city, r.state].filter(Boolean).join(', ') || 'no location yet'}{r.size ? ` · ${SIZE_TXT[r.size] || r.size} students` : ''}</small></span>
                <span className={cls}>{lab}</span>
              </div>
              <div className="adm-detail">
                <div className="adm-facts">
                  <div><span>Contact</span><b>{r.contact || '—'}{r.role ? ` (${r.role})` : ''}</b></div>
                  <div><span>Phone</span><b>{r.phone ? <a style={{ color: '#a78bfa' }} href={`https://wa.me/${r.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">{r.phone}</a> : '—'}</b></div>
                  <div><span>Email</span><b>{r.owner}</b></div>
                  <div><span>Registered</span><b>{fmtD(r.createdAt)}</b></div>
                </div>
                {r.tagline && <p className="adm-note">Their line: “{r.tagline}”</p>}
                {r.status !== 'none' && !r.hasLogo && <p className="adm-note">No logo uploaded yet, so initials will show.</p>}
                <div className="adm-inline">
                  {r.status !== 'approved' && r.status !== 'none' && <button className="adm-small" disabled={busy} onClick={() => set(r.id, 'approved', 'Approved. It is on the site now.')}>Approve</button>}
                  {r.status === 'pending' && <button className="adm-small adm-danger" disabled={busy} onClick={() => set(r.id, 'rejected', 'Declined.')}>Decline</button>}
                  {r.status === 'approved' && <button className="adm-small adm-danger" disabled={busy} onClick={() => { if (window.confirm('Remove this from the website?')) set(r.id, 'rejected', 'Removed from the site.'); }}>Remove from site</button>}
                  {r.status === 'rejected' && <button className="adm-small adm-ghost" disabled={busy} onClick={() => set(r.id, 'pending', 'Back in the waiting list.')}>Reconsider</button>}
                </div>
              </div>
            </div>
          );
        })}
        {!shown.length && <p className="adm-empty">{filter === 'pending' ? 'No requests waiting.' : 'Nothing here yet.'}</p>}
      </div>
    </section>
  );
}


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
      <ShowcasePanel api={api} />
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

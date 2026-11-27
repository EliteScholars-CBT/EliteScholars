import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, fmtD } from './adminApi';
import { fmtN, fmtNaira } from './AdminCharts';
import Fold from './AdminFold';

const num = (v) => (v === '' ? '' : String(v).replace(/[^\d]/g, ''));
const STATUS = { trial: ['Free trial', 'pending'], active: ['Active', 'active'], expired: ['Expired', 'ended'] };
const STAGE = { warn: 'Reminder: trial ending', ended: 'Trial ended', week: 'One-week follow-up' };

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
  if (!rows) return <div className="adm-note">{err || 'Loading…'}</div>;
  const n = (st) => rows.filter((r) => r.status === st).length;
  const shown = rows.filter((r) => (filter === 'all' ? true : filter === 'none' ? r.status === 'none' || r.status === 'rejected' : r.status === filter));
  const tabs = [['pending', `Waiting (${n('pending')})`], ['approved', `Showing (${n('approved')})`], ['none', 'Not listed'], ['all', `All (${rows.length})`]];
  return (
    <div>
      <p className="adm-note">Schools that tick “show us on the website” wait here. Nothing appears on the public pages until you tap <b>Approve</b>. The logo shown is the one they uploaded themselves.</p>
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
    </div>
  );
}

const Sent = ({ label, at }) => <span className={`adm-tag ${at ? 'on' : ''}`}>{label}{at ? `: ${fmtD(at)}` : ': not sent'}</span>;

// One side of the two-column layout: all schools, or all tutorial centres.
function Column({ kind, rows, settings, open, setOpen, form, setForm, act, busy }) {
  const count = (s) => rows.filter((x) => x.status === s).length;
  const word = kind === 'centre' ? 'centre' : 'school';
  return (
    <div className="adm-sc-col">
      <h2>{kind === 'centre' ? 'Tutorial centres' : 'Schools'}</h2>
      <section className="adm-grid adm-stats">
        <div className="adm-stat"><div className="adm-stat-val">{rows.length}</div><div className="adm-stat-label">Total</div></div>
        <div className="adm-stat"><div className="adm-stat-val">{count('trial')}</div><div className="adm-stat-label">On trial</div></div>
        <div className="adm-stat"><div className="adm-stat-val">{count('active')}</div><div className="adm-stat-label">Paying</div></div>
        <div className="adm-stat"><div className="adm-stat-val">{count('expired')}</div><div className="adm-stat-label">Expired</div></div>
      </section>
      <p className="adm-note">Free trial is <b>{settings.trialDays} days</b> (change it under Prices). After it, a {word} can't add classes or assignments until you activate it here.</p>
      <div className="adm-list tight">
        {rows.map((s) => {
          const [label, cls] = STATUS[s.status];
          return (
            <div key={s.email} className={`adm-item ${open === s.email ? 'open' : ''}`}>
              <button className="adm-item-head" onClick={() => setOpen(open === s.email ? '' : s.email)} aria-expanded={open === s.email}>
                <span className="adm-item-main"><b>{s.school || `Unnamed ${word}`}</b><small>{s.email}</small></span>
                <span className="adm-item-side"><b>{fmtN(s.students)} students</b><small>{s.status === 'expired' ? `ended ${fmtD(s.until)}` : `${s.daysLeft} day${s.daysLeft === 1 ? '' : 's'} left`}</small></span>
                <span className={`adm-chip ${cls}`}>{label}</span><span className="adm-caret">{open === s.email ? '▴' : '▾'}</span>
              </button>
              {open === s.email && (
                <div className="adm-detail">
                  <div className="adm-facts">
                    <div><span>Contact</span><b>{s.contact || '—'}</b></div>
                    <div><span>Phone</span><b>{s.phone ? <a style={{ color: '#a78bfa' }} href={`https://wa.me/${s.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">{s.phone}</a> : '—'}</b></div>
                    <div><span>Classes</span><b>{s.classes}</b></div>
                    <div><span>Price tier</span><b>{s.tier || '—'}</b></div>
                    <div><span>They should pay</span><b>{fmtNaira(s.price)} / {s.period}</b></div>
                    <div><span>Total paid so far</span><b>{fmtNaira(s.amountPaid)}</b></div>
                    <div><span>Trial started</span><b>{fmtDT(s.trialStarted)}</b></div>
                    <div><span>Trial ends</span><b>{fmtDT(s.trialEnds)}</b></div>
                    <div><span>Paid until</span><b>{s.paidUntil ? fmtDT(s.paidUntil) : '—'}</b></div>
                  </div>
                  <div className="adm-inline" style={{ marginTop: 8 }}>
                    <Sent label="3-day reminder" at={s.mail.warn} /><Sent label="Ended email" at={s.mail.ended} /><Sent label="1-week email" at={s.mail.week} />
                  </div>
                  {s.notes && <p className="adm-note">Note: {s.notes}</p>}
                  <div className="adm-fields">
                    <label>Days<input inputMode="numeric" value={form.days} onChange={(e) => setForm({ ...form, days: num(e.target.value) })} /></label>
                    <label>Amount they paid ₦ (optional)<input inputMode="numeric" value={form.paid} onChange={(e) => setForm({ ...form, paid: num(e.target.value) })} placeholder={String(s.price)} /></label>
                  </div>
                  <div className="adm-inline">
                    <button className="adm-small" disabled={busy} onClick={() => act(s.email, { action: 'extend-trial', days: form.days }, 'Trial extended.')}>Extend trial</button>
                    <button className="adm-small" disabled={busy} onClick={() => act(s.email, { action: 'activate', days: form.days, amount: form.paid }, 'Plan activated.')}>Activate plan</button>
                    <button className="adm-small adm-danger" disabled={busy} onClick={() => { if (window.confirm(`Switch this ${word} off now?`)) act(s.email, { action: 'deactivate' }, `${word[0].toUpperCase()}${word.slice(1)} switched off.`); }}>Switch off</button>
                  </div>
                  <div className="adm-inline">
                    <input placeholder="Private note (e.g. paid by transfer 12 Oct)" value={form.note} maxLength={200} onChange={(e) => setForm({ ...form, note: e.target.value })} />
                    <button className="adm-small adm-ghost" disabled={busy || !form.note} onClick={() => act(s.email, { action: 'note', note: form.note }, 'Note saved.')}>Save note</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {!rows.length && <p className="adm-empty">{kind === 'centre' ? 'No tutorial centres yet.' : 'No schools yet. A school appears here the first time a teacher creates a class.'}</p>}
      </div>
    </div>
  );
}

export function AdminSchools({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [open, setOpen] = useState('');
  const [form, setForm] = useState({ days: '14', paid: '', note: '' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => { try { setD(await api('school-plans')); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); } }, [api]);
  useEffect(() => { load(); }, [load]);
  const act = async (email, body, ok) => { setBusy(true); setErr(''); setMsg(''); try { await api('school-account', { method: 'POST', body: { email, ...body } }); setMsg(ok); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };
  const sendDue = async () => {
    setBusy(true); setErr(''); setMsg('');
    try {
      const r = (await api('school-plans', { method: 'POST', body: { action: 'send-trial-emails' } })).result;
      setMsg(r.skipped ? r.skipped : `Sent ${r.sent} email${r.sent === 1 ? '' : 's'}${r.failed ? `, ${r.failed} could not be sent` : ''}.`);
      await load();
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };
  const pick = (email) => { setOpen(email); setForm((f) => ({ ...f, paid: '', note: '' })); };

  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const schools = d.schools.filter((x) => x.kind !== 'centre'), centres = d.schools.filter((x) => x.kind === 'centre');
  const col = { open, setOpen: pick, form, setForm, act, busy };
  return (
    <div>
      {msg && <div className="adm-ok">{msg}</div>}
      {err && <div className="adm-error">{err}</div>}

      <section className="adm-sc-cols">
        <Column kind="school" rows={schools} settings={d.settings} {...col} />
        <Column kind="centre" rows={centres} settings={d.centreSettings} {...col} />
      </section>

      <div style={{ marginTop: 16 }}>
        <Fold title="Trial emails" count={d.due.length || undefined} hint={d.due.length ? `${d.due.length} waiting to send` : 'All sent'}>
          <p className="adm-note">Sent automatically every morning at 8am: a reminder when 3 days are left, an email when the trial ends, and a follow-up a week later. Each email goes out once, and schools that have paid are never emailed. You can also send what is due right now.</p>
          {!d.mailReady && <div className="adm-error">Email is not set up on the server (RESEND_API_KEY / FROM_EMAIL), so nothing can be sent yet.</div>}
          {d.due.map((x) => (
            <div className="adm-mailrow" key={x.email + x.stage}>
              <span><b>{x.org || x.email}</b><br /><small>{x.email} · {x.kind === 'centre' ? 'centre' : 'school'}</small></span>
              <span className="adm-tag">{STAGE[x.stage]}{x.backfill ? ' (ended earlier)' : ''}</span>
            </div>
          ))}
          {!d.due.length && <p className="adm-empty">Nothing is due right now.</p>}
          <div className="adm-inline">
            <button disabled={busy || !d.due.length || !d.mailReady} onClick={sendDue}>{busy ? 'Sending…' : `Send ${d.due.length} due email${d.due.length === 1 ? '' : 's'} now`}</button>
          </div>
        </Fold>
        <Fold title="Website listing requests" hint="Approve who is shown on the public pages">
          <ShowcasePanel api={api} />
        </Fold>
      </div>
    </div>
  );
}

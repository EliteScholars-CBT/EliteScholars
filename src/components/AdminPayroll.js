import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtD } from './adminApi';

// Owner-only: who gets paid, how much, and a monthly pay run you tick off as you pay.
const naira = (n) => `₦${Math.round(Number(n) || 0).toLocaleString('en-NG')}`;
const lagosMonth = () => new Date(Date.now() + 3600000).toISOString().slice(0, 7);
const shift = (period, by) => {
  const [y, m] = period.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + by, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
};
const label = (period) => new Date(`${period}-01T12:00:00Z`).toLocaleDateString('en-NG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const BLANK = { name: '', role: '', email: '', amount: '', bank_name: '', account_name: '', account_number: '', start_date: '', notes: '' };

export default function AdminPayroll({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [period, setPeriod] = useState(lagosMonth());
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(null);   // add / edit staff form
  const [pay, setPay] = useState(null);     // { id, amount, bonus, deduction, method, note }
  const [open, setOpen] = useState(null);   // staff id whose details are open
  const [confirmDel, setConfirmDel] = useState(null);
  const [copied, setCopied] = useState('');

  const load = useCallback(async () => {
    try { setData(await api('payroll', { query: { period } })); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api, period]);
  useEffect(() => { setData(null); load(); }, [load]);

  const run = async (fn) => { setBusy(true); setErr(''); try { await fn(); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };

  const paidBy = useMemo(() => Object.fromEntries((data?.payments || []).map((p) => [p.staff_id, p])), [data]);
  const net = (p) => Number(p.amount) + Number(p.bonus) - Number(p.deduction);

  if (!data) return <div className="adm-card">{err || 'Loading…'}</div>;

  const active = data.staff.filter((s) => s.active);
  const due = active.reduce((a, s) => a + Number(s.amount), 0);
  const paidTotal = data.payments.reduce((a, p) => a + net(p), 0);
  const unpaid = active.filter((s) => !paidBy[s.id]);
  const owing = unpaid.reduce((a, s) => a + Number(s.amount), 0);

  const copy = async (s) => {
    const t = `${s.account_name || s.name}\n${s.bank_name}\n${s.account_number}`;
    try { await navigator.clipboard.writeText(t); setCopied(s.id); setTimeout(() => setCopied(''), 1500); } catch { /* ignore */ }
  };

  const saveStaff = () => run(async () => {
    await api('payroll-save', { method: 'POST', body: { ...form, amount: Number(form.amount) || 0 } });
    setForm(null);
  });
  const doPay = () => run(async () => {
    await api('payroll-pay', { method: 'POST', body: { staffId: pay.id, period, amount: pay.amount, bonus: pay.bonus, deduction: pay.deduction, method: pay.method, note: pay.note } });
    setPay(null);
  });

  return (
    <div>
      {err && <div className="adm-error">{err}</div>}

      <section className="adm-card">
        <div className="adm-inline" style={{ justifyContent: 'space-between' }}>
          <button className="adm-small" onClick={() => setPeriod(shift(period, -1))}>‹ Prev</button>
          <h2 style={{ margin: 0 }}>{label(period)}</h2>
          <button className="adm-small" onClick={() => setPeriod(shift(period, 1))}>Next ›</button>
        </div>
        {period !== lagosMonth() && <div className="adm-inline"><button className="adm-ghost adm-small" onClick={() => setPeriod(lagosMonth())}>Back to this month</button></div>}
        <div className="adm-chips" style={{ marginTop: 12 }}>
          <span className="adm-chip">Due {naira(due)}</span>
          <span className="adm-chip paid">Paid {naira(paidTotal)}</span>
          <span className="adm-chip pending">Still to pay {naira(owing)} ({unpaid.length})</span>
          <span className="adm-chip">{data.period.slice(0, 4)} total paid {naira(data.yearTotal)}</span>
        </div>
      </section>

      <section className="adm-card">
        <div className="adm-inline" style={{ justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>Pay run ({data.staff.length})</h2>
          {!form && <button className="adm-small" onClick={() => setForm({ ...BLANK })}>+ Add person</button>}
        </div>
        {!data.staff.length && !form && <p className="adm-empty">No one on payroll yet. Add the first person.</p>}

        <div className="adm-list tight">
          {data.staff.map((s) => {
            const p = paidBy[s.id];
            const isOpen = open === s.id;
            return (
              <div key={s.id} className={`adm-item ${isOpen ? 'open' : ''}`}>
                <div className="adm-item-head" role="button" tabIndex={0} onClick={() => setOpen(isOpen ? null : s.id)} onKeyDown={(e) => { if (e.key === 'Enter') setOpen(isOpen ? null : s.id); }}>
                  <span className="adm-av">{s.name.charAt(0).toUpperCase()}</span>
                  <span className="adm-item-main">
                    <b>{s.name} {!s.active && <span className="adm-chip ended">Inactive</span>}</b>
                    <small>{s.role || 'No role set'} · {naira(s.amount)}/month</small>
                  </span>
                  {s.active && (p ? <span className="adm-chip paid">Paid {naira(net(p))}</span> : <span className="adm-chip pending">Unpaid</span>)}
                </div>

                {isOpen && (
                  <div className="adm-detail">
                    {p && <p className="adm-note">Paid {fmtD(p.paid_at)}{p.method ? ` via ${p.method}` : ''}. Base {naira(p.amount)}{Number(p.bonus) ? ` + bonus ${naira(p.bonus)}` : ''}{Number(p.deduction) ? ` − deduction ${naira(p.deduction)}` : ''}.{p.note ? ` ${p.note}` : ''}</p>}
                    {(s.bank_name || s.account_number) && (
                      <div className="adm-linkbox"><span>{s.account_name || s.name}<br />{s.bank_name} · <code>{s.account_number}</code></span>
                        <button className="adm-small" onClick={() => copy(s)}>{copied === s.id ? 'Copied' : 'Copy'}</button></div>
                    )}
                    {s.email && <p className="adm-note">{s.email}</p>}
                    {s.start_date && <p className="adm-note">Started {fmtD(s.start_date)}</p>}
                    {s.notes && <p className="adm-note">{s.notes}</p>}

                    {pay && pay.id === s.id ? (
                      <div className="adm-form two" style={{ marginTop: 10 }}>
                        <label>Amount (₦)<input type="number" inputMode="decimal" value={pay.amount} onChange={(e) => setPay({ ...pay, amount: e.target.value })} /></label>
                        <label>Bonus (₦)<input type="number" inputMode="decimal" value={pay.bonus} onChange={(e) => setPay({ ...pay, bonus: e.target.value })} /></label>
                        <label>Deduction (₦)<input type="number" inputMode="decimal" value={pay.deduction} onChange={(e) => setPay({ ...pay, deduction: e.target.value })} /></label>
                        <label>Paid how<input value={pay.method} placeholder="Transfer, cash…" onChange={(e) => setPay({ ...pay, method: e.target.value })} /></label>
                        <label style={{ gridColumn: '1 / -1' }}>Note<input value={pay.note} onChange={(e) => setPay({ ...pay, note: e.target.value })} /></label>
                        <div className="adm-inline" style={{ gridColumn: '1 / -1' }}>
                          <button disabled={busy} onClick={doPay}>{busy ? 'Saving…' : `Mark paid · ${naira((Number(pay.amount) || 0) + (Number(pay.bonus) || 0) - (Number(pay.deduction) || 0))}`}</button>
                          <button className="adm-ghost" onClick={() => setPay(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="adm-inline">
                        {s.active && !p && <button className="adm-small" onClick={() => setPay({ id: s.id, amount: s.amount, bonus: '', deduction: '', method: 'Transfer', note: '' })}>Mark paid</button>}
                        {s.active && p && <button className="adm-small adm-ghost" disabled={busy} onClick={() => run(() => api('payroll-pay', { method: 'POST', body: { staffId: s.id, period, undo: true } }))}>Undo payment</button>}
                        <button className="adm-small adm-ghost" onClick={() => setForm({ ...BLANK, ...s, amount: String(s.amount), start_date: s.start_date || '' })}>Edit</button>
                        <button className="adm-small adm-ghost" disabled={busy} onClick={() => run(() => api('payroll-save', { method: 'POST', body: { ...s, amount: Number(s.amount), active: !s.active } }))}>{s.active ? 'Make inactive' : 'Make active'}</button>
                        {confirmDel === s.id
                          ? <><button className="adm-small" disabled={busy} onClick={() => run(async () => { await api('payroll-delete', { method: 'POST', body: { id: s.id } }); setConfirmDel(null); setOpen(null); })}>Yes, delete (and their history)</button><button className="adm-small adm-ghost" onClick={() => setConfirmDel(null)}>No</button></>
                          : <button className="adm-small adm-ghost" onClick={() => setConfirmDel(s.id)}>Delete</button>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {form && (
        <section className="adm-card">
          <h2>{form.id ? 'Edit person' : 'Add person'}</h2>
          <div className="adm-form two">
            <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label>Role<input value={form.role} placeholder="e.g. Content writer" onChange={(e) => setForm({ ...form, role: e.target.value })} /></label>
            <label>Monthly pay (₦)<input type="number" inputMode="decimal" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></label>
            <label>Email (optional)<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label>Bank<input value={form.bank_name} onChange={(e) => setForm({ ...form, bank_name: e.target.value })} /></label>
            <label>Account name<input value={form.account_name} onChange={(e) => setForm({ ...form, account_name: e.target.value })} /></label>
            <label>Account number<input inputMode="numeric" value={form.account_number} onChange={(e) => setForm({ ...form, account_number: e.target.value })} /></label>
            <label>Start date<input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} /></label>
            <label style={{ gridColumn: '1 / -1' }}>Notes<input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
          </div>
          <div className="adm-inline">
            <button disabled={busy || form.name.trim().length < 2} onClick={saveStaff}>{busy ? 'Saving…' : form.id ? 'Save changes' : 'Add to payroll'}</button>
            <button className="adm-ghost" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </section>
      )}
    </div>
  );
}

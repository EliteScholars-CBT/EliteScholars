import React, { useState, useEffect, useCallback } from 'react';
import { fmtN, fmtNaira, TrendChart, Kpi, Bars } from './AdminCharts';

const dtt = (s) => (s ? new Date(s).toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Lagos' }) : 'never');
const dt = (s) => (s ? new Date(s).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const copy = (t) => { try { navigator.clipboard?.writeText(t); } catch { /* ignore */ } };
const linkFor = (code) => `https://elitescholars.site/?ref=${code}`;

function Chip({ status }) {
  return <span className={`adm-chip ${status}`}>{status.replace('_', ' ')}</span>;
}

export default function AdminPartners({ token, onAuthFail }) {
  const [tab, setTab] = useState('partners');
  const [data, setData] = useState(null);
  const [payouts, setPayouts] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [metric, setMetric] = useState('signups');

  const api = useCallback(async (path, method = 'GET', body) => {
    const r = await fetch(`/api/admin/${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { onAuthFail(d.error); throw new Error('auth'); }
    if (!d.success) throw new Error(d.error || 'Something went wrong.');
    return d;
  }, [token, onAuthFail]);

  const loadOverview = useCallback(async () => {
    setBusy(true);
    try { setData(await api('partners')); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api]);
  const loadPayouts = useCallback(async () => {
    try { setPayouts((await api('payouts')).payouts); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);
  const loadDetail = useCallback(async (id) => {
    try { setDetail(await api(`partner?id=${encodeURIComponent(id)}`)); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);

  useEffect(() => { loadOverview(); loadPayouts(); }, [loadOverview, loadPayouts]);
  useEffect(() => { if (detailId) { setDetail(null); loadDetail(detailId); } }, [detailId, loadDetail]);

  const act = async (path, body, okMsg, after) => {
    setErr(''); setMsg('');
    try {
      const d = await api(path, 'POST', body);
      setMsg(okMsg || 'Done.');
      await Promise.all([loadOverview(), loadPayouts(), detailId ? loadDetail(detailId) : null]);
      if (after) after(d);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  };

  const pendingCount = data ? data.summary.pending : 0;
  const openPayouts = data ? data.summary.openPayouts : 0;

  /* ───────── detail view ───────── */
  if (detailId) {
    return (
      <PartnerDetail
        d={detail} err={err} msg={msg}
        back={() => { setDetailId(null); setDetail(null); setMsg(''); setErr(''); }}
        act={act}
      />
    );
  }

  return (
    <div>
      <div className="adm-tabs adm-subtabs">
        <button className={tab === 'partners' ? 'on' : ''} onClick={() => setTab('partners')}>Partners{pendingCount ? ` (${pendingCount} new)` : ''}</button>
        <button className={tab === 'payouts' ? 'on' : ''} onClick={() => setTab('payouts')}>Payouts{openPayouts ? ` (${openPayouts})` : ''}</button>
        <button className={tab === 'settings' ? 'on' : ''} onClick={() => setTab('settings')}>Programme settings</button>
      </div>
      {err && <div className="adm-error">{err}</div>}
      {msg && <div className="adm-ok">{msg}</div>}
      {!data && busy && <div className="adm-card">Loading partners…</div>}

      {data && tab === 'partners' && (
        <>
          <section className="adm-grid adm-stats">
            <Kpi label="Partners" value={fmtN(data.summary.partners)} sub={`${data.summary.active} active · ${data.summary.pending} pending`} />
            <Kpi label="Referred students" value={fmtN(data.summary.referredStudents)} sub={`${fmtN(data.summary.clicks)} link clicks`} />
            <Kpi label="Paying referrals" value={fmtN(data.summary.payingReferred)} />
            <Kpi label="Commission earned" value={fmtNaira(data.summary.earnedTotal)} />
            <Kpi label="Owed to partners" value={fmtNaira(data.summary.available + data.summary.inPayout)} sub={`${fmtNaira(data.summary.paid)} already paid`} />
            <Kpi label="Payout requests" value={fmtN(openPayouts)} sub={fmtNaira(data.summary.openPayoutAmount)} />
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Programme trend, last 30 days</h2>
              <div className="adm-tabs">
                <button className={metric === 'signups' ? 'on' : ''} onClick={() => setMetric('signups')}>Referred signups</button>
                <button className={metric === 'earnings' ? 'on' : ''} onClick={() => setMetric('earnings')}>Commission</button>
              </div>
            </div>
            <TrendChart labels={data.series.labels} values={data.series[metric]} fmt={metric === 'earnings' ? fmtNaira : fmtN} color={metric === 'earnings' ? '#f5b400' : '#8b5cf6'} />
          </section>

          <section className="adm-card">
            <h2>All partners</h2>
            {!data.partners.length && <p className="adm-empty">No partners yet. Share <b>elitescholars.site/partner</b> with the people you want as affiliates.</p>}
            <div className="adm-ptable">
              {data.partners.map((p) => (
                <div className={`adm-prow ${p.status}`} key={p.id}>
                  <button className="adm-plink" onClick={() => setDetailId(p.id)}>
                    <b>{p.name}</b> <Chip status={p.status} />
                    <small>{p.email} · code {p.code}</small>
                  </button>
                  <div className="adm-pnums">
                    <span><b>{p.rate}%</b>{p.customRate !== null && p.customRate !== undefined ? ' custom' : ' default'}</span>
                    <span><b>{fmtN(p.signups)}</b> signups</span>
                    <span><b>{fmtN(p.paying)}</b> paying</span>
                    <span><b>{fmtNaira(p.earnedTotal)}</b> earned</span>
                    <span><b>{fmtNaira(p.available + p.inPayout)}</b> owed</span>
                  </div>
                  {p.status === 'pending' && (
                    <button className="adm-small" onClick={() => act('partner-action', { action: 'approve', id: p.id }, `${p.name} approved.`)}>Approve</button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {data.partners.some((p) => p.signups) && (
            <section className="adm-card">
              <h2>Top partners by signups</h2>
              <Bars data={[...data.partners].sort((a, b) => b.signups - a.signups).slice(0, 8).map((p) => ({ name: p.name, count: p.signups }))} />
            </section>
          )}
        </>
      )}

      {data && tab === 'payouts' && <Payouts list={payouts} act={act} open={(id) => setDetailId(id)} />}
      {data && tab === 'settings' && <ProgrammeSettings settings={data.settings} act={act} />}
    </div>
  );
}

/* ───────── payouts ───────── */
function Payouts({ list, act, open }) {
  const [ref, setRef] = useState({});
  const [note, setNote] = useState({});
  if (!list) return <div className="adm-card">Loading…</div>;
  const waiting = list.filter((p) => p.status === 'requested');
  const done = list.filter((p) => p.status !== 'requested');
  return (
    <>
      <section className="adm-card">
        <h2>Waiting for you ({waiting.length})</h2>
        {!waiting.length && <p className="adm-empty">No payout requests right now.</p>}
        {waiting.map((p) => (
          <div className="adm-payout" key={p.id}>
            <div className="adm-payout-top">
              <div><b>{p.partner.full_name || p.partner.email}</b><small>{p.partner.email} · {p.partner.phone}</small></div>
              <div className="adm-payout-amt">{fmtNaira(p.amount)}</div>
            </div>
            <div className="adm-bank">
              <span>{p.bankName}</span><span>{p.accountName}</span>
              <span className="adm-acct" onClick={() => copy(p.accountNumber)} title="Tap to copy">{p.accountNumber || 'unavailable'} ⧉</span>
            </div>
            <div className="adm-inline">
              <input placeholder="Bank transfer reference (optional)" value={ref[p.id] || ''} onChange={(e) => setRef({ ...ref, [p.id]: e.target.value })} />
              <button onClick={() => window.confirm(`Confirm you have sent ${fmtNaira(p.amount)} to ${p.accountName}?`) && act('payout-action', { action: 'paid', id: p.id, reference: ref[p.id] || '' }, 'Marked as paid. The partner was notified.')}>Mark paid</button>
            </div>
            <div className="adm-inline">
              <input placeholder="Reason if rejecting" value={note[p.id] || ''} onChange={(e) => setNote({ ...note, [p.id]: e.target.value })} />
              <button className="adm-ghost" onClick={() => act('payout-action', { action: 'reject', id: p.id, note: note[p.id] || '' }, 'Request rejected. Earnings returned to the partner.')}>Reject</button>
            </div>
          </div>
        ))}
      </section>
      <section className="adm-card">
        <h2>History</h2>
        {!done.length && <p className="adm-empty">Nothing processed yet.</p>}
        <div className="adm-table">
          {done.map((p) => (
            <div className="adm-tr adm-tr5" key={p.id}>
              <span><button className="adm-plink" onClick={() => open(p.partner.id)}>{p.partner.full_name || p.partner.email}</button></span>
              <span>{fmtNaira(p.amount)}</span><Chip status={p.status} /><span>{dt(p.processedAt)}</span><span>{p.reference || p.note || ''}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ───────── programme settings ───────── */
function ProgrammeSettings({ settings, act }) {
  const [rate, setRate] = useState(String(settings.defaultRate));
  const [min, setMin] = useState(String(settings.minPayout));
  const [all, setAll] = useState('');
  return (
    <section className="adm-card">
      <h2>Commission rules</h2>
      <p className="adm-note">The default rate applies to every partner who doesn't have their own rate. A rate is locked in at the moment a referred student pays, so changing it only affects future payments.</p>
      <div className="adm-form">
        <label>Default commission (%)
          <div className="adm-inline"><input type="number" min="0" max="100" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} />
            <button onClick={() => act('settings', { defaultRate: Number(rate) }, 'Default rate saved.')}>Save</button></div>
        </label>
        <label>Minimum payout (₦)
          <div className="adm-inline"><input type="number" min="0" step="100" value={min} onChange={(e) => setMin(e.target.value)} />
            <button onClick={() => act('settings', { minPayout: Number(min) }, 'Minimum payout saved.')}>Save</button></div>
        </label>
        <label>Give every partner the same custom rate (%)
          <div className="adm-inline"><input type="number" min="0" max="100" step="0.5" placeholder="e.g. 35" value={all} onChange={(e) => setAll(e.target.value)} />
            <button onClick={() => all !== '' && window.confirm(`Set ${all}% for ALL partners? This replaces any individual rates.`) && act('partner-action', { action: 'bulk-rate', rate: Number(all) }, 'Rate applied to all partners.')}>Apply to all</button></div>
        </label>
        <button className="adm-ghost" onClick={() => window.confirm('Remove every custom rate so all partners follow the default?') && act('partner-action', { action: 'bulk-rate', rate: null }, 'All partners now use the default rate.')}>Reset all partners to the default rate</button>
      </div>
    </section>
  );
}

/* ───────── one partner ───────── */
function PartnerDetail({ d, err, msg, back, act }) {
  const [rate, setRate] = useState('');
  const [code, setCode] = useState('');
  const [notes, setNotes] = useState('');
  const [temp, setTemp] = useState('');
  useEffect(() => {
    if (d) { setRate(d.partner.customRate ?? ''); setCode(d.partner.code); setNotes(d.partner.notes || ''); }
  }, [d]);

  if (!d) return <div><button className="adm-ghost" onClick={back}>← Back</button>{err ? <div className="adm-error">{err}</div> : <div className="adm-card">Loading…</div>}</div>;
  const p = d.partner, k = d.kpis;
  const id = p.id;
  return (
    <div>
      <button className="adm-ghost" onClick={back}>← All partners</button>
      {err && <div className="adm-error">{err}</div>}
      {msg && <div className="adm-ok">{msg}</div>}

      <section className="adm-card">
        <div className="adm-card-head">
          <div><h2 className="adm-name">{p.name} <Chip status={p.status} /></h2>
            <small className="adm-sub">{p.email} · {p.phone} · joined {dt(p.joined)} · last seen {dtt(p.lastLogin)}</small></div>
          <div className="adm-tabs">
            {p.status === 'pending' && <button className="on" onClick={() => act('partner-action', { action: 'approve', id }, 'Approved. They were emailed.')}>Approve</button>}
            {p.status === 'active' && <button className="adm-ghost" onClick={() => window.confirm('Suspend this partner? They will not earn new commission.') && act('partner-action', { action: 'suspend', id }, 'Suspended.')}>Suspend</button>}
            {p.status === 'suspended' && <button className="on" onClick={() => act('partner-action', { action: 'activate', id }, 'Reactivated.')}>Reactivate</button>}
          </div>
        </div>
        <div className="adm-linkbox"><span>{linkFor(p.code)}</span><button className="adm-small" onClick={() => copy(linkFor(p.code))}>Copy link</button></div>
      </section>

      <section className="adm-grid adm-stats">
        <Kpi label="Link clicks" value={fmtN(k.clicks)} />
        <Kpi label="Signups" value={fmtN(k.signups)} sub={k.signups ? `${Math.round((d.students.filter((s) => s.earned > 0).length / k.signups) * 100)}% paid` : ''} />
        <Kpi label="Earned" value={fmtNaira(k.earnedTotal)} />
        <Kpi label="Available" value={fmtNaira(k.available)} />
        <Kpi label="In payout" value={fmtNaira(k.inPayout)} />
        <Kpi label="Paid out" value={fmtNaira(k.paid)} />
      </section>

      <section className="adm-grid adm-two">
        <div className="adm-card">
          <h2>Commission rate</h2>
          <p className="adm-note">Now earning <b>{p.rate}%</b> ({p.customRate !== null && p.customRate !== undefined ? 'custom rate' : `default rate`}).</p>
          <div className="adm-inline">
            <input type="number" min="0" max="100" step="0.5" value={rate} placeholder="e.g. 40" onChange={(e) => setRate(e.target.value)} />
            <button onClick={() => rate !== '' && act('partner-action', { action: 'set-rate', id, rate: Number(rate) }, 'Rate updated.')}>Set rate</button>
            <button className="adm-ghost" onClick={() => act('partner-action', { action: 'set-rate', id, rate: null }, 'Now using the default rate.')}>Use default</button>
          </div>
          <h2 className="adm-gap">Referral code</h2>
          <div className="adm-inline">
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={16} />
            <button onClick={() => act('partner-action', { action: 'set-code', id, code }, 'Code changed. Old links stop working for new signups.')}>Change</button>
          </div>
          <h2 className="adm-gap">Account</h2>
          <button className="adm-ghost" onClick={() => window.confirm('Create a new temporary password for this partner?') && act('partner-action', { action: 'reset-password', id }, 'Temporary password created.', (r) => setTemp(r.tempPassword))}>Reset password</button>
          {temp && <p className="adm-note">Temporary password (tell them to change it): <b className="adm-acct" onClick={() => copy(temp)}>{temp} ⧉</b></p>}
        </div>
        <div className="adm-card">
          <h2>Bank details</h2>
          {p.bank.accountNumber ? (
            <div className="adm-bank col"><span>{p.bank.bankName}</span><span>{p.bank.accountName}</span>
              <span className="adm-acct" onClick={() => copy(p.bank.accountNumber)}>{p.bank.accountNumber} ⧉</span></div>
          ) : <p className="adm-empty">Not added yet.</p>}
          <h2 className="adm-gap">Your private notes</h2>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Only you can see this." />
          <button onClick={() => act('partner-action', { action: 'set-notes', id, notes }, 'Notes saved.')}>Save notes</button>
        </div>
      </section>

      <section className="adm-card">
        <h2>Students referred ({d.students.length})</h2>
        {!d.students.length && <p className="adm-empty">None yet.</p>}
        <div className="adm-table">
          {d.students.map((s) => (
            <div className="adm-tr adm-tr5" key={s.email}><span>{s.email}</span><span>{s.name}</span><span>{dt(s.joined)}</span>
              <span>{s.premium ? 'Pro' : 'Free'}</span><span>{s.earned ? fmtNaira(s.earned) : '—'}</span></div>
          ))}
        </div>
      </section>

      <section className="adm-card">
        <h2>Commissions</h2>
        {!d.commissions.length && <p className="adm-empty">No payments from referred students yet.</p>}
        <div className="adm-table">
          {d.commissions.map((c) => (
            <div className="adm-tr adm-tr5" key={c.id}>
              <span>{c.referred_email}</span><span>{fmtNaira(c.payment_amount)} × {c.rate}% = <b>{fmtNaira(c.amount)}</b></span>
              <span>{dt(c.created_at)}</span><Chip status={c.status} />
              <span>
                {c.status === 'earned' && <button className="adm-small adm-ghost" onClick={() => window.confirm('Cancel this commission (for example after a refund)?') && act('commission-action', { action: 'cancel', id: c.id }, 'Commission cancelled.')}>Cancel</button>}
                {c.status === 'cancelled' && <button className="adm-small" onClick={() => act('commission-action', { action: 'restore', id: c.id }, 'Commission restored.')}>Restore</button>}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="adm-card">
        <h2>Payout history</h2>
        {!d.payouts.length && <p className="adm-empty">No payouts requested yet.</p>}
        <div className="adm-table">
          {d.payouts.map((x) => (
            <div className="adm-tr adm-tr5" key={x.id}><span>{fmtNaira(x.amount)}</span><Chip status={x.status} /><span>{dt(x.requested_at)}</span>
              <span>{dt(x.processed_at)}</span><span>{x.reference || x.note || ''}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}

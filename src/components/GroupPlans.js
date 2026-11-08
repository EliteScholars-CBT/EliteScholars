import React, { useCallback, useEffect, useState } from 'react';
import { initiatePayment } from '../utils/profileApi';
import Icon from './Icon';
import { getActiveExam, scopeForExam } from '../utils/entitlement';

const FMT = (n) => Number(n || 0).toLocaleString('en-NG');
const when = (iso) => { try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return ''; } };

// Group plans for the shop: two cards (50 or 100 members, one year) and, for owners, a place to add / remove members.
export default function GroupPlans({ userEmail, name, pricing }) {
  const [buying, setBuying] = useState('');
  const [err, setErr] = useState('');
  const [groups, setGroups] = useState([]);
  const [email, setEmail] = useState({});
  const [busy, setBusy] = useState('');
  const [note, setNote] = useState('');

  const exam = getActiveExam();
  const mine = scopeForExam(exam) || 'waec_neco';
  const ORDER = [mine, ...['jamb', 'waec_neco', 'gst'].filter((x) => x !== mine)];
  const EXAMS = {
    jamb: { label: 'JAMB', ids: ['group50', 'group100'], one: (pricing.plans && pricing.plans.jamb) || pricing.premiumAnnual || 3000 },
    waec_neco: { label: 'WAEC & NECO', ids: ['group50_waec', 'group100_waec'], one: (pricing.plans && pricing.plans.waecneco12) || 8000 },
    gst: { label: 'GST', ids: ['group50_gst', 'group100_gst'], one: (pricing.plans && pricing.plans.gst12) || 8000 },
  };
  const [tab, setTab] = useState(mine);
  const ex = EXAMS[tab];
  const fallback = { group50: 145000, group100: 285000 };
  const priceOfId = (id) => (pricing.groups && pricing.groups[id]) || pricing[id] || fallback[id] || 0;
  const PLANS = ex.ids.map((id, i) => ({ id, seats: i === 0 ? 50 : 100, price: priceOfId(id), hue: i === 0 ? '#8B5CF6' : '#F59E0B', best: i === 1 }));

  const load = useCallback(() => {
    fetch('/api/group/get').then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && j.groups) setGroups(j.groups); }).catch(() => {});
  }, []);
  useEffect(() => { if (userEmail) load(); }, [userEmail, load]);

  const buy = async (id) => {
    if (buying) return;
    setErr(''); setBuying(id);
    try {
      const r = await initiatePayment({ email: userEmail, name, plan: id });
      if (r && r.success && r.paymentLink) { window.location.href = r.paymentLink; return; }
      setErr((r && r.error) || 'Could not start payment. Try again.');
    } catch { setErr('Network error. Check your connection.'); }
    setBuying('');
  };

  const act = async (op, groupId, who) => {
    setBusy(`${op}${groupId}${who}`); setNote(''); setErr('');
    try {
      const r = await fetch(`/api/group/${op}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ groupId, email: who }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) setErr(j.error || 'That did not work. Try again.');
      else { setGroups(j.groups || []); if (op === 'add') { setEmail((e) => ({ ...e, [groupId]: '' })); setNote('Added. They now have Pro.'); } else setNote('Removed.'); }
    } catch { setErr('Network error. Check your connection.'); }
    setBusy('');
  };

  return (
    <section className="grp">
      <div className="grp-head">
        <div className="grp-title"><Icon name="users" size={18} /> Squad plan</div>
        <div className="grp-sub">Get Pro for a whole squad at a lower price per person. Pick the exam your squad is preparing for.</div>
      </div>
      <div className="grp-tabs" role="tablist">
        {ORDER.map((k) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{EXAMS[k].label}</button>)}
      </div>

      <div className="grp-cards">
        {PLANS.map((p) => {
          const save = p.seats * ex.one - p.price;
          return (
            <div key={p.id} className={`grp-card${p.best ? ' best' : ''}`} style={{ '--hue': p.hue }}>
              {p.best && <span className="grp-flag">Best value</span>}
              <div className="grp-seats">{p.seats}<small>people</small></div>
              <div className="grp-term">{ex.label} Pro · 1 year</div>
              <div className="grp-price"><span>₦</span>{FMT(p.price)}<em> / year</em></div>
              <div className="grp-per">₦{FMT(Math.round(p.price / p.seats))} per person</div>
              {save > 0 && <div className="grp-save">You save ₦{FMT(save)}</div>}
              <button className="grp-buy" disabled={!!buying} onClick={() => buy(p.id)}>{buying === p.id ? 'Opening payment…' : `Get ${ex.label} squad`}</button>
            </div>
          );
        })}
      </div>
      {err && <div className="grp-err">{err}</div>}

      {groups.map((g) => (
        <div key={g.id} className="grp-mine">
          <div className="grp-mine-top"><b>Your {g.label ? `${g.label} ` : ''}squad of {g.seats}</b><span>{g.used}/{g.seats} used · {g.active ? `until ${when(g.expiresAt)}` : 'expired'}</span></div>
          {g.active && (
            <div className="grp-add">
              <input value={email[g.id] || ''} onChange={(e) => setEmail((x) => ({ ...x, [g.id]: e.target.value }))} placeholder="Member's email (they must have signed up)" inputMode="email" autoCapitalize="off" />
              <button disabled={!!busy || !(email[g.id] || '').trim()} onClick={() => act('add', g.id, email[g.id])}>{busy.startsWith('add') ? '…' : 'Add'}</button>
            </div>
          )}
          {note && <div className="grp-note">{note}</div>}
          {g.members.length ? (
            <div className="grp-members">
              {g.members.map((m) => (
                <div key={m.email} className="grp-member"><span><b>{m.name || m.email.split('@')[0]}</b><small>{m.email}</small></span><button onClick={() => act('remove', g.id, m.email)} disabled={!!busy}>Remove</button></div>
              ))}
            </div>
          ) : <div className="grp-empty">Nobody invited yet. Add the first person above.</div>}
        </div>
      ))}
    </section>
  );
}

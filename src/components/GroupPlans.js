import React, { useCallback, useEffect, useState } from 'react';
import { initiatePayment } from '../utils/profileApi';
import Icon from './Icon';

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

  const PLANS = [
    { id: 'group50', seats: 50, price: pricing.group50 ?? 145000, hue: '#8B5CF6' },
    { id: 'group100', seats: 100, price: pricing.group100 ?? 285000, hue: '#F59E0B', best: true },
  ];

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

  const solo = Number(pricing.premiumAnnual) || 3000; // what one person pays for Pro alone
  return (
    <section className="grp">
      <div className="grp-head">
        <div className="grp-title"><Icon name="users" size={18} /> Squad plan</div>
        <div className="grp-sub">Form a squad, get Pro together and invite them. Everyone studies without limits.</div>
      </div>

      <div className="grp-cards">
        {PLANS.map((p) => {
          const save = p.seats * solo - p.price;
          return (
            <div key={p.id} className={`grp-card${p.best ? ' best' : ''}`} style={{ '--hue': p.hue }}>
              {p.best && <span className="grp-flag">Best value</span>}
              <div className="grp-seats">{p.seats}<small>people</small></div>
              <div className="grp-price"><span>₦</span>{FMT(p.price)}<em> / year</em></div>
              {save > 0 && <div className="grp-save">You save ₦{FMT(save)}</div>}
              <button className="grp-buy" disabled={!!buying} onClick={() => buy(p.id)}>{buying === p.id ? 'Opening payment…' : 'Get Squad plan'}</button>
            </div>
          );
        })}
      </div>
      {err && <div className="grp-err">{err}</div>}

      {groups.map((g) => (
        <div key={g.id} className="grp-mine">
          <div className="grp-mine-top"><b>Your squad of {g.seats}</b><span>{g.used}/{g.seats} used · {g.active ? `until ${when(g.expiresAt)}` : 'expired'}</span></div>
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

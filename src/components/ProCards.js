import React, { useState, useRef, useEffect, useCallback } from 'react';
import { initiatePayment } from '../utils/profileApi';
import { orderedProducts, priceOf, SCOPE_NAME } from '../utils/proPlans';
import { getActiveExam, scopeForExam } from '../utils/entitlement';

const FMT = (n) => (n == null ? '0' : Number(n).toLocaleString('en-NG'));

// Swipeable Pro cards. The student's own exam comes first; the next cards peek in from the right.
// Used in the Shop and in the "Go Pro" popup. Payment starts straight from the card.
export default function ProCards({ email, name, pricing, exam, status, startScope, compact }) {
  const examNow = exam || getActiveExam();
  const products = orderedProducts(examNow);
  const mineScope = scopeForExam(examNow);
  const [opt, setOpt] = useState({});        // scope -> chosen option id
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const [idx, setIdx] = useState(0);
  const track = useRef(null);

  const pick = (p) => opt[p.scope] || p.options[p.options.length - 1].id; // longest plan preselected when there are two

  const onScroll = useCallback(() => {
    const el = track.current; if (!el) return;
    const kids = Array.from(el.children);
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0, d = 1e9;
    kids.forEach((k, i) => { const c = k.offsetLeft + k.offsetWidth / 2; const dd = Math.abs(c - mid); if (dd < d) { d = dd; best = i; } });
    setIdx(best);
  }, []);

  const go = (i) => {
    const el = track.current; if (!el) return;
    const k = el.children[Math.max(0, Math.min(products.length - 1, i))];
    if (k) el.scrollTo({ left: k.offsetLeft - (el.clientWidth - k.offsetWidth) / 2, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!startScope) return;
    const i = products.findIndex((p) => p.scope === startScope);
    if (i > 0) setTimeout(() => go(i), 60);
  }, []); // eslint-disable-line

  const buy = async (planId, scope) => {
    if (busy) return;
    setErr(''); setBusy(scope);
    try {
      const r = await initiatePayment({ email, name, plan: planId });
      if (!r || !r.success || !r.paymentLink) { setErr((r && r.error) || 'Could not start payment. Please try again.'); setBusy(''); return; }
      window.location.href = r.paymentLink;
    } catch { setErr('Network error. Check your connection.'); setBusy(''); }
  };

  return (
    <div className={`pcs${compact ? ' pcs--compact' : ''}`}>
      <div className="pcs-wrap">
        <button type="button" className="pcs-nav pcs-nav--l" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Previous plan">‹</button>
        <div className="pcs-track" ref={track} onScroll={onScroll}>
          {products.map((p) => {
            const chosen = p.options.find((o) => o.id === pick(p)) || p.options[0];
            const price = priceOf(pricing, chosen);
            const until = status && status.exams && status.exams[p.scope];
            const untilStr = until ? ((status.examsStr && status.examsStr[p.scope]) || new Date(until).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })) : '';
            const yours = p.scope === mineScope;
            const six = p.options.length > 1 ? priceOf(pricing, p.options[0]) : 0;
            const save = p.options.length > 1 && chosen.id === p.options[p.options.length - 1].id ? six * 2 - price : 0;
            return (
              <div key={p.scope} className={`pcs-card${yours ? ' pcs-card--yours' : ''}`} style={{ '--pc': p.color }}>
                {(until || yours) && <span className="pcs-tag">{until ? 'ACTIVE' : 'YOUR EXAM'}</span>}
                <div className="pcs-head"><span className="pcs-emoji">{p.emoji}</span><span className="pcs-name">{p.label}</span></div>
                {p.options.length > 1 && (
                  <div className="pcs-opts" role="radiogroup" aria-label="Plan length">
                    {p.options.map((o) => (
                      <button type="button" key={o.id} role="radio" aria-checked={chosen.id === o.id} className={`pcs-opt${chosen.id === o.id ? ' on' : ''}`} onClick={() => setOpt((m) => ({ ...m, [p.scope]: o.id }))}>{o.period}</button>
                    ))}
                  </div>
                )}
                <div className="pcs-price"><span className="pcs-cur">₦</span><span className="pcs-amt">{FMT(price)}</span><span className="pcs-per"> / {chosen.period}</span></div>
                {save > 0 && <div className="pcs-save">Save ₦{FMT(save)}</div>}
                {until && <div className="pcs-until">Active until {untilStr}</div>}
                <div className="pcs-pitch">{p.pitch}</div>
                <ul className="pcs-feats">{p.features.map((f, i) => (<li key={i}><span>✓</span>{f}</li>))}</ul>
                <button type="button" className="pcs-cta" onClick={() => buy(chosen.id, p.scope)} disabled={!!busy}>
                  {busy === p.scope ? 'Opening payment…' : until ? `Add more time · ${SCOPE_NAME[p.scope]}` : `Get ${p.label} · ₦${FMT(price)}`}
                </button>
              </div>
            );
          })}
        </div>
        <button type="button" className="pcs-nav pcs-nav--r" onClick={() => go(idx + 1)} disabled={idx >= products.length - 1} aria-label="Next plan">›</button>
      </div>
      <div className="pcs-dots" aria-hidden>{products.map((p, i) => (<i key={p.scope} className={i === idx ? 'on' : ''} />))}</div>
      {err && <div className="pcs-err">{err}</div>}
    </div>
  );
}

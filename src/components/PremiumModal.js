import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { initiatePayment, fetchShopData } from '../utils/profileApi';
import { getActiveExam } from '../utils/entitlement';
import { PRO_PRODUCTS, productFor, productOfPlan, defaultScope, priceOf } from '../utils/proPlans';
import Icon, { EmojiIcon } from './Icon';

const FMT = (n) => n?.toLocaleString('en-NG') ?? '0';

// Pro is bought per exam: JAMB, WAEC & NECO, or GST. It opens on the exam the student is working in.
export default function PremiumModal({ email, name, onClose, onActivated, initialPlan, pricing: pricingProp = {}, examType }) {
  const startScope = (initialPlan && initialPlan !== 'annual' && productOfPlan(initialPlan)?.scope) || (initialPlan === 'annual' ? 'jamb' : null) || defaultScope(examType || getActiveExam());
  const [scope, setScope] = useState(startScope);
  const [optId, setOptId] = useState(null);
  const [pricing, setPricing] = useState(pricingProp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Callers that don't pass prices (limit screen, profile, file study): fetch the live ones.
  useEffect(() => {
    if (pricing && pricing.plans) return;
    let off = false;
    fetchShopData().then((d) => { if (!off && d && d.pricing) setPricing(d.pricing); }).catch(() => {});
    return () => { off = true; };
  }, []); // eslint-disable-line

  const product = productFor(scope);
  const opt = product.options.find((o) => o.id === optId) || product.options[0];
  const price = priceOf(pricing, opt);
  const longest = product.options[product.options.length - 1];
  const sixPrice = product.options.length > 1 ? priceOf(pricing, product.options[0]) : 0;
  const saving = product.options.length > 1 && opt.id === longest.id ? sixPrice * 2 - priceOf(pricing, longest) : 0;

  const handleSubscribe = async () => {
    setError(''); setLoading(true);
    try {
      const result = await initiatePayment({ email, name, plan: opt.id });
      if (!result.success || !result.paymentLink) { setError(result.error || 'Failed to initiate payment. Please try again.'); setLoading(false); return; }
      window.location.href = result.paymentLink;
    } catch { setError('Network error. Please check your connection.'); setLoading(false); }
  };

  return createPortal(
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm-sheet">
        <div className="pm-glow" style={{ background: product.glow }} />
        <button className="pm-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>

        <div className="pm-header">
          <span className="pm-crown"><EmojiIcon emoji="👑" size="1.1em" /></span>
          <div className="pm-title">Go Pro</div>
          <div className="pm-subtitle">Pick the exam you are preparing for.</div>
        </div>

        <div className="pm-pills" role="tablist" aria-label="Exam">
          {PRO_PRODUCTS.map((p) => (
            <button key={p.scope} role="tab" aria-selected={scope === p.scope} className={`pm-pill${scope === p.scope ? ' pm-pill--active' : ''}`}
              style={scope === p.scope ? { borderColor: p.color, color: p.color } : undefined} onClick={() => { setScope(p.scope); setOptId(null); setError(''); }}>
              {p.emoji} {p.label.replace(' Pro', '')}
            </button>
          ))}
        </div>

        <div className="pm-card" style={{ borderColor: `${product.color}55` }}>
          {product.options.length > 1 && (
            <div className="pm-pills" style={{ marginBottom: 10 }}>
              {product.options.map((o) => (
                <button key={o.id} className={`pm-pill${opt.id === o.id ? ' pm-pill--active' : ''}`} style={opt.id === o.id ? { borderColor: product.color, color: product.color } : undefined} onClick={() => setOptId(o.id)}>
                  {o.period} · ₦{FMT(priceOf(pricing, o))}
                </button>
              ))}
            </div>
          )}
          <div className="pm-price-block">
            <div className="pm-price-row">
              <span className="pm-currency">₦</span>
              <span className="pm-amount" style={{ color: product.color }}>{FMT(price)}</span>
              <span className="pm-period">/ {opt.period}</span>
            </div>
            {saving > 0 && <div className="pm-price-was"><span className="pm-price-was-badge">Save ₦{FMT(saving)} vs 2 × 6 months</span></div>}
            <div className="pm-pitch">{product.pitch}</div>
          </div>
          <div className="pm-divider" style={{ background: `${product.color}33` }} />
          <div className="pm-features">
            {product.features.map((f, i) => (<div key={i} className="pm-feature"><span className="pm-feature-icon">✅</span><span className="pm-feature-text">{f}</span></div>))}
          </div>
          <div className="pm-pro-note">Pro for {product.label.replace(' Pro', '')} only. Other exams stay on the free plan until you add them.</div>
        </div>

        {error && <div className="pm-error">{error}</div>}

        <button className="pm-cta" style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}bb)` }} onClick={handleSubscribe} disabled={loading}>
          {loading ? '⏳ Redirecting to payment…' : `${product.emoji} Get ${product.label} — ₦${FMT(price)} / ${opt.period}`}
        </button>
        <div className="pm-trust"><EmojiIcon emoji="🔒" size="1.15em" /> Secured by Flutterwave · No hidden fees</div>
      </div>
    </div>,
    document.body
  );
}

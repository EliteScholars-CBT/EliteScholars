import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { initiatePayment } from '../utils/profileApi';
import Icon, { EmojiIcon } from './Icon';

const FMT = (n) => n?.toLocaleString('en-NG') ?? '0';

export default function PremiumModal({
  email,
  name,
  onClose,
  onActivated,
  initialPlan = 'annual',
  pricing = {},
}) {
  const [plan] = useState('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // All prices from API via props, frontend values as fallback only.
  // Premium is annual-only — no monthly tier.
  const annualPrice   = pricing.premiumAnnual ?? 3000;
  const originalPrice = pricing.premiumAnnualOriginal ?? 15000;
  const annualSavings = originalPrice - annualPrice;
  const annualDiscountPct = Math.round((annualSavings / originalPrice) * 100);

  const PLANS = {
    annual: {
      id: 'annual',
      name: 'Premium',
      emoji: '👑',
      price: annualPrice,
      originalPrice,
      period: '/year',
      color: '#FFC53D',
      glow: 'rgba(255,197,61,0.30)',
      tag: `${annualDiscountPct}% OFF`,
      pitch: 'Everything, unlocked, for a full year.',
      features: [
        { icon: '♾️', text: 'Unlimited topics, every exam' },
        { icon: '⏱️', text: 'Unlimited sessions, no time limit' },
        { icon: '🚫', text: 'Zero cooldown, ever' },
        { icon: '🚫', text: 'Zero ads, completely' },
        { icon: '📚', text: 'WAEC, NECO, JAMB & GST' },
        { icon: '🎮', text: 'All games unlocked' },
        { icon: '📤', text: 'Unlimited file uploads & study packs' },
        { icon: '⚔️', text: 'Unlimited challenges & squads' },
        { icon: '📶', text: 'Full offline access' },
        { icon: '💬', text: 'Priority support' },
        { icon: '💰', text: `Save ₦${FMT(annualSavings)} — was ₦${FMT(originalPrice)}` },
      ],
    },
  };

  const current = PLANS[plan] || PLANS.annual;

  const handleSubscribe = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await initiatePayment({ email, name, plan });
      if (!result.success || !result.paymentLink) {
        setError(result.error || 'Failed to initiate payment. Please try again.');
        setLoading(false);
        return;
      }
      window.location.href = result.paymentLink;
    } catch {
      setError('Network error. Please check your connection.');
      setLoading(false);
    }
  };

  // Rendered into <body>: inside a transformed/animated screen, position:fixed is
  // measured from that screen, which pushed the sheet below the visible area.
  return createPortal(
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm-sheet">
        {/* Ambient glow blob */}
        <div className="pm-glow" style={{ background: current.glow }} />

        {/* Close */}
        <button className="pm-close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={16} />
        </button>

        {/* Header */}
        <div className="pm-header">
          <span className="pm-crown"><EmojiIcon emoji="👑" size="1.1em" /></span>
          <div className="pm-title">Go Premium</div>
          <div className="pm-subtitle">Unlock your full potential. No limits.</div>
        </div>

        {/* Plan card */}
        <div className="pm-card" style={{ borderColor: `${current.color}55` }}>
          {/* Price */}
          <div className="pm-price-block">
            {current.originalPrice && (
              <div className="pm-price-was">
                <span className="pm-price-was-strike">₦{FMT(current.originalPrice)}</span>
                <span className="pm-price-was-badge">{current.tag}</span>
              </div>
            )}
            <div className="pm-price-row">
              <span className="pm-currency">₦</span>
              <span className="pm-amount" style={{ color: current.color }}>
                {FMT(current.price)}
              </span>
              <span className="pm-period">{current.period}</span>
            </div>
            <div className="pm-pitch">{current.pitch}</div>
          </div>

          {/* Divider */}
          <div className="pm-divider" style={{ background: `${current.color}33` }} />

          {/* Features */}
          <div className="pm-features">
            {current.features.map((f, i) => (
              <div key={i} className="pm-feature">
                <span className="pm-feature-icon">{f.icon}</span>
                <span className="pm-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <div className="pm-error">{error}</div>}

        {/* CTA */}
        <button
          className="pm-cta"
          style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}bb)` }}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading
            ? '⏳ Redirecting to payment…'
            : `${current.emoji} Subscribe — ₦${FMT(current.price)}${current.period}`}
        </button>

        <div className="pm-trust"><EmojiIcon emoji="🔒" size="1.15em" /> Secured by Flutterwave · Cancel anytime · No hidden fees</div>
      </div>
    </div>,
    document.body
  );
}

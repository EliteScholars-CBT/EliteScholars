import React, { useState } from 'react';
import { initiatePayment } from '../utils/profileApi';
import { EmojiIcon } from './Icon';

const FMT = (n) => n?.toLocaleString('en-NG') ?? '0';

export default function PremiumModal({
  email,
  name,
  onClose,
  onActivated,
  initialPlan = 'monthly',
  pricing = {},
}) {
  const [plan, setPlan] = useState(initialPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // All prices from API via props, frontend values as fallback only
  const proPrice = pricing.pro ?? 3000;
  const monthlyPrice = pricing.premiumMonthly ?? 9000;
  const annualPrice = pricing.premiumAnnual ?? 89000;
  const annualSavings = monthlyPrice * 12 - annualPrice;
  const annualDiscountPct = Math.round((annualSavings / (monthlyPrice * 12)) * 100);

  const PLANS = {
    pro: {
      id: 'pro',
      name: 'Pro',
      emoji: '🚀',
      price: proPrice,
      period: '/month',
      color: '#8B5CF6',
      glow: 'rgba(108,63,201,0.35)',
      tag: null,
      pitch: 'Essential access, no limits.',
      features: [
        { icon: '♾️', text: 'Unlimited topics' },
        { icon: '⏱️', text: 'Unlimited sessions' },
        { icon: '🚫', text: 'No cooldown' },
        { icon: '📉', text: 'Ads reduced' },
        { icon: '📚', text: 'All 5 exam types' },
      ],
    },
    monthly: {
      id: 'monthly',
      name: 'Premium',
      emoji: '⭐',
      price: monthlyPrice,
      period: '/month',
      color: '#FFC53D',
      glow: 'rgba(255, 197, 61,0.30)',
      tag: 'Most Popular',
      pitch: 'Full power, month by month.',
      features: [
        { icon: '♾️', text: 'Unlimited topics' },
        { icon: '⏱️', text: 'Unlimited sessions' },
        { icon: '🚫', text: 'Zero cooldown, ever' },
        { icon: '🚫', text: 'Zero ads' },
        { icon: '📚', text: 'All 5 exam types' },
        { icon: '💬', text: 'Priority support' },
      ],
    },
    annual: {
      id: 'annual',
      name: 'Annual',
      emoji: '👑',
      price: annualPrice,
      period: '/year',
      color: '#22C55E',
      glow: 'rgba(34,197,94,0.28)',
      tag: `Save ${annualDiscountPct}%`,
      pitch: 'Best value. Pay once, win all year.',
      features: [
        { icon: '♾️', text: 'Unlimited topics' },
        { icon: '⏱️', text: 'Unlimited sessions' },
        { icon: '🚫', text: 'Zero cooldown, ever' },
        { icon: '🚫', text: 'Zero ads' },
        { icon: '📚', text: 'All 5 exam types' },
        { icon: '💬', text: 'Priority support' },
        { icon: '💰', text: `Save ₦${FMT(annualSavings)} vs monthly` },
      ],
    },
  };

  const current = PLANS[plan] || PLANS.monthly;

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

  return (
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm-sheet">
        {/* Ambient glow blob */}
        <div className="pm-glow" style={{ background: current.glow }} />

        {/* Close */}
        <button className="pm-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Header */}
        <div className="pm-header">
          <span className="pm-crown"><EmojiIcon emoji="👑" size="1.1em" /></span>
          <div className="pm-title">Go Premium</div>
          <div className="pm-subtitle">Unlock your full potential. No limits.</div>
        </div>

        {/* Plan pills */}
        <div className="pm-pills">
          {Object.values(PLANS).map((p) => (
            <button
              key={p.id}
              className={`pm-pill ${plan === p.id ? 'pm-pill--active' : ''}`}
              style={plan === p.id ? { borderColor: p.color, color: p.color } : {}}
              onClick={() => {
                setPlan(p.id);
                setError('');
              }}
            >
              {p.emoji} {p.name}
              {p.tag && (
                <span className="pm-pill-tag" style={{ background: p.color }}>
                  {p.tag}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plan card */}
        <div className="pm-card" style={{ borderColor: `${current.color}55` }}>
          {/* Price */}
          <div className="pm-price-block">
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

        {/* Annual savings callout */}
        {plan === 'annual' && (
          <div className="pm-savings-pill">
            🎉 You save ₦{FMT(annualSavings)} compared to monthly billing
          </div>
        )}

        {/* Pro note */}
        {plan === 'pro' && (
          <div className="pm-pro-note">
            💡 Pro gives core unlimited access. Upgrade to Premium for zero ads &amp; priority
            support.
          </div>
        )}

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
    </div>
  );
}

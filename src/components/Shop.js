import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../utils/constants';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { isPremium, getPremiumData, cancelPremium } from '../utils/premium';
import { fetchShopData, fetchPremiumStatus } from '../utils/profileApi';
import { initiatePayment } from '../utils/profileApi';
import PremiumModal from './PremiumModal';
import Icon, { EmojiIcon } from './Icon';

const CATEGORY_ICON = {
  Notes: 'pen',
  'Cheat Sheet': 'ruler',
  Bundle: 'cap',
  Guide: 'bulb',
  Comics: 'bookOpen',
};

// ── Fallback SVG when image is missing ───────────────────────────────────────
function ShopItemPlaceholder({ category, color = '#8B5CF6' }) {
  return (
    <div className="shop-item-placeholder" style={{ background: `${color}12`, color }}>
      <Icon name={CATEGORY_ICON[category] || 'shop'} size={26} />
      <span className="shop-item-placeholder-label">{category}</span>
    </div>
  );
}

// ── Secure image URL — only allow our own /shop/ path ────────────────────────
function getImageUrl(filename) {
  if (!filename) return null;
  // Strip any path traversal attempts, allow only filename
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '');
  if (!safe || safe !== filename) return null;
  return `/shop/${safe}`;
}

export default function Shop({ userEmail, name, premiumUser, onPremiumActivated }) {
  const [showPremium, setShowPremium]             = useState(false);
  const [selectedPlan, setSelectedPlan]           = useState('annual');
  const [localPremium, setLocalPremium]           = useState(premiumUser);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [shopItems, setShopItems]                 = useState([]);
  const [pricing, setPricing]                     = useState({});
  const [premData, setPremData]                   = useState(getPremiumData(userEmail));
  const [loadingShop, setLoadingShop]             = useState(true);
  const [buying, setBuying]                       = useState('');
  const [buyErr, setBuyErr]                       = useState('');

  // Pay in-app (Flutterwave); fall back to the old external link if that fails.
  const buyItem = async (item) => {
    if (buying) return;
    setBuyErr(''); setBuying(item.id);
    try {
      const r = await initiatePayment({ email: userEmail, name, item: item.id });
      if (r && r.success && r.paymentLink) { window.location.href = r.paymentLink; return; }
      if (item.link) { window.open(item.link, '_blank', 'noopener'); }
      else setBuyErr((r && r.error) || 'Could not start payment. Try again.');
    } catch {
      if (item.link) window.open(item.link, '_blank', 'noopener');
      else setBuyErr('Network error. Check your connection.');
    }
    setBuying('');
  };

  const FMT = (n) => n?.toLocaleString('en-NG') ?? '0';

  // ── Derived pricing — Premium is annual-only, no monthly tier ─────────────
  const annualPrice       = pricing.premiumAnnual           ?? 3000;
  const originalPrice     = pricing.premiumAnnualOriginal   ?? 15000;
  const annualSavings     = originalPrice - annualPrice;
  const annualDiscountPct = Math.round((annualSavings / originalPrice) * 100);

  // ── Fetch shop data ────────────────────────────────────────────────────────
  useEffect(() => {
    fetchShopData()
      .then(data => {
        if (data?.items)   setShopItems(data.items);
        if (data?.pricing) setPricing(data.pricing);
      })
      .catch(() => {})
      .finally(() => setLoadingShop(false));
  }, []);

  // ── Check server-side premium status ───────────────────────────────────────
  useEffect(() => {
    if (!userEmail) return;
    fetchPremiumStatus(userEmail).then(data => {
      if (data?.isPremium) {
        setLocalPremium(true);
        setPremData({ plan: data.plan, expiresDateStr: data.expiresStr });
      }
    }).catch(() => {});
  }, [userEmail]);

  // ── Payment redirect check ─────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success' && params.get('plan') !== 'shop' && params.get('email') === userEmail) {
      const plan = params.get('plan') || 'annual';
      setLocalPremium(true);
      if (onPremiumActivated) onPremiumActivated({ plan });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [userEmail]);

  // ── Shop visited achievement ───────────────────────────────────────────────
  useEffect(() => {
    if (!userEmail) return;
    const existing = loadAchievements(userEmail);
    if (!existing.some((a) => a?.id === 'shopShopper')) {
      saveAchievements([...existing, ACHIEVEMENTS.shopShopper], userEmail);
    }
  }, [userEmail]);

  const openPlan = (planId) => {
    if (planId === 'free') return;
    const subscriptionPlan = planId === 'premium' ? 'annual' : planId;
    setSelectedPlan(subscriptionPlan);
    setShowPremium(true);
  };

  const handlePremiumActivated = (data) => {
    setLocalPremium(true);
    setShowPremium(false);
    if (onPremiumActivated) onPremiumActivated(data);
  };

  const handleCancel = () => {
    cancelPremium(userEmail);
    setLocalPremium(false);
    setShowCancelConfirm(false);
  };

  const regularItems = shopItems.filter((i) => !i.isPremium);
  const categories   = [...new Set(regularItems.map((i) => i.category))];

  const COMPARE_PLANS = [
    {
      id: 'free', label: 'Free', icon: '🎓', tag: null,
      features: ['Limited topics', 'Limited sessions', 'Has cooldown', 'Ads shown', 'All exam types'],
      highlight: false, ctaDisabled: true,
    },
    {
      id: 'premium', label: 'Premium', icon: '👑', tag: `${annualDiscountPct}% OFF`,
      price: annualPrice, originalPrice, period: '/yr',
      features: [
        'Unlimited topics, every exam', 'Unlimited sessions, no time limit', 'Zero cooldown, ever',
        'Zero ads, completely', 'WAEC, NECO, JAMB & GST', 'All 6 arcade games unlocked',
        'Unlimited file uploads & study packs', 'Unlimited challenges & squads', 'Full offline access',
        'Priority support',
      ],
      highlight: true,
    },
  ];

  const getPlanPricing = (plan) => {
    if (plan.id === 'free') return { price: 0, period: '', isDisabled: false };
    return { price: plan.price, period: plan.period, isDisabled: false };
  };

  return (
    <div className="scr fd shop-page">

      {/* ── Header ── */}
      <div className="shop-header">
        <div className="shop-header-glow" />
        <div className="shop-header-content">
          <div className="shop-title"><EmojiIcon emoji="🛍️" size="1.15em" /> Elite Shop</div>
      </div>
      </div>
      <div className="shop-body">

        {/* ── Premium active ── */}
        {localPremium ? (
          <div className="shop-premium-active">
            <div className="shop-premium-active-glow" />
            <div className="shop-premium-active-badge"><EmojiIcon emoji="⭐" size="1.15em" /> Premium Active</div>
            <div className="shop-premium-active-plan">
              {premData?.plan === 'pro' ? 'Pro Plan' : 'Premium Annual Plan'}
            </div>
            {premData?.expiresDateStr && (
              <div className="shop-premium-active-expiry">
                Expires: {premData.expiresDateStr}
              </div>
            )}
            <div className="shop-premium-active-perks">
              <span><EmojiIcon emoji="✅" size="1.15em" /> Ad-free</span>
              <span><EmojiIcon emoji="✅" size="1.15em" /> Unlimited practice</span>
              <span><EmojiIcon emoji="✅" size="1.15em" /> All subjects</span>
            </div>
            {!showCancelConfirm ? (
              <button
                className="shop-premium-manage-btn"
                onClick={() => setShowCancelConfirm(true)}
              >
                Manage Subscription
              </button>
            ) : (
              <div className="shop-cancel-confirm">
                <button className="shop-cancel-yes" onClick={handleCancel}>
                  Cancel Premium
                </button>
                <button className="shop-cancel-no" onClick={() => setShowCancelConfirm(false)}>
                  Keep Premium
                </button>
              </div>
            )}
          </div>

        ) : (

          /* ── Plans section ── */
          <div className="shop-plans-section">
            <div className="shop-plans-card">

              {/* Header row */}
              <div className="shop-plans-card-header">
                <div className="shop-plans-card-title">Compare Plans</div>
                <div className="shop-plans-card-sub">One plan, one price: Premium for the full year.</div>
              </div>

              {/* Plans grid */}
              <div className="shop-plans-grid">
                {COMPARE_PLANS.map(plan => {
                  const { price, period } = getPlanPricing(plan);
                  return (
                    <div
                      key={plan.id}
                      className={`shop-plan-col ${plan.highlight ? 'shop-plan-col--highlight' : ''}`}
                    >
                      {plan.tag && (
                        <div className="shop-plan-badge">{plan.tag}</div>
                      )}
                      <div className="shop-plan-col-top">
                        <div className="shop-plan-icon">{plan.icon}</div>
                        <div>
                          <div className="shop-plan-name">{plan.label}</div>
                          <div className="shop-plan-price">
                            {plan.id === 'free' ? (
                              <span className="shop-plan-free">Free</span>
                            ) : (
                              <>
                                {plan.originalPrice && (
                                  <span className="shop-plan-was">₦{FMT(plan.originalPrice)}</span>
                                )}
                                <span>
                                  <span className="shop-plan-currency">₦</span>
                                  <span className="shop-plan-amount">{FMT(price)}</span>
                                  <span className="shop-plan-period">{period}</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="shop-plan-features">
                        {plan.features.map((f, i) => (
                          <div key={i} className="shop-plan-feature">
                            <span className="shop-plan-check">✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className={`shop-plan-cta ${plan.highlight ? 'shop-plan-cta--primary' : 'shop-plan-cta--secondary'}`}
                        disabled={plan.id === 'free'}
                        onClick={() => openPlan(plan.id)}
                      >
                        {plan.id === 'free' ? 'Current' : `Get ${plan.label}`}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="shop-plans-trust">
                🔒 Secured by Flutterwave · Cancel anytime · No hidden fees
              </div>
            </div>
          </div>
        )}

        {/* ── Shop items ── */}
        {loadingShop ? (
          <div className="shop-loading">
            <div className="shop-loading-spinner" />
            <span>Loading items...</span>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="shop-category-section">
              <div className="shop-category-label"><Icon name={CATEGORY_ICON[cat] || 'shop'} size={15} /> {cat}</div>
              <div className="shop-grid">
                {regularItems.filter((i) => i.category === cat).map((item) => {
                  const imgUrl = (typeof item.imageUrl === 'string' && item.imageUrl.startsWith('/api/site/media?id=')) ? item.imageUrl : getImageUrl(item.image);
                  return (
                    <div
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => buyItem(item)}
                      onKeyDown={(e) => { if (e.key === 'Enter') buyItem(item); }}
                      className="shop-item-card"
                    >
                      {/* Image / placeholder */}
                      <div className="shop-item-img">
                        {item.badge && (
                          <span className="shop-item-badge">{item.badge}</span>
                        )}
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={item.title}
                            className="shop-item-img-tag"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <ShopItemPlaceholder
                          category={item.category}
                          style={{ display: imgUrl ? 'none' : 'flex' }}
                        />
                      </div>

                      {/* Body */}
                      <div className="shop-item-body">
                        <div className="shop-item-title">{item.title}</div>
                        <div className="shop-item-desc">{item.description}</div>
                        <div className="shop-item-footer">
                          <span className="shop-item-price">{item.price}</span>
                          <span className="shop-item-buy">{buying === item.id ? 'Opening…' : 'Buy →'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {buyErr && <div className="shop-footer-note" style={{ color: '#f87171' }}>{buyErr}</div>}
        <div className="shop-footer-note">
          🔒 All payments are secured by Flutterwave
        </div>

      </div>

      {showPremium && (
        <PremiumModal
          email={userEmail}
          name={name}
          initialPlan={selectedPlan}
          pricing={pricing}
          onClose={() => setShowPremium(false)}
          onActivated={handlePremiumActivated}
        />
      )}
    </div>
  );
}
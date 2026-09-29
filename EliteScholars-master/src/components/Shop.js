import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS, PREMIUM_ANNUAL_DISCOUNT_PCT } from '../utils/constants';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { isPremium, getPremiumData, cancelPremium } from '../utils/premium';
import { fetchShopData, fetchPremiumStatus } from '../utils/profileApi';
import PremiumModal from './PremiumModal';
import { EmojiIcon } from './Icon';

// ── Fallback SVG when image is missing ───────────────────────────────────────
function ShopItemPlaceholder({ category, color = '#8B5CF6' }) {
  const emoji =
    category === 'Notes'       ? '📝' :
    category === 'Cheat Sheet' ? '📐' :
    category === 'Bundle'      ? '🎓' :
    category === 'Guide'       ? '💡' : '🛍️';
  return (
    <div className="shop-item-placeholder" style={{ background: `${color}12` }}>
      <span className="shop-item-placeholder-emoji">{emoji}</span>
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
  const [selectedPlan, setSelectedPlan]           = useState('monthly');
  const [localPremium, setLocalPremium]           = useState(premiumUser);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [billing, setBilling]                     = useState('monthly');
  const [shopItems, setShopItems]                 = useState([]);
  const [pricing, setPricing]                     = useState({});
  const [premData, setPremData]                   = useState(getPremiumData(userEmail));
  const [loadingShop, setLoadingShop]             = useState(true);

  const FMT = (n) => n?.toLocaleString('en-NG') ?? '0';

  // ── Derived pricing ────────────────────────────────────────────────────────
  const proPrice          = pricing.pro            ?? 3000;
  const monthlyPrice      = pricing.premiumMonthly ?? 9000;
  const annualPrice       = pricing.premiumAnnual  ?? 89000;
  const annualSavings     = (monthlyPrice * 12) - annualPrice;
  const annualDiscountPct = Math.round((annualSavings / (monthlyPrice * 12)) * 100);

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
    if (params.get('payment') === 'success' && params.get('email') === userEmail) {
      const plan = params.get('plan') || 'monthly';
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
    const subscriptionPlan = planId === 'premium'
      ? (billing === 'annual' ? 'annual' : 'monthly')
      : planId;
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
      id: 'pro', label: 'Pro', icon: '🚀', tag: null,
      monthlyPrice: proPrice, annualDisabled: true,
      features: ['Unlimited topics', 'Unlimited sessions', 'No cooldown', 'Ads reduced', 'All 5 exam types'],
      highlight: false,
    },
    {
      id: 'premium', label: 'Premium', icon: '⭐', tag: 'Best Value',
      monthlyPrice: monthlyPrice, annualPrice: annualPrice, annualDisabled: false,
      features: ['Unlimited topics', 'Unlimited sessions', 'No cooldown ever', 'Zero ads', 'All 5 exam types', 'Priority support'],
      highlight: true,
    },
  ];

  const getPlanPricing = (plan) => {
    if (plan.id === 'free') return { price: 0, period: '', isDisabled: false };
    if (plan.id === 'pro')  return billing === 'annual'
      ? { price: null, period: '', isDisabled: true }
      : { price: plan.monthlyPrice, period: '/mo', isDisabled: false };
    if (plan.id === 'premium') return billing === 'annual' && plan.annualPrice
      ? { price: plan.annualPrice, period: '/yr', isDisabled: false }
      : { price: plan.monthlyPrice, period: '/mo', isDisabled: false };
    return { price: null, period: '', isDisabled: false };
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
              {premData?.plan === 'annual' ? 'Annual Plan' :
               premData?.plan === 'pro'    ? 'Pro Plan'    : 'Monthly Plan'}
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
                <div className="shop-billing-toggle">
                  <button
                    className={`shop-billing-btn ${billing === 'monthly' ? 'active' : ''}`}
                    onClick={() => setBilling('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={`shop-billing-btn ${billing === 'annual' ? 'active' : ''}`}
                    onClick={() => setBilling('annual')}
                  >
                    Annual
                    <span className="shop-save-badge">-{annualDiscountPct}%</span>
                  </button>
                </div>
              </div>

              {/* Plans grid */}
              <div className="shop-plans-grid">
                {COMPARE_PLANS.map(plan => {
                  const { price, period, isDisabled } = getPlanPricing(plan);
                  const annualDisabled = plan.id === 'pro' && billing === 'annual';
                  return (
                    <div
                      key={plan.id}
                      className={`shop-plan-col ${plan.highlight ? 'shop-plan-col--highlight' : ''} ${annualDisabled ? 'shop-plan-col--disabled' : ''}`}
                    >
                      {plan.tag && (
                        <div className="shop-plan-badge">{plan.tag}</div>
                      )}
                      <div className="shop-plan-icon">{plan.icon}</div>
                      <div className="shop-plan-name">{plan.label}</div>

                      <div className="shop-plan-price">
                        {annualDisabled ? (
                          <span className="shop-plan-na">Monthly only</span>
                        ) : plan.id === 'free' ? (
                          <span className="shop-plan-free">Free</span>
                        ) : (
                          <>
                            <span className="shop-plan-currency">₦</span>
                            <span className="shop-plan-amount">{FMT(price)}</span>
                            <span className="shop-plan-period">{period}</span>
                          </>
                        )}
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
                        disabled={plan.id === 'free' || annualDisabled}
                        onClick={() => openPlan(plan.id)}
                      >
                        {plan.id === 'free' ? 'Current' :
                         annualDisabled     ? 'N/A'     :
                         `Get ${plan.label}`}
                      </button>

                      {annualDisabled && (
                        <div className="shop-plan-disabled-note">No annual billing</div>
                      )}
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
              <div className="shop-category-label">{cat}</div>
              <div className="shop-grid">
                {regularItems.filter((i) => i.category === cat).map((item) => {
                  const imgUrl = getImageUrl(item.image);
                  return (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                          <span className="shop-item-buy">Buy →</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))
        )}

        <div className="shop-footer-note">
          🔒 All payments are secured by Flutterwave and Selar
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
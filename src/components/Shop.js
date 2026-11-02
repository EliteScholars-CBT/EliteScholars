import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../utils/constants';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { getPremiumData } from '../utils/premium';
import { fetchShopData, fetchPremiumStatus } from '../utils/profileApi';
import { initiatePayment } from '../utils/profileApi';
import PremiumModal from './PremiumModal';
import { PRO_PRODUCTS, priceOf, SCOPE_NAME } from '../utils/proPlans';
import { getActiveExam } from '../utils/entitlement';
import GroupPlans from './GroupPlans';
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
  const [selectedPlan, setSelectedPlan]           = useState('jamb');
  const [, setLocalPremium] = useState(premiumUser);
  const [shopItems, setShopItems]                 = useState([]);
  const [pricing, setPricing]                     = useState({});
  const [premData, setPremData]                   = useState(getPremiumData(userEmail));
  const [proStatus, setProStatus]                 = useState({ all: false, exams: {}, examsStr: {} });
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

  // ── Check server-side pro status ───────────────────────────────────────
  useEffect(() => {
    if (!userEmail) return;
    fetchPremiumStatus(userEmail).then(data => {
      if (data) setProStatus({ all: !!data.all, exams: data.exams || {}, examsStr: data.examsStr || {} });
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


  const handlePremiumActivated = (data) => {
    setLocalPremium(true);
    setShowPremium(false);
    if (onPremiumActivated) onPremiumActivated(data);
  };


  const regularItems = shopItems.filter((i) => !i.isPremium);
  const categories   = [...new Set(regularItems.map((i) => i.category))];



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

        {/* ── Pro: one plan per exam (JAMB / WAEC & NECO / GST) ── */}
        <div className="shop-plans-section">
          <div className="shop-plans-card">
            <div className="shop-plans-card-header">
              <div className="shop-plans-card-title">Go Pro</div>
              <div className="shop-plans-card-sub">Pick the exam you are preparing for. Each plan unlocks that exam only; the others stay free.</div>
            </div>
            {proStatus.all && (
              <div className="shop-footer-note" style={{ marginBottom: 10 }}>⭐ You have Pro for <b>every exam</b>{premData?.expiresDateStr ? ` until ${premData.expiresDateStr}` : ''}. You can still add time to a single exam below.</div>
            )}
            <div className="shop-plans-grid">
              {PRO_PRODUCTS.map((prod) => {
                const mine = proStatus.exams[prod.scope];
                const isCurrent = prod.scope === (getActiveExam() === 'jamb' ? 'jamb' : ['waec', 'neco'].includes(getActiveExam()) ? 'waec_neco' : getActiveExam() === 'gst' ? 'gst' : '');
                return (
                  <div key={prod.scope} className={`shop-plan-col ${isCurrent ? 'shop-plan-col--highlight' : ''}`}>
                    {mine && <div className="shop-plan-badge">ACTIVE</div>}
                    {!mine && isCurrent && <div className="shop-plan-badge">YOUR EXAM</div>}
                    <div className="shop-plan-col-top">
                      <div className="shop-plan-icon">{prod.emoji}</div>
                      <div>
                        <div className="shop-plan-name">{prod.label}</div>
                        <div className="shop-plan-price">
                          {prod.options.map((o, i) => (
                            <span key={o.id} style={{ display: 'block' }}>
                              <span className="shop-plan-currency">₦</span><span className="shop-plan-amount">{FMT(priceOf(pricing, o))}</span><span className="shop-plan-period"> / {o.period}</span>
                            </span>
                          ))}
                        </div>
                        {mine && <div className="shop-plan-save">Active until {proStatus.examsStr[prod.scope] || new Date(mine).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</div>}
                      </div>
                    </div>
                    <div className="shop-plan-features">
                      {prod.features.map((f, i) => (<div key={i} className="shop-plan-feature"><span className="shop-plan-check">✓</span><span>{f}</span></div>))}
                    </div>
                    <button className={`shop-plan-cta ${isCurrent || !mine ? 'shop-plan-cta--primary' : 'shop-plan-cta--secondary'}`} onClick={() => { setSelectedPlan(prod.options[0].id); setShowPremium(true); }}>
                      {mine ? `Add more time · ${SCOPE_NAME[prod.scope]}` : `Get ${prod.label}`}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="shop-plans-trust">🔒 Secured by Flutterwave · No hidden fees</div>
          </div>
        </div>

        <GroupPlans userEmail={userEmail} name={name} pricing={pricing} />

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
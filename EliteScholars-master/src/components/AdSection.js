import React, { useEffect, useRef } from 'react';
import {
  PUBLISHER_AD_ENABLED, PUBLISHER_AD_SCRIPT,
  AFFILIATE_ADS_ENABLED, AFFILIATE_ADS,
  CUSTOM_AD_ENABLED, CUSTOM_ADS,
} from '../utils/constants';
import { isPremium } from '../utils/premium';
import {
  observeAdElement, trackAdClick, flushAdAnalytics,
} from '../analytics/adAnalytics';
import '../styles/ads.css';
import { EmojiIcon } from './Icon';

// ── Helpers ───────────────────────────────────────────────────────────────────
function getAffiliateAds(examType) {
  if (!AFFILIATE_ADS_ENABLED) return [];
  return AFFILIATE_ADS.filter((ad) => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    if (!examType) return true;
    return ad.audiences.includes(examType);
  });
}

function getCustomAds(examType) {
  if (!CUSTOM_AD_ENABLED || !CUSTOM_ADS?.length) return [];
  return CUSTOM_ADS.filter((ad) => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    if (!examType) return true;
    return ad.audiences.includes(examType);
  });
}

// ── Determine which single ad to show for this slot ──────────────────────────
// Rotation: affiliate → custom → publisher → affiliate → custom → publisher...
// Skips types that are disabled or have no matching ads
function resolveAdSlot(slot, examType) {
  const affiliates = getAffiliateAds(examType);
  const customs    = getCustomAds(examType);

  const pool = [];

  if (AFFILIATE_ADS_ENABLED && affiliates.length > 0) {
    affiliates.forEach((ad, i) => pool.push({ type: 'affiliate', ad, index: i }));
  }
  if (CUSTOM_AD_ENABLED && customs.length > 0) {
    customs.forEach((ad, i) => pool.push({ type: 'custom', ad, index: i }));
  }
  if (PUBLISHER_AD_ENABLED) {
    pool.push({ type: 'publisher' });
  }

  if (pool.length === 0) return null;

  return pool[slot % pool.length];
}

// ── Publisher ad ──────────────────────────────────────────────────────────────
function PublisherAd({ refreshTrigger, examType }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !PUBLISHER_AD_SCRIPT) return;
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src   = PUBLISHER_AD_SCRIPT;
    script.async = true;

    const timer = setTimeout(() => {
      if (ref.current && ref.current.offsetHeight < 10) {
        ref.current.style.display = 'none';
      }
    }, 2000);

    script.onerror = () => {
      clearTimeout(timer);
      if (ref.current) ref.current.style.display = 'none';
    };

    ref.current.appendChild(script);
    return () => clearTimeout(timer);
  }, [refreshTrigger]);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(
      ref.current, 'publisher_native', 'publisher', examType, PUBLISHER_AD_SCRIPT
    );
    return unobserve;
  }, [examType]);

  return (
    <div
      className="ad-publisher-box"
      ref={ref}
      aria-label="Advertisement"
    />
  );
}

// ── Affiliate card ────────────────────────────────────────────────────────────
function AffiliateCard({ ad, index, examType }) {
  const COLORS = ['#8B5CF6', '#065F46', '#B45309', '#0369A1', '#831843', '#9A3412'];
  const color  = COLORS[index % COLORS.length];
  const ref    = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(
      ref.current, ad.id, 'affiliate', examType, ad.link
    );
    return unobserve;
  }, [ad.id, examType]);

  return (
    <div ref={ref}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ad-affiliate-card"
        style={{ '--aff-color': color }}
        aria-label={`Sponsored: ${ad.title}`}
        onClick={() => trackAdClick('affiliate', ad.id, ad.link, examType)}
      >
        <div className="ad-affiliate-img">
          {ad.image ? (
            <img src={ad.image} alt={ad.title} />
          ) : (
            <div className="ad-affiliate-img-placeholder"><EmojiIcon emoji="📢" size="1.1em" /></div>
          )}
        </div>
        <div className="ad-affiliate-body">
          <div className="ad-affiliate-badge">AFFILIATE</div>
          <div className="ad-affiliate-title">{ad.title}</div>
          <div className="ad-affiliate-desc">{ad.description}</div>
          <div className="ad-affiliate-cta">{ad.cta}</div>
        </div>
      </a>
    </div>
  );
}

// ── Custom ad card ────────────────────────────────────────────────────────────
function CustomCard({ ad, examType }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(
      ref.current, 'custom_ad', 'custom', examType, ad.link
    );
    return unobserve;
  }, [examType, ad.link]);

  return (
    <div ref={ref}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ad-custom-card"
        aria-label={`Ad: ${ad.title}`}
        onClick={() => trackAdClick('custom', 'custom_ad', ad.link, examType)}
      >
        {ad.image ? (
          <img src={ad.image} alt={ad.title} className="ad-custom-img" />
        ) : (
          <div className="ad-custom-img-placeholder"><EmojiIcon emoji="📢" size="1.1em" /></div>
        )}
        <div className="ad-custom-body">
          <div className="ad-custom-badge">PARTNER</div>
          <div className="ad-custom-title">{ad.title}</div>
          <div className="ad-custom-desc">{ad.description}</div>
          <div className="ad-custom-cta">{ad.cta}</div>
        </div>
      </a>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AdSection({
  slot = 0,
  refreshTrigger = 0,
  examType,
  email,
  showPublisher = true,
}) {
  if (isPremium(email)) return null;

  const resolved = resolveAdSlot(slot, examType);

  if (!resolved) return null;

  // If publisher is resolved but showPublisher is false, skip
  if (resolved.type === 'publisher' && !showPublisher) return null;

  useEffect(() => {
    return () => flushAdAnalytics();
  }, []);

  return (
    <div className="ad-section-wrapper" role="complementary" aria-label="Advertisement">
      <div className="ad-section-label">AD</div>

      {resolved.type === 'publisher' && (
        <PublisherAd refreshTrigger={refreshTrigger} examType={examType} />
      )}

      {resolved.type === 'affiliate' && (
        <AffiliateCard ad={resolved.ad} index={slot} examType={examType} />
      )}

      {resolved.type === 'custom' && (
        <CustomCard ad={resolved.ad} examType={examType} />
      )}
    </div>
  );
}
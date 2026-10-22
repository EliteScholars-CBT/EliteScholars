import React, { useEffect, useRef } from 'react';
import { isPremium } from '../utils/premium';
import { useAdsConfig, adsOn } from '../utils/adsConfig';
import { observeAdElement, trackAdClick, flushAdAnalytics } from '../analytics/adAnalytics';
import AdsterraNative from './AdsterraNative';
import '../styles/ads.css';
import { EmojiIcon } from './Icon';

// Our own promos: shown when no third-party ad is available, or when the admin
// has third-party ads off but "our own ads" on. Internal links only.
const HOUSE = [
  { id: 'premium', icon: '👑', title: 'Go Premium', desc: 'Unlimited topics, CBT and games. No ads, no daily limits.', cta: 'See Premium', link: '/app?src=house-premium' },
  { id: 'files', icon: '📄', title: 'Study from your own notes', desc: 'Upload a PDF or DOCX and get lessons, flashcards and quizzes.', cta: 'Try it', link: '/app?src=house-files' },
  { id: 'squad', icon: '👥', title: 'Study with a squad', desc: 'Make a squad, chat, and climb the leaderboard together.', cta: 'Open squads', link: '/app?src=house-squad' },
];

function HouseCard({ slot, placement, examType }) {
  const ad = HOUSE[Math.abs(slot) % HOUSE.length];
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return undefined;
    return observeAdElement(ref.current, `${placement}-${ad.id}`, 'house', examType, ad.link);
  }, [ad.id, ad.link, placement, examType]);
  return (
    <div ref={ref}>
      <a className="ad-custom-card" href={ad.link} aria-label={`Promo: ${ad.title}`} onClick={() => trackAdClick('house', `${placement}-${ad.id}`, ad.link, examType)}>
        <div className="ad-custom-img-placeholder"><EmojiIcon emoji={ad.icon} size="1.3em" /></div>
        <div className="ad-custom-body">
          <div className="ad-custom-badge">EliteScholars</div>
          <div className="ad-custom-title">{ad.title}</div>
          <div className="ad-custom-desc">{ad.desc}</div>
          <div className="ad-custom-cta">{ad.cta}</div>
        </div>
      </a>
    </div>
  );
}

function NativeBox({ unit, placement, examType }) {
  const ref = useRef(null);
  const seen = useRef(false);
  useEffect(() => {
    if (!ref.current) return undefined;
    return observeAdElement(ref.current, `${placement}-adsterra`, 'adsterra', examType, '');
  }, [placement, examType]);
  return <div ref={ref} className="ad-publisher-box"><AdsterraNative unit={unit} onShown={() => { seen.current = true; }} /></div>;
}

// placement: 'learn' | 'results'. The admin decides if/where these appear (Admin → Ads).
export default function AdSection({ slot = 0, placement = 'learn', examType, email }) {
  const cfg = useAdsConfig();
  useEffect(() => () => flushAdAnalytics(), []);

  if (!adsOn(cfg, 'app')) return null;
  if (cfg.hideForPremium && email && isPremium(email)) return null;
  if (placement === 'learn' && !(cfg.app.learn && cfg.app.learn.enabled)) return null;
  if (placement === 'results' && !cfg.app.results) return null;

  const native = cfg.units && cfg.units.native;
  const useNative = native && native.enabled && native.src && native.containerId;
  if (!useNative && !cfg.app.house) return null;

  return (
    <div className="ad-section-wrapper" role="complementary" aria-label="Advertisement">
      <div className="ad-section-label">Advertisement</div>
      {useNative
        ? <NativeBox unit={native} placement={placement} examType={examType} />
        : <HouseCard slot={slot} placement={placement} examType={examType} />}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { fetchShopData, fetchPremiumStatus } from '../utils/profileApi';
import ProCards from './ProCards';
import Icon from './Icon';

// "Go Pro" popup: swipeable cards, the student's own exam first. Payment starts from the card.
export default function PremiumModal({ email, name, onClose, initialPlan, pricing: pricingProp = {}, examType }) {
  const [pricing, setPricing] = useState(pricingProp);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let off = false;
    if (!(pricing && pricing.plans)) fetchShopData().then((d) => { if (!off && d && d.pricing) setPricing(d.pricing); }).catch(() => {});
    if (email) fetchPremiumStatus(email).then((d) => { if (!off && d) setStatus({ exams: d.exams || {}, examsStr: d.examsStr || {} }); }).catch(() => {});
    return () => { off = true; };
  }, []); // eslint-disable-line

  const startScope = initialPlan === 'annual' ? 'jamb'
    : /^jamb/.test(initialPlan || '') ? 'jamb' : /^waec/.test(initialPlan || '') ? 'waec_neco' : /^gst/.test(initialPlan || '') ? 'gst' : null;

  return createPortal(
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm-sheet">
        <button className="pm-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        <ProCards email={email} name={name} pricing={pricing} status={status} exam={examType} startScope={startScope} compact />
      </div>
    </div>,
    document.body
  );
}

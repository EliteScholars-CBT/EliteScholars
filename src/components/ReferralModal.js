import React, { useState } from 'react';
import Icon from './Icon';
import Confetti from './Confetti';
import { buildReferralCode, referralLink, referralShareText, sendAnalytics } from '../utils/referral';
import { loadUser } from '../utils/storage';

// ============================================================================
// ReferralModal — the popup ask. Shown at most once every few days (gated by
// shouldShowReferralPrompt in App.js), after a genuinely good moment like a
// strong quiz score, not on a timer regardless of context.
// ============================================================================

export default function ReferralModal({ name, email, onClose }) {
  const [copied, setCopied] = useState(false);
  const u = loadUser();
  const code = buildReferralCode(u.username || name, email);
  const link = referralLink(code);
  const shareText = referralShareText(name, code);

  const copy = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    sendAnalytics('referral_prompt_copy', { referral_code: code });
    setTimeout(() => setCopied(false), 1800);
  };

  const shareWhatsApp = () => {
    sendAnalytics('referral_prompt_share', { referral_code: code, channel: 'whatsapp' });
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const dismiss = (how) => {
    sendAnalytics('referral_prompt_dismissed', { how });
    onClose();
  };

  return (
    <div className="ref-modal-backdrop" onClick={() => dismiss('backdrop')}>
      <div className="ref-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <Confetti count={40} duration={2000} />
        <button className="ref-modal-close" onClick={() => dismiss('x')} aria-label="Close"><Icon name="x" size={16} /></button>
        <div className="ref-modal-icon"><Icon name="gift" size={28} /></div>
        <div className="ref-modal-title">You're on fire 🔥</div>
        <div className="ref-modal-sub">Bring your friends along — for every 10 who join and start using EliteScholars, you earn a data reward.</div>

        <div className="ref-modal-code-row">
          <span className="ref-modal-code">{code}</span>
          <button className="ref-modal-copy" onClick={copy}>
            <Icon name={copied ? 'check' : 'share'} size={13} /> {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <button className="ref-modal-whatsapp" onClick={shareWhatsApp}>
          <Icon name="users" size={15} /> Share on WhatsApp
        </button>
        <button className="ref-modal-later" onClick={() => dismiss('later')}>Maybe later</button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { getFreeSessionConfig, getShareOffer, startShare, claimShare, refreshEntitlement } from '../utils/entitlement';
import { buildReferralCode, referralLink } from '../utils/referral';
import { getCooldownSecondsLeft } from '../utils/premium';
import PremiumModal from './PremiumModal';
import { EmojiIcon } from './Icon';

// ============================================================================
// FreeLimitGate — Shown when free user hits their daily/session limit.
// Displays countdown timer + option to go pro.
// ============================================================================

function fmtTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const fmtBreak = (m) => (m >= 120 && m % 60 === 0 ? `${m / 60} hours` : m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} minutes`);

const KIND = { topics: 'topic', cbt: 'cbt', games: 'game' };
const WHAT = { topics: 'topics', cbt: 'CBT sessions', games: 'games' };

// "Share a group link, get more": shown on the daily-limit screens when the admin has it switched on.
function ShareToUnlock({ email, name, reason, onDone }) {
  const kind = KIND[reason];
  const [offer, setOffer] = useState(() => getShareOffer(email, kind));
  const [phase, setPhase] = useState('idle'); // idle | waiting | ready | done
  const [wait, setWait] = useState(0);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { let on = true; refreshEntitlement(email).then(() => { if (on) setOffer(getShareOffer(email, kind)); }); return () => { on = false; }; }, [email, kind]);
  useEffect(() => {
    if (phase !== 'waiting') return undefined;
    if (wait <= 0) { setPhase('ready'); return undefined; }
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, wait]);
  if (!offer && phase !== 'done') return null;

  const shareText = () => {
    let u = {};
    try { u = JSON.parse(localStorage.getItem('ep_user') || '{}') || {}; } catch { /* ignore */ }
    const link = referralLink(buildReferralCode(u.username || name, email));
    return `Prepare for JAMB, WAEC, NECO & GST free with EliteScholars: past questions, flashcards, games and challenges. Join us here: ${link}`;
  };
  const doShare = async () => {
    setErr(''); setBusy(true);
    const r = await startShare(email, kind);
    setBusy(false);
    if (!r.ok) { setErr(r.error); return; }
    try { window.open(`https://wa.me/?text=${encodeURIComponent(shareText())}`, '_blank'); } catch { /* ignore */ }
    setWait(r.verifySeconds || 0); setPhase('waiting');
  };
  const doClaim = async () => {
    setErr(''); setBusy(true);
    const r = await claimShare(email, kind);
    setBusy(false);
    if (!r.ok) { setErr(r.error); if (r.waitSeconds) { setWait(r.waitSeconds); setPhase('waiting'); } return; }
    setPhase('done');
  };

  if (phase === 'done') {
    return (
      <div className="limit-share limit-share-done">
        <b>+{(offer && offer.amount) || 3} more {WHAT[reason]} unlocked!</b>
        <button type="button" className="limit-share-btn" onClick={onDone}>Continue →</button>
      </div>
    );
  }
  return (
    <div className="limit-share">
      <b>Want more today? Share a group link</b>
      <span>Share EliteScholars to a WhatsApp group and get <b>+{offer.amount} more {WHAT[reason]}</b>{offer.left > 1 ? ` (${offer.left} times today)` : ''}.</span>
      {phase === 'idle' && <button type="button" className="limit-share-btn" disabled={busy} onClick={doShare}>💬 Share to a WhatsApp group</button>}
      {phase === 'waiting' && <button type="button" className="limit-share-btn" disabled>Checking your share… {wait}s</button>}
      {phase === 'ready' && <button type="button" className="limit-share-btn go" disabled={busy} onClick={doClaim}>✅ I shared it. Claim +{offer.amount}</button>}
      {err && <em className="limit-share-err">{err}</em>}
    </div>
  );
}

export default function FreeLimitGate({ email, name, reason = 'session', onClose, onPremiumActivated }) {
  const [secsLeft, setSecsLeft]         = useState(() => getCooldownSecondsLeft(email));
  const [showPremium, setShowPremium]   = useState(false);

  useEffect(() => {
    if (secsLeft <= 0) return;
    const t = setInterval(() => {
      const s = getCooldownSecondsLeft(email);
      setSecsLeft(s);
      if (s <= 0) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, [email]);

  const COPY = {
    topics: { icon: '📚', title: 'Free topics used up for today', msg: "You've used your free topics for today. They come back tomorrow, or go Pro for unlimited topics." },
    cbt:    { icon: '📝', title: 'Free CBT sessions used up for today', msg: "You've used your free CBT practice sessions for today. They come back tomorrow, or go Pro for unlimited practice." },
    games:  { icon: '🎮', title: 'Free games used up for today', msg: "You've used your free games for today. They come back tomorrow, or go Pro for unlimited games." },
  };
  const daily = COPY[reason];
  const isCooldownDone = secsLeft <= 0;

  return (
    <>
      <div className="limit-gate-overlay">
        <div className="limit-gate-card">
          {/* Icon */}
          <div className="limit-gate-icon">{daily ? daily.icon : '⏱️'}</div>

          {/* Title */}
          <div className="limit-gate-title">
            {daily ? daily.title : "Session Time's Up!"}
          </div>

          {/* Message */}
          <div className="limit-gate-msg">
            {daily
              ? daily.msg
              : `Your free session has ended. Take a break and come back in ${fmtBreak(getFreeSessionConfig(email).cooldownMinutes)}, or upgrade now.`
            }
          </div>

          {/* Countdown */}
          {!daily && !isCooldownDone && secsLeft > 0 && (
            <div className="limit-gate-timer-wrap">
              <div className="limit-gate-timer-label">Time until you can continue:</div>
              <div className="limit-gate-timer">{fmtTime(secsLeft)}</div>
              <div className="limit-gate-timer-sub">CBT &amp; Learn Mode locked until then</div>
            </div>
          )}

          {!daily && isCooldownDone && (
            <div className="limit-gate-ready"><EmojiIcon emoji="✅" size="1.15em" /> You can continue now!</div>
          )}

          {daily && <ShareToUnlock email={email} name={name} reason={reason} onDone={onClose} />}

          {/* Actions */}
          <button
            className="limit-gate-premium-btn"
            onClick={() => setShowPremium(true)}
          >
            ⭐ Go Pro — Remove All Limits
          </button>

          {!daily && isCooldownDone
            ? <button className="limit-gate-continue-btn" onClick={onClose}>Continue →</button>
            : <button className="limit-gate-close-btn" onClick={onClose}>Close</button>
          }
        </div>
      </div>

      {showPremium && (
        <PremiumModal
          email={email}
          name={name}
          onClose={() => setShowPremium(false)}
          onActivated={(data) => {
            setShowPremium(false);
            if (onPremiumActivated) onPremiumActivated(data);
            if (onClose) onClose();
          }}
        />
      )}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/status.css';
import { renderCard } from '../utils/shareCard';
import { loadUser } from '../utils/storage';
import { buildReferralCode, referralLink } from '../utils/referral';
import { postStatusFromBlob } from '../utils/statusPost';
import { getSessionToken } from '../utils/sessionFetch';

// Bottom sheet: preview of the picture + share anywhere / WhatsApp / download / copy link.
export default function ShareSheet({ card, text, link, onClose }) {
  const [blob, setBlob] = useState(null);
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [priv, setPriv] = useState('squad');
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    let off = false, u = '';
    renderCard({ ...card, link }).then((b) => { if (off || !b) return; u = URL.createObjectURL(b); setBlob(b); setUrl(u); });
    return () => { off = true; if (u) URL.revokeObjectURL(u); };
  }, []); // eslint-disable-line

  const u = loadUser() || {};
  const myCode = u.email || u.username || u.name ? buildReferralCode(u.username || u.name, u.email) : '';
  const myLink = myCode ? referralLink(myCode) : link;
  // one message: the caption + the student's own referral code and link
  const msg = `${text}\n\nJoin me on EliteScholars (free to start): ${myLink}${myCode ? `\nUse my referral code: ${myCode}` : ''}`;
  const toStatus = async () => {
    if (!blob || posting || posted) return;
    setPosting(true); setNote('');
    const r = await postStatusFromBlob(blob, { text, privacy: priv });
    setPosting(false);
    if (r.ok) { setPosted(true); setNote(`Added to your status. ${priv === 'public' ? 'Everyone' : 'Your squads'} can see it for 24 hours.`); } else setNote(r.error);
  };
  const wa = () => window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');

  return createPortal(
    <div className="st-modal" style={{ zIndex: 9500 }} onClick={onClose}>
      <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="st-sheet-top"><b>Share your win</b><button className="st-x dark" onClick={onClose} aria-label="Close">✕</button></div>
        <div style={{ textAlign: 'center', minHeight: 160 }}>
          {url ? <img src={url} alt="Share card" style={{ width: '100%', maxWidth: 280, borderRadius: 16, boxShadow: '0 10px 30px rgba(46,16,101,.3)' }} /> : <div style={{ padding: 60 }}>Making your card…</div>}
        </div>
        <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
          {getSessionToken() && (
            <div style={{ display: 'grid', gap: 6 }}>
              <button className="st-post" style={{ marginTop: 0, background: posted ? '#16A34A' : 'linear-gradient(135deg, #F59E0B, #D97706)' }} disabled={!blob || posting || posted} onClick={toStatus}>
                {posted ? '✓ Added to your status' : posting ? 'Posting…' : '⭐ Add to my status'}
              </button>
              {!posted && (
                <div className="st-priv" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <button className={priv === 'squad' ? 'on' : ''} onClick={() => setPriv('squad')}><span>👥</span>My squads</button>
                  <button className={priv === 'public' ? 'on' : ''} onClick={() => setPriv('public')}><span>🌍</span>Everyone</button>
                </div>
              )}
            </div>
          )}
          {(posted || !getSessionToken()) && <button className="st-post" style={{ marginTop: 0, background: '#16A34A' }} onClick={wa}>Share to WhatsApp</button>}
        </div>
        {note && <div className="st-count" style={{ textAlign: 'center' }}>{note}</div>}
      </div>
    </div>,
    document.body
  );
}

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/status.css';
import { renderCard, nativeShare, downloadBlob } from '../utils/shareCard';

// Bottom sheet: preview of the picture + share anywhere / WhatsApp / download / copy link.
export default function ShareSheet({ card, text, link, onClose }) {
  const [blob, setBlob] = useState(null);
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    let off = false, u = '';
    renderCard({ ...card, link }).then((b) => { if (off || !b) return; u = URL.createObjectURL(b); setBlob(b); setUrl(u); });
    return () => { off = true; if (u) URL.revokeObjectURL(u); };
  }, []); // eslint-disable-line

  const msg = `${text}\n\nJoin me on EliteScholars (free to start): ${link}`;
  const any = async () => {
    try { if (!(await nativeShare(blob, text, link))) { downloadBlob(blob); setNote('Saved. Share the picture from your gallery.'); } }
    catch { /* cancelled */ }
  };
  const wa = () => window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  const copy = () => navigator.clipboard?.writeText(msg).then(() => setNote('Link copied.')).catch(() => setNote('Could not copy.'));

  return createPortal(
    <div className="st-modal" style={{ zIndex: 9500 }} onClick={onClose}>
      <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="st-sheet-top"><b>Share your win</b><button className="st-x dark" onClick={onClose} aria-label="Close">✕</button></div>
        <div style={{ textAlign: 'center', minHeight: 160 }}>
          {url ? <img src={url} alt="Share card" style={{ width: '100%', maxWidth: 280, borderRadius: 16, boxShadow: '0 10px 30px rgba(46,16,101,.3)' }} /> : <div style={{ padding: 60 }}>Making your card…</div>}
        </div>
        <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
          <button className="st-post" style={{ marginTop: 0 }} disabled={!blob} onClick={any}>📤 Share anywhere</button>
          <button className="st-post" style={{ marginTop: 0, background: '#16A34A' }} onClick={wa}>WhatsApp</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="st-post" style={{ marginTop: 0, background: 'rgba(124,58,237,.12)', color: '#6D28D9' }} disabled={!blob} onClick={() => { downloadBlob(blob); setNote('Picture saved.'); }}>⬇ Download</button>
            <button className="st-post" style={{ marginTop: 0, background: 'rgba(124,58,237,.12)', color: '#6D28D9' }} onClick={copy}>🔗 Copy link</button>
          </div>
        </div>
        {note && <div className="st-count" style={{ textAlign: 'center' }}>{note}</div>}
      </div>
    </div>,
    document.body
  );
}

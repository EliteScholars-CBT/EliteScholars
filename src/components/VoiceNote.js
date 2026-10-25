import React, { useEffect, useRef, useState } from 'react';
import { fetchMedia } from '../utils/media';
import Icon from './Icon';

const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;
const BARS = Array.from({ length: 28 }, (_, i) => 5 + ((i * 7 + 3) % 11) * 1.6);

// A voice message: play / pause, moving bar and the length.  Pass `src` (a data URL) or `id` (a stored file).
export default function VoicePlayer({ id, src: given, secs = 0, mine }) {
  const [src, setSrc] = useState(given || '');
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(secs);
  const [busy, setBusy] = useState(false);
  const a = useRef(null);
  useEffect(() => () => { try { a.current && a.current.pause(); } catch { /* ignore */ } }, []);

  const toggle = async () => {
    let url = src;
    if (!url) { setBusy(true); url = await fetchMedia(id); setBusy(false); if (!url) return; setSrc(url); }
    const el = a.current;
    if (!el) return;
    if (el.src !== url && !el.src.endsWith(url.slice(-30))) el.src = url;
    if (playing) { el.pause(); return; }
    document.querySelectorAll('audio.vn-audio').forEach((x) => { if (x !== el) try { x.pause(); } catch { /* ignore */ } });
    try { await el.play(); } catch { /* blocked */ }
  };
  const pct = dur ? Math.min(1, pos / dur) : 0;
  return (
    <div className={`vn ${mine ? 'mine' : ''}`}>
      <button type="button" className="vn-play" onClick={toggle} aria-label={playing ? 'Pause voice note' : 'Play voice note'}>{busy ? '…' : <Icon name={playing ? 'pause' : 'play'} size={18} />}</button>
      <div className="vn-wave" aria-hidden="true">{BARS.map((h, i) => <i key={i} className={i / BARS.length < pct ? 'on' : ''} style={{ height: h }} />)}</div>
      <span className="vn-time">{mmss(playing || pos ? pos : dur)}</span>
      <audio ref={a} className="vn-audio" preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setPos(0); }}
        onTimeUpdate={(e) => setPos(e.currentTarget.currentTime)} onLoadedMetadata={(e) => { const d = e.currentTarget.duration; if (isFinite(d) && d > 0) setDur(d); }} />
    </div>
  );
}

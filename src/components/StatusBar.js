import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import EliteBadge from './EliteBadge';
import StickerStudio from './StickerStudio';
import { fetchMedia } from '../utils/media';
import '../styles/status.css';

// 24-hour status updates: share a short message with only yourself, your squad or everyone.
const BGS = { violet: ['#4C1D95', '#7C3AED'], gold: ['#B45309', '#F59E0B'], teal: ['#0F766E', '#14B8A6'], rose: ['#9F1239', '#F43F5E'], blue: ['#1E3A8A', '#3B82F6'], dark: ['#111827', '#374151'] };
const PRIVACY = [['me', 'Only me', '🔒'], ['squad', 'My squad', '👥'], ['public', 'Everyone', '🌍']];
const SEEN_KEY = 'es_status_seen_v1';
const DUR = 5000;

const grad = (bg) => { const c = BGS[bg] || BGS.violet; return `linear-gradient(135deg, ${c[0]}, ${c[1]})`; };
const loadSeen = () => { try { return JSON.parse(localStorage.getItem(SEEN_KEY) || '{}'); } catch { return {}; } };
const saveSeen = (o) => { try { localStorage.setItem(SEEN_KEY, JSON.stringify(o)); } catch { /* ignore */ } };
const left = (iso) => { const m = Math.max(0, Math.round((new Date(iso) - Date.now()) / 60000)); return m >= 60 ? `${Math.floor(m / 60)}h left` : `${m}m left`; };

async function call(path, body) {
  try {
    const r = await fetch(`/api/status/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || j.success === false) return { ok: false, error: (j && j.error) || 'Something went wrong. Try again.' };
    return { ok: true, data: j };
  } catch { return { ok: false, error: 'No connection. Try again.' }; }
}

export default function StatusBar() {
  const [list, setList] = useState([]);
  const [seen, setSeen] = useState(loadSeen);
  const [compose, setCompose] = useState(false);
  const [view, setView] = useState(null); // { stories: [], i }
  const timer = useRef(null);

  const refresh = useCallback(async () => {
    const r = await call('feed');
    if (r.ok) setList(r.data.statuses || []);
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 120000);
    return () => clearInterval(t);
  }, [refresh]);

  // group by author (own first)
  const groups = [];
  list.slice().reverse().forEach((s) => {
    let g = groups.find((x) => x.key === s.key);
    if (!g) { g = { key: s.key, author: s.author, mine: s.mine, items: [] }; groups.push(g); }
    g.items.push(s);
  });
  groups.sort((a, b) => (b.mine ? 1 : 0) - (a.mine ? 1 : 0));
  const mineGroup = groups.find((g) => g.mine);
  const others = groups.filter((g) => !g.mine);

  const open = (g) => setView({ stories: g.items, i: 0, mine: g.mine });
  const close = () => { clearTimeout(timer.current); setView(null); };

  // auto-advance + mark seen
  useEffect(() => {
    if (!view) return undefined;
    const cur = view.stories[view.i];
    if (!cur) { close(); return undefined; }
    const s = { ...loadSeen(), [cur.id]: Date.now() };
    saveSeen(s); setSeen(s);
    timer.current = setTimeout(() => {
      setView((v) => (v && v.i + 1 < v.stories.length ? { ...v, i: v.i + 1 } : null));
    }, DUR);
    return () => clearTimeout(timer.current);
  }, [view && view.i, view && view.stories.length]); // eslint-disable-line

  const step = (d) => setView((v) => {
    if (!v) return v;
    const n = v.i + d;
    return n < 0 ? v : n >= v.stories.length ? null : { ...v, i: n };
  });

  const del = async (id) => {
    await call('delete', { id });
    setList((l) => l.filter((x) => x.id !== id));
    close();
  };

  const unseen = (g) => g.items.some((s) => !seen[s.id]);
  const initial = (n) => String(n || '?').trim().charAt(0).toUpperCase();

  return (
    <>
      <div className="st-bar" role="list" aria-label="Status updates">
        <button className="st-item" onClick={() => (mineGroup ? open(mineGroup) : setCompose(true))} role="listitem">
          <span className={`st-ring ${mineGroup ? 'on' : ''}`}><span className="st-av me">{mineGroup ? initial('Y') : '+'}</span></span>
          <span className="st-name">Your status</span>
        </button>
        {mineGroup && (
          <button className="st-item" onClick={() => setCompose(true)} role="listitem">
            <span className="st-ring"><span className="st-av add">＋</span></span>
            <span className="st-name">Add</span>
          </button>
        )}
        {others.map((g) => (
          <button className="st-item" key={g.key} onClick={() => open(g)} role="listitem">
            <span className="elite-wrap"><span className={`st-ring ${unseen(g) ? 'on' : 'seen'}`}><span className="st-av">{initial(g.author)}</span></span>{g.items[0].elite && <EliteBadge size={18} />}</span>
            <span className="st-name">{g.author}</span>
          </button>
        ))}
      </div>

      {compose && createPortal(<Composer onClose={() => setCompose(false)} onPosted={() => { setCompose(false); refresh(); }} />, document.body)}

      {view && view.stories[view.i] && createPortal(
        <div className="st-view" style={{ background: grad(view.stories[view.i].bg) }} onClick={(e) => { const x = e.clientX / window.innerWidth; step(x < 0.35 ? -1 : 1); }}>
          <div className="st-prog">
            {view.stories.map((s, k) => (
              <i key={s.id}><b className={k < view.i ? 'full' : k === view.i ? 'run' : ''} style={k === view.i ? { animationDuration: `${DUR}ms` } : undefined} /></i>
            ))}
          </div>
          <div className="st-head">
            <span className="elite-wrap"><span className="st-av sm">{initial(view.stories[view.i].author)}</span>{view.stories[view.i].elite && <EliteBadge size={16} />}</span>
            <div><b>{view.stories[view.i].author}</b><small>{left(view.stories[view.i].expires_at)} · {(PRIVACY.find((p) => p[0] === view.stories[view.i].privacy) || [])[1]}</small></div>
            <button className="st-x" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close">✕</button>
          </div>
          {view.stories[view.i].media_id
            ? <StoryImage id={view.stories[view.i].media_id} text={view.stories[view.i].text} />
            : <div className="st-text">{view.stories[view.i].text}</div>}
          {view.mine && <button className="st-del" onClick={(e) => { e.stopPropagation(); del(view.stories[view.i].id); }}>Delete</button>}
        </div>
      , document.body)}
    </>
  );
}

function StoryImage({ id, text }) {
  const [src, setSrc] = useState('');
  useEffect(() => { let on = true; setSrc(''); fetchMedia(id).then((u) => { if (on) setSrc(u); }); return () => { on = false; }; }, [id]);
  return (
    <div className="st-img">
      {src ? <img src={src} alt="" draggable={false} /> : <span className="st-img-wait">Loading…</span>}
      {text ? <div className="st-cap">{text}</div> : null}
    </div>
  );
}

function Composer({ onClose, onPosted }) {
  const [text, setText] = useState('');
  const [bg, setBg] = useState('violet');
  const [privacy, setPrivacy] = useState('squad');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [image, setImage] = useState('');
  const [studio, setStudio] = useState(false);

  const post = async () => {
    if ((!text.trim() && !image) || busy) return;
    setBusy(true); setErr('');
    const r = await call('post', { text, bg, privacy, image: image || undefined });
    setBusy(false);
    if (!r.ok) { setErr(r.error); return; }
    onPosted();
  };

  return (
    <>
    <div className="st-modal" onClick={onClose}>
      <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="st-sheet-top"><b>New status</b><button className="st-x dark" onClick={onClose} aria-label="Close">✕</button></div>
        {image ? (
          <div className="st-preview img">
            <img src={image} alt="Your status" />
            <button className="st-redo" onClick={() => setStudio(true)}>Edit</button>
            <button className="st-redo x" onClick={() => setImage('')}>Remove</button>
          </div>
        ) : (
          <div className="st-preview" style={{ background: grad(bg) }}>
            <textarea className="allow-copy" value={text} maxLength={280} placeholder="Share a win, a tip, or what you're studying…" onChange={(e) => setText(e.target.value)} />
          </div>
        )}
        <button className="st-studio" onClick={() => setStudio(true)}>🎨 Photo, templates &amp; stickers</button>
        {image && <input className="st-cap-in allow-copy" value={text} maxLength={140} placeholder="Add a caption (optional)" onChange={(e) => setText(e.target.value)} />}
        <div className="st-count">{text.length}/280 · disappears after 24 hours</div>
        <div className="st-swatches">
          {Object.keys(BGS).map((k) => <button key={k} className={bg === k ? 'on' : ''} style={{ background: grad(k) }} onClick={() => setBg(k)} aria-label={`Background ${k}`} />)}
        </div>
        <div className="st-priv-label">Who can see it?</div>
        <div className="st-priv">
          {PRIVACY.map(([id, label, ic]) => <button key={id} className={privacy === id ? 'on' : ''} onClick={() => setPrivacy(id)}><span>{ic}</span>{label}</button>)}
        </div>
        {err && <div className="st-err">{err}</div>}
        <button className="st-post" disabled={(!text.trim() && !image) || busy} onClick={post}>{busy ? 'Posting…' : 'Post status'}</button>
      </div>
    </div>
      {studio && <StickerStudio aspect={9 / 16} title="Status studio" cta="Done" onClose={() => setStudio(false)} onDone={(u) => { setImage(u); setStudio(false); }} />}
    </>
  );
}

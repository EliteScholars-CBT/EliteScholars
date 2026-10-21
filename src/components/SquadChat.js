import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import EliteBadge from './EliteBadge';
import StickerStudio from './StickerStudio';
import { CHAT_STICKERS, tagColor, TAGS } from '../utils/stickers';
import { fetchMedia } from '../utils/media';
import '../styles/chat.css';

async function call(path, body) {
  try {
    const r = await fetch(`/api/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || j.success === false) return { ok: false, error: (j && j.error) || 'Something went wrong.' };
    return { ok: true, data: j };
  } catch { return { ok: false, error: 'No connection.' }; }
}

export const chatSeenKey = (id) => `es_chat_seen_${id}`;
const hhmm = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const isTag = (t) => TAGS.some((x) => x.t === t);

function Pic({ id }) {
  const [src, setSrc] = useState('');
  useEffect(() => { let on = true; fetchMedia(id).then((u) => { if (on) setSrc(u); }); return () => { on = false; }; }, [id]);
  return src ? <img className="sc-pic" src={src} alt="Shared" draggable={false} /> : <div className="sc-pic wait">Loading…</div>;
}

function Bubble({ m, onDelete, canDelete }) {
  const [open, setOpen] = useState(false);
  const sticker = m.kind === 'sticker';
  return (
    <div className={`sc-msg ${m.mine ? 'mine' : ''}`}>
      {!m.mine && <div className="sc-who">{m.author}{m.elite && <EliteBadge size={13} />}</div>}
      <div className={`sc-bub ${sticker ? 'stk' : ''} ${m.kind === 'image' ? 'img' : ''}`} onClick={() => canDelete && setOpen((o) => !o)}>
        {m.kind === 'image' && <Pic id={m.media_id} />}
        {sticker ? (isTag(m.text) ? <span className="sc-tag" style={{ background: tagColor(m.text) }}>{m.text}</span> : <span className="sc-big">{m.text}</span>) : (m.text ? <span className="sc-text">{m.text}</span> : null)}
        <small>{hhmm(m.created_at)}</small>
      </div>
      {open && canDelete && <button className="sc-del" onClick={() => onDelete(m.id)}>Delete message</button>}
    </div>
  );
}

export default function SquadChat({ squadName, isOwner, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [tray, setTray] = useState(false);
  const [studio, setStudio] = useState(null); // { file } | { blank: true }
  const [sending, setSending] = useState(false);
  const last = useRef(null);
  const box = useRef(null);
  const stick = useRef(true);

  const merge = useCallback((incoming) => {
    if (!incoming.length) return;
    setMsgs((cur) => {
      const ids = new Set(cur.map((x) => x.id));
      const add = incoming.filter((x) => !ids.has(x.id));
      return add.length ? [...cur.filter((x) => !x.temp || !add.some((a) => a.mine && a.text === x.text && a.kind === x.kind)), ...add] : cur;
    });
    last.current = incoming[incoming.length - 1].created_at;
  }, []);

  const pull = useCallback(async (first) => {
    const r = await call('squads/chat', first ? {} : { since: last.current });
    if (!r.ok) { if (first) setErr(r.error); return; }
    setErr('');
    const list = r.data.messages || [];
    if (first) { setMsgs(list); last.current = list.length ? list[list.length - 1].created_at : r.data.now; }
    else merge(list);
  }, [merge]);

  useEffect(() => {
    pull(true);
    const t = setInterval(() => { if (!document.hidden) pull(false); }, 4000);
    return () => clearInterval(t);
  }, [pull]);

  useEffect(() => {
    const el = box.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const onScroll = () => { const el = box.current; if (el) stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120; };

  const send = async (payload, optimistic) => {
    setSending(true); setErr('');
    const temp = { id: `t${Date.now()}`, temp: true, mine: true, author: 'You', created_at: new Date().toISOString(), ...optimistic };
    stick.current = true;
    setMsgs((c) => [...c, temp]);
    const r = await call('squads/chat-send', payload);
    setSending(false);
    if (!r.ok) { setMsgs((c) => c.filter((x) => x.id !== temp.id)); setErr(r.error); return false; }
    setMsgs((c) => c.map((x) => (x.id === temp.id ? { ...r.data.message } : x)));
    last.current = r.data.message.created_at;
    return true;
  };

  const sendText = async () => {
    const t = text.trim(); if (!t || sending) return;
    setText('');
    if (!(await send({ text: t }, { kind: 'text', text: t }))) setText(t);
  };
  const sendSticker = (s) => { setTray(false); send({ sticker: s }, { kind: 'sticker', text: s }); };
  const sendImage = (url) => { setStudio(null); send({ image: url }, { kind: 'image', text: '', media_id: null, _local: url }); };

  const del = async (id) => {
    setMsgs((c) => c.filter((x) => x.id !== id));
    await call('squads/chat-delete', { id });
  };

  useEffect(() => { // mark everything read when leaving
    return () => { try { localStorage.setItem(chatSeenKey('any'), String(Date.now())); } catch { /* ignore */ } };
  }, []);

  return createPortal(
    <div className="sc-wrap" role="dialog" aria-label="Squad chat">
      <div className="sc-head">
        <button className="sc-back" onClick={onClose} aria-label="Back">‹</button>
        <div><b>{squadName || 'Squad chat'}</b><small>Squad chat · messages stay 30 days</small></div>
      </div>
      <div className="sc-list" ref={box} onScroll={onScroll}>
        {!msgs.length && !err && <div className="sc-empty">No messages yet.<br />Say hi to your squad 👋</div>}
        {msgs.map((m) => (
          m._local ? <div key={m.id} className="sc-msg mine"><div className="sc-bub img"><img className="sc-pic" src={m._local} alt="Sending" /><small>sending…</small></div></div>
            : <Bubble key={m.id} m={m} canDelete={!m.temp && (m.mine || isOwner)} onDelete={del} />
        ))}
      </div>
      {err && <div className="sc-err">{err}</div>}
      {tray && (
        <div className="sc-tray">
          {CHAT_STICKERS.map((s) => <button key={s} onClick={() => sendSticker(s)}>{isTag(s) ? <span className="sc-tag" style={{ background: tagColor(s) }}>{s}</span> : s.length <= 2 && /\p{Extended_Pictographic}/u.test(s) ? <span className="sc-big">{s}</span> : <span className="sc-tag" style={{ background: '#7C3AED' }}>{s}</span>}</button>)}
          <button className="sc-studio" onClick={() => { setTray(false); setStudio({ blank: true }); }}>🎨 Make a sticker card</button>
        </div>
      )}
      <div className="sc-bar">
        <button className="sc-ic" onClick={() => setTray((t) => !t)} aria-label="Stickers">😎</button>
        <label className="sc-ic" aria-label="Send a photo">📷<input type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; if (f) setStudio({ file: f }); }} /></label>
        <input className="allow-copy sc-in" value={text} maxLength={600} placeholder="Message your squad…" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendText(); }} />
        <button className="sc-send" disabled={!text.trim() || sending} onClick={sendText} aria-label="Send">➤</button>
      </div>
      {studio && <StickerStudio aspect={studio.file ? 4 / 5 : 1} initialFile={studio.file || null} title="Sticker studio" cta="Send" onClose={() => setStudio(null)} onDone={sendImage} />}
    </div>,
    document.body
  );
}

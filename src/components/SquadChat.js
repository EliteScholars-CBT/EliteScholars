import { scanImage, flaggedMessage } from '../utils/imageGuard';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import EliteBadge from './EliteBadge';
import StickerStudio from './StickerStudio';
import ImageViewer from './ImageViewer';
import EmojiPicker from './EmojiPicker';
import { tagColor, TAGS } from '../utils/stickers';
import { isStickerMsg } from '../utils/stickerArt';
import { REACTION_EMOJI } from '../utils/emojiData';
import StickerPicker, { StickerArt, saveMine } from './StickerPicker';
import Icon from './Icon';
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
const EDIT_MS = 15 * 60 * 1000;
const hhmm = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const isTag = (t) => TAGS.some((x) => x.t === t);
const maxStamp = (list, cur) => list.reduce((a, m) => ((m.updated_at || m.created_at) > a ? (m.updated_at || m.created_at) : a), cur || '');
const byTime = (a, b) => (a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0);

function Pic({ id, onOpen }) {
  const [src, setSrc] = useState('');
  useEffect(() => { let on = true; fetchMedia(id).then((u) => { if (on) setSrc(u); }); return () => { on = false; }; }, [id]);
  return src ? <img className="sc-pic" src={src} alt="Shared" draggable={false} onClick={(e) => { e.stopPropagation(); onOpen(src); }} /> : <div className="sc-pic wait">Loading…</div>;
}

function Bubble({ m, onLong, onOpenImg, onReact, flash }) {
  const sticker = m.kind === 'sticker';
  const art = sticker && isStickerMsg(m.text);
  const timer = useRef(null), pos = useRef(null), fired = useRef(false);
  const cancel = () => { clearTimeout(timer.current); timer.current = null; };
  const down = (e) => {
    if (m.temp) return;
    fired.current = false; pos.current = { x: e.clientX, y: e.clientY };
    cancel(); timer.current = setTimeout(() => { fired.current = true; try { navigator.vibrate && navigator.vibrate(12); } catch { /* ignore */ } onLong(m); }, 430);
  };
  const move = (e) => { if (pos.current && Math.abs(e.clientX - pos.current.x) + Math.abs(e.clientY - pos.current.y) > 10) cancel(); };
  const rx = Object.entries(m.reactions || {});
  return (
    <div id={`m-${m.id}`} className={`sc-msg ${m.mine ? 'mine' : ''} ${flash ? 'sc-flash' : ''}`}>
      {!m.mine && <div className="sc-who">{m.author}{m.elite && <EliteBadge inline size={12} />}</div>}
      <div className={`sc-bub ${sticker ? 'stk' : ''} ${m.kind === 'image' ? 'img' : ''}`}
        onPointerDown={down} onPointerMove={move} onPointerUp={cancel} onPointerLeave={cancel} onPointerCancel={cancel}
        onContextMenu={(e) => { e.preventDefault(); if (!m.temp) onLong(m); }}
        onClickCapture={(e) => { if (fired.current) { e.stopPropagation(); e.preventDefault(); fired.current = false; } }}>
        {m.kind === 'image' && <Pic id={m.media_id} onOpen={onOpenImg} />}
        {art ? <StickerArt id={m.text.slice(3)} className="sc-stkmsg" /> : sticker ? (isTag(m.text) ? <span className="sc-tag" style={{ background: tagColor(m.text) }}>{m.text}</span> : <span className="sc-big">{m.text}</span>) : (m.text ? <span className="sc-text">{m.text}</span> : null)}
        <small>{m.pinned && <span className="sc-pinmark"><Icon name="pin" size={10} /></span>}{m.edited && <span className="sc-edited">edited · </span>}{hhmm(m.created_at)}</small>
      </div>
      {rx.length > 0 && <div className="sc-rx">{rx.map(([em, n]) => <button type="button" key={em} className={m.my_reaction === em ? 'mine' : ''} onClick={() => onReact(m, em)}>{em} {n > 1 ? n : ''}</button>)}</div>}
    </div>
  );
}

export default function SquadChat({ squadId, squadName, isOwner, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [tray, setTray] = useState(false);
  const [studio, setStudio] = useState(null); // { file } | { blank: true }
  const [sending, setSending] = useState(false);
  const [pins, setPins] = useState([]);
  const [pinIdx, setPinIdx] = useState(0);
  const [online, setOnline] = useState(0);
  const [total, setTotal] = useState(0);
  const [typing, setTyping] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [viewer, setViewer] = useState('');
  const [editing, setEditing] = useState(null);
  const [flashId, setFlashId] = useState('');
  const cursor = useRef('');
  const box = useRef(null);
  const input = useRef(null);
  const sel = useRef({ s: 0, e: 0 });
  const caret = useRef(null);
  const stick = useRef(true);
  const keep = useRef(null);
  const lastTyping = useRef(0);
  const loadingOlder = useRef(false);

  const merge = useCallback((incoming) => {
    if (!incoming.length) return;
    setMsgs((cur) => {
      const map = new Map(cur.map((x) => [x.id, x]));
      let base = cur;
      // a real message replaces my sending placeholder
      const mineIn = incoming.filter((a) => a.mine && !map.has(a.id));
      if (mineIn.length) base = cur.filter((x) => !x.temp || !mineIn.some((a) => a.text === x.text && a.kind === x.kind));
      const out = base.map((x) => (map.has(x.id) && incoming.some((a) => a.id === x.id) ? incoming.find((a) => a.id === x.id) : x));
      const have = new Set(out.map((x) => x.id));
      const add = incoming.filter((a) => !have.has(a.id));
      return add.length ? [...out, ...add].sort(byTime) : out;
    });
  }, []);

  const applyMeta = useCallback((d) => {
    if (typeof d.online === 'number') { setOnline(d.online); setTotal(d.total || 0); }
    if (Array.isArray(d.typing)) setTyping(d.typing);
    if (Array.isArray(d.pins)) { setPins(d.pins); setPinIdx((i) => (d.pins.length ? Math.min(i, d.pins.length - 1) : 0)); }
    if (Array.isArray(d.ids)) {
      const ids = new Set(d.ids);
      setMsgs((cur) => {
        const kept = cur.filter((x) => !x.temp && ids.has(x.id));
        if (!kept.length) return cur;
        const from = kept.reduce((a, x) => (x.created_at < a ? x.created_at : a), kept[0].created_at);
        const gone = cur.filter((x) => !x.temp && !ids.has(x.id) && x.created_at > from);
        return gone.length ? cur.filter((x) => !gone.includes(x)) : cur;
      });
    }
  }, []);

  const pull = useCallback(async (first) => {
    const r = await call('squads/chat', first ? { squadId } : { squadId, since: cursor.current });
    if (!r.ok) { if (first) setErr(r.error); return; }
    setErr('');
    const list = r.data.messages || [];
    if (first) { setMsgs(list); cursor.current = maxStamp(list, '') || r.data.now; setHasMore(!!r.data.hasMore); }
    else if (list.length) { merge(list); cursor.current = maxStamp(list, cursor.current); }
    applyMeta(r.data);
  }, [merge, applyMeta, squadId]);

  useEffect(() => {
    pull(true);
    const t = setInterval(() => { if (!document.hidden) pull(false); }, 2500);
    return () => clearInterval(t);
  }, [pull]);

  const loadOlder = useCallback(async () => {
    if (loadingOlder.current) return false;
    const first = msgs.find((m) => !m.temp);
    if (!first) return false;
    loadingOlder.current = true;
    const r = await call('squads/chat', { squadId, before: first.created_at });
    loadingOlder.current = false;
    if (!r.ok) { setErr(r.error); return false; }
    const el = box.current;
    keep.current = el ? { h: el.scrollHeight, t: el.scrollTop } : null;
    stick.current = false;
    merge(r.data.messages || []);
    setHasMore(!!r.data.hasMore);
    return !!(r.data.messages || []).length;
  }, [msgs, merge, squadId]);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    if (keep.current) { el.scrollTop = keep.current.t + (el.scrollHeight - keep.current.h); keep.current = null; }
    else if (stick.current) el.scrollTop = el.scrollHeight;
  }, [msgs]);
  useLayoutEffect(() => { if (caret.current !== null && input.current) { try { input.current.setSelectionRange(caret.current, caret.current); } catch { /* ignore */ } sel.current = { s: caret.current, e: caret.current }; caret.current = null; } }, [text]);

  const onScroll = () => {
    const el = box.current; if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (el.scrollTop < 40 && hasMore) loadOlder();
  };

  const send = async (payload, optimistic) => {
    setSending(true); setErr('');
    const temp = { id: `t${Date.now()}`, temp: true, mine: true, author: 'You', created_at: new Date().toISOString(), ...optimistic };
    stick.current = true;
    setMsgs((c) => [...c, temp]);
    const r = await call('squads/chat-send', { ...payload, squadId });
    setSending(false);
    if (!r.ok) { setMsgs((c) => c.filter((x) => x.id !== temp.id)); setErr(r.error); return false; }
    // swap my placeholder for the saved message; the poll cursor is NOT moved, so nothing others sent meanwhile is skipped
    setMsgs((c) => { const real = { ...r.data.message, reactions: {}, my_reaction: null }; return c.some((x) => x.id === real.id) ? c.filter((x) => x.id !== temp.id) : c.map((x) => (x.id === temp.id ? real : x)); });
    return true;
  };

  const saveEdit = async () => {
    const t = text.trim(); if (!t || !editing || sending) return;
    setSending(true);
    const r = await call('squads/chat-edit', { id: editing.id, text: t, squadId });
    setSending(false);
    if (!r.ok) { setErr(r.error); return; }
    merge([r.data.message]); setEditing(null); setText(''); setErr('');
  };
  const sendText = async () => {
    if (editing) { saveEdit(); return; }
    const t = text.trim(); if (!t || sending) return;
    setText('');
    if (!(await send({ text: t }, { kind: 'text', text: t }))) setText(t);
  };
  const sendSticker = (s) => { setTray(false); send({ sticker: s }, { kind: 'sticker', text: s }); };
  const sendImage = async (url) => {
    const isPhoto = !(studio && studio.blank);
    if (!isPhoto) saveMine(url);
    setStudio(null);
    let scan = 'clean', ocr;
    if (isPhoto) {
      setErr(''); setSending(true);
      const sc = await scanImage(url);
      setSending(false);
      if (sc.state === 'flagged') { setErr(flaggedMessage(sc)); return; }
      scan = sc.state; ocr = sc.text || undefined;
    }
    send({ image: url, scan, ocr }, { kind: 'image', text: '', media_id: null, _local: url });
  };

  const del = async (id) => {
    setMsgs((c) => c.filter((x) => x.id !== id));
    await call('squads/chat-delete', { id, squadId });
    pull(false);
  };
  const react = async (m, emoji) => {
    setSheet(null);
    const r = await call('squads/chat-react', { id: m.id, emoji, squadId });
    if (!r.ok) { setErr(r.error); return; }
    merge([r.data.message]);
  };
  const togglePin = async (m) => {
    setSheet(null);
    const r = await call('squads/chat-pin', { id: m.id, pin: !m.pinned, squadId });
    if (!r.ok) { setErr(r.error); return; }
    setErr(''); merge([r.data.message]); pull(false);
  };

  const goTo = async (id) => {
    let el = document.getElementById(`m-${id}`);
    for (let i = 0; !el && i < 6; i++) { // not loaded yet: fetch older pages until it shows up
      // eslint-disable-next-line no-await-in-loop
      const more = await loadOlder();
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 120));
      el = document.getElementById(`m-${id}`);
      if (!more) break;
    }
    if (el) { stick.current = false; el.scrollIntoView({ block: 'center', behavior: 'smooth' }); setFlashId(id); setTimeout(() => setFlashId(''), 1500); }
    else setErr('That message is too far back to jump to.');
  };
  const tapPin = () => {
    if (!pins.length) return;
    const p = pins[Math.min(pinIdx, pins.length - 1)];
    goTo(p.id);
    setPinIdx((i) => (i + 1) % pins.length); // the banner now shows the next pin, like WhatsApp
  };

  const onType = (v) => {
    setText(v.slice(0, 600));
    if (Date.now() - lastTyping.current > 2500 && v.trim()) { lastTyping.current = Date.now(); call('squads/chat-typing', { squadId }); }
  };
  const readSel = () => { const el = input.current; if (el) sel.current = { s: el.selectionStart ?? text.length, e: el.selectionEnd ?? text.length }; };
  const insertEmoji = (em) => {
    const { s, e } = sel.current;
    const a = Math.min(s, text.length), b = Math.min(Math.max(e, a), text.length);
    const next = (text.slice(0, a) + em + text.slice(b)).slice(0, 600);
    caret.current = Math.min(a + em.length, next.length);
    setText(next);
  };

  useEffect(() => { // mark everything read when leaving
    return () => { try { localStorage.setItem(chatSeenKey(squadId || 'any'), String(Date.now())); } catch { /* ignore */ } };
  }, [squadId]);

  const canEdit = (m) => m.mine && m.kind === 'text' && !m.temp && Date.now() - new Date(m.created_at).getTime() < EDIT_MS;
  const typingTxt = typing.length === 1 ? `${typing[0]} is typing` : typing.length === 2 ? `${typing[0]} and ${typing[1]} are typing` : typing.length ? 'Several people are typing' : '';
  const pin = pins.length ? pins[Math.min(pinIdx, pins.length - 1)] : null;
  const pinPic = pin && pin.kind === 'image';

  return createPortal(
    <div className="sc-wrap" role="dialog" aria-label="Squad chat">
      <div className="sc-head">
        <button className="sc-back" onClick={onClose} aria-label="Back">‹</button>
        <div>
          <b>{squadName || 'Squad chat'}</b>
          {typingTxt
            ? <div className="sc-sub sc-typing">{typingTxt}<i /><i /><i /></div>
            : <div className="sc-sub">{online > 0 && <span className="sc-dot" />}{total ? `${online} online · ${total} member${total === 1 ? '' : 's'}` : 'Squad chat'}</div>}
        </div>
      </div>
      {pin && (
        <div className="sc-pins" onClick={tapPin} role="button" tabIndex={0}>
          <div className="sc-pins-bar">{pins.map((p, i) => <i key={p.id} className={i === Math.min(pinIdx, pins.length - 1) ? 'on' : ''} />)}</div>
          <div className="sc-pins-txt"><b>Pinned message {pins.length > 1 ? `${Math.min(pinIdx, pins.length - 1) + 1} of ${pins.length}` : ''}</b><span>{pinPic ? 'Photo' : pin.kind === 'sticker' ? 'Sticker' : pin.text}</span></div>
          {pinPic && <PinThumb id={pin.media_id} />}
          <Icon name="pin" size={16} />
        </div>
      )}
      <div className="sc-list" ref={box} onScroll={onScroll}>
        {hasMore && <button type="button" className="sc-older" onClick={loadOlder}>Load earlier messages</button>}
        {!msgs.length && !err && <div className="sc-empty">No messages yet.<br />Say hi to your squad 👋</div>}
        {msgs.map((m) => (
          m._local ? <div key={m.id} className="sc-msg mine"><div className="sc-bub img"><img className="sc-pic" src={m._local} alt="Sending" /><small>sending…</small></div></div>
            : <Bubble key={m.id} m={m} flash={flashId === m.id} onLong={setSheet} onOpenImg={setViewer} onReact={react} />
        ))}
      </div>
      {err && <div className="sc-err" onClick={() => setErr('')}>{err}</div>}
      {editing && <div className="sc-editing"><span>Editing message</span><button type="button" onClick={() => { setEditing(null); setText(''); }}>Cancel</button></div>}
      {tray === 'stickers' && <StickerPicker mode="stickers" onSticker={sendSticker} onMine={(u) => { setTray(false); send({ image: u }, { kind: 'image', text: '', media_id: null, _local: u }); }} onCreate={() => { setTray(false); setStudio({ blank: true, mine: true }); }} />}
      {tray === 'emoji' && <EmojiPicker onPick={insertEmoji} />}
      <div className="sc-bar">
        <button className="sc-ic" onClick={() => setTray((t) => (t === 'emoji' ? false : 'emoji'))} aria-label="Emoji"><Icon name="smile" size={21} /></button>
        <button className="sc-ic" onClick={() => setTray((t) => (t === 'stickers' ? false : 'stickers'))} aria-label="Stickers"><Icon name="sticker" size={21} /></button>
        <label className="sc-ic" aria-label="Send a photo"><Icon name="camera" size={21} /><input type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; if (f) setStudio({ file: f }); }} /></label>
        <input ref={input} className="allow-copy sc-in" value={text} maxLength={600} placeholder={editing ? 'Edit your message…' : 'Message your squad…'}
          onChange={(e) => { onType(e.target.value); readSel(); }} onSelect={readSel} onKeyUp={readSel} onClick={readSel} onBlur={readSel}
          onKeyDown={(e) => { if (e.key === 'Enter') sendText(); }} />
        <button className="sc-send" disabled={!text.trim() || sending} onClick={sendText} aria-label={editing ? 'Save' : 'Send'}><Icon name={editing ? 'check' : 'send'} size={19} /></button>
      </div>
      {studio && <StickerStudio aspect={studio.file ? 4 / 5 : 1} initialFile={studio.file || null} title="Sticker studio" cta="Send" onClose={() => setStudio(null)} onDone={sendImage} />}
      {viewer && <ImageViewer src={viewer} onClose={() => setViewer('')} />}
      {sheet && (
        <div className="sc-sheet-bg" onClick={() => setSheet(null)}>
          <div className="sc-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sc-sheet-rx">{REACTION_EMOJI.map((em) => <button type="button" key={em} className={sheet.my_reaction === em ? 'mine' : ''} onClick={() => react(sheet, em)}>{em}</button>)}</div>
            <div className="sc-sheet-act">
              {sheet.kind === 'text' && <button type="button" onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(sheet.text); } catch { /* ignore */ } setSheet(null); }}><Icon name="copy" size={18} /> Copy</button>}
              {canEdit(sheet) && <button type="button" onClick={() => { setEditing(sheet); setText(sheet.text); setTray(false); setSheet(null); setTimeout(() => input.current && input.current.focus(), 50); }}><Icon name="edit" size={18} /> Edit <small style={{ opacity: .55, fontWeight: 600 }}>(within 15 minutes)</small></button>}
              {sheet.kind !== 'sticker' && <button type="button" onClick={() => togglePin(sheet)}><Icon name="pin" size={18} /> {sheet.pinned ? 'Unpin' : 'Pin to top'}</button>}
              {(sheet.mine || isOwner) && <button type="button" className="danger" onClick={() => { const m = sheet; setSheet(null); del(m.id); }}><Icon name="trash" size={18} /> Delete</button>}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

function PinThumb({ id }) {
  const [src, setSrc] = useState('');
  useEffect(() => { let on = true; fetchMedia(id).then((u) => { if (on) setSrc(u); }); return () => { on = false; }; }, [id]);
  return src ? <img className="sc-pins-thumb" src={src} alt="" /> : null;
}

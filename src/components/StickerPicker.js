import React, { useMemo, useState } from 'react';
import { PACKS, ALL_STICKERS, stickerSvg, stickerMsg } from '../utils/stickerArt';
import { EMOJI } from '../utils/stickers';
import Icon from './Icon';
import '../styles/stickers.css';

// One animated sticker (SVG string from the engine). `still` stops the motion (used in the picker grid on weak phones).
export function StickerArt({ id, className = '', still = false }) {
  const svg = useMemo(() => stickerSvg(id), [id]);
  if (!svg) return null;
  return <span className={`${className}${still ? ' stk-still' : ''}`} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: svg }} />;
}

const RECENT_KEY = 'es_recent_stickers', MINE_KEY = 'es_my_stickers';
const read = (k) => { try { const v = JSON.parse(localStorage.getItem(k) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
export const rememberSticker = (id) => write(RECENT_KEY, [id, ...read(RECENT_KEY).filter((x) => x !== id)].slice(0, 16));
export const loadMine = () => read(MINE_KEY);
export const saveMine = (url) => write(MINE_KEY, [url, ...read(MINE_KEY).filter((x) => x !== url)].slice(0, 20)) || write(MINE_KEY, [url]);

// Bottom sheet: sticker packs, recent, my own stickers, and (with `mode="emoji"`) the emoji keyboard.
export default function StickerPicker({ mode = 'stickers', onSticker, onEmoji, onMine, onCreate }) {
  const [tab, setTab] = useState(() => (read(RECENT_KEY).length ? 'recent' : PACKS[0].id));
  const [mine, setMine] = useState(loadMine);
  const recent = read(RECENT_KEY);

  if (mode === 'emoji') {
    return (
      <div className="stp"><div className="stp-emoji">{EMOJI.map((e) => <button key={e} type="button" onClick={() => onEmoji(e)}>{e}</button>)}</div></div>
    );
  }
  const items = tab === 'recent' ? recent.map((id) => ALL_STICKERS.find((s) => s.id === id)).filter(Boolean)
    : tab === 'mine' ? [] : (PACKS.find((p) => p.id === tab) || PACKS[0]).items;
  return (
    <div className="stp" role="dialog" aria-label="Stickers">
      <div className="stp-tabs">
        {recent.length > 0 && <button type="button" className={tab === 'recent' ? 'on' : ''} onClick={() => setTab('recent')}>Recent</button>}
        {PACKS.map((p) => <button type="button" key={p.id} className={tab === p.id ? 'on' : ''} onClick={() => setTab(p.id)}>{p.name}</button>)}
        <button type="button" className={tab === 'mine' ? 'on' : ''} onClick={() => setTab('mine')}>My stickers</button>
      </div>
      <div className="stp-grid">
        {tab === 'mine' ? (
          <>
            <button type="button" className="stp-create" onClick={onCreate}><Icon name="plus" size={18} /> Create a sticker</button>
            {!mine.length && <div className="stp-hint">Stickers you make appear here so you can send them again.</div>}
            {mine.map((u) => <button type="button" key={u.slice(-40)} onClick={() => onMine(u)}><img src={u} alt="My sticker" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} /></button>)}
          </>
        ) : items.map((s) => (
          <button type="button" key={s.id} onClick={() => { rememberSticker(s.id); onSticker(stickerMsg(s.id)); }} aria-label={s.cap}><StickerArt id={s.id} /></button>
        ))}
      </div>
    </div>
  );
}

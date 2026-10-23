import React, { useState } from 'react';
import { EMOJI_GROUPS } from '../utils/emojiData';
import '../styles/stickers.css';

const RECENT = 'es_recent_emoji';
const getRecent = () => { try { const v = JSON.parse(localStorage.getItem(RECENT) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };

// Emoji keyboard. Emojis go into the text box at the cursor (see SquadChat) — they are not stickers.
// onMouseDown preventDefault keeps the text box focused so the cursor does not jump.
export default function EmojiPicker({ onPick }) {
  const [rec, setRec] = useState(getRecent);
  const [tab, setTab] = useState(() => (getRecent().length ? 'recent' : 'smile'));
  const groups = rec.length ? [{ id: 'recent', icon: '🕘', name: 'Recent', items: rec }, ...EMOJI_GROUPS] : EMOJI_GROUPS;
  const cur = groups.find((g) => g.id === tab) || groups[0];
  const pick = (e) => {
    const next = [e, ...rec.filter((x) => x !== e)].slice(0, 24);
    setRec(next); try { localStorage.setItem(RECENT, JSON.stringify(next)); } catch { /* ignore */ }
    onPick(e);
  };
  return (
    <div className="stp emo" onMouseDown={(e) => e.preventDefault()}>
      <div className="emo-grid">{cur.items.map((e) => <button type="button" key={e} onClick={() => pick(e)}>{e}</button>)}</div>
      <div className="emo-tabs">{groups.map((g) => <button type="button" key={g.id} className={cur.id === g.id ? 'on' : ''} onClick={() => setTab(g.id)} aria-label={g.name}>{g.icon}</button>)}</div>
    </div>
  );
}

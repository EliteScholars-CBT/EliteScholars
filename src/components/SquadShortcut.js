import React, { useEffect, useState } from 'react';
import { getSquad, MAX_SQUADS } from '../utils/squadApi';
import { getSessionToken } from '../utils/sessionFetch';
import { chatSeenKey } from './SquadChat';
import '../styles/squads.css';

// how many messages in a squad's chat you have not read yet
export async function peekUnread(squadId) {
  try {
    let since;
    try { const v = Number(localStorage.getItem(chatSeenKey(squadId))); if (v) since = new Date(v).toISOString(); } catch { /* ignore */ }
    const r = await fetch('/api/squads/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ peek: true, since, squadId }) });
    const j = await r.json();
    return j && j.success !== false ? (j.unread || 0) : 0;
  } catch { return 0; }
}
export const OPEN_SQUAD_KEY = 'es_open_squad';

// One-tap way into your squads from the home and exam screens: shows how many squadmates are online.
export default function SquadShortcut({ email, onOpen }) {
  const [info, setInfo] = useState(null); // { squads, online }
  const [unread, setUnread] = useState({}); // squadId -> unread messages

  useEffect(() => {
    if (!email || !getSessionToken()) return undefined;
    let on = true;
    const load = async () => {
      const r = await getSquad(email);
      if (!on || !r || !r.success) return;
      const list = r.squads && r.squads.length ? r.squads : (r.squad ? [r.squad] : []);
      const seen = new Set();
      list.forEach((q) => (q.members || []).forEach((m) => { if (m.online && m.email !== email) seen.add(m.email); }));
      setInfo({ squads: list, online: seen.size });
      const map = {};
      await Promise.all(list.filter((q) => q.id && !q._local).map(async (q) => { map[q.id] = await peekUnread(q.id); }));
      if (on) setUnread(map);
    };
    load();
    const t = setInterval(() => { if (!document.hidden) load(); }, 30000);
    return () => { on = false; clearInterval(t); };
  }, [email]);

  if (!info || !onOpen) return null;
  const n = info.squads.length;
  const total = Object.values(unread).reduce((a, b) => a + b, 0);
  const openOne = (id) => { try { sessionStorage.setItem(OPEN_SQUAD_KEY, id); } catch { /* ignore */ } onOpen(); };
  const sub = total ? `${total} new message${total === 1 ? '' : 's'}` : info.online ? `${info.online} squadmate${info.online === 1 ? '' : 's'} online now` : 'Open squad and chat';
  return (
    <div className="sq-short-wrap">
      <button className={`sq-short ${info.online ? 'live' : ''} ${total ? 'new' : ''}`} onClick={onOpen}>
        <span className="sq-short-ic" aria-hidden="true">👥</span>
        <span className="sq-short-txt">
          {n === 0 ? <><b>Study with friends</b><small>Create or join a squad</small></>
            : <><b>{n === 1 ? info.squads[0].name : `My squads (${n}/${MAX_SQUADS})`}</b><small>{sub}</small></>}
        </span>
        {total > 0 ? <span className="sq-short-badge" aria-label={`${total} unread`}>{total > 99 ? '99+' : total}</span> : info.online > 0 && <i className="squad-dot" aria-hidden="true" />}
        <span className="sq-short-go" aria-hidden="true">›</span>
      </button>
      {n > 1 && (
        <div className="sq-chips" role="list" aria-label="Your squads">
          {info.squads.map((q) => (
            <button key={q.id} role="listitem" className="sq-chip" onClick={() => openOne(q.id)}>
              <span>{q.name}</span>{unread[q.id] > 0 && <em>{unread[q.id] > 99 ? '99+' : unread[q.id]}</em>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

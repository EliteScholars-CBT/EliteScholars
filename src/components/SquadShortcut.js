import React, { useEffect, useState } from 'react';
import { getSquad, MAX_SQUADS } from '../utils/squadApi';
import { getSessionToken } from '../utils/sessionFetch';
import '../styles/squads.css';

// One-tap way into your squads from the home and exam screens: shows how many squadmates are online.
export default function SquadShortcut({ email, onOpen }) {
  const [info, setInfo] = useState(null); // { squads, online }

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
    };
    load();
    const t = setInterval(() => { if (!document.hidden) load(); }, 60000);
    return () => { on = false; clearInterval(t); };
  }, [email]);

  if (!info || !onOpen) return null;
  const n = info.squads.length;
  return (
    <button className={`sq-short ${info.online ? 'live' : ''}`} onClick={onOpen}>
      <span className="sq-short-ic" aria-hidden="true">👥</span>
      <span className="sq-short-txt">
        {n === 0 ? <><b>Study with friends</b><small>Create or join a squad</small></>
          : <><b>{n === 1 ? info.squads[0].name : `My squads (${n}/${MAX_SQUADS})`}</b><small>{info.online ? `${info.online} squadmate${info.online === 1 ? '' : 's'} online now` : 'Open squad and chat'}</small></>}
      </span>
      {info.online > 0 && <i className="squad-dot" aria-hidden="true" />}
      <span className="sq-short-go" aria-hidden="true">›</span>
    </button>
  );
}

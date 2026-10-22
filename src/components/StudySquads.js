import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from './Icon';
import Confetti from './Confetti';
import SquadChat, { chatSeenKey } from './SquadChat';
import { wantsChat, clearOpenChat } from '../utils/chatLink';
import EliteBadge from './EliteBadge';
import { MAX_SQUADS } from '../utils/squadApi';
import { createSquad, joinSquad, getSquad, leaveSquad, genSquadCode, loadSquadCache, saveSquadCache, clearSquadCache } from '../utils/squadApi';
import { loadUser } from '../utils/storage';
import '../styles/squads.css';

// ============================================================================
// StudySquads — small-group study rooms with a shared leaderboard.
//
// CREATE works today, right now, with no backend: it generates a join code
// and caches the squad locally so the UI is fully usable while the Apps
// Script catches up. JOIN is honest about needing the backend — looking up
// someone else's squad from a code genuinely requires a server, so until
// that handler exists it shows a clear "couldn't reach the server" message
// rather than faking a connection.
// ============================================================================

export default function StudySquads({ userEmail, userName }) {
  // A student can be in several squads (up to 5): `squads` is the list, `activeId` the one on screen.
  const [squads, setSquads] = useState(() => { const c = loadSquadCache(); return c ? [c] : []; });
  const [activeId, setActiveId] = useState(() => { const c = loadSquadCache(); return c ? c.id : null; });
  const squad = squads.find((q) => q.id === activeId) || squads[0] || null;
  const [view, setView]     = useState('loading'); // loading | hub | create | join
  const [name, setName]     = useState('');
  const [code, setCode]     = useState('');
  const [busy, setBusy]     = useState(false);
  const [error, setError]   = useState('');
  const [celebrate, setCelebrate] = useState(false);
  const [synced, setSynced] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [copied, setCopied] = useState('');
  const copyTimer = useRef(null);

  const pick = (q) => { setActiveId(q.id); saveSquadCache(q); setUnread(0); };
  const addSquad = (q) => {
    setSquads((list) => (list.some((x) => x.id === q.id) ? list.map((x) => (x.id === q.id ? q : x)) : [...list, q]));
    pick(q);
  };

  const refresh = useCallback(async () => {
    if (!userEmail) { setView(squads.length ? 'hub' : 'create'); return; }
    const res = await getSquad(userEmail);
    const fresh = res.success ? (res.squads && res.squads.length ? res.squads : (res.squad ? [res.squad] : [])) : [];
    if (fresh.length) {
      setSquads(fresh);
      setActiveId((cur) => (fresh.some((q) => q.id === cur) ? cur : fresh[0].id));
      const keep = fresh.find((q) => q.id === activeId) || fresh[0];
      saveSquadCache(keep);
      setSynced(true);
    }
    setView(squads.length || fresh.length ? 'hub' : 'create');
  }, [userEmail]); // eslint-disable-line

  useEffect(() => { refresh(); }, [refresh]);

  // keep "who is online" fresh while the squad screen is open
  useEffect(() => {
    if (!userEmail) return undefined;
    const t = setInterval(() => { if (!document.hidden) refresh(); }, 45000);
    return () => clearInterval(t);
  }, [userEmail, refresh]);

  // unread badge + deep link from a push notification
  useEffect(() => {
    if (!synced || !squad || squad._local) return undefined;
    if (wantsChat()) { clearOpenChat(); setChatOpen(true); return undefined; }
    let on = true;
    const since = (() => { try { const v = Number(localStorage.getItem(chatSeenKey(squad.id))); return v ? new Date(v).toISOString() : undefined; } catch { return undefined; } })();
    (async () => {
      try {
        const r = await fetch('/api/squads/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ peek: true, since, squadId: squad.id }) });
        const j = await r.json();
        if (on && j && j.success !== false) setUnread(j.unread || 0);
      } catch { /* ignore */ }
    })();
    return () => { on = false; };
  }, [synced, squad && squad.id, chatOpen]); // eslint-disable-line

  const finishAdd = () => {
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 2600);
    setName(''); setCode(''); setError('');
    setView('hub');
  };

  const handleCreate = async () => {
    if (!name.trim()) { setError('Give your squad a name first.'); return; }
    setBusy(true); setError('');
    const u = loadUser();
    const res = await createSquad(name.trim(), userEmail, u.username || userName);
    setBusy(false);
    if (res.success && res.squad) {
      addSquad(res.squad);
      setSynced(true);
      finishAdd();
    } else if (res._noBackend) {
      // Backend unreachable: keep a local-first squad so the screen still works.
      const local = {
        id: `local-${Date.now()}`,
        code: genSquadCode(),
        name: name.trim(),
        createdAt: Date.now(),
        members: [{ email: userEmail, username: u.username || '', name: userName, xp: 0, isMe: true }],
        _local: true,
      };
      addSquad(local);
      setSynced(false);
      finishAdd();
    } else {
      setError(res.error || 'Could not create the squad. Try again.');
    }
  };

  const handleJoin = async () => {
    if (code.trim().length < 4) { setError('Enter the squad code your friend shared.'); return; }
    setBusy(true); setError('');
    const u = loadUser();
    const res = await joinSquad(code, userEmail, u.username || userName);
    setBusy(false);
    if (res.success && res.squad) {
      addSquad(res.squad);
      setSynced(true);
      finishAdd();
    } else if (res._noBackend) {
      setError("Couldn't reach the server to find that squad. Check your connection and try again in a moment.");
    } else {
      setError(res.error || 'No squad found with that code.');
    }
  };

  const handleLeave = async () => {
    if (!squad) return;
    if (!window.confirm(`Leave "${squad.name}"?`)) return;
    if (!squad._local) leaveSquad(squad.id, userEmail);
    const rest = squads.filter((q) => q.id !== squad.id);
    setSquads(rest);
    if (rest.length) { setActiveId(rest[0].id); saveSquadCache(rest[0]); setView('hub'); }
    else { clearSquadCache(); setActiveId(null); setView('create'); }
  };

  const copyCode = async () => {
    const text = squad.code;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch { /* fall back below */ }
    if (!ok) {
      try {
        const t = document.createElement('textarea');
        t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select(); ok = document.execCommand('copy'); document.body.removeChild(t);
      } catch { ok = false; }
    }
    setCopied(ok ? 'Copied!' : 'Press and hold the code to copy');
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(''), 2000);
  };
  const shareCode = () => {
    const text = `Join my study squad "${squad.name}" on EliteScholars! Use code ${squad.code} to jump in: ${window.location.origin}/?squad=${squad.code}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const seenText = (m) => {
    if (m.online || m.isMe) return 'Online now';
    if (!m.last_seen) return '';
    const min = Math.max(1, Math.round((Date.now() - new Date(m.last_seen).getTime()) / 60000));
    if (min < 60) return `Seen ${min}m ago`;
    const h = Math.round(min / 60);
    return h < 24 ? `Seen ${h}h ago` : `Seen ${Math.round(h / 24)}d ago`;
  };

  if (view === 'loading') {
    return <div className="squad-loading"><Icon name="users" size={26} /></div>;
  }

  if (view === 'hub' && squad) {
    const ranked = [...(squad.members || [])].sort((a, b) => (b.xp || 0) - (a.xp || 0));
    const onlineCount = ranked.filter((m) => m.online || m.isMe).length;
    return (
      <div className="squad-hub">
        {celebrate && <Confetti count={50} />}
        {(squads.length > 1 || squads.length < MAX_SQUADS) && (
          <div className="squad-tabs" role="tablist" aria-label="Your squads">
            {squads.map((q) => (
              <button key={q.id} role="tab" aria-selected={q.id === squad.id} className={`squad-tab ${q.id === squad.id ? 'on' : ''}`} onClick={() => { pick(q); setView('hub'); }}>{q.name}</button>
            ))}
            {squads.length < MAX_SQUADS && <button className="squad-tab add" onClick={() => { setView('create'); setError(''); }}>＋ Add squad</button>}
          </div>
        )}
        <div className="squad-hub-card">
          <div className="squad-hub-top">
            <div className="squad-hub-icon"><Icon name="users" size={22} /></div>
            <div>
              <div className="squad-hub-name">{squad.name}</div>
              <div className="squad-hub-meta">{ranked.length} member{ranked.length === 1 ? '' : 's'}{synced && !squad._local ? <span className="squad-online-count"> · <i className="squad-dot" /> {onlineCount} online</span> : null}{!synced && <span className="squad-pending"> · syncing…</span>}</div>
            </div>
          </div>
          <div className="squad-code-row">
            <span className="squad-code-label">Invite code</span>
            <span className="squad-code allow-copy">{squad.code}</span>
            <button className={`squad-code-copy ${copied ? 'done' : ''}`} onClick={copyCode} aria-label="Copy invite code">
              {copied === 'Copied!' ? <>✓ Copied</> : <Icon name="share" size={13} />}
            </button>
          </div>
          {copied && copied !== 'Copied!' && <div className="squad-copied-note">{copied}</div>}
          <button className="squad-whatsapp-btn" onClick={shareCode}><Icon name="users" size={15} /> Invite friends</button>
        </div>
        <div className="squad-toast" role="status" aria-live="polite" data-show={copied === 'Copied!' ? '1' : '0'}>Squad code copied</div>

        {synced && !squad._local && (
          <button className="sq-chat-btn" onClick={() => { setChatOpen(true); setUnread(0); }}>
            💬 Squad chat {unread > 0 && <span className="sq-chat-dot">{unread > 9 ? '9+' : unread}</span>}
          </button>
        )}
        {chatOpen && <SquadChat squadId={squad._local ? undefined : squad.id} squadName={squad.name} isOwner={!!squad.is_owner} onClose={() => setChatOpen(false)} />}

        {!synced && (
          <div className="squad-sync-note">
            <Icon name="wifiOff" size={15} />
            <span>You're set up locally. Once sync is live, friends who join with your code will show up here automatically.</span>
          </div>
        )}

        <div className="squad-board-title">Squad leaderboard</div>
        <div className="squad-board">
          {ranked.map((m, i) => (
            <div key={m.email} className={`squad-row ${m.isMe || m.email === userEmail ? 'me' : ''}`} style={{ animationDelay: `${i * 60}ms` }}>
              <span className={`squad-rank ${i < 3 ? `top top${i + 1}` : ''}`}>{i < 3 ? <Icon name={i === 0 ? 'crown' : 'star'} size={13} /> : i + 1}</span>
              <span className="elite-wrap squad-av-wrap">
                <span className="squad-av">{String(m.name || m.username || '?').trim().charAt(0).toUpperCase()}</span>
                {(m.online || m.isMe || m.email === userEmail) && <i className="squad-av-dot" title="Online" />}
                {m.elite && <EliteBadge size={13} />}
              </span>
              <span className="squad-row-main">
                <span className="squad-row-name">{m.name || m.username || m.email}{(m.isMe || m.email === userEmail) && ' (you)'}</span>
                {synced && !squad._local && <small className={`squad-seen ${m.online || m.email === userEmail ? 'on' : ''}`}>{m.email === userEmail ? 'Online now' : seenText(m)}</small>}
              </span>
              <span className="squad-row-xp">{(m.xp || 0).toLocaleString()} XP</span>
            </div>
          ))}
        </div>

        <button className="squad-leave-btn" onClick={handleLeave}><Icon name="x" size={14} /> Leave this squad</button>
      </div>
    );
  }

  return (
    <div className="squad-setup">
      <div className="squad-setup-icon"><Icon name="users" size={30} /></div>
      <h3>{squads.length ? 'Add another squad' : 'Study Squads'}</h3>
      <p>{squads.length ? `You can be in up to ${MAX_SQUADS} squads: one for class, one for friends, one for your exam.` : 'Form a small group with friends or classmates and climb a shared leaderboard together.'}</p>
      {squads.length > 0 && <button className="squad-link-btn" onClick={() => { setView('hub'); setError(''); }}>← Back to my squads</button>}

      {view === 'create' && (
        <div className="squad-form">
          <input className="squad-input" placeholder="Squad name, e.g. SS2 Biology Crew" value={name} onChange={(e) => setName(e.target.value)} maxLength={28} />
          {error && <div className="squad-error">{error}</div>}
          <button className="squad-primary-btn" disabled={busy} onClick={handleCreate}>
            {busy ? 'Creating…' : <>Create a squad <Icon name="arrowRight" size={16} /></>}
          </button>
          <button className="squad-link-btn" onClick={() => { setView('join'); setError(''); }}>Have a code? Join one instead</button>
        </div>
      )}

      {view === 'join' && (
        <div className="squad-form">
          <input className="squad-input squad-code-input" placeholder="ABC123" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={8} />
          {error && <div className="squad-error">{error}</div>}
          <button className="squad-primary-btn" disabled={busy} onClick={handleJoin}>
            {busy ? 'Joining…' : <>Join squad <Icon name="arrowRight" size={16} /></>}
          </button>
          <button className="squad-link-btn" onClick={() => { setView('create'); setError(''); }}>Create your own instead</button>
        </div>
      )}
    </div>
  );
}

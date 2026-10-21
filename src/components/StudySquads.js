import React, { useState, useEffect, useCallback } from 'react';
import Icon from './Icon';
import Confetti from './Confetti';
import SquadChat, { chatSeenKey } from './SquadChat';
import { wantsChat, clearOpenChat } from '../utils/chatLink';
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
  const [squad, setSquad]   = useState(() => loadSquadCache());
  const [view, setView]     = useState('loading'); // loading | hub | create | join
  const [name, setName]     = useState('');
  const [code, setCode]     = useState('');
  const [busy, setBusy]     = useState(false);
  const [error, setError]   = useState('');
  const [celebrate, setCelebrate] = useState(false);
  const [synced, setSynced] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const refresh = useCallback(async () => {
    if (!userEmail) { setView(squad ? 'hub' : 'create'); return; }
    const res = await getSquad(userEmail);
    if (res.success && res.squad) {
      setSquad(res.squad);
      saveSquadCache(res.squad);
      setSynced(true);
    }
    setView(squad || (res.success && res.squad) ? 'hub' : 'create');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  useEffect(() => { refresh(); }, [refresh]);

  // unread badge + deep link from a push notification
  useEffect(() => {
    if (!synced || !squad || squad._local) return undefined;
    if (wantsChat()) { clearOpenChat(); setChatOpen(true); return undefined; }
    let on = true;
    const since = (() => { try { const v = Number(localStorage.getItem(chatSeenKey('any'))); return v ? new Date(v).toISOString() : undefined; } catch { return undefined; } })();
    (async () => {
      try {
        const r = await fetch('/api/squads/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ peek: true, since }) });
        const j = await r.json();
        if (on && j && j.success !== false) setUnread(j.unread || 0);
      } catch { /* ignore */ }
    })();
    return () => { on = false; };
  }, [synced, squad, chatOpen]);

  const handleCreate = async () => {
    if (!name.trim()) { setError('Give your squad a name first.'); return; }
    setBusy(true); setError('');
    const u = loadUser();
    const res = await createSquad(name.trim(), userEmail, u.username || userName);
    setBusy(false);
    if (res.success && res.squad) {
      setSquad(res.squad);
      saveSquadCache(res.squad);
      setSynced(true);
    } else {
      // No backend yet — build a local-first squad so the feature is fully
      // usable now. It'll pick up real sync automatically once the Apps
      // Script action exists, since getSquad() will then start returning
      // server data under the same cached id/code.
      const local = {
        id: `local-${Date.now()}`,
        code: genSquadCode(),
        name: name.trim(),
        createdAt: Date.now(),
        members: [{ email: userEmail, username: u.username || '', name: userName, xp: 0, isMe: true }],
        _local: true,
      };
      setSquad(local);
      saveSquadCache(local);
      setSynced(false);
    }
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 2600);
    setView('hub');
  };

  const handleJoin = async () => {
    if (code.trim().length < 4) { setError('Enter the squad code your friend shared.'); return; }
    setBusy(true); setError('');
    const u = loadUser();
    const res = await joinSquad(code, userEmail, u.username || userName);
    setBusy(false);
    if (res.success && res.squad) {
      setSquad(res.squad);
      saveSquadCache(res.squad);
      setSynced(true);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2600);
      setView('hub');
    } else {
      setError("Couldn't reach the server to find that squad. Check your connection and try again in a moment.");
    }
  };

  const handleLeave = async () => {
    if (!squad) return;
    if (!squad._local) leaveSquad(squad.id, userEmail);
    clearSquadCache();
    setSquad(null);
    setView('create');
  };

  const copyCode = () => { navigator.clipboard?.writeText(squad.code).catch(() => {}); };
  const shareCode = () => {
    const text = `Join my study squad "${squad.name}" on EliteScholars! Use code ${squad.code} to jump in: ${window.location.origin}/?squad=${squad.code}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (view === 'loading') {
    return <div className="squad-loading"><Icon name="users" size={26} /></div>;
  }

  if (view === 'hub' && squad) {
    const ranked = [...(squad.members || [])].sort((a, b) => (b.xp || 0) - (a.xp || 0));
    return (
      <div className="squad-hub">
        {celebrate && <Confetti count={50} />}
        <div className="squad-hub-card">
          <div className="squad-hub-top">
            <div className="squad-hub-icon"><Icon name="users" size={22} /></div>
            <div>
              <div className="squad-hub-name">{squad.name}</div>
              <div className="squad-hub-meta">{ranked.length} member{ranked.length === 1 ? '' : 's'}{!synced && <span className="squad-pending"> · syncing…</span>}</div>
            </div>
          </div>
          <div className="squad-code-row">
            <span className="squad-code-label">Invite code</span>
            <span className="squad-code">{squad.code}</span>
            <button className="squad-code-copy" onClick={copyCode}><Icon name="share" size={13} /></button>
          </div>
          <button className="squad-whatsapp-btn" onClick={shareCode}><Icon name="users" size={15} /> Invite friends</button>
        </div>

        {synced && !squad._local && (
          <button className="sq-chat-btn" onClick={() => { setChatOpen(true); setUnread(0); }}>
            💬 Squad chat {unread > 0 && <span className="sq-chat-dot">{unread > 9 ? '9+' : unread}</span>}
          </button>
        )}
        {chatOpen && <SquadChat squadName={squad.name} isOwner={!!squad.is_owner} onClose={() => setChatOpen(false)} />}

        {!synced && (
          <div className="squad-sync-note">
            <Icon name="wifiOff" size={15} />
            <span>You're set up locally. Once sync is live, friends who join with your code will show up here automatically.</span>
          </div>
        )}

        <div className="squad-board-title">Squad leaderboard</div>
        <div className="squad-board">
          {ranked.map((m, i) => (
            <div key={m.email} className={`squad-row ${m.isMe ? 'me' : ''}`} style={{ animationDelay: `${i * 60}ms` }}>
              <span className={`squad-rank ${i < 3 ? `top top${i + 1}` : ''}`}>{i < 3 ? <Icon name={i === 0 ? 'crown' : 'star'} size={13} /> : i + 1}</span>
              <span className="squad-row-name">{m.name || m.username || m.email}{m.isMe && ' (you)'}</span>
              <span className="squad-row-xp">{(m.xp || 0).toLocaleString()} XP</span>
            </div>
          ))}
        </div>

        <button className="squad-leave-btn" onClick={handleLeave}><Icon name="x" size={14} /> Leave squad</button>
      </div>
    );
  }

  return (
    <div className="squad-setup">
      <div className="squad-setup-icon"><Icon name="users" size={30} /></div>
      <h3>Study Squads</h3>
      <p>Form a small group with friends or classmates and climb a shared leaderboard together.</p>

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

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { enablePush, pushSupported, lastPushError } from '../utils/push';
import { scheduleDailyReminder } from '../utils/notifications';
import Icon from './Icon';
import { trackNotif } from '../utils/pushTrack';

const KEY = 'es_notif_prompt_v1'; // { n: times dismissed, at: last dismissed }
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* ignore */ } };

// Our own explanation shown BEFORE the browser's permission box, so people know why we ask.
// "Not now" asks again after 3 days, at most 3 times; the switch in Me → Settings always stays available.
export default function NotificationPrompt({ active, name, reminderTimes }) {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!active || !pushSupported() || Notification.permission !== 'default') return undefined;
    const st = read();
    if ((st.n || 0) >= 3 || (st.at && Date.now() - st.at < 3 * 86400000)) return undefined;
    const t = setTimeout(() => { setShow(true); trackNotif('notif_prompt_shown'); }, 9000); // let them settle in first
    return () => clearTimeout(t);
  }, [active]);

  if (!show) return null;
  const later = () => { trackNotif('notif_prompt_declined'); const st = read(); write({ n: (st.n || 0) + 1, at: Date.now() }); setShow(false); };
  const allow = async () => {
    setBusy(true); setMsg('');
    trackNotif('notif_prompt_allow_tapped');
    const r = await enablePush();
    setBusy(false);
    trackNotif(r === 'on' ? 'notif_enabled' : r === 'blocked' ? 'notif_blocked' : 'notif_failed', r === 'on' || r === 'blocked' ? undefined : { why: String(lastPushError || r).slice(0, 80), ua: String(navigator.userAgent || '').slice(0, 160) });
    if (r === 'on') {
      try { scheduleDailyReminder(reminderTimes || [18], name || 'Scholar'); } catch { /* ignore */ }
      write({ n: 99, at: Date.now() });
      setShow(false);
    } else if (r === 'blocked') {
      setMsg('Notifications are blocked. You can allow them in your browser settings for EliteScholars.');
      write({ n: 99, at: Date.now() });
    } else { setMsg(lastPushError === 'offline' ? 'No internet connection. Connect and try again.' : lastPushError === 'signed-out' ? 'Please sign in again, then turn notifications on.' : 'Could not turn them on right now. Check your connection and try again, or use Me → Settings.'); }
  };

  const WHY = [
    ['clock', 'Daily study reminder', 'A nudge at your study time so you keep your streak.'],
    ['swords', 'Challenges from friends', 'Know the moment someone challenges you.'],
    ['users', 'Squad chat and status replies', 'Messages from your squad and replies to your status.'],
  ];
  return createPortal(
    <div className="np-bg" role="dialog" aria-label="Turn on notifications">
      <div className="np-card">
        <div className="np-ic"><Icon name="bell" size={26} /></div>
        <h3>Turn on notifications?</h3>
        <p>We only send what helps you study. You can switch this off any time in Me → Settings.</p>
        <ul>{WHY.map(([ic, t, d]) => <li key={t}><span><Icon name={ic} size={18} /></span><div><b>{t}</b><small>{d}</small></div></li>)}</ul>
        {msg && <div className="np-msg">{msg}</div>}
        <button className="np-yes" disabled={busy} onClick={allow}>{busy ? 'Asking your phone…' : 'Yes, turn on'}</button>
        <button className="np-no" onClick={later}>Not now</button>
      </div>
    </div>,
    document.body
  );
}

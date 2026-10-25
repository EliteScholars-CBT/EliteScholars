import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, ago } from './adminApi';

const FLAG = { explicit: ['Explicit words', '#DC2626'], scam: ['Money / scam offer', '#D97706'], link: ['Link', '#2563EB'], phone: ['Phone number', '#7C3AED'], adult: ['Nudity / adult photo', '#DC2626'], flagged: ['Flagged photo', '#DC2626'] };
const WHERE = { status: 'Status', reply: 'Status reply', chat: 'Squad chat', 'chat-edit': 'Chat edit', photo: 'Status photo', voice: 'Voice note' };
const flagOf = (f) => { const k = String(f).replace(/^photo:/, ''); return FLAG[k] || [k, '#6B7280']; };

// Everything students tried to post that was REFUSED: who, where, what they wrote and the picture.
export default function AdminSecurity({ token, onAuthFail, onOpenStudent }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [open, setOpen] = useState(null);
  const [imgs, setImgs] = useState({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async (before) => {
    setBusy(true); setErr('');
    try {
      const d = await api('security', { query: { before } });
      setItems((cur) => (before ? [...cur, ...d.items] : d.items)); setNext(d.next);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api]);
  useEffect(() => { load(); const t = setInterval(() => load(), 45000); return () => clearInterval(t); }, [load]);

  const show = async (it) => {
    setOpen(open === it.id ? null : it.id);
    if (it.mediaId && !imgs[it.mediaId]) {
      try { const d = await api('status-media', { query: { id: it.mediaId } }); setImgs((m) => ({ ...m, [it.mediaId]: d.image })); } catch { /* ignore */ }
    }
  };
  const suspend = async (it) => {
    const reason = window.prompt(`Suspend ${it.name}? Their statuses are removed and they cannot sign in. Reason (optional):`, 'Posting not-allowed content');
    if (reason === null) return;
    try { await api('status-suspend', { method: 'POST', body: { email: it.email, suspended: true, reason } }); setItems((l) => l.map((x) => (x.email === it.email ? { ...x, suspended: true } : x))); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  };

  const shown = items.filter((i) => filter === 'all' || (filter === 'photos' ? !!i.mediaId || i.where === 'photo' : filter === 'words' ? !i.mediaId && i.where !== 'photo' : i.weekCount >= 3));
  return (
    <div>
      <section className="adm-controls">
        <div className="adm-pills">{[['all', 'All'], ['words', 'Words / links'], ['photos', 'Photos'], ['repeat', 'Repeat offenders']].map(([k, l]) => <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>{l}</button>)}</div>
      </section>
      <p className="adm-note">Every refused post is kept here, even though the student never saw it go through. Tap one to see the details and the picture. These also appear in the student's activity.</p>
      {err && <div className="adm-error">{err}</div>}
      <div className="adm-list">
        {shown.map((it) => {
          const [fl, col] = flagOf(it.flag);
          return (
            <div className="adm-item" key={it.id}>
              <button className="adm-item-head" onClick={() => show(it)}>
                <span className="adm-item-main"><b>{it.name}</b><small>{WHERE[it.where] || it.where} · {ago(it.at)}{it.weekCount >= 3 ? ` · ${it.weekCount} this week` : ''}</small></span>
                <span className="adm-item-side"><b style={{ color: col }}>{fl}</b>{it.suspended && <small>suspended</small>}</span>
              </button>
              {open === it.id && (
                <div className="adm-item-body">
                  <div className="adm-kv"><span>Student</span><b>{it.name} · {it.email}</b></div>
                  <div className="adm-kv"><span>When</span><b>{fmtDT(it.at)}</b></div>
                  <div className="adm-kv"><span>Where</span><b>{WHERE[it.where] || it.where}{it.detail ? ` (${it.detail})` : ''}</b></div>
                  <div className="adm-kv"><span>Why stopped</span><b style={{ color: col }}>{fl}</b></div>
                  {it.text ? <pre className="adm-pre">{it.text}</pre> : null}
                  {it.mediaId && (imgs[it.mediaId] ? <img className="adm-sec-img" src={imgs[it.mediaId]} alt="Refused photo" /> : <p className="adm-note">Loading picture…</p>)}
                  <div className="adm-actions">
                    {onOpenStudent && <button className="adm-small" onClick={() => onOpenStudent(it.email)}>Open student</button>}
                    {!it.suspended && <button className="adm-small danger" onClick={() => suspend(it)}>Suspend account</button>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {!shown.length && !busy && <p className="adm-empty">Nothing blocked yet.</p>}
      </div>
      {next && <button className="adm-small" disabled={busy} onClick={() => load(next)}>{busy ? 'Loading…' : 'Load older'}</button>}
    </div>
  );
}

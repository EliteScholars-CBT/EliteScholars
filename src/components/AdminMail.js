import React, { useState, useEffect, useCallback, useRef } from 'react';

const FILTERS = {
  students: [['all', 'All students'], ['premium', 'Premium only'], ['free', 'Free only'], ['selected', 'Choose specific students']],
  partners: [['all', 'All partners'], ['active', 'Active partners'], ['pending', 'Pending partners'], ['selected', 'Choose specific partners']],
};

// Email centre: write one message and send it to partners or students — everyone,
// a group, or hand-picked people — directly or through CampMailer.
export default function AdminMail({ token, onAuthFail }) {
  const [kind, setKind] = useState('students');
  const [mode, setMode] = useState('all');
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState([]);
  const [picked, setPicked] = useState([]);
  const [pasted, setPasted] = useState('');
  const [info, setInfo] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('Hi {{first_name}},\n\n');
  const [channel, setChannel] = useState('direct');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [history, setHistory] = useState([]);
  const timer = useRef(null);

  const api = useCallback(async (path, method = 'GET', body) => {
    const r = await fetch(`/api/admin/${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { onAuthFail(d.error); throw new Error('auth'); }
    if (!d.success) throw new Error(d.error || 'Something went wrong.');
    return d;
  }, [token, onAuthFail]);

  const loadAudience = useCallback(async (q = '') => {
    try {
      const d = await api(`mail-audience?kind=${kind}${q ? `&search=${encodeURIComponent(q)}` : ''}`);
      setInfo(d); setMatches(d.matches || []);
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api, kind]);

  const loadHistory = useCallback(async () => {
    try { const d = await api('mail-history'); setHistory(d.campaigns || []); } catch (e) { /* ignore */ }
  }, [api]);

  useEffect(() => { setMode('all'); setPicked([]); setMatches([]); setSearch(''); loadAudience(); }, [kind]); // eslint-disable-line
  useEffect(() => { loadHistory(); }, [loadHistory]);

  const onSearch = (v) => {
    setSearch(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => loadAudience(v.trim()), 350);
  };
  const add = (m) => setPicked((p) => (p.some((x) => x.email === m.email) ? p : [...p, m]));
  const addPasted = () => {
    const list = pasted.split(/[\s,;]+/).map((x) => x.trim().toLowerCase()).filter((x) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x));
    setPicked((p) => { const s = new Set(p.map((x) => x.email)); return [...p, ...list.filter((e) => !s.has(e)).map((e) => ({ email: e, name: e }))]; });
    setPasted('');
  };

  const selected = mode === 'selected';
  const count = selected ? picked.length
    : !info ? 0
    : kind === 'students' ? (mode === 'premium' ? info.counts.premium : mode === 'free' ? info.counts.all - info.counts.premium : info.counts.all)
    : (mode === 'active' ? info.counts.active : mode === 'pending' ? info.counts.pending : info.counts.all);

  const send = async () => {
    setErr(''); setMsg('');
    if (selected && !picked.length) { setErr('Pick at least one person.'); return; }
    if (!window.confirm(`Send "${subject || '(no subject)'}" to about ${count} ${kind} via ${channel === 'campmailer' ? 'CampMailer' : 'direct email'}?`)) return;
    setBusy(true);
    try {
      const audience = selected ? { kind, mode: 'selected', emails: picked.map((p) => p.email) } : { kind, mode: 'all', filter: mode };
      const d = await api('mail-send', 'POST', { audience, subject, message, channel });
      setMsg(`Done: ${d.sent} sent${d.failed ? `, ${d.failed} failed` : ''}${channel === 'campmailer' ? ' (handed to CampMailer)' : ''}.`);
      loadHistory();
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };

  const cmOk = info && info.campmailer;
  const directOk = info && info.direct;

  return (
    <div>
      <section className="adm-card">
        <h2>1. Who gets it?</h2>
        <div className="adm-tabs">
          <button className={kind === 'students' ? 'on' : ''} onClick={() => setKind('students')}>Students</button>
          <button className={kind === 'partners' ? 'on' : ''} onClick={() => setKind('partners')}>Partners</button>
        </div>
        <div className="adm-mail-opts">
          {FILTERS[kind].map(([id, label]) => (
            <label key={id}><input type="radio" name="aud" checked={mode === id} onChange={() => setMode(id)} /> {label}</label>
          ))}
        </div>

        {selected && (
          <div className="adm-mail-pick">
            <input className="adm-input" placeholder={`Search ${kind} by name, username or email…`} value={search} onChange={(e) => onSearch(e.target.value)} />
            {matches.length > 0 && (
              <div className="adm-mail-results">
                {matches.map((m) => (
                  <button key={m.email} onClick={() => add(m)}><b>{m.name || m.email}</b><small>{m.email}{m.tag ? ` · ${m.tag}` : ''}</small><span>+ Add</span></button>
                ))}
              </div>
            )}
            <div className="adm-mail-paste">
              <textarea className="adm-input" rows={2} placeholder="Or paste emails (comma, space or new line)" value={pasted} onChange={(e) => setPasted(e.target.value)} />
              <button onClick={addPasted} disabled={!pasted.trim()}>Add pasted</button>
            </div>
            <div className="adm-mail-chips">
              {picked.map((p) => <span key={p.email}>{p.name && p.name !== p.email ? p.name : p.email}<button onClick={() => setPicked((x) => x.filter((y) => y.email !== p.email))} aria-label="Remove">×</button></span>)}
              {picked.length > 0 && <button className="adm-ghost" onClick={() => setPicked([])}>Clear all</button>}
            </div>
          </div>
        )}
        <p className="adm-hint">Recipients: <b>{count}</b>. Anyone who unsubscribed is skipped automatically.</p>
      </section>

      <section className="adm-card">
        <h2>2. Write it</h2>
        <input className="adm-input" placeholder="Subject" value={subject} maxLength={150} onChange={(e) => setSubject(e.target.value)} />
        <textarea className="adm-input" rows={9} value={message} maxLength={8000} onChange={(e) => setMessage(e.target.value)} />
        <p className="adm-hint">Personalise with <code>{'{{first_name}}'}</code>, <code>{'{{name}}'}</code> or <code>{'{{email}}'}</code>. An unsubscribe link is added for you.</p>
      </section>

      <section className="adm-card">
        <h2>3. Send</h2>
        <div className="adm-mail-opts">
          <label><input type="radio" name="ch" checked={channel === 'direct'} onChange={() => setChannel('direct')} /> Direct email (up to 1,000 at once){info && !directOk ? ' — not set up' : ''}</label>
          <label><input type="radio" name="ch" checked={channel === 'campmailer'} onChange={() => setChannel('campmailer')} /> CampMailer (tracking, coupons, big lists){info && !cmOk ? ' — not connected yet' : ''}</label>
        </div>
        {err && <div className="adm-error">{err}</div>}
        {msg && <div className="adm-ok">{msg}</div>}
        <button className="adm-btn" onClick={send} disabled={busy || !subject.trim() || message.trim().length < 5 || count < 1}>{busy ? 'Sending…' : `Send to ${count}`}</button>
      </section>

      <section className="adm-card">
        <div className="adm-card-head"><h2>Recent sends</h2><button className="adm-ghost" onClick={loadHistory}>Refresh</button></div>
        {history.length === 0 && <p className="adm-hint">Nothing sent yet.</p>}
        {history.map((h) => (
          <div className="adm-mail-hist" key={h.id}>
            <b>{h.subject}</b>
            <small>{new Date(h.created_at).toLocaleString('en-NG')} · {h.audience} · {h.channel} · {h.sent}/{h.recipients} sent{h.failed ? ` · ${h.failed} failed` : ''}{h.error ? ` · ${h.error}` : ''}</small>
          </div>
        ))}
      </section>
    </div>
  );
}

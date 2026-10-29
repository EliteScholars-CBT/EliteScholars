import React, { useState, useEffect, useCallback } from 'react';

const dt = (s) => (s ? new Date(s).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const left = (s) => {
  if (!s) return '';
  const d = Math.ceil((new Date(s).getTime() - Date.now()) / 86400000);
  return d > 0 ? `${d} day${d === 1 ? '' : 's'} left` : 'ended';
};

function Chip({ on, children }) {
  return <span className={`adm-chip ${on ? 'active' : 'ended'}`}>{children}</span>;
}

// Free limits, the trial switch, and free-access gifts (one student or everyone).
export default function AdminAccess({ token, onAuthFail }) {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const [sess, setSess] = useState({ minutes: '0', cooldown: '0' });
  const [limits, setLimits] = useState({ topics: '3', cbt: '3', games: '3', fileStudy: '2' });
  const [share, setShare] = useState({ enabled: true, amount: '3', maxClaimsPerDay: '1', verifySeconds: '20' });
  const [trialOn, setTrialOn] = useState(false);
  const [trialDays, setTrialDays] = useState('14');

  const [allDays, setAllDays] = useState('7');
  const [allForever, setAllForever] = useState(false);
  const [allNote, setAllNote] = useState('');

  const [search, setSearch] = useState('');
  const [pick, setPick] = useState('');
  const [days, setDays] = useState('30');
  const [forever, setForever] = useState(false);
  const [note, setNote] = useState('');

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

  const load = useCallback(async (q = '') => {
    setBusy(true);
    try {
      const d = await api(`access${q ? `?search=${encodeURIComponent(q)}` : ''}`);
      setData(d);
      setErr('');
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  }, [api]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!data) return;
    const c = data.config;
    setSess({ minutes: String(c.sessionMinutes || 0), cooldown: String(c.cooldownMinutes || 0) });
    setLimits({ topics: String(c.limits.topics), cbt: String(c.limits.cbt), games: String(c.limits.games), fileStudy: String(c.limits.fileStudy) });
    if (c.shareBonus) setShare({ enabled: c.shareBonus.enabled, amount: String(c.shareBonus.amount), maxClaimsPerDay: String(c.shareBonus.maxClaimsPerDay), verifySeconds: String(c.shareBonus.verifySeconds) });
    setTrialOn(c.trialEnabled);
    setTrialDays(String(c.trialDays));
  }, [data]);

  const act = async (body, okMsg) => {
    setBusy(true); setMsg(''); setErr('');
    try {
      await api('access-action', 'POST', body);
      setMsg(okMsg);
      await load(search.trim().length >= 2 ? search.trim() : '');
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };

  if (!data) return <div className="adm-card">{err ? <div className="adm-error">{err}</div> : 'Loading…'}</div>;
  const g = data.config.global;
  const globalOn = g.active && (g.forever || (g.until && new Date(g.until) > new Date()));
  const dur = (d, f) => (f ? { forever: true } : { days: Number(d) });

  return (
    <div>
      {msg && <div className="adm-ok">{msg}</div>}
      {err && <div className="adm-error">{err}</div>}

      <section className="adm-card">
        <h2>Free plan limits and trial</h2>
        <p className="adm-note">What a free student can do. Daily limits reset at midnight Lagos time. Pro students, trial students and anyone with free access are unlimited.</p>
        <div className="adm-form">
          <label>Free topics per day
            <input type="number" min="0" max="100" value={limits.topics} onChange={(e) => setLimits({ ...limits, topics: e.target.value })} /></label>
          <label>Free CBT sessions per day
            <input type="number" min="0" max="100" value={limits.cbt} onChange={(e) => setLimits({ ...limits, cbt: e.target.value })} /></label>
          <label>Free games per day
            <input type="number" min="0" max="100" value={limits.games} onChange={(e) => setLimits({ ...limits, games: e.target.value })} /></label>
          <label>Free study-from-file uploads (per day)
            <input type="number" min="0" max="100" value={limits.fileStudy} onChange={(e) => setLimits({ ...limits, fileStudy: e.target.value })} /></label>
          <label>Free session length (minutes, 0 = no limit)
            <input type="number" min="0" max="600" value={sess.minutes} onChange={(e) => setSess({ ...sess, minutes: e.target.value })} /></label>
          <label>Cooldown after a session (minutes, 0 = none)
            <input type="number" min="0" max="4320" value={sess.cooldown} onChange={(e) => setSess({ ...sess, cooldown: e.target.value })} /></label>
          <label className="adm-check"><input type="checkbox" checked={trialOn} onChange={(e) => setTrialOn(e.target.checked)} /> Give every NEW student a free trial</label>
          <label>Trial length (days)
            <input type="number" min="1" max="90" value={trialDays} onChange={(e) => setTrialDays(e.target.value)} /></label>
          <button disabled={busy} onClick={() => act({
            action: 'set-config', sessionMinutes: Number(sess.minutes), cooldownMinutes: Number(sess.cooldown), trialEnabled: trialOn, trialDays: Number(trialDays),
            limits: { topics: Number(limits.topics), cbt: Number(limits.cbt), games: Number(limits.games), fileStudy: Number(limits.fileStudy) },
          }, 'Saved.')}>Save limits and trial</button>
        </div>
        <p className="adm-note">Trials start at sign-up, only once per student, and only for students who sign up while this is on. Trials and free access never earn partner commission.</p>
      </section>

      <section className="adm-card">
        <h2>Share a group link to get more</h2>
        <p className="adm-note">When a free student reaches a daily limit (topics, CBT or games), they can share EliteScholars to a WhatsApp group to earn extra uses for that same thing. We can't see inside WhatsApp, so they claim after the wait time below.</p>
        <div className="adm-form">
          <label className="adm-check"><input type="checkbox" checked={share.enabled} onChange={(e) => setShare({ ...share, enabled: e.target.checked })} /> Let free students share for extra uses</label>
          <label>Extra uses per share
            <input type="number" min="1" max="20" value={share.amount} onChange={(e) => setShare({ ...share, amount: e.target.value })} /></label>
          <label>How many times a day (per topics / CBT / games)
            <input type="number" min="1" max="10" value={share.maxClaimsPerDay} onChange={(e) => setShare({ ...share, maxClaimsPerDay: e.target.value })} /></label>
          <label>Wait before they can claim (seconds)
            <input type="number" min="0" max="300" value={share.verifySeconds} onChange={(e) => setShare({ ...share, verifySeconds: e.target.value })} /></label>
          <button disabled={busy} onClick={() => act({ action: 'set-config', shareBonus: { enabled: share.enabled, amount: Number(share.amount), maxClaimsPerDay: Number(share.maxClaimsPerDay), verifySeconds: Number(share.verifySeconds) } }, 'Share settings saved.')}>Save share settings</button>
        </div>
      </section>

      <section className="adm-card">
        <h2>Free access for everyone</h2>
        {globalOn
          ? <p className="adm-note"><Chip on>active</Chip> Everyone is unlimited {g.forever ? <b>forever</b> : <>until <b>{dt(g.until)}</b> ({left(g.until)})</>}{g.note ? ` · ${g.note}` : ''}.</p>
          : <p className="adm-note">Off. Free students follow the limits above.</p>}
        <div className="adm-form">
          <label>For how many days
            <input type="number" min="1" max="3650" disabled={allForever} value={allDays} onChange={(e) => setAllDays(e.target.value)} /></label>
          <label className="adm-check"><input type="checkbox" checked={allForever} onChange={(e) => setAllForever(e.target.checked)} /> Forever (until I switch it off)</label>
          <label>Note (only you see this)
            <input value={allNote} maxLength={200} placeholder="e.g. Exam week promo" onChange={(e) => setAllNote(e.target.value)} /></label>
          <div className="adm-inline">
            <button disabled={busy} onClick={() => window.confirm('Give ALL students unlimited access?') && act({ action: 'grant-all', ...dur(allDays, allForever), note: allNote }, 'Everyone now has free access.')}>Give everyone free access</button>
            {globalOn && <button className="adm-ghost" disabled={busy} onClick={() => act({ action: 'revoke-all' }, 'Free access for everyone switched off.')}>Switch off</button>}
          </div>
        </div>
      </section>

      <section className="adm-card">
        <h2>Give one student free access</h2>
        <div className="adm-form">
          <label>Find a student (email or username)
            <div className="adm-inline">
              <input value={search} placeholder="Type at least 2 letters" onChange={(e) => { setSearch(e.target.value); if (e.target.value.trim().length >= 2) load(e.target.value.trim()); }} />
            </div>
          </label>
          {data.found.length > 0 && (
            <div className="adm-ptable">
              {data.found.map((s) => (
                <div key={s.email} className="adm-prow" style={pick === s.email ? { borderColor: '#8b5cf6' } : null}>
                  <button className="adm-plink" onClick={() => setPick(s.email)}>
                    <b>{s.name || s.username}</b> <small className="adm-sub">{s.email}</small>
                  </button>
                  <Chip on={s.effective !== 'free'}>{s.effective.replace('_', ' ')}</Chip>
                </div>
              ))}
            </div>
          )}
          <label>Student email
            <input value={pick} placeholder="Pick from the list or paste an email" onChange={(e) => setPick(e.target.value)} /></label>
          <label>For how many days
            <input type="number" min="1" max="3650" disabled={forever} value={days} onChange={(e) => setDays(e.target.value)} /></label>
          <label className="adm-check"><input type="checkbox" checked={forever} onChange={(e) => setForever(e.target.checked)} /> Forever</label>
          <label>Note (only you see this)
            <input value={note} maxLength={200} placeholder="e.g. Scholarship, staff child" onChange={(e) => setNote(e.target.value)} /></label>
          <button disabled={busy || !pick} onClick={() => act({ action: 'grant', email: pick, ...dur(days, forever), note }, `Free access given to ${pick}.`)}>Give free access</button>
        </div>
      </section>

      <section className="adm-card">
        <div className="adm-card-head">
          <h2>Free access list</h2>
          <small className="adm-sub">{data.counts.giftsActive} active</small>
        </div>
        {data.gifts.length === 0 && <p className="adm-note">No one has individual free access.</p>}
        <div className="adm-ptable">
          {data.gifts.map((s) => (
            <div key={s.email} className="adm-prow">
              <div style={{ flex: 1, minWidth: 180 }}>
                <b>{s.name || s.username || s.email}</b>
                <small className="adm-sub"> {s.email}</small>
                {s.note && <div className="adm-sub">{s.note}</div>}
              </div>
              <div className="adm-pnums">
                <span>{s.giftForever ? 'Forever' : `Until ${dt(s.giftUntil)}`}</span>
                {!s.giftForever && <span>{left(s.giftUntil)}</span>}
                <span>Given {dt(s.grantedAt)}</span>
              </div>
              <Chip on={s.giftActive}>{s.giftActive ? 'active' : 'expired'}</Chip>
              <button className="adm-ghost" disabled={busy} onClick={() => window.confirm(`Remove free access for ${s.email}?`) && act({ action: 'revoke', email: s.email }, 'Free access removed.')}>Remove</button>
            </div>
          ))}
        </div>
      </section>

      <section className="adm-card">
        <div className="adm-card-head">
          <h2>Free trials</h2>
          <small className="adm-sub">{data.counts.trialsActive} active · {data.counts.trialsEver} ever</small>
        </div>
        {data.trials.length === 0 && <p className="adm-note">No trials yet. Switch on "Give every NEW student a free trial" above.</p>}
        <div className="adm-ptable">
          {data.trials.slice(0, 100).map((s) => (
            <div key={s.email} className="adm-prow">
              <div style={{ flex: 1, minWidth: 180 }}>
                <b>{s.name || s.username || s.email}</b>
                <small className="adm-sub"> {s.email}</small>
              </div>
              <div className="adm-pnums"><span>Ends {dt(s.trialEndsAt)}</span><span>{left(s.trialEndsAt)}</span></div>
              <Chip on={s.trialActive}>{s.trialActive ? 'active' : 'ended'}</Chip>
              {s.trialActive && <button className="adm-ghost" disabled={busy} onClick={() => act({ action: 'end-trial', email: s.email }, 'Trial ended.')}>End now</button>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

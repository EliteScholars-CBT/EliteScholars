import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, fmtDT, ago } from './adminApi';

// Owner-only: create admins, pick exactly what each can do, switch them off, reset passwords.
export default function AdminTeam({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [data, setData] = useState(null);
  const [log, setLog] = useState(null);
  const [err, setErr] = useState('');
  const [secret, setSecret] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'custom', perms: [], sendEmail: true });
  const [edit, setEdit] = useState(null); // { id, perms }
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try { setData(await api('team')); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);
  useEffect(() => { load(); }, [load]);

  const toggle = (perms, k) => (perms.includes(k) ? perms.filter((x) => x !== k) : [...perms, k]);
  const run = async (fn) => { setBusy(true); setErr(''); try { await fn(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(false); };

  const PermBoxes = ({ perms, onChange }) => (
    <div className="adm-perms">{Object.entries(data.permLabels).map(([k, l]) => (
      <label key={k} className={perms.includes(k) ? 'on' : ''}><input type="checkbox" checked={perms.includes(k)} onChange={() => onChange(toggle(perms, k))} />{l}</label>
    ))}</div>
  );

  if (!data) return <div className="adm-card">{err || 'Loading…'}</div>;

  const create = () => run(async () => {
    const d = await api('team-save', { method: 'POST', body: form });
    setSecret({ title: `${form.name} can now sign in`, email: d.email, password: d.password, emailed: d.emailed });
    setForm({ name: '', email: '', role: 'custom', perms: [], sendEmail: true });
    await load();
  });

  return (
    <div>
      {secret && (
        <section className="adm-card adm-secret">
          <h2>{secret.title}</h2>
          <p className="adm-note">Copy this password now — it is only shown once. {secret.emailed ? 'It was also emailed to them.' : ''}</p>
          <div className="adm-linkbox"><span><b>Email:</b> {secret.email}<br /><b>Password:</b> <code>{secret.password}</code></span>
            <button className="adm-small" onClick={() => navigator.clipboard && navigator.clipboard.writeText(`Email: ${secret.email}\nPassword: ${secret.password}\nSign in at https://elitescholars.site/admin`)}>Copy</button></div>
          <button className="adm-ghost adm-gap" onClick={() => setSecret(null)}>Done</button>
        </section>
      )}
      {err && <div className="adm-error">{err}</div>}

      <section className="adm-card">
        <h2>Add an admin</h2>
        <div className="adm-form">
          <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ada Okafor" /></label>
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ada@example.com" /></label>
          <div><span className="adm-lbl">Start from a role</span>
            <div className="adm-pills">{Object.entries(data.roles).map(([k, r]) => <button key={k} className={form.role === k ? 'on' : ''} onClick={() => setForm({ ...form, role: k, perms: [...r.perms] })}>{r.label}</button>)}
              <button className={form.role === 'custom' ? 'on' : ''} onClick={() => setForm({ ...form, role: 'custom', perms: [] })}>Custom</button></div></div>
          <div><span className="adm-lbl">What can they do?</span><PermBoxes perms={form.perms} onChange={(p) => setForm({ ...form, perms: p, role: 'custom' })} /></div>
          <label className="adm-check"><input type="checkbox" checked={form.sendEmail} onChange={(e) => setForm({ ...form, sendEmail: e.target.checked })} /> Email them their sign-in details</label>
          <button disabled={busy || !form.name || !form.email || !form.perms.length} onClick={create}>{busy ? 'Creating…' : 'Create & generate password'}</button>
        </div>
      </section>

      <section className="adm-card">
        <h2>Your team ({data.admins.length})</h2>
        {!data.admins.length && <p className="adm-empty">No team members yet. You are the owner and can do everything.</p>}
        <div className="adm-list tight">
          {data.admins.map((a) => (
            <div key={a.id} className={`adm-item ${edit && edit.id === a.id ? 'open' : ''}`}>
              <div className="adm-item-head static">
                <span className="adm-av">{a.name.charAt(0).toUpperCase()}</span>
                <span className="adm-item-main"><b>{a.name} {!a.active && <span className="adm-chip ended">Off</span>}</b><small>{a.email} · last login {a.last_login ? `${fmtDT(a.last_login)} (${ago(a.last_login)})` : 'never'}</small></span>
              </div>
              <div className="adm-chips">{(a.perms || []).map((p) => <span key={p} className="adm-chip">{data.permLabels[p] || p}</span>)}</div>
              {edit && edit.id === a.id ? (
                <div className="adm-detail">
                  <PermBoxes perms={edit.perms} onChange={(p) => setEdit({ ...edit, perms: p })} />
                  <div className="adm-inline">
                    <button className="adm-small" disabled={busy || !edit.perms.length} onClick={() => run(async () => { await api('team-save', { method: 'POST', body: { id: a.id, perms: edit.perms } }); setEdit(null); await load(); })}>Save access</button>
                    <button className="adm-small adm-ghost" onClick={() => setEdit(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="adm-inline pad">
                  <button className="adm-small" onClick={() => setEdit({ id: a.id, perms: a.perms || [] })}>Edit access</button>
                  <button className="adm-small adm-ghost" onClick={() => run(async () => { await api('team-save', { method: 'POST', body: { id: a.id, perms: a.perms, active: !a.active } }); await load(); })}>{a.active ? 'Turn off' : 'Turn on'}</button>
                  <button className="adm-small adm-ghost" onClick={() => run(async () => { const d = await api('team-reset', { method: 'POST', body: { id: a.id, sendEmail: true } }); setSecret({ title: `New password for ${a.name}`, email: d.email, password: d.password, emailed: d.emailed }); })}>New password</button>
                  <button className="adm-small adm-danger" onClick={() => { if (window.confirm(`Remove ${a.name} as an admin?`)) run(async () => { await api('team-delete', { method: 'POST', body: { id: a.id } }); await load(); }); }}>Remove</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="adm-card">
        <div className="adm-card-head"><h2>Activity log</h2>
          <button className="adm-small adm-ghost" onClick={() => run(async () => { const d = await api('audit'); setLog(d.log); })}>{log ? 'Refresh' : 'Show log'}</button></div>
        {log && (log.length ? <ul className="adm-timeline wide">{log.map((l, i) => <li key={i}><time>{fmtDT(l.created_at)}</time><span><b>{l.admin_name}</b> · {l.action} — {l.detail}</span></li>)}</ul> : <p className="adm-empty">Nothing logged yet.</p>)}
      </section>
    </div>
  );
}

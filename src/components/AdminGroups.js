import React, { useState, useEffect, useMemo } from 'react';
import { makeApi } from './adminApi';

const LABEL = { jamb: 'JAMB', waec: 'WAEC', neco: 'NECO', gst: 'GST', aspirant: 'Aspirants', senior_school: 'SS1–SS3', university: 'University' };
const EMPTY = { id: '', name: '', url: '', audiences: [], on: true };

// WhatsApp study groups: add, edit, switch off or delete, and choose who sees each one.
export default function AdminGroups({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [list, setList] = useState(null);
  const [aud, setAud] = useState(Object.keys(LABEL));
  const [form, setForm] = useState(null);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { api('groups').then((d) => { setList(d.groups); if (d.audiences) setAud(d.audiences); }).catch((e) => e.message !== 'auth' && setErr(e.message)); }, [api]);

  const save = async (g) => {
    setBusy(true); setErr(''); setOk('');
    try { const d = await api('group-save', { method: 'POST', body: g }); setList(d.groups); setForm(null); setOk('Saved.'); }
    catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };
  const del = async (g) => {
    if (!window.confirm(`Delete "${g.name}"?`)) return;
    setBusy(true); setErr(''); setOk('');
    try { const d = await api('group-delete', { method: 'POST', body: { id: g.id } }); setList(d.groups); setOk('Deleted.'); }
    catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };
  const toggleAud = (a) => setForm((f) => ({ ...f, audiences: f.audiences.includes(a) ? f.audiences.filter((x) => x !== a) : [...f.audiences, a] }));

  if (!list) return <div className="adm-card">{err || 'Loading…'}</div>;
  return (
    <div>
      <div className="adm-card">
        <h2>WhatsApp groups</h2>
        <p className="adm-note">Students see the groups that match their level or exam, after a quiz. Switch one off to hide it without deleting.</p>
        <button className="adm-btn" onClick={() => { setForm({ ...EMPTY }); setErr(''); setOk(''); }}>+ Add a group</button>
        {ok && <div className="adm-ok">{ok}</div>}
        {err && <div className="adm-error">{err}</div>}
      </div>
      {form && (
        <div className="adm-card">
          <h2>{form.id ? 'Edit group' : 'New group'}</h2>
          <input placeholder="Group name, e.g. JAMB 2027" value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="https://chat.whatsapp.com/…" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} autoCapitalize="none" />
          <div className="adm-pills">{aud.map((a) => <button key={a} className={form.audiences.includes(a) ? 'on' : ''} onClick={() => toggleAud(a)}>{LABEL[a] || a}</button>)}</div>
          <label className="adm-inline pad"><input type="checkbox" checked={form.on} onChange={(e) => setForm({ ...form, on: e.target.checked })} /> Show to students</label>
          <div className="adm-inline"><button className="adm-btn" disabled={busy} onClick={() => save(form)}>{busy ? 'Saving…' : 'Save'}</button><button className="adm-ghost" onClick={() => setForm(null)}>Cancel</button></div>
        </div>
      )}
      <div className="adm-list">
        {list.map((g) => (
          <div className="adm-item" key={g.id}>
            <div className="adm-item-head" style={{ cursor: 'default' }}>
              <span className="adm-item-main"><b>{g.name}{g.on === false ? ' (hidden)' : ''}</b><small>{(g.audiences || []).map((a) => LABEL[a] || a).join(' · ')}</small><small style={{ wordBreak: 'break-all' }}>{g.url}</small></span>
            </div>
            <div className="adm-inline pad">
              <button className="adm-ghost" onClick={() => { setForm({ ...g }); setErr(''); setOk(''); }}>Edit</button>
              <button className="adm-ghost" disabled={busy} onClick={() => save({ ...g, on: g.on === false })}>{g.on === false ? 'Show' : 'Hide'}</button>
              <button className="adm-ghost" disabled={busy} onClick={() => del(g)}>Delete</button>
            </div>
          </div>
        ))}
        {!list.length && <p className="adm-empty">No groups. Students will see nothing until you add one.</p>}
      </div>
    </div>
  );
}

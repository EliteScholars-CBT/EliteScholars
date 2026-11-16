import React, { useState } from 'react';
import SiteShell from '../components/SiteShell';
import { WA_CHANNEL } from '../utils/constants/links';

const EMAIL = 'elitescholars.site@gmail.com';
const TOPICS = ['Student help', 'Payments & Pro', 'Schools', 'Tutorial centres', 'Partners', 'Something else'];

const mail = (subject, body) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

const I = {
  mail: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>,
  wa: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20z" /><path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1.2-1.2-1.8-1-.8.6c-.8-.4-1.5-1.1-1.9-1.9l.6-.8-1-1.8L9 9.5z" /></svg>,
  school: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5z" /><path d="M7 12v4.5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5V12" /></svg>,
  partner: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5" /><path d="M17 8v6M14 11h6" /></svg>,
  send: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 3-9.5 18-2.5-7.5L1.5 11 21 3z" /><path d="M9 13.5 21 3" /></svg>,
};

const CSS = `
.ct{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:22px;align-items:start}
@media (max-width:860px){.ct{grid-template-columns:1fr}}
.ct-side{display:grid;gap:12px}
.ct-link{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:18px;border:1px solid rgba(124,92,230,.22);background:rgba(124,92,230,.07);color:inherit;text-decoration:none;transition:transform .15s,border-color .15s,background .15s}
.ct-link:hover{transform:translateY(-2px);border-color:rgba(124,92,230,.55);background:rgba(124,92,230,.12)}
.ct-ico{flex:0 0 46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff}
.ct-link b{display:block;font-size:1rem}
.ct-link span.s{display:block;font-size:.86rem;opacity:.75;margin-top:2px;overflow-wrap:anywhere}
.ct-form{padding:26px;border-radius:22px;border:1px solid rgba(124,92,230,.25);background:rgba(124,92,230,.06);display:grid;gap:16px}
.ct-form h2{margin:0;font-size:1.35rem}
.ct-form p.sub{margin:-8px 0 0;opacity:.75;font-size:.93rem}
.ct-field{display:grid;gap:6px}
.ct-field label,.ct-lbl{font-size:.82rem;font-weight:700;letter-spacing:.02em;opacity:.85}
.ct-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (max-width:560px){.ct-row{grid-template-columns:1fr}.ct-form{padding:20px}}
.ct-in{width:100%;box-sizing:border-box;padding:13px 14px;border-radius:14px;border:1.5px solid rgba(124,92,230,.3);background:rgba(255,255,255,.04);color:inherit;font:inherit;font-size:.98rem;outline:none;transition:border-color .15s,box-shadow .15s}
.ct-in:focus{border-color:#8b5cf6;box-shadow:0 0 0 4px rgba(139,92,246,.2)}
textarea.ct-in{resize:vertical;min-height:130px;line-height:1.5}
.ct-chips{display:flex;flex-wrap:wrap;gap:8px}
.ct-chip{padding:9px 15px;border-radius:999px;border:1.5px solid rgba(124,92,230,.35);background:transparent;color:inherit;font:inherit;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .15s}
.ct-chip:hover{border-color:#8b5cf6}
.ct-chip.on{background:#7c3aed;border-color:#7c3aed;color:#fff}
.ct-count{font-size:.76rem;opacity:.6;text-align:right}
.ct-send{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px 20px;border:0;border-radius:16px;background:linear-gradient(135deg,#6d28d9,#9333ea);color:#fff;font:inherit;font-size:1.02rem;font-weight:800;letter-spacing:.01em;cursor:pointer;text-decoration:none;box-shadow:0 10px 24px rgba(109,40,217,.35);transition:transform .15s,opacity .15s}
.ct-send:hover{transform:translateY(-1px)}
.ct-send[aria-disabled="true"]{opacity:.45;cursor:not-allowed;box-shadow:none;transform:none}
.ct-note{font-size:.8rem;opacity:.65;text-align:center}
`;

export default function Contact() {
  const [f, setF] = useState({ name: '', reply: '', topic: TOPICS[0], msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const [state, setState] = useState('idle'); // idle | sending | sent | failed
  const ok = f.msg.trim().length >= 5;
  const submit = async (e) => {
    e.preventDefault();
    if (!ok || state === 'sending') return;
    setState('sending');
    try {
      const r = await fetch('/api/data?route=contact/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: f.name, reply: f.reply, topic: f.topic, message: f.msg, page: '/contact' }) });
      const d = await r.json().catch(() => ({}));
      if (!d.success) throw new Error('x');
      setState('sent'); setF({ name: '', reply: '', topic: TOPICS[0], msg: '' });
    } catch { setState('failed'); }
  };
  const href = mail(`[${f.topic}] ${f.name.trim() || 'Message from the website'}`, `${f.msg.trim()}\n\n— ${f.name.trim() || 'Name not given'}\nReply to: ${f.reply.trim() || 'this email'}`);

  return (
    <SiteShell
      wide
      eyebrow="Contact us"
      title="Talk to the EliteScholars team"
      intro="Students, parents, schools, tutorial centres and partners: tell us what you need and we will reply by email."
    >
      <style>{CSS}</style>
      <div className="ct">
        <aside className="ct-side">
          <a className="ct-link" href={`mailto:${EMAIL}`}>
            <span className="ct-ico">{I.mail}</span>
            <span><b>Email us</b><span className="s">{EMAIL}</span></span>
          </a>
          <a className="ct-link" href={WA_CHANNEL} target="_blank" rel="noreferrer">
            <span className="ct-ico">{I.wa}</span>
            <span><b>WhatsApp Channel</b><span className="s">Updates, tips and quick questions</span></span>
          </a>
          <a className="ct-link" href="/school">
            <span className="ct-ico">{I.school}</span>
            <span><b>Schools &amp; tutorial centres</b><span className="s">Start a free trial at /school or /centre</span></span>
          </a>
          <a className="ct-link" href="/partner">
            <span className="ct-ico">{I.partner}</span>
            <span><b>Become a partner</b><span className="s">Earn by sharing EliteScholars</span></span>
          </a>
          <p className="ct-note" style={{ textAlign: 'left' }}>EliteScholars is an independent platform and is not affiliated with JAMB, WAEC or NECO.</p>
        </aside>

        <form className="ct-form" onSubmit={submit}>
          <h2>Send us a message</h2>
          <p className="sub">Tell us a little and we will get back to you.</p>

          <div className="ct-field">
            <span className="ct-lbl">What is this about?</span>
            <div className="ct-chips" role="radiogroup" aria-label="Topic">
              {TOPICS.map((t) => <button key={t} type="button" role="radio" aria-checked={f.topic === t} className={`ct-chip${f.topic === t ? ' on' : ''}`} onClick={() => setF({ ...f, topic: t })}>{t}</button>)}
            </div>
          </div>

          <div className="ct-row">
            <div className="ct-field"><label htmlFor="ct-name">Your name</label><input id="ct-name" className="ct-in" placeholder="e.g. Chioma Okafor" value={f.name} onChange={set('name')} maxLength={80} autoComplete="name" /></div>
            <div className="ct-field"><label htmlFor="ct-reply">Phone, WhatsApp or email</label><input id="ct-reply" className="ct-in" placeholder="How should we reach you?" value={f.reply} onChange={set('reply')} maxLength={80} /></div>
          </div>

          <div className="ct-field">
            <label htmlFor="ct-msg">Your message</label>
            <textarea id="ct-msg" className="ct-in" placeholder="How can we help?" value={f.msg} onChange={set('msg')} maxLength={1500} />
            <span className="ct-count">{f.msg.length}/1500</span>
          </div>

          {state === 'sent' && <div className="ct-note" role="status" style={{ color: '#15803d', fontWeight: 700 }}>Message sent. Thank you, we will get back to you.</div>}
          {state === 'failed' && <div className="ct-note" role="alert" style={{ color: '#b91c1c' }}>We could not send that. <a href={href}>Send it by email instead</a>.</div>}
          <button type="submit" className="ct-send" aria-disabled={!ok || state === 'sending'} disabled={state === 'sending'}>
            {I.send}<span>{state === 'sending' ? 'Sending…' : 'Send message'}</span>
          </button>
          <span className="ct-note">{ok ? 'Your message goes straight to the EliteScholars team.' : 'Write your message (at least a few words) to send.'}</span>
        </form>
      </div>
    </SiteShell>
  );
}

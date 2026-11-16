import React, { useState } from 'react';
import SiteShell from '../components/SiteShell';
import { WA_CHANNEL } from '../utils/constants/links';

const EMAIL = 'elitescholars.site@gmail.com';
const TOPICS = [
  ['Student help', 'I am a student and need help'],
  ['Payments & Pro', 'Payment or Pro plan'],
  ['Schools', 'Bringing EliteScholars to my school'],
  ['Tutorial centres', 'Bringing EliteScholars to my tutorial centre'],
  ['Partners', 'Partner programme'],
  ['Something else', 'General question'],
];

const mail = (subject, body) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export default function Contact() {
  const [f, setF] = useState({ name: '', reply: '', topic: TOPICS[0][0], msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ok = f.msg.trim().length >= 5;
  const href = mail(`[${f.topic}] ${f.name.trim() || 'Message from the website'}`, `${f.msg.trim()}\n\n— ${f.name.trim() || 'Name not given'}\nReply to: ${f.reply.trim() || 'this email'}`);
  const field = { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(120,120,160,.35)', font: 'inherit', background: 'transparent', color: 'inherit', boxSizing: 'border-box' };

  return (
    <SiteShell
      wide
      eyebrow="Contact us"
      title="Talk to the EliteScholars team"
      intro="Students, parents, schools, tutorial centres and partners: tell us what you need and we will reply by email."
    >
      <section className="sp-card">
        <h2>Who are you?</h2>
        <p>Pick the one closest to you and we will open a ready-written email.</p>
        <div className="sp-tags">
          {TOPICS.map(([t, s]) => <a key={t} href={mail(`[${t}] ${s}`)} style={{ textDecoration: 'none' }}><span>{t}</span></a>)}
        </div>
      </section>

      <section className="sp-card">
        <h2>Send us a message</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          <input aria-label="Your name" placeholder="Your name" value={f.name} onChange={set('name')} maxLength={80} style={field} />
          <input aria-label="Phone or email to reply to" placeholder="Phone / WhatsApp / email to reply to" value={f.reply} onChange={set('reply')} maxLength={80} style={field} />
          <select aria-label="Topic" value={f.topic} onChange={set('topic')} style={field}>{TOPICS.map(([t]) => <option key={t}>{t}</option>)}</select>
          <textarea aria-label="Your message" placeholder="How can we help?" rows={6} value={f.msg} onChange={set('msg')} maxLength={1500} style={field} />
          <a href={ok ? href : undefined} aria-disabled={!ok} onClick={(e) => { if (!ok) e.preventDefault(); }} className="land-nav-cta" style={{ textAlign: 'center', textDecoration: 'none', opacity: ok ? 1 : 0.5, padding: '13px 18px' }}>Send by email</a>
          <small>This opens your email app with the message ready to send.</small>
        </div>
      </section>

      <section className="sp-card">
        <h2>Other ways to reach us</h2>
        <ul>
          <li>Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li>Updates and quick questions: <a href={WA_CHANNEL} target="_blank" rel="noreferrer">our WhatsApp Channel</a></li>
          <li>Schools and tutorial centres: see <a href="/school">/school</a> and <a href="/centre">/centre</a> to start a free trial</li>
          <li>Earn by sharing: <a href="/partner">become a partner</a></li>
        </ul>
        <p className="sp-note">EliteScholars is an independent platform and is not affiliated with JAMB, WAEC or NECO.</p>
      </section>
    </SiteShell>
  );
}

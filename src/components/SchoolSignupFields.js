import React, { useState } from 'react';

// Pieces shared by the school / centre sign-up form (Gate) and the "set up your school" screen.
// The server checks everything again (api/_helpers/schoolProfile.js); this is just friendly feedback.
export const STATES = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'];
export const SIZE_BANDS = [['under-50', 'Under 50 students'], ['50-200', '50 to 200'], ['200-500', '200 to 500'], ['500-1000', '500 to 1,000'], ['1000+', 'Over 1,000']];
export const CONTACT_ROLES = ['Proprietor / Owner', 'Principal / Head', 'Vice principal', 'Administrator', 'Teacher', 'Other'];

export const EMPTY_DETAILS = { orgName: '', contact_name: '', contact_role: '', phone: '', state: '', city: '', size_band: '', showcase: false, tagline: '' };

// Same rule as the server: Nigerian mobile (0803…, +234803…) or a full international number.
export const phoneOk = (v) => { const r = String(v || '').replace(/[\s\-().]/g, ''); return /^(?:\+?234|0)[789][01]\d{8}$/.test(r) || /^\+\d{10,15}$/.test(r); };

export function validateDetails(f, kind, { needContact = true } = {}) {
  const word = kind === 'centre' ? 'centre' : 'school';
  if (f.orgName.trim().length < 3) return `Enter your ${word}'s name.`;
  if (needContact && f.contact_name.trim().length < 2) return 'Enter the name of the person registering.';
  if (!phoneOk(f.phone)) return 'Enter a valid phone / WhatsApp number, e.g. 0803 123 4567.';
  if (!STATES.includes(f.state)) return `Choose the state your ${word} is in.`;
  if (f.city.trim().length < 2) return `Enter the town or area your ${word} is in.`;
  return '';
}

// What the school-create / school-profile-save routes expect.
export const detailsPayload = (f, kind) => ({
  name: f.orgName.trim(), kind, contact_name: f.contact_name.trim(), contact_role: f.contact_role, phone: f.phone.trim(),
  state: f.state, city: f.city.trim(), size_band: f.size_band, showcase: !!f.showcase, tagline: f.showcase ? f.tagline.trim() : '',
});

export function PasswordInput({ value, onChange, autoComplete, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="spt-pw">
      <input type={show ? 'text' : 'password'} placeholder={placeholder || 'Password (8+ characters)'} value={value} onChange={onChange} autoComplete={autoComplete} />
      <button type="button" className="spt-pw-btn" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? 'Hide' : 'Show'}</button>
    </div>
  );
}

export function KindToggle({ kind, setKind }) {
  return (
    <div className="spt-periods two" role="group" aria-label="What are you registering?">
      <button type="button" className={kind === 'school' ? 'on' : ''} onClick={() => setKind('school')}>🏫 School<small>Runs by terms</small></button>
      <button type="button" className={kind === 'centre' ? 'on' : ''} onClick={() => setKind('centre')}>📖 Tutorial centre<small>JAMB / WAEC lessons, monthly</small></button>
    </div>
  );
}

// The school / centre part of the form. `f` is the details object, `set(key)` returns an onChange handler.
export function OrgFields({ f, set, setF, kind, showContact = true, hideName = false }) {
  const word = kind === 'centre' ? 'centre' : 'school';
  return (
    <>
      {!hideName && (
        <label className="spt-lbl">{kind === 'centre' ? 'Centre name' : 'School name'}
          <input placeholder={kind === 'centre' ? 'e.g. Bright Future Tutorial Centre' : 'e.g. Greenfield College'} value={f.orgName} maxLength={80} onChange={set('orgName')} autoComplete="organization" />
        </label>
      )}
      {showContact && (
        <div className="spt-two">
          <label className="spt-lbl">Your role
            <select value={f.contact_role} onChange={set('contact_role')}><option value="">Choose…</option>{CONTACT_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select>
          </label>
          <label className="spt-lbl">Phone / WhatsApp
            <input inputMode="tel" placeholder="0803 123 4567" value={f.phone} maxLength={20} onChange={set('phone')} autoComplete="tel" />
          </label>
        </div>
      )}
      {!showContact && (
        <label className="spt-lbl">Phone / WhatsApp
          <input inputMode="tel" placeholder="0803 123 4567" value={f.phone} maxLength={20} onChange={set('phone')} autoComplete="tel" />
        </label>
      )}
      <div className="spt-two">
        <label className="spt-lbl">State
          <select value={f.state} onChange={set('state')}><option value="">Choose…</option>{STATES.map((s) => <option key={s} value={s}>{s}</option>)}</select>
        </label>
        <label className="spt-lbl">Town / area
          <input placeholder="e.g. Ikeja" value={f.city} maxLength={60} onChange={set('city')} autoComplete="address-level2" />
        </label>
      </div>
      <label className="spt-lbl">About how many students? <em>(optional)</em>
        <select value={f.size_band} onChange={set('size_band')}><option value="">Not sure yet</option>{SIZE_BANDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
      </label>
      <div className="spt-showcase-opt">
        <label className="spt-check"><input type="checkbox" checked={f.showcase} onChange={(e) => setF({ ...f, showcase: e.target.checked })} />
          <span><b>Show our {word} on the EliteScholars website</b> <em>(optional)</em><small>We list your name, town and logo on our school pages after we approve it. You can switch this off any time.</small></span>
        </label>
        {f.showcase && <input placeholder="One line about you (optional)" value={f.tagline} maxLength={110} onChange={set('tagline')} />}
      </div>
    </>
  );
}

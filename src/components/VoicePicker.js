import React, { useState } from 'react';
import Icon from './Icon';
import { previewVoice } from '../utils/voices';

// A light voice chooser: one small button, a sheet with six simple cards (3 female, 3 male).
export default function VoicePicker({ voices, value, onChange }) {
  const [open, setOpen] = useState(false);
  const cur = voices.find((v) => v.id === value) || voices[0];
  if (!cur) return null;
  return (
    <>
      <button type="button" className="vp-btn" onClick={() => setOpen(true)} aria-label="Choose a voice">
        <span className={`vp-av ${cur.gender}`}>{cur.name[0]}</span>{cur.name}<Icon name="chevronRight" size={13} />
      </button>
      {open && (
        <div className="vp-back" onClick={() => setOpen(false)}>
          <div className="vp-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Choose a voice">
            <div className="vp-head"><b>Choose a voice</b><button type="button" onClick={() => setOpen(false)} aria-label="Close"><Icon name="x" size={18} /></button></div>
            {['female', 'male'].map((g) => (
              <div key={g}>
                <div className="vp-group">{g === 'female' ? 'Female' : 'Male'}</div>
                <div className="vp-grid">
                  {voices.filter((v) => v.gender === g).map((v) => (
                    <div key={v.id} className={`vp-card ${v.id === value ? 'on' : ''}`}>
                      <button type="button" className="vp-pick" onClick={() => { onChange(v.id); previewVoice(v, voices); setOpen(false); }}>
                        <span className={`vp-av ${v.gender}`}>{v.name[0]}</span>
                        <span className="vp-name">{v.name}</span>
                        <small>{v.trait}</small>
                      </button>
                      <button type="button" className="vp-play" onClick={() => previewVoice(v, voices)} aria-label={`Hear ${v.name}`}><Icon name="play" size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

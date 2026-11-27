import React, { useState } from 'react';
import '../styles/admin-fold.css';

// A section that stays closed until you tap its header. `hint` is a one-line summary shown while it is closed.
export default function Fold({ title, hint, count, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={`adm-fold ${open ? 'open' : ''}`}>
      <button type="button" className="adm-fold-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="adm-fold-title"><b>{title}</b>{count !== undefined && count !== null && <em className="adm-fold-count">{count}</em>}</span>
        {hint ? <small>{hint}</small> : <small />}
        <svg className="adm-fold-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && <div className="adm-fold-body">{children}</div>}
    </section>
  );
}

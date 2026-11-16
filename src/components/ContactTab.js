import React from 'react';
import { useLocation } from 'react-router-dom';

// A small "Contact" pill on the landing page and the partner page (school, centre and the other
// site pages already have Contact in their shared nav and footer).
export default function ContactTab() {
  const { pathname } = useLocation();
  if (pathname !== '/' && pathname !== '/partner') return null;
  return (
    <a href="/contact" aria-label="Contact us" style={{ position: 'fixed', right: 14, bottom: 16, zIndex: 40, display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', borderRadius: 999, background: '#5B21B6', color: '#fff', fontWeight: 800, fontSize: 14, textDecoration: 'none', boxShadow: '0 6px 18px rgba(91,33,182,.35)' }}>
      <span aria-hidden="true">💬</span> Contact
    </a>
  );
}

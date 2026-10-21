// ============================================================================
// constants/links.js — External URLs, group chat links and exam type metadata
// ============================================================================

export const WA_GROUP   = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
export const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
export const APP_URL    = 'https://elitescholars.site';

// ── Group chat links per exam type ───────────────────────────────────────────
export const GC_LINKS = {
  jamb:    { label: 'JAMB',      emoji: '📚', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  waec:    { label: 'WAEC',      emoji: '📝', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  neco:    { label: 'NECO',      emoji: '📋', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  gst:     { label: 'GST',       emoji: '🏛️', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
};

export function getStudentGCLinks(studentType, selectedExams = []) {
  const links = [];
  const add = (key) => {
    if (!links.find(l => l.key === key)) links.push({ key, ...GC_LINKS[key] });
  };

  if (studentType === 'senior_school') {
    add('jamb'); add('waec'); add('neco');
  } else if (studentType === 'university') {
    add('gst');
    if (selectedExams.includes('jamb'))     add('jamb');
    if (selectedExams.includes('waec'))     add('waec');
    if (selectedExams.includes('neco'))     add('neco');
  } else {
    add('jamb');
  }
  return links;
}

// ── Exam types ────────────────────────────────────────────────────────────────
export const EXAM_TYPES = [
  { id: 'jamb',     label: 'JAMB',      icon: '📝', color: '#8B5CF6', desc: 'UTME' },
  { id: 'waec',     label: 'WAEC',      icon: '🏫', color: '#065F46', desc: 'Senior School' },
  { id: 'neco',     label: 'NECO',      icon: '📋', color: '#9A3412', desc: 'Senior School' },
  { id: 'gst',      label: 'GST',       icon: '🎓', color: '#7C3AED', desc: 'University' },
];
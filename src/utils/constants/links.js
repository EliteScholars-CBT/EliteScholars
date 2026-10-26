// ============================================================================
// constants/links.js — External URLs, group chat links and exam type metadata
// ============================================================================

export const WA_GROUP   = 'https://chat.whatsapp.com/EMxGWjBhDOuJI5I99UoGdV';
export const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
export const APP_URL    = 'https://elitescholars.site';

// ── Group chat links ─────────────────────────────────────────────────────────
// The live list comes from the admin panel (/api/site/groups). These are the fallback if it cannot load.
export const DEFAULT_GROUPS = [
  { id: 'g-jamb', name: 'JAMB, aspirants and SS1–SS3', url: 'https://chat.whatsapp.com/EMxGWjBhDOuJI5I99UoGdV', audiences: ['jamb', 'aspirant', 'senior_school'] },
  { id: 'g-waec', name: 'WAEC, NECO and SS1–SS3', url: 'https://chat.whatsapp.com/E13l17eqAN11Eg2EfO3ucn', audiences: ['waec', 'neco', 'senior_school'] },
  { id: 'g-uni', name: 'University and GST', url: 'https://chat.whatsapp.com/GFm40LBFpF031tpY3e3z4B', audiences: ['gst', 'university'] },
];

let groupsCache = null;
export async function fetchGroups() {
  if (groupsCache) return groupsCache;
  try {
    const r = await fetch('/api/site/groups');
    const d = await r.json();
    if (d && Array.isArray(d.groups) && d.groups.length) { groupsCache = d.groups; return groupsCache; }
  } catch { /* use fallback */ }
  return DEFAULT_GROUPS;
}

// Which groups suit this student: matches their level (senior school / university) or any exam they study for.
export function groupsFor(groups, studentType, selectedExams = []) {
  const tags = new Set(selectedExams);
  if (studentType) tags.add(studentType);
  if (studentType === 'senior_school') ['jamb', 'waec', 'neco', 'aspirant'].forEach((t) => tags.add(t));
  if (studentType === 'university') tags.add('gst');
  const hit = groups.filter((g) => (g.audiences || []).some((a) => tags.has(a)));
  return hit.length ? hit : groups.slice(0, 1);
}

// ── Exam types ────────────────────────────────────────────────────────────────
export const EXAM_TYPES = [
  { id: 'jamb',     label: 'JAMB',      icon: '📝', color: '#8B5CF6', desc: 'UTME' },
  { id: 'waec',     label: 'WAEC',      icon: '🏫', color: '#065F46', desc: 'Senior School' },
  { id: 'neco',     label: 'NECO',      icon: '📋', color: '#9A3412', desc: 'Senior School' },
  { id: 'gst',      label: 'GST',       icon: '🎓', color: '#7C3AED', desc: 'University' },
];
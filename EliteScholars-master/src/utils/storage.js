// ============================================================================
// LOCAL STORAGE
// ============================================================================

export function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('ep_user') || '{}');
  } catch {
    return {};
  }
}

export function loadStats(email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

export function saveUser(u) {
  try {
    localStorage.setItem('ep_user', JSON.stringify(u));
  } catch {}
}

export function saveStats(s, email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    localStorage.setItem(key, JSON.stringify(s));
  } catch {}
}


// ============================================================================
// ACHIEVEMENTS STORAGE
// ============================================================================

export function loadAchievements(email) {
  try {
    const key = email ? `ep_achievements_${email}` : 'ep_achievements';
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function saveAchievements(achievements, email) {
  try {
    const key = email ? `ep_achievements_${email}` : 'ep_achievements';
    localStorage.setItem(key, JSON.stringify(achievements));
  } catch {}
}

// ============================================================================
// SUBJECT PERFORMANCE STORAGE
// ============================================================================

export function loadSubjectPerformance(email) {
  try {
    const key = email ? `ep_subject_performance_${email}` : 'ep_subject_performance';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

export function saveSubjectPerformance(performance, email) {
  try {
    const key = email ? `ep_subject_performance_${email}` : 'ep_subject_performance';
    localStorage.setItem(key, JSON.stringify(performance));
  } catch {}
}

// ============================================================================
// MERGE HELPERS — combine local + server data intelligently
// ============================================================================

/**
 * Merge stats: take the higher value for each numeric field.
 * lastDate / allScores use local if more recent.
 */
export function mergeStats(local = {}, server = {}) {
  const localDate  = local.lastDate  ? new Date(local.lastDate)  : new Date(0);
  const serverDate = server.lastDate ? new Date(server.lastDate) : new Date(0);
  const newerIsLocal = localDate >= serverDate;

  return {
    sessions:  Math.max(local.sessions  || 0, server.sessions  || 0),
    bestScore: Math.max(local.bestScore || 0, server.bestScore || 0),
    streak:    newerIsLocal ? (local.streak   || 1) : (server.streak   || 1),
    lastDate:  newerIsLocal ? (local.lastDate || '') : (server.lastDate || ''),
    allScores: newerIsLocal
      ? (local.allScores  || [])
      : (server.allScores || []),
  };
}

/**
 * Merge achievements: union by id, no duplicates.
 */
export function mergeAchievements(local = [], server = []) {
  const map = new Map();
  [...server, ...local].forEach((a) => { if (a?.id) map.set(a.id, a); });
  return Array.from(map.values());
}

/**
 * Merge subject performance: take best values per subject.
 */
export function mergeSubjectPerformance(local = {}, server = {}) {
  const allKeys = new Set([...Object.keys(local), ...Object.keys(server)]);
  const merged = {};
  allKeys.forEach((key) => {
    const l = local[key]  || { bestScore: 0, averageScore: 0, total: 0, scores: [] };
    const s = server[key] || { bestScore: 0, averageScore: 0, total: 0, scores: [] };
    // Use whichever side has more total attempts (more complete record)
    const useLocal = (l.total || 0) >= (s.total || 0);
    merged[key] = {
      bestScore:    Math.max(l.bestScore || 0, s.bestScore || 0),
      averageScore: useLocal ? (l.averageScore || 0) : (s.averageScore || 0),
      total:        Math.max(l.total || 0, s.total || 0),
      scores:       useLocal ? (l.scores || []) : (s.scores || []),
    };
  });
  return merged;
}

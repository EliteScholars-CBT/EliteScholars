// Shape a profiles row for the browser. passwordHash carries a signed session
// token (never the real password hash) so older client code keeps working.
import { makeSessionToken } from "./session.js";

export function profileOut(r) {
  return {
    email: r.email,
    firstName: r.first_name,
    lastName: r.last_name,
    passwordHash: makeSessionToken(r.email, r.password_hash),
    studentType: r.student_type,
    selectedExams: r.selected_exams || [],
    stats: r.stats || {},
    achievements: r.achievements || [],
    subjectPerformance: r.subject_performance || {},
    premiumPlan: r.subscription_plan || "",
    premiumExpiresAt: r.expires_at ? new Date(r.expires_at).getTime() : null,
    // per-exam Pro: proAllUntil = every exam (old Pro / group), proExams = { jamb, waec_neco, gst } -> end dates (ms)
    proAllUntil: r.pro_all_until !== undefined ? (r.pro_all_until ? new Date(r.pro_all_until).getTime() : null) : undefined,
    proExams: Object.fromEntries(Object.entries(r.pro_exams || {}).map(([k, v]) => [k, new Date(v).getTime()]).filter(([, v]) => v > Date.now())),
    username: r.username || "",
  };
}

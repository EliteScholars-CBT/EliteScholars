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
    username: r.username || "",
  };
}

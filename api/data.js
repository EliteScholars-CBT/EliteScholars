// ============================================================================
// api/data.js — single serverless entry for the database-backed routes.
// vercel.json rewrites /api/xp/add, /api/squads/*, /api/challenges/* etc. here
// (?route=...). One function instead of many keeps us under Vercel's per-plan
// function limit.
// ============================================================================
import xpAdd from "./_routes/xp-add.js";
import eventsTrack from "./_routes/events-track.js";
import sitePublic from "./_routes/site-public.js";
import gamePublic from "./_routes/game-public.js";
import squadsCreate from "./_routes/squads-create.js";
import squadsJoin from "./_routes/squads-join.js";
import squadsGet from "./_routes/squads-get.js";
import squadsLeave from "./_routes/squads-leave.js";
import groupPlan from "./_routes/group.js";
import chCreate from "./_routes/challenges-create.js";
import chAccept from "./_routes/challenges-accept.js";
import chDecline from "./_routes/challenges-decline.js";
import chSubmit from "./_routes/challenges-submit-score.js";
import chList from "./_routes/challenges-list.js";
import chLookup from "./_routes/challenges-lookup.js";
import leaderboard from "./_routes/leaderboard.js";
import profile from "./_routes/profile.js";
import entitlement from "./_routes/entitlement.js";
import adminAccess from "./_routes/admin-access.js";
import eventsBatch from "./_routes/events-batch.js";
import admin from "./_routes/admin.js";
import partner from "./_routes/partner.js";
import adminPartners from "./_routes/admin-partners.js";
import authVerify from "./_routes/auth-verify.js";
import studyRewrite from "./_routes/study-rewrite.js";
import status from "./_routes/status.js";
import adminMail from "./_routes/admin-mail.js";
import push from "./_routes/push.js";
import school from "./_routes/school.js";
import schoolPortal from "./_routes/school-portal.js";
import report from "./_routes/report.js";
import adminOps from "./_routes/admin-ops.js";
import squadChat from "./_routes/squad-chat.js";

// Several routes share one handler and are told which operation via ?op=
function withOp(fn, op) {
  return (req, res) => { req.query = { ...req.query, op }; return fn(req, res); };
}

const ROUTES = {
  "xp/add": xpAdd,
  "events/track": eventsTrack,
  "site/school-info": withOp(sitePublic, "school-info"),
  "site/school-demo": withOp(sitePublic, "school-demo"),
  "site/showcase": withOp(sitePublic, "showcase"),
  "site/showcase-logo": withOp(sitePublic, "showcase-logo"),
  "site/config": withOp(sitePublic, "config"),
  "site/page": withOp(sitePublic, "page"),
  "site/shop": withOp(sitePublic, "shop"),
  "site/media": withOp(sitePublic, "media"),
  "site/blog-covers": withOp(sitePublic, "blog-covers"),
  "site/groups": withOp(sitePublic, "groups"),
  "game/score": withOp(gamePublic, "score"),
  "game/board": withOp(gamePublic, "board"),
  "squads/create": squadsCreate,
  "squads/join": squadsJoin,
  "squads/get": squadsGet,
  "squads/leave": squadsLeave,
  "group/get": withOp(groupPlan, "get"),
  "group/add": withOp(groupPlan, "add"),
  "group/remove": withOp(groupPlan, "remove"),
  "challenges/create": chCreate,
  "challenges/accept": chAccept,
  "challenges/decline": chDecline,
  "challenges/submit-score": chSubmit,
  "challenges/list": chList,
  "challenges/lookup": chLookup,
  "auth/verify": authVerify,
  "events/batch": eventsBatch,
  "study/rewrite": studyRewrite,
  "admin/mail-audience": withOp(adminMail, "mail-audience"),
  "admin/mail-history": withOp(adminMail, "mail-history"),
  "admin/mail-send": withOp(adminMail, "mail-send"),
  "mail/unsubscribe": withOp(adminMail, "unsubscribe"),
  "push/key": withOp(push, "key"),
  "push/subscribe": withOp(push, "subscribe"),
  "push/unsubscribe": withOp(push, "unsubscribe"),
  "portal": schoolPortal, // /api/portal/<op> (op comes from the rewrite)
  "school/classes": withOp(school, "classes"),
  "school/class-create": withOp(school, "class-create"),
  "school/mock-list": withOp(school, "mock-list"),
  "school/mock-submit": withOp(school, "mock-submit"),
  "school/mock-questions": withOp(school, "mock-questions"),
  "school/class-join": withOp(school, "class-join"),
  "school/class-leave": withOp(school, "class-leave"),
  "school/class-delete": withOp(school, "class-delete"),
  "school/class-members": withOp(school, "class-members"),
  "school/class-remove": withOp(school, "class-remove"),
  "school/assign-create": withOp(school, "assign-create"),
  "school/assign-list": withOp(school, "assign-list"),
  "school/assign-get": withOp(school, "assign-get"),
  "school/assign-done": withOp(school, "assign-done"),
  "school/assign-delete": withOp(school, "assign-delete"),
  "report/submit": withOp(report, "submit"),
  "admin/reports": withOp(report, "list"),
  "admin/report-action": withOp(report, "action"),
  "squads/chat": withOp(squadChat, "list"),
  "squads/chat-send": withOp(squadChat, "send"),
  "squads/chat-delete": withOp(squadChat, "delete"),
  "squads/chat-typing": withOp(squadChat, "typing"),
  "squads/chat-react": withOp(squadChat, "react"),
  "squads/chat-pin": withOp(squadChat, "pin"),
  "squads/chat-edit": withOp(squadChat, "edit"),
  "media/get": withOp(squadChat, "media"),
  "status/post": withOp(status, "post"),
  "status/feed": withOp(status, "feed"),
  "status/delete": withOp(status, "delete"),
  "status/react": withOp(status, "react"),
  "status/reply": withOp(status, "reply"),
  "status/thread": withOp(status, "thread"),
  "status/reshare": withOp(status, "reshare"),
  "status/insights": withOp(status, "insights"),
  "status/blocked": withOp(status, "blocked"),
  "status/view": withOp(status, "view"),
  "status/report": withOp(status, "report"),
  "partner/signup": withOp(partner, "signup"),
  "partner/login": withOp(partner, "login"),
  "partner/me": withOp(partner, "me"),
  "partner/bank": withOp(partner, "bank"),
  "partner/payout": withOp(partner, "payout"),
  "partner/password": withOp(partner, "password"),
  "admin/partners": withOp(adminPartners, "partners"),
  "admin/partner": withOp(adminPartners, "partner"),
  "admin/partner-action": withOp(adminPartners, "partner-action"),
  "admin/commission-action": withOp(adminPartners, "commission-action"),
  "admin/payouts": withOp(adminPartners, "payouts"),
  "admin/payout-action": withOp(adminPartners, "payout-action"),
  "admin/settings": withOp(adminPartners, "settings"),
  "admin/me": withOp(adminOps, "me"),
  "admin/alerts": withOp(adminOps, "alerts"),
  "admin/students": withOp(adminOps, "students"),
  "admin/student": withOp(adminOps, "student"),
  "admin/activity": withOp(adminOps, "activity"),
  "admin/blog": withOp(adminOps, "blog"),
  "admin/blog-covers": withOp(adminOps, "blog-covers"),
  "admin/blog-cover-save": withOp(adminOps, "blog-cover-save"),
  "admin/blog-cover-clear": withOp(adminOps, "blog-cover-clear"),
  "admin/sources": withOp(adminOps, "sources"),
  "admin/ads": withOp(adminOps, "ads"),
  "admin/ads-save": withOp(adminOps, "ads-save"),
  "admin/ads-stats": withOp(adminOps, "ads-stats"),
  "admin/ads-adsterra": withOp(adminOps, "ads-adsterra"),
  "admin/shop-list": withOp(adminOps, "shop-list"),
  "admin/shop-save": withOp(adminOps, "shop-save"),
  "admin/shop-delete": withOp(adminOps, "shop-delete"),
  "admin/shop-flags": withOp(adminOps, "shop-flags"),
  "admin/status-list": withOp(adminOps, "status-list"),
  "admin/status-media": withOp(adminOps, "status-media"),
  "admin/security": withOp(adminOps, "security"),
  "admin/reminders": withOp(adminOps, "reminders"),
  "admin/games": withOp(adminOps, "games"),
  "admin/groups": withOp(adminOps, "groups"),
  "admin/group-save": withOp(adminOps, "group-save"),
  "admin/group-delete": withOp(adminOps, "group-delete"),
  "admin/status-action": withOp(adminOps, "status-action"),
  "admin/status-suspend": withOp(adminOps, "status-suspend"),
  "admin/team": withOp(adminOps, "team"),
  "admin/team-save": withOp(adminOps, "team-save"),
  "admin/team-reset": withOp(adminOps, "team-reset"),
  "admin/team-delete": withOp(adminOps, "team-delete"),
  "admin/audit": withOp(adminOps, "audit"),
  "admin/prices": withOp(adminOps, "prices"),
  "admin/prices-save": withOp(adminOps, "prices-save"),
  "admin/school-plans": withOp(adminOps, "school-plans"),
  "admin/school-settings": withOp(adminOps, "school-settings"),
  "admin/school-account": withOp(adminOps, "school-account"),
  "admin/showcase-list": withOp(adminOps, "showcase-list"),
  "admin/showcase-set": withOp(adminOps, "showcase-set"),
  "admin/ai-status": withOp(adminOps, "ai-status"),
  "admin/ai-test": withOp(adminOps, "ai-test"),
  "admin/login": withOp(admin, "login"),
  "admin/stats": withOp(admin, "stats"),
  "leaderboard/get": withOp(leaderboard, "get"),
  "leaderboard/rank": withOp(leaderboard, "rank"),
  "leaderboard/users": withOp(leaderboard, "users"),
  "profile/sync": withOp(profile, "sync"),
  "profile/check-username": withOp(profile, "check-username"),
  "profile/guardian": withOp(profile, "guardian"),
  "entitlement/get": withOp(entitlement, "get"),
  "entitlement/use": withOp(entitlement, "use"),
  "admin/access": withOp(adminAccess, "access"),
  "admin/access-action": withOp(adminAccess, "access-action"),
};

export default async function handler(req, res) {
  const route = String(req.query?.route || "");
  const fn = ROUTES[route];
  if (!fn) return res.status(404).json({ success: false, error: "Unknown route." });
  try {
    return await fn(req, res);
  } catch (err) {
    console.error(`[data:${route}]`, err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}

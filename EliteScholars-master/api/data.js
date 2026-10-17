// ============================================================================
// api/data.js — single serverless entry for the database-backed routes.
// vercel.json rewrites /api/xp/add, /api/squads/*, /api/challenges/* etc. here
// (?route=...). One function instead of many keeps us under Vercel's per-plan
// function limit.
// ============================================================================
import xpAdd from "./_routes/xp-add.js";
import eventsTrack from "./_routes/events-track.js";
import squadsCreate from "./_routes/squads-create.js";
import squadsJoin from "./_routes/squads-join.js";
import squadsGet from "./_routes/squads-get.js";
import squadsLeave from "./_routes/squads-leave.js";
import chCreate from "./_routes/challenges-create.js";
import chAccept from "./_routes/challenges-accept.js";
import chDecline from "./_routes/challenges-decline.js";
import chSubmit from "./_routes/challenges-submit-score.js";
import chList from "./_routes/challenges-list.js";
import chLookup from "./_routes/challenges-lookup.js";
import leaderboard from "./_routes/leaderboard.js";
import profile from "./_routes/profile.js";
import eventsBatch from "./_routes/events-batch.js";
import admin from "./_routes/admin.js";
import partner from "./_routes/partner.js";
import adminPartners from "./_routes/admin-partners.js";
import authVerify from "./_routes/auth-verify.js";

// Several routes share one handler and are told which operation via ?op=
function withOp(fn, op) {
  return (req, res) => { req.query = { ...req.query, op }; return fn(req, res); };
}

const ROUTES = {
  "xp/add": xpAdd,
  "events/track": eventsTrack,
  "squads/create": squadsCreate,
  "squads/join": squadsJoin,
  "squads/get": squadsGet,
  "squads/leave": squadsLeave,
  "challenges/create": chCreate,
  "challenges/accept": chAccept,
  "challenges/decline": chDecline,
  "challenges/submit-score": chSubmit,
  "challenges/list": chList,
  "challenges/lookup": chLookup,
  "auth/verify": authVerify,
  "events/batch": eventsBatch,
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
  "admin/login": withOp(admin, "login"),
  "admin/stats": withOp(admin, "stats"),
  "leaderboard/get": withOp(leaderboard, "get"),
  "leaderboard/rank": withOp(leaderboard, "rank"),
  "leaderboard/users": withOp(leaderboard, "users"),
  "profile/sync": withOp(profile, "sync"),
  "profile/check-username": withOp(profile, "check-username"),
  "profile/guardian": withOp(profile, "guardian"),
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

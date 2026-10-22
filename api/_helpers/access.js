// api/_helpers/access.js — who gets unlimited use, and what free students may do.
//
// Tiers, best first:
//   premium     paid yearly plan (the only thing that creates commission)
//   free_access admin gift: to everyone, or to one student; until a date or forever
//   trial       automatic at sign-up when the trial switch is on
//   free        daily / lifetime limits below
import { getSupabase } from "./supabase.js";

export const DEFAULT_CONFIG = {
  trialEnabled: false,
  trialDays: 14,
  limits: { topics: 3, cbt: 3, games: 3, fileStudy: 2 },
  // Free session: after `sessionMinutes` of use the student must rest `cooldownMinutes`. 0 = off.
  sessionMinutes: 0,
  cooldownMinutes: 0,
  global: { active: false, forever: false, until: null, note: "" },
};

// API kind -> config key + whether it resets daily
export const KINDS = {
  topic: { key: "topics", daily: true },
  cbt: { key: "cbt", daily: true },
  game: { key: "games", daily: true },
  file_study: { key: "fileStudy", daily: true },
};

const H = 3600000;
export const lagosDay = (ms = Date.now()) => new Date(ms + H).toISOString().slice(0, 10);

export async function getAccessConfig() {
  const sb = getSupabase();
  const { data } = await sb.from("settings").select("value").eq("key", "access_config").maybeSingle();
  const v = data?.value || {};
  return {
    trialEnabled: !!v.trialEnabled,
    trialDays: clampInt(v.trialDays, 1, 90, DEFAULT_CONFIG.trialDays),
    sessionMinutes: clampInt(v.sessionMinutes, 0, 600, DEFAULT_CONFIG.sessionMinutes),
    cooldownMinutes: clampInt(v.cooldownMinutes, 0, 4320, DEFAULT_CONFIG.cooldownMinutes),
    limits: {
      topics: clampInt(v.limits?.topics, 0, 100, DEFAULT_CONFIG.limits.topics),
      cbt: clampInt(v.limits?.cbt, 0, 100, DEFAULT_CONFIG.limits.cbt),
      games: clampInt(v.limits?.games, 0, 100, DEFAULT_CONFIG.limits.games),
      fileStudy: clampInt(v.limits?.fileStudy, 0, 100, DEFAULT_CONFIG.limits.fileStudy),
    },
    global: {
      active: !!v.global?.active,
      forever: !!v.global?.forever,
      until: v.global?.until || null,
      note: String(v.global?.note || "").slice(0, 200),
    },
  };
}

export async function saveAccessConfig(cfg) {
  const sb = getSupabase();
  await sb.from("settings").upsert({ key: "access_config", value: cfg, updated_at: new Date().toISOString() }, { onConflict: "key" });
}

function clampInt(v, lo, hi, dflt) {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
}

const active = (until) => !!until && new Date(until).getTime() > Date.now();

// -> { tier, unlimited, source, until, forever }
export function entitlementFor(row, cfg) {
  if (row?.is_premium && active(row.expires_at)) {
    return { tier: "premium", unlimited: true, source: "paid", until: row.expires_at, forever: false };
  }
  const g = cfg.global;
  if (g.active && (g.forever || active(g.until))) {
    return { tier: "free_access", unlimited: true, source: "everyone", until: g.forever ? null : g.until, forever: !!g.forever };
  }
  if (row?.free_access_forever || active(row?.free_access_until)) {
    return { tier: "free_access", unlimited: true, source: "personal", until: row.free_access_forever ? null : row.free_access_until, forever: !!row.free_access_forever };
  }
  if (active(row?.trial_ends_at)) {
    return { tier: "trial", unlimited: true, source: "trial", until: row.trial_ends_at, forever: false };
  }
  return { tier: "free", unlimited: false, source: "free", until: null, forever: false };
}

// Called once at sign-up: starts the trial if the admin switched it on.
export async function startTrialIfEnabled(email) {
  try {
    const cfg = await getAccessConfig();
    if (!cfg.trialEnabled) return false;
    const ends = new Date(Date.now() + cfg.trialDays * 86400000).toISOString();
    await getSupabase().from("profiles").update({ trial_ends_at: ends }).eq("email", email);
    return true;
  } catch { return false; }
}

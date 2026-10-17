// api/_helpers/supabase.js
// Server-side Supabase access (service-role key, never sent to the browser).
// Every function is a safe no-op when the env vars are not set, so the app
// is unavailable until Supabase is configured.

import { createClient } from "@supabase/supabase-js";

let client = null;

export function supabaseEnabled() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabase() {
  if (!supabaseEnabled()) return null;
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

// All helpers return { ok, ... } and never throw.
export async function upsertRow(table, row, conflictColumn = "email") {
  const sb = getSupabase();
  if (!sb) return { ok: false, skipped: true };
  try {
    const { data, error } = await sb.from(table).upsert(row, { onConflict: conflictColumn }).select().maybeSingle();
    if (error) return { ok: false, error };
    return { ok: true, row: data };
  } catch (e) {
    return { ok: false, error: e };
  }
}

export async function insertRow(table, row) {
  const sb = getSupabase();
  if (!sb) return { ok: false, skipped: true };
  try {
    const { data, error } = await sb.from(table).insert(row).select().maybeSingle();
    if (error) return { ok: false, error };
    return { ok: true, row: data };
  } catch (e) {
    return { ok: false, error: e };
  }
}

export async function updateRow(table, match, patch) {
  const sb = getSupabase();
  if (!sb) return { ok: false, skipped: true };
  try {
    const { data, error } = await sb.from(table).update(patch).match(match).select();
    if (error) return { ok: false, error };
    return { ok: true, rows: data || [], count: (data || []).length };
  } catch (e) {
    return { ok: false, error: e };
  }
}

export async function selectOne(table, match) {
  const sb = getSupabase();
  if (!sb) return { ok: false, skipped: true };
  try {
    const { data, error } = await sb.from(table).select("*").match(match).limit(1).maybeSingle();
    if (error) return { ok: false, error };
    return { ok: true, row: data || null };
  } catch (e) {
    return { ok: false, error: e };
  }
}

export async function selectMany(table, match = {}, { orderBy, ascending = false, limit = 100 } = {}) {
  const sb = getSupabase();
  if (!sb) return { ok: false, skipped: true };
  try {
    let q = sb.from(table).select("*").match(match);
    if (orderBy) q = q.order(orderBy, { ascending });
    const { data, error } = await q.limit(limit);
    if (error) return { ok: false, error };
    return { ok: true, rows: data || [] };
  } catch (e) {
    return { ok: false, error: e };
  }
}

// Event log, best effort, awaited briefly so serverless doesn't drop it.
export async function logRowAsync(table, row) {
  return insertRow(table, row);
}

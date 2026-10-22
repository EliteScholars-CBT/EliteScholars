// ============================================================================
// profileApi.js — DEBUGGER-INTEGRATED SAFE VERSION
// ============================================================================

import { addLog } from './debugStore';
import { trackSignupSource } from './trafficSource';

// Auth traffic is never written to the console.
const devLog = () => {};

// ─────────────────────────────────────────────────────────────────────────────
// CORE SAFE FETCH — logs everything, never throws
// ─────────────────────────────────────────────────────────────────────────────

async function safeFetchJSON(endpoint, options = {}) {
  const start = performance.now();
  const method = options.method || 'GET';

  console.group(`🌐 [profileApi] ${method} ${endpoint}`);
  devLog('📤 Request options:', {
    method,
    headers: options.headers,
    body: options.body ? JSON.parse(options.body) : undefined,
  });

  addLog({
    type: 'info',
    category: 'network',
    message: 'REQUEST',
    data: { url: endpoint, method, body: options.body ? '[hidden]' : null },
  });

  try {
    const res = await fetch(endpoint, options);
    const text = await res.text();
    const duration = Math.round(performance.now() - start);

    devLog(`📥 Response [${res.status}] in ${duration}ms`);
    devLog('📥 Raw response text:', text.slice(0, 500));

    let data;
    try {
      data = JSON.parse(text);
      devLog('✅ Parsed JSON:', data);
      console.groupEnd();

      addLog({
        type: res.ok ? 'success' : 'error',
        category: 'network',
        message: 'RESPONSE',
        data: { url: endpoint, status: res.status, duration: `${duration}ms`, response: data },
      });

      return data;
    } catch (parseErr) {
      console.warn('⚠️ Response is not valid JSON. Raw text:', text);
      console.warn('Parse error:', parseErr.message);
      console.groupEnd();

      addLog({
        type: 'error',
        category: 'network',
        message: 'INVALID JSON RESPONSE',
        data: { url: endpoint, status: res.status, raw: text },
      });

      // Return a structured error instead of throwing — callers decide what to do
      return {
        success: false,
        error: 'INVALID_JSON_RESPONSE',
        message: res.status >= 500
          ? 'Our server is busy right now. Please try again in a moment.'
          : 'Could not reach the server. Check your connection and try again.',
        raw: text.slice(0, 300),
        status: res.status,
      };
    }
  } catch (err) {
    console.error('❌ Network/fetch error:', err.message);
    console.groupEnd();

    addLog({
      type: 'error',
      category: 'network',
      message: 'NETWORK ERROR',
      data: { url: endpoint, error: err.message },
    });

    return { success: false, error: err.message || 'NETWORK_ERROR' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// API WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────

async function apiPost(endpoint, body) {
  devLog(`📮 [profileApi] POST ${endpoint}`, body);
  return safeFetchJSON(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function apiGet(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `${endpoint}${qs ? '?' + qs : ''}`;
  devLog(`📡 [profileApi] GET ${url}`);
  return safeFetchJSON(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

export async function registerProfile(payload) {
  console.group('🔐 [registerProfile] Starting registration');
  devLog('📦 Payload sent to /api/auth/register:', {
    ...payload,
    password: payload.password ? '[REDACTED]' : undefined,
  });

  const result = await apiPost('/api/auth/register', payload);

  devLog('📨 Raw result from /api/auth/register:', result);

  if (!result || result.error === 'INVALID_JSON_RESPONSE') {
    // Never pretend sign-up worked: an account with no saved login would get
    // the student signed out on the next visit. If the reply was lost the account
    // may exist already, so point them to Log in.
    console.groupEnd();
    return {
      success: false,
      message: 'We could not confirm your sign-up. If you already tapped Sign up once, try logging in with the same email and password. Otherwise please try again.',
    };
  }

  devLog('📋 Register result:', result);
  console.groupEnd();
  if (result && result.success) trackSignupSource();
  return result;
}

export async function loginProfile(payload) {
  console.group('🔑 [loginProfile] Starting login');
  devLog('📦 Payload sent to /api/auth/login:', {
    email: payload.email,
    password: payload.password ? '[REDACTED]' : undefined,
  });

  const result = await apiPost('/api/auth/login', payload);

  devLog('📨 Raw result from /api/auth/login:', result);
  console.groupEnd();
  return result;
}

export async function verifyProfile(payload) {
  devLog('🔄 [verifyProfile]', payload.email);
  return apiPost('/api/auth/verify', payload);
}

export async function requestPasswordReset(email) {
  devLog('📧 [requestPasswordReset]', email);
  return apiPost('/api/auth/forgot', { email });
}

export async function confirmPasswordReset(payload) {
  devLog('🔑 [confirmPasswordReset]', payload.email);
  return apiPost('/api/auth/reset', payload);
}

// Check whether a username is available (our API: Supabase first, Sheets fallback)
export async function checkUsernameAvailable(username) {
  devLog('🔍 [checkUsernameAvailable]', username);
  return apiGet('/api/profile/check-username', { username });
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT
// ─────────────────────────────────────────────────────────────────────────────

export async function initiatePayment(payload) {
  return apiPost('/api/payment/initiate', payload);
}

export async function fetchPremiumStatus(email) {
  return apiGet('/api/payment/status', { email });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchSubjects(exam) {
  return apiGet('/api/subjects', { exam });
}

export async function fetchQuestions(params) {
  return apiGet('/api/questions', {
    ...params,
    seed: params.seed || String(Date.now()),
  });
}

export async function fetchLearnTopics(subject) {
  return apiGet('/api/learn', { subject });
}

export async function fetchFlashcards(subject) {
  return apiGet('/api/flashcards', { subject });
}

export async function fetchShopData() {
  return apiGet('/api/shop');
}

export async function fetchAds(exam) {
  return apiGet('/api/ads', { exam: exam || 'all' });
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SYNC — push local data to Sheets
// ─────────────────────────────────────────────────────────────────────────────

export async function syncProfileToSheet(data) {
  devLog('🔄 [syncProfileToSheet]', data.email);
  try {
    const r = await fetch('/api/profile/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email?.toLowerCase().trim(),
        stats: data.stats || {},
        achievements: data.achievements || [],
        subjectPerformance: data.subjectPerformance || {},
      }),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
  } catch (err) {
    console.error('❌ [syncProfileToSheet] failed:', err.message);
    addLog({
      type: 'error',
      category: 'network',
      message: 'SYNC FAILED',
      data: { error: err.message, email: data?.email },
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE PULL — fetch latest profile from Sheets via /api/auth/verify
// Returns { stats, achievements, subjectPerformance } or null
// ─────────────────────────────────────────────────────────────────────────────

export async function pullProfileFromSheet(email, passwordHash) {
  devLog('📥 [pullProfileFromSheet]', email);
  try {
    const result = await apiPost('/api/auth/verify', { email, passwordHash });
    if (!result?.success) return null;
    const p = result.profile;
    return {
      stats: p.stats || {},
      achievements: p.achievements || [],
      subjectPerformance: p.subjectPerformance || {},
    };
  } catch (err) {
    console.error('❌ [pullProfileFromSheet] failed:', err.message);
    addLog({
      type: 'error',
      category: 'network',
      message: 'PULL FAILED',
      data: { error: err.message, email },
    });
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GUARDIAN
// ─────────────────────────────────────────────────────────────────────────────

export async function updateGuardianEmail({ email, guardianEmail }) {
  return apiPost('/api/profile/guardian', { email, guardianEmail });
}

export async function fetchGuardianEmail(email) {
  return apiGet('/api/profile/guardian', { email });
}

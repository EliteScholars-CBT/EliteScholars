// api/_helpers/security.js — log security events to Supabase
import { insertRow, supabaseEnabled } from './supabase.js';

export async function logSecurityEvent({ type, email, ip, detail = '' }) {
  try {
    if (supabaseEnabled()) {
      await insertRow('events', {
        type: `security_${type}`,
        email: email ? String(email).toLowerCase() : null,
        payload: { ip, detail },
      });
    }
  } catch {}
}

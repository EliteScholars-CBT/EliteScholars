// ============================================================================
// api/_helpers/security.js — Log security events to Apps Script sheet
// ============================================================================

import { sheetsPost } from './sheets.js';

export async function logSecurityEvent({ type, email, ip, detail = '' }) {
  try {
    await sheetsPost({
      action: 'securityEvents',
      events: [{
        type,
        target:    email || '',
        detail,
        url:       'api/' + type,
        ua:        '',
        timestamp: new Date().toISOString(),
      }],
    });
  } catch {}
}
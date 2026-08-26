/**
 * ATTICA CLEANERS — Lead Capture Form spam-defence tests
 *
 * These guard the two checks that can silently eat a real customer lead:
 * the email-domain blocklist and the submit-timing floor. The honeypot is
 * exercised end-to-end in the browser instead, since it is a DOM concern.
 *
 * The case that matters most is the lookalike domain. A naive substring
 * match would drop notvirtualhandsupport.community — a legitimate address
 * that merely contains the blocked string — and nobody would ever find out.
 *
 * Run with: pnpm test
 */

import { describe, expect, it } from 'vitest';
import { BLOCKED_EMAIL_DOMAINS, isBlockedEmail, isTooFast } from './LeadCaptureForm';

describe('BLOCKED_EMAIL_DOMAINS', () => {
  it('contains the vendor the client reported', () => {
    expect(BLOCKED_EMAIL_DOMAINS).toContain('virtualhandsupport.com');
  });

  it('holds bare lowercase domains only, so the matcher stays correct', () => {
    for (const domain of BLOCKED_EMAIL_DOMAINS) {
      expect(domain).toBe(domain.toLowerCase().trim());
      expect(domain).not.toContain('@');
      expect(domain).not.toMatch(/^https?:/);
      expect(domain).not.toMatch(/^www\./);
    }
  });
});

describe('isBlockedEmail — blocks the vendor', () => {
  it('blocks the exact domain', () => {
    expect(isBlockedEmail('sales@virtualhandsupport.com')).toBe(true);
  });

  it('blocks regardless of case', () => {
    expect(isBlockedEmail('Sales@VirtualHandSupport.COM')).toBe(true);
  });

  it('blocks subdomains', () => {
    expect(isBlockedEmail('rep@mail.virtualhandsupport.com')).toBe(true);
    expect(isBlockedEmail('rep@a.b.virtualhandsupport.com')).toBe(true);
  });

  it('blocks a trailing-dot fully-qualified name', () => {
    expect(isBlockedEmail('sales@virtualhandsupport.com.')).toBe(true);
  });

  it('blocks when the local part itself contains an @', () => {
    expect(isBlockedEmail('"odd@name"@virtualhandsupport.com')).toBe(true);
  });
});

describe('isBlockedEmail — never blocks a genuine lead', () => {
  it('lets the lookalike domain through', () => {
    // The whole point of matching on label boundaries rather than substrings.
    expect(isBlockedEmail('someone@notvirtualhandsupport.community')).toBe(false);
  });

  it('lets other lookalikes through', () => {
    expect(isBlockedEmail('a@virtualhandsupport.community')).toBe(false);
    expect(isBlockedEmail('a@virtualhandsupport.com.br')).toBe(false);
    expect(isBlockedEmail('a@myvirtualhandsupport.com')).toBe(false);
    expect(isBlockedEmail('a@virtualhandsupportt.com')).toBe(false);
  });

  it('lets a blocked domain in the LOCAL part through', () => {
    // A real person at gmail whose username happens to mention the vendor.
    expect(isBlockedEmail('virtualhandsupport.com@gmail.com')).toBe(false);
  });

  it('lets ordinary customers through', () => {
    expect(isBlockedEmail('john@gmail.com')).toBe(false);
    expect(isBlockedEmail('jane.doe@orlando-hvac.net')).toBe(false);
  });

  it('fails open on a blank or unreadable address', () => {
    // Email is optional on this form.
    expect(isBlockedEmail('')).toBe(false);
    expect(isBlockedEmail('   ')).toBe(false);
    expect(isBlockedEmail('no-at-sign')).toBe(false);
    expect(isBlockedEmail('trailing@')).toBe(false);
  });
});

describe('isTooFast', () => {
  const t0 = 1_000_000;

  it('rejects an instant scripted submit', () => {
    expect(isTooFast(t0, t0)).toBe(true);
    expect(isTooFast(t0, t0 + 200)).toBe(true);
  });

  it('rejects just under the 1500ms threshold', () => {
    expect(isTooFast(t0, t0 + 1499)).toBe(true);
  });

  it('accepts at and above the threshold', () => {
    expect(isTooFast(t0, t0 + 1500)).toBe(false);
    expect(isTooFast(t0, t0 + 4000)).toBe(false);
  });

  it('accepts a normal human fill time', () => {
    expect(isTooFast(t0, t0 + 30_000)).toBe(false);
  });

  it('fails open when the start time is missing or nonsense', () => {
    expect(isTooFast(null, t0)).toBe(false);
    expect(isTooFast(NaN, t0)).toBe(false);
  });

  it('fails open when the clock moved backwards', () => {
    // A system clock correction mid-fill must not cost the client a lead.
    expect(isTooFast(t0, t0 - 5000)).toBe(false);
  });
});

/**
 * ATTICA CLEANERS — Lead Capture Form
 * Design: Clean Air Luxury — clean form with green accents
 * EmailJS integration: sends all submissions to atticacleaners1@gmail.com
 * INP optimization: EmailJS is lazy-loaded only on form submit (not on page load)
 * Spam defence: honeypot + submit timing + blocked sender domains (see below)
 */

import { useRef, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

// EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_1ud1kw5';
const EMAILJS_TEMPLATE_ID = 'template_atum5ah';
const EMAILJS_PUBLIC_KEY  = 'f22PGUPTJ1sPihQjh';

/* ------------------------------------------------------------------ *
 * SPAM DEFENCE
 *
 * The whole form runs in the browser — there is no server in the request
 * path — so these are deterrents, not security. They exist to stop the
 * outbound lead-gen vendors that submit a handful of fake quote requests a
 * week, and they are deliberately tuned to let anything ambiguous through.
 *
 * GOVERNING RULE: losing one genuine lead costs the client far more than
 * receiving ten spam ones. Every check below fails OPEN — if a value is
 * missing, malformed, or merely suspicious, the lead is SENT.
 *
 * When a check does fire, the submission is dropped silently and the user
 * still sees the normal /thank-you success path. A bot that is told it
 * failed will adapt; one that thinks it succeeded will keep wasting its
 * time on a form that goes nowhere.
 * ------------------------------------------------------------------ */

/**
 * Email domains whose submissions are dropped.
 *
 * TO ADD A VENDOR: append the bare registered domain, lowercase, with no
 * "@", no "www." and no protocol — e.g. 'somevendor.com'. Subdomains are
 * covered automatically (mail.somevendor.com matches somevendor.com), and
 * matching is case-insensitive and boundary-aware, so adding 'example.com'
 * does NOT catch 'notexample.community' or 'example.com.br'.
 *
 * Keep this list small and specific. It should only ever contain domains
 * the client has actually confirmed as spam — never a whole free-mail
 * provider, and never a guess. Real customers use odd email addresses.
 */
export const BLOCKED_EMAIL_DOMAINS: readonly string[] = [
  // Reported by Oren (Attica) 2026-08: outbound lead-gen vendor submitting
  // roughly five fake quote requests a week under different names.
  'virtualhandsupport.com',
];

/**
 * Minimum plausible time between the form first rendering and a completed
 * submit, in milliseconds. Anything faster was not typed by a person.
 *
 * Set to 1.5s, and deliberately anchored at FIRST RENDER rather than first
 * keystroke, because both choices maximise the measured elapsed time and so
 * minimise the chance of rejecting a real person.
 *
 * The two populations are nowhere near each other:
 *   - Automated submits complete in roughly 50–300ms. A script has no
 *     reason to pause between filling the last field and firing submit.
 *   - The fastest realistic human path is click a field, accept a browser
 *     autofill suggestion, click Send. That is two deliberate clicks plus a
 *     dropdown selection — on the order of 2.5–4s of motor action alone,
 *     before any reading.
 *
 * 1500ms sits above the automation ceiling with room to spare and still
 * leaves better than 2x margin below the human floor. Raising it further
 * would buy almost nothing against bots while steadily increasing the odds
 * of eating a real lead, which is the expensive failure here.
 */
const MIN_SUBMIT_MS = 1500;

/**
 * Extracts the lowercase domain of an email address, or null when there
 * isn't one we can read with confidence. Returning null means "let it
 * through" — every caller treats an unreadable address as legitimate.
 */
function emailDomain(email: string): string | null {
  const at = email.lastIndexOf('@');
  if (at === -1) return null;

  // Trailing dots are legal in a fully-qualified name and would otherwise
  // defeat the comparison below.
  const domain = email.slice(at + 1).trim().toLowerCase().replace(/\.+$/, '');
  return domain || null;
}

/**
 * True only when the address sits on a blocked domain or one of its
 * subdomains. Compares whole labels rather than substrings, so a
 * legitimate address at notvirtualhandsupport.community is not caught.
 */
export function isBlockedEmail(email: string): boolean {
  // Email is an optional field on this form; a blank one is not a signal.
  if (!email || !email.trim()) return false;

  const domain = emailDomain(email);
  if (!domain) return false;

  return BLOCKED_EMAIL_DOMAINS.some(
    (blocked) => domain === blocked || domain.endsWith(`.${blocked}`),
  );
}

/**
 * True only when the submit is implausibly fast. A missing or nonsensical
 * start time (clock change, hydration oddity) reads as "can't tell", which
 * means the lead is sent.
 */
export function isTooFast(renderedAt: number | null, now: number): boolean {
  if (renderedAt === null || !Number.isFinite(renderedAt)) return false;

  const elapsed = now - renderedAt;
  if (!Number.isFinite(elapsed) || elapsed < 0) return false;

  return elapsed < MIN_SUBMIT_MS;
}

/**
 * Records a dropped submission.
 *
 * NOTE: this is client-side only and is therefore DIAGNOSTIC, not an audit
 * trail. A bot can ignore it, and a real visitor's console is not somewhere
 * anyone will look. It exists so that if the client ever reports "I stopped
 * getting leads", someone can open the console on the live form, submit,
 * and immediately see which check fired and why — rather than discovering
 * months later that the form had been quietly eating real enquiries.
 *
 * The GA4 event is the closest thing to a real signal: it is the only part
 * of this that reaches somewhere a human might notice a spike. It carries
 * the reason and the email domain only — never the name, phone or address
 * of whoever was dropped.
 */
function reportRejection(reason: string, detail: Record<string, unknown>): void {
  console.warn(
    `[lead-form] submission dropped — ${reason}`,
    { reason, ...detail, note: 'client-side diagnostic only, not an audit trail' },
  );

  // Lazy-imported for the same reason EmailJS is: nothing on this path
  // should cost the initial page load anything.
  import('@/lib/firebase')
    .then(({ trackEvent }) => trackEvent('lead_form_blocked', { reason, ...detail }))
    .catch(() => { /* analytics must never break the form */ });
}

interface LeadCaptureFormProps {
  dark?: boolean;
  title?: string;
  subtitle?: string;
}

/** Build a styled HTML email body matching the Wix Contact Form notification style */
function buildHtmlEmail(fields: {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  zipCode: string;
  message: string;
}): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 20px;background:#f9f9f9;border-bottom:1px solid #e8e8e8;">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:0.5px;">${label}</p>
        <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:15px;color:#222222;">${value || '<span style="color:#aaa;">—</span>'}</p>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1a3a2a;padding:28px 30px;text-align:center;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;font-weight:600;color:#7ec8a0;text-transform:uppercase;letter-spacing:1px;">New Form Submission</p>
            <h1 style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;">Contact Form</h1>
            <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#aaaaaa;">Attica Air Duct Cleaners</p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:20px 20px 10px;background:#ffffff;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#555555;">
              A site visitor just submitted your <strong>Contact Form</strong>. Here is a summary of their submission:
            </p>
          </td>
        </tr>

        <!-- Fields -->
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('First Name', fields.firstName)}
          ${row('Last Name', fields.lastName)}
          ${row('Phone Number', fields.phone)}
          ${row('Email', fields.email || 'Not provided')}
          ${row('Address', fields.address || 'Not provided')}
          ${row('City', fields.city || 'Not provided')}
          ${row('State', fields.state || 'Not provided')}
          ${row('Zip Code', fields.zipCode || 'Not provided')}
          ${row('Message', fields.message || 'No message provided')}
        </table>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 20px 28px;background:#ffffff;border-top:1px solid #e8e8e8;text-align:center;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#aaaaaa;">
              This email was sent as a notification from <strong>www.atticacleaners.com</strong>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default function LeadCaptureForm({
  dark = false,
  title = 'Get Your Free Quote',
  subtitle = "Fill out the form below and we'll get back to you within 24 hours.",
}: LeadCaptureFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '', city: '',
    state: 'FL', phone: '', email: '', zipCode: '', message: '',
  });

  // Honeypot value, kept out of `form` so it can never reach the email body.
  const [companyWebsite, setCompanyWebsite] = useState('');

  // When this form first rendered in the browser, for the timing check.
  // A ref rather than state: it must not trigger a re-render, and it must
  // survive every keystroke.
  const renderedAt = useRef<number>(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /** Shows the normal success path without sending anything. */
  const silentSuccess = () => {
    window.location.href = '/thank-you';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- Spam defence. Each check drops the submission silently. ---

    // 1. Honeypot. No human can see or tab to this field, so anything in it
    //    came from something filling inputs by name.
    if (companyWebsite.trim() !== '') {
      reportRejection('honeypot filled', { honeypotLength: companyWebsite.trim().length });
      silentSuccess();
      return;
    }

    // 2. Submit timing.
    const submittedAt = Date.now();
    const elapsedMs = submittedAt - renderedAt.current;
    if (isTooFast(renderedAt.current, submittedAt)) {
      reportRejection('submitted too fast', { elapsedMs, thresholdMs: MIN_SUBMIT_MS });
      silentSuccess();
      return;
    }

    // 3. Blocked sender domain.
    if (isBlockedEmail(form.email)) {
      reportRejection('blocked email domain', { domain: emailDomain(form.email) });
      silentSuccess();
      return;
    }

    const templateParams = {
      first_name:   form.firstName,
      last_name:    form.lastName,
      phone:        form.phone,
      email:        form.email || 'Not provided',
      address:      form.address || 'Not provided',
      city:         form.city || 'Not provided',
      state:        form.state || 'Not provided',
      zip_code:     form.zipCode || 'Not provided',
      message:      form.message || 'No message provided',
      html_message: buildHtmlEmail(form),
    };

    try {
      // Lazy-load EmailJS only when the form is actually submitted
      // This avoids parsing ~40KB of JS on initial page load (INP improvement)
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      window.location.href = '/thank-you';
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please call us at (407) 990-1969 or try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
    dark
      ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15'
      : 'bg-white border border-border text-foreground placeholder-muted-foreground focus:border-primary'
  }`;

  const labelClass = `block font-body text-xs font-semibold tracking-wide uppercase mb-1.5 ${dark ? 'text-white/60' : 'text-muted-foreground'}`;

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-foreground'}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`font-body text-sm ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/*
          Honeypot. Not part of the visible form and not a real field.

          It is moved off-screen inside a zero-size, overflow-hidden wrapper
          rather than given type="hidden" or display:none — bots skip both of
          those, but they do fill inputs they can find in the DOM by name.
          "company_website" is the kind of name a naive filler targets.

          Accessibility is not optional here: aria-hidden keeps it out of the
          screen-reader tree and tabIndex={-1} keeps it out of the tab order,
          so no assistive-tech user can ever land in it and be silently
          dropped. autoComplete="off" stops a browser filling it on the
          user's behalf. It is never required and never sent.

          Inline styles on purpose — this must not depend on a utility class
          surviving a future Tailwind config change.
        */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', left: '-9999px' }}
        >
          <label htmlFor="company_website">Company Website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name *</label>
            <input name="firstName" type="text" required placeholder="John" value={form.firstName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name *</label>
            <input name="lastName" type="text" required placeholder="Smith" value={form.lastName} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input name="address" type="text" placeholder="123 Main Street" value={form.address} onChange={handleChange} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-1">
            <label className={labelClass}>City</label>
            <input name="city" type="text" placeholder="Orlando" value={form.city} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input name="state" type="text" placeholder="FL" value={form.state} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Zip Code</label>
            <input name="zipCode" type="tel" placeholder="32801" value={form.zipCode} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone *</label>
            <input name="phone" type="tel" required placeholder="(407) 000-0000" value={form.phone} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>How May We Help You</label>
          <textarea name="message" rows={4} placeholder="Tell us about your needs..." value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
        </div>
        {error && (
          <p className="font-body text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
        <p className={`font-body text-xs ${dark ? 'text-white/40' : 'text-muted-foreground'}`}>
          * I agree to the Terms &amp; Conditions and Privacy Policy provided by Attica Air Duct Cleaners LLC. By providing my phone number, I agree to receive text messages from Attica Air Duct Cleaners LLC. Text STOP to cancel or HELP for help.
        </p>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {loading ? 'Sending...' : 'Send My Request'}
        </button>
      </form>
    </div>
  );
}

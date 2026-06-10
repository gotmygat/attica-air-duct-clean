/**
 * ATTICA CLEANERS — Lead Capture Form
 * Design: Clean Air Luxury — clean form with green accents
 * EmailJS integration: sends all submissions to atticacleaners1@gmail.com
 * INP optimization: EmailJS is lazy-loaded only on form submit (not on page load)
 */

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

// EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_1ud1kw5';
const EMAILJS_TEMPLATE_ID = 'template_atum5ah';
const EMAILJS_PUBLIC_KEY  = 'f22PGUPTJ1sPihQjh';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

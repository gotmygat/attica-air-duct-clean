/**
 * ATTICA CLEANERS — Lead Capture Form
 * Design: Clean Air Luxury — clean form with green accents
 * Used on homepage and all sub-pages
 */

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  dark?: boolean;
  title?: string;
  subtitle?: string;
}

export default function LeadCaptureForm({
  dark = false,
  title = 'Get Your Free Quote',
  subtitle = 'Fill out the form below and we\'ll get back to you within 24 hours.',
}: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '', city: '',
    state: 'FL', phone: '', email: '', zipCode: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend/CRM
    setSubmitted(true);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
    dark
      ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/15'
      : 'bg-white border border-border text-foreground placeholder-muted-foreground focus:border-primary'
  }`;

  const labelClass = `block font-body text-xs font-semibold tracking-wide uppercase mb-1.5 ${dark ? 'text-white/60' : 'text-muted-foreground'}`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-primary" />
        </div>
        <h3 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-foreground'}`}>
          Thank You!
        </h3>
        <p className={`font-body text-sm ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
          We've received your request and will contact you within 24 hours.<br />
          For immediate assistance, call <a href="tel:4079901969" className="text-primary font-semibold">(407) 990-1969</a>.
        </p>
      </div>
    );
  }

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
        <p className={`font-body text-xs ${dark ? 'text-white/40' : 'text-muted-foreground'}`}>
          * I agree to the Terms & Conditions and Privacy Policy provided by Attica Air Duct Cleaners LLC. By providing my phone number, I agree to receive text messages from Attica Air Duct Cleaners LLC. Text STOP to cancel or HELP for help.
        </p>
        <button type="submit" className="btn-primary w-full justify-center gap-2 py-3.5">
          <Send size={16} />
          Send My Request
        </button>
      </form>
    </div>
  );
}

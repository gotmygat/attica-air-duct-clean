/**
 * ATTICA CLEANERS — Contact Page
 * Design: Clean Air Luxury — dark hero, light content area
 * SEO: ContactPage JSON-LD, BreadcrumbList, full meta tags
 */

import { Phone, Mail, Clock, MapPin, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import SEO from '@/components/SEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BASE_URL = 'https://www.atticacleaners.com';

const CONTACT_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: 'Contact Attica Air Duct Cleaners',
      url: `${BASE_URL}/contact`,
      description: 'Contact Attica Air Duct Cleaners in Orlando, FL. Call (407) 990-1969 or fill out our form for a free quote on air duct cleaning, dryer vent cleaning, and more.',
      mainEntity: {
        '@type': 'LocalBusiness',
        name: 'Attica Air Duct Cleaners',
        telephone: '(407) 990-1969',
        email: 'atticacleaners1@gmail.com',
        url: BASE_URL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Orlando',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
      ],
    },
  ],
};

const SERVICE_AREAS = [
  'Orlando', 'Winter Park', 'Altamonte Springs', 'Sanford', 'Longwood',
  'Oviedo', 'Windermere', 'Winter Garden', 'Apopka', 'Casselberry',
  'Lake Mary', 'Maitland', 'Ocoee', 'Clermont', 'Deltona',
];

export default function Contact() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Attica Air Duct Cleaners | Orlando, FL | (407) 990-1969"
        description="Contact Attica Air Duct Cleaners in Orlando, FL. Call (407) 990-1969 or fill out our form for a free quote on air duct cleaning, dryer vent cleaning, chimney inspection & more."
        canonical="/contact"
        jsonLd={CONTACT_JSON_LD}
      />
      <Header />

      {/* ── HERO ── */}
      <section className="bg-[#0f1923] pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.56 0.12 165)' }}>
              Get In Touch
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Contact Us
            </h1>
            <p className="font-body text-white/60 text-lg leading-relaxed">
              Ready to breathe cleaner air? Call us, fill out the form, or send us an email — we respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-10 fade-up">

              {/* Phone */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                    <Phone size={18} style={{ color: 'oklch(0.40 0.12 165)' }} />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Call Us</h2>
                </div>
                <a
                  href="tel:4079901969"
                  className="font-body text-2xl font-semibold hover:underline"
                  style={{ color: 'oklch(0.56 0.12 165)' }}
                >
                  (407) 990-1969
                </a>
                <p className="font-body text-sm text-muted-foreground mt-1">Fastest way to get a quote or schedule service</p>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                    <Mail size={18} style={{ color: 'oklch(0.40 0.12 165)' }} />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Email Us</h2>
                </div>
                <a
                  href="mailto:atticacleaners1@gmail.com"
                  className="font-body text-base font-medium hover:underline"
                  style={{ color: 'oklch(0.56 0.12 165)' }}
                >
                  atticacleaners1@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                    <Clock size={18} style={{ color: 'oklch(0.40 0.12 165)' }} />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Business Hours</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { days: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                    { days: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                    { days: 'Sunday', hours: 'Closed' },
                  ].map(({ days, hours }) => (
                    <div key={days} className="flex justify-between font-body text-sm">
                      <span className="text-foreground font-medium">{days}</span>
                      <span className="text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Area */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                    <MapPin size={18} style={{ color: 'oklch(0.40 0.12 165)' }} />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Service Area</h2>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-3">We serve Greater Orlando and surrounding cities:</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.map((city) => (
                    <span key={city} className="inline-flex items-center gap-1 font-body text-xs font-medium px-3 py-1.5 rounded-full bg-[#F5F0E8] text-foreground">
                      <CheckCircle size={11} style={{ color: 'oklch(0.56 0.12 165)' }} />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 fade-up">
              <div className="bg-[#0f1923] rounded-3xl p-8 lg:p-10">
                <LeadCaptureForm
                  dark={true}
                  title="Get Your Free Quote"
                  subtitle="Fill out the form and we'll get back to you within 24 hours."
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

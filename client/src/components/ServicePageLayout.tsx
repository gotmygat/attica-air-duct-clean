/**
 * ATTICA CLEANERS — Service Page Layout
 * Reusable layout for all service sub-pages
 * Redesigned hero: split layout (text left, image right) — no stretching or cropping
 * Includes full SEO: meta tags, Open Graph, JSON-LD, canonical, alt text, H1/H2/H3 hierarchy
 */

import Header from './Header';
import Footer from './Footer';
import LeadCaptureForm from './LeadCaptureForm';
import SEO from './SEO';
import { CheckCircle, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BASE_URL = 'https://attica-cleaners.web.app';

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt?: string;
  description: string;
  benefits: string[];
  details: { heading: string; text: string }[];
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  description,
  benefits,
  details,
  metaTitle,
  metaDescription,
  canonical,
}: ServicePageLayoutProps) {
  useScrollAnimation();

  const seoTitle = metaTitle || `${title} in Orlando, FL`;
  const seoDescription = metaDescription || `${description.slice(0, 155).trim()}…`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: seoDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Attica Air Duct Cleaners',
      telephone: '(407) 990-1969',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Orlando',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
    },
    areaServed: { '@type': 'City', name: 'Orlando' },
    url: `${BASE_URL}${canonical || ''}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        image={heroImage.startsWith('/') ? `${BASE_URL}${heroImage}` : heroImage}
        jsonLd={serviceJsonLd}
      />
      <Header />

      {/* ── HERO: Split layout — dark text panel left, image right ── */}
      <section className="bg-[#111111]" aria-label={`${title} hero`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[420px]">
          {/* Left: text */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
            <p className="font-body text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              {subtitle}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {title}
            </h1>
            <p className="font-body text-white/70 text-base leading-relaxed max-w-md mb-8">
              {description.split('.')[0]}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:4079901969"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                aria-label="Call Attica Air Duct Cleaners at (407) 990-1969"
              >
                <Phone size={15} aria-hidden="true" />
                Call (407) 990-1969
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Get a Free Quote
              </a>
            </div>
          </div>

          {/* Right: image — contained, never stretched */}
          <div className="relative overflow-hidden min-h-[280px] lg:min-h-0">
            <img
              src={heroImage}
              alt={heroImageAlt || `${title} service by Attica Air Duct Cleaners in Orlando, FL`}
              className="w-full h-full object-cover object-center"
              loading="eager"
              style={{ minHeight: '280px' }}
            />
            {/* subtle dark overlay on right edge for blend */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#111111] to-transparent hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 lg:py-28" aria-label={`${title} service details`} id="quote-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="section-rule" />
              <p className="font-body text-muted-foreground leading-relaxed mb-10 text-lg">{description}</p>

              {/* Benefits — H2 section */}
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12 fade-up">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-[#F5F0E8] rounded-xl p-4">
                    <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-body text-sm text-foreground">{b}</span>
                  </div>
                ))}
              </div>

              {/* Details — H3 for each subsection */}
              <div className="space-y-8">
                {details.map((d, i) => (
                  <div key={i} className="fade-up">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{d.heading}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{d.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href="tel:4079901969" className="btn-primary" aria-label="Call Attica Air Duct Cleaners at (407) 990-1969">
                  <Phone size={16} aria-hidden="true" />
                  Call (407) 990-1969
                </a>
                <a href="#quote-form" className="btn-outline" aria-label="Get a free quote">
                  Get a Free Quote
                </a>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#111111] rounded-3xl p-8">
                <LeadCaptureForm
                  dark={true}
                  title="Get a Free Quote"
                  subtitle="We'll respond within 24 hours."
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

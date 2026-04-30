/**
 * ATTICA CLEANERS — Service Page Layout
 * Reusable layout for all service sub-pages
 */

import Header from './Header';
import Footer from './Footer';
import LeadCaptureForm from './LeadCaptureForm';
import { CheckCircle, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  benefits: string[];
  details: { heading: string; text: string }[];
  metaTitle?: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  heroImage,
  description,
  benefits,
  details,
  metaTitle,
}: ServicePageLayoutProps) {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="font-body text-primary text-sm font-semibold tracking-widest uppercase mb-2">{subtitle}</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="section-rule" />
              <p className="font-body text-muted-foreground leading-relaxed mb-10 text-lg">{description}</p>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-12 fade-up">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-[#F5F0E8] rounded-xl p-4">
                    <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">{b}</span>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-8">
                {details.map((d, i) => (
                  <div key={i} className="fade-up">
                    <h2 className="font-display text-xl font-bold text-foreground mb-3">{d.heading}</h2>
                    <p className="font-body text-muted-foreground leading-relaxed">{d.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a href="tel:4079901969" className="btn-primary">
                  <Phone size={16} />
                  Call (407) 990-1969
                </a>
                <a href="tel:4079901969" className="btn-outline">
                  Book Online
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

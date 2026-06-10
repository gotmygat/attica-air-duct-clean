/**
 * ATTICA CLEANERS — About Us Page
 * Design: Clean Air Luxury — editorial layout with dark hero
 * SEO: AboutPage + Organization JSON-LD, BreadcrumbList, H1/H2/H3 hierarchy
 */

import { Phone, CheckCircle, Award, Users, Leaf, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'wouter';

const BASE_URL = 'https://www.atticacleaners.com';
const CF = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg';
const WHY_IMG = `${CF}/attica-why-choose-9SbmvXVHyTPbvvzQi2k7ge.webp`;
const AIR_DUCT_IMG = `${CF}/attica-air-duct-DyuTQXMLptwvdGKyf8Unbg.webp`;

const ABOUT_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      name: 'About Attica Air Duct Cleaners',
      url: `${BASE_URL}/about`,
      description: 'Learn about Attica Air Duct Cleaners — Orlando\'s trusted air duct cleaning specialists. Our story, mission, and commitment to cleaner air for Greater Orlando families.',
      mainEntity: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#business`,
        name: 'Attica Air Duct Cleaners',
        url: BASE_URL,
        telephone: '(407) 990-1969',
        email: 'atticacleaners1@gmail.com',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/attica-logo.png` },
        description: 'Orlando-based air duct cleaning company providing professional air duct cleaning, dryer vent cleaning, chimney inspection, attic insulation, and air purification services across Greater Orlando, FL.',
        foundingLocation: { '@type': 'Place', name: 'Orlando, FL' },
        areaServed: { '@type': 'State', name: 'Florida' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Orlando',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        knowsAbout: [
          'Air Duct Cleaning',
          'Dryer Vent Cleaning',
          'Chimney Inspection',
          'Attic Insulation',
          'Air Purification',
          'HVAC Cleaning',
          'Indoor Air Quality',
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
      ],
    },
  ],
};

const VALUES = [
  {
    icon: Award,
    title: 'Certified Expertise',
    desc: 'Our technicians are certified and trained in advanced Negative Air Pressure Technology for thorough, professional results every time.',
  },
  {
    icon: Shield,
    title: 'Background-Checked Team',
    desc: 'Every Attica technician is background-checked. We send professionals you can trust into your home.',
  },
  {
    icon: Leaf,
    title: 'Healthier Air, Guaranteed',
    desc: 'We provide detailed before-and-after photo and video reports so you can see the clear results yourself.',
  },
  {
    icon: Users,
    title: 'Community-First Service',
    desc: 'We started as a small local business and grew through word-of-mouth. Every job is treated like a referral.',
  },
];

export default function About() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Attica Air Duct Cleaners | Orlando's Trusted Air Duct Cleaning Company"
        description="Learn about Attica Air Duct Cleaners — Orlando's trusted air duct cleaning specialists. Backed by years of expertise, serving Greater Orlando with certified, professional indoor air quality services."
        canonical="/about"
        jsonLd={ABOUT_JSON_LD}
      />
      <Header />

      {/* ── HERO ── */}
      <section className="bg-[#0f1923] pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.56 0.12 165)' }}>
              Who We Are
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              About Attica Air Duct Cleaners
            </h1>
            <p className="font-body text-white/60 text-lg leading-relaxed">
              Orlando's trusted air duct cleaning specialists — backed by years of proven expertise and a commitment to healthier homes.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div className="fade-up">
              <div className="w-12 h-0.5 mb-6" style={{ background: 'oklch(0.56 0.12 165)' }} />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-base">
                <p>
                  Attica Air Duct Cleaners' journey began with a clear mission: to bring cleaner air and healthier living environments to the homes of Orlando and its surrounding areas.
                </p>
                <p>
                  Backed by years of proven expertise and advanced Air Care technology, our Orlando-based team is committed to delivering top-tier air duct and dryer vent cleaning services tailored to the unique climate and building standards of Florida.
                </p>
                <p>
                  We helped families and homeowners improve indoor air quality at affordable rates. What started as a small local business has grown into a trusted provider of residential HVAC air duct cleaning services in the greater Orlando, Florida area.
                </p>
                <p>
                  Our team recognized the need for reliable, high-quality cleaning solutions to maintain a healthy indoor environment. Attica also offers expert dryer vent cleaning in Orlando, Florida — safety experts recommend this service yearly to protect your home and keep your dryer running efficiently.
                </p>
                <p>
                  Every project includes a detailed before-and-after photo and video report, allowing you to see the clear results yourself. When you need reliable air duct cleaning in the greater Orlando, Florida area, choose Attica for professional service, certified expertise, and healthier air.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="tel:4079901969" className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
                  <Phone size={15} />
                  Call (407) 990-1969
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm px-6 py-3 rounded-full hover:bg-muted transition-colors">
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="fade-up rounded-3xl overflow-hidden shadow-xl">
              <img
                src={WHY_IMG}
                alt="Attica Air Duct Cleaners team performing professional air duct cleaning in Orlando, FL"
                className="w-full h-full object-cover"
                style={{ minHeight: '400px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 fade-up">
            <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: 'oklch(0.56 0.12 165)' }} />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Families Trust Attica</h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Our commitment to quality, safety, and transparency sets us apart from other air duct cleaning companies in Orlando.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow fade-up">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'oklch(0.93 0.04 165)' }}>
                  <Icon size={22} style={{ color: 'oklch(0.40 0.12 165)' }} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="fade-up rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img
                src={AIR_DUCT_IMG}
                alt="Professional air duct cleaning service in Orlando, FL by Attica Air Duct Cleaners"
                className="w-full h-full object-cover"
                style={{ minHeight: '380px' }}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="fade-up order-1 lg:order-2">
              <div className="w-12 h-0.5 mb-6" style={{ background: 'oklch(0.56 0.12 165)' }} />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Services</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                We offer a comprehensive range of indoor air quality services for homeowners and businesses across Greater Orlando, FL.
              </p>
              <div className="space-y-3">
                {[
                  'Air Duct Cleaning — Unlimited Vents, Negative Air Pressure Technology',
                  'Dryer Vent Cleaning — Up to 7ft, fire prevention',
                  'Chimney Inspection & Cleaning — creosote removal, safety check',
                  'Attic Insulation — blow-in insulation, energy savings',
                  'Air Purification Systems — whole-home HEPA filtration',
                  'Condenser Coil Cleaning — restore HVAC efficiency',
                  'HVAC System Restoration — full system care',
                ].map((service) => (
                  <div key={service} className="flex items-start gap-3">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'oklch(0.56 0.12 165)' }} />
                    <span className="font-body text-sm text-foreground">{service}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/services" className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0f1923]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Breathe Easier?</h2>
          <p className="font-body text-white/60 mb-8 leading-relaxed">
            Join hundreds of Orlando families who trust Attica for cleaner air and a healthier home. Call us today for a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:4079901969" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-primary/90 transition-colors">
              <Phone size={16} />
              Call (407) 990-1969
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

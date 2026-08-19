/**
 * ATTICA CLEANERS — Home Page
 * Design: Clean Air Luxury — Playfair Display + Outfit
 * Palette: Warm white bg, charcoal text, teal-green accent — light & airy
 */

import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import {
  Phone, Star, CheckCircle, Award, Leaf, Zap,
  MapPin, ArrowRight, Users, Wind, Flame, Thermometer, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import SEO from '@/components/SEO';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const BASE_URL = 'https://www.atticacleaners.com';

const HOME_FAQ = [
  {
    q: 'How much does air duct cleaning cost in Orlando?',
    a: 'Attica Air Duct Cleaners offers a $97 special per A/C unit that includes unlimited vents, maintenance cleaning, coil condition check, air flow inspection, and duct condition inspection. No hidden fees.',
  },
  {
    q: 'How often should I have my air ducts cleaned?',
    a: 'We recommend air duct cleaning every 3–5 years for most homes. If you have pets, allergies, asthma, or have recently completed renovations, annual cleaning is advisable.',
  },
  {
    q: 'How long does air duct cleaning take?',
    a: 'A typical residential air duct cleaning takes 2–4 hours depending on the size of your home and number of vents. Our team works efficiently without cutting corners.',
  },
  {
    q: 'Do you serve areas outside of Orlando?',
    a: 'Yes! We serve all of Greater Orlando including Winter Park, Altamonte Springs, Sanford, Longwood, Oviedo, Windermere, Winter Garden, Clermont, Apopka, and more.',
  },
  {
    q: 'Is dryer vent cleaning really necessary?',
    a: 'Absolutely. Clogged dryer vents are one of the leading causes of house fires. Safety experts recommend annual dryer vent cleaning to protect your home and keep your dryer running efficiently.',
  },
  {
    q: 'Are your technicians certified and background-checked?',
    a: 'Yes. All Attica technicians are certified, background-checked, and trained in advanced Negative Air Pressure Technology for thorough, safe cleaning.',
  },
];

const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#business`,
      name: 'Attica Air Duct Cleaners',
      url: BASE_URL,
      telephone: '(407) 990-1969',
      email: 'atticacleaners1@gmail.com',
      image: `${BASE_URL}/assets/attica-logo.png`,
      description: "Orlando's trusted air duct cleaning specialists. Serving Greater Orlando with air duct cleaning, dryer vent cleaning, chimney inspection, attic insulation, and air purification.",
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Orlando',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.5383,
        longitude: -81.3792,
      },
      areaServed: [
        { '@type': 'City', name: 'Orlando' },
        { '@type': 'City', name: 'Winter Park' },
        { '@type': 'City', name: 'Altamonte Springs' },
        { '@type': 'City', name: 'Sanford' },
        { '@type': 'City', name: 'Longwood' },
        { '@type': 'City', name: 'Oviedo' },
        { '@type': 'City', name: 'Windermere' },
        { '@type': 'City', name: 'Winter Garden' },
      ],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '08:00', closes: '21:00' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Joenas Brauers' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'I was so impressed with the professionalism of the estimator as well as the two teams that did the work. I feel they went above and beyond to explain everything.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Lari French' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Attica team showed up promptly, introduced themselves & explained the process thoroughly & answered all my questions. They were friendly & conducted the job quickly & efficiently!',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'James Khosravi' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Attica always does an outstanding job and provides the very best service. Give them a call for ac or dryer vent cleaning. You will not regret it.',
        },
      ],
      sameAs: [
        'https://www.google.com/maps/place/Attica+Air+Duct+Cleaners',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: HOME_FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

const VIDEO_URL = '/assets/hero.mp4';

const CF = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg';
const WHY_CHOOSE_IMG = '/assets/why-choose-attica.webp';
const AIR_DUCT_IMG   = '/assets/air-duct-cleaning.webp';
const DRYER_IMG      = `${CF}/attica-dryer-vent-HUUTnvW6cjAqwvmfjdrvne.webp`;
const CHIMNEY_IMG    = '/assets/chimney-inspection.webp';
const INSULATION_IMG = `${CF}/attica-insulation-9E3gQuVCTRRtKuUcVBFgKb.webp`;
const PURIFY_IMG     = 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=700&q=80';

const SERVICES = [
  { title: 'Air Duct Cleaning', desc: 'Unlimited vents. Remove dust, allergens, pet dander, mold, and musty odors with Negative Air Pressure Technology.', img: AIR_DUCT_IMG, href: '/air-duct-cleaning', tag: 'Most Popular', icon: Wind },
  { title: 'Dryer Vent Cleaning', desc: 'Up to 7ft. Eliminate burning smells, prevent fires, remove lint buildup, and ensure efficient drying cycles.', img: DRYER_IMG, href: '/dryer-vent-cleaning', tag: 'Fire Prevention', icon: Flame },
  { title: 'Chimney Inspection', desc: 'Check for creosote buildup, carbon monoxide risks, fire hazards, and flue blockages with a full inspection.', img: CHIMNEY_IMG, href: '/chimney-cleaning', tag: null, icon: Flame },
  { title: 'Attic Insulation', desc: 'Professional blow-in insulation to optimize energy efficiency, comfort, and savings on your energy bills.', img: INSULATION_IMG, href: '/attic-insulation', tag: 'Energy Savings', icon: Thermometer },
  { title: 'Air Purification', desc: 'Whole-home air purification systems installed directly into your HVAC for clean air in every room.', img: PURIFY_IMG, href: '/air-purification', tag: null, icon: Wind },
];

const TESTIMONIALS = [
  { name: 'Joenas Brauers', text: 'I was so impressed with the professionalism of the estimator as well as the two teams that did the work. I feel they went above and beyond to explain everything.' },
  { name: 'Lari French', text: 'Attica team showed up promptly, introduced themselves & explained the process thoroughly & answered all my questions. They were friendly & conducted the job quickly & efficiently!' },
  { name: 'James Khosravi', text: 'Attica always does an outstanding job and provides the very best service. Give them a call for ac or dryer vent cleaning. You will not regret it. 407-990-1969' },
];

const LOCATIONS = [
  'Altamonte Springs','Apopka','Belle Isle','Casselberry','Clermont',
  'Deland','Deltona','Gotha','Lake Mary','Lake Monroe',
  'Longwood','Maitland','Ocoee','Orlando','Oviedo',
  'Sanford','Windermere','Winter Garden','Winter Park','Winter Springs',
];

const SPECIAL_ITEMS_LEFT  = ['Per A/C Unit', 'Maintenance Cleaning', 'Coil Condition Check'];
const SPECIAL_ITEMS_RIGHT = ['Unlimited Duct Supply', 'Air Flow Inspection', 'Duct Condition Check'];

// Current month + year for the special-offer badge, e.g. "July 2026".
// Recomputes on every render so the badge always reflects the current month.
const SPECIAL_MONTH = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

/**
 * Hero background video, deferred until the page has finished loading.
 *
 * The file is ~850 KB and the poster alone carries the visual, so fetching it
 * during initial load only takes bandwidth away from the paint. Holding it
 * back until the load event (or the next idle slot, if the page is already
 * loaded) keeps it out of that contention entirely.
 *
 * The source is assigned imperatively rather than rendered as a <source>
 * child: React inserting the child mid-flight makes the element abort its
 * first attempt and start over, which shows up as a duplicate request.
 * Setting .src once produces exactly one fetch.
 *
 * scripts/prerender.mjs strips the src back out of the static snapshot —
 * without that, the deferral would be undone by the very HTML it produces.
 */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Never attach during the build-time prerender. scripts/prerender.mjs
    // drives the page with Puppeteer and waits for networkidle0; starting an
    // 850 KB download *after* the load event means the network never settles
    // and the route times out. The video is decorative and aria-hidden, so
    // there is nothing for the snapshot to gain by loading it.
    if (navigator.webdriver) return;

    let idle = 0;

    const attach = () => {
      const v = ref.current;
      if (!v || v.src) return;
      v.src = VIDEO_URL;
      v.play().catch(() => {
        /* autoplay can be refused; the poster still covers the hero */
      });
    };

    const schedule = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      };
      idle = w.requestIdleCallback
        ? w.requestIdleCallback(attach, { timeout: 3000 })
        : window.setTimeout(attach, 200);
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
      const w = window as Window & { cancelIdleCallback?: (h: number) => void };
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else if (idle) window.clearTimeout(idle);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/assets/hero-poster.webp"
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
  );
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value);
  return (
    <div className="text-center px-4">
      <div className="font-display text-4xl lg:text-5xl font-bold text-white mb-1">
        <span ref={ref}>0</span>{suffix}
      </div>
      <div className="font-body text-sm text-white/80 font-medium">{label}</div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-foreground text-base">{q}</span>
        <ChevronDown size={18} className={`flex-shrink-0 text-primary transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="font-body text-muted-foreground text-sm leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function Home() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Air Duct Cleaning Service Orlando"
        description="Orlando's trusted air duct cleaning service — duct & dryer vent cleaning, chimney inspection & attic insulation. Call (407) 990-1969."
        canonical="/"
        jsonLd={HOME_JSON_LD}
      />
      <Header />

      {/* ═══════════════════════════════════════════
          HERO — Full-bleed video, dark overlay
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="font-body text-xs text-white font-medium tracking-wide">Orlando's #1 Rated Air Duct Cleaners</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
              Breathe{' '}
              <span className="text-[#4ade80] italic">Cleaner Air</span>
              <br />Orlando's Air Duct Cleaning Service
            </h1>
            <p className="font-body text-base sm:text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Orlando's expert air duct cleaning service — air duct &amp; dryer vent cleaning powered by
              Negative Air Pressure Technology. Protect your family's health and prevent fire hazards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#special-offer" className="btn-primary text-base px-8 py-4">
                See $97 Special
              </a>
              <a href="tel:4079901969" className="btn-white text-base px-8 py-4">
                <Phone size={16} />
                (407) 990-1969
              </a>
            </div>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
              <span className="font-body text-sm text-white/70 ml-1">5-Star Verified Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          $97 SPECIAL — Prominent, matches screenshot
      ═══════════════════════════════════════════ */}
      <section id="special-offer" className="py-16 lg:py-20 bg-[#0f1923]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up">
            {/* Outer card — dark navy like the screenshot */}
            <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #162030 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="grid lg:grid-cols-[1fr_auto] gap-0">
                {/* Left content */}
                <div className="p-8 lg:p-12">
                  {/* Badge — teal pill like screenshot */}
                  <div className="inline-flex items-center bg-[#2DD4BF] text-[#0f1923] text-xs font-body font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide">
                    {SPECIAL_MONTH} Special
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
                    The "Clean Air" Special
                  </h2>
                  <p className="font-body text-white/60 mb-8 max-w-md leading-relaxed">
                    Unlimited Air Duct + Dryer Vent Cleaning powered by our state-of-the-art Negative Air Pressure Technology.
                  </p>
                  {/* Two-column checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {[...SPECIAL_ITEMS_LEFT, ...SPECIAL_ITEMS_RIGHT].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-[#2DD4BF] flex-shrink-0" />
                        <span className="font-body text-sm text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right price card — white box */}
                <div className="flex items-center justify-center p-8 lg:p-12">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-2xl min-w-[200px]">
                    <p className="font-body text-sm text-gray-400 line-through mb-1">Was $279</p>
                    <div className="font-display font-bold text-[#2DD4BF] leading-none mb-1" style={{ fontSize: '5rem' }}>
                      $97
                    </div>
                    <p className="font-body text-sm text-gray-500 mb-6">Limited Time Offer</p>
                    <a
                      href="tel:4079901969"
                      className="block w-full text-center font-body font-bold text-sm py-3 px-6 rounded-full text-white transition-all duration-200 hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #2DD4BF, #16a34a)' }}
                    >
                      Book Service Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════ */}
      <section className="py-10" style={{ background: 'oklch(0.56 0.12 165)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x divide-white/20">
            <StatItem value={500} suffix="+" label="Happy Customers" />
            <StatItem value={20}  suffix=""  label="Cities Served" />
            <StatItem value={5}   suffix="★" label="Average Rating" />
            <StatItem value={100} suffix="%" label="Satisfaction Guaranteed" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES GRID — Light background
      ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <div className="section-rule mx-auto" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Air Quality Solutions
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              From residential and commercial air duct cleaning to HVAC duct cleaning, dryer vents, and more — expert services designed to improve your home's air quality, safety, and energy efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div key={service.title} className="card-service group fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  {service.tag && (
                    <div className="absolute top-3 left-3 text-white text-xs font-body font-semibold px-3 py-1 rounded-full" style={{ background: 'oklch(0.56 0.12 165)' }}>
                      {service.tag}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">{service.desc}</p>
                  <Link href={service.href} className="inline-flex items-center gap-1.5 font-body text-sm font-semibold hover:gap-3 transition-all duration-200" style={{ color: 'oklch(0.56 0.12 165)' }}>
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US — Warm sand background
      ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="section-rule" />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Greater Orlando Trusts Attica Cleaners
              </h2>
              <p className="font-body text-muted-foreground mb-10 leading-relaxed">
                We don't just clean vents — we restore your home's respiratory system. Our meticulous approach ensures you breathe easier and live healthier.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Award, title: 'Certified Expertise', desc: 'Our technicians bring years of specialized experience to every job.' },
                  { icon: Zap, title: 'Negative Air Pressure Technology', desc: 'State-of-the-art equipment for deep, thorough cleaning every time.' },
                  { icon: Leaf, title: 'Eco-Friendly Solutions', desc: 'Safe for your family, your pets, and the environment.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.93 0.04 165)' }}>
                      <Icon size={22} style={{ color: 'oklch(0.56 0.12 165)' }} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1">{title}</h3>
                      <p className="font-body text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a href="tel:4079901969" className="btn-primary">Schedule Your Cleaning</a>
              </div>
            </div>
            <div className="fade-up relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={WHY_CHOOSE_IMG} alt="Attica Cleaners professional technician" className="w-full h-[480px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.56 0.12 165)' }}>
                  <CheckCircle size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-foreground text-lg">100%</div>
                  <div className="font-body text-xs text-muted-foreground">Satisfaction Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HIRING BANNER — teal green
      ═══════════════════════════════════════════ */}
      <section className="py-14" style={{ background: 'oklch(0.56 0.12 165)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 fade-up">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Users size={30} className="text-white" />
            </div>
            <div className="text-center lg:text-left flex-1">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">We're Hiring!</h2>
              <p className="font-body text-white/85 leading-relaxed max-w-3xl">
                Our team is growing and we're seeking a reliable, motivated new team member. Full-time position. Great work environment. Training provided. If you're hardworking, responsible, and ready to be part of a solid team — we want to hear from you! Send a message to (407) 990-1969.
              </p>
            </div>
            <a href="tel:4079901969" className="btn-white flex-shrink-0">
              <Phone size={16} /> (407) 990-1969
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — White background
      ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <div className="section-rule mx-auto" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Loved by Florida Homeowners
            </h2>
            <p className="font-body text-muted-foreground">See what your neighbors are saying.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300 fade-up" style={{ transitionDelay: `${i * 100}ms`, background: '#FAFAF8' }}>
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <blockquote className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                    <span className="font-display font-bold text-sm" style={{ color: 'oklch(0.56 0.12 165)' }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="font-body text-xs text-muted-foreground">Verified Customer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE AREAS — Sand background
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <div className="section-rule mx-auto" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Proudly Serving Greater Orlando
            </h2>
            <p className="font-body text-muted-foreground">20 cities across Central Florida</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 fade-up">
            {LOCATIONS.map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 text-sm font-body font-medium text-foreground border border-border hover:border-[oklch(0.56_0.12_165)] hover:text-[oklch(0.56_0.12_165)] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <MapPin size={13} className="flex-shrink-0" style={{ color: 'oklch(0.56 0.12 165)' }} />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LEAD CAPTURE + CTA — Dark section at bottom
      ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0f1923]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="fade-up">
              <div className="w-12 h-0.5 mb-6" style={{ background: 'oklch(0.56 0.12 165)' }} />
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Breathe Easier?
              </h2>
              <p className="font-body text-white/60 mb-8 leading-relaxed">
                Book your $97 Air Duct &amp; Dryer Vent cleaning special today. Fast, professional, and guaranteed.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Same-week scheduling available',
                  'No hidden fees — transparent pricing',
                  '100% satisfaction guarantee',
                  'Certified, background-checked technicians',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-body text-sm text-white/70">
                    <CheckCircle size={16} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:4079901969" className="btn-primary">
                  <Phone size={16} /> Call (407) 990-1969
                </a>
              </div>
            </div>
            <div className="fade-up rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <LeadCaptureForm dark={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ SECTION — FAQPage schema eligible
      ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]" aria-label="Frequently Asked Questions">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="font-body text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.56 0.12 165)' }}>Got Questions?</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="font-body text-muted-foreground">Everything you need to know about air duct cleaning in Orlando.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-border px-6 fade-up">
            {HOME_FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
          <p className="text-center mt-8 font-body text-sm text-muted-foreground">
            Still have questions?{' '}
            <a href="tel:4079901969" className="font-semibold" style={{ color: 'oklch(0.56 0.12 165)' }}>Call us at (407) 990-1969</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

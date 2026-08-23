/**
 * ATTICA CLEANERS — Dynamic Location Page
 * Design: Clean Air Luxury — light editorial layout
 * Uses Leaflet + OpenStreetMap (no API key needed)
 * OS-aware directions link
 */

import { useParams } from 'wouter';
import { MapPin, Phone, CheckCircle, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { MapView } from '@/components/Map';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

const BASE_URL = 'https://www.atticacleaners.com';

const CITY_DATA: Record<string, { name: string; county: string; lat: number; lng: number; blurb: string }> = {
  'orlando':           { name: 'Orlando',           county: 'Orange County',   lat: 28.5383, lng: -81.3792, blurb: 'Serving all of Orlando with professional air duct, dryer vent, and chimney cleaning services.' },
  'apopka':            { name: 'Apopka',             county: 'Orange County',   lat: 28.6936, lng: -81.5322, blurb: 'Trusted air duct cleaning services for Apopka homeowners and businesses.' },
  'longwood':          { name: 'Longwood',           county: 'Seminole County', lat: 28.7031, lng: -81.3384, blurb: 'Professional duct cleaning for Longwood homes — improving air quality and HVAC efficiency.' },
  'sanford':           { name: 'Sanford',            county: 'Seminole County', lat: 28.8006, lng: -81.2731, blurb: 'Sanford\'s go-to air duct cleaning specialists. Same-week scheduling available.' },
  'altamonte-springs': { name: 'Altamonte Springs',  county: 'Seminole County', lat: 28.6611, lng: -81.3656, blurb: 'Serving Altamonte Springs with expert air duct and dryer vent cleaning.' },
  'casselberry':       { name: 'Casselberry',        county: 'Seminole County', lat: 28.6678, lng: -81.3245, blurb: 'Clean air starts here — professional duct cleaning for Casselberry residents.' },
  'clermont':          { name: 'Clermont',           county: 'Lake County',     lat: 28.5494, lng: -81.7729, blurb: 'Attica serves Clermont with full-service air quality solutions for your home.' },
  'gotha':             { name: 'Gotha',              county: 'Orange County',   lat: 28.5400, lng: -81.5100, blurb: 'Gotha homeowners trust Attica for thorough, professional air duct cleaning.' },
  'lake-mary':         { name: 'Lake Mary',          county: 'Seminole County', lat: 28.7581, lng: -81.3178, blurb: 'Lake Mary\'s premier air duct cleaning service — certified technicians, 5-star results.' },
  'lake-monroe':       { name: 'Lake Monroe',        county: 'Seminole County', lat: 28.8300, lng: -81.3200, blurb: 'Serving Lake Monroe with professional indoor air quality services.' },
  'maitland':          { name: 'Maitland',           county: 'Orange County',   lat: 28.6278, lng: -81.3631, blurb: 'Maitland homeowners breathe easier with Attica\'s expert cleaning services.' },
  'ocoee':             { name: 'Ocoee',              county: 'Orange County',   lat: 28.5686, lng: -81.5437, blurb: 'Ocoee\'s trusted air duct and dryer vent cleaning professionals.' },
  'oviedo':            { name: 'Oviedo',             county: 'Seminole County', lat: 28.6700, lng: -81.2081, blurb: 'Serving Oviedo families with certified, thorough air duct cleaning.' },
  'winter-park':       { name: 'Winter Park',        county: 'Orange County',   lat: 28.5997, lng: -81.3392, blurb: 'Winter Park\'s top-rated air duct cleaning — serving homes and businesses.' },
  'winter-springs':    { name: 'Winter Springs',     county: 'Seminole County', lat: 28.6989, lng: -81.2706, blurb: 'Professional air quality services for Winter Springs residents.' },
  'windermere':        { name: 'Windermere',         county: 'Orange County',   lat: 28.4986, lng: -81.5354, blurb: 'Windermere homeowners trust Attica for premium air duct cleaning.' },
  'winter-garden':     { name: 'Winter Garden',      county: 'Orange County',   lat: 28.5653, lng: -81.5862, blurb: 'Serving Winter Garden with expert duct, dryer vent, and chimney cleaning.' },
  'belle-isle':        { name: 'Belle Isle',         county: 'Orange County',   lat: 28.4722, lng: -81.3603, blurb: 'Belle Isle residents enjoy cleaner air with Attica\'s professional services.' },
  'deland':            { name: 'Deland',             county: 'Volusia County',  lat: 29.0283, lng: -81.3031, blurb: 'Attica brings expert air duct cleaning to Deland and surrounding Volusia County.' },
  'deltona':           { name: 'Deltona',            county: 'Volusia County',  lat: 28.9006, lng: -81.2637, blurb: 'Serving Deltona homeowners with professional air quality solutions.' },
};

const SERVICES_LIST = [
  'Air Duct Cleaning (Unlimited Vents)',
  'Dryer Vent Cleaning (Up to 7ft)',
  'Chimney Inspection & Cleaning',
  'Attic Insulation',
  'Air Purification Systems',
  'HVAC System Restoration',
  'Condenser Coil Cleaning',
];

function getDirectionsUrl(cityName: string, lat: number, lng: number): string {
  const dest = encodeURIComponent(`${cityName}, FL`);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) return `maps://maps.apple.com/?daddr=${dest}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export default function LocationPage() {
  const params = useParams<{ city: string }>();
  const citySlug = params.city?.toLowerCase() || 'orlando';

  /* AN UNKNOWN SLUG IS A 404, NOT AN INVENTED CITY.
     This used to build a city out of whatever text was in the URL: it
     title-cased the slug, assigned it to Orange County, pinned it to Orlando's
     coordinates and gave it a generic blurb. Combined with the catch-all rewrite
     in firebase.json, which serves index.html for every unmatched path, that
     meant EVERY URL anyone could invent returned 200 with a complete,
     indexable, near-duplicate location page. Verified against production on
     2026-08-22: /locations/totally-made-up-place-xyz returned 200 and rendered a
     full page.

     That is an unbounded surface of near-identical 200s pointing at one
     business, which is the exact shape Google's doorway-page policy is written
     to catch, and the penalty is deindexation of the whole set rather than a
     ranking dip. It also fabricated a false claim: it asserted a LocalBusiness
     serving a place that may not exist.

     Rendering NotFound emits `noindex, follow`, so an invented URL can no longer
     enter the index. The response is still 200 because this is a static SPA on
     Firebase Hosting and the rewrite cannot know which slugs are real, so
     noindex is the correct available control. */
  const city = CITY_DATA[citySlug];
  if (!city) return <NotFound />;

  useScrollAnimation();

  const pageTitle = `Air Duct Cleaning in ${city.name}, FL | Attica Air Duct Cleaners`;
  const pageDescription = `Professional air duct cleaning, dryer vent cleaning & chimney services in ${city.name}, FL. Serving ${city.county}. Call (407) 990-1969 for same-week scheduling.`;
  const pageUrl = `${BASE_URL}/locations/${citySlug}`;

  const locationJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Attica Air Duct Cleaners',
        telephone: '(407) 990-1969',
        url: BASE_URL,
        description: pageDescription,
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: city.lat,
          longitude: city.lng,
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Locations',
            item: `${BASE_URL}/locations`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${city.name}, FL`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`/locations/${citySlug}`}
        jsonLd={locationJsonLd}
      />
      <Header />

      {/* Hero */}
      <section className="pt-20 lg:pt-24 bg-[#0f1923]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} style={{ color: '#4ade80' }} />
              <span className="font-body text-sm font-semibold tracking-widest uppercase" style={{ color: '#4ade80' }}>
                {city.county}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Air Duct Cleaning in {city.name}, FL
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed mb-8">
              {city.blurb} Call <a href="tel:4079901969" className="text-[#4ade80] font-semibold hover:underline">(407) 990-1969</a> to schedule your service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:4079901969" className="btn-primary">
                <Phone size={16} /> Book in {city.name}
              </a>
              <a
                href={getDirectionsUrl(city.name, city.lat, city.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                <MapPin size={16} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left: Map + Info */}
            <div className="lg:col-span-2 space-y-10">

              {/* Map */}
              <div className="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Serving {city.name} &amp; Surrounding Areas
                </h2>
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm" style={{ height: 360 }}>
                  <MapView
                    initialCenter={{ lat: city.lat, lng: city.lng }}
                    initialZoom={12}
                  />
                </div>
              </div>

              {/* Services */}
              <div className="fade-up">
                <div className="section-rule" />
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Services Available in {city.name}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SERVICES_LIST.map((s) => (
                    <div key={s} className="flex items-start gap-3 rounded-xl p-4" style={{ background: '#F7F3EC' }}>
                      <CheckCircle size={17} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0, marginTop: 2 }} />
                      <span className="font-body text-sm text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About section */}
              <div className="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Why {city.name} Homeowners Choose Attica
                </h2>
                <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                  <p>
                    Attica Air Duct Cleaners is Greater Orlando's most trusted air quality company. We serve {city.name} and all of {city.county} with professional, certified technicians who use state-of-the-art Negative Air Pressure Technology to deeply clean your ductwork.
                  </p>
                  <p>
                    Whether you're dealing with allergies, musty odors, poor airflow, or simply want to maintain a healthy home environment, our team delivers thorough results every time — backed by a 100% satisfaction guarantee.
                  </p>
                  <p>
                    We offer same-week scheduling, transparent pricing with no hidden fees, and a current special of just <strong>$97 per A/C unit</strong> for unlimited air duct + dryer vent cleaning.
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="fade-up rounded-2xl p-6 border border-border" style={{ background: '#FAFAF8' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                    <Clock size={18} style={{ color: 'oklch(0.56 0.12 165)' }} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">Business Hours</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 font-body text-sm">
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day) => (
                    <div key={day} className="flex justify-between py-1.5 border-b border-border last:border-0">
                      <span className="text-foreground font-medium">{day}</span>
                      <span className="text-muted-foreground">8 AM – 9 PM</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  What Customers Near {city.name} Say
                </h2>
                <div className="space-y-4">
                  {[
                    { name: 'Joenas Brauers', text: 'I was so impressed with the professionalism. They went above and beyond to explain everything and did an outstanding job.' },
                    { name: 'Lari French', text: 'Showed up promptly, explained the process thoroughly, and conducted the job quickly and efficiently. Highly recommend!' },
                  ].map((r) => (
                    <div key={r.name} className="rounded-2xl p-6 border border-border" style={{ background: '#FAFAF8' }}>
                      <div className="flex items-center gap-0.5 mb-3">
                        {[1,2,3,4,5].map(s => <Star key={s} size={13} className="text-yellow-400 fill-yellow-400" />)}
                      </div>
                      <p className="font-body text-sm text-muted-foreground italic mb-3">"{r.text}"</p>
                      <div className="font-body text-sm font-semibold text-foreground">{r.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl p-8" style={{ background: '#0f1923' }}>
                <LeadCaptureForm
                  dark={true}
                  title={`Book in ${city.name}`}
                  subtitle="Get a free quote — we respond within 24 hours."
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

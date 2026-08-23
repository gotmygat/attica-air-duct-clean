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
import { locations } from '@/data/locations';
import { SERVICES, coreFaqs } from '@/data/locationCore';

const BASE_URL = 'https://www.atticacleaners.com';

function getDirectionsUrl(cityName: string, lat: number, lng: number): string {
  const dest = encodeURIComponent(`${cityName}, FL`);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) return `maps://maps.apple.com/?daddr=${dest}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export default function LocationPage() {
  const params = useParams<{ city: string }>();
  const citySlug = params.city?.toLowerCase() || 'orlando';

  /* Called BEFORE the early return below. React requires every hook to run on
     every render of a component, and the unknown-slug guard is a conditional
     return, so a hook placed after it would be skipped on 404 renders and throw
     "rendered fewer hooks than expected" the moment a visitor moved from a real
     city page to a bad URL. */
  useScrollAnimation();

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
  /* ./locations.ts is the source of truth for everything a reader sees. */
  const loc = locations.find((l) => l.slug === citySlug);
  if (!loc) return <NotFound />;
  const city = { name: loc.name, county: loc.county, lat: loc.lat, lng: loc.lng };
  const faqs = [...loc.faqs, ...coreFaqs(loc.name)];

  const pageTitle = loc.seoTitle;
  const pageDescription = loc.description;
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
        /* ONE BUSINESS, ONE ADDRESS. This set addressLocality to the page's
           city and pinned `geo` to that city's coordinates, so the 20 location
           pages asserted 20 different addresses for one company and contradicted
           the home page, which correctly says Orlando. A business address is a
           factual claim, and `geo` is trusted OVER the postal address when the
           two disagree, so this was teaching search engines a false NAP for a
           company with one base. Orlando is the address; the city is what is
           SERVED, which is what areaServed is for. */
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Orlando',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: city.county,
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
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
              {loc.h1}
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed mb-8">
              {loc.intro} Call <a href="tel:4079901969" className="text-[#4ade80] font-semibold hover:underline">(407) 990-1969</a> to schedule your service today.
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
                {/* The services page, tailored to this city. This was a flat list
                    of seven identical strings repeated on all 20 pages, so it told
                    a reader in Deltona exactly what it told one in Windermere. Each
                    service now carries the city name, a line about what that service
                    means HERE, and a link to the service page itself. Where the
                    city record has a specific angle for a service it wins; the
                    tailored default in locationCore.ts is the floor. */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICES.map((svc) => {
                    const angle = loc.serviceAngles.find((a) => a.service === svc.slug)?.angle;
                    return (
                      <a
                        key={svc.slug}
                        href={`/${svc.slug}`}
                        className="block rounded-xl p-4 no-underline"
                        style={{ background: '#F7F3EC' }}
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle size={17} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0, marginTop: 3 }} />
                          <div>
                            <h3 className="font-display font-bold text-base text-foreground mb-1">
                              {svc.name} in {city.name}
                            </h3>
                            <p className="font-body text-sm text-muted-foreground leading-relaxed">
                              {angle ?? svc.blurb(city.name)}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* About section */}
              <div className="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  What makes {city.name} different
                </h2>
                {/* The city's own content, not a template. The two paragraphs that
                    were here read identically on all 20 pages with only the city and
                    county names swapped, which is the shape that gets a location set
                    deindexed. `why` is written per city against its real housing
                    stock, age, soil, tree cover and how the systems there actually
                    get used. The offer paragraph below is untouched: that is the
                    client's own published pricing and guarantee, not mine to edit. */}
                <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                  {loc.why.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
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

              {/* FAQ, at the bottom of every location page.
                  Two sets, rendered as one list. The first come from this city's
                  own record and differ page to page because the housing stock
                  genuinely differs. The last six are identical on every location
                  with the city name substituted, which is deliberate: a reader
                  comparing two cities should find the same practical answers in
                  the same place. Both sets are in the FAQPage schema above,
                  because both are really on the page. */}
              <div className="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {city.name} questions
                </h2>
                <dl className="space-y-4">
                  {faqs.map((f) => (
                    <div
                      key={f.q}
                      className="rounded-2xl p-6 border border-border"
                      style={{ background: '#FAFAF8' }}
                    >
                      <dt className="font-display font-bold text-base text-foreground mb-2">
                        {f.q}
                      </dt>
                      <dd className="font-body text-sm text-muted-foreground leading-relaxed m-0">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
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

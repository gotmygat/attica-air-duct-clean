/**
 * ATTICA CLEANERS — SEO Component
 * Sets document title, meta description, canonical URL,
 * Open Graph tags, and JSON-LD structured data for every page.
 */
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
  /** When true, tells search engines not to index this page (e.g. thank-you, 404). */
  noindex?: boolean;
}

const BASE_URL = 'https://www.atticacleaners.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/attica-logo.png`;
const BUSINESS_NAME = 'Attica Air Duct Cleaners';
const PHONE = '(407) 990-1969';

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(data: object) {
  let el = document.querySelector('script[data-attica-jsonld]') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-attica-jsonld', 'true');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Default LocalBusiness JSON-LD for the whole site
const LOCAL_BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS_NAME,
  telephone: PHONE,
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  description:
    'At Attica Air Duct Cleaners, we\'re committed to creating energy-efficient and healthier homes. Serving Greater Orlando, FL.',
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
    'Orlando', 'Casselberry', 'Winter Park', 'Altamonte Springs',
    'Apopka', 'Oviedo', 'Sanford', 'Lake Mary', 'Longwood',
    'Maitland', 'Winter Garden', 'Windermere', 'Ocoee',
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '15:00' },
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61569575870635',
    'https://www.instagram.com/atticacleaners/',
  ],
};

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(BUSINESS_NAME)
      ? title
      : `${title} | ${BUSINESS_NAME}`;
    const ogImage = image || DEFAULT_IMAGE;
    const canonicalUrl = canonical
      ? `${BASE_URL}${canonical}`
      : `${BASE_URL}${window.location.pathname}`;

    // Title
    document.title = fullTitle;

    // Standard meta
    setMeta('description', description);
    setMeta('keywords', 'air duct cleaning Orlando, dryer vent cleaning, chimney inspection, attic insulation, HVAC cleaning, air duct cleaning near me, duct cleaning Orlando, Attica cleaners, air purification, vent cleaning Florida, solar attic fan, condenser coil cleaning');
    setMeta('robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('author', BUSINESS_NAME);

    // Canonical
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('og:type', type, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:alt', fullTitle, true);
    setMeta('og:site_name', BUSINESS_NAME, true);
    setMeta('og:locale', 'en_US', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // JSON-LD
    setJsonLd(jsonLd || LOCAL_BUSINESS_JSONLD);
  }, [title, description, canonical, image, type, jsonLd, noindex]);

  return null;
}

export { LOCAL_BUSINESS_JSONLD };

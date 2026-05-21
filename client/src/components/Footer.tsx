/**
 * ATTICA CLEANERS — Footer Component
 * Design: Clean Air Luxury — deep charcoal background, editorial layout
 * Uses real Attica logo
 */

import { Link } from 'wouter';
import { Phone, Mail, Facebook, Instagram, MapPin } from 'lucide-react';

const LOGO_URL = '/assets/attica-logo.png';

const SERVICES_FOOTER = [
  { label: 'Air Duct Cleaning', href: '/air-duct-cleaning' },
  { label: 'Dryer Vent Cleaning', href: '/dryer-vent-cleaning' },
  { label: 'Chimney Cleaning', href: '/chimney-cleaning' },
  { label: 'Attic Insulation', href: '/attic-insulation' },
  { label: 'Air Purification', href: '/air-purification' },
  { label: 'Condenser Coil Cleaning', href: '/condenser-coil-cleaning' },
  { label: 'Solar Attic Fan', href: '/solar-attic-fan' },
  { label: 'Attic Removal', href: '/attic-removal' },
];

const ALL_LOCATIONS = [
  'Altamonte Springs','Apopka','Belle Isle','Casselberry','Clermont',
  'Deland','Deltona','Gotha','Lake Mary','Lake Monroe',
  'Longwood','Maitland','Ocoee','Orlando','Oviedo',
  'Sanford','Windermere','Winter Garden','Winter Park','Winter Springs',
];

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: 'rgba(255,255,255,0.75)' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src={LOGO_URL}
                alt="Attica Air Duct Cleaners"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Orlando's #1 rated air duct cleaning company. Serving Greater Orlando with certified expertise and advanced Negative Air Pressure Technology.
            </p>
            <div className="space-y-3">
              <a href="tel:4079901969" className="flex items-center gap-2 text-sm font-body transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <Phone size={14} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0 }} />
                (407) 990-1969
              </a>
              <a href="mailto:atticacleaners1@gmail.com" className="flex items-center gap-2 text-sm font-body transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <Mail size={14} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0 }} />
                atticacleaners1@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm font-body" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <MapPin size={14} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0, marginTop: 2 }} />
                Greater Orlando, FL
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61569575870635" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                aria-label="Facebook"
                onMouseEnter={e => (e.currentTarget.style.background = 'oklch(0.56 0.12 165)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                <Facebook size={15} />
              </a>
              <a href="https://www.instagram.com/atticacleaners/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                aria-label="Instagram"
                onMouseEnter={e => (e.currentTarget.style.background = 'oklch(0.56 0.12 165)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES_FOOTER.map((s) => (
                <li key={s.href + s.label}>
                  <Link href={s.href}
                    className="font-body text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-semibold text-white text-lg mb-6">Service Areas</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {ALL_LOCATIONS.map((city) => (
                <Link
                  key={city}
                  href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-body text-sm transition-colors py-0.5 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            &copy; {new Date().getFullYear()} Attica Air Duct Cleaners LLC. All rights reserved.
            {' '}Site built by{' '}
            <a
              href="https://renderanalytics.net"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white underline underline-offset-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Render Analytics
            </a>
            .
          </p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="font-body text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>Blog</Link>
            <Link href="/referral-club" className="font-body text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>Referral Club</Link>
            <Link href="/services" className="font-body text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>Services</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * ATTICA CLEANERS — Header Component
 * Uses real Attica logo from /manus-storage/attica-logo_a9afdc85.png
 * Transparent-to-white scroll behavior on homepage
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const LOGO_URL = '/assets/attica-logo.png';

const SERVICES = [
  { label: 'Air Duct Cleaning', href: '/air-duct-cleaning' },
  { label: 'Dryer Vent Cleaning', href: '/dryer-vent-cleaning' },
  { label: 'Chimney Cleaning', href: '/chimney-cleaning' },
  { label: 'Attic Insulation', href: '/attic-insulation' },
  { label: 'Air Purification', href: '/air-purification' },
  { label: 'HVAC System Restoration', href: '/hvac-restoration' },
  { label: 'Condenser Coil Cleaning', href: '/condenser-coil-cleaning' },
  { label: 'Solar Attic Fan', href: '/solar-attic-fan' },
  { label: 'Attic Removal', href: '/attic-removal' },
];

const LOCATIONS = [
  { label: 'Orlando', href: '/locations/orlando' },
  { label: 'Apopka', href: '/locations/apopka' },
  { label: 'Longwood', href: '/locations/longwood' },
  { label: 'Sanford', href: '/locations/sanford' },
  { label: 'Altamonte Springs', href: '/locations/altamonte-springs' },
  { label: 'Casselberry', href: '/locations/casselberry' },
  { label: 'Clermont', href: '/locations/clermont' },
  { label: 'Gotha', href: '/locations/gotha' },
  { label: 'Lake Mary', href: '/locations/lake-mary' },
  { label: 'Lake Monroe', href: '/locations/lake-monroe' },
  { label: 'Maitland', href: '/locations/maitland' },
  { label: 'Ocoee', href: '/locations/ocoee' },
  { label: 'Oviedo', href: '/locations/oviedo' },
  { label: 'Winter Park', href: '/locations/winter-park' },
  { label: 'Winter Springs', href: '/locations/winter-springs' },
  { label: 'Windermere', href: '/locations/windermere' },
  { label: 'Winter Garden', href: '/locations/winter-garden' },
  { label: 'Belle Isle', href: '/locations/belle-isle' },
  { label: 'Deland', href: '/locations/deland' },
  { label: 'Deltona', href: '/locations/deltona' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const solidBg = isHome ? scrolled : true;
  const headerBg = solidBg
    ? 'bg-white/97 backdrop-blur-md shadow-sm'
    : 'bg-transparent';
  const textColor = !solidBg ? 'text-white' : 'text-foreground';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="Attica Air Duct Cleaners"
                className={`h-10 lg:h-12 w-auto object-contain transition-all duration-300 ${!solidBg ? 'brightness-0 invert' : ''}`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link href="/" className={`nav-link ${textColor}`}>Home</Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className={`nav-link flex items-center gap-1 ${textColor}`}>
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`dropdown-menu ${servicesOpen ? 'opacity-100' : ''}`}>
                  {SERVICES.map((s) => (
                    <Link key={s.href + s.label} href={s.href}
                      className="block px-4 py-2.5 text-sm font-body text-foreground hover:bg-[oklch(0.93_0.04_165)] hover:text-[oklch(0.45_0.12_165)] transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Locations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLocationsOpen(true)}
                onMouseLeave={() => setLocationsOpen(false)}
              >
                <button className={`nav-link flex items-center gap-1 ${textColor}`}>
                  Locations
                  <ChevronDown size={14} className={`transition-transform duration-200 ${locationsOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`dropdown-menu w-60 ${locationsOpen ? 'opacity-100' : ''}`} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div className="grid grid-cols-2">
                    {LOCATIONS.map((l) => (
                      <Link key={l.href} href={l.href}
                        className="block px-3 py-2 text-sm font-body text-foreground hover:bg-[oklch(0.93_0.04_165)] hover:text-[oklch(0.45_0.12_165)] transition-colors">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/referral-club" className={`nav-link ${textColor}`}>Referral Club</Link>
              <Link href="/blog" className={`nav-link ${textColor}`}>Blog</Link>
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:4079901969"
                className={`flex items-center gap-2 font-body font-semibold text-sm whitespace-nowrap transition-colors duration-300 ${!solidBg ? 'text-white hover:text-[#4ade80]' : 'text-foreground hover:text-[oklch(0.56_0.12_165)]'}`}>
                <Phone size={15} />
                (407) 990-1969
              </a>
              <a href="tel:4079901969" className="btn-primary text-xs px-5 py-2.5">Book Now</a>
            </div>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${textColor}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b">
            <img src={LOGO_URL} alt="Attica Air Duct Cleaners" className="h-10 w-auto" />
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-muted"><X size={20} /></button>
          </div>
          <nav className="p-5 space-y-1">
            <Link href="/" className="block py-3 px-3 rounded-lg font-body font-medium hover:bg-muted transition-colors">Home</Link>
            <div>
              <button className="w-full flex items-center justify-between py-3 px-3 rounded-lg font-body font-medium hover:bg-muted transition-colors"
                onClick={() => setServicesOpen(!servicesOpen)}>
                Services <ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {SERVICES.map((s) => (
                    <Link key={s.href + s.label} href={s.href}
                      className="block py-2 px-3 text-sm text-muted-foreground hover:text-[oklch(0.56_0.12_165)] rounded-lg hover:bg-muted transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button className="w-full flex items-center justify-between py-3 px-3 rounded-lg font-body font-medium hover:bg-muted transition-colors"
                onClick={() => setLocationsOpen(!locationsOpen)}>
                Locations <ChevronDown size={16} className={`transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {locationsOpen && (
                <div className="ml-4 mt-1 grid grid-cols-2 gap-1">
                  {LOCATIONS.map((l) => (
                    <Link key={l.href} href={l.href}
                      className="block py-2 px-3 text-sm text-muted-foreground hover:text-[oklch(0.56_0.12_165)] rounded-lg hover:bg-muted transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/referral-club" className="block py-3 px-3 rounded-lg font-body font-medium hover:bg-muted transition-colors">Referral Club</Link>
            <Link href="/blog" className="block py-3 px-3 rounded-lg font-body font-medium hover:bg-muted transition-colors">Blog</Link>
          </nav>
          <div className="p-5 border-t space-y-3">
            <a href="tel:4079901969" className="btn-primary w-full justify-center">
              <Phone size={16} /> Call (407) 990-1969
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky call bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden" style={{ background: 'oklch(0.56 0.12 165)' }}>
        <a href="tel:4079901969" className="flex items-center justify-center gap-2 py-3.5 font-body font-semibold text-sm tracking-wide text-white">
          <Phone size={16} /> Call Now: (407) 990-1969
        </a>
      </div>
    </>
  );
}

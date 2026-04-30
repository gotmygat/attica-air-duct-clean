/**
 * ATTICA CLEANERS — Services Overview Page
 */
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AIR_DUCT_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg/attica-air-duct-DyuTQXMLptwvdGKyf8Unbg.webp';
const DRYER_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg/attica-dryer-vent-HUUTnvW6cjAqwvmfjdrvne.webp';
const CHIMNEY_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg/attica-chimney-hrnWhwvtf4mH9hSE3C3YLp.webp';
const INSULATION_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg/attica-insulation-9E3gQuVCTRRtKuUcVBFgKb.webp';
const WHY_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg/attica-why-choose-9SbmvXVHyTPbvvzQi2k7ge.webp';

const SERVICES = [
  { title: 'Air Duct Cleaning', href: '/air-duct-cleaning', img: AIR_DUCT_IMG, desc: 'Air duct cleaning in our work place is equally important as in our homes. Scheduled comprehensive duct cleaning for work place will increase airflow, limit allergens and contaminants in the air and help save you money.' },
  { title: 'Dryer Vent Cleaning', href: '/dryer-vent-cleaning', img: DRYER_IMG, desc: 'We aim to protect our valued customers from any sort of fire or malfunctioning hazard caused by dryer vent obstructions. So, we provide up-to-the-mark dryer vent cleaning services at competitive rates. Hire us!' },
  { title: 'Chimney Cleaning', href: '/chimney-cleaning', img: CHIMNEY_IMG, desc: 'Chimney sweeps service install, clean, and maintain chimney systems, evaluate their performance, prescribe changes to improve their performance, and educate the users about their safe and efficient operation.' },
  { title: 'Attic Insulation', href: '/attic-insulation', img: INSULATION_IMG, desc: 'Attica Air Duct Cleaners optimize your home\'s energy with professional attic blow-in insulation services. Improve efficiency, enjoy year-round comfort, and save on energy bills with this cost-effective solution tailored for your home.' },
  { title: 'Air Purification System', href: '/air-purification', img: WHY_IMG, desc: 'Our essential services include Air Purification Systems which bring clean air into your home from the environment. If you want to install the air purification system at your home or office, let us know or book an appointment now.' },
  { title: 'HVAC System Restoration', href: '/services', img: WHY_IMG, desc: 'Restore performance, improve overall air quality, and extend the lifespan of your HVAC unit. Our comprehensive restoration service addresses every component of your system.' },
  { title: 'Condenser Coil Cleaning', href: '/services', img: AIR_DUCT_IMG, desc: 'Improve efficiency, reduce energy consumption, and keep your system running smoothly. Clean condenser coils are essential for optimal HVAC performance.' },
];

export default function Services() {
  useScrollAnimation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <img src={WHY_IMG} alt="Air Duct Cleaning Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="font-body text-primary text-sm font-semibold tracking-widest uppercase mb-2">What We Offer</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Air Duct Cleaning Services</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="section-rule" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">What We Offer</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-12">
                Attica Air Duct Cleaners mission is to deliver pure, clean air through every air-driven appliance in your space, enhancing indoor air quality and creating healthier, more comfortable environments. Our services provide comprehensive solutions tailored to meet your unique needs whether it's routine maintenance, specialized treatments, or expert guidance, we're here to help. Every service we offer reflects our commitment to quality, reliability, and customer satisfaction. With a focus on excellence and attention to detail, we aim to exceed expectations and deliver results you can trust at every step.
              </p>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Professional Air Duct Cleaning for a Healthier Home</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-12">
                Breathe easier with our expert air duct cleaning services. We remove dust, allergens, and contaminants to improve air quality and enhance the efficiency of your HVAC system, creating a fresher, healthier environment for you and your family.
              </p>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">Services We Provide</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {SERVICES.map((s, i) => (
                  <div key={s.title} className="card-service fade-up" style={{ transitionDelay: `${i * 60}ms` }}>
                    <div className="h-40 overflow-hidden">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
                      <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed">{s.desc}</p>
                      <Link href={s.href} className="inline-flex items-center gap-1 font-body text-xs font-semibold text-primary hover:gap-2 transition-all">
                        More Details <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#111111] rounded-3xl p-8">
                <LeadCaptureForm dark={true} title="Get a Free Quote" subtitle="We'll respond within 24 hours." />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

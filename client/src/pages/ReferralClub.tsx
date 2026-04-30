/**
 * ATTICA CLEANERS — Referral Club Page
 * Design: Clean Air Luxury — light editorial layout
 */

import { Gift, Users, DollarSign, Star, CheckCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80';

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Users,
    title: 'Refer a Friend or Neighbor',
    desc: 'Tell your friends, family, or neighbors about Attica Air Duct Cleaners. Share our number or have them mention your name when they call.',
  },
  {
    step: '02',
    icon: CheckCircle,
    title: 'They Book a Service',
    desc: 'Your referral books and completes any of our cleaning services — air duct, dryer vent, chimney, or attic insulation.',
  },
  {
    step: '03',
    icon: Gift,
    title: 'You Both Get Rewarded',
    desc: 'Once their service is complete, you receive your referral reward. It\'s that simple — no complicated forms or waiting periods.',
  },
];

const BENEFITS = [
  'Earn rewards for every successful referral',
  'No limit on how many people you can refer',
  'Your referrals get great service at a great price',
  'Rewards paid promptly after service completion',
  'Works for all Attica services',
  'Easy — just share our phone number',
];

export default function ReferralClub() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Attica Referral Club" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="font-body text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#4ade80' }}>Earn Rewards</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Referral Club</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="section-rule" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Share the Gift of Clean Air — and Get Rewarded
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                At Attica Air Duct Cleaners, we believe our best advertising comes from happy customers. That's why we created our Referral Club — a simple way to reward you for spreading the word about our services to the people you care about.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-10">
                When you refer a friend, family member, or neighbor to Attica and they complete a service, you earn a reward. There's no limit to how many people you can refer, and the process couldn't be simpler. Just share our number and have them mention your name.
              </p>

              {/* How It Works */}
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">How It Works</h2>
              <div className="space-y-8 mb-12">
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={step.step} className="flex gap-5 fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
                        <step.icon size={24} style={{ color: 'oklch(0.56 0.12 165)' }} />
                      </div>
                    </div>
                    <div>
                      <div className="font-body text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'oklch(0.56 0.12 165)' }}>
                        Step {step.step}
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Referral Club Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-3 rounded-xl p-4" style={{ background: '#F7F3EC' }}>
                    <CheckCircle size={17} style={{ color: 'oklch(0.56 0.12 165)', flexShrink: 0, marginTop: 2 }} />
                    <span className="font-body text-sm text-foreground">{b}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-8 fade-up" style={{ background: 'oklch(0.93 0.04 165)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.56 0.12 165)' }}>
                    <DollarSign size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Ready to Start Referring?</h3>
                    <p className="font-body text-sm text-muted-foreground mb-4">
                      Call us or send a message to get enrolled in the Referral Club. It's free, it's easy, and it pays.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="tel:4079901969" className="btn-primary">
                        <Phone size={16} /> Call (407) 990-1969
                      </a>
                      <a href="tel:4079901969" className="btn-outline">
                        Text Us to Enroll
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl p-8" style={{ background: '#0f1923' }}>
                <div className="flex items-center gap-2 mb-6">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-body text-sm text-white/70">Join hundreds of happy referrers</span>
                </div>
                <LeadCaptureForm
                  dark={true}
                  title="Join the Referral Club"
                  subtitle="Fill out the form and we'll get you enrolled."
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

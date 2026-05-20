import { CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';

export default function ThankYou() {
  return (
    <>
      <Header />
      {/* Full-page blurred background overlay */}
      <div className="fixed inset-0 z-0 bg-[#0d1f17]/90 backdrop-blur-sm" />

      {/* Modal card centered on screen */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-[#1a1a1a] rounded-2xl shadow-2xl p-10 text-center">

          {/* Green checkmark icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[oklch(0.56_0.12_165)]/15 flex items-center justify-center">
              <CheckCircle size={44} className="text-[oklch(0.56_0.12_165)]" strokeWidth={1.8} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Thank You!
          </h1>

          {/* Message */}
          <p className="font-body text-base text-white/70 leading-relaxed mb-8">
            We've received your request and will contact you within 24 hours.<br />
            For immediate assistance, call{' '}
            <a
              href="tel:4079901969"
              className="text-[oklch(0.56_0.12_165)] font-semibold hover:underline"
            >
              (407) 990-1969
            </a>
            .
          </p>

          {/* Back to home button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-8 py-3 rounded-full bg-[oklch(0.56_0.12_165)] text-white hover:bg-[oklch(0.50_0.12_165)] transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

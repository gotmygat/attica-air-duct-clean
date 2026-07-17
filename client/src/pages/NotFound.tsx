import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Attica Air Duct Cleaners."
        noindex
      />
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="font-display text-8xl font-bold mb-4" style={{ color: 'oklch(0.56 0.12 165)' }}>404</div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="font-body text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back to breathing clean air.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="btn-primary">Go Home</Link>
          <a href="tel:4079901969" className="btn-outline">Call Us</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

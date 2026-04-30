/**
 * ATTICA CLEANERS — Blog Page
 * Design: Clean Air Luxury — light editorial layout
 * Contains all 3 real blog posts from atticacleaners.com
 */

import { useState } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CF_BASE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663613975068/BiTB8y9REArww3W4NQLbDg';
const BLOG_HERO = `${CF_BASE}/attica-air-duct-DyuTQXMLptwvdGKyf8Unbg.webp`;
const IMG1 = `${CF_BASE}/attica-why-choose-9SbmvXVHyTPbvvzQi2k7ge.webp`;
const IMG2 = `${CF_BASE}/attica-air-duct-DyuTQXMLptwvdGKyf8Unbg.webp`;
const IMG3 = `${CF_BASE}/attica-dryer-vent-HUUTnvW6cjAqwvmfjdrvne.webp`;

const POSTS = [
  {
    id: 'cost',
    title: 'How Much Does It Typically Cost to Have Air Ducts Cleaned?',
    date: 'April 2026',
    readTime: '4 min read',
    category: 'Pricing & Value',
    img: IMG1,
    excerpt: 'Most homeowners are unaware that dust, allergens, pet dander, and even mold can accumulate inside their air ducts, circulating through the air they breathe every day.',
    content: [
      {
        heading: null,
        text: 'When was the last time you had your air ducts cleaned? Most homeowners are unaware that dust, allergens, pet dander, and even mold can accumulate inside their air ducts, circulating through the air they breathe every day.',
      },
      {
        heading: null,
        text: 'At Attica Air Duct Cleaners, we believe a clean home starts with clean air. Our professional team utilizes advanced negative air pressure machines to remove dirt and debris from deep inside your ductwork, leaving your home fresher and your family breathing easier.',
      },
      {
        heading: 'Does Cleaning Air Ducts Really Make a Difference?',
        text: 'The benefits of cleaning air ducts are evident in improved system performance and increased efficiency. Beyond health concerns, recirculating contaminants can compromise the performance of your HVAC system. Dust and debris can clog filters, restrict airflow, and cause the system to work harder than necessary — driving up your energy bills.',
      },
      {
        heading: 'What Does Air Duct Cleaning Cost?',
        text: 'Air duct cleaning costs vary based on the size of your home, the number of vents, and the condition of your ductwork. At Attica, we offer a straightforward $97 special that includes unlimited vents, maintenance cleaning, coil condition check, air flow inspection, and duct condition inspection — all per A/C unit. No hidden fees, no surprises.',
      },
      {
        heading: 'When Should You Schedule a Cleaning?',
        text: 'We recommend scheduling air duct cleaning every 3–5 years for most homes, or more frequently if you have pets, allergies, asthma, or have recently completed renovations. If you notice musty odors, visible dust around vents, or increased allergy symptoms indoors, it\'s time to call.',
      },
    ],
  },
  {
    id: 'near-me',
    title: "Air Duct Cleaning Near Me? Here's What You Need to Know (And Why Attica Is Your Best Choice)",
    date: 'March 2026',
    readTime: '5 min read',
    category: 'Indoor Air Quality',
    img: IMG2,
    excerpt: "When homeowners search for \"air duct cleaning near me\", it usually means one of three things: the air inside feels dusty, allergies are getting worse, or the AC isn't cooling as well as it used to.",
    content: [
      {
        heading: null,
        text: 'When homeowners search for "air duct cleaning near me", it usually means one of three things: The air inside the home feels dusty or heavy. Allergies or breathing issues are getting worse. The AC isn\'t cooling as well as it used to, and energy bills continue to climb.',
      },
      {
        heading: 'Not All Duct Cleaning Companies Are Equal',
        text: 'Finding the right local company is the key. Not all duct cleaning services use the same equipment or follow the same standards. Some companies use low-powered vacuums that only clean the surface of your ducts, leaving deeper contamination behind. Attica uses professional-grade negative air pressure technology that creates a powerful suction effect, drawing contaminants out from deep within your duct system.',
      },
      {
        heading: 'What to Look for in a Local Air Duct Cleaner',
        text: 'When evaluating local companies, look for transparent pricing with no per-vent charges, certified technicians with verifiable experience, real customer reviews on Google, and a satisfaction guarantee. Attica checks every one of these boxes — and we serve 20+ cities across Greater Orlando.',
      },
      {
        heading: 'Why Attica Is Greater Orlando\'s Best Choice',
        text: 'Our team brings years of specialized experience, state-of-the-art equipment, and a genuine commitment to your family\'s health. We\'re locally owned, background-checked, and proud of our 5-star reputation. When you search for air duct cleaning near you in the Orlando area, Attica is the answer.',
      },
    ],
  },
  {
    id: 'seasonal',
    title: 'How Often Should You Clean Your Air Ducts? A Seasonal Guide',
    date: 'February 2026',
    readTime: '6 min read',
    category: 'Maintenance Tips',
    img: IMG3,
    excerpt: 'Regular air duct cleaning is essential for maintaining a clean and healthy home environment — but how often should it be done? A seasonal approach can help keep your ducts in top condition year-round.',
    content: [
      {
        heading: null,
        text: 'Regular air duct cleaning is essential for maintaining a clean and healthy home environment, but how often should it be done? While the frequency depends on various factors, a seasonal approach can help keep your air ducts in top condition year-round.',
      },
      {
        heading: 'Winter: Preparing for Increased Indoor Activity',
        text: 'During the colder months, people tend to spend more time indoors, which means indoor air quality becomes even more crucial. Dust, pet dander, and other contaminants often accumulate when windows and doors are closed. Cleaning air ducts at the start of winter ensures that your HVAC system isn\'t circulating accumulated dust and allergens. If you haven\'t had a professional cleaning within the past year, winter is a great time to consider it — especially before heavy heating use.',
      },
      {
        heading: 'Spring: Combating Allergy Season',
        text: 'Spring brings warmer weather, but it also introduces a significant amount of pollen and allergens into the air. These can easily make their way into your home and settle in your air ducts. A spring air duct cleaning can help minimize allergens in your indoor air, creating a more comfortable space for allergy sufferers. Consider a full cleaning at the beginning of spring to reduce pollen and outdoor allergens from circulating indoors.',
      },
      {
        heading: 'Summer: Maintaining Efficiency in Peak Cooling Season',
        text: 'In summer, HVAC systems are often running at full capacity to keep homes cool. Dust and debris buildup in air ducts can make your system work harder, leading to decreased efficiency and higher energy costs. A mid-summer check and cleaning helps keep your air ducts free of obstructions, allowing for better airflow and more efficient cooling.',
      },
      {
        heading: 'Fall: Getting Ready for Heating Season',
        text: 'As temperatures drop in fall, you\'ll likely switch from cooling to heating. A fall cleaning helps prevent summer dust and debris from entering your indoor air when the heating system is first turned on. Schedule a cleaning in early fall to remove any dust and pollen accumulated during summer.',
      },
      {
        heading: 'Additional Factors to Consider',
        text: 'Pets that shed, household members with allergies or asthma, and recent home renovations all increase the frequency with which you should clean your air ducts. After a renovation especially, a thorough air duct cleaning is highly recommended to remove construction dust and debris.',
      },
    ],
  },
];

function BlogCard({ post, onClick }: { post: typeof POSTS[0]; onClick: () => void }) {
  return (
    <div
      className="card-service group cursor-pointer fade-up"
      onClick={onClick}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-3 left-3 text-white text-xs font-body font-semibold px-3 py-1 rounded-full" style={{ background: 'oklch(0.56 0.12 165)' }}>
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-foreground mb-3 leading-snug">{post.title}</h3>
        <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
        <button className="inline-flex items-center gap-1.5 font-body text-sm font-semibold group-hover:gap-3 transition-all duration-200" style={{ color: 'oklch(0.56 0.12 165)' }}>
          Read More <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function BlogPost({ post, onBack }: { post: typeof POSTS[0]; onBack: () => void }) {
  return (
    <div>
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center text-white text-xs font-body font-semibold px-3 py-1 rounded-full mb-3" style={{ background: 'oklch(0.56 0.12 165)' }}>
            {post.category}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">{post.title}</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 font-body text-xs text-white/70"><Calendar size={12} /> {post.date}</span>
            <span className="flex items-center gap-1.5 font-body text-xs text-white/70"><Clock size={12} /> {post.readTime}</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 font-body text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          ← Back to All Posts
        </button>
        <div className="prose-attica space-y-6">
          {post.content.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">{block.heading}</h2>
              )}
              <p className="font-body text-base text-muted-foreground leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: 'oklch(0.93 0.04 165)' }}>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Ready to Breathe Cleaner Air?</h3>
          <p className="font-body text-sm text-muted-foreground mb-4">Book our $97 Air Duct &amp; Dryer Vent Cleaning Special today.</p>
          <a href="tel:4079901969" className="btn-primary">Call (407) 990-1969</a>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  useScrollAnimation();
  const [activePost, setActivePost] = useState<typeof POSTS[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {activePost ? (
        <div className="pt-16 lg:pt-20">
          <BlogPost post={activePost} onBack={() => setActivePost(null)} />
        </div>
      ) : (
        <>
          {/* Hero */}
          <section className="relative h-64 sm:h-80 flex items-end overflow-hidden">
            <img src={BLOG_HERO} alt="Attica Cleaners Blog" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <p className="font-body text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#4ade80' }}>Knowledge Base</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Your Guide to Clean Air</h1>
            </div>
          </section>

          {/* Blog Grid */}
          <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 fade-up">
                <div className="section-rule mx-auto" />
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Blogs</h2>
                <p className="font-body text-muted-foreground max-w-xl mx-auto">
                  Expert insights on air quality, HVAC maintenance, and creating a healthier home environment.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {POSTS.map((post, i) => (
                  <div key={post.id} style={{ transitionDelay: `${i * 100}ms` }}>
                    <BlogCard post={post} onClick={() => setActivePost(post)} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}

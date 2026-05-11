import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/service-air-duct-real.webp';

export default function AirDuctCleaning() {
  return (
    <ServicePageLayout
      title="Air Duct Cleaning"
      subtitle="Indoor Air Quality"
      heroImage={IMG}
      heroImageAlt="Attica Air Duct Cleaners technician performing professional air duct cleaning in an Orlando home"
      metaTitle="Air Duct Cleaning in Orlando, FL | Attica Air Duct Cleaners"
      metaDescription="Professional air duct cleaning in Orlando, FL. Remove dust, allergens, mold & pet dander with Negative Air Pressure Technology. Unlimited vents. Call (407) 990-1969."
      canonical="/air-duct-cleaning"
      description="Air duct cleaning in our work place is equally important as in our homes. Scheduled comprehensive duct cleaning for work place will increase airflow, limit allergens and contaminants in the air and help save you money. Breathe easier with our expert air duct cleaning services. We remove dust, allergens, and contaminants to improve air quality and enhance the efficiency of your HVAC system, creating a fresher, healthier environment for you and your family."
      benefits={[
        'Unlimited Vents Included',
        'Negative Air Pressure Technology',
        'Removes Dust & Allergens',
        'Reduces Asthma & Allergy Symptoms',
        'Eliminates Musty Odors',
        'Improves HVAC Efficiency',
        'Pet Dander Removal',
        'Mold Prevention',
      ]}
      details={[
        {
          heading: 'Why Air Duct Cleaning Matters',
          text: 'Over time, your air ducts accumulate dust, debris, pet dander, mold spores, and other contaminants. Every time your HVAC system runs, these particles circulate throughout your home, affecting the air your family breathes. Regular air duct cleaning removes these pollutants at the source, dramatically improving your indoor air quality.',
        },
        {
          heading: 'Our Negative Air Pressure Process',
          text: 'We use state-of-the-art negative air pressure technology to create a powerful vacuum effect inside your ductwork. This draws out all contaminants — including those deep in the system — and captures them in our HEPA-filtered collection unit. The result is a thoroughly cleaned duct system that delivers genuinely fresh air.',
        },
        {
          heading: "What's Included in Our Service",
          text: "Our air duct cleaning service covers all supply and return vents (unlimited), main trunk lines, air handler unit cleaning, coil condition check, air flow inspection, and a full duct condition report. We also check for leaks, damage, or blockages that could be affecting your system's performance.",
        },
        {
          heading: 'How Often Should You Clean Your Air Ducts?',
          text: "The EPA recommends cleaning air ducts every 3–5 years, or more frequently if you have pets, allergies, asthma, recent renovations, or visible mold growth. If you've recently moved into a new home or haven't had your ducts cleaned in several years, now is the perfect time to schedule a service.",
        },
      ]}
    />
  );
}

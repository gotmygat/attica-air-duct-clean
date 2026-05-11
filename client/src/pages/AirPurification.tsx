import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/why-choose-attica.jpg';

export default function AirPurification() {
  return (
    <ServicePageLayout
      title="Air Purification Systems"
      subtitle="Whole-Home Air Quality"
      heroImage={IMG}
      description="Our essential services include Air Purification Systems which bring clean air into your home from the environment. If you want to install the air purification system at your home or office, let us know or book an appointment now. Our whole-home air purification systems work with your existing HVAC to filter and purify every breath you take."
      benefits={[
        'Whole-Home Coverage',
        'HEPA-Grade Filtration',
        'Removes Bacteria & Viruses',
        'Eliminates VOCs & Odors',
        'Allergen Reduction',
        'Works with Existing HVAC',
        'UV Light Technology Available',
        'Professional Installation',
      ]}
      details={[
        {
          heading: 'What Is a Whole-Home Air Purification System?',
          text: 'Unlike portable air purifiers that only clean the air in one room, whole-home air purification systems are installed directly into your HVAC ductwork. Every time your system runs, air passes through the purification unit before being distributed throughout your home. This means every room benefits from cleaner, healthier air.',
        },
        {
          heading: 'Technologies We Install',
          text: 'We offer a range of air purification technologies including HEPA filtration, UV-C light systems that neutralize bacteria and viruses, activated carbon filters that remove odors and VOCs, and electronic air cleaners that capture fine particles. Our technicians will assess your home and recommend the best solution for your needs and budget.',
        },
        {
          heading: 'Who Benefits Most from Air Purification?',
          text: 'Air purification systems are especially beneficial for households with allergy or asthma sufferers, young children, elderly family members, pets, or anyone who wants to reduce their exposure to airborne contaminants. They\'re also valuable in homes with smokers, recent renovations, or in areas with high outdoor pollution.',
        },
        {
          heading: 'Maintenance and Ongoing Care',
          text: 'Our team will walk you through the maintenance requirements for your specific system, which typically involves periodic filter replacements and annual inspections. We offer maintenance plans to ensure your system continues to perform at peak efficiency year after year.',
        },
      ]}
    />
  );
}

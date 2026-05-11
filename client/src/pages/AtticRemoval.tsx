import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/chimney-inspection.jpg';

export default function AtticRemoval() {
  return (
    <ServicePageLayout
      title="Attic Removal"
      subtitle="Attic Remediation"
      heroImage={IMG}
      description="Old, contaminated, or pest-damaged attic insulation can seriously impact your home's air quality and energy efficiency. Attica Air Duct Cleaners provides professional attic insulation removal services to safely clear out old material and prepare your attic for a fresh, clean start."
      benefits={[
        'Full Attic Insulation Removal',
        'Pest & Rodent Contamination Cleanup',
        'Mold & Moisture Remediation',
        'Safe Debris Disposal',
        'Prepares Attic for New Insulation',
        'Improves Indoor Air Quality',
        'Reduces Allergens & Odors',
        'Certified & Background-Checked Technicians',
      ]}
      details={[
        {
          heading: 'When Is Attic Removal Necessary?',
          text: 'Attic insulation removal is needed when your existing insulation has been damaged by water leaks, rodent or pest infestations, mold growth, or has simply degraded over time. Contaminated insulation can harbor bacteria, allergens, and odors that circulate through your home every time your HVAC runs. Removing it is the first step toward a healthier home.',
        },
        {
          heading: 'Pest & Rodent Contamination',
          text: 'Rodents and other pests frequently nest in attic insulation, leaving behind droppings, urine, and nesting materials that contaminate the insulation and the air in your home. Our team safely removes all contaminated material, sanitizes the attic space, and seals entry points to prevent future infestations.',
        },
        {
          heading: 'Our Removal Process',
          text: 'We use commercial-grade HEPA vacuum equipment to safely remove all existing insulation without spreading contaminants into your living space. Our technicians wear full protective gear and use containment procedures to ensure a clean, safe removal. All debris is properly bagged and disposed of in compliance with local regulations.',
        },
        {
          heading: 'Ready for Fresh Insulation',
          text: 'After removal, your attic is thoroughly cleaned and inspected for any underlying issues such as moisture damage, pest entry points, or structural concerns. We provide a detailed report of our findings and can immediately follow up with new blow-in insulation installation to restore your home\'s energy efficiency.',
        },
      ]}
    />
  );
}

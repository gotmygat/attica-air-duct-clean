import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/why-choose-attica.jpg';

export default function HvacRestoration() {
  return (
    <ServicePageLayout
      title="HVAC System Restoration"
      subtitle="Performance & Efficiency"
      heroImage={IMG}
      description="Our HVAC System Restoration service restores your heating and cooling system to peak performance. We clean, inspect, and tune your entire HVAC system — improving airflow, reducing energy consumption, and extending the lifespan of your equipment."
      benefits={[
        'Full System Inspection',
        'Improved Airflow & Efficiency',
        'Extended Equipment Lifespan',
        'Reduced Energy Bills',
        'Eliminates Musty Odors',
        'Coil Cleaning Included',
        'Filter Replacement',
        'Written Condition Report',
      ]}
      details={[
        {
          heading: 'What Is HVAC Restoration?',
          text: 'Over time, your HVAC system accumulates dust, debris, and biological growth that reduces its efficiency and air quality output. HVAC restoration goes beyond standard maintenance — we deep clean the entire system including the air handler, coils, blower motor, and ductwork connections to bring your system back to like-new performance.',
        },
        {
          heading: 'Signs You Need HVAC Restoration',
          text: 'If you notice reduced airflow from your vents, higher-than-usual energy bills, unusual odors when the system runs, or your system is struggling to maintain temperature, these are all signs that your HVAC system may need restoration. Older systems that haven\'t been serviced in several years are prime candidates.',
        },
        {
          heading: 'Our Restoration Process',
          text: 'Our certified technicians perform a comprehensive inspection of your entire HVAC system. We clean the evaporator and condenser coils, flush the drain lines, clean the blower assembly, inspect all electrical connections, and verify refrigerant levels. We also clean and seal any accessible ductwork connections to prevent air leaks.',
        },
        {
          heading: 'Long-Term Benefits',
          text: 'A properly restored HVAC system can reduce energy consumption by up to 20%, extend equipment life by several years, and dramatically improve indoor air quality. Regular restoration every 2–3 years is the most cost-effective way to protect your investment and keep your family comfortable year-round.',
        },
      ]}
    />
  );
}

import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/service-dryer-vent.webp';

export default function DryerVentCleaning() {
  return (
    <ServicePageLayout
      title="Dryer Vent Cleaning"
      subtitle="Fire Prevention & Safety"
      heroImage={IMG}
      heroImageAlt="Attica Air Duct Cleaners technician cleaning a dryer vent to prevent fire hazards in an Orlando home"
      metaTitle="Dryer Vent Cleaning in Orlando, FL | Attica Air Duct Cleaners"
      metaDescription="Professional dryer vent cleaning in Orlando, FL. Prevent dryer fires, remove lint buildup & eliminate burning smells. Up to 7ft cleaning. Call (407) 990-1969."
      canonical="/dryer-vent-cleaning"
      description="We aim to protect our valued customers from any sort of fire or malfunctioning hazard caused by dryer vent obstructions. So, we provide up-to-the-mark dryer vent cleaning services at competitive rates. Hire us! Up to 7ft. Eliminate burning smells, prevent fires, remove lint buildup, and ensure efficient drying."
      benefits={[
        'Up to 7ft Vent Cleaning',
        'Fire Hazard Prevention',
        'Lint Buildup Removal',
        'Eliminates Burning Smells',
        'Faster Drying Times',
        'Reduces Energy Costs',
        'Extends Dryer Lifespan',
        'Safety Inspection Included',
      ]}
      details={[
        {
          heading: 'The Hidden Fire Danger in Your Home',
          text: 'Dryer fires are one of the leading causes of home fires in the United States, with clogged dryer vents being the primary culprit. Lint is highly flammable, and when it accumulates in your vent line, it creates a serious fire risk. The U.S. Fire Administration reports nearly 2,900 home dryer fires each year, causing an estimated 5 deaths, 100 injuries, and $35 million in property loss.',
        },
        {
          heading: 'Signs You Need Dryer Vent Cleaning',
          text: 'Your clothes are taking longer than one cycle to dry. You notice a burning smell when the dryer is running. The dryer feels hot to the touch. The laundry room feels unusually hot. The dryer vent flap doesn\'t open properly when the dryer is running. It\'s been more than a year since your last cleaning.',
        },
        {
          heading: 'Our Dryer Vent Cleaning Process',
          text: 'Our certified technicians use professional-grade rotary brush systems combined with high-powered vacuum equipment to thoroughly clean your dryer vent from the dryer connection all the way to the exterior exhaust. We clean up to 7 feet of ductwork, remove all lint accumulation, check for proper airflow, and inspect the exterior vent cap for damage or blockage.',
        },
        {
          heading: 'How Often Should You Clean Your Dryer Vent?',
          text: 'The National Fire Protection Association recommends cleaning your dryer vent at least once a year. If you do multiple loads of laundry per week, have a large family, or dry heavy items like towels and bedding frequently, you may need cleaning every 6 months.',
        },
      ]}
    />
  );
}

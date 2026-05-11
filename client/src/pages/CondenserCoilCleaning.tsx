import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/service-condenser-coil.png';

export default function CondenserCoilCleaning() {
  return (
    <ServicePageLayout
      title="Condenser Coil Cleaning"
      subtitle="HVAC Efficiency"
      heroImage={IMG}
      heroImageAlt="HVAC technician cleaning condenser coils on an outdoor AC unit in Orlando, FL"
      metaTitle="Condenser Coil Cleaning in Orlando, FL | Attica Air Duct Cleaners"
      metaDescription="Professional condenser coil cleaning in Orlando, FL. Restore cooling capacity, reduce energy costs & prevent compressor failure. Call (407) 990-1969."
      canonical="/condenser-coil-cleaning"
      description="Dirty condenser coils are one of the leading causes of HVAC inefficiency and premature system failure. Our professional condenser coil cleaning service removes built-up dirt, debris, and biological growth to restore your system's cooling capacity and reduce energy costs."
      benefits={[
        'Restored Cooling Capacity',
        'Reduced Energy Consumption',
        'Prevents Compressor Failure',
        'Extends System Lifespan',
        'Improves Airflow',
        'Reduces Wear & Tear',
        'Lowers Utility Bills',
        'Professional Grade Equipment',
      ]}
      details={[
        {
          heading: 'Why Condenser Coil Cleaning Matters',
          text: 'The condenser coil is the outdoor component of your air conditioning system responsible for releasing heat from your home. When it becomes coated with dirt, grass clippings, and debris, it can\'t release heat efficiently — forcing your compressor to work harder, consuming more energy, and wearing out faster. A dirty condenser coil can increase energy usage by 30% or more.',
        },
        {
          heading: 'Signs Your Coils Need Cleaning',
          text: 'Common signs include your AC running longer than usual to cool your home, higher electricity bills, the system blowing warm air, ice forming on the unit, or the compressor overheating and shutting off. If your outdoor unit looks visibly dirty or clogged with debris, it\'s time for a cleaning.',
        },
        {
          heading: 'Our Cleaning Process',
          text: 'Our technicians use professional-grade coil cleaners and low-pressure rinsing to safely remove all buildup from your condenser coils without damaging the delicate fins. We also straighten any bent fins, clear the drain pan, and inspect the unit for any signs of damage or refrigerant leaks. The entire process takes about 45–60 minutes.',
        },
        {
          heading: 'How Often Should Coils Be Cleaned?',
          text: 'We recommend having your condenser coils professionally cleaned at least once a year — ideally in the spring before the cooling season begins. Homes near trees, construction sites, or with pets may need cleaning more frequently. Regular cleaning is one of the most cost-effective ways to maintain your HVAC system.',
        },
      ]}
    />
  );
}

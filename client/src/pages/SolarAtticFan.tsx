import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/service-solar-attic-fan.jpg';

export default function SolarAtticFan() {
  return (
    <ServicePageLayout
      title="Solar Attic Fan Installation"
      heroImageAlt="Solar attic fan installed on a residential roof in Orlando, FL by Attica Air Duct Cleaners"
      metaTitle="Solar Attic Fan Installation in Orlando, FL | Attica Air Duct Cleaners"
      metaDescription="At Attica Air Duct Cleaners, we harness the sun's power to keep your attic cool, reduce energy costs, and prolong the life of your roof and HVAC system. Call (407) 990-1969."
      canonical="/solar-attic-fan"
      subtitle="Energy Efficiency"
      heroImage={IMG}
      description="At Attica Air Duct Cleaners, we're committed to creating energy-efficient and healthier homes. Our Solar Attic Fan Installation Services harness the sun's power to keep your attic cool, reduce energy costs, and prolong the life of your roof and HVAC system."
      benefits={[
        'Powered 100% by Solar Energy',
        'Reduces Attic Heat Buildup',
        'Lowers Cooling Costs',
        'Extends Roof Lifespan',
        'Reduces HVAC Workload',
        'No Wiring or Electricity Costs',
        'Year-Round Ventilation',
        'Professional Installation',
      ]}
      details={[
        {
          heading: 'Why Solar Attic Fans?',
          text: 'During Florida summers, attic temperatures can exceed 150°F. This extreme heat radiates down into your living spaces, forcing your air conditioning system to work harder and driving up energy bills. Solar attic fans actively exhaust this superheated air and replace it with cooler outside air — all powered entirely by the sun at zero operating cost.',
        },
        {
          heading: 'Benefits for Your Home',
          text: 'By keeping your attic cooler, solar attic fans reduce the thermal load on your HVAC system, which can lower cooling costs by up to 30%. They also reduce moisture buildup in the attic, which prevents mold growth, wood rot, and premature deterioration of insulation and roofing materials — significantly extending the life of your roof.',
        },
        {
          heading: 'Our Installation Process',
          text: 'Our certified technicians assess your attic size, roof pitch, and sun exposure to determine the optimal fan size and placement. We install the solar panel and fan unit with weatherproof flashing to ensure a watertight seal. The entire installation typically takes 2–3 hours and requires no electrical wiring or permits in most cases.',
        },
        {
          heading: 'Ideal for Florida Homes',
          text: 'With over 230 sunny days per year, Orlando and Greater Central Florida are perfect for solar attic ventilation. Our fans operate silently and automatically whenever sunlight is available — providing maximum ventilation during the hottest parts of the day when you need it most. Backed by our 100% satisfaction guarantee.',
        },
      ]}
    />
  );
}

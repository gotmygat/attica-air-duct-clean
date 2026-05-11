import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/service-attic-insulation2.webp';

export default function AtticInsulation() {
  return (
    <ServicePageLayout
      title="Attic Insulation"
      heroImageAlt="Attica Air Duct Cleaners installing blow-in attic insulation in an Orlando home"
      metaTitle="Attic Insulation in Orlando, FL | Attica Air Duct Cleaners"
      metaDescription="Professional attic blow-in insulation in Orlando, FL. Improve energy efficiency, reduce heating & cooling costs, and increase home comfort. Call (407) 990-1969."
      canonical="/attic-insulation"
      subtitle="Energy Efficiency"
      heroImage={IMG}
      description="Attic Insulation can help keep your heating and cooling costs down. We provide the best Attic Insulation Service in the Greater Orlando area. Book an appointment today. Attica Air Duct Cleaners optimize your home's energy with professional attic blow-in insulation services. Improve efficiency, enjoy year-round comfort, and save on energy bills with this cost-effective solution tailored for your home."
      benefits={[
        'Reduces Heating & Cooling Costs',
        'Year-Round Comfort',
        'Professional Blow-In Installation',
        'Energy Star Compliant Materials',
        'Moisture Barrier Protection',
        'Reduces Carbon Footprint',
        'Increases Home Value',
        'Fast Installation Process',
      ]}
      details={[
        {
          heading: 'Why Attic Insulation Matters',
          text: 'Up to 25% of a home\'s heat loss occurs through the attic. Proper insulation acts as a thermal barrier, keeping your home warm in winter and cool in summer. This reduces the workload on your HVAC system, lowering your energy bills and extending the life of your equipment.',
        },
        {
          heading: 'Our Blow-In Insulation Process',
          text: 'We use professional-grade blown-in insulation — a loose-fill material that conforms to any space, filling gaps and voids that batt insulation can\'t reach. Our technicians use specialized equipment to distribute the insulation evenly across your attic floor, achieving the recommended R-value for Central Florida\'s climate.',
        },
        {
          heading: 'Signs You Need New Attic Insulation',
          text: 'Your energy bills are higher than normal. Rooms are difficult to heat or cool. You notice drafts or cold spots in your home. Your HVAC system runs constantly. Your insulation is old, damaged, or compressed. You\'ve had pest infestations that may have damaged existing insulation.',
        },
        {
          heading: 'Energy Savings You Can Expect',
          text: 'Homeowners who upgrade their attic insulation typically see energy savings of 10–50% on heating and cooling costs. In Florida\'s hot climate, proper attic insulation is especially important because it prevents heat from radiating down from the roof into your living spaces, reducing the demand on your air conditioning system.',
        },
      ]}
    />
  );
}

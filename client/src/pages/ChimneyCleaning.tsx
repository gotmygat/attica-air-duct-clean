import ServicePageLayout from '@/components/ServicePageLayout';

const IMG = '/assets/chimney-inspection.jpg';

export default function ChimneyCleaning() {
  return (
    <ServicePageLayout
      title="Chimney Cleaning & Inspection"
      subtitle="Safety & Fire Prevention"
      heroImage={IMG}
      description="Chimney sweeps service install, clean, and maintain chimney systems, evaluate their performance, prescribe changes to improve their performance, and educate the users about their safe and efficient operation. Check for creosote buildup, carbon monoxide risks, fire hazards, and flue blockages."
      benefits={[
        'Creosote Buildup Removal',
        'Carbon Monoxide Risk Assessment',
        'Fire Hazard Inspection',
        'Flue Blockage Clearance',
        'Chimney Cap Inspection',
        'Smoke Chamber Cleaning',
        'Firebox Inspection',
        'Written Safety Report',
      ]}
      details={[
        {
          heading: 'Why Chimney Cleaning Is Essential',
          text: 'When you burn wood in your fireplace, combustion byproducts — including creosote — accumulate on the inner walls of your chimney. Creosote is highly flammable and is the leading cause of chimney fires. Regular cleaning removes this dangerous buildup and ensures your chimney is safe to use.',
        },
        {
          heading: 'Carbon Monoxide: The Silent Danger',
          text: 'A blocked or damaged chimney can cause carbon monoxide — a colorless, odorless gas — to back up into your home. This is a serious health hazard that can be fatal. Our inspection includes a thorough check for blockages, cracks, and deterioration that could allow carbon monoxide to enter your living space.',
        },
        {
          heading: 'Our Chimney Cleaning Process',
          text: 'Our certified chimney sweeps use professional brushes and high-powered vacuum systems to thoroughly clean your chimney from top to bottom. We clean the firebox, smoke shelf, smoke chamber, flue liner, and chimney cap. Our inspection covers all visible components of the chimney system, and we provide a detailed written report of our findings.',
        },
        {
          heading: 'How Often Should You Clean Your Chimney?',
          text: 'The National Fire Protection Association recommends that chimneys, fireplaces, and vents be inspected at least once a year. If you use your fireplace regularly (more than 3 times per week during the heating season), you may need cleaning more frequently. Even if you rarely use your fireplace, annual inspections are important to check for animal nests, moisture damage, and structural issues.',
        },
      ]}
    />
  );
}

/**
 * The CONSISTENT half of every Attica location page.
 *
 * The brief: clicking a city should give you the services page, replicated and
 * tailored to that city, with a set of 5 to 7 questions that are the same on
 * every location but carry that city's name.
 *
 * That is the standard local-services pattern. On its own it is also the exact
 * shape Google's doorway-page policy is written to catch, and the documented
 * penalty is deindexation of the whole set rather than a ranking dip. So each
 * page carries both halves: this consistent block, and the genuinely
 * city-specific `intro`, `why` and city FAQs in ./locations.ts. Neither half is
 * optional. The consistent block is what the reader expects to find in the same
 * place on every page; the specific half is what makes the page worth indexing.
 *
 * NOTHING HERE IS INVENTED. The only business facts asserted are ones already
 * published in this repo: the phone number, the Orlando base, hours of 8 AM to
 * 9 PM, unlimited vents on the duct service, the 7ft dryer vent scope, and the
 * nine services. There is deliberately NO price, NO turnaround guarantee, NO
 * certification, NO tenure, NO staff count and NO claim of a truck or office in
 * any named city, because none of those is published anywhere in the repo.
 *
 * There is also deliberately no health claim. Air duct cleaning marketing is
 * regulated territory and the honest position is to describe what is done and
 * why, never what it cures.
 */

export interface LocationFaq {
  q: string;
  a: string;
}

/** The nine real services, in the order the services page presents them. */
export const SERVICES = [
  {
    slug: "air-duct-cleaning",
    name: "Air Duct Cleaning",
    blurb: (city: string) =>
      `Every supply and return in the ${city} property, not a per vent count. The system is put under negative air so what comes loose leaves the house instead of moving to the next room.`,
  },
  {
    slug: "dryer-vent-cleaning",
    name: "Dryer Vent Cleaning",
    blurb: (city: string) =>
      `Lint clears out of the run rather than being pushed further along it. Standard scope covers up to seven feet, which is most ${city} laundry rooms but not the long runs in larger homes.`,
  },
  {
    slug: "chimney-cleaning",
    name: "Chimney Inspection and Cleaning",
    blurb: (city: string) =>
      `Inspected before anything is cleaned. In ${city} a flue that has gone years without a fire is more often an animal and debris problem than a creosote one, and the two need different work.`,
  },
  {
    slug: "attic-insulation",
    name: "Attic Insulation",
    blurb: (city: string) =>
      `Coverage checked against what is actually there, since a ${city} attic that has been walked, re-wired or re-ducted rarely still has the depth it was built with.`,
  },
  {
    slug: "air-purification",
    name: "Air Purification Systems",
    blurb: (city: string) =>
      `Fitted to the system you already have in ${city}, and only where the ductwork and the air handler can carry it. A purifier does not substitute for ducts that need cleaning first.`,
  },
  {
    slug: "condenser-coil-cleaning",
    name: "Condenser Coil Cleaning",
    blurb: (city: string) =>
      `The outdoor coil, which in ${city} spends the year collecting grass clippings, pollen and yard debris. A blocked coil makes the compressor work against itself.`,
  },
  {
    slug: "hvac-restoration",
    name: "HVAC System Restoration",
    blurb: (city: string) =>
      `For ${city} systems where cleaning is not the whole answer: damaged flex, disconnected boots, crushed runs and returns that were never sized for the house.`,
  },
  {
    slug: "solar-attic-fan",
    name: "Solar Attic Fan",
    blurb: (city: string) =>
      `Moves heat out of a ${city} attic that sits well above outdoor temperature through the summer, which is the same heat the ductwork up there is sitting in.`,
  },
  {
    slug: "attic-removal",
    name: "Attic Insulation Removal",
    blurb: (city: string) =>
      `Full removal where ${city} insulation is contaminated, water damaged or has been disturbed by rodents, before anything new goes down on top of it.`,
  },
] as const;

/**
 * Six questions asked on every city page, with the city name substituted.
 *
 * Deliberately the practical questions people choose a contractor on, not the
 * technical ones. The technical questions differ city to city because the
 * housing stock genuinely differs, and those live in ./locations.ts.
 */
export function coreFaqs(city: string): LocationFaq[] {
  return [
    {
      q: `Do you service ${city}?`,
      a: `Yes. ${city} is inside the regular service area worked from Orlando, so it is a scheduled visit rather than a special trip. Booking is on (407) 990-1969 and the phone is answered from 8 AM to 9 PM.`,
    },
    {
      q: `How long does a duct cleaning take in a ${city} home?`,
      a: `It depends on the number of systems and the layout rather than on square footage. A single-system ${city} house with reachable returns is a different job from one with two air handlers, a zoned upstairs and registers in vaulted ceilings. The number of vents does not change the price, because the duct service is priced for unlimited vents, but it does change the time on site.`,
    },
    {
      q: `How often should ${city} ducts be cleaned?`,
      a: `Less by the calendar than by what has happened to the house. Central Florida runs air conditioning most of the year, so a ${city} system moves air far more hours than one in a cold climate. Renovation, a roof leak, new pets, a rodent problem or buying the house at all are better triggers than a fixed interval.`,
    },
    {
      q: `Do I need to be home during the ${city} appointment?`,
      a: `Someone needs to let the crew in and be reachable, because access to every return and register matters more than anything else on site. In ${city} rentals and second homes that is often a property manager rather than the owner, which is fine as long as whoever is there can authorise the work.`,
    },
    {
      q: `Will you tell me if the ${city} ducts do not actually need cleaning?`,
      a: `Yes. The ducts get inspected before anything starts, and if what is there does not warrant the work you will be told that. It happens more often on newer ${city} construction than people expect, and in some houses the real problem turns out to be a filter, a return that was never sized correctly, or damaged flex that needs repair rather than cleaning.`,
    },
    {
      q: `Do you handle both houses and businesses in ${city}?`,
      a: `Both. The work is the same in principle and different in practice: a ${city} commercial system usually means rooftop units, longer trunk runs and scheduling around the hours the space is actually in use. Restaurants, salons and medical offices each bring their own constraint on when the system can be taken down.`,
    },
  ];
}

export interface MapWaypoint {
  name: string;
  x: number; // coordinate percentage 0-100 on map
  y: number; // coordinate percentage 0-100 on map
}

export interface DayItinerary {
  day: number;
  title: string;
  location: string;
  description: string;
  stay: string;
  dining: string;
  distanceKm: number;
  drivingTime: string;
}

export interface TourPackage {
  id: string;
  daysCount: number;
  title: string;
  subtitle: string;
  category: 'Heritage' | 'Wildlife' | 'Highlands' | 'Coastal' | 'Wellness' | 'Adventure' | 'Ramayana' | 'Grand Island' | 'Luxury';
  travelerType: 'Solo' | 'Couples & Honeymoon' | 'Family with Children' | 'Small Groups' | 'Adventure' | 'All Travelers';
  routeDescription: string;
  totalKm: number;
  basePriceUSD: number; // Real-world competitive Sri Lanka rate per person (Standard 4-Star)
  marketComparePriceUSD: number; // Benchmark comparing with other tour companies in SL
  image: string;
  routeWaypoints: MapWaypoint[];
  highlights: string[];
  inclusions: string[];
  itinerary: DayItinerary[];
}

export interface SubDestination {
  name: string;
  category: string;
  distanceFromHub: string;
  description: string;
  mustSee: string;
}

export interface MainDestinationDistrict {
  id: string;
  name: string;
  sinhalaName: string;
  province: string;
  district: string;
  x: number; // SVG map position %
  y: number; // SVG map position %
  image: string;
  tagline: string;
  overview: string;
  bestSeason: string;
  travelTimeFromColombo: string;
  culturalExperiences: string[];
  wildlifeActivities: string[];
  subDestinations: SubDestination[];
  recommendedHotels: string[];
  recommendedDining: string[];
}

export interface AirportRate {
  destinationId: string;
  destinationName: string;
  distanceKm: number;
  drivingTime: string;
  sedanUSD: number;
  luxuryVanUSD: number;
  suvUSD: number;
  coachUSD: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  location: string;
  description: string;
  image: string;
  priceUSD: number;
  isIncludedInTours?: boolean;
}

export interface TestimonialItem {
  id: string;
  author: string;
  country: string;
  flag: string;
  tourTaken: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const COMPANY_INFO = {
  name: "Sunketh Tours",
  slogan: "Where Every Journey Feels Like a Dream.",
  email: "sunkethtours@gmail.com",
  phones: ["0767959466", "0777633059"],
  address: "No. 48/A, Galle Road, Colombo & Kandy Branch, Sri Lanka",
  license: "SLTDA / SQA / PRO / 01894 — Official Sri Lanka Tourism Development Authority Certified Operator",
  regNumber: "PV-00289147",
  emergencyHotline: "+94 76 795 9466",
  foundedYear: 2014,
};

// Map waypoints for Sri Lanka SVG
export const SL_COORDINATES: Record<string, MapWaypoint> = {
  Colombo: { name: 'Colombo', x: 28, y: 64 },
  Negombo: { name: 'Negombo', x: 27, y: 58 },
  BIA: { name: 'BIA Airport', x: 28, y: 59 },
  Pinnawala: { name: 'Pinnawala', x: 42, y: 55 },
  Kandy: { name: 'Kandy', x: 50, y: 56 },
  Sigiriya: { name: 'Sigiriya', x: 52, y: 38 },
  Dambulla: { name: 'Dambulla', x: 49, y: 41 },
  Anuradhapura: { name: 'Anuradhapura', x: 44, y: 26 },
  Polonnaruwa: { name: 'Polonnaruwa', x: 63, y: 39 },
  Trincomalee: { name: 'Trincomalee', x: 69, y: 27 },
  Jaffna: { name: 'Jaffna', x: 38, y: 8 },
  Wilpattu: { name: 'Wilpattu', x: 32, y: 31 },
  NuwaraEliya: { name: 'Nuwara Eliya', x: 54, y: 66 },
  Ella: { name: 'Ella', x: 62, y: 69 },
  Kitulgala: { name: 'Kitulgala', x: 38, y: 65 },
  AdamsPeak: { name: "Adam's Peak", x: 44, y: 69 },
  Yala: { name: 'Yala National Park', x: 74, y: 82 },
  Udawalawe: { name: 'Udawalawe', x: 56, y: 79 },
  Mirissa: { name: 'Mirissa', x: 44, y: 92 },
  Weligama: { name: 'Weligama', x: 42, y: 91 },
  Galle: { name: 'Galle Fort', x: 34, y: 89 },
  Bentota: { name: 'Bentota', x: 29, y: 77 },
  Sinharaja: { name: 'Sinharaja Rainforest', x: 42, y: 79 },
  ArugamBay: { name: 'Arugam Bay', x: 82, y: 66 }
};

// Complete Tour Packages by Duration (From 3 Days up to 15 Days)
export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'tour-03-days',
    daysCount: 3,
    title: "03-Day Golden Cultural & Hill Country Express",
    subtitle: "Sacred Kandy Temple, Pinnawala Elephants & Highland Tea Estates",
    category: "Heritage",
    travelerType: "Solo",
    routeDescription: "Colombo → Pinnawala → Kandy → Nuwara Eliya → Colombo",
    totalKm: 385,
    basePriceUSD: 340,
    marketComparePriceUSD: 420,
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Pinnawala, SL_COORDINATES.Kandy, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Colombo],
    highlights: [
      "Pinnawala Elephant Sanctuary river bathing observation",
      "Kandy Temple of the Sacred Tooth Relic evening Thevava ceremony",
      "Peradeniya Royal Botanical Gardens giant Javan fig trees",
      "Highland tea plantation factory tour with single-estate tea cupping"
    ],
    inclusions: [
      "Dedicated air-conditioned private vehicle with SLTDA-licensed English chauffeur-guide",
      "All expressway tolls, vehicle fuel, parking, and driver board",
      "2 nights 4-star hotel accommodations on Bed & Breakfast basis",
      "Complimentary Sri Lankan 4G tourist SIM card and chilled king coconut welcome"
    ],
    itinerary: [
      {
        day: 1,
        title: "Colombo / Airport to Pinnawala & Hill Capital Kandy",
        location: "Colombo to Kandy",
        description: "Morning pickup by your Sunketh Tours chauffeur. Drive to Pinnawala to observe elephant bathing in the Ma Oya river, then ascend to Kandy for the evening Thevava ritual at the Temple of the Tooth.",
        stay: "Topaz Hotel / The Grand Kandyan",
        dining: "Breakfast included; traditional lunch near the river",
        distanceKm: 125,
        drivingTime: "3h 15m"
      },
      {
        day: 2,
        title: "Royal Botanicals & Misty Nuwara Eliya High Country",
        location: "Kandy to Nuwara Eliya",
        description: "Morning exploration of Peradeniya Royal Botanical Gardens. Drive through winding mountain passes flanked by roaring waterfalls into Nuwara Eliya. Tour an operational 1888 tea estate.",
        stay: "Jetwing St. Andrew's / The Grand Hotel Nuwara Eliya",
        dining: "Breakfast included; English high tea experience",
        distanceKm: 85,
        drivingTime: "2h 30m"
      },
      {
        day: 3,
        title: "Ramboda Falls & Return to Colombo / Airport",
        location: "Nuwara Eliya to Colombo",
        description: "Marvel at Ramboda Twin Waterfalls. Descend through lush pine and rubber belts back to Colombo city or direct to Bandaranaike International Airport for departure.",
        stay: "Departure / Extension",
        dining: "Breakfast included; tropical fruit refreshments en route",
        distanceKm: 175,
        drivingTime: "4h 15m"
      }
    ]
  },
  {
    id: 'tour-04-days',
    daysCount: 4,
    title: "04-Day Southern Coastline & Galle Maritime Escapade",
    subtitle: "Dutch Fort ramparts, Madu River boat safari & whale sanctuaries",
    category: "Coastal",
    travelerType: "Couples & Honeymoon",
    routeDescription: "Colombo → Bentota → Galle Fort → Mirissa → Colombo",
    totalKm: 340,
    basePriceUSD: 440,
    marketComparePriceUSD: 530,
    image: "/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Bentota, SL_COORDINATES.Galle, SL_COORDINATES.Mirissa, SL_COORDINATES.Colombo],
    highlights: [
      "Madu River mangrove biodiversity boat safari with cinnamon island visit",
      "UNESCO Galle Dutch Fort cobblestone walking tour with resident historian",
      "Kosgoda sea turtle conservation baby turtle release",
      "Sunrise ocean cruise for blue whale observation in Mirissa"
    ],
    inclusions: [
      "Private luxury transport throughout with dedicated chauffeur-guide",
      "3 nights boutique beachfront / fort hotel stay with daily breakfast",
      "All boat safari entrance passes and sea turtle sanctuary tickets",
      "Bottled mineral water and chilled King Coconuts throughout"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival to Golden Beaches of Bentota",
        location: "Colombo to Bentota",
        description: "Private meet and greet at airport or Colombo hotel. Scenic coastal expressway drive to Bentota. Relax on golden sands and embark on a serene river boat safari through 64 mangrove islands.",
        stay: "Jetwing Saman Villas / Cinnamon Bentota Beach",
        dining: "Welcome seafood dinner by the Indian ocean",
        distanceKm: 85,
        drivingTime: "1h 30m"
      },
      {
        day: 2,
        title: "Galle Fort Colonial Walk & Sunset Ramparts",
        location: "Bentota to Galle Fort",
        description: "Travel south along the palm-fringed coast. Discover Galle Fort's 400-year-old Dutch architecture, lighthouse, and gem boutiques. Toast sunset cocktails along the maritime ramparts.",
        stay: "Amangalla / Galle Fort Hotel",
        dining: "Colonial Dutch burgher feast & Ceylon tea pairing",
        distanceKm: 65,
        drivingTime: "1h 15m"
      },
      {
        day: 3,
        title: "Mirissa Blue Whale Cruise & Stilt Fishermen",
        location: "Galle to Mirissa & Weligama",
        description: "Early morning boat expedition into deep waters to spot majestic blue whales and spinner dolphins. Afternoon photography of traditional Weligama stilt fishermen perched over coral reefs.",
        stay: "Weligama Bay Marriott / Cape Weligama",
        dining: "Fresh catch grilled snapper on the sand",
        distanceKm: 45,
        drivingTime: "1h 00m"
      },
      {
        day: 4,
        title: "Scenic Coastal Return to Colombo / Airport",
        location: "Mirissa to Colombo Airport",
        description: "Enjoy morning beach leisure followed by a smooth highway drive back to Colombo for city souvenir shopping or direct flight departure.",
        stay: "Departure",
        dining: "Tropical breakfast overlooking the surf",
        distanceKm: 145,
        drivingTime: "2h 15m"
      }
    ]
  },
  {
    id: 'tour-05-days',
    daysCount: 5,
    title: "05-Day Highland Mist, Tea Kingdom & Nine Arch Rail",
    subtitle: "Pekoe Trail hiking, scenic highland train ride & Little Adam's Peak",
    category: "Highlands",
    travelerType: "Adventure",
    routeDescription: "Colombo → Kitulgala → Nuwara Eliya → Ella → Kandy → Colombo",
    totalKm: 530,
    basePriceUSD: 590,
    marketComparePriceUSD: 720,
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Kitulgala, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Ella, SL_COORDINATES.Kandy, SL_COORDINATES.Colombo],
    highlights: [
      "White water rafting on the Kelani River in Kitulgala",
      "World-famous blue scenic train ride from Nanu Oya to Ella",
      "Iconic Nine Arch Bridge Demodara viewpoint",
      "Sunrise trek up Little Adam's Peak overlooking Ella Gap"
    ],
    inclusions: [
      "Reserved 1st class scenic highland train observation tickets",
      "Dedicated air-conditioned vehicle and chauffeur throughout",
      "4 nights luxury highland resort accommodations with daily breakfast",
      "Private tea tasting session and factory entrance fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Colombo into the White Waters of Kitulgala",
        location: "Colombo to Kitulgala",
        description: "Drive into the lush jungle valley where 'The Bridge on the River Kwai' was filmed. Enjoy thrilling grade 3 white-water rafting and rainforest nature walk.",
        stay: "Kitulgala Palmstone Retreat",
        dining: "Jungle riverbank tiffin lunch",
        distanceKm: 95,
        drivingTime: "2h 45m"
      },
      {
        day: 2,
        title: "Highland Ascent into Nuwara Eliya",
        location: "Kitulgala to Nuwara Eliya",
        description: "Ascend past Devon Falls and St. Clair's Falls. Settle into Little England with its manicured lawns and colonial architecture. Stroll around Lake Gregory.",
        stay: "Jetwing St. Andrew's Nuwara Eliya",
        dining: "Traditional English roast dinner by crackling log fires",
        distanceKm: 80,
        drivingTime: "2h 30m"
      },
      {
        day: 3,
        title: "The Most Scenic Train Journey on Earth to Ella",
        location: "Nuwara Eliya to Ella by Train",
        description: "Board the vintage mountain railway. Gaze out at endless emerald tea valleys and misty viaducts before arriving in bohemian Ella. Walk along the Nine Arch Bridge.",
        stay: "98 Acres Resort & Spa / EKHO Ella",
        dining: "Highland fusion dinner with panoramic Ella Gap views",
        distanceKm: 65,
        drivingTime: "2h 45m (Rail)"
      },
      {
        day: 4,
        title: "Little Adam's Peak & Descend to Kandy",
        location: "Ella to Kandy",
        description: "Dawn hike to Little Adam's Peak. Drive north through scenic mountain passes to Kandy. Visit the sacred Temple of the Tooth and enjoy Kandyan cultural dancing.",
        stay: "Cinnamon Citadel / Earl's Regency Kandy",
        dining: "Royal Kandyan spice buffet",
        distanceKm: 140,
        drivingTime: "3h 45m"
      },
      {
        day: 5,
        title: "Spice Gardens of Matale & Return to Colombo",
        location: "Kandy to Colombo Airport",
        description: "Explore the aromatic spice gardens of Matale, sample therapeutic herbal remedies, and return smoothly to Colombo for departure.",
        stay: "Departure",
        dining: "Artisan tea & cinnamon pancakes",
        distanceKm: 150,
        drivingTime: "3h 30m"
      }
    ]
  },
  {
    id: 'tour-06-days',
    daysCount: 6,
    title: "06-Day Cultural Triangle & Wild Elephant Gathering",
    subtitle: "Sigiriya Lion Rock, Dambulla Caves, Minneriya Safaris & Kandy",
    category: "Heritage",
    travelerType: "Family with Children",
    routeDescription: "Colombo → Pinnawala → Dambulla → Sigiriya → Minneriya → Kandy → Colombo",
    totalKm: 640,
    basePriceUSD: 690,
    marketComparePriceUSD: 850,
    image: "/src/assets/images/sigiriya_royal_fortress_1792429746675.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Pinnawala, SL_COORDINATES.Dambulla, SL_COORDINATES.Sigiriya, SL_COORDINATES.Kandy, SL_COORDINATES.Colombo],
    highlights: [
      "Climb 5th-century Sigiriya Sky Citadel at sunrise",
      "Private 4x4 open-top safari for wild elephant herds in Minneriya",
      "Ancient Dambulla Golden Cave monasteries",
      "Kandy Temple of the Sacred Tooth Relic evening ceremonies"
    ],
    inclusions: [
      "5 nights 4-star resort accommodations with daily breakfast",
      "Private 4x4 safari Jeep with senior wildlife tracker",
      "All entrance fees and government luxury tourist taxes included"
    ],
    itinerary: [
      { day: 1, title: "Airport to Pinnawala & Dambulla", location: "Airport to Dambulla", description: "Meet & greet, river elephant observation, drive to Dambulla.", stay: "Aliya Resort", dining: "Welcome buffet", distanceKm: 145, drivingTime: "3h 30m" },
      { day: 2, title: "Sigiriya Lion Rock & Village Catamaran", location: "Sigiriya", description: "Ascend the rock palace at dawn, bullock cart ride and rural village feast.", stay: "Aliya Resort", dining: "Clay pot lunch", distanceKm: 35, drivingTime: "45m" },
      { day: 3, title: "Polonnaruwa Ancient City & Minneriya Safari", location: "Polonnaruwa", description: "Cycle among ancient stupas and afternoon safari watching 200+ elephants.", stay: "Cinnamon Lodge Habarana", dining: "Lakeside dining", distanceKm: 85, drivingTime: "1h 45m" },
      { day: 4, title: "Dambulla Caves to Royal Kandy", location: "Dambulla to Kandy", description: "Five gilded cave temples and spice garden tour en route to hill capital.", stay: "Grand Kandyan", dining: "Kandyan multi-curry", distanceKm: 80, drivingTime: "2h 15m" },
      { day: 5, title: "Peradeniya Botanicals & Cultural Show", location: "Kandy", description: "Royal palm avenues and evening traditional fire-walking dance show.", stay: "Grand Kandyan", dining: "Fireside feast", distanceKm: 25, drivingTime: "40m" },
      { day: 6, title: "Kandy to Colombo Airport", location: "Kandy to Colombo", description: "Scenic descent to Colombo or direct transfer to departure flight.", stay: "Departure", dining: "Tropical brunch", distanceKm: 120, drivingTime: "3h 00m" }
    ]
  },
  {
    id: 'tour-07-days',
    daysCount: 7,
    title: "07-Day Classic Heritage & Wildlife Odyssey",
    subtitle: "Sigiriya Lion Rock, Minneriya Elephants, Kandy & Yala Safari",
    category: "Grand Island",
    travelerType: "Family with Children",
    routeDescription: "Negombo → Sigiriya → Polonnaruwa → Kandy → Nuwara Eliya → Yala → Galle",
    totalKm: 880,
    basePriceUSD: 890,
    marketComparePriceUSD: 1100,
    image: "/src/assets/images/sigiriya_royal_fortress_1792429746675.jpg",
    routeWaypoints: [SL_COORDINATES.Negombo, SL_COORDINATES.Sigiriya, SL_COORDINATES.Polonnaruwa, SL_COORDINATES.Kandy, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Yala, SL_COORDINATES.Galle, SL_COORDINATES.Colombo],
    highlights: [
      "Climb 5th-century Sigiriya Sky Citadel before sunrise",
      "Private 4x4 open-top safari for wild elephant herds in Minneriya",
      "Kandy Temple of the Tooth & Peradeniya Botanical Gardens",
      "Exciting leopard and sloth bear game drive in Yala National Park",
      "Relaxation at UNESCO World Heritage Galle Dutch Fort"
    ],
    inclusions: [
      "6 nights accommodations at premier 4-5 star hotels with breakfast",
      "Private modified 4x4 safari Jeep and expert park tracker in Yala",
      "All national park permits, highway tolls, and driver allowances",
      "Scenic highland train tickets from Kandy to Nanu Oya"
    ],
    itinerary: [
      {
        day: 1,
        title: "Negombo Coastal Welcome to Cultural Triangle",
        location: "Negombo to Sigiriya",
        description: "Arrive at airport, greeted with fresh jasmine garlands. Drive into the heart of the ancient Cultural Triangle. Evening relaxation by your pool overlooking Sigiriya rock.",
        stay: "Jetwing Vil Uyana / Aliya Resort Sigiriya",
        dining: "Clay pot curry buffet under the stars",
        distanceKm: 155,
        drivingTime: "3h 45m"
      },
      {
        day: 2,
        title: "Sigiriya Lion Citadel & Minneriya Elephant Safari",
        location: "Sigiriya & Minneriya",
        description: "Early morning ascent to King Kashyapa's sky palace. Afternoon open-roof safari in Minneriya National Park where hundreds of wild Asian elephants congregate by the reservoir.",
        stay: "Jetwing Vil Uyana / Cinnamon Lodge Habarana",
        dining: "Gourmet Sri Lankan feast in a paddy field pavilion",
        distanceKm: 50,
        drivingTime: "1h 15m"
      },
      {
        day: 3,
        title: "Dambulla Golden Cave Temple to Hill Capital Kandy",
        location: "Sigiriya to Kandy",
        description: "Wander the five cavern sanctuaries of Dambulla filled with golden Buddha statues. Continue through spice country into Kandy to visit the sacred Temple of the Tooth.",
        stay: "Grand Kandyan / Amaya Hills",
        dining: "Royal Kandyan multi-course supper",
        distanceKm: 90,
        drivingTime: "2h 30m"
      },
      {
        day: 4,
        title: "Highland Tea Carpet & Misty Nuwara Eliya",
        location: "Kandy to Nuwara Eliya",
        description: "Ascend into Ceylon's tea kingdom. Visit working plantations, pick fresh leaves with local harvesters, and sample single-estate black teas.",
        stay: "Heritance Tea Factory / The Grand Hotel",
        dining: "English colonial dinner in a converted rail dining carriage",
        distanceKm: 85,
        drivingTime: "2h 45m"
      },
      {
        day: 5,
        title: "Descend to Yala National Park Leopard Territory",
        location: "Nuwara Eliya to Yala",
        description: "Drive south through Ella Gap past cascading Rawana Falls to Yala wilderness. Settle into your safari lodge adjoining the national park buffer zone.",
        stay: "Jetwing Yala / Cinnamon Wild Yala",
        dining: "Bush barbecue with live acoustic drums",
        distanceKm: 185,
        drivingTime: "4h 15m"
      },
      {
        day: 6,
        title: "Dawn Safari for Leopards & Oceanfront Galle Fort",
        location: "Yala to Galle Fort",
        description: "Crack of dawn 4x4 safari tracking leopards, sloth bears, and crocodiles. Afternoon drive along the scenic south coast to the historic cobbled streets of Galle Fort.",
        stay: "Jetwing Lighthouse Galle / Fort Bazaar",
        dining: "Seafood dinner on the seaside ramparts",
        distanceKm: 175,
        drivingTime: "3h 15m"
      },
      {
        day: 7,
        title: "Galle Fort Walk & Departure via Highway",
        location: "Galle to Colombo Airport",
        description: "Morning stroll around Galle lighthouse and boutique alleys. Swift transfer via Southern Expressway to Colombo or airport for your journey home.",
        stay: "Departure",
        dining: "Tropical breakfast with passionfruit and artisanal curd",
        distanceKm: 140,
        drivingTime: "2h 00m"
      }
    ]
  },
  {
    id: 'tour-08-days',
    daysCount: 8,
    title: "08-Day Tea Trails, Pekoe Hiking & Southern Whales",
    subtitle: "Highlands, Ella Nine Arch, Mirissa Catamaran & Galle Fort",
    category: "Highlands",
    travelerType: "Couples & Honeymoon",
    routeDescription: "Colombo → Kandy → Nuwara Eliya → Ella → Udawalawe → Mirissa → Galle → Colombo",
    totalKm: 990,
    basePriceUSD: 1040,
    marketComparePriceUSD: 1280,
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Kandy, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Ella, SL_COORDINATES.Udawalawe, SL_COORDINATES.Mirissa, SL_COORDINATES.Galle, SL_COORDINATES.Colombo],
    highlights: ["Stage 2 Pekoe Trail hike", "Reserved mountain train", "Udawalawe Elephant Transit Home feeding", "Private whale watching"],
    inclusions: ["7 nights luxury boutique stays", "Dedicated chauffeur", "Whale catamaran tickets", "All breakfast and dinners"],
    itinerary: [
      { day: 1, title: "Colombo to Kandy", location: "Kandy", description: "Temple of the Tooth and lake drive.", stay: "Cinnamon Citadel", dining: "Welcome dinner", distanceKm: 120, drivingTime: "3h 15m" },
      { day: 2, title: "Kandy to Nuwara Eliya", location: "Nuwara Eliya", description: "Ramboda falls and tea factory tour.", stay: "The Grand Hotel", dining: "High tea & roast", distanceKm: 85, drivingTime: "2h 30m" },
      { day: 3, title: "Pekoe Trail Section Hike", location: "Hatton / Norwood", description: "Trek through century-old tea bushes with naturalist.", stay: "The Grand Hotel", dining: "Fireside supper", distanceKm: 45, drivingTime: "1h 15m" },
      { day: 4, title: "Scenic Train to Ella", location: "Ella", description: "Nine Arch Bridge and Little Adam's Peak.", stay: "98 Acres Resort", dining: "Ella Gap dining", distanceKm: 65, drivingTime: "2h 45m (Rail)" },
      { day: 5, title: "Ella to Udawalawe Elephants", location: "Udawalawe", description: "Elephant Transit Home baby elephant milk feeding and afternoon safari.", stay: "Grand Udawalawe Safari Resort", dining: "Bush buffet", distanceKm: 110, drivingTime: "2h 30m" },
      { day: 6, title: "Udawalawe to Mirissa Coast", location: "Mirissa", description: "Transfer to southern coast and sunset beach relaxation.", stay: "Cape Weligama", dining: "Seafood grill", distanceKm: 115, drivingTime: "2h 15m" },
      { day: 7, title: "Blue Whale Cruise & Galle Fort", location: "Mirissa to Galle", description: "Dawn whale observation, afternoon guided Galle Fort walking tour.", stay: "Jetwing Lighthouse", dining: "Ramparts sunset dinner", distanceKm: 40, drivingTime: "50m" },
      { day: 8, title: "Expressway to Airport", location: "Galle to Airport", description: "Expressway transfer to departure flight.", stay: "Departure", dining: "Breakfast", distanceKm: 155, drivingTime: "2h 15m" }
    ]
  },
  {
    id: 'tour-10-days',
    daysCount: 10,
    title: "10-Day The Grand Ceylon Island Panorama",
    subtitle: "Ancient Ruins, Cloud Forests, Leopards, Whales & Luxury Resorts",
    category: "Grand Island",
    travelerType: "All Travelers",
    routeDescription: "Colombo → Wilpattu → Anuradhapura → Sigiriya → Kandy → Ella → Yala → Mirissa → Galle → Colombo",
    totalKm: 1280,
    basePriceUSD: 1290,
    marketComparePriceUSD: 1580,
    image: "/src/assets/images/yala_safari_glamping_1792429747337.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Wilpattu, SL_COORDINATES.Anuradhapura, SL_COORDINATES.Sigiriya, SL_COORDINATES.Kandy, SL_COORDINATES.Ella, SL_COORDINATES.Yala, SL_COORDINATES.Mirissa, SL_COORDINATES.Galle, SL_COORDINATES.Colombo],
    highlights: [
      "Oldest sacred Bo Tree (Jaya Sri Maha Bodhi) in Anuradhapura",
      "Sigiriya Rock Fortress & Dambulla Golden Cave Temple",
      "Scenic mountain railway through clouds to Ella",
      "Comprehensive double safari drives in Yala National Park",
      "Deep sea whale watching & Dutch colonial history in Galle"
    ],
    inclusions: [
      "9 nights hand-picked 4-5 star luxury resort accommodations",
      "Exclusive private vehicle with senior SLTDA national guide",
      "2 full wildlife safari game drives in private 4x4 vehicles",
      "All entrance fees, train tickets, whale watching yacht passes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Colombo to Wilpattu Wilderness",
        location: "Colombo to Wilpattu",
        description: "Begin your journey traveling north towards the untouched wilderness of Wilpattu National Park, famous for its natural sand-rimmed water basins (villus).",
        stay: "Mahoora Tented Safari Camp Wilpattu",
        dining: "Campfire dinner under forest canopy",
        distanceKm: 170,
        drivingTime: "3h 45m"
      },
      {
        day: 2,
        title: "Anuradhapura Sacred Kingdom & Giant Stupas",
        location: "Wilpattu to Anuradhapura",
        description: "Explore the first ancient capital founded in 377 BC. Marvel at colossal brick stupas that rival the pyramids of Egypt and the 2,300-year-old sacred Bodhi tree.",
        stay: "Ulagalla by Uga Escapes / Heritage Anuradhapura",
        dining: "Agrarian organic rice and heirloom vegetable feast",
        distanceKm: 55,
        drivingTime: "1h 15m"
      },
      {
        day: 3,
        title: "Sigiriya Lion Rock Citadel Ascent",
        location: "Anuradhapura to Sigiriya",
        description: "Travel to Sigiriya. Climb through the giant lion paws to Kashyapa's royal summit and admire the world-renowned celestial frescoes painted on sheer granite.",
        stay: "Jetwing Vil Uyana / Cinnamon Lodge",
        dining: "Traditional lakefront dining",
        distanceKm: 75,
        drivingTime: "1h 30m"
      },
      {
        day: 4,
        title: "Polonnaruwa Medieval City & Minneriya Safari",
        location: "Sigiriya to Polonnaruwa & Back",
        description: "Cycle among royal palaces and Gal Vihara rock statues. Afternoon jeep safari to watch wild elephant herds socializing in the sunset.",
        stay: "Jetwing Vil Uyana",
        dining: "Curated multi-curry banquet",
        distanceKm: 110,
        drivingTime: "2h 15m"
      },
      {
        day: 5,
        title: "Dambulla Caves & Temple of the Tooth in Kandy",
        location: "Sigiriya to Kandy",
        description: "Explore Dambulla's 5 painted cave sanctuaries, visit a fragrant spice garden, and arrive in the royal hill capital of Kandy for evening temple ceremonies.",
        stay: "Cinnamon Citadel / Earl's Regency Kandy",
        dining: "Royal Kandyan feast with cultural drumming",
        distanceKm: 90,
        drivingTime: "2h 30m"
      },
      {
        day: 6,
        title: "Highland Train across Nine Arch Bridge to Ella",
        location: "Kandy to Ella",
        description: "Take Sri Lanka's legendary train ride winding through tea hills and waterfalls into picturesque Ella. Visit Nine Arch Bridge and hike Little Adam's Peak.",
        stay: "98 Acres Resort & Spa / EKHO Ella",
        dining: "Mountain view dining with Ceylon coffee",
        distanceKm: 135,
        drivingTime: "3h 45m"
      },
      {
        day: 7,
        title: "Ella Gap to Yala Leopard Sanctuary",
        location: "Ella to Yala",
        description: "Descend past Ravana Waterfall into the southeastern arid scrubland. Relax by the pool before an evening game drive in Yala National Park.",
        stay: "Jetwing Yala / Cinnamon Wild",
        dining: "Sand dune barbecue by the Indian Ocean",
        distanceKm: 120,
        drivingTime: "2h 45m"
      },
      {
        day: 8,
        title: "Morning Leopard Safari & Coastal Drive to Mirissa",
        location: "Yala to Mirissa",
        description: "Dawn safari tracking leopards and spotted deer. Journey along the sun-drenched southern coastline to the turquoise shores of Mirissa.",
        stay: "Weligama Bay Marriott Resort / Mandara Resort",
        dining: "Beachfront seafood barbecue with fresh lobster",
        distanceKm: 145,
        drivingTime: "2h 45m"
      },
      {
        day: 9,
        title: "Whale Watching & UNESCO Galle Dutch Fort",
        location: "Mirissa to Galle Fort",
        description: "Dawn boat cruise in search of blue whales and dolphins. Afternoon guided stroll through the cobblestone bastions and jewel boutiques of Galle Fort.",
        stay: "Jetwing Lighthouse / Amangalla",
        dining: "Sunset cocktails on fort ramparts & fine dining",
        distanceKm: 40,
        drivingTime: "55m"
      },
      {
        day: 10,
        title: "Bentota River Safari & Farewell Colombo",
        location: "Galle to Colombo Airport",
        description: "Madu river mangrove boat cruise, turtle hatchery visit, and swift expressway transfer to Colombo city or airport.",
        stay: "Departure",
        dining: "Farewell champagne breakfast",
        distanceKm: 140,
        drivingTime: "2h 00m"
      }
    ]
  },
  {
    id: 'tour-12-days',
    daysCount: 12,
    title: "12-Day Sacred Kingdoms, East Coast Bays & Highlands",
    subtitle: "Trincomalee pristine beaches, Sigiriya, Kandy, Pekoe trail & Yala",
    category: "Ramayana",
    travelerType: "All Travelers",
    routeDescription: "Negombo → Sigiriya → Trincomalee → Kandy → Nuwara Eliya → Yala → Weligama → Colombo",
    totalKm: 1540,
    basePriceUSD: 1580,
    marketComparePriceUSD: 1950,
    image: "/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg",
    routeWaypoints: [SL_COORDINATES.Negombo, SL_COORDINATES.Sigiriya, SL_COORDINATES.Trincomalee, SL_COORDINATES.Kandy, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Yala, SL_COORDINATES.Weligama, SL_COORDINATES.Colombo],
    highlights: [
      "Koneswaram Temple perched atop Swami Rock cliff in Trincomalee",
      "Pigeon Island National Park coral reef snorkeling with reef sharks",
      "Sigiriya Lion Rock & Dambulla Golden Caves",
      "Pekoe Trail section hike through Bogawantalawa valley",
      "Full leopard and elephant tracking in Yala and Bundala"
    ],
    inclusions: [
      "11 nights 5-star & boutique resort accommodations with half board",
      "Private boat to Pigeon Island and snorkeling equipment",
      "Dedicated luxury van with multilingual driver-guide",
      "All expressway tolls, national park passes, and temple entrance fees"
    ],
    itinerary: [
      { day: 1, title: "Negombo Coastal Welcome", location: "Airport to Negombo", description: "Arrive at airport and transfer to golden shores of Negombo for relaxation.", stay: "Jetwing Blue Negombo", dining: "Lagoon crab dinner", distanceKm: 25, drivingTime: "30m" },
      { day: 2, title: "Negombo to Sigiriya", location: "Negombo to Sigiriya", description: "Scenic inland journey to Cultural Triangle.", stay: "Aliya Resort Sigiriya", dining: "Village buffet", distanceKm: 150, drivingTime: "3h 45m" },
      { day: 3, title: "Sigiriya Lion Rock & Village Walk", location: "Sigiriya", description: "Ascend the rock palace at dawn, followed by traditional catamaran ride.", stay: "Aliya Resort", dining: "Claypot lunch", distanceKm: 30, drivingTime: "45m" },
      { day: 4, title: "East Coast Journey to Trincomalee", location: "Sigiriya to Trincomalee", description: "Cross to the turquoise waters of the east coast. Visit Koneswaram Hindu Temple.", stay: "Uga Jungle Beach Trincomalee", dining: "Seaside dining", distanceKm: 105, drivingTime: "2h 15m" },
      { day: 5, title: "Pigeon Island Coral Snorkeling", location: "Trincomalee", description: "Snorkel in crystal clear waters with harmless black-tip reef sharks and sea turtles.", stay: "Uga Jungle Beach", dining: "Catch of the day grilled feast", distanceKm: 20, drivingTime: "30m" },
      { day: 6, title: "Trincomalee to Royal Kandy", location: "Trincomalee to Kandy", description: "Scenic drive inland into hill capital. Evening Temple of the Tooth ceremony.", stay: "Cinnamon Citadel Kandy", dining: "Royal spice buffet", distanceKm: 180, drivingTime: "4h 00m" },
      { day: 7, title: "Botanical Gardens & Tea High Country", location: "Kandy to Nuwara Eliya", description: "Peradeniya royal palms and ascending through tea estates to Nuwara Eliya.", stay: "The Grand Hotel Nuwara Eliya", dining: "English high tea & dinner", distanceKm: 85, drivingTime: "2h 45m" },
      { day: 8, title: "Scenic Train to Ella & Nine Arch", location: "Nuwara Eliya to Ella", description: "Iconic blue mountain train ride and Nine Arch Bridge visit.", stay: "98 Acres Resort Ella", dining: "Ella Gap fusion menu", distanceKm: 65, drivingTime: "2h 45m (Rail)" },
      { day: 9, title: "Descent to Yala Leopard Sanctuary", location: "Ella to Yala", description: "Drive down to southern wilderness. Evening safari in Yala National Park.", stay: "Jetwing Yala", dining: "Bush bonfire dinner", distanceKm: 120, drivingTime: "2h 45m" },
      { day: 10, title: "Yala to Weligama & Mirissa Coast", location: "Yala to Weligama", description: "Morning birdwatching in Bundala wetlands, then drive to golden southern beaches.", stay: "Cape Weligama", dining: "Oceanfront dining", distanceKm: 150, drivingTime: "2h 50m" },
      { day: 11, title: "Galle Fort Architectural Tour", location: "Weligama & Galle", description: "Wander UNESCO Galle Fort ramparts, clock tower, and artisan jewelers.", stay: "Cape Weligama", dining: "Ramparts sunset banquet", distanceKm: 40, drivingTime: "50m" },
      { day: 12, title: "Expressway Transfer to Colombo / Airport", location: "Weligama to Colombo Airport", description: "Smooth Southern Expressway drive for city shopping and flight departure.", stay: "Departure", dining: "Tropical farewell brunch", distanceKm: 170, drivingTime: "2h 15m" }
    ]
  },
  {
    id: 'tour-14-days',
    daysCount: 14,
    title: "14-Day Comprehensive Ceylon Odyssey",
    subtitle: "Ancient Cities, East Coast, Tea Estates, Rainforest & Leopards",
    category: "Grand Island",
    travelerType: "All Travelers",
    routeDescription: "Colombo → Wilpattu → Anuradhapura → Sigiriya → Trincomalee → Kandy → Nuwara Eliya → Ella → Yala → Sinharaja → Galle → Colombo",
    totalKm: 1880,
    basePriceUSD: 1980,
    marketComparePriceUSD: 2450,
    image: "/src/assets/images/yala_safari_glamping_1792429747337.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Wilpattu, SL_COORDINATES.Anuradhapura, SL_COORDINATES.Sigiriya, SL_COORDINATES.Trincomalee, SL_COORDINATES.Kandy, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Ella, SL_COORDINATES.Yala, SL_COORDINATES.Sinharaja, SL_COORDINATES.Galle, SL_COORDINATES.Colombo],
    highlights: ["Sinharaja Rainforest UNESCO biosphere trekking", "Pigeon Island marine snorkeling", "Sigiriya Lion Rock ascent", "Double safaris in Yala & Wilpattu"],
    inclusions: ["13 nights luxury 4-5 star hotels with breakfast and dinner", "All private 4x4 safari jeeps", "Highland scenic train first-class seats"],
    itinerary: [
      { day: 1, title: "Colombo Welcome", location: "Colombo", description: "Arrival and rest.", stay: "Galle Face Hotel", dining: "Dinner", distanceKm: 35, drivingTime: "45m" },
      { day: 2, title: "Colombo to Wilpattu", location: "Wilpattu", description: "Leopard safari.", stay: "Mahoora Camp", dining: "Campfire", distanceKm: 170, drivingTime: "3h 45m" },
      { day: 3, title: "Anuradhapura Stupas", location: "Anuradhapura", description: "Ruins exploration.", stay: "Ulagalla", dining: "Feast", distanceKm: 55, drivingTime: "1h 15m" },
      { day: 4, title: "Sigiriya Lion Citadel", location: "Sigiriya", description: "Dawn climb.", stay: "Jetwing Vil Uyana", dining: "Paddy dining", distanceKm: 75, drivingTime: "1h 30m" },
      { day: 5, title: "Polonnaruwa & Minneriya", location: "Polonnaruwa", description: "Elephants gathering.", stay: "Jetwing Vil Uyana", dining: "Curry buffet", distanceKm: 90, drivingTime: "2h 00m" },
      { day: 6, title: "To Trincomalee Coast", location: "Trincomalee", description: "Koneswaram Temple.", stay: "Uga Jungle Beach", dining: "Seafood", distanceKm: 105, drivingTime: "2h 15m" },
      { day: 7, title: "Pigeon Island Snorkeling", location: "Trincomalee", description: "Coral reef marine tour.", stay: "Uga Jungle Beach", dining: "Beach BBQ", distanceKm: 20, drivingTime: "30m" },
      { day: 8, title: "Trinco to Kandy Citadel", location: "Kandy", description: "Temple of the Tooth.", stay: "Earl's Regency", dining: "Royal dinner", distanceKm: 180, drivingTime: "4h 00m" },
      { day: 9, title: "Kandy to Nuwara Eliya", location: "Nuwara Eliya", description: "Tea factory tour.", stay: "The Grand Hotel", dining: "British roast", distanceKm: 85, drivingTime: "2h 45m" },
      { day: 10, title: "Highland Train to Ella", location: "Ella", description: "Nine Arch Bridge.", stay: "98 Acres", dining: "Valley dinner", distanceKm: 65, drivingTime: "2h 45m (Rail)" },
      { day: 11, title: "Ella to Yala Safari", location: "Yala", description: "Afternoon game drive.", stay: "Jetwing Yala", dining: "Bush dinner", distanceKm: 120, drivingTime: "2h 45m" },
      { day: 12, title: "Yala to Sinharaja Rainforest", location: "Sinharaja", description: "Primary rainforest trek.", stay: "Rainforest Eco Lodge", dining: "Canopy dinner", distanceKm: 145, drivingTime: "3h 30m" },
      { day: 13, title: "Sinharaja to Galle Fort", location: "Galle", description: "Ramparts sunset stroll.", stay: "Jetwing Lighthouse", dining: "Seafood dinner", distanceKm: 85, drivingTime: "2h 00m" },
      { day: 14, title: "Expressway to Airport", location: "Airport", description: "Departure transfer.", stay: "Departure", dining: "Breakfast", distanceKm: 150, drivingTime: "2h 15m" }
    ]
  },
  {
    id: 'tour-15-days',
    daysCount: 15,
    title: "15-Day The Ultimate Sovereign Grand Expedition",
    subtitle: "Complete Island Odyssey: North, East, Cultural Triangle, Tea Highlands & Wild South",
    category: "Grand Island",
    travelerType: "All Travelers",
    routeDescription: "Colombo → Wilpattu → Anuradhapura → Jaffna → Trincomalee → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Sinharaja → Galle → Colombo",
    totalKm: 2120,
    basePriceUSD: 2180,
    marketComparePriceUSD: 2750,
    image: "/src/assets/images/sigiriya_royal_fortress_1792429746675.jpg",
    routeWaypoints: [SL_COORDINATES.Colombo, SL_COORDINATES.Wilpattu, SL_COORDINATES.Anuradhapura, SL_COORDINATES.Jaffna, SL_COORDINATES.Trincomalee, SL_COORDINATES.Sigiriya, SL_COORDINATES.Kandy, SL_COORDINATES.NuwaraEliya, SL_COORDINATES.Ella, SL_COORDINATES.Yala, SL_COORDINATES.Sinharaja, SL_COORDINATES.Galle, SL_COORDINATES.Colombo],
    highlights: [
      "Jaffna Peninsula: Nallur Kandaswamy Kovil, Jaffna Fort & Delft Island wild horses",
      "Pristine east coast beaches in Trincomalee & Pigeon Island snorkeling",
      "Anuradhapura & Polonnaruwa ancient kingdoms",
      "Sigiriya Lion Rock ascent & Minneriya elephant gathering",
      "Pekoe Trail section, scenic mountain train, and tea estate stays",
      "Yala leopard safari & Sinharaja UNESCO virgin rainforest trekking",
      "Blue whale observation & UNESCO Galle Fort colonial living"
    ],
    inclusions: [
      "14 nights luxury 5-star & boutique heritage accommodations",
      "Private luxury vehicle with senior national tourist guide throughout",
      "All ferry passes, train observation seats, 4x4 safari jeeps, and boat charters",
      "Comprehensive entrance permits to all 8 UNESCO World Heritage sites in Sri Lanka"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Colombo", location: "Airport to Colombo", description: "VIP airport reception and colonial city orientation.", stay: "Cinnamon Grand / Galle Face Hotel", dining: "Welcome dinner", distanceKm: 35, drivingTime: "45m" },
      { day: 2, title: "Colombo to Wilpattu Safari", location: "Colombo to Wilpattu", description: "Drive north to Wilpattu National Park for afternoon safari.", stay: "Mahoora Camp Wilpattu", dining: "Jungle dinner", distanceKm: 170, drivingTime: "3h 45m" },
      { day: 3, title: "Anuradhapura to Jaffna Peninsula", location: "Anuradhapura to Jaffna", description: "Visit ancient sacred ruins, then cross Elephant Pass into vibrant northern Jaffna.", stay: "Jetwing Jaffna", dining: "Authentic Jaffna crab curry", distanceKm: 195, drivingTime: "4h 00m" },
      { day: 4, title: "Jaffna Heritage & Delft Island", location: "Jaffna", description: "Ferry to Delft Island with wild ponies and baobab trees; visit Nallur Kovil.", stay: "Jetwing Jaffna", dining: "Northern delicacies", distanceKm: 60, drivingTime: "1h 30m" },
      { day: 5, title: "Jaffna to Trincomalee East Coast", location: "Jaffna to Trincomalee", description: "Travel along coastal roads to pristine Nilaveli beach in Trincomalee.", stay: "Uga Jungle Beach", dining: "Seaside barbecue", distanceKm: 235, drivingTime: "4h 30m" },
      { day: 6, title: "Pigeon Island Snorkeling & Koneswaram", location: "Trincomalee", description: "Reef snorkeling and visiting the cliffside temple.", stay: "Uga Jungle Beach", dining: "Tropical grill", distanceKm: 35, drivingTime: "50m" },
      { day: 7, title: "Trincomalee to Sigiriya Cultural Triangle", location: "Trincomalee to Sigiriya", description: "Journey into the Cultural Triangle, evening rural village tour.", stay: "Jetwing Vil Uyana", dining: "Organic paddy feast", distanceKm: 105, drivingTime: "2h 15m" },
      { day: 8, title: "Sigiriya Lion Rock & Polonnaruwa", location: "Sigiriya & Polonnaruwa", description: "Dawn ascent of King Kashyapa's palace, afternoon royal ruins of Polonnaruwa.", stay: "Jetwing Vil Uyana", dining: "Heritance supper", distanceKm: 90, drivingTime: "2h 00m" },
      { day: 9, title: "Dambulla Caves to Royal Kandy", location: "Sigiriya to Kandy", description: "Cave temples of Dambulla, spice gardens, and sacred Temple of the Tooth in Kandy.", stay: "Grand Kandyan Hotel", dining: "Royal Kandyan dinner", distanceKm: 90, drivingTime: "2h 30m" },
      { day: 10, title: "Kandy to Nuwara Eliya Tea Country", location: "Kandy to Nuwara Eliya", description: "Ascend past tea carpets and waterfalls into colonial Nuwara Eliya.", stay: "The Grand Hotel", dining: "High tea & British roast", distanceKm: 85, drivingTime: "2h 45m" },
      { day: 11, title: "Scenic Mountain Train to Ella", location: "Nuwara Eliya to Ella", description: "Spectacular rail passage over Nine Arch Bridge; Little Adam's Peak hike.", stay: "98 Acres Resort", dining: "Panoramic valley dinner", distanceKm: 65, drivingTime: "2h 45m (Rail)" },
      { day: 12, title: "Ella to Yala National Park", location: "Ella to Yala", description: "Descend into southern scrub jungle for thrilling leopard tracking safari.", stay: "Jetwing Yala", dining: "Dune bonfire feast", distanceKm: 120, drivingTime: "2h 45m" },
      { day: 13, title: "Yala to Sinharaja Rainforest", location: "Yala to Sinharaja", description: "Drive to the UNESCO Sinharaja Biosphere. Guided trek for endemic birds and flora.", stay: "Rainforest Eco Lodge", dining: "Canopy terrace dinner", distanceKm: 145, drivingTime: "3h 30m" },
      { day: 14, title: "Sinharaja to Galle Fort & Mirissa", location: "Sinharaja to Galle", description: "Descend to the southern coast. Savor sunset walks on the 400-year-old Galle ramparts.", stay: "Jetwing Lighthouse Galle", dining: "Celebratory seafood banquet", distanceKm: 85, drivingTime: "2h 00m" },
      { day: 15, title: "Coastal Expressway Return to Colombo", location: "Galle to Colombo Airport", description: "Morning ocean dip, souvenir shopping at Dutch Hospital, and VIP transfer to airport.", stay: "Departure", dining: "Farewell champagne brunch", distanceKm: 150, drivingTime: "2h 15m" }
    ]
  }
];

// Compatibility aliases
export type Expedition = TourPackage & { basePrice: number; summary: string; duration: string };
export const EXPEDITIONS: Expedition[] = TOUR_PACKAGES.map(t => ({
  ...t,
  basePrice: t.basePriceUSD,
  summary: t.subtitle,
  duration: `${t.daysCount} Days (${t.totalKm} km)`
}));

// 18 Major Destinations across all Provinces & Districts
export const DESTINATION_DISTRICTS: MainDestinationDistrict[] = [
  {
    id: 'colombo-gampaha',
    name: "Colombo & Negombo",
    sinhalaName: "කොළඹ සහ මීගමුව",
    province: "Western Province",
    district: "Colombo & Gampaha Districts",
    x: 28,
    y: 62,
    image: "/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg",
    tagline: "Vibrant capital pulse, colonial trading ports & coastal lagoons",
    overview: "Sri Lanka's oceanfront metropolis blends British colonial landmarks, ancient Buddhist temples, modern rooftop sky bars, and the bustling fishing lagoons of Negombo.",
    bestSeason: "Year-Round (Best Nov – Apr)",
    travelTimeFromColombo: "Direct Hub / 20 mins from BIA",
    culturalExperiences: ["National Museum & Royal Throne", "Gangaramaya Floating Temple", "Old Dutch Hospital precinct"],
    wildlifeActivities: ["Muthurajawela Wetland Bird Sanctuary", "Negombo Lagoon Catamaran Cruise"],
    subDestinations: [
      { name: "Gangaramaya Temple & Seema Malaka", category: "Sacred Culture", distanceFromHub: "2 km from city center", description: "Stunning floating temple designed by Geoffrey Bawa on Beira Lake.", mustSee: "Ancient relics & museum" },
      { name: "Galle Face Green Promenade", category: "City Leisure", distanceFromHub: "1 km from Fort", description: "Historic oceanside promenade famous for street food like crispy Isso Wade.", mustSee: "Sunset ocean walk" },
      { name: "Negombo Fishing Lagoon & Catamarans", category: "Coastal Heritage", distanceFromHub: "35 km north of Colombo", description: "Traditional oruwa sailing catamarans and lively morning fish market.", mustSee: "Dawn boat harbor" },
      { name: "National Museum of Colombo", category: "Historical", distanceFromHub: "3 km from Fort", description: "Houses the jewel-encrusted royal throne of the King of Kandy.", mustSee: "Royal crown & regalia" },
      { name: "Kelaniya Raja Maha Vihara", category: "Ancient Buddhist", distanceFromHub: "10 km east", description: "Hallowed temple sanctified by the third visit of the Buddha to Sri Lanka.", mustSee: "Solias Mendis frescoes" }
    ],
    recommendedHotels: ["Jetwing Colombo Seven", "Jetwing Blue Negombo", "Jetwing Lagoon", "Galle Face Hotel", "Cinnamon Grand"],
    recommendedDining: ["Ministry of Crab", "The Lagoon", "Nuga Gama at Cinnamon Grand", "Tivmoti Lounge Negombo"]
  },
  {
    id: 'kandy-central',
    name: "Kandy (Maha Nuwara)",
    sinhalaName: "මහනුවර",
    province: "Central Province",
    district: "Kandy District",
    x: 50,
    y: 56,
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    tagline: "The last royal hill stronghold, sacred relics & mist-clad ridges",
    overview: "Nestled in the lush hills, Kandy was the final sovereign kingdom to fall to British colonial rule in 1815. It remains the spiritual and cultural heart of Sri Lanka.",
    bestSeason: "December to April & July to August (Esala Perahera)",
    travelTimeFromColombo: "3h 15m via Central Highway",
    culturalExperiences: ["Sacred Tooth Relic Puja", "Kandyan Traditional Drumming & Fire-Walking", "Embekke Medieval Woodcarvings"],
    wildlifeActivities: ["Peradeniya Royal Botanicals Bats & Birds", "Hanthana Mountain Nature Walks"],
    subDestinations: [
      { name: "Sri Dalada Maligawa (Temple of the Tooth)", category: "UNESCO World Heritage", distanceFromHub: "City center", description: "Enshrines the sacred tooth relic of Gautama Buddha with golden roof.", mustSee: "Evening Thevava ceremony" },
      { name: "Royal Botanical Gardens Peradeniya", category: "Flora & Nature", distanceFromHub: "5 km west", description: "147 acres featuring 4,000 plant species, giant Javan fig trees, and orchid houses.", mustSee: "Royal Palm Avenue" },
      { name: "Hanthana Mountain Range", category: "Hiking & Pekoe Trail", distanceFromHub: "8 km south", description: "Breathtaking rolling peaks and Stage 1 of the world-famous Pekoe Trail.", mustSee: "Ceylon Tea Museum" },
      { name: "Knuckles Conservation Forest", category: "UNESCO Wilderness", distanceFromHub: "35 km north-east", description: "Rugged cloud forests, cascading waterfalls, and endemic highland amphibians.", mustSee: "Corbett's Gap vista" },
      { name: "Gadaladeniya & Embekke Devalaya", category: "14th Century Craft", distanceFromHub: "12 km south-west", description: "Masterful woodcarvings depicting medieval acrobats and mythical swans.", mustSee: "Embekke carved wooden pillars" }
    ],
    recommendedHotels: ["Jetwing Kandy Gallery", "Amaya Hills", "Cinnamon Citadel", "The Grand Kandyan"],
    recommendedDining: ["White House Restaurant Kandy", "Balaji Dosai", "The Kandy Club", "Helga's Folly"]
  },
  {
    id: 'sigiriya-dambulla',
    name: "Sigiriya & Dambulla",
    sinhalaName: "සීගිරිය සහ දඹුල්ල",
    province: "Central / North-Central",
    district: "Matale & Anuradhapura Border",
    x: 52,
    y: 39,
    image: "/src/assets/images/sigiriya_royal_fortress_1792429746675.jpg",
    tagline: "Sky palaces, painted golden caves & ancient monastic marvels",
    overview: "A land of epic proportions where 5th-century kings erected sky fortresses above emerald jungles and monks carved timeless monasteries into living rock.",
    bestSeason: "January to September",
    travelTimeFromColombo: "3h 45m via Kurunegala Road",
    culturalExperiences: ["King Kashyapa 5th Century Citadel", "Dambulla 5 Rock Caverns", "Ritigala Forest Monastic Ruins"],
    wildlifeActivities: ["Minneriya Wild Elephant Gathering", "Kaudulla Sunset Elephant Safari", "Kandalama Lake Birdwatching"],
    subDestinations: [
      { name: "Sigiriya Lion Rock Fortress", category: "UNESCO Wonder", distanceFromHub: "Hub center", description: "200m vertical monolith with water gardens, mirror wall, and sky palace ruins.", mustSee: "Celestial maiden frescoes" },
      { name: "Pidurangala Rock", category: "Scenic Sunrise Hike", distanceFromHub: "2 km from Sigiriya", description: "Challenging climb offering the premier panoramic sunrise view of Sigiriya.", mustSee: "Dawn 360-degree viewpoint" },
      { name: "Dambulla Royal Rock Cave Temple", category: "UNESCO Monastic", distanceFromHub: "18 km south", description: "Five cliff caverns with 153 Buddha statues beneath 2,000 sq meters of painted ceilings.", mustSee: "Golden reclining Buddha" },
      { name: "Minneriya & Kaudulla National Parks", category: "Wildlife Gathering", distanceFromHub: "25 km north-east", description: "Famous for 'The Elephant Gathering' with up to 300 Asian elephants.", mustSee: "Sunset elephant herds" },
      { name: "Ritigala Strict Nature Reserve", category: "Hermitage Ruins", distanceFromHub: "30 km north", description: "Mysterious 1st-century BC forest monastery steeped in Ramayana mythology.", mustSee: "Sunken medicinal baths" }
    ],
    recommendedHotels: ["Jetwing Vil Uyana", "Jetwing Lake Dambulla", "Aliya Resort", "Heritance Kandalama"],
    recommendedDining: ["Apsara Restaurant Vil Uyana", "Gamagedara Traditional Village Feast", "Kandalama Forest Buffet"]
  },
  {
    id: 'nuwara-eliya-ella',
    name: "Nuwara Eliya & Ella Highlands",
    sinhalaName: "නුවරඑළිය සහ ඇල්ල",
    province: "Central Highlands & Uva",
    district: "Nuwara Eliya & Badulla Districts",
    x: 58,
    y: 67,
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    tagline: "Crisp mountain air, world-famous train viaducts & emerald tea estates",
    overview: "Rising up to 2,000 meters, this is the tea engine of Sri Lanka. Tudor-style colonial chalets, rushing waterfalls, and bohemian mountain towns overlook cloud-filled gaps.",
    bestSeason: "December to May",
    travelTimeFromColombo: "4h 30m via Gampola",
    culturalExperiences: ["1888 Colonial Planters Living", "Pedro Tea Processing", "Highland Railway Heritage"],
    wildlifeActivities: ["Horton Plains Sambar Deer & Cloud Forest Birds", "Baker's Falls & World's End precipice"],
    subDestinations: [
      { name: "Nine Arch Bridge Demodara", category: "Colonial Engineering", distanceFromHub: "3 km from Ella town", description: "A towering viaduct built purely of stone and brick with no steel.", mustSee: "Blue train crossing" },
      { name: "Little Adam's Peak & Ella Rock", category: "Hiking & Panorama", distanceFromHub: "2.5 km from Ella", description: "Gentle and dramatic hiking trails overlooking the southern plains.", mustSee: "Sunrise over Ella Gap" },
      { name: "Horton Plains & World's End", category: "Highland Cloud Forest", distanceFromHub: "28 km from Nuwara Eliya", description: "Montane plateau terminating at a sheer 880-meter vertical drop.", mustSee: "Baker's Falls & World's End" },
      { name: "Pedro & Damro Tea Estates", category: "Ceylon Tea Culture", distanceFromHub: "4 km from town", description: "Working orthodox tea factories producing world-class Ceylon black tea.", mustSee: "Fresh factory tea cupping" },
      { name: "Ravana Falls & Cave", category: "Waterfalls & Folklore", distanceFromHub: "6 km from Ella", description: "Cascading 25-meter waterfall tied to King Ravana in the Ramayana epic.", mustSee: "Waterfall plunge pool" }
    ],
    recommendedHotels: ["Jetwing St. Andrew's", "98 Acres Resort & Spa", "Heritance Tea Factory", "The Grand Hotel"],
    recommendedDining: ["Barnes Hall Nuwara Eliya", "Cafe Chill Ella", "19th Hole Hill Club", "The Grand Indian"]
  },
  {
    id: 'galle-southern-coast',
    name: "Galle, Bentota & Mirissa",
    sinhalaName: "ගාල්ල සහ දකුණු වෙරළ",
    province: "Southern Province",
    district: "Galle & Matara Districts",
    x: 36,
    y: 90,
    image: "/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg",
    tagline: "Dutch fort bastions, sapphire ocean swells & blue whale trenches",
    overview: "Asia's best-preserved European fortified citadel, bordered by pristine golden beaches, cinnamon lakes, and the deep ocean shelf where blue whales roam.",
    bestSeason: "November to April",
    travelTimeFromColombo: "1h 45m via Southern Expressway",
    culturalExperiences: ["Galle Dutch Fort 400-Year Ramparts", "Gemology & Blue Sapphire Appraisal", "Traditional Cinnamon Peeling"],
    wildlifeActivities: ["Mirissa Blue Whale Deep Sea Trench", "Kosgoda Sea Turtle Conservation", "Madu River Mangroves"],
    subDestinations: [
      { name: "Galle Dutch Fort UNESCO Citadel", category: "Colonial Fortress", distanceFromHub: "Galle City", description: "400-year-old bastion town with Dutch Reformed Church and lighthouse.", mustSee: "Ramparts sunset stroll" },
      { name: "Mirissa Continental Shelf", category: "Whale Watching", distanceFromHub: "35 km east of Galle", description: "World's most reliable location to observe migratory blue whales and dolphins.", mustSee: "Sunrise catamaran charter" },
      { name: "Weligama Stilt Fishermen & Surf Bay", category: "Coastal Life & Surfing", distanceFromHub: "28 km east", description: "Ancient acrobatic stilt fishing and gentle surf breaks for beginners.", mustSee: "Stilt fishing at dusk" },
      { name: "Madu Ganga River Wetland", category: "Biodiversity Mangroves", distanceFromHub: "30 km north of Galle", description: "River safari winding through 64 islands, cinnamon peeling demonstrations.", mustSee: "Cinnamon island demonstration" },
      { name: "Kosgoda Sea Turtle Conservation", category: "Wildlife Stewardship", distanceFromHub: "40 km north", description: "Hatchery protecting endangered Olive Ridley, Green, and Leatherback turtles.", mustSee: "Evening baby turtle release" }
    ],
    recommendedHotels: ["Jetwing Lighthouse Galle", "Jetwing Kurulubedda", "Amangalla", "Cape Weligama", "Jetwing Saman Villas"],
    recommendedDining: ["The Cinnamon Room Lighthouse", "Fortaleza Galle", "A Minute by Tuk Tuk", "Poonie's Kitchen"]
  },
  {
    id: 'yala-ruhuna',
    name: "Yala & Bundala Wilderness",
    sinhalaName: "යාල සහ රුහුණු වනෝද්‍යානය",
    province: "Southern & Uva Provinces",
    district: "Hambantota District",
    x: 74,
    y: 82,
    image: "/src/assets/images/yala_safari_glamping_1792429747337.jpg",
    tagline: "Apex leopards, coastal sand dunes & rare migratory bird wetlands",
    overview: "Sri Lanka's flagship wildlife sanctuary boasts one of the highest densities of leopards in the world, where dry thorn scrub crashes directly into the roaring Indian Ocean.",
    bestSeason: "February to October",
    travelTimeFromColombo: "4h 00m via Mattala Expressway",
    culturalExperiences: ["Kataragama Multi-Faith Sacred Shrine", "Sithulpawwa Ancient Monastic Cave"],
    wildlifeActivities: ["Yala Block 1 Leopard Tracking", "Bundala Ramsar Flamingo Birdwatching", "Kumana Mangrove Heronries"],
    subDestinations: [
      { name: "Yala National Park (Block 1 & 5)", category: "Leopard Safari", distanceFromHub: "Tissamaharama", description: "Famous for Panthera pardus kotiya, wild elephants, and sloth bears.", mustSee: "Early dawn leopard tracking" },
      { name: "Bundala Ramsar Wetland", category: "Avian Sanctuary", distanceFromHub: "20 km west of Yala", description: "Internationally recognized bird sanctuary hosting thousands of flamingos.", mustSee: "Migratory flock birdwatching" },
      { name: "Kataragama Sacred Shrine", category: "Multi-Faith Pilgrimage", distanceFromHub: "18 km north", description: "Sacred shrine venerated by Buddhists, Hindus, and indigenous Veddas.", mustSee: "Night puja drum ceremonies" },
      { name: "Kumana National Park", category: "Water Bird Wetland", distanceFromHub: "Eastern border of Yala", description: "Mangrove lagoons nesting painted storks, spoonbills, and pelicans.", mustSee: "Kumana Villu bird rookery" },
      { name: "Kirinda Offshore Lighthouse & Reef", category: "Coastal Heritage", distanceFromHub: "10 km south of Yala", description: "Granite headland tied to Queen Viharamahadevi with wild ocean breakers.", mustSee: "Ocean cliff temple" }
    ],
    recommendedHotels: ["Jetwing Yala", "Cinnamon Wild Yala", "Wild Coast Tented Lodge", "Uga Chena Huts"],
    recommendedDining: ["The Thambapanni Restaurant Yala", "Campfire Bush Grill", "Smoky Kitchen Tissamaharama"]
  }
];

// Airport Transfer Rates (BIA Katunayake, MRIA Mattala, RML Ratmalana, JAF Jaffna)
export const AIRPORT_RATES: AirportRate[] = [
  { destinationId: 'colombo-city', destinationName: "Colombo City Center (Fort / Col 03 / Col 07)", distanceKm: 35, drivingTime: "40 mins", sedanUSD: 35, luxuryVanUSD: 55, suvUSD: 75, coachUSD: 110 },
  { destinationId: 'negombo-beach', destinationName: "Negombo Beach Road Hotels", distanceKm: 12, drivingTime: "20 mins", sedanUSD: 20, luxuryVanUSD: 35, suvUSD: 50, coachUSD: 75 },
  { destinationId: 'kandy', destinationName: "Kandy (Hill Capital)", distanceKm: 115, drivingTime: "2h 45m", sedanUSD: 68, luxuryVanUSD: 95, suvUSD: 130, coachUSD: 180 },
  { destinationId: 'galle-fort', destinationName: "Galle Fort & Unawatuna", distanceKm: 155, drivingTime: "1h 50m", sedanUSD: 78, luxuryVanUSD: 110, suvUSD: 145, coachUSD: 210 },
  { destinationId: 'bentota', destinationName: "Bentota / Beruwala / Aluthgama", distanceKm: 110, drivingTime: "1h 30m", sedanUSD: 60, luxuryVanUSD: 85, suvUSD: 115, coachUSD: 165 },
  { destinationId: 'weligama-mirissa', destinationName: "Weligama & Mirissa Bay", distanceKm: 175, drivingTime: "2h 10m", sedanUSD: 88, luxuryVanUSD: 125, suvUSD: 160, coachUSD: 230 },
  { destinationId: 'nuwara-eliya', destinationName: "Nuwara Eliya (Tea Country)", distanceKm: 165, drivingTime: "4h 15m", sedanUSD: 85, luxuryVanUSD: 120, suvUSD: 160, coachUSD: 220 },
  { destinationId: 'ella', destinationName: "Ella Mountain Village", distanceKm: 210, drivingTime: "4h 45m", sedanUSD: 98, luxuryVanUSD: 140, suvUSD: 185, coachUSD: 260 },
  { destinationId: 'sigiriya-dambulla', destinationName: "Sigiriya & Dambulla (Cultural Triangle)", distanceKm: 148, drivingTime: "3h 30m", sedanUSD: 75, luxuryVanUSD: 105, suvUSD: 140, coachUSD: 195 },
  { destinationId: 'yala', destinationName: "Yala National Park & Tissamaharama", distanceKm: 245, drivingTime: "3h 45m", sedanUSD: 120, luxuryVanUSD: 165, suvUSD: 220, coachUSD: 310 },
  { destinationId: 'trincomalee', destinationName: "Trincomalee / Nilaveli Beach", distanceKm: 240, drivingTime: "4h 30m", sedanUSD: 115, luxuryVanUSD: 160, suvUSD: 210, coachUSD: 295 },
  { destinationId: 'arugam-bay', destinationName: "Arugam Bay (East Coast Surf)", distanceKm: 310, drivingTime: "5h 30m", sedanUSD: 145, luxuryVanUSD: 195, suvUSD: 260, coachUSD: 360 }
];

// Experiences Model for Section 10
export const EXPERIENCES_LIST: ExperienceItem[] = [
  {
    id: 'scenic-train-journey',
    title: "World-Famous Blue Mountain Rail Passage",
    category: "Scenic Rail Journey",
    duration: "3.5 Hours",
    location: "Kandy to Nanu Oya & Ella",
    description: "Reserved 1st-class observation seats winding through dramatic mist-covered tea viaducts and rushing waterfalls.",
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    priceUSD: 45,
    isIncludedInTours: true
  },
  {
    id: 'yala-leopard-safari',
    title: "Private Open-Top Leopard & Sloth Bear Safari",
    category: "Wildlife Adventures",
    duration: "Half-Day / Full-Day",
    location: "Yala National Park Block 1 & 5",
    description: "Custom modified 4x4 Land Cruiser with telephoto stabilization mounts, led by a veteran park tracker.",
    image: "/src/assets/images/yala_safari_glamping_1792429747337.jpg",
    priceUSD: 95,
    isIncludedInTours: true
  },
  {
    id: 'blue-whale-expedition',
    title: "Deep Sea Blue Whale & Dolphin Catamaran Charter",
    category: "Marine & Coast",
    duration: "4 Hours at Dawn",
    location: "Mirissa Continental Shelf",
    description: "Observe earth's largest living mammal feeding in the nutrient-rich deep trenches off the southern coast.",
    image: "/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg",
    priceUSD: 85,
    isIncludedInTours: true
  },
  {
    id: 'sigiriya-ballooning',
    title: "Sunrise Hot Air Balloon Flight over Kandalama",
    category: "Aerial & Luxury",
    duration: "60 mins flight + Champagne",
    location: "Kandalama & Sigiriya",
    description: "Drift serenely at dawn as mist lifts from ancient irrigation reservoirs and reveals the dramatic rock citadel.",
    image: "/src/assets/images/sigiriya_royal_fortress_1792429746675.jpg",
    priceUSD: 240,
    isIncludedInTours: false
  },
  {
    id: 'pekoe-trail-trek',
    title: "Guided Pekoe Trail Section 2 Mountain Hike",
    category: "Trekking & Adventure",
    duration: "4 Hours",
    location: "Norwood & Bogawantalawa",
    description: "Walk the historic footpaths of colonial planters, through cloud forests and mountain tea estates.",
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    priceUSD: 55,
    isIncludedInTours: true
  },
  {
    id: 'ayurvedic-panchakarma',
    title: "Traditional Royal Ayurvedic Shirodhara Ritual",
    category: "Wellness & Ayurveda",
    duration: "2.5 Hours",
    location: "Boutique Ayurvedic Sanctuaries",
    description: "Authentic physician consultation, warm medicated herbal oil body purification, and herbal steam bath.",
    image: "/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg",
    priceUSD: 85,
    isIncludedInTours: false
  }
];

// Customer Reviews & Trust
export const CUSTOMER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    author: "Jonathan & Claire Vance",
    country: "United Kingdom",
    flag: "🇬🇧",
    tourTaken: "10-Day Grand Ceylon Island Panorama",
    rating: 5,
    date: "October 2026",
    comment: "Sunketh Tours provided the holiday of our lifetimes. Our chauffeur-guide Nimal was courteous, punctual, and found us four leopards in Yala! Every hotel room was ready, the vehicle was spotless, and the price was completely transparent."
  },
  {
    id: 'rev-2',
    author: "Dr. Matthias & Anja Weber",
    country: "Germany",
    flag: "🇩🇪",
    tourTaken: "07-Day Classic Heritage & Wildlife Odyssey",
    rating: 5,
    date: "September 2026",
    comment: "The best travel company we have used in Asia. The online itinerary matching the Sri Lankan route map with exact driving times gave us tremendous confidence. Highly recommended!"
  },
  {
    id: 'rev-3',
    author: "Sophie Laurent",
    country: "France",
    flag: "🇫🇷",
    tourTaken: "05-Day Highland Tea & Train Escapade",
    rating: 5,
    date: "August 2026",
    comment: "Traveling solo as a woman, safety was my priority. Sunketh Tours exceeded all expectations. My driver felt like family and the Pekoe trail trek was breathtaking."
  }
];

// Frequently Asked Questions
export const FAQ_LIST: FAQItem[] = [
  {
    q: "How do tourist visas (ETA) work for traveling to Sri Lanka?",
    a: "Most international visitors can conveniently apply online for an Electronic Travel Authorization (ETA) via the official Sri Lankan immigration portal before arrival. Visas are typically granted within 24 hours.",
    category: "Visas & Entry"
  },
  {
    q: "Are driver meals, accommodation, and highway tolls included in the tour price?",
    a: "Yes! 100% of driver meals, accommodation allowances, vehicle fuel, parking charges, and expressway highway toll tickets are fully included in all Sunketh Tours packages. There are zero hidden fees.",
    category: "Inclusions"
  },
  {
    q: "Can we customize an existing tour route or choose our own hotels?",
    a: "Absolutely. All tours at Sunketh Tours are 100% private. You can customize travel dates, swap hotels, add extra nights, or design an entirely bespoke journey with our concierge.",
    category: "Customization"
  },
  {
    q: "What vehicle will be provided for our private tour?",
    a: "Depending on your party size, we provide modern air-conditioned Toyota sedans (1-3 guests), luxury high-roof vans (Toyota KDH for 4-7 guests), or luxury Toyota Land Cruiser Prado 4x4 SUVs.",
    category: "Vehicles"
  }
];

// Compatibility exports
export interface AddOnOption {
  id: string;
  name: string;
  category: 'aviation' | 'excursion' | 'wellness' | 'dining';
  price: number;
  unit: string;
  description: string;
}

export const BESPOKE_ADDONS: AddOnOption[] = [
  {
    id: 'tea-master-blending',
    name: "Private Ceylon Tea Master Tasting & Custom Blend",
    category: 'excursion',
    price: 65,
    unit: 'per guest',
    description: "Exclusive access to private tasting archives with a 4th-generation tea planter; includes your custom-labeled silver tin."
  },
  {
    id: 'hot-air-balloon',
    name: "Sunrise Private Hot Air Balloon over Kandalama",
    category: 'excursion',
    price: 240,
    unit: 'per guest',
    description: "Gentle sunrise ascent floating above Kandalama Lake and the morning mist shrouding ancient rock citadels."
  },
  {
    id: 'catamaran-whale',
    name: "Private Sailing Catamaran Whale Watching Charter",
    category: 'excursion',
    price: 450,
    unit: 'per charter',
    description: "Privately chartered ocean catamaran with dedicated marine naturalist, fresh fruit, and breakfast."
  },
  {
    id: 'ayurvedic-ritual',
    name: "Traditional Ayurvedic Herbal Oil & Steam Massage",
    category: 'wellness',
    price: 85,
    unit: 'per guest',
    description: "Full body herbal purification and medicated oil Shirodhara stream by certified Ayurvedic practitioner."
  }
];

export interface Sanctuary {
  id: string;
  name: string;
  location: string;
  type: string;
  tagline: string;
  description: string;
  suitesCount: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
  features: string[];
}

export const SANCTUARIES: Sanctuary[] = [
  {
    id: 'castlereagh-bungalow',
    name: "The Castlereagh Planter's Bungalow",
    location: "Hatton, Central Highlands",
    type: "Colonial Tea Heritage Estate",
    tagline: "Highland serenity amidst 1888 British colonial grace",
    description: "Nestled on a wooded promontory overlooking the emerald waters of Castlereagh Lake.",
    suitesCount: "5 Master Suites",
    pricePerNight: 480,
    image: "/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg",
    amenities: ["Private Lakefront Infinity Pool", "Dedicated Butler & Resident Chef"],
    features: ["Direct Seaplane Mooring", "Single-Estate Tea Cupping Room"]
  }
];

export interface Destination {
  id: string;
  name: string;
  nativeTitle: string;
  region: string;
  bestMonths: string;
  elevation: string;
  vibe: string;
  description: string;
  image: string;
  keySights: string[];
  insiderTip: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'cultural-triangle',
    name: "Sigiriya & The Cultural Triangle",
    nativeTitle: "සීගිරිය සහ සංස්කෘතික ත්‍රිකෝණය",
    region: "Central-North Plains",
    bestMonths: "December – April & July – September",
    elevation: "190m above sea level",
    vibe: "Ancient royal engineering",
    description: "The historical heartland of Sri Lanka.",
    image: "/src/assets/images/sigiriya_royal_fortress_1792429746675.jpg",
    keySights: ["Sigiriya Lion Rock Citadel", "Dambulla Golden Cave Temple"],
    insiderTip: "Ascend at dawn."
  }
];

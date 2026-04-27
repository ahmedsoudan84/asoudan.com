export interface NearbyPlace {
  name: string;
  distance: string; // e.g. "0.3 mi"
  rating?: string; // e.g. "Outstanding" for schools
  type: string;
}

export type ListingMode = "sale" | "rent";

export interface Property {
  slug: string;
  title: string;
  address: string;
  borough: string;
  price: number;
  priceLabel: string;
  rentPcm?: number;
  rentLabel?: string;
  listingMode: ListingMode;
  beds: number;
  baths: number;
  sqft: number;
  type: "Flat" | "House" | "Penthouse" | "Maisonette" | "Townhouse";
  status: "For Sale" | "Under Offer" | "Sold STC" | "To Let" | "Let Agreed";
  description: string;
  features: string[];
  images: string[];
  nearbySchools: NearbyPlace[];
  nearbyShops: NearbyPlace[];
  nearbyAmenities: NearbyPlace[];
  station: string;
  stationDistance: string;
  localAvgPrice: number;
  lat: number;
  lng: number;
  isCustom?: boolean;
}

export const properties: Property[] = [
  {
    slug: "islington-georgian-townhouse",
    title: "Georgian Townhouse, Islington",
    address: "42 Canonbury Square, London N1 2AN",
    borough: "Islington",
    price: 2150000,
    listingMode: "sale",
    priceLabel: "£2,150,000",
    beds: 5,
    baths: 3,
    sqft: 2800,
    type: "Townhouse",
    status: "For Sale",
    description:
      "A magnificent Grade II listed Georgian townhouse overlooking Canonbury Square. Meticulously restored with original period features throughout, including ornate cornicing, working shutters, and a stunning cantilevered staircase. The property offers generous proportions across four floors with a beautifully landscaped south-facing garden.",
    features: [
      "Grade II listed",
      "South-facing garden",
      "Original fireplaces",
      "Wine cellar",
      "Working shutters",
      "Underfloor heating",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Canonbury Primary School", distance: "0.2 mi", rating: "Outstanding", type: "Primary" },
      { name: "Highbury Grove School", distance: "0.4 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Upper Street Shops", distance: "0.3 mi", type: "High Street" },
      { name: "Sainsbury's Local", distance: "0.1 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Canonbury Square Gardens", distance: "0.0 mi", type: "Park" },
      { name: "Estorick Collection", distance: "0.2 mi", type: "Gallery" },
      { name: "King's Head Theatre", distance: "0.4 mi", type: "Theatre" },
    ],
    station: "Highbury & Islington",
    stationDistance: "0.3 mi",
    localAvgPrice: 1850000,
    lat: 51.5465,
    lng: -0.0978,
  },
  {
    slug: "hackney-warehouse-conversion",
    title: "Warehouse Conversion, Hackney",
    address: "The Old Brewery, Mare Street, London E8 3QE",
    borough: "Hackney",
    price: 875000,
    listingMode: "sale",
    priceLabel: "£875,000",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Flat",
    status: "For Sale",
    description:
      "A striking two-bedroom warehouse conversion in the heart of Hackney. Exposed brick walls, double-height ceilings, and floor-to-ceiling Crittall windows flood the open-plan living space with natural light. The property retains industrial character while offering contemporary luxury throughout.",
    features: [
      "Double-height ceilings",
      "Crittall windows",
      "Exposed brick",
      "Mezzanine study",
      "Concierge",
      "Bike storage",
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Lauriston Primary School", distance: "0.3 mi", rating: "Outstanding", type: "Primary" },
      { name: "Hackney New School", distance: "0.5 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Broadway Market", distance: "0.4 mi", type: "Market" },
      { name: "Mare Street Shops", distance: "0.1 mi", type: "High Street" },
    ],
    nearbyAmenities: [
      { name: "London Fields", distance: "0.3 mi", type: "Park" },
      { name: "Hackney Picturehouse", distance: "0.2 mi", type: "Cinema" },
      { name: "Hackney Empire", distance: "0.3 mi", type: "Theatre" },
    ],
    station: "Hackney Central",
    stationDistance: "0.2 mi",
    localAvgPrice: 780000,
    lat: 51.5467,
    lng: -0.0554,
  },
  {
    slug: "clapham-victorian-family-home",
    title: "Victorian Family Home, Clapham",
    address: "15 Narbonne Avenue, London SW4 9JQ",
    borough: "Clapham",
    price: 1650000,
    listingMode: "sale",
    priceLabel: "£1,650,000",
    beds: 4,
    baths: 2,
    sqft: 2200,
    type: "House",
    status: "For Sale",
    description:
      "A beautifully extended Victorian family home on one of Clapham's most desirable tree-lined streets. The open-plan kitchen-diner opens onto a 60ft south-facing garden. Period features blend seamlessly with a contemporary rear extension featuring a glass lantern roof.",
    features: [
      "60ft south-facing garden",
      "Glass lantern extension",
      "Original coving",
      "Farrow & Ball throughout",
      "Loft conversion",
      "Side return extension",
    ],
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Clapham Manor Primary", distance: "0.2 mi", rating: "Outstanding", type: "Primary" },
      { name: "La Retraite RC School", distance: "0.6 mi", rating: "Outstanding", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Clapham High Street", distance: "0.4 mi", type: "High Street" },
      { name: "Waitrose Clapham", distance: "0.3 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Clapham Common", distance: "0.2 mi", type: "Park" },
      { name: "Clapham Leisure Centre", distance: "0.5 mi", type: "Leisure" },
      { name: "Omnibus Theatre", distance: "0.4 mi", type: "Theatre" },
    ],
    station: "Clapham Common",
    stationDistance: "0.4 mi",
    localAvgPrice: 1500000,
    lat: 51.4613,
    lng: -0.1380,
  },
  {
    slug: "notting-hill-garden-flat",
    title: "Garden Flat, Notting Hill",
    address: "8 Pembridge Crescent, London W11 3DY",
    borough: "Notting Hill",
    price: 1295000,
    listingMode: "sale",
    priceLabel: "£1,295,000",
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Flat",
    status: "Under Offer",
    description:
      "An exquisite garden flat in a white stucco-fronted Victorian villa on Pembridge Crescent. The property features a private west-facing garden, high ceilings, and has been finished to an exceptional standard with bespoke joinery and natural stone throughout.",
    features: [
      "Private garden",
      "High ceilings",
      "Bespoke joinery",
      "Natural stone bathrooms",
      "Plantation shutters",
      "Wine fridge",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Fox Primary School", distance: "0.3 mi", rating: "Outstanding", type: "Primary" },
      { name: "Holland Park School", distance: "0.5 mi", rating: "Outstanding", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Portobello Road Market", distance: "0.1 mi", type: "Market" },
      { name: "Westbourne Grove", distance: "0.3 mi", type: "Boutiques" },
    ],
    nearbyAmenities: [
      { name: "Kensington Gardens", distance: "0.4 mi", type: "Park" },
      { name: "Gate Cinema", distance: "0.2 mi", type: "Cinema" },
      { name: "Museum of Brands", distance: "0.3 mi", type: "Museum" },
    ],
    station: "Notting Hill Gate",
    stationDistance: "0.3 mi",
    localAvgPrice: 1400000,
    lat: 51.5130,
    lng: -0.1973,
  },
  {
    slug: "canary-wharf-penthouse",
    title: "River Penthouse, Canary Wharf",
    address: "Pan Peninsula, 1 Pan Peninsula Square, London E14 9HN",
    borough: "Canary Wharf",
    price: 1850000,
    listingMode: "sale",
    priceLabel: "£1,850,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Penthouse",
    status: "For Sale",
    description:
      "A breathtaking penthouse apartment with panoramic views of the Thames, O2 Arena, and Canary Wharf skyline. Floor-to-ceiling glazing wraps the entire living space. The development offers 24-hour concierge, residents' gym, swimming pool, and private cinema.",
    features: [
      "Panoramic river views",
      "24-hour concierge",
      "Swimming pool",
      "Private cinema",
      "Gym",
      "Secure parking x2",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Canary Wharf College", distance: "0.3 mi", rating: "Good", type: "Primary" },
      { name: "George Green's School", distance: "0.5 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Canary Wharf Shopping", distance: "0.2 mi", type: "Shopping Centre" },
      { name: "Waitrose Canary Wharf", distance: "0.3 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Jubilee Park", distance: "0.2 mi", type: "Park" },
      { name: "Everyman Cinema", distance: "0.3 mi", type: "Cinema" },
      { name: "Crossrail Place Roof Garden", distance: "0.2 mi", type: "Garden" },
    ],
    station: "Canary Wharf",
    stationDistance: "0.2 mi",
    localAvgPrice: 1600000,
    lat: 51.5000,
    lng: -0.0087,
  },
  {
    slug: "marylebone-period-apartment",
    title: "Period Apartment, Marylebone",
    address: "34 Montagu Square, London W1H 2LJ",
    borough: "Marylebone",
    price: 1975000,
    listingMode: "sale",
    priceLabel: "£1,975,000",
    beds: 3,
    baths: 2,
    sqft: 1600,
    type: "Flat",
    status: "For Sale",
    description:
      "A superbly presented lateral apartment occupying the entire first floor of a handsome Georgian townhouse on Montagu Square. The property boasts elegant proportions, original sash windows overlooking the private garden square, and a recently refurbished kitchen with Gaggenau appliances.",
    features: [
      "Lateral apartment",
      "Garden square views",
      "Gaggenau kitchen",
      "Original sash windows",
      "Communal gardens",
      "Porter",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "St Vincent's RC Primary", distance: "0.2 mi", rating: "Outstanding", type: "Primary" },
      { name: "The Grey Coat Hospital", distance: "0.8 mi", rating: "Outstanding", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Marylebone High Street", distance: "0.2 mi", type: "Boutiques" },
      { name: "Selfridges", distance: "0.4 mi", type: "Department Store" },
    ],
    nearbyAmenities: [
      { name: "Regent's Park", distance: "0.3 mi", type: "Park" },
      { name: "Wallace Collection", distance: "0.2 mi", type: "Museum" },
      { name: "Wigmore Hall", distance: "0.3 mi", type: "Concert Hall" },
    ],
    station: "Baker Street",
    stationDistance: "0.3 mi",
    localAvgPrice: 2100000,
    lat: 51.5178,
    lng: -0.1600,
  },
  {
    slug: "chelsea-mews-house",
    title: "Mews House, Chelsea",
    address: "7 Godfrey Street Mews, London SW3 3SX",
    borough: "Chelsea",
    price: 2450000,
    listingMode: "sale",
    priceLabel: "£2,450,000",
    beds: 3,
    baths: 2,
    sqft: 1500,
    type: "House",
    status: "For Sale",
    description:
      "A charming and beautifully appointed mews house tucked away on a quiet cobbled street in the heart of Chelsea. Recently redesigned by an award-winning architect, the property combines period charm with striking contemporary design across three floors.",
    features: [
      "Cobbled mews street",
      "Architect-designed",
      "Roof terrace",
      "Integrated garage",
      "Smart home system",
      "Bespoke kitchen",
    ],
    images: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Park Walk Primary School", distance: "0.2 mi", rating: "Good", type: "Primary" },
      { name: "Chelsea Academy", distance: "0.4 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "King's Road", distance: "0.1 mi", type: "High Street" },
      { name: "Partridges", distance: "0.3 mi", type: "Delicatessen" },
    ],
    nearbyAmenities: [
      { name: "Royal Hospital Gardens", distance: "0.3 mi", type: "Park" },
      { name: "Saatchi Gallery", distance: "0.2 mi", type: "Gallery" },
      { name: "Royal Court Theatre", distance: "0.4 mi", type: "Theatre" },
    ],
    station: "Sloane Square",
    stationDistance: "0.3 mi",
    localAvgPrice: 2600000,
    lat: 51.4884,
    lng: -0.1696,
  },
  {
    slug: "southwark-loft-apartment",
    title: "Loft Apartment, Southwark",
    address: "Tanner Street, London SE1 3LD",
    borough: "Southwark",
    price: 725000,
    listingMode: "sale",
    priceLabel: "£725,000",
    beds: 1,
    baths: 1,
    sqft: 850,
    type: "Flat",
    status: "For Sale",
    description:
      "A stylish one-bedroom loft apartment in a converted Victorian tannery building, just moments from Bermondsey Street. Soaring ceilings with exposed timber beams, polished concrete floors, and a Juliet balcony overlooking the communal courtyard.",
    features: [
      "Exposed timber beams",
      "Polished concrete floors",
      "Juliet balcony",
      "Courtyard",
      "Bike store",
      "Cat-5 wiring",
    ],
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Snowsfields Primary School", distance: "0.3 mi", rating: "Good", type: "Primary" },
      { name: "City of London Academy", distance: "0.6 mi", rating: "Outstanding", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Bermondsey Street", distance: "0.1 mi", type: "Independent" },
      { name: "Borough Market", distance: "0.4 mi", type: "Market" },
    ],
    nearbyAmenities: [
      { name: "Tanner Street Park", distance: "0.1 mi", type: "Park" },
      { name: "White Cube Gallery", distance: "0.2 mi", type: "Gallery" },
      { name: "Maltby Street Market", distance: "0.3 mi", type: "Market" },
    ],
    station: "London Bridge",
    stationDistance: "0.4 mi",
    localAvgPrice: 680000,
    lat: 51.5008,
    lng: -0.0810,
  },
  {
    slug: "camden-modern-townhouse",
    title: "Modern Townhouse, Camden",
    address: "23 Murray Street, London NW1 9RE",
    borough: "Camden",
    price: 1450000,
    listingMode: "sale",
    priceLabel: "£1,450,000",
    beds: 4,
    baths: 3,
    sqft: 2000,
    type: "Townhouse",
    status: "Sold STC",
    description:
      "A striking contemporary townhouse designed by a RIBA award-winning practice on a quiet Camden street. The property features a dramatic triple-height atrium, sliding glass walls to a rear courtyard garden, and a green sedum roof terrace with views towards Primrose Hill.",
    features: [
      "Triple-height atrium",
      "Sedum roof terrace",
      "Courtyard garden",
      "Underfloor heating throughout",
      "Sonos integrated",
      "EV charger",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Regent High School", distance: "0.3 mi", rating: "Good", type: "Secondary" },
      { name: "Edith Neville Primary", distance: "0.4 mi", rating: "Good", type: "Primary" },
    ],
    nearbyShops: [
      { name: "Camden Market", distance: "0.3 mi", type: "Market" },
      { name: "Sainsbury's Camden", distance: "0.2 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Regent's Park", distance: "0.3 mi", type: "Park" },
      { name: "Primrose Hill", distance: "0.5 mi", type: "Park" },
      { name: "KOKO", distance: "0.4 mi", type: "Music Venue" },
    ],
    station: "Camden Town",
    stationDistance: "0.3 mi",
    localAvgPrice: 1350000,
    lat: 51.5392,
    lng: -0.1426,
  },
  {
    slug: "wimbledon-edwardian-villa",
    title: "Edwardian Villa, Wimbledon",
    address: "5 Burghley Road, London SW19 5BH",
    borough: "Wimbledon",
    price: 1875000,
    listingMode: "sale",
    priceLabel: "£1,875,000",
    beds: 5,
    baths: 3,
    sqft: 3000,
    type: "House",
    status: "For Sale",
    description:
      "A substantial detached Edwardian villa set behind a mature front garden on a prestigious Wimbledon Village road. The property has been thoughtfully modernised while retaining original Arts & Crafts details including stained glass, picture rails, and Minton floor tiles in the entrance hall.",
    features: [
      "Detached",
      "Mature gardens",
      "Arts & Crafts details",
      "Stained glass",
      "Double garage",
      "EPC rating C",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Wimbledon Chase Primary", distance: "0.3 mi", rating: "Outstanding", type: "Primary" },
      { name: "King's College School", distance: "0.4 mi", rating: "Outstanding", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Wimbledon Village", distance: "0.2 mi", type: "Boutiques" },
      { name: "Wimbledon Centre Court", distance: "0.8 mi", type: "Shopping Centre" },
    ],
    nearbyAmenities: [
      { name: "Wimbledon Common", distance: "0.1 mi", type: "Park" },
      { name: "New Wimbledon Theatre", distance: "0.7 mi", type: "Theatre" },
      { name: "All England Club", distance: "0.5 mi", type: "Sport" },
    ],
    station: "Wimbledon",
    stationDistance: "0.6 mi",
    localAvgPrice: 1700000,
    lat: 51.4340,
    lng: -0.2132,
  },
  {
    slug: "richmond-riverside-apartment",
    title: "Riverside Apartment, Richmond",
    address: "Whittaker Avenue, Richmond TW9 1EH",
    borough: "Richmond",
    price: 895000,
    listingMode: "sale",
    priceLabel: "£895,000",
    beds: 2,
    baths: 2,
    sqft: 1050,
    type: "Flat",
    status: "For Sale",
    description:
      "A contemporary riverside apartment with uninterrupted views of the Thames and Richmond Bridge. The open-plan living area features bi-fold doors opening onto a generous south-west facing balcony — perfect for evening sunsets. The development includes landscaped communal gardens reaching down to the river.",
    features: [
      "Thames views",
      "South-west balcony",
      "Bi-fold doors",
      "Communal gardens",
      "Secure parking",
      "Lift access",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "The Queen's C of E Primary", distance: "0.3 mi", rating: "Outstanding", type: "Primary" },
      { name: "Richmond Park Academy", distance: "0.6 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Richmond Town Centre", distance: "0.2 mi", type: "High Street" },
      { name: "Waitrose Richmond", distance: "0.3 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Richmond Green", distance: "0.2 mi", type: "Park" },
      { name: "Richmond Theatre", distance: "0.2 mi", type: "Theatre" },
      { name: "Richmond Park", distance: "0.5 mi", type: "Park" },
    ],
    station: "Richmond",
    stationDistance: "0.3 mi",
    localAvgPrice: 850000,
    lat: 51.4613,
    lng: -0.3037,
  },
  {
    slug: "greenwich-naval-quarter",
    title: "Naval Quarter Apartment, Greenwich",
    address: "The Quarterdeck, Greenwich SE10 0FR",
    borough: "Greenwich",
    price: 650000,
    listingMode: "sale",
    priceLabel: "£650,000",
    beds: 2,
    baths: 1,
    sqft: 900,
    type: "Flat",
    status: "For Sale",
    description:
      "A beautifully presented two-bedroom apartment in a heritage conversion within the Royal Arsenal development, moments from Greenwich Park. The property combines original architectural features with modern specifications including integrated Siemens appliances and engineered oak flooring.",
    features: [
      "Heritage conversion",
      "Siemens appliances",
      "Oak flooring",
      "Residents' gym",
      "Landscaped grounds",
      "Allocated parking",
    ],
    images: [
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "James Wolfe Primary School", distance: "0.3 mi", rating: "Good", type: "Primary" },
      { name: "Thomas Tallis School", distance: "0.7 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Greenwich Market", distance: "0.3 mi", type: "Market" },
      { name: "Greenwich High Road", distance: "0.2 mi", type: "High Street" },
    ],
    nearbyAmenities: [
      { name: "Greenwich Park", distance: "0.2 mi", type: "Park" },
      { name: "National Maritime Museum", distance: "0.3 mi", type: "Museum" },
      { name: "Cutty Sark", distance: "0.4 mi", type: "Heritage" },
    ],
    station: "Greenwich",
    stationDistance: "0.3 mi",
    localAvgPrice: 600000,
    lat: 51.4769,
    lng: -0.0005,
  },
  // ── Rental Properties ─────────────────────────────────────────
  {
    slug: "shoreditch-studio-loft",
    title: "Studio Loft, Shoreditch",
    address: "Curtain Road, London EC2A 3PT",
    borough: "Shoreditch",
    price: 0,
    listingMode: "rent",
    priceLabel: "£2,200 pcm",
    rentPcm: 2200,
    rentLabel: "£2,200 pcm",
    beds: 1,
    baths: 1,
    sqft: 550,
    type: "Flat",
    status: "To Let",
    description:
      "A sleek studio loft in the heart of Shoreditch's creative quarter. Open-plan living with polished concrete floors, exposed ducting, and oversized factory windows. The building features a rooftop terrace with city views, shared by residents.",
    features: [
      "Rooftop terrace",
      "Exposed ducting",
      "Factory windows",
      "Polished concrete",
      "Furnished option",
      "Bills included",
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Virginia Primary School", distance: "0.3 mi", rating: "Good", type: "Primary" },
      { name: "Central Foundation School", distance: "0.5 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Boxpark Shoreditch", distance: "0.1 mi", type: "Market" },
      { name: "Old Spitalfields Market", distance: "0.3 mi", type: "Market" },
    ],
    nearbyAmenities: [
      { name: "Shoreditch House", distance: "0.1 mi", type: "Members Club" },
      { name: "Rich Mix Cinema", distance: "0.3 mi", type: "Cinema" },
      { name: "Allen Gardens", distance: "0.2 mi", type: "Park" },
    ],
    station: "Shoreditch High Street",
    stationDistance: "0.1 mi",
    localAvgPrice: 650000,
    lat: 51.5246,
    lng: -0.0792,
  },
  {
    slug: "battersea-power-station-flat",
    title: "New-Build Flat, Battersea",
    address: "Battersea Power Station, Circus Road West, London SW11 8BZ",
    borough: "Battersea",
    price: 0,
    listingMode: "rent",
    priceLabel: "£3,500 pcm",
    rentPcm: 3500,
    rentLabel: "£3,500 pcm",
    beds: 2,
    baths: 2,
    sqft: 900,
    type: "Flat",
    status: "To Let",
    description:
      "A brand-new two-bedroom apartment within the iconic Battersea Power Station development. Floor-to-ceiling windows frame views of the Thames. Residents enjoy access to a gym, spa, cinema room, and the vibrant restaurants and shops at ground level.",
    features: [
      "River views",
      "Gym & spa",
      "Cinema room",
      "Concierge",
      "Rooftop garden",
      "Pet friendly",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Chesterton Primary School", distance: "0.4 mi", rating: "Good", type: "Primary" },
      { name: "Ark Bolingbroke Academy", distance: "0.6 mi", rating: "Outstanding", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Battersea Power Station Shops", distance: "0.0 mi", type: "Shopping Centre" },
      { name: "Northcote Road", distance: "0.8 mi", type: "High Street" },
    ],
    nearbyAmenities: [
      { name: "Battersea Park", distance: "0.2 mi", type: "Park" },
      { name: "Circus West Village", distance: "0.0 mi", type: "Dining" },
      { name: "Chelsea Bridge", distance: "0.3 mi", type: "Landmark" },
    ],
    station: "Battersea Power Station",
    stationDistance: "0.1 mi",
    localAvgPrice: 800000,
    lat: 51.4821,
    lng: -0.1467,
  },
  {
    slug: "kings-cross-canal-flat",
    title: "Canalside Apartment, King's Cross",
    address: "Granary Square, London N1C 4BH",
    borough: "King's Cross",
    price: 0,
    listingMode: "rent",
    priceLabel: "£2,800 pcm",
    rentPcm: 2800,
    rentLabel: "£2,800 pcm",
    beds: 2,
    baths: 1,
    sqft: 780,
    type: "Flat",
    status: "To Let",
    description:
      "A contemporary canalside apartment overlooking Granary Square in the thriving King's Cross regeneration area. Open-plan kitchen and living with Juliet balcony. Steps from Central Saint Martins, Coal Drops Yard, and some of London's best restaurants.",
    features: [
      "Canal views",
      "Juliet balcony",
      "Built-in wardrobes",
      "Video entry",
      "Cycle storage",
      "Unfurnished",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Thornhill Primary School", distance: "0.4 mi", rating: "Good", type: "Primary" },
      { name: "Central Foundation School", distance: "0.7 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Coal Drops Yard", distance: "0.1 mi", type: "Boutiques" },
      { name: "Waitrose King's Cross", distance: "0.2 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Granary Square Fountains", distance: "0.0 mi", type: "Park" },
      { name: "Everyman King's Cross", distance: "0.1 mi", type: "Cinema" },
      { name: "House of Illustration", distance: "0.1 mi", type: "Gallery" },
    ],
    station: "King's Cross St Pancras",
    stationDistance: "0.2 mi",
    localAvgPrice: 750000,
    lat: 51.5358,
    lng: -0.1247,
  },
  {
    slug: "hampstead-garden-maisonette",
    title: "Garden Maisonette, Hampstead",
    address: "Flask Walk, London NW3 1HJ",
    borough: "Hampstead",
    price: 0,
    listingMode: "rent",
    priceLabel: "£4,200 pcm",
    rentPcm: 4200,
    rentLabel: "£4,200 pcm",
    beds: 3,
    baths: 2,
    sqft: 1300,
    type: "Maisonette",
    status: "To Let",
    description:
      "A charming garden maisonette on one of Hampstead's most picturesque streets. Spread across two floors with a private walled garden, period fireplaces, original wooden floors, and a modern kitchen extension. Moments from Hampstead Heath and the village high street.",
    features: [
      "Private walled garden",
      "Period fireplaces",
      "Wooden floors",
      "Modern kitchen",
      "Two bathrooms",
      "Quiet street",
    ],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
    ],
    nearbySchools: [
      { name: "Hampstead Parochial School", distance: "0.2 mi", rating: "Outstanding", type: "Primary" },
      { name: "Parliament Hill School", distance: "0.5 mi", rating: "Good", type: "Secondary" },
    ],
    nearbyShops: [
      { name: "Hampstead High Street", distance: "0.1 mi", type: "Boutiques" },
      { name: "M&S Hampstead", distance: "0.2 mi", type: "Supermarket" },
    ],
    nearbyAmenities: [
      { name: "Hampstead Heath", distance: "0.2 mi", type: "Park" },
      { name: "Everyman Hampstead", distance: "0.1 mi", type: "Cinema" },
      { name: "Burgh House Museum", distance: "0.1 mi", type: "Museum" },
    ],
    station: "Hampstead",
    stationDistance: "0.2 mi",
    localAvgPrice: 1200000,
    lat: 51.5568,
    lng: -0.1780,
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

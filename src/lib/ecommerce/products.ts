export type ProductCategory =
  | "audio"
  | "wearables"
  | "workspace"
  | "lighting"
  | "living"
  | "accessories";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  brand: string;
  colour: string;
  colourHex: string;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
  materials: string[];
  features: string[];
  image: string;
  gallery: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    slug: "arcline-studio-headphones",
    name: "Arcline Studio",
    tagline: "Reference-grade over-ear headphones",
    description:
      "Crafted from aerospace-grade aluminium and memory-foam Alcantara, the Arcline Studio delivers 40mm beryllium drivers tuned by Abbey Road engineers. Adaptive noise cancellation reads the room in real time, so the only thing you hear is exactly what you want.",
    price: 349,
    compareAtPrice: 429,
    category: "audio",
    brand: "Arcline Audio",
    colour: "Obsidian",
    colourHex: "#1a1a20",
    rating: 4.9,
    reviews: 842,
    stock: 18,
    tags: ["headphones", "noise-cancelling", "premium", "wireless", "hi-fi"],
    materials: ["Aerospace aluminium", "Alcantara", "Memory foam"],
    features: [
      "40mm beryllium drivers",
      "36-hour battery with ANC",
      "Adaptive transparency mode",
      "Hi-Res Audio certified",
      "Multipoint Bluetooth 5.3",
    ],
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&h=1200&fit=crop",
    ],
    isBestseller: true,
  },
  {
    slug: "lumen-pro-earbuds",
    name: "Lumen Pro",
    tagline: "Wireless earbuds with spatial audio",
    description:
      "Tiny, weightless, and ridiculously loud. Lumen Pro pairs custom 11mm drivers with head-tracked spatial audio and a titanium-coated diaphragm for cinematic detail in a shell smaller than a 20p coin.",
    price: 229,
    category: "audio",
    brand: "Arcline Audio",
    colour: "Pearl",
    colourHex: "#f3f0ea",
    rating: 4.8,
    reviews: 612,
    stock: 34,
    tags: ["earbuds", "wireless", "spatial-audio", "compact", "travel"],
    materials: ["Medical-grade silicone", "Polycarbonate", "Titanium"],
    features: [
      "Spatial Audio with head tracking",
      "8-hour playback, 32h with case",
      "Adaptive EQ",
      "IPX5 sweat resistant",
      "Wireless Qi charging case",
    ],
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&h=1200&fit=crop",
    ],
    isNew: true,
  },
  {
    slug: "meridian-smart-watch",
    name: "Meridian 42",
    tagline: "Titanium smartwatch for real life",
    description:
      "Machined from a single block of grade-5 titanium, the Meridian 42 is a sports watch, a sleep coach, and a quiet assistant — all in one 9.8mm-thin package. A sapphire crystal face shrugs off scratches, and the battery lasts a full week.",
    price: 549,
    compareAtPrice: 599,
    category: "wearables",
    brand: "Meridian",
    colour: "Brushed titanium",
    colourHex: "#9fa3a8",
    rating: 4.9,
    reviews: 1204,
    stock: 12,
    tags: ["watch", "smartwatch", "fitness", "titanium", "premium"],
    materials: ["Grade-5 titanium", "Sapphire crystal", "Fluoroelastomer strap"],
    features: [
      "Always-on LTPO display",
      "7-day battery life",
      "Dual-frequency GPS",
      "ECG + SpO₂ + skin temperature",
      "100m water resistance",
    ],
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&h=1200&fit=crop",
    ],
    isBestseller: true,
  },
  {
    slug: "atlas-leather-bifold",
    name: "Atlas Bifold",
    tagline: "Full-grain leather, RFID-shielded",
    description:
      "Hand-cut from Tuscan full-grain leather and finished with saddle-stitched thread that will outlast the phone in your pocket. Slim enough for a front pocket, with eight card slots and an RFID-blocking liner.",
    price: 129,
    category: "accessories",
    brand: "Atlas Goods",
    colour: "Cognac",
    colourHex: "#8b4a2b",
    rating: 4.7,
    reviews: 388,
    stock: 42,
    tags: ["wallet", "leather", "minimalist", "gift", "travel"],
    materials: ["Tuscan full-grain leather", "Linen thread", "RFID liner"],
    features: [
      "8 card slots + 2 cash pockets",
      "RFID-blocking construction",
      "Develops a unique patina over time",
      "Lifetime leather guarantee",
    ],
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1604026310024-1a3a3065f37c?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "halo-desk-lamp",
    name: "Halo",
    tagline: "Circadian desk lamp",
    description:
      "Halo shifts its colour temperature and brightness to match the sun outside your window. A haptic dial lets you override it with a single turn. Hand-spun aluminium head, weighted marble base.",
    price: 189,
    category: "lighting",
    brand: "Northroom",
    colour: "Sand",
    colourHex: "#d4c3a1",
    rating: 4.8,
    reviews: 256,
    stock: 21,
    tags: ["lamp", "lighting", "workspace", "smart-home", "minimalist"],
    materials: ["Spun aluminium", "Carrara marble", "Fabric-wrapped cable"],
    features: [
      "Tunable white 2200K–6500K",
      "Circadian auto-mode",
      "Haptic dial with memory",
      "USB-C passthrough port",
    ],
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=1200&fit=crop",
    ],
    isNew: true,
  },
  {
    slug: "oak-standing-desk",
    name: "Oak Riser",
    tagline: "Solid oak sit-stand desk",
    description:
      "A whisper-quiet dual-motor base lifts a 40mm solid oak top from sitting to standing in 8 seconds. Finished with a hard-wax oil that actually ages well. Comes with integrated cable management.",
    price: 1290,
    category: "workspace",
    brand: "Northroom",
    colour: "Natural oak",
    colourHex: "#c69b6d",
    rating: 4.9,
    reviews: 148,
    stock: 7,
    tags: ["desk", "workspace", "oak", "ergonomic", "premium"],
    materials: ["40mm solid oak", "Powder-coated steel", "Hard-wax oil"],
    features: [
      "Dual-motor sit-stand base",
      "4 programmable presets",
      "120kg lift capacity",
      "Integrated cable tray",
      "10-year frame warranty",
    ],
    image:
      "https://images.unsplash.com/photo-1587212695269-6c11e0ea6e3b?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587212695269-6c11e0ea6e3b?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1200&fit=crop",
    ],
    isBestseller: true,
  },
  {
    slug: "contour-office-chair",
    name: "Contour",
    tagline: "Ergonomic task chair",
    description:
      "A dynamic mesh back that adapts to your spine in real time, self-weighing recline, and a seat pan you barely notice. The Contour has been engineered by the same team behind two decades of Aeron iterations.",
    price: 890,
    category: "workspace",
    brand: "Contour Studio",
    colour: "Graphite",
    colourHex: "#3a3a3f",
    rating: 4.7,
    reviews: 412,
    stock: 15,
    tags: ["chair", "ergonomic", "workspace", "office", "lumbar"],
    materials: ["Recycled mesh", "Aluminium frame", "PU casters"],
    features: [
      "Self-weighing recline",
      "Adjustable lumbar + headrest",
      "4D armrests",
      "12-year warranty",
    ],
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "boulder-ceramic-mug",
    name: "Boulder Mug",
    tagline: "Hand-thrown ceramic, set of 2",
    description:
      "Thrown on the wheel in a Stoke-on-Trent studio and finished with a matte reactive glaze that makes no two mugs alike. Holds 330ml. Dishwasher safe, but you won't want to.",
    price: 48,
    category: "living",
    brand: "Boulder Ceramics",
    colour: "Stone",
    colourHex: "#c8c0b5",
    rating: 4.8,
    reviews: 524,
    stock: 56,
    tags: ["mug", "ceramic", "kitchen", "handmade", "gift"],
    materials: ["Stoneware clay", "Reactive glaze"],
    features: [
      "Hand-thrown in Stoke-on-Trent",
      "Set of 2",
      "Dishwasher + microwave safe",
      "No two alike",
    ],
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "drift-weighted-throw",
    name: "Drift Throw",
    tagline: "6kg weighted wool blanket",
    description:
      "Hand-loomed in Wales from 100% British wool, the Drift is weighted with ceramic micro-beads hidden between layers. Heavy enough to feel grounding, breathable enough to keep all year.",
    price: 229,
    category: "living",
    brand: "Drift House",
    colour: "Fog",
    colourHex: "#9a9a99",
    rating: 4.9,
    reviews: 198,
    stock: 9,
    tags: ["blanket", "wool", "weighted", "sleep", "living-room"],
    materials: ["100% British wool", "Ceramic micro-beads"],
    features: [
      "6kg weighted construction",
      "130cm × 190cm",
      "Breathable all-season wool",
      "Hand-loomed in Wales",
    ],
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=1200&fit=crop",
    ],
    isNew: true,
  },
  {
    slug: "ember-candle-trio",
    name: "Ember Trio",
    tagline: "Hand-poured soy candles",
    description:
      "Three fragrances, seventy hours of burn time each. Pour temperatures are controlled to the degree, cotton wicks are tuned to each vessel, and every candle is finished by hand in our Bristol studio.",
    price: 68,
    category: "living",
    brand: "Ember & Co.",
    colour: "Amber",
    colourHex: "#c78f3f",
    rating: 4.6,
    reviews: 311,
    stock: 64,
    tags: ["candle", "home-fragrance", "gift", "soy", "handmade"],
    materials: ["Soy wax", "Cotton wicks", "Reusable glass"],
    features: [
      "3 × 200g candles",
      "70-hour burn time each",
      "Vegan + cruelty-free",
      "Reusable vessels",
    ],
    image:
      "https://images.unsplash.com/photo-1602874801006-e26a4f4e6c0e?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602874801006-e26a4f4e6c0e?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "nomad-travel-bag",
    name: "Nomad 30",
    tagline: "Carry-on travel pack",
    description:
      "Designed with full-time travellers. Fits under every major airline's cabin limit, opens flat like a suitcase, and hides a 16\" laptop sleeve. Water-repellent recycled sailcloth throughout.",
    price: 279,
    compareAtPrice: 319,
    category: "accessories",
    brand: "Nomad Supply",
    colour: "Seagrass",
    colourHex: "#4d6b51",
    rating: 4.8,
    reviews: 702,
    stock: 23,
    tags: ["bag", "travel", "backpack", "carry-on", "minimalist"],
    materials: ["Recycled sailcloth", "YKK AquaGuard zips", "Hypalon"],
    features: [
      "30L expandable to 35L",
      "Clamshell main compartment",
      "16\" laptop sleeve",
      "Lifetime repair guarantee",
    ],
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1200&fit=crop",
    ],
    isBestseller: true,
  },
  {
    slug: "pivot-mechanical-keyboard",
    name: "Pivot 75",
    tagline: "Gasket-mount mechanical keyboard",
    description:
      "A CNC-machined aluminium case, a PBT double-shot keycap set, and factory-lubed switches that feel like cutting butter. Hot-swap sockets mean you're never locked in — Pivot grows with your taste.",
    price: 239,
    category: "workspace",
    brand: "Pivot",
    colour: "Graphite",
    colourHex: "#2f2f35",
    rating: 4.9,
    reviews: 489,
    stock: 19,
    tags: ["keyboard", "mechanical", "workspace", "hot-swap", "gaming"],
    materials: ["CNC aluminium", "PBT plastic", "Silicone"],
    features: [
      "Gasket-mount 75% layout",
      "Hot-swap sockets",
      "Factory-lubed switches",
      "Wireless + wired",
      "QMK/VIA firmware",
    ],
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=1200&fit=crop",
    ],
    isNew: true,
  },
  {
    slug: "sable-linen-shirt",
    name: "Sable Shirt",
    tagline: "Relaxed European linen",
    description:
      "Garment-washed Belgian linen that arrives soft on the first wear. Cut boxy but not oversized, with mother-of-pearl buttons and a single chest pocket. Wear it to the beach or with a blazer.",
    price: 149,
    category: "accessories",
    brand: "Sable",
    colour: "Sand",
    colourHex: "#d8c7a2",
    rating: 4.7,
    reviews: 221,
    stock: 28,
    tags: ["shirt", "linen", "clothing", "summer", "unisex"],
    materials: ["Belgian linen", "Mother-of-pearl buttons"],
    features: [
      "Garment-washed softness",
      "Boxy relaxed fit",
      "Unisex sizing",
      "Made in Portugal",
    ],
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "tessera-rug",
    name: "Tessera",
    tagline: "Hand-knotted wool rug",
    description:
      "A contemporary update on a Berber classic, hand-knotted in Morocco from undyed highland wool. Dense pile, 200 knots per square inch, and a natural lanolin finish that resists stains.",
    price: 1450,
    category: "living",
    brand: "Tessera Atelier",
    colour: "Ivory",
    colourHex: "#eae4d7",
    rating: 4.9,
    reviews: 72,
    stock: 4,
    tags: ["rug", "wool", "living-room", "handmade", "luxury"],
    materials: ["Undyed highland wool"],
    features: [
      "Hand-knotted in Morocco",
      "200 knots / square inch",
      "200cm × 300cm",
      "Natural lanolin finish",
    ],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "beacon-smart-speaker",
    name: "Beacon",
    tagline: "Room-filling smart speaker",
    description:
      "Six drivers, five microphones, and one seamless aluminium shell. Beacon calibrates itself to your room's acoustics every morning, so the bass is tight whether it's on a bookshelf or on the floor.",
    price: 449,
    category: "audio",
    brand: "Arcline Audio",
    colour: "Midnight",
    colourHex: "#14161e",
    rating: 4.8,
    reviews: 336,
    stock: 11,
    tags: ["speaker", "smart-home", "audio", "wireless", "premium"],
    materials: ["Aluminium", "Acoustic mesh"],
    features: [
      "6-driver array",
      "Adaptive room calibration",
      "AirPlay 2 + Spotify Connect",
      "Multi-room audio",
    ],
    image:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1200&h=1200&fit=crop",
    ],
  },
  {
    slug: "halcyon-aroma-diffuser",
    name: "Halcyon",
    tagline: "Ultrasonic aroma diffuser",
    description:
      "A hand-glazed porcelain vessel that turns pure essential oils into a whisper-quiet mist. Eight hours of continuous diffusion, with a soft warm light that dims automatically at night.",
    price: 119,
    category: "lighting",
    brand: "Halcyon",
    colour: "Ivory",
    colourHex: "#f1ebde",
    rating: 4.7,
    reviews: 412,
    stock: 31,
    tags: ["diffuser", "aromatherapy", "wellness", "lighting", "home"],
    materials: ["Hand-glazed porcelain", "Ultrasonic diaphragm"],
    features: [
      "8-hour continuous mist",
      "Dimmable warm LED",
      "Silent ultrasonic operation",
      "Auto-off safety",
    ],
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=1200&h=1200&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=1200&h=1200&fit=crop",
    ],
  },
];

export const CATEGORY_META: Record<ProductCategory, { label: string; blurb: string }> = {
  audio: { label: "Audio", blurb: "Headphones, earbuds & speakers" },
  wearables: { label: "Wearables", blurb: "Watches & smart fitness" },
  workspace: { label: "Workspace", blurb: "Desks, chairs & tools of the trade" },
  lighting: { label: "Lighting", blurb: "Ambient, task & mood" },
  living: { label: "Living", blurb: "Textiles, ceramics & home" },
  accessories: { label: "Accessories", blurb: "Bags, leather & everyday carry" },
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const aScore =
        (a.category === product.category ? 3 : 0) +
        a.tags.filter((t) => product.tags.includes(t)).length;
      const bScore =
        (b.category === product.category ? 3 : 0) +
        b.tags.filter((t) => product.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

import type { MenuItem } from "@/lib/elite-diner/menu-data";

/* ── Semantic-like Menu Search ─────────────────────────────── */

const SYNONYMS: Record<string, string[]> = {
  spicy: ["hot", "chilli", "chili", "fiery", "jalapeño", "curry"],
  vegetarian: ["veggie", "meat-free", "plant-based"],
  vegan: ["plant-based", "dairy-free"],
  "gluten-free": ["coeliac", "celiac", "no gluten"],
  fish: ["seafood", "sea bass", "scallop", "lobster", "prawn"],
  meat: ["beef", "lamb", "duck", "wagyu", "ribeye", "steak"],
  pasta: ["risotto", "arancini", "spaghetti", "tagliatelle"],
  light: ["healthy", "low-calorie", "salad", "fresh"],
  romantic: ["date", "intimate", "candle", "special"],
  family: ["kids", "children", "sharing", "group"],
  celebration: ["birthday", "anniversary", "toast", "champagne"],
  budget: ["cheap", "affordable", "under", "value"],
  luxury: ["premium", "wagyu", "lobster", "truffle", "champagne"],
};

function expandQuery(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/);
  const expanded = new Set(words);
  for (const word of words) {
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (word === key || syns.includes(word)) {
        expanded.add(key);
        syns.forEach((s) => expanded.add(s));
      }
    }
  }
  return Array.from(expanded);
}

export function searchMenu(query: string, items: MenuItem[]): MenuItem[] {
  if (!query.trim()) return items;
  const tokens = expandQuery(query);

  // Check for price filter: "under £20", "below 15"
  let maxPrice = Infinity;
  const priceMatch = query.match(/(?:under|below|max|up to)\s*£?(\d+)/i);
  if (priceMatch) maxPrice = parseFloat(priceMatch[1]);

  const scored = items.map((item) => {
    const text =
      `${item.name} ${item.description} ${item.category} ${item.dietaryTags.join(" ")} ${item.allergens.join(" ")} ${item.pairing}`.toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (text.includes(token)) score += 2;
      // Partial match
      if (token.length > 3 && text.includes(token.slice(0, -1))) score += 1;
    }

    // Dietary tag exact match bonus
    for (const tag of item.dietaryTags) {
      if (tokens.includes(tag)) score += 3;
    }

    // Price filter
    if (item.price > maxPrice) score = 0;

    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);
}

/* ── AI Chatbot Responses ──────────────────────────────────── */

const CHAT_RESPONSES: Record<string, string> = {
  default:
    "Hello! I'm your AI dining assistant. I can help with our menu, wine pairings, dietary requirements, or help you book a table. What can I do for you?",
  menu:
    "Our menu features 30 carefully curated dishes across starters, mains, desserts, cocktails, and a selected wine list. Highlights include the 35-Day Dry-Aged Ribeye (£52) and Wagyu Wellington (£65). Would you like me to recommend something specific?",
  vegetarian:
    "We have excellent vegetarian options! Try the Heritage Beetroot Carpaccio (£12), Burrata & Heirloom Tomatoes (£15), Wild Mushroom Risotto (£24), or our Truffle Arancini (£13). For dessert, the Vegan Chocolate Mousse is outstanding.",
  vegan:
    "Our vegan options include the Thai Red Curry (£20, GF), Vegan Chocolate Mousse (£10, GF), and our Seasonal House Mocktail (£8). We can also adapt several dishes — just ask your server.",
  "gluten-free":
    "Many of our dishes are naturally gluten-free, including the Seared Scallops, Cornish Sea Bass, Herb-Crusted Lamb, Thai Red Curry, and Artisan Cheese Selection. Look for the 'gluten-free' tag on the menu.",
  wine:
    "Our sommelier recommends the Chablis Moreau with seafood, Pinot Noir Acustic with mushroom risotto, and Côtes du Rhône Guigal with red meat. For celebrations, our Billecart-Salmon Champagne is outstanding.",
  price:
    "Starters range from £10-£18.50, mains from £20-£65, desserts £10-£16. Cocktails £8-£15, wines by the glass £9-£18. Our best value is the set lunch (not shown) at £28 for two courses.",
  booking:
    "I'd recommend booking through our reservations page — you can select your preferred date, time, and party size. We honour all dietary requirements and special occasions. Shall I take you to the booking page?",
  spicy:
    "For spice lovers, try the Spicy Crispy Calamari (£14) with ají amarillo aioli, or the Thai Red Curry (£20) with fragrant red chilli and Thai basil.",
  occasion:
    "For a romantic dinner, I'd suggest: Seared Scallops → Wagyu Wellington → Dark Chocolate Fondant, paired with Champagne. For a family Sunday, the Ribeye and Sticky Toffee is always a hit!",
  allergy:
    "We take allergies very seriously. Every dish lists its allergens. Our most common-free options are the Heritage Beetroot (nut/dairy), Thai Red Curry (no major allergens), and Herb-Crusted Lamb. Please inform your server of any allergies.",
};

export function getChatResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("vegetarian") || q.includes("veggie"))
    return CHAT_RESPONSES.vegetarian;
  if (q.includes("vegan") || q.includes("plant"))
    return CHAT_RESPONSES.vegan;
  if (q.includes("gluten") || q.includes("coeliac") || q.includes("celiac"))
    return CHAT_RESPONSES["gluten-free"];
  if (q.includes("wine") || q.includes("pair") || q.includes("drink"))
    return CHAT_RESPONSES.wine;
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("budget") ||
    q.includes("expensive")
  )
    return CHAT_RESPONSES.price;
  if (
    q.includes("book") ||
    q.includes("reserv") ||
    q.includes("table") ||
    q.includes("seat")
  )
    return CHAT_RESPONSES.booking;
  if (q.includes("spicy") || q.includes("hot") || q.includes("chilli"))
    return CHAT_RESPONSES.spicy;
  if (
    q.includes("occasion") ||
    q.includes("romantic") ||
    q.includes("date") ||
    q.includes("birthday") ||
    q.includes("anniversary") ||
    q.includes("family")
  )
    return CHAT_RESPONSES.occasion;
  if (
    q.includes("allerg") ||
    q.includes("intoleran") ||
    q.includes("nut") ||
    q.includes("dairy")
  )
    return CHAT_RESPONSES.allergy;
  if (q.includes("menu") || q.includes("dish") || q.includes("food"))
    return CHAT_RESPONSES.menu;

  return CHAT_RESPONSES.default;
}

/* ── AI Menu Recommender ───────────────────────────────────── */

export interface RecommenderPrefs {
  mood?: string;
  dietary?: string;
  budget?: string;
  occasion?: string;
}

export function getRecommendations(
  prefs: RecommenderPrefs,
  items: MenuItem[]
): MenuItem[] {
  let filtered = [...items];

  if (prefs.dietary) {
    const tag = prefs.dietary.toLowerCase();
    filtered = filtered.filter((i) =>
      i.dietaryTags.some((t) => t.includes(tag))
    );
  }

  if (prefs.budget) {
    const maxPrice =
      prefs.budget === "budget"
        ? 20
        : prefs.budget === "mid"
          ? 35
          : Infinity;
    filtered = filtered.filter((i) => i.price <= maxPrice);
  }

  if (prefs.mood) {
    const results = searchMenu(prefs.mood, filtered);
    if (results.length > 0) filtered = results;
  }

  // Return a balanced selection: 1 starter, 1 main, 1 dessert
  const starter = filtered.find((i) => i.category === "starters");
  const main = filtered.find((i) => i.category === "mains");
  const dessert = filtered.find((i) => i.category === "desserts");
  const wine = filtered.find((i) => i.category === "wine");

  return [starter, main, dessert, wine].filter(Boolean) as MenuItem[];
}

/* ── AI Description Optimizer ──────────────────────────────── */

const ADJECTIVES = [
  "hand-crafted",
  "locally sourced",
  "seasonal",
  "artisan",
  "premium",
  "farm-to-table",
  "slow-cooked",
  "perfectly balanced",
  "thoughtfully prepared",
  "expertly paired",
];

const TECHNIQUES = [
  "gently seared",
  "slow-roasted",
  "pan-fried to perfection",
  "delicately poached",
  "wood-fired",
  "chargrilled",
  "braised until tender",
];

export function optimizeDescription(rawNotes: string): string {
  if (!rawNotes.trim()) return "";
  const words = rawNotes.trim().split(/\s+/);
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const tech = TECHNIQUES[Math.floor(Math.random() * TECHNIQUES.length)];

  if (words.length < 5) {
    return `${adj.charAt(0).toUpperCase() + adj.slice(1)} ${rawNotes.trim().toLowerCase()}, ${tech} and served with seasonal accompaniments. A beautifully composed dish that showcases the finest British produce.`;
  }

  // Enhance existing description
  const sentences = rawNotes.split(/[.!]+/).filter(Boolean);
  const enhanced = sentences.map((s, i) => {
    const trimmed = s.trim();
    if (i === 0) return `${adj.charAt(0).toUpperCase() + adj.slice(1)} ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}`;
    return trimmed;
  });

  return enhanced.join(". ") + ". " + `Prepared with care using ${adj} ingredients.`;
}

/* ── AI Pairing & Occasion Helper ──────────────────────────── */

interface OccasionSuggestion {
  title: string;
  items: string[];
  wine: string;
  description: string;
}

const OCCASIONS: Record<string, OccasionSuggestion> = {
  romantic: {
    title: "Romantic Dinner for Two",
    items: ["Seared Diver Scallops", "Wagyu Beef Wellington", "Dark Chocolate Fondant"],
    wine: "Champagne, Billecart-Salmon NV",
    description:
      "An intimate three-course journey through our finest dishes, paired with celebrations Champagne.",
  },
  family: {
    title: "Family Sunday Lunch",
    items: ["Truffle Arancini", "35-Day Dry-Aged Ribeye", "Sticky Toffee Pudding"],
    wine: "Côtes du Rhône, Guigal 2020",
    description:
      "Generous sharing plates and hearty mains — comfort food elevated to fine dining standards.",
  },
  business: {
    title: "Business Lunch",
    items: ["Burrata & Heirloom Tomatoes", "Cornish Sea Bass", "Lemon Posset"],
    wine: "Chablis, Moreau 2022",
    description:
      "Light, elegant courses that let conversation flow. Professional yet memorable.",
  },
  celebration: {
    title: "Special Celebration",
    items: ["Hereford Beef Tartare", "Grilled Lobster Thermidor", "Artisan Cheese Selection"],
    wine: "Champagne, Billecart-Salmon NV",
    description:
      "Pull out all the stops with our most luxurious dishes and finest Champagne.",
  },
  healthy: {
    title: "Healthy & Light",
    items: ["Heritage Beetroot Carpaccio", "Cornish Sea Bass", "Vegan Chocolate Mousse"],
    wine: "Rosé, Whispering Angel 2023",
    description:
      "Nutrient-rich, naturally light dishes that don't compromise on flavour.",
  },
};

export function getOccasionSuggestion(occasion: string): OccasionSuggestion | null {
  const q = occasion.toLowerCase();
  if (q.includes("romantic") || q.includes("date") || q.includes("anniversary"))
    return OCCASIONS.romantic;
  if (q.includes("family") || q.includes("kids") || q.includes("sunday"))
    return OCCASIONS.family;
  if (q.includes("business") || q.includes("work") || q.includes("client"))
    return OCCASIONS.business;
  if (q.includes("birthday") || q.includes("celebrat") || q.includes("special"))
    return OCCASIONS.celebration;
  if (q.includes("healthy") || q.includes("light") || q.includes("diet"))
    return OCCASIONS.healthy;
  return null;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "starters" | "mains" | "desserts" | "drinks" | "wine";
  dietaryTags: string[];
  image: string;
  allergens: string[];
  calories: number;
  pairing: string;
}

export const menuItems: MenuItem[] = [
  // ── Starters ──────────────────────────────────────────
  {
    id: "s1",
    name: "Seared Diver Scallops",
    description:
      "Pan-roasted hand-dived scallops with cauliflower purée, crispy pancetta lardons, and truffle oil. Finished with a micro herb salad and Maldon sea salt.",
    price: 18.5,
    category: "starters",
    dietaryTags: ["chef-special", "popular"],
    image: "https://images.unsplash.com/photo-1559339352-11d135aa8251?w=600&h=400&fit=crop",
    allergens: ["shellfish", "dairy"],
    calories: 320,
    pairing: "Chablis, Moreau 2022",
  },
  {
    id: "s2",
    name: "Heritage Beetroot Carpaccio",
    description:
      "Thinly sliced roasted heritage beetroot with whipped goat's curd, candied walnuts, watercress, and aged balsamic reduction.",
    price: 12,
    category: "starters",
    dietaryTags: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
    allergens: ["dairy", "nuts"],
    calories: 195,
    pairing: "Rosé, Whispering Angel",
  },
  {
    id: "s3",
    name: "Hereford Beef Tartare",
    description:
      "Hand-cut Hereford beef with cornichons, capers, shallots, Dijon, quail egg yolk, and toasted sourdough crisps.",
    price: 16,
    category: "starters",
    dietaryTags: ["popular"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
    allergens: ["eggs", "gluten"],
    calories: 380,
    pairing: "Bordeaux Rouge",
  },
  {
    id: "s4",
    name: "Burrata & Heirloom Tomatoes",
    description:
      "Creamy Puglian burrata with sun-ripened heirloom tomatoes, basil oil, aged balsamic, and Maldon sea salt from Essex.",
    price: 15,
    category: "starters",
    dietaryTags: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1608897011839-7e2e01848e71?w=600&h=400&fit=crop",
    allergens: ["dairy"],
    calories: 290,
    pairing: "Pinot Grigio",
  },
  {
    id: "s5",
    name: "Spicy Crispy Calamari",
    description:
      "Lightly dusted squid rings with ají amarillo aioli, charred lime wedges, and pickled jalapeño. A London twist on a Mediterranean classic.",
    price: 14,
    category: "starters",
    dietaryTags: ["spicy"],
    image: "https://images.unsplash.com/photo-1599487486509-2b5f2869f0f1?w=600&h=400&fit=crop",
    allergens: ["shellfish", "gluten", "eggs"],
    calories: 340,
    pairing: "Pilsner or Prosecco",
  },
  {
    id: "s6",
    name: "Truffle Arancini",
    description:
      "Golden-fried risotto balls with black truffle, fontina cheese, and an earthy mushroom dipping sauce. Served with a rocket garnish.",
    price: 13,
    category: "starters",
    dietaryTags: ["vegetarian", "popular"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    allergens: ["dairy", "gluten", "eggs"],
    calories: 420,
    pairing: "Champagne, Billecart-Salmon",
  },

  // ── Mains ─────────────────────────────────────────────
  {
    id: "m1",
    name: "35-Day Dry-Aged Ribeye",
    description:
      "British grass-fed ribeye, dry-aged for 35 days, with bone marrow butter, watercress, triple-cooked chips, and béarnaise sauce. Our signature dish.",
    price: 52,
    category: "mains",
    dietaryTags: ["chef-special", "popular", "gluten-free"],
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
    allergens: ["dairy"],
    calories: 780,
    pairing: "Cabernet Sauvignon",
  },
  {
    id: "m2",
    name: "Cornish Sea Bass",
    description:
      "Whole roasted line-caught sea bass from Cornwall with samphire, Jersey Royals, and lemon verbena beurre blanc.",
    price: 34,
    category: "mains",
    dietaryTags: ["gluten-free", "light"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop",
    allergens: ["fish", "dairy"],
    calories: 520,
    pairing: "Sauvignon Blanc",
  },
  {
    id: "m3",
    name: "Wild Mushroom Risotto",
    description:
      "Arborio rice with foraged wild mushrooms, aged Parmigiano-Reggiano, truffle shavings, and crispy sage. Chestnuts in season.",
    price: 24,
    category: "mains",
    dietaryTags: ["vegetarian", "popular"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop",
    allergens: ["dairy", "celery"],
    calories: 620,
    pairing: "Pinot Noir, Acustic",
  },
  {
    id: "m4",
    name: "Herb-Crusted Lamb Rump",
    description:
      "Slow-roasted British lamb rump with rosemary roast potatoes, seasonal greens, rich red wine jus, and mint gremolata.",
    price: 36,
    category: "mains",
    dietaryTags: ["gluten-free"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    allergens: [],
    calories: 680,
    pairing: "Merlot",
  },
  {
    id: "m5",
    name: "Thai Red Curry (V)",
    description:
      "Fragrant red curry with coconut cream, Thai basil, seasonal vegetables, and steamed jasmine rice. Plant-based with remarkable depth.",
    price: 20,
    category: "mains",
    dietaryTags: ["vegetarian", "vegan", "spicy", "gluten-free"],
    image: "https://images.unsplash.com/photo-1455619452474-d2be1297f07b?w=600&h=400&fit=crop",
    allergens: [],
    calories: 540,
    pairing: "Riesling",
  },
  {
    id: "m6",
    name: "Crispy Duck Confit",
    description:
      "Confit duck leg with cherry gastrique, Puy lentils, braised red cabbage, and parsnip purée. Classic French technique, London ingredients.",
    price: 32,
    category: "mains",
    dietaryTags: ["chef-special", "gluten-free"],
    image: "https://images.unsplash.com/photo-1580554530778-ca3694364c0d?w=600&h=400&fit=crop",
    allergens: ["dairy"],
    calories: 720,
    pairing: "Côtes du Rhône, Guigal",
  },
  {
    id: "m7",
    name: "Wagyu Beef Wellington",
    description:
      "Japanese A5 wagyu wrapped in mushroom duxelles and buttery puff pastry, with red wine reduction and seasonal root vegetables.",
    price: 65,
    category: "mains",
    dietaryTags: ["chef-special"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
    allergens: ["gluten", "dairy", "eggs"],
    calories: 920,
    pairing: "Bordeaux Grand Cru",
  },
  {
    id: "m8",
    name: "Fresh Pasta of the Day",
    description:
      "Hand-rolled pasta crafted daily by our chef. Ask your server for today's preparation — often features seasonal British ingredients.",
    price: 22,
    category: "mains",
    dietaryTags: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1556761223-4c4282c8e044?w=600&h=400&fit=crop",
    allergens: ["gluten", "eggs", "dairy"],
    calories: 580,
    pairing: "Chianti",
  },
  {
    id: "m9",
    name: "Grilled Lobster Thermidor",
    description:
      "Half native lobster with creamy thermidor sauce, Gruyère gratin, hand-cut chips, and dressed salad. A timeless celebration dish.",
    price: 48,
    category: "mains",
    dietaryTags: ["popular"],
    image: "https://images.unsplash.com/photo-1553621043-83a3506fd0f2?w=600&h=400&fit=crop",
    allergens: ["shellfish", "dairy", "gluten"],
    calories: 750,
    pairing: "Champagne",
  },

  // ── Desserts ──────────────────────────────────────────
  {
    id: "d1",
    name: "Sticky Toffee Pudding",
    description:
      "Warm date sponge with salted caramel sauce, vanilla bean ice cream, and toffee shavings. The ultimate British comfort.",
    price: 11,
    category: "desserts",
    dietaryTags: ["popular"],
    image: "https://images.unsplash.com/photo-1606313561951-8cbd35888695?w=600&h=400&fit=crop",
    allergens: ["gluten", "dairy", "eggs"],
    calories: 580,
    pairing: "Late Harvest",
  },
  {
    id: "d2",
    name: "Dark Chocolate Fondant",
    description:
      "Valrhona chocolate with molten centre, raspberry coulis, and Cornish clotted cream. Please allow 20 minutes — cooked to order.",
    price: 12,
    category: "desserts",
    dietaryTags: ["vegetarian", "chef-special"],
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    allergens: ["dairy", "eggs", "gluten"],
    calories: 520,
    pairing: "Port",
  },
  {
    id: "d3",
    name: "Lemon Posset",
    description:
      "Zesty lemon posset with shortbread biscuit crumb, Italian meringue, and fresh seasonal berries. A bright, refreshing finish.",
    price: 10,
    category: "desserts",
    dietaryTags: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1519915028121-7b346a29a2d8?w=600&h=400&fit=crop",
    allergens: ["dairy", "eggs", "gluten"],
    calories: 420,
    pairing: "Moscato d'Asti",
  },
  {
    id: "d4",
    name: "Artisan Cheese Selection",
    description:
      "Five British and European artisan cheeses with honeycomb, fig compote, oat biscuits, and Medjool dates. Ask for today's selection.",
    price: 16,
    category: "desserts",
    dietaryTags: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1452194900486-9cd8059870fb?w=600&h=400&fit=crop",
    allergens: ["dairy"],
    calories: 380,
    pairing: "Ruby Port",
  },
  {
    id: "d5",
    name: "Vegan Chocolate Mousse",
    description:
      "Silky aquafaba mousse with premium dark chocolate, extra virgin olive oil, sea salt flakes, and toasted almonds. Plant-based luxury.",
    price: 10,
    category: "desserts",
    dietaryTags: ["vegan", "gluten-free"],
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&h=400&fit=crop",
    allergens: ["nuts"],
    calories: 280,
    pairing: "Espresso",
  },

  // ── Drinks ────────────────────────────────────────────
  {
    id: "dr1",
    name: "Espresso Martini",
    description:
      "Ketel One vodka, Kahlúa, fresh double espresso, vanilla syrup. Shaken not stirred — our house signature cocktail.",
    price: 14,
    category: "drinks",
    dietaryTags: ["popular"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16549766f?w=600&h=400&fit=crop",
    allergens: [],
    calories: 180,
    pairing: "",
  },
  {
    id: "dr2",
    name: "Hickory Smoked Negroni",
    description:
      "Tanqueray gin, Campari, Cocchi di Torino, finished with hickory smoke under a glass cloche. Served over a hand-carved ice cube.",
    price: 15,
    category: "drinks",
    dietaryTags: ["chef-special"],
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&h=400&fit=crop",
    allergens: [],
    calories: 220,
    pairing: "",
  },
  {
    id: "dr3",
    name: "Passion Fruit Sour",
    description:
      "Grey Goose vodka, fresh passion fruit, lime juice, sugar syrup, aquafaba foam. Bright, tart, and immensely refreshing.",
    price: 13,
    category: "drinks",
    dietaryTags: ["light"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop",
    allergens: [],
    calories: 160,
    pairing: "",
  },
  {
    id: "dr4",
    name: "Seasonal House Mocktail",
    description:
      "Fresh seasonal fruits, garden herbs, elderflower cordial, and premium soda. Ask your server for today's creation — always delightful.",
    price: 8,
    category: "drinks",
    dietaryTags: ["vegan", "light"],
    image: "https://images.unsplash.com/photo-1513558161293-c87e3f6595a5?w=600&h=400&fit=crop",
    allergens: [],
    calories: 80,
    pairing: "",
  },

  // ── Wine List ─────────────────────────────────────────
  {
    id: "w1",
    name: "Chablis, Moreau 2022",
    description:
      "Classic Chablis from Burgundy — crisp, mineral-driven, with citrus and flint. Perfect with seafood starters.",
    price: 12,
    category: "wine",
    dietaryTags: ["popular"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
    allergens: ["sulphites"],
    calories: 120,
    pairing: "Seared Scallops, Sea Bass",
  },
  {
    id: "w2",
    name: "Pinot Noir, Acustic 2021",
    description:
      "Spanish organic Pinot — soft, fruity, light body. Versatile enough for most mains, especially mushroom risotto.",
    price: 10,
    category: "wine",
    dietaryTags: [],
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=400&fit=crop",
    allergens: ["sulphites"],
    calories: 125,
    pairing: "Mushroom Risotto, Duck Confit",
  },
  {
    id: "w3",
    name: "Côtes du Rhône, Guigal 2020",
    description:
      "Grenache-Syrah-Mourvèdre blend — full-bodied, spiced, with dark fruit and a long finish. Ideal with red meat.",
    price: 11,
    category: "wine",
    dietaryTags: [],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    allergens: ["sulphites"],
    calories: 130,
    pairing: "Dry-Aged Ribeye, Lamb Rump",
  },
  {
    id: "w4",
    name: "Rosé, Whispering Angel 2023",
    description:
      "Provence style — pale salmon, bone-dry, notes of white peach and strawberry. Summer in a glass, elegant year-round.",
    price: 9,
    category: "wine",
    dietaryTags: ["light"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    allergens: ["sulphites"],
    calories: 115,
    pairing: "Burrata, Calamari, Salads",
  },
  {
    id: "w5",
    name: "Champagne, Billecart-Salmon NV",
    description:
      "Non-vintage brut — fine persistent bubbles, orchard fruit, brioche notes. The perfect celebration pour.",
    price: 18,
    category: "wine",
    dietaryTags: ["chef-special"],
    image: "https://images.unsplash.com/photo-1598488031534-0ef5a8e5f0c1?w=600&h=400&fit=crop",
    allergens: ["sulphites"],
    calories: 90,
    pairing: "Truffle Arancini, Lobster",
  },
];

export const categories = [
  "starters",
  "mains",
  "desserts",
  "drinks",
  "wine",
] as const;

export const categoryLabels: Record<string, string> = {
  starters: "Starters",
  mains: "Mains",
  desserts: "Desserts",
  drinks: "Cocktails & Drinks",
  wine: "Wine List",
};

export const dietaryFilters = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "spicy", label: "Spicy" },
  { id: "chef-special", label: "Chef's Special" },
  { id: "popular", label: "Popular" },
  { id: "light", label: "Light" },
];

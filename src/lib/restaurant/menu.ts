export interface MenuItem {
  id: string;
<<<<<<< HEAD
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: string[];
}

export const menuItems: MenuItem[] = [
  { id: "starter-1", category: "Starters", name: "Truffle Arancini", description: "Crispy risotto balls with black truffle and parmesan", price: 16, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", dietaryTags: ["vegetarian"] },
  { id: "starter-2", category: "Starters", name: "Tuna Tartare", description: "Fresh yellowfin tuna with avocado and sesame", price: 22, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop", dietaryTags: ["gluten-free"] },
  { id: "starter-3", category: "Starters", name: "Burrata & Tomatoes", description: "Creamy burrata with vine-ripened tomatoes", price: 18, image: "https://images.unsplash.com/photo-1608897013039-887f21d7c23e?w=400&h=300&fit=crop", dietaryTags: ["vegetarian", "gluten-free"] },
  { id: "main-1", category: "Mains", name: "Wagyu Beef Wellington", description: "A5 wagyu beef wrapped in puff pastry", price: 85, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", dietaryTags: [] },
  { id: "main-2", category: "Mains", name: "Roasted Sea Bass", description: "Wild sea bass with saffron potatoes", price: 42, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop", dietaryTags: ["gluten-free"] },
  { id: "main-3", category: "Mains", name: "Herb-Crusted Lamb", description: "New Zealand lamb with rosemary potatoes", price: 48, image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=400&h=300&fit=crop", dietaryTags: ["gluten-free"] },
  { id: "main-4", category: "Mains", name: "Wild Mushroom Risotto", description: "Arborio rice with porcini and parmesan", price: 28, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop", dietaryTags: ["vegetarian", "gluten-free"] },
  { id: "dessert-1", category: "Desserts", name: "Chocolate Soufflé", description: "Warm dark chocolate soufflé with vanilla ice cream", price: 14, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", dietaryTags: ["vegetarian"] },
  { id: "dessert-2", category: "Desserts", name: "Crème Brûlée", description: "Classic vanilla custard with caramel", price: 12, image: "https://images.unsplash.com/photo-1470124182917-cc6e9baf5b78?w=400&h=300&fit=crop", dietaryTags: ["vegetarian", "gluten-free"] },
  { id: "drink-1", category: "Drinks", name: "Signature Cocktail", description: "House-infused gin with elderflower", price: 18, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop", dietaryTags: ["gluten-free"] },
  { id: "wine-1", category: "Wine List", name: "Chateau Margaux 2015", description: "Premier Cru Bordeaux", price: 450, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop", dietaryTags: ["vegan"] },
  { id: "wine-2", category: "Wine List", name: "Dom Pérignon 2012", description: "Prestige cuvée Champagne", price: 320, image: "https://images.unsplash.com/photo-1590803272139-63c3ee2e1f0a?w=400&h=300&fit=crop", dietaryTags: ["vegan", "gluten-free"] },
]

export const categories = [...new Set(menuItems.map(item => item.category))]
=======
  name: string;
  description: string;
  price: number;
  category: "starters" | "mains" | "desserts" | "drinks" | "wine";
  tags: ("vegetarian" | "vegan" | "gluten-free" | "spicy" | "chef-special" | "popular" | "light")[];
  image: string;
  allergens?: string[];
  calories?: number;
  pairing?: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "s1",
    name: "Seared Scallops",
    description: "Pan-roasted diver scallops with cauliflower purée, crispy pancetta, and truffle oil. Finished with micro herb salad.",
    price: 18.5,
    category: "starters",
    tags: ["chef-special", "popular"],
    image: "https://images.unsplash.com/photo-1559339352-11d135aa8251?w=400&h=300&fit=crop",
    allergens: ["shellfish", "dairy"],
    calories: 320,
    pairing: "Chablis"
  },
  {
    id: "s2",
    name: "Heritage Carrots",
    description: "Roasted heritage carrots with tahini, za'atar, pomegranate seeds, and fresh mint. UK-grown heritage varieties.",
    price: 12,
    category: "starters",
    tags: ["vegetarian", "vegan", "gluten-free"],
    image: "https://images.unsplash.com/photo-1447175008436-8123782e0e5e?w=400&h=300&fit=crop",
    allergens: ["sesame"],
    calories: 180,
    pairing: "Rosé"
  },
  {
    id: "s3",
    name: "Beef Tartare",
    description: "Hand-cut Hereford beef with cornichons, capers, shallots, quail egg yolk, and toasted sourdough crisps.",
    price: 16,
    category: "starters",
    tags: ["popular"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    allergens: ["eggs", "gluten"],
    calories: 380,
    pairing: "Bordeaux"
  },
  {
    id: "s4",
    name: "Burrata",
    description: "Creamy burrata with sun-blushed tomatoes, basil oil, aged balsamic, and Maldon sea salt from Essex.",
    price: 15,
    category: "starters",
    tags: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1608897011839-7e2e01848e71?w=400&h=300&fit=crop",
    allergens: ["dairy"],
    calories: 290,
    pairing: "Pinot Grigio"
  },
  {
    id: "s5",
    name: "Spicy Crispy Calamari",
    description: "Lightly dusted squid with ají amarillo aioli, charred lime, and pickled jalapeño. Railway-style with a London twist.",
    price: 14,
    category: "starters",
    tags: ["spicy"],
    image: "https://images.unsplash.com/photo-1599487486509-2b5f2869f0f1?w=400&h=300&fit=crop",
    allergens: ["shellfish", "gluten", "eggs"],
    calories: 340,
    pairing: "Pilsner"
  },
  {
    id: "m1",
    name: "Dry-Aged Ribeye",
    description: "35-day dry-aged British ribeye with bone marrow butter, watercress, andIES chips. The signature dish.",
    price: 52,
    category: "mains",
    tags: ["chef-special", "popular", "gluten-free"],
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
    allergens: ["dairy"],
    calories: 780,
    pairing: "Cabernet"
  },
  {
    id: "m2",
    name: "Roasted Sea Bass",
    description: "Whole roasted sea bass with samphire, new potatoes, and lemon verbena beurre blanc. Line-caught from Cornwall.",
    price: 34,
    category: "mains",
    tags: ["gluten-free", "light"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    allergens: ["fish", "dairy"],
    calories: 520,
    pairing: "Sauvignon Blanc"
  },
  {
    id: "m3",
    name: "Mushroom Risotto",
    description: "Arborio rice with wild forest mushrooms, aged parmesan, truffle shavings, and crispy sage. Foraged chestnuts in season.",
    price: 24,
    category: "mains",
    tags: ["vegetarian", "popular"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    allergens: ["dairy", "celery"],
    calories: 620,
    pairing: "Pinot Noir"
  },
  {
    id: "m4",
    name: "Herb-Crusted Lamb",
    description: "Slow-roasted rump with rosemary potatoes, seasonal greens, and richgravy. British lamb, grass-fed.",
    price: 36,
    category: "mains",
    tags: ["gluten-free"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    allergens: [],
    calories: 680,
    pairing: "Merlot"
  },
  {
    id: "m5",
    name: "Spicy Thai Curry",
    description: "Red curry with coconut, Thai basil, seasonal vegetables, and jasmine rice. Plant-based with depth.",
    price: 20,
    category: "mains",
    tags: ["vegetarian", "vegan", "spicy", "gluten-free"],
    image: "https://images.unsplash.com/photo-1455619452474-d2be1297f07b?w=400&h=300&fit=crop",
    allergens: [],
    calories: 540,
    pairing: " Riesling"
  },
  {
    id: "m6",
    name: "Duck Confit",
    description: "Crispy duck leg with cherry gastrique, Puy lentils, and braised red cabbage. Classic French technique.",
    price: 32,
    category: "mains",
    tags: ["chef-special", "gluten-free"],
    image: "https://images.unsplash.com/photo-1580554530778-ca3694364c0d?w=400&h=300&fit=crop",
    allergens: ["dairy"],
    calories: 720,
    pairing: "Pinot Noir"
  },
  {
    id: "m7",
    name: "Pasta of the Day",
    description: "Fresh pasta crafted daily. Ask your server for today's preparation — often features seasonal ingredients.",
    price: 22,
    category: "mains",
    tags: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1556761223-4c4282c8e044?w=400&h=300&fit=crop",
    allergens: ["gluten", "eggs", "dairy"],
    calories: 580,
    pairing: "Chianti"
  },
  {
    id: "d1",
    name: "Sticky Toffee Pudding",
    description: "Warm sponge with salted caramel, vanilla bean ice cream, and toffee shavings. British comfort.",
    price: 11,
    category: "desserts",
    tags: ["popular"],
    image: "https://images.unsplash.com/photo-1606313561951-8cbd35888695?w=400&h=300&fit=crop",
    allergens: ["gluten", "dairy", "eggs"],
    calories: 580,
    pairing: "Late Harvest"
  },
  {
    id: "d2",
    name: "Dark Chocolate Fondant",
    description: "Molten centre, raspberry coulis, and clotted cream. Cooked to order — please allow 20 minutes.",
    price: 12,
    category: "desserts",
    tags: ["vegetarian", "chef-special"],
    image: "https://images.unsplash.com/photo-1606313561951-8cbd35888695?w=400&h=300&fit=crop",
    allergens: ["dairy", "eggs", "gluten"],
    calories: 520,
    pairing: "Port"
  },
  {
    id: "d3",
    name: "Lemon Tart",
    description: "Zesty lemon curd in buttery pastry, Italian meringue, and fresh berries. Bright finish.",
    price: 10,
    category: "desserts",
    tags: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1519915028121-7b346a29a2d8?w=400&h=300&fit=crop",
    allergens: ["dairy", "eggs", "gluten"],
    calories: 420,
    pairing: "Moscato"
  },
  {
    id: "d4",
    name: "Cheese Selection",
    description: "Artisan British and European cheeses with honeycomb, biscuits, and fig compote. Ask for today's selection.",
    price: 16,
    category: "desserts",
    tags: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1452194900486-9cd8059870fb?w=400&h=300&fit=crop",
    allergens: ["dairy", "gluten"],
    calories: 380,
    pairing: "Ruby Port"
  },
  {
    id: "d5",
    name: "Vegan Chocolate Mousse",
    description: "Silky aquafaba mousse with olive oil, sea salt, and roasted almonds. Plant-based luxury.",
    price: 10,
    category: "desserts",
    tags: ["vegan", "gluten-free"],
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=300&fit=crop",
    allergens: ["nuts"],
    calories: 280,
    pairing: "Espresso"
  },
  {
    id: "dr1",
    name: "Espresso Martini",
    description: "Vodka, Kahlúa, fresh espresso, vanilla. Shaken not stirred. The house signature.",
    price: 14,
    category: "drinks",
    tags: ["popular"],
    image: "https://images.unsplash.com/photo-1545438102-799eb3435ca88?w=400&h=300&fit=crop",
    allergens: [],
    calories: 180
  },
  {
    id: "dr2",
    name: "Smoked Negroni",
    description: "Gin, Campari, sweet vermouth, with hickory smoke. Served over a large ice cube.",
    price: 15,
    category: "drinks",
    tags: ["chef-special"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16549766f?w=400&h=300&fit=crop",
    allergens: [],
    calories: 220
  },
  {
    id: "dr3",
    name: "Passion Fruit Sour",
    description: "Vodka, passion fruit, lime, aquafaba foam. Bright, tart, refreshing.",
    price: 13,
    category: "drinks",
    tags: ["light"],
    image: "https://images.unsplash.com/photo-1582816618733-3a3d8e8b4c0d?w=400&h=300&fit=crop",
    allergens: ["eggs"],
    calories: 160
  },
  {
    id: "dr4",
    name: "House Mocktail",
    description: "Seasonal fruits, fresh herbs, elderflower, soda. Ask for today's creation. Always refreshing.",
    price: 8,
    category: "drinks",
    tags: ["vegan", "light"],
    image: "https://images.unsplash.com/photo-1513558161293-c87e3f6595a5?w=400&h=300&fit=crop",
    allergens: [],
    calories: 80
  },
  {
    id: "w1",
    name: "Chablis, Moreau 2022",
    description: "Classic Chablis — crisp, mineral, with citrus. Perfect with seafood.",
    price: 12,
    category: "wine",
    tags: ["popular"],
    image: "https://images.unsplash.com/photo-1510812433942-76852fd958e3?w=400&h=300&fit=crop",
    allergens: [],
    calories: 120
  },
  {
    id: "w2",
    name: "Pinot Noir, Acustic 2021",
    description: "Spanish tempranillo — soft, fruity, light. Versatile with most dishes.",
    price: 10,
    category: "wine",
    tags: [],
    image: "https://images.unsplash.com/photo-1510812433942-76852fd958e3?w=400&h=300&fit=crop",
    allergens: [],
    calories: 125
  },
  {
    id: "w3",
    name: "Côtes du Rhône, Guigal 2020",
    description: "Grenache, Syrah, Mourvèdre — full-bodied, spiced. Ideal with red meat.",
    price: 11,
    category: "wine",
    tags: [],
    image: "https://images.unsplash.com/photo-1510812433942-76852fd958e3?w=400&h=300&fit=crop",
    allergens: [],
    calories: 130
  },
  {
    id: "w4",
    name: "Rosé, Whispering Angel 2023",
    description: "Provence style — pale, dry, elegant. Summer in a glass.",
    price: 9,
    category: "wine",
    tags: ["light"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    allergens: [],
    calories: 115
  },
  {
    id: "w5",
    name: "Champagne, Billecart-Salmon",
    description: "NV Brut — fine bubbles, orchard fruit. For celebrations.",
    price: 18,
    category: "wine",
    tags: ["chef-special"],
    image: "https://images.unsplash.com/photo-1598488031534-0ef5a8e5f0c1?w=400&h=300&fit=crop",
    allergens: [],
    calories: 90
  }
];

export const categories = [
  { id: "starters", title: "Starters", description: "Begin your culinary journey" },
  { id: "mains", title: "Mains", description: "Signature dishes" },
  { id: "desserts", title: "Desserts", description: "Sweet final notes" },
  { id: "drinks", title: "Drinks", description: "Cocktails & more" },
  { id: "wine", title: "Wine List", description: "Selected bottles" }
];

export const dietaryFilters = [
  { id: "vegetarian", label: "Vegetarian", icon: "leaf" },
  { id: "vegan", label: "Vegan", icon: "sprout" },
  { id: "gluten-free", label: "Gluten-Free", icon: "wheat-off" },
  { id: "spicy", label: "Spicy", icon: "flame" },
  { id: "chef-special", label: "Chef's Special", icon: "chef-hat" }
];
>>>>>>> 0468191 (feat: Add Elite Diner restaurant template with AI features)

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "starter-1",
    category: "Starters",
    name: "Truffle Arancini",
    description: "Crispy risotto balls with black truffle and parmesan",
    price: 16,
    image: "https://images.unsplash.com/photo-1512058264730-64f6f5f5b4ba?w=400&h=300&fit=crop",
    dietaryTags: ["vegetarian"]
  },
  {
    id: "starter-2",
    category: "Starters",
    name: "Tuna Tartare",
    description: "Fresh ahi tuna with avocado and sesame",
    price: 22,
    image: "https://images.unsplash.com/photo-1534604973900-c43ab0a1a4ab?w=400&h=300&fit=crop",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "starter-3",
    category: "Starters",
    name: "Burrata & Tomatoes",
    description: "Creamy burrata with heirloom tomatoes",
    price: 18,
    image: "https://images.unsplash.com/photo-1608897013039-8b4d4f0e21d6?w=400&h=300&fit=crop",
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    id: "main-1",
    category: "Mains",
    name: "Wagyu Beef Wellington",
    description: "A5 wagyu wrapped in puff pastry",
    price: 85,
    image: "https://images.unsplash.com/photo-1544025162-d76639f2c641?w=400&h=300&fit=crop",
    dietaryTags: []
  },
  {
    id: "main-2",
    category: "Mains",
    name: "Pan-Seared Sea Bass",
    description: "Wild sea bass with saffron potatoes",
    price: 42,
    image: "https://images.unsplash.com/photo-1519708227418-824d4a8acb4f?w=400&h=300&fit=crop",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "main-3",
    category: "Mains",
    name: "Herb-Crusted Lamb",
    description: "New Zealand lamb with rosemary jus",
    price: 48,
    image: "https://images.unsplash.com/photo-1603360942209-4db65835fc50?w=400&h=300&fit=crop",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "main-4",
    category: "Mains",
    name: "Wild Mushroom Risotto",
    description: "Arborio rice with porcini and truffle oil",
    price: 28,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    id: "dessert-1",
    category: "Desserts",
    name: "Chocolate Soufflé",
    description: "Warm dark chocolate soufflé with vanilla ice cream",
    price: 14,
    image: "https://images.unsplash.com/photo-1606313562780-50e0b3e0c8e0?w=400&h=300&fit=crop",
    dietaryTags: ["vegetarian"]
  },
  {
    id: "dessert-2",
    category: "Desserts",
    name: "Crème Brûlée",
    description: "Classic vanilla custard with caramelized sugar",
    price: 12,
    image: "https://images.unsplash.com/photo-1470146413518-2882-0c8b1d9c2be0?w=400&h=300&fit=crop",
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    id: "drink-1",
    category: "Drinks",
    name: "Signature Cocktail",
    description: "House-infused gin with elderflower",
    price: 18,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "wine-1",
    category: "Wine List",
    name: "Château Margaux 2015",
    description: "Premier Cru Bordeaux",
    price: 450,
    image: "https://images.unsplash.com/photo-1506377589508-d01315f8c3a3?w=400&h=300&fit=crop",
    dietaryTags: ["vegan"]
  },
  {
    id: "wine-2",
    category: "Wine List",
    name: "Dom Pérignon 2012",
    description: "Vintage Champagne",
    price: 320,
    image: "https://images.unsplash.com/photo-1594372365-1b7dda394f2a?w=400&h=300&fit=crop",
    dietaryTags: ["vegan", "gluten-free"]
  }
];

export const categories = [...new Set(menuItems.map(item => item.category))];
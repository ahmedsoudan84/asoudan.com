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
    image: "/images/menu/arancini.png",
    dietaryTags: ["vegetarian"]
  },
  {
    id: "starter-2",
    category: "Starters",
    name: "Tuna Tartare",
    description: "Fresh ahi tuna with avocado and sesame",
    price: 22,
    image: "/images/menu/tuna.png",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "starter-3",
    category: "Starters",
    name: "Burrata & Tomatoes",
    description: "Creamy burrata with heirloom tomatoes",
    price: 18,
    image: "/images/menu/burrata.png",
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    id: "main-1",
    category: "Mains",
    name: "Wagyu Beef Wellington",
    description: "A5 wagyu wrapped in puff pastry",
    price: 85,
    image: "/images/menu/wagyu.png",
    dietaryTags: []
  },
  {
    id: "main-2",
    category: "Mains",
    name: "Pan-Seared Sea Bass",
    description: "Wild sea bass with saffron potatoes",
    price: 42,
    image: "/images/menu/seabass.png",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "main-3",
    category: "Mains",
    name: "Herb-Crusted Lamb",
    description: "New Zealand lamb with rosemary jus",
    price: 48,
    image: "/images/menu/lamb.png",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "main-4",
    category: "Mains",
    name: "Wild Mushroom Risotto",
    description: "Arborio rice with porcini and truffle oil",
    price: 28,
    image: "/images/menu/risotto.png",
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    id: "dessert-1",
    category: "Desserts",
    name: "Chocolate Soufflé",
    description: "Warm dark chocolate soufflé with vanilla ice cream",
    price: 14,
    image: "/images/menu/souffle.png",
    dietaryTags: ["vegetarian"]
  },
  {
    id: "dessert-2",
    category: "Desserts",
    name: "Crème Brûlée",
    description: "Classic vanilla custard with caramelized sugar",
    price: 12,
    image: "/images/menu/creme.png",
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    id: "drink-1",
    category: "Drinks",
    name: "Signature Cocktail",
    description: "House-infused gin with elderflower",
    price: 18,
    image: "/images/menu/cocktail.png",
    dietaryTags: ["gluten-free"]
  },
  {
    id: "wine-1",
    category: "Wine List",
    name: "Château Margaux 2015",
    description: "Premier Cru Bordeaux",
    price: 450,
    image: "/images/menu/margaux.png",
    dietaryTags: ["vegan"]
  },
  {
    id: "wine-2",
    category: "Wine List",
    name: "Dom Pérignon 2012",
    description: "Vintage Champagne",
    price: 320,
    image: "/images/menu/domperignon.png",
    dietaryTags: ["vegan", "gluten-free"]
  }
];

export const categories = [...new Set(menuItems.map(item => item.category))];
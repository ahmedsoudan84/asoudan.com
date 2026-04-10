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
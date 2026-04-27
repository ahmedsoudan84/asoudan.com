import { products as staticProducts, type Product } from "./products";

const PRODUCTS_KEY = "oxford-custom-products";
const ORDERS_KEY = "oxford-orders";
const STOCK_KEY = "oxford-stock-adjustments";

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
}

export function getAllProducts(): Product[] {
  if (typeof window === "undefined") return staticProducts;
  
  const custom = localStorage.getItem(PRODUCTS_KEY);
  const customProducts: Product[] = custom ? JSON.parse(custom) : [];
  
  // Apply stock adjustments
  const stockAdjustments = getStockAdjustments();
  
  return [...staticProducts, ...customProducts].map(p => ({
    ...p,
    stock: stockAdjustments[p.slug] !== undefined ? stockAdjustments[p.slug] : p.stock
  }));
}

export function addProduct(product: Product) {
  const custom = localStorage.getItem(PRODUCTS_KEY);
  const customProducts: Product[] = custom ? JSON.parse(custom) : [];
  customProducts.push(product);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(customProducts));
}

export function updateProduct(product: Product) {
  const custom = localStorage.getItem(PRODUCTS_KEY);
  const customProducts: Product[] = custom ? JSON.parse(custom) : [];
  const idx = customProducts.findIndex(p => p.slug === product.slug);
  
  if (idx !== -1) {
    customProducts[idx] = product;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(customProducts));
  } else {
    // If it's a static product, we'd need a different way to "override" it.
    // For now, let's just focus on custom products or stock adjustments.
  }
}

export function deleteProduct(slug: string) {
  const custom = localStorage.getItem(PRODUCTS_KEY);
  if (!custom) return;
  const customProducts: Product[] = JSON.parse(custom);
  const filtered = customProducts.filter(p => p.slug !== slug);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
}

export function getStockAdjustments(): Record<string, number> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(STOCK_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function updateStock(slug: string, newStock: number) {
  const adjustments = getStockAdjustments();
  adjustments[slug] = newStock;
  localStorage.setItem(STOCK_KEY, JSON.stringify(adjustments));
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [
    {
      id: "ORD-7291",
      customer: "James Wilson",
      email: "j.wilson@example.com",
      items: [{ name: "Arcline Studio", price: 349, quantity: 1 }],
      total: 349,
      status: "Delivered",
      date: "2024-04-20"
    },
    {
      id: "ORD-8104",
      customer: "Sarah Chen",
      email: "schen@tech.co",
      items: [{ name: "Oak Riser", price: 1290, quantity: 1 }],
      total: 1290,
      status: "Shipped",
      date: "2024-04-22"
    }
  ];
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  // Deduce stock
  const products = getAllProducts();
  order.items.forEach(item => {
    const p = products.find(p => p.name === item.name);
    if (p) {
      updateStock(p.slug, Math.max(0, p.stock - item.quantity));
    }
  });
}

export function updateOrderStatus(orderId: string, status: Order["status"]) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

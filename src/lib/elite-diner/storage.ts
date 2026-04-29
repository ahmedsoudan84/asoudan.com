const RESERVATIONS_KEY = "elite-diner-reservations";
const ORDERS_KEY = "elite-diner-orders";
const SETTINGS_KEY = "elite-diner-settings";

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  occasion: string;
  status: "Confirmed" | "Cancelled";
  createdAt: number;
}

export interface DinerOrder {
  id: string;
  customer: string;
  email: string;
  type: "delivery" | "collection";
  items: { name: string; price: number; quantity: number }[];
  total: number;
  status: "Preparing" | "Ready" | "Delivered" | "Cancelled";
  date: string;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
}

export const DEFAULT_SETTINGS: RestaurantSettings = {
  name: "Elite Diner",
  tagline: "London's Finest Fine Dining",
  phone: "+44 20 7946 1234",
  email: "reservations@elitediner.co.uk",
  address: "42 Mayfair Mews, London, W1J 7JZ",
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

export function getReservations(): Reservation[] {
  return safeGet<Reservation[]>(RESERVATIONS_KEY, []);
}

export function addReservation(r: Reservation): void {
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify([...getReservations(), r]));
}

export function updateReservationStatus(id: string, status: Reservation["status"]): void {
  localStorage.setItem(
    RESERVATIONS_KEY,
    JSON.stringify(getReservations().map((r) => (r.id === id ? { ...r, status } : r)))
  );
}

export function getDinerOrders(): DinerOrder[] {
  return safeGet<DinerOrder[]>(ORDERS_KEY, []);
}

export function addDinerOrder(order: DinerOrder): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...getDinerOrders(), order]));
}

export function updateDinerOrderStatus(id: string, status: DinerOrder["status"]): void {
  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(getDinerOrders().map((o) => (o.id === id ? { ...o, status } : o)))
  );
}

export function getRestaurantSettings(): RestaurantSettings {
  return { ...DEFAULT_SETTINGS, ...safeGet<Partial<RestaurantSettings>>(SETTINGS_KEY, {}) };
}

export function saveRestaurantSettings(s: RestaurantSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

import { menuItems as staticMenuItems, type MenuItem } from "./menu-data";

const RESERVATIONS_KEY = "elite-diner-reservations";
const ORDERS_KEY = "elite-diner-orders";
const SETTINGS_KEY = "elite-diner-settings";
const CUSTOM_ITEMS_KEY = "elite-diner-custom-items";
const AVAILABILITY_KEY = "elite-diner-availability";

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

// ── Menu availability (per-item on/off toggle) ─────────────────
export function getMenuAvailability(): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(AVAILABILITY_KEY, {});
}

export function setMenuAvailability(map: Record<string, boolean>): void {
  localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(map));
}

// ── Custom menu items (admin-added, localStorage-only) ─────────
export function getCustomMenuItems(): MenuItem[] {
  return safeGet<MenuItem[]>(CUSTOM_ITEMS_KEY, []);
}

export function addCustomMenuItem(item: MenuItem): void {
  localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify([...getCustomMenuItems(), item]));
}

export function deleteCustomMenuItem(id: string): void {
  localStorage.setItem(
    CUSTOM_ITEMS_KEY,
    JSON.stringify(getCustomMenuItems().filter((i) => i.id !== id))
  );
}

/** Returns static + custom items, with unavailable ones filtered out.
 *  Called by MenuClient so admin changes propagate to the public menu. */
export function getAllMenuItems(): MenuItem[] {
  if (typeof window === "undefined") return staticMenuItems;
  const avail = getMenuAvailability();
  const custom = getCustomMenuItems();
  return [...staticMenuItems, ...custom].filter((item) => avail[item.slug] !== false);
}

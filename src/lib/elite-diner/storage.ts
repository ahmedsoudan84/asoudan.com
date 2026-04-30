import { menuItems as staticMenuItems, type MenuItem } from "./menu-data";

const MENU_KEY = "elite-diner-custom-menu";
const MENU_OVERRIDES_KEY = "elite-diner-menu-overrides";
const MENU_DELETED_KEY = "elite-diner-menu-deleted";
const RESERVATIONS_KEY = "elite-diner-reservations";
const ORDERS_KEY = "elite-diner-orders";

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: "Pending" | "Confirmed" | "Seated" | "Cancelled";
}

export interface DinerOrder {
  id: string;
  customer: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  type: "Delivery" | "Collection" | "Dine-in";
  status: "Preparing" | "Ready" | "Collected" | "Delivered" | "Cancelled";
  date: string;
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getAllMenuItems(): MenuItem[] {
  if (typeof window === "undefined") return staticMenuItems;
  const custom = readJSON<MenuItem[]>(MENU_KEY, []);
  const overrides = readJSON<Record<string, Partial<MenuItem>>>(MENU_OVERRIDES_KEY, {});
  const deleted = readJSON<string[]>(MENU_DELETED_KEY, []);
  const merged = [...staticMenuItems, ...custom]
    .filter((m) => !deleted.includes(m.slug))
    .map((m) => (overrides[m.slug] ? { ...m, ...overrides[m.slug] } : m));
  return merged;
}

export function addMenuItem(item: MenuItem) {
  const custom = readJSON<MenuItem[]>(MENU_KEY, []);
  custom.push(item);
  writeJSON(MENU_KEY, custom);
}

export function updateMenuItem(slug: string, patch: Partial<MenuItem>) {
  const custom = readJSON<MenuItem[]>(MENU_KEY, []);
  const idx = custom.findIndex((m) => m.slug === slug);
  if (idx !== -1) {
    custom[idx] = { ...custom[idx], ...patch };
    writeJSON(MENU_KEY, custom);
    return;
  }
  const overrides = readJSON<Record<string, Partial<MenuItem>>>(MENU_OVERRIDES_KEY, {});
  overrides[slug] = { ...(overrides[slug] || {}), ...patch };
  writeJSON(MENU_OVERRIDES_KEY, overrides);
}

export function deleteMenuItem(slug: string) {
  const custom = readJSON<MenuItem[]>(MENU_KEY, []);
  const inCustom = custom.some((m) => m.slug === slug);
  if (inCustom) {
    writeJSON(MENU_KEY, custom.filter((m) => m.slug !== slug));
    return;
  }
  const deleted = readJSON<string[]>(MENU_DELETED_KEY, []);
  if (!deleted.includes(slug)) {
    deleted.push(slug);
    writeJSON(MENU_DELETED_KEY, deleted);
  }
}

const SEED_RESERVATIONS: Reservation[] = [
  { id: "RES-3041", name: "Olivia Hart", email: "olivia.h@example.com", phone: "+44 7700 900012", date: "2026-05-02", time: "19:30", guests: 4, notes: "Anniversary — quiet table", status: "Confirmed" },
  { id: "RES-3042", name: "Marcus Bailey", email: "m.bailey@example.com", phone: "+44 7700 900044", date: "2026-05-03", time: "20:00", guests: 2, status: "Pending" },
  { id: "RES-3043", name: "Priya Shah", email: "priya.s@example.com", phone: "+44 7700 900055", date: "2026-05-05", time: "18:45", guests: 6, notes: "Vegetarian tasting menu", status: "Confirmed" },
];

const SEED_ORDERS: DinerOrder[] = [
  { id: "ED-9042", customer: "James R.", items: [{ name: "Wagyu Striploin", price: 68, quantity: 1 }, { name: "Wine Pairing", price: 74, quantity: 1 }], total: 142, type: "Dine-in", status: "Preparing", date: "2026-04-29" },
  { id: "ED-9041", customer: "Sarah L.", items: [{ name: "Lobster Thermidor", price: 42, quantity: 1 }, { name: "Seared Diver Scallops", price: 18.5, quantity: 1 }], total: 85.5, type: "Collection", status: "Collected", date: "2026-04-29" },
  { id: "ED-9040", customer: "Robert M.", items: [{ name: "Tasting Menu", price: 105, quantity: 2 }], total: 210, type: "Delivery", status: "Delivered", date: "2026-04-28" },
  { id: "ED-9039", customer: "Emily W.", items: [{ name: "Truffle Pasta", price: 34, quantity: 1 }], total: 34, type: "Delivery", status: "Cancelled", date: "2026-04-28" },
];

export function getReservations(): Reservation[] {
  if (typeof window === "undefined") return SEED_RESERVATIONS;
  const raw = localStorage.getItem(RESERVATIONS_KEY);
  if (!raw) {
    writeJSON(RESERVATIONS_KEY, SEED_RESERVATIONS);
    return SEED_RESERVATIONS;
  }
  return JSON.parse(raw);
}

export function addReservation(r: Reservation) {
  const list = getReservations();
  list.unshift(r);
  writeJSON(RESERVATIONS_KEY, list);
}

export function updateReservationStatus(id: string, status: Reservation["status"]) {
  const list = getReservations();
  const idx = list.findIndex((r) => r.id === id);
  if (idx !== -1) {
    list[idx].status = status;
    writeJSON(RESERVATIONS_KEY, list);
  }
}

export function deleteReservation(id: string) {
  const list = getReservations().filter((r) => r.id !== id);
  writeJSON(RESERVATIONS_KEY, list);
}

export function getDinerOrders(): DinerOrder[] {
  if (typeof window === "undefined") return SEED_ORDERS;
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) {
    writeJSON(ORDERS_KEY, SEED_ORDERS);
    return SEED_ORDERS;
  }
  return JSON.parse(raw);
}

export function updateOrderStatus(id: string, status: DinerOrder["status"]) {
  const list = getDinerOrders();
  const idx = list.findIndex((o) => o.id === id);
  if (idx !== -1) {
    list[idx].status = status;
    writeJSON(ORDERS_KEY, list);
  }
}

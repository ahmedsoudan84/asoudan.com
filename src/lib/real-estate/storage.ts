import { Property, properties as staticProperties } from "./properties";

const LISTINGS_KEY = "ai-estate-custom-listings";
const BLOCKED_SLOTS_KEY = "ai-estate-blocked-slots";

export interface BlockedSlot {
  date: string; // YYYY-MM-DD
  time?: string; // Optional specific time slot. If empty, entire day is blocked.
}

export function getAllProperties(): Property[] {
  if (typeof window === "undefined") return staticProperties;
  try {
    const custom = JSON.parse(localStorage.getItem(LISTINGS_KEY) || "[]");
    return [...staticProperties, ...custom];
  } catch {
    return staticProperties;
  }
}

export function addProperty(property: Property) {
  const custom = JSON.parse(localStorage.getItem(LISTINGS_KEY) || "[]");
  localStorage.setItem(LISTINGS_KEY, JSON.stringify([...custom, property]));
}

export function deleteCustomProperty(slug: string) {
  const custom = JSON.parse(localStorage.getItem(LISTINGS_KEY) || "[]");
  const filtered = custom.filter((p: Property) => p.slug !== slug);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(filtered));
}

export function getBlockedSlots(): BlockedSlot[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BLOCKED_SLOTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBlockedSlots(slots: BlockedSlot[]) {
  localStorage.setItem(BLOCKED_SLOTS_KEY, JSON.stringify(slots));
}

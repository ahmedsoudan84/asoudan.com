import { Property } from "./properties";

// ── Walk Score ──────────────────────────────────────────────────
// Distance-weighted formula: each amenity within 1mi scores points,
// decaying linearly with distance. Max score 100.

function parseDistance(d: string): number {
  const num = parseFloat(d);
  if (d.includes("mi")) return num;
  if (d.includes("km")) return num * 0.621371;
  return num;
}

export function calculateWalkScore(property: Property): number {
  const allPlaces = [
    ...property.nearbySchools,
    ...property.nearbyShops,
    ...property.nearbyAmenities,
  ];

  if (allPlaces.length === 0) return 0;

  const maxDistance = 1.0; // miles
  let totalScore = 0;
  let maxPossible = allPlaces.length * 10;

  for (const place of allPlaces) {
    const dist = parseDistance(place.distance);
    if (dist <= maxDistance) {
      totalScore += 10 * (1 - dist / maxDistance);
    }
  }

  // Station bonus (up to 15 points)
  const stDist = parseDistance(property.stationDistance);
  if (stDist <= 0.5) {
    totalScore += 15 * (1 - stDist / 0.5);
    maxPossible += 15;
  }

  return Math.min(100, Math.round((totalScore / maxPossible) * 100));
}

export function walkScoreLabel(score: number): string {
  if (score >= 90) return "Walker's Paradise";
  if (score >= 70) return "Very Walkable";
  if (score >= 50) return "Somewhat Walkable";
  if (score >= 25) return "Car-Dependent";
  return "Almost All Errands Require a Car";
}

// ── Commute Calculator ──────────────────────────────────────────

export interface CommuteEstimate {
  station: string;
  walkMinutes: number;
  tubeMinutes: number;
  totalMinutes: number;
}

const TUBE_DESTINATIONS: Record<string, number> = {
  "Bank": 15,
  "Liverpool Street": 18,
  "King's Cross": 12,
  "Victoria": 14,
  "Waterloo": 16,
  "Oxford Circus": 10,
};

export function calculateCommute(
  property: Property,
  destination: string = "Bank"
): CommuteEstimate {
  const walkMiles = parseDistance(property.stationDistance);
  const walkMinutes = Math.round(walkMiles * 20); // ~20 min per mile walking
  const tubeMinutes = TUBE_DESTINATIONS[destination] ?? 15;

  return {
    station: property.station,
    walkMinutes,
    tubeMinutes,
    totalMinutes: walkMinutes + tubeMinutes,
  };
}

// ── Scarcity Engine ─────────────────────────────────────────────
// Tracks views in localStorage; surfaces urgency signals

const STORAGE_KEY = "ai-estate-views";

interface ViewRecord {
  slug: string;
  count: number;
  lastViewed: number;
}

function getViews(): ViewRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveViews(views: ViewRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
}

export function recordView(slug: string): ViewRecord {
  const views = getViews();
  const existing = views.find((v) => v.slug === slug);
  if (existing) {
    existing.count++;
    existing.lastViewed = Date.now();
    saveViews(views);
    return existing;
  }
  const record: ViewRecord = { slug, count: 1, lastViewed: Date.now() };
  views.push(record);
  saveViews(views);
  return record;
}

export function getViewCount(slug: string): number {
  return getViews().find((v) => v.slug === slug)?.count ?? 0;
}

export function getScarcityMessage(property: Property): string | null {
  const viewCount = getViewCount(property.slug);
  if (property.status === "Under Offer") return "Under Offer — Act fast";
  if (property.status === "Sold STC") return "Sold STC";
  if (property.status === "Let Agreed") return "Let Agreed";
  if (viewCount >= 5) return `Popular — viewed ${viewCount} times`;
  if (property.listingMode === "sale" && property.price < property.localAvgPrice * 0.9)
    return "Below local average price";
  return null;
}

// ── Price Comparison ────────────────────────────────────────────

export interface PriceComparison {
  difference: number;
  percentDiff: number;
  label: string;
  isBelow: boolean;
}

export function comparePriceToLocal(property: Property): PriceComparison {
  const diff = property.price - property.localAvgPrice;
  const pct = Math.round((diff / property.localAvgPrice) * 100);
  const isBelow = diff < 0;
  const absPct = Math.abs(pct);

  let label: string;
  if (absPct <= 3) label = "At local average";
  else if (isBelow) label = `${absPct}% below local average`;
  else label = `${absPct}% above local average`;

  return { difference: diff, percentDiff: pct, label, isBelow };
}

// ── Lead Scoring ────────────────────────────────────────────────
// Rule-based: time on page + actions taken

export interface LeadScore {
  score: number; // 0–100
  tier: "Hot" | "Warm" | "Cool";
  signals: string[];
}

export function calculateLeadScore(actions: {
  pageViews: number;
  contactFormOpened: boolean;
  searchesPerformed: number;
  propertiesViewed: number;
  timeOnSiteSeconds: number;
}): LeadScore {
  let score = 0;
  const signals: string[] = [];

  if (actions.pageViews >= 5) { score += 20; signals.push("High engagement"); }
  else if (actions.pageViews >= 2) { score += 10; signals.push("Returning visitor"); }

  if (actions.contactFormOpened) { score += 30; signals.push("Opened contact form"); }

  if (actions.searchesPerformed >= 3) { score += 15; signals.push("Active searcher"); }

  if (actions.propertiesViewed >= 3) { score += 15; signals.push("Browsing multiple properties"); }

  if (actions.timeOnSiteSeconds >= 300) { score += 20; signals.push("5+ minutes on site"); }
  else if (actions.timeOnSiteSeconds >= 120) { score += 10; signals.push("2+ minutes on site"); }

  score = Math.min(100, score);

  let tier: LeadScore["tier"] = "Cool";
  if (score >= 60) tier = "Hot";
  else if (score >= 30) tier = "Warm";

  return { score, tier, signals };
}

// ── AI Area Summary ─────────────────────────────────────────────
// Generates a paragraph from structured amenity data (no AI model needed)

export function generateAreaSummary(property: Property): string {
  const parts: string[] = [];

  // Schools
  const outstanding = property.nearbySchools.filter(
    (s) => s.rating === "Outstanding"
  );
  if (outstanding.length > 0) {
    parts.push(
      `Perfect for families — ${outstanding[0].distance} from ${outstanding[0].name} (Ofsted Outstanding)`
    );
  } else if (property.nearbySchools.length > 0) {
    parts.push(
      `${property.nearbySchools[0].name} is just ${property.nearbySchools[0].distance} away`
    );
  }

  // Transport
  parts.push(
    `${property.station} station is ${property.stationDistance} walk`
  );

  // Green spaces
  const parks = property.nearbyAmenities.filter(
    (a) => a.type === "Park" || a.type === "Garden"
  );
  if (parks.length > 0) {
    parts.push(`${parks[0].name} on your doorstep (${parks[0].distance})`);
  }

  // Shopping
  if (property.nearbyShops.length > 0) {
    parts.push(
      `${property.nearbyShops[0].name} for daily essentials (${property.nearbyShops[0].distance})`
    );
  }

  // Culture
  const culture = property.nearbyAmenities.filter(
    (a) =>
      a.type === "Theatre" ||
      a.type === "Gallery" ||
      a.type === "Museum" ||
      a.type === "Cinema"
  );
  if (culture.length > 0) {
    const names = culture.map((c) => c.name).slice(0, 2).join(" and ");
    parts.push(`cultural options including ${names} nearby`);
  }

  return parts.join(". ") + ".";
}

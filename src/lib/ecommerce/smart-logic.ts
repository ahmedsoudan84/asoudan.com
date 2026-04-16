import { products, type Product, type ProductCategory } from "./products";

/* ── Semantic-style product search ──────────────────────────── */

const SYNONYMS: Record<string, string[]> = {
  audio: ["sound", "music", "listen", "headphone", "earbud", "speaker"],
  workspace: ["desk", "office", "work", "home-office", "productivity", "wfh"],
  gift: ["present", "giftable", "birthday", "anniversary", "christmas"],
  minimal: ["minimalist", "simple", "clean", "understated"],
  travel: ["trip", "nomad", "carry-on", "suitcase", "backpack"],
  luxury: ["premium", "high-end", "designer", "exclusive"],
  cozy: ["warm", "snug", "comfort", "comforting", "hygge"],
  tech: ["gadget", "electronics", "smart", "connected"],
  sustainable: ["eco", "recycled", "green", "ethical", "natural"],
  wedding: ["wedding-gift", "housewarming", "registry"],
};

export function expandTokens(query: string): string[] {
  const words = query.toLowerCase().split(/[\s,.-]+/).filter(Boolean);
  const out = new Set(words);
  for (const word of words) {
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (word === key || syns.includes(word)) {
        out.add(key);
        syns.forEach((s) => out.add(s));
      }
    }
  }
  return Array.from(out);
}

export interface SearchFilters {
  category?: ProductCategory | "all";
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  /** Only show products currently discounted (have a `compareAtPrice`). */
  onSale?: boolean;
  /** Only show products flagged `isNew`. */
  newOnly?: boolean;
  /** Only show products flagged `isBestseller`. */
  bestsellersOnly?: boolean;
  /** Only show products whose tags include this token (case-insensitive). */
  vibe?: string | null;
}

export function searchProducts(
  query: string,
  filters: SearchFilters = {},
  items: Product[] = products
): Product[] {
  const {
    category = "all",
    minPrice = 0,
    maxPrice = Infinity,
    sort = "featured",
    onSale = false,
    newOnly = false,
    bestsellersOnly = false,
    vibe = null,
  } = filters;
  const tokens = query.trim() ? expandTokens(query) : [];
  const vibeToken = vibe?.toLowerCase() ?? null;

  // Price range phrases ("under £50", "below 100")
  let priceCap = maxPrice;
  const priceMatch = query.match(/(?:under|below|less than|max|up to)\s*£?(\d+)/i);
  if (priceMatch) priceCap = Math.min(priceCap, parseFloat(priceMatch[1]));

  const scored = items.map((item) => {
    const text = [
      item.name,
      item.tagline,
      item.description,
      item.brand,
      item.colour,
      item.category,
      item.tags.join(" "),
      item.materials.join(" "),
      item.features.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (!token) continue;
      if (text.includes(token)) score += 2;
      if (token.length > 3 && text.includes(token.slice(0, -1))) score += 1;
    }

    // Tag exact match
    for (const tag of item.tags) {
      if (tokens.includes(tag.toLowerCase())) score += 3;
    }

    // Category match
    if (tokens.includes(item.category)) score += 4;

    // Bestseller / new nudges (tiny — only for empty-query sorting)
    const baseRank = (item.isBestseller ? 2 : 0) + (item.isNew ? 1 : 0);

    return { item, score: score + baseRank };
  });

  const filtered = scored
    .filter(({ item, score }) => {
      if (category !== "all" && item.category !== category) return false;
      if (item.price < minPrice || item.price > priceCap) return false;
      if (onSale && !item.compareAtPrice) return false;
      if (newOnly && !item.isNew) return false;
      if (bestsellersOnly && !item.isBestseller) return false;
      if (vibeToken) {
        const hasVibe =
          item.tags.some((t) => t.toLowerCase() === vibeToken) ||
          item.category === vibeToken;
        if (!hasVibe) return false;
      }
      if (tokens.length > 0 && score <= 0) return false;
      return true;
    })
    .map(({ item, score }) => ({ item, score }));

  const sorted = filtered.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.item.price - b.item.price;
      case "price-desc":
        return b.item.price - a.item.price;
      case "rating":
        return b.item.rating - a.item.rating;
      case "newest":
        return (b.item.isNew ? 1 : 0) - (a.item.isNew ? 1 : 0);
      case "featured":
      default:
        if (tokens.length > 0) return b.score - a.score;
        return (b.item.isBestseller ? 1 : 0) - (a.item.isBestseller ? 1 : 0);
    }
  });

  return sorted.map((s) => s.item);
}

/* ── Occasion-based AI recommendations ─────────────────────── */

export interface OccasionBundle {
  id: string;
  title: string;
  description: string;
  productSlugs: string[];
}

export const OCCASION_BUNDLES: OccasionBundle[] = [
  {
    id: "wfh",
    title: "The Focus Deck",
    description:
      "A calm, distraction-free desk that lets deep work happen. Paired for posture, lighting, and sound.",
    productSlugs: ["oak-standing-desk", "contour-office-chair", "pivot-mechanical-keyboard", "halo-desk-lamp"],
  },
  {
    id: "gift",
    title: "The Thoughtful Gift",
    description:
      "Beautifully giftable pieces under £250 that feel expensive without trying too hard.",
    productSlugs: ["atlas-leather-bifold", "ember-candle-trio", "boulder-ceramic-mug", "halcyon-aroma-diffuser"],
  },
  {
    id: "travel",
    title: "The Carry-On Kit",
    description:
      "Everything you need in the overhead bin — no checked luggage, no compromises.",
    productSlugs: ["nomad-travel-bag", "lumen-pro-earbuds", "meridian-smart-watch", "sable-linen-shirt"],
  },
  {
    id: "unwind",
    title: "The Slow-Sunday Set",
    description:
      "Soft light, quiet sound, softer textures. A nervous-system reset in four objects.",
    productSlugs: ["drift-weighted-throw", "halcyon-aroma-diffuser", "beacon-smart-speaker", "ember-candle-trio"],
  },
];

export function getBundle(id: string): OccasionBundle | undefined {
  return OCCASION_BUNDLES.find((b) => b.id === id);
}

export function getBundleProducts(bundle: OccasionBundle): Product[] {
  return bundle.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

/* ── AI chat assistant (rules-based, deterministic) ────────── */

interface ChatReply {
  text: string;
  suggestedSlugs?: string[];
}

const intentRules: { match: RegExp; reply: (q: string) => ChatReply }[] = [
  {
    match: /\b(hello|hi|hey|yo|good (morning|afternoon|evening))\b/i,
    reply: () => ({
      text: "Hello — I'm the in-house AI stylist. Tell me what you're shopping for, the occasion, or a budget, and I'll narrow it down.",
    }),
  },
  {
    match: /\b(gift|present|birthday|anniversary|christmas)\b/i,
    reply: () => ({
      text: "Giftable picks are my favourite. Under £250, I'd point you at the Atlas Bifold, the Ember Trio candle set, or the Boulder ceramic mugs — all three land without feeling like a last-minute grab.",
      suggestedSlugs: ["atlas-leather-bifold", "ember-candle-trio", "boulder-ceramic-mug"],
    }),
  },
  {
    match: /\b(work from home|wfh|office|desk setup|home office|productivity)\b/i,
    reply: () => ({
      text: "For a home office that actually feels good to sit at eight hours a day: the Oak Riser standing desk, the Contour task chair, and the Halo circadian lamp. Add the Pivot 75 keyboard if you type a lot.",
      suggestedSlugs: ["oak-standing-desk", "contour-office-chair", "halo-desk-lamp", "pivot-mechanical-keyboard"],
    }),
  },
  {
    match: /\b(travel|trip|vacation|holiday|carry.?on|backpack|suitcase)\b/i,
    reply: () => ({
      text: "Travel kit: Nomad 30 carry-on, Lumen Pro earbuds for the flight, Meridian 42 for GPS + health tracking anywhere. That combo covers you for anything short of a polar expedition.",
      suggestedSlugs: ["nomad-travel-bag", "lumen-pro-earbuds", "meridian-smart-watch"],
    }),
  },
  {
    match: /\b(music|listen|audio|sound|headphone|earbud|speaker)\b/i,
    reply: () => ({
      text: "Three audio paths depending on your life: Arcline Studio for reference-grade at the desk, Lumen Pro for commutes, Beacon for filling a room without cables. All three are tuned by the same team.",
      suggestedSlugs: ["arcline-studio-headphones", "lumen-pro-earbuds", "beacon-smart-speaker"],
    }),
  },
  {
    match: /\b(cozy|cosy|warm|comfort|relax|unwind|sleep|hygge)\b/i,
    reply: () => ({
      text: "For the soft-sunday feeling: Drift weighted throw, Ember candle trio, Halcyon aroma diffuser. They work individually, but the three together is basically a nervous-system reset.",
      suggestedSlugs: ["drift-weighted-throw", "ember-candle-trio", "halcyon-aroma-diffuser"],
    }),
  },
  {
    match: /\b(budget|cheap|affordable|under \d+|less than|max)\b/i,
    reply: () => ({
      text: "If you're keeping it under £150 and still want something real: Atlas Bifold (£129), Sable linen shirt (£149), Halcyon aroma diffuser (£119), Boulder ceramic mugs (£48).",
      suggestedSlugs: ["atlas-leather-bifold", "sable-linen-shirt", "halcyon-aroma-diffuser", "boulder-ceramic-mug"],
    }),
  },
  {
    match: /\b(shipping|delivery|arrive|ship|when)\b/i,
    reply: () => ({
      text: "Free UK delivery on orders over £75, 2-day express as standard. Orders placed before 3pm ship same-day. International in 5–7 working days.",
    }),
  },
  {
    match: /\b(return|refund|warranty|guarantee)\b/i,
    reply: () => ({
      text: "60-day returns on anything unused. Lifetime repair on Nomad bags, 10-year warranty on Oak furniture, 12-year on Contour chairs. If it breaks from normal use, we fix or replace it.",
    }),
  },
  {
    match: /\b(sustain|eco|ethical|recycle|environment)\b/i,
    reply: () => ({
      text: "Every piece is built to last — which is the honest sustainability play. Nomad uses recycled sailcloth, Drift sources British wool within a 200-mile radius, Boulder reuses kiln heat for studio warmth. Full supply-chain notes on each product page.",
    }),
  },
];

export function getChatReply(query: string): ChatReply {
  for (const rule of intentRules) {
    if (rule.match.test(query)) return rule.reply(query);
  }

  // Fall back to semantic search + friendly wrapper
  const results = searchProducts(query, { sort: "featured" }).slice(0, 3);
  if (results.length > 0) {
    const names = results.map((r) => r.name).join(", ");
    return {
      text: `Based on what you said, I'd look at: ${names}. Want me to narrow it to one?`,
      suggestedSlugs: results.map((r) => r.slug),
    };
  }

  // Final fallback: still surface three bestsellers so the user has something to react to.
  const trending = [...products]
    .sort(
      (a, b) =>
        (b.isBestseller ? 2 : 0) + b.rating - ((a.isBestseller ? 2 : 0) + a.rating)
    )
    .slice(0, 3);
  return {
    text: "I couldn't quite place that — mind telling me the occasion (gift, travel, WFH), a rough budget, or a vibe (minimal, cosy, premium)? In the meantime, here are three pieces the house always stands behind.",
    suggestedSlugs: trending.map((t) => t.slug),
  };
}

/* ── Personalised recommendations from a seed product ──────── */

export function recommendFrom(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug)
    .map((p) => {
      const tagOverlap = p.tags.filter((t) => product.tags.includes(t)).length;
      const sameCategory = p.category === product.category ? 3 : 0;
      const priceProximity = 1 - Math.min(Math.abs(p.price - product.price) / 1000, 1);
      return { p, score: tagOverlap * 2 + sameCategory + priceProximity };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

import type { FAQItem } from "@/components/buy/FAQSection";

const COMMON: FAQItem[] = [
  {
    q: "Do I own the code?",
    a: "Yes. Once paid, you get the full source on a private repo under your account. We don't lock the template behind a license server, and you don't owe us a recurring fee to keep it running.",
  },
  {
    q: "How long does branding and launch take?",
    a: "Starter: 5–7 working days. Studio: 2–3 weeks (longer because of content imports and SEO setup). Bespoke: scoped per project — typically 4–8 weeks. Timelines start once we've signed off on brand assets and content.",
  },
  {
    q: "What if I want to add Stripe / a CRM / a custom feature later?",
    a: "All add-ons are scoped and quoted separately. Stripe checkout, CRM webhooks (HubSpot, Pipedrive), Calendly/Google Calendar, custom integrations — all doable on the existing codebase. Recent rates: integrations from £450, custom features from £950.",
  },
  {
    q: "Is hosting included in the price?",
    a: "Hosting itself is billed at cost (Vercel, domain registrar, transactional email). Most clients run under £25/month all-in. Setup, configuration, and DNS handover are included in Studio and Bespoke.",
  },
  {
    q: "What happens if I find a bug after launch?",
    a: "Starter includes 30 days of bug-fix support. Studio inherits the same. Bespoke includes 3 months of priority support and iteration. Beyond that, we offer monthly retainers from £350/month for ongoing tweaks, content updates, and priority response.",
  },
  {
    q: "Can I see the templates running before I commit?",
    a: "Yes — that's what this page is. Click into the live demo, browse the menu / shop / listings, log into the admin panel (the password is shown on the login modal). What you see is what you get, just rebranded for you.",
  },
];

const ELITE_DINER_SPECIFIC: FAQItem[] = [
  {
    q: "Do you handle the menu photography?",
    a: "Studio includes premium photo swap (AI-generated or licensed stock) for up to 30 dishes. If you've got existing photography, we'll integrate it. For full bespoke food photography, we partner with London-based food photographers — quoted per shoot.",
  },
  {
    q: "Can the booking flow connect to OpenTable / SevenRooms?",
    a: "Out of the box the reservation flow is client-side. Integrating OpenTable, SevenRooms, or a custom POS sync is a Bespoke add-on — typically 1–2 weeks of work depending on the API.",
  },
];

const ECOMMERCE_SPECIFIC: FAQItem[] = [
  {
    q: "Does it actually take payments?",
    a: "Out of the box, the demo runs a local cart and checkout flow without payments wired up — perfect for browsing the experience. For real sales, we add Stripe Checkout, Apple/Google Pay, and tax handling as a Bespoke add-on (typically £950).",
  },
  {
    q: "How does the AI stylist work without an API key?",
    a: "Semantic search and the stylist run on a small embedding model bundled with the site. No OpenAI key, no per-query cost, no privacy issues. If you want server-side LLM responses (e.g., live chat), we can wire that up as a Bespoke add-on.",
  },
];

const REAL_ESTATE_SPECIFIC: FAQItem[] = [
  {
    q: "Can listings sync from Rightmove / Zoopla / a Property CRM?",
    a: "The admin panel is fully client-side by default. For live syncs from Rightmove, Zoopla, Reapit, or Alto, we add a small server endpoint as a Bespoke add-on. Typically £950–£1,800 depending on the source feed.",
  },
  {
    q: "Do you handle property photography or floor plans?",
    a: "Studio includes integration of your existing photography, floor plans, and EPCs. Net new photography is quoted with our partner property photographers (London-based).",
  },
];

export const ELITE_DINER_FAQ: FAQItem[] = [
  ...ELITE_DINER_SPECIFIC,
  ...COMMON,
];

export const ECOMMERCE_FAQ: FAQItem[] = [
  ...ECOMMERCE_SPECIFIC,
  ...COMMON,
];

export const REAL_ESTATE_FAQ: FAQItem[] = [
  ...REAL_ESTATE_SPECIFIC,
  ...COMMON,
];

export function buildFAQJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

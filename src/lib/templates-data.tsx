import React from "react";

export type TemplateStatus = "live" | "coming-soon";

export interface TemplateCategory {
  slug: string | null;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: TemplateStatus;
  coverImage: string | null;
  icon: React.ReactNode;
}

export const categories: TemplateCategory[] = [
  {
    slug: "elite-diner",
    title: "Restaurants",
    subtitle: "Premium Restaurant Template with AI",
    description:
      "Elegant menu, online ordering, table booking, AI recommender & chatbot. Fully client-side — no API keys ever.",
    tags: ["Next.js 15", "AI-Powered", "Online Ordering", "Reservations"],
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    subtitle: "London Estate Agent Template with AI Features",
    description:
      "Semantic property search, AI chatbot, area insights, admin portal. Fully client-side — no API keys required.",
    tags: ["Next.js 15", "AI-Powered", "Admin Portal", "12 Listings"],
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <rect x="7" y="4" width="10" height="5" rx="1" />
      </svg>
    ),
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    subtitle: "Kurator — Premium Shop Template with AI Stylist",
    description:
      "Semantic product search, AI stylist with occasion bundles, persistent cart, 3-step checkout. Twenty-two curated products across six categories. Fully client-side.",
    tags: ["Next.js 16", "AI Stylist", "Cart + Checkout", "22 Products"],
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    slug: null,
    title: "SaaS Dashboard",
    subtitle: "Analytics & subscription management template",
    description:
      "Charts, user management, billing integration, dark mode. Built with Recharts and Tailwind.",
    tags: ["Next.js", "Dashboard", "Charts"],
    status: "coming-soon",
    coverImage: null,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
        <path d="M12 14v7" />
      </svg>
    ),
  },
  {
    slug: null,
    title: "Creative Portfolio",
    subtitle: "Photography & art showcase template",
    description:
      "Masonry galleries, lightbox, client proofing, print sales integration.",
    tags: ["Next.js", "Gallery", "Portfolio"],
    status: "coming-soon",
    coverImage: null,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
];
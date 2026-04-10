"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";

const categories = [
  {
    slug: "real-estate",
    title: "Real Estate",
    subtitle: "London Estate Agent Template with AI Features",
    description:
      "Semantic property search, AI chatbot, area insights, admin portal. Fully client-side — no API keys required.",
    tags: ["Next.js 15", "AI-Powered", "Admin Portal", "12 Listings"],
    status: "live" as const,
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
    slug: null,
    title: "SaaS Dashboard",
    subtitle: "Analytics & subscription management template",
    description:
      "Charts, user management, billing integration, dark mode. Built with Recharts and Tailwind.",
    tags: ["Next.js", "Dashboard", "Charts"],
    status: "coming-soon" as const,
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
      "Masonry galleries, lightbox, client proofing, e-commerce integration for prints.",
    tags: ["Next.js", "Gallery", "E-commerce"],
    status: "coming-soon" as const,
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

export default function BuyCategoriesClient() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-montserrat text-4xl md:text-6xl font-bold tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Premium Website Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-montserrat text-lg md:text-xl mt-6 max-w-2xl mx-auto"
            style={{ color: "var(--fg-50)" }}
          >
            Ready-to-use, customisable, built with Next.js + AI
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const isLive = cat.status === "live";
            const Card = (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                  isLive
                    ? "hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.15)]"
                    : "opacity-60"
                }`}
                style={{
                  background: "var(--bg-surface)",
                  borderColor: isLive ? "var(--border-card)" : "var(--border-subtle)",
                }}
              >
                {/* Preview area */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ background: isLive && cat.coverImage ? "transparent" : "var(--bg-tertiary)" }}
                >
                  {isLive && cat.coverImage ? (
                    <img 
                      src={cat.coverImage} 
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : isLive ? (
                    <div className="text-center p-6">
                      <div className="mb-3" style={{ color: "var(--accent)", opacity: 0.3 }}>
                        {cat.icon}
                      </div>
                      <div
                        className="text-2xl font-bold font-montserrat"
                        style={{ color: "var(--accent)", opacity: 0.15 }}
                      >
                        PREVIEW
                      </div>
                    </div>
                  ) : (
                    <span
                      className="font-montserrat text-xs uppercase tracking-[3px]"
                      style={{ color: "var(--fg-30)" }}
                    >
                      Coming Soon
                    </span>
                  )}
                  {isLive && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-wider font-semibold"
                      style={{
                        background: "rgba(0,241,241,0.15)",
                        color: "var(--accent)",
                        border: "1px solid rgba(0,241,241,0.3)",
                      }}
                    >
                      Live
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-montserrat text-xl font-bold"
                    style={{ color: "var(--fg)" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="font-montserrat text-sm mt-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {cat.subtitle}
                  </p>
                  <p
                    className="font-montserrat text-sm mt-3 leading-relaxed"
                    style={{ color: "var(--fg-50)" }}
                  >
                    {cat.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-wider"
                        style={{
                          background: "var(--fg-06)",
                          color: "var(--fg-50)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isLive && (
                    <div
                      className="mt-6 text-center py-2.5 rounded-lg font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,241,241,0.2)]"
                      style={{
                        background: "rgba(0,241,241,0.1)",
                        color: "var(--accent)",
                        border: "1px solid rgba(0,241,241,0.3)",
                      }}
                    >
                      View Template &rarr;
                    </div>
                  )}
                </div>
              </motion.div>
            );

            if (isLive && cat.slug) {
              return (
                <Link key={cat.title} href={`/buy/${cat.slug}`} className="block">
                  {Card}
                </Link>
              );
            }
            return Card;
          })}
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { properties } from "@/lib/real-estate/properties";
import LondonSkylineParallax from "@/components/parallax/LondonSkylineParallax";

function getStatusStyle(status: string): { bg: string; color: string; border: string } {
  const isRent = status === "To Let" || status === "Let Agreed";
  
  if (isRent) {
    return {
      bg: "rgba(16, 185, 129, 0.9)",
      color: "#ffffff",
      border: "rgba(16, 185, 129, 0.5)",
    };
  }
  
  if (status === "For Sale") {
    return {
      bg: "rgba(0, 241, 241, 0.95)",
      color: "#0a0c14",
      border: "rgba(0, 241, 241, 0.5)",
    };
  }
  
  if (status === "Under Offer") {
    return {
      bg: "rgba(251, 191, 36, 0.9)",
      color: "#1a1a1a",
      border: "rgba(251, 191, 36, 0.5)",
    };
  }
  
  if (status === "Sold STC") {
    return {
      bg: "rgba(239, 68, 68, 0.9)",
      color: "#ffffff",
      border: "rgba(239, 68, 68, 0.5)",
    };
  }
  
  return {
    bg: "rgba(255, 255, 255, 0.9)",
    color: "#1a1a1a",
    border: "rgba(255, 255, 255, 0.3)",
  };
}

const EMOTIONS = [
  { label: "Family-friendly", query: "family schools garden" },
  { label: "City buzz", query: "central vibrant nightlife" },
  { label: "Peaceful retreat", query: "quiet green space park" },
  { label: "Investment", query: "below average price growth" },
  { label: "Luxury living", query: "penthouse concierge premium" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "AI-Powered Search",
    desc: "Describe what you want in plain English — our semantic search understands intent, not just keywords.",
  },
  {
    step: "02",
    title: "Smart Insights",
    desc: "Walk scores, commute times, price comparisons, and area summaries generated instantly for every property.",
  },
  {
    step: "03",
    title: "Admin Portal",
    desc: "Manage listings, leads, and branding from a built-in admin dashboard — no backend required.",
  },
];

const TRUST = [
  { stat: "12", label: "Premium Listings" },
  { stat: "3", label: "AI Features" },
  { stat: "0", label: "API Keys Needed" },
  { stat: "100%", label: "Client-Side" },
];

export default function RealEstateHomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = properties.slice(0, 3);

  return (
    <div>
      <LondonSkylineParallax />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Subtle gradient orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
          style={{ background: "var(--accent)" }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-montserrat uppercase tracking-[3px] font-semibold mb-8"
              style={{
                background: "rgba(0,241,241,0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(0,241,241,0.2)",
              }}
            >
              Real Estate
            </span>
            <h1
              className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
              style={{ color: "var(--fg)" }}
            >
              Find Your Perfect
              <br />
              <span style={{ color: "var(--accent)" }}>London Home</span>
            </h1>
            <p
              className="font-montserrat text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--fg-50)" }}
            >
              AI-powered property search with semantic understanding.
              Describe your dream home — we&apos;ll find it.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4 border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-card)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="shrink-0"
                style={{ color: "var(--fg-40)" }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try: 'family home near good schools with garden'"
                className="flex-1 bg-transparent font-montserrat text-sm outline-none placeholder:opacity-40"
                style={{ color: "var(--fg)" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/buy/real-estate/listings?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <Link
                href={`/buy/real-estate/listings${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}
                className="px-5 py-2 rounded-xl font-montserrat text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,241,241,0.3)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                Search
              </Link>
            </div>

            {/* Emotion chips */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {EMOTIONS.map((e) => (
                <button
                  key={e.label}
                  onClick={() => setSearchQuery(e.query)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-montserrat tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "var(--fg-06)",
                    color: "var(--fg-50)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Listings ────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="font-montserrat text-3xl md:text-4xl font-bold"
                style={{ color: "var(--fg)" }}
              >
                Featured Properties
              </h2>
              <p
                className="font-montserrat text-sm mt-2"
                style={{ color: "var(--fg-50)" }}
              >
                Hand-picked London homes
              </p>
            </div>
            <Link
              href="/buy/real-estate/listings"
              className="font-montserrat text-xs uppercase tracking-[2px] transition-colors hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/buy/real-estate/listings/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.12)]"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-card)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-montserrat uppercase tracking-wider font-semibold"
                      style={{
                        background: getStatusStyle(p.status).bg,
                        color: getStatusStyle(p.status).color,
                        border: `1px solid ${getStatusStyle(p.status).border}`,
                      }}
                    >
                      {p.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="font-montserrat text-lg font-bold"
                      style={{ color: "var(--fg)" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="font-montserrat text-xs mt-1"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {p.borough}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span
                        className="font-montserrat text-xl font-bold"
                        style={{ color: "var(--accent)" }}
                      >
                        {p.priceLabel}
                      </span>
                      <div
                        className="flex items-center gap-3 text-[11px] font-montserrat"
                        style={{ color: "var(--fg-40)" }}
                      >
                        <span>{p.beds} bed</span>
                        <span>{p.baths} bath</span>
                        <span>{p.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="font-montserrat text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: "var(--fg)" }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <span
                  className="font-montserrat text-4xl font-bold"
                  style={{ color: "var(--accent)", opacity: 0.3 }}
                >
                  {item.step}
                </span>
                <h3
                  className="font-montserrat text-lg font-bold mt-4"
                  style={{ color: "var(--fg)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-montserrat text-sm mt-3 leading-relaxed"
                  style={{ color: "var(--fg-50)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────── */}
      <section
        className="py-16 px-6 lg:px-12 border-y"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST.map((t) => (
            <div key={t.label} className="text-center">
              <div
                className="font-montserrat text-4xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {t.stat}
              </div>
              <div
                className="font-montserrat text-xs uppercase tracking-[2px] mt-2"
                style={{ color: "var(--fg-40)" }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2
            className="font-montserrat text-3xl md:text-4xl font-bold"
            style={{ color: "var(--fg)" }}
          >
            Ready to Try It?
          </h2>
          <p
            className="font-montserrat text-sm mt-4 leading-relaxed"
            style={{ color: "var(--fg-50)" }}
          >
            Browse the full demo with AI-powered search, smart insights,
            and admin portal — all running client-side.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/buy/real-estate/listings"
              className="px-8 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,241,241,0.3)]"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              Live Demo
            </Link>
            <Link
              href="/buy/real-estate/contact"
              className="px-8 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all duration-300 border"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              Contact About Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

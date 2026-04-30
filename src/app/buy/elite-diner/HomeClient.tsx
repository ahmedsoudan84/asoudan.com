"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import { menuItems } from "@/lib/elite-diner/menu-data";
import PricingSection from "@/components/buy/PricingSection";
import FAQSection from "@/components/buy/FAQSection";
import { ELITE_DINER_FAQ } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const HERO_CHIPS = [
  { label: "Date Night", query: "romantic" },
  { label: "Family Feast", query: "sharing family" },
  { label: "Quick Lunch", query: "light quick" },
  { label: "Vegetarian", query: "vegetarian" },
  { label: "Luxury", query: "wagyu lobster" },
];

const FEATURES = [
  {
    icon: <Icons.Sparkles className="w-6 h-6" />,
    title: "AI Semantic Search",
    desc: "Find dishes by mood or craving. 'Something spicy and under £25' just works.",
  },
  {
    icon: <Icons.ShoppingCart className="w-6 h-6" />,
    title: "Seamless Ordering",
    desc: "A fully integrated client-side cart for effortless takeaway or delivery.",
  },
  {
    icon: <Icons.Calendar className="w-6 h-6" />,
    title: "Table Reservations",
    desc: "Beautiful booking flow with custom multi-step scheduling for your establishment.",
  },
];

const TRUST_STATS = [
  { value: "30+", label: "Menu Items" },
  { value: "5", label: "AI Tools" },
  { value: "0", label: "API Fees" },
  { value: "100%", label: "Client-Side" },
];

export default function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredDishes = menuItems.filter((m) => m.dietaryTags.includes("chef-special")).slice(0, 3);

  return (
    <div className="w-full">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Ambient background with warm overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1546241072-48010ad28abb?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant Ambiance"
            className="w-full h-full object-cover scale-105"
            loading="eager"
            crossOrigin="anonymous"
            onError={(e) => {
              // Deterministic, on-brand fallback chain. The old fallback used
              // `picsum.photos/...?random=hero` — the `?random=X` query is not a
              // seed, so picsum served a fresh random image on every load
              // (suits, landscapes, whatever). We now retry once with a second
              // restaurant-interior Unsplash URL; if that also fails we hide the
              // image so the page's own background shows through instead.
              const target = e.target as HTMLImageElement;
              if (target.dataset.fallbackTried !== "1") {
                target.dataset.fallbackTried = "1";
                target.src =
                  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2000";
              } else {
                target.style.display = "none";
              }
            }}
          />
          {/* Theme-aware overlay. Using rgba(0,0,0,...) instead of bg-primary
              keeps the photo legible in light mode — where bg-primary is near
              white and previously washed the image out. */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/10 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-bg-primary/55 via-bg-primary/20 to-transparent" />
        </div>

        <div className="max-w-[1000px] w-full mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-12 h-px" style={{ background: "var(--accent)", opacity: 0.3 }} />
              <span className="text-accent text-[11px] font-bold uppercase tracking-[4px]">Fine Dining Redefined</span>
              <span className="w-12 h-px" style={{ background: "var(--accent)", opacity: 0.3 }} />
            </div>

            {/* Hero text sits on a photo with a consistent dark scrim, so
                colours are locked light-on-dark in both themes. Previously
                the heading used var(--fg) (dark navy in light mode), which
                was illegible after loosening the light-mode overlay. */}
            <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]" style={{ color: "#ffffff" }}>
              Savour the <br />
              <span style={{ color: "var(--accent)" }}>Future</span>
            </h1>

            <p className="max-w-xl mx-auto text-lg md:text-xl font-montserrat leading-relaxed mb-12 drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]" style={{ color: "rgba(255,255,255,0.82)" }}>
              The premium London restaurant template powered by invisible AI.
              Built for conversion, designed for elegance.
            </p>

            {/* AI Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <div 
                className="flex items-center gap-3 px-5 py-4 rounded-2xl border group transition-all"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <Icons.Search className="w-5 h-5 shrink-0" style={{ color: "var(--fg-40)" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tell us what you crave... 'something spicy' or 'date night'"
                  className="flex-1 bg-transparent py-3 font-montserrat text-sm outline-none"
                  style={{ color: "var(--fg)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/buy/elite-diner/menu?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <Link
                  href={`/buy/elite-diner/menu?q=${encodeURIComponent(searchQuery)}`}
                  className="px-6 py-3 rounded-xl font-montserrat text-xs font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] active:scale-95"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Explore
                </Link>
              </div>

              {/* Quick Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {HERO_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setSearchQuery(chip.query)}
                    className="px-3.5 py-1.5 rounded-full border text-[10px] uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-all animate-in fade-in slide-in-from-bottom-2"
                    style={{
                      background: "var(--fg-06)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--fg-50)",
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        
      </section>

      {/* ── Introduction ─────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold leading-tight mb-8">
              A Modern Template for <br />
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Exquisite</span> Tastes
            </h2>
            <p className="text-lg text-fg-60 leading-relaxed mb-10">
              Elite Diner isn&apos;t just a website; it&apos;s a digital experience that mirrors the quality of your cuisine. 
              Integrated with client-side AI, it provides personalised recommendations that boost ordering value by up to 30%.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    {f.icon}
                  </div>
                  <h3 className="font-montserrat font-bold text-lg">{f.title}</h3>
                  <p className="text-sm text-fg-40 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:pl-10"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
                alt="Signature Dish"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/1200/1500?random=sig";
                }}
              />
            </div>
            {/* Float Badge — Lighthouse score ring */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 lg:-bottom-10 lg:left-0 flex items-center gap-4 pl-3 pr-5 py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl shadow-accent/20 z-20"
              style={{
                background: "var(--nav-bg)",
                borderColor: "rgba(var(--accent-rgb), 0.3)",
              }}
            >
              <div className="relative w-14 h-14 shrink-0">
                <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    strokeWidth="3"
                    stroke="var(--fg-10)"
                  />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="var(--accent)"
                    initial={{ strokeDasharray: "0 100" }}
                    whileInView={{ strokeDasharray: "98 100" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-montserrat font-black text-base leading-none"
                    style={{ color: "var(--accent)" }}
                  >
                    98
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-montserrat text-[9px] uppercase font-bold tracking-[2.5px]"
                  style={{ color: "var(--accent)" }}
                >
                  Lighthouse
                </span>
                <span
                  className="font-montserrat text-[11px] font-bold"
                  style={{ color: "var(--fg)" }}
                >
                  Performance · Best practice
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Menu ────────────────────────────────── */}
      <section className="py-32 px-6 bg-secondary" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-accent text-[11px] font-bold uppercase tracking-[4px] block mb-4">Chef&apos;s Recommendations</span>
              <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Featured Creations</h2>
            </div>
            <Link 
              href="/buy/elite-diner/menu" 
              className="group flex items-center gap-3 text-accent font-montserrat text-xs font-bold uppercase tracking-widest"
            >
              Explore Full Menu
              <Icons.ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/buy/elite-diner/menu/${dish.slug}`}
                  className="group block p-4 rounded-[2rem] border transition-all hover:bg-fg-05 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.dataset.fallbackTried !== "1") {
                          target.dataset.fallbackTried = "1";
                          target.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800`;
                        }
                      }}
                    />
                  </div>
                  <div className="px-2">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-montserrat text-xl font-bold group-hover:text-accent transition-colors">{dish.name}</h3>
                      <span className="text-accent font-bold">£{dish.price}</span>
                    </div>
                    <p className="text-fg-40 text-sm line-clamp-2 leading-relaxed mb-6">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-2">
                      {dish.dietaryTags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-accent text-[9px] uppercase font-bold shadow-sm"
                          style={{ color: "var(--bg-primary)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────── */}
      <section className="py-24 px-6 border-y" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl font-black mb-4 transition-transform group-hover:scale-110" style={{ color: "var(--accent)" }}>
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[3px] font-bold" style={{ color: "var(--fg-50)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────── */}
      {(() => {
        const tpl = categories.find((c) => c.slug === "elite-diner");
        return tpl?.pricing ? (
          <PricingSection
            templateLabel="Restaurant"
            templateSlug="elite-diner"
            tiers={tpl.pricing}
          />
        ) : null;
      })()}

      {/* ── FAQ ─────────────────────────────────────────── */}
      <FAQSection items={ELITE_DINER_FAQ} templateSlug="elite-diner" />

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-10">
            <Icons.ChefHat className="w-10 h-10" />
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
            Ready to <span className="text-accent">Dine?</span>
          </h2>
          <p className="text-lg text-fg-60 mb-12">
            Try the live demo of our ordering system, search through our AI-integrated menu, or secure your table for an unforgettable evening.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/buy/elite-diner/menu"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] shadow-xl shadow-accent/20 transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Order Delivery
            </Link>
            <Link
              href="/buy/elite-diner/book"
              className="cta-secondary-glow w-full sm:w-auto px-10 py-5 rounded-2xl border font-montserrat text-xs font-bold uppercase tracking-[2px]"
              style={{ borderColor: "var(--secondary)", color: "var(--secondary)", boxShadow: "0 0 0 1px rgba(var(--secondary-rgb),0.1), 0 0 18px rgba(var(--secondary-rgb),0.15)" }}
            >
              Book a Table
            </Link>
            <Link
              href="/buy/elite-diner/admin"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl border font-montserrat text-xs font-bold uppercase tracking-[2px] transition-all hover:scale-105"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

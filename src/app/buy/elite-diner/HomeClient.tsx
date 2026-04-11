"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import { menuItems } from "@/lib/elite-diner/menu-data";

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
            src="https://images.unsplash.com/photo-1550966842-28dbdc2891f7?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant Ambiance"
            className="w-full h-full object-cover scale-105"
          />
          {/* Theme-aware overlay */}
          <div className="absolute inset-0 bg-[#0a0c10]/70 dark:bg-[#0a0c10]/85 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-[#0a0c10]/40" />
        </div>

        <div className="max-w-[1000px] w-full mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-12 h-px bg-accent/30" />
              <span className="text-accent text-[11px] font-bold uppercase tracking-[4px]">Fine Dining Redefined</span>
              <span className="w-12 h-px bg-accent/30" />
            </div>

            <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white mb-8">
              Savour the <br />
              <span className="text-accent">Future</span>
            </h1>

            <p className="max-w-xl mx-auto text-white/60 text-lg md:text-xl font-montserrat leading-relaxed mb-12">
              The premium London restaurant template powered by invisible AI. 
              Built for conversion, designed for elegance.
            </p>

            {/* AI Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <div 
                className="flex items-center gap-3 p-2 pl-6 rounded-2xl border backdrop-blur-xl group transition-all"
                style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
              >
                <Icons.Search className="w-5 h-5 text-accent opacity-50 transition-opacity group-focus-within:opacity-100" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tell us what you crave... 'something spicy' or 'date night'"
                  className="flex-1 bg-transparent py-4 text-white font-montserrat outline-none placeholder:text-white/30"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/buy/elite-diner/menu?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <Link
                  href={`/buy/elite-diner/menu?q=${encodeURIComponent(searchQuery)}`}
                  className="px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
                  style={{ background: "var(--accent)", color: "#0a0c10" }}
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
                    className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-all animate-in fade-in slide-in-from-bottom-2"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[3px] text-white/30 font-bold">Discover</span>
          <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
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
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1200"
                alt="Signature Dish"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Float Badge */}
            <div 
              className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-2 p-6 lg:p-8 rounded-3xl backdrop-blur-2xl border shadow-2xl shadow-accent/20 z-20" 
              style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
            >
              <div className="text-accent font-montserrat font-black text-3xl lg:text-4xl mb-1">98/100</div>
              <div className="text-[10px] uppercase font-bold tracking-[2px] opacity-60">Lighthouse Score</div>
            </div>
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
                className="group p-4 rounded-[2rem] border transition-all hover:bg-fg-05 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="px-2">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-montserrat text-xl font-bold">{dish.name}</h3>
                    <span className="text-accent font-bold">£{dish.price}</span>
                  </div>
                  <p className="text-fg-40 text-sm line-clamp-2 leading-relaxed mb-6">
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {dish.dietaryTags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 rounded-full border border-accent/20 bg-accent text-[9px] uppercase font-bold text-[#0a0c10] shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────── */}
      <section className="py-24 px-6 border-y" style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl font-black text-accent mb-4 transition-transform group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[3px] font-bold opacity-40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

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
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-montserrat text-xs font-bold uppercase tracking-[2px] shadow-xl shadow-accent/20 transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "#0a0c10" }}
            >
              Order Delivery
            </Link>
            <Link
              href="/buy/elite-diner/book"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl border font-montserrat text-xs font-bold uppercase tracking-[2px] transition-all hover:bg-fg-05"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

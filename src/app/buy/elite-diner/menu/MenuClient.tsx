"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import { menuItems, categoryLabels, dietaryFilters, type MenuItem } from "@/lib/elite-diner/menu-data";
import { searchMenu } from "@/lib/elite-diner/smart-logic";
import { useCart } from "@/lib/elite-diner/cart-store";

interface FlyingItem {
  key: string;
  image: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  peakY: number;
}

const FLY_SIZE = 56;

export default function MenuClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDietary, setActiveDietary] = useState<string[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = useCallback(
    (item: MenuItem, event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const buttonRect = button.getBoundingClientRect();
      const cartEl = document.getElementById("elite-diner-cart-icon");

      addItem(item);
      setPulseId(item.id);
      window.setTimeout(() => setPulseId((id) => (id === item.id ? null : id)), 450);

      if (!cartEl) return;
      const cartRect = cartEl.getBoundingClientRect();
      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.top + buttonRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;
      const peakY = Math.min(startY, endY) - 120;

      const flight: FlyingItem = {
        key: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        image: item.image,
        startX,
        startY,
        endX,
        endY,
        peakY,
      };
      setFlyingItems((prev) => [...prev, flight]);
      window.setTimeout(() => {
        setFlyingItems((prev) => prev.filter((f) => f.key !== flight.key));
      }, 900);
    },
    [addItem]
  );

  const filteredItems = useMemo(() => {
    let results = searchMenu(query, menuItems);

    if (activeCategory !== "all") {
      results = results.filter((item) => item.category === activeCategory);
    }

    if (activeDietary.length > 0) {
      results = results.filter((item) => 
        activeDietary.every((tag) => item.dietaryTags.includes(tag))
      );
    }

    return results;
  }, [query, activeCategory, activeDietary]);

  const toggleDietary = (id: string) => {
    setActiveDietary((prev) => 
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <>
    {/* Fly-to-cart overlay — a fixed container that holds each flying thumbnail
        while it arcs from the clicked "add" button to the nav's cart icon. It
        sits outside the scroll area so it's never clipped by a parent and is
        pointer-events:none so it never blocks subsequent clicks. */}
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {flyingItems.map((f) => (
          <motion.div
            key={f.key}
            initial={{
              x: f.startX - FLY_SIZE / 2,
              y: f.startY - FLY_SIZE / 2,
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              x: [f.startX - FLY_SIZE / 2, f.startX - FLY_SIZE / 2, f.endX - FLY_SIZE / 2],
              y: [f.startY - FLY_SIZE / 2, f.peakY - FLY_SIZE / 2, f.endY - FLY_SIZE / 2],
              scale: [0.7, 1.05, 0.25],
              opacity: [0, 1, 0],
              rotate: [0, 12, -6],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.35, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-0 left-0"
            style={{ width: FLY_SIZE, height: FLY_SIZE }}
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-accent/40 ring-2 ring-accent"
              style={{ background: "var(--bg-surface)" }}
            >
              <img src={f.image} alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* ── Header ───────────────────────────────────────── */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-4">Our <span className="text-accent">Menu</span></h1>
          <p className="text-fg-50 max-w-2xl">
            A fusion of traditional British excellence and modern culinary innovation. 
            Use our AI search to find the perfect dish for your mood.
          </p>
        </div>

        {/* ── Filters & Search ─────────────────────────────── */}
        <div className="sticky top-[64px] z-40 backdrop-blur-md py-6 mb-12 flex flex-col gap-6" style={{ background: "var(--bg-primary)" }}>
          {/* Search bar */}
          <div className="flex items-center gap-3 p-2 pl-5 rounded-2xl border bg-surface transition-all focus-within:border-accent/40" style={{ borderColor: "var(--border-card)", background: "var(--bg-surface)" }}>
            <Icons.Search className="w-5 h-5 text-accent opacity-50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes... 'something spicy', 'gluten-free mains', 'truffle'"
              className="flex-1 bg-transparent py-3 text-sm font-montserrat outline-none placeholder:opacity-30"
              style={{ color: "var(--fg)" }}
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="p-2 mr-2 rounded-lg hover:bg-fg-10 opacity-50 hover:opacity-100 transition-all"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-x-auto no-scrollbar pb-2">
            {/* Categories */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-xl text-[10px] uppercase font-bold tracking-[2px] transition-all shadow-md active:scale-95 ${
                  activeCategory === "all" ? "bg-accent shadow-accent/20" : "bg-fg-05 text-fg-60 border border-border-subtle"
                }`}
                style={{ color: activeCategory === "all" ? "var(--bg-primary)" : "var(--fg-60)" }}
              >
                All
              </button>
              {Object.entries(categoryLabels).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`whitespace-nowrap px-6 py-2 rounded-xl text-[10px] uppercase font-bold tracking-[2px] transition-all shadow-md active:scale-95 ${
                    activeCategory === id ? "bg-accent shadow-accent/20" : "bg-fg-05 text-fg-60 border border-border-subtle hover:bg-fg-10"
                  }`}
                  style={{ color: activeCategory === id ? "var(--bg-primary)" : "var(--fg-60)" }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Dietary Tags */}
            <div className="flex items-center gap-2">
              {dietaryFilters.slice(0, 3).map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleDietary(filter.id)}
                  className={`px-4 py-1.5 rounded-full border text-[9px] uppercase font-bold tracking-wider transition-all ${
                    activeDietary.includes(filter.id) 
                      ? "border-accent bg-accent/10 text-accent" 
                      : "border-border-subtle text-fg-40 hover:border-fg-20"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Menu Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col p-4 rounded-[2rem] border transition-all hover:bg-fg-05 hover:shadow-2xl hover:shadow-accent/5"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/800/600?random=${item.id}`;
                    }}
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.dietaryTags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 rounded-lg bg-accent/90 backdrop-blur-md border border-white/10 text-[8px] uppercase font-bold tracking-widest shadow-sm"
                        style={{ color: "var(--bg-primary)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-2">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-montserrat text-lg font-bold group-hover:text-accent transition-colors">{item.name}</h3>
                    <span className="font-bold text-accent">£{item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-fg-50 line-clamp-3 leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-30">Pairing</span>
                      <span className="text-[11px] font-bold text-fg-60">{item.pairing || "House Blend"}</span>
                    </div>
                    <motion.button
                      onClick={(e) => handleAddToCart(item, e)}
                      aria-label={`Add ${item.name} to cart`}
                      animate={
                        pulseId === item.id
                          ? { scale: [1, 1.25, 0.92, 1.08, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      whileTap={{ scale: 0.9 }}
                      className="relative w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-110 transition-shadow"
                      style={{ color: "var(--bg-primary)" }}
                    >
                      <Icons.ShoppingCart className="w-5 h-5" />
                      <AnimatePresence>
                        {pulseId === item.id && (
                          <motion.span
                            key="ring"
                            initial={{ opacity: 0.7, scale: 0.6 }}
                            animate={{ opacity: 0, scale: 2.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-0 rounded-xl ring-2 ring-accent pointer-events-none"
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Empty State ──────────────────────────────────── */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-32 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-fg-05 flex items-center justify-center text-fg-20 mx-auto mb-6">
              <Icons.Search className="w-10 h-10" />
            </div>
            <h3 className="font-montserrat font-bold text-2xl mb-2">No results found</h3>
            <p className="text-fg-40 max-w-sm mx-auto">
              Whatever you&apos;re looking for, we clearly haven&apos;t cooked it yet. 
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("all"); setActiveDietary([]); }}
              className="mt-8 px-8 py-3 rounded-xl border border-accent text-accent hover:text-[color:var(--bg-primary)] text-[11px] font-bold uppercase tracking-[2px] hover:bg-accent transition-all hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
}

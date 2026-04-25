"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import {
  type MenuItem,
  categoryLabels,
  getRelatedItems,
} from "@/lib/elite-diner/menu-data";
import { useCart } from "@/lib/elite-diner/cart-store";

const ALLERGEN_ICONS: Record<string, string> = {
  shellfish: "🦐",
  dairy: "🥛",
  gluten: "🌾",
  eggs: "🥚",
  nuts: "🥜",
  fish: "🐟",
  celery: "🌿",
  sulphites: "🍷",
};

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

export default function MenuItemDetailClient({ item }: { item: MenuItem }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const addItem = useCart((state) => state.addItem);
  const related = getRelatedItems(item);

  const handleAdd = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const buttonRect = button.getBoundingClientRect();
      const cartEl = document.getElementById("elite-diner-cart-icon");

      for (let i = 0; i < quantity; i++) addItem(item);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1600);

      if (!cartEl) return;
      const cartRect = cartEl.getBoundingClientRect();
      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.top + buttonRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;
      const peakY = Math.min(startY, endY) - 120;

      const flight: FlyingItem = {
        key: `${item.id}-${Date.now()}`,
        image: item.image,
        startX,
        startY,
        endX,
        endY,
        peakY,
      };
      setFlyingItems((prev) => [...prev, flight]);
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((f) => f.key !== flight.key));
      }, 900);
    },
    [addItem, item, quantity]
  );

  return (
    <>
      {/* Fly-to-cart overlay */}
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

      <div style={{ background: "var(--bg-primary)" }}>
        {/* Breadcrumb */}
        <div className="px-6 lg:px-10 pt-10 max-w-[1200px] mx-auto">
          <nav
            className="flex items-center gap-2 font-montserrat text-[11px] uppercase tracking-[2px]"
            style={{ color: "var(--fg-50)" }}
          >
            <Link href="/buy/elite-diner" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/buy/elite-diner/menu" className="hover:text-accent transition-colors">
              Menu
            </Link>
            <span>/</span>
            <Link
              href={`/buy/elite-diner/menu?category=${item.category}`}
              className="hover:text-accent transition-colors"
            >
              {categoryLabels[item.category]}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--fg)" }}>{item.name}</span>
          </nav>
        </div>

        {/* Main Content */}
        <section className="px-6 lg:px-10 py-10">
          <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border"
              style={{ background: "var(--fg-05)", borderColor: "var(--border-card)" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.dataset.fallbackTried !== "1") {
                    target.dataset.fallbackTried = "1";
                    target.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200`;
                  }
                }}
              />
              {/* Dietary tag badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {item.dietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-accent/90 backdrop-blur-md border border-white/10 text-[9px] uppercase font-bold tracking-widest shadow-sm"
                    style={{ color: "var(--bg-primary)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                {categoryLabels[item.category]}
              </span>

              <h1
                className="font-montserrat text-4xl md:text-5xl font-black mt-3 tracking-tight leading-[1.05]"
                style={{ color: "var(--fg)" }}
              >
                {item.name}
              </h1>

              <p
                className="font-montserrat text-base md:text-lg mt-5 leading-relaxed"
                style={{ color: "var(--fg-60)" }}
              >
                {item.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-8">
                <span
                  className="font-montserrat text-4xl font-black"
                  style={{ color: "var(--accent)" }}
                >
                  £{item.price.toFixed(2)}
                </span>
                <span className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>
                  per portion
                </span>
              </div>

              {/* Quantity + Add to cart */}
              <div className="mt-8 flex items-center gap-3">
                <div
                  className="flex items-center gap-1 rounded-xl border shrink-0"
                  style={{ borderColor: "var(--border-card)" }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-12 flex items-center justify-center hover:text-accent transition-colors"
                    style={{ color: "var(--fg-70)" }}
                    aria-label="Decrease quantity"
                  >
                    <Icons.Minus className="w-4 h-4" />
                  </button>
                  <span
                    className="font-montserrat font-bold text-sm w-7 text-center tabular-nums"
                    style={{ color: "var(--fg)" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-12 flex items-center justify-center hover:text-accent transition-colors"
                    style={{ color: "var(--fg-70)" }}
                    aria-label="Increase quantity"
                  >
                    <Icons.Plus className="w-4 h-4" />
                  </button>
                </div>

                <motion.button
                  onClick={handleAdd}
                  animate={justAdded ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 h-12 rounded-xl font-montserrat font-bold uppercase tracking-[2px] transition-colors flex items-center justify-center gap-2"
                  style={{
                    background: justAdded ? "var(--fg)" : "var(--accent)",
                    color: "var(--bg-primary)",
                    fontSize: "11px",
                  }}
                >
                  {justAdded ? (
                    <>
                      <Icons.Check className="w-4 h-4 shrink-0" />
                      Added to Order
                    </>
                  ) : (
                    <>
                      <Icons.ShoppingCart className="w-4 h-4 shrink-0" />
                      Add to Order · £{(item.price * quantity).toFixed(2)}
                    </>
                  )}
                </motion.button>
              </div>

              {/* Details grid */}
              <div
                className="mt-10 pt-10 border-t grid sm:grid-cols-2 gap-8"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {item.pairing && (
                  <div>
                    <h2
                      className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mb-2"
                      style={{ color: "var(--accent)" }}
                    >
                      Wine Pairing
                    </h2>
                    <p
                      className="font-montserrat text-sm font-semibold"
                      style={{ color: "var(--fg-70)" }}
                    >
                      {item.pairing}
                    </p>
                  </div>
                )}

                <div>
                  <h2
                    className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    Calories
                  </h2>
                  <p
                    className="font-montserrat text-sm font-semibold"
                    style={{ color: "var(--fg-70)" }}
                  >
                    {item.calories} kcal
                  </p>
                </div>

                {item.allergens.length > 0 && (
                  <div className="sm:col-span-2">
                    <h2
                      className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mb-3"
                      style={{ color: "var(--accent)" }}
                    >
                      Allergens
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen) => (
                        <span
                          key={allergen}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-montserrat text-[11px] font-bold capitalize"
                          style={{
                            background: "var(--fg-05)",
                            borderColor: "var(--border-subtle)",
                            color: "var(--fg-70)",
                          }}
                        >
                          <span>{ALLERGEN_ICONS[allergen] ?? "⚠️"}</span>
                          {allergen}
                        </span>
                      ))}
                    </div>
                    <p
                      className="font-montserrat text-[10px] mt-3 leading-relaxed"
                      style={{ color: "var(--fg-30)" }}
                    >
                      Always inform your server of any dietary requirements or allergies before ordering.
                    </p>
                  </div>
                )}
              </div>

              {/* Back to menu */}
              <div className="mt-10">
                <Link
                  href="/buy/elite-diner/menu"
                  className="inline-flex items-center gap-2 font-montserrat text-[11px] uppercase tracking-[2px] font-bold hover:text-accent transition-colors"
                  style={{ color: "var(--fg-50)" }}
                >
                  <Icons.ChevronRight className="w-3 h-3 rotate-180" />
                  Back to Menu
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Dishes */}
        {related.length > 0 && (
          <section
            className="py-20 px-6 lg:px-10 border-t"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <Icons.Sparkles className="w-4 h-4 text-accent" />
                <h2
                  className="font-montserrat text-lg md:text-xl font-bold"
                  style={{ color: "var(--fg)" }}
                >
                  More from {categoryLabels[item.category]}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/buy/elite-diner/menu/${r.slug}`}
                    className="group block p-4 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-card)",
                    }}
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                      <img
                        src={r.image}
                        alt={r.name}
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
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3
                          className="font-montserrat font-bold group-hover:text-accent transition-colors"
                          style={{ color: "var(--fg)" }}
                        >
                          {r.name}
                        </h3>
                        <span className="font-bold text-accent shrink-0">
                          £{r.price.toFixed(2)}
                        </span>
                      </div>
                      <p
                        className="font-montserrat text-sm line-clamp-2 leading-relaxed"
                        style={{ color: "var(--fg-50)" }}
                      >
                        {r.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

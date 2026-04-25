"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";
import ProductImage from "@/components/ecommerce/ProductImage";
import { type Product, CATEGORY_META } from "@/lib/ecommerce/products";
import { recommendFrom } from "@/lib/ecommerce/smart-logic";
import { useCart } from "@/lib/ecommerce/cart-store";

/* ── Reviews section component ──────────────────────────── */

function ReviewsSection({ product }: { product: Product }) {
  const reviews = getReviews(product);
  const avgRating = product.rating;
  const reviewCount = product.reviews;

  // Distribution buckets (purely cosmetic, seeded so they look realistic)
  const dist = [
    Math.round(reviewCount * (0.55 + seededIndex(product.slug, 99, 15) * 0.01)),
    Math.round(reviewCount * (0.25 + seededIndex(product.slug, 98, 8) * 0.01)),
    Math.round(reviewCount * 0.12),
    Math.round(reviewCount * 0.05),
    Math.round(reviewCount * 0.03),
  ];

  return (
    <section
      id="reviews"
      className="py-20 px-6 lg:px-10 border-t scroll-mt-24"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span
              className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              Reviews
            </span>
            <h2
              className="font-montserrat text-3xl md:text-4xl font-black mt-2 tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              {reviewCount.toLocaleString()} verified buyers
            </h2>
          </div>

          {/* Summary card */}
          <div
            className="flex items-center gap-8 p-6 rounded-2xl border shrink-0"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-card)",
            }}
          >
            <div className="text-center">
              <p
                className="font-montserrat font-black text-5xl leading-none"
                style={{ color: "var(--fg)" }}
              >
                {avgRating}
              </p>
              <div className="flex justify-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <EcomIcons.Star
                    key={i}
                    className="w-4 h-4"
                    style={{
                      color:
                        i < Math.floor(avgRating)
                          ? "var(--accent)"
                          : "var(--fg-15)",
                    }}
                  />
                ))}
              </div>
              <p
                className="font-montserrat text-[11px] mt-1"
                style={{ color: "var(--fg-50)" }}
              >
                out of 5
              </p>
            </div>
            <div className="space-y-1.5 min-w-[140px]">
              {dist.map((count, i) => {
                const stars = 5 - i;
                const pct = Math.round((count / reviewCount) * 100);
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span
                      className="font-montserrat text-[11px] font-bold w-3 text-right"
                      style={{ color: "var(--fg-60)" }}
                    >
                      {stars}
                    </span>
                    <div
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ background: "var(--fg-10)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: "var(--accent)",
                        }}
                      />
                    </div>
                    <span
                      className="font-montserrat text-[10px] w-8"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={`${r.name}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-6 rounded-2xl border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-montserrat font-black text-[11px] shrink-0"
                    style={{
                      background: "rgba(var(--accent-rgb), 0.12)",
                      color: "var(--accent)",
                    }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p
                      className="font-montserrat font-bold text-sm"
                      style={{ color: "var(--fg)" }}
                    >
                      {r.name}
                    </p>
                    <p
                      className="font-montserrat text-[10px]"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {r.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {Array.from({ length: r.rating }).map((_, si) => (
                    <EcomIcons.Star
                      key={si}
                      className="w-3 h-3"
                      style={{ color: "var(--accent)" }}
                    />
                  ))}
                  {Array.from({ length: 5 - r.rating }).map((_, si) => (
                    <EcomIcons.Star
                      key={`empty-${si}`}
                      className="w-3 h-3"
                      style={{ color: "var(--fg-15)" }}
                    />
                  ))}
                </div>
              </div>
              <p
                className="font-montserrat font-bold text-sm mt-4"
                style={{ color: "var(--fg)" }}
              >
                {r.title}
              </p>
              <p
                className="font-montserrat text-sm mt-2 leading-relaxed"
                style={{ color: "var(--fg-60)" }}
              >
                {r.body}
              </p>
              {/* Verified purchase badge */}
              <div className="flex items-center gap-1.5 mt-4">
                <EcomIcons.Check
                  className="w-3 h-3"
                  style={{ color: "var(--accent)" }}
                />
                <span
                  className="font-montserrat text-[10px] font-bold uppercase tracking-[1.5px]"
                  style={{ color: "var(--fg-40)" }}
                >
                  Verified purchase
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See all CTA */}
        <div className="mt-10 text-center">
          <p
            className="font-montserrat text-sm"
            style={{ color: "var(--fg-50)" }}
          >
            Showing {reviews.length} of {reviewCount.toLocaleString()} reviews
          </p>
          <button
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:border-accent hover:text-accent"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--fg-70)",
            }}
          >
            Load more reviews
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Deterministic dummy reviews ─────────────────────────── */

const REVIEW_POOL = [
  {
    name: "Alex M.",
    avatar: "AM",
    rating: 5,
    date: "March 2025",
    title: "Genuinely changed how I feel about my space.",
    body: "I was sceptical about spending this much, but the quality is immediately apparent the moment you unbox it. The materials feel considered, not flashy. It's already become a favourite.",
  },
  {
    name: "Sam L.",
    avatar: "SL",
    rating: 5,
    date: "February 2025",
    title: "Worth every penny.",
    body: "Bought this after months of deliberation and I wish I'd done it sooner. Delivery was fast, packaging was impressive, and the product exceeded what I expected from the photos.",
  },
  {
    name: "J. Richardson",
    avatar: "JR",
    rating: 4,
    date: "January 2025",
    title: "Excellent — minor quibble on sizing.",
    body: "Really pleased with this. Sits exactly where I wanted it, looks better than on-screen, and feels like it'll last years. One star off because the sizing info could be clearer.",
  },
  {
    name: "Priya N.",
    avatar: "PN",
    rating: 5,
    date: "December 2024",
    title: "The stylist recommendation was spot-on.",
    body: "Used the AI stylist to find this as a gift and my friend loved it. The little details — the stitching, the finish — show how much thought went into it.",
  },
  {
    name: "Tom G.",
    avatar: "TG",
    rating: 5,
    date: "November 2024",
    title: "Exactly as described. No compromises.",
    body: "Product does exactly what it says on the page. The build quality is solid and it's held up perfectly after a few months of daily use. Would buy again without hesitation.",
  },
  {
    name: "Clara B.",
    avatar: "CB",
    rating: 4,
    date: "October 2024",
    title: "Beautiful — delivery could have been quicker.",
    body: "The product itself is lovely; it photographs even better in real life. Delivery took a day longer than expected but support was friendly when I reached out. Would definitely recommend.",
  },
];

function seededIndex(slug: string, offset: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs((hash + offset * 1337) % max);
}

function getReviews(product: Product) {
  const count = 4 + (seededIndex(product.slug, 0, 3)); // 4, 5, or 6 reviews
  return Array.from({ length: count }, (_, i) => {
    const idx = seededIndex(product.slug, i + 1, REVIEW_POOL.length);
    return REVIEW_POOL[idx];
  }).filter(
    // de-duplicate by name (same pool entry can repeat for low-count products)
    (r, i, arr) => arr.findIndex((x) => x.name === r.name) === i
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];
  const related = recommendFrom(product, 4);

  const handleAdd = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Breadcrumb */}
      <div className="px-6 lg:px-10 pt-10 max-w-[1200px] mx-auto">
        <nav
          className="flex items-center gap-2 font-montserrat text-[11px] uppercase tracking-[2px]"
          style={{ color: "var(--fg-50)" }}
        >
          <Link href="/buy/ecommerce" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/buy/ecommerce/shop"
            className="hover:text-accent transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/buy/ecommerce/shop?category=${product.category}`}
            className="hover:text-accent transition-colors"
          >
            {CATEGORY_META[product.category].label}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--fg)" }}>{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="px-6 lg:px-10 py-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square rounded-3xl overflow-hidden border"
              style={{
                background: "var(--fg-05)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <ProductImage
                src={gallery[activeImage]}
                alt={product.name}
                fallbackSeed={`${product.slug}-${activeImage}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />

              {/* Hover overlay — product details */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                }}
              >
                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded font-montserrat text-[9px] uppercase tracking-[2px] font-bold"
                      style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                    >
                      {product.brand}
                    </span>
                    <span className="font-montserrat text-[9px] uppercase tracking-[2px] text-white/50">
                      {CATEGORY_META[product.category].label}
                    </span>
                  </div>
                  <h3 className="font-montserrat font-black text-white text-xl leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="font-montserrat text-sm text-white/70 mb-3 line-clamp-2">
                    {product.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-montserrat font-black text-xl"
                      style={{ color: "var(--accent)" }}
                    >
                      £{product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <EcomIcons.Star
                          key={i}
                          className="w-3 h-3"
                          style={{
                            color:
                              i < Math.floor(product.rating)
                                ? "var(--accent)"
                                : "rgba(255,255,255,0.2)",
                          }}
                        />
                      ))}
                      <span className="font-montserrat text-[10px] text-white/50 ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {product.compareAtPrice && (
                <span
                  className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-montserrat uppercase tracking-[2px] font-bold"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Save £{product.compareAtPrice - product.price}
                </span>
              )}
            </motion.div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className="aspect-square rounded-xl overflow-hidden border transition-all"
                    style={{
                      borderColor:
                        activeImage === i
                          ? "var(--accent)"
                          : "var(--border-subtle)",
                      background: "var(--fg-05)",
                      opacity: activeImage === i ? 1 : 0.6,
                    }}
                  >
                    <ProductImage
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fallbackSeed={`${product.slug}-thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                {product.brand}
              </span>
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--fg-30)" }}
              />
              <span
                className="font-montserrat text-[10px] uppercase tracking-[2px]"
                style={{ color: "var(--fg-50)" }}
              >
                {CATEGORY_META[product.category].label}
              </span>
            </div>
            <h1
              className="font-montserrat text-4xl md:text-5xl font-black mt-3 tracking-tight leading-[1.05]"
              style={{ color: "var(--fg)" }}
            >
              {product.name}
            </h1>
            <p
              className="font-montserrat text-base md:text-lg mt-3"
              style={{ color: "var(--fg-60)" }}
            >
              {product.tagline}
            </p>

            {/* Rating row — clicking scrolls to the reviews section */}
            <a
              href="#reviews"
              className="inline-flex items-center gap-4 mt-5 group"
              aria-label="Jump to customer reviews"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <EcomIcons.Star
                    key={i}
                    className="w-4 h-4"
                    style={{
                      color:
                        i < Math.floor(product.rating)
                          ? "var(--accent)"
                          : "var(--fg-15)",
                    }}
                  />
                ))}
              </div>
              <span
                className="font-montserrat text-xs underline underline-offset-2 group-hover:text-accent transition-colors"
                style={{ color: "var(--fg-60)" }}
              >
                {product.rating} · {product.reviews.toLocaleString()} reviews
              </span>
            </a>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span
                className="font-montserrat text-4xl font-black"
                style={{ color: "var(--fg)" }}
              >
                £{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span
                  className="font-montserrat text-lg line-through"
                  style={{ color: "var(--fg-40)" }}
                >
                  £{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Colour */}
            <div className="mt-8">
              <p
                className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold mb-3"
                style={{ color: "var(--fg-50)" }}
              >
                Colour — <span style={{ color: "var(--fg)" }}>{product.colour}</span>
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                  style={{
                    background: product.colourHex,
                    borderColor: "var(--accent)",
                  }}
                >
                  <EcomIcons.Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                </div>
              </div>
            </div>

            {/* Quantity + Add — always a single flex row */}
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
                  <EcomIcons.Minus className="w-4 h-4" />
                </button>
                <span
                  className="font-montserrat font-bold text-sm w-7 text-center tabular-nums"
                  style={{ color: "var(--fg)" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-10 h-12 flex items-center justify-center hover:text-accent transition-colors"
                  style={{ color: "var(--fg-70)" }}
                  aria-label="Increase quantity"
                >
                  <EcomIcons.Plus className="w-4 h-4" />
                </button>
              </div>
              <motion.button
                onClick={handleAdd}
                animate={justAdded ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex-1 h-12 rounded-xl font-montserrat font-bold uppercase tracking-[2px] transition-colors flex items-center justify-center gap-2 min-w-0"
                style={{
                  background: justAdded ? "var(--fg)" : "var(--accent)",
                  color: "var(--bg-primary)",
                  fontSize: "11px",
                }}
              >
                {justAdded ? (
                  <>
                    <EcomIcons.Check className="w-4 h-4 shrink-0" />
                    {/* Wider screens show text */}
                    <span className="hidden xs:inline">Added</span>
                  </>
                ) : (
                  <>
                    <EcomIcons.Bag className="w-4 h-4 shrink-0" />
                    {/* On very small screens: just the icon + price. On sm+: full label */}
                    <span className="hidden sm:inline truncate">
                      Add to cart · £{(product.price * quantity).toLocaleString()}
                    </span>
                    <span className="sm:hidden font-bold">
                      £{(product.price * quantity).toLocaleString()}
                    </span>
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <EcomIcons.Truck
                className="w-4 h-4"
                style={{ color: "var(--accent)" }}
              />
              <span
                className="font-montserrat text-xs"
                style={{ color: "var(--fg-60)" }}
              >
                {product.stock > 0
                  ? `${product.stock} in stock · Free UK delivery over £75`
                  : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            <div className="mt-10 pt-10 border-t space-y-6" style={{ borderColor: "var(--border-subtle)" }}>
              <div>
                <h2
                  className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Description
                </h2>
                <p
                  className="font-montserrat text-sm leading-relaxed"
                  style={{ color: "var(--fg-70)" }}
                >
                  {product.description}
                </p>
              </div>

              <div>
                <h2
                  className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Features
                </h2>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 font-montserrat text-sm"
                      style={{ color: "var(--fg-70)" }}
                    >
                      <EcomIcons.Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: "var(--accent)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2
                  className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Materials
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 rounded-full font-montserrat text-[11px] border"
                      style={{
                        background: "var(--fg-05)",
                        color: "var(--fg-70)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ─────────────────────────────────────────── */}
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
              <EcomIcons.Sparkles
                className="w-4 h-4"
                style={{ color: "var(--accent)" }}
              />
              <h2
                className="font-montserrat text-lg md:text-xl font-bold"
                style={{ color: "var(--fg)" }}
              >
                AI picks that pair well
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/buy/ecommerce/shop/${r.slug}`}
                  className="group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:border-accent"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div
                    className="aspect-square overflow-hidden"
                    style={{ background: "var(--fg-05)" }}
                  >
                    <ProductImage
                      src={r.image}
                      alt={r.name}
                      fallbackSeed={r.slug}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {r.brand}
                    </p>
                    <h3
                      className="font-montserrat font-bold text-sm mt-1 truncate group-hover:text-accent transition-colors"
                      style={{ color: "var(--fg)" }}
                    >
                      {r.name}
                    </h3>
                    <p
                      className="font-montserrat font-bold text-sm mt-2"
                      style={{ color: "var(--accent)" }}
                    >
                      £{r.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews ─────────────────────────────────────────── */}
      <ReviewsSection product={product} />
    </div>
  );
}

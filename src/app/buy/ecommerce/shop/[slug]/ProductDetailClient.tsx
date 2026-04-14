"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";
import { type Product, CATEGORY_META } from "@/lib/ecommerce/products";
import { recommendFrom } from "@/lib/ecommerce/smart-logic";
import { useCart } from "@/lib/ecommerce/cart-store";

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
              className="relative aspect-square rounded-3xl overflow-hidden border"
              style={{
                background: "var(--fg-05)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
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

            {/* Rating row */}
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-1">
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
                className="font-montserrat text-xs"
                style={{ color: "var(--fg-60)" }}
              >
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

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

            {/* Quantity + Add */}
            <div className="mt-8 flex items-center gap-3">
              <div
                className="flex items-center gap-1 rounded-xl border"
                style={{ borderColor: "var(--border-card)" }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:text-accent transition-colors"
                  style={{ color: "var(--fg-70)" }}
                >
                  <EcomIcons.Minus className="w-4 h-4" />
                </button>
                <span
                  className="font-montserrat font-bold text-sm min-w-[32px] text-center"
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
                >
                  <EcomIcons.Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 h-12 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                style={{
                  background: justAdded ? "var(--fg)" : "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                {justAdded ? (
                  <>
                    <EcomIcons.Check className="w-4 h-4" />
                    Added
                  </>
                ) : (
                  <>
                    <EcomIcons.Bag className="w-4 h-4" />
                    Add to cart — £{(product.price * quantity).toLocaleString()}
                  </>
                )}
              </button>
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
                    <img
                      src={r.image}
                      alt={r.name}
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
    </div>
  );
}

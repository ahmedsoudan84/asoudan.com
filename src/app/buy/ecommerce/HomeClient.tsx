"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";
import ProductImage from "@/components/ecommerce/ProductImage";
import { CATEGORY_META, type ProductCategory, type Product } from "@/lib/ecommerce/products";
import { getAllProducts } from "@/lib/ecommerce/storage";
import { OCCASION_BUNDLES, getBundleProducts } from "@/lib/ecommerce/smart-logic";
import { useCart } from "@/lib/ecommerce/cart-store";
import { useEffect } from "react";
import PricingSection from "@/components/buy/PricingSection";
import FAQSection from "@/components/buy/FAQSection";
import { ECOMMERCE_FAQ } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const HERO_CHIPS = [
  { label: "Gift under £150", query: "gift under 150" },
  { label: "WFH essentials", query: "workspace wfh" },
  { label: "Cosy evenings", query: "cozy living" },
  { label: "Travel kit", query: "travel carry-on" },
  { label: "Audio", query: "audio" },
];

const TRUST = [
  {
    icon: <EcomIcons.Truck className="w-5 h-5" />,
    title: "Free UK delivery",
    desc: "On orders over £75, same-day dispatch before 3pm.",
  },
  {
    icon: <EcomIcons.Shield className="w-5 h-5" />,
    title: "Built to last",
    desc: "Lifetime repair on leather, 10-year frame warranties.",
  },
  {
    icon: <EcomIcons.Leaf className="w-5 h-5" />,
    title: "Responsibly sourced",
    desc: "Transparent supply chains on every product page.",
  },
  {
    icon: <EcomIcons.Sparkles className="w-5 h-5" />,
    title: "AI stylist",
    desc: "On-demand recommendations without a single cookie.",
  },
];

const STATS = [
  { value: "16", label: "Curated products" },
  { value: "6", label: "Categories" },
  { value: "0", label: "API keys required" },
  { value: "100%", label: "Client-side" },
];

export default function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    setAllProducts(getAllProducts());
  }, []);

  const bestsellers = allProducts.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = allProducts.filter((p) => p.isNew);
  const featuredBundle = OCCASION_BUNDLES[0];
  const bundleProducts = featuredBundle.productSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-24 px-6 lg:px-10 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.08] blur-[160px] pointer-events-none"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] pointer-events-none"
          style={{ background: "var(--accent)" }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <span
                className="w-10 h-px"
                style={{ background: "var(--accent)", opacity: 0.4 }}
              />
              <span
                className="text-[10px] font-montserrat font-bold uppercase tracking-[4px]"
                style={{ color: "var(--accent)" }}
              >
                Objects, curated.
              </span>
              <span
                className="w-10 h-px"
                style={{ background: "var(--accent)", opacity: 0.4 }}
              />
            </div>

            <h1
              className="font-montserrat text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.95]"
              style={{ color: "var(--fg)" }}
            >
              A shop that{" "}
              <span style={{ color: "var(--accent)" }}>knows you</span>
              <br />
              before you ask.
            </h1>

            <p
              className="max-w-2xl mx-auto font-montserrat text-base md:text-lg mt-8 leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              Every product is chosen by hand. Every recommendation is made by an
              on-device AI stylist. No surveillance, no dark patterns — just 16
              things we'd actually send to a friend.
            </p>

            {/* AI search */}
            <div className="max-w-xl mx-auto mt-12">
              <div
                className="flex items-center gap-2 px-2 py-2 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                  boxShadow:
                    "0 20px 60px -20px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.04) inset",
                }}
              >
                <EcomIcons.Search
                  className="w-5 h-5 ml-3 shrink-0"
                  style={{ color: "var(--fg-40)" }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe what you need — the AI knows the rest"
                  className="flex-1 bg-transparent px-2 py-3 outline-none font-montserrat text-sm"
                  style={{ color: "var(--fg)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/buy/ecommerce/shop?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <Link
                  href={`/buy/ecommerce/shop${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}
                  className="px-5 py-2.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.03]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Search
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                {HERO_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => setSearchQuery(chip.query)}
                    className="px-3.5 py-1.5 rounded-full border text-[10px] font-montserrat uppercase tracking-[1.5px] font-bold transition-all hover:border-accent hover:text-accent hover:-translate-y-0.5"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--fg-05)",
                      color: "var(--fg-60)",
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

      {/* ── Category Rail ──────────────────────────────────── */}
      <section
        className="py-12 px-6 lg:px-10 border-y"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span
                className="text-[10px] font-montserrat uppercase tracking-[3px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                Shop
              </span>
              <h2
                className="font-montserrat text-2xl md:text-3xl font-bold mt-1"
                style={{ color: "var(--fg)" }}
              >
                By Category
              </h2>
            </div>
            <Link
              href="/buy/ecommerce/shop"
              className="group flex items-center gap-2 font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-colors"
              style={{ color: "var(--accent)" }}
            >
              View all
              <EcomIcons.ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {(Object.keys(CATEGORY_META) as ProductCategory[]).map((cat, i) => {
              const meta = CATEGORY_META[cat];
              const count = allProducts.filter((p) => p.category === cat).length;
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={`/buy/ecommerce/shop?category=${cat}`}
                    className="group flex flex-col h-full p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:border-accent"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <span
                      className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {count} items
                    </span>
                    <h3
                      className="font-montserrat text-base font-bold mt-1 group-hover:text-accent transition-colors"
                      style={{ color: "var(--fg)" }}
                    >
                      {meta.label}
                    </h3>
                    <p
                      className="font-montserrat text-[11px] mt-2 leading-relaxed"
                      style={{ color: "var(--fg-50)" }}
                    >
                      {meta.blurb}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bestsellers ─────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span
                className="text-[10px] font-montserrat uppercase tracking-[3px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                Bestsellers
              </span>
              <h2
                className="font-montserrat text-3xl md:text-5xl font-bold mt-2"
                style={{ color: "var(--fg)" }}
              >
                What people keep coming <br className="hidden md:block" /> back
                for.
              </h2>
            </div>
            <Link
              href="/buy/ecommerce/shop?sort=featured"
              className="hidden md:flex items-center gap-2 font-montserrat text-[11px] font-bold uppercase tracking-[2px] group"
              style={{ color: "var(--accent)" }}
            >
              Shop all
              <EcomIcons.ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {bestsellers.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <NewArrivalCard product={p} onAdd={() => addItem(p)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Stylist Feature ──────────────────────────────── */}
      <section
        className="py-24 px-6 lg:px-10"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-[2px] font-bold mb-6"
              style={{
                background: "rgba(var(--accent-rgb), 0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(var(--accent-rgb), 0.25)",
              }}
            >
              <EcomIcons.Sparkles className="w-3 h-3" />
              AI Stylist
            </span>
            <h2
              className="font-montserrat text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--fg)" }}
            >
              A stylist in your pocket.{" "}
              <span style={{ color: "var(--accent)" }}>No account needed.</span>
            </h2>
            <p
              className="font-montserrat text-base md:text-lg mt-6 leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              Tell it what's coming up — an anniversary, a new flat, a trip — and
              it returns three considered picks with the reasoning behind each.
              Runs entirely on your device, so nothing leaves the browser.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                href="/buy/ecommerce/ai-tools"
                className="px-6 py-3.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.03]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                Try the stylist
              </Link>
              <Link
                href="/buy/ecommerce/shop"
                className="px-6 py-3.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] border transition-all"
                style={{
                  borderColor: "var(--secondary)",
                  color: "var(--secondary)",
                  boxShadow: "0 0 0 1px rgba(var(--secondary-rgb),0.1), 0 0 18px rgba(var(--secondary-rgb),0.15)",
                }}
              >
                Browse shop
              </Link>
            </div>
          </motion.div>

          {/* Bundle preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-7 rounded-3xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-card)",
              boxShadow: "0 40px 80px -30px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-[2px] font-bold border mb-4"
              style={{
                background: "rgba(var(--accent-rgb), 0.12)",
                color: "var(--accent)",
                borderColor: "rgba(var(--accent-rgb), 0.3)",
              }}
            >
              <EcomIcons.Sparkles className="w-3 h-3" />
              Curated bundle
            </div>
            <h3
              className="font-montserrat text-xl font-bold"
              style={{ color: "var(--fg)" }}
            >
              {featuredBundle.title}
            </h3>
            <p
              className="font-montserrat text-sm mt-2 leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              {featuredBundle.description}
            </p>
            <div className="mt-6 space-y-3">
              {bundleProducts.map((bp) => (
                <Link
                  key={bp.slug}
                  href={`/buy/ecommerce/shop/${bp.slug}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl border transition-all hover:border-accent group"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
                    style={{ background: "var(--fg-05)" }}
                  >
                    <ProductImage
                      src={bp.image}
                      alt={bp.name}
                      fallbackSeed={bp.slug}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-montserrat font-bold text-sm truncate group-hover:text-accent transition-colors"
                      style={{ color: "var(--fg)" }}
                    >
                      {bp.name}
                    </p>
                    <p
                      className="font-montserrat text-[11px] truncate"
                      style={{ color: "var(--fg-50)" }}
                    >
                      {bp.tagline}
                    </p>
                  </div>
                  <span
                    className="font-montserrat font-bold text-sm shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    £{bp.price}
                  </span>
                </Link>
              ))}
            </div>
            <div
              className="mt-5 pt-5 border-t flex items-center justify-between"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span
                className="font-montserrat text-[11px] uppercase tracking-[2px]"
                style={{ color: "var(--fg-50)" }}
              >
                Bundle total
              </span>
              <span
                className="font-montserrat font-black text-xl"
                style={{ color: "var(--fg)" }}
              >
                £
                {bundleProducts
                  .reduce((s, p) => s + p.price, 0)
                  .toLocaleString()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── New Arrivals ────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-24 px-6 lg:px-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span
                  className="text-[10px] font-montserrat uppercase tracking-[3px] font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  Just in
                </span>
                <h2
                  className="font-montserrat text-3xl md:text-4xl font-bold mt-2"
                  style={{ color: "var(--fg)" }}
                >
                  New Arrivals
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={`/buy/ecommerce/shop/${p.slug}`}
                    className="group block rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:border-accent"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ background: "var(--fg-05)" }}
                    >
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        fallbackSeed={p.slug}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-[2px] font-bold"
                        style={{
                          background: "var(--bg-primary)",
                          color: "var(--accent)",
                          border: "1px solid rgba(var(--accent-rgb), 0.3)",
                        }}
                      >
                        New
                      </span>
                    </div>
                    <div className="p-5">
                      <p
                        className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                        style={{ color: "var(--fg-40)" }}
                      >
                        {p.brand}
                      </p>
                      <h3
                        className="font-montserrat text-lg font-bold mt-1 group-hover:text-accent transition-colors"
                        style={{ color: "var(--fg)" }}
                      >
                        {p.name}
                      </h3>
                      <p
                        className="font-montserrat text-xs mt-2 line-clamp-2"
                        style={{ color: "var(--fg-50)" }}
                      >
                        {p.tagline}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span
                          className="font-montserrat font-bold text-base"
                          style={{ color: "var(--fg)" }}
                        >
                          £{p.price}
                        </span>
                        <EcomIcons.ArrowRight
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trust Strip ─────────────────────────────────────── */}
      <section
        className="py-16 px-6 lg:px-10 border-y"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST.map((t) => (
            <div key={t.title} className="flex gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent)",
                }}
              >
                {t.icon}
              </div>
              <div>
                <h3
                  className="font-montserrat font-bold text-sm"
                  style={{ color: "var(--fg)" }}
                >
                  {t.title}
                </h3>
                <p
                  className="font-montserrat text-xs mt-1 leading-relaxed"
                  style={{ color: "var(--fg-50)" }}
                >
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="font-montserrat text-4xl md:text-5xl font-black"
                style={{ color: "var(--accent)" }}
              >
                {s.value}
              </div>
              <div
                className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold mt-3"
                style={{ color: "var(--fg-50)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────── */}
      {(() => {
        const tpl = categories.find((c) => c.slug === "ecommerce");
        return tpl?.pricing ? (
          <PricingSection
            templateLabel="Kurator (E-Commerce)"
            templateSlug="ecommerce"
            tiers={tpl.pricing}
            contactHref="/buy/ecommerce/contact"
          />
        ) : null;
      })()}

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <FAQSection items={ECOMMERCE_FAQ} templateSlug="ecommerce" />

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-10">
        <div
          className="max-w-[1000px] mx-auto p-12 md:p-16 rounded-[2.5rem] text-center border relative overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border-card)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none"
            style={{ background: "var(--accent)" }}
          />
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{
                background: "rgba(var(--accent-rgb), 0.1)",
                color: "var(--accent)",
              }}
            >
              <EcomIcons.Sparkles className="w-7 h-7" />
            </div>
            <h2
              className="font-montserrat text-3xl md:text-5xl font-black tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Ready to see how it{" "}
              <span style={{ color: "var(--accent)" }}>feels?</span>
            </h2>
            <p
              className="font-montserrat text-base mt-6 max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              The whole flow is wired — semantic search, AI stylist, persistent
              cart, slide-over checkout. All client-side, zero API keys.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/buy/ecommerce/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.03]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                Explore the shop
              </Link>
              <Link
                href="/buy/ecommerce/ai-tools"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] border transition-all"
                style={{
                  borderColor: "var(--secondary)",
                  color: "var(--secondary)",
                  boxShadow: "0 0 0 1px rgba(var(--secondary-rgb),0.1), 0 0 18px rgba(var(--secondary-rgb),0.15)",
                }}
              >
                Meet the AI stylist
              </Link>
              <Link
                href="/buy/ecommerce/admin"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] border transition-all hover:scale-[1.03]"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                }}
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── NewArrivalCard ─────────────────────────────────────────── */
function NewArrivalCard({
  product: p,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  const [justAdded, setJustAdded] = useState(false);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAdd();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className="group relative h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(var(--accent-rgb),0.25)]"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Image area */}
      <div
        className="relative aspect-square overflow-hidden shrink-0"
        style={{ background: "var(--fg-05)" }}
      >
        <Link
          href={`/buy/ecommerce/shop/${p.slug}`}
          className="block w-full h-full"
          aria-label={p.name}
        >
          <ProductImage
            src={p.image}
            alt={p.name}
            fallbackSeed={p.slug}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {p.compareAtPrice && (
          <span
            className="pointer-events-none absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-[2px] font-bold"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            -{Math.round(100 - (p.price / p.compareAtPrice) * 100)}%
          </span>
        )}
        {/* Soft gradient for button contrast */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.22) 100%)",
          }}
        />
        {/* Desktop: round + button centred on image, fades + scales in on hover */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${p.name} to cart`}
          className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out active:scale-95 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)]"
          style={{
            background: justAdded ? "var(--fg)" : "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          {justAdded ? (
            <EcomIcons.Check className="w-5 h-5" />
          ) : (
            <EcomIcons.Plus className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Info */}
      <Link
        href={`/buy/ecommerce/shop/${p.slug}`}
        className="p-4 flex-1 flex flex-col"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold truncate"
              style={{ color: "var(--fg-40)" }}
            >
              {p.brand}
            </p>
            <h3
              className="font-montserrat font-bold text-sm mt-0.5 truncate group-hover:text-accent transition-colors"
              style={{ color: "var(--fg)" }}
            >
              {p.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            <EcomIcons.Star
              className="w-3 h-3"
              style={{ color: "var(--accent)" }}
            />
            <span
              className="font-montserrat text-xs font-bold"
              style={{ color: "var(--fg-70)" }}
            >
              {p.rating}
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-3">
          <span
            className="font-montserrat font-bold text-base"
            style={{ color: "var(--fg)" }}
          >
            £{p.price}
          </span>
          {p.compareAtPrice && (
            <span
              className="font-montserrat text-xs line-through"
              style={{ color: "var(--fg-40)" }}
            >
              £{p.compareAtPrice}
            </span>
          )}
        </div>
      </Link>

      {/* Mobile: always-visible CTA */}
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${p.name} to cart`}
        className="sm:hidden mx-4 mb-4 flex items-center justify-center gap-2 py-3 rounded-xl border font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all active:scale-[0.97]"
        style={{
          background: justAdded ? "var(--fg)" : "rgba(var(--accent-rgb), 0.12)",
          color: justAdded ? "var(--bg-primary)" : "var(--accent)",
          borderColor: justAdded ? "var(--fg)" : "rgba(var(--accent-rgb), 0.35)",
        }}
      >
        {justAdded ? (
          <>
            <EcomIcons.Check className="w-4 h-4" />
            Added
          </>
        ) : (
          <>
            <EcomIcons.Plus className="w-4 h-4" />
            Add to cart
          </>
        )}
      </button>
    </div>
  );
}

"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";
import {
  products,
  CATEGORY_META,
  type ProductCategory,
} from "@/lib/ecommerce/products";
import { searchProducts, type SearchFilters } from "@/lib/ecommerce/smart-logic";
import { useCart } from "@/lib/ecommerce/cart-store";

const SORTS: { id: NonNullable<SearchFilters["sort"]>; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: low → high" },
  { id: "price-desc", label: "Price: high → low" },
  { id: "rating", label: "Top rated" },
];

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under £100", min: 0, max: 100 },
  { label: "£100 – £250", min: 100, max: 250 },
  { label: "£250 – £500", min: 250, max: 500 },
  { label: "£500 – £1000", min: 500, max: 1000 },
  { label: "£1000+", min: 1000, max: Infinity },
];

export default function ShopClient() {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const initialCategory = (params.get("category") ?? "all") as
    | ProductCategory
    | "all";
  const initialSort = (params.get("sort") ?? "featured") as NonNullable<
    SearchFilters["sort"]
  >;

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ProductCategory | "all">(
    initialCategory
  );
  const [priceIndex, setPriceIndex] = useState(0);
  const [sort, setSort] = useState<NonNullable<SearchFilters["sort"]>>(
    initialSort
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const addItem = useCart((s) => s.addItem);

  const results = useMemo(() => {
    const range = PRICE_RANGES[priceIndex];
    return searchProducts(query, {
      category,
      minPrice: range.min,
      maxPrice: range.max,
      sort,
    });
  }, [query, category, priceIndex, sort]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    category !== "all" ||
    priceIndex !== 0 ||
    sort !== "featured";

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* ── Header ──────────────────────────────────────────── */}
      <section className="pt-16 pb-12 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span
                className="text-[10px] font-montserrat uppercase tracking-[3px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                Shop
              </span>
              <h1
                className="font-montserrat text-4xl md:text-5xl font-black mt-2 tracking-tight"
                style={{ color: "var(--fg)" }}
              >
                Everything, curated.
              </h1>
              <p
                className="font-montserrat text-sm mt-3 max-w-xl"
                style={{ color: "var(--fg-50)" }}
              >
                {results.length} {results.length === 1 ? "product" : "products"}
                {query ? ` matching "${query}"` : ""}.
              </p>
            </div>

            <div
              className="flex items-center gap-2 rounded-2xl border px-3 py-1.5"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <EcomIcons.Search
                className="w-4 h-4 shrink-0"
                style={{ color: "var(--fg-40)" }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything…"
                className="flex-1 bg-transparent px-1 py-2 outline-none font-montserrat text-sm w-52"
                style={{ color: "var(--fg)" }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full hover:bg-fg-10"
                  style={{ color: "var(--fg-40)" }}
                  aria-label="Clear"
                >
                  <EcomIcons.X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCategory("all")}
                className="px-3.5 py-2 rounded-full text-[11px] font-montserrat font-bold uppercase tracking-[1.5px] border transition-all"
                style={{
                  background:
                    category === "all" ? "var(--accent)" : "var(--fg-05)",
                  color:
                    category === "all" ? "var(--bg-primary)" : "var(--fg-60)",
                  borderColor:
                    category === "all" ? "var(--accent)" : "var(--border-subtle)",
                }}
              >
                All
              </button>
              {(Object.keys(CATEGORY_META) as ProductCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-3.5 py-2 rounded-full text-[11px] font-montserrat font-bold uppercase tracking-[1.5px] border transition-all"
                  style={{
                    background:
                      category === cat ? "var(--accent)" : "var(--fg-05)",
                    color:
                      category === cat ? "var(--bg-primary)" : "var(--fg-60)",
                    borderColor:
                      category === cat
                        ? "var(--accent)"
                        : "var(--border-subtle)",
                  }}
                >
                  {CATEGORY_META[cat].label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={String(priceIndex)}
                onChange={(v) => setPriceIndex(Number(v))}
                options={PRICE_RANGES.map((r, i) => ({
                  value: String(i),
                  label: r.label,
                }))}
                icon={<EcomIcons.Filter className="w-3.5 h-3.5" />}
              />
              <Select
                value={sort}
                onChange={(v) =>
                  setSort(v as NonNullable<SearchFilters["sort"]>)
                }
                options={SORTS.map((s) => ({ value: s.id, label: s.label }))}
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setQuery("");
                setCategory("all");
                setPriceIndex(0);
                setSort("featured");
              }}
              className="mt-4 text-[10px] font-montserrat uppercase tracking-[2px] font-bold hover:text-accent transition-colors"
              style={{ color: "var(--fg-50)" }}
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* ── Grid ────────────────────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          {results.length === 0 ? (
            <div
              className="text-center py-24 rounded-3xl border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <EcomIcons.Search
                className="w-10 h-10 mx-auto mb-5"
                style={{ color: "var(--fg-30)" }}
              />
              <p
                className="font-montserrat font-bold text-lg"
                style={{ color: "var(--fg)" }}
              >
                Nothing matched.
              </p>
              <p
                className="font-montserrat text-sm mt-2 max-w-sm mx-auto"
                style={{ color: "var(--fg-50)" }}
              >
                Try broadening the search or clearing a filter. The AI stylist
                can also suggest something.
              </p>
              <Link
                href="/buy/ecommerce/ai-tools"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                <EcomIcons.Sparkles className="w-3.5 h-3.5" />
                Ask the stylist
              </Link>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                {results.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <ProductCard product={p} onAdd={() => addItem(p)} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── UI bits ─────────────────────────────────────────────── */

function Select({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
}) {
  return (
    <label
      className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border cursor-pointer transition-all hover:border-accent"
      style={{
        background: "var(--fg-05)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {icon && (
        <span style={{ color: "var(--fg-60)" }} className="shrink-0">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-6 outline-none font-montserrat text-[11px] font-bold uppercase tracking-[1.5px] cursor-pointer"
        style={{ color: "var(--fg)" }}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: "var(--bg-surface)" }}
          >
            {o.label}
          </option>
        ))}
      </select>
      <EcomIcons.ChevronRight
        className="absolute right-3 w-3 h-3 rotate-90 pointer-events-none"
        style={{ color: "var(--fg-60)" }}
      />
    </label>
  );
}

function ProductCard({
  product: p,
  onAdd,
}: {
  product: (typeof products)[number];
  onAdd: () => void;
}) {
  return (
    <div className="group relative h-full">
      <Link
        href={`/buy/ecommerce/shop/${p.slug}`}
        className="flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-500 group-hover:-translate-y-2 group-hover:border-accent group-hover:shadow-[0_24px_60px_-20px_rgba(var(--accent-rgb),0.2)]"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div
          className="relative aspect-square overflow-hidden"
          style={{ background: "var(--fg-05)" }}
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {p.isNew && (
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-montserrat uppercase tracking-[2px] font-bold"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--accent)",
                  border: "1px solid rgba(var(--accent-rgb), 0.3)",
                }}
              >
                New
              </span>
            )}
            {p.compareAtPrice && (
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-montserrat uppercase tracking-[2px] font-bold"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                -{Math.round(100 - (p.price / p.compareAtPrice) * 100)}%
              </span>
            )}
          </div>
          {p.stock < 10 && (
            <span
              className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-montserrat uppercase tracking-[2px] font-bold"
              style={{
                background: "rgba(239, 68, 68, 0.9)",
                color: "#fff",
              }}
            >
              Only {p.stock} left
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <p
            className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
            style={{ color: "var(--fg-40)" }}
          >
            {p.brand}
          </p>
          <h3
            className="font-montserrat font-bold text-sm mt-0.5 group-hover:text-accent transition-colors line-clamp-1"
            style={{ color: "var(--fg)" }}
          >
            {p.name}
          </h3>
          <p
            className="font-montserrat text-xs mt-1.5 line-clamp-2 flex-1"
            style={{ color: "var(--fg-50)" }}
          >
            {p.tagline}
          </p>
          <div className="flex items-end justify-between mt-4">
            <div className="flex items-baseline gap-2">
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
            <div className="flex items-center gap-1">
              <EcomIcons.Star
                className="w-3 h-3"
                style={{ color: "var(--accent)" }}
              />
              <span
                className="font-montserrat text-[11px] font-bold"
                style={{ color: "var(--fg-70)" }}
              >
                {p.rating}
              </span>
              <span
                className="font-montserrat text-[10px]"
                style={{ color: "var(--fg-40)" }}
              >
                ({p.reviews})
              </span>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAdd();
        }}
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg"
        style={{
          background: "var(--accent)",
          color: "var(--bg-primary)",
        }}
        aria-label={`Add ${p.name} to cart`}
      >
        <EcomIcons.Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { properties, type Property } from "@/lib/real-estate/properties";
import { calculateWalkScore, walkScoreLabel, comparePriceToLocal } from "@/lib/real-estate/smart-logic";

const TYPES = ["All", "Flat", "House", "Penthouse", "Townhouse", "Maisonette"];
const BEDS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const PRICE_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "Under £750k", min: 0, max: 750000 },
  { label: "£750k – £1M", min: 750000, max: 1000000 },
  { label: "£1M – £1.5M", min: 1000000, max: 1500000 },
  { label: "£1.5M – £2M", min: 1500000, max: 2000000 },
  { label: "£2M+", min: 2000000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Price: Low to High", fn: (a: Property, b: Property) => a.price - b.price },
  { label: "Price: High to Low", fn: (a: Property, b: Property) => b.price - a.price },
  { label: "Beds: Most", fn: (a: Property, b: Property) => b.beds - a.beds },
  { label: "Largest", fn: (a: Property, b: Property) => b.sqft - a.sqft },
];

function simpleSearch(query: string, property: Property): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const text = `${property.title} ${property.description} ${property.borough} ${property.type} ${property.features.join(" ")} ${property.nearbySchools.map((s) => s.name).join(" ")} ${property.nearbyAmenities.map((a) => a.name + " " + a.type).join(" ")}`.toLowerCase();

  const words = q.split(/\s+/).filter(Boolean);
  let matched = 0;
  for (const word of words) {
    if (text.includes(word)) matched++;
  }
  return words.length > 0 ? matched / words.length : 1;
}

export default function ListingsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState("All");
  const [bedFilter, setBedFilter] = useState("Any");
  const [priceIdx, setPriceIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);

  const filtered = useMemo(() => {
    let results = properties.map((p) => ({
      property: p,
      relevance: simpleSearch(query, p),
    }));

    // Filter by relevance
    if (query) results = results.filter((r) => r.relevance > 0);

    // Type filter
    if (typeFilter !== "All") {
      results = results.filter((r) => r.property.type === typeFilter);
    }

    // Beds filter
    if (bedFilter !== "Any") {
      const minBeds = parseInt(bedFilter);
      results = results.filter((r) => r.property.beds >= minBeds);
    }

    // Price filter
    const range = PRICE_RANGES[priceIdx];
    results = results.filter(
      (r) => r.property.price >= range.min && r.property.price <= range.max
    );

    // Sort
    if (query) {
      results.sort((a, b) => b.relevance - a.relevance);
    } else {
      const sortFn = SORT_OPTIONS[sortIdx].fn;
      results.sort((a, b) => sortFn(a.property, b.property));
    }

    return results.map((r) => r.property);
  }, [query, typeFilter, bedFilter, priceIdx, sortIdx]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <section className="pt-12 pb-8 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h1
            className="font-montserrat text-3xl md:text-4xl font-bold"
            style={{ color: "var(--fg)" }}
          >
            Property Listings
          </h1>
          <p
            className="font-montserrat text-sm mt-2"
            style={{ color: "var(--fg-50)" }}
          >
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} available
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Search */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 border mb-6"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-card)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: "var(--fg-40)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location, type, features..."
              className="flex-1 bg-transparent font-montserrat text-sm outline-none placeholder:opacity-40"
              style={{ color: "var(--fg)" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs font-montserrat"
                style={{ color: "var(--fg-40)" }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-4">
            {/* Type */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-montserrat uppercase tracking-[2px]"
                style={{ color: "var(--fg-40)" }}
              >
                Type
              </span>
              <div className="flex gap-1">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="px-3 py-1 rounded-full text-[11px] font-montserrat tracking-wide transition-all duration-200"
                    style={{
                      background: typeFilter === t ? "var(--accent)" : "var(--fg-06)",
                      color: typeFilter === t ? "var(--bg-primary)" : "var(--fg-50)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Beds */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-montserrat uppercase tracking-[2px]"
                style={{ color: "var(--fg-40)" }}
              >
                Beds
              </span>
              <div className="flex gap-1">
                {BEDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedFilter(b)}
                    className="px-3 py-1 rounded-full text-[11px] font-montserrat tracking-wide transition-all duration-200"
                    style={{
                      background: bedFilter === b ? "var(--accent)" : "var(--fg-06)",
                      color: bedFilter === b ? "var(--bg-primary)" : "var(--fg-50)",
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-montserrat uppercase tracking-[2px]"
                style={{ color: "var(--fg-40)" }}
              >
                Price
              </span>
              <select
                value={priceIdx}
                onChange={(e) => setPriceIdx(Number(e.target.value))}
                className="px-3 py-1 rounded-full text-[11px] font-montserrat tracking-wide outline-none"
                style={{
                  background: "var(--fg-06)",
                  color: "var(--fg-50)",
                  border: "none",
                }}
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            {!query && (
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-montserrat uppercase tracking-[2px]"
                  style={{ color: "var(--fg-40)" }}
                >
                  Sort
                </span>
                <select
                  value={sortIdx}
                  onChange={(e) => setSortIdx(Number(e.target.value))}
                  className="px-3 py-1 rounded-full text-[11px] font-montserrat tracking-wide outline-none"
                  style={{
                    background: "var(--fg-06)",
                    color: "var(--fg-50)",
                    border: "none",
                  }}
                >
                  {SORT_OPTIONS.map((s, i) => (
                    <option key={s.label} value={i}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-[1200px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-montserrat text-lg" style={{ color: "var(--fg-40)" }}>
                No properties match your criteria
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setTypeFilter("All");
                  setBedFilter("Any");
                  setPriceIdx(0);
                }}
                className="mt-4 font-montserrat text-sm underline"
                style={{ color: "var(--accent)" }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p, i) => {
                const walkScore = calculateWalkScore(p);
                const priceComp = comparePriceToLocal(p);

                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
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
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span
                            className="px-2.5 py-1 rounded-lg text-[10px] font-montserrat uppercase tracking-wider font-semibold"
                            style={{
                              background:
                                p.status === "For Sale"
                                  ? "rgba(0,241,241,0.9)"
                                  : p.status === "Under Offer"
                                  ? "rgba(255,180,0,0.9)"
                                  : "rgba(255,100,100,0.9)",
                              color: "#0a0c14",
                            }}
                          >
                            {p.status}
                          </span>
                        </div>
                        {/* Walk score badge */}
                        <div
                          className="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-[10px] font-montserrat font-semibold backdrop-blur-sm"
                          style={{
                            background: "rgba(10,12,20,0.8)",
                            color: walkScore >= 70 ? "var(--accent)" : "var(--fg-50)",
                          }}
                        >
                          Walk Score: {walkScore}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3
                          className="font-montserrat text-base font-bold"
                          style={{ color: "var(--fg)" }}
                        >
                          {p.title}
                        </h3>
                        <p
                          className="font-montserrat text-xs mt-1"
                          style={{ color: "var(--fg-40)" }}
                        >
                          {p.address}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <span
                            className="font-montserrat text-lg font-bold"
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

                        {/* Price comparison */}
                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className="text-[10px] font-montserrat"
                            style={{
                              color: priceComp.isBelow ? "#4ade80" : "var(--fg-30)",
                            }}
                          >
                            {priceComp.label}
                          </span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="px-2 py-0.5 rounded text-[9px] font-montserrat"
                              style={{
                                background: "var(--fg-06)",
                                color: "var(--fg-40)",
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

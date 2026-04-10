"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { properties, type Property } from "@/lib/real-estate/properties";
import { calculateWalkScore, walkScoreLabel, comparePriceToLocal } from "@/lib/real-estate/smart-logic";

type ListingMode = "sale" | "rent" | "all";
type PropertyType = "All" | "Flat" | "House" | "Penthouse" | "Townhouse" | "Maisonette";
type BedFilter = "Any" | "1+" | "2+" | "3+" | "4+" | "5+";

function getStatusStyle(status: string): { bg: string; color: string; border: string; label: string } {
  const isRent = status === "To Let" || status === "Let Agreed";
  
  if (isRent) {
    return {
      bg: "rgba(16, 185, 129, 0.9)",
      color: "#ffffff",
      border: "rgba(16, 185, 129, 0.5)",
      label: status === "To Let" ? "To Let" : "Let Agreed",
    };
  }
  
  if (status === "For Sale") {
    return {
      bg: "rgba(0, 241, 241, 0.95)",
      color: "#0a0c14",
      border: "rgba(0, 241, 241, 0.5)",
      label: "For Sale",
    };
  }
  
  if (status === "Under Offer") {
    return {
      bg: "rgba(251, 191, 36, 0.9)",
      color: "#1a1a1a",
      border: "rgba(251, 191, 36, 0.5)",
      label: "Under Offer",
    };
  }
  
  if (status === "Sold STC") {
    return {
      bg: "rgba(239, 68, 68, 0.9)",
      color: "#ffffff",
      border: "rgba(239, 68, 68, 0.5)",
      label: "Sold STC",
    };
  }
  
  return {
    bg: "rgba(255, 255, 255, 0.9)",
    color: "#1a1a1a",
    border: "rgba(255, 255, 255, 0.3)",
    label: status,
  };
}

const PROPERTY_TYPES: PropertyType[] = ["All", "Flat", "House", "Penthouse", "Townhouse", "Maisonette"];
const BED_OPTIONS: BedFilter[] = ["Any", "1+", "2+", "3+", "4+"];
const SORT_OPTIONS = [
  { label: "Price: Low to High", fn: (a: Property, b: Property) => a.price - b.price },
  { label: "Price: High to Low", fn: (a: Property, b: Property) => b.price - a.price },
  { label: "Beds: Most", fn: (a: Property, b: Property) => b.beds - a.beds },
  { label: "Largest", fn: (a: Property, b: Property) => b.sqft - a.sqft },
];

const SALE_PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under £500k", min: 0, max: 500000 },
  { label: "£500k - £750k", min: 500000, max: 750000 },
  { label: "£750k - £1M", min: 750000, max: 1000000 },
  { label: "£1M - £1.5M", min: 1000000, max: 1500000 },
  { label: "£1.5M - £2M", min: 1500000, max: 2000000 },
  { label: "£2M+", min: 2000000, max: Infinity },
];

const RENT_PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under £1,500 PCM", min: 0, max: 1500 },
  { label: "£1,500 - £2,500 PCM", min: 1500, max: 2500 },
  { label: "£2,500 - £3,500 PCM", min: 2500, max: 3500 },
  { label: "£3,500 - £5,000 PCM", min: 3500, max: 5000 },
  { label: "£5,000+ PCM", min: 5000, max: Infinity },
];

function simpleSearch(query: string, property: Property): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const text = `${property.title} ${property.description} ${property.borough} ${property.type} ${property.features.join(" ")} ${property.nearbySchools.map((s) => s.name).join(" ")} ${property.nearbyShops.map((s) => s.name).join(" ")}`.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  let matched = 0;
  for (const word of words) {
    if (text.includes(word)) matched++;
  }
  return words.length > 0 ? matched / words.length : 1;
}

// Icons as components - larger for better visibility
const BedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
  </svg>
);
const BathIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" /><path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" /><ellipse cx="12" cy="5" rx="2" ry="1" />
  </svg>
);
const AreaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
  </svg>
);
// Clearer walk score icon - location pin style
const WalkIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const StationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" /><path d="M4 15v6" /><path d="M20 15v6" /><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M12 4v6" />
  </svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function ListingsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [listingMode, setListingMode] = useState<ListingMode>("all");
  const [typeFilter, setTypeFilter] = useState<PropertyType>("All");
  const [bedFilter, setBedFilter] = useState<BedFilter>("Any");
  const [priceIdx, setPriceIdx] = useState(0);
  const [sortIdx, setSortIdx] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const priceRanges = listingMode === "rent" ? RENT_PRICE_RANGES : SALE_PRICE_RANGES;

  const filtered = useMemo(() => {
    let results = properties
      .filter(p => {
        if (listingMode === "sale" && p.listingMode !== "sale") return false;
        if (listingMode === "rent" && p.listingMode !== "rent") return false;
        return true;
      })
      .map((p) => ({
        property: p,
        relevance: simpleSearch(query, p),
      }));

    if (query) results = results.filter((r) => r.relevance > 0);
    if (typeFilter !== "All") results = results.filter((r) => r.property.type === typeFilter);
    if (bedFilter !== "Any") {
      const minBeds = parseInt(bedFilter);
      results = results.filter((r) => r.property.beds >= minBeds);
    }

    const range = priceRanges[priceIdx];
    results = results.filter((r) => {
      const checkPrice = listingMode === "rent" ? (r.property.rentPcm || 0) : r.property.price;
      return checkPrice >= range.min && checkPrice <= range.max;
    });

    if (query) {
      results.sort((a, b) => b.relevance - a.relevance);
    } else {
      const sortFn = SORT_OPTIONS[sortIdx].fn;
      results.sort((a, b) => sortFn(a.property, b.property));
    }

    return results.map((r) => r.property);
  }, [query, listingMode, typeFilter, bedFilter, priceIdx, sortIdx, priceRanges]);

  const saleCount = properties.filter(p => p.listingMode === "sale").length;
  const rentCount = properties.filter(p => p.listingMode === "rent").length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <section className="pt-10 pb-6 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-montserrat text-3xl md:text-4xl font-bold" style={{ color: "var(--fg)" }}>
            Real Estate
          </h1>
        </div>
      </section>

      {/* Mode Toggle & Search Bar */}
      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-[1200px] mx-auto space-y-4">
          {/* Sale/Rent Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setListingMode("all"); setPriceIdx(0); }}
              className={`px-4 py-2 rounded-xl text-sm font-montserrat font-medium transition-all duration-300 ${
                listingMode === "all" ? "ring-2 ring-offset-2 ring-offset-[var(--bg-primary)]" : ""
              }`}
              style={{
                background: listingMode === "all" ? "var(--accent)" : "var(--bg-surface)",
                color: listingMode === "all" ? "var(--bg-primary)" : "var(--fg-60)",
              }}
            >
              All ({properties.length})
            </button>
            <button
              onClick={() => { setListingMode("sale"); setPriceIdx(0); }}
              className={`px-4 py-2 rounded-xl text-sm font-montserrat font-medium transition-all duration-300 ${
                listingMode === "sale" ? "ring-2 ring-offset-2 ring-offset-[var(--bg-primary)]" : ""
              }`}
              style={{
                background: listingMode === "sale" ? "var(--accent)" : "var(--bg-surface)",
                color: listingMode === "sale" ? "var(--bg-primary)" : "var(--fg-60)",
              }}
            >
              For Sale ({saleCount})
            </button>
            <button
              onClick={() => { setListingMode("rent"); setPriceIdx(0); }}
              className={`px-4 py-2 rounded-xl text-sm font-montserrat font-medium transition-all duration-300 ${
                listingMode === "rent" ? "ring-2 ring-offset-2 ring-offset-[var(--bg-primary)]" : ""
              }`}
              style={{
                background: listingMode === "rent" ? "var(--accent)" : "var(--bg-surface)",
                color: listingMode === "rent" ? "var(--bg-primary)" : "var(--fg-60)",
              }}
            >
              To Rent ({rentCount})
            </button>
          </div>

          {/* Search & Filter Row */}
          <div className="flex gap-3">
            {/* Search */}
            <div
              className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <SearchIcon />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by location, features, schools..."
                className="flex-1 bg-transparent font-montserrat text-sm outline-none placeholder:opacity-40"
                style={{ color: "var(--fg)" }}
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-xs font-montserrat" style={{ color: "var(--fg-40)" }}>
                  Clear
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border font-montserrat text-sm font-medium transition-all duration-300 hover:shadow-lg"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", color: "var(--fg-70)" }}
            >
              <FilterIcon />
              Filters
            </button>
          </div>

          {/* Results count */}
          <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
          </p>
        </div>
      </section>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[500px] max-h-[85vh] overflow-y-auto rounded-3xl border p-6"
              style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-white/5">
                  <CloseIcon />
                </button>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-xs font-montserrat uppercase tracking-wider mb-3" style={{ color: "var(--fg-40)" }}>Sale / Rent</label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "sale", "rent"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setListingMode(m); setPriceIdx(0); }}
                      className="px-3 py-2 rounded-lg text-xs font-montserrat transition-all duration-200"
                      style={{
                        background: listingMode === m ? "var(--accent)" : "var(--bg-surface)",
                        color: listingMode === m ? "var(--bg-primary)" : "var(--fg-50)",
                      }}
                    >
                      {m === "all" ? "All" : m === "sale" ? "For Sale" : "To Rent"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-xs font-montserrat uppercase tracking-wider mb-3" style={{ color: "var(--fg-40)" }}>Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className="px-3 py-2 rounded-lg text-xs font-montserrat transition-all duration-200"
                      style={{
                        background: typeFilter === t ? "var(--accent)" : "var(--bg-surface)",
                        color: typeFilter === t ? "var(--bg-primary)" : "var(--fg-50)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

                {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-xs font-montserrat uppercase tracking-wider mb-3" style={{ color: "var(--fg-40)" }}>Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  {BED_OPTIONS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedFilter(b)}
                      className="px-3 py-2 rounded-lg text-xs font-montserrat transition-all duration-200"
                      style={{
                        background: bedFilter === b ? "var(--accent)" : "var(--bg-surface)",
                        color: bedFilter === b ? "var(--bg-primary)" : "var(--fg-50)",
                      }}
                    >
                      {b === "Any" ? "Any" : `${b} Bed`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-xs font-montserrat uppercase tracking-wider mb-3" style={{ color: "var(--fg-40)" }}>
                  {listingMode === "rent" ? "Monthly Rent" : "Price Range"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => setPriceIdx(i)}
                      className="px-3 py-2 rounded-lg text-xs font-montserrat text-left transition-all duration-200"
                      style={{
                        background: priceIdx === i ? "var(--accent)" : "var(--bg-surface)",
                        color: priceIdx === i ? "var(--bg-primary)" : "var(--fg-50)",
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-xs font-montserrat uppercase tracking-wider mb-3" style={{ color: "var(--fg-40)" }}>Sort By</label>
                <select
                  value={sortIdx}
                  onChange={(e) => setSortIdx(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-sm font-montserrat outline-none"
                  style={{ background: "var(--bg-surface)", color: "var(--fg)", border: "1px solid var(--border-card)" }}
                >
                  {SORT_OPTIONS.map((o, i) => (
                    <option key={o.label} value={i}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border-card)" }}>
                <button
                  onClick={() => { setTypeFilter("All"); setBedFilter("Any"); setPriceIdx(0); setSortIdx(0); }}
                  className="flex-1 py-3 rounded-xl text-sm font-montserrat font-medium"
                  style={{ background: "var(--bg-surface)", color: "var(--fg-60)" }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-montserrat font-medium"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Properties Grid */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-[1200px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-montserrat text-lg" style={{ color: "var(--fg-40)" }}>No properties match your criteria</p>
              <button
                onClick={() => { setQuery(""); setListingMode("all"); setTypeFilter("All"); setBedFilter("Any"); setPriceIdx(0); }}
                className="mt-4 font-montserrat text-sm underline" style={{ color: "var(--accent)" }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => {
                const walkScore = calculateWalkScore(p);
                const priceComp = comparePriceToLocal(p);
                const displayPrice = listingMode === "rent" && p.rentPcm ? `£${p.rentPcm.toLocaleString()}/PCM` : p.priceLabel;
                const isRent = p.listingMode === "rent";

                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  >
                    <Link
                      href={`/buy/real-estate/listings/${p.slug}`}
                      className="group block rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-15px_rgba(0,241,241,0.15)]"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {(() => {
                            const statusStyle = getStatusStyle(p.status);
                            return (
                              <span 
                                className="px-2.5 py-1 rounded-lg text-[10px] font-montserrat uppercase tracking-wider font-semibold"
                                style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.color}33` }}
                              >
                                {statusStyle.label}
                              </span>
                            );
                          })()}
                        </div>
                        {/* AI Badge - subtle */}
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[9px] font-montserrat font-medium bg-black/40 backdrop-blur-sm text-white">
                          AI Insights
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-montserrat text-base font-bold line-clamp-1" style={{ color: "var(--fg)" }}>{p.title}</h3>
                        <p className="font-montserrat text-xs mt-1 line-clamp-1" style={{ color: "var(--fg-40)" }}>{p.address}</p>

                        {/* Quick Info Grid - Icon-based, no borders */}
                        <div className="grid grid-cols-4 gap-2 mt-4">
                          <div className="flex flex-col items-center gap-1">
                            <BedIcon />
                            <span className="text-[12px] font-montserrat font-bold" style={{ color: "var(--fg-70)" }}>{p.beds}</span>
                            <span className="text-[8px] font-montserrat" style={{ color: "var(--fg-30)" }}>beds</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <BathIcon />
                            <span className="text-[12px] font-montserrat font-bold" style={{ color: "var(--fg-70)" }}>{p.baths}</span>
                            <span className="text-[8px] font-montserrat" style={{ color: "var(--fg-30)" }}>baths</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <AreaIcon />
                            <span className="text-[12px] font-montserrat font-bold" style={{ color: "var(--fg-70)" }}>{p.sqft}</span>
                            <span className="text-[8px] font-montserrat" style={{ color: "var(--fg-30)" }}>sqft</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <WalkIcon style={{ color: walkScore >= 70 ? "var(--accent)" : "var(--fg-40)" }} />
                            <span className="text-[12px] font-montserrat font-bold" style={{ color: walkScore >= 70 ? "var(--accent)" : "var(--fg-70)" }}>{walkScore}</span>
                            <span className="text-[8px] font-montserrat" style={{ color: "var(--fg-30)" }}>walk</span>
                          </div>
                        </div>

                        {/* Price & Station */}
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="font-montserrat text-lg font-bold" style={{ color: "var(--accent)" }}>{displayPrice}</span>
                            {priceComp.isBelow && (
                              <span className="ml-2 text-[10px] font-montserrat" style={{ color: "#4ade80" }}>{priceComp.label}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1" style={{ color: "var(--fg-40)" }}>
                            <StationIcon />
                            <span className="text-[10px] font-montserrat">{p.stationDistance}</span>
                          </div>
                        </div>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.features.slice(0, 2).map((f) => (
                            <span key={f} className="px-2 py-0.5 rounded text-[9px] font-montserrat" style={{ background: "var(--fg-08)", color: "var(--fg-40)" }}>
                              {f}
                            </span>
                          ))}
                          {p.features.length > 2 && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-montserrat" style={{ background: "var(--fg-08)", color: "var(--accent)" }}>
                              +{p.features.length - 2}
                            </span>
                          )}
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


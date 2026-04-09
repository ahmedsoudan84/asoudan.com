"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Property } from "@/lib/real-estate/properties";
import {
  calculateWalkScore,
  walkScoreLabel,
  calculateCommute,
  comparePriceToLocal,
  generateAreaSummary,
  recordView,
  getScarcityMessage,
} from "@/lib/real-estate/smart-logic";

export default function PropertyDetailClient({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [scarcityMsg, setScarcityMsg] = useState<string | null>(null);

  const walkScore = calculateWalkScore(property);
  const commute = calculateCommute(property);
  const priceComp = comparePriceToLocal(property);
  const areaSummary = generateAreaSummary(property);

  useEffect(() => {
    recordView(property.slug);
    setScarcityMsg(getScarcityMessage(property));
  }, [property.slug, property]);

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 pt-6">
        <div className="max-w-[1200px] mx-auto">
          <nav
            className="font-montserrat text-xs flex items-center gap-2"
            style={{ color: "var(--fg-40)" }}
          >
            <Link href="/buy/real-estate/listings" className="hover:text-[var(--accent)] transition-colors">
              Listings
            </Link>
            <span>/</span>
            <span style={{ color: "var(--fg-60)" }}>{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4"
        >
          <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {scarcityMsg && (
              <div
                className="absolute top-4 left-4 px-4 py-2 rounded-xl text-xs font-montserrat font-semibold backdrop-blur-sm"
                style={{
                  background: "rgba(255,100,50,0.9)",
                  color: "white",
                }}
              >
                {scarcityMsg}
              </div>
            )}
            <div
              className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-montserrat font-semibold"
              style={{
                background:
                  property.status === "For Sale"
                    ? "rgba(0,241,241,0.9)"
                    : property.status === "Under Offer"
                    ? "rgba(255,180,0,0.9)"
                    : "rgba(255,100,100,0.9)",
                color: "#0a0c14",
              }}
            >
              {property.status}
            </div>
          </div>

          <div className="flex lg:flex-col gap-4">
            {property.images.slice(1).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i + 1)}
                className={`rounded-xl overflow-hidden h-32 lg:h-auto lg:flex-1 transition-all duration-300 border-2 ${
                  activeImage === i + 1 ? "border-[var(--accent)]" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${property.title} view ${i + 2}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mt-10">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1
                className="font-montserrat text-3xl md:text-4xl font-bold"
                style={{ color: "var(--fg)" }}
              >
                {property.title}
              </h1>
              <p className="font-montserrat text-sm mt-2" style={{ color: "var(--fg-40)" }}>
                {property.address}
              </p>

              <div className="flex items-center gap-6 mt-6">
                <span
                  className="font-montserrat text-3xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {property.priceLabel}
                </span>
                <span
                  className="text-xs font-montserrat px-3 py-1 rounded-full"
                  style={{
                    background: priceComp.isBelow ? "rgba(74,222,128,0.15)" : "var(--fg-06)",
                    color: priceComp.isBelow ? "#4ade80" : "var(--fg-40)",
                  }}
                >
                  {priceComp.label}
                </span>
              </div>

              {/* Key stats */}
              <div
                className="flex items-center gap-8 mt-6 py-4 border-y"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {[
                  { label: "Bedrooms", value: property.beds },
                  { label: "Bathrooms", value: property.baths },
                  { label: "Sq Ft", value: property.sqft.toLocaleString() },
                  { label: "Type", value: property.type },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                      {s.value}
                    </div>
                    <div className="font-montserrat text-[10px] uppercase tracking-[2px]" style={{ color: "var(--fg-40)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                  About This Property
                </h2>
                <p
                  className="font-montserrat text-sm mt-3 leading-relaxed"
                  style={{ color: "var(--fg-60)" }}
                >
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h2 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                  Key Features
                </h2>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {property.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{ background: "var(--fg-06)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ color: "var(--accent)" }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-montserrat text-xs" style={{ color: "var(--fg-60)" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Area Summary */}
              <div
                className="mt-10 p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "rgba(0,241,241,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: "var(--accent)" }}
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <h3 className="font-montserrat text-sm font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    AI Area Insights
                  </h3>
                </div>
                <p className="font-montserrat text-sm leading-relaxed" style={{ color: "var(--fg-60)" }}>
                  {areaSummary}
                </p>
              </div>

              {/* Nearby */}
              <div className="mt-10 grid md:grid-cols-3 gap-6">
                {/* Schools */}
                <div>
                  <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                    Schools
                  </h3>
                  {property.nearbySchools.map((s) => (
                    <div key={s.name} className="mb-3">
                      <p className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg-70)" }}>
                        {s.name}
                      </p>
                      <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-40)" }}>
                        {s.distance} &middot; {s.rating} &middot; {s.type}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Shops */}
                <div>
                  <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                    Shopping
                  </h3>
                  {property.nearbyShops.map((s) => (
                    <div key={s.name} className="mb-3">
                      <p className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg-70)" }}>
                        {s.name}
                      </p>
                      <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-40)" }}>
                        {s.distance} &middot; {s.type}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Amenities */}
                <div>
                  <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                    Amenities
                  </h3>
                  {property.nearbyAmenities.map((a) => (
                    <div key={a.name} className="mb-3">
                      <p className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg-70)" }}>
                        {a.name}
                      </p>
                      <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-40)" }}>
                        {a.distance} &middot; {a.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Walk Score */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                  Walk Score
                </h3>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-montserrat text-xl font-bold"
                    style={{
                      background: `conic-gradient(var(--accent) ${walkScore * 3.6}deg, var(--fg-08) 0deg)`,
                      color: "var(--fg)",
                    }}
                  >
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "var(--bg-surface)" }}
                    >
                      {walkScore}
                    </span>
                  </div>
                  <div>
                    <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>
                      {walkScoreLabel(walkScore)}
                    </p>
                    <p className="font-montserrat text-[10px] mt-1" style={{ color: "var(--fg-40)" }}>
                      Based on nearby amenities
                    </p>
                  </div>
                </div>
              </div>

              {/* Commute */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                  Commute to Bank
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-montserrat text-xs" style={{ color: "var(--fg-50)" }}>
                      Walk to {commute.station}
                    </span>
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg)" }}>
                      {commute.walkMinutes} min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-montserrat text-xs" style={{ color: "var(--fg-50)" }}>
                      Tube to Bank
                    </span>
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg)" }}>
                      {commute.tubeMinutes} min
                    </span>
                  </div>
                  <div
                    className="pt-3 flex justify-between border-t"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "var(--accent)" }}>
                      Total commute
                    </span>
                    <span className="font-montserrat text-sm font-bold" style={{ color: "var(--accent)" }}>
                      {commute.totalMinutes} min
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                  Interested?
                </h3>
                <Link
                  href="/buy/real-estate/contact"
                  className="block w-full text-center py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,241,241,0.3)]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Book a Viewing
                </Link>
                <p className="font-montserrat text-[10px] text-center mt-3" style={{ color: "var(--fg-30)" }}>
                  Or call +44 20 7946 0958
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

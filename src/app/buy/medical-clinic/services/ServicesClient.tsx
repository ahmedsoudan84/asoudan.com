"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { services, serviceCategories, serviceCategoryLabels } from "@/lib/medical-clinic/data";
import { searchServices } from "@/lib/medical-clinic/smart-logic";
import type { ServiceCategory } from "@/lib/medical-clinic/data";

export default function ServicesClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");

  useEffect(() => {
    const cat = searchParams.get("category") as ServiceCategory | null;
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = (() => {
    let list = activeCategory === "all" ? services : services.filter((s) => s.category === activeCategory);
    if (query.trim()) list = searchServices(query, list);
    return list;
  })();

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
            What We Offer
          </span>
          <h1 className="font-montserrat text-5xl md:text-6xl font-black tracking-tight mb-6">Our Services</h1>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--fg-60)" }}>
            Expert private healthcare across 8 specialties, delivered by experienced consultants in a modern, welcoming environment.
          </p>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl border mb-8 max-w-lg mx-auto"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <Icons.Search className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services… 'back pain', 'skin check'"
            className="flex-1 bg-transparent outline-none font-montserrat text-sm"
            style={{ color: "var(--fg)" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: "var(--fg-40)" }}>
              <Icons.X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className="px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all"
            style={{
              background: activeCategory === "all" ? "var(--accent)" : "var(--fg-05)",
              borderColor: activeCategory === "all" ? "var(--accent)" : "var(--border-subtle)",
              color: activeCategory === "all" ? "var(--bg-primary)" : "var(--fg-50)",
            }}
          >
            All Services
          </button>
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{
                background: activeCategory === cat ? "var(--accent)" : "var(--fg-05)",
                borderColor: activeCategory === cat ? "var(--accent)" : "var(--border-subtle)",
                color: activeCategory === cat ? "var(--bg-primary)" : "var(--fg-50)",
              }}
            >
              {serviceCategoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Icons.Search className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--fg-20)" }} />
            <p className="font-montserrat font-bold">No services found</p>
            <p className="text-sm mt-2" style={{ color: "var(--fg-40)" }}>Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/buy/medical-clinic/services/${svc.slug}`}
                  className="group flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-xl hover:border-accent/30"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="sm:w-40 shrink-0 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop"; }}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "var(--accent)" }}>
                        {serviceCategoryLabels[svc.category]}
                      </span>
                      <div className="flex items-center gap-1 text-[11px]" style={{ color: "var(--fg-40)" }}>
                        <Icons.Clock className="w-3 h-3" />
                        {svc.duration} min
                      </div>
                    </div>
                    <h2 className="font-montserrat font-bold text-lg mb-2 group-hover:text-accent transition-colors">{svc.name}</h2>
                    <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--fg-40)" }}>
                      {svc.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {svc.features.slice(0, 3).map((f) => (
                        <span key={f} className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: "var(--fg-05)", color: "var(--fg-40)" }}>
                          <Icons.Check className="w-2.5 h-2.5" style={{ color: "var(--accent)" }} />
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>
                        £{svc.price}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider transition-transform group-hover:translate-x-1" style={{ color: "var(--accent)" }}>
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

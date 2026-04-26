"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";

import { categories } from "@/lib/templates-data";

/* ── Coming Soon scan line ── */
function ScanLine({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute left-0 w-full h-px pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(145,251,255,0.12), transparent)",
      }}
      animate={{ top: ["-10%", "110%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

/* ── Coming Soon card pulse ── */
function ComingSoonCard({ cat, i }: { cat: typeof categories[0]; i: number }) {
  const delay = i * 0.8;
  return (
    <motion.div
      key={cat.title}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * i }}
      className="group relative rounded-2xl border overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Scan line */}
      <ScanLine delay={delay} />
      {/* Pulse border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid var(--accent)" }}
        animate={{ opacity: [0.06, 0.18, 0.06] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      />
      {/* Content */}
      <div className="h-48 flex items-center justify-center relative">
        <span className="font-montserrat text-xs uppercase tracking-[3px]" style={{ color: "var(--fg-30)" }}>
          Coming Soon
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
          {cat.title}
        </h3>
        <p className="font-montserrat text-sm mt-1" style={{ color: "var(--accent)" }}>
          {cat.subtitle}
        </p>
        <p className="font-montserrat text-sm mt-3 leading-relaxed" style={{ color: "var(--fg-50)" }}>
          {cat.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {cat.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-wider"
              style={{ background: "rgba(var(--secondary-rgb),0.08)", color: "var(--secondary)", border: "1px solid rgba(var(--secondary-rgb),0.2)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function BuyCategoriesClient() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-montserrat text-4xl md:text-6xl font-bold tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Premium Website Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-montserrat text-lg md:text-xl mt-6 max-w-2xl mx-auto"
            style={{ color: "var(--fg-50)" }}
          >
            Ready-to-use, customisable, built with Next.js + AI
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const isLive = cat.status === "live";
            if (!isLive) return <ComingSoonCard key={cat.title} cat={cat} i={i} />;
            const Card = (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                  isLive
                    ? "hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.15)]"
                    : "opacity-60"
                }`}
                style={{
                  background: "var(--bg-surface)",
                  borderColor: isLive ? "var(--border-card)" : "var(--border-subtle)",
                }}
              >
                {/* Preview area */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ background: isLive && cat.coverImage ? "transparent" : "var(--bg-tertiary)" }}
                >
                  {isLive && cat.coverImage ? (
                    <img 
                      src={cat.coverImage} 
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : isLive ? (
                    <div className="text-center p-6">
                      <div className="mb-3" style={{ color: "var(--accent)", opacity: 0.3 }}>
                        {cat.icon}
                      </div>
                      <div
                        className="text-2xl font-bold font-montserrat"
                        style={{ color: "var(--accent)", opacity: 0.15 }}
                      >
                        PREVIEW
                      </div>
                    </div>
                  ) : (
                    <span
                      className="font-montserrat text-xs uppercase tracking-[3px]"
                      style={{ color: "var(--fg-30)" }}
                    >
                      Coming Soon
                    </span>
                  )}
                  {isLive && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-wider font-semibold"
                      style={{
                        background: "rgba(0,241,241,0.15)",
                        color: "var(--accent)",
                        border: "1px solid rgba(0,241,241,0.3)",
                      }}
                    >
                      Live
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-montserrat text-xl font-bold"
                    style={{ color: "var(--fg)" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="font-montserrat text-sm mt-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {cat.subtitle}
                  </p>
                  <p
                    className="font-montserrat text-sm mt-3 leading-relaxed"
                    style={{ color: "var(--fg-50)" }}
                  >
                    {cat.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-wider"
                        style={{
                          background: "rgba(var(--secondary-rgb),0.08)",
                          color: "var(--secondary)",
                          border: "1px solid rgba(var(--secondary-rgb),0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isLive && (
                    <div
                      className="mt-6 text-center py-2.5 rounded-lg font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,241,241,0.2)]"
                      style={{
                        background: "rgba(0,241,241,0.1)",
                        color: "var(--accent)",
                        border: "1px solid rgba(0,241,241,0.3)",
                      }}
                    >
                      View Template &rarr;
                    </div>
                  )}
                </div>
              </motion.div>
            );

            if (isLive && cat.slug) {
              return (
                <Link key={cat.title} href={`/buy/${cat.slug}`} className="block">
                  {Card}
                </Link>
              );
            }
            return Card;
          })}
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  );
}

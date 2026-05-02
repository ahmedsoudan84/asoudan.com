"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";

import { categories } from "@/lib/templates-data";

const isAITag = (tag: string) => tag.toLowerCase().startsWith("ai ");

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

/* ── Coming Soon card ── */
function ComingSoonCard({ cat, i }: { cat: typeof categories[0]; i: number }) {
  const delay = i * 0.8;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * i }}
      className="group relative rounded-2xl border overflow-hidden flex flex-col h-full"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
    >
      <ScanLine delay={delay} />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid var(--accent)" }}
        animate={{ opacity: [0.06, 0.18, 0.06] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <div className="h-48 flex items-center justify-center relative shrink-0">
        <span className="font-montserrat text-xs uppercase tracking-[3px]" style={{ color: "var(--fg-30)" }}>
          Coming Soon
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>{cat.title}</h3>
        <p className="font-montserrat text-sm mt-1" style={{ color: "var(--accent)" }}>{cat.subtitle}</p>
        <p className="font-montserrat text-sm mt-3 leading-relaxed" style={{ color: "var(--fg-50)" }}>{cat.description}</p>
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
            Ready-to-use, customisable, built with Next.js
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="font-montserrat text-[11px] font-bold uppercase tracking-[3px] mt-5"
            style={{ color: "var(--accent)", opacity: 0.75 }}
          >
            ✦ Every template is personalised to your brand guidelines after purchase
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {categories.map((cat, i) => {
            const isLive = cat.status === "live";
            if (!isLive) return <ComingSoonCard key={cat.title} cat={cat} i={i} />;

            const Card = (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group relative rounded-2xl border overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.15)]"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                {/* Preview image */}
                <div className="h-48 relative overflow-hidden shrink-0" style={{ background: cat.coverImage ? "transparent" : "var(--bg-tertiary)" }}>
                  {cat.coverImage ? (
                    <>
                      <img
                        src={cat.coverImage}
                        alt={cat.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient to ensure pill readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="mb-3" style={{ color: "var(--accent)", opacity: 0.3 }}>{cat.icon}</div>
                        <div className="text-2xl font-bold font-montserrat" style={{ color: "var(--accent)", opacity: 0.15 }}>PREVIEW</div>
                      </div>
                    </div>
                  )}
                  {/* Live pill — solid dark so it reads over any image */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-montserrat text-[10px] font-bold uppercase tracking-[2px] text-white">Live</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>{cat.title}</h3>
                  <p className="font-montserrat text-sm mt-1" style={{ color: "var(--accent)" }}>{cat.subtitle}</p>
                  <p className="font-montserrat text-sm mt-3 leading-relaxed" style={{ color: "var(--fg-50)" }}>{cat.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.tags.map((tag) =>
                      isAITag(tag) ? (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-montserrat font-bold uppercase tracking-wider"
                          style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.25)" }}
                        >
                          <span>✦</span>
                          {tag}
                        </span>
                      ) : (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-wider"
                          style={{ background: "rgba(var(--secondary-rgb),0.08)", color: "var(--secondary)", border: "1px solid rgba(var(--secondary-rgb),0.2)" }}
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  {/* Spacer pushes price + CTA to bottom */}
                  <div className="flex-1" />

                  {cat.startingPrice && (
                    <div className="mt-5 flex items-center justify-between gap-3 pt-5 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-montserrat font-bold uppercase tracking-[2px]" style={{ color: "var(--fg-40)" }}>From</span>
                        <span className="font-montserrat text-xl font-black tracking-tight" style={{ color: "var(--fg)" }}>{cat.startingPrice}</span>
                      </div>
                      <span className="text-[10px] font-montserrat font-bold uppercase tracking-[1.5px] opacity-60 text-right" style={{ color: "var(--fg-50)" }}>
                        Branded &amp;<br />deployed
                      </span>
                    </div>
                  )}

                  <div
                    className="mt-5 text-center py-2.5 rounded-lg font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,241,241,0.2)]"
                    style={{ background: "rgba(0,241,241,0.1)", color: "var(--accent)", border: "1px solid rgba(0,241,241,0.3)" }}
                  >
                    View Template &amp; Pricing &rarr;
                  </div>
                </div>
              </motion.div>
            );

            return cat.slug ? (
              <Link key={cat.title} href={`/buy/${cat.slug}`} className="block h-full">
                {Card}
              </Link>
            ) : Card;
          })}
        </div>
      </section>

      <Footer />
      <FloatingNav />
    </main>
  );
}

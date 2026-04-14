"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";

const VALUES = [
  {
    icon: <EcomIcons.Sparkles className="w-5 h-5" />,
    title: "Curation over catalogue",
    body: "Sixteen objects. Every one chosen because we'd actually send it to a friend. No endless scroll, no dead stock.",
  },
  {
    icon: <EcomIcons.Shield className="w-5 h-5" />,
    title: "Built to last",
    body: "Lifetime repair on leather, 10-year frame warranties, honest materials. Buying once is the only sustainable shop.",
  },
  {
    icon: <EcomIcons.Leaf className="w-5 h-5" />,
    title: "Transparent sourcing",
    body: "Every product page shows where it was made, what it's made of, and who made it. No hidden supply chains.",
  },
  {
    icon: <EcomIcons.Lock className="w-5 h-5" />,
    title: "Private by default",
    body: "The AI stylist runs entirely in your browser. No cookies, no trackers, no behavioural profiling.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Semantic search",
    body: "Describe what you need in plain English — the index understands synonyms, vibes, and price phrases.",
  },
  {
    num: "02",
    title: "AI stylist",
    body: "A rules-based model trained on good taste returns three picks with the reasoning behind each.",
  },
  {
    num: "03",
    title: "Persistent cart",
    body: "Zustand + localStorage keep your cart alive across tabs and sessions without a single server call.",
  },
  {
    num: "04",
    title: "Three-step checkout",
    body: "Cart → details → payment, with clear affordances and a secure-checkout feel end-to-end.",
  },
];

export default function AboutClient() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="pt-16 pb-20 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              About Kurator
            </span>
            <h1
              className="font-montserrat text-4xl md:text-6xl font-black mt-4 tracking-tight leading-[1.05]"
              style={{ color: "var(--fg)" }}
            >
              A demo shop you'd{" "}
              <span style={{ color: "var(--accent)" }}>actually</span> buy from.
            </h1>
            <p
              className="font-montserrat text-base md:text-lg mt-6 leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              Kurator is a production-ready e-commerce template for
              Next.js 16. Semantic search, an in-house AI stylist,
              a persistent cart, a real checkout flow — all running client-side.
              Drop in your own catalogue and ship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-6 lg:px-10 border-y"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span
              className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              Principles
            </span>
            <h2
              className="font-montserrat text-3xl md:text-4xl font-bold mt-2"
              style={{ color: "var(--fg)" }}
            >
              How we choose what gets sold.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(var(--accent-rgb), 0.1)",
                    color: "var(--accent)",
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  className="font-montserrat font-bold text-lg"
                  style={{ color: "var(--fg)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="font-montserrat text-sm mt-3 leading-relaxed"
                  style={{ color: "var(--fg-60)" }}
                >
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span
              className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              What's inside
            </span>
            <h2
              className="font-montserrat text-3xl md:text-4xl font-bold mt-2"
              style={{ color: "var(--fg)" }}
            >
              Four moving parts.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl border flex gap-5"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <span
                  className="font-montserrat font-black text-4xl shrink-0"
                  style={{ color: "var(--accent)", opacity: 0.35 }}
                >
                  {s.num}
                </span>
                <div>
                  <h3
                    className="font-montserrat font-bold text-lg"
                    style={{ color: "var(--fg)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-montserrat text-sm mt-2 leading-relaxed"
                    style={{ color: "var(--fg-60)" }}
                  >
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="font-montserrat text-3xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Ready to see it live?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/buy/ecommerce/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.03]"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              Browse the shop
            </Link>
            <Link
              href="/buy/ecommerce/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] border transition-all hover:border-accent"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

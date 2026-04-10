"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MENU_ITEMS = [
  {
    name: "Truffle Risotto",
    price: "£28",
    description: "Arborio rice with black truffle, parmesan, and herbs",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop"
  },
  {
    name: "Wagyu Beef Burger",
    price: "£24",
    description: "Premium wagyu patty with aged cheddar and truffle aioli",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
  },
  {
    name: "Lobster Thermidor",
    price: "£42",
    description: "Fresh lobster in cognac cream sauce with gruyère",
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop"
  }
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "AI Menu Recommender",
    desc: "Tell us your preferences — our AI suggests the perfect dishes based on your tastes and dietary needs.",
  },
  {
    step: "02",
    title: "Smart Search",
    desc: "Search for dishes by ingredients, cuisine type, or mood. Find exactly what you're craving.",
  },
  {
    step: "03",
    title: "Online Ordering",
    desc: "Seamless ordering system with cart persistence, delivery tracking, and table reservations.",
  },
];

const TRUST = [
  { stat: "25+", label: "Premium Dishes" },
  { stat: "3", label: "AI Features" },
  { stat: "0", label: "API Keys Needed" },
  { stat: "100%", label: "Client-Side" },
];

export default function RestaurantsHomeClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Subtle gradient orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
          style={{ background: "var(--accent)" }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-montserrat font-medium mb-8"
              style={{
                background: "rgba(0,241,241,0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(0,241,241,0.3)",
              }}
            >
              <span>✨</span>
              <span>Premium Restaurant Template</span>
            </div>

            <h1
              className="font-montserrat text-5xl md:text-7xl font-bold tracking-tight mb-6"
              style={{ color: "var(--fg)" }}
            >
              Elite Diner
            </h1>

            <p
              className="font-montserrat text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--fg-70)" }}
            >
              A sophisticated restaurant website with AI-powered menu recommendations,
              semantic search, and seamless online ordering. Built for the modern fine dining experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://feature-elite-diner-template.asoudan-com.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.3)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                  boxShadow: "0 4px 20px rgba(0,241,241,0.15)",
                }}
              >
                View Live Demo →
              </a>

              <Link
                href="/buy"
                className="px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 border-2 hover:-translate-y-1"
                style={{
                  borderColor: "var(--border-card)",
                  color: "var(--fg)",
                  background: "var(--bg-surface)",
                }}
              >
                ← Back to Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Menu ────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-montserrat text-3xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--fg)" }}
            >
              Signature Dishes
            </h2>
            <p
              className="font-montserrat text-lg max-w-2xl mx-auto"
              style={{ color: "var(--fg-50)" }}
            >
              Experience our curated selection of premium dishes, each crafted with the finest ingredients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.15)]"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="font-montserrat text-xl font-bold"
                      style={{ color: "var(--fg)" }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="font-montserrat text-lg font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.price}
                    </span>
                  </div>

                  <p
                    className="font-montserrat text-sm mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.category}
                  </p>

                  <p
                    className="font-montserrat text-sm leading-relaxed"
                    style={{ color: "var(--fg-50)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--bg-tertiary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-montserrat text-3xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--fg)" }}
            >
              How It Works
            </h2>
            <p
              className="font-montserrat text-lg max-w-2xl mx-auto"
              style={{ color: "var(--fg-50)" }}
            >
              Three powerful AI features that transform your restaurant's online presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 font-montserrat font-bold text-xl"
                  style={{
                    background: "rgba(0,241,241,0.1)",
                    color: "var(--accent)",
                    border: "2px solid rgba(0,241,241,0.3)",
                  }}
                >
                  {step.step}
                </div>

                <h3
                  className="font-montserrat text-xl font-bold mb-3"
                  style={{ color: "var(--fg)" }}
                >
                  {step.title}
                </h3>

                <p
                  className="font-montserrat text-sm leading-relaxed"
                  style={{ color: "var(--fg-50)" }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Indicators ─────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-montserrat text-3xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--fg)" }}
            >
              Built for Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST.map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="font-montserrat text-3xl md:text-5xl font-bold mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {item.stat}
                </div>
                <div
                  className="font-montserrat text-sm uppercase tracking-wider"
                  style={{ color: "var(--fg-50)" }}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "var(--bg-tertiary)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-montserrat text-3xl md:text-5xl font-bold mb-6"
              style={{ color: "var(--fg)" }}
            >
              Ready to Elevate Your Restaurant?
            </h2>

            <p
              className="font-montserrat text-lg mb-8 leading-relaxed"
              style={{ color: "var(--fg-50)" }}
            >
              Get the complete Elite Diner template with full source code, customization guide, and lifetime updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://feature-elite-diner-template.asoudan-com.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,241,241,0.3)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                  boxShadow: "0 4px 20px rgba(0,241,241,0.15)",
                }}
              >
                Explore the Demo
              </a>

              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 border-2 hover:-translate-y-1"
                style={{
                  borderColor: "var(--border-card)",
                  color: "var(--fg)",
                  background: "var(--bg-surface)",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
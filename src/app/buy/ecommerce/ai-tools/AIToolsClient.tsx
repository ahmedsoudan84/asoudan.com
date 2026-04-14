"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";
import {
  OCCASION_BUNDLES,
  getBundleProducts,
  searchProducts,
  getChatReply,
} from "@/lib/ecommerce/smart-logic";
import { useCart } from "@/lib/ecommerce/cart-store";
import { getProductBySlug } from "@/lib/ecommerce/products";

type Tab = "stylist" | "search" | "bundles";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "stylist",
    label: "Stylist",
    icon: <EcomIcons.Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: "search",
    label: "Semantic search",
    icon: <EcomIcons.Search className="w-3.5 h-3.5" />,
  },
  {
    id: "bundles",
    label: "Occasion bundles",
    icon: <EcomIcons.Bag className="w-3.5 h-3.5" />,
  },
];

export default function AIToolsClient() {
  const [tab, setTab] = useState<Tab>("stylist");

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{
              background: "rgba(var(--accent-rgb), 0.12)",
              color: "var(--accent)",
            }}
          >
            <EcomIcons.Sparkles className="w-7 h-7" />
          </div>
          <h1
            className="font-montserrat text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            AI Stylist
          </h1>
          <p
            className="font-montserrat text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--fg-60)" }}
          >
            Three ways to let the AI do the narrowing-down for you. All
            deterministic, all on-device — no prompts leave your browser.
          </p>

          {/* Tabs */}
          <div
            className="inline-flex mt-10 p-1 rounded-2xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-card)",
            }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all"
                style={{
                  background: tab === t.id ? "var(--accent)" : "transparent",
                  color:
                    tab === t.id ? "var(--bg-primary)" : "var(--fg-60)",
                }}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <AnimatePresence mode="wait">
            {tab === "stylist" && <StylistPanel key="stylist" />}
            {tab === "search" && <SearchPanel key="search" />}
            {tab === "bundles" && <BundlesPanel key="bundles" />}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

/* ── Panels ──────────────────────────────────────────────── */

function StylistPanel() {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reply = useMemo(
    () => (submitted && prompt ? getChatReply(prompt) : null),
    [prompt, submitted]
  );
  const suggestions = reply?.suggestedSlugs
    ?.map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const addItem = useCart((s) => s.addItem);

  const examples = [
    "Housewarming gift for a minimalist friend, under £150",
    "Setting up a home office in a small flat",
    "Something cosy for the long winter evenings",
    "Weekend trip to Lisbon — what should I pack?",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div
        className="p-6 md:p-10 rounded-[2rem] border"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border-card)",
        }}
      >
        <label
          className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
          style={{ color: "var(--accent)" }}
        >
          Ask the stylist
        </label>
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setSubmitted(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) setSubmitted(true);
          }}
          placeholder="Tell me the occasion, vibe, or budget — I'll suggest three."
          className="w-full mt-4 px-5 py-5 rounded-2xl border outline-none resize-none min-h-[120px] font-montserrat text-base focus:border-accent transition-colors"
          style={{
            background: "var(--bg-primary)",
            borderColor: "var(--border-subtle)",
            color: "var(--fg)",
          }}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setPrompt(ex);
                setSubmitted(true);
              }}
              className="px-3 py-1.5 rounded-full border text-[11px] font-montserrat transition-all hover:border-accent hover:text-accent"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--fg-05)",
                color: "var(--fg-60)",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!prompt.trim()}
          className="mt-6 px-6 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all disabled:opacity-40 hover:scale-[1.02]"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          Get recommendations
        </button>
      </div>

      {reply && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-10 rounded-[2rem] border"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              <EcomIcons.Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p
                className="font-montserrat font-bold text-[10px] uppercase tracking-[2.5px]"
                style={{ color: "var(--accent)" }}
              >
                Stylist
              </p>
              <p
                className="font-montserrat text-base mt-2 leading-relaxed"
                style={{ color: "var(--fg)" }}
              >
                {reply.text}
              </p>
            </div>
          </div>

          {suggestions && suggestions.length > 0 && (
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {suggestions.map((p) => (
                <div
                  key={p.slug}
                  className="rounded-2xl border overflow-hidden group transition-all hover:-translate-y-1 hover:border-accent"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <Link
                    href={`/buy/ecommerce/shop/${p.slug}`}
                    className="block aspect-square overflow-hidden"
                    style={{ background: "var(--fg-05)" }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-4">
                    <p
                      className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {p.brand}
                    </p>
                    <Link
                      href={`/buy/ecommerce/shop/${p.slug}`}
                      className="font-montserrat font-bold text-sm mt-1 block group-hover:text-accent transition-colors"
                      style={{ color: "var(--fg)" }}
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className="font-montserrat font-bold text-sm"
                        style={{ color: "var(--accent)" }}
                      >
                        £{p.price}
                      </span>
                      <button
                        onClick={() => addItem(p)}
                        className="px-3 py-1.5 rounded-lg font-montserrat text-[10px] font-bold uppercase tracking-[1.5px] border transition-colors hover:border-accent hover:text-accent"
                        style={{
                          borderColor: "var(--border-subtle)",
                          color: "var(--fg-70)",
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function SearchPanel() {
  const [query, setQuery] = useState("something spicy under £150");
  const results = useMemo(() => searchProducts(query).slice(0, 9), [query]);
  const addItem = useCart((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div
        className="p-6 md:p-8 rounded-[2rem] border"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border-card)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "var(--bg-primary)" }}
        >
          <EcomIcons.Search
            className="w-5 h-5"
            style={{ color: "var(--fg-40)" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: cosy gifts under £200"
            className="flex-1 bg-transparent outline-none font-montserrat text-sm py-1"
            style={{ color: "var(--fg)" }}
          />
          <span
            className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
            style={{ color: "var(--fg-40)" }}
          >
            {results.length} results
          </span>
        </div>
        <p
          className="font-montserrat text-xs mt-4"
          style={{ color: "var(--fg-50)" }}
        >
          The search understands synonyms and price ranges — try{" "}
          <em>&quot;minimal audio under £300&quot;</em>.
        </p>
      </div>

      {results.length === 0 ? (
        <div
          className="text-center py-20 rounded-[2rem] border"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <p
            className="font-montserrat font-bold"
            style={{ color: "var(--fg)" }}
          >
            Nothing matches.
          </p>
          <p
            className="font-montserrat text-sm mt-2"
            style={{ color: "var(--fg-50)" }}
          >
            Broaden the phrasing or drop the price cap.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {results.map((p) => (
            <div
              key={p.slug}
              className="group rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 hover:border-accent"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <Link
                href={`/buy/ecommerce/shop/${p.slug}`}
                className="block aspect-square overflow-hidden"
                style={{ background: "var(--fg-05)" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <p
                  className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                  style={{ color: "var(--fg-40)" }}
                >
                  {p.brand}
                </p>
                <Link
                  href={`/buy/ecommerce/shop/${p.slug}`}
                  className="font-montserrat font-bold text-sm mt-1 block group-hover:text-accent transition-colors"
                  style={{ color: "var(--fg)" }}
                >
                  {p.name}
                </Link>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className="font-montserrat font-bold text-sm"
                    style={{ color: "var(--accent)" }}
                  >
                    £{p.price}
                  </span>
                  <button
                    onClick={() => addItem(p)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: "rgba(var(--accent-rgb), 0.1)",
                      color: "var(--accent)",
                    }}
                    aria-label="Add"
                  >
                    <EcomIcons.Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function BundlesPanel() {
  const [activeBundleId, setActiveBundleId] = useState(OCCASION_BUNDLES[0].id);
  const bundle = OCCASION_BUNDLES.find((b) => b.id === activeBundleId)!;
  const bundleProducts = getBundleProducts(bundle);
  const total = bundleProducts.reduce((s, p) => s + p.price, 0);
  const bundlePrice = Math.round(total * 0.92 * 100) / 100;
  const addItem = useCart((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {OCCASION_BUNDLES.map((b) => {
          const active = b.id === activeBundleId;
          return (
            <button
              key={b.id}
              onClick={() => setActiveBundleId(b.id)}
              className="text-left p-5 rounded-2xl border transition-all"
              style={{
                background: active ? "var(--accent)" : "var(--bg-surface)",
                borderColor: active ? "var(--accent)" : "var(--border-subtle)",
                color: active ? "var(--bg-primary)" : "var(--fg)",
              }}
            >
              <span
                className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                style={{ color: active ? "var(--bg-primary)" : "var(--fg-40)" }}
              >
                {b.productSlugs.length} pieces
              </span>
              <h3 className="font-montserrat text-base font-bold mt-1">
                {b.title}
              </h3>
            </button>
          );
        })}
      </div>

      <motion.div
        key={bundle.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 md:p-12 rounded-[2.5rem] border"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border-card)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span
              className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              Curated bundle
            </span>
            <h2
              className="font-montserrat text-3xl md:text-4xl font-black mt-2 tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              {bundle.title}
            </h2>
            <p
              className="font-montserrat text-sm md:text-base mt-3 max-w-lg leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              {bundle.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div
              className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
              style={{ color: "var(--fg-40)" }}
            >
              Bundle price · save 8%
            </div>
            <div className="flex items-baseline gap-2 justify-end mt-1">
              <span
                className="font-montserrat text-4xl font-black"
                style={{ color: "var(--fg)" }}
              >
                £{bundlePrice.toLocaleString()}
              </span>
              <span
                className="font-montserrat text-lg line-through"
                style={{ color: "var(--fg-40)" }}
              >
                £{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {bundleProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/buy/ecommerce/shop/${p.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl border group transition-all hover:border-accent"
              style={{
                background: "var(--bg-primary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div
                className="w-16 h-16 rounded-xl overflow-hidden shrink-0"
                style={{ background: "var(--fg-05)" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                  style={{ color: "var(--fg-40)" }}
                >
                  {p.brand}
                </p>
                <p
                  className="font-montserrat font-bold text-sm truncate group-hover:text-accent transition-colors"
                  style={{ color: "var(--fg)" }}
                >
                  {p.name}
                </p>
              </div>
              <span
                className="font-montserrat font-bold text-sm shrink-0"
                style={{ color: "var(--accent)" }}
              >
                £{p.price}
              </span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => bundleProducts.forEach((p) => addItem(p))}
          className="mt-10 w-full md:w-auto px-8 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          <EcomIcons.Bag className="w-4 h-4" />
          Add entire bundle — £{bundlePrice.toLocaleString()}
        </button>
      </motion.div>
    </motion.div>
  );
}

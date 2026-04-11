"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { menuItems, categories, MenuItem } from "@/lib/restaurant/menu";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import { Search, SlidersHorizontal, X, ChevronDown, Leaf, Sprout, WheatOff, Flame, ChefHat, Plus, Sparkles } from "lucide-react";

const DIETARY_ICONS: Record<string, React.ReactNode> = {
  vegetarian: <Leaf size={12} />,
  vegan: <Sprout size={12} />,
  "gluten-free": <WheatOff size={12} />,
  spicy: <Flame size={12} />,
  "chef-special": <ChefHat size={12} />,
};

export default function MenuClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");

  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    if (activeCategory !== "all") {
      items = items.filter(item => item.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    if (selectedTags.length > 0) {
      items = items.filter(item =>
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }

    if (sortBy === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    } else {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [activeCategory, searchQuery, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      {/* Header */}
      <section className="pt-28 pb-8 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto">
          <Link href="/buy/restaurant" className="text-sm font-montserrat" style={{ color: "var(--fg-50)" }}>
            ← Back to Elite Diner
          </Link>
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-4" style={{ color: "var(--fg)" }}>
            Our Menu
          </h1>
          <p className="mt-2" style={{ color: "var(--fg-50)" }}>
            Explore our curated selection of dishes, crafted with passion
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 px-6 py-4" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "var(--fg-40)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl font-montserrat text-sm"
                style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className="px-4 py-2 rounded-full text-sm font-montserrat uppercase tracking-wider transition-colors"
                style={{
                  background: activeCategory === "all" ? "#fbbf24" : "var(--bg-secondary)",
                  color: activeCategory === "all" ? "#000" : "var(--fg)",
                }}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-full text-sm font-montserrat uppercase tracking-wider transition-colors"
                  style={{
                    background: activeCategory === cat.id ? "#fbbf24" : "var(--bg-secondary)",
                    color: activeCategory === cat.id ? "#000" : "var(--fg)",
                  }}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 rounded-xl font-montserrat text-sm"
              style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Dietary Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["vegetarian", "vegan", "gluten-free", "spicy", "chef-special"].map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-montserrat uppercase tracking-wider transition-colors"
                style={{
                  background: selectedTags.includes(tag) ? "rgba(251, 191, 36, 0.2)" : "var(--bg-secondary)",
                  color: selectedTags.includes(tag) ? "#fbbf24" : "var(--fg-60)",
                  border: selectedTags.includes(tag) ? "1px solid rgba(251, 191, 36, 0.5)" : "1px solid var(--border-subtle)",
                }}
              >
                {DIETARY_ICONS[tag]}
                {tag.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-montserrat text-lg" style={{ color: "var(--fg-50)" }}>
                No dishes match your filters. Try different criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="group rounded-xl overflow-hidden"
                  style={{ background: "var(--bg-surface)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-montserrat uppercase tracking-wider"
                          style={{
                            background: tag === "chef-special" ? "#fbbf24" : "rgba(255,255,255,0.2)",
                            color: tag === "chef-special" ? "#000" : "#fff",
                          }}
                        >
                          {DIETARY_ICONS[tag]}
                          {tag.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-montserrat font-semibold text-lg" style={{ color: "var(--fg)" }}>
                        {item.name}
                      </h3>
                      <span className="font-montserrat font-bold text-xl" style={{ color: "#fbbf24" }}>
                        £{item.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2" style={{ color: "var(--fg-50)" }}>
                      {item.description}
                    </p>
                    {item.pairing && (
                      <p className="mt-2 text-xs" style={{ color: "var(--fg-40)" }}>
                        Pair with: {item.pairing}
                      </p>
                    )}
                    <Link
                      href="/buy/restaurant/order"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-montserrat font-semibold uppercase tracking-wider transition-all hover:scale-105"
                      style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}
                    >
                      <Plus size={16} /> Add to Order
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/buy/restaurant/ai-tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{ border: "1px solid #fbbf24", color: "#fbbf24" }}
            >
              <Sparkles size={18} /> Try AI Recommender
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
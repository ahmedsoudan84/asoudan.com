"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuItem } from "@/lib/restaurant/menu";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import {
  Flame, Leaf, Sprout, WheatOff, ChevronRight,
  Star, MapPin, Clock, Phone, Mail,
  ChefHat, Utensils, Wine, Calendar, ShoppingBag,
  Sparkles, X, Plus, Minus, Heart
} from "lucide-react";

const AI_QUICK_PROMPTS = [
  { label: "Something spicy 🌶️", query: "spicy" },
  { label: "Vegetarian 🌿", query: "vegetarian" },
  { label: "Light option 💨", query: "light" },
  { label: "Chef's pick ⭐", query: "chef-special" },
  { label: "Date night 💕", query: "romantic" },
];

const TRUST = [
  { stat: "28", label: "Menu Items" },
  { stat: "6", label: "AI Features" },
  { stat: "0", label: "API Keys" },
  { stat: "100%", label: "Client-Side" },
];

const FEATURED_DISHES = menuItems.filter(d => d.tags.includes("popular") || d.tags.includes("chef-special")).slice(0, 4);

const SPECIAL_DISH = menuItems.find(d => d.tags.includes("chef-special") && d.category === "mains");

const OPENING_HOURS = [
  { day: "Monday - Thursday", hours: "5pm - 11pm" },
  { day: "Friday - Saturday", hours: "5pm - 12am" },
  { day: "Sunday", hours: "12pm - 10pm" },
];

const getTagIcon = (tag: string) => {
  switch (tag) {
    case "vegetarian": return <Leaf size={12} />;
    case "vegan": return <Sprout size={12} />;
    case "gluten-free": return <WheatOff size={12} />;
    case "spicy": return <Flame size={12} />;
    case "chef-special": return <ChefHat size={12} />;
    default: return null;
  }
};

export default function RestaurantClient() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [showRecs, setShowRecs] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleAISearch = async (searchQuery: string) => {
    setAiLoading(true);
    setQuery(searchQuery);
    await new Promise(r => setTimeout(r, 800));
    const q = searchQuery.toLowerCase();
    const filtered = menuItems.filter(item => {
      if (q.includes("spicy") && item.tags.includes("spicy")) return true;
      if ((q.includes("vegetarian") || q.includes("vegan")) && (item.tags.includes("vegetarian") || item.tags.includes("vegan"))) return true;
      if (q.includes("light") && item.tags.includes("light")) return true;
      if (q.includes("chef") && item.tags.includes("chef-special")) return true;
      if (q.includes("romantic") || q.includes("date")) {
        return item.price > 20 && item.price < 60;
      }
      if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) return true;
      return false;
    }).slice(0, 6);
    setRecommendations(filtered);
    setAiLoading(false);
    setShowRecs(true);
  };

  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: "110%",
              }}
              animate={{
                y: "-10%",
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
              style={{
                left: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 pt-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{
                background: "rgba(251, 191, 36, 0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(251, 191, 36, 0.3)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={14} />
              AI-Powered Dining
            </motion.span>
          </motion.div>

          <motion.h1
            className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-bold text-white mt-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Elite Diner
          </motion.h1>

          <motion.p
            className="font-montserrat text-lg md:text-xl text-white/80 mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fine dining elevated with intelligent recommendations
          </motion.p>

          {/* AI Search Bar */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="flex items-center gap-3 p-4 md:p-5">
                <Sparkles className="text-amber-400 flex-shrink-0" size={22} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAISearch(query)}
                  placeholder="Describe what you'd like... (e.g., 'spicy vegetarian for date night')"
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none font-montserrat text-lg"
                />
                <button
                  onClick={() => handleAISearch(query)}
                  className="px-6 py-2.5 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "#fbbf24",
                    color: "#000",
                  }}
                >
                  Find
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {AI_QUICK_PROMPTS.map((prompt, i) => (
                <motion.button
                  key={prompt.query}
                  onClick={() => handleAISearch(prompt.query)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {prompt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/buy/restaurant/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-montserrat text-base font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              style={{
                background: "rgba(251, 191, 36, 0.9)",
                color: "#000",
              }}
            >
              <Calendar size={20} />
              Book a Table
            </Link>
            <Link
              href="/buy/restaurant/order"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-montserrat text-base font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <ShoppingBag size={20} />
              Order Delivery
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* AI Recommendations Modal */}
      <AnimatePresence>
        {showRecs && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRecs(false)}
          >
            <div className="absolute inset-0 bg-black/80" />
            <motion.div
              className="relative max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6 md:p-8"
              style={{ background: "var(--bg-surface)" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowRecs(false)}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                style={{ background: "var(--bg-tertiary)", color: "var(--fg-50)" }}
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-[0.2em] uppercase" style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}>
                  <Sparkles size={14} /> AI Recommendations
                </span>
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold mt-4" style={{ color: "var(--fg)" }}>
                  {query ? `Based on "${query}"` : "Personalized for You"}
                </h2>
              </div>

              {aiLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="mt-4 font-montserrat" style={{ color: "var(--fg-50)" }}>
                      AI is thinking...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((item, i) => (
                    <motion.div
                      key={item.id}
                      className="group relative rounded-xl overflow-hidden"
                      style={{ background: "var(--bg-secondary)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
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
                              className="px-2 py-0.5 rounded text-[10px] font-montserrat uppercase tracking-wider"
                              style={{ background: tag === "chef-special" ? "#fbbf24" : "rgba(255,255,255,0.2)", color: tag === "chef-special" ? "#000" : "#fff" }}
                            >
                              {tag.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>{item.name}</h3>
                        <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--fg-50)" }}>{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-montserrat font-bold text-lg" style={{ color: "#fbbf24" }}>£{item.price}</span>
                          <Link
                            href="/buy/restaurant/order"
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                            style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}
                          >
                            Add
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {recommendations.length === 0 && !aiLoading && (
                <div className="text-center py-12">
                  <p className="font-montserrat text-lg" style={{ color: "var(--fg-50)" }}>
                    No dishes found. Try a different search term!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chef's Special Section */}
      {SPECIAL_DISH && (
        <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-[0.2em] uppercase" style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}>
                <ChefHat size={14} /> Chef's Signature
              </span>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mt-4" style={{ color: "var(--fg)" }}>
                Today's Featured Dish
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src={SPECIAL_DISH.image}
                  alt={SPECIAL_DISH.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex px-2 py-1 rounded text-xs font-montserrat uppercase tracking-wider" style={{ background: "#fbbf24", color: "#000" }}>
                    Chef's Special
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold" style={{ color: "var(--fg)" }}>
                  {SPECIAL_DISH.name}
                </h3>
                <p className="mt-4" style={{ color: "var(--fg-50)" }}>
                  {SPECIAL_DISH.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {SPECIAL_DISH.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-montserrat uppercase tracking-wider"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg-70)" }}
                    >
                      {getTagIcon(tag)}
                      {tag.replace("-", " ")}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <span className="font-montserrat text-3xl font-bold" style={{ color: "#fbbf24" }}>
                    £{SPECIAL_DISH.price}
                  </span>
                  {SPECIAL_DISH.pairing && (
                    <span className="flex items-center gap-2 text-sm" style={{ color: "var(--fg-50)" }}>
                      <Wine size={16} /> Pair with {SPECIAL_DISH.pairing}
                    </span>
                  )}
                </div>
                <Link
                  href="/buy/restaurant/order"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                  style={{ background: "#fbbf24", color: "#000" }}
                >
                  <Plus size={18} /> Add to Order
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Dishes */}
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold" style={{ color: "var(--fg)" }}>
              Customer Favourites
            </h2>
            <p className="mt-3" style={{ color: "var(--fg-50)" }}>
              Dishes our guests keep coming back for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_DISHES.map((dish, i) => (
              <motion.div
                key={dish.id}
                className="group rounded-xl overflow-hidden"
                style={{ background: "var(--bg-surface)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {dish.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-montserrat uppercase"
                        style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                      >
                        {tag.slice(0, 8)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>{dish.name}</h3>
                  <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--fg-50)" }}>{dish.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-montserrat font-bold" style={{ color: "#fbbf24" }}>£{dish.price}</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--fg-40)" }}>
                      <Star size={12} className="fill-current" /> Popular
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/buy/restaurant/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{ border: "1px solid var(--border-card)", color: "var(--fg)" }}
            >
              View Full Menu <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center" style={{ color: "var(--fg)" }}>
            Why Elite Diner?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: Sparkles, title: "AI Recommender", desc: "Describe what you crave — get instant personal dish suggestions." },
              { icon: ChefHat, title: "Curated Pairings", desc: "Wine and dish pairings suggested by AI for your preferences." },
              { icon: Utensils, title: "Easy Ordering", desc: "Order delivery or book a table in seconds. No fuss." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center p-6 rounded-xl"
                style={{ background: "var(--bg-surface)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(251, 191, 36, 0.15)" }}>
                  <item.icon size={24} style={{ color: "#fbbf24" }} />
                </div>
                <h3 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>{item.title}</h3>
                <p className="text-sm mt-2" style={{ color: "var(--fg-50)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-12">
            {TRUST.map((item, i) => (
              <motion.div
                key={item.label}
                className="text-center p-4 rounded-xl"
                style={{ background: "var(--bg-primary)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-montserrat text-2xl md:text-3xl font-bold" style={{ color: "#fbbf24" }}>
                  {item.stat}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--fg-50)" }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>Location</h3>
              <div className="flex items-start gap-2 mt-3 text-sm" style={{ color: "var(--fg-50)" }}>
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>123 Culinary Lane<br />Soho, London W1D 3PS<br />United Kingdom</span>
              </div>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>Opening Hours</h3>
              <div className="mt-3 space-y-1 text-sm" style={{ color: "var(--fg-50)" }}>
                {OPENING_HOURS.map(h => (
                  <div key={h.day} className="flex justify-between">
                    <span>{h.day}</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>Contact</h3>
              <div className="mt-3 space-y-2 text-sm" style={{ color: "var(--fg-50)" }}>
                <div className="flex items-center gap-2">
                  <Phone size={16} /> +44 20 7123 4567
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} /> hello@elitediner.co.uk
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 mt-8" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <p className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>
              © 2024 Elite Diner Template. Crafted for asoudan.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
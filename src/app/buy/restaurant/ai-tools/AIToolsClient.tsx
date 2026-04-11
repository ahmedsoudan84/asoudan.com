"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuItem } from "@/lib/restaurant/menu";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import {
  Sparkles, Search, MessageCircle, Leaf, X, Send, ChevronRight,
  Sparkle, Filter, PenLine, Wine, Users, Calendar, ShoppingBag, Plus
} from "lucide-react";

const AI_FEATURES = [
  {
    id: "recommender",
    icon: Sparkles,
    title: "AI Menu Recommender",
    description: "Describe your mood, dietary needs, or budget — get instant personalized dish suggestions.",
  },
  {
    id: "chatbot",
    icon: MessageCircle,
    title: "AI Restaurant Assistant",
    description: "Ask about menu items, wine pairings, dietary needs. Get instant answers 24/7.",
  },
  {
    id: "search",
    icon: Search,
    title: "Smart Dietary Filter",
    description: "Natural language search like 'gluten-free pasta with seafood' — instant results.",
  },
  {
    id: "optimizer",
    icon: PenLine,
    title: "AI Description Optimizer",
    description: "Paste rough dish notes — get SEO-rich, mouthwatering menu descriptions.",
  },
  {
    id: "pairing",
    icon: Wine,
    title: "AI Wine Pairing",
    description: "Tell us your main — get wine suggestions that complement perfectly.",
  },
  {
    id: "occasion",
    icon: Users,
    title: "AI Occasion Helper",
    description: "Romantic dinner? Family Sunday? Get curated menus for any occasion.",
  },
];

export default function AIToolsClient() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{role: string; content: string}[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [menuNotes, setMenuNotes] = useState("");
  const [optimizedDesc, setOptimizedDesc] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const q = query.toLowerCase();
    const filtered = menuItems.filter(item => {
      if (q.includes("vegetarian") && item.tags.includes("vegetarian")) return true;
      if (q.includes("vegan") && item.tags.includes("vegan")) return true;
      if (q.includes("gluten") && item.tags.includes("gluten-free")) return true;
      if (q.includes("spicy") && item.tags.includes("spicy")) return true;
      if (q.includes("seafood") || q.includes("fish")) return item.category === "mains" && item.name.toLowerCase().includes("bass");
      if (q.includes("beef") || q.includes("steak")) return item.name.toLowerCase().includes("ribeye");
      if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) return true;
      return false;
    }).slice(0, 6);
    setResults(filtered);
    setLoading(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setConversation(prev => [...prev, { role: "user", content: userMsg }]);

    await new Promise(r => setTimeout(r, 1000));
    let response = "I'd be happy to help with that! For a romantic date night, I'd recommend our Dry-Aged Ribeye with the Chef's Special 2019 Bordeaux pairing. Would you like me to add the recommended starter to your order?";

    if (userMsg.toLowerCase().includes("wine")) {
      response = "For that dish, I'd recommend our Côtes du Rhône — full-bodied with dark fruit notes that complement the rich flavors perfectly. Or for something lighter, our Chablis works beautifully with seafood.";
    } else if (userMsg.toLowerCase().includes("vegetarian")) {
      response = "Our Mushroom Risotto is a guest favourite! Wild forest mushrooms, aged parmesan, and truffle shavings. Pairs wonderfully with our Pinot Noir.";
    }

    setConversation(prev => [...prev, { role: "assistant", content: response }]);
  };

  const handleOptimize = async () => {
    if (!menuNotes.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setOptimizedDesc(
      "Tender British rump slow-roasted to perfection, served alongside rosemary-infused golden potatoes, seasonal greens, and a rich gravy made from our signature reduction. Grass-fed for exceptional depth of flavor — a classic reimagined."
    );
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      <section className="pt-28 pb-8 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/buy/restaurant" className="text-sm font-montserrat" style={{ color: "var(--fg-50)" }}>
            ← Back to Elite Diner
          </Link>
          <div className="flex items-center gap-2 mt-4">
            <Sparkles size={32} style={{ color: "#fbbf24" }} />
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold" style={{ color: "var(--fg)" }}>
              AI Features
            </h1>
          </div>
          <p className="mt-2 text-lg" style={{ color: "var(--fg-50)" }}>
            Try our intelligent features — all running 100% client-side, no API keys needed.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_FEATURES.map((feature, i) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className="p-6 rounded-xl text-left transition-all"
                style={{ background: "var(--bg-surface)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <feature.icon size={24} style={{ color: "#fbbf24" }} />
                <h3 className="font-montserrat font-semibold mt-3" style={{ color: "var(--fg)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm mt-2" style={{ color: "var(--fg-50)" }}>
                  {feature.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Demos */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFeature(null)}
          >
            <div className="absolute inset-0 bg-black/80" />
            <motion.div
              className="relative max-w-2xl w-full my-8 p-6 rounded-2xl max-h-[80vh] overflow-y-auto"
              style={{ background: "var(--bg-surface)" }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveFeature(null)}
                className="absolute top-4 right-4 p-2 rounded-full"
                style={{ background: "var(--bg-tertiary)" }}
              >
                <X size={20} />
              </button>

              {activeFeature === "recommender" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={20} style={{ color: "#fbbf24" }} />
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      AI Menu Recommender
                    </h2>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--fg-50)" }}>
                    Describe what you're in the mood for...
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSearch()}
                      placeholder="e.g., spicy vegetarian for date night under £25"
                      className="flex-1 px-4 py-3 rounded-xl font-montserrat"
                      style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-3 rounded-xl font-montserrat text-sm font-semibold"
                      style={{ background: "#fbbf24", color: "#000" }}
                    >
                      Search
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-2 flex-wrap">
                      {["Something spicy", "Vegetarian", "Light option", "Chef's pick", "Date night"].map(q => (
                        <button
                          key={q}
                          onClick={() => { setQuery(q); handleSearch(); }}
                          className="px-3 py-1 rounded-full text-xs font-montserrat"
                          style={{ background: "var(--bg-tertiary)", color: "var(--fg-60)" }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  {loading ? (
                    <div className="py-12 text-center">
                      <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm mt-2" style={{ color: "var(--fg-50)" }}>AI is thinking...</p>
                    </div>
                  ) : results.length > 0 && (
                    <div className="mt-6 grid gap-4">
                      {results.map(item => (
                        <div key={item.id} className="flex gap-4 p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>{item.name}</h4>
                            <p className="text-xs" style={{ color: "var(--fg-50)" }}>£{item.price}</p>
                          </div>
                          <Link
                            href="/buy/restaurant/order"
                            className="px-3 py-1 rounded-lg text-xs font-semibold self-center"
                            style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}
                          >
                            <Plus size={14} /> Add
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeFeature === "chatbot" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle size={20} style={{ color: "#fbbf24" }} />
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      AI Restaurant Assistant
                    </h2>
                  </div>
                  <div className="h-64 overflow-y-auto space-y-3 mb-4">
                    {conversation.length === 0 && (
                      <p className="text-sm text-center py-8" style={{ color: "var(--fg-40)" }}>
                        Ask me anything about the menu, wine pairings, or dietary options!
                      </p>
                    )}
                    {conversation.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl text-sm ${
                          msg.role === "user" ? "ml-8" : "mr-8"
                        }`}
                        style={{
                          background: msg.role === "user" ? "rgba(251, 191, 36, 0.15)" : "var(--bg-secondary)",
                          color: "var(--fg)",
                        }}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleChat()}
                      placeholder="Ask about menu, wine, dietary needs..."
                      className="flex-1 px-4 py-3 rounded-xl font-montserrat"
                      style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                    <button
                      onClick={handleChat}
                      className="px-4 py-3 rounded-xl"
                      style={{ background: "#fbbf24", color: "#000" }}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </>
              )}

              {activeFeature === "search" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Search size={20} style={{ color: "#fbbf24" }} />
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      Smart Dietary Search
                    </h2>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--fg-50)" }}>
                    Try natural language queries...
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {["gluten-free pasta", "vegan starters", "spicy mains", "seafood under £20"].map(q => (
                      <button
                        key={q}
                        onClick={() => { setQuery(q); handleSearch(); }}
                        className="px-3 py-1 rounded-full text-xs font-montserrat"
                        style={{ background: "var(--bg-tertiary)", color: "var(--fg-60)" }}
                      >
                        "{q}"
                      </button>
                    ))}
                  </div>
                  {results.length > 0 && (
                    <div className="grid gap-2">
                      {results.map(item => (
                        <div key={item.id} className="flex justify-between p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                          <span style={{ color: "var(--fg)" }}>{item.name}</span>
                          <span style={{ color: "#fbbf24" }}>£{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeFeature === "optimizer" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <PenLine size={20} style={{ color: "#fbbf24" }} />
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      AI Description Optimizer
                    </h2>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--fg-50)" }}>
                    Paste rough dish notes — get SEO-rich descriptions...
                  </p>
                  <textarea
                    value={menuNotes}
                    onChange={e => setMenuNotes(e.target.value)}
                    placeholder="e.g., lamb rump with rosemary potatoes and greens"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl font-montserrat mb-3"
                    style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                  />
                  <button
                    onClick={handleOptimize}
                    className="w-full py-3 rounded-xl font-montserrat text-sm font-semibold"
                    style={{ background: "#fbbf24", color: "#000" }}
                  >
                    Optimize Description
                  </button>
                  {optimizedDesc && (
                    <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                      <p style={{ color: "var(--fg)" }}>{optimizedDesc}</p>
                    </div>
                  )}
                </>
              )}

              {activeFeature === "pairing" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Wine size={20} style={{ color: "#fbbf24" }} />
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      AI Wine Pairing
                    </h2>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--fg-50)" }}>
                    What are you eating? Let's find the perfect wine...
                  </p>
                  <div className="space-y-3">
                    {[
                      { dish: "Dry-Aged Ribeye", wine: "Cabernet Sauvignon, 2018" },
                      { dish: "Roasted Sea Bass", wine: "Chablis, 2022" },
                      { dish: "Mushroom Risotto", wine: "Pinot Noir" },
                      { dish: "Duck Confit", wine: "Pinot Noir" },
                    ].map(pair => (
                      <button
                        key={pair.dish}
                        className="w-full p-4 rounded-xl text-left flex justify-between"
                        style={{ background: "var(--bg-secondary)" }}
                      >
                        <span style={{ color: "var(--fg)" }}>{pair.dish}</span>
                        <span style={{ color: "#fbbf24" }}>→ {pair.wine}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeFeature === "occasion" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={20} style={{ color: "#fbbf24" }} />
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      AI Occasion Helper
                    </h2>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--fg-50)" }}>
                    What's the occasion?
                  </p>
                  <div className="space-y-3">
                    {[
                      { occ: "Date Night", items: "Seared Scallops → Dry-Aged Ribeye → Dark Chocolate Fondant", wine: "Champagne" },
                      { occ: "Family Sunday", items: "Heritage Carrots → Herb-Crusted Lamb → Sticky Toffee", wine: "Côtes du Rhône" },
                      { occ: "Business Dinner", items: "Burrata → Duck Confit → Cheese Selection", wine: "Bordeaux" },
                      { occ: "Celebration", items: "Chef's Specials + Champagne", wine: "Billecart-Salmon" },
                    ].map(o => (
                      <div
                        key={o.occ}
                        className="p-4 rounded-xl"
                        style={{ background: "var(--bg-secondary)" }}
                      >
                        <h4 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>{o.occ}</h4>
                        <p className="text-xs mt-1" style={{ color: "var(--fg-50)" }}>{o.items}</p>
                        <p className="text-xs" style={{ color: "#fbbf24" }}>Wine: {o.wine}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
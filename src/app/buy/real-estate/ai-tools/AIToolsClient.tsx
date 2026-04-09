"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { properties } from "@/lib/real-estate/properties";
import { generateAreaSummary, calculateWalkScore, walkScoreLabel } from "@/lib/real-estate/smart-logic";

const DEMO_QUERIES = [
  "family home near outstanding schools",
  "warehouse conversion with high ceilings",
  "riverside apartment with views",
  "quiet village house with garden",
  "modern penthouse central London",
];

const CHATBOT_RESPONSES: Record<string, string> = {
  default:
    "Hello! I'm the AI Estate assistant. I can help you find properties, answer questions about listings, or provide area insights. Try asking me about a specific property or neighbourhood!",
  price:
    "Our properties range from £650,000 for a Greenwich flat to £2,450,000 for a Chelsea mews house. The average listing price is around £1.4M. Would you like me to filter by your budget?",
  schools:
    "Several of our properties are near Outstanding-rated schools. The Islington townhouse is 0.2mi from Canonbury Primary (Outstanding), and the Clapham family home is near both Clapham Manor Primary and La Retraite RC School, both rated Outstanding.",
  transport:
    "All our properties are within 0.6mi of a tube or rail station. The best-connected are Canary Wharf (0.2mi) and Hackney Central (0.2mi). Most commutes to Bank are under 25 minutes total.",
  garden:
    "Properties with gardens include the Islington Georgian Townhouse (south-facing garden), Clapham Victorian Family Home (60ft south-facing garden), and Notting Hill Garden Flat (private west-facing garden).",
};

function getChatResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("afford"))
    return CHATBOT_RESPONSES.price;
  if (q.includes("school") || q.includes("education") || q.includes("children") || q.includes("family"))
    return CHATBOT_RESPONSES.schools;
  if (q.includes("transport") || q.includes("tube") || q.includes("commute") || q.includes("station"))
    return CHATBOT_RESPONSES.transport;
  if (q.includes("garden") || q.includes("outdoor") || q.includes("green") || q.includes("park"))
    return CHATBOT_RESPONSES.garden;
  return CHATBOT_RESPONSES.default;
}

export default function AIToolsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof properties>([]);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: CHATBOT_RESPONSES.default },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const words = q.split(/\s+/);

    const scored = properties.map((p) => {
      const text =
        `${p.title} ${p.description} ${p.borough} ${p.type} ${p.features.join(" ")} ${p.nearbySchools.map((s) => `${s.name} ${s.rating}`).join(" ")} ${p.nearbyAmenities.map((a) => `${a.name} ${a.type}`).join(" ")}`.toLowerCase();

      let score = 0;
      for (const word of words) {
        if (text.includes(word)) score++;
      }
      return { property: p, score };
    });

    const results = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.property);

    setSearchResults(results);
  };

  const handleChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Simulate delay
    setTimeout(() => {
      const response = getChatResponse(userMsg);
      setChatMessages((prev) => [...prev, { role: "assistant", text: response }]);
    }, 500);
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="pt-16 pb-12 px-6 lg:px-12 text-center">
        <div className="max-w-[800px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-montserrat uppercase tracking-[3px] font-semibold mb-6"
              style={{
                background: "rgba(0,241,241,0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(0,241,241,0.2)",
              }}
            >
              AI Features Playground
            </span>
            <h1 className="font-montserrat text-3xl md:text-5xl font-bold" style={{ color: "var(--fg)" }}>
              Try the AI Features
            </h1>
            <p className="font-montserrat text-sm mt-4" style={{ color: "var(--fg-50)" }}>
              All features run client-side — no API keys, no server, no cost.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-20 space-y-16">
        {/* ── Semantic Search Demo ─────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--accent)" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
              Semantic Search
            </h2>
          </div>
          <p className="font-montserrat text-sm mb-6" style={{ color: "var(--fg-50)" }}>
            Search using natural language — the engine understands intent beyond keywords.
          </p>

          {/* Quick queries */}
          <div className="flex flex-wrap gap-2 mb-4">
            {DEMO_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => { setSearchQuery(q); }}
                className="px-3 py-1.5 rounded-full text-[11px] font-montserrat transition-all hover:-translate-y-0.5"
                style={{ background: "var(--fg-06)", color: "var(--fg-50)", border: "1px solid var(--border-subtle)" }}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Describe your ideal property..."
              className="flex-1 px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
              style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-6 space-y-3">
              <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                {searchResults.length} results found
              </p>
              {searchResults.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ background: "var(--fg-06)" }}
                >
                  <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-sm font-semibold truncate" style={{ color: "var(--fg)" }}>
                      {p.title}
                    </p>
                    <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                      {p.priceLabel} &middot; {p.beds} bed &middot; {p.borough}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* ── AI Chatbot Demo ─────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--accent)" }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
              AI Chatbot
            </h2>
          </div>
          <p className="font-montserrat text-sm mb-6" style={{ color: "var(--fg-50)" }}>
            Context-aware assistant that knows your property details. Try asking about prices, schools, transport, or gardens.
          </p>

          {/* Messages */}
          <div
            className="h-64 overflow-y-auto rounded-xl p-4 mb-4 space-y-3"
            style={{ background: "var(--bg-tertiary)" }}
          >
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl font-montserrat text-sm"
                  style={{
                    background: msg.role === "user" ? "var(--accent)" : "var(--bg-surface)",
                    color: msg.role === "user" ? "var(--bg-primary)" : "var(--fg-70)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Ask about properties, schools, transport..."
              className="flex-1 px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
              style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
            />
            <button
              onClick={handleChat}
              className="px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Send
            </button>
          </div>
        </motion.section>

        {/* ── Area Insights Demo ──────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--accent)" }}>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
              AI Area Insights
            </h2>
          </div>
          <p className="font-montserrat text-sm mb-6" style={{ color: "var(--fg-50)" }}>
            Auto-generated neighbourhood summaries from structured data. Select a property to see its area profile.
          </p>

          {/* Property selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {properties.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedProperty(p)}
                className="px-3 py-1.5 rounded-full text-[11px] font-montserrat transition-all"
                style={{
                  background: selectedProperty.slug === p.slug ? "var(--accent)" : "var(--fg-06)",
                  color: selectedProperty.slug === p.slug ? "var(--bg-primary)" : "var(--fg-50)",
                }}
              >
                {p.borough}
              </button>
            ))}
          </div>

          {/* Result */}
          <div className="p-6 rounded-xl" style={{ background: "var(--bg-tertiary)" }}>
            <h3 className="font-montserrat text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>
              {selectedProperty.title}
            </h3>

            <p className="font-montserrat text-sm leading-relaxed mb-4" style={{ color: "var(--fg-60)" }}>
              {generateAreaSummary(selectedProperty)}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg" style={{ background: "var(--fg-06)" }}>
                <div className="font-montserrat text-xl font-bold" style={{ color: "var(--accent)" }}>
                  {calculateWalkScore(selectedProperty)}
                </div>
                <div className="font-montserrat text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-40)" }}>
                  Walk Score
                </div>
                <div className="font-montserrat text-[10px] mt-0.5" style={{ color: "var(--fg-30)" }}>
                  {walkScoreLabel(calculateWalkScore(selectedProperty))}
                </div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: "var(--fg-06)" }}>
                <div className="font-montserrat text-xl font-bold" style={{ color: "var(--accent)" }}>
                  {selectedProperty.nearbySchools.length}
                </div>
                <div className="font-montserrat text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-40)" }}>
                  Nearby Schools
                </div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: "var(--fg-06)" }}>
                <div className="font-montserrat text-xl font-bold" style={{ color: "var(--accent)" }}>
                  {selectedProperty.stationDistance}
                </div>
                <div className="font-montserrat text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-40)" }}>
                  To Station
                </div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: "var(--fg-06)" }}>
                <div className="font-montserrat text-xl font-bold" style={{ color: "var(--accent)" }}>
                  {selectedProperty.nearbyAmenities.length}
                </div>
                <div className="font-montserrat text-[10px] uppercase tracking-wider mt-1" style={{ color: "var(--fg-40)" }}>
                  Amenities
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

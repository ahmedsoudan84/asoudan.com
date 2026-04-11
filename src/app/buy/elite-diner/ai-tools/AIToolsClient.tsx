"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import { menuItems } from "@/lib/elite-diner/menu-data";
import { getRecommendations, getOccasionSuggestion } from "@/lib/elite-diner/smart-logic";
import { useCart } from "@/lib/elite-diner/cart-store";

const OCCASIONS = [
  { id: "romance", label: "Date Night", icon: "🕯️" },
  { id: "business", label: "Client Meeting", icon: "🤝" },
  { id: "family", label: "Family Gathering", icon: "👨‍👩-👧" },
  { id: "luxury", label: "Celebration", icon: "🥂" },
];

export default function AIToolsClient() {
  const [activeTab, setActiveTab] = useState<"recommend" | "pairing">("recommend");
  const [pref, setPref] = useState("");
  const [occasion, setOccasion] = useState(OCCASIONS[0].id);
  const addItem = useCart((state) => state.addItem);

  const recommendations = getRecommendations({ mood: pref }, menuItems);
  const pairingResult = getOccasionSuggestion(occasion);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 text-accent mb-6">
            <Icons.Sparkles className="w-8 h-8" />
          </div>
          <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-4">AI <span className="text-accent">Concierge</span></h1>
          <p className="text-fg-50 max-w-xl mx-auto">
            Experience personalised dining at the touch of a button. Our client-side AI understands your cravings and occasions like no other.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-surface rounded-2xl p-1 border mb-12" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
          <button
            onClick={() => setActiveTab("recommend")}
            className={`flex-1 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "recommend" ? "bg-accent text-[#0a0c10] shadow-lg" : "text-fg-40 hover:text-fg"
            }`}
          >
            Meal Recommender
          </button>
          <button
            onClick={() => setActiveTab("pairing")}
            className={`flex-1 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "pairing" ? "bg-accent text-[#0a0c10] shadow-lg" : "text-fg-40 hover:text-fg"
            }`}
          >
            Occasion Pairing
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "recommend" ? (
            <motion.div
              key="recommend"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Input Area */}
              <div className="p-8 rounded-[2rem] border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <h2 className="font-montserrat font-bold text-xl mb-6 flex items-center gap-3">
                  <Icons.Search className="w-5 h-5 text-accent" />
                  What are you in the mood for?
                </h2>
                <div className="relative">
                  <textarea
                    value={pref}
                    onChange={(e) => setPref(e.target.value)}
                    placeholder="E.g. 'I want something spicy with seafood' or 'A light vegetarian lunch under £20'..."
                    className="w-full px-6 py-6 rounded-2xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-lg resize-none min-h-[140px]"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] uppercase font-bold tracking-widest opacity-20">
                    Real-time AI Analysis
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-2 gap-8">
                {recommendations.slice(0, 4).map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl border transition-all hover:bg-fg-05"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-montserrat font-bold">{item.name}</h3>
                        <span className="text-accent font-bold">£{item.price}</span>
                      </div>
                      <p className="text-xs text-fg-40 line-clamp-2 mb-4">{item.description}</p>
                      <button
                        onClick={() => addItem(item)}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:opacity-70 transition-opacity"
                      >
                        <Icons.Plus className="w-3 h-3" />
                        Quick Add
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pairing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Occasion Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`flex flex-col items-center gap-3 p-8 rounded-[2rem] border transition-all ${
                      occasion === occ.id 
                        ? "bg-accent border-accent text-bg-primary shadow-2xl shadow-accent/20 scale-105" 
                        : "bg-surface border-border-card text-fg hover:border-accent/40"
                    }`}
                    style={{ 
                      background: occasion === occ.id ? "var(--accent)" : "var(--bg-surface)",
                      borderColor: occasion === occ.id ? "var(--accent)" : "var(--border-card)",
                      color: occasion === occ.id ? "#0a0c10" : "var(--fg)"
                    }}
                  >
                    <span className="text-3xl">{occ.icon}</span>
                    <span className="font-montserrat font-bold text-[10px] uppercase tracking-widest">{occ.label}</span>
                  </button>
                ))}
              </div>

              {/* Recommendation Box */}
              <div className="p-12 rounded-[3.5rem] border relative overflow-hidden text-center" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32" />
                
                <h2 className="font-montserrat font-bold text-2xl mb-8">Selected Pairing</h2>
                {pairingResult ? (
                  <>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[3px] mb-8">
                      {pairingResult.title}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-4 text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-30">The Course Selection</span>
                        <div className="space-y-2">
                           {pairingResult.items.map((item, idx) => (
                             <h3 key={idx} className="font-montserrat text-xl font-black">{item}</h3>
                           ))}
                        </div>
                        <p className="text-fg-50 font-montserrat text-sm leading-relaxed">{pairingResult.description}</p>
                      </div>
                      <div className="space-y-4 p-8 rounded-3xl bg-secondary/30 backdrop-blur-sm border border-accent/10" style={{ background: "var(--bg-secondary)" }}>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Wine Sommelier Rec</span>
                        <h3 className="font-montserrat text-2xl font-bold italic">{pairingResult.wine}</h3>
                        <div className="flex items-center justify-center gap-2">
                           <Icons.Star className="w-3 h-3 text-accent fill-accent" />
                           <Icons.Star className="w-3 h-3 text-accent fill-accent" />
                           <Icons.Star className="w-3 h-3 text-accent fill-accent" />
                           <Icons.Star className="w-3 h-3 text-accent fill-accent" />
                           <Icons.Star className="w-3 h-3 text-accent fill-accent" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Choose an occasion above for a tailored pairing suggestion.</p>
                )}

                <div className="mt-12 pt-12 border-t flex flex-col items-center gap-6" style={{ borderColor: "var(--border-subtle)" }}>
                   <p className="text-sm italic opacity-40">&quot;The perfect synergy of texture and aroma, tailored for {OCCASIONS.find(o => o.id === occasion)?.label}.&quot;</p>
                   <Link
                      href="/buy/elite-diner/menu"
                      className="px-10 py-4 rounded-xl font-montserrat text-xs font-bold uppercase tracking-widest bg-accent text-[#0a0c10] shadow-xl shadow-accent/20 transition-all hover:scale-105"
                   >
                     View on Menu
                   </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

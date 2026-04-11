"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import { menuItems } from "@/lib/elite-diner/menu-data";

const STATS = [
  { label: "Today's Orders", value: "42", change: "+12%", icon: <Icons.ShoppingBag className="w-5 h-5 text-accent" /> },
  { label: "AI Upsells", value: "£1,240", change: "+24%", icon: <Icons.Sparkles className="w-5 h-5 text-accent" /> },
  { label: "Reservations", value: "18", change: "+3", icon: <Icons.Calendar className="w-5 h-5 text-accent" /> },
  { label: "Avg. Satisfaction", value: "4.9", change: "Stable", icon: <Icons.Star className="w-5 h-5 text-accent" /> },
];

const RECENT_ORDERS = [
  { id: "#ED-9042", customer: "James R.", total: "£142.00", items: "Wagyu, Wine Pairing", status: "Preparing" },
  { id: "#ED-9041", customer: "Sarah L.", total: "£85.50", items: "Lobster, Scallops", status: "Collected" },
  { id: "#ED-9040", customer: "Robert M.", total: "£210.00", items: "Full Tasting Menu x2", status: "Delivering" },
  { id: "#ED-9039", customer: "Emily W.", total: "£34.00", items: "Truffle Pasta", status: "Cancelled" },
];

export default function AdminClient() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black mb-2">Merchant <span className="text-accent">Insights</span></h1>
            <p className="text-fg-40">Manage your establishment and monitor AI-driven growth.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-5 py-2.5 rounded-xl border border-border-subtle text-[10px] font-bold uppercase tracking-widest hover:bg-fg-05 transition-all">
                Export Data
             </button>
             <button className="px-5 py-2.5 rounded-xl bg-accent text-[#0a0c10] text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20">
                Menu Editor
             </button>
          </div>
        </div>

        {/* ── Stats Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <div className="text-sm font-bold opacity-30 uppercase tracking-[2px] mb-1">{stat.label}</div>
              <div className="flex items-end gap-3">
                <div className="text-4xl font-montserrat font-black">{stat.value}</div>
                <div className={`text-[10px] font-bold mb-2 ${stat.change.startsWith("+") ? "text-green-500" : "opacity-40"}`}>
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* ── Recent Orders ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="p-10 rounded-[2.5rem] border h-full" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
              <h2 className="font-montserrat font-bold text-xl mb-8 flex justify-between items-center">
                Active Orders
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Real-time Sync</span>
              </h2>
              <div className="space-y-4">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="flex items-center gap-6 p-5 rounded-2xl bg-tertiary border border-border-subtle group transition-all hover:border-accent/20" style={{ background: "var(--bg-tertiary)" }}>
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent font-bold text-xs shrink-0">
                      {order.id.split('-')[1]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-sm truncate">{order.customer}</h4>
                        <span className="font-black text-sm">{order.total}</span>
                      </div>
                      <p className="text-[10px] text-fg-40 uppercase tracking-wider mb-2">{order.items}</p>
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Preparing' ? 'bg-orange-500 animate-pulse' : order.status === 'Cancelled' ? 'bg-red-500' : 'bg-green-500'}`} />
                         <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">{order.status}</span>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10">
                       <Icons.ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Top Dish ──────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="p-10 rounded-[2.5rem] border h-full flex flex-col" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
              <h2 className="font-montserrat font-bold text-xl mb-8">AI Spotlight</h2>
              <div className="mb-8 p-6 rounded-3xl bg-accent text-[#0a0c10] shadow-2xl shadow-accent/20">
                 <div className="flex items-center gap-2 mb-4">
                    <Icons.Sparkles className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-[2px]">Trending Now</span>
                 </div>
                 <h3 className="text-2xl font-black mb-2">Truffle Pasta</h3>
                 <p className="text-xs opacity-80 leading-relaxed mb-6">Trending among 'romantic occasion' searchers in the last 6 hours.</p>
                 <button className="w-full py-3 rounded-xl bg-black/10 font-bold uppercase tracking-widest text-[9px] hover:bg-black/20 transition-all">
                    Boost visibility
                 </button>
              </div>

              <div className="flex-1">
                <h4 className="text-[10px] uppercase font-bold tracking-widest opacity-30 mb-6">Popular Tag Mix</h4>
                <div className="space-y-4">
                   {[
                     { label: "Gluten-Free + Lobster", pct: 64 },
                     { label: "Romantic + Red Wine", pct: 42 },
                     { label: "Vegan + Spicy", pct: 28 },
                   ].map((mix, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                           <span>{mix.label}</span>
                           <span className="text-accent">{mix.pct}%</span>
                        </div>
                        <div className="h-1 w-full bg-fg-05 rounded-full overflow-hidden">
                           <div className="h-full bg-accent" style={{ width: `${mix.pct}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <p className="mt-8 text-[9px] text-fg-30 italic leading-relaxed text-center font-bold uppercase tracking-widest">
                Analytics processed locally. <br /> Private. Secure. Fast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

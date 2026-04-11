"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";

const VALUES = [
  {
    title: "Sourcing",
    desc: "We partner with over 40 local farms and day-boat fishermen to ensure the freshest seasonal ingredients.",
    icon: <Icons.Star className="w-5 h-5 text-accent" />
  },
  {
    title: "Sustainability",
    desc: "100% plastic-free operations and zero-waste kitchen initiatives are at the heart of our mission.",
    icon: <Icons.Sparkles className="w-5 h-5 text-accent" />
  },
  {
    title: "Innovation",
    desc: "Blending molecular gastronomy with traditional British techniques to create unexpected delights.",
    icon: <Icons.ChefHat className="w-5 h-5 text-accent" />
  }
];

export default function AboutClient() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* ── Story Section ──────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-[11px] font-bold uppercase tracking-[4px] block mb-6">Our Legacy</span>
            <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-8 leading-[0.95]">
              Passion on <span className="text-accent">Every Plate.</span>
            </h1>
            <p className="text-lg text-fg-60 leading-relaxed mb-6">
              Founded in 2012 by Chef Alexander Thorne, Elite Diner began as a humble pop-up in East London with a single vision: to make world-class fine dining accessible, intelligent, and sustainable.
            </p>
            <p className="text-lg text-fg-60 leading-relaxed mb-10">
              Today, perched in the heart of Mayfair, we continue to push boundaries. By integrating cutting-edge technology with artisanal craftsmanship, we provide a dining experience that is as seamless as it is delicious.
            </p>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-fg-05 border border-border-subtle italic text-sm">
               &quot;Cooking is an act of love. Technology is an act of precision. Elite Diner is the perfect marriage of both.&quot;
               <span className="text-accent font-bold not-italic ml-2">— Chef Thorne</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce39a73e4ef8?auto=format&fit=crop&q=80&w=1200" 
                alt="Chef Thorne" 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Absolute element */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent rounded-full flex items-center justify-center p-8 text-center text-[#0a0c10] font-montserrat shadow-2xl">
               <span className="text-xs uppercase font-bold tracking-widest leading-tight">Celebrating 15 Years of Excellence</span>
            </div>
          </motion.div>
        </div>

        {/* ── Values ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-8">
          {VALUES.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] border text-center group"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6">
                {val.icon}
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-4">{val.title}</h3>
              <p className="text-sm text-fg-50 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

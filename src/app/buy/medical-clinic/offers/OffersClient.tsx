"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { offers } from "@/lib/medical-clinic/data";

export default function OffersClient() {
  const featured = offers.filter((o) => o.featured);
  const others = offers.filter((o) => !o.featured);

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
            Exclusive Packages
          </span>
          <h1 className="font-montserrat text-5xl md:text-6xl font-black tracking-tight mb-6">
            Health Bundles & Offers
          </h1>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--fg-60)" }}>
            Smart bundles that combine multiple services at a reduced price. Invest in your health, your way.
          </p>
        </div>

        {/* Featured Offers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featured.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-[2rem] border overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"; }}
                />
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                  style={{ background: "var(--secondary)", color: "var(--bg-primary)" }}
                >
                  {offer.badge}
                </div>
              </div>
              <div className="p-8">
                <span className="text-[10px] font-bold uppercase tracking-[3px] block mb-3" style={{ color: "var(--accent)" }}>
                  {offer.category}
                </span>
                <h2 className="font-montserrat font-bold text-xl mb-4 group-hover:text-accent transition-colors">{offer.title}</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-40)" }}>{offer.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-montserrat font-black text-3xl" style={{ color: "var(--accent)" }}>
                    £{offer.discountedPrice}
                  </span>
                  <div>
                    <span className="text-sm line-through" style={{ color: "var(--fg-30)" }}>£{offer.originalPrice}</span>
                    <p className="text-xs font-bold" style={{ color: "var(--secondary)" }}>
                      Save £{offer.originalPrice - offer.discountedPrice}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] opacity-40 mb-5">Valid until {new Date(offer.validUntil).toLocaleDateString("en-GB", { dateStyle: "long" })}</p>
                <Link
                  href="/buy/medical-clinic/book"
                  className="block w-full text-center py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Book This Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Offers */}
        {others.length > 0 && (
          <>
            <h2 className="font-montserrat text-2xl font-bold mb-8">More Packages</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {others.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group flex gap-6 p-6 rounded-[2rem] border transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=300&fit=crop"; }}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={{ color: "var(--accent)" }}>{offer.category}</span>
                    <h3 className="font-montserrat font-bold mb-2 group-hover:text-accent transition-colors">{offer.title}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--fg-40)" }}>{offer.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>£{offer.discountedPrice}</span>
                        <span className="text-sm line-through" style={{ color: "var(--fg-30)" }}>£{offer.originalPrice}</span>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold"
                        style={{ background: "rgba(var(--secondary-rgb),0.12)", color: "var(--secondary)" }}
                      >
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div
          className="mt-20 p-12 rounded-[2.5rem] text-center border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <Icons.Heart className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--accent)" }} />
          <h2 className="font-montserrat text-3xl font-black mb-4">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="max-w-md mx-auto mb-8" style={{ color: "var(--fg-50)" }}>
            We can create a bespoke package tailored to your specific health needs. Contact us to discuss.
          </p>
          <Link
            href="/buy/medical-clinic/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

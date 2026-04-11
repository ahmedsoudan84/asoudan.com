"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import { MapPin, Clock, Award, Users, Leaf } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1559339352-11d135aa8251?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d1256?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338bad25f82c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed9e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1485686531760-ba938bff88c7?w=600&h=400&fit=crop",
];

export default function AboutClient() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/buy/restaurant" className="text-sm font-montserrat" style={{ color: "var(--fg-50)" }}>
            ← Back to Elite Diner
          </Link>
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-4" style={{ color: "var(--fg)" }}>
            Our Story
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--fg-50)" }}>
            Passion for ingredients. Dedication to craft. Love for our guests.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
                A London Love Story
              </h2>
              <p className="mt-4" style={{ color: "var(--fg-50)" }}>
                Elite Diner began with a simple belief: great food should be accessible, 
                memorable, and warm. Founded in 2018 in the heart of Soho, we wanted 
                to create a space where classic techniques meet modern creativity.
              </p>
              <p className="mt-4" style={{ color: "var(--fg-50)" }}>
                Our ingredients are sourced from trusted British farms and artisan producers. 
                Every dish tells a story of seasonality, of care, of craft.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d1256?w=800&h=600&fit=crop"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef */}
      <section className="py-16 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1 aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c2?w=600&h=600&fit=crop"
                alt="Executive Chef"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Award size={18} style={{ color: "#fbbf24" }} />
                <span className="text-xs font-montserrat uppercase tracking-wider" style={{ color: "#fbbf24" }}>
                  Executive Chef
                </span>
              </div>
              <h2 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
                Marcus Chen
              </h2>
              <p className="mt-4" style={{ color: "var(--fg-50)" }}>
                With over 15 years in London's finest kitchens, Marcus brings technique, 
                creativity, and an unwavering commitment to quality. His philosophy 
                is simple: respect the ingredient, let it shine.
              </p>
              <p className="mt-4" style={{ color: "var(--fg-50)" }}>
                "The best dish is one that makes someone pause, smile, and want to 
                share the moment with someone they love."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-2xl font-bold text-center" style={{ color: "var(--fg)" }}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: Leaf, title: "Sourcing", desc: "British farms, seasonal produce, trusted suppliers" },
              { icon: Users, title: "Community", desc: "Local staff, repeat guests, neighbourhood feel" },
              { icon: Award, title: "Craft", desc: "Classic technique, modern creativity" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl text-center"
                style={{ background: "var(--bg-surface)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon size={24} className="mx-auto mb-3" style={{ color: "#fbbf24" }} />
                <h3 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>
                  {item.title}
                </h3>
                <p className="text-sm mt-2" style={{ color: "var(--fg-50)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat text-2xl font-bold text-center mb-8" style={{ color: "var(--fg)" }}>
            The Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
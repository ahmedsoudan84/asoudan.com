"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { doctors } from "@/lib/medical-clinic/data";

export default function DoctorsClient() {
  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
            Our Team
          </span>
          <h1 className="font-montserrat text-5xl md:text-6xl font-black tracking-tight mb-6">Meet Our Specialists</h1>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--fg-60)" }}>
            A multidisciplinary team of experienced clinicians, each a leader in their field. All consultants are GMC/HCPC-registered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/buy/medical-clinic/doctors/${doc.slug}`}
                className="group block rounded-[2rem] border overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    crossOrigin="anonymous"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=450&fit=crop"; }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-montserrat font-bold text-xl group-hover:text-accent transition-colors mb-0.5">{doc.name}</h2>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>{doc.specialty}</p>
                  <p className="text-xs mb-4 opacity-50">{doc.title}</p>
                  <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: "var(--fg-40)" }}>
                    {doc.bio.substring(0, 140)}…
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Icons.Star className="w-4 h-4" style={{ color: "var(--secondary)" }} />
                      <span className="text-sm font-bold">{doc.rating}</span>
                      <span className="text-xs opacity-40">({doc.reviewCount})</span>
                    </div>
                    <span className="font-montserrat font-black" style={{ color: "var(--accent)" }}>£{doc.consultationFee}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {doc.availableDays.map((day) => (
                      <span key={day} className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{ background: "var(--fg-06)", color: "var(--fg-50)" }}>
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {doc.languages.map((lang) => (
                      <span key={lang} className="text-[10px] opacity-40 font-bold">{lang}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

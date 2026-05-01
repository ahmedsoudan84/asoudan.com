"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { doctors, serviceCategoryLabels } from "@/lib/medical-clinic/data";
import type { Service } from "@/lib/medical-clinic/data";

export default function ServiceDetailClient({ service }: { service: Service }) {
  const relatedDoctors = doctors.filter(
    (d) =>
      d.specialty.toLowerCase().includes(service.category.split("-")[0]) ||
      service.category === "general"
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=600&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-[1200px] mx-auto">
            <Link href="/buy/medical-clinic/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 opacity-70 hover:opacity-100 transition" style={{ color: "white" }}>
              ← All Services
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[2px]" style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                {serviceCategoryLabels[service.category]}
              </span>
              <span className="text-white/60 text-[11px] flex items-center gap-1">
                <Icons.Clock className="w-3 h-3" /> {service.duration} min
              </span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white">{service.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-montserrat text-2xl font-bold mb-6">About this Service</h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-60)" }}>{service.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="font-montserrat text-2xl font-bold mb-6">What&apos;s Included</h2>
              <ul className="space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
                      <Icons.Check className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                    </div>
                    <span style={{ color: "var(--fg-70)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {relatedDoctors.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2 className="font-montserrat text-2xl font-bold mb-6">Who Provides This</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedDoctors.slice(0, 4).map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/buy/medical-clinic/doctors/${doc.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:border-accent/40 hover:-translate-y-0.5"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                        crossOrigin="anonymous"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop"; }}
                      />
                      <div>
                        <p className="font-montserrat font-bold text-sm group-hover:text-accent transition-colors">{doc.name}</p>
                        <p className="text-xs opacity-50">{doc.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div>
            <div
              className="sticky top-24 p-8 rounded-3xl border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[3px] mb-4 opacity-50">Book This Service</p>
              <div className="text-4xl font-montserrat font-black mb-1" style={{ color: "var(--accent)" }}>
                £{service.price}
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--fg-40)" }}>
                {service.duration} minute appointment
              </p>
              <div className="space-y-3 mb-8">
                {["Same-week availability", "In-person, video, or phone", "Secure & confidential"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-50)" }}>
                    <Icons.CheckCircle className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href={`/buy/medical-clinic/book`}
                className="block w-full text-center py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105 shadow-lg shadow-accent/20"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                Book Now
              </Link>
              <Link
                href="/buy/medical-clinic/contact"
                className="block w-full text-center py-4 rounded-2xl border font-montserrat font-bold uppercase tracking-[2px] text-xs mt-3 transition-all hover:border-accent/40"
                style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)" }}
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

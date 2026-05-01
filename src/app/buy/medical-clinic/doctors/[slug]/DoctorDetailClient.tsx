"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { services } from "@/lib/medical-clinic/data";
import type { Doctor } from "@/lib/medical-clinic/data";

export default function DoctorDetailClient({ doctor }: { doctor: Doctor }) {
  const relatedServices = services.filter(
    (s) => s.category.split("-")[0] === doctor.specialty.split(" ")[0].toLowerCase() || s.category === "general"
  ).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="py-20 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <Link href="/buy/medical-clinic/doctors" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 opacity-50 hover:opacity-100 transition" style={{ color: "var(--fg)" }}>
            ← All Doctors
          </Link>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shrink-0"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"; }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="text-[11px] font-bold uppercase tracking-[3px] mb-3 block" style={{ color: "var(--accent)" }}>{doctor.specialty}</span>
              <h1 className="font-montserrat text-4xl md:text-5xl font-black tracking-tight mb-2">{doctor.name}</h1>
              <p className="text-lg opacity-60 mb-6">{doctor.title}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Icons.Star className="w-4 h-4" style={{ color: "var(--secondary)" }} />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="opacity-40 text-sm">({doctor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 opacity-60 text-sm">
                  <Icons.Phone className="w-4 h-4" />
                  {doctor.languages.join(", ")}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {doctor.availableDays.map((day) => (
                  <span key={day} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[2px]" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                    {day}
                  </span>
                ))}
              </div>
              <Link
                href="/buy/medical-clinic/book"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                <Icons.Calendar className="w-4 h-4" />
                Book with {doctor.name.split(" ")[1]}
                <span className="font-black">£{doctor.consultationFee}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-montserrat text-2xl font-bold mb-6">About</h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-60)" }}>{doctor.bio}</p>
            </div>

            <div>
              <h2 className="font-montserrat text-2xl font-bold mb-6">Qualifications</h2>
              <ul className="space-y-3">
                {doctor.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
                      <Icons.Award className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                    </div>
                    <span style={{ color: "var(--fg-70)" }}>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {relatedServices.length > 0 && (
              <div>
                <h2 className="font-montserrat text-2xl font-bold mb-6">Related Services</h2>
                <div className="grid gap-4">
                  {relatedServices.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/buy/medical-clinic/services/${svc.slug}`}
                      className="group flex items-center justify-between p-5 rounded-2xl border transition-all hover:border-accent/40 hover:-translate-y-0.5"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                    >
                      <div>
                        <p className="font-montserrat font-bold group-hover:text-accent transition-colors">{svc.name}</p>
                        <p className="text-xs opacity-50 mt-0.5">{svc.duration} min</p>
                      </div>
                      <span className="font-montserrat font-black" style={{ color: "var(--accent)" }}>£{svc.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking card */}
          <div>
            <div className="sticky top-24 p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[3px] mb-5 opacity-50">Book a Consultation</p>
              <div className="text-4xl font-montserrat font-black mb-1" style={{ color: "var(--accent)" }}>
                £{doctor.consultationFee}
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--fg-40)" }}>per consultation</p>
              <div className="space-y-3 mb-8">
                {[
                  `Available: ${doctor.availableDays.join(", ")}`,
                  `Languages: ${doctor.languages.join(", ")}`,
                  "In-person, video & phone",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--fg-50)" }}>
                    <Icons.Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/buy/medical-clinic/book"
                className="block w-full text-center py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

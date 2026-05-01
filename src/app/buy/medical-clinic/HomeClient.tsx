"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { services, doctors, offers } from "@/lib/medical-clinic/data";
import PricingSection from "@/components/buy/PricingSection";
import FAQSection from "@/components/buy/FAQSection";
import { MEDICAL_CLINIC_FAQ } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const FEATURES = [
  {
    icon: <Icons.Sparkles className="w-6 h-6" />,
    title: "AI Symptom Checker",
    desc: "Patients describe symptoms; our AI triage engine recommends the right specialist and urgency level — no API key required.",
  },
  {
    icon: <Icons.Calendar className="w-6 h-6" />,
    title: "Online Appointment Booking",
    desc: "Intuitive multi-step booking flow with doctor selection, service, date, time, and appointment type (in-person, video, phone).",
  },
  {
    icon: <Icons.Clipboard className="w-6 h-6" />,
    title: "Patient Portal",
    desc: "Patients register, view medical records, upload scans and blood tests, and see past and upcoming appointments in one place.",
  },
  {
    icon: <Icons.Shield className="w-6 h-6" />,
    title: "Full Admin Panel",
    desc: "Manage appointments, patient records, doctor profiles, services, and offers from a clean, password-protected dashboard.",
  },
  {
    icon: <Icons.Users className="w-6 h-6" />,
    title: "Doctor Profiles",
    desc: "Rich consultant profiles with specialties, qualifications, languages, availability, and direct booking links.",
  },
  {
    icon: <Icons.Activity className="w-6 h-6" />,
    title: "Services & Offers",
    desc: "Comprehensive services catalogue with pricing, duration, and bundle offers — perfect for conversion and upselling.",
  },
];

const TRUST_STATS = [
  { value: "6", label: "Specialists" },
  { value: "8", label: "Services" },
  { value: "AI", label: "Symptom Checker" },
  { value: "100%", label: "Client-Side" },
];

const SPECIALTIES = [
  { label: "General Practice", icon: <Icons.Stethoscope className="w-5 h-5" />, href: "/buy/medical-clinic/services?category=general" },
  { label: "Cardiology", icon: <Icons.Heart className="w-5 h-5" />, href: "/buy/medical-clinic/services?category=cardiology" },
  { label: "Dermatology", icon: <Icons.Activity className="w-5 h-5" />, href: "/buy/medical-clinic/services?category=dermatology" },
  { label: "Mental Health", icon: <Icons.Brain className="w-5 h-5" />, href: "/buy/medical-clinic/services?category=mental-health" },
  { label: "Physiotherapy", icon: <Icons.Award className="w-5 h-5" />, href: "/buy/medical-clinic/services?category=physiotherapy" },
  { label: "Nutrition", icon: <Icons.Pill className="w-5 h-5" />, href: "/buy/medical-clinic/services?category=nutrition" },
];

export default function HomeClient() {
  const [symptomInput, setSymptomInput] = useState("");
  const featuredDoctors = doctors.filter((d) => d.featured).slice(0, 3);
  const featuredOffers = offers.filter((o) => o.featured).slice(0, 3);
  const featuredServices = services.filter((s) => s.featured).slice(0, 3);

  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Medical Clinic"
            className="w-full h-full object-cover scale-105"
            loading="eager"
            crossOrigin="anonymous"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (t.dataset.fallbackTried !== "1") {
                t.dataset.fallbackTried = "1";
                t.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000";
              } else {
                t.style.display = "none";
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0a0c14]/70 via-[#0a0c14]/20 to-transparent" />
        </div>

        <div className="max-w-[1100px] w-full mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-12 h-px" style={{ background: "var(--accent)", opacity: 0.4 }} />
              <span className="text-[11px] font-bold uppercase tracking-[4px]" style={{ color: "var(--accent)" }}>
                Private Healthcare, Reimagined
              </span>
              <span className="w-12 h-px" style={{ background: "var(--accent)", opacity: 0.4 }} />
            </div>

            <h1
              className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
              style={{ color: "#ffffff" }}
            >
              Your Health,<br />
              <span style={{ color: "var(--accent)" }}>Your Priority</span>
            </h1>

            <p
              className="max-w-2xl mx-auto text-lg md:text-xl font-montserrat leading-relaxed mb-12 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              The premium private clinic template with AI symptom checking, seamless booking, and a full patient portal. No compromise on experience.
            </p>

            {/* AI Symptom Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <div
                className="flex items-center gap-3 px-5 py-4 rounded-2xl border group transition-all"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <Icons.Brain className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="Describe your symptoms... 'chest pain' or 'skin rash'"
                  className="flex-1 bg-transparent py-2 font-montserrat text-sm outline-none"
                  style={{ color: "var(--fg)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && symptomInput.trim()) {
                      window.location.href = `/buy/medical-clinic/ai-tools?q=${encodeURIComponent(symptomInput)}`;
                    }
                  }}
                />
                <Link
                  href={`/buy/medical-clinic/ai-tools?q=${encodeURIComponent(symptomInput)}`}
                  className="px-5 py-3 rounded-xl font-montserrat text-xs font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] active:scale-95"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Check
                </Link>
              </div>
              <p className="text-[10px] font-montserrat mt-3 opacity-40">
                AI triage — not a diagnosis. Always consult a qualified clinician.
              </p>
            </div>

            {/* Specialty quick-links */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {SPECIALTIES.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-all"
                  style={{
                    background: "var(--fg-06)",
                    borderColor: "var(--border-subtle)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {s.icon}
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Stats ──────────────────────────────────────── */}
      <section
        className="py-16 px-6 border-y"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div
                className="text-5xl font-black mb-3 transition-transform group-hover:scale-110"
                style={{ color: "var(--accent)" }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[3px] font-bold" style={{ color: "var(--fg-50)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
              Everything Included
            </span>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold">
              Built for Modern<br />
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Private Healthcare</span>
            </h2>
            <p className="max-w-xl mx-auto mt-6 text-lg leading-relaxed" style={{ color: "var(--fg-60)" }}>
              Every feature a private clinic needs — booking, patient records, AI triage, admin, and more — out of the box.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-[2rem] border hover:-translate-y-1 transition-all hover:shadow-xl"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-40)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Services ────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
                Our Expertise
              </span>
              <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Featured Services</h2>
            </div>
            <Link
              href="/buy/medical-clinic/services"
              className="group flex items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              All Services
              <Icons.ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/buy/medical-clinic/services/${svc.slug}`}
                  className="group block rounded-[2rem] border transition-all hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-[9px] uppercase font-bold"
                        style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}
                      >
                        {svc.category.replace("-", " ")}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold" style={{ color: "var(--fg-40)" }}>
                        <Icons.Clock className="w-3 h-3" />
                        {svc.duration} min
                      </div>
                    </div>
                    <h3 className="font-montserrat font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--fg-40)" }}>
                      {svc.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>
                        £{svc.price}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-30)" }}>
                        Book →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Showcase ──────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-[3px] mb-8"
              style={{ background: "rgba(var(--accent-rgb),0.08)", borderColor: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
            >
              <Icons.Sparkles className="w-3.5 h-3.5" />
              AI-Powered Triage
            </div>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold leading-tight mb-8">
              Symptom to Specialist<br />
              <span className="text-accent">in Seconds</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--fg-60)" }}>
              Our embedded AI symptom checker analyses patient-reported symptoms, maps them to likely conditions, and recommends the right specialist — no API key, no latency, no extra cost.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Analyses 40+ symptom categories",
                "Urgency triage: emergency → routine → lifestyle",
                "Recommends the right specialist & service",
                "100% client-side, zero data sent externally",
                "Fully rebrandable and extendable",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-60)" }}>
                  <Icons.CheckCircle className="w-4 h-4 shrink-0 text-accent" style={{ color: "var(--accent)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/buy/medical-clinic/ai-tools"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-montserrat text-xs font-bold uppercase tracking-[2px] transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              <Icons.Brain className="w-4 h-4" />
              Try the Symptom Checker
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="rounded-[2.5rem] p-6 border shadow-2xl"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                  <Icons.Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-montserrat font-bold text-sm">AI Symptom Checker</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-50">Powered by VitalCare AI</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-none text-sm font-montserrat" style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                    I&apos;ve been having chest pains and occasional shortness of breath
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-none text-sm font-montserrat border" style={{ background: "var(--bg-tertiary)", color: "var(--fg-70)", borderColor: "var(--border-subtle)" }}>
                    ⚠️ <strong>Urgent</strong> — Chest pain with breathlessness requires prompt assessment. I recommend our Cardiology service with Dr James Osei. Would you like to book now?
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl border" style={{ background: "rgba(var(--accent-rgb),0.05)", borderColor: "rgba(var(--accent-rgb),0.2)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: "var(--accent)" }}>Recommended</p>
                  <p className="font-montserrat font-bold text-sm">Cardiology Assessment — £350</p>
                  <p className="text-xs mt-1 opacity-50">With Dr James Osei · Tuesday / Thursday</p>
                  <button className="mt-3 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest font-montserrat" style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Doctors ─────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
                World-Class Team
              </span>
              <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Our Specialists</h2>
            </div>
            <Link
              href="/buy/medical-clinic/doctors"
              className="group flex items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              All Doctors
              <Icons.ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/buy/medical-clinic/doctors/${doctor.slug}`}
                  className="group block p-6 rounded-[2rem] border transition-all hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold group-hover:text-accent transition-colors">{doctor.name}</h3>
                      <p className="text-xs font-bold mt-0.5" style={{ color: "var(--accent)" }}>{doctor.specialty}</p>
                      <p className="text-[11px] mt-0.5 opacity-50">{doctor.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Icons.Star className="w-3.5 h-3.5" style={{ color: "var(--secondary)" }} />
                      <span className="text-xs font-bold">{doctor.rating}</span>
                      <span className="text-[11px] opacity-40">({doctor.reviewCount} reviews)</span>
                    </div>
                    <span className="font-montserrat font-black text-sm" style={{ color: "var(--accent)" }}>
                      £{doctor.consultationFee}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed line-clamp-3 mb-5" style={{ color: "var(--fg-40)" }}>
                    {doctor.bio.substring(0, 120)}…
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.availableDays.slice(0, 3).map((day) => (
                      <span
                        key={day}
                        className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold"
                        style={{ background: "var(--fg-06)", color: "var(--fg-50)" }}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Offers ───────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
                Exclusive Packages
              </span>
              <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Health Bundles & Offers</h2>
            </div>
            <Link
              href="/buy/medical-clinic/offers"
              className="group flex items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              All Offers
              <Icons.ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredOffers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/buy/medical-clinic/offers`}
                  className="group block rounded-[2rem] border overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop";
                      }}
                    />
                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                      style={{ background: "var(--secondary)", color: "var(--bg-primary)" }}
                    >
                      {offer.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block" style={{ color: "var(--accent)" }}>
                      {offer.category}
                    </span>
                    <h3 className="font-montserrat font-bold mb-2 group-hover:text-accent transition-colors">{offer.title}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--fg-40)" }}>
                      {offer.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>
                        £{offer.discountedPrice}
                      </span>
                      <span className="text-sm line-through" style={{ color: "var(--fg-30)" }}>
                        £{offer.originalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      {(() => {
        const tpl = categories.find((c) => c.slug === "medical-clinic");
        return tpl?.pricing ? (
          <PricingSection
            templateLabel="Medical Clinic"
            templateSlug="medical-clinic"
            tiers={tpl.pricing}
          />
        ) : null;
      })()}

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQSection items={MEDICAL_CLINIC_FAQ} templateSlug="medical-clinic" />

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10"
            style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}
          >
            <Icons.Heart className="w-10 h-10" />
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
            Ready to go <span className="text-accent">Live?</span>
          </h2>
          <p className="text-lg mb-12" style={{ color: "var(--fg-60)" }}>
            Explore the live booking system, try the AI symptom checker, browse the patient portal, or step into the admin dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <Link
              href="/buy/medical-clinic/book"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-105 shadow-xl shadow-accent/20"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Book Appointment
            </Link>
            <Link
              href="/buy/medical-clinic/ai-tools"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl border font-montserrat text-xs font-bold uppercase tracking-[2px] transition-all hover:scale-105"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              AI Symptom Check
            </Link>
            <Link
              href="/buy/medical-clinic/admin"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl border font-montserrat text-xs font-bold uppercase tracking-[2px] transition-all hover:scale-105"
              style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)" }}
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

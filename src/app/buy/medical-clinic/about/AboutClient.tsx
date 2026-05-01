"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { doctors } from "@/lib/medical-clinic/data";

const VALUES = [
  {
    icon: <Icons.Heart className="w-6 h-6" />,
    title: "Patient First",
    desc: "Every decision we make starts and ends with what is best for our patients. We listen, we empathise, and we treat every individual as a whole person.",
  },
  {
    icon: <Icons.Shield className="w-6 h-6" />,
    title: "Clinical Excellence",
    desc: "Our clinicians are among the most highly qualified in their fields. Rigorous standards, evidence-based practice, and continuous professional development are non-negotiable.",
  },
  {
    icon: <Icons.Lock className="w-6 h-6" />,
    title: "Privacy & Trust",
    desc: "We treat your health information with the utmost discretion. Our systems are GDPR-compliant and all staff are trained in confidentiality.",
  },
  {
    icon: <Icons.Sparkles className="w-6 h-6" />,
    title: "Innovation",
    desc: "We embrace technology to make healthcare more accessible, efficient, and personalised — from AI-assisted triage to online patient portals.",
  },
];

const MILESTONES = [
  { year: "2019", label: "Founded in Central London" },
  { year: "2020", label: "First 1,000 patients registered" },
  { year: "2021", label: "Launched digital patient portal" },
  { year: "2022", label: "Expanded to 6 specialties" },
  { year: "2023", label: "AI symptom checker introduced" },
  { year: "2024", label: "Rated #1 for patient satisfaction" },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-6" style={{ color: "var(--accent)" }}>
              Our Story
            </span>
            <h1 className="font-montserrat text-5xl md:text-6xl font-black tracking-tight leading-tight mb-8">
              Healthcare That<br />
              <span style={{ color: "var(--accent)" }}>Puts You First</span>
            </h1>
            <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--fg-60)" }}>
              VitalCare was founded on a simple belief: every person deserves world-class healthcare without the wait, the confusion, or the compromise.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-50)" }}>
              Our multidisciplinary team of consultants, specialists, and allied health professionals work together to deliver truly joined-up care — from first consultation to long-term health management.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                alt="VitalCare Clinic Interior"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=900&fit=crop"; }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-y" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: "5+", label: "Years of Excellence" },
            { value: "8,000+", label: "Patients Served" },
            { value: "6", label: "Specialists on Roster" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-montserrat font-black mb-2" style={{ color: "var(--accent)" }}>
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-[3px] font-bold" style={{ color: "var(--fg-50)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
              What We Stand For
            </span>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] border text-center"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                  {v.icon}
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-4">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-40)" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
              How We Got Here
            </span>
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: "var(--border-subtle)" }} />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-8 pl-12 relative"
                >
                  <div
                    className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                  />
                  <div className="font-montserrat font-black text-2xl w-16 shrink-0" style={{ color: "var(--accent)" }}>{m.year}</div>
                  <div className="font-montserrat font-bold" style={{ color: "var(--fg-70)" }}>{m.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-32 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>The People Behind VitalCare</span>
              <h2 className="font-montserrat text-4xl md:text-5xl font-bold">Meet the Team</h2>
            </div>
            <Link href="/buy/medical-clinic/doctors" className="group flex items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              All Doctors
              <Icons.ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/buy/medical-clinic/doctors/${doc.slug}`}
                  className="group block p-6 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      crossOrigin="anonymous" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=450&fit=crop"; }} />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg group-hover:text-accent transition-colors">{doc.name}</h3>
                  <p className="text-sm font-bold mt-1" style={{ color: "var(--accent)" }}>{doc.specialty}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ background: "var(--bg-primary)" }}>
        <Icons.Cross className="w-16 h-16 mx-auto mb-8" style={{ color: "var(--accent)" }} />
        <h2 className="font-montserrat text-4xl md:text-5xl font-black mb-6">Ready to take<br />control of your health?</h2>
        <p className="text-lg mb-12 max-w-md mx-auto" style={{ color: "var(--fg-50)" }}>
          Book a consultation today or try our AI symptom checker to find the right specialist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/buy/medical-clinic/book" className="px-10 py-5 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105 shadow-xl shadow-accent/20"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
            Book Appointment
          </Link>
          <Link href="/buy/medical-clinic/contact" className="px-10 py-5 rounded-2xl border font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:border-accent/40"
            style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)" }}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  timestamp: number;
}

const ENQUIRY_TYPES = [
  "Book a Viewing",
  "Request a Valuation",
  "General Enquiry",
  "Template Pricing",
];

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: ENQUIRY_TYPES[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save lead to localStorage
    const lead: LeadData = { ...form, timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem("ai-estate-leads") || "[]");
    existing.push(lead);
    localStorage.setItem("ai-estate-leads", JSON.stringify(existing));

    setSubmitted(true);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <section className="pt-20 pb-20 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-center" style={{ color: "var(--fg)" }}>
              Get in Touch
            </h1>
            <p className="font-montserrat text-lg mt-4 text-center" style={{ color: "var(--fg-50)" }}>
              Book a viewing, request a valuation, or ask about the template.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 p-10 rounded-2xl border text-center"
              style={{ background: "var(--bg-surface)", borderColor: "rgba(0,241,241,0.3)" }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ background: "rgba(0,241,241,0.15)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent)" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
                Thank You!
              </h2>
              <p className="font-montserrat text-sm mt-3" style={{ color: "var(--fg-50)" }}>
                Your enquiry has been saved. In a production deployment, this would trigger
                an email notification. Check the admin portal to see captured leads.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="mt-12 p-8 rounded-2xl border space-y-6"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none transition-all focus:ring-1"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--fg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  />
                </div>
                <div>
                  <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--fg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--fg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  />
                </div>
                <div>
                  <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                    Enquiry Type
                  </label>
                  <select
                    value={form.enquiryType}
                    onChange={(e) => updateField("enquiryType", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--fg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {ENQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none resize-none"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--fg)",
                    border: "1px solid var(--border-subtle)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,241,241,0.3)]"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                Send Enquiry
              </button>
            </motion.form>
          )}

          {/* Contact info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { label: "Phone", value: "+44 20 7946 0958" },
              { label: "Email", value: "hello@aiestate.co.uk" },
              { label: "Office", value: "42 Upper Street, London N1" },
            ].map((c) => (
              <div
                key={c.label}
                className="text-center p-5 rounded-xl border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <p className="font-montserrat text-[10px] uppercase tracking-[2px]" style={{ color: "var(--fg-40)" }}>
                  {c.label}
                </p>
                <p className="font-montserrat text-sm font-semibold mt-1" style={{ color: "var(--fg)" }}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

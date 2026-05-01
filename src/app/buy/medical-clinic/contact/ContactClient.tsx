"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";

const CONTACT_INFO = [
  {
    icon: <Icons.MapPin className="w-5 h-5" />,
    label: "Address",
    value: "14 Harley Street, Marylebone, London, W1G 9PH",
    sub: "Near Regent's Park & Baker Street",
  },
  {
    icon: <Icons.Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+44 (0) 20 7946 0000",
    sub: "Mon–Fri 8am–6pm, Sat 9am–1pm",
  },
  {
    icon: <Icons.Mail className="w-5 h-5" />,
    label: "Email",
    value: "hello@vitalcare.clinic",
    sub: "We respond within 4 hours",
  },
  {
    icon: <Icons.Clock className="w-5 h-5" />,
    label: "Opening Hours",
    value: "Mon–Fri: 8:00 – 18:00",
    sub: "Sat: 9:00 – 13:00 | Sun: Closed",
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
            Get In Touch
          </span>
          <h1 className="font-montserrat text-5xl md:text-6xl font-black tracking-tight mb-6">Contact Us</h1>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--fg-60)" }}>
            Have a question or want to book an appointment? Our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {CONTACT_INFO.map((info) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-5"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}
                >
                  {info.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1 opacity-40">{info.label}</p>
                  <p className="font-montserrat font-bold">{info.value}</p>
                  <p className="text-sm mt-0.5" style={{ color: "var(--fg-40)" }}>{info.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div
              className="aspect-[4/3] rounded-3xl overflow-hidden border flex items-center justify-center"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <div className="text-center opacity-30">
                <Icons.MapPin className="w-12 h-12 mx-auto mb-3" />
                <p className="font-montserrat font-bold text-sm">Map Integration</p>
                <p className="text-xs mt-1">Google Maps / Mapbox in production</p>
              </div>
            </div>

            <div
              className="p-6 rounded-2xl border"
              style={{ background: "rgba(var(--accent-rgb),0.05)", borderColor: "rgba(var(--accent-rgb),0.2)" }}
            >
              <Icons.AlertTriangle className="w-5 h-5 mb-3" style={{ color: "var(--accent)" }} />
              <p className="font-montserrat font-bold text-sm mb-1">Medical Emergency?</p>
              <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                If you are experiencing a medical emergency, do not use this form. Call <strong style={{ color: "var(--fg)" }}>999</strong> immediately.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[2.5rem] border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
                  <Icons.CheckCircle className="w-8 h-8" style={{ color: "var(--accent)" }} />
                </div>
                <h2 className="font-montserrat text-2xl font-black mb-4">Message Sent</h2>
                <p className="text-sm mb-8" style={{ color: "var(--fg-50)" }}>
                  Thank you, <strong style={{ color: "var(--fg)" }}>{form.name}</strong>. We&apos;ll get back to you within 4 hours.
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <Link href="/buy/medical-clinic/book" className="w-full text-center py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                    Book an Appointment
                  </Link>
                  <button onClick={() => setSent(false)} className="w-full text-center py-4 rounded-2xl border font-montserrat font-bold uppercase tracking-[2px] text-xs"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)" }}>
                    Send Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-[2.5rem] border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <h2 className="font-montserrat text-2xl font-bold mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Full Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent transition-colors"
                        style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)", color: "var(--fg)" }} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent transition-colors"
                        style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)", color: "var(--fg)" }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="07700 900000"
                      className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent transition-colors"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)", color: "var(--fg)" }} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Subject *</label>
                    <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent transition-colors"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)", color: form.subject ? "var(--fg)" : "var(--fg-40)" }}>
                      <option value="" disabled>Select a subject…</option>
                      <option value="booking">Book an Appointment</option>
                      <option value="referral">GP Referral Query</option>
                      <option value="insurance">Insurance & Billing</option>
                      <option value="results">Test Results Query</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you today?"
                      className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat text-sm resize-none focus:border-accent transition-colors"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)", color: "var(--fg)" }} />
                  </div>
                  <p className="text-[10px] opacity-30 font-montserrat leading-relaxed">
                    By submitting this form, you agree to our privacy policy. All data is stored locally in this demo.
                  </p>
                  <button type="submit" disabled={sending}
                    className="w-full py-5 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-sm transition-all hover:scale-[1.02] disabled:opacity-60"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

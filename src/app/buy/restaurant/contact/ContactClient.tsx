"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import { MapPin, Phone, Mail, MessageCircle, Sparkles, Check, ArrowRight } from "lucide-react";

const SUBJECTS = ["General Inquiry", "Private Event", "Feedback", "Careers", "Supplier", "Other"];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      <section className="pt-28 pb-8 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/buy/restaurant" className="text-sm font-montserrat" style={{ color: "var(--fg-50)" }}>
            ← Back to Elite Diner
          </Link>
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-4" style={{ color: "var(--fg)" }}>
            Get in Touch
          </h1>
          <p className="mt-2" style={{ color: "var(--fg-50)" }}>
            We'd love to hear from you
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
              Contact Information
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                <div>
                  <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Address</p>
                  <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                    123 Culinary Lane, Soho<br />
                    London W1D 3PS
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                <div>
                  <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Phone</p>
                  <p className="text-sm" style={{ color: "var(--fg-50)" }}>+44 20 7123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                <div>
                  <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Email</p>
                  <p className="text-sm" style={{ color: "var(--fg-50)" }}>hello@elitediner.co.uk</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                <div>
                  <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Social</p>
                  <p className="text-sm" style={{ color: "var(--fg-50)" }}>@elitedinerlondon</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} style={{ color: "#fbbf24" }} />
                <span className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>
                  AI Qualification
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                Our AI assistant can help route your inquiry to the right person faster.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl" style={{ background: "var(--bg-surface)" }}>
            {submitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                  <Check size={32} style={{ color: "#10b981" }} />
                </div>
                <h3 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                  Message Sent
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--fg-50)" }}>
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-6 text-sm underline"
                  style={{ color: "#fbbf24" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl font-montserrat"
                        style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl font-montserrat"
                        style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl font-montserrat"
                      style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>Subject</label>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map(subj => (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: subj })}
                          className="px-3 py-1.5 rounded-full text-xs font-montserrat uppercase tracking-wider transition-colors"
                          style={{
                            background: formData.subject === subj ? "rgba(251, 191, 36, 0.2)" : "var(--bg-secondary)",
                            color: formData.subject === subj ? "#fbbf24" : "var(--fg-60)",
                          }}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl font-montserrat"
                      style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{ background: "#fbbf24", color: "#000" }}
                >
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
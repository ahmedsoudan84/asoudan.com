"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import { Calendar, Clock, Users, MapPin, Phone, Mail, Sparkles, ArrowRight, X } from "lucide-react";

const TIME_SLOTS = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
];

const OCCASIONS = ["Birthday", "Anniversary", "Business", "Date Night", "Celebration", "Other"];

export default function BookClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    date: "", time: "", guests: "2",
    occasion: "", notes: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      {/* Header */}
      <section className="pt-28 pb-8 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/buy/restaurant" className="text-sm font-montserrat" style={{ color: "var(--fg-50)" }}>
            ← Back to Elite Diner
          </Link>
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-4" style={{ color: "var(--fg)" }}>
            Book a Table
          </h1>
          <p className="mt-2" style={{ color: "var(--fg-50)" }}>
            Reserve your spot for an unforgettable evening
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div>
              <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                Walk-ins Welcome
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--fg-50)" }}>
                For larger parties or weekend visits, we recommend booking in advance.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                  <div>
                    <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Location</p>
                    <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                      123 Culinary Lane, Soho<br />
                      London W1D 3PS
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                  <div>
                    <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Opening Hours</p>
                    <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                      Mon-Thu: 5pm - 11pm<br />
                      Fri-Sat: 5pm - 12am<br />
                      Sun: 12pm - 10pm
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
                  <div>
                    <p className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>Contact</p>
                    <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                      +44 20 7123 4567
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl" style={{ background: "var(--bg-surface)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} style={{ color: "#fbbf24" }} />
                  <span className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>
                    AI Assistant
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                  Need help choosing? Our AI can suggest the perfect ambiance for your occasion.
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-6 rounded-xl" style={{ background: "var(--bg-surface)" }}>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl font-montserrat"
                      style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                        Email *
                      </label>
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
                      <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl font-montserrat"
                        style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl font-montserrat"
                        style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                        Guests *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl font-montserrat"
                        style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      >
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                        <option value="9+">9+ (call us)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className="py-2 rounded-lg text-xs font-montserrat uppercase tracking-wider transition-colors"
                          style={{
                            background: formData.time === time ? "rgba(251, 191, 36, 0.2)" : "var(--bg-secondary)",
                            color: formData.time === time ? "#fbbf24" : "var(--fg-60)",
                            border: formData.time === time ? "1px solid rgba(251, 191, 36, 0.5)" : "1px solid var(--border-subtle)",
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>
                      Occasion
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {OCCASIONS.map(occ => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setFormData({ ...formData, occasion: occ })}
                          className="px-3 py-1.5 rounded-full text-xs font-montserrat uppercase tracking-wider transition-colors"
                          style={{
                            background: formData.occasion === occ ? "rgba(251, 191, 36, 0.2)" : "var(--bg-secondary)",
                            color: formData.occasion === occ ? "#fbbf24" : "var(--fg-60)",
                          }}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                      Special Requests
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl font-montserrat"
                      style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  style={{ background: "#fbbf24", color: "#000" }}
                >
                  <Calendar size={18} className="inline mr-2" />
                  Request Reservation
                </button>

                <p className="text-xs text-center mt-3" style={{ color: "var(--fg-40)" }}>
                  Demo only — no real booking
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-black/80" />
          <motion.div
            className="relative max-w-md w-full p-6 rounded-2xl text-center"
            style={{ background: "var(--bg-surface)" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-4 right-4 p-2 rounded-full"
              style={{ background: "var(--bg-tertiary)" }}
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(251, 191, 36, 0.15)" }}>
              <Calendar size={32} style={{ color: "#fbbf24" }} />
            </div>
            <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
              Reservation Requested
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--fg-50)" }}>
              We'll confirm via email within 2 hours during restaurant hours.
            </p>
            <p className="mt-4 text-sm" style={{ color: "var(--fg-50)" }}>
              <strong>{formData.guests} guests</strong> on <strong>{formData.date || "your chosen date"}</strong> at <strong>{formData.time || "our earliest available"}</strong>
            </p>
            <Link
              href="/buy/restaurant"
              className="inline-block mt-6 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
              style={{ background: "#fbbf24", color: "#000" }}
            >
              Back to Elite Diner
            </Link>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </main>
  );
}
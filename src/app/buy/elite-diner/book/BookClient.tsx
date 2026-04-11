"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";

const TIME_SLOTS = [
  { id: "12:00", label: "12:00 PM", type: "Lunch" },
  { id: "12:30", label: "12:30 PM", type: "Lunch" },
  { id: "1:00", label: "1:00 PM", type: "Lunch" },
  { id: "1:30", label: "1:30 PM", type: "Lunch" },
  { id: "6:00", label: "6:00 PM", type: "Dinner" },
  { id: "6:30", label: "6:30 PM", type: "Dinner" },
  { id: "7:00", label: "7:00 PM", type: "Dinner" },
  { id: "7:30", label: "7:30 PM", type: "Dinner" },
  { id: "8:00", label: "8:00 PM", type: "Dinner" },
  { id: "8:30", label: "8:30 PM", type: "Dinner" },
  { id: "9:00", label: "9:00 PM", type: "Dinner" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookClient() {
  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", email: "", occasion: "" });
  const [isBooked, setIsBooked] = useState(false);

  const today = new Date();
  const dates: Date[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  const handleBooking = () => {
    setIsBooked(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* ── Left: Copy ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-accent text-[11px] font-bold uppercase tracking-[4px] block mb-6">Reservations</span>
            <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-8 leading-[0.95]">
              Secure Your <span className="text-accent">Table</span>
            </h1>
            <p className="text-lg text-fg-60 leading-relaxed mb-12 max-w-lg">
              Experience the pinnacle of London fine dining. We recommend booking at least 48 hours in advance for weekend service. 
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-fg-05 flex items-center justify-center text-accent shrink-0 border border-border-subtle">
                  <Icons.MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-fg-40 text-sm leading-relaxed">42 Mayfair Mews, London, W1J 7JZ<br />United Kingdom</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-fg-05 flex items-center justify-center text-accent shrink-0 border border-border-subtle">
                  <Icons.Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg mb-1">Opening Hours</h3>
                  <p className="text-fg-40 text-sm leading-relaxed">Mon – Fri: 12:00 – 23:00<br />Sat – Sun: 10:00 – 00:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Custom Booking Flow ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-1 rounded-[3rem] border shadow-2xl relative overflow-hidden"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
            
            <div className="p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {isBooked ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-8 shadow-inner">
                      <Icons.Check className="w-10 h-10" />
                    </div>
                    <h2 className="font-montserrat text-3xl font-black mb-4">Reservation Placed!</h2>
                    <p className="text-fg-50 mb-8">
                      We&apos;ve sent a confirmation to <span className="text-accent font-bold">{details.email}</span>. 
                      Your table for {partySize} is ready on {selectedDate?.toLocaleDateString()} at {selectedTime}.
                    </p>
                    <button 
                      onClick={() => { setIsBooked(false); setStep(1); }}
                      className="px-10 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105"
                      style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step Indicators */}
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2 shrink-0">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-montserrat text-xs font-black transition-all ${
                              step >= s ? "bg-accent" : "bg-fg-10 text-fg-40 border border-border-subtle"
                            }`}
                            style={{ color: step >= s ? "var(--bg-primary)" : "var(--fg-40)" }}
                          >
                            0{s}
                          </div>
                          {s < 3 && <div className={`w-8 h-px ${step > s ? "bg-accent" : "bg-border-subtle"}`} />}
                        </div>
                      ))}
                    </div>

                    {step === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-montserrat text-2xl font-black mb-1">Select Party & Date</h3>
                          <p className="text-fg-40 text-xs uppercase tracking-widest font-bold">Step 01 of 03</p>
                        </div>

                        {/* Party Size */}
                        <div className="p-6 rounded-2xl bg-fg-03 border border-border-subtle">
                          <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">Number of Guests</label>
                          <div className="flex items-center justify-between gap-4">
                            <button 
                              onClick={() => setPartySize(Math.max(1, partySize - 1))}
                              className="w-12 h-12 rounded-xl border border-border-subtle flex items-center justify-center hover:bg-fg-05 transition-all active:scale-90"
                            >
                              <Icons.Minus className="w-5 h-5" />
                            </button>
                            <span className="font-montserrat text-4xl font-black text-accent">{partySize}</span>
                            <button 
                              onClick={() => setPartySize(Math.min(10, partySize + 1))}
                              className="w-12 h-12 rounded-xl border border-border-subtle flex items-center justify-center hover:bg-fg-05 transition-all active:scale-90"
                            >
                              <Icons.Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Date Grid */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">Preferred Date</label>
                          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                            {dates.map((d) => {
                              const isSelected = selectedDate?.toDateString() === d.toDateString();
                              return (
                                <button
                                  key={d.toISOString()}
                                  onClick={() => setSelectedDate(d)}
                                  className={`p-3 rounded-xl transition-all border ${
                                    isSelected 
                                      ? "bg-accent border-accent shadow-lg shadow-accent/20" 
                                      : "bg-surface border-border-card hover:border-accent/40"
                                  }`}
                                >
                                  <div className={`text-[8px] uppercase font-black tracking-tighter mb-1 ${isSelected ? "text-[#0a0c10]/60" : "opacity-40"}`}>
                                    {DAYS[d.getDay()]}
                                  </div>
                                  <div className="font-montserrat text-sm font-bold">{d.getDate()}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          disabled={!selectedDate}
                          onClick={() => setStep(2)}
                          className="w-full py-5 rounded-2xl font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2"
                          style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                        >
                          Choose Time <Icons.ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-montserrat text-2xl font-black mb-1">Preferred Time</h3>
                          <p className="text-fg-40 text-xs uppercase tracking-widest font-bold">Step 02 of 03</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                          {TIME_SLOTS.map((t) => {
                            const isSelected = selectedTime === t.id;
                            return (
                              <button
                                key={t.id}
                                onClick={() => setSelectedTime(t.id)}
                                className={`p-4 rounded-xl transition-all border flex flex-col items-center gap-1 ${
                                  isSelected 
                                    ? "bg-accent border-accent text-[#0a0c10] shadow-lg shadow-accent/20" 
                                    : "bg-fg-05 border-border-subtle hover:border-fg-20"
                                }`}
                              >
                                <span className="font-montserrat text-sm font-bold">{t.label}</span>
                                <span className={`text-[8px] uppercase font-black tracking-widest ${isSelected ? "text-[#0a0c10]/60" : "opacity-30"}`}>
                                  {t.type}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-5 rounded-2xl border font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:bg-fg-05"
                            style={{ borderColor: "var(--border-subtle)" }}
                          >
                            Back
                          </button>
                          <button
                            disabled={!selectedTime}
                            onClick={() => setStep(3)}
                            className="flex-[2] py-5 rounded-2xl font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 disabled:opacity-30 shadow-xl shadow-accent/20"
                            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                          >
                            Contact Details
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-montserrat text-2xl font-black mb-1">Final Details</h3>
                          <p className="text-fg-40 text-xs uppercase tracking-widest font-bold">Step 03 of 03</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Full Name</label>
                            <input
                              type="text"
                              required
                              value={details.name}
                              onChange={(e) => setDetails({ ...details, name: e.target.value })}
                              placeholder="e.g. Alexander Knight"
                              className="w-full px-6 py-4 rounded-xl border font-montserrat text-sm outline-none focus:border-accent/40 transition-all"
                              style={{ background: "var(--fg-05)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Email Address</label>
                            <input
                              type="email"
                              required
                              value={details.email}
                              onChange={(e) => setDetails({ ...details, email: e.target.value })}
                              placeholder="alex@example.com"
                              className="w-full px-6 py-4 rounded-xl border font-montserrat text-sm outline-none focus:border-accent/40 transition-all"
                              style={{ background: "var(--fg-05)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Special Occasion (Optional)</label>
                            <select
                              value={details.occasion}
                              onChange={(e) => setDetails({ ...details, occasion: e.target.value })}
                              className="w-full px-6 py-4 rounded-xl border font-montserrat text-sm appearance-none outline-none focus:border-accent/40 transition-all"
                              style={{ background: "var(--fg-05)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                            >
                              <option value="">None</option>
                              <option value="birthday">Birthday</option>
                              <option value="anniversary">Anniversary</option>
                              <option value="business">Business Meeting</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <button
                            onClick={() => setStep(2)}
                            className="flex-1 py-5 rounded-2xl border font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:bg-fg-05"
                            style={{ borderColor: "var(--border-subtle)" }}
                          >
                            Back
                          </button>
                          <button
                            disabled={!details.name || !details.email}
                            onClick={handleBooking}
                            className="flex-[2] py-5 rounded-2xl font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 disabled:opacity-30 shadow-xl shadow-accent/20"
                            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                          >
                            Confirm Table
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 text-center border-t" style={{ borderColor: "var(--border-subtle)", background: "var(--fg-02)" }}>
              <p className="text-[10px] text-fg-30 font-bold uppercase tracking-widest italic leading-relaxed">
                * Real-time availability managed by Elite Concierge AI. <br />
                Bookings are instantly confirmed via email.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

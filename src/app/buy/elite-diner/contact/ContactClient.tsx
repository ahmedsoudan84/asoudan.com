"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* ── Left: Contact Info ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-[11px] font-bold uppercase tracking-[4px] block mb-6">Connect</span>
            <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-8 leading-[0.95]">
              Let&apos;s Start a <span className="text-accent">Conversation.</span>
            </h1>
            <p className="text-lg text-fg-60 leading-relaxed mb-12 max-w-lg">
              Whether you&apos;re planning a private event, looking for a career change, or just want to share your dining experience, we&apos;d love to hear from you.
            </p>

            <div className="space-y-12">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-fg-05 flex items-center justify-center text-accent transition-transform group-hover:scale-110 border border-border-subtle">
                   <Icons.Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest opacity-40">Email Us</h3>
                  <p className="text-lg font-bold">hello@elitediner.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-fg-05 flex items-center justify-center text-accent transition-transform group-hover:scale-110 border border-border-subtle">
                   <Icons.Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest opacity-40">Call Us</h3>
                  <p className="text-lg font-bold">+44 (0) 20 7946 0852</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-fg-05 flex items-center justify-center text-accent transition-transform group-hover:scale-110 border border-border-subtle">
                   <Icons.MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest opacity-40">Visit Us</h3>
                  <p className="text-lg font-bold">42 Mayfair Mews, London</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-10 rounded-[3rem] border shadow-2xl relative overflow-hidden"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-8">
                  <Icons.Check className="w-10 h-10" />
                </div>
                <h2 className="font-montserrat font-bold text-3xl mb-4">Message Received</h2>
                <p className="text-fg-50 max-w-xs mx-auto">We&apos;ve received your inquiry and will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-10 text-accent font-bold uppercase tracking-widest text-[10px] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-montserrat font-bold text-2xl mb-8">Send a Message</h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Your Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-5 py-4 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full px-5 py-4 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Subject</label>
                  <select
                    className="w-full px-5 py-4 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm appearance-none"
                    style={{ background: "var(--bg-tertiary)" }}
                  >
                    <option>General Inquiry</option>
                    <option>Private Events</option>
                    <option>Career Opportunities</option>
                    <option>Media & PR</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm resize-none"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl font-montserrat text-xs font-bold uppercase tracking-[2px] shadow-2xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: "var(--accent)", color: "#0a0c10" }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

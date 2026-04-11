"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";

export default function BookClient() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* ── Left: Copy ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-[11px] font-bold uppercase tracking-[4px] block mb-6">Reservations</span>
            <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-8 leading-[0.95]">
              Secure Your <span className="text-accent">Table</span>
            </h1>
            <p className="text-lg text-fg-60 leading-relaxed mb-12 max-w-lg">
              Experience the pinnacle of London fine dining. We recommend booking at least 48 hours in advance for weekend service. 
              For parties larger than 8, please contact our events team directly.
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

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-fg-05 flex items-center justify-center text-accent shrink-0 border border-border-subtle">
                  <Icons.Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-lg mb-1">Direct Line</h3>
                  <p className="text-fg-40 text-sm leading-relaxed">+44 (0) 20 7946 0852<br />concierge@elitediner.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Calendly Integration ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-4 rounded-[3rem] border shadow-2xl overflow-hidden relative"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <div className="h-[650px] w-full">
              {/* Using a standard Calendly embed style container */}
              <iframe
                src="https://calendly.com/asoudan"
                width="100%"
                height="100%"
                frameBorder="0"
                className="rounded-2xl overflow-hidden dark:invert dark:grayscale dark:contrast-[1.1]"
                title="Elite Diner Reservations"
              />
            </div>
            
            <div className="p-6 text-center border-t mt-4" style={{ borderColor: "var(--border-subtle)" }}>
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

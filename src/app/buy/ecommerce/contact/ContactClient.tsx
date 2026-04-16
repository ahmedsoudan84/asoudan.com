"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";

const CHANNELS = [
  {
    icon: <EcomIcons.Mail className="w-5 h-5" />,
    label: "Email",
    value: "hello@kurator.demo",
    href: "mailto:hello@kurator.demo",
  },
  {
    icon: <EcomIcons.MapPin className="w-5 h-5" />,
    label: "Studio",
    value: "Clerkenwell, London EC1",
  },
  {
    icon: <EcomIcons.Truck className="w-5 h-5" />,
    label: "Shipping",
    value: "Dispatched from Hackney, Tuesday – Saturday",
  },
];

export default function ContactClient() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3500);
  };

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <section className="pt-16 pb-20 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center">
            <span
              className="font-montserrat text-[10px] uppercase tracking-[3px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </span>
            <h1
              className="font-montserrat text-4xl md:text-6xl font-black mt-4 tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Let's{" "}
              <span style={{ color: "var(--accent)" }}>talk.</span>
            </h1>
            <p
              className="font-montserrat text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--fg-60)" }}
            >
              Whether it's licensing, a custom build, or a note to the
              stylist — we read everything.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 mt-16">
            {/* Channels */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {CHANNELS.map((c) => {
                const inner = (
                  <div
                    className="p-5 rounded-2xl border flex items-start gap-4 transition-all hover:border-accent"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(var(--accent-rgb), 0.1)",
                        color: "var(--accent)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <p
                        className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                        style={{ color: "var(--fg-40)" }}
                      >
                        {c.label}
                      </p>
                      <p
                        className="font-montserrat font-bold text-sm mt-1"
                        style={{ color: "var(--fg)" }}
                      >
                        {c.value}
                      </p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}
            </motion.aside>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="p-7 md:p-10 rounded-3xl border space-y-5"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-card)",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
              </div>
              <label className="block">
                <span
                  className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                  style={{ color: "var(--fg-50)" }}
                >
                  Message
                </span>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="What's on your mind?"
                  rows={6}
                  className="mt-2 w-full px-4 py-3 rounded-xl border outline-none resize-none font-montserrat text-sm transition-colors focus:border-accent"
                  style={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--fg)",
                  }}
                />
              </label>
              <button
                type="submit"
                disabled={sent || !form.name || !form.email || !form.message}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.02] disabled:opacity-60"
                style={{
                  background: sent ? "var(--fg)" : "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                {sent ? "Message sent — we'll reply soon" : "Send message"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span
        className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
        style={{ color: "var(--fg-50)" }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm transition-colors focus:border-accent"
        style={{
          background: "var(--bg-primary)",
          borderColor: "var(--border-subtle)",
          color: "var(--fg)",
        }}
      />
    </label>
  );
}

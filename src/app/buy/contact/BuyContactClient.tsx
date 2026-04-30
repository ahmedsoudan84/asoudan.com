"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import { categories } from "@/lib/templates-data";

const OWNER_EMAIL = "ahmedsoudan@gmail.com";

const TIERS = ["Starter", "Studio", "Bespoke", "Not sure yet"] as const;
const TIMELINES = [
  "ASAP — within 4 weeks",
  "Next 1–3 months",
  "Exploring — no firm date",
] as const;

function ContactForm() {
  const search = useSearchParams();
  const templateSlug = search.get("template");
  const initialTier = search.get("tier");

  const template = categories.find((c) => c.slug === templateSlug);
  const templateLabel = template?.title || "a template";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [tier, setTier] = useState<string>(
    initialTier && TIERS.includes(initialTier as typeof TIERS[number])
      ? initialTier
      : "Studio",
  );
  const [timeline, setTimeline] = useState<string>(TIMELINES[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (template) {
      setMessage(
        `Hi Ahmed,\n\nI'm interested in the ${template.title} template (${tier} tier). A bit about us:\n\n• Business: \n• Website (if any): \n• What we want to achieve: \n\nLooking forward to chatting.`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${templateLabel} — ${tier}] Enquiry from ${name || "site visitor"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Template: ${templateLabel}`,
      `Tier: ${tier}`,
      `Timeline: ${timeline}`,
      ``,
      `Message:`,
      message,
    ].join("\n");
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main
      className="relative min-h-screen pt-32 pb-24 px-6 lg:px-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[820px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={template?.slug ? `/buy/${template.slug}` : "/buy"}
            className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-[2px] mb-8 hover:text-accent transition"
            style={{ color: "var(--fg-50)" }}
          >
            ← Back to {template?.title || "templates"}
          </Link>
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-montserrat font-bold uppercase tracking-[3px] mb-5"
            style={{
              background: "rgba(var(--accent-rgb),0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(var(--accent-rgb),0.2)",
            }}
          >
            Buy a template
          </span>
          <h1
            className="font-montserrat text-4xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            {template
              ? `Let's launch your ${template.title} site.`
              : "Let's pick the right template for you."}
          </h1>
          <p
            className="mt-5 font-montserrat text-base md:text-lg leading-relaxed"
            style={{ color: "var(--fg-60)" }}
          >
            Tell me a bit about your business and which tier you're leaning
            toward. I'll come back within one working day with next steps,
            timing, and any clarifying questions.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-12 p-8 md:p-10 rounded-3xl border space-y-6"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Your name">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                style={inputStyle}
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                style={inputStyle}
              />
            </Field>
          </div>

          <Field label="Company / brand (optional)">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input"
              style={inputStyle}
            />
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Template">
              <input
                type="text"
                value={templateLabel}
                readOnly
                className="input"
                style={{ ...inputStyle, opacity: 0.7, cursor: "not-allowed" }}
              />
            </Field>
            <Field label="Tier">
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="input"
                style={inputStyle}
              >
                {TIERS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Timeline">
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="input"
              style={inputStyle}
            >
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="A bit about you and what you need">
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </Field>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            Send enquiry
          </button>

          <p
            className="text-center text-[11px] font-montserrat"
            style={{ color: "var(--fg-40)" }}
          >
            Opens your email client, pre-filled. Or write directly to{" "}
            <a
              href={`mailto:${OWNER_EMAIL}`}
              className="underline hover:text-accent"
              style={{ color: "var(--fg-60)" }}
            >
              {OWNER_EMAIL}
            </a>
            .
          </p>
        </motion.form>

        <div className="mt-10 text-center">
          <p
            className="font-montserrat text-xs"
            style={{ color: "var(--fg-40)" }}
          >
            Looking for the {template?.title || "demo"} business itself? That's
            a fictional brand — visit the demo's own contact page from inside
            the template.
          </p>
        </div>
      </div>

      <Footer />
      <FloatingNav />
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-primary)",
  border: "1px solid var(--border-subtle)",
  color: "var(--fg)",
  padding: "12px 16px",
  borderRadius: "12px",
  width: "100%",
  fontFamily: "var(--font-montserrat, inherit)",
  fontSize: "14px",
  outline: "none",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block text-[10px] font-montserrat font-bold uppercase tracking-[2px] mb-2"
        style={{ color: "var(--fg-50)" }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export default function BuyContactClient() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PricingTier } from "@/lib/templates-data";

interface PricingSectionProps {
  templateLabel: string;
  templateSlug: string;
  tiers: PricingTier[];
  /**
   * @deprecated Kept for backwards compatibility. Per-tier links are now
   * generated automatically as `/buy/contact?template=<slug>&tier=<name>`
   * so the visitor lands on the buy-the-template form rather than the
   * demo brand's contact page.
   */
  contactHref?: string;
}

const CHECK = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 mt-0.5"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function PricingSection({
  templateLabel,
  templateSlug,
  tiers,
}: PricingSectionProps) {
  const buildHref = (tierName: string) =>
    `/buy/contact?template=${encodeURIComponent(templateSlug)}&tier=${encodeURIComponent(tierName)}`;

  return (
    <section
      id="pricing"
      className="py-24 px-6 lg:px-12 border-t"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-montserrat font-bold uppercase tracking-[3px] mb-5"
            style={{
              background: "rgba(var(--accent-rgb),0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(var(--accent-rgb),0.2)",
            }}
          >
            Pricing & what's included
          </span>
          <h2
            className="font-montserrat text-3xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Branded, built, and live —<br />
            <span style={{ color: "var(--accent)" }}>not just a code drop.</span>
          </h2>
          <p
            className="font-montserrat text-base md:text-lg mt-6 leading-relaxed"
            style={{ color: "var(--fg-50)" }}
          >
            Every {templateLabel} package ships with your brand on it: logo,
            colours, copy, content, and deploy to your domain. You don't
            download a zip and figure it out — we set it up and hand you a
            running site.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const isHighlight = !!tier.highlight;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col p-8 rounded-3xl border ${
                  isHighlight ? "md:-translate-y-2" : ""
                }`}
                style={{
                  background: isHighlight
                    ? "var(--bg-surface)"
                    : "var(--bg-primary)",
                  borderColor: isHighlight
                    ? "var(--accent)"
                    : "var(--border-subtle)",
                  boxShadow: isHighlight
                    ? "0 24px 60px -24px rgba(var(--accent-rgb),0.35)"
                    : "none",
                }}
              >
                {isHighlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-montserrat font-bold uppercase tracking-[2px]"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    Most popular
                  </span>
                )}

                <h3
                  className="font-montserrat text-xl font-black"
                  style={{ color: "var(--fg)" }}
                >
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className="font-montserrat text-4xl font-black tracking-tight"
                    style={{ color: "var(--fg)" }}
                  >
                    {tier.price}
                  </span>
                  <span
                    className="text-[10px] font-montserrat font-bold uppercase tracking-[1.5px]"
                    style={{ color: "var(--fg-40)" }}
                  >
                    one-time
                  </span>
                </div>

                <p
                  className="mt-3 font-montserrat text-sm leading-relaxed"
                  style={{ color: "var(--fg-60)" }}
                >
                  {tier.tagline}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 font-montserrat text-sm"
                      style={{ color: "var(--fg-70)" }}
                    >
                      <span style={{ color: "var(--accent)" }}>{CHECK}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={buildHref(tier.name)}
                  className="mt-8 block text-center px-6 py-3.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={
                    isHighlight
                      ? {
                          background: "var(--accent)",
                          color: "var(--bg-primary)",
                        }
                      : {
                          border: "1px solid var(--accent)",
                          color: "var(--accent)",
                        }
                  }
                >
                  Get in touch
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p
          className="text-center mt-10 font-montserrat text-xs"
          style={{ color: "var(--fg-40)" }}
        >
          All prices in GBP, exclusive of VAT. Hosting (Vercel, domain, email) billed at cost.
          Custom add-ons quoted per scope.
        </p>
      </div>
    </section>
  );
}

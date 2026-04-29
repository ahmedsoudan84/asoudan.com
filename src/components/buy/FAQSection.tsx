"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  contactHref: string;
}

/**
 * Collapsible FAQ section. Pair with `buildFAQJsonLd(items)` from
 * `@/lib/seo/faq` in the page server component to emit FAQPage schema.
 */
export default function FAQSection({ items, contactHref }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-6 lg:px-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[860px] mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-montserrat font-bold uppercase tracking-[3px] mb-5"
            style={{
              background: "rgba(var(--accent-rgb),0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(var(--accent-rgb),0.2)",
            }}
          >
            FAQ
          </span>
          <h2
            className="font-montserrat text-3xl md:text-4xl font-black tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Things buyers ask before getting in touch
          </h2>
        </div>

        <ul className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: isOpen
                    ? "rgba(var(--accent-rgb),0.4)"
                    : "var(--border-subtle)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-montserrat font-bold text-[15px]"
                    style={{ color: "var(--fg)" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      background: isOpen
                        ? "var(--accent)"
                        : "rgba(var(--accent-rgb),0.1)",
                      color: isOpen ? "var(--bg-primary)" : "var(--accent)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-6 pb-6 font-montserrat text-sm leading-relaxed"
                        style={{ color: "var(--fg-60)" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="text-center mt-12">
          <p
            className="font-montserrat text-sm mb-5"
            style={{ color: "var(--fg-50)" }}
          >
            Still on the fence? Send the question over — replies within one working day.
          </p>
          <Link
            href={contactHref}
            className="inline-block px-8 py-3.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.02]"
            style={{
              background: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

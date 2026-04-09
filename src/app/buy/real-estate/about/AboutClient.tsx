"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TEAM = [
  {
    name: "Victoria Ashworth",
    role: "Founder & Lead Agent",
    bio: "With over 15 years in London property, Victoria founded AI Estate to bring technology-driven transparency to the market. RICS accredited with specialist knowledge of North and Central London.",
  },
  {
    name: "James Chen",
    role: "Senior Sales Negotiator",
    bio: "James brings a decade of experience in prime Central London. Known for his meticulous approach to valuations and his extensive network of buyers and investors.",
  },
  {
    name: "Priya Patel",
    role: "Lettings Manager",
    bio: "Priya manages our lettings portfolio with an eye for detail and a commitment to matching tenants with their perfect home. ARLA Propertymark qualified.",
  },
];

const VALUES = [
  {
    title: "Transparency",
    desc: "AI-powered insights give you real data — walk scores, price comparisons, and area summaries — so you make informed decisions.",
  },
  {
    title: "Local Expertise",
    desc: "Every property in our portfolio has been personally visited. We know the streets, the schools, and the Sunday markets.",
  },
  {
    title: "Technology-First",
    desc: "From semantic search to automated area insights, we use technology to make finding your home faster and more enjoyable.",
  },
];

export default function AboutClient() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section className="pt-20 pb-16 px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold" style={{ color: "var(--fg)" }}>
              About <span style={{ color: "var(--accent)" }}>AI Estate</span>
            </h1>
            <p className="font-montserrat text-lg mt-6 leading-relaxed" style={{ color: "var(--fg-50)" }}>
              A London estate agency built for the modern buyer. We combine local expertise
              with AI-powered insights to help you find your perfect home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 lg:px-12" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-montserrat text-2xl font-bold mb-10 text-center" style={{ color: "var(--fg)" }}>
            Our Approach
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border text-center"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--accent)" }}>
                  {v.title}
                </h3>
                <p className="font-montserrat text-sm mt-3 leading-relaxed" style={{ color: "var(--fg-50)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-montserrat text-2xl font-bold mb-10 text-center" style={{ color: "var(--fg)" }}>
            The Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                {/* Avatar placeholder */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-montserrat text-xl font-bold"
                  style={{ background: "rgba(0,241,241,0.1)", color: "var(--accent)" }}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-montserrat text-lg font-bold text-center" style={{ color: "var(--fg)" }}>
                  {t.name}
                </h3>
                <p className="font-montserrat text-xs text-center mt-1" style={{ color: "var(--accent)" }}>
                  {t.role}
                </p>
                <p className="font-montserrat text-sm mt-4 leading-relaxed text-center" style={{ color: "var(--fg-50)" }}>
                  {t.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-12 text-center" style={{ background: "var(--bg-secondary)" }}>
        <h2 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
          Ready to Find Your Home?
        </h2>
        <p className="font-montserrat text-sm mt-3" style={{ color: "var(--fg-50)" }}>
          Get in touch and let us help you navigate the London property market.
        </p>
        <Link
          href="/buy/real-estate/contact"
          className="inline-block mt-6 px-8 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,241,241,0.3)]"
          style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}

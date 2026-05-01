"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./Icons";

const NAV_LINKS = [
  { label: "Home", href: "/buy/medical-clinic" },
  { label: "Services", href: "/buy/medical-clinic/services" },
  { label: "Doctors", href: "/buy/medical-clinic/doctors" },
  { label: "Book", href: "/buy/medical-clinic/book" },
  { label: "Offers", href: "/buy/medical-clinic/offers" },
  { label: "AI Health", href: "/buy/medical-clinic/ai-tools" },
  { label: "About", href: "/buy/medical-clinic/about" },
  { label: "Contact", href: "/buy/medical-clinic/contact" },
];

export function MedicalNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/buy/medical-clinic") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "backdrop-blur-xl py-3" : "bg-transparent py-5"
      }`}
      style={{
        background: isScrolled ? "var(--nav-bg)" : "transparent",
        borderColor: isScrolled ? "var(--nav-border)" : "transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Templates Button */}
        <Link
          href="/buy"
          className="flex items-center gap-3 group px-5 py-2.5 rounded-xl border transition-all hover:bg-accent hover:border-accent shrink-0"
          style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}
        >
          <Icons.Layout className="w-4 h-4 transition-colors group-hover:text-bg-primary" style={{ color: "var(--accent)" }} />
          <span className="font-montserrat font-bold text-[10px] uppercase tracking-[2px] transition-colors group-hover:text-bg-primary" style={{ color: "var(--fg)" }}>
            Templates
          </span>
        </Link>

        {/* Brand */}
        <Link href="/buy/medical-clinic" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
            <Icons.Cross className="w-4 h-4 text-accent" />
          </div>
          <span className="font-montserrat font-black text-sm tracking-tight hidden lg:block" style={{ color: "var(--fg)" }}>
            VitalCare
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-montserrat text-[11px] uppercase tracking-[2px] font-semibold transition-all hover:opacity-100 relative py-1 whitespace-nowrap"
              style={{
                color: isActive(link.href) ? "var(--accent)" : "var(--fg-60)",
                opacity: isActive(link.href) ? 1 : 0.7,
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="vc-active-nav"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "var(--accent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/buy/medical-clinic/patient"
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:border-accent/60"
            style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)", color: "var(--fg)" }}
          >
            <Icons.User className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            Portal
          </Link>
          <Link
            href="/buy/medical-clinic/book"
            className="hidden sm:flex px-5 py-2.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            Book Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl border"
            style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <Icons.X className="w-5 h-5" /> : <Icons.Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t overflow-hidden"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
          >
            <nav className="p-6 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-montserrat text-xs uppercase tracking-[2px] font-bold p-3 rounded-xl transition-colors"
                  style={{
                    color: isActive(link.href) ? "var(--accent)" : "var(--fg-60)",
                    background: isActive(link.href) ? "rgba(var(--accent-rgb),0.08)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-2">
                <Link
                  href="/buy/medical-clinic/patient"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-3 rounded-xl border font-montserrat text-[11px] font-bold uppercase tracking-wider"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                >
                  Patient Portal
                </Link>
                <Link
                  href="/buy/medical-clinic/book"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

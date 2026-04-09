"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TEMPLATE_NAV = [
  { label: "Home", href: "/buy/real-estate" },
  { label: "Listings", href: "/buy/real-estate/listings" },
  { label: "AI Tools", href: "/buy/real-estate/ai-tools" },
  { label: "About", href: "/buy/real-estate/about" },
  { label: "Contact", href: "/buy/real-estate/contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/buy/real-estate") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--nav-border)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo / Back to portfolio */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Link>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-montserrat" style={{ color: "var(--fg-50)" }}>
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Portfolio
          </Link>
          <span className="mx-1">/</span>
          <span style={{ color: "var(--accent)" }}>AI Estate</span>
        </nav>

        {/* Template sub-nav (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {TEMPLATE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-montserrat text-[11px] uppercase tracking-[2px] transition-colors duration-300 relative py-1"
              style={{
                color: isActive(item.href) ? "var(--accent)" : "var(--fg-50)",
              }}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="topnav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px transition-transform duration-300"
            style={{
              backgroundColor: "var(--fg-60)",
              transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px transition-opacity duration-300"
            style={{
              backgroundColor: "var(--fg-60)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-transform duration-300"
            style={{
              backgroundColor: "var(--fg-60)",
              transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="font-montserrat text-xs uppercase tracking-[2px] py-2 transition-colors"
                style={{ color: "var(--fg-50)" }}
              >
                &larr; Portfolio
              </Link>
              {TEMPLATE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-montserrat text-xs uppercase tracking-[2px] py-2 transition-colors"
                  style={{
                    color: isActive(item.href) ? "var(--accent)" : "var(--fg-60)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

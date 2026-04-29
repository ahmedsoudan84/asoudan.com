"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EcomIcons } from "./Icons";
import { useCart } from "@/lib/ecommerce/cart-store";

const NAV_LINKS = [
  { label: "Home", href: "/buy/ecommerce" },
  { label: "Shop", href: "/buy/ecommerce/shop" },
  { label: "AI Stylist", href: "/buy/ecommerce/ai-tools" },
  { label: "About", href: "/buy/ecommerce/about" },
  { label: "Contact", href: "/buy/ecommerce/contact" },
];

export default function EcommerceNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  const itemCount = useCart((s) => s.getItemCount());
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 350);
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  const isActive = (href: string) => {
    if (href === "/buy/ecommerce") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "backdrop-blur-xl py-3" : "py-5"
      }`}
      style={{
        background: isScrolled ? "var(--nav-bg)" : "transparent",
        borderColor: isScrolled ? "var(--nav-border)" : "transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Templates button — top-left, returns to /buy */}
        <Link
          href="/buy"
          className="flex items-center gap-2.5 group px-4 py-2.5 rounded-xl border transition-all hover:border-accent"
          style={{
            borderColor: "var(--border-subtle)",
            background: "var(--fg-05)",
          }}
        >
          <EcomIcons.Layout
            className="w-4 h-4 transition-colors"
            style={{ color: "var(--accent)" }}
          />
          <span
            className="font-montserrat font-bold text-[10px] uppercase tracking-[2.5px] group-hover:text-accent transition-colors"
            style={{ color: "var(--fg)" }}
          >
            Templates
          </span>
        </Link>

        {/* Wordmark */}
        <Link
          href="/buy/ecommerce"
          className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
        >
          <span
            className="font-montserrat font-black text-lg tracking-[4px] uppercase"
            style={{ color: "var(--fg)" }}
          >
            Kurator
            <span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 ml-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-montserrat text-[11px] uppercase tracking-[2.5px] font-semibold py-1 transition-colors"
              style={{
                color: isActive(link.href) ? "var(--accent)" : "var(--fg-60)",
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="ecom-nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "var(--accent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl border transition-all hover:border-accent group"
            style={{
              borderColor: "var(--border-subtle)",
              background: "var(--fg-05)",
            }}
            aria-label="Open cart"
          >
            <motion.div
              animate={animate ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 320 }}
            >
              <EcomIcons.Bag
                className="w-5 h-5 transition-colors group-hover:text-accent"
                style={{ color: "var(--fg-70)" }}
              />
            </motion.div>
            {mounted && itemCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center shadow-md"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              background: "var(--fg-05)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <EcomIcons.X className="w-5 h-5" />
            ) : (
              <EcomIcons.Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t mt-3"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <nav className="px-6 py-6 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-montserrat text-xs uppercase tracking-[2px] font-bold py-3 px-3 rounded-lg transition-colors"
                  style={{
                    color: isActive(link.href) ? "var(--accent)" : "var(--fg-70)",
                    background: isActive(link.href)
                      ? "var(--fg-05)"
                      : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

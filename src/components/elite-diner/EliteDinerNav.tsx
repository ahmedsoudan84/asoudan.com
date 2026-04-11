"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./Icons";
import { useCart } from "@/lib/elite-diner/cart-store";

const NAV_LINKS = [
  { label: "Home", href: "/buy/elite-diner" },
  { label: "Menu", href: "/buy/elite-diner/menu" },
  { label: "Order", href: "/buy/elite-diner/order" },
  { label: "Book", href: "/buy/elite-diner/book" },
  { label: "AI Tools", href: "/buy/elite-diner/ai-tools" },
  { label: "About", href: "/buy/elite-diner/about" },
  { label: "Contact", href: "/buy/elite-diner/contact" },
];

export function EliteDinerNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCart((state) => state.getItemCount());
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/buy/elite-diner") return pathname === href;
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
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/buy/elite-diner" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-[#0a0c10] transition-transform group-hover:scale-110 shadow-lg shadow-accent/20">
            <Icons.ChefHat className="w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <span className="font-montserrat font-bold text-lg tracking-tight block leading-none">ELITE</span>
            <span className="font-montserrat text-[10px] uppercase tracking-[3px] opacity-60 block mt-0.5">Diner</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-montserrat text-[11px] uppercase tracking-[2.5px] font-semibold transition-all hover:opacity-100 relative py-1"
              style={{
                color: isActive(link.href) ? "var(--accent)" : "var(--fg-60)",
                opacity: isActive(link.href) ? 1 : 0.7,
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/buy/elite-diner/order"
            className="group relative p-2.5 rounded-xl border transition-all hover:border-accent/40"
            style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}
          >
            <motion.div
              animate={isAnimating ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <Icons.ShoppingCart className="w-5 h-5 transition-colors group-hover:text-accent" />
            </motion.div>
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[10px] font-bold rounded-full flex items-center justify-center text-[#0a0c10] animate-in fade-in scale-in shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/"
            className="p-2.5 rounded-xl border transition-all hover:border-accent/40 group"
            style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}
            title="Back to Portfolio"
          >
            <Icons.Home className="w-5 h-5 transition-colors group-hover:text-accent" />
          </Link>

          <Link
            href="/buy/elite-diner/book"
            className="hidden sm:flex px-6 py-2.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "#0a0c10" }}
          >
            Book Table
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl border"
            style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}
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
            className="md:hidden border-t overflow-hidden"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
          >
            <nav className="p-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-montserrat text-xs uppercase tracking-[2px] font-bold p-2 rounded-lg transition-colors"
                  style={{
                    color: isActive(link.href) ? "var(--accent)" : "var(--fg-60)",
                    background: isActive(link.href) ? "var(--fg-05)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/buy/elite-diner/book"
                onClick={() => setMobileOpen(false)}
                className="mt-2 w-full text-center py-4 rounded-xl font-montserrat text-xs font-bold uppercase tracking-wider"
                style={{ background: "var(--accent)", color: "#0a0c10" }}
              >
                Book Table
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

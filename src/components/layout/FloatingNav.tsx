"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string; // if set, renders as a Link instead of scroll button
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "hero",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V10.5z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Work",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
{
     id: "real-estate",
     label: "Templates",
     href: "/buy",
     icon: (
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
         <rect x="3" y="3" width="18" height="18" rx="2" />
         <path d="M3 9h18" />
         <path d="M9 21V9" />
       </svg>
     ),
   },
  {
    id: "cv",
    label: "CV",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22 4 12 13 2 4" />
      </svg>
    ),
  },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isOnBuyPages = pathname.startsWith("/buy");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    setVisible(true);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.filter((i) => !i.href).map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    },
    [prefersReducedMotion]
  );

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.35, ease: "easeOut" as const },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          {...motionProps}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] backdrop-blur-xl rounded-full px-5 py-3 flex items-center gap-5"
          style={{
            background: "var(--nav-bg)",
            border: "1px solid var(--nav-border)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.href
              ? isOnBuyPages
              : !isOnBuyPages && activeSection === item.id;

            const inner = (
              <>
                <span
                  className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundColor: isActive ? "var(--accent)" : "transparent" }}
                />
                <span
                  className="transition-colors duration-300"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--nav-icon-inactive)",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="font-montserrat text-[10px] uppercase tracking-[2px] transition-colors duration-300"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--nav-icon-inactive)",
                  }}
                >
                  {item.label}
                </span>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  {inner}
                </Link>
              );
            }

            const targetHref = isOnBuyPages && item.id !== "real-estate"
              ? (item.id === "hero" ? "/" : item.id === "projects" ? "/#projects" : item.id === "cv" ? "/#experience" : `/#${item.id}`)
              : undefined;

            if (targetHref) {
              return (
                <Link
                  key={item.id}
                  href={targetHref}
                  className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                {inner}
              </button>
            );
          })}

          {/* Theme toggle removed - now in fixed position top-right */}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

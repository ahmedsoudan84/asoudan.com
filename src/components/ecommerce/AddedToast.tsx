"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EcomIcons } from "./Icons";
import ProductImage from "./ProductImage";
import { useCart } from "@/lib/ecommerce/cart-store";

interface Toast {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

/**
 * Floating confirmation that animates in whenever a product is added to the
 * cart. Subscribes to `lastAdded.tick` so every click — even re-adding the
 * same product — triggers a fresh toast.
 */
export default function AddedToast() {
  const lastAdded = useCart((s) => s.lastAdded);
  const openCart = useCart((s) => s.open);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!lastAdded) return;
    setToast({
      id: lastAdded.tick,
      name: lastAdded.name,
      image: lastAdded.image,
      quantity: lastAdded.quantity,
    });
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [lastAdded]);

  return (
    <div className="pointer-events-none fixed top-20 right-4 sm:right-6 z-[60] flex flex-col items-end gap-3 max-w-[calc(100%-2rem)]">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="pointer-events-auto flex items-center gap-3 pl-3 pr-4 py-3 rounded-2xl border backdrop-blur-xl shadow-[0_20px_50px_-18px_rgba(var(--accent-rgb),0.55)]"
            style={{
              background: "var(--nav-bg)",
              borderColor: "rgba(var(--accent-rgb), 0.35)",
              color: "var(--fg)",
            }}
          >
            <div
              className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0"
              style={{ background: "var(--fg-05)" }}
            >
              <ProductImage
                src={toast.image}
                alt=""
                fallbackSeed={toast.name}
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, type: "spring", stiffness: 400 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(var(--accent-rgb), 0.4)" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  <EcomIcons.Check className="w-4 h-4" />
                </span>
              </motion.div>
            </div>
            <div className="min-w-0">
              <p
                className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                Added to cart
              </p>
              <p
                className="font-montserrat text-sm font-bold truncate max-w-[220px]"
                style={{ color: "var(--fg)" }}
              >
                {toast.quantity > 1 ? `${toast.quantity} × ` : ""}
                {toast.name}
              </p>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="ml-1 shrink-0 px-3 py-1.5 rounded-lg font-montserrat text-[10px] font-bold uppercase tracking-[1.5px] border transition-colors hover:border-accent hover:text-accent"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--fg-70)",
              }}
            >
              View
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EcomIcons } from "./Icons";
import { useCart } from "@/lib/ecommerce/cart-store";

export default function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] z-[95] flex flex-col border-l shadow-2xl"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-card)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div>
                <h2
                  className="font-montserrat font-bold text-base tracking-tight"
                  style={{ color: "var(--fg)" }}
                >
                  Your Cart
                </h2>
                <p
                  className="text-[11px] font-montserrat uppercase tracking-[2px] mt-0.5"
                  style={{ color: "var(--fg-50)" }}
                >
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={close}
                className="p-2 rounded-full transition-colors hover:bg-fg-10"
                style={{ color: "var(--fg-60)" }}
                aria-label="Close cart"
              >
                <EcomIcons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "var(--fg-05)" }}
                >
                  <EcomIcons.Bag
                    className="w-7 h-7"
                    style={{ color: "var(--fg-40)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-montserrat font-bold text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    Your cart is empty
                  </p>
                  <p
                    className="font-montserrat text-xs mt-2 max-w-[240px]"
                    style={{ color: "var(--fg-50)" }}
                  >
                    Browse the shop or ask the AI stylist for a tailored pick.
                  </p>
                </div>
                <Link
                  href="/buy/ecommerce/shop"
                  onClick={close}
                  className="mt-4 px-6 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.02]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.map((line) => (
                  <motion.div
                    key={line.slug}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 rounded-2xl border"
                    style={{
                      background: "var(--bg-primary)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
                      style={{ background: "var(--fg-05)" }}
                    >
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/buy/ecommerce/shop/${line.slug}`}
                            onClick={close}
                            className="font-montserrat font-bold text-sm hover:text-accent transition-colors truncate block"
                            style={{ color: "var(--fg)" }}
                          >
                            {line.name}
                          </Link>
                          <p
                            className="font-montserrat text-[10px] uppercase tracking-wider mt-0.5"
                            style={{ color: "var(--fg-40)" }}
                          >
                            {line.colour}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(line.slug)}
                          className="p-1 rounded-md hover:bg-fg-10 transition-colors"
                          style={{ color: "var(--fg-40)" }}
                          aria-label="Remove"
                        >
                          <EcomIcons.Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div
                          className="flex items-center gap-1 rounded-full border"
                          style={{ borderColor: "var(--border-subtle)" }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(line.slug, line.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:text-accent transition-colors"
                            style={{ color: "var(--fg-60)" }}
                            aria-label="Decrease"
                          >
                            <EcomIcons.Minus className="w-3 h-3" />
                          </button>
                          <span
                            className="font-montserrat font-bold text-xs min-w-[20px] text-center"
                            style={{ color: "var(--fg)" }}
                          >
                            {line.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(line.slug, line.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:text-accent transition-colors"
                            style={{ color: "var(--fg-60)" }}
                            aria-label="Increase"
                          >
                            <EcomIcons.Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span
                          className="font-montserrat font-bold text-sm"
                          style={{ color: "var(--fg)" }}
                        >
                          £{(line.price * line.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t space-y-4"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div className="space-y-1.5">
                  <div
                    className="flex items-center justify-between font-montserrat text-xs"
                    style={{ color: "var(--fg-50)" }}
                  >
                    <span>Subtotal</span>
                    <span>£{subtotal.toLocaleString()}</span>
                  </div>
                  <div
                    className="flex items-center justify-between font-montserrat text-xs"
                    style={{ color: "var(--fg-50)" }}
                  >
                    <span>Shipping</span>
                    <span>{subtotal >= 75 ? "Free" : "£4.95"}</span>
                  </div>
                  <div
                    className="flex items-center justify-between font-montserrat text-sm font-bold pt-2 border-t"
                    style={{ color: "var(--fg)", borderColor: "var(--border-subtle)" }}
                  >
                    <span>Total</span>
                    <span>
                      £
                      {(subtotal + (subtotal >= 75 ? 0 : 4.95)).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                </div>
                <Link
                  href="/buy/ecommerce/cart"
                  onClick={close}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.02]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  <EcomIcons.Lock className="w-3.5 h-3.5" />
                  Secure Checkout
                </Link>
                <button
                  onClick={close}
                  className="w-full text-center font-montserrat text-[10px] uppercase tracking-[2px] hover:text-accent transition-colors"
                  style={{ color: "var(--fg-50)" }}
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

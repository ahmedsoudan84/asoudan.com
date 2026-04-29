"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EcomIcons } from "@/components/ecommerce/Icons";
import { useCart } from "@/lib/ecommerce/cart-store";
import { addOrder, type Order } from "@/lib/ecommerce/storage";

type Step = "cart" | "details" | "payment" | "confirmed";

export default function CartClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { items, updateQuantity, removeItem, getSubtotal, clear } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 4.95;
  const total = subtotal + shipping;

  const [step, setStep] = useState<Step>("cart");
  const [promo, setPromo] = useState("");
  const [promoOk, setPromoOk] = useState(false);
  const discount = promoOk ? Math.round(subtotal * 0.1 * 100) / 100 : 0;

  const applyPromo = () => {
    if (promo.trim().toLowerCase() === "kurator10") {
      setPromoOk(true);
    } else {
      setPromoOk(false);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
  });

  const goNext = () => {
    if (step === "cart") setStep("details");
    else if (step === "details") {
      if (!formData.email || !formData.firstName || !formData.address) {
        alert("Please fill in all required details.");
        return;
      }
      setStep("payment");
    }
    else if (step === "payment") {
      // Save order to storage
      const order: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
        total: total - discount,
        status: "Pending",
        date: new Date().toISOString().split('T')[0]
      };
      addOrder(order);

      setStep("confirmed");
      setTimeout(() => clear(), 800);
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* ... (Header stays same) ... */}
      <section className="pt-14 pb-8 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/buy/ecommerce/shop"
            className="inline-flex items-center gap-2 font-montserrat text-[11px] uppercase tracking-[2px] font-bold hover:text-accent transition-colors mb-4"
            style={{ color: "var(--fg-50)" }}
          >
            <EcomIcons.ChevronRight className="w-3.5 h-3.5 rotate-180" />
            Continue shopping
          </Link>
          <h1
            className="font-montserrat text-4xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            {step === "confirmed" ? "Order confirmed." : "Your Cart."}
          </h1>

          {/* Stepper */}
          {step !== "confirmed" && items.length > 0 && (
            <div className="mt-8 flex items-center gap-2 overflow-x-auto">
              {(["cart", "details", "payment"] as Step[]).map((s, i) => {
                const active =
                  s === step ||
                  (s === "cart" && step !== "cart") ||
                  (s === "details" && step === "payment");
                const current = s === step;
                return (
                  <React.Fragment key={s}>
                    <div className="flex items-center gap-3 shrink-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center font-montserrat text-[11px] font-bold"
                        style={{
                          background: current
                            ? "var(--accent)"
                            : active
                              ? "rgba(var(--accent-rgb), 0.15)"
                              : "var(--fg-05)",
                          color: current
                            ? "var(--bg-primary)"
                            : active
                              ? "var(--accent)"
                              : "var(--fg-40)",
                          border:
                            current || active
                              ? "1px solid var(--accent)"
                              : "1px solid var(--border-subtle)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <span
                        className="font-montserrat text-[11px] uppercase tracking-[2px] font-bold"
                        style={{
                          color: current
                            ? "var(--accent)"
                            : active
                              ? "var(--fg-70)"
                              : "var(--fg-40)",
                        }}
                      >
                        {s}
                      </span>
                    </div>
                    {i < 2 && (
                      <div
                        className="w-10 h-px shrink-0"
                        style={{ background: "var(--border-subtle)" }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          {step === "confirmed" ? (
            <ConfirmationScreen total={total} />
          ) : items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-10">
              {/* Left column */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {step === "cart" && (
                    <motion.div
                      key="cart"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3"
                    >
                      {items.map((line) => (
                        <motion.div
                          key={line.slug}
                          layout
                          className="flex items-center gap-4 p-4 rounded-2xl border"
                          style={{
                            background: "var(--bg-surface)",
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
                            <Link
                              href={`/buy/ecommerce/shop/${line.slug}`}
                              className="font-montserrat font-bold text-sm hover:text-accent transition-colors"
                              style={{ color: "var(--fg)" }}
                            >
                              {line.name}
                            </Link>
                            <p
                              className="font-montserrat text-[11px] uppercase tracking-wider mt-1"
                              style={{ color: "var(--fg-50)" }}
                            >
                              {line.colour}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                              <div
                                className="flex items-center gap-1 rounded-full border"
                                style={{ borderColor: "var(--border-subtle)" }}
                              >
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      line.slug,
                                      line.quantity - 1
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center hover:text-accent transition-colors"
                                  style={{ color: "var(--fg-60)" }}
                                >
                                  <EcomIcons.Minus className="w-3 h-3" />
                                </button>
                                <span
                                  className="font-montserrat text-xs font-bold min-w-[20px] text-center"
                                  style={{ color: "var(--fg)" }}
                                >
                                  {line.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      line.slug,
                                      line.quantity + 1
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center hover:text-accent transition-colors"
                                  style={{ color: "var(--fg-60)" }}
                                >
                                  <EcomIcons.Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(line.slug)}
                                className="font-montserrat text-[10px] uppercase tracking-[1.5px] font-bold hover:text-accent transition-colors"
                                style={{ color: "var(--fg-50)" }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div
                              className="font-montserrat font-bold text-base"
                              style={{ color: "var(--fg)" }}
                            >
                              £{(line.price * line.quantity).toLocaleString()}
                            </div>
                            <div
                              className="font-montserrat text-[10px] mt-1"
                              style={{ color: "var(--fg-40)" }}
                            >
                              £{line.price} each
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {step === "details" && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5 p-6 md:p-8 rounded-3xl border"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <h2
                        className="font-montserrat font-bold text-lg"
                        style={{ color: "var(--fg)" }}
                      >
                        Where should we send it?
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField 
                          label="First name" 
                          placeholder="Alex" 
                          value={formData.firstName}
                          onChange={v => setFormData({...formData, firstName: v})}
                        />
                        <FormField 
                          label="Last name" 
                          placeholder="Stone" 
                          value={formData.lastName}
                          onChange={v => setFormData({...formData, lastName: v})}
                        />
                      </div>
                      <FormField
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={v => setFormData({...formData, email: v})}
                      />
                      <FormField
                        label="Street address"
                        placeholder="42 Canonbury Square"
                        value={formData.address}
                        onChange={v => setFormData({...formData, address: v})}
                      />
                      <div className="grid md:grid-cols-3 gap-4">
                        <FormField 
                          label="City" 
                          placeholder="London" 
                          value={formData.city}
                          onChange={v => setFormData({...formData, city: v})}
                        />
                        <FormField 
                          label="Postcode" 
                          placeholder="N1 2AN" 
                          value={formData.postcode}
                          onChange={v => setFormData({...formData, postcode: v})}
                        />
                        <FormField 
                          label="Country" 
                          placeholder="United Kingdom" 
                          value={formData.country}
                          onChange={v => setFormData({...formData, country: v})}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === "payment" && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5 p-6 md:p-8 rounded-3xl border"
                      style={{
                        background: "var(--bg-surface)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <EcomIcons.Lock
                          className="w-4 h-4"
                          style={{ color: "var(--accent)" }}
                        />
                        <h2
                          className="font-montserrat font-bold text-lg"
                          style={{ color: "var(--fg)" }}
                        >
                          Secure payment
                        </h2>
                      </div>
                      <p
                        className="font-montserrat text-xs"
                        style={{ color: "var(--fg-50)" }}
                      >
                        Demo checkout — no card will be charged.
                      </p>
                      <FormField
                        label="Card number"
                        placeholder="4242 4242 4242 4242"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Expiry" placeholder="12 / 28" />
                        <FormField label="CVC" placeholder="123" />
                      </div>
                      <FormField label="Name on card" placeholder="Alex Stone" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="flex items-center justify-between pt-4">
                  {step !== "cart" ? (
                    <button
                      onClick={() =>
                        setStep(step === "payment" ? "details" : "cart")
                      }
                      className="font-montserrat text-[11px] uppercase tracking-[2px] font-bold hover:text-accent transition-colors"
                      style={{ color: "var(--fg-60)" }}
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={goNext}
                    className="px-7 py-3.5 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2.5px] transition-all hover:scale-[1.02]"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    {step === "cart"
                      ? "Continue →"
                      : step === "details"
                        ? "Continue to payment →"
                        : `Place order — £${(total - discount).toFixed(2)}`}
                  </button>
                </div>
              </div>

              {/* Right column — summary */}
              <aside className="lg:sticky lg:top-24 h-fit">
                <div
                  className="p-6 rounded-3xl border space-y-5"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-card)",
                  }}
                >
                  <h2
                    className="font-montserrat font-bold text-base"
                    style={{ color: "var(--fg)" }}
                  >
                    Order summary
                  </h2>

                  {/* Promo */}
                  <div>
                    <label
                      className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
                      style={{ color: "var(--fg-50)" }}
                    >
                      Promo code
                    </label>
                    <div
                      className="mt-2 flex items-center gap-2 rounded-xl p-1.5"
                      style={{ background: "var(--bg-primary)" }}
                    >
                      <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Try KURATOR10"
                        className="flex-1 bg-transparent px-3 py-2 outline-none font-montserrat text-xs"
                        style={{ color: "var(--fg)" }}
                      />
                      <button
                        onClick={applyPromo}
                        className="px-4 py-2 rounded-lg font-montserrat text-[10px] font-bold uppercase tracking-wider transition-colors"
                        style={{
                          background: "var(--fg-05)",
                          color: "var(--fg-70)",
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoOk && (
                      <p
                        className="mt-2 text-[11px] font-montserrat flex items-center gap-1"
                        style={{ color: "var(--accent)" }}
                      >
                        <EcomIcons.Check className="w-3 h-3" /> 10% off applied
                      </p>
                    )}
                  </div>

                  <div
                    className="space-y-2 font-montserrat text-xs"
                    style={{ color: "var(--fg-60)" }}
                  >
                    <Row label="Subtotal" value={`£${subtotal.toLocaleString()}`} />
                    {discount > 0 && (
                      <Row
                        label="Discount"
                        value={`-£${discount.toFixed(2)}`}
                        highlight
                      />
                    )}
                    <Row
                      label="Shipping"
                      value={shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                    />
                  </div>

                  <div
                    className="pt-4 border-t flex items-center justify-between font-montserrat"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--fg)" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-xl font-black"
                      style={{ color: "var(--fg)" }}
                    >
                      £{(total - discount).toFixed(2)}
                    </span>
                  </div>

                  <div
                    className="flex items-start gap-2 p-3 rounded-xl"
                    style={{ background: "var(--fg-05)" }}
                  >
                    <EcomIcons.Shield
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <p
                      className="font-montserrat text-[11px] leading-relaxed"
                      style={{ color: "var(--fg-60)" }}
                    >
                      Secure checkout · 60-day returns · Free UK shipping over
                      £75
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span style={{ color: highlight ? "var(--accent)" : "var(--fg)" }}>
        {value}
      </span>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span
        className="font-montserrat text-[10px] uppercase tracking-[2px] font-bold"
        style={{ color: "var(--fg-50)" }}
      >
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-2 w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm transition-colors focus:border-accent"
        style={{
          background: "var(--bg-primary)",
          borderColor: "var(--border-subtle)",
          color: "var(--fg)",
        }}
      />
    </label>
  );
}

function EmptyCart() {
  return (
    <div
      className="text-center py-24 rounded-3xl border max-w-xl mx-auto"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
        style={{ background: "var(--fg-05)" }}
      >
        <EcomIcons.Bag
          className="w-7 h-7"
          style={{ color: "var(--fg-40)" }}
        />
      </div>
      <h2
        className="font-montserrat font-bold text-xl mt-6"
        style={{ color: "var(--fg)" }}
      >
        Your cart is empty.
      </h2>
      <p
        className="font-montserrat text-sm mt-3 max-w-sm mx-auto"
        style={{ color: "var(--fg-50)" }}
      >
        Nothing in here yet. Have a browse or ask the AI stylist for a tailored
        suggestion.
      </p>
      <div className="flex items-center justify-center gap-3 mt-8">
        <Link
          href="/buy/ecommerce/shop"
          className="px-6 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] transition-all hover:scale-[1.03]"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          Browse shop
        </Link>
        <Link
          href="/buy/ecommerce/ai-tools"
          className="px-6 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] border transition-all"
          style={{
            borderColor: "var(--secondary)",
            color: "var(--secondary)",
            boxShadow: "0 0 0 1px rgba(var(--secondary-rgb),0.1), 0 0 18px rgba(var(--secondary-rgb),0.15)",
          }}
        >
          Ask the stylist
        </Link>
      </div>
    </div>
  );
}

function ConfirmationScreen({ total }: { total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 max-w-xl mx-auto"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: "rgba(var(--accent-rgb), 0.15)",
          color: "var(--accent)",
        }}
      >
        <EcomIcons.Check className="w-9 h-9" />
      </div>
      <h2
        className="font-montserrat font-black text-3xl md:text-4xl mt-6 tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        Thank you.
      </h2>
      <p
        className="font-montserrat text-base mt-4"
        style={{ color: "var(--fg-60)" }}
      >
        Your order of{" "}
        <span
          className="font-bold"
          style={{ color: "var(--fg)" }}
        >
          £{total.toFixed(2)}
        </span>{" "}
        is in. A confirmation is on its way to your inbox — dispatch by 3pm
        tomorrow.
      </p>
      <div className="flex items-center justify-center gap-3 mt-10">
        <Link
          href="/buy/ecommerce"
          className="px-6 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px]"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          Back to home
        </Link>
        <Link
          href="/buy/ecommerce/shop"
          className="px-6 py-3 rounded-xl font-montserrat text-[11px] font-bold uppercase tracking-[2px] border"
          style={{
            borderColor: "var(--border-card)",
            color: "var(--fg-70)",
          }}
        >
          Keep browsing
        </Link>
      </div>
    </motion.div>
  );
}

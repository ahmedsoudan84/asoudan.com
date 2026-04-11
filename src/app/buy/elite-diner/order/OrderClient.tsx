"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import { useCart } from "@/lib/elite-diner/cart-store";

export default function OrderClient() {
  const { items, addItem, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderType, setOrderType] = useState<"delivery" | "collection">("delivery");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    notes: ""
  });

  const subtotal = getTotal();
  const deliveryFee = orderType === "delivery" && subtotal < 50 ? 4.95 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    // In a real app, send data to backend or Stripe
  };

  if (orderComplete) {
    return (
      <div className="pt-40 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[600px] mx-auto text-center"
        >
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-accent mx-auto mb-8 shadow-2xl shadow-accent/20">
            <Icons.Check className="w-12 h-12" />
          </div>
          <h1 className="font-montserrat text-4xl md:text-5xl font-black mb-4">Order <span className="text-accent">Confirmed</span></h1>
          <p className="text-fg-60 mb-12 leading-relaxed">
            Your feast is being prepared by our chefs. A confirmation email has been sent to <span className="text-fg font-bold">{formData.email || "your email"}</span>. 
            Estimated {orderType === "delivery" ? "arrival" : "collection"} in 35-45 minutes.
          </p>
          
          <div className="p-8 rounded-[2rem] border overflow-hidden relative mb-12" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <h3 className="font-montserrat font-bold uppercase tracking-widest text-xs opacity-40 mb-6">Order Receipt</h3>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-fg-50">{item.quantity}x {item.name}</span>
                  <span className="font-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-between font-bold text-lg" style={{ borderColor: "var(--border-subtle)" }}>
                <span>Total Paid</span>
                <span className="text-accent">£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/buy/elite-diner"
            onClick={() => clearCart()}
            className="inline-flex px-10 py-4 rounded-xl font-montserrat text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[400px] mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-fg-05 flex items-center justify-center text-fg-20 mx-auto mb-8">
            <Icons.ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-montserrat text-3xl font-black mb-4">Your cart is <span className="opacity-30">empty</span></h1>
          <p className="text-fg-40 mb-10 leading-relaxed">
            It looks like you haven&apos;t added any exquisite dishes yet. Our menu is waiting for you.
          </p>
          <Link
            href="/buy/elite-diner/menu"
            className="inline-flex px-10 py-4 rounded-xl font-montserrat text-xs font-bold uppercase tracking-widest transition-all bg-accent"
            style={{ color: "var(--bg-primary)" }}
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-montserrat text-4xl md:text-6xl font-black mb-12">Your <span className="text-accent">Order</span></h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* ── Left: Cart Items ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex bg-surface rounded-2xl p-1 border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <button 
                  onClick={() => setOrderType("delivery")}
                  className={`flex-1 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    orderType === "delivery" ? "bg-accent shadow-lg" : "bg-fg-05 text-fg-40"
                  }`}
                  style={{ color: orderType === "delivery" ? "var(--bg-primary)" : "var(--fg-40)" }}
                >
                  Delivery
                </button>
                <button 
                  onClick={() => setOrderType("collection")}
                  className={`flex-1 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    orderType === "collection" ? "bg-accent shadow-lg" : "bg-fg-05 text-fg-40"
                  }`}
                  style={{ color: orderType === "collection" ? "var(--bg-primary)" : "var(--fg-40)" }}
                >
                  Collection
                </button>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className="flex items-center gap-6 p-4 rounded-3xl border group transition-all"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-montserrat font-bold text-lg mb-1 truncate">{item.name}</h3>
                    <p className="text-accent font-bold mb-3">£{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-fg-05 flex items-center justify-center hover:bg-fg-10 transition-colors"
                      >
                        <Icons.Minus className="w-3 h-3" />
                      </button>
                      <span className="font-montserrat font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => addItem(item)}
                         className="w-8 h-8 rounded-lg bg-fg-05 flex items-center justify-center hover:bg-fg-10 transition-colors"
                      >
                        <Icons.Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-fg-30 hover:text-red-500 transition-colors"
                  >
                    <Icons.Trash className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <div className="p-8 rounded-[2rem] border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
              <h2 className="font-montserrat font-bold text-2xl mb-8">Details</h2>
              <form onSubmit={handleCheckout} className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                </div>
                {orderType === "delivery" && (
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Delivery Address</label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-5 py-3 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)" }}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Postcode</label>
                  <input
                    required
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">Notes / Allergies</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-5 py-3 rounded-xl bg-tertiary border border-border-subtle focus:border-accent/40 outline-none font-montserrat text-sm resize-none"
                    style={{ background: "var(--bg-tertiary)" }}
                  />
                </div>
                <div className="sm:col-span-2 mt-4 text-center">
                   <p className="text-[10px] text-fg-30 mb-6 italic">* This is a demonstration shop. No real payments will be processed.</p>
                   <button
                    type="submit"
                    className="w-full py-5 rounded-2xl font-montserrat text-xs font-bold uppercase tracking-[2px] shadow-2xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                  >
                    Place Secure Order — £{total.toFixed(2)}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── Right: Summary ───────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-[2rem] border overflow-hidden relative" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
              <h2 className="font-montserrat font-bold text-xl mb-8">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-fg-50">Subtotal</span>
                  <span className="font-bold font-montserrat">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-fg-50">{orderType === "delivery" ? "Delivery Fee" : "Collection Fee"}</span>
                  <span className="font-bold font-montserrat text-green-500">
                    {deliveryFee > 0 ? `£${deliveryFee.toFixed(2)}` : "FREE"}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-fg-30 leading-tight">Free delivery on orders over £50</p>
                )}
                <div className="pt-4 border-t flex justify-between items-end" style={{ borderColor: "var(--border-subtle)" }}>
                   <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 block mb-1">Final Total</span>
                    <span className="text-3xl font-montserrat font-black text-accent">£{total.toFixed(2)}</span>
                   </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex items-start gap-3">
                <Icons.Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-[10px] text-accent/80 leading-relaxed font-bold uppercase tracking-wider">
                  Order now to earn 420 Elite Reward points on this purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

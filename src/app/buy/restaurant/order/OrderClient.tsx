"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuItem } from "@/lib/restaurant/menu";
import FloatingNav from "@/components/layout/FloatingNav";
import Footer from "@/components/sections/Footer";
import { Plus, Minus, Trash2, ShoppingBag, MapPin, Clock, Check, Sparkles, X, ChevronRight } from "lucide-react";

interface CartItem extends MenuItem {
  quantity: number;
}

const ORDER_TYPES = ["Delivery", "Takeaway"] as const;

export default function OrderClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<typeof ORDER_TYPES[number]>("Delivery");
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", postcode: "", notes: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("elite-diner-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("elite-diner-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("elite-diner-cart");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === "Delivery" && subtotal < 40 ? 4.99 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 1) {
      setCheckoutStep(2);
    } else if (checkoutStep === 2) {
      setOrderPlaced(true);
    }
  };

  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <FloatingNav />

      {/* Header */}
      <section className="pt-28 pb-8 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/buy/restaurant" className="text-sm font-montserrat" style={{ color: "var(--fg-50)" }}>
            ← Back to Elite Diner
          </Link>
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-4" style={{ color: "var(--fg)" }}>
            Your Order
          </h1>
          <p className="mt-2" style={{ color: "var(--fg-50)" }}>
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {cart.length === 0 && !orderPlaced ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: "var(--fg-30)" }} />
              <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                Your cart is empty
              </h2>
              <p className="mt-2 mb-6" style={{ color: "var(--fg-50)" }}>
                Browse our menu and add your favourite dishes
              </p>
              <Link
                href="/buy/restaurant/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
                style={{ background: "#fbbf24", color: "#000" }}
              >
                Browse Menu <ChevronRight size={18} />
              </Link>
            </div>
          ) : orderPlaced ? (
            <motion.div
              className="text-center py-16 rounded-2xl"
              style={{ background: "var(--bg-surface)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                <Check size={32} style={{ color: "#10b981" }} />
              </div>
              <h2 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
                Order Confirmed!
              </h2>
              <p className="mt-2" style={{ color: "var(--fg-50)" }}>
                Your order has been placed. You'll receive a confirmation email shortly.
              </p>
              <div className="mt-8 p-4 rounded-xl text-left" style={{ background: "var(--bg-secondary)" }}>
                <h3 className="font-montserrat font-semibold mb-2" style={{ color: "var(--fg)" }}>Order Summary</h3>
                <p className="text-sm" style={{ color: "var(--fg-50)" }}>Order #{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
                <p className="text-sm mt-1" style={{ color: "var(--fg-50)" }}>{orderType} to {formData.address || "Pickup"}</p>
              </div>
              <Link
                href="/buy/restaurant"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
                style={{ background: "#fbbf24", color: "#000" }}
              >
                Order More
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-[1fr,380px] gap-8">
              {/* Cart Items */}
              <div>
                {/* Order Type Toggle */}
                <div className="flex gap-2 mb-6">
                  {ORDER_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-colors"
                      style={{
                        background: orderType === type ? "#fbbf24" : "var(--bg-secondary)",
                        color: orderType === type ? "#000" : "var(--fg-60)",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl"
                      style={{ background: "var(--bg-surface)" }}
                      layout
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-montserrat font-semibold" style={{ color: "var(--fg)" }}>
                          {item.name}
                        </h3>
                        <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                          £{item.price} each
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: "var(--bg-secondary)", color: "var(--fg)" }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-montserrat font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: "var(--bg-secondary)", color: "var(--fg)" }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-montserrat font-bold" style={{ color: "#fbbf24" }}>
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="block mt-2 p-2 rounded-lg transition-colors"
                          style={{ color: "var(--fg-40)" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/buy/restaurant/menu"
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg font-montserrat text-sm"
                  style={{ color: "var(--fg-50)" }}
                >
                  <Plus size={16} /> Add more items
                </Link>
              </div>

              {/* Checkout */}
              <div>
                <div className="sticky top-24 p-6 rounded-xl" style={{ background: "var(--bg-surface)" }}>
                  <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                    Order Summary
                  </h3>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "var(--fg-50)" }}>Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    {orderType === "Delivery" && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--fg-50)" }}>
                          Delivery {subtotal < 40 && <span className="text-xs">(Free over £40)</span>}
                        </span>
                        <span>£{deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 mt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                      <span className="font-montserrat font-bold" style={{ color: "var(--fg)" }}>Total</span>
                      <span className="font-montserrat font-bold text-lg" style={{ color: "#fbbf24" }}>
                        £{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full mt-6 py-4 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02]"
                    style={{ background: "#fbbf24", color: "#000" }}
                  >
                    Proceed to Checkout
                  </button>

                  <p className="text-xs text-center mt-3" style={{ color: "var(--fg-40)" }}>
                    Demo only — no real payment
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !orderPlaced && setShowCheckout(false)}
          >
            <div className="absolute inset-0 bg-black/80" />
            <motion.div
              className="relative max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6"
              style={{ background: "var(--bg-surface)" }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 p-2 rounded-full"
                style={{ background: "var(--bg-tertiary)" }}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}>
                  <Sparkles size={12} /> Checkout
                </span>
                <span className="text-sm" style={{ color: "var(--fg-40)" }}>
                  Step {checkoutStep} of 2
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                {checkoutStep === 1 && (
                  <>
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      Your Details
                    </h2>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl font-montserrat"
                          style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl font-montserrat"
                          style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl font-montserrat"
                          style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                        />
                      </div>
                      {orderType === "Delivery" && (
                        <>
                          <div>
                            <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                              Address *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.address}
                              onChange={e => setFormData({ ...formData, address: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl font-montserrat"
                              style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                                City *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl font-montserrat"
                                style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                                Postcode *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.postcode}
                                onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl font-montserrat"
                                style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div>
                        <label className="block text-sm font-montserrat mb-1" style={{ color: "var(--fg-50)" }}>
                          Notes (optional)
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={e => setFormData({ ...formData, notes: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl font-montserrat"
                          style={{ background: "var(--bg-secondary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {checkoutStep === 2 && (
                  <>
                    <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>
                      Confirm Order
                    </h2>

                    <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                      <h3 className="font-montserrat font-semibold mb-2" style={{ color: "var(--fg)" }}>
                        Delivery to:
                      </h3>
                      <p className="text-sm" style={{ color: "var(--fg-50)" }}>
                        {formData.name}<br />
                        {orderType === "Delivery" ? (
                          <>
                            {formData.address}<br />
                            {formData.city}, {formData.postcode}
                          </>
                        ) : (
                          "Elite Diner, 123 Culinary Lane, Soho"
                        )}
                      </p>
                    </div>

                    <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                      <h3 className="font-montserrat font-semibold mb-2" style={{ color: "var(--fg)" }}>
                        Order items:
                      </h3>
                      <div className="text-sm space-y-1" style={{ color: "var(--fg-50)" }}>
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 mt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                          <span className="font-semibold">Total</span>
                          <span className="font-bold" style={{ color: "#fbbf24" }}>£{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  style={{ background: "#fbbf24", color: "#000" }}
                >
                  {checkoutStep === 1 ? "Continue" : "Place Order"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
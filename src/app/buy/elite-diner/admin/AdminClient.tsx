"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems as staticMenuItems, type MenuItem } from "@/lib/elite-diner/menu-data";
import {
  getReservations,
  getDinerOrders,
  updateDinerOrderStatus,
  updateReservationStatus,
  getRestaurantSettings,
  saveRestaurantSettings,
  getMenuAvailability,
  setMenuAvailability,
  getCustomMenuItems,
  addCustomMenuItem,
  deleteCustomMenuItem,
  type Reservation,
  type DinerOrder,
  type RestaurantSettings,
} from "@/lib/elite-diner/storage";

const ADMIN_PASSWORD = "elitediner2024";

const DIETARY_OPTIONS = ["vegetarian", "vegan", "gluten-free", "popular", "chef-special"];

type Tab = "dashboard" | "orders" | "reservations" | "menu" | "settings";

const BLANK_ITEM: Partial<MenuItem> = {
  name: "",
  category: "starters",
  price: 0,
  description: "",
  image: "",
  dietaryTags: [],
  allergens: [],
  calories: 0,
  pairing: "",
};

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const [orders, setOrders] = useState<DinerOrder[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings>(getRestaurantSettings());
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<MenuItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>(BLANK_ITEM);

  const allMenuItems = [...staticMenuItems, ...customItems];

  useEffect(() => {
    if (!authenticated) return;
    setOrders(getDinerOrders());
    setReservations(getReservations());
    setSettings(getRestaurantSettings());
    setAvailability(getMenuAvailability());
    setCustomItems(getCustomMenuItems());
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleOrderStatus = (id: string, status: DinerOrder["status"]) => {
    updateDinerOrderStatus(id, status);
    setOrders(getDinerOrders());
  };

  const handleReservationStatus = (id: string, status: Reservation["status"]) => {
    updateReservationStatus(id, status);
    setReservations(getReservations());
  };

  const toggleAvailability = (slug: string) => {
    const next = { ...availability, [slug]: availability[slug] === false ? true : false };
    setAvailability(next);
    setMenuAvailability(next);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (newItem.name || "item").toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const item: MenuItem = {
      id: `custom-${Date.now()}`,
      slug,
      name: newItem.name || "",
      description: newItem.description || "",
      price: newItem.price || 0,
      category: (newItem.category as MenuItem["category"]) || "starters",
      dietaryTags: newItem.dietaryTags || [],
      image: newItem.image || "",
      allergens: newItem.allergens || [],
      calories: newItem.calories || 0,
      pairing: newItem.pairing || "",
    };
    addCustomMenuItem(item);
    setCustomItems(getCustomMenuItems());
    setShowAddModal(false);
    setNewItem(BLANK_ITEM);
  };

  const handleDeleteCustomItem = (id: string) => {
    if (!confirm("Remove this custom item?")) return;
    deleteCustomMenuItem(id);
    setCustomItems(getCustomMenuItems());
  };

  const toggleDietaryTag = (tag: string) => {
    const current = newItem.dietaryTags || [];
    setNewItem({
      ...newItem,
      dietaryTags: current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag],
    });
  };

  // ── Login ──────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg-primary)" }}>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 rounded-2xl border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <h1 className="font-montserrat text-2xl font-bold text-center mb-2" style={{ color: "var(--fg)" }}>
            Merchant Portal
          </h1>
          <p className="font-montserrat text-xs text-center mb-6" style={{ color: "var(--fg-40)" }}>
            Password:{" "}
            <code className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "var(--fg-06)", color: "var(--accent)" }}>
              elitediner2024
            </code>
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none mb-4"
            style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
          />
          {error && <p className="font-montserrat text-xs mb-3" style={{ color: "#ff6b6b" }}>{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            Sign In
          </button>
        </motion.form>
      </div>
    );
  }

  // ── Dashboard stats ────────────────────────────────────
  const activeOrders = orders.filter((o) => o.status === "Preparing" || o.status === "Ready").length;
  const totalRevenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const confirmedRes = reservations.filter((r) => r.status === "Confirmed").length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayRes = reservations.filter((r) => r.date === todayStr && r.status === "Confirmed").length;

  const TABS: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Orders" },
    { id: "reservations", label: "Reservations" },
    { id: "menu", label: "Menu" },
    { id: "settings", label: "Settings" },
  ];

  const statusColour: Record<DinerOrder["status"], string> = {
    Preparing: "#f59e0b",
    Ready: "#10b981",
    Delivered: "var(--fg-40)",
    Cancelled: "#ef4444",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
            Merchant Portal
          </h1>
          <button onClick={() => setAuthenticated(false)} className="font-montserrat text-xs uppercase tracking-wider" style={{ color: "var(--fg-40)" }}>
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl overflow-x-auto" style={{ background: "var(--fg-06)" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2.5 rounded-lg font-montserrat text-xs uppercase tracking-[2px] transition-all whitespace-nowrap px-3"
              style={{
                background: activeTab === tab.id ? "var(--bg-surface)" : "transparent",
                color: activeTab === tab.id ? "var(--accent)" : "var(--fg-40)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Dashboard ─────────────────────────────────── */}
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", value: `£${totalRevenue.toFixed(0)}` },
                  { label: "Active Orders", value: activeOrders },
                  { label: "Today's Tables", value: todayRes },
                  { label: "Confirmed Bookings", value: confirmedRes },
                ].map((s) => (
                  <div key={s.label} className="p-5 rounded-xl border text-center" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                    <div className="font-montserrat text-3xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</div>
                    <div className="font-montserrat text-[10px] uppercase tracking-[2px] mt-1" style={{ color: "var(--fg-40)" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Recent Orders</h3>
                {orders.length === 0 ? (
                  <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>No orders yet. Place an order to see data here.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice().reverse().slice(0, 5).map((o) => (
                      <div key={o.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                        <div>
                          <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>{o.id} — {o.customer}</p>
                          <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>£{o.total.toFixed(2)}</p>
                          <span className="font-montserrat text-[10px] font-bold" style={{ color: statusColour[o.status] }}>{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Upcoming Reservations</h3>
                {confirmedRes === 0 ? (
                  <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>No reservations yet. Book a table to see data here.</p>
                ) : (
                  <div className="space-y-3">
                    {reservations.filter((r) => r.status === "Confirmed").slice().reverse().slice(0, 5).map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                        <div>
                          <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>{r.name}</p>
                          <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                            {r.date} at {r.time} · {r.partySize} guests{r.occasion ? ` · ${r.occasion}` : ""}
                          </p>
                        </div>
                        <span className="font-montserrat text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(0,241,241,0.12)", color: "var(--accent)" }}>Confirmed</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Orders ──────────────────────────────────── */}
          {activeTab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="font-montserrat text-sm font-bold mb-6" style={{ color: "var(--fg)" }}>
                {orders.length} Order{orders.length !== 1 ? "s" : ""}
              </h3>
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>No orders yet. Place an order through the Order page.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice().reverse().map((o) => (
                    <div key={o.id} className="p-5 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>{o.id} — {o.customer}</p>
                          <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-50)" }}>{o.email} · {o.type}</p>
                          <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-40)" }}>{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</p>
                          <p className="font-montserrat text-[10px] mt-1" style={{ color: "var(--fg-30)" }}>{o.date}</p>
                        </div>
                        <div className="shrink-0 text-right flex flex-col items-end gap-2">
                          <p className="font-montserrat font-bold text-lg" style={{ color: "var(--fg)" }}>£{o.total.toFixed(2)}</p>
                          <select
                            value={o.status}
                            onChange={(e) => handleOrderStatus(o.id, e.target.value as DinerOrder["status"])}
                            className="px-3 py-1.5 rounded-lg border text-[10px] font-montserrat font-bold uppercase outline-none"
                            style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: statusColour[o.status] }}
                          >
                            <option value="Preparing">Preparing</option>
                            <option value="Ready">Ready</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Reservations ────────────────────────────── */}
          {activeTab === "reservations" && (
            <motion.div key="reservations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="font-montserrat text-sm font-bold mb-6" style={{ color: "var(--fg)" }}>
                {reservations.length} Reservation{reservations.length !== 1 ? "s" : ""}
              </h3>
              {reservations.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>No reservations yet. Book a table through the Book page.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reservations.slice().reverse().map((r) => (
                    <div key={r.id} className="flex items-center gap-4 p-5 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                      <div className="flex-1 min-w-0">
                        <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>{r.name}</p>
                        <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-50)" }}>{r.email}</p>
                        <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-40)" }}>
                          {r.date} at {r.time} · {r.partySize} guest{r.partySize !== 1 ? "s" : ""}{r.occasion ? ` · ${r.occasion}` : ""}
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <span
                          className="font-montserrat text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{
                            background: r.status === "Confirmed" ? "rgba(0,241,241,0.12)" : "rgba(239,68,68,0.12)",
                            color: r.status === "Confirmed" ? "var(--accent)" : "#ef4444",
                          }}
                        >
                          {r.status}
                        </span>
                        {r.status === "Confirmed" && (
                          <button onClick={() => handleReservationStatus(r.id, "Cancelled")} className="font-montserrat text-[10px] uppercase tracking-wider" style={{ color: "#ef4444" }}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Menu ────────────────────────────────────── */}
          {activeTab === "menu" && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                  Toggle availability or add new items. Changes apply only in your browser.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider shrink-0 ml-4"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  + Add Item
                </button>
              </div>

              {(["starters", "mains", "desserts", "drinks", "wine"] as MenuItem["category"][]).map((cat) => {
                const items = allMenuItems.filter((m) => m.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat} className="mb-8">
                    <h3 className="font-montserrat text-xs font-bold uppercase tracking-[3px] mb-3" style={{ color: "var(--accent)" }}>
                      {cat}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const available = availability[item.slug] !== false;
                        const isCustom = item.id.startsWith("custom-");
                        return (
                          <div
                            key={item.slug}
                            className="flex items-center gap-4 p-4 rounded-xl border group"
                            style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", opacity: available ? 1 : 0.5 }}
                          >
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                            ) : (
                              <div className="w-12 h-12 rounded-lg shrink-0" style={{ background: "var(--fg-06)" }} />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-montserrat text-sm font-semibold truncate" style={{ color: "var(--fg)" }}>{item.name}</p>
                                {isCustom && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0" style={{ background: "rgba(var(--secondary-rgb),0.15)", color: "var(--secondary)" }}>Custom</span>
                                )}
                              </div>
                              <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                                £{item.price.toFixed(2)}{item.dietaryTags.length > 0 ? ` · ${item.dietaryTags.join(", ")}` : ""}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              {isCustom && (
                                <button
                                  onClick={() => handleDeleteCustomItem(item.id)}
                                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10"
                                  style={{ color: "#ef4444" }}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
                                </button>
                              )}
                              <button
                                onClick={() => toggleAvailability(item.slug)}
                                className="w-12 h-6 rounded-full transition-colors relative shrink-0"
                                style={{ background: available ? "var(--accent)" : "var(--fg-15)" }}
                                aria-label={available ? "Mark unavailable" : "Mark available"}
                              >
                                <span
                                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                                  style={{ left: available ? "calc(100% - 1.375rem)" : "0.125rem" }}
                                />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ── Settings ────────────────────────────────── */}
          {activeTab === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="p-8 rounded-xl border space-y-6" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>Restaurant Details</h3>
                {(
                  [
                    { key: "name" as const, label: "Restaurant Name" },
                    { key: "tagline" as const, label: "Tagline" },
                    { key: "phone" as const, label: "Phone" },
                    { key: "email" as const, label: "Email" },
                    { key: "address" as const, label: "Address" },
                  ] as { key: keyof RestaurantSettings; label: string }[]
                ).map(({ key, label }) => (
                  <div key={key}>
                    <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>{label}</label>
                    <input
                      type="text"
                      value={settings[key]}
                      onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => saveRestaurantSettings(settings)}
                  className="px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Save Settings
                </button>
                <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-30)" }}>
                  Settings are stored in your browser's localStorage — changes are private to you.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Add Item Modal ─────────────────────────────── */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto p-8 rounded-2xl border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <h2 className="font-montserrat text-xl font-bold mb-6" style={{ color: "var(--fg)" }}>Add Menu Item</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--fg-40)" }}>Item Name *</label>
                    <input
                      required
                      className="w-full px-4 py-2.5 rounded-lg outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--fg-40)" }}>Category *</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem["category"] })}
                    >
                      <option value="starters">Starters</option>
                      <option value="mains">Mains</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks</option>
                      <option value="wine">Wine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--fg-40)" }}>Price (£) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2.5 rounded-lg outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      value={newItem.price || ""}
                      onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--fg-40)" }}>Description</label>
                    <textarea
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg outline-none font-montserrat text-sm resize-none"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--fg-40)" }}>Image URL</label>
                    <input
                      type="url"
                      className="w-full px-4 py-2.5 rounded-lg outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      placeholder="https://..."
                      value={newItem.image}
                      onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    />
                    {newItem.image && (
                      <div className="mt-2 h-24 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-subtle)" }}>
                        <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Dietary Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {DIETARY_OPTIONS.map((tag) => {
                        const active = (newItem.dietaryTags || []).includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleDietaryTag(tag)}
                            className="px-3 py-1 rounded-full text-[10px] font-montserrat font-semibold uppercase tracking-wider transition-all"
                            style={{
                              background: active ? "var(--accent)" : "var(--fg-06)",
                              color: active ? "var(--bg-primary)" : "var(--fg-50)",
                              border: `1px solid ${active ? "var(--accent)" : "var(--border-subtle)"}`,
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setNewItem(BLANK_ITEM); }}
                    className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider border"
                    style={{ borderColor: "var(--border-card)", color: "var(--fg-60)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                  >
                    Add to Menu
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

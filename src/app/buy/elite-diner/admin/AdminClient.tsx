"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuItem } from "@/lib/elite-diner/menu-data";
import {
  getReservations,
  getDinerOrders,
  updateDinerOrderStatus,
  updateReservationStatus,
  getRestaurantSettings,
  saveRestaurantSettings,
  type Reservation,
  type DinerOrder,
  type RestaurantSettings,
} from "@/lib/elite-diner/storage";

const ADMIN_PASSWORD = "elitediner2024";

type Tab = "dashboard" | "orders" | "reservations" | "menu" | "settings";

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const [orders, setOrders] = useState<DinerOrder[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings>(getRestaurantSettings());
  const [menuAvailability, setMenuAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!authenticated) return;
    setOrders(getDinerOrders());
    setReservations(getReservations());
    setSettings(getRestaurantSettings());
    try {
      const stored = JSON.parse(localStorage.getItem("elite-diner-availability") || "{}");
      setMenuAvailability(stored);
    } catch { /* empty */ }
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
    const next = { ...menuAvailability, [slug]: !menuAvailability[slug] };
    setMenuAvailability(next);
    localStorage.setItem("elite-diner-availability", JSON.stringify(next));
  };

  const handleSaveSettings = () => {
    saveRestaurantSettings(settings);
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
            <code
              className="px-1.5 py-0.5 rounded text-[10px]"
              style={{ background: "var(--fg-06)", color: "var(--accent)" }}
            >
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
          {error && (
            <p className="font-montserrat text-xs mb-3" style={{ color: "#ff6b6b" }}>
              {error}
            </p>
          )}
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

  // ── Dashboard Stats ────────────────────────────────────
  const activeOrders = orders.filter((o) => o.status === "Preparing" || o.status === "Ready").length;
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);
  const confirmedReservations = reservations.filter((r) => r.status === "Confirmed").length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayReservations = reservations.filter((r) => r.date === todayStr && r.status === "Confirmed").length;

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
          <button
            onClick={() => setAuthenticated(false)}
            className="font-montserrat text-xs uppercase tracking-wider"
            style={{ color: "var(--fg-40)" }}
          >
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

        {/* ── Dashboard ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", value: `£${totalRevenue.toFixed(0)}` },
                  { label: "Active Orders", value: activeOrders },
                  { label: "Today's Tables", value: todayReservations },
                  { label: "Confirmed Bookings", value: confirmedReservations },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-5 rounded-xl border text-center"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                  >
                    <div className="font-montserrat text-3xl font-bold" style={{ color: "var(--accent)" }}>
                      {s.value}
                    </div>
                    <div
                      className="font-montserrat text-[10px] uppercase tracking-[2px] mt-1"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="p-6 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                  Recent Orders
                </h3>
                {orders.length === 0 ? (
                  <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                    No orders yet. Place an order to see data here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice().reverse().slice(0, 5).map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between py-2 border-b"
                        style={{ borderColor: "var(--border-subtle)" }}
                      >
                        <div>
                          <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>
                            {o.id} — {o.customer}
                          </p>
                          <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                            {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                          </p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>
                            £{o.total.toFixed(2)}
                          </p>
                          <span className="font-montserrat text-[10px] font-bold" style={{ color: statusColour[o.status] }}>
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming Reservations */}
              <div className="p-6 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                  Upcoming Reservations
                </h3>
                {reservations.filter((r) => r.status === "Confirmed").length === 0 ? (
                  <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                    No reservations yet. Book a table to see data here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {reservations
                      .filter((r) => r.status === "Confirmed")
                      .slice().reverse().slice(0, 5)
                      .map((r) => (
                        <div
                          key={r.id}
                          className="flex items-center justify-between py-2 border-b"
                          style={{ borderColor: "var(--border-subtle)" }}
                        >
                          <div>
                            <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>
                              {r.name}
                            </p>
                            <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                              {r.date} at {r.time} · {r.partySize} guests{r.occasion ? ` · ${r.occasion}` : ""}
                            </p>
                          </div>
                          <span
                            className="font-montserrat text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{ background: "rgba(0,241,241,0.12)", color: "var(--accent)" }}
                          >
                            Confirmed
                          </span>
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
                  <p className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>
                    No orders yet. Place an order through the Order page.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice().reverse().map((o) => (
                    <div
                      key={o.id}
                      className="p-5 rounded-xl border"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>
                            {o.id} — {o.customer}
                          </p>
                          <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-50)" }}>
                            {o.email} · {o.type}
                          </p>
                          <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-40)" }}>
                            {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                          </p>
                          <p className="font-montserrat text-[10px] mt-1" style={{ color: "var(--fg-30)" }}>
                            {o.date}
                          </p>
                        </div>
                        <div className="shrink-0 text-right flex flex-col items-end gap-2">
                          <p className="font-montserrat font-bold text-lg" style={{ color: "var(--fg)" }}>
                            £{o.total.toFixed(2)}
                          </p>
                          <select
                            value={o.status}
                            onChange={(e) => handleOrderStatus(o.id, e.target.value as DinerOrder["status"])}
                            className="px-3 py-1.5 rounded-lg border text-[10px] font-montserrat font-bold uppercase outline-none transition-all"
                            style={{
                              background: "var(--bg-primary)",
                              borderColor: "var(--border-subtle)",
                              color: statusColour[o.status],
                            }}
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
                  <p className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>
                    No reservations yet. Book a table through the Book page.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reservations.slice().reverse().map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center gap-4 p-5 rounded-xl border"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>
                          {r.name}
                        </p>
                        <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-50)" }}>
                          {r.email}
                        </p>
                        <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-40)" }}>
                          {r.date} at {r.time} · {r.partySize} guest{r.partySize !== 1 ? "s" : ""}
                          {r.occasion ? ` · ${r.occasion}` : ""}
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
                          <button
                            onClick={() => handleReservationStatus(r.id, "Cancelled")}
                            className="font-montserrat text-[10px] uppercase tracking-wider transition-colors"
                            style={{ color: "#ef4444" }}
                          >
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
              <p className="font-montserrat text-xs mb-6" style={{ color: "var(--fg-40)" }}>
                Toggle item availability. Unavailable items are hidden from customers.
              </p>
              {(["starters", "mains", "desserts", "drinks", "wine"] as MenuItem["category"][]).map((cat) => {
                const items = menuItems.filter((m) => m.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat} className="mb-8">
                    <h3
                      className="font-montserrat text-xs font-bold uppercase tracking-[3px] mb-3"
                      style={{ color: "var(--accent)" }}
                    >
                      {cat}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const available = menuAvailability[item.slug] !== false;
                        return (
                          <div
                            key={item.slug}
                            className="flex items-center gap-4 p-4 rounded-xl border"
                            style={{
                              background: "var(--bg-surface)",
                              borderColor: "var(--border-card)",
                              opacity: available ? 1 : 0.5,
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-montserrat text-sm font-semibold truncate" style={{ color: "var(--fg)" }}>
                                {item.name}
                              </p>
                              <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                                £{item.price.toFixed(2)}
                                {item.dietaryTags.length > 0 && ` · ${item.dietaryTags.join(", ")}`}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleAvailability(item.slug)}
                              className="shrink-0 w-12 h-6 rounded-full transition-colors relative"
                              style={{ background: available ? "var(--accent)" : "var(--fg-15)" }}
                              aria-label={available ? "Mark unavailable" : "Mark available"}
                            >
                              <span
                                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                                style={{ left: available ? "calc(100% - 1.375rem)" : "0.125rem" }}
                              />
                            </button>
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
              <div
                className="p-8 rounded-xl border space-y-6"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                  Restaurant Details
                </h3>
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
                    <label
                      className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2"
                      style={{ color: "var(--fg-40)" }}
                    >
                      {label}
                    </label>
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
                  onClick={handleSaveSettings}
                  className="px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Save Settings
                </button>
                <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-30)" }}>
                  Settings are stored in localStorage. In production, these would sync to your backend.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

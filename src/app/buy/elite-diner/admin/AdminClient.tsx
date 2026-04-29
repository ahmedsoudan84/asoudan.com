"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/elite-diner/Icons";
import {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getReservations,
  updateReservationStatus,
  deleteReservation,
  getDinerOrders,
  updateOrderStatus,
  type Reservation,
  type DinerOrder,
} from "@/lib/elite-diner/storage";
import { categories, categoryLabels, type MenuItem } from "@/lib/elite-diner/menu-data";

const ADMIN_PASSWORD = "elitediner2024";

type Tab = "dashboard" | "menu" | "reservations" | "orders";

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<DinerOrder[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const blankItem: Partial<MenuItem> = {
    name: "",
    description: "",
    price: 0,
    category: "starters",
    dietaryTags: [],
    image: "/images/menu/scallops.png",
    allergens: [],
    calories: 0,
    pairing: "",
  };
  const [draft, setDraft] = useState<Partial<MenuItem>>(blankItem);

  const refresh = () => {
    setMenu(getAllMenuItems());
    setReservations(getReservations());
    setOrders(getDinerOrders());
  };

  useEffect(() => {
    if (authenticated) refresh();
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

  const openAdd = () => {
    setEditingSlug(null);
    setDraft(blankItem);
    setShowAddModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingSlug(item.slug);
    setDraft({ ...item });
    setShowAddModal(true);
  };

  const saveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlug) {
      updateMenuItem(editingSlug, draft);
    } else {
      const slug = (draft.name || "dish").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const item: MenuItem = {
        id: `c-${Date.now()}`,
        slug,
        name: draft.name || "Untitled dish",
        description: draft.description || "",
        price: Number(draft.price) || 0,
        category: (draft.category as MenuItem["category"]) || "starters",
        dietaryTags: draft.dietaryTags || [],
        image: draft.image || "/images/menu/scallops.png",
        allergens: draft.allergens || [],
        calories: Number(draft.calories) || 0,
        pairing: draft.pairing || "",
      };
      addMenuItem(item);
    }
    setShowAddModal(false);
    refresh();
  };

  const removeItem = (slug: string) => {
    if (confirm("Remove this menu item?")) {
      deleteMenuItem(slug);
      refresh();
    }
  };

  const setRStatus = (id: string, status: Reservation["status"]) => {
    updateReservationStatus(id, status);
    refresh();
  };

  const setOStatus = (id: string, status: DinerOrder["status"]) => {
    updateOrderStatus(id, status);
    refresh();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl border shadow-2xl"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-5 flex items-center justify-center">
              <Icons.ChefHat className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-3xl font-montserrat font-black tracking-tight">Elite Diner Admin</h1>
            <p className="text-sm mt-2 font-montserrat opacity-50">Enter password to access the kitchen panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent"
              style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
            />
            {error && <p className="text-red-500 text-xs text-center font-montserrat">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/buy/elite-diner" className="text-xs font-montserrat opacity-40 hover:opacity-100 underline">
              Back to restaurant
            </Link>
          </div>
          <p className="mt-4 text-[10px] text-center opacity-30 font-montserrat">Demo password: elitediner2024</p>
        </motion.div>
      </div>
    );
  }

  const todayOrders = orders.filter((o) => o.status !== "Cancelled" && o.status !== "Delivered" && o.status !== "Collected").length;
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const pendingReservations = reservations.filter((r) => r.status === "Pending").length;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      <aside className="w-64 border-r hidden md:flex flex-col p-6" style={{ borderColor: "var(--border-subtle)" }}>
        <h2 className="text-xl font-montserrat font-black mb-1">Elite Diner</h2>
        <p className="text-[10px] opacity-40 font-bold uppercase tracking-[2px] mb-10">Kitchen Panel</p>
        <nav className="space-y-2">
          {(["dashboard", "menu", "reservations", "orders"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="w-full text-left px-4 py-3 rounded-xl font-montserrat text-sm font-bold capitalize transition-all"
              style={{
                background: tab === t ? "rgba(var(--accent-rgb), 0.1)" : "transparent",
                color: tab === t ? "var(--accent)" : "var(--fg-40)",
              }}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <Link href="/buy/elite-diner" className="block px-4 py-2 text-xs font-montserrat opacity-50 hover:opacity-100 transition">
            ← Back to site
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full text-left px-4 py-3 rounded-xl font-montserrat text-sm text-red-500 hover:bg-red-500/10 transition-all"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-montserrat font-black capitalize">{tab}</h1>
            <p className="text-sm font-montserrat opacity-40">Manage Elite Diner in real-time</p>
          </div>
          {tab === "menu" && (
            <button
              onClick={openAdd}
              className="px-6 py-3 rounded-xl font-montserrat font-bold uppercase tracking-[1.5px] text-[11px]"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              + New Dish
            </button>
          )}
        </header>

        {tab === "dashboard" && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Active Orders", value: todayOrders, change: "Live" },
                { label: "Revenue (all-time)", value: `£${revenue.toLocaleString()}`, change: "+12.5%" },
                { label: "Reservations", value: reservations.length, change: `${pendingReservations} pending` },
                { label: "Menu Items", value: menu.length, change: "Live" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <p className="text-xs font-montserrat font-bold uppercase tracking-[2px] opacity-40">{stat.label}</p>
                  <div className="flex items-end justify-between mt-4">
                    <span className="text-3xl font-montserrat font-black">{stat.value}</span>
                    <span className="text-[10px] font-montserrat font-bold text-green-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <h3 className="text-lg font-montserrat font-black mb-6">Active orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-accent/20 hover:bg-accent/5 transition">
                      <div>
                        <p className="font-montserrat font-bold text-sm">{o.id} — {o.customer}</p>
                        <p className="text-xs opacity-40">{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-montserrat font-bold text-sm">£{o.total}</p>
                        <span className="text-[10px] font-bold uppercase tracking-[1px] text-accent">{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <h3 className="text-lg font-montserrat font-black mb-6">Upcoming reservations</h3>
                <div className="space-y-3">
                  {reservations.slice(0, 5).map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-accent/20 hover:bg-accent/5 transition">
                      <div>
                        <p className="font-montserrat font-bold text-sm">{r.name} · {r.guests} guests</p>
                        <p className="text-xs opacity-40">{r.date} @ {r.time}{r.notes ? ` — ${r.notes}` : ""}</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[1px] text-accent">{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((m) => (
              <div key={m.slug} className="group p-4 rounded-3xl border flex flex-col" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-fg-05">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button onClick={() => openEdit(m)} className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest">Edit</button>
                    <button onClick={() => removeItem(m.slug)} className="px-4 py-2 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-widest">Delete</button>
                  </div>
                </div>
                <h3 className="font-montserrat font-bold">{m.name}</h3>
                <p className="text-xs mt-1 opacity-50 line-clamp-2">{m.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[1px] px-2 py-1 rounded-full bg-fg-05">{categoryLabels[m.category]}</span>
                  <span className="font-montserrat font-black">£{m.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "reservations" && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="p-20 text-center rounded-3xl border border-dashed opacity-50" style={{ borderColor: "var(--border-subtle)" }}>
                No reservations yet.
              </div>
            ) : (
              reservations.map((r) => (
                <div key={r.id} className="p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-montserrat font-black">{r.id}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[1px] bg-fg-05 text-accent">{r.status}</span>
                    </div>
                    <p className="text-sm font-montserrat font-bold">{r.name} <span className="opacity-40 font-normal">· {r.guests} guests</span></p>
                    <p className="text-xs opacity-60">{r.date} @ {r.time} · {r.email} · {r.phone}</p>
                    {r.notes && <p className="text-xs opacity-50 italic">"{r.notes}"</p>}
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={r.status}
                      onChange={(e) => setRStatus(r.id, e.target.value as Reservation["status"])}
                      className="px-3 py-2 rounded-lg border text-[10px] font-bold uppercase outline-none focus:border-accent"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Seated">Seated</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => { if (confirm("Delete this reservation?")) { deleteReservation(r.id); refresh(); } }}
                      className="px-3 py-2 rounded-lg border text-[10px] font-bold uppercase text-red-500 hover:bg-red-500/10"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-montserrat font-black">{o.id}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[1px] bg-fg-05 text-accent">{o.type}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[1px] bg-fg-05">{o.status}</span>
                  </div>
                  <p className="text-sm font-montserrat font-bold">{o.customer}</p>
                  <p className="text-xs opacity-60">{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</p>
                  <p className="text-[10px] opacity-40">{o.date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xl font-montserrat font-black">£{o.total}</p>
                  <select
                    value={o.status}
                    onChange={(e) => setOStatus(o.id, e.target.value as DinerOrder["status"])}
                    className="px-3 py-2 rounded-lg border text-[10px] font-bold uppercase outline-none focus:border-accent"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Collected">Collected</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[101] p-8 rounded-[40px] border max-h-[90vh] overflow-y-auto"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <h2 className="text-2xl font-montserrat font-black mb-6">{editingSlug ? "Edit dish" : "New dish"}</h2>
              <form onSubmit={saveItem} className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Name</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.name || ""}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Price (£)</label>
                  <input
                    type="number"
                    step="0.5"
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.price ?? 0}
                    onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Category</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value as MenuItem["category"] })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{categoryLabels[c]}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.description || ""}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Image URL</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.image || ""}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Calories</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.calories ?? 0}
                    onChange={(e) => setDraft({ ...draft, calories: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Pairing</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    value={draft.pairing || ""}
                    onChange={(e) => setDraft({ ...draft, pairing: e.target.value })}
                  />
                </div>
                <div className="col-span-2 flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 rounded-2xl border font-montserrat font-bold uppercase tracking-[2px] text-xs"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                  >
                    {editingSlug ? "Save changes" : "Create dish"}
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

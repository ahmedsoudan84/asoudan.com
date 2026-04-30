"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts, getOrders, updateStock, addProduct, deleteProduct, updateOrderStatus, type Order } from "@/lib/ecommerce/storage";
import { type Product, CATEGORY_META, ProductCategory } from "@/lib/ecommerce/products";
import Link from "next/link";

const ADMIN_PASSWORD = "oxfordadmin2024";

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"dashboard" | "products" | "inventory" | "orders">("dashboard");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "audio",
    brand: "",
    stock: 10,
    tagline: "",
    description: "",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
  });

  useEffect(() => {
    if (authenticated) {
      setProducts(getAllProducts());
      setOrders(getOrders());
    }
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

  const handleUpdateStock = (slug: string, newStock: number) => {
    updateStock(slug, newStock);
    setProducts(getAllProducts());
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (newProduct.name || "product").toLowerCase().replace(/ /g, "-");
    const p: Product = {
      slug,
      name: newProduct.name || "",
      price: newProduct.price || 0,
      category: newProduct.category as ProductCategory,
      brand: newProduct.brand || "Oxford",
      stock: newProduct.stock || 0,
      tagline: newProduct.tagline || "",
      description: newProduct.description || "",
      image: newProduct.image || "",
      gallery: [newProduct.image || ""],
      colour: "Default",
      colourHex: "#000000",
      rating: 5,
      reviews: 0,
      tags: ["New"],
      materials: ["Premium Materials"],
      features: ["AI Enhanced"],
      isNew: true,
    };
    addProduct(p);
    setProducts(getAllProducts());
    setShowAddModal(false);
  };

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(slug);
      setProducts(getAllProducts());
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    setOrders(getOrders());
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl font-montserrat font-black tracking-tight" style={{ color: "var(--fg)" }}>Oxford Admin</h1>
            <p className="text-xs mt-3 font-montserrat" style={{ color: "var(--fg-40)" }}>
              Password: <code className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "var(--fg-06)", color: "var(--accent)" }}>oxfordadmin2024</code>
            </p>
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
              className="w-full py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/buy/ecommerce" className="text-xs font-montserrat opacity-40 hover:opacity-100 underline">Back to Store</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside className="w-64 border-r hidden md:flex flex-col p-6" style={{ borderColor: "var(--border-subtle)" }}>
        <h2 className="text-xl font-montserrat font-black mb-10" style={{ color: "var(--fg)" }}>Oxford Admin</h2>
        
        <nav className="space-y-2">
          {(["dashboard", "products", "inventory", "orders"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="w-full text-left px-4 py-3 rounded-xl font-montserrat text-sm font-bold capitalize transition-all"
              style={{ 
                background: tab === t ? "rgba(var(--accent-rgb), 0.1)" : "transparent",
                color: tab === t ? "var(--accent)" : "var(--fg-40)"
              }}
            >
              {t}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
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
            <h1 className="text-3xl font-montserrat font-black capitalize" style={{ color: "var(--fg)" }}>{tab}</h1>
            <p className="text-sm font-montserrat" style={{ color: "var(--fg-40)" }}>Manage your store's operations in real-time</p>
          </div>
          
          <div className="flex items-center gap-4">
            {tab === "products" && (
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-5 py-3 rounded-xl border outline-none font-montserrat text-xs w-64 focus:border-accent transition-all"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                />
              </div>
            )}
            {tab === "products" && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 rounded-xl font-montserrat font-bold uppercase tracking-[1.5px] text-[11px]"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                Add Product
              </button>
            )}
          </div>
        </header>

        {tab === "dashboard" && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Sales", value: `£${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, change: "+12.5%" },
                { label: "Active Orders", value: orders.filter(o => o.status !== 'Delivered').length, change: "Real-time" },
                { label: "Total Products", value: products.length, change: "Live" }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <p className="text-xs font-montserrat font-bold uppercase tracking-[2px]" style={{ color: "var(--fg-40)" }}>{stat.label}</p>
                  <div className="flex items-end justify-between mt-4">
                    <span className="text-3xl font-montserrat font-black" style={{ color: "var(--fg)" }}>{stat.value}</span>
                    <span className="text-[10px] font-montserrat font-bold text-green-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
              <h3 className="text-lg font-montserrat font-black mb-6" style={{ color: "var(--fg)" }}>Recent Orders</h3>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-sm opacity-40 italic">No orders yet.</p>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-accent/20 hover:bg-accent/5 transition-all">
                      <div>
                        <p className="font-montserrat font-bold text-sm" style={{ color: "var(--fg)" }}>{order.id} — {order.customer}</p>
                        <p className="text-xs opacity-40">{order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-montserrat font-bold text-sm" style={{ color: "var(--fg)" }}>£{order.total}</p>
                        <span className="text-[10px] font-bold uppercase tracking-[1px]" style={{ color: "var(--accent)" }}>{order.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.slug} className="group p-4 rounded-3xl border flex flex-col" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleDelete(p.slug)}
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <h3 className="font-montserrat font-bold" style={{ color: "var(--fg)" }}>{p.name}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--fg-40)" }}>{p.brand} • £{p.price}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[1px] px-2 py-1 rounded-full" style={{ background: "var(--fg-05)", color: "var(--fg-60)" }}>
                    {p.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-[1px] ${p.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                    {p.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "inventory" && (
          <div className="rounded-3xl border overflow-hidden" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[2px] opacity-40">Product</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[2px] opacity-40">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[2px] opacity-40">Stock Level</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[2px] opacity-40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b last:border-0 hover:bg-white/5 transition-all" style={{ borderColor: "var(--border-subtle)" }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                        <span className="font-montserrat font-bold text-sm" style={{ color: "var(--fg)" }}>{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm opacity-60 capitalize">{p.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-fg-05 max-w-[100px]">
                          <div 
                            className="h-full rounded-full transition-all" 
                            style={{ 
                              width: `${Math.min(100, (p.stock / 50) * 100)}%`,
                              background: p.stock < 10 ? "#ef4444" : "var(--accent)"
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold">{p.stock}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleUpdateStock(p.slug, Math.max(0, p.stock - 1))} className="w-8 h-8 rounded-lg border border-border-subtle hover:border-accent transition-all">-</button>
                        <button onClick={() => handleUpdateStock(p.slug, p.stock + 1)} className="w-8 h-8 rounded-lg border border-border-subtle hover:border-accent transition-all">+</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-20 text-center rounded-3xl border border-dashed" style={{ borderColor: "var(--border-subtle)" }}>
                <p className="font-montserrat opacity-40">No orders have been placed yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 rounded-3xl border flex items-center justify-between" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-montserrat font-black" style={{ color: "var(--fg)" }}>{order.id}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[1px]" style={{ background: "var(--fg-05)", color: "var(--accent)" }}>{order.status}</span>
                      </div>
                      <p className="text-sm font-montserrat font-bold" style={{ color: "var(--fg)" }}>{order.customer} <span className="opacity-40 font-normal">({order.email})</span></p>
                      <p className="text-xs opacity-60">{order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                      <p className="text-[10px] opacity-40">{order.date}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-xl font-montserrat font-black" style={{ color: "var(--fg)" }}>£{order.total}</p>
                      <div className="flex gap-2">
                        <select 
                          className="px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase outline-none transition-all focus:border-accent"
                          style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Product Modal */}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[101] p-8 rounded-[40px] border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <h2 className="text-2xl font-montserrat font-black mb-6" style={{ color: "var(--fg)" }}>New Product</h2>
              
              <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Name</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Price (£)</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Category</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm appearance-none"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                    >
                      {(Object.keys(CATEGORY_META) as ProductCategory[]).map(cat => (
                        <option key={cat} value={cat}>{CATEGORY_META[cat].label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Tagline</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                      value={newProduct.tagline}
                      onChange={e => setNewProduct({...newProduct, tagline: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Image URL</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                      value={newProduct.image}
                      onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-2 block">Stock Level</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-3 rounded-xl border outline-none font-montserrat text-sm"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                      value={newProduct.stock}
                      onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="col-span-2 flex gap-4 mt-4">
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
                    Create Product
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

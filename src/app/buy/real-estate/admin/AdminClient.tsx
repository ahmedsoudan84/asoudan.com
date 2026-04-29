"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProperties, addProperty, deleteCustomProperty, getBlockedSlots, saveBlockedSlots, BlockedSlot } from "@/lib/real-estate/storage";
import { type Property } from "@/lib/real-estate/properties";

const ADMIN_PASSWORD = "aiestate2024";

function getStatusStyle(status: string): { bg: string; color: string; border: string } {
  const isRent = status === "To Let" || status === "Let Agreed";
  
  if (isRent) {
    return {
      bg: "rgba(16, 185, 129, 0.9)",
      color: "#ffffff",
      border: "rgba(16, 185, 129, 0.5)",
    };
  }
  
  if (status === "For Sale") {
    return {
      bg: "rgba(0, 241, 241, 0.95)",
      color: "#0a0c14",
      border: "rgba(0, 241, 241, 0.5)",
    };
  }
  
  if (status === "Under Offer") {
    return {
      bg: "rgba(251, 191, 36, 0.9)",
      color: "#1a1a1a",
      border: "rgba(251, 191, 36, 0.5)",
    };
  }
  
  if (status === "Sold STC") {
    return {
      bg: "rgba(239, 68, 68, 0.9)",
      color: "#ffffff",
      border: "rgba(239, 68, 68, 0.5)",
    };
  }
  
  return {
    bg: "rgba(255, 255, 255, 0.9)",
    color: "#1a1a1a",
    border: "rgba(255, 255, 255, 0.3)",
  };
}

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

interface Lead {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  timestamp: number;
}

interface AgencySettings {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  primaryColour: string;
}

const DEFAULT_SETTINGS: AgencySettings = {
  name: "AI Estate",
  tagline: "London Property, Reimagined",
  phone: "+44 20 7946 0958",
  email: "hello@aiestate.co.uk",
  primaryColour: "#00F1F1",
};

type Tab = "dashboard" | "listings" | "availability" | "leads" | "settings";

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<AgencySettings>(DEFAULT_SETTINGS);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDateForBlocking, setSelectedDateForBlocking] = useState<string | null>(null);

  // Form State
  const [newProp, setNewProp] = useState<Partial<Property>>({
    title: "",
    address: "",
    price: 500000,
    type: "Flat",
    status: "For Sale",
    beds: 2,
    baths: 2,
    sqft: 1000,
    description: "",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"],
    lat: 51.5074,
    lng: -0.1278,
    isCustom: true,
  });

  useEffect(() => {
    setAllProperties(getAllProperties());
    setBlockedSlots(getBlockedSlots());
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    // Load leads
    try {
      const stored = JSON.parse(localStorage.getItem("ai-estate-leads") || "[]");
      setLeads(stored);
    } catch { /* empty */ }

    // Load settings
    try {
      const stored = localStorage.getItem("ai-estate-settings");
      if (stored) setSettings(JSON.parse(stored));
    } catch { /* empty */ }

    // Load view counts
    try {
      const views = JSON.parse(localStorage.getItem("ai-estate-views") || "[]");
      const counts: Record<string, number> = {};
      for (const v of views) counts[v.slug] = v.count;
      setViewCounts(counts);
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

  const saveSettings = () => {
    localStorage.setItem("ai-estate-settings", JSON.stringify(settings));
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (newProp.title || "property").toLowerCase().replace(/ /g, "-");
    const property: Property = {
      slug,
      title: newProp.title || "",
      address: newProp.address || "",
      price: newProp.price || 0,
      priceLabel: `£${(newProp.price || 0).toLocaleString()}`,
      type: newProp.type as any,
      status: newProp.status as any,
      beds: newProp.beds || 0,
      baths: newProp.baths || 0,
      sqft: newProp.sqft || 0,
      description: newProp.description || "",
      images: newProp.images || [],
      features: ["Newly Added", "AI Integrated", "Smart Home"],
      nearbySchools: [{ name: "Local Academy", distance: "0.2 miles", rating: "Outstanding", type: "Primary" }],
      nearbyShops: [{ name: "High Street", distance: "0.4 miles", type: "Retail" }],
      nearbyAmenities: [{ name: "Central Park", distance: "0.5 miles", type: "Park" }],
      borough: "London",
      station: "Central Station",
      stationDistance: "0.3 miles",
      localAvgPrice: newProp.price || 500000,
      lat: 51.5074,
      lng: -0.1278,
      listingMode: (newProp.status === "To Let" || newProp.status === "Let Agreed") ? "rent" : "sale",
      isCustom: true,
    };
    addProperty(property);
    setAllProperties(getAllProperties());
    setShowAddForm(false);
  };

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this custom listing?")) {
      deleteCustomProperty(slug);
      setAllProperties(getAllProperties());
    }
  };

  const toggleSlot = (date: string, time?: string) => {
    let newSlots: BlockedSlot[];
    const exists = blockedSlots.find(s => s.date === date && s.time === time);
    if (exists) {
      newSlots = blockedSlots.filter(s => !(s.date === date && s.time === time));
    } else {
      newSlots = [...blockedSlots, { date, time }];
    }
    setBlockedSlots(newSlots);
    saveBlockedSlots(newSlots);
  };

  const exportLeadsCSV = () => {
    const headers = "Name,Email,Phone,Type,Message,Date\n";
    const rows = leads.map((l) =>
      `"${l.name}","${l.email}","${l.phone}","${l.enquiryType}","${l.message.replace(/"/g, '""')}","${new Date(l.timestamp).toLocaleDateString("en-GB")}"`
    ).join("\n");
    const csv = headers + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-estate-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Login Screen ──────────────────────────────────────
  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "var(--bg-primary)" }}
      >
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 rounded-2xl border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <h1 className="font-montserrat text-2xl font-bold text-center mb-2" style={{ color: "var(--fg)" }}>
            Admin Portal
          </h1>
          <p className="font-montserrat text-xs text-center mb-6" style={{ color: "var(--fg-40)" }}>
            Password: <code className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "var(--fg-06)", color: "var(--accent)" }}>aiestate2024</code>
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none mb-4"
            style={{
              background: "var(--bg-tertiary)",
              color: "var(--fg)",
              border: "1px solid var(--border-subtle)",
            }}
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

  // ── Admin Dashboard ───────────────────────────────────
  const totalViews = Object.values(viewCounts).reduce((a, b) => a + b, 0);

  const TABS: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "listings", label: "Listings" },
    { id: "availability", label: "Availability" },
    { id: "leads", label: "Leads" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>
            Admin Portal
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
        <div className="flex gap-1 mb-8 p-1 rounded-xl" style={{ background: "var(--fg-06)" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1 py-2.5 rounded-lg font-montserrat text-xs uppercase tracking-[2px] transition-all"
              style={{
                background: activeTab === tab.id ? "var(--bg-surface)" : "transparent",
                color: activeTab === tab.id ? "var(--accent)" : "var(--fg-40)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Listings", value: allProperties.length },
                { label: "Total Views", value: totalViews },
                { label: "Leads Captured", value: leads.length },
                { label: "For Sale", value: allProperties.filter((p) => p.status === "For Sale").length },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-xl border text-center"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <div className="font-montserrat text-3xl font-bold" style={{ color: "var(--accent)" }}>
                    {s.value}
                  </div>
                  <div className="font-montserrat text-[10px] uppercase tracking-[2px] mt-1" style={{ color: "var(--fg-40)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent leads */}
            <div
              className="p-6 rounded-xl border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                Recent Leads
              </h3>
              {leads.length === 0 ? (
                <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                  No leads yet. Submit the contact form to test.
                </p>
              ) : (
                <div className="space-y-3">
                  {leads.slice(-5).reverse().map((l, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                      <div>
                        <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>{l.name}</p>
                        <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>{l.email} &middot; {l.enquiryType}</p>
                      </div>
                      <span className="font-montserrat text-[10px]" style={{ color: "var(--fg-30)" }}>
                        {new Date(l.timestamp).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>
                {allProperties.length} Properties
              </h3>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                + Add Listing
              </button>
            </div>

            <div className="space-y-3">
              {allProperties.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-4 p-4 rounded-xl border group"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                >
                  <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-sm font-semibold truncate" style={{ color: "var(--fg)" }}>
                      {p.title}
                    </p>
                    <p className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>
                      {p.priceLabel} &middot; {p.beds} bed &middot; {p.type}
                    </p>
                  </div>
                  <div className="text-right shrink-0 flex items-center gap-4">
                    <div className="hidden md:block">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-montserrat font-semibold"
                        style={{
                          background: getStatusStyle(p.status).bg,
                          color: getStatusStyle(p.status).color,
                          border: `1px solid ${getStatusStyle(p.status).border}`,
                        }}
                      >
                        {p.status}
                      </span>
                      <p className="font-montserrat text-[10px] mt-1" style={{ color: "var(--fg-30)" }}>
                        {viewCounts[p.slug] || 0} views
                      </p>
                    </div>
                    {/* Only show delete for custom properties (for demo purposes) */}
                    {p.isCustom && (
                      <button 
                        onClick={() => handleDelete(p.slug)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="p-8 rounded-xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
              <h3 className="font-montserrat text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Booking Availability</h3>
              <p className="font-montserrat text-xs mb-8" style={{ color: "var(--fg-40)" }}>
                Click a date to block out the entire day, or leave unblocked to allow 30-minute viewing slots.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
                {Array.from({ length: 14 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() + i);
                  const dateStr = d.toISOString().split('T')[0];
                  const isBlocked = blockedSlots.some(s => s.date === dateStr && !s.time);
                  const isSunday = d.getDay() === 0;
                  const isSelected = selectedDateForBlocking === dateStr;

                  return (
                    <button
                      key={dateStr}
                      disabled={isSunday}
                      onClick={() => setSelectedDateForBlocking(dateStr)}
                      className={`p-4 rounded-xl border text-center transition-all ${isSunday ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                      style={{ 
                        background: isSelected ? 'rgba(0, 241, 241, 0.1)' : isBlocked ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-tertiary)',
                        borderColor: isSelected ? 'var(--accent)' : isBlocked ? '#ef4444' : 'var(--border-subtle)',
                      }}
                    >
                      <p className="font-montserrat text-[10px] uppercase tracking-wider mb-1" style={{ color: isSelected ? 'var(--accent)' : isBlocked ? '#ef4444' : 'var(--fg-40)' }}>
                        {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                      </p>
                      <p className="font-montserrat text-lg font-bold" style={{ color: isSelected ? 'var(--accent)' : isBlocked ? '#ef4444' : 'var(--fg)' }}>
                        {d.getDate()}
                      </p>
                    </button>
                  );
                })}
              </div>

              {selectedDateForBlocking && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-montserrat text-sm font-bold" style={{ color: 'var(--fg)' }}>
                      Slots for {new Date(selectedDateForBlocking).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                    </h4>
                    <button 
                      onClick={() => toggleSlot(selectedDateForBlocking)}
                      className="px-4 py-2 rounded-lg font-montserrat text-[10px] font-bold uppercase tracking-wider border"
                      style={{ 
                        background: blockedSlots.some(s => s.date === selectedDateForBlocking && !s.time) ? '#ef4444' : 'transparent',
                        color: blockedSlots.some(s => s.date === selectedDateForBlocking && !s.time) ? '#fff' : '#ef4444',
                        borderColor: '#ef4444'
                      }}
                    >
                      {blockedSlots.some(s => s.date === selectedDateForBlocking && !s.time) ? 'Unblock Whole Day' : 'Block Whole Day'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {TIME_SLOTS.map(time => {
                      const isBlocked = blockedSlots.some(s => s.date === selectedDateForBlocking && (s.time === time || !s.time));
                      const isWhollyBlocked = blockedSlots.some(s => s.date === selectedDateForBlocking && !s.time);
                      return (
                        <button
                          key={time}
                          disabled={isWhollyBlocked}
                          onClick={() => toggleSlot(selectedDateForBlocking, time)}
                          className={`p-3 rounded-lg border text-center text-[10px] font-montserrat transition-all ${isWhollyBlocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                          style={{
                            background: isBlocked ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-tertiary)',
                            borderColor: isBlocked ? '#ef4444' : 'var(--border-subtle)',
                            color: isBlocked ? '#ef4444' : 'var(--fg-60)'
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Add Listing Modal */}
        <AnimatePresence>
          {showAddForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowAddForm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto p-8 rounded-2xl border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <h2 className="font-montserrat text-xl font-bold mb-6" style={{ color: "var(--fg)" }}>Add New Listing</h2>
                <form onSubmit={handleAddProperty} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Property Title</label>
                    <input 
                      required
                      className="w-full px-4 py-2 rounded-lg outline-none" 
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      value={newProp.title}
                      onChange={e => setNewProp({...newProp, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Address</label>
                    <input
                      required
                      className="w-full px-4 py-2 rounded-lg outline-none"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      value={newProp.address}
                      onChange={e => setNewProp({...newProp, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Image URL</label>
                    <input
                      type="url"
                      className="w-full px-4 py-2 rounded-lg outline-none"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                      placeholder="https://images.unsplash.com/..."
                      value={(newProp.images || [])[0] || ""}
                      onChange={e => setNewProp({ ...newProp, images: [e.target.value] })}
                    />
                    {(newProp.images || [])[0] && (
                      <div className="mt-2 rounded-lg overflow-hidden h-32 border" style={{ borderColor: "var(--border-subtle)" }}>
                        <img
                          src={(newProp.images || [])[0]}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Price (£)</label>
                      <input 
                        type="number"
                        required
                        className="w-full px-4 py-2 rounded-lg outline-none" 
                        style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                        value={newProp.price}
                        onChange={e => setNewProp({...newProp, price: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Type</label>
                      <select 
                        className="w-full px-4 py-2 rounded-lg outline-none" 
                        style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }}
                        value={newProp.type}
                        onChange={e => setNewProp({...newProp, type: e.target.value as any})}
                      >
                        <option value="Flat">Flat</option>
                        <option value="House">House</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Maisonette">Maisonette</option>
                        <option value="Townhouse">Townhouse</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Beds</label>
                      <input type="number" className="w-full px-4 py-2 rounded-lg outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }} value={newProp.beds} onChange={e => setNewProp({...newProp, beds: parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Baths</label>
                      <input type="number" className="w-full px-4 py-2 rounded-lg outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }} value={newProp.baths} onChange={e => setNewProp({...newProp, baths: parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-40)" }}>Sqft</label>
                      <input type="number" className="w-full px-4 py-2 rounded-lg outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--fg)", border: "1px solid var(--border-subtle)" }} value={newProp.sqft} onChange={e => setNewProp({...newProp, sqft: parseInt(e.target.value)})} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 mt-4 rounded-xl font-montserrat text-sm font-bold uppercase tracking-widest"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                  >
                    Publish Listing
                  </button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>
                {leads.length} Lead{leads.length !== 1 ? "s" : ""} Captured
              </h3>
              {leads.length > 0 && (
                <button
                  onClick={exportLeadsCSV}
                  className="px-4 py-2 rounded-lg font-montserrat text-xs font-semibold uppercase tracking-wider"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Export CSV
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-montserrat text-sm" style={{ color: "var(--fg-40)" }}>
                  No leads yet. Submit the contact form to see data here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.slice().reverse().map((l, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>{l.name}</p>
                        <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-50)" }}>
                          {l.email} {l.phone && `\u00B7 ${l.phone}`}
                        </p>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-montserrat font-semibold"
                        style={{ background: "rgba(0,241,241,0.15)", color: "var(--accent)" }}
                      >
                        {l.enquiryType}
                      </span>
                    </div>
                    <p className="font-montserrat text-xs mt-3 leading-relaxed" style={{ color: "var(--fg-50)" }}>
                      {l.message}
                    </p>
                    <p className="font-montserrat text-[10px] mt-2" style={{ color: "var(--fg-30)" }}>
                      {new Date(l.timestamp).toLocaleString("en-GB")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              className="p-8 rounded-xl border space-y-6"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
            >
              <h3 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                Agency Branding
              </h3>

              {[
                { key: "name" as const, label: "Agency Name" },
                { key: "tagline" as const, label: "Tagline" },
                { key: "phone" as const, label: "Phone Number" },
                { key: "email" as const, label: "Email Address" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    value={settings[key]}
                    onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--fg)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  />
                </div>
              ))}

              <div>
                <label className="font-montserrat text-[10px] uppercase tracking-[2px] block mb-2" style={{ color: "var(--fg-40)" }}>
                  Primary Colour
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColour}
                    onChange={(e) => setSettings((s) => ({ ...s, primaryColour: e.target.value }))}
                    className="w-10 h-10 rounded-lg border-none cursor-pointer"
                  />
                  <span className="font-montserrat text-sm" style={{ color: "var(--fg-50)" }}>
                    {settings.primaryColour}
                  </span>
                </div>
              </div>

              <button
                onClick={saveSettings}
                className="px-6 py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider"
                style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
              >
                Save Settings
              </button>

              <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-30)" }}>
                Settings are stored in localStorage. In production, these would persist to a database
                and update the site&apos;s appearance in real-time.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Property } from "@/lib/real-estate/properties";
import {
  calculateWalkScore,
  walkScoreLabel,
  calculateCommute,
  comparePriceToLocal,
  generateAreaSummary,
  recordView,
  getScarcityMessage,
} from "@/lib/real-estate/smart-logic";

function getStatusStyle(status: string): { bg: string; color: string; border: string } {
  const isRent = status === "To Let" || status === "Let Agreed";
  
  if (isRent) {
    return {
      bg: "rgba(16, 185, 129, 0.15)",
      color: "#10b981",
      border: "rgba(16, 185, 129, 0.3)",
    };
  }
  
  if (status === "For Sale") {
    return {
      bg: "rgba(0, 241, 241, 0.15)",
      color: "var(--accent)",
      border: "rgba(0, 241, 241, 0.3)",
    };
  }
  
  if (status === "Under Offer") {
    return {
      bg: "rgba(251, 191, 36, 0.15)",
      color: "#fbbf24",
      border: "rgba(251, 191, 36, 0.3)",
    };
  }
  
  if (status === "Sold STC") {
    return {
      bg: "rgba(239, 68, 68, 0.15)",
      color: "#ef4444",
      border: "rgba(239, 68, 68, 0.3)",
    };
  }
  
  return {
    bg: "rgba(255, 255, 255, 0.1)",
    color: "var(--fg-50)",
    border: "rgba(255, 255, 255, 0.1)",
  };
}

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BookingModal({ property, onClose }: { property: Property; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const today = new Date();
  const dates: Date[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) dates.push(d);
  }

  const handleBook = () => {
    setIsBooked(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl border"
        style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)" }}
      >
        {isBooked ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "rgba(0,241,241,0.1)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-montserrat text-2xl font-bold" style={{ color: "var(--fg)" }}>Viewing Confirmed!</h2>
            <p className="font-montserrat text-sm mt-3" style={{ color: "var(--fg-50)" }}>
              Your viewing for <span style={{ color: "var(--accent)" }}>{property.title}</span> has been scheduled.
            </p>
            <p className="font-montserrat text-xs mt-2" style={{ color: "var(--fg-40)" }}>
              {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} at {selectedTime}
            </p>
            <p className="font-montserrat text-xs mt-6" style={{ color: "var(--fg-30)" }}>
              A confirmation email has been sent to {email}
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 rounded-xl font-montserrat text-sm font-semibold"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            {/* Left sidebar - Property info */}
            <div className="lg:w-[280px] p-6 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "var(--border-card)", background: "var(--bg-secondary)" }}>
              <h3 className="font-montserrat text-sm font-bold" style={{ color: "var(--fg)" }}>Scheduling for</h3>
              <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-montserrat text-base font-bold mt-4" style={{ color: "var(--fg)" }}>{property.title}</h4>
              <p className="font-montserrat text-xs mt-1" style={{ color: "var(--fg-40)" }}>{property.address}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="font-montserrat text-lg font-bold" style={{ color: "var(--accent)" }}>{property.priceLabel}</span>
                <span className="font-montserrat text-xs" style={{ color: "var(--fg-40)" }}>• {property.beds} bed • {property.baths} bath</span>
              </div>
            </div>

            {/* Right - Booking steps */}
            <div className="flex-1 p-6 lg:p-8">
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--fg-40)" }}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-montserrat text-sm font-bold" style={{
                      background: step >= s ? "var(--accent)" : "var(--fg-08)",
                      color: step >= s ? "var(--bg-primary)" : "var(--fg-40)"
                    }}>
                      {s}
                    </div>
                    {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? "var(--accent)" : "var(--fg-08)" }} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>Select a Date</h2>
                  <p className="font-montserrat text-xs mt-1 mb-6" style={{ color: "var(--fg-40)" }}>Choose your preferred date for the viewing</p>
                  <div className="grid grid-cols-7 gap-2">
                    {dates.map((d) => {
                      const isSelected = selectedDate?.toDateString() === d.toDateString();
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => setSelectedDate(d)}
                          className="p-2 rounded-lg text-center transition-all duration-200"
                          style={{
                            background: isSelected ? "var(--accent)" : "var(--bg-surface)",
                            color: isSelected ? "var(--bg-primary)" : "var(--fg)",
                            border: `1px solid ${isSelected ? "var(--accent)" : "var(--border-card)"}`
                          }}
                        >
                          <div className="font-montserrat text-[10px]" style={{ color: isSelected ? "var(--bg-primary)" : "var(--fg-40)" }}>{DAYS[d.getDay()]}</div>
                          <div className="font-montserrat text-sm font-bold">{d.getDate()}</div>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => selectedDate && setStep(2)}
                    disabled={!selectedDate}
                    className="mt-6 w-full py-3 rounded-xl font-montserrat text-sm font-semibold transition-all duration-300 disabled:opacity-50"
                    style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>Select a Time</h2>
                  <p className="font-montserrat text-xs mt-1 mb-6" style={{ color: "var(--fg-40)" }}>Available times for {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>
                  <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                    {TIME_SLOTS.map((t) => {
                      const isSelected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className="py-3 px-2 rounded-lg text-sm font-montserrat transition-all duration-200"
                          style={{
                            background: isSelected ? "var(--accent)" : "var(--bg-surface)",
                            color: isSelected ? "var(--bg-primary)" : "var(--fg)",
                            border: `1px solid ${isSelected ? "var(--accent)" : "var(--border-card)"}`
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold"
                      style={{ background: "var(--bg-surface)", color: "var(--fg-60)" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => selectedTime && setStep(3)}
                      disabled={!selectedTime}
                      className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold disabled:opacity-50"
                      style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-montserrat text-xl font-bold" style={{ color: "var(--fg)" }}>Your Details</h2>
                  <p className="font-montserrat text-xs mt-1 mb-6" style={{ color: "var(--fg-40)" }}>We'll send a confirmation to your email</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                        style={{ background: "var(--bg-surface)", color: "var(--fg)", border: "1px solid var(--border-card)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                        style={{ background: "var(--bg-surface)", color: "var(--fg)", border: "1px solid var(--border-card)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 20 7946 0958"
                        className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none"
                        style={{ background: "var(--bg-surface)", color: "var(--fg)", border: "1px solid var(--border-card)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat mb-2" style={{ color: "var(--fg-50)" }}>Notes (optional)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any specific requirements or questions..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none resize-none"
                        style={{ background: "var(--bg-surface)", color: "var(--fg)", border: "1px solid var(--border-card)" }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold"
                      style={{ background: "var(--bg-surface)", color: "var(--fg-60)" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBook}
                      disabled={!name || !email}
                      className="flex-1 py-3 rounded-xl font-montserrat text-sm font-semibold disabled:opacity-50"
                      style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default function PropertyDetailClient({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [scarcityMsg, setScarcityMsg] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const walkScore = calculateWalkScore(property);
  const commute = calculateCommute(property);
  const priceComp = comparePriceToLocal(property);
  const areaSummary = generateAreaSummary(property);

  useEffect(() => {
    recordView(property.slug);
    setScarcityMsg(getScarcityMessage(property));
  }, [property.slug, property]);

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <AnimatePresence>
        {showBooking && <BookingModal property={property} onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 pt-6">
        <div className="max-w-[1200px] mx-auto">
          <nav
            className="font-montserrat text-xs flex items-center gap-2"
            style={{ color: "var(--fg-40)" }}
          >
            <Link href="/buy/real-estate/listings" className="hover:text-[var(--accent)] transition-colors">
              Listings
            </Link>
            <span>/</span>
            <span style={{ color: "var(--fg-60)" }}>{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4"
        >
          <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {scarcityMsg && (
              <div
                className="absolute top-4 left-4 px-4 py-2 rounded-xl text-xs font-montserrat font-semibold backdrop-blur-sm"
                style={{
                  background: "rgba(255,100,50,0.9)",
                  color: "white",
                }}
              >
                {scarcityMsg}
              </div>
            )}
            <div
              className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-montserrat font-semibold"
              style={{
                background: getStatusStyle(property.status).bg,
                color: getStatusStyle(property.status).color,
                border: `1px solid ${getStatusStyle(property.status).border}`,
              }}
            >
              {property.status}
            </div>
          </div>

          <div className="flex lg:flex-col gap-4">
            {property.images.slice(1).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i + 1)}
                className={`rounded-xl overflow-hidden h-32 lg:h-auto lg:flex-1 transition-all duration-300 border-2 ${
                  activeImage === i + 1 ? "border-[var(--accent)]" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${property.title} view ${i + 2}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mt-10">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1
                className="font-montserrat text-3xl md:text-4xl font-bold"
                style={{ color: "var(--fg)" }}
              >
                {property.title}
              </h1>
              <p className="font-montserrat text-sm mt-2" style={{ color: "var(--fg-40)" }}>
                {property.address}
              </p>

              <div className="flex items-center gap-6 mt-6">
                <span
                  className="font-montserrat text-3xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {property.priceLabel}
                </span>
                <span
                  className="text-xs font-montserrat px-3 py-1 rounded-full"
                  style={{
                    background: priceComp.isBelow ? "rgba(74,222,128,0.15)" : "var(--fg-06)",
                    color: priceComp.isBelow ? "#4ade80" : "var(--fg-40)",
                  }}
                >
                  {priceComp.label}
                </span>
              </div>

              {/* Key stats */}
              <div
                className="flex items-center gap-8 mt-6 py-4 border-y"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {[
                  { label: "Bedrooms", value: property.beds },
                  { label: "Bathrooms", value: property.baths },
                  { label: "Sq Ft", value: property.sqft.toLocaleString() },
                  { label: "Type", value: property.type },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                      {s.value}
                    </div>
                    <div className="font-montserrat text-[10px] uppercase tracking-[2px]" style={{ color: "var(--fg-40)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                  About This Property
                </h2>
                <p
                  className="font-montserrat text-sm mt-3 leading-relaxed"
                  style={{ color: "var(--fg-60)" }}
                >
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h2 className="font-montserrat text-lg font-bold" style={{ color: "var(--fg)" }}>
                  Key Features
                </h2>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {property.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{ background: "var(--fg-06)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ color: "var(--accent)" }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-montserrat text-xs" style={{ color: "var(--fg-60)" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Area Summary */}
              <div
                className="mt-10 p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "rgba(0,241,241,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: "var(--accent)" }}
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <h3 className="font-montserrat text-sm font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    AI Area Insights
                  </h3>
                </div>
                <p className="font-montserrat text-sm leading-relaxed" style={{ color: "var(--fg-60)" }}>
                  {areaSummary}
                </p>
              </div>

              {/* Nearby */}
              <div className="mt-10 grid md:grid-cols-3 gap-6">
                {/* Schools */}
                <div>
                  <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                    Schools
                  </h3>
                  {property.nearbySchools.map((s) => (
                    <div key={s.name} className="mb-3">
                      <p className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg-70)" }}>
                        {s.name}
                      </p>
                      <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-40)" }}>
                        {s.distance} &middot; {s.rating} &middot; {s.type}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Shops */}
                <div>
                  <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                    Shopping
                  </h3>
                  {property.nearbyShops.map((s) => (
                    <div key={s.name} className="mb-3">
                      <p className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg-70)" }}>
                        {s.name}
                      </p>
                      <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-40)" }}>
                        {s.distance} &middot; {s.type}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Amenities */}
                <div>
                  <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                    Amenities
                  </h3>
                  {property.nearbyAmenities.map((a) => (
                    <div key={a.name} className="mb-3">
                      <p className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg-70)" }}>
                        {a.name}
                      </p>
                      <p className="font-montserrat text-[10px]" style={{ color: "var(--fg-40)" }}>
                        {a.distance} &middot; {a.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Walk Score */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                  Walk Score
                </h3>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-montserrat text-xl font-bold"
                    style={{
                      background: `conic-gradient(var(--accent) ${walkScore * 3.6}deg, var(--fg-08) 0deg)`,
                      color: "var(--fg)",
                    }}
                  >
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "var(--bg-surface)" }}
                    >
                      {walkScore}
                    </span>
                  </div>
                  <div>
                    <p className="font-montserrat text-sm font-semibold" style={{ color: "var(--fg)" }}>
                      {walkScoreLabel(walkScore)}
                    </p>
                    <p className="font-montserrat text-[10px] mt-1" style={{ color: "var(--fg-40)" }}>
                      Based on nearby amenities
                    </p>
                  </div>
                </div>
              </div>

              {/* Commute */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <h3 className="font-montserrat text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                  Commute to Bank
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-montserrat text-xs" style={{ color: "var(--fg-50)" }}>
                      Walk to {commute.station}
                    </span>
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg)" }}>
                      {commute.walkMinutes} min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-montserrat text-xs" style={{ color: "var(--fg-50)" }}>
                      Tube to Bank
                    </span>
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "var(--fg)" }}>
                      {commute.tubeMinutes} min
                    </span>
                  </div>
                  <div
                    className="pt-3 flex justify-between border-t"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <span className="font-montserrat text-xs font-semibold" style={{ color: "var(--accent)" }}>
                      Total commute
                    </span>
                    <span className="font-montserrat text-sm font-bold" style={{ color: "var(--accent)" }}>
                      {commute.totalMinutes} min
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-card)",
                }}
              >
                <h3 className="font-montserrat text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>
                  Interested?
                </h3>
                <button
                  onClick={() => setShowBooking(true)}
                  className="block w-full text-center py-3 rounded-xl font-montserrat text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,241,241,0.3)]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Book a Viewing
                </button>
                <p className="font-montserrat text-[10px] text-center mt-3" style={{ color: "var(--fg-30)" }}>
                  Or call +44 20 7946 0958
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

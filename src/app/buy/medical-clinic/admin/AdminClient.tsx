"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAllPatients,
} from "@/lib/medical-clinic/storage";
import { doctors, services, serviceCategoryLabels } from "@/lib/medical-clinic/data";
import type { Appointment, PatientRecord } from "@/lib/medical-clinic/data";

const ADMIN_PASSWORD = "vitalcare2024";

type Tab = "dashboard" | "appointments" | "patients" | "doctors" | "services";

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const refresh = () => {
    setAppointments(getAppointments());
    setPatients(getAllPatients());
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
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
              <Icons.Cross className="w-7 h-7 text-accent" style={{ color: "var(--accent)" }} />
            </div>
            <h1 className="text-3xl font-montserrat font-black tracking-tight">VitalCare Admin</h1>
            <p className="text-xs mt-3 font-montserrat opacity-50">
              Password:{" "}
              <code className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "var(--fg-06)", color: "var(--accent)" }}>
                vitalcare2024
              </code>
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="••••••••••"
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
            <Link href="/buy/medical-clinic" className="text-xs font-montserrat opacity-40 hover:opacity-100 underline">
              ← Back to clinic
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const pending = appointments.filter((a) => a.status === "Pending").length;
  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayAppts = appointments.filter((a) => a.date === todayStr).length;

  const getDoctorName = (id: string) => doctors.find((d) => d.id === id)?.name ?? id;
  const getServiceName = (id: string) => services.find((s) => s.id === id)?.name ?? id;

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <Icons.Activity className="w-4 h-4" /> },
    { key: "appointments", label: "Appointments", icon: <Icons.Calendar className="w-4 h-4" /> },
    { key: "patients", label: "Patients", icon: <Icons.Users className="w-4 h-4" /> },
    { key: "doctors", label: "Doctors", icon: <Icons.Stethoscope className="w-4 h-4" /> },
    { key: "services", label: "Services", icon: <Icons.Clipboard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside className="w-64 border-r hidden md:flex flex-col p-6" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Icons.Cross className="w-5 h-5" style={{ color: "var(--accent)" }} />
          <h2 className="text-xl font-montserrat font-black">VitalCare</h2>
        </div>
        <p className="text-[10px] opacity-40 font-bold uppercase tracking-[2px] mb-10">Clinic Admin</p>
        <nav className="space-y-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl font-montserrat text-sm font-bold capitalize transition-all"
              style={{
                background: tab === t.key ? "rgba(var(--accent-rgb), 0.1)" : "transparent",
                color: tab === t.key ? "var(--accent)" : "var(--fg-40)",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <Link href="/buy/medical-clinic" className="block px-4 py-2 text-xs font-montserrat opacity-50 hover:opacity-100 transition">
            ← Back to site
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full text-left px-4 py-3 rounded-xl font-montserrat text-sm text-red-500 hover:bg-red-500/10 transition-all mt-1"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-3 flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider transition-colors"
            style={{ color: tab === t.key ? "var(--accent)" : "var(--fg-30)" }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen pb-24 md:pb-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-montserrat font-black capitalize">{tab}</h1>
            <p className="text-sm font-montserrat opacity-40">Manage VitalCare in real-time</p>
          </div>
          {tab === "appointments" && (
            <Link
              href="/buy/medical-clinic/book"
              className="px-6 py-3 rounded-xl font-montserrat font-bold uppercase tracking-[1.5px] text-[11px]"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              + New Appointment
            </Link>
          )}
        </header>

        {/* Dashboard */}
        {tab === "dashboard" && (
          <div className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Today's Appointments", value: todayAppts, sub: "scheduled" },
                { label: "Pending Confirmation", value: pending, sub: "awaiting review" },
                { label: "Confirmed", value: confirmed, sub: "this week" },
                { label: "Total Patients", value: patients.length, sub: "registered" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <p className="text-[10px] font-montserrat font-bold uppercase tracking-[2px] opacity-40">{stat.label}</p>
                  <div className="flex items-end justify-between mt-4">
                    <span className="text-3xl font-montserrat font-black">{stat.value}</span>
                    <span className="text-[10px] font-montserrat font-bold" style={{ color: "var(--accent)" }}>{stat.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <h3 className="text-lg font-montserrat font-black mb-6">Recent Appointments</h3>
                <div className="space-y-3">
                  {appointments.slice(0, 6).map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-accent/20 hover:bg-accent/5 transition">
                      <div>
                        <p className="font-montserrat font-bold text-sm">{a.patientName}</p>
                        <p className="text-xs opacity-40">{getDoctorName(a.doctorId)} · {a.date} @ {a.time}</p>
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[1px] px-2 py-1 rounded-full"
                        style={{
                          background: a.status === "Confirmed" ? "rgba(var(--accent-rgb),0.1)" : a.status === "Pending" ? "rgba(240,168,64,0.1)" : "var(--fg-05)",
                          color: a.status === "Confirmed" ? "var(--accent)" : a.status === "Pending" ? "var(--secondary)" : "var(--fg-40)",
                        }}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                <h3 className="text-lg font-montserrat font-black mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: "Doctors on roster", value: doctors.length },
                    { label: "Services offered", value: services.length },
                    { label: "Total appointments", value: appointments.length },
                    { label: "Completed today", value: appointments.filter((a) => a.status === "Completed").length },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                      <span className="text-sm font-montserrat opacity-60">{s.label}</span>
                      <span className="font-montserrat font-black" style={{ color: "var(--accent)" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments */}
        {tab === "appointments" && (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="p-20 text-center rounded-3xl border border-dashed opacity-50" style={{ borderColor: "var(--border-subtle)" }}>
                No appointments yet.
              </div>
            ) : (
              appointments.map((a) => (
                <div
                  key={a.id}
                  className="p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-montserrat font-black">{a.id}</span>
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[1px]"
                        style={{ background: "rgba(var(--accent-rgb),0.08)", color: "var(--accent)" }}
                      >
                        {a.type}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-[1px] bg-fg-05"
                        style={{ color: a.status === "Pending" ? "var(--secondary)" : a.status === "Confirmed" ? "var(--accent)" : "var(--fg-40)" }}
                      >
                        {a.status}
                      </span>
                    </div>
                    <p className="text-sm font-montserrat font-bold">{a.patientName}</p>
                    <p className="text-xs opacity-60">
                      {getDoctorName(a.doctorId)} · {getServiceName(a.serviceId)} · {a.date} @ {a.time}
                    </p>
                    <p className="text-xs opacity-40">{a.patientEmail} · {a.patientPhone}</p>
                    {a.notes && <p className="text-xs italic opacity-50 mt-1">&ldquo;{a.notes}&rdquo;</p>}
                  </div>
                  <div className="flex gap-2 items-center">
                    <select
                      value={a.status}
                      onChange={(e) => { updateAppointment(a.id, { status: e.target.value as Appointment["status"] }); refresh(); }}
                      className="px-3 py-2 rounded-lg border text-[10px] font-bold uppercase outline-none focus:border-accent"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="No-show">No-show</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => setSelectedAppt(a)}
                      className="p-2 rounded-lg border text-xs hover:bg-accent/10 transition-colors"
                      style={{ borderColor: "var(--border-subtle)", color: "var(--accent)" }}
                    >
                      <Icons.FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { if (confirm("Delete this appointment?")) { deleteAppointment(a.id); refresh(); } }}
                      className="p-2 rounded-lg border text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Patients */}
        {tab === "patients" && (
          <div className="space-y-4">
            {patients.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-3xl border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-montserrat font-black">{p.firstName} {p.lastName}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-fg-05" style={{ color: "var(--accent)" }}>
                        {p.bloodType}
                      </span>
                    </div>
                    <p className="text-xs opacity-60">{p.email} · {p.phone} · DOB: {p.dateOfBirth}</p>
                    {p.conditions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.conditions.map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-fg-06 uppercase tracking-wide" style={{ color: "var(--fg-50)" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.allergies.length > 0 && (
                      <p className="text-xs opacity-40 mt-1">
                        <span className="font-bold">Allergies:</span> {p.allergies.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">{p.files.length} files</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Doctors */}
        {tab === "doctors" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="p-6 rounded-3xl border flex flex-col gap-4"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                    crossOrigin="anonymous"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop"; }}
                  />
                  <div>
                    <p className="font-montserrat font-bold">{d.name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: "var(--accent)" }}>{d.specialty}</p>
                    <p className="text-[11px] opacity-40">{d.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Icons.Star className="w-3 h-3" style={{ color: "var(--secondary)" }} />
                    <span className="font-bold">{d.rating}</span>
                    <span className="opacity-40">({d.reviewCount})</span>
                  </div>
                  <span className="font-bold" style={{ color: "var(--accent)" }}>£{d.consultationFee}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {d.availableDays.map((day) => (
                    <span key={day} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-fg-05 uppercase tracking-wide" style={{ color: "var(--fg-50)" }}>
                      {day.slice(0, 3)}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/buy/medical-clinic/doctors/${d.slug}`}
                  className="text-center py-2 rounded-xl border text-xs font-bold uppercase tracking-wider font-montserrat transition-colors hover:border-accent hover:text-accent"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)" }}
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Services */}
        {tab === "services" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-6 rounded-3xl border flex flex-col gap-4"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop"; }}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[2px] block mb-1" style={{ color: "var(--accent)" }}>
                    {serviceCategoryLabels[svc.category]}
                  </span>
                  <p className="font-montserrat font-bold">{svc.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm flex items-center gap-1 opacity-50">
                      <Icons.Clock className="w-3.5 h-3.5" />
                      {svc.duration} min
                    </span>
                    <span className="font-montserrat font-black" style={{ color: "var(--accent)" }}>£{svc.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppt(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] p-8 rounded-[40px] border max-h-[90vh] overflow-y-auto"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              <h2 className="text-2xl font-montserrat font-black mb-6">Appointment Detail</h2>
              <div className="space-y-4">
                {[
                  { label: "ID", value: selectedAppt.id },
                  { label: "Patient", value: selectedAppt.patientName },
                  { label: "Email", value: selectedAppt.patientEmail },
                  { label: "Phone", value: selectedAppt.patientPhone },
                  { label: "Doctor", value: getDoctorName(selectedAppt.doctorId) },
                  { label: "Service", value: getServiceName(selectedAppt.serviceId) },
                  { label: "Date & Time", value: `${selectedAppt.date} @ ${selectedAppt.time}` },
                  { label: "Type", value: selectedAppt.type },
                  { label: "Status", value: selectedAppt.status },
                  { label: "Notes", value: selectedAppt.notes || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4 pb-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                    <span className="text-xs uppercase tracking-[2px] font-bold opacity-40 shrink-0">{label}</span>
                    <span className="text-sm font-montserrat font-bold text-right">{value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="w-full mt-6 py-4 rounded-2xl border font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:border-accent"
                style={{ borderColor: "var(--border-subtle)", color: "var(--fg)" }}
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

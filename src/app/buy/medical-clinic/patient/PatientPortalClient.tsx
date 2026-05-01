"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { getPatientByEmail, getAppointmentsByPatientEmail, registerPatient } from "@/lib/medical-clinic/storage";
import { doctors, services } from "@/lib/medical-clinic/data";
import type { PatientRecord, MedicalFile } from "@/lib/medical-clinic/data";

type PortalTab = "overview" | "appointments" | "records" | "files" | "profile";

const FILE_TYPE_LABELS: Record<MedicalFile["type"], string> = {
  "blood-test": "Blood Test",
  scan: "Scan / Imaging",
  report: "Medical Report",
  prescription: "Prescription",
  other: "Other",
};

const FILE_TYPE_ICONS: Record<MedicalFile["type"], React.ReactNode> = {
  "blood-test": <Icons.Activity className="w-5 h-5" />,
  scan: <Icons.FileText className="w-5 h-5" />,
  report: <Icons.Clipboard className="w-5 h-5" />,
  prescription: <Icons.Pill className="w-5 h-5" />,
  other: <Icons.FileText className="w-5 h-5" />,
};

export default function PatientPortalClient() {
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [tab, setTab] = useState<PortalTab>("overview");
  const [regForm, setRegForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    bloodType: "",
  });

  const appointments = email ? getAppointmentsByPatientEmail(email) : [];
  const upcoming = appointments.filter((a) => a.status !== "Completed" && a.status !== "Cancelled");
  const past = appointments.filter((a) => a.status === "Completed" || a.status === "Cancelled");

  const getDoctorName = (id: string) => doctors.find((d) => d.id === id)?.name ?? id;
  const getServiceName = (id: string) => services.find((s) => s.id === id)?.name ?? id;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getPatientByEmail(emailInput);
    if (found) {
      setPatient(found);
      setEmail(emailInput);
    } else {
      setIsRegistering(true);
      setEmail(emailInput);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: PatientRecord = {
      id: `pat-${Date.now()}`,
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      email,
      phone: regForm.phone,
      dateOfBirth: regForm.dateOfBirth,
      bloodType: regForm.bloodType,
      allergies: [],
      medications: [],
      conditions: [],
      files: [],
      registeredAt: new Date().toISOString(),
    };
    registerPatient(newPatient);
    setPatient(newPatient);
    setIsRegistering(false);
  };

  const PORTAL_TABS: { key: PortalTab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <Icons.Activity className="w-4 h-4" /> },
    { key: "appointments", label: "Appointments", icon: <Icons.Calendar className="w-4 h-4" /> },
    { key: "records", label: "Health Profile", icon: <Icons.Clipboard className="w-4 h-4" /> },
    { key: "files", label: "My Files", icon: <Icons.FileText className="w-4 h-4" /> },
    { key: "profile", label: "Account", icon: <Icons.User className="w-4 h-4" /> },
  ];

  /* ── Login Screen ─────────────────────────────────────────── */
  if (!patient && !isRegistering) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl border shadow-2xl"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
              <Icons.Lock className="w-7 h-7" style={{ color: "var(--accent)" }} />
            </div>
            <h1 className="text-2xl font-montserrat font-black">Patient Portal</h1>
            <p className="text-sm mt-2 opacity-50">Enter your email to access your health records</p>
          </div>
          <p className="text-xs text-center mb-5 p-3 rounded-xl" style={{ background: "rgba(var(--accent-rgb),0.08)", color: "var(--accent)" }}>
            Demo: enter <strong>patient@demo.com</strong> to view a pre-populated profile
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent"
              style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}
            />
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-[1.02]"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Access Portal
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

  /* ── Registration Screen ──────────────────────────────────── */
  if (isRegistering) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg p-8 rounded-3xl border shadow-2xl"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
              <Icons.User className="w-7 h-7" style={{ color: "var(--accent)" }} />
            </div>
            <h1 className="text-2xl font-montserrat font-black">Create Your Profile</h1>
            <p className="text-sm mt-2 opacity-50">No account found for <strong className="opacity-80">{email}</strong>. Let&apos;s create one.</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">First Name *</label>
                <input required value={regForm.firstName} onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Last Name *</label>
                <input required value={regForm.lastName} onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Phone *</label>
              <input required type="tel" value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                placeholder="07700 900000"
                className="w-full px-4 py-3 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent"
                style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Date of Birth *</label>
                <input required type="date" value={regForm.dateOfBirth} onChange={(e) => setRegForm({ ...regForm, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-40">Blood Type</label>
                <select value={regForm.bloodType} onChange={(e) => setRegForm({ ...regForm, bloodType: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border outline-none font-montserrat text-sm focus:border-accent"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-subtle)", color: "var(--fg)" }}>
                  <option value="">Unknown</option>
                  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs opacity-30 font-montserrat leading-relaxed">
              Your data is stored securely in this browser for demo purposes only.
            </p>
            <button type="submit" className="w-full py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-[1.02]"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
              Create Profile
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* ── Portal Dashboard ──────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Portal Header */}
      <div className="py-8 px-6 border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] opacity-50 mb-1">Patient Portal</p>
            <h1 className="font-montserrat text-2xl font-black">
              Welcome back, <span style={{ color: "var(--accent)" }}>{patient!.firstName}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/buy/medical-clinic/book"
              className="px-6 py-3 rounded-xl font-montserrat font-bold uppercase tracking-[1.5px] text-[11px] transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              + Book Appointment
            </Link>
            <button
              onClick={() => { setPatient(null); setEmail(""); setEmailInput(""); }}
              className="p-3 rounded-xl border transition-all hover:border-red-500/40 hover:text-red-500"
              style={{ borderColor: "var(--border-subtle)", color: "var(--fg-40)" }}
            >
              <Icons.Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b overflow-x-auto" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
        <div className="max-w-[1200px] mx-auto px-6 flex gap-1">
          {PORTAL_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-5 py-4 border-b-2 font-montserrat text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all"
              style={{
                borderColor: tab === t.key ? "var(--accent)" : "transparent",
                color: tab === t.key ? "var(--accent)" : "var(--fg-40)",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 py-10 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatePresence mode="wait">
            {/* Overview */}
            {tab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Upcoming", value: upcoming.length, sub: "appointments" },
                    { label: "Past visits", value: past.length, sub: "completed" },
                    { label: "Medical files", value: patient!.files.length, sub: "uploaded" },
                    { label: "Conditions", value: patient!.conditions.length, sub: "logged" },
                  ].map((s) => (
                    <div key={s.label} className="p-6 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                      <p className="text-[10px] font-montserrat font-bold uppercase tracking-[2px] opacity-40">{s.label}</p>
                      <div className="flex items-end justify-between mt-4">
                        <span className="text-3xl font-montserrat font-black">{s.value}</span>
                        <span className="text-[10px] font-bold opacity-50">{s.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {upcoming.length > 0 && (
                  <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                    <h3 className="font-montserrat font-black text-lg mb-6">Upcoming Appointments</h3>
                    <div className="space-y-4">
                      {upcoming.map((a) => (
                        <div key={a.id} className="flex items-center justify-between p-4 rounded-2xl border" style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}>
                          <div>
                            <p className="font-montserrat font-bold">{getServiceName(a.serviceId)}</p>
                            <p className="text-xs opacity-50 mt-0.5">{getDoctorName(a.doctorId)} · {a.date} @ {a.time}</p>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full"
                            style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {patient!.conditions.length > 0 && (
                  <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                    <h3 className="font-montserrat font-black text-lg mb-6">Health Summary</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-3">Conditions</p>
                        <div className="flex flex-wrap gap-2">
                          {patient!.conditions.map((c) => (
                            <span key={c} className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(240,168,64,0.1)", color: "var(--secondary)" }}>{c}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-3">Allergies</p>
                        <div className="flex flex-wrap gap-2">
                          {patient!.allergies.length > 0
                            ? patient!.allergies.map((a) => (
                                <span key={a} className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>{a}</span>
                              ))
                            : <span className="text-xs opacity-40">None recorded</span>}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-3">Medications</p>
                        <div className="flex flex-col gap-1">
                          {patient!.medications.length > 0
                            ? patient!.medications.map((m) => (
                                <span key={m} className="text-sm" style={{ color: "var(--fg-60)" }}>{m}</span>
                              ))
                            : <span className="text-xs opacity-40">None recorded</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Appointments */}
            {tab === "appointments" && (
              <motion.div key="appts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                {upcoming.length > 0 && (
                  <>
                    <h2 className="font-montserrat font-black text-xl">Upcoming</h2>
                    {upcoming.map((a) => (
                      <div key={a.id} className="p-6 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="font-montserrat font-black">{getServiceName(a.serviceId)}</span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                                {a.status}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-fg-05" style={{ color: "var(--fg-40)" }}>
                                {a.type}
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: "var(--fg-60)" }}>{getDoctorName(a.doctorId)}</p>
                            <p className="text-sm font-bold mt-1" style={{ color: "var(--accent)" }}>{a.date} @ {a.time}</p>
                            {a.notes && <p className="text-xs mt-2 italic opacity-50">&ldquo;{a.notes}&rdquo;</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {past.length > 0 && (
                  <>
                    <h2 className="font-montserrat font-black text-xl mt-8">Past Visits</h2>
                    {past.map((a) => (
                      <div key={a.id} className="p-6 rounded-3xl border opacity-60" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-montserrat font-bold">{getServiceName(a.serviceId)}</p>
                            <p className="text-xs mt-0.5 opacity-60">{getDoctorName(a.doctorId)} · {a.date}</p>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-fg-05" style={{ color: "var(--fg-40)" }}>{a.status}</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {upcoming.length === 0 && past.length === 0 && (
                  <div className="text-center py-20 opacity-50">
                    <Icons.Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="font-montserrat font-bold">No appointments yet</p>
                    <Link href="/buy/medical-clinic/book" className="mt-4 inline-block text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                      Book your first appointment →
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* Health Profile */}
            {tab === "records" && (
              <motion.div key="records" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Personal Information", items: [
                    { label: "Full Name", value: `${patient!.firstName} ${patient!.lastName}` },
                    { label: "Date of Birth", value: patient!.dateOfBirth },
                    { label: "Blood Type", value: patient!.bloodType || "Not specified" },
                    { label: "Email", value: patient!.email },
                    { label: "Phone", value: patient!.phone },
                  ]},
                ].map((section) => (
                  <div key={section.title} className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                    <h3 className="font-montserrat font-black mb-6">{section.title}</h3>
                    <div className="space-y-4">
                      {section.items.map(({ label, value }) => (
                        <div key={label} className="flex justify-between gap-4 pb-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                          <span className="text-xs uppercase tracking-[2px] font-bold opacity-40 shrink-0">{label}</span>
                          <span className="text-sm font-montserrat font-bold text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <h3 className="font-montserrat font-black mb-6">Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient!.conditions.length > 0
                      ? patient!.conditions.map((c) => (
                          <span key={c} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(240,168,64,0.1)", color: "var(--secondary)" }}>{c}</span>
                        ))
                      : <p className="text-sm opacity-40">No conditions recorded</p>}
                  </div>
                </div>

                <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <h3 className="font-montserrat font-black mb-6">Allergies & Medications</h3>
                  <div className="mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-3">Allergies</p>
                    <div className="flex flex-wrap gap-2">
                      {patient!.allergies.length > 0
                        ? patient!.allergies.map((a) => (
                            <span key={a} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>{a}</span>
                          ))
                        : <p className="text-sm opacity-40">None</p>}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-3">Current Medications</p>
                    <div className="space-y-2">
                      {patient!.medications.length > 0
                        ? patient!.medications.map((m) => (
                            <div key={m} className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-60)" }}>
                              <Icons.Pill className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                              {m}
                            </div>
                          ))
                        : <p className="text-sm opacity-40">None</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Files */}
            {tab === "files" && (
              <motion.div key="files" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-montserrat font-black text-xl">My Medical Files</h2>
                </div>
                {patient!.files.length === 0 ? (
                  <div className="text-center py-20 opacity-50">
                    <Icons.FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="font-montserrat font-bold">No files uploaded yet</p>
                    <p className="text-sm mt-2" style={{ color: "var(--fg-40)" }}>Files will appear here when uploaded by your clinic</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {patient!.files.map((file) => (
                      <div
                        key={file.id}
                        className="p-6 rounded-2xl border flex items-start gap-4 transition-all hover:border-accent/40"
                        style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                          {FILE_TYPE_ICONS[file.type as keyof typeof FILE_TYPE_ICONS]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-montserrat font-bold truncate">{file.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-[2px] mt-0.5" style={{ color: "var(--accent)" }}>
                            {FILE_TYPE_LABELS[file.type as keyof typeof FILE_TYPE_LABELS]}
                          </p>
                          <p className="text-xs opacity-40 mt-0.5">{file.date}</p>
                          {file.notes && <p className="text-xs mt-2 leading-relaxed opacity-60">{file.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Profile */}
            {tab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="max-w-lg">
                  <h2 className="font-montserrat font-black text-xl mb-8">Account Settings</h2>
                  <div className="p-8 rounded-3xl border space-y-6" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-1">Patient ID</p>
                      <p className="font-montserrat font-bold text-sm">{patient!.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-1">Email</p>
                      <p className="font-montserrat font-bold text-sm">{patient!.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-1">Registered</p>
                      <p className="font-montserrat font-bold text-sm">{new Date(patient!.registeredAt).toLocaleDateString("en-GB", { dateStyle: "long" })}</p>
                    </div>
                    <div className="pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <button
                        onClick={() => { setPatient(null); setEmail(""); setEmailInput(""); }}
                        className="px-6 py-3 rounded-xl border text-sm font-montserrat font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-all"
                        style={{ borderColor: "rgba(239,68,68,0.3)" }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

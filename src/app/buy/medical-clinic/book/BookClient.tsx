"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { doctors, services, AVAILABLE_TIMES } from "@/lib/medical-clinic/data";
import { addAppointment } from "@/lib/medical-clinic/storage";
import type { Appointment } from "@/lib/medical-clinic/data";

type Step = 1 | 2 | 3 | 4;
type AppointmentType = "in-person" | "video" | "phone";

const STEPS = [
  { n: 1, label: "Choose Service" },
  { n: 2, label: "Select Doctor" },
  { n: 3, label: "Date & Time" },
  { n: 4, label: "Your Details" },
];

function generateId() {
  return `APT-${String(Date.now()).slice(-6)}`;
}

function SelectionChip({
  icon,
  label,
  value,
  onEdit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.85, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onClick={onEdit}
      className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-left transition-colors hover:border-accent/40"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
    >
      <span style={{ color: "var(--accent)" }}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[1.5px]" style={{ color: "var(--fg-30)" }}>{label}</p>
        <p className="text-xs font-montserrat font-bold truncate max-w-[160px]" style={{ color: "var(--fg)" }}>{value}</p>
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-60 transition-opacity shrink-0" style={{ color: "var(--accent)" }}>
        edit
      </span>
    </motion.button>
  );
}

export default function BookClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [preFilledDoctor, setPreFilledDoctor] = useState(false);
  const [preFilledService, setPreFilledService] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [apptType, setApptType] = useState<AppointmentType>("in-person");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const doctorParam = searchParams.get("doctor");
    const serviceParam = searchParams.get("service");
    const validDoctor = doctorParam && doctors.find((d) => d.id === doctorParam);
    const validService = serviceParam && services.find((s) => s.id === serviceParam);
    if (validDoctor) { setSelectedDoctor(doctorParam!); setPreFilledDoctor(true); }
    if (validService) { setSelectedService(serviceParam!); setPreFilledService(true); }
    if (validDoctor && validService) setStep(3);
    else if (validService) setStep(2);
    // only doctor pre-filled → stay at step 1, step 2 will be skipped after service selection
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const service = services.find((s) => s.id === selectedService);
  const doctor = doctors.find((d) => d.id === selectedDoctor);

  const filteredDoctors = selectedService
    ? doctors.filter((d) => {
        const svc = services.find((s) => s.id === selectedService);
        if (!svc) return true;
        return d.specialty.toLowerCase().includes(svc.category.split("-")[0]) || svc.category === "general";
      })
    : doctors;

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const appt: Appointment = {
      id: generateId(),
      patientName: form.name,
      patientEmail: form.email,
      patientPhone: form.phone,
      doctorId: selectedDoctor,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      type: apptType,
      status: "Pending",
      notes: form.notes,
      createdAt: new Date().toISOString(),
    };
    setTimeout(() => {
      addAppointment(appt);
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-12 rounded-[2.5rem] border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
            <Icons.CheckCircle className="w-10 h-10" style={{ color: "var(--accent)" }} />
          </div>
          <h2 className="font-montserrat text-3xl font-black mb-4">Appointment Requested</h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--fg-60)" }}>
            Thank you, <strong style={{ color: "var(--fg)" }}>{form.name}</strong>. Your appointment with <strong style={{ color: "var(--fg)" }}>{doctor?.name}</strong> on <strong style={{ color: "var(--fg)" }}>{selectedDate} at {selectedTime}</strong> has been received.
          </p>
          <p className="text-sm mb-10" style={{ color: "var(--fg-40)" }}>
            You will receive a confirmation to <strong>{form.email}</strong> once the clinic approves your booking.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/buy/medical-clinic/patient"
              className="w-full py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs text-center transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              View Patient Portal
            </Link>
            <Link
              href="/buy/medical-clinic"
              className="w-full py-4 rounded-2xl border font-montserrat font-bold uppercase tracking-[2px] text-xs text-center"
              style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)" }}
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[4px] block mb-4" style={{ color: "var(--accent)" }}>
            Online Booking
          </span>
          <h1 className="font-montserrat text-4xl md:text-5xl font-black tracking-tight mb-4">
            Book Your Appointment
          </h1>
          <p style={{ color: "var(--fg-60)" }}>Same-day GP slots available. Specialist appointments within 2–5 days.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: step >= s.n ? "var(--accent)" : "var(--fg-08)",
                    color: step >= s.n ? "var(--bg-primary)" : "var(--fg-40)",
                  }}
                >
                  {step > s.n ? <Icons.Check className="w-4 h-4" /> : s.n}
                </div>
                <span className="text-[9px] uppercase tracking-[1.5px] font-bold hidden sm:block" style={{ color: step === s.n ? "var(--accent)" : "var(--fg-30)" }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px max-w-[60px] mb-4" style={{ background: step > s.n ? "var(--accent)" : "var(--border-subtle)" }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Running selection summary — visible on steps 2 & 3 only */}
        {step >= 2 && step <= 3 && (
          <motion.div
            layout
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            <AnimatePresence>
              {selectedService && (
                <SelectionChip
                  key="service-chip"
                  icon={<Icons.Clock className="w-3.5 h-3.5" />}
                  label="Service"
                  value={`${service?.name} · £${service?.price}`}
                  onEdit={() => setStep(1)}
                />
              )}
              {selectedDoctor && step === 3 && (
                <SelectionChip
                  key="doctor-chip"
                  icon={<Icons.Star className="w-3.5 h-3.5" />}
                  label="Doctor"
                  value={doctor?.name ?? ""}
                  onEdit={() => setStep(2)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Choose Service */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-montserrat text-2xl font-bold mb-8">What do you need help with?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => { setSelectedService(svc.id); setStep(preFilledDoctor ? 3 : 2); }}
                    className="group p-6 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:shadow-lg hover:border-accent/40"
                    style={{
                      background: selectedService === svc.id ? "rgba(var(--accent-rgb),0.08)" : "var(--bg-surface)",
                      borderColor: selectedService === svc.id ? "var(--accent)" : "var(--border-card)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: "var(--accent)" }}>
                        {svc.category.replace("-", " ")}
                      </span>
                      <div className="flex items-center gap-1 text-[11px]" style={{ color: "var(--fg-40)" }}>
                        <Icons.Clock className="w-3 h-3" />
                        {svc.duration} min
                      </div>
                    </div>
                    <h3 className="font-montserrat font-bold mb-1 group-hover:text-accent transition-colors">{svc.name}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--fg-40)" }}>{svc.shortDescription}</p>
                    <span className="font-montserrat font-black" style={{ color: "var(--accent)" }}>£{svc.price}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Doctor */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-montserrat text-2xl font-bold">Choose your doctor</h2>
                <button onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-wider opacity-50 hover:opacity-100 transition">
                  ← Back
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => { setSelectedDoctor(doc.id); setStep(3); }}
                    className="group p-6 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:shadow-lg hover:border-accent/40"
                    style={{
                      background: selectedDoctor === doc.id ? "rgba(var(--accent-rgb),0.08)" : "var(--bg-surface)",
                      borderColor: selectedDoctor === doc.id ? "var(--accent)" : "var(--border-card)",
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        crossOrigin="anonymous"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop"; }}
                      />
                      <div>
                        <p className="font-montserrat font-bold group-hover:text-accent transition-colors">{doc.name}</p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: "var(--accent)" }}>{doc.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Icons.Star className="w-3 h-3" style={{ color: "var(--secondary)" }} />
                          <span className="text-xs font-bold">{doc.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="opacity-50">{doc.availableDays.slice(0, 2).join(" · ")}…</span>
                      <span className="font-bold" style={{ color: "var(--accent)" }}>£{doc.consultationFee}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-montserrat text-2xl font-bold">Select date & time</h2>
                <button onClick={() => setStep(preFilledDoctor && !preFilledService ? 1 : 2)} className="text-xs font-bold uppercase tracking-wider opacity-50 hover:opacity-100 transition">
                  ← Back
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] mb-3 block opacity-50">Date</label>
                  <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", color: "var(--fg)" }}
                  />

                  <div className="mt-6">
                    <label className="text-[10px] font-bold uppercase tracking-[2px] mb-3 block opacity-50">Appointment Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["in-person", "video", "phone"] as AppointmentType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setApptType(type)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all"
                          style={{
                            background: apptType === type ? "rgba(var(--accent-rgb),0.1)" : "var(--bg-surface)",
                            borderColor: apptType === type ? "var(--accent)" : "var(--border-card)",
                            color: apptType === type ? "var(--accent)" : "var(--fg-40)",
                          }}
                        >
                          {type === "in-person" && <Icons.MapPin className="w-4 h-4" />}
                          {type === "video" && <Icons.Video className="w-4 h-4" />}
                          {type === "phone" && <Icons.Phone className="w-4 h-4" />}
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] mb-3 block opacity-50">Available Times</label>
                  <div className="grid grid-cols-3 gap-2">
                    {AVAILABLE_TIMES.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className="py-3 rounded-xl border text-xs font-bold font-montserrat transition-all hover:border-accent/40"
                        style={{
                          background: selectedTime === time ? "var(--accent)" : "var(--bg-surface)",
                          borderColor: selectedTime === time ? "var(--accent)" : "var(--border-card)",
                          color: selectedTime === time ? "var(--bg-primary)" : "var(--fg-60)",
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-10 py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Patient Details */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-montserrat text-2xl font-bold">Your details</h2>
                <button onClick={() => setStep(3)} className="text-xs font-bold uppercase tracking-wider opacity-50 hover:opacity-100 transition">
                  ← Back
                </button>
              </div>

              {/* Summary */}
              <div className="p-6 rounded-2xl border mb-8" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[2px] mb-4 opacity-50">Booking Summary</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="opacity-40">Service</span><br /><strong>{service?.name}</strong></div>
                  <div><span className="opacity-40">Doctor</span><br /><strong>{doctor?.name}</strong></div>
                  <div><span className="opacity-40">Date</span><br /><strong>{selectedDate}</strong></div>
                  <div><span className="opacity-40">Time</span><br /><strong>{selectedTime}</strong></div>
                  <div><span className="opacity-40">Type</span><br /><strong className="capitalize">{apptType}</strong></div>
                  <div><span className="opacity-40">Fee</span><br /><strong style={{ color: "var(--accent)" }}>£{service?.price}</strong></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-50">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", color: "var(--fg)" }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-50">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", color: "var(--fg)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-50">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="07700 900000"
                    className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", color: "var(--fg)" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[2px] mb-2 block opacity-50">Notes (optional)</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Any specific concerns or information for the doctor…"
                    className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat transition-all focus:border-accent resize-none"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)", color: "var(--fg)" }}
                  />
                </div>
                <p className="text-xs opacity-30 font-montserrat leading-relaxed">
                  By booking, you consent to VitalCare storing your details for appointment management purposes. All data is stored locally in this demo.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-sm transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  {submitting ? "Confirming…" : "Confirm Appointment"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

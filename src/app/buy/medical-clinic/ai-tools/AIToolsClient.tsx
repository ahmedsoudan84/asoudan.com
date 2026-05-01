"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/medical-clinic/Icons";
import { analyseSymptoms, searchServices } from "@/lib/medical-clinic/smart-logic";
import { services } from "@/lib/medical-clinic/data";

const SAMPLE_SYMPTOMS = [
  "I have chest pain and shortness of breath",
  "My skin is itchy and rashy",
  "Feeling anxious and can't sleep",
  "Lower back pain after running",
  "Tired all the time, losing weight",
  "Heavy periods and hormonal issues",
];

const URGENCY_CONFIG = {
  emergency: {
    label: "Emergency",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    icon: <Icons.AlertTriangle className="w-5 h-5" />,
    description: "Seek immediate medical attention. Call 999 or go to A&E.",
  },
  urgent: {
    label: "Urgent",
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    icon: <Icons.Clock className="w-5 h-5" />,
    description: "We recommend booking an appointment within 24–48 hours.",
  },
  routine: {
    label: "Routine",
    color: "#00F1F1",
    bg: "rgba(0,241,241,0.1)",
    icon: <Icons.Calendar className="w-5 h-5" />,
    description: "A non-urgent appointment is recommended. Book at your convenience.",
  },
  lifestyle: {
    label: "Lifestyle",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    icon: <Icons.Activity className="w-5 h-5" />,
    description: "This may be addressed through lifestyle changes. A consultation can provide personalised guidance.",
  },
};

export default function AIToolsClient() {
  const searchParams = useSearchParams();
  const [symptomInput, setSymptomInput] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [analysisResult, setAnalysisResult] = useState<ReturnType<typeof analyseSymptoms> | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [activeTab, setActiveTab] = useState<"symptom-checker" | "service-finder">("symptom-checker");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSymptomInput(q);
      handleAnalyse(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnalyse = (input?: string) => {
    const query = input ?? symptomInput;
    if (!query.trim()) return;
    setIsAnalysing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      const result = analyseSymptoms(query);
      setAnalysisResult(result);
      setIsAnalysing(false);
    }, 1200);
  };

  const serviceResults = serviceSearch.trim() ? searchServices(serviceSearch, services) : services;

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-[3px] mb-6"
            style={{ background: "rgba(var(--accent-rgb),0.08)", borderColor: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
          >
            <Icons.Sparkles className="w-3.5 h-3.5" />
            Powered by VitalCare AI
          </div>
          <h1 className="font-montserrat text-5xl md:text-6xl font-black tracking-tight mb-6">AI Health Tools</h1>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--fg-60)" }}>
            Describe your symptoms to get an instant triage recommendation — or search our services intelligently.
            All client-side. Zero data shared externally.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 justify-center mb-12">
          {[
            { key: "symptom-checker" as const, label: "Symptom Checker", icon: <Icons.Brain className="w-4 h-4" /> },
            { key: "service-finder" as const, label: "Service Finder", icon: <Icons.Search className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border font-montserrat text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                background: activeTab === t.key ? "var(--accent)" : "var(--bg-surface)",
                borderColor: activeTab === t.key ? "var(--accent)" : "var(--border-card)",
                color: activeTab === t.key ? "var(--bg-primary)" : "var(--fg-50)",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Symptom Checker */}
          {activeTab === "symptom-checker" && (
            <motion.div key="checker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div
                className="p-8 rounded-[2.5rem] border mb-8"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                    <Icons.Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-montserrat font-bold">AI Symptom Checker</p>
                    <p className="text-[10px] uppercase tracking-wider opacity-50">Symptom → Specialist in seconds</p>
                  </div>
                </div>

                <textarea
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="Describe your symptoms in your own words. E.g. 'I've had a persistent cough for 2 weeks with chest tightness and fatigue…'"
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl border outline-none font-montserrat text-sm resize-none transition-all focus:border-accent mb-5"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-card)", color: "var(--fg)" }}
                />

                <div className="flex flex-wrap gap-2 mb-6">
                  {SAMPLE_SYMPTOMS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSymptomInput(s)}
                      className="px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-all"
                      style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)", background: "var(--fg-05)" }}
                    >
                      {s.length > 30 ? s.slice(0, 30) + "…" : s}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleAnalyse()}
                  disabled={!symptomInput.trim() || isAnalysing}
                  className="w-full py-4 rounded-2xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-[1.02] disabled:opacity-40"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  {isAnalysing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Analysing…
                    </span>
                  ) : "Analyse Symptoms"}
                </button>

                <p className="text-[10px] opacity-30 text-center mt-4 font-montserrat leading-relaxed">
                  Not a medical diagnosis. In an emergency, call 999. Always consult a qualified clinician.
                </p>
              </div>

              {/* Result */}
              <AnimatePresence>
                {analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Urgency Banner */}
                    {(() => {
                      const cfg = URGENCY_CONFIG[analysisResult.urgency as keyof typeof URGENCY_CONFIG];
                      return (
                        <div
                          className="p-6 rounded-2xl border flex items-start gap-4"
                          style={{ background: cfg.bg, borderColor: cfg.color + "40" }}
                        >
                          <div style={{ color: cfg.color }}>{cfg.icon}</div>
                          <div>
                            <p className="font-montserrat font-black mb-1" style={{ color: cfg.color }}>
                              {cfg.label} — {analysisResult.urgency === "emergency" ? "Seek immediate care" : "Recommended action"}
                            </p>
                            <p className="text-sm" style={{ color: cfg.color, opacity: 0.8 }}>{cfg.description}</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Possible Conditions */}
                    <div className="p-6 rounded-2xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-4 opacity-50">Possible Conditions</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.conditions.map((c) => (
                          <span key={c} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "var(--fg-06)", color: "var(--fg-60)" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Advice */}
                    <div className="p-6 rounded-2xl border" style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icons.Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        <p className="text-[10px] font-bold uppercase tracking-[3px] opacity-50">AI Recommendation</p>
                      </div>
                      <p className="leading-relaxed" style={{ color: "var(--fg-70)" }}>{analysisResult.advice}</p>
                    </div>

                    {/* Recommended Service */}
                    {analysisResult.recommendedService && (
                      <div className="p-6 rounded-2xl border" style={{ background: "rgba(var(--accent-rgb),0.05)", borderColor: "rgba(var(--accent-rgb),0.2)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={{ color: "var(--accent)" }}>Recommended Service</p>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div>
                            <p className="font-montserrat font-black text-lg">{analysisResult.recommendedService.name}</p>
                            <p className="text-sm mt-0.5" style={{ color: "var(--fg-50)" }}>
                              with {analysisResult.doctorName} · {analysisResult.recommendedService.duration} min
                            </p>
                          </div>
                          <span className="font-montserrat font-black text-2xl" style={{ color: "var(--accent)" }}>
                            £{analysisResult.recommendedService.price}
                          </span>
                        </div>
                        <div className="flex gap-3 mt-5">
                          <Link
                            href="/buy/medical-clinic/book"
                            className="flex-1 text-center py-3.5 rounded-xl font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:scale-105"
                            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                          >
                            Book Now
                          </Link>
                          <Link
                            href={`/buy/medical-clinic/services/${analysisResult.recommendedService.slug}`}
                            className="flex-1 text-center py-3.5 rounded-xl border font-montserrat font-bold uppercase tracking-[2px] text-xs transition-all hover:border-accent/40"
                            style={{ borderColor: "var(--border-subtle)", color: "var(--fg-60)" }}
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <p className="text-[11px] font-montserrat leading-relaxed opacity-30 text-center">
                      {analysisResult.disclaimer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Service Finder */}
          {activeTab === "service-finder" && (
            <motion.div key="finder" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div
                className="flex items-center gap-3 px-5 py-4 rounded-2xl border mb-8"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
              >
                <Icons.Search className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Search by symptom or specialty… 'heart', 'skin', 'stress', 'back pain'"
                  className="flex-1 bg-transparent outline-none font-montserrat text-sm py-2"
                  style={{ color: "var(--fg)" }}
                />
                {serviceSearch && (
                  <button onClick={() => setServiceSearch("")} style={{ color: "var(--fg-40)" }}>
                    <Icons.X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-sm mb-6" style={{ color: "var(--fg-40)" }}>
                {serviceResults.length} service{serviceResults.length !== 1 ? "s" : ""} found
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                {serviceResults.map((svc, i) => (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={`/buy/medical-clinic/services/${svc.slug}`}
                      className="group flex items-start gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={svc.image}
                          alt={svc.name}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=200&fit=crop"; }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={{ color: "var(--accent)" }}>
                          {svc.category.replace("-", " ")}
                        </p>
                        <p className="font-montserrat font-bold group-hover:text-accent transition-colors">{svc.name}</p>
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--fg-40)" }}>{svc.shortDescription}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[11px]" style={{ color: "var(--fg-40)" }}>{svc.duration} min</span>
                          <span className="font-montserrat font-black text-sm" style={{ color: "var(--accent)" }}>£{svc.price}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import React from "react";
import { MedicalNav } from "@/components/medical-clinic/MedicalNav";
import { AIChatWidget } from "@/components/medical-clinic/AIChatWidget";
import Footer from "@/components/sections/Footer";
import { DemoBanner } from "@/components/buy/DemoBanner";

export const metadata: Metadata = {
  title: "VitalCare | Private Medical Clinic Template",
  description:
    "Premium private clinic template with AI symptom checker, appointment booking, patient portal, and full admin panel. Built with Next.js.",
};

export default function MedicalClinicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MedicalNav />
      <DemoBanner />
      <div className="min-h-screen overflow-x-hidden">{children}</div>
      <Footer />
      <AIChatWidget />
    </>
  );
}

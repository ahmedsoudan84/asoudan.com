import { Suspense } from "react";
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — VitalCare Clinic",
  description: "Browse our comprehensive range of private medical services: GP consultations, cardiology, dermatology, physiotherapy, mental health, nutrition, diagnostics, and women's health.",
};

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesClient />
    </Suspense>
  );
}

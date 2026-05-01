import type { Metadata } from "next";
import OffersClient from "./OffersClient";

export const metadata: Metadata = {
  title: "Health Offers & Bundles — VitalCare Clinic",
  description: "Exclusive health packages and bundle offers. Save on executive health screens, cardiology packages, physiotherapy packs, and more.",
};

export default function OffersPage() {
  return <OffersClient />;
}

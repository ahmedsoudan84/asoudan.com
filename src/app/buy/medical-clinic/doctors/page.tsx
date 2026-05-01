import type { Metadata } from "next";
import DoctorsClient from "./DoctorsClient";

export const metadata: Metadata = {
  title: "Our Doctors — VitalCare Clinic",
  description: "Meet our world-class team of consultants and specialists. Book directly with your chosen doctor.",
};

export default function DoctorsPage() {
  return <DoctorsClient />;
}

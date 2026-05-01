import type { Metadata } from "next";
import PatientPortalClient from "./PatientPortalClient";

export const metadata: Metadata = {
  title: "Patient Portal — VitalCare Clinic",
  description: "Access your medical records, view appointments, and manage your health profile securely.",
};

export default function PatientPortalPage() {
  return <PatientPortalClient />;
}

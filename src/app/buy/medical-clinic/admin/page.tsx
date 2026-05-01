import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Panel — VitalCare Clinic",
  description: "VitalCare admin dashboard — manage appointments, patients, doctors, and services.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}

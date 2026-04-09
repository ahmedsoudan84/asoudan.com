import { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Portal — AI Estate",
  description: "Manage listings, leads, and settings for your AI Estate template.",
};

export default function AdminPage() {
  return <AdminClient />;
}

import { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Merchant Dashboard | Elite Diner",
  description:
    "Internal restaurant management dashboard for Elite Diner. View insights, orders, and manage your AI-powered menu.",
};

export default function AdminPage() {
  return <AdminClient />;
}

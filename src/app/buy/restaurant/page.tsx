import RestaurantClient from "./RestaurantClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elite Diner | Premium Restaurant Template",
  description: "AI-powered premium restaurant template. Elegant menu, online ordering, table booking, and intelligent recommendations.",
};

export default function RestaurantPage() {
  return <RestaurantClient />;
}
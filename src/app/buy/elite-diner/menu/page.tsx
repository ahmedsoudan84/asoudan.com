import { Suspense } from "react";
import { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu | Elite Diner — AI-Powered Dining",
  description:
    "Explore our exquisite menu with AI-powered search and recommendations. From grass-fed ribeye to hand-dived scallops.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={null}>
      <MenuClient />
    </Suspense>
  );
}

import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Kurator — Objects, curated.",
  description:
    "A premium e-commerce template with AI-powered semantic search, a private AI stylist, and a checkout flow that actually respects the customer. Fully client-side.",
};

export default function EcommerceHomePage() {
  return <HomeClient />;
}

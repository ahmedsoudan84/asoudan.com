import type { Metadata } from "next";
import AIToolsClient from "./AIToolsClient";

export const metadata: Metadata = {
  title: "AI Stylist — Kurator",
  description:
    "Three AI modes: semantic search, occasion-based bundles, and a conversational stylist. Runs entirely client-side.",
};

export default function AIToolsPage() {
  return <AIToolsClient />;
}

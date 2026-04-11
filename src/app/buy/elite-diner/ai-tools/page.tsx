import { Metadata } from "next";
import AIToolsClient from "./AIToolsClient";

export const metadata: Metadata = {
  title: "AI Concierge | Elite Diner — Intelligent Dining",
  description:
    "Discover your next favourite meal with our AI Concierge. Semantic search, occasion-based recommendations, and perfect wine pairings.",
};

export default function AIToolsPage() {
  return <AIToolsClient />;
}

import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Kurator",
  description:
    "Kurator is a demonstration e-commerce template: curated catalogue, AI stylist, persistent cart, zero API keys.",
};

export default function AboutPage() {
  return <AboutClient />;
}

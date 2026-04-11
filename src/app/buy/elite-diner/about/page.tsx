import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Our Story | Elite Diner — Culinary Excellence",
  description:
    "Discover the history and passion behind Elite Diner. Our commitment to sustainability, local sourcing, and the art of fine dining.",
};

export default function AboutPage() {
  return <AboutClient />;
}

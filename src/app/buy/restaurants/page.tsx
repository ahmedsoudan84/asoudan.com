import { Metadata } from "next";
import RestaurantsHomeClient from "./RestaurantsHomeClient";

export const metadata: Metadata = {
  title: "Elite Diner — Premium Restaurant Template",
  description:
    "A premium restaurant website template with AI-powered menu recommender, semantic search, and online ordering. Built with Next.js 15.",
};

export default function RestaurantsHomePage() {
  return <RestaurantsHomeClient />;
}
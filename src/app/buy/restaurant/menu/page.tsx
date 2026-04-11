import MenuClient from "./MenuClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Elite Diner",
  description: "Explore our elegant menu with AI-powered recommendations. Starters, mains, desserts, and wine.",
};

export default function MenuPage() {
  return <MenuClient />;
}
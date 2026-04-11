import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Elite Diner — Premium Fine Dining Template",
  description:
    "Experience the future of fine dining with Elite Diner. AI-powered recommendations, seamless ordering, and elegant design. Built with Next.js 15.",
};

export default function EliteDinerHomePage() {
  return <HomeClient />;
}

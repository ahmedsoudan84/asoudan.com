import { Metadata } from "next";
import RealEstateHomeClient from "./RealEstateHomeClient";

export const metadata: Metadata = {
  title: "Real Estate — London Property Template",
  description:
    "A premium London estate agent website template with AI-powered semantic search, chatbot, and area insights. Built with Next.js 15.",
};

export default function RealEstateHomePage() {
  return <RealEstateHomeClient />;
}

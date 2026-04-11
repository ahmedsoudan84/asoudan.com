import { Metadata } from "next";
import AIToolsClient from "./AIToolsClient";

export const metadata: Metadata = {
  title: "AI Tools Demo | Elite Diner",
  description: "Experience our AI-powered features: recommender, chatbot, dietary search.",
};

export default function AIToolsPage() {
  return <AIToolsClient />;
}
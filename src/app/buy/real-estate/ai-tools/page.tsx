import { Metadata } from "next";
import AIToolsClient from "./AIToolsClient";

export const metadata: Metadata = {
  title: "AI Features Demo — AI Estate",
  description: "Try the AI-powered features: semantic search, chatbot, and area insights — all running client-side.",
};

export default function AIToolsPage() {
  return <AIToolsClient />;
}

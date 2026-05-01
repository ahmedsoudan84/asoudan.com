import type { Metadata } from "next";
import AIToolsClient from "./AIToolsClient";

export const metadata: Metadata = {
  title: "AI Health Tools — VitalCare Clinic",
  description: "Try our AI symptom checker, health chat, and smart service finder. Powered by client-side AI — no API key, no data sharing.",
};

export default function AIToolsPage() {
  return <AIToolsClient />;
}

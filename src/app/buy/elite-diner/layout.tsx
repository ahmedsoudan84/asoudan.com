import type { Metadata } from "next";
import { EliteDinerNav } from "@/components/elite-diner/EliteDinerNav";
import { AIChatWidget } from "@/components/elite-diner/AIChatWidget";
import Footer from "@/components/sections/Footer";
import { DemoBanner } from "@/components/buy/DemoBanner";

export const metadata: Metadata = {
  title: "Elite Diner | premium Fine Dining in London",
  description:
    "A high-end restaurant template with AI-powered semantic search, chatbot, and full ordering system. Built with Next.js 15.",
};

export default function EliteDinerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EliteDinerNav />
      <DemoBanner />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
      <AIChatWidget />
    </>
  );
}

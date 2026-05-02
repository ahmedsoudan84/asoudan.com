import type { Metadata } from "next";
import EcommerceNav from "@/components/ecommerce/EcommerceNav";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import AIChatWidget from "@/components/ecommerce/AIChatWidget";
import AddedToast from "@/components/ecommerce/AddedToast";
import Footer from "@/components/sections/Footer";
import { DemoBanner } from "@/components/buy/DemoBanner";

export const metadata: Metadata = {
  title: "Kurator — Premium E-Commerce Template",
  description:
    "An AI-powered e-commerce template with semantic product search, an in-house AI stylist, persistent cart, and a full checkout flow. Built with Next.js 16.",
};

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EcommerceNav />
      <DemoBanner href="/buy/contact?template=ecommerce" />
      <div className="min-h-screen">{children}</div>
      <Footer />
      <CartDrawer />
      <AddedToast />
      <AIChatWidget />
    </>
  );
}

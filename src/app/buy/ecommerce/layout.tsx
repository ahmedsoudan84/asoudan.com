import type { Metadata } from "next";
import EcommerceNav from "@/components/ecommerce/EcommerceNav";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import AIChatWidget from "@/components/ecommerce/AIChatWidget";
import Footer from "@/components/sections/Footer";

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
      <div className="min-h-screen">{children}</div>
      <Footer />
      <CartDrawer />
      <AIChatWidget />
    </>
  );
}

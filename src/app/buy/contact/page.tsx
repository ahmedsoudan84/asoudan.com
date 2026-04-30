import type { Metadata } from "next";
import BuyContactClient from "./BuyContactClient";

export const metadata: Metadata = {
  title: "Buy a Template — Get in Touch",
  description:
    "Enquire about branding, content, and deploy of one of the premium templates. One working day reply, GBP pricing, no commitment.",
  alternates: { canonical: "https://asoudan.com/buy/contact" },
  robots: { index: false, follow: true },
};

export default function BuyContactPage() {
  return <BuyContactClient />;
}

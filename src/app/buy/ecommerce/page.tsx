import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { ECOMMERCE_FAQ, buildFAQJsonLd } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const tpl = categories.find((c) => c.slug === "ecommerce");

export const metadata: Metadata = {
  title: "Kurator — Premium E-Commerce Website Template",
  description:
    "Branded e-commerce website with AI semantic search, an on-device stylist, persistent cart, and admin panel. Productized service from £1,495 — branded, deployed, and live.",
  keywords: [
    "ecommerce website template",
    "premium ecommerce template",
    "AI ecommerce template",
    "Next.js ecommerce template",
    "online shop template",
    "AI shopping assistant",
    "boutique ecommerce template",
    "ecommerce web design London",
  ],
  alternates: { canonical: "https://asoudan.com/buy/ecommerce" },
  openGraph: {
    title: "Kurator — Premium E-Commerce Website Template",
    description:
      "AI semantic search, AI stylist, cart, admin panel. Branded and deployed from £1,495.",
    url: "https://asoudan.com/buy/ecommerce",
    type: "website",
    images: [
      {
        url: tpl?.coverImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kurator e-commerce template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurator — Premium E-Commerce Website Template",
    description:
      "AI search, AI stylist, cart, admin panel. From £1,495 — branded and deployed.",
    images: [tpl?.coverImage || "/images/og-image.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kurator — Premium E-Commerce Website Template",
  description:
    "Done-for-you e-commerce website with AI-powered semantic search, on-device stylist, persistent cart, three-step checkout, and admin panel. Includes branding, content, and deploy.",
  brand: { "@type": "Brand", name: "Ahmed Soudan" },
  category: "Web design service",
  url: "https://asoudan.com/buy/ecommerce",
  image: tpl?.coverImage,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GBP",
    lowPrice: "1495",
    highPrice: "4995",
    offerCount: 3,
    availability: "https://schema.org/InStock",
    seller: { "@type": "Person", name: "Ahmed Soudan" },
  },
};

export default function EcommerceHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQJsonLd(ECOMMERCE_FAQ)),
        }}
      />
      <HomeClient />
    </>
  );
}

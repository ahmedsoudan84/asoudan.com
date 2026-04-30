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
    "ecommerce website template UK",
    "buy ecommerce website UK",
    "online shop website UK",
    "premium ecommerce template",
    "AI ecommerce website",
    "AI shopping assistant",
    "boutique ecommerce website UK",
    "small business online shop UK",
    "Shopify alternative UK",
    "WooCommerce alternative UK",
    "custom ecommerce website UK",
    "ecommerce web design London",
    "Next.js ecommerce template",
    "fashion ecommerce website UK",
    "ecommerce website cost UK",
    "online store design UK",
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
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kurator — Premium E-Commerce Website Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurator — Premium E-Commerce Website Template",
    description:
      "AI search, AI stylist, cart, admin panel. From £1,495 — branded and deployed.",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=630&fit=crop"],
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://asoudan.com" },
    { "@type": "ListItem", position: 2, name: "Templates", item: "https://asoudan.com/buy" },
    { "@type": "ListItem", position: 3, name: "Kurator — E-Commerce Template", item: "https://asoudan.com/buy/ecommerce" },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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

import { Metadata } from "next";
import BuyCategoriesClient from "./BuyCategoriesClient";

export const metadata: Metadata = {
  title: "Premium Website Templates",
  description:
    "Ready-to-use, customisable website templates built with Next.js and AI. Browse real estate, e-commerce, and more.",
};

export default function BuyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Elite Diner Restaurant Template",
          "description": "AI menu recommender, semantic search, chatbot, online ordering, table booking. Fully client-side.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Real Estate London Estate Agent Template",
          "description": "Semantic property search, AI chatbot, area insights, admin portal. Fully client-side.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Kurator E-Commerce Premium Shop Template",
          "description": "Semantic product search, AI stylist with occasion bundles, persistent cart, 3-step checkout. Fully client-side.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BuyCategoriesClient />
    </>
  );
}

import { Metadata } from "next";
import BuyCategoriesClient from "./BuyCategoriesClient";

export const metadata: Metadata = {
  title: "Premium Website Templates — From £1,495, Branded & Deployed",
  description:
    "Done-for-you Next.js website templates for restaurants, estate agents, and e-commerce. AI features, admin panel, branded with your logo and content. From £1,495.",
  keywords: [
    "premium website templates UK",
    "buy website template UK",
    "done-for-you website UK",
    "branded website template",
    "Next.js website template",
    "AI website template",
    "restaurant website template UK",
    "estate agent website template UK",
    "ecommerce website template UK",
    "small business website UK",
    "custom website design London",
    "website design and development UK",
    "Wix alternative UK",
    "Squarespace alternative UK",
    "affordable website design UK",
    "website from £1495",
  ],
  alternates: { canonical: "https://asoudan.com/buy" },
  openGraph: {
    title: "Premium Website Templates — From £1,495, Branded & Deployed",
    description:
      "Done-for-you Next.js templates with AI features and admin panels. We brand them with your identity and deploy to your domain.",
    url: "https://asoudan.com/buy",
    type: "website",
  },
};

export default function BuyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Elite Diner — Premium Restaurant Website Template",
          description:
            "AI menu search, online ordering, table reservations, admin panel. Branded and deployed.",
          url: "https://asoudan.com/buy/elite-diner",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "GBP",
            lowPrice: "1495",
            highPrice: "4995",
            offerCount: 3,
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "AIEstate — Premium London Estate Agent Website Template",
          description:
            "AI semantic property search, area insights, chatbot, admin portal. Branded and deployed.",
          url: "https://asoudan.com/buy/real-estate",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "GBP",
            lowPrice: "1495",
            highPrice: "4995",
            offerCount: 3,
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Kurator — Premium E-Commerce Website Template",
          description:
            "AI semantic search, AI stylist, persistent cart, three-step checkout, admin panel. Branded and deployed.",
          url: "https://asoudan.com/buy/ecommerce",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "GBP",
            lowPrice: "1495",
            highPrice: "4995",
            offerCount: 3,
            availability: "https://schema.org/InStock",
          },
        },
      },
    ],
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

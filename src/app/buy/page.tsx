import { Metadata } from "next";
import BuyCategoriesClient from "./BuyCategoriesClient";

export const metadata: Metadata = {
  title: "Premium Website Templates — From £1,495, Branded & Deployed",
  description:
    "Done-for-you Next.js website templates for restaurants, estate agents, and e-commerce. AI features, admin panel, branded with your logo and content. From £1,495.",
  keywords: [
    "premium website templates",
    "Next.js templates",
    "restaurant website template",
    "real estate website template",
    "ecommerce website template",
    "AI website template",
    "branded website template",
    "done-for-you website",
    "London web design",
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

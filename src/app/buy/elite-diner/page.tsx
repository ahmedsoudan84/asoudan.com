import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { ELITE_DINER_FAQ, buildFAQJsonLd } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const tpl = categories.find((c) => c.slug === "elite-diner");

export const metadata: Metadata = {
  title: "Elite Diner — Premium Restaurant Website Template",
  description:
    "Branded restaurant website with AI menu search, online ordering, table reservations, and an admin panel. Productized service from £1,495 — branded, deployed, and live.",
  keywords: [
    "restaurant website template",
    "premium restaurant template",
    "AI restaurant website",
    "online ordering template",
    "restaurant booking website",
    "Next.js restaurant template",
    "fine dining website",
    "restaurant web design London",
  ],
  alternates: { canonical: "https://asoudan.com/buy/elite-diner" },
  openGraph: {
    title: "Elite Diner — Premium Restaurant Website Template",
    description:
      "AI menu search, ordering, reservations, admin panel. Branded and deployed from £1,495.",
    url: "https://asoudan.com/buy/elite-diner",
    type: "website",
    images: [
      {
        url: tpl?.coverImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elite Diner restaurant template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Diner — Premium Restaurant Website Template",
    description:
      "AI menu search, ordering, reservations, admin panel. From £1,495 — branded and deployed.",
    images: [tpl?.coverImage || "/images/og-image.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Elite Diner — Premium Restaurant Website Template",
  description:
    "Done-for-you restaurant website with AI-powered menu search, online ordering, table reservations, and an admin panel. Includes branding, content, and deploy.",
  brand: { "@type": "Brand", name: "Ahmed Soudan" },
  category: "Web design service",
  url: "https://asoudan.com/buy/elite-diner",
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

export default function EliteDinerHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQJsonLd(ELITE_DINER_FAQ)),
        }}
      />
      <HomeClient />
    </>
  );
}

import { Metadata } from "next";
import RealEstateHomeClient from "./RealEstateHomeClient";
import { REAL_ESTATE_FAQ, buildFAQJsonLd } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const tpl = categories.find((c) => c.slug === "real-estate");

export const metadata: Metadata = {
  title: "AIEstate — Premium London Estate Agent Website Template",
  description:
    "Branded estate-agent website with AI semantic property search, area insights, chatbot, and an admin portal. Productized service from £1,495 — branded, deployed, and live.",
  keywords: [
    "estate agent website template",
    "real estate website template",
    "London estate agent website",
    "AI property search",
    "property portal template",
    "Next.js real estate template",
    "estate agency web design",
    "letting agent website",
  ],
  alternates: { canonical: "https://asoudan.com/buy/real-estate" },
  openGraph: {
    title: "AIEstate — Premium London Estate Agent Website Template",
    description:
      "AI property search, area insights, chatbot, admin portal. Branded and deployed from £1,495.",
    url: "https://asoudan.com/buy/real-estate",
    type: "website",
    images: [
      {
        url: tpl?.coverImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AIEstate real estate template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIEstate — Premium London Estate Agent Website Template",
    description:
      "AI property search, area insights, admin portal. From £1,495 — branded and deployed.",
    images: [tpl?.coverImage || "/images/og-image.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AIEstate — Premium London Estate Agent Website Template",
  description:
    "Done-for-you estate-agent website with AI-powered semantic property search, area insights, chatbot, and an admin portal. Includes branding, content, and deploy.",
  brand: { "@type": "Brand", name: "Ahmed Soudan" },
  category: "Web design service",
  url: "https://asoudan.com/buy/real-estate",
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

export default function RealEstateHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQJsonLd(REAL_ESTATE_FAQ)),
        }}
      />
      <RealEstateHomeClient />
    </>
  );
}

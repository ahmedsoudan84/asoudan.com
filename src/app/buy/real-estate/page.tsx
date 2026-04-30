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
    "estate agent website template UK",
    "buy estate agent website UK",
    "estate agent website design UK",
    "property website template UK",
    "AI property search website",
    "estate agency website UK",
    "letting agent website UK",
    "London estate agent website",
    "independent estate agent website",
    "property portal website UK",
    "Rightmove alternative UK",
    "Zoopla alternative UK",
    "estate agent web design London",
    "Next.js real estate template",
    "property website cost UK",
    "small estate agency website UK",
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
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "AIEstate — Premium London Estate Agent Website Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIEstate — Premium London Estate Agent Website Template",
    description:
      "AI property search, area insights, admin portal. From £1,495 — branded and deployed.",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop"],
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://asoudan.com" },
    { "@type": "ListItem", position: 2, name: "Templates", item: "https://asoudan.com/buy" },
    { "@type": "ListItem", position: 3, name: "AIEstate — Estate Agent Template", item: "https://asoudan.com/buy/real-estate" },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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

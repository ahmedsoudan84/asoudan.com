import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { MEDICAL_CLINIC_FAQ, buildFAQJsonLd } from "@/lib/buy/faqs";
import { categories } from "@/lib/templates-data";

const tpl = categories.find((c) => c.slug === "medical-clinic");

export const metadata: Metadata = {
  title: "VitalCare — Premium Private Medical Clinic Website Template",
  description:
    "Done-for-you private clinic website with AI symptom checker, online appointment booking, patient portal with medical records, doctor profiles, and admin panel. From £1,495 — branded and deployed.",
  keywords: [
    "private clinic website template UK",
    "medical clinic website design",
    "GP surgery website template",
    "private healthcare website UK",
    "doctor booking system website",
    "medical appointment booking UK",
    "AI health website template",
    "patient portal website",
    "private practice website design",
    "medical centre website UK",
    "Next.js healthcare template",
    "clinic admin panel template",
    "healthcare website cost UK",
    "medical website design London",
    "physiotherapy website template",
  ],
  alternates: { canonical: "https://asoudan.com/buy/medical-clinic" },
  openGraph: {
    title: "VitalCare — Premium Private Medical Clinic Website Template",
    description:
      "AI symptom checker, booking system, patient portal, admin panel. Branded and deployed from £1,495.",
    url: "https://asoudan.com/buy/medical-clinic",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "VitalCare — Premium Private Medical Clinic Website Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VitalCare — Premium Private Medical Clinic Website Template",
    description:
      "AI symptom checker, booking, patient portal, admin panel. From £1,495 — branded and deployed.",
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "VitalCare — Premium Private Medical Clinic Website Template",
  description:
    "Done-for-you private clinic website with AI symptom checker, appointment booking, patient portal, and admin panel. Includes branding, content, and deployment.",
  brand: { "@type": "Brand", name: "Ahmed Soudan" },
  category: "Web design service",
  url: "https://asoudan.com/buy/medical-clinic",
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
    { "@type": "ListItem", position: 3, name: "VitalCare — Medical Clinic Template", item: "https://asoudan.com/buy/medical-clinic" },
  ],
};

export default function MedicalClinicHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQJsonLd(MEDICAL_CLINIC_FAQ)) }} />
      <HomeClient />
    </>
  );
}

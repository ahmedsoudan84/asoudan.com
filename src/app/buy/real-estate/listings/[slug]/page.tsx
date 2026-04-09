import { Metadata } from "next";
import { properties, getPropertyBySlug } from "@/lib/real-estate/properties";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} — AI Estate`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}

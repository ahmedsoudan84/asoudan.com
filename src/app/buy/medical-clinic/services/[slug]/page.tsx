import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/medical-clinic/data";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: `${svc.name} — VitalCare Clinic`,
    description: svc.shortDescription,
  };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();
  return <ServiceDetailClient service={svc} />;
}

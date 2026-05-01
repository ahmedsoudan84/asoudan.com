import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctors } from "@/lib/medical-clinic/data";
import DoctorDetailClient from "./DoctorDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: `${doc.name} — VitalCare Clinic`,
    description: `${doc.name}, ${doc.title}. ${doc.specialty} specialist at VitalCare Clinic.`,
  };
}

export async function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) notFound();
  return <DoctorDetailClient doctor={doc} />;
}

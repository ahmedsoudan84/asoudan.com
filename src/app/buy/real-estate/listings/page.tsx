import { Metadata } from "next";
import { Suspense } from "react";
import ListingsClient from "./ListingsClient";

export const metadata: Metadata = {
  title: "Property Listings — AI Estate",
  description:
    "Browse premium London properties with AI-powered semantic search and smart filtering.",
};

export default function ListingsPage() {
  return (
    <Suspense>
      <ListingsClient />
    </Suspense>
  );
}

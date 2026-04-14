import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop — Kurator",
  description:
    "Browse curated audio, workspace, lighting, and living pieces. Semantic search, smart filters, and AI recommendations — all client-side.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopClient />
    </Suspense>
  );
}

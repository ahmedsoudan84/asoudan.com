import { Metadata } from "next";
import BuyCategoriesClient from "./BuyCategoriesClient";

export const metadata: Metadata = {
  title: "Premium Website Templates",
  description:
    "Ready-to-use, customisable website templates built with Next.js and AI. Browse real estate, e-commerce, and more.",
};

export default function BuyPage() {
  return <BuyCategoriesClient />;
}

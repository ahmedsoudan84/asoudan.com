import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Your Cart — Kurator",
  description: "Review your selection and check out.",
};

export default function CartPage() {
  return <CartClient />;
}

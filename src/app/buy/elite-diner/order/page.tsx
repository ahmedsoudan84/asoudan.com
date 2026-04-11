import { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "Order Delivery | Elite Diner — Elegant Takeaway",
  description:
    "Order premium fine dining for delivery or takeaway. Full cart system with secure mock checkout. Exquisite taste, delivered.",
};

export default function OrderPage() {
  return <OrderClient />;
}

import OrderClient from "./OrderClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Delivery | Elite Diner",
  description: "Order your favourite dishes for delivery or takeaway.",
};

export default function OrderPage() {
  return <OrderClient />;
}
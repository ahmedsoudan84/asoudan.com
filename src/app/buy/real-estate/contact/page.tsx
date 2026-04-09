import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — AI Estate",
  description: "Get in touch to book a viewing, request a valuation, or enquire about a property.",
};

export default function ContactPage() {
  return <ContactClient />;
}

import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Elite Diner — Exceptional Service",
  description:
    "Get in touch with the Elite Diner team. For event inquiries, career opportunities, or feedback, we're here to help.",
};

export default function ContactPage() {
  return <ContactClient />;
}

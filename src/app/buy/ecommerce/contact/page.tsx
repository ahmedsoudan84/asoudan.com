import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Kurator",
  description:
    "Questions about the template, licensing, or a custom build? Get in touch.",
};

export default function ContactPage() {
  return <ContactClient />;
}

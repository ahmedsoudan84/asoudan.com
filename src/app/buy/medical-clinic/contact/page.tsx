import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — VitalCare Clinic",
  description: "Get in touch with VitalCare Clinic. Book an appointment, ask a question, or find our location.",
};

export default function ContactPage() {
  return <ContactClient />;
}

import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Elite Diner",
  description: "Get in touch with Elite Diner. Questions, feedback, or private events.",
};

export default function ContactPage() {
  return <ContactClient />;
}
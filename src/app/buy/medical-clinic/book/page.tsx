import type { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "Book an Appointment — VitalCare Clinic",
  description: "Book an appointment with our specialist doctors. Same-day GP slots available. In-person, video, or phone consultations.",
};

export default function BookPage() {
  return <BookClient />;
}

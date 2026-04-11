import { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "Book a Table | Elite Diner — Fine Dining London",
  description:
    "Secure your reservation at Elite Diner. Elegant ambiance, world-class service, and unforgettable flavours. Book through Calendly.",
};

export default function BookPage() {
  return <BookClient />;
}

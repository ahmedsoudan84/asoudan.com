import BookClient from "./BookClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table | Elite Diner",
  description: "Reserve your table at Elite Diner. Walk-ins welcome or book online.",
};

export default function BookPage() {
  return <BookClient />;
}
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Elite Diner",
  description: "Our story, chef, and passion for fine dining.",
};

export default function AboutPage() {
  return <AboutClient />;
}
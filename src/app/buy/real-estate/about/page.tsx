import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — AI Estate",
  description: "Learn about the estate agency behind AI Estate.",
};

export default function AboutPage() {
  return <AboutClient />;
}

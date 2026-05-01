import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — VitalCare Clinic",
  description: "Learn about VitalCare Clinic — our mission, values, facilities, and the team behind the UK's premium private healthcare experience.",
};

export default function AboutPage() {
  return <AboutClient />;
}

import TopNav from "@/components/real-estate/TopNav";
import Footer from "@/components/sections/Footer";
import { DemoBanner } from "@/components/buy/DemoBanner";

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <DemoBanner />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

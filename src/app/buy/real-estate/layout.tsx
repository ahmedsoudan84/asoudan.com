import TopNav from "@/components/real-estate/TopNav";
import Footer from "@/components/sections/Footer";

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

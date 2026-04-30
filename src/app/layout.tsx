import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/layout/ClientShell";
import { ThemeProvider } from "@/contexts/ThemeContext";
import FixedThemeToggle from "@/components/ui/FixedThemeToggle";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://asoudan.com"),
  title: {
    default: "Ahmed Soudan — Digital Product Designer",
    template: "%s | Ahmed Soudan"
  },
  description: "Portfolio of Ahmed Soudan, a Digital Product Designer with 20 years of experience delivering 300+ projects globally. Specializing in UX research, product design, and EdTech solutions.",
  keywords: ["product designer", "ux designer", "ui designer", "digital product design", "ux research", "edtech", "portfolio", "Ahmed Soudan", "next.js templates", "premium website templates", "buy templates"],
  authors: [{ name: "Ahmed Soudan" }],
  creator: "Ahmed Soudan",
  publisher: "Ahmed Soudan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asoudan.com",
    title: "Ahmed Soudan — Digital Product Designer",
    description: "Portfolio of Ahmed Soudan, a Digital Product Designer with 20 years of experience delivering 300+ projects globally.",
    siteName: "Ahmed Soudan Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Soudan - Digital Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Soudan — Digital Product Designer",
    description: "Portfolio of Ahmed Soudan, a Digital Product Designer with 20 years of experience delivering 300+ projects globally.",
    creator: "@ahmedsoudan",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "bnzHdfcjm0jS6yLookyFm7pAIlcz_7UMFaq4PS5c_fY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="https://fonts.gstatic.com/s/montserrat/v29/JTVSjBV8_OTBrgkfI0bYkZ1Q.woff2" type="font/woff2" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','dark');localStorage.setItem('theme','dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ahmed Soudan",
              "jobTitle": "Digital Product Designer",
              "description": "Digital Product Designer with 20 years of experience delivering 300+ projects globally. Specializing in UX research, product design, and EdTech solutions.",
              "url": "https://asoudan.com",
              "sameAs": [
                "https://linkedin.com/in/ahmedsoudan",
                "https://behance.net/ahmedsoudan"
              ],
              "knowsAbout": [
                "Product Design",
                "UX Research",
                "UI Design",
                "User Experience",
                "EdTech",
                "Design Systems",
                "Prototyping",
                "Usability Testing",
                "Next.js Templates"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Digital Product Designer",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "United Kingdom"
                }
              },
              "offers": {
                "@type": "OfferCatalog",
                "name": "Premium Website Templates",
                "url": "https://asoudan.com/buy"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Ahmed Soudan — Website Templates & Design",
              "description": "Done-for-you branded website templates for restaurants, estate agents, and e-commerce businesses. AI features, admin panel, branding, content, and deployment included. From £1,495.",
              "url": "https://asoudan.com/buy",
              "priceRange": "£1,495–£4,995",
              "currenciesAccepted": "GBP",
              "areaServed": [
                { "@type": "Country", "name": "United Kingdom" },
                { "@type": "Country", "name": "Ireland" }
              ],
              "serviceType": [
                "Website Design",
                "Website Development",
                "Brand Identity",
                "Restaurant Website",
                "Estate Agent Website",
                "E-Commerce Website"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Premium Website Templates",
                "url": "https://asoudan.com/buy"
              },
              "sameAs": [
                "https://linkedin.com/in/ahmedsoudan"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ahmed Soudan",
              "url": "https://asoudan.com",
              "description": "Portfolio and premium website templates by Ahmed Soudan — Digital Product Designer.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://asoudan.com/buy?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-montserrat">
        <ThemeProvider>
          <FixedThemeToggle />
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

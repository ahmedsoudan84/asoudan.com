import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/layout/ClientShell";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://asoudan.com"),
  title: {
    default: "Ahmed Soudan — Digital Product Designer",
    template: "%s | Ahmed Soudan"
  },
  description: "Portfolio of Ahmed Soudan, a Digital Product Designer with 20 years of experience delivering 300+ projects globally. Specializing in UX research, product design, and EdTech solutions.",
  keywords: ["product designer", "ux designer", "ui designer", "digital product design", "ux research", "edtech", "portfolio", "Ahmed Soudan"],
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
    google: "your-google-site-verification-code", // Replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
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
                "Usability Testing"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Digital Product Designer",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "United Kingdom"
                }
              }
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-montserrat">
        <ThemeProvider>
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/static/", "/api/"],
      },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },
    ],
    sitemap: "https://asoudan.com/sitemap.xml",
    host: "https://asoudan.com",
  };
}

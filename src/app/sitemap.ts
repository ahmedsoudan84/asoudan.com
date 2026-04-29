import type { MetadataRoute } from "next";
import { menuItems } from "@/lib/elite-diner/menu-data";
import { properties } from "@/lib/real-estate/properties";
import { products } from "@/lib/ecommerce/products";

const SITE = "https://asoudan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1.0, lastModified },
    { url: `${SITE}/buy`, changeFrequency: "weekly", priority: 0.95, lastModified },

    // Elite Diner template
    { url: `${SITE}/buy/elite-diner`, changeFrequency: "weekly", priority: 0.9, lastModified },
    { url: `${SITE}/buy/elite-diner/menu`, changeFrequency: "weekly", priority: 0.7, lastModified },
    { url: `${SITE}/buy/elite-diner/book`, changeFrequency: "monthly", priority: 0.6, lastModified },
    { url: `${SITE}/buy/elite-diner/order`, changeFrequency: "monthly", priority: 0.6, lastModified },
    { url: `${SITE}/buy/elite-diner/about`, changeFrequency: "yearly", priority: 0.4, lastModified },
    { url: `${SITE}/buy/elite-diner/contact`, changeFrequency: "yearly", priority: 0.5, lastModified },
    { url: `${SITE}/buy/elite-diner/ai-tools`, changeFrequency: "monthly", priority: 0.5, lastModified },

    // Real estate template
    { url: `${SITE}/buy/real-estate`, changeFrequency: "weekly", priority: 0.9, lastModified },
    { url: `${SITE}/buy/real-estate/listings`, changeFrequency: "weekly", priority: 0.75, lastModified },
    { url: `${SITE}/buy/real-estate/about`, changeFrequency: "yearly", priority: 0.4, lastModified },
    { url: `${SITE}/buy/real-estate/contact`, changeFrequency: "yearly", priority: 0.5, lastModified },
    { url: `${SITE}/buy/real-estate/ai-tools`, changeFrequency: "monthly", priority: 0.5, lastModified },

    // Ecommerce template
    { url: `${SITE}/buy/ecommerce`, changeFrequency: "weekly", priority: 0.9, lastModified },
    { url: `${SITE}/buy/ecommerce/shop`, changeFrequency: "weekly", priority: 0.75, lastModified },
    { url: `${SITE}/buy/ecommerce/about`, changeFrequency: "yearly", priority: 0.4, lastModified },
    { url: `${SITE}/buy/ecommerce/contact`, changeFrequency: "yearly", priority: 0.5, lastModified },
    { url: `${SITE}/buy/ecommerce/ai-tools`, changeFrequency: "monthly", priority: 0.5, lastModified },

    // Portfolio
    { url: `${SITE}/projects/design-system`, changeFrequency: "monthly", priority: 0.6, lastModified },
  ];

  const menuPages: MetadataRoute.Sitemap = menuItems.map((item) => ({
    url: `${SITE}/buy/elite-diner/menu/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified,
  }));

  const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE}/buy/real-estate/listings/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.55,
    lastModified,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/buy/ecommerce/shop/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.55,
    lastModified,
  }));

  return [...staticPages, ...menuPages, ...propertyPages, ...productPages];
}

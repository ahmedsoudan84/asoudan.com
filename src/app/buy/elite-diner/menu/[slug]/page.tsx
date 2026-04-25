import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { menuItems, getMenuItemBySlug } from "@/lib/elite-diner/menu-data";
import MenuItemDetailClient from "./MenuItemDetailClient";

export async function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) return { title: "Dish not found — Elite Diner" };
  return {
    title: `${item.name} — Elite Diner`,
    description: item.description.slice(0, 160),
  };
}

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) notFound();
  return <MenuItemDetailClient item={item} />;
}

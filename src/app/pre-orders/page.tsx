import type { Metadata } from "next";
import PreOrdersClient from "./PreOrdersClient";
import { getPreOrders, getSiteSettings } from "@/lib/sanity/fetch";
import { mapSanityPreOrder } from "@/lib/sanity/mappers";
import { generateSiteMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Pre-Orders');
}

export default async function PreOrders() {
  const preOrders = await getPreOrders().catch(() => []);
  const mappedPreOrders = preOrders.map(mapSanityPreOrder);

  return <PreOrdersClient preOrders={mappedPreOrders} />;
}


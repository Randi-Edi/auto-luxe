import type { Metadata } from "next";
import VehiclesClient from "./VehiclesClient";
import { getVehicles, getSiteSettings } from "@/lib/sanity/fetch";
import { mapSanityVehicleToVehicle } from "@/lib/sanity/mappers";
import { generateSiteMetadata } from "@/lib/seo";
import { REVALIDATE_TIME } from "@/lib/revalidate";

export const revalidate = REVALIDATE_TIME;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Vehicles');
}

export default async function Vehicles() {
  const vehicles = await getVehicles().catch(() => []);
  const mappedVehicles = vehicles.map(mapSanityVehicleToVehicle);
  const siteSettings = await getSiteSettings().catch(() => null);

  return <VehiclesClient vehicles={mappedVehicles} siteSettings={siteSettings} />;
}

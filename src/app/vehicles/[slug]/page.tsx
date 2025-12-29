import type { Metadata } from "next";
import VehicleSingleClient from "@/components/VehicleSingleClient";
import { getVehicles, getVehicleById, getSiteSettings } from "@/lib/sanity/fetch";
import { generateVehicleMetadata, generateVehicleStructuredData } from "@/lib/seo";
import { REVALIDATE_TIME } from "@/lib/revalidate";

// ISR: Revalidate based on REVALIDATE_TIME environment variable
export const revalidate = REVALIDATE_TIME;

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleById(slug).catch(() => null);
  const siteSettings = await getSiteSettings().catch(() => null);
  
  if (!vehicle) {
    return {
      title: 'Vehicle Not Found',
    };
  }
  
  return generateVehicleMetadata(vehicle, siteSettings);
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  
  // Fetch vehicle data from Sanity by slug (or id/ slug as fallback)
  const vehicle = await getVehicleById(slug).catch(() => null);
  
  if (!vehicle) {
    return (
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-muted-foreground">The vehicle you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  // Fetch similar vehicles (same brand or similar price range)
  const allVehicles = await getVehicles().catch(() => []);
  const currentVehicleIdentifier = typeof vehicle.slug === 'string' 
    ? vehicle.slug 
    : vehicle.slug?.current || vehicle.id || vehicle._id;
  
  const similarVehicles = allVehicles
    .filter((v) => {
      const vIdentifier = typeof v.slug === 'string' ? v.slug : v.slug?.current || v.id || v._id;
      return vIdentifier !== currentVehicleIdentifier && v.status !== 'sold';
    })
    .slice(0, 3);

  const siteSettings = await getSiteSettings().catch(() => null);
  const structuredData = generateVehicleStructuredData(vehicle, siteSettings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <VehicleSingleClient 
        vehicleId={vehicle.id || vehicle._id} 
        vehicleData={vehicle} 
        similarVehicles={similarVehicles}
        siteSettings={siteSettings}
      />
    </>
  );
}

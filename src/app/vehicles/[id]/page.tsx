import VehicleSingleClient from "@/components/VehicleSingleClient";

// All vehicle IDs that should be statically generated
const vehicleIds = [
  "f1", "f2", "f3", "f4",
  "p1", "p2", "p3", "p4",
  "r1", "r2", "r3",
];

export function generateStaticParams() {
  return vehicleIds.map((id) => ({
    id: id,
  }));
}

interface VehiclePageProps {
  params: Promise<{ id: string }>;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params;
  return <VehicleSingleClient vehicleId={id} />;
}

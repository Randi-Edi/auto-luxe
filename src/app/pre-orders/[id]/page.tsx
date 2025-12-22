import PreOrderDetailClient from "@/components/PreOrderDetailClient";

// All pre-order IDs that should be statically generated
const preOrderIds = ["po1", "po2", "po3"];

export function generateStaticParams() {
  return preOrderIds.map((id) => ({
    id: id,
  }));
}

interface PreOrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function PreOrderPage({ params }: PreOrderPageProps) {
  const { id } = await params;
  return <PreOrderDetailClient vehicleId={id} />;
}

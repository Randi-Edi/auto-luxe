import type { Metadata } from "next";
import PreOrderDetailClient from "@/components/PreOrderDetailClient";
import { getPreOrders, getPreOrderById, getSiteSettings } from "@/lib/sanity/fetch";
import type { SanityPreOrder } from "@/lib/sanity/fetch";
import { generatePreOrderMetadata } from "@/lib/seo";
import { REVALIDATE_TIME } from "@/lib/revalidate";

// ISR: Revalidate based on REVALIDATE_TIME environment variable
export const revalidate = REVALIDATE_TIME;

interface PreOrderPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PreOrderPageProps): Promise<Metadata> {
  const { id } = await params;
  const preOrder = await getPreOrderById(id).catch(() => null);
  const siteSettings = await getSiteSettings().catch(() => null);

  if (!preOrder) {
    return {
      title: 'Pre-Order Not Found',
    };
  }

  return generatePreOrderMetadata(preOrder, siteSettings);
}

export default async function PreOrderPage({ params }: PreOrderPageProps) {
  const { id } = await params;
  
  // Fetch pre-order data from Sanity
  const preOrder = await getPreOrderById(id).catch(() => null);
  const siteSettings = await getSiteSettings().catch(() => null);
  
  if (!preOrder) {
    return (
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-2xl font-bold mb-4">Pre-Order Not Found</h1>
          <p className="text-muted-foreground">The pre-order you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  return <PreOrderDetailClient vehicleId={id} preOrderData={preOrder} siteSettings={siteSettings} />;
}

import { MetadataRoute } from 'next'
import { getVehicles, getSiteSettings, getPreOrders } from '@/lib/sanity/fetch'
import { REVALIDATE_TIME } from '@/lib/revalidate'

export const revalidate = REVALIDATE_TIME

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getSiteSettings().catch(() => null)
  const baseUrl = siteSettings?.seoSettings?.siteUrl || siteSettings?.seoSettings?.canonicalUrl || 'https://www.example.com'
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pre-orders`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic vehicle routes
  const vehicles = await getVehicles().catch(() => [])
  const vehicleRoutes: MetadataRoute.Sitemap = vehicles
    .filter((vehicle) => vehicle.status !== 'sold') // Don't include sold vehicles
    .map((vehicle) => {
      const slug = typeof vehicle.slug === 'string' 
        ? vehicle.slug 
        : vehicle.slug?.current || vehicle.id || vehicle._id
      return {
        url: `${baseUrl}/vehicles/${slug}`,
        lastModified: new Date(), // You could add _updatedAt field to vehicles if needed
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

  // Dynamic pre-order routes
  const preOrders = await getPreOrders().catch(() => [])
  const preOrderRoutes: MetadataRoute.Sitemap = preOrders.map((preOrder) => ({
    url: `${baseUrl}/pre-orders/${preOrder.id || preOrder._id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...vehicleRoutes, ...preOrderRoutes]
}


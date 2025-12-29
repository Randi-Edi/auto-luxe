import { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/sanity/fetch'
import { REVALIDATE_TIME } from '@/lib/revalidate'

export const revalidate = REVALIDATE_TIME

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await getSiteSettings().catch(() => null)
  const baseUrl = siteSettings?.seoSettings?.siteUrl || siteSettings?.seoSettings?.canonicalUrl || 'https://www.example.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}


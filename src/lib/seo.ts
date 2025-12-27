import type { Metadata } from 'next'
import type { SiteSettings, SanityVehicle, SanityPreOrder, SEOSettings, VehicleSEO } from './sanity/fetch'
import { urlForImage } from './sanity/client'

// Re-export for use in other files
export type { SEOSettings, VehicleSEO }

/**
 * Generate metadata for the site using Sanity SEO settings
 */
export function generateSiteMetadata(settings: SiteSettings | null, pageTitle?: string): Metadata {
  const seo = settings?.seoSettings
  const siteUrl = seo?.siteUrl || seo?.canonicalUrl || 'https://www.example.com'
  const siteTitle = settings?.title || 'Auto-Luxe'
  
  // Build title: page title + site title or just meta title
  const title = pageTitle 
    ? `${pageTitle} | ${siteTitle}`
    : seo?.metaTitle || `${siteTitle} - Premium Luxury Vehicles`
  
  const description = seo?.metaDescription || settings?.description || 'Your trusted partner for premium luxury vehicles. Excellence in every deal, trust in every transaction.'
  const ogImage = seo?.ogImage || settings?.logo || `${siteUrl}/og-image.jpg`
  const ogTitle = seo?.ogTitle || seo?.metaTitle || title
  const ogDescription = seo?.ogDescription || seo?.metaDescription || description
  const twitterCard = seo?.twitterCard || 'summary_large_image'
  const keywords = seo?.keywords || []

  return {
    title: {
      default: title,
      template: `%s | ${siteTitle}`,
    },
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: siteTitle }],
    creator: siteTitle,
    publisher: siteTitle,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    alternates: {
      canonical: seo?.canonicalUrl || siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: siteTitle,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
      site: seo?.twitterSite,
      creator: seo?.twitterSite,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add verification codes here if needed
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

/**
 * Generate metadata for a vehicle page
 */
export function generateVehicleMetadata(
  vehicle: SanityVehicle,
  settings: SiteSettings | null
): Metadata {
  const siteUrl = settings?.seoSettings?.siteUrl || settings?.seoSettings?.canonicalUrl || 'https://www.example.com'
  const siteTitle = settings?.title || 'Auto-Luxe'
  
  // Use vehicle SEO or fallback to vehicle data
  const metaTitle = vehicle.seo?.metaTitle || `${vehicle.year} ${vehicle.name} - ${siteTitle}`
  const metaDescription = vehicle.seo?.metaDescription || vehicle.description || 
    `${vehicle.year} ${vehicle.brand} ${vehicle.name} for sale. ${vehicle.fuel}, ${vehicle.transmission}, ${vehicle.mileage.toLocaleString()} km. Price: LKR ${vehicle.price.toLocaleString()}.`
  
  const ogImage = vehicle.seo?.ogImage || vehicle.mainImage || `${siteUrl}/og-image.jpg`
  const slug = typeof vehicle.slug === 'string' ? vehicle.slug : vehicle.slug?.current || vehicle.id
  const vehicleUrl = `${siteUrl}/vehicles/${slug}`
  
  const keywords = vehicle.seo?.keywords || [
    vehicle.brand,
    vehicle.name,
    vehicle.model,
    `${vehicle.year} ${vehicle.brand}`,
    'luxury car',
    'premium vehicle',
    'car for sale',
  ].filter(Boolean)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: vehicleUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: vehicleUrl,
      siteName: siteTitle,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: urlForImage(ogImage, 1200, 630, 'jpg') || ogImage,
          width: 1200,
          height: 630,
          alt: `${vehicle.year} ${vehicle.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [urlForImage(ogImage, 1200, 630, 'jpg') || ogImage],
    },
    robots: {
      index: vehicle.status !== 'sold', // Don't index sold vehicles
      follow: true,
    },
  }
}

/**
 * Generate structured data (JSON-LD) for a vehicle
 */
export function generateVehicleStructuredData(
  vehicle: SanityVehicle,
  settings: SiteSettings | null
): object {
  const siteUrl = settings?.seoSettings?.siteUrl || settings?.seoSettings?.canonicalUrl || 'https://www.example.com'
  const slug = typeof vehicle.slug === 'string' ? vehicle.slug : vehicle.slug?.current || vehicle.id
  const vehicleUrl = `${siteUrl}/vehicles/${slug}`
  const imageUrl = vehicle.mainImage || `${siteUrl}/placeholder-car.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${vehicle.year} ${vehicle.name}`,
    description: vehicle.description || `${vehicle.year} ${vehicle.brand} ${vehicle.name}`,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand,
    },
    model: vehicle.model,
    productionDate: vehicle.year.toString(),
    vehicleIdentificationNumber: vehicle.id,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'KMT', // Kilometers
    },
    fuelType: vehicle.fuel,
    transmission: vehicle.transmission,
    color: vehicle.color,
    vehicleConfiguration: vehicle.driveType,
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'LKR',
      availability: vehicle.status === 'sold' 
        ? 'https://schema.org/SoldOut'
        : vehicle.status === 'reserved'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock',
      url: vehicleUrl,
      seller: {
        '@type': 'Organization',
        name: settings?.title || 'Auto-Luxe',
        url: siteUrl,
      },
    },
    url: vehicleUrl,
  }
}

/**
 * Generate metadata for a pre-order page
 */
export function generatePreOrderMetadata(
  preOrder: SanityPreOrder,
  settings: SiteSettings | null
): Metadata {
  const siteUrl = settings?.seoSettings?.siteUrl || settings?.seoSettings?.canonicalUrl || 'https://www.example.com'
  const siteTitle = settings?.title || 'Auto-Luxe'
  
  // Use pre-order SEO or fallback to pre-order data
  const metaTitle = preOrder.seo?.metaTitle || `${preOrder.name} - Pre-Order | ${siteTitle}`
  const metaDescription = preOrder.seo?.metaDescription || 
    `Pre-order ${preOrder.name}. Expected arrival: ${preOrder.expectedArrival}. Price: ${preOrder.expectedPrice}. Limited slots available.`
  
  const ogImage = preOrder.seo?.ogImage || preOrder.image || `${siteUrl}/og-image.jpg`
  const preOrderId = preOrder.id || preOrder._id
  const preOrderUrl = `${siteUrl}/pre-orders/${preOrderId}`
  
  const keywords = preOrder.seo?.keywords || [
    preOrder.name,
    'pre-order',
    'upcoming vehicle',
    'new model',
    'luxury car',
    'premium vehicle',
  ].filter(Boolean)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: preOrderUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: preOrderUrl,
      siteName: siteTitle,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: urlForImage(ogImage, 1200, 630, 'jpg') || ogImage,
          width: 1200,
          height: 630,
          alt: preOrder.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [urlForImage(ogImage, 1200, 630, 'jpg') || ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/**
 * Generate structured data for the organization
 */
export function generateOrganizationStructuredData(settings: SiteSettings | null): object {
  const siteUrl = settings?.seoSettings?.siteUrl || settings?.seoSettings?.canonicalUrl || 'https://www.example.com'
  const siteTitle = settings?.title || 'Auto-Luxe'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteTitle,
    url: siteUrl,
    logo: settings?.logo || `${siteUrl}/logo.png`,
    description: settings?.description || 'Your trusted partner for premium luxury vehicles.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings?.phone,
      contactType: 'Customer Service',
      email: settings?.email,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings?.address,
    },
    sameAs: settings?.socialLinks?.map(link => link.url) || [],
  }
}


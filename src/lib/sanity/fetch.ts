import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { client, urlForImage } from './client'
import {
  siteSettingsQuery,
  heroSectionQuery,
  heroImagesQuery,
  vehiclesQuery,
  vehicleByIdOrSlugQuery,
  reservedVehiclesQuery,
  featuredVehiclesQuery,
  popularVehiclesQuery,
  testimonialsQuery,
  testimonialsLimitQuery,
  faqsQuery,
  preOrdersQuery,
  preOrderByIdQuery,
  featuresQuery,
  privacyPolicyQuery,
  termsOfServiceQuery,
} from './queries'

// Types
export interface SocialLink {
  platform: string
  url: string
  label?: string
  order?: number
}

export interface SEOSettings {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image'
  twitterSite?: string
  siteUrl?: string
  canonicalUrl?: string
}

export interface SiteSettings {
  _id: string
  title?: string
  description?: string
  logo?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  locationPlusCode?: string
  businessHours?: string[]
  footerHeading?: string
  footerDescription?: string
  seoSettings?: SEOSettings
  socialLinks?: SocialLink[]
}

export interface HeroSection {
  _id: string
  label?: string
  mainTitle: string
  subtitle?: string
}

export interface HeroImage {
  _id: string
  image: string
  order?: number
  alt?: string
}

export interface VehicleSEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
}

export interface SanityVehicle {
  _id: string
  id: string
  name: string
  slug: { current: string } | string // Slug can be object with current or just string
  price: number
  mainImage: string
  images?: string[]
  brand: string
  model: string
  year: number
  mileage: number
  engine?: string
  fuel: string
  transmission: string
  driveType?: string
  condition?: string
  color?: string
  status: 'new' | 'used' | 'reserved' | 'sold'
  description?: string
  features?: string[]
  featured?: boolean
  popular?: boolean
  seo?: VehicleSEO
}

export interface SanityTestimonial {
  _id: string
  name: string
  image: string
  message: string
  order?: number
}

export interface SanityFAQ {
  _id: string
  question: string
  answer: string
  order?: number
}

export interface PreOrderSection {
  title?: string
  body?: string
  items?: string[]
}

export interface SanityPreOrder {
  _id: string
  id: string
  name: string
  slug: string
  image: string
  expectedPrice: string
  expectedArrival: string
  slotsAvailable: number
  specifications?: string[]
  deliveryDuration?: PreOrderSection
  warrantyCoverage?: PreOrderSection
  personalLCImport?: PreOrderSection
  nonPersonalLCImport?: PreOrderSection
  seo?: VehicleSEO
}

export interface SanityFeature {
  _id: string
  title: string
  description: string
  icon: string
  order?: number
}

// Fetch functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  return client.fetch(heroSectionQuery)
}

export async function getHeroImages(): Promise<HeroImage[]> {
  return client.fetch(heroImagesQuery)
}

const fetchVehicles = async (): Promise<SanityVehicle[]> => {
  try {
    const vehicles = await client.fetch(vehiclesQuery)
    if (!vehicles || vehicles.length === 0) {
      console.warn('No vehicles found in Sanity. Make sure you have added vehicles in Sanity Studio.')
    }
    return vehicles || []
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
}

export const getVehicles = unstable_cache(
  fetchVehicles,
  ['vehicles'],
  { tags: ['vehicles'] }
)

export async function getVehicleById(id: string): Promise<SanityVehicle | null> {
  return unstable_cache(
    async () => client.fetch(vehicleByIdOrSlugQuery, { identifier: id }),
    [`vehicle-${id}`],
    { tags: ['vehicles', `vehicle-${id}`] }
  )()
}

const fetchReservedVehicles = async (): Promise<SanityVehicle[]> => {
  return client.fetch(reservedVehiclesQuery)
}

export const getReservedVehicles = unstable_cache(
  fetchReservedVehicles,
  ['reserved-vehicles'],
  { tags: ['vehicles', 'home'] }
)

const fetchFeaturedVehicles = async (): Promise<SanityVehicle[]> => {
  return client.fetch(featuredVehiclesQuery)
}

export const getFeaturedVehicles = unstable_cache(
  fetchFeaturedVehicles,
  ['featured-vehicles'],
  { tags: ['vehicles', 'home'] }
)

const fetchPopularVehicles = async (): Promise<SanityVehicle[]> => {
  return client.fetch(popularVehiclesQuery)
}

export const getPopularVehicles = unstable_cache(
  fetchPopularVehicles,
  ['popular-vehicles'],
  { tags: ['vehicles', 'home'] }
)

const fetchTestimonials = async (): Promise<SanityTestimonial[]> => {
  return client.fetch(testimonialsQuery)
}

export const getTestimonials = unstable_cache(
  fetchTestimonials,
  ['testimonials'],
  { tags: ['testimonials'] }
)

const fetchTestimonialsLimit = async (limit: number = 3): Promise<SanityTestimonial[]> => {
  return client.fetch(testimonialsLimitQuery)
}

export const getTestimonialsLimit = unstable_cache(
  fetchTestimonialsLimit,
  ['testimonials-limit'],
  { tags: ['testimonials', 'home'] }
)

export async function getFAQs(): Promise<SanityFAQ[]> {
  return client.fetch(faqsQuery)
}

const fetchPreOrders = async (): Promise<SanityPreOrder[]> => {
  return client.fetch(preOrdersQuery)
}

export const getPreOrders = unstable_cache(
  fetchPreOrders,
  ['pre-orders'],
  { tags: ['pre-orders'] }
)

export async function getPreOrderById(id: string): Promise<SanityPreOrder | null> {
  return unstable_cache(
    async () => client.fetch(preOrderByIdQuery, { identifier: id }),
    [`pre-order-${id}`],
    { tags: ['pre-orders', `pre-order-${id}`] }
  )()
}

export async function getFeatures(): Promise<SanityFeature[]> {
  return client.fetch(featuresQuery)
}

export interface SanityPrivacyPolicy {
  _id: string
  title: string
  lastUpdated: string
  content: any[] // Portable text content
}

export interface SanityTermsOfService {
  _id: string
  title: string
  lastUpdated: string
  content: any[] // Portable text content
}

export async function getPrivacyPolicy(): Promise<SanityPrivacyPolicy | null> {
  return client.fetch(privacyPolicyQuery)
}

export async function getTermsOfService(): Promise<SanityTermsOfService | null> {
  return client.fetch(termsOfServiceQuery)
}

// Helper to get WebP image URL
export function getWebPImageUrl(imageUrl: string, width?: number, height?: number): string {
  if (!imageUrl) return ''
  // If it's already a Sanity CDN URL, we can modify it
  if (imageUrl.includes('cdn.sanity.io')) {
    const url = new URL(imageUrl)
    if (width) url.searchParams.set('w', width.toString())
    if (height) url.searchParams.set('h', height.toString())
    url.searchParams.set('fm', 'webp')
    return url.toString()
  }
  return imageUrl
}


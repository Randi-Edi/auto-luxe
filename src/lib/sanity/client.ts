import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// For private datasets, use read token. For public datasets, token is optional
// Check both server-side and client-side env vars
const token = 
  process.env.SANITY_API_READ_TOKEN || 
  process.env.NEXT_PUBLIC_SANITY_READ_TOKEN || 
  (typeof window === 'undefined' ? process.env.SANITY_API_READ_TOKEN : '') ||
  ''

if (!projectId) {
  console.error('❌ ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set!')
  console.error('Please add NEXT_PUBLIC_SANITY_PROJECT_ID to your .env.local file')
  console.error('Get your Project ID from: https://sanity.io/manage')
  console.error('Current env check:', {
    hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    hasToken: !!token,
    dataset,
  })
}

// Check if dataset is private and token is missing (only warn in development)
if (!token && dataset && process.env.NODE_ENV === 'development') {
  console.warn('⚠️  Warning: No API token found. If your dataset is private, you need SANITY_API_READ_TOKEN')
  console.warn('   Get a read token from: https://sanity.io/manage → Your Project → API → Tokens')
  console.warn('   Add it to .env.local as: SANITY_API_READ_TOKEN=your-token-here')
  console.warn('   Then restart the dev server')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: token || undefined, // Only include token if it exists
  // For private datasets, don't use CDN
  ...(token ? { useCdn: true } : {}),
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function urlForImage(source: SanityImageSource, width?: number, height?: number, format: 'webp' | 'jpg' | 'png' = 'webp') {
  let imageBuilder = builder.image(source)
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  // Convert to WebP format
  return imageBuilder.format(format).url()
}


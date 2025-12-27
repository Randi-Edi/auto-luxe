/**
 * Script to regenerate slugs for all vehicles in Sanity
 * Run with: npm run regenerate-slugs
 * 
 * This script will update all vehicles to have proper SEO-friendly slugs
 * based on their brand, name, and year.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set!')
  process.exit(1)
}

if (!token) {
  console.error('❌ ERROR: SANITY_API_WRITE_TOKEN is not set!')
  console.error('   You need a write token to update documents.')
  console.error('   Get one from: https://sanity.io/manage → Your Project → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
  token,
})

// Helper function to generate a simple hash from a string
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 4)
}

// Generate slug from vehicle data
function generateSlug(vehicle: any): string {
  const name = vehicle.name || ''
  const brand = vehicle.brand || ''
  const year = vehicle.year ? String(vehicle.year) : ''
  
  // Create a unique hash from the combination of fields for uniqueness
  const uniqueString = `${brand}-${name}-${year}-${vehicle._id || Date.now()}`
  const uniqueHash = simpleHash(uniqueString).toLowerCase()
  
  // Create slug: brand-name-year-hash
  const parts = [brand, name, year, uniqueHash].filter(Boolean)
  const slugSource = parts.join(' ')
  
  // Slugify: lowercase, replace spaces/special chars with hyphens, remove leading/trailing hyphens
  const slug = slugSource
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 120)
  
  return slug
}

async function regenerateSlugs() {
  try {
    console.log('🔄 Fetching all vehicles...')
    const vehicles = await client.fetch(`*[_type == "vehicle"] {
      _id,
      id,
      name,
      brand,
      year,
      "currentSlug": slug.current
    }`)
    
    if (!vehicles || vehicles.length === 0) {
      console.log('ℹ️  No vehicles found in Sanity.')
      return
    }
    
    console.log(`📦 Found ${vehicles.length} vehicles\n`)
    
    let updated = 0
    let skipped = 0
    
    for (const vehicle of vehicles) {
      const newSlug = generateSlug(vehicle)
      const currentSlug = vehicle.currentSlug
      
      // Skip if slug is already correct
      if (currentSlug === newSlug) {
        console.log(`✓ Skipping "${vehicle.name}" - slug already correct: ${currentSlug}`)
        skipped++
        continue
      }
      
      try {
        await client
          .patch(vehicle._id)
          .set({
            slug: {
              _type: 'slug',
              current: newSlug,
            },
          })
          .commit()
        
        console.log(`✅ Updated "${vehicle.name}"`)
        console.log(`   Old: ${currentSlug || '(missing)'}`)
        console.log(`   New: ${newSlug}\n`)
        updated++
      } catch (error: any) {
        console.error(`❌ Error updating "${vehicle.name}":`, error.message)
      }
    }
    
    console.log('\n✨ Summary:')
    console.log(`   Updated: ${updated}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Total: ${vehicles.length}`)
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

regenerateSlugs()


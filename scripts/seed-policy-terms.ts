/**
 * Migration script to seed default Privacy Policy and Terms of Service content in Sanity
 * Run with: npm run seed-policy-terms
 * 
 * This script will create default Privacy Policy and Terms of Service documents
 * in Sanity CMS if they don't already exist.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { defaultPrivacyPolicyContent, defaultTermsOfServiceContent } from '../src/lib/defaultContent'

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
  console.error('   You need a write token to create documents.')
  console.error('   Get one from: https://sanity.io/manage → Your Project → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function seedPolicyAndTerms() {
  try {
    console.log('🌱 Starting to seed Privacy Policy and Terms of Service...\n')

    // Check if Privacy Policy exists
    const existingPrivacy = await client.fetch(
      `*[_type == "privacyPolicy"][0]`
    )

    if (existingPrivacy) {
      console.log('✅ Privacy Policy already exists in CMS')
      console.log(`   Title: ${existingPrivacy.title || 'N/A'}`)
      console.log(`   Last Updated: ${existingPrivacy.lastUpdated || 'N/A'}\n`)
    } else {
      console.log('📝 Creating Privacy Policy...')
      const privacyDoc = await client.create({
        _type: 'privacyPolicy',
        title: 'Privacy Policy',
        lastUpdated: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        content: defaultPrivacyPolicyContent,
      })
      console.log(`✅ Privacy Policy created with ID: ${privacyDoc._id}\n`)
    }

    // Check if Terms of Service exists
    const existingTerms = await client.fetch(
      `*[_type == "termsOfService"][0]`
    )

    if (existingTerms) {
      console.log('✅ Terms of Service already exists in CMS')
      console.log(`   Title: ${existingTerms.title || 'N/A'}`)
      console.log(`   Last Updated: ${existingTerms.lastUpdated || 'N/A'}\n`)
    } else {
      console.log('📝 Creating Terms of Service...')
      const termsDoc = await client.create({
        _type: 'termsOfService',
        title: 'Terms of Service',
        lastUpdated: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        content: defaultTermsOfServiceContent,
      })
      console.log(`✅ Terms of Service created with ID: ${termsDoc._id}\n`)
    }

    console.log('✨ Seeding completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('   1. Go to http://localhost:3000/studio')
    console.log('   2. Find "Privacy Policy" and "Terms of Service" in the document list')
    console.log('   3. Click to edit and customize the content as needed')
    console.log('   4. The content will automatically appear on /privacy and /terms pages\n')

  } catch (error) {
    console.error('❌ Error seeding policy and terms:', error)
    process.exit(1)
  }
}

// Run the migration
seedPolicyAndTerms()


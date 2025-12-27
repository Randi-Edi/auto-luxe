#!/usr/bin/env node

/**
 * Script to check if environment variables are set correctly
 * Run: node scripts/check-env.js
 */

require('dotenv').config({ path: '.env.local' })

console.log('\n🔍 Checking Environment Variables...\n')

const required = {
  'NEXT_PUBLIC_SANITY_PROJECT_ID': process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_DATASET': process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
}

const optional = {
  'NEXT_PUBLIC_SANITY_API_VERSION': process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  'SANITY_API_READ_TOKEN': process.env.SANITY_API_READ_TOKEN ? '✅ Set' : '❌ Not set (required for private datasets)',
  'SANITY_API_WRITE_TOKEN': process.env.SANITY_API_WRITE_TOKEN ? '✅ Set' : '⚠️  Not set (needed for migration)',
}

console.log('📋 Required Variables:')
Object.entries(required).forEach(([key, value]) => {
  const status = value ? '✅' : '❌'
  const display = value || '(not set)'
  console.log(`   ${status} ${key}: ${display}`)
})

console.log('\n📋 Optional Variables:')
Object.entries(optional).forEach(([key, value]) => {
  console.log(`   ${value} ${key}`)
})

console.log('\n📝 Notes:')
if (!required.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.log('   ❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing!')
  console.log('      Get it from: https://sanity.io/manage')
}
if (!process.env.SANITY_API_READ_TOKEN) {
  console.log('   ⚠️  SANITY_API_READ_TOKEN is missing!')
  console.log('      Required if your dataset is PRIVATE')
  console.log('      Get it from: https://sanity.io/manage → API → Tokens')
}

console.log('\n💡 Tips:')
console.log('   - Make sure .env.local exists in the project root')
console.log('   - Restart dev server after changing .env.local')
console.log('   - Variables starting with NEXT_PUBLIC_ are available in browser')
console.log('   - Variables without NEXT_PUBLIC_ are server-side only\n')


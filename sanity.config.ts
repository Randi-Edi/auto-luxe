import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// Uncomment after installing @sanity/vision: import { visionTool } from '@sanity/vision'

// Import schemas
import vehicle from './sanity/schemas/vehicle'
import testimonial from './sanity/schemas/testimonial'
import faq from './sanity/schemas/faq'
import preOrder from './sanity/schemas/preOrder'
import heroImage from './sanity/schemas/heroSlide'
import heroSection from './sanity/schemas/heroSection'
import feature from './sanity/schemas/feature'
import siteSettings from './sanity/schemas/siteSettings'

// Load environment variables for Sanity config
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn('⚠️  Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables')
  console.warn('   Create a .env.local file with your Sanity Project ID')
  console.warn('   See .env.local.example for reference')
}

export default defineConfig({
  name: 'default',
  title: 'Auto Luxe CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool(),
    // Uncomment after installing @sanity/vision: visionTool(),
  ],
  schema: {
    types: [
      siteSettings,
      heroSection,
      heroImage,
      vehicle,
      testimonial,
      faq,
      preOrder,
      feature,
    ],
  },
})


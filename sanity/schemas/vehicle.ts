import { defineType, defineField } from 'sanity'

// Helper function to generate a unique ID
function generateVehicleId() {
  const prefix = 'v'
  const random = Math.random().toString(36).substring(2, 8).toLowerCase()
  const timestamp = Date.now().toString(36).substring(2, 6)
  return `${prefix}${timestamp}${random}`
}

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

// Helper function to generate slug source string from name, brand, year + unique hash
function generateSlugSource(doc: any) {
  const name = doc?.name || ''
  const brand = doc?.brand || ''
  const year = doc?.year ? String(doc.year) : ''
  
  // Create a unique hash from the combination of fields for uniqueness
  const uniqueString = `${brand}-${name}-${year}-${doc?._id || Date.now()}`
  const uniqueHash = simpleHash(uniqueString).toLowerCase()
  
  // Create slug source: brand-name-year-hash
  const parts = [brand, name, year, uniqueHash].filter(Boolean)
  return parts.join(' ')
}

export default defineType({
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  initialValue: async () => {
    const id = generateVehicleId()
    // Generate initial slug - will be regenerated when brand/name/year are filled
    const initialSlug = `${id}-${Date.now().toString(36)}`
    return {
      id,
      slug: {
        _type: 'slug',
        current: initialSlug,
      },
    }
  },
  fields: [
    defineField({
      name: 'id',
      title: 'Vehicle ID',
      type: 'string',
      description: 'Auto-generated unique identifier',
      hidden: true,
      readOnly: true,
      initialValue: generateVehicleId,
      // No validation needed - it's auto-generated
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Vehicle name (e.g., BMW 520d)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      hidden: true,
      readOnly: true,
      options: {
        source: (doc: any) => generateSlugSource(doc),
        maxLength: 120,
        slugify: (input: string) => {
          return input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 120)
        },
      },
      // No validation needed - it's auto-generated
    }),
    defineField({
      name: 'price',
      title: 'Price (LKR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: { 
          hotspot: true,
        } 
      }],
      options: {
        layout: 'grid',
        sortable: true,
      },
      description: 'Additional images for the vehicle gallery (will be converted to WebP). You can add multiple images at once by: 1) Dragging and dropping multiple image files directly into this field, or 2) Clicking "Add item" and selecting multiple images using Ctrl/Cmd+Click or Shift+Click in the file browser.',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'engine',
      title: 'Engine',
      type: 'string',
      description: 'Engine specification (e.g., 2.0L Turbo Diesel I4)',
    }),
    defineField({
      name: 'fuel',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Petrol', value: 'Petrol' },
          { title: 'Diesel', value: 'Diesel' },
          { title: 'Hybrid', value: 'Hybrid' },
          { title: 'Electric', value: 'Electric' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          { title: 'Auto', value: 'Auto' },
          { title: 'Manual', value: 'Manual' },
          { title: 'CVT', value: 'CVT' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'driveType',
      title: 'Drive Type',
      type: 'string',
      options: {
        list: [
          { title: 'FWD', value: 'FWD' },
          { title: 'RWD', value: 'RWD' },
          { title: 'AWD', value: 'AWD' },
          { title: '4WD', value: '4WD' },
        ],
      },
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Used', value: 'used' },
        ],
      },
      initialValue: 'used',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Used', value: 'used' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured listings',
      initialValue: false,
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      description: 'Show in popular listings',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Custom meta title for this vehicle (defaults to vehicle name if not set). Recommended: 50-60 characters.',
          validation: (Rule) => Rule.max(60).warning('Meta titles should be under 60 characters for best SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Custom meta description for this vehicle (defaults to description if not set). Recommended: 150-160 characters.',
          validation: (Rule) => Rule.max(160).warning('Meta descriptions should be under 160 characters for best SEO'),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Additional keywords for this vehicle (e.g., luxury sedan, premium car, BMW)',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Custom image for social media sharing (defaults to main image if not set). Recommended: 1200x630px',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'mainImage',
    },
  },
})


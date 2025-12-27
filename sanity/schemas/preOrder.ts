import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'preOrder',
  title: 'Pre-Order',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Pre-Order ID',
      type: 'string',
      description: 'Unique identifier (e.g., po1, po2)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Vehicle Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Vehicle Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expectedPrice',
      title: 'Expected Price',
      type: 'string',
      description: 'Price display string (e.g., "From LKR 67,500,000")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expectedArrival',
      title: 'Expected Arrival',
      type: 'string',
      description: 'Expected arrival date (e.g., "Q2 2025")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slotsAvailable',
      title: 'Slots Available',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of vehicle specifications',
    }),
    defineField({
      name: 'deliveryDuration',
      title: 'Delivery Duration',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'body',
          type: 'text',
          title: 'Body Content',
          rows: 5,
        },
        {
          name: 'items',
          type: 'array',
          title: 'Items List',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'warrantyCoverage',
      title: 'Warranty Coverage',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'body',
          type: 'text',
          title: 'Body Content',
          rows: 5,
        },
        {
          name: 'items',
          type: 'array',
          title: 'Items List',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'personalLCImport',
      title: 'Personal LC Import',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'body',
          type: 'text',
          title: 'Body Content',
          rows: 5,
        },
        {
          name: 'items',
          type: 'array',
          title: 'Items List',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'nonPersonalLCImport',
      title: 'Non-Personal LC Import',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'body',
          type: 'text',
          title: 'Body Content',
          rows: 5,
        },
        {
          name: 'items',
          type: 'array',
          title: 'Items List',
          of: [{ type: 'string' }],
        },
      ],
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
          description: 'Custom meta title for this pre-order (defaults to vehicle name if not set). Recommended: 50-60 characters.',
          validation: (Rule) => Rule.max(60).warning('Meta titles should be under 60 characters for best SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Custom meta description for this pre-order. Recommended: 150-160 characters.',
          validation: (Rule) => Rule.max(160).warning('Meta descriptions should be under 160 characters for best SEO'),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Additional keywords for this pre-order (e.g., pre-order, upcoming vehicle, new model)',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Custom image for social media sharing (defaults to vehicle image if not set). Recommended: 1200x630px',
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
      subtitle: 'expectedArrival',
      media: 'image',
    },
  },
})


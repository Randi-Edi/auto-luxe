import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Ganegoda International',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo displayed in header',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number (displayed in header)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp contact number (without +)',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'locationPlusCode',
      title: 'Location Plus Code',
      type: 'string',
      description: 'Google Plus Code for location (used for Get Directions link). Example: XWVV+59 Kadawatha',
      initialValue: 'XWVV+59 Kadawatha',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Business hours (e.g., "Mon-Fri: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 5:00 PM")',
    }),
    defineField({
      name: 'footerHeading',
      title: 'Footer Heading',
      type: 'string',
      description: 'Heading text displayed above the footer description',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 3,
      description: 'Description text displayed in the footer',
      initialValue: 'Your trusted partner for premium luxury vehicles. Excellence in every deal, trust in every transaction.',
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Default meta title for the site (appears in browser tabs and search results). Recommended: 50-60 characters.',
          validation: (Rule) => Rule.max(60).warning('Meta titles should be under 60 characters for best SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Default meta description for the site (appears in search results). Recommended: 150-160 characters.',
          validation: (Rule) => Rule.max(160).warning('Meta descriptions should be under 160 characters for best SEO'),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Comma-separated keywords for SEO (e.g., luxury cars, premium vehicles, auto dealer)',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Default image for social media sharing (Facebook, LinkedIn, etc.). Recommended: 1200x630px',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'ogTitle',
          title: 'Open Graph Title',
          type: 'string',
          description: 'Title for social media sharing (defaults to meta title if not set)',
        }),
        defineField({
          name: 'ogDescription',
          title: 'Open Graph Description',
          type: 'text',
          rows: 2,
          description: 'Description for social media sharing (defaults to meta description if not set)',
        }),
        defineField({
          name: 'twitterCard',
          title: 'Twitter Card Type',
          type: 'string',
          options: {
            list: [
              { title: 'Summary', value: 'summary' },
              { title: 'Summary Large Image', value: 'summary_large_image' },
            ],
          },
          initialValue: 'summary_large_image',
        }),
        defineField({
          name: 'twitterSite',
          title: 'Twitter Site Handle',
          type: 'string',
          description: 'Your Twitter handle (e.g., @yourcompany)',
          placeholder: '@yourcompany',
        }),
        defineField({
          name: 'siteUrl',
          title: 'Site URL',
          type: 'url',
          description: 'Your website URL (e.g., https://www.yoursite.com)',
          validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Canonical URL for the site (usually same as Site URL)',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Snapchat', value: 'snapchat' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Full URL to your social media profile',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel'],
              }),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Display label (optional, defaults to platform name)',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which links appear (lower numbers first)',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              label: 'label',
            },
            prepare({ platform, url, label }) {
              return {
                title: label || platform || 'Social Link',
                subtitle: url || 'No URL',
              }
            },
          },
        },
      ],
      description: 'Add, edit, or remove social media links. These will appear in the footer.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})


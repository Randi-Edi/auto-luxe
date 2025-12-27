import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'label',
      title: 'Label Text',
      type: 'string',
      description: 'Small label text above the title (e.g., "Premium Automotive Experience")',
    }),
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'text',
      rows: 3,
      description: 'Main hero title (supports multiple lines)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      description: 'Subtitle text below the main title',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero Section Settings',
      }
    },
  },
})


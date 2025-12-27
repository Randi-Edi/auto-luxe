import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which images appear in the slider (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for the image',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      order: 'order',
    },
    prepare({ media, order }) {
      return {
        title: `Hero Image ${order !== undefined ? `#${order}` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})


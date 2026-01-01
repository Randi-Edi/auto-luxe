import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'ABOUT US: GANEGODA INTERNATIONAL (PVT) LTD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'DRIVING DREAMS INTO REALITY',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      description: 'Main introduction paragraph',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'directorImage',
      title: 'Director Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the director',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'directorName',
      title: 'Director Name',
      type: 'string',
      description: 'Name and title of the director',
      initialValue: 'Director, Ganegoda International (Pvt) Ltd',
    }),
    defineField({
      name: 'directorMessage',
      title: "Director's Message",
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coreOperations',
      title: 'Core Operations',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'OUR CORE OPERATIONS',
        }),
        defineField({
          name: 'intro',
          title: 'Introduction',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'operations',
          title: 'Operations',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'WHY CHOOSE US?',
        }),
        defineField({
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'visitShowroom',
      title: 'Visit Showroom Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'VISIT OUR SHOWROOM',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          initialValue: 'Ganegoda International (Pvt) Ltd Driving Dreams into Reality.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Page',
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
})


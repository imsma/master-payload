import { CollectionConfig, User } from 'payload'

type AccessArgs = {
  req: {
    user?: User | null
  }
}

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }: AccessArgs) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    update: ({ req: { user } }: AccessArgs) => {
      return user?.role === 'admin' || user?.role === 'editor'
    },
    delete: ({ req: { user } }: AccessArgs) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          data.createdAt = new Date()
        }
        return data
      },
    ],
  },
}

export default Posts

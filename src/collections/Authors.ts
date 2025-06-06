import { CollectionConfig } from 'payload'

const Authors: CollectionConfig = {
  slug: 'authors',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Authors

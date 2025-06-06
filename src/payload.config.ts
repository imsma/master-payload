// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import {
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import { collections } from './collections'
import { Upload } from '@payloadcms/ui'
import { searchPlugin } from '@payloadcms/plugin-search'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['/components/HelloWidget.tsx'],
      actions: ['/components/ExportButton.tsx'],
    },
  },
  collections,
  editor: lexicalEditor({
    features: () => {
      return [
        ParagraphFeature(),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        HorizontalRuleFeature(),
        InlineToolbarFeature(),
        HeadingFeature(),
        UploadFeature({
          collections: {
            media: {
              fields: [
                {
                  name: 'altText',
                  type: 'text',
                  label: 'Alt Text',
                },
              ],
            },
          },
        }),
        LinkFeature({
          enabledCollections: ['posts'],
        }),
      ]
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  globals: [
    {
      slug: 'site-settings',
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'siteDescription',
          type: 'textarea',
        },
        {
          name: 'contactEmail',
          type: 'email',
          required: true,
        },
        {
          name: 'socialMediaLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'maintenanceMode',
          type: 'checkbox',
          label: 'Enable Maintenance Mode',
          defaultValue: false,
        },
        {
          name: 'defaultLanguage',
          type: 'select',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
          ],
          defaultValue: 'en',
        },
        {
          name: 'themeSettings',
          type: 'group',
          fields: [
            {
              name: 'primaryColor',
              type: 'text',
            },
            {
              name: 'fontFamily',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    payloadCloudPlugin(),
    searchPlugin({
      collections: ['posts'],
      defaultPriorities: {
        posts: 20,
      },
    }),
    // storage-adapter-placeholder
  ],
})

'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export async function fetchPosts({ page = 1, limit = 10, sort = '-publishedDate' }) {
  const payload = await getPayload({ config: buildConfig })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    where: {
      status: {
        equals: 'published',
      },
    },
    sort,
    limit,
    page,
  })

  return posts.docs
}

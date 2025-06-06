import { fetchPosts } from '@/actions/fetchPosts'

export default async function BlogList({ page = 1, limit = 10 }) {
  const posts = await fetchPosts({ page, limit })

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

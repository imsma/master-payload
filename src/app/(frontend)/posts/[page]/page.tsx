import BlogList from '@/components/BlogList'

export default async function Posts({ params }: { params: Promise<{ page: string }> }) {
  const page = (await params).page

  return (
    <div>
      <h1>Posts Page {page}</h1>
      <hr />
      <BlogList page={parseInt(page, 10)} limit={10} />
    </div>
  )
}

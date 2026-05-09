import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function formatDisplayDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function Journal() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
    where: {
      publishedAt: {
        not: null,
      },
    },
  })

  return (
    <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-navy mb-4">School Journal</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stories, updates, and educational insights from Pink Tower International School.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-gray-600">No journal posts have been published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              {post.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover bg-gray-100" />
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Journal</span>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-semibold text-purple uppercase tracking-wider">{post.author}</span>
                  {post.publishedAt && (
                    <span className="text-sm text-gray-500">{formatDisplayDate(post.publishedAt)}</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-navy mb-3">{post.title}</h2>
                <p className="text-gray-600 flex-grow whitespace-pre-line">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

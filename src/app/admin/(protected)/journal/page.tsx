import prisma from '@/lib/prisma'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { createJournalPost, deleteJournalPost, updateJournalPost } from './actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ q?: string | string[] }>

function formatDisplayDate(date: Date | null) {
  if (!date) return 'Draft'

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminJournal({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { q } = await searchParams
  const query = Array.isArray(q) ? q[0] ?? '' : q ?? ''
  const trimmedQuery = query.trim()
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    where: trimmedQuery
      ? {
          OR: [
            { title: { contains: trimmedQuery } },
            { author: { contains: trimmedQuery } },
            { content: { contains: trimmedQuery } },
          ],
        }
      : undefined,
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Manage Journal</h1>
          <p className="text-gray-600 mt-2">Create, update, publish, and delete journal posts.</p>
        </div>
        <a href="#new-entry" className="bg-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
          <Plus size={20} />
          New Entry
        </a>
      </div>

      <section id="new-entry" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-5">New Journal Entry</h2>
        <form action={createJournalPost} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Title
            <input name="title" required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Author
            <input name="author" required defaultValue="Admin" className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-gray-700">
            Content
            <textarea name="content" required rows={5} className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Image
            <input name="image" type="file" accept="image/*" className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input name="published" type="checkbox" className="h-4 w-4 accent-purple" />
            Publish now
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="bg-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
              <Plus size={18} />
              Create Entry
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <form className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Search entries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow focus:border-transparent"
            />
          </form>
          {trimmedQuery && (
            <a href="/admin/journal" className="text-sm font-medium text-purple hover:underline">Clear search</a>
          )}
        </div>

        <div className="divide-y divide-gray-100">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No journal entries found.</div>
          ) : (
            posts.map((post) => {
              const published = Boolean(post.publishedAt)

              return (
                <div key={post.id} className="p-5">
                  <form action={updateJournalPost} className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.7fr_auto] gap-4 items-start">
                    <input type="hidden" name="id" value={post.id} />
                    <div className="space-y-3">
                      {post.imageUrl && (
                        <div className="overflow-hidden rounded-lg bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.imageUrl} alt={post.title} className="w-full max-h-64 object-cover" />
                        </div>
                      )}
                      <input
                        name="title"
                        defaultValue={post.title}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-navy focus:outline-none focus:ring-2 focus:ring-yellow"
                      />
                      <textarea
                        name="content"
                        defaultValue={post.content}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                        Author
                        <input name="author" defaultValue={post.author} required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
                      </label>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input name="published" type="checkbox" defaultChecked={published} className="h-4 w-4 accent-purple" />
                        Published
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                        Replace image
                        <input name="image" type="file" accept="image/*" className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow" />
                      </label>
                      {post.imageUrl && (
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <input name="removeImage" type="checkbox" className="h-4 w-4 accent-purple" />
                          Remove image
                        </label>
                      )}
                      <p className="text-sm text-gray-500">{formatDisplayDate(post.publishedAt)}</p>
                    </div>
                    <div className="flex lg:flex-col gap-2 lg:items-end">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${published ? 'bg-green-100 text-green-700' : 'bg-yellow/20 text-yellow-700'}`}>
                        {published ? 'Published' : 'Draft'}
                      </span>
                      <button type="submit" className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Save entry">
                        <Edit size={18} />
                      </button>
                    </div>
                  </form>
                  <div className="mt-3 flex justify-end">
                    <form action={deleteJournalPost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete entry">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="p-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
          <span>Showing {posts.length} entr{posts.length === 1 ? 'y' : 'ies'}</span>
        </div>
      </section>
    </div>
  )
}

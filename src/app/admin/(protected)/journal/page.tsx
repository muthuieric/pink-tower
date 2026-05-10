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
    <div className="space-y-16 py-10 md:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy">Manage Journal</h1>
          <p className="text-xl text-slate-600 leading-relaxed mt-4 max-w-2xl">Create, update, publish, and delete journal posts.</p>
        </div>
        <a href="#new-entry" className="relative z-10 bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg whitespace-nowrap">
          <Plus size={24} />
          New Entry
        </a>
      </div>

      <section id="new-entry" className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 p-8 md:p-12 scroll-mt-32">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy mb-8">New Journal Entry</h2>
        <form action={createJournalPost} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Title
            <input name="title" required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Author
            <input name="author" required defaultValue="Admin" className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-bold text-navy">
            Content
            <textarea name="content" required rows={5} className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Image
            <input name="image" type="file" accept="image/*" className="px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20" />
          </label>
          <label className="flex items-center gap-3 text-base font-bold text-navy md:mt-8">
            <input name="published" type="checkbox" className="h-5 w-5 rounded text-purple focus:ring-purple" />
            Publish now
          </label>
          <div className="md:col-span-2 mt-2">
            <button type="submit" className="bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg">
              <Plus size={20} />
              Create Entry
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <form className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Search entries..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium"
            />
          </form>
          {trimmedQuery && (
            <a href="/admin/journal" className="text-sm font-bold text-purple hover:text-navy transition-colors">Clear search</a>
          )}
        </div>

        <div className="divide-y divide-gray-50">
          {posts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-lg">No journal entries found.</div>
          ) : (
            posts.map((post) => {
              const published = Boolean(post.publishedAt)

              return (
                <div key={post.id} className="p-8 group hover:bg-gray-50/50 transition-colors">
                  <form action={updateJournalPost} className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.7fr_auto] gap-8 items-start">
                    <input type="hidden" name="id" value={post.id} />
                    <div className="space-y-4">
                      {post.imageUrl && (
                        <div className="mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.imageUrl} alt={post.title} className="w-full max-h-72 object-cover rounded-3xl border-4 border-yellow shadow-lg rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                      )}
                      <input
                        name="title"
                        defaultValue={post.title}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl font-extrabold text-navy text-lg focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all"
                      />
                      <textarea
                        name="content"
                        defaultValue={post.content}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="flex flex-col gap-2 text-sm font-bold text-navy">
                        Author
                        <input name="author" defaultValue={post.author} required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium text-base" />
                      </label>
                      <label className="flex items-center gap-3 text-base font-bold text-navy">
                        <input name="published" type="checkbox" defaultChecked={published} className="h-5 w-5 rounded text-purple focus:ring-purple" />
                        Published
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-bold text-navy">
                        Replace image
                        <input name="image" type="file" accept="image/*" className="px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20" />
                      </label>
                      {post.imageUrl && (
                        <label className="flex items-center gap-3 text-base font-bold text-red-600">
                          <input name="removeImage" type="checkbox" className="h-5 w-5 rounded text-red-600 focus:ring-red-600" />
                          Remove image
                        </label>
                      )}
                      <p className="text-sm font-medium text-slate-500 bg-white inline-block px-4 py-2 rounded-full border border-gray-100 shadow-sm">{formatDisplayDate(post.publishedAt)}</p>
                    </div>
                    <div className="flex lg:flex-col gap-3 lg:items-end">
                      <span className={`inline-block px-3 py-1.5 text-xs font-extrabold rounded-full ${published ? 'bg-green-100 text-green-800' : 'bg-yellow/20 text-yellow-800'}`}>
                        {published ? 'Published' : 'Draft'}
                      </span>
                      <button type="submit" className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95" title="Save entry">
                        <Edit size={18} />
                      </button>
                    </div>
                  </form>
                  <div className="mt-6 flex justify-end border-t border-gray-50 pt-4">
                    <form action={deleteJournalPost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95" title="Delete entry">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="p-6 border-t border-gray-50 text-sm font-medium text-slate-500 flex justify-between items-center bg-gray-50/30">
          <span>Showing {posts.length} entr{posts.length === 1 ? 'y' : 'ies'}</span>
        </div>
      </section>
    </div>
  )
}

import prisma from '@/lib/prisma'
import { Edit, ImagePlus, Search, Trash2 } from 'lucide-react'
import { createGalleryImage, deleteGalleryImage, updateGalleryImage } from './actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ q?: string | string[] }>

export default async function AdminGallery({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { q } = await searchParams
  const query = Array.isArray(q) ? q[0] ?? '' : q ?? ''
  const trimmedQuery = query.trim()
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
    where: trimmedQuery
      ? {
          caption: { contains: trimmedQuery },
        }
      : undefined,
  })

  return (
    <div className="space-y-16 py-10 md:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-900/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy">Manage Gallery</h1>
          <p className="text-xl text-slate-600 leading-relaxed mt-4 max-w-2xl">Upload, update, and delete gallery images.</p>
        </div>
        <a href="#new-image" className="relative z-10 bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg whitespace-nowrap">
          <ImagePlus size={24} />
          Add Image
        </a>
      </div>

      <section id="new-image" className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 p-8 md:p-12 scroll-mt-32">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy mb-8">New Gallery Image</h2>
        <form action={createGalleryImage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Image
            <input name="image" type="file" accept="image/*" required className="px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Caption
            <input name="caption" className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <div className="md:col-span-2 mt-2">
            <button type="submit" className="bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg">
              <ImagePlus size={20} />
              Upload Image
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
              placeholder="Search captions..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium"
            />
          </form>
          {trimmedQuery && (
            <a href="/admin/gallery" className="text-sm font-bold text-purple hover:text-navy transition-colors">Clear search</a>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-8 bg-gray-50/30">
          {images.length === 0 ? (
            <div className="xl:col-span-2 p-12 text-center text-slate-500 text-lg">No gallery images found.</div>
          ) : (
            images.map((image) => (
              <div key={image.id} className="bg-white border-0 shadow-lg shadow-indigo-900/5 rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt={image.caption || 'Gallery image'} className="w-full aspect-video object-cover rounded-2xl border-4 border-yellow/80 shadow-md rotate-1 group-hover:rotate-0 transition-transform duration-500 bg-gray-100" />
                </div>
                <div className="p-6 pt-2 space-y-6">
                  <form action={updateGalleryImage} className="space-y-4">
                    <input type="hidden" name="id" value={image.id} />
                    <label className="flex flex-col gap-2 text-sm font-bold text-navy">
                      Caption
                      <input name="caption" defaultValue={image.caption ?? ''} className="px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium text-base" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-bold text-navy">
                      Replace image
                      <input name="image" type="file" accept="image/*" className="px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple/10 file:text-purple hover:file:bg-purple/20" />
                    </label>
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 w-full justify-center">
                      <Edit size={18} />
                      Save Changes
                    </button>
                  </form>
                  <form action={deleteGalleryImage} className="flex justify-end border-t border-gray-50 pt-4">
                    <input type="hidden" name="id" value={image.id} />
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 w-full justify-center">
                      <Trash2 size={18} />
                      Delete Image
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-50 text-sm font-medium text-slate-500 flex justify-between items-center bg-white">
          Showing {images.length} image{images.length === 1 ? '' : 's'}
        </div>
      </section>
    </div>
  )
}

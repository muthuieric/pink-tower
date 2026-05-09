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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Manage Gallery</h1>
          <p className="text-gray-600 mt-2">Upload, update, and delete gallery images.</p>
        </div>
        <a href="#new-image" className="bg-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
          <ImagePlus size={20} />
          Add Image
        </a>
      </div>

      <section id="new-image" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-5">New Gallery Image</h2>
        <form action={createGalleryImage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Image
            <input name="image" type="file" accept="image/*" required className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Caption
            <input name="caption" className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="bg-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
              <ImagePlus size={18} />
              Upload Image
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
              placeholder="Search captions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow focus:border-transparent"
            />
          </form>
          {trimmedQuery && (
            <a href="/admin/gallery" className="text-sm font-medium text-purple hover:underline">Clear search</a>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
          {images.length === 0 ? (
            <div className="lg:col-span-2 p-8 text-center text-gray-500">No gallery images found.</div>
          ) : (
            images.map((image) => (
              <div key={image.id} className="border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.url} alt={image.caption || 'Gallery image'} className="w-full aspect-video object-cover bg-gray-100" />
                <div className="p-4 space-y-4">
                  <form action={updateGalleryImage} className="space-y-3">
                    <input type="hidden" name="id" value={image.id} />
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                      Caption
                      <input name="caption" defaultValue={image.caption ?? ''} className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                      Replace image
                      <input name="image" type="file" accept="image/*" className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow" />
                    </label>
                    <button type="submit" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit size={18} />
                      Save
                    </button>
                  </form>
                  <form action={deleteGalleryImage} className="flex justify-end">
                    <input type="hidden" name="id" value={image.id} />
                    <button type="submit" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 text-sm text-gray-500">
          Showing {images.length} image{images.length === 1 ? '' : 's'}
        </div>
      </section>
    </div>
  )
}

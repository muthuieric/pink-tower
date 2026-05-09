import prisma from '@/lib/prisma'
import { CalendarDays, Edit, Plus, Search, Trash2 } from 'lucide-react'
import { createEvent, deleteEvent, updateEvent } from './actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ q?: string | string[] }>

function formatInputDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function formatDisplayDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminEvents({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { q } = await searchParams
  const query = Array.isArray(q) ? q[0] ?? '' : q ?? ''
  const trimmedQuery = query.trim()
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    where: trimmedQuery
      ? {
          OR: [
            { title: { contains: trimmedQuery } },
            { location: { contains: trimmedQuery } },
            { description: { contains: trimmedQuery } },
          ],
        }
      : undefined,
  })
  const today = new Date()

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Manage Events</h1>
          <p className="text-gray-600 mt-2">Create, update, and delete school events.</p>
        </div>
        <a href="#new-event" className="bg-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
          <Plus size={20} />
          Add Event
        </a>
      </div>

      <section id="new-event" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-5">New Event</h2>
        <form action={createEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Title
            <input name="title" required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Location
            <input name="location" required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Date
            <input name="date" type="date" required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-gray-700">
            Description
            <textarea name="description" required rows={4} className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="bg-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
              <Plus size={18} />
              Create Event
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
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow focus:border-transparent"
            />
          </form>
          {trimmedQuery && (
            <a href="/admin/events" className="text-sm font-medium text-purple hover:underline">Clear search</a>
          )}
        </div>

        <div className="divide-y divide-gray-100">
          {events.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No events found.</div>
          ) : (
            events.map((event) => {
              const isUpcoming = new Date(event.date) >= today

              return (
                <div key={event.id} className="p-5">
                  <form action={updateEvent} className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr_0.7fr_auto] gap-4 items-start">
                    <input type="hidden" name="id" value={event.id} />
                    <div className="space-y-3">
                      <input
                        name="title"
                        defaultValue={event.title}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-navy focus:outline-none focus:ring-2 focus:ring-yellow"
                      />
                      <textarea
                        name="description"
                        defaultValue={event.description}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow"
                      />
                    </div>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                      Location
                      <input name="location" defaultValue={event.location} required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                      Date
                      <input name="date" type="date" defaultValue={formatInputDate(event.date)} required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
                    </label>
                    <div className="flex lg:flex-col gap-2 lg:items-end">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${isUpcoming ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        <CalendarDays size={14} />
                        {isUpcoming ? 'Upcoming' : 'Past'}
                      </span>
                      <button type="submit" className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Save event">
                        <Edit size={18} />
                      </button>
                    </div>
                  </form>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-500">
                    <span>{formatDisplayDate(event.date)}</span>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={event.id} />
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete event">
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
          <span>Showing {events.length} event{events.length === 1 ? '' : 's'}</span>
        </div>
      </section>
    </div>
  )
}

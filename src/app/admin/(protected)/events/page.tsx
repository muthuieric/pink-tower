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
    <div className="space-y-16 py-10 md:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy">Manage Events</h1>
          <p className="text-xl text-slate-600 leading-relaxed mt-4 max-w-2xl">Create, update, and delete school events.</p>
        </div>
        <a href="#new-event" className="relative z-10 bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg whitespace-nowrap">
          <Plus size={24} />
          Add Event
        </a>
      </div>

      <section id="new-event" className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 p-8 md:p-12 scroll-mt-32">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy mb-8">New Event</h2>
        <form action={createEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Title
            <input name="title" required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Location
            <input name="location" required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Date
            <input name="date" type="date" required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-bold text-navy">
            Description
            <textarea name="description" required rows={4} className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <div className="md:col-span-2 mt-2">
            <button type="submit" className="bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg">
              <Plus size={20} />
              Create Event
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
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium"
            />
          </form>
          {trimmedQuery && (
            <a href="/admin/events" className="text-sm font-bold text-purple hover:text-navy transition-colors">Clear search</a>
          )}
        </div>

        <div className="divide-y divide-gray-50">
          {events.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-lg">No events found.</div>
          ) : (
            events.map((event) => {
              const isUpcoming = new Date(event.date) >= today

              return (
                <div key={event.id} className="p-8 group hover:bg-gray-50/50 transition-colors">
                  <form action={updateEvent} className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr_0.7fr_auto] gap-6 items-start">
                    <input type="hidden" name="id" value={event.id} />
                    <div className="space-y-4">
                      <input
                        name="title"
                        defaultValue={event.title}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl font-extrabold text-navy text-lg focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all"
                      />
                      <textarea
                        name="description"
                        defaultValue={event.description}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium"
                      />
                    </div>
                    <label className="flex flex-col gap-2 text-sm font-bold text-navy">
                      Location
                      <input name="location" defaultValue={event.location} required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium text-base" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-bold text-navy">
                      Date
                      <input name="date" type="date" defaultValue={formatInputDate(event.date)} required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all font-medium text-base" />
                    </label>
                    <div className="flex lg:flex-col gap-3 lg:items-end">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-full ${isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-slate-600'}`}>
                        <CalendarDays size={14} />
                        {isUpcoming ? 'Upcoming' : 'Past'}
                      </span>
                      <button type="submit" className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95" title="Save event">
                        <Edit size={18} />
                      </button>
                    </div>
                  </form>
                  <div className="mt-6 flex items-center justify-between gap-4 text-sm font-medium text-slate-500">
                    <span className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">{formatDisplayDate(event.date)}</span>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={event.id} />
                      <button type="submit" className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95" title="Delete event">
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
          <span>Showing {events.length} event{events.length === 1 ? '' : 's'}</span>
        </div>
      </section>
    </div>
  )
}

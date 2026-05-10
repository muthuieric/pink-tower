import prisma from '@/lib/prisma'
import { ArrowRight, BookOpen, CalendarDays, Images } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function formatDisplayDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminDashboard() {
  const [eventCount, journalCount, galleryCount, recentEvents, recentPosts] = await Promise.all([
    prisma.event.count(),
    prisma.blogPost.count(),
    prisma.galleryImage.count(),
    prisma.event.findMany({
      orderBy: { date: 'asc' },
      take: 3,
    }),
    prisma.blogPost.findMany({
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 3,
    }),
  ])
  const stats = [
    { label: 'Events', value: eventCount, icon: CalendarDays, href: '/admin/events' },
    { label: 'Journal Entries', value: journalCount, icon: BookOpen, href: '/admin/journal' },
    { label: 'Gallery Images', value: galleryCount, icon: Images, href: '/admin/gallery' },
  ]

  return (
    <div className="space-y-16 py-10 md:py-16">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-900/10 border-0 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy">Dashboard</h1>
          <p className="text-xl text-slate-600 leading-relaxed mt-4 max-w-2xl">Welcome to the Pink Tower admin panel. Here's an overview of your school's online presence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Link key={stat.label} href={stat.href} className="group bg-white p-8 rounded-3xl shadow-xl shadow-indigo-900/10 border-0 flex items-start justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div>
                <p className="text-slate-500 font-medium mb-2 text-lg">{stat.label}</p>
                <h3 className="text-5xl font-extrabold tracking-tight text-navy group-hover:text-purple transition-colors">{stat.value}</h3>
              </div>
              <div className="bg-yellow/20 p-4 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon size={28} className="text-yellow" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy">Recent Events</h2>
            <Link href="/admin/events" className="text-sm text-purple font-bold flex items-center gap-1 hover:text-navy transition-colors">
              View all <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="p-8 space-y-6">
            {recentEvents.length === 0 ? (
              <p className="text-slate-500 text-lg">No events to display. Manage events to see them here.</p>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0 group">
                  <p className="font-bold text-lg text-navy group-hover:text-purple transition-colors">{event.title}</p>
                  <p className="text-md text-slate-500 mt-1">{formatDisplayDate(event.date)} · {event.location}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy">Recent Journal Entries</h2>
            <Link href="/admin/journal" className="text-sm text-purple font-bold flex items-center gap-1 hover:text-navy transition-colors">
              View all <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="p-8 space-y-6">
            {recentPosts.length === 0 ? (
              <p className="text-slate-500 text-lg">No entries to display. Manage journal to see them here.</p>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0 group">
                  <p className="font-bold text-lg text-navy group-hover:text-purple transition-colors">{post.title}</p>
                  <p className="text-md text-slate-500 mt-1">{post.publishedAt ? formatDisplayDate(post.publishedAt) : 'Draft'} · {post.author}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

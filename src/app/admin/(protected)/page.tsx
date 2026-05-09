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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the Pink Tower admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Link key={stat.label} href={stat.href} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition">
              <div>
                <p className="text-gray-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-navy">{stat.value}</h3>
              </div>
              <div className="bg-yellow/20 p-3 rounded-full">
                <Icon size={24} className="text-yellow" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-navy">Recent Events</h2>
            <Link href="/admin/events" className="text-sm text-yellow font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {recentEvents.length === 0 ? (
              <p className="text-gray-500 text-sm">No events to display. Manage events to see them here.</p>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                  <p className="font-medium text-navy">{event.title}</p>
                  <p className="text-sm text-gray-500">{formatDisplayDate(event.date)} · {event.location}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-navy">Recent Journal Entries</h2>
            <Link href="/admin/journal" className="text-sm text-yellow font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {recentPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">No entries to display. Manage journal to see them here.</p>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                  <p className="font-medium text-navy">{post.title}</p>
                  <p className="text-sm text-gray-500">{post.publishedAt ? formatDisplayDate(post.publishedAt) : 'Draft'} · {post.author}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

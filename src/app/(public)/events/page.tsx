import prisma from '@/lib/prisma';
import { CalendarDays, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Events() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    where: {
      date: {
        gte: new Date()
      }
    }
  });

  return (
    <div className="py-16 px-6 md:px-12 max-w-5xl mx-auto min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-navy mb-4">Upcoming Events</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay up to date with what&apos;s happening at Pink Tower International School.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No upcoming events at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-purple/10 text-purple p-4 rounded-lg flex flex-col items-center justify-center min-w-[100px] shrink-0">
                <span className="text-sm font-bold uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                <span className="text-3xl font-black">{new Date(event.date).getDate()}</span>
              </div>
              
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-navy mb-2">{event.title}</h2>
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events - Pink Tower International School",
  description:
    "Upcoming events at Pink Tower International School: Sports Day, Open House, Parent-Teacher meetings and more.",
  openGraph: {
    title: "Events - Pink Tower International School",
    description: "Join our upcoming school events in Lavington, Nairobi.",
  },
};

const fallbackEvents = [
  {
    id: "f1",
    date: new Date("2026-05-22T12:00:00"),
    title: "Open House - Mzima Springs Campus",
    location: "Mzima Springs Campus",
    description: "Tour the classrooms, meet the guides, and bring your child to play.",
  },
  {
    id: "f2",
    date: new Date("2026-06-07T12:00:00"),
    title: "Annual Sports Day",
    location: "Lavington Sports Field",
    description: "A morning of races, games and family picnics.",
  },
  {
    id: "f3",
    date: new Date("2026-06-19T12:00:00"),
    title: "Parent-Teacher Conferences",
    location: "Both campuses",
    description: "Termly conversations about each child's growth.",
  },
];

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Events() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    where: {
      date: {
        gte: new Date(),
      },
    },
  });

  const sorted = events.length > 0 ? events : fallbackEvents;

  return (
    <div className="bg-[#FAFAFA] font-sans pb-10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-16 md:px-12 md:py-32">
        {/* Playful Background Elements */}
        <div className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full border-[32px] border-yellow/20 md:left-auto md:right-16 md:top-14" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-purple/5 blur-3xl" />
        
        <div className="relative mx-auto max-w-5xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
            <Sparkles className="h-4 w-4 text-yellow" />
            Events & Calendar
          </span>
          <h1 className="mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl">
            Upcoming at <br className="hidden md:block" />
            <span className="text-purple">Pink Tower.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            Mark your calendars - and join us for moments of joy, connection, and community.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center md:text-left">
            <p className="text-sm font-extrabold uppercase tracking-widest text-purple mb-4">School Calendar</p>
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
              Moments for children, parents, <br className="hidden md:block" /> and our wider community.
            </h2>
          </div>

          <div className="grid gap-8">
            {sorted.map((event) => {
              const date = new Date(event.date);

              return (
                <article
                  key={event.id}
                  className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 border border-transparent hover:border-purple/20"
                >
                  <div className="flex flex-col items-center justify-center bg-gradient-to-b from-yellow/30 to-yellow/10 p-8 text-center text-navy md:w-48 md:border-r-2 md:border-dashed md:border-yellow/30 transition-colors group-hover:from-yellow/40 group-hover:to-yellow/20">
                    <div className="font-heading text-6xl font-black leading-none text-navy group-hover:scale-110 transition-transform duration-300">{date.getUTCDate()}</div>
                    <div className="mt-2 text-base font-extrabold uppercase tracking-widest text-purple">
                      {date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-500">{date.getUTCFullYear()}</div>
                  </div>

                  <div className="flex flex-col justify-center p-8 md:p-10 flex-grow relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple/5 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <h3 className="text-3xl font-heading font-extrabold text-navy group-hover:text-purple transition-colors relative z-10">{event.title}</h3>
                    {event.description && <p className="mt-4 text-lg leading-relaxed text-slate-600 relative z-10">{event.description}</p>}
                    
                    <div className="mt-8 flex flex-wrap gap-6 text-base font-medium text-slate-700 relative z-10">
                      <span className="flex items-center gap-3 bg-purple/5 px-4 py-2 rounded-full border border-purple/10">
                        <CalendarDays className="h-5 w-5 text-purple" />
                        {formatDate(date)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-3 bg-yellow/10 px-4 py-2 rounded-full border border-yellow/20">
                          <MapPin className="h-5 w-5 text-amber-600" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20 md:px-12 md:pb-24">
         <div className="mx-auto max-w-5xl rounded-3xl bg-navy px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-purple blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 rounded-full" />
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-yellow blur-2xl opacity-20 translate-y-1/2 -translate-x-1/2 rounded-full" />
            <h2 className="relative z-10 text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white">
               Never miss a moment.
            </h2>
            <p className="relative z-10 mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
               Stay updated on our community events, term dates, and special activities.
            </p>
            <div className="relative z-10 mt-10">
               <button className="rounded-full bg-white px-8 py-4 text-lg font-extrabold text-navy shadow-xl shadow-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20 active:scale-95">
                  View Full Calendar
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}

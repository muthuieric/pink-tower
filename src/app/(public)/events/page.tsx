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
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow/35 via-white to-purple/10 px-6 py-20 md:px-12 md:py-28">
        <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full border-[28px] border-yellow/25 md:left-auto md:right-16 md:top-14" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-purple/10" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
            <Sparkles className="h-4 w-4" />
            Events
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy md:text-6xl">
            Upcoming at Pink Tower.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">Mark your calendars - and join us.</p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wide text-purple">School Calendar</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              Moments for children, parents, and our wider community.
            </h2>
          </div>

          <div className="grid gap-5">
            {sorted.map((event) => {
              const date = new Date(event.date);

              return (
                <article
                  key={event.id}
                  className="grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-purple/40 hover:shadow-md md:grid-cols-[10rem_1fr]"
                >
                  <div className="flex items-center justify-center border-b border-navy bg-yellow p-6 text-center text-navy md:border-b-0 md:border-r">
                    <div>
                      <div className="font-display text-4xl font-extrabold leading-none">{date.getUTCDate()}</div>
                      <div className="mt-1 text-sm font-bold uppercase tracking-wider">
                        {date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
                      </div>
                      <div className="mt-1 text-xs font-bold opacity-75">{date.getUTCFullYear()}</div>
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <h3 className="text-2xl font-bold text-navy">{event.title}</h3>
                    {event.description && <p className="mt-3 leading-7 text-gray-600">{event.description}</p>}
                    <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-purple" />
                        {formatDate(date)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple" />
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
    </div>
  );
}

import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Images, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery - Pink Tower International School",
  description: "A glimpse into daily life, classroom discovery, art, music, play, and community moments at Pink Tower.",
  openGraph: {
    title: "Gallery - Pink Tower International School",
    description: "See learning and community moments from Pink Tower International School in Lavington, Nairobi.",
  },
};

export default async function Gallery() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Fallback images if database is empty
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: "1",
            url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80",
            caption: "Classroom activity",
          },
          {
            id: "2",
            url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
            caption: "Learning together",
          },
          {
            id: "3",
            url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
            caption: "Playtime",
          },
          {
            id: "4",
            url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80",
            caption: "Art class",
          },
          {
            id: "5",
            url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
            caption: "Music lesson",
          },
          {
            id: "6",
            url: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80",
            caption: "School exterior",
          },
        ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple/10 via-white to-yellow/35 px-6 py-20 md:px-12 md:py-28">
        <div className="absolute -right-16 top-10 h-48 w-48 rounded-full border-[26px] border-purple/10" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-yellow/25" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
            <Sparkles className="h-4 w-4" />
            Gallery
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy md:text-6xl">
            A window into everyday wonder.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
            Take a glimpse into the daily life, activities, and special moments at Pink Tower International School.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-purple">Life at Pink Tower</p>
              <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Learning, play, art, and community.</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow text-navy">
              <Images className="h-6 w-6" />
            </div>
          </div>

          <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
            {displayImages.map((img) => (
              <div
                key={img.id}
                className="group relative break-inside-avoid overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm transition hover:border-purple/40 hover:shadow-md"
              >
                {/* Using standard img tag for external URLs without needing to configure remotePatterns in next.config */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption || "Gallery Image"}
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-navy/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm font-bold text-white">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

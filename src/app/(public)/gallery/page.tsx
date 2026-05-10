import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ArrowRight, Images, Sparkles } from "lucide-react";
import Link from 'next/link';

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
    <div className="bg-[#FAFAFA] font-sans pb-10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-16 md:px-12 md:py-32">
        {/* Playful Background Elements */}
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full border-[32px] border-yellow/20" />
        <div className="absolute -bottom-20 left-8 h-72 w-72 rounded-full bg-purple/5 blur-3xl" />
        
        <div className="relative mx-auto max-w-5xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
            <Sparkles className="h-4 w-4 text-yellow" />
            Our Gallery
          </span>
          <h1 className="mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl">
            A window into <br className="hidden md:block" />
            <span className="text-purple">everyday wonder.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            Take a glimpse into the daily life, activities, and special moments at Pink Tower International School.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between text-center md:text-left">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-purple mb-4">Life at Pink Tower</p>
              <h2 className="text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
                Learning, play, art, <br className="hidden md:block" /> and community.
              </h2>
            </div>
            <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-3xl bg-yellow/20 text-yellow shadow-inner">
              <Images className="h-10 w-10 text-yellow" />
            </div>
          </div>

          <div className="columns-1 gap-8 space-y-8 sm:columns-2 lg:columns-3">
            {displayImages.map((img, index) => {
              // Create alternating rotations for the playful scrapbook feel
              const rotationClass = index % 3 === 0 ? '-rotate-2' : index % 2 === 0 ? 'rotate-2' : '-rotate-1';
              const borderClass = index % 2 === 0 ? 'border-yellow/50' : 'border-purple/30';

              return (
                <div
                  key={img.id}
                  className={`group relative break-inside-avoid overflow-hidden rounded-3xl border-8 ${borderClass} bg-white shadow-xl shadow-indigo-900/10 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl hover:shadow-indigo-900/20 transform ${rotationClass}`}
                >
                  {/* Using standard img tag for external URLs without needing to configure remotePatterns in next.config */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption || "Gallery Image"}
                    className="h-auto w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-6 pt-12 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-lg font-extrabold text-white">{img.caption}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

     
        {/* CTA Section */}
        <section className="px-6 pb-20 md:px-12 md:pb-24">
         <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-yellow to-amber-400 px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-yellow/20 relative overflow-hidden transform rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/40 blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full" />
            
            <h2 className="relative z-10 text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-navy">
            Experience it in person
            </h2>
            <p className="relative z-10 mt-6 text-lg md:text-xl text-navy/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Pictures can only tell half the story. Come and feel the warmth of our community.
            </p>
            <div className="relative z-10 mt-10">
               <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-navy/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/40 active:scale-95"
               >
                  Schedule a Visit
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { BookOpen, Music2, Paintbrush, Sparkles, Languages, type LucideIcon, ArrowRight, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Journal - Pink Tower International School",
  description: "School news, child-development insights and reflections from our Montessori community.",
  openGraph: {
    title: "The Journal - Pink Tower International School",
    description: "Articles on Montessori, parenting and child development.",
  },
};

const fallbackPosts = [
  {
    id: "p1",
    title: "What 'Montessori' Really Means in 2026",
    publishedAt: new Date("2026-04-30T12:00:00"),
    author: null,
    excerpt: "Beyond wooden toys: a closer look at the prepared environment and what makes it transformational.",
    icon: BookOpen,
    accent: "bg-gradient-to-br from-green-100 to-emerald-50",
    iconColor: "text-emerald-500",
    borderColor: "group-hover:border-emerald-300",
  },
  {
    id: "p2",
    title: "Why We Teach Piano from Age Three",
    publishedAt: new Date("2026-04-12T12:00:00"),
    author: null,
    excerpt: "How early music shapes attention, language and emotional regulation - backed by neuroscience.",
    icon: Music2,
    accent: "bg-gradient-to-br from-purple/10 to-fuchsia-50",
    iconColor: "text-purple",
    borderColor: "group-hover:border-purple/30",
  },
  {
    id: "p3",
    title: "Art as a First Language",
    publishedAt: new Date("2026-03-21T12:00:00"),
    author: null,
    excerpt: "When children paint, they think out loud. Our Maker Studio is a place for big ideas.",
    icon: Paintbrush,
    accent: "bg-gradient-to-br from-yellow/20 to-orange-50",
    iconColor: "text-amber-500",
    borderColor: "group-hover:border-amber-300",
  },
  {
    id: "p4",
    title: "Raising Bilingual Kids in Nairobi",
    publishedAt: new Date("2026-03-02T12:00:00"),
    author: null,
    excerpt: "Practical, joyful ways to weave Kiswahili, English and French into everyday family life.",
    icon: Languages,
    accent: "bg-gradient-to-br from-blue-100 to-sky-50",
    iconColor: "text-blue-500",
    borderColor: "group-hover:border-blue-300",
  },
];

const accents = [
  "bg-gradient-to-br from-green-100 to-emerald-50",
  "bg-gradient-to-br from-purple/10 to-fuchsia-50",
  "bg-gradient-to-br from-yellow/20 to-orange-50",
  "bg-gradient-to-br from-blue-100 to-sky-50",
];

const iconColors = [
  "text-emerald-500",
  "text-purple",
  "text-amber-500",
  "text-blue-500",
];

const borderColors = [
  "group-hover:border-emerald-300",
  "group-hover:border-purple/30",
  "group-hover:border-amber-300",
  "group-hover:border-blue-300",
];

const icons = [BookOpen, Music2, Paintbrush, Languages];

type JournalEntry = {
  id: string;
  title: string;
  publishedAt: Date | null;
  author: string | null;
  excerpt: string;
  imageUrl: string | null;
  icon: LucideIcon;
  accent: string;
  iconColor: string;
  borderColor: string;
};

function formatDisplayDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function excerptFromContent(content: string) {
  const trimmed = content.trim();
  if (trimmed.length <= 170) return trimmed;
  return `${trimmed.slice(0, 167).trim()}...`;
}

export default async function Journal() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    where: {
      publishedAt: {
        not: null,
      },
    },
  });

  const entries: JournalEntry[] =
    posts.length > 0
      ? posts.map((post, index) => ({
          id: post.id,
          title: post.title,
          publishedAt: post.publishedAt,
          author: post.author,
          excerpt: excerptFromContent(post.content),
          imageUrl: post.imageUrl,
          icon: icons[index % icons.length],
          accent: accents[index % accents.length],
          iconColor: iconColors[index % iconColors.length],
          borderColor: borderColors[index % borderColors.length],
        }))
      : fallbackPosts.map((post) => ({
          ...post,
          imageUrl: null,
        }));

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
            The Journal
          </span>
          <h1 className="mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl">
            Stories, ideas and <br className="hidden md:block" />
            <span className="text-purple">field notes.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            Reflections on Montessori, parenting, and the wonderful work of childhood.
          </p>
        </div>
      </section>

      {/* Journal Entries Grid */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:text-left">
            <p className="text-sm font-extrabold uppercase tracking-widest text-purple mb-4">From Our Community</p>
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
              Practical reflections for <br className="hidden md:block" /> curious families.
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {entries.map((post) => {
              const Icon = post.icon;

              return (
                <article
                  key={post.id}
                  className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 border-2 border-transparent ${post.borderColor} cursor-pointer`}
                >
                  {post.imageUrl ? (
                    <div className="overflow-hidden aspect-[16/10] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full bg-slate-100 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className={`flex aspect-[16/10] items-center justify-center relative overflow-hidden ${post.accent}`}>
                      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 group-hover:scale-100 transition-transform duration-700" />
                      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white shadow-xl shadow-indigo-900/10 transform rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110">
                        <Icon className={`h-12 w-12 ${post.iconColor}`} />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col flex-grow p-8 md:p-10 relative">
                    <div className="text-sm font-extrabold uppercase tracking-widest text-purple/80 mb-4">
                      {post.publishedAt && formatDisplayDate(post.publishedAt)}
                      {post.author && <span className="text-slate-400 mx-2">|</span>}
                      {post.author && <span className="text-slate-600">By {post.author}</span>}
                    </div>
                    <h3 className="text-3xl font-heading font-extrabold text-navy group-hover:text-purple transition-colors mb-4 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && <p className="text-lg leading-relaxed text-slate-600 flex-grow mb-6">{post.excerpt}</p>}
                    
                    <div className="mt-auto flex items-center text-sm font-extrabold uppercase tracking-widest text-purple group-hover:text-navy transition-colors">
                      Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
         <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-yellow to-amber-400 px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-yellow/20 relative overflow-hidden transform rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/40 blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full" />
            
            <h2 className="relative z-10 text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-navy">
               Want guidance for your child?
            </h2>
            <p className="relative z-10 mt-6 text-lg md:text-xl text-navy/80 max-w-2xl mx-auto leading-relaxed font-medium">
               Talk to our admissions team about age groups, campus fit, and how Montessori works day to day.
            </p>
            <div className="relative z-10 mt-10">
               <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-navy/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/40 active:scale-95"
               >
                  <MessageCircle className="h-5 w-5 text-yellow" />
                  Contact Admissions
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}

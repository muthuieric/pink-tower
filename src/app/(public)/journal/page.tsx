import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { BookOpen, Music2, Paintbrush, Sparkles, Languages, type LucideIcon } from "lucide-react";

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
    accent: "from-yellow/45 via-white to-purple/10",
  },
  {
    id: "p2",
    title: "Why We Teach Piano from Age Three",
    publishedAt: new Date("2026-04-12T12:00:00"),
    author: null,
    excerpt: "How early music shapes attention, language and emotional regulation - backed by neuroscience.",
    icon: Music2,
    accent: "from-purple/15 via-white to-yellow/35",
  },
  {
    id: "p3",
    title: "Art as a First Language",
    publishedAt: new Date("2026-03-21T12:00:00"),
    author: null,
    excerpt: "When children paint, they think out loud. Our Maker Studio is a place for big ideas.",
    icon: Paintbrush,
    accent: "from-yellow/35 via-white to-navy/10",
  },
  {
    id: "p4",
    title: "Raising Bilingual Kids in Nairobi",
    publishedAt: new Date("2026-03-02T12:00:00"),
    author: null,
    excerpt: "Practical, joyful ways to weave Kiswahili, English and French into everyday family life.",
    icon: Languages,
    accent: "from-purple/10 via-white to-yellow/40",
  },
];

const accents = [
  "from-yellow/45 via-white to-purple/10",
  "from-purple/15 via-white to-yellow/35",
  "from-yellow/35 via-white to-navy/10",
  "from-purple/10 via-white to-yellow/40",
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
        }))
      : fallbackPosts.map((post) => ({
          ...post,
          imageUrl: null,
        }));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow/35 via-white to-purple/10 px-6 py-20 md:px-12 md:py-28">
        <div className="absolute -right-16 top-10 h-48 w-48 rounded-full border-[26px] border-purple/10" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-yellow/25" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
            <Sparkles className="h-4 w-4" />
            The Journal
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy md:text-6xl">
            Stories, ideas and field notes.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
            Reflections on Montessori, parenting and the wonderful work of childhood.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wide text-purple">From Our Community</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              Practical reflections for curious families.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {entries.map((post) => {
              const Icon = post.icon;

              return (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-purple/40 hover:shadow-md"
                >
                  {post.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="aspect-[16/10] w-full bg-gray-100 object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${post.accent}`}>
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-navy text-yellow shadow-lg">
                        <Icon className="h-11 w-11" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 md:p-7">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple">
                      {post.publishedAt && formatDisplayDate(post.publishedAt)}
                      {post.author && <> · By {post.author}</>}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-navy">{post.title}</h3>
                    {post.excerpt && <p className="mt-3 leading-7 text-gray-600">{post.excerpt}</p>}
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

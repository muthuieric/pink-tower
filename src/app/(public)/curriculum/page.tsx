import type { Metadata } from 'next';
import { CheckCircle2, Languages, Music2, Paintbrush, Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curriculum - Pink Tower International School',
  description:
    'Explore Early Years, music, art, and language programs at Pink Tower International School in Lavington, Nairobi.',
  openGraph: {
    title: 'Curriculum - Pink Tower International School',
    description: 'Montessori-based curriculum from 18 months to 12 years.',
  },
};

const programs = [
  {
    title: 'Early Years (18 mo - 3 yrs)',
    text: 'A gentle toddler community focused on language, independence, coordination, and care of self.',
    bullets: ['Practical life', 'Sensorial discovery', 'Outdoor exploration', 'Toilet learning support'],
    icon: Sprout,
    accent: 'from-yellow/45 via-white to-purple/10',
  },
  {
    title: 'Music - Piano & Violin',
    text: 'Weekly small-group lessons that build pitch, rhythm, discipline, and joy.',
    bullets: ['Piano from age 3', 'Violin from age 4', 'Termly recitals', 'Choir & rhythm circles'],
    icon: Music2,
    accent: 'from-purple/15 via-white to-yellow/35',
  },
  {
    title: 'Art & Maker Studio',
    text: 'An open studio where children paint, sculpt, build, and tell stories with their hands.',
    bullets: ['Watercolour & clay', 'Recycled materials', 'Cultural art weeks', 'Annual exhibition'],
    icon: Paintbrush,
    accent: 'from-yellow/35 via-white to-navy/10',
  },
  {
    title: 'Languages',
    text: 'A trilingual environment so children grow comfortable across cultures.',
    bullets: ['English medium', 'Kiswahili daily', 'French weekly', 'Storytelling & phonics'],
    icon: Languages,
    accent: 'from-purple/10 via-white to-yellow/40',
  },
];

export default function Curriculum() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple/10 via-white to-yellow/35 px-6 py-20 md:px-12 md:py-28">
        <div className="absolute -right-16 top-10 h-48 w-48 rounded-full border-[26px] border-purple/10" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-yellow/25" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
            Curriculum
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy md:text-6xl">
            A rich, joyful program for every age.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
            We follow the Montessori method, enriched with music, art, and languages, and shaped by the warmth and
            creativity of our Nairobi community.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.title}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-purple/40 hover:shadow-md"
            >
              <div className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${program.accent}`}>
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-navy text-yellow shadow-lg">
                  <program.icon className="h-11 w-11" />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-navy">{program.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{program.text}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {program.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

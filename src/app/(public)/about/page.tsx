import type { Metadata } from 'next';
import { Activity, BookOpen, Globe2, HeartHandshake, Languages, Sparkles, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About - Pink Tower International School',
  description:
    'Learn about Pink Tower International School, our Montessori philosophy, whole-child P.I.L.E.S framework, and director message.',
  openGraph: {
    title: 'About Pink Tower International School',
    description: 'Whole-child Montessori education in Lavington, Nairobi.',
  },
};

const piles = [
  {
    letter: 'P',
    title: 'Physical',
    text: 'Purposeful movement, outdoor play, and practical life activities that build strong, capable bodies.',
    icon: Activity,
  },
  {
    letter: 'I',
    title: 'Intellectual',
    text: 'Hands-on discovery that develops curiosity, concentration, problem solving, and a love of learning.',
    icon: BookOpen,
  },
  {
    letter: 'L',
    title: 'Linguistic',
    text: 'Rich language experiences in English, Kiswahili, and French that help children express their ideas clearly.',
    icon: Languages,
  },
  {
    letter: 'E',
    title: 'Emotional',
    text: 'Gentle guidance that nurtures self-regulation, confidence, empathy, and inner security.',
    icon: HeartHandshake,
  },
  {
    letter: 'S',
    title: 'Social',
    text: 'Mixed-age communities where children learn kindness, collaboration, leadership, and respect.',
    icon: Users,
  },
];

export default function About() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow/35 via-white to-purple/10 px-6 py-20 md:px-12 md:py-28">
        <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full border-[28px] border-yellow/25 md:left-auto md:right-16 md:top-14" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
            <Sparkles className="h-4 w-4" />
            About Pink Tower
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy md:text-6xl">
            Raising joyful, capable, world-ready children.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
            Pink Tower International School was founded on a simple belief: children flourish when they are trusted,
            loved, and given the tools to discover the world for themselves.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-purple">Our Philosophy</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              A prepared environment for every child&apos;s unfolding.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-gray-700">
              <p>
                Inspired by Dr. Maria Montessori&apos;s pioneering work, we create calm, beautiful classrooms where
                children choose meaningful work, build deep concentration, and grow at a pace that respects who they
                are.
              </p>
              <p>
                Our Lavington community welcomes children from 18 months to 12 years, combining international best
                practice with a deep love for our Kenyan home.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-purple/10 bg-purple/5 p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow text-navy">
                <Globe2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy">Whole-child growth</h3>
                <p className="text-gray-600">Five domains, one connected learner.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {piles.map((item) => (
                <div key={item.letter} className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-navy bg-yellow font-bold text-navy">
                    {item.letter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-bold text-navy">
                      <item.icon className="h-4 w-4 text-purple" />
                      {item.title}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-16 text-white md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[18rem_1fr] lg:items-center">
          <div className="mx-auto w-full max-w-72 rounded-lg border-4 border-yellow bg-white p-3 shadow-xl">
            <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-md bg-gradient-to-br from-purple/15 via-yellow/30 to-white text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy text-4xl font-bold text-yellow">
                PT
              </div>
              <p className="mt-5 px-6 text-sm font-bold uppercase tracking-wide text-navy">Director&apos;s Office</p>
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-yellow px-4 py-2 text-sm font-bold uppercase tracking-wide text-navy">
              From the Director
            </span>
            <blockquote className="mt-6 max-w-3xl text-2xl font-bold leading-snug md:text-4xl">
              &quot;Every child who walks through our gates carries a spark. Our work is to protect it, feed it, and
              watch it light up the world.&quot;
            </blockquote>
            <p className="mt-5 font-bold text-yellow">Mrs. Wanjiku Mwangi, Founding Director</p>
          </div>
        </div>
      </section>
    </div>
  );
}

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
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    letter: 'I',
    title: 'Intellectual',
    text: 'Hands-on discovery that develops curiosity, concentration, problem solving, and a love of learning.',
    icon: BookOpen,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    letter: 'L',
    title: 'Linguistic',
    text: 'Rich language experiences in English, Kiswahili, and French that help children express their ideas clearly.',
    icon: Languages,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    letter: 'E',
    title: 'Emotional',
    text: 'Gentle guidance that nurtures self-regulation, confidence, empathy, and inner security.',
    icon: HeartHandshake,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    letter: 'S',
    title: 'Social',
    text: 'Mixed-age communities where children learn kindness, collaboration, leadership, and respect.',
    icon: Users,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export default function About() {
  return (
    <div className="bg-[#FAFAFA] font-sans pb-10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-16 md:px-12 md:py-32">
        {/* Playful Background Elements */}
        <div className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full border-[32px] border-yellow/20 md:left-auto md:right-16 md:top-14" />
        <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-purple/5 blur-2xl" />
        
        <div className="relative mx-auto max-w-5xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
            <Sparkles className="h-4 w-4 text-yellow" />
            About Pink Tower
          </span>
          <h1 className="mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl">
            Raising joyful, capable, <br className="hidden md:block" />
            <span className="text-purple">world-ready</span> children.
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            Pink Tower International School was founded on a simple belief: children flourish when they are trusted,
            loved, and given the tools to discover the world for themselves.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl shadow-indigo-900/10 border-8 border-white transform -rotate-2 transition-transform duration-500 hover:rotate-0">
               {/* Placeholder for an actual image, styled richly */}
               <div className="aspect-[4/3] bg-gradient-to-tr from-purple/10 to-yellow/20 flex flex-col items-center justify-center text-center p-8">
                  <Globe2 className="h-20 w-20 text-purple/30 mb-4" />
                  <p className="text-2xl font-heading font-extrabold text-navy/40">Lavington Campus</p>
               </div>
            </div>
            {/* Decorative blob behind image */}
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-yellow -z-10" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-purple -z-10 opacity-10" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-extrabold uppercase tracking-widest text-purple mb-4">Our Philosophy</p>
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
              A prepared environment for every child&apos;s unfolding.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                We create calm, beautiful classrooms where
                children choose meaningful work, build deep concentration, and grow at a pace that respects who they
                are.
              </p>
              <p>
                Our Lavington community welcomes children from 18 months to 12 years, combining international best
                practice with a deep love for our Kenyan home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILES Section */}
      <section className="bg-cream/50 px-6 py-16 md:px-12 md:py-24 rounded-3xl mx-4 md:mx-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
                Whole-Child Growth
             </h2>
             <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
                Five domains, one connected learner. We focus on the holistic development of every child through our P.I.L.E.S framework.
             </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {piles.map((item) => (
              <div 
                key={item.letter} 
                className="flex-1 min-w-[280px] max-w-[380px] group relative rounded-3xl bg-white p-8 shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10"
              >
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="absolute top-8 right-8 text-6xl font-heading font-black text-slate-50 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                  {item.letter}
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-navy group-hover:text-purple transition-colors">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[20rem_1fr] lg:items-center">
          <div className="mx-auto w-full max-w-sm rounded-3xl border-8 border-yellow bg-white p-2 shadow-2xl shadow-indigo-900/10 transform rotate-3 transition-transform duration-500 hover:rotate-0">
            <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-purple/10 via-yellow/20 to-white text-center p-8">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-navy text-5xl font-heading font-black text-yellow shadow-inner">
                PT
              </div>
              <p className="mt-8 text-sm font-extrabold uppercase tracking-widest text-navy">Director&apos;s Office</p>
            </div>
          </div>

          <div className="relative">
            <span className="inline-flex rounded-full bg-yellow px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-navy shadow-sm">
              From the Director
            </span>
            <blockquote className="mt-8 max-w-3xl text-2xl md:text-4xl font-heading font-extrabold leading-tight text-navy relative">
              <span className="absolute -left-8 -top-6 text-6xl text-yellow/50">&quot;</span>
              Every child who walks through our gates carries a spark. Our work is to protect it, feed it, and
              watch it light up the world.
              <span className="absolute -bottom-10 ml-2 text-6xl text-yellow/50">&quot;</span>
            </blockquote>
            <p className="mt-10 text-lg font-extrabold text-purple">
            Phyllis W. Mburu
            <span className="text-slate-300 font-normal mx-2">|</span> <span className="text-slate-500 font-medium">Founding Director</span>
            </p>
          </div>
        </div>
      </section>
      
      CTA Section
      <section className="px-6 pb-20 md:px-12 md:pb-24">
         <div className="mx-auto max-w-5xl rounded-3xl bg-navy px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-purple blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 rounded-full" />
            <h2 className="relative z-10 text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white">
               Ready to spark your child&apos;s journey?
            </h2>
            <p className="relative z-10 mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
               Join our community of joyful learners and see the world through their eyes.
            </p>
            <div className="relative z-10 mt-10">
               <button className="rounded-full bg-yellow px-8 py-4 text-lg font-extrabold text-navy shadow-xl shadow-yellow/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow/40 active:scale-95">
                  Book a Campus Tour
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}

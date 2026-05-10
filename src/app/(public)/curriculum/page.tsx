import type { Metadata } from 'next';
import { CheckCircle2, Languages, Music2, Paintbrush, Sprout, Sparkles } from 'lucide-react';

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
    accent: 'bg-gradient-to-br from-green-100 to-emerald-50',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
    borderColor: 'group-hover:border-emerald-300',
  },
  {
    title: 'Music - Piano & Violin',
    text: 'Weekly small-group lessons that build pitch, rhythm, discipline, and joy.',
    bullets: ['Piano from age 3', 'Violin from age 4', 'Termly recitals', 'Choir & rhythm circles'],
    icon: Music2,
    accent: 'bg-gradient-to-br from-purple/10 to-fuchsia-50',
    iconColor: 'text-purple',
    iconBg: 'bg-purple/10',
    borderColor: 'group-hover:border-purple/30',
  },
  {
    title: 'Art & Maker Studio',
    text: 'An open studio where children paint, sculpt, build, and tell stories with their hands.',
    bullets: ['Watercolour & clay', 'Recycled materials', 'Cultural art weeks', 'Annual exhibition'],
    icon: Paintbrush,
    accent: 'bg-gradient-to-br from-yellow/20 to-orange-50',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
    borderColor: 'group-hover:border-amber-300',
  },
  {
    title: 'Languages',
    text: 'A trilingual environment so children grow comfortable across cultures.',
    bullets: ['English medium', 'Kiswahili daily', 'French weekly', 'Storytelling & phonics'],
    icon: Languages,
    accent: 'bg-gradient-to-br from-blue-100 to-sky-50',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    borderColor: 'group-hover:border-blue-300',
  },
];

export default function Curriculum() {
  return (
    <div className="bg-[#FAFAFA] font-sans pb-10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-16 md:px-12 md:py-32">
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full border-[32px] border-yellow/20" />
        <div className="absolute -bottom-20 left-8 h-72 w-72 rounded-full bg-purple/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
            <Sparkles className="h-4 w-4 text-yellow" />
            Our Curriculum
          </span>
          <h1 className="mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl">
            A rich, joyful program for <br className="hidden md:block" />
            <span className="text-purple">every age.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            We follow the Montessori method, enriched with music, art, and languages, and shaped by the warmth and
            creativity of our Nairobi community.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.title}
              className={`group relative overflow-hidden rounded-3xl bg-white p-8 md:p-10 shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 border-2 border-transparent ${program.borderColor}`}
            >
              <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${program.iconBg} blur-3xl opacity-50 transition-opacity group-hover:opacity-100`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl ${program.accent} shadow-inner`}>
                  <program.icon className={`h-10 w-10 ${program.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`} />
                </div>
                
                <h2 className="text-3xl font-heading font-extrabold text-navy group-hover:text-purple transition-colors">
                  {program.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600 flex-grow">
                  {program.text}
                </p>
                
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {program.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base font-medium text-slate-700">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple/10">
                        <CheckCircle2 className="h-4 w-4 text-purple" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Philosophy Callout / Extra Section */}
      <section className="px-6 py-16 md:px-12 md:py-24">
         <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-purple to-indigo-900 px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-purple/20 relative overflow-hidden transform -rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="absolute -top-20 -left-20 h-64 w-64 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 h-40 w-40 bg-yellow/20 blur-2xl rounded-full translate-y-1/2" />
            
            <h2 className="relative z-10 text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white">
               Discover the Montessori Difference
            </h2>
            <p className="relative z-10 mt-6 text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
               Our classrooms are beautiful, prepared environments where children learn at their own pace, following their natural curiosity.
            </p>
            <div className="relative z-10 mt-10">
               <button className="rounded-full bg-yellow px-8 py-4 text-lg font-extrabold text-navy shadow-xl shadow-yellow/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow/40 active:scale-95">
                  View Our Classrooms
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}

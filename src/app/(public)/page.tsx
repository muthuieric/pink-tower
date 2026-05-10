import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ClipboardList,
  Coffee,
  Compass,
  Globe,
  GraduationCap,
  Heart,
  Phone,
  Quote,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pink Tower International School - Best Montessori School in Lavington, Nairobi",
  description:
    "Future-ready Montessori education in Lavington, Nairobi. Admissions open for 2025. Book a tour of Pink Tower International School today.",
  openGraph: {
    title: "Pink Tower International School - Lavington, Nairobi",
    description: "Whole-child Montessori education. Admissions Open 2025.",
  },
};

const heroImage =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=85&w=1600";
const earlyImage =
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=85&w=1200";
const musicImage =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1200";

const pillars = [
  {
    icon: Heart,
    title: "Whole-Child Development",
    text: "Head, heart and hands - academic, social, emotional and physical growth in balance.",
  },
  {
    icon: Sparkles,
    title: "Passionate Educators",
    text: "AMI-aligned Montessori guides who truly know each child.",
  },
  {
    icon: Globe,
    title: "International Curriculum",
    text: "A globally minded program rooted in African identity.",
  },
  {
    icon: Compass,
    title: "Inquiry-Based Learning",
    text: "Children lead their discoveries; we frame the wonder.",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    text: "Families, teachers and children growing together.",
  },
  {
    icon: Building2,
    title: "Modern Facilities",
    text: "Bright, beautiful prepared environments across two campuses.",
  },
];

const admissionsSteps = [
  { icon: CalendarCheck, title: "Book a tour", text: "Visit our Lavington campus on Tuesdays or Thursdays." },
  { icon: Coffee, title: "Family meeting", text: "Sit down with our director to share your child's story." },
  { icon: ClipboardList, title: "Application", text: "Submit a short application and supporting documents." },
  { icon: Sparkles, title: "Welcome day", text: "Your child joins their new community with a gentle settle-in." },
];

const testimonials = [
  {
    quote:
      "Our daughter walks into school singing every morning. The guides truly see her - her curiosity, her quirks, her courage.",
    name: "Achieng' & Daniel",
    role: "Parents, Primary",
  },
  {
    quote:
      "The Pink Tower community feels like a village. Music, French, gardening - and confident, kind children.",
    name: "Priya M.",
    role: "Parent, Toddler",
  },
  {
    quote:
      "We chose Pink Tower for the Montessori rigor and stayed for the warmth. Best decision we've made for our boys.",
    name: "James & Wairimu",
    role: "Parents, Lower Elementary",
  },
];

const faqs = [
  {
    q: "What ages do you accept?",
    a: "We welcome children from 18 months through 12 years across our Toddler, Primary, and Lower Elementary programs.",
  },
  {
    q: "Is Pink Tower a true Montessori school?",
    a: "Yes. Our guides are AMI-aligned and our prepared environments use authentic Montessori materials, with mixed-age communities and uninterrupted work cycles.",
  },
  {
    q: "Where are you located?",
    a: "Both campuses are in Lavington, Nairobi: Mzima Springs Campus and Convent Road Campus.",
  },
  {
    q: "What does a typical day look like?",
    a: "Mornings begin with a focused work cycle, followed by outdoor play, lunch, music or language, and afternoon learning for older children.",
  },
  {
    q: "Do you offer transport and lunch?",
    a: "Yes - fresh, nutritious lunches are prepared daily on-site, and we partner with vetted transport providers across Nairobi.",
  },
  {
    q: "How do I apply?",
    a: "Start by booking a tour through our contact page. After a family meeting, we'll guide you through a short application and welcome day.",
  },
];

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-transparent bg-yellow px-8 py-4 font-extrabold text-navy shadow-xl shadow-yellow/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow/40 active:scale-95"
    >
      {children}
    </Link>
  );
}

function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border-2 border-navy/20 px-8 py-4 font-extrabold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 active:scale-95"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] font-sans pb-24 lg:pb-0 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-16 md:px-12 md:py-32">
        <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full border-[32px] border-yellow/20 md:left-auto md:right-16 md:top-14" />
        <div className="absolute -bottom-20 left-8 h-80 w-80 rounded-full bg-purple/5 blur-3xl" />
        
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
              <Star className="h-4 w-4 fill-yellow text-yellow" />
              Admissions Open - 2026
            </span>
            <h1 className="mt-8 text-4xl font-heading font-extrabold tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-7xl">
              Where curious minds become <span className="text-purple relative inline-block">
                future-ready
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> humans.
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-slate-600">
              Pink Tower International School is a joyful Montessori community in Lavington, Nairobi - nurturing
              children aged 18 months to 12 years through inquiry, music, art and the natural world.
            </p>
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <PrimaryLink href="/contact">
                Book a Tour <ArrowRight className="h-5 w-5" />
              </PrimaryLink>
              <OutlineLink href="/curriculum">Explore Curriculum</OutlineLink>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6 text-sm font-medium text-slate-600">
              <div>
                <div className="text-3xl font-heading font-black text-navy mb-1">1</div>
                Campuse in Lavington
              </div>
              <div>
                <div className="text-3xl font-heading font-black text-navy mb-1">15+</div>
                Years of joy
              </div>
              <div>
                <div className="text-3xl font-heading font-black text-navy mb-1">6:1</div>
                Child-guide ratio
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-3xl border-8 border-white bg-white shadow-2xl shadow-indigo-900/20 transform rotate-2 transition-transform duration-500 hover:rotate-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt="Joyful Montessori children at Pink Tower International School"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 z-20 hidden w-64 flex-col rounded-3xl border-4 border-yellow bg-white p-6 shadow-xl transform -rotate-3 md:flex">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple mb-2">Now enrolling</span>
              <span className="font-heading text-lg font-black text-navy leading-tight">Toddler · Primary · Lower Elementary</span>
            </div>
            <div className="absolute -right-10 top-1/4 h-32 w-32 rounded-full bg-yellow/40 blur-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl text-center md:text-left">
            <span className="inline-flex rounded-full border-2 border-purple/10 bg-purple/5 px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple">
              Our Approach
            </span>
            <h2 className="mt-6 text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">The 6 Pillars of Development</h2>
            <p className="mt-4 text-lg text-slate-600">Everything we do is anchored in six commitments to the child.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="group flex flex-col h-full rounded-3xl bg-white p-8 shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 border-2 border-transparent hover:border-purple/10"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-6 shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3 ${
                    index % 2 === 0 ? "bg-gradient-to-br from-purple/20 to-purple/5 text-purple" : "bg-gradient-to-br from-yellow/30 to-yellow/10 text-amber-600"
                  }`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-navy group-hover:text-purple transition-colors">{title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Montessori Section */}
      <section className="bg-gradient-to-br from-purple/5 via-white to-yellow/10 px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-3xl border-8 border-white bg-white shadow-2xl shadow-indigo-900/10 transform -rotate-2 transition-transform duration-500 hover:rotate-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={earlyImage}
                alt="Children with Montessori sensorial materials"
                className="aspect-[4/5] w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple/20 blur-3xl -z-10" />
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="inline-flex rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
              Montessori, reimagined
            </span>
            <h2 className="mt-6 text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
              A prepared environment for every age and stage.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              From the iconic Pink Tower itself to inquiry-driven elementary projects, our classrooms invite
              independence, concentration and joy. Children move freely, choose meaningful work, and learn alongside
              friends of mixed ages.
            </p>
            <ul className="mt-8 space-y-4 text-lg font-medium text-slate-700 text-left mx-auto max-w-md lg:mx-0">
              {[
                "AMI-aligned guides and assistants",
                "Music with piano & violin from age 3",
                "Outdoor learning daily",
                "French & Kiswahili woven through the day",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple/20">
                     <span className="h-2 w-2 rounded-full bg-purple" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
               <OutlineLink href="/about">Read our philosophy</OutlineLink>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Programs */}
      <section className="px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
            <div>
              <span className="inline-flex rounded-full border-2 border-purple/10 bg-purple/5 px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple">
                Signature Programs
              </span>
              <h2 className="mt-6 text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
                Music, Art & Languages - <br className="hidden lg:block"/> every single week.
              </h2>
            </div>
            <OutlineLink href="/curriculum">See all programs</OutlineLink>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Music - Piano & Violin",
                text: "Weekly small-group lessons with our resident music guides.",
                image: musicImage,
                alt: "Child learning piano",
                rotation: "rotate-1",
              },
              {
                title: "Early Years",
                text: "A nurturing toddler community to spark independence and language.",
                image: earlyImage,
                alt: "Early years materials",
                rotation: "-rotate-1",
              },
            ].map((program) => (
              <article
                key={program.title}
                className={`group overflow-hidden rounded-3xl border-4 border-transparent bg-white shadow-xl shadow-indigo-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 hover:border-purple/20 transform ${program.rotation} hover:rotate-0`}
              >
                <div className="aspect-[16/9] overflow-hidden">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={program.image} alt={program.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-3xl font-heading font-extrabold text-navy group-hover:text-purple transition-colors">{program.title}</h3>
                  <p className="mt-4 text-lg text-slate-600 leading-relaxed">{program.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream/50 px-6 py-20 md:px-12 md:py-24 rounded-[3rem] mx-4 md:mx-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
              Loved by families
            </span>
            <h2 className="mt-6 text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">Words from our parents.</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="relative flex flex-col h-full rounded-3xl bg-white p-10 shadow-xl shadow-indigo-900/5 transition-transform hover:-translate-y-1">
                <Quote className="absolute -top-6 left-10 h-12 w-12 rounded-2xl bg-yellow p-3 text-navy shadow-lg" />
                <div className="mt-4 flex gap-1 text-yellow">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-slate-700 flex-grow">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 pt-6 border-t border-slate-100">
                  <div className="font-heading text-xl font-extrabold text-navy">{item.name}</div>
                  <div className="text-sm font-medium text-purple mt-1">{item.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Steps */}
      <section className="px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border-2 border-purple/10 bg-purple/5 px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple">
              Admissions
            </span>
            <h2 className="mt-6 text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">Four simple steps to join.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We keep enrollment human. No pressure - just a conversation, a visit, and a warm welcome.
            </p>
          </div>

          <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {admissionsSteps.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                className="group relative flex flex-col h-full rounded-3xl bg-white p-8 shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 border-2 border-transparent hover:border-purple/20"
              >
                <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow font-heading text-xl font-black text-navy shadow-lg">
                  {index + 1}
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/10 text-purple mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-navy">{title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 flex justify-center">
            <PrimaryLink href="/contact">
              Start your application <ArrowRight className="h-5 w-5 ml-2" />
            </PrimaryLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-20 md:px-12 md:py-24 rounded-[3rem] mx-4 md:mx-12 mb-12">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.5fr] items-start">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
              FAQ
            </span>
            <h2 className="mt-6 text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">Questions families ask us most.</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Don&apos;t see yours? We&apos;d love to chat - reach out any time and our admissions team will get back
              within a day.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-purple/10 bg-white p-4 shadow-xl shadow-indigo-900/5">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-slate-100 py-6 px-6 last:border-b-0">
                <summary className="cursor-pointer list-none font-heading text-xl font-extrabold text-navy focus:outline-none">
                  <span className="flex items-center justify-between gap-6">
                    {faq.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-lg leading-relaxed text-slate-600 pr-10">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-32 md:px-12 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-navy p-12 text-center md:p-20 shadow-2xl shadow-indigo-900/20">
            <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-purple blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-4xl font-heading font-extrabold tracking-tight text-white md:text-6xl">Come see us in Lavington.</h2>
              <p className="mt-6 text-xl text-white/80 leading-relaxed">
                Tours run Tuesdays & Thursdays. Meet our guides, see the classrooms, and ask anything.
              </p>
              <div className="mt-10">
                <PrimaryLink href="/contact">Book a Tour</PrimaryLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-white via-white/95 to-transparent px-4 pb-6 pt-10 lg:hidden pointer-events-none">
        <div className="grid grid-cols-2 gap-3 pointer-events-auto max-w-sm mx-auto">
          <a
            href="tel:+254700000001"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-purple font-extrabold text-white shadow-xl shadow-purple/30 active:scale-95 transition-transform"
          >
            <Phone className="h-5 w-5" />
            Call Us
          </a>
          <Link
            href="/contact"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-yellow font-extrabold text-navy shadow-xl shadow-yellow/30 active:scale-95 transition-transform"
          >
            <GraduationCap className="h-5 w-5" />
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}

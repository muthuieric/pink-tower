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
      className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-navy bg-yellow px-6 py-3 font-bold text-navy shadow-[5px_5px_0_0_var(--purple)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--purple)]"
    >
      {children}
    </Link>
  );
}

function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg border-2 border-navy px-6 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <div className="bg-white pb-20 lg:pb-0">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow/35 via-white to-purple/10 px-6 py-16 md:px-12 md:py-24">
        <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full border-[28px] border-yellow/25 md:left-auto md:right-16 md:top-14" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-purple/10" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
              <Star className="h-4 w-4 fill-current" />
              Admissions Open - 2025
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy sm:text-5xl md:text-6xl">
              Where curious minds become <span className="text-purple">future-ready</span> humans.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-700">
              Pink Tower International School is a joyful Montessori community in Lavington, Nairobi - nurturing
              children aged 18 months to 12 years through inquiry, music, art and the natural world.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryLink href="/contact">
                Book a Tour <ArrowRight className="h-5 w-5" />
              </PrimaryLink>
              <OutlineLink href="/curriculum">Explore Curriculum</OutlineLink>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="text-2xl font-extrabold text-navy">2</div>
                Campuses in Lavington
              </div>
              <div>
                <div className="text-2xl font-extrabold text-navy">15+</div>
                Years of joy
              </div>
              <div>
                <div className="text-2xl font-extrabold text-navy">6:1</div>
                Child-guide ratio
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border-4 border-navy bg-white p-3 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt="Joyful Montessori children at Pink Tower International School"
                className="aspect-[4/3] w-full rounded-md object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden w-56 flex-col rounded-lg border-4 border-yellow bg-white p-4 shadow-xl md:flex">
              <span className="text-xs font-bold uppercase tracking-wide text-purple">Now enrolling</span>
              <span className="font-display font-extrabold text-navy">Toddler · Primary · Lower Elementary</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-purple/20 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
              Our Approach
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">The 6 Pillars of Development</h2>
            <p className="mt-3 text-gray-600">Everything we do is anchored in six commitments to the child.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple/40 hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    index % 2 ? "bg-purple text-white" : "bg-yellow text-navy"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple/10 via-white to-yellow/35 px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border-4 border-navy bg-white p-3 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={earlyImage}
              alt="Children with Montessori sensorial materials"
              className="aspect-[4/5] w-full rounded-md object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="inline-flex rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
              Montessori, reimagined
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
              A prepared environment for every age and stage.
            </h2>
            <p className="mt-4 leading-8 text-gray-700">
              From the iconic Pink Tower itself to inquiry-driven elementary projects, our classrooms invite
              independence, concentration and joy. Children move freely, choose meaningful work, and learn alongside
              friends of mixed ages.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              {[
                "AMI-aligned guides and assistants",
                "Music with piano & violin from age 3",
                "Outdoor learning daily",
                "French & Kiswahili woven through the day",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-purple" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-7 inline-flex rounded-lg bg-purple px-6 py-3 font-bold text-white transition hover:bg-navy"
            >
              Read our philosophy
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-purple/20 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
                Signature Programs
              </span>
              <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
                Music, Art & Languages - every single week.
              </h2>
            </div>
            <OutlineLink href="/curriculum">See all programs</OutlineLink>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Music - Piano & Violin",
                text: "Weekly small-group lessons with our resident music guides.",
                image: musicImage,
                alt: "Child learning piano",
              },
              {
                title: "Early Years",
                text: "A nurturing toddler community to spark independence and language.",
                image: earlyImage,
                alt: "Early years materials",
              },
            ].map((program) => (
              <article
                key={program.title}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-purple/40 hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={program.image} alt={program.alt} className="h-64 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-navy">{program.title}</h3>
                  <p className="mt-2 text-gray-600">{program.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
              Loved by families
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Words from our parents.</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="relative h-full rounded-lg border border-gray-200 bg-white p-7 shadow-sm">
                <Quote className="absolute -top-4 left-6 h-8 w-8 rounded-full border-2 border-navy bg-yellow p-1.5 text-navy" />
                <div className="flex gap-0.5 text-yellow">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 leading-7 text-gray-700">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-5">
                  <div className="font-display font-bold text-navy">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-purple/20 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
              Admissions
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Four simple steps to join.</h2>
            <p className="mt-3 text-gray-600">
              We keep enrollment human. No pressure - just a conversation, a visit, and a warm welcome.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {admissionsSteps.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                className="relative h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple/40 hover:shadow-md"
              >
                <div className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy bg-yellow font-display font-extrabold text-navy">
                  {index + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple/10 text-purple">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-gray-600">{text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex justify-center">
            <PrimaryLink href="/contact">
              Start your application <ArrowRight className="h-5 w-5" />
            </PrimaryLink>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-cream via-cream to-purple/10 px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="inline-flex rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Questions families ask us most.</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Don&apos;t see yours? We&apos;d love to chat - reach out any time and our admissions team will get back
              within a day.
            </p>
          </div>

          <div className="rounded-lg border border-purple/10 bg-white px-5 shadow-sm">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-gray-200 py-4 last:border-b-0">
                <summary className="cursor-pointer list-none font-display font-bold text-navy">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-purple transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 leading-7 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-lg bg-navy p-10 text-white md:p-14">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-yellow/30 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-purple/40 blur-2xl" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1.5fr_auto]">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">Come see us in Lavington.</h2>
                <p className="mt-3 max-w-xl text-white/80">
                  Tours run Tuesdays & Thursdays. Meet our guides, see the classrooms, and ask anything.
                </p>
              </div>
              <PrimaryLink href="/contact">Book a Tour</PrimaryLink>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-white via-white/95 to-transparent px-3 pb-3 pt-2 lg:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:+254700000001"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-purple font-bold text-white shadow-lg"
          >
            <Phone className="h-5 w-5" />
            Call Us
          </a>
          <Link
            href="/contact"
            className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-navy bg-yellow font-bold text-navy shadow-lg"
          >
            <GraduationCap className="h-5 w-5" />
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}

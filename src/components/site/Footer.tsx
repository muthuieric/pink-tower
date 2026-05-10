import Link from "next/link";
import { ArrowRight, Camera, Mail, MapPin, MessageCircle, Phone, Users } from "lucide-react";

const whatsappTourUrl = "https://wa.me/254707480825";

const exploreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/journal", label: "The Journal" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 overflow-hidden rounded-t-[2.5rem] bg-navy text-white shadow-2xl shadow-indigo-900/20">
      <div className="container-page py-14 md:py-20">
        <div className="mb-12 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-yellow">Admissions are open</p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Meet the school in person.
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/75">
              Ask admissions questions, compare campuses, and plan a warm first visit for your child.
            </p>
          </div>
          <a
            href={whatsappTourUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-4 text-base font-extrabold text-navy shadow-xl shadow-yellow/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow/30 active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
            Book a Tour
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-14 w-14 rotate-[-4deg] items-center justify-center rounded-2xl border-4 border-yellow bg-white text-base font-extrabold text-navy shadow-xl shadow-black/10">
                PT
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight">Pink Tower</h3>
                <p className="text-xs font-extrabold tracking-widest text-yellow">INTERNATIONAL SCHOOL</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              A future-ready Montessori community in Lavington, Nairobi - nurturing curious, confident, kind children.
            </p>
          </div>

        <div>
          <h4 className="mb-4 font-display font-extrabold text-yellow">Explore</h4>
          <ul className="space-y-2 text-sm">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full px-1 font-bold text-white/80 transition-all duration-300 hover:translate-x-1 hover:text-yellow"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display font-extrabold text-yellow">Campuses</h4>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>Mzima Springs Road, Lavington</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>+254 700 000 001</span>
            </li>
            <li className="mt-4 flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>Convent Road, Lavington</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>+254 700 000 002</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display font-extrabold text-yellow">Connect</h4>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <span>hello@pinktower.ac.ke</span>
            </li>
            <li className="flex gap-2">
              <Camera className="mt-0.5 size-4 shrink-0" />
              <span>@pinktowerschool</span>
            </li>
            <li className="flex gap-2">
              <Users className="mt-0.5 size-4 shrink-0" />
              <span>Pink Tower International</span>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:border-yellow hover:text-yellow active:scale-95"
          >
            Visit Contact Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-wrap justify-between gap-3 py-5 text-xs font-bold text-white/60">
          <span>© {new Date().getFullYear()} Pink Tower International School. All rights reserved.</span>
          <span>Best Montessori School in Lavington, Nairobi.</span>
        </div>
      </div>
    </footer>
  );
}

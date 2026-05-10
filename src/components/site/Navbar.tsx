"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

const whatsappTourUrl = "https://wa.me/254707480825";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-purple/10 bg-cream/85 shadow-lg shadow-indigo-900/5 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-4 md:h-24">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="Pink Tower International School home"
        >
          <span className="flex h-12 w-12 shrink-0 rotate-[-4deg] items-center justify-center rounded-2xl border-4 border-yellow bg-navy text-base font-extrabold text-yellow shadow-xl shadow-indigo-900/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-0 md:h-14 md:w-14">
            PT
          </span>
          <span className="min-w-0 font-display text-lg font-extrabold leading-tight tracking-tight text-navy md:text-xl">
            Pink Tower
            <span className="block truncate text-[0.62rem] font-extrabold tracking-widest text-purple md:text-xs">
              INTERNATIONAL SCHOOL
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-purple/10 bg-white/85 p-1.5 shadow-xl shadow-indigo-900/5 lg:flex"
          aria-label="Main navigation"
        >
          {nav.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-extrabold transition-all duration-300 ${
                  active
                    ? "bg-yellow text-navy shadow-md shadow-yellow/30"
                    : "text-navy/75 hover:-translate-y-0.5 hover:bg-purple/5 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={whatsappTourUrl}
          target="_blank"
          rel="noreferrer"
          className="group hidden items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-extrabold text-white shadow-xl shadow-indigo-900/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/20 active:scale-95 lg:inline-flex"
        >
          <Sparkles className="h-4 w-4 text-yellow" />
          Book a Tour
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <button
          type="button"
          className="rounded-full border border-purple/10 bg-white p-3 text-navy shadow-lg shadow-indigo-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow/40 active:scale-95 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-purple/10 bg-cream/95 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-extrabold transition-all duration-300 ${
                    active
                      ? "bg-yellow text-navy shadow-md shadow-yellow/20"
                      : "bg-white/75 text-navy/75 hover:bg-purple/5 hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={whatsappTourUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-4 text-center font-extrabold text-white shadow-xl shadow-indigo-900/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-yellow" />
              Book a Tour
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

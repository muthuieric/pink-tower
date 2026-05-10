"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-sm font-extrabold text-yellow md:h-12 md:w-12 md:text-base">
            PT
          </span>
          <span className="font-display text-base font-extrabold leading-tight text-navy md:text-lg">
            Pink Tower
            <span className="block text-[0.65rem] font-bold tracking-widest text-purple">INTERNATIONAL SCHOOL</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${
                  active ? "bg-yellow font-bold text-navy" : "font-semibold text-navy hover:bg-yellow/40"
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
          className="hidden rounded-lg bg-yellow px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-yellow/85 lg:inline-flex"
        >
          Book a Tour
        </a>

        <button
          type="button"
          className="rounded-full p-2 text-navy transition hover:bg-yellow/40 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 transition-colors ${
                    active ? "bg-yellow font-bold text-navy" : "font-semibold text-navy hover:bg-yellow/40"
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
              className="mt-2 rounded-lg bg-yellow px-5 py-3 text-center font-bold text-navy transition hover:bg-yellow/85"
            >
              Book a Tour
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

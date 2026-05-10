import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-extrabold">Pink Tower</h3>
          <p className="mb-4 text-xs font-bold tracking-widest text-yellow">INTERNATIONAL SCHOOL</p>
          <p className="text-sm leading-relaxed text-white/80">
            A future-ready Montessori community in Lavington, Nairobi - nurturing curious, confident, kind children.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display font-bold text-yellow">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-yellow">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/curriculum" className="hover:text-yellow">
                Curriculum
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-yellow">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-yellow">
                Events
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-yellow">
                The Journal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display font-bold text-yellow">Mzima Springs Campus</h4>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>Mzima Springs Road, Lavington, Nairobi</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>+254 700 000 001</span>
            </li>
          </ul>

          <h4 className="mb-3 mt-5 font-display font-bold text-yellow">Convent Road Campus</h4>
          <ul className="space-y-2 text-sm text-white/85">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>Convent Road, Lavington, Nairobi</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span>+254 700 000 002</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display font-bold text-yellow">Connect</h4>
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
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-wrap justify-between gap-2 py-5 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Pink Tower International School. All rights reserved.</span>
          <span>Best Montessori School in Lavington, Nairobi.</span>
        </div>
      </div>
    </footer>
  );
}

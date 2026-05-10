"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { useState } from "react";

const campuses = [
  {
    name: "Mzima Springs Campus",
    addr: "Mzima Springs Road, Lavington, Nairobi",
    phone: "+254 700 000 001",
    email: "mzima@pinktower.ac.ke",
  },
  {
    name: "Convent Road Campus",
    addr: "Convent Road, Lavington, Nairobi",
    phone: "+254 700 000 002",
    email: "convent@pinktower.ac.ke",
  },
];

const mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Pink%20Tower%20International%20School%2C%2041%2C%20Nairobi%2C%2000100%2C%20KE";

const fields = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone (optional)", type: "tel" },
];

function validate(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (data.name.trim().length < 2) errors.name = "Please share your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Enter a valid email";
  if (data.phone.trim().length > 40) errors.phone = "Phone must be 40 characters or fewer";
  if (data.message.trim().length < 10) errors.message = "Tell us a little more";

  return errors;
}

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const nextErrors = validate(data);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setStatus("Thank you! We'll be in touch shortly.");
    form.reset();
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple/10 via-white to-yellow/35 px-6 py-20 md:px-12 md:py-28">
        <div className="absolute -right-16 top-10 h-48 w-48 rounded-full border-[26px] border-purple/10" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-yellow/25" />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-purple">
            <Sparkles className="h-4 w-4" />
            Contact
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy md:text-6xl">
            Come visit us in Lavington.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
            Two beautiful campuses, one warm community. We can&apos;t wait to meet you.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-purple">Plan Your Visit</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              Choose the campus closest to your family.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Our team will help you find the right starting point, answer admissions questions, and arrange a calm,
              welcoming tour.
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-start gap-4 rounded-lg border border-purple/10 bg-purple/5 p-5 shadow-sm transition hover:border-purple/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow text-navy">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy">Open in Google Maps</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Pink Tower International School, 41, Nairobi, 00100, KE
                </p>
              </div>
            </a>

            <div className="mt-8 grid gap-4">
              {campuses.map((campus) => (
                <article
                  key={campus.name}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-purple/40 hover:shadow-md"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow text-navy">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{campus.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{campus.addr}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm font-medium text-gray-700 sm:grid-cols-2">
                    <a href={`tel:${campus.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-purple">
                      <Phone className="h-4 w-4 text-purple" />
                      {campus.phone}
                    </a>
                    <a href={`mailto:${campus.email}`} className="flex items-center gap-2 hover:text-purple">
                      <Mail className="h-4 w-4 text-purple" />
                      {campus.email}
                    </a>
                    <p className="flex items-center gap-2 sm:col-span-2">
                      <Clock className="h-4 w-4 text-purple" />
                      Mon - Fri · 7:30 AM - 5:00 PM
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-lg border border-purple/10 bg-purple/5 p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow text-navy">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy">Send us a message</h2>
                <p className="text-gray-600">We typically respond within one school day.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="mb-1 block text-sm font-bold text-navy">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-navy outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/15"
                  />
                  {errors[field.name] && <p className="mt-1 text-xs font-bold text-destructive">{errors[field.name]}</p>}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-bold text-navy">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-navy outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/15"
                />
                {errors.message && <p className="mt-1 text-xs font-bold text-destructive">{errors.message}</p>}
              </div>

              {status && (
                <p className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-navy shadow-sm" role="status">
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-navy px-6 py-3 text-base font-bold text-white transition hover:bg-purple"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

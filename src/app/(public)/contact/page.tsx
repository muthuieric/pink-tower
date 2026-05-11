"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone, Sparkles, Send } from "lucide-react";
import { useState } from "react";

const campuses = [
  {
    name: "Pink Tower International",
    addr: "41, Kabaserian, Lavington, Nairobi",
    phone: "+254 707 480825",
    email: "info@pinktowerinternational.com",
  },
];

const mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Pink%20Tower%20International%20School%2C%2041%2C%20Nairobi%2C%2000100%2C%20KE";
const mapEmbedUrl =
  "https://www.google.com/maps?q=Pink%20Tower%20International%20School%2C%20Nairobi&output=embed";

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
    <div className="bg-[#FAFAFA] font-sans pb-10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-purple/5 px-6 py-16 md:px-12 md:py-32">
        {/* Playful Background Elements */}
        <div className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full border-[32px] border-yellow/20 md:left-auto md:right-16 md:top-14" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-purple/5 blur-3xl" />
        
        <div className="relative mx-auto max-w-5xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple/10 bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-widest text-purple shadow-sm">
            <Sparkles className="h-4 w-4 text-yellow" />
            Contact Us
          </span>
          <h1 className="mt-8 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl">
            Come visit us in <br className="hidden md:block" />
            <span className="text-purple">Lavington.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            One warm community. We can&apos;t wait to meet you and your family.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          
          {/* Left Column - Contact Info */}
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-purple mb-4">Plan Your Visit</p>
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-navy md:text-5xl">
              
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Our team will help you find the right starting point, answer admissions questions, and arrange a calm, welcoming tour.
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 flex items-center gap-6 rounded-3xl border-2 border-transparent bg-purple/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple/20 hover:shadow-xl hover:shadow-purple/10"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-purple shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-navy group-hover:text-purple transition-colors">Open in Google Maps</h3>
                <p className="mt-1 text-base font-medium text-slate-600">
                  Pink Tower International School, 41, Nairobi
                </p>
              </div>
            </a>

            <div className="mt-10 grid gap-8">
              {campuses.map((campus) => (
                <article
                  key={campus.name}
                  className="group rounded-3xl bg-white p-8 shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 border-2 border-transparent hover:border-yellow/30"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow/30 to-yellow/10 text-amber-600 shadow-inner group-hover:scale-110 transition-transform">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-extrabold text-navy">{campus.name}</h3>
                      <p className="mt-2 text-base font-medium text-slate-600">{campus.addr}</p>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-4 text-base font-medium text-slate-700 sm:grid-cols-2">
                    <a href={`tel:${campus.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-purple">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple/10">
                        <Phone className="h-4 w-4 text-purple" />
                      </div>
                      {campus.phone}
                    </a>
                    <a href={`mailto:${campus.email}`} className="flex items-center gap-3 transition-colors hover:text-purple">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      {campus.email}
                    </a>
                    <div className="flex items-center gap-3 sm:col-span-2 text-slate-600">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 shrink-0">
                        <Clock className="h-4 w-4 text-emerald-600" />
                      </div>
                      Mon - Fri · 7:30 AM - 5:00 PM
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative mt-12 lg:mt-0">
            {/* Decorative background blob */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-purple/10 to-yellow/10 blur-2xl -z-10" />
            
            <form onSubmit={onSubmit} className="rounded-[2.5rem] border-8 border-white bg-[#FAFAFA] p-8 md:p-12 shadow-2xl shadow-indigo-900/10">
              <div className="mb-10 flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-yellow shadow-inner">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-extrabold text-navy">Send a message</h2>
                  <p className="mt-1 text-lg font-medium text-slate-500">We typically respond within a day.</p>
                </div>
              </div>

              <div className="grid gap-6">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="mb-2 block text-sm font-extrabold uppercase tracking-widest text-navy">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="w-full rounded-2xl border-2 border-transparent bg-white px-5 py-4 text-lg font-medium text-navy placeholder:text-slate-400 shadow-sm outline-none transition-all focus:border-purple/30 focus:ring-4 focus:ring-purple/10"
                      placeholder={`Enter your ${field.name}`}
                    />
                    {errors[field.name] && <p className="mt-2 text-sm font-bold text-rose-500">{errors[field.name]}</p>}
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-extrabold uppercase tracking-widest text-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-2xl border-2 border-transparent bg-white px-5 py-4 text-lg font-medium text-navy placeholder:text-slate-400 shadow-sm outline-none transition-all focus:border-purple/30 focus:ring-4 focus:ring-purple/10 resize-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="mt-2 text-sm font-bold text-rose-500">{errors.message}</p>}
                </div>

                {status && (
                  <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 px-6 py-4 text-center shadow-sm" role="status">
                    <p className="text-lg font-bold text-emerald-700">{status}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-navy px-8 py-5 text-lg font-extrabold text-white shadow-xl shadow-navy/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/40 active:scale-95"
                >
                  Send Message
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-4 text-sm font-extrabold uppercase tracking-widest text-purple">Find Us</p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
              A live map for your visit.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Open the map before you leave, then message us if you would like a team member to guide you to the right gate.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border-8 border-yellow bg-white shadow-2xl shadow-indigo-900/10">
            <iframe
              title="Pink Tower International School map"
              src={mapEmbedUrl}
              className="h-[420px] w-full border-0 md:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}

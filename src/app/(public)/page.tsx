import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ArrowRight, BookOpen, Music, Palette, Globe, Activity, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const latestEvents = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    take: 3,
  });

  const latestPosts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="bg-navy text-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
          <h1 className="text-4xl md:text-6xl font-bold">Empowering the Leaders of Tomorrow</h1>
          <p className="text-xl text-gray-300">Providing an exceptional foundation for your child&apos;s future at Pink Tower International School.</p>
          <div className="flex gap-4 mt-4">
            <Link href="/contact" className="bg-yellow text-navy px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition">
              Apply Now
            </Link>
            <Link href="/curriculum" className="border border-yellow text-yellow px-8 py-3 rounded-md font-bold hover:bg-yellow hover:text-navy transition">
              Discover Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-navy mb-6">Welcome to Pink Tower</h2>
        <p className="text-lg text-gray-700">
          Pink Tower International School is a nurturing environment where children discover their potential. With two distinct campuses in Mzima Springs and Convent Road, we provide a comprehensive approach to early years and primary education.
        </p>
      </section>

      {/* 6-Pillar Feature Grid */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Academic Excellence", icon: BookOpen, desc: "A rigorous curriculum designed to challenge and inspire." },
              { title: "Creative Arts", icon: Palette, desc: "Fostering creativity through comprehensive art programs." },
              { title: "Musical Education", icon: Music, desc: "Discovering rhythm and melody from an early age." },
              { title: "Global Perspective", icon: Globe, desc: "Preparing students for a connected world with diverse languages." },
              { title: "Physical Wellness", icon: Activity, desc: "Promoting health and teamwork through physical activities." },
              { title: "Character Building", icon: Heart, desc: "Instilling values of empathy, integrity, and respect." },
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <pillar.icon className="w-12 h-12 text-purple mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Previews */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-navy">Upcoming Events</h2>
            <Link href="/events" className="text-purple font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {latestEvents.length > 0 ? latestEvents.map(event => (
              <div key={event.id} className="border border-gray-200 p-4 rounded-md">
                <h4 className="font-bold text-lg text-navy">{event.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{event.description}</p>
              </div>
            )) : <p className="text-gray-500">No upcoming events.</p>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-navy">Latest Journal</h2>
            <Link href="/journal" className="text-purple font-medium flex items-center gap-1 hover:underline">
              Read more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {latestPosts.length > 0 ? latestPosts.map(post => (
              <div key={post.id} className="border border-gray-200 p-4 rounded-md">
                <h4 className="font-bold text-lg text-navy">{post.title}</h4>
                <p className="text-sm text-gray-500 mb-2">By {post.author}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
              </div>
            )) : <p className="text-gray-500">No journal posts yet.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

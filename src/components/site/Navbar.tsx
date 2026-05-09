import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-navy text-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold flex items-center gap-2">
        <span className="text-yellow">Pink Tower</span>
        <span>International School</span>
      </Link>
      <div className="hidden md:flex gap-6 items-center font-medium">
        <Link href="/about" className="hover:text-yellow transition-colors">About</Link>
        <Link href="/curriculum" className="hover:text-yellow transition-colors">Curriculum</Link>
        <Link href="/gallery" className="hover:text-yellow transition-colors">Gallery</Link>
        <Link href="/events" className="hover:text-yellow transition-colors">Events</Link>
        <Link href="/journal" className="hover:text-yellow transition-colors">Journal</Link>
        <Link href="/contact" className="hover:text-yellow transition-colors">Contact</Link>
      </div>
      <div className="hidden md:block">
        <a href="tel:+254707480825" className="bg-yellow text-navy px-4 py-2 rounded font-bold hover:bg-opacity-90 transition">
          Call Us
        </a>
      </div>
    </nav>
  );
}

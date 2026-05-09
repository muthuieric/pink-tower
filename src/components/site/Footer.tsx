export function Footer() {
  return (
    <footer className="bg-navy text-white py-8 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-yellow mb-4">Pink Tower International</h3>
          <p className="text-sm text-gray-300">Nurturing young minds through excellence in education.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/curriculum" className="hover:text-yellow">Curriculum</a></li>
            <li><a href="/gallery" className="hover:text-yellow">Gallery</a></li>
            <li><a href="/events" className="hover:text-yellow">Events</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p className="text-sm text-gray-300 mb-2">Mzima Springs & Convent Road Campuses</p>
          <p className="text-sm font-bold text-yellow">+254 707 480 825</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t border-purple/30">
        &copy; {new Date().getFullYear()} Pink Tower International School. All rights reserved.
      </div>
    </footer>
  );
}

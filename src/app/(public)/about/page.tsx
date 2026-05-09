export default function About() {
  return (
    <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-navy mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the history, mission, and vision of Pink Tower International School.
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-navy mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Pink Tower International School was founded with a commitment to providing a holistic education that nurtures the intellectual, emotional, and social development of every child.
        </p>
        <p className="text-gray-600">
          Our approach, combined with a rich emphasis on the arts and music, creates a unique environment where children thrive and discover their true potential.
        </p>
      </div>
    </div>
  );
}

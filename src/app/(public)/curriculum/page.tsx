import { CheckCircle2 } from 'lucide-react';

export default function Curriculum() {
  const programs = [
    {
      title: "Early Years Foundation",
      description: "A nurturing approach based on the Montessori method, allowing children to learn at their own pace.",
      points: ["Sensorial activities", "Practical life skills", "Language and literacy", "Basic mathematics"]
    },
    {
      title: "Musical Education",
      description: "Music is deeply integrated into our daily routine to enhance cognitive development and creativity.",
      points: ["Vocal training", "Rhythm and movement", "Instrument introduction", "Music theory basics"]
    },
    {
      title: "Creative Arts",
      description: "Fostering self-expression and fine motor skills through various artistic mediums.",
      points: ["Painting and drawing", "Clay modeling", "Crafts and design", "Art history basics"]
    },
    {
      title: "Languages",
      description: "Preparing students for a globalized world by introducing multiple languages early on.",
      points: ["English mastery", "French fundamentals", "Swahili practice", "Cultural immersion"]
    }
  ];

  return (
    <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-navy mb-4">Our Curriculum</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At Pink Tower International School, we offer a rich, diverse curriculum designed to foster academic excellence, creativity, and character.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((program, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-bold text-navy mb-3">{program.title}</h2>
            <p className="text-gray-600 mb-6">{program.description}</p>
            <ul className="space-y-3">
              {program.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Gallery() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Fallback images if database is empty
  const displayImages = images.length > 0 ? images : [
    { id: '1', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80', caption: 'Classroom activity' },
    { id: '2', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80', caption: 'Learning together' },
    { id: '3', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80', caption: 'Playtime' },
    { id: '4', url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80', caption: 'Art class' },
    { id: '5', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80', caption: 'Music lesson' },
    { id: '6', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80', caption: 'School exterior' },
  ];

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-navy mb-4">School Gallery</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Take a glimpse into the daily life, activities, and special moments at Pink Tower International School.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {displayImages.map((img) => (
          <div key={img.id} className="break-inside-avoid relative group rounded-lg overflow-hidden bg-gray-100">
            {/* Using standard img tag for external URLs without needing to configure remotePatterns in next.config */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.url} 
              alt={img.caption || 'Gallery Image'} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
            />
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

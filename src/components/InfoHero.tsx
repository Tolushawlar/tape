"use client";

import { useState } from "react";
import Image from "next/image";

const InfoHero = () => {
  const galleryContent = [
    {
      image: "https://holushawlar.sirv.com/Images/WhatsApp%20Image%202025-05-13%20at%2011.25.10%20AM.jpeg",
      title: "Summer Collection",
      description: "Explore our latest summer styles featuring breathable fabrics and vibrant colors"
    },
    {
      image: "https://holushawlar.sirv.com/Images/WhatsApp%20Image%202025-05-13%20at%2011.25.18%20AM.jpeg", 
      title: "Urban Streetwear",
      description: "Contemporary urban designs that blend comfort with style"
    },
    {
      image: "https://holushawlar.sirv.com/Images/WhatsApp%20Image%202025-05-13%20at%2011.25.32%20AM.jpeg",
      title: "Casual Essentials",
      description: "Timeless casual pieces for your everyday wardrobe"
    },
    {
      image: "https://holushawlar.sirv.com/Images/WhatsApp%20Image%202025-05-13%20at%2011.25.36%20AM.jpeg",
      title: "Premium Collection", 
      description: "Luxury materials and expert craftsmanship in every piece"
    },
    {
      image: "https://holushawlar.sirv.com/Images/WhatsApp%20Image%202025-05-13%20at%2011.25.38%20AM.jpeg",
      title: "Limited Edition",
      description: "Exclusive designs available for a limited time only"
    },
    {
      image: "https://holushawlar.sirv.com/Images/WhatsApp%20Image%202025-05-13%20at%2011.25.39%20AM.jpeg",
      title: "Signature Series",
      description: "Our iconic pieces that define the Tape Wears brand"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryContent.map((item, index) => (
          <div 
            key={index}
            className="group relative h-[400px] overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedImage(item.image)}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-90' : 'opacity-0'}`}>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.title}
                </h3>
                <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-[80vh] animate-fadeIn">
            <Image
              src={selectedImage}
              alt="Enlarged view"
              fill
              className="object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoHero;

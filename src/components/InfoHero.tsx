// "use client";

// import HoverTextWithArrow from "./HoverText";
// import { useRouter } from "next/navigation";

// function InfoHero() {
//   const { push } = useRouter();

//   const toAbout = () => {
//     push("/about");
//   };

//   return (
//     <div
//       className="bg-cover bg-center md:h-[645px] h-[600px] flex flex-row items-center justify-center"
//       style={{
//         backgroundImage: `url("https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545892/image_1_vhyzms.png")`,
//       }}
//     >
//       <div className="md:w-1/3 w-0  h-[645px]"></div>
//       <div className="bg-[#CF0028] md:w-1/3 w-full  h-[645px] flex flex-col justify-between items-center text-white p-10">
//         <div>
//           <p className="text-center text-[16px] font-[600] my-10">
//             KNOW YOUR WEARS
//           </p>
//           <p className="text-center text-[14px] font-[400] w-[194px] h-[407px] my-10">
//             At the core of Tape Wears is a strong community. We create fashion
//             that connects people who share the same passion for authenticity,
//             heritage, and style. Whether through our designs or exclusive
//             events, Tape Wears is a place where inclusivity and community thrive
//           </p>
//         </div>
//         <div>
//           <div onClick={toAbout} className="mb-[80px]">
//             <HoverTextWithArrow text="Join our Community" />
//           </div>
//         </div>
//       </div>
//       <div className=" md:w-1/3 w-0  h-[645px]"></div>
//     </div>
//   );
// }

// export default InfoHero;


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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryContent.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryContent.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Carousel Section */}
      <div className="mb-12 relative">
        <div className="relative h-[500px] w-full">
          <Image
            src={galleryContent[currentIndex].image}
            alt={galleryContent[currentIndex].title}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">{galleryContent[currentIndex].title}</h2>
            <p className="text-lg">{galleryContent[currentIndex].description}</p>
          </div>
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            onClick={prevSlide}
          >
            ←
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            onClick={nextSlide}
          >
            →
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {galleryContent.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Enlarged view"
              width={800}
              height={600}
              className="object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryContent.map((item, index) => (
          <div 
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(item.image)}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoHero;

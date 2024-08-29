"use client";

import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleCloseOverlay = () => {
    setActiveSection(null);
  };

  return (
    <>
      {/* Navbar with dynamic background */}
      <nav
        className={`flex justify-between items-center px-[120px] py-[10px] ${
          activeSection ? "bg-white text-black opacity-100 z-50" : "bg-transparent text-white"
        } sweet-sans transition-all duration-300`}
      >
        <div className="flex space-x-4">
          <a
            href="#"
            onClick={() => handleNavClick("Men")}
            className="hover:underline sweet-sans"
          >
            Men
          </a>
          <a
            href="#"
            onClick={() => handleNavClick("Women")}
            className="hover:underline"
          >
            Women
          </a>
          <a
            href="#"
            onClick={() => handleNavClick("Accessories")}
            className="hover:underline"
          >
            Accessories
          </a>
        </div>

        <div className="text-2xl">
          <Image src="/logo.svg" width={100} height={100} alt="logo" />
        </div>

        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            Search
          </a>
          <a href="#" className="hover:underline">
            Cart
          </a>
        </div>
      </nav>

      {/* Overlay Section */}
      {activeSection && (
        <Overlay section={activeSection} onClose={handleCloseOverlay} />
      )}
    </>
  );
};

const Overlay = ({ section, onClose }) => {
  // Placeholder data for each section (replace with actual data)
  const sectionData = {
    Men: {
      image: "/men-section.jpg",
      categories: ["Shirts", "Pants", "Shoes", "Accessories"],
    },
    Women: {
      image: "/women-section.jpg",
      categories: ["Dresses", "Tops", "Shoes", "Handbags"],
    },
    Accessories: {
      image: "/accessories-section.jpg",
      categories: ["Hats", "Belts", "Watches", "Bags"],
    },
  };

  const { image, categories } = sectionData[section];

  // Close overlay when clicking outside content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center"
      onClick={handleOverlayClick} // Close overlay on outside click
    >
      <div
        className="relative bg-white text-black p-8 w-screen h-[500px]"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-6 text-center">{section}</h2>

        {/* Content: Image and Categories */}
        <div className="flex space-x-8">
          {/* Image */}
          <div className="w-1/2">
            <Image
              src={image}
              width={500}
              height={300}
              alt={`${section} section`}
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Categories in 2 Column Display */}
          <div className="w-1/2 grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

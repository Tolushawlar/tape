"use client";

import { useState } from "react";

const sections = [
  {
    id: "description",
    title: "Description",
    content:
      "This is the description of the product. It gives a brief overview of the product features and benefits.",
  },
  {
    id: "productDetails",
    title: "Product Details",
    content:
      "These are the details about the product including specifications and technical details.",
  },
  {
    id: "sizeFit",
    title: "Size & Fit",
    content:
      "Information on the sizing and fitting of the product to help you choose the right size.",
  },
  {
    id: "lookAfterMe",
    title: "Look After Me",
    content:
      "Care instructions for maintaining the quality and longevity of the product.",
  },
  {
    id: "aboutMe",
    title: "About Me",
    content:
      "Information about the brand or the product’s origin and background.",
  },
];

const FiveColumnSection = () => {
  const [selectedSection, setSelectedSection] = useState(sections[0].id);

  const handleSectionClick = (id: string) => {
    setSelectedSection(id);
  };

  const currentSection = sections.find(
    (section) => section.id === selectedSection
  );

  return (
    <div className="md:w-full w-[320px]">
      <div className="flex flex-row items-center gap-10 ">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`py-[-10px]  px-0 text-center border-b-[1px] ${
              selectedSection === section.id
                ? "border-black text-black md:text-[14px] text-[10px] font-400 font-Sweet-Regular"
                : "md:text-[14px] text-[10px] font-400 font-Sweet-Regular border-transparent text-black"
            } hover:border-indigo-300 transition`}
          >
            {section.title}
          </button>
        ))}
      </div>
      <div className="max-w-[500px] mt-1 p-4 font-normal text-[14px] font-Sweet-Regular ">
        <p>{currentSection?.content}</p>
      </div>
    </div>
  );
};

export default FiveColumnSection;
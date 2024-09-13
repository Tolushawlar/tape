"use client";

import React, { useState } from 'react';

const sections = [
    { id: 'description', title: 'Description', content: 'This is the description of the product. It gives a brief overview of the product features and benefits.' },
    { id: 'productDetails', title: 'Product Details', content: 'These are the details about the product including specifications and technical details.' },
    { id: 'sizeFit', title: 'Size & Fit', content: 'Information on the sizing and fitting of the product to help you choose the right size.' },
    { id: 'lookAfterMe', title: 'Look After Me', content: 'Care instructions for maintaining the quality and longevity of the product.' },
    { id: 'aboutMe', title: 'About Me', content: 'Information about the brand or the product’s origin and background.' },
];

const FiveColumnSection = () => {
    const [selectedSection, setSelectedSection] = useState(sections[0].id);

    const handleSectionClick = (id) => {
        setSelectedSection(id);
    };

    const currentSection = sections.find(section => section.id === selectedSection);

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-5 gap-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`py-2 px-4 text-center border-b-2 ${selectedSection === section.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-600'} hover:border-indigo-300 transition`}
                    >
                        {section.title}
                    </button>
                ))}
            </div>
            <div className="mt-6 p-4 border rounded-md border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">{currentSection.title}</h2>
                <p>{currentSection.content}</p>
            </div>
        </div>
    );
};

export default FiveColumnSection;

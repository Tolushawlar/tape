"use client";

import React from "react";
import HoverTextWithArrow from './HoverText';
import ImageCard from "./ItemsCard";
import { useRouter } from 'next/navigation';

const CollectionSection = ({ collectionName, itemsData, showExploreButton = true }) => {
    const router = useRouter();

    // Function to handle navigation to the specific collection page
    const navigateToCollection = () => {
        // Navigate to the collection page using the collection name
        router.push(`/collections/${encodeURIComponent(collectionName)}`);
    };

    return (
        <div className="flex flex-col items-center justify-between w-screen md:h-[418px] h-full mt-[80px] md:mb-[80px] ">
            <div className="flex md:flex-row flex-col items-center justify-between w-[1116px]">
                <p className="text-[18px] font-[700] tracking-wider">{collectionName}</p>
                {showExploreButton && (
                    <HoverTextWithArrow
                        text="Explore Now"
                        textColor="text-black"
                        onClick={navigateToCollection} // Pass the navigation function as onClick prop
                    />
                )}
            </div>
            <div className="flex md:flex-row flex-col items-center justify-evenly w-[1116px] md:h-[368px] h-full">
                {itemsData.map((item, index) => (
                    <ImageCard
                        key={index}
                        name={item.name}
                        defaultImage={item.defaultImage}
                        hoverImage={item.hoverImage}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default CollectionSection;

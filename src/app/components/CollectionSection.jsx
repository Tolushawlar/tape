"use client";

import React from "react";
import HoverTextWithArrow from './HoverText'
import ImageCard from "./ItemsCard";

const CollectionSection = ({ collectionName, itemsData }) => {
    return (
        <div className="flex flex-col items-center justify-between w-screen h-[418px] mt-[80px] mb-[80px]">
            <div className="flex flex-row items-center justify-between w-[1116px]">
                <p className="text-[16px] font-[600]">{collectionName}</p>
                <HoverTextWithArrow text="Explore Now" textColor="text-black" />
            </div>
            <div className="flex flex-row items-center justify-evenly w-[1116px] h-[368px]">
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

"use client";

import React, { useState } from "react";

const ImageCard = ({ name, defaultImage, hoverImage, price }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col justify-center items-start w-[275px] h-[368px] mx-5 my-8">
            <div
                className="w-[275px] h-[317px] relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                        backgroundImage: `url(${isHovered ? hoverImage : defaultImage})`,
                    }}
                ></div>

                {/* "Add to Cart" button */}
                <div
                    className={`absolute bottom-5 inset-0 flex justify-center items-end transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <button className="cursor-pointer bg-white text-black text-[12px] font-normal w-[239px] h-[37px] py-2 px-4 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-5 w-[275px]">
                <p className="text-[12px] font-normal">{name}</p>
                <p className="text-[12px] font-normal">{price}</p>
            </div>
        </div>
    );
};

export default ImageCard;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useCart } from "../../../cartContext";

const ImageCard = ({ id, name, defaultImage, hoverImage, price, itemName, size }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSizeVisible, setIsSizeVisible] = useState(false); // To toggle size visibility
    const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
    const router = useRouter();

    const { addToCart } = useCart(); // Get addToCart function from context

    // Function to handle size click and add to cart
    const handleSizeClick = (size) => {
        const item = { id, name, price, defaultImage, size };
        addToCart(item); // Add item to cart with selected size
        setIsSizeVisible(false); // Hide size options after adding to cart
        showModal(); // Show modal after adding to cart
    };

    // Function to show size options when "Add to Cart" is clicked
    const showSizeOptions = () => {
        setIsSizeVisible(true); // Show sizes
    };

    // Function to show the modal and automatically hide it after 2 seconds
    const showModal = () => {
        setIsModalVisible(true); // Show modal
        setTimeout(() => {
            setIsModalVisible(false); // Hide modal after 2 seconds
        }, 2000); // Adjust time to how long you want the modal to show
    };

    return (
        <div className="flex flex-col justify-center items-start w-[275px] h-[368px] mx-5 my-8 cursor-pointer">
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

                {/* Add to Cart / Size selection buttons */}
                <div
                    className={`absolute bottom-5 inset-0 flex justify-center items-end transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {!isSizeVisible && (
                        <button
                            onClick={showSizeOptions} // Show size options
                            className="cursor-pointer bg-white text-black text-[12px] font-normal w-[239px] h-[37px] py-2 px-4 transition font-Sweet-Regular"
                        >
                            Add to Cart
                        </button>
                    )}

                    {isSizeVisible && (
                        <div className="flex flex-row items-center justify-between w-[239px] h-[37px] bg-white cursor-pointer py-2 px-4 transition text-black text-[12px] font-Sweet-Regular">
                            {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeClick(size)} // Add to cart immediately on size click
                                    className="p-1 bg-white"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Item info */}
            <div
                className="mt-5 w-[275px] cursor-pointer"
                onClick={() => router.push(`/singlePage/${encodeURIComponent(name)}`)} // Navigate on click
            >
                <p className="text-[12px] font-normal">{name}</p>
                <p className="text-[12px] font-normal">{price}</p>
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-md shadow-md text-center">
                        <p className="font-CLash-Regular text-[16px] text-black">Item added to cart!</p>
                        <button
                            className="mt-4 bg-[#CF0028] text-white py-2 px-4 rounded-md"
                            onClick={() => setIsModalOpen(false)} // Close modal on button click
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCard;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useCart } from "@/context/cartContext";
import { useCartStore } from "@/lib/store/cart-store";

export interface ImageCardProps {
  id: string;
  name: string;
  defaultImage: string;
  hoverImage: string;
  price: string;
  itemName?: string;
  size?: string;
}
const ImageCard = ({
  id,
  name,
  defaultImage,
  hoverImage,
  price,
  size,
}: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSizeVisible, setIsSizeVisible] = useState(false); // To toggle size visibility
  const { setGlobalState } = useGlobalState();

  const { addToCart } = useCart(); // Get addToCart function from context

  const { toggleCartSheet } = useCartStore();

  const router = useRouter();

  // Function to handle size click and add to cart
  const handleSizeClick = () => {
    const item = { id, name, price, defaultImage, size };
    addToCart(item); // Add item to cart with selected size
    setIsSizeVisible(false); // Hide size options after adding to cart
    toggleCartSheet();
    setGlobalState(true);
  };

  // Function to show size options when "Add to Cart" is clicked
  const showSizeOptions = () => {
    setIsSizeVisible(true); // Show sizes
  };

  return (
    <div className="flex flex-col justify-center items-start w-[275px] h-[368px] mx-5 md:my-8 my-5 cursor-pointer">
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
          className={`absolute bottom-5 inset-0 flex justify-center items-end transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
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
              {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={handleSizeClick} // Add to cart immediately on size click
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
        onClick={() => router.push(`/product/${encodeURIComponent(name)}`)} // Navigate on click
      >
        <p className="text-[12px] font-normal">{name}</p>
        <p className="text-[12px] font-normal">£ {price}</p>
      </div>
    </div>
  );
};

export default ImageCard;

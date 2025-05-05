/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useCart } from "@/context/cartContext";
import { useCartStore } from "@/lib/store/cart-store";

export interface ImageCardProps {
  id: string;
  color1: any,
  size1: any,
  size2: any,
  size3: any,
  size4: any,
  size5: any,
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
  color1,
  size,
  size1,
  size2,
  size3,
  size4,
  size5
}: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSizeVisible, setIsSizeVisible] = useState(false);
  const { setGlobalState } = useGlobalState();

  const { addToCart } = useCart();

  const { toggleCartSheet } = useCartStore();

  const router = useRouter();

  const availableSizes = [size1, size2, size3, size4, size5].filter(size => size);
  // const handleSizeClick = () => {
  //   const item = { id, name, price, defaultImage, size };
  //   console.log(item);
  //   addToCart(item);
  //   setIsSizeVisible(false);
  //   toggleCartSheet();
  //   setGlobalState(true);
  // };

  const handleSizeClick = (selectedSize: string) => {
    const item = { id, name, price, defaultImage, color:color1, size: selectedSize };
    addToCart(item); 
    setIsSizeVisible(false);
    toggleCartSheet();
    setGlobalState(true);
  };

  const showSizeOptions = () => {
    setIsSizeVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-start w-[275px] h-[368px] mx-5 md:my-8 my-5 cursor-pointer">
      <div
        className="w-[275px] h-[317px] relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${isHovered ? hoverImage : defaultImage})`,
          }}
        ></div>

        <div
          className={`absolute bottom-5 inset-0 flex justify-center items-end transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          {!isSizeVisible && (
            <button
              onClick={showSizeOptions}
              className="cursor-pointer bg-white text-black text-[12px] font-normal w-[239px] h-[37px] py-2 px-4 transition font-Sweet-Regular"
            >
              Add to Cart
            </button>
          )}

          {/* {isSizeVisible && (
            <div className="flex flex-row items-center justify-center space-x-10 w-[239px] h-[37px] bg-white cursor-pointer py-2 px-4 transition text-black text-[12px] font-Sweet-Regular">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={handleSizeClick}
                  className="p-1 bg-white"
                >
                  {size}
                </button>
              ))}
            </div>
          )} */}
          {isSizeVisible && (
            <div className="flex flex-row items-center justify-center space-x-10 w-[239px] h-[37px] bg-white cursor-pointer py-2 px-4 transition text-black text-[12px] font-Sweet-Regular">
              {availableSizes.map((individualSize) => (
                <button
                  key={individualSize}
                  onClick={() => handleSizeClick(individualSize)} // Pass the individual size
                  className="p-1 bg-white"
                >
                  {individualSize}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-5 w-[275px] cursor-pointer"
        onClick={() => router.push(`/product/${encodeURIComponent(name)}`)}
      >
        <p className="text-[12px] font-normal">{name}</p>
        <p className="text-[12px] font-normal">£ {price}</p>
      </div>
    </div>
  );
};

export default ImageCard;

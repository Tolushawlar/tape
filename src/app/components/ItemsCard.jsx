"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useCart } from "../../../cartContext";
import { useGlobalState, GlobalStateProvider } from '../../../GlobalStateContext'; // Import the custom hook
import CartItem from "./CartItem";
import Image from "next/image";


const ImageCard = ({ id, name, defaultImage, hoverImage, price, itemName, size }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSizeVisible, setIsSizeVisible] = useState(false); // To toggle size visibility
    const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart overlay
    const { globalState, setGlobalState } = useGlobalState();

    const { addToCart } = useCart(); // Get addToCart function from context

    // Function to handle size click and add to cart
    const handleSizeClick = (size) => {
        const item = { id, name, price, defaultImage, size };
        addToCart(item); // Add item to cart with selected size
        setIsSizeVisible(false); // Hide size options after adding to cart
        // Show modal after adding to cart
        // showModal(); 
        setIsCartOpen((prev) => !prev);
        setGlobalState(true);
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


    // Close cart overlay
    const closeCart = () => {
        setIsCartOpen(false);
        setGlobalState(false);
    };

    const toCheckout = () => {
        router.push('/Checkout');
        closeCart();
    };

    const { cartItems, removeFromCart, clearCart } = useCart();


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

            {/* Cart Overlay */}
            {isCartOpen && (
                <div
                    className="fixed top-0 right-0 bg-white w-[546px] h-min overscroll-y-auto  h-min-[597.09px] shadow-lg z-50 p-4"
                    onClick={closeCart}
                >
                    <div
                        className="flex flex-col justify-start p-5 -"
                        onClick={(e) => e.stopPropagation()} // Prevent overlay close when clicking inside
                    >
                        <div className="flex flex-row items-center justify-between">
                            <h2 className="text-[18px] font-[900] font-CLash-Regular ">YOUR CART</h2>
                            <button className="w-[17.88px] h-[13.9px] text-black font-bold" onClick={closeCart}>✕</button>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-5 mt-10 ">
                            <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1726134723/Frame_1000004497_a0djka.svg" width={28.98} height={26.69} alt="logo" />
                            <p className="font-Sweet-Regular text-[10px] font-normal">Item added to your cart</p>
                        </div>
                        <div className="p-5">
                            <h2 className="text-2xl mb-4">Your Cart</h2>
                            {/* <CartItem />
                            {cartItems.length > 0 ? (
                                <>
                                    <ul>
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="flex justify-between my-2">
                                                <div>
                                                    <p>{item.name}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <Image src={item.defaultImage} width={87.7} height={86.93} alt="logo" />

                                                </div>
                                                <div>
                                                    <p>₦{item.price}</p>
                                                    <p>₦{item.size}</p>
                                                    <button
                                                        className="ml-4 text-red-500"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="mt-4 bg-red-500 text-white px-4 py-2"
                                        onClick={clearCart}
                                    >
                                        Clear Cart
                                    </button>
                                </> */}
                            {/* <CartItem/> */}
                            {cartItems.length > 0 ? (
                                <ul>
                                    {cartItems.map((item) => (
                                        <li key={item.id}>
                                            <CartItem item={item} removeFromCart={removeFromCart} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='mt-4 text-[14px] font-400 font-Sweet-Regular'>Your cart is empty</p>
                            )}
                        </div>
                        {/* Add your cart items here */}
                        <div className="flex flex-col items-center  left-0 right-0 mt-5 gap-3">
                            <button onClick={toCheckout} className="mt-auto bg-[#CF0028] w-[444.58px] h-[61.01px] text-white py-2 px-4 font-[500] text-[14px] font-CLash-Regular" >
                                CHECKOUT
                            </button>
                            <button className="mt-auto bg-white text-black font-[400] font-CLash-Regular w-[444.58px] h-[61.01px] text-[14px] py-2 px-4 border-[1px] border-black " onClick={closeCart}>
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

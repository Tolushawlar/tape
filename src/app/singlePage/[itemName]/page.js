"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useParams } from 'next/navigation'
import { useGlobalState } from '../../../../GlobalStateContext'
import { useCart } from '../../../../cartContext'
import { useRouter } from 'next/navigation'
import CollectionSection from '../../components/CollectionSection'
import Description from '../../components/Description'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import CartItem from '../../components/CartItem'

const itemsData = [
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "€35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545533/cardImage3_j4z4fg.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image5_aa1sje.png",
        price: "€40,000.00",
    },
    // ... more items
];

const ImageCarousel = () => {
    return (
        <Carousel
            showArrows={false}
            infiniteLoop={true}
            showThumbs={true}
            showStatus={false}
            autoPlay={true}
            interval={3000}
        >
            <div>
                <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png" width={489} height={851} alt="logo" />
                {/* <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" /> */}
                {/* <p className="legend">Slide 1</p> */}
            </div>
            <div>
                {/* <img src="https://via.placeholder.com/800x400?text=Slide+2" alt="Slide 2" /> */}
                <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png" width={489} height={851} alt="logo" />
                {/* <p className="legend">Slide 2</p> */}
            </div>
            <div>
                {/* <img src="https://via.placeholder.com/800x400?text=Slide+3" alt="Slide 3" /> */}
                <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png" width={489} height={851} alt="logo" />
                {/* <p className="legend">Slide 3</p> */}
            </div>
            <div>
                {/* <img src="https://via.placeholder.com/800x400?text=Slide+4" alt="Slide 4" /> */}
                <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png" width={489} height={851} alt="logo" />
                {/* <p className="legend">Slide 4</p> */}
            </div>
        </Carousel>
    );
};

const Page = () => {
    const { globalState, setGlobalState } = useGlobalState();
    const { itemName } = useParams();
    const decodedItemName = decodeURIComponent(itemName);
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState(null); // State to store selected size
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart overlay

    // Function to handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    // Function to add item to cart
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        const defaultImage = "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png"
        const item = {
            name: decodedItemName,
            price: "41,000.00",
            size: selectedSize,
            defaultImage: defaultImage
        };
        addToCart(item);
        setIsCartOpen((prev) => !prev);
        setGlobalState(true);

        // setIsModalOpen(true); // Open modal when item is added
        // setTimeout(() => {
        //     setIsModalOpen(false); // Close modal after 3 seconds
        // }, 3000);
    };


    // Close cart overlay
    const closeCart = () => {
        setIsCartOpen(false);
        setGlobalState(false);
    };

    // Function to navigate to checkout
    const toCheckout = () => {
        router.push("/Checkout");
    };

    return (
        <div className='overflow-x-hidden'>
            <div className={`${globalState ? "fixed ml-[14rem]" : ""} flex flex-col items-center justify-center}`}>
                <div className='flex md:flex-row flex-col md:items-start items-center gap-8 mt-10'>
                    <div className='md:w-[489px] w-[320px] md:h-[651px] h-[400px] bg-[#f2f2f2] items-center justify-center'>
                        {/* <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png" width={489} height={851} alt="logo" /> */}
                        <ImageCarousel />
                    </div>
                    <div className='flex flex-col md:items-start items-center md:justify-start justify-center gap-8'>
                        <p className='font-[300] text-gray-400 font-Sweet-Regular text-[14px] mb-10 md:block hidden'>Men’s Collection &gt; {decodedItemName} &gt; </p>
                        <p className='font-[600] font-CLash-Regular text-[34px] tracking-wide'>{decodedItemName}</p>
                        <p className='text-[34px] font-CLash-Regular font-[500] mt-[-20px]'>€41,000.00</p>
                        <div className='flex flex-row items-center gap-3  mt-[-10px]'>
                            <p className='font-[400] font-Sweet-Regular text-[14px] mr-1'>Colors</p>
                            <div className='w-[23px] cursor-pointer h-[21px] bg-[#000000]'></div>
                            <div className='w-[23px] cursor-pointer h-[21px] border-[0.76px] border-black bg-white'></div>
                            <div className='w-[23px] cursor-pointer h-[21px] bg-[#CF0028]'></div>
                            <div className='w-[23px] cursor-pointer h-[21px] bg-[#082A63]'></div>
                        </div>

                        {/* Size Selection Menu */}
                        <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center md:w-[620px] w-[300px] h-[46px] mt-[-1">
                            <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                <p className='font-[400] font-CLash-Regular text-[14px] mt-1'>
                                    {selectedSize ? `SIZE : ${selectedSize}` : "SELECT SIZE"}
                                </p>
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                            </MenuButton>
                            <MenuItems className="absolute overflow-y-visible mt-2 w-full bg-white shadow-lg z-10">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <MenuItem
                                        key={size}
                                        as="div"
                                        className="cursor-pointer h-[61px] p-5 text-left border-[0.76px] border-black"
                                        onClick={() => handleSizeSelect(size)} // Select size on click
                                    >
                                        {size}
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Menu>

                        <div className="flex flex-col items-center gap-5 mt-5">
                            <button onClick={handleAddToCart} className="mt-auto bg-[#CF0028] md:w-[620px] w-[300px] h-[46px] text-white py-2 px-4 font-[500] text-[14px] font-CLash-Regular">
                                ADD TO CART
                            </button>
                            <button onClick={toCheckout} className="mt-auto bg-black text-white font-[400] font-CLash-Regular md:w-[620px] w-[300px] h-[46px] text-[14px] py-2 px-4 border-[0.76px] border-black">
                                GO TO CHECKOUT
                            </button>
                        </div>

                        <Description />
                    </div>
                </div>
                <div className='flex flex-col items-center w-[1161px]'>
                    <CollectionSection collectionName="RELATED PRODUCTS" itemsData={itemsData} />
                </div>
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
                                                    <p>€{item.price}</p>
                                                    <p>€{item.size}</p>
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

            {/* Simple Modal */}
            {isModalOpen && (
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
}

export default Page;

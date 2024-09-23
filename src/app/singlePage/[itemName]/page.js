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

const itemsData = [
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "₦35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545533/cardImage3_j4z4fg.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image5_aa1sje.png",
        price: "₦40,000.00",
    },
    // ... more items
];

const Page = () => {
    const { globalState } = useGlobalState();
    const { itemName } = useParams();
    const decodedItemName = decodeURIComponent(itemName);
    const { addToCart, clearCart } = useCart();
    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState(null); // State to store selected size
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

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
        setIsModalOpen(true); // Open modal when item is added
        setTimeout(() => {
            setIsModalOpen(false); // Close modal after 3 seconds
        }, 3000);
    };

    // Function to navigate to checkout
    const toCheckout = () => {
        router.push("/Checkout");
    };

    return (
        <div className='overflow-x-hidden'>
            <div className={`${globalState ? "fixed ml-[14rem]" : ""} flex flex-col items-center justify-center}`}>
                <div className='flex flex-row items-start gap-8 mt-10'>
                    <div className='w-[489px] h-[651px] bg-[#f2f2f2] items-center justify-center'>
                        <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png" width={489} height={851} alt="logo" />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-8'>
                        <p className='font-[300] text-gray-400 font-Sweet-Regular text-[14px] mb-10'>Men’s Collection &gt; {decodedItemName} &gt; </p>
                        <p className='font-[600] font-CLash-Regular text-[34px] tracking-wide'>{decodedItemName}</p>
                        <p className='text-[34px] font-CLash-Regular font-[500]'>₦41,000.00</p>
                        <div className='flex flex-row items-center gap-3'>
                            <p className='font-[400] font-Sweet-Regular text-[14px] mr-1'>Colors</p>
                            <div className='w-[23px] h-[21px] bg-[#000000]'></div>
                            <div className='w-[23px] h-[21px] border-[0.76px] border-black bg-white'></div>
                            <div className='w-[23px] h-[21px] bg-[#CF0028]'></div>
                            <div className='w-[23px] h-[21px] bg-[#082A63]'></div>
                        </div>

                        {/* Size Selection Menu */}
                        <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[620px] h-[46px]">
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
                            <button onClick={handleAddToCart} className="mt-auto bg-[#CF0028] w-[620px] h-[46px] text-white py-2 px-4 font-[500] text-[14px] font-CLash-Regular">
                                ADD TO CART
                            </button>
                            <button onClick={toCheckout} className="mt-auto bg-black text-white font-[400] font-CLash-Regular w-[620px] h-[46px] text-[14px] py-2 px-4 border-[0.76px] border-black">
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

import Image from 'next/image'
import React from 'react'
import { Description, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import HoverTextWithArrow from '../../components/HoverText'
import CollectionSection from '../../components/CollectionSection'

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
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545538/image9_kdgq90.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "₦35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545539/image11_a1lhru.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "₦40,000.00",
    },
];

function page() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row items-start gap-10 mt-10'>
                <div className='w-[489px] h-[651px] '>
                    <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546254/modal2_txynj6.png" width={489} height={851} alt="logo" />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-[500] font-Sweet-Regular text-[32px]'>THE CHARCOAL T-SHIRT</p>
                    <p>#41,000</p>
                    <div className='flex flex-row items-center gap-5'>
                        <p className='font-[400] font-Sweet-Regular text-[14px]'>Colors</p>
                        <div className='w-[23px] h-[21px] bg-[#000000]'></div>
                        <div className='w-[23px] h-[21px] bg-white'></div>
                        <div className='w-[23px] h-[21px] bg-[#CF0028]'></div>
                        <div className='w-[23px] h-[21px] bg-[#082A63]'></div>
                    </div>

                    <Menu as="div" className="z-50 border-[1px] border-black relative inline-block text-center w-[620px] h-[46px]">
                        <div>
                            <MenuButton className="flex flex-row w-full items-center justify-between  bg-white px-3 py-2 ">
                                <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>SIZE</p>
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                        // className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="py-1 mt-2 w-[620px] text-left z-50">
                                <MenuItem className="border-[1px] border-black h-[61px] items-center flex z-50 bg-white">
                                    <a
                                        href="#"
                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black  font-CLash-Regular"
                                    >
                                        XS
                                    </a>
                                </MenuItem>
                                <MenuItem className="border-[1px] border-black h-[61px] items-center flex  z-50 bg-white ">
                                    <a
                                        href="#"
                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular "
                                    >
                                        S
                                    </a>
                                </MenuItem>
                                <MenuItem className="border-[1px] border-black h-[61px] items-center flex  z-50 bg-white ">
                                    <a
                                        href="#"
                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black  font-CLash-Regular"
                                    >
                                        M
                                    </a>
                                </MenuItem>
                                <MenuItem className="border-[1px] border-black h-[61px] items-center flex  z-50 bg-white ">
                                    <a
                                        href="#"
                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black  font-CLash-Regular"
                                    >
                                        L
                                    </a>
                                </MenuItem>
                                <MenuItem className="border-[1px] border-black h-[61px] items-center flex  z-50 bg-white ">
                                    <a
                                        href="#"
                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black  font-CLash-Regular"
                                    >
                                        XL
                                    </a>
                                </MenuItem>
                                <MenuItem className="border-[1px] border-black h-[61px] items-center flex  z-50 bg-white ">
                                    <a
                                        href="#"
                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black  font-CLash-Regular"
                                    >
                                        XLL
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>

                    <div className="flex flex-col items-center gap-5 mt-5">
                        <button className="mt-auto bg-[#CF0028] w-[620px] h-[46px] text-white py-2 px-4 font-[500] text-[14px] font-CLash-Regular" >
                            ADD TO CART
                        </button>
                        <button className="mt-auto bg-black text-white font-[400] font-CLash-Regular w-[620px] h-[46px] text-[14px] py-2 px-4 border-[1px] border-black " >
                            GO TO CHECKOUT
                        </button>
                    </div>

                    <Descrition/>
                </div>
            </div>
            <div className='flex flex-col items-center w-[1161px]'>
                <CollectionSection collectionName="RELATED PRODUCTS" itemsData={itemsData} />
            </div>
        </div>
    )
}

export default page
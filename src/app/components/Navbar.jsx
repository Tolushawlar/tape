"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Footer from "./Footer";
import CollectionSection from "./CollectionSection";

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

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search overlay

    // Toggle the search overlay
    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    // Close the search overlay
    const closeSearch = () => {
        setIsSearchOpen(false);
    };

    const [activeSection, setActiveSection] = useState(null);
    const router = useRouter();
    const pathName = usePathname();
    console.log(pathName)

    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    const handleCloseOverlay = () => {
        setActiveSection(null);
    };

    const handleNavigation = () => {
        router.push('/Blog');
    };

    const toHome = () => {
        router.push("/")
    }

    const divRef = useRef(null);

    useEffect(() => {
        const div = divRef.current;

        // Check if the div exists before adding the event listener
        if (!div) return;

        const handleScroll = (event) => {
            // Prevent the default scroll behavior
            event.preventDefault();
            event.stopPropagation();
        };

        // Add the event listener to prevent scroll
        div.addEventListener("wheel", handleScroll, { passive: false });

        // Cleanup function to remove the event listener on component unmount
        return () => {
            if (div) {
                div.removeEventListener("wheel", handleScroll);
            }
        };
    }, []);


    return (
        <>
            {/* Navbar with dynamic background */}
            <nav
                className={` flex justify-between items-center px-[120px] py-[20px] bg-transparent  ${activeSection || pathName != "/" ? "bg-white text-black fixed w-screen z-50 py-[30px]" : " text-white"
                    } transition-all duration-300 absolute top-0 left-0 right-0 z-20`}
            >
                <div className="flex space-x-4 font-Sweet-Regular cursor-pointer">
                    <a
                        href="#"
                        onClick={() => handleNavClick("Men")}
                        className="font-Sweet-Regular text-[18px] font-normal"
                    >
                        Men
                    </a>
                    <a
                        href="#"
                        onClick={() => handleNavClick("Women")}
                        className="font-Sweet-Regular text-[18px] font-normal"
                    >
                        Women
                    </a>
                    <a
                        href="#"
                        onClick={() => handleNavClick("Kids")}
                        className="font-Sweet-Regular text-[18px] font-normal"
                    >
                        Kids
                    </a>
                    <a
                        href="#"
                        onClick={() => handleNavClick("Accessories")}
                        className="font-Sweet-Regular text-[18px] font-normal"
                    >
                        Accessories
                    </a>
                </div>

                <div className="text-2xl">
                    <Image onClick={toHome} src={activeSection || pathName != "/" ? "/logo2.svg" : "/logo.svg"}
                        width={100} height={100} alt="logo" className="cursor-pointer" />
                </div>

                <div className="flex flex-row items-center justify-evenly gap-8">
                    <div onClick={handleNavigation} className="cursor-pointer font-Sweet-Regular text-[18px] font-normal ">
                        Tape Blog
                    </div>
                    <div onClick={toggleSearch} className="cursor-pointer font-Sweet-Regular text-[18px] font-normal flex flex-row items-center justify-center gap-3">
                        <Image src={activeSection || pathName != "/" ? "/navbarIcons/searchBlack.svg" : "/navbarIcons/searchWhite.svg"}
                            width={19} height={19} alt="logo" />Search
                    </div>
                    <Image src={activeSection || pathName != "/" ? "/navbarIcons/cartBlack.svg" : "/navbarIcons/cartWhite.svg"}
                        width={22} height={22} alt="logo" className="cursor-pointer" />
                </div>
            </nav>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div
                    ref={divRef} className="fixed top-0 left-0 bg-black bg-opacity-70 flex flex-col justify-center items-start w-screen h-screen z-50"
                    onClick={closeSearch} // Close overlay when clicking outside input box
                >
                    <div
                        className=" bg-white p-5 w-screen flex flex-row items-center justify-center  "
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside input box
                    >
                        <Image src="navbarIcons/searchBlack.svg" width={19} height={19} alt="logo" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-[1229px] h-[50px] p-3 text-[12px] font-normal font-Sweet-Regular  focus:outline-none focus:border-black"
                        />
                        <button className="w-[17.88px] h-[13.9px] text-gray-600" onClick={closeSearch}>✕</button>
                        <Image src="navbarIcons/cartBlack.svg" width={19.74} height={17.88} alt="logo" />
                    </div>
                    <div className="bg-white w-screen flex flex-col items-center justify-center">
                        <p className="text-[12px] font-normal font-Sweet-Regular">Sorry, we could not find any products matching your search.</p>
                        <div className="flex flex-row items-center justify-between w-[1229px]">
                            <p className="text-[24px] font-[500px] font-CLash-Regular">TOP RESULTS</p>
                            <p className="text-[12px] font-normal text-right font-Sweet-Regular">Show all results (20)</p>
                        </div>
                        <div>
                            <CollectionSection collectionName="MEN’S COLLECTION" itemsData={itemsData} />
                        </div>
                    </div>

                </div>
            )}
            {/* Overlay Section */}
            {activeSection && (
                <Overlay section={activeSection} onClose={handleCloseOverlay} />
            )}
        </>
    );
};

const Overlay = ({ section, onClose }) => {
    // Placeholder data for each section (replace with actual data)
    const sectionData = {
        Men: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546252/modal1_tdwpgr.png",
            categories: ["Shirts", "Pants", "Shoes", "Accessories"],
        },
        Women: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546251/modal3_mwkwaf.png",
            categories: ["Dresses", "Tops", "Shoes", "Handbags"],
        },
        Kids: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546251/modal3_mwkwaf.png",
            categories: ["Dresses", "Tops", "Shoes", "Handbags"],
        },
        Accessories: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546254/modal2_txynj6.png",
            categories: ["Hats", "Belts", "Watches", "Bags"],
        },
    };

    const { image, categories } = sectionData[section];

    // Close overlay when clicking outside content
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed bg-black bg-opacity-70 z-40 h-screen flex items-center justify-center"
            onClick={handleOverlayClick} // Close overlay on outside click
        >
            <div
                className="flex flex-row item justify-between relative bg-white text-black w-screen h-[480px] bottom-[50px]"
                onClick={(e) => e.stopPropagation()} // Prevent close on content click
            >
                {/* Close Button */}
                {/* <button
                    className="hidden absolute top-4 right-4 text-black text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button> */}

                {/* Section Title */}
                <div className="m-10">
                    <h2 className="text-3xl font-bold text-center">VIEW ALL {section} PRODUCTS</h2>
                </div>

                {/* Content: Image and Categories */}
                <div className="flex">
                    {/* Image */}
                    <div className="w-[716px]">
                        <Image
                            src={image}
                            width={716}
                            height={480}
                            alt={`${section} section`}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Categories in 2 Column Display */}
                    {/* <div className="w-1/2 grid grid-cols-2 gap-4">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
                            >
                                 {category}
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
};



export default Navbar;

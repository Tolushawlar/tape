"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Footer from "./Footer";
import CollectionSection from "./CollectionSection";
import CartItem from "./CartItem";
import { useCart } from "../../../cartContext";
import { useGlobalState, GlobalStateProvider } from '../../../GlobalStateContext'; // Import the custom hook

const itemsData = [
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "£35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545533/cardImage3_j4z4fg.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image5_aa1sje.png",
        price: "£40,000.00",
    },
    {
        name: "Dope Like Coke Tee",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545538/image9_kdgq90.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "£35,000.00",
    },
    {
        name: "Cool Summer Shirt",
        defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545539/image11_a1lhru.png",
        hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
        price: "£40,000.00",
    },
];

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search overlay
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart overlay
    const { globalState, setGlobalState } = useGlobalState();

    // Toggle the search overlay
    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
        setGlobalState(true)
        console.log(globalState)
    };

    // Toggle the cart overlay display
    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
        setGlobalState(true);
        console.log(cartItems)
        // alert("close value =" + globalState)
    }

    // Close the search overlay
    const closeSearch = () => {
        setIsSearchOpen(false);
        setGlobalState(false)
        console.log(globalState)
    };

    // Close cart overlay
    const closeCart = () => {
        setIsCartOpen(false);
        setGlobalState(false);
    };

    const [activeSection, setActiveSection] = useState(null);
    const router = useRouter();
    const pathName = usePathname();
    console.log(pathName)

    const handleNavClick = (section) => {
        setGlobalState(true)
        // console.log(globalState)
        // alert("open value =" + globalState)
        setActiveSection(section);
    };

    const handleCloseOverlay = () => {
        setGlobalState(false)
        // console.log(globalState)
        // alert("close value =" + globalState)
        setActiveSection(null);
    };

    const handleNavigation = () => {
        router.push('/Blog');
    };

    const toHome = () => {
        router.push("/")
    }

    const toCheckout = () => {
        router.push('/Checkout');
        closeCart();
    };

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


    const { cartItems, removeFromCart, clearCart } = useCart();

    return (
        <div className="overflow-x-hidden">
            {/* Navbar with dynamic background */}
            <nav
                className={` flex justify-between items-center px-[120px] py-[20px] bg-transparent  overflow-x-hidden ${activeSection || pathName != "/" ? "bg-red-500 text-black  w-screen z-50 py-[30px] relative overflow-x-hidden" : " text-white overflow-x-hidden"
                    } transition-all duration-300 absolute top-0 left-0 right-0 z-20`}
            >
                <div className="flex space-x-4 font-Sweet-Regular cursor-pointer gap-[25px]">
                    <a
                        href="#"
                        onMouseEnter={() => handleNavClick("Men")}
                        className="font-Sweet-Regular text-[16px] font-normal"
                    >
                        Men
                    </a>
                    <a
                        href="#"
                        onMouseEnter={() => handleNavClick("Women")}
                        className="font-Sweet-Regular text-[16px] font-normal"
                    >
                        Women
                    </a>
                    <a
                        href="#"
                        onMouseEnter={() => handleNavClick("Kids")}
                        className="font-Sweet-Regular text-[16px] font-normal"
                    >
                        Kids
                    </a>
                    <a
                        href="#"
                        onMouseEnter={() => handleNavClick("Accessories")}
                        className="font-Sweet-Regular text-[16px] font-normal"
                    >
                        Accessories
                    </a>
                </div>

                <div className="text-2xl">
                    <Image onClick={toHome} src={activeSection || pathName != "/" ? "/logo2.svg" : "/logo.svg"}
                        width={100} height={100} alt="logo" className="cursor-pointer" />
                </div>

                <div className="flex flex-row items-center justify-evenly gap-8">
                    <div onClick={handleNavigation} className="cursor-pointer font-Sweet-Regular text-[16px] font-normal ">
                        Tape Blog
                    </div>
                    <div onClick={toggleSearch} className="cursor-pointer font-Sweet-Regular text-[16px] font-normal flex flex-row items-center justify-center gap-3">
                        <Image src={activeSection || pathName != "/" ? "/navbarIcons/searchBlack.svg" : "/navbarIcons/searchWhite.svg"}
                            width={19} height={19} alt="logo" />Search
                    </div>
                    <Image onClick={toggleCart} src={activeSection || pathName != "/" ? "/navbarIcons/cartBlack.svg" : "/navbarIcons/cartWhite.svg"}
                        width={22} height={22} alt="logo" className="cursor-pointer" />
                </div>
            </nav>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div
                    ref={divRef} className="fixed top-0 left-0 bg-black bg-opacity-70 flex flex-col justify-center items-start w-screen z-50 "
                // Close overlay when clicking outside input box
                >
                    <div
                        className=" bg-white p-5 w-screen flex flex-row items-center justify-center  "
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside input box
                    >
                        <Image src="navbarIcons/searchBlack.svg" width={20} height={20} alt="logo" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-[1229px] h-[50px] p-3 text-[14px] font-normal font-Sweet-Regular border-[0px] focus:border-0  outline-none"
                        />
                        <button className="w-[19.88px] h-[15.9px] text-gray-600" onClick={closeSearch}>✕</button>
                        <Image src="navbarIcons/cartBlack.svg" width={19.74} height={17.88} alt="logo" className="mt-1 ml-10" />
                    </div>
                    <div className="bg-white w-screen flex flex-col items-center justify-center">
                        {/* <p className="text-[12px] font-normal font-Sweet-Regular">Sorry, we could not find any products matching your search.</p> */}
                        <div className="flex flex-row items-center justify-between w-[1229px] z-50 bg-white">
                            <p className="text-[24px] font-[500px] font-CLash-Regular">TOP RESULTS</p>
                            <p className="text-[12px] font-normal text-right font-Sweet-Regular">Show all results (20)</p>
                        </div>
                        <div className="overflow-y-scroll overflow-x-scroll h-screen mt-[-70px] mb-[300px]">
                            <CollectionSection itemsData={itemsData} showExploreButton={false} />
                            {/* <CollectionSection itemsData={itemsData} showExploreButton={false} />
                            <CollectionSection itemsData={itemsData} showExploreButton={false} />
                            <CollectionSection itemsData={itemsData} showExploreButton={false} />
                            <CollectionSection itemsData={itemsData} showExploreButton={false} />
                            <CollectionSection itemsData={itemsData} showExploreButton={false} /> */}
                        </div>
                    </div>

                </div>
            )}

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
                                                    <p>£{item.price}</p>
                                                    <p>£{item.size}</p>
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

            {/* Overlay Section */}
            {activeSection && (
                <Overlay section={activeSection} onClose={handleCloseOverlay} />
            )}
        </div>
    );
};

const Overlay = ({ section, onClose }) => {
    const router = useRouter();

    // Placeholder data for each section (replace with actual data)
    const sectionData = {
        Men: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546252/modal1_tdwpgr.png",
            categories: ["Branded T-shirts", "Street Wears"],
            sectionMapping: "VIEW ALL MEN'S PRODUCT",
        },
        Women: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1726482624/image_15_ujfj1n.png",
            categories: ["Branded T-shirts", "Street Wears"],
            sectionMapping: "VIEW ALL WOMEN'S PRODUCT",
        },
        Kids: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546251/modal3_mwkwaf.png",
            categories: ["Branded T-shirts", "Street Wears"],
            sectionMapping: "VIEW ALL KID'S PRODUCT",
        },
        Accessories: {
            image: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546254/modal2_txynj6.png",
            categories: ["Branded T-shirts", "Street Wears", "Caps", "Belts"],
            sectionMapping: "VIEW ALL ACCESSORIES",
        },
    };

    const { image, categories, sectionMapping } = sectionData[section];

    // Close overlay when clicking outside content
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Function to handle navigation to the specific collection page
    const navigateToCollection = () => {
        // Navigate to the collection page using the collection name
        router.push(`/collections/${encodeURIComponent(section)}`);
    };

    return (
        <div
            className="fixed bg-black bg-opacity-70 z-40 h-screen flex items-center justify-center"
            onClick={handleOverlayClick} // Close overlay on outside click
        >
            <div
                className="flex flex-row item justify-between relative bg-white text-black w-screen h-[400px] top-[-7rem]"
                onClick={(e) => e.stopPropagation()} // Prevent close on content click
            >
                {/* Close Button */}
                {/* <button
              x      className="hidden absolute top-4 right-4 text-black text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button> */}

                {/* Section Title */}
                <div className="w-1/2 m-10 flex flex-col gap-[50px]  items-start">
                    <h2 className="cursor-pointer text-[28px] font-[400px] font-CLash-Semibold text-center ml-[10rem]"
                        onClick={navigateToCollection} // Pass the navigation function as onClick prop
                    >{sectionMapping}</h2>
                    <ul className="gap-8 flex flex-col list-none ml-[10rem]">
                        {categories.map((category, index) => (
                            <li
                                key={index} className=" font-Sweet-Regular text-[16px]">{category}</li>
                        ))}
                    </ul>
                </div>

                {/* Content: Image and Categories */}
                <div className="flex">
                    {/* Image */}
                    <div className="w-[700px]">
                        <Image
                            src={image}
                            width={700}
                            height={400}
                            alt={`${section} section`}
                            className="w-full h-[400px]"
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
        </div >
    );
};



export default Navbar;

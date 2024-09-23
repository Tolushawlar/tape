"use client"
import React, { useCallback, useState } from 'react'
import HoverTextWithArrow from '../components/HoverText'
import Image from 'next/image'
import CartItem from '../components/CartItem'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import BillingRadio from "../components/BillingRadio"
import { useGlobalState } from '../../../GlobalStateContext';
import { useCart } from '../../../cartContext'

const Checkout = () => {
    const { globalState, setGlobalState } = useGlobalState();
    const [selectedCountry, setSelectedCountry] = useState("COUNTRY");
    const [selectedState, setSelectedState] = useState("STATE");
    const handleSelect = (country) => {
        setSelectedCountry(country);
    };


    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = ['Save this information for next time'];
    const [selectedOption, setSelectedOption] = useState('');
    const optionsRadio = ['   LAGOS STATE, NIGERIA ONLY - DHL', '    OTHER STATES - DHL'];



    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleOptionChange2 = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You selected: ${selectedOption}`);
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        alert(`You selected: ${selectedOption}`);
    };

    const { cartItems, removeFromCart, clearCart } = useCart();

    // const handleState = useCallback((stateNig) => {
    //     setSelectedState(prevState => ({
    //         ...prevState,
    //         selectedState: stateNig,
    //     }));
    // }, [setSelectedState]);
    const handleState = useCallback((stateNig) => {
        setSelectedState(stateNig);  // Store only the string value
    }, [setSelectedState]);

    return (
        <div className={`${globalState ? 'fixed left-[13rem] ' : ''}  overflow-x-hidden`}>
            <div className='flex flex-row items-start justify-center gap-[100px] mt-10'>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-[18px] font-[900] font-CLash-Regular ">CHECKOUT</h2>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-5 mt-2 ">
                        <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1726134723/Frame_1000004497_a0djka.svg" width={28.98} height={26.69} alt="logo" />
                        <p className="font-Sweet-Regular text-[12px] font-normal">Your order is almost ready to be shipped. Kindly enter correct details below to place your order.</p>
                    </div>
                    <div className='mt-[40px]'>
                        <h2 className="text-[14px] font-[700] font-CLash-Regular mb-4 ">DELIVERY</h2>
                        <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[620px] h-[46px]">
                            <div>
                                <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                    <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>{selectedCountry}</p>
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                                </MenuButton>
                            </div>

                            <MenuItems transition>
                                <div className="py-1 mt-2 w-[620px] text-left z-50">
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Nigeria")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Nigeria
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Ghana")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Ghana
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Kenya")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Kenya
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("South Africa")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            South Africa
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Egypt")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Egypt
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Uganda")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Uganda
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                        <div className="flex flex-row items-center justify-between gap-3 mt-3">
                            <input className="border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[303px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='FIRST NAME' />
                            <input className="border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[303px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='LAST NAME' />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-3 mt-3">
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[303px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='EMAIL ADDRESS' />
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[303px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='PHONE NUMBER  ' />
                        </div>
                        <input className="border-[0.76px] border-black items-center flex pl-4 mt-3 focus:outline-none text-black bg-white w-[620px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder=' ADDRESS' />
                        <input className="border-[0.76px] border-black items-center flex  pl-4 mt-3 focus:outline-none text-black bg-white w-[620px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='APARTMENT, SUITES, FLAT, ECT (OPTIONAL)' />
                        <div className="flex flex-row items-center justify-between gap-3 mt-3">
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[196px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='CITY' />
                            <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[196px] h-[46px]">
                                <div>
                                    <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                        <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>{selectedState}</p>
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                                    </MenuButton>
                                </div>
                                <MenuItems transition>
                                    <div className="py-1 mt-2 w-[196px] text-left z-50 max-h-[600px] overflow-y-auto">
                                        {[
                                            "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
                                            "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
                                            "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
                                            "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
                                        ].map((stateNig) => (
                                            <MenuItem key={stateNig} className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                <a
                                                    href="#"
                                                    onClick={() => handleState(stateNig)}
                                                    className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                >
                                                    {stateNig}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>

                            </Menu>
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[196px] h-[46px] text-[12px] font-400 font-CLash-Regular " placeholder='POSTAL CODE  ' />
                        </div>
                    </div>

                    <div className='mt-7 text-[12px] font-Sweet-Regular font-normal gap-2'>
                        {/* <h3>Select options:</h3> */}
                        {options.map((option) => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    // className='focus:outline-0 border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[303px] h-[46px] text-[12px] font-[400] font-CLash-Regular '
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                        {/* <p>Selected: {selectedOptions.join(', ')}</p> */}
                    </div>


                    <form onSubmit={handleSubmit} className='mt-10'>
                        <h2 className="text-[14px] font-[700] font-CLash-Regular mb-4 ">SHIPPING METHOD</h2>
                        <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white   w-[620px] h-[46px]  text-[12px] font-400 font-CLash-Regular flex flex-row items-center gap-3 pl-4 mb-3'      >
                            <label className='flex flex-row items-center'>
                                <input
                                    type="radio"
                                    value="Option 1"
                                    checked={selectedOption === 'Option 1'}
                                    onChange={handleOptionChange}
                                />
                                <div className='ml-2'>LAGOS STATE, NIGERIA ONLY - DHL</div>
                            </label>
                        </div>
                        <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white   w-[620px] h-[46px]  text-[12px] font-400 font-CLash-Regular flex flex-row items-center gap-3 pl-4 mb-3'      >
                            <label className='flex flex-row items-center'>
                                <input
                                    type="radio"
                                    value="Option 2"
                                    checked={selectedOption === 'Option 2'}
                                    onChange={handleOptionChange}
                                />
                                <div className='ml-2'>OTHER STATES - DHL</div>
                            </label>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className='mt-10'>
                        <h2 className="text-[14px] font-[700] font-CLash-Regular  ">PAYMENT</h2>
                        <p className='text-[12px] font-[400] font-Sweet-Regular mb-4'>All transactions are secure and encrypted</p>
                        <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white   w-[620px] h-[62px]  text-[12px] font-400 font-CLash-Regular flex flex-row items-center gap-3 pl-4 mb-3'      >
                            <label className='flex flex-row items-center justify-center'>
                                <input
                                    type="radio"
                                    value="Option 1"
                                    checked={selectedOption === 'Option 1'}
                                    onChange={handleOptionChange}
                                />
                                <div className='mt-2 ml-2 flex flex-col items-start justify-center gap-[-30px]'>
                                    <div className='flex flex-row items-center justify-between w-[550px]'>
                                        <p>PAYSTACK</p>
                                        <div className='flex flex-row gap-2'>
                                            <Image src="/footerIcons/image 2.png" width={29.96} height={10.44} alt="footer icon" />
                                            <Image src="/footerIcons/Group 12.png" width={29.96} height={10.44} alt="footer icon" />
                                        </div>
                                    </div>
                                    <p className='text-[10px] font-[400] font-Sweet-Regular mb-4'>After clicking “PAY NOW”, you will be redirected to Paystack to complete your purchase securely.</p>
                                </div>
                            </label>
                        </div>
                        <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white   w-[620px] h-[46px]  text-[12px] font-400 font-CLash-Regular flex flex-row items-center gap-3 pl-4 mb-3'      >
                            <label className='flex flex-row items-center'>
                                <input
                                    type="radio"
                                    value="Option 2"
                                    checked={selectedOption === 'Option 2'}
                                    onChange={handleOptionChange}
                                />
                                <div className='ml-2'>BANK DEPOSIT</div>
                            </label>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit2} className='mt-10 mb-10'>
                        <h2 className="text-[14px] font-[700] font-CLash-Regular mb-4 ">BILLING ADDRESS</h2>
                        <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white   w-[620px] h-[46px]  text-[12px] font-400 font-CLash-Regular flex flex-row items-center gap-3 pl-4 mb-3'      >
                            <label className='flex flex-row items-center'>
                                <input
                                    type="radio"
                                    value="Option 3"
                                    checked={selectedOption === 'Option 3'}
                                    onChange={handleOptionChange2}
                                />
                                <div className='ml-2'>SAME AS BILLING ADDRESS</div>
                            </label>
                        </div>
                        <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white  w-[620px] h-[420px]  text-[12px] font-400 font-CLash-Regular flex flex-col items-start gap-1 p-4'      >
                            <div className='flex flex-row items-center'>
                                <label className='flex flex-row items-center'>
                                    <input
                                        type="radio"
                                        value="Option 4"
                                        checked={selectedOption === 'Option 4'}
                                        onChange={handleOptionChange2}
                                    />
                                </label>
                                <div className='ml-2'>ENTER A DIFFERENT BILLING ADDRESS</div>
                            </div>
                            <div className="flex flex-col">
                                <div className='mt-[30px]'>
                                    <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[588px] h-[46px]">
                                        <div>
                                            <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                                <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>{selectedCountry}</p>
                                                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                                            </MenuButton>
                                        </div>

                                        <MenuItems transition>
                                            <div className="py-1 mt-2  w-[588px] text-left z-50">
                                                <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSelect("Nigeria")}
                                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                    >
                                                        Nigeria
                                                    </a>
                                                </MenuItem>
                                                <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSelect("Ghana")}
                                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                    >
                                                        Ghana
                                                    </a>
                                                </MenuItem>
                                                <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSelect("Kenya")}
                                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                    >
                                                        Kenya
                                                    </a>
                                                </MenuItem>
                                                <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSelect("South Africa")}
                                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                    >
                                                        South Africa
                                                    </a>
                                                </MenuItem>
                                                <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSelect("Egypt")}
                                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                    >
                                                        Egypt
                                                    </a>
                                                </MenuItem>
                                                <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleSelect("Uganda")}
                                                        className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                    >
                                                        Uganda
                                                    </a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                    <div className="flex flex-row items-center justify-start gap-4 mt-3">
                                        <input className="border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='FIRST NAME' />
                                        <input className="border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='LAST NAME' />
                                    </div>
                                    <div className="flex flex-row items-center justify-start gap-4 mt-3">
                                        <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='EMAIL ADDRESS' />
                                        <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='PHONE NUMBER  ' />
                                    </div>
                                    <input className="border-[0.76px] border-black items-center flex pl-4 mt-3 focus:outline-none text-black bg-white  w-[588px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder=' ADDRESS' />
                                    <input className="border-[0.76px] border-black items-center flex  pl-4 mt-3 focus:outline-none text-black bg-white  w-[588px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='APARTMENT, SUITES, FLAT, ECT (OPTIONAL)' />
                                    <div className="flex flex-row items-center justify-between gap-3 mt-3">
                                        <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[185.88px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='CITY' />
                                        <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[185.88px] h-[46px]">
                                            <div>
                                                <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                                    <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>{selectedState}</p>
                                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                                                </MenuButton>
                                            </div>

                                            <MenuItems transition>
                                                <div className="py-1 mt-2 w-[185.88px] h-[46px] text-left z-50">
                                                    {["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"].map((stateNig) => (
                                                        <MenuItem key={stateNig} className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                            <a
                                                                href="#"
                                                                onClick={() => handleState(stateNig)}
                                                                className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                            >
                                                                {stateNig}
                                                            </a>
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                        <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[185.88px] h-[46px] text-[12px] font-400 font-CLash-Regular " placeholder='POSTAL CODE  ' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row items-center justify-center cursor-pointer bg-[#0244B4] mt-[50px] text-center text-white w-[620px] h-[61px]  font-400 text-[14px] font-CLash-Regular'>
                            PAY NOW
                        </div>
                    </form>

                </div>
                <div className='flex flex-col items-center justify-center w-[449.23px]'>
                    <div className="flex flex-row items-center justify-between w-[449px]">
                        <p className="text-[16px] font-[600]">IN YOUR CART</p>
                        <HoverTextWithArrow
                            text="Back to shopping"
                            textColor="text-black"
                        />
                    </div>
                    {/* <CartItem />
                    <CartItem />
                    <CartItem /> */}
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
                    <div className="flex flex-row items-center justify-center gap-5 mt-10">
                        <input className='w-[307px] h-[46px] border-[0.76px] border-black text-[12px] font-400 font-CLash-Regular pl-4' placeholder='ENTER DISCOUNT CODE (OPTIONAL)' />
                        <div className='flex flex-row items-center justify-center cursor-pointer bg-[#0244B4]  text-center text-white w-[120px] h-[46px]  font-400 text-[14px] font-CLash-Regular'>
                            APPLY
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full mt-7">
                        <p className='text-[10px] font-400 font-Sweet-Regular'>Subtotal (2 items)</p>
                        <h3 className='text-[14px] font-500 font-CLash-Regular'>₦77,000.00</h3>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full mt-4">
                        <p className='text-[10px] font-400 font-Sweet-Regular'>Shipping</p>
                        <h3 className='text-[14px] font-500 font-CLash-Regular'>₦7,000.00</h3>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full mt-4">
                        <h3 className='text-[14px] font-500 font-CLash-Regular'>TOTAL</h3>
                        <h3 className='text-[14px] font-500 font-CLash-Regular'>₦7,000.00</h3>
                    </div>
                    <p className="font-400 text-[10px] font-Sweet-Regular text-center mt-4">Including ₦4,918.60 in taxes</p>

                </div>
            </div>
        </div>

    )
}

export default Checkout
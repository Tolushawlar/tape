"use client"
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import React from 'react';
import Image from "next/image";
import { useGlobalState } from "../../../GlobalStateContext";

const Footer = () => {
    const { globalState, setGlobalState } = useGlobalState();

    return (
        <div className={` ${globalState ? "hidden" : "" } flex flex-col items-center justify-center bg-[#000000] h-[414px] w-screen text-white`}>
            <div className="flex md:flex-row flex-col items-center justify-between w-[1148px] mb-4">
                <div className='flex flex-row items-center justify-between md:w-[723px] w-[360px] text-[12px] font-normal'>
                    <p>Shipping to Nigeria</p>
                    <p>About Us</p>
                    <p>Tape Blog</p>
                    <p>Help</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                </div>
                <div className='flex space-x-6 justify-center items-center py-4 w-[146px]'>
                    {/* LinkedIn Icon */}
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="w-[15.81px] h-[15.81px] text-white hover:text-blue-900" />
                    </a>
                    {/* Instagram Icon */}
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="w-[15.81px] h-[15.81px] text-white hover:text-pink-700" />
                    </a>
                    {/* Twitter Icon */}
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="w-[15.81px] h-[15.81px] text-white hover:text-blue-600" />
                    </a>
                    {/* Facebook Icon */}
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="w-[15.81px] h-[15.81px] text-white hover:text-blue-800" />
                    </a>
                </div>
            </div>
            <hr className='w-[1148px]' />
            <div className="flex md:flex-row flex-col items-center justify-between w-[1148px] my-[60px]">
                <div className='flex flex-row items-center justify-between w-[614px] h-[47.72px]'>
                    <div className="text-[12px] font-normal">Payment Methods - </div>
                    <Image src="/footerIcons/image 2.png" width={54.88} height={16.7} alt="footer icon" />
                    <Image src="/footerIcons/Group 12.png" width={54.91} height={42.95} alt="footer icon" />
                    <Image src="/footerIcons/image 3.png" width={48.05} height={47.72} alt="footer icon" />
                    <Image src="/footerIcons/image 4.png" width={54.54} height={24.08} alt="footer icon" />
                    <Image src="/footerIcons/image 5.png" width={71.59} height={18.42} alt="footer icon" />
                    <Image src="/footerIcons/image 6.png" width={109.9} height={23.67} alt="footer icon" />
                </div>
                <div className="flex flex-row items-center justify-between md:w-[362px] w-[300px] h-[40px]">
                    <p className="text-[12px] text-normal">
                        Subscribe
                    </p>
                    <div className="flex flex-row items-center justify-center w-[284px] border rounded-[1px] ">
                        <input className="w-[284px] h-[40px] text-white px-[17px] py-[13px] bg-black text-[12px] text-normal focus:outline-none focus:border-none" placeholder="Enter Email Address" />
                        <p className="text-[12px] text-normal mr-5">SEND</p>
                    </div>
                </div>
            </div>
            <div className="text-[12px] font-normal">© 2024 Tape Wears. All Rights Reserved</div>
        </div>
    )
}

export default Footer
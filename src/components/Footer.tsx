"use client";

import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import React from "react";
import Image from "next/image";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Footer() {
  const { globalState } = useGlobalState();

  return (
    <footer
      className={`${
        globalState ? "hidden" : ""
      } bg-black text-white py-8 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs mb-6 md:mb-0">
            <p>Shipping to Nigeria</p>
            <p>About Us</p>
            <p>Tape Blog</p>
            <p>Help</p>
            <p>Privacy</p>
            <p>Terms</p>
          </div>
          <div className="flex space-x-6 justify-center items-center">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-4 h-4 text-white hover:text-blue-900" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-4 h-4 text-white hover:text-pink-700" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-4 h-4 text-white hover:text-blue-600" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-4 h-4 text-white hover:text-blue-800" />
            </a>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-xs">Payment Methods -</div>
            <div className="flex flex-wrap justify-center gap-4">
              <Image
                src="/footerIcons/image 2.png"
                width={55}
                height={17}
                alt="Payment method"
              />
              <Image
                src="/footerIcons/Group 12.png"
                width={55}
                height={43}
                alt="Payment method"
              />
              <Image
                src="/footerIcons/image 3.png"
                width={48}
                height={48}
                alt="Payment method"
              />
              <Image
                src="/footerIcons/image 4.png"
                width={55}
                height={24}
                alt="Payment method"
              />
              <Image
                src="/footerIcons/image 5.png"
                width={72}
                height={18}
                alt="Payment method"
              />
              <Image
                src="/footerIcons/image 6.png"
                width={110}
                height={24}
                alt="Payment method"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs">Subscribe</p>
            <div className="flex items-center border rounded-sm">
              <input
                className="w-full sm:w-64 h-10 px-4 py-2 bg-black text-white text-xs focus:outline-none"
                placeholder="Enter Email Address"
              />
              <button className="px-4 py-2 text-xs">SEND</button>
            </div>
          </div>
        </div>

        <div className="text-xs text-center mt-8">
          © 2024 Tape Wears. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

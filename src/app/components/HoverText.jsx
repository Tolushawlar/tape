"use client";

import { AiOutlineArrowRight } from "react-icons/ai";
import React from "react";

const HoverTextWithArrow = ({ text, textColor = "white", onClick }) => {
    return (
        <div className="relative group inline-block">
            {/* Text that transitions on hover */}
            <span
                onClick={onClick} // Add onClick event
                className={`hover:ml-3 hover:mt-[80px] transform group-hover:translate-x-20 group-hover:translate-y-20 duration-500 ease-in-out cursor-pointer font-[400] text-[14px] group-hover:underline hover:origin-top-right  group-hover:transition`}
                style={{ color: textColor }}  // Dynamically apply the text color
            >
                {text}
            </span>

            {/* Right arrow icon that hides on hover */}
            <AiOutlineArrowRight
                className={`inline-block ml-2 transition-opacity duration-300 ease-in-out group-hover:opacity-0`}
                style={{ color: textColor }}  // Dynamically apply the text color
            />
        </div>
    );
};

export default HoverTextWithArrow;

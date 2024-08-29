"use client";

import { AiOutlineArrowRight } from "react-icons/ai";
import React from "react";

const HoverTextWithArrow = ({ text, textColor = "white" }) => {
    return (
        <div className="relative group inline-block">
            {/* Text that transitions on hover */}
            <span
                className={`cursor-pointer font-[400] text-[14px] transition-all duration-300 ease-in-out transform group-hover:underline group-hover:translate-y-2 hover:translate-x-2 group-hover:translate-x-1`}
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

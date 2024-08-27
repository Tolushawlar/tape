"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./carousel.css";
import Navbar from "./Navabar";
import Image from "next/image";

export default () => {

    const images = [
        "/slide1.png",
        "/slide2.png",
        "/slide3.png",
        "/slide4.png",
        "/slide5.png",
    ];

    const [sliderRef] = useKeenSlider({
        loop: true,
        created(slider) {
            let timeout;

            function nextTimeout() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    slider.next();
                }, 3000); // Adjust the delay as needed
            }

            slider.on("animationEnded", nextTimeout);
            slider.on("updated", nextTimeout);
            nextTimeout();
        },
    });

    return (
        <>
            <div ref={sliderRef} className="keen-slider h-screen">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="keen-slider__slide relative flex items-center justify-center h-screen bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <p className="text-red-800 text-3xl">Slide {index + 1}</p>
                    </div>
                ))}
            </div>
            <div className="absolute top-0 left-0 right-0 z-20">
                <Navbar />
            </div>
        </>
    );
};

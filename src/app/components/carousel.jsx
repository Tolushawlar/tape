"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./carousel.css";
import Navbar from "./Navbar";

const Carousel = () => {  // Give the component a display name

    const images = [
        "/slide2.png",
        "/slide4.png",
        "/slide3.png",
        "/slide1.png",
        "/slide3.png",
    ];

    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,  // Show one image at a time
        },
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
        <div ref={sliderRef} className="keen-slider h-screen overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="keen-slider__slide relative flex items-center justify-center h-screen bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <p className="text-center text-[40px] text-white font-[500] font-CLash-Regular leading-[36px]">A Permanent Collection. Endless variation.</p>
                </div>
            ))}
        </div>
    );
};

export default Carousel;

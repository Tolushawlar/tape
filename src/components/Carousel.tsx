"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Carousel = () => {
  const images = [
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545084/slide2_iji1kd.png",
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545088/slide4_dkdulg.png",
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545099/slide3_dtcv4j.png",
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545088/slide1_yuubmf.png",
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545099/slide3_dtcv4j.png",
  ];

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1, // Show one image at a time
    },
    created(slider) {
      let timeout: ReturnType<typeof setTimeout>;

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
          <p className="text-center text-[40px] text-white font-[500] font-CLash-Regular leading-[36px]">
            A Permanent Collection. Endless variation.
          </p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;

"use client";

import HoverTextWithArrow from "./HoverText";
import { useRouter } from "next/navigation";

function InfoHero() {
  const { push } = useRouter();

  const toAbout = () => {
    push("/about");
  };

  return (
    <div
      className="bg-cover bg-center md:h-[645px] h-[600px] flex flex-row items-center justify-center"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545892/image_1_vhyzms.png")`,
      }}
    >
      <div className="md:w-1/3 w-0  h-[645px]"></div>
      <div className="bg-[#CF0028] md:w-1/3 w-full  h-[645px] flex flex-col justify-between items-center text-white p-10">
        <div>
          <p className="text-center text-[16px] font-[600] my-10">
            KNOW YOUR WEARS
          </p>
          <p className="text-center text-[14px] font-[400] w-[194px] h-[407px] my-10">
            At the core of Tape Wears is a strong community. We create fashion
            that connects people who share the same passion for authenticity,
            heritage, and style. Whether through our designs or exclusive
            events, Tape Wears is a place where inclusivity and community thrive
          </p>
        </div>
        <div>
          <div onClick={toAbout} className="mb-[80px]">
            <HoverTextWithArrow text="Join our Community" />
          </div>
        </div>
      </div>
      <div className=" md:w-1/3 w-0  h-[645px]"></div>
    </div>
  );
}

export default InfoHero;

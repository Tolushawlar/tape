"use client"
import React from 'react'
import HoverTextWithArrow from './HoverText'
import { usePathname, useRouter } from 'next/navigation';

function InfoHero() {
    const router = useRouter();
    const pathName = usePathname();

    const toAbout = () => {
        router.push("/About")
    }

    return (
        <div className='bg-cover bg-center md:h-[645px] h-[600px] flex flex-row items-center justify-center ' style={{ backgroundImage: `url("https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545892/image_1_vhyzms.png")` }}>
            <div className="md:w-1/3 w-0  h-[645px]"></div>
            <div className="bg-[#CF0028] md:w-1/3 w-full  h-[645px] flex flex-col justify-between items-center text-white p-10">
                <div>
                    <p className='text-center text-[16px] font-[600] my-10'>KNOW YOUR WEARS</p>
                    <p className='text-center text-[14px] font-[400] w-[194px] h-[407px] my-10'>Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius hendrerit facilisis vitae massa.</p>
                </div>
                <div>
                    <div onClick={toAbout} className="mb-[80px]"><HoverTextWithArrow text="About TAPE WEARS" /></div>
                </div>
            </div>
            <div className=" md:w-1/3 w-0  h-[645px]"></div>
        </ div>
    )
}

export default InfoHero
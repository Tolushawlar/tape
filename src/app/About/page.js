"use client"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import HoverTextWithArrow from '../components/HoverText';

function About() {
    const router = useRouter();
    const pathName = usePathname();

    const toAbout = () => {
        router.push("/About")
    }
    return (
        <div>
            <div className='bg-cover bg-center w-screen h-[484px] flex flex-row items-center justify-center text-center' style={{ backgroundImage: `url("/about/top.png")` }}>
                <p className="text-[36px] font-Bold font-CLash-Regular text-white mt-10">ABOUT TAPE</p>
            </ div>
            <div className="bg-white flex flex-col justify-center text-center h-[224px] px-[500px] py-[200px]">
                <p className='text-[24px] font-bold font-CLash-Regular'>One Tape, Many Wears</p>
                <p className="text-[12px] font-normal font-Sweet-Regular leading-[27.84px]  text-justify mt-5">Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius hendrerit facilisis vitae massa. Tellus augue eget sit enim blandit faucibus. Dolor aliquam lectus tincidunt lacus lorem nam. Elit id aliquet eget maecenas id lacinia. Ultrices ullamcorper aliquet fermentum at potenti placerat sed sit. Nunc augue aenean amet lobortis mattis curabitur risus diam sit. Ipsum pellentesque rhoncus ultrices sollicitudin fusce eget mauris tincidunt ipsum.</p>
            </div>
            <div className='bg-cover bg-center w-screen h-[484px] flex flex-row items-start justify-start text-center' style={{ backgroundImage: `url("/about/image 1.png")` }}>
                <div className='flex flex-col items-start justify-start gap-[200px] bg-black  w-[520px] h-[484px] '>
                    <div className=' flex flex-col items-start justify-start gap-5 px-10 py-10 '>
                        <p className="text-[16px] font-[600px] font-CLash-Regular text-white text-left">BUY LESS, BUT BETTER</p>
                        <p className='text-[14px] font-normal font-Sweet-Regular text-white text-left'>Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius hendrerit facilisis vitae massa. </p>
                    </div>
                    <div className='px-10'>
                        <div onClick={toAbout} ><HoverTextWithArrow text="About TAPE WEARS" /></div>
                    </div>
                </div>
            </ div>
            <div className='bg-cover bg-center h-[645px] flex flex-row items-center justify-center  z-50' style={{ backgroundImage: `url("/about/image (13).png")` }}>
                <div className=" w-1/3  h-[645px]"></div>
                <div className="bg-[#CF0028] w-[550px]  h-[645px] flex flex-col justify-between items-center text-white p-10">
                    <div>
                        <p className='text-center text-[16px] font-[600] my-10'>KNOW YOUR WEARS</p>
                        <p className='text-center text-[14px] font-[400] w-[194px] h-[407px] my-10'>Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius hendrerit facilisis vitae massa.</p>
                    </div>
                    <div>
                        <div onClick={toAbout} className="mb-[80px]"><HoverTextWithArrow text="About TAPE WEARS" /></div>
                    </div>
                </div>
                <div className=" w-1/3  h-[645px]"></div>
            </ div>
            <div className='bg-cover bg-center w-screen h-[484px] flex flex-row items-end justify-end text-center' style={{ backgroundImage: `url("/about/image (14).png")` }}>
                <div className='flex flex-col items-start justify-start gap-[200px] bg-[#082A63]  w-[540px] h-[484px] '>
                    <div className=' flex flex-col items-start justify-start gap-5 px-10 py-10 '>
                        <p className="text-[16px] font-[600px] font-CLash-Regular text-white text-left">WEAR EACH ITEM, LONGER</p>
                        <p className='text-[14px] font-normal font-Sweet-Regular text-white text-left'>Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius hendrerit facilisis vitae massa. </p>
                    </div>
                    <div className='px-10'>
                        <div onClick={toAbout} ><HoverTextWithArrow text="About TAPE WEARS" /></div>
                    </div>
                </div>
            </ div>
        </div>
    )
}

export default About
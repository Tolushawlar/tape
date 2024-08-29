import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import HoverTextWithArrow from './HoverText'

function InfoFooter() {
    return (
        <div className='bg-cover bg-center h-[496px] flex flex-col justify-end ' style={{ backgroundImage: `url("/image.png")` }}>
            <div className='ml-[150px] mb-10'>
                <p className='text-[36px] font-[500] text-white'>LASTING ACCESSORIES</p>
                <HoverTextWithArrow text="Explore today" />
            </div>
        </ div>
    )
}
export default InfoFooter
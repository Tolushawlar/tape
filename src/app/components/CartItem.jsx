import Image from 'next/image'
import React from 'react'

function CartItem() {
    return (
        <div className='flex flex-row items-center justify-start  gap-10 mt-10 w-full'>
            <Image src="https://res.cloudinary.com/dtlxunbzr/image/upload/v1725546254/modal2_txynj6.png" width={87.7} height={86.93} alt="logo" />
            <div className='flex flex-col items-start justify-start h-[88.46px]'>
                <p className='font-CLash-Regular font-[600] text-[16px] leading-[14px] text-left '>OVERSHIRT T-SHIRT</p>
                <p className='text-[10px]  font-normal font-Sweet-Regular mt-3 mb-5 text-left'>Size: XXL</p>
                <div className='flex flex-row items-center justify-between gap-6'>
                    <div className='flex flex-row items-center justify-center gap-2 '>
                        <p className='font-normal font-Sweet-Regular text-[14px] cursor-pointer'>-</p>
                        <p className='font-normal font-Sweet-Regular text-[14px] cursor-pointer '>1</p>
                        <p className='font-normal font-Sweet-Regular text-[14px] cursor-pointer'>+</p>
                    </div>
                    <p className='font-CLash-Regular font-[600] text-[14px] ml-[100px]'>₦38,500.00</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem
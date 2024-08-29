import React from 'react'
import HoverTextWithArrow from './HoverText'

function InfoHero() {
    return (
        <div className='bg-cover bg-center h-[645px] flex flex-row items-center justify-center ' style={{ backgroundImage: `url("/image (1).png")` }}>
            <div className=" w-1/3  h-[645px]"></div>
            <div className="bg-[#CF0028] w-1/3  h-[645px] flex flex-col justify-between items-center text-white p-10">
                <div>
                    <p className='text-center text-[16px] font-[600] my-10'>KNOW YOUR WEARS</p>
                    <p className='text-center text-[14px] font-[400] w-[194px] h-[407px] my-10'>Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus odio donec varius hendrerit facilisis vitae massa.</p>
                </div>
                <div>
                    <div className="mb-[80px]"><HoverTextWithArrow text="About TAPE WEARS" /></div>
                </div>
            </div>
            <div className=" w-1/3  h-[645px]"></div>
        </ div>
    )
}

export default InfoHero
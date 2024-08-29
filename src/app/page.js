import React from 'react'
import Carousel from './components/carousel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import InfoFooter from './components/InfoFooter'
import InfoHero from './components/InfoHero'
import ItemsCard from "./components/ItemsCard"
import HoverTextWithArrow from './components/HoverText'

function Homepage() {
  return (
    <>
      <>
        <Carousel />
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>
      </>
      <InfoHero />
      <div className='flex flex-col items-center justify-between w-screen h-[418px] mt-[80px] mb-[80px]'>
        <div className='flex flex-row items-center justify-between w-[1116px]'>
          <p className='text-[16px] font-[600]'>MEN’S COLLECTION</p>
          <HoverTextWithArrow text="Explore Now" textColor="text-black"/>
        </div>
        <div className='flex flex-row items-center justify-evenly w-[1116px] h-[368px]'>
          <ItemsCard />
          <ItemsCard />
          <ItemsCard />
          <ItemsCard />
        </div>
      </div>
      <InfoFooter />
      <Footer />
    </>
  )
}

export default Homepage
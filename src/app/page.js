import React from 'react'
import Carousel from './components/carousel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import InfoFooter from './components/InfoFooter'
import InfoHero from './components/InfoHero'
import ItemsCard from "./components/ItemsCard"
import HoverTextWithArrow from './components/HoverText'
import CollectionSection from './components/CollectionSection'

const itemsData = [
  {
    name: "Dope Like Coke Tee",
    defaultImage: "/cardImage/cardImage.png",
    hoverImage: "/cardImage/cardImage2.png",
    price: "₦35,000.00",
  },
  {
    name: "Cool Summer Shirt",
    defaultImage: "/cardImage/cardImage3.png",
    hoverImage: "/cardImage/image5.png",
    price: "₦40,000.00",
  },
  {
    name: "Dope Like Coke Tee",
    defaultImage: "/cardImage/image9.png",
    hoverImage: "/cardImage/image2.png",
    price: "₦35,000.00",
  },
  {
    name: "Cool Summer Shirt",
    defaultImage: "/cardImage/image11.png",
    hoverImage: "/cardImage/image2.png",
    price: "₦40,000.00",
  },
];

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
      <CollectionSection collectionName="MEN’S COLLECTION" itemsData={itemsData} />
      <InfoFooter />
      <Footer />
    </>
  )
}

export default Homepage
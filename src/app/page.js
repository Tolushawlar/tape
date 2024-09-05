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
    defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png",
    hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
    price: "₦35,000.00",
  },
  {
    name: "Cool Summer Shirt",
    defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545533/cardImage3_j4z4fg.png",
    hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image5_aa1sje.png",
    price: "₦40,000.00",
  },
  {
    name: "Dope Like Coke Tee",
    defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545538/image9_kdgq90.png",
    hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
    price: "₦35,000.00",
  },
  {
    name: "Cool Summer Shirt",
    defaultImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545539/image11_a1lhru.png",
    hoverImage: "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545535/image2_a9jjmi.png",
    price: "₦40,000.00",
  },
];

function Homepage() {
  return (
    <>
      <>
        <Carousel />
        {/* <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div> */}
      </>
      <InfoHero />
      <CollectionSection collectionName="MEN’S COLLECTION" itemsData={itemsData} />
      <InfoFooter />
    </>
  )
}

export default Homepage
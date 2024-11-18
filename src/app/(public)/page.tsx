import { Carousel2 } from "@/components/Carousel2";
import CollectionSection from "@/components/CollectionSection";
import InfoFooter from "@/components/InfoFooter";
import InfoHero from "@/components/InfoHero";
import { itemsData } from "@/constants";

const Homepage = () => {
  return (
    <div>
      <div>
        <Carousel2 />
        {/* <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div> */}
      </div>

      <InfoHero />
      <CollectionSection collectionName="MEN" itemsData={itemsData} />
      <CollectionSection collectionName="WOMEN" itemsData={itemsData} />
      <CollectionSection collectionName="KIDS" itemsData={itemsData} />
      <CollectionSection collectionName="ACCESSORIES" itemsData={itemsData} />
      <InfoFooter />
    </div>
  );
};

export default Homepage;

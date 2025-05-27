"use client";

import { useRouter } from "next/navigation";

import HoverTextWithArrow from "./HoverText";
import ImageCard, { ImageCardProps } from "./ItemsCard";

interface CollectionSectionProps {
  collectionName: string;
  itemsData: ImageCardProps[];
  showExploreButton?: boolean;
}

const CollectionSection = ({
  collectionName,
  itemsData,
  showExploreButton = true,
}: CollectionSectionProps) => {
  const router = useRouter();

  // Function to handle navigation to the specific collection page
  const navigateToCollection = () => {
    // Navigate to the collection page using the collection name
    router.push(`/collections/${encodeURIComponent(collectionName)}`);
  };

  return (
    <div className="flex flex-col items-center justify-between w-screen h-full mt-[80px] md:mb-[80px] px-8 xl:px-0">
      <div className="flex md:flex-row flex-col items-center justify-between w-full max-w-[1280px]">
        <p className="text-[18px] font-[700] tracking-wider">
          {collectionName}
        </p>
        {showExploreButton && itemsData.length > 0 && (
          <HoverTextWithArrow
            text="Browse"
            textColor="text-black"
            onClick={navigateToCollection} // Pass the navigation function as onClick prop
          />
        )}
      </div>
      {itemsData.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center w-full max-w-[1280px]">
          {itemsData.map((item, index) => (
            <ImageCard
              id={item.id}
              key={index}
              name={item.name}
              defaultImage={item.defaultImage}
              hoverImage={item.hoverImage}
              color1={item.color1}
              price={item.price}
              size1={item.size1}
              size2={item.size2}
              size3={item.size3}
              size4={item.size4}
              size5={item.size5}
            />
          ))}
        </div>
      ) : (
        <p className="text-2xl font-bold mt-8">Coming Soon</p>
      )}
    </div>
  );
};

export default CollectionSection;

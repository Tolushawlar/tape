"use client";
import ImageCard from "@/components/ItemsCard";
// import { itemsData } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  color1: string;
  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
  category: string;
  subcategory: string;
  id: string; // Include _id for potential future use
  name: string;
  image: {
    path: string;
  };
  image2: {
    path: string;
  };
  price: string;
}

const CollectionPage = ({ params }: { params: { collectionName: string } }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [items2, setItems2] = useState<Item[]>([]);
  const { collectionName } = params;
  const [isLoading, setIsLoading] = useState(false);

  const decodedCollectionName = decodeURIComponent(collectionName);
  // const capitalizedText =
  //   decodedCollectionName.charAt(0).toUpperCase() +
  //   decodedCollectionName.slice(1).toLowerCase();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product`
        );
        console.log("API Response:", response.data); // Log response
        setItems(response.data); // Ensure this matches Item[]
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [decodedCollectionName]);
  // filter the data from the API
  useEffect(() => {
    const capitalizedText =
      decodedCollectionName.charAt(0).toUpperCase() +
      decodedCollectionName.slice(1).toLowerCase();

    const filteredItems = items.filter((item: Item) => {
      const category = item.category || "";
      const subcategory = item.subcategory || "";
      return (
        category.toLowerCase() === capitalizedText.toLowerCase() ||
        subcategory.toLowerCase() === capitalizedText.toLowerCase()
      );
    });

    setItems2(filteredItems);
  }, [items, decodedCollectionName]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="font-[600] md:text-[32px] text-[30px] font-CLash-Regular">
          {decodedCollectionName}
        </p>
        <p className="font-[400] text-[14px] font-Sweet-Regular text-center md:w-[692px] w-[300px] h-[59px] md:mb-0 mb-10">
          Discover our meticulously crafted collection, where timeless elegance meets contemporary design. Each piece is thoughtfully created using the finest materials and expert craftsmanship, ensuring a perfect blend of sophistication and comfort. From statement pieces to everyday essentials, our bespoke creations embody luxury that transcends seasons.
        </p>
      </div>

      {/* Render specific collection items here */}
      {isLoading ? (
        <p className="ml-32 mt-32">Loading items...</p>
      ) : items2.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-10 mb-[200px]">
          {items2.map((item, index) => (
            <ImageCard
              key={index}
              id={item.id}
              name={item.name}
              defaultImage={item.image.path}
              hoverImage={item.image2.path?.[0]}
              price={item.price}
              itemName={item.name}
              color1={item.color1}
              size1={item.size1}
              size2={item.size2}
              size3={item.size3}
              size4={item.size4}
              size5={item.size5}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 h-[90vh] mt-28">
          No items found for this collection.
        </p>
      )}
    </div>
  );
};

export default CollectionPage;

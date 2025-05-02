"use client";
import ImageCard from "@/components/ItemsCard";
// import { itemsData } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from 'lodash';


interface Item {
  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
  category: string;
  description: string;
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
  const [hasSearched, setHasSearched] = useState(false);

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
  // useEffect(() => {
  //   const searchTerm = decodedCollectionName.toLowerCase();
  //   console.log(searchTerm)

  //   const filteredItems = items.filter((item: Item) => {
  //     const category = (item.category || "").toLowerCase();
  //     const subcategory = (item.description || "").toLowerCase();
  //     const name = (item.name || "").toLowerCase();
  //     console.log('Name:', name);
  //     return (
  //       name.includes(searchTerm)
  //     );
  //   });

  //   setItems2(filteredItems);
  // }, [items, decodedCollectionName]);


  useEffect(() => {
    const searchTerm = decodedCollectionName.toLowerCase();
    const filteredItems = _.filter(items, (item) => {
      const name = (item.name || "").toLowerCase();
      const description = (item.description || "").toLowerCase();
      return _.includes(name, searchTerm) || _.includes(description, searchTerm);
    });
    setItems2(filteredItems);
    setHasSearched(true);
  }, [items, decodedCollectionName]);
  console.log(items2)

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
        <p className="text-center mt-32">Loading items...</p>
      ) : hasSearched && items2.length === 0 ? (
        <p className="text-center mt-32">No items found.</p>
      ) : (
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
              size1={item.size1}
              size2={item.size2}
              size3={item.size3}
              size4={item.size4}
              size5={item.size5}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;

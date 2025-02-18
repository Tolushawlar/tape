"use client";
import ImageCard from "@/components/ItemsCard";
// import { itemsData } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  category: string;
  subcategory: string;
  _id: string; // Include _id for potential future use
  name: string;
  images: {
    main: string;
    others: string[];
  };
  price: string;
}

const CollectionPage = ({ params }: { params: { collectionName: string } }) => {
  const [items, setItems] = useState<Item[]>([]);
  // const [filteredItems, setFilteredItems] = useState<Item[]>([]);
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
          `https://tapebackend.onrender.com/api/products`
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
          Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla
          pretium lectus phasellus. Magna tellus porta sem viverra at ornare
          enim ante sit. Diam tellus tellus odio donec varius hendrerit
          facilisis vitae massa.
        </p>
      </div>

      {/* Render specific collection items here */}
      {isLoading ? (
        <p>Loading items...</p>
      ) : items.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">
          {items.map((item, index) => (
            <ImageCard
              key={index}
              id={item._id}
              name={item.name}
              defaultImage={item.images.main}
              hoverImage={item.images.others?.[0]}
              price={item.price}
              itemName={item.name}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 h-[90vh]">
          No items found for this collection.
        </p>
      )}
    </div>
  );
};

export default CollectionPage;

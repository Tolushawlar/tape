"use client";
import { Carousel2 } from "@/components/Carousel2";
import CollectionSection from "@/components/CollectionSection";
import InfoFooter from "@/components/InfoFooter";
import InfoHero from "@/components/InfoHero";
import { ImageCardProps } from "@/components/ItemsCard";
import { itemsData } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

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

const Homepage = () => {
  const [items, setItems] = useState<Item[]>([]);
  // const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://tapebackend.onrender.com/api/products`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []); // Runs only once on component mount

  // Filter items based on category
  // const menItems = items.filter((item) => {
  //   const category = item.category?.toLowerCase(); // Handle missing category
  //   return category === "men";
  // });

  // const womenItems = items.filter((item) => {
  //   const category = item.category?.toLowerCase(); // Handle missing category
  //   return category === "women";
  // });

  // const kidItems = items.filter((item) => {
  //   const category = item.category?.toLowerCase(); // Handle missing category
  //   return category === "kids";
  // });

  const menItems: ImageCardProps[] = items
    .filter((item) => item.category?.toLowerCase() === "men")
    .map((item) => ({
      id: item._id,
      name: item.name,
      defaultImage: item.images.main,
      hoverImage: item.images.others?.[0] || item.images.main, // Ensure fallback image
      price: item.price,
    }));

  const womenItems: ImageCardProps[] = items
    .filter((item) => item.category?.toLowerCase() === "women")
    .map((item) => ({
      id: item._id,
      name: item.name,
      defaultImage: item.images.main,
      hoverImage: item.images.others?.[0] || item.images.main,
      price: item.price,
    }));

  const kidItems: ImageCardProps[] = items
    .filter((item) => item.category?.toLowerCase() === "kids")
    .map((item) => ({
      id: item._id,
      name: item.name,
      defaultImage: item.images.main,
      hoverImage: item.images.others?.[0] || item.images.main,
      price: item.price,
    }));

  console.log(menItems);

  return (
    <div>
      <div>
        <Carousel2 />
        {/* <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div> */}
      </div>

      <InfoHero />
      <CollectionSection collectionName="MEN" itemsData={menItems} />
      <CollectionSection collectionName="WOMEN" itemsData={womenItems} />
      <CollectionSection collectionName="KIDS" itemsData={kidItems} />
      <CollectionSection collectionName="ACCESSORIES" itemsData={itemsData} />
      <InfoFooter />
    </div>
  );
};

export default Homepage;

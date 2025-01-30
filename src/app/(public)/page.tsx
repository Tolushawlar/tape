"use client";
import { Carousel2 } from "@/components/Carousel2";
import CollectionSection from "@/components/CollectionSection";
import InfoFooter from "@/components/InfoFooter";
import InfoHero from "@/components/InfoHero";
import { itemsData } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface Item {
  category?: string; // Make 'category' optional
  // ... other properties of your items (name, images, price, etc.)
}

const Homepage = () => {
  const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`https://tapebackend.onrender.com/api/products`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []); // Runs only once on component mount

  // Filter items based on category
  const menItems = items.filter((item) => {
    const category = item.category?.toLowerCase(); // Handle missing category
    return category === "men";
  });

  const womenItems = items.filter((item) => {
    const category = item.category?.toLowerCase(); // Handle missing category
    return category === "women";
  });

  const kidItems = items.filter((item) => {
    const category = item.category?.toLowerCase(); // Handle missing category
    return category === "kids";
  });

  console.log(menItems)

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

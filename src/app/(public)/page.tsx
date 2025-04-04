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
  _id: string;
  name: string;
  image: {
    path: string;
  };
  image2: {
    path: stringpath;
  };
  category: string;
  price: string;
}

const Homepage = () => {
  const [items, setItems] = useState<[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product`
        );
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const menItems: ImageCardProps[] = items
    .filter((item: Item) => item.category?.toLowerCase() === "men")
    .map((item) => ({
      id: (item as Item)._id,
      name: (item as Item).name,
      defaultImage: (item as Item).image.path,
      hoverImage: (item as Item).image2.path,
      price: (item as Item).price,
    }));

  const womenItems: ImageCardProps[] = items
    .filter((item: Item) => item.category?.toLowerCase() === "women")
    .map((item) => ({
      id: (item as Item)._id,
      name: (item as Item).name,
      defaultImage: (item as Item).image.path,
      hoverImage: (item as Item).image2.path,
      price: (item as Item).price,
    }));


  const kidItems: ImageCardProps[] = items
    .filter((item: Item) => item.category?.toLowerCase() === "kids")
    .map((item) => ({
      id: (item as Item)._id,
      name: (item as Item).name,
      defaultImage: (item as Item).image.path,
      hoverImage: (item as Item).image2.path,
      price: (item as Item).price,
    }));


  console.log(menItems);

  return (
    <div>
      <div>
        <Carousel2 />
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

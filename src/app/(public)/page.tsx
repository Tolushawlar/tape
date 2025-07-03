/* eslint-disable @typescript-eslint/no-explicit-any */
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
  id: string;
  name: string;
  image: {
    path: string;
  };
  image2: {
    path: string;
  };
  category: string;
  price: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
}

const Homepage = () => {
  const [items, setItems] = useState<[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          // `https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product`
          `http://localhost:3001/api/products`
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
    .filter((item: any) => item.category?.toLowerCase() === "men")
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      defaultImage: JSON.parse(item.image).path,
      hoverImage: JSON.parse(item.image2).path,
      price: item.price,
      color1: item.color1,
      color2: item.color2,
      color3: item.color3,
      color4: item.color4,
      color5: item.color5,
      size1: item.size1,
      size2: item.size2,
      size3: item.size3,
      size4: item.size4,
      size5: item.size5,
    }));

  const womenItems: ImageCardProps[] = items
    .filter((item: any) => item.category?.toLowerCase() === "women")
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      defaultImage: JSON.parse(item.image).path,
      hoverImage: JSON.parse(item.image2).path,
      price: item.price,
      color1: item.color1,
      color2: item.color2,
      color3: item.color3,
      color4: item.color4,
      color5: item.color5,
      size1: item.size1,
      size2: item.size2,
      size3: item.size3,
      size4: item.size4,
      size5: item.size5,
    }));


  const kidItems: ImageCardProps[] = items
    .filter((item: any) => item.category?.toLowerCase() === "kids")
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      defaultImage: JSON.parse(item.image).path,
      hoverImage: JSON.parse(item.image2).path,
      price: item.price,
      color1: item.color1,
      color2: item.color2,
      color3: item.color3,
      color4: item.color4,
      color5: item.color5,
      size1: item.size1,
      size2: item.size2,
      size3: item.size3,
      size4: item.size4,
      size5: item.size5,
    }));


  const accessoryItems: ImageCardProps[] = items
    .filter((item: any) => item.category?.toLowerCase() === "accessories")
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      defaultImage: JSON.parse(item.image).path,
      hoverImage: JSON.parse(item.image2).path,
      price: item.price,
      color1: item.color1,
      color2: item.color2,
      color3: item.color3,
      color4: item.color4,
      color5: item.color5,
      size1: item.size1,
      size2: item.size2,
      size3: item.size3,
      size4: item.size4,
      size5: item.size5,
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
      <CollectionSection collectionName="ACCESSORIES" itemsData={accessoryItems} />
      <InfoFooter />
    </div>
  );
};

export default Homepage;

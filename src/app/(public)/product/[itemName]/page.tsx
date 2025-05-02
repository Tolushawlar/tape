"use client";

import CollectionSection from "@/components/CollectionSection";
import Product from "@/components/Product";
import { ImageCardProps } from "@/components/ItemsCard";
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

const SingleProductPage = ({ params }: { params: { itemName: string } }) => {
  const { itemName } = params;
  const decodedItemName = decodeURIComponent(itemName);
  const [items, setItems] = useState<[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const allItems: ImageCardProps[] = items.map((item: Item) => ({
    id: item.id,
    name: item.name,
    defaultImage: item.image.path,
    hoverImage: item.image2.path,
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

  const getRandomItems = (arr: ImageCardProps[], n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const relatedProducts = getRandomItems(allItems, 4);

  return (
    <div className="overflow-x-hidden">
      <div className={`flex flex-col items-center justify-center}`}>
        <div className="flex flex-col items-center w-full max-w-[1200px]">
          <Product productName={decodedItemName} />
          <CollectionSection
            collectionName="RELATED PRODUCTS"
            itemsData={relatedProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

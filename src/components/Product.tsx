// eslint-disable-next-line react-hooks/rules-of-hooks
"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/cartContext";
import FiveColumnSection from "./FiveColumnSection";
import { itemsData } from "@/constants";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import axios from "axios";

interface ProductProps {
  productName: string;
}

interface Item {
  _id: string;
  name: string;
  image: {
    path: string;
  };
  image2: {
    path: string;
  };
  category: string;
  price: string;
  size1?: string;
  size2?: string;
  size3?: string;
  size4?: string;
  size5?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  description: string;
  sizeFit: string;
  aboutMe: string;
  productDetails: string;
  about: string;
  lookAtMe: string;
}

export default function Product({ productName }: ProductProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const { push } = useRouter();
  const { addToCart } = useCart();
  const { openCartSheet } = useCartStore();
  const defaultImage =
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png";

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
  }, [productName]);

  useEffect(() => {
    const capitalizedText =
      productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();

    const filtered = items.filter((item) => {
      const itemName = item.name || "";
      return itemName.toLowerCase() === capitalizedText.toLowerCase();
    });

    setFilteredItems(filtered);
  }, [items, productName]);

  const firstItem = filteredItems[0];
  const mainImageUrl = firstItem?.image?.path;

  const availableColors = [
    firstItem?.color1,
    firstItem?.color2,
    firstItem?.color3,
    firstItem?.color4,
    firstItem?.color5,
  ].filter(Boolean); // Filter out null or undefined colors

  const availableSizes = [
    firstItem?.size1,
    firstItem?.size2,
    firstItem?.size3,
    firstItem?.size4,
    firstItem?.size5,
  ].filter(Boolean); // Filter out null or undefined sizes

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }

    const itemToAdd = {
      id: firstItem?._id || "defaultId", // Use a more robust ID if available
      name: firstItem?.name || productName,
      price: firstItem?.price || "41000.00",
      size: selectedSize,
      defaultImage: mainImageUrl || defaultImage,
      color: selectedColor,
    };
    console.log(itemToAdd)
    addToCart(itemToAdd);
    openCartSheet();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Card>
              <CardContent className="p-6">
                <Image
                  src={mainImageUrl || defaultImage}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  alt={firstItem?.name || "Product Image"}
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{firstItem?.name}</h1>
            <p className="text-4xl font-bold mb-6">£{firstItem?.price}</p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Colors</h2>
              <div className="flex space-x-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Size</h2>
              <Select onValueChange={handleSizeSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-4 mb-6">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-500/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  push("/checkout");
                }}
              >
                Checkout
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <FiveColumnSection
                  item={{
                    _id: firstItem?._id || '',
                    name: firstItem?.name || '',
                    image: firstItem?.image || { path: '' },
                    image2: firstItem?.image2 || { path: '' },
                    category: firstItem?.category || '',
                    price: firstItem?.price || '',
                    size: selectedSize, // Use the selected size here
                    color: selectedColor, // Use the selected color here
                    description: firstItem?.description || '',
                    sizeFit: firstItem?.sizeFit || '',
                    aboutMe: firstItem?.aboutMe || '',
                    productDetails: firstItem?.productDetails || '',
                    about: firstItem?.about || '',
                    lookAtMe: firstItem?.lookAtMe || '',
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
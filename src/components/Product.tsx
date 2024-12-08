"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

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

interface ProductProps {
  productName: string;
}

export default function Product({ productName }: ProductProps) {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("");

  const { push } = useRouter();

  const { addToCart } = useCart();

  const colors = [
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
  ];

  const product = itemsData.find((item) => item.name === productName);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const { openCartSheet } = useCartStore();

  const defaultImage =
    "https://res.cloudinary.com/dtlxunbzr/image/upload/v1725545543/cardImage_dgxddb.png";

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const item = {
      id: "1",
      name: productName,
      price: product?.price || "41000.00",
      size: selectedSize,
      defaultImage: product?.defaultImage || defaultImage,
      color: selectedColor,
    };
    addToCart(item);
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
                  src={`${
                    product?.defaultImage || defaultImage
                  }?height=600&width=600`}
                  width={200}
                  height={200}
                  alt={`${productName}-image"`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{productName}</h1>
            <p className="text-4xl font-bold mb-6">£{product?.price}</p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Colors</h2>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.value
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
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
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
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
                <FiveColumnSection />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

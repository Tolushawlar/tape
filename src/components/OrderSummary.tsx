/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cartContext";

const OrderSummary = () => {
  const { cartItems, removeFromCart, reduceQuantity, addToCart } = useCart();
  const { push } = useRouter();

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      reduceQuantity(item.id, item.size);
    }
  };

  const handleIncreaseQuantity = (item: any) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    addToCart(updatedItem);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const shipping = 7000;
  const tax = 4918.60;
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          In Your Cart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative h-20 w-20 overflow-hidden rounded">
                <Image
                  src={item.defaultImage}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">£{item.price}</p>
                <button 
                  className="text-sm text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <Separator />
          <div className="space-y-2">
            {/* <div className="flex justify-between">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">£{shipping.toFixed(2)}</span>
            </div> */}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            {/* <p className="text-sm text-gray-500 text-right">
              Including £{tax.toFixed(2)} in taxes
            </p> */}
          </div>

          {/* <div className="pt-4 flex gap-3">
            <Input placeholder="Enter discount code" />
            <Button type="button" className="bg-blue-600 uppercase">
              Apply
            </Button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCart } from "@/context/cartContext";
import { useCartStore } from "@/lib/store/cart-store";

const CartSheet = () => {
  const { cartItems, removeFromCart, addToCart , reduceQuantity} = useCart();
  const { isOpen, openCartSheet, closeCartSheet } = useCartStore();
  const { push } = useRouter();

  const handleCheckout = () => {
    push("/checkout");
    closeCartSheet();
  };

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

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openCartSheet() : closeCartSheet())}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={openCartSheet}>
          <ShoppingCart className="size-8" />
          <span className="sr-only">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review and manage your cart items</SheetDescription>
        </SheetHeader>
        <div className="mt-6 flow-root">
          {cartItems.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              Your cart is empty
            </p>
          )}
          <ul className="overflow-y-scroll max-h-[500px] -my-4 divide-y divide-gray-200">
            {cartItems?.map((item) => (
              <li key={item.id} className="flex py-4">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    width={80}
                    height={80}
                    src={item.defaultImage}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">£{item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                      {/* Size: {[item.size1, item.size2, item.size3, item.size4, item.size5].filter(Boolean).join(', ')} */}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 text-gray-700">
                        {item.quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          {cartItems.length !== 0 && (
            <>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>
                  £
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + Number(item.price) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="mt-6">
                <Button
                  className="w-full bg-red-600 rounded-none uppercase"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Button
              type="button"
              variant={"outline"}
              className="font-medium text-primary hover:text-primary/80 uppercase rounded-none w-full"
              onClick={() => closeCartSheet()}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

"use client";

import { ICartItem } from "@/types";
import { createContext, useState, useContext, ReactNode } from "react";

interface CartContextType {
  cartItems: ICartItem[];
  addToCart: (item: Omit<ICartItem, "quantity">) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Create a context for the cart with proper typing
const CartContext = createContext<CartContextType | undefined>(undefined);

// Props interface for CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// Cart Provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  // Add item to cart
  const addToCart = (item: Omit<ICartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Optional: Export the ICartItem type if you need to use it in other components
export type { ICartItem, CartContextType };

import { Document, Types } from "mongoose";
import { ReactNode } from "react";

export interface ICartItem {
  id: string;
  quantity: number;
  name: string;
  price: string;
  description?: string;
  size?: string;
  defaultImage: string;
}

export interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Types.ObjectId | ICategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder extends Document {
  product: Types.ObjectId | IProduct;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Order = {
  phone_number: ReactNode;
  address: ReactNode;
  city: ReactNode;
  state: ReactNode;
  country: ReactNode;
  postal_code: ReactNode;
  billing_first_name: ReactNode;
  billing_last_name: ReactNode;
  billing_email: ReactNode;
  billing_phone_number: ReactNode;
  billing_address: ReactNode;
  billing_city: ReactNode;
  billing_state: ReactNode;
  billing_country: ReactNode;
  billing_postal_code: ReactNode;
  quantity: ReactNode;
  id: number;
  product: string;
  first_name: string;
  last_name: string;
  created_at: string;
  additionalProducts?: number;
  customer: string;
  email: string;
  Total: string;
  status: "Processing" | "Shipped" | "Delivered";
  cart_items: never;
};

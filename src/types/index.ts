import { Document, Types } from "mongoose";

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
};

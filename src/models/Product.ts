import { Schema, model, models, Document } from "mongoose";

// Define the Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  productDetails: { type: String, required: true },
  sizeFit: { type: String, required: true },
  lookAtMe: { type: String, required: true },
  about: { type: String, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Create the Product type using TypeScript's `infer` utility
export interface IProduct extends Document {
  name: string;
  price: number;
  color: string;
  size: string;
  category: string;
  description: string;
  productDetails: string;
  sizeFit: string;
  lookAtMe: string;
  about: string;
  stock: number;
  createdAt: Date;
}

// Export the Product model
export default models.Product || model<IProduct>("Product", ProductSchema);

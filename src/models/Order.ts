import { Schema, model, models, Document } from "mongoose";

// Define the interface for Order document
export interface IOrder extends Document {
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define a separate interface for creating an order (without Document fields)
export interface CreateOrderInput {
  product: string | Schema.Types.ObjectId; // Allow both string and ObjectId
  quantity: number;
  totalPrice: number;
}

// If you want to include populated product fields, create a separate interface
export interface OrderWithProduct extends Omit<IOrder, "product"> {
  product: {
    _id: Schema.Types.ObjectId;
    // Add other product fields you need
    name?: string;
    price?: number;
    // ... other product fields
  };
}

// Export the model
const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;

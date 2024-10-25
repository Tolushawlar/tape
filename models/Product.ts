import mongoose, { Schema, model, models } from 'mongoose';

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

export default models.Product || model('Product', ProductSchema);

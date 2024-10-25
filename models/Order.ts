import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Order || model('Order', OrderSchema);

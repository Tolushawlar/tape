import  { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Category || model('Category', CategorySchema);

import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { product, quantity, totalPrice } = req.body;
    const order = await Order.create({ product, quantity, totalPrice });
    res.status(201).json(order);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

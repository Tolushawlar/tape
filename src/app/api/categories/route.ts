import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/models/Category';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const categories = await Category.find();
    res.status(200).json(categories);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

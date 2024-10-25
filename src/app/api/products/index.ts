// /pages/api/products/index.js

import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req, res) {
  await connectToDatabase(); // Connect to MongoDB

  if (req.method === 'GET') {
    try {
      const products = await Product.find().populate('category'); // Retrieve all products
      console.log("getting")
      res.status(200).json(products); // Send the products in the response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, stock, category } = req.body;
      const product = await Product.create({ name, description, price, stock, category });
      res.status(201).json(product); // Send created product in response
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handle errors
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Unsupported methods
  }
}

// app/api/products/route.ts
import { NextResponse } from 'next/server';
import type { Product } from '../../../types/product';

export async function GET() {
  try {
    // Replace this with your actual data fetching logic
    const products: Product[] = [
      { id: '1', name: 'T-Shirt', price: 29.99 },
      { id: '2', name: 'Hoodie', price: 49.99 },
    ];

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // Create new product
    // Replace this with your actual database logic
    const newProduct: Product = {
      id: Date.now().toString(), // Generate a unique ID
      name: body.name,
      price: body.price,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Delete product logic here
    // Replace with your actual database deletion
    console.log(`Deleting product with ID: ${id}`);

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

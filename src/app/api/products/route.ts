import { connectToDatabase } from "@/lib/mongodb";
import Product, { IProduct } from "@/models/Product";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(): Promise<
  NextResponse<IProduct[] | { error: string }>
> {
  try {
    await connectToDatabase();
    const products = await Product.find().populate("category");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

type ProductCreateRequest = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string; // Category ID
};

export async function POST(
  request: Request
): Promise<NextResponse<IProduct | { error: string }>> {
  try {
    await connectToDatabase();
    const body: ProductCreateRequest = await request.json();

    // Validation
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!body.category || !Types.ObjectId.isValid(body.category)) {
      return NextResponse.json(
        { error: "Valid category ID is required" },
        { status: 400 }
      );
    }

    if (typeof body.price !== "number" || body.price <= 0) {
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    }

    if (typeof body.stock !== "number" || body.stock < 0) {
      return NextResponse.json(
        { error: "Valid stock quantity is required" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      category: body.category,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

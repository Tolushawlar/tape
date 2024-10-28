import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { IOrder } from "@/types";

type OrderCreateRequest = {
  product: string; // Product ID
  quantity: number;
  totalPrice: number;
};

export async function POST(
  request: Request
): Promise<NextResponse<IOrder | { error: string }>> {
  try {
    await connectToDatabase();
    const body: OrderCreateRequest = await request.json();

    // Validation
    if (!body.product || !Types.ObjectId.isValid(body.product)) {
      return NextResponse.json(
        { error: "Valid product ID is required" },
        { status: 400 }
      );
    }

    if (typeof body.quantity !== "number" || body.quantity <= 0) {
      return NextResponse.json(
        { error: "Valid quantity is required" },
        { status: 400 }
      );
    }

    if (typeof body.totalPrice !== "number" || body.totalPrice <= 0) {
      return NextResponse.json(
        { error: "Valid total price is required" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      product: body.product,
      quantity: body.quantity,
      totalPrice: body.totalPrice,
    });

    return NextResponse.json(order, { status: 201 });
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

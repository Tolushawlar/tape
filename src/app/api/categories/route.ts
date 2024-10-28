import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/Category";
import { ICategory } from "@/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<ICategory[] | { error: string }>
> {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return NextResponse.json(categories);
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

type CategoryCreateRequest = {
  name: string;
};

export async function POST(
  request: Request
): Promise<NextResponse<ICategory | { error: string }>> {
  try {
    await connectToDatabase();
    const body: CategoryCreateRequest = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await Category.create({ name: body.name });
    return NextResponse.json(category, { status: 201 });
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

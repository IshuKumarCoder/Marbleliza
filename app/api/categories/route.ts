import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductCategory } from "@/models/ProductCategory";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await ProductCategory.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const category = await ProductCategory.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

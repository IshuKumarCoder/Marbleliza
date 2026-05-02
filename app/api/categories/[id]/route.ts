import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductCategory } from "@/models/ProductCategory";
import { Product } from "@/models/Product";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();
    const category = await ProductCategory.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    await ProductCategory.findByIdAndDelete(id);
    await Product.deleteMany({ categoryId: id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

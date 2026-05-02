import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const { phoneNumber, password } = await req.json();

    if (!phoneNumber || !password) {
      return NextResponse.json({ success: false, error: "Credentials required" }, { status: 400 });
    }

    // Establish dynamic connection to MongoDB
    await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection null");
    }

    // 1. Physically extract the secure `admin` collection globally directly from MongoDB.
    const adminDocs = await db.collection("admin").find({}).toArray();
    
    // 2. Safely scan the native documents checking identically structured credential nested JSON objects.
    const validAdmin = adminDocs.find((admin) => 
      admin.credentials?.phoneNumber === phoneNumber && 
      admin.credentials?.password === password
    );

    if (validAdmin) {
       // Return successful authentication token signature back to component logic.
       return NextResponse.json({ success: true, role: validAdmin.meta?.role || "ADMIN" }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });

  } catch (error) {
    console.error("Login API Protocol Error:", error);
    return NextResponse.json({ success: false, error: "Server authentication error" }, { status: 500 });
  }
}

import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, message, source, location } = await req.json();

    // Basic server-side validation (expand as needed)
    if (!firstName || !phone || !message) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Connect to MongoDB using the cached connection logic
    await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error('Database connection disabled physically.');

    // Bypassing frozen Mongoose Schemas dynamically injecting fields directly into the un-strict native JSON collection!
    await db.collection("query").insertOne({
      firstName,
      lastName: lastName || '',
      email: email || '',
      phone,
      message,
      source: source || 'General',
      location: location || 'Unknown',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ success: true, message: "Contact request submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ error: "Failed to submit contact request." }, { status: 500 });
  }
}

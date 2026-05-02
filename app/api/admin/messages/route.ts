import { connectToDatabase } from '@/lib/mongodb';
import { ContactMessage } from '@/models/ContactMessage';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Native Database Diagnostic Tracker
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection aborted or null physically.");
    }

    console.log("=== CONNECTED INTERNAL DATABASE NAME ===", db.databaseName);
    const collections = await db.listCollections().toArray();
    console.log("=== COLLECTIONS FOUND IN THIS DB ===", collections.map(c => c.name));
    // Bypassing Next.js global Mongoose Model Cache by querying the physical DB collections natively!
    // Explicitly check both folders natively in real-time
    const queryCollectionRaw = await db.collection("query").find({}).sort({ createdAt: -1 }).toArray();
    const contactCollectionRaw = await db.collection("contactmessages").find({}).sort({ createdAt: -1 }).toArray();
    
    console.log("=== Mongoose Cache Bypass Output ===");
    console.log("Docs found in 'query':", queryCollectionRaw.length);
    console.log("Docs found in 'contactmessages':", contactCollectionRaw.length);

    // Dynamically lock onto whichever physical database collection possesses your payloads natively
    let messages = queryCollectionRaw;
    if (contactCollectionRaw.length > queryCollectionRaw.length) {
       messages = contactCollectionRaw;
    }
    
    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages securely." }, { status: 500 });
  }
}

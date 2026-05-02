import mongoose from "mongoose";

declare global {
  var mongoose: any; // Use 'var' to declare a global variable in TypeScript
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global variable mapped to the mongoose instance to maintain a cached connection 
 * across hot reloads in development. This prevents instances of MongoDB connections 
 * from growing exponentially and crashing the app during repeated API Route hits.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If we already have an active connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // Otherwise, create a new connection promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Successfully connected to MongoDB.");
      return mongoose;
    });
  }

  try {
    // Wait for the connection to fully resolve
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

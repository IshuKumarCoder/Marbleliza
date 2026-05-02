import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary API keys are completely missing from .env.local" }, { status: 500 });
    }

    // 1. Generate High-Security SHA-1 Signature for Cloudinary REST API
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "marbliza_assets";
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signatureStr).digest("hex");

    // 2. Attach required security parameters to formData
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("folder", folder);

    // 3. Execute blazing fast Next.js native fetch (bypassing heavy SDK stream chunking)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
      // Abort controller isn't strictly necessary but prevents infinity hanging
      signal: AbortSignal.timeout(25000) 
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: "Cloudinary verification rejected", details: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ secure_url: data.secure_url });

  } catch (error) {
    console.error("Upload server error:", error);
    return NextResponse.json({ error: "Server network timeout or upload failed" }, { status: 500 });
  }
}

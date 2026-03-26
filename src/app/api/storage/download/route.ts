import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/google-auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uri = searchParams.get("uri"); // Format: gs://bucket-name/object-path

    if (!uri || !uri.startsWith("gs://")) {
      return NextResponse.json(
        { message: "Valid GCS URI (gs://) is required" },
        { status: 400 }
      );
    }

    const token = await getGoogleAccessToken();

    // 1. Parse GCS URI
    const parts = uri.replace("gs://", "").split("/");
    const bucket = parts[0];
    const objectPath = parts.slice(1).join("/");
    const encodedObjectPath = encodeURIComponent(objectPath);

    // 2. Fetch from GCS API
    const gcsUrl = `https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodedObjectPath}?alt=media`;

    const response = await fetch(gcsUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GCS Download Error:", errorText);
      return NextResponse.json(
        { message: "Failed to fetch file from GCS", detail: errorText },
        { status: response.status }
      );
    }

    // 3. Stream the response back to client
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";
    const fileName = objectPath.split("/").pop() || "download";

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`
      }
    });
  } catch (error) {
    console.error("Download Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

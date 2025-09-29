import { NextRequest, NextResponse } from "next/server";
import { fetchTweetEmbedHtml } from "@/lib/archive/embed";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  try {
    const embedHtml = await fetchTweetEmbedHtml(url);
    
    if (!embedHtml) {
      return NextResponse.json({ error: "Could not fetch Twitter embed" }, { status: 404 });
    }

    return NextResponse.json({ html: embedHtml });
  } catch (error) {
    console.error("Error fetching Twitter embed:", error);
    return NextResponse.json({ error: "Failed to fetch Twitter embed" }, { status: 500 });
  }
}

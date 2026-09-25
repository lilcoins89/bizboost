import { NextRequest, NextResponse } from "next/server";
import { generateContent, type ContentType, type BusinessContext } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type = "instagram_caption",
      prompt = "",
      count = 3,
      business,
    } = body as {
      type?: ContentType;
      prompt?: string;
      count?: number;
      business?: BusinessContext;
    };

    if (!prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Default demo business if none provided (will be replaced by real session data)
    const ctx: BusinessContext = business || {
      name: "Demo Business",
      category: "Food Vendor",
      description: "A local food business",
      brandVoice: "Friendly, local, appetizing",
    };

    const results = await generateContent(ctx, type as ContentType, prompt, Math.min(count, 10));

    return NextResponse.json({ results });
  } catch (err) {
    console.error("AI generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

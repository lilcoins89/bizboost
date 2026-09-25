/**
 * AI Content Generation Engine for BizBoost
 * Uses business profile context to generate personalized marketing content.
 * Supports OpenAI-compatible APIs (Grok, OpenAI, local models, etc.)
 */

export interface BusinessContext {
  name: string;
  category: string;
  description?: string | null;
  products?: string | null; // JSON
  brandVoice?: string | null;
  location?: string | null;
}

export type ContentType =
  | "instagram_caption"
  | "facebook_post"
  | "tiktok_caption"
  | "whatsapp_message"
  | "promotional_announcement"
  | "product_description"
  | "menu_description"
  | "customer_appreciation"
  | "holiday_message"
  | "new_product_announcement"
  | "discount_offer"
  | "story_idea"
  | "video_idea"
  | "content_hook"
  | "cta";

const PLATFORM_GUIDELINES: Record<string, string> = {
  instagram_caption: "Write engaging Instagram captions. Use 1-3 relevant emojis. Include a soft CTA. Keep under 2200 characters. End with 3-5 hashtags.",
  facebook_post: "Write friendly Facebook posts that encourage comments and shares. Conversational tone. 1-2 emojis max.",
  tiktok_caption: "Write short, punchy TikTok captions with hooks. Trendy language. Under 150 characters preferred. Include trending-style hashtags.",
  whatsapp_message: "Write personal, short WhatsApp marketing messages. Warm and direct. No hashtags. Include a clear next step.",
  promotional_announcement: "Create exciting promotional announcements suitable for all channels.",
  product_description: "Write appetizing or persuasive product descriptions that highlight benefits and create desire.",
  menu_description: "Write short, mouth-watering menu item descriptions for a digital menu.",
  customer_appreciation: "Write warm thank-you and appreciation messages for loyal customers.",
  holiday_message: "Write festive, on-brand holiday greetings and offers.",
  new_product_announcement: "Announce a new product with excitement and clear benefits.",
  discount_offer: "Create clear, urgency-driven discount/offer announcements.",
  story_idea: "Suggest creative Instagram/Facebook Story ideas with text overlays and visuals.",
  video_idea: "Suggest short-form video concepts (TikTok/Reels) with hook, body, and CTA.",
  content_hook: "Generate attention-grabbing opening hooks for posts and videos.",
  cta: "Suggest strong but non-pushy calls-to-action.",
};

function buildSystemPrompt(business: BusinessContext): string {
  let products = "";
  try {
    if (business.products) {
      const parsed = JSON.parse(business.products);
      products = Array.isArray(parsed)
        ? parsed.map((p: any) => `- ${p.name}${p.price ? ` (${p.price})` : ""}`).join("\n")
        : "";
    }
  } catch {}

  return `You are an expert marketing copywriter specialized in helping small local businesses grow organically.

Business Profile:
- Name: ${business.name}
- Category: ${business.category}
- Description: ${business.description || "Not provided"}
- Location: ${business.location || "Local area"}
- Brand Voice: ${business.brandVoice || "Friendly, local, authentic"}
${products ? `\nProducts/Services:\n${products}` : ""}

Rules:
- Always personalize content to this specific business.
- Never invent false claims or prices.
- Keep language natural and suitable for the category (food businesses should sound delicious, salons professional yet warm, etc.).
- Focus on organic growth and genuine connection with local customers.
- Do not mention paid ads or advertising platforms.
- Return clean, ready-to-use content only.`;
}

export async function generateContent(
  business: BusinessContext,
  type: ContentType,
  prompt: string,
  count: number = 1
): Promise<string[]> {
  const system = buildSystemPrompt(business);
  const guidelines = PLATFORM_GUIDELINES[type] || "Write high-quality marketing content.";

  const userMessage = `${guidelines}

User request: ${prompt}

Generate ${count} distinct variation(s). Return each variation clearly separated by "---". Do not number them.`;

  // If no AI key is configured, return high-quality template-based content
  if (!process.env.AI_API_KEY) {
    return generateFallback(business, type, prompt, count);
  }

  try {
    const res = await fetch(`${process.env.AI_BASE_URL || "https://api.x.ai/v1"}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "grok-3",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userMessage },
        ],
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      console.error("AI API error", await res.text());
      return generateFallback(business, type, prompt, count);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    return text
      .split("---")
      .map((s: string) => s.trim())
      .filter(Boolean)
      .slice(0, count);
  } catch (err) {
    console.error("AI generation failed", err);
    return generateFallback(business, type, prompt, count);
  }
}

function generateFallback(
  business: BusinessContext,
  type: ContentType,
  prompt: string,
  count: number
): string[] {
  const name = business.name;
  const results: string[] = [];

  const templates: Record<string, string[]> = {
    instagram_caption: [
      `🔥 This weekend only at ${name}!\n\n${prompt}\n\nCome taste the difference. Your local favourite is waiting.\n\n📍 See you soon!\n\n#${name.replace(/\s+/g, "")} #LocalEats #Foodie`,
      `Looking for something special this weekend?\n\n${prompt}\n\nMade fresh with love at ${name}. Tag someone who needs this! ❤️\n\n#SupportLocal #${business.category.replace(/\s+/g, "")}`,
    ],
    whatsapp_message: [
      `Hi! 👋 Just a quick note from ${name}.\n\n${prompt}\n\nReply to this message or call us to order. We'd love to serve you!`,
      `Hello from ${name}!\n\n${prompt}\n\nLimited availability — message us to reserve yours today.`,
    ],
    facebook_post: [
      `Hey neighbours! 👋\n\n${prompt}\n\nWe're open and ready to serve you at ${name}. Drop by or order ahead — we can't wait to see you!`,
    ],
    tiktok_caption: [
      `POV: You found the best ${business.category.toLowerCase()} in town 🔥 ${prompt} #${name.replace(/\s+/g, "")} #fyp`,
    ],
    product_description: [
      `Our signature offering at ${name}: ${prompt}. Crafted with care for our community.`,
    ],
    menu_description: [
      `${prompt} — a customer favourite at ${name}.`,
    ],
  };

  const base = templates[type] || [
    `From ${name}: ${prompt}\n\nCrafted with care for our local community.`,
  ];

  for (let i = 0; i < count; i++) {
    results.push(base[i % base.length]);
  }
  return results;
}

export async function generateContentPlan(
  business: BusinessContext,
  days: number = 7
): Promise<{ day: number; ideas: string[] }[]> {
  const plan = [];
  for (let d = 1; d <= days; d++) {
    const ideas = await generateContent(
      business,
      "content_hook",
      `Give me 3 content ideas for day ${d} of a ${days}-day plan promoting ${business.name}`,
      3
    );
    plan.push({ day: d, ideas });
  }
  return plan;
}

export async function repurposeContent(
  business: BusinessContext,
  original: string
): Promise<Record<string, string>> {
  const types: ContentType[] = [
    "instagram_caption",
    "facebook_post",
    "tiktok_caption",
    "whatsapp_message",
    "story_idea",
    "video_idea",
  ];

  const result: Record<string, string> = {};
  for (const t of types) {
    const [content] = await generateContent(business, t, `Repurpose this into a ${t.replace(/_/g, " ")}: ${original}`, 1);
    result[t] = content;
  }
  return result;
}

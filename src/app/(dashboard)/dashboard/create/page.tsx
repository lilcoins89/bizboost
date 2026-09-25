"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Copy,
  Check,
  Instagram,
  Facebook,
  MessageCircle,
  Video,
  FileText,
  Megaphone,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const contentTypes = [
  { id: "instagram_caption", label: "Instagram", icon: Instagram },
  { id: "facebook_post", label: "Facebook", icon: Facebook },
  { id: "tiktok_caption", label: "TikTok", icon: Video },
  { id: "whatsapp_message", label: "WhatsApp", icon: MessageCircle },
  { id: "promotional_announcement", label: "Promo", icon: Megaphone },
  { id: "product_description", label: "Product", icon: FileText },
  { id: "menu_description", label: "Menu", icon: FileText },
  { id: "story_idea", label: "Story Ideas", icon: Sparkles },
  { id: "video_idea", label: "Video Ideas", icon: Video },
];

const examplePrompts = [
  "Create 5 posts promoting our chicken shawarma for this weekend",
  "Write a WhatsApp message for today's special",
  "Give me TikTok video ideas for grilled chicken",
  "Create a product description for chicken wings",
  "Write customer appreciation messages",
];

export default function CreateContentPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState("instagram_caption");
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function handleGenerate() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true);
    setResults([]);

    try {
      // Call API route (will fall back to client-side templates if no backend yet)
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          prompt,
          count,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      } else {
        // Client-side fallback for demo
        setResults(generateLocalFallback(selectedType, prompt, count));
      }
    } catch {
      setResults(generateLocalFallback(selectedType, prompt, count));
    } finally {
      setLoading(false);
    }
  }

  function copyText(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  return (
    <>
      <DashboardHeader
        title="Create Content"
        description="AI-powered marketing content personalized to your business"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              What do you want to create?
            </CardTitle>
            <CardDescription>
              Describe what you need. The AI uses your business profile to personalize everything.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Content type selector */}
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((t) => (
                <Button
                  key={t.id}
                  variant={selectedType === t.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(t.id)}
                  className="gap-1.5"
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </Button>
              ))}
            </div>

            <Textarea
              placeholder="e.g. Create 5 posts promoting our chicken shawarma for this weekend..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Variations:</span>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value) || 1)}
                  className="w-16 h-8"
                />
              </div>
              <Button onClick={handleGenerate} disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {/* Example prompts */}
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Try these:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setPrompt(ex)}
                    className="text-xs rounded-full border px-3 py-1 hover:bg-accent transition-colors text-left"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Generated content ({results.length})</h3>
            {results.map((text, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 whitespace-pre-wrap text-sm leading-relaxed">{text}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => copyText(text, idx)}
                    >
                      {copiedIdx === idx ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {contentTypes.find((t) => t.id === selectedType)?.label}
                    </Badge>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Save to Library
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Repurpose
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function generateLocalFallback(type: string, prompt: string, count: number): string[] {
  const base = [
    `🔥 ${prompt}\n\nCome experience the difference at our place. Fresh, delicious, and made with love.\n\n📍 See you soon!\n\n#LocalEats #Foodie #SupportLocal`,
    `Looking for something special?\n\n${prompt}\n\nWe're open and ready to serve you. Tag a friend who needs this! ❤️`,
    `Hi! 👋 Just a quick note.\n\n${prompt}\n\nReply to order or call us. We'd love to serve you today!`,
    `POV: You found the best spot in town 🔥\n\n${prompt}\n\n#fyp #localbusiness`,
    `Weekend vibes call for ${prompt.toLowerCase()}.\n\nDrop by or order ahead — limited availability!`,
  ];
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
}

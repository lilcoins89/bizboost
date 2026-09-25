"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Copy, Archive, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const demoLibrary = [
  { id: "1", type: "instagram_caption", title: "Weekend special", body: "🔥 This weekend only! Our chicken shawarma is calling your name...", tags: ["promo", "weekend"], created: "2 days ago" },
  { id: "2", type: "whatsapp_message", title: "Thank you message", body: "Hi! Thank you for ordering from us. We hope you loved it! ❤️", tags: ["appreciation"], created: "3 days ago" },
  { id: "3", type: "tiktok_caption", title: "POV video idea", body: "POV: You found the best shawarma in town 🔥 #fyp", tags: ["video", "hook"], created: "5 days ago" },
  { id: "4", type: "product_description", title: "Chicken wings", body: "Crispy on the outside, juicy on the inside. Our signature wings...", tags: ["menu"], created: "1 week ago" },
  { id: "5", type: "facebook_post", title: "Holiday greeting", body: "Happy holidays from our family to yours! 🎉", tags: ["holiday"], created: "2 weeks ago" },
  { id: "6", type: "story_idea", title: "Behind the scenes", body: "Show the grill in action + text overlay: Made fresh every day", tags: ["story"], created: "2 weeks ago" },
];

const typeLabels: Record<string, string> = {
  instagram_caption: "Instagram",
  facebook_post: "Facebook",
  tiktok_caption: "TikTok",
  whatsapp_message: "WhatsApp",
  product_description: "Product",
  story_idea: "Story",
};

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const filtered = demoLibrary.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.includes(search.toLowerCase()))
  );

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  }

  return (
    <>
      <DashboardHeader
        title="Content Library"
        description="Search, reuse and organize all your generated content"
      />

      <div className="p-4 lg:p-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, captions, scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <Card key={item.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.created}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {typeLabels[item.type] || item.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{item.body}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => copy(item.body)}>
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Reuse
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No content found. Generate some posts to build your library.
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

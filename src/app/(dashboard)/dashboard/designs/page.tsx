"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Palette,
  Image,
  FileText,
  Megaphone,
  Smartphone,
  Loader2,
  Download,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

const templates = [
  {
    id: "social",
    title: "Social media post",
    desc: "Square graphic for Instagram & Facebook",
    icon: Image,
    size: "1080 × 1080",
  },
  {
    id: "menu",
    title: "Digital menu",
    desc: "Clean menu layout for your page or print",
    icon: FileText,
    size: "A4 / mobile",
  },
  {
    id: "flyer",
    title: "Promo flyer",
    desc: "Weekend specials and offers",
    icon: Megaphone,
    size: "A5 / story",
  },
  {
    id: "story",
    title: "Story / Reel cover",
    desc: "Vertical design for Stories & Reels",
    icon: Smartphone,
    size: "1080 × 1920",
  },
];

export default function DesignsPage() {
  const [selected, setSelected] = useState("social");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [designs, setDesigns] = useState<
    { id: string; title: string; type: string; createdAt: string }[]
  >([
    {
      id: "1",
      title: "Weekend Shawarma Special",
      type: "Promo flyer",
      createdAt: "2 days ago",
    },
    {
      id: "2",
      title: "Chicken Wings Menu Card",
      type: "Digital menu",
      createdAt: "5 days ago",
    },
  ]);

  function handleCreate() {
    if (!headline.trim()) {
      toast.error("Add a headline for your design");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const t = templates.find((x) => x.id === selected);
      setDesigns((d) => [
        {
          id: String(Date.now()),
          title: headline,
          type: t?.title || "Design",
          createdAt: "Just now",
        },
        ...d,
      ]);
      setHeadline("");
      setBody("");
      setLoading(false);
      toast.success("Design created — ready to download or share");
    }, 1200);
  }

  return (
    <>
      <DashboardHeader
        title="Designs"
        description="Create flyers, menus and social graphics — built into BizBoost"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        {/* Template picker */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelected(t.id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                selected === t.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/40 hover:bg-accent/30"
              }`}
            >
              <t.icon className="h-5 w-5 text-primary mb-2" />
              <p className="font-medium text-sm">{t.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              <Badge variant="outline" className="mt-2 text-[10px]">
                {t.size}
              </Badge>
            </button>
          ))}
        </div>

        {/* Creator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design studio
            </CardTitle>
            <CardDescription>
              Your brand colors and logo from your profile are applied automatically.
              Paste AI-generated copy below to turn text into a design.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Headline</label>
              <Input
                className="mt-1"
                placeholder="e.g. Weekend Chicken Special"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Body / details (optional)</label>
              <Textarea
                className="mt-1 resize-none"
                rows={3}
                placeholder="Price, offer details, or caption text..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <Button onClick={handleCreate} disabled={loading} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating design...
                </>
              ) : (
                <>
                  <Palette className="h-4 w-4" /> Create design
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Your designs */}
        <div>
          <h3 className="text-sm font-medium mb-3">Your designs</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {designs.map((d) => (
              <Card key={d.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{d.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {d.type} · {d.createdAt}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                        <Download className="h-3 w-3" /> Download
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                        <Copy className="h-3 w-3" /> Duplicate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Design tools are built into BizBoost. No Canva account required.
        </p>
      </div>
    </>
  );
}

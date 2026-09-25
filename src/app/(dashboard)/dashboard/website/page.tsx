"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, ExternalLink, Copy, Sparkles, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function BusinessWebsitePage() {
  const slug = "bigbite";
  const publicUrl = `bizboost.app/${slug}`;

  function copyUrl() {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    toast.success("Link copied!");
  }

  return (
    <>
      <DashboardHeader
        title="Business Website"
        description="Your public mini website / digital menu"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        <Card className="border-primary/20">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Your public page is live</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this link with customers — it works like a modern digital menu.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">{publicUrl}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyUrl}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={`/${slug}`} target="_blank" rel="noopener">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
            <Button asChild>
              <a href={`/${slug}`} target="_blank" rel="noopener">
                Preview page
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Page settings</CardTitle>
              <CardDescription>Customize your public business page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">URL slug</label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm text-muted-foreground">
                    bizboost.app/
                  </span>
                  <Input defaultValue={slug} className="rounded-l-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Page title</label>
                <Input defaultValue="BigBite Shawarma" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Tagline</label>
                <Input defaultValue="Fresh. Spicy. Local favourite." className="mt-1" />
              </div>
              <Button className="w-full">Save changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI website content
              </CardTitle>
              <CardDescription>Generate descriptions, FAQs and more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                Generate business description
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Write About section
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Create menu descriptions
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Generate FAQs
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                Welcome message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Page preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border bg-gradient-to-b from-orange-500/10 to-background p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl font-bold text-orange-600">
                  BB
                </div>
                <div>
                  <h3 className="text-xl font-bold">BigBite Shawarma</h3>
                  <p className="text-sm text-muted-foreground">Fresh. Spicy. Local favourite.</p>
                </div>
              </div>
              <p className="text-sm">
                Authentic shawarma and grilled chicken made fresh daily. Your neighbourhood favourite since day one.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Lagos, Nigeria</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Open · Closes 10 PM</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Call
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </Button>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs font-medium mb-2">Popular items</p>
                <div className="space-y-2">
                  {["Chicken Shawarma — ₦2,500", "Grilled Chicken — ₦3,500", "Beef Shawarma — ₦2,800"].map((item) => (
                    <div key={item} className="flex justify-between text-sm">
                      <span>{item.split(" — ")[0]}</span>
                      <span className="font-medium">{item.split(" — ")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, Share2, Palette, Presentation, Users } from "lucide-react";
import { toast } from "sonner";

const builtInFeatures = [
  {
    id: "social",
    name: "Social scheduling",
    description: "Schedule organic posts to Instagram, Facebook, TikTok & LinkedIn",
    icon: Share2,
    href: "/dashboard/social",
  },
  {
    id: "designs",
    name: "Design studio",
    description: "Create flyers, menus and social graphics",
    icon: Palette,
    href: "/dashboard/designs",
  },
  {
    id: "presentations",
    name: "Presentations & documents",
    description: "Menus, proposals and business presentations",
    icon: Presentation,
    href: "/dashboard/presentations",
  },
  {
    id: "crm",
    name: "Customer CRM",
    description: "Contacts, notes and AI follow-ups",
    icon: Users,
    href: "/dashboard/crm",
  },
];

export default function SettingsPage() {
  function saveProfile() {
    toast.success("Business profile saved");
  }

  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Business profile and brand — powers all AI and features"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-3xl">
        {/* Business profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business profile</CardTitle>
            <CardDescription>
              This data personalizes AI content, designs, and your public mini website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Business name</label>
                <Input defaultValue="BigBite Shawarma" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input defaultValue="Food / Shawarma" className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                defaultValue="Authentic shawarma and grilled chicken made fresh daily. Your neighbourhood favourite."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input defaultValue="+234 801 000 0000" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">WhatsApp</label>
                <Input defaultValue="+234 801 000 0000" className="mt-1" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Instagram</label>
                <Input defaultValue="@bigbiteshawarma" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input defaultValue="Lagos, Nigeria" className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Brand voice</label>
              <Input
                defaultValue="Friendly, local, mouth-watering, community-focused"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Public page slug</label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">bizboost.com/</span>
                <Input defaultValue="bigbite" className="max-w-[160px]" />
              </div>
            </div>
            <Button onClick={saveProfile}>Save profile</Button>
          </CardContent>
        </Card>

        {/* Built-in features (not integrations) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Built-in features</CardTitle>
            <CardDescription>
              These work automatically inside BizBoost. No external accounts to connect.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {builtInFeatures.map((f) => (
              <div
                key={f.id}
                className="flex items-start justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{f.name}</p>
                      <Badge variant="success" className="text-[10px] gap-1">
                        <Check className="h-3 w-3" /> Included
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={f.href}>Open</a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardContent className="py-6 text-sm text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">How it works</p>
            <p>
              Social scheduling, designs, presentations and CRM are native BizBoost features.
              Platform credentials (where needed) are managed by BizBoost — you never connect
              Buffer, Canva, Gamma or HubSpot yourself.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

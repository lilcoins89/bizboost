"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Link2, Check, ExternalLink } from "lucide-react";

const integrations = [
  {
    id: "buffer",
    name: "Buffer",
    description: "Schedule organic posts to Instagram, Facebook, TikTok & LinkedIn",
    connected: false,
    docs: "https://buffer.com/developers",
  },
  {
    id: "canva",
    name: "Canva",
    description: "Create flyers, menus and social graphics",
    connected: false,
    docs: "https://www.canva.com/developers/",
  },
  {
    id: "gamma",
    name: "Gamma",
    description: "Auto-generate presentations, menus and proposals",
    connected: false,
    docs: "https://gamma.app",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Full CRM sync for contacts and deals",
    connected: false,
    docs: "https://developers.hubspot.com",
  },
];

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Business profile, brand and integrations"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-3xl">
        {/* Business profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business profile</CardTitle>
            <CardDescription>This data powers all AI content personalization</CardDescription>
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
            <Button>Save profile</Button>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integrations</CardTitle>
            <CardDescription>
              Connect Buffer, Canva, Gamma and HubSpot. All organic — no paid ads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {integrations.map((int) => (
              <div
                key={int.id}
                className="flex items-start justify-between gap-4 rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{int.name}</p>
                    {int.connected ? (
                      <Badge variant="success" className="text-[10px] gap-1">
                        <Check className="h-3 w-3" /> Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">
                        Not connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{int.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" asChild>
                    <a href={int.docs} target="_blank" rel="noopener">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button size="sm" variant={int.connected ? "secondary" : "default"} className="gap-1.5">
                    <Link2 className="h-3.5 w-3.5" />
                    {int.connected ? "Manage" : "Connect"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Environment note */}
        <Card className="border-dashed">
          <CardContent className="py-6 text-sm text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">Required environment variables</p>
            <p>
              See <code className="text-xs bg-muted px-1 rounded">.env.example</code> for Buffer,
              Canva, Gamma, HubSpot and AI API keys. Connection flows will use these securely.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

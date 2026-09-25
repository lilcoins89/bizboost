import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Link2, Instagram, Facebook, Video } from "lucide-react";
import Link from "next/link";

export default function SocialMediaPage() {
  return (
    <>
      <DashboardHeader
        title="Social Media"
        description="Organic scheduling via Buffer — Instagram, Facebook, TikTok, LinkedIn"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-3xl">
        <Card className="border-primary/20">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Connect Buffer</h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Schedule organic posts to your social accounts. No paid ads — pure content publishing.
              </p>
            </div>
            <Button asChild className="gap-1.5">
              <Link href="/dashboard/settings">
                <Link2 className="h-4 w-4" />
                Connect in Settings
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: "Instagram", icon: Instagram, status: "Not connected" },
            { name: "Facebook", icon: Facebook, status: "Not connected" },
            { name: "TikTok", icon: Video, status: "Not connected" },
          ].map((ch) => (
            <Card key={ch.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <ch.icon className="h-5 w-5" />
                  <CardTitle className="text-base">{ch.name}</CardTitle>
                </div>
                <Badge variant="outline" className="w-fit text-[10px]">
                  {ch.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Connect Buffer to enable scheduling for this channel.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">How it works</CardTitle>
            <CardDescription>Organic content only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Generate content in Create Content or AI Assistant</p>
            <p>2. Save or send to calendar</p>
            <p>3. Connect Buffer in Settings</p>
            <p>4. Schedule and publish organically to your channels</p>
            <p className="pt-2 text-xs">No ad budgets, no bidding, no paid campaigns — just your content.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

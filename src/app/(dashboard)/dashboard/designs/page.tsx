import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Link2, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DesignsPage() {
  return (
    <>
      <DashboardHeader
        title="Designs"
        description="Create flyers, menus and social graphics with Canva"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-3xl">
        <Card className="border-primary/20">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Connect Canva</h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Design flyers, menus, product announcements and social posts. Transfer AI-generated text into designs easily.
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

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Social media post", desc: "Instagram & Facebook sized graphics" },
            { title: "Digital menu", desc: "Clean menu layouts for your mini website" },
            { title: "Flyer / promo", desc: "Weekend specials and offers" },
            { title: "Story templates", desc: "Vertical designs for Stories & Reels" },
          ].map((item) => (
            <Card key={item.title} className="opacity-75">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" disabled>
                  Connect Canva to create
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-dashed">
          <CardContent className="py-6 text-sm text-muted-foreground">
            After connecting Canva, you can open designs from AI-generated content with one click.
            Your brand colors and logo from the business profile will be available where supported.
          </CardContent>
        </Card>
      </div>
    </>
  );
}

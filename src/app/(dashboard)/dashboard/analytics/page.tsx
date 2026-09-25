import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, TrendingUp, Eye, Heart, MessageCircle } from "lucide-react";

const stats = [
  { label: "Posts published", value: "48", change: "+12 this month", icon: FileText },
  { label: "Scheduled", value: "14", change: "Next 7 days", icon: Calendar },
  { label: "Total reach", value: "8.4k", change: "+22%", icon: Eye },
  { label: "Engagement", value: "1.2k", change: "+18%", icon: Heart },
];

const topContent = [
  { title: "Weekend chicken special", platform: "Instagram", engagement: 342, type: "Post" },
  { title: "Behind the grill stories", platform: "TikTok", engagement: 289, type: "Video" },
  { title: "Customer thank you", platform: "Facebook", engagement: 156, type: "Post" },
  { title: "New menu launch", platform: "WhatsApp", engagement: 98, type: "Broadcast" },
];

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader
        title="Analytics"
        description="Organic content performance — no ad metrics"
      />

      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="success" className="text-[10px]">{s.change}</Badge>
                </div>
                <p className="mt-2 text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Best performing content</CardTitle>
              <CardDescription>By engagement (likes, comments, shares)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topContent.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.platform} · {item.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Heart className="h-3.5 w-3.5 text-pink-500" />
                    {item.engagement}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content activity</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Instagram posts</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Facebook posts</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">TikTok videos</span>
                <span className="font-medium">9</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">WhatsApp messages</span>
                <span className="font-medium">9</span>
              </div>
              <div className="pt-2 border-t flex items-center justify-between text-sm font-medium">
                <span>Total published</span>
                <span>48</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-dashed">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Connect Buffer to pull live organic metrics (reach, impressions, engagement) automatically.
            <br />
            <span className="text-xs">Settings → Integrations → Buffer</span>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

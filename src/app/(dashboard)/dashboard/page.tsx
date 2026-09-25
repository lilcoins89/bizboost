import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  PenSquare,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "Generate Posts",
    description: "Create Instagram, TikTok & WhatsApp content",
    href: "/dashboard/create",
    icon: PenSquare,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "AI Assistant",
    description: "Ask for content plans & ideas",
    href: "/dashboard/assistant",
    icon: Sparkles,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Content Calendar",
    description: "Plan & schedule your week",
    href: "/dashboard/calendar",
    icon: Calendar,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Customers",
    description: "Manage contacts & follow-ups",
    href: "/dashboard/customers",
    icon: Users,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
];

const stats = [
  { label: "Posts this week", value: "12", change: "+3", icon: FileText },
  { label: "Scheduled", value: "8", change: "", icon: Calendar },
  { label: "Customers", value: "47", change: "+5", icon: Users },
  { label: "Engagement", value: "1.2k", change: "+18%", icon: TrendingUp },
];

export default function DashboardOverviewPage() {
  return (
    <>
      <DashboardHeader
        title="Overview"
        description="Your AI-powered marketing workspace"
      />

      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome banner */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Welcome to BizBoost</h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Your AI marketing assistant is ready. Generate content, plan your week, and grow organically — no paid ads needed.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/create">
                Create content <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  {stat.change && (
                    <Badge variant="success" className="text-[10px]">
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="text-sm font-medium mb-3">Quick actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Card className="h-full transition-colors hover:border-primary/40 hover:bg-accent/30 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base mt-2">{action.title}</CardTitle>
                    <CardDescription className="text-xs">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's content + Recent */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's content</CardTitle>
              <CardDescription>Posts scheduled or suggested for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="h-8 w-8 rounded bg-pink-500/10 flex items-center justify-center text-xs font-medium text-pink-600">IG</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Weekend special announcement</p>
                  <p className="text-xs text-muted-foreground">Scheduled · 10:00 AM</p>
                </div>
                <Badge variant="secondary">Ready</Badge>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="h-8 w-8 rounded bg-sky-500/10 flex items-center justify-center text-xs font-medium text-sky-600">WA</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Customer thank-you message</p>
                  <p className="text-xs text-muted-foreground">Draft</p>
                </div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/calendar">View calendar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI suggestions</CardTitle>
              <CardDescription>Ideas based on your business profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3 space-y-1">
                <p className="text-sm font-medium">Promote this weekend's special</p>
                <p className="text-xs text-muted-foreground">Generate 5 posts for Instagram & WhatsApp</p>
                <Button size="sm" variant="secondary" className="mt-2" asChild>
                  <Link href="/dashboard/create?prompt=weekend+special">Generate</Link>
                </Button>
              </div>
              <div className="rounded-lg border p-3 space-y-1">
                <p className="text-sm font-medium">7-day content plan</p>
                <p className="text-xs text-muted-foreground">Full week of organic content ideas</p>
                <Button size="sm" variant="secondary" className="mt-2" asChild>
                  <Link href="/dashboard/assistant?q=7+day+plan">Ask AI</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Calendar,
  Users,
  Globe,
  Palette,
  BarChart3,
  ArrowRight,
  Check,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description:
      "Create Instagram captions, TikTok scripts, WhatsApp messages, menus and more — personalized to your business.",
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    description:
      "Plan your week, schedule organic posts, and never miss a day of consistent marketing.",
  },
  {
    icon: Globe,
    title: "Mini Website / Digital Menu",
    description:
      "Get a beautiful public page at bizboost.com/yourname with products, hours, WhatsApp & call buttons.",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description:
      "Store contacts, notes, and generate personalized follow-ups without spamming anyone.",
  },
  {
    icon: Palette,
    title: "Designs & Canva",
    description:
      "Turn AI copy into flyers, menus and social graphics with Canva integration.",
  },
  {
    icon: BarChart3,
    title: "Organic Analytics",
    description:
      "Track posts published, engagement and what content works — no ad metrics, just real growth.",
  },
];

const categories = [
  "Shawarma &
  Grilled Chicken",
  "Restaurants",
  "Salons & Barbers",
  "Fashion &
  Retail",
  "Bakeries",
  "Service Businesses",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
              B
            </div>
            BizBoost
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get started free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-6">
          <Zap className="h-3.5 w-3.5 text-primary" />
          AI-powered · Organic growth · No paid ads
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
          Marketing workspace for{" "}
          <span className="text-primary">local businesses</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Create content, manage customers, build a mini website, and grow organically.
          Built for shawarma vendors, restaurants, salons, fashion stores and every small business that deserves great tools.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">
              Start free <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard">View dashboard demo</Link>
          </Button>
        </div>

        {/* Category chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Everything you need to grow organically
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principle */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-background p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold">This is not an advertising platform</h2>
          <p className="mt-4 text-muted-foreground">
            BizBoost is an AI-powered marketing and business management workspace.
            We focus on content, social media, design, customers, CRM, business websites,
            content planning and organic growth — never paid ads.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            {["Content", "Social", "Design", "CRM", "Websites", "AI Assistant"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to grow your business?</h2>
        <p className="mt-3 text-muted-foreground">
          Join local businesses already using AI to create better content and connect with customers.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/register">
            Create your free account <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs">
              B
            </div>
            BizBoost
          </div>
          <p>© {new Date().getFullYear()} BizBoost. Built for small businesses.</p>
        </div>
      </footer>
    </div>
  );
}

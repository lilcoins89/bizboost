"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Presentation,
  FileText,
  Briefcase,
  UtensilsCrossed,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

const docTypes = [
  {
    id: "menu",
    title: "Digital menu",
    desc: "Product list with prices — great for share links",
    icon: UtensilsCrossed,
  },
  {
    id: "profile",
    title: "Company profile",
    desc: "About your business for partners or landlords",
    icon: Briefcase,
  },
  {
    id: "proposal",
    title: "Simple proposal",
    desc: "Catering or service proposal",
    icon: FileText,
  },
  {
    id: "deck",
    title: "Presentation",
    desc: "Short pitch or product presentation",
    icon: Presentation,
  },
];

export default function PresentationsPage() {
  const [selected, setSelected] = useState("menu");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState(
    [
      {
        id: "1",
        title: "BigBite Weekend Menu",
        type: "Digital menu",
        createdAt: "3 days ago",
      },
      {
        id: "2",
        title: "Catering Proposal — Office Lunch",
        type: "Simple proposal",
        createdAt: "1 week ago",
      },
    ] as { id: string; title: string; type: string; createdAt: string }[]
  );

  function handleCreate() {
    if (!title.trim()) {
      toast.error("Give your document a title");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const t = docTypes.find((x) => x.id === selected);
      setDocs((d) => [
        {
          id: String(Date.now()),
          title,
          type: t?.title || "Document",
          createdAt: "Just now",
        },
        ...d,
      ]);
      setTitle("");
      setDetails("");
      setLoading(false);
      toast.success("Document created");
    }, 1400);
  }

  return (
    <>
      <DashboardHeader
        title="Presentations & documents"
        description="Menus, proposals and decks — built into BizBoost"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {docTypes.map((t) => (
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
            </button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Presentation className="h-4 w-4" />
              Create document
            </CardTitle>
            <CardDescription>
              Uses your business profile (name, products, brand) automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                className="mt-1"
                placeholder="e.g. Weekend Menu March 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Extra details (optional)</label>
              <Textarea
                className="mt-1 resize-none"
                rows={3}
                placeholder="Any specific products, prices or sections to include..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <Button onClick={handleCreate} disabled={loading} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Presentation className="h-4 w-4" /> Create
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-sm font-medium mb-3">Your documents</h3>
          <div className="space-y-3">
            {docs.map((d) => (
              <Card key={d.id}>
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{d.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.type} · {d.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-[10px]">
                      Ready
                    </Badge>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                      <ExternalLink className="h-3 w-3" /> Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Presentations and documents are built into BizBoost. No Gamma account required.
        </p>
      </div>
    </>
  );
}

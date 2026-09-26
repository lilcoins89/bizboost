"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Plus,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  status: "lead" | "customer" | "vip" | "inactive";
  notes?: string;
  lastContact?: string;
};

const initial: Customer[] = [
  {
    id: "1",
    name: "Chioma A.",
    phone: "+234 803 111 2222",
    status: "vip",
    notes: "Orders every Friday. Prefers chicken shawarma.",
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "Tunde B.",
    phone: "+234 802 333 4444",
    email: "tunde@email.com",
    status: "customer",
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Amina K.",
    phone: "+234 805 555 6666",
    status: "lead",
    notes: "Asked about catering for office lunch.",
    lastContact: "Yesterday",
  },
];

const statusColor: Record<string, "default" | "secondary" | "success" | "outline"> = {
  lead: "outline",
  customer: "secondary",
  vip: "success",
  inactive: "outline",
};

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>(initial);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpFor, setFollowUpFor] = useState<Customer | null>(null);
  const [followUpText, setFollowUpText] = useState("");
  const [generating, setGenerating] = useState(false);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  function addCustomer() {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setCustomers((prev) => [
      {
        id: String(Date.now()),
        name,
        phone: phone || undefined,
        notes: notes || undefined,
        status: "lead",
        lastContact: "Just now",
      },
      ...prev,
    ]);
    setName("");
    setPhone("");
    setNotes("");
    setShowAdd(false);
    toast.success("Customer added");
  }

  function generateFollowUp(c: Customer) {
    setFollowUpFor(c);
    setGenerating(true);
    setTimeout(() => {
      setFollowUpText(
        `Hi ${c.name.split(" ")[0]}! 👋\n\nJust checking in from BigBite. We'd love to see you again this weekend — fresh shawarma and grilled chicken ready for you.\n\nReply anytime or WhatsApp us to order. Thank you for supporting local!`
      );
      setGenerating(false);
    }, 800);
  }

  return (
    <>
      <DashboardHeader
        title="CRM"
        description="Manage customers, notes and follow-ups — built into BizBoost"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button size="sm" className="gap-1.5" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="h-4 w-4" /> Add customer
          </Button>
        </div>

        {/* Add form */}
        {showAdd && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">New customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Textarea placeholder="Notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="resize-none" />
              <div className="flex gap-2">
                <Button onClick={addCustomer}>Save</Button>
                <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List */}
        <div className="space-y-3">
          {filtered.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm">{c.name}</p>
                        <Badge variant={statusColor[c.status]} className="text-[10px] capitalize">
                          {c.status}
                        </Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        {c.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {c.phone}
                          </span>
                        )}
                        {c.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {c.email}
                          </span>
                        )}
                        {c.lastContact && <span>Last: {c.lastContact}</span>}
                      </div>
                      {c.notes && (
                        <p className="mt-1.5 text-xs text-muted-foreground">{c.notes}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 gap-1.5 h-8 text-xs"
                    onClick={() => generateFollowUp(c)}
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No customers match your search.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Follow-up panel */}
        {followUpFor && (
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-base">
                Follow-up for {followUpFor.name}
              </CardTitle>
              <CardDescription>
                AI-generated message. You must copy and send yourself — nothing is sent automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {generating ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                </div>
              ) : (
                <Textarea
                  value={followUpText}
                  onChange={(e) => setFollowUpText(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              )}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    navigator.clipboard.writeText(followUpText);
                    toast.success("Copied — paste into WhatsApp or SMS");
                  }}
                  disabled={generating}
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Copy message
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setFollowUpFor(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-xs text-muted-foreground text-center">
          CRM is built into BizBoost. No HubSpot account required. You always approve before any message is sent.
        </p>
      </div>
    </>
  );
}

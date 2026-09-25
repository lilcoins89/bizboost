"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, Mail, MessageCircle } from "lucide-react";

const demoCustomers = [
  { id: "1", name: "Amina Yusuf", phone: "+234 801 234 5678", email: "amina@email.com", status: "vip", notes: "Loves spicy shawarma", lastContact: "2 days ago" },
  { id: "2", name: "Chidi Okonkwo", phone: "+234 802 345 6789", email: null, status: "customer", notes: "Regular Friday orders", lastContact: "1 week ago" },
  { id: "3", name: "Fatima Bello", phone: "+234 803 456 7890", email: "fatima@email.com", status: "lead", notes: "Inquired about catering", lastContact: "Yesterday" },
  { id: "4", name: "Tunde Adeyemi", phone: "+234 804 567 8901", email: "tunde@email.com", status: "customer", notes: "", lastContact: "3 days ago" },
  { id: "5", name: "Ngozi Eze", phone: "+234 805 678 9012", email: null, status: "inactive", notes: "Moved area", lastContact: "1 month ago" },
];

const statusVariant: Record<string, "default" | "secondary" | "success" | "outline"> = {
  vip: "default",
  customer: "success",
  lead: "secondary",
  inactive: "outline",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = demoCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <>
      <DashboardHeader
        title="Customers"
        description="Manage contacts, notes and follow-ups"
      />

      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add customer
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} className="hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Last contact: {c.lastContact}
                    </p>
                  </div>
                  <Badge variant={statusVariant[c.status] || "secondary"} className="capitalize text-[10px]">
                    {c.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {c.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {c.phone}
                  </div>
                )}
                {c.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    {c.email}
                  </div>
                )}
                {c.notes && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded p-2">{c.notes}</p>
                )}
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                    <MessageCircle className="h-3 w-3" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Follow up
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No customers found. Add your first contact to start building relationships.
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

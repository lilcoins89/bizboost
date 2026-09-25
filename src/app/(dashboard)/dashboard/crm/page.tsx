import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact, Link2, Users } from "lucide-react";
import Link from "next/link";

export default function CRMPage() {
  return (
    <>
      <DashboardHeader
        title="CRM"
        description="Lightweight built-in CRM or full HubSpot sync"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Built-in CRM</CardTitle>
              </div>
              <CardDescription>
                Manage contacts, notes, status and follow-ups right inside BizBoost.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard/customers">Open Customers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Contact className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">HubSpot</CardTitle>
              </div>
              <CardDescription>
                Sync contacts and deals with your HubSpot account for advanced CRM.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline">Not connected</Badge>
              <div>
                <Button variant="outline" size="sm" asChild className="gap-1.5">
                  <Link href="/dashboard/settings">
                    <Link2 className="h-3.5 w-3.5" />
                    Connect HubSpot
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Follow-up tools</CardTitle>
            <CardDescription>
              Generate personalized messages — never auto-spam. You always approve before sending.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Thank-you messages after orders</p>
            <p>• Re-engagement for inactive customers</p>
            <p>• Birthday / occasion messages</p>
            <p>• New product announcements</p>
            <p className="pt-2 text-xs">All messages require your explicit action before any communication is sent.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const sampleEvents: Record<string, { title: string; platform: string; status: string }[]> = {
  // Will be dynamic; sample for demo
};

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/15 text-pink-700 dark:text-pink-400 border-pink-500/30",
  facebook: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  tiktok: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
  whatsapp: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
};

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(new Date());

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Demo events
  const demoEvents = [
    { date: new Date(), title: "Weekend special post", platform: "instagram", status: "scheduled" },
    { date: new Date(), title: "WhatsApp broadcast", platform: "whatsapp", status: "draft" },
    {
      date: new Date(Date.now() + 86400000),
      title: "TikTok video idea",
      platform: "tiktok",
      status: "planned",
    },
    {
      date: new Date(Date.now() + 2 * 86400000),
      title: "Customer appreciation",
      platform: "facebook",
      status: "planned",
    },
  ];

  function eventsForDay(day: Date) {
    return demoEvents.filter((e) => isSameDay(e.date, day));
  }

  return (
    <>
      <DashboardHeader
        title="Content Calendar"
        description="Plan, schedule and organize your organic content"
      />

      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrent(subMonths(current, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold min-w-[160px] text-center">
              {format(current, "MMMM yyyy")}
            </h2>
            <Button variant="outline" size="icon" onClick={() => setCurrent(addMonths(current, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add content
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar grid */}
          <Card className="lg:col-span-2">
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-px mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const events = eventsForDay(day);
                  const isSelected = selected && isSameDay(day, selected);
                  const isToday = isSameDay(day, new Date());
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelected(day)}
                      className={`min-h-[72px] rounded-lg border p-1.5 text-left transition-colors hover:bg-accent/50 ${
                        !isSameMonth(day, current) ? "opacity-40" : ""
                      } ${
                        isSelected ? "border-primary bg-primary/5" : ""
                      } ${isToday ? "ring-1 ring-primary/40" : ""}`}
                    >
                      <span
                        className={`text-xs font-medium ${
                          isToday ? "text-primary" : ""
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {events.slice(0, 2).map((e, i) => (
                          <div
                            key={i}
                            className={`text-[10px] truncate rounded px-1 py-0.5 border ${platformColors[e.platform] || ""}`}
                          >
                            {e.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-[10px] text-muted-foreground">+{events.length - 2}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Day detail */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {selected ? format(selected, "EEEE, MMM d") : "Select a day"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selected && eventsForDay(selected).length === 0 && (
                <p className="text-sm text-muted-foreground">No content planned.</p>
              )}
              {selected &&
                eventsForDay(selected).map((e, i) => (
                  <div key={i} className="rounded-lg border p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{e.title}</p>
                      <Badge variant="secondary" className="text-[10px] capitalize">
                        {e.status}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] capitalize ${platformColors[e.platform] || ""}`}
                    >
                      {e.platform}
                    </Badge>
                  </div>
                ))}
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Add to this day
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

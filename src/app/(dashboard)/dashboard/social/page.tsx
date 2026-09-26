"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Instagram,
  Facebook,
  Video,
  Linkedin,
  Calendar,
  Send,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

const channels = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { id: "tiktok", name: "TikTok", icon: Video, color: "text-foreground" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-sky-700" },
];

const scheduledDemo = [
  {
    id: "1",
    text: "🔥 Weekend chicken shawarma special is live! Fresh, juicy, and ready for you.",
    channel: "instagram",
    when: "Today · 10:00 AM",
    status: "scheduled",
  },
  {
    id: "2",
    text: "Thank you for supporting local! Drop by BigBite this weekend.",
    channel: "facebook",
    when: "Tomorrow · 12:00 PM",
    status: "scheduled",
  },
  {
    id: "3",
    text: "POV: Best shawarma in town 🔥 #fyp #localfood",
    channel: "tiktok",
    when: "Sat · 6:00 PM",
    status: "draft",
  },
];

export default function SocialMediaPage() {
  const [postText, setPostText] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["instagram"]);
  const [scheduleAt, setScheduleAt] = useState("");
  const [posts, setPosts] = useState(scheduledDemo);

  function toggleChannel(id: string) {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleSchedule() {
    if (!postText.trim()) {
      toast.error("Write something to post");
      return;
    }
    if (selectedChannels.length === 0) {
      toast.error("Select at least one channel");
      return;
    }
    const newPost = {
      id: String(Date.now()),
      text: postText,
      channel: selectedChannels[0],
      when: scheduleAt ? new Date(scheduleAt).toLocaleString() : "Now (queue)",
      status: scheduleAt ? "scheduled" : "queued",
    };
    setPosts((p) => [newPost, ...p]);
    setPostText("");
    setScheduleAt("");
    toast.success("Post added to your organic schedule");
  }

  return (
    <>
      <DashboardHeader
        title="Social Media"
        description="Schedule and publish organic posts — built into BizBoost"
      />

      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        {/* Composer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New post
            </CardTitle>
            <CardDescription>
              Write once, publish to Instagram, Facebook, TikTok or LinkedIn. Organic only — no ads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's happening at your business this week?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows={4}
              className="resize-none"
            />

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Channels</p>
              <div className="flex flex-wrap gap-2">
                {channels.map((ch) => {
                  const active = selectedChannels.includes(ch.id);
                  return (
                    <Button
                      key={ch.id}
                      type="button"
                      variant={active ? "default" : "outline"}
                      size="sm"
                      className="gap-1.5"
                      onClick={() => toggleChannel(ch.id)}
                    >
                      <ch.icon className={`h-3.5 w-3.5 ${active ? "" : ch.color}`} />
                      {ch.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Schedule (optional)</label>
                <Input
                  type="datetime-local"
                  value={scheduleAt}
                  onChange={(e) => setScheduleAt(e.target.value)}
                  className="h-9 w-auto"
                />
              </div>
              <Button onClick={handleSchedule} className="gap-1.5">
                {scheduleAt ? (
                  <>
                    <Calendar className="h-4 w-4" /> Schedule
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Add to queue
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Queue */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Scheduled & drafts
          </h3>
          <div className="space-y-3">
            {posts.map((p) => {
              const ch = channels.find((c) => c.id === p.channel);
              return (
                <Card key={p.id}>
                  <CardContent className="p-4 flex items-start gap-3">
                    {ch && (
                      <div className={`mt-0.5 ${ch.color}`}>
                        <ch.icon className="h-5 w-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm whitespace-pre-wrap">{p.text}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {ch?.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{p.when}</span>
                        <Badge
                          variant={p.status === "scheduled" ? "success" : "outline"}
                          className="text-[10px] gap-1"
                        >
                          {p.status === "scheduled" && <CheckCircle2 className="h-3 w-3" />}
                          {p.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Publishing is powered by BizBoost. No external accounts to connect — just schedule and go.
        </p>
      </div>
    </>
  );
}

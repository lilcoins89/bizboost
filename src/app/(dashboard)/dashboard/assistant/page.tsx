"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How can I promote my grilled chicken this weekend?",
  "Give me 7 days of content",
  "Write a WhatsApp message for today's special",
  "Create a product description for chicken wings",
  "Give me 10 TikTok video ideas",
  "Create a monthly content plan",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your BizBoost AI assistant. I know your business profile and can help with content ideas, captions, plans, product descriptions, and more.\n\nWhat would you like to work on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      let reply = "";
      if (res.ok) {
        const data = await res.json();
        reply = data.reply;
      } else {
        reply = getLocalReply(content);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getLocalReply(content) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DashboardHeader
        title="AI Assistant"
        description="Ask anything about content, growth, or your business"
      />

      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 max-w-3xl mx-auto w-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl bg-muted px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 lg:px-6 pb-2 max-w-3xl mx-auto w-full">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs rounded-full border px-3 py-1.5 hover:bg-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t p-4 lg:px-6">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Textarea
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              className="min-h-[44px] max-h-32 resize-none"
            />
            <Button
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function getLocalReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("7 day") || lower.includes("week") || lower.includes("plan")) {
    return `Here's a 7-day organic content plan for your business:\n\n**Day 1 – Monday**\n• Behind-the-scenes prep story\n• "What we're cooking today" Instagram post\n\n**Day 2 – Tuesday**\n• Customer testimonial repost\n• WhatsApp broadcast: mid-week special\n\n**Day 3 – Wednesday**\n• TikTok: quick recipe / product tip\n• Facebook: "Hump day deal"\n\n**Day 4 – Thursday**\n• Product spotlight carousel\n• Story poll: "Which flavour next?"\n\n**Day 5 – Friday**\n• Weekend special announcement (all platforms)\n• Countdown stories\n\n**Day 6 – Saturday**\n• Live or real-time posts of busy service\n• User-generated content share\n\n**Day 7 – Sunday**\n• Thank-you / appreciation post\n• Soft CTA for next week\n\nWant me to write the actual captions for any of these days?`;
  }

  if (lower.includes("tiktok") || lower.includes("video idea")) {
    return `Here are 10 short-form video ideas:\n\n1. "POV: You just walked into [your business]" – door opening + first look\n2. 15-second product assembly / plating ASMR\n3. "3 reasons locals love us" – quick cuts\n4. Before/after of a popular item\n5. Staff favourite recommendation\n6. "Day in the life" of prep\n7. Customer reaction (with permission)\n8. "Order this if you like..." quiz style\n9. Trending audio + your product\n10. "What we wish customers knew" tips\n\nWant full scripts for any of these?`;
  }

  if (lower.includes("whatsapp")) {
    return `Here's a ready-to-send WhatsApp message:\n\n---\nHi! 👋\n\nJust a quick note from us — today's special is ready and smelling amazing.\n\nReply to this message or call us to order. Limited quantity today!\n\nSee you soon ❤️\n---\n\nWant a more promotional or more personal version?`;
  }

  return `Great question! Based on a typical local business profile, here's how I'd approach it:\n\n1. Lead with something visual and appetizing/attractive\n2. Keep the first line as a strong hook\n3. Include a clear but soft call-to-action\n4. Match your brand voice (friendly & local)\n\nWould you like me to generate specific captions, a full content plan, or product descriptions for this? Just tell me the platform and the offer.`;
}

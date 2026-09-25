"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const categories = [
  "Shawarma / Grilled Chicken",
  "Restaurant / Food Vendor",
  "Bakery",
  "Salon / Beauty",
  "Barber",
  "Fashion / Clothing",
  "Retail Shop",
  "Freelancer / Service",
  "Other",
];

const steps = [
  "Business name",
  "Category",
  "Products / Services",
  "Location & Contact",
  "Social accounts",
  "Brand identity",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    category: "",
    products: "",
    location: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    brandVoice: "",
    brandColors: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step === 0 && !form.name.trim()) {
      toast.error("Please enter your business name");
      return;
    }
    if (step === 1 && !form.category) {
      toast.error("Please select a category");
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      toast.success("Setup complete! Generating your first content plan...");
      router.push("/dashboard");
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              B
            </div>
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
          </div>
          <CardTitle>{steps[step]}</CardTitle>
          <CardDescription>
            {step === 0 && "What is the name of your business?"}
            {step === 1 && "What type of business do you run?"}
            {step === 2 && "List your main products or services (one per line)"}
            {step === 3 && "Where are you located and how can customers reach you?"}
            {step === 4 && "Add your social handles (optional)"}
            {step === 5 && "Describe your brand voice and preferred colors"}
          </CardDescription>
          {/* Progress */}
          <div className="flex gap-1 mt-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <Input
              placeholder="e.g. BigBite Shawarma"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoFocus
            />
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => update("category", c)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm text-left transition-colors ${
                    form.category === c
                      ? "border-primary bg-primary/5 text-primary"
                      : "hover:bg-accent"
                  }`}
                >
                  {c}
                  {form.category === c && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <Textarea
              placeholder={"Chicken Shawarma - ₦2,500\nBeef Shawarma - ₦3,000\nGrilled Chicken - ₦4,500"}
              value={form.products}
              onChange={(e) => update("products", e.target.value)}
              rows={6}
            />
          )}

          {step === 3 && (
            <div className="space-y-3">
              <Input
                placeholder="Location / Area (e.g. Ikeja, Lagos)"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
              <Input
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              <Input
                placeholder="WhatsApp number"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <Input
                placeholder="Instagram @handle"
                value={form.instagram}
                onChange={(e) => update("instagram", e.target.value)}
              />
              <Input
                placeholder="TikTok @handle"
                value={form.tiktok}
                onChange={(e) => update("tiktok", e.target.value)}
              />
              <Input
                placeholder="Facebook page name or URL"
                value={form.facebook}
                onChange={(e) => update("facebook", e.target.value)}
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <Textarea
                placeholder="Brand voice: e.g. Friendly, local, mouth-watering, energetic..."
                value={form.brandVoice}
                onChange={(e) => update("brandVoice", e.target.value)}
                rows={3}
              />
              <Input
                placeholder="Brand colors (e.g. #FF6B00, #1A1A1A)"
                value={form.brandColors}
                onChange={(e) => update("brandColors", e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={next}>
              {step === steps.length - 1 ? (
                <>
                  Finish & go to dashboard <Check className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

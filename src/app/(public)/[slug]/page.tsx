import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, Instagram, Globe } from "lucide-react";

// Demo data — replace with Prisma lookup by slug in production
const DEMO_BUSINESSES: Record<
  string,
  {
    name: string;
    category: string;
    description: string;
    location: string;
    phone: string;
    whatsapp: string;
    instagram?: string;
    hours: string;
    products: { name: string; price: string; description?: string }[];
  }
> = {
  bigbite: {
    name: "BigBite Shawarma",
    category: "Shawarma & Grilled Chicken",
    description:
      "Fresh, juicy shawarma and grilled chicken made daily. The neighbourhood favourite for quick, delicious meals.",
    location: "Ikeja, Lagos",
    phone: "+234 801 234 5678",
    whatsapp: "2348012345678",
    instagram: "@bigbiteshawarma",
    hours: "Mon–Sat 10:00 – 22:00",
    products: [
      { name: "Chicken Shawarma", price: "₦2,500", description: "Grilled chicken, veggies, special sauce" },
      { name: "Beef Shawarma", price: "₦3,000", description: "Tender beef, fresh salad, house sauce" },
      { name: "Mixed Shawarma", price: "₦3,500", description: "Chicken + beef combo" },
      { name: "Grilled Chicken (Full)", price: "₦4,500", description: "Whole grilled chicken with sides" },
      { name: "Chicken Wings (6pcs)", price: "₦2,000", description: "Crispy spiced wings" },
    ],
  },
};

export default async function PublicBusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = DEMO_BUSINESSES[slug.toLowerCase()];

  if (!business) {
    notFound();
  }

  const waLink = `https://wa.me/${business.whatsapp}?text=Hi%20${encodeURIComponent(business.name)}%2C%20I%20saw%20your%20page%20on%20BizBoost`;
  const callLink = `tel:${business.phone}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Cover */}
      <div className="h-40 md:h-56 bg-gradient-to-br from-primary/80 to-primary relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-end pb-4 relative z-10">
          <div className="flex items-end gap-4">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-primary">
              {business.name.charAt(0)}
            </div>
            <div className="pb-1 text-white">
              <h1 className="text-2xl md:text-3xl font-bold drop-shadow">{business.name}</h1>
              <p className="text-sm opacity-90">{business.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button asChild className="gap-2 flex-1 sm:flex-none">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button variant="outline" asChild className="gap-2 flex-1 sm:flex-none">
            <a href={callLink}>
              <Phone className="h-4 w-4" /> Call
            </a>
          </Button>
        </div>

        {/* About */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            About
          </h2>
          <p className="text-sm leading-relaxed">{business.description}</p>
        </section>

        {/* Info */}
        <section className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2 rounded-lg border p-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <span>{business.location}</span>
          </div>
          <div className="flex items-start gap-2 rounded-lg border p-3">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <span>{business.hours}</span>
          </div>
          {business.instagram && (
            <div className="flex items-start gap-2 rounded-lg border p-3">
              <Instagram className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <span>{business.instagram}</span>
            </div>
          )}
        </section>

        {/* Menu / Products */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Menu
          </h2>
          <div className="space-y-2">
            {business.products.map((p) => (
              <div
                key={p.name}
                className="flex items-start justify-between gap-4 rounded-xl border p-4 hover:border-primary/30 transition-colors"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  {p.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                  )}
                </div>
                <p className="font-semibold text-primary whitespace-nowrap">{p.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-xs text-muted-foreground border-t">
          <p className="flex items-center justify-center gap-1">
            <Globe className="h-3 w-3" /> Powered by{" "}
            <a href="/" className="text-primary hover:underline">
              BizBoost
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

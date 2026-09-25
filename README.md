# BizBoost 🚀

**AI-powered marketing & business growth workspace for small and local businesses.**

Shawarma vendors • Grilled chicken • Restaurants • Salons • Barbers • Fashion • Retail • Service businesses

> **This is NOT an advertising platform.**  
> Focus: Organic content • Social media • Design • Customers • CRM • Mini websites • Content planning • AI assistance

---

## Features

- **Business Profile** – Complete brand identity, products, hours, social links
- **AI Marketing Content Generator** – Instagram, Facebook, TikTok, WhatsApp, menus, announcements
- **Content Calendar** – Plan, schedule, drag & drop
- **Social Media (Buffer)** – Organic scheduling for IG, FB, TikTok, LinkedIn
- **Canva Design Workflow** – Flyers, menus, posts
- **Mini Website / Digital Menu** – `bizboost.com/yourbusiness`
- **AI Website Content** – Descriptions, FAQs, about sections
- **Customer CRM** (HubSpot or built-in)
- **Customer Follow-ups** – Thank you, re-engagement, birthday messages (with consent)
- **AI Business Assistant** – Chat for content plans, ideas, copy
- **Content Repurposing** – One idea → many formats
- **Analytics** – Organic metrics only
- **Content Library** – Searchable history + templates
- **Business Templates** – Food, salon, fashion, service, etc.
- **Gamma Integration** – Presentations, menus, proposals
- **Modern Dashboard** – Clean, responsive, dark/light mode, PWA

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth.js + Prisma Adapter |
| Database | Prisma + PostgreSQL (or SQLite for local) |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Themes | next-themes |
| PWA | next-pwa ready |
| Integrations | Buffer, Canva, Gamma, HubSpot |

---

## Quick Start

```bash
git clone https://github.com/lilcoins89/bizboost.git
cd bizboost
npm install
cp .env.example .env
# Edit .env with your keys
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

See `.env.example` for the full list.

Required for core:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

Optional integrations:
- Buffer, Canva, Gamma, HubSpot, OpenAI/Grok compatible API for AI

---

## Project Structure

```
src/
  app/
    (auth)/          # Login, register, onboarding
    (dashboard)/     # Protected dashboard routes
    (public)/        # Public mini-websites /[slug]
    api/             # API routes
  components/
    ui/              # shadcn components
    dashboard/       # Dashboard specific
    ai/              # AI chat & generators
  lib/
    auth.ts
    prisma.ts
    ai.ts            # Content generation logic
    integrations/    # Buffer, Canva, etc.
  types/
prisma/
  schema.prisma
```

---

## Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| Buffer | Organic social scheduling | Connection flow + API ready |
| Canva | Design creation | Connection + transfer from AI content |
| Gamma | Presentations & menus | Create from business data |
| HubSpot | Full CRM | Optional deep integration |
| Built-in CRM | Lightweight contacts & notes | Fully functional |

---

## License

MIT — Built for small businesses that deserve great tools.

---

Made with ❤️ for the local business community.

# BizBoost 🚀

**AI-powered marketing & business growth workspace for small and local businesses.**

Shawarma vendors · Grilled chicken · Restaurants · Salons · Barbers · Fashion · Retail · Service businesses

> **This is NOT an advertising platform.**  
> Focus: Content · Social · Design · CRM · Mini websites · Organic growth · AI assistance

**Built-in features (no user account linking):** Social scheduling · Design studio · Presentations · CRM

---

## Features

| Feature | Description |
|---------|-------------|
| Business Profile | Brand, products, hours, social links |
| AI Content Generator | Instagram, TikTok, WhatsApp, menus, promos |
| Content Calendar | Plan and schedule organic posts |
| Social Media | Built-in organic scheduler |
| Design Studio | Flyers, menus, social graphics |
| Presentations | Menus, proposals, decks |
| Mini Website | Public page e.g. `/bigbite` |
| CRM | Contacts, notes, AI follow-ups (user-approved send) |
| AI Assistant | Chat for plans, ideas, copy |
| Analytics | Organic metrics only |
| Content Library | Searchable history + templates |
| PWA | Installable, dark/light mode |

---

## Tech Stack

- **Next.js 15** (App Router) · TypeScript · Tailwind · shadcn/ui
- **Prisma** + PostgreSQL (Neon/Supabase on Vercel)
- **next-themes** · Sonner · Lucide · Zod

---

## Local development

```bash
git clone https://github.com/lilcoins89/bizboost.git
cd bizboost
npm install
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://..."   # or use Neon free tier
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-a-long-random-string"
```

Then:

```bash
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

| Route | Purpose |
|-------|--------|
| `/` | Landing |
| `/login` · `/register` | Auth (demo mode) |
| `/onboarding` | 6-step setup |
| `/dashboard` | Full workspace |
| `/bigbite` | Demo public mini-site |

---

## Deploy on Vercel

### 1. Import the repo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lilcoins89/bizboost)

Or:

```bash
npm i -g vercel
vercel
```

### 2. Database (required)

Use **Neon** or **Supabase** (free PostgreSQL):

1. Create a project → copy connection string
2. In Vercel → Project → Settings → Environment Variables:

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | `postgresql://...` (Neon/Supabase) |
| `NEXTAUTH_SECRET` | Random 32+ char string |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Same as above |
| `AI_API_KEY` | Optional (Grok/OpenAI) |
| `AI_BASE_URL` | Optional e.g. `https://api.x.ai/v1` |
| `AI_MODEL` | Optional e.g. `grok-3` |

### 3. Deploy

```bash
vercel --prod
```

Or push to `main` — Vercel builds automatically via `vercel.json`:

- **Build:** `prisma generate && next build`
- **Framework:** Next.js

After first deploy, run migrations once (Vercel CLI or Neon SQL):

```bash
npx prisma db push
```

(Use the same `DATABASE_URL` as production.)

---

## Environment variables

See `.env.example`.

| Key | Required | Notes |
|-----|----------|--------|
| `DATABASE_URL` | Yes | PostgreSQL for production |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | App URL |
| `AI_API_KEY` | No | Enables real AI; fallbacks work without it |
| Platform Buffer/Canva/Gamma/HubSpot keys | No | Server-side only; users never connect these |

---

## Project structure

```
src/app/
  page.tsx                 # Landing
  login/ · register/       # Auth
  onboarding/              # Setup wizard
  (dashboard)/dashboard/   # Overview, AI, Create, Calendar, Social,
                           # Designs, Presentations, Website, CRM, ...
  (public)/[slug]/         # Public mini websites
  api/ai/generate/         # Content API
prisma/schema.prisma
vercel.json                # Production build config
```

---

## License

MIT — Built for small businesses that deserve great tools.

Made with ❤️ for the local business community.

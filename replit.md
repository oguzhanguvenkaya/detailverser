# DetailVerse

## Overview
DetailVerse is a social community platform for auto detailing enthusiasts. It features a feed of posts with before/after comparisons, product reviews, guides, and AI-powered detailing advice. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Recent Changes
- Pivoted to "Studio Pearl & Electric Cyan" theme: ultra-clean glassmorphism light design
- Background: bg-slate-50, Cards: bg-white/70 backdrop-blur-2xl, Text: text-slate-900
- Primary accents: cyan-500 to blue-600 gradient, Muted: text-slate-500
- Cards use frosted glass: border-white/80, shadow-[0_8px_30px_rgb(0,0,0,0.06)]
- Before/After slider labels: bg-black/60 backdrop-blur-md for high visibility
- Purged all honey-* custom theme tokens, using standard Tailwind classes only
- Set up PostgreSQL database with Drizzle ORM (users, categories, threads tables)
- Fixed ESLint config for Next.js 15 flat config compatibility
- Added lucide-react type declarations
- Downgraded from Next.js 16 to Next.js 15 for Replit environment compatibility
- Configured `allowedDevOrigins` in `next.config.ts` for Replit proxy support

## User Preferences
- "Studio Pearl & Electric Cyan" theme: clean, clinical, iOS-style glassmorphism
- Outfit font family
- Accessibility-focused: proper aria labels, touch targets, semantic HTML
- Standard Tailwind classes only (no custom theme tokens)

## Project Architecture
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Database**: PostgreSQL (Replit/Neon) with Drizzle ORM
- **UI Components**: Radix UI primitives, shadcn/ui pattern (components/ui/)
- **Icons**: Lucide React

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `feed/` - Feed-related components (thread cards, before/after slider)
  - `layout/` - Layout components (sidebar, navbar)
  - `mobile/` - Mobile-specific components
  - `ui/` - Reusable UI primitives (shadcn/ui)
- `db/` - Database schema and connection (Drizzle ORM)
  - `schema.ts` - Table definitions (users, categories, threads)
  - `index.ts` - Database connection
- `drizzle/` - Generated migrations
- `lib/` - Utilities, types, and mock data
- `public/` - Static assets
- `types/` - Custom type declarations

### Database Schema
- `users` - id (uuid), username, avatarUrl, aiCredits, role, createdAt
- `categories` - id (uuid), name, slug
- `threads` - id (uuid), title, slug, content, authorId, categoryId, viewCount, beforeImageUrl, afterImageUrl, createdAt

### Running
- Dev: `npx next dev --hostname 0.0.0.0 --port 5000`
- Build: `npm run build`
- Start: `npm run start`
- DB Push: `npx drizzle-kit push`

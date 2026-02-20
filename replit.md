# DetailVerse

## Overview
DetailVerse is a social community platform for auto detailing enthusiasts. It features a feed of posts with before/after comparisons, product reviews, guides, and AI-powered detailing advice. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Recent Changes
- Downgraded from Next.js 16 to Next.js 15 for Replit environment compatibility
- Configured `allowedDevOrigins` in `next.config.ts` for Replit proxy support
- Set up deployment configuration

## Project Architecture
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI primitives, shadcn/ui pattern (components/ui/)
- **Icons**: Lucide React

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `feed/` - Feed-related components (thread cards, before/after slider)
  - `layout/` - Layout components (sidebar, navbar)
  - `mobile/` - Mobile-specific components
  - `ui/` - Reusable UI primitives (shadcn/ui)
- `lib/` - Utilities, types, and mock data
- `public/` - Static assets

### Running
- Dev: `npx next dev --hostname 0.0.0.0 --port 5000`
- Build: `npm run build`
- Start: `npm run start`

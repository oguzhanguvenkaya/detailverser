# DetailVerse

## Overview
DetailVerse is a social community platform for auto detailing enthusiasts. It features a feed of posts with before/after comparisons, product reviews, guides, and AI-powered detailing advice. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Recent Changes
- Light mode theme consistency: replaced all zinc-* with stone-*, all cyan with amber across every component
- Fixed wiggle animation (translateX() → translateX(0))
- Fixed font variable (--font-inter → --font-outfit)
- Fixed ::selection color to match amber theme
- Removed unused CSS classes (.glass-label, .cyan-glow)
- Renamed proxy.ts → middleware.ts with correct export name
- Added mobile search button in TopNavbar
- Added active tab indicator with aria-current in BottomTabNav
- Thread detail page now uses full layout (navbar + sidebars)
- Loading skeleton matches page.tsx grid structure to prevent CLS
- Dynamic alt text for thread preview images
- Auth page fully converted to stone/amber palette
- Downgraded from Next.js 16 to Next.js 15 for Replit environment compatibility
- Configured `allowedDevOrigins` in `next.config.ts` for Replit proxy support

## User Preferences
- Light mode theme with amber/orange accent colors and stone neutrals
- Outfit font family
- Accessibility-focused: proper aria labels, touch targets, semantic HTML

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

# Product Requirements Document (PRD)

## 1. Executive Summary
**Project Name:** DetailVerse (Temporary Name)
**Vision:** To build a next-generation, AI-powered hybrid community platform for car detailing enthusiasts and professionals. It combines the visual appeal of a tech blog with the dynamic interaction of a forum, enhanced by a "Virtual Garage" for product tracking and a context-aware AI assistant.
**Platform:** Modern Web Application (Mobile-First, SEO Optimized SSR).

## 2. Market Problem & Solution
- **Problem:** Existing detailing forums (e.g., Autogeek, Detailing World) are stuck in the Web 2.0 (vBulletin) era. They are not mobile-friendly, visual sharing is cumbersome, and valuable technical advice gets buried in 50-page threads. Modern platforms like Reddit lose valuable guides within 48 hours due to their feed algorithms.
- **Solution:** A modern, infinite-scroll hybrid feed with Upvote/Downvote mechanics. Users manage their physical detailing inventory via a "Virtual Garage." An integrated AI (Detail Agent) reads only the forum's verified data to provide instant, safe detailing recipes, preventing repetitive questions.

## 3. Core Features & Mechanics

### 3.1. Hybrid Community Feed (UI/UX)
- A modern, rich-card-based homepage showing "Trending" and "New" threads.
- Traditional category navigation (Wash, Paint Correction, Coatings) available on the sidebar.
- Reputation System: Reddit-style Upvote/Downvote for threads and posts to surface high-quality content.

### 3.2. Media: Interactive 50/50 Slider
- The core of the detailing industry is "Before/After" paint correction photos. 
- Instead of static stacked images, users upload two photos (or one split photo) which the system converts into an interactive, draggable "Before/After Slider" component.

### 3.3. Virtual Garage & Product Catalog
- A master database of detailing products populated via background web scrapers.
- **Virtual Garage:** Users can search the catalog and add products to their profile, rate them, and write reviews.
- **Deal Tracking:** Users receive alerts (integrated with Affiliate links) when prices drop for items in their garage.
- **Smart Cross-Linking:** Viewing a product page automatically lists all forum threads where that product is mentioned.

### 3.4. Detail Agent (AI) & Gamified Economy (Detail Coin)
- **RAG-Powered Assistant:** A chat widget that answers detailing questions based *strictly* on the forum's vector database and official product guidelines, avoiding hallucinations.
- **Gamification Loop:** 
  - Starting Balance: 10 Credits.
  - Action: Asking the AI a question costs 2 Credits.
  - Earning: Users must actively contribute to earn credits (e.g., +10 for a new thread, +5 for a helpful reply). This forces "leechers" to become content creators.

## 4. Phased Rollout Plan
- **Phase 1 (MVP):** Next.js setup, User Auth, Hybrid Feed, Markdown Thread Creation, Voting System, and the 50/50 Image Slider.
- **Phase 2 (Catalog & Garage):** Python Scraper bots, Master Product DB, and "Virtual Garage" profile feature.
- **Phase 3 (AI & Economy):** Supabase `pgvector` integration, RAG AI Chatbot deployment, and the Credit Economy triggers.
- **Phase 4 (Monetization):** Autonomous deal-hunting bots (CrewAI), automated affiliate link generation, and price drop email alerts.
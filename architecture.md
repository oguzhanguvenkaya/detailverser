# System Architecture & Tech Stack

## 1. Architectural Philosophy: Zero-Latency & Colocation
The system is designed for maximum SEO performance (SSR) and a "Zero-Latency" user feel. To avoid Vercel's strict Serverless execution timeouts (10-60s) during heavy AI or scraping tasks, the architecture is decoupled.
**Colocation Strategy:** To eliminate network ping, Vercel (Next.js), Supabase (Database), and Google Cloud Run (Python Workers) will be hosted in the exact same geographical region (e.g., Frankfurt / `eu-central-1`).

## 2. Technology Stack

### 2.1. Frontend & Core Backend (Vercel Layer)
- **Framework:** `Next.js 15+ (App Router)` - Mandatory for SEO and fast Server-Side Rendering.
- **Styling & UI:** `Tailwind CSS`, `shadcn/ui`, `Lucide Icons`. (Strictly **Dark Mode** default to emphasize the gloss of automotive paint photos).
- **Core Logic:** Next.js `Server Actions` - For zero-latency, type-safe database mutations without writing traditional REST API routes.
- **ORM:** `Drizzle ORM` - Chosen over Prisma for its superior cold-start performance in Vercel Serverless environments.

### 2.2. Database, Auth & Storage (Supabase Layer)
- **Primary Database:** `PostgreSQL` (Managed by Supabase).
- **Authentication:** `Supabase Auth` (Email/Password, Google OAuth).
- **Media Storage:** `Supabase Storage` (AWS S3-backed) - Used for avatars and high-res 50/50 images.
- **Vector DB:** `pgvector` extension - Enabled within PostgreSQL for AI embedding storage and semantic search.

### 2.3. AI & Scraper Microservice (Google Cloud Run Layer)
- **Framework:** `FastAPI (Python)` - Handles long-running async tasks.
- **AI Orchestration:** `LangChain` - Manages the RAG pipeline, converting forum posts to embeddings and querying the vector DB.
- **LLM:** `OpenAI GPT-4o-mini` - Cost-effective, text-only model optimized for reasoning.
- **Scraper Bots:** `BeautifulSoup4` and `Playwright` - Runs via Cron Jobs to scrape e-commerce pricing.
- **Autonomous Agents (Phase 4):** `CrewAI`.

## 3. System Workflows

### 3.1. Core Forum Interaction (Zero Latency)
[User] -> [Next.js Client] -> [Server Action] -> [Drizzle ORM] -> [Supabase PostgreSQL]
*(Entirely within the Vercel/Supabase colocation. No Python server involved).*

### 3.2. Detail Agent (RAG) Query Flow
1. User submits a question via the Next.js chat widget.
2. Next.js sends an API request to the FastAPI (Python) service.
3. FastAPI checks the user's `ai_credits` in PostgreSQL. If insufficient, it rejects.
4. LangChain queries `pgvector` to find semantically similar forum threads.
5. Context is passed to GPT-4o-mini. The response is streamed back to the client.
6. 2 credits are deducted from the user's account.

### 3.3. Daily Price Scraping Flow
1. Google Cloud Scheduler triggers the Python FastAPI endpoint at 03:00 AM.
2. Playwright navigates target stores and updates the `products` table in Supabase.
3. System identifies users who have discounted items in their `garage_items` and dispatches email alerts containing Affiliate links.

## 4. Database Schema Blueprint (Phase 1 MVP - Drizzle ORM)
- `users`: id (uuid), username, avatar_url, ai_credits (int, default: 10), role (user/pro/admin).
- `categories`: id, name, slug, description.
- `threads`: id, title, slug, content (markdown), user_id, category_id, is_locked. *(Note: pgvector embedding column to be added in Phase 3)*.
- `posts`: id, thread_id, user_id, content, is_ai_generated, is_accepted_answer.
- `votes`: Composite PK (user_id, target_type, target_id), vote_value (+1 or -1).
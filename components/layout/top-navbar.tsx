import { Bell, Search, Sparkles } from "lucide-react";

import { aiCredits } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/95 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 lg:px-6">
        <a
          href="#"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold text-zinc-100 transition-colors hover:text-cyan-300"
        >
          <Sparkles className="size-4 text-cyan-400" />
          <span className="text-base tracking-wide">DetailVerse</span>
        </a>

        <div className="hidden flex-1 px-4 md:flex">
          <label className="relative mx-auto w-full max-w-2xl">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
            <Input
              aria-label="Global search"
              placeholder="Search products, guides, or ask AI..."
              className="h-10 rounded-full border-zinc-800 bg-zinc-900/70 pl-9"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="rounded-full border border-cyan-500/40 bg-cyan-500/12 px-3 py-1 text-xs font-semibold text-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.28)] sm:text-sm">
            AI Credits: {aiCredits} \ud83e\ude99
          </div>
          <button
            type="button"
            aria-label="Notifications"
            className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-cyan-500/50 hover:text-cyan-200"
          >
            <Bell className="size-4" />
          </button>
          <Avatar className="size-9">
            <AvatarImage
              src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=160&q=80"
              alt="User avatar"
            />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

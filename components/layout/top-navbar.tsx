import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Bell, Search, Sparkles } from "lucide-react";

import { signOutAction } from "@/app/auth/actions";
import { aiCredits } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TopNavbarProps = {
  user: User | null;
  authEnabled: boolean;
};

function getInitials(email?: string | null) {
  if (!email) {
    return "DV";
  }

  return email.slice(0, 2).toUpperCase();
}

export function TopNavbar({ user, authEnabled }: TopNavbarProps) {
  const avatarUrl =
    typeof user?.user_metadata?.avatar_url === "string" ? user.user_metadata.avatar_url : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/50 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 lg:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-stone-900 transition-all hover:text-amber-700 hover:-translate-y-0.5 active:scale-95"
        >
          <Sparkles className="size-4 text-amber-500 transition-transform duration-300 group-hover:scale-125 group-hover:text-amber-600" />
          <span className="text-base tracking-wide">DetailVerse</span>
        </Link>

        <div className="hidden flex-1 px-4 md:flex">
          <label className="relative mx-auto w-full max-w-2xl">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              aria-label="Global search"
              placeholder="Search products, guides, or ask AI..."
              className="h-10 rounded-full border-stone-200 bg-stone-50/50 pl-9 transition-all focus-visible:bg-white focus-visible:shadow-sm shadow-inner"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="group inline-flex size-10 items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-600 transition-all hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-700 active:scale-95 md:hidden"
          >
            <Search className="size-4" />
          </button>
          <div className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 sm:text-sm">
            AI Credits: {aiCredits} \ud83e\ude99
          </div>

          {!authEnabled ? (
            <Button variant="outline" size="sm" className="rounded-full" disabled>
              Auth pasif (test modu)
            </Button>
          ) : user ? (
            <>
              <button
                type="button"
                aria-label="Notifications"
                className="group inline-flex size-11 items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-600 transition-all hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-700 hover:shadow-sm active:scale-95"
              >
                <Bell className="size-4 transition-transform duration-300 origin-top-[10%] group-hover:rotate-12" />
              </button>

              <Avatar className="size-11 cursor-pointer transition active:scale-95">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="User avatar" /> : null}
                <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
              </Avatar>

              <form action={signOutAction} className="hidden sm:block">
                <Button type="submit" variant="outline" size="sm" className="rounded-full">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

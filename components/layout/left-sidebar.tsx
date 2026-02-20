import { Bookmark, Flame, Home, Toolbox } from "lucide-react";

import { categoryLinks, navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = {
  home: Home,
  guides: Flame,
  garage: Toolbox,
  saved: Bookmark,
};

export function LeftSidebar() {
  return (
    <aside className="sticky top-20 z-40 hidden h-[calc(100vh-6rem)] overflow-y-auto lg:block">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_30px_55px_-36px_rgba(0,0,0,0.85)]">
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">
          Navigation
        </p>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition",
                  item.active
                    ? "border-cyan-500/45 bg-cyan-500/12 text-cyan-200"
                    : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100",
                )}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-7">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {categoryLinks.map((category) => (
              <a
                key={category.label}
                href={category.href}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-cyan-500/60 hover:text-cyan-200"
              >
                {category.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

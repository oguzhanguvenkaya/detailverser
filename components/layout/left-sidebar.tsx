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
    <aside
      aria-label="Main navigation"
      className="sticky top-20 z-40 hidden h-[calc(100vh-6rem)] overflow-y-auto lg:block"
    >
      <div className="rounded-2xl border border-honey-border/50 bg-honey-card/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md">
        <h2 className="mb-3 text-xs font-semibold tracking-[0.18em] text-honey-text/70 uppercase">
          Navigation
        </h2>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "group flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all active:scale-[0.98]",
                  item.active
                    ? "border-honey-primary/40 bg-honey-primary/15 text-honey-primary-text shadow-sm"
                    : "border-transparent text-honey-text hover:bg-honey-card hover:text-honey-card-text hover:shadow-sm hover:border-honey-border/50",
                )}
              >
                <Icon className={cn(
                  "size-4 transition-transform duration-300",
                  !item.active && "group-hover:scale-110 group-hover:text-honey-primary-text"
                )} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-7">
          <h2 className="mb-3 text-xs font-semibold tracking-[0.18em] text-honey-text/70 uppercase">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categoryLinks.map((category) => (
              <button
                key={category.label}
                type="button"
                className="rounded-full border border-honey-border bg-honey-muted/50 px-3 py-1.5 text-xs font-medium text-honey-text transition-all hover:-translate-y-0.5 hover:border-honey-primary/40 hover:bg-honey-primary/10 hover:text-honey-primary-text hover:shadow-sm active:scale-95"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

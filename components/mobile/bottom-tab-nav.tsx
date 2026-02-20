"use client";

import { Bookmark, Flame, Home, Sparkles, Toolbox } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home },
  { label: "Guides", icon: Flame },
  { label: "Garage", icon: Toolbox },
  { label: "Saved", icon: Bookmark },
];

export function BottomTabNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/50 bg-white/80 backdrop-blur-xl lg:hidden">
      <div className="relative mx-auto grid max-w-xl grid-cols-5 items-center px-2 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              className="group flex flex-col items-center gap-1 rounded-md px-3 py-2 text-[11px] text-stone-500 transition-colors hover:text-amber-600 active:scale-95"
            >
              <Icon className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              <span>{tab.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          className="group -mt-6 flex size-14 items-center justify-center justify-self-center rounded-full border border-amber-300 bg-gradient-to-t from-amber-500 to-orange-400 text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95"
          aria-label="Open AI Agent"
        >
          <Sparkles className="size-5 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
        </button>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              className="group flex flex-col items-center gap-1 rounded-md px-3 py-2 text-[11px] text-stone-500 transition-colors hover:text-amber-600 active:scale-95"
            >
              <Icon className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

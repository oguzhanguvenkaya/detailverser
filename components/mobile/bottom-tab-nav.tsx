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
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800/95 bg-zinc-950/96 backdrop-blur-xl lg:hidden">
      <div className="relative mx-auto grid max-w-xl grid-cols-5 items-center px-2 pt-2 pb-3">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              className="flex flex-col items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-400 transition hover:text-zinc-100"
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          className="-mt-6 flex size-14 items-center justify-center justify-self-center rounded-full border border-cyan-300/60 bg-cyan-500 text-zinc-950 shadow-[0_0_36px_rgba(6,182,212,0.55)]"
          aria-label="Open AI Agent"
        >
          <Sparkles className="size-5" />
        </button>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              className="flex flex-col items-center gap-1 rounded-md px-2 py-1 text-[11px] text-zinc-400 transition hover:text-zinc-100"
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

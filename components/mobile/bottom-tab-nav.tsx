"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark, Flame, Home, Sparkles, Toolbox } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Guides", icon: Flame, href: "/guides" },
  { label: "Garage", icon: Toolbox, href: "/garage" },
  { label: "Saved", icon: Bookmark, href: "/saved" },
];

export function BottomTabNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-honey-border/50 bg-honey-bg/80 backdrop-blur-xl lg:hidden">
      <div className="relative mx-auto grid max-w-xl grid-cols-5 items-center px-2 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex flex-col items-center gap-1 rounded-md px-3 py-2 text-[11px] transition-colors active:scale-95 ${
                isActive
                  ? "text-honey-primary-text font-semibold"
                  : "text-honey-text/60 hover:text-honey-primary-text"
              }`}
            >
              <Icon className={`size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${isActive ? "text-honey-primary-text" : ""}`} />
              <span>{tab.label}</span>
              {isActive ? (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-honey-primary" />
              ) : null}
            </Link>
          );
        })}

        <button
          type="button"
          className="group -mt-6 flex size-14 items-center justify-center justify-self-center rounded-full border border-honey-primary bg-gradient-to-t from-honey-primary to-honey-secondary-text text-honey-primary-text shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-honey-primary/30 active:scale-95"
          aria-label="Open AI Agent"
        >
          <Sparkles className="size-5 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
        </button>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex flex-col items-center gap-1 rounded-md px-3 py-2 text-[11px] transition-colors active:scale-95 ${
                isActive
                  ? "text-honey-primary-text font-semibold"
                  : "text-honey-text/60 hover:text-honey-primary-text"
              }`}
            >
              <Icon className={`size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${isActive ? "text-honey-primary-text" : ""}`} />
              <span>{tab.label}</span>
              {isActive ? (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-honey-primary" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

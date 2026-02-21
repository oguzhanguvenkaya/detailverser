import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

import type { Thread } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ThreadCardProps = {
  thread: Thread;
  children?: ReactNode;
};

export function ThreadCard({ thread, children }: ThreadCardProps) {
  return (
    <Card className="relative z-10 group hover:-translate-y-0.5">
      <CardContent className="space-y-4 p-5">
        <header className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={thread.author.avatarUrl} alt={`${thread.author.name} avatar`} />
            <AvatarFallback>{thread.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm font-semibold text-slate-900">{thread.author.name}</span>
              <Badge variant="amber">{thread.author.role}</Badge>
            </div>
            <p className="text-xs text-slate-500">{thread.timestamp}</p>
          </div>
        </header>

        <div className="space-y-2">
          <Link href={`/thread/${thread.id}`} className="hover:underline">
            <h2 className="text-xl leading-tight font-bold text-slate-900 sm:text-2xl transition-colors group-hover:text-cyan-600">{thread.title}</h2>
          </Link>
          <p
            className="text-sm leading-relaxed text-slate-500"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {thread.snippet}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {thread.tags.map((tag) => (
            <Badge key={tag.label} variant={tag.variant || "default"}>
              {tag.label}
            </Badge>
          ))}
        </div>

        {children}

        {!children && thread.previewImageUrl ? (
          <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src={thread.previewImageUrl}
              alt={`Preview for: ${thread.title}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        ) : null}

        <footer className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-1 py-1 shadow-sm">
              <button
                type="button"
                aria-label="Upvote"
                className="group inline-flex size-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white hover:text-cyan-600 hover:shadow-sm active:scale-95"
              >
                <ChevronUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
              <span className="px-1.5 text-sm font-semibold text-slate-900">{thread.votes}</span>
              <button
                type="button"
                aria-label="Downvote"
                className="group inline-flex size-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white hover:text-cyan-600 hover:shadow-sm active:scale-95"
              >
                <ChevronDown className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>

            <button
              type="button"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white/60 shadow-sm px-4 text-sm font-medium text-slate-600 transition-all hover:bg-white hover:border-cyan-200 hover:text-cyan-600 active:scale-95"
            >
              <MessageSquare className="size-4.5 transition-transform duration-300 group-hover:scale-110" />
              {thread.comments}
            </button>
          </div>

          <button
            type="button"
            aria-label="Save thread"
            className="group inline-flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-400 shadow-sm transition-all hover:bg-white hover:border-cyan-200 hover:text-cyan-600 active:scale-95"
          >
            <Bookmark className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </footer>
      </CardContent>
    </Card>
  );
}

import type { ReactNode } from "react";
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
    <Card className="relative z-10 border-zinc-800 bg-zinc-900/85">
      <CardContent className="space-y-4 p-5">
        <header className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={thread.author.avatarUrl} alt={`${thread.author.name} avatar`} />
            <AvatarFallback>{thread.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm font-semibold text-zinc-100">{thread.author.name}</span>
              <Badge variant="cyan">{thread.author.role}</Badge>
            </div>
            <p className="text-xs text-zinc-500">{thread.timestamp}</p>
          </div>
        </header>

        <div className="space-y-2">
          <h2 className="text-xl leading-tight font-bold text-zinc-50 sm:text-2xl">{thread.title}</h2>
          <p
            className="text-sm leading-relaxed text-zinc-400"
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
            <Badge key={tag.label} variant={tag.variant === "cyan" ? "cyan" : "default"}>
              {tag.label}
            </Badge>
          ))}
        </div>

        {children}

        {!children && thread.previewImageUrl ? (
          <div className="h-48 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <div
              className="size-full bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
              style={{ backgroundImage: `url(${thread.previewImageUrl})` }}
            />
          </div>
        ) : null}

        <footer className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-950 px-2 py-1">
              <button
                type="button"
                aria-label="Upvote"
                className="inline-flex size-7 items-center justify-center rounded-full text-zinc-400 transition hover:text-cyan-200"
              >
                <ChevronUp className="size-4" />
              </button>
              <span className="px-1.5 text-sm font-semibold text-zinc-200">{thread.votes}</span>
              <button
                type="button"
                aria-label="Downvote"
                className="inline-flex size-7 items-center justify-center rounded-full text-zinc-400 transition hover:text-cyan-200"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-300 transition hover:text-zinc-100"
            >
              <MessageSquare className="size-4" />
              {thread.comments}
            </button>
          </div>

          <button
            type="button"
            aria-label="Save thread"
            className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-zinc-400 transition hover:border-cyan-500/60 hover:text-cyan-200"
          >
            <Bookmark className="size-4" />
          </button>
        </footer>
      </CardContent>
    </Card>
  );
}

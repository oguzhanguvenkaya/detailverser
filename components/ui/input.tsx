import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border border-honey-border bg-honey-card px-3 py-2 text-sm text-honey-card-text placeholder:text-honey-text/50 outline-none transition-colors focus-visible:border-honey-focus focus-visible:ring-2 focus-visible:ring-honey-focus/30 aria-invalid:border-honey-destructive/60 aria-invalid:ring-honey-destructive/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

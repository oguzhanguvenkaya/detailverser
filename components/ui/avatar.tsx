import * as React from "react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar"
      className={cn(
        "relative flex size-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  sizes = "36px",
  alt,
  ...props
}: Omit<ImageProps, "fill" | "alt"> & { alt?: string }) {
  return (
    <Image
      data-slot="avatar-image"
      fill
      sizes={sizes}
      alt={alt ?? ""}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-600",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

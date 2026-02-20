import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-honey-focus/50 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "bg-honey-primary text-honey-primary-text shadow-sm transition-all duration-300 hover:brightness-105 hover:shadow-md hover:shadow-honey-primary/25",
        secondary:
          "bg-honey-secondary text-honey-secondary-text hover:brightness-110 hover:shadow-sm",
        ghost: "text-honey-text hover:bg-honey-muted hover:text-honey-card-text",
        outline:
          "border border-honey-border bg-transparent text-honey-text hover:border-honey-primary hover:bg-honey-primary/10 hover:text-honey-primary-text",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

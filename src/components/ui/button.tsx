import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 disabled:bg-muted disabled:text-slate-600 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive tracking-normal",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 text-sm ",
        destructive:
          "bg-destructive-dark text-white shadow-xs hover:bg-destructive-dark/90 focus-visible:ring-destructive-dark/20 dark:focus-visible:ring-destructive-dark/40 dark:bg-destructive-dark/60",
        outline:
          "border bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-gray":
          "border bg-muted/50 hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-hover-primary":
          "border bg-background dark:bg-input/30 dark:border-input hover:border-primary hover:text-primary",
        secondary: "border border-primary bg-background text-primary shadow-xs",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        light: "bg-white text-neutral-900 hover:bg-white/90",
        "secondary-light":
          "bg-white/8 text-white hover:bg-white/12 border border-muted/10"
      },
      size: {
        default: "py-2.5 px-5 rounded-md",
        sm: "py-2.5 px-4 rounded-md gap-1.5 text-sm",
        md: "py-2.5 px-6 rounded-md gap-1.5 text-sm",
        lg: "h-12 py-3.5 px-6 rounded-md",
        xl: "py-4 px-6 rounded-md text-base",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
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

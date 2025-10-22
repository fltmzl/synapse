import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function H1({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-xl tracking-[-0.02em] leading-[130%] text-foreground font-medium",
        className
      )}
    >
      {children}
    </h1>
  );
}
